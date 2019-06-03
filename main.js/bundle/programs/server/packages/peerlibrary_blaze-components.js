(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var Blaze = Package.blaze.Blaze;
var UI = Package.blaze.UI;
var Handlebars = Package.blaze.Handlebars;
var _ = Package.underscore._;
var Tracker = Package.tracker.Tracker;
var Deps = Package.tracker.Deps;
var ReactiveVar = Package['reactive-var'].ReactiveVar;
var EJSON = Package.ejson.EJSON;
var Spacebars = Package.spacebars.Spacebars;
var BaseComponent = Package['peerlibrary:base-component'].BaseComponent;
var BaseComponentDebug = Package['peerlibrary:base-component'].BaseComponentDebug;
var assert = Package['peerlibrary:assert'].assert;
var ReactiveField = Package['peerlibrary:reactive-field'].ReactiveField;
var ComputedField = Package['peerlibrary:computed-field'].ComputedField;
var DataLookup = Package['peerlibrary:data-lookup'].DataLookup;
var HTML = Package.htmljs.HTML;

/* Package-scope variables */
var __coffeescriptShare, Template, AttributeHandler, ElementAttributesUpdater, BlazeComponent, BlazeComponentDebug;

(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/peerlibrary_blaze-components/template.coffee.js                                                            //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
                                                                                                                       // 1
                                                                                                                       //
Template = Blaze.Template;                                                                                             // 1
                                                                                                                       //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/peerlibrary_blaze-components/compatibility/templating.js                                                   //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
/* This file is needed to backport this pull request: https://github.com/meteor/meteor/pull/5903
   If it is a copy of templating.js file wrapped into a condition.

   TODO: Remove this file eventually.
 */

if (!Blaze.Template.__checkName) {
  // Packages and apps add templates on to this object.

  /**
   * @summary The class for defining templates
   * @class
   * @instanceName Template.myTemplate
   */
  Template = Blaze.Template;

  var RESERVED_TEMPLATE_NAMES = "__proto__ name".split(" ");

  // Check for duplicate template names and illegal names that won't work.
  Template.__checkName = function (name) {
    // Some names can't be used for Templates. These include:
    //  - Properties Blaze sets on the Template object.
    //  - Properties that some browsers don't let the code to set.
    //    These are specified in RESERVED_TEMPLATE_NAMES.
    if (name in Template || _.contains(RESERVED_TEMPLATE_NAMES, name)) {
      if ((Template[name] instanceof Template) && name !== "body")
        throw new Error("There are multiple templates named '" + name + "'. Each template needs a unique name.");
      throw new Error("This template name is reserved: " + name);
    }
  };

  // XXX COMPAT WITH 0.8.3
  Template.__define__ = function (name, renderFunc) {
    Template.__checkName(name);
    Template[name] = new Template("Template." + name, renderFunc);
    // Exempt packages built pre-0.9.0 from warnings about using old
    // helper syntax, because we can.  It's not very useful to get a
    // warning about someone else's code (like a package on Atmosphere),
    // and this should at least put a bit of a dent in number of warnings
    // that come from packages that haven't been updated lately.
    Template[name]._NOWARN_OLDSTYLE_HELPERS = true;
  };

  // Define a template `Template.body` that renders its
  // `contentRenderFuncs`.  `<body>` tags (of which there may be
  // multiple) will have their contents added to it.

  /**
   * @summary The [template object](#templates_api) representing your `<body>`
   * tag.
   * @locus Client
   */
  Template.body = new Template('body', function () {
    var view = this;
    return _.map(Template.body.contentRenderFuncs, function (func) {
      return func.apply(view);
    });
  });
  Template.body.contentRenderFuncs = []; // array of Blaze.Views
  Template.body.view = null;

  Template.body.addContent = function (renderFunc) {
    Template.body.contentRenderFuncs.push(renderFunc);
  };

  // This function does not use `this` and so it may be called
  // as `Meteor.startup(Template.body.renderIntoDocument)`.
  Template.body.renderToDocument = function () {
    // Only do it once.
    if (Template.body.view)
      return;

    var view = Blaze.render(Template.body, document.body);
    Template.body.view = view;
  };

  // XXX COMPAT WITH 0.9.0
  UI.body = Template.body;

  // XXX COMPAT WITH 0.9.0
  // (<body> tags in packages built with 0.9.0)
  Template.__body__ = Template.body;
  Template.__body__.__contentParts = Template.body.contentViews;
  Template.__body__.__instantiate = Template.body.renderToDocument;
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/peerlibrary_blaze-components/compatibility/template.dynamic.js                                             //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("__dynamicBackport");
Template["__dynamicBackport"] = new Template("Template.__dynamicBackport", (function() {
  var view = this;
  return [ Blaze.View("lookup:checkContext", function() {
    return Spacebars.mustache(view.lookup("checkContext"));
  }), "\n  ", Blaze.If(function() {
    return Spacebars.call(view.lookup("dataContextPresent"));
  }, function() {
    return [ "\n    ", Spacebars.include(view.lookupTemplate("__dynamicWithDataContext"), function() {
      return Blaze._InOuterTemplateScope(view, function() {
        return Spacebars.include(function() {
          return Spacebars.call(view.templateContentBlock);
        });
      });
    }), "\n  " ];
  }, function() {
    return [ "\n    \n    ", Blaze._TemplateWith(function() {
      return {
        template: Spacebars.call(view.lookup("template")),
        data: Spacebars.call(view.lookup(".."))
      };
    }, function() {
      return Spacebars.include(view.lookupTemplate("__dynamicWithDataContext"), function() {
        return Blaze._InOuterTemplateScope(view, function() {
          return Spacebars.include(function() {
            return Spacebars.call(view.templateContentBlock);
          });
        });
      });
    }), "\n  " ];
  }) ];
}));

Template.__checkName("__dynamicWithDataContextBackport");
Template["__dynamicWithDataContextBackport"] = new Template("Template.__dynamicWithDataContextBackport", (function() {
  var view = this;
  return Spacebars.With(function() {
    return Spacebars.dataMustache(view.lookup("chooseTemplate"), view.lookup("template"));
  }, function() {
    return [ "\n    \n    ", Blaze._TemplateWith(function() {
      return Spacebars.call(Spacebars.dot(view.lookup(".."), "data"));
    }, function() {
      return Spacebars.include(view.lookupTemplate(".."), function() {
        return Blaze._InOuterTemplateScope(view, function() {
          return Spacebars.include(function() {
            return Spacebars.call(view.templateContentBlock);
          });
        });
      });
    }), "\n  " ];
  });
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/peerlibrary_blaze-components/compatibility/dynamic.js                                                      //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
/* This file is needed to backport this pull request: https://github.com/meteor/meteor/pull/5903
   If it is a copy of dynamic.js file wrapped into a condition with renaming of backported templates.

   TODO: Remove this file eventually.
 */

if (!Blaze.Template.__dynamicWithDataContext) {
  Blaze.Template.__dynamicWithDataContext = Blaze.Template.__dynamicWithDataContextBackport;
  Blaze.Template.__dynamicWithDataContext.viewName = 'Template.__dynamicWithDataContext';
  Blaze.Template.__dynamic = Blaze.Template.__dynamicBackport;
  Blaze.Template.__dynamic.viewName = 'Template.__dynamic';

  var Template = Blaze.Template;

  /**
   * @isTemplate true
   * @memberOf Template
   * @function dynamic
   * @summary Choose a template to include dynamically, by name.
   * @locus Templates
   * @param {String} template The name of the template to include.
   * @param {Object} [data] Optional. The data context in which to include the
   * template.
   */

  Template.__dynamicWithDataContext.helpers({
    chooseTemplate: function (name) {
      return Blaze._getTemplate(name, function () {
        return Template.instance();
      });
    }
  });

  Template.__dynamic.helpers({
    dataContextPresent: function () {
      return _.has(this, "data");
    },
    checkContext: function () {
      if (!_.has(this, "template")) {
        throw new Error("Must specify name in the 'template' argument " +
          "to {{> Template.dynamic}}.");
      }

      _.each(this, function (v, k) {
        if (k !== "template" && k !== "data") {
          throw new Error("Invalid argument to {{> Template.dynamic}}: " +
            k);
        }
      });
    }
  });
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/peerlibrary_blaze-components/compatibility/lookup.js                                                       //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
/* This file backports Blaze lookup.js from Meteor 1.2 so that required Blaze features to support Blaze
   Components are available also in older Meteor versions.
   It is a copy of lookup.js file from Meteor 1.2 with lexical scope lookup commented out.

   TODO: Remove this file eventually.
 */

// Check if we are not running Meteor 1.2+.
if (! Blaze._getTemplate) {
  // If `x` is a function, binds the value of `this` for that function
  // to the current data context.
  var bindDataContext = function (x) {
    if (typeof x === 'function') {
      return function () {
        var data = Blaze.getData();
        if (data == null)
          data = {};
        return x.apply(data, arguments);
      };
    }
    return x;
  };

  Blaze._getTemplateHelper = function (template, name, tmplInstanceFunc) {
    // XXX COMPAT WITH 0.9.3
    var isKnownOldStyleHelper = false;

    if (template.__helpers.has(name)) {
      var helper = template.__helpers.get(name);
      if (helper === Blaze._OLDSTYLE_HELPER) {
        isKnownOldStyleHelper = true;
      } else if (helper != null) {
        return wrapHelper(bindDataContext(helper), tmplInstanceFunc);
      } else {
        return null;
      }
    }

    // old-style helper
    if (name in template) {
      // Only warn once per helper
      if (!isKnownOldStyleHelper) {
        template.__helpers.set(name, Blaze._OLDSTYLE_HELPER);
        if (!template._NOWARN_OLDSTYLE_HELPERS) {
          Blaze._warn('Assigning helper with `' + template.viewName + '.' +
            name + ' = ...` is deprecated.  Use `' + template.viewName +
            '.helpers(...)` instead.');
        }
      }
      if (template[name] != null) {
        return wrapHelper(bindDataContext(template[name]), tmplInstanceFunc);
      }
    }

    return null;
  };

  var wrapHelper = function (f, templateFunc) {
    // XXX COMPAT WITH METEOR 1.0.3.2
    if (!Blaze.Template._withTemplateInstanceFunc) {
      return Blaze._wrapCatchingExceptions(f, 'template helper');
    }

    if (typeof f !== "function") {
      return f;
    }

    return function () {
      var self = this;
      var args = arguments;

      return Blaze.Template._withTemplateInstanceFunc(templateFunc, function () {
        return Blaze._wrapCatchingExceptions(f, 'template helper').apply(self, args);
      });
    };
  };

  // templateInstance argument is provided to be available for possible
  // alternative implementations of this function by 3rd party packages.
  Blaze._getTemplate = function (name, templateInstance) {
    if ((name in Blaze.Template) && (Blaze.Template[name] instanceof Blaze.Template)) {
      return Blaze.Template[name];
    }
    return null;
  };

  Blaze._getGlobalHelper = function (name, templateInstance) {
    if (Blaze._globalHelpers[name] != null) {
      return wrapHelper(bindDataContext(Blaze._globalHelpers[name]), templateInstance);
    }
    return null;
  };

  Blaze.View.prototype.lookup = function (name, _options) {
    var template = this.template;
    var lookupTemplate = _options && _options.template;
    var helper;
    var binding;
    var boundTmplInstance;
    var foundTemplate;

    if (this.templateInstance) {
      boundTmplInstance = _.bind(this.templateInstance, this);
    }

    // 0. looking up the parent data context with the special "../" syntax
    if (/^\./.test(name)) {
      // starts with a dot. must be a series of dots which maps to an
      // ancestor of the appropriate height.
      if (!/^(\.)+$/.test(name))
        throw new Error("id starting with dot must be a series of dots");

      return Blaze._parentData(name.length - 1, true /*_functionWrapped*/);

    }

    // 1. look up a helper on the current template
    if (template && ((helper = Blaze._getTemplateHelper(template, name, boundTmplInstance)) != null)) {
      return helper;
    }

    // 2. look up a binding by traversing the lexical view hierarchy inside the
    // current template
    /*if (template && (binding = Blaze._lexicalBindingLookup(Blaze.currentView, name)) != null) {
      return binding;
    }*/

    // 3. look up a template by name
    if (lookupTemplate && ((foundTemplate = Blaze._getTemplate(name, boundTmplInstance)) != null)) {
      return foundTemplate;
    }

    // 4. look up a global helper
    if ((helper = Blaze._getGlobalHelper(name, boundTmplInstance)) != null) {
      return helper;
    }

    // 5. look up in a data context
    return function () {
      var isCalledAsFunction = (arguments.length > 0);
      var data = Blaze.getData();
      var x = data && data[name];
      if (!x) {
        if (lookupTemplate) {
          throw new Error("No such template: " + name);
        } else if (isCalledAsFunction) {
          throw new Error("No such function: " + name);
        } /*else if (name.charAt(0) === '@' && ((x === null) ||
          (x === undefined))) {
          // Throw an error if the user tries to use a `@directive`
          // that doesn't exist.  We don't implement all directives
          // from Handlebars, so there's a potential for confusion
          // if we fail silently.  On the other hand, we want to
          // throw late in case some app or package wants to provide
          // a missing directive.
          throw new Error("Unsupported directive: " + name);
        }*/
      }
      if (!data) {
        return null;
      }
      if (typeof x !== 'function') {
        if (isCalledAsFunction) {
          throw new Error("Can't call non-function: " + x);
        }
        return x;
      }
      return x.apply(data, arguments);
    };
  };
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/peerlibrary_blaze-components/compatibility/attrs.js                                                        //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
/* This file is needed to backport this pull request: https://github.com/meteor/meteor/pull/5893
   It is a copy of attrs.js file with the changes from the above pull request merged in.

   TODO: Remove this file eventually.
 */

var jsUrlsAllowed = false;
Blaze._allowJavascriptUrls = function () {
  jsUrlsAllowed = true;
};
Blaze._javascriptUrlsAllowed = function () {
  return jsUrlsAllowed;
};

// An AttributeHandler object is responsible for updating a particular attribute
// of a particular element.  AttributeHandler subclasses implement
// browser-specific logic for dealing with particular attributes across
// different browsers.
//
// To define a new type of AttributeHandler, use
// `var FooHandler = AttributeHandler.extend({ update: function ... })`
// where the `update` function takes arguments `(element, oldValue, value)`.
// The `element` argument is always the same between calls to `update` on
// the same instance.  `oldValue` and `value` are each either `null` or
// a Unicode string of the type that might be passed to the value argument
// of `setAttribute` (i.e. not an HTML string with character references).
// When an AttributeHandler is installed, an initial call to `update` is
// always made with `oldValue = null`.  The `update` method can access
// `this.name` if the AttributeHandler class is a generic one that applies
// to multiple attribute names.
//
// AttributeHandlers can store custom properties on `this`, as long as they
// don't use the names `element`, `name`, `value`, and `oldValue`.
//
// AttributeHandlers can't influence how attributes appear in rendered HTML,
// only how they are updated after materialization as DOM.

AttributeHandler = function (name, value) {
  this.name = name;
  this.value = value;
};
Blaze._AttributeHandler = AttributeHandler;

AttributeHandler.prototype.update = function (element, oldValue, value) {
  if (value === null) {
    if (oldValue !== null)
      element.removeAttribute(this.name);
  } else {
    element.setAttribute(this.name, value);
  }
};

AttributeHandler.extend = function (options) {
  var curType = this;
  var subType = function AttributeHandlerSubtype(/*arguments*/) {
    AttributeHandler.apply(this, arguments);
  };
  subType.prototype = new curType;
  subType.extend = curType.extend;
  if (options)
    _.extend(subType.prototype, options);
  return subType;
};

/// Apply the diff between the attributes of "oldValue" and "value" to "element."
//
// Each subclass must implement a parseValue method which takes a string
// as an input and returns a dict of attributes. The keys of the dict
// are unique identifiers (ie. css properties in the case of styles), and the
// values are the entire attribute which will be injected into the element.
//
// Extended below to support classes, SVG elements and styles.

Blaze._DiffingAttributeHandler = AttributeHandler.extend({
  update: function (element, oldValue, value) {
    if (!this.getCurrentValue || !this.setValue || !this.parseValue)
      throw new Error("Missing methods in subclass of 'DiffingAttributeHandler'");

    var oldAttrsMap = oldValue ? this.parseValue(oldValue) : {};
    var newAttrsMap = value ? this.parseValue(value) : {};

    // the current attributes on the element, which we will mutate.

    var attrString = this.getCurrentValue(element);
    var attrsMap = attrString ? this.parseValue(attrString) : {};

    _.each(_.keys(oldAttrsMap), function (t) {
      if (! (t in newAttrsMap))
        delete attrsMap[t];
    });

    _.each(_.keys(newAttrsMap), function (t) {
      attrsMap[t] = newAttrsMap[t];
    });

    this.setValue(element, _.values(attrsMap).join(' '));
  }
});

var ClassHandler = Blaze._DiffingAttributeHandler.extend({
  // @param rawValue {String}
  getCurrentValue: function (element) {
    return element.className;
  },
  setValue: function (element, className) {
    element.className = className;
  },
  parseValue: function (attrString) {
    var tokens = {};

    _.each(attrString.split(' '), function(token) {
      if (token)
        tokens[token] = token;
    });
    return tokens;
  }
});

var SVGClassHandler = ClassHandler.extend({
  getCurrentValue: function (element) {
    return element.className.baseVal;
  },
  setValue: function (element, className) {
    element.setAttribute('class', className);
  }
});

var StyleHandler = Blaze._DiffingAttributeHandler.extend({
  getCurrentValue: function (element) {
    return element.getAttribute('style');
  },
  setValue: function (element, style) {
    if (style === '') {
      element.removeAttribute('style');
    } else {
      element.setAttribute('style', style);
    }
  },

  // Parse a string to produce a map from property to attribute string.
  //
  // Example:
  // "color:red; foo:12px" produces a token {color: "color:red", foo:"foo:12px"}
  parseValue: function (attrString) {
    var tokens = {};

    // Regex for parsing a css attribute declaration, taken from css-parse:
    // https://github.com/reworkcss/css-parse/blob/7cef3658d0bba872cde05a85339034b187cb3397/index.js#L219
    var regex = /(\*?[-#\/\*\\\w]+(?:\[[0-9a-z_-]+\])?)\s*:\s*(?:\'(?:\\\'|.)*?\'|"(?:\\"|.)*?"|\([^\)]*?\)|[^};])+[;\s]*/g;
    var match = regex.exec(attrString);
    while (match) {
      // match[0] = entire matching string
      // match[1] = css property
      // Prefix the token to prevent conflicts with existing properties.

      // XXX No `String.trim` on Safari 4. Swap out $.trim if we want to
      // remove strong dep on jquery.
      tokens[' ' + match[1]] = match[0].trim ?
        match[0].trim() : $.trim(match[0]);

      match = regex.exec(attrString);
    }

    return tokens;
  }
});

var BooleanHandler = AttributeHandler.extend({
  update: function (element, oldValue, value) {
    var name = this.name;
    if (value == null) {
      if (oldValue != null)
        element[name] = false;
    } else {
      element[name] = true;
    }
  }
});

var DOMPropertyHandler = AttributeHandler.extend({
  update: function (element, oldValue, value) {
    var name = this.name;
    if (value !== element[name])
      element[name] = value;
  }
});

// attributes of the type 'xlink:something' should be set using
// the correct namespace in order to work
var XlinkHandler = AttributeHandler.extend({
  update: function(element, oldValue, value) {
    var NS = 'http://www.w3.org/1999/xlink';
    if (value === null) {
      if (oldValue !== null)
        element.removeAttributeNS(NS, this.name);
    } else {
      element.setAttributeNS(NS, this.name, this.value);
    }
  }
});

// cross-browser version of `instanceof SVGElement`
var isSVGElement = function (elem) {
  return 'ownerSVGElement' in elem;
};

var isUrlAttribute = function (tagName, attrName) {
  // Compiled from http://www.w3.org/TR/REC-html40/index/attributes.html
  // and
  // http://www.w3.org/html/wg/drafts/html/master/index.html#attributes-1
  var urlAttrs = {
    FORM: ['action'],
    BODY: ['background'],
    BLOCKQUOTE: ['cite'],
    Q: ['cite'],
    DEL: ['cite'],
    INS: ['cite'],
    OBJECT: ['classid', 'codebase', 'data', 'usemap'],
    APPLET: ['codebase'],
    A: ['href'],
    AREA: ['href'],
    LINK: ['href'],
    BASE: ['href'],
    IMG: ['longdesc', 'src', 'usemap'],
    FRAME: ['longdesc', 'src'],
    IFRAME: ['longdesc', 'src'],
    HEAD: ['profile'],
    SCRIPT: ['src'],
    INPUT: ['src', 'usemap', 'formaction'],
    BUTTON: ['formaction'],
    BASE: ['href'],
    MENUITEM: ['icon'],
    HTML: ['manifest'],
    VIDEO: ['poster']
  };

  if (attrName === 'itemid') {
    return true;
  }

  var urlAttrNames = urlAttrs[tagName] || [];
  return _.contains(urlAttrNames, attrName);
};

// To get the protocol for a URL, we let the browser normalize it for
// us, by setting it as the href for an anchor tag and then reading out
// the 'protocol' property.
if (Meteor.isClient) {
  var anchorForNormalization = document.createElement('A');
}

var getUrlProtocol = function (url) {
  if (Meteor.isClient) {
    anchorForNormalization.href = url;
    return (anchorForNormalization.protocol || "").toLowerCase();
  } else {
    throw new Error('getUrlProtocol not implemented on the server');
  }
};

// UrlHandler is an attribute handler for all HTML attributes that take
// URL values. It disallows javascript: URLs, unless
// Blaze._allowJavascriptUrls() has been called. To detect javascript:
// urls, we set the attribute on a dummy anchor element and then read
// out the 'protocol' property of the attribute.
var origUpdate = AttributeHandler.prototype.update;
var UrlHandler = AttributeHandler.extend({
  update: function (element, oldValue, value) {
    var self = this;
    var args = arguments;

    if (Blaze._javascriptUrlsAllowed()) {
      origUpdate.apply(self, args);
    } else {
      var isJavascriptProtocol = (getUrlProtocol(value) === "javascript:");
      if (isJavascriptProtocol) {
        Blaze._warn("URLs that use the 'javascript:' protocol are not " +
                    "allowed in URL attribute values. " +
                    "Call Blaze._allowJavascriptUrls() " +
                    "to enable them.");
        origUpdate.apply(self, [element, oldValue, null]);
      } else {
        origUpdate.apply(self, args);
      }
    }
  }
});

// XXX make it possible for users to register attribute handlers!
Blaze._makeAttributeHandler = function (elem, name, value) {
  // generally, use setAttribute but certain attributes need to be set
  // by directly setting a JavaScript property on the DOM element.
  if (name === 'class') {
    if (isSVGElement(elem)) {
      return new SVGClassHandler(name, value);
    } else {
      return new ClassHandler(name, value);
    }
  } else if (name === 'style') {
    return new StyleHandler(name, value);
  } else if ((elem.tagName === 'OPTION' && name === 'selected') ||
             (elem.tagName === 'INPUT' && name === 'checked')) {
    return new BooleanHandler(name, value);
  } else if ((elem.tagName === 'TEXTAREA' || elem.tagName === 'INPUT')
             && name === 'value') {
    // internally, TEXTAREAs tracks their value in the 'value'
    // attribute just like INPUTs.
    return new DOMPropertyHandler(name, value);
  } else if (name.substring(0,6) === 'xlink:') {
    return new XlinkHandler(name.substring(6), value);
  } else if (isUrlAttribute(elem.tagName, name)) {
    return new UrlHandler(name, value);
  } else {
    return new AttributeHandler(name, value);
  }

  // XXX will need one for 'style' on IE, though modern browsers
  // seem to handle setAttribute ok.
};


ElementAttributesUpdater = function (elem) {
  this.elem = elem;
  this.handlers = {};
};

// Update attributes on `elem` to the dictionary `attrs`, whose
// values are strings.
ElementAttributesUpdater.prototype.update = function(newAttrs) {
  var elem = this.elem;
  var handlers = this.handlers;

  for (var k in handlers) {
    if (! _.has(newAttrs, k)) {
      // remove attributes (and handlers) for attribute names
      // that don't exist as keys of `newAttrs` and so won't
      // be visited when traversing it.  (Attributes that
      // exist in the `newAttrs` object but are `null`
      // are handled later.)
      var handler = handlers[k];
      var oldValue = handler.value;
      handler.value = null;
      handler.update(elem, oldValue, null);
      delete handlers[k];
    }
  }

  for (var k in newAttrs) {
    var handler = null;
    var oldValue;
    var value = newAttrs[k];
    if (! _.has(handlers, k)) {
      if (value !== null) {
        // make new handler
        handler = Blaze._makeAttributeHandler(elem, k, value);
        handlers[k] = handler;
        oldValue = null;
      }
    } else {
      handler = handlers[k];
      oldValue = handler.value;
    }
    if (oldValue !== value) {
      handler.value = value;
      handler.update(elem, oldValue, value);
      if (value === null)
        delete handlers[k];
    }
  }
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/peerlibrary_blaze-components/compatibility/materializer.js                                                 //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
/* This file is needed to backport this pull request: https://github.com/meteor/meteor/pull/5893
   It is a copy of the materializer.js file and is needed because it references symbols from attrs.js.

   TODO: Remove this file eventually.
 */

// Turns HTMLjs into DOM nodes and DOMRanges.
//
// - `htmljs`: the value to materialize, which may be any of the htmljs
//   types (Tag, CharRef, Comment, Raw, array, string, boolean, number,
//   null, or undefined) or a View or Template (which will be used to
//   construct a View).
// - `intoArray`: the array of DOM nodes and DOMRanges to push the output
//   into (required)
// - `parentView`: the View we are materializing content for (optional)
// - `_existingWorkStack`: optional argument, only used for recursive
//   calls when there is some other _materializeDOM on the call stack.
//   If _materializeDOM called your function and passed in a workStack,
//   pass it back when you call _materializeDOM (such as from a workStack
//   task).
//
// Returns `intoArray`, which is especially useful if you pass in `[]`.
Blaze._materializeDOM = function (htmljs, intoArray, parentView,
                                  _existingWorkStack) {
  // In order to use fewer stack frames, materializeDOMInner can push
  // tasks onto `workStack`, and they will be popped off
  // and run, last first, after materializeDOMInner returns.  The
  // reason we use a stack instead of a queue is so that we recurse
  // depth-first, doing newer tasks first.
  var workStack = (_existingWorkStack || []);
  materializeDOMInner(htmljs, intoArray, parentView, workStack);

  if (! _existingWorkStack) {
    // We created the work stack, so we are responsible for finishing
    // the work.  Call each "task" function, starting with the top
    // of the stack.
    while (workStack.length) {
      // Note that running task() may push new items onto workStack.
      var task = workStack.pop();
      task();
    }
  }

  return intoArray;
};

var materializeDOMInner = function (htmljs, intoArray, parentView, workStack) {
  if (htmljs == null) {
    // null or undefined
    return;
  }

  switch (typeof htmljs) {
  case 'string': case 'boolean': case 'number':
    intoArray.push(document.createTextNode(String(htmljs)));
    return;
  case 'object':
    if (htmljs.htmljsType) {
      switch (htmljs.htmljsType) {
      case HTML.Tag.htmljsType:
        intoArray.push(materializeTag(htmljs, parentView, workStack));
        return;
      case HTML.CharRef.htmljsType:
        intoArray.push(document.createTextNode(htmljs.str));
        return;
      case HTML.Comment.htmljsType:
        intoArray.push(document.createComment(htmljs.sanitizedValue));
        return;
      case HTML.Raw.htmljsType:
        // Get an array of DOM nodes by using the browser's HTML parser
        // (like innerHTML).
        var nodes = Blaze._DOMBackend.parseHTML(htmljs.value);
        for (var i = 0; i < nodes.length; i++)
          intoArray.push(nodes[i]);
        return;
      }
    } else if (HTML.isArray(htmljs)) {
      for (var i = htmljs.length-1; i >= 0; i--) {
        workStack.push(_.bind(Blaze._materializeDOM, null,
                              htmljs[i], intoArray, parentView, workStack));
      }
      return;
    } else {
      if (htmljs instanceof Blaze.Template) {
        htmljs = htmljs.constructView();
        // fall through to Blaze.View case below
      }
      if (htmljs instanceof Blaze.View) {
        Blaze._materializeView(htmljs, parentView, workStack, intoArray);
        return;
      }
    }
  }

  throw new Error("Unexpected object in htmljs: " + htmljs);
};

var materializeTag = function (tag, parentView, workStack) {
  var tagName = tag.tagName;
  var elem;
  if ((HTML.isKnownSVGElement(tagName) || isSVGAnchor(tag))
      && document.createElementNS) {
    // inline SVG
    elem = document.createElementNS('http://www.w3.org/2000/svg', tagName);
  } else {
    // normal elements
    elem = document.createElement(tagName);
  }

  var rawAttrs = tag.attrs;
  var children = tag.children;
  if (tagName === 'textarea' && tag.children.length &&
      ! (rawAttrs && ('value' in rawAttrs))) {
    // Provide very limited support for TEXTAREA tags with children
    // rather than a "value" attribute.
    // Reactivity in the form of Views nested in the tag's children
    // won't work.  Compilers should compile textarea contents into
    // the "value" attribute of the tag, wrapped in a function if there
    // is reactivity.
    if (typeof rawAttrs === 'function' ||
        HTML.isArray(rawAttrs)) {
      throw new Error("Can't have reactive children of TEXTAREA node; " +
                      "use the 'value' attribute instead.");
    }
    rawAttrs = _.extend({}, rawAttrs || null);
    rawAttrs.value = Blaze._expand(children, parentView);
    children = [];
  }

  if (rawAttrs) {
    var attrUpdater = new ElementAttributesUpdater(elem);
    var updateAttributes = function () {
      var expandedAttrs = Blaze._expandAttributes(rawAttrs, parentView);
      var flattenedAttrs = HTML.flattenAttributes(expandedAttrs);
      var stringAttrs = {};
      for (var attrName in flattenedAttrs) {
        stringAttrs[attrName] = Blaze._toText(flattenedAttrs[attrName],
                                              parentView,
                                              HTML.TEXTMODE.STRING);
      }
      attrUpdater.update(stringAttrs);
    };
    var updaterComputation;
    if (parentView) {
      updaterComputation =
        parentView.autorun(updateAttributes, undefined, 'updater');
    } else {
      updaterComputation = Tracker.nonreactive(function () {
        return Tracker.autorun(function () {
          Tracker._withCurrentView(parentView, updateAttributes);
        });
      });
    }
    Blaze._DOMBackend.Teardown.onElementTeardown(elem, function attrTeardown() {
      updaterComputation.stop();
    });
  }

  if (children.length) {
    var childNodesAndRanges = [];
    // push this function first so that it's done last
    workStack.push(function () {
      for (var i = 0; i < childNodesAndRanges.length; i++) {
        var x = childNodesAndRanges[i];
        if (x instanceof Blaze._DOMRange)
          x.attach(elem);
        else
          elem.appendChild(x);
      }
    });
    // now push the task that calculates childNodesAndRanges
    workStack.push(_.bind(Blaze._materializeDOM, null,
                          children, childNodesAndRanges, parentView,
                          workStack));
  }

  return elem;
};


var isSVGAnchor = function (node) {
  // We generally aren't able to detect SVG <a> elements because
  // if "A" were in our list of known svg element names, then all
  // <a> nodes would be created using
  // `document.createElementNS`. But in the special case of <a
  // xlink:href="...">, we can at least detect that attribute and
  // create an SVG <a> tag in that case.
  //
  // However, we still have a general problem of knowing when to
  // use document.createElementNS and when to use
  // document.createElement; for example, font tags will always
  // be created as SVG elements which can cause other
  // problems. #1977
  return (node.tagName === "a" &&
          node.attrs &&
          node.attrs["xlink:href"] !== undefined);
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/peerlibrary_blaze-components/lib.coffee.js                                                                 //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var ComponentsNamespaceReference, HTMLJSExpander, REQUIRE_RENDERED_INSTANCE, SUPPORTS_REACTIVE_INSTANCE, addEvents, argumentsConstructor, bindComponent, bindDataContext, callTemplateBaseHooks, contentAsFunc, contentAsView, currentViewIfRendering, expand, expandView, getTemplateBase, getTemplateInstance, getTemplateInstanceFunction, method, methodName, originalDot, originalFlattenAttributes, originalGetTemplate, originalInclude, originalVisitTag, ref, registerFirstCreatedHook, registerHooks, templateInstanceToComponent, withTemplateInstanceFunc, wrapHelper, wrapViewAndTemplate,                
  slice = [].slice,                                                                                                    //
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty,                                                                                         //
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };
                                                                                                                       //
getTemplateInstance = function(view, skipBlockHelpers) {                                                               // 1
  while (view && !view._templateInstance) {                                                                            // 2
    if (skipBlockHelpers) {                                                                                            // 3
      view = view.parentView;                                                                                          // 4
    } else {                                                                                                           //
      view = view.originalParentView || view.parentView;                                                               // 6
    }                                                                                                                  //
  }                                                                                                                    //
  return view != null ? view._templateInstance : void 0;                                                               //
};                                                                                                                     // 1
                                                                                                                       //
templateInstanceToComponent = function(templateInstanceFunc, skipBlockHelpers) {                                       // 1
  var templateInstance;                                                                                                // 15
  templateInstance = typeof templateInstanceFunc === "function" ? templateInstanceFunc() : void 0;                     // 15
  templateInstance = getTemplateInstance(templateInstance != null ? templateInstance.view : void 0, skipBlockHelpers);
  while (templateInstance) {                                                                                           // 21
    if ('component' in templateInstance) {                                                                             // 22
      return templateInstance.component;                                                                               // 22
    }                                                                                                                  //
    if (skipBlockHelpers) {                                                                                            // 24
      templateInstance = getTemplateInstance(templateInstance.view.parentView, skipBlockHelpers);                      // 25
    } else {                                                                                                           //
      templateInstance = getTemplateInstance(templateInstance.view.originalParentView || templateInstance.view.parentView, skipBlockHelpers);
    }                                                                                                                  //
  }                                                                                                                    //
  return null;                                                                                                         //
};                                                                                                                     // 14
                                                                                                                       //
getTemplateInstanceFunction = function(view, skipBlockHelpers) {                                                       // 1
  var templateInstance;                                                                                                // 32
  templateInstance = getTemplateInstance(view, skipBlockHelpers);                                                      // 32
  return function() {                                                                                                  //
    return templateInstance;                                                                                           //
  };                                                                                                                   //
};                                                                                                                     // 31
                                                                                                                       //
ComponentsNamespaceReference = (function() {                                                                           // 1
  function ComponentsNamespaceReference(namespace, templateInstance1) {                                                // 37
    this.namespace = namespace;                                                                                        // 37
    this.templateInstance = templateInstance1;                                                                         // 37
  }                                                                                                                    //
                                                                                                                       //
  return ComponentsNamespaceReference;                                                                                 //
                                                                                                                       //
})();                                                                                                                  //
                                                                                                                       //
originalDot = Spacebars.dot;                                                                                           // 1
                                                                                                                       //
Spacebars.dot = function() {                                                                                           // 1
  var args, value;                                                                                                     // 43
  value = arguments[0], args = 2 <= arguments.length ? slice.call(arguments, 1) : [];                                  // 43
  if (value instanceof ComponentsNamespaceReference) {                                                                 // 43
    return Blaze._getTemplate(value.namespace + "." + (args.join('.')), value.templateInstance);                       // 44
  }                                                                                                                    //
  return originalDot.apply(null, [value].concat(slice.call(args)));                                                    //
};                                                                                                                     // 42
                                                                                                                       //
originalInclude = Spacebars.include;                                                                                   // 1
                                                                                                                       //
Spacebars.include = function() {                                                                                       // 1
  var args, templateOrFunction;                                                                                        // 54
  templateOrFunction = arguments[0], args = 2 <= arguments.length ? slice.call(arguments, 1) : [];                     // 54
  if (templateOrFunction instanceof ComponentsNamespaceReference) {                                                    // 54
    templateOrFunction = Blaze._getTemplate(templateOrFunction.namespace, templateOrFunction.templateInstance);        // 55
  }                                                                                                                    //
  return originalInclude.apply(null, [templateOrFunction].concat(slice.call(args)));                                   //
};                                                                                                                     // 49
                                                                                                                       //
Blaze._getTemplateHelper = function(template, name, templateInstance) {                                                // 1
  var component, helper, isKnownOldStyleHelper, mixinOrComponent, ref, ref1, ref2;                                     // 78
  isKnownOldStyleHelper = false;                                                                                       // 78
  if (template.__helpers.has(name)) {                                                                                  // 79
    helper = template.__helpers.get(name);                                                                             // 80
    if (helper === Blaze._OLDSTYLE_HELPER) {                                                                           // 81
      isKnownOldStyleHelper = true;                                                                                    // 82
    } else if (helper != null) {                                                                                       //
      return wrapHelper(bindDataContext(helper), templateInstance);                                                    // 84
    } else {                                                                                                           //
      return null;                                                                                                     // 86
    }                                                                                                                  //
  }                                                                                                                    //
  if (name in template) {                                                                                              // 89
    if (!isKnownOldStyleHelper) {                                                                                      // 91
      template.__helpers.set(name, Blaze._OLDSTYLE_HELPER);                                                            // 92
      if (!template._NOWARN_OLDSTYLE_HELPERS) {                                                                        // 93
        Blaze._warn("Assigning helper with `" + template.viewName + "." + name + " = ...` is deprecated.  Use `" + template.viewName + ".helpers(...)` instead.");
      }                                                                                                                //
    }                                                                                                                  //
    if (template[name] != null) {                                                                                      // 95
      return wrapHelper(bindDataContext(template[name]), templateInstance);                                            // 96
    } else {                                                                                                           //
      return null;                                                                                                     // 98
    }                                                                                                                  //
  }                                                                                                                    //
  if (!templateInstance) {                                                                                             // 100
    return null;                                                                                                       // 100
  }                                                                                                                    //
  if ((ref = template.viewName) === 'Template.__dynamicWithDataContext' || ref === 'Template.__dynamic') {             // 106
    return null;                                                                                                       // 106
  }                                                                                                                    //
  component = Tracker.nonreactive(function() {                                                                         // 78
    return templateInstanceToComponent(templateInstance, true);                                                        //
  });                                                                                                                  //
  if (component) {                                                                                                     // 116
    if (mixinOrComponent = component.getFirstWith(null, name)) {                                                       // 118
      return wrapHelper(bindComponent(mixinOrComponent, mixinOrComponent[name]), templateInstance);                    // 119
    }                                                                                                                  //
  }                                                                                                                    //
  if (name && name in BlazeComponent.components) {                                                                     // 124
    return new ComponentsNamespaceReference(name, templateInstance);                                                   // 125
  }                                                                                                                    //
  if (component) {                                                                                                     // 128
    if ((helper = (ref1 = component._componentInternals) != null ? (ref2 = ref1.templateBase) != null ? ref2.__helpers.get(name) : void 0 : void 0) != null) {
      return wrapHelper(bindDataContext(helper), templateInstance);                                                    // 130
    }                                                                                                                  //
  }                                                                                                                    //
  return null;                                                                                                         //
};                                                                                                                     // 77
                                                                                                                       //
share.inExpandAttributes = false;                                                                                      // 1
                                                                                                                       //
bindComponent = function(component, helper) {                                                                          // 1
  if (_.isFunction(helper)) {                                                                                          // 137
    return function() {                                                                                                //
      var args, name, result, value;                                                                                   // 139
      args = 1 <= arguments.length ? slice.call(arguments, 0) : [];                                                    // 139
      result = helper.apply(component, args);                                                                          // 139
      if (share.inExpandAttributes && _.isObject(result)) {                                                            // 143
        for (name in result) {                                                                                         // 144
          value = result[name];                                                                                        //
          if (share.EVENT_HANDLER_REGEX.test(name)) {                                                                  //
            if (_.isFunction(value)) {                                                                                 // 145
              result[name] = _.bind(value, component);                                                                 // 146
            } else if (_.isArray(value)) {                                                                             //
              result[name] = _.map(value, function(fun) {                                                              // 148
                if (_.isFunction(fun)) {                                                                               // 149
                  return _.bind(fun, component);                                                                       //
                } else {                                                                                               //
                  return fun;                                                                                          //
                }                                                                                                      //
              });                                                                                                      //
            }                                                                                                          //
          }                                                                                                            //
        }                                                                                                              // 144
      }                                                                                                                //
      return result;                                                                                                   //
    };                                                                                                                 //
  } else {                                                                                                             //
    return helper;                                                                                                     //
  }                                                                                                                    //
};                                                                                                                     // 136
                                                                                                                       //
bindDataContext = function(helper) {                                                                                   // 1
  if (_.isFunction(helper)) {                                                                                          // 159
    return function() {                                                                                                //
      var data;                                                                                                        // 161
      data = Blaze.getData();                                                                                          // 161
      if (data == null) {                                                                                              //
        data = {};                                                                                                     //
      }                                                                                                                //
      return helper.apply(data, arguments);                                                                            //
    };                                                                                                                 //
  } else {                                                                                                             //
    return helper;                                                                                                     //
  }                                                                                                                    //
};                                                                                                                     // 158
                                                                                                                       //
wrapHelper = function(f, templateFunc) {                                                                               // 1
  if (!Blaze.Template._withTemplateInstanceFunc) {                                                                     // 169
    return Blaze._wrapCatchingExceptions(f, 'template helper');                                                        // 169
  }                                                                                                                    //
  if (!_.isFunction(f)) {                                                                                              // 171
    return f;                                                                                                          // 171
  }                                                                                                                    //
  return function() {                                                                                                  //
    var args, self;                                                                                                    // 174
    self = this;                                                                                                       // 174
    args = arguments;                                                                                                  // 174
    return Blaze.Template._withTemplateInstanceFunc(templateFunc, function() {                                         //
      return Blaze._wrapCatchingExceptions(f, 'template helper').apply(self, args);                                    //
    });                                                                                                                //
  };                                                                                                                   //
};                                                                                                                     // 167
                                                                                                                       //
if (Blaze.Template._withTemplateInstanceFunc) {                                                                        // 180
  withTemplateInstanceFunc = Blaze.Template._withTemplateInstanceFunc;                                                 // 181
} else {                                                                                                               //
  withTemplateInstanceFunc = function(templateInstance, f) {                                                           // 184
    return f();                                                                                                        //
  };                                                                                                                   //
}                                                                                                                      //
                                                                                                                       //
getTemplateBase = function(component) {                                                                                // 1
  return Tracker.nonreactive(function() {                                                                              //
    var componentTemplate, templateBase;                                                                               // 190
    componentTemplate = component.template();                                                                          // 190
    if (_.isString(componentTemplate)) {                                                                               // 191
      templateBase = Template[componentTemplate];                                                                      // 192
      if (!templateBase) {                                                                                             // 193
        throw new Error("Template '" + componentTemplate + "' cannot be found.");                                      // 193
      }                                                                                                                //
    } else if (componentTemplate) {                                                                                    //
      templateBase = componentTemplate;                                                                                // 195
    } else {                                                                                                           //
      throw new Error("Template for the component '" + (component.componentName() || 'unnamed') + "' not provided.");  // 197
    }                                                                                                                  //
    return templateBase;                                                                                               //
  });                                                                                                                  //
};                                                                                                                     // 187
                                                                                                                       //
callTemplateBaseHooks = function(component, hookName) {                                                                // 1
  var callbacks, templateInstance;                                                                                     // 202
  if (component._componentInternals == null) {                                                                         //
    component._componentInternals = {};                                                                                //
  }                                                                                                                    //
  if (!component._componentInternals.templateInstance) {                                                               // 206
    return;                                                                                                            // 206
  }                                                                                                                    //
  templateInstance = Tracker.nonreactive(function() {                                                                  // 202
    return component._componentInternals.templateInstance();                                                           //
  });                                                                                                                  //
  callbacks = component._componentInternals.templateBase._getCallbacks(hookName);                                      // 202
  Template._withTemplateInstanceFunc(function() {                                                                      // 202
    return templateInstance;                                                                                           //
  }, function() {                                                                                                      //
    var callback, i, len, results;                                                                                     // 216
    results = [];                                                                                                      // 216
    for (i = 0, len = callbacks.length; i < len; i++) {                                                                //
      callback = callbacks[i];                                                                                         //
      results.push(callback.call(templateInstance));                                                                   // 217
    }                                                                                                                  // 216
    return results;                                                                                                    //
  });                                                                                                                  //
};                                                                                                                     // 201
                                                                                                                       //
wrapViewAndTemplate = function(currentView, f) {                                                                       // 1
  var templateInstance;                                                                                                // 227
  templateInstance = getTemplateInstanceFunction(currentView, true);                                                   // 227
  return withTemplateInstanceFunc(templateInstance, function() {                                                       //
    return Blaze._withCurrentView(currentView, function() {                                                            //
      return f();                                                                                                      //
    });                                                                                                                //
  });                                                                                                                  //
};                                                                                                                     // 222
                                                                                                                       //
addEvents = function(view, component) {                                                                                // 1
  var eventMap, events, eventsList, fn, handler, i, len, spec;                                                         // 243
  eventsList = component.events();                                                                                     // 243
  if (!_.isArray(eventsList)) {                                                                                        // 245
    throw new Error("'events' method from the component '" + (component.componentName() || 'unnamed') + "' did not return a list of event maps.");
  }                                                                                                                    //
  for (i = 0, len = eventsList.length; i < len; i++) {                                                                 // 247
    events = eventsList[i];                                                                                            //
    eventMap = {};                                                                                                     // 248
    fn = function(spec, handler) {                                                                                     // 250
      return eventMap[spec] = function() {                                                                             //
        var args, currentView, event;                                                                                  // 253
        args = 1 <= arguments.length ? slice.call(arguments, 0) : [];                                                  // 253
        event = args[0];                                                                                               // 253
        currentView = Blaze.getView(event.currentTarget);                                                              // 253
        wrapViewAndTemplate(currentView, function() {                                                                  // 253
          return handler.apply(component, args);                                                                       //
        });                                                                                                            //
      };                                                                                                               //
    };                                                                                                                 //
    for (spec in events) {                                                                                             // 250
      handler = events[spec];                                                                                          //
      fn(spec, handler);                                                                                               // 251
    }                                                                                                                  // 250
    Blaze._addEventMap(view, eventMap, view);                                                                          // 248
  }                                                                                                                    // 247
};                                                                                                                     // 242
                                                                                                                       //
originalGetTemplate = Blaze._getTemplate;                                                                              // 1
                                                                                                                       //
Blaze._getTemplate = function(name, templateInstance) {                                                                // 1
  var template;                                                                                                        // 270
  template = Tracker.nonreactive(function() {                                                                          // 270
    var parentComponent, ref;                                                                                          // 271
    if (Blaze.currentView) {                                                                                           // 271
      parentComponent = BlazeComponent.currentComponent();                                                             // 272
    } else {                                                                                                           //
      parentComponent = templateInstanceToComponent(templateInstance, false);                                          // 276
    }                                                                                                                  //
    return (ref = BlazeComponent.getComponent(name)) != null ? ref.renderComponent(parentComponent) : void 0;          //
  });                                                                                                                  //
  if (template && (template instanceof Blaze.Template || _.isFunction(template))) {                                    // 279
    return template;                                                                                                   // 279
  }                                                                                                                    //
  return originalGetTemplate(name);                                                                                    //
};                                                                                                                     // 268
                                                                                                                       //
registerHooks = function(template, hooks) {                                                                            // 1
  if (template.onCreated) {                                                                                            // 284
    template.onCreated(hooks.onCreated);                                                                               // 285
    template.onRendered(hooks.onRendered);                                                                             // 285
    return template.onDestroyed(hooks.onDestroyed);                                                                    //
  } else {                                                                                                             //
    template.created = hooks.onCreated;                                                                                // 290
    template.rendered = hooks.onRendered;                                                                              // 290
    return template.destroyed = hooks.onDestroyed;                                                                     //
  }                                                                                                                    //
};                                                                                                                     // 283
                                                                                                                       //
registerFirstCreatedHook = function(template, onCreated) {                                                             // 1
  var oldCreated;                                                                                                      // 295
  if (template._callbacks) {                                                                                           // 295
    return template._callbacks.created.unshift(onCreated);                                                             //
  } else {                                                                                                             //
    oldCreated = template.created;                                                                                     // 299
    return template.created = function() {                                                                             //
      onCreated.call(this);                                                                                            // 301
      return oldCreated != null ? oldCreated.call(this) : void 0;                                                      //
    };                                                                                                                 //
  }                                                                                                                    //
};                                                                                                                     // 294
                                                                                                                       //
Template.__dynamicWithDataContext.__helpers.set('chooseTemplate', function(name) {                                     // 1
  return Blaze._getTemplate(name, (function(_this) {                                                                   //
    return function() {                                                                                                //
      return Template.instance();                                                                                      //
    };                                                                                                                 //
  })(this));                                                                                                           //
});                                                                                                                    // 311
                                                                                                                       //
argumentsConstructor = function() {                                                                                    // 1
  return assert(false);                                                                                                //
};                                                                                                                     // 315
                                                                                                                       //
Template.registerHelper('args', function() {                                                                           // 1
  var obj;                                                                                                             // 322
  obj = {};                                                                                                            // 322
  obj.constructor = argumentsConstructor;                                                                              // 322
  obj._arguments = arguments;                                                                                          // 322
  return obj;                                                                                                          //
});                                                                                                                    // 321
                                                                                                                       //
share.EVENT_HANDLER_REGEX = /^on[A-Z]/;                                                                                // 1
                                                                                                                       //
share.isEventHandler = function(fun) {                                                                                 // 1
  return _.isFunction(fun) && fun.eventHandler;                                                                        //
};                                                                                                                     // 330
                                                                                                                       //
originalFlattenAttributes = HTML.flattenAttributes;                                                                    // 1
                                                                                                                       //
HTML.flattenAttributes = function(attrs) {                                                                             // 1
  var name, value;                                                                                                     // 337
  if (attrs = originalFlattenAttributes(attrs)) {                                                                      // 337
    for (name in attrs) {                                                                                              // 338
      value = attrs[name];                                                                                             //
      if (!(share.EVENT_HANDLER_REGEX.test(name))) {                                                                   //
        continue;                                                                                                      //
      }                                                                                                                //
      if (share.isEventHandler(value)) {                                                                               // 340
        continue;                                                                                                      // 340
      }                                                                                                                //
      if (_.isArray(value) && _.some(value, share.isEventHandler)) {                                                   // 341
        continue;                                                                                                      // 341
      }                                                                                                                //
      if (_.isArray(value)) {                                                                                          // 345
        attrs[name] = _.map(value, Spacebars.event);                                                                   // 346
      } else {                                                                                                         //
        attrs[name] = Spacebars.event(value);                                                                          // 348
      }                                                                                                                //
    }                                                                                                                  // 338
  }                                                                                                                    //
  return attrs;                                                                                                        //
};                                                                                                                     // 336
                                                                                                                       //
Spacebars.event = function() {                                                                                         // 1
  var args, eventHandler, fun;                                                                                         // 353
  eventHandler = arguments[0], args = 2 <= arguments.length ? slice.call(arguments, 1) : [];                           // 353
  if (!_.isFunction(eventHandler)) {                                                                                   // 353
    throw new Error("Event handler not a function: " + eventHandler);                                                  // 353
  }                                                                                                                    //
  args = Spacebars.mustacheImpl.apply(Spacebars, [(function() {                                                        // 353
    var xs;                                                                                                            // 356
    xs = 1 <= arguments.length ? slice.call(arguments, 0) : [];                                                        // 356
    return xs;                                                                                                         //
  })].concat(slice.call(args)));                                                                                       //
  fun = function() {                                                                                                   // 353
    var currentView, event, eventArgs;                                                                                 // 359
    event = arguments[0], eventArgs = 2 <= arguments.length ? slice.call(arguments, 1) : [];                           // 359
    currentView = Blaze.getView(event.currentTarget);                                                                  // 359
    return wrapViewAndTemplate(currentView, function() {                                                               //
      return eventHandler.apply(null, [event].concat(args, eventArgs));                                                //
    });                                                                                                                //
  };                                                                                                                   //
  fun.eventHandler = true;                                                                                             // 353
  return fun;                                                                                                          //
};                                                                                                                     // 352
                                                                                                                       //
originalVisitTag = HTML.ToHTMLVisitor.prototype.visitTag;                                                              // 1
                                                                                                                       //
HTML.ToHTMLVisitor.prototype.visitTag = function(tag) {                                                                // 1
  var attrs, name;                                                                                                     // 373
  if (attrs = tag.attrs) {                                                                                             // 373
    attrs = HTML.flattenAttributes(attrs);                                                                             // 374
    for (name in attrs) {                                                                                              // 375
      if (share.EVENT_HANDLER_REGEX.test(name)) {                                                                      //
        delete attrs[name];                                                                                            // 376
      }                                                                                                                //
    }                                                                                                                  // 375
    tag.attrs = attrs;                                                                                                 // 374
  }                                                                                                                    //
  return originalVisitTag.call(this, tag);                                                                             //
};                                                                                                                     // 372
                                                                                                                       //
currentViewIfRendering = function() {                                                                                  // 1
  var view;                                                                                                            // 382
  view = Blaze.currentView;                                                                                            // 382
  if (view != null ? view._isInRender : void 0) {                                                                      // 383
    return view;                                                                                                       //
  } else {                                                                                                             //
    return null;                                                                                                       //
  }                                                                                                                    //
};                                                                                                                     // 381
                                                                                                                       //
contentAsFunc = function(content) {                                                                                    // 1
  if (!_.isFunction(content)) {                                                                                        // 391
    return function() {                                                                                                // 392
      return content;                                                                                                  //
    };                                                                                                                 //
  }                                                                                                                    //
  return content;                                                                                                      //
};                                                                                                                     // 388
                                                                                                                       //
contentAsView = function(content) {                                                                                    // 1
  if (content instanceof Blaze.Template) {                                                                             // 400
    return content.constructView();                                                                                    //
  } else if (content instanceof Blaze.View) {                                                                          //
    return content;                                                                                                    //
  } else {                                                                                                             //
    return Blaze.View('render', contentAsFunc(content));                                                               //
  }                                                                                                                    //
};                                                                                                                     // 397
                                                                                                                       //
HTMLJSExpander = Blaze._HTMLJSExpander.extend();                                                                       // 1
                                                                                                                       //
HTMLJSExpander.def({                                                                                                   // 1
  visitObject: function(x) {                                                                                           // 410
    if (x instanceof Blaze.Template) {                                                                                 // 411
      x = x.constructView();                                                                                           // 412
    }                                                                                                                  //
    if (x instanceof Blaze.View) {                                                                                     // 413
      return expandView(x, this.parentView);                                                                           // 414
    }                                                                                                                  //
    return HTML.TransformingVisitor.prototype.visitObject.call(this, x);                                               //
  }                                                                                                                    //
});                                                                                                                    //
                                                                                                                       //
expand = function(htmljs, parentView) {                                                                                // 1
  parentView = parentView || currentViewIfRendering();                                                                 // 420
  return (new HTMLJSExpander({                                                                                         //
    parentView: parentView                                                                                             // 422
  })).visit(htmljs);                                                                                                   //
};                                                                                                                     // 419
                                                                                                                       //
expandView = function(view, parentView) {                                                                              // 1
  var htmljs, result;                                                                                                  // 426
  Blaze._createView(view, parentView, true);                                                                           // 426
  view._isInRender = true;                                                                                             // 426
  htmljs = Blaze._withCurrentView(view, function() {                                                                   // 426
    return view._render();                                                                                             //
  });                                                                                                                  //
  view._isInRender = false;                                                                                            // 426
  Tracker.flush();                                                                                                     // 426
  result = expand(htmljs, view);                                                                                       // 426
  Tracker.flush();                                                                                                     // 426
  if (Tracker.active) {                                                                                                // 439
    Tracker.onInvalidate(function() {                                                                                  // 440
      return Blaze._destroyView(view);                                                                                 //
    });                                                                                                                //
  } else {                                                                                                             //
    Blaze._destroyView(view);                                                                                          // 443
  }                                                                                                                    //
  Tracker.flush();                                                                                                     // 426
  return result;                                                                                                       //
};                                                                                                                     // 425
                                                                                                                       //
BlazeComponent = (function(superClass) {                                                                               // 1
  extend(BlazeComponent, superClass);                                                                                  // 451
                                                                                                                       //
  function BlazeComponent() {                                                                                          //
    return BlazeComponent.__super__.constructor.apply(this, arguments);                                                //
  }                                                                                                                    //
                                                                                                                       //
  BlazeComponent.getComponentForElement = function(domElement) {                                                       // 451
    var templateInstance;                                                                                              // 452
    if (!domElement) {                                                                                                 // 452
      return null;                                                                                                     // 452
    }                                                                                                                  //
    if (domElement.nodeType !== Node.ELEMENT_NODE) {                                                                   // 455
      throw new Error("Expected DOM element.");                                                                        // 455
    }                                                                                                                  //
    templateInstance = getTemplateInstanceFunction(Blaze.getView(domElement), true);                                   // 452
    return templateInstanceToComponent(templateInstance, true);                                                        //
  };                                                                                                                   //
                                                                                                                       //
  BlazeComponent.prototype.mixins = function() {                                                                       // 451
    return [];                                                                                                         //
  };                                                                                                                   //
                                                                                                                       //
  BlazeComponent.prototype.mixinParent = function(mixinParent) {                                                       // 451
    if (this._componentInternals == null) {                                                                            //
      this._componentInternals = {};                                                                                   //
    }                                                                                                                  //
    if (mixinParent) {                                                                                                 // 474
      this._componentInternals.mixinParent = mixinParent;                                                              // 475
      return this;                                                                                                     // 477
    }                                                                                                                  //
    return this._componentInternals.mixinParent || null;                                                               //
  };                                                                                                                   //
                                                                                                                       //
  BlazeComponent.prototype.requireMixin = function(nameOrMixin) {                                                      // 451
    var ref;                                                                                                           // 483
    assert((ref = this._componentInternals) != null ? ref.mixins : void 0);                                            // 483
    Tracker.nonreactive((function(_this) {                                                                             // 483
      return function() {                                                                                              //
        var base, mixinInstance, mixinInstanceComponent, ref1, ref2, ref3;                                             // 488
        if (_this.getMixin(nameOrMixin)) {                                                                             // 488
          return;                                                                                                      // 488
        }                                                                                                              //
        if (_.isString(nameOrMixin)) {                                                                                 // 490
          if (_this.constructor.getComponent) {                                                                        // 493
            mixinInstanceComponent = _this.constructor.getComponent(nameOrMixin);                                      // 494
          } else {                                                                                                     //
            mixinInstanceComponent = BlazeComponent.getComponent(nameOrMixin);                                         // 496
          }                                                                                                            //
          if (!mixinInstanceComponent) {                                                                               // 497
            throw new Error("Unknown mixin '" + nameOrMixin + "'.");                                                   // 497
          }                                                                                                            //
          mixinInstance = new mixinInstanceComponent();                                                                // 493
        } else if (_.isFunction(nameOrMixin)) {                                                                        //
          mixinInstance = new nameOrMixin();                                                                           // 500
        } else {                                                                                                       //
          mixinInstance = nameOrMixin;                                                                                 // 502
        }                                                                                                              //
        _this._componentInternals.mixins.push(mixinInstance);                                                          // 488
        if (mixinInstance.mixinParent) {                                                                               // 512
          mixinInstance.mixinParent(_this);                                                                            // 513
        }                                                                                                              //
        if (typeof mixinInstance.createMixins === "function") {                                                        //
          mixinInstance.createMixins();                                                                                //
        }                                                                                                              //
        if ((base = _this._componentInternals).templateInstance == null) {                                             //
          base.templateInstance = new ReactiveField(null, function(a, b) {                                             //
            return a === b;                                                                                            //
          });                                                                                                          //
        }                                                                                                              //
        if (!((ref1 = _this._componentInternals.templateInstance()) != null ? ref1.view.isDestroyed : void 0)) {       // 524
          if (!_this._componentInternals.inOnCreated && ((ref2 = _this._componentInternals.templateInstance()) != null ? ref2.view.isCreated : void 0)) {
            if (typeof mixinInstance.onCreated === "function") {                                                       //
              mixinInstance.onCreated();                                                                               //
            }                                                                                                          //
          }                                                                                                            //
          if (!_this._componentInternals.inOnRendered && ((ref3 = _this._componentInternals.templateInstance()) != null ? ref3.view.isRendered : void 0)) {
            return typeof mixinInstance.onRendered === "function" ? mixinInstance.onRendered() : void 0;               //
          }                                                                                                            //
        }                                                                                                              //
      };                                                                                                               //
    })(this));                                                                                                         //
    return this;                                                                                                       //
  };                                                                                                                   //
                                                                                                                       //
  BlazeComponent.prototype.createMixins = function() {                                                                 // 451
    var i, len, mixin, ref;                                                                                            // 533
    if (this._componentInternals == null) {                                                                            //
      this._componentInternals = {};                                                                                   //
    }                                                                                                                  //
    if (this._componentInternals.mixins) {                                                                             // 536
      return;                                                                                                          // 536
    }                                                                                                                  //
    this._componentInternals.mixins = [];                                                                              // 533
    ref = this.mixins();                                                                                               // 539
    for (i = 0, len = ref.length; i < len; i++) {                                                                      // 539
      mixin = ref[i];                                                                                                  //
      this.requireMixin(mixin);                                                                                        // 540
    }                                                                                                                  // 539
    return this;                                                                                                       //
  };                                                                                                                   //
                                                                                                                       //
  BlazeComponent.prototype.getMixin = function(nameOrMixin) {                                                          // 451
    var i, j, len, len1, mixin, mixinComponentName, ref, ref1, ref2;                                                   // 546
    assert((ref = this._componentInternals) != null ? ref.mixins : void 0);                                            // 546
    if (_.isString(nameOrMixin)) {                                                                                     // 548
      ref1 = this._componentInternals.mixins;                                                                          // 549
      for (i = 0, len = ref1.length; i < len; i++) {                                                                   // 549
        mixin = ref1[i];                                                                                               //
        mixinComponentName = (typeof mixin.componentName === "function" ? mixin.componentName() : void 0) || null;     // 552
        if (mixinComponentName && mixinComponentName === nameOrMixin) {                                                // 553
          return mixin;                                                                                                // 553
        }                                                                                                              //
      }                                                                                                                // 549
    } else {                                                                                                           //
      ref2 = this._componentInternals.mixins;                                                                          // 556
      for (j = 0, len1 = ref2.length; j < len1; j++) {                                                                 // 556
        mixin = ref2[j];                                                                                               //
        if (mixin.constructor === nameOrMixin) {                                                                       // 558
          return mixin;                                                                                                // 559
        } else if (mixin === nameOrMixin) {                                                                            //
          return mixin;                                                                                                // 563
        }                                                                                                              //
      }                                                                                                                // 556
    }                                                                                                                  //
    return null;                                                                                                       //
  };                                                                                                                   //
                                                                                                                       //
  BlazeComponent.prototype.callFirstWith = function() {                                                                // 451
    var afterComponentOrMixin, args, mixin, propertyName;                                                              // 570
    afterComponentOrMixin = arguments[0], propertyName = arguments[1], args = 3 <= arguments.length ? slice.call(arguments, 2) : [];
    mixin = this.getFirstWith(afterComponentOrMixin, propertyName);                                                    // 570
    if (!mixin) {                                                                                                      // 573
      return;                                                                                                          // 573
    }                                                                                                                  //
    if (_.isFunction(mixin[propertyName])) {                                                                           // 575
      return mixin[propertyName].apply(mixin, args);                                                                   // 576
    } else {                                                                                                           //
      return mixin[propertyName];                                                                                      // 578
    }                                                                                                                  //
  };                                                                                                                   //
                                                                                                                       //
  BlazeComponent.prototype.getFirstWith = function(afterComponentOrMixin, propertyName) {                              // 451
    var found, i, len, mixin, ref, ref1;                                                                               // 581
    assert((ref = this._componentInternals) != null ? ref.mixins : void 0);                                            // 581
    if (!afterComponentOrMixin) {                                                                                      // 584
      if (propertyName in this) {                                                                                      // 585
        return this;                                                                                                   // 585
      }                                                                                                                //
      found = true;                                                                                                    // 585
    } else if (afterComponentOrMixin && afterComponentOrMixin === this) {                                              //
      found = true;                                                                                                    // 590
    } else {                                                                                                           //
      found = false;                                                                                                   // 592
    }                                                                                                                  //
    ref1 = this._componentInternals.mixins;                                                                            // 595
    for (i = 0, len = ref1.length; i < len; i++) {                                                                     // 595
      mixin = ref1[i];                                                                                                 //
      if (found && propertyName in mixin) {                                                                            // 596
        return mixin;                                                                                                  // 596
      }                                                                                                                //
      if (mixin === afterComponentOrMixin) {                                                                           // 598
        found = true;                                                                                                  // 598
      }                                                                                                                //
    }                                                                                                                  // 595
    return null;                                                                                                       //
  };                                                                                                                   //
                                                                                                                       //
  BlazeComponent.renderComponent = function(parentComponent) {                                                         // 451
    return Tracker.nonreactive((function(_this) {                                                                      //
      return function() {                                                                                              //
        var componentClass, data;                                                                                      // 609
        componentClass = _this;                                                                                        // 609
        if (Blaze.currentView) {                                                                                       // 611
          data = Template.currentData();                                                                               // 617
        } else {                                                                                                       //
          data = null;                                                                                                 // 621
        }                                                                                                              //
        if ((data != null ? data.constructor : void 0) !== argumentsConstructor) {                                     // 623
          return wrapViewAndTemplate(Blaze.currentView, function() {                                                   // 626
            var component;                                                                                             // 627
            component = new componentClass();                                                                          // 627
            return component.renderComponent(parentComponent);                                                         // 629
          });                                                                                                          //
        }                                                                                                              //
        return function() {                                                                                            //
          var currentWith, nonreactiveArguments, reactiveArguments;                                                    // 636
          assert(Tracker.active);                                                                                      // 636
          currentWith = Blaze.getView('with');                                                                         // 636
          reactiveArguments = new ComputedField(function() {                                                           // 636
            data = currentWith.dataVar.get();                                                                          // 649
            assert.equal(data != null ? data.constructor : void 0, argumentsConstructor);                              // 649
            return data._arguments;                                                                                    //
          }, EJSON.equals);                                                                                            //
          nonreactiveArguments = reactiveArguments();                                                                  // 636
          return Tracker.nonreactive(function() {                                                                      //
            var template;                                                                                              // 661
            template = Blaze._withCurrentView(Blaze.currentView.parentView.parentView, (function(_this) {              // 661
              return function() {                                                                                      //
                return wrapViewAndTemplate(Blaze.currentView, function() {                                             // 664
                  var component;                                                                                       // 666
                  component = (function(func, args, ctor) {                                                            // 666
                    ctor.prototype = func.prototype;                                                                   //
                    var child = new ctor, result = func.apply(child, args);                                            //
                    return Object(result) === result ? result : child;                                                 //
                  })(componentClass, nonreactiveArguments, function(){});                                              //
                  return component.renderComponent(parentComponent);                                                   // 668
                });                                                                                                    //
              };                                                                                                       //
            })(this));                                                                                                 //
            registerFirstCreatedHook(template, function() {                                                            // 661
              this.view.originalParentView = this.view.parentView;                                                     // 674
              return this.view.parentView = this.view.parentView.parentView.parentView;                                //
            });                                                                                                        //
            return template;                                                                                           //
          });                                                                                                          //
        };                                                                                                             //
      };                                                                                                               //
    })(this));                                                                                                         //
  };                                                                                                                   //
                                                                                                                       //
  BlazeComponent.prototype.renderComponent = function(parentComponent) {                                               // 451
    return Tracker.nonreactive((function(_this) {                                                                      //
      return function() {                                                                                              //
        var component, template, templateBase;                                                                         // 685
        component = _this;                                                                                             // 685
        component.createMixins();                                                                                      // 685
        templateBase = getTemplateBase(component);                                                                     // 685
        template = new Blaze.Template("BlazeComponent." + (component.componentName() || 'unnamed'), templateBase.renderFunction);
        if (component._componentInternals == null) {                                                                   //
          component._componentInternals = {};                                                                          //
        }                                                                                                              //
        component._componentInternals.templateBase = templateBase;                                                     // 685
        registerHooks(template, {                                                                                      // 685
          onCreated: function() {                                                                                      // 705
            var base, base1, base2, base3, componentOrMixin, results;                                                  // 708
            if (parentComponent) {                                                                                     // 708
              Tracker.nonreactive((function(_this) {                                                                   // 710
                return function() {                                                                                    //
                  assert(!component.parentComponent());                                                                // 712
                  component.parentComponent(parentComponent);                                                          // 712
                  return parentComponent.addChildComponent(component);                                                 //
                };                                                                                                     //
              })(this));                                                                                               //
            }                                                                                                          //
            this.view._onViewRendered((function(_this) {                                                               // 708
              return function() {                                                                                      //
                var componentOrMixin, results;                                                                         // 720
                if (_this.view.renderCount !== 1) {                                                                    // 720
                  return;                                                                                              // 720
                }                                                                                                      //
                componentOrMixin = null;                                                                               // 720
                results = [];                                                                                          // 724
                while (componentOrMixin = _this.component.getFirstWith(componentOrMixin, 'events')) {                  //
                  results.push(addEvents(_this.view, componentOrMixin));                                               // 725
                }                                                                                                      //
                return results;                                                                                        //
              };                                                                                                       //
            })(this));                                                                                                 //
            this.component = component;                                                                                // 708
            assert(!Tracker.nonreactive((function(_this) {                                                             // 708
              return function() {                                                                                      //
                var base;                                                                                              // 730
                return typeof (base = _this.component._componentInternals).templateInstance === "function" ? base.templateInstance() : void 0;
              };                                                                                                       //
            })(this)));                                                                                                //
            if ((base = this.component._componentInternals).templateInstance == null) {                                //
              base.templateInstance = new ReactiveField(this, function(a, b) {                                         //
                return a === b;                                                                                        //
              });                                                                                                      //
            }                                                                                                          //
            this.component._componentInternals.templateInstance(this);                                                 // 708
            if ((base1 = this.component._componentInternals).isCreated == null) {                                      //
              base1.isCreated = new ReactiveField(true);                                                               //
            }                                                                                                          //
            this.component._componentInternals.isCreated(true);                                                        // 708
            if ((base2 = this.component._componentInternals).isRendered == null) {                                     //
              base2.isRendered = new ReactiveField(false);                                                             //
            }                                                                                                          //
            this.component._componentInternals.isRendered(false);                                                      // 708
            if ((base3 = this.component._componentInternals).isDestroyed == null) {                                    //
              base3.isDestroyed = new ReactiveField(false);                                                            //
            }                                                                                                          //
            this.component._componentInternals.isDestroyed(false);                                                     // 708
            try {                                                                                                      // 746
              this.component._componentInternals.inOnCreated = true;                                                   // 751
              componentOrMixin = null;                                                                                 // 751
              results = [];                                                                                            // 753
              while (componentOrMixin = this.component.getFirstWith(componentOrMixin, 'onCreated')) {                  //
                results.push(componentOrMixin.onCreated());                                                            // 754
              }                                                                                                        //
              return results;                                                                                          //
            } finally {                                                                                                //
              delete this.component._componentInternals.inOnCreated;                                                   // 756
            }                                                                                                          //
          },                                                                                                           //
          onRendered: function() {                                                                                     // 705
            var base, componentOrMixin, results;                                                                       // 761
            if ((base = this.component._componentInternals).isRendered == null) {                                      //
              base.isRendered = new ReactiveField(true);                                                               //
            }                                                                                                          //
            this.component._componentInternals.isRendered(true);                                                       // 761
            Tracker.nonreactive((function(_this) {                                                                     // 761
              return function() {                                                                                      //
                return assert.equal(_this.component._componentInternals.isCreated(), true);                            //
              };                                                                                                       //
            })(this));                                                                                                 //
            try {                                                                                                      // 767
              this.component._componentInternals.inOnRendered = true;                                                  // 769
              componentOrMixin = null;                                                                                 // 769
              results = [];                                                                                            // 771
              while (componentOrMixin = this.component.getFirstWith(componentOrMixin, 'onRendered')) {                 //
                results.push(componentOrMixin.onRendered());                                                           // 772
              }                                                                                                        //
              return results;                                                                                          //
            } finally {                                                                                                //
              delete this.component._componentInternals.inOnRendered;                                                  // 774
            }                                                                                                          //
          },                                                                                                           //
          onDestroyed: function() {                                                                                    // 705
            return this.autorun((function(_this) {                                                                     //
              return function(computation) {                                                                           //
                if (_this.component.childComponents().length) {                                                        // 782
                  return;                                                                                              // 782
                }                                                                                                      //
                computation.stop();                                                                                    // 782
                return Tracker.nonreactive(function() {                                                                //
                  var base, base1, componentOrMixin;                                                                   // 786
                  assert.equal(_this.component._componentInternals.isCreated(), true);                                 // 786
                  _this.component._componentInternals.isCreated(false);                                                // 786
                  if ((base = _this.component._componentInternals).isRendered == null) {                               //
                    base.isRendered = new ReactiveField(false);                                                        //
                  }                                                                                                    //
                  _this.component._componentInternals.isRendered(false);                                               // 786
                  if ((base1 = _this.component._componentInternals).isDestroyed == null) {                             //
                    base1.isDestroyed = new ReactiveField(true);                                                       //
                  }                                                                                                    //
                  _this.component._componentInternals.isDestroyed(true);                                               // 786
                  componentOrMixin = null;                                                                             // 786
                  while (componentOrMixin = _this.component.getFirstWith(componentOrMixin, 'onDestroyed')) {           // 797
                    componentOrMixin.onDestroyed();                                                                    // 798
                  }                                                                                                    //
                  if (parentComponent) {                                                                               // 800
                    component.parentComponent(null);                                                                   // 802
                    parentComponent.removeChildComponent(component);                                                   // 802
                  }                                                                                                    //
                  return _this.component._componentInternals.templateInstance(null);                                   //
                });                                                                                                    //
              };                                                                                                       //
            })(this));                                                                                                 //
          }                                                                                                            //
        });                                                                                                            //
        return template;                                                                                               //
      };                                                                                                               //
    })(this));                                                                                                         //
  };                                                                                                                   //
                                                                                                                       //
  BlazeComponent.prototype.removeComponent = function() {                                                              // 451
    if (this.isRendered()) {                                                                                           // 811
      return Blaze.remove(this._componentInternals.templateInstance().view);                                           //
    }                                                                                                                  //
  };                                                                                                                   //
                                                                                                                       //
  BlazeComponent.renderComponentToHTML = function(parentComponent, parentView, data) {                                 // 451
    var component;                                                                                                     // 814
    component = Tracker.nonreactive((function(_this) {                                                                 // 814
      return function() {                                                                                              //
        var componentClass;                                                                                            // 815
        componentClass = _this;                                                                                        // 815
        parentView = parentView || currentViewIfRendering() || ((parentComponent != null ? parentComponent.isRendered() : void 0) && parentComponent._componentInternals.templateInstance().view) || null;
        return wrapViewAndTemplate(parentView, function() {                                                            //
          return new componentClass();                                                                                 //
        });                                                                                                            //
      };                                                                                                               //
    })(this));                                                                                                         //
    if (arguments.length > 2) {                                                                                        // 822
      return component.renderComponentToHTML(parentComponent, parentView, data);                                       //
    } else {                                                                                                           //
      return component.renderComponentToHTML(parentComponent, parentView);                                             //
    }                                                                                                                  //
  };                                                                                                                   //
                                                                                                                       //
  BlazeComponent.prototype.renderComponentToHTML = function(parentComponent, parentView, data) {                       // 451
    var expandedView, template;                                                                                        // 828
    template = Tracker.nonreactive((function(_this) {                                                                  // 828
      return function() {                                                                                              //
        parentView = parentView || currentViewIfRendering() || ((parentComponent != null ? parentComponent.isRendered() : void 0) && parentComponent._componentInternals.templateInstance().view) || null;
        return wrapViewAndTemplate(parentView, function() {                                                            //
          return _this.renderComponent(parentComponent);                                                               //
        });                                                                                                            //
      };                                                                                                               //
    })(this));                                                                                                         //
    if (arguments.length > 2) {                                                                                        // 834
      expandedView = expandView(Blaze._TemplateWith(data, contentAsFunc(template)), parentView);                       // 835
    } else {                                                                                                           //
      expandedView = expandView(contentAsView(template), parentView);                                                  // 837
    }                                                                                                                  //
    return HTML.toHTML(expandedView);                                                                                  //
  };                                                                                                                   //
                                                                                                                       //
  BlazeComponent.prototype.template = function() {                                                                     // 451
    return this.callFirstWith(this, 'template') || this.constructor.componentName();                                   //
  };                                                                                                                   //
                                                                                                                       //
  BlazeComponent.prototype.onCreated = function() {                                                                    // 451
    return callTemplateBaseHooks(this, 'created');                                                                     //
  };                                                                                                                   //
                                                                                                                       //
  BlazeComponent.prototype.onRendered = function() {                                                                   // 451
    return callTemplateBaseHooks(this, 'rendered');                                                                    //
  };                                                                                                                   //
                                                                                                                       //
  BlazeComponent.prototype.onDestroyed = function() {                                                                  // 451
    return callTemplateBaseHooks(this, 'destroyed');                                                                   //
  };                                                                                                                   //
                                                                                                                       //
  BlazeComponent.prototype.isCreated = function() {                                                                    // 451
    var base;                                                                                                          // 854
    if (this._componentInternals == null) {                                                                            //
      this._componentInternals = {};                                                                                   //
    }                                                                                                                  //
    if ((base = this._componentInternals).isCreated == null) {                                                         //
      base.isCreated = new ReactiveField(false);                                                                       //
    }                                                                                                                  //
    return this._componentInternals.isCreated();                                                                       //
  };                                                                                                                   //
                                                                                                                       //
  BlazeComponent.prototype.isRendered = function() {                                                                   // 451
    var base;                                                                                                          // 860
    if (this._componentInternals == null) {                                                                            //
      this._componentInternals = {};                                                                                   //
    }                                                                                                                  //
    if ((base = this._componentInternals).isRendered == null) {                                                        //
      base.isRendered = new ReactiveField(false);                                                                      //
    }                                                                                                                  //
    return this._componentInternals.isRendered();                                                                      //
  };                                                                                                                   //
                                                                                                                       //
  BlazeComponent.prototype.isDestroyed = function() {                                                                  // 451
    var base;                                                                                                          // 866
    if (this._componentInternals == null) {                                                                            //
      this._componentInternals = {};                                                                                   //
    }                                                                                                                  //
    if ((base = this._componentInternals).isDestroyed == null) {                                                       //
      base.isDestroyed = new ReactiveField(false);                                                                     //
    }                                                                                                                  //
    return this._componentInternals.isDestroyed();                                                                     //
  };                                                                                                                   //
                                                                                                                       //
  BlazeComponent.prototype.insertDOMElement = function(parent, node, before) {                                         // 451
    if (before == null) {                                                                                              //
      before = null;                                                                                                   //
    }                                                                                                                  //
    if (parent && node && (node.parentNode !== parent || node.nextSibling !== before)) {                               // 873
      parent.insertBefore(node, before);                                                                               // 874
    }                                                                                                                  //
  };                                                                                                                   //
                                                                                                                       //
  BlazeComponent.prototype.moveDOMElement = function(parent, node, before) {                                           // 451
    if (before == null) {                                                                                              //
      before = null;                                                                                                   //
    }                                                                                                                  //
    if (parent && node && (node.parentNode !== parent || node.nextSibling !== before)) {                               // 880
      parent.insertBefore(node, before);                                                                               // 881
    }                                                                                                                  //
  };                                                                                                                   //
                                                                                                                       //
  BlazeComponent.prototype.removeDOMElement = function(parent, node) {                                                 // 451
    if (parent && node && node.parentNode === parent) {                                                                // 886
      parent.removeChild(node);                                                                                        // 887
    }                                                                                                                  //
  };                                                                                                                   //
                                                                                                                       //
  BlazeComponent.prototype.events = function() {                                                                       // 451
    var eventMap, events, fn, handler, i, len, ref, results, spec, templateInstance, view;                             // 892
    if (this._componentInternals == null) {                                                                            //
      this._componentInternals = {};                                                                                   //
    }                                                                                                                  //
    if (!this._componentInternals.templateInstance) {                                                                  // 896
      return [];                                                                                                       // 896
    }                                                                                                                  //
    view = Tracker.nonreactive((function(_this) {                                                                      // 892
      return function() {                                                                                              //
        return _this._componentInternals.templateInstance().view;                                                      //
      };                                                                                                               //
    })(this));                                                                                                         //
    templateInstance = getTemplateInstanceFunction(view, true);                                                        // 892
    ref = this._componentInternals.templateBase.__eventMaps;                                                           // 903
    results = [];                                                                                                      // 903
    for (i = 0, len = ref.length; i < len; i++) {                                                                      //
      events = ref[i];                                                                                                 //
      eventMap = {};                                                                                                   // 904
      fn = function(spec, handler) {                                                                                   // 906
        return eventMap[spec] = function() {                                                                           //
          var args;                                                                                                    // 912
          args = 1 <= arguments.length ? slice.call(arguments, 0) : [];                                                // 912
          return withTemplateInstanceFunc(templateInstance, function() {                                               //
            return Blaze._withCurrentView(view, function() {                                                           //
              return handler.apply(view, args);                                                                        //
            });                                                                                                        //
          });                                                                                                          //
        };                                                                                                             //
      };                                                                                                               //
      for (spec in events) {                                                                                           // 906
        handler = events[spec];                                                                                        //
        fn(spec, handler);                                                                                             // 907
      }                                                                                                                // 906
      results.push(eventMap);                                                                                          // 904
    }                                                                                                                  // 903
    return results;                                                                                                    //
  };                                                                                                                   //
                                                                                                                       //
  BlazeComponent.prototype.data = function(path, equalsFunc) {                                                         // 451
    var base, ref, view;                                                                                               // 923
    if (this._componentInternals == null) {                                                                            //
      this._componentInternals = {};                                                                                   //
    }                                                                                                                  //
    if ((base = this._componentInternals).templateInstance == null) {                                                  //
      base.templateInstance = new ReactiveField(null, function(a, b) {                                                 //
        return a === b;                                                                                                //
      });                                                                                                              //
    }                                                                                                                  //
    if (view = (ref = this._componentInternals.templateInstance()) != null ? ref.view : void 0) {                      // 926
      if (path != null) {                                                                                              // 927
        return DataLookup.get((function(_this) {                                                                       // 928
          return function() {                                                                                          //
            return Blaze.getData(view);                                                                                //
          };                                                                                                           //
        })(this), path, equalsFunc);                                                                                   //
      } else {                                                                                                         //
        return Blaze.getData(view);                                                                                    // 933
      }                                                                                                                //
    }                                                                                                                  //
    return void 0;                                                                                                     //
  };                                                                                                                   //
                                                                                                                       //
  BlazeComponent.currentData = function(path, equalsFunc) {                                                            // 451
    var currentView;                                                                                                   // 945
    if (!Blaze.currentView) {                                                                                          // 945
      return void 0;                                                                                                   // 945
    }                                                                                                                  //
    currentView = Blaze.currentView;                                                                                   // 945
    if (_.isString(path)) {                                                                                            // 949
      path = path.split('.');                                                                                          // 950
    } else if (!_.isArray(path)) {                                                                                     //
      return Blaze.getData(currentView);                                                                               // 952
    }                                                                                                                  //
    return DataLookup.get((function(_this) {                                                                           //
      return function() {                                                                                              //
        var lexicalData, result;                                                                                       // 955
        if (Blaze._lexicalBindingLookup && (lexicalData = Blaze._lexicalBindingLookup(currentView, path[0]))) {        // 955
          result = {};                                                                                                 // 958
          result[path[0]] = lexicalData;                                                                               // 958
          return result;                                                                                               // 960
        }                                                                                                              //
        return Blaze.getData(currentView);                                                                             //
      };                                                                                                               //
    })(this), path, equalsFunc);                                                                                       //
  };                                                                                                                   //
                                                                                                                       //
  BlazeComponent.prototype.currentData = function(path, equalsFunc) {                                                  // 451
    return this.constructor.currentData(path, equalsFunc);                                                             //
  };                                                                                                                   //
                                                                                                                       //
  BlazeComponent.prototype.component = function() {                                                                    // 451
    return this;                                                                                                       //
  };                                                                                                                   //
                                                                                                                       //
  BlazeComponent.currentComponent = function() {                                                                       // 451
    var templateInstance;                                                                                              // 981
    templateInstance = getTemplateInstanceFunction(Blaze.currentView, false);                                          // 981
    return templateInstanceToComponent(templateInstance, false);                                                       //
  };                                                                                                                   //
                                                                                                                       //
  BlazeComponent.prototype.currentComponent = function() {                                                             // 451
    return this.constructor.currentComponent();                                                                        //
  };                                                                                                                   //
                                                                                                                       //
  BlazeComponent.prototype.firstNode = function() {                                                                    // 451
    if (this.isRendered()) {                                                                                           // 989
      return this._componentInternals.templateInstance().view._domrange.firstNode();                                   // 989
    }                                                                                                                  //
    return void 0;                                                                                                     //
  };                                                                                                                   //
                                                                                                                       //
  BlazeComponent.prototype.lastNode = function() {                                                                     // 451
    if (this.isRendered()) {                                                                                           // 994
      return this._componentInternals.templateInstance().view._domrange.lastNode();                                    // 994
    }                                                                                                                  //
    return void 0;                                                                                                     //
  };                                                                                                                   //
                                                                                                                       //
  BlazeComponent.prototype.autorun = function(runFunc) {                                                               // 451
    var templateInstance;                                                                                              // 1000
    templateInstance = Tracker.nonreactive((function(_this) {                                                          // 1000
      return function() {                                                                                              //
        var ref;                                                                                                       // 1001
        return (ref = _this._componentInternals) != null ? typeof ref.templateInstance === "function" ? ref.templateInstance() : void 0 : void 0;
      };                                                                                                               //
    })(this));                                                                                                         //
    if (!templateInstance) {                                                                                           // 1003
      throw new Error("The component has to be created before calling 'autorun'.");                                    // 1003
    }                                                                                                                  //
    return templateInstance.autorun(_.bind(runFunc, this));                                                            //
  };                                                                                                                   //
                                                                                                                       //
  return BlazeComponent;                                                                                               //
                                                                                                                       //
})(BaseComponent);                                                                                                     //
                                                                                                                       //
SUPPORTS_REACTIVE_INSTANCE = ['subscriptionsReady'];                                                                   // 1
                                                                                                                       //
REQUIRE_RENDERED_INSTANCE = ['$', 'find', 'findAll'];                                                                  // 1
                                                                                                                       //
ref = Blaze.TemplateInstance.prototype;                                                                                // 1019
for (methodName in ref) {                                                                                              // 1019
  method = ref[methodName];                                                                                            //
  if (!(methodName in BlazeComponent.prototype)) {                                                                     //
    (function(methodName, method) {                                                                                    // 1020
      if (indexOf.call(SUPPORTS_REACTIVE_INSTANCE, methodName) >= 0) {                                                 // 1021
        return BlazeComponent.prototype[methodName] = function() {                                                     //
          var args, base, templateInstance;                                                                            // 1023
          args = 1 <= arguments.length ? slice.call(arguments, 0) : [];                                                // 1023
          if (this._componentInternals == null) {                                                                      //
            this._componentInternals = {};                                                                             //
          }                                                                                                            //
          if ((base = this._componentInternals).templateInstance == null) {                                            //
            base.templateInstance = new ReactiveField(null, function(a, b) {                                           //
              return a === b;                                                                                          //
            });                                                                                                        //
          }                                                                                                            //
          if (templateInstance = this._componentInternals.templateInstance()) {                                        // 1026
            return templateInstance[methodName].apply(templateInstance, args);                                         // 1027
          }                                                                                                            //
          return void 0;                                                                                               //
        };                                                                                                             //
      } else if (indexOf.call(REQUIRE_RENDERED_INSTANCE, methodName) >= 0) {                                           //
        return BlazeComponent.prototype[methodName] = function() {                                                     //
          var args, ref1;                                                                                              // 1033
          args = 1 <= arguments.length ? slice.call(arguments, 0) : [];                                                // 1033
          if (this.isRendered()) {                                                                                     // 1033
            return (ref1 = this._componentInternals.templateInstance())[methodName].apply(ref1, args);                 // 1033
          }                                                                                                            //
          return void 0;                                                                                               //
        };                                                                                                             //
      } else {                                                                                                         //
        return BlazeComponent.prototype[methodName] = function() {                                                     //
          var args, templateInstance;                                                                                  // 1039
          args = 1 <= arguments.length ? slice.call(arguments, 0) : [];                                                // 1039
          templateInstance = Tracker.nonreactive((function(_this) {                                                    // 1039
            return function() {                                                                                        //
              var ref1;                                                                                                // 1040
              return (ref1 = _this._componentInternals) != null ? typeof ref1.templateInstance === "function" ? ref1.templateInstance() : void 0 : void 0;
            };                                                                                                         //
          })(this));                                                                                                   //
          if (!templateInstance) {                                                                                     // 1042
            throw new Error("The component has to be created before calling '" + methodName + "'.");                   // 1042
          }                                                                                                            //
          return templateInstance[methodName].apply(templateInstance, args);                                           //
        };                                                                                                             //
      }                                                                                                                //
    })(methodName, method);                                                                                            //
  }                                                                                                                    //
}                                                                                                                      // 1019
                                                                                                                       //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/peerlibrary_blaze-components/debug.coffee.js                                                               //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var                                                                                                                    // 1
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty,                                                                                         //
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };
                                                                                                                       //
BlazeComponentDebug = (function(superClass) {                                                                          // 1
  extend(BlazeComponentDebug, superClass);                                                                             // 2
                                                                                                                       //
  function BlazeComponentDebug() {                                                                                     //
    return BlazeComponentDebug.__super__.constructor.apply(this, arguments);                                           //
  }                                                                                                                    //
                                                                                                                       //
  BlazeComponentDebug.startComponent = function(component) {                                                           // 2
    BlazeComponentDebug.__super__.constructor.startComponent.apply(this, arguments);                                   // 3
    return console.log(component.data());                                                                              //
  };                                                                                                                   //
                                                                                                                       //
  BlazeComponentDebug.startMarkedComponent = function(component) {                                                     // 2
    BlazeComponentDebug.__super__.constructor.startMarkedComponent.apply(this, arguments);                             // 8
    return console.log(component.data());                                                                              //
  };                                                                                                                   //
                                                                                                                       //
  BlazeComponentDebug.dumpComponentSubtree = function(rootComponentOrElement) {                                        // 2
    if ('nodeType' in rootComponentOrElement && rootComponentOrElement.nodeType === Node.ELEMENT_NODE) {               // 13
      rootComponentOrElement = BlazeComponent.getComponentForElement(rootComponentOrElement);                          // 14
    }                                                                                                                  //
    return BlazeComponentDebug.__super__.constructor.dumpComponentSubtree.apply(this, arguments);                      //
  };                                                                                                                   //
                                                                                                                       //
  BlazeComponentDebug.dumpComponentTree = function(rootComponentOrElement) {                                           // 2
    if ('nodeType' in rootComponentOrElement && rootComponentOrElement.nodeType === Node.ELEMENT_NODE) {               // 19
      rootComponentOrElement = BlazeComponent.getComponentForElement(rootComponentOrElement);                          // 20
    }                                                                                                                  //
    return BlazeComponentDebug.__super__.constructor.dumpComponentTree.apply(this, arguments);                         //
  };                                                                                                                   //
                                                                                                                       //
  BlazeComponentDebug.dumpAllComponents = function() {                                                                 // 2
    var allRootComponents, j, len, rootComponent;                                                                      // 25
    allRootComponents = [];                                                                                            // 25
    $('*').each((function(_this) {                                                                                     // 25
      return function(i, element) {                                                                                    //
        var component, rootComponent;                                                                                  // 28
        component = BlazeComponent.getComponentForElement(element);                                                    // 28
        if (!component) {                                                                                              // 29
          return;                                                                                                      // 29
        }                                                                                                              //
        rootComponent = _this.componentRoot(component);                                                                // 28
        if (indexOf.call(allRootComponents, rootComponent) < 0) {                                                      // 31
          return allRootComponents.push(rootComponent);                                                                //
        }                                                                                                              //
      };                                                                                                               //
    })(this));                                                                                                         //
    for (j = 0, len = allRootComponents.length; j < len; j++) {                                                        // 33
      rootComponent = allRootComponents[j];                                                                            //
      this.dumpComponentSubtree(rootComponent);                                                                        // 34
    }                                                                                                                  // 33
  };                                                                                                                   //
                                                                                                                       //
  return BlazeComponentDebug;                                                                                          //
                                                                                                                       //
})(BaseComponentDebug);                                                                                                //
                                                                                                                       //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/peerlibrary_blaze-components/server.coffee.js                                                              //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
Template.body.renderToDocument = function() {};                                                                        // 2
                                                                                                                       //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
(function (pkg, symbols) {
  for (var s in symbols)
    (s in pkg) || (pkg[s] = symbols[s]);
})(Package['peerlibrary:blaze-components'] = {}, {
  Template: Template,
  BlazeComponent: BlazeComponent,
  BlazeComponentDebug: BlazeComponentDebug
});

})();

//# sourceMappingURL=peerlibrary_blaze-components.js.map
