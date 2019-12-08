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
): Promise<ReadonlyArray<string>> {
  const lines: string[] = [];
  await forEachLine(input, line => lines.push(line));
  return lines;
}
