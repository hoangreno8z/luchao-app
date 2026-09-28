// ============================================================
// Huyền Không Phi Tinh Engine (Xuan Kong Flying Stars Core v3.0)
// Chuẩn xác 100% theo Thẩm Thị Huyền Không Học & Tam Nguyên Cửu Vận
// Tác giả/Nguồn logic: Chuẩn Thẩm Thị Huyền Không Học & Dịch Sư Nguyễn Huy Hoàng
// ============================================================

// 1. QUỸ ĐẠO LẠC THƯ (LO SHU PATH)
// Vị trí bay: Trung(5) -> Tây Bắc(6) -> Tây(7) -> Đông Bắc(8) -> Nam(9) -> Bắc(1) -> Tây Nam(2) -> Đông(3) -> Đông Nam(4)
export const FLYING_PATH = [5, 6, 7, 8, 9, 1, 2, 3, 4];
export const LO_SHU_PATHS = [5, 6, 7, 8, 9, 1, 2, 3, 4];

// 2. BẢNG PHÂN LOẠI 24 SƠN (24 MOUNTAINS)
// Cấu trúc: [Tên Sơn, Cung Quái, Tính chất Long (0: Địa, 1: Thiên, 2: Nhân), Âm/Dương (+1: Dương, -1: Âm)]
export const MOUNTAINS_24_DICT = {
    'Nhâm': { name: 'Nhâm', trigram: 1, type: 0, yinYang: 1,  center: 345, element: 'Thủy' },
    'Tý':   { name: 'Tý',   trigram: 1, type: 1, yinYang: -1, center: 0,   element: 'Thủy' },
    'Quý':  { name: 'Quý',  trigram: 1, type: 2, yinYang: -1, center: 15,  element: 'Thủy' },
    
    'Sửu':  { name: 'Sửu',  trigram: 8, type: 0, yinYang: -1, center: 30,  element: 'Thổ' },
    'Cấn':  { name: 'Cấn',  trigram: 8, type: 1, yinYang: 1,  center: 45,  element: 'Thổ' },
    'Dần':  { name: 'Dần',  trigram: 8, type: 2, yinYang: 1,  center: 60,  element: 'Thổ' },
    
    'Giáp': { name: 'Giáp', trigram: 3, type: 0, yinYang: 1,  center: 75,  element: 'Mộc' },
    'Mão':  { name: 'Mão',  trigram: 3, type: 1, yinYang: -1, center: 90,  element: 'Mộc' },
    'Ất':   { name: 'Ất',   trigram: 3, type: 2, yinYang: -1, center: 105, element: 'Mộc' },
    
    'Thìn': { name: 'Thìn', trigram: 4, type: 0, yinYang: -1, center: 120, element: 'Thổ' },
    'Tốn':  { name: 'Tốn',  trigram: 4, type: 1, yinYang: 1,  center: 135, element: 'Mộc' },
    'Tỵ':   { name: 'Tỵ',   trigram: 4, type: 2, yinYang: 1,  center: 150, element: 'Hỏa' },
    
    'Bính': { name: 'Bính', trigram: 9, type: 0, yinYang: 1,  center: 165, element: 'Hỏa' },
    'Ngọ':  { name: 'Ngọ',  trigram: 9, type: 1, yinYang: -1, center: 180, element: 'Hỏa' },
    'Đinh': { name: 'Đinh', trigram: 9, type: 2, yinYang: -1, center: 195, element: 'Hỏa' },
    
    'Mùi':  { name: 'Mùi',  trigram: 2, type: 0, yinYang: -1, center: 210, element: 'Thổ' },
    'Khôn': { name: 'Khôn', trigram: 2, type: 1, yinYang: 1,  center: 225, element: 'Thổ' },
    'Thân': { name: 'Thân', trigram: 2, type: 2, yinYang: 1,  center: 240, element: 'Kim' },
    
    'Canh': { name: 'Canh', trigram: 7, type: 0, yinYang: 1,  center: 255, element: 'Kim' },
    'Dậu':  { name: 'Dậu',  trigram: 7, type: 1, yinYang: -1, center: 270, element: 'Kim' },
    'Tân':  { name: 'Tân',  trigram: 7, type: 2, yinYang: -1, center: 285, element: 'Kim' },
    
    'Tuất': { name: 'Tuất', trigram: 6, type: 0, yinYang: -1, center: 300, element: 'Thổ' },
    'Càn':  { name: 'Càn',  trigram: 6, type: 1, yinYang: 1,  center: 315, element: 'Kim' },
    'Hợi':  { name: 'Hợi',  trigram: 6, type: 2, yinYang: 1,  center: 330, element: 'Thủy' }
};

