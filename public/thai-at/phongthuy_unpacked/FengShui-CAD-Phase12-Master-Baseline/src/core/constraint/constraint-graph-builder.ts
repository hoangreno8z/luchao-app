// ============================================================
// Constraint Graph Builder & DoF Analyzer
// Tác giả: Dịch Sư Nguyễn Huy Hoàng & Computational Geometry Core
// ============================================================

import {
    ConstraintGraph,
    ConstraintNode,
    GeometricConstraint,
    VariableId,
    DegreesOfFreedomSummary
} from './constraint-types';

export class ConstraintGraphBuilder {
    static build(vertexCount: number, constraints: readonly GeometricConstraint[]): ConstraintGraph {
        const nodes: ConstraintNode[] = [];
        let idCounter = 0;
        const n = vertexCount;

        for (const c of constraints) {
            if (c.type === 'RECTANGLE') {
                const oppA = (c.edgeA + 2) % n;
                const oppB = (c.edgeB + 2) % n;

                // 1. Góc vuông liền kề
                nodes.push(this.createNode(`c_${idCounter++}`, { type: 'PERPENDICULAR_EDGES', edgeA: c.edgeA, edgeB: c.edgeB }, n, 1));
                // 2. Hai cặp cạnh đối song song
                nodes.push(this.createNode(`c_${idCounter++}`, { type: 'PARALLEL_EDGES', edgeA: c.edgeA, edgeB: oppA }, n, 1));
                nodes.push(this.createNode(`c_${idCounter++}`, { type: 'PARALLEL_EDGES', edgeA: c.edgeB, edgeB: oppB }, n, 1));
                // 3. Hai cặp cạnh đối bằng nhau
                nodes.push(this.createNode(`c_${idCounter++}`, { type: 'EQUAL_LENGTH_EDGES', edgeA: c.edgeA, edgeB: oppA }, n, 1));
                nodes.push(this.createNode(`c_${idCounter++}`, { type: 'EQUAL_LENGTH_EDGES', edgeA: c.edgeB, edgeB: oppB }, n, 1));
            } else {
                const eqCount = c.type === 'FIXED_POINT' ? 2 : 1;
                nodes.push(this.createNode(`c_${idCounter++}`, c, n, eqCount));
            }
        }

        return Object.freeze({
            vertexCount: n,
            nodes: Object.freeze(nodes)
        });
    }

    static analyzeDoF(graph: ConstraintGraph, numericalRank = 0): DegreesOfFreedomSummary {
        const totalVariables = graph.vertexCount * 2;
        const totalEquations = graph.nodes.reduce((sum, node) => sum + node.equationsCount, 0);
        const estimatedDoF = Math.max(0, totalVariables - numericalRank);

        return Object.freeze({
            totalVariables,
            totalEquations,
            numericalRank,
            estimatedDoF
        });
    }

    private static createNode(
        id: string,
        constraint: GeometricConstraint,
        n: number,
        equationsCount: number
    ): ConstraintNode {
        const affected: VariableId[] = [];

        const addVertex = (vIdx: number) => {
            affected.push({ kind: 'VERTEX_X', vertexIndex: vIdx });
            affected.push({ kind: 'VERTEX_Y', vertexIndex: vIdx });
        };

        const addEdge = (eIdx: number) => {
            addVertex(eIdx);
            addVertex((eIdx + 1) % n);
        };

        switch (constraint.type) {
            case 'FIXED_POINT':
                addVertex(constraint.vertexIndex);
                break;
            case 'EDGE_LENGTH':
            case 'HORIZONTAL_EDGE':
            case 'VERTICAL_EDGE':
                addEdge(constraint.edgeIndex);
                break;
            case 'PARALLEL_EDGES':
            case 'PERPENDICULAR_EDGES':
            case 'EQUAL_LENGTH_EDGES':
                addEdge(constraint.edgeA);
                addEdge(constraint.edgeB);
                break;
            case 'RECTANGLE':
                addEdge(constraint.edgeA);
                addEdge(constraint.edgeB);
                break;
        }

        const map = new Map<string, VariableId>();
        for (const v of affected) {
            map.set(`${v.kind}:${v.vertexIndex}`, v);
        }

        return Object.freeze({
            id,
            constraint,
            affectedVariables: Object.freeze([...map.values()]),
            equationsCount
        });
    }
}
