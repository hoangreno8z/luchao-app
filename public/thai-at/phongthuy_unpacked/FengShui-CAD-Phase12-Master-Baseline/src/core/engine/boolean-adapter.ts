// ============================================================
// Foreign Boolean Adapter (Martinez Polygon Clipping Isolation)
// Tác giả: Dịch Sư Nguyễn Huy Hoàng & Computational Geometry Core
// ============================================================

import { union, intersection, diff, xor } from 'martinez-polygon-clipping';
import {
    CanonicalPolygon,
    MultiPolygon,
    Point,
    MartinezPolygon,
    MartinezMultiPolygon,
    MartinezResult,
    MartinezRing
} from '../math/geometry-types';
import { TopologyNormalizer } from '../math/topology-normalizer';
import { classifyMartinez } from './martinez-shape-guard';

export class BooleanAdapter {
    /**
     * Compute Boolean Union of two CanonicalPolygons: A ∪ B
     */
    static union(a: CanonicalPolygon, b: CanonicalPolygon): MultiPolygon {
        const polyA = this.toMartinez(a);
        const polyB = this.toMartinez(b);
        const result = union(polyA, polyB) as MartinezResult;
        return this.fromMartinez(result);
    }

    /**
     * Compute Boolean Intersection of two CanonicalPolygons: A ∩ B
     */
    static intersection(a: CanonicalPolygon, b: CanonicalPolygon): MultiPolygon {
        const polyA = this.toMartinez(a);
        const polyB = this.toMartinez(b);
        const result = intersection(polyA, polyB) as MartinezResult;
        return this.fromMartinez(result);
    }

    /**
     * Compute Boolean Difference of two CanonicalPolygons: A \ B
     */
    static difference(a: CanonicalPolygon, b: CanonicalPolygon): MultiPolygon {
        const polyA = this.toMartinez(a);
        const polyB = this.toMartinez(b);
        const result = diff(polyA, polyB) as MartinezResult;
        return this.fromMartinez(result);
    }

    /**
     * Compute Boolean Symmetric Difference (Xor) of two CanonicalPolygons: A ⊕ B
     */
    static xor(a: CanonicalPolygon, b: CanonicalPolygon): MultiPolygon {
        const polyA = this.toMartinez(a);
        const polyB = this.toMartinez(b);
        const result = xor(polyA, polyB) as MartinezResult;
        return this.fromMartinez(result);
    }

    /**
     * Convert CanonicalPolygon to Martinez input format
     */
    static toMartinez(p: CanonicalPolygon): MartinezPolygon {
        const toClosedRing = (pts: readonly Point[]): MartinezRing => {
            const ring: MartinezRing = pts.map(pt => [pt.x, pt.y]);
            if (pts.length > 0) {
                // Martinez requires explicit closed loop
                ring.push([pts[0].x, pts[0].y]);
            }
            return ring;
        };

        const rings: MartinezPolygon = [toClosedRing(p.points)];
        for (const h of p.holes) {
            rings.push(toClosedRing(h));
        }
        return rings;
    }

    /**
     * Convert Martinez result back into validated, normalized MultiPolygon
     */
    static fromMartinez(result: unknown): MultiPolygon {
        const shape = classifyMartinez(result);
        if (shape === 'NULL' || shape === 'EMPTY') {
            return Object.freeze({ polygons: Object.freeze([]) });
        }

        const polyList: MartinezPolygon[] = shape === 'MULTIPOLYGON'
            ? (result as MartinezMultiPolygon)
            : [result as MartinezPolygon];

        const canonicalList: CanonicalPolygon[] = [];

        for (const poly of polyList) {
            if (!poly || poly.length === 0) continue;

            const outerRing = this.ringToPoints(poly[0]);
            if (outerRing.length < 3) continue;

            const holeRings: Point[][] = [];
            for (let i = 1; i < poly.length; i++) {
                const holePts = this.ringToPoints(poly[i]);
                if (holePts.length >= 3) {
                    holeRings.push(holePts);
                }
            }

            try {
                const canonical = TopologyNormalizer.normalize({
                    points: outerRing,
                    holes: holeRings
                });
                canonicalList.push(canonical);
            } catch (_) {
                // Ignore degenerate zero-area fragments if any
            }
        }

        return Object.freeze({
            polygons: Object.freeze(canonicalList)
        });
    }

    private static ringToPoints(ring: MartinezRing): Point[] {
        const pts: Point[] = [];
        for (let i = 0; i < ring.length; i++) {
            // Drop duplicate closing vertex
            if (i === ring.length - 1 && ring.length > 1 && ring[i][0] === ring[0][0] && ring[i][1] === ring[0][1]) {
                continue;
            }
            pts.push({ x: ring[i][0], y: ring[i][1] });
        }
        return pts;
    }
}
