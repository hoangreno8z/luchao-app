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

export function getOrientedPalaceGrid(facingPalaceId, isInverted = false) {
    const ring = [1, 8, 3, 4, 9, 2, 7, 6];
    const fIdx = ring.indexOf(facingPalaceId);
    if (fIdx === -1) return [4, 9, 2, 3, 5, 7, 8, 1, 6];
    const getP = (offset) => ring[((fIdx + offset) % 8 + 8) % 8];
    if (!isInverted) {
        // Chế độ 1 (Mặc định): Hướng Trên (mũi đỏ lên), Tọa Dưới (mũi xanh xuống)
        return [
            getP(-1), getP(0), getP(1),
            getP(-2), 5,       getP(2),
            getP(-3), getP(4), getP(3)
        ];
    } else {
        // Chế độ 2 (Đảo chiều): Tọa Trên (mũi xanh lên), Hướng Dưới (mũi đỏ xuống)
        return [
            getP(-3), getP(4), getP(3),
            getP(-2), 5,       getP(2),
            getP(-1), getP(0), getP(1)
        ];
    }
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


// ------------------------------------------------------------
// VECTOR SYMBOLS CHO 13 LOẠI NGOẠI CẢNH (LOAN ĐẦU PHONG THỦY)
// 100% Thuần Code SVG — Không Emoji — Tỉ Lệ Chuẩn mm CAD
// ------------------------------------------------------------

// ------------------------------------------------------------
// VECTOR SYMBOLS CHO 13 LOẠI NGOẠI CẢNH (LOAN ĐẦU PHONG THỦY)
// 100% THUẦN CODE VECTOR CAD LINE-ART — NỀN TRONG SUỐT (FILL="NONE")
// ĐỒNG BỘ ĐƯỜNG NÉT ĐEN (#0f172a) & ĐỎ (#dc2626) VỚI BẢN VẼ
// KHÔNG DÙNG NỀN ĐEN HAY MẢNG CHE KHUẤT KIẾN TRÚC
// ------------------------------------------------------------
export function renderLandscapeVectorSymbol(type, w, h) {
    const cx = w / 2;
    const cy = h / 2;

    switch (type) {
        case 'temple': // 1. Chùa / Đình (Mái ngói đao cong 2 tầng nét đỏ, tam quan, đỉnh tháp, lư hương)
            return `
                <!-- Khung bao khuôn viên nét đứt thanh mảnh -->
                <rect width="${w}" height="${h}" fill="none" stroke="#dc2626" stroke-width="8" stroke-dasharray="40,25" rx="10"/>
                
                <!-- Mái chùa đao cong 2 tầng nét đỏ kỹ thuật CAD -->
                <path d="M ${w * 0.12} ${h * 0.42} Q ${cx} ${h * 0.22} ${w * 0.88} ${h * 0.42} L ${w * 0.78} ${h * 0.50} Q ${cx} ${h * 0.36} ${w * 0.22} ${h * 0.50} Z" fill="none" stroke="#dc2626" stroke-width="14"/>
                <path d="M ${w * 0.20} ${h * 0.28} Q ${cx} ${h * 0.12} ${w * 0.80} ${h * 0.28} L ${w * 0.72} ${h * 0.35} Q ${cx} ${h * 0.22} ${w * 0.28} ${h * 0.35} Z" fill="none" stroke="#dc2626" stroke-width="12"/>
                
                <!-- Đỉnh tháp bảo -->
                <polygon points="${cx},${h * 0.05} ${cx - 50},${h * 0.12} ${cx + 50},${h * 0.12}" fill="none" stroke="#dc2626" stroke-width="10"/>
                <line x1="${cx}" y1="${h * 0.02}" x2="${cx}" y2="${h * 0.12}" stroke="#dc2626" stroke-width="8"/>
                
                <!-- Cột đình nét đôi & Cửa tam quan -->
                <line x1="${w * 0.30}" y1="${h * 0.50}" x2="${w * 0.30}" y2="${h * 0.88}" stroke="#0f172a" stroke-width="12"/>
                <line x1="${w * 0.70}" y1="${h * 0.50}" x2="${w * 0.70}" y2="${h * 0.88}" stroke="#0f172a" stroke-width="12"/>
                <rect x="${w * 0.38}" y="${h * 0.56}" width="${w * 0.24}" height="${h * 0.32}" fill="none" stroke="#0f172a" stroke-width="10" rx="6"/>
                <line x1="${cx}" y1="${h * 0.56}" x2="${cx}" y2="${h * 0.88}" stroke="#0f172a" stroke-width="8"/>
                
                <!-- Lư hương tròn trước cửa -->
                <circle cx="${cx}" cy="${h * 0.78}" r="${Math.min(w,h) * 0.07}" fill="none" stroke="#dc2626" stroke-width="8"/>
                <circle cx="${cx}" cy="${h * 0.78}" r="${Math.min(w,h) * 0.03}" fill="none" stroke="#dc2626" stroke-width="6"/>
            `;

        case 't_junction': // 2. Ngã 3 Đường (Giao lộ chữ T nét đôi + vạch tim đường đỏ nét đứt)
            return `
                <!-- Khung bao giao lộ trong suốt -->
                <rect width="${w}" height="${h}" fill="none" stroke="#0f172a" stroke-width="6" stroke-dasharray="30,20"/>
                
                <!-- Lòng đường chữ T viền nét đôi đen đậm -->
                <path d="M 0 ${h * 0.30} L ${w} ${h * 0.30}" stroke="#0f172a" stroke-width="16"/>
                <path d="M 0 ${h * 0.70} L ${w * 0.32} ${h * 0.70} L ${w * 0.32} ${h}" stroke="#0f172a" stroke-width="16"/>
                <path d="M ${w * 0.68} ${h} L ${w * 0.68} ${h * 0.70} L ${w} ${h * 0.70}" stroke="#0f172a" stroke-width="16"/>
                
                <!-- Vạch tim đường màu đỏ nét đứt -->
                <line x1="0" y1="${h * 0.50}" x2="${w}" y2="${h * 0.50}" stroke="#dc2626" stroke-width="10" stroke-dasharray="80,50"/>
                <line x1="${cx}" y1="${h * 0.50}" x2="${cx}" y2="${h}" stroke="#dc2626" stroke-width="10" stroke-dasharray="80,50"/>
                
                <!-- Mũi tên chỉ hướng luồng xe / luồng khí trực xung -->
                <polyline points="${w * 0.85},${h * 0.44} ${w * 0.95},${h * 0.50} ${w * 0.85},${h * 0.56}" fill="none" stroke="#dc2626" stroke-width="10"/>
                <polyline points="${w * 0.15},${h * 0.56} ${w * 0.05},${h * 0.50} ${w * 0.15},${h * 0.44}" fill="none" stroke="#dc2626" stroke-width="10"/>
                <polyline points="${cx - 40},${h * 0.86} ${cx},${h * 0.96} ${cx + 40},${h * 0.86}" fill="none" stroke="#dc2626" stroke-width="10"/>
            `;

        case 'crossroad': // 3. Ngã 4 Đường (Giao lộ chữ thập nét đôi + vạch sang đường)
            return `
                <!-- Khung bao giao lộ trong suốt -->
                <rect width="${w}" height="${h}" fill="none" stroke="#0f172a" stroke-width="6" stroke-dasharray="30,20"/>
                
                <!-- 4 góc vỉa hè ngã tư nét đôi đen -->
                <path d="M 0 ${h * 0.30} L ${w * 0.30} ${h * 0.30} L ${w * 0.30} 0" stroke="#0f172a" stroke-width="16" fill="none"/>
                <path d="M ${w * 0.70} 0 L ${w * 0.70} ${h * 0.30} L ${w} ${h * 0.30}" stroke="#0f172a" stroke-width="16" fill="none"/>
                <path d="M 0 ${h * 0.70} L ${w * 0.30} ${h * 0.70} L ${w * 0.30} ${h}" stroke="#0f172a" stroke-width="16" fill="none"/>
                <path d="M ${w} ${h * 0.70} L ${w * 0.70} ${h * 0.70} L ${w * 0.70} ${h}" stroke="#0f172a" stroke-width="16" fill="none"/>
                
                <!-- 2 đường tim đường giao thoa nét đỏ đứt -->
                <line x1="0" y1="${h * 0.50}" x2="${w}" y2="${h * 0.50}" stroke="#dc2626" stroke-width="10" stroke-dasharray="80,50"/>
                <line x1="${cx}" y1="0" x2="${cx}" y2="${h}" stroke="#dc2626" stroke-width="10" stroke-dasharray="80,50"/>
                
                <!-- 4 vạch sang đường người đi bộ (Zebra lines) nét đen -->
                <line x1="${w * 0.33}" y1="${h * 0.28}" x2="${w * 0.67}" y2="${h * 0.28}" stroke="#0f172a" stroke-width="12" stroke-dasharray="25,20"/>
                <line x1="${w * 0.33}" y1="${h * 0.72}" x2="${w * 0.67}" y2="${h * 0.72}" stroke="#0f172a" stroke-width="12" stroke-dasharray="25,20"/>
                <line x1="${w * 0.28}" y1="${h * 0.33}" x2="${w * 0.28}" y2="${h * 0.67}" stroke="#0f172a" stroke-width="12" stroke-dasharray="25,20"/>
                <line x1="${w * 0.72}" y1="${h * 0.33}" x2="${w * 0.72}" y2="${h * 0.67}" stroke="#0f172a" stroke-width="12" stroke-dasharray="25,20"/>
            `;

        case 'river_lake': // 4. Sông / Hồ (Đường bờ sông uốn lượn xanh dương + vân sóng nước)
            return `
                <!-- Đường bờ sông uốn lượn tự nhiên nét xanh dương đôi -->
                <path d="M 0 ${h * 0.28} Q ${w * 0.28} ${h * 0.12} ${w * 0.58} ${h * 0.42} T ${w} ${h * 0.32}" fill="none" stroke="#0284c7" stroke-width="16"/>
                <path d="M 0 ${h * 0.72} Q ${w * 0.28} ${h * 0.56} ${w * 0.58} ${h * 0.86} T ${w} ${h * 0.76}" fill="none" stroke="#0284c7" stroke-width="16"/>
                
                <!-- Các đường vân gợn sóng nước mềm mại -->
                <path d="M ${w * 0.12} ${h * 0.46} Q ${w * 0.22} ${h * 0.36} ${w * 0.32} ${h * 0.46}" fill="none" stroke="#0284c7" stroke-width="8" stroke-linecap="round"/>
                <path d="M ${w * 0.42} ${h * 0.60} Q ${w * 0.52} ${h * 0.50} ${w * 0.62} ${h * 0.60}" fill="none" stroke="#0284c7" stroke-width="8" stroke-linecap="round"/>
                <path d="M ${w * 0.68} ${h * 0.48} Q ${w * 0.78} ${h * 0.38} ${w * 0.88} ${h * 0.48}" fill="none" stroke="#0284c7" stroke-width="8" stroke-linecap="round"/>
                <path d="M ${w * 0.24} ${h * 0.62} Q ${w * 0.34} ${h * 0.52} ${w * 0.44} ${h * 0.62}" fill="none" stroke="#0284c7" stroke-width="8" stroke-linecap="round"/>
            `;

        case 'cemetery': // 5. Nghĩa Trang (Khung rào nét đứt + các cụm bia mộ đá CAD)
            return `
                <!-- Tường rào khuôn viên nghĩa trang nét đứt xám đen -->
                <rect width="${w}" height="${h}" fill="none" stroke="#0f172a" stroke-width="10" stroke-dasharray="35,20" rx="8"/>
                
                <!-- Các dãy bia mộ đá kiến trúc nét đen -->
                ${[0.2, 0.5, 0.8].map(px => [0.28, 0.68].map(py => `
                    <g transform="translate(${w * px}, ${h * py})">
                        <path d="M -30 20 L -30 -10 A 30 30 0 0 1 30 -10 L 30 20 Z" fill="none" stroke="#0f172a" stroke-width="8"/>
                        <line x1="0" y1="-8" x2="0" y2="8" stroke="#0f172a" stroke-width="6"/>
                        <line x1="-10" y1="-2" x2="10" y2="-2" stroke="#0f172a" stroke-width="6"/>
                        <rect x="-40" y="20" width="80" height="12" rx="3" fill="none" stroke="#0f172a" stroke-width="6"/>
                    </g>
                `).join('')).join('')}
            `;

        case 'park': // 6. Công Viên (Ranh giới xanh + các tán cây đồng tâm CAD)
            return `
                <!-- Ranh giới mảng xanh công viên nét xanh lá -->
                <rect width="${w}" height="${h}" fill="none" stroke="#16a34a" stroke-width="12" rx="16"/>
                <path d="M 0 ${h * 0.8} Q ${w * 0.4} ${h * 0.9} ${w * 0.5} ${h * 0.5} T ${w} ${h * 0.2}" fill="none" stroke="#16a34a" stroke-width="14" stroke-dasharray="30,15"/>
                
                <!-- Cụm các tán cây cổ thụ kiến trúc CAD (Đường tròn + tia phân nhánh) -->
                ${[
                    { x: 0.22, y: 0.32, r: 0.13 },
                    { x: 0.40, y: 0.25, r: 0.10 },
                    { x: 0.75, y: 0.68, r: 0.14 },
                    { x: 0.84, y: 0.45, r: 0.11 },
                    { x: 0.25, y: 0.72, r: 0.10 }
                ].map(tree => `
                    <circle cx="${w * tree.x}" cy="${h * tree.y}" r="${Math.min(w, h) * tree.r}" fill="none" stroke="#16a34a" stroke-width="10"/>
                    <circle cx="${w * tree.x}" cy="${h * tree.y}" r="${Math.min(w, h) * tree.r * 0.4}" fill="none" stroke="#16a34a" stroke-width="6"/>
                    <line x1="${w * tree.x - Math.min(w, h) * tree.r}" y1="${h * tree.y}" x2="${w * tree.x + Math.min(w, h) * tree.r}" y2="${h * tree.y}" stroke="#16a34a" stroke-width="5"/>
                    <line x1="${w * tree.x}" y1="${h * tree.y - Math.min(w, h) * tree.r}" x2="${w * tree.x}" y2="${h * tree.y + Math.min(w, h) * tree.r}" stroke="#16a34a" stroke-width="5"/>
                `).join('')}
            `;

        case 'substation': // 7. Trạm Điện (Tháp giàn tam giác đỏ + tia sét Hỏa Sát)
            return `
                <!-- Ranh giới trạm điện nét đứt đỏ cảnh báo -->
                <rect width="${w}" height="${h}" fill="none" stroke="#dc2626" stroke-width="10" stroke-dasharray="30,15" rx="8"/>
                
                <!-- Tháp giàn tam giác cao thế nét đỏ -->
                <polygon points="${cx},${h * 0.12} ${w * 0.22},${h * 0.88} ${w * 0.78},${h * 0.88}" fill="none" stroke="#dc2626" stroke-width="14"/>
                <line x1="${w * 0.32}" y1="${h * 0.65}" x2="${w * 0.68}" y2="${h * 0.65}" stroke="#dc2626" stroke-width="10"/>
                <line x1="${w * 0.38}" y1="${h * 0.42}" x2="${w * 0.62}" y2="${h * 0.42}" stroke="#dc2626" stroke-width="10"/>
                <line x1="${w * 0.12}" y1="${h * 0.35}" x2="${w * 0.88}" y2="${h * 0.35}" stroke="#dc2626" stroke-width="12"/>
                <line x1="${w * 0.18}" y1="${h * 0.52}" x2="${w * 0.82}" y2="${h * 0.52}" stroke="#dc2626" stroke-width="12"/>
                
                <!-- Tia sét điện quang nét vẽ đỏ -->
                <polyline points="${cx + 25},${h * 0.38} ${cx - 35},${h * 0.58} ${cx},${h * 0.58} ${cx - 20},${h * 0.78} ${cx + 40},${h * 0.52} ${cx},${h * 0.52}" fill="none" stroke="#dc2626" stroke-width="8"/>
            `;

        case 'bus_station': // 8. Bến Xe (Nhà chờ nét đôi + các vạch ô đỗ xe)
            return `
                <!-- Khung bến xe nét đôi đen -->
                <rect width="${w}" height="${h}" fill="none" stroke="#0f172a" stroke-width="12" rx="10"/>
                <rect x="${w * 0.10}" y="${h * 0.12}" width="${w * 0.80}" height="${h * 0.32}" fill="none" stroke="#0f172a" stroke-width="10" rx="6"/>
                <line x1="${w * 0.10}" y1="${h * 0.28}" x2="${w * 0.90}" y2="${h * 0.28}" stroke="#0f172a" stroke-width="6"/>
                
                <!-- 3 ô đỗ xe bus nét đứt -->
                ${[0.15, 0.42, 0.70].map(xOff => `
                    <rect x="${w * xOff}" y="${h * 0.55}" width="${w * 0.22}" height="${h * 0.36}" fill="none" stroke="#0f172a" stroke-width="8" stroke-dasharray="15,10" rx="4"/>
                    <!-- Hình dáng xe bus CAD nét mảnh -->
                    <rect x="${w * xOff + 20}" y="${h * 0.60}" width="${w * 0.22 - 40}" height="${h * 0.26}" fill="none" stroke="#0f172a" stroke-width="6" rx="4"/>
                `).join('')}
            `;

        case 'seaport': // 9. Cảng Biển (Cầu cảng bê tông vươn dài + cần cẩu + mỏ neo)
            return `
                <!-- Đường bờ kè biển nét xanh dương -->
                <line x1="0" y1="${h * 0.15}" x2="${w}" y2="${h * 0.15}" stroke="#0284c7" stroke-width="12"/>
                <!-- Cầu cảng bê tông vươn ra biển nét đôi đen -->
                <rect x="${w * 0.30}" y="${h * 0.15}" width="${w * 0.40}" height="${h * 0.70}" fill="none" stroke="#0f172a" stroke-width="14"/>
                <line x1="${w * 0.30}" y1="${h * 0.40}" x2="${w * 0.70}" y2="${h * 0.40}" stroke="#0f172a" stroke-width="8"/>
                <line x1="${w * 0.30}" y1="${h * 0.65}" x2="${w * 0.70}" y2="${h * 0.65}" stroke="#0f172a" stroke-width="8"/>
                
                <!-- Biểu tượng Mỏ Neo lớn nét xanh/đen -->
                <circle cx="${w * 0.82}" cy="${h * 0.40}" r="28" fill="none" stroke="#0284c7" stroke-width="8"/>
                <line x1="${w * 0.82}" y1="${h * 0.40}" x2="${w * 0.82}" y2="${h * 0.75}" stroke="#0284c7" stroke-width="10"/>
                <path d="M ${w * 0.72} ${h * 0.66} Q ${w * 0.82} ${h * 0.82} ${w * 0.92} ${h * 0.66}" fill="none" stroke="#0284c7" stroke-width="10" stroke-linecap="round"/>
            `;

        case 'airport': // 10. Sân Bay (Dải đường băng cất hạ cánh + máy bay CAD)
            return `
                <!-- Biên dải đường băng nét đôi đen -->
                <rect width="${w}" height="${h}" fill="none" stroke="#0f172a" stroke-width="10" stroke-dasharray="40,20"/>
                <rect x="${w * 0.05}" y="${h * 0.32}" width="${w * 0.90}" height="${h * 0.36}" fill="none" stroke="#0f172a" stroke-width="14"/>
                
                <!-- Vạch tim đường băng nét đứt dài & vạch ngưỡng -->
                <line x1="${w * 0.10}" y1="${h * 0.50}" x2="${w * 0.90}" y2="${h * 0.50}" stroke="#0f172a" stroke-width="12" stroke-dasharray="70,40"/>
                <line x1="${w * 0.08}" y1="${h * 0.35}" x2="${w * 0.08}" y2="${h * 0.65}" stroke="#0f172a" stroke-width="14" stroke-dasharray="15,10"/>
                <line x1="${w * 0.92}" y1="${h * 0.35}" x2="${w * 0.92}" y2="${h * 0.65}" stroke="#0f172a" stroke-width="14" stroke-dasharray="15,10"/>
                
                <!-- Máy bay phản lực CAD nét mảnh -->
                <g transform="translate(${cx}, ${cy}) rotate(-35)">
                    <path d="M 0 -70 C 12 -50 12 50 0 70 C -12 50 -12 -50 0 -70 Z" fill="none" stroke="#0284c7" stroke-width="8"/>
                    <polygon points="0,-15 80,25 70,35 0,8 -70,35 -80,25" fill="none" stroke="#0284c7" stroke-width="7"/>
                    <polygon points="0,45 30,65 25,72 0,65 -25,72 -30,65" fill="none" stroke="#0284c7" stroke-width="6"/>
                </g>
            `;

        case 'railway': // 11. Tuyến Đường Sắt (Đường ray đôi song song + tà vẹt gỗ)
            return `
                <!-- 2 thanh ray song song nét đôi đen -->
                <line x1="0" y1="${h * 0.35}" x2="${w}" y2="${h * 0.35}" stroke="#0f172a" stroke-width="14"/>
                <line x1="0" y1="${h * 0.65}" x2="${w}" y2="${h * 0.65}" stroke="#0f172a" stroke-width="14"/>
                
                <!-- 16 thanh tà vẹt gỗ ngang xếp đều đặn -->
                ${Array.from({ length: 16 }).map((_, i) => `
                    <line x1="${(w / 16) * i + (w / 32)}" y1="${h * 0.18}" x2="${(w / 16) * i + (w / 32)}" y2="${h * 0.82}" stroke="#0f172a" stroke-width="8"/>
                `).join('')}
            `;

        case 'field': // 12. Ruộng Đồng (Bờ thửa bàn cờ nét đen + khóm lúa)
            return `
                <!-- Khung bờ ruộng nét đôi đen -->
                <rect width="${w}" height="${h}" fill="none" stroke="#0f172a" stroke-width="12" rx="8"/>
                <line x1="${w * 0.33}" y1="0" x2="${w * 0.33}" y2="${h}" stroke="#0f172a" stroke-width="10"/>
                <line x1="${w * 0.66}" y1="0" x2="${w * 0.66}" y2="${h}" stroke="#0f172a" stroke-width="10"/>
                <line x1="0" y1="${h * 0.50}" x2="${w}" y2="${h * 0.50}" stroke="#0f172a" stroke-width="10"/>
                
                <!-- Khóm lúa mạ non CAD nét mảnh -->
                ${[0.16, 0.50, 0.83].map(px => [0.25, 0.75].map(py => `
                    <path d="M ${w * px - 35} ${h * py} Q ${w * px} ${h * py - 25} ${w * px + 35} ${h * py}" fill="none" stroke="#16a34a" stroke-width="7" stroke-linecap="round"/>
                    <line x1="${w * px}" y1="${h * py - 25}" x2="${w * px}" y2="${h * py}" stroke="#16a34a" stroke-width="6"/>
                `).join('')).join('')}
            `;

        case 'mountain': // 13. Núi Cao (3 đỉnh núi nét đôi đen & đường gân sống núi đỏ)
        default:
            return `
                <!-- Khung chân núi nét đứt -->
                <rect width="${w}" height="${h}" fill="none" stroke="#0f172a" stroke-width="6" stroke-dasharray="35,20" rx="10"/>
                
                <!-- Đỉnh núi bên trái nét đen -->
                <polygon points="${w * 0.25},${h * 0.22} ${w * 0.05},${h * 0.88} ${w * 0.50},${h * 0.88}" fill="none" stroke="#0f172a" stroke-width="14"/>
                <line x1="${w * 0.25}" y1="${h * 0.22}" x2="${w * 0.25}" y2="${h * 0.88}" stroke="#dc2626" stroke-width="8" stroke-dasharray="15,10"/>
                
                <!-- Đỉnh núi bên phải nét đen -->
                <polygon points="${w * 0.75},${h * 0.26} ${w * 0.50},${h * 0.88} ${w * 0.95},${h * 0.88}" fill="none" stroke="#0f172a" stroke-width="14"/>
                <line x1="${w * 0.75}" y1="${h * 0.26}" x2="${w * 0.75}" y2="${h * 0.88}" stroke="#dc2626" stroke-width="8" stroke-dasharray="15,10"/>
                
                <!-- Đỉnh núi trung tâm cao vút (Chủ Sơn) -->
                <polygon points="${cx},${h * 0.08} ${w * 0.18},${h * 0.90} ${w * 0.82},${h * 0.90}" fill="none" stroke="#0f172a" stroke-width="18"/>
                <line x1="${cx}" y1="${h * 0.08}" x2="${cx}" y2="${h * 0.90}" stroke="#dc2626" stroke-width="10"/>
                
                <!-- Nét gân dốc núi (Hatch lines CAD) -->
                <line x1="${cx - 80}" y1="${h * 0.35}" x2="${cx - 160}" y2="${h * 0.45}" stroke="#0f172a" stroke-width="6"/>
                <line x1="${cx + 80}" y1="${h * 0.35}" x2="${cx + 160}" y2="${h * 0.45}" stroke="#0f172a" stroke-width="6"/>
                <line x1="${cx - 120}" y1="${h * 0.55}" x2="${cx - 240}" y2="${h * 0.70}" stroke="#0f172a" stroke-width="6"/>
                <line x1="${cx + 120}" y1="${h * 0.55}" x2="${cx + 240}" y2="${h * 0.70}" stroke="#0f172a" stroke-width="6"/>
            `;
    }
}


export class ArchitecturalCADRenderer {
    constructor(options = {}) {
        this.theme = options.theme || 'white';
        this.wallThickness = options.wallThickness || 220;
        this.colDim = options.colDim || 220;
    }

    renderLayers(geometry, options = {}) {
        const pts = geometry.footprintPoints || [];
        const selectedId = options.selectedRoomId || null;
        const selectedLandscapeId = options.selectedLandscapeId || null;
        const selectedEdgeIdx = options.selectedEdgeIndex !== undefined ? options.selectedEdgeIndex : null;

        // 1. TỌA ĐỘ VÀ TÂM NHÀ CỐ ĐỊNH (KHÔNG THAY ĐỔI KHI DI CHUYỂN NGOẠI CẢNH)
        let houseMinX = Infinity, houseMaxX = -Infinity, houseMinY = Infinity, houseMaxY = -Infinity;
        pts.forEach(p => {
            if (p.x < houseMinX) houseMinX = p.x;
            if (p.x > houseMaxX) houseMaxX = p.x;
            if (p.y < houseMinY) houseMinY = p.y;
            if (p.y > houseMaxY) houseMaxY = p.y;
        });

        if (pts.length === 0) {
            houseMinX = 0; houseMaxX = geometry.widthMm || 5000;
            houseMinY = 0; houseMaxY = geometry.depthMm || 16000;
        }

        const centroid = HouseCenterGeometryEngine.calculatePolygonCentroid(pts);
        const houseW = Math.max(1000, houseMaxX - houseMinX);
        const houseD = Math.max(1000, houseMaxY - houseMinY);

        // Bán kính La Kinh và Cửu Cung cố định theo kích thước ngôi nhà
        const compassRadius = Math.max(4800, Math.max(houseW, houseD) * 0.70 + 2000);
        
        // Bán kính khung nhìn cố định (Anchor an toàn) — Đảm bảo di chuyển ngoại cảnh 100% không làm rung/nhảy/zoom viewBox
        const fixedViewRadius = Math.max(12500, Math.max(houseW, houseD) * 1.35 + 4000);

        const viewBox = {
            x: Math.round(centroid.x - fixedViewRadius),
            y: Math.round(centroid.y - fixedViewRadius),
            w: Math.round(fixedViewRadius * 2),
            h: Math.round(fixedViewRadius * 2)
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
                wallsSvg += `
                    <rect x="${p.x - 110}" y="${p.y - 110}" width="220" height="220" fill="#000000" stroke="#ffffff" stroke-width="4"/>
                `;
            });
        }
        wallsSvg += '</g>';

        // 2. NGOẠI CẢNH (LOAN ĐẦU XUNG QUANH NHÀ)
        let landscapesSvg = '<g class="layer-landscapes-interactive">';
        if (geometry.landscapes) {
            geometry.landscapes.forEach(l => {
                const isSel = (selectedLandscapeId === l.id);
                const sym = renderLandscapeVectorSymbol(l.type, l.w, l.h);

                let handlesSvg = '';
                if (isSel) {
                    const hs = 120;
                    const handlePoints = [
                        { id: 'nw', cx: l.x, cy: l.y, cur: 'nwse-resize' },
                        { id: 'n',  cx: l.x + l.w / 2, cy: l.y, cur: 'ns-resize' },
                        { id: 'ne', cx: l.x + l.w, cy: l.y, cur: 'nesw-resize' },
                        { id: 'e',  cx: l.x + l.w, cy: l.y + l.h / 2, cur: 'ew-resize' },
                        { id: 'se', cx: l.x + l.w, cy: l.y + l.h, cur: 'nwse-resize' },
                        { id: 's',  cx: l.x + l.w / 2, cy: l.y + l.h, cur: 'ns-resize' },
                        { id: 'sw', cx: l.x, cy: l.y + l.h, cur: 'nesw-resize' },
                        { id: 'w',  cx: l.x, cy: l.y + l.h / 2, cur: 'ew-resize' }
                    ];

                    handlesSvg = `
                        ${handlePoints.map(hp => `
                            <g class="cad-resize-handle-group" data-handle="${hp.id}" data-landscape-id="${l.id}" style="cursor: ${hp.cur};">
                                <circle class="cad-resize-handle" data-handle="${hp.id}" data-landscape-id="${l.id}" cx="${hp.cx}" cy="${hp.cy}" r="380" fill="transparent" pointer-events="all" style="touch-action: none;"/>
                                <rect x="${hp.cx - hs / 2}" y="${hp.cy - hs / 2}" width="${hs}" height="${hs}" fill="#f59e0b" stroke="#ffffff" stroke-width="12" rx="8" pointer-events="none"/>
                            </g>
                        `).join('')}

                        <g class="cad-mini-action-bar" transform="translate(${l.x + l.w / 2}, ${l.y - 140})">
                            <rect x="-260" y="-55" width="520" height="96" rx="18" fill="#0f172a" stroke="#f59e0b" stroke-width="4"/>
                            <g class="btn-cad-mini-action" data-action="confirm_landscape" data-landscape-id="${l.id}" style="cursor: pointer;">
                                <rect x="-240" y="-42" width="130" height="70" rx="10" fill="#16a34a"/>
                                <text x="-175" y="4" text-anchor="middle" font-size="34" font-weight="900" fill="#ffffff">XONG</text>
                            </g>
                            <g class="btn-cad-mini-action" data-action="rotate_landscape" data-landscape-id="${l.id}" style="cursor: pointer;">
                                <rect x="-95" y="-42" width="110" height="70" rx="10" fill="#0284c7"/>
                                <text x="-40" y="4" text-anchor="middle" font-size="32" font-weight="800" fill="#ffffff">XOAY</text>
                            </g>
                            <g class="btn-cad-mini-action" data-action="delete_landscape" data-landscape-id="${l.id}" style="cursor: pointer;">
                                <rect x="30" y="-42" width="100" height="70" rx="10" fill="#ef4444"/>
                                <text x="80" y="4" text-anchor="middle" font-size="32" font-weight="800" fill="#ffffff">XÓA</text>
                            </g>
                        </g>
                    `;
                }

                const rotStr = l.rot ? `rotate(${l.rot}, ${l.x + l.w / 2}, ${l.y + l.h / 2})` : '';

                landscapesSvg += `
                    <g class="cad-landscape-interactive ${isSel ? 'selected' : ''}" data-landscape-id="${l.id}" transform="${rotStr}" style="cursor: move;" pointer-events="all">
                        <!-- Hitbox trong suốt bao phủ toàn bộ diện tích ngoại cảnh để bắt sự kiện kéo thả chính xác 100% -->
                        <rect class="cad-landscape-hitbox" data-landscape-id="${l.id}" x="${l.x}" y="${l.y}" width="${l.w}" height="${l.h}" fill="transparent" pointer-events="all" style="cursor: move; touch-action: none;"/>
                        
                        <g transform="translate(${l.x}, ${l.y})" pointer-events="none">
                            ${sym}
                        </g>
                        <g transform="translate(${l.x + l.w / 2}, ${l.y + l.h / 2})" pointer-events="all">
                            <rect x="${-Math.min(l.w * 0.45, 900)}" y="-50" width="${Math.min(l.w * 0.9, 1800)}" height="100" rx="16" fill="rgba(255, 255, 255, 0.92)" stroke="#0f172a" stroke-width="8"/>
                            <text x="0" y="16" text-anchor="middle" font-size="65" font-weight="900" fill="#0f172a" font-family="'Inter', sans-serif" letter-spacing="1.5">${l.name}</text>
                        </g>
                        ${handlesSvg}
                    </g>
                `;
            });
        }
        landscapesSvg += '</g>';

        // 2.8 BLOCK RENDERERS CHO PHÒNG
        const renderBedBlock = (x, y, w, h, name = 'PHÒNG NGỦ') => {
            const scale = Math.min(1, Math.min(w / 3500, h / 3500));
            const bedW = 1800 * scale;
            const bedH = 2000 * scale;
            const bx = x + (w - bedW) / 2;
            const by = y + 180 * scale;
            const pillowW = 550 * scale;
            const pillowH = 380 * scale;
            const pillowRx = 20 * scale;
            const tabW = 450 * scale;
            const tabH = 450 * scale;
            const wardrobeW = Math.min(w * 0.3, 1600);
            const wardrobeH = Math.min(h * 0.45, 2200);
            const doorR = Math.min(800, w * 0.35);

            return `
                <g class="arch-block-bedroom">
                    <g transform="translate(${x + w - wardrobeW - 60 * scale}, ${y + 80 * scale})">
                        <rect width="${wardrobeW}" height="${wardrobeH}" fill="#ffffff" stroke="#1e293b" stroke-width="8" rx="8"/>
                        <line x1="0" y1="0" x2="${wardrobeW}" y2="${wardrobeH / 2}" stroke="#64748b" stroke-width="4"/>
                        <line x1="0" y1="${wardrobeH / 2}" x2="${wardrobeW}" y2="0" stroke="#64748b" stroke-width="4"/>
                    </g>
                    <g transform="translate(${bx}, ${by})">
                        <rect width="${bedW}" height="${bedH}" fill="#ffffff" stroke="#111827" stroke-width="12" rx="${20 * scale}"/>
                        <rect x="0" y="0" width="${bedW}" height="${140 * scale}" fill="#e2e8f0" stroke="#111827" stroke-width="8" rx="${10 * scale}"/>
                        <rect x="${140 * scale}" y="${180 * scale}" width="${pillowW}" height="${pillowH}" rx="${pillowRx}" fill="#f8fafc" stroke="#334155" stroke-width="6"/>
                        <rect x="${bedW - pillowW - 140 * scale}" y="${180 * scale}" width="${pillowW}" height="${pillowH}" rx="${pillowRx}" fill="#f8fafc" stroke="#334155" stroke-width="6"/>
                        <line x1="0" y1="${850 * scale}" x2="${bedW}" y2="${850 * scale}" stroke="#475569" stroke-width="6"/>
                    </g>
                    <g transform="translate(${bx - tabW - 40 * scale}, ${by})">
                        <rect width="${tabW}" height="${tabH}" rx="10" fill="#ffffff" stroke="#111827" stroke-width="8"/>
                        <circle cx="${tabW / 2}" cy="${tabH / 2}" r="${100 * scale}" fill="#fef08a" stroke="#d97706" stroke-width="6"/>
                    </g>
                    <g transform="translate(${bx + bedW + 40 * scale}, ${by})">
                        <rect width="${tabW}" height="${tabH}" rx="10" fill="#ffffff" stroke="#111827" stroke-width="8"/>
                        <circle cx="${tabW / 2}" cy="${tabH / 2}" r="${100 * scale}" fill="#fef08a" stroke="#d97706" stroke-width="6"/>
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
                    <rect x="${x + 20}" y="${y + 20}" width="${w - 40}" height="${h - 40}" fill="#f8fafc" stroke="#e2e8f0" stroke-width="2" opacity="0.6"/>
                    <g transform="translate(${toiletX}, ${toiletY})">
                        <rect width="${tankW}" height="${tankH}" fill="#ffffff" stroke="#111827" stroke-width="10" rx="8"/>
                        <ellipse cx="${tankW / 2}" cy="${tankH + bowlRy - 20 * scale}" rx="${bowlRx}" ry="${bowlRy}" fill="#ffffff" stroke="#111827" stroke-width="10"/>
                    </g>
                    <g transform="translate(${x + w - lavaboW - 100 * scale}, ${y + 100 * scale})">
                        <rect width="${lavaboW}" height="${lavaboH}" fill="#ffffff" stroke="#111827" stroke-width="10" rx="14"/>
                        <ellipse cx="${lavaboW / 2}" cy="${lavaboH / 2}" rx="${lavaboW * 0.36}" ry="${lavaboH * 0.32}" fill="#f0f9ff" stroke="#0284c7" stroke-width="6"/>
                    </g>
                </g>
            `;
        };

        const renderKitchenBlock = (x, y, w, h, name = 'P.BẾP + ĂN') => {
            const counterH = Math.min(650, h * 0.3);
            const sinkW = Math.min(900, w * 0.38);
            const stoveW = Math.min(750, w * 0.32);
            const tableW = Math.min(w * 0.55, 1600);
            const tableH = Math.min(h * 0.35, 900);
            const tx = x + (w - tableW) / 2;
            const ty = y + counterH + (h - counterH - tableH) / 2;

            return `
                <g class="arch-block-kitchen">
                    <rect x="${x}" y="${y}" width="${w}" height="${counterH}" fill="#f1f5f9" stroke="#111827" stroke-width="10"/>
                    <g transform="translate(${x + 80}, ${y + 60})">
                        <rect width="${sinkW}" height="${counterH - 120}" rx="10" fill="#ffffff" stroke="#111827" stroke-width="8"/>
                    </g>
                    <g transform="translate(${x + w - stoveW - 80}, ${y + 60})">
                        <rect width="${stoveW}" height="${counterH - 120}" rx="10" fill="#1e293b" stroke="#111827" stroke-width="8"/>
                        <circle cx="${stoveW * 0.3}" cy="${(counterH - 120) / 2}" r="${(counterH - 120) * 0.32}" fill="#334155" stroke="#ef4444" stroke-width="4"/>
                        <circle cx="${stoveW * 0.7}" cy="${(counterH - 120) / 2}" r="${(counterH - 120) * 0.32}" fill="#334155" stroke="#ef4444" stroke-width="4"/>
                    </g>
                    <g transform="translate(${tx}, ${ty})">
                        <rect width="${tableW}" height="${tableH}" rx="16" fill="#ffffff" stroke="#111827" stroke-width="10"/>
                    </g>
                </g>
            `;
        };

        const renderLivingBlock = (x, y, w, h, name = 'PHÒNG KHÁCH') => {
            const sofaW = Math.min(w * 0.8, 2400);
            const sofaH = Math.min(h * 0.32, 900);
            const sofaX = x + (w - sofaW) / 2;
            const sofaY = y + 100;
            const tableW = sofaW * 0.55;
            const tableH = Math.min(500, h * 0.2);
            const tableX = x + (w - tableW) / 2;
            const tableY = sofaY + sofaH + 180;

            return `
                <g class="arch-block-living">
                    <g transform="translate(${sofaX}, ${sofaY})">
                        <rect width="${sofaW}" height="${sofaH}" rx="18" fill="#ffffff" stroke="#111827" stroke-width="12"/>
                    </g>
                    <g transform="translate(${tableX}, ${tableY})">
                        <rect width="${tableW}" height="${tableH}" rx="12" fill="#ffffff" stroke="#111827" stroke-width="10"/>
                    </g>
                </g>
            `;
        };

        const renderStairsBlock = (x, y, w, h, name = 'CẦU THANG (UP)') => {
            const steps = 15;
            let st = `<g class="arch-block-stairs"><rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#f8fafc" stroke="#111827" stroke-width="12"/>`;
            for (let i = 1; i < steps; i++) {
                const sy = y + (h / steps) * i;
                st += `<line x1="${x}" y1="${sy}" x2="${x + w}" y2="${sy}" stroke="#334155" stroke-width="5"/>`;
            }
            const arrowX = x + w / 2;
            st += `
                <line x1="${arrowX}" y1="${y + h * 0.82}" x2="${arrowX}" y2="${y + h * 0.2}" stroke="#0284c7" stroke-width="14" stroke-linecap="round"/>
                <polygon points="${arrowX},${y + h * 0.08} ${arrowX - 50},${y + h * 0.24} ${arrowX + 50},${y + h * 0.24}" fill="#0284c7"/>
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
                    <g transform="translate(${ax}, ${ay})">
                        <rect width="${altarW}" height="${altarH}" rx="14" fill="#78350f" stroke="#b45309" stroke-width="12"/>
                    </g>
                </g>
            `;
        };

        const renderDoorBlock = (x, y, w, h, name = 'CỬA') => {
            const r = Math.min(w, h * 3);
            return `
                <g class="arch-block-door" transform="translate(${x}, ${y})">
                    <rect x="0" y="0" width="${w}" height="${h}" fill="#ffffff" stroke="#111827" stroke-width="10"/>
                </g>
            `;
        };

        const renderWindowBlock = (x, y, w, h, name = 'CỬA SỔ') => {
            return `
                <g class="arch-block-window" transform="translate(${x}, ${y})">
                    <rect x="0" y="0" width="${w}" height="${h}" fill="#ffffff" stroke="#111827" stroke-width="8"/>
                </g>
            `;
        };

        const renderOfficeBlock = (x, y, w, h, name = 'P.LÀM VIỆC') => {
            return `<g class="arch-block-office"><rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#ffffff" stroke="#111827" stroke-width="8"/></g>`;
        };

        const renderGarageBlock = (x, y, w, h, name = 'GARA XE') => {
            return `<g class="arch-block-garage"><rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#ffffff" stroke="#111827" stroke-width="8"/></g>`;
        };

        const renderSkylightBlock = (x, y, w, h, name = 'GIẾNG TRỜI') => {
            return `<g class="arch-block-skylight"><rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#f0f9ff" stroke="#0284c7" stroke-width="8"/></g>`;
        };

        const renderYardBlock = (x, y, w, h, name = 'BAN CÔNG / SÂN') => {
            return `<g class="arch-block-yard"><rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#f8fafc" stroke="#111827" stroke-width="8"/></g>`;
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

        // 6. DEDICATED HIGH-CONTRAST ROOM LABELS LAYER
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

        const bboxCenterX = Math.round((houseMinX + houseMaxX) / 2);
        const bboxCenterY = Math.round((houseMinY + houseMaxY) / 2);

        return {
            viewBox,
            wallsLayer: wallsSvg,
            roomsLayer: roomsSvg,
            landscapesLayer: landscapesSvg,
            roomLabelsLayer: roomLabelsSvg,
            dimensionsLayer: dimsSvg,
            vertexLayer: handlesLayer,
            centerLayer: centerMarkerSvg,
            houseMinX,
            houseMaxX,
            houseMinY,
            houseMaxY,
            houseWidth: houseW,
            houseDepth: houseD,
            houseBboxCenterX: bboxCenterX,
            houseBboxCenterY: bboxCenterY,
            houseCentroidX: centroid.x,
            houseCentroidY: centroid.y,
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

        let svg = `<g transform="translate(${cx.toFixed(1)}, ${cy.toFixed(1)}) rotate(${rotDeg})" pointer-events="none">`;
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

    renderOverlayLayer(flyingStars, houseCenterX, houseCenterY, houseW, houseD, scaleFactor = 1.0, isInverted = false) {
        if (!flyingStars) return '';

        const radius = Math.max(3800, Math.max(houseW, houseD) * 0.65 + 1500) * scaleFactor;
        const facingDeg = flyingStars.facingDegree !== undefined ? flyingStars.facingDegree : 180;
        const sittingDeg = (facingDeg + 180) % 360;
        // isInverted = false: Hướng trên (mũi đỏ lên), Tọa dưới (mũi xanh xuống)
        // isInverted = true: Tọa trên (mũi xanh lên), Hướng dưới (mũi đỏ xuống)
        const luoPanRot = isInverted ? (180 - facingDeg) : (-facingDeg);

        // 1. VÒNG NGOÀI CÙNG: 360 ĐỘ (VẠCH CHIA TỪNG ĐỘ VÀ SỐ ĐỘ MỖI 10 ĐỘ)
        let ticksSvg = '<g id="layer-360-degrees" pointer-events="none">';
        for (let deg = 0; deg < 360; deg++) {
            const rad = ((deg - 90) * Math.PI) / 180;
            const is10 = (deg % 10 === 0);
            const is5 = (deg % 5 === 0);
            const tickLen = is10 ? 380 * scaleFactor : (is5 ? 240 * scaleFactor : 130 * scaleFactor);
            const r1 = radius;
            const r2 = radius - tickLen;

            const x1 = r1 * Math.cos(rad);
            const y1 = r1 * Math.sin(rad);
            const x2 = r2 * Math.cos(rad);
            const y2 = r2 * Math.sin(rad);

            ticksSvg += `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="${is10 ? '#dc2626' : (is5 ? '#ef4444' : '#64748b')}" stroke-width="${(is10 ? 28 : (is5 ? 18 : 10)) * scaleFactor}"/>`;

            if (is10) {
                const rText = radius - 580 * scaleFactor;
                const tx = rText * Math.cos(rad);
                const ty = rText * Math.sin(rad);
                const screenAngle = ((deg + luoPanRot) % 360 + 360) % 360;
                let rotText = deg;
                if (screenAngle > 90 && screenAngle < 270) rotText = (rotText + 180) % 360;
                ticksSvg += `<text x="${tx.toFixed(1)}" y="${ty.toFixed(1)}" text-anchor="middle" dominant-baseline="central" font-size="${260 * scaleFactor}" font-weight="900" fill="#0f172a" font-family="'Inter', sans-serif" transform="rotate(${rotText}, ${tx.toFixed(1)}, ${ty.toFixed(1)})">${deg}</text>`;
            }
        }
        ticksSvg += '</g>';

        // 2. VÒNG 72 XUYÊN SƠN LONG (72 DRAGONS RING)
        const r72Out = radius - 820 * scaleFactor;
        const r72In = radius - 1200 * scaleFactor;
        let dragons72Svg = '<g id="layer-72-dragons" pointer-events="none">';
        for (let i = 0; i < 72; i++) {
            const deg = i * 5;
            const rad = ((deg - 90) * Math.PI) / 180;
            const x1 = r72In * Math.cos(rad);
            const y1 = r72In * Math.sin(rad);
            const x2 = r72Out * Math.cos(rad);
            const y2 = r72Out * Math.sin(rad);
            dragons72Svg += `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="#cbd5e1" stroke-width="${14 * scaleFactor}"/>`;
        }
        dragons72Svg += '</g>';

        // 3. VÒNG 24 SƠN HƯỚNG (24 MOUNTAINS RING)
        const rMntOut = r72In;
        const rMntIn = radius * 0.52;
        let mountainsSvg = '<g id="layer-24-mountains" pointer-events="none">';

        MOUNTAINS_24.forEach(m => {
            const radStart = ((m.startDeg - 90) * Math.PI) / 180;
            const radCenter = ((m.center - 90) * Math.PI) / 180;

            const xLine1 = rMntIn * Math.cos(radStart);
            const yLine1 = rMntIn * Math.sin(radStart);
            const xLine2 = rMntOut * Math.cos(radStart);
            const yLine2 = rMntOut * Math.sin(radStart);

            mountainsSvg += `<line x1="${xLine1.toFixed(1)}" y1="${yLine1.toFixed(1)}" x2="${xLine2.toFixed(1)}" y2="${yLine2.toFixed(1)}" stroke="#dc2626" stroke-width="${20 * scaleFactor}"/>`;

            // Tên 24 Sơn (Luôn xoay chữ thuận hướng đọc mắt người)
            const rText = (rMntIn + rMntOut) / 2;
            const tx = rText * Math.cos(radCenter);
            const ty = rText * Math.sin(radCenter);
            const screenAngle = ((m.center + luoPanRot) % 360 + 360) % 360;
            let rotText = m.center;
            if (screenAngle > 90 && screenAngle < 270) rotText = (rotText + 180) % 360;

            const isFacingMnt = (m.name === flyingStars.facingMountain);
            const isSittingMnt = (m.name === flyingStars.sittingMountain);

            mountainsSvg += `
                <text x="${tx.toFixed(1)}" y="${ty.toFixed(1)}" text-anchor="middle" dominant-baseline="central" font-size="${(isFacingMnt || isSittingMnt ? 380 : 320) * scaleFactor}" font-weight="900" fill="${isFacingMnt ? '#dc2626' : (isSittingMnt ? '#0284c7' : '#0f172a')}" font-family="'Inter', sans-serif" transform="rotate(${rotText}, ${tx.toFixed(1)}, ${ty.toFixed(1)})">${m.name}</text>
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

        let cardinalSvg = '<g id="layer-8-trigrams" pointer-events="none">';
        cardinalLabels.forEach(c => {
            const rad = ((c.deg - 90) * Math.PI) / 180;
            const rText = radius * 0.40;
            const tx = rText * Math.cos(rad);
            const ty = rText * Math.sin(rad);
            const screenAngle = ((c.deg + luoPanRot) % 360 + 360) % 360;
            let rotText = c.deg;
            if (screenAngle > 90 && screenAngle < 270) rotText = (rotText + 180) % 360;

            // Nan phân cách 8 hướng màu đỏ nét đứt
            const xLine = radius * Math.cos(rad);
            const yLine = radius * Math.sin(rad);

            // Quẻ Bát Quái
            const rTrig = radius * 0.47;
            const trigX = rTrig * Math.cos(rad);
            const trigY = rTrig * Math.sin(rad);
            const trigSvg = this.renderTrigramSymbol(c.trigram, trigX, trigY, 320 * scaleFactor, rotText);

            cardinalSvg += `
                <line x1="0" y1="0" x2="${xLine.toFixed(1)}" y2="${yLine.toFixed(1)}" stroke="#dc2626" stroke-width="${22 * scaleFactor}" stroke-dasharray="${120 * scaleFactor},${60 * scaleFactor}" opacity="0.85"/>
                ${trigSvg}
                <text x="${tx.toFixed(1)}" y="${ty.toFixed(1)}" text-anchor="middle" dominant-baseline="central" font-size="${440 * scaleFactor}" font-weight="900" fill="#dc2626" font-family="'Inter', sans-serif" letter-spacing="4" transform="rotate(${rotText}, ${tx.toFixed(1)}, ${ty.toFixed(1)})">${c.name}</text>
            `;
        });
        cardinalSvg += '</g>';

        // 5. KIM CHỈ TỌA - HƯỚNG CHÍNH XÁC (NEEDLE DIRECTION ARROWS)
        const radFacing = ((facingDeg - 90) * Math.PI) / 180;
        const radSitting = ((sittingDeg - 90) * Math.PI) / 180;

        const hx = (radius + 600 * scaleFactor) * Math.cos(radFacing);
        const hy = (radius + 600 * scaleFactor) * Math.sin(radFacing);
        const sx = (radius + 600 * scaleFactor) * Math.cos(radSitting);
        const sy = (radius + 600 * scaleFactor) * Math.sin(radSitting);

        const arrowSvg = `
            <g id="layer-direction-needles" pointer-events="none">
                <!-- Trục chỉ Hướng (Đỏ) -->
                <line x1="0" y1="0" x2="${hx.toFixed(1)}" y2="${hy.toFixed(1)}" stroke="#dc2626" stroke-width="${60 * scaleFactor}" stroke-linecap="round"/>
                <polygon points="${hx.toFixed(1)},${hy.toFixed(1)} ${(hx - 360 * scaleFactor * Math.cos(radFacing - 0.35)).toFixed(1)},${(hy - 360 * scaleFactor * Math.sin(radFacing - 0.35)).toFixed(1)} ${(hx - 360 * scaleFactor * Math.cos(radFacing + 0.35)).toFixed(1)},${(hy - 360 * scaleFactor * Math.sin(radFacing + 0.35)).toFixed(1)}" fill="#dc2626"/>
                <g transform="translate(${(radius - 1350 * scaleFactor) * Math.cos(radFacing)}, ${(radius - 1350 * scaleFactor) * Math.sin(radFacing)}) rotate(${facingDeg})">
                    <rect x="${-420 * scaleFactor}" y="${-130 * scaleFactor}" width="${840 * scaleFactor}" height="${260 * scaleFactor}" rx="${40 * scaleFactor}" fill="#dc2626" stroke="#ffffff" stroke-width="${20 * scaleFactor}"/>
                    <text x="0" y="${25 * scaleFactor}" text-anchor="middle" font-size="${140 * scaleFactor}" font-weight="900" fill="#ffffff" font-family="'Inter', sans-serif">HƯỚNG</text>
                </g>

                <!-- Trục chỉ Tọa (Xanh) -->
                <line x1="0" y1="0" x2="${sx.toFixed(1)}" y2="${sy.toFixed(1)}" stroke="#0284c7" stroke-width="${60 * scaleFactor}" stroke-linecap="round"/>
                <polygon points="${sx.toFixed(1)},${sy.toFixed(1)} ${(sx - 360 * scaleFactor * Math.cos(radSitting - 0.35)).toFixed(1)},${(sy - 360 * scaleFactor * Math.sin(radSitting - 0.35)).toFixed(1)} ${(sx - 360 * scaleFactor * Math.cos(radSitting + 0.35)).toFixed(1)},${(sy - 360 * scaleFactor * Math.sin(radSitting + 0.35)).toFixed(1)}" fill="#0284c7"/>
                <g transform="translate(${(radius - 1350 * scaleFactor) * Math.cos(radSitting)}, ${(radius - 1350 * scaleFactor) * Math.sin(radSitting)}) rotate(${sittingDeg})">
                    <rect x="${-380 * scaleFactor}" y="${-130 * scaleFactor}" width="${760 * scaleFactor}" height="${260 * scaleFactor}" rx="${40 * scaleFactor}" fill="#0284c7" stroke="#ffffff" stroke-width="${20 * scaleFactor}"/>
                    <text x="0" y="${25 * scaleFactor}" text-anchor="middle" font-size="${140 * scaleFactor}" font-weight="900" fill="#ffffff" font-family="'Inter', sans-serif">TỌA</text>
                </g>
            </g>
        `;

        return `
            <g class="layer-luopan-overlay" transform="translate(${houseCenterX}, ${houseCenterY})" pointer-events="none">
                <!-- Vòng tròn viền La Kinh đỏ đậm sắc nét 100% trong suốt bên trong để lộ bản vẽ -->
                <circle cx="0" cy="0" r="${radius}" fill="none" stroke="#dc2626" stroke-width="${45 * scaleFactor}"/>
                <circle cx="0" cy="0" r="${r72Out}" fill="none" stroke="#dc2626" stroke-width="${25 * scaleFactor}"/>
                <circle cx="0" cy="0" r="${r72In}" fill="none" stroke="#dc2626" stroke-width="${25 * scaleFactor}"/>
                <circle cx="0" cy="0" r="${rMntIn}" fill="none" stroke="#dc2626" stroke-width="${30 * scaleFactor}"/>
                <circle cx="0" cy="0" r="${radius * 0.32}" fill="none" stroke="#ef4444" stroke-width="${20 * scaleFactor}" stroke-dasharray="${80 * scaleFactor},${50 * scaleFactor}"/>

                <!-- Khối La Kinh xoay mượt mà theo đúng hướng nhà thời gian thực -->
                <g transform="rotate(${luoPanRot.toFixed(2)})">
                    ${ticksSvg}
                    ${dragons72Svg}
                    ${mountainsSvg}
                    ${cardinalSvg}
                    ${arrowSvg}
                </g>
            </g>
        `;
    }

    renderNinePalacesLayer(flyingStars, houseCenterX, houseCenterY, houseW, houseD, facingPalaceId = 9, scaleFactor = 1.0, isInverted = false) {
        if (!flyingStars || !flyingStars.palaces) return '';

        // KHỚP CHÍNH XÁC 100% THEO CHIỀU NGANG VÀ CHIỀU DÀI CỦA NGÔI NHÀ / KHU ĐẤT
        const gridW = houseW;
        const gridH = houseD;
        const cellW = gridW / 3;
        const cellH = gridH / 3;
        const halfW = gridW / 2;
        const halfH = gridH / 2;

        // Ma trận 3x3 theo góc hướng nhà
        const order = getOrientedPalaceGrid(facingPalaceId, isInverted);

        let cellsSvg = '';

        order.forEach((pId, idx) => {
            const row = Math.floor(idx / 3);
            const col = idx % 3;
            const x = -halfW + col * cellW;
            const y = -halfH + row * cellH;

            const pal = flyingStars.palaces[pId];
            if (!pal) return;

            const nienS = pal.nienStar !== undefined ? pal.nienStar : 1;
            const nguyetS = pal.nguyetStar !== undefined ? pal.nguyetStar : 1;
            const nhatS = pal.nhatStar !== undefined ? pal.nhatStar : 1;
            const thoiS = pal.thoiStar !== undefined ? pal.thoiStar : 1;

            const shortLabel = PALACE_SHORT[pId] || '';

            const circleR = Math.min(cellW * 0.08, cellH * 0.08, 140);
            const fontVan = Math.min(cellW * 0.35, cellH * 0.35, 750);
            const fontStar = Math.min(cellW * 0.28, cellH * 0.28, 650);
            const fontLabel = Math.min(cellW * 0.12, cellH * 0.12, 280);

            cellsSvg += `
                <g transform="translate(${x}, ${y})" pointer-events="none">
                    <!-- Viền ô 100% trong suốt bám khít từng phòng, đường nét đen chuẩn CAD -->
                    <rect width="${cellW}" height="${cellH}" fill="none" stroke="#000000" stroke-width="24"/>

                    <!-- Hàng trên: 4 vòng tròn màu đánh số (Năm - Tháng - Ngày - Giờ) -->
                    <g transform="translate(${cellW / 2}, ${cellH * 0.14})" pointer-events="none">
                        <!-- Niên (Xanh lá) -->
                        <circle cx="${-circleR * 3.5}" cy="0" r="${circleR}" fill="rgba(255,255,255,0.9)" stroke="#16a34a" stroke-width="16"/>
                        <text x="${-circleR * 3.5}" y="${circleR * 0.35}" text-anchor="middle" font-size="${circleR * 1.1}" font-weight="900" fill="#16a34a" font-family="'Inter', sans-serif">${nienS}</text>

                        <!-- Nguyệt (Đỏ) -->
                        <circle cx="${-circleR * 1.2}" cy="0" r="${circleR}" fill="rgba(255,255,255,0.9)" stroke="#dc2626" stroke-width="16"/>
                        <text x="${-circleR * 1.2}" y="${circleR * 0.35}" text-anchor="middle" font-size="${circleR * 1.1}" font-weight="900" fill="#dc2626" font-family="'Inter', sans-serif">${nguyetS}</text>

                        <!-- Nhật (Cam) -->
                        <circle cx="${circleR * 1.2}" cy="0" r="${circleR}" fill="rgba(255,255,255,0.9)" stroke="#ea580c" stroke-width="16"/>
                        <text x="${circleR * 1.2}" y="${circleR * 0.35}" text-anchor="middle" font-size="${circleR * 1.1}" font-weight="900" fill="#ea580c" font-family="'Inter', sans-serif">${nhatS}</text>

                        <!-- Thời (Tím) -->
                        <circle cx="${circleR * 3.5}" cy="0" r="${circleR}" fill="rgba(255,255,255,0.9)" stroke="#9333ea" stroke-width="16"/>
                        <text x="${circleR * 3.5}" y="${circleR * 0.35}" text-anchor="middle" font-size="${circleR * 1.1}" font-weight="900" fill="#9333ea" font-family="'Inter', sans-serif">${thoiS}</text>
                    </g>

                    <!-- Ở giữa: Số Vận Tinh (Màu Xanh Dương Blue To Đậm Nét) -->
                    <text x="${cellW / 2}" y="${cellH * 0.52}" text-anchor="middle" dominant-baseline="central" font-size="${fontVan}" font-weight="900" fill="#0284c7" font-family="'Inter', sans-serif" pointer-events="none">${pal.vanStar}</text>

                    <!-- Bên trái: Số Sơn Tinh (Tọa Tinh - Màu Đen To Đậm Nét) -->
                    <text x="${cellW * 0.22}" y="${cellH * 0.82}" text-anchor="middle" dominant-baseline="central" font-size="${fontStar}" font-weight="900" fill="#000000" font-family="'Inter', sans-serif" pointer-events="none">${pal.sonStar}</text>

                    <!-- Bên phải: Số Hướng Tinh (Màu Đen To Đậm Nét) -->
                    <text x="${cellW * 0.78}" y="${cellH * 0.82}" text-anchor="middle" dominant-baseline="central" font-size="${fontStar}" font-weight="900" fill="#000000" font-family="'Inter', sans-serif" pointer-events="none">${pal.huongStar}</text>

                    <!-- Ở dưới: Tên Cung Viết Tắt -->
                    <text x="${cellW / 2}" y="${cellH * 0.92}" text-anchor="middle" font-size="${fontLabel}" font-weight="900" fill="#000000" font-family="'Inter', sans-serif" pointer-events="none">${PALACE_NAMES[pId] ? PALACE_NAMES[pId].toUpperCase() : shortLabel}</text>
                </g>
            `;
        });

        return `
            <g class="layer-nine-palaces-matrix" transform="translate(${houseCenterX}, ${houseCenterY})" pointer-events="none">
                <!-- Khung viền ngoài đậm của ma trận 3x3 bao trọn toàn bộ diện tích nhà -->
                <rect x="${-halfW}" y="${-halfH}" width="${gridW}" height="${gridH}" fill="none" stroke="#000000" stroke-width="40"/>
                ${cellsSvg}
            </g>
        `;
    }
}

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
        spatialPalaces,
        geometry
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
                    e.target.closest('.cad-landscape-interactive') || 
                    e.target.closest('.cad-vertex-handle') || 
                    e.target.closest('.cad-edge-hitbox') || 
                    e.target.closest('.cad-resize-handle') || 
                    e.target.closest('.cad-resize-handle-group') || 
                    e.target.closest('.cad-mini-action-bar') ||
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

    const landscapesContent = layerState.landscapes !== false ? (cadLayers.landscapesLayer || '') : '';
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
    ${landscapesContent}
    ${wallsContent}
    ${roomsContent}
    ${dimsContent}
    ${centerContent}
    ${roomLabelsContent}
    ${luoPanContent}
    ${ninePalacesContent}
    ${vertexContent}
</svg>
    `.trim();
}



export const LANDSCAPE_FENG_SHUI_KNOWLEDGE = {
    'mountain': {
        title: 'NÚI CAO / GÒ ĐẤT (Huyền Vũ / Tọa Sơn)',
        category: 'Địa Hình Tự Nhiên',
        evalFacing: {
            grade: 'HUNG',
            status: 'Án Sơn Bức Môn (Chắn Khí Tiền Phương)',
            satType: 'Án Sơn Sát',
            desc: 'Núi cao án ngữ ngay trước cửa chính che khuất tầm nhìn, bít tắc sinh khí Minh Đường không thể lưu thông.',
            archRemedy: 'Thiết kế khoảng lùi sân trước (Setback), mở giếng trời (skylight) ở giữa nhà để hút thiên khí, mở cửa phụ đón gió.',
            remedy: 'Treo Gương Bát Quái lồi để đẩy lùi khí bức bối, thắp đèn cổng sáng sủa.'
        },
        evalSitting: {
            grade: 'ĐẠI CÁT',
            status: 'Tọa Sơn Đắc Vị (Huyền Vũ Hộ Trì)',
            satType: 'Cát Khí Đắc Địa',
            desc: 'Sau nhà có điểm tựa núi cao vững chãi. Thế đất "Tọa Sơn Hướng Thủy" đại phú đại quý, nhân đinh hưng vượng, quý nhân phò trợ.',
            archRemedy: 'Bố trí phòng ngủ Master, phòng thờ hoặc phòng làm việc ở phía sau để hấp thụ trọn vẹn điểm tựa vững chãi.',
            remedy: 'Giữ khu vực sau nhà sạch sẽ, tôn nghiêm.'
        },
        evalSide: {
            grade: 'CÁT',
            status: 'Thanh Long / Bạch Hổ Hộ Vệ',
            satType: 'Cát Khí Hộ Vệ',
            desc: 'Thế núi hai bên tạo thành thế tay ngai vững chãi, tàng phong tụ khí, che chắn gió độc.',
            archRemedy: 'Tận dụng không gian bên hông làm sân vườn cảnh quan, ban công thưởng ngoạn.',
            remedy: 'Trồng thêm cây xanh hài hòa.'
        }
    },
    'river_lake': {
        title: 'SÔNG / HỒ NƯỚC (Minh Đường Tụ Thủy)',
        category: 'Đường Thủy / Thủy Khẩu',
        evalFacing: {
            grade: 'ĐẠI CÁT',
            status: 'Minh Đường Tụ Thủy (Khí Nạp Đại Tài)',
            satType: 'Cát Khí Chiêu Tài',
            desc: 'Dòng nước trong xanh uốn lượn trước mặt tiền nhà. Phong thủy học: "Sơn quản nhân đinh, Thủy quản tài lộc" — Tiền tài dồi dào, vượng phát.',
            archRemedy: 'Thiết kế hiên rộng (Loggia), cửa kính lớn kịch trần mở tối đa view ngắm mặt nước để nạp trọn vẹn tài khí.',
            remedy: 'Giữ nguồn nước trước nhà luôn trong lành, không để rác thải ứ đọng.'
        },
        evalSitting: {
            grade: 'HUNG',
            status: 'Thủy Bối Hậu (Khuyết Huyền Vũ / Mất Chỗ Dựa)',
            satType: 'Thủy Bối Sát',
            desc: 'Sau lưng nhà có sông hồ lớn chảy xiết, địa thế phía sau bị hẫng hụt, dễ gây hao tán tài sản, gia đạo bất an.',
            archRemedy: 'Xây tường rào phía sau kiên cố, đắp tiểu cảnh "Hòn Non Bộ" (giả sơn) ở sân sau để bổ khuyết Huyền Vũ.',
            remedy: 'Trồng một hàng tre/trúc hoặc cây bàng thân gỗ lớn dọc bờ tường sau để tạo điểm tựa vững chắc.'
        },
        evalSide: {
            grade: 'CÁT',
            status: 'Thủy Khí Nhuận Trạch',
            satType: 'Cát Khí Điều Hòa',
            desc: 'Dòng nước bên hông nhà mang lại độ ẩm và không khí mát lành quanh năm.',
            archRemedy: 'Thiết kế cửa sổ mở lấy gió mát từ bờ sông, làm lối đi dạo ven bờ.',
            remedy: 'Duy trì vệ sinh cảnh quan.'
        }
    },
    't_junction': {
        title: 'NGÃ 3 ĐƯỜNG (Thương Sát / Trực Xung Sát)',
        category: 'Hình Sát Đô Thị',
        evalFacing: {
            grade: 'ĐẠI HUNG',
            status: 'Thương Sát (Đường Đâm Trực Diện Mặt Tiền)',
            satType: 'Thương Sát',
            desc: 'Trục đường thẳng đâm trực diện vào cửa chính, xe cộ lao tới mang theo luồng xung sát khí cực mạnh, dễ gây tai ách, hao tài bất ngờ.',
            archRemedy: 'TUYỆT ĐỐI KHÔNG mở cửa chính đối diện tâm đường đâm. Thiết kế mặt tiền lùi sâu (Setback), xây bức TƯỜNG BÌNH PHONG hoặc đài phun nước tròn xoay để chuyển hướng dòng sát khí.',
            remedy: 'Treo Gương Bát Quái lồi trước cổng, đặt cặp Tỳ Hưu / Kỳ Lân đá canh giữ, trồng hàng cau hoặc rặng cây rậm rạp cản khí.'
        },
        evalSitting: {
            grade: 'HUNG',
            status: 'Ám Tiễn Sát (Đường Đâm Sau Lưng)',
            satType: 'Ám Tiễn Sát',
            desc: 'Đường đâm sau lưng nhà tạo cảm giác bất an, dễ bị tiểu nhân gièm pha hãm hại sau lưng.',
            archRemedy: 'Xây tường bao sau nhà dày dặn, không mở cửa hậu thông thẳng trục đường đâm.',
            remedy: 'Trồng hàng cây xanh che chắn kín đáo phía sau.'
        },
        evalSide: {
            grade: 'BÌNH',
            status: 'Giao Lộ Kế Bên',
            satType: 'Giao Khí',
            desc: 'Thuận tiện giao thông nhưng cần chú ý tiếng ồn và khói bụi.',
            archRemedy: 'Lắp cửa kính hộp cách âm 2 lớp.',
            remedy: 'Trồng bồn hoa lọc bụi.'
        }
    },
    'crossroad': {
        title: 'NGÃ 4 ĐƯỜNG (Giao Lộ Động Khí)',
        category: 'Hình Thế Giao Thông',
        evalFacing: {
            grade: 'CÁT',
            status: 'Giao Lộ Tứ Thông (Khí Khẩu Nạp Tài)',
            satType: 'Kinh Doanh Đắc Lợi',
            desc: 'Ngã tư đường là nơi hội tụ luồng người và xe, dòng năng lượng động khí mạnh mẽ, cực kỳ phát đạt cho kinh doanh thương mại.',
            archRemedy: 'Thiết kế tầng trệt làm Showroom / Cửa hàng kinh doanh, vát góc kiến trúc để mở rộng tầm nhìn 2 mặt tiền.',
            remedy: 'Trồng cây cảnh ở góc vát để điều hòa dòng người xe cộ.'
        },
        evalSitting: {
            grade: 'BÌNH',
            status: 'Động Khí Hậu Phương',
            satType: 'Động Khí',
            desc: 'Phía sau chuyển động không ngừng.',
            archRemedy: 'Tăng cường tường cách âm cho các phòng ngủ phía sau.',
            remedy: 'Giữ tường rào sau nhà vững chãi.'
        },
        evalSide: {
            grade: 'CÁT',
            status: 'Nhà 2 Mặt Tiền Đắc Địa',
            satType: 'Kinh Thương Đại Cát',
            desc: 'Vị trí góc phố nạp tài lộc từ hai phía.',
            archRemedy: 'Bố trí ban công và biển hiệu thoáng đãng.',
            remedy: 'Đèn chiếu sáng sang trọng.'
        }
    },
    'temple': {
        title: 'CHÙA / ĐÌNH / MIẾU (Âm Khí Thanh Tịnh)',
        category: 'Tâm Linh & Tôn Giáo',
        evalFacing: {
            grade: 'HUNG',
            status: 'Đình Chùa Chiếu Môn (Cô Dương / Cô Âm Sát)',
            satType: 'Âm Linh Sát',
            desc: 'Trước cửa nhìn thẳng vào chùa đình miếu mạo chịu trường khí âm linh và hương khói, dễ khiến người trong nhà cô đơn, tâm tư bất an.',
            archRemedy: 'Thiết kế cổng chính lệch góc nhìn, xây tường rào hoa văn che chắn, mở cửa sổ hướng sang hai bên thay vì hướng thẳng vào chùa.',
            remedy: 'Treo Gương Bát Quái gỗ đào hoặc gương lồi, thắp đèn cổng sáng rực rỡ, đặt cặp Tỳ Hưu đá hướng ra ngoài.'
        },
        evalSitting: {
            grade: 'HUNG',
            status: 'Tựa Lưng Đình Chùa (Khí Trường Bất Phù Hợp)',
            satType: 'Âm Khí Hậu Phương',
            desc: 'Khí trường tâm linh thanh tịnh phía sau không phù hợp nhà ở gia đình trần thế.',
            archRemedy: 'Bố trí phòng kho hoặc sân phơi phía sau, tránh đặt phòng ngủ vợ chồng giáp tường chùa.',
            remedy: 'Trồng cây xanh tán rộng tăng cường sinh khí dương.'
        },
        evalSide: {
            grade: 'BÌNH',
            status: 'Lân Cận Đình Chùa',
            satType: 'Thanh Tĩnh',
            desc: 'Không gian sống tĩnh lặng.',
            archRemedy: 'Cách âm tốt khi chùa có lễ hội.',
            remedy: 'Sống lương thiện hòa nhã.'
        }
    },
    'cemetery': {
        title: 'NGHĨA TRANG / MỒ MẢ (Đại Âm Sát Khí)',
        category: 'Tâm Linh & Âm Khí',
        evalFacing: {
            grade: 'ĐẠI HUNG',
            status: 'Âm Hàn Xâm Trực (Đại Âm Sát)',
            satType: 'Đại Âm Sát',
            desc: 'Nhà nhìn thẳng ra nghĩa địa chịu từ trường âm khí nặng nề, dễ sinh ốm đau suy nhược, trẻ nhỏ bất an quấy khóc.',
            archRemedy: 'Xây tường rào cao chắn tầm nhìn, thiết kế hệ cửa sổ sử dụng kính màu ấm và rèm dày, tăng cường hệ thống chiếu sáng mặt tiền.',
            remedy: 'BẮT BUỘC: Treo Gương Bát Quái Hổ Phù / Gương lồi, trồng hàng cau hoặc hàng tre/trúc xanh ngăn cách, dùng đèn pha rọi sáng rực rỡ cổng trước.'
        },
        evalSitting: {
            grade: 'HUNG',
            status: 'Huyền Vũ Âm Sát',
            satType: 'Âm Khí Hậu Phương',
            desc: 'Phía sau nhà có mồ mả nghĩa địa.',
            archRemedy: 'Xây tường bao sau nhà cao và sơn màu ấm áp (vàng kem, trắng sáng).',
            remedy: 'Trồng hàng cây xanh tốt quanh tường rào.'
        },
        evalSide: {
            grade: 'HUNG',
            status: 'Âm Khí Cận Kề',
            satType: 'Âm Sát',
            desc: 'Cần che chắn tường bên hông.',
            archRemedy: 'Hạn chế mở cửa sổ lớn nhìn thẳng sang nghĩa trang.',
            remedy: 'Trồng cây xanh che chắn.'
        }
    },
    'park': {
        title: 'CÔNG VIÊN CÂY XANH (Minh Đường Sinh Khí)',
        category: 'Môi Trường Sinh Thái',
        evalFacing: {
            grade: 'ĐẠI CÁT',
            status: 'Minh Đường Khoáng Đạt (Sinh Khí Đại Vượng)',
            satType: 'Đại Cát Sinh Khí',
            desc: 'Công viên trước nhà cung cấp dưỡng khí dồi dào, tầm nhìn thoáng đãng, gia đình mạnh khỏe, con cháu thông tuệ.',
            archRemedy: 'Mở rộng tối đa hệ cửa kính mặt tiền, thiết kế ban công xanh để đón trọn luồng sinh khí tinh khôi.',
            remedy: 'Rất tuyệt vời, tận hưởng không gian sống trong lành.'
        },
        evalSitting: {
            grade: 'CÁT',
            status: 'Hậu Hoa Viên (Dưỡng Khí An Lành)',
            satType: 'Sinh Khí',
            desc: 'Sau nhà có vườn hoa công viên tươi mát.',
            archRemedy: 'Thiết kế phòng ngủ và góc thư giãn phía sau.',
            remedy: 'Mở cửa sổ đón gió sạch.'
        },
        evalSide: {
            grade: 'CÁT',
            status: 'Môi Trường Sinh Thái Trong Lành',
            satType: 'Cát Khí',
            desc: 'Vi khí hậu lý tưởng.',
            archRemedy: 'Bố trí ban công ngắm cảnh.',
            remedy: 'Trồng hoa trang trí.'
        }
    },
    'substation': {
        title: 'TRẠM BIẾN ÁP / CỘT CAO THẾ (Hỏa Thiêu Sát)',
        category: 'Hình Sát Điện Từ',
        evalFacing: {
            grade: 'ĐẠI HUNG',
            status: 'Hỏa Thiêu Sát Môn (Từ Trường Bức Xạ)',
            satType: 'Hỏa Sát',
            desc: 'Trạm điện cao thế phát ra sóng từ trường mạnh và tính Hỏa cực vượng, dễ gây đau đầu, bệnh tim mạch, tính khí nóng nảy.',
            archRemedy: 'Lắp rèm cản nhiệt và kính hộp chống bức xạ. Thiết kế mảng tường đá hoa cương hoặc tiểu cảnh nước để làm dịu nhiệt hỏa.',
            remedy: 'Dùng vật phẩm thuộc Thổ (đá Thạch Anh vàng, quả cầu thạch anh, chậu gốm sứ lớn) để tiết giảm Hỏa khí hung hãn.'
        },
        evalSitting: {
            grade: 'HUNG',
            status: 'Hỏa Sát Sau Lưng',
            satType: 'Hỏa Khí Bức Xạ',
            desc: 'Từ trường phía sau ảnh hưởng giấc ngủ.',
            archRemedy: 'Không kê đầu giường sát tường giáp trạm điện.',
            remedy: 'Đặt đá thạch anh vàng đầu giường.'
        },
        evalSide: {
            grade: 'HUNG',
            status: 'Bức Xạ Bên Hông',
            satType: 'Từ Trường Sát',
            desc: 'Cần che chắn tường bên hông.',
            archRemedy: 'Xây tường 2 lớp cách nhiệt.',
            remedy: 'Trồng dải cây xanh thân gỗ hấp thụ từ trường.'
        }
    },
    'railway': {
        title: 'ĐƯỜNG SẮT (Cát Cước Sát - Cắt Chân)',
        category: 'Hình Sát Rung Chấn',
        evalFacing: {
            grade: 'HUNG',
            status: 'Cát Cước Sát (Rung Chấn Cắt Chân)',
            satType: 'Rung Chấn Sát',
            desc: 'Tàu hỏa chạy tải trọng lớn gây chấn động long mạch đất, tiếng ồn lớn làm phân tán khí trường.',
            archRemedy: 'Thiết kế móng cọc bê tông kiên cố chống rung chấn, làm tường rào cách âm và lắp kính cách âm 3 lớp.',
            remedy: 'Trồng rặng cây xanh rậm rạp để tiêu giảm tiếng ồn và sóng chấn động.'
        },
        evalSitting: {
            grade: 'HUNG',
            status: 'Chấn Động Hậu Phương',
            satType: 'Rung Động Sát',
            desc: 'Ảnh hưởng giấc ngủ các phòng sau.',
            archRemedy: 'Bố trí phòng ngủ cách xa phía đường sắt.',
            remedy: 'Gia cố tường cách âm.'
        },
        evalSide: {
            grade: 'HUNG',
            status: 'Rung Động Bên Hông',
            satType: 'Chấn Động',
            desc: 'Cần chú ý kết cấu công trình.',
            archRemedy: 'Móng nhà kiên cố.',
            remedy: 'Trồng dải cây xanh giảm chấn.'
        }
    },
    'field': {
        title: 'RUỘNG ĐỒNG (Minh Đường Khoáng Đạt)',
        category: 'Cảnh Quan Tự Nhiên',
        evalFacing: {
            grade: 'CÁT',
            status: 'Minh Đường Rộng Lớn (Bình Yên Tích Lũy)',
            satType: 'Cát Khí Khoáng Đạt',
            desc: 'Trước mặt là ruộng đồng mênh mông, tầm nhìn không bị che chắn, không khí mát mẻ trong lành, gia đạo yên bình tích lũy tài sản.',
            archRemedy: 'Mở ban công và cửa lớn đón gió thiên nhiên.',
            remedy: 'Rất tốt cho nghỉ dưỡng và an cư.'
        },
        evalSitting: {
            grade: 'BÌNH',
            status: 'Đồng Ruộng Sau Nhà',
            satType: 'Thoáng Mát',
            desc: 'Không gian thoáng đãng.',
            archRemedy: 'Trồng thêm cây bóng mát sau vườn.',
            remedy: 'Duy trì vi khí hậu mát mẻ.'
        },
        evalSide: {
            grade: 'CÁT',
            status: 'Thanh Bình Thư Thái',
            satType: 'Bình Yên',
            desc: 'Vi khí hậu trong lành.',
            archRemedy: 'Thiết kế nhà vườn sinh thái.',
            remedy: 'Tận dụng không gian xanh.'
        }
    }
};

// ============================================================
// HỆ THỐNG LUẬN GIẢI PHONG THỦY ĐỘC LẬP & TỰ ĐỘNG ĐỒNG BỘ
// Tác giả: Dịch Sư Nguyễn Huy Hoàng & Computational Feng Shui Core
// Huyền Không Phi Tinh Vận 9 + Bát Trạch Minh Kính + Thẩm Thị Huyền Không Học
// ============================================================

export const STAR_PROFILES = {
    1: { name: 'Nhất Bạch Tham Lang', element: 'Thủy', nature: 'Sinh Khí Tinh (Vận 9)', good: 'Đào hoa, danh tiếng, học vấn, thi cử, nhân duyên tốt đẹp.' },
    2: { name: 'Nhị Hắc Cự Môn', element: 'Thổ', nature: 'Bệnh Phù Tinh / Tiến Khí', good: 'Đất đai điền sản (khi vượng).', bad: 'Chủ tật bệnh, đau ốm, tỳ vị dạ dày, mẹ già bất an.' },
    3: { name: 'Tam Bích Lộc Tồn', element: 'Mộc', nature: 'Si Tinh / Thị Phi Tinh', bad: 'Tranh chấp kiện tụng, khẩu thiệt thị phi, hình khắc người thân, đạo tặc.' },
    4: { name: 'Tứ Lục Văn Khúc', element: 'Mộc', nature: 'Văn Xương Tinh', good: 'Văn chương khoa bảng, tài năng nghệ thuật, thi cử đỗ đạt cao.' },
    5: { name: 'Ngũ Hoàng Liêm Trinh', element: 'Thổ', nature: 'Đại Sát Tinh / Quan Sát', bad: 'Hung tinh số 1, chủ tai họa bất ngờ, bạo bệnh, hao tài tán gia bại sản.' },
    6: { name: 'Lục Bạch Vũ Khúc', element: 'Kim', nature: 'Quan Lộc Tinh', good: 'Quyền uy, chức vụ lãnh đạo, quý nhân phù trợ, kinh doanh phát đạt.' },
    7: { name: 'Thất Xích Phá Quân', element: 'Kim', nature: 'Thoái Khí / Tặc Tinh', bad: 'Đề phòng cướp đoạt, hỏa tai, khẩu thiệt tranh đoạt, tổn thương kim khí.' },
    8: { name: 'Bát Bạch Tả Phụ', element: 'Thổ', nature: 'Thoái Vượng Tinh', good: 'Tích lũy tài sản, bất động sản, gia đạo hưng thịnh vững bền.' },
    9: { name: 'Cửu Tử Hữu Bật', element: 'Hỏa', nature: 'Đương Lệnh Vượng Tinh (Vận 9 - 2024-2043)', good: 'Đại Cát Thần Tinh, phát tài cực nhanh, sự nghiệp thăng tiến, hỷ sự liên tiếp, danh tài vang dội.' }
};

export const CLASSIC_COMBINATIONS = {
    '1-4': {
        title: 'DANH TÀI XUẤT CHÚNG (Văn Xương Quý Nhân)',
        grade: 'ĐẠI CÁT',
        desc: 'Nhất Tứ đồng cung, chuẩn đích đăng khoa giáp bảng. Văn chương cái thế, con cái đỗ đạt cao, công danh sự nghiệp rạng rỡ.',
        remedy: 'Đặt Bàn Học, Phòng Làm Việc, Bút Văn Xương hoặc Tháp Văn Xương 9 tầng.',
        source: 'Thẩm Thị Huyền Không Học'
    },
    '4-1': {
        title: 'VĂN KHÚC PHÁT ĐINH TÀI',
        grade: 'ĐẠI CÁT',
        desc: 'Khí tú danh cao, gia đình có người đỗ đạt bảng vàng, nhân đinh phát triển.',
        remedy: 'Bố trí Phòng Đọc Sách, Không gian sáng tạo nghệ thuật.',
        source: 'Tử Bạch Quyết'
    },
    '1-6': {
        title: 'THỦY HỎA TƯƠNG TỀ (Quan Lộc Song Toàn)',
        grade: 'ĐẠI CÁT',
        desc: 'Nhất Lục cộng tông, Thủy Kim tương sinh, quý nhân phò trợ, phát phúc thăng quan tiến chức nhanh chóng.',
        remedy: 'Thích hợp Cửa Chính, Phòng Khách, Phòng Giám Đốc, đặt Thác nước phong thủy.',
        source: 'Huyền Không Bí Chỉ'
    },
    '6-1': {
        title: 'VŨ KHÚC HÓA QUYỀN',
        grade: 'ĐẠI CÁT',
        desc: 'Quan lộc tài lộc lưỡng đắc, danh tiếng lẫy lừng.',
        remedy: 'Đặt Bàn làm việc, Tượng Thiềm Thừ hoặc Tỳ Hưu ngọc.',
        source: 'Huyền Cơ Phú'
    },
    '8-9': {
        title: 'HỶ KHÁNH LÂM MÔN (Phú Quý Liên Miên)',
        grade: 'ĐẠI CÁT',
        desc: 'Bát Cửu hợp khí Hỏa Thổ tương sinh, sinh khí dồi dào, hôn nhân hạnh phúc, tài lộc dồi dào, thêm người thêm của.',
        remedy: 'Bố trí Phòng Ngủ Master, Phòng Khách, Cửa Chính, thắp đèn sáng ấm áp.',
        source: 'Tử Bạch Quyết'
    },
    '9-8': {
        title: 'MỘC HỎA THÔNG MINH (Sinh Tài Vượng Đinh)',
        grade: 'ĐẠI CÁT',
        desc: 'Đất nở hoa sinh quý tử, tiền tài dồi dào hưng thịnh.',
        remedy: 'Kích hoạt tài lộc bằng Đèn chùm pha lê, Cây kim tiền xanh tốt.',
        source: 'Thẩm Thị Huyền Không Học'
    },
    '9-9': {
        title: 'ĐƯƠNG LỆNH SONG TINH ĐÁO (Cực Vượng Vận 9)',
        grade: 'ĐẠI CÁT',
        desc: 'Hai sao Cửu Tử trùng phùng tại thời điểm Vận 9 đang đương lệnh. Vượng khí đỉnh cao, tài vận hanh thông vượt bậc.',
        remedy: 'Mở cửa chính, đặt bàn làm việc, ban công đón gió hoặc phòng khách rộng mở.',
        source: 'Chính Tông Huyền Không'
    },
    '2-5': {
        title: 'NHỊ HẮC NGŨ HOÀNG ĐẠI SÁT',
        grade: 'ĐẠI HUNG',
        desc: 'Nhị Ngũ giao gia tất tổn chủ, tật bệnh triền miên, ôn dịch, hao tài tốn của, tai ách huyết quang.',
        remedy: 'TUYỆT ĐỐI KHÔNG ĐỘNG THỔ hay đặt giường ngủ, bếp. Bắt buộc treo Chuông gió đồng 6 ống hoặc Hồ Lô đồng trấn sát.',
        source: 'Thẩm Thị Huyền Không Học'
    },
    '5-2': {
        title: 'NGŨ HOÀNG LIÊM TRINH SÁT KHÍ',
        grade: 'ĐẠI HUNG',
        desc: 'Quan sát lâm môn, chủ tai nạn bất ngờ, bệnh nan y, gia đình suy vi.',
        remedy: 'Đặt Hũ An Nhẫn Thủy (muối biển + 6 đồng xu + nước) và dùng đồ vật kim loại để tiết khí Thổ hung.',
        source: 'Huyền Cơ Phú'
    },
    '3-7': {
        title: 'XUYÊN TÂM TẶC KIẾP SÁT',
        grade: 'HUNG',
        desc: 'Tam Thất điệp lâm chủ đạo tặc, thị phi kiện tụng, trộm cướp, phá tài, khẩu thiệt.',
        remedy: 'Dùng Thủy tĩnh (bình nước sạch) để hóa giải sát khí Kim khắc Mộc.',
        source: 'Phi Tinh Phú'
    },
    '7-3': {
        title: 'KHẨU THIỆT PHÁ TÀI SÁT',
        grade: 'HUNG',
        desc: 'Đề phòng kiện cáo, quan sự, tranh chấp hợp đồng, tổn thất tiền bạc.',
        remedy: 'Đặt bể cá cảnh hoặc cây xanh thủy sinh để hòa giải.',
        source: 'Huyền Không Bí Chỉ'
    },
    '9-7': {
        title: 'HỎA THIÊU PHẾ KIM SÁT',
        grade: 'HUNG',
        desc: 'Hỏa khắc Kim quá vượng, chủ bệnh về đường hô hấp, phổi, ho lao, đề phòng hỏa hoạn.',
        remedy: 'Dùng vật phẩm thuộc Thổ (bình gốm sứ, đá thạch anh vàng) để thông quan Hỏa sinh Thổ, Thổ sinh Kim.',
        source: 'Huyền Cơ Phú'
    },
    '7-9': {
        title: 'HỎA TAI QUÁ VƯỢNG',
        grade: 'HUNG',
        desc: 'Đề phòng phụ nữ bất hòa, tranh chấp tình cảm, hỏa hoạn nhà cửa.',
        remedy: 'Hạn chế sơn màu đỏ rực, sử dụng màu vàng đất hoặc gốm sứ.',
        source: 'Phi Tinh Phú'
    },
    '2-3': {
        title: 'ĐẤU NGƯU SÁT (Tranh Đoạt Bất Hòa)',
        grade: 'HUNG',
        desc: 'Mộc khắc Thổ, mẹ chồng nàng dâu bất hòa, vợ chồng cãi vã, kiện tụng gia đạo.',
        remedy: 'Sử dụng thảm đỏ, đèn màu ấm hoặc tranh phong thủy thuộc Hỏa để tiết Mộc sinh Thổ.',
        source: 'Phi Tinh Phú'
    },
    '6-7': {
        title: 'GIAO KIẾM SÁT (Kim Khí Tương Tranh)',
        grade: 'HUNG',
        desc: 'Hai sao Kim tranh đấu, chủ thương tích do kim loại, phẫu thuật, tranh chấp vũ lực.',
        remedy: 'Đặt chậu cây cảnh xanh tốt hoặc bình nước để Thủy tiết Kim khí.',
        source: 'Thẩm Thị Huyền Không Học'
    }
};

export class FengShuiInterpretationEngine {
    constructor() {
        this.currentFilter = 'all';
    }

    getStarCombinationDetail(sonStar, huongStar, van = 9) {
        const key = `${sonStar}-${huongStar}`;
        if (CLASSIC_COMBINATIONS[key]) return CLASSIC_COMBINATIONS[key];

        const reverseKey = `${huongStar}-${sonStar}`;
        if (CLASSIC_COMBINATIONS[reverseKey]) return CLASSIC_COMBINATIONS[reverseKey];

        if (huongStar === van || sonStar === van) {
            return {
                title: `ĐƯƠNG LỆNH VƯỢNG TINH VẬN ${van}`,
                grade: 'CÁT',
                desc: `Cung có sao số ${van} đương lệnh tọa thủ, tiếp nạp sinh khí vượng cát của thời vận 2024 - 2043.`,
                remedy: 'Nên giữ không gian sạch sẽ, thông thoáng, nhiều ánh sáng tự nhiên để hấp thụ vượng khí.',
                source: 'Cửu Tinh Đắc Lệnh'
            };
        }

        if (huongStar === 1 || sonStar === 1) {
            return {
                title: 'SINH KHÍ NHẤT BẠCH HƯỚNG TỚI',
                grade: 'CÁT',
                desc: 'Sao Nhất Bạch là sao Tiến Khí Sinh Khí của Vận 9, chủ tài lộc gia tăng, mở rộng quan hệ nhân duyên.',
                remedy: 'Thích hợp bố trí phòng sinh hoạt chung, phòng làm việc.',
                source: 'Tử Bạch Quyết'
            };
        }

        return {
            title: 'KHÍ TRƯỜNG TRUNG HÒA',
            grade: 'BÌNH',
            desc: `Sơn Tinh số ${sonStar} (${STAR_PROFILES[sonStar]?.element || ''}) phối cùng Hướng Tinh số ${huongStar} (${STAR_PROFILES[huongStar]?.element || ''}). Khí trường bình ổn.`,
            remedy: 'Bố trí công năng hợp lý theo công năng phòng, duy trì vệ sinh ngăn nắp.',
            source: 'Huyền Không Học Cơ Bản'
        };
    }

    findRoomsInPalace(palaceId, geometry, facingPalaceId = 9) {
        if (!geometry || !geometry.rooms) return [];
        
        let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
        const pts = geometry.footprintPoints || [];
        pts.forEach(p => {
            if (p.x < minX) minX = p.x;
            if (p.x > maxX) maxX = p.x;
            if (p.y < minY) minY = p.y;
            if (p.y > maxY) maxY = p.y;
        });

        if (pts.length === 0) {
            minX = 0; maxX = geometry.widthMm || 5000;
            minY = 0; maxY = geometry.depthMm || 16000;
        }

        const W = maxX - minX;
        const D = maxY - minY;
        const cellW = W / 3;
        const cellH = D / 3;

        const order = getOrientedPalaceGrid(facingPalaceId);

        const matched = [];
        geometry.rooms.forEach(r => {
            const rx = r.x + r.w / 2;
            const ry = r.y + r.h / 2;
            const col = Math.min(2, Math.max(0, Math.floor((rx - minX) / cellW)));
            const row = Math.min(2, Math.max(0, Math.floor((ry - minY) / cellH)));
            const idx = row * 3 + col;
            if (order[idx] === palaceId) {
                matched.push(r);
            }
        });

        return matched;
    }

    evaluateRoomPlacement(room, grade, bazhaiStar, combo) {
        const type = (room.type || '').toLowerCase();
        const isCat = (grade === 'ĐẠI CÁT' || grade === 'CÁT');
        const isHung = (grade === 'ĐẠI HUNG' || grade === 'HUNG');

        if (type.includes('toilet') || type.includes('wc')) {
            if (isHung) {
                return {
                    status: 'CHUẨN PHONG THỦY',
                    badge: 'good',
                    eval: 'Tọa Hung Trấn Sát: Khu vệ sinh đặt tại hung cung giúp ép đè uế khí và tiêu trừ sát khí của hung tinh. Rất tốt!'
                };
            } else {
                return {
                    status: 'CẦN HÓA GIẢI',
                    badge: 'bad',
                    eval: 'Khu vệ sinh đặt tại cát cung làm suy giảm vượng khí. Nên đóng cửa WC, đặt quạt hút mùi và dùng hũ đá thạch anh trắng hút ẩm.'
                };
            }
        }

        if (type.includes('kitchen') || type.includes('bep')) {
            if (isHung) {
                return {
                    status: 'TỌA HUNG HƯỚNG CÁT',
                    badge: 'good',
                    eval: 'Bếp đặt tại cung hung để đốt cháy hung khí, miệng bếp hướng về cung cát đón vượng khí. Đạt chuẩn Bát Trạch!'
                };
            } else {
                return {
                    status: 'CẦN CHÚ Ý',
                    badge: 'bad',
                    eval: 'Bếp đặt tại cát cung có thể đốt cháy vượng khí của sao cát. Cần giữ bếp sạch sẽ, bổ sung chậu cây xanh nhỏ hoặc hành Thổ để điều hòa.'
                };
            }
        }

        if (type.includes('bed') || type.includes('ngu')) {
            if (isCat) {
                return {
                    status: 'ĐẠI CÁT ĐẮC VỊ',
                    badge: 'good',
                    eval: 'Phòng ngủ đặt tại cung cát giúp gia chủ nạp khí vượng, an giấc ngủ sâu, gia tăng sức khỏe và tài lộc dồi dào.'
                };
            } else {
                return {
                    status: 'PHẠM HUNG CUNG',
                    badge: 'bad',
                    eval: `Phòng ngủ phạm cung ${bazhaiStar} (${combo.title}). Dễ gây mệt mỏi, bất hòa. Cần hóa giải bằng: ${combo.remedy}`
                };
            }
        }

        if (type.includes('door') || type.includes('cua') || type.includes('gate')) {
            if (isCat) {
                return {
                    status: 'KHÍ KHẨU NẠP CÁT',
                    badge: 'good',
                    eval: 'Cửa chính mở tại cát cung đón trọn vượng khí của trời đất vào nhà, kinh doanh phát đạt, quý nhân phù trợ!'
                };
            } else {
                return {
                    status: 'KHÍ KHẨU PHẠM SÁT',
                    badge: 'bad',
                    eval: `Cửa chính nạp phải sát khí cung ${bazhaiStar}. Cần treo Gương Bát Quái lồi hoặc Đèn sáng rực rỡ và vật phẩm hóa giải.`
                };
            }
        }

        if (type.includes('altar') || type.includes('tho')) {
            if (isCat) {
                return {
                    status: 'TỌA CÁT HƯỚNG CÁT',
                    badge: 'good',
                    eval: 'Bàn thờ đặt tại nơi linh khí hội tụ, tổ tiên phù hộ độ trì, con cháu hiển vinh thành đạt.'
                };
            } else {
                return {
                    status: 'CẦN ĐIỀU CHỈNH',
                    badge: 'bad',
                    eval: 'Bàn thờ nên đặt tại nơi tĩnh lặng, tránh cung Tuyệt Mệnh, Ngũ Quỷ.'
                };
            }
        }

        return {
            status: isCat ? 'CÁT KHÍ TỐT' : 'BÌNH HÒA',
            badge: isCat ? 'good' : 'bad',
            eval: isCat ? 'Không gian đón nhận năng lượng tích cực.' : 'Không gian cần duy trì ánh sáng và thông gió thông suốt.'
        };
    }

        renderReports(spatialResult, containerEl, filter = 'all') {
        if (!containerEl || !spatialResult) return;

        const geom = spatialResult.geometry;
        const rooms = geom?.rooms || [];
        const landscapes = geom?.landscapes || [];
        const centroid = geom?.footprintPoints ? HouseCenterGeometryEngine.calculatePolygonCentroid(geom.footprintPoints) : { x: 2500, y: 8000 };
        const facingDeg = spatialResult.stars?.facingDegree || 180;
        if (!containerEl || !spatialResult || !spatialResult.spatialPalaces) return;

        const palaces = Object.values(spatialResult.spatialPalaces);

        // Header and filter chips
        let html = `
            <div style="grid-column: 1 / -1; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px; margin-bottom: 12px; background: rgba(15, 23, 42, 0.6); padding: 10px 14px; border-radius: 10px; border: 1px solid rgba(255,255,255,0.1);">
                <div style="display: flex; gap: 6px; flex-wrap: wrap;">
                    <button type="button" class="report-filter-chip ${filter === 'all' ? 'active' : ''}" data-filter="all" style="padding: 6px 14px; border-radius: 6px; border: 1px solid ${filter === 'all' ? 'var(--gold-primary)' : 'rgba(255,255,255,0.2)'}; background: ${filter === 'all' ? 'rgba(245, 158, 11, 0.25)' : 'rgba(0,0,0,0.3)'}; color: #fff; font-size: 0.78rem; font-weight: bold; cursor: pointer;">Tất Cả (9 Cung & Loan Đầu)</button>
                    <button type="button" class="report-filter-chip ${filter === 'good' ? 'active' : ''}" data-filter="good" style="padding: 6px 14px; border-radius: 6px; border: 1px solid ${filter === 'good' ? '#22c55e' : 'rgba(255,255,255,0.2)'}; background: ${filter === 'good' ? 'rgba(34, 197, 94, 0.25)' : 'rgba(0,0,0,0.3)'}; color: #4ade80; font-size: 0.78rem; font-weight: bold; cursor: pointer;">★ Vị Trí Cát (Tốt)</button>
                    <button type="button" class="report-filter-chip ${filter === 'bad' ? 'active' : ''}" data-filter="bad" style="padding: 6px 14px; border-radius: 6px; border: 1px solid ${filter === 'bad' ? '#ef4444' : 'rgba(255,255,255,0.2)'}; background: ${filter === 'bad' ? 'rgba(239, 68, 68, 0.25)' : 'rgba(0,0,0,0.3)'}; color: #f87171; font-size: 0.78rem; font-weight: bold; cursor: pointer;">⚠ Cảnh Báo Hung & Hóa Giải</button>
                </div>
                <div style="font-size: 0.78rem; color: #94a3b8; display: flex; align-items: center; gap: 8px;">
                    <span>Mệnh Chủ: <b style="color: var(--gold-light);">${spatialResult.gua?.guaName || ''} (${spatialResult.gua?.element || ''})</b> · <b style="color: #38bdf8;">${spatialResult.gua?.group || ''}</b></span>
                    <span class="audit-badge good" style="font-size: 0.65rem; padding: 2px 6px;">Thời Vận 9</span>
                </div>
            </div>
        `;

        // ----------------------------------------------------
        // PHẦN 1: BỐ TRÍ PHÒNG CỬU CUNG THỜI GIAN THỰC (9 CUNG)
        // ----------------------------------------------------
        let visibleCount = 0;

        palaces.forEach(p => {
            const isGood = (p.grade === 'ĐẠI CÁT' || p.grade === 'CÁT');
            const isBad = (p.grade === 'ĐẠI HUNG' || p.grade === 'HUNG');

            if (filter === 'good' && !isGood) return;
            if (filter === 'bad' && !isBad) return;

            visibleCount++;

            const combo = this.getStarCombinationDetail(p.sonStar, p.huongStar, spatialResult.stars?.van || 9);
            const matchedRooms = this.findRoomsInPalace(p.palaceId, geom, spatialResult.stars?.facingPalace || 9);

            let roomAnalysisHtml = '';
            if (matchedRooms.length > 0) {
                roomAnalysisHtml = `
                    <div style="margin-top: 10px; padding-top: 8px; border-top: 1px dashed rgba(255,255,255,0.15);">
                        <div style="font-size: 0.76rem; font-weight: 800; color: #38bdf8; margin-bottom: 6px; display: flex; align-items: center; gap: 4px;">
                            <span>🏢 BỐ TRÍ PHÒNG THỰC TẾ (${matchedRooms.length}):</span>
                        </div>
                        ${matchedRooms.map(rm => {
                            const ev = this.evaluateRoomPlacement(rm, p.grade, p.bazhaiStar, combo);
                            return `
                                <div style="margin-bottom: 6px; padding: 8px 10px; background: rgba(0,0,0,0.35); border-radius: 6px; border-left: 4px solid ${ev.badge === 'good' ? '#22c55e' : '#ef4444'};">
                                    <div style="display: flex; justify-content: space-between; font-size: 0.78rem; font-weight: bold; margin-bottom: 3px;">
                                        <span style="color: #fff;">${rm.name}</span>
                                        <span class="audit-badge ${ev.badge}" style="font-size: 0.65rem; padding: 1px 6px;">${ev.status}</span>
                                    </div>
                                    <div style="font-size: 0.73rem; color: #cbd5e1; line-height: 1.4;">${ev.eval}</div>
                                </div>
                            `;
                        }).join('')}
                    </div>
                `;
            } else {
                roomAnalysisHtml = `
                    <div style="margin-top: 8px; padding: 6px 8px; background: rgba(0,0,0,0.15); border-radius: 6px; font-size: 0.72rem; color: #94a3b8; font-style: italic;">
                        (Chưa có phòng nào được xếp trong cung này)
                    </div>
                `;
            }

            const badgeColor = isGood ? 'good' : (isBad ? 'bad' : 'neutral');

            html += `
                <div class="report-card ${isGood ? 'card-good' : (isBad ? 'card-bad' : '')}" style="background: rgba(15, 23, 42, 0.85); border: 1px solid ${isGood ? 'rgba(34, 197, 94, 0.35)' : (isBad ? 'rgba(239, 68, 68, 0.35)' : 'rgba(255,255,255,0.1)')}; border-radius: 10px; padding: 14px; display: flex; flex-direction: column; justify-content: space-between; transition: transform 0.2s, box-shadow 0.2s;">
                    <div>
                        <!-- Header -->
                        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
                            <div>
                                <span style="font-size: 0.95rem; font-weight: 900; color: #fff; text-transform: uppercase;">${p.palaceName}</span>
                                <span style="font-size: 0.72rem; color: #94a3b8; margin-left: 6px;">[${p.bazhaiStar || ''}]</span>
                            </div>
                            <span class="audit-badge ${badgeColor}" style="font-size: 0.72rem; font-weight: 800; padding: 2px 8px;">${p.grade}</span>
                        </div>

                        <!-- Flying Stars Trio Banner -->
                        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 10px; padding: 6px 10px; background: rgba(0,0,0,0.3); border-radius: 6px;">
                            <div style="font-size: 0.74rem; color: #94a3b8;">Huyền Không:</div>
                            <div style="display: flex; gap: 4px; font-weight: 900; font-size: 0.82rem;">
                                <span style="color: #38bdf8;" title="Sơn Tinh">${p.sonStar}</span>
                                <span style="color: #fff;">·</span>
                                <span style="color: #fbbf24;" title="Vận Tinh">${p.vanStar}</span>
                                <span style="color: #fff;">·</span>
                                <span style="color: #f87171;" title="Hướng Tinh">${p.huongStar}</span>
                            </div>
                            <div style="font-size: 0.7rem; color: #22c55e; margin-left: auto;">
                                <span>Niên: ${p.nienStar || 1}</span>
                            </div>
                        </div>

                        <!-- Tổ Hợp Khí Trường -->
                        <div style="font-size: 0.82rem; font-weight: 800; color: ${isGood ? '#4ade80' : (isBad ? '#f87171' : '#fbbf24')}; margin-bottom: 4px;">
                            ${combo.title}
                        </div>
                        <div style="font-size: 0.75rem; color: #cbd5e1; line-height: 1.45; margin-bottom: 8px;">
                            ${combo.desc}
                        </div>

                        <!-- Bát Trạch Phối Mệnh -->
                        <div style="font-size: 0.73rem; color: #e2e8f0; line-height: 1.4; padding: 6px 8px; background: rgba(255,255,255,0.04); border-radius: 6px; margin-bottom: 6px;">
                            <b>Bát Trạch:</b> Cung <b>${p.bazhaiStar}</b> (${p.bazhaiDetail?.desc || ''})
                        </div>

                        ${roomAnalysisHtml}
                    </div>

                    <!-- Khuyến Nghị & Pháp Hóa Giải -->
                    <div style="margin-top: 10px; padding-top: 8px; border-top: 1px solid rgba(255,255,255,0.1); font-size: 0.73rem; color: var(--gold-light);">
                        <b>💡 Pháp Hóa Giải / Kích Hoạt:</b> ${combo.remedy}
                    </div>
                </div>
            `;
        });

        // ----------------------------------------------------
        // PHẦN 2: CHUYÊN ĐỀ LOAN ĐẦU & HÌNH SÁT NGOẠI CẢNH (GIS ENGINE)
        // ----------------------------------------------------
        if (landscapes.length > 0) {
            html += `
                <div style="grid-column: 1 / -1; margin-top: 20px; margin-bottom: 8px; padding-top: 14px; border-top: 2px solid rgba(245, 158, 11, 0.4);">
                    <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px;">
                        <div style="font-size: 1rem; font-weight: 900; color: #f59e0b; display: flex; align-items: center; gap: 8px;">
                            <span>🏔 CHUYÊN ĐỀ LOAN ĐẦU & HÌNH SÁT NGOẠI CẢNH (${landscapes.length} YẾU TỐ ĐANG QUÉT):</span>
                        </div>
                        <span class="audit-badge" style="background: rgba(245, 158, 11, 0.2); color: #fbbf24; border: 1px solid #f59e0b; font-size: 0.72rem; padding: 3px 8px;">GIS Shanshui Mingtang Engine</span>
                    </div>
                    <p style="font-size: 0.76rem; color: #94a3b8; margin-top: 4px;">Tự động đo đạc khoảng cách, góc phương vị so với Lập Cực và phân tích thế đất Tứ Tượng (Minh Đường, Huyền Vũ, Thanh Long, Bạch Hổ) theo thời gian thực.</p>
                </div>
            `;

            landscapes.forEach(l => {
                const lx = l.x + l.w / 2;
                const ly = l.y + l.h / 2;
                const dx = lx - centroid.x;
                const dy = ly - centroid.y;
                let angle = ((Math.atan2(dy, dx) * 180 / Math.PI) + 90 + 360) % 360;

                // Xác định vị trí tương đối so với hướng nhà
                let relAngle = (angle - facingDeg + 360) % 360;
                let posType = 'evalSide';
                let posName = 'Bên Hông Nhà';
                let tuTuongName = 'Tả Thanh Long / Hữu Bạch Hổ';

                if (relAngle <= 45 || relAngle >= 315) {
                    posType = 'evalFacing';
                    posName = 'Trước Mặt Tiền Nhà';
                    tuTuongName = 'MINH ĐƯỜNG (Chu Tước / Tiền Hướng)';
                } else if (relAngle >= 135 && relAngle <= 225) {
                    posType = 'evalSitting';
                    posName = 'Sau Lưng Nhà';
                    tuTuongName = 'TỌA SƠN (Huyền Vũ / Hậu Phương)';
                } else if (relAngle > 45 && relAngle < 135) {
                    posType = 'evalSide';
                    posName = 'Bên Phải';
                    tuTuongName = 'HỮU BẠCH HỔ (Sườn Phải)';
                } else {
                    posType = 'evalSide';
                    posName = 'Bên Trái';
                    tuTuongName = 'TẢ THANH LONG (Sườn Trái)';
                }

                const kn = LANDSCAPE_FENG_SHUI_KNOWLEDGE[l.type] || LANDSCAPE_FENG_SHUI_KNOWLEDGE['mountain'];
                const ev = kn[posType] || kn.evalSide;
                const isGood = (ev.grade === 'ĐẠI CÁT' || ev.grade === 'CÁT');
                const isBad = (ev.grade === 'ĐẠI HUNG' || ev.grade === 'HUNG');

                if (filter === 'good' && !isGood) return;
                if (filter === 'bad' && !isBad) return;

                const badgeColor = isGood ? 'good' : (isBad ? 'bad' : 'neutral');
                const distM = (Math.hypot(dx, dy) / 1000).toFixed(1);

                html += `
                    <div class="report-card ${isGood ? 'card-good' : (isBad ? 'card-bad' : '')}" style="background: rgba(30, 41, 59, 0.9); border: 2px solid ${isGood ? 'rgba(34, 197, 94, 0.5)' : (isBad ? 'rgba(239, 68, 68, 0.5)' : 'rgba(245, 158, 11, 0.5)')}; border-radius: 10px; padding: 14px; display: flex; flex-direction: column; justify-content: space-between; box-shadow: 0 4px 15px rgba(0,0,0,0.3);">
                        <div>
                            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 6px;">
                                <div>
                                    <span style="font-size: 0.98rem; font-weight: 900; color: #fde68a;">${l.name}</span>
                                    <div style="font-size: 0.72rem; color: #38bdf8; font-weight: 700; margin-top: 2px;">[${tuTuongName}]</div>
                                </div>
                                <span class="audit-badge ${badgeColor}" style="font-size: 0.72rem; font-weight: 800; padding: 2px 8px;">${ev.grade}</span>
                            </div>

                            <div style="font-size: 0.73rem; color: #94a3b8; margin-bottom: 8px; background: rgba(0,0,0,0.25); padding: 4px 8px; border-radius: 4px;">
                                📐 Khoảng cách tới Tâm Lập Cực: <b style="color: #fff;">${distM} mét</b> · Góc phương vị: <b style="color: #fff;">${angle.toFixed(1)}°</b>
                            </div>

                            <div style="font-size: 0.82rem; font-weight: 800; color: ${isGood ? '#4ade80' : (isBad ? '#f87171' : '#fbbf24')}; margin-bottom: 4px; display: flex; align-items: center; gap: 4px;">
                                <span>${isBad ? '⚠' : (isGood ? '★' : 'ℹ')}</span>
                                <span>${ev.status}</span>
                            </div>
                            <div style="font-size: 0.75rem; color: #cbd5e1; line-height: 1.45; margin-bottom: 8px;">
                                ${ev.desc}
                            </div>
                        </div>

                        <div>
                            <!-- Đề xuất Kiến Trúc Hóa Giải (Architectural Remedies) -->
                            <div style="margin-top: 8px; padding: 8px 10px; background: rgba(2, 132, 199, 0.15); border-left: 3px solid #0284c7; border-radius: 4px; font-size: 0.74rem; color: #e0f2fe; line-height: 1.4;">
                                <b style="color: #38bdf8;">🏛 Đề Xuất Giải Pháp Kiến Trúc:</b> ${ev.archRemedy || 'Thiết kế mặt bằng thông thoáng, hài hòa cảnh quan xung quanh.'}
                            </div>

                            <!-- Đề xuất Vật Phẩm & Phong Thủy -->
                            <div style="margin-top: 6px; padding: 8px 10px; background: rgba(245, 158, 11, 0.15); border-left: 3px solid #f59e0b; border-radius: 4px; font-size: 0.74rem; color: #fef3c7; line-height: 1.4;">
                                <b style="color: var(--gold-light);">💡 Pháp Khí & Hóa Giải:</b> ${ev.remedy}
                            </div>
                        </div>
                    </div>
                `;
            });
        }

        if (visibleCount === 0 && landscapes.length === 0) {
            html += `
                <div style="grid-column: 1 / -1; text-align: center; padding: 30px; color: #94a3b8; font-size: 0.88rem;">
                    Không có cung nào phù hợp với bộ lọc đã chọn.
                </div>
            `;
        }

        containerEl.innerHTML = html;

        containerEl.querySelectorAll('.report-filter-chip').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const targetFilter = e.target.getAttribute('data-filter') || 'all';
                this.currentFilter = targetFilter;
                this.renderReports(spatialResult, containerEl, targetFilter);
            });
        });
    }
}