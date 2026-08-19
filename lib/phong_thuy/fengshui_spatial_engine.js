// ============================================================
// Feng Shui Spatial Overlay Engine v2.0
// Phủ Lưới Cửu Cung Xoay Theo Hướng Nhà (Hướng Luôn Ở Trên, Tọa Ở Dưới)
// Tác giả: Dịch Sư Nguyễn Huy Hoàng
// ============================================================

import { calculateFlyingStars, getOrientedPalaceGrid, PALACE_NAMES, PALACE_SHORT } from './huyen_khong_engine.js';
import { calculateGua } from './bat_trach_engine.js';

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

    // Lấy thứ tự 9 Cung xoay theo hướng nhà (Hướng ở trên, Tọa ở dưới)
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

        // 4 Sao Thời Gian: Niên, Nguyệt, Nhật, Thời (trên cùng)
        const timeBadgesY = y + Math.min(180, h * 0.18);
        const badgeSpacing = Math.min(140, w * 0.18);

        const timeBadgesSvg = `
            <g class="time-star-badges">
                <!-- Niên Tinh -->
                <circle cx="${cx - badgeSpacing * 1.5}" cy="${timeBadgesY}" r="45" fill="#22c55e" stroke="#15803d" stroke-width="4"/>
                <text x="${cx - badgeSpacing * 1.5}" y="${timeBadgesY + 16}" text-anchor="middle" font-size="45" font-weight="900" fill="#ffffff">${nienStar}</text>

                <!-- Nguyệt Tinh -->
                <circle cx="${cx - badgeSpacing * 0.5}" cy="${timeBadgesY}" r="45" fill="#ef4444" stroke="#b91c1c" stroke-width="4"/>
                <text x="${cx - badgeSpacing * 0.5}" y="${timeBadgesY + 16}" text-anchor="middle" font-size="45" font-weight="900" fill="#ffffff">${nguyetStar}</text>

                <!-- Nhật Tinh -->
                <circle cx="${cx + badgeSpacing * 0.5}" cy="${timeBadgesY}" r="45" fill="#3b82f6" stroke="#1d4ed8" stroke-width="4"/>
                <text x="${cx + badgeSpacing * 0.5}" y="${timeBadgesY + 16}" text-anchor="middle" font-size="45" font-weight="900" fill="#ffffff">${nhatStar}</text>

                <!-- Thời Tinh -->
                <circle cx="${cx + badgeSpacing * 1.5}" cy="${timeBadgesY}" r="45" fill="#eab308" stroke="#a16207" stroke-width="4"/>
                <text x="${cx + badgeSpacing * 1.5}" y="${timeBadgesY + 16}" text-anchor="middle" font-size="45" font-weight="900" fill="#000000">${thoiStar}</text>
            </g>
        `;

        // Bộ 3 Sao Huyền Không Cốt Lõi: [Sơn Tinh] [VẬN TINH] [Hướng Tinh]
        const mainStarY = cy + 30;
        const offsetSide = Math.min(220, w * 0.24);

        const trioStarsSvg = `
            <g class="trio-flying-stars">
                <!-- Sao Sơn (Trái) - Thẻ Vàng -->
                <rect x="${cx - offsetSide - 75}" y="${mainStarY - 80}" width="150" height="160" fill="#facc15" stroke="#ca8a04" stroke-width="6" rx="20"/>
                <text x="${cx - offsetSide}" y="${mainStarY + 35}" text-anchor="middle" font-size="110" font-weight="900" fill="#000000">${sonStar}</text>

                <!-- Sao Vận (Giữa) - Số To Nổi Bật -->
                <text x="${cx}" y="${mainStarY + 45}" text-anchor="middle" font-size="160" font-weight="900" fill="${isWhite ? '#0f172a' : '#f8fafc'}">${vanStar}</text>

                <!-- Sao Hướng (Phải) - Thẻ Đỏ -->
                <circle cx="${cx + offsetSide}" cy="${mainStarY}" r="80" fill="#dc2626" stroke="#b91c1c" stroke-width="6"/>
                <text x="${cx + offsetSide}" y="${mainStarY + 35}" text-anchor="middle" font-size="110" font-weight="900" fill="#ffffff">${huongStar}</text>
            </g>
        `;

        // Nhãn Phương Vị (Dưới cùng của ô)
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

    // Mũi tên chỉ HƯỚNG ở trên đỉnh và TỌA ở dưới đáy
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
