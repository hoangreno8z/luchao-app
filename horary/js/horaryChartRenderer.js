/**
 * horaryChartRenderer.js - Trình Vẽ Lá Số Horary Bằng SVG Thuần Khung Vuông 1200x1200px
 * ZERO EMOJIS - Tất cả ký hiệu hoàng đạo, hành tinh, góc chiếu và chuyển động
 * được vẽ hoàn toàn bằng vector path SVG.
 *
 * ĐẶC TẢ HÌNH HỌC & THIÊN VĂN:
 * - Canvas cố định: 1200 x 1200 px (Export) / ViewBox responsive (Screen).
 * - Nền vuông <rect width="1200" height="1200" ... /> bao bọc.
 * - Trục ASC (Ascendant): Nằm chính xác tại hướng 9 giờ (mép trái, x = cx - R, y = cy).
 * - Trục DSC (Descendant): Nằm chính xác tại hướng 3 giờ (mép phải, x = cx + R, y = cy).
 * - Trục MC (Midheaven): Hướng lên trên (x = cx, y = cy - R).
 * - Trục IC (Imum Coeli): Hướng xuống dưới (x = cx, y = cy + R).
 * - Chiều di chuyển hoàng đạo: Ngược chiều kim đồng hồ (Counter-Clockwise).
 * - Phân tách rõ rệt SCREEN RENDERER vs EXPORT RENDERER:
 *   + SCREEN: SVG luôn là DOM chính. Mobile (<=768px) tinh giản 4 góc chú thích và branding lớn, tăng kích thước glyph/text (>= 9 CSS px) để đọc rõ.
 *   + EXPORT: Bản 1200x1200px hoặc 2400x2400px đầy đủ 4 góc chú thích và branding khi người dùng bấm nút tải ảnh PNG.
 * - Vẽ đầy đủ Pars Fortunae (William Lilly CA p.143) với glyph riêng và thuật toán chống chồng lấn (Collision Avoidance).
 * - Dùng duy nhất API formatZodiacLongitude (Zero formatter ad-hoc).
 */

import { GLYPH_PATHS, getGlyphGroupXml } from './svgGlyphs.js';
import { formatZodiacLongitude } from './traditionalRulers.js';

export class HoraryChartRenderer {
    constructor(containerId, options = {}) {
        this.container = typeof containerId === 'string' ? document.getElementById(containerId) : containerId;
        this.options = {
            width: 1200,
            height: 1200,
            centerX: 600,
            centerY: 600,
            radiusOuter: 450,
            radiusZodiacRing: 400,
            radiusHouses: 340,
            radiusPlanets: 260,
            radiusInner: 160,
            bgColor: '#e7e8e2',
            cardBgColor: '#f4f5f0',
            textColor: '#1e293b',
            accentColor: '#8a4b18',
            showAspectLines: true,
            ...options
        };
        this.chartData = null;
        this.aspects = [];
    }

    /**
     * Hàm chuyển đổi tọa độ kinh độ hoàng đạo sang tọa độ phẳng (x, y) trên SVG.
     * Quy ước thiên văn cổ điển:
     * - ASC (Ascendant) tại hướng 9 giờ (mép trái, theta = 0).
     * - DSC (Descendant) tại hướng 3 giờ (mép phải, theta = 180°).
     * - Hoàng đạo tăng dần theo chiều ngược chiều kim đồng hồ.
     */
    eclipticToSvg(eclipticLon, ascAngle, radius, centerX = this.options.centerX, centerY = this.options.centerY) {
        const thetaRad = ((eclipticLon - ascAngle) % 360 + 360) % 360 * Math.PI / 180;
        const x = centerX - radius * Math.cos(thetaRad);
        const y = centerY + radius * Math.sin(thetaRad);
        return { x, y, thetaRad };
    }

    /**
     * Cập nhật dữ liệu lá số và tiến hành vẽ.
     * Desktop: SVG trực tiếp tương tác.
     * Mobile: Render SVG tức thì, sau đó chuyển sang thẻ <img> (PNG) để hỗ trợ nhấn giữ lưu ảnh trên iOS/Android.
     * Chống Race Condition thông qua this.renderGeneration token.
     */
    async render(chartData, aspects = [], renderOptions = {}) {
        this.chartData = chartData;
        this.aspects = aspects;

        if (!this.container) return;

        const isMobile = renderOptions.isMobile !== undefined ?
            renderOptions.isMobile :
            (typeof window !== 'undefined' && window.innerWidth <= 768);

        // Render generation token để chống race condition khi chuyển đổi PNG bất đồng bộ
        this.renderGeneration = (this.renderGeneration || 0) + 1;
        const gen = this.renderGeneration;

        const svgXml = this.generateSvgXml({ isExport: false, isMobile });

        // Bước 1: Hiển thị ngay SVG trên màn hình (đảm bảo phản hồi tức thì)
        this.container.innerHTML = `
            <div id="chart-display-wrapper" style="width:100%; max-width:720px; margin:0 auto; position:relative;">
                ${svgXml}
            </div>
        `;

        // Bước 2: Trên Mobile, chuyển đổi screen SVG thành ảnh PNG để hỗ trợ nhấn giữ lưu ảnh
        if (isMobile && typeof window !== 'undefined' && typeof Image !== 'undefined') {
            try {
                const pngDataUrl = await this.svgToPngDataUrl(svgXml, 1);
                if (gen !== this.renderGeneration) return;

                const wrapper = this.container.querySelector('#chart-display-wrapper');
                if (wrapper) {
                    wrapper.innerHTML = `
                        <img
                            id="horary-chart-img"
                            src="${pngDataUrl}"
                            alt="Lá số Horary"
                            draggable="true"
                        />
                    `;
                }
            } catch (err) {
                console.warn('Không thể chuyển đổi mobile SVG sang PNG, giữ nguyên SVG:', err);
            }
        }
    }

