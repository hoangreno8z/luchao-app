// ============================================================
// Huyền Không Phi Tinh Engine (Xuan Kong Flying Stars Core v2.0)
// Hỗ Trợ: Vận Tinh, Sơn Tinh, Hướng Tinh, Niên Tinh, Nguyệt Tinh, Nhật Tinh, Thời Tinh
// Định Hướng Chuẩn: HƯỚNG Luôn Ở Trên (Mặt Tiền), TỌA Ở Dưới (Hậu Trạch)
// Tác giả: Dịch Sư Nguyễn Huy Hoàng
// ============================================================

export const MOUNTAINS = [
    { name: 'Nhâm', center: 345, yinYang: 1,  sanYuan: 'Địa',  palace: 1, element: 'Thủy', direction: 'Bắc' },
    { name: 'Tý',   center: 0,   yinYang: -1, sanYuan: 'Thiên', palace: 1, element: 'Thủy', direction: 'Bắc' },
    { name: 'Quý',  center: 15,  yinYang: -1, sanYuan: 'Nhân',  palace: 1, element: 'Thủy', direction: 'Bắc' },
    { name: 'Sửu',  center: 30,  yinYang: -1, sanYuan: 'Địa',  palace: 8, element: 'Thổ',  direction: 'Đông Bắc' },
    { name: 'Cấn',  center: 45,  yinYang: 1,  sanYuan: 'Thiên', palace: 8, element: 'Thổ',  direction: 'Đông Bắc' },
    { name: 'Dần',  center: 60,  yinYang: 1,  sanYuan: 'Nhân',  palace: 8, element: 'Thổ',  direction: 'Đông Bắc' },
    { name: 'Giáp', center: 75,  yinYang: 1,  sanYuan: 'Địa',  palace: 3, element: 'Mộc',  direction: 'Đông' },
    { name: 'Mão',  center: 90,  yinYang: -1, sanYuan: 'Thiên', palace: 3, element: 'Mộc',  direction: 'Đông' },
    { name: 'Ất',   center: 105, yinYang: -1, sanYuan: 'Nhân',  palace: 3, element: 'Mộc',  direction: 'Đông' },
    { name: 'Thìn', center: 120, yinYang: -1, sanYuan: 'Địa',  palace: 4, element: 'Mộc',  direction: 'Đông Nam' },
    { name: 'Tốn',  center: 135, yinYang: 1,  sanYuan: 'Thiên', palace: 4, element: 'Mộc',  direction: 'Đông Nam' },
    { name: 'Tỵ',   center: 150, yinYang: 1,  sanYuan: 'Nhân',  palace: 4, element: 'Hỏa',  direction: 'Đông Nam' },
    { name: 'Bính', center: 165, yinYang: 1,  sanYuan: 'Địa',  palace: 9, element: 'Hỏa',  direction: 'Nam' },
    { name: 'Ngọ',  center: 180, yinYang: -1, sanYuan: 'Thiên', palace: 9, element: 'Hỏa',  direction: 'Nam' },
    { name: 'Đinh', center: 195, yinYang: -1, sanYuan: 'Nhân',  palace: 9, element: 'Hỏa',  direction: 'Nam' },
    { name: 'Mùi',  center: 210, yinYang: -1, sanYuan: 'Địa',  palace: 2, element: 'Thổ',  direction: 'Tây Nam' },
    { name: 'Khôn', center: 225, yinYang: 1,  sanYuan: 'Thiên', palace: 2, element: 'Thổ',  direction: 'Tây Nam' },
    { name: 'Thân', center: 240, yinYang: 1,  sanYuan: 'Nhân',  palace: 2, element: 'Kim',  direction: 'Tây Nam' },
    { name: 'Canh', center: 255, yinYang: 1,  sanYuan: 'Địa',  palace: 7, element: 'Kim',  direction: 'Tây' },
    { name: 'Dậu',  center: 270, yinYang: -1, sanYuan: 'Thiên', palace: 7, element: 'Kim',  direction: 'Tây' },
    { name: 'Tân',  center: 285, yinYang: -1, sanYuan: 'Nhân',  palace: 7, element: 'Kim',  direction: 'Tây' },
    { name: 'Tuất', center: 300, yinYang: -1, sanYuan: 'Địa',  palace: 6, element: 'Thổ',  direction: 'Tây Bắc' },
    { name: 'Càn',  center: 315, yinYang: 1,  sanYuan: 'Thiên', palace: 6, element: 'Kim',  direction: 'Tây Bắc' },
    { name: 'Hợi',  center: 330, yinYang: 1,  sanYuan: 'Nhân',  palace: 6, element: 'Thủy', direction: 'Tây Bắc' }
];

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

