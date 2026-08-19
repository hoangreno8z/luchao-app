// ============================================================
// PHONG THỦY & ARCHITECTURAL CAD FULL ENGINE BUNDLE v3.0
// Kiến trúc 4 lớp chuẩn Toán học, GPU Acceleration 60FPS
// Tác giả: Dịch Sư Nguyễn Huy Hoàng
// ============================================================

// 1. DATA LAYER (24 Sơn, 60 Long Thấu Địa, Bảng Thế Quái)
export const MOUNTAINS_24 = [
    { id: 1, name: 'Nhâm', trigram: 'Khảm', palaceId: 1, element: 'Thủy', start: 337.5, mid: 345, end: 352.5, sanYuanLong: 'Địa', yinYang: '+' },
    { id: 2, name: 'Tý', trigram: 'Khảm', palaceId: 1, element: 'Thủy', start: 352.5, mid: 0, end: 7.5, sanYuanLong: 'Thiên', yinYang: '-' },
    { id: 3, name: 'Quý', trigram: 'Khảm', palaceId: 1, element: 'Thủy', start: 7.5, mid: 15, end: 22.5, sanYuanLong: 'Nhân', yinYang: '-' },
    { id: 4, name: 'Sửu', trigram: 'Cấn', palaceId: 8, element: 'Thổ', start: 22.5, mid: 30, end: 37.5, sanYuanLong: 'Địa', yinYang: '-' },
    { id: 5, name: 'Cấn', trigram: 'Cấn', palaceId: 8, element: 'Thổ', start: 37.5, mid: 45, end: 52.5, sanYuanLong: 'Thiên', yinYang: '+' },
    { id: 6, name: 'Dần', trigram: 'Cấn', palaceId: 8, element: 'Mộc', start: 52.5, mid: 60, end: 67.5, sanYuanLong: 'Nhân', yinYang: '+' },
    { id: 7, name: 'Giáp', trigram: 'Chấn', palaceId: 3, element: 'Mộc', start: 67.5, mid: 75, end: 82.5, sanYuanLong: 'Địa', yinYang: '+' },
    { id: 8, name: 'Mão', trigram: 'Chấn', palaceId: 3, element: 'Mộc', start: 82.5, mid: 90, end: 97.5, sanYuanLong: 'Thiên', yinYang: '-' },
    { id: 9, name: 'Ất', trigram: 'Chấn', palaceId: 3, element: 'Mộc', start: 97.5, mid: 105, end: 112.5, sanYuanLong: 'Nhân', yinYang: '-' },
    { id: 10, name: 'Thìn', trigram: 'Tốn', palaceId: 4, element: 'Thổ', start: 112.5, mid: 120, end: 127.5, sanYuanLong: 'Địa', yinYang: '-' },
    { id: 11, name: 'Tốn', trigram: 'Tốn', palaceId: 4, element: 'Mộc', start: 127.5, mid: 135, end: 142.5, sanYuanLong: 'Thiên', yinYang: '+' },
    { id: 12, name: 'Tỵ', trigram: 'Tốn', palaceId: 4, element: 'Hỏa', start: 142.5, mid: 150, end: 157.5, sanYuanLong: 'Nhân', yinYang: '+' },
    { id: 13, name: 'Bính', trigram: 'Ly', palaceId: 9, element: 'Hỏa', start: 157.5, mid: 165, end: 172.5, sanYuanLong: 'Địa', yinYang: '+' },
    { id: 14, name: 'Ngọ', trigram: 'Ly', palaceId: 9, element: 'Hỏa', start: 172.5, mid: 180, end: 187.5, sanYuanLong: 'Thiên', yinYang: '-' },
    { id: 15, name: 'Đinh', trigram: 'Ly', palaceId: 9, element: 'Hỏa', start: 187.5, mid: 195, end: 202.5, sanYuanLong: 'Nhân', yinYang: '-' },
    { id: 16, name: 'Mùi', trigram: 'Khôn', palaceId: 2, element: 'Thổ', start: 202.5, mid: 210, end: 217.5, sanYuanLong: 'Địa', yinYang: '-' },
    { id: 17, name: 'Khôn', trigram: 'Khôn', palaceId: 2, element: 'Thổ', start: 217.5, mid: 225, end: 232.5, sanYuanLong: 'Thiên', yinYang: '+' },
    { id: 18, name: 'Thân', trigram: 'Khôn', palaceId: 2, element: 'Kim', start: 232.5, mid: 240, end: 247.5, sanYuanLong: 'Nhân', yinYang: '+' },
    { id: 19, name: 'Canh', trigram: 'Đoài', palaceId: 7, element: 'Kim', start: 247.5, mid: 255, end: 262.5, sanYuanLong: 'Địa', yinYang: '+' },
    { id: 20, name: 'Dậu', trigram: 'Đoài', palaceId: 7, element: 'Kim', start: 262.5, mid: 270, end: 277.5, sanYuanLong: 'Thiên', yinYang: '-' },
    { id: 21, name: 'Tân', trigram: 'Đoài', palaceId: 7, element: 'Kim', start: 277.5, mid: 285, end: 292.5, sanYuanLong: 'Nhân', yinYang: '-' },
    { id: 22, name: 'Tuất', trigram: 'Càn', palaceId: 6, element: 'Thổ', start: 292.5, mid: 300, end: 307.5, sanYuanLong: 'Địa', yinYang: '-' },
    { id: 23, name: 'Càn', trigram: 'Càn', palaceId: 6, element: 'Kim', start: 307.5, mid: 315, end: 322.5, sanYuanLong: 'Thiên', yinYang: '+' },
    { id: 24, name: 'Hợi', trigram: 'Càn', palaceId: 6, element: 'Thủy', start: 322.5, mid: 330, end: 337.5, sanYuanLong: 'Nhân', yinYang: '+' }
];

