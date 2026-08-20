// ============================================================
// CAD Core AI-Native API Bridge & Command Bus v8.0
// Cung cấp giao diện lập trình hướng AI và Command Pattern theo triết lý CodeCAD
// ============================================================

import { HouseModel } from './model.js';
import { snapPointToGrid, snapAngle } from './snapping.js';

export class CadCommandBus {
    constructor(model, history) {
        this.model = model || new HouseModel();
        this.history = history;
        if (this.history) {
            this.history.init(this.model.toJSON());
        }
    }

    /**
     * Thực thi một lệnh có cấu trúc (Structured Command Execution)
     */
    dispatch(action) {
        if (!action || !action.type) return false;

        switch (action.type) {
            case 'ADD_ROOM': {
                const r = this.model.addRoom(action.payload);
                this._record(`Thêm phòng: ${r.name}`);
                return r;
            }
            case 'UPDATE_ROOM': {
                const r = this.model.updateRoom(action.payload.id, action.payload);
                this._record(`Cập nhật phòng: ${r?.name || action.payload.id}`);
                return r;
            }
            case 'REMOVE_ROOM': {
                const r = this.model.removeRoom(action.payload.id);
                this._record(`Xóa phòng: ${r?.name || action.payload.id}`);
                return r;
            }
            case 'ADD_OPENING': {
                const op = this.model.addOpening(action.payload);
                this._record(`Thêm cửa: ${op.name}`);
                return op;
            }
            case 'ADD_STAIR': {
                const st = this.model.addStair(action.payload);
                this._record(`Thêm cầu thang: ${st.name}`);
                return st;
            }
            case 'SET_FOOTPRINT': {
                this.model.setFootprintPoints(action.payload.points);
                this._record('Đổi hình dáng thửa đất');
                return true;
            }
            case 'UPDATE_VERTEX': {
                const ok = this.model.updateFootprintVertex(action.payload.index, action.payload.x, action.payload.y);
                this._record('Kéo đỉnh thửa đất');
                return ok;
            }
            default:
                console.warn('Unknown CAD Action:', action.type);
                return false;
        }
    }

    _record(label) {
        if (this.history) {
            this.history.pushState(this.model.toJSON(), label);
        }
    }

    undo() {
        if (!this.history || !this.history.canUndo()) return null;
        const prevJson = this.history.undo();
        if (prevJson) {
            this.model = HouseModel.fromJSON(prevJson);
            return this.model;
        }
        return null;
    }

    redo() {
        if (!this.history || !this.history.canRedo()) return null;
        const nextJson = this.history.redo();
        if (nextJson) {
            this.model = HouseModel.fromJSON(nextJson);
            return this.model;
        }
        return null;
    }
}
