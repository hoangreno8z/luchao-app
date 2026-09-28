// ============================================================
// Martinez Shape Guard (Foreign Output Classifier)
// Tác giả: Dịch Sư Nguyễn Huy Hoàng & Computational Geometry Core
// ============================================================

import {
    MartinezMultiPolygon,
    MartinezPolygon,
    MartinezPosition
} from '../math/geometry-types';

const isPosition = (v: unknown): v is MartinezPosition =>
    Array.isArray(v) &&
    v.length === 2 &&
    typeof v[0] === 'number' &&
    typeof v[1] === 'number' &&
    Number.isFinite(v[0]) &&
    Number.isFinite(v[1]);

const isRing = (v: unknown): v is readonly MartinezPosition[] =>
    Array.isArray(v) && v.length >= 3 && v.every(isPosition);

const isPolygon = (v: unknown): v is MartinezPolygon =>
    Array.isArray(v) && v.length >= 1 && v.every(isRing);

const isMulti = (v: unknown): v is MartinezMultiPolygon =>
    Array.isArray(v) && v.length >= 1 && v.every(isPolygon);

export function classifyMartinez(result: unknown): 'NULL' | 'EMPTY' | 'POLYGON' | 'MULTIPOLYGON' {
    if (result === null || result === undefined) return 'NULL';
    if (!Array.isArray(result)) throw new Error('Invalid Martinez result: not an array.');
    if (result.length === 0) return 'EMPTY';
    if (isMulti(result)) return 'MULTIPOLYGON';
    if (isPolygon(result)) return 'POLYGON';
    throw new Error('Invalid Martinez geometry shape.');
}
