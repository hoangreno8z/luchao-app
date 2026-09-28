import {Point} from './geometry-types'; import {GeometryMath} from './geometry-math';
export enum PointContainment{OUTSIDE,INSIDE,BOUNDARY}
export class GeometryRelations{
 static onSegment(a:Point,b:Point,p:Point){const c=(b.x-a.x)*(p.y-a.y)-(b.y-a.y)*(p.x-a.x);return Math.abs(c)<=GeometryMath.EPSILON&&p.x>=Math.min(a.x,b.x)-GeometryMath.EPSILON&&p.x<=Math.max(a.x,b.x)+GeometryMath.EPSILON&&p.y>=Math.min(a.y,b.y)-GeometryMath.EPSILON&&p.y<=Math.max(a.y,b.y)+GeometryMath.EPSILON;}
 static pointContainment(p:Point,r:readonly Point[]){let inside=false;for(let i=0,j=r.length-1;i<r.length;j=i++){const a=r[j],b=r[i];if(this.onSegment(a,b,p))return PointContainment.BOUNDARY;if((a.y>p.y)!==(b.y>p.y)){const x=a.x+(p.y-a.y)*(b.x-a.x)/(b.y-a.y);if(p.x<x)inside=!inside;}}return inside?PointContainment.INSIDE:PointContainment.OUTSIDE;}
 static segmentsIntersect(a:Point,b:Point,c:Point,d:Point){const o1=GeometryMath.orientation(a,b,c),o2=GeometryMath.orientation(a,b,d),o3=GeometryMath.orientation(c,d,a),o4=GeometryMath.orientation(c,d,b);return o1!==o2&&o3!==o4||(o1===0&&this.onSegment(a,b,c))||(o2===0&&this.onSegment(a,b,d))||(o3===0&&this.onSegment(c,d,a))||(o4===0&&this.onSegment(c,d,b));}
 static ringSelfIntersects(r:readonly Point[]){for(let i=0;i<r.length;i++)for(let j=i+1;j<r.length;j++){if(j===i+1||(i===0&&j===r.length-1))continue;if(this.segmentsIntersect(r[i],r[(i+1)%r.length],r[j],r[(j+1)%r.length]))return true;}return false;}
 static ringsIntersect(a:readonly Point[],b:readonly Point[]){for(let i=0;i<a.length;i++)for(let j=0;j<b.length;j++)if(this.segmentsIntersect(a[i],a[(i+1)%a.length],b[j],b[(j+1)%b.length]))return true;return false;}
}
