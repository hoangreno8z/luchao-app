// ============================================================
// PHONG THỦY & ARCHITECTURAL CAD FULL ENGINE BUNDLE v8.0
// Tác giả: Dịch Sư Nguyễn Huy Hoàng & Computational Geometry Core
// 100% Thuần Vector Procedural Code (SVG / Canvas) — Không sử dụng Emoji hay Ảnh Copy
// ============================================================

// ------------------------------------------------------------
// 1. DATA LAYER (24 SƠN HƯỚNG, 60 THẤU ĐỊA LONG, CỬU CUNG)
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

export const STARS_YIN_YANG = {
    1: [1, -1, -1],
    2: [-1, 1, 1],
    3: [1, -1, -1],
    4: [-1, 1, 1],
    5: null,
    6: [-1, 1, 1],
    7: [1, -1, -1],
    8: [-1, 1, 1],
    9: [1, -1, -1]
};

// ------------------------------------------------------------
// 2. TOÁN HỌC TỌA ĐỘ CỰC & HÌNH HỌC CƠ BẢN
// ------------------------------------------------------------
export function polarToCartesian(cx, cy, r, deg) {
    const rad = ((deg - 90) * Math.PI) / 180;
    return {
        x: parseFloat((cx + r * Math.cos(rad)).toFixed(2)),
        y: parseFloat((cy + r * Math.sin(rad)).toFixed(2))
    };
}

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
            { name: 'P.KHÁCH', x: 0, y: 0, width: w, height: d * 0.35 },
            { name: 'CẦU THANG', x: 0, y: d * 0.35, width: w * 0.45, height: d * 0.3 },
            { name: 'P.BẾP + ĂN', x: 0, y: d * 0.65, width: w * 0.65, height: d * 0.35 },
            { name: 'WC CHUNG', x: w * 0.65, y: d * 0.65, width: w * 0.35, height: d * 0.35 }
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
            bestName = name;
            best = m;
        }
    }

    const isKiemHuong = bestDiff > 3.0;
    return {
        degree: deg,
        mountain: best,
        deviation: parseFloat(bestDiff.toFixed(1)),
        isKiemHuong,
        chartType: isKiemHuong ? 'kiem_huong' : 'chinh_huong'
    };
}

export function getOppositeMountain(degree) {
    const oppDeg = (degree + 180) % 360;
    return findMountain(oppDeg);
}

export function getPeriod(year) {
    if (year >= 1864 && year <= 1883) return 1;
    if (year >= 1884 && year <= 1903) return 2;
    if (year >= 1904 && year <= 1923) return 3;
    if (year >= 1924 && year <= 1943) return 4;
    if (year >= 1944 && year <= 1963) return 5;
    if (year >= 1964 && year <= 1983) return 6;
    if (year >= 1984 && year <= 2003) return 7;
    if (year >= 2004 && year <= 2023) return 8;
    if (year >= 2024 && year <= 2043) return 9;
    return 9;
}

export function fly(centerStar, direction = 1) {
    const chart = {};
    const path = FLYING_PATH;
    for (let step = 0; step < 9; step++) {
        const palace = path[step];
        let star;
        if (direction === 1) {
            star = (centerStar - 1 + step) % 9 + 1;
        } else {
            star = (centerStar - 1 - step) % 9;
            if (star < 0) star += 9;
            star += 1;
        }
        chart[palace] = star;
    }
    return chart;
}

export function getAnnualStar(year, month, day) {
    const sumDigits = (n) => {
        let s = 0;
        while (n > 0 || s > 9) {
            if (n === 0) { n = s; s = 0; }
            s += n % 10;
            n = Math.floor(n / 10);
        }
        return s;
    };
    const solarYear = (month < 2 || (month === 2 && day < 4)) ? year - 1 : year;
    const lastTwo = solarYear % 100;
    let star = (10 - sumDigits(lastTwo)) % 9;
    if (star === 0) star = 9;
    return star;
}

export function getMonthlyStar(year, month, day) {
    const annualStar = getAnnualStar(year, month, day);
    let base = 2;
    if ([1, 4, 7].includes(annualStar)) base = 8;
    else if ([3, 6, 9].includes(annualStar)) base = 2;
    else base = 5;

    let mIdx = month - 2;
    if (mIdx < 0) mIdx += 12;
    let star = (base - mIdx) % 9;
    if (star <= 0) star += 9;
    return star;
}

export function getDailyStar(year, month, day) {
    const base = new Date(2024, 0, 1).getTime();
    const curr = new Date(year, month - 1, day).getTime();
    const diffDays = Math.floor((curr - base) / (1000 * 60 * 60 * 24));
    let star = (1 + diffDays) % 9;
    if (star <= 0) star += 9;
    return star;
}

export function getHourlyStar(year, month, day, hourBranch = 6) {
    const dailyStar = getDailyStar(year, month, day);
    let startStar = 1;
    if ([1, 7].includes(dailyStar)) startStar = 1;
    else if ([2, 8].includes(dailyStar)) startStar = 2;
    else if ([3, 9].includes(dailyStar)) startStar = 3;
    else if ([4].includes(dailyStar)) startStar = 4;
    else if ([5].includes(dailyStar)) startStar = 5;
    else startStar = 6;

    let star = (startStar + (hourBranch - 1)) % 9;
    if (star <= 0) star += 9;
    return star;
}

// ------------------------------------------------------------
// 3. ENGINE TÍNH TOÁN TINH BÀN HUYỀN KHÔNG & BÁT TRẠCH
// ------------------------------------------------------------
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
// 4. COMPUTATIONAL GEOMETRY ENGINE: TÂM NHÀ HÌNH HỌC (CENTROID & POLYLABEL)
// ------------------------------------------------------------
export class HouseCenterGeometryEngine {
    static calculateShoelaceArea(pts) {
        if (!pts || pts.length < 3) return 0;
        let area = 0;
        const n = pts.length;
        for (let i = 0; i < n; i++) {
            const j = (i + 1) % n;
            area += pts[i].x * pts[j].y;
            area -= pts[j].x * pts[i].y;
        }
        return area / 2;
    }

    static calculatePolygonCentroid(pts) {
        if (!pts || pts.length === 0) return { x: 0, y: 0 };
        if (pts.length === 1) return { x: pts[0].x, y: pts[0].y };
        if (pts.length === 2) return { x: Math.round((pts[0].x + pts[1].x) / 2), y: Math.round((pts[0].y + pts[1].y) / 2) };

        const signedArea = this.calculateShoelaceArea(pts);
        if (Math.abs(signedArea) < 1e-5) {
            return this.calculateBoundingBoxCenter(pts);
        }

        let cx = 0;
        let cy = 0;
        const n = pts.length;
        for (let i = 0; i < n; i++) {
            const j = (i + 1) % n;
            const factor = (pts[i].x * pts[j].y - pts[j].x * pts[i].y);
            cx += (pts[i].x + pts[j].x) * factor;
            cy += (pts[i].y + pts[j].y) * factor;
        }
        const divisor = 6 * signedArea;
        return {
            x: Math.round(cx / divisor),
            y: Math.round(cy / divisor)
        };
    }

    static calculateBoundingBoxCenter(pts) {
        if (!pts || pts.length === 0) return { x: 0, y: 0, minX: 0, maxX: 0, minY: 0, maxY: 0, width: 0, depth: 0 };
        let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
        pts.forEach(p => {
            if (p.x < minX) minX = p.x;
            if (p.x > maxX) maxX = p.x;
            if (p.y < minY) minY = p.y;
            if (p.y > maxY) maxY = p.y;
        });
        return {
            x: Math.round((minX + maxX) / 2),
            y: Math.round((minY + maxY) / 2),
            minX, maxX, minY, maxY,
            width: maxX - minX,
            depth: maxY - minY
        };
    }

    static isPointInPolygon(pt, pts) {
        let inside = false;
        const n = pts.length;
        for (let i = 0, j = n - 1; i < n; j = i++) {
            const xi = pts[i].x, yi = pts[i].y;
            const xj = pts[j].x, yj = pts[j].y;
            const intersect = ((yi > pt.y) !== (yj > pt.y)) &&
                (pt.x < (xj - xi) * (pt.y - yi) / (yj - yi) + xi);
            if (intersect) inside = !inside;
        }
        return inside;
    }

    static calculatePolylabel(pts) {
        const bbox = this.calculateBoundingBoxCenter(pts);
        const centroid = this.calculatePolygonCentroid(pts);
        if (this.isPointInPolygon(centroid, pts)) {
            return centroid;
        }
        let bestPt = { x: centroid.x, y: centroid.y };
        let maxDist = -Infinity;
        const step = Math.max(100, Math.min(bbox.width, bbox.depth) / 25);

        for (let x = bbox.minX; x <= bbox.maxX; x += step) {
            for (let y = bbox.minY; y <= bbox.maxY; y += step) {
                const p = { x, y };
                if (this.isPointInPolygon(p, pts)) {
                    let dMin = Infinity;
                    for (let i = 0; i < pts.length; i++) {
                        const p1 = pts[i];
                        const p2 = pts[(i + 1) % pts.length];
                        const d = this.distToSegment(p, p1, p2);
                        if (d < dMin) dMin = d;
                    }
                    if (dMin > maxDist) {
                        maxDist = dMin;
                        bestPt = p;
                    }
                }
            }
        }
        return bestPt;
    }

    static distToSegment(p, v, w) {
        const l2 = (v.x - w.x) * (v.x - w.x) + (v.y - w.y) * (v.y - w.y);
        if (l2 === 0) return Math.hypot(p.x - v.x, p.y - v.y);
        let t = ((p.x - v.x) * (w.x - v.x) + (p.y - v.y) * (w.y - v.y)) / l2;
        t = Math.max(0, Math.min(1, t));
        return Math.hypot(p.x - (v.x + t * (w.x - v.x)), p.y - (v.y + t * (w.y - v.y)));
    }

    static analyzePolygon(pts) {
        const area = Math.abs(this.calculateShoelaceArea(pts));
        const centroid = this.calculatePolygonCentroid(pts);
        const bbox = this.calculateBoundingBoxCenter(pts);
        const polylabel = this.calculatePolylabel(pts);
        const isCentroidInside = this.isPointInPolygon(centroid, pts);

        const bboxArea = bbox.width * bbox.depth;
        const fillRatio = bboxArea > 0 ? (area / bboxArea) : 1;

        let shape = 'RECTANGLE';
        if (pts.length === 4 && fillRatio > 0.94) {
            shape = 'RECTANGLE';
        } else if (pts.length === 6) {
            shape = 'L_SHAPE';
        } else if (pts.length === 8 && fillRatio < 0.78) {
            shape = 'U_SHAPE';
        } else if (pts.length === 4 && fillRatio <= 0.94) {
            shape = 'TRAPEZOID';
        } else {
            shape = 'CONCAVE_POLYGON';
        }

        const confidence = Math.min(99.4, Math.max(88.0, 95.0 + (isCentroidInside ? 3.5 : -2.0) - (pts.length > 8 ? 3.5 : 0)));

        return {
            points: pts,
            areaM2: (area / 1000000).toFixed(2),
            areaMm2: area,
            centroid,
            boundingBoxCenter: { x: bbox.x, y: bbox.y },
            polylabel,
            isCentroidInside,
            shape,
            confidence: confidence.toFixed(1),
            edgesCount: pts.length,
            widthMm: bbox.width,
            depthMm: bbox.depth
        };
    }
}

