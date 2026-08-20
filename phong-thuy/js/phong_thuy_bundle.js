// ============================================================
// PHONG THỦY & ARCHITECTURAL CAD FULL ENGINE BUNDLE v6.0
// Tác giả: Dịch Sư Nguyễn Huy Hoàng & Computational Geometry Core
// Bao gồm:
// 1. Scan2CADArchitecturalRenderer (Khung kích thước thực W x D, Tường đen đặc, Kích thước mm, Đầy đủ nội thất vector)
// 2. InteractiveCADRoomManager (Kéo di chuyển, co giãn 8 điểm neo, xoay 90°, nút mini Xác Nhận/Làm Lại)
// 3. LuoPanAndFlyingStarsSvgRenderer (La Kinh tròn 360° đỏ, 24 Sơn, 8 Quái, Mũi tên Tọa/Hướng, Ma trận 3x3 Cửu Cung)
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

export function generateCompassPaths(sectors, rIn, rOut, cx = 250, cy = 250) {
    let pathD = '';
    const labels = [];
    sectors.forEach(s => {
        const p1 = polarToCartesian(cx, cy, rIn, s.startDeg);
        const p2 = polarToCartesian(cx, cy, rOut, s.startDeg);
        pathD += `M ${p1.x} ${p1.y} L ${p2.x} ${p2.y} `;
        const mid = s.midDeg !== undefined ? s.midDeg : (s.startDeg + s.endDeg) / 2;
        const pMid = polarToCartesian(cx, cy, (rIn + rOut) / 2, mid);
        let rot = mid;
        if (mid > 90 && mid < 270) rot = (rot + 180) % 360;
        labels.push({ text: s.name, x: pMid.x, y: pMid.y, rotation: rot });
    });
    return { pathD, labels };
}

export function areaM2(r) { return (r.width * r.height) / 1000000; }
export function centerOfRect(r) { return { x: r.x + r.width / 2, y: r.y + r.height / 2 }; }
export function overlaps(r1, r2) {
    return !(r2.x >= r1.x + r1.width || r2.x + r2.width <= r1.x || r2.y >= r1.y + r1.height || r2.y + r2.height <= r1.y);
}
export function inside(r, b) {
    return r.x >= b.x && r.y >= b.y && r.x + r.width <= b.x + b.width && r.y + r.height <= b.y + b.height;
}

export function bspSpacePartition(w, d) {
    return {
        rooms: [
            { name: 'Phòng Khách', x: 0, y: 0, width: w, height: d * 0.35 },
            { name: 'Cầu Thang & Giếng Trời', x: 0, y: d * 0.35, width: w * 0.45, height: d * 0.3 },
            { name: 'Bếp & Ăn', x: 0, y: d * 0.65, width: w * 0.65, height: d * 0.35 },
            { name: 'Vệ Sinh', x: w * 0.65, y: d * 0.65, width: w * 0.35, height: d * 0.35 }
        ],
        corridors: [{ x: w * 0.45, y: d * 0.35, width: w * 0.55, height: d * 0.3 }]
    };
}

export class CompassSvgRenderer {
    constructor(options = {}) {
        this.size = options.size || 500;
        this.center = this.size / 2;
    }
    renderStaticDialSvg() {
        const c = this.center;
        const ring24 = generateCompassPaths(MOUNTAINS_24, 180, 215, c, c);
        const ring60 = generateCompassPaths(SIXTY_DRAGONS, 150, 180, c, c);
        const trigrams8 = [
            { name: 'KHẢM (THỦY)', startDeg: 337.5, midDeg: 0, endDeg: 22.5 },
            { name: 'CẤN (THỔ)', startDeg: 22.5, midDeg: 45, endDeg: 67.5 },
            { name: 'CHẤN (MỘC)', startDeg: 67.5, midDeg: 90, endDeg: 112.5 },
            { name: 'TỐN (MỘC)', startDeg: 112.5, midDeg: 135, endDeg: 157.5 },
            { name: 'LY (HỎA)', startDeg: 157.5, midDeg: 180, endDeg: 202.5 },
            { name: 'KHÔN (THỔ)', startDeg: 202.5, midDeg: 225, endDeg: 247.5 },
            { name: 'ĐOÀI (KIM)', startDeg: 247.5, midDeg: 270, endDeg: 292.5 },
            { name: 'CÀN (KIM)', startDeg: 292.5, midDeg: 315, endDeg: 337.5 }
        ];
        const ring8 = generateCompassPaths(trigrams8, 105, 150, c, c);
        const allLabels = [...ring24.labels, ...ring60.labels, ...ring8.labels].map(l => `<text x="${l.x}" y="${l.y}">${l.text}</text>`).join('');
        return `<path d="M 0 0 L 10 10" stroke="#d97706"/> ${allLabels}`;
    }
}

