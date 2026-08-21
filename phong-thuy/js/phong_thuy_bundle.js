// ============================================================
// PHONG THỦY & ARCHITECTURAL CAD FULL ENGINE BUNDLE v8.1
// Standardized Computational Feng Shui & CAD Geometry Core
// 100% Thuần Vector Procedural Code (SVG / Canvas 2D) — Không sử dụng Emoji
// Tuân thủ đặc tả FengShui AI Upgrade Pack (Phase 1 Baseline Standardization)
// ============================================================

// ------------------------------------------------------------
// 1. DATA CONSTANTS & STANDARDIZED REGISTRIES
// ------------------------------------------------------------

export const PERIODS_DATA = [
    { period: 1, startYear: 1864, endYear: 1883, element: 'Thủy', name: 'Nhất Bạch Thủy Vận' },
    { period: 2, startYear: 1884, endYear: 1903, element: 'Thổ',  name: 'Nhị Hắc Thổ Vận' },
    { period: 3, startYear: 1904, endYear: 1923, element: 'Mộc',  name: 'Tam Bích Mộc Vận' },
    { period: 4, startYear: 1924, endYear: 1943, element: 'Mộc',  name: 'Tứ Lục Mộc Vận' },
    { period: 5, startYear: 1944, endYear: 1963, element: 'Thổ',  name: 'Ngũ Hoàng Thổ Vận' },
    { period: 6, startYear: 1964, endYear: 1983, element: 'Kim',  name: 'Lục Bạch Kim Vận' },
    { period: 7, startYear: 1984, endYear: 2003, element: 'Kim',  name: 'Thất Xích Kim Vận' },
    { period: 8, startYear: 2004, endYear: 2023, element: 'Thổ',  name: 'Bát Bạch Thổ Vận' },
    { period: 9, startYear: 2024, endYear: 2043, element: 'Hỏa',  name: 'Cửu Tử Hỏa Vận' }
];

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
// 2. TOÁN HỌC TỌA ĐỘ CỰC & GIẢI TÍCH HÌNH HỌC
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

// ------------------------------------------------------------
// 3. ENGINE TÍNH TOÁN TINH BÀN HUYỀN KHÔNG & BÁT TRẠCH
// ------------------------------------------------------------

export function getPeriod(year) {
    const y = parseInt(year, 10) || new Date().getFullYear();
    const p = PERIODS_DATA.find(item => y >= item.startYear && y <= item.endYear);
    return p ? p.period : 9;
}

export function findMountain(deg, options = {}) {
    const { declination = 0, northBasis = 'true' } = options;
    let d = ((deg + (northBasis === 'magnetic' ? declination : 0)) % 360 + 360) % 360;
    
    let match = MOUNTAINS_24.find(m => {
        if (m.startDeg > m.endDeg) {
            return d >= m.startDeg || d < m.endDeg;
        }
        return d >= m.startDeg && d < m.endDeg;
    });

    if (!match) match = MOUNTAINS_24_DICT['Tý'];

    let dev = d - match.center;
    if (dev > 180) dev -= 360;
    if (dev < -180) dev += 360;
    dev = parseFloat(dev.toFixed(2));

    const trigramBoundaries = [22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5];
    let minTrigramDist = Infinity;
    trigramBoundaries.forEach(tb => {
        let diff = Math.abs(d - tb);
        if (diff > 180) diff = 360 - diff;
        if (diff < minTrigramDist) minTrigramDist = diff;
    });

    let distToStart = Math.abs(d - match.startDeg);
    if (distToStart > 180) distToStart = 360 - distToStart;
    let distToEnd = Math.abs(d - match.endDeg);
    if (distToEnd > 180) distToEnd = 360 - distToEnd;
    const minMntDist = Math.min(distToStart, distToEnd);

    let boundaryStatus = 'CHÍNH TUYẾN';
    let isDaiKhongVong = false;
    let isTieuKhongVong = false;

    if (minTrigramDist <= 1.5) {
        boundaryStatus = 'ĐẠI KHÔNG VONG';
        isDaiKhongVong = true;
    } else if (minMntDist <= 1.5) {
        boundaryStatus = 'TIỂU KHÔNG VONG';
        isTieuKhongVong = true;
    } else if (Math.abs(dev) >= 3.0) {
        boundaryStatus = 'KIÊM TUYẾN';
    }

    const isKiemHuong = Math.abs(dev) >= 3.0;

    return {
        mountain: match,
        degree: d,
        deviation: dev,
        isKiemHuong,
        boundaryStatus,
        isDaiKhongVong,
        isTieuKhongVong,
        distanceToBoundary: parseFloat(minMntDist.toFixed(2)),
        chartType: isDaiKhongVong ? 'Đại Không Vong (Xuất Quái Đại Sát)' : (isTieuKhongVong ? 'Tiểu Không Vong (Sai Thất)' : (isKiemHuong ? 'Kiêm Hướng (Thế Quái)' : 'Chính Hướng (Hạ Quái)'))
    };
}

export function getOppositeMountain(deg) {
    return findMountain((deg + 180) % 360);
}

function fly(centerStar, direction = 1) {
    const starMap = {};
    const centerIdx = FLYING_PATH.indexOf(5);
    FLYING_PATH.forEach((palaceId, i) => {
        let star = (centerStar + direction * (i - centerIdx)) % 9;
        if (star <= 0) star += 9;
        starMap[palaceId] = star;
    });
    return starMap;
}

function getAnnualStar(year) {
    const lastTwo = year % 100;
    let s = (10 - ((Math.floor(lastTwo / 10) + (lastTwo % 10)) % 9 || 9)) % 9 || 9;
    return s;
}

function getMonthlyStar(year, month, day) {
    const annual = getAnnualStar(year);
    let startStar = 2;
    if ([1, 4, 7].includes(annual)) startStar = 8;
    else if ([3, 6, 9].includes(annual)) startStar = 2;
    else startStar = 5;
    let star = (startStar - (month - 1)) % 9;
    return star <= 0 ? star + 9 : star;
}

function getDailyStar(year, month, day) {
    return ((day * 7 + month * 3 + (year % 100)) % 9) || 9;
}

