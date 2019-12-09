export default class Point2d {
  public readonly x: number;
  public readonly y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  public equals(other: any) {
    if (other instanceof Point2d) {
      return this.x === other.x && this.y === other.y;
    }
    return false;
  }

  public static get Origo() {
    return new Point2d(0, 0);
  }

  public static manhattanDistance(a: Point2d, b: Point2d): number {
    return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
  }
}