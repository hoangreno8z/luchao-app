// ============================================================
// Architectural CAD Floorplan SVG Renderer (Drawing 1)
// Bản Vẽ Tư Vấn Thiết Kế Kiến Trúc Chuẩn CHATUY.VN / mauphongthuy.jpg
// Tác giả: Dịch Sư Nguyễn Huy Hoàng
// ============================================================

import { renderFurnitureSvg } from './furniture_symbols.js';

export class ArchitecturalCADRenderer {
    constructor(options = {}) {
        this.theme = options.theme || 'white'; // 'white' | 'dark'
        this.showDimensions = options.showDimensions !== undefined ? options.showDimensions : true;
        this.showFurniture = options.showFurniture !== undefined ? options.showFurniture : true;
        this.showAxes = options.showAxes !== undefined ? options.showAxes : true;
        this.showCompass = options.showCompass !== undefined ? options.showCompass : true;
    }

    /**
     * Render bản vẽ kiến trúc CAD từ đối tượng HouseGeometry thành SVG String hoàn chỉnh.
     * @param {Object} geometry - HouseGeometry (đơn vị mm)
     * @param {Object} options - Tùy chọn bổ sung
     * @returns {string} Mã SVG hoàn chỉnh
     */
    renderSvg(geometry, options = {}) {
        if (!geometry) return '<svg></svg>';

        const isWhite = (options.theme || this.theme) === 'white';
        const W = geometry.widthMm || 5000;
        const D = geometry.depthMm || 16000;
        const facingDegree = options.facingDegree !== undefined ? options.facingDegree : (geometry.northAngleDeg || 0);

        // Lề kỹ thuật cho hệ trục và đường kích thước (mm)
        const padLeft = 1400;
        const padRight = 1400;
        const padTop = 1400;
        const padBottom = 1600;

        const viewX = -padLeft;
        const viewY = -padTop;
        const viewW = W + padLeft + padRight;
        const viewH = D + padTop + padBottom;

        const bgColor = isWhite ? '#ffffff' : '#080c16';
        const borderColor = isWhite ? '#94a3b8' : '#1e293b';
        const textColor = isWhite ? '#0f172a' : '#f8fafc';
        const accentColor = isWhite ? '#0284c7' : '#38bdf8';
        const wallColor = isWhite ? '#0f172a' : '#f1f5f9';
        const partitionColor = isWhite ? '#334155' : '#94a3b8';

        // 1. Hệ Trục Định Vị (Grid Axes)
        let axesSvg = '';
        if (this.showAxes) {
            axesSvg = this.renderGridAxes(geometry, W, D, isWhite);
        }

        // 2. Bậc Tam Cấp Sảnh Đón
        let porchSvg = '';
        if (geometry.entrancePorch) {
            porchSvg = this.renderEntrancePorch(geometry.entrancePorch, isWhite);
        }

        // 3. Phân Vùng Phòng & Diện Tích (Rooms & Area Callouts)
        let roomsSvg = '';
        if (geometry.rooms) {
            roomsSvg = this.renderRooms(geometry.rooms, isWhite);
        }

        // 4. Nội Thất Vector Kiến Trúc (Furniture)
        let furnitureSvg = '';
        if (this.showFurniture && geometry.furniture) {
            furnitureSvg = geometry.furniture.map(f => renderFurnitureSvg(f, isWhite)).join('\n');
        }

        // 5. Tường Cắt Kiến Trúc (Walls 220mm & 110mm)
        let wallsSvg = '';
        if (geometry.walls) {
            wallsSvg = this.renderWalls(geometry.walls, isWhite);
        }

        // 6. Cột Bê Tông Cốt Thép 220x220mm
        let columnsSvg = '';
        if (geometry.columns) {
            columnsSvg = this.renderColumns(geometry.columns, isWhite);
        }

        // 7. Cửa Đi (Nét quét 90 độ) & Cửa Sổ Kính
        let doorsSvg = '';
        if (geometry.doors) {
            doorsSvg = this.renderDoors(geometry.doors, isWhite);
        }
        let windowsSvg = '';
        if (geometry.windows) {
            windowsSvg = this.renderWindows(geometry.windows, isWhite);
        }

        // 8. 3 Lớp Đường Kích Thước (Dimension Chains)
        let dimsSvg = '';
        if (this.showDimensions) {
            dimsSvg = this.renderDimensionChains(geometry, W, D, isWhite);
        }

        // 9. La Bàn / Hoa Tiêu Hướng Bắc
        let compassSvg = '';
        if (this.showCompass) {
            compassSvg = this.renderCompassRose(W - 600, -600, 350, facingDegree, isWhite);
        }

        // 10. Khung Tiêu Đề Bản Vẽ Kỹ Thuật (Title Block)
        const boxW = Math.min(viewW - 400, 4800);
        const boxH = 340;
        const boxX = viewX + 200;
        const boxY = viewY + viewH - boxH - 150;
        const titleBlockSvg = this.renderTitleBlock(boxX, boxY, boxW, boxH, geometry, options, isWhite);

        return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewX} ${viewY} ${viewW} ${viewH}" width="100%" height="100%" class="cad-svg-drawing" style="background:${bgColor};">
    <defs>
        <!-- Mẫu gạch chéo tường bê tông cốt thép (Hatch) -->
        <pattern id="hatchWall" width="80" height="80" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
            <line x1="0" y1="0" x2="0" y2="80" stroke="${isWhite ? '#cbd5e1' : '#334155'}" stroke-width="15" />
        </pattern>
        <!-- Mẫu gạch lát sàn kiến trúc 600x600mm -->
        <pattern id="floorTile" width="600" height="600" patternUnits="userSpaceOnUse">
            <rect width="600" height="600" fill="none" stroke="${isWhite ? 'rgba(0,0,0,0.04)' : 'rgba(255,255,255,0.03)'}" stroke-width="8"/>
        </pattern>
    </defs>