export function renderNinePalacesOverlaySvg(spatialResult, isWhite = true) {
    return `<g id="layer-fengshui-overlay"></g>`;
}

export function validatePalace(p) {
    return p && p.palaceId && p.palaceName && p.sonStar !== undefined && p.huongStar !== undefined && p.vanStar !== undefined;
}

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
    if (month === 1 || (month === 2 && day < 4)) effectiveYear = year - 1;
    let rem = (effectiveYear - 1982) % 9;
    if (rem < 0) rem += 9;
    let star = 9 - rem;
    if (star === 0) star = 9;
    return wrapStar(star);
}

export function getMonthlyStar(year, month = 8, day = 20) {
    let effectiveYear = year;
    if (month === 1 || (month === 2 && day < 4)) effectiveYear = year - 1;
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
        if (star === 5) return mountainObj.yinYang;
        return STARS_YIN_YANG[star][mountainObj.type];
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
    if (fIdx === -1) return [4, 9, 2, 3, 5, 7, 8, 1, 6];
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
        guaNum = isMale ? ((10 - sumDigits(lastTwo)) % 9 || 9) : ((sumDigits(lastTwo) + 5) % 9 || 9);
    } else {
        guaNum = isMale ? ((9 - sumDigits(lastTwo)) % 9 || 9) : ((sumDigits(lastTwo) + 6) % 9 || 9);
    }
    if (guaNum === 5) guaNum = isMale ? 2 : 8;

    const guaNames = {
        1: 'Khảm (Thủy)', 2: 'Khôn (Thổ)', 3: 'Chấn (Mộc)', 4: 'Tốn (Mộc)',
        6: 'Càn (Kim)', 7: 'Đoài (Kim)', 8: 'Cấn (Thổ)', 9: 'Ly (Hỏa)'
    };
    const isEast = [1, 3, 4, 9].includes(guaNum);

    return {
        guaNum,
        guaName: guaNames[guaNum] || 'Khảm (Thủy)',
        isEastGroup: isEast,
        groupName: isEast ? 'Đông Tứ Mệnh' : 'Tây Tứ Mệnh'
    };
}

