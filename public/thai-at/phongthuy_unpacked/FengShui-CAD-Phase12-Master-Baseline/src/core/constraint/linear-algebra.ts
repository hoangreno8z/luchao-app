// ============================================================
// Robust Linear Algebra & Rank-Revealing SVD
// Tác giả: Dịch Sư Nguyễn Huy Hoàng & Computational Geometry Core
// ============================================================

export interface SvdResult {
    readonly U: number[][];
    readonly s: number[];
    readonly V: number[][];
}

export class MatrixMath {
    static readonly EPSILON = 1e-12;

    /**
     * Compute Singular Value Decomposition (SVD) of matrix A (m x n) using One-Sided Jacobi / Golub-Reinsch approach:
     * A = U * diag(s) * V^T
     * Returns singular values s sorted in descending order along with U and V matrices.
     */
    static svd(A: number[][]): SvdResult {
        if (!A.length || !A[0].length) {
            return { U: [], s: [], V: [] };
        }

        const m = A.length;
        const n = A[0].length;

        // Clone matrix into working array
        const U: number[][] = Array.from({ length: m }, (_, i) => [...A[i]]);
        const V: number[][] = Array.from({ length: n }, (_, i) => 
            Array.from({ length: n }, (_, j) => (i === j ? 1 : 0))
        );

        const maxSweeps = 60;
        const tol = 1e-14;

        // One-sided Hestenes / Jacobi rotations on columns of U
        for (let sweep = 0; sweep < maxSweeps; sweep++) {
            let maxErr = 0;

            for (let i = 0; i < n - 1; i++) {
                for (let j = i + 1; j < n; j++) {
                    let alpha = 0;
                    let beta = 0;
                    let gamma = 0;

                    for (let k = 0; k < m; k++) {
                        alpha += U[k][i] * U[k][i];
                        beta += U[k][j] * U[k][j];
                        gamma += U[k][i] * U[k][j];
                    }

                    maxErr = Math.max(maxErr, Math.abs(gamma) / Math.sqrt(Math.max(alpha * beta, 1e-30)));

                    if (Math.abs(gamma) <= tol * Math.sqrt(alpha * beta)) {
                        continue;
                    }

                    const zeta = (beta - alpha) / (2 * gamma);
                    const t = Math.sign(zeta) / (Math.abs(zeta) + Math.sqrt(1 + zeta * zeta));
                    const c = 1 / Math.sqrt(1 + t * t);
                    const s = c * t;

                    // Rotate columns of U
                    for (let k = 0; k < m; k++) {
                        const u_ik = U[k][i];
                        const u_jk = U[k][j];
                        U[k][i] = c * u_ik - s * u_jk;
                        U[k][j] = s * u_ik + c * u_jk;
                    }

                    // Rotate columns of V
                    for (let k = 0; k < n; k++) {
                        const v_ik = V[k][i];
                        const v_jk = V[k][j];
                        V[k][i] = c * v_ik - s * v_jk;
                        V[k][j] = s * v_ik + c * v_jk;
                    }
                }
            }

            if (maxErr <= tol) {
                break;
            }
        }

        // Extract singular values as 2-norm of columns of U
        const singularValues: number[] = new Array(n).fill(0);
        for (let j = 0; j < n; j++) {
            let colNormSq = 0;
            for (let i = 0; i < m; i++) {
                colNormSq += U[i][j] * U[i][j];
            }
            const sigma = Math.sqrt(colNormSq);
            singularValues[j] = sigma;

            if (sigma > this.EPSILON) {
                for (let i = 0; i < m; i++) {
                    U[i][j] /= sigma;
                }
            } else {
                for (let i = 0; i < m; i++) {
                    U[i][j] = 0;
                }
            }
        }

        // Sort singular values in descending order
        const indices = Array.from({ length: n }, (_, i) => i);
        indices.sort((a, b) => singularValues[b] - singularValues[a]);

        const sortedS = indices.map(i => singularValues[i]);
        const sortedU = Array.from({ length: m }, (_, r) => indices.map(c => U[r][c]));
        const sortedV = Array.from({ length: n }, (_, r) => indices.map(c => V[r][c]));

        return { U: sortedU, s: sortedS, V: sortedV };
    }

    /**
     * Compute Numerical Rank of matrix from its singular values:
     * rank = number of singular values > tol * max(s)
     */
    static numericalRankFromSingularValues(s: readonly number[], tol = 1e-8): number {
        if (!s.length) return 0;
        const maxS = Math.max(...s, 0);
        if (maxS <= this.EPSILON) return 0;
        const threshold = Math.max(tol * maxS, 1e-10);
        return s.filter(val => val > threshold).length;
    }

