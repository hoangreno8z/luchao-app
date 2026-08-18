// ============================================================
// Architectural CAD Floorplan Generator Engine
// Tác giả: Dịch Sư Nguyễn Huy Hoàng
// ============================================================

import { checkLoBan } from './lo_ban_helper.js';

export function generateArchitecturalPlan({
    mode = 'empty_land', // 'empty_land' | 'existing_house'
    widthM = 5.0,        // Chiều ngang (m)
    lengthM = 16.0,      // Chiều dài (m)
    floors = 2,          // Số tầng (1 = Trệt, 2 = 1 lầu, 3 = 2 lầu... 7 = 6 lầu)
    facingDegree = 180,  // Hướng nhà
    flyingStarsData = null,
    batTrachData = null,
    existingRooms = []
}) {
    const W = Math.max(3.0, Math.min(30.0, parseFloat(widthM) || 5.0));
    const L = Math.max(6.0, Math.min(60.0, parseFloat(lengthM) || 16.0));
    const totalFloors = Math.max(1, Math.min(7, parseInt(floors) || 2));

    const plansByFloor = [];

    for (let f = 1; f <= totalFloors; f++) {
        let floorName = 'Tầng Trệt';
        if (f > 1 && f < totalFloors) {
            floorName = `Lầu ${f - 1} (Tầng ${f})`;
        } else if (f === totalFloors && totalFloors > 1) {
            floorName = `Tầng Thượng (Lầu ${f - 1})`;
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
            existingRooms
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
    existingRooms
}) {
    const walls = [];
    const doors = [];
    const windows = [];
    const furniture = [];
    const rooms = [];
    const dimensions = [];

    const outerT = 0.22; // Tường bao 220mm
    const innerT = 0.11; // Tường ngăn 110mm

    // Kích thước ô Lạc Thư tỷ lệ
    const frontYardL = (floorIndex === 1 && L >= 12) ? Math.min(3.0, L * 0.15) : 0;
    const backYardL = (floorIndex === 1 && L >= 14) ? Math.min(2.0, L * 0.10) : 0;
    const houseL = L - frontYardL - backYardL;

    const houseYStart = frontYardL;
    const houseYEnd = frontYardL + houseL;

    // 1. TƯỜNG BAO NGOẠI THẤT
    // Tường trước
    walls.push({ x1: 0, y1: houseYStart, x2: W, y2: houseYStart, thickness: outerT, type: 'outer' });
    // Tường sau
    walls.push({ x1: 0, y1: houseYEnd, x2: W, y2: houseYEnd, thickness: outerT, type: 'outer' });
    // Tường trái
    walls.push({ x1: 0, y1: houseYStart, x2: 0, y2: houseYEnd, thickness: outerT, type: 'outer' });
    // Tường phải
    walls.push({ x1: W, y1: houseYStart, x2: W, y2: houseYEnd, thickness: outerT, type: 'outer' });

    // 2. PHÂN BỔ CÁC PHÒNG THEO TẦNG
    if (floorIndex === 1) {
        // ========== TẦNG TRỆT ==========
        const livingRoomL = Math.max(4.0, houseL * 0.35);
        const stairL = Math.max(2.5, Math.min(3.5, houseL * 0.22));
        const kitchenL = houseL - livingRoomL - stairL;

        const yLivingEnd = houseYStart + livingRoomL;
        const yStairEnd = yLivingEnd + stairL;
        const yKitchenEnd = houseYEnd;

        // Vách ngăn Khách - Cầu thang / Giếng trời
        walls.push({ x1: 0, y1: yLivingEnd, x2: W * 0.6, y2: yLivingEnd, thickness: innerT, type: 'partition' });
        // Vách ngăn Cầu thang - Bếp
        walls.push({ x1: 0, y1: yStairEnd, x2: W, y2: yStairEnd, thickness: innerT, type: 'partition' });

        // Phòng Khách
        rooms.push({
            name: 'Phòng Khách',
            areaM2: Math.round(W * livingRoomL * 10) / 10,
            x: 0, y: houseYStart, w: W, h: livingRoomL,
            zone: 'Tiền Minh Đường',
            fengShuiNote: 'Khu vực nạp khí sinh tài, đón Cát Tinh đương vận từ hướng chính.'
        });

        // Cửa chính (Thước Lỗ Ban 52.2cm)
        const mainDoorW = W >= 5.0 ? 2.8 : 2.15; // Cửa 4 cánh hoặc 2 cánh
        const loBanDoor = checkLoBan(mainDoorW * 1000, '522');
        doors.push({
            x: (W - mainDoorW) / 2, y: houseYStart, w: mainDoorW, h: outerT,
            type: 'main_door', label: `Cửa Chính (${mainDoorW}m - Cung ${loBanDoor.cung})`,
            isGood: loBanDoor.isGood
        });

        // Sofa & TV
        furniture.push({ type: 'sofa', x: 0.5, y: houseYStart + 1.0, w: Math.min(2.6, W * 0.5), h: 0.9, label: 'Sofa' });
        furniture.push({ type: 'tv_cabinet', x: W - 0.7, y: houseYStart + 1.0, w: 0.5, h: 2.0, label: 'Kệ TV' });

        // Cầu Thang & Giếng Trời Trung Cung
        const stairW = Math.min(2.4, W * 0.45);
        furniture.push({
            type: 'stairs', x: 0.3, y: yLivingEnd + 0.3, w: stairW, h: stairL - 0.6,
            steps: 21, label: 'Cầu Thang (21 Bậc - Cung Sinh)'
        });
        furniture.push({
            type: 'skylight', x: W - 1.8, y: yLivingEnd + 0.4, w: 1.5, h: stairL - 0.8,
            label: 'Giếng Trời (Hút Gió & Ánh Sáng)'
        });

        // Vệ sinh tầng trệt (Dưới gầm thang hoặc nép sau)
        const wcW = Math.min(1.8, W * 0.38);
        const wcL = Math.min(2.2, kitchenL * 0.4);
        walls.push({ x1: W - wcW, y1: yStairEnd, x2: W - wcW, y2: yStairEnd + wcL, thickness: innerT, type: 'partition' });
        walls.push({ x1: W - wcW, y1: yStairEnd + wcL, x2: W, y2: yStairEnd + wcL, thickness: innerT, type: 'partition' });

        rooms.push({
            name: 'WC Trệt',
            areaM2: Math.round(wcW * wcL * 10) / 10,
            x: W - wcW, y: yStairEnd, w: wcW, h: wcL,
            zone: 'Khu Phụ Trợ',
            fengShuiNote: 'Tọa Hung áp sát, giữ uế khí không phát tán ra phòng khách.'
        });
        furniture.push({ type: 'toilet_bowl', x: W - 0.8, y: yStairEnd + 0.4, w: 0.5, h: 0.7, label: 'Bồn Cầu' });
        furniture.push({ type: 'lavabo', x: W - 1.5, y: yStairEnd + 0.4, w: 0.5, h: 0.5, label: 'Lavabo' });

        // Bếp & Phòng Ăn
        const kitchenActualL = kitchenL;
        rooms.push({
            name: 'Bếp & Phòng Ăn',
            areaM2: Math.round((W * kitchenActualL - wcW * wcL) * 10) / 10,
            x: 0, y: yStairEnd, w: W - wcW, h: kitchenActualL,
            zone: 'Hậu Trạch',
            fengShuiNote: 'Bếp Tọa Hung Hướng Cát, điểm tụ hỏa nuôi dưỡng sinh lực cho gia quyến.'
        });
        furniture.push({ type: 'kitchen_counter', x: 0.4, y: yKitchenEnd - 0.7, w: Math.min(3.5, W * 0.6), h: 0.6, label: 'Bếp Nấu & Bồn Rửa' });
        furniture.push({ type: 'dining_table', x: 1.2, y: yStairEnd + 1.2, w: 1.6, h: 0.9, label: 'Bàn Ăn 6 Ghế' });

        // Cửa sau ra sân sau
        if (backYardL > 0) {
            doors.push({ x: W * 0.5, y: houseYEnd, w: 0.9, h: outerT, type: 'back_door', label: 'Cửa Sân Sau (0.9m)' });
        }

    } else if (floorIndex < totalFloors || totalFloors === 1) {
        // ========== CÁC LẦU PHÒNG NGỦ (Lầu 1, 2, 3...) ==========
        const masterBedL = Math.max(4.2, houseL * 0.38);
        const stairL = Math.max(2.5, Math.min(3.5, houseL * 0.22));
        const secondBedL = houseL - masterBedL - stairL;

        const yMasterEnd = houseYStart + masterBedL;
        const yStairEnd = yMasterEnd + stairL;

        // Vách ngăn Phòng Ngủ Master
        walls.push({ x1: 0, y1: yMasterEnd, x2: W, y2: yMasterEnd, thickness: innerT, type: 'partition' });
        // Vách ngăn Phòng Ngủ Sau
        walls.push({ x1: 0, y1: yStairEnd, x2: W, y2: yStairEnd, thickness: innerT, type: 'partition' });

        // Ban công trước
        const balconyL = 1.2;
        walls.push({ x1: 0, y1: houseYStart - balconyL, x2: W, y2: houseYStart - balconyL, thickness: innerT, type: 'railing' });
        walls.push({ x1: 0, y1: houseYStart - balconyL, x2: 0, y2: houseYStart, thickness: innerT, type: 'railing' });
        walls.push({ x1: W, y1: houseYStart - balconyL, x2: W, y2: houseYStart, thickness: innerT, type: 'railing' });

        // Phòng Ngủ Master (Trước)
        rooms.push({
            name: `Phòng Ngủ Master ${floorIndex - 1}`,
            areaM2: Math.round(W * masterBedL * 10) / 10,
            x: 0, y: houseYStart, w: W, h: masterBedL,
            zone: 'Cung Vượng Đinh',
            fengShuiNote: 'Tọa cung Sơn Tinh cát lợi, tăng cường sức khỏe, hạnh phúc vợ chồng.'
        });
        furniture.push({ type: 'bed_master', x: 0.8, y: houseYStart + 1.2, w: 1.8, h: 2.0, label: 'Giường 1.8x2.0m' });
        furniture.push({ type: 'wardrobe', x: W - 0.7, y: houseYStart + 0.8, w: 0.6, h: 2.2, label: 'Tủ Quần Áo' });

        // Cửa ban công
        doors.push({ x: W * 0.5 - 0.6, y: houseYStart, w: 1.2, h: outerT, type: 'balcony_door', label: 'Cửa Ban Công (1.2m)' });

        // Cầu Thang giữa
        furniture.push({ type: 'stairs', x: 0.3, y: yMasterEnd + 0.3, w: Math.min(2.4, W * 0.45), h: stairL - 0.6, label: 'Cầu Thang Lầu' });

        // WC khép kín tầng lầu
        const wcW = Math.min(2.0, W * 0.4);
        const wcL = stairL;
        walls.push({ x1: W - wcW, y1: yMasterEnd, x2: W - wcW, y2: yMasterEnd + wcL, thickness: innerT, type: 'partition' });

        rooms.push({
            name: `WC Tầng ${floorIndex}`,
            areaM2: Math.round(wcW * wcL * 10) / 10,
            x: W - wcW, y: yMasterEnd, w: wcW, h: wcL,
            zone: 'Vệ Sinh Khép Kín',
            fengShuiNote: 'Hệ thống cấp thoát nước tiêu chuẩn, có quạt thông gió khử mùi.'
        });
        furniture.push({ type: 'shower_cabin', x: W - 0.9, y: yMasterEnd + 0.4, w: 0.8, h: 0.8, label: 'Cabin Tắm Kính' });
        furniture.push({ type: 'toilet_bowl', x: W - 0.8, y: yMasterEnd + 1.5, w: 0.5, h: 0.7, label: 'Bồn Cầu' });
        furniture.push({ type: 'lavabo', x: W - 1.7, y: yMasterEnd + 1.5, w: 0.5, h: 0.5, label: 'Lavabo' });

        // Phòng Ngủ 2 / Phòng Làm Việc (Phía sau)
        rooms.push({
            name: `Phòng Ngủ 2 (Tầng ${floorIndex})`,
            areaM2: Math.round(W * secondBedL * 10) / 10,
            x: 0, y: yStairEnd, w: W, h: secondBedL,
            zone: 'Cung Văn Xương',
            fengShuiNote: 'Không gian yên tĩnh, thông thoáng, đón ánh sáng tự nhiên.'
        });
        furniture.push({ type: 'bed_single', x: 0.8, y: yStairEnd + 0.8, w: 1.4, h: 2.0, label: 'Giường 1.4x2.0m' });
        furniture.push({ type: 'study_desk', x: W - 1.6, y: houseYEnd - 0.8, w: 1.4, h: 0.6, label: 'Bàn Học / Làm Việc' });
        windows.push({ x: W * 0.5 - 0.7, y: houseYEnd, w: 1.4, h: outerT, label: 'Cửa Sổ Lấy Sáng' });

    } else {
        // ========== TẦNG THƯỢNG (Phòng Thờ + Sân Thượng) ==========
        const altarRoomL = Math.max(3.5, houseL * 0.35);
        const stairL = Math.max(2.5, Math.min(3.5, houseL * 0.25));
        const terraceBackL = houseL - altarRoomL - stairL;

        const yAltarEnd = houseYStart + altarRoomL;
        const yStairEnd = yAltarEnd + stairL;

        // Vách ngăn Phòng Thờ
        walls.push({ x1: 0, y1: yAltarEnd, x2: W, y2: yAltarEnd, thickness: innerT, type: 'partition' });

        // Phòng Thờ
        rooms.push({
            name: 'Phòng Thờ Gia Tiên',
            areaM2: Math.round(W * altarRoomL * 10) / 10,
            x: 0, y: houseYStart, w: W, h: altarRoomL,
            zone: 'Vị Trí Tối Thượng Tôn Nghiêm',
            fengShuiNote: 'Tọa Cát Hướng Cát, tụ linh khí tổ tiên phù hộ độ trì cho con cháu.'
        });

        // Bàn Thờ (Kích thước chuẩn Lỗ Ban 38.8cm)
        const altarW = 1.53; // Cung Lục Hợp / Đại Cát
        const loBanAltar = checkLoBan(altarW * 1000, '388');
        furniture.push({
            type: 'altar_table', x: (W - altarW) / 2, y: houseYStart + 0.5, w: altarW, h: 0.8,
            label: `Bàn Thờ Tổ Tiên (1.53m - Cung ${loBanAltar.cung})`,
            isGood: loBanAltar.isGood
        });

        // Cầu thang
        furniture.push({ type: 'stairs', x: 0.3, y: yAltarEnd + 0.3, w: Math.min(2.4, W * 0.45), h: stairL - 0.6, label: 'Cầu Thang Tầng Thượng' });

        // Sân Phơi & Giặt Phía Sau
        rooms.push({
            name: 'Sân Phơi & Giặt Phía Sau',
            areaM2: Math.round(W * terraceBackL * 10) / 10,
            x: 0, y: yStairEnd, w: W, h: terraceBackL,
            zone: 'Sân Thượng Hậu',
            fengShuiNote: 'Không gian phơi phóng, giặt giũ, bồn nước mái & năng lượng mặt trời.'
        });
        furniture.push({ type: 'washing_machine', x: W - 1.0, y: yStairEnd + 0.5, w: 0.7, h: 0.7, label: 'Máy Giặt' });
    }

    // 3. KÍCH THƯỚC PHÒNG & THƯỚC LỖ BAN
    dimensions.push({ x1: 0, y1: houseYStart, x2: W, y2: houseYStart, text: `Ngang ${W}m`, loban: checkLoBan(W * 1000, '429') });
    dimensions.push({ x1: W, y1: houseYStart, x2: W, y2: houseYEnd, text: `Dài ${houseL}m`, loban: checkLoBan(houseL * 1000, '429') });

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
