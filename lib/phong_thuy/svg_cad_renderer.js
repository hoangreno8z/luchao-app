// ============================================================
// Architectural CAD SVG Renderer v2.0
// Bộ Render Bản Vẽ CAD 2D Đẳng Cấp Kiến Trúc (Nét Mảnh Chuẩn Tỷ Lệ)
// Tác giả: Dịch Sư Nguyễn Huy Hoàng
// ============================================================

import { renderFurnitureSvg } from './furniture_symbols.js';

export class ArchitecturalCADRenderer {
    constructor(options = {}) {
        this.theme = options.theme || 'white'; // 'white' | 'dark'
        this.showDimensions = options.showDimensions !== false;
        this.showFurniture = options.showFurniture !== false;
        this.showAxes = options.showAxes !== false;
        this.showCompass = options.showCompass !== false;
    }

    renderSvg(geometry, options = {}) {
        const isWhite = this.theme === 'white';
        const facingDegree = options.facingDegree || 180;
        const W = geometry.widthMm;
        const D = geometry.depthMm;

        // Tỷ lệ lề bao quanh (Padding) để chứa 3 lớp kích thước và bong bóng trục
        const padLeft = 1400;
        const padRight = 1400;
        const padTop = 1500;
        const padBottom = 1600;

        const viewX = -padLeft;
        const viewY = -padTop;
        const viewW = W + padLeft + padRight;
        const viewH = D + padTop + padBottom;

        // Bảng màu chuẩn CAD Architectural Blueprint
        const bgColor = isWhite ? '#ffffff' : '#0f172a';
        const borderColor = isWhite ? '#0284c7' : '#d97706';

        // 1. Hệ Trục Định Vị (Grid Axes)
        const axesSvg = this.showAxes ? this.renderAxes(geometry.axesX, geometry.axesY, W, D, isWhite) : '';

        // 2. Sảnh Đón Tam Cấp
        const porchSvg = geometry.entrancePorch ? this.renderPorch(geometry.entrancePorch, isWhite) : '';

        // 3. Tường Bao & Tường Ngăn (Crisp Delicate CAD Walls)
        const wallsSvg = this.renderWalls(geometry.walls, isWhite);

        // 4. Cột Bê Tông Chịu Lực (Columns)
        const columnsSvg = this.renderColumns(geometry.columns, isWhite);

        // 5. Nội Thất Vector Kiến Trúc
        const furnitureSvg = this.showFurniture && geometry.furniture ? geometry.furniture.map(f => renderFurnitureSvg(f, isWhite)).join('\n') : '';

        // 6. Nhãn Phòng & Diện Tích m²
        const roomsSvg = this.renderRooms(geometry.rooms, isWhite);

        // 7. Cửa Đi & Cửa Sổ
        let doorsSvg = geometry.doors ? this.renderDoors(geometry.doors, isWhite) : '';
        let windowsSvg = geometry.windows ? this.renderWindows(geometry.windows, isWhite) : '';

        // 8. Ba Lớp Kích Thước (3-Tier Dimension Chains)
        let dimsSvg = this.showDimensions ? this.renderDimensionChains(geometry, W, D, isWhite) : '';

        // 9. La Bàn Bắc Nam (Compass Rose)
        let compassSvg = this.showCompass ? this.renderCompassRose(W - 500, -700, 320, facingDegree, isWhite) : '';

        // 10. Khung Tiêu Đề Bản Vẽ Kỹ Thuật (Title Block)
        const boxW = Math.min(viewW - 400, 4800);
        const boxH = 320;
        const boxX = viewX + 200;
        const boxY = viewY + viewH - boxH - 120;
        const titleBlockSvg = this.renderTitleBlock(boxX, boxY, boxW, boxH, geometry, options, isWhite);

        return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewX} ${viewY} ${viewW} ${viewH}" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" class="cad-svg-drawing" style="display: block; width: 100%; height: 100%; max-width: 100%; max-height: 100%; background:${bgColor}; font-family: 'Inter', 'Noto Sans', sans-serif;">
    <defs>
        <!-- Lưới gạch sàn lát 600x600mm -->
        <pattern id="floorTile" width="600" height="600" patternUnits="userSpaceOnUse">
            <rect width="600" height="600" fill="none" stroke="${isWhite ? 'rgba(0,0,0,0.035)' : 'rgba(255,255,255,0.03)'}" stroke-width="6"/>
        </pattern>
        <!-- Hatch tường bê tông gạch nét chéo 45 độ -->
        <pattern id="hatchWall" width="120" height="120" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
            <line x1="0" y1="0" x2="0" y2="120" stroke="${isWhite ? '#94a3b8' : '#475569'}" stroke-width="12" />
        </pattern>
    </defs>
    <!-- Khung viền bản vẽ kỹ thuật -->
    <rect x="${viewX + 80}" y="${viewY + 80}" width="${viewW - 160}" height="${viewH - 160}" fill="none" stroke="${borderColor}" stroke-width="25"/>
    <rect x="0" y="0" width="${W}" height="${D}" fill="url(#floorTile)"/>
    <g id="layer-grid-axes">${axesSvg}</g>
    <g id="layer-porch">${porchSvg}</g>
    <g id="layer-rooms">${roomsSvg}</g>
    <g id="layer-furniture">${furnitureSvg}</g>
    <g id="layer-walls">${wallsSvg}</g>
    <g id="layer-columns">${columnsSvg}</g>
    <g id="layer-openings">${doorsSvg}${windowsSvg}</g>
    <g id="layer-dimensions">${dimsSvg}</g>
    <g id="layer-compass">${compassSvg}</g>
    <g id="layer-title-block">${titleBlockSvg}</g>
</svg>
        `.trim();
    }

    renderAxes(axesX, axesY, W, D, isWhite) {
        const bubbleR = 150;
        const color = isWhite ? '#0284c7' : '#38bdf8';
        const lineStroke = isWhite ? '#94a3b8' : '#475569';
        const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];

        let lines = '';
        let bubbles = '';

        axesX.forEach((x, idx) => {
            const num = (idx + 1).toString();
            // Đường trục dọc
            lines += `<line x1="${x}" y1="-700" x2="${x}" y2="${D + 700}" stroke="${lineStroke}" stroke-width="8" stroke-dasharray="100,50,20,50"/>`;
            // Bóng tròn định vị phía trên
            bubbles += `
                <circle cx="${x}" cy="-700" r="${bubbleR}" fill="${isWhite ? '#ffffff' : '#0f172a'}" stroke="${color}" stroke-width="10"/>
                <text x="${x}" y="-650" text-anchor="middle" font-size="120" font-weight="900" fill="${color}">${num}</text>
            `;
            // Bóng tròn định vị phía dưới
            bubbles += `
                <circle cx="${x}" cy="${D + 700}" r="${bubbleR}" fill="${isWhite ? '#ffffff' : '#0f172a'}" stroke="${color}" stroke-width="10"/>
                <text x="${x}" y="${D + 750}" text-anchor="middle" font-size="120" font-weight="900" fill="${color}">${num}</text>
            `;
        });

        axesY.forEach((y, idx) => {
            const letter = letters[idx % letters.length];
            // Đường trục ngang
            lines += `<line x1="-700" y1="${y}" x2="${W + 700}" y2="${y}" stroke="${lineStroke}" stroke-width="8" stroke-dasharray="100,50,20,50"/>`;
            // Bóng tròn định vị bên trái
            bubbles += `
                <circle cx="-700" cy="${y}" r="${bubbleR}" fill="${isWhite ? '#ffffff' : '#0f172a'}" stroke="${color}" stroke-width="10"/>
                <text x="-700" y="${y + 45}" text-anchor="middle" font-size="120" font-weight="900" fill="${color}">${letter}</text>
            `;
            // Bóng tròn định vị bên phải
            bubbles += `
                <circle cx="${W + 700}" cy="${y}" r="${bubbleR}" fill="${isWhite ? '#ffffff' : '#0f172a'}" stroke="${color}" stroke-width="10"/>
                <text x="${W + 700}" y="${y + 45}" text-anchor="middle" font-size="120" font-weight="900" fill="${color}">${letter}</text>
            `;
        });

        return `<g class="cad-grid-axes">${lines}${bubbles}</g>`;
    }

    renderPorch(porch, isWhite) {
        const { x, y, width: w, height: h, steps, pillars } = porch;
        const stepH = h / steps;
        let svg = '';

        for (let i = 0; i < steps; i++) {
            const sx = x + (i * 120);
            const sw = w - (i * 240);
            const sy = y + (i * stepH);
            const fill = isWhite ? (i % 2 === 0 ? '#e2e8f0' : '#f8fafc') : (i % 2 === 0 ? '#1e293b' : '#334155');
            svg += `<rect x="${sx}" y="${sy}" width="${sw}" height="${stepH}" fill="${fill}" stroke="${isWhite ? '#64748b' : '#94a3b8'}" stroke-width="10"/>`;
        }

        if (pillars && pillars.length > 0) {
            pillars.forEach(p => {
                svg += `
                    <rect x="${p.x}" y="${p.y}" width="${p.size}" height="${p.size}" fill="${isWhite ? '#0f172a' : '#f8fafc'}" stroke="${isWhite ? '#0284c7' : '#38bdf8'}" stroke-width="10"/>
                    <circle cx="${p.x + p.size / 2}" cy="${p.y + p.size / 2}" r="35" fill="#ef4444"/>
                `;
            });
        }

        return svg;
    }

    renderRooms(rooms, isWhite) {
        return rooms.map(r => {
            const cx = r.x + r.width / 2;
            const cy = r.y + r.height / 2;
            return `
                <g id="${r.id}" class="cad-room-label">
                    <rect x="${cx - 750}" y="${cy - 160}" width="1500" height="280" fill="${isWhite ? 'rgba(255,255,255,0.92)' : 'rgba(15,23,42,0.92)'}" stroke="${isWhite ? '#cbd5e1' : '#334155'}" stroke-width="10" rx="20"/>
                    <text x="${cx}" y="${cy - 20}" text-anchor="middle" font-size="110" font-weight="900" fill="${isWhite ? '#0f172a' : '#f8fafc'}">${r.name}</text>
                    <text x="${cx}" y="${cy + 75}" text-anchor="middle" font-size="85" font-weight="700" fill="${isWhite ? '#0284c7' : '#38bdf8'}">${r.areaM2.toFixed(2)} m²</text>
                </g>
            `;
        }).join('\n');
    }

    renderWalls(walls, isWhite) {
        return walls.map(w => {
            const strokeColor = w.type === 'outer' ? (isWhite ? '#0f172a' : '#f1f5f9') : (isWhite ? '#334155' : '#94a3b8');
            // Độ dày nét vẽ thanh thoát chuẩn kiến trúc (35px cho tường bao, 20px cho tường ngăn)
            const strokeW = w.type === 'outer' ? 35 : 20;
            return `
                <line x1="${w.x1}" y1="${w.y1}" x2="${w.x2}" y2="${w.y2}" stroke="${strokeColor}" stroke-width="${strokeW}" stroke-linecap="square"/>
                <!-- Tim tường nét mảnh -->
                <line x1="${w.x1}" y1="${w.y1}" x2="${w.x2}" y2="${w.y2}" stroke="${isWhite ? '#64748b' : '#475569'}" stroke-width="6" stroke-dasharray="80,40"/>
            `;
        }).join('\n');
    }

    renderColumns(columns, isWhite) {
        return columns.map((col, idx) => {
            const size = col.size || 220;
            const cx = col.x - size / 2;
            const cy = col.y - size / 2;
            return `
                <g id="col-${idx}">
                    <rect x="${cx}" y="${cy}" width="${size}" height="${size}" fill="${isWhite ? '#0f172a' : '#f8fafc'}" stroke="${isWhite ? '#0284c7' : '#38bdf8'}" stroke-width="10"/>
                    <line x1="${cx}" y1="${cy}" x2="${cx + size}" y2="${cy + size}" stroke="${isWhite ? '#cbd5e1' : '#475569'}" stroke-width="6"/>
                    <line x1="${cx + size}" y1="${cy}" x2="${cx}" y2="${cy + size}" stroke="${isWhite ? '#cbd5e1' : '#475569'}" stroke-width="6"/>
                </g>
            `;
        }).join('\n');
    }

    renderDoors(doors, isWhite) {
        const stroke = isWhite ? '#0f172a' : '#f8fafc';
        const arcStroke = isWhite ? '#0284c7' : '#38bdf8';

        return doors.map(d => {
            const { x, y, width: w } = d;
            return `
                <g id="${d.id}" class="cad-door">
                    <line x1="${x}" y1="${y}" x2="${x}" y2="${y + w}" stroke="${stroke}" stroke-width="14"/>
                    <path d="M ${x} ${y + w} A ${w} ${w} 0 0 1 ${x + w} ${y}" fill="none" stroke="${arcStroke}" stroke-width="8" stroke-dasharray="30,15"/>
                    <line x1="${x}" y1="${y}" x2="${x + w}" y2="${y}" stroke="${arcStroke}" stroke-width="6" stroke-dasharray="15,10"/>
                </g>
            `;
        }).join('\n');
    }

    renderWindows(windows, isWhite) {
        const stroke = isWhite ? '#0284c7' : '#38bdf8';
        return windows.map(win => {
            const { x, y, width: w } = win;
            return `
                <g id="${win.id}" class="cad-window">
                    <rect x="${x}" y="${y - 40}" width="${w}" height="80" fill="${isWhite ? '#f0f9ff' : '#0369a1'}" stroke="${stroke}" stroke-width="10"/>
                    <line x1="${x}" y1="${y}" x2="${x + w}" y2="${y}" stroke="${stroke}" stroke-width="6"/>
                </g>
            `;
        }).join('\n');
    }

    renderDimensionChains(geometry, W, D, isWhite) {
        const color = isWhite ? '#334155' : '#cbd5e1';
        let svg = '';

        // Dọc bên trái
        svg += `
            <line x1="-350" y1="0" x2="-350" y2="${D}" stroke="${color}" stroke-width="8"/>
            <line x1="-420" y1="0" x2="-280" y2="0" stroke="${color}" stroke-width="6"/>
            <line x1="-420" y1="${D}" x2="-280" y2="${D}" stroke="${color}" stroke-width="6"/>
            <line x1="-390" y1="40" x2="-310" y2="-40" stroke="${color}" stroke-width="12"/>
            <line x1="-390" y1="${D + 40}" x2="-310" y2="${D - 40}" stroke="${color}" stroke-width="12"/>
            <text x="-400" y="${D / 2}" text-anchor="middle" transform="rotate(-90 -400 ${D / 2})" font-size="95" font-weight="900" fill="${color}">${D}</text>
        `;

        // Ngang phía trên
        svg += `
            <line x1="0" y1="-350" x2="${W}" y2="-350" stroke="${color}" stroke-width="8"/>
            <line x1="0" y1="-420" x2="0" y2="-280" stroke="${color}" stroke-width="6"/>
            <line x1="${W}" y1="-420" x2="${W}" y2="-280" stroke="${color}" stroke-width="6"/>
            <line x1="-40" y1="-310" x2="40" y2="-390" stroke="${color}" stroke-width="12"/>
            <line x1="${W - 40}" y1="-310" x2="${W + 40}" y2="-390" stroke="${color}" stroke-width="12"/>
            <text x="${W / 2}" y="-400" text-anchor="middle" font-size="95" font-weight="900" fill="${color}">${W}</text>
        `;

        return `<g id="dimension-chains">${svg}</g>`;
    }

    renderCompassRose(cx, cy, r, facingDeg, isWhite) {
        return `
            <g id="compass-rose" transform="translate(${cx}, ${cy})">
                <circle cx="0" cy="0" r="${r}" fill="${isWhite ? '#ffffff' : '#0f172a'}" stroke="${isWhite ? '#cbd5e1' : '#334155'}" stroke-width="15"/>
                <!-- Kim La Bàn Chỉ Hướng Bắc -->
                <polygon points="0,${-r + 40} -40,0 40,0" fill="#ef4444"/>
                <polygon points="0,${r - 40} -40,0 40,0" fill="${isWhite ? '#64748b' : '#94a3b8'}"/>
                <text x="0" y="${-r - 30}" text-anchor="middle" font-size="90" font-weight="bold" fill="#ef4444">BẮC</text>
                <text x="0" y="${r + 90}" text-anchor="middle" font-size="80" font-weight="bold" fill="${isWhite ? '#64748b' : '#94a3b8'}">NAM</text>
            </g>
        `;
    }

    renderTitleBlock(x, y, w, h, geometry, options, isWhite) {
        const padX = 80;
        return `
            <g id="architectural-title-block">
                <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${isWhite ? 'rgba(255,255,255,0.96)' : 'rgba(15,23,42,0.96)'}" stroke="${isWhite ? '#0284c7' : '#d97706'}" stroke-width="20" rx="15"/>
                <text x="${x + padX}" y="${y + 85}" font-size="110" font-weight="900" fill="${isWhite ? '#0f172a' : '#fef08a'}">${(geometry.floorName || 'MẶT BẰNG TƯ VẤN THIẾT KẾ').toUpperCase()}</text>
                <text x="${x + padX}" y="${y + 165}" font-size="75" font-weight="600" fill="${isWhite ? '#475569' : '#cbd5e1'}">Kích thước: ${(geometry.widthMm / 1000).toFixed(2)}m × ${(geometry.depthMm / 1000).toFixed(2)}m · Diện tích: ${(geometry.widthMm * geometry.depthMm / 1000000).toFixed(1)} m²</text>
                <text x="${x + padX}" y="${y + 245}" font-size="75" font-weight="700" fill="${isWhite ? '#0284c7' : '#38bdf8'}">Tư vấn: DỊCH SƯ NGUYỄN HUY HOÀNG — 0933 116 860 · Huyền Không Vận 9</text>
            </g>
        `;
    }
}