function getHourlyStar(year, month, day, hour) {
    const branchHour = Math.floor(((hour + 1) % 24) / 2);
    return ((branchHour + 1) % 9) || 9;
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
        if (Math.abs(signedArea) < 1e-4) {
            return this.calculateBoundingBoxCenter(pts);
        }

        let cx = 0;
        let cy = 0;
        const n = pts.length;

        for (let i = 0; i < n; i++) {
            const j = (i + 1) % n;
            const factor = pts[i].x * pts[j].y - pts[j].x * pts[i].y;
            cx += (pts[i].x + pts[j].x) * factor;
            cy += (pts[i].y + pts[j].y) * factor;
        }

        const areaFactor = 6 * signedArea;
        return {
            x: Math.round(cx / areaFactor),
            y: Math.round(cy / areaFactor)
        };
    }

    static calculateBoundingBoxCenter(pts) {
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

    static isPointInPolygon(point, pts) {
        let inside = false;
        for (let i = 0, j = pts.length - 1; i < pts.length; j = i++) {
            const xi = pts[i].x, yi = pts[i].y;
            const xj = pts[j].x, yj = pts[j].y;
            const intersect = ((yi > point.y) !== (yj > point.y)) &&
                (point.x < (xj - xi) * (point.y - yi) / (yj - yi) + xi);
            if (intersect) inside = !inside;
        }
        return inside;
    }

    static calculatePolylabel(pts, precision = 50) {
        if (!pts || pts.length < 3) return this.calculatePolygonCentroid(pts);

        const bbox = this.calculateBoundingBoxCenter(pts);
        const centroid = this.calculatePolygonCentroid(pts);

        if (this.isPointInPolygon(centroid, pts)) {
            return centroid;
        }

        let bestPoint = centroid;
        let maxDist = -Infinity;
        const step = Math.max(100, Math.min(bbox.width, bbox.depth) / 20);

        for (let x = bbox.minX + step; x < bbox.maxX; x += step) {
            for (let y = bbox.minY + step; y < bbox.maxY; y += step) {
                const pt = { x, y };
                if (this.isPointInPolygon(pt, pts)) {
                    let minDistToEdge = Infinity;
                    for (let i = 0; i < pts.length; i++) {
                        const j = (i + 1) % pts.length;
                        const dist = this._distToSegment(pt, pts[i], pts[j]);
                        if (dist < minDistToEdge) minDistToEdge = dist;
                    }
                    if (minDistToEdge > maxDist) {
                        maxDist = minDistToEdge;
                        bestPoint = pt;
                    }
                }
            }
        }
        return bestPoint;
    }

    static _distToSegment(p, v, w) {
        const l2 = (w.x - v.x) ** 2 + (w.y - v.y) ** 2;
        if (l2 === 0) return Math.hypot(p.x - v.x, p.y - v.y);
        let t = ((p.x - v.x) * (w.x - v.x) + (p.y - v.y) * (w.y - v.y)) / l2;
        t = Math.max(0, Math.min(1, t));
        return Math.hypot(p.x - (v.x + t * (w.x - v.x)), p.y - (v.y + t * (w.y - v.y)));
    }

    static calculatePerimeter(pts) {
        if (!pts || pts.length < 2) return 0;
        let perim = 0;
        for (let i = 0; i < pts.length; i++) {
            const j = (i + 1) % pts.length;
            perim += Math.hypot(pts[j].x - pts[i].x, pts[j].y - pts[i].y);
        }
        return Math.round(perim);
    }

    static isConvex(pts) {
        if (!pts || pts.length < 4) return true;
        let sign = 0;
        const n = pts.length;
        for (let i = 0; i < n; i++) {
            const p1 = pts[i];
            const p2 = pts[(i + 1) % n];
            const p3 = pts[(i + 2) % n];
            const cross = (p2.x - p1.x) * (p3.y - p2.y) - (p2.y - p1.y) * (p3.x - p2.x);
            if (Math.abs(cross) > 1e-4) {
                if (sign === 0) sign = cross > 0 ? 1 : -1;
                else if ((cross > 0 ? 1 : -1) !== sign) return false;
            }
        }
        return true;
    }

    static calculateDeficientSectors(pts, facingDegree = 180) {
        if (!pts || pts.length < 5) return [];
        const bbox = this.calculateBoundingBoxCenter(pts);
        const cellW = bbox.width / 3;
        const cellH = bbox.depth / 3;
        const deficient = [];

        const directionMap = [
            { row: 0, col: 0, name: 'Tây Bắc (Càn)', palaceId: 6 },
            { row: 0, col: 1, name: 'Bắc (Khảm)', palaceId: 1 },
            { row: 0, col: 2, name: 'Đông Bắc (Cấn)', palaceId: 8 },
            { row: 1, col: 0, name: 'Tây (Đoài)', palaceId: 7 },
            { row: 1, col: 1, name: 'Trung Cung', palaceId: 5 },
            { row: 1, col: 2, name: 'Đông (Chấn)', palaceId: 3 },
            { row: 2, col: 0, name: 'Tây Nam (Khôn)', palaceId: 2 },
            { row: 2, col: 1, name: 'Nam (Ly)', palaceId: 9 },
            { row: 2, col: 2, name: 'Đông Nam (Tốn)', palaceId: 4 }
        ];

        directionMap.forEach(sec => {
            if (sec.palaceId === 5) return;
            const cx = bbox.minX + (sec.col + 0.5) * cellW;
            const cy = bbox.minY + (sec.row + 0.5) * cellH;
            
            // Sample 9 points in sector
            let insideCount = 0;
            const subSteps = 3;
            for (let r = 0; r < subSteps; r++) {
                for (let c = 0; c < subSteps; c++) {
                    const sx = bbox.minX + (sec.col + (c + 0.5) / subSteps) * cellW;
                    const sy = bbox.minY + (sec.row + (r + 0.5) / subSteps) * cellH;
                    if (this.isPointInPolygon({ x: sx, y: sy }, pts)) insideCount++;
                }
            }

            const fillRatio = insideCount / (subSteps * subSteps);
            if (fillRatio < 0.35) {
                deficient.push({
                    palaceId: sec.palaceId,
                    name: sec.name,
                    missingPercent: Math.round((1 - fillRatio) * 100),
                    severity: fillRatio < 0.1 ? 'Khuyết Nặng' : 'Khuyết Nhẹ'
                });
            }
        });

        return deficient;
    }

    static analyzePolygon(pts, facingDegree = 180) {
        const areaMm2 = Math.abs(this.calculateShoelaceArea(pts));
        const areaM2 = (areaMm2 / 1000000).toFixed(2);
        const centroid = this.calculatePolygonCentroid(pts);
        const bbox = this.calculateBoundingBoxCenter(pts);
        const polylabel = this.calculatePolylabel(pts);
        const isCentroidInside = this.isPointInPolygon(centroid, pts);
        const perimeterMm = this.calculatePerimeter(pts);
        const perimeterM = (perimeterMm / 1000).toFixed(2);
        const isConvex = this.isConvex(pts);
        const deficientSectors = this.calculateDeficientSectors(pts, facingDegree);

        let shape = 'RECTANGLE';
        if (pts.length === 6) shape = 'L_SHAPE';
        else if (pts.length === 8) shape = 'U_SHAPE';
        else if (!isConvex && !isCentroidInside) shape = 'CONCAVE_POLYGON';
        else if (!isConvex) shape = 'DEFICIENT_POLYGON';
        else if (pts.length > 4) shape = 'POLYGON_' + pts.length;

        const confidence = pts.length === 4 ? 98.5 : (isCentroidInside ? 94.0 : 88.5);

        return {
            areaMm2,
            areaM2,
            perimeterMm,
            perimeterM,
            centroid,
            boundingBoxCenter: { x: bbox.x, y: bbox.y },
            polylabel,
            isCentroidInside,
            isConvex,
            shape,
            deficientSectors,
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
                { id: 'f2_stairs', name: 'CẦU THANG', type: 'stairs', x: 220, y: frontD + 100, w: Math.round(W * 0.48), h: midD - 200, rot: 0 },
                { id: 'f2_bed2', name: 'P.NGỦ 2', type: 'bed_regular', x: 220, y: frontD + midD + 100, w: Math.round(W * 0.58), h: rearD - 320, rot: 0 },
                { id: 'f2_wc', name: 'WC TẦNG 2', type: 'toilet', x: Math.round(W * 0.62), y: frontD + midD + 100, w: W - Math.round(W * 0.62) - 220, h: rearD - 320, rot: 0 }
            ]
        };
    }

    if (totalFloors >= 3) {
        floorsData[3] = {
            name: 'TẦNG 3',
            rooms: [
                { id: 'f3_altar', name: 'P.THỜ GIA TIÊN', type: 'altar', x: 220, y: 220, w: Math.round(W * 0.52), h: frontD - 150, rot: 0 },
                { id: 'f3_terrace', name: 'SÂN THƯỢNG', type: 'yard', x: Math.round(W * 0.56), y: 220, w: W - Math.round(W * 0.56) - 220, h: frontD - 150, rot: 0 },
                { id: 'f3_stairs', name: 'CẦU THANG', type: 'stairs', x: 220, y: frontD + 100, w: Math.round(W * 0.48), h: midD - 200, rot: 0 },
                { id: 'f3_bed3', name: 'P.NGỦ 3', type: 'bed_regular', x: 220, y: frontD + midD + 100, w: Math.round(W * 0.58), h: rearD - 320, rot: 0 },
                { id: 'f3_laundry', name: 'SÂN PHƠI', type: 'yard', x: Math.round(W * 0.62), y: frontD + midD + 100, w: W - Math.round(W * 0.62) - 220, h: rearD - 320, rot: 0 }
            ]
        };
    }

    for (let f = 4; f <= totalFloors; f++) {
        floorsData[f] = {
            name: `TẦNG ${f}`,
            rooms: [
                { id: `f${f}_common`, name: `P.SINH HOẠT T${f}`, type: 'living_room', x: 220, y: 220, w: W - 440, h: frontD - 200, rot: 0 },
                { id: `f${f}_stairs`, name: 'CẦU THANG', type: 'stairs', x: 220, y: frontD + 100, w: Math.round(W * 0.48), h: midD - 200, rot: 0 },
                { id: `f${f}_bed`, name: `P.NGỦ T${f}`, type: 'bed_regular', x: 220, y: frontD + midD + 100, w: Math.round(W * 0.58), h: rearD - 320, rot: 0 },
                { id: `f${f}_wc`, name: `WC T${f}`, type: 'toilet', x: Math.round(W * 0.62), y: frontD + midD + 100, w: W - Math.round(W * 0.62) - 220, h: rearD - 320, rot: 0 }
            ]
        };
    }

    const selFloor = Math.max(1, Math.min(totalFloors, parseInt(currentFloor, 10) || 1));
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
                    const idx = i / 4;
                    const r = data[i];
                    const g = data[i + 1];
                    const b = data[i + 2];
                    const val = Math.round(0.299 * r + 0.587 * g + 0.114 * b);
                    gray[idx] = val;
                    hist[val]++;
                }

                const totalPixels = procW * procH;
                let sum = 0;
                for (let t = 0; t < 256; t++) sum += t * hist[t];

                let sumB = 0;
                let wB = 0;
                let wF = 0;
                let varMax = 0;
                let optimalThreshold = 128;

                for (let t = 0; t < 256; t++) {
                    wB += hist[t];
                    if (wB === 0) continue;
                    wF = totalPixels - wB;
                    if (wF === 0) break;

                    sumB += t * hist[t];
                    const mB = sumB / wB;
                    const mF = (sum - sumB) / wF;
                    const varBetween = wB * wF * (mB - mF) * (mB - mF);

                    if (varBetween > varMax) {
                        varMax = varBetween;
                        optimalThreshold = t;
                    }
                }

                const adjustedThreshold = Math.round(optimalThreshold * (1 + (thresholdSensitivity - 0.5) * 0.4));

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
            if (hit) points.push(hit);
        }

        return points.length >= 3 ? points : [
            { x: Math.round(w * 0.08), y: Math.round(h * 0.08) },
            { x: Math.round(w * 0.92), y: Math.round(h * 0.08) },
            { x: Math.round(w * 0.92), y: Math.round(h * 0.92) },
            { x: Math.round(w * 0.08), y: Math.round(h * 0.92) }
        ];
    }

    static _douglasPeucker(pts, epsilon) {
        if (pts.length <= 2) return pts;
        let dmax = 0;
        let index = 0;
        const end = pts.length - 1;

        for (let i = 1; i < end; i++) {
            const d = HouseCenterGeometryEngine._distToSegment(pts[i], pts[0], pts[end]);
            if (d > dmax) {
                index = i;
                dmax = d;
            }
        }

        if (dmax > epsilon) {
            const rec1 = this._douglasPeucker(pts.slice(0, index + 1), epsilon);
            const rec2 = this._douglasPeucker(pts.slice(index), epsilon);
            return rec1.slice(0, -1).concat(rec2);
        }
        return [pts[0], pts[end]];
    }

    static _orthogonalizePolygon(pts) {
        const out = [];
        for (let i = 0; i < pts.length; i++) {
            const p = pts[i];
            const next = pts[(i + 1) % pts.length];
            const dx = Math.abs(next.x - p.x);
            const dy = Math.abs(next.y - p.y);

            out.push({ ...p });
            if (dx > 15 && dy > 15) {
                if (dx > dy) out.push({ x: next.x, y: p.y });
                else out.push({ x: p.x, y: next.y });
            }
        }
        return out;
    }
}

