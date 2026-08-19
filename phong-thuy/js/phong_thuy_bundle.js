// ============================================================
// Phong Thủy & Kiến Trúc CAD Standalone ES Module Bundle v2.0
// Single Source of Truth for Browser Client & Serverless
// Tác giả: Dịch Sư Nguyễn Huy Hoàng — 0933 116 860
// ============================================================

// 1. Geometry Module
export function areaM2(rect) {
    return Number(((rect.width * rect.height) / 1000000).toFixed(2));
}

export function centerOfRect(r) {
    return {
        x: r.x + r.width / 2,
        y: r.y + r.height / 2
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

export function inside(inner, outer, padding = 0) {
    return (
        inner.x >= outer.x + padding &&
        inner.y >= outer.y + padding &&
        inner.x + inner.width <= outer.x + outer.width - padding &&
        inner.y + inner.height <= outer.y + outer.height - padding
    );
}

export function rotatePoint(px, py, cx, cy, angleDeg) {
    const rad = (angleDeg * Math.PI) / 180;
    const cos = Math.cos(rad);
    const sin = Math.sin(rad);
    const dx = px - cx;
    const dy = py - cy;
    return {
        x: cx + dx * cos - dy * sin,
        y: cy + dx * sin + dy * cos
    };
}

// 2. Huyền Không Phi Tinh Module v2.0
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
    1: 'Khảm (Bắc)', 2: 'Khôn (Tây Nam)', 3: 'Chấn (Đông)', 4: 'Tốn (Đông Nam)',
    5: 'Trung Cung', 6: 'Càn (Tây Bắc)', 7: 'Đoài (Tây)', 8: 'Cấn (Đông Bắc)', 9: 'Ly (Nam)'
};

export const PALACE_SHORT = {
    1: 'BẮC', 2: 'TN', 3: 'ĐÔNG', 4: 'ĐN', 5: 'TRUNG', 6: 'TB', 7: 'TÂY', 8: 'ĐB', 9: 'NAM'
};

export const PALACE_CENTER_DEG = {
    1: 0, 2: 225, 3: 90, 4: 135, 5: 0, 6: 315, 7: 270, 8: 45, 9: 180
};

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
    const yearZhi = ((effectiveYear - 4) % 12 + 12) % 12;
    let baseStar = 2;
    if ([0, 3, 6, 9].includes(yearZhi)) baseStar = 8;
    else if ([2, 5, 8, 11].includes(yearZhi)) baseStar = 2;
    else baseStar = 5;

    let monthStar = baseStar - (month - 1);
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

export function getOrientedPalaceGrid(facingPalace) {
    const ring = [1, 8, 3, 4, 9, 2, 7, 6];
    const fIdx = ring.indexOf(facingPalace);
    if (fIdx === -1) return [4, 9, 2, 3, 5, 7, 8, 1, 6];

    const getP = (offset) => ring[((fIdx + offset) % 8 + 8) % 8];

    return [
        getP(-1), getP(0), getP(1),
        getP(-2), 5,       getP(2),
        getP(-3), getP(4), getP(3)
    ];
}

// 3. Furniture Symbols Module (Delicate CAD)
export function renderFurnitureSvg(item, isWhite = true) {
    const { x, y, width: w, height: h, type } = item;
    const stroke = isWhite ? '#475569' : '#94a3b8';
    const fill = isWhite ? '#f8fafc' : '#1e293b';
    const accent = isWhite ? '#0284c7' : '#38bdf8';
    const gold = isWhite ? '#b45309' : '#fbbf24';

    switch (type) {
        case 'sofa_living': {
            const armW = Math.min(220, w * 0.12);
            const backD = Math.min(260, h * 0.22);
            const tableW = Math.min(1200, w * 0.45);
            const tableH = Math.min(650, h * 0.35);
            const tx = x + (w - tableW) / 2;
            const ty = y + h - tableH - 80;

            return `
                <g id="${item.id}" class="cad-furniture sofa">
                    <rect x="${x - 80}" y="${y - 80}" width="${w + 160}" height="${h + 160}" fill="${isWhite ? '#f8fafc' : '#0b1120'}" stroke="${isWhite ? '#cbd5e1' : '#334155'}" stroke-dasharray="40,20" stroke-width="6" rx="30"/>
                    <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}" stroke="${stroke}" stroke-width="12" rx="30"/>
                    <rect x="${x}" y="${y}" width="${w}" height="${backD}" fill="${isWhite ? '#f1f5f9' : '#334155'}" stroke="${stroke}" stroke-width="8"/>
                    <rect x="${x}" y="${y}" width="${armW}" height="${h}" fill="${isWhite ? '#f1f5f9' : '#334155'}" stroke="${stroke}" stroke-width="8"/>
                    <rect x="${x + w - armW}" y="${y}" width="${armW}" height="${h}" fill="${isWhite ? '#f1f5f9' : '#334155'}" stroke="${stroke}" stroke-width="8"/>
                    <rect x="${tx}" y="${ty}" width="${tableW}" height="${tableH}" fill="${isWhite ? '#f0f9ff' : '#0c4a6e'}" stroke="${accent}" stroke-width="10" rx="20"/>
                    <line x1="${tx + 60}" y1="${ty + tableH / 2}" x2="${tx + tableW - 60}" y2="${ty + tableH / 2}" stroke="${accent}" stroke-width="6" stroke-dasharray="20,15"/>
                </g>
            `;
        }

        case 'dining_set': {
            const chairW = Math.min(420, w / 3.6);
            const chairD = 320;
            const chairSpacing = (w - chairW * 3) / 4;

            let chairsSvg = '';
            for (let i = 0; i < 3; i++) {
                const cx = x + chairSpacing * (i + 1) + chairW * i;
                chairsSvg += `<rect x="${cx}" y="${y - chairD + 40}" width="${chairW}" height="${chairD}" fill="${isWhite ? '#f1f5f9' : '#334155'}" stroke="${stroke}" stroke-width="8" rx="15"/>`;
                chairsSvg += `<rect x="${cx}" y="${y + h - 40}" width="${chairW}" height="${chairD}" fill="${isWhite ? '#f1f5f9' : '#334155'}" stroke="${stroke}" stroke-width="8" rx="15"/>`;
            }

            return `
                <g id="${item.id}" class="cad-furniture dining">
                    ${chairsSvg}
                    <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}" stroke="${stroke}" stroke-width="12" rx="30"/>
                    <circle cx="${x + w * 0.25}" cy="${y + h / 2}" r="80" fill="none" stroke="${stroke}" stroke-width="6"/>
                    <circle cx="${x + w * 0.5}" cy="${y + h / 2}" r="80" fill="none" stroke="${stroke}" stroke-width="6"/>
                    <circle cx="${x + w * 0.75}" cy="${y + h / 2}" r="80" fill="none" stroke="${stroke}" stroke-width="6"/>
                </g>
            `;
        }

        case 'kitchen_set': {
            const hobX = x + w * 0.25;
            const sinkX = x + w * 0.7;

            return `
                <g id="${item.id}" class="cad-furniture kitchen">
                    <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}" stroke="${stroke}" stroke-width="12"/>
                    <rect x="${hobX - 280}" y="${y + 60}" width="560" height="${h - 120}" fill="${isWhite ? '#fee2e2' : '#450a0a'}" stroke="#ef4444" stroke-width="8" rx="15"/>
                    <circle cx="${hobX - 130}" cy="${y + h / 2}" r="80" fill="none" stroke="#ef4444" stroke-width="8"/>
                    <circle cx="${hobX + 130}" cy="${y + h / 2}" r="80" fill="none" stroke="#ef4444" stroke-width="8"/>
                    <rect x="${sinkX - 350}" y="${y + 60}" width="700" height="${h - 120}" fill="${isWhite ? '#f0f9ff' : '#0c4a6e'}" stroke="${accent}" stroke-width="8" rx="10"/>
                    <rect x="${sinkX - 310}" y="${y + 90}" width="290" height="${h - 180}" fill="none" stroke="${accent}" stroke-width="6" rx="8"/>
                    <rect x="${sinkX + 20}" y="${y + 90}" width="290" height="${h - 180}" fill="none" stroke="${accent}" stroke-width="6" rx="8"/>
                </g>
            `;
        }

        case 'bed_master': {
            const pillowW = (w - 240) / 2;
            const pillowH = Math.min(380, h * 0.20);
            const nightstandSize = 350;

            return `
                <g id="${item.id}" class="cad-furniture bed-master">
                    <rect x="${x - nightstandSize - 30}" y="${y}" width="${nightstandSize}" height="${nightstandSize}" fill="${fill}" stroke="${stroke}" stroke-width="8" rx="10"/>
                    <rect x="${x + w + 30}" y="${y}" width="${nightstandSize}" height="${nightstandSize}" fill="${fill}" stroke="${stroke}" stroke-width="8" rx="10"/>
                    <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}" stroke="${stroke}" stroke-width="12" rx="20"/>
                    <rect x="${x}" y="${y}" width="${w}" height="100" fill="${isWhite ? '#cbd5e1' : '#475569'}" stroke="${stroke}" stroke-width="8"/>
                    <rect x="${x + 50}" y="${y + 130}" width="${pillowW}" height="${pillowH}" fill="${isWhite ? '#ffffff' : '#334155'}" stroke="${stroke}" stroke-width="6" rx="15"/>
                    <rect x="${x + w - pillowW - 50}" y="${y + 130}" width="${pillowW}" height="${pillowH}" fill="${isWhite ? '#ffffff' : '#334155'}" stroke="${stroke}" stroke-width="6" rx="15"/>
                    <path d="M ${x} ${y + h * 0.45} Q ${x + w / 2} ${y + h * 0.50} ${x + w} ${y + h * 0.45} L ${x + w} ${y + h} L ${x} ${y + h} Z" fill="${isWhite ? '#fef3c7' : '#451a03'}" stroke="${gold}" stroke-width="8"/>
                </g>
            `;
        }

        case 'bed_single': {
            const pillowW = w - 200;
            const pillowH = Math.min(350, h * 0.20);

            return `
                <g id="${item.id}" class="cad-furniture bed-single">
                    <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}" stroke="${stroke}" stroke-width="10" rx="15"/>
                    <rect x="${x}" y="${y}" width="${w}" height="90" fill="${isWhite ? '#cbd5e1' : '#475569'}" stroke="${stroke}" stroke-width="6"/>
                    <rect x="${x + 100}" y="${y + 110}" width="${pillowW}" height="${pillowH}" fill="${isWhite ? '#ffffff' : '#334155'}" stroke="${stroke}" stroke-width="6" rx="12"/>
                    <path d="M ${x} ${y + h * 0.48} Q ${x + w / 2} ${y + h * 0.52} ${x + w} ${y + h * 0.48} L ${x + w} ${y + h} L ${x} ${y + h} Z" fill="${isWhite ? '#f0f9ff' : '#082f49'}" stroke="${accent}" stroke-width="8"/>
                </g>
            `;
        }

        case 'toilet_set': {
            const showerW = Math.min(900, w * 0.45);
            const toiletW = Math.min(420, w * 0.3);
            const toiletD = Math.min(600, h * 0.45);

            return `
                <g id="${item.id}" class="cad-furniture toilet">
                    <rect x="${x + 30}" y="${y + 30}" width="${showerW}" height="${h - 60}" fill="${isWhite ? '#f0f9ff' : '#0369a1'}" stroke="${accent}" stroke-width="8" opacity="0.6"/>
                    <g transform="translate(${x + w - toiletW - 50}, ${y + 50})">
                        <rect x="0" y="0" width="${toiletW}" height="160" fill="${isWhite ? '#ffffff' : '#475569'}" stroke="${stroke}" stroke-width="8" rx="10"/>
                        <ellipse cx="${toiletW / 2}" cy="${toiletD / 2 + 70}" rx="${toiletW / 2 - 15}" ry="${toiletD / 2 - 25}" fill="${isWhite ? '#ffffff' : '#475569'}" stroke="${stroke}" stroke-width="8"/>
                    </g>
                    <rect x="${x + showerW + 60}" y="${y + h - 380}" width="480" height="320" fill="${isWhite ? '#ffffff' : '#334155'}" stroke="${stroke}" stroke-width="8" rx="12"/>
                </g>
            `;
        }

        case 'altar_set': {
            const burnerR = Math.min(60, h * 0.12);
            return `
                <g id="${item.id}" class="cad-furniture altar">
                    <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${isWhite ? '#fef3c7' : '#451a03'}" stroke="${gold}" stroke-width="14" rx="15"/>
                    <circle cx="${x + w / 2}" cy="${y + h / 2}" r="${burnerR}" fill="${gold}" stroke="${isWhite ? '#78350f' : '#fef08a'}" stroke-width="6"/>
                    <circle cx="${x + w * 0.22}" cy="${y + h / 2}" r="30" fill="${gold}"/>
                    <circle cx="${x + w * 0.78}" cy="${y + h / 2}" r="30" fill="${gold}"/>
                    <text x="${x + w / 2}" y="${y + h - 50}" text-anchor="middle" font-size="80" font-weight="bold" fill="${gold}">BÀN THỜ GIA TIÊN</text>
                </g>
            `;
        }

        case 'stairs_flight': {
            const stepCount = 14;
            const stepH = h / stepCount;
            let stepsSvg = '';
            for (let i = 1; i < stepCount; i++) {
                stepsSvg += `<line x1="${x}" y1="${y + i * stepH}" x2="${x + w}" y2="${y + i * stepH}" stroke="${stroke}" stroke-width="6"/>`;
            }
            const arrowX = x + w / 2;
            return `
                <g id="${item.id}" class="cad-furniture stairs">
                    <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}" stroke="${stroke}" stroke-width="12"/>
                    ${stepsSvg}
                    <line x1="${arrowX}" y1="${y}" x2="${arrowX}" y2="${y + h}" stroke="${accent}" stroke-width="8" stroke-dasharray="40,20"/>
                    <circle cx="${arrowX}" cy="${y + h - 140}" r="35" fill="${accent}"/>
                    <polygon points="${arrowX},${y + 100} ${arrowX - 45},${y + 190} ${arrowX + 45},${y + 190}" fill="${accent}"/>
                    <text x="${x + w - 60}" y="${y + h - 50}" text-anchor="end" font-size="70" font-weight="bold" fill="${accent}">21 BẬC</text>
                </g>
            `;
        }

        case 'garage_car': {
            return `
                <g id="${item.id}" class="cad-furniture car">
                    <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="none" stroke="${accent}" stroke-width="8" stroke-dasharray="50,25" rx="20"/>
                    <rect x="${x + w * 0.12}" y="${y + h * 0.1}" width="${w * 0.76}" height="${h * 0.8}" fill="${isWhite ? '#f1f5f9' : '#334155'}" stroke="${stroke}" stroke-width="10" rx="${w * 0.2}"/>
                </g>
            `;
        }

        case 'skylight_vent': {
            return `
                <g id="${item.id}" class="cad-furniture skylight">
                    <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="none" stroke="${accent}" stroke-width="8" stroke-dasharray="30,20"/>
                    <line x1="${x}" y1="${y}" x2="${x + w}" y2="${y + h}" stroke="${accent}" stroke-width="6" stroke-dasharray="25,15"/>
                    <line x1="${x + w}" y1="${y}" x2="${x}" y2="${y + h}" stroke="${accent}" stroke-width="6" stroke-dasharray="25,15"/>
                    <text x="${x + w / 2}" y="${y + h / 2 + 20}" text-anchor="middle" font-size="75" font-weight="bold" fill="${accent}">GIẾNG TRỜI</text>
                </g>
            `;
        }

        default:
            return `<rect id="${item.id}" x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}" stroke="${stroke}" stroke-width="8"/>`;
    }
}

// 4. Layout Engine Module v2.0
export function generateParametricFloorplan({
    mode = 'empty_land',
    widthM = 5.0,
    lengthM = 16.0,
    floors = 2,
    facingDegree = 180,
    roomCounts = {}
}) {
    const W = Math.round(Math.max(3.5, Math.min(30.0, parseFloat(widthM) || 5.0)) * 1000);
    const D = Math.round(Math.max(6.0, Math.min(50.0, parseFloat(lengthM) || 16.0)) * 1000);
    const totalFloors = Math.max(1, Math.min(6, parseInt(floors, 10) || 2));

    const bedrooms = Math.max(1, Math.min(8, parseInt(roomCounts.bedrooms, 10) || (totalFloors * 2 - 1)));
    const toilets = Math.max(1, Math.min(6, parseInt(roomCounts.toilets, 10) || totalFloors));
    const hasAltar = roomCounts.hasAltar !== undefined ? String(roomCounts.hasAltar) : '1';
    const hasGarage = String(roomCounts.hasGarage || '0') === '1';
    const hasSkylight = String(roomCounts.hasSkylight || '1') === '1';
    const hasCommonRoom = String(roomCounts.hasCommonRoom || '0') === '1';

    const isWideHouse = W >= 9000 && W >= D * 0.9;

    const plansByFloor = [];

    for (let f = 1; f <= totalFloors; f++) {
        let floorName = `MẶT BẰNG TẦNG ${f}`;
        if (f === 1) floorName = 'MẶT BẰNG TẦNG TRỆT';
        else if (f === totalFloors && totalFloors > 2) floorName = 'MẶT BẰNG TẦNG THƯỢNG';

        const rooms = [];
        const furniture = [];
        const doors = [];
        const windows = [];
        const walls = [];
        const columns = [];
        const dims = [];

        const wallThick = 220;
        const partThick = 110;

        walls.push({ id: 'w-out-top', x1: 0, y1: 0, x2: W, y2: 0, thickness: wallThick, type: 'outer' });
        walls.push({ id: 'w-out-bot', x1: 0, y1: D, x2: W, y2: D, thickness: wallThick, type: 'outer' });
        walls.push({ id: 'w-out-left', x1: 0, y1: 0, x2: 0, y2: D, thickness: wallThick, type: 'outer' });
        walls.push({ id: 'w-out-right', x1: W, y1: 0, x2: W, y2: D, thickness: wallThick, type: 'outer' });

        const colSpanX = W > 8000 ? Math.round(W / 3) : Math.round(W / 2);
        const colSpanY = D > 18000 ? Math.round(D / 4) : (D > 10000 ? Math.round(D / 3) : Math.round(D / 2));

        const axesX = [];
        for (let x = 0; x <= W; x += colSpanX) {
            if (x > W - 500) x = W;
            axesX.push(x);
        }
        if (!axesX.includes(W)) axesX.push(W);

        const axesY = [];
        for (let y = 0; y <= D; y += colSpanY) {
            if (y > D - 500) y = D;
            axesY.push(y);
        }
        if (!axesY.includes(D)) axesY.push(D);

        axesX.forEach((cx) => {
            axesY.forEach((cy) => {
                columns.push({ x: cx, y: cy, size: 220 });
            });
        });

        let entrancePorch = null;
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

                if (hasAltar === '2') {
                    furniture.push({ id: 'f_altar_g', type: 'altar_set', x: W - 1800, y: curY + 200, width: 1600, height: 900 });
                }

                curY += midDepth;
                walls.push({ id: 'pw_rear', x1: 0, y1: curY, x2: W, y2: curY, thickness: partThick, type: 'partition' });

                const wcW = Math.min(1800, W * 0.4);
                const kitW = W - wcW;

                rooms.push({ id: 'r_kitchen_dining', name: 'BẾP & PHÒNG ĂN', x: 0, y: curY, width: kitW, height: rearDepth, areaM2: (kitW * rearDepth) / 1000000 });
                furniture.push({ id: 'f_kitchen', type: 'kitchen_set', x: 200, y: curY + 200, width: kitW - 400, height: 650 });
                furniture.push({ id: 'f_dining', type: 'dining_set', x: 200, y: curY + rearDepth - 1600, width: kitW - 400, height: 1200 });

                rooms.push({ id: 'r_wc1', name: 'WC 1', x: kitW, y: curY, width: wcW, height: rearDepth, areaM2: (wcW * rearDepth) / 1000000 });
                furniture.push({ id: 'f_wc1', type: 'toilet_set', x: kitW + 100, y: curY + 100, width: wcW - 200, height: rearDepth - 200 });

                walls.push({ id: 'pw_wc', x1: kitW, y1: curY, x2: kitW, y2: D, thickness: partThick, type: 'partition' });
                doors.push({ id: 'd_wc1', x: kitW, y: curY + 400, width: 800, swing: 'in', rotation: 90 });
                windows.push({ id: 'win_back', x: 400, y: D, width: 1400, type: 'sliding' });
            }
        } else if (f === totalFloors && hasAltar === '1') {
            const frontD = Math.round(D * 0.35);
            const midD = Math.round(D * 0.3);
            const rearD = D - frontD - midD;

            rooms.push({ id: 'r_altar_top', name: 'PHÒNG THỜ GIA TIÊN', x: 0, y: 0, width: W, height: frontD, areaM2: (W * frontD) / 1000000 });
            furniture.push({ id: 'f_altar_top', type: 'altar_set', x: (W - 2200) / 2, y: 300, width: 2200, height: 1100 });
            windows.push({ id: 'win_altar', x: (W - 1600) / 2, y: 0, width: 1600, type: 'sliding' });

            walls.push({ id: 'pw_altar', x1: 0, y1: frontD, x2: W, y2: frontD, thickness: partThick, type: 'partition' });

            rooms.push({ id: 'r_stairs_top', name: 'SẢNH THANG TẦNG THƯỢNG', x: 0, y: frontD, width: W, height: midD, areaM2: (W * midD) / 1000000 });
            furniture.push({ id: 'f_stairs_top', type: 'stairs_flight', x: 200, y: frontD + 200, width: W * 0.5, height: midD - 400 });

            walls.push({ id: 'pw_dry', x1: 0, y1: frontD + midD, x2: W, y2: frontD + midD, thickness: partThick, type: 'partition' });

            rooms.push({ id: 'r_laundry', name: 'SÂN PHƠI & GIẶT', x: 0, y: frontD + midD, width: W, height: rearD, areaM2: (W * rearD) / 1000000 });
            furniture.push({ id: 'f_skylight_top', type: 'skylight_vent', x: W * 0.2, y: frontD + midD + 300, width: W * 0.6, height: rearD - 600 });
        } else {
            const frontD = Math.round(D * 0.4);
            const midD = Math.round(D * 0.22);
            const rearD = D - frontD - midD;

            rooms.push({ id: `r_bed_master_${f}`, name: `PHÒNG NGỦ MASTER (TẦNG ${f})`, x: 0, y: 0, width: W, height: frontD, areaM2: (W * frontD) / 1000000 });
            furniture.push({ id: `f_bed_master_${f}`, type: 'bed_master', x: (W - 2000) / 2, y: 300, width: 2000, height: frontD - 600 });
            windows.push({ id: `win_front_${f}`, x: (W - 2000) / 2, y: 0, width: 2000, type: 'sliding' });

            walls.push({ id: `pw_f_${f}`, x1: 0, y1: frontD, x2: W, y2: frontD, thickness: partThick, type: 'partition' });

            const wcW = Math.min(1800, W * 0.45);
            const stairsW = W - wcW;

            rooms.push({ id: `r_stairs_${f}`, name: hasCommonRoom ? 'SINH HOẠT CHUNG' : 'SẢNH CẦU THANG', x: 0, y: frontD, width: stairsW, height: midD, areaM2: (stairsW * midD) / 1000000 });
            furniture.push({ id: `f_stairs_${f}`, type: 'stairs_flight', x: 200, y: frontD + 100, width: stairsW - 300, height: midD - 200 });

            rooms.push({ id: `r_wc_${f}`, name: `WC TẦNG ${f}`, x: stairsW, y: frontD, width: wcW, height: midD, areaM2: (wcW * midD) / 1000000 });
            furniture.push({ id: `f_wc_${f}`, type: 'toilet_set', x: stairsW + 100, y: frontD + 100, width: wcW - 200, height: midD - 200 });

            walls.push({ id: `pw_wc_mid_${f}`, x1: stairsW, y1: frontD, x2: stairsW, y2: frontD + midD, thickness: partThick, type: 'partition' });
            walls.push({ id: `pw_r_${f}`, x1: 0, y1: frontD + midD, x2: W, y2: frontD + midD, thickness: partThick, type: 'partition' });

            rooms.push({ id: `r_bed2_${f}`, name: `PHÒNG NGỦ 2 (TẦNG ${f})`, x: 0, y: frontD + midD, width: W, height: rearD, areaM2: (W * rearD) / 1000000 });
            furniture.push({ id: `f_bed2_${f}`, type: 'bed_single', x: 300, y: frontD + midD + 300, width: 1400, height: rearD - 600 });
            windows.push({ id: `win_rear_${f}`, x: (W - 1600) / 2, y: D, width: 1600, type: 'sliding' });
        }

        dims.push({ type: 'vertical', side: 'left', tier: 1, x: -500, y1: 0, y2: D, text: `${D}` });
        dims.push({ type: 'vertical', side: 'left', tier: 2, x: -850, y1: 0, y2: D, text: `TỔNG CHIỀU DÀI: ${D} mm` });
        dims.push({ type: 'horizontal', side: 'top', tier: 1, y: -500, x1: 0, x2: W, text: `${W}` });
        dims.push({ type: 'horizontal', side: 'top', tier: 2, y: -850, x1: 0, x2: W, text: `TỔNG BỀ RỘNG: ${W} mm` });

        plansByFloor.push({
            floorIndex: f,
            floorName,
            rooms,
            walls,
            columns,
            doors,
            windows,
            furniture,
            entrancePorch,
            axesX,
            axesY,
            dimensions: dims
        });
    }

    const groundFloor = plansByFloor[0];

    return {
        widthMm: W,
        depthMm: D,
        totalFloors,
        plansByFloor,
        ...groundFloor
    };
}

