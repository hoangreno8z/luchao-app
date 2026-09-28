import { GeometryMath } from "./geometry-math";
import { GeometryRelations, PointContainment } from "./geometry-relations";
import { RawPolygon } from "./geometry-types";

export class TopologyValidator {
  static validate(p: RawPolygon): void {
    this.ring(p.points, "Outer");
    const holes=p.holes ?? [];
    for(let i=0;i<holes.length;i++){
      const h=holes[i];
      this.ring(h,`Hole[${i}]`);
      for(const pt of h){
        const c=GeometryRelations.pointContainment(pt,p.points);
        if(c!==PointContainment.INSIDE)
          throw new Error("Topology Error: Hole must be strictly inside outer ring.");
      }
      if(GeometryRelations.ringsIntersect(h,p.points))
        throw new Error("Topology Error: Hole intersects outer ring.");
      for(let j=0;j<i;j++){
        if(GeometryRelations.ringsIntersect(h,holes[j]))
          throw new Error("Topology Error: holes intersect.");
        const a=GeometryRelations.pointContainment(h[0],holes[j]);
        const b=GeometryRelations.pointContainment(holes[j][0],h);
        if(a!==PointContainment.OUTSIDE || b!==PointContainment.OUTSIDE)
          throw new Error("Topology Error: nested holes are not allowed.");
      }
    }
  }

  private static ring(r: readonly {x:number;y:number}[], label:string): void {
    if(r.length<3) throw new Error(`Topology Error: ${label} has < 3 vertices.`);
    if(r.some(p=>!GeometryMath.finite(p.x)||!GeometryMath.finite(p.y)))
      throw new Error(`Topology Error: ${label} contains non-finite coordinates.`);
    if(GeometryMath.ringArea(r)<=GeometryMath.EPSILON)
      throw new Error(`Topology Error: ${label} has zero area.`);
    if(GeometryRelations.ringSelfIntersects(r))
      throw new Error(`Topology Error: ${label} self-intersects.`);
  }
}
