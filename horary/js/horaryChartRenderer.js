/**
 * horaryChartRenderer.js - Trình Vẽ Lá Số Horary Bằng SVG Thuần Khung Vuông 1200x1200px
 * ZERO EMOJIS - Tất cả ký hiệu hoàng đạo, hành tinh, góc chiếu và chuyển động
 * được vẽ hoàn toàn bằng vector path SVG.
 *
 * ĐẶC TẢ HÌNH HỌC & THIÊN VĂN:
 * - Canvas cố định: 1200 x 1200 px.
 * - Nền vuông <rect width="1200" height="1200" ... /> bao bọc.
 * - Trục ASC (Ascendant): Nằm chính xác tại hướng 9 giờ (mép trái, x = cx - R, y = cy).
 * - Trục DSC (Descendant): Nằm chính xác tại hướng 3 giờ (mép phải, x = cx + R, y = cy).
 * - Trục MC (Midheaven): Hướng lên trên (x = cx, y = cy - R).
 * - Trục IC (Imum Coeli): Hướng xuống dưới (x = cx, y = cy + R).
 * - Chiều di chuyển hoàng đạo: Ngược chiều kim đồng hồ (Counter-Clockwise).
 * - Công thức chuyển đổi chuẩn:
 *     theta = (eclipticLon - ascAngle) * PI / 180
 *     x = centerX - radius * cos(theta)
 *     y = centerY + radius * sin(theta)
 * - Hiển thị ngay lập tức SVG gốc để không bao giờ bị lỗi hiển thị,
 *   đồng thời chuyển đổi ngầm sang <img> PNG để hỗ trợ click chuột phải tải trên PC và giữ ngón tay lưu trên mobile.
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
     * Cập nhật dữ liệu lá số và tiến hành vẽ:
     * 1. Hiển thị NGAY LẬP TỨC SVG gốc vào container (đảm bảo lá số hiện ra 100% không bị delay hay icon ảnh hỏng).
     * 2. Chuyển đổi ngầm sang thẻ <img> định dạng PNG Data URL để hỗ trợ:
     *    - Click chuột phải "Save image as..." trên PC
     *    - Nhấn giữ màn hình "Save to Photos" trên iOS/Android
     */
    async render(chartData, aspects = []) {
        this.chartData = chartData;
        this.aspects = aspects;

        if (!this.container) return;

        const svgXml = this.generateSvgXml();

        // 1. HIỂN THỊ NGAY SVG GỐC: Đảm bảo người dùng luôn thấy lá số ngay tức thì
        this.container.innerHTML = `
            <div id="chart-display-wrapper" style="width:100%; max-width:720px; margin:0 auto; position:relative;">
                ${svgXml}
            </div>
        `;

        // 2. Chuyển đổi ngầm sang thẻ <img> định dạng PNG Data URL
        try {
            const pngDataUrl = await this.svgToPngDataUrl(svgXml, 1);
            if (pngDataUrl && pngDataUrl.startsWith('data:image/png')) {
                const wrapper = this.container.querySelector('#chart-display-wrapper');
                if (wrapper) {
                    wrapper.innerHTML = `
                        <img id="horary-chart-img"
                             src="${pngDataUrl}"
                             alt="Lá số Horary Chiêm Tinh - Huy Hoàng"
                             draggable="true"
                             style="width: 100%; height: auto; display: block; border-radius: 12px; box-shadow: 0 4px 16px rgba(0,0,0,0.06); -webkit-touch-callout: default !important; -webkit-user-select: auto !important; user-select: auto !important; pointer-events: auto !important; touch-action: auto !important; cursor: pointer;" />
                        <div id="horary-svg-hidden" style="display:none;">${svgXml}</div>
                    `;
                }
            }
        } catch (e) {
            console.warn('Giữ nguyên hiển thị SVG trực tiếp:', e);
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

        // Góc ASC (Ascendant): Trong chiêm tinh học truyền thống, trục ASC luôn nằm ở vị trí 9 giờ (mép trái)
        const ascAngle = houses ? houses.ascendant : 0;

        let svg = `<svg id="horary-main-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" style="background:${bgColor}; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
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
     */
    renderHouseSpokes(houses, ascAngle) {
        const { centerX, centerY, radiusZodiacRing, radiusInner } = this.options;
        let s = `<g id="house-cusps">`;

        const cusps = houses.cusps || [];

        for (let i = 0; i < 12; i++) {
            const houseNum = i + 1;
            const cuspLon = cusps[i];
            if (cuspLon === undefined) continue;

            const isAngular = (houseNum === 1 || houseNum === 4 || houseNum === 7 || houseNum === 10);
            const strokeColor = isAngular ? '#8a4b18' : '#cbd5e1';
            const strokeWidth = isAngular ? 3.0 : 1.2;

            const pt1 = this.eclipticToSvg(cuspLon, ascAngle, radiusZodiacRing);
            const pt2 = this.eclipticToSvg(cuspLon, ascAngle, radiusInner);

            s += `<line x1="${pt1.x.toFixed(2)}" y1="${pt1.y.toFixed(2)}" x2="${pt2.x.toFixed(2)}" y2="${pt2.y.toFixed(2)}" stroke="${strokeColor}" stroke-width="${strokeWidth}" />`;

            // Nhãn số nhà ở khoang giữa
            const nextCuspLon = cusps[(i + 1) % 12];
            let midHouseLon = (cuspLon + (nextCuspLon < cuspLon ? nextCuspLon + 360 : nextCuspLon)) / 2 % 360;
            const labelR = radiusInner + 30;
            const labelPt = this.eclipticToSvg(midHouseLon, ascAngle, labelR);

            s += `<text x="${labelPt.x.toFixed(2)}" y="${(labelPt.y + 5).toFixed(2)}" font-size="14" font-weight="700" fill="#64748b" text-anchor="middle">${houseNum}</text>`;
        }

        // =========================================================================
        // NHÃN TRỤC NỔI BẬT: ASC, DSC, MC, IC (DÙNG ĐÚNG ECLIPTICTOSVG)
        // =========================================================================
        const formatCuspLabel = (degVal) => {
            const d = Math.floor(degVal % 30);
            const m = Math.round((degVal % 1) * 60);
            return `${d}°${String(m).padStart(2, '0')}′`;
        };

        // ASC (Nhà 1) - Tọa độ mép trái (9 giờ)
        const ascPt = this.eclipticToSvg(houses.ascendant, ascAngle, radiusZodiacRing + 12);
        s += `
        <g id="axis-asc" transform="translate(${ascPt.x.toFixed(2)}, ${ascPt.y.toFixed(2)})">
            <rect x="-105" y="-14" width="105" height="28" rx="6" fill="#8a4b18" />
            <text x="-52" y="5" font-size="12" font-weight="800" fill="#ffffff" text-anchor="middle">ASC ${formatCuspLabel(houses.ascendant)}</text>
        </g>`;

        // DSC (Nhà 7) - Tọa độ mép phải (3 giờ)
        const dscPt = this.eclipticToSvg(houses.descendant, ascAngle, radiusZodiacRing + 12);
        s += `
        <g id="axis-dsc" transform="translate(${dscPt.x.toFixed(2)}, ${dscPt.y.toFixed(2)})">
            <rect x="0" y="-14" width="105" height="28" rx="6" fill="#8a4b18" />
            <text x="52" y="5" font-size="12" font-weight="800" fill="#ffffff" text-anchor="middle">DSC ${formatCuspLabel(houses.descendant)}</text>
        </g>`;

        // MC (Nhà 10) & IC (Nhà 4)
        const mcPt = this.eclipticToSvg(houses.midheaven, ascAngle, radiusZodiacRing + 25);
        s += `
        <g id="axis-mc" transform="translate(${mcPt.x.toFixed(2)}, ${mcPt.y.toFixed(2)})">
            <rect x="-45" y="-13" width="90" height="26" rx="6" fill="#8a4b18" />
            <text x="0" y="5" font-size="12" font-weight="800" fill="#ffffff" text-anchor="middle">MC ${formatCuspLabel(houses.midheaven)}</text>
        </g>`;

        const icPt = this.eclipticToSvg(houses.imumCoeli, ascAngle, radiusZodiacRing + 25);
        s += `
        <g id="axis-ic" transform="translate(${icPt.x.toFixed(2)}, ${icPt.y.toFixed(2)})">
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
     * Vẽ các hành tinh với thuật toán so le bán kính (Collision Avoidance)
     */
    renderPlanetsOnWheel(planets, ascAngle) {
        const { radiusPlanets } = this.options;
        let s = `<g id="planets-on-wheel">`;

        // Sắp xếp các hành tinh theo kinh độ góc để xử lý va chạm
        const sorted = [...planets].sort((a, b) => a.longitude - b.longitude);

        // Thuật toán so le bán kính: Khi hai hành tinh cách nhau < 6.5°, đẩy lệch bán kính
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

            // Tọa độ thực trên vành và tọa độ sau khi so le
            const realPt = this.eclipticToSvg(p.longitude, ascAngle, radiusPlanets);
            const dispPt = this.eclipticToSvg(p.longitude, ascAngle, currentR);

            // Nếu bị đẩy lệch bán kính, vẽ đường leader line trỏ về tọa độ thực
            if (layerIndex !== 0) {
                s += `<line x1="${realPt.x.toFixed(2)}" y1="${realPt.y.toFixed(2)}" x2="${dispPt.x.toFixed(2)}" y2="${dispPt.y.toFixed(2)}" stroke="#94a3b8" stroke-width="1" stroke-dasharray="2 2" />`;
                s += `<circle cx="${realPt.x.toFixed(2)}" cy="${realPt.y.toFixed(2)}" r="2" fill="#8a4b18" />`;
            }

            // Vẽ glyph hành tinh (Vector SVG thuần)
            const glyphXml = getGlyphGroupXml(p.glyphKey, dispPt.x, dispPt.y - 8, 1.1, '#1e293b', 2.2);
            s += glyphXml;

            // Kèm ký hiệu nghịch hành ℞ nếu có
            if (p.isRetrograde) {
                const rxXml = getGlyphGroupXml('retrograde', dispPt.x + 16, dispPt.y - 12, 0.65, '#dc2626', 2.0);
                s += rxXml;
            } else if (p.isStationary) {
                const sXml = getGlyphGroupXml('stationary', dispPt.x + 16, dispPt.y - 12, 0.65, '#d97706', 2.0);
                s += sXml;
            }

            // Nhãn độ phút (ví dụ 13°11′)
            s += `<text x="${dispPt.x.toFixed(2)}" y="${(dispPt.y + 16).toFixed(2)}" font-size="11" font-weight="700" fill="#334155" text-anchor="middle">${p.formatted}</text>`;
        }

        s += `</g>`;
        return s;
    }

    /**
     * Chuyển đổi chuỗi XML SVG sang Data URL ảnh PNG
     */
    async svgToPngDataUrl(svgXml, scale = 1) {
        if (typeof document !== 'undefined' && document.fonts) {
            try {
                await document.fonts.ready;
            } catch (_) {}
        }

        // Đảm bảo có explicit width & height dạng số nguyên 1200x1200px
        let preparedXml = svgXml;
        if (!preparedXml.includes('width="1200"')) {
            preparedXml = preparedXml.replace('width="100%"', 'width="1200"').replace('height="100%"', 'height="1200"');
        }

        const svgBlob = new Blob([preparedXml], { type: 'image/svg+xml;charset=utf-8' });
        const URL = window.URL || window.webkitURL || window;
        const blobUrl = URL.createObjectURL(svgBlob);

        return new Promise((resolve, reject) => {
            const image = new Image();
            image.onload = () => {
                try {
                    const canvas = document.createElement('canvas');
                    canvas.width = 1200 * scale;
                    canvas.height = 1200 * scale;
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
                    URL.revokeObjectURL(blobUrl);
                    resolve(canvas.toDataURL('image/png'));
                } catch (canvasErr) {
                    URL.revokeObjectURL(blobUrl);
                    reject(canvasErr);
                }
            };
            image.onerror = (err) => {
                URL.revokeObjectURL(blobUrl);
                reject(err);
            };
            image.src = blobUrl;
        });
    }

    /**
     * Xuất lá số ra file ảnh PNG hình vuông sắc nét (1200x1200px hoặc 2400x2400px)
     * Đảm bảo giữ nguyên toàn bộ nền vuông và 4 góc chú thích
     */
    async exportToPng(scale = 1) {
        const fileName = `horary-${new Date().toISOString().slice(0, 10)}.png`;
        let dataUrl = '';

        const img = this.container ? this.container.querySelector('#horary-chart-img') : null;
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
