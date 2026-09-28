// ============================================================
// Damped Nonlinear Least Squares (Levenberg-Marquardt) Solver
// Tác giả: Dịch Sư Nguyễn Huy Hoàng & Computational Geometry Core
// ============================================================

import { Point, RawPolygon } from '../math/geometry-types';
import {
    GeometricConstraint,
    ConstraintGraph,
    SolverResult
} from './constraint-types';
import { ConstraintGraphBuilder } from './constraint-graph-builder';
import { ResidualEvaluator } from './residual-evaluator';
import { MatrixMath } from './linear-algebra';
import { TopologyValidator } from '../math/topology-validator';
import { TopologyNormalizer } from '../math/topology-normalizer';

export interface SolverOptions {
    readonly maxIterations?: number;
    readonly tolerance?: number;
    readonly initialLambda?: number;
}

export class GeometricSolver {
    private static readonly DEFAULT_MAX_ITERATIONS = 100;
    private static readonly DEFAULT_TOLERANCE = 1e-6;
    private static readonly CONFLICT_RESIDUAL_THRESHOLD = 1e-4;

    /**
     * Solve geometric constraint system using Levenberg-Marquardt algorithm.
     * Guarantees zero drift for fixed vertices, validates topology, and outputs CanonicalPolygon.
     */
    static solve(
        initialPolygon: RawPolygon,
        constraints: readonly GeometricConstraint[],
        options: SolverOptions = {}
    ): SolverResult {
        const maxIters = options.maxIterations ?? this.DEFAULT_MAX_ITERATIONS;
        const tol = options.tolerance ?? this.DEFAULT_TOLERANCE;
        let lambda = options.initialLambda ?? 1e-3;
        let nu = 2.0;

        const n = initialPolygon.points.length;
        const graph: ConstraintGraph = ConstraintGraphBuilder.build(n, constraints);

        // 1. Identify fixed variables and pin initial positions
        const fixedVarIndices = new Set<number>();
        const workingPoints: Point[] = initialPolygon.points.map(p => ({ x: p.x, y: p.y }));

        for (const node of graph.nodes) {
            if (node.constraint.type === 'FIXED_POINT') {
                const vIdx = node.constraint.vertexIndex;
                fixedVarIndices.add(vIdx * 2);
                fixedVarIndices.add(vIdx * 2 + 1);
                // Pin directly to target coordinates
                workingPoints[vIdx] = { x: node.constraint.target.x, y: node.constraint.target.y };
            }
        }

        // 2. Initial Evaluation
        let residuals = ResidualEvaluator.evaluate(workingPoints, graph);
        let maxRes = ResidualEvaluator.maxAbs(residuals);
        let currentCost = 0.5 * residuals.reduce((sum, r) => sum + r * r, 0);

        let J = ResidualEvaluator.evaluateJacobian(workingPoints, graph);
        let iter = 0;

        // 3. Levenberg-Marquardt Iteration Loop
        while (iter < maxIters && maxRes > tol) {
            iter++;

            // Solve normal equation: (J^T J + lambda * I) * deltaX = -J^T * R
            const deltaX = MatrixMath.solveDampedSystem(J, residuals, lambda, fixedVarIndices);

            if (!deltaX) {
                // System singular: increase damping and continue
                lambda *= 4.0;
                continue;
            }

            // Compute candidate points with hard fixed point preservation
            const trialPoints: Point[] = [];
            for (let i = 0; i < n; i++) {
                if (fixedVarIndices.has(i * 2)) {
                    // Strictly pinned: zero drift
                    trialPoints.push({ x: workingPoints[i].x, y: workingPoints[i].y });
                } else {
                    trialPoints.push({
                        x: workingPoints[i].x + deltaX[i * 2],
                        y: workingPoints[i].y + deltaX[i * 2 + 1]
                    });
                }
            }

            const trialResiduals = ResidualEvaluator.evaluate(trialPoints, graph);
            const trialCost = 0.5 * trialResiduals.reduce((sum, r) => sum + r * r, 0);

            // Compute predicted linear reduction: deltaL = deltaX^T * (lambda * deltaX - J^T * R)
            let predictedReduction = 0;
            for (let i = 0; i < n * 2; i++) {
                let grad_i = 0;
                for (let k = 0; k < residuals.length; k++) {
                    grad_i += J[k][i] * residuals[k];
                }
                predictedReduction += deltaX[i] * (lambda * deltaX[i] + grad_i);
            }

            const actualReduction = currentCost - trialCost;
            const rho = predictedReduction > 0 ? actualReduction / predictedReduction : actualReduction > 0 ? 1 : -1;

            if (rho > 0) {
                // Step accepted
                for (let i = 0; i < n; i++) {
                    workingPoints[i] = trialPoints[i];
                }
                residuals = trialResiduals;
                currentCost = trialCost;
                maxRes = ResidualEvaluator.maxAbs(residuals);

                // Update Jacobian at new position
                J = ResidualEvaluator.evaluateJacobian(workingPoints, graph);

                // Adjust damping factor
                lambda = lambda * Math.max(1 / 3, 1 - Math.pow(2 * rho - 1, 3));
                nu = 2.0;

                // Check gradient norm for early stopping
                if (maxRes <= tol) {
                    break;
                }
            } else {
                // Step rejected: increase damping and try again
                lambda = lambda * nu;
                nu = 2.0 * nu;
            }
        }

        // 4. Final SVD Rank Analysis
        const finalJ = ResidualEvaluator.evaluateJacobian(workingPoints, graph);
        const numericalRank = MatrixMath.matrixRank(finalJ);
        const dofSummary = ConstraintGraphBuilder.analyzeDoF(graph, numericalRank);

        // 5. Conflict Detection
        if (maxRes > this.CONFLICT_RESIDUAL_THRESHOLD) {
            return Object.freeze({
                status: 'OVER_CONSTRAINED_CONFLICT',
                maxResidual: maxRes,
                dofSummary
            });
        }

        // 6. Pipeline: Solver -> Candidate -> TopologyValidator -> TopologyNormalizer -> CanonicalPolygon
        const candidate: RawPolygon = initialPolygon.holes !== undefined
            ? { points: workingPoints, holes: initialPolygon.holes }
            : { points: workingPoints };

        try {
            // TopologyValidator acts as the Judge
            TopologyValidator.validate(candidate);

            // TopologyNormalizer acts as the Canonicalizer
            const canonicalPolygon = TopologyNormalizer.normalize(candidate);

            return Object.freeze({
                status: 'SOLVED',
                polygon: canonicalPolygon,
                iterations: iter,
                maxResidual: maxRes,
                dofSummary
            });
        } catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : String(err);
            return Object.freeze({
                status: 'TOPOLOGY_INVALID',
                error: errorMessage,
                dofSummary
            });
        }
    }
}
