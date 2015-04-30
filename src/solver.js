const add = { desc: '+', render: '%1 + %2', apply: (a, b) => a + b }
const subtract = { desc: '-', render: '%1 - %2', apply: (a, b) => a - b }
const multiply = { desc: '*', render: '%1 \\times %2', apply: (a, b) => a * b }
const divide = { desc: '/', render: '\\frac{%1}{%2}', apply: (a, b) => a / b }

/**
 * Find all possible combination of @count items from @list.
 * @distinct signifies whether you can only use an item once.
 * Returns a list of all combinations.
 */
function combinations(count, list, distinct=false) {
  if (count === 1) {
    return list.map((op) => [op]);
  } else {
    return combinations(count - 1, list, distinct).reduce((solutions, opList) => {
      list.forEach((op) => {
        if (!distinct || !~opList.indexOf(op)) {
          solutions.push([op, ...opList]);
        }
      });
      return solutions;
    }, []);
  }
}

/**
 * Alias to rightPartial(combinations, true)
 */
const distinctCombinations = (count, list) => {
  return combinations(count, list, true);
}

/**
 * Take a @solution (a list of operators to apply) and a list of @numbers to
 * apply them to and apply the operators one after the other in order on the
 * list of numbers until either the end is reached, or target is reached.
 *
 * Return the result reached the solution, and the numbers used to reach it.
 */
function calculate(target, solution, numbers) {
  let res = numbers[0].num,
      i = 1;
  for (let op of solution) {
    if (Math.abs(target - res) < Number.EPSILON) {
      numbers.splice(i, numbers.length);
      return { solution, numbers, answer: res };
    }
    res = op.apply(res, numbers[i++].num);
    if (!Number.isInteger(res)) {
      return { solution, numbers, answer: Infinity };
    }
  }
  return { solution, numbers, answer: res };
}

/**
 * Take a list of potential @solutions/@numberCombos and a @target, and return
 * the first pair that get closest to the @target along with the actual result
 * achieved.
 */
function findClosest(target, solutions, numberCombos) {
  var closest = calculate(target, solutions[0], numberCombos[0]);

  for (let group of numberCombos) {
    for (let solution of solutions) {
      const calc = calculate(target, solution, group);
      if (Math.abs(target - calc.answer) < Number.EPSILON) {
        return calc;
      } else if (Math.abs(target - calc.answer) < Math.abs(target - closest.answer)) {
        closest = calc;
      }
    }
  }
  return closest;
}

export default function(target, numbers) {
  const operators = [add, subtract, multiply, divide];
  const solutions = combinations(numbers.length - 1, operators);
  let numberCombos = distinctCombinations(numbers.length, numbers.map((num) => {
    return { num }
  }));

  let match = findClosest(target, solutions, numberCombos);
  match.numbers = match.numbers.map((num) => num.num);
  return match;
}