export const PALACE_SHORT = {
    1: 'BẮC', 2: 'TN', 3: 'ĐÔNG', 4: 'ĐN',
    5: 'TRUNG', 6: 'TB', 7: 'TÂY', 8: 'ĐB', 9: 'NAM'
};

export const PALACE_CENTER_DEG = {
    1: 0, 2: 225, 3: 90, 4: 135, 5: 0, 6: 315, 7: 270, 8: 45, 9: 180
};

export const FORWARD_PATH = [5, 6, 7, 8, 9, 1, 2, 3, 4];
export const REVERSE_PATH = [5, 4, 3, 2, 1, 9, 8, 7, 6];

export const REPLACEMENT_STAR = {
    'Tý': 1, 'Quý': 1, 'Giáp': 1, 'Thân': 1,
    'Khôn': 2, 'Nhâm': 2, 'Ất': 2, 'Mão': 2, 'Mùi': 2,
    'Tuất': 6, 'Càn': 6, 'Hợi': 6, 'Thìn': 6, 'Tốn': 6, 'Tỵ': 6,
    'Cấn': 7, 'Bính': 7, 'Tân': 7, 'Dậu': 7, 'Sửu': 7,
    'Dần': 9, 'Ngọ': 9, 'Canh': 9, 'Đinh': 9
};

export function wrapStar(n) {
    return ((n - 1) % 9 + 9) % 9 + 1;
}

export function getPeriod(year) {
    const y = parseInt(year, 10) || 2025;
    const cycleYear = ((y - 1864) % 180 + 180) % 180;
    return Math.floor(cycleYear / 20) + 1;
}

export function findMountain(degree) {
    let deg = ((degree % 360) + 360) % 360;
    let best = MOUNTAINS[0];
    let bestDiff = 999;
    for (let m of MOUNTAINS) {
        let diff = Math.abs(deg - m.center);
        if (diff > 180) diff = 360 - diff;
        if (diff < bestDiff) {
            bestDiff = diff;
            best = m;
        }
    }
    const isChinhHuong = bestDiff <= 3.0;
    const isKiemHuong = bestDiff > 3.0 && bestDiff <= 7.5;
    return {
        mountain: best,
        diff: bestDiff,
        type: isChinhHuong ? 'chinh_huong' : (isKiemHuong ? 'kiem_huong' : 'khong_vong')
    };
}

export function getOppositeMountain(degree) {
    const oppDeg = (degree + 180) % 360;
    return findMountain(oppDeg);
}

export function flyStars(centerStar, isForward = true) {
    const palaceOrder = [5, 6, 7, 8, 9, 1, 2, 3, 4];
    const result = {};
    for (let i = 0; i < 9; i++) {
        const p = palaceOrder[i];
        const val = isForward ? wrapStar(centerStar + i) : wrapStar(centerStar - i);
        result[p] = val;
    }
    return result;
}

export function determineYinYang(star, sanYuan) {
    if (star === 5) return 1;
    const palaceBaseMountains = {
        1: [ { name: 'Nhâm', sanYuan: 'Địa', yinYang: 1 }, { name: 'Tý', sanYuan: 'Thiên', yinYang: -1 }, { name: 'Quý', sanYuan: 'Nhân', yinYang: -1 } ],
        2: [ { name: 'Mùi', sanYuan: 'Địa', yinYang: -1 }, { name: 'Khôn', sanYuan: 'Thiên', yinYang: 1 }, { name: 'Thân', sanYuan: 'Nhân', yinYang: 1 } ],
        3: [ { name: 'Giáp', sanYuan: 'Địa', yinYang: 1 }, { name: 'Mão', sanYuan: 'Thiên', yinYang: -1 }, { name: 'Ất', sanYuan: 'Nhân', yinYang: -1 } ],
        4: [ { name: 'Thìn', sanYuan: 'Địa', yinYang: -1 }, { name: 'Tốn', sanYuan: 'Thiên', yinYang: 1 }, { name: 'Tỵ', sanYuan: 'Nhân', yinYang: 1 } ],
        6: [ { name: 'Tuất', sanYuan: 'Địa', yinYang: -1 }, { name: 'Càn', sanYuan: 'Thiên', yinYang: 1 }, { name: 'Hợi', sanYuan: 'Nhân', yinYang: 1 } ],
        7: [ { name: 'Canh', sanYuan: 'Địa', yinYang: 1 }, { name: 'Dậu', sanYuan: 'Thiên', yinYang: -1 }, { name: 'Tân', sanYuan: 'Nhân', yinYang: -1 } ],
        8: [ { name: 'Sửu', sanYuan: 'Địa', yinYang: -1 }, { name: 'Cấn', sanYuan: 'Thiên', yinYang: 1 }, { name: 'Dần', sanYuan: 'Nhân', yinYang: 1 } ],
        9: [ { name: 'Bính', sanYuan: 'Địa', yinYang: 1 }, { name: 'Ngọ', sanYuan: 'Thiên', yinYang: -1 }, { name: 'Đinh', sanYuan: 'Nhân', yinYang: -1 } ]
    };
    const group = palaceBaseMountains[star];
    if (!group) return 1;
    const match = group.find(m => m.sanYuan === sanYuan);
    return match ? match.yinYang : 1;
}

