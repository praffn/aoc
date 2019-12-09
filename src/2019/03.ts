import { Solution } from "../aoc";
import { getAllLines } from "../util";
import Point2d from "../structs/Point2d";

class Segment {
  readonly p1: Point2d;
  readonly p2: Point2d;
  readonly xMin: number;
  readonly xMax: number;
  readonly yMin: number;
  readonly yMax: number;

  constructor(p1: Point2d, p2: Point2d) {
    this.p1 = p1;
    this.p2 = p2;

    this.xMin = Math.min(p1.x, p2.x);
    this.yMin = Math.min(p1.y, p2.y);
    this.xMax = Math.max(p1.x, p2.x);
    this.yMax = Math.max(p1.y, p2.y);
  }
}

function getIntersection(s1: Segment, s2: Segment) {
  if ((s1.xMin >= s2.xMin && s1.xMin <= s2.xMax) && (s2.yMin >= s1.yMin && s2.yMin <= s1.yMax)) {
    return new Point2d(s1.xMin, s2.yMin);
  } else if ((s2.xMin >= s1.xMin && s2.xMin <= s1.xMax) && (s1.yMin >= s2.yMin && s1.yMin <= s2.yMax)) {
    return new Point2d(s2.xMin, s1.yMin);
  }
}

function parseWire(raw: string) {
  const directions = raw.split(',');
  const wire: Segment[] = [];
  let lastPoint = Point2d.Origo;

  directions.forEach(direction => {
    const dir = direction[0];
    const value = Number.parseInt(direction.slice(1));
    let dx = 0;
    let dy = 0;
    switch (dir) {
      case 'U': dy += value; break;
      case 'D': dy -= value; break;
      case 'L': dx -= value; break;
      case 'R': dx += value; break;
    }

    const nextPoint = new Point2d(lastPoint.x + dx, lastPoint.y + dy);
    wire.push(new Segment(lastPoint, nextPoint));
    lastPoint = nextPoint;
  })

  return wire;
}

export default async function solver(
  input: NodeJS.ReadableStream
): Promise<Solution> {
  const lines = await getAllLines(input);
  const firstWire = parseWire(lines[0]);
  const secondWire = parseWire(lines[1]);
  
  let minDist = Number.MAX_SAFE_INTEGER;
  let minDelay = Number.MAX_SAFE_INTEGER;
  const origin = Point2d.Origo;
  
  let oneDist = 0;

  firstWire.forEach(segment1 => {
    let twoDist = 0;
    secondWire.forEach(segment2 => {
      const intersection = getIntersection(segment1, segment2);
      if (intersection && !intersection.equals(origin)) {
        minDelay = Math.min(minDelay, (oneDist + twoDist + Point2d.manhattanDistance(intersection, segment1.p1) + Point2d.manhattanDistance(intersection, segment2.p1)));
        minDist = Math.min(minDist, Point2d.manhattanDistance(intersection, origin));
      }
      twoDist += Point2d.manhattanDistance(segment2.p1, segment2.p2);
    });
    oneDist += Point2d.manhattanDistance(segment1.p1, segment1.p2);
  });

  return {
    first: minDist,
    second: minDelay
  }
}