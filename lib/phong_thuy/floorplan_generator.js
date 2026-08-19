// ============================================================
// Architectural CAD Floorplan Generator Engine (Server-Side)
// Tác giả: Dịch Sư Nguyễn Huy Hoàng
// ============================================================

import { checkLoBan } from './lo_ban_helper.js';

export const PALACE_NAMES = {
    1: 'Khảm (Bắc)',
    2: 'Khôn (Tây Nam)',
    3: 'Chấn (Đông)',
    4: 'Tốn (Đông Nam)',
    5: 'Trung Cung',
    6: 'Càn (Tây Bắc)',
    7: 'Đoài (Tây)',
    8: 'Cấn (Đông Bắc)',
    9: 'Ly (Nam)'
};

export const PALACE_GRID_POS = {
    4: { r: 0, c: 0, name: 'Đông Nam (Tốn)' },
    9: { r: 0, c: 1, name: 'Nam (Ly)' },
    2: { r: 0, c: 2, name: 'Tây Nam (Khôn)' },
    3: { r: 1, c: 0, name: 'Đông (Chấn)' },
    5: { r: 1, c: 1, name: 'Trung Cung' },
    7: { r: 1, c: 2, name: 'Tây (Đoài)' },
    8: { r: 2, c: 0, name: 'Đông Bắc (Cấn)' },
    1: { r: 2, c: 1, name: 'Bắc (Khảm)' },
    6: { r: 2, c: 2, name: 'Tây Bắc (Càn)' }
};

export function generateArchitecturalPlan({
    mode = 'empty_land',
    widthM = 5.0,
    lengthM = 16.0,
    floors = 2,
    facingDegree = 180,
    flyingStarsData = null,
    batTrachData = null,
    existingRoomsMap = {},
    roomCounts = {}
}) {
    const W = Math.max(3.0, Math.min(30.0, parseFloat(widthM) || 5.0));
    const L = Math.max(5.0, Math.min(60.0, parseFloat(lengthM) || 16.0));
    const totalFloors = (mode === 'existing_house') ? 1 : Math.max(1, Math.min(7, parseInt(floors) || 2));

    const plansByFloor = [];

    for (let f = 1; f <= totalFloors; f++) {
        let floorName = 'Tầng Trệt';
        if (f > 1 && f < totalFloors) {
            floorName = `Lầu ${f - 1} (Tầng ${f})`;
        } else if (f === totalFloors && totalFloors > 1) {
            floorName = `Tầng Thượng (Lầu ${f - 1})`;
        }

        if (mode === 'existing_house') {
            floorName = 'Hiện Trạng Bố Trí Nhà';
        }

        const floorPlan = generateSingleFloor({
            floorIndex: f,
            totalFloors,
            floorName,
            W,
            L,
            facingDegree,
            flyingStarsData,
            batTrachData,
            mode,
            existingRoomsMap,
            roomCounts
        });

        plansByFloor.push(floorPlan);
    }

    return {
        widthM: W,
        lengthM: L,
        totalFloors,
        totalAreaM2: Math.round(W * L * totalFloors * 10) / 10,
        plansByFloor
    };
}

