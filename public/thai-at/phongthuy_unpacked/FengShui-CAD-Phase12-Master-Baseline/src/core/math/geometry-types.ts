export interface Point { readonly x:number; readonly y:number; }
export interface RawPolygon { readonly points:readonly Point[]; readonly holes?:readonly (readonly Point[])[]; }
export const CANONICAL_BRAND=Symbol("CanonicalPolygon");
export interface CanonicalPolygon { readonly _brand:typeof CANONICAL_BRAND; readonly points:readonly Point[]; readonly holes:readonly (readonly Point[])[]; }
export interface MultiPolygon { readonly polygons:readonly CanonicalPolygon[]; }
export type MartinezPosition=[number,number]; export type MartinezRing=MartinezPosition[]; export type MartinezPolygon=MartinezRing[]; export type MartinezMultiPolygon=MartinezPolygon[]; export type MartinezResult=MartinezPolygon|MartinezMultiPolygon|null;
