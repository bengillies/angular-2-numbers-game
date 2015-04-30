System.register("sandbox", ["angular2/angular2", "numbers", "katex", "solver"], function($__export) {
  "use strict";
  var __moduleName = "sandbox";
  var Component,
      View,
      For,
      If,
      NumberGenerator,
      katex,
      solveNumbers,
      precedence,
      Sandbox;
  return {
    setters: [function($__m) {
      Component = $__m.Component;
      View = $__m.View;
      For = $__m.For;
      If = $__m.If;
    }, function($__m) {
      NumberGenerator = $__m.default;
    }, function($__m) {
      katex = $__m.default;
    }, function($__m) {
      solveNumbers = $__m.default;
    }],
    execute: function() {
      precedence = {
        '-': 1,
        '+': 2,
        '*': 3,
        '/': 0
      };
      Sandbox = (function() {
        function Sandbox() {
          this.numberCount = 6;
          this.minTarget = 100;
          this.maxTarget = 999;
          this.target = '000';
          this.numbers = new Array(this.numberCount).fill(0);
        }
        return ($traceurRuntime.createClass)(Sandbox, {
          generateNumbers: function() {
            this.target = Math.floor(this.minTarget + Math.random() * (this.maxTarget - this.minTarget));
            this.numbers = Array.from(new NumberGenerator());
            this.answer = undefined;
            this.method = undefined;
          },
          solve: function() {
            var $__0 = this;
            var answer = solveNumbers(this.target, this.numbers);
            this.answer = answer.answer;
            this.method = answer.solution.reduce((function(str, op, i) {
              if (answer.numbers[i + 1]) {
                var prevPrecedence = precedence[(answer.solution[i - 1] || {}).desc] || Infinity;
                var currPrecedence = precedence[op.desc];
                str = !str ? answer.numbers[0] : (currPrecedence > prevPrecedence ? ("(" + str + ")") : str);
                return op.render.replace('%1', str).replace('%2', answer.numbers[i + 1]);
              } else {
                return str;
              }
            }), '');
            setTimeout((function() {
              document.getElementById('solution').innerHTML = katex.renderToString(($__0.method + " = " + $__0.answer));
            }), 10);
          }
        }, {});
      }());
      $__export("Sandbox", Sandbox);
      Object.defineProperty(Sandbox, "annotations", {get: function() {
          return [new Component({selector: 'sandbox'}), new View({
            templateUrl: 'sandbox.html',
            directives: [For, If]
          })];
        }});
    }
  };
});
