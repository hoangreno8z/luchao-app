// ============================================================
// Topology Normalizer (The Canonicalizer)
// Tác giả: Dịch Sư Nguyễn Huy Hoàng & Computational Geometry Core
// ============================================================

import {
    RawPolygon,
    CanonicalPolygon,
    Point,
    CANONICAL_BRAND
} from './geometry-types';
import { GeometryMath } from './geometry-math';
import { TopologyValidator } from './topology-validator';

export class TopologyNormalizer {
    /**
     * Normalize a raw polygon into an immutable, verified CanonicalPolygon:
     * 1. Deduplicates sequential points and trailing closing points.
     * 2. Validates topology via TopologyValidator (The Judge).
     * 3. Enforces CCW winding on outer boundary and CW winding on all hole rings.
     * 4. Deeply freezes the data structures into CanonicalPolygon with brand symbol.
     */
    static normalize(p: RawPolygon): CanonicalPolygon {
        const outerCleaned = this.cleanRing(p.points);
        const holesCleaned = (p.holes ?? []).map(h => this.cleanRing(h));

        // Validation gate
        TopologyValidator.validate({ points: outerCleaned, holes: holesCleaned });

        // Enforce CCW (positive signed area) for outer ring
        if (GeometryMath.ringSignedArea(outerCleaned) < 0) {
            outerCleaned.reverse();
        }

        // Enforce CW (negative signed area) for holes
        const canonicalHoles = holesCleaned.map(hole => {
            if (GeometryMath.ringSignedArea(hole) > 0) {
                hole.reverse();
            }
            return this.deepFreezeRing(hole);
        });

        return Object.freeze({
            _brand: CANONICAL_BRAND,
            points: this.deepFreezeRing(outerCleaned),
            holes: Object.freeze(canonicalHoles)
        });
    }

    private static cleanRing(r: readonly Point[]): Point[] {
        const cleaned: Point[] = [];
        for (const p of r) {
            if (!cleaned.length || !GeometryMath.pointsEqual(cleaned[cleaned.length - 1], p)) {
                cleaned.push({ x: p.x, y: p.y });
            }
        }
        // Remove closing point if duplicate of start point
        if (cleaned.length > 1 && GeometryMath.pointsEqual(cleaned[0], cleaned[cleaned.length - 1])) {
            cleaned.pop();
        }
        return cleaned;
    }

    private static deepFreezeRing(r: Point[]): readonly Point[] {
        return Object.freeze(r.map(p => Object.freeze({ x: p.x, y: p.y })));
    }
}
