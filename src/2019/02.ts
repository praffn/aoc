import { Solution } from "../aoc";
import { commaSeparatedNumbers } from "../util";
import IntcodeComputer from "./IntcodeComputer";

export default async function solver(
  input: NodeJS.ReadableStream
): Promise<Solution> {
  const program = await commaSeparatedNumbers(input);
  const computer = new IntcodeComputer(program);

  const first = computer
    .write(1, 12)
    .write(2, 2)
    .run()
    .read(0);

  const second = (() => {
    for (let noun = 0; noun < 100; noun++) {
      for (let verb = 0; verb < 100; verb++) {
        const result = computer
          .reset()
          .write(1, noun)
          .write(2, verb)
          .run()
          .read(0);
        if (result === 19690720) {
          return 100 * noun + verb;
        }
      }
    }
    throw new Error("could not find result for part two");
  })();

  return {
    first,
    second
  };
}
