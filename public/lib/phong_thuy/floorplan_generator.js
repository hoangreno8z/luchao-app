// ============================================================
// Architectural CAD Floorplan Generator Engine (Server-Side)
// Chuẩn Bản Vẽ Kiến Trúc Thực Tế & Phong Thủy Huyền Không Phi Tinh Vận 9
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
        let floorName = 'Mặt Bằng Tầng Trệt';
        if (f > 1 && f < totalFloors) {
            floorName = `Mặt Bằng Lầu ${f - 1} (Tầng ${f})`;
        } else if (f === totalFloors && totalFloors > 1) {
            floorName = `Mặt Bằng Tầng Thượng (Lầu ${f - 1})`;
        }

        if (mode === 'existing_house') {
            floorName = 'Mặt Bằng Hiện Trạng Nhà';
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
    const columns = [];
    const axesX = [];
    const axesY = [];
    const dimensions = [];
    let entrancePorch = null;

    const outerT = 0.22; // Tường bao 220mm
    const innerT = 0.11; // Tường ngăn 110mm
    const colSize = 0.22; // Cột bê tông 220x220mm

    // --- TƯỜNG BAO NGOẠI THẤT ---
    walls.push({ x1: 0, y1: 0, x2: W, y2: 0, thickness: outerT, type: 'outer' });
    walls.push({ x1: 0, y1: L, x2: W, y2: L, thickness: outerT, type: 'outer' });
    walls.push({ x1: 0, y1: 0, x2: 0, y2: L, thickness: outerT, type: 'outer' });
    walls.push({ x1: W, y1: 0, x2: W, y2: L, thickness: outerT, type: 'outer' });

    const cellW = W / 3;
    const cellH = L / 3;

    if (mode === 'existing_house') {
        // --- CHẾ ĐỘ NHÀ SẴN CÓ: LƯỚI 9 CUNG KIẾN TRÚC ---
        walls.push({ x1: cellW, y1: 0, x2: cellW, y2: L, thickness: innerT, type: 'partition' });
        walls.push({ x1: cellW * 2, y1: 0, x2: cellW * 2, y2: L, thickness: innerT, type: 'partition' });
        walls.push({ x1: 0, y1: cellH, x2: W, y2: cellH, thickness: innerT, type: 'partition' });
        walls.push({ x1: 0, y1: cellH * 2, x2: W, y2: cellH * 2, thickness: innerT, type: 'partition' });

        // Cột kết cấu tại 16 nút giao
        for (let r = 0; r <= 3; r++) {
            const py = r === 0 ? 0 : (r === 1 ? cellH : (r === 2 ? cellH * 2 : L));
            for (let c = 0; c <= 3; c++) {
                const px = c === 0 ? 0 : (c === 1 ? cellW : (c === 2 ? cellW * 2 : W));
                columns.push({ x: px, y: py, size: colSize });
            }
        }

        // Trục định vị
        axesX.push({ label: '1', x: 0 }, { label: '2', x: cellW }, { label: '3', x: cellW * 2 }, { label: '4', x: W });
        axesY.push({ label: 'A', y: 0 }, { label: 'B', y: cellH }, { label: 'C', y: cellH * 2 }, { label: 'D', y: L });

        // Bậc tam cấp sảnh chính
        entrancePorch = { x: cellW * 0.5, y: -1.2, w: cellW * 2, h: 1.2, steps: 3 };

        const getPalaceCoord = (palaceId) => {
            const pId = parseInt(palaceId, 10);
            const pos = PALACE_GRID_POS[pId];
            if (!pos) return null;
            return { x: pos.c * cellW, y: pos.r * cellH, w: cellW, h: cellH, palaceName: pos.name, palaceId: pId };
        };

        if (existingRoomsMap.main_door && existingRoomsMap.main_door !== 'none') {
            const coord = getPalaceCoord(existingRoomsMap.main_door);
            if (coord) {
                const dw = Math.min(2.8, coord.w * 0.75);
                const doorY = (coord.y === 0) ? 0 : ((coord.y >= cellH * 2) ? L : coord.y);
                doors.push({ x: coord.x + (coord.w - dw) / 2, y: doorY, w: dw, h: outerT, type: 'main_door', swing: 'double', label: `Cửa Chính (${PALACE_NAMES[existingRoomsMap.main_door]})`, isGood: true });
            }
        }

        if (existingRoomsMap.living_room && existingRoomsMap.living_room !== 'none') {
            const coord = getPalaceCoord(existingRoomsMap.living_room);
            if (coord) {
                rooms.push({ name: 'P. KHÁCH', areaM2: Math.round(coord.w * coord.h * 10) / 10, x: coord.x, y: coord.y, w: coord.w, h: coord.h, zone: coord.palaceName });
                furniture.push({ type: 'sofa_living', x: coord.x + 0.3, y: coord.y + 0.4, w: coord.w - 0.6, h: Math.min(1.6, coord.h * 0.45), label: 'Sofa Khách' });
            }
        }

        if (existingRoomsMap.altar && existingRoomsMap.altar !== 'none') {
            const coord = getPalaceCoord(existingRoomsMap.altar);
            if (coord) {
                rooms.push({ name: 'P. THỜ', areaM2: Math.round(coord.w * coord.h * 10) / 10, x: coord.x, y: coord.y, w: coord.w, h: coord.h, zone: coord.palaceName });
                furniture.push({ type: 'altar_set', x: coord.x + (coord.w - 1.6) / 2, y: coord.y + 0.3, w: 1.6, h: 0.8, label: 'Bàn Thờ', isGood: true });
            }
        }

        if (existingRoomsMap.kitchen && existingRoomsMap.kitchen !== 'none') {
            const coord = getPalaceCoord(existingRoomsMap.kitchen);
            if (coord) {
                rooms.push({ name: 'BẾP & ĂN', areaM2: Math.round(coord.w * coord.h * 10) / 10, x: coord.x, y: coord.y, w: coord.w, h: coord.h, zone: coord.palaceName });
                furniture.push({ type: 'kitchen_set', x: coord.x + 0.3, y: coord.y + coord.h - 0.7, w: coord.w - 0.6, h: 0.6, label: 'Tủ Bếp' });
                furniture.push({ type: 'dining_set', x: coord.x + (coord.w - 1.5) / 2, y: coord.y + 0.5, w: 1.5, h: 0.9, label: 'Bàn Ăn 6 Ghế' });
            }
        }

        if (existingRoomsMap.master_bed && existingRoomsMap.master_bed !== 'none') {
            const coord = getPalaceCoord(existingRoomsMap.master_bed);
            if (coord) {
                rooms.push({ name: 'P. NGỦ 1 (MASTER)', areaM2: Math.round(coord.w * coord.h * 10) / 10, x: coord.x, y: coord.y, w: coord.w, h: coord.h, zone: coord.palaceName });
                furniture.push({ type: 'bed_master', x: coord.x + (coord.w - 2.0) / 2, y: coord.y + 0.5, w: 2.0, h: 2.1, label: 'Giường Master' });
            }
        }

        if (existingRoomsMap.bed_2 && existingRoomsMap.bed_2 !== 'none') {
            const coord = getPalaceCoord(existingRoomsMap.bed_2);
            if (coord) {
                rooms.push({ name: 'P. NGỦ 2', areaM2: Math.round(coord.w * coord.h * 10) / 10, x: coord.x, y: coord.y, w: coord.w, h: coord.h, zone: coord.palaceName });
                furniture.push({ type: 'bed_single', x: coord.x + (coord.w - 1.6) / 2, y: coord.y + 0.5, w: 1.6, h: 2.0, label: 'Giường Ngủ 2' });
            }
        }

        if (existingRoomsMap.bed_3 && existingRoomsMap.bed_3 !== 'none') {
            const coord = getPalaceCoord(existingRoomsMap.bed_3);
            if (coord) {
                rooms.push({ name: 'P. NGỦ 3', areaM2: Math.round(coord.w * coord.h * 10) / 10, x: coord.x, y: coord.y, w: coord.w, h: coord.h, zone: coord.palaceName });
                furniture.push({ type: 'bed_single', x: coord.x + (coord.w - 1.6) / 2, y: coord.y + 0.5, w: 1.6, h: 2.0, label: 'Giường Ngủ 3' });
            }
        }

        if (existingRoomsMap.toilet_1 && existingRoomsMap.toilet_1 !== 'none') {
            const coord = getPalaceCoord(existingRoomsMap.toilet_1);
            if (coord) {
                rooms.push({ name: 'WC 1', areaM2: Math.round(coord.w * coord.h * 10) / 10, x: coord.x, y: coord.y, w: coord.w, h: coord.h, zone: coord.palaceName });
                furniture.push({ type: 'toilet_set', x: coord.x + 0.3, y: coord.y + 0.3, w: coord.w - 0.6, h: coord.h - 0.6, label: 'Thiết Bị WC' });
            }
        }

        if (existingRoomsMap.toilet_2 && existingRoomsMap.toilet_2 !== 'none') {
            const coord = getPalaceCoord(existingRoomsMap.toilet_2);
            if (coord) {
                rooms.push({ name: 'WC 2', areaM2: Math.round(coord.w * coord.h * 10) / 10, x: coord.x, y: coord.y, w: coord.w, h: coord.h, zone: coord.palaceName });
                furniture.push({ type: 'toilet_set', x: coord.x + 0.3, y: coord.y + 0.3, w: coord.w - 0.6, h: coord.h - 0.6, label: 'Thiết Bị WC 2' });
            }
        }

        if (existingRoomsMap.stairs && existingRoomsMap.stairs !== 'none') {
            const coord = getPalaceCoord(existingRoomsMap.stairs);
            if (coord) {
                furniture.push({ type: 'stairs_flight', x: coord.x + 0.3, y: coord.y + 0.3, w: coord.w - 0.6, h: coord.h - 0.6, steps: 21, label: 'Cầu Thang 21 Bậc' });
            }
        }

        if (existingRoomsMap.work_room && existingRoomsMap.work_room !== 'none') {
            const coord = getPalaceCoord(existingRoomsMap.work_room);
            if (coord) {
                rooms.push({ name: 'P. LÀM VIỆC', areaM2: Math.round(coord.w * coord.h * 10) / 10, x: coord.x, y: coord.y, w: coord.w, h: coord.h, zone: coord.palaceName });
                furniture.push({ type: 'desk_study', x: coord.x + 0.4, y: coord.y + 0.4, w: coord.w - 0.8, h: 0.7, label: 'Bàn Làm Việc' });
            }
        }

    } else {
        // --- CHẾ ĐỘ ĐẤT TRỐNG: THIẾT KẾ MẶT BẰNG ĐA NĂNG CHUẨN KIẾN TRÚC ---
        const hasAltar = roomCounts.hasAltar === '1' || roomCounts.hasAltar === '2' || roomCounts.hasAltar === true || roomCounts.hasAltar === 1;
        const altarOnRoof = roomCounts.hasAltar !== '2';
        const hasSkylight = roomCounts.hasSkylight !== '0' && roomCounts.hasSkylight !== false;
        const hasGarage = roomCounts.hasGarage === '1' || roomCounts.hasGarage === '2';
        const hasCommonRoom = roomCounts.hasCommonRoom === '1' || roomCounts.hasCommonRoom === true;
        const hasLaundry = roomCounts.hasLaundry !== '0' && roomCounts.hasLaundry !== false;
        const stairsType = roomCounts.stairsType || 'middle';

        // Phân đoạn trục dọc theo chiều dài L
        let porchL = 1.2;
        let frontL = Math.max(4.2, Math.min(5.8, L * 0.32));
        let midL = Math.max(2.6, Math.min(3.4, L * 0.20));
        let backL = L - frontL - midL;

        const y1 = frontL;
        const y2 = frontL + midL;

        // Trục định vị kiến trúc
        axesX.push({ label: '1', x: 0 }, { label: '2', x: W * 0.5 }, { label: '3', x: W });
        axesY.push({ label: 'A', y: 0 }, { label: 'B', y: y1 }, { label: 'C', y: y2 }, { label: 'D', y: L });

        // Cột kết cấu tại các nút giao trục
        [0, y1, y2, L].forEach(py => {
            [0, W * 0.5, W].forEach(px => {
                columns.push({ x: px, y: py, size: colSize });
            });
        });

        // Bậc tam cấp sảnh chính (Tầng 1)
        if (floorIndex === 1) {
            entrancePorch = { x: (W - 2.8) / 2, y: -porchL, w: 2.8, h: porchL, steps: 3 };
        }

        if (floorIndex === 1) {
            // === TẦNG TRỆT: PHÒNG KHÁCH, BẾP & ĂN, CẦU THANG, WC, GARA ===
            walls.push({ x1: 0, y1: y1, x2: W, y2: y1, thickness: innerT, type: 'partition' });
            walls.push({ x1: 0, y1: y2, x2: W, y2: y2, thickness: innerT, type: 'partition' });

            // Cửa chính 4 cánh chuẩn Lỗ Ban
            const dw = Math.min(3.2, W * 0.65);
            const loban = checkLoBan(dw * 1000, '522');
            doors.push({ x: (W - dw) / 2, y: 0, w: dw, h: outerT, type: 'main_door', swing: 'double', label: `Cửa Chính (${dw.toFixed(1)}m - Cung ${loban.cung})`, isGood: loban.isGood });

            // 1. Phía trước: Gara hoặc Phòng Khách
            if (hasGarage && roomCounts.hasGarage === '1') {
                const garageW = W * 0.48;
                walls.push({ x1: garageW, y1: 0, x2: garageW, y2: y1, thickness: innerT, type: 'partition' });
                rooms.push({ name: 'GARA Ô TÔ', areaM2: Math.round(garageW * y1 * 10) / 10, x: 0, y: 0, w: garageW, h: y1, zone: 'Tiền Sảnh' });
                furniture.push({ type: 'garage_car', x: 0.4, y: 0.6, w: garageW - 0.8, h: y1 - 1.2, label: 'Đỗ Xe Ô Tô' });

                rooms.push({ name: 'P. KHÁCH', areaM2: Math.round((W - garageW) * y1 * 10) / 10, x: garageW, y: 0, w: W - garageW, h: y1, zone: 'Minh Đường' });
                furniture.push({ type: 'sofa_living', x: garageW + 0.4, y: 0.6, w: W - garageW - 0.8, h: Math.min(1.8, y1 * 0.5), label: 'Sofa Góc L' });
            } else {
                rooms.push({ name: 'P. KHÁCH', areaM2: Math.round(W * y1 * 10) / 10, x: 0, y: 0, w: W, h: y1, zone: 'Tiền Minh Đường' });
                furniture.push({ type: 'sofa_living', x: 0.6, y: 0.8, w: Math.min(3.4, W * 0.6), h: 1.8, label: 'Bộ Sofa Khách' });
                windows.push({ x: 0.3, y: 0, w: 1.4, h: outerT, type: 'sliding' });
                windows.push({ x: W - 1.7, y: 0, w: 1.4, h: outerT, type: 'sliding' });
            }

            // 2. Khu giữa: Cầu Thang + Giếng Trời + WC Trệt
            const stairW = Math.min(2.6, W * 0.48);
            furniture.push({ type: 'stairs_flight', x: 0.3, y: y1 + 0.3, w: stairW - 0.4, h: midL - 0.6, steps: 21, label: 'Cầu Thang 21 Bậc' });

            if (hasSkylight) {
                furniture.push({ type: 'skylight_vent', x: W - 1.8, y: y1 + 0.3, w: 1.5, h: midL - 0.6, label: 'Giếng Trời Hút Gió' });
            }

            // 3. Phía sau: Bếp & Phòng Ăn + WC Trệt
            const wcW = Math.min(2.0, W * 0.38);
            const wcL = Math.min(2.2, backL * 0.45);
            walls.push({ x1: W - wcW, y1: y2, x2: W - wcW, y2: y2 + wcL, thickness: innerT, type: 'partition' });
            walls.push({ x1: W - wcW, y1: y2 + wcL, x2: W, y2: y2 + wcL, thickness: innerT, type: 'partition' });
            doors.push({ x: W - wcW, y: y2 + 0.3, w: 0.8, h: innerT, type: 'toilet_door', swing: 'left', label: 'Cửa WC' });

            rooms.push({ name: 'WC TRỆT', areaM2: Math.round(wcW * wcL * 10) / 10, x: W - wcW, y: y2, w: wcW, h: wcL, zone: 'Cung Trấn Sát' });
            furniture.push({ type: 'toilet_set', x: W - wcW + 0.2, y: y2 + 0.2, w: wcW - 0.4, h: wcL - 0.4, label: 'Bồn Cầu & Lavabo' });

            const kitchenArea = Math.round((W * backL - wcW * wcL) * 10) / 10;
            rooms.push({ name: 'BẾP & PHÒNG ĂN', areaM2: kitchenArea, x: 0, y: y2, w: W - wcW, h: backL, zone: 'Hậu Trạch Tọa Hung Hướng Cát' });
            furniture.push({ type: 'kitchen_set', x: 0.4, y: L - 0.7, w: Math.min(3.6, W * 0.6), h: 0.6, label: 'Tủ Bếp Chữ L' });
            furniture.push({ type: 'dining_set', x: 0.8, y: y2 + 0.8, w: 1.6, h: 0.9, label: 'Bàn Ăn 6 Ghế' });
            doors.push({ x: W - 1.2, y: L, w: 0.9, h: outerT, type: 'room_door', swing: 'right', label: 'Cửa Sân Sau' });

        } else if (floorIndex < totalFloors || totalFloors === 1) {
            // === CÁC TẦNG LẦU: PHÒNG NGỦ MASTER, PHÒNG NGỦ PHỤ, WC, BAN CÔNG ===
            walls.push({ x1: 0, y1: y1, x2: W, y2: y1, thickness: innerT, type: 'partition' });
            walls.push({ x1: 0, y1: y2, x2: W, y2: y2, thickness: innerT, type: 'partition' });

            // Phòng Ngủ Master Phía Trước
            const wcMasterW = Math.min(1.8, W * 0.35);
            const wcMasterL = 2.0;
            walls.push({ x1: W - wcMasterW, y1: 0, x2: W - wcMasterW, y2: wcMasterL, thickness: innerT, type: 'partition' });
            walls.push({ x1: W - wcMasterW, y1: wcMasterL, x2: W, y2: wcMasterL, thickness: innerT, type: 'partition' });
            doors.push({ x: W - wcMasterW, y: 0.4, w: 0.8, h: innerT, type: 'toilet_door', swing: 'left', label: 'Cửa WC Master' });
            rooms.push({ name: 'WC MASTER', areaM2: Math.round(wcMasterW * wcMasterL * 10) / 10, x: W - wcMasterW, y: 0, w: wcMasterW, h: wcMasterL, zone: 'Khu Phụ' });
            furniture.push({ type: 'toilet_set', x: W - wcMasterW + 0.2, y: 0.2, w: wcMasterW - 0.4, h: wcMasterL - 0.4, label: 'WC Khép Kín' });

            rooms.push({ name: `P. NGỦ MASTER (T${floorIndex})`, areaM2: Math.round((W * y1 - wcMasterW * wcMasterL) * 10) / 10, x: 0, y: 0, w: W - wcMasterW, h: y1, zone: 'Cung Vượng Đinh' });
            furniture.push({ type: 'bed_master', x: 0.8, y: 0.8, w: 2.0, h: 2.1, label: 'Giường King Size' });
            doors.push({ x: 0.6, y: 0, w: 1.4, h: outerT, type: 'balcony_door', swing: 'double', label: 'Cửa Ra Ban Công' });

            // Khu Cầu Thang Giữa + Sinh Hoạt Chung
            furniture.push({ type: 'stairs_flight', x: 0.3, y: y1 + 0.3, w: Math.min(2.4, W * 0.45), h: midL - 0.6, steps: 21, label: 'Cầu Thang' });
            if (hasCommonRoom) {
                furniture.push({ type: 'desk_study', x: W - 2.0, y: y1 + 0.4, w: 1.6, h: midL - 0.8, label: 'Góc Làm Việc / SHC' });
            }

            // Phòng Ngủ 2 Phía Sau
            const wcFloorW = Math.min(1.8, W * 0.35);
            const wcFloorL = 2.0;
            walls.push({ x1: W - wcFloorW, y1: y2, x2: W - wcFloorW, y2: y2 + wcFloorL, thickness: innerT, type: 'partition' });
            walls.push({ x1: W - wcFloorW, y1: y2 + wcFloorL, x2: W, y2: y2 + wcFloorL, thickness: innerT, type: 'partition' });
            doors.push({ x: W - wcFloorW, y: y2 + 0.4, w: 0.8, h: innerT, type: 'toilet_door', swing: 'left', label: 'Cửa WC Tầng' });
            rooms.push({ name: `WC TẦNG ${floorIndex}`, areaM2: Math.round(wcFloorW * wcFloorL * 10) / 10, x: W - wcFloorW, y: y2, w: wcFloorW, h: wcFloorL, zone: 'Khu Phụ' });
            furniture.push({ type: 'toilet_set', x: W - wcFloorW + 0.2, y: y2 + 0.2, w: wcFloorW - 0.4, h: wcFloorL - 0.4, label: 'WC Lầu' });

            rooms.push({ name: `P. NGỦ ${floorIndex * 2} (T${floorIndex})`, areaM2: Math.round((W * backL - wcFloorW * wcFloorL) * 10) / 10, x: 0, y: y2, w: W - wcFloorW, h: backL, zone: 'Cung Văn Xương' });
            furniture.push({ type: 'bed_single', x: 0.8, y: y2 + 0.8, w: 1.6, h: 2.0, label: 'Giường Ngủ' });
            windows.push({ x: 0.8, y: L, w: 1.5, h: outerT, type: 'sliding' });

        } else {
            // === TẦNG THƯỢNG: PHÒNG THỜ GIA TIÊN, SÂN THƯỢNG MINH ĐƯỜNG, SÂN PHƠI & GIẶT ===
            walls.push({ x1: 0, y1: y1, x2: W, y2: y1, thickness: innerT, type: 'partition' });
            walls.push({ x1: 0, y1: y2, x2: W, y2: y2, thickness: innerT, type: 'partition' });

            if (hasAltar && altarOnRoof) {
                rooms.push({ name: 'P. THỜ GIA TIÊN', areaM2: Math.round(W * y1 * 10) / 10, x: 0, y: 0, w: W, h: y1, zone: 'Tôn Nghiêm Tối Thượng' });
                furniture.push({ type: 'altar_set', x: (W - 1.8) / 2, y: 0.5, w: 1.8, h: 0.9, label: 'Bàn Thờ Gia Tiên Chuẩn Lỗ Ban', isGood: true });
                doors.push({ x: (W - 1.4) / 2, y: y1, w: 1.4, h: innerT, type: 'room_door', swing: 'double', label: 'Cửa Phòng Thờ' });
            } else {
                rooms.push({ name: 'SÂN THƯỢNG PHÍA TRƯỚC', areaM2: Math.round(W * y1 * 10) / 10, x: 0, y: 0, w: W, h: y1, zone: 'Minh Đường Thượng' });
            }

            furniture.push({ type: 'stairs_flight', x: 0.3, y: y1 + 0.3, w: Math.min(2.4, W * 0.45), h: midL - 0.6, steps: 21, label: 'Cầu Thang Tầng Thượng' });

            if (hasLaundry) {
                rooms.push({ name: 'SÂN PHƠI & GIẶT', areaM2: Math.round(W * backL * 10) / 10, x: 0, y: y2, w: W, h: backL, zone: 'Hậu Cảnh Thoát Khí' });
                furniture.push({ type: 'laundry_set', x: 0.4, y: y2 + 0.5, w: 1.2, h: 0.8, label: 'Máy Giặt & Bồn Giặt' });
            }
        }
    }

    return {
        floorIndex,
        totalFloors,
        floorName,
        widthM: W,
        lengthM: L,
        walls,
        doors,
        windows,
        furniture,
        rooms,
        columns,
        axesX,
        axesY,
        dimensions,
        entrancePorch
    };
}
