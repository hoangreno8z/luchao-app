// ============================================================
// CAD Core HouseModel & Document Schema v8.0
// Cấu trúc dữ liệu đơn nhất (Single Source of Truth) cho bản vẽ mặt bằng CAD
// ============================================================

import { getBoundingBox, polygonArea, polygonCentroid, distance } from './geometry.js';

export class HouseModel {
    constructor(initData = {}) {
        this.id = initData.id || `house_${Date.now()}`;
        this.name = initData.name || 'Mặt Bằng Nhà Ở';
        this.version = '8.0';
        this.unit = 'mm';
        this.totalFloors = initData.totalFloors || 1;
        this.currentFloor = initData.currentFloor || 1;

        // Thửa đất / Ranh giới sàn nhà (Polygon)
        this.footprintPoints = initData.footprintPoints || [
            { x: 0, y: 0, name: 'A' },
            { x: 5000, y: 0, name: 'B' },
            { x: 5000, y: 16000, name: 'C' },
            { x: 0, y: 16000, name: 'D' }
        ];

        // Tường xây (Walls)
        this.walls = initData.walls || [];

        // Phòng chức năng (Rooms)
        this.rooms = initData.rooms || [];

        // Cửa đi & Cửa sổ (Openings)
        this.openings = initData.openings || [];

        // Cầu thang kiến trúc (Stairs)
        this.stairs = initData.stairs || [];

        // Nội thất & Vật thể rời (Furniture)
        this.furniture = initData.furniture || [];

        // Đường kích thước (Dimensions)
        this.dimensions = initData.dimensions || [];

        // Thông số Phong Thủy đi kèm
        this.metadata = initData.metadata || {
            shape: 'RECTANGLE',
            widthM: 5.0,
            lengthM: 16.0,
            facingDegree: 180,
            buildYear: 2025,
            ownerYear: 1990,
            ownerGender: 'nam'
        };
    }

    /**
     * Bounding box tổng thể của thửa đất / ngôi nhà
     */
    getBoundingBox() {
        return getBoundingBox(this.footprintPoints);
    }

    /**
     * Diện tích sàn tổng thể (m2)
     */
    getAreaM2() {
        return (polygonArea(this.footprintPoints) / 1000000).toFixed(2);
    }

    /**
     * Trọng tâm nhà (Tâm phân cung Phong Thủy)
     */
    getCenter() {
        return polygonCentroid(this.footprintPoints);
    }

    // ========================================================
    // QUẢN LÝ PHÒNG (ROOMS)
    // ========================================================
    addRoom(room) {
        const id = room.id || `room_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
        const newRoom = {
            id,
            name: room.name || 'Phòng Mới',
            type: room.type || 'living_room',
            x: Math.round(room.x || 0),
            y: Math.round(room.y || 0),
            w: Math.round(room.w || 3500),
            h: Math.round(room.h || 3500),
            rot: room.rot || 0,
            palaceId: room.palaceId || null,
            floor: room.floor || this.currentFloor
        };
        this.rooms.push(newRoom);
        return newRoom;
    }

    updateRoom(id, props) {
        const room = this.rooms.find(r => r.id === id);
        if (!room) return null;
        Object.assign(room, props);
        return room;
    }

    removeRoom(id) {
        const idx = this.rooms.findIndex(r => r.id === id);
        if (idx !== -1) {
            return this.rooms.splice(idx, 1)[0];
        }
        return null;
    }

    // ========================================================
    // QUẢN LÝ CỬA & CỬA SỔ (OPENINGS)
    // ========================================================
    addOpening(opening) {
        const id = opening.id || `op_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
        const newOpening = {
            id,
            type: opening.type || 'door', // 'door' | 'window'
            style: opening.style || 'swing_single', // 'swing_single' | 'swing_double' | 'sliding'
            name: opening.name || (opening.type === 'door' ? 'Cửa Đi' : 'Cửa Sổ'),
            x: Math.round(opening.x || 0),
            y: Math.round(opening.y || 0),
            w: Math.round(opening.w || 900),
            h: Math.round(opening.h || 200),
            rot: opening.rot || 0,
            wallId: opening.wallId || null
        };
        this.openings.push(newOpening);
        return newOpening;
    }

    updateOpening(id, props) {
        const op = this.openings.find(o => o.id === id);
        if (!op) return null;
        Object.assign(op, props);
        return op;
    }

    removeOpening(id) {
        const idx = this.openings.findIndex(o => o.id === id);
        if (idx !== -1) {
            return this.openings.splice(idx, 1)[0];
        }
        return null;
    }

    // ========================================================
    // QUẢN LÝ CẦU THANG (STAIRS)
    // ========================================================
    addStair(stair) {
        const id = stair.id || `stair_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
        const newStair = {
            id,
            type: stair.type || 'straight', // 'straight' | 'l_shaped' | 'u_shaped'
            name: stair.name || 'Cầu Thang',
            x: Math.round(stair.x || 0),
            y: Math.round(stair.y || 0),
            w: Math.round(stair.w || 1000),
            h: Math.round(stair.h || 3000),
            rot: stair.rot || 0,
            steps: stair.steps || 21,
            direction: stair.direction || 'up'
        };
        this.stairs.push(newStair);
        return newStair;
    }

    updateStair(id, props) {
        const st = this.stairs.find(s => s.id === id);
        if (!st) return null;
        Object.assign(st, props);
        return st;
    }

    removeStair(id) {
        const idx = this.stairs.findIndex(s => s.id === id);
        if (idx !== -1) {
            return this.stairs.splice(idx, 1)[0];
        }
        return null;
    }

    // ========================================================
    // QUẢN LÝ ĐỈNH THỬA ĐẤT (FOOTPRINT VERTICES)
    // ========================================================
    updateFootprintVertex(index, x, y) {
        if (index >= 0 && index < this.footprintPoints.length) {
            this.footprintPoints[index].x = Math.round(x);
            this.footprintPoints[index].y = Math.round(y);
            return true;
        }
        return false;
    }

    setFootprintPoints(points) {
        if (Array.isArray(points) && points.length >= 3) {
            this.footprintPoints = points.map((p, idx) => ({
                x: Math.round(p.x),
                y: Math.round(p.y),
                name: p.name || String.fromCharCode(65 + (idx % 26))
            }));
        }
    }

    // ========================================================
    // SERIALIZATION (JSON)
    // ========================================================
    toJSON() {
        return {
            id: this.id,
            name: this.name,
            version: this.version,
            unit: this.unit,
            totalFloors: this.totalFloors,
            currentFloor: this.currentFloor,
            footprintPoints: this.footprintPoints,
            walls: this.walls,
            rooms: this.rooms,
            openings: this.openings,
            stairs: this.stairs,
            furniture: this.furniture,
            dimensions: this.dimensions,
            metadata: this.metadata
        };
    }

    static fromJSON(json) {
        return new HouseModel(typeof json === 'string' ? JSON.parse(json) : json);
    }
}
