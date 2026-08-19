// ============================================================
// Feng Shui Spatial Overlay Engine (Drawing 2)
// Phủ Lưới Cửu Cung Lạc Thư Lên Chính HouseGeometry Của Bản Vẽ 1
// Chuẩn Hình Học & Tinh Bàn Mẫu Ảnh 3
// Tác giả: Dịch Sư Nguyễn Huy Hoàng
// ============================================================

import { calculateFlyingStars } from './huyen_khong_engine.js';
import { calculateGua } from './bat_trach_engine.js';

export const PALACE_POSITIONS = {
    // 9 Cung theo chuẩn Lạc Thư: Hàng 0: Tốn(4), Ly(9), Khôn(2) / Hàng 1: Chấn(3), Trung(5), Đoài(7) / Hàng 2: Cấn(8), Khảm(1), Càn(6)
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

/**
 * Tính toán kết quả không gian phong thủy cho HouseGeometry.
 * @param {Object} geometry - HouseGeometry (mm)
 * @param {Object} options - Tùy chọn hướng nhà, năm xây dựng, mệnh gia chủ
 * @returns {Object} FengShuiSpatialResult
 */
export function calculateFengShuiSpatial(geometry, options = {}) {
    const W = geometry.widthMm || 5000;
    const D = geometry.depthMm || 16000;
    const facingDegree = options.facingDegree !== undefined ? options.facingDegree : (geometry.northAngleDeg || 180);
    const buildYear = options.buildYear || 2025;
    const ownerYear = options.ownerYear || 1990;
    const ownerGender = options.ownerGender || 'nam';

    // 1. Tính toán Tinh Bàn Huyền Không từ huyen_khong_engine
    const flyingStars = calculateFlyingStars({
        facingDegree,
        buildYear,
        frontLandscape: options.frontLandscape || 'duong_lo',
        backLandscape: options.backLandscape || 'nha_cao'
    });

    // 2. Tính toán Bát Trạch Quái Mệnh từ bat_trach_engine
    const batTrach = calculateGua(ownerYear, ownerGender);

    // 3. Phân chia lưới Cửu Cung 3x3 theo kích thước mm
    const cellW = W / 3;
    const cellH = D / 3;

    const spatialPalaces = {};

    Object.entries(PALACE_POSITIONS).forEach(([palaceIdStr, pos]) => {
        const palaceId = parseInt(palaceIdStr, 10);
        const rect = {
            x: pos.c * cellW,
            y: pos.r * cellH,
            width: cellW,
            height: cellH
        };

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
            grade: starInfo && starInfo.analysis ? starInfo.analysis.grade : 'BÌNH',
            analysis: starInfo ? starInfo.analysis : null
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

/**
 * Render Lớp Phủ Cửu Cung Phong Thủy lên trên Bản Vẽ Kiến Trúc CAD.
 * @param {Object} spatialResult - Kết quả từ calculateFengShuiSpatial
 * @param {boolean} isWhite - Chế độ nền trắng
 * @returns {string} SVG snippet
 */
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
        <!-- Lưới Cửu Cung 3x3 nét đứt vàng ánh kim -->
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

        // Màu nền cung Cát/Hung dịu nhẹ bán trong suốt
        let cellBg = 'rgba(255, 255, 255, 0.05)';
        if (pal.grade === 'ĐẠI CÁT' || pal.grade === 'CÁT') {
            cellBg = isWhite ? 'rgba(16, 185, 129, 0.08)' : 'rgba(16, 185, 129, 0.12)';
        } else if (pal.grade === 'ĐẠI HUNG' || pal.grade === 'HUNG') {
            cellBg = isWhite ? 'rgba(239, 68, 68, 0.08)' : 'rgba(239, 68, 68, 0.12)';
        }

        palacesSvg += `
            <g id="palace-${pal.id}" class="nine-palace-cell">
                <!-- Vùng phủ màu nhẹ -->
                <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${cellBg}"/>
                
                <!-- Nhãn tên Phương Vị góc trên bên trái -->
                <rect x="${x + 60}" y="${y + 60}" width="420" height="180" fill="${isWhite ? 'rgba(255,255,255,0.9)' : 'rgba(15,23,42,0.9)'}" stroke="${gridColor}" stroke-width="15" rx="20"/>
                <text x="${x + 270}" y="${y + 190}" text-anchor="middle" font-family="Inter, sans-serif" font-size="120" font-weight="900" fill="${gridColor}">${pal.short}</text>

                <!-- Bộ 3 Số Sao Huyền Không Chuẩn Ảnh 3: -->
                <!-- 1. Sao Sơn (Sơn Tinh - Góc trên trái) -->
                <circle cx="${cx - 450}" cy="${cy - 250}" r="180" fill="${isWhite ? '#e0f2fe' : '#0c4a6e'}" stroke="${starSonColor}" stroke-width="25"/>
                <text x="${cx - 450}" y="${cy - 190}" text-anchor="middle" font-family="Inter, sans-serif" font-size="180" font-weight="900" fill="${starSonColor}">${pal.sonStar}</text>

                <!-- 2. Sao Hướng (Hướng Tinh - Góc trên phải) -->
                <circle cx="${cx + 450}" cy="${cy - 250}" r="180" fill="${isWhite ? '#fef3c7' : '#451a03'}" stroke="${starHuongColor}" stroke-width="25"/>
                <text x="${cx + 450}" y="${cy - 190}" text-anchor="middle" font-family="Inter, sans-serif" font-size="180" font-weight="900" fill="${starHuongColor}">${pal.huongStar}</text>

                <!-- 3. Sao Vận (Vận Tinh - Chính giữa cỡ lớn) -->
                <text x="${cx}" y="${cy + 220}" text-anchor="middle" font-family="Inter, sans-serif" font-size="420" font-weight="900" fill="${numColor}" opacity="0.85">${pal.vanStar}</text>
            </g>
        `;
    });

    // Nhãn phương vị 8 hướng bao quanh mép ngoài căn nhà (như trong ảnh 3: B, ĐB, Đ, ĐN, N, TN, T, TB)
    const labelPad = 320;
    const borderLabelsSvg = `
        <!-- Nhãn biên ngoài chuẩn ảnh 3 -->
        <!-- Hàng Trên: TB (Trái), B (Giữa), ĐB (Phải) -->
        <text x="${cellW * 0.5}" y="${-labelPad}" text-anchor="middle" font-family="Inter, sans-serif" font-size="200" font-weight="900" fill="${gridColor}">ĐN</text>
        <text x="${cellW * 1.5}" y="${-labelPad}" text-anchor="middle" font-family="Inter, sans-serif" font-size="200" font-weight="900" fill="${gridColor}">N</text>
        <text x="${cellW * 2.5}" y="${-labelPad}" text-anchor="middle" font-family="Inter, sans-serif" font-size="200" font-weight="900" fill="${gridColor}">TN</text>

        <!-- Hàng Dưới: Đ (Trái), B (Giữa), Càn (Phải) -->
        <text x="${cellW * 0.5}" y="${D + labelPad + 160}" text-anchor="middle" font-family="Inter, sans-serif" font-size="200" font-weight="900" fill="${gridColor}">ĐB</text>
        <text x="${cellW * 1.5}" y="${D + labelPad + 160}" text-anchor="middle" font-family="Inter, sans-serif" font-size="200" font-weight="900" fill="${gridColor}">B</text>
        <text x="${cellW * 2.5}" y="${D + labelPad + 160}" text-anchor="middle" font-family="Inter, sans-serif" font-size="200" font-weight="900" fill="${gridColor}">TB</text>

        <!-- Cột Trái & Phải -->
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
