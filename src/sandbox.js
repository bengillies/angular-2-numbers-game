import {Component, View, For, If} from 'angular2/angular2';
import NumberGenerator from 'numbers';
import katex from 'katex';
import solveNumbers from 'solver';

const precedence = {
  '-': 1,
  '+': 2,
  '*': 3,
  '/': 0
};

@Component({
  selector: 'sandbox'
})

@View({
  templateUrl: 'sandbox.html',
  directives: [For, If]
})

export class Sandbox {

  constructor() {
    this.numberCount = 6;
    this.minTarget = 100;
    this.maxTarget = 999;
    this.target = '000';
    this.numbers = new Array(this.numberCount).fill(0);
  }

  generateNumbers() {
    this.target = Math.floor(this.minTarget + Math.random() * (this.maxTarget - this.minTarget));
    this.numbers = Array.from(new NumberGenerator());
    this.answer = undefined;
    this.method = undefined;
  }

  solve() {
    const answer = solveNumbers(this.target, this.numbers);

    this.answer = answer.answer;
    this.method = answer.solution.reduce((str, op, i) => {
      if (answer.numbers[i + 1]) {
        const prevPrecedence = precedence[(answer.solution[i - 1] || {}).desc] || Infinity;
        const currPrecedence = precedence[op.desc];
        str = !str ? answer.numbers[0] : (currPrecedence > prevPrecedence ? `(${str})` : str);
        return op.render.replace('%1', str).replace('%2', answer.numbers[i + 1]);
      } else {
        return str;
      }
    }, '');
    setTimeout(() => {
      // TODO: angular2 alternative to `ng-bind-html`?
      document.getElementById('solution').innerHTML = katex.renderToString(`${this.method} = ${this.answer}`);
    }, 10);
  }

}