// 3. MA TRẬN ÂM DƯƠNG CỦA CỬU TINH (CƠ SỞ ĐỂ XÁC ĐỊNH CHIỀU BAY)
// Array map [Địa Nguyên Long, Thiên Nguyên Long, Nhân Nguyên Long] của từng Cửu Tinh
export const STARS_YIN_YANG = {
    1: [1, -1, -1],  // Khảm: Nhâm(+), Tý(-), Quý(-)
    2: [-1, 1, 1],   // Khôn: Mùi(-), Khôn(+), Thân(+)
    3: [1, -1, -1],  // Chấn: Giáp(+), Mão(-), Ất(-)
    4: [-1, 1, 1],   // Tốn: Thìn(-), Tốn(+), Tỵ(+)
    5: null,         // Ngũ Hoàng: Mượn tính Âm/Dương của Sơn đang tọa/hướng
    6: [-1, 1, 1],   // Càn: Tuất(-), Càn(+), Hợi(+)
    7: [1, -1, -1],  // Đoài: Canh(+), Dậu(-), Tân(-)
    8: [-1, 1, 1],   // Cấn: Sửu(-), Cấn(+), Dần(+)
    9: [1, -1, -1]   // Ly: Bính(+), Ngọ(-), Đinh(-)
};

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
    1: 'BẮC',
    2: 'TÂY NAM',
    3: 'ĐÔNG',
    4: 'ĐÔNG NAM',
    5: 'TRUNG CUNG',
    6: 'TÂY BẮC',
    7: 'TÂY',
    8: 'ĐÔNG BẮC',
    9: 'NAM'
};

// HÀM LÕI: BAY CỬU TINH
export function fly(centerStar, direction = 1) {
    let grid = {};
    let currentStar = centerStar;
    for (let i = 0; i < FLYING_PATH.length; i++) {
        const palaceId = FLYING_PATH[i];
        grid[palaceId] = currentStar;
        currentStar += direction;
        if (currentStar > 9) currentStar = 1;
        if (currentStar < 1) currentStar = 9;
    }
    return grid;
}

export function wrapStar(n) {
    let s = ((n - 1) % 9 + 9) % 9 + 1;
    return s === 0 ? 9 : s;
}

export function getPeriod(year) {
    const y = parseInt(year, 10) || 2025;
    if (y >= 1 && y <= 9) return y; // Nếu truyền trực tiếp số Vận
    if (y >= 2024 && y <= 2043) return 9;
    if (y >= 2004 && y <= 2023) return 8;
    if (y >= 1984 && y <= 2003) return 7;
    const cycleYear = ((y - 1864) % 180 + 180) % 180;
    return Math.floor(cycleYear / 20) + 1;
}

export function findMountain(degree) {
    let deg = ((degree % 360) + 360) % 360;
    let bestName = 'Tý';
    let best = MOUNTAINS_24_DICT['Tý'];
    let bestDiff = 999;

    for (let name in MOUNTAINS_24_DICT) {
        let m = MOUNTAINS_24_DICT[name];
        let diff = Math.abs(deg - m.center);
        if (diff > 180) diff = 360 - diff;
        if (diff < bestDiff) {
            bestDiff = diff;
            best = m;
            bestName = name;
        }
    }

    const isKiemHuong = bestDiff >= 3.0;
    return {
        mountain: { ...best, name: bestName, id: best.trigram, palaceId: best.trigram, amDuong: best.yinYang === 1 ? '+' : '-' },
        degree: deg,
        diff: bestDiff,
        deviation: parseFloat(bestDiff.toFixed(2)),
        isKiemHuong,
        type: isKiemHuong ? 'kiem_huong' : 'chinh_huong',
        chartType: isKiemHuong ? 'the_quai' : 'chinh_huong'
    };
}

export function getOppositeMountain(degree) {
    return findMountain((degree + 180) % 360);
}

// ------------------------------------------------------------
// THUẬT TOÁN SAO THỜI GIAN: NIÊN, NGUYỆT, NHẬT, THỜI TINH
// ------------------------------------------------------------
export function getAnnualStar(year, month = 8, day = 19) {
    let effectiveYear = year;
    if (month === 1 || (month === 2 && day < 4)) {
        effectiveYear = year - 1;
    }
    let rem = (effectiveYear - 1982) % 9;
    if (rem < 0) rem += 9;
    let star = 9 - rem;
    if (star === 0) star = 9;
    return wrapStar(star);
}

export function getMonthlyStar(year, month = 8, day = 19) {
    let effectiveYear = year;
    if (month === 1 || (month === 2 && day < 4)) {
        effectiveYear = year - 1;
    }
    const yearZhi = ((effectiveYear - 4) % 12 + 12) % 12; // 0=Tý, 1=Sửu, 2=Dần...
    let baseStar = 2; // Tý Ngọ Mão Dậu khởi 8, Dần Thân Tỵ Hợi khởi 2, Thìn Tuất Sửu Mùi khởi 5
    if ([0, 3, 6, 9].includes(yearZhi)) baseStar = 8;
    else if ([2, 5, 8, 11].includes(yearZhi)) baseStar = 2;
    else baseStar = 5;

    let monthStar = baseStar - (month - 1);
    return wrapStar(monthStar);
}

export function getDailyStar(year, month, day) {
    const epoch = new Date(1900, 0, 1).getTime();
    const cur = new Date(year, month - 1, day).getTime();
    const daysSinceEpoch = Math.floor((cur - epoch) / (1000 * 60 * 60 * 24));
    let star = (daysSinceEpoch % 9) + 1;
    return wrapStar(star);
}