// 5. SVG CAD Renderer Module v2.0
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

        const axesSvg = this.showAxes ? this.renderAxes(geometry.axesX, geometry.axesY, W, D, isWhite) : '';
        const porchSvg = geometry.entrancePorch ? this.renderPorch(geometry.entrancePorch, isWhite) : '';
        const wallsSvg = this.renderWalls(geometry.walls, isWhite);
        const columnsSvg = this.renderColumns(geometry.columns, isWhite);
        const furnitureSvg = this.showFurniture && geometry.furniture ? geometry.furniture.map(f => renderFurnitureSvg(f, isWhite)).join('\n') : '';
        const roomsSvg = this.renderRooms(geometry.rooms, isWhite);

        let doorsSvg = geometry.doors ? this.renderDoors(geometry.doors, isWhite) : '';
        let windowsSvg = geometry.windows ? this.renderWindows(geometry.windows, isWhite) : '';
        let dimsSvg = this.showDimensions ? this.renderDimensionChains(geometry, W, D, isWhite) : '';
        let compassSvg = this.showCompass ? this.renderCompassRose(W - 500, -700, 320, facingDegree, isWhite) : '';

        const boxW = Math.min(viewW - 400, 4800);
        const boxH = 320;
        const boxX = viewX + 200;
        const boxY = viewY + viewH - boxH - 120;
        const titleBlockSvg = this.renderTitleBlock(boxX, boxY, boxW, boxH, geometry, options, isWhite);

        return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewX} ${viewY} ${viewW} ${viewH}" width="100%" height="100%" class="cad-svg-drawing" style="background:${bgColor}; font-family: 'Inter', 'Noto Sans', sans-serif;">
    <defs>
        <pattern id="floorTile" width="600" height="600" patternUnits="userSpaceOnUse">
            <rect width="600" height="600" fill="none" stroke="${isWhite ? 'rgba(0,0,0,0.035)' : 'rgba(255,255,255,0.03)'}" stroke-width="6"/>
        </pattern>
        <pattern id="hatchWall" width="120" height="120" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
            <line x1="0" y1="0" x2="0" y2="120" stroke="${isWhite ? '#94a3b8' : '#475569'}" stroke-width="12" />
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
    <g id="layer-openings">${doorsSvg}${windowsSvg}</g>
    <g id="layer-dimensions">${dimsSvg}</g>
    <g id="layer-compass">${compassSvg}</g>
    <g id="layer-title-block">${titleBlockSvg}</g>