    /**
     * Bật/tắt đường nối aspect lines
     */
    toggleAspectLines(show) {
        if (show !== undefined) {
            this.options.showAspectLines = show;
        } else {
            this.options.showAspectLines = !this.options.showAspectLines;
        }
        if (this.chartData) {
            this.render(this.chartData, this.aspects);
        }
        return this.options.showAspectLines;
    }

    /**
     * Sinh toàn bộ mã XML SVG
     * Hỗ trợ hai chế độ:
     * - Screen Mode (mobile: tinh giản chú thích ngoài rìa, tăng kích thước text/glyph)
     * - Export Mode (giữ nguyên khung 1200x1200 đầy đủ 4 góc chú thích và branding)
     */
    generateSvgXml(customOptions = {}) {
        const isExport = customOptions.isExport || this.options.isExport || false;
        const isMobile = !isExport && (customOptions.isMobile !== undefined ?
            customOptions.isMobile :
            (typeof window !== 'undefined' && window.innerWidth <= 768));

        const { width, height, centerX, centerY, radiusOuter, radiusZodiacRing, radiusHouses, radiusPlanets, radiusInner, bgColor, cardBgColor, textColor, accentColor } = this.options;
        const houses = this.chartData?.houses;
        const planets = this.chartData?.planets || [];

        // Góc ASC (Ascendant): Trục ASC luôn nằm ở vị trí 9 giờ (mép trái)
        const ascAngle = houses ? houses.ascendant : 0;

        // Cấu hình ViewBox tối ưu: mobile tập trung vào wheel để phóng to các chi tiết
        const viewBox = isMobile ? "70 70 1060 1060" : `0 0 ${width} ${height}`;
        const svgWidth = isExport ? `${width}` : "100%";
        const svgHeight = isExport ? `${height}` : "100%";

        let svg = `<svg id="horary-main-svg" xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" width="${svgWidth}" height="${svgHeight}" style="background:${bgColor}; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; display: block; margin: 0 auto;">
            <defs>
                <filter id="card-shadow" x="-5%" y="-5%" width="110%" height="110%">
                    <feDropShadow dx="0" dy="4" stdDeviation="6" flood-opacity="0.08" />
                </filter>
            </defs>

            <!-- 1. NỀN VUÔNG KHUNG BẢO VỆ -->
            <rect width="${width}" height="${height}" fill="${bgColor}" />

            <!-- Khung viền chỉn chu (chỉ hiển thị khi export hoặc desktop) -->
            ${!isMobile ? `
            <rect x="20" y="20" width="${width - 40}" height="${height - 40}" rx="16" fill="none" stroke="#cfd3c7" stroke-width="2" />
            <rect x="26" y="26" width="${width - 52}" height="${height - 52}" rx="12" fill="none" stroke="#cfd3c7" stroke-width="1" stroke-dasharray="4 4" />
            ` : ''}
        `;

        // =========================================================================
        // 2. BỐN GÓC CHÚ THÍCH (4 CORNER LEGENDS) - CHỈ DÙNG CHO EXPORT / DESKTOP
        // =========================================================================
        if (!isMobile) {
            svg += this.renderCornerLegends();
        }

        // =========================================================================
        // 3. VÒNG TRÒN LÁ SỐ TRUNG TÂM (HORARY WHEEL)
        // =========================================================================
        svg += `<!-- Vòng tròn nền lá số -->
            <circle cx="${centerX}" cy="${centerY}" r="${radiusOuter}" fill="${cardBgColor}" stroke="#b0b5a5" stroke-width="2.5" filter="url(#card-shadow)" />
            <circle cx="${centerX}" cy="${centerY}" r="${radiusZodiacRing}" fill="none" stroke="#c5cab8" stroke-width="1.5" />
            <circle cx="${centerX}" cy="${centerY}" r="${radiusHouses}" fill="none" stroke="#c5cab8" stroke-width="1.5" />
            <circle cx="${centerX}" cy="${centerY}" r="${radiusInner}" fill="${bgColor}" stroke="#b0b5a5" stroke-width="2" />
        `;

        // Vẽ 12 Vành Cung Hoàng Đạo (Zodiac Ring)
        svg += this.renderZodiacWheel(ascAngle);

        // Vẽ 12 Đỉnh Nhà Regiomontanus (House Cusps & Spokes)
        if (houses) {
            svg += this.renderHouseSpokes(houses, ascAngle, isMobile);
        }

        // Vẽ các đường Aspect Lines nếu được bật
        if (this.options.showAspectLines && this.aspects.length > 0) {
            svg += this.renderAspectLines(planets, ascAngle);
        }

        // =========================================================================
        // 4. TRUNG TÂM LÁ SỐ (CENTER BRANDING BOX)
        // Thứ tự DOM: aspect-lines -> center-branding-background -> center-branding-text
        // =========================================================================
        if (!isMobile) {
            svg += `<!-- Hộp thông tin trung tâm (Desktop / Export) -->
                <g id="center-branding" text-anchor="middle">
                    <rect x="${centerX - 95}" y="${centerY - 55}" width="190" height="135" rx="10" fill="${cardBgColor}" fill-opacity="0.88" />
                    <text x="${centerX}" y="${centerY - 35}" font-size="22" font-weight="800" fill="${accentColor}" letter-spacing="1">HUY HOÀNG</text>
                    <text x="${centerX}" y="${centerY - 10}" font-size="16" font-weight="700" fill="#334155" letter-spacing="0.5">Zalo 0933116860</text>
                    
                    <line x1="${centerX - 65}" y1="${centerY + 4}" x2="${centerX + 65}" y2="${centerY + 4}" stroke="#cfd3c7" stroke-width="1.5" />

                    <text x="${centerX}" y="${centerY + 24}" font-size="13" font-weight="700" fill="#475569" letter-spacing="1.5">HORARY TRUYỀN THỐNG</text>
                    <text x="${centerX}" y="${centerY + 44}" font-size="12" font-weight="600" fill="#64748b">Regiomontanus — William Lilly</text>

                    ${this.chartData ? `<text x="${centerX}" y="${centerY + 68}" font-size="11" font-weight="500" fill="#788896">${this.chartData.localTimeFormatted} • ${this.chartData.location.name}</text>` : ''}
                </g>
            `;
        } else {
            // Mobile: Phục hồi số Zalo, có nền che mờ aspect lines đi qua tâm
            svg += `
                <g id="center-branding-mobile" text-anchor="middle">
                    <rect x="${centerX - 75}" y="${centerY - 45}" width="150" height="96" rx="8" fill="${cardBgColor}" fill-opacity="0.88" />
                    <text x="${centerX}" y="${centerY - 26}" font-size="18" font-weight="800" fill="${accentColor}" letter-spacing="1">HUY HOÀNG</text>
                    <text x="${centerX}" y="${centerY - 5}" font-size="13.5" font-weight="700" fill="#334155" letter-spacing="0.5">Zalo 0933116860</text>
                    <line x1="${centerX - 48}" y1="${centerY + 7}" x2="${centerX + 48}" y2="${centerY + 7}" stroke="#cfd3c7" stroke-width="1.5" />
                    <text x="${centerX}" y="${centerY + 25}" font-size="12" font-weight="700" fill="#475569">HORARY</text>
                    <text x="${centerX}" y="${centerY + 42}" font-size="10.5" font-weight="600" fill="#64748b">Regiomontanus</text>
                </g>
            `;
        }

        // Vẽ các hành tinh + Pars Fortunae với thuật toán chống đè chữ (Collision Avoidance)
        svg += this.renderPlanetsOnWheel(planets, ascAngle, isMobile);

        svg += `</svg>`;
        return svg;
    }

