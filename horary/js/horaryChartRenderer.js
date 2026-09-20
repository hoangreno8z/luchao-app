/**
 * horaryChartRenderer.js - Trình Vẽ Lá Số Horary Bằng SVG Thuần Khung Vuông 1200x1200px
 * ZERO EMOJIS - Tất cả ký hiệu hoàng đạo, hành tinh, góc chiếu và chuyển động
 * được vẽ hoàn toàn bằng vector path SVG.
 *
 * ĐẶC TẢ HÌNH HỌC:
 * - Canvas cố định: 1200 x 1200 px.
 * - Nền vuông <rect width="1200" height="1200" ... /> bao bọc.
 * - Vòng tròn lá số trung tâm tâm tại (600, 600).
 * - 4 Góc chú thích: 12 cung, 7 hành tinh, ký hiệu chuyển động.
 * - Trọng tâm ở giữa: "Huy Hoàng - Zalo 0933116860".
 * - 4 Trục ASC, DSC, MC, IC nổi bật.
 * - Chống đè chữ: So le bán kính và vẽ đường gióng leader line khi hành tinh kề sát.
 * - Xuất PNG vuông sắc nét (1200x1200px hoặc 2400x2400px).
 */

import { GLYPH_PATHS, getGlyphGroupXml } from './svgGlyphs.js';

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
     * Cập nhật dữ liệu lá số và tiến hành vẽ
     * Kết xuất ra thẻ <img> với Data URL PNG để hỗ trợ:
     * 1. Click chuột phải "Save image as..." trên PC
     * 2. Nhấn giữ màn hình "Save to Photos" trên iOS/Android
     */
    async render(chartData, aspects = []) {
        this.chartData = chartData;
        this.aspects = aspects;

        if (!this.container) return;

        const svgXml = this.generateSvgXml();
        
        // Hiển thị ngay SVG ban đầu
        this.container.innerHTML = svgXml;

        // Chuyển đổi sang thẻ <img> định dạng PNG data URL
        try {
            const pngDataUrl = await this.svgToPngDataUrl(svgXml, 1);
            this.container.innerHTML = `
                <img id="horary-chart-img" src="${pngDataUrl}" alt="Lá số Horary Chiêm Tinh - Huy Hoàng" style="width:100%; height:auto; display:block; border-radius:12px; box-shadow:0 4px 16px rgba(0,0,0,0.05); -webkit-touch-callout:default; user-select:auto; pointer-events:auto;" />
                <div id="horary-svg-hidden" style="display:none;">${svgXml}</div>
            `;
        } catch (e) {
            console.warn('Fallback sang hiển thị SVG trực tiếp:', e);
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
     * Sinh toàn bộ mã XML SVG 1200x1200px
     */
    generateSvgXml() {
        const { width, height, centerX, centerY, radiusOuter, radiusZodiacRing, radiusHouses, radiusPlanets, radiusInner, bgColor, cardBgColor, textColor, accentColor } = this.options;
        const houses = this.chartData?.houses;
        const planets = this.chartData?.planets || [];

        // Góc ASC (Ascendant): Trong chiêm tinh học truyền thống, trục ASC luôn nằm ở vị trí 9 giờ (góc 180° hình học)
        const ascAngle = houses ? houses.ascendant : 0;

        /**
         * Hàm chuyển đổi kinh độ hoàng đạo (0-360°) sang tọa độ hình học (x, y) trên SVG
         * Với 0° Aries và trục ASC cố định tại hướng 9 giờ (180° trên màn hình)
         * Chiều ngược chiều kim đồng hồ (Counter-clockwise)
         */
        const toSvgCoord = (eclipticLon, radius) => {
            // Tọa độ góc chiêm tinh: ASC ở hướng 180° (bên trái)
            // Các độ tăng dần theo chiều ngược chiều kim đồng hồ
            const chartAngleRad = ((eclipticLon - ascAngle) + 180) * Math.PI / 180;
            const x = centerX - radius * Math.cos(chartAngleRad);
            const y = centerY + radius * Math.sin(chartAngleRad);
            return { x, y, chartAngleRad };
        };

        let svg = `<svg id="horary-main-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="100%" height="100%" style="background:${bgColor}; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
            <defs>
                <filter id="card-shadow" x="-5%" y="-5%" width="110%" height="110%">
                    <feDropShadow dx="0" dy="4" stdDeviation="6" flood-opacity="0.08" />
                </filter>
            </defs>

            <!-- 1. NỀN VUÔNG BẮT BUỘC ĐỂ EXPORT KHÔNG BỊ CẮT VÒNG TRÒN -->
            <rect width="${width}" height="${height}" fill="${bgColor}" />

            <!-- Khung viền chỉn chu -->
            <rect x="20" y="20" width="${width - 40}" height="${height - 40}" rx="16" fill="none" stroke="#cfd3c7" stroke-width="2" />
            <rect x="26" y="26" width="${width - 52}" height="${height - 52}" rx="12" fill="none" stroke="#cfd3c7" stroke-width="1" stroke-dasharray="4 4" />
        `;

        // =========================================================================
        // 2. BỐN GÓC CHÚ THÍCH (4 CORNER LEGENDS) - ZERO EMOJIS, 100% VECTOR PATH
        // =========================================================================
        svg += this.renderCornerLegends();

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
            svg += this.renderHouseSpokes(houses, ascAngle);
        }

        // Vẽ các đường Aspect Lines nếu được bật
        if (this.options.showAspectLines && this.aspects.length > 0) {
            svg += this.renderAspectLines(planets, ascAngle);
        }

        // Vẽ các hành tinh với thuật toán chống đè chữ (Collision Avoidance)
        svg += this.renderPlanetsOnWheel(planets, ascAngle);

        // =========================================================================
        // 4. TRUNG TÂM LÁ SỐ (CENTER BRANDING BOX)
        // =========================================================================
        svg += `<!-- Hộp thông tin trung tâm -->
            <g id="center-branding" text-anchor="middle">
                <!-- Tên tác giả và Zalo -->
                <text x="${centerX}" y="${centerY - 35}" font-size="22" font-weight="800" fill="${accentColor}" letter-spacing="1">HUY HOÀNG</text>
                <text x="${centerX}" y="${centerY - 10}" font-size="16" font-weight="700" fill="#334155" letter-spacing="0.5">Zalo 0933116860</text>
                
                <!-- Đường kẻ phân cách trang nhã -->
                <line x1="${centerX - 65}" y1="${centerY + 4}" x2="${centerX + 65}" y2="${centerY + 4}" stroke="#cfd3c7" stroke-width="1.5" />

                <!-- Tiêu đề Horary & Hệ nhà -->
                <text x="${centerX}" y="${centerY + 24}" font-size="13" font-weight="700" fill="#475569" letter-spacing="1.5">HORARY TRUYỀN THỐNG</text>
                <text x="${centerX}" y="${centerY + 44}" font-size="12" font-weight="600" fill="#64748b">Regiomontanus • Tropical</text>

                <!-- Dấu ấn giờ lập lá số nếu có -->
                ${this.chartData ? `<text x="${centerX}" y="${centerY + 68}" font-size="11" font-weight="500" fill="#788896">${this.chartData.localTimeFormatted} • ${this.chartData.location.name}</text>` : ''}
            </g>
        `;

        svg += `</svg>`;
        return svg;
    }

    /**
     * Vẽ 4 góc chú thích không che khuất lá số
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
            ${this.renderCornerItem('northNode', 'Bắc Giao Điểm (La Hầu)', 16, 170)}
        </g>`;

        // Góc Dưới - Phải: 3 Hành tinh chậm & Ký hiệu chuyển động
        s += `
        <g transform="translate(935, 965)">
            <rect width="${boxW}" height="${boxH}" rx="10" fill="${cardBgColor}" stroke="#cfd3c7" stroke-width="1.5" />
            <text x="16" y="26" font-size="12" font-weight="700" fill="${accentColor}" letter-spacing="0.5">HÀNH TINH CHẬM & VẬN ĐỘNG</text>
            <line x1="16" y1="34" x2="${boxW - 16}" y2="34" stroke="#cfd3c7" stroke-width="1" />
            
            ${this.renderCornerItem('mars', 'Hỏa Tinh (Mars)', 16, 56)}
            ${this.renderCornerItem('jupiter', 'Mộc Tinh (Jupiter)', 16, 80)}
            ${this.renderCornerItem('saturn', 'Thổ Tinh (Saturn)', 16, 104)}
            ${this.renderCornerItem('retrograde', '℞ Nghịch hành (Retro)', 16, 128)}
            ${this.renderCornerItem('direct', 'D Thuận hành (Direct)', 16, 152)}
            ${this.renderCornerItem('stationary', 'S Đứng / Trạm (Stat)', 16, 176)}
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
        const { centerX, centerY, radiusOuter, radiusZodiacRing } = this.options;
        const signKeys = ['aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo', 'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces'];
        const signColors = ['#dc2626', '#15803d', '#d97706', '#0284c7', '#dc2626', '#15803d', '#d97706', '#0284c7', '#dc2626', '#15803d', '#d97706', '#0284c7'];

        let s = `<g id="zodiac-ring">`;

        for (let i = 0; i < 12; i++) {
            const startEcliptic = i * 30;
            const endEcliptic = (i + 1) * 30;
            const midEcliptic = startEcliptic + 15;

            // Chuyển sang góc SVG theo trục ASC
            const startAngRad = ((startEcliptic - ascAngle) + 180) * Math.PI / 180;
            const endAngRad = ((endEcliptic - ascAngle) + 180) * Math.PI / 180;
            const midAngRad = ((midEcliptic - ascAngle) + 180) * Math.PI / 180;

            // Tọa độ vạch chia cung
            const x1 = centerX - radiusOuter * Math.cos(startAngRad);
            const y1 = centerY + radiusOuter * Math.sin(startAngRad);
            const x2 = centerX - radiusZodiacRing * Math.cos(startAngRad);
            const y2 = centerY + radiusZodiacRing * Math.sin(startAngRad);

            s += `<line x1="${x1.toFixed(2)}" y1="${y1.toFixed(2)}" x2="${x2.toFixed(2)}" y2="${y2.toFixed(2)}" stroke="#b0b5a5" stroke-width="1.5" />`;

            // Ký hiệu vector cung hoàng đạo tại tâm cung
            const midRadius = (radiusOuter + radiusZodiacRing) / 2;
            const glyphX = centerX - midRadius * Math.cos(midAngRad);
            const glyphY = centerY + midRadius * Math.sin(midAngRad);

            const glyphXml = getGlyphGroupXml(signKeys[i], glyphX, glyphY, 0.95, signColors[i], 2.2);
            s += glyphXml;
        }

        s += `</g>`;
        return s;
    }

    /**
     * Vẽ 12 đỉnh nhà Regiomontanus và các trục chính ASC, DSC, MC, IC
     */
    renderHouseSpokes(houses, ascAngle) {
        const { centerX, centerY, radiusZodiacRing, radiusInner, accentColor } = this.options;
        let s = `<g id="house-cusps">`;

        const cusps = houses.cusps || [];

        for (let i = 0; i < 12; i++) {
            const houseNum = i + 1;
            const cuspLon = cusps[i];
            if (cuspLon === undefined) continue;

            const angRad = ((cuspLon - ascAngle) + 180) * Math.PI / 180;

            const isAngular = (houseNum === 1 || houseNum === 4 || houseNum === 7 || houseNum === 10);
            const strokeColor = isAngular ? '#8a4b18' : '#cbd5e1';
            const strokeWidth = isAngular ? 3.0 : 1.2;

            const x1 = centerX - radiusZodiacRing * Math.cos(angRad);
            const y1 = centerY + radiusZodiacRing * Math.sin(angRad);
            const x2 = centerX - radiusInner * Math.cos(angRad);
            const y2 = centerY + radiusInner * Math.sin(angRad);

            s += `<line x1="${x1.toFixed(2)}" y1="${y1.toFixed(2)}" x2="${x2.toFixed(2)}" y2="${y2.toFixed(2)}" stroke="${strokeColor}" stroke-width="${strokeWidth}" />`;

            // Nhãn số nhà ở khoang giữa
            const nextCuspLon = cusps[(i + 1) % 12];
            let midHouseLon = (cuspLon + (nextCuspLon < cuspLon ? nextCuspLon + 360 : nextCuspLon)) / 2 % 360;
            const midAngRad = ((midHouseLon - ascAngle) + 180) * Math.PI / 180;

            const labelR = radiusInner + 30;
            const labelX = centerX - labelR * Math.cos(midAngRad);
            const labelY = centerY + labelR * Math.sin(midAngRad);

            s += `<text x="${labelX.toFixed(2)}" y="${(labelY + 5).toFixed(2)}" font-size="14" font-weight="700" fill="#64748b" text-anchor="middle">${houseNum}</text>`;
        }

        // =========================================================================
        // NHÃN TRỤC NỔI BẬT: ASC, DSC, MC, IC
        // =========================================================================
        const formatCuspLabel = (degVal) => {
            const d = Math.floor(degVal % 30);
            const m = Math.round((degVal % 1) * 60);
            return `${d}°${String(m).padStart(2, '0')}′`;
        };

        // ASC (Nhà 1) - Luôn tại mép trái
        s += `
        <g id="axis-asc" transform="translate(${centerX - radiusZodiacRing - 12}, ${centerY})">
            <rect x="-105" y="-14" width="105" height="28" rx="6" fill="#8a4b18" />
            <text x="-52" y="5" font-size="12" font-weight="800" fill="#ffffff" text-anchor="middle">ASC ${formatCuspLabel(houses.ascendant)}</text>
        </g>`;

        // DSC (Nhà 7) - Luôn tại mép phải
        s += `
        <g id="axis-dsc" transform="translate(${centerX + radiusZodiacRing + 12}, ${centerY})">
            <rect x="0" y="-14" width="105" height="28" rx="6" fill="#8a4b18" />
            <text x="52" y="5" font-size="12" font-weight="800" fill="#ffffff" text-anchor="middle">DSC ${formatCuspLabel(houses.descendant)}</text>
        </g>`;

        // MC (Nhà 10) & IC (Nhà 4)
        const mcRad = ((houses.midheaven - ascAngle) + 180) * Math.PI / 180;
        const mcX = centerX - (radiusZodiacRing + 25) * Math.cos(mcRad);
        const mcY = centerY + (radiusZodiacRing + 25) * Math.sin(mcRad);

        s += `
        <g id="axis-mc" transform="translate(${mcX.toFixed(2)}, ${mcY.toFixed(2)})">
            <rect x="-45" y="-13" width="90" height="26" rx="6" fill="#8a4b18" />
            <text x="0" y="5" font-size="12" font-weight="800" fill="#ffffff" text-anchor="middle">MC ${formatCuspLabel(houses.midheaven)}</text>
        </g>`;

        const icRad = ((houses.imumCoeli - ascAngle) + 180) * Math.PI / 180;
        const icX = centerX - (radiusZodiacRing + 25) * Math.cos(icRad);
        const icY = centerY + (radiusZodiacRing + 25) * Math.sin(icRad);

        s += `
        <g id="axis-ic" transform="translate(${icX.toFixed(2)}, ${icY.toFixed(2)})">
            <rect x="-45" y="-13" width="90" height="26" rx="6" fill="#8a4b18" />
            <text x="0" y="5" font-size="12" font-weight="800" fill="#ffffff" text-anchor="middle">IC ${formatCuspLabel(houses.imumCoeli)}</text>
        </g>`;

        s += `</g>`;
        return s;
    }

    /**
     * Vẽ các đường nối góc chiếu (Aspect Lines)
     */
    renderAspectLines(planets, ascAngle) {
        const { centerX, centerY, radiusInner } = this.options;
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

            const angA = ((pA.longitude - ascAngle) + 180) * Math.PI / 180;
            const angB = ((pB.longitude - ascAngle) + 180) * Math.PI / 180;

            const r = radiusInner - 5;
            const x1 = centerX - r * Math.cos(angA);
            const y1 = centerY + r * Math.sin(angA);
            const x2 = centerX - r * Math.cos(angB);
            const y2 = centerY + r * Math.sin(angB);

            const color = aspectColors[asp.aspectId] || '#94a3b8';
            const width = aspectStrokeWidths[asp.aspectId] || 1.2;
            const dash = asp.state === 'APPLYING' ? 'none' : '4 3';

            s += `<line x1="${x1.toFixed(2)}" y1="${y1.toFixed(2)}" x2="${x2.toFixed(2)}" y2="${y2.toFixed(2)}" stroke="${color}" stroke-width="${width}" stroke-dasharray="${dash}" />`;
        }

        s += `</g>`;
        return s;
    }

    /**
     * Vẽ các hành tinh với thuật toán so le bán kính (Collision Avoidance)
     */
    renderPlanetsOnWheel(planets, ascAngle) {
        const { centerX, centerY, radiusPlanets } = this.options;
        let s = `<g id="planets-on-wheel">`;

        // Sắp xếp các hành tinh theo kinh độ góc để xử lý va chạm
        const sorted = [...planets].sort((a, b) => a.longitude - b.longitude);

        // Thuật toán so le bán kính: Khi hai hành tinh cách nhau < 6°, đẩy lệch bán kính
        const radiiLayers = [radiusPlanets, radiusPlanets + 35, radiusPlanets - 35, radiusPlanets + 65];

        for (let i = 0; i < sorted.length; i++) {
            const p = sorted[i];
            let layerIndex = 0;

            // Kiểm tra các hành tinh đứng trước kề sát
            for (let j = 0; j < i; j++) {
                const prev = sorted[j];
                const dist = Math.abs(p.longitude - prev.longitude);
                const circDist = Math.min(dist, 360 - dist);
                if (circDist < 6.5) {
                    layerIndex = (sorted[j].assignedLayer + 1) % radiiLayers.length;
                }
            }
            p.assignedLayer = layerIndex;
            const currentR = radiiLayers[layerIndex];

            const angRad = ((p.longitude - ascAngle) + 180) * Math.PI / 180;

            // Tọa độ thực trên vòng vành
            const realX = centerX - radiusPlanets * Math.cos(angRad);
            const realY = centerY + radiusPlanets * Math.sin(angRad);

            // Tọa độ hiển thị sau khi so le bán kính
            const dispX = centerX - currentR * Math.cos(angRad);
            const dispY = centerY + currentR * Math.sin(angRad);

            // Nếu bị đẩy lệch bán kính, vẽ đường leader line trỏ về tọa độ thực
            if (layerIndex !== 0) {
                s += `<line x1="${realX.toFixed(2)}" y1="${realY.toFixed(2)}" x2="${dispX.toFixed(2)}" y2="${dispY.toFixed(2)}" stroke="#94a3b8" stroke-width="1" stroke-dasharray="2 2" />`;
                s += `<circle cx="${realX.toFixed(2)}" cy="${realY.toFixed(2)}" r="2" fill="#8a4b18" />`;
            }

            // Vẽ glyph hành tinh (Vector SVG thuần)
            const glyphXml = getGlyphGroupXml(p.glyphKey, dispX, dispY - 8, 1.1, '#1e293b', 2.2);
            s += glyphXml;

            // Kèm ký hiệu nghịch hành ℞ nếu có
            if (p.isRetrograde) {
                const rxXml = getGlyphGroupXml('retrograde', dispX + 16, dispY - 12, 0.65, '#dc2626', 2.0);
                s += rxXml;
            } else if (p.isStationary) {
                const sXml = getGlyphGroupXml('stationary', dispX + 16, dispY - 12, 0.65, '#d97706', 2.0);
                s += sXml;
            }

            // Nhãn độ phút (ví dụ 13°11′)
            s += `<text x="${dispX.toFixed(2)}" y="${(dispY + 16).toFixed(2)}" font-size="11" font-weight="700" fill="#334155" text-anchor="middle">${p.formatted}</text>`;
        }

        s += `</g>`;
        return s;
    }

    /**
     * Chuyển đổi chuỗi XML SVG sang Data URL ảnh PNG
     */
    async svgToPngDataUrl(svgXml, scale = 1) {
        if (document.fonts) {
            await document.fonts.ready;
        }

        const svgBlob = new Blob([svgXml], { type: 'image/svg+xml;charset=utf-8' });
        const URL = window.URL || window.webkitURL || window;
        const blobUrl = URL.createObjectURL(svgBlob);

        return new Promise((resolve, reject) => {
            const image = new Image();
            image.onload = () => {
                const canvas = document.createElement('canvas');
                canvas.width = 1200 * scale;
                canvas.height = 1200 * scale;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
                URL.revokeObjectURL(blobUrl);
                resolve(canvas.toDataURL('image/png'));
            };
            image.onerror = err => {
                URL.revokeObjectURL(blobUrl);
                reject(err);
            };
            image.src = blobUrl;
        });
    }

    /**
     * Xuất lá số ra ảnh PNG hình vuông sắc nét (1200x1200px hoặc 2400x2400px)
     * Đảm bảo giữ nguyên toàn bộ nền vuông và 4 góc chú thích
     */
    async exportToPng(scale = 1) {
        const img = this.container.querySelector('#horary-chart-img');
        const fileName = `horary-${new Date().toISOString().slice(0, 10)}.png`;

        let dataUrl = '';
        if (img && img.src && img.src.startsWith('data:image/png') && scale === 1) {
            dataUrl = img.src;
        } else {
            const svgXml = this.generateSvgXml();
            dataUrl = await this.svgToPngDataUrl(svgXml, scale);
        }

        const a = document.createElement('a');
        a.download = fileName;
        a.href = dataUrl;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        return fileName;
    }
}