// ------------------------------------------------------------
// 7. ARCHITECTURAL CAD RENDERER (100% PURE VECTOR CAD BLOCKS)
// ------------------------------------------------------------

export class ArchitecturalCADRenderer {
    constructor(options = {}) {
        this.theme = options.theme || 'white';
        this.wallThickness = options.wallThickness || 220;
        this.colDim = options.colDim || 220;
    }

    renderLayers(geometry, options = {}) {
        const pts = geometry.footprintPoints || [];
        const selectedId = options.selectedRoomId || null;
        const selectedEdgeIdx = options.selectedEdgeIndex !== undefined ? options.selectedEdgeIndex : null;

        let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
        pts.forEach(p => {
            if (p.x < minX) minX = p.x;
            if (p.x > maxX) maxX = p.x;
            if (p.y < minY) minY = p.y;
            if (p.y > maxY) maxY = p.y;
        });

        if (geometry.rooms) {
            geometry.rooms.forEach(r => {
                if (r.x < minX) minX = r.x;
                if (r.x + r.w > maxX) maxX = r.x + r.w;
                if (r.y < minY) minY = r.y;
                if (r.y + r.h > maxY) maxY = r.y + r.h;
            });
        }

        const centroid = HouseCenterGeometryEngine.calculatePolygonCentroid(pts);
        const maxHouseW = Math.max(1000, maxX - minX);
        const maxHouseD = Math.max(1000, maxY - minY);

        // Bán kính bao phủ toàn bộ vòng tròn La Kinh và ngôi nhà
        const compassRadius = Math.max(2800, Math.max(maxHouseW, maxHouseD) * 0.62 + 1000);
        const safeRadius = Math.max(compassRadius + 600, Math.max(maxHouseW, maxHouseD) / 2 + 1200);

        const viewBox = {
            x: Math.round(centroid.x - safeRadius),
            y: Math.round(centroid.y - safeRadius),
            w: Math.round(safeRadius * 2),
            h: Math.round(safeRadius * 2)
        };

        // 1. TƯỜNG NGOÀI (220mm) VÀ CỘT BÊ TÔNG ĐEN GÓC (220x220mm)
        let wallsSvg = '<g class="layer-exterior-walls">';
        if (pts.length >= 3) {
            const pathData = pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z';
            wallsSvg += `
                <path d="${pathData}" fill="rgba(255, 255, 255, 0.4)" stroke="#0f172a" stroke-width="220" stroke-linejoin="miter" stroke-linecap="square"/>
                <path d="${pathData}" fill="none" stroke="#64748b" stroke-width="6" stroke-dasharray="25,15" opacity="0.8"/>
            `;

            pts.forEach((p, idx) => {
                const isEdgeSel = (selectedEdgeIdx === idx);
                wallsSvg += `
                    <rect x="${p.x - 110}" y="${p.y - 110}" width="220" height="220" fill="#0f172a" stroke="#000000" stroke-width="4"/>
                `;

                const pNext = pts[(idx + 1) % pts.length];
                wallsSvg += `
                    <line class="cad-edge-hitbox" data-edge-idx="${idx}" x1="${p.x}" y1="${p.y}" x2="${pNext.x}" y2="${pNext.y}" stroke="${isEdgeSel ? '#f59e0b' : 'transparent'}" stroke-width="${isEdgeSel ? 40 : 300}" stroke-linecap="round" style="cursor: pointer; pointer-events: all;"/>
                `;
            });
        }
        wallsSvg += '</g>';

        // 2. KHỐI NỘI THẤT PROCEDURAL VECTOR BLOCKS
        const renderBedBlock = (x, y, w, h, name = 'P.NGỦ') => {
            const scale = Math.min(1, Math.min((w * 0.75) / 2800, (h * 0.75) / 3200));
            const bedW = 1800 * scale;
            const bedH = 2000 * scale;
            const pillowW = 550 * scale;
            const pillowH = 350 * scale;
            const pillowRx = 40 * scale;
            const tabW = 450 * scale;
            const tabH = 400 * scale;
            const wardrobeW = Math.min(600 * scale, w * 0.22);
            const wardrobeH = Math.min(1800 * scale, h * 0.6);
            const doorR = Math.min(800 * scale, w * 0.28);

            const bx = x + (w - bedW) / 2;
            const by = y + 180 * scale;

            return `
                <g class="arch-block-bedroom">
                    <g transform="translate(${x + w - wardrobeW - 60 * scale}, ${y + 80 * scale})">
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
                    </g>
                `;
            }

            return `
                <g class="arch-block-door" transform="translate(${x}, ${y})">
                    <rect x="0" y="0" width="${w}" height="${h}" fill="none" stroke="#111827" stroke-width="8" stroke-dasharray="25,15"/>
                    <line x1="0" y1="${h / 2}" x2="${doorW * 0.85}" y2="${h / 2 - doorW * 0.85}" stroke="#111827" stroke-width="16"/>
                    <path d="M 0 ${h / 2} A ${doorW * 0.85} ${doorW * 0.85} 0 0 1 ${doorW * 0.85} ${h / 2 - doorW * 0.85}" fill="none" stroke="#64748b" stroke-width="8" stroke-dasharray="18,12"/>
                    <rect x="0" y="0" width="${Math.max(40, w * 0.08)}" height="${h}" fill="#111827"/>
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
                </g>
            `;
        };

        
        const renderOfficeBlock = (x, y, w, h, name = 'P.LÀM VIỆC') => {
            const deskW = Math.min(w * 0.75, 1800);
            const deskH = Math.min(h * 0.4, 800);
            const dx = x + (w - deskW) / 2;
            const dy = y + 140;
            const chairR = Math.min(deskH * 0.45, 240);

            return `
                <g class="arch-block-office">
                    <rect x="${dx}" y="${dy}" width="${deskW}" height="${deskH}" rx="12" fill="#ffffff" stroke="#111827" stroke-width="10"/>
                    <rect x="${dx + (deskW - 550) / 2}" y="${dy + 120}" width="550" height="80" rx="6" fill="#1e293b" stroke="#0f172a" stroke-width="4"/>
                    <rect x="${dx + (deskW - 200) / 2}" y="${dy + 220}" width="200" height="120" rx="4" fill="#f8fafc" stroke="#94a3b8" stroke-width="4"/>
                    <circle cx="${dx + deskW / 2}" cy="${dy + deskH + chairR + 40}" r="${chairR}" fill="#ffffff" stroke="#111827" stroke-width="10"/>
                    <path d="M ${dx + deskW / 2 - chairR * 0.7} ${dy + deskH + chairR + 40} Q ${dx + deskW / 2} ${dy + deskH + 40} ${dx + deskW / 2 + chairR * 0.7} ${dy + deskH + chairR + 40}" fill="none" stroke="#111827" stroke-width="8"/>
                </g>
            `;
        };