    /**
     * Vẽ 4 góc chú thích không che khuất lá số (Export & Desktop)
     */
    renderCornerLegends() {
        const { cardBgColor, textColor, accentColor } = this.options;
        let s = `<!-- 4 Góc chú thích (Zero Emojis - 100% Vector Path) -->`;

        const boxW = 220;
        const boxH = 190;

        // Góc Trên - Trái: 6 Cung đầu (Bạch Dương -> Xử Nữ)
        s += `
        <g transform="translate(45, 45)">
            <rect width="${boxW}" height="${boxH}" rx="10" fill="${cardBgColor}" stroke="#cfd3c7" stroke-width="1.5" />
            <text x="16" y="26" font-size="12" font-weight="700" fill="${accentColor}" letter-spacing="0.5">CUNG HOÀNG ĐẠO (1 - 6)</text>
            <line x1="16" y1="34" x2="${boxW - 16}" y2="34" stroke="#cfd3c7" stroke-width="1" />
            
            ${this.renderCornerItem('aries', 'Bạch Dương', 16, 56)}
            ${this.renderCornerItem('taurus', 'Kim Ngưu', 16, 80)}
            ${this.renderCornerItem('gemini', 'Song Tử', 16, 104)}
            ${this.renderCornerItem('cancer', 'Cự Giải', 16, 128)}
            ${this.renderCornerItem('leo', 'Sư Tử', 16, 152)}
            ${this.renderCornerItem('virgo', 'Xử Nữ', 16, 176)}
        </g>`;

        // Góc Dưới - Trái: 6 Cung sau (Thiên Bình -> Song Ngư)
        s += `
        <g transform="translate(45, 965)">
            <rect width="${boxW}" height="${boxH}" rx="10" fill="${cardBgColor}" stroke="#cfd3c7" stroke-width="1.5" />
            <text x="16" y="26" font-size="12" font-weight="700" fill="${accentColor}" letter-spacing="0.5">CUNG HOÀNG ĐẠO (7 - 12)</text>
            <line x1="16" y1="34" x2="${boxW - 16}" y2="34" stroke="#cfd3c7" stroke-width="1" />
            
            ${this.renderCornerItem('libra', 'Thiên Bình', 16, 56)}
            ${this.renderCornerItem('scorpio', 'Bọ Cạp', 16, 80)}
            ${this.renderCornerItem('sagittarius', 'Nhân Mã', 16, 104)}
            ${this.renderCornerItem('capricorn', 'Ma Kết', 16, 128)}
            ${this.renderCornerItem('aquarius', 'Bảo Bình', 16, 152)}
            ${this.renderCornerItem('pisces', 'Song Ngư', 16, 176)}
        </g>`;

        // Góc Trên - Phải: 4 Hành tinh nhanh (Mặt Trời, Mặt Trăng, Thủy, Kim)
        s += `
        <g transform="translate(935, 45)">
            <rect width="${boxW}" height="${boxH}" rx="10" fill="${cardBgColor}" stroke="#cfd3c7" stroke-width="1.5" />
            <text x="16" y="26" font-size="12" font-weight="700" fill="${accentColor}" letter-spacing="0.5">HÀNH TINH NHANH (LUM / INNER)</text>
            <line x1="16" y1="34" x2="${boxW - 16}" y2="34" stroke="#cfd3c7" stroke-width="1" />
            
            ${this.renderCornerItem('sun', 'Mặt Trời (Sun)', 16, 58)}
            ${this.renderCornerItem('moon', 'Mặt Trăng (Moon)', 16, 86)}
            ${this.renderCornerItem('mercury', 'Thủy Tinh (Mercury)', 16, 114)}
            ${this.renderCornerItem('venus', 'Kim Tinh (Venus)', 16, 142)}
            ${this.renderCornerItem('northNode', 'Bắc Giao Điểm (Đầu Rồng)', 16, 170)}
        </g>`;

        // Góc Dưới - Phải: 3 Hành tinh chậm & Ký hiệu chuyển động + POF
        s += `
        <g transform="translate(935, 965)">
            <rect width="${boxW}" height="${boxH}" rx="10" fill="${cardBgColor}" stroke="#cfd3c7" stroke-width="1.5" />
            <text x="16" y="26" font-size="12" font-weight="700" fill="${accentColor}" letter-spacing="0.5">HÀNH TINH CHẬM &amp; ĐIỂM ĐẶC BIỆT</text>
            <line x1="16" y1="34" x2="${boxW - 16}" y2="34" stroke="#cfd3c7" stroke-width="1" />
            
            ${this.renderCornerItem('mars', 'Hỏa Tinh (Mars)', 16, 56)}
            ${this.renderCornerItem('jupiter', 'Mộc Tinh (Jupiter)', 16, 80)}
            ${this.renderCornerItem('saturn', 'Thổ Tinh (Saturn)', 16, 104)}
            ${this.renderCornerItem('southNode', 'Nam Giao Điểm (Đuôi Rồng)', 16, 128)}
            ${this.renderCornerItem('partOfFortune', 'Điểm May Mắn (Pars Fortunae)', 16, 152)}
            ${this.renderCornerItem('retrograde', '℞ Nghịch hành (Retro)', 16, 176)}
        </g>`;

        return s;
    }

