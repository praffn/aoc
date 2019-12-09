import { Solver } from "../aoc";
import { getSingleLine } from "../util";

const numberToArray = (n: number) => {
  const digits = [];
  while (n !== 0) {
    const tmp = n % 10;
    n = Math.floor(n / 10);
    digits.push(tmp);
  }

  return digits.reverse();
};

const solver: Solver = async input => {
  const [min, max] = (await getSingleLine(input))
    .split("-")
    .map(n => Number.parseInt(n));

  let first = 0;
  let second = 0;

  for (let i = min; i < max; i++) {
    const digits = numberToArray(i);
    if (digits.length !== 6) continue;
    let twoAreTheSame = false;
    let onlyTwoAreTheSame = false;
    let neverDecreases = true;

    const counts = new Map<number, number>();
    counts.set(digits[0], 1);

    digits.reduce((lastDigit, currentDigit) => {
      const count = counts.get(currentDigit) || 0;
      counts.set(currentDigit, count + 1);
      if (lastDigit === currentDigit) {
        twoAreTheSame = true;
      }
      if (lastDigit > currentDigit) {
        neverDecreases = false;
      }
      return currentDigit;
    });

    if (twoAreTheSame && neverDecreases) {
      first++;
      if (Array.from(counts.values()).includes(2)) {
        second++;
      }
    }
  }

  return {
    first,
    second
  };
};

export default solver;
