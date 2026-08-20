// ============================================================
// CAD Core Multi-layer SVG Renderer Engine v8.0
// Xuất bản vẽ CAD 2D hoàn chỉnh với tỷ lệ mm thực tế và tương tác chuyên nghiệp
// ============================================================

import { getBoundingBox, distance } from './geometry.js';
import { renderWallBlock, renderDoorBlock, renderWindowBlock, renderStairBlock, renderFurnitureBlock } from './symbols.js';

export class SvgCadRenderer {
    constructor(options = {}) {
        this.theme = options.theme || 'white';
        this.showDimensions = options.showDimensions !== false;
        this.showFurniture = options.showFurniture !== false;
        this.showAxes = options.showAxes !== false;
    }

    /**
     * Render toàn bộ bản vẽ ra chuỗi mã SVG chuẩn
     */
    render(model, interactionState = {}) {
        if (!model) return '';

        const theme = interactionState.theme || this.theme;
        const selectedRoomId = interactionState.selectedRoomId || null;
        const selectedEdgeIndex = interactionState.selectedEdgeIndex !== undefined ? interactionState.selectedEdgeIndex : null;
        const activeGuides = interactionState.activeGuides || [];

        const isDark = theme === 'dark';
        const bgColor = isDark ? '#090d16' : '#ffffff';
        const gridColor = isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.04)';
        const textColor = isDark ? '#f8fafc' : '#0f172a';
        const dimColor = isDark ? '#94a3b8' : '#334155';
        const wallStroke = isDark ? '#f8fafc' : '#000000';

        const pts = model.footprintPoints || [];
        const bb = model.getBoundingBox();

        // Thêm lề (padding) 1200mm xung quanh để hiển thị đường kích thước ngoài
        const padX = 1200;
        const padY = 1200;
        const vbX = Math.round(bb.minX - padX);
        const vbY = Math.round(bb.minY - padY);
        const vbW = Math.round(bb.width + padX * 2);
        const vbH = Math.round(bb.height + padY * 2);

        // 1. Grid & Axes
        let gridSvg = '';
        if (this.showAxes) {
            gridSvg = `
                <g class="cad-layer-grid">
                    <defs>
                        <pattern id="cadGridPattern" width="1000" height="1000" patternUnits="userSpaceOnUse">
                            <rect width="1000" height="1000" fill="none" stroke="${gridColor}" stroke-width="1" />
                            <circle cx="0" cy="0" r="4" fill="${gridColor}" />
                        </pattern>
                    </defs>
                    <rect x="${vbX}" y="${vbY}" width="${vbW}" height="${vbH}" fill="url(#cadGridPattern)" />
                </g>
            `;
        }

