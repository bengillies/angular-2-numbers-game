System.register("numbers", [], function($__export) {
  "use strict";
  var __moduleName = "numbers";
  var smallNumbers,
      bigNumbers;
  return {
    setters: [],
    execute: function() {
      var $__2;
      smallNumbers = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10];
      bigNumbers = [25, 50, 75, 100];
      $__export('default', (($traceurRuntime.createClass)(function() {
        var $__4,
            $__5;
        var $__3 = arguments[0] !== (void 0) ? arguments[0] : {},
            big = ($__4 = $__3.big) === void 0 ? 2 : $__4,
            small = ($__5 = $__3.small) === void 0 ? 4 : $__5;
        this.count = {
          big: big,
          small: small
        };
        this.small = Array.from(smallNumbers);
        this.big = Array.from(bigNumbers);
      }, ($__2 = {}, Object.defineProperty($__2, "popRandom", {
        value: function(list) {
          var index = Math.floor(Math.random() * list.length);
          return list.splice(index, 1)[0];
        },
        configurable: true,
        enumerable: true,
        writable: true
      }), Object.defineProperty($__2, Symbol.iterator, {
        value: function() {
          var bigCount = this.count.big,
              smallCount = this.count.small,
              self = this;
          return {next: function() {
              if (bigCount > 0) {
                bigCount--;
                return {
                  value: self.popRandom(self.big),
                  done: false
                };
              } else if (smallCount > 0) {
                smallCount--;
                return {
                  value: self.popRandom(self.small),
                  done: false
                };
              }
              return {
                value: undefined,
                done: true
              };
            }};
        },
        configurable: true,
        enumerable: true,
        writable: true
      }), $__2), {})));
    }
  };
});
