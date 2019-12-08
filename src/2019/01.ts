import { Solver } from "../aoc";
import { getAllLines } from "../util";

function calculateRequiredFuel(n: number) {
  return Math.floor(n / 3) - 2;
}

const solver: Solver = async input => {
  const inputs = (await getAllLines(input)).map(line => Number.parseInt(line));
  return {
    first: inputs.reduce((fuelReq, mass) => {
      return fuelReq + calculateRequiredFuel(mass);
    }, 0),
    second: inputs.reduce((totalReq, mass) => {
      let tmpReq = 0;
      while (true) {
        mass = calculateRequiredFuel(mass);
        if (mass < 0) break;
        tmpReq += mass;
      }
      return totalReq + tmpReq;
    }, 0)
  };
};

export default solver;