        // 2. Footprint Polygon (Ranh giới thửa đất / sàn nhà)
        let footprintSvg = '';
        if (pts.length >= 3) {
            const ptsStr = pts.map(p => `${p.x},${p.y}`).join(' ');
            footprintSvg = `
                <g class="cad-layer-footprint">
                    <polygon points="${ptsStr}" fill="${isDark ? 'rgba(30, 41, 59, 0.3)' : 'rgba(248, 250, 252, 0.8)'}" stroke="${wallStroke}" stroke-width="6" stroke-linejoin="round" />
                    <!-- Hitbox cho từng cạnh đất -->
                    ${pts.map((p1, idx) => {
                        const p2 = pts[(idx + 1) % pts.length];
                        const isEdgeSel = selectedEdgeIndex === idx;
                        return `
                            <line x1="${p1.x}" y1="${p1.y}" x2="${p2.x}" y2="${p2.y}" 
                                stroke="${isEdgeSel ? '#ef4444' : 'transparent'}" 
                                stroke-width="${isEdgeSel ? 8 : 40}" 
                                stroke-linecap="round"
                                class="cad-edge-hitbox" 
                                data-edge-idx="${idx}" 
                                style="cursor: pointer;" />
                        `;
                    }).join('')}
                    <!-- Vertex Handles (Điểm mốc góc nhà) -->
                    ${pts.map((p, idx) => `
                        <g class="cad-vertex-handle" data-vertex-idx="${idx}" style="cursor: grab;">
                            <circle cx="${p.x}" cy="${p.y}" r="45" fill="#f59e0b" stroke="#ffffff" stroke-width="6" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.5))" />
                            <circle cx="${p.x}" cy="${p.y}" r="15" fill="#000000" />
                            <text x="${p.x}" y="${p.y - 65}" fill="#f59e0b" font-size="120" font-weight="900" text-anchor="middle">${p.name || ''}</text>
                        </g>
                    `).join('')}
                </g>
            `;
        }

        // 3. Walls (Tường xây)
        let wallsSvg = '';
        if (model.walls && model.walls.length > 0) {
            wallsSvg = `
                <g class="cad-layer-walls">
                    ${model.walls.map(w => renderWallBlock(w.p1, w.p2, w.thickness || 220, theme)).join('')}
                </g>
            `;
        }

        // 4. Rooms (Không gian phòng chức năng)
        let roomsSvg = '';
        let interactionOverlaySvg = '';

        if (model.rooms && model.rooms.length > 0) {
            roomsSvg = `
                <g class="cad-layer-rooms">
                    ${model.rooms.map(room => {
                        const isSel = selectedRoomId === room.id;
                        const area = ((room.w * room.h) / 1000000).toFixed(1);
                        const fillColor = isSel 
                            ? (isDark ? 'rgba(56, 189, 248, 0.18)' : 'rgba(2, 132, 199, 0.12)')
                            : (isDark ? 'rgba(15, 23, 42, 0.4)' : 'rgba(255, 255, 255, 0.85)');

                        const strokeCol = isSel ? '#0284c7' : (isDark ? '#475569' : '#94a3b8');
                        const strokeW = isSel ? 3.5 : 1.8;

                        return `
                            <g class="cad-room-group" data-room-id="${room.id}" transform="translate(${room.x}, ${room.y}) rotate(${room.rot || 0})">
                                <!-- Khung tường bao phòng -->
                                <rect x="0" y="0" width="${room.w}" height="${room.h}" 
                                    fill="${fillColor}" stroke="${strokeCol}" stroke-width="${strokeW}" rx="4" />
                                
                                <!-- Ký hiệu nội thất bên trong phòng -->
                                ${this.showFurniture ? renderFurnitureBlock(room.type, 0, 0, room.w, room.h, 0, theme) : ''}

                                <!-- Tên phòng & Diện tích m2 -->
                                <g class="cad-room-label" style="pointer-events: none;">
                                    <rect x="${room.w / 2 - 250}" y="${room.h / 2 - 60}" width="500" height="120" rx="20" 
                                        fill="${isDark ? 'rgba(15, 23, 42, 0.85)' : 'rgba(255, 255, 255, 0.92)'}" 
                                        stroke="${strokeCol}" stroke-width="1.5" />
                                    <text x="${room.w / 2}" y="${room.h / 2 - 5}" fill="${textColor}" font-size="80" font-weight="bold" text-anchor="middle">${room.name}</text>
                                    <text x="${room.w / 2}" y="${room.h / 2 + 40}" fill="#0284c7" font-size="60" font-weight="900" text-anchor="middle">${room.w} × ${room.h} (${area} m²)</text>
                                </g>

                                <!-- Hitbox tương tác chọn phòng -->
                                <rect x="0" y="0" width="${room.w}" height="${room.h}" 
                                    fill="transparent" class="cad-room-hitbox" data-room-id="${room.id}" style="cursor: move;" />
                            </g>
                        `;
                    }).join('')}
                </g>
            `;

            // Render Selection Bounding Box & 8 Handles + Núm Xoay Tròn (Arcada Interaction) cho phòng được chọn
            if (selectedRoomId) {
                const selRoom = model.rooms.find(r => r.id === selectedRoomId);
                if (selRoom) {
                    const rw = selRoom.w;
                    const rh = selRoom.h;
                    const pinDist = 260; // Khoảng cách núm xoay nhô lên

                    interactionOverlaySvg = `
                        <g class="cad-layer-selection" transform="translate(${selRoom.x}, ${selRoom.y}) rotate(${selRoom.rot || 0})">
                            <!-- Bounding Box Viền Chọn -->
                            <rect x="-8" y="-8" width="${rw + 16}" height="${rh + 16}" 
                                fill="none" stroke="#0284c7" stroke-width="3" stroke-dasharray="10 6" />
                            
                            <!-- Núm Xoay Đỉnh Tròn (Rotation Pin) -->
                            <line x1="${rw / 2}" y1="0" x2="${rw / 2}" y2="-${pinDist}" stroke="#0284c7" stroke-width="2.5" stroke-dasharray="4 4" />
                            <circle cx="${rw / 2}" cy="-${pinDist}" r="38" fill="#0284c7" stroke="#ffffff" stroke-width="4" 
                                class="cad-rotation-handle" data-room-id="${selRoom.id}" style="cursor: grab;" />
                            <text x="${rw / 2}" y="-${pinDist + 50}" fill="#0284c7" font-size="65" font-weight="bold" text-anchor="middle">XOAY</text>

                            <!-- 8 Điểm Neo Co Giãn (4 Góc + 4 Cạnh) -->
                            <!-- NW -->
                            <rect x="-24" y="-24" width="48" height="48" fill="#ffffff" stroke="#0284c7" stroke-width="4" 
                                class="cad-resize-handle" data-handle="nw" data-room-id="${selRoom.id}" style="cursor: nwse-resize;" />
                            <!-- N -->
                            <rect x="${rw / 2 - 24}" y="-24" width="48" height="48" fill="#ffffff" stroke="#0284c7" stroke-width="4" 
                                class="cad-resize-handle" data-handle="n" data-room-id="${selRoom.id}" style="cursor: ns-resize;" />
                            <!-- NE -->
                            <rect x="${rw - 24}" y="-24" width="48" height="48" fill="#ffffff" stroke="#0284c7" stroke-width="4" 
                                class="cad-resize-handle" data-handle="ne" data-room-id="${selRoom.id}" style="cursor: nesw-resize;" />
                            <!-- E -->
                            <rect x="${rw - 24}" y="${rh / 2 - 24}" width="48" height="48" fill="#ffffff" stroke="#0284c7" stroke-width="4" 
                                class="cad-resize-handle" data-handle="e" data-room-id="${selRoom.id}" style="cursor: ew-resize;" />
                            <!-- SE -->
                            <rect x="${rw - 24}" y="${rh - 24}" width="48" height="48" fill="#ffffff" stroke="#0284c7" stroke-width="4" 
                                class="cad-resize-handle" data-handle="se" data-room-id="${selRoom.id}" style="cursor: nwse-resize;" />
                            <!-- S -->
                            <rect x="${rw / 2 - 24}" y="${rh - 24}" width="48" height="48" fill="#ffffff" stroke="#0284c7" stroke-width="4" 
                                class="cad-resize-handle" data-handle="s" data-room-id="${selRoom.id}" style="cursor: ns-resize;" />
                            <!-- SW -->
                            <rect x="-24" y="${rh - 24}" width="48" height="48" fill="#ffffff" stroke="#0284c7" stroke-width="4" 
                                class="cad-resize-handle" data-handle="sw" data-room-id="${selRoom.id}" style="cursor: nesw-resize;" />
                            <!-- W -->
                            <rect x="-24" y="${rh / 2 - 24}" width="48" height="48" fill="#ffffff" stroke="#0284c7" stroke-width="4" 
                                class="cad-resize-handle" data-handle="w" data-room-id="${selRoom.id}" style="cursor: ew-resize;" />

                            <!-- Thanh Nút Mini Tiện Ích Đè Lên Đầu Phòng -->
                            <g class="cad-mini-action-bar" transform="translate(${rw / 2 - 220}, -130)">
                                <rect x="0" y="0" width="440" height="70" rx="35" fill="rgba(15, 23, 42, 0.95)" stroke="#38bdf8" stroke-width="2" />
                                <!-- Nút Confirm ✓ -->
                                <g class="btn-cad-mini-action" data-action="confirm" data-room-id="${selRoom.id}" style="cursor: pointer;">
                                    <circle cx="45" cy="35" r="24" fill="#22c55e" />
                                    <text x="45" y="44" fill="#ffffff" font-size="28" font-weight="bold" text-anchor="middle">✓</text>
                                </g>
                                <!-- Nút Xoay 90 ↻ -->
                                <g class="btn-cad-mini-action" data-action="rotate" data-room-id="${selRoom.id}" style="cursor: pointer;">
                                    <circle cx="120" cy="35" r="24" fill="#0284c7" />
                                    <text x="120" y="44" fill="#ffffff" font-size="28" font-weight="bold" text-anchor="middle">↻</text>
                                </g>
                                <!-- Nút Size + -->
                                <g class="btn-cad-mini-action" data-action="size_plus" data-room-id="${selRoom.id}" style="cursor: pointer;">
                                    <circle cx="200" cy="35" r="24" fill="#3b82f6" />
                                    <text x="200" y="44" fill="#ffffff" font-size="30" font-weight="bold" text-anchor="middle">+</text>
                                </g>
                                <!-- Nút Size - -->
                                <g class="btn-cad-mini-action" data-action="size_minus" data-room-id="${selRoom.id}" style="cursor: pointer;">
                                    <circle cx="280" cy="35" r="24" fill="#3b82f6" />
                                    <text x="280" y="43" fill="#ffffff" font-size="34" font-weight="bold" text-anchor="middle">−</text>
                                </g>
                                <!-- Nút Xóa 🗑 -->
                                <g class="btn-cad-mini-action" data-action="delete" data-room-id="${selRoom.id}" style="cursor: pointer;">
                                    <circle cx="360" cy="35" r="24" fill="#ef4444" />
                                    <text x="360" y="44" fill="#ffffff" font-size="24" text-anchor="middle">🗑</text>
                                </g>
                            </g>
                        </g>
                    `;
                }
            }
        }

        // 5. Openings (Cửa đi & Cửa sổ)
        let openingsSvg = '';
        if (model.openings && model.openings.length > 0) {
            openingsSvg = `
                <g class="cad-layer-openings">
                    ${model.openings.map(op => {
                        if (op.type === 'window') {
                            return renderWindowBlock(op.x, op.y, op.w, op.h, op.rot, op.style, theme);
                        }
                        return renderDoorBlock(op.x, op.y, op.w, op.h, op.rot, op.style, theme);
                    }).join('')}
                </g>
            `;
        }

        // 6. Stairs (Cầu thang kiến trúc)
        let stairsSvg = '';
        if (model.stairs && model.stairs.length > 0) {
            stairsSvg = `
                <g class="cad-layer-stairs">
                    ${model.stairs.map(st => renderStairBlock(st.x, st.y, st.w, st.h, st.rot, st.type, st.steps, theme)).join('')}
                </g>
            `;
        }

        // 7. Dimensions (Đường kích thước tự động chuẩn CAD)
        let dimensionsSvg = '';
        if (this.showDimensions && pts.length >= 2) {
            dimensionsSvg = `
                <g class="cad-layer-dimensions">
                    ${pts.map((p1, idx) => {
                        const p2 = pts[(idx + 1) % pts.length];
                        const dx = p2.x - p1.x;
                        const dy = p2.y - p1.y;
                        const len = Math.round(Math.hypot(dx, dy));
                        if (len === 0) return '';

                        const nx = -dy / len;
                        const ny = dx / len;
                        const offset = 450; // Khoảng cách đẩy đường đo ra ngoài

                        const d1 = { x: p1.x + nx * offset, y: p1.y + ny * offset };
                        const d2 = { x: p2.x + nx * offset, y: p2.y + ny * offset };
                        const mid = { x: (d1.x + d2.x) / 2, y: (d1.y + d2.y) / 2 };

                        let angle = Math.atan2(dy, dx) * (180 / Math.PI);
                        if (angle > 90 || angle < -90) angle += 180;

                        return `
                            <!-- Đường gióng (Extension Lines) -->
                            <line x1="${p1.x}" y1="${p1.y}" x2="${p1.x + nx * (offset + 100)}" y2="${p1.y + ny * (offset + 100)}" stroke="${dimColor}" stroke-width="1.2" opacity="0.7" />
                            <line x1="${p2.x}" y1="${p2.y}" x2="${p2.x + nx * (offset + 100)}" y2="${p2.y + ny * (offset + 100)}" stroke="${dimColor}" stroke-width="1.2" opacity="0.7" />
                            <!-- Đường đo kích thước (Dimension Line) -->
                            <line x1="${d1.x}" y1="${d1.y}" x2="${d2.x}" y2="${d2.y}" stroke="${dimColor}" stroke-width="1.8" />
                            <!-- Vạch gạch chéo 45 độ đầu mũi tên chuẩn kiến trúc (Architectural Ticks) -->
                            <line x1="${d1.x - 30}" y1="${d1.y - 30}" x2="${d1.x + 30}" y2="${d1.y + 30}" stroke="${dimColor}" stroke-width="2.5" />
                            <line x1="${d2.x - 30}" y1="${d2.y - 30}" x2="${d2.x + 30}" y2="${d2.y + 30}" stroke="${dimColor}" stroke-width="2.5" />
                            <!-- Chữ số đo kích thước -->
                            <g transform="translate(${mid.x}, ${mid.y}) rotate(${angle})">
                                <rect x="-140" y="-45" width="280" height="90" rx="12" fill="${bgColor}" />
                                <text x="0" y="10" fill="${dimColor}" font-size="75" font-weight="900" text-anchor="middle">${len}</text>
                            </g>
                        `;
                    }).join('')}
                </g>
            `;
        }

        // 8. Smart Alignment Guides (Đường gióng thẳng hàng)
        let guidesSvg = '';
        if (activeGuides && activeGuides.length > 0) {
            guidesSvg = `
                <g class="cad-layer-guides">
                    ${activeGuides.map(g => {
                        if (g.type === 'vertical') {
                            return `<line x1="${g.x}" y1="${g.y1}" x2="${g.x}" y2="${g.y2}" stroke="#eab308" stroke-width="2" stroke-dasharray="12 6" />`;
                        }
                        return `<line x1="${g.x1}" y1="${g.y}" x2="${g.x2}" y2="${g.y}" stroke="#eab308" stroke-width="2" stroke-dasharray="12 6" />`;
                    }).join('')}
                </g>
            `;
        }

        return `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="${vbX} ${vbY} ${vbW} ${vbH}" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
                <rect x="${vbX}" y="${vbY}" width="${vbW}" height="${vbH}" fill="${bgColor}" />
                ${gridSvg}
                ${footprintSvg}
                ${wallsSvg}
                ${roomsSvg}
                ${openingsSvg}
                ${stairsSvg}
                ${dimensionsSvg}
                ${guidesSvg}
                ${interactionOverlaySvg}
            </svg>
        `;
    }
}