export const SIXTY_DRAGONS = [
    'Giáp Tý', 'Ất Sửu', 'Bính Dần', 'Đinh Mão', 'Mậu Thìn', 'Kỷ Tỵ', 'Canh Ngọ', 'Tân Mùi', 'Nhâm Thân', 'Quý Dậu',
    'Giáp Tuất', 'Ất Hợi', 'Bính Tý', 'Đinh Sửu', 'Mậu Dần', 'Kỷ Mão', 'Canh Thìn', 'Tân Tỵ', 'Nhâm Ngọ', 'Quý Mùi',
    'Giáp Thân', 'Ất Dậu', 'Bính Tuất', 'Đinh Hợi', 'Mậu Tý', 'Kỷ Sửu', 'Canh Dần', 'Tân Mão', 'Nhâm Thìn', 'Quý Tỵ',
    'Giáp Ngọ', 'Ất Mùi', 'Bính Thân', 'Đinh Dậu', 'Mậu Tuất', 'Kỷ Hợi', 'Canh Tý', 'Tân Sửu', 'Nhâm Dần', 'Quý Mão',
    'Giáp Thìn', 'Ất Tỵ', 'Bính Ngọ', 'Đinh Mùi', 'Mậu Thân', 'Kỷ Dậu', 'Canh Tuất', 'Tân Hợi', 'Nhâm Tý', 'Quý Sửu',
    'Giáp Dần', 'Ất Mão', 'Bính Thìn', 'Đinh Tỵ', 'Mậu Ngọ', 'Kỷ Mùi', 'Canh Thân', 'Tân Dậu', 'Nhâm Tuất', 'Quý Hợi'
].map((name, index) => ({
    id: index + 1,
    name,
    start: (337.5 + index * 6) % 360,
    end: (337.5 + (index + 1) * 6) % 360
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

// 2. TOÁN HỌC THUẦN TÚY (PURE MATH)
export function areaM2(rect) {
    return (rect.width * rect.height) / 1000000;
}

export function centerOfRect(rect) {
    return {
        x: rect.x + rect.width / 2,
        y: rect.y + rect.height / 2
    };
}

export function overlaps(r1, r2) {
    return !(
        r1.x + r1.width <= r2.x ||
        r2.x + r2.width <= r1.x ||
        r1.y + r1.height <= r2.y ||
        r2.y + r2.height <= r1.y
    );
}

export function inside(child, parent, tolerance = 0) {
    return (
        child.x >= parent.x - tolerance &&
        child.y >= parent.y - tolerance &&
        child.x + child.width <= parent.x + parent.width + tolerance &&
        child.y + child.height <= parent.y + parent.height + tolerance
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

export function degToRad(deg) {
    return ((deg - 90) * Math.PI) / 180;
}

export function polarToCartesian(cx, cy, radius, deg) {
    const rad = degToRad(deg);
    return {
        x: cx + radius * Math.cos(rad),
        y: cy + radius * Math.sin(rad)
    };
}

export function findMountain(degree) {
    const normDeg = ((degree % 360) + 360) % 360;
    const mountain = MOUNTAINS_24.find(m => {
        if (m.start > m.end) return normDeg >= m.start || normDeg < m.end;
        return normDeg >= m.start && normDeg < m.end;
    }) || MOUNTAINS_24[1];

    let delta = Math.abs(normDeg - mountain.mid);
    if (delta > 180) delta = 360 - delta;

    const isKiemHuong = delta >= 3.0;

    return {
        mountain,
        degree: normDeg,
        isKiemHuong,
        deviation: parseFloat(delta.toFixed(2)),
        chartType: isKiemHuong ? 'the_quai' : 'chinh_huong'
    };
}

export function getMountainDetail(degree) {
    return findMountain(degree);
}

export function getOppositeMountain(degree) {
    return findMountain((degree + 180) % 360);
}

export function generateCompassRingPaths(cx, cy, innerR, outerR, items) {
    let lines = [];
    let texts = [];

    items.forEach((item) => {
        const p1 = polarToCartesian(cx, cy, innerR, item.start);
        const p2 = polarToCartesian(cx, cy, outerR, item.start);
        lines.push(`M ${p1.x.toFixed(2)} ${p1.y.toFixed(2)} L ${p2.x.toFixed(2)} ${p2.y.toFixed(2)}`);

        let midDeg = (item.mid !== undefined) ? item.mid : (item.start + item.end) / 2;
        if (item.start > item.end && item.mid === undefined) {
            midDeg = ((item.start + item.end + 360) / 2) % 360;
        }

        const textR = innerR + (outerR - innerR) / 2;
        const tp = polarToCartesian(cx, cy, textR, midDeg);

        let textRot = midDeg;
        if (midDeg > 90 && midDeg < 270) {
            textRot += 180;
        }

        texts.push({
            id: item.id || item.name,
            name: item.name,
            x: parseFloat(tp.x.toFixed(2)),
            y: parseFloat(tp.y.toFixed(2)),
            rotation: parseFloat(textRot.toFixed(2)),
            element: item.element || 'Kim'
        });
    });

    return {
        pathString: lines.join(' '),
        texts
    };
}

// 3. LA BÀN VECTOR SVG ĐÓNG BĂNG GPU RENDERER
export class CompassSvgRenderer {
    constructor(options = {}) {
        this.size = options.size || 500;
        this.center = this.size / 2;
        this.cachedSvgContent = null;
        this.precomputeGraphics();
    }

    precomputeGraphics() {
        const c = this.center;
        const ring24 = generateCompassRingPaths(c, c, 175, 215, MOUNTAINS_24);
        const ring60 = generateCompassRingPaths(c, c, 140, 175, SIXTY_DRAGONS);
        const trigrams8 = [
            { name: 'KHẢM', start: 337.5, mid: 0, end: 22.5, element: 'Thủy' },
            { name: 'CẤN', start: 22.5, mid: 45, end: 67.5, element: 'Thổ' },
            { name: 'CHẤN', start: 67.5, mid: 90, end: 112.5, element: 'Mộc' },
            { name: 'TỐN', start: 112.5, mid: 135, end: 157.5, element: 'Mộc' },
            { name: 'LY', start: 157.5, mid: 180, end: 202.5, element: 'Hỏa' },
            { name: 'KHÔN', start: 202.5, mid: 225, end: 247.5, element: 'Thổ' },
            { name: 'ĐOÀI', start: 247.5, mid: 270, end: 292.5, element: 'Kim' },
            { name: 'CÀN', start: 292.5, mid: 315, end: 337.5, element: 'Kim' }
        ];
        const ring8 = generateCompassRingPaths(c, c, 105, 140, trigrams8);

        let degLines = [];
        for (let i = 0; i < 360; i += 5) {
            const isMajor = i % 15 === 0;
            const rIn = isMajor ? 215 : 222;
            const p1 = polarToCartesian(c, c, rIn, i);
            const p2 = polarToCartesian(c, c, 230, i);
            degLines.push(`M ${p1.x.toFixed(2)} ${p1.y.toFixed(2)} L ${p2.x.toFixed(2)} ${p2.y.toFixed(2)}`);
        }

        const combinedPaths = `${ring24.pathString} ${ring60.pathString} ${ring8.pathString} ${degLines.join(' ')}`;

        const allTexts = [
            ...ring24.texts.map(t => `<text x="${t.x}" y="${t.y}" transform="rotate(${t.rotation}, ${t.x}, ${t.y})" text-anchor="middle" dominant-baseline="central" font-size="9" font-weight="700" fill="#f59e0b">${t.name}</text>`),
            ...ring60.texts.map(t => `<text x="${t.x}" y="${t.y}" transform="rotate(${t.rotation}, ${t.x}, ${t.y})" text-anchor="middle" dominant-baseline="central" font-size="6.5" font-weight="600" fill="#94a3b8">${t.name}</text>`),
            ...ring8.texts.map(t => `<text x="${t.x}" y="${t.y}" transform="rotate(${t.rotation}, ${t.x}, ${t.y})" text-anchor="middle" dominant-baseline="central" font-size="11" font-weight="900" fill="#fbbf24">${t.name}</text>`)
        ].join('');

        this.cachedSvgContent = `
            <circle cx="${c}" cy="${c}" r="230" fill="#0b0f19" stroke="#d97706" stroke-width="2" />
            <circle cx="${c}" cy="${c}" r="215" fill="none" stroke="rgba(217, 119, 6, 0.4)" stroke-width="1" />
            <circle cx="${c}" cy="${c}" r="175" fill="#0f172a" stroke="rgba(217, 119, 6, 0.5)" stroke-width="1" />
            <circle cx="${c}" cy="${c}" r="140" fill="#0b0f19" stroke="rgba(217, 119, 6, 0.4)" stroke-width="1" />
            <circle cx="${c}" cy="${c}" r="105" fill="#090d16" stroke="rgba(217, 119, 6, 0.7)" stroke-width="1.5" />
            <circle cx="${c}" cy="${c}" r="55" fill="#020617" stroke="#d97706" stroke-width="2" />
            <path d="${combinedPaths}" stroke="rgba(217, 119, 6, 0.45)" stroke-width="0.75" />
            ${allTexts}
        `;
    }

    renderStaticDialSvg() {
        return this.cachedSvgContent;
    }
}

// 4. HUYỀN KHÔNG PHI TINH ENGINE VẬN 9 + SAO THỜI GIAN
const LO_SHU_PATHS = [5, 6, 7, 8, 9, 1, 2, 3, 4];

export function getVanBan(period = 9) {
    let grid = {};
    let currentStar = period;
    LO_SHU_PATHS.forEach((palaceId) => {
        grid[palaceId] = currentStar;
        currentStar = currentStar === 9 ? 1 : currentStar + 1;
    });
    return grid;
}

export function flyStars(centerStar, isForward = true) {
    let grid = {};
    let cur = centerStar;
    LO_SHU_PATHS.forEach((pId) => {
        grid[pId] = cur;
        if (isForward) {
            cur = cur === 9 ? 1 : cur + 1;
        } else {
            cur = cur === 1 ? 9 : cur - 1;
        }
    });
    return grid;
}

export function getAnnualStar(year, month = 8, day = 19) {
    let effectiveYear = year;
    if (month === 1 || (month === 2 && day < 4)) {
        effectiveYear = year - 1;
    }
    let remainder = (effectiveYear - 1982) % 9;
    if (remainder < 0) remainder += 9;
    let star = 9 - remainder;
    if (star === 0) star = 9;
    return star;
}

export function getMonthlyStar(year, month, day = 19) {
    let annStar = getAnnualStar(year, month, day);
    let baseOffset = 0;
    if ([1, 4, 7].includes(annStar)) baseOffset = 8;
    else if ([3, 6, 9].includes(annStar)) baseOffset = 2;
    else baseOffset = 5;

    let mStar = (baseOffset - (month - 1)) % 9;
    if (mStar <= 0) mStar += 9;
    return mStar;
}

export function getDailyStar(year, month, day) {
    const epoch = new Date(1900, 0, 1).getTime();
    const cur = new Date(year, month - 1, day).getTime();
    const daysSinceEpoch = Math.floor((cur - epoch) / (1000 * 60 * 60 * 24));
    let star = (daysSinceEpoch % 9) + 1;
    return star;
}

export function getHourlyStar(year, month, day, hourIndex) {
    let dStar = getDailyStar(year, month, day);
    let hStar = (dStar + hourIndex) % 9;
    if (hStar === 0) hStar = 9;
    return hStar;
}

export function getOrientedPalaceGrid(facingPalaceId) {
    const palaceMaps = {
        // Hướng Ly (9) -> Tọa Khảm (1)
        9: [4, 9, 2, 3, 5, 7, 8, 1, 6],
        // Hướng Khảm (1) -> Tọa Ly (9)
        1: [6, 1, 8, 7, 5, 3, 2, 9, 4],
        // Hướng Chấn (3) -> Tọa Đoài (7)
        3: [8, 3, 4, 1, 5, 9, 6, 7, 2],
        // Hướng Đoài (7) -> Tọa Chấn (3)
        7: [2, 7, 6, 9, 5, 1, 4, 3, 8],
        // Hướng Khôn (2 - Tây Nam) -> Tọa Cấn (8 - Đông Bắc) - như mẫu hkpt.vercel.app
        2: [7, 2, 9, 6, 5, 4, 1, 8, 3],
        // Hướng Cấn (8 - Đông Bắc) -> Tọa Khôn (2 - Tây Nam)
        8: [3, 8, 1, 4, 5, 6, 9, 2, 7],
        // Hướng Tốn (4 - Đông Nam) -> Tọa Càn (6 - Tây Bắc)
        4: [9, 4, 3, 2, 5, 8, 7, 6, 1],
        // Hướng Càn (6 - Tây Bắc) -> Tọa Tốn (4 - Đông Nam)
        6: [1, 6, 7, 8, 5, 2, 3, 4, 9]
    };
    return palaceMaps[facingPalaceId] || palaceMaps[9];
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

    const van = (buildYear >= 2024 && buildYear <= 2043) ? 9 : 8;
    const vanBan = getVanBan(van);

    const facingDetail = findMountain(facingDegree);
    const sittingDetail = getOppositeMountain(facingDegree);

    const nienStar = getAnnualStar(currentYear, currentMonth, currentDay);
    const nguyetStar = getMonthlyStar(currentYear, currentMonth, currentDay);
    const nhatStar = getDailyStar(currentYear, currentMonth, currentDay);
    const thoiStar = getHourlyStar(currentYear, currentMonth, currentDay, currentHour);

    const nienBan = flyStars(nienStar, false);
    const nguyetBan = flyStars(nguyetStar, false);
    const nhatBan = flyStars(nhatStar, true);
    const thoiBan = flyStars(thoiStar, true);

    const sonCenterStar = vanBan[sittingDetail.mountain.palaceId] || 9;
    const huongCenterStar = vanBan[facingDetail.mountain.palaceId] || 9;

    const sonBan = flyStars(sonCenterStar, sittingDetail.mountain.yinYang === '+');
    const huongBan = flyStars(huongCenterStar, facingDetail.mountain.yinYang === '+');

    const palaces = {};
    [1, 2, 3, 4, 5, 6, 7, 8, 9].forEach(pId => {
        palaces[pId] = {
            palaceId: pId,
            palaceName: PALACE_NAMES[pId],
            vanStar: vanBan[pId],
            sonStar: sonBan[pId],
            huongStar: huongBan[pId],
            nienStar: nienBan[pId],
            nguyetStar: nguyetBan[pId],
            nhatStar: nhatBan[pId],
            thoiStar: thoiBan[pId],
            isFacing: pId === facingDetail.mountain.palaceId,
            isSitting: pId === sittingDetail.mountain.palaceId
        };
    });

    return {
        van,
        facingDegree,
        facingMountain: facingDetail.mountain.name,
        facingPalace: facingDetail.mountain.palaceId,
        sittingMountain: sittingDetail.mountain.name,
        sittingPalace: sittingDetail.mountain.palaceId,
        chartType: facingDetail.chartType,
        deviation: facingDetail.deviation,
        palaces,
        currentYear,
        currentMonth,
        currentDay,
        currentHour
    };
}

// 5. BÁT TRẠCH & LỖ BAN
export function calculateGua(birthYear, gender = 'nam') {
    const y = parseInt(birthYear, 10);
    const isNam = gender.toLowerCase() === 'nam';
    let sum = 0;
    let temp = y;
    while (temp > 0) {
        sum += temp % 10;
        temp = Math.floor(temp / 10);
    }
    let remainder = sum % 9;
    if (remainder === 0) remainder = 9;

    let base = remainder + 4;
    if (base > 9) base -= 9;

    let guaNum = 1;
    let guaName = 'Khảm (Thủy)';
    let trach = 'Đông Tứ Mệnh';

    if (base === 1) {
        guaNum = isNam ? 8 : 1;
        guaName = isNam ? 'Cấn (Thổ)' : 'Khảm (Thủy)';
    } else if (base === 2) {
        guaNum = isNam ? 4 : 2;
        guaName = isNam ? 'Tốn (Mộc)' : 'Khôn (Thổ)';
    } else if (base === 3) {
        guaNum = 3;
        guaName = 'Chấn (Mộc)';
    } else if (base === 4) {
        guaNum = isNam ? 2 : 4;
        guaName = isNam ? 'Khôn (Thổ)' : 'Tốn (Mộc)';
    } else if (base === 5) {
        guaNum = isNam ? 8 : 2;
        guaName = isNam ? 'Cấn (Thổ)' : 'Khôn (Thổ)';
    } else if (base === 6) {
        guaNum = isNam ? 9 : 6;
        guaName = isNam ? 'Ly (Hỏa)' : 'Càn (Kim)';
    } else if (base === 7) {
        guaNum = isNam ? 8 : 7;
        guaName = isNam ? 'Cấn (Thổ)' : 'Đoài (Kim)';
    } else if (base === 8) {
        guaNum = isNam ? 7 : 8;
        guaName = isNam ? 'Đoài (Kim)' : 'Cấn (Thổ)';
    } else if (base === 9) {
        guaNum = isNam ? 6 : 9;
        guaName = isNam ? 'Càn (Kim)' : 'Ly (Hỏa)';
    }

    const dongTu = [1, 3, 4, 9];
    trach = dongTu.includes(guaNum) ? 'Đông Tứ Mệnh' : 'Tây Tứ Mệnh';

    return {
        birthYear: y,
        gender: isNam ? 'Nam' : 'Nữ',
        guaNumber: guaNum,
        guaName,
        trachGroup: trach
    };
}

export function checkLoBan(lengthMm, type = '522') {
    const cycle = type === '522' ? 522 : 429;
    const cungNames522 = ['Quý Nhân', 'Hiểm Họa', 'Thiên Tai', 'Thiên Tài', 'Nhân Lộc', 'Cô Độc', 'Thiên Tặc', 'Tể Tướng'];
    const rem = lengthMm % cycle;
    const cungIdx = Math.floor((rem / cycle) * 8);
    const cung = cungNames522[cungIdx] || cungNames522[0];
    const isCat = ['Quý Nhân', 'Thiên Tài', 'Nhân Lộc', 'Tể Tướng'].includes(cung);
    return { lengthMm, type, cung, isCat };
}

// 6. PARAMETRIC FLOORPLAN GENERATOR (Single Source of Truth)
export function generateParametricFloorplan(params = {}) {
    const {
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

    const numBeds = parseInt(roomCounts.bedrooms, 10) || 3;
    const numWcs = parseInt(roomCounts.toilets, 10) || 2;
    const hasAltar = roomCounts.hasAltar || '1';
    const hasGarage = roomCounts.hasGarage === '1';
    const hasSkylight = roomCounts.hasSkylight === '1';

    const colSize = 220;
    const partThick = 110;
    const plansByFloor = [];

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

        walls.push({ id: 'w_front', x1: 0, y1: 0, x2: W, y2: 0, thickness: 220, type: 'exterior' });
        walls.push({ id: 'w_right', x1: W, y1: 0, x2: W, y2: D, thickness: 220, type: 'exterior' });
        walls.push({ id: 'w_rear', x1: W, y1: D, x2: 0, y2: D, thickness: 220, type: 'exterior' });
        walls.push({ id: 'w_left', x1: 0, y1: D, x2: 0, y2: 0, thickness: 220, type: 'exterior' });

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

                if (hasAltar === '2' || totalFloors === 1) {
                    rooms.push({ id: 'r_altar', name: 'PHÒNG THỜ', x: 0, y: 0, width: leftW, height: frontD, areaM2: (leftW * frontD) / 1000000 });
                    furniture.push({ id: 'f_altar', type: 'altar_set', x: leftW * 0.15, y: 300, width: leftW * 0.7, height: 1200 });
                } else {
                    rooms.push({ id: 'r_bed1', name: 'PHÒNG NGỦ 1', x: 0, y: 0, width: leftW, height: frontD, areaM2: (leftW * frontD) / 1000000 });
                    furniture.push({ id: 'f_bed1', type: 'bed_master', x: leftW * 0.15, y: 300, width: leftW * 0.7, height: frontD - 600 });
                }

                rooms.push({ id: 'r_dining', name: 'BẾP & PHÒNG ĂN', x: leftW + midW, y: 0, width: rightW, height: frontD, areaM2: (rightW * frontD) / 1000000 });
                furniture.push({ id: 'f_dining', type: 'dining_set', x: leftW + midW + 300, y: 300, width: rightW - 600, height: frontD - 600 });

                rooms.push({ id: 'r_bed2', name: 'PHÒNG NGỦ 2', x: 0, y: frontD, width: leftW, height: rearD, areaM2: (leftW * rearD) / 1000000 });
                furniture.push({ id: 'f_bed2', type: 'bed_master', x: leftW * 0.15, y: frontD + 300, width: leftW * 0.7, height: rearD - 600 });

                rooms.push({ id: 'r_kitchen', name: 'KHÔNG GIAN NẤU', x: leftW, y: frontD, width: midW, height: rearD, areaM2: (midW * rearD) / 1000000 });
                furniture.push({ id: 'f_kitchen', type: 'kitchen_set', x: leftW + 300, y: frontD + 300, width: midW - 600, height: 700 });

                rooms.push({ id: 'r_wc_g', name: 'PHÒNG TẮM & WC', x: leftW + midW, y: frontD, width: rightW, height: rearD, areaM2: (rightW * rearD) / 1000000 });
                furniture.push({ id: 'f_wc_g', type: 'toilet_set', x: leftW + midW + 200, y: frontD + 200, width: rightW - 400, height: rearD - 400 });

                walls.push({ id: 'pw1', x1: leftW, y1: 0, x2: leftW, y2: D, thickness: partThick, type: 'partition' });
                walls.push({ id: 'pw2', x1: leftW + midW, y1: 0, x2: leftW + midW, y2: D, thickness: partThick, type: 'partition' });
                walls.push({ id: 'pw3', x1: 0, y1: frontD, x2: W, y2: frontD, thickness: partThick, type: 'partition' });
            } else {
                const frontDepth = hasGarage ? Math.round(D * 0.28) : Math.round(D * 0.35);
                const midDepth = Math.round(D * 0.28);
                const rearDepth = D - frontDepth - midDepth;

                let curY = 0;
                if (hasGarage) {
                    rooms.push({ id: 'r_garage', name: 'GARA XE', x: 0, y: 0, width: W, height: frontDepth, areaM2: (W * frontDepth) / 1000000 });
                    furniture.push({ id: 'f_car', type: 'garage_car', x: W * 0.15, y: 300, width: W * 0.7, height: frontDepth - 600 });
                    curY += frontDepth;
                    walls.push({ id: 'pw_g', x1: 0, y1: curY, x2: W, y2: curY, thickness: partThick, type: 'partition' });

                    const livingD = Math.round(midDepth * 0.9);
                    rooms.push({ id: 'r_living', name: 'PHÒNG KHÁCH', x: 0, y: curY, width: W, height: livingD, areaM2: (W * livingD) / 1000000 });
                    furniture.push({ id: 'f_sofa', type: 'sofa_living', x: 300, y: curY + 300, width: W - 600, height: livingD - 600 });
                    curY += livingD;
                    walls.push({ id: 'pw_l', x1: 0, y1: curY, x2: W, y2: curY, thickness: partThick, type: 'partition' });
                } else {
                    rooms.push({ id: 'r_living', name: 'PHÒNG KHÁCH', x: 0, y: 0, width: W, height: frontDepth, areaM2: (W * frontDepth) / 1000000 });
                    furniture.push({ id: 'f_sofa', type: 'sofa_living', x: 400, y: 400, width: W - 800, height: frontDepth - 800 });
                    doors.push({ id: 'd_main', x: (W - 1600) / 2, y: 0, width: 1600, swing: 'in', rotation: 0 });
                    curY += frontDepth;
                    walls.push({ id: 'pw_mid', x1: 0, y1: curY, x2: W, y2: curY, thickness: partThick, type: 'partition' });
                }

                const stairsW = Math.min(2400, W * 0.5);
                const stairsH = Math.min(3200, midDepth * 0.85);

                rooms.push({ id: 'r_stairs_hall', name: 'SẢNH THANG & GIẾNG TRỜI', x: 0, y: curY, width: W, height: midDepth, areaM2: (W * midDepth) / 1000000 });
                furniture.push({ id: 'f_stairs', type: 'stairs_flight', x: 200, y: curY + (midDepth - stairsH) / 2, width: stairsW, height: stairsH });

                if (hasSkylight) {
                    furniture.push({ id: 'f_skylight', type: 'skylight_vent', x: W - stairsW + 200, y: curY + (midDepth - stairsH) / 2, width: stairsW - 400, height: stairsH });
                }

                curY += midDepth;
                walls.push({ id: 'pw_rear', x1: 0, y1: curY, x2: W, y2: curY, thickness: partThick, type: 'partition' });

                const diningW = Math.round(W * 0.65);
                const wcW = W - diningW;

                rooms.push({ id: 'r_dining', name: 'BẾP & PHÒNG ĂN', x: 0, y: curY, width: diningW, height: rearDepth, areaM2: (diningW * rearDepth) / 1000000 });
                furniture.push({ id: 'f_dining', type: 'dining_set', x: 200, y: curY + 200, width: diningW - 400, height: rearDepth - 400 });

                rooms.push({ id: 'r_wc', name: 'VỆ SINH', x: diningW, y: curY, width: wcW, height: rearDepth, areaM2: (wcW * rearDepth) / 1000000 });
                furniture.push({ id: 'f_wc', type: 'toilet_set', x: diningW + 150, y: curY + 150, width: wcW - 300, height: rearDepth - 300 });

                walls.push({ id: 'pw_wc', x1: diningW, y1: curY, x2: diningW, y2: D, thickness: partThick, type: 'partition' });
            }
        } else {
            // Tầng lầu (Tầng 2, 3...)
            const frontD = Math.round(D * 0.38);
            const midD = Math.round(D * 0.28);
            const rearD = D - frontD - midD;

            if (f === totalFloors && hasAltar === '1') {
                rooms.push({ id: `r_altar_${f}`, name: 'PHÒNG THỜ GIA TIÊN', x: 0, y: 0, width: W, height: frontD, areaM2: (W * frontD) / 1000000 });
                furniture.push({ id: `f_altar_${f}`, type: 'altar_set', x: W * 0.2, y: 300, width: W * 0.6, height: 1200 });
            } else {
                rooms.push({ id: `r_bed_front_${f}`, name: `PHÒNG NGỦ ${f * 2 - 1}`, x: 0, y: 0, width: W, height: frontD, areaM2: (W * frontD) / 1000000 });
                furniture.push({ id: `f_bed_${f}_1`, type: 'bed_master', x: W * 0.2, y: 300, width: W * 0.6, height: frontD - 600 });
            }

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

// 7. ARCHITECTURAL CAD SVG RENDERER (Crisp Delicate CAD 2/10)
export class ArchitecturalCADRenderer {
    constructor(options = {}) {
        this.theme = options.theme || 'white';
        this.showDimensions = options.showDimensions !== false;
        this.showFurniture = options.showFurniture !== false;
        this.showAxes = options.showAxes !== false;
        this.showCompass = options.showCompass !== false;
    }

    renderSvg(geometry, options = {}) {
        const isWhite = this.theme === 'white';
        const facingDegree = options.facingDegree || 180;
        const W = geometry.widthMm;
        const D = geometry.depthMm;

        const padLeft = 1400;
        const padRight = 1400;
        const padTop = 1500;
        const padBottom = 1600;

        const viewX = -padLeft;
        const viewY = -padTop;
        const viewW = W + padLeft + padRight;
        const viewH = D + padTop + padBottom;

        const bgColor = isWhite ? '#ffffff' : '#0f172a';
        const borderColor = isWhite ? '#0284c7' : '#d97706';

        // 1. Trục
        let axesSvg = '';
        if (this.showAxes && geometry.axesX && geometry.axesY) {
            geometry.axesX.forEach((ax) => {
                axesSvg += `<line x1="${ax.pos}" y1="-400" x2="${ax.pos}" y2="${D + 400}" stroke="${isWhite ? '#0284c7' : '#38bdf8'}" stroke-width="6" stroke-dasharray="100,50,20,50"/>`;
                axesSvg += `<circle cx="${ax.pos}" cy="-550" r="140" fill="${isWhite ? '#ffffff' : '#0f172a'}" stroke="${isWhite ? '#0284c7' : '#38bdf8'}" stroke-width="8"/>`;
                axesSvg += `<text x="${ax.pos}" y="-535" text-anchor="middle" font-size="120" font-weight="800" fill="${isWhite ? '#0284c7' : '#38bdf8'}">${ax.label}</text>`;
            });
            geometry.axesY.forEach((ay) => {
                axesSvg += `<line x1="-400" y1="${ay.pos}" x2="${W + 400}" y2="${ay.pos}" stroke="${isWhite ? '#0284c7' : '#38bdf8'}" stroke-width="6" stroke-dasharray="100,50,20,50"/>`;
                axesSvg += `<circle cx="-550" cy="${ay.pos}" r="140" fill="${isWhite ? '#ffffff' : '#0f172a'}" stroke="${isWhite ? '#0284c7' : '#38bdf8'}" stroke-width="8"/>`;
                axesSvg += `<text x="-550" y="${ay.pos + 15}" text-anchor="middle" font-size="120" font-weight="800" fill="${isWhite ? '#0284c7' : '#38bdf8'}">${ay.label}</text>`;
            });
        }

        // 2. Sảnh
        let porchSvg = '';
        if (geometry.entrancePorch) {
            const p = geometry.entrancePorch;
            porchSvg = `
                <rect x="${p.x}" y="${p.y}" width="${p.width}" height="${p.height}" fill="${isWhite ? '#f8fafc' : '#1e293b'}" stroke="${isWhite ? '#0f172a' : '#94a3b8'}" stroke-width="25"/>
                <line x1="${p.x}" y1="${p.y + p.height / 3}" x2="${p.x + p.width}" y2="${p.y + p.height / 3}" stroke="${isWhite ? '#64748b' : '#94a3b8'}" stroke-width="12"/>
                <line x1="${p.x}" y1="${p.y + (p.height * 2) / 3}" x2="${p.x + p.width}" y2="${p.y + (p.height * 2) / 3}" stroke="${isWhite ? '#64748b' : '#94a3b8'}" stroke-width="12"/>
            `;
        }

        // 3. Tường (Nét CAD mảnh 35px & 20px)
        let wallsSvg = '';
        if (geometry.walls) {
            geometry.walls.forEach(w => {
                const strokeW = w.type === 'exterior' ? 35 : 20;
                const strokeColor = isWhite ? '#0f172a' : '#f8fafc';
                wallsSvg += `<line x1="${w.x1}" y1="${w.y1}" x2="${w.x2}" y2="${w.y2}" stroke="${strokeColor}" stroke-width="${strokeW}" stroke-linecap="square"/>`;
            });
        }

        // 4. Cột
        let columnsSvg = '';
        if (geometry.columns) {
            geometry.columns.forEach(c => {
                columnsSvg += `<rect x="${c.x}" y="${c.y}" width="${c.size}" height="${c.size}" fill="${isWhite ? '#0f172a' : '#38bdf8'}" stroke="${isWhite ? '#0284c7' : '#ffffff'}" stroke-width="6"/>`;
            });
        }

        // 5. Nội thất
        let furnitureSvg = '';
        if (this.showFurniture && geometry.furniture) {
            geometry.furniture.forEach(f => {
                if (f.type === 'sofa_living') {
                    furnitureSvg += `<rect x="${f.x}" y="${f.y}" width="${f.width}" height="${f.height}" rx="30" fill="${isWhite ? 'rgba(2,132,199,0.06)' : 'rgba(56,189,248,0.08)'}" stroke="${isWhite ? '#0284c7' : '#38bdf8'}" stroke-width="10"/>`;
                } else if (f.type === 'bed_master') {
                    furnitureSvg += `
                        <rect x="${f.x}" y="${f.y}" width="${f.width}" height="${f.height}" rx="20" fill="${isWhite ? 'rgba(217,119,6,0.06)' : 'rgba(245,158,11,0.08)'}" stroke="${isWhite ? '#d97706' : '#f59e0b'}" stroke-width="10"/>
                        <rect x="${f.x + f.width * 0.1}" y="${f.y + 80}" width="${f.width * 0.35}" height="280" rx="10" fill="none" stroke="${isWhite ? '#d97706' : '#f59e0b'}" stroke-width="8"/>
                        <rect x="${f.x + f.width * 0.55}" y="${f.y + 80}" width="${f.width * 0.35}" height="280" rx="10" fill="none" stroke="${isWhite ? '#d97706' : '#f59e0b'}" stroke-width="8"/>
                    `;
                } else if (f.type === 'dining_set') {
                    furnitureSvg += `<rect x="${f.x}" y="${f.y}" width="${f.width}" height="${f.height}" rx="40" fill="${isWhite ? 'rgba(16,185,129,0.06)' : 'rgba(52,211,153,0.08)'}" stroke="${isWhite ? '#10b981' : '#34d399'}" stroke-width="10"/>`;
                } else if (f.type === 'toilet_set') {
                    furnitureSvg += `<rect x="${f.x}" y="${f.y}" width="${f.width}" height="${f.height}" rx="20" fill="${isWhite ? 'rgba(100,116,139,0.06)' : 'rgba(148,163,184,0.08)'}" stroke="${isWhite ? '#64748b' : '#94a3b8'}" stroke-width="10"/>`;
                } else if (f.type === 'altar_set') {
                    furnitureSvg += `<rect x="${f.x}" y="${f.y}" width="${f.width}" height="${f.height}" fill="${isWhite ? 'rgba(220,38,38,0.08)' : 'rgba(239,68,68,0.1)'}" stroke="${isWhite ? '#dc2626' : '#ef4444'}" stroke-width="14"/>`;
                } else if (f.type === 'stairs_flight') {
                    furnitureSvg += `<rect x="${f.x}" y="${f.y}" width="${f.width}" height="${f.height}" fill="none" stroke="${isWhite ? '#64748b' : '#94a3b8'}" stroke-width="12"/>`;
                    for (let step = 1; step < 10; step++) {
                        const stepY = f.y + (f.height / 10) * step;
                        furnitureSvg += `<line x1="${f.x}" y1="${stepY}" x2="${f.x + f.width}" y2="${stepY}" stroke="${isWhite ? '#64748b' : '#94a3b8'}" stroke-width="8"/>`;
                    }
                }
            });
        }

        // 6. Nhãn Phòng
        let roomsSvg = '';
        if (geometry.rooms) {
            geometry.rooms.forEach(r => {
                const rx = r.x + r.width / 2;
                const ry = r.y + r.height / 2;
                roomsSvg += `
                    <text x="${rx}" y="${ry - 20}" text-anchor="middle" font-size="90" font-weight="900" fill="${isWhite ? '#0f172a' : '#f8fafc'}">${r.name}</text>
                    <text x="${rx}" y="${ry + 80}" text-anchor="middle" font-size="65" font-weight="600" fill="${isWhite ? '#64748b' : '#94a3b8'}">${r.areaM2 ? r.areaM2.toFixed(1) + ' m²' : ''}</text>
                `;
            });
        }

        // 7. Cửa
        let doorsSvg = '';
        if (geometry.doors) {
            geometry.doors.forEach(d => {
                doorsSvg += `
                    <line x1="${d.x}" y1="${d.y}" x2="${d.x + d.width}" y2="${d.y}" stroke="${isWhite ? '#ffffff' : '#0f172a'}" stroke-width="38"/>
                    <path d="M ${d.x} ${d.y} A ${d.width} ${d.width} 0 0 1 ${d.x + d.width} ${d.y + d.width}" fill="none" stroke="${isWhite ? '#0284c7' : '#38bdf8'}" stroke-width="10" stroke-dasharray="20,10"/>
                `;
            });
        }

        // 8. Kích thước (Dimensions)
        let dimsSvg = '';
        if (this.showDimensions) {
            dimsSvg += `
                <!-- Kích thước tổng ngang -->
                <line x1="0" y1="-800" x2="${W}" y2="-800" stroke="${isWhite ? '#0284c7' : '#38bdf8'}" stroke-width="8"/>
                <circle cx="0" cy="-800" r="16" fill="${isWhite ? '#0284c7' : '#38bdf8'}"/>
                <circle cx="${W}" cy="-800" r="16" fill="${isWhite ? '#0284c7' : '#38bdf8'}"/>
                <text x="${W / 2}" y="-830" text-anchor="middle" font-size="90" font-weight="800" fill="${isWhite ? '#0284c7' : '#38bdf8'}">${W}</text>

                <!-- Kích thước tổng dọc -->
                <line x1="-800" y1="0" x2="-800" y2="${D}" stroke="${isWhite ? '#0284c7' : '#38bdf8'}" stroke-width="8"/>
                <circle cx="-800" cy="0" r="16" fill="${isWhite ? '#0284c7' : '#38bdf8'}"/>
                <circle cx="-800" cy="${D}" r="16" fill="${isWhite ? '#0284c7' : '#38bdf8'}"/>
                <text x="-840" y="${D / 2}" text-anchor="middle" transform="rotate(-90 -840 ${D / 2})" font-size="90" font-weight="800" fill="${isWhite ? '#0284c7' : '#38bdf8'}">${D}</text>
            `;
        }

        // 9. Khung Tiêu Đề Bản Vẽ
        const titleBlockSvg = `
            <g id="layer-title-block" transform="translate(${viewX + 200}, ${viewY + viewH - 420})">
                <rect x="0" y="0" width="${Math.min(viewW - 400, 4800)}" height="300" fill="${isWhite ? '#f8fafc' : '#0b0f19'}" stroke="${borderColor}" stroke-width="12" rx="10"/>
                <text x="50" y="80" font-size="70" font-weight="900" fill="${isWhite ? '#0f172a' : '#f8fafc'}">DỰ ÁN: MẶT BẰNG THIẾT KẾ PHONG THỦY KIẾN TRÚC</text>
                <text x="50" y="160" font-size="55" font-weight="700" fill="${isWhite ? '#0284c7' : '#38bdf8'}">TÁC GIẢ: DỊCH SƯ NGUYỄN HUY HOÀNG</text>
                <text x="50" y="230" font-size="45" font-weight="600" fill="${isWhite ? '#64748b' : '#94a3b8'}">TỶ LỆ: 1/100 · ĐƠN VỊ: MILIMET (MM) · VẬN 9 HUYỀN KHÔNG</text>
            </g>
        `;

        return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewX} ${viewY} ${viewW} ${viewH}" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" class="cad-svg-drawing" style="display: block; width: 100%; height: 100%; max-width: 100%; max-height: 100%; background:${bgColor}; font-family: 'Inter', 'Noto Sans', sans-serif;">
    <defs>
        <pattern id="floorTile" width="600" height="600" patternUnits="userSpaceOnUse">
            <rect width="600" height="600" fill="none" stroke="${isWhite ? 'rgba(0,0,0,0.035)' : 'rgba(255,255,255,0.03)'}" stroke-width="6"/>
        </pattern>
    </defs>
    <rect x="${viewX + 80}" y="${viewY + 80}" width="${viewW - 160}" height="${viewH - 160}" fill="none" stroke="${borderColor}" stroke-width="25"/>
    <rect x="0" y="0" width="${W}" height="${D}" fill="url(#floorTile)"/>
    <g id="layer-grid-axes">${axesSvg}</g>
    <g id="layer-porch">${porchSvg}</g>
    <g id="layer-rooms">${roomsSvg}</g>
    <g id="layer-furniture">${furnitureSvg}</g>
    <g id="layer-walls">${wallsSvg}</g>
    <g id="layer-columns">${columnsSvg}</g>
    <g id="layer-openings">${doorsSvg}</g>
    <g id="layer-dimensions">${dimsSvg}</g>
    ${titleBlockSvg}
</svg>
        `.trim();
    }
}

// 8. CỬU CUNG SPATIAL OVERLAY ENGINE
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
                grade = 'HUNG (HÓA GIẢI)';
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
                name: PALACE_NAMES[palaceId],
                trigram: PALACE_SHORT[palaceId],
                short: PALACE_SHORT[palaceId],
                row,
                col,
                x: col * cellW,
                y: row * cellH,
                width: cellW,
                height: cellH,
                vanStar: starData.vanStar,
                sonStar: starData.sonStar,
                huongStar: starData.huongStar,
                nienStar: starData.nienStar,
                nguyetStar: starData.nguyetStar,
                nhatStar: starData.nhatStar,
                thoiStar: starData.thoiStar,
                isFacing: starData.isFacing,
                isSitting: starData.isSitting,
                grade,
                analysis,
                remedy
            };

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
        const { x, y, width: w, height: h, sonStar, vanStar, huongStar, nienStar, nguyetStar, nhatStar, thoiStar, short, isFacing, isSitting } = box;
        const cx = x + w / 2;
        const cy = y + h / 2;

        const cellFill = isFacing ? 'rgba(239, 68, 68, 0.08)' : (isSitting ? 'rgba(59, 130, 246, 0.08)' : 'rgba(234, 179, 8, 0.04)');
        const cellStroke = isFacing ? '#ef4444' : (isSitting ? '#3b82f6' : (isWhite ? '#d97706' : '#f59e0b'));

        const timeBadgesY = y + Math.min(180, h * 0.18);
        const badgeSpacing = Math.min(140, w * 0.18);

        const timeBadgesSvg = `
            <g class="time-star-badges">
                <circle cx="${cx - badgeSpacing * 1.5}" cy="${timeBadgesY}" r="45" fill="#22c55e" stroke="#15803d" stroke-width="4"/>
                <text x="${cx - badgeSpacing * 1.5}" y="${timeBadgesY + 16}" text-anchor="middle" font-size="45" font-weight="900" fill="#ffffff">${nienStar}</text>
                <circle cx="${cx - badgeSpacing * 0.5}" cy="${timeBadgesY}" r="45" fill="#ef4444" stroke="#b91c1c" stroke-width="4"/>
                <text x="${cx - badgeSpacing * 0.5}" y="${timeBadgesY + 16}" text-anchor="middle" font-size="45" font-weight="900" fill="#ffffff">${nguyetStar}</text>
                <circle cx="${cx + badgeSpacing * 0.5}" cy="${timeBadgesY}" r="45" fill="#3b82f6" stroke="#1d4ed8" stroke-width="4"/>
                <text x="${cx + badgeSpacing * 0.5}" y="${timeBadgesY + 16}" text-anchor="middle" font-size="45" font-weight="900" fill="#ffffff">${nhatStar}</text>
                <circle cx="${cx + badgeSpacing * 1.5}" cy="${timeBadgesY}" r="45" fill="#eab308" stroke="#ca8a04" stroke-width="4"/>
                <text x="${cx + badgeSpacing * 1.5}" y="${timeBadgesY + 16}" text-anchor="middle" font-size="45" font-weight="900" fill="#000000">${thoiStar}</text>
            </g>
        `;

        cellsSvg += `
            <g class="fengshui-palace-cell">
                <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${cellFill}" stroke="${cellStroke}" stroke-width="12" stroke-dasharray="40,20"/>
                ${timeBadgesSvg}
                <!-- Bộ 3 Sao Huyền Không -->
                <text x="${cx - w * 0.28}" y="${cy + 30}" text-anchor="middle" font-size="160" font-weight="900" fill="#38bdf8">${sonStar}</text>
                <text x="${cx}" y="${cy + 60}" text-anchor="middle" font-size="240" font-weight="900" fill="${isWhite ? '#0f172a' : '#ffffff'}">${vanStar}</text>
                <text x="${cx + w * 0.28}" y="${cy + 30}" text-anchor="middle" font-size="160" font-weight="900" fill="#ef4444">${huongStar}</text>
                <!-- Nhãn Cung -->
                <text x="${cx}" y="${y + h - 80}" text-anchor="middle" font-size="95" font-weight="900" fill="${isWhite ? '#b45309' : '#fbbf24'}">${short}</text>
            </g>
        `;
    });

    const facingArrowSvg = `
        <g id="arrow-facing-top">
            <line x1="${W / 2}" y1="-300" x2="${W / 2}" y2="-700" stroke="#ef4444" stroke-width="30" stroke-linecap="round"/>
            <polygon points="${W / 2}, -900 ${W / 2 - 80}, -700 ${W / 2 + 80}, -700" fill="#ef4444"/>
            <rect x="${W / 2 - 450}" y="-1150" width="900" height="180" rx="40" fill="#ef4444"/>
            <text x="${W / 2}" y="-1030" text-anchor="middle" font-size="110" font-weight="900" fill="#ffffff">HƯỚNG: ${flyingStars.facingMountain} (${flyingStars.facingDegree}°)</text>
        </g>
    `;

    const sittingArrowSvg = `
        <g id="arrow-sitting-bottom">
            <line x1="${W / 2}" y1="${D + 300}" x2="${W / 2}" y2="${D + 700}" stroke="#3b82f6" stroke-width="30" stroke-linecap="round"/>
            <polygon points="${W / 2}, ${D + 900} ${W / 2 - 80}, ${D + 700} ${W / 2 + 80}, ${D + 700}" fill="#3b82f6"/>
            <rect x="${W / 2 - 450}" y="${D + 950}" width="900" height="180" rx="40" fill="#3b82f6"/>
            <text x="${W / 2}" y="${D + 1070}" text-anchor="middle" font-size="110" font-weight="900" fill="#ffffff">TỌA: ${flyingStars.sittingMountain}</text>
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

// 9. INTERACTIVE SVG VIEWPORT CONTROLLER
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

        this.container.addEventListener('mousedown', (e) => {
            if (e.button !== 0) return;
            this.isDragging = true;
            this.startX = e.clientX - this.panX;
            this.startY = e.clientY - this.panY;
            this.container.style.cursor = 'grabbing';
        });

        window.addEventListener('mousemove', (e) => {
            if (!this.isDragging) return;
            this.panX = e.clientX - this.startX;
            this.panY = e.clientY - this.startY;
            this.updateTransform();
        });

        window.addEventListener('mouseup', () => {
            this.isDragging = false;
            if (this.container) this.container.style.cursor = 'grab';
        });

        this.container.addEventListener('wheel', (e) => {
            e.preventDefault();
            const delta = e.deltaY < 0 ? 1.15 : 0.85;
            this.zoomAt(delta, e.clientX, e.clientY);
        }, { passive: false });

        let initialDistance = 0;
        let initialScale = 1.0;
        let touchStartX = 0;
        let touchStartY = 0;

        this.container.addEventListener('touchstart', (e) => {
            if (e.touches.length === 1) {
                this.isDragging = true;
                touchStartX = e.touches[0].clientX - this.panX;
                touchStartY = e.touches[0].clientY - this.panY;
            } else if (e.touches.length === 2) {
                this.isDragging = false;
                const dx = e.touches[0].clientX - e.touches[1].clientX;
                const dy = e.touches[0].clientY - e.touches[1].clientY;
                initialDistance = Math.sqrt(dx * dx + dy * dy);
                initialScale = this.scale;
            }
        }, { passive: true });

        this.container.addEventListener('touchmove', (e) => {
            if (e.touches.length === 1 && this.isDragging) {
                this.panX = e.touches[0].clientX - touchStartX;
                this.panY = e.touches[0].clientY - touchStartY;
                this.updateTransform();
            } else if (e.touches.length === 2 && initialDistance > 0) {
                const dx = e.touches[0].clientX - e.touches[1].clientX;
                const dy = e.touches[0].clientY - e.touches[1].clientY;
                const dist = Math.sqrt(dx * dx + dy * dy);
                const factor = dist / initialDistance;
                this.scale = Math.max(0.3, Math.min(6.0, initialScale * factor));
                this.updateTransform();
            }
        }, { passive: true });

        this.container.addEventListener('touchend', () => {
            this.isDragging = false;
            initialDistance = 0;
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

    exportPng(fileName = 'Mat_Bang_Kien_Truc.png', scaleFactor = 2) {
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
