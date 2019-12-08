export interface Solution {
  first: number;
  second: number;
}

export type Solver = (input: NodeJS.ReadableStream) => Promise<Solution>;