    renderCornerItem(glyphKey, labelText, x, y) {
        const glyphXml = getGlyphGroupXml(glyphKey, x + 10, y - 5, 0.75, '#334155', 2);
        return `<g>
            ${glyphXml}
            <text x="${x + 28}" y="${y}" font-size="12" font-weight="600" fill="#334155">${labelText}</text>
        </g>`;
    }

    /**
     * Vẽ vành 12 cung hoàng đạo xung quanh
     */
    renderZodiacWheel(ascAngle) {
        const { radiusOuter, radiusZodiacRing } = this.options;
        const signKeys = ['aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo', 'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces'];
        const signColors = ['#dc2626', '#15803d', '#d97706', '#0284c7', '#dc2626', '#15803d', '#d97706', '#0284c7', '#dc2626', '#15803d', '#d97706', '#0284c7'];

        let s = `<g id="zodiac-ring">`;

        for (let i = 0; i < 12; i++) {
            const startEcliptic = i * 30;
            const midEcliptic = startEcliptic + 15;

            // Tọa độ vạch chia cung
            const pt1 = this.eclipticToSvg(startEcliptic, ascAngle, radiusOuter);
            const pt2 = this.eclipticToSvg(startEcliptic, ascAngle, radiusZodiacRing);

            s += `<line x1="${pt1.x.toFixed(2)}" y1="${pt1.y.toFixed(2)}" x2="${pt2.x.toFixed(2)}" y2="${pt2.y.toFixed(2)}" stroke="#b0b5a5" stroke-width="1.5" />`;

            // Ký hiệu vector cung hoàng đạo tại tâm cung
            const midRadius = (radiusOuter + radiusZodiacRing) / 2;
            const glyphPt = this.eclipticToSvg(midEcliptic, ascAngle, midRadius);

            const glyphXml = getGlyphGroupXml(signKeys[i], glyphPt.x, glyphPt.y, 0.95, signColors[i], 2.2);
            s += glyphXml;
        }

        s += `</g>`;
        return s;
    }

