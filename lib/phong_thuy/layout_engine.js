// ============================================================
// Parametric Floorplan Layout Engine v2.0
// Bộ Giải Mặt Bằng Tham Số Hóa Động Toàn Phần (Dynamic Constraints Solver)
// Tác giả: Dịch Sư Nguyễn Huy Hoàng
// ============================================================

import { areaM2 } from './geometry.js';

export function generateParametricFloorplan({
    mode = 'empty_land',
    widthM = 5.0,
    lengthM = 16.0,
    floors = 2,
    facingDegree = 180,
    roomCounts = {}
}) {
    const W = Math.round(Math.max(3.5, Math.min(30.0, parseFloat(widthM) || 5.0)) * 1000);
    const D = Math.round(Math.max(6.0, Math.min(50.0, parseFloat(lengthM) || 16.0)) * 1000);
    const totalFloors = Math.max(1, Math.min(6, parseInt(floors, 10) || 2));

    const bedrooms = Math.max(1, Math.min(8, parseInt(roomCounts.bedrooms, 10) || (totalFloors * 2 - 1)));
    const toilets = Math.max(1, Math.min(6, parseInt(roomCounts.toilets, 10) || totalFloors));
    const hasAltar = roomCounts.hasAltar !== undefined ? String(roomCounts.hasAltar) : '1'; // '0': không, '1': tầng thượng, '2': tầng 1
    const hasGarage = String(roomCounts.hasGarage || '0') === '1';
    const hasSkylight = String(roomCounts.hasSkylight || '1') === '1';
    const hasCommonRoom = String(roomCounts.hasCommonRoom || '0') === '1';
    const hasLaundry = String(roomCounts.hasLaundry || '1') === '1';

    const isWideHouse = W >= 9000 && W >= D * 0.9;

    const plansByFloor = [];

    for (let f = 1; f <= totalFloors; f++) {
        let floorName = `MẶT BẰNG TẦNG ${f}`;
        if (f === 1) floorName = 'MẶT BẰNG TẦNG TRỆT';
        else if (f === totalFloors && totalFloors > 2) floorName = 'MẶT BẰNG TẦNG THƯỢNG';

        const floorPlan = solveSingleFloor({
            floorIndex: f,
            floorName,
            totalFloors,
            W,
            D,
            isWideHouse,
            bedrooms,
            toilets,
            hasAltar,
            hasGarage,
            hasSkylight,
            hasCommonRoom,
            hasLaundry
        });

        plansByFloor.push(floorPlan);
    }

    const groundFloor = plansByFloor[0];

    return {
        widthMm: W,
        depthMm: D,
        totalFloors,
        plansByFloor,
        ...groundFloor
    };
}