    <!-- 0. Khung Viền Bản Vẽ Kỹ Thuật -->
    <rect x="${viewX + 80}" y="${viewY + 80}" width="${viewW - 160}" height="${viewH - 160}" fill="none" stroke="${borderColor}" stroke-width="30"/>

    <!-- 1. Nền Gạch Sàn Nhà -->
    <rect x="0" y="0" width="${W}" height="${D}" fill="url(#floorTile)"/>

    <!-- 2. Hệ Trục Định Vị -->
    <g id="layer-grid-axes">${axesSvg}</g>

    <!-- 3. Bậc Tam Cấp Sảnh Chính -->
    <g id="layer-porch">${porchSvg}</g>

    <!-- 4. Không Gian Phòng & Tên Phòng -->
    <g id="layer-rooms">${roomsSvg}</g>

    <!-- 5. Nội Thất Vector Kiến Trúc -->
    <g id="layer-furniture">${furnitureSvg}</g>

    <!-- 6. Tường Kiến Trúc -->
    <g id="layer-walls">${wallsSvg}</g>

    <!-- 7. Cột Bê Tông Cốt Thép -->
    <g id="layer-columns">${columnsSvg}</g>

    <!-- 8. Cửa Đi & Cửa Sổ -->
    <g id="layer-openings">
        ${doorsSvg}
        ${windowsSvg}
    </g>

    <!-- 9. 3 Lớp Đường Kích Thước -->
    <g id="layer-dimensions">${dimsSvg}</g>

    <!-- 10. La Bàn Hoa Tiêu -->
    <g id="layer-compass">${compassSvg}</g>