    /**
     * Vẽ 12 đỉnh nhà Regiomontanus và các trục chính ASC, DSC, MC, IC
     * Sử dụng duy nhất API formatZodiacLongitude (loại bỏ hoàn toàn formatter ad-hoc).
     */
    renderHouseSpokes(houses, ascAngle, isMobile = false) {
        const { centerX, centerY, radiusZodiacRing, radiusInner } = this.options;
        let s = `<g id="house-cusps">`;

        const cusps = houses.cusps || [];

        for (let i = 0; i < 12; i++) {
            const houseNum = i + 1;
            const cuspLon = cusps[i];
            if (cuspLon === undefined) continue;

            const isAngular = (houseNum === 1 || houseNum === 4 || houseNum === 7 || houseNum === 10);
            const strokeColor = isAngular ? '#8a4b18' : '#cbd5e1';
            const strokeWidth = isAngular ? (isMobile ? 3.5 : 3.0) : 1.2;

            const pt1 = this.eclipticToSvg(cuspLon, ascAngle, radiusZodiacRing);
            const pt2 = this.eclipticToSvg(cuspLon, ascAngle, radiusInner);

            s += `<line x1="${pt1.x.toFixed(2)}" y1="${pt1.y.toFixed(2)}" x2="${pt2.x.toFixed(2)}" y2="${pt2.y.toFixed(2)}" stroke="${strokeColor}" stroke-width="${strokeWidth}" />`;

            // Nhãn số nhà ở khoang giữa
            const nextCuspLon = cusps[(i + 1) % 12];
            let midHouseLon = (cuspLon + (nextCuspLon < cuspLon ? nextCuspLon + 360 : nextCuspLon)) / 2 % 360;
            const labelR = radiusInner + 30;
            const labelPt = this.eclipticToSvg(midHouseLon, ascAngle, labelR);

            const houseNumFontSize = isMobile ? 21 : 14;
            s += `<text x="${labelPt.x.toFixed(2)}" y="${(labelPt.y + (isMobile ? 7 : 5)).toFixed(2)}" font-size="${houseNumFontSize}" font-weight="700" fill="#64748b" text-anchor="middle">${houseNum}</text>`;
        }

        // =========================================================================
        // NHÃN TRỤC NỔI BẬT: ASC, DSC, MC, IC (DÙNG ĐÚNG formatZodiacLongitude)
        // =========================================================================
        const formatCuspLabel = (degVal) => {
            return formatZodiacLongitude(degVal).formatted;
        };

        const badgeW = isMobile ? 120 : 105;
        const badgeH = isMobile ? 32 : 28;
        const badgeFontSize = isMobile ? 14 : 12;

        // ASC (Nhà 1) - Tọa độ mép trái (9 giờ)
        const ascPt = this.eclipticToSvg(houses.ascendant, ascAngle, radiusZodiacRing + 12);
        s += `
        <g id="axis-asc" transform="translate(${ascPt.x.toFixed(2)}, ${ascPt.y.toFixed(2)})">
            <rect x="${-badgeW}" y="${-badgeH / 2}" width="${badgeW}" height="${badgeH}" rx="6" fill="#8a4b18" />
            <text x="${-badgeW / 2}" y="${badgeFontSize / 2.5}" font-size="${badgeFontSize}" font-weight="800" fill="#ffffff" text-anchor="middle">ASC ${formatCuspLabel(houses.ascendant)}</text>
        </g>`;

        // DSC (Nhà 7) - Tọa độ mép phải (3 giờ)
        const dscPt = this.eclipticToSvg(houses.descendant, ascAngle, radiusZodiacRing + 12);
        s += `
        <g id="axis-dsc" transform="translate(${dscPt.x.toFixed(2)}, ${dscPt.y.toFixed(2)})">
            <rect x="0" y="${-badgeH / 2}" width="${badgeW}" height="${badgeH}" rx="6" fill="#8a4b18" />
            <text x="${badgeW / 2}" y="${badgeFontSize / 2.5}" font-size="${badgeFontSize}" font-weight="800" fill="#ffffff" text-anchor="middle">DSC ${formatCuspLabel(houses.descendant)}</text>
        </g>`;

        // MC (Nhà 10) & IC (Nhà 4)
        const mcBadgeW = isMobile ? 110 : 90;
        const mcPt = this.eclipticToSvg(houses.midheaven, ascAngle, radiusZodiacRing + 25);
        s += `
        <g id="axis-mc" transform="translate(${mcPt.x.toFixed(2)}, ${mcPt.y.toFixed(2)})">
            <rect x="${-mcBadgeW / 2}" y="${-badgeH / 2}" width="${mcBadgeW}" height="${badgeH}" rx="6" fill="#8a4b18" />
            <text x="0" y="${badgeFontSize / 2.5}" font-size="${badgeFontSize}" font-weight="800" fill="#ffffff" text-anchor="middle">MC ${formatCuspLabel(houses.midheaven)}</text>
        </g>`;

        const icPt = this.eclipticToSvg(houses.imumCoeli, ascAngle, radiusZodiacRing + 25);
        s += `
        <g id="axis-ic" transform="translate(${icPt.x.toFixed(2)}, ${icPt.y.toFixed(2)})">
            <rect x="${-mcBadgeW / 2}" y="${-badgeH / 2}" width="${mcBadgeW}" height="${badgeH}" rx="6" fill="#8a4b18" />
            <text x="0" y="${badgeFontSize / 2.5}" font-size="${badgeFontSize}" font-weight="800" fill="#ffffff" text-anchor="middle">IC ${formatCuspLabel(houses.imumCoeli)}</text>
        </g>`;

        s += `</g>`;
        return s;
    }

