import { CANONICAL_BRAND, CanonicalPolygon, Point, RawPolygon } from "./geometry-types";
import { GeometryMath } from "./geometry-math";
import { TopologyValidator } from "./topology-validator";

export class TopologyNormalizer {
  static normalize(p: RawPolygon): CanonicalPolygon {
    const outer=this.clean(p.points);
    const holes=(p.holes??[]).map(h=>this.clean(h));
    const checked:RawPolygon={points:outer,holes};
    TopologyValidator.validate(checked);

    if(GeometryMath.ringSignedArea(outer)<0) outer.reverse();
    for(const h of holes) if(GeometryMath.ringSignedArea(h)>0) h.reverse();

    return Object.freeze({
      _brand: CANONICAL_BRAND,
      points:this.freezeRing(outer),
      holes:Object.freeze(holes.map(h=>this.freezeRing(h)))
    });
  }

  private static clean(r: readonly Point[]): Point[] {
    const out:Point[]=[];
    for(const p of r){
      if(out.length===0 || !GeometryMath.approx(out[out.length-1].x,p.x) ||
         !GeometryMath.approx(out[out.length-1].y,p.y))
        out.push({x:p.x,y:p.y});
    }
    if(out.length>1 && GeometryMath.approx(out[0].x,out[out.length-1].x) &&
       GeometryMath.approx(out[0].y,out[out.length-1].y)) out.pop();
    return out;
  }

  private static freezeRing(r: readonly Point[]): readonly Point[] {
    return Object.freeze(r.map(p=>Object.freeze({x:p.x,y:p.y})));
  }
}