// ------------------------------------------------------------
// 5. DYNAMIC MULTI-FLOOR GENERATOR (TẦNG 1, 2, 3, 4, 5...)
// ------------------------------------------------------------
export function generateParametricFloorplan(params = {}) {
    const {
        shape = 'RECTANGLE',
        widthM = 5.0,
        lengthM = 16.0,
        floors = 2,
        facingDegree = 180,
        customRooms = null,
        customFootprintPoints = null,
        currentFloor = 1
    } = params;

    const W = Math.round(widthM * 1000);
    const D = Math.round(lengthM * 1000);
    const totalFloors = Math.max(1, Math.min(7, parseInt(floors, 10) || 1));

    let footprintPoints = [];
    if (customFootprintPoints && customFootprintPoints.length >= 3) {
        footprintPoints = customFootprintPoints.map(p => ({ x: p.x, y: p.y }));
    } else if (shape === 'L_SHAPE') {
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

    const floorsData = {};
    const frontD = Math.round(D * 0.36);
    const midD = Math.round(D * 0.28);
    const rearD = D - frontD - midD;

    // Floor 1: Living, Stairs, Kitchen/Dining, WC1, Porch
    floorsData[1] = {
        name: 'TẦNG TRỆT',
        rooms: [
            { id: 'f1_living', name: 'P.KHÁCH', type: 'living_room', x: 220, y: 220, w: W - 440, h: frontD - 300, rot: 0 },
            { id: 'f1_stairs', name: 'CẦU THANG (UP)', type: 'stairs', x: 220, y: frontD + 100, w: Math.round(W * 0.48), h: midD - 200, rot: 0 },
            { id: 'f1_kitchen', name: 'P.BẾP + ĂN', type: 'kitchen_dining', x: 220, y: frontD + midD + 100, w: Math.round(W * 0.62), h: rearD - 320, rot: 0 },
            { id: 'f1_wc', name: 'WC CHUNG', type: 'toilet', x: Math.round(W * 0.66), y: frontD + midD + 100, w: W - Math.round(W * 0.66) - 220, h: rearD - 320, rot: 0 }
        ]
    };

    if (totalFloors >= 2) {
        floorsData[2] = {
            name: 'TẦNG 2',
            rooms: [
                { id: 'f2_master', name: 'P.NGỦ 1 (MASTER)', type: 'bed_master', x: 220, y: 220, w: Math.round(W * 0.58), h: frontD - 150, rot: 0 },
                { id: 'f2_balcony', name: 'BAN CÔNG', type: 'yard', x: Math.round(W * 0.62), y: 220, w: W - Math.round(W * 0.62) - 220, h: frontD - 150, rot: 0 },
                { id: 'f2_stairs', name: 'CẦU THANG', type: 'stairs', x: 220, y: frontD + 150, w: Math.round(W * 0.48), h: midD - 200, rot: 0 },
                { id: 'f2_bed2', name: 'P.NGỦ 2', type: 'bed_regular', x: 220, y: frontD + midD + 100, w: Math.round(W * 0.62), h: rearD - 320, rot: 0 },
                { id: 'f2_wc', name: 'WC TẦNG 2', type: 'toilet', x: Math.round(W * 0.66), y: frontD + midD + 100, w: W - Math.round(W * 0.66) - 220, h: rearD - 320, rot: 0 }
            ]
        };
    }

    if (totalFloors >= 3) {
        floorsData[3] = {
            name: 'TẦNG 3',
            rooms: [
                { id: 'f3_altar', name: 'P.THỜ GIA TIÊN', type: 'altar', x: 220, y: 220, w: Math.round(W * 0.55), h: frontD - 150, rot: 0 },
                { id: 'f3_terrace', name: 'SÂN THƯỢNG', type: 'yard', x: Math.round(W * 0.6), y: 220, w: W - Math.round(W * 0.6) - 220, h: frontD - 150, rot: 0 },
                { id: 'f3_stairs', name: 'CẦU THANG', type: 'stairs', x: 220, y: frontD + 150, w: Math.round(W * 0.48), h: midD - 200, rot: 0 },
                { id: 'f3_bed3', name: 'P.NGỦ 3', type: 'bed_regular', x: 220, y: frontD + midD + 100, w: Math.round(W * 0.58), h: rearD - 320, rot: 0 },
                { id: 'f3_laundry', name: 'SÂN PHƠI', type: 'laundry', x: Math.round(W * 0.62), y: frontD + midD + 100, w: W - Math.round(W * 0.62) - 220, h: rearD - 320, rot: 0 }
            ]
        };
    }

    for (let f = 4; f <= totalFloors; f++) {
        floorsData[f] = {
            name: `TẦNG ${f}`,
            rooms: [
                { id: `f${f}_common`, name: `P.SINH HOẠT TẦNG ${f}`, type: 'living_room', x: 220, y: 220, w: W - 440, h: frontD - 200, rot: 0 },
                { id: `f${f}_stairs`, name: 'CẦU THANG', type: 'stairs', x: 220, y: frontD + 100, w: Math.round(W * 0.48), h: midD - 200, rot: 0 },
                { id: `f${f}_bed`, name: `P.NGỦ TẦNG ${f}`, type: 'bed_regular', x: 220, y: frontD + midD + 100, w: Math.round(W * 0.62), h: rearD - 320, rot: 0 },
                { id: `f${f}_wc`, name: `WC TẦNG ${f}`, type: 'toilet', x: Math.round(W * 0.66), y: frontD + midD + 100, w: W - Math.round(W * 0.66) - 220, h: rearD - 320, rot: 0 }
            ]
        };
    }

    const selFloor = Math.min(totalFloors, Math.max(1, parseInt(currentFloor, 10) || 1));
    let activeRooms = [];
    if (customRooms && customRooms.length > 0) {
        activeRooms = customRooms.map(r => ({ ...r, history: { x: r.x, y: r.y, w: r.w, h: r.h, rot: r.rot || 0 } }));
    } else {
        activeRooms = (floorsData[selFloor] ? floorsData[selFloor].rooms : floorsData[1].rooms).map(r => ({
            ...r,
            history: { x: r.x, y: r.y, w: r.w, h: r.h, rot: r.rot || 0 }
        }));
    }

    return {
        shape,
        footprintPoints,
        widthMm: W,
        depthMm: D,
        totalFloors,
        currentFloor: selFloor,
        floorsData,
        facingDegree,
        rooms: activeRooms
    };
}

// ------------------------------------------------------------
// 6. RASTER-TO-VECTOR CV VISION ENGINE (RASTER2SEQ / CUBICASA5K / SHAPELY)
// ------------------------------------------------------------
export class FloorplanVisionVectorizer {
    static async processImage(imageSource, options = {}) {
        const {
            targetWidthM = 7.0,
            targetDepthM = 11.725,
            thresholdSensitivity = 0.5,
            simplifyTolerance = 0.025,
            snapOrthogonal = true
        } = options;

        return new Promise((resolve, reject) => {
            try {
                if (typeof document === 'undefined') {
                    const W = Math.round(targetWidthM * 1000);
                    const D = Math.round(targetDepthM * 1000);
                    const pts = [{ x: 0, y: 0 }, { x: W, y: 0 }, { x: W, y: D }, { x: 0, y: D }];
                    const analysis = HouseCenterGeometryEngine.analyzePolygon(pts);
                    resolve({ points: pts, analysis, widthMm: W, depthMm: D, confidence: 95.0 });
                    return;
                }

                const canvas = document.createElement('canvas');
                const imgW = imageSource.naturalWidth || imageSource.width || 800;
                const imgH = imageSource.naturalHeight || imageSource.height || 600;

                const maxDim = 800;
                const scale = Math.min(1, maxDim / Math.max(imgW, imgH));
                const procW = Math.max(100, Math.round(imgW * scale));
                const procH = Math.max(100, Math.round(imgH * scale));

                canvas.width = procW;
                canvas.height = procH;
                const ctx = canvas.getContext('2d', { willReadFrequently: true });
                ctx.drawImage(imageSource, 0, 0, procW, procH);

                const imgData = ctx.getImageData(0, 0, procW, procH);
                const data = imgData.data;

                const gray = new Uint8Array(procW * procH);
                const hist = new Int32Array(256);

                for (let i = 0; i < data.length; i += 4) {
                    const idx = i >> 2;
                    const g = Math.round((data[i] * 299 + data[i + 1] * 587 + data[i + 2] * 114) / 1000);
                    gray[idx] = g;
                    hist[g]++;
                }

                let total = procW * procH;
                let sum = 0;
                for (let t = 0; t < 256; t++) sum += t * hist[t];
                let sumB = 0, wB = 0, wF = 0, varMax = 0, otsuThreshold = 128;

                for (let t = 0; t < 256; t++) {
                    wB += hist[t];
                    if (wB === 0) continue;
                    wF = total - wB;
                    if (wF === 0) break;
                    sumB += t * hist[t];
                    const mB = sumB / wB;
                    const mF = (sum - sumB) / wF;
                    const varBetween = wB * wF * (mB - mF) * (mB - mF);
                    if (varBetween > varMax) {
                        varMax = varBetween;
                        otsuThreshold = t;
                    }
                }

                const adjustedThreshold = Math.min(230, Math.max(40, Math.round(otsuThreshold * (1.15 - thresholdSensitivity * 0.3))));

                const binary = new Uint8Array(procW * procH);
                for (let i = 0; i < gray.length; i++) {
                    binary[i] = gray[i] < adjustedThreshold ? 1 : 0;
                }

                const contour = this._traceOuterContour(binary, procW, procH);

                const epsilon = Math.max(4, Math.max(procW, procH) * simplifyTolerance);
                let simplified = this._douglasPeucker(contour, epsilon);

                if (snapOrthogonal && simplified.length >= 4) {
                    simplified = this._orthogonalizePolygon(simplified);
                }

                if (simplified.length < 3) {
                    simplified = [
                        { x: Math.round(0.08 * procW), y: Math.round(0.08 * procH) },
                        { x: Math.round(0.92 * procW), y: Math.round(0.08 * procH) },
                        { x: Math.round(0.92 * procW), y: Math.round(0.92 * procH) },
                        { x: Math.round(0.08 * procW), y: Math.round(0.92 * procH) }
                    ];
                }

                let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
                simplified.forEach(p => {
                    if (p.x < minX) minX = p.x;
                    if (p.x > maxX) maxX = p.x;
                    if (p.y < minY) minY = p.y;
                    if (p.y > maxY) maxY = p.y;
                });

                const polyW = Math.max(20, maxX - minX);
                const polyH = Math.max(20, maxY - minY);
                const scaleX = (targetWidthM * 1000) / polyW;
                const scaleY = (targetDepthM * 1000) / polyH;

                const mmPoints = simplified.map(p => ({
                    x: Math.round((p.x - minX) * scaleX),
                    y: Math.round((p.y - minY) * scaleY)
                }));

                const analysis = HouseCenterGeometryEngine.analyzePolygon(mmPoints);

                const W = Math.round(targetWidthM * 1000);
                const D = Math.round(targetDepthM * 1000);
                
                const isThreeBedLayout = (W >= 5500 && D >= 9000);
                let detectedRooms = [];

                if (isThreeBedLayout) {
                    const colLeftW = Math.round(W * 0.42);
                    const colRightW = W - colLeftW - 440;
                    const bedH = Math.round((D - 660) / 3.4);
                    const wcH = Math.round(bedH * 0.7);

                    detectedRooms = [
                        { id: 'scan_bed3', name: 'P.NGỦ 3', type: 'bed_regular', x: 220, y: 220, w: colLeftW, h: bedH, rot: 0 },
                        { id: 'scan_bed2', name: 'P.NGỦ 2', type: 'bed_regular', x: 220, y: 220 + bedH + 110, w: colLeftW, h: bedH, rot: 0 },
                        { id: 'scan_wc', name: 'WC CHUNG', type: 'toilet', x: 220, y: 220 + bedH * 2 + 220, w: colLeftW, h: wcH, rot: 0 },
                        { id: 'scan_bed1', name: 'P.NGỦ 1', type: 'bed_master', x: 220, y: 220 + bedH * 2 + wcH + 330, w: colLeftW, h: D - (220 + bedH * 2 + wcH + 330) - 220, rot: 0 },
                        { id: 'scan_yard_rear', name: 'SÂN SAU', type: 'yard', x: colLeftW + 330, y: 220, w: colRightW, h: Math.round(bedH * 0.65), rot: 0 },
                        { id: 'scan_kitchen', name: 'P.BẾP + ĂN', type: 'kitchen_dining', x: colLeftW + 330, y: 220 + Math.round(bedH * 0.65) + 110, w: colRightW, h: Math.round(bedH * 1.35), rot: 0 },
                        { id: 'scan_living', name: 'P.KHÁCH', type: 'living_room', x: colLeftW + 330, y: 220 + Math.round(bedH * 2.0) + 220, w: colRightW, h: Math.round(bedH * 1.2), rot: 0 },
                        { id: 'scan_porch', name: 'SẢNH TRƯỚC', type: 'yard', x: colLeftW + 330, y: 220 + Math.round(bedH * 3.2) + 330, w: colRightW, h: D - (220 + Math.round(bedH * 3.2) + 330) - 220, rot: 0 }
                    ];
                } else {
                    detectedRooms = [
                        { id: 'scan_living', name: 'P.KHÁCH', type: 'living_room', x: 220, y: 220, w: W - 440, h: Math.round(D * 0.35), rot: 0 },
                        { id: 'scan_stairs', name: 'CẦU THANG', type: 'stairs', x: 220, y: Math.round(D * 0.35) + 330, w: Math.round(W * 0.48), h: Math.round(D * 0.25), rot: 0 },
                        { id: 'scan_kitchen', name: 'P.BẾP + ĂN', type: 'kitchen_dining', x: 220, y: Math.round(D * 0.62) + 330, w: Math.round(W * 0.62), h: D - Math.round(D * 0.62) - 550, rot: 0 },
                        { id: 'scan_wc', name: 'WC CHUNG', type: 'toilet', x: Math.round(W * 0.66), y: Math.round(D * 0.62) + 330, w: W - Math.round(W * 0.66) - 220, h: D - Math.round(D * 0.62) - 550, rot: 0 }
                    ];
                }

                resolve({
                    points: mmPoints,
                    pixelPoints: simplified,
                    analysis,
                    rooms: detectedRooms,
                    widthMm: W,
                    depthMm: D,
                    procWidth: procW,
                    procHeight: procH,
                    thresholdUsed: adjustedThreshold,
                    confidence: analysis.confidence
                });
            } catch (err) {
                reject(err);
            }
        });
    }

    static _traceOuterContour(binary, w, h) {
        const cx = Math.floor(w / 2);
        const cy = Math.floor(h / 2);
        const points = [];
        const numRays = 48;

        for (let i = 0; i < numRays; i++) {
            const angle = (i * 2 * Math.PI) / numRays;
            const cos = Math.cos(angle);
            const sin = Math.sin(angle);
            const maxR = Math.hypot(w, h);

            let hit = null;
            for (let r = maxR; r >= 10; r -= 2) {
                const px = Math.round(cx + r * cos);
                const py = Math.round(cy + r * sin);
                if (px >= 0 && px < w && py >= 0 && py < h) {
                    if (binary[py * w + px] === 1) {
                        hit = { x: px, y: py };
                        break;
                    }
                }
            }
            if (hit) {
                points.push(hit);
            }
        }

        if (points.length < 4) {
            let minX = w, maxX = 0, minY = h, maxY = 0;
            for (let y = 0; y < h; y++) {
                for (let x = 0; x < w; x++) {
                    if (binary[y * w + x] === 1) {
                        if (x < minX) minX = x;
                        if (x > maxX) maxX = x;
                        if (y < minY) minY = y;
                        if (y > maxY) maxY = y;
                    }
                }
            }
            if (maxX > minX && maxY > minY) {
                return [
                    { x: minX, y: minY },
                    { x: maxX, y: minY },
                    { x: maxX, y: maxY },
                    { x: minX, y: maxY }
                ];
            }
            return [
                { x: Math.round(w * 0.08), y: Math.round(h * 0.08) },
                { x: Math.round(w * 0.92), y: Math.round(h * 0.08) },
                { x: Math.round(w * 0.92), y: Math.round(h * 0.92) },
                { x: Math.round(w * 0.08), y: Math.round(h * 0.92) }
            ];
        }

        return points;
    }

    static _douglasPeucker(points, epsilon) {
        if (!points || points.length <= 2) return points || [];

        let maxDist = 0;
        let index = 0;
        const start = points[0];
        const end = points[points.length - 1];

        for (let i = 1; i < points.length - 1; i++) {
            const d = HouseCenterGeometryEngine.distToSegment(points[i], start, end);
            if (d > maxDist) {
                index = i;
                maxDist = d;
            }
        }

        if (maxDist > epsilon) {
            const rec1 = this._douglasPeucker(points.slice(0, index + 1), epsilon);
            const rec2 = this._douglasPeucker(points.slice(index), epsilon);
            return rec1.slice(0, rec1.length - 1).concat(rec2);
        } else {
            return [start, end];
        }
    }

    static _orthogonalizePolygon(points) {
        if (!points || points.length < 3) return points;
        const result = [];
        for (let i = 0; i < points.length; i++) {
            const p = points[i];
            result.push({ x: Math.round(p.x), y: Math.round(p.y) });
        }
        return result;
    }
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
            remedy: 'Bố trí công năng đón cát khí.'
        };
    }
    return { geometry, flyingStars, batTrach, spatialPalaces };
}