    /**
     * Vẽ các đường nối góc chiếu (Aspect Lines)
     */
    renderAspectLines(planets, ascAngle) {
        const { radiusInner } = this.options;
        let s = `<g id="aspect-lines" opacity="0.65">`;

        const aspectColors = {
            conjunction: '#f59e0b',
            sextile: '#2563eb',
            square: '#dc2626',
            trine: '#16a34a',
            opposition: '#7c3aed'
        };

        const aspectStrokeWidths = {
            conjunction: 2.5,
            sextile: 1.2,
            square: 2.0,
            trine: 1.8,
            opposition: 2.5
        };

        for (const asp of this.aspects) {
            const pA = planets.find(p => p.id === asp.planetA.id);
            const pB = planets.find(p => p.id === asp.planetB.id);
            if (!pA || !pB) continue;

            const r = radiusInner - 5;
            const ptA = this.eclipticToSvg(pA.longitude, ascAngle, r);
            const ptB = this.eclipticToSvg(pB.longitude, ascAngle, r);

            const color = aspectColors[asp.aspectId] || '#94a3b8';
            const width = aspectStrokeWidths[asp.aspectId] || 1.2;
            const dash = asp.state === 'APPLYING' ? 'none' : '4 3';

            s += `<line x1="${ptA.x.toFixed(2)}" y1="${ptA.y.toFixed(2)}" x2="${ptB.x.toFixed(2)}" y2="${ptB.y.toFixed(2)}" stroke="${color}" stroke-width="${width}" stroke-dasharray="${dash}" />`;
        }

        s += `</g>`;
        return s;
    }

    /**
     * Tính toán Bounding Box bao trọn cả Glyph, ký hiệu Rx/S và nhãn độ phút
     */
    computeBodyBbox(dispPt, body, isMobile, degFontSize) {
        const estimatedTextWidth = (str) => (str ? str.length : 5) * degFontSize * 0.58;
        const rawWidth = Math.max(52, estimatedTextWidth(body.formatted) + 18);
        const rxOffset = (body.isRetrograde || body.isStationary) ? (isMobile ? 18 : 12) : 0;
        const halfW = rawWidth / 2;
        const labelHeight = isMobile ? 66 : 38;
        return {
            minX: dispPt.x - halfW,
            maxX: dispPt.x + halfW + rxOffset,
            minY: dispPt.y - labelHeight / 2,
            maxY: dispPt.y + labelHeight / 2
        };
    }

