import { CanonicalPolygon, Point, RawPolygon } from "./geometry-types";

export class GeometryMath {
  static readonly EPSILON = 1e-8;

  static finite(n: number): boolean {
    return Number.isFinite(n);
  }

  static approx(a: number, b: number, eps = this.EPSILON): boolean {
    return Math.abs(a - b) <= eps;
  }

  static distance(a: Point, b: Point): number {
    return Math.hypot(b.x - a.x, b.y - a.y);
  }

  static ringSignedArea(ring: readonly Point[]): number {
    let s = 0;
    for (let i = 0; i < ring.length; i++) {
      const j = (i + 1) % ring.length;
      s += ring[i].x * ring[j].y - ring[j].x * ring[i].y;
    }
    return s / 2;
  }

  static ringArea(ring: readonly Point[]): number {
    return Math.abs(this.ringSignedArea(ring));
  }

  static polygonPhysicalArea(p: RawPolygon | CanonicalPolygon): number {
    const outer = this.ringArea(p.points);
    const holes = (p.holes ?? []).reduce((s, h) => s + this.ringArea(h), 0);
    return Math.max(0, outer - holes);
  }

  static orientation(a: Point, b: Point, c: Point): -1 | 0 | 1 {
    const cross = (b.x-a.x)*(c.y-a.y) - (b.y-a.y)*(c.x-a.x);
    if (Math.abs(cross) <= this.EPSILON) return 0;
    return cross > 0 ? 1 : -1;
  }
}
