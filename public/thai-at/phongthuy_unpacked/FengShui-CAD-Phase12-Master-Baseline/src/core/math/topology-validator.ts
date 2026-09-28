// ============================================================
// Topology Validator (The Judge)
// Tác giả: Dịch Sư Nguyễn Huy Hoàng & Computational Geometry Core
// ============================================================

import { RawPolygon, Point } from './geometry-types';
import { GeometryMath } from './geometry-math';
import { GeometryRelations, PointContainment } from './geometry-relations';

export class TopologyValidator {
    /**
     * Validate raw polygon geometry strictly.
     * Throws an Error with descriptive message if any topological rule is violated.
     */
    static validate(p: RawPolygon): void {
        this.validateRing(p.points, 'Outer Boundary');

        const holes = p.holes ?? [];
        for (let i = 0; i < holes.length; i++) {
            const h = holes[i];
            this.validateRing(h, `Hole[${i}]`);

            // Hole must not intersect outer ring
            if (GeometryRelations.ringsIntersect(h, p.points)) {
                throw new Error('Topology Error: Hole intersects outer boundary.');
            }

            // Every vertex of hole must be strictly inside outer boundary
            for (const q of h) {
                if (GeometryRelations.pointContainment(q, p.points) !== PointContainment.INSIDE) {
                    throw new Error('Topology Error: Hole must be strictly inside outer boundary.');
                }
            }

            // Hole must not intersect or contain previous holes
            for (let j = 0; j < i; j++) {
                const o = holes[j];
                if (GeometryRelations.ringsIntersect(h, o)) {
                    throw new Error('Topology Error: Hole intersects another hole.');
                }
                if (
                    GeometryRelations.pointContainment(h[0], o) !== PointContainment.OUTSIDE ||
                    GeometryRelations.pointContainment(o[0], h) !== PointContainment.OUTSIDE
                ) {
                    throw new Error('Topology Error: Nested holes are invalid.');
                }
            }
        }
    }

    /**
     * Validate an individual ring (outer boundary or hole)
     */
    private static validateRing(r: readonly Point[], label: string): void {
        if (!r || r.length < 3) {
            throw new Error(`Topology Error: ${label} has < 3 vertices.`);
        }

        // Check finite coordinates
        for (let i = 0; i < r.length; i++) {
            if (!GeometryMath.isFinitePoint(r[i])) {
                throw new Error(`Topology Error: ${label} contains non-finite point at index ${i}.`);
            }
        }

        // Check duplicate non-adjacent vertices
        const n = r.length;
        for (let i = 0; i < n; i++) {
            for (let j = i + 1; j < n; j++) {
                const isAdjacent = j === i + 1 || (i === 0 && j === n - 1);
                if (!isAdjacent && GeometryMath.pointsEqual(r[i], r[j])) {
                    throw new Error(`Topology Error: ${label} has duplicate non-adjacent vertices at indices ${i} and ${j}.`);
                }
            }
        }

        // Check non-zero physical area
        if (GeometryMath.ringArea(r) <= GeometryMath.EPSILON) {
            throw new Error(`Topology Error: ${label} has zero area.`);
        }

        // Check self-intersection
        if (GeometryRelations.ringSelfIntersects(r)) {
            throw new Error(`Topology Error: ${label} self-intersects.`);
        }
    }
}