function solveSingleFloor(config) {
    const {
        floorIndex,
        floorName,
        totalFloors,
        W,
        D,
        isWideHouse,
        bedrooms,
        hasAltar,
        hasGarage,
        hasSkylight,
        hasCommonRoom
    } = config;

    const rooms = [];
    const furniture = [];
    const doors = [];
    const windows = [];
    const walls = [];
    const columns = [];
    const dims = [];

    // 1. Tường bao bên ngoài (Outer Walls)
    const wallThick = 220;
    const partThick = 110;

    walls.push({ id: 'w-out-top', x1: 0, y1: 0, x2: W, y2: 0, thickness: wallThick, type: 'outer' });
    walls.push({ id: 'w-out-bot', x1: 0, y1: D, x2: W, y2: D, thickness: wallThick, type: 'outer' });
    walls.push({ id: 'w-out-left', x1: 0, y1: 0, x2: 0, y2: D, thickness: wallThick, type: 'outer' });
    walls.push({ id: 'w-out-right', x1: W, y1: 0, x2: W, y2: D, thickness: wallThick, type: 'outer' });

    // 2. Hệ Cột Chịu Lực (Columns) & Hệ Trục Định Vị (Axes)
    const colSpanX = W > 8000 ? Math.round(W / 3) : Math.round(W / 2);
    const colSpanY = D > 18000 ? Math.round(D / 4) : (D > 10000 ? Math.round(D / 3) : Math.round(D / 2));

    const axesX = [];
    for (let x = 0; x <= W; x += colSpanX) {
        if (x > W - 500) x = W;
        axesX.push(x);
    }
    if (!axesX.includes(W)) axesX.push(W);

    const axesY = [];
    for (let y = 0; y <= D; y += colSpanY) {
        if (y > D - 500) y = D;
        axesY.push(y);
    }
    if (!axesY.includes(D)) axesY.push(D);

    axesX.forEach((cx) => {
        axesY.forEach((cy) => {
            columns.push({ x: cx, y: cy, size: 220 });
        });
    });

    // 3. Sảnh đón tam cấp phía trước (Chỉ ở Tầng Trệt)
    let entrancePorch = null;
    if (floorIndex === 1) {
        const porchW = Math.min(3600, W * 0.6);
        const porchD = 1200;
        const px = (W - porchW) / 2;
        entrancePorch = {
            x: px,
            y: -porchD,
            width: porchW,
            height: porchD,
            steps: 3,
            pillars: [
                { x: px - 110, y: -porchD, size: 220 },
                { x: px + porchW - 110, y: -porchD, size: 220 }
            ]
        };
    }

    // ------------------------------------------------------------
    // 4. PHÂN BỔ KHÔNG GIAN THEO TẦNG & THAM SỐ
    // ------------------------------------------------------------

    if (floorIndex === 1) {
        // ========== TẦNG TRỆT / TẦNG 1 ==========
        if (isWideHouse) {
            // Biệt thự ngang / Nhà vườn (ví dụ 14.5m x 9.9m như ảnh 2)
            const leftW = Math.round(W * 0.35);
            const midW = Math.round(W * 0.35);
            const rightW = W - leftW - midW;
            const frontD = Math.round(D * 0.55);
            const rearD = D - frontD;

            // Gian Giữa: Phòng Khách (trước) & Bàn Thờ / Bếp (sau)
            rooms.push({ id: 'r_living', name: 'PHÒNG KHÁCH', x: leftW, y: 0, width: midW, height: frontD, areaM2: (midW * frontD) / 1000000 });
            furniture.push({ id: 'f_living_sofa', type: 'sofa_living', x: leftW + 300, y: 300, width: midW - 600, height: frontD - 600 });
            doors.push({ id: 'd_main', x: leftW + (midW - 1800) / 2, y: 0, width: 1800, swing: 'in', rotation: 0 });

            // Gian Trái: Phòng Thờ (hoặc Phòng Ngủ 1) + Phòng Ngủ 2
            if (hasAltar === '2' || totalFloors === 1) {
                rooms.push({ id: 'r_altar', name: 'PHÒNG THỜ', x: 0, y: 0, width: leftW, height: frontD, areaM2: (leftW * frontD) / 1000000 });
                furniture.push({ id: 'f_altar', type: 'altar_set', x: leftW * 0.15, y: 300, width: leftW * 0.7, height: 1200 });
            } else {
                rooms.push({ id: 'r_bed1', name: 'PHÒNG NGỦ 1', x: 0, y: 0, width: leftW, height: frontD, areaM2: (leftW * frontD) / 1000000 });
                furniture.push({ id: 'f_bed1', type: 'bed_master', x: leftW * 0.15, y: 300, width: leftW * 0.7, height: frontD - 600 });
            }

            // Gian Phải: Bếp & Bàn Ăn + WC
            rooms.push({ id: 'r_dining', name: 'BẾP & PHÒNG ĂN', x: leftW + midW, y: 0, width: rightW, height: frontD, areaM2: (rightW * frontD) / 1000000 });
            furniture.push({ id: 'f_dining', type: 'dining_set', x: leftW + midW + 300, y: 300, width: rightW - 600, height: frontD - 600 });

            // Hàng Sau: Các Phòng Ngủ & WC
            rooms.push({ id: 'r_bed2', name: 'PHÒNG NGỦ 2', x: 0, y: frontD, width: leftW, height: rearD, areaM2: (leftW * rearD) / 1000000 });
            furniture.push({ id: 'f_bed2', type: 'bed_master', x: leftW * 0.15, y: frontD + 300, width: leftW * 0.7, height: rearD - 600 });

            rooms.push({ id: 'r_kitchen', name: 'KHÔNG GIAN NẤU', x: leftW, y: frontD, width: midW, height: rearD, areaM2: (midW * rearD) / 1000000 });
            furniture.push({ id: 'f_kitchen', type: 'kitchen_set', x: leftW + 300, y: frontD + 300, width: midW - 600, height: 700 });

            rooms.push({ id: 'r_wc_g', name: 'PHÒNG TẮM & WC', x: leftW + midW, y: frontD, width: rightW, height: rearD, areaM2: (rightW * rearD) / 1000000 });
            furniture.push({ id: 'f_wc_g', type: 'toilet_set', x: leftW + midW + 200, y: frontD + 200, width: rightW - 400, height: rearD - 400 });

            // Tường ngăn trong nhà ngang
            walls.push({ id: 'pw1', x1: leftW, y1: 0, x2: leftW, y2: D, thickness: partThick, type: 'partition' });
            walls.push({ id: 'pw2', x1: leftW + midW, y1: 0, x2: leftW + midW, y2: D, thickness: partThick, type: 'partition' });
            walls.push({ id: 'pw3', x1: 0, y1: frontD, x2: W, y2: frontD, thickness: partThick, type: 'partition' });
        } else {
            // Nhà Ống / Phố (Tube House e.g. 5x16m, 5x18m, 6x15m)
            const frontDepth = hasGarage ? Math.round(D * 0.28) : Math.round(D * 0.35);
            const midDepth = Math.round(D * 0.28);
            const rearDepth = D - frontDepth - midDepth;

            let curY = 0;

            if (hasGarage) {
                rooms.push({ id: 'r_garage', name: 'GARA XE', x: 0, y: 0, width: W, height: frontDepth, areaM2: (W * frontDepth) / 1000000 });
                furniture.push({ id: 'f_car', type: 'garage_car', x: W * 0.15, y: 300, width: W * 0.7, height: frontDepth - 600 });
                doors.push({ id: 'd_rolling', x: 400, y: 0, width: W - 800, swing: 'sliding' });
                curY += frontDepth;
                walls.push({ id: 'pw_g', x1: 0, y1: curY, x2: W, y2: curY, thickness: partThick, type: 'partition' });

                // Phòng Khách sau Gara
                const livingD = Math.round(midDepth * 0.9);
                rooms.push({ id: 'r_living', name: 'PHÒNG KHÁCH', x: 0, y: curY, width: W, height: livingD, areaM2: (W * livingD) / 1000000 });
                furniture.push({ id: 'f_sofa', type: 'sofa_living', x: 300, y: curY + 300, width: W - 600, height: livingD - 600 });
                curY += livingD;
                walls.push({ id: 'pw_l', x1: 0, y1: curY, x2: W, y2: curY, thickness: partThick, type: 'partition' });
            } else {
                // Phòng Khách ở Mặt Tiền
                rooms.push({ id: 'r_living', name: 'PHÒNG KHÁCH', x: 0, y: 0, width: W, height: frontDepth, areaM2: (W * frontDepth) / 1000000 });
                furniture.push({ id: 'f_sofa', type: 'sofa_living', x: 400, y: 400, width: W - 800, height: frontDepth - 800 });
                doors.push({ id: 'd_main', x: (W - 1600) / 2, y: 0, width: 1600, swing: 'in', rotation: 0 });
                curY += frontDepth;
                walls.push({ id: 'pw_mid', x1: 0, y1: curY, x2: W, y2: curY, thickness: partThick, type: 'partition' });
            }

            // Gian Giữa: Cầu Thang + Giếng Trời + Bàn Thờ (nếu chọn tầng 1)
            const stairsW = Math.min(2400, W * 0.5);
            const stairsH = Math.min(3200, midDepth * 0.85);

            rooms.push({ id: 'r_stairs_hall', name: 'SẢNH THANG & GIẾNG TRỜI', x: 0, y: curY, width: W, height: midDepth, areaM2: (W * midDepth) / 1000000 });
            furniture.push({ id: 'f_stairs', type: 'stairs_flight', x: 200, y: curY + (midDepth - stairsH) / 2, width: stairsW, height: stairsH });

            if (hasSkylight) {
                furniture.push({ id: 'f_skylight', type: 'skylight_vent', x: W - stairsW + 200, y: curY + (midDepth - stairsH) / 2, width: stairsW - 400, height: stairsH });
            }

            if (hasAltar === '2') {
                furniture.push({ id: 'f_altar_g', type: 'altar_set', x: W - 1800, y: curY + 200, width: 1600, height: 900 });
            }

            curY += midDepth;
            walls.push({ id: 'pw_rear', x1: 0, y1: curY, x2: W, y2: curY, thickness: partThick, type: 'partition' });

            // Gian Sau: Bếp & Ăn + WC 1
            const wcW = Math.min(1800, W * 0.4);
            const kitW = W - wcW;

            rooms.push({ id: 'r_kitchen_dining', name: 'BẾP & PHÒNG ĂN', x: 0, y: curY, width: kitW, height: rearDepth, areaM2: (kitW * rearDepth) / 1000000 });
            furniture.push({ id: 'f_kitchen', type: 'kitchen_set', x: 200, y: curY + 200, width: kitW - 400, height: 650 });
            furniture.push({ id: 'f_dining', type: 'dining_set', x: 200, y: curY + rearDepth - 1600, width: kitW - 400, height: 1200 });

            rooms.push({ id: 'r_wc1', name: 'WC 1', x: kitW, y: curY, width: wcW, height: rearDepth, areaM2: (wcW * rearDepth) / 1000000 });
            furniture.push({ id: 'f_wc1', type: 'toilet_set', x: kitW + 100, y: curY + 100, width: wcW - 200, height: rearDepth - 200 });

            walls.push({ id: 'pw_wc', x1: kitW, y1: curY, x2: kitW, y2: D, thickness: partThick, type: 'partition' });
            doors.push({ id: 'd_wc1', x: kitW, y: curY + 400, width: 800, swing: 'in', rotation: 90 });
            windows.push({ id: 'win_back', x: 400, y: D, width: 1400, type: 'sliding' });
        }
    } else if (floorIndex === totalFloors && hasAltar === '1') {
        // ========== TẦNG THƯỢNG CÓ PHÒNG THỜ ==========
        const frontD = Math.round(D * 0.35);
        const midD = Math.round(D * 0.3);
        const rearD = D - frontD - midD;

        // Phòng Thờ Hướng Mặt Tiền
        rooms.push({ id: 'r_altar_top', name: 'PHÒNG THỜ GIA TIÊN', x: 0, y: 0, width: W, height: frontD, areaM2: (W * frontD) / 1000000 });
        furniture.push({ id: 'f_altar_top', type: 'altar_set', x: (W - 2200) / 2, y: 300, width: 2200, height: 1100 });
        windows.push({ id: 'win_altar', x: (W - 1600) / 2, y: 0, width: 1600, type: 'sliding' });

        walls.push({ id: 'pw_altar', x1: 0, y1: frontD, x2: W, y2: frontD, thickness: partThick, type: 'partition' });

        // Cầu Thang Tầng Thượng
        rooms.push({ id: 'r_stairs_top', name: 'SẢNH THANG TẦNG THƯỢNG', x: 0, y: frontD, width: W, height: midD, areaM2: (W * midD) / 1000000 });
        furniture.push({ id: 'f_stairs_top', type: 'stairs_flight', x: 200, y: frontD + 200, width: W * 0.5, height: midD - 400 });

        walls.push({ id: 'pw_dry', x1: 0, y1: frontD + midD, x2: W, y2: frontD + midD, thickness: partThick, type: 'partition' });

        // Sân Phơi & Giặt Quần Áo
        rooms.push({ id: 'r_laundry', name: 'SÂN PHƠI & GIẶT', x: 0, y: frontD + midD, width: W, height: rearD, areaM2: (W * rearD) / 1000000 });
        furniture.push({ id: 'f_skylight_top', type: 'skylight_vent', x: W * 0.2, y: frontD + midD + 300, width: W * 0.6, height: rearD - 600 });
    } else {
        // ========== TẦNG LẦU PHÒNG NGỦ (TẦNG 2, 3...) ==========
        const frontD = Math.round(D * 0.4);
        const midD = Math.round(D * 0.22);
        const rearD = D - frontD - midD;

        // Phòng Ngủ Master (Phía trước, có Ban công)
        rooms.push({ id: `r_bed_master_${floorIndex}`, name: `PHÒNG NGỦ MASTER (TẦNG ${floorIndex})`, x: 0, y: 0, width: W, height: frontD, areaM2: (W * frontD) / 1000000 });
        furniture.push({ id: `f_bed_master_${floorIndex}`, type: 'bed_master', x: (W - 2000) / 2, y: 300, width: 2000, height: frontD - 600 });
        windows.push({ id: `win_front_${floorIndex}`, x: (W - 2000) / 2, y: 0, width: 2000, type: 'sliding' });

        walls.push({ id: `pw_f_${floorIndex}`, x1: 0, y1: frontD, x2: W, y2: frontD, thickness: partThick, type: 'partition' });

        // Sảnh Cầu Thang & WC Tầng
        const wcW = Math.min(1800, W * 0.45);
        const stairsW = W - wcW;

        rooms.push({ id: `r_stairs_${floorIndex}`, name: hasCommonRoom ? 'SINH HOẠT CHUNG' : 'SẢNH CẦU THANG', x: 0, y: frontD, width: stairsW, height: midD, areaM2: (stairsW * midD) / 1000000 });
        furniture.push({ id: `f_stairs_${floorIndex}`, type: 'stairs_flight', x: 200, y: frontD + 100, width: stairsW - 300, height: midD - 200 });

        rooms.push({ id: `r_wc_${floorIndex}`, name: `WC TẦNG ${floorIndex}`, x: stairsW, y: frontD, width: wcW, height: midD, areaM2: (wcW * midD) / 1000000 });
        furniture.push({ id: `f_wc_${floorIndex}`, type: 'toilet_set', x: stairsW + 100, y: frontD + 100, width: wcW - 200, height: midD - 200 });

        walls.push({ id: `pw_wc_mid_${floorIndex}`, x1: stairsW, y1: frontD, x2: stairsW, y2: frontD + midD, thickness: partThick, type: 'partition' });
        walls.push({ id: `pw_r_${floorIndex}`, x1: 0, y1: frontD + midD, x2: W, y2: frontD + midD, thickness: partThick, type: 'partition' });

        // Phòng Ngủ 2 (Phía sau)
        rooms.push({ id: `r_bed2_${floorIndex}`, name: `PHÒNG NGỦ 2 (TẦNG ${floorIndex})`, x: 0, y: frontD + midD, width: W, height: rearD, areaM2: (W * rearD) / 1000000 });
        furniture.push({ id: `f_bed2_${floorIndex}`, type: 'bed_single', x: 300, y: frontD + midD + 300, width: 1400, height: rearD - 600 });
        windows.push({ id: `win_rear_${floorIndex}`, x: (W - 1600) / 2, y: D, width: 1600, type: 'sliding' });
    }

    // 5. Chuỗi Kích Thước (Dimensions 3 lớp mm)
    // Dọc bên trái
    dims.push({ type: 'vertical', side: 'left', tier: 1, x: -500, y1: 0, y2: D, text: `${D}` });
    dims.push({ type: 'vertical', side: 'left', tier: 2, x: -850, y1: 0, y2: D, text: `TỔNG CHIỀU DÀI: ${D} mm` });

    // Ngang phía trên
    dims.push({ type: 'horizontal', side: 'top', tier: 1, y: -500, x1: 0, x2: W, text: `${W}` });
    dims.push({ type: 'horizontal', side: 'top', tier: 2, y: -850, x1: 0, x2: W, text: `TỔNG BỀ RỘNG: ${W} mm` });

    return {
        floorIndex,
        floorName,
        rooms,
        walls,
        columns,
        doors,
        windows,
        furniture,
        entrancePorch,
        axesX,
        axesY,
        dimensions: dims
    };
}
