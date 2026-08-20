// ============================================================
// Feng Shui Spatial Engine & Nine Palaces Overlay Renderer
// Tác giả: Dịch Sư Nguyễn Huy Hoàng
// ============================================================

import {
    calculateFlyingStars,
    getOrientedPalaceGrid,
    PALACE_NAMES,
    PALACE_SHORT
} from './huyen_khong_engine.js';
import { calculateGua } from './bat_trach_engine.js';

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
                <!-- Niên Tinh -->
                <circle cx="${cx - badgeSpacing * 1.5}" cy="${timeBadgesY}" r="50" fill="#22c55e" stroke="#15803d" stroke-width="6"/>
                <text x="${cx - badgeSpacing * 1.5}" y="${timeBadgesY + 18}" text-anchor="middle" font-size="50" font-weight="900" fill="#ffffff">${nienStar}</text>
                <!-- Nguyệt Tinh -->
                <circle cx="${cx - badgeSpacing * 0.5}" cy="${timeBadgesY}" r="50" fill="#ef4444" stroke="#b91c1c" stroke-width="6"/>
                <text x="${cx - badgeSpacing * 0.5}" y="${timeBadgesY + 18}" text-anchor="middle" font-size="50" font-weight="900" fill="#ffffff">${nguyetStar}</text>
                <!-- Nhật Tinh -->
                <circle cx="${cx + badgeSpacing * 0.5}" cy="${timeBadgesY}" r="50" fill="#3b82f6" stroke="#1d4ed8" stroke-width="6"/>
                <text x="${cx + badgeSpacing * 0.5}" y="${timeBadgesY + 18}" text-anchor="middle" font-size="50" font-weight="900" fill="#ffffff">${nhatStar}</text>
                <!-- Thời Tinh -->
                <circle cx="${cx + badgeSpacing * 1.5}" cy="${timeBadgesY}" r="50" fill="#eab308" stroke="#ca8a04" stroke-width="6"/>
                <text x="${cx + badgeSpacing * 1.5}" y="${timeBadgesY + 18}" text-anchor="middle" font-size="50" font-weight="900" fill="#000000">${thoiStar}</text>
            </g>
        `;

        cellsSvg += `
            <g class="fengshui-palace-cell">
                <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${cellFill}" stroke="${cellStroke}" stroke-width="14" stroke-dasharray="40,20"/>
                ${timeBadgesSvg}
                <!-- Bộ 3 Sao Huyền Không Cửu Cung -->
                <!-- Sơn Tinh (Trái - Xanh Dương) -->
                <text x="${cx - w * 0.28}" y="${cy + 40}" text-anchor="middle" font-size="180" font-weight="900" fill="#38bdf8">${sonStar}</text>
                <!-- Vận Tinh (Giữa - Chữ số Lớn) -->
                <text x="${cx}" y="${cy + 70}" text-anchor="middle" font-size="260" font-weight="900" fill="${isWhite ? '#0f172a' : '#ffffff'}">${vanStar}</text>
                <!-- Hướng Tinh (Phải - Đỏ) -->
                <text x="${cx + w * 0.28}" y="${cy + 40}" text-anchor="middle" font-size="180" font-weight="900" fill="#ef4444">${huongStar}</text>
                <!-- Nhãn Hướng & Cát Hung -->
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
