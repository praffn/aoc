const Op = {
  HALT: 99,
  ADD: 1,
  MUL: 2
};

export default class IntcodeComputer {
  private ip: number = 0;
  private memory: number[];
  private program: number[];

  constructor(program: number[]) {
    this.program = [...program];
    this.memory = [...this.program];
  }

  public reset() {
    this.ip = 0;
    this.memory = [...this.program];
    return this;
  }

  public write(dest: number, value: number) {
    this.memory[dest] = value;
    return this;
  }

  public read(dest: number) {
    return this.memory[dest];
  }

  public run() {
    let op: number;
    while ((op = this.memory[this.ip]) !== Op.HALT) {
      const a = this.read(this.read(this.ip + 1));
      const b = this.read(this.read(this.ip + 2));
      const dest = this.read(this.ip + 3);
      this.write(dest, op === Op.ADD ? a + b : a * b);
      this.ip += 4;
    }
    return this;
  }
}
