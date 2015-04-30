System.register("maths", ["katex"], function($__export) {
  "use strict";
  var __moduleName = "maths";
  var katex,
      Maths;
  return {
    setters: [function($__m) {
      katex = $__m.default;
    }],
    execute: function() {
      Maths = (function() {
        function Maths() {}
        return ($traceurRuntime.createClass)(Maths, {transform: function(newMaths) {
            return katex.renderToString(newMaths);
          }}, {});
      }());
      $__export("Maths", Maths);
    }
  };
});
