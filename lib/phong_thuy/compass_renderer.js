// ============================================================
// Compass SVG Renderer (La Bàn 24 Sơn / 60 Long / 8 Quái)
// Tác giả: Dịch Sư Nguyễn Huy Hoàng
// ============================================================

import { MOUNTAINS_24, SIXTY_DRAGONS } from './mountain_data.js';
import { generateCompassPaths, polarToCartesian } from './polar_math.js';

export class CompassSvgRenderer {
    constructor(options = {}) {
        this.size = options.size || 500;
        this.center = this.size / 2;
        this.cachedDialSvg = null;
        this.buildDialGraphics();
    }

    buildDialGraphics() {
        const c = this.center;
        const ring24 = generateCompassPaths(MOUNTAINS_24, 180, 215, c, c);
        const ring60 = generateCompassPaths(SIXTY_DRAGONS, 150, 180, c, c);
        const trigrams8 = [
            { name: 'KHẢM (THỦY)', startDeg: 337.5, midDeg: 0, endDeg: 22.5, hanh: 'Thủy' },
            { name: 'CẤN (THỔ)', startDeg: 22.5, midDeg: 45, endDeg: 67.5, hanh: 'Thổ' },
            { name: 'CHẤN (MỘC)', startDeg: 67.5, midDeg: 90, endDeg: 112.5, hanh: 'Mộc' },
            { name: 'TỐN (MỘC)', startDeg: 112.5, midDeg: 135, endDeg: 157.5, hanh: 'Mộc' },
            { name: 'LY (HỎA)', startDeg: 157.5, midDeg: 180, endDeg: 202.5, hanh: 'Hỏa' },
            { name: 'KHÔN (THỔ)', startDeg: 202.5, midDeg: 225, endDeg: 247.5, hanh: 'Thổ' },
            { name: 'ĐOÀI (KIM)', startDeg: 247.5, midDeg: 270, endDeg: 292.5, hanh: 'Kim' },
            { name: 'CÀN (KIM)', startDeg: 292.5, midDeg: 315, endDeg: 337.5, hanh: 'Kim' }
        ];
        const ring8 = generateCompassPaths(trigrams8, 105, 150, c, c);

        let degLines = [];
        for (let i = 0; i < 360; i += 5) {
            const isMajor = i % 15 === 0;
            const rIn = isMajor ? 215 : 222;
            const p1 = polarToCartesian(c, c, rIn, i);
            const p2 = polarToCartesian(c, c, 230, i);
            degLines.push(`M ${p1.x} ${p1.y} L ${p2.x} ${p2.y}`);
        }

        const combinedPathD = `${ring24.pathD} ${ring60.pathD} ${ring8.pathD} ${degLines.join(' ')}`;

        const allLabels = [
            ...ring24.labels.map(l => `<text x="${l.x}" y="${l.y}" transform="rotate(${l.rotation}, ${l.x}, ${l.y})" text-anchor="middle" dominant-baseline="central" font-size="9" font-weight="800" fill="#f59e0b">${l.text}</text>`),
            ...ring60.labels.map(l => `<text x="${l.x}" y="${l.y}" transform="rotate(${l.rotation}, ${l.x}, ${l.y})" text-anchor="middle" dominant-baseline="central" font-size="6.5" font-weight="600" fill="#94a3b8">${l.text}</text>`),
            ...ring8.labels.map(l => `<text x="${l.x}" y="${l.y}" transform="rotate(${l.rotation}, ${l.x}, ${l.y})" text-anchor="middle" dominant-baseline="central" font-size="9.5" font-weight="900" fill="#fbbf24">${l.text}</text>`)
        ].join('');

        this.cachedDialSvg = `
            <circle cx="${c}" cy="${c}" r="230" fill="#0b0f19" stroke="#d97706" stroke-width="2" />
            <circle cx="${c}" cy="${c}" r="215" fill="none" stroke="rgba(217, 119, 6, 0.4)" stroke-width="1" />
            <circle cx="${c}" cy="${c}" r="180" fill="#0f172a" stroke="rgba(217, 119, 6, 0.5)" stroke-width="1" />
            <circle cx="${c}" cy="${c}" r="150" fill="#0b0f19" stroke="rgba(217, 119, 6, 0.4)" stroke-width="1" />
            <circle cx="${c}" cy="${c}" r="105" fill="#090d16" stroke="rgba(217, 119, 6, 0.7)" stroke-width="1.5" />
            <circle cx="${c}" cy="${c}" r="55" fill="#020617" stroke="#d97706" stroke-width="2" />
            <path d="${combinedPathD}" stroke="rgba(217, 119, 6, 0.45)" stroke-width="0.75" />
            ${allLabels}
        `;
    }

    renderStaticDialSvg() {
        return this.cachedDialSvg;
    }
}