// ------------------------------------------------------------
// THUẬT TOÁN TÍNH SAO THỜI GIAN: NIÊN, NGUYỆT, NHẬT, THỜI TINH
// ------------------------------------------------------------

export function getAnnualStar(year, month = 6, day = 15) {
    let effectiveYear = year;
    if (month === 1 || (month === 2 && day < 4)) {
        effectiveYear = year - 1;
    }
    let rem = (effectiveYear - 1982) % 9;
    if (rem < 0) rem += 9;
    let star = 9 - rem;
    if (star === 0) star = 9;
    return star;
}

export function getMonthlyStar(year, month = 1, day = 15) {
    let effectiveYear = year;
    if (month === 1 || (month === 2 && day < 4)) {
        effectiveYear = year - 1;
    }
    const yearZhi = ((effectiveYear - 4) % 12 + 12) % 12; // 0=Tý, 1=Sửu, 2=Dần...
    let baseStar = 2; // Tý Ngọ Mão Dậu khởi 8, Dần Thân Tỵ Hợi khởi 2, Thìn Tuất Sửu Mùi khởi 5
    if ([0, 3, 6, 9].includes(yearZhi)) baseStar = 8;
    else if ([2, 5, 8, 11].includes(yearZhi)) baseStar = 2;
    else baseStar = 5;

    let m = month;
    let monthStar = baseStar - (m - 1);
    return wrapStar(monthStar);
}

export function getDailyStar(year, month, day) {
    const dd = month * 100 + day;
    const isYang = (dd >= 1222 || dd < 621);
    const baseStar = isYang ? 1 : 9;
    const epoch = new Date(2024, 0, 1);
    const current = new Date(year, month - 1, day);
    const diffDays = Math.floor((current.getTime() - epoch.getTime()) / (1000 * 60 * 60 * 24));
    let dayStar = isYang ? (baseStar + (diffDays % 9)) : (baseStar - (diffDays % 9));
    return wrapStar(dayStar);
}

export function getHourlyStar(year, month, day, hourIndex = 7) {
    const dd = month * 100 + day;
    const isYang = (dd >= 1222 || dd < 621);
    const baseStar = isYang ? 1 : 9;
    let hourStar = isYang ? (baseStar + (hourIndex - 1)) : (baseStar - (hourIndex - 1));
    return wrapStar(hourStar);
}

/**
 * Tính toán Tinh Bàn Huyền Không đầy đủ
 */