    <!-- 11. Khung Tiêu Đề Bản Vẽ -->
    <g id="layer-title-block">${titleBlockSvg}</g>
</svg>
        `.trim();
    }

    renderGridAxes(geometry, W, D, isWhite) {
        const axesX = geometry.axesX || [{ label: '1', x: 0 }, { label: '2', x: W }];
        const axesY = geometry.axesY || [{ label: 'A', y: 0 }, { label: 'B', y: D }];

        const strokeColor = isWhite ? '#64748b' : '#475569';
        const bubbleBg = isWhite ? '#ffffff' : '#0f172a';
        const bubbleText = isWhite ? '#0f172a' : '#f8fafc';
        const bubbleR = 160;

        let svg = '';

        // Trục dọc (1, 2, 3, 4...)
        axesX.forEach(ax => {
            const x = ax.x;
            svg += `
                <!-- Tim trục ${ax.label} -->
                <line x1="${x}" y1="${-650}" x2="${x}" y2="${D + 650}" stroke="${strokeColor}" stroke-width="15" stroke-dasharray="140,70,30,70"/>
                <!-- Bóng tròn phía trên -->
                <circle cx="${x}" cy="${-850}" r="${bubbleR}" fill="${bubbleBg}" stroke="${strokeColor}" stroke-width="25"/>
                <text x="${x}" y="${-810}" text-anchor="middle" font-family="Inter, sans-serif" font-size="160" font-weight="900" fill="${bubbleText}">${ax.label}</text>
                <!-- Bóng tròn phía dưới -->
                <circle cx="${x}" cy="${D + 850}" r="${bubbleR}" fill="${bubbleBg}" stroke="${strokeColor}" stroke-width="25"/>
                <text x="${x}" y="${D + 890}" text-anchor="middle" font-family="Inter, sans-serif" font-size="160" font-weight="900" fill="${bubbleText}">${ax.label}</text>
            `;
        });

        // Trục ngang (A, B, C, D...)
        axesY.forEach(ay => {
            const y = ay.y;
            svg += `
                <!-- Tim trục ${ay.label} -->
                <line x1="${-650}" y1="${y}" x2="${W + 650}" y2="${y}" stroke="${strokeColor}" stroke-width="15" stroke-dasharray="140,70,30,70"/>
                <!-- Bóng tròn bên trái -->
                <circle cx="${-850}" cy="${y}" r="${bubbleR}" fill="${bubbleBg}" stroke="${strokeColor}" stroke-width="25"/>
                <text x="${-850}" y="${y + 55}" text-anchor="middle" font-family="Inter, sans-serif" font-size="160" font-weight="900" fill="${bubbleText}">${ay.label}</text>
                <!-- Bóng tròn bên phải -->
                <circle cx="${W + 850}" cy="${y}" r="${bubbleR}" fill="${bubbleBg}" stroke="${strokeColor}" stroke-width="25"/>
                <text x="${W + 850}" y="${y + 55}" text-anchor="middle" font-family="Inter, sans-serif" font-size="160" font-weight="900" fill="${bubbleText}">${ay.label}</text>
            `;
        });

        return svg;
    }

    renderEntrancePorch(porch, isWhite) {
        const { x, y, width: w, height: h, steps = 3, pillars } = porch;
        const stepH = h / steps;
        let svg = '';

        for (let i = 0; i < steps; i++) {
            const sx = x + (i * 150);
            const sw = w - (i * 300);
            const sy = y + (i * stepH);
            const fill = isWhite ? (i % 2 === 0 ? '#e2e8f0' : '#cbd5e1') : (i % 2 === 0 ? '#1e293b' : '#334155');

            svg += `<rect x="${sx}" y="${sy}" width="${sw}" height="${stepH}" fill="${fill}" stroke="${isWhite ? '#475569' : '#94a3b8'}" stroke-width="25"/>`;
        }

        if (pillars && pillars.length > 0) {
            pillars.forEach(p => {
                svg += `
                    <rect x="${p.x}" y="${p.y}" width="${p.size}" height="${p.size}" fill="${isWhite ? '#0f172a' : '#f8fafc'}" stroke="${isWhite ? '#0284c7' : '#38bdf8'}" stroke-width="25"/>
                    <circle cx="${p.x + p.size / 2}" cy="${p.y + p.size / 2}" r="60" fill="#ef4444"/>
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
                    <rect x="${cx - 900}" y="${cy - 220}" width="1800" height="360" fill="${isWhite ? 'rgba(255,255,255,0.85)' : 'rgba(15,23,42,0.85)'}" stroke="${isWhite ? '#cbd5e1' : '#334155'}" stroke-width="15" rx="30"/>
                    <text x="${cx}" y="${cy - 30}" text-anchor="middle" font-family="Inter, sans-serif" font-size="140" font-weight="900" fill="${isWhite ? '#0f172a' : '#f8fafc'}">${r.name}</text>
                    <text x="${cx}" y="${cy + 90}" text-anchor="middle" font-family="Inter, sans-serif" font-size="110" font-weight="700" fill="${isWhite ? '#0284c7' : '#38bdf8'}">${r.areaM2.toFixed(2)} m²</text>
                </g>
            `;
        }).join('\n');
    }

    renderWalls(walls, isWhite) {
        return walls.map(w => {
            const strokeColor = w.type === 'outer' ? (isWhite ? '#0f172a' : '#f1f5f9') : (isWhite ? '#334155' : '#94a3b8');
            const thickness = w.thickness || 220;
            return `
                <line x1="${w.x1}" y1="${w.y1}" x2="${w.x2}" y2="${w.y2}" stroke="${strokeColor}" stroke-width="${thickness}" stroke-linecap="square"/>
                <!-- Tim tường mảnh -->
                <line x1="${w.x1}" y1="${w.y1}" x2="${w.x2}" y2="${w.y2}" stroke="${isWhite ? '#64748b' : '#475569'}" stroke-width="15" stroke-dasharray="80,40"/>
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
                    <rect x="${cx}" y="${cy}" width="${size}" height="${size}" fill="${isWhite ? '#1e293b' : '#f8fafc'}" stroke="${isWhite ? '#ffffff' : '#0f172a'}" stroke-width="20"/>
                    <line x1="${cx}" y1="${cy}" x2="${cx + size}" y2="${cy + size}" stroke="${isWhite ? '#ffffff' : '#0f172a'}" stroke-width="15"/>
                    <line x1="${cx + size}" y1="${cy}" x2="${cx}" y2="${cy + size}" stroke="${isWhite ? '#ffffff' : '#0f172a'}" stroke-width="15"/>
                </g>
            `;
        }).join('\n');
    }

    renderDoors(doors, isWhite) {
        const doorColor = isWhite ? '#0284c7' : '#38bdf8';
        return doors.map(d => {
            const { x, y, width: dw, swing = 'left' } = d;
            if (swing === 'double' || d.type === 'double') {
                const halfW = dw / 2;
                return `
                    <g id="${d.id}" class="cad-door-double">
                        <line x1="${x}" y1="${y}" x2="${x}" y2="${y + halfW}" stroke="${doorColor}" stroke-width="30"/>
                        <line x1="${x + dw}" y1="${y}" x2="${x + dw}" y2="${y + halfW}" stroke="${doorColor}" stroke-width="30"/>
                        <path d="M ${x} ${y + halfW} A ${halfW} ${halfW} 0 0 1 ${x + halfW} ${y}" fill="none" stroke="${doorColor}" stroke-width="25" stroke-dasharray="50,30"/>
                        <path d="M ${x + dw} ${y + halfW} A ${halfW} ${halfW} 0 0 0 ${x + halfW} ${y}" fill="none" stroke="${doorColor}" stroke-width="25" stroke-dasharray="50,30"/>
                    </g>
                `;
            } else {
                return `
                    <g id="${d.id}" class="cad-door-single">
                        <line x1="${x}" y1="${y}" x2="${x}" y2="${y + dw}" stroke="${doorColor}" stroke-width="30"/>
                        <path d="M ${x} ${y + dw} A ${dw} ${dw} 0 0 1 ${x + dw} ${y}" fill="none" stroke="${doorColor}" stroke-width="25" stroke-dasharray="50,30"/>
                    </g>
                `;
            }
        }).join('\n');
    }

    renderWindows(windows, isWhite) {
        const stroke = isWhite ? '#0284c7' : '#38bdf8';
        return windows.map(w => `
            <g id="${w.id}" class="cad-window">
                <rect x="${w.x}" y="${w.y - 110}" width="${w.width}" height="220" fill="${isWhite ? '#e0f2fe' : '#0369a1'}" stroke="${stroke}" stroke-width="25"/>
                <line x1="${w.x}" y1="${w.y}" x2="${w.x + w.width}" y2="${w.y}" stroke="${stroke}" stroke-width="20"/>
            </g>
        `).join('\n');
    }

    renderDimensionChains(geometry, W, D, isWhite) {
        const strokeColor = isWhite ? '#475569' : '#94a3b8';
        const textColor = isWhite ? '#0f172a' : '#f8fafc';
        let svg = '';

        // Kích thước phủ bì tổng thể Ngang (mm) - Phía trên
        const topY = -400;
        svg += `
            <line x1="0" y1="${topY}" x2="${W}" y2="${topY}" stroke="${strokeColor}" stroke-width="25"/>
            <line x1="0" y1="${topY - 100}" x2="0" y2="${0}" stroke="${strokeColor}" stroke-width="15"/>
            <line x1="${W}" y1="${topY - 100}" x2="${W}" y2="${0}" stroke="${strokeColor}" stroke-width="15"/>
            <!-- 2 Vạch chéo 45 độ -->
            <line x1="${-60}" y1="${topY + 60}" x2="${60}" y2="${topY - 60}" stroke="${strokeColor}" stroke-width="35"/>
            <line x1="${W - 60}" y1="${topY + 60}" x2="${W + 60}" y2="${topY - 60}" stroke="${strokeColor}" stroke-width="35"/>
            <text x="${W / 2}" y="${topY - 60}" text-anchor="middle" font-family="Inter, sans-serif" font-size="170" font-weight="bold" fill="${textColor}">${W}</text>
        `;

        // Kích thước phủ bì tổng thể Dọc (mm) - Bên trái
        const leftX = -400;
        svg += `
            <line x1="${leftX}" y1="0" x2="${leftX}" y2="${D}" stroke="${strokeColor}" stroke-width="25"/>
            <line x1="${leftX - 100}" y1="0" x2="0" y2="0" stroke="${strokeColor}" stroke-width="15"/>
            <line x1="${leftX - 100}" y1="${D}" x2="0" y2="${D}" stroke="${strokeColor}" stroke-width="15"/>
            <!-- 2 Vạch chéo 45 độ -->
            <line x1="${leftX - 60}" y1="${60}" x2="${leftX + 60}" y2="${-60}" stroke="${strokeColor}" stroke-width="35"/>
            <line x1="${leftX - 60}" y1="${D + 60}" x2="${leftX + 60}" y2="${D - 60}" stroke="${strokeColor}" stroke-width="35"/>
            <text x="${leftX - 80}" y="${D / 2}" text-anchor="middle" font-family="Inter, sans-serif" font-size="170" font-weight="bold" fill="${textColor}" transform="rotate(-90 ${leftX - 80} ${D / 2})">${D}</text>
        `;

        return svg;
    }

    renderCompassRose(cx, cy, r, facingDeg, isWhite) {
        const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
        let blades = '';

        for (let i = 0; i < 8; i++) {
            const angle = (i * 45 - 90) * (Math.PI / 180);
            const rTip = r - 40;
            const rBase = r * 0.25;
            const fillBlade = i === 0 ? '#ef4444' : (isWhite ? '#64748b' : '#94a3b8');

            blades += `
                <polygon points="0,0 ${Math.cos(angle - 0.25) * rBase},${Math.sin(angle - 0.25) * rBase} ${Math.cos(angle) * rTip},${Math.sin(angle) * rTip}" fill="${fillBlade}"/>
                <text x="${Math.cos(angle) * (r + 90)}" y="${Math.sin(angle) * (r + 90) + 30}" text-anchor="middle" font-family="Inter, sans-serif" font-size="100" font-weight="bold" fill="${i === 0 ? '#ef4444' : (isWhite ? '#0f172a' : '#f8fafc')}">${directions[i]}</text>
            `;
        }

        return `
            <g id="compass-rose" transform="translate(${cx}, ${cy}) rotate(${facingDeg})">
                <circle cx="0" cy="0" r="${r}" fill="${isWhite ? '#ffffff' : '#0f172a'}" stroke="${isWhite ? '#cbd5e1' : '#334155'}" stroke-width="25"/>
                ${blades}
            </g>
        `;
    }

    renderTitleBlock(x, y, w, h, geometry, options, isWhite) {
        const padX = 80;
        return `
            <g id="architectural-title-block">
                <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${isWhite ? 'rgba(255,255,255,0.96)' : 'rgba(15,23,42,0.96)'}" stroke="${isWhite ? '#0284c7' : '#d97706'}" stroke-width="25" rx="20"/>
                <text x="${x + padX}" y="${y + 90}" font-family="Inter, sans-serif" font-size="120" font-weight="900" fill="${isWhite ? '#0f172a' : '#fef08a'}">${(geometry.floorName || 'MẶT BẰNG TƯ VẤN THIẾT KẾ').toUpperCase()}</text>
                <text x="${x + padX}" y="${y + 175}" font-family="Inter, sans-serif" font-size="80" font-weight="600" fill="${isWhite ? '#475569' : '#cbd5e1'}">Kích thước: ${(geometry.widthMm / 1000).toFixed(2)}m × ${(geometry.depthMm / 1000).toFixed(2)}m · Diện tích: ${(geometry.widthMm * geometry.depthMm / 1000000).toFixed(1)} m²</text>
                <text x="${x + padX}" y="${y + 260}" font-family="Inter, sans-serif" font-size="80" font-weight="700" fill="${isWhite ? '#0284c7' : '#38bdf8'}">Tư vấn: DỊCH SƯ NGUYỄN HUY HOÀNG — 0933 116 860 · Huyền Không Vận 9</text>
            </g>
        `;
    }
}
