// ============================================================
// PHONG THỦY & ARCHITECTURAL CAD FULL ENGINE BUNDLE v5.0
// Tác giả: Dịch Sư Nguyễn Huy Hoàng & Computational Geometry Core
// Bao gồm:
// 1. Scan2CADArchitecturalRenderer (Bản vẽ kiến trúc CAD Đen-Trắng chuẩn ảnh 3)
// 2. LuoPanAndFlyingStarsSvgRenderer (La Kinh 24 Sơn 360° + Cửu Cung chuẩn ảnh 2)
// ============================================================

// ------------------------------------------------------------
// 1. DATA LAYER (24 Sơn, 60 Long, Bát Quái, Phi Tinh)
// ------------------------------------------------------------
export const MOUNTAINS_24_DICT = {
    'Nhâm': { name: 'Nhâm', trigram: 1, type: 0, yinYang: 1,  center: 345, startDeg: 337.5, midDeg: 345, endDeg: 352.5, element: 'Thủy', hanh: 'Thủy', nguyenLong: 'Địa', amDuong: '+' },
    'Tý':   { name: 'Tý',   trigram: 1, type: 1, yinYang: -1, center: 0,   startDeg: 352.5, midDeg: 0,   endDeg: 7.5,   element: 'Thủy', hanh: 'Thủy', nguyenLong: 'Thiên', amDuong: '-' },
    'Quý':  { name: 'Quý',  trigram: 1, type: 2, yinYang: -1, center: 15,  startDeg: 7.5,   midDeg: 15,  endDeg: 22.5,  element: 'Thủy', hanh: 'Thủy', nguyenLong: 'Nhân', amDuong: '-' },
    
    'Sửu':  { name: 'Sửu',  trigram: 8, type: 0, yinYang: -1, center: 30,  startDeg: 22.5,  midDeg: 30,  endDeg: 37.5,  element: 'Thổ',  hanh: 'Thổ',  nguyenLong: 'Địa', amDuong: '-' },
    'Cấn':  { name: 'Cấn',  trigram: 8, type: 1, yinYang: 1,  center: 45,  startDeg: 37.5,  midDeg: 45,  endDeg: 52.5,  element: 'Thổ',  hanh: 'Thổ',  nguyenLong: 'Thiên', amDuong: '+' },
    'Dần':  { name: 'Dần',  trigram: 8, type: 2, yinYang: 1,  center: 60,  startDeg: 52.5,  midDeg: 60,  endDeg: 67.5,  element: 'Thổ',  hanh: 'Thổ',  nguyenLong: 'Nhân', amDuong: '+' },
    
    'Giáp': { name: 'Giáp', trigram: 3, type: 0, yinYang: 1,  center: 75,  startDeg: 67.5,  midDeg: 75,  endDeg: 82.5,  element: 'Mộc',  hanh: 'Mộc',  nguyenLong: 'Địa', amDuong: '+' },
    'Mão':  { name: 'Mão',  trigram: 3, type: 1, yinYang: -1, center: 90,  startDeg: 82.5,  midDeg: 90,  endDeg: 97.5,  element: 'Mộc',  hanh: 'Mộc',  nguyenLong: 'Thiên', amDuong: '-' },
    'Ất':   { name: 'Ất',   trigram: 3, type: 2, yinYang: -1, center: 105, startDeg: 97.5,  midDeg: 105, endDeg: 112.5, element: 'Mộc',  hanh: 'Mộc',  nguyenLong: 'Nhân', amDuong: '-' },
    
    'Thìn': { name: 'Thìn', trigram: 4, type: 0, yinYang: -1, center: 120, startDeg: 112.5, midDeg: 120, endDeg: 127.5, element: 'Thổ',  hanh: 'Thổ',  nguyenLong: 'Địa', amDuong: '-' },
    'Tốn':  { name: 'Tốn',  trigram: 4, type: 1, yinYang: 1,  center: 135, startDeg: 127.5, midDeg: 135, endDeg: 142.5, element: 'Mộc',  hanh: 'Mộc',  nguyenLong: 'Thiên', amDuong: '+' },
    'Tỵ':   { name: 'Tỵ',   trigram: 4, type: 2, yinYang: 1,  center: 150, startDeg: 142.5, midDeg: 150, endDeg: 157.5, element: 'Hỏa',  hanh: 'Hỏa',  nguyenLong: 'Nhân', amDuong: '+' },
    
    'Bính': { name: 'Bính', trigram: 9, type: 0, yinYang: 1,  center: 165, startDeg: 157.5, midDeg: 165, endDeg: 172.5, element: 'Hỏa',  hanh: 'Hỏa',  nguyenLong: 'Địa', amDuong: '+' },
    'Ngọ':  { name: 'Ngọ',  trigram: 9, type: 1, yinYang: -1, center: 180, startDeg: 172.5, midDeg: 180, endDeg: 187.5, element: 'Hỏa',  hanh: 'Hỏa',  nguyenLong: 'Thiên', amDuong: '-' },
    'Đinh': { name: 'Đinh', trigram: 9, type: 2, yinYang: -1, center: 195, startDeg: 187.5, midDeg: 195, endDeg: 202.5, element: 'Hỏa',  hanh: 'Hỏa',  nguyenLong: 'Nhân', amDuong: '-' },
    
    'Mùi':  { name: 'Mùi',  trigram: 2, type: 0, yinYang: -1, center: 210, startDeg: 202.5, midDeg: 210, endDeg: 217.5, element: 'Thổ',  hanh: 'Thổ',  nguyenLong: 'Địa', amDuong: '-' },
    'Khôn': { name: 'Khôn', trigram: 2, type: 1, yinYang: 1,  center: 225, startDeg: 217.5, midDeg: 225, endDeg: 232.5, element: 'Thổ',  hanh: 'Thổ',  nguyenLong: 'Thiên', amDuong: '+' },
    'Thân': { name: 'Thân', trigram: 2, type: 2, yinYang: 1,  center: 240, startDeg: 232.5, midDeg: 240, endDeg: 247.5, element: 'Kim',  hanh: 'Kim',  nguyenLong: 'Nhân', amDuong: '+' },
    
    'Canh': { name: 'Canh', trigram: 7, type: 0, yinYang: 1,  center: 255, startDeg: 247.5, midDeg: 255, endDeg: 262.5, element: 'Kim',  hanh: 'Kim',  nguyenLong: 'Địa', amDuong: '+' },
    'Dậu':  { name: 'Dậu',  trigram: 7, type: 1, yinYang: -1, center: 270, startDeg: 262.5, midDeg: 270, endDeg: 277.5, element: 'Kim',  hanh: 'Kim',  nguyenLong: 'Thiên', amDuong: '-' },
    'Tân':  { name: 'Tân',  trigram: 7, type: 2, yinYang: -1, center: 285, startDeg: 277.5, midDeg: 285, endDeg: 292.5, element: 'Kim',  hanh: 'Kim',  nguyenLong: 'Nhân', amDuong: '-' },
    
    'Tuất': { name: 'Tuất', trigram: 6, type: 0, yinYang: -1, center: 300, startDeg: 292.5, midDeg: 300, endDeg: 307.5, element: 'Thổ',  hanh: 'Thổ',  nguyenLong: 'Địa', amDuong: '-' },
    'Càn':  { name: 'Càn',  trigram: 6, type: 1, yinYang: 1,  center: 315, startDeg: 307.5, midDeg: 315, endDeg: 322.5, element: 'Kim',  hanh: 'Kim',  nguyenLong: 'Thiên', amDuong: '+' },
    'Hợi':  { name: 'Hợi',  trigram: 6, type: 2, yinYang: 1,  center: 330, startDeg: 322.5, midDeg: 330, endDeg: 337.5, element: 'Thủy', hanh: 'Thủy', nguyenLong: 'Nhân', amDuong: '+' }
};