// ------------------------------------------------------------
// 4. DYNAMIC FLOORPLAN GENERATOR (KÍCH THƯỚC THỰC TẾ & TỰ DO THẢ PHÒNG)
// ------------------------------------------------------------
export function generateParametricFloorplan(params = {}) {
    const {
        shape = 'RECTANGLE',
        widthM = 5.0,
        lengthM = 16.0,
        floors = 2,
        facingDegree = 180,
        customRooms = null
    } = params;

    const W = Math.round(widthM * 1000);
    const D = Math.round(lengthM * 1000);
    const totalFloors = Math.max(1, Math.min(5, parseInt(floors, 10) || 1));

    // Footprint Polygon Vertices
    let footprintPoints = [];
    if (shape === 'L_SHAPE') {
        const cutW = Math.round(W * 0.4);
        const cutD = Math.round(D * 0.45);
        footprintPoints = [
            { x: 0, y: 0 }, { x: W, y: 0 }, { x: W, y: D - cutD },
            { x: W - cutW, y: D - cutD }, { x: W - cutW, y: D }, { x: 0, y: D }
        ];
    } else if (shape === 'U_SHAPE') {
        const armW = Math.round(W * 0.32);
        const slotD = Math.round(D * 0.38);
        footprintPoints = [
            { x: 0, y: 0 }, { x: W, y: 0 }, { x: W, y: D },
            { x: W - armW, y: D }, { x: W - armW, y: D - slotD },
            { x: armW, y: D - slotD }, { x: armW, y: D }, { x: 0, y: D }
        ];
    } else if (shape === 'STEPPED') {
        const stepW = Math.round(W * 0.25);
        const stepD = Math.round(D * 0.35);
        footprintPoints = [
            { x: 0, y: 0 }, { x: W - stepW, y: 0 }, { x: W - stepW, y: stepD },
            { x: W, y: stepD }, { x: W, y: D }, { x: 0, y: D }
        ];
    } else if (shape === 'CONCAVE_POLYGON') {
        footprintPoints = [
            { x: 0, y: 0 }, { x: W, y: Math.round(D * 0.15) },
            { x: Math.round(W * 0.85), y: D }, { x: Math.round(W * 0.3), y: Math.round(D * 0.8) },
            { x: 0, y: Math.round(D * 0.9) }
        ];
    } else {
        footprintPoints = [
            { x: 0, y: 0 }, { x: W, y: 0 }, { x: W, y: D }, { x: 0, y: D }
        ];
    }

    // Default Rooms List if not customized
    let rooms = [];
    if (customRooms && customRooms.length > 0) {
        rooms = customRooms.map(r => ({ ...r, history: { x: r.x, y: r.y, w: r.w, h: r.h, rot: r.rot || 0 } }));
    } else {
        // Sinh các phòng tỷ lệ theo đúng W x D của ngôi nhà
        const isWide = W >= D;
        if (!isWide) {
            // Nhà ống dài
            const frontD = Math.round(D * 0.35);
            const midD = Math.round(D * 0.28);
            const rearD = D - frontD - midD;

            rooms = [
                { id: 'r_garage_living', name: 'PHÒNG KHÁCH & TIỀN MINH ĐƯỜNG', type: 'living_room', x: 220, y: 220, w: W - 440, h: frontD - 300, rot: 0 },
                { id: 'r_stairs', name: 'SẢNH THANG & GIẾNG TRỜI', type: 'stairs', x: 220, y: frontD + 100, w: Math.round(W * 0.48), h: midD - 200, rot: 0 },
                { id: 'r_dining_kitchen', name: 'BẾP & PHÒNG ĂN', type: 'kitchen_dining', x: 220, y: frontD + midD + 100, w: Math.round(W * 0.62), h: rearD - 320, rot: 0 },
                { id: 'r_wc', name: 'VỆ SINH (WC)', type: 'toilet', x: Math.round(W * 0.66), y: frontD + midD + 100, w: W - Math.round(W * 0.66) - 220, h: rearD - 320, rot: 0 }
            ];
        } else {
            // Biệt thự ngang
            const leftW = Math.round(W * 0.35);
            const midW = Math.round(W * 0.35);
            const rightW = W - leftW - midW;
            const frontD = Math.round(D * 0.55);
            const rearD = D - frontD;

            rooms = [
                { id: 'r_garage', name: 'GARA Ô TÔ (DOUBLE GARAGE)', type: 'garage', x: 220, y: 220, w: leftW - 300, h: D - 440, rot: 0 },
                { id: 'r_living', name: 'PHÒNG KHÁCH (LIVING ROOM)', type: 'living_room', x: leftW + 100, y: 220, w: midW - 200, h: frontD - 300, rot: 0 },
                { id: 'r_dining_kitchen', name: 'BẾP & PHÒNG ĂN (KITCHEN & DINING)', type: 'kitchen_dining', x: leftW + midW + 100, y: 220, w: rightW - 320, h: frontD - 300, rot: 0 },
                { id: 'r_master_bed', name: 'PHÒNG NGỦ MASTER', type: 'bed_master', x: leftW + 100, y: frontD + 100, w: midW - 200, h: rearD - 320, rot: 0 },
                { id: 'r_wc', name: 'EN SUITE & WC', type: 'toilet', x: leftW + midW + 100, y: frontD + 100, w: rightW - 320, h: rearD - 320, rot: 0 }
            ];
        }

        rooms = rooms.map(r => ({ ...r, history: { x: r.x, y: r.y, w: r.w, h: r.h, rot: r.rot || 0 } }));
    }

    return {
        shape,
        footprintPoints,
        widthMm: W,
        depthMm: D,
        totalFloors,
        facingDegree,
        rooms
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
// 5. SCAN2CAD ARCHITECTURAL RENDERER (CHUẨN 100% ẢNH 3 SCAN2CAD)
// Tường Đen Đặc Thật, Co Giãn Theo Kích Thước W x D, Kéo Co Giãn Từng Phòng
// ------------------------------------------------------------
export class ArchitecturalCADRenderer {
    constructor(options = {}) {
        this.theme = options.theme || 'white';
        this.showDimensions = options.showDimensions !== false;
        this.showFurniture = options.showFurniture !== false;
        this.showAxes = options.showAxes !== false;
        this.showCompass = options.showCompass !== false;
        this.showCompassOverlay = options.showCompassOverlay === true;
        this.selectedRoomId = null;
    }

    renderSvg(geometry, options = {}) {
        const W = geometry.widthMm || 5000;
        const D = geometry.depthMm || 16000;
        const selectedId = options.selectedRoomId || this.selectedRoomId;

        const padX = Math.max(1200, Math.round(W * 0.18));
        const padY = Math.max(1400, Math.round(D * 0.12));
        const viewX = -padX;
        const viewY = -padY;
        const viewW = W + padX * 2;
        const viewH = D + padY * 2 + 300;

        // 1. DIMENSION CHAINS (Đường dóng kích thước 2 lớp chuẩn Scan2CAD có gạch chéo 45°)
        const dimTick = (x, y) => `<line x1="${x - 40}" y1="${y + 40}" x2="${x + 40}" y2="${y - 40}" stroke="#000" stroke-width="6"/>`;
        let dimsSvg = '';
        if (this.showDimensions) {
            dimsSvg = `
                <!-- Đo Chiều Ngang Mặt Tiền (W) -->
                <line x1="0" y1="-700" x2="${W}" y2="-700" stroke="#000" stroke-width="3"/>
                <line x1="0" y1="-850" x2="0" y2="-550" stroke="#666" stroke-width="2"/>
                <line x1="${W}" y1="-850" x2="${W}" y2="-550" stroke="#666" stroke-width="2"/>
                ${dimTick(0, -700)} ${dimTick(W, -700)}
                <text x="${W / 2}" y="-730" text-anchor="middle" font-size="120" font-family="'Courier New', monospace" font-weight="900" fill="#000">${W} mm</text>

                <!-- Đo Chiều Sâu Công Trình (D) -->
                <line x1="-700" y1="0" x2="-700" y2="${D}" stroke="#000" stroke-width="3"/>
                <line x1="-850" y1="0" x2="-550" y2="0" stroke="#666" stroke-width="2"/>
                <line x1="-850" y1="${D}" x2="-550" y2="${D}" stroke="#666" stroke-width="2"/>
                ${dimTick(-700, 0)} ${dimTick(-700, D)}
                <text x="-730" y="${D / 2}" text-anchor="middle" transform="rotate(-90 -730 ${D / 2})" font-size="120" font-family="'Courier New', monospace" font-weight="900" fill="#000">${D} mm</text>
            `;
        }

        // 2. VECTOR SYMBOLS RENDERER
        const renderCar = (cx, cy, cw, ch) => `
            <g class="cad-symbol-car" transform="translate(${cx}, ${cy})">
                <rect x="${cw * 0.1}" y="${ch * 0.05}" width="${cw * 0.8}" height="${ch * 0.9}" rx="${cw * 0.2}" fill="#fff" stroke="#000" stroke-width="8"/>
                <path d="M ${cw * 0.2} ${ch * 0.25} Q ${cw * 0.5} ${ch * 0.2} ${cw * 0.8} ${ch * 0.25} L ${cw * 0.75} ${ch * 0.4} Q ${cw * 0.5} ${ch * 0.38} ${cw * 0.25} ${ch * 0.4} Z" fill="#f1f5f9" stroke="#000" stroke-width="6"/>
                <path d="M ${cw * 0.25} ${ch * 0.7} Q ${cw * 0.5} ${ch * 0.68} ${cw * 0.75} ${ch * 0.7} L ${cw * 0.8} ${ch * 0.82} Q ${cw * 0.5} ${ch * 0.85} ${cw * 0.2} ${ch * 0.82} Z" fill="#f1f5f9" stroke="#000" stroke-width="6"/>
                <rect x="${cw * 0.05}" y="${ch * 0.15}" width="${cw * 0.08}" height="${ch * 0.12}" rx="4" fill="#000"/>
                <rect x="${cw * 0.87}" y="${ch * 0.15}" width="${cw * 0.08}" height="${ch * 0.12}" rx="4" fill="#000"/>
                <rect x="${cw * 0.05}" y="${ch * 0.73}" width="${cw * 0.08}" height="${ch * 0.12}" rx="4" fill="#000"/>
                <rect x="${cw * 0.87}" y="${ch * 0.73}" width="${cw * 0.08}" height="${ch * 0.12}" rx="4" fill="#000"/>
            </g>
        `;

        const renderBed = (bx, by, bw, bh) => `
            <g class="cad-symbol-bed" transform="translate(${bx}, ${by})">
                <rect x="${bw * 0.1}" y="${bh * 0.1}" width="${bw * 0.8}" height="${bh * 0.8}" fill="#fff" stroke="#000" stroke-width="8"/>
                <rect x="${bw * 0.1}" y="${bh * 0.1}" width="${bw * 0.8}" height="${bh * 0.1}" fill="#333"/>
                <rect x="${bw * 0.18}" y="${bh * 0.24}" width="${bw * 0.28}" height="${bh * 0.18}" rx="10" fill="#f8fafc" stroke="#000" stroke-width="5"/>
                <rect x="${bw * 0.54}" y="${bh * 0.24}" width="${bw * 0.28}" height="${bh * 0.18}" rx="10" fill="#f8fafc" stroke="#000" stroke-width="5"/>
                <line x1="${bw * 0.1}" y1="${bh * 0.52}" x2="${bw * 0.9}" y2="${bh * 0.52}" stroke="#000" stroke-width="6"/>
            </g>
        `;

        const renderSofa = (sx, sy, sw, sh) => `
            <g class="cad-symbol-sofa" transform="translate(${sx}, ${sy})">
                <rect x="${sw * 0.08}" y="${sh * 0.08}" width="${sw * 0.84}" height="${sh * 0.32}" rx="15" fill="#fff" stroke="#000" stroke-width="8"/>
                <rect x="${sw * 0.18}" y="${sh * 0.48}" width="${sw * 0.64}" height="${sh * 0.38}" rx="20" fill="#fff" stroke="#000" stroke-width="6"/>
            </g>
        `;

        const renderDining = (dx, dy, dw, dh) => `
            <g class="cad-symbol-dining" transform="translate(${dx}, ${dy})">
                <rect x="${dw * 0.15}" y="${dh * 0.25}" width="${dw * 0.7}" height="${dh * 0.5}" rx="30" fill="#fff" stroke="#000" stroke-width="8"/>
                <circle cx="${dw * 0.3}" cy="${dh * 0.12}" r="${Math.min(dw, dh) * 0.08}" fill="#fff" stroke="#000" stroke-width="4"/>
                <circle cx="${dw * 0.7}" cy="${dh * 0.12}" r="${Math.min(dw, dh) * 0.08}" fill="#fff" stroke="#000" stroke-width="4"/>
                <circle cx="${dw * 0.3}" cy="${dh * 0.88}" r="${Math.min(dw, dh) * 0.08}" fill="#fff" stroke="#000" stroke-width="4"/>
                <circle cx="${dw * 0.7}" cy="${dh * 0.88}" r="${Math.min(dw, dh) * 0.08}" fill="#fff" stroke="#000" stroke-width="4"/>
            </g>
        `;

        const renderWc = (wx, wy, ww, wh) => `
            <g class="cad-symbol-wc" transform="translate(${wx}, ${wy})">
                <rect x="${ww * 0.1}" y="${wh * 0.1}" width="${ww * 0.35}" height="${wh * 0.2}" rx="10" fill="#fff" stroke="#000" stroke-width="6"/>
                <ellipse cx="${ww * 0.275}" cy="${wh * 0.45}" rx="${ww * 0.16}" ry="${wh * 0.22}" fill="#fff" stroke="#000" stroke-width="6"/>
                <rect x="${ww * 0.6}" y="${wh * 0.1}" width="${ww * 0.3}" height="${wh * 0.5}" rx="15" fill="#f8fafc" stroke="#000" stroke-width="6"/>
            </g>
        `;

        const renderStairs = (sx, sy, sw, sh) => {
            let st = `<g class="cad-symbol-stairs" transform="translate(${sx}, ${sy})">
                <rect x="0" y="0" width="${sw}" height="${sh}" fill="#fff" stroke="#000" stroke-width="8"/>`;
            const steps = 10;
            for (let i = 1; i < steps; i++) {
                const y = (sh / steps) * i;
                st += `<line x1="0" y1="${y}" x2="${sw}" y2="${y}" stroke="#000" stroke-width="4"/>`;
            }
            st += `
                <line x1="${sw / 2}" y1="${sh * 0.85}" x2="${sw / 2}" y2="${sh * 0.18}" stroke="#000" stroke-width="8" stroke-linecap="round"/>
                <polygon points="${sw / 2},${sh * 0.08} ${sw / 2 - 40},${sh * 0.2} ${sw / 2 + 40},${sh * 0.2}" fill="#000"/>
                <circle cx="${sw / 2}" cy="${sh * 0.85}" r="25" fill="#000"/>
                <text x="${sw / 2}" y="${sh * 0.55}" text-anchor="middle" font-size="${Math.min(sw * 0.25, 90)}" font-family="'Courier New', monospace" font-weight="bold" fill="#000">UP</text>
            </g>`;
            return st;
        };

        // 3. RENDER ROOMS WITH INTERACTIVE RESIZE HANDLES & MINI ACTION BAR
        let roomsSvg = '';
        if (geometry.rooms) {
            geometry.rooms.forEach(r => {
                const isSel = (r.id === selectedId);
                const area = ((r.w * r.h) / 1000000).toFixed(1);

                let symbolSvg = '';
                if (r.type === 'garage') symbolSvg = renderCar(r.x, r.y, r.w, r.h);
                else if (r.type === 'bed_master' || r.type === 'bed_regular') symbolSvg = renderBed(r.x, r.y, r.w, r.h);
                else if (r.type === 'living_room') symbolSvg = renderSofa(r.x, r.y, r.w, r.h);
                else if (r.type === 'kitchen_dining') symbolSvg = renderDining(r.x, r.y, r.w, r.h);
                else if (r.type === 'toilet') symbolSvg = renderWc(r.x, r.y, r.w, r.h);
                else if (r.type === 'stairs') symbolSvg = renderStairs(r.x, r.y, r.w, r.h);

                // 8 Resize Handles on Selection
                let handlesSvg = '';
                if (isSel) {
                    const hs = Math.max(50, Math.min(r.w, r.h) * 0.08); // handle size
                    const handlePoints = [
                        { id: 'nw', cx: r.x, cy: r.y },
                        { id: 'n',  cx: r.x + r.w / 2, cy: r.y },
                        { id: 'ne', cx: r.x + r.w, cy: r.y },
                        { id: 'e',  cx: r.x + r.w, cy: r.y + r.h / 2 },
                        { id: 'se', cx: r.x + r.w, cy: r.y + r.h },
                        { id: 's',  cx: r.x + r.w / 2, cy: r.y + r.h },
                        { id: 'sw', cx: r.x, cy: r.y + r.h },
                        { id: 'w',  cx: r.x, cy: r.y + r.h / 2 }
                    ];

                    handlesSvg = `
                        <!-- 8 Điểm neo co giãn kích thước -->
                        ${handlePoints.map(hp => `
                            <rect class="cad-resize-handle" data-handle="${hp.id}" data-room-id="${r.id}" x="${hp.cx - hs / 2}" y="${hp.cy - hs / 2}" width="${hs}" height="${hs}" fill="#0284c7" stroke="#ffffff" stroke-width="4" rx="6" style="cursor: ${hp.id}-resize;"/>
                        `).join('')}

                        <!-- Thanh công cụ Mini nổi trên đầu phòng [✓ Xác nhận] [↺ Làm lại] [↻ Xoay] -->
                        <g class="cad-mini-action-bar" transform="translate(${r.x + r.w / 2}, ${r.y - 120})">
                            <rect x="-240" y="-50" width="480" height="90" rx="16" fill="#0f172a" stroke="#f59e0b" stroke-width="4"/>
                            
                            <!-- Nút ✓ Xác nhận (xanh lá) -->
                            <g class="btn-cad-mini-action" data-action="confirm" data-room-id="${r.id}" style="cursor: pointer;">
                                <rect x="-220" y="-38" width="130" height="66" rx="10" fill="#16a34a"/>
                                <text x="-155" y="4" text-anchor="middle" font-size="34" font-weight="900" fill="#ffffff">✓ Lưu</text>
                            </g>

                            <!-- Nút ↺ Làm lại (cam) -->
                            <g class="btn-cad-mini-action" data-action="reset" data-room-id="${r.id}" style="cursor: pointer;">
                                <rect x="-75" y="-38" width="130" height="66" rx="10" fill="#ea580c"/>
                                <text x="-10" y="4" text-anchor="middle" font-size="34" font-weight="900" fill="#ffffff">↺ Hoàn</text>
                            </g>

                            <!-- Nút ↻ Xoay 90° (xanh dương) -->
                            <g class="btn-cad-mini-action" data-action="rotate" data-room-id="${r.id}" style="cursor: pointer;">
                                <rect x="70" y="-38" width="80" height="66" rx="10" fill="#0284c7"/>
                                <text x="110" y="6" text-anchor="middle" font-size="40" font-weight="900" fill="#ffffff">↻</text>
                            </g>

                            <!-- Nút 🗑️ Xóa (đỏ) -->
                            <g class="btn-cad-mini-action" data-action="delete" data-room-id="${r.id}" style="cursor: pointer;">
                                <rect x="160" y="-38" width="65" height="66" rx="10" fill="#dc2626"/>
                                <text x="192" y="5" text-anchor="middle" font-size="36" font-weight="900" fill="#ffffff">×</text>
                            </g>
                        </g>
                    `;
                }

                roomsSvg += `
                    <g class="cad-room-interactive ${isSel ? 'selected-room' : ''}" data-room-id="${r.id}" style="cursor: move;">
                        <!-- Viền khung phòng -->
                        <rect x="${r.x}" y="${r.y}" width="${r.w}" height="${r.h}" fill="${isSel ? 'rgba(2, 132, 199, 0.06)' : '#ffffff'}" stroke="${isSel ? '#0284c7' : '#000000'}" stroke-width="${isSel ? 16 : 14}" stroke-dasharray="${isSel ? '30,15' : 'none'}"/>
                        
                        <!-- Đồ nội thất vector -->
                        ${symbolSvg}

                        <!-- Tên phòng & Diện tích m2 -->
                        <rect x="${r.x + r.w / 2 - 320}" y="${r.y + r.h / 2 - 70}" width="640" height="140" rx="16" fill="rgba(255,255,255,0.92)" stroke="${isSel ? '#0284c7' : '#94a3b8'}" stroke-width="4"/>
                        <text x="${r.x + r.w / 2}" y="${r.y + r.h / 2 - 10}" text-anchor="middle" font-size="${Math.min(r.w * 0.12, 75)}" font-weight="900" fill="#000000" letter-spacing="2">${r.name}</text>
                        <text x="${r.x + r.w / 2}" y="${r.y + r.h / 2 + 45}" text-anchor="middle" font-size="${Math.min(r.w * 0.09, 55)}" font-weight="bold" fill="#0284c7">${area} m² (${r.w}x${r.h})</text>

                        <!-- Selection Handles & Mini Action Bar -->
                        ${handlesSvg}
                    </g>
                `;
            });
        }

        // 4. EXTERIOR HEAVY WALLS (Tường đen bao quanh khu đất theo đúng footprint)
        let footprintSvg = '';
        if (geometry.footprintPoints && geometry.footprintPoints.length >= 3) {
            const pts = geometry.footprintPoints.map(p => `${p.x},${p.y}`).join(' ');
            footprintSvg = `<polygon points="${pts}" fill="none" stroke="#000000" stroke-width="45" stroke-linejoin="miter"/>`;
        } else {
            footprintSvg = `<rect x="0" y="0" width="${W}" height="${D}" fill="none" stroke="#000000" stroke-width="45"/>`;
        }

        return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewX} ${viewY} ${viewW} ${viewH}" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" class="scan2cad-interactive-drawing" style="display: block; width: 100%; height: 100%; background: #ffffff; font-family: 'Helvetica Neue', Arial, sans-serif; user-select: none;">
    <!-- Nền lưới toạ độ CAD mờ nhẹ -->
    <defs>
        <pattern id="cadGridSmall" width="500" height="500" patternUnits="userSpaceOnUse">
            <rect width="500" height="500" fill="none" stroke="rgba(0,0,0,0.03)" stroke-width="2"/>
        </pattern>
    </defs>
    <rect x="${viewX}" y="${viewY}" width="${viewW}" height="${viewH}" fill="url(#cadGridSmall)"/>

    <!-- Tường bao ngoại thất -->
    ${footprintSvg}

    <!-- Các phòng & đồ nội thất tương tác -->
    <g id="layer-rooms-container">
        ${roomsSvg}
    </g>

    <!-- Chuỗi kích thước CAD 2 lớp -->
    <g id="layer-dimensions">
        ${dimsSvg}
    </g>
</svg>
        `.trim();
    }
}

// ------------------------------------------------------------
// 6. LUOPAN AND FLYING STARS SVG RENDERER (CHUẨN 100% ẢNH 2 HKPT)
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
        const GRID_SIZE = 220;

        const facingDeg = flyingStars.facingDegree || 180;
        const sittingDeg = (facingDeg + 180) % 360;

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

        const pHuong = polarToCartesian(c, c, R_OUTER + 15, facingDeg);
        const pHuongBadge = polarToCartesian(c, c, R_OUTER - 15, facingDeg);
        const pToa = polarToCartesian(c, c, R_OUTER + 15, sittingDeg);
        const pToaBadge = polarToCartesian(c, c, R_OUTER - 15, sittingDeg);

        const arrowsSvg = `
            <line x1="${c}" y1="${c}" x2="${pHuong.x}" y2="${pHuong.y}" stroke="#dc2626" stroke-width="3" stroke-linecap="round"/>
            <polygon points="${pHuong.x},${pHuong.y} ${pHuong.x - 8},${pHuong.y + 15} ${pHuong.x + 8},${pHuong.y + 15}" transform="rotate(${facingDeg} ${pHuong.x} ${pHuong.y})" fill="#dc2626"/>
            <rect x="${pHuongBadge.x - 30}" y="${pHuongBadge.y - 12}" width="60" height="24" rx="4" fill="#dc2626"/>
            <text x="${pHuongBadge.x}" y="${pHuongBadge.y + 4}" text-anchor="middle" font-size="10" font-weight="900" fill="#fff">HƯỚNG</text>

            <line x1="${c}" y1="${c}" x2="${pToa.x}" y2="${pToa.y}" stroke="#2563eb" stroke-width="3" stroke-linecap="round"/>
            <polygon points="${pToa.x},${pToa.y} ${pToa.x - 8},${pToa.y + 15} ${pToa.x + 8},${pToa.y + 15}" transform="rotate(${sittingDeg} ${pToa.x} ${pToa.y})" fill="#2563eb"/>
            <rect x="${pToaBadge.x - 22}" y="${pToaBadge.y - 10}" width="44" height="20" rx="4" fill="#2563eb"/>
            <text x="${pToaBadge.x}" y="${pToaBadge.y + 4}" text-anchor="middle" font-size="9.5" font-weight="900" fill="#fff">TỌA</text>
        `;

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
                <rect x="${x}" y="${y}" width="${cellS}" height="${cellS}" fill="#ffffff" stroke="#000000" stroke-width="1.5"/>
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
                <text x="${cx}" y="${cy + 10}" text-anchor="middle" font-size="28" font-weight="bold" fill="#0284c7">${star.vanStar}</text>
                <text x="${x + 16}" y="${cy + 22}" text-anchor="middle" font-size="18" font-weight="900" fill="#000000">${star.sonStar}</text>
                <text x="${x + 36}" y="${y + cellS - 6}" text-anchor="middle" font-size="8.5" font-weight="bold" fill="#000000">${PALACE_SHORT[pId]}</text>
                <text x="${x + cellS - 16}" y="${cy + 22}" text-anchor="middle" font-size="18" font-weight="900" fill="#000000">${star.huongStar}</text>
            `;
        });

        const isKiem = flyingStars.chartType === 'the_quai';
        const titleText = `Tọa ${flyingStars.sittingMountain} - Hướng ${flyingStars.facingMountain} ${isKiem ? `(Kiêm ${flyingStars.deviation}°)` : ''}`;

        return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${this.size} ${this.size + 80}" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" class="hkpt-luopan-drawing" style="display: block; width: 100%; height: 100%; background: #ffffff; font-family: 'Inter', Arial, sans-serif;">
    <g transform="translate(${c}, 40)">
        <text x="0" y="0" text-anchor="middle" font-size="18" font-weight="900" fill="#000000">${titleText}</text>
        <rect x="130" y="-14" width="70" height="20" rx="4" fill="#fef3c7" stroke="#f59e0b" stroke-width="1"/>
        <text x="165" y="0" text-anchor="middle" font-size="10" font-weight="bold" fill="#d97706">${isKiem ? 'Thế Quái' : 'Hạ Quái'}</text>
    </g>
    <circle cx="${c}" cy="${c + 30}" r="${R_OUTER}" fill="none" stroke="#dc2626" stroke-width="2.5"/>
    <circle cx="${c}" cy="${c + 30}" r="${R_DEG}" fill="none" stroke="#dc2626" stroke-width="1"/>
    <circle cx="${c}" cy="${c + 30}" r="${R_MOUNTAIN}" fill="none" stroke="#dc2626" stroke-width="1"/>
    <circle cx="${c}" cy="${c + 30}" r="${R_TRIGRAM}" fill="none" stroke="#dc2626" stroke-width="1.5"/>
    <g transform="translate(0, 30)">
        ${degTicks}
        ${degLabels}
        ${mountainSectors}
        ${mountainLabels}
        ${trigramSectors}
        ${trigramLabels}
        ${arrowsSvg}
        ${matrixCellsSvg}
    </g>
</svg>
        `.trim();
    }
}

// ------------------------------------------------------------
// 7. SVG VIEWPORT CONTROLLER
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
            // Không can thiệp nếu bấm vào các nút điều khiển của phòng
            if (e.target.closest('.cad-resize-handle') || e.target.closest('.cad-mini-action-bar') || e.target.closest('.cad-room-interactive')) {
                return;
            }
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
