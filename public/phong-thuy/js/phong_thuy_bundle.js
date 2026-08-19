// ============================================================
// Phong Thủy & Kiến Trúc Core Bundle (Parametric CAD & Xuan Kong)
// Tác giả: Dịch Sư Nguyễn Huy Hoàng
// Self-contained Standalone ES Module
// ============================================================

// ============================================================
// 1. COMPUTATIONAL GEOMETRY ENGINE (MILLIMETER-BASED)
// ============================================================
export function areaM2(r) {
    return Math.round((r.width * r.height / 1000000) * 100) / 100;
}

export function centerOfRect(r) {
    return { x: r.x + r.width / 2, y: r.y + r.height / 2 };
}

export function overlaps(a, b, gap = 0) {
    return !(
        a.x + a.width + gap <= b.x ||
        b.x + b.width + gap <= a.x ||
        a.y + a.height + gap <= b.y ||
        b.y + b.height + gap <= a.y
    );
}

export function inside(a, boundary, margin = 0) {
    return (
        a.x >= boundary.x + margin &&
        a.y >= boundary.y + margin &&
        a.x + a.width <= boundary.x + boundary.width - margin &&
        a.y + a.height <= boundary.y + boundary.height - margin
    );
}

export function rotatePoint(p, center, deg) {
    const rad = (deg * Math.PI) / 180;
    const cos = Math.cos(rad);
    const sin = Math.sin(rad);
    const dx = p.x - center.x;
    const dy = p.y - center.y;
    return {
        x: center.x + dx * cos - dy * sin,
        y: center.y + dx * sin + dy * cos
    };
}

export function distance(p1, p2) {
    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;
    return Math.sqrt(dx * dx + dy * dy);
}

// ============================================================
// 2. HUYỀN KHÔNG PHI TINH ENGINE
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

