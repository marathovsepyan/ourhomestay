(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var ECMAScript = Package.ecmascript.ECMAScript;
var React = Package['react-runtime'].React;
var ReactDOM = Package['react-runtime'].ReactDOM;
var ReactDOMServer = Package['react-runtime'].ReactDOMServer;
var ReactMeteorData = Package['react-meteor-data'].ReactMeteorData;
var meteorInstall = Package.modules.meteorInstall;
var Buffer = Package.modules.Buffer;
var process = Package.modules.process;
var Symbol = Package['ecmascript-runtime'].Symbol;
var Map = Package['ecmascript-runtime'].Map;
var Set = Package['ecmascript-runtime'].Set;
var meteorBabelHelpers = Package['babel-runtime'].meteorBabelHelpers;
var Promise = Package.promise.Promise;

/* Package-scope variables */
var ReactLayout;

var require = meteorInstall({"node_modules":{"meteor":{"kadira:react-layout":{"lib":{"react_layout.js":function(){

///////////////////////////////////////////////////////////////////////
//                                                                   //
// packages/kadira_react-layout/lib/react_layout.js                  //
//                                                                   //
///////////////////////////////////////////////////////////////////////
                                                                     //
ReactLayout = {};                                                    // 1
ReactLayout._domLoaded = false;                                      // 2
ReactLayout._rootProps = {};                                         // 3
ReactLayout._readyCallbacks = [];                                    // 4
                                                                     //
ReactLayout.setRootProps = function (rootProps) {                    // 6
  this._rootProps = rootProps;                                       // 7
};                                                                   //
                                                                     //
ReactLayout._buildRootNode = function () {                           // 10
  var props = this._rootProps || {};                                 // 11
  props.id = 'react-root';                                           // 12
  if (props.className) {                                             // 13
    props['class'] = props.className;                                // 14
    delete props.className;                                          // 15
  }                                                                  //
                                                                     //
  var propsString = '';                                              // 18
  for (var key in meteorBabelHelpers.sanitizeForInObject(props)) {   // 19
    var value = props[key];                                          // 20
    propsString += key + '="' + value + '" ';                        // 21
  }                                                                  //
                                                                     //
  var html = '<div ' + propsString + '></div>';                      // 24
  return html;                                                       // 25
};                                                                   //
                                                                     //
ReactLayout._getRootNode = function () {                             // 28
  var rootNode = document.getElementById('react-root');              // 29
                                                                     //
  if (rootNode) {                                                    // 31
    return rootNode;                                                 // 32
  } else {                                                           //
    var rootNodeHtml = this._buildRootNode();                        // 34
    var body = document.getElementsByTagName('body')[0];             // 35
    body.insertAdjacentHTML('beforeend', rootNodeHtml);              // 36
    rootNode = document.getElementById('react-root');                // 37
    return rootNode;                                                 // 38
  }                                                                  //
};                                                                   //
                                                                     //
ReactLayout.render = function (layoutClass, regions) {               // 42
  if (Meteor.isClient) {                                             // 43
    return this._renderClient(layoutClass, regions);                 // 44
  } else {                                                           //
    return this._renderServer(layoutClass, regions);                 // 46
  }                                                                  //
};                                                                   //
                                                                     //
ReactLayout._renderServer = function (layoutClass, regions) {        // 50
  var el = React.createElement(layoutClass, regions);                // 51
  var elHtml = ReactDOMServer.renderToString(el);                    // 52
                                                                     //
  var rootNodeHtml = this._buildRootNode();                          // 54
  var html = rootNodeHtml.replace('</div>', elHtml + '</div>');      // 55
                                                                     //
  if (Package['kadira:flow-router-ssr']) {                           // 57
    var FlowRouter = Package['kadira:flow-router-ssr'].FlowRouter;   // 58
    var ssrContext = FlowRouter.ssrContext.get();                    // 59
    ssrContext.setHtml(html);                                        // 60
  }                                                                  //
};                                                                   //
                                                                     //
ReactLayout._renderClient = function (layoutClass, regions) {        // 64
  var self = this;                                                   // 65
  this._ready(function () {                                          // 66
    var rootNode = self._getRootNode();                              // 67
    var el = React.createElement(layoutClass, regions);              // 68
    ReactDOM.render(el, rootNode);                                   // 69
  });                                                                //
};                                                                   //
                                                                     //
ReactLayout._ready = function (cb) {                                 // 73
  var self = this;                                                   // 74
  if (self._domLoaded) {                                             // 75
    cb();                                                            // 76
  } else {                                                           //
    self._readyCallbacks.push(cb);                                   // 78
  }                                                                  //
};                                                                   //
                                                                     //
// wait for DOM is loading                                           //
Meteor.startup(function () {                                         // 83
  setTimeout(function () {                                           // 84
    ReactLayout._domLoaded = true;                                   // 85
    ReactLayout._readyCallbacks.forEach(function (fn) {              // 86
      fn();                                                          // 87
    });                                                              //
  }, 10);                                                            //
});                                                                  //
///////////////////////////////////////////////////////////////////////

}}}}}},{"extensions":[".js",".json"]});
require("./node_modules/meteor/kadira:react-layout/lib/react_layout.js");

/* Exports */
if (typeof Package === 'undefined') Package = {};
(function (pkg, symbols) {
  for (var s in symbols)
    (s in pkg) || (pkg[s] = symbols[s]);
})(Package['kadira:react-layout'] = {}, {
  ReactLayout: ReactLayout
});

})();

//# sourceMappingURL=kadira_react-layout.js.map