    /**
     * Calculate Numerical Rank directly from Jacobian matrix J (m x n) via SVD
     */
    static matrixRank(A: number[][], tol = 1e-8): number {
        if (!A.length || !A[0].length) return 0;
        const { s } = this.svd(A);
        return this.numericalRankFromSingularValues(s, tol);
    }

    /**
     * Solve Damped Normal Equation System:
     * (J^T J + lambda * I) * deltaX = -J^T * R
     * Handles fixed parameter indices directly so fixed variables have deltaX = 0 identically.
     */
    static solveDampedSystem(
        J: number[][],
        R: number[],
        lambda: number,
        fixedVariableIndices: ReadonlySet<number> = new Set()
    ): number[] | null {
        if (!J.length || !J[0].length) return null;

        const m = J.length;
        const n = J[0].length;

        // Compute A = J^T * J + lambda * I
        const A: number[][] = Array.from({ length: n }, () => new Array(n).fill(0));
        const b: number[] = new Array(n).fill(0);

        for (let i = 0; i < n; i++) {
            for (let j = 0; j <= i; j++) {
                let sum = 0;
                for (let k = 0; k < m; k++) {
                    sum += J[k][i] * J[k][j];
                }
                A[i][j] = sum;
                A[j][i] = sum;
            }
            A[i][i] += lambda;
        }

        // Compute b = -J^T * R
        for (let i = 0; i < n; i++) {
            let sum = 0;
            for (let k = 0; k < m; k++) {
                sum += J[k][i] * R[k];
            }
            b[i] = -sum;
        }

        // Apply Hard Constraints on Fixed Variables:
        // Set row and column in A to 0, diagonal to 1, and RHS b to 0
        for (const idx of fixedVariableIndices) {
            if (idx >= 0 && idx < n) {
                for (let j = 0; j < n; j++) {
                    A[idx][j] = 0;
                    A[j][idx] = 0;
                }
                A[idx][idx] = 1.0;
                b[idx] = 0.0;
            }
        }

        return this.gaussianEliminationWithFullPivoting(A, b);
    }

    /**
     * Gaussian Elimination with Full (Complete) Pivoting for numerical stability
     */
    private static gaussianEliminationWithFullPivoting(A: number[][], b: number[]): number[] | null {
        const n = b.length;
        const M: number[][] = A.map(row => [...row]);
        const rhs = [...b];
        const colOrder: number[] = Array.from({ length: n }, (_, i) => i);

        for (let k = 0; k < n; k++) {
            // Find pivot with largest absolute value in submatrix M[k..n-1][k..n-1]
            let maxVal = 0;
            let pivotRow = k;
            let pivotCol = k;

            for (let i = k; i < n; i++) {
                for (let j = k; j < n; j++) {
                    const absVal = Math.abs(M[i][j]);
                    if (absVal > maxVal) {
                        maxVal = absVal;
                        pivotRow = i;
                        pivotCol = j;
                    }
                }
            }

            if (maxVal < this.EPSILON) {
                // Singular matrix: fall back to pseudo-inverse regularized solution
                return null;
            }

            // Swap rows
            if (pivotRow !== k) {
                [M[k], M[pivotRow]] = [M[pivotRow], M[k]];
                [rhs[k], rhs[pivotRow]] = [rhs[pivotRow], rhs[k]];
            }

            // Swap columns
            if (pivotCol !== k) {
                for (let i = 0; i < n; i++) {
                    const temp = M[i][k];
                    M[i][k] = M[i][pivotCol];
                    M[i][pivotCol] = temp;
                }
                const tempCol = colOrder[k];
                colOrder[k] = colOrder[pivotCol];
                colOrder[pivotCol] = tempCol;
            }

            // Elimination
            const pivot = M[k][k];
            for (let i = k + 1; i < n; i++) {
                const factor = M[i][k] / pivot;
                M[i][k] = 0;
                for (let j = k + 1; j < n; j++) {
                    M[i][j] -= factor * M[k][j];
                }
                rhs[i] -= factor * rhs[k];
            }
        }

        // Back substitution
        const xTemp = new Array(n).fill(0);
        for (let i = n - 1; i >= 0; i--) {
            let sum = rhs[i];
            for (let j = i + 1; j < n; j++) {
                sum -= M[i][j] * xTemp[j];
            }
            xTemp[i] = sum / M[i][i];
        }

        // Reorder variables back to original column permutation
        const x = new Array(n).fill(0);
        for (let i = 0; i < n; i++) {
            x[colOrder[i]] = xTemp[i];
        }

        return x;
    }
}
