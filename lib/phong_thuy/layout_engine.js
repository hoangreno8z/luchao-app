// ============================================================
// Parametric Architectural Floorplan Layout Engine (Millimeter)
// Thiết Kế Bản Vẽ Kiến Trúc Tự Động Chuẩn CHATUY.VN / mauphongthuy.jpg
// Tác giả: Dịch Sư Nguyễn Huy Hoàng
// ============================================================

import { areaM2, centerOfRect, overlaps, inside } from './geometry.js';
import { checkLoBan } from './lo_ban_helper.js';

export const ROOM_NAMES = {
    living: 'P. KHÁCH',
    dining: 'P. ĂN',
    kitchen: 'BẾP & P. ĂN',
    bedroom_master: 'P. NGỦ MASTER',
    bedroom: 'P. NGỦ',
    wc: 'WC',
    wc_master: 'WC MASTER',
    altar: 'P. THỜ GIA TIÊN',
    stairs: 'CẦU THANG',
    garage: 'GARA Ô TÔ',
    office: 'P. LÀM VIỆC',
    common: 'SINH HOẠT CHUNG',
    laundry: 'SÂN PHƠI & GIẶT',
    skylight: 'GIẾNG TRỜI',
    yard: 'SÂN TRƯỚC'
};

/**
 * Sinh mặt bằng kiến trúc tham số hóa (Đơn vị Millimeter).
 * @param {Object} config
 * @returns {Object} HouseGeometry & Multi-floor collection
 */
export function generateParametricFloorplan(config) {
    const W = Math.max(3000, Math.min(30000, Math.round((parseFloat(config.widthM || config.widthMm / 1000) || 5.0) * 1000)));
    const D = Math.max(5000, Math.min(60000, Math.round((parseFloat(config.lengthM || config.depthMm / 1000) || 16.0) * 1000)));
    const totalFloors = config.mode === 'existing_house' ? 1 : Math.max(1, Math.min(7, parseInt(config.floors, 10) || 2));
    const northAngleDeg = parseFloat(config.northAngleDeg !== undefined ? config.northAngleDeg : (config.facingDegree || 0));

    const plansByFloor = [];

    for (let f = 1; f <= totalFloors; f++) {
        let floorName = 'Mặt Bằng Tầng Trệt';
        if (f > 1 && f < totalFloors) {
            floorName = `Mặt Bằng Lầu ${f - 1} (Tầng ${f})`;
        } else if (f === totalFloors && totalFloors > 1) {
            floorName = `Mặt Bằng Tầng Thượng (Lầu ${f - 1})`;
        }

        if (config.mode === 'existing_house') {
            floorName = 'Mặt Bằng Hiện Trạng Nhà';
        }

        const floorPlan = solveSingleFloorGeometry({
            floorIndex: f,
            totalFloors,
            floorName,
            widthMm: W,
            depthMm: D,
            northAngleDeg,
            config
        });

        plansByFloor.push(floorPlan);
    }

    const groundGeometry = plansByFloor[0];

    return {
        widthMm: W,
        depthMm: D,
        totalFloors,
        totalAreaM2: Math.round((W * D * totalFloors / 1000000) * 10) / 10,
        northAngleDeg,
        center: groundGeometry.center,
        plansByFloor,
        // Single Source of Truth reference for ground floor
        ...groundGeometry
    };
}

/**
 * Bộ giải hình học cho 1 tầng nhà.
 */