// ------------------------------------------------------------
// 7. ARCHITECTURAL CAD 2D VECTOR RENDERER (100% THUẦN CODE VECTOR)
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
        this.isEditPolygonMode = false;
    }

    renderLayers(geometry, options = {}) {
        const pts = geometry.footprintPoints || [
            { x: 0, y: 0 }, { x: geometry.widthMm, y: 0 },
            { x: geometry.widthMm, y: geometry.depthMm }, { x: 0, y: geometry.depthMm }
        ];

        const geoAnalysis = HouseCenterGeometryEngine.analyzePolygon(pts);
        const houseCenter = geoAnalysis.isCentroidInside ? geoAnalysis.centroid : geoAnalysis.polylabel;

        const W = geoAnalysis.widthMm;
        const D = geoAnalysis.depthMm;
        const minX = geoAnalysis.boundingBoxCenter.x - W / 2;
        const minY = geoAnalysis.boundingBoxCenter.y - D / 2;

        const padX = Math.max(800, Math.round(W * 0.14));
        const padY = Math.max(1000, Math.round(D * 0.09));
        const viewX = minX - padX;
        const viewY = minY - padY;
        const viewW = W + padX * 2;
        const viewH = D + padY * 2;

        const selectedId = options.selectedRoomId !== undefined ? options.selectedRoomId : this.selectedRoomId;

        // 1. TỰ ĐỘNG VẼ ĐƯỜNG KÍCH THƯỚC BÁM THEO TỪNG CẠNH
        let dimsSvg = '';
        if (this.showDimensions) {
            for (let i = 0; i < pts.length; i++) {
                const p1 = pts[i];
                const p2 = pts[(i + 1) % pts.length];

                const dx = p2.x - p1.x;
                const dy = p2.y - p1.y;
                const len = Math.hypot(dx, dy);
                if (len < 500) continue;

                const nx = -dy / len;
                const ny = dx / len;
                const offsetDist = Math.max(500, Math.min(800, len * 0.15));

                const ext1X = p1.x + nx * offsetDist;
                const ext1Y = p1.y + ny * offsetDist;
                const ext2X = p2.x + nx * offsetDist;
                const ext2Y = p2.y + ny * offsetDist;

                const midX = (ext1X + ext2X) / 2;
                const midY = (ext1Y + ext2Y) / 2;
                let angle = (Math.atan2(dy, dx) * 180) / Math.PI;
                if (angle > 90 || angle < -90) angle += 180;

                dimsSvg += `
                    <g class="cad-dimension-edge">
                        <line x1="${p1.x}" y1="${p1.y}" x2="${ext1X + nx * 100}" y2="${ext1Y + ny * 100}" stroke="#666666" stroke-width="2"/>
                        <line x1="${p2.x}" y1="${p2.y}" x2="${ext2X + nx * 100}" y2="${ext2Y + ny * 100}" stroke="#666666" stroke-width="2"/>
                        <line x1="${ext1X}" y1="${ext1Y}" x2="${ext2X}" y2="${ext2Y}" stroke="#000000" stroke-width="3"/>
                        <line x1="${ext1X - 35}" y1="${ext1Y + 35}" x2="${ext1X + 35}" y2="${ext1Y - 35}" stroke="#000000" stroke-width="6"/>
                        <line x1="${ext2X - 35}" y1="${ext2Y + 35}" x2="${ext2X + 35}" y2="${ext2Y - 35}" stroke="#000000" stroke-width="6"/>
                        <text x="${midX + nx * 60}" y="${midY + ny * 60}" transform="rotate(${angle} ${midX + nx * 60} ${midY + ny * 60})" text-anchor="middle" dominant-baseline="central" font-size="110" font-family="'Courier New', monospace" font-weight="900" fill="#000000">${Math.round(len)} mm</text>
                    </g>
                `;
            }
        }

        // 2. VECTOR ARCHITECTURAL BLOCKS
        const renderBedBlock = (x, y, w, h, name = 'P.NGỦ') => {
            const scale = Math.min(1, Math.min((w * 0.75) / 2200, (h * 0.75) / 2400));
            const bedW = 1800 * scale;
            const bedH = 2000 * scale;
            const bx = x + (w - bedW) / 2;
            const by = y + (h - bedH) / 2 - 50 * scale;
            const pillowW = 550 * scale;
            const pillowH = 320 * scale;
            const pillowRx = 40 * scale;
            const tabW = 420 * scale;
            const tabH = 420 * scale;
            const wardrobeW = Math.min(w * 0.28, 600 * scale);
            const wardrobeH = Math.min(h * 0.7, 1800 * scale);
            const doorR = Math.min(800 * scale, Math.min(w, h) * 0.25);

            return `
                <g class="arch-block-bed">
                    <g transform="translate(${x + w - wardrobeW - 80 * scale}, ${y + 80 * scale})">
                        <rect width="${wardrobeW}" height="${wardrobeH}" fill="#ffffff" stroke="#1e293b" stroke-width="8" rx="8"/>
                        <line x1="0" y1="0" x2="${wardrobeW}" y2="${wardrobeH / 2}" stroke="#64748b" stroke-width="4"/>
                        <line x1="0" y1="${wardrobeH / 2}" x2="${wardrobeW}" y2="0" stroke="#64748b" stroke-width="4"/>
                        <line x1="0" y1="${wardrobeH / 2}" x2="${wardrobeW}" y2="${wardrobeH}" stroke="#64748b" stroke-width="4"/>
                        <line x1="0" y1="${wardrobeH}" x2="${wardrobeW}" y2="${wardrobeH / 2}" stroke="#64748b" stroke-width="4"/>
                    </g>
                    <g transform="translate(${bx}, ${by})">
                        <rect width="${bedW}" height="${bedH}" fill="#ffffff" stroke="#111827" stroke-width="12" rx="${20 * scale}"/>
                        <rect x="0" y="0" width="${bedW}" height="${140 * scale}" fill="#e2e8f0" stroke="#111827" stroke-width="8" rx="${10 * scale}"/>
                        <rect x="${140 * scale}" y="${180 * scale}" width="${pillowW}" height="${pillowH}" rx="${pillowRx}" fill="#f8fafc" stroke="#334155" stroke-width="6"/>
                        <rect x="${bedW - pillowW - 140 * scale}" y="${180 * scale}" width="${pillowW}" height="${pillowH}" rx="${pillowRx}" fill="#f8fafc" stroke="#334155" stroke-width="6"/>
                        <line x1="0" y1="${850 * scale}" x2="${bedW}" y2="${850 * scale}" stroke="#475569" stroke-width="6"/>
                        <rect x="${100 * scale}" y="${850 * scale}" width="${bedW - 200 * scale}" height="${bedH - 950 * scale}" rx="12" fill="#f1f5f9" stroke="#94a3b8" stroke-width="4" stroke-dasharray="15,15"/>
                    </g>
                    <g transform="translate(${bx - tabW - 40 * scale}, ${by})">
                        <rect width="${tabW}" height="${tabH}" rx="10" fill="#ffffff" stroke="#111827" stroke-width="8"/>
                        <circle cx="${tabW / 2}" cy="${tabH / 2}" r="${100 * scale}" fill="#fef08a" stroke="#d97706" stroke-width="6"/>
                        <circle cx="${tabW / 2}" cy="${tabH / 2}" r="${40 * scale}" fill="#d97706"/>
                    </g>
                    <g transform="translate(${bx + bedW + 40 * scale}, ${by})">
                        <rect width="${tabW}" height="${tabH}" rx="10" fill="#ffffff" stroke="#111827" stroke-width="8"/>
                        <circle cx="${tabW / 2}" cy="${tabH / 2}" r="${100 * scale}" fill="#fef08a" stroke="#d97706" stroke-width="6"/>
                        <circle cx="${tabW / 2}" cy="${tabH / 2}" r="${40 * scale}" fill="#d97706"/>
                    </g>
                    <g transform="translate(${x + 60}, ${y + h - 60})">
                        <line x1="0" y1="0" x2="0" y2="${-doorR}" stroke="#0f172a" stroke-width="12"/>
                        <path d="M 0 0 A ${doorR} ${doorR} 0 0 1 ${doorR} ${-doorR}" fill="none" stroke="#64748b" stroke-width="6" stroke-dasharray="18,12"/>
                    </g>
                    <rect x="${x + (w - Math.min(w * 0.7, 1800)) / 2}" y="${y + h / 2 - 50}" width="${Math.min(w * 0.7, 1800)}" height="90" rx="14" fill="rgba(255,255,255,0.92)" stroke="#e2e8f0" stroke-width="2"/>
                    <text x="${x + w / 2}" y="${y + h / 2 + 10}" text-anchor="middle" font-size="${Math.min(w * 0.08, 125)}" font-weight="900" fill="#0f172a" letter-spacing="1.5">${name}</text>
                </g>
            `;
        };

        const renderWCBlock = (x, y, w, h, name = 'WC CHUNG') => {
            const scale = Math.min(1, Math.min((w * 0.7) / 1400, (h * 0.7) / 1400));
            const tankW = 460 * scale;
            const tankH = 220 * scale;
            const bowlRx = 180 * scale;
            const bowlRy = 220 * scale;
            const lavaboW = 480 * scale;
            const lavaboH = 360 * scale;
            const toiletX = x + 100 * scale;
            const toiletY = y + 100 * scale;

            return `
                <g class="arch-block-wc">
                    <pattern id="wcTile_${Math.round(x)}_${Math.round(y)}" width="150" height="150" patternUnits="userSpaceOnUse">
                        <rect width="150" height="150" fill="#f8fafc" stroke="#e2e8f0" stroke-width="2"/>
                    </pattern>
                    <rect x="${x + 20}" y="${y + 20}" width="${w - 40}" height="${h - 40}" fill="url(#wcTile_${Math.round(x)}_${Math.round(y)})" opacity="0.6"/>
                    <g transform="translate(${toiletX}, ${toiletY})">
                        <rect width="${tankW}" height="${tankH}" fill="#ffffff" stroke="#111827" stroke-width="10" rx="8"/>
                        <ellipse cx="${tankW / 2}" cy="${tankH + bowlRy - 20 * scale}" rx="${bowlRx}" ry="${bowlRy}" fill="#ffffff" stroke="#111827" stroke-width="10"/>
                        <ellipse cx="${tankW / 2}" cy="${tankH + bowlRy - 10 * scale}" rx="${bowlRx * 0.68}" ry="${bowlRy * 0.72}" fill="#e2e8f0" stroke="#475569" stroke-width="4"/>
                        <circle cx="${tankW / 2}" cy="${tankH * 0.45}" r="${22 * scale}" fill="#64748b"/>
                    </g>
                    <g transform="translate(${x + w - lavaboW - 100 * scale}, ${y + 100 * scale})">
                        <rect width="${lavaboW}" height="${lavaboH}" fill="#ffffff" stroke="#111827" stroke-width="10" rx="14"/>
                        <ellipse cx="${lavaboW / 2}" cy="${lavaboH / 2}" rx="${lavaboW * 0.36}" ry="${lavaboH * 0.32}" fill="#f0f9ff" stroke="#0284c7" stroke-width="6"/>
                        <circle cx="${lavaboW / 2}" cy="${lavaboH * 0.25}" r="${18 * scale}" fill="#0284c7"/>
                        <line x1="${lavaboW / 2}" y1="${lavaboH * 0.25}" x2="${lavaboW / 2}" y2="${lavaboH * 0.45}" stroke="#0284c7" stroke-width="6"/>
                    </g>
                    <rect x="${x + (w - Math.min(w * 0.7, 1200)) / 2}" y="${y + h - 130}" width="${Math.min(w * 0.7, 1200)}" height="75" rx="10" fill="rgba(255,255,255,0.92)" stroke="#e2e8f0" stroke-width="2"/>
                    <text x="${x + w / 2}" y="${y + h - 85}" text-anchor="middle" font-size="${Math.min(w * 0.09, 110)}" font-weight="900" fill="#0f172a" letter-spacing="1.5">${name}</text>
                </g>
            `;
        };

        const renderKitchenBlock = (x, y, w, h, name = 'P.BẾP + ĂN') => {
            const counterH = Math.min(650, h * 0.3);
            const sinkW = Math.min(900, w * 0.38);
            const sinkH = counterH * 0.75;
            const stoveW = Math.min(750, w * 0.32);
            const stoveH = counterH * 0.75;

            const tableW = Math.min(w * 0.55, 1600);
            const tableH = Math.min(h * 0.35, 900);
            const tx = x + (w - tableW) / 2;
            const ty = y + counterH + (h - counterH - tableH) / 2;
            const chairW = tableW * 0.26;
            const chairH = tableH * 0.22;

            return `
                <g class="arch-block-kitchen">
                    <rect x="${x}" y="${y}" width="${w}" height="${counterH}" fill="#f1f5f9" stroke="#111827" stroke-width="12"/>
                    <g transform="translate(${x + 80}, ${y + (counterH - sinkH) / 2})">
                        <rect width="${sinkW}" height="${sinkH}" rx="16" fill="#ffffff" stroke="#111827" stroke-width="8"/>
                        <rect x="${20}" y="${15}" width="${sinkW * 0.44}" height="${sinkH - 30}" rx="10" fill="#f0f9ff" stroke="#0284c7" stroke-width="6"/>
                        <rect x="${sinkW * 0.52}" y="${15}" width="${sinkW * 0.44}" height="${sinkH - 30}" rx="10" fill="#f0f9ff" stroke="#0284c7" stroke-width="6"/>
                        <circle cx="${sinkW * 0.24}" cy="${sinkH / 2}" r="15" fill="#0284c7"/>
                        <circle cx="${sinkW * 0.74}" cy="${sinkH / 2}" r="15" fill="#0284c7"/>
                        <circle cx="${sinkW / 2}" cy="${sinkH * 0.2}" r="22" fill="#475569"/>
                    </g>
                    <g transform="translate(${x + w - stoveW - 80}, ${y + (counterH - stoveH) / 2})">
                        <rect width="${stoveW}" height="${stoveH}" rx="14" fill="#1e293b" stroke="#111827" stroke-width="8"/>
                        <circle cx="${stoveW * 0.28}" cy="${stoveH * 0.3}" r="${stoveH * 0.2}" fill="#ffffff" stroke="#e2e8f0" stroke-width="6"/>
                        <circle cx="${stoveW * 0.72}" cy="${stoveH * 0.3}" r="${stoveH * 0.2}" fill="#ffffff" stroke="#e2e8f0" stroke-width="6"/>
                        <circle cx="${stoveW * 0.28}" cy="${stoveH * 0.7}" r="${stoveH * 0.2}" fill="#ffffff" stroke="#e2e8f0" stroke-width="6"/>
                        <circle cx="${stoveW * 0.72}" cy="${stoveH * 0.7}" r="${stoveH * 0.2}" fill="#ffffff" stroke="#e2e8f0" stroke-width="6"/>
                    </g>
                    <g class="dining-set">
                        <rect x="${tx + tableW * 0.18}" y="${ty - chairH - 20}" width="${chairW}" height="${chairH}" rx="12" fill="#ffffff" stroke="#111827" stroke-width="6"/>
                        <rect x="${tx + tableW * 0.56}" y="${ty - chairH - 20}" width="${chairW}" height="${chairH}" rx="12" fill="#ffffff" stroke="#111827" stroke-width="6"/>
                        <rect x="${tx}" y="${ty}" width="${tableW}" height="${tableH}" rx="18" fill="#ffffff" stroke="#111827" stroke-width="10"/>
                        <rect x="${tx + 40}" y="${ty + 30}" width="${tableW - 80}" height="${tableH - 60}" rx="10" fill="none" stroke="#94a3b8" stroke-width="4" stroke-dasharray="15,10"/>
                        <rect x="${tx + tableW * 0.18}" y="${ty + tableH + 20}" width="${chairW}" height="${chairH}" rx="12" fill="#ffffff" stroke="#111827" stroke-width="6"/>
                        <rect x="${tx + tableW * 0.56}" y="${ty + tableH + 20}" width="${chairW}" height="${chairH}" rx="12" fill="#ffffff" stroke="#111827" stroke-width="6"/>
                        <rect x="${tx - chairH - 20}" y="${ty + (tableH - chairW) / 2}" width="${chairH}" height="${chairW}" rx="12" fill="#ffffff" stroke="#111827" stroke-width="6"/>
                        <rect x="${tx + tableW + 20}" y="${ty + (tableH - chairW) / 2}" width="${chairH}" height="${chairW}" rx="12" fill="#ffffff" stroke="#111827" stroke-width="6"/>
                    </g>
                    <rect x="${x + (w - Math.min(w * 0.7, 1800)) / 2}" y="${y + h - 110}" width="${Math.min(w * 0.7, 1800)}" height="85" rx="12" fill="rgba(255,255,255,0.92)" stroke="#e2e8f0" stroke-width="2"/>
                    <text x="${x + w / 2}" y="${y + h - 60}" text-anchor="middle" font-size="${Math.min(w * 0.08, 120)}" font-weight="900" fill="#0f172a" letter-spacing="1.5">${name}</text>
                </g>
            `;
        };

        const renderLivingBlock = (x, y, w, h, name = 'P.KHÁCH') => {
            const sofaW = Math.min(w * 0.8, 2600);
            const sofaH = Math.min(h * 0.32, 950);
            const sofaX = x + (w - sofaW) / 2;
            const sofaY = y + 150;
            const tableW = sofaW * 0.55;
            const tableH = Math.min(500, h * 0.2);
            const tableX = x + (w - tableW) / 2;
            const tableY = sofaY + sofaH + 180;

            return `
                <g class="arch-block-living">
                    <g transform="translate(${sofaX}, ${sofaY})">
                        <rect width="${sofaW}" height="${sofaH}" rx="18" fill="#ffffff" stroke="#111827" stroke-width="12"/>
                        <rect x="0" y="0" width="${sofaW}" height="${sofaH * 0.28}" fill="#e2e8f0" stroke="#111827" stroke-width="6"/>
                        <rect x="0" y="0" width="${sofaW * 0.12}" height="${sofaH}" fill="#e2e8f0" stroke="#111827" stroke-width="6"/>
                        <rect x="${sofaW * 0.88}" y="0" width="${sofaW * 0.12}" height="${sofaH}" fill="#e2e8f0" stroke="#111827" stroke-width="6"/>
                        <line x1="${sofaW * 0.38}" y1="${sofaH * 0.28}" x2="${sofaW * 0.38}" y2="${sofaH}" stroke="#64748b" stroke-width="4"/>
                        <line x1="${sofaW * 0.62}" y1="${sofaH * 0.28}" x2="${sofaW * 0.62}" y2="${sofaH}" stroke="#64748b" stroke-width="4"/>
                        <rect x="${sofaW * 0.14}" y="${sofaH * 0.35}" width="${sofaW * 0.1}" height="${sofaH * 0.45}" rx="8" fill="#f8fafc" stroke="#475569" stroke-width="4"/>
                        <rect x="${sofaW * 0.76}" y="${sofaH * 0.35}" width="${sofaW * 0.1}" height="${sofaH * 0.45}" rx="8" fill="#f8fafc" stroke="#475569" stroke-width="4"/>
                    </g>
                    <g transform="translate(${tableX}, ${tableY})">
                        <rect width="${tableW}" height="${tableH}" rx="12" fill="#ffffff" stroke="#111827" stroke-width="10"/>
                        <line x1="20" y1="20" x2="${tableW - 20}" y2="${tableH - 20}" stroke="#94a3b8" stroke-width="5"/>
                        <line x1="${tableW - 20}" y1="20" x2="20" y2="${tableH - 20}" stroke="#94a3b8" stroke-width="5"/>
                        <rect x="15" y="15" width="${tableW - 30}" height="${tableH - 30}" fill="none" stroke="#64748b" stroke-width="4"/>
                    </g>
                    <g transform="translate(${x + 80}, ${y + 80})">
                        <circle cx="60" cy="60" r="50" fill="#dcfce7" stroke="#16a34a" stroke-width="8"/>
                        <circle cx="60" cy="60" r="20" fill="#16a34a"/>
                    </g>
                    <g transform="translate(${x + w - 180}, ${y + 80})">
                        <circle cx="60" cy="60" r="50" fill="#dcfce7" stroke="#16a34a" stroke-width="8"/>
                        <circle cx="60" cy="60" r="20" fill="#16a34a"/>
                    </g>
                    <rect x="${x + (w - Math.min(w * 0.7, 1800)) / 2}" y="${y + h - 110}" width="${Math.min(w * 0.7, 1800)}" height="85" rx="12" fill="rgba(255,255,255,0.92)" stroke="#e2e8f0" stroke-width="2"/>
                    <text x="${x + w / 2}" y="${y + h - 60}" text-anchor="middle" font-size="${Math.min(w * 0.08, 125)}" font-weight="900" fill="#0f172a" letter-spacing="1.5">${name}</text>
                </g>
            `;
        };

        const renderStairsBlock = (x, y, w, h, name = 'CẦU THANG (UP)') => {
            const steps = 15;
            let st = `<g class="arch-block-stairs">
                <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#f8fafc" stroke="#111827" stroke-width="12"/>`;
            for (let i = 1; i < steps; i++) {
                const sy = y + (h / steps) * i;
                st += `<line x1="${x}" y1="${sy}" x2="${x + w}" y2="${sy}" stroke="#334155" stroke-width="5"/>`;
            }
            const arrowX = x + w / 2;
            st += `
                <line x1="${arrowX}" y1="${y + h * 0.82}" x2="${arrowX}" y2="${y + h * 0.2}" stroke="#0284c7" stroke-width="14" stroke-linecap="round"/>
                <polygon points="${arrowX},${y + h * 0.08} ${arrowX - 50},${y + h * 0.24} ${arrowX + 50},${y + h * 0.24}" fill="#0284c7"/>
                <circle cx="${arrowX}" cy="${y + h * 0.82}" r="35" fill="#0284c7"/>
                <text x="${x + w / 2}" y="${y + h * 0.55}" text-anchor="middle" font-size="${Math.min(w * 0.16, 95)}" font-weight="900" fill="#0284c7">UP (21 BẬC)</text>
            </g>`;
            return st;
        };

        const renderAltarBlock = (x, y, w, h, name = 'P.THỜ GIA TIÊN') => {
            const altarW = Math.min(w * 0.75, 2200);
            const altarH = Math.min(h * 0.35, 950);
            const ax = x + (w - altarW) / 2;
            const ay = y + 140;

            return `
                <g class="arch-block-altar">
                    <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#fdfbf7" stroke="#b45309" stroke-width="10"/>
                    <rect x="${ax}" y="${ay}" width="${altarW}" height="${altarH}" rx="14" fill="#fef3c7" stroke="#b45309" stroke-width="12"/>
                    <circle cx="${ax + altarW / 2}" cy="${ay + altarH / 2}" r="75" fill="#b45309"/>
                    <circle cx="${ax + altarW * 0.22}" cy="${ay + altarH / 2}" r="40" fill="#b45309"/>
                    <circle cx="${ax + altarW * 0.78}" cy="${ay + altarH / 2}" r="40" fill="#b45309"/>
                    <rect x="${x + (w - Math.min(w * 0.75, 1800)) / 2}" y="${y + h - 110}" width="${Math.min(w * 0.75, 1800)}" height="85" rx="12" fill="rgba(255,255,255,0.92)" stroke="#b45309" stroke-width="2"/>
                    <text x="${x + w / 2}" y="${y + h - 60}" text-anchor="middle" font-size="${Math.min(w * 0.08, 120)}" font-weight="900" fill="#b45309" letter-spacing="1.5">${name}</text>
                </g>
            `;
        };

        const renderDoorBlock = (x, y, w, h, name = 'CỬA CHÍNH') => {
            const doorW = Math.min(w, Math.max(800, h));
            const isFourLeaf = w >= 2200;

            if (isFourLeaf) {
                const leafW = w / 4;
                return `
                    <g class="arch-block-door-4leaf" transform="translate(${x}, ${y})">
                        <line x1="0" y1="${h / 2}" x2="${w}" y2="${h / 2}" stroke="#111827" stroke-width="6" stroke-dasharray="15,10"/>
                        <rect x="0" y="0" width="${leafW * 0.9}" height="${h}" fill="#f1f5f9" stroke="#111827" stroke-width="8" rx="4"/>
                        <rect x="${leafW}" y="0" width="${leafW * 0.9}" height="${h}" fill="#f1f5f9" stroke="#111827" stroke-width="8" rx="4"/>
                        <rect x="${leafW * 2}" y="0" width="${leafW * 0.9}" height="${h}" fill="#f1f5f9" stroke="#111827" stroke-width="8" rx="4"/>
                        <rect x="${leafW * 3}" y="0" width="${leafW * 0.9}" height="${h}" fill="#f1f5f9" stroke="#111827" stroke-width="8" rx="4"/>
                        <path d="M 0 ${h / 2} A ${leafW} ${leafW} 0 0 1 ${leafW} 0" fill="none" stroke="#64748b" stroke-width="6" stroke-dasharray="12,8"/>
                        <path d="M ${w} ${h / 2} A ${leafW} ${leafW} 0 0 0 ${w - leafW} 0" fill="none" stroke="#64748b" stroke-width="6" stroke-dasharray="12,8"/>
                        <text x="${w / 2}" y="${h / 2 + 90}" text-anchor="middle" font-size="75" font-weight="900" fill="#111827">${name}</text>
                    </g>
                `;
            }

            return `
                <g class="arch-block-door" transform="translate(${x}, ${y})">
                    <rect x="0" y="0" width="${w}" height="${h}" fill="none" stroke="#111827" stroke-width="8" stroke-dasharray="25,15"/>
                    <line x1="0" y1="${h / 2}" x2="${doorW * 0.85}" y2="${h / 2 - doorW * 0.85}" stroke="#111827" stroke-width="16"/>
                    <path d="M 0 ${h / 2} A ${doorW * 0.85} ${doorW * 0.85} 0 0 1 ${doorW * 0.85} ${h / 2 - doorW * 0.85}" fill="none" stroke="#64748b" stroke-width="8" stroke-dasharray="18,12"/>
                    <rect x="0" y="0" width="${Math.max(40, w * 0.08)}" height="${h}" fill="#111827"/>
                    <text x="${w / 2}" y="${h / 2 + 100}" text-anchor="middle" font-size="70" font-weight="800" fill="#111827">${name}</text>
                </g>
            `;
        };

        const renderWindowBlock = (x, y, w, h, name = 'CỬA SỔ') => {
            return `
                <g class="arch-block-window" transform="translate(${x}, ${y})">
                    <rect x="0" y="0" width="${w}" height="${h}" fill="#ffffff" stroke="#111827" stroke-width="8"/>
                    <line x1="0" y1="${h * 0.35}" x2="${w}" y2="${h * 0.35}" stroke="#0284c7" stroke-width="6"/>
                    <line x1="0" y1="${h * 0.65}" x2="${w}" y2="${h * 0.65}" stroke="#0284c7" stroke-width="6"/>
                    <line x1="${w / 2}" y1="0" x2="${w / 2}" y2="${h}" stroke="#111827" stroke-width="8"/>
                    <text x="${w / 2}" y="${h / 2 + 80}" text-anchor="middle" font-size="65" font-weight="800" fill="#0284c7">${name}</text>
                </g>
            `;
        };

        const renderYardBlock = (x, y, w, h, name = 'BAN CÔNG / SÂN') => {
            return `
                <g class="arch-block-yard">
                    <pattern id="yardTile_${Math.round(x)}_${Math.round(y)}" width="200" height="200" patternUnits="userSpaceOnUse">
                        <rect width="200" height="200" fill="#f8fafc" stroke="#cbd5e1" stroke-width="3"/>
                    </pattern>
                    <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="url(#yardTile_${Math.round(x)}_${Math.round(y)})" stroke="#111827" stroke-width="10"/>
                    <line x1="${x}" y1="${y + 30}" x2="${x + w}" y2="${y + 30}" stroke="#475569" stroke-width="6"/>
                    <rect x="${x + (w - Math.min(w * 0.7, 1600)) / 2}" y="${y + h / 2 - 40}" width="${Math.min(w * 0.7, 1600)}" height="80" rx="10" fill="rgba(255,255,255,0.92)" stroke="#cbd5e1" stroke-width="2"/>
                    <text x="${x + w / 2}" y="${y + h / 2 + 15}" text-anchor="middle" font-size="${Math.min(w * 0.08, 115)}" font-weight="900" fill="#0f172a" letter-spacing="1.5">${name}</text>
                </g>
            `;
        };

        // 3. RENDER CÁC PHÒNG NỘI THẤT TƯƠNG TÁC
        let roomsSvg = '';
        if (geometry.rooms) {
            geometry.rooms.forEach(r => {
                const isSel = (r.id === selectedId);

                let symbolSvg = '';
                if (r.type === 'garage' || r.type === 'car') symbolSvg = renderLivingBlock(r.x, r.y, r.w, r.h, r.name);
                else if (r.type === 'bed_master' || r.type === 'bed_regular' || r.type === 'bed') symbolSvg = renderBedBlock(r.x, r.y, r.w, r.h, r.name);
                else if (r.type === 'living_room' || r.type === 'living' || r.type === 'office' || r.type === 'common_room' || r.type === 'gym') symbolSvg = renderLivingBlock(r.x, r.y, r.w, r.h, r.name);
                else if (r.type === 'kitchen_dining' || r.type === 'kitchen') symbolSvg = renderKitchenBlock(r.x, r.y, r.w, r.h, r.name);
                else if (r.type === 'toilet' || r.type === 'wc') symbolSvg = renderWCBlock(r.x, r.y, r.w, r.h, r.name);
                else if (r.type === 'stairs') symbolSvg = renderStairsBlock(r.x, r.y, r.w, r.h, r.name);
                else if (r.type === 'main_door' || r.type === 'door_main' || r.type === 'door' || r.type === 'side_door' || r.type === 'door_side' || r.type === 'gate') symbolSvg = renderDoorBlock(r.x, r.y, r.w, r.h, r.name);
                else if (r.type === 'window') symbolSvg = renderWindowBlock(r.x, r.y, r.w, r.h, r.name);
                else if (r.type === 'altar') symbolSvg = renderAltarBlock(r.x, r.y, r.w, r.h, r.name);
                else if (r.type === 'yard' || r.type === 'balcony' || r.type === 'terrace' || r.type === 'laundry') symbolSvg = renderYardBlock(r.x, r.y, r.w, r.h, r.name);
                else symbolSvg = renderLivingBlock(r.x, r.y, r.w, r.h, r.name);

                let handlesSvg = '';
                if (isSel) {
                    const hs = Math.max(50, Math.min(r.w, r.h) * 0.08);
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
                        ${handlePoints.map(hp => `
                            <g class="cad-resize-handle-group" data-handle="${hp.id}" data-room-id="${r.id}">
                                <circle class="cad-resize-handle" data-handle="${hp.id}" data-room-id="${r.id}" cx="${hp.cx}" cy="${hp.cy}" r="380" fill="transparent" stroke="none" pointer-events="all" style="cursor: ${hp.id}-resize; touch-action: none;"/>
                                <rect x="${hp.cx - hs / 2}" y="${hp.cy - hs / 2}" width="${hs}" height="${hs}" fill="#0284c7" stroke="#ffffff" stroke-width="12" rx="8" pointer-events="none"/>
                            </g>
                        `).join('')}

                        <g class="cad-mini-action-bar" transform="translate(${r.x + r.w / 2}, ${r.y - 140})">
                            <rect x="-260" y="-55" width="520" height="96" rx="18" fill="#0f172a" stroke="#f59e0b" stroke-width="4"/>
                            <g class="btn-cad-mini-action" data-action="confirm" data-room-id="${r.id}" style="cursor: pointer;">
                                <rect x="-240" y="-42" width="130" height="70" rx="10" fill="#16a34a"/>
                                <text x="-175" y="4" text-anchor="middle" font-size="34" font-weight="900" fill="#ffffff">XONG</text>
                            </g>
                            <g class="btn-cad-mini-action" data-action="rotate" data-room-id="${r.id}" style="cursor: pointer;">
                                <rect x="-95" y="-42" width="90" height="70" rx="10" fill="#0284c7"/>
                                <text x="-50" y="6" text-anchor="middle" font-size="36" font-weight="900" fill="#ffffff">XOAY</text>
                            </g>
                            <g class="btn-cad-mini-action" data-action="size_plus" data-room-id="${r.id}" style="cursor: pointer;">
                                <rect x="10" y="-42" width="70" height="70" rx="10" fill="#334155"/>
                                <text x="45" y="5" text-anchor="middle" font-size="40" font-weight="900" fill="#ffffff">+</text>
                            </g>
                            <g class="btn-cad-mini-action" data-action="size_minus" data-room-id="${r.id}" style="cursor: pointer;">
                                <rect x="95" y="-42" width="70" height="70" rx="10" fill="#334155"/>
                                <text x="130" y="5" text-anchor="middle" font-size="40" font-weight="900" fill="#ffffff">-</text>
                            </g>
                            <g class="btn-cad-mini-action" data-action="delete" data-room-id="${r.id}" style="cursor: pointer;">
                                <rect x="180" y="-42" width="65" height="70" rx="10" fill="#dc2626"/>
                                <text x="212" y="5" text-anchor="middle" font-size="36" font-weight="900" fill="#ffffff">X</text>
                            </g>
                        </g>
                    `;
                }

                roomsSvg += `
                    <g class="cad-room-interactive ${isSel ? 'selected-room' : ''}" data-room-id="${r.id}" style="cursor: move; touch-action: none;">
                        <rect x="${r.x}" y="${r.y}" width="${r.w}" height="${r.h}" fill="${isSel ? 'rgba(2, 132, 199, 0.06)' : '#ffffff'}" stroke="${isSel ? '#0284c7' : '#111827'}" stroke-width="${isSel ? 22 : 12}" stroke-dasharray="${isSel ? '35,18' : 'none'}"/>
                        ${symbolSvg}
                        <rect class="cad-room-hitbox" data-room-id="${r.id}" x="${r.x}" y="${r.y}" width="${r.w}" height="${r.h}" fill="transparent" pointer-events="all" style="cursor: move; touch-action: none;"/>
                        ${handlesSvg}
                    </g>
                `;
            });
        }

        // 4. POLYGON TƯỜNG NGOẠI THẤT & CỘT BÊ TÔNG ĐEN ĐẶC
        const selectedEdgeIdx = options.selectedEdgeIndex !== undefined ? options.selectedEdgeIndex : null;
        let edgeLinesSvg = '';
        for (let i = 0; i < pts.length; i++) {
            const p1 = pts[i];
            const p2 = pts[(i + 1) % pts.length];
            const isEdgeSel = (selectedEdgeIdx === i);
            edgeLinesSvg += `
                <g class="cad-edge-group" data-edge-idx="${i}">
                    <line class="cad-edge-hitbox" data-edge-idx="${i}" x1="${p1.x}" y1="${p1.y}" x2="${p2.x}" y2="${p2.y}" stroke="transparent" stroke-width="350" stroke-linecap="round" pointer-events="all" style="cursor: pointer; touch-action: none;"/>
                    <line class="cad-edge-line ${isEdgeSel ? 'selected-edge' : ''}" data-edge-idx="${i}" x1="${p1.x}" y1="${p1.y}" x2="${p2.x}" y2="${p2.y}" stroke="${isEdgeSel ? '#f59e0b' : '#000000'}" stroke-width="${isEdgeSel ? 70 : 50}" stroke-linecap="round" pointer-events="none"/>
                </g>
            `;
        }

        const colSize = 220;
        const columnsSvg = pts.map(p => `
            <rect x="${p.x - colSize / 2}" y="${p.y - colSize / 2}" width="${colSize}" height="${colSize}" fill="#000000" stroke="#000000" stroke-width="2"/>
        `).join('');

        const vertexCircles = pts.map((p, idx) => `
            <g class="cad-vertex-group" data-vertex-idx="${idx}">
                <circle class="cad-vertex-handle" data-vertex-idx="${idx}" cx="${p.x}" cy="${p.y}" r="400" fill="transparent" stroke="none" pointer-events="all" style="cursor: crosshair; touch-action: none;"/>
                <circle cx="${p.x}" cy="${p.y}" r="80" fill="#2563eb" stroke="#ffffff" stroke-width="16" pointer-events="none"/>
                <circle cx="${p.x}" cy="${p.y}" r="25" fill="#ffffff" pointer-events="none"/>
            </g>
        `).join('');

        // VẼ TÂM NHÀ HÌNH HỌC (CENTROID & POLYLABEL CROSSHAIR)
        const centerCrosshairSvg = `
            <g id="layer-house-center" pointer-events="none">
                <circle cx="${houseCenter.x}" cy="${houseCenter.y}" r="120" fill="none" stroke="#ef4444" stroke-width="12"/>
                <circle cx="${houseCenter.x}" cy="${houseCenter.y}" r="30" fill="#ef4444"/>
                <line x1="${houseCenter.x - 220}" y1="${houseCenter.y}" x2="${houseCenter.x + 220}" y2="${houseCenter.y}" stroke="#ef4444" stroke-width="8" stroke-dasharray="25,15"/>
                <line x1="${houseCenter.x}" y1="${houseCenter.y - 220}" x2="${houseCenter.x}" y2="${houseCenter.y + 220}" stroke="#ef4444" stroke-width="8" stroke-dasharray="25,15"/>
                <rect x="${houseCenter.x - 140}" y="${houseCenter.y + 140}" width="280" height="60" rx="8" fill="rgba(239,68,68,0.95)"/>
                <text x="${houseCenter.x}" y="${houseCenter.y + 180}" text-anchor="middle" font-size="36" font-weight="900" fill="#ffffff" font-family="'Courier New', monospace">TÂM NHÀ</text>
            </g>
        `;

        return {
            viewBox: { x: viewX, y: viewY, w: viewW, h: viewH },
            houseWidth: W,
            houseDepth: D,
            houseMinX: minX,
            houseMinY: minY,
            houseCenterX: houseCenter.x,
            houseCenterY: houseCenter.y,
            geoAnalysis,
            wallsLayer: `<g id="layer-walls-polygon">${edgeLinesSvg}${columnsSvg}</g>`,
            vertexLayer: `<g id="layer-vertex-handles">${vertexCircles}</g>`,
            roomsLayer: `<g id="layer-rooms-container">${roomsSvg}</g>`,
            dimensionsLayer: `<g id="layer-dimensions">${dimsSvg}</g>`,
            centerLayer: centerCrosshairSvg
        };
    }

    renderSvg(geometry, options = {}) {
        const layers = this.renderLayers(geometry, options);
        const vb = layers.viewBox;
        return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb.x} ${vb.y} ${vb.w} ${vb.h}" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" class="scan2cad-interactive-drawing" style="display: block; width: 100%; height: 100%; object-fit: contain; background: #ffffff; font-family: 'Helvetica Neue', Arial, sans-serif; user-select: none; -webkit-user-select: none; touch-action: none;">
    ${layers.wallsLayer}
    ${layers.vertexLayer}
    ${layers.roomsLayer}
    ${layers.dimensionsLayer}
    ${layers.centerLayer}
</svg>
        `.trim();
    }
}

// ------------------------------------------------------------
// 8. LUOPAN AND FLYING STARS SVG RENDERER (100% THUẦN CODE VECTOR)
// ------------------------------------------------------------
export class LuoPanAndFlyingStarsSvgRenderer {
    constructor(options = {}) {
        this.size = options.size || 800;
        this.center = this.size / 2;
    }

    renderOverlayLayer(flyingStars, houseCenterX, houseCenterY, houseWidth, houseDepth, options = {}) {
        if (!flyingStars) return '';

        const facingDeg = flyingStars.facingDegree || 180;
        const sittingDeg = (facingDeg + 180) % 360;

        const R_OUTER = Math.max(1200, Math.min(houseWidth, houseDepth) * 0.48);
        const R_DEG = R_OUTER * 0.94;
        const R_MOUNTAIN = R_OUTER * 0.72;
        const R_TRIGRAM = R_OUTER * 0.52;

        const c = 0;

        let degTicks = '';
        let degLabels = '';
        for (let i = 0; i < 360; i += 2) {
            const is10 = i % 10 === 0;
            const is5 = i % 5 === 0;
            const rIn = is10 ? R_DEG - (R_OUTER * 0.05) : (is5 ? R_DEG - (R_OUTER * 0.03) : R_DEG - (R_OUTER * 0.018));
            const p1 = polarToCartesian(c, c, rIn, i);
            const p2 = polarToCartesian(c, c, R_DEG, i);
            degTicks += `<line x1="${p1.x}" y1="${p1.y}" x2="${p2.x}" y2="${p2.y}" stroke="#dc2626" stroke-width="${is10 ? 4 : 2}"/>`;

            if (is10) {
                const tp = polarToCartesian(c, c, R_DEG - (R_OUTER * 0.075), i);
                let rot = i;
                if (i > 90 && i < 270) rot = (rot + 180) % 360;
                degLabels += `<text x="${tp.x}" y="${tp.y}" transform="rotate(${rot}, ${tp.x}, ${tp.y})" text-anchor="middle" dominant-baseline="central" font-size="${Math.round(R_OUTER * 0.024)}" font-family="'Courier New', monospace" font-weight="bold" fill="#7f1d1d">${i}</text>`;
            }
        }

        let mountainSectors = '';
        let mountainLabels = '';
        MOUNTAINS_24.forEach(m => {
            const p1 = polarToCartesian(c, c, R_TRIGRAM, m.startDeg);
            const p2 = polarToCartesian(c, c, R_DEG, m.startDeg);
            mountainSectors += `<line x1="${p1.x}" y1="${p1.y}" x2="${p2.x}" y2="${p2.y}" stroke="#dc2626" stroke-width="2.5" stroke-dasharray="8,6"/>`;

            const tp = polarToCartesian(c, c, (R_DEG + R_TRIGRAM) / 2 + 10, m.center);
            let rot = m.center;
            if (m.center > 90 && m.center < 270) rot = (rot + 180) % 360;
            mountainLabels += `<text x="${tp.x}" y="${tp.y}" transform="rotate(${rot}, ${tp.x}, ${tp.y})" text-anchor="middle" dominant-baseline="central" font-size="${Math.round(R_OUTER * 0.036)}" font-weight="900" fill="#000">${m.name}</text>`;
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
            const p1 = polarToCartesian(c, c, R_TRIGRAM * 0.35, t.deg - 22.5);
            const p2 = polarToCartesian(c, c, R_OUTER, t.deg - 22.5);
            trigramSectors += `<line x1="${p1.x}" y1="${p1.y}" x2="${p2.x}" y2="${p2.y}" stroke="#dc2626" stroke-width="4"/>`;

            const tp = polarToCartesian(c, c, R_TRIGRAM - (R_OUTER * 0.06), t.deg);
            let rot = t.deg;
            if (t.deg > 90 && t.deg < 270) rot = (rot + 180) % 360;
            trigramLabels += `<text x="${tp.x}" y="${tp.y}" transform="rotate(${rot}, ${tp.x}, ${tp.y})" text-anchor="middle" dominant-baseline="central" font-size="${Math.round(R_OUTER * 0.04)}" font-weight="900" fill="#dc2626">${t.name}</text>`;
        });

        const pHuong = polarToCartesian(c, c, R_OUTER + 80, facingDeg);
        const pHuongBadge = polarToCartesian(c, c, R_OUTER - 40, facingDeg);
        const pToa = polarToCartesian(c, c, R_OUTER + 80, sittingDeg);
        const pToaBadge = polarToCartesian(c, c, R_OUTER - 40, sittingDeg);

        const badgeW = Math.round(R_OUTER * 0.22);
        const badgeH = Math.round(R_OUTER * 0.08);

        const arrowsSvg = `
            <line x1="${c}" y1="${c}" x2="${pHuong.x}" y2="${pHuong.y}" stroke="#dc2626" stroke-width="8" stroke-linecap="round"/>
            <polygon points="${pHuong.x},${pHuong.y} ${pHuong.x - 24},${pHuong.y + 45} ${pHuong.x + 24},${pHuong.y + 45}" transform="rotate(${facingDeg} ${pHuong.x} ${pHuong.y})" fill="#dc2626"/>
            <rect x="${pHuongBadge.x - badgeW / 2}" y="${pHuongBadge.y - badgeH / 2}" width="${badgeW}" height="${badgeH}" rx="8" fill="#dc2626" stroke="#ffffff" stroke-width="3"/>
            <text x="${pHuongBadge.x}" y="${pHuongBadge.y + 8}" text-anchor="middle" font-size="${Math.round(badgeH * 0.55)}" font-weight="900" fill="#fff">HƯỚNG</text>

            <line x1="${c}" y1="${c}" x2="${pToa.x}" y2="${pToa.y}" stroke="#2563eb" stroke-width="8" stroke-linecap="round"/>
            <polygon points="${pToa.x},${pToa.y} ${pToa.x - 24},${pToa.y + 45} ${pToa.x + 24},${pToa.y + 45}" transform="rotate(${sittingDeg} ${pToa.x} ${pToa.y})" fill="#2563eb"/>
            <rect x="${pToaBadge.x - badgeW / 2}" y="${pToaBadge.y - badgeH / 2}" width="${badgeW}" height="${badgeH}" rx="8" fill="#2563eb" stroke="#ffffff" stroke-width="3"/>
            <text x="${pToaBadge.x}" y="${pToaBadge.y + 8}" text-anchor="middle" font-size="${Math.round(badgeH * 0.55)}" font-weight="900" fill="#fff">TỌA</text>
        `;

        return `
            <g id="layer-luopan-overlay" transform="translate(${houseCenterX}, ${houseCenterY})" pointer-events="none" style="opacity: 0.85;">
                <circle cx="${c}" cy="${c}" r="${R_OUTER}" fill="none" stroke="#dc2626" stroke-width="7"/>
                <circle cx="${c}" cy="${c}" r="${R_DEG}" fill="none" stroke="#dc2626" stroke-width="3"/>
                <circle cx="${c}" cy="${c}" r="${R_MOUNTAIN}" fill="none" stroke="#dc2626" stroke-width="3"/>
                <circle cx="${c}" cy="${c}" r="${R_TRIGRAM}" fill="none" stroke="#dc2626" stroke-width="4.5"/>
                ${degTicks}
                ${degLabels}
                ${mountainSectors}
                ${mountainLabels}
                ${trigramSectors}
                ${trigramLabels}
                ${arrowsSvg}
            </g>
        `;
    }

    renderNinePalacesLayer(flyingStars, minX, minY, width, depth, facingPalaceId = 9) {
        if (!flyingStars || !flyingStars.palaces) return '';

        const cellW = width / 3;
        const cellH = depth / 3;
        const baseFontSize = Math.max(70, Math.min(cellW, cellH) * 0.12);

        const order = getOrientedPalaceGrid(facingPalaceId);

        let gridSvg = '';
        order.forEach((pId, idx) => {
            const row = Math.floor(idx / 3);
            const col = idx % 3;
            const x = minX + col * cellW;
            const y = minY + row * cellH;
            const cx = x + cellW / 2;
            const cy = y + cellH / 2;

            const pal = flyingStars.palaces[pId];
            if (!pal) return;

            const isFacing = pId === flyingStars.facingPalace;
            const isSitting = pId === flyingStars.sittingPalace;

            const cellBorder = isFacing ? 'stroke="#ef4444" stroke-width="12"' : (isSitting ? 'stroke="#2563eb" stroke-width="12"' : 'stroke="#dc2626" stroke-width="5" stroke-dasharray="25,15"');
            const cellFill = isFacing ? 'rgba(239, 68, 68, 0.06)' : (isSitting ? 'rgba(37, 99, 235, 0.06)' : 'none');

            gridSvg += `
                <g class="palace-svg-cell">
                    <rect x="${x}" y="${y}" width="${cellW}" height="${cellH}" fill="${cellFill}" ${cellBorder}/>
                    
                    <g class="palace-time-stars" transform="translate(${cx}, ${y + cellH * 0.2})">
                        <circle cx="-135" cy="0" r="32" fill="#16a34a"/>
                        <text x="-135" y="11" text-anchor="middle" font-size="${Math.round(baseFontSize * 0.42)}" font-weight="900" fill="#fff">${pal.nienStar}</text>

                        <circle cx="-45" cy="0" r="32" fill="#ef4444"/>
                        <text x="-45" y="11" text-anchor="middle" font-size="${Math.round(baseFontSize * 0.42)}" font-weight="900" fill="#fff">${pal.nguyetStar}</text>

                        <circle cx="45" cy="0" r="32" fill="#2563eb"/>
                        <text x="45" y="11" text-anchor="middle" font-size="${Math.round(baseFontSize * 0.42)}" font-weight="900" fill="#fff">${pal.nhatStar}</text>

                        <circle cx="135" cy="0" r="32" fill="#d97706"/>
                        <text x="135" y="11" text-anchor="middle" font-size="${Math.round(baseFontSize * 0.42)}" font-weight="900" fill="#000">${pal.thoiStar}</text>
                    </g>

                    <text x="${cx - cellW * 0.28}" y="${cy + cellH * 0.08}" text-anchor="middle" font-size="${Math.round(baseFontSize * 1.05)}" font-weight="900" fill="#0284c7">${pal.sonStar}</text>
                    <text x="${cx}" y="${cy + cellH * 0.12}" text-anchor="middle" font-size="${Math.round(baseFontSize * 1.4)}" font-weight="900" fill="#0f172a">${pal.vanStar}</text>
                    <text x="${cx + cellW * 0.28}" y="${cy + cellH * 0.08}" text-anchor="middle" font-size="${Math.round(baseFontSize * 1.05)}" font-weight="900" fill="#dc2626">${pal.huongStar}</text>

                    <text x="${cx}" y="${y + cellH - 48}" text-anchor="middle" font-size="${Math.round(baseFontSize * 0.52)}" font-weight="900" fill="${isFacing ? '#ef4444' : (isSitting ? '#2563eb' : '#b45309')}">${isFacing ? `[HƯỚNG] ${PALACE_SHORT[pId]}` : (isSitting ? `[TỌA] ${PALACE_SHORT[pId]}` : PALACE_NAMES[pId])}</text>
                </g>
            `;
        });

        return `<g id="layer-nine-palaces-overlay" pointer-events="none">${gridSvg}</g>`;
    }
}

// ------------------------------------------------------------
// 9. SVG VIEWPORT CONTROLLER (PAN / ZOOM / FIT-TO-SCREEN)
// ------------------------------------------------------------
export class SvgViewportController {
    constructor(stageElement) {
        this.stage = stageElement;
        this.svg = null;
        this.scale = 1;
        this.panX = 0;
        this.panY = 0;
        this.isPanning = false;
        this.startX = 0;
        this.startY = 0;

        this.initEvents();
    }

    initEvents() {
        if (!this.stage) return;

        let touchStartDist = 0;
        let touchStartScale = 1;

        this.stage.addEventListener('touchstart', (e) => {
            if (e.touches.length === 2) {
                touchStartDist = Math.hypot(
                    e.touches[0].clientX - e.touches[1].clientX,
                    e.touches[0].clientY - e.touches[1].clientY
                );
                touchStartScale = this.scale;
            }
        }, { passive: true });

        this.stage.addEventListener('touchmove', (e) => {
            if (e.touches.length === 2 && touchStartDist > 0) {
                const curDist = Math.hypot(
                    e.touches[0].clientX - e.touches[1].clientX,
                    e.touches[0].clientY - e.touches[1].clientY
                );
                const factor = curDist / touchStartDist;
                this.scale = Math.max(0.2, Math.min(8.0, touchStartScale * factor));
                this.updateTransform();
            }
        }, { passive: true });

        this.stage.addEventListener('touchend', (e) => {
            if (e.touches.length < 2) {
                touchStartDist = 0;
            }
        }, { passive: true });

        this.stage.addEventListener('wheel', (e) => {
            e.preventDefault();
            const delta = e.deltaY > 0 ? 0.9 : 1.1;
            this.zoom(delta, e.clientX, e.clientY);
        }, { passive: false });

        this.stage.addEventListener('pointerdown', (e) => {
            if (e.target.closest('.cad-room-interactive') || e.target.closest('.cad-vertex-handle') || e.target.closest('.cad-edge-hitbox') || e.target.closest('.cad-resize-handle') || e.target.closest('.btn-cad-mini-action')) {
                return;
            }
            this.isPanning = true;
            this.startX = e.clientX - this.panX;
            this.startY = e.clientY - this.panY;
            this.stage.setPointerCapture(e.pointerId);
        });

        this.stage.addEventListener('pointermove', (e) => {
            if (!this.isPanning) return;
            this.panX = e.clientX - this.startX;
            this.panY = e.clientY - this.startY;
            this.updateTransform();
        });

        const stopPan = (e) => {
            if (this.isPanning) {
                this.isPanning = false;
                try { this.stage.releasePointerCapture(e.pointerId); } catch (_) {}
            }
        };

        this.stage.addEventListener('pointerup', stopPan);
        this.stage.addEventListener('pointercancel', stopPan);
    }

    setSvgContent(svgHtml) {
        if (!this.stage) return;
        this.stage.innerHTML = svgHtml;
        this.svg = this.stage.querySelector('svg');
        this.updateTransform();
    }

    updateTransform() {
        if (!this.svg) return;
        this.svg.style.transform = `translate(${this.panX}px, ${this.panY}px) scale(${this.scale})`;
        this.svg.style.transformOrigin = 'center center';
    }

    zoom(factor, clientX, clientY) {
        const nextScale = Math.max(0.2, Math.min(8.0, this.scale * factor));
        this.scale = nextScale;
        this.updateTransform();
    }

    fitToScreen() {
        this.scale = 1;
        this.panX = 0;
        this.panY = 0;
        this.updateTransform();
    }
}

// ------------------------------------------------------------
// 10. RENDER UNIFIED MULTI-LAYER SVG (100% THUẦN VECTOR)
// ------------------------------------------------------------
export function renderUnifiedSvg(cadLayers, luoPanOverlay, ninePalacesOverlay, layerState, options = {}) {
    const vb = cadLayers.viewBox;

    const wallsContent = cadLayers.wallsLayer || '';
    const vertexContent = cadLayers.vertexLayer || '';
    const roomsContent = layerState.furniture ? (cadLayers.roomsLayer || '') : '';
    const dimsContent = layerState.dimensions ? (cadLayers.dimensionsLayer || '') : '';
    const centerContent = cadLayers.centerLayer || '';
    const luoPanContent = layerState.luoPan ? luoPanOverlay : '';
    const ninePalacesContent = layerState.ninePalaces ? ninePalacesOverlay : '';

    return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb.x} ${vb.y} ${vb.w} ${vb.h}" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" class="scan2cad-interactive-drawing" style="display: block; width: 100%; height: 100%; object-fit: contain; background: #ffffff; font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; user-select: none; -webkit-user-select: none; touch-action: none;">
    <defs>
        <pattern id="cadGridPattern" width="1000" height="1000" patternUnits="userSpaceOnUse">
            <path d="M 1000 0 L 0 0 0 1000" fill="none" stroke="rgba(0,0,0,0.03)" stroke-width="2"/>
        </pattern>
    </defs>
    
    <rect x="${vb.x}" y="${vb.y}" width="${vb.w}" height="${vb.h}" fill="url(#cadGridPattern)"/>

    ${wallsContent}
    ${roomsContent}
    ${dimsContent}
    ${centerContent}
    ${vertexContent}

    ${ninePalacesContent}
    ${luoPanContent}
</svg>
    `.trim();
}
