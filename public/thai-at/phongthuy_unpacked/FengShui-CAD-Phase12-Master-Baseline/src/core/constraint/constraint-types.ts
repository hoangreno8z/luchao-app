import { Point, CanonicalPolygon } from '../math/geometry-types';

export type VertexIndex = number;
export type EdgeIndex = number;

export type VariableId = {
    readonly kind: 'VERTEX_X' | 'VERTEX_Y';
    readonly vertexIndex: VertexIndex;
};

export type GeometricConstraint =
    | { readonly type: 'FIXED_POINT'; readonly vertexIndex: VertexIndex; readonly target: Point }
    | { readonly type: 'EDGE_LENGTH'; readonly edgeIndex: EdgeIndex; readonly targetLength: number }
    | { readonly type: 'PARALLEL_EDGES' | 'PERPENDICULAR_EDGES'; readonly edgeA: EdgeIndex; readonly edgeB: EdgeIndex }
    | { readonly type: 'EQUAL_LENGTH_EDGES'; readonly edgeA: EdgeIndex; readonly edgeB: EdgeIndex }
    | { readonly type: 'HORIZONTAL_EDGE' | 'VERTICAL_EDGE'; readonly edgeIndex: EdgeIndex }
    | { readonly type: 'RECTANGLE'; readonly edgeA: EdgeIndex; readonly edgeB: EdgeIndex };

export interface ConstraintNode {
    readonly id: string;
    readonly constraint: GeometricConstraint;
    readonly affectedVariables: readonly VariableId[];
    readonly equationsCount: number;
}

export interface ConstraintGraph {
    readonly vertexCount: number;
    readonly nodes: readonly ConstraintNode[];
}

export interface DegreesOfFreedomSummary {
    readonly totalVariables: number;
    readonly totalEquations: number;
    readonly numericalRank: number;
    readonly estimatedDoF: number;
}

export type SolverResult =
    | {
          readonly status: 'SOLVED';
          readonly polygon: CanonicalPolygon;
          readonly iterations: number;
          readonly maxResidual: number;
          readonly dofSummary: DegreesOfFreedomSummary;
      }
    | {
          readonly status: 'OVER_CONSTRAINED_CONFLICT';
          readonly maxResidual: number;
          readonly dofSummary: DegreesOfFreedomSummary;
      }
    | {
          readonly status: 'TOPOLOGY_INVALID';
          readonly error: string;
          readonly dofSummary: DegreesOfFreedomSummary;
      };
