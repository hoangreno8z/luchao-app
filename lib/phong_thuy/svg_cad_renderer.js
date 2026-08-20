// ============================================================
// Architectural CAD SVG Renderer (Vector 2D CAD Đỉnh Cao)
// Tác giả: Dịch Sư Nguyễn Huy Hoàng
// ============================================================

export class ArchitecturalCADRenderer {
    constructor(options = {}) {
        this.theme = options.theme || 'white';
        this.showDimensions = options.showDimensions !== false;
        this.showFurniture = options.showFurniture !== false;
        this.showAxes = options.showAxes !== false;
        this.showCompass = options.showCompass !== false;
        this.showCompassOverlay = options.showCompassOverlay === true;
        this.isLandscape = options.isLandscape === true;
    }

    renderSvg(geometry, options = {}) {
        const isWhite = this.theme === 'white';
        const W = geometry.widthMm;
        const D = geometry.depthMm;

        const padX = Math.max(900, Math.round(W * 0.14));
        const padY = Math.max(1000, Math.round(D * 0.1));

        const viewX = -padX;
        const viewY = -padY;
        const viewW = W + padX * 2;
        const viewH = D + padY * 2 + 200;

        const bgColor = isWhite ? '#ffffff' : '#0b1120';
        const gridLineColor = isWhite ? 'rgba(0,0,0,0.04)' : 'rgba(255,255,255,0.035)';
        const wallFillColor = isWhite ? '#1e293b' : '#334155';
        const wallStrokeColor = isWhite ? '#0f172a' : '#f8fafc';
        const dimColor = isWhite ? '#0284c7' : '#38bdf8';
        const titleBorder = isWhite ? '#0284c7' : '#d97706';

        // 1. Grid Axes
        let axesSvg = '';
        if (this.showAxes && geometry.axesX && geometry.axesY) {
            geometry.axesX.forEach((ax) => {
                axesSvg += `
                    <line x1="${ax.pos}" y1="-450" x2="${ax.pos}" y2="${D + 450}" stroke="${dimColor}" stroke-width="6" stroke-dasharray="100,50,20,50" opacity="0.75"/>
                    <circle cx="${ax.pos}" cy="-600" r="150" fill="${bgColor}" stroke="${dimColor}" stroke-width="10"/>
                    <text x="${ax.pos}" y="-580" text-anchor="middle" font-size="130" font-weight="900" fill="${dimColor}">${ax.label}</text>
                `;
            });
            geometry.axesY.forEach((ay) => {
                axesSvg += `
                    <line x1="-450" y1="${ay.pos}" x2="${W + 450}" y2="${ay.pos}" stroke="${dimColor}" stroke-width="6" stroke-dasharray="100,50,20,50" opacity="0.75"/>
                    <circle cx="-600" cy="${ay.pos}" r="150" fill="${bgColor}" stroke="${dimColor}" stroke-width="10"/>
                    <text x="-600" y="${ay.pos + 20}" text-anchor="middle" font-size="130" font-weight="900" fill="${dimColor}">${ay.label}</text>
                `;
            });
        }

        // 2. Porch
        let porchSvg = '';
        if (geometry.entrancePorch) {
            const p = geometry.entrancePorch;
            porchSvg = `
                <rect x="${p.x}" y="${p.y}" width="${p.width}" height="${p.height}" fill="${isWhite ? '#f1f5f9' : '#1e293b'}" stroke="${isWhite ? '#475569' : '#94a3b8'}" stroke-width="30"/>
                <line x1="${p.x}" y1="${p.y + p.height * 0.33}" x2="${p.x + p.width}" y2="${p.y + p.height * 0.33}" stroke="${isWhite ? '#64748b' : '#94a3b8'}" stroke-width="14"/>
                <line x1="${p.x}" y1="${p.y + p.height * 0.66}" x2="${p.x + p.width}" y2="${p.y + p.height * 0.66}" stroke="${isWhite ? '#64748b' : '#94a3b8'}" stroke-width="14"/>
                <circle cx="${p.x + 110}" cy="${p.y + 110}" r="100" fill="${wallFillColor}" stroke="${wallStrokeColor}" stroke-width="8"/>
                <circle cx="${p.x + p.width - 110}" cy="${p.y + 110}" r="100" fill="${wallFillColor}" stroke="${wallStrokeColor}" stroke-width="8"/>
            `;
        }

        // 3. Walls
        let wallsSvg = '';
        if (geometry.walls) {
            geometry.walls.forEach(w => {
                const strokeW = w.type === 'exterior' ? 35 : 20;
                wallsSvg += `<line x1="${w.x1}" y1="${w.y1}" x2="${w.x2}" y2="${w.y2}" stroke="${wallStrokeColor}" stroke-width="${strokeW}" stroke-linecap="square"/>`;
            });
        }

        // 4. Columns
        let columnsSvg = '';
        if (geometry.columns) {
            geometry.columns.forEach(c => {
                columnsSvg += `
                    <rect x="${c.x}" y="${c.y}" width="${c.size}" height="${c.size}" fill="${wallFillColor}" stroke="${wallStrokeColor}" stroke-width="8"/>
                    <line x1="${c.x}" y1="${c.y}" x2="${c.x + c.size}" y2="${c.y + c.size}" stroke="${isWhite ? '#ffffff' : '#0284c7'}" stroke-width="4"/>
                    <line x1="${c.x}" y1="${c.y + c.size}" x2="${c.x + c.size}" y2="${c.y}" stroke="${isWhite ? '#ffffff' : '#0284c7'}" stroke-width="4"/>
                `;
            });
        }

        // 5. Furniture (High-End Vector Graphics)
        let furnitureSvg = '';
        if (this.showFurniture && geometry.furniture) {
            geometry.furniture.forEach(f => {
                if (f.type === 'sofa_living') {
                    furnitureSvg += `
                        <g class="cad-sofa">
                            <rect x="${f.x}" y="${f.y}" width="${f.width}" height="${f.height}" rx="40" fill="${isWhite ? 'rgba(2,132,199,0.08)' : 'rgba(56,189,248,0.1)'}" stroke="${isWhite ? '#0284c7' : '#38bdf8'}" stroke-width="12"/>
                            <rect x="${f.x + 80}" y="${f.y + 80}" width="${f.width - 160}" height="${f.height * 0.4}" rx="20" fill="${isWhite ? '#e0f2fe' : '#0369a1'}" stroke="${isWhite ? '#0284c7' : '#38bdf8'}" stroke-width="8"/>
                            <ellipse cx="${f.x + f.width / 2}" cy="${f.y + f.height * 0.72}" rx="${f.width * 0.22}" ry="${f.height * 0.16}" fill="${isWhite ? '#fef3c7' : '#78350f'}" stroke="#f59e0b" stroke-width="10"/>
                        </g>
                    `;
                } else if (f.type === 'bed_master') {
                    furnitureSvg += `
                        <g class="cad-bed">
                            <rect x="${f.x}" y="${f.y}" width="${f.width}" height="${f.height}" rx="30" fill="${isWhite ? '#fffbeb' : '#1e1b4b'}" stroke="#d97706" stroke-width="12"/>
                            <rect x="${f.x}" y="${f.y}" width="${f.width}" height="140" fill="#d97706"/>
                            <rect x="${f.x + f.width * 0.1}" y="${f.y + 180}" width="${f.width * 0.35}" height="280" rx="20" fill="${isWhite ? '#ffffff' : '#312e81'}" stroke="#d97706" stroke-width="8"/>
                            <rect x="${f.x + f.width * 0.55}" y="${f.y + 180}" width="${f.width * 0.35}" height="280" rx="20" fill="${isWhite ? '#ffffff' : '#312e81'}" stroke="#d97706" stroke-width="8"/>
                            <path d="M ${f.x + 40} ${f.y + 540} L ${f.x + f.width - 40} ${f.y + 540} L ${f.x + f.width - 40} ${f.y + f.height - 30} L ${f.x + 40} ${f.y + f.height - 30} Z" fill="${isWhite ? 'rgba(217,119,6,0.12)' : 'rgba(245,158,11,0.15)'}" stroke="#d97706" stroke-width="6"/>
                        </g>
                    `;
                } else if (f.type === 'dining_set') {
                    furnitureSvg += `
                        <g class="cad-dining">
                            <rect x="${f.x}" y="${f.y}" width="${f.width}" height="${f.height}" rx="50" fill="${isWhite ? '#f0fdf4' : '#064e3b'}" stroke="#10b981" stroke-width="12"/>
                            <circle cx="${f.x + f.width * 0.25}" cy="${f.y - 60}" r="65" fill="#10b981"/>
                            <circle cx="${f.x + f.width * 0.75}" cy="${f.y - 60}" r="65" fill="#10b981"/>
                            <circle cx="${f.x + f.width * 0.25}" cy="${f.y + f.height + 60}" r="65" fill="#10b981"/>
                            <circle cx="${f.x + f.width * 0.75}" cy="${f.y + f.height + 60}" r="65" fill="#10b981"/>
                        </g>
                    `;
                } else if (f.type === 'toilet_set') {
                    furnitureSvg += `
                        <g class="cad-wc">
                            <rect x="${f.x}" y="${f.y}" width="${f.width}" height="${f.height}" rx="25" fill="${isWhite ? '#f8fafc' : '#0f172a'}" stroke="#64748b" stroke-width="10"/>
                            <rect x="${f.x + 40}" y="${f.y + 40}" width="${f.width * 0.5}" height="140" rx="15" fill="#cbd5e1" stroke="#475569" stroke-width="6"/>
                            <ellipse cx="${f.x + 40 + f.width * 0.25}" cy="${f.y + 300}" rx="${f.width * 0.22}" ry="120" fill="#ffffff" stroke="#475569" stroke-width="8"/>
                        </g>
                    `;
                } else if (f.type === 'altar_set') {
                    furnitureSvg += `
                        <g class="cad-altar">
                            <rect x="${f.x}" y="${f.y}" width="${f.width}" height="${f.height}" fill="${isWhite ? '#fef2f2' : '#450a0a'}" stroke="#dc2626" stroke-width="16"/>
                            <circle cx="${f.x + f.width / 2}" cy="${f.y + f.height / 2}" r="120" fill="#eab308" stroke="#dc2626" stroke-width="10"/>
                            <circle cx="${f.x + f.width * 0.2}" cy="${f.y + f.height / 2}" r="60" fill="#eab308"/>
                            <circle cx="${f.x + f.width * 0.8}" cy="${f.y + f.height / 2}" r="60" fill="#eab308"/>
                        </g>
                    `;
                } else if (f.type === 'stairs_flight') {
                    furnitureSvg += `
                        <g class="cad-stairs">
                            <rect x="${f.x}" y="${f.y}" width="${f.width}" height="${f.height}" fill="${isWhite ? '#f8fafc' : '#0f172a'}" stroke="#64748b" stroke-width="14"/>
                    `;
                    for (let step = 1; step < 11; step++) {
                        const stepY = f.y + (f.height / 11) * step;
                        furnitureSvg += `<line x1="${f.x}" y1="${stepY}" x2="${f.x + f.width}" y2="${stepY}" stroke="#94a3b8" stroke-width="8"/>`;
                    }
                    furnitureSvg += `
                            <line x1="${f.x + f.width / 2}" y1="${f.y + f.height - 150}" x2="${f.x + f.width / 2}" y2="${f.y + 200}" stroke="#0284c7" stroke-width="16" stroke-linecap="round"/>
                            <polygon points="${f.x + f.width / 2}, ${f.y + 80} ${f.x + f.width / 2 - 60}, ${f.y + 220} ${f.x + f.width / 2 + 60}, ${f.y + 220}" fill="#0284c7"/>
                            <text x="${f.x + f.width / 2 + 100}" y="${f.y + f.height / 2}" font-size="85" font-weight="900" fill="#0284c7">LÊN (21 BẬC)</text>
                        </g>
                    `;
                }
            });
        }

        // 6. Room Labels
        let roomsSvg = '';
        if (geometry.rooms) {
            geometry.rooms.forEach(r => {
                const rx = r.x + r.width / 2;
                const ry = r.y + r.height / 2;
                roomsSvg += `
                    <g class="room-tag">
                        <rect x="${rx - 400}" y="${ry - 100}" width="800" height="200" rx="20" fill="${isWhite ? 'rgba(255,255,255,0.92)' : 'rgba(15,23,42,0.92)'}" stroke="${isWhite ? '#cbd5e1' : '#475569'}" stroke-width="4"/>
                        <text x="${rx}" y="${ry - 20}" text-anchor="middle" font-size="95" font-weight="900" fill="${isWhite ? '#0f172a' : '#f8fafc'}">${r.name}</text>
                        <text x="${rx}" y="${ry + 60}" text-anchor="middle" font-size="70" font-weight="700" fill="${dimColor}">${r.areaM2 ? r.areaM2.toFixed(1) + ' m²' : ''}</text>
                    </g>
                `;
            });
        }

        // 7. Doors & Openings
        let doorsSvg = '';
        if (geometry.doors) {
            geometry.doors.forEach(d => {
                doorsSvg += `
                    <g class="cad-door">
                        <line x1="${d.x}" y1="${d.y}" x2="${d.x + d.width}" y2="${d.y}" stroke="${bgColor}" stroke-width="48"/>
                        <line x1="${d.x}" y1="${d.y}" x2="${d.x}" y2="${d.y + d.width}" stroke="${dimColor}" stroke-width="16"/>
                        <path d="M ${d.x} ${d.y + d.width} A ${d.width} ${d.width} 0 0 0 ${d.x + d.width} ${d.y}" fill="none" stroke="${dimColor}" stroke-width="10" stroke-dasharray="25,15"/>
                    </g>
                `;
            });
        }

        // 8. Dimension Chains
        let dimsSvg = '';
        if (this.showDimensions) {
            dimsSvg += `
                <!-- Đo Chiều Ngang Mặt Tiền (W) -->
                <line x1="0" y1="-850" x2="${W}" y2="-850" stroke="${dimColor}" stroke-width="10"/>
                <line x1="0" y1="-1000" x2="0" y2="-700" stroke="${dimColor}" stroke-width="8"/>
                <line x1="${W}" y1="-1000" x2="${W}" y2="-700" stroke="${dimColor}" stroke-width="8"/>
                <line x1="-60" y1="-790" x2="60" y2="-910" stroke="${dimColor}" stroke-width="14"/>
                <line x1="${W - 60}" y1="-790" x2="${W + 60}" y2="-910" stroke="${dimColor}" stroke-width="14"/>
                <text x="${W / 2}" y="-890" text-anchor="middle" font-size="120" font-weight="900" fill="${dimColor}">${W} mm</text>

                <!-- Đo Chiều Sâu Công Trình (D) -->
                <line x1="-850" y1="0" x2="-850" y2="${D}" stroke="${dimColor}" stroke-width="10"/>
                <line x1="-1000" y1="0" x2="-700" y2="0" stroke="${dimColor}" stroke-width="8"/>
                <line x1="-1000" y1="${D}" x2="-700" y2="${D}" stroke="${dimColor}" stroke-width="8"/>
                <line x1="-910" y1="-60" x2="-790" y2="60" stroke="${dimColor}" stroke-width="14"/>
                <line x1="-910" y1="${D - 60}" x2="-790" y2="${D + 60}" stroke="${dimColor}" stroke-width="14"/>
                <text x="-900" y="${D / 2}" text-anchor="middle" transform="rotate(-90 -900 ${D / 2})" font-size="120" font-weight="900" fill="${dimColor}">${D} mm</text>
            `;
        }

        // 9. North Arrow (Kim La Bàn Hoa Tiêu)
        let northArrowSvg = '';
        if (this.showCompass) {
            const facingDeg = options.facingDegree || 180;
            northArrowSvg = `
                <g id="cad-north-arrow" transform="translate(${viewX + 220}, ${viewY + 240}) rotate(${-facingDeg + 180})">
                    <circle cx="0" cy="0" r="140" fill="${bgColor}" stroke="${dimColor}" stroke-width="10"/>
                    <polygon points="0,-130 -45,0 0,-30" fill="#ef4444"/>
                    <polygon points="0,-130 45,0 0,-30" fill="#dc2626"/>
                    <polygon points="0,130 -45,0 0,30" fill="#64748b"/>
                    <polygon points="0,130 45,0 0,30" fill="#475569"/>
                    <text x="0" y="-155" text-anchor="middle" font-size="75" font-weight="900" fill="#ef4444">BẮC (N)</text>
                </g>
            `;
        }

        // 10. Direct Compass Overlay on Floorplan
        let compassOverlaySvg = '';
        if (this.showCompassOverlay) {
            const cx = W / 2;
            const cy = D / 2;
            const radius = Math.min(W, D) * 0.8;
            const facingDeg = options.facingDegree || 180;

            compassOverlaySvg = `
                <g id="layer-compass-plan-overlay" transform="translate(${cx}, ${cy}) rotate(${-facingDeg + 180})" opacity="0.35">
                    <circle cx="0" cy="0" r="${radius}" fill="none" stroke="#f59e0b" stroke-width="16" stroke-dasharray="30,15"/>
                    <circle cx="0" cy="0" r="${radius * 0.75}" fill="none" stroke="#38bdf8" stroke-width="10"/>
                    <circle cx="0" cy="0" r="${radius * 0.45}" fill="rgba(15,23,42,0.6)" stroke="#f59e0b" stroke-width="8"/>
                    <line x1="0" y1="-${radius}" x2="0" y2="${radius}" stroke="#ef4444" stroke-width="12"/>
                    <line x1="-${radius}" y1="0" x2="${radius}" y2="0" stroke="#0284c7" stroke-width="12"/>
                    <line x1="-${radius * 0.707}" y1="-${radius * 0.707}" x2="${radius * 0.707}" y2="${radius * 0.707}" stroke="#f59e0b" stroke-width="8"/>
                    <line x1="-${radius * 0.707}" y1="${radius * 0.707}" x2="${radius * 0.707}" y2="-${radius * 0.707}" stroke="#f59e0b" stroke-width="8"/>
                </g>
            `;
        }

        // 11. Title Block
        const titleBlockSvg = `
            <g id="cad-title-block" transform="translate(${viewX + 120}, ${viewY + viewH - 340})">
                <rect x="0" y="0" width="${Math.min(viewW - 240, 5200)}" height="260" fill="${isWhite ? '#f8fafc' : '#0b0f19'}" stroke="${titleBorder}" stroke-width="14" rx="12"/>
                <text x="50" y="75" font-size="75" font-weight="900" fill="${isWhite ? '#0f172a' : '#f8fafc'}">DỰ ÁN: MẶT BẰNG THIẾT KẾ KIẾN TRÚC & PHONG THỦY CAD</text>
                <text x="50" y="150" font-size="60" font-weight="800" fill="${dimColor}">CHỦ TRÌ: DỊCH SƯ NGUYỄN HUY HOÀNG</text>
                <text x="50" y="215" font-size="48" font-weight="600" fill="${isWhite ? '#64748b' : '#94a3b8'}">TỶ LỆ: 1/100 · MILIMET (MM) · VẬN 9 HUYỀN KHÔNG PHI TINH</text>
            </g>
        `;

        return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewX} ${viewY} ${viewW} ${viewH}" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" class="cad-svg-drawing" style="display: block; width: 100%; height: 100%; max-width: 100%; max-height: 100%; background:${bgColor}; font-family: 'Inter', 'Noto Sans', sans-serif;">
    <defs>
        <pattern id="floorTileGrid" width="600" height="600" patternUnits="userSpaceOnUse">
            <rect width="600" height="600" fill="none" stroke="${gridLineColor}" stroke-width="6"/>
        </pattern>
    </defs>
    <rect x="${viewX + 60}" y="${viewY + 60}" width="${viewW - 120}" height="${viewH - 120}" fill="none" stroke="${titleBorder}" stroke-width="24"/>
    <rect x="0" y="0" width="${W}" height="${D}" fill="url(#floorTileGrid)"/>
    <g id="layer-grid-axes">${axesSvg}</g>
    <g id="layer-porch">${porchSvg}</g>
    <g id="layer-furniture">${furnitureSvg}</g>
    <g id="layer-walls">${wallsSvg}</g>
    <g id="layer-columns">${columnsSvg}</g>
    <g id="layer-openings">${doorsSvg}</g>
    <g id="layer-rooms">${roomsSvg}</g>
    <g id="layer-dimensions">${dimsSvg}</g>
    ${compassOverlaySvg}
    ${northArrowSvg}
    ${titleBlockSvg}
</svg>
        `.trim();
    }
}