export function getHourlyStar(year, month, day, hourIndex = 7) {
    let dStar = getDailyStar(year, month, day);
    let hStar = (dStar + hourIndex) % 9;
    return wrapStar(hStar);
}

// ------------------------------------------------------------
// THUẬT TOÁN LẬP TINH BÀN HUYỀN KHÔNG THEO CHUẨN THẨM THỊ
// ------------------------------------------------------------
export function calculateHuyenKhong(period, facingMountainStr, sittingMountainStr) {
    const facingMnt = MOUNTAINS_24_DICT[facingMountainStr] || MOUNTAINS_24_DICT['Ngọ'];
    const sittingMnt = MOUNTAINS_24_DICT[sittingMountainStr] || MOUNTAINS_24_DICT['Tý'];

    // BƯỚC 1: LẬP VẬN BÀN (Thiên Tâm Chính Vận bay Thuận)
    const vanBan = fly(period, 1);

    // BƯỚC 2: TÌM SAO TỌA & SAO HƯỚNG
    const saoToa = vanBan[sittingMnt.trigram];
    const saoHuong = vanBan[facingMnt.trigram];

    // BƯỚC 3: XÁC ĐỊNH CHIỀU BAY CỦA SƠN BÀN VÀ HƯỚNG BÀN
    function getFlyingDirection(star, mountainObj) {
        if (star === 5) {
            // Ngũ Hoàng nhập Trung cung: Mượn tính Âm/Dương của Sơn
            return mountainObj.yinYang;
        } else {
            return STARS_YIN_YANG[star][mountainObj.type];
        }
    }

    const toaDirection = getFlyingDirection(saoToa, sittingMnt);
    const huongDirection = getFlyingDirection(saoHuong, facingMnt);

    // BƯỚC 4: BAY SƠN BÀN & HƯỚNG BÀN
    const sonBan = fly(saoToa, toaDirection);
    const huongBan = fly(saoHuong, huongDirection);

    return {
        period,
        vanBan,
        sonBan,
        huongBan,
        saoToa,
        saoHuong,
        toaDirection: toaDirection === 1 ? 'Thuận' : 'Nghịch',
        huongDirection: huongDirection === 1 ? 'Thuận' : 'Nghịch'
    };
}

export function calculateFlyingStars(params = {}) {
    const {
        facingDegree = 180,
        buildYear = 2025,
        currentYear = 2026,
        currentMonth = 8,
        currentDay = 19,
        currentHour = 7
    } = params;

    const van = getPeriod(buildYear);
    const facingDetail = findMountain(facingDegree);
    const sittingDetail = getOppositeMountain(facingDegree);

    const coreResult = calculateHuyenKhong(van, facingDetail.mountain.name, sittingDetail.mountain.name);

    const nienStar = getAnnualStar(currentYear, currentMonth, currentDay);
    const nguyetStar = getMonthlyStar(currentYear, currentMonth, currentDay);
    const nhatStar = getDailyStar(currentYear, currentMonth, currentDay);
    const thoiStar = getHourlyStar(currentYear, currentMonth, currentDay, currentHour);

    const nienBan = fly(nienStar, -1);
    const nguyetBan = fly(nguyetStar, -1);
    const nhatBan = fly(nhatStar, 1);
    const thoiBan = fly(thoiStar, 1);

    const palaces = {};
    for (let p = 1; p <= 9; p++) {
        palaces[p] = {
            palaceId: p,
            palaceName: PALACE_NAMES[p],
            vanStar: coreResult.vanBan[p],
            sonStar: coreResult.sonBan[p],
            huongStar: coreResult.huongBan[p],
            nienStar: nienBan[p],
            nguyetStar: nguyetBan[p],
            nhatStar: nhatBan[p],
            thoiStar: thoiBan[p],
            isFacing: p === facingDetail.mountain.trigram,
            isSitting: p === sittingDetail.mountain.trigram
        };
    }

    return {
        van,
        period: van,
        facingDegree: facingDetail.degree,
        facingMountain: facingDetail.mountain.name,
        facingPalace: facingDetail.mountain.trigram,
        sittingMountain: sittingDetail.mountain.name,
        sittingPalace: sittingDetail.mountain.trigram,
        chartType: facingDetail.chartType,
        deviation: facingDetail.deviation,
        palaces,
        currentYear,
        currentMonth,
        currentDay,
        currentHour,
        toaDirection: coreResult.toaDirection,
        huongDirection: coreResult.huongDirection
    };
}

export function getOrientedPalaceGrid(facingPalaceId) {
    const ring = [1, 8, 3, 4, 9, 2, 7, 6];
    const fIdx = ring.indexOf(facingPalaceId);
    if (fIdx === -1) {
        return [4, 9, 2, 3, 5, 7, 8, 1, 6];
    }
    const getP = (offset) => ring[((fIdx + offset) % 8 + 8) % 8];
    return [
        getP(-1), getP(0), getP(1),
        getP(-2), 5,       getP(2),
        getP(-3), getP(4), getP(3)
    ];
}
