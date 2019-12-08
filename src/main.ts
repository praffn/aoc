import { createReadStream } from "fs";
import * as path from "path";
import { Solver } from "./aoc";
import { performance } from "perf_hooks";

function usage() {
  [
    "usage: aoc <year> <day> [file]\n\n",
    "year:  the aoc year [2019]\n",
    "day:   the day to solve [1-25]\n",
    "file:  the file to use as input. stdin by default\n"
  ].forEach(line => process.stdout.write(line));
}

function parseAndValidateNumber(
  n: string,
  name: string,
  min: number,
  max: number
): number {
  const r = Number.parseInt(n);
  if (Number.isNaN(r) || r < min || r > max) {
    console.error(`${name} was not a valid number or in the valid range`);
    usage();
    process.exit(2);
  }
  return r;
}

function main() {
  const args = process.argv.slice(2);
  if (args.length === 0 || args.length === 1) {
    console.error("you must supply both a year and a day!");
    usage();
    process.exit(1);
  }
  const year = parseAndValidateNumber(args[0], "year", 2019, 2019);
  const day = parseAndValidateNumber(args[1], "day", 1, 25);
  const input = args.length === 3 ? createReadStream(args[2]) : process.stdin;

  run(year, day, input);
}

async function run(year: number, day: number, input: NodeJS.ReadableStream) {
  const paddedDay = day.toString().padStart(2, "0");
  try {
    const solver: Solver = require(path.join(
      __dirname,
      year.toString(),
      `${paddedDay}.ts`
    )).default;

    const start = performance.now();
    const solution = await solver(input);
    const end = performance.now();

    console.log();
    console.log(`+= Solution for day ${paddedDay}, ${year} ===`);
    console.log("|");
    console.log(`|  First:   ${solution.first}`);
    console.log(`|  Second:  ${solution.second}`);
    console.log("+===============================");
    console.log(`Computed in ${(end - start).toFixed(2)}ms`);
  } catch (e) {
    console.error(`Error for ${year}/${paddedDay}: ${e.message}`);
    process.exit(3);
  }
}

main();
