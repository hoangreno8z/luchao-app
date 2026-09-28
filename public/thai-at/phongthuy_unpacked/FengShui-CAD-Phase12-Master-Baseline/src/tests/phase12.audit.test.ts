// ============================================================
// Phase 12 Comprehensive Certification & Audit Test Suite
// Tác giả: Dịch Sư Nguyễn Huy Hoàng & Computational Geometry Core
// ============================================================

import { TopologyNormalizer } from '../core/math/topology-normalizer';
import { TopologyValidator } from '../core/math/topology-validator';
import { GeometryMath } from '../core/math/geometry-math';
import { GeometricSolver } from '../core/constraint/geometric-solver';
import { MatrixMath } from '../core/constraint/linear-algebra';
import { BooleanAdapter } from '../core/engine/boolean-adapter';
import { CommandDispatcher, Command, CadState } from '../core/engine/command-dispatcher';
import { Phase13Guard } from '../core/engine/phase13-guard';
import { RawPolygon } from '../core/math/geometry-types';

describe('PHASE 12 GEOMETRIC & CONSTRAINT AUDIT CERTIFICATION', () => {

    describe('1. Topology Normalizer & Deep Immutability', () => {
        test('Deeply freezes CanonicalPolygon, points and coordinates', () => {
            const poly = TopologyNormalizer.normalize({
                points: [{ x: 0, y: 0 }, { x: 10, y: 0 }, { x: 10, y: 10 }, { x: 0, y: 10 }]
            });

            expect(Object.isFrozen(poly)).toBe(true);
            expect(Object.isFrozen(poly.points)).toBe(true);
            expect(Object.isFrozen(poly.points[0])).toBe(true);
            expect(Object.isFrozen(poly.holes)).toBe(true);
            expect(GeometryMath.polygonPhysicalArea(poly)).toBeCloseTo(100);
        });

        test('Enforces CCW winding on outer boundary even if input is CW', () => {
            const cwInput: RawPolygon = {
                points: [{ x: 0, y: 0 }, { x: 0, y: 10 }, { x: 10, y: 10 }, { x: 10, y: 0 }]
            };
            const poly = TopologyNormalizer.normalize(cwInput);
            expect(GeometryMath.ringSignedArea(poly.points)).toBeGreaterThan(0);
        });
    });

    describe('2. Complex Architectural Shapes Certification (L, U, H, Skew, Missing-Corner, 6m Scale)', () => {
        test('L-Shaped Polygon (6 vertices)', () => {
            const lShape = TopologyNormalizer.normalize({
                points: [
                    { x: 0, y: 0 },
                    { x: 6000, y: 0 },
                    { x: 6000, y: 4000 },
                    { x: 3000, y: 4000 },
                    { x: 3000, y: 10000 },
                    { x: 0, y: 10000 }
                ]
            });
            expect(lShape.points.length).toBe(6);
            // 6m * 4m + 3m * 6m = 42m2 = 42,000,000 mm2
            expect(GeometryMath.polygonPhysicalArea(lShape)).toBeCloseTo(42000000);
        });

        test('U-Shaped Polygon (8 vertices)', () => {
            const uShape = TopologyNormalizer.normalize({
                points: [
                    { x: 0, y: 0 },
                    { x: 8000, y: 0 },
                    { x: 8000, y: 10000 },
                    { x: 6000, y: 10000 },
                    { x: 6000, y: 3000 },
                    { x: 2000, y: 3000 },
                    { x: 2000, y: 10000 },
                    { x: 0, y: 10000 }
                ]
            });
            expect(uShape.points.length).toBe(8);
            // 8m * 10m - 4m * 7m = 80 - 28 = 52 m2 = 52,000,000 mm2
            expect(GeometryMath.polygonPhysicalArea(uShape)).toBeCloseTo(52000000);
        });

        test('H-Shaped Polygon (12 vertices)', () => {
            const hShape = TopologyNormalizer.normalize({
                points: [
                    { x: 0, y: 0 },
                    { x: 3000, y: 0 },
                    { x: 3000, y: 4000 },
                    { x: 7000, y: 4000 },
                    { x: 7000, y: 0 },
                    { x: 10000, y: 0 },
                    { x: 10000, y: 10000 },
                    { x: 7000, y: 10000 },
                    { x: 7000, y: 6000 },
                    { x: 3000, y: 6000 },
                    { x: 3000, y: 10000 },
                    { x: 0, y: 10000 }
                ]
            });
            expect(hShape.points.length).toBe(12);
            // 100 - 2*(4*4) = 100 - 32 = 68 m2 = 68,000,000 mm2
            expect(GeometryMath.polygonPhysicalArea(hShape)).toBeCloseTo(68000000);
        });

        test('Skew / Concave Polygon', () => {
            const skew = TopologyNormalizer.normalize({
                points: [
                    { x: 0, y: 0 },
                    { x: 10000, y: 2000 },
                    { x: 8000, y: 8000 },
                    { x: 3000, y: 4000 },
                    { x: 0, y: 7000 }
                ]
            });
            expect(skew.points.length).toBe(5);
            expect(GeometryMath.polygonPhysicalArea(skew)).toBeGreaterThan(0);
        });

        test('MultiPolygon with Valid Internal Courtyard Hole', () => {
            const houseWithCourtyard = TopologyNormalizer.normalize({
                points: [
                    { x: 0, y: 0 },
                    { x: 10000, y: 0 },
                    { x: 10000, y: 10000 },
                    { x: 0, y: 10000 }
                ],
                holes: [
                    [
                        { x: 4000, y: 4000 },
                        { x: 6000, y: 4000 },
                        { x: 6000, y: 6000 },
                        { x: 4000, y: 6000 }
                    ]
                ]
            });
            expect(houseWithCourtyard.holes.length).toBe(1);
            // 100m2 - 4m2 = 96m2 = 96,000,000 mm2
            expect(GeometryMath.polygonPhysicalArea(houseWithCourtyard)).toBeCloseTo(96000000);
        });
    });

    describe('3. Topology Validator (The Judge) Error Rejections', () => {
        test('Rejects duplicate non-adjacent vertices', () => {
            expect(() => {
                TopologyValidator.validate({
                    points: [
                        { x: 0, y: 0 },
                        { x: 10, y: 0 },
                        { x: 10, y: 10 },
                        { x: 0, y: 0 }, // Duplicate non-adjacent
                        { x: 0, y: 10 }
                    ]
                });
            }).toThrow(/duplicate non-adjacent vertices/i);
        });

        test('Rejects hole intersecting outer boundary', () => {
            expect(() => {
                TopologyValidator.validate({
                    points: [{ x: 0, y: 0 }, { x: 10, y: 0 }, { x: 10, y: 10 }, { x: 0, y: 10 }],
                    holes: [[{ x: -2, y: 5 }, { x: 5, y: 5 }, { x: 5, y: 8 }, { x: -2, y: 8 }]]
                });
            }).toThrow(/Hole intersects outer boundary|strictly inside outer boundary/i);
        });

        test('Rejects nested holes', () => {
            expect(() => {
                TopologyValidator.validate({
                    points: [{ x: 0, y: 0 }, { x: 20, y: 0 }, { x: 20, y: 20 }, { x: 0, y: 20 }],
                    holes: [
                        [{ x: 2, y: 2 }, { x: 18, y: 2 }, { x: 18, y: 18 }, { x: 2, y: 18 }],
                        [{ x: 5, y: 5 }, { x: 10, y: 5 }, { x: 10, y: 10 }, { x: 5, y: 10 }] // Inside first hole
                    ]
                });
            }).toThrow(/Nested holes are invalid/i);
        });
    });

    describe('4. SVD & Degrees of Freedom (DoF) Calculation via Numerical Rank', () => {
        test('Computes SVD and accurate rank on rectangular matrices', () => {
            const A = [
                [1, 0, 1],
                [0, 1, 1],
                [1, 1, 2] // Row 3 = Row 1 + Row 2 (Rank 2)
            ];
            const rank = MatrixMath.matrixRank(A);
            expect(rank).toBe(2);
        });

        test('Calculates DoF = 2N - numericalRank(J) accurately', () => {
            const square: RawPolygon = {
                points: [{ x: 0, y: 0 }, { x: 5, y: 0 }, { x: 5, y: 5 }, { x: 0, y: 5 }]
            };
            // 4 vertices = 8 variables. 2 constraints (Fixed point on 0 = 2 equations)
            const result = GeometricSolver.solve(square, [
                { type: 'FIXED_POINT', vertexIndex: 0, target: { x: 0, y: 0 } }
            ]);
            expect(result.dofSummary.totalVariables).toBe(8);
            expect(result.dofSummary.numericalRank).toBe(2);
            expect(result.dofSummary.estimatedDoF).toBe(6);
        });
    });

    describe('5. Levenberg-Marquardt Solver & Hard Constraints', () => {
        test('Preserves Fixed Points with Zero Drift under constraint chains', () => {
            const initial: RawPolygon = {
                points: [{ x: 100, y: 100 }, { x: 4000, y: 200 }, { x: 3800, y: 7900 }, { x: 100, y: 8000 }]
            };
            const result = GeometricSolver.solve(initial, [
                { type: 'FIXED_POINT', vertexIndex: 0, target: { x: 0, y: 0 } },
                { type: 'FIXED_POINT', vertexIndex: 1, target: { x: 5000, y: 0 } },
                { type: 'EDGE_LENGTH', edgeIndex: 1, targetLength: 12000 },
                { type: 'VERTICAL_EDGE', edgeIndex: 1 }
            ]);

            expect(result.status).toBe('SOLVED');
            if (result.status === 'SOLVED') {
                expect(result.polygon.points[0].x).toBeCloseTo(0, 5);
                expect(result.polygon.points[0].y).toBeCloseTo(0, 5);
                expect(result.polygon.points[1].x).toBeCloseTo(5000, 5);
                expect(result.polygon.points[1].y).toBeCloseTo(0, 5);
                expect(result.maxResidual).toBeLessThan(1e-5);
            }
        });

        test('Solves Full RECTANGLE Semantics (orthogonal corners, equal opposite lengths)', () => {
            const distortedQuad: RawPolygon = {
                points: [{ x: 50, y: 80 }, { x: 5200, y: 300 }, { x: 4900, y: 10200 }, { x: 200, y: 9900 }]
            };

            const result = GeometricSolver.solve(distortedQuad, [
                { type: 'FIXED_POINT', vertexIndex: 0, target: { x: 0, y: 0 } },
                { type: 'RECTANGLE', edgeA: 0, edgeB: 1 },
                { type: 'EDGE_LENGTH', edgeIndex: 0, targetLength: 5000 },
                { type: 'EDGE_LENGTH', edgeIndex: 1, targetLength: 10000 },
                { type: 'HORIZONTAL_EDGE', edgeIndex: 0 }
            ]);

            expect(result.status).toBe('SOLVED');
            if (result.status === 'SOLVED') {
                const pts = result.polygon.points;
                expect(pts[0]).toEqual({ x: 0, y: 0 });
                expect(pts[1].x).toBeCloseTo(5000, 3);
                expect(pts[1].y).toBeCloseTo(0, 3);
                expect(pts[2].x).toBeCloseTo(5000, 3);
                expect(pts[2].y).toBeCloseTo(10000, 3);
                expect(pts[3].x).toBeCloseTo(0, 3);
                expect(pts[3].y).toBeCloseTo(10000, 3);
                expect(GeometryMath.polygonPhysicalArea(result.polygon)).toBeCloseTo(50000000);
            }
        });

        test('Detects Over-Constrained Hard Conflict', () => {
            const initial: RawPolygon = {
                points: [{ x: 0, y: 0 }, { x: 10, y: 0 }, { x: 10, y: 10 }, { x: 0, y: 10 }]
            };

            const result = GeometricSolver.solve(initial, [
                { type: 'FIXED_POINT', vertexIndex: 0, target: { x: 0, y: 0 } },
                { type: 'FIXED_POINT', vertexIndex: 1, target: { x: 10, y: 0 } },
                { type: 'EDGE_LENGTH', edgeIndex: 0, targetLength: 50 } // Impossible conflict: distance is 10 but length requires 50
            ]);

            expect(result.status).toBe('OVER_CONSTRAINED_CONFLICT');
        });
    });

    describe('6. Foreign Boolean Adapter (Martinez Isolation)', () => {
        const polyA = TopologyNormalizer.normalize({
            points: [{ x: 0, y: 0 }, { x: 10, y: 0 }, { x: 10, y: 10 }, { x: 0, y: 10 }]
        });
        const polyB = TopologyNormalizer.normalize({
            points: [{ x: 5, y: 0 }, { x: 15, y: 0 }, { x: 15, y: 10 }, { x: 5, y: 10 }]
        });

        test('Boolean Union producing single CanonicalPolygon', () => {
            const unionResult = BooleanAdapter.union(polyA, polyB);
            expect(unionResult.polygons.length).toBe(1);
            expect(GeometryMath.polygonPhysicalArea(unionResult.polygons[0])).toBeCloseTo(150);
        });

        test('Boolean Intersection producing common area', () => {
            const interResult = BooleanAdapter.intersection(polyA, polyB);
            expect(interResult.polygons.length).toBe(1);
            expect(GeometryMath.polygonPhysicalArea(interResult.polygons[0])).toBeCloseTo(50);
        });

        test('Boolean Difference producing subtraction with valid topology', () => {
            const diffResult = BooleanAdapter.difference(polyA, polyB);
            expect(diffResult.polygons.length).toBe(1);
            expect(GeometryMath.polygonPhysicalArea(diffResult.polygons[0])).toBeCloseTo(50);
        });
    });

    describe('7. CommandDispatcher Atomic Transactions & Undo/Redo', () => {
        test('Executes, Undoes and Redoes commands immutably', () => {
            const dispatcher = new CommandDispatcher();
            expect(dispatcher.getState().polygon).toBeNull();
            expect(dispatcher.canUndo()).toBe(false);

            const initialPoly = TopologyNormalizer.normalize({
                points: [{ x: 0, y: 0 }, { x: 6, y: 0 }, { x: 6, y: 8 }, { x: 0, y: 8 }]
            });

            const setPolyCmd: Command = {
                description: 'Set Initial Polygon',
                execute: (state: CadState): CadState => ({
                    ...state,
                    polygon: initialPoly
                }),
                undo: (state: CadState): CadState => ({
                    ...state,
                    polygon: null
                })
            };

            dispatcher.execute(setPolyCmd);
            expect(dispatcher.getState().polygon).not.toBeNull();
            expect(dispatcher.canUndo()).toBe(true);

            dispatcher.undo();
            expect(dispatcher.getState().polygon).toBeNull();
            expect(dispatcher.canRedo()).toBe(true);

            dispatcher.redo();
            expect(dispatcher.getState().polygon).not.toBeNull();
        });
    });

    describe('8. Phase 13 Guard Gatekeeper', () => {
        test('Rejects non-canonical draft objects', () => {
            expect(() => {
                Phase13Guard.assertCanonical({ points: [{ x: 0, y: 0 }] });
            }).toThrow(/Phase 13 Gatekeeper Error/i);
        });

        test('Accepts genuine certified CanonicalPolygon', () => {
            const certified = TopologyNormalizer.normalize({
                points: [{ x: 0, y: 0 }, { x: 10, y: 0 }, { x: 10, y: 10 }, { x: 0, y: 10 }]
            });
            expect(Phase13Guard.isCanonical(certified)).toBe(true);
        });
    });
});
