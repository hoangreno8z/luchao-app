// ============================================================
// 2. PURE MATH ENGINE (lib/phong_thuy/compass_math.js)
// Hàm toán học thuần túy, không DOM, chuẩn đặc tả 2.2
// Tác giả: Dịch Sư Nguyễn Huy Hoàng
// ============================================================

import { MOUNTAINS_24 } from './compass_data.js';

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

export function getMountainDetail(deg) {
    const normDeg = ((deg % 360) + 360) % 360;
    const mountain = MOUNTAINS_24.find(m => {
        if (m.startDeg > m.endDeg) {
            return normDeg >= m.startDeg || normDeg < m.endDeg;
        }
        return normDeg >= m.startDeg && normDeg < m.endDeg;
    }) || MOUNTAINS_24[1];

    let delta = Math.abs(normDeg - mountain.midDeg);
    if (delta > 180) delta = 360 - delta;

    const isKiemHuong = delta >= 3.0;

    return {
        type: isKiemHuong ? 'Kiêm Hướng' : 'Chính Hướng',
        mountain,
        degree: normDeg,
        deviationDeg: parseFloat(delta.toFixed(2)),
        isKiemHuong
    };
}

export function bspSpacePartition(W, D, fengshuiScores = {}) {
    const isWide = W >= D;
    const rooms = [];
    const corridors = [];

    if (!isWide) {
        // Nhà Ống (Dài > Rộng): Chia 3 nhịp theo trục Dọc
        const frontD = Math.round(D * 0.35);
        const midD = Math.round(D * 0.28);
        const rearD = D - frontD - midD;

        // Trục hành lang giao thông cố định kết nối xuyên suốt
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
        // Nhà Ngang / Biệt Thự: Chia 3 nhịp theo trục Ngang
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
