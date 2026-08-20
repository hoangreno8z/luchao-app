// ============================================================
// CAD Core Geometry Module v8.0
// Cung cấp các hàm toán học hình học 2D chính xác cho CAD Studio
// ============================================================

/**
 * Tạo đối tượng điểm 2D
 */
export function point(x, y) {
    return { x: Number(x) || 0, y: Number(y) || 0 };
}

/**
 * Khoảng cách Euclid giữa 2 điểm
 */
export function distance(p1, p2) {
    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;
    return Math.hypot(dx, dy);
}

/**
 * Trung điểm của đoạn thẳng nối 2 điểm
 */
export function midpoint(p1, p2) {
    return {
        x: (p1.x + p2.x) / 2,
        y: (p1.y + p2.y) / 2
    };
}

/**
 * Vector từ p1 đến p2
 */
export function vector(p1, p2) {
    return { x: p2.x - p1.x, y: p2.y - p1.y };
}

/**
 * Độ dài của vector
 */
export function vectorLength(v) {
    return Math.hypot(v.x, v.y);
}

/**
 * Vector đơn vị (chuẩn hóa)
 */
export function normalize(v) {
    const len = Math.hypot(v.x, v.y);
    if (len === 0) return { x: 0, y: 0 };
    return { x: v.x / len, y: v.y / len };
}

/**
 * Vector pháp tuyến (vuông góc 90 độ theo chiều kim đồng hồ)
 */
export function normalVector(v) {
    const n = normalize(v);
    return { x: -n.y, y: n.x };
}

/**
 * Tích vô hướng (dot product)
 */
export function dotProduct(v1, v2) {
    return v1.x * v2.x + v1.y * v2.y;
}

/**
 * Tích có hướng 2D (cross product / 2D determinant)
 */
export function crossProduct2D(v1, v2) {
    return v1.x * v2.y - v1.y * v2.x;
}

/**
 * Góc giữa 2 điểm theo độ (0 - 360 độ)
 */
export function angleBetweenPoints(p1, p2) {
    const rad = Math.atan2(p2.y - p1.y, p2.x - p1.x);
    let deg = rad * (180 / Math.PI);
    if (deg < 0) deg += 360;
    return deg;
}

/**
 * Xoay một điểm quanh tâm (center) một góc (degree)
 */
export function rotatePoint(pt, center, deg) {
    const rad = deg * (Math.PI / 180);
    const cos = Math.cos(rad);
    const sin = Math.sin(rad);
    const dx = pt.x - center.x;
    const dy = pt.y - center.y;
    return {
        x: center.x + (dx * cos - dy * sin),
        y: center.y + (dx * sin + dy * cos)
    };
}

/**
 * Tính Bounding Box của một tập hợp các điểm
 */
export function getBoundingBox(points) {
    if (!points || points.length === 0) {
        return { minX: 0, minY: 0, maxX: 0, maxY: 0, width: 0, height: 0, centerX: 0, centerY: 0 };
    }
    let minX = Infinity, minY = Infinity;
    let maxX = -Infinity, maxY = -Infinity;

    for (let i = 0; i < points.length; i++) {
        const p = points[i];
        if (p.x < minX) minX = p.x;
        if (p.y < minY) minY = p.y;
        if (p.x > maxX) maxX = p.x;
        if (p.y > maxY) maxY = p.y;
    }

    const width = maxX - minX;
    const height = maxY - minY;
    return {
        minX,
        minY,
        maxX,
        maxY,
        width,
        height,
        centerX: minX + width / 2,
        centerY: minY + height / 2
    };
}

/**
 * Diện tích đa giác (Polygon Area bằng công thức Shoelace)
 */
export function polygonArea(points) {
    if (!points || points.length < 3) return 0;
    let area = 0;
    const n = points.length;
    for (let i = 0; i < n; i++) {
        const j = (i + 1) % n;
        area += points[i].x * points[j].y;
        area -= points[j].x * points[i].y;
    }
    return Math.abs(area) / 2;
}

/**
 * Trọng tâm của đa giác (Centroid)
 */
export function polygonCentroid(points) {
    if (!points || points.length === 0) return { x: 0, y: 0 };
    if (points.length < 3) {
        return midpoint(points[0], points[points.length - 1]);
    }
    let cx = 0, cy = 0;
    let signedArea = 0;
    const n = points.length;

    for (let i = 0; i < n; i++) {
        const p1 = points[i];
        const p2 = points[(i + 1) % n];
        const a = p1.x * p2.y - p2.x * p1.y;
        signedArea += a;
        cx += (p1.x + p2.x) * a;
        cy += (p1.y + p2.y) * a;
    }

    signedArea *= 0.5;
    if (Math.abs(signedArea) < 1e-6) {
        const bb = getBoundingBox(points);
        return { x: bb.centerX, y: bb.centerY };
    }

    cx /= (6 * signedArea);
    cy /= (6 * signedArea);
    return { x: Math.round(cx), y: Math.round(cy) };
}

/**
 * Kiểm tra điểm có nằm trong đa giác hay không (Ray-Casting Algorithm)
 */
export function isPointInPolygon(pt, polygon) {
    if (!polygon || polygon.length < 3) return false;
    let inside = false;
    const n = polygon.length;
    for (let i = 0, j = n - 1; i < n; j = i++) {
        const xi = polygon[i].x, yi = polygon[i].y;
        const xj = polygon[j].x, yj = polygon[j].y;

        const intersect = ((yi > pt.y) !== (yj > pt.y)) &&
            (pt.x < (xj - xi) * (pt.y - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
    }
    return inside;
}

/**
 * Hình chiếu vuông góc của một điểm lên đoạn thẳng [p1, p2]
 */
export function projectPointOnSegment(pt, p1, p2) {
    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;
    const lenSq = dx * dx + dy * dy;
    if (lenSq === 0) return { point: { x: p1.x, y: p1.y }, t: 0, dist: distance(pt, p1) };

    let t = ((pt.x - p1.x) * dx + (pt.y - p1.y) * dy) / lenSq;
    t = Math.max(0, Math.min(1, t));

    const proj = {
        x: p1.x + t * dx,
        y: p1.y + t * dy
    };

    return {
        point: proj,
        t: t,
        dist: distance(pt, proj)
    };
}

/**
 * Tìm giao điểm giữa 2 đoạn thẳng [a1, a2] và [b1, b2]
 */
export function segmentIntersection(a1, a2, b1, b2) {
    const dax = a2.x - a1.x;
    const day = a2.y - a1.y;
    const dbx = b2.x - b1.x;
    const dby = b2.y - b1.y;

    const denom = dax * dby - day * dbx;
    if (Math.abs(denom) < 1e-9) return null; // Song song hoặc trùng nhau

    const t = ((b1.x - a1.x) * dby - (b1.y - a1.y) * dbx) / denom;
    const u = ((b1.x - a1.x) * day - (b1.y - a1.y) * dax) / denom;

    if (t >= 0 && t <= 1 && u >= 0 && u <= 1) {
        return {
            x: a1.x + t * dax,
            y: a1.y + t * day,
            t,
            u
        };
    }
    return null;
}

/**
 * Kiểm tra 2 hình chữ nhật trục tọa độ có giao nhau không
 */
export function rectsOverlap(r1, r2) {
    return !(
        r1.x + r1.w <= r2.x ||
        r2.x + r2.w <= r1.x ||
        r1.y + r1.h <= r2.y ||
        r2.y + r2.h <= r1.y
    );
}