export const STAR_PROPERTIES = {
    1: { name: 'Nhất Bạch Tham Lang', element: 'Thủy', nature: 'Cát Tinh', meaning: 'Văn chương, trí tuệ, tài lộc, đào hoa quý nhân' },
    2: { name: 'Nhị Hắc Cự Môn',    element: 'Thổ',  nature: 'Hung Tinh (Bệnh Phù)', meaning: 'Bệnh tật, tai ách, u sầu, tổn thất thân thể' },
    3: { name: 'Tam Bích Lộc Tồn',   element: 'Mộc',  nature: 'Hung Tinh (Si Vưu)', meaning: 'Thị phi, tranh chấp, kiện tụng, khẩu thiệt' },
    4: { name: 'Tứ Lục Văn Khúc',    element: 'Mộc',  nature: 'Cát Tinh (Văn Xương)', meaning: 'Học vấn, công danh, thi cử, nghệ thuật' },
    5: { name: 'Ngũ Hoàng Liêm Trinh', element: 'Thổ', nature: 'Đại Hung Tinh (Chính Quan Sát)', meaning: 'Đại sát, tai họa khôn lường, phá tài thương tổn' },
    6: { name: 'Lục Bạch Vũ Khúc',   element: 'Kim',  nature: 'Cát Tinh (Vũ Khúc)', meaning: 'Quyền uy, chức tước, quý nhân phò trợ' },
    7: { name: 'Thất Xích Phá Quân',  element: 'Kim',  nature: 'Bình / Hung (Tặc Đạo)', meaning: 'Trộm cắp, phá tán, phẫu thuật, khẩu thiệt thị phi' },
    8: { name: 'Bát Bạch Tả Phụ',   element: 'Thổ',  nature: 'Đại Cát Tinh', meaning: 'Điền sản, tài lộc dồi dào, phúc lộc thăng tiến' },
    9: { name: 'Cửu Tử Hữu Bật',    element: 'Hỏa',  nature: 'Đương Vận Cát Tinh (Vận 9)', meaning: 'Hỷ khánh, danh tiếng vang dội, phát đạt tức thì' }
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

export function findMountain(degree) {
    let deg = ((degree % 360) + 360) % 360;
    for (let m of MOUNTAINS) {
        let diff = Math.abs(deg - m.center);
        if (diff > 180) diff = 360 - diff;
        if (diff <= 7.5) {
            const isChinhHuong = diff <= 4.5;
            return { mountain: m, diff: diff, type: isChinhHuong ? 'chinh_huong' : 'kiem_huong' };
        }
    }
    return { mountain: MOUNTAINS[1], diff: 0, type: 'chinh_huong' };
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

export function calculateFlyingStars({ facingDegree = 180, buildYear = 2025 }) {
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

    const currentYear = new Date().getFullYear();
    const annualDiff = (currentYear - 2024) % 9;
    const nienCenter = wrapStar(9 - annualDiff);
    const nienChart = flyStars(nienCenter, false);

    const palaces = {};
    for (let p = 1; p <= 9; p++) {
        palaces[p] = {
            palaceId: p,
            palaceName: PALACE_NAMES[p],
            vanStar: vanChart[p],
            sonStar: sonChart[p],
            huongStar: huongChart[p],
            nienStar: nienChart[p],
            isFacing: p === facingM.palace,
            isSitting: p === sittingM.palace
        };
    }

    return {
        van,
        facingDegree,
        facingMountain: facingM.name,
        sittingMountain: sittingM.name,
        isKiemHuong,
        palaces
    };
}

// ============================================================
// 3. BÁT TRẠCH PHỐI MỆNH ENGINE
// ============================================================
export const GUA_NAMES = {
    1: 'Khảm (Thủy - Đông Tứ Mệnh)',
    2: 'Khôn (Thổ - Tây Tứ Mệnh)',
    3: 'Chấn (Mộc - Đông Tứ Mệnh)',
    4: 'Tốn (Mộc - Đông Tứ Mệnh)',
    6: 'Càn (Kim - Tây Tứ Mệnh)',
    7: 'Đoài (Kim - Tây Tứ Mệnh)',
    8: 'Cấn (Thổ - Tây Tứ Mệnh)',
    9: 'Ly (Hỏa - Đông Tứ Mệnh)'
};

export function calculateGua(lunarYear, gender = 'nam') {
    const y = parseInt(lunarYear, 10) || 1990;
    const sumDigits = (n) => String(n).split('').reduce((acc, d) => acc + parseInt(d, 10), 0);
    let s = sumDigits(y);
    while (s > 9) s = sumDigits(s);

    let gua = 1;
    if (y < 2000) {
        gua = (gender === 'nam') ? (10 - s) : (s + 5);
    } else {
        gua = (gender === 'nam') ? (9 - s) : (s + 6);
    }
    while (gua > 9) gua = sumDigits(gua);
    if (gua <= 0) gua += 9;
    if (gua === 5) gua = (gender === 'nam') ? 2 : 8;

    const dongTu = [1, 3, 4, 9];
    const trachGroup = dongTu.includes(gua) ? 'Đông Tứ Mệnh' : 'Tây Tứ Mệnh';

    return { guaNumber: gua, guaName: GUA_NAMES[gua] || 'Khảm', trachGroup };
}

// ============================================================
// 4. THƯỚC LỖ BAN HELPER
// ============================================================
export function checkLoBan(lengthMm, type = '522') {
    const mm = parseFloat(lengthMm) || 0;
    if (type === '522') {
        const cycle = 522;
        const pos = (mm % cycle);
        const cungIdx = Math.floor(pos / (cycle / 8));
        const cungs = [
            { name: 'Quý Nhân', isGood: true },
            { name: 'Hiểm Họa', isGood: false },
            { name: 'Thiên Tai', isGood: false },
            { name: 'Thiên Tài', isGood: true },
            { name: 'Nhân Lộc', isGood: true },
            { name: 'Cô Độc', isGood: false },
            { name: 'Thiên Tặc', isGood: false },
            { name: 'Tể Tướng', isGood: true }
        ];
        const match = cungs[cungIdx] || cungs[0];
        return { cung: match.name, isGood: match.isGood };
    }
    return { cung: 'Thông Thủy Đại Cát', isGood: true };
}

// ============================================================
// 5. VECTOR FURNITURE SYMBOLS (PURE SVG)
// ============================================================
export function renderFurnitureSvg(item, isWhite = true) {
    const { x, y, width: w, height: h, type } = item;
    const stroke = isWhite ? '#334155' : '#cbd5e1';
    const fill = isWhite ? '#f8fafc' : '#1e293b';
    const accent = isWhite ? '#0284c7' : '#38bdf8';
    const gold = isWhite ? '#b45309' : '#fbbf24';

    switch (type) {
        case 'sofa_living': {
            const armW = Math.min(250, w * 0.12);
            const backD = Math.min(300, h * 0.22);
            const tableW = Math.min(1200, w * 0.45);
            const tableH = Math.min(700, h * 0.35);
            const tx = x + (w - tableW) / 2;
            const ty = y + h - tableH - 100;
            return `
                <g id="${item.id}" class="cad-furniture sofa">
                    <rect x="${x - 100}" y="${y - 100}" width="${w + 200}" height="${h + 200}" fill="${isWhite ? '#f1f5f9' : '#0f172a'}" stroke="${isWhite ? '#e2e8f0' : '#334155'}" stroke-dasharray="80,40" stroke-width="20" rx="60"/>
                    <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}" stroke="${stroke}" stroke-width="35" rx="80"/>
                    <rect x="${x}" y="${y}" width="${w}" height="${backD}" fill="${isWhite ? '#e2e8f0' : '#334155'}" stroke="${stroke}" stroke-width="25"/>
                    <rect x="${x}" y="${y}" width="${armW}" height="${h}" fill="${isWhite ? '#e2e8f0' : '#334155'}" stroke="${stroke}" stroke-width="25"/>
                    <rect x="${x + w - armW}" y="${y}" width="${armW}" height="${h}" fill="${isWhite ? '#e2e8f0' : '#334155'}" stroke="${stroke}" stroke-width="25"/>
                    <rect x="${tx}" y="${ty}" width="${tableW}" height="${tableH}" fill="${isWhite ? '#e0f2fe' : '#1e3a8a'}" stroke="${accent}" stroke-width="30" rx="40"/>
                </g>
            `;
        }
        case 'dining_set': {
            const chairW = Math.min(450, w / 3.5);
            const chairD = 350;
            const chairSpacing = (w - chairW * 3) / 4;
            let chairsSvg = '';
            for (let i = 0; i < 3; i++) {
                const cx = x + chairSpacing * (i + 1) + chairW * i;
                chairsSvg += `<rect x="${cx}" y="${y - chairD + 50}" width="${chairW}" height="${chairD}" fill="${isWhite ? '#e2e8f0' : '#334155'}" stroke="${stroke}" stroke-width="25" rx="40"/>`;
                chairsSvg += `<rect x="${cx}" y="${y + h - 50}" width="${chairW}" height="${chairD}" fill="${isWhite ? '#e2e8f0' : '#334155'}" stroke="${stroke}" stroke-width="25" rx="40"/>`;
            }
            return `
                <g id="${item.id}" class="cad-furniture dining">
                    ${chairsSvg}
                    <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}" stroke="${stroke}" stroke-width="35" rx="60"/>
                    <circle cx="${x + w * 0.25}" cy="${y + h / 2}" r="120" fill="none" stroke="${stroke}" stroke-width="20"/>
                    <circle cx="${x + w * 0.5}" cy="${y + h / 2}" r="120" fill="none" stroke="${stroke}" stroke-width="20"/>
                    <circle cx="${x + w * 0.75}" cy="${y + h / 2}" r="120" fill="none" stroke="${stroke}" stroke-width="20"/>
                </g>
            `;
        }
        case 'kitchen_set': {
            const hobX = x + w * 0.25;
            const sinkX = x + w * 0.7;
            return `
                <g id="${item.id}" class="cad-furniture kitchen">
                    <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}" stroke="${stroke}" stroke-width="35"/>
                    <rect x="${hobX - 350}" y="${y + 80}" width="700" height="${h - 160}" fill="${isWhite ? '#fee2e2' : '#450a0a'}" stroke="#ef4444" stroke-width="25" rx="30"/>
                    <circle cx="${hobX - 160}" cy="${y + h / 2}" r="110" fill="none" stroke="#ef4444" stroke-width="25"/>
                    <circle cx="${hobX + 160}" cy="${y + h / 2}" r="110" fill="none" stroke="#ef4444" stroke-width="25"/>
                    <rect x="${sinkX - 450}" y="${y + 80}" width="900" height="${h - 160}" fill="${isWhite ? '#e0f2fe' : '#0c4a6e'}" stroke="${accent}" stroke-width="25" rx="20"/>
                </g>
            `;
        }
        case 'bed_master': {
            const pillowW = (w - 300) / 2;
            const pillowH = Math.min(450, h * 0.22);
            const nightstandSize = 400;
            return `
                <g id="${item.id}" class="cad-furniture bed-master">
                    <rect x="${x - nightstandSize - 50}" y="${y}" width="${nightstandSize}" height="${nightstandSize}" fill="${fill}" stroke="${stroke}" stroke-width="25" rx="20"/>
                    <rect x="${x + w + 50}" y="${y}" width="${nightstandSize}" height="${nightstandSize}" fill="${fill}" stroke="${stroke}" stroke-width="25" rx="20"/>
                    <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}" stroke="${stroke}" stroke-width="35" rx="50"/>
                    <rect x="${x}" y="${y}" width="${w}" height="150" fill="${isWhite ? '#cbd5e1' : '#475569'}" stroke="${stroke}" stroke-width="25"/>
                    <rect x="${x + 80}" y="${y + 180}" width="${pillowW}" height="${pillowH}" fill="${isWhite ? '#ffffff' : '#334155'}" stroke="${stroke}" stroke-width="20" rx="30"/>
                    <rect x="${x + w - pillowW - 80}" y="${y + 180}" width="${pillowW}" height="${pillowH}" fill="${isWhite ? '#ffffff' : '#334155'}" stroke="${stroke}" stroke-width="20" rx="30"/>
                    <path d="M ${x} ${y + h * 0.45} Q ${x + w / 2} ${y + h * 0.52} ${x + w} ${y + h * 0.45} L ${x + w} ${y + h} L ${x} ${y + h} Z" fill="${isWhite ? '#fef3c7' : '#451a03'}" stroke="${gold}" stroke-width="25"/>
                </g>
            `;
        }
        case 'bed_single': {
            const pillowW = w - 300;
            const pillowH = Math.min(420, h * 0.22);
            return `
                <g id="${item.id}" class="cad-furniture bed-single">
                    <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}" stroke="${stroke}" stroke-width="30" rx="40"/>
                    <rect x="${x}" y="${y}" width="${w}" height="120" fill="${isWhite ? '#cbd5e1' : '#475569'}" stroke="${stroke}" stroke-width="20"/>
                    <rect x="${x + 150}" y="${y + 150}" width="${pillowW}" height="${pillowH}" fill="${isWhite ? '#ffffff' : '#334155'}" stroke="${stroke}" stroke-width="20" rx="25"/>
                    <path d="M ${x} ${y + h * 0.48} Q ${x + w / 2} ${y + h * 0.54} ${x + w} ${y + h * 0.48} L ${x + w} ${y + h} L ${x} ${y + h} Z" fill="${isWhite ? '#e0f2fe' : '#082f49'}" stroke="${accent}" stroke-width="25"/>
                </g>
            `;
        }
        case 'toilet_set': {
            const showerW = Math.min(1000, w * 0.45);
            const toiletW = Math.min(500, w * 0.3);
            const toiletD = Math.min(700, h * 0.45);
            return `
                <g id="${item.id}" class="cad-furniture toilet">
                    <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}" stroke="${stroke}" stroke-width="25" stroke-dasharray="100,50"/>
                    <rect x="${x + 50}" y="${y + 50}" width="${showerW}" height="${h - 100}" fill="${isWhite ? '#f0f9ff' : '#0369a1'}" stroke="${accent}" stroke-width="25" opacity="0.6"/>
                    <g transform="translate(${x + w - toiletW - 80}, ${y + 80})">
                        <rect x="0" y="0" width="${toiletW}" height="220" fill="${isWhite ? '#ffffff' : '#475569'}" stroke="${stroke}" stroke-width="25" rx="20"/>
                        <ellipse cx="${toiletW / 2}" cy="${toiletD / 2 + 100}" rx="${toiletW / 2 - 20}" ry="${toiletD / 2 - 40}" fill="${isWhite ? '#ffffff' : '#475569'}" stroke="${stroke}" stroke-width="25"/>
                    </g>
                    <rect x="${x + showerW + 100}" y="${y + h - 500}" width="600" height="420" fill="${isWhite ? '#ffffff' : '#334155'}" stroke="${stroke}" stroke-width="25" rx="20"/>
                </g>
            `;
        }
        case 'altar_set': {
            const burnerR = Math.min(80, h * 0.12);
            return `
                <g id="${item.id}" class="cad-furniture altar">
                    <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${isWhite ? '#fef3c7' : '#451a03'}" stroke="${gold}" stroke-width="40" rx="30"/>
                    <circle cx="${x + w / 2}" cy="${y + h / 2}" r="${burnerR}" fill="${gold}" stroke="${isWhite ? '#78350f' : '#fef08a'}" stroke-width="20"/>
                    <circle cx="${x + w * 0.22}" cy="${y + h / 2}" r="50" fill="${gold}"/>
                    <circle cx="${x + w * 0.78}" cy="${y + h / 2}" r="50" fill="${gold}"/>
                    <text x="${x + w / 2}" y="${y + h - 80}" text-anchor="middle" font-family="Inter, sans-serif" font-size="120" font-weight="bold" fill="${gold}">BÀN THỜ GIA TIÊN</text>
                </g>
            `;
        }
        case 'stairs_flight': {
            const stepCount = 14;
            const stepH = h / stepCount;
            let stepsSvg = '';
            for (let i = 1; i < stepCount; i++) {
                stepsSvg += `<line x1="${x}" y1="${y + i * stepH}" x2="${x + w}" y2="${y + i * stepH}" stroke="${stroke}" stroke-width="20"/>`;
            }
            const arrowX = x + w / 2;
            return `
                <g id="${item.id}" class="cad-furniture stairs">
                    <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}" stroke="${stroke}" stroke-width="35"/>
                    ${stepsSvg}
                    <line x1="${arrowX}" y1="${y}" x2="${arrowX}" y2="${y + h}" stroke="${accent}" stroke-width="25" stroke-dasharray="100,50"/>
                    <circle cx="${arrowX}" cy="${y + h - 200}" r="60" fill="${accent}"/>
                    <polygon points="${arrowX},${y + 170} ${arrowX - 80},${y + 330} ${arrowX + 80},${y + 330}" fill="${accent}"/>
                    <text x="${x + w - 100}" y="${y + h - 80}" text-anchor="end" font-family="Inter, sans-serif" font-size="100" font-weight="bold" fill="${accent}">21 BẬC</text>
                </g>
            `;
        }
        default:
            return `<rect id="${item.id}" x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}" stroke="${stroke}" stroke-width="25"/>`;
    }
}

// ============================================================
// 6. PARAMETRIC FLOORPLAN LAYOUT SOLVER
// ============================================================
export function generateParametricFloorplan(config) {
    const W = Math.max(3000, Math.min(30000, Math.round((parseFloat(config.widthM || config.widthMm / 1000) || 5.0) * 1000)));
    const D = Math.max(5000, Math.min(60000, Math.round((parseFloat(config.lengthM || config.depthMm / 1000) || 16.0) * 1000)));
    const totalFloors = config.mode === 'existing_house' ? 1 : Math.max(1, Math.min(7, parseInt(config.floors, 10) || 2));
    const northAngleDeg = parseFloat(config.northAngleDeg !== undefined ? config.northAngleDeg : (config.facingDegree || 0));

    const plansByFloor = [];

    for (let f = 1; f <= totalFloors; f++) {
        let floorName = 'Mặt Bằng Tầng Trệt';
        if (f > 1 && f < totalFloors) floorName = `Mặt Bằng Lầu ${f - 1} (Tầng ${f})`;
        else if (f === totalFloors && totalFloors > 1) floorName = `Mặt Bằng Tầng Thượng (Lầu ${f - 1})`;
        if (config.mode === 'existing_house') floorName = 'Mặt Bằng Hiện Trạng Nhà';

        const floorPlan = solveSingleFloorGeometry({
            floorIndex: f,
            totalFloors,
            floorName,
            widthMm: W,
            depthMm: D,
            northAngleDeg,
            config
        });
        plansByFloor.push(floorPlan);
    }

    const groundGeometry = plansByFloor[0];

    return {
        widthMm: W,
        depthMm: D,
        totalFloors,
        totalAreaM2: Math.round((W * D * totalFloors / 1000000) * 10) / 10,
        northAngleDeg,
        center: groundGeometry.center,
        plansByFloor,
        ...groundGeometry
    };
}

function solveSingleFloorGeometry({ floorIndex, totalFloors, floorName, widthMm, depthMm, northAngleDeg, config }) {
    const W = widthMm;
    const D = depthMm;
    const isWideHouse = W > D * 1.1;

    const walls = [];
    const doors = [];
    const windows = [];
    const furniture = [];
    const rooms = [];
    const columns = [];
    const axesX = [];
    const axesY = [];
    const dimensionChains = { horizontal: [], vertical: [] };
    let entrancePorch = null;

    const outerT = 220;
    const innerT = 110;
    const colSize = 220;

    walls.push(
        { id: 'w-out-top', x1: 0, y1: 0, x2: W, y2: 0, thickness: outerT, type: 'outer' },
        { id: 'w-out-bottom', x1: 0, y1: D, x2: W, y2: D, thickness: outerT, type: 'outer' },
        { id: 'w-out-left', x1: 0, y1: 0, x2: 0, y2: D, thickness: outerT, type: 'outer' },
        { id: 'w-out-right', x1: W, y1: 0, x2: W, y2: D, thickness: outerT, type: 'outer' }
    );

    const roomCounts = config.roomCounts || {};
    const hasAltar = roomCounts.hasAltar === '1' || roomCounts.hasAltar === '2' || roomCounts.hasAltar === true || roomCounts.hasAltar === 1;
    const altarOnGround = roomCounts.hasAltar === '2' || isWideHouse;
    const hasSkylight = roomCounts.hasSkylight !== '0' && roomCounts.hasSkylight !== false;
    const hasGarage = roomCounts.hasGarage === '1' || roomCounts.hasGarage === '2';
    const hasCommonRoom = roomCounts.hasCommonRoom === '1' || roomCounts.hasCommonRoom === true;
    const hasLaundry = roomCounts.hasLaundry !== '0' && roomCounts.hasLaundry !== false;

    if (isWideHouse) {
        const x1 = Math.round(W * 0.28);
        const x2 = Math.round(W * 0.35);
        const x3 = Math.round(W * 0.65);
        const x4 = Math.round(W * 0.72);

        const y1 = Math.round(D * 0.45);
        const y2 = Math.round(D * 0.62);

        axesX.push({ label: '1', x: 0 }, { label: "1'", x: x1 }, { label: '2', x: x2 }, { label: '3', x: x3 }, { label: "3'", x: x4 }, { label: '4', x: W });
        axesY.push({ label: 'A', y: 0 }, { label: 'B', y: y1 }, { label: "B'", y: y2 }, { label: 'C', y: D });

        [0, x1, x3, W].forEach(px => { [0, y1, D].forEach(py => { columns.push({ x: px, y: py, size: colSize }); }); });

        const porchW = Math.min(5200, W * 0.36);
        entrancePorch = {
            x: (W - porchW) / 2, y: -1400, width: porchW, height: 1400, steps: 4,
            pillars: [{ x: (W - porchW) / 2 + 300, y: -1100, size: 350 }, { x: (W + porchW) / 2 - 650, y: -1100, size: 350 }]
        };

        walls.push(
            { id: 'w-h-1', x1: 0, y1: y1, x2: x1, y2: y1, thickness: innerT, type: 'partition' },
            { id: 'w-h-2', x1: x3, y1: y1, x2: W, y2: y1, thickness: innerT, type: 'partition' },
            { id: 'w-h-3', x1: 0, y1: y2, x2: W, y2: y2, thickness: innerT, type: 'partition' },
            { id: 'w-v-1', x1: x1, y1: 0, x2: x1, y2: D, thickness: innerT, type: 'partition' },
            { id: 'w-v-2', x1: x3, y1: 0, x2: x3, y2: D, thickness: innerT, type: 'partition' }
        );

        const mainDw = 3200;
        doors.push({ id: 'd-main', x: (W - mainDw) / 2, y: 0, width: mainDw, type: 'double', swing: 'double', label: 'Cửa Chính 4 Cánh' });

        const livingRect = { x: x1, y: 0, width: x3 - x1, height: y2 };
        rooms.push({ id: 'room-living', type: 'living', name: 'P. KHÁCH', areaM2: areaM2(livingRect), ...livingRect, floor: floorIndex });
        furniture.push({ id: 'fur-sofa', type: 'sofa_living', x: livingRect.x + 600, y: livingRect.y + 1200, width: Math.min(3600, livingRect.width - 1200), height: 2000 });

        const altarRect = { x: x1, y: y2, width: x3 - x1, height: D - y2 };
        rooms.push({ id: 'room-altar', type: 'altar', name: 'P. THỜ', areaM2: areaM2(altarRect), ...altarRect, floor: floorIndex });
        furniture.push({ id: 'fur-altar', type: 'altar_set', x: altarRect.x + (altarRect.width - 1800) / 2, y: D - 1100, width: 1800, height: 900 });

        const kitchenRect = { x: x3, y: 0, width: W - x3, height: y2 };
        rooms.push({ id: 'room-kitchen', type: 'kitchen', name: 'BẾP & P. ĂN', areaM2: areaM2(kitchenRect), ...kitchenRect, floor: floorIndex });
        furniture.push(
            { id: 'fur-dining', type: 'dining_set', x: kitchenRect.x + 600, y: kitchenRect.y + 1000, width: 1800, height: 1000 },
            { id: 'fur-kitchen', type: 'kitchen_set', x: W - 900, y: kitchenRect.y + 500, width: 700, height: Math.min(3200, kitchenRect.height - 1000) }
        );

        const bed1Rect = { x: 0, y: 0, width: x1, height: y1 };
        rooms.push({ id: 'room-bed-1', type: 'bedroom', name: 'P. NGỦ 1', areaM2: areaM2(bed1Rect), ...bed1Rect, floor: floorIndex });
        furniture.push({ id: 'fur-bed-1', type: 'bed_master', x: 500, y: 700, width: 2000, height: 2100 });

        const bed2Rect = { x: 0, y: y2, width: x1, height: D - y2 };
        rooms.push({ id: 'room-bed-2', type: 'bedroom', name: 'P. NGỦ 2', areaM2: areaM2(bed2Rect), ...bed2Rect, floor: floorIndex });
        furniture.push({ id: 'fur-bed-2', type: 'bed_single', x: 500, y: y2 + 600, width: 1800, height: 2000 });

        const wc1Rect = { x: 0, y: y1, width: x1, height: y2 - y1 };
        rooms.push({ id: 'room-wc-1', type: 'wc', name: 'WC 1', areaM2: areaM2(wc1Rect), ...wc1Rect, floor: floorIndex });
        furniture.push({ id: 'fur-wc-1', type: 'toilet_set', x: 300, y: y1 + 200, width: wc1Rect.width - 600, height: wc1Rect.height - 400 });

        const bed3Rect = { x: x3, y: y2, width: W - x3 - 1800, height: D - y2 };
        rooms.push({ id: 'room-bed-3', type: 'bedroom', name: 'P. NGỦ 3', areaM2: areaM2(bed3Rect), ...bed3Rect, floor: floorIndex });
        furniture.push({ id: 'fur-bed-3', type: 'bed_single', x: bed3Rect.x + 400, y: y2 + 600, width: 1800, height: 2000 });

        const wc2Rect = { x: W - 1800, y: y2, width: 1800, height: D - y2 };
        walls.push({ id: 'w-wc2', x1: W - 1800, y1: y2, x2: W - 1800, y2: D, thickness: innerT, type: 'partition' });
        rooms.push({ id: 'room-wc-2', type: 'wc', name: 'WC 2', areaM2: areaM2(wc2Rect), ...wc2Rect, floor: floorIndex });
        furniture.push({ id: 'fur-wc-2', type: 'toilet_set', x: wc2Rect.x + 200, y: y2 + 200, width: wc2Rect.width - 400, height: wc2Rect.height - 400 });

        doors.push(
            { id: 'd-b1', x: x1, y: y1 - 900, width: 900, type: 'single', swing: 'left' },
            { id: 'd-b2', x: x1, y: y2 + 400, width: 900, type: 'single', swing: 'left' },
            { id: 'd-b3', x: x3, y: y2 + 400, width: 900, type: 'single', swing: 'right' },
            { id: 'd-wc1', x: x1, y: y1 + 300, width: 800, type: 'single', swing: 'left' },
            { id: 'd-wc2', x: W - 1800, y: y2 + 300, width: 800, type: 'single', swing: 'left' }
        );

        windows.push(
            { id: 'win-1', x: 800, y: 0, width: 1600, type: 'sliding' },
            { id: 'win-2', x: W - 2400, y: 0, width: 1600, type: 'sliding' },
            { id: 'win-3', x: 800, y: D, width: 1600, type: 'sliding' },
            { id: 'win-4', x: W - 1400, y: D, width: 1000, type: 'sliding' }
        );

    } else {
        // NHÀ ỐNG / NHÀ PHỐ HIỆN ĐẠI (5x16m, 5x18m...)
        let frontD = Math.max(4200, Math.min(6200, Math.round(D * 0.34)));
        let midD = Math.max(2600, Math.min(3600, Math.round(D * 0.20)));
        let rearD = D - frontD - midD;

        const y1 = frontD;
        const y2 = frontD + midD;

        axesX.push({ label: '1', x: 0 }, { label: '2', x: Math.round(W * 0.5) }, { label: '3', x: W });
        axesY.push({ label: 'A', y: 0 }, { label: 'B', y: y1 }, { label: 'C', y: y2 }, { label: 'D', y: D });

        [0, Math.round(W * 0.5), W].forEach(px => { [0, y1, y2, D].forEach(py => { columns.push({ x: px, y: py, size: colSize }); }); });

        if (floorIndex === 1) {
            const porchW = Math.min(3200, W * 0.65);
            entrancePorch = { x: (W - porchW) / 2, y: -1200, width: porchW, height: 1200, steps: 3 };

            walls.push(
                { id: 'w-p-1', x1: 0, y1: y1, x2: W, y2: y1, thickness: innerT, type: 'partition' },
                { id: 'w-p-2', x1: 0, y1: y2, x2: W, y2: y2, thickness: innerT, type: 'partition' }
            );

            const mainDw = Math.min(3200, Math.round(W * 0.65));
            doors.push({ id: 'd-main', x: (W - mainDw) / 2, y: 0, width: mainDw, type: 'double', swing: 'double', label: 'Cửa Chính 4 Cánh' });

            if (hasGarage && roomCounts.hasGarage === '1') {
                const garageW = Math.round(W * 0.48);
                walls.push({ id: 'w-garage', x1: garageW, y1: 0, x2: garageW, y2: y1, thickness: innerT, type: 'partition' });

                const garageRect = { x: 0, y: 0, width: garageW, height: y1 };
                rooms.push({ id: 'room-garage', type: 'garage', name: 'GARA Ô TÔ', areaM2: areaM2(garageRect), ...garageRect, floor: 1 });
                furniture.push({ id: 'fur-car', type: 'garage_car', x: 400, y: 600, width: garageW - 800, height: y1 - 1200 });

                const livingRect = { x: garageW, y: 0, width: W - garageW, height: y1 };
                rooms.push({ id: 'room-living', type: 'living', name: 'P. KHÁCH', areaM2: areaM2(livingRect), ...livingRect, floor: 1 });
                furniture.push({ id: 'fur-sofa', type: 'sofa_living', x: garageW + 400, y: 600, width: W - garageW - 800, height: Math.min(1800, y1 * 0.5) });
            } else {
                const livingRect = { x: 0, y: 0, width: W, height: y1 };
                rooms.push({ id: 'room-living', type: 'living', name: 'P. KHÁCH', areaM2: areaM2(livingRect), ...livingRect, floor: 1 });
                furniture.push({ id: 'fur-sofa', type: 'sofa_living', x: 600, y: 800, width: Math.min(3600, W * 0.65), height: 1800 });
                windows.push({ id: 'win-1', x: 300, y: 0, width: 1400, type: 'sliding' }, { id: 'win-2', x: W - 1700, y: 0, width: 1400, type: 'sliding' });
            }

            const stairW = Math.min(2600, Math.round(W * 0.48));
            furniture.push({ id: 'fur-stairs', type: 'stairs_flight', x: 300, y: y1 + 300, width: stairW - 400, height: midD - 600, steps: 21 });

            if (hasSkylight) {
                furniture.push({ id: 'fur-skylight', type: 'skylight_vent', x: W - 1800, y: y1 + 300, width: 1500, height: midD - 600 });
            }

            const wcW = Math.min(2000, Math.round(W * 0.38));
            const wcD = Math.min(2200, Math.round(rearD * 0.48));
            walls.push(
                { id: 'w-wc-v', x1: W - wcW, y1: y2, x2: W - wcW, y2: y2 + wcD, thickness: innerT, type: 'partition' },
                { id: 'w-wc-h', x1: W - wcW, y1: y2 + wcD, x2: W, y2: y2 + wcD, thickness: innerT, type: 'partition' }
            );
            doors.push({ id: 'd-wc', x: W - wcW, y: y2 + 300, width: 800, type: 'single', swing: 'left' });

            const wcRect = { x: W - wcW, y: y2, width: wcW, height: wcD };
            rooms.push({ id: 'room-wc', type: 'wc', name: 'WC TRỆT', areaM2: areaM2(wcRect), ...wcRect, floor: 1 });
            furniture.push({ id: 'fur-wc', type: 'toilet_set', x: W - wcW + 200, y: y2 + 200, width: wcW - 400, height: wcD - 400 });

            const kitchenRect = { x: 0, y: y2, width: W - wcW, height: rearD };
            rooms.push({ id: 'room-kitchen', type: 'kitchen', name: 'BẾP & P. ĂN', areaM2: Math.round((W * rearD - wcW * wcD) / 1000000 * 10) / 10, ...kitchenRect, floor: 1 });
            furniture.push(
                { id: 'fur-kitchen', type: 'kitchen_set', x: 400, y: D - 700, width: Math.min(3600, W * 0.6), height: 600 },
                { id: 'fur-dining', type: 'dining_set', x: 800, y: y2 + 800, width: 1600, height: 900 }
            );
            doors.push({ id: 'd-back', x: W - 1200, y: D, width: 900, type: 'single', swing: 'right' });

        } else if (floorIndex < totalFloors || totalFloors === 1) {
            walls.push(
                { id: 'w-p-1', x1: 0, y1: y1, x2: W, y2: y1, thickness: innerT, type: 'partition' },
                { id: 'w-p-2', x1: 0, y1: y2, x2: W, y2: y2, thickness: innerT, type: 'partition' }
            );

            const wcMasterW = Math.min(1800, Math.round(W * 0.35));
            const wcMasterD = 2000;
            walls.push(
                { id: 'w-wcm-v', x1: W - wcMasterW, y1: 0, x2: W - wcMasterW, y2: wcMasterD, thickness: innerT, type: 'partition' },
                { id: 'w-wcm-h', x1: W - wcMasterW, y1: wcMasterD, x2: W, y2: wcMasterD, thickness: innerT, type: 'partition' }
            );
            doors.push({ id: 'd-wcm', x: W - wcMasterW, y: 400, width: 800, type: 'single', swing: 'left' });

            const wcMasterRect = { x: W - wcMasterW, y: 0, width: wcMasterW, height: wcMasterD };
            rooms.push({ id: `room-wcm-${floorIndex}`, type: 'wc_master', name: 'WC MASTER', areaM2: areaM2(wcMasterRect), ...wcMasterRect, floor: floorIndex });
            furniture.push({ id: `fur-wcm-${floorIndex}`, type: 'toilet_set', x: W - wcMasterW + 200, y: 200, width: wcMasterW - 400, height: wcMasterD - 400 });

            const masterBedRect = { x: 0, y: 0, width: W - wcMasterW, height: y1 };
            rooms.push({ id: `room-master-${floorIndex}`, type: 'bedroom_master', name: `P. NGỦ MASTER (T${floorIndex})`, areaM2: Math.round((W * y1 - wcMasterW * wcMasterD) / 1000000 * 10) / 10, ...masterBedRect, floor: floorIndex });
            furniture.push({ id: `fur-bedm-${floorIndex}`, type: 'bed_master', x: 800, y: 800, width: 2000, height: 2100 });
            doors.push({ id: `d-balcony-${floorIndex}`, x: 600, y: 0, width: 1400, type: 'double', swing: 'double' });

            furniture.push({ id: `fur-stairs-${floorIndex}`, type: 'stairs_flight', x: 300, y: y1 + 300, width: Math.min(2400, W * 0.45), height: midD - 600, steps: 21 });

            const wcFloorW = Math.min(1800, Math.round(W * 0.35));
            const wcFloorD = 2000;
            walls.push(
                { id: 'w-wcf-v', x1: W - wcFloorW, y1: y2, x2: W - wcFloorW, y2: y2 + wcFloorD, thickness: innerT, type: 'partition' },
                { id: 'w-wcf-h', x1: W - wcFloorW, y1: y2 + wcFloorD, x2: W, y2: y2 + wcFloorD, thickness: innerT, type: 'partition' }
            );
            doors.push({ id: `d-wcf-${floorIndex}`, x: W - wcFloorW, y: y2 + 400, width: 800, type: 'single', swing: 'left' });

            const wcFloorRect = { x: W - wcFloorW, y: y2, width: wcFloorW, height: wcFloorD };
            rooms.push({ id: `room-wcf-${floorIndex}`, type: 'wc', name: `WC TẦNG ${floorIndex}`, areaM2: areaM2(wcFloorRect), ...wcFloorRect, floor: floorIndex });
            furniture.push({ id: `fur-wcf-${floorIndex}`, type: 'toilet_set', x: W - wcFloorW + 200, y: y2 + 200, width: wcFloorW - 400, height: wcFloorD - 400 });

            const bed2Rect = { x: 0, y: y2, width: W - wcFloorW, height: rearD };
            rooms.push({ id: `room-bed2-${floorIndex}`, type: 'bedroom', name: `P. NGỦ ${floorIndex * 2} (T${floorIndex})`, areaM2: Math.round((W * rearD - wcFloorW * wcFloorD) / 1000000 * 10) / 10, ...bed2Rect, floor: floorIndex });
            furniture.push({ id: `fur-bed2-${floorIndex}`, type: 'bed_single', x: 800, y: y2 + 800, width: 1600, height: 2000 });
            windows.push({ id: `win-bed2-${floorIndex}`, x: 800, y: D, width: 1500, type: 'sliding' });

        } else {
            walls.push(
                { id: 'w-p-1', x1: 0, y1: y1, x2: W, y2: y1, thickness: innerT, type: 'partition' },
                { id: 'w-p-2', x1: 0, y1: y2, x2: W, y2: y2, thickness: innerT, type: 'partition' }
            );

            if (hasAltar && !altarOnGround) {
                const altarRect = { x: 0, y: 0, width: W, height: y1 };
                rooms.push({ id: 'room-altar', type: 'altar', name: 'P. THỜ GIA TIÊN', areaM2: areaM2(altarRect), ...altarRect, floor: floorIndex });
                furniture.push({ id: 'fur-altar', type: 'altar_set', x: (W - 1800) / 2, y: 500, width: 1800, height: 900 });
                doors.push({ id: 'd-altar', x: (W - 1400) / 2, y: y1, width: 1400, type: 'double', swing: 'double' });
            } else {
                const terraceRect = { x: 0, y: 0, width: W, height: y1 };
                rooms.push({ id: 'room-terrace', type: 'yard', name: 'SÂN THƯỢNG', areaM2: areaM2(terraceRect), ...terraceRect, floor: floorIndex });
            }

            furniture.push({ id: 'fur-stairs-roof', type: 'stairs_flight', x: 300, y: y1 + 300, width: Math.min(2400, W * 0.45), height: midD - 600, steps: 21 });

            if (hasLaundry) {
                const laundryRect = { x: 0, y: y2, width: W, height: rearD };
                rooms.push({ id: 'room-laundry', type: 'laundry', name: 'SÂN PHƠI & GIẶT', areaM2: areaM2(laundryRect), ...laundryRect, floor: floorIndex });
                furniture.push({ id: 'fur-laundry', type: 'laundry_set', x: 400, y: y2 + 500, width: 1200, height: 800 });
            }
        }
    }

    const center = centerOfRect({ x: 0, y: 0, width: W, height: D });

    return {
        floorIndex,
        totalFloors,
        floorName,
        widthMm: W,
        depthMm: D,
        center,
        northAngleDeg,
        walls,
        doors,
        windows,
        furniture,
        rooms,
        columns,
        axesX,
        axesY,
        dimensionChains,
        entrancePorch
    };
}

// ============================================================
// 7. ARCHITECTURAL CAD SVG RENDERER (DRAWING 1)
// ============================================================
export class ArchitecturalCADRenderer {
    constructor(options = {}) {
        this.theme = options.theme || 'white';
        this.showDimensions = options.showDimensions !== undefined ? options.showDimensions : true;
        this.showFurniture = options.showFurniture !== undefined ? options.showFurniture : true;
        this.showAxes = options.showAxes !== undefined ? options.showAxes : true;
        this.showCompass = options.showCompass !== undefined ? options.showCompass : true;
    }

    renderSvg(geometry, options = {}) {
        if (!geometry) return '<svg></svg>';

        const isWhite = (options.theme || this.theme) === 'white';
        const W = geometry.widthMm || 5000;
        const D = geometry.depthMm || 16000;
        const facingDegree = options.facingDegree !== undefined ? options.facingDegree : (geometry.northAngleDeg || 0);

        const padLeft = 1400;
        const padRight = 1400;
        const padTop = 1400;
        const padBottom = 1600;

        const viewX = -padLeft;
        const viewY = -padTop;
        const viewW = W + padLeft + padRight;
        const viewH = D + padTop + padBottom;

        const bgColor = isWhite ? '#ffffff' : '#080c16';
        const borderColor = isWhite ? '#94a3b8' : '#1e293b';

        let axesSvg = this.showAxes ? this.renderGridAxes(geometry, W, D, isWhite) : '';
        let porchSvg = geometry.entrancePorch ? this.renderEntrancePorch(geometry.entrancePorch, isWhite) : '';
        let roomsSvg = geometry.rooms ? this.renderRooms(geometry.rooms, isWhite) : '';
        let furnitureSvg = (this.showFurniture && geometry.furniture) ? geometry.furniture.map(f => renderFurnitureSvg(f, isWhite)).join('\n') : '';
        let wallsSvg = geometry.walls ? this.renderWalls(geometry.walls, isWhite) : '';
        let columnsSvg = geometry.columns ? this.renderColumns(geometry.columns, isWhite) : '';
        let doorsSvg = geometry.doors ? this.renderDoors(geometry.doors, isWhite) : '';
        let windowsSvg = geometry.windows ? this.renderWindows(geometry.windows, isWhite) : '';
        let dimsSvg = this.showDimensions ? this.renderDimensionChains(geometry, W, D, isWhite) : '';
        let compassSvg = this.showCompass ? this.renderCompassRose(W - 600, -600, 350, facingDegree, isWhite) : '';
        const boxW = Math.min(viewW - 400, 4800);
        const boxH = 340;
        const boxX = viewX + 200;
        const boxY = viewY + viewH - boxH - 150;
        const titleBlockSvg = this.renderTitleBlock(boxX, boxY, boxW, boxH, geometry, options, isWhite);

        return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewX} ${viewY} ${viewW} ${viewH}" width="100%" height="100%" class="cad-svg-drawing" style="background:${bgColor};">
    <defs>
        <pattern id="floorTile" width="600" height="600" patternUnits="userSpaceOnUse">
            <rect width="600" height="600" fill="none" stroke="${isWhite ? 'rgba(0,0,0,0.04)' : 'rgba(255,255,255,0.03)'}" stroke-width="8"/>
        </pattern>
    </defs>
    <rect x="${viewX + 80}" y="${viewY + 80}" width="${viewW - 160}" height="${viewH - 160}" fill="none" stroke="${borderColor}" stroke-width="30"/>
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

    renderGridAxes(geometry, W, D, isWhite) {
        const axesX = geometry.axesX || [{ label: '1', x: 0 }, { label: '2', x: W }];
        const axesY = geometry.axesY || [{ label: 'A', y: 0 }, { label: 'B', y: D }];
        const strokeColor = isWhite ? '#64748b' : '#475569';
        const bubbleBg = isWhite ? '#ffffff' : '#0f172a';
        const bubbleText = isWhite ? '#0f172a' : '#f8fafc';
        const bubbleR = 160;
        let svg = '';

        axesX.forEach(ax => {
            const x = ax.x;
            svg += `
                <line x1="${x}" y1="${-650}" x2="${x}" y2="${D + 650}" stroke="${strokeColor}" stroke-width="15" stroke-dasharray="140,70,30,70"/>
                <circle cx="${x}" cy="${-850}" r="${bubbleR}" fill="${bubbleBg}" stroke="${strokeColor}" stroke-width="25"/>
                <text x="${x}" y="${-810}" text-anchor="middle" font-family="Inter, sans-serif" font-size="160" font-weight="900" fill="${bubbleText}">${ax.label}</text>
                <circle cx="${x}" cy="${D + 850}" r="${bubbleR}" fill="${bubbleBg}" stroke="${strokeColor}" stroke-width="25"/>
                <text x="${x}" y="${D + 890}" text-anchor="middle" font-family="Inter, sans-serif" font-size="160" font-weight="900" fill="${bubbleText}">${ax.label}</text>
            `;
        });

        axesY.forEach(ay => {
            const y = ay.y;
            svg += `
                <line x1="${-650}" y1="${y}" x2="${W + 650}" y2="${y}" stroke="${strokeColor}" stroke-width="15" stroke-dasharray="140,70,30,70"/>
                <circle cx="${-850}" cy="${y}" r="${bubbleR}" fill="${bubbleBg}" stroke="${strokeColor}" stroke-width="25"/>
                <text x="${-850}" y="${y + 55}" text-anchor="middle" font-family="Inter, sans-serif" font-size="160" font-weight="900" fill="${bubbleText}">${ay.label}</text>
                <circle cx="${W + 850}" cy="${y}" r="${bubbleR}" fill="${bubbleBg}" stroke="${strokeColor}" stroke-width="25"/>
                <text x="${W + 850}" y="${y + 55}" text-anchor="middle" font-family="Inter, sans-serif" font-size="160" font-weight="900" fill="${bubbleText}">${ay.label}</text>
            `;
        });
        return svg;
    }

    renderEntrancePorch(porch, isWhite) {
        const { x, y, width: w, height: h, steps = 3, pillars } = porch;
        const stepH = h / steps;
        let svg = '';
        for (let i = 0; i < steps; i++) {
            const sx = x + (i * 150);
            const sw = w - (i * 300);
            const sy = y + (i * stepH);
            const fill = isWhite ? (i % 2 === 0 ? '#e2e8f0' : '#cbd5e1') : (i % 2 === 0 ? '#1e293b' : '#334155');
            svg += `<rect x="${sx}" y="${sy}" width="${sw}" height="${stepH}" fill="${fill}" stroke="${isWhite ? '#475569' : '#94a3b8'}" stroke-width="25"/>`;
        }
        if (pillars && pillars.length > 0) {
            pillars.forEach(p => {
                svg += `
                    <rect x="${p.x}" y="${p.y}" width="${p.size}" height="${p.size}" fill="${isWhite ? '#0f172a' : '#f8fafc'}" stroke="${isWhite ? '#0284c7' : '#38bdf8'}" stroke-width="25"/>
                    <circle cx="${p.x + p.size / 2}" cy="${p.y + p.size / 2}" r="60" fill="#ef4444"/>
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
                    <rect x="${cx - 900}" y="${cy - 220}" width="1800" height="360" fill="${isWhite ? 'rgba(255,255,255,0.85)' : 'rgba(15,23,42,0.85)'}" stroke="${isWhite ? '#cbd5e1' : '#334155'}" stroke-width="15" rx="30"/>
                    <text x="${cx}" y="${cy - 30}" text-anchor="middle" font-family="Inter, sans-serif" font-size="140" font-weight="900" fill="${isWhite ? '#0f172a' : '#f8fafc'}">${r.name}</text>
                    <text x="${cx}" y="${cy + 90}" text-anchor="middle" font-family="Inter, sans-serif" font-size="110" font-weight="700" fill="${isWhite ? '#0284c7' : '#38bdf8'}">${r.areaM2.toFixed(2)} m²</text>
                </g>
            `;
        }).join('\n');
    }

    renderWalls(walls, isWhite) {
        return walls.map(w => {
            const strokeColor = w.type === 'outer' ? (isWhite ? '#0f172a' : '#f1f5f9') : (isWhite ? '#334155' : '#94a3b8');
            const thickness = w.thickness || 220;
            return `
                <line x1="${w.x1}" y1="${w.y1}" x2="${w.x2}" y2="${w.y2}" stroke="${strokeColor}" stroke-width="${thickness}" stroke-linecap="square"/>
                <line x1="${w.x1}" y1="${w.y1}" x2="${w.x2}" y2="${w.y2}" stroke="${isWhite ? '#64748b' : '#475569'}" stroke-width="15" stroke-dasharray="80,40"/>
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
                    <rect x="${cx}" y="${cy}" width="${size}" height="${size}" fill="${isWhite ? '#1e293b' : '#f8fafc'}" stroke="${isWhite ? '#ffffff' : '#0f172a'}" stroke-width="20"/>
                    <line x1="${cx}" y1="${cy}" x2="${cx + size}" y2="${cy + size}" stroke="${isWhite ? '#ffffff' : '#0f172a'}" stroke-width="15"/>
                    <line x1="${cx + size}" y1="${cy}" x2="${cx}" y2="${cy + size}" stroke="${isWhite ? '#ffffff' : '#0f172a'}" stroke-width="15"/>
                </g>
            `;
        }).join('\n');
    }

    renderDoors(doors, isWhite) {
        const doorColor = isWhite ? '#0284c7' : '#38bdf8';
        return doors.map(d => {
            const { x, y, width: dw, swing = 'left' } = d;
            if (swing === 'double' || d.type === 'double') {
                const halfW = dw / 2;
                return `
                    <g id="${d.id}" class="cad-door-double">
                        <line x1="${x}" y1="${y}" x2="${x}" y2="${y + halfW}" stroke="${doorColor}" stroke-width="30"/>
                        <line x1="${x + dw}" y1="${y}" x2="${x + dw}" y2="${y + halfW}" stroke="${doorColor}" stroke-width="30"/>
                        <path d="M ${x} ${y + halfW} A ${halfW} ${halfW} 0 0 1 ${x + halfW} ${y}" fill="none" stroke="${doorColor}" stroke-width="25" stroke-dasharray="50,30"/>
                        <path d="M ${x + dw} ${y + halfW} A ${halfW} ${halfW} 0 0 0 ${x + halfW} ${y}" fill="none" stroke="${doorColor}" stroke-width="25" stroke-dasharray="50,30"/>
                    </g>
                `;
            } else {
                return `
                    <g id="${d.id}" class="cad-door-single">
                        <line x1="${x}" y1="${y}" x2="${x}" y2="${y + dw}" stroke="${doorColor}" stroke-width="30"/>
                        <path d="M ${x} ${y + dw} A ${dw} ${dw} 0 0 1 ${x + dw} ${y}" fill="none" stroke="${doorColor}" stroke-width="25" stroke-dasharray="50,30"/>
                    </g>
                `;
            }
        }).join('\n');
    }

    renderWindows(windows, isWhite) {
        const stroke = isWhite ? '#0284c7' : '#38bdf8';
        return windows.map(w => `
            <g id="${w.id}" class="cad-window">
                <rect x="${w.x}" y="${w.y - 110}" width="${w.width}" height="220" fill="${isWhite ? '#e0f2fe' : '#0369a1'}" stroke="${stroke}" stroke-width="25"/>
                <line x1="${w.x}" y1="${w.y}" x2="${w.x + w.width}" y2="${w.y}" stroke="${stroke}" stroke-width="20"/>
            </g>
        `).join('\n');
    }

    renderDimensionChains(geometry, W, D, isWhite) {
        const strokeColor = isWhite ? '#475569' : '#94a3b8';
        const textColor = isWhite ? '#0f172a' : '#f8fafc';
        const topY = -400;
        const leftX = -400;
        let svg = `
            <line x1="0" y1="${topY}" x2="${W}" y2="${topY}" stroke="${strokeColor}" stroke-width="25"/>
            <line x1="0" y1="${topY - 100}" x2="0" y2="${0}" stroke="${strokeColor}" stroke-width="15"/>
            <line x1="${W}" y1="${topY - 100}" x2="${W}" y2="${0}" stroke="${strokeColor}" stroke-width="15"/>
            <line x1="${-60}" y1="${topY + 60}" x2="${60}" y2="${topY - 60}" stroke="${strokeColor}" stroke-width="35"/>
            <line x1="${W - 60}" y1="${topY + 60}" x2="${W + 60}" y2="${topY - 60}" stroke="${strokeColor}" stroke-width="35"/>
            <text x="${W / 2}" y="${topY - 60}" text-anchor="middle" font-family="Inter, sans-serif" font-size="170" font-weight="bold" fill="${textColor}">${W}</text>

            <line x1="${leftX}" y1="0" x2="${leftX}" y2="${D}" stroke="${strokeColor}" stroke-width="25"/>
            <line x1="${leftX - 100}" y1="0" x2="0" y2="0" stroke="${strokeColor}" stroke-width="15"/>
            <line x1="${leftX - 100}" y1="${D}" x2="0" y2="${D}" stroke="${strokeColor}" stroke-width="15"/>
            <line x1="${leftX - 60}" y1="${60}" x2="${leftX + 60}" y2="${-60}" stroke="${strokeColor}" stroke-width="35"/>
            <line x1="${leftX - 60}" y1="${D + 60}" x2="${leftX + 60}" y2="${D - 60}" stroke="${strokeColor}" stroke-width="35"/>
            <text x="${leftX - 80}" y="${D / 2}" text-anchor="middle" font-family="Inter, sans-serif" font-size="170" font-weight="bold" fill="${textColor}" transform="rotate(-90 ${leftX - 80} ${D / 2})">${D}</text>
        `;
        return svg;
    }

    renderCompassRose(cx, cy, r, facingDeg, isWhite) {
        const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
        let blades = '';
        for (let i = 0; i < 8; i++) {
            const angle = (i * 45 - 90) * (Math.PI / 180);
            const rTip = r - 40;
            const rBase = r * 0.25;
            const fillBlade = i === 0 ? '#ef4444' : (isWhite ? '#64748b' : '#94a3b8');
            blades += `
                <polygon points="0,0 ${Math.cos(angle - 0.25) * rBase},${Math.sin(angle - 0.25) * rBase} ${Math.cos(angle) * rTip},${Math.sin(angle) * rTip}" fill="${fillBlade}"/>
                <text x="${Math.cos(angle) * (r + 90)}" y="${Math.sin(angle) * (r + 90) + 30}" text-anchor="middle" font-family="Inter, sans-serif" font-size="100" font-weight="bold" fill="${i === 0 ? '#ef4444' : (isWhite ? '#0f172a' : '#f8fafc')}">${directions[i]}</text>
            `;
        }
        return `
            <g id="compass-rose" transform="translate(${cx}, ${cy}) rotate(${facingDeg})">
                <circle cx="0" cy="0" r="${r}" fill="${isWhite ? '#ffffff' : '#0f172a'}" stroke="${isWhite ? '#cbd5e1' : '#334155'}" stroke-width="25"/>
                ${blades}
            </g>
        `;
    }

    renderTitleBlock(x, y, w, h, geometry, options, isWhite) {
        const padX = 80;
        return `
            <g id="architectural-title-block">
                <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${isWhite ? 'rgba(255,255,255,0.96)' : 'rgba(15,23,42,0.96)'}" stroke="${isWhite ? '#0284c7' : '#d97706'}" stroke-width="25" rx="20"/>
                <text x="${x + padX}" y="${y + 90}" font-family="Inter, sans-serif" font-size="120" font-weight="900" fill="${isWhite ? '#0f172a' : '#fef08a'}">${(geometry.floorName || 'MẶT BẰNG TƯ VẤN THIẾT KẾ').toUpperCase()}</text>
                <text x="${x + padX}" y="${y + 175}" font-family="Inter, sans-serif" font-size="80" font-weight="600" fill="${isWhite ? '#475569' : '#cbd5e1'}">Kích thước: ${(geometry.widthMm / 1000).toFixed(2)}m × ${(geometry.depthMm / 1000).toFixed(2)}m · Diện tích: ${(geometry.widthMm * geometry.depthMm / 1000000).toFixed(1)} m²</text>
                <text x="${x + padX}" y="${y + 260}" font-family="Inter, sans-serif" font-size="80" font-weight="700" fill="${isWhite ? '#0284c7' : '#38bdf8'}">Tư vấn: DỊCH SƯ NGUYỄN HUY HOÀNG — 0933 116 860 · Huyền Không Vận 9</text>
            </g>
        `;
    }
}

// ============================================================
// 8. FENG SHUI SPATIAL ENGINE & 9-PALACE OVERLAY (DRAWING 2)
// ============================================================
export const PALACE_POSITIONS = {
    4: { r: 0, c: 0, name: 'ĐÔNG NAM', short: 'ĐN', trigram: 'TỐN' },
    9: { r: 0, c: 1, name: 'NAM',      short: 'N',  trigram: 'LY' },
    2: { r: 0, c: 2, name: 'TÂY NAM',  short: 'TN', trigram: 'KHÔN' },
    3: { r: 1, c: 0, name: 'ĐÔNG',     short: 'Đ',  trigram: 'CHẤN' },
    5: { r: 1, c: 1, name: 'TRUNG CUNG', short: 'TRUNG', trigram: 'TRUNG' },
    7: { r: 1, c: 2, name: 'TÂY',      short: 'T',  trigram: 'ĐOÀI' },
    8: { r: 2, c: 0, name: 'ĐÔNG BẮC', short: 'ĐB', trigram: 'CẤN' },
    1: { r: 2, c: 1, name: 'BẮC',      short: 'B',  trigram: 'KHẢM' },
    6: { r: 2, c: 2, name: 'TÂY BẮC',  short: 'TB', trigram: 'CÀN' }
};

export function calculateFengShuiSpatial(geometry, options = {}) {
    const W = geometry.widthMm || 5000;
    const D = geometry.depthMm || 16000;
    const facingDegree = options.facingDegree !== undefined ? options.facingDegree : (geometry.northAngleDeg || 180);
    const buildYear = options.buildYear || 2025;
    const ownerYear = options.ownerYear || 1990;
    const ownerGender = options.ownerGender || 'nam';

    const flyingStars = calculateFlyingStars({ facingDegree, buildYear });
    const batTrach = calculateGua(ownerYear, ownerGender);

    const cellW = W / 3;
    const cellH = D / 3;
    const spatialPalaces = {};

    Object.entries(PALACE_POSITIONS).forEach(([palaceIdStr, pos]) => {
        const palaceId = parseInt(palaceIdStr, 10);
        const rect = { x: pos.c * cellW, y: pos.r * cellH, width: cellW, height: cellH };
        const starInfo = flyingStars.palaces ? flyingStars.palaces[palaceId] : null;

        spatialPalaces[palaceId] = {
            id: palaceId,
            name: pos.name,
            short: pos.short,
            trigram: pos.trigram,
            row: pos.r,
            col: pos.c,
            rect,
            center: { x: rect.x + cellW / 2, y: rect.y + cellH / 2 },
            sonStar: starInfo ? (starInfo.sonStar || starInfo.mountainStar) : 9,
            huongStar: starInfo ? (starInfo.huongStar || starInfo.facingStar) : 9,
            vanStar: starInfo ? (starInfo.vanStar || starInfo.periodStar) : 9,
            nienStar: starInfo ? starInfo.nienStar : 9,
            grade: (starInfo && (starInfo.huongStar === 9 || starInfo.huongStar === 1)) ? 'ĐẠI CÁT' : ((starInfo && (starInfo.huongStar === 2 || starInfo.huongStar === 5)) ? 'HUNG' : 'BÌNH')
        };
    });

    return {
        geometry,
        center: geometry.center,
        northAngleDeg: facingDegree,
        flyingStars,
        batTrach,
        spatialPalaces
    };
}

export function renderNinePalacesOverlaySvg(spatialResult, isWhite = true) {
    if (!spatialResult || !spatialResult.spatialPalaces) return '';

    const { spatialPalaces, geometry } = spatialResult;
    const W = geometry.widthMm;
    const D = geometry.depthMm;
    const cellW = W / 3;
    const cellH = D / 3;

    const gridColor = isWhite ? '#b45309' : '#f59e0b';
    const numColor = isWhite ? '#0f172a' : '#f8fafc';
    const starSonColor = isWhite ? '#0369a1' : '#38bdf8';
    const starHuongColor = isWhite ? '#b45309' : '#fbbf24';

    let gridLinesSvg = `
        <line x1="${cellW}" y1="0" x2="${cellW}" y2="${D}" stroke="${gridColor}" stroke-width="35" stroke-dasharray="120,60"/>
        <line x1="${cellW * 2}" y1="0" x2="${cellW * 2}" y2="${D}" stroke="${gridColor}" stroke-width="35" stroke-dasharray="120,60"/>
        <line x1="0" y1="${cellH}" x2="${W}" y2="${cellH}" stroke="${gridColor}" stroke-width="35" stroke-dasharray="120,60"/>
        <line x1="0" y1="${cellH * 2}" x2="${W}" y2="${cellH * 2}" stroke="${gridColor}" stroke-width="35" stroke-dasharray="120,60"/>
    `;

    let palacesSvg = '';

    Object.values(spatialPalaces).forEach(pal => {
        const { x, y, width: w, height: h } = pal.rect;
        const cx = x + w / 2;
        const cy = y + h / 2;

        let cellBg = 'rgba(255, 255, 255, 0.05)';
        if (pal.grade === 'ĐẠI CÁT' || pal.grade === 'CÁT') {
            cellBg = isWhite ? 'rgba(16, 185, 129, 0.08)' : 'rgba(16, 185, 129, 0.12)';
        } else if (pal.grade === 'ĐẠI HUNG' || pal.grade === 'HUNG') {
            cellBg = isWhite ? 'rgba(239, 68, 68, 0.08)' : 'rgba(239, 68, 68, 0.12)';
        }

        palacesSvg += `
            <g id="palace-${pal.id}" class="nine-palace-cell">
                <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${cellBg}"/>
                <rect x="${x + 60}" y="${y + 60}" width="420" height="180" fill="${isWhite ? 'rgba(255,255,255,0.9)' : 'rgba(15,23,42,0.9)'}" stroke="${gridColor}" stroke-width="15" rx="20"/>
                <text x="${x + 270}" y="${y + 190}" text-anchor="middle" font-family="Inter, sans-serif" font-size="120" font-weight="900" fill="${gridColor}">${pal.short}</text>
                
                <circle cx="${cx - 450}" cy="${cy - 250}" r="180" fill="${isWhite ? '#e0f2fe' : '#0c4a6e'}" stroke="${starSonColor}" stroke-width="25"/>
                <text x="${cx - 450}" y="${cy - 190}" text-anchor="middle" font-family="Inter, sans-serif" font-size="180" font-weight="900" fill="${starSonColor}">${pal.sonStar}</text>

                <circle cx="${cx + 450}" cy="${cy - 250}" r="180" fill="${isWhite ? '#fef3c7' : '#451a03'}" stroke="${starHuongColor}" stroke-width="25"/>
                <text x="${cx + 450}" y="${cy - 190}" text-anchor="middle" font-family="Inter, sans-serif" font-size="180" font-weight="900" fill="${starHuongColor}">${pal.huongStar}</text>

                <text x="${cx}" y="${cy + 220}" text-anchor="middle" font-family="Inter, sans-serif" font-size="420" font-weight="900" fill="${numColor}" opacity="0.85">${pal.vanStar}</text>
            </g>
        `;
    });

    const labelPad = 320;
    const borderLabelsSvg = `
        <text x="${cellW * 0.5}" y="${-labelPad}" text-anchor="middle" font-family="Inter, sans-serif" font-size="200" font-weight="900" fill="${gridColor}">ĐN</text>
        <text x="${cellW * 1.5}" y="${-labelPad}" text-anchor="middle" font-family="Inter, sans-serif" font-size="200" font-weight="900" fill="${gridColor}">N</text>
        <text x="${cellW * 2.5}" y="${-labelPad}" text-anchor="middle" font-family="Inter, sans-serif" font-size="200" font-weight="900" fill="${gridColor}">TN</text>

        <text x="${cellW * 0.5}" y="${D + labelPad + 160}" text-anchor="middle" font-family="Inter, sans-serif" font-size="200" font-weight="900" fill="${gridColor}">ĐB</text>
        <text x="${cellW * 1.5}" y="${D + labelPad + 160}" text-anchor="middle" font-family="Inter, sans-serif" font-size="200" font-weight="900" fill="${gridColor}">B</text>
        <text x="${cellW * 2.5}" y="${D + labelPad + 160}" text-anchor="middle" font-family="Inter, sans-serif" font-size="200" font-weight="900" fill="${gridColor}">TB</text>

        <text x="${-labelPad - 50}" y="${cellH * 1.5 + 60}" text-anchor="middle" font-family="Inter, sans-serif" font-size="200" font-weight="900" fill="${gridColor}">Đ</text>
        <text x="${W + labelPad + 50}" y="${cellH * 1.5 + 60}" text-anchor="middle" font-family="Inter, sans-serif" font-size="200" font-weight="900" fill="${gridColor}">T</text>
    `;

    return `
        <g id="layer-fengshui-overlay" class="fengshui-nine-palaces">
            ${gridLinesSvg}
            ${palacesSvg}
            ${borderLabelsSvg}
        </g>
    `;
}

// ============================================================
// 9. INTERACTIVE SVG VIEWPORT CONTROLLER
// ============================================================
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
            this.svgElement.style.transformOrigin = 'center center';
            this.svgElement.style.transition = 'transform 0.05s ease-out';
            this.updateTransform();
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

    zoomAt(factor) {
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
