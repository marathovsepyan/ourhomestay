(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;

/* Package-scope variables */
var classNames;

(function(){

///////////////////////////////////////////////////////////////////////////////////
//                                                                               //
// packages/maxharris9_classnames/packages/maxharris9_classnames.js              //
//                                                                               //
///////////////////////////////////////////////////////////////////////////////////
                                                                                 //
(function () {

/////////////////////////////////////////////////////////////////////////////
//                                                                         //
// packages/maxharris9:classnames/classnames.js                            //
//                                                                         //
/////////////////////////////////////////////////////////////////////////////
                                                                           //
classNames = function () {                                                 // 1
  var classes = '';                                                        // 2
  var arg;                                                                 // 3
                                                                           // 4
  for (var i = 0; i < arguments.length; i++) {                             // 5
    arg = arguments[i];                                                    // 6
    if (!arg) {                                                            // 7
      continue;                                                            // 8
    }                                                                      // 9
                                                                           // 10
    if ('string' === typeof arg || 'number' === typeof arg) {              // 11
      classes += ' ' + arg;                                                // 12
    } else if (Object.prototype.toString.call(arg) === '[object Array]') { // 13
      classes += ' ' + classNames.apply(null, arg);                        // 14
    } else if ('object' === typeof arg) {                                  // 15
      for (var key in arg) {                                               // 16
        if (!arg.hasOwnProperty(key) || !arg[key]) {                       // 17
          continue;                                                        // 18
        }                                                                  // 19
        classes += ' ' + key;                                              // 20
      }                                                                    // 21
    }                                                                      // 22
  }                                                                        // 23
  return classes.substr(1);                                                // 24
}                                                                          // 25
/////////////////////////////////////////////////////////////////////////////

}).call(this);

///////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
(function (pkg, symbols) {
  for (var s in symbols)
    (s in pkg) || (pkg[s] = symbols[s]);
})(Package['maxharris9:classnames'] = {}, {
  classNames: classNames
});

})();

//# sourceMappingURL=maxharris9_classnames.js.map
