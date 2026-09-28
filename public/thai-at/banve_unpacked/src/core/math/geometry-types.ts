export interface Point {
  readonly x: number;
  readonly y: number;
}

export interface RawPolygon {
  readonly points: readonly Point[];
  readonly holes?: readonly (readonly Point[])[];
}

export const CANONICAL_BRAND: unique symbol = Symbol("CanonicalPolygon");

export interface CanonicalPolygon {
  readonly _brand: typeof CANONICAL_BRAND;
  readonly points: readonly Point[];
  readonly holes: readonly (readonly Point[])[];
}

export interface MultiPolygon {
  readonly polygons: readonly CanonicalPolygon[];
}

export type MartinezPosition = readonly [number, number];
export type MartinezRing = readonly MartinezPosition[];
export type MartinezPolygon = readonly MartinezRing[];
export type MartinezMultiPolygon = readonly MartinezPolygon[];
