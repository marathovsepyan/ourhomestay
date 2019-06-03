(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var ECMAScript = Package.ecmascript.ECMAScript;
var Blaze = Package.blaze.Blaze;
var UI = Package.blaze.UI;
var Handlebars = Package.blaze.Handlebars;
var ReactiveVar = Package['reactive-var'].ReactiveVar;
var meteorInstall = Package.modules.meteorInstall;
var Buffer = Package.modules.Buffer;
var process = Package.modules.process;
var Symbol = Package['ecmascript-runtime'].Symbol;
var Map = Package['ecmascript-runtime'].Map;
var Set = Package['ecmascript-runtime'].Set;
var meteorBabelHelpers = Package['babel-runtime'].meteorBabelHelpers;
var Promise = Package.promise.Promise;
var HTML = Package.htmljs.HTML;

/* Package-scope variables */
var blazeToReact;

var require = meteorInstall({"node_modules":{"meteor":{"gadicc:blaze-react-component":{"blaze-react-component-server.js":["babel-runtime/helpers/extends","react","react-dom","meteor/blaze","meteor/reactive-var",function(require,exports){

////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                //
// packages/gadicc_blaze-react-component/blaze-react-component-server.js                          //
//                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                  //
exports.__esModule = true;                                                                        //
exports.blazeToReact = undefined;                                                                 //
                                                                                                  //
var _extends2 = require('babel-runtime/helpers/extends');                                         //
                                                                                                  //
var _extends3 = _interopRequireDefault(_extends2);                                                //
                                                                                                  //
var _react = require('react');                                                                    // 1
                                                                                                  //
var _react2 = _interopRequireDefault(_react);                                                     //
                                                                                                  //
var _reactDom = require('react-dom');                                                             // 2
                                                                                                  //
var _reactDom2 = _interopRequireDefault(_reactDom);                                               //
                                                                                                  //
var _blaze = require('meteor/blaze');                                                             // 3
                                                                                                  //
var _reactiveVar = require('meteor/reactive-var');                                                // 4
                                                                                                  //
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
                                                                                                  //
var BlazeComponent = function BlazeComponent(props) {                                             // 6
  var html = {                                                                                    // 7
    __html: _blaze.Blaze.toHTMLWithData(props.template, _.omit(props, 'template'))                // 8
  };                                                                                              //
                                                                                                  //
  return _react2['default'].createElement('span', { dangerouslySetInnerHTML: html });             // 14
};                                                                                                //
                                                                                                  //
exports.blazeToReact = blazeToReact = function () {                                               // 17
  function blazeToReact(template) {                                                               // 17
    return function (props) {                                                                     // 18
      return _react2['default'].createElement(BlazeComponent, (0, _extends3['default'])({}, props, { template: template }));
    };                                                                                            //
  }                                                                                               //
                                                                                                  //
  return blazeToReact;                                                                            //
}();                                                                                              //
                                                                                                  //
exports.blazeToReact = blazeToReact;                                                              //
exports['default'] = BlazeComponent;                                                              //
////////////////////////////////////////////////////////////////////////////////////////////////////

}]}}}},{"extensions":[".js",".json"]});
var exports = require("./node_modules/meteor/gadicc:blaze-react-component/blaze-react-component-server.js");

/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['gadicc:blaze-react-component'] = exports;

})();

//# sourceMappingURL=gadicc_blaze-react-component.js.map
