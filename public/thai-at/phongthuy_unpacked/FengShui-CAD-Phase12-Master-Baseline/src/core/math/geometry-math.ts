import {Point,RawPolygon,CanonicalPolygon} from './geometry-types';
export class GeometryMath {
 static readonly EPSILON=1e-8;
 static approxEqual(a:number,b:number){return Math.abs(a-b)<=this.EPSILON;}
 static pointsEqual(a:Point,b:Point){return this.approxEqual(a.x,b.x)&&this.approxEqual(a.y,b.y);}
 static isFinitePoint(p:Point){return Number.isFinite(p.x)&&Number.isFinite(p.y);}
 static ringSignedArea(r:readonly Point[]){let s=0;for(let i=0;i<r.length;i++){const j=(i+1)%r.length;s+=r[i].x*r[j].y-r[j].x*r[i].y;}return s/2;}
 static ringArea(r:readonly Point[]){return Math.abs(this.ringSignedArea(r));}
 static polygonPhysicalArea(p:RawPolygon|CanonicalPolygon){return Math.max(0,this.ringArea(p.points)-(p.holes??[]).reduce((s,h)=>s+this.ringArea(h),0));}
 static orientation(a:Point,b:Point,c:Point):-1|0|1{const x=(b.x-a.x)*(c.y-a.y)-(b.y-a.y)*(c.x-a.x);return Math.abs(x)<=this.EPSILON?0:x>0?1:-1;}
}