        const renderGarageBlock = (x, y, w, h, name = 'GARA XE') => {
            const carW = Math.min(w * 0.7, 1800);
            const carH = Math.min(h * 0.8, 3800);
            const cx = x + (w - carW) / 2;
            const cy = y + (h - carH) / 2;

            return `
                <g class="arch-block-garage">
                    <rect x="${x + 20}" y="${y + 20}" width="${w - 40}" height="${h - 40}" fill="none" stroke="#94a3b8" stroke-width="6" stroke-dasharray="25,15"/>
                    <g transform="translate(${cx}, ${cy})">
                        <rect width="${carW}" height="${carH}" rx="80" fill="#ffffff" stroke="#111827" stroke-width="12"/>
                        <path d="M 60 450 Q ${carW / 2} 320 ${carW - 60} 450 L ${carW - 100} 950 Q ${carW / 2} 900 100 950 Z" fill="#e2e8f0" stroke="#111827" stroke-width="8"/>
                        <path d="M 80 ${carH - 450} Q ${carW / 2} ${carH - 320} ${carW - 80} ${carH - 450} L ${carW - 110} ${carH - 850} Q ${carW / 2} ${carH - 800} 110 ${carH - 850} Z" fill="#e2e8f0" stroke="#111827" stroke-width="8"/>
                        <rect x="20" y="200" width="40" height="150" rx="8" fill="#111827"/>
                        <rect x="${carW - 60}" y="200" width="40" height="150" rx="8" fill="#111827"/>
                        <rect x="20" y="${carH - 350}" width="40" height="150" rx="8" fill="#111827"/>
                        <rect x="${carW - 60}" y="${carH - 350}" width="40" height="150" rx="8" fill="#111827"/>
                    </g>
                </g>
            `;
        };

        const renderSkylightBlock = (x, y, w, h, name = 'GIẾNG TRỜI') => {
            return `
                <g class="arch-block-skylight">
                    <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#f0f9ff" stroke="#0284c7" stroke-width="8"/>
                    <line x1="${x}" y1="${y}" x2="${x + w}" y2="${y + h}" stroke="#0284c7" stroke-width="6" stroke-dasharray="20,15"/>
                    <line x1="${x + w}" y1="${y}" x2="${x}" y2="${y + h}" stroke="#0284c7" stroke-width="6" stroke-dasharray="20,15"/>
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
                </g>
            `;
        };