function solveSingleFloorGeometry({ floorIndex, totalFloors, floorName, widthMm, depthMm, northAngleDeg, config }) {
    const W = widthMm;
    const D = depthMm;
    const isWideHouse = W > D * 1.1; // Nhà ngang biệt thự vườn (như mẫu 14.5m x 9.9m trong ảnh 2)

    const walls = [];
    const doors = [];
    const windows = [];
    const furniture = [];
    const rooms = [];
    const columns = [];
    const axesX = [];
    const axesY = [];
    const dimensionChains = { horizontal: [], vertical: [] };
    let entrancePorch = null;

    const outerT = 220; // Tường bao 220mm
    const innerT = 110; // Tường ngăn 110mm
    const colSize = 220; // Cột bê tông 220x220mm

    // 1. TƯỜNG BAO NGOẠI THẤT
    walls.push(
        { id: 'w-out-top', x1: 0, y1: 0, x2: W, y2: 0, thickness: outerT, type: 'outer' },
        { id: 'w-out-bottom', x1: 0, y1: D, x2: W, y2: D, thickness: outerT, type: 'outer' },
        { id: 'w-out-left', x1: 0, y1: 0, x2: 0, y2: D, thickness: outerT, type: 'outer' },
        { id: 'w-out-right', x1: W, y1: 0, x2: W, y2: D, thickness: outerT, type: 'outer' }
    );

    const roomCounts = config.roomCounts || {};
    const hasAltar = roomCounts.hasAltar === '1' || roomCounts.hasAltar === '2' || roomCounts.hasAltar === true || roomCounts.hasAltar === 1;
    const altarOnGround = roomCounts.hasAltar === '2' || isWideHouse;
    const hasSkylight = roomCounts.hasSkylight !== '0' && roomCounts.hasSkylight !== false;
    const hasGarage = roomCounts.hasGarage === '1' || roomCounts.hasGarage === '2';
    const hasCommonRoom = roomCounts.hasCommonRoom === '1' || roomCounts.hasCommonRoom === true;
    const hasLaundry = roomCounts.hasLaundry !== '0' && roomCounts.hasLaundry !== false;

    if (isWideHouse) {
        // ============================================================
        // CASE A: NHÀ NGANG BIỆT THỰ VƯỜN (CHÍNH XÁC MẪU ẢNH 2 CHATUY.VN)
        // Ví dụ: 14500mm x 9900mm (Trục 1, 1', 2, 3, 3', 4 và A, B, B', C)
        // ============================================================
        const x1 = Math.round(W * 0.28); // ~4000mm (Phòng ngủ 1 & 2 bên trái)
        const x2 = Math.round(W * 0.35); // ~5070mm
        const x3 = Math.round(W * 0.65); // ~9270mm (Phòng thờ & Khách ở giữa)
        const x4 = Math.round(W * 0.72); // ~10500mm
        const x5 = W;                    // ~14500mm (Bếp & Phòng ngủ 3 & WC bên phải)

        const y1 = Math.round(D * 0.45); // ~4500mm (Gian trước: Khách, Ngủ 1, Bếp)
        const y2 = Math.round(D * 0.62); // ~6200mm (Gian giữa)
        const y3 = D;                    // ~9900mm (Gian sau: Ngủ 2, Thờ, Ngủ 3, WC)

        // Trục định vị kiến trúc
        axesX.push(
            { label: '1', x: 0 },
            { label: "1'", x: x1 },
            { label: '2', x: x2 },
            { label: '3', x: x3 },
            { label: "3'", x: x4 },
            { label: '4', x: W }
        );
        axesY.push(
            { label: 'A', y: 0 },
            { label: 'B', y: y1 },
            { label: "B'", y: y2 },
            { label: 'C', y: D }
        );

        // Cột kết cấu tại các giao điểm trục chính
        [0, x1, x3, W].forEach(px => {
            [0, y1, D].forEach(py => {
                columns.push({ x: px, y: py, size: colSize });
            });
        });

        // Bậc tam cấp sảnh đón lớn phía trước
        const porchW = Math.min(5200, W * 0.36);
        entrancePorch = {
            x: (W - porchW) / 2,
            y: -1400,
            width: porchW,
            height: 1400,
            steps: 4,
            pillars: [
                { x: (W - porchW) / 2 + 300, y: -1100, size: 350 },
                { x: (W + porchW) / 2 - 650, y: -1100, size: 350 }
            ]
        };

        // Phân chia tường ngăn
        walls.push(
            { id: 'w-h-1', x1: 0, y1: y1, x2: x1, y2: y1, thickness: innerT, type: 'partition' },
            { id: 'w-h-2', x1: x3, y1: y1, x2: W, y2: y1, thickness: innerT, type: 'partition' },
            { id: 'w-h-3', x1: 0, y1: y2, x2: W, y2: y2, thickness: innerT, type: 'partition' },
            { id: 'w-v-1', x1: x1, y1: 0, x2: x1, y2: D, thickness: innerT, type: 'partition' },
            { id: 'w-v-2', x1: x3, y1: 0, x2: x3, y2: D, thickness: innerT, type: 'partition' }
        );

        // Cửa chính 4 cánh chuẩn Lỗ Ban
        const mainDw = 3200;
        doors.push({
            id: 'd-main',
            x: (W - mainDw) / 2,
            y: 0,
            width: mainDw,
            rotation: 0,
            type: 'double',
            swing: 'double',
            label: 'Cửa Chính 4 Cánh'
        });

        // 1. Phòng Khách ở trung tâm
        const livingRect = { x: x1, y: 0, width: x3 - x1, height: y2 };
        rooms.push({
            id: 'room-living',
            type: 'living',
            name: 'P. KHÁCH',
            areaM2: areaM2(livingRect),
            ...livingRect,
            floor: floorIndex
        });
        furniture.push({
            id: 'fur-sofa',
            type: 'sofa_living',
            x: livingRect.x + 600,
            y: livingRect.y + 1200,
            width: Math.min(3600, livingRect.width - 1200),
            height: 2000,
            label: 'Bộ Sofa Khách'
        });

        // 2. Phòng Thờ trang trọng phía sau trung tâm
        const altarRect = { x: x1, y: y2, width: x3 - x1, height: D - y2 };
        rooms.push({
            id: 'room-altar',
            type: 'altar',
            name: 'P. THỜ',
            areaM2: areaM2(altarRect),
            ...altarRect,
            floor: floorIndex
        });
        furniture.push({
            id: 'fur-altar',
            type: 'altar_set',
            x: altarRect.x + (altarRect.width - 1800) / 2,
            y: D - 1100,
            width: 1800,
            height: 900,
            label: 'Bàn Thờ Gia Tiên'
        });

        // 3. Bếp & Phòng Ăn bên phải phía trước
        const kitchenRect = { x: x3, y: 0, width: W - x3, height: y2 };
        rooms.push({
            id: 'room-kitchen',
            type: 'kitchen',
            name: 'BẾP & P. ĂN',
            areaM2: areaM2(kitchenRect),
            ...kitchenRect,
            floor: floorIndex
        });
        furniture.push(
            { id: 'fur-dining', type: 'dining_set', x: kitchenRect.x + 600, y: kitchenRect.y + 1000, width: 1800, height: 1000, label: 'Bàn Ăn 6 Ghế' },
            { id: 'fur-kitchen', type: 'kitchen_set', x: W - 900, y: kitchenRect.y + 500, width: 700, height: Math.min(3200, kitchenRect.height - 1000), label: 'Tủ Bếp' }
        );

        // 4. Phòng Ngủ 1 (Master) góc trái trước
        const bed1Rect = { x: 0, y: 0, width: x1, height: y1 };
        rooms.push({
            id: 'room-bed-1',
            type: 'bedroom',
            name: 'P. NGỦ 1',
            areaM2: areaM2(bed1Rect),
            ...bed1Rect,
            floor: floorIndex
        });
        furniture.push({
            id: 'fur-bed-1',
            type: 'bed_master',
            x: 500,
            y: 700,
            width: 2000,
            height: 2100,
            label: 'Giường Master'
        });

        // 5. Phòng Ngủ 2 góc trái sau
        const bed2Rect = { x: 0, y: y2, width: x1, height: D - y2 };
        rooms.push({
            id: 'room-bed-2',
            type: 'bedroom',
            name: 'P. NGỦ 2',
            areaM2: areaM2(bed2Rect),
            ...bed2Rect,
            floor: floorIndex
        });
        furniture.push({
            id: 'fur-bed-2',
            type: 'bed_single',
            x: 500,
            y: y2 + 600,
            width: 1800,
            height: 2000,
            label: 'Giường Ngủ'
        });

        // 6. WC góc trái (giữa Ngủ 1 & Ngủ 2)
        const wc1Rect = { x: 0, y: y1, width: x1, height: y2 - y1 };
        rooms.push({
            id: 'room-wc-1',
            type: 'wc',
            name: 'WC 1',
            areaM2: areaM2(wc1Rect),
            ...wc1Rect,
            floor: floorIndex
        });
        furniture.push({
            id: 'fur-wc-1',
            type: 'toilet_set',
            x: 300,
            y: y1 + 200,
            width: wc1Rect.width - 600,
            height: wc1Rect.height - 400,
            label: 'WC'
        });

        // 7. Phòng Ngủ 3 góc phải sau
        const bed3Rect = { x: x3, y: y2, width: W - x3 - 1800, height: D - y2 };
        rooms.push({
            id: 'room-bed-3',
            type: 'bedroom',
            name: 'P. NGỦ 3',
            areaM2: areaM2(bed3Rect),
            ...bed3Rect,
            floor: floorIndex
        });
        furniture.push({
            id: 'fur-bed-3',
            type: 'bed_single',
            x: bed3Rect.x + 400,
            y: y2 + 600,
            width: 1800,
            height: 2000,
            label: 'Giường Ngủ'
        });

        // 8. WC 2 góc phải sau
        const wc2Rect = { x: W - 1800, y: y2, width: 1800, height: D - y2 };
        walls.push({ id: 'w-wc2', x1: W - 1800, y1: y2, x2: W - 1800, y2: D, thickness: innerT, type: 'partition' });
        rooms.push({
            id: 'room-wc-2',
            type: 'wc',
            name: 'WC 2',
            areaM2: areaM2(wc2Rect),
            ...wc2Rect,
            floor: floorIndex
        });
        furniture.push({
            id: 'fur-wc-2',
            type: 'toilet_set',
            x: wc2Rect.x + 200,
            y: y2 + 200,
            width: wc2Rect.width - 400,
            height: wc2Rect.height - 400,
            label: 'WC 2'
        });

        // Cửa phòng & Cửa sổ
        doors.push(
            { id: 'd-b1', x: x1, y: y1 - 900, width: 900, type: 'single', swing: 'left' },
            { id: 'd-b2', x: x1, y: y2 + 400, width: 900, type: 'single', swing: 'left' },
            { id: 'd-b3', x: x3, y: y2 + 400, width: 900, type: 'single', swing: 'right' },
            { id: 'd-wc1', x: x1, y: y1 + 300, width: 800, type: 'single', swing: 'left' },
            { id: 'd-wc2', x: W - 1800, y: y2 + 300, width: 800, type: 'single', swing: 'left' }
        );

        windows.push(
            { id: 'win-1', x: 800, y: 0, width: 1600, type: 'sliding' },
            { id: 'win-2', x: W - 2400, y: 0, width: 1600, type: 'sliding' },
            { id: 'win-3', x: 800, y: D, width: 1600, type: 'sliding' },
            { id: 'win-4', x: W - 1400, y: D, width: 1000, type: 'sliding' }
        );

        // 3 Lớp Kích Thước (Dimension Chains) Ngang & Dọc
        dimensionChains.horizontal.push(
            // Lớp 1: Chi tiết từng gian
            [
                { from: 0, to: x1, text: `${x1}` },
                { from: x1, to: x2, text: `${x2 - x1}` },
                { from: x2, to: x3, text: `${x3 - x2}` },
                { from: x3, to: x4, text: `${x4 - x3}` },
                { from: x4, to: W, text: `${W - x4}` }
            ],
            // Lớp 2: Khoảng cách tim trục chính
            [
                { from: 0, to: x1, text: `${x1}` },
                { from: x1, to: x3, text: `${x3 - x1}` },
                { from: x3, to: W, text: `${W - x3}` }
            ],
            // Lớp 3: Phủ bì tổng thể
            [
                { from: 0, to: W, text: `${W}` }
            ]
        );

        dimensionChains.vertical.push(
            // Lớp 1: Chi tiết
            [
                { from: 0, to: y1, text: `${y1}` },
                { from: y1, to: y2, text: `${y2 - y1}` },
                { from: y2, to: D, text: `${D - y2}` }
            ],
            // Lớp 2: Tổng thể
            [
                { from: 0, to: D, text: `${D}` }
            ]
        );

    } else {
        // ============================================================
        // CASE B: NHÀ PHỐ / NHÀ ỐNG HIỆN ĐẠI (TUBE HOUSE: 5x16m, 5x18m, 6x15m...)
        // ============================================================
        let frontD = Math.max(4200, Math.min(6200, Math.round(D * 0.34)));
        let midD = Math.max(2600, Math.min(3600, Math.round(D * 0.20)));
        let rearD = D - frontD - midD;

        const y1 = frontD;
        const y2 = frontD + midD;

        // Trục định vị
        axesX.push(
            { label: '1', x: 0 },
            { label: '2', x: Math.round(W * 0.5) },
            { label: '3', x: W }
        );
        axesY.push(
            { label: 'A', y: 0 },
            { label: 'B', y: y1 },
            { label: 'C', y: y2 },
            { label: 'D', y: D }
        );

        // Cột kết cấu
        [0, Math.round(W * 0.5), W].forEach(px => {
            [0, y1, y2, D].forEach(py => {
                columns.push({ x: px, y: py, size: colSize });
            });
        });

        // Bậc tam cấp sảnh chính (Tầng 1)
        if (floorIndex === 1) {
            const porchW = Math.min(3200, W * 0.65);
            entrancePorch = {
                x: (W - porchW) / 2,
                y: -1200,
                width: porchW,
                height: 1200,
                steps: 3
            };
        }

        if (floorIndex === 1) {
            // === TẦNG TRỆT: PHÒNG KHÁCH, BẾP & ĂN, CẦU THANG, WC, GARA ===
            walls.push(
                { id: 'w-p-1', x1: 0, y1: y1, x2: W, y2: y1, thickness: innerT, type: 'partition' },
                { id: 'w-p-2', x1: 0, y1: y2, x2: W, y2: y2, thickness: innerT, type: 'partition' }
            );

            // Cửa chính 4 cánh Lỗ Ban
            const mainDw = Math.min(3200, Math.round(W * 0.65));
            const loban = checkLoBan(mainDw, '522');
            doors.push({
                id: 'd-main',
                x: (W - mainDw) / 2,
                y: 0,
                width: mainDw,
                type: 'double',
                swing: 'double',
                label: `Cửa Chính (${mainDw}mm - Cung ${loban.cung})`
            });

            // 1. Phía trước: Gara hoặc Phòng Khách
            if (hasGarage && roomCounts.hasGarage === '1') {
                const garageW = Math.round(W * 0.48);
                walls.push({ id: 'w-garage', x1: garageW, y1: 0, x2: garageW, y2: y1, thickness: innerT, type: 'partition' });

                const garageRect = { x: 0, y: 0, width: garageW, height: y1 };
                rooms.push({ id: 'room-garage', type: 'garage', name: 'GARA Ô TÔ', areaM2: areaM2(garageRect), ...garageRect, floor: 1 });
                furniture.push({ id: 'fur-car', type: 'garage_car', x: 400, y: 600, width: garageW - 800, height: y1 - 1200, label: 'Đỗ Xe Ô Tô' });

                const livingRect = { x: garageW, y: 0, width: W - garageW, height: y1 };
                rooms.push({ id: 'room-living', type: 'living', name: 'P. KHÁCH', areaM2: areaM2(livingRect), ...livingRect, floor: 1 });
                furniture.push({ id: 'fur-sofa', type: 'sofa_living', x: garageW + 400, y: 600, width: W - garageW - 800, height: Math.min(1800, y1 * 0.5), label: 'Sofa L' });
            } else {
                const livingRect = { x: 0, y: 0, width: W, height: y1 };
                rooms.push({ id: 'room-living', type: 'living', name: 'P. KHÁCH', areaM2: areaM2(livingRect), ...livingRect, floor: 1 });
                furniture.push({ id: 'fur-sofa', type: 'sofa_living', x: 600, y: 800, width: Math.min(3600, W * 0.65), height: 1800, label: 'Bộ Sofa Khách' });
                windows.push(
                    { id: 'win-1', x: 300, y: 0, width: 1400, type: 'sliding' },
                    { id: 'win-2', x: W - 1700, y: 0, width: 1400, type: 'sliding' }
                );
            }

            // 2. Khu giữa: Cầu Thang + Giếng Trời
            const stairW = Math.min(2600, Math.round(W * 0.48));
            furniture.push({ id: 'fur-stairs', type: 'stairs_flight', x: 300, y: y1 + 300, width: stairW - 400, height: midD - 600, steps: 21, label: 'Cầu Thang 21 Bậc' });

            if (hasSkylight) {
                furniture.push({ id: 'fur-skylight', type: 'skylight_vent', x: W - 1800, y: y1 + 300, width: 1500, height: midD - 600, label: 'Giếng Trời' });
            }

            // 3. Phía sau: Bếp & Phòng Ăn + WC Trệt
            const wcW = Math.min(2000, Math.round(W * 0.38));
            const wcD = Math.min(2200, Math.round(rearD * 0.48));
            walls.push(
                { id: 'w-wc-v', x1: W - wcW, y1: y2, x2: W - wcW, y2: y2 + wcD, thickness: innerT, type: 'partition' },
                { id: 'w-wc-h', x1: W - wcW, y1: y2 + wcD, x2: W, y2: y2 + wcD, thickness: innerT, type: 'partition' }
            );
            doors.push({ id: 'd-wc', x: W - wcW, y: y2 + 300, width: 800, type: 'single', swing: 'left', label: 'Cửa WC' });

            const wcRect = { x: W - wcW, y: y2, width: wcW, height: wcD };
            rooms.push({ id: 'room-wc', type: 'wc', name: 'WC TRỆT', areaM2: areaM2(wcRect), ...wcRect, floor: 1 });
            furniture.push({ id: 'fur-wc', type: 'toilet_set', x: W - wcW + 200, y: y2 + 200, width: wcW - 400, height: wcD - 400, label: 'Bồn Cầu & Lavabo' });

            const kitchenRect = { x: 0, y: y2, width: W - wcW, height: rearD };
            rooms.push({ id: 'room-kitchen', type: 'kitchen', name: 'BẾP & P. ĂN', areaM2: Math.round((W * rearD - wcW * wcD) / 1000000 * 10) / 10, ...kitchenRect, floor: 1 });
            furniture.push(
                { id: 'fur-kitchen', type: 'kitchen_set', x: 400, y: D - 700, width: Math.min(3600, W * 0.6), height: 600, label: 'Tủ Bếp Chữ L' },
                { id: 'fur-dining', type: 'dining_set', x: 800, y: y2 + 800, width: 1600, height: 900, label: 'Bàn Ăn 6 Ghế' }
            );
            doors.push({ id: 'd-back', x: W - 1200, y: D, width: 900, type: 'single', swing: 'right', label: 'Cửa Sân Sau' });

        } else if (floorIndex < totalFloors || totalFloors === 1) {
            // === CÁC TẦNG LẦU: PHÒNG NGỦ MASTER, PHÒNG NGỦ PHỤ, WC, BAN CÔNG ===
            walls.push(
                { id: 'w-p-1', x1: 0, y1: y1, x2: W, y2: y1, thickness: innerT, type: 'partition' },
                { id: 'w-p-2', x1: 0, y1: y2, x2: W, y2: y2, thickness: innerT, type: 'partition' }
            );

            // Phòng Ngủ Master Phía Trước
            const wcMasterW = Math.min(1800, Math.round(W * 0.35));
            const wcMasterD = 2000;
            walls.push(
                { id: 'w-wcm-v', x1: W - wcMasterW, y1: 0, x2: W - wcMasterW, y2: wcMasterD, thickness: innerT, type: 'partition' },
                { id: 'w-wcm-h', x1: W - wcMasterW, y1: wcMasterD, x2: W, y2: wcMasterD, thickness: innerT, type: 'partition' }
            );
            doors.push({ id: 'd-wcm', x: W - wcMasterW, y: 400, width: 800, type: 'single', swing: 'left' });

            const wcMasterRect = { x: W - wcMasterW, y: 0, width: wcMasterW, height: wcMasterD };
            rooms.push({ id: `room-wcm-${floorIndex}`, type: 'wc_master', name: 'WC MASTER', areaM2: areaM2(wcMasterRect), ...wcMasterRect, floor: floorIndex });
            furniture.push({ id: `fur-wcm-${floorIndex}`, type: 'toilet_set', x: W - wcMasterW + 200, y: 200, width: wcMasterW - 400, height: wcMasterD - 400, label: 'WC Khép Kín' });

            const masterBedRect = { x: 0, y: 0, width: W - wcMasterW, height: y1 };
            rooms.push({ id: `room-master-${floorIndex}`, type: 'bedroom_master', name: `P. NGỦ MASTER (T${floorIndex})`, areaM2: Math.round((W * y1 - wcMasterW * wcMasterD) / 1000000 * 10) / 10, ...masterBedRect, floor: floorIndex });
            furniture.push({ id: `fur-bedm-${floorIndex}`, type: 'bed_master', x: 800, y: 800, width: 2000, height: 2100, label: 'Giường King Size' });
            doors.push({ id: `d-balcony-${floorIndex}`, x: 600, y: 0, width: 1400, type: 'double', swing: 'double', label: 'Cửa Ban Công' });

            // Cầu Thang Giữa + Sinh Hoạt Chung
            furniture.push({ id: `fur-stairs-${floorIndex}`, type: 'stairs_flight', x: 300, y: y1 + 300, width: Math.min(2400, W * 0.45), height: midD - 600, steps: 21, label: 'Cầu Thang' });
            if (hasCommonRoom) {
                furniture.push({ id: `fur-desk-${floorIndex}`, type: 'desk_study', x: W - 2000, y: y1 + 400, width: 1600, height: midD - 800, label: 'Góc Làm Việc / SHC' });
            }

            // Phòng Ngủ 2 Phía Sau
            const wcFloorW = Math.min(1800, Math.round(W * 0.35));
            const wcFloorD = 2000;
            walls.push(
                { id: 'w-wcf-v', x1: W - wcFloorW, y1: y2, x2: W - wcFloorW, y2: y2 + wcFloorD, thickness: innerT, type: 'partition' },
                { id: 'w-wcf-h', x1: W - wcFloorW, y1: y2 + wcFloorD, x2: W, y2: y2 + wcFloorD, thickness: innerT, type: 'partition' }
            );
            doors.push({ id: `d-wcf-${floorIndex}`, x: W - wcFloorW, y: y2 + 400, width: 800, type: 'single', swing: 'left' });

            const wcFloorRect = { x: W - wcFloorW, y: y2, width: wcFloorW, height: wcFloorD };
            rooms.push({ id: `room-wcf-${floorIndex}`, type: 'wc', name: `WC TẦNG ${floorIndex}`, areaM2: areaM2(wcFloorRect), ...wcFloorRect, floor: floorIndex });
            furniture.push({ id: `fur-wcf-${floorIndex}`, type: 'toilet_set', x: W - wcFloorW + 200, y: y2 + 200, width: wcFloorW - 400, height: wcFloorD - 400, label: 'WC Lầu' });

            const bed2Rect = { x: 0, y: y2, width: W - wcFloorW, height: rearD };
            rooms.push({ id: `room-bed2-${floorIndex}`, type: 'bedroom', name: `P. NGỦ ${floorIndex * 2} (T${floorIndex})`, areaM2: Math.round((W * rearD - wcFloorW * wcFloorD) / 1000000 * 10) / 10, ...bed2Rect, floor: floorIndex });
            furniture.push({ id: `fur-bed2-${floorIndex}`, type: 'bed_single', x: 800, y: y2 + 800, width: 1600, height: 2000, label: 'Giường Ngủ' });
            windows.push({ id: `win-bed2-${floorIndex}`, x: 800, y: D, width: 1500, type: 'sliding' });

        } else {
            // === TẦNG THƯỢNG: PHÒNG THỜ GIA TIÊN, SÂN THƯỢNG MINH ĐƯỜNG, SÂN PHƠI & GIẶT ===
            walls.push(
                { id: 'w-p-1', x1: 0, y1: y1, x2: W, y2: y1, thickness: innerT, type: 'partition' },
                { id: 'w-p-2', x1: 0, y1: y2, x2: W, y2: y2, thickness: innerT, type: 'partition' }
            );

            if (hasAltar && !altarOnGround) {
                const altarRect = { x: 0, y: 0, width: W, height: y1 };
                rooms.push({ id: 'room-altar', type: 'altar', name: 'P. THỜ GIA TIÊN', areaM2: areaM2(altarRect), ...altarRect, floor: floorIndex });
                furniture.push({ id: 'fur-altar', type: 'altar_set', x: (W - 1800) / 2, y: 500, width: 1800, height: 900, label: 'Bàn Thờ Gia Tiên' });
                doors.push({ id: 'd-altar', x: (W - 1400) / 2, y: y1, width: 1400, type: 'double', swing: 'double', label: 'Cửa Phòng Thờ' });
            } else {
                const terraceRect = { x: 0, y: 0, width: W, height: y1 };
                rooms.push({ id: 'room-terrace', type: 'yard', name: 'SÂN THƯỢNG PHÍA TRƯỚC', areaM2: areaM2(terraceRect), ...terraceRect, floor: floorIndex });
            }

            furniture.push({ id: 'fur-stairs-roof', type: 'stairs_flight', x: 300, y: y1 + 300, width: Math.min(2400, W * 0.45), height: midD - 600, steps: 21, label: 'Cầu Thang Tầng Thượng' });

            if (hasLaundry) {
                const laundryRect = { x: 0, y: y2, width: W, height: rearD };
                rooms.push({ id: 'room-laundry', type: 'laundry', name: 'SÂN PHƠI & GIẶT', areaM2: areaM2(laundryRect), ...laundryRect, floor: floorIndex });
                furniture.push({ id: 'fur-laundry', type: 'laundry_set', x: 400, y: y2 + 500, width: 1200, height: 800, label: 'Máy Giặt & Bồn Giặt' });
            }
        }

        // 3 Lớp Dimension Chains Ngang & Dọc
        dimensionChains.horizontal.push(
            // Lớp 1: Chi tiết từng khoang
            [
                { from: 0, to: Math.round(W * 0.5), text: `${Math.round(W * 0.5)}` },
                { from: Math.round(W * 0.5), to: W, text: `${W - Math.round(W * 0.5)}` }
            ],
            // Lớp 2: Phủ bì tổng thể
            [
                { from: 0, to: W, text: `${W}` }
            ]
        );

        dimensionChains.vertical.push(
            // Lớp 1: Từng phân đoạn
            [
                { from: 0, to: y1, text: `${y1}` },
                { from: y1, to: y2, text: `${y2 - y1}` },
                { from: y2, to: D, text: `${D - y2}` }
            ],
            // Lớp 2: Phủ bì tổng thể
            [
                { from: 0, to: D, text: `${D}` }
            ]
        );
    }

    const center = centerOfRect({ x: 0, y: 0, width: W, height: D });

    return {
        floorIndex,
        totalFloors,
        floorName,
        widthMm: W,
        depthMm: D,
        center,
        northAngleDeg,
        walls,
        doors,
        windows,
        furniture,
        rooms,
        columns,
        axesX,
        axesY,
        dimensionChains,
        entrancePorch
    };
}
