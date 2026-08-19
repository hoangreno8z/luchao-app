// ============================================================
// Core Computational Geometry Engine (Millimeter-based)
// Tác giả: Dịch Sư Nguyễn Huy Hoàng
// ============================================================

/**
 * Tính diện tích (m²) từ hình chữ nhật có kích thước mm.
 * @param {{ width: number, height: number }} r
 * @returns {number}
 */
export function areaM2(r) {
    return Math.round((r.width * r.height / 1000000) * 100) / 100;
}

/**
 * Tính tâm của hình chữ nhật.
 * @param {{ x: number, y: number, width: number, height: number }} r
 * @returns {{ x: number, y: number }}
 */
export function centerOfRect(r) {
    return {
        x: r.x + r.width / 2,
        y: r.y + r.height / 2
    };
}

/**
 * Kiểm tra 2 hình chữ nhật có chồng lấn (overlap) nhau không.
 * @param {{ x: number, y: number, width: number, height: number }} a
 * @param {{ x: number, y: number, width: number, height: number }} b
 * @param {number} gap - Khoảng cách an toàn (mm)
 * @returns {boolean}
 */
export function overlaps(a, b, gap = 0) {
    return !(
        a.x + a.width + gap <= b.x ||
        b.x + b.width + gap <= a.x ||
        a.y + a.height + gap <= b.y ||
        b.y + b.height + gap <= a.y
    );
}

/**
 * Kiểm tra hình chữ nhật A có nằm trọn vẹn bên trong boundary không.
 * @param {{ x: number, y: number, width: number, height: number }} a
 * @param {{ x: number, y: number, width: number, height: number }} boundary
 * @param {number} margin - Lề mép trong (mm)
 * @returns {boolean}
 */
export function inside(a, boundary, margin = 0) {
    return (
        a.x >= boundary.x + margin &&
        a.y >= boundary.y + margin &&
        a.x + a.width <= boundary.x + boundary.width - margin &&
        a.y + a.height <= boundary.y + boundary.height - margin
    );
}

/**
 * Xoay một điểm p quanh tâm center một góc deg (độ).
 * @param {{ x: number, y: number }} p
 * @param {{ x: number, y: number }} center
 * @param {number} deg
 * @returns {{ x: number, y: number }}
 */
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

/**
 * Tính khoảng cách Euclide giữa 2 điểm.
 * @param {{ x: number, y: number }} p1
 * @param {{ x: number, y: number }} p2
 * @returns {number}
 */
export function distance(p1, p2) {
    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;
    return Math.sqrt(dx * dx + dy * dy);
}

/**
 * Tính diện tích đa giác (Shoelace formula) trả về m².
 * @param {Array<{ x: number, y: number }>} points
 * @returns {number}
 */
export function polygonAreaM2(points) {
    if (!points || points.length < 3) return 0;
    let sum = 0;
    const n = points.length;
    for (let i = 0; i < n; i++) {
        const j = (i + 1) % n;
        sum += points[i].x * points[j].y - points[j].x * points[i].y;
    }
    return Math.round((Math.abs(sum) / 2 / 1000000) * 100) / 100;
}

/**
 * Tính trọng tâm đa giác (Centroid) dùng cho nhà chữ L / đa giác.
 * @param {Array<{ x: number, y: number }>} points
 * @returns {{ x: number, y: number }}
 */
export function polygonCentroid(points) {
    if (!points || points.length === 0) return { x: 0, y: 0 };
    if (points.length < 3) {
        let sx = 0, sy = 0;
        points.forEach(p => { sx += p.x; sy += p.y; });
        return { x: sx / points.length, y: sy / points.length };
    }
    let areaSum = 0;
    let cx = 0, cy = 0;
    const n = points.length;
    for (let i = 0; i < n; i++) {
        const j = (i + 1) % n;
        const cross = points[i].x * points[j].y - points[j].x * points[i].y;
        areaSum += cross;
        cx += (points[i].x + points[j].x) * cross;
        cy += (points[i].y + points[j].y) * cross;
    }
    const a = areaSum * 0.5;
    if (Math.abs(a) < 1e-6) {
        return { x: points[0].x, y: points[0].y };
    }
    return {
        x: Math.round(cx / (6 * a)),
        y: Math.round(cy / (6 * a))
    };
}
