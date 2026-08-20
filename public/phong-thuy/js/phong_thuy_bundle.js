// ============================================================
// PHONG THỦY & ARCHITECTURAL CAD FULL ENGINE BUNDLE v4.0
// Tác giả: Dịch Sư Nguyễn Huy Hoàng & Computational Geometry Core
// Hỗ trợ: Đa dạng Footprint (Rectangle, L-Shape, U-Shape, Stepped, Polygon),
// La Kinh Chuẩn 360° / 24 Sơn / 72 Long / 8 Quái, Bản Vẽ CAD Siêu Chi Tiết
// ============================================================

// ------------------------------------------------------------
// 1. DATA LAYER (24 Sơn, 60 Long, 72 Phân Khu, Bát Quái)
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

// 72 Phân Khu / 72 Long (mỗi sơn 15° chia làm 3 phân khu 5°)
export const SEVENTY_TWO_SECTORS = [];
for (let i = 0; i < 72; i++) {
    const centerDeg = i * 5;
    const startDeg = (centerDeg - 2.5 + 360) % 360;
    const endDeg = (centerDeg + 2.5) % 360;
    const mntIdx = Math.floor((i + 1.5) / 3) % 24;
    const mntName = MOUNTAINS_24[mntIdx]?.name || 'Tý';
    SEVENTY_TWO_SECTORS.push({
        id: i + 1,
        index72: i,
        name: `${mntName}-${(i % 3) + 1}`,
        mountainName: mntName,
        centerDeg,
        startDeg,
        endDeg
    });
}

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

export const FLYING_PATH = [5, 6, 7, 8, 9, 1, 2, 3, 4];

// ------------------------------------------------------------
// 2. TOÁN HỌC TỌA ĐỘ CỰC & LA BÀN GPU
// ------------------------------------------------------------
export function polarToCartesian(cx, cy, r, deg) {
    const rad = ((deg - 90) * Math.PI) / 180;
    return {
        x: parseFloat((cx + r * Math.cos(rad)).toFixed(2)),
        y: parseFloat((cy + r * Math.sin(rad)).toFixed(2))
    };
}

