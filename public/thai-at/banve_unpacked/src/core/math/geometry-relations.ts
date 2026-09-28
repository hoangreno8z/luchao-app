import { GeometryMath } from "./geometry-math";
import { Point } from "./geometry-types";

export enum PointContainment { OUTSIDE, INSIDE, BOUNDARY }

export class GeometryRelations {
  static onSegment(a: Point, b: Point, p: Point): boolean {
    const cross = (b.x-a.x)*(p.y-a.y) - (b.y-a.y)*(p.x-a.x);
    if (Math.abs(cross) > GeometryMath.EPSILON) return false;
    return p.x >= Math.min(a.x,b.x)-GeometryMath.EPSILON &&
      p.x <= Math.max(a.x,b.x)+GeometryMath.EPSILON &&
      p.y >= Math.min(a.y,b.y)-GeometryMath.EPSILON &&
      p.y <= Math.max(a.y,b.y)+GeometryMath.EPSILON;
  }

  static segmentsIntersect(a: Point,b: Point,c: Point,d: Point): boolean {
    const o1=GeometryMath.orientation(a,b,c), o2=GeometryMath.orientation(a,b,d);
    const o3=GeometryMath.orientation(c,d,a), o4=GeometryMath.orientation(c,d,b);
    if (o1!==o2 && o3!==o4) return true;
    return (o1===0 && this.onSegment(a,b,c)) ||
      (o2===0 && this.onSegment(a,b,d)) ||
      (o3===0 && this.onSegment(c,d,a)) ||
      (o4===0 && this.onSegment(c,d,b));
  }

  static ringSelfIntersects(ring: readonly Point[]): boolean {
    for(let i=0;i<ring.length;i++){
      const a=ring[i], b=ring[(i+1)%ring.length];
      for(let j=i+1;j<ring.length;j++){
        if(j===i+1 || (i===0 && j===ring.length-1)) continue;
        if(this.segmentsIntersect(a,b,ring[j],ring[(j+1)%ring.length])) return true;
      }
    }
    return false;
  }

  static pointContainment(p: Point, ring: readonly Point[]): PointContainment {
    let inside=false;
    for(let i=0,j=ring.length-1;i<ring.length;j=i++){
      const a=ring[j], b=ring[i];
      if(this.onSegment(a,b,p)) return PointContainment.BOUNDARY;
      const crosses=(a.y>p.y)!==(b.y>p.y);
      if(crosses){
        const x=a.x+(p.y-a.y)*(b.x-a.x)/(b.y-a.y);
        if(p.x<x) inside=!inside;
      }
    }
    return inside ? PointContainment.INSIDE : PointContainment.OUTSIDE;
  }

  static ringsIntersect(a: readonly Point[], b: readonly Point[]): boolean {
    for(let i=0;i<a.length;i++)
      for(let j=0;j<b.length;j++)
        if(this.segmentsIntersect(a[i],a[(i+1)%a.length],b[j],b[(j+1)%b.length])) return true;
    return false;
  }
}
