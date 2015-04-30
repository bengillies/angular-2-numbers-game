let smallNumbers = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10];
let bigNumbers = [25, 50, 75, 100];

export default class {
  constructor({ big=2, small=4 } = {}) {
    this.count = { big, small };
    this.small = Array.from(smallNumbers);
    this.big = Array.from(bigNumbers);
  }

  popRandom(list) {
    let index = Math.floor(Math.random() * list.length);
    return list.splice(index, 1)[0];
  }

  [Symbol.iterator]() {
    let bigCount = this.count.big,
        smallCount = this.count.small,
        self = this;
    return {
      next() {
        if (bigCount > 0) {
          bigCount--;
          return { value: self.popRandom(self.big), done: false };
        } else if (smallCount > 0) {
          smallCount--;
          return { value: self.popRandom(self.small), done: false };
        }

        return { value: undefined, done: true };
      }
    };
  }

}
