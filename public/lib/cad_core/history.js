// ============================================================
// CAD Core History & Undo/Redo Manager v8.0
// Quản lý Stack trạng thái snapshot để hỗ trợ Undo (Ctrl+Z) & Redo (Ctrl+Y)
// ============================================================

export class HistoryManager {
    constructor(maxSteps = 50) {
        this.maxSteps = maxSteps;
        this.undoStack = [];
        this.redoStack = [];
        this.currentState = null;
    }

    /**
     * Khởi tạo trạng thái ban đầu
     */
    init(initialState) {
        this.undoStack = [];
        this.redoStack = [];
        this.currentState = this._clone(initialState);
    }

    /**
     * Ghi nhận một thao tác mới vào lịch sử
     */
    pushState(newState, label = '') {
        if (!newState) return;
        if (this.currentState) {
            this.undoStack.push({
                state: this._clone(this.currentState),
                label: label || 'Action',
                timestamp: Date.now()
            });

            if (this.undoStack.length > this.maxSteps) {
                this.undoStack.shift();
            }
        }
        this.currentState = this._clone(newState);
        this.redoStack = []; // Xóa redo stack khi có action mới
    }

    /**
     * Hoàn tác (Undo)
     */
    undo() {
        if (!this.canUndo()) return null;
        const previous = this.undoStack.pop();
        this.redoStack.push({
            state: this._clone(this.currentState),
            timestamp: Date.now()
        });
        this.currentState = this._clone(previous.state);
        return this.currentState;
    }

    /**
     * Làm lại (Redo)
     */
    redo() {
        if (!this.canRedo()) return null;
        const next = this.redoStack.pop();
        this.undoStack.push({
            state: this._clone(this.currentState),
            timestamp: Date.now()
        });
        this.currentState = this._clone(next.state);
        return this.currentState;
    }

    canUndo() {
        return this.undoStack.length > 0;
    }

    canRedo() {
        return this.redoStack.length > 0;
    }

    getCurrentState() {
        return this.currentState ? this._clone(this.currentState) : null;
    }

    clear() {
        this.undoStack = [];
        this.redoStack = [];
        this.currentState = null;
    }

    _clone(obj) {
        if (typeof structuredClone === 'function') {
            try {
                return structuredClone(obj);
            } catch (_) {}
        }
        return JSON.parse(JSON.stringify(obj));
    }
}