function generateSingleFloor({
    floorIndex,
    totalFloors,
    floorName,
    W,
    L,
    facingDegree,
    flyingStarsData,
    batTrachData,
    mode,
    existingRoomsMap = {},
    roomCounts = {}
}) {
    const walls = [];
    const doors = [];
    const windows = [];
    const furniture = [];
    const rooms = [];
    const dimensions = [];

    const outerT = 0.22;
    const innerT = 0.11;

    walls.push({ x1: 0, y1: 0, x2: W, y2: 0, thickness: outerT, type: 'outer' });
    walls.push({ x1: 0, y1: L, x2: W, y2: L, thickness: outerT, type: 'outer' });
    walls.push({ x1: 0, y1: 0, x2: 0, y2: L, thickness: outerT, type: 'outer' });
    walls.push({ x1: W, y1: 0, x2: W, y2: L, thickness: outerT, type: 'outer' });

    const cellW = W / 3;
    const cellH = L / 3;

    if (mode === 'existing_house') {
        walls.push({ x1: cellW, y1: 0, x2: cellW, y2: L, thickness: innerT, type: 'partition' });
        walls.push({ x1: cellW * 2, y1: 0, x2: cellW * 2, y2: L, thickness: innerT, type: 'partition' });
        walls.push({ x1: 0, y1: cellH, x2: W, y2: cellH, thickness: innerT, type: 'partition' });
        walls.push({ x1: 0, y1: cellH * 2, x2: W, y2: cellH * 2, thickness: innerT, type: 'partition' });

        const getPalaceCoord = (palaceId) => {
            const pId = parseInt(palaceId, 10);
            const pos = PALACE_GRID_POS[pId];
            if (!pos) return null;
            return { x: pos.c * cellW, y: pos.r * cellH, w: cellW, h: cellH, palaceName: pos.name };
        };

        if (existingRoomsMap.main_door && existingRoomsMap.main_door !== 'none') {
            const coord = getPalaceCoord(existingRoomsMap.main_door);
            if (coord) {
                const dw = Math.min(2.4, coord.w * 0.7);
                const doorY = (coord.y === 0) ? 0 : ((coord.y >= cellH * 2) ? L : coord.y);
                doors.push({ x: coord.x + (coord.w - dw) / 2, y: doorY, w: dw, h: outerT, type: 'main_door', label: `Cửa Chính (${PALACE_NAMES[existingRoomsMap.main_door]})`, isGood: true });
            }
        }

        if (existingRoomsMap.living_room && existingRoomsMap.living_room !== 'none') {
            const coord = getPalaceCoord(existingRoomsMap.living_room);
            if (coord) {
                rooms.push({ name: 'Phòng Khách', areaM2: Math.round(coord.w * coord.h * 10) / 10, x: coord.x, y: coord.y, w: coord.w, h: coord.h, zone: coord.palaceName });
                furniture.push({ type: 'sofa', x: coord.x + 0.3, y: coord.y + 0.4, w: coord.w - 0.6, h: Math.min(1.2, coord.h * 0.4), label: 'Sofa Khách' });
            }
        }

        if (existingRoomsMap.altar && existingRoomsMap.altar !== 'none') {
            const coord = getPalaceCoord(existingRoomsMap.altar);
            if (coord) {
                rooms.push({ name: 'Bàn Thờ', areaM2: Math.round(coord.w * coord.h * 10) / 10, x: coord.x, y: coord.y, w: coord.w, h: coord.h, zone: coord.palaceName });
                furniture.push({ type: 'altar_table', x: coord.x + (coord.w - 1.5) / 2, y: coord.y + 0.3, w: 1.5, h: 0.7, label: 'Bàn Thờ', isGood: true });
            }
        }

        if (existingRoomsMap.kitchen && existingRoomsMap.kitchen !== 'none') {
            const coord = getPalaceCoord(existingRoomsMap.kitchen);
            if (coord) {
                rooms.push({ name: 'Bếp Nấu & Ăn', areaM2: Math.round(coord.w * coord.h * 10) / 10, x: coord.x, y: coord.y, w: coord.w, h: coord.h, zone: coord.palaceName });
                furniture.push({ type: 'kitchen_counter', x: coord.x + 0.3, y: coord.y + coord.h - 0.7, w: coord.w - 0.6, h: 0.6, label: 'Bếp Nấu' });
                furniture.push({ type: 'dining_table', x: coord.x + (coord.w - 1.4) / 2, y: coord.y + 0.5, w: 1.4, h: 0.8, label: 'Bàn Ăn' });
            }
        }

        if (existingRoomsMap.master_bed && existingRoomsMap.master_bed !== 'none') {
            const coord = getPalaceCoord(existingRoomsMap.master_bed);
            if (coord) {
                rooms.push({ name: 'Phòng Ngủ Master', areaM2: Math.round(coord.w * coord.h * 10) / 10, x: coord.x, y: coord.y, w: coord.w, h: coord.h, zone: coord.palaceName });
                furniture.push({ type: 'bed_master', x: coord.x + (coord.w - 1.8) / 2, y: coord.y + 0.5, w: 1.8, h: 2.0, label: 'Giường Master' });
            }
        }

        if (existingRoomsMap.bed_2 && existingRoomsMap.bed_2 !== 'none') {
            const coord = getPalaceCoord(existingRoomsMap.bed_2);
            if (coord) {
                rooms.push({ name: 'Phòng Ngủ 2', areaM2: Math.round(coord.w * coord.h * 10) / 10, x: coord.x, y: coord.y, w: coord.w, h: coord.h, zone: coord.palaceName });
                furniture.push({ type: 'bed_single', x: coord.x + (coord.w - 1.4) / 2, y: coord.y + 0.5, w: 1.4, h: 2.0, label: 'Giường Ngủ 2' });
            }
        }

        if (existingRoomsMap.toilet_1 && existingRoomsMap.toilet_1 !== 'none') {
            const coord = getPalaceCoord(existingRoomsMap.toilet_1);
            if (coord) {
                rooms.push({ name: 'WC 1', areaM2: Math.round(coord.w * coord.h * 10) / 10, x: coord.x, y: coord.y, w: coord.w, h: coord.h, zone: coord.palaceName });
                furniture.push({ type: 'toilet_bowl', x: coord.x + coord.w - 0.7, y: coord.y + 0.4, w: 0.5, h: 0.7, label: 'Bồn Cầu' });
                furniture.push({ type: 'lavabo', x: coord.x + 0.4, y: coord.y + 0.4, w: 0.5, h: 0.5, label: 'Lavabo' });
            }
        }

        if (existingRoomsMap.stairs && existingRoomsMap.stairs !== 'none') {
            const coord = getPalaceCoord(existingRoomsMap.stairs);
            if (coord) {
                furniture.push({ type: 'stairs', x: coord.x + 0.3, y: coord.y + 0.3, w: coord.w - 0.6, h: coord.h - 0.6, steps: 21, label: 'Cầu Thang' });
            }
        }

    } else {
        const hasAltar = roomCounts.hasAltar !== false;
        const hasSkylight = roomCounts.hasSkylight !== false;

        if (floorIndex === 1) {
            const livingL = Math.max(4.0, L * 0.36);
            const stairL = Math.max(2.4, Math.min(3.2, L * 0.22));
            const kitchenL = L - livingL - stairL;

            const y1 = livingL;
            const y2 = y1 + stairL;

            walls.push({ x1: 0, y1: y1, x2: W * 0.65, y2: y1, thickness: innerT, type: 'partition' });
            walls.push({ x1: 0, y1: y2, x2: W, y2: y2, thickness: innerT, type: 'partition' });

            rooms.push({ name: 'Phòng Khách', areaM2: Math.round(W * livingL * 10) / 10, x: 0, y: 0, w: W, h: livingL, zone: 'Tiền Minh Đường' });
            const dw = W >= 5.0 ? 2.8 : 2.2;
            const loban = checkLoBan(dw * 1000, '522');
            doors.push({ x: (W - dw) / 2, y: 0, w: dw, h: outerT, type: 'main_door', label: `Cửa Chính (${dw}m - Cung ${loban.cung})`, isGood: loban.isGood });
            furniture.push({ type: 'sofa', x: 0.5, y: 0.8, w: Math.min(2.6, W * 0.5), h: 0.9, label: 'Sofa' });

            furniture.push({ type: 'stairs', x: 0.3, y: y1 + 0.3, w: Math.min(2.4, W * 0.45), h: stairL - 0.6, steps: 21, label: 'Cầu Thang' });
            if (hasSkylight) {
                furniture.push({ type: 'skylight', x: W - 1.8, y: y1 + 0.4, w: 1.5, h: stairL - 0.8, label: 'Giếng Trời' });
            }

            const wcW = Math.min(1.8, W * 0.38);
            const wcL = Math.min(2.0, kitchenL * 0.45);
            walls.push({ x1: W - wcW, y1: y2, x2: W - wcW, y2: y2 + wcL, thickness: innerT, type: 'partition' });
            walls.push({ x1: W - wcW, y1: y2 + wcL, x2: W, y2: y2 + wcL, thickness: innerT, type: 'partition' });
            rooms.push({ name: 'WC Trệt', areaM2: Math.round(wcW * wcL * 10) / 10, x: W - wcW, y: y2, w: wcW, h: wcL, zone: 'Khu Phụ' });
            furniture.push({ type: 'toilet_bowl', x: W - 0.7, y: y2 + 0.4, w: 0.5, h: 0.7, label: 'Bồn Cầu' });
            furniture.push({ type: 'lavabo', x: W - 1.5, y: y2 + 0.4, w: 0.5, h: 0.5, label: 'Lavabo' });

            rooms.push({ name: 'Bếp & Phòng Ăn', areaM2: Math.round((W * kitchenL - wcW * wcL) * 10) / 10, x: 0, y: y2, w: W - wcW, h: kitchenL, zone: 'Hậu Trạch' });
            furniture.push({ type: 'kitchen_counter', x: 0.4, y: L - 0.7, w: Math.min(3.2, W * 0.55), h: 0.6, label: 'Bếp Nấu' });
            furniture.push({ type: 'dining_table', x: 1.0, y: y2 + 1.0, w: 1.5, h: 0.8, label: 'Bàn Ăn 6 Ghế' });

        } else if (floorIndex < totalFloors || totalFloors === 1) {
            const masterL = Math.max(4.0, L * 0.38);
            const stairL = Math.max(2.4, Math.min(3.2, L * 0.22));
            const secondL = L - masterL - stairL;

            const y1 = masterL;
            const y2 = y1 + stairL;

            walls.push({ x1: 0, y1: y1, x2: W, y2: y1, thickness: innerT, type: 'partition' });
            walls.push({ x1: 0, y1: y2, x2: W, y2: y2, thickness: innerT, type: 'partition' });

            rooms.push({ name: `Phòng Ngủ Master (T${floorIndex})`, areaM2: Math.round(W * masterL * 10) / 10, x: 0, y: 0, w: W, h: masterL, zone: 'Cung Vượng Đinh' });
            furniture.push({ type: 'bed_master', x: 0.8, y: 1.0, w: 1.8, h: 2.0, label: 'Giường Master' });
            doors.push({ x: W / 2 - 0.6, y: 0, w: 1.2, h: outerT, type: 'balcony_door', label: 'Cửa Ban Công' });

            furniture.push({ type: 'stairs', x: 0.3, y: y1 + 0.3, w: Math.min(2.4, W * 0.45), h: stairL - 0.6, label: 'Cầu Thang' });
            const wcW = Math.min(2.0, W * 0.4);
            walls.push({ x1: W - wcW, y1: y1, x2: W - wcW, y2: y2, thickness: innerT, type: 'partition' });
            rooms.push({ name: `WC Tầng ${floorIndex}`, areaM2: Math.round(wcW * stairL * 10) / 10, x: W - wcW, y: y1, w: wcW, h: stairL, zone: 'Khép Kín' });
            furniture.push({ type: 'toilet_bowl', x: W - 0.7, y: y1 + 1.4, w: 0.5, h: 0.7, label: 'Bồn Cầu' });
            furniture.push({ type: 'lavabo', x: W - 1.6, y: y1 + 1.4, w: 0.5, h: 0.5, label: 'Lavabo' });

            rooms.push({ name: `Phòng Ngủ 2 (T${floorIndex})`, areaM2: Math.round(W * secondL * 10) / 10, x: 0, y: y2, w: W, h: secondL, zone: 'Cung Văn Xương' });
            furniture.push({ type: 'bed_single', x: 0.8, y: y2 + 0.8, w: 1.4, h: 2.0, label: 'Giường Đơn' });
            windows.push({ x: W / 2 - 0.7, y: L, w: 1.4, h: outerT, label: 'Cửa Sổ Lấy Sáng' });

        } else {
            const altarL = Math.max(3.5, L * 0.35);
            const stairL = Math.max(2.4, Math.min(3.2, L * 0.25));
            const terraceL = L - altarL - stairL;

            const y1 = altarL;
            const y2 = y1 + stairL;

            walls.push({ x1: 0, y1: y1, x2: W, y2: y1, thickness: innerT, type: 'partition' });

            if (hasAltar) {
                rooms.push({ name: 'Phòng Thờ Gia Tiên', areaM2: Math.round(W * altarL * 10) / 10, x: 0, y: 0, w: W, h: altarL, zone: 'Tôn Nghiêm Tối Thượng' });
                const lobanAltar = checkLoBan(1530, '388');
                furniture.push({ type: 'altar_table', x: (W - 1.53) / 2, y: 0.4, w: 1.53, h: 0.8, label: `Bàn Thờ (${lobanAltar.cung})`, isGood: true });
            }

            furniture.push({ type: 'stairs', x: 0.3, y: y1 + 0.3, w: Math.min(2.4, W * 0.45), h: stairL - 0.6, label: 'Cầu Thang' });

            rooms.push({ name: 'Sân Phơi & Giặt Phía Sau', areaM2: Math.round(W * terraceL * 10) / 10, x: 0, y: y2, w: W, h: terraceL, zone: 'Sân Hậu' });
            furniture.push({ type: 'washing_machine', x: W - 1.0, y: y2 + 0.5, w: 0.7, h: 0.7, label: 'Máy Giặt' });
        }
    }

    dimensions.push({ x1: 0, y1: 0, x2: W, y2: 0, text: `Ngang ${W}m`, loban: checkLoBan(W * 1000, '429') });
    dimensions.push({ x1: W, y1: 0, x2: W, y2: L, text: `Dài ${L}m`, loban: checkLoBan(L * 1000, '429') });

    return {
        floorIndex,
        floorName,
        walls,
        doors,
        windows,
        furniture,
        rooms,
        dimensions
    };
}
