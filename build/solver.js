System.register("solver", [], function($__export) {
  "use strict";
  var __moduleName = "solver";
  var add,
      subtract,
      multiply,
      divide,
      distinctCombinations;
  function combinations(count, list) {
    var distinct = arguments[2] !== (void 0) ? arguments[2] : false;
    if (count === 1) {
      return list.map((function(op) {
        return [op];
      }));
    } else {
      return combinations(count - 1, list, distinct).reduce((function(solutions, opList) {
        list.forEach((function(op) {
          if (!distinct || !~opList.indexOf(op)) {
            solutions.push($traceurRuntime.spread([op], opList));
          }
        }));
        return solutions;
      }), []);
    }
  }
  function calculate(target, solution, numbers) {
    var res = numbers[0].num,
        i = 1;
    var $__3 = true;
    var $__4 = false;
    var $__5 = undefined;
    try {
      for (var $__1 = void 0,
          $__0 = (solution)[$traceurRuntime.toProperty(Symbol.iterator)](); !($__3 = ($__1 = $__0.next()).done); $__3 = true) {
        var op = $__1.value;
        {
          if (Math.abs(target - res) < Number.EPSILON) {
            numbers.splice(i, numbers.length);
            return {
              solution: solution,
              numbers: numbers,
              answer: res
            };
          }
          res = op.apply(res, numbers[i++].num);
          if (!Number.isInteger(res)) {
            return {
              solution: solution,
              numbers: numbers,
              answer: Infinity
            };
          }
        }
      }
    } catch ($__6) {
      $__4 = true;
      $__5 = $__6;
    } finally {
      try {
        if (!$__3 && $__0.return != null) {
          $__0.return();
        }
      } finally {
        if ($__4) {
          throw $__5;
        }
      }
    }
    return {
      solution: solution,
      numbers: numbers,
      answer: res
    };
  }
  function findClosest(target, solutions, numberCombos) {
    var closest = calculate(target, solutions[0], numberCombos[0]);
    var i = 0;
    var $__10 = true;
    var $__11 = false;
    var $__12 = undefined;
    try {
      for (var $__8 = void 0,
          $__7 = (numberCombos)[$traceurRuntime.toProperty(Symbol.iterator)](); !($__10 = ($__8 = $__7.next()).done); $__10 = true) {
        var group = $__8.value;
        {
          console.log(("running " + i++ + " of " + numberCombos.length));
          var $__3 = true;
          var $__4 = false;
          var $__5 = undefined;
          try {
            for (var $__1 = void 0,
                $__0 = (solutions)[$traceurRuntime.toProperty(Symbol.iterator)](); !($__3 = ($__1 = $__0.next()).done); $__3 = true) {
              var solution = $__1.value;
              {
                var calc = calculate(target, solution, group);
                if (Math.abs(target - calc.answer) < Number.EPSILON) {
                  return calc;
                } else if (Math.abs(target - calc.answer) < Math.abs(target - closest.answer)) {
                  closest = calc;
                }
              }
            }
          } catch ($__6) {
            $__4 = true;
            $__5 = $__6;
          } finally {
            try {
              if (!$__3 && $__0.return != null) {
                $__0.return();
              }
            } finally {
              if ($__4) {
                throw $__5;
              }
            }
          }
        }
      }
    } catch ($__13) {
      $__11 = true;
      $__12 = $__13;
    } finally {
      try {
        if (!$__10 && $__7.return != null) {
          $__7.return();
        }
      } finally {
        if ($__11) {
          throw $__12;
        }
      }
    }
    return closest;
  }
  return {
    setters: [],
    execute: function() {
      add = {
        desc: '+',
        render: '%1 + %2',
        apply: (function(a, b) {
          return a + b;
        })
      };
      subtract = {
        desc: '-',
        render: '%1 - %2',
        apply: (function(a, b) {
          return a - b;
        })
      };
      multiply = {
        desc: '*',
        render: '%1 \\times %2',
        apply: (function(a, b) {
          return a * b;
        })
      };
      divide = {
        desc: '/',
        render: '\\frac{%1}{%2}',
        apply: (function(a, b) {
          return a / b;
        })
      };
      distinctCombinations = (function(count, list) {
        return combinations(count, list, true);
      });
      $__export('default', function(target, numbers) {
        var operators = [add, subtract, multiply, divide];
        var solutions = combinations(numbers.length - 1, operators);
        var numberCombos = distinctCombinations(numbers.length, numbers.map((function(num) {
          return {num: num};
        })));
        var match = findClosest(target, solutions, numberCombos);
        match.numbers = match.numbers.map((function(num) {
          return num.num;
        }));
        return match;
      });
    }
  };
});