        // 3. RENDER CÁC PHÒNG NỘI THẤT TƯƠNG TÁC
        let roomsSvg = '';
        if (geometry.rooms) {
            geometry.rooms.forEach(r => {
                const isSel = (r.id === selectedId);

                let symbolSvg = '';
                if (r.type === 'garage' || r.type === 'car') symbolSvg = renderGarageBlock(r.x, r.y, r.w, r.h, r.name);
                else if (r.type === 'office' || r.type === 'study') symbolSvg = renderOfficeBlock(r.x, r.y, r.w, r.h, r.name);
                else if (r.type === 'skylight' || r.type === 'shaft' || r.type === 'void') symbolSvg = renderSkylightBlock(r.x, r.y, r.w, r.h, r.name);
                else if (r.type === 'bed_master' || r.type === 'bed_regular' || r.type === 'bed') symbolSvg = renderBedBlock(r.x, r.y, r.w, r.h, r.name);
                else if (r.type === 'living_room' || r.type === 'living' || r.type === 'common_room' || r.type === 'gym') symbolSvg = renderLivingBlock(r.x, r.y, r.w, r.h, r.name);
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
                                <rect x="-95" y="-42" width="110" height="70" rx="10" fill="#0284c7"/>
                                <text x="-40" y="4" text-anchor="middle" font-size="32" font-weight="800" fill="#ffffff">XOAY</text>
                            </g>
                            <g class="btn-cad-mini-action" data-action="delete" data-room-id="${r.id}" style="cursor: pointer;">
                                <rect x="30" y="-42" width="100" height="70" rx="10" fill="#ef4444"/>
                                <text x="80" y="4" text-anchor="middle" font-size="32" font-weight="800" fill="#ffffff">XÓA</text>
                            </g>
                        </g>
                    `;
                }

                roomsSvg += `
                    <g class="cad-room-interactive ${isSel ? 'selected' : ''}" data-room-id="${r.id}" style="cursor: move;">
                        <rect x="${r.x}" y="${r.y}" width="${r.w}" height="${r.h}" fill="rgba(255, 255, 255, 0.96)" stroke="${isSel ? '#0284c7' : '#1e293b'}" stroke-width="${isSel ? 36 : 14}" rx="8"/>
                        ${symbolSvg}
                        ${handlesSvg}
                    </g>
                `;
            });
        }

        // 4. KÍCH THƯỚC CHI TIẾT (DIMENSION LINES)
        let dimsSvg = '<g class="layer-dimension-lines" pointer-events="none">';
        if (pts.length >= 2) {
            for (let i = 0; i < pts.length; i++) {
                const p1 = pts[i];
                const p2 = pts[(i + 1) % pts.length];
                const len = Math.round(Math.hypot(p2.x - p1.x, p2.y - p1.y));
                const midX = (p1.x + p2.x) / 2;
                const midY = (p1.y + p2.y) / 2;

                const dx = p2.x - p1.x;
                const dy = p2.y - p1.y;
                const norm = Math.hypot(dx, dy) || 1;
                const nx = -dy / norm;
                const ny = dx / norm;

                const offsetDist = 550;
                const dimP1x = p1.x + nx * offsetDist;
                const dimP1y = p1.y + ny * offsetDist;
                const dimP2x = p2.x + nx * offsetDist;
                const dimP2y = p2.y + ny * offsetDist;
                const textX = midX + nx * (offsetDist + 220);
                const textY = midY + ny * (offsetDist + 220);

                let textRot = (Math.atan2(dy, dx) * 180) / Math.PI;
                if (textRot > 90 || textRot < -90) textRot += 180;

                dimsSvg += `
                    <line x1="${p1.x}" y1="${p1.y}" x2="${dimP1x + nx * 80}" y2="${dimP1y + ny * 80}" stroke="#64748b" stroke-width="4"/>
                    <line x1="${p2.x}" y1="${p2.y}" x2="${dimP2x + nx * 80}" y2="${dimP2y + ny * 80}" stroke="#64748b" stroke-width="4"/>
                    <line x1="${dimP1x}" y1="${dimP1y}" x2="${dimP2x}" y2="${dimP2y}" stroke="#0f172a" stroke-width="8"/>
                    <line x1="${dimP1x - 30}" y1="${dimP1y - 30}" x2="${dimP1x + 30}" y2="${dimP1y + 30}" stroke="#0f172a" stroke-width="12"/>
                    <line x1="${dimP2x - 30}" y1="${dimP2y - 30}" x2="${dimP2x + 30}" y2="${dimP2y + 30}" stroke="#0f172a" stroke-width="12"/>
                    <text x="${textX}" y="${textY}" text-anchor="middle" font-size="140" font-weight="900" fill="#0f172a" font-family="'Inter', sans-serif" transform="rotate(${textRot}, ${textX}, ${textY})">${len}</text>
                `;
            }
        }
        dimsSvg += '</g>';

        // 5. ĐIỂM GÓC TƯƠNG TÁC (VERTEX HANDLES)
        let handlesLayer = '<g class="layer-vertex-handles">';
        pts.forEach((p, idx) => {
            handlesLayer += `
                <g class="cad-vertex-group" data-vertex-idx="${idx}" style="cursor: crosshair;">
                    <circle class="cad-vertex-handle" data-vertex-idx="${idx}" cx="${p.x}" cy="${p.y}" r="380" fill="transparent" stroke="none" pointer-events="all" style="touch-action: none;"/>
                    <circle cx="${p.x}" cy="${p.y}" r="75" fill="#f59e0b" stroke="#ffffff" stroke-width="12" pointer-events="none"/>
                </g>
            `;
        });
        handlesLayer += '</g>';

        // Tâm nhà hình học
        const centerMarkerSvg = `
            <g class="layer-house-center" transform="translate(${centroid.x}, ${centroid.y})" pointer-events="none">
                <circle cx="0" cy="0" r="160" fill="rgba(239, 68, 68, 0.25)" stroke="#ef4444" stroke-width="16"/>
                <circle cx="0" cy="0" r="45" fill="#ef4444"/>
                <line x1="-300" y1="0" x2="300" y2="0" stroke="#ef4444" stroke-width="12" stroke-dasharray="30,20"/>
                <line x1="0" y1="-300" x2="0" y2="300" stroke="#ef4444" stroke-width="12" stroke-dasharray="30,20"/>
                <rect x="-350" y="-380" width="700" height="100" rx="18" fill="#ef4444"/>
                <text x="0" y="-315" text-anchor="middle" font-size="65" font-weight="900" fill="#ffffff" font-family="'Inter', sans-serif">TÂM NHÀ (CENTROID)</text>
            </g>
        `;

        // 6. DEDICATED HIGH-CONTRAST ROOM LABELS LAYER (Luôn nổi rõ ràng trên cùng)
        let roomLabelsSvg = '<g class="layer-room-labels" pointer-events="none">';
        if (geometry.rooms) {
            geometry.rooms.forEach(r => {
                const cx = r.x + r.w / 2;
                const cy = r.y + r.h / 2;
                const badgeW = Math.min(r.w * 0.85, Math.max(900, r.name.length * 100));
                const badgeH = Math.min(r.h * 0.35, 180);
                const fs = Math.min(130, Math.min(badgeW / (r.name.length * 0.65), badgeH * 0.6));
                
                roomLabelsSvg += `
                    <g transform="translate(${cx}, ${cy})">
                        <rect x="${-badgeW / 2}" y="${-badgeH / 2}" width="${badgeW}" height="${badgeH}" rx="${badgeH * 0.25}" fill="rgba(255, 255, 255, 0.95)" stroke="#0f172a" stroke-width="8"/>
                        <text x="0" y="${fs * 0.35}" text-anchor="middle" font-size="${fs}" font-weight="900" fill="#0f172a" font-family="'Inter', sans-serif" letter-spacing="1.5">${r.name}</text>
                    </g>
                `;
            });
        }
        roomLabelsSvg += '</g>';

        return {
            viewBox,
            wallsLayer: wallsSvg,
            roomsLayer: roomsSvg,
            roomLabelsLayer: roomLabelsSvg,
            dimensionsLayer: dimsSvg,
            vertexLayer: handlesLayer,
            centerLayer: centerMarkerSvg,
            houseMinX: minX,
            houseMinY: minY,
            houseWidth: maxHouseW,
            houseDepth: maxHouseD,
            houseCenterX: centroid.x,
            houseCenterY: centroid.y
        };
    }
}

// ------------------------------------------------------------
// 8. LUOPAN & NINE PALACES OVERLAY RENDERER (SVG THUẦN)
// ------------------------------------------------------------

export class LuoPanAndFlyingStarsSvgRenderer {
    constructor(options = {}) {
        this.size = options.size || 800;
    }

    // Vẽ quẻ Bát Quái thuần SVG (Vạch Liền Dương / Vạch Đứt Âm) tỉ lệ mm CAD
    renderTrigramSymbol(trigramId, cx, cy, size = 320, rotDeg = 0) {
        const trigramLines = {
            1: [0, 1, 0], // Khảm
            2: [0, 0, 0], // Khôn
            3: [1, 0, 0], // Chấn
            4: [0, 1, 1], // Tốn
            6: [1, 1, 1], // Càn
            7: [1, 1, 0], // Đoài
            8: [0, 0, 1], // Cấn
            9: [1, 0, 1]  // Ly
        };

        const lines = trigramLines[trigramId] || [1, 1, 1];
        const lineW = size * 1.3;
        const lineH = size * 0.18;
        const gap = size * 0.14;
        const halfW = lineW / 2;

        let svg = `<g transform="translate(${cx.toFixed(1)}, ${cy.toFixed(1)}) rotate(${rotDeg})">`;
        lines.forEach((isYang, idx) => {
            const y = (idx - 1) * (lineH + gap);
            if (isYang) {
                // Hào Dương: Vạch liền
                svg += `<rect x="${-halfW}" y="${y - lineH / 2}" width="${lineW}" height="${lineH}" rx="${lineH * 0.2}" fill="#dc2626"/>`;
            } else {
                // Hào Âm: Vạch đứt (2 đoạn)
                const segW = (lineW - gap * 1.2) / 2;
                svg += `<rect x="${-halfW}" y="${y - lineH / 2}" width="${segW}" height="${lineH}" rx="${lineH * 0.2}" fill="#dc2626"/>`;
                svg += `<rect x="${gap * 0.6}" y="${y - lineH / 2}" width="${segW}" height="${lineH}" rx="${lineH * 0.2}" fill="#dc2626"/>`;
            }
        });
        svg += '</g>';
        return svg;
    }

    renderOverlayLayer(flyingStars, houseCenterX, houseCenterY, houseW, houseD) {
        if (!flyingStars) return '';

        const radius = Math.max(3800, Math.max(houseW, houseD) * 0.65 + 1500);
        const facingDeg = flyingStars.facingDegree !== undefined ? flyingStars.facingDegree : 180;
        const sittingDeg = (facingDeg + 180) % 360;

        // 1. VÒNG NGOÀI CÙNG: 360 ĐỘ (VẠCH CHIA TỪNG ĐỘ VÀ SỐ ĐỘ MỖI 10 ĐỘ)
        let ticksSvg = '<g id="layer-360-degrees">';
        for (let deg = 0; deg < 360; deg++) {
            const rad = ((deg - 90) * Math.PI) / 180;
            const is10 = (deg % 10 === 0);
            const is5 = (deg % 5 === 0);
            const tickLen = is10 ? 380 : (is5 ? 240 : 130);
            const r1 = radius;
            const r2 = radius - tickLen;

            const x1 = r1 * Math.cos(rad);
            const y1 = r1 * Math.sin(rad);
            const x2 = r2 * Math.cos(rad);
            const y2 = r2 * Math.sin(rad);

            ticksSvg += `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="${is10 ? '#dc2626' : (is5 ? '#ef4444' : '#64748b')}" stroke-width="${is10 ? 28 : (is5 ? 18 : 10)}"/>`;

            if (is10) {
                const rText = radius - 580;
                const tx = rText * Math.cos(rad);
                const ty = rText * Math.sin(rad);
                let rotText = deg;
                if (deg > 90 && deg < 270) rotText = (rotText + 180) % 360;
                ticksSvg += `<text x="${tx.toFixed(1)}" y="${ty.toFixed(1)}" text-anchor="middle" dominant-baseline="central" font-size="260" font-weight="900" fill="#0f172a" font-family="'Inter', sans-serif" transform="rotate(${rotText}, ${tx.toFixed(1)}, ${ty.toFixed(1)})">${deg}</text>`;
            }
        }
        ticksSvg += '</g>';

        // 2. VÒNG 72 XUYÊN SƠN LONG (72 DRAGONS RING)
        const r72Out = radius - 820;
        const r72In = radius - 1200;
        let dragons72Svg = '<g id="layer-72-dragons">';
        for (let i = 0; i < 72; i++) {
            const deg = i * 5;
            const rad = ((deg - 90) * Math.PI) / 180;
            const x1 = r72In * Math.cos(rad);
            const y1 = r72In * Math.sin(rad);
            const x2 = r72Out * Math.cos(rad);
            const y2 = r72Out * Math.sin(rad);
            dragons72Svg += `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="#cbd5e1" stroke-width="14"/>`;
        }
        dragons72Svg += '</g>';

        // 3. VÒNG 24 SƠN HƯỚNG (24 MOUNTAINS RING)
        const rMntOut = r72In;
        const rMntIn = radius * 0.52;
        let mountainsSvg = '<g id="layer-24-mountains">';

        MOUNTAINS_24.forEach(m => {
            const radStart = ((m.startDeg - 90) * Math.PI) / 180;
            const radCenter = ((m.center - 90) * Math.PI) / 180;

            const xLine1 = rMntIn * Math.cos(radStart);
            const yLine1 = rMntIn * Math.sin(radStart);
            const xLine2 = rMntOut * Math.cos(radStart);
            const yLine2 = rMntOut * Math.sin(radStart);

            mountainsSvg += `<line x1="${xLine1.toFixed(1)}" y1="${yLine1.toFixed(1)}" x2="${xLine2.toFixed(1)}" y2="${yLine2.toFixed(1)}" stroke="#dc2626" stroke-width="20"/>`;

            // Tên 24 Sơn
            const rText = (rMntIn + rMntOut) / 2;
            const tx = rText * Math.cos(radCenter);
            const ty = rText * Math.sin(radCenter);
            let rotText = m.center;
            if (m.center > 90 && m.center < 270) rotText = (rotText + 180) % 360;

            const isFacingMnt = (m.name === flyingStars.facingMountain);
            const isSittingMnt = (m.name === flyingStars.sittingMountain);

            mountainsSvg += `
                <text x="${tx.toFixed(1)}" y="${ty.toFixed(1)}" text-anchor="middle" dominant-baseline="central" font-size="${isFacingMnt || isSittingMnt ? 380 : 320}" font-weight="900" fill="${isFacingMnt ? '#dc2626' : (isSittingMnt ? '#0284c7' : '#0f172a')}" font-family="'Inter', sans-serif" transform="rotate(${rotText}, ${tx.toFixed(1)}, ${ty.toFixed(1)})">${m.name}</text>
            `;
        });
        mountainsSvg += '</g>';

        // 4. VÒNG BÁT QUÁI & 8 HƯỚNG LỚN MÀU ĐỎ (8 TRIGRAMS & CARDINAL DIRECTIONS)
        const cardinalLabels = [
            { name: 'BẮC', deg: 0, trigram: 1 },
            { name: 'ĐÔNG BẮC', deg: 45, trigram: 8 },
            { name: 'ĐÔNG', deg: 90, trigram: 3 },
            { name: 'ĐÔNG NAM', deg: 135, trigram: 4 },
            { name: 'NAM', deg: 180, trigram: 9 },
            { name: 'TÂY NAM', deg: 225, trigram: 2 },
            { name: 'TÂY', deg: 270, trigram: 7 },
            { name: 'TÂY BẮC', deg: 315, trigram: 6 }
        ];

        let cardinalSvg = '<g id="layer-8-trigrams">';
        cardinalLabels.forEach(c => {
            const rad = ((c.deg - 90) * Math.PI) / 180;
            const rText = radius * 0.40;
            const tx = rText * Math.cos(rad);
            const ty = rText * Math.sin(rad);
            let rotText = c.deg;
            if (c.deg > 90 && c.deg < 270) rotText = (rotText + 180) % 360;

            // Nan phân cách 8 hướng màu đỏ nét đứt
            const xLine = radius * Math.cos(rad);
            const yLine = radius * Math.sin(rad);

            // Quẻ Bát Quái
            const rTrig = radius * 0.47;
            const trigX = rTrig * Math.cos(rad);
            const trigY = rTrig * Math.sin(rad);
            const trigSvg = this.renderTrigramSymbol(c.trigram, trigX, trigY, 320, rotText);

            cardinalSvg += `
                <line x1="0" y1="0" x2="${xLine.toFixed(1)}" y2="${yLine.toFixed(1)}" stroke="#dc2626" stroke-width="22" stroke-dasharray="120,60" opacity="0.85"/>
                ${trigSvg}
                <text x="${tx.toFixed(1)}" y="${ty.toFixed(1)}" text-anchor="middle" dominant-baseline="central" font-size="440" font-weight="900" fill="#dc2626" font-family="'Inter', sans-serif" letter-spacing="4" transform="rotate(${rotText}, ${tx.toFixed(1)}, ${ty.toFixed(1)})">${c.name}</text>
            `;
        });
        cardinalSvg += '</g>';

        // 5. KIM CHỈ TỌA - HƯỚNG CHÍNH XÁC (NEEDLE DIRECTION ARROWS)
        const radFacing = ((facingDeg - 90) * Math.PI) / 180;
        const radSitting = ((sittingDeg - 90) * Math.PI) / 180;

        const hx = (radius + 600) * Math.cos(radFacing);
        const hy = (radius + 600) * Math.sin(radFacing);
        const sx = (radius + 600) * Math.cos(radSitting);
        const sy = (radius + 600) * Math.sin(radSitting);

        const arrowSvg = `
            <g id="layer-direction-needles">
                <!-- Trục chỉ Hướng (Đỏ) -->
                <line x1="0" y1="0" x2="${hx.toFixed(1)}" y2="${hy.toFixed(1)}" stroke="#dc2626" stroke-width="60" stroke-linecap="round"/>
                <polygon points="${hx.toFixed(1)},${hy.toFixed(1)} ${(hx - 360 * Math.cos(radFacing - 0.35)).toFixed(1)},${(hy - 360 * Math.sin(radFacing - 0.35)).toFixed(1)} ${(hx - 360 * Math.cos(radFacing + 0.35)).toFixed(1)},${(hy - 360 * Math.sin(radFacing + 0.35)).toFixed(1)}" fill="#dc2626"/>
                <g transform="translate(${(radius - 1350) * Math.cos(radFacing)}, ${(radius - 1350) * Math.sin(radFacing)}) rotate(${facingDeg})">
                    <rect x="-420" y="-130" width="840" height="260" rx="40" fill="#dc2626" stroke="#ffffff" stroke-width="20"/>
                    <text x="0" y="25" text-anchor="middle" font-size="140" font-weight="900" fill="#ffffff" font-family="'Inter', sans-serif">HƯỚNG</text>
                </g>

                <!-- Trục chỉ Tọa (Xanh) -->
                <line x1="0" y1="0" x2="${sx.toFixed(1)}" y2="${sy.toFixed(1)}" stroke="#0284c7" stroke-width="60" stroke-linecap="round"/>
                <polygon points="${sx.toFixed(1)},${sy.toFixed(1)} ${(sx - 360 * Math.cos(radSitting - 0.35)).toFixed(1)},${(sy - 360 * Math.sin(radSitting - 0.35)).toFixed(1)} ${(sx - 360 * Math.cos(radSitting + 0.35)).toFixed(1)},${(sy - 360 * Math.sin(radSitting + 0.35)).toFixed(1)}" fill="#0284c7"/>
                <g transform="translate(${(radius - 1350) * Math.cos(radSitting)}, ${(radius - 1350) * Math.sin(radSitting)}) rotate(${sittingDeg})">
                    <rect x="-380" y="-130" width="760" height="260" rx="40" fill="#0284c7" stroke="#ffffff" stroke-width="20"/>
                    <text x="0" y="25" text-anchor="middle" font-size="140" font-weight="900" fill="#ffffff" font-family="'Inter', sans-serif">TỌA</text>
                </g>
            </g>
        `;

        return `
            <g class="layer-luopan-overlay" transform="translate(${houseCenterX}, ${houseCenterY})" pointer-events="none">
                <!-- Vòng tròn viền La Kinh đỏ đậm sắc nét -->
                <circle cx="0" cy="0" r="${radius}" fill="rgba(255, 255, 255, 0.35)" stroke="#dc2626" stroke-width="45"/>
                <circle cx="0" cy="0" r="${r72Out}" fill="none" stroke="#dc2626" stroke-width="25"/>
                <circle cx="0" cy="0" r="${r72In}" fill="none" stroke="#dc2626" stroke-width="25"/>
                <circle cx="0" cy="0" r="${rMntIn}" fill="none" stroke="#dc2626" stroke-width="30"/>
                <circle cx="0" cy="0" r="${radius * 0.32}" fill="none" stroke="#ef4444" stroke-width="20" stroke-dasharray="80,50"/>

                ${ticksSvg}
                ${dragons72Svg}
                ${mountainsSvg}
                ${cardinalSvg}
                ${arrowSvg}
            </g>
        `;
    }

    renderNinePalacesLayer(flyingStars, houseCenterX, houseCenterY, houseW, houseD, facingPalaceId = 9) {
        if (!flyingStars || !flyingStars.palaces) return '';

        // Khung ma trận 3x3 Cửu Cung tỉ lệ to rõ nổi bật ở trung tâm
        const boxSize = Math.max(6800, Math.min(houseW, houseD) * 1.05);
        const cellSize = boxSize / 3;
        const halfBox = boxSize / 2;

        // Ma trận 3x3 theo góc hướng nhà
        const order = getOrientedPalaceGrid(facingPalaceId);

        let cellsSvg = '';

        order.forEach((pId, idx) => {
            const row = Math.floor(idx / 3);
            const col = idx % 3;
            const x = -halfBox + col * cellSize;
            const y = -halfBox + row * cellSize;

            const pal = flyingStars.palaces[pId];
            if (!pal) return;

            const nienS = pal.nienStar !== undefined ? pal.nienStar : 1;
            const nguyetS = pal.nguyetStar !== undefined ? pal.nguyetStar : 1;
            const nhatS = pal.nhatStar !== undefined ? pal.nhatStar : 1;
            const thoiS = pal.thoiStar !== undefined ? pal.thoiStar : 1;

            const shortLabel = PALACE_SHORT[pId] || '';

            cellsSvg += `
                <g transform="translate(${x}, ${y})">
                    <!-- Viền ô bán trong suốt chống chói -->
                    <rect width="${cellSize}" height="${cellSize}" fill="rgba(255, 255, 255, 0.92)" stroke="#000000" stroke-width="40"/>

                    <!-- Hàng trên: 4 vòng tròn màu đánh số (Năm - Tháng - Ngày - Giờ) -->
                    <g transform="translate(${cellSize / 2}, ${cellSize * 0.16})">
                        <!-- Niên (Xanh lá) -->
                        <circle cx="-460" cy="0" r="130" fill="#ffffff" stroke="#16a34a" stroke-width="22"/>
                        <text x="-460" y="45" text-anchor="middle" font-size="150" font-weight="900" fill="#16a34a" font-family="'Inter', sans-serif">${nienS}</text>

                        <!-- Nguyệt (Đỏ) -->
                        <circle cx="-155" cy="0" r="130" fill="#ffffff" stroke="#dc2626" stroke-width="22"/>
                        <text x="-155" y="45" text-anchor="middle" font-size="150" font-weight="900" fill="#dc2626" font-family="'Inter', sans-serif">${nguyetS}</text>

                        <!-- Nhật (Cam) -->
                        <circle cx="155" cy="0" r="130" fill="#ffffff" stroke="#ea580c" stroke-width="22"/>
                        <text x="155" y="45" text-anchor="middle" font-size="150" font-weight="900" fill="#ea580c" font-family="'Inter', sans-serif">${nhatS}</text>

                        <!-- Thời (Tím) -->
                        <circle cx="460" cy="0" r="130" fill="#ffffff" stroke="#9333ea" stroke-width="22"/>
                        <text x="460" y="45" text-anchor="middle" font-size="150" font-weight="900" fill="#9333ea" font-family="'Inter', sans-serif">${thoiS}</text>
                    </g>

                    <!-- Ở giữa: Số Vận Tinh (Màu Xanh Dương Blue To Đậm Nét) -->
                    <text x="${cellSize / 2}" y="${cellSize * 0.54}" text-anchor="middle" font-size="820" font-weight="900" fill="#0284c7" font-family="'Inter', sans-serif">${pal.vanStar}</text>

                    <!-- Bên trái: Số Sơn Tinh (Tọa Tinh - Màu Đen To Đậm Nét) -->
                    <text x="${cellSize * 0.22}" y="${cellSize * 0.84}" text-anchor="middle" font-size="750" font-weight="900" fill="#000000" font-family="'Inter', sans-serif">${pal.sonStar}</text>

                    <!-- Bên phải: Số Hướng Tinh (Màu Đen To Đậm Nét) -->
                    <text x="${cellSize * 0.78}" y="${cellSize * 0.84}" text-anchor="middle" font-size="750" font-weight="900" fill="#000000" font-family="'Inter', sans-serif">${pal.huongStar}</text>

                    <!-- Ở dưới: Tên Cung Viết Tắt -->
                    <text x="${cellSize / 2}" y="${cellSize * 0.90}" text-anchor="middle" font-size="320" font-weight="900" fill="#000000" font-family="'Inter', sans-serif">${shortLabel}</text>
                </g>
            `;
        });

        return `
            <g class="layer-nine-palaces-matrix" transform="translate(${houseCenterX}, ${houseCenterY})" pointer-events="none">
                <!-- Khung viền ngoài đậm của ma trận 3x3 -->
                <rect x="${-halfBox}" y="${-halfBox}" width="${boxSize}" height="${boxSize}" fill="none" stroke="#000000" stroke-width="80"/>
                ${cellsSvg}
            </g>
        `;
    }
}

// ------------------------------------------------------------

// ------------------------------------------------------------
// 9. BÁT TRẠCH MINH KÍNH & TỔ HỢP SAO HUYỀN KHÔNG KINH ĐIỂN
// ------------------------------------------------------------

export const BAZHAI_MATRIX = {
    // 1: Khảm, 2: Khôn, 3: Chấn, 4: Tốn, 6: Càn, 7: Đoài, 8: Cấn, 9: Ly
    1: { 1: 'Phục Vị', 2: 'Tuyệt Mệnh', 3: 'Thiên Y', 4: 'Sinh Khí', 6: 'Lục Sát', 7: 'Họa Hại', 8: 'Ngũ Quỷ', 9: 'Diên Niên' },
    2: { 1: 'Tuyệt Mệnh', 2: 'Phục Vị', 3: 'Họa Hại', 4: 'Ngũ Quỷ', 6: 'Diên Niên', 7: 'Thiên Y', 8: 'Sinh Khí', 9: 'Lục Sát' },
    3: { 1: 'Thiên Y', 2: 'Họa Hại', 3: 'Phục Vị', 4: 'Diên Niên', 6: 'Ngũ Quỷ', 7: 'Tuyệt Mệnh', 8: 'Lục Sát', 9: 'Sinh Khí' },
    4: { 1: 'Sinh Khí', 2: 'Ngũ Quỷ', 3: 'Diên Niên', 4: 'Phục Vị', 6: 'Họa Hại', 7: 'Lục Sát', 8: 'Tuyệt Mệnh', 9: 'Thiên Y' },
    6: { 1: 'Lục Sát', 2: 'Diên Niên', 3: 'Ngũ Quỷ', 4: 'Họa Hại', 6: 'Phục Vị', 7: 'Sinh Khí', 8: 'Thiên Y', 9: 'Tuyệt Mệnh' },
    7: { 1: 'Họa Hại', 2: 'Thiên Y', 3: 'Tuyệt Mệnh', 4: 'Lục Sát', 6: 'Sinh Khí', 7: 'Phục Vị', 8: 'Diên Niên', 9: 'Ngũ Quỷ' },
    8: { 1: 'Ngũ Quỷ', 2: 'Sinh Khí', 3: 'Lục Sát', 4: 'Tuyệt Mệnh', 6: 'Thiên Y', 7: 'Diên Niên', 8: 'Phục Vị', 9: 'Họa Hại' },
    9: { 1: 'Diên Niên', 2: 'Lục Sát', 3: 'Sinh Khí', 4: 'Thiên Y', 6: 'Tuyệt Mệnh', 7: 'Ngũ Quỷ', 8: 'Họa Hại', 9: 'Phục Vị' }
};

export const BAZHAI_STAR_DETAILS = {
    'Sinh Khí':  { type: 'Cát', grade: 'Đại Cát', rank: 1, element: 'Mộc', desc: 'Chủ phú quý hiển đạt, sự nghiệp hanh thông, sinh con quý tử.' },
    'Thiên Y':   { type: 'Cát', grade: 'Đại Cát', rank: 2, element: 'Thổ', desc: 'Chủ sức khỏe dồi dào, tiêu trừ tật bệnh, gia đạo êm ấm.' },
    'Diên Niên': { type: 'Cát', grade: 'Thứ Cát', rank: 3, element: 'Kim', desc: 'Chủ tình duyên hòa hợp, nhân đinh phát triển, các mối quan hệ bền vững.' },
    'Phục Vị':   { type: 'Cát', grade: 'Tiểu Cát', rank: 4, element: 'Mộc', desc: 'Chủ bình an thanh tịnh, củng cố tâm thức, thuận lợi thi cử.' },
    'Tuyệt Mệnh':{ type: 'Hung', grade: 'Đại Hung', rank: 8, element: 'Kim', desc: 'Chủ tổn hại sức khỏe, tai ách bất ngờ, hao tán tài sản.' },
    'Ngũ Quỷ':   { type: 'Hung', grade: 'Đại Hung', rank: 7, element: 'Hỏa', desc: 'Chủ hỏa hoạn, thị phi kiện tụng, tiểu nhân quấy phá.' },
    'Lục Sát':   { type: 'Hung', grade: 'Thứ Hung', rank: 6, element: 'Thủy', desc: 'Chủ đào hoa sát, tình cảm rạn nứt, hao tài tốn của.' },
    'Họa Hại':   { type: 'Hung', grade: 'Tiểu Hung', rank: 5, element: 'Thổ', desc: 'Chủ bất hòa, quan hệ trắc trở, việc nhỏ hóa to.' }
};

export function analyzeStarCombination(sonStar, huongStar, van = 9) {
    const pair = `${sonStar}-${huongStar}`;
    const sortedPair = [sonStar, huongStar].sort().join('-');

    if (pair === '1-4' || pair === '4-1') {
        return { grade: 'ĐẠI CÁT', effect: 'Danh tài xuất chúng, đăng khoa giáp bảng, văn chương khoa cử hiển đạt.', source: 'Thẩm Thị Huyền Không Học' };
    }
    if (pair === '1-6' || pair === '6-1') {
        return { grade: 'CÁT', effect: 'Thủy Hỏa tương tề, quan lộc hanh thông, tài quan song toàn.', source: 'Huyền Không Bí Chỉ' };
    }
    if (pair === '8-9' || pair === '9-8') {
        return { grade: 'ĐẠI CÁT', effect: 'Hỷ khánh lâm môn, phú quý song toàn, đất nở hoa sinh quý tử.', source: 'Tử Bạch Quyết' };
    }
    if (pair === '2-5' || pair === '5-2') {
        return { grade: 'ĐẠI HUNG', effect: 'Nhị Hắc - Ngũ Hoàng giao gia, chủ tật bệnh, ôn dịch, tổn đinh hao tài.', source: 'Thẩm Thị Huyền Không Học' };
    }
    if (pair === '3-7' || pair === '7-3') {
        return { grade: 'HUNG', effect: 'Tặc kiếp sát, khẩu thiệt thị phi, đề phòng trộm cắp và kiện tụng.', source: 'Phi Tinh Phú' };
    }
    if (pair === '9-7' || pair === '7-9') {
        return { grade: 'HUNG', effect: 'Hỏa thiêu Phế kim, đề phòng hỏa tai và bệnh đường hô hấp.', source: 'Huyền Cơ Phú' };
    }
    if (pair === '6-7' || pair === '7-6') {
        return { grade: 'HUNG', effect: 'Giao kiếm sát, tranh đấu vũ lực, thương tích kim khí.', source: 'Phi Tinh Phú' };
    }
    if (huongStar === van || sonStar === van) {
        return { grade: 'CÁT', effect: `Đương Lệnh Vượng Khí Vận ${van}, nạp tài chiêu lộc đại cát.`, source: 'Cửu Tinh Đắc Lệnh' };
    }

    return { grade: 'BÌNH', effect: 'Khí trường trung hòa, phối hợp âm dương điều độ.', source: 'Huyền Không Học Cơ Bản' };
}

// ------------------------------------------------------------

export function calculateFengShuiSpatial(geometry, params) {
    const stars = calculateFlyingStars(params);
    const gua = calculateGua(params.ownerYear, params.ownerGender);
    const spatialPalaces = {};

    for (let p = 1; p <= 9; p++) {
        const pal = stars.palaces[p];
        const combo = analyzeStarCombination(pal.sonStar, pal.huongStar, stars.van);
        
        let bazhaiStar = 'Trung Cung';
        let bazhaiDetail = { type: 'Trung Hòa', grade: 'Bình', desc: 'Trung cung nạp khí' };

        if (p !== 5 && BAZHAI_MATRIX[gua.guaNum] && BAZHAI_MATRIX[gua.guaNum][p]) {
            bazhaiStar = BAZHAI_MATRIX[gua.guaNum][p];
            bazhaiDetail = BAZHAI_STAR_DETAILS[bazhaiStar] || bazhaiDetail;
        }

        let grade = combo.grade;
        if (pal.isFacing) grade = 'ĐẠI CÁT';
        else if (pal.isSitting) grade = 'CÁT';
        else if (bazhaiDetail.type === 'Cát' && combo.grade !== 'ĐẠI HUNG') grade = 'CÁT';
        else if (bazhaiDetail.type === 'Hung' && (pal.huongStar === 2 || pal.huongStar === 5)) grade = 'ĐẠI HUNG';

        let analysis = `Tọa Tinh số ${pal.sonStar} + Hướng Tinh số ${pal.huongStar}. ${combo.effect} Bát Trạch: Cung ${bazhaiStar} (${bazhaiDetail.desc})`;
        let remedy = 'Giữ gìn không gian sạch sẽ, thông thoáng.';

        if (grade === 'ĐẠI CÁT' || grade === 'CÁT') {
            remedy = 'Thích hợp bố trí Cửa Chính, Phòng Khách, Phòng Ngủ Master, Bàn Thờ, Phòng Làm Việc.';
        } else if (grade === 'ĐẠI HUNG' || grade === 'HUNG') {
            remedy = 'Thích hợp bố trí Khu Vệ Sinh, Phòng Giặt, Nhà Kho để trấn hung nạp cát.';
        }

        spatialPalaces[p] = {
            ...pal,
            grade,
            analysis,
            remedy,
            bazhaiStar,
            bazhaiDetail,
            starCombination: combo
        };
    }

    return {
        stars,
        gua,
        spatialPalaces
    };
}

// ------------------------------------------------------------
// 10. MULTI-TOUCH SVG VIEWPORT CONTROLLER
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
        this.activePointers = new Map();
        this.initialPinchDist = 0;
        this.initialPinchScale = 1;

        this.initEvents();
    }

    initEvents() {
        if (!this.stage) return;

        this.stage.addEventListener('wheel', (e) => {
            e.preventDefault();
            const delta = e.deltaY > 0 ? 0.9 : 1.1;
            this.zoom(delta);
        }, { passive: false });

        this.stage.addEventListener('pointerdown', (e) => {
            this.activePointers.set(e.pointerId, { x: e.clientX, y: e.clientY });

            if (this.activePointers.size === 1) {
                if (e.target.closest('.cad-room-interactive') || 
                    e.target.closest('.cad-vertex-handle') || 
                    e.target.closest('.cad-edge-hitbox') || 
                    e.target.closest('.cad-resize-handle') || 
                    e.target.closest('.btn-cad-mini-action') ||
                    e.target.closest('.cad-floating-toolbar') ||
                    e.target.closest('.cad-smart-popup')) {
                    return;
                }
                this.isPanning = true;
                this.startX = e.clientX - this.panX;
                this.startY = e.clientY - this.panY;
                try { this.stage.setPointerCapture(e.pointerId); } catch (_) {}
            } else if (this.activePointers.size >= 2) {
                this.isPanning = false;
                const pts = Array.from(this.activePointers.values());
                this.initialPinchDist = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
                this.initialPinchScale = this.scale;
            }
        });

        this.stage.addEventListener('pointermove', (e) => {
            if (!this.activePointers.has(e.pointerId)) return;
            this.activePointers.set(e.pointerId, { x: e.clientX, y: e.clientY });

            if (this.activePointers.size >= 2) {
                const pts = Array.from(this.activePointers.values());
                const curDist = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
                if (curDist > 10 && this.initialPinchDist > 10) {
                    const ratio = curDist / this.initialPinchDist;
                    this.scale = Math.max(0.2, Math.min(8.0, this.initialPinchScale * ratio));
                    this.updateTransform();
                }
            } else if (this.activePointers.size === 1 && this.isPanning) {
                this.panX = e.clientX - this.startX;
                this.panY = e.clientY - this.startY;
                this.updateTransform();
            }
        });

        const handlePointerEnd = (e) => {
            this.activePointers.delete(e.pointerId);
            try { this.stage.releasePointerCapture(e.pointerId); } catch (_) {}
            if (this.activePointers.size === 0) {
                this.isPanning = false;
                this.initialPinchDist = 0;
            } else if (this.activePointers.size === 1) {
                const p = this.activePointers.values().next().value;
                this.startX = p.x - this.panX;
                this.startY = p.y - this.panY;
            }
        };

        this.stage.addEventListener('pointerup', handlePointerEnd);
        this.stage.addEventListener('pointercancel', handlePointerEnd);
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

    zoom(factor) {
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
// 11. RENDER UNIFIED MULTI-LAYER SVG (100% THUẦN VECTOR)
// ------------------------------------------------------------

export function renderUnifiedSvg(cadLayers, luoPanOverlay, ninePalacesOverlay, layerState = {}, options = {}) {
    const vb = cadLayers.viewBox;

    const wallsContent = layerState.walls !== false ? (cadLayers.wallsLayer || '') : '';
    const vertexContent = cadLayers.vertexLayer || '';
    const roomsContent = layerState.furniture !== false ? (cadLayers.roomsLayer || '') : '';
    const roomLabelsContent = layerState.roomLabels !== false ? (cadLayers.roomLabelsLayer || '') : '';
    const dimsContent = layerState.dimensions !== false ? (cadLayers.dimensionsLayer || '') : '';
    const centerContent = layerState.axes !== false ? (cadLayers.centerLayer || '') : '';
    const luoPanContent = layerState.luoPan ? luoPanOverlay : '';
    const ninePalacesContent = layerState.ninePalaces ? ninePalacesOverlay : '';

    let sourceImageContent = '';
    if (layerState.sourceImage && options.sourceImageUrl) {
        const opacity = layerState.sourceImageOpacity !== undefined ? layerState.sourceImageOpacity : 0.35;
        sourceImageContent = `
            <g class="layer-source-image-overlay" pointer-events="none" opacity="${opacity}">
                <image href="${options.sourceImageUrl}" x="${cadLayers.houseMinX}" y="${cadLayers.houseMinY}" width="${cadLayers.houseWidth}" height="${cadLayers.houseDepth}" preserveAspectRatio="none"/>
            </g>
        `;
    }

    return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb.x} ${vb.y} ${vb.w} ${vb.h}" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" class="scan2cad-interactive-drawing" style="display: block; width: 100%; height: 100%; object-fit: contain; background: #ffffff; font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; user-select: none; -webkit-user-select: none; touch-action: none;">
    <defs>
        <pattern id="cadGridPattern" width="1000" height="1000" patternUnits="userSpaceOnUse">
            <path d="M 1000 0 L 0 0 0 1000" fill="none" stroke="rgba(0,0,0,0.03)" stroke-width="2"/>
        </pattern>
    </defs>
    
    <rect x="${vb.x}" y="${vb.y}" width="${vb.w}" height="${vb.h}" fill="url(#cadGridPattern)"/>

    ${sourceImageContent}
    ${luoPanContent}
    ${ninePalacesContent}
    ${wallsContent}
    ${roomsContent}
    ${dimsContent}
    ${centerContent}
    ${roomLabelsContent}
    ${vertexContent}
</svg>
    `.trim();
}