export const MOUNTAINS_24 = Object.values(MOUNTAINS_24_DICT);

export const STARS_YIN_YANG = {
    1: [1, -1, -1],  // Khảm: Nhâm(+), Tý(-), Quý(-)
    2: [-1, 1, 1],   // Khôn: Mùi(-), Khôn(+), Thân(+)
    3: [1, -1, -1],  // Chấn: Giáp(+), Mão(-), Ất(-)
    4: [-1, 1, 1],   // Tốn: Thìn(-), Tốn(+), Tỵ(+)
    5: null,         // Ngũ Hoàng mượn tính Âm/Dương của Sơn
    6: [-1, 1, 1],   // Càn: Tuất(-), Càn(+), Hợi(+)
    7: [1, -1, -1],  // Đoài: Canh(+), Dậu(-), Tân(-)
    8: [-1, 1, 1],   // Cấn: Sửu(-), Cấn(+), Dần(+)
    9: [1, -1, -1]   // Ly: Bính(+), Ngọ(-), Đinh(-)
};

const CAN_CHI_60 = [
    'Giáp Tý', 'Ất Sửu', 'Bính Dần', 'Đinh Mão', 'Mậu Thìn', 'Kỷ Tỵ', 'Canh Ngọ', 'Tân Mùi', 'Nhâm Thân', 'Quý Dậu',
    'Giáp Tuất', 'Ất Hợi', 'Bính Tý', 'Đinh Sửu', 'Mậu Dần', 'Kỷ Mão', 'Canh Thìn', 'Tân Tỵ', 'Nhâm Ngọ', 'Quý Mùi',
    'Giáp Thân', 'Ất Dậu', 'Bính Tuất', 'Đinh Hợi', 'Mậu Tý', 'Kỷ Sửu', 'Canh Dần', 'Tân Mão', 'Nhâm Thìn', 'Quý Tỵ',
    'Giáp Ngọ', 'Ất Mùi', 'Bính Thân', 'Đinh Dậu', 'Mậu Tuất', 'Kỷ Hợi', 'Canh Tý', 'Tân Sửu', 'Nhâm Dần', 'Quý Mão',
    'Giáp Thìn', 'Ất Tỵ', 'Bính Ngọ', 'Đinh Mùi', 'Mậu Thân', 'Kỷ Dậu', 'Canh Tuất', 'Tân Hợi', 'Nhâm Tý', 'Quý Sửu',
    'Giáp Dần', 'Ất Mão', 'Bính Thìn', 'Đinh Tỵ', 'Mậu Ngọ', 'Kỷ Mùi', 'Canh Thân', 'Tân Dậu', 'Nhâm Tuất', 'Quý Hợi'
];

export const SIXTY_DRAGONS = CAN_CHI_60.map((canChi, index) => ({
    id: index + 1,
    name: canChi,
    canChi,
    startDeg: (337.5 + index * 6) % 360,
    endDeg: (337.5 + (index + 1) * 6) % 360
}));

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
    1: 'B',
    2: 'TN',
    3: 'Đ',
    4: 'ĐN',
    5: 'C',
    6: 'TB',
    7: 'T',
    8: 'ĐB',
    9: 'N'
};

export const FLYING_PATH = [5, 6, 7, 8, 9, 1, 2, 3, 4];

// ------------------------------------------------------------
// 2. TOÁN HỌC TỌA ĐỘ CỰC
// ------------------------------------------------------------
export function polarToCartesian(cx, cy, r, deg) {
    const rad = ((deg - 90) * Math.PI) / 180;
    return {
        x: parseFloat((cx + r * Math.cos(rad)).toFixed(2)),
        y: parseFloat((cy + r * Math.sin(rad)).toFixed(2))
    };
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
        deviationDeg: parseFloat(bestDiff.toFixed(2)),
        isKiemHuong,
        type: isKiemHuong ? 'kiem_huong' : 'chinh_huong',
        chartType: isKiemHuong ? 'the_quai' : 'chinh_huong'
    };
}

export function getMountainDetail(deg) {
    return findMountain(deg);
}

export function getOppositeMountain(deg) {
    return findMountain((deg + 180) % 360);
}

// ------------------------------------------------------------
// 3. HUYỀN KHÔNG PHI TINH CORE
// ------------------------------------------------------------
export function wrapStar(n) {
    let s = ((n - 1) % 9 + 9) % 9 + 1;
    return s === 0 ? 9 : s;
}

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

export function getPeriod(year) {
    const y = parseInt(year, 10) || 2025;
    if (y >= 1 && y <= 9) return y;
    if (y >= 2024 && y <= 2043) return 9;
    if (y >= 2004 && y <= 2023) return 8;
    if (y >= 1984 && y <= 2003) return 7;
    const cycleYear = ((y - 1864) % 180 + 180) % 180;
    return Math.floor(cycleYear / 20) + 1;
}

