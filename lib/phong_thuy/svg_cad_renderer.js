// ============================================================
// Architectural CAD SVG Renderer (Scan2CAD Pro)
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
        this.selectedRoomId = null;
    }

    renderSvg(geometry, options = {}) {
        const W = geometry.widthMm || 5000;
        const D = geometry.depthMm || 16000;
        const selectedId = options.selectedRoomId || this.selectedRoomId;

        const padX = Math.max(1200, Math.round(W * 0.18));
        const padY = Math.max(1400, Math.round(D * 0.12));
        const viewX = -padX;
        const viewY = -padY;
        const viewW = W + padX * 2;
        const viewH = D + padY * 2 + 300;

        const dimTick = (x, y) => `<line x1="${x - 40}" y1="${y + 40}" x2="${x + 40}" y2="${y - 40}" stroke="#000" stroke-width="6"/>`;
        let dimsSvg = '';
        if (this.showDimensions) {
            dimsSvg = `
                <line x1="0" y1="-700" x2="${W}" y2="-700" stroke="#000" stroke-width="3"/>
                <line x1="0" y1="-850" x2="0" y2="-550" stroke="#666" stroke-width="2"/>
                <line x1="${W}" y1="-850" x2="${W}" y2="-550" stroke="#666" stroke-width="2"/>
                ${dimTick(0, -700)} ${dimTick(W, -700)}
                <text x="${W / 2}" y="-730" text-anchor="middle" font-size="120" font-family="'Courier New', monospace" font-weight="900" fill="#000">${W} mm</text>

                <line x1="-700" y1="0" x2="-700" y2="${D}" stroke="#000" stroke-width="3"/>
                <line x1="-850" y1="0" x2="-550" y2="0" stroke="#666" stroke-width="2"/>
                <line x1="-850" y1="${D}" x2="-550" y2="${D}" stroke="#666" stroke-width="2"/>
                ${dimTick(-700, 0)} ${dimTick(-700, D)}
                <text x="-730" y="${D / 2}" text-anchor="middle" transform="rotate(-90 -730 ${D / 2})" font-size="120" font-family="'Courier New', monospace" font-weight="900" fill="#000">${D} mm</text>
            `;
        }

        let roomsSvg = '';
        if (geometry.rooms) {
            geometry.rooms.forEach(r => {
                const isSel = (r.id === selectedId);
                const area = ((r.w * r.h) / 1000000).toFixed(1);
                roomsSvg += `
                    <g class="cad-room-interactive" data-room-id="${r.id}">
                        <rect x="${r.x}" y="${r.y}" width="${r.w}" height="${r.h}" fill="${isSel ? 'rgba(2, 132, 199, 0.06)' : '#ffffff'}" stroke="${isSel ? '#0284c7' : '#000000'}" stroke-width="${isSel ? 16 : 14}"/>
                        <text x="${r.x + r.w / 2}" y="${r.y + r.h / 2 - 10}" text-anchor="middle" font-size="${Math.min(r.w * 0.12, 75)}" font-weight="900" fill="#000000">${r.name}</text>
                        <text x="${r.x + r.w / 2}" y="${r.y + r.h / 2 + 45}" text-anchor="middle" font-size="${Math.min(r.w * 0.09, 55)}" font-weight="bold" fill="#0284c7">${area} m²</text>
                    </g>
                `;
            });
        }

        let footprintSvg = `<rect x="0" y="0" width="${W}" height="${D}" fill="none" stroke="#000000" stroke-width="45"/>`;

        return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewX} ${viewY} ${viewW} ${viewH}" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" class="scan2cad-interactive-drawing" style="display: block; width: 100%; height: 100%; background: #ffffff;">
    ${footprintSvg}
    <g id="layer-rooms-container">${roomsSvg}</g>
    <g id="layer-dimensions">${dimsSvg}</g>
</svg>
        `.trim();
    }
}
