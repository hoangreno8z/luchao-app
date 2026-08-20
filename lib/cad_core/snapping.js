// ============================================================
// CAD Core Snapping & Smart Alignment Engine v8.0
// Hỗ trợ bắt điểm lưới Grid, bắt đỉnh Vertex, bắt cạnh Edge và đường gióng thẳng hàng
// ============================================================

/**
 * Bắt một giá trị vào bước lưới Grid
 */
export function snapToGrid(value, gridSize = 100) {
    if (!gridSize || gridSize <= 0) return Math.round(value);
    return Math.round(value / gridSize) * gridSize;
}

/**
 * Bắt tọa độ điểm {x, y} vào lưới Grid
 */
export function snapPointToGrid(pt, gridSize = 100) {
    return {
        x: snapToGrid(pt.x, gridSize),
        y: snapToGrid(pt.y, gridSize)
    };
}

/**
 * Bắt góc xoay theo các góc tròn đặc biệt (0, 45, 90, 135, 180, 225, 270, 315, 360)
 */
export function snapAngle(deg, threshold = 6, snapAngles = [0, 45, 90, 135, 180, 225, 270, 315, 360]) {
    let normalized = deg % 360;
    if (normalized < 0) normalized += 360;

    for (let target of snapAngles) {
        let diff = Math.abs(normalized - target);
        if (diff <= threshold || Math.abs(diff - 360) <= threshold) {
            return target % 360;
        }
    }
    return Math.round(normalized * 10) / 10;
}

/**
 * Bắt điểm vào danh sách các đỉnh (Vertices / Corners)
 */
export function snapPointToVertices(pt, vertices, threshold = 150) {
    if (!vertices || vertices.length === 0) return { point: pt, snapped: false, target: null };

    let bestDist = Infinity;
    let bestPt = null;

    for (let v of vertices) {
        const d = Math.hypot(pt.x - v.x, pt.y - v.y);
        if (d < threshold && d < bestDist) {
            bestDist = d;
            bestPt = { x: v.x, y: v.y, name: v.name || '' };
        }
    }

    if (bestPt) {
        return { point: bestPt, snapped: true, target: bestPt, dist: bestDist };
    }
    return { point: pt, snapped: false, target: null };
}

/**
 * Bắt đường gióng căn hàng thông minh (Smart Alignment Guides)
 * So sánh bounding box của vật thể đang kéo với tất cả vật thể khác trên canvas
 */
export function findSmartSnapping(targetBox, otherBoxes, threshold = 120) {
    let snappedX = targetBox.x;
    let snappedY = targetBox.y;
    const guides = [];

    const targetLeft = targetBox.x;
    const targetRight = targetBox.x + targetBox.w;
    const targetCenterX = targetBox.x + targetBox.w / 2;

    const targetTop = targetBox.y;
    const targetBottom = targetBox.y + targetBox.h;
    const targetCenterY = targetBox.y + targetBox.h / 2;

    let minDiffX = threshold;
    let minDiffY = threshold;

    for (let box of otherBoxes) {
        if (!box || box.id === targetBox.id) continue;

        const otherLeft = box.x;
        const otherRight = box.x + box.w;
        const otherCenterX = box.x + box.w / 2;

        const otherTop = box.y;
        const otherBottom = box.y + box.h;
        const otherCenterY = box.y + box.h / 2;

        // 1. Kiểm tra gióng trục X (Left-Left, Right-Right, Left-Right, Center-Center)
        const xChecks = [
            { diff: otherLeft - targetLeft, newX: otherLeft, guideX: otherLeft },
            { diff: otherRight - targetRight, newX: otherRight - targetBox.w, guideX: otherRight },
            { diff: otherRight - targetLeft, newX: otherRight, guideX: otherRight },
            { diff: otherLeft - targetRight, newX: otherLeft - targetBox.w, guideX: otherLeft },
            { diff: otherCenterX - targetCenterX, newX: otherCenterX - targetBox.w / 2, guideX: otherCenterX }
        ];

        for (let check of xChecks) {
            if (Math.abs(check.diff) < minDiffX) {
                minDiffX = Math.abs(check.diff);
                snappedX = check.newX;
                guides.push({
                    type: 'vertical',
                    x: check.guideX,
                    y1: Math.min(targetTop, otherTop) - 200,
                    y2: Math.max(targetBottom, otherBottom) + 200
                });
            }
        }

        // 2. Kiểm tra gióng trục Y (Top-Top, Bottom-Bottom, Top-Bottom, Center-Center)
        const yChecks = [
            { diff: otherTop - targetTop, newY: otherTop, guideY: otherTop },
            { diff: otherBottom - targetBottom, newY: otherBottom - targetBox.h, guideY: otherBottom },
            { diff: otherBottom - targetTop, newY: otherBottom, guideY: otherBottom },
            { diff: otherTop - targetBottom, newY: otherTop - targetBox.h, guideY: otherTop },
            { diff: otherCenterY - targetCenterY, newY: otherCenterY - targetBox.h / 2, guideY: otherCenterY }
        ];

        for (let check of yChecks) {
            if (Math.abs(check.diff) < minDiffY) {
                minDiffY = Math.abs(check.diff);
                snappedY = check.newY;
                guides.push({
                    type: 'horizontal',
                    y: check.guideY,
                    x1: Math.min(targetLeft, otherLeft) - 200,
                    x2: Math.max(targetRight, otherRight) + 200
                });
            }
        }
    }

    return {
        x: Math.round(snappedX),
        y: Math.round(snappedY),
        guides: guides.slice(-4) // Giữ tối đa 4 đường gióng gần nhất để tránh rối mắt
    };
}