export function calculateFlyingStars({
    facingDegree = 180,
    buildYear = 2025,
    currentYear = 2026,
    currentMonth = 8,
    currentDay = 19,
    currentHour = 7,
    frontLandscape = 'duong_lo',
    backLandscape = 'nha_cao'
}) {
    const van = getPeriod(buildYear);
    const facingInfo = findMountain(facingDegree);
    const sittingInfo = getOppositeMountain(facingDegree);

    const facingM = facingInfo.mountain;
    const sittingM = sittingInfo.mountain;
    const isKiemHuong = facingInfo.type === 'kiem_huong';

    const vanChart = flyStars(van, true);
    const sonStarAtSitting = vanChart[sittingM.palace];
    const huongStarAtFacing = vanChart[facingM.palace];

    let sonCenterStar = sonStarAtSitting;
    let huongCenterStar = huongStarAtFacing;

    if (isKiemHuong) {
        sonCenterStar = REPLACEMENT_STAR[sittingM.name] || sonStarAtSitting;
        huongCenterStar = REPLACEMENT_STAR[facingM.name] || huongStarAtFacing;
    }

    const sonYinYang = determineYinYang(sonCenterStar, sittingM.sanYuan);
    const huongYinYang = determineYinYang(huongCenterStar, facingM.sanYuan);

    const sonChart = flyStars(sonCenterStar, sonYinYang >= 0);
    const huongChart = flyStars(huongCenterStar, huongYinYang >= 0);

    // Thời gian tinh (Niên, Nguyệt, Nhật, Thời)
    const nienCenter = getAnnualStar(currentYear, currentMonth, currentDay);
    const nguyetCenter = getMonthlyStar(currentYear, currentMonth, currentDay);
    const nhatCenter = getDailyStar(currentYear, currentMonth, currentDay);
    const thoiCenter = getHourlyStar(currentYear, currentMonth, currentDay, currentHour);

    const nienChart = flyStars(nienCenter, false);
    const nguyetChart = flyStars(nguyetCenter, false);
    const nhatChart = flyStars(nhatCenter, false);
    const thoiChart = flyStars(thoiCenter, false);

    const palaces = {};
    for (let p = 1; p <= 9; p++) {
        palaces[p] = {
            palaceId: p,
            palaceName: PALACE_NAMES[p],
            short: PALACE_SHORT[p],
            centerDeg: PALACE_CENTER_DEG[p],
            vanStar: vanChart[p],
            sonStar: sonChart[p],
            huongStar: huongChart[p],
            nienStar: nienChart[p],
            nguyetStar: nguyetChart[p],
            nhatStar: nhatChart[p],
            thoiStar: thoiChart[p],
            isFacing: p === facingM.palace,
            isSitting: p === sittingM.palace
        };
    }

    return {
        van,
        facingDegree,
        facingMountain: facingM.name,
        facingPalace: facingM.palace,
        sittingMountain: sittingM.name,
        sittingPalace: sittingM.palace,
        chartType: facingInfo.type,
        currentYear,
        currentMonth,
        currentDay,
        currentHour,
        palaces
    };
}

/**
 * Trả về thứ tự 9 Cung xếp vào lưới 3x3 sao cho HƯỚNG NHÀ LUÔN Ở TRÊN ĐỈNH (Top Row Center)
 * Hàng 0: Mặt Tiền / Cửa Chính (Trên)
 * Hàng 1: Gian Giữa (Trung Cung)
 * Hàng 2: Đuôi Nhà / Hậu Trạch (Dưới)
 * @param {number} facingPalace - Cung của hướng nhà (1-9)
 * @returns {Array<number>} Mảng 9 ID cung theo thứ tự [R0C0, R0C1, R0C2, R1C0, R1C1, R1C2, R2C0, R2C1, R2C2]
 */
export function getOrientedPalaceGrid(facingPalace) {
    // Bản đồ 8 hướng theo chiều kim đồng hồ quanh 8 cung ngoại vi:
    // [Khảm(1-Bắc), Cấn(8-ĐB), Chấn(3-Đông), Tốn(4-ĐN), Ly(9-Nam), Khôn(2-TN), Đoài(7-Tây), Càn(6-TB)]
    const ring = [1, 8, 3, 4, 9, 2, 7, 6];
    const fIdx = ring.indexOf(facingPalace);
    if (fIdx === -1) {
        // Mặc định hướng Nam (Ly - 9)
        return [4, 9, 2, 3, 5, 7, 8, 1, 6];
    }

    // Xoay sao cho facingPalace nằm ở giữa hàng trên (Top Center - index 1)
    // Các cung:
    // Top Row:    [trái = (fIdx - 1), giữa = fIdx, phải = (fIdx + 1)]
    // Mid Row:    [trái = (fIdx - 2), giữa = 5,    phải = (fIdx + 2)]
    // Bottom Row: [trái = (fIdx - 3), giữa = (fIdx + 4) đối diện, phải = (fIdx + 3)]
    const getP = (offset) => ring[((fIdx + offset) % 8 + 8) % 8];

    return [
        getP(-1), getP(0), getP(1),
        getP(-2), 5,       getP(2),
        getP(-3), getP(4), getP(3)
    ];
}
