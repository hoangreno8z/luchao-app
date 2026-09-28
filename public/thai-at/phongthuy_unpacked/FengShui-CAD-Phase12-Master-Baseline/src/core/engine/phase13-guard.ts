// ============================================================
// Phase 13 Guard Gate (Strict Verification before Feng Shui / Flying Stars)
// Tác giả: Dịch Sư Nguyễn Huy Hoàng & Computational Geometry Core
// ============================================================

import { CanonicalPolygon, CANONICAL_BRAND } from '../math/geometry-types';

export class Phase13Guard {
    /**
     * Verify that input geometry is an immutable CanonicalPolygon certified by Phase 12.
     * Throws an Error if draft, mutable, or non-canonical polygon is passed.
     */
    static assertCanonical(polygon: unknown): asserts polygon is CanonicalPolygon {
        if (!polygon || typeof polygon !== 'object') {
            throw new Error('Phase 13 Gatekeeper Error: Target must be a valid object.');
        }

        const candidate = polygon as Partial<CanonicalPolygon>;
        if (candidate._brand !== CANONICAL_BRAND) {
            throw new Error('Phase 13 Gatekeeper Error: Draft/mutable geometry is rejected. Only certified CanonicalPolygon can enter Phase 13.');
        }

        if (!Array.isArray(candidate.points) || candidate.points.length < 3) {
            throw new Error('Phase 13 Gatekeeper Error: CanonicalPolygon must have at least 3 outer vertices.');
        }

        if (!Object.isFrozen(candidate) || !Object.isFrozen(candidate.points)) {
            throw new Error('Phase 13 Gatekeeper Error: CanonicalPolygon must be deeply immutable (frozen).');
        }
    }

    /**
     * Check if geometry is canonical without throwing
     */
    static isCanonical(polygon: unknown): polygon is CanonicalPolygon {
        try {
            this.assertCanonical(polygon);
            return true;
        } catch (_) {
            return false;
        }
    }
}