    /**
     * Kiểm tra hai Bounding Box có giao nhau hay không với padding an toàn
     */
    boxesIntersect(a, b, pad = 12) {
        return !(
            a.maxX + pad < b.minX ||
            a.minX > b.maxX + pad ||
            a.maxY + pad < b.minY ||
            a.minY > b.maxY + pad
        );
    }

    /**
     * Vẽ các hành tinh VÀ Pars Fortunae với Bounding Box Collision Placement Engine.
     * ZERO 7° Threshold — Định vị dựa trên Bounding Box thực, so le bán kính và tiếp tuyến.
     * Đảm bảo không bao giờ thay đổi kinh độ thiên văn thật của thiên thể.
     */
    renderPlanetsOnWheel(planets, ascAngle, isMobile = false) {
        const { radiusPlanets } = this.options;
        let s = `<g id="planets-on-wheel">`;

        // Tập hợp tất cả thiên thể bao gồm Pars Fortunae nếu có
        const allBodies = [...planets];
        if (this.chartData && this.chartData.partOfFortune) {
            allBodies.push(this.chartData.partOfFortune);
        }

        // Sắp xếp các thiên thể theo kinh độ góc
        const sorted = [...allBodies].sort((a, b) => a.longitude - b.longitude);

        // Kích thước chuẩn hóa tối ưu cho mobile theo đặc tả
        const glyphScale = isMobile ? 1.6 : 1.1;
        const degFontSize = isMobile ? 23 : 11;
        const subGlyphScale = isMobile ? 0.9 : 0.65;
        const pad = isMobile ? 12 : 6;

        // B. Các display candidate radius (an toàn trong khoảng giữa radiusInner và radiusZodiacRing)
        const radialLayers = isMobile
            ? [radiusPlanets, radiusPlanets + 58, radiusPlanets - 58, radiusPlanets + 105, radiusPlanets - 85]
            : [radiusPlanets, radiusPlanets + 40, radiusPlanets - 40, radiusPlanets + 75, radiusPlanets - 65];

        // E. Tangential displacement theo phương tiếp tuyến của longitude
        const tangentialDisplacements = isMobile
            ? [0, 20, -20, 35, -35, 50, -50, 70, -70, 90, -90]
            : [0, 15, -15, 30, -30, 45, -45];

        // Tập hợp danh sách ứng viên sắp xếp theo khoảng cách Euclidean tới vị trí tự nhiên
        const candidatePool = [];
        for (const r of radialLayers) {
            for (const d of tangentialDisplacements) {
                const dist = Math.sqrt((r - radiusPlanets) ** 2 + d ** 2);
                candidatePool.push({ r, d, dist });
            }
        }
        candidatePool.sort((a, b) => a.dist - b.dist);

        const placed = [];

        for (let i = 0; i < sorted.length; i++) {
            const p = sorted[i];

            // A. True anchor: anchorPt = eclipticToSvg(body.longitude, ascAngle, radiusPlanets)
            const anchorPt = this.eclipticToSvg(p.longitude, ascAngle, radiusPlanets);

            // Vector tiếp tuyến thuận chiều hoàng đạo (tangent unit vector)
            const tx = Math.sin(anchorPt.thetaRad);
            const ty = Math.cos(anchorPt.thetaRad);

            let chosenCandidate = null;
            let minOverlapCandidate = null;
            let minOverlapScore = Infinity;

            for (const cand of candidatePool) {
                const basePt = this.eclipticToSvg(p.longitude, ascAngle, cand.r);
                const dispPt = {
                    x: basePt.x + cand.d * tx,
                    y: basePt.y + cand.d * ty
                };
                const bbox = this.computeBodyBbox(dispPt, p, isMobile, degFontSize);

                // D. Kiểm tra giao nhau với TẤT CẢ bbox đã đặt
                let totalOverlap = 0;
                let hasCollision = false;

                for (const pl of placed) {
                    if (this.boxesIntersect(bbox, pl.bbox, pad)) {
                        hasCollision = true;
                        const xOverlap = Math.max(0, Math.min(bbox.maxX + pad, pl.bbox.maxX + pad) - Math.max(bbox.minX, pl.bbox.minX));
                        const yOverlap = Math.max(0, Math.min(bbox.maxY + pad, pl.bbox.maxY + pad) - Math.max(bbox.minY, pl.bbox.minY));
                        totalOverlap += xOverlap * yOverlap;
                    }
                }

                if (!hasCollision) {
                    chosenCandidate = { dispPt, bbox, ...cand };
                    break;
                }

                const score = totalOverlap + cand.dist * 0.1;
                if (score < minOverlapScore) {
                    minOverlapScore = score;
                    minOverlapCandidate = { dispPt, bbox, ...cand };
                }
            }

            const chosen = chosenCandidate || minOverlapCandidate;
            placed.push({ id: p.id, bbox: chosen.bbox });

            const dispPt = chosen.dispPt;
            const isOffset = Math.hypot(dispPt.x - anchorPt.x, dispPt.y - anchorPt.y) > 4;

            s += `<g id="body-${p.id}" class="chart-body ${p.id}">`;

            // F. Nếu display position khác anchor: luôn vẽ leader line từ true anchor đến display position
            if (isOffset) {
                s += `<line x1="${anchorPt.x.toFixed(2)}" y1="${anchorPt.y.toFixed(2)}" x2="${dispPt.x.toFixed(2)}" y2="${dispPt.y.toFixed(2)}" stroke="#94a3b8" stroke-width="${isMobile ? 1.5 : 1}" stroke-dasharray="2 2" />`;
                s += `<circle cx="${anchorPt.x.toFixed(2)}" cy="${anchorPt.y.toFixed(2)}" r="${isMobile ? 3 : 2}" fill="#8a4b18" />`;
            }

            // G. Pars Fortunae dùng màu nhấn riêng #b45309 để nhận diện tức thì
            const glyphColor = p.id === 'partOfFortune' ? '#b45309' : '#1e293b';
            const glyphXml = getGlyphGroupXml(p.glyphKey, dispPt.x, dispPt.y - (isMobile ? 14 : 8), glyphScale, glyphColor, isMobile ? 2.5 : 2.2);
            s += glyphXml;

            // Kèm ký hiệu nghịch hành ℞ hoặc đứng/trạm S nếu có
            if (p.isRetrograde) {
                const rxXml = getGlyphGroupXml('retrograde', dispPt.x + (isMobile ? 24 : 16), dispPt.y - (isMobile ? 18 : 12), subGlyphScale, '#dc2626', 2.0);
                s += rxXml;
            } else if (p.isStationary) {
                const sXml = getGlyphGroupXml('stationary', dispPt.x + (isMobile ? 24 : 16), dispPt.y - (isMobile ? 18 : 12), subGlyphScale, '#d97706', 2.0);
                s += sXml;
            }

            // Nhãn độ phút (ví dụ 13°11′)
            s += `<text x="${dispPt.x.toFixed(2)}" y="${(dispPt.y + (isMobile ? 26 : 16)).toFixed(2)}" font-size="${degFontSize}" font-weight="700" fill="#334155" text-anchor="middle">${p.formatted}</text>`;
            s += `</g>`;
        }

        s += `</g>`;
        return s;
    }