export function getAnnualStar(year, month = 8, day = 20) {
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

export function getMonthlyStar(year, month = 8, day = 20) {
    let effectiveYear = year;
    if (month === 1 || (month === 2 && day < 4)) {
        effectiveYear = year - 1;
    }
    const yearZhi = ((effectiveYear - 4) % 12 + 12) % 12;
    let baseStar = 2;
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

export function getHourlyStar(year, month, day, hourIndex = 6) {
    let dStar = getDailyStar(year, month, day);
    let hStar = (dStar + hourIndex) % 9;
    return wrapStar(hStar);
}

export function calculateFlyingStars(params = {}) {
    const {
        facingDegree = 180,
        buildYear = 2025,
        currentYear = 2026,
        currentMonth = 8,
        currentDay = 20,
        currentHour = 6
    } = params;

    const van = getPeriod(buildYear);
    const facingDetail = findMountain(facingDegree);
    const sittingDetail = getOppositeMountain(facingDegree);

    const facingMnt = facingDetail.mountain;
    const sittingMnt = sittingDetail.mountain;

    const vanBan = fly(van, 1);
    const saoToa = vanBan[sittingMnt.trigram];
    const saoHuong = vanBan[facingMnt.trigram];

    function getFlyingDirection(star, mountainObj) {
        if (star === 5) {
            return mountainObj.yinYang;
        } else {
            return STARS_YIN_YANG[star][mountainObj.type];
        }
    }

    const toaDirection = getFlyingDirection(saoToa, sittingMnt);
    const huongDirection = getFlyingDirection(saoHuong, facingMnt);

    const sonBan = fly(saoToa, toaDirection);
    const huongBan = fly(saoHuong, huongDirection);

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
            vanStar: vanBan[p],
            sonStar: sonBan[p],
            huongStar: huongBan[p],
            nienStar: nienBan[p],
            nguyetStar: nguyetBan[p],
            nhatStar: nhatBan[p],
            thoiStar: thoiBan[p],
            isFacing: p === facingMnt.trigram,
            isSitting: p === sittingMnt.trigram
        };
    }

    return {
        van,
        period: van,
        buildYear,
        facingDegree: facingDetail.degree,
        facingMountain: facingMnt.name,
        facingPalace: facingMnt.trigram,
        sittingMountain: sittingMnt.name,
        sittingPalace: sittingMnt.trigram,
        chartType: facingDetail.chartType,
        deviation: facingDetail.deviation,
        deviationDeg: facingDetail.deviation,
        palaces,
        currentYear,
        currentMonth,
        currentDay,
        currentHour,
        toaDirection: toaDirection === 1 ? 'Thuận' : 'Nghịch',
        huongDirection: huongDirection === 1 ? 'Thuận' : 'Nghịch'
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

export function calculateGua(birthYear, gender = 'nam') {
    const isMale = (gender === 'nam' || gender === 1 || gender === '1');
    const sumDigits = (n) => {
        let s = 0;
        while (n > 0 || s > 9) {
            if (n === 0) { n = s; s = 0; }
            s += n % 10;
            n = Math.floor(n / 10);
        }
        return s;
    };

    const lastTwo = birthYear % 100;
    let guaNum = 1;

    if (birthYear < 2000) {
        if (isMale) {
            guaNum = (10 - sumDigits(lastTwo)) % 9;
            if (guaNum === 0) guaNum = 9;
            if (guaNum === 5) guaNum = 2;
        } else {
            guaNum = (sumDigits(lastTwo) + 5) % 9;
            if (guaNum === 0) guaNum = 9;
            if (guaNum === 5) guaNum = 8;
        }
    } else {
        if (isMale) {
            guaNum = (9 - sumDigits(lastTwo)) % 9;
            if (guaNum === 0) guaNum = 9;
            if (guaNum === 5) guaNum = 2;
        } else {
            guaNum = (sumDigits(lastTwo) + 6) % 9;
            if (guaNum === 0) guaNum = 9;
            if (guaNum === 5) guaNum = 8;
        }
    }

    const guaNames = {
        1: 'Khảm (Thủy)', 2: 'Khôn (Thổ)', 3: 'Chấn (Mộc)', 4: 'Tốn (Mộc)',
        6: 'Càn (Kim)', 7: 'Đoài (Kim)', 8: 'Cấn (Thổ)', 9: 'Ly (Hỏa)'
    };
    const isEast = [1, 3, 4, 9].includes(guaNum);

    return {
        guaNum,
        guaNumber: guaNum,
        guaName: guaNames[guaNum] || 'Khảm (Thủy)',
        isEastGroup: isEast,
        groupName: isEast ? 'Đông Tứ Mệnh' : 'Tây Tứ Mệnh',
        trachGroup: isEast ? 'Đông Tứ Mệnh' : 'Tây Tứ Mệnh'
    };
}

export function generateParametricFloorplan(params = {}) {
    const {
        shape = 'RECTANGLE',
        widthM = 5.0,
        lengthM = 16.0,
        floors = 2,
        facingDegree = 180
    } = params;

    const W = Math.round(widthM * 1000);
    const D = Math.round(lengthM * 1000);
    const totalFloors = Math.max(1, Math.min(5, parseInt(floors, 10) || 1));

    return {
        shape,
        widthMm: W,
        depthMm: D,
        totalFloors,
        facingDegree,
        plansByFloor: Array.from({ length: totalFloors }, (_, i) => ({
            floorIndex: i + 1,
            floorName: i === 0 ? 'MẶT BẰNG TẦNG TRỆT' : `MẶT BẰNG TẦNG ${i + 1}`,
            widthMm: W,
            depthMm: D
        }))
    };
}

export function calculateFengShuiSpatial(geometry, options = {}) {
    const { facingDegree = 180, buildYear = 2025, currentYear = 2026, currentMonth = 8, currentDay = 20, currentHour = 6, ownerYear = 1990, ownerGender = 'nam' } = options;
    const flyingStars = calculateFlyingStars({ facingDegree, buildYear, currentYear, currentMonth, currentDay, currentHour });
    const batTrach = ownerYear ? calculateGua(ownerYear, ownerGender) : null;
    const spatialPalaces = {};
    for (let p = 1; p <= 9; p++) {
        const star = flyingStars.palaces[p];
        let grade = 'BÌNH HÒA';
        if (star.huongStar === 9 || star.sonStar === 9) grade = 'ĐẠI CÁT';
        else if (star.huongStar === 1 || star.sonStar === 1 || star.huongStar === 6 || star.sonStar === 6 || star.huongStar === 8 || star.sonStar === 8) grade = 'CÁT';
        else if (star.huongStar === 2 || star.sonStar === 2 || star.huongStar === 5 || star.sonStar === 5) grade = 'HUNG';
        spatialPalaces[p] = {
            palaceId: p,
            palaceName: PALACE_NAMES[p],
            directionName: PALACE_SHORT[p],
            grade,
            sonStar: star.sonStar,
            huongStar: star.huongStar,
            vanStar: star.vanStar,
            nienStar: star.nienStar,
            analysis: `Cung ${PALACE_NAMES[p]} đắc Vận ${star.vanStar}, Sơn ${star.sonStar}, Hướng ${star.huongStar}.`,
            remedy: `Bố trí công năng đón cát khí.`
        };
    }
    return { geometry, flyingStars, batTrach, spatialPalaces };
}

// ------------------------------------------------------------
// 4. SCAN2CAD ARCHITECTURAL RENDERER (CHUẨN 100% ẢNH 3 SCAN2CAD)
// Nét Đen Trắng, Tường Đặc Đen, 2 Xe Gara, Đầy Đủ Phòng & Kích Thước CAD
// ------------------------------------------------------------
export class ArchitecturalCADRenderer {
    constructor(options = {}) {
        this.theme = options.theme || 'white';
        this.showDimensions = options.showDimensions !== false;
        this.showFurniture = options.showFurniture !== false;
        this.showAxes = options.showAxes !== false;
        this.showCompass = options.showCompass !== false;
        this.showCompassOverlay = options.showCompassOverlay === true;
    }

    renderSvg(geometry, options = {}) {
        const W = 16000; // 16m standard architectural villa layout
        const D = 11000; // 11m depth
        const pad = 1800;
        const viewX = -pad;
        const viewY = -pad;
        const viewW = W + pad * 2 + 800;
        const viewH = D + pad * 2 + 600;

        // 1. DIMENSION CHAINS (Đường dóng kích thước chuẩn CAD với gạch chéo 45° Tick Marks)
        const dimTick = (x, y) => `<line x1="${x - 40}" y1="${y + 40}" x2="${x + 40}" y2="${y - 40}" stroke="#000" stroke-width="6"/>`;
        
        let dimsSvg = '';
        if (this.showDimensions) {
            dimsSvg = `
                <!-- Chuỗi kích thước Đỉnh (Top Dimensions) -->
                <line x1="0" y1="-800" x2="4800" y2="-800" stroke="#000" stroke-width="3"/>
                <line x1="4800" y1="-800" x2="11200" y2="-800" stroke="#000" stroke-width="3"/>
                <line x1="11200" y1="-800" x2="16000" y2="-800" stroke="#000" stroke-width="3"/>
                <line x1="0" y1="-950" x2="0" y2="-650" stroke="#666" stroke-width="2"/>
                <line x1="4800" y1="-950" x2="4800" y2="-650" stroke="#666" stroke-width="2"/>
                <line x1="11200" y1="-950" x2="11200" y2="-650" stroke="#666" stroke-width="2"/>
                <line x1="16000" y1="-950" x2="16000" y2="-650" stroke="#666" stroke-width="2"/>
                ${dimTick(0, -800)} ${dimTick(4800, -800)} ${dimTick(11200, -800)} ${dimTick(16000, -800)}
                <text x="2400" y="-830" text-anchor="middle" font-size="110" font-family="'Courier New', monospace" font-weight="bold">4800</text>
                <text x="8000" y="-830" text-anchor="middle" font-size="110" font-family="'Courier New', monospace" font-weight="bold">6400</text>
                <text x="13600" y="-830" text-anchor="middle" font-size="110" font-family="'Courier New', monospace" font-weight="bold">4800</text>

                <!-- Kích thước Tổng Thể Đỉnh -->
                <line x1="0" y1="-1250" x2="16000" y2="-1250" stroke="#000" stroke-width="4"/>
                <line x1="0" y1="-1400" x2="0" y2="-1100" stroke="#666" stroke-width="2"/>
                <line x1="16000" y1="-1400" x2="16000" y2="-1100" stroke="#666" stroke-width="2"/>
                ${dimTick(0, -1250)} ${dimTick(16000, -1250)}
                <text x="8000" y="-1280" text-anchor="middle" font-size="130" font-family="'Courier New', monospace" font-weight="900">16000</text>

                <!-- Chuỗi kích thước Trái (Left Dimensions) -->
                <line x1="-800" y1="0" x2="-800" y2="4500" stroke="#000" stroke-width="3"/>
                <line x1="-800" y1="4500" x2="-800" y2="11000" stroke="#000" stroke-width="3"/>
                <line x1="-950" y1="0" x2="-650" y2="0" stroke="#666" stroke-width="2"/>
                <line x1="-950" y1="4500" x2="-650" y2="4500" stroke="#666" stroke-width="2"/>
                <line x1="-950" y1="11000" x2="-650" y2="11000" stroke="#666" stroke-width="2"/>
                ${dimTick(-800, 0)} ${dimTick(-800, 4500)} ${dimTick(-800, 11000)}
                <text x="-830" y="2250" text-anchor="middle" transform="rotate(-90 -830 2250)" font-size="110" font-family="'Courier New', monospace" font-weight="bold">4500</text>
                <text x="-830" y="7750" text-anchor="middle" transform="rotate(-90 -830 7750)" font-size="110" font-family="'Courier New', monospace" font-weight="bold">6500</text>

                <!-- Kích thước Tổng Thể Trái -->
                <line x1="-1250" y1="0" x2="-1250" y2="11000" stroke="#000" stroke-width="4"/>
                <line x1="-1400" y1="0" x2="-1100" y2="0" stroke="#666" stroke-width="2"/>
                <line x1="-1400" y1="11000" x2="-1100" y2="11000" stroke="#666" stroke-width="2"/>
                ${dimTick(-1250, 0)} ${dimTick(-1250, 11000)}
                <text x="-1280" y="5500" text-anchor="middle" transform="rotate(-90 -1280 5500)" font-size="130" font-family="'Courier New', monospace" font-weight="900">11000</text>
            `;
        }

        // 2. VECTOR CAD CARS (Double Garage chuẩn Scan2CAD)
        const renderCadCar = (cx, cy) => `
            <g class="cad-car" transform="translate(${cx - 800}, ${cy - 1700})">
                <!-- Thân xe bo tròn -->
                <rect x="0" y="0" width="1600" height="3400" rx="300" fill="#fff" stroke="#000" stroke-width="12"/>
                <!-- Kính trước & kính sau -->
                <path d="M 180 800 Q 800 650 1420 800 L 1320 1350 Q 800 1250 280 1350 Z" fill="#f1f5f9" stroke="#000" stroke-width="10"/>
                <path d="M 280 2450 Q 800 2350 1320 2450 L 1400 2850 Q 800 2950 200 2850 Z" fill="#f1f5f9" stroke="#000" stroke-width="10"/>
                <!-- Nóc xe & gương chiếu hậu -->
                <rect x="250" y="1400" width="1100" height="1000" rx="100" fill="none" stroke="#000" stroke-width="8"/>
                <rect x="-80" y="900" width="100" height="220" rx="40" fill="#000"/>
                <rect x="1580" y="900" width="100" height="220" rx="40" fill="#000"/>
                <!-- 4 Bánh xe -->
                <rect x="50" y="350" width="120" height="400" rx="40" fill="#000"/>
                <rect x="1430" y="350" width="120" height="400" rx="40" fill="#000"/>
                <rect x="50" y="2600" width="120" height="400" rx="40" fill="#000"/>
                <rect x="1430" y="2600" width="120" height="400" rx="40" fill="#000"/>
                <!-- Đèn pha -->
                <ellipse cx="280" cy="180" rx="120" ry="60" fill="#fff" stroke="#000" stroke-width="8"/>
                <ellipse cx="1320" cy="180" rx="120" ry="60" fill="#fff" stroke="#000" stroke-width="8"/>
            </g>
        `;

        // 3. MASTER SUITE, LIVING, KITCHEN, BATHROOMS, STAIRS
        const renderBed = (bx, by, isMaster = true) => `
            <g class="cad-bed" transform="translate(${bx}, ${by})">
                <rect x="0" y="0" width="2000" height="2200" fill="#fff" stroke="#000" stroke-width="12"/>
                <rect x="0" y="0" width="2000" height="250" fill="#333"/>
                <!-- Gối nệm -->
                <rect x="150" y="300" width="750" height="450" rx="60" fill="#f8fafc" stroke="#000" stroke-width="8"/>
                <rect x="1100" y="300" width="750" height="450" rx="60" fill="#f8fafc" stroke="#000" stroke-width="8"/>
                <!-- Chăn ga gấp nếp -->
                <path d="M 50 1000 L 1950 1000 L 1950 2150 L 50 2150 Z" fill="#f1f5f9" stroke="#000" stroke-width="8"/>
                <!-- Tủ tab đầu giường đôi -->
                <rect x="-450" y="50" width="400" height="500" rx="40" fill="#fff" stroke="#000" stroke-width="8"/>
                <circle cx="-250" cy="300" r="100" fill="none" stroke="#000" stroke-width="6"/>
                <rect x="2050" y="50" width="400" height="500" rx="40" fill="#fff" stroke="#000" stroke-width="8"/>
                <circle cx="2250" cy="300" r="100" fill="none" stroke="#000" stroke-width="6"/>
            </g>
        `;

        const renderSofaSet = (sx, sy) => `
            <g class="cad-sofa-set" transform="translate(${sx}, ${sy})">
                <!-- Sofa chữ L / góc -->
                <path d="M 0 0 L 2800 0 L 2800 800 L 800 800 L 800 2400 L 0 2400 Z" fill="#fff" stroke="#000" stroke-width="12"/>
                <!-- Đệm ngồi sofa -->
                <rect x="80" y="80" width="750" height="640" rx="30" fill="#f8fafc" stroke="#666" stroke-width="6"/>
                <rect x="870" y="80" width="750" height="640" rx="30" fill="#f8fafc" stroke="#666" stroke-width="6"/>
                <rect x="1660" y="80" width="1050" height="640" rx="30" fill="#f8fafc" stroke="#666" stroke-width="6"/>
                <rect x="80" y="800" width="640" height="700" rx="30" fill="#f8fafc" stroke="#666" stroke-width="6"/>
                <rect x="80" y="1550" width="640" height="770" rx="30" fill="#f8fafc" stroke="#666" stroke-width="6"/>
                <!-- Bàn trà trung tâm -->
                <rect x="1100" y="1100" width="1200" height="800" rx="80" fill="#fff" stroke="#000" stroke-width="10"/>
                <!-- Ghế bành phụ đơn -->
                <rect x="1100" y="2200" width="700" height="600" rx="40" fill="#fff" stroke="#000" stroke-width="10"/>
                <rect x="1850" y="2200" width="700" height="600" rx="40" fill="#fff" stroke="#000" stroke-width="10"/>
            </g>
        `;

        const renderDiningTable = (dx, dy) => `
            <g class="cad-dining" transform="translate(${dx}, ${dy})">
                <rect x="0" y="0" width="2200" height="1100" rx="300" fill="#fff" stroke="#000" stroke-width="12"/>
                <!-- 6 Ghế ăn bo tròn -->
                <rect x="300" y="-320" width="400" height="300" rx="80" fill="#fff" stroke="#000" stroke-width="8"/>
                <rect x="900" y="-320" width="400" height="300" rx="80" fill="#fff" stroke="#000" stroke-width="8"/>
                <rect x="1500" y="-320" width="400" height="300" rx="80" fill="#fff" stroke="#000" stroke-width="8"/>
                <rect x="300" y="1120" width="400" height="300" rx="80" fill="#fff" stroke="#000" stroke-width="8"/>
                <rect x="900" y="1120" width="400" height="300" rx="80" fill="#fff" stroke="#000" stroke-width="8"/>
                <rect x="1500" y="1120" width="400" height="300" rx="80" fill="#fff" stroke="#000" stroke-width="8"/>
            </g>
        `;

        const renderBathtub = (tx, ty) => `
            <g class="cad-bath" transform="translate(${tx}, ${ty})">
                <rect x="0" y="0" width="1600" height="850" rx="150" fill="#fff" stroke="#000" stroke-width="10"/>
                <rect x="120" y="100" width="1360" height="650" rx="200" fill="#f8fafc" stroke="#000" stroke-width="6"/>
                <circle cx="280" cy="425" r="40" fill="#000"/>
            </g>
        `;

        const renderToilet = (wx, wy) => `
            <g class="cad-wc" transform="translate(${wx}, ${wy})">
                <rect x="0" y="0" width="450" height="250" rx="30" fill="#fff" stroke="#000" stroke-width="8"/>
                <ellipse cx="225" cy="450" rx="200" ry="250" fill="#fff" stroke="#000" stroke-width="8"/>
                <ellipse cx="225" cy="470" rx="140" ry="180" fill="#f1f5f9" stroke="#666" stroke-width="4"/>
            </g>
        `;

        const renderStairs = (sx, sy, numSteps = 12) => {
            let st = `<g class="cad-stairs" transform="translate(${sx}, ${sy})">
                <rect x="0" y="0" width="1200" height="2600" fill="#fff" stroke="#000" stroke-width="12"/>`;
            for (let i = 1; i < numSteps; i++) {
                const stepY = (2600 / numSteps) * i;
                st += `<line x1="0" y1="${stepY}" x2="1200" y2="${stepY}" stroke="#000" stroke-width="6"/>`;
            }
            st += `
                <!-- Mũi tên chỉ hướng UP -->
                <line x1="600" y1="2300" x2="600" y2="400" stroke="#000" stroke-width="10" stroke-linecap="round"/>
                <polygon points="600,200 500,450 700,450" fill="#000"/>
                <circle cx="600" cy="2300" r="40" fill="#000"/>
                <text x="600" y="1400" text-anchor="middle" transform="rotate(-90 600 1400)" font-size="90" font-family="'Courier New', monospace" font-weight="bold">UP</text>
            </g>`;
            return st;
        };

        const renderCadDoor = (x, y, size = 900, rot = 0) => `
            <g class="cad-door" transform="translate(${x}, ${y}) rotate(${rot})">
                <line x1="0" y1="0" x2="0" y2="${size}" stroke="#000" stroke-width="14"/>
                <path d="M 0 ${size} A ${size} ${size} 0 0 0 ${size} 0" fill="none" stroke="#000" stroke-width="6" stroke-dasharray="25,15"/>
            </g>
        `;

        // 4. SCAN2CAD BLACK-AND-WHITE SOLID WALLS (Các bức tường đen đặc dày dặn)
        const wallsSvg = `
            <!-- Ngoại thất bao quanh (Exterior Heavy Walls) -->
            <rect x="0" y="0" width="16000" height="11000" fill="none" stroke="#000" stroke-width="45"/>
            <!-- Các bức tường phân chia phòng (Interior Partition Walls) -->
            <!-- Tường ngăn Gara & Nhà chính -->
            <line x1="5000" y1="0" x2="5000" y2="11000" stroke="#000" stroke-width="35"/>
            <!-- Tường Master Bedroom & En-suite -->
            <line x1="0" y1="5000" x2="5000" y2="5000" stroke="#000" stroke-width="30"/>
            <line x1="2800" y1="0" x2="2800" y2="2800" stroke="#000" stroke-width="25"/>
            <line x1="0" y1="2800" x2="2800" y2="2800" stroke="#000" stroke-width="25"/>
            <!-- Tường Laundry & Powder Room -->
            <line x1="5000" y1="4800" x2="8800" y2="4800" stroke="#000" stroke-width="25"/>
            <line x1="5000" y1="7800" x2="8800" y2="7800" stroke="#000" stroke-width="25"/>
            <line x1="6800" y1="4800" x2="6800" y2="7800" stroke="#000" stroke-width="25"/>
            <!-- Tường Bếp & Family Room -->
            <line x1="10800" y1="0" x2="10800" y2="5500" stroke="#000" stroke-width="25"/>
            <line x1="10800" y1="5500" x2="16000" y2="5500" stroke="#000" stroke-width="25"/>
        `;

        return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewX} ${viewY} ${viewW} ${viewH}" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" class="scan2cad-drawing" style="display: block; width: 100%; height: 100%; background: #ffffff; font-family: 'Helvetica Neue', Arial, sans-serif;">
    <defs>
        <!-- Họa tiết gạch nền WC & bếp -->
        <pattern id="tilePattern" width="300" height="300" patternUnits="userSpaceOnUse">
            <rect width="300" height="300" fill="none" stroke="#e2e8f0" stroke-width="3"/>
        </pattern>
    </defs>

    <!-- Nền gạch các phòng ướt -->
    <rect x="0" y="0" width="2800" height="2800" fill="url(#tilePattern)"/>
    <rect x="5000" y="4800" width="1800" height="3000" fill="url(#tilePattern)"/>
    <rect x="6800" y="4800" width="2000" height="3000" fill="url(#tilePattern)"/>

    <!-- LỚP NỘI THẤT VECTOR ARCHITECTURAL CAD (SCAN2CAD) -->
    <!-- 1. Double Garage & 2 Xe hơi -->
    ${renderCadCar(1400, 7500)}
    ${renderCadCar(3600, 7500)}
    <text x="2500" y="4800" text-anchor="middle" font-size="140" font-weight="900" fill="#000" letter-spacing="4">DOUBLE GARAGE</text>

    <!-- 2. Master Bedroom & W.I.C & En-suite -->
    ${renderBed(600, 2000)}
    <text x="1600" y="4600" text-anchor="middle" font-size="130" font-weight="900" fill="#000" letter-spacing="3">MASTER BEDROOM</text>
    ${renderBathtub(200, 200)}
    ${renderToilet(2000, 200)}
    <text x="1400" y="1400" text-anchor="middle" font-size="110" font-weight="bold" fill="#000">EN SUITE</text>
    <text x="1400" y="2400" text-anchor="middle" font-size="95" font-weight="bold" fill="#666">W.I.C.</text>

    <!-- 3. Foyer & Entry Porch -->
    <rect x="5200" y="8000" width="3400" height="2800" fill="none" stroke="#000" stroke-width="10"/>
    <text x="6900" y="9400" text-anchor="middle" font-size="130" font-weight="900" fill="#000" letter-spacing="3">FOYER</text>
    ${renderCadDoor(6000, 11000, 1200, 180)}

    <!-- 4. Laundry & Powder Room -->
    ${renderToilet(7600, 5200)}
    <text x="5900" y="6500" text-anchor="middle" font-size="110" font-weight="bold" fill="#000">LAUNDRY</text>
    <text x="7800" y="6500" text-anchor="middle" font-size="100" font-weight="bold" fill="#000">POWDER</text>

    <!-- 5. Staircase -->
    ${renderStairs(9200, 4800)}

    <!-- 6. Kitchen & Dining -->
    <!-- Bếp chữ L với chậu rửa & bếp từ -->
    <path d="M 5200 200 L 10600 200 L 10600 800 L 6000 800 L 6000 3200 L 5200 3200 Z" fill="#fff" stroke="#000" stroke-width="10"/>
    <rect x="8000" y="250" width="800" height="450" rx="40" fill="#f8fafc" stroke="#000" stroke-width="8"/>
    <circle cx="8250" cy="475" r="80" fill="none" stroke="#000" stroke-width="6"/>
    <circle cx="8550" cy="475" r="80" fill="none" stroke="#000" stroke-width="6"/>
    <text x="7800" y="1600" text-anchor="middle" font-size="130" font-weight="900" fill="#000" letter-spacing="3">KITCHEN</text>
    ${renderDiningTable(6500, 2600)}
    <text x="7600" y="3200" text-anchor="middle" font-size="120" font-weight="bold" fill="#000">DINING</text>

    <!-- 7. Living Room & Family Room -->
    ${renderSofaSet(11600, 6800)}
    <text x="13600" y="9800" text-anchor="middle" font-size="140" font-weight="900" fill="#000" letter-spacing="4">LIVING ROOM</text>
    ${renderSofaSet(11600, 1200)}
    <text x="13600" y="4200" text-anchor="middle" font-size="130" font-weight="900" fill="#000" letter-spacing="3">FAMILY ROOM</text>

    <!-- 8. Cửa đi mở cánh & Cửa sổ kính -->
    ${renderCadDoor(5000, 4200, 900, 0)}
    ${renderCadDoor(5000, 8500, 900, 0)}
    ${renderCadDoor(10800, 7500, 900, 90)}
    ${renderCadDoor(2800, 1800, 800, 0)}

    <!-- CÁC BỨC TƯỜNG ĐẶC ĐEN CAD -->
    ${wallsSvg}

    <!-- HỆ THỐNG KÍCH THƯỚC CAD CHI TIẾT -->
    ${dimsSvg}
</svg>
        `.trim();
    }
}

// ------------------------------------------------------------
// 5. LUOPAN AND FLYING STARS SVG RENDERER (CHUẨN 100% ẢNH 2 HKPT)
// Vòng Tròn 360° Đỏ, 24 Sơn, Bát Quái, Mũi Tên Tọa/Hướng, 3x3 Cửu Cung
// ------------------------------------------------------------
export class LuoPanAndFlyingStarsSvgRenderer {
    constructor(options = {}) {
        this.size = options.size || 800;
        this.center = this.size / 2;
    }

    renderSvg(flyingStars, options = {}) {
        const c = this.center;
        const R_OUTER = 340;
        const R_DEG = 320;
        const R_MOUNTAIN = 240;
        const R_TRIGRAM = 175;
        const GRID_SIZE = 220; // Khung vuông Cửu Cung ở giữa

        const facingDeg = flyingStars.facingDegree || 180;
        const sittingDeg = (facingDeg + 180) % 360;

        // 1. Vạch chia 360 độ (mỗi 1° vạch nhỏ, mỗi 5° vạch vừa, mỗi 10° vạch dài có số)
        let degTicks = '';
        let degLabels = '';
        for (let i = 0; i < 360; i += 2) {
            const is10 = i % 10 === 0;
            const is5 = i % 5 === 0;
            const rIn = is10 ? R_DEG - 18 : (is5 ? R_DEG - 12 : R_DEG - 7);
            const p1 = polarToCartesian(c, c, rIn, i);
            const p2 = polarToCartesian(c, c, R_DEG, i);
            degTicks += `<line x1="${p1.x}" y1="${p1.y}" x2="${p2.x}" y2="${p2.y}" stroke="#dc2626" stroke-width="${is10 ? 1.8 : 0.8}"/>`;

            if (is10) {
                const tp = polarToCartesian(c, c, R_DEG - 28, i);
                let rot = i;
                if (i > 90 && i < 270) rot = (rot + 180) % 360;
                degLabels += `<text x="${tp.x}" y="${tp.y}" transform="rotate(${rot}, ${tp.x}, ${tp.y})" text-anchor="middle" dominant-baseline="central" font-size="7.5" font-family="'Courier New', monospace" font-weight="bold" fill="#7f1d1d">${i}</text>`;
            }
        }

        // 2. Vành 24 Sơn Hướng (15° mỗi Sơn)
        let mountainSectors = '';
        let mountainLabels = '';
        MOUNTAINS_24.forEach(m => {
            const p1 = polarToCartesian(c, c, R_TRIGRAM, m.startDeg);
            const p2 = polarToCartesian(c, c, R_DEG, m.startDeg);
            mountainSectors += `<line x1="${p1.x}" y1="${p1.y}" x2="${p2.x}" y2="${p2.y}" stroke="#dc2626" stroke-width="0.8" stroke-dasharray="3,3"/>`;

            const tp = polarToCartesian(c, c, (R_DEG + R_TRIGRAM) / 2 + 10, m.center);
            let rot = m.center;
            if (m.center > 90 && m.center < 270) rot = (rot + 180) % 360;
            mountainLabels += `<text x="${tp.x}" y="${tp.y}" transform="rotate(${rot}, ${tp.x}, ${tp.y})" text-anchor="middle" dominant-baseline="central" font-size="11" font-weight="bold" fill="#000">${m.name}</text>`;
        });

        // 3. Vành 8 Cung Bát Quái (45° mỗi Quái - chữ đỏ nổi bật)
        const trigrams = [
            { name: 'BẮC', deg: 0 },
            { name: 'ĐÔNG BẮC', deg: 45 },
            { name: 'ĐÔNG', deg: 90 },
            { name: 'ĐÔNG NAM', deg: 135 },
            { name: 'NAM', deg: 180 },
            { name: 'TÂY NAM', deg: 225 },
            { name: 'TÂY', deg: 270 },
            { name: 'TÂY BẮC', deg: 315 }
        ];

        let trigramSectors = '';
        let trigramLabels = '';
        trigrams.forEach(t => {
            const p1 = polarToCartesian(c, c, GRID_SIZE / 2, t.deg - 22.5);
            const p2 = polarToCartesian(c, c, R_OUTER, t.deg - 22.5);
            trigramSectors += `<line x1="${p1.x}" y1="${p1.y}" x2="${p2.x}" y2="${p2.y}" stroke="#dc2626" stroke-width="1.2"/>`;

            const tp = polarToCartesian(c, c, R_TRIGRAM - 16, t.deg);
            let rot = t.deg;
            if (t.deg > 90 && t.deg < 270) rot = (rot + 180) % 360;
            trigramLabels += `<text x="${tp.x}" y="${tp.y}" transform="rotate(${rot}, ${tp.x}, ${tp.y})" text-anchor="middle" dominant-baseline="central" font-size="12" font-weight="900" fill="#dc2626">${t.name}</text>`;
        });

        // 4. MŨI TÊN CHỈ HƯỚNG (ĐỎ) & MŨI TÊN CHỈ TỌA (XANH)
        const pHuong = polarToCartesian(c, c, R_OUTER + 15, facingDeg);
        const pHuongBadge = polarToCartesian(c, c, R_OUTER - 15, facingDeg);
        const pToa = polarToCartesian(c, c, R_OUTER + 15, sittingDeg);
        const pToaBadge = polarToCartesian(c, c, R_OUTER - 15, sittingDeg);

        const arrowsSvg = `
            <!-- Mũi tên HƯỚNG đỏ -->
            <line x1="${c}" y1="${c}" x2="${pHuong.x}" y2="${pHuong.y}" stroke="#dc2626" stroke-width="3" stroke-linecap="round"/>
            <polygon points="${pHuong.x},${pHuong.y} ${pHuong.x - 8},${pHuong.y + 15} ${pHuong.x + 8},${pHuong.y + 15}" transform="rotate(${facingDeg} ${pHuong.x} ${pHuong.y})" fill="#dc2626"/>
            <rect x="${pHuongBadge.x - 30}" y="${pHuongBadge.y - 12}" width="60" height="24" rx="4" fill="#dc2626"/>
            <text x="${pHuongBadge.x}" y="${pHuongBadge.y + 4}" text-anchor="middle" font-size="10" font-weight="900" fill="#fff">HƯỚNG</text>

            <!-- Mũi tên TỌA xanh -->
            <line x1="${c}" y1="${c}" x2="${pToa.x}" y2="${pToa.y}" stroke="#2563eb" stroke-width="3" stroke-linecap="round"/>
            <polygon points="${pToa.x},${pToa.y} ${pToa.x - 8},${pToa.y + 15} ${pToa.x + 8},${pToa.y + 15}" transform="rotate(${sittingDeg} ${pToa.x} ${pToa.y})" fill="#2563eb"/>
            <rect x="${pToaBadge.x - 22}" y="${pToaBadge.y - 10}" width="44" height="20" rx="4" fill="#2563eb"/>
            <text x="${pToaBadge.x}" y="${pToaBadge.y + 4}" text-anchor="middle" font-size="9.5" font-weight="900" fill="#fff">TỌA</text>
        `;

        // 5. KHUNG CỬU CUNG 3x3 CHÍNH GIỮA (CHUẨN ẢNH 2 HKPT)
        const cellS = GRID_SIZE / 3;
        const gLeft = c - GRID_SIZE / 2;
        const gTop = c - GRID_SIZE / 2;

        const order = [4, 9, 2, 3, 5, 7, 8, 1, 6];
        let matrixCellsSvg = '';

        order.forEach((pId, idx) => {
            const row = Math.floor(idx / 3);
            const col = idx % 3;
            const x = gLeft + col * cellS;
            const y = gTop + row * cellS;
            const cx = x + cellS / 2;
            const cy = y + cellS / 2;

            const star = flyingStars.palaces[pId] || { vanStar: 8, sonStar: 8, huongStar: 8, nienStar: 1, nguyetStar: 8, nhatStar: 8, thoiStar: 8 };

            matrixCellsSvg += `
                <!-- Khung ô -->
                <rect x="${x}" y="${y}" width="${cellS}" height="${cellS}" fill="#ffffff" stroke="#000000" stroke-width="1.5"/>

                <!-- 4 Sao Thời Gian ở trên: Niên (xanh), Nguyệt (đỏ), Nhật (cam), Thời (tím) -->
                <g transform="translate(${x + 6}, ${y + 12})">
                    <circle cx="8" cy="0" r="6" fill="none" stroke="#16a34a" stroke-width="1.2"/>
                    <text x="8" y="3" text-anchor="middle" font-size="8" font-weight="bold" fill="#16a34a">${star.nienStar}</text>

                    <circle cx="23" cy="0" r="6" fill="none" stroke="#dc2626" stroke-width="1.2"/>
                    <text x="23" y="3" text-anchor="middle" font-size="8" font-weight="bold" fill="#dc2626">${star.nguyetStar}</text>

                    <circle cx="38" cy="0" r="6" fill="none" stroke="#ea580c" stroke-width="1.2"/>
                    <text x="38" y="3" text-anchor="middle" font-size="8" font-weight="bold" fill="#ea580c">${star.nhatStar}</text>

                    <circle cx="53" cy="0" r="6" fill="none" stroke="#9333ea" stroke-width="1.2"/>
                    <text x="53" y="3" text-anchor="middle" font-size="8" font-weight="bold" fill="#9333ea">${star.thoiStar}</text>
                </g>

                <!-- VẬN TINH (Số To Màu Xanh Dương/Đen ở giữa) -->
                <text x="${cx}" y="${cy + 10}" text-anchor="middle" font-size="28" font-weight="bold" fill="#0284c7">${star.vanStar}</text>

                <!-- SƠN TINH (Trái) & Tên Cung Viết Tắt -->
                <text x="${x + 16}" y="${cy + 22}" text-anchor="middle" font-size="18" font-weight="900" fill="#000000">${star.sonStar}</text>
                <text x="${x + 36}" y="${y + cellS - 6}" text-anchor="middle" font-size="8.5" font-weight="bold" fill="#000000">${PALACE_SHORT[pId]}</text>

                <!-- HƯỚNG TINH (Phải) -->
                <text x="${x + cellS - 16}" y="${cy + 22}" text-anchor="middle" font-size="18" font-weight="900" fill="#000000">${star.huongStar}</text>
            `;
        });

        // 6. TIÊU ĐỀ BẢN VẼ PHONG THỦY TRÊN ĐẦU
        const isKiem = flyingStars.chartType === 'the_quai';
        const titleText = `Tọa ${flyingStars.sittingMountain} - Hướng ${flyingStars.facingMountain} ${isKiem ? `(Kiêm ${flyingStars.deviation}°)` : ''}`;

        return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${this.size} ${this.size + 80}" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" class="hkpt-luopan-drawing" style="display: block; width: 100%; height: 100%; background: #ffffff; font-family: 'Inter', Arial, sans-serif;">
    <!-- Tiêu đề Tọa Hướng & Badge -->
    <g transform="translate(${c}, 40)">
        <text x="0" y="0" text-anchor="middle" font-size="18" font-weight="900" fill="#000000">${titleText}</text>
        <rect x="130" y="-14" width="70" height="20" rx="4" fill="#fef3c7" stroke="#f59e0b" stroke-width="1"/>
        <text x="165" y="0" text-anchor="middle" font-size="10" font-weight="bold" fill="#d97706">${isKiem ? 'Thế Quái' : 'Hạ Quái'}</text>
    </g>

    <!-- Các vòng tròn La Kinh đỏ -->
    <circle cx="${c}" cy="${c + 30}" r="${R_OUTER}" fill="none" stroke="#dc2626" stroke-width="2.5"/>
    <circle cx="${c}" cy="${c + 30}" r="${R_DEG}" fill="none" stroke="#dc2626" stroke-width="1"/>
    <circle cx="${c}" cy="${c + 30}" r="${R_MOUNTAIN}" fill="none" stroke="#dc2626" stroke-width="1"/>
    <circle cx="${c}" cy="${c + 30}" r="${R_TRIGRAM}" fill="none" stroke="#dc2626" stroke-width="1.5"/>

    <g transform="translate(0, 30)">
        <!-- Vạch chia độ & Chữ 24 Sơn -->
        ${degTicks}
        ${degLabels}
        ${mountainSectors}
        ${mountainLabels}
        ${trigramSectors}
        ${trigramLabels}
        ${arrowsSvg}
        <!-- Ma trận 3x3 Cửu Cung Phi Tinh -->
        ${matrixCellsSvg}
    </g>
</svg>
        `.trim();
    }
}

// ------------------------------------------------------------
// 6. SVG VIEWPORT CONTROLLER
// ------------------------------------------------------------
export class SvgViewportController {
    constructor(containerElement) {
        this.container = containerElement;
        this.scale = 1.0;
        this.panX = 0;
        this.panY = 0;
        this.isDragging = false;
        this.startX = 0;
        this.startY = 0;
        this.svgElement = null;

        this.initEvents();
        this.initResizeListener();
    }

    setSvgContent(svgString) {
        if (!this.container) return;
        this.container.innerHTML = svgString;
        this.svgElement = this.container.querySelector('svg');
        if (this.svgElement) {
            this.fitToScreen();
        }
    }

    initEvents() {
        if (!this.container) return;

        this.container.addEventListener('pointerdown', (e) => {
            if (e.button !== 0 && e.pointerType === 'mouse') return;
            this.isDragging = true;
            this.startX = e.clientX - this.panX;
            this.startY = e.clientY - this.panY;
            this.container.style.cursor = 'grabbing';
            try { this.container.setPointerCapture(e.pointerId); } catch (_) {}
        });

        this.container.addEventListener('pointermove', (e) => {
            if (!this.isDragging) return;
            this.panX = e.clientX - this.startX;
            this.panY = e.clientY - this.startY;
            requestAnimationFrame(() => this.updateTransform());
        });

        const stopDrag = (e) => {
            if (this.isDragging) {
                this.isDragging = false;
                if (this.container) {
                    this.container.style.cursor = 'grab';
                    try { this.container.releasePointerCapture(e.pointerId); } catch (_) {}
                }
            }
        };

        this.container.addEventListener('pointerup', stopDrag);
        this.container.addEventListener('pointercancel', stopDrag);

        this.container.addEventListener('wheel', (e) => {
            e.preventDefault();
            const delta = e.deltaY < 0 ? 1.15 : 0.85;
            this.zoomAt(delta, e.clientX, e.clientY);
        }, { passive: false });

        let initialDistance = 0;
        let initialScale = 1.0;

        this.container.addEventListener('touchstart', (e) => {
            if (e.touches.length === 2) {
                this.isDragging = false;
                const dx = e.touches[0].clientX - e.touches[1].clientX;
                const dy = e.touches[0].clientY - e.touches[1].clientY;
                initialDistance = Math.hypot(dx, dy);
                initialScale = this.scale;
            }
        }, { passive: true });

        this.container.addEventListener('touchmove', (e) => {
            if (e.touches.length === 2 && initialDistance > 0) {
                const dx = e.touches[0].clientX - e.touches[1].clientX;
                const dy = e.touches[0].clientY - e.touches[1].clientY;
                const dist = Math.hypot(dx, dy);
                const factor = dist / initialDistance;
                this.scale = Math.max(0.3, Math.min(6.0, initialScale * factor));
                requestAnimationFrame(() => this.updateTransform());
            }
        }, { passive: true });

        this.container.addEventListener('touchend', () => {
            initialDistance = 0;
        });
    }

    initResizeListener() {
        window.addEventListener('resize', () => {
            requestAnimationFrame(() => this.fitToScreen());
        });
    }

    zoomAt(factor, clientX, clientY) {
        this.scale = Math.max(0.3, Math.min(6.0, this.scale * factor));
        this.updateTransform();
    }

    zoomIn() {
        this.scale = Math.min(6.0, this.scale * 1.25);
        this.updateTransform();
    }

    zoomOut() {
        this.scale = Math.max(0.3, this.scale * 0.8);
        this.updateTransform();
    }

    fitToScreen() {
        this.scale = 1.0;
        this.panX = 0;
        this.panY = 0;
        this.updateTransform();
    }

    updateTransform() {
        if (!this.svgElement) return;
        this.svgElement.style.transform = `translate(${this.panX}px, ${this.panY}px) scale(${this.scale})`;
    }

    exportSvg(fileName = 'Ban_Ve_Kien_Truc.svg') {
        if (!this.svgElement) return;
        const svgData = new XMLSerializer().serializeToString(this.svgElement);
        const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName;
        link.click();
        URL.revokeObjectURL(url);
    }

    exportPng(fileName = 'Ban_Ve_Kien_Truc.png', scaleFactor = 3) {
        if (!this.svgElement) return;
        const svgData = new XMLSerializer().serializeToString(this.svgElement);
        const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
        const url = URL.createObjectURL(svgBlob);
        const img = new Image();

        img.onload = () => {
            const canvas = document.createElement('canvas');
            const rect = this.svgElement.viewBox.baseVal || { width: 1200, height: 800 };
            const width = (rect.width || 1200) * (scaleFactor / 4);
            const height = (rect.height || 800) * (scaleFactor / 4);

            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(0, 0, width, height);
            ctx.drawImage(img, 0, 0, width, height);

            const pngUrl = canvas.toDataURL('image/png');
            const link = document.createElement('a');
            link.href = pngUrl;
            link.download = fileName;
            link.click();
            URL.revokeObjectURL(url);
        };

        img.src = url;
    }
}
