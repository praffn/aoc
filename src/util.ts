import * as readline from "readline";

export function forEachLine(
  input: NodeJS.ReadableStream,
  cb: (line: string) => any
) {
  const rl = readline.createInterface(input);
  rl.on("line", cb);
  return new Promise(resolve => rl.on("close", resolve));
}

export async function getAllLines(
  input: NodeJS.ReadableStream
): Promise<string[]> {
  const lines: string[] = [];
  await forEachLine(input, line => lines.push(line));
  return lines;
}

export function flatMap<T, U>(
  array: T[],
  callbackfn: (value: T, index: number, array: T[]) => U[]
): U[] {
  if (Array.prototype.flatMap) {
    return array.flatMap(callbackfn);
  }
  return Array.prototype.concat(...array.map(callbackfn));
}

export async function commaSeparatedNumbers(
  input: NodeJS.ReadableStream
): Promise<number[]> {
  const lines = await getAllLines(input);
  return flatMap(lines, line => {
    return line.split(",").map(n => Number.parseInt(n));
  });
}