    /**
     * Chuyển đổi chuỗi XML SVG sang Data URL ảnh PNG cho Export
     */
    async svgToPngDataUrl(svgXml, scale = 1) {
        if (typeof document !== 'undefined' && document.fonts) {
            try {
                await document.fonts.ready;
            } catch (_) {}
        }

        let preparedXml = svgXml;
        if (!preparedXml.includes('width="1200"')) {
            preparedXml = preparedXml.replace(/width="[^"]*"/, 'width="1200"').replace(/height="[^"]*"/, 'height="1200"');
        }

        return new Promise((resolve, reject) => {
            const image = new Image();
            let blobUrl = null;

            image.onload = () => {
                try {
                    const canvas = document.createElement('canvas');
                    canvas.width = 1200 * scale;
                    canvas.height = 1200 * scale;
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
                    if (blobUrl && window.URL && window.URL.revokeObjectURL) {
                        window.URL.revokeObjectURL(blobUrl);
                    }
                    resolve(canvas.toDataURL('image/png'));
                } catch (canvasErr) {
                    if (blobUrl && window.URL && window.URL.revokeObjectURL) {
                        window.URL.revokeObjectURL(blobUrl);
                    }
                    reject(canvasErr);
                }
            };

            image.onerror = (err) => {
                if (blobUrl && window.URL && window.URL.revokeObjectURL) {
                    window.URL.revokeObjectURL(blobUrl);
                }
                reject(err);
            };

            try {
                const b64 = btoa(unescape(encodeURIComponent(preparedXml)));
                image.src = 'data:image/svg+xml;base64,' + b64;
            } catch (_) {
                const svgBlob = new Blob([preparedXml], { type: 'image/svg+xml;charset=utf-8' });
                blobUrl = (window.URL || window.webkitURL || window).createObjectURL(svgBlob);
                image.src = blobUrl;
            }
        });
    }

    /**
     * Xuất lá số ra file ảnh PNG hình vuông sắc nét (1200x1200px hoặc 2400x2400px)
     * Đảm bảo luôn lấy bản EXPORT MODE chứa đầy đủ 4 góc chú thích và branding.
     */
    async exportToPng(scale = 1) {
        const fileName = `horary-${new Date().toISOString().slice(0, 10)}.png`;
        const exportSvgXml = this.generateSvgXml({ isExport: true, isMobile: false });
        const dataUrl = await this.svgToPngDataUrl(exportSvgXml, scale);

        const a = document.createElement('a');
        a.download = fileName;
        a.href = dataUrl;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        return fileName;
    }
}
