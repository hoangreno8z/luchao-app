// ============================================================
// Atomic Command Dispatcher & Undo/Redo State Manager
// Tác giả: Dịch Sư Nguyễn Huy Hoàng & Computational Geometry Core
// ============================================================

import { CanonicalPolygon } from '../math/geometry-types';
import { GeometricConstraint, SolverResult } from '../constraint/constraint-types';

export interface CadState {
    readonly polygon: CanonicalPolygon | null;
    readonly constraints: readonly GeometricConstraint[];
    readonly lastSolverResult: SolverResult | null;
}

export interface Command {
    readonly description: string;
    execute(currentState: CadState): CadState;
    undo(currentState: CadState): CadState;
}

export class CommandDispatcher {
    private currentState: CadState;
    private undoStack: Command[] = [];
    private redoStack: Command[] = [];
    private historyStates: CadState[] = [];
    private historyIndex = -1;

    constructor(initialState: Partial<CadState> = {}) {
        this.currentState = Object.freeze({
            polygon: initialState.polygon ?? null,
            constraints: Object.freeze([...(initialState.constraints ?? [])]),
            lastSolverResult: initialState.lastSolverResult ?? null
        });
        this.pushHistory(this.currentState);
    }

    getState(): CadState {
        return this.currentState;
    }

    canUndo(): boolean {
        return this.historyIndex > 0;
    }

    canRedo(): boolean {
        return this.historyIndex < this.historyStates.length - 1;
    }

    execute(command: Command): CadState {
        const nextState = command.execute(this.currentState);
        this.currentState = Object.freeze(nextState);

        // Truncate forward history if we execute a new command after undo
        this.historyStates = this.historyStates.slice(0, this.historyIndex + 1);
        this.pushHistory(this.currentState);

        this.undoStack.push(command);
        this.redoStack = [];

        return this.currentState;
    }

    undo(): CadState | null {
        if (!this.canUndo()) return null;
        this.historyIndex--;
        this.currentState = this.historyStates[this.historyIndex];
        const cmd = this.undoStack.pop();
        if (cmd) {
            this.redoStack.push(cmd);
        }
        return this.currentState;
    }

    redo(): CadState | null {
        if (!this.canRedo()) return null;
        this.historyIndex++;
        this.currentState = this.historyStates[this.historyIndex];
        const cmd = this.redoStack.pop();
        if (cmd) {
            this.undoStack.push(cmd);
        }
        return this.currentState;
    }

    private pushHistory(state: CadState): void {
        this.historyStates.push(state);
        this.historyIndex = this.historyStates.length - 1;
    }
}
