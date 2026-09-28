// ============================================================
// Residual and Analytical Jacobian Evaluator
// Tác giả: Dịch Sư Nguyễn Huy Hoàng & Computational Geometry Core
// ============================================================

import { ConstraintGraph } from './constraint-types';
import { Point } from '../math/geometry-types';

export class ResidualEvaluator {
    private static readonly EPSILON = 1e-12;

    /**
     * Evaluate residual vector R(p) for all active constraint equations
     */
    static evaluate(p: readonly Point[], g: ConstraintGraph): number[] {
        const r: number[] = [];
        const n = p.length;

        for (const node of g.nodes) {
            const c = node.constraint;
            switch (c.type) {
                case 'FIXED_POINT':
                    r.push(p[c.vertexIndex].x - c.target.x, p[c.vertexIndex].y - c.target.y);
                    break;

                case 'EDGE_LENGTH': {
                    const a = p[c.edgeIndex];
                    const b = p[(c.edgeIndex + 1) % n];
                    const len = Math.hypot(b.x - a.x, b.y - a.y);
                    r.push(len - c.targetLength);
                    break;
                }

                case 'HORIZONTAL_EDGE': {
                    const a = p[c.edgeIndex];
                    const b = p[(c.edgeIndex + 1) % n];
                    r.push(b.y - a.y);
                    break;
                }

                case 'VERTICAL_EDGE': {
                    const a = p[c.edgeIndex];
                    const b = p[(c.edgeIndex + 1) % n];
                    r.push(b.x - a.x);
                    break;
                }

                case 'PARALLEL_EDGES': {
                    const a = p[c.edgeA];
                    const b = p[(c.edgeA + 1) % n];
                    const d = p[c.edgeB];
                    const e = p[(c.edgeB + 1) % n];
                    r.push((b.x - a.x) * (e.y - d.y) - (b.y - a.y) * (e.x - d.x));
                    break;
                }

                case 'PERPENDICULAR_EDGES': {
                    const a = p[c.edgeA];
                    const b = p[(c.edgeA + 1) % n];
                    const d = p[c.edgeB];
                    const e = p[(c.edgeB + 1) % n];
                    r.push((b.x - a.x) * (e.x - d.x) + (b.y - a.y) * (e.y - d.y));
                    break;
                }

                case 'EQUAL_LENGTH_EDGES': {
                    const a = p[c.edgeA];
                    const b = p[(c.edgeA + 1) % n];
                    const d = p[c.edgeB];
                    const e = p[(c.edgeB + 1) % n];
                    const lenA = Math.hypot(b.x - a.x, b.y - a.y);
                    const lenB = Math.hypot(e.x - d.x, e.y - d.y);
                    r.push(lenA - lenB);
                    break;
                }

                case 'RECTANGLE':
                    // Decomposed by ConstraintGraphBuilder
                    break;
            }
        }

        return r;
    }