</svg>
        `.trim();
    }

    renderAxes(axesX, axesY, W, D, isWhite) {
        const bubbleR = 150;
        const color = isWhite ? '#0284c7' : '#38bdf8';
        const lineStroke = isWhite ? '#94a3b8' : '#475569';
        const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];

        let lines = '';
        let bubbles = '';

        axesX.forEach((x, idx) => {
            const num = (idx + 1).toString();
            lines += `<line x1="${x}" y1="-700" x2="${x}" y2="${D + 700}" stroke="${lineStroke}" stroke-width="8" stroke-dasharray="100,50,20,50"/>`;
            bubbles += `
                <circle cx="${x}" cy="-700" r="${bubbleR}" fill="${isWhite ? '#ffffff' : '#0f172a'}" stroke="${color}" stroke-width="10"/>
                <text x="${x}" y="-650" text-anchor="middle" font-size="120" font-weight="900" fill="${color}">${num}</text>
                <circle cx="${x}" cy="${D + 700}" r="${bubbleR}" fill="${isWhite ? '#ffffff' : '#0f172a'}" stroke="${color}" stroke-width="10"/>
                <text x="${x}" y="${D + 750}" text-anchor="middle" font-size="120" font-weight="900" fill="${color}">${num}</text>
            `;
        });

        axesY.forEach((y, idx) => {
            const letter = letters[idx % letters.length];
            lines += `<line x1="-700" y1="${y}" x2="${W + 700}" y2="${y}" stroke="${lineStroke}" stroke-width="8" stroke-dasharray="100,50,20,50"/>`;
            bubbles += `
                <circle cx="-700" cy="${y}" r="${bubbleR}" fill="${isWhite ? '#ffffff' : '#0f172a'}" stroke="${color}" stroke-width="10"/>
                <text x="-700" y="${y + 45}" text-anchor="middle" font-size="120" font-weight="900" fill="${color}">${letter}</text>
                <circle cx="${W + 700}" cy="${y}" r="${bubbleR}" fill="${isWhite ? '#ffffff' : '#0f172a'}" stroke="${color}" stroke-width="10"/>
                <text x="${W + 700}" y="${y + 45}" text-anchor="middle" font-size="120" font-weight="900" fill="${color}">${letter}</text>
            `;
        });

        return `<g class="cad-grid-axes">${lines}${bubbles}</g>`;
    }

    renderPorch(porch, isWhite) {
        const { x, y, width: w, height: h, steps, pillars } = porch;
        const stepH = h / steps;
        let svg = '';

        for (let i = 0; i < steps; i++) {
            const sx = x + (i * 120);
            const sw = w - (i * 240);
            const sy = y + (i * stepH);
            const fill = isWhite ? (i % 2 === 0 ? '#e2e8f0' : '#f8fafc') : (i % 2 === 0 ? '#1e293b' : '#334155');
            svg += `<rect x="${sx}" y="${sy}" width="${sw}" height="${stepH}" fill="${fill}" stroke="${isWhite ? '#64748b' : '#94a3b8'}" stroke-width="10"/>`;
        }

        if (pillars && pillars.length > 0) {
            pillars.forEach(p => {
                svg += `
                    <rect x="${p.x}" y="${p.y}" width="${p.size}" height="${p.size}" fill="${isWhite ? '#0f172a' : '#f8fafc'}" stroke="${isWhite ? '#0284c7' : '#38bdf8'}" stroke-width="10"/>
                    <circle cx="${p.x + p.size / 2}" cy="${p.y + p.size / 2}" r="35" fill="#ef4444"/>
                `;
            });
        }

        return svg;
    }

    renderRooms(rooms, isWhite) {
        return rooms.map(r => {
            const cx = r.x + r.width / 2;
            const cy = r.y + r.height / 2;
            return `
                <g id="${r.id}" class="cad-room-label">
                    <rect x="${cx - 750}" y="${cy - 160}" width="1500" height="280" fill="${isWhite ? 'rgba(255,255,255,0.92)' : 'rgba(15,23,42,0.92)'}" stroke="${isWhite ? '#cbd5e1' : '#334155'}" stroke-width="10" rx="20"/>
                    <text x="${cx}" y="${cy - 20}" text-anchor="middle" font-size="110" font-weight="900" fill="${isWhite ? '#0f172a' : '#f8fafc'}">${r.name}</text>
                    <text x="${cx}" y="${cy + 75}" text-anchor="middle" font-size="85" font-weight="700" fill="${isWhite ? '#0284c7' : '#38bdf8'}">${r.areaM2.toFixed(2)} m²</text>
                </g>
            `;
        }).join('\n');
    }

    renderWalls(walls, isWhite) {
        return walls.map(w => {
            const strokeColor = w.type === 'outer' ? (isWhite ? '#0f172a' : '#f1f5f9') : (isWhite ? '#334155' : '#94a3b8');
            const strokeW = w.type === 'outer' ? 35 : 20;
            return `
                <line x1="${w.x1}" y1="${w.y1}" x2="${w.x2}" y2="${w.y2}" stroke="${strokeColor}" stroke-width="${strokeW}" stroke-linecap="square"/>
                <line x1="${w.x1}" y1="${w.y1}" x2="${w.x2}" y2="${w.y2}" stroke="${isWhite ? '#64748b' : '#475569'}" stroke-width="6" stroke-dasharray="80,40"/>
            `;
        }).join('\n');
    }

    renderColumns(columns, isWhite) {
        return columns.map((col, idx) => {
            const size = col.size || 220;
            const cx = col.x - size / 2;
            const cy = col.y - size / 2;
            return `
                <g id="col-${idx}">
                    <rect x="${cx}" y="${cy}" width="${size}" height="${size}" fill="${isWhite ? '#0f172a' : '#f8fafc'}" stroke="${isWhite ? '#0284c7' : '#38bdf8'}" stroke-width="10"/>
                    <line x1="${cx}" y1="${cy}" x2="${cx + size}" y2="${cy + size}" stroke="${isWhite ? '#cbd5e1' : '#475569'}" stroke-width="6"/>
                    <line x1="${cx + size}" y1="${cy}" x2="${cx}" y2="${cy + size}" stroke="${isWhite ? '#cbd5e1' : '#475569'}" stroke-width="6"/>
                </g>
            `;
        }).join('\n');
    }

    renderDoors(doors, isWhite) {
        const stroke = isWhite ? '#0f172a' : '#f8fafc';
        const arcStroke = isWhite ? '#0284c7' : '#38bdf8';

        return doors.map(d => {
            const { x, y, width: w } = d;
            return `
                <g id="${d.id}" class="cad-door">
                    <line x1="${x}" y1="${y}" x2="${x}" y2="${y + w}" stroke="${stroke}" stroke-width="14"/>
                    <path d="M ${x} ${y + w} A ${w} ${w} 0 0 1 ${x + w} ${y}" fill="none" stroke="${arcStroke}" stroke-width="8" stroke-dasharray="30,15"/>
                </g>
            `;
        }).join('\n');
    }

    renderWindows(windows, isWhite) {
        const stroke = isWhite ? '#0284c7' : '#38bdf8';
        return windows.map(win => {
            const { x, y, width: w } = win;
            return `
                <g id="${win.id}" class="cad-window">
                    <rect x="${x}" y="${y - 40}" width="${w}" height="80" fill="${isWhite ? '#f0f9ff' : '#0369a1'}" stroke="${stroke}" stroke-width="10"/>
                    <line x1="${x}" y1="${y}" x2="${x + w}" y2="${y}" stroke="${stroke}" stroke-width="6"/>
                </g>
            `;
        }).join('\n');
    }

    renderDimensionChains(geometry, W, D, isWhite) {
        const color = isWhite ? '#334155' : '#cbd5e1';
        let svg = '';

        svg += `
            <line x1="-350" y1="0" x2="-350" y2="${D}" stroke="${color}" stroke-width="8"/>
            <line x1="-420" y1="0" x2="-280" y2="0" stroke="${color}" stroke-width="6"/>
            <line x1="-420" y1="${D}" x2="-280" y2="${D}" stroke="${color}" stroke-width="6"/>
            <line x1="-390" y1="40" x2="-310" y2="-40" stroke="${color}" stroke-width="12"/>
            <line x1="-390" y1="${D + 40}" x2="-310" y2="${D - 40}" stroke="${color}" stroke-width="12"/>
            <text x="-400" y="${D / 2}" text-anchor="middle" transform="rotate(-90 -400 ${D / 2})" font-size="95" font-weight="900" fill="${color}">${D}</text>
        `;

        svg += `
            <line x1="0" y1="-350" x2="${W}" y2="-350" stroke="${color}" stroke-width="8"/>
            <line x1="0" y1="-420" x2="0" y2="-280" stroke="${color}" stroke-width="6"/>
            <line x1="${W}" y1="-420" x2="${W}" y2="-280" stroke="${color}" stroke-width="6"/>
            <line x1="-40" y1="-310" x2="40" y2="-390" stroke="${color}" stroke-width="12"/>
            <line x1="${W - 40}" y1="-310" x2="${W + 40}" y2="-390" stroke="${color}" stroke-width="12"/>
            <text x="${W / 2}" y="-400" text-anchor="middle" font-size="95" font-weight="900" fill="${color}">${W}</text>
        `;

        return `<g id="dimension-chains">${svg}</g>`;
    }

    renderCompassRose(cx, cy, r, facingDeg, isWhite) {
        return `
            <g id="compass-rose" transform="translate(${cx}, ${cy})">
                <circle cx="0" cy="0" r="${r}" fill="${isWhite ? '#ffffff' : '#0f172a'}" stroke="${isWhite ? '#cbd5e1' : '#334155'}" stroke-width="15"/>
                <polygon points="0,${-r + 40} -40,0 40,0" fill="#ef4444"/>
                <polygon points="0,${r - 40} -40,0 40,0" fill="${isWhite ? '#64748b' : '#94a3b8'}"/>
                <text x="0" y="${-r - 30}" text-anchor="middle" font-size="90" font-weight="bold" fill="#ef4444">BẮC</text>
                <text x="0" y="${r + 90}" text-anchor="middle" font-size="80" font-weight="bold" fill="${isWhite ? '#64748b' : '#94a3b8'}">NAM</text>
            </g>
        `;
    }

    renderTitleBlock(x, y, w, h, geometry, options, isWhite) {
        const padX = 80;
        return `
            <g id="architectural-title-block">
                <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${isWhite ? 'rgba(255,255,255,0.96)' : 'rgba(15,23,42,0.96)'}" stroke="${isWhite ? '#0284c7' : '#d97706'}" stroke-width="20" rx="15"/>
                <text x="${x + padX}" y="${y + 85}" font-size="110" font-weight="900" fill="${isWhite ? '#0f172a' : '#fef08a'}">${(geometry.floorName || 'MẶT BẰNG TƯ VẤN THIẾT KẾ').toUpperCase()}</text>
                <text x="${x + padX}" y="${y + 165}" font-size="75" font-weight="600" fill="${isWhite ? '#475569' : '#cbd5e1'}">Kích thước: ${(geometry.widthMm / 1000).toFixed(2)}m × ${(geometry.depthMm / 1000).toFixed(2)}m · Diện tích: ${(geometry.widthMm * geometry.depthMm / 1000000).toFixed(1)} m²</text>
                <text x="${x + padX}" y="${y + 245}" font-size="75" font-weight="700" fill="${isWhite ? '#0284c7' : '#38bdf8'}">Tư vấn: DỊCH SƯ NGUYỄN HUY HOÀNG — 0933 116 860 · Huyền Không Vận 9</text>
            </g>
        `;
    }
}

// 6. Feng Shui Spatial Engine Module v2.0
export function calculateFengShuiSpatial(geometry, options = {}) {
    const {
        facingDegree = 180,
        buildYear = 2025,
        currentYear = 2026,
        currentMonth = 8,
        currentDay = 19,
        currentHour = 7,
        ownerYear = 1990,
        ownerGender = 'nam',
        frontLandscape = 'duong_lo',
        backLandscape = 'nha_cao'
    } = options;

    const flyingStars = calculateFlyingStars({
        facingDegree,
        buildYear,
        currentYear,
        currentMonth,
        currentDay,
        currentHour,
        frontLandscape,
        backLandscape
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

            const palaceBox = {
                palaceId,
                palaceName: PALACE_NAMES[palaceId],
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
                isSitting: starData.isSitting
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

                <circle cx="${cx + badgeSpacing * 1.5}" cy="${timeBadgesY}" r="45" fill="#eab308" stroke="#a16207" stroke-width="4"/>
                <text x="${cx + badgeSpacing * 1.5}" y="${timeBadgesY + 16}" text-anchor="middle" font-size="45" font-weight="900" fill="#000000">${thoiStar}</text>
            </g>
        `;

        const mainStarY = cy + 30;
        const offsetSide = Math.min(220, w * 0.24);

        const trioStarsSvg = `
            <g class="trio-flying-stars">
                <rect x="${cx - offsetSide - 75}" y="${mainStarY - 80}" width="150" height="160" fill="#facc15" stroke="#ca8a04" stroke-width="6" rx="20"/>
                <text x="${cx - offsetSide}" y="${mainStarY + 35}" text-anchor="middle" font-size="110" font-weight="900" fill="#000000">${sonStar}</text>

                <text x="${cx}" y="${mainStarY + 45}" text-anchor="middle" font-size="160" font-weight="900" fill="${isWhite ? '#0f172a' : '#f8fafc'}">${vanStar}</text>

                <circle cx="${cx + offsetSide}" cy="${mainStarY}" r="80" fill="#dc2626" stroke="#b91c1c" stroke-width="6"/>
                <text x="${cx + offsetSide}" y="${mainStarY + 35}" text-anchor="middle" font-size="110" font-weight="900" fill="#ffffff">${huongStar}</text>
            </g>
        `;

        const labelY = y + h - Math.min(100, h * 0.12);
        const palaceTag = isFacing ? `${short} (HƯỚNG)` : (isSitting ? `${short} (TỌA)` : short);

        cellsSvg += `
            <g id="palace-cell-${box.row}-${box.col}" class="palace-cell">
                <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${cellFill}" stroke="${cellStroke}" stroke-width="12" stroke-dasharray="30,15"/>
                ${timeBadgesSvg}
                ${trioStarsSvg}
                <text x="${cx}" y="${labelY}" text-anchor="middle" font-size="95" font-weight="900" fill="${isFacing ? '#dc2626' : (isSitting ? '#2563eb' : (isWhite ? '#475569' : '#cbd5e1'))}">${palaceTag}</text>
            </g>
        `;
    });

    const arrowW = 160;
    const facingArrowSvg = `
        <g id="arrow-facing-top">
            <line x1="${W / 2}" y1="-200" x2="${W / 2}" y2="-600" stroke="#ef4444" stroke-width="16"/>
            <polygon points="${W / 2},-750 ${W / 2 - arrowW},-550 ${W / 2 + arrowW},-550" fill="#ef4444"/>
            <rect x="${W / 2 - 450}" y="-1050" width="900" height="240" fill="#ef4444" rx="30"/>
            <text x="${W / 2}" y="-890" text-anchor="middle" font-size="120" font-weight="900" fill="#ffffff">HƯỚNG ${flyingStars.facingMountain.toUpperCase()} (${flyingStars.facingDegree}°)</text>
        </g>
    `;

    const sittingArrowSvg = `
        <g id="arrow-sitting-bottom">
            <line x1="${W / 2}" y1="${D + 200}" x2="${W / 2}" y2="${D + 600}" stroke="#3b82f6" stroke-width="16"/>
            <polygon points="${W / 2},${D + 750} ${W / 2 - arrowW},${D + 550} ${W / 2 + arrowW},${D + 550}" fill="#3b82f6"/>
            <rect x="${W / 2 - 450}" y="${D + 820}" width="900" height="240" fill="#3b82f6" rx="30"/>
            <text x="${W / 2}" y="${D + 980}" text-anchor="middle" font-size="120" font-weight="900" fill="#ffffff">TỌA ${flyingStars.sittingMountain.toUpperCase()}</text>
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

// 7. Bát Trạch Quái Mệnh
export function calculateGua(birthYear, gender = 'nam') {
    const y = parseInt(birthYear, 10);
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

    const isNam = gender.toLowerCase() === 'nam' || gender === '1';

    let guaNum = 1;
    let guaName = '';
    let trach = '';

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

// 8. Thước Lỗ Ban
export function checkLoBan(lengthMm, type = '522') {
    const cycle = type === '522' ? 522 : 429;
    const cungNames522 = ['Quý Nhân', 'Hiểm Họa', 'Thiên Tai', 'Thiên Tài', 'Nhân Lộc', 'Cô Độc', 'Thiên Tặc', 'Tể Tướng'];
    const rem = lengthMm % cycle;
    const cungIdx = Math.floor((rem / cycle) * 8);
    const cung = cungNames522[cungIdx] || cungNames522[0];
    const isCat = ['Quý Nhân', 'Thiên Tài', 'Nhân Lộc', 'Tể Tướng'].includes(cung);
    return {
        lengthMm,
        type,
        cung,
        isCat
    };
}

// 9. Interactive SVG Viewport Controller
export class SvgViewportController {
    constructor(containerElement, stageElement) {
        this.container = containerElement;
        this.stage = stageElement;
        this.scale = 1.0;
        this.panX = 0;
        this.panY = 0;
        this.isDragging = false;
        this.startX = 0;
        this.startY = 0;
        this.initialDistance = null;
        this.initialScale = 1.0;

        this.initEvents();
    }

    initEvents() {
        if (!this.container) return;

        this.container.addEventListener('wheel', (e) => {
            e.preventDefault();
            const zoomFactor = e.deltaY < 0 ? 1.15 : 0.85;
            this.setZoom(this.scale * zoomFactor);
        }, { passive: false });

        this.container.addEventListener('mousedown', (e) => {
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

        this.container.addEventListener('touchstart', (e) => {
            if (e.touches.length === 1) {
                this.isDragging = true;
                this.startX = e.touches[0].clientX - this.panX;
                this.startY = e.touches[0].clientY - this.panY;
            } else if (e.touches.length === 2) {
                this.isDragging = false;
                this.initialDistance = Math.hypot(
                    e.touches[0].clientX - e.touches[1].clientX,
                    e.touches[0].clientY - e.touches[1].clientY
                );
                this.initialScale = this.scale;
            }
        }, { passive: true });

        this.container.addEventListener('touchmove', (e) => {
            if (e.touches.length === 1 && this.isDragging) {
                this.panX = e.touches[0].clientX - this.startX;
                this.panY = e.touches[0].clientY - this.startY;
                this.updateTransform();
            } else if (e.touches.length === 2 && this.initialDistance) {
                const currentDist = Math.hypot(
                    e.touches[0].clientX - e.touches[1].clientX,
                    e.touches[0].clientY - e.touches[1].clientY
                );
                const ratio = currentDist / this.initialDistance;
                this.setZoom(this.initialScale * ratio);
            }
        }, { passive: true });

        this.container.addEventListener('touchend', () => {
            this.isDragging = false;
            this.initialDistance = null;
        });
    }

    setZoom(newScale) {
        this.scale = Math.max(0.2, Math.min(8.0, newScale));
        this.updateTransform();
    }

    zoomIn() {
        this.setZoom(this.scale * 1.25);
    }

    zoomOut() {
        this.setZoom(this.scale * 0.8);
    }

    fit() {
        this.scale = 1.0;
        this.panX = 0;
        this.panY = 0;
        this.updateTransform();
    }

    updateTransform() {
        if (!this.stage) return;
        this.stage.style.transform = `translate(${this.panX}px, ${this.panY}px) scale(${this.scale})`;
    }
}