export function generateCompassPaths(data, innerR, outerR, cx = 250, cy = 250) {
    let lines = [];
    let labels = [];

    data.forEach((item) => {
        const p1 = polarToCartesian(cx, cy, innerR, item.startDeg);
        const p2 = polarToCartesian(cx, cy, outerR, item.startDeg);
        lines.push(`M ${p1.x} ${p1.y} L ${p2.x} ${p2.y}`);

        let midDeg = item.midDeg !== undefined ? item.midDeg : (item.startDeg + item.endDeg) / 2;
        if (item.startDeg > item.endDeg && item.midDeg === undefined) {
            midDeg = ((item.startDeg + item.endDeg + 360) / 2) % 360;
        }

        const textR = innerR + (outerR - innerR) / 2;
        const tp = polarToCartesian(cx, cy, textR, midDeg);

        let textRot = parseFloat(midDeg.toFixed(2));
        if (midDeg > 90 && midDeg < 270) {
            textRot = (textRot + 180) % 360;
        }

        labels.push({
            id: item.id || item.name,
            text: item.name || item.canChi,
            x: tp.x,
            y: tp.y,
            rotation: textRot,
            element: item.hanh || 'Kim'
        });
    });

    return {
        pathD: lines.join(' '),
        labels
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

export function bspSpacePartition(W, D) {
    const isWide = W >= D;
    const rooms = [];
    const corridors = [];

    if (!isWide) {
        const frontD = Math.round(D * 0.35);
        const midD = Math.round(D * 0.28);
        const rearD = D - frontD - midD;

        corridors.push({
            id: 'spine_corridor',
            x: Math.round(W * 0.35),
            y: frontD,
            width: Math.round(W * 0.3),
            height: midD
        });

        rooms.push({ id: 'r_living', name: 'PHÒNG KHÁCH', x: 0, y: 0, w: W, h: frontD, grade: 'ĐẠI CÁT' });
        rooms.push({ id: 'r_stairs', name: 'CẦU THANG & GIẾNG TRỜI', x: 0, y: frontD, w: Math.round(W * 0.5), h: midD, grade: 'BÌNH HÒA' });
        rooms.push({ id: 'r_dining', name: 'BẾP & PHÒNG ĂN', x: 0, y: frontD + midD, w: Math.round(W * 0.65), h: rearD, grade: 'CÁT' });
        rooms.push({ id: 'r_wc', name: 'VỆ SINH (WC)', x: Math.round(W * 0.65), y: frontD + midD, w: W - Math.round(W * 0.65), h: rearD, grade: 'HUNG' });
    } else {
        const leftW = Math.round(W * 0.32);
        const midW = Math.round(W * 0.36);
        const rightW = W - leftW - midW;
        const frontD = Math.round(D * 0.55);
        const rearD = D - frontD;

        rooms.push({ id: 'r_living', name: 'PHÒNG KHÁCH', x: leftW, y: 0, w: midW, h: frontD, grade: 'ĐẠI CÁT' });
        rooms.push({ id: 'r_altar', name: 'PHÒNG THỜ GIA TIÊN', x: 0, y: 0, w: leftW, h: frontD, grade: 'ĐẠI CÁT' });
        rooms.push({ id: 'r_dining', name: 'BẾP & PHÒNG ĂN', x: leftW + midW, y: 0, w: rightW, h: frontD, grade: 'CÁT' });
        rooms.push({ id: 'r_bed1', name: 'PHÒNG NGỦ 1', x: 0, y: frontD, w: leftW, h: rearD, grade: 'CÁT' });
        rooms.push({ id: 'r_kitchen', name: 'KHÔNG GIAN NẤU', x: leftW, y: frontD, w: midW, h: rearD, grade: 'BÌNH HÒA' });
        rooms.push({ id: 'r_wc', name: 'PHÒNG TẮM & WC', x: leftW + midW, y: frontD, w: rightW, h: rearD, grade: 'HUNG' });
    }

    return {
        widthMm: W,
        depthMm: D,
        rooms,
        corridors
    };
}

export function areaM2(rect) {
    const w = rect.width !== undefined ? rect.width : rect.w;
    const h = rect.height !== undefined ? rect.height : rect.h;
    return (w * h) / 1000000;
}

export function centerOfRect(rect) {
    const w = rect.width !== undefined ? rect.width : rect.w;
    const h = rect.height !== undefined ? rect.height : rect.h;
    return {
        x: rect.x + w / 2,
        y: rect.y + h / 2
    };
}

export function overlaps(r1, r2) {
    const w1 = r1.width !== undefined ? r1.width : r1.w;
    const h1 = r1.height !== undefined ? r1.height : r1.h;
    const w2 = r2.width !== undefined ? r2.width : r2.w;
    const h2 = r2.height !== undefined ? r2.height : r2.h;
    return !(
        r1.x + w1 <= r2.x ||
        r2.x + w2 <= r1.x ||
        r1.y + h1 <= r2.y ||
        r2.y + h2 <= r1.y
    );
}

export function inside(child, parent, tolerance = 0) {
    const cw = child.width !== undefined ? child.width : child.w;
    const ch = child.height !== undefined ? child.height : child.h;
    const pw = parent.width !== undefined ? parent.width : parent.w;
    const ph = parent.height !== undefined ? parent.height : parent.h;
    return (
        child.x >= parent.x - tolerance &&
        child.y >= parent.y - tolerance &&
        child.x + cw <= parent.x + pw + tolerance &&
        child.y + ch <= parent.y + ph + tolerance
    );
}

export function rotatePoint(x, y, cx, cy, angleDeg) {
    const rad = (angleDeg * Math.PI) / 180;
    const cos = Math.cos(rad);
    const sin = Math.sin(rad);
    const dx = x - cx;
    const dy = y - cy;
    return {
        x: cx + dx * cos - dy * sin,
        y: cy + dx * sin + dy * cos
    };
}

// ------------------------------------------------------------
// 3. LA KINH SVG RENDERER (360° / 24 SƠN / 72 LONG / 8 QUÁI)
// ------------------------------------------------------------
export class CompassSvgRenderer {
    constructor(options = {}) {
        this.size = options.size || 500;
        this.center = this.size / 2;
        this.cachedDialSvg = null;
        this.buildDialGraphics();
    }

    buildDialGraphics() {
        const c = this.center;
        const ring24 = generateCompassPaths(MOUNTAINS_24, 180, 215, c, c);
        const ring60 = generateCompassPaths(SIXTY_DRAGONS, 150, 180, c, c);
        const trigrams8 = [
            { name: 'KHẢM (THỦY)', startDeg: 337.5, midDeg: 0, endDeg: 22.5, hanh: 'Thủy' },
            { name: 'CẤN (THỔ)', startDeg: 22.5, midDeg: 45, endDeg: 67.5, hanh: 'Thổ' },
            { name: 'CHẤN (MỘC)', startDeg: 67.5, midDeg: 90, endDeg: 112.5, hanh: 'Mộc' },
            { name: 'TỐN (MỘC)', startDeg: 112.5, midDeg: 135, endDeg: 157.5, hanh: 'Mộc' },
            { name: 'LY (HỎA)', startDeg: 157.5, midDeg: 180, endDeg: 202.5, hanh: 'Hỏa' },
            { name: 'KHÔN (THỔ)', startDeg: 202.5, midDeg: 225, endDeg: 247.5, hanh: 'Thổ' },
            { name: 'ĐOÀI (KIM)', startDeg: 247.5, midDeg: 270, endDeg: 292.5, hanh: 'Kim' },
            { name: 'CÀN (KIM)', startDeg: 292.5, midDeg: 315, endDeg: 337.5, hanh: 'Kim' }
        ];
        const ring8 = generateCompassPaths(trigrams8, 105, 150, c, c);

        let degLines = [];
        for (let i = 0; i < 360; i += 5) {
            const isMajor = i % 15 === 0;
            const rIn = isMajor ? 215 : 222;
            const p1 = polarToCartesian(c, c, rIn, i);
            const p2 = polarToCartesian(c, c, 230, i);
            degLines.push(`M ${p1.x} ${p1.y} L ${p2.x} ${p2.y}`);
        }

        const combinedPathD = `${ring24.pathD} ${ring60.pathD} ${ring8.pathD} ${degLines.join(' ')}`;

        const allLabels = [
            ...ring24.labels.map(l => `<text x="${l.x}" y="${l.y}" transform="rotate(${l.rotation}, ${l.x}, ${l.y})" text-anchor="middle" dominant-baseline="central" font-size="9" font-weight="800" fill="#f59e0b">${l.text}</text>`),
            ...ring60.labels.map(l => `<text x="${l.x}" y="${l.y}" transform="rotate(${l.rotation}, ${l.x}, ${l.y})" text-anchor="middle" dominant-baseline="central" font-size="6.5" font-weight="600" fill="#94a3b8">${l.text}</text>`),
            ...ring8.labels.map(l => `<text x="${l.x}" y="${l.y}" transform="rotate(${l.rotation}, ${l.x}, ${l.y})" text-anchor="middle" dominant-baseline="central" font-size="9.5" font-weight="900" fill="#fbbf24">${l.text}</text>`)
        ].join('');

        this.cachedDialSvg = `
            <circle cx="${c}" cy="${c}" r="230" fill="#0b0f19" stroke="#d97706" stroke-width="2" />
            <circle cx="${c}" cy="${c}" r="215" fill="none" stroke="rgba(217, 119, 6, 0.4)" stroke-width="1" />
            <circle cx="${c}" cy="${c}" r="180" fill="#0f172a" stroke="rgba(217, 119, 6, 0.5)" stroke-width="1" />
            <circle cx="${c}" cy="${c}" r="150" fill="#0b0f19" stroke="rgba(217, 119, 6, 0.4)" stroke-width="1" />
            <circle cx="${c}" cy="${c}" r="105" fill="#090d16" stroke="rgba(217, 119, 6, 0.7)" stroke-width="1.5" />
            <circle cx="${c}" cy="${c}" r="55" fill="#020617" stroke="#d97706" stroke-width="2" />
            <path d="${combinedPathD}" stroke="rgba(217, 119, 6, 0.45)" stroke-width="0.75" />
            ${allLabels}
        `;
    }

    renderStaticDialSvg() {
        return this.cachedDialSvg;
    }
}

// ------------------------------------------------------------
// 4. HUYỀN KHÔNG PHI TINH THẨM THỊ HỌC
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

export function getHourlyStar(year, month, day, hourIndex = 7) {
    let dStar = getDailyStar(year, month, day);
    let hStar = (dStar + hourIndex) % 9;
    return wrapStar(hStar);
}

export function calculateHuyenKhong(period, facingMountainStr, sittingMountainStr) {
    const facingMnt = MOUNTAINS_24_DICT[facingMountainStr] || MOUNTAINS_24_DICT['Ngọ'];
    const sittingMnt = MOUNTAINS_24_DICT[sittingMountainStr] || MOUNTAINS_24_DICT['Tý'];

    const vanBan = fly(period, 1);
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
        buildYear,
        facingDegree: facingDetail.degree,
        facingMountain: facingDetail.mountain.name,
        facingPalace: facingDetail.mountain.trigram,
        sittingMountain: sittingDetail.mountain.name,
        sittingPalace: sittingDetail.mountain.trigram,
        chartType: facingDetail.chartType,
        deviation: facingDetail.deviation,
        deviationDeg: facingDetail.deviation,
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

// ------------------------------------------------------------
// 5. BÁT TRẠCH & LỖ BAN
// ------------------------------------------------------------
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

// ------------------------------------------------------------
// 6. PARAMETRIC FOOTPRINT & ARCHITECTURAL CAD GENERATOR
// ------------------------------------------------------------
export function generateParametricFloorplan(params = {}) {
    const {
        shape = 'RECTANGLE',
        widthM = 5.0,
        lengthM = 16.0,
        floors = 2,
        facingDegree = 180,
        roomCounts = {}
    } = params;

    const W = Math.round(widthM * 1000);
    const D = Math.round(lengthM * 1000);
    const totalFloors = Math.max(1, Math.min(5, parseInt(floors, 10) || 1));
    const isWideHouse = widthM >= lengthM;

    const colSize = 220;
    const partThick = 110;
    const plansByFloor = [];

    // Footprint Polygon Outline based on Shape
    let footprintPoints = [];
    if (shape === 'L_SHAPE') {
        const cutW = Math.round(W * 0.4);
        const cutD = Math.round(D * 0.45);
        footprintPoints = [
            { x: 0, y: 0 },
            { x: W, y: 0 },
            { x: W, y: D - cutD },
            { x: W - cutW, y: D - cutD },
            { x: W - cutW, y: D },
            { x: 0, y: D }
        ];
    } else if (shape === 'U_SHAPE') {
        const armW = Math.round(W * 0.32);
        const slotD = Math.round(D * 0.38);
        footprintPoints = [
            { x: 0, y: 0 },
            { x: W, y: 0 },
            { x: W, y: D },
            { x: W - armW, y: D },
            { x: W - armW, y: D - slotD },
            { x: armW, y: D - slotD },
            { x: armW, y: D },
            { x: 0, y: D }
        ];
    } else if (shape === 'STEPPED') {
        const stepW = Math.round(W * 0.25);
        const stepD = Math.round(D * 0.35);
        footprintPoints = [
            { x: 0, y: 0 },
            { x: W - stepW, y: 0 },
            { x: W - stepW, y: stepD },
            { x: W, y: stepD },
            { x: W, y: D },
            { x: 0, y: D }
        ];
    } else if (shape === 'CONCAVE_POLYGON') {
        footprintPoints = [
            { x: 0, y: 0 },
            { x: W, y: Math.round(D * 0.15) },
            { x: Math.round(W * 0.85), y: D },
            { x: Math.round(W * 0.3), y: Math.round(D * 0.8) },
            { x: 0, y: Math.round(D * 0.9) }
        ];
    } else {
        // RECTANGLE
        footprintPoints = [
            { x: 0, y: 0 },
            { x: W, y: 0 },
            { x: W, y: D },
            { x: 0, y: D }
        ];
    }

    const numXSpans = isWideHouse ? 3 : 2;
    const numYSpans = isWideHouse ? 2 : 3;

    const axesX = [];
    const axesY = [];
    const axisLabelsX = ['A', 'B', 'C', 'D', 'E'];
    const axisLabelsY = ['1', '2', '3', '4', '5'];

    for (let i = 0; i <= numXSpans; i++) {
        axesX.push({ label: axisLabelsX[i], pos: Math.round((W / numXSpans) * i) });
    }
    for (let j = 0; j <= numYSpans; j++) {
        axesY.push({ label: axisLabelsY[j], pos: Math.round((D / numYSpans) * j) });
    }

    const columns = [];
    axesX.forEach((ax, ci) => {
        axesY.forEach((ay, ri) => {
            columns.push({ id: `col_${ci}_${ri}`, x: ax.pos - colSize / 2, y: ay.pos - colSize / 2, size: colSize });
        });
    });

    for (let f = 1; f <= totalFloors; f++) {
        const rooms = [];
        const furniture = [];
        const doors = [];
        const windows = [];
        const walls = [];
        let entrancePorch = null;

        // Build exterior perimeter walls from footprint points
        for (let i = 0; i < footprintPoints.length; i++) {
            const p1 = footprintPoints[i];
            const p2 = footprintPoints[(i + 1) % footprintPoints.length];
            walls.push({
                id: `w_ext_${i}`,
                x1: p1.x,
                y1: p1.y,
                x2: p2.x,
                y2: p2.y,
                thickness: 220,
                type: 'exterior'
            });
        }

        if (f === 1) {
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

        if (f === 1) {
            if (isWideHouse) {
                const leftW = Math.round(W * 0.35);
                const midW = Math.round(W * 0.35);
                const rightW = W - leftW - midW;
                const frontD = Math.round(D * 0.55);
                const rearD = D - frontD;

                rooms.push({ id: 'r_living', name: 'PHÒNG KHÁCH', x: leftW, y: 0, width: midW, height: frontD, areaM2: (midW * frontD) / 1000000 });
                furniture.push({ id: 'f_living_sofa', type: 'sofa_living', x: leftW + 300, y: 300, width: midW - 600, height: frontD - 600 });
                doors.push({ id: 'd_main', x: leftW + (midW - 1800) / 2, y: 0, width: 1800, swing: 'in', rotation: 0 });

                rooms.push({ id: 'r_altar', name: 'PHÒNG THỜ GIA TIÊN', x: 0, y: 0, width: leftW, height: frontD, areaM2: (leftW * frontD) / 1000000 });
                furniture.push({ id: 'f_altar', type: 'altar_set', x: leftW * 0.15, y: 300, width: leftW * 0.7, height: 1200 });

                rooms.push({ id: 'r_dining', name: 'BẾP & PHÒNG ĂN', x: leftW + midW, y: 0, width: rightW, height: frontD, areaM2: (rightW * frontD) / 1000000 });
                furniture.push({ id: 'f_dining', type: 'dining_set', x: leftW + midW + 300, y: 300, width: rightW - 600, height: frontD - 600 });

                rooms.push({ id: 'r_bed1', name: 'PHÒNG NGỦ 1', x: 0, y: frontD, width: leftW, height: rearD, areaM2: (leftW * rearD) / 1000000 });
                furniture.push({ id: 'f_bed1', type: 'bed_master', x: leftW * 0.15, y: frontD + 300, width: leftW * 0.7, height: rearD - 600 });

                rooms.push({ id: 'r_kitchen', name: 'KHÔNG GIAN NẤU', x: leftW, y: frontD, width: midW, height: rearD, areaM2: (midW * rearD) / 1000000 });
                furniture.push({ id: 'f_kitchen', type: 'kitchen_set', x: leftW + 300, y: frontD + 300, width: midW - 600, height: 700 });

                rooms.push({ id: 'r_wc_g', name: 'PHÒNG TẮM & WC', x: leftW + midW, y: frontD, width: rightW, height: rearD, areaM2: (rightW * rearD) / 1000000 });
                furniture.push({ id: 'f_wc_g', type: 'toilet_set', x: leftW + midW + 200, y: frontD + 200, width: rightW - 400, height: rearD - 400 });

                walls.push({ id: 'pw1', x1: leftW, y1: 0, x2: leftW, y2: D, thickness: partThick, type: 'partition' });
                walls.push({ id: 'pw2', x1: leftW + midW, y1: 0, x2: leftW + midW, y2: D, thickness: partThick, type: 'partition' });
                walls.push({ id: 'pw3', x1: 0, y1: frontD, x2: W, y2: frontD, thickness: partThick, type: 'partition' });
            } else {
                const frontDepth = Math.round(D * 0.35);
                const midDepth = Math.round(D * 0.28);
                const rearDepth = D - frontDepth - midDepth;

                rooms.push({ id: 'r_living', name: 'PHÒNG KHÁCH', x: 0, y: 0, width: W, height: frontDepth, areaM2: (W * frontDepth) / 1000000 });
                furniture.push({ id: 'f_sofa', type: 'sofa_living', x: 400, y: 400, width: W - 800, height: frontDepth - 800 });
                doors.push({ id: 'd_main', x: (W - 1600) / 2, y: 0, width: 1600, swing: 'in', rotation: 0 });
                walls.push({ id: 'pw_mid', x1: 0, y1: frontDepth, x2: W, y2: frontDepth, thickness: partThick, type: 'partition' });

                const stairsW = Math.min(2400, W * 0.5);
                const stairsH = Math.min(3200, midDepth * 0.85);

                rooms.push({ id: 'r_stairs_hall', name: 'SẢNH THANG & GIẾNG TRỜI', x: 0, y: frontDepth, width: W, height: midDepth, areaM2: (W * midDepth) / 1000000 });
                furniture.push({ id: 'f_stairs', type: 'stairs_flight', x: 200, y: frontDepth + (midDepth - stairsH) / 2, width: stairsW, height: stairsH });

                walls.push({ id: 'pw_rear', x1: 0, y1: frontDepth + midDepth, x2: W, y2: frontDepth + midDepth, thickness: partThick, type: 'partition' });

                const diningW = Math.round(W * 0.65);
                const wcW = W - diningW;

                rooms.push({ id: 'r_dining', name: 'BẾP & PHÒNG ĂN', x: 0, y: frontDepth + midDepth, width: diningW, height: rearDepth, areaM2: (diningW * rearDepth) / 1000000 });
                furniture.push({ id: 'f_dining', type: 'dining_set', x: 200, y: frontDepth + midDepth + 200, width: diningW - 400, height: rearDepth - 400 });

                rooms.push({ id: 'r_wc', name: 'VỆ SINH', x: diningW, y: frontDepth + midDepth, width: wcW, height: rearDepth, areaM2: (wcW * rearDepth) / 1000000 });
                furniture.push({ id: 'f_wc', type: 'toilet_set', x: diningW + 150, y: frontDepth + midDepth + 150, width: wcW - 300, height: rearDepth - 300 });

                walls.push({ id: 'pw_wc', x1: diningW, y1: frontDepth + midDepth, x2: diningW, y2: D, thickness: partThick, type: 'partition' });
            }
        } else {
            const frontD = Math.round(D * 0.38);
            const midD = Math.round(D * 0.28);
            const rearD = D - frontD - midD;

            rooms.push({ id: `r_bed_front_${f}`, name: `PHÒNG NGỦ ${f * 2 - 1}`, x: 0, y: 0, width: W, height: frontD, areaM2: (W * frontD) / 1000000 });
            furniture.push({ id: `f_bed_${f}_1`, type: 'bed_master', x: W * 0.2, y: 300, width: W * 0.6, height: frontD - 600 });
            walls.push({ id: `pw_f_${f}_1`, x1: 0, y1: frontD, x2: W, y2: frontD, thickness: partThick, type: 'partition' });

            const stairsW = Math.min(2400, W * 0.5);
            const stairsH = Math.min(3200, midD * 0.85);

            rooms.push({ id: `r_stairs_${f}`, name: 'SẢNH TẦNG & CẦU THANG', x: 0, y: frontD, width: W, height: midD, areaM2: (W * midD) / 1000000 });
            furniture.push({ id: `f_stairs_${f}`, type: 'stairs_flight', x: 200, y: frontD + (midD - stairsH) / 2, width: stairsW, height: stairsH });
            walls.push({ id: `pw_f_${f}_2`, x1: 0, y1: frontD + midD, x2: W, y2: frontD + midD, thickness: partThick, type: 'partition' });

            const bedW = Math.round(W * 0.65);
            const wcW = W - bedW;

            rooms.push({ id: `r_bed_rear_${f}`, name: `PHÒNG NGỦ ${f * 2}`, x: 0, y: frontD + midD, width: bedW, height: rearD, areaM2: (bedW * rearD) / 1000000 });
            furniture.push({ id: `f_bed_${f}_2`, type: 'bed_master', x: 200, y: frontD + midD + 200, width: bedW - 400, height: rearD - 400 });

            rooms.push({ id: `r_wc_${f}`, name: 'VỆ SINH', x: bedW, y: frontD + midD, width: wcW, height: rearD, areaM2: (wcW * rearD) / 1000000 });
            furniture.push({ id: `f_wc_${f}`, type: 'toilet_set', x: bedW + 150, y: frontD + midD + 150, width: wcW - 300, height: rearD - 300 });

            walls.push({ id: `pw_wc_${f}`, x1: bedW, y1: frontD + midD, x2: bedW, y2: D, thickness: partThick, type: 'partition' });
        }

        plansByFloor.push({
            floorIndex: f,
            floorName: f === 1 ? 'MẶT BẰNG TẦNG TRỆT' : `MẶT BẰNG TẦNG ${f}`,
            shape,
            footprintPoints,
            widthMm: W,
            depthMm: D,
            axesX,
            axesY,
            columns,
            entrancePorch,
            walls,
            rooms,
            furniture,
            doors,
            windows
        });
    }

    return {
        shape,
        footprintPoints,
        widthMm: W,
        depthMm: D,
        totalFloors,
        facingDegree,
        axesX,
        axesY,
        columns,
        plansByFloor,
        entrancePorch: plansByFloor[0].entrancePorch,
        walls: plansByFloor[0].walls,
        rooms: plansByFloor[0].rooms,
        furniture: plansByFloor[0].furniture,
        doors: plansByFloor[0].doors,
        windows: plansByFloor[0].windows
    };
}

// ------------------------------------------------------------
// 7. ARCHITECTURAL CAD SVG RENDERER (SIÊU CHI TIẾT & LA KINH OVERLAY)
// ------------------------------------------------------------
export class ArchitecturalCADRenderer {
    constructor(options = {}) {
        this.theme = options.theme || 'white';
        this.showDimensions = options.showDimensions !== false;
        this.showFurniture = options.showFurniture !== false;
        this.showAxes = options.showAxes !== false;
        this.showCompass = options.showCompass !== false;
        this.showCompassOverlay = options.showCompassOverlay === true;
        this.isLandscape = options.isLandscape === true;
    }

    renderSvg(geometry, options = {}) {
        const isWhite = this.theme === 'white';
        const W = geometry.widthMm;
        const D = geometry.depthMm;

        const padX = Math.max(900, Math.round(W * 0.14));
        const padY = Math.max(1000, Math.round(D * 0.1));

        const viewX = -padX;
        const viewY = -padY;
        const viewW = W + padX * 2;
        const viewH = D + padY * 2 + 200;

        const bgColor = isWhite ? '#ffffff' : '#0b1120';
        const gridLineColor = isWhite ? 'rgba(0,0,0,0.04)' : 'rgba(255,255,255,0.035)';
        const wallFillColor = isWhite ? '#1e293b' : '#334155';
        const wallStrokeColor = isWhite ? '#0f172a' : '#f8fafc';
        const dimColor = isWhite ? '#0284c7' : '#38bdf8';
        const titleBorder = isWhite ? '#0284c7' : '#d97706';

        // 1. Grid Axes
        let axesSvg = '';
        if (this.showAxes && geometry.axesX && geometry.axesY) {
            geometry.axesX.forEach((ax) => {
                axesSvg += `
                    <line x1="${ax.pos}" y1="-450" x2="${ax.pos}" y2="${D + 450}" stroke="${dimColor}" stroke-width="6" stroke-dasharray="100,50,20,50" opacity="0.75"/>
                    <circle cx="${ax.pos}" cy="-600" r="150" fill="${bgColor}" stroke="${dimColor}" stroke-width="10"/>
                    <text x="${ax.pos}" y="-580" text-anchor="middle" font-size="130" font-weight="900" fill="${dimColor}">${ax.label}</text>
                `;
            });
            geometry.axesY.forEach((ay) => {
                axesSvg += `
                    <line x1="-450" y1="${ay.pos}" x2="${W + 450}" y2="${ay.pos}" stroke="${dimColor}" stroke-width="6" stroke-dasharray="100,50,20,50" opacity="0.75"/>
                    <circle cx="-600" cy="${ay.pos}" r="150" fill="${bgColor}" stroke="${dimColor}" stroke-width="10"/>
                    <text x="-600" y="${ay.pos + 20}" text-anchor="middle" font-size="130" font-weight="900" fill="${dimColor}">${ay.label}</text>
                `;
            });
        }

        // 2. Porch
        let porchSvg = '';
        if (geometry.entrancePorch) {
            const p = geometry.entrancePorch;
            porchSvg = `
                <rect x="${p.x}" y="${p.y}" width="${p.width}" height="${p.height}" fill="${isWhite ? '#f1f5f9' : '#1e293b'}" stroke="${isWhite ? '#475569' : '#94a3b8'}" stroke-width="30"/>
                <line x1="${p.x}" y1="${p.y + p.height * 0.33}" x2="${p.x + p.width}" y2="${p.y + p.height * 0.33}" stroke="${isWhite ? '#64748b' : '#94a3b8'}" stroke-width="14"/>
                <line x1="${p.x}" y1="${p.y + p.height * 0.66}" x2="${p.x + p.width}" y2="${p.y + p.height * 0.66}" stroke="${isWhite ? '#64748b' : '#94a3b8'}" stroke-width="14"/>
                <circle cx="${p.x + 110}" cy="${p.y + 110}" r="100" fill="${wallFillColor}" stroke="${wallStrokeColor}" stroke-width="8"/>
                <circle cx="${p.x + p.width - 110}" cy="${p.y + 110}" r="100" fill="${wallFillColor}" stroke="${wallStrokeColor}" stroke-width="8"/>
            `;
        }

        // 3. Walls
        let wallsSvg = '';
        if (geometry.walls) {
            geometry.walls.forEach(w => {
                const strokeW = w.type === 'exterior' ? 35 : 20;
                wallsSvg += `<line x1="${w.x1}" y1="${w.y1}" x2="${w.x2}" y2="${w.y2}" stroke="${wallStrokeColor}" stroke-width="${strokeW}" stroke-linecap="square"/>`;
            });
        }

        // 4. Columns
        let columnsSvg = '';
        if (geometry.columns) {
            geometry.columns.forEach(c => {
                columnsSvg += `
                    <rect x="${c.x}" y="${c.y}" width="${c.size}" height="${c.size}" fill="${wallFillColor}" stroke="${wallStrokeColor}" stroke-width="8"/>
                    <line x1="${c.x}" y1="${c.y}" x2="${c.x + c.size}" y2="${c.y + c.size}" stroke="${isWhite ? '#ffffff' : '#0284c7'}" stroke-width="4"/>
                    <line x1="${c.x}" y1="${c.y + c.size}" x2="${c.x + c.size}" y2="${c.y}" stroke="${isWhite ? '#ffffff' : '#0284c7'}" stroke-width="4"/>
                `;
            });
        }

        // 5. Furniture (High-End Vector Graphics)
        let furnitureSvg = '';
        if (this.showFurniture && geometry.furniture) {
            geometry.furniture.forEach(f => {
                if (f.type === 'sofa_living') {
                    furnitureSvg += `
                        <g class="cad-sofa">
                            <rect x="${f.x}" y="${f.y}" width="${f.width}" height="${f.height}" rx="40" fill="${isWhite ? 'rgba(2,132,199,0.08)' : 'rgba(56,189,248,0.1)'}" stroke="${isWhite ? '#0284c7' : '#38bdf8'}" stroke-width="12"/>
                            <rect x="${f.x + 80}" y="${f.y + 80}" width="${f.width - 160}" height="${f.height * 0.4}" rx="20" fill="${isWhite ? '#e0f2fe' : '#0369a1'}" stroke="${isWhite ? '#0284c7' : '#38bdf8'}" stroke-width="8"/>
                            <ellipse cx="${f.x + f.width / 2}" cy="${f.y + f.height * 0.72}" rx="${f.width * 0.22}" ry="${f.height * 0.16}" fill="${isWhite ? '#fef3c7' : '#78350f'}" stroke="#f59e0b" stroke-width="10"/>
                        </g>
                    `;
                } else if (f.type === 'bed_master') {
                    furnitureSvg += `
                        <g class="cad-bed">
                            <rect x="${f.x}" y="${f.y}" width="${f.width}" height="${f.height}" rx="30" fill="${isWhite ? '#fffbeb' : '#1e1b4b'}" stroke="#d97706" stroke-width="12"/>
                            <rect x="${f.x}" y="${f.y}" width="${f.width}" height="140" fill="#d97706"/>
                            <rect x="${f.x + f.width * 0.1}" y="${f.y + 180}" width="${f.width * 0.35}" height="280" rx="20" fill="${isWhite ? '#ffffff' : '#312e81'}" stroke="#d97706" stroke-width="8"/>
                            <rect x="${f.x + f.width * 0.55}" y="${f.y + 180}" width="${f.width * 0.35}" height="280" rx="20" fill="${isWhite ? '#ffffff' : '#312e81'}" stroke="#d97706" stroke-width="8"/>
                            <path d="M ${f.x + 40} ${f.y + 540} L ${f.x + f.width - 40} ${f.y + 540} L ${f.x + f.width - 40} ${f.y + f.height - 30} L ${f.x + 40} ${f.y + f.height - 30} Z" fill="${isWhite ? 'rgba(217,119,6,0.12)' : 'rgba(245,158,11,0.15)'}" stroke="#d97706" stroke-width="6"/>
                        </g>
                    `;
                } else if (f.type === 'dining_set') {
                    furnitureSvg += `
                        <g class="cad-dining">
                            <rect x="${f.x}" y="${f.y}" width="${f.width}" height="${f.height}" rx="50" fill="${isWhite ? '#f0fdf4' : '#064e3b'}" stroke="#10b981" stroke-width="12"/>
                            <circle cx="${f.x + f.width * 0.25}" cy="${f.y - 60}" r="65" fill="#10b981"/>
                            <circle cx="${f.x + f.width * 0.75}" cy="${f.y - 60}" r="65" fill="#10b981"/>
                            <circle cx="${f.x + f.width * 0.25}" cy="${f.y + f.height + 60}" r="65" fill="#10b981"/>
                            <circle cx="${f.x + f.width * 0.75}" cy="${f.y + f.height + 60}" r="65" fill="#10b981"/>
                        </g>
                    `;
                } else if (f.type === 'toilet_set') {
                    furnitureSvg += `
                        <g class="cad-wc">
                            <rect x="${f.x}" y="${f.y}" width="${f.width}" height="${f.height}" rx="25" fill="${isWhite ? '#f8fafc' : '#0f172a'}" stroke="#64748b" stroke-width="10"/>
                            <rect x="${f.x + 40}" y="${f.y + 40}" width="${f.width * 0.5}" height="140" rx="15" fill="#cbd5e1" stroke="#475569" stroke-width="6"/>
                            <ellipse cx="${f.x + 40 + f.width * 0.25}" cy="${f.y + 300}" rx="${f.width * 0.22}" ry="120" fill="#ffffff" stroke="#475569" stroke-width="8"/>
                        </g>
                    `;
                } else if (f.type === 'altar_set') {
                    furnitureSvg += `
                        <g class="cad-altar">
                            <rect x="${f.x}" y="${f.y}" width="${f.width}" height="${f.height}" fill="${isWhite ? '#fef2f2' : '#450a0a'}" stroke="#dc2626" stroke-width="16"/>
                            <circle cx="${f.x + f.width / 2}" cy="${f.y + f.height / 2}" r="120" fill="#eab308" stroke="#dc2626" stroke-width="10"/>
                            <circle cx="${f.x + f.width * 0.2}" cy="${f.y + f.height / 2}" r="60" fill="#eab308"/>
                            <circle cx="${f.x + f.width * 0.8}" cy="${f.y + f.height / 2}" r="60" fill="#eab308"/>
                        </g>
                    `;
                } else if (f.type === 'stairs_flight') {
                    furnitureSvg += `
                        <g class="cad-stairs">
                            <rect x="${f.x}" y="${f.y}" width="${f.width}" height="${f.height}" fill="${isWhite ? '#f8fafc' : '#0f172a'}" stroke="#64748b" stroke-width="14"/>
                    `;
                    for (let step = 1; step < 11; step++) {
                        const stepY = f.y + (f.height / 11) * step;
                        furnitureSvg += `<line x1="${f.x}" y1="${stepY}" x2="${f.x + f.width}" y2="${stepY}" stroke="#94a3b8" stroke-width="8"/>`;
                    }
                    furnitureSvg += `
                            <line x1="${f.x + f.width / 2}" y1="${f.y + f.height - 150}" x2="${f.x + f.width / 2}" y2="${f.y + 200}" stroke="#0284c7" stroke-width="16" stroke-linecap="round"/>
                            <polygon points="${f.x + f.width / 2}, ${f.y + 80} ${f.x + f.width / 2 - 60}, ${f.y + 220} ${f.x + f.width / 2 + 60}, ${f.y + 220}" fill="#0284c7"/>
                            <text x="${f.x + f.width / 2 + 100}" y="${f.y + f.height / 2}" font-size="85" font-weight="900" fill="#0284c7">LÊN (21 BẬC)</text>
                        </g>
                    `;
                }
            });
        }

        // 6. Room Labels
        let roomsSvg = '';
        if (geometry.rooms) {
            geometry.rooms.forEach(r => {
                const rx = r.x + r.width / 2;
                const ry = r.y + r.height / 2;
                roomsSvg += `
                    <g class="room-tag">
                        <rect x="${rx - 400}" y="${ry - 100}" width="800" height="200" rx="20" fill="${isWhite ? 'rgba(255,255,255,0.92)' : 'rgba(15,23,42,0.92)'}" stroke="${isWhite ? '#cbd5e1' : '#475569'}" stroke-width="4"/>
                        <text x="${rx}" y="${ry - 20}" text-anchor="middle" font-size="95" font-weight="900" fill="${isWhite ? '#0f172a' : '#f8fafc'}">${r.name}</text>
                        <text x="${rx}" y="${ry + 60}" text-anchor="middle" font-size="70" font-weight="700" fill="${dimColor}">${r.areaM2 ? r.areaM2.toFixed(1) + ' m²' : ''}</text>
                    </g>
                `;
            });
        }

        // 7. Doors & Openings
        let doorsSvg = '';
        if (geometry.doors) {
            geometry.doors.forEach(d => {
                doorsSvg += `
                    <g class="cad-door">
                        <line x1="${d.x}" y1="${d.y}" x2="${d.x + d.width}" y2="${d.y}" stroke="${bgColor}" stroke-width="48"/>
                        <line x1="${d.x}" y1="${d.y}" x2="${d.x}" y2="${d.y + d.width}" stroke="${dimColor}" stroke-width="16"/>
                        <path d="M ${d.x} ${d.y + d.width} A ${d.width} ${d.width} 0 0 0 ${d.x + d.width} ${d.y}" fill="none" stroke="${dimColor}" stroke-width="10" stroke-dasharray="25,15"/>
                    </g>
                `;
            });
        }

        // 8. Dimension Chains
        let dimsSvg = '';
        if (this.showDimensions) {
            dimsSvg += `
                <!-- Đo Chiều Ngang Mặt Tiền (W) -->
                <line x1="0" y1="-850" x2="${W}" y2="-850" stroke="${dimColor}" stroke-width="10"/>
                <line x1="0" y1="-1000" x2="0" y2="-700" stroke="${dimColor}" stroke-width="8"/>
                <line x1="${W}" y1="-1000" x2="${W}" y2="-700" stroke="${dimColor}" stroke-width="8"/>
                <line x1="-60" y1="-790" x2="60" y2="-910" stroke="${dimColor}" stroke-width="14"/>
                <line x1="${W - 60}" y1="-790" x2="${W + 60}" y2="-910" stroke="${dimColor}" stroke-width="14"/>
                <text x="${W / 2}" y="-890" text-anchor="middle" font-size="120" font-weight="900" fill="${dimColor}">${W} mm</text>

                <!-- Đo Chiều Sâu Công Trình (D) -->
                <line x1="-850" y1="0" x2="-850" y2="${D}" stroke="${dimColor}" stroke-width="10"/>
                <line x1="-1000" y1="0" x2="-700" y2="0" stroke="${dimColor}" stroke-width="8"/>
                <line x1="-1000" y1="${D}" x2="-700" y2="${D}" stroke="${dimColor}" stroke-width="8"/>
                <line x1="-910" y1="-60" x2="-790" y2="60" stroke="${dimColor}" stroke-width="14"/>
                <line x1="-910" y1="${D - 60}" x2="-790" y2="${D + 60}" stroke="${dimColor}" stroke-width="14"/>
                <text x="-900" y="${D / 2}" text-anchor="middle" transform="rotate(-90 -900 ${D / 2})" font-size="120" font-weight="900" fill="${dimColor}">${D} mm</text>
            `;
        }

        // 9. North Arrow (Kim La Bàn Hoa Tiêu)
        let northArrowSvg = '';
        if (this.showCompass) {
            const facingDeg = options.facingDegree || 180;
            northArrowSvg = `
                <g id="cad-north-arrow" transform="translate(${viewX + 220}, ${viewY + 240}) rotate(${-facingDeg + 180})">
                    <circle cx="0" cy="0" r="140" fill="${bgColor}" stroke="${dimColor}" stroke-width="10"/>
                    <polygon points="0,-130 -45,0 0,-30" fill="#ef4444"/>
                    <polygon points="0,-130 45,0 0,-30" fill="#dc2626"/>
                    <polygon points="0,130 -45,0 0,30" fill="#64748b"/>
                    <polygon points="0,130 45,0 0,30" fill="#475569"/>
                    <text x="0" y="-155" text-anchor="middle" font-size="75" font-weight="900" fill="#ef4444">BẮC (N)</text>
                </g>
            `;
        }

        // 10. Direct Compass Overlay on Floorplan (La Kinh 24 Sơn / 72 Long phủ trực tiếp lên mặt bằng)
        let compassOverlaySvg = '';
        if (this.showCompassOverlay) {
            const cx = W / 2;
            const cy = D / 2;
            const radius = Math.min(W, D) * 0.8;
            const facingDeg = options.facingDegree || 180;

            compassOverlaySvg = `
                <g id="layer-compass-plan-overlay" transform="translate(${cx}, ${cy}) rotate(${-facingDeg + 180})" opacity="0.35">
                    <circle cx="0" cy="0" r="${radius}" fill="none" stroke="#f59e0b" stroke-width="16" stroke-dasharray="30,15"/>
                    <circle cx="0" cy="0" r="${radius * 0.75}" fill="none" stroke="#38bdf8" stroke-width="10"/>
                    <circle cx="0" cy="0" r="${radius * 0.45}" fill="rgba(15,23,42,0.6)" stroke="#f59e0b" stroke-width="8"/>
                    <!-- 8 Cung Bát Quái Lines -->
                    <line x1="0" y1="-${radius}" x2="0" y2="${radius}" stroke="#ef4444" stroke-width="12"/>
                    <line x1="-${radius}" y1="0" x2="${radius}" y2="0" stroke="#0284c7" stroke-width="12"/>
                    <line x1="-${radius * 0.707}" y1="-${radius * 0.707}" x2="${radius * 0.707}" y2="${radius * 0.707}" stroke="#f59e0b" stroke-width="8"/>
                    <line x1="-${radius * 0.707}" y1="${radius * 0.707}" x2="${radius * 0.707}" y2="-${radius * 0.707}" stroke="#f59e0b" stroke-width="8"/>
                </g>
            `;
        }

        // 11. Title Block
        const titleBlockSvg = `
            <g id="cad-title-block" transform="translate(${viewX + 120}, ${viewY + viewH - 340})">
                <rect x="0" y="0" width="${Math.min(viewW - 240, 5200)}" height="260" fill="${isWhite ? '#f8fafc' : '#0b0f19'}" stroke="${titleBorder}" stroke-width="14" rx="12"/>
                <text x="50" y="75" font-size="75" font-weight="900" fill="${isWhite ? '#0f172a' : '#f8fafc'}">DỰ ÁN: MẶT BẰNG THIẾT KẾ KIẾN TRÚC & PHONG THỦY CAD</text>
                <text x="50" y="150" font-size="60" font-weight="800" fill="${dimColor}">CHỦ TRÌ: DỊCH SƯ NGUYỄN HUY HOÀNG</text>
                <text x="50" y="215" font-size="48" font-weight="600" fill="${isWhite ? '#64748b' : '#94a3b8'}">TỶ LỆ: 1/100 · MILIMET (MM) · VẬN 9 HUYỀN KHÔNG PHI TINH</text>
            </g>
        `;

        return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewX} ${viewY} ${viewW} ${viewH}" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" class="cad-svg-drawing" style="display: block; width: 100%; height: 100%; max-width: 100%; max-height: 100%; background:${bgColor}; font-family: 'Inter', 'Noto Sans', sans-serif;">
    <defs>
        <pattern id="floorTileGrid" width="600" height="600" patternUnits="userSpaceOnUse">
            <rect width="600" height="600" fill="none" stroke="${gridLineColor}" stroke-width="6"/>
        </pattern>
    </defs>
    <rect x="${viewX + 60}" y="${viewY + 60}" width="${viewW - 120}" height="${viewH - 120}" fill="none" stroke="${titleBorder}" stroke-width="24"/>
    <rect x="0" y="0" width="${W}" height="${D}" fill="url(#floorTileGrid)"/>
    <g id="layer-grid-axes">${axesSvg}</g>
    <g id="layer-porch">${porchSvg}</g>
    <g id="layer-furniture">${furnitureSvg}</g>
    <g id="layer-walls">${wallsSvg}</g>
    <g id="layer-columns">${columnsSvg}</g>
    <g id="layer-openings">${doorsSvg}</g>
    <g id="layer-rooms">${roomsSvg}</g>
    <g id="layer-dimensions">${dimsSvg}</g>
    ${compassOverlaySvg}
    ${northArrowSvg}
    ${titleBlockSvg}
</svg>
        `.trim();
    }
}

// ------------------------------------------------------------
// 8. FENG SHUI SPATIAL ENGINE & OVERLAY RENDERER (CỬU CUNG PHỦ ĐỒ HỌA)
// ------------------------------------------------------------
export function validatePalace(palace) {
    const requiredFields = [
        'palaceId', 'palaceName', 'directionName', 'grade',
        'sonStar', 'huongStar', 'vanStar', 'nienStar',
        'analysis', 'remedy'
    ];
    const missing = requiredFields.filter(f => palace[f] === undefined || palace[f] === null);
    if (missing.length > 0) {
        console.warn(`[Cảnh báo Phong Thủy] Cung ${palace.palaceId || '?'} thiếu trường: ${missing.join(', ')}`);
        return false;
    }
    return true;
}

export function calculateFengShuiSpatial(geometry, options = {}) {
    const {
        facingDegree = 180,
        buildYear = 2025,
        currentYear = 2026,
        currentMonth = 8,
        currentDay = 19,
        currentHour = 7,
        ownerYear = 1990,
        ownerGender = 'nam'
    } = options;

    const flyingStars = calculateFlyingStars({
        facingDegree,
        buildYear,
        currentYear,
        currentMonth,
        currentDay,
        currentHour
    });

    const batTrach = ownerYear ? calculateGua(ownerYear, ownerGender) : null;
    const W = geometry.widthMm;
    const D = geometry.depthMm;
    const cellW = W / 3;
    const cellH = D / 3;

    const orientedGrid = getOrientedPalaceGrid(flyingStars.facingPalace);
    const spatialPalaces = {};
    const gridLayout = [];

    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            const idx = row * 3 + col;
            const palaceId = orientedGrid[idx];
            const starData = flyingStars.palaces[palaceId] || {};

            let grade = 'BÌNH HÒA';
            let analysis = 'Phương vị ổn định, tiếp nhận sinh khí tự nhiên.';
            let remedy = 'Bố trí công năng phù hợp với tọa hướng công trình.';

            if (starData.huongStar === 9 || starData.sonStar === 9) {
                grade = 'ĐẠI CÁT';
                analysis = 'Đắc Cửu Tử Đương Lệnh Vượng Khí (Vận 9). Tăng cường sinh tài lộc, gia đạo hưng thịnh.';
                remedy = 'Rất tốt để đặt Cửa chính, Phòng Khách, Phòng Ngủ Master, Ban công lấy sáng.';
            } else if (starData.huongStar === 1 || starData.sonStar === 1) {
                grade = 'CÁT';
                analysis = 'Nhất Bạch Tham Lang Tiến Khí. Chủ về văn chương, học vấn, quý nhân phù trợ.';
                remedy = 'Thích hợp bố trí Phòng làm việc, Bàn học, Phòng khách.';
            } else if (starData.huongStar === 2 || starData.sonStar === 2 || starData.huongStar === 5 || starData.sonStar === 5) {
                grade = 'HUNG';
                analysis = 'Nhị Hắc Bệnh Phù hoặc Ngũ Hoàng Sát Khí đáo cung.';
                remedy = 'Nên đặt Khu Vệ Sinh (WC), Cầu Thang, Nhà Kho để trấn áp; hoặc dùng vật phẩm hành Kim hóa giải.';
            } else if (starData.huongStar === 6 || starData.sonStar === 6 || starData.huongStar === 8 || starData.sonStar === 8) {
                grade = 'CÁT';
                analysis = 'Lục Bạch Vũ Khúc hoặc Bát Bạch Cát Tinh trợ mệnh.';
                remedy = 'Phù hợp bố trí Phòng ngủ, Phòng thờ, Phòng sinh hoạt chung.';
            }

            const palaceBox = {
                palaceId,
                palaceName: PALACE_NAMES[palaceId],
                directionName: PALACE_SHORT[palaceId],
                name: PALACE_NAMES[palaceId],
                trigram: PALACE_SHORT[palaceId],
                short: PALACE_SHORT[palaceId],
                row,
                col,
                x: col * cellW,
                y: row * cellH,
                width: cellW,
                height: cellH,
                vanStar: starData.vanStar || 9,
                sonStar: starData.sonStar || 1,
                huongStar: starData.huongStar || 1,
                nienStar: starData.nienStar || 1,
                nguyetStar: starData.nguyetStar || 1,
                nhatStar: starData.nhatStar || 1,
                thoiStar: starData.thoiStar || 1,
                isFacing: starData.isFacing || false,
                isSitting: starData.isSitting || false,
                grade,
                analysis,
                remedy
            };

            validatePalace(palaceBox);

            spatialPalaces[palaceId] = palaceBox;
            gridLayout.push(palaceBox);
        }
    }

    return {
        geometry,
        flyingStars,
        batTrach,
        spatialPalaces,
        gridLayout
    };
}

export function renderNinePalacesOverlaySvg(spatialResult, isWhite = true) {
    const { geometry, flyingStars, gridLayout } = spatialResult;
    const W = geometry.widthMm;
    const D = geometry.depthMm;

    let cellsSvg = '';

    gridLayout.forEach((box) => {
        const { x, y, width: w, height: h, sonStar, vanStar, huongStar, nienStar, nguyetStar, nhatStar, thoiStar, directionName, isFacing, isSitting, grade } = box;
        const cx = x + w / 2;
        const cy = y + h / 2;

        const isGood = grade === 'CÁT' || grade === 'ĐẠI CÁT';
        const isBad = grade === 'HUNG';

        const cellFill = isFacing 
            ? 'rgba(239, 68, 68, 0.12)' 
            : (isSitting 
                ? 'rgba(59, 130, 246, 0.12)' 
                : (isGood 
                    ? 'rgba(34, 197, 94, 0.07)' 
                    : (isBad ? 'rgba(239, 68, 68, 0.06)' : 'rgba(234, 179, 8, 0.05)')));

        const cellStroke = isFacing ? '#ef4444' : (isSitting ? '#3b82f6' : (isWhite ? '#d97706' : '#f59e0b'));

        const timeBadgesY = y + Math.min(180, h * 0.16);
        const badgeSpacing = Math.min(140, w * 0.18);

        const timeBadgesSvg = `
            <g class="time-star-badges">
                <circle cx="${cx - badgeSpacing * 1.5}" cy="${timeBadgesY}" r="50" fill="#22c55e" stroke="#15803d" stroke-width="6"/>
                <text x="${cx - badgeSpacing * 1.5}" y="${timeBadgesY + 18}" text-anchor="middle" font-size="50" font-weight="900" fill="#ffffff">${nienStar}</text>
                <circle cx="${cx - badgeSpacing * 0.5}" cy="${timeBadgesY}" r="50" fill="#ef4444" stroke="#b91c1c" stroke-width="6"/>
                <text x="${cx - badgeSpacing * 0.5}" y="${timeBadgesY + 18}" text-anchor="middle" font-size="50" font-weight="900" fill="#ffffff">${nguyetStar}</text>
                <circle cx="${cx + badgeSpacing * 0.5}" cy="${timeBadgesY}" r="50" fill="#3b82f6" stroke="#1d4ed8" stroke-width="6"/>
                <text x="${cx + badgeSpacing * 0.5}" y="${timeBadgesY + 18}" text-anchor="middle" font-size="50" font-weight="900" fill="#ffffff">${nhatStar}</text>
                <circle cx="${cx + badgeSpacing * 1.5}" cy="${timeBadgesY}" r="50" fill="#eab308" stroke="#ca8a04" stroke-width="6"/>
                <text x="${cx + badgeSpacing * 1.5}" y="${timeBadgesY + 18}" text-anchor="middle" font-size="50" font-weight="900" fill="#000000">${thoiStar}</text>
            </g>
        `;

        cellsSvg += `
            <g class="fengshui-palace-cell">
                <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${cellFill}" stroke="${cellStroke}" stroke-width="14" stroke-dasharray="40,20"/>
                ${timeBadgesSvg}
                <text x="${cx - w * 0.28}" y="${cy + 40}" text-anchor="middle" font-size="180" font-weight="900" fill="#38bdf8">${sonStar}</text>
                <text x="${cx}" y="${cy + 70}" text-anchor="middle" font-size="260" font-weight="900" fill="${isWhite ? '#0f172a' : '#ffffff'}">${vanStar}</text>
                <text x="${cx + w * 0.28}" y="${cy + 40}" text-anchor="middle" font-size="180" font-weight="900" fill="#ef4444">${huongStar}</text>
                <rect x="${cx - 300}" y="${y + h - 130}" width="600" height="90" rx="20" fill="${isWhite ? '#ffffff' : '#0f172a'}" stroke="${cellStroke}" stroke-width="6"/>
                <text x="${cx}" y="${y + h - 68}" text-anchor="middle" font-size="65" font-weight="900" fill="${isWhite ? '#b45309' : '#fbbf24'}">${directionName} · ${grade}</text>
            </g>
        `;
    });

    const facingArrowSvg = `
        <g id="arrow-facing-top">
            <line x1="${W / 2}" y1="-300" x2="${W / 2}" y2="-750" stroke="#ef4444" stroke-width="34" stroke-linecap="round"/>
            <polygon points="${W / 2}, -950 ${W / 2 - 90}, -750 ${W / 2 + 90}, -750" fill="#ef4444"/>
            <rect x="${W / 2 - 500}" y="-1200" width="1000" height="200" rx="40" fill="#ef4444"/>
            <text x="${W / 2}" y="-1070" text-anchor="middle" font-size="115" font-weight="900" fill="#ffffff">HƯỚNG: ${flyingStars.facingMountain} (${flyingStars.facingDegree}°)</text>
        </g>
    `;

    const sittingArrowSvg = `
        <g id="arrow-sitting-bottom">
            <line x1="${W / 2}" y1="${D + 300}" x2="${W / 2}" y2="${D + 750}" stroke="#3b82f6" stroke-width="34" stroke-linecap="round"/>
            <polygon points="${W / 2}, ${D + 950} ${W / 2 - 90}, ${D + 750} ${W / 2 + 90}, ${D + 750}" fill="#3b82f6"/>
            <rect x="${W / 2 - 500}" y="${D + 1000}" width="1000" height="200" rx="40" fill="#3b82f6"/>
            <text x="${W / 2}" y="${D + 1130}" text-anchor="middle" font-size="115" font-weight="900" fill="#ffffff">TỌA: ${flyingStars.sittingMountain}</text>
        </g>
    `;

    return `
    <g id="layer-fengshui-overlay">
        ${cellsSvg}
        ${facingArrowSvg}
        ${sittingArrowSvg}
    </g>
    `;
}

// ------------------------------------------------------------
// 9. SVG VIEWPORT CONTROLLER
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

    exportSvg(fileName = 'Mat_Bang_Kien_Truc.svg') {
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

    exportPng(fileName = 'Mat_Bang_Kien_Truc.png', scaleFactor = 3) {
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