    /**
     * Evaluate analytical Jacobian matrix J(p) of dimensions (m x 2N)
     * where J[row][2*k] = dR_row / dx_k and J[row][2*k + 1] = dR_row / dy_k
     */
    static evaluateJacobian(p: readonly Point[], g: ConstraintGraph): number[][] {
        const n = p.length;
        const totalVars = n * 2;
        const J: number[][] = [];

        for (const node of g.nodes) {
            const c = node.constraint;
            switch (c.type) {
                case 'FIXED_POINT': {
                    // Row for R_x = x_i - target.x
                    const rowX = new Array(totalVars).fill(0);
                    rowX[c.vertexIndex * 2] = 1.0;
                    J.push(rowX);

                    // Row for R_y = y_i - target.y
                    const rowY = new Array(totalVars).fill(0);
                    rowY[c.vertexIndex * 2 + 1] = 1.0;
                    J.push(rowY);
                    break;
                }

                case 'EDGE_LENGTH': {
                    const idxA = c.edgeIndex;
                    const idxB = (c.edgeIndex + 1) % n;
                    const a = p[idxA];
                    const b = p[idxB];
                    const dx = b.x - a.x;
                    const dy = b.y - a.y;
                    const len = Math.max(Math.hypot(dx, dy), this.EPSILON);

                    const row = new Array(totalVars).fill(0);
                    row[idxA * 2] += -dx / len;
                    row[idxA * 2 + 1] += -dy / len;
                    row[idxB * 2] += dx / len;
                    row[idxB * 2 + 1] += dy / len;
                    J.push(row);
                    break;
                }

                case 'HORIZONTAL_EDGE': {
                    const idxA = c.edgeIndex;
                    const idxB = (c.edgeIndex + 1) % n;
                    const row = new Array(totalVars).fill(0);
                    row[idxA * 2 + 1] += -1.0;
                    row[idxB * 2 + 1] += 1.0;
                    J.push(row);
                    break;
                }

                case 'VERTICAL_EDGE': {
                    const idxA = c.edgeIndex;
                    const idxB = (c.edgeIndex + 1) % n;
                    const row = new Array(totalVars).fill(0);
                    row[idxA * 2] += -1.0;
                    row[idxB * 2] += 1.0;
                    J.push(row);
                    break;
                }

                case 'PARALLEL_EDGES': {
                    const idxA = c.edgeA;
                    const idxB = (c.edgeA + 1) % n;
                    const idxD = c.edgeB;
                    const idxE = (c.edgeB + 1) % n;

                    const a = p[idxA];
                    const b = p[idxB];
                    const d = p[idxD];
                    const e = p[idxE];

                    const vAx = b.x - a.x;
                    const vAy = b.y - a.y;
                    const vBx = e.x - d.x;
                    const vBy = e.y - d.y;

                    const row = new Array(totalVars).fill(0);
                    row[idxA * 2] += -vBy;
                    row[idxA * 2 + 1] += vBx;
                    row[idxB * 2] += vBy;
                    row[idxB * 2 + 1] += -vBx;

                    row[idxD * 2] += vAy;
                    row[idxD * 2 + 1] += -vAx;
                    row[idxE * 2] += -vAy;
                    row[idxE * 2 + 1] += vAx;

                    J.push(row);
                    break;
                }

                case 'PERPENDICULAR_EDGES': {
                    const idxA = c.edgeA;
                    const idxB = (c.edgeA + 1) % n;
                    const idxD = c.edgeB;
                    const idxE = (c.edgeB + 1) % n;

                    const a = p[idxA];
                    const b = p[idxB];
                    const d = p[idxD];
                    const e = p[idxE];

                    const vAx = b.x - a.x;
                    const vAy = b.y - a.y;
                    const vBx = e.x - d.x;
                    const vBy = e.y - d.y;

                    const row = new Array(totalVars).fill(0);
                    row[idxA * 2] += -vBx;
                    row[idxA * 2 + 1] += -vBy;
                    row[idxB * 2] += vBx;
                    row[idxB * 2 + 1] += vBy;

                    row[idxD * 2] += -vAx;
                    row[idxD * 2 + 1] += -vAy;
                    row[idxE * 2] += vAx;
                    row[idxE * 2 + 1] += vAy;

                    J.push(row);
                    break;
                }

                case 'EQUAL_LENGTH_EDGES': {
                    const idxA = c.edgeA;
                    const idxB = (c.edgeA + 1) % n;
                    const idxD = c.edgeB;
                    const idxE = (c.edgeB + 1) % n;

                    const a = p[idxA];
                    const b = p[idxB];
                    const d = p[idxD];
                    const e = p[idxE];

                    const vAx = b.x - a.x;
                    const vAy = b.y - a.y;
                    const lenA = Math.max(Math.hypot(vAx, vAy), this.EPSILON);

                    const vBx = e.x - d.x;
                    const vBy = e.y - d.y;
                    const lenB = Math.max(Math.hypot(vBx, vBy), this.EPSILON);

                    const row = new Array(totalVars).fill(0);
                    row[idxA * 2] += -vAx / lenA;
                    row[idxA * 2 + 1] += -vAy / lenA;
                    row[idxB * 2] += vAx / lenA;
                    row[idxB * 2 + 1] += vAy / lenA;

                    row[idxD * 2] += vBx / lenB;
                    row[idxD * 2 + 1] += vBy / lenB;
                    row[idxE * 2] += -vBx / lenB;
                    row[idxE * 2 + 1] += -vBy / lenB;

                    J.push(row);
                    break;
                }

                case 'RECTANGLE':
                    break;
            }
        }

        return J;
    }

    /**
     * Compute Infinity-norm (max absolute value) of residual vector
     */
    static maxAbs(r: readonly number[]): number {
        return r.reduce((m, v) => Math.max(m, Math.abs(v)), 0);
    }
}
