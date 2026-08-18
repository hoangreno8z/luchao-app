// ============================================================
// CAD Floorplan 2D Canvas Renderer
// Tác giả: Dịch Sư Nguyễn Huy Hoàng
// ============================================================

export class CADFloorplanRenderer {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.scale = 40; // Pixels per meter
        this.offsetX = 60;
        this.offsetY = 60;
        this.showDimensions = true;
        this.showFurniture = true;
        this.showGrid = true;
        this.showFengShuiOverlay = false;
        this.showCompass = false;
    }

    render(floorData, options = {}) {
        if (!floorData || !this.canvas) return;
        const ctx = this.ctx;
        const dpr = window.devicePixelRatio || 1;

        const W = floorData.widthM || 5.0;
        const L = floorData.lengthM || 16.0;

        // Auto-fit scale
        const margin = 140;
        const availW = this.canvas.width / dpr - margin;
        const availH = this.canvas.height / dpr - margin;

        this.scale = Math.min(availW / W, availH / L, 60);
        this.offsetX = (this.canvas.width / dpr - W * this.scale) / 2;
        this.offsetY = (this.canvas.height / dpr - L * this.scale) / 2 + 10;

        // Clear canvas
        ctx.save();
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // 1. Draw Architectural Grid
        if (this.showGrid) {
            this.drawGrid(W, L);
        }

        // 2. Draw Room Zones (Background Fill)
        this.drawRooms(floorData.rooms);

        // 3. Draw Walls
        this.drawWalls(floorData.walls);

        // 4. Draw Windows & Doors
        this.drawWindows(floorData.windows);
        this.drawDoors(floorData.doors);

        // 5. Draw Furniture
        if (this.showFurniture) {
            this.drawFurniture(floorData.furniture);
        }

        // 6. Draw Dimensions
        if (this.showDimensions) {
            this.drawDimensions(floorData.dimensions, W, L);
        }

        // 7. Draw Professional Title Block
        this.drawTitleBlock(floorData, options);

        // 8. Draw North Compass Arrow
        this.drawNorthArrow(options.facingDegree || 180);

        ctx.restore();
    }

    toCanvasX(mX) {
        return this.offsetX + mX * this.scale;
    }

    toCanvasY(mY) {
        return this.offsetY + mY * this.scale;
    }

    drawGrid(W, L) {
        const ctx = this.ctx;
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
        ctx.lineWidth = 1;

        for (let x = 0; x <= W; x += 1) {
            ctx.beginPath();
            ctx.moveTo(this.toCanvasX(x), this.toCanvasY(0) - 20);
            ctx.lineTo(this.toCanvasX(x), this.toCanvasY(L) + 20);
            ctx.stroke();
        }
        for (let y = 0; y <= L; y += 1) {
            ctx.beginPath();
            ctx.moveTo(this.toCanvasX(0) - 20, this.toCanvasY(y));
            ctx.lineTo(this.toCanvasX(W) + 20, this.toCanvasY(y));
            ctx.stroke();
        }
    }

    drawRooms(rooms = []) {
        const ctx = this.ctx;
        rooms.forEach((r, idx) => {
            const rx = this.toCanvasX(r.x);
            const ry = this.toCanvasY(r.y);
            const rw = r.w * this.scale;
            const rh = r.h * this.scale;

            // Translucent floor fill
            ctx.fillStyle = idx % 2 === 0 ? 'rgba(30, 41, 59, 0.45)' : 'rgba(15, 23, 42, 0.55)';
            ctx.fillRect(rx, ry, rw, rh);

            // Room text label
            ctx.fillStyle = '#f8fafc';
            ctx.font = 'bold 12px Inter, sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText(r.name, rx + rw / 2, ry + rh / 2 - 6);

            ctx.fillStyle = '#f59e0b';
            ctx.font = '10px Inter, sans-serif';
            ctx.fillText(`S ≈ ${r.areaM2} m²`, rx + rw / 2, ry + rh / 2 + 10);
        });
    }

    drawWalls(walls = []) {
        const ctx = this.ctx;
        walls.forEach(w => {
            const x1 = this.toCanvasX(w.x1);
            const y1 = this.toCanvasY(w.y1);
            const x2 = this.toCanvasX(w.x2);
            const y2 = this.toCanvasY(w.y2);

            const thicknessPx = Math.max(3, w.thickness * this.scale);

            ctx.strokeStyle = w.type === 'outer' ? '#fbbf24' : '#cbd5e1';
            ctx.lineWidth = thicknessPx;
            ctx.lineCap = 'square';

            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();
        });
    }

    drawDoors(doors = []) {
        const ctx = this.ctx;
        doors.forEach(d => {
            const dx = this.toCanvasX(d.x);
            const dy = this.toCanvasY(d.y);
            const dw = d.w * this.scale;

            ctx.strokeStyle = '#38bdf8';
            ctx.lineWidth = 2;

            if (d.type === 'main_door') {
                // 4-wing / 2-wing main entrance door
                ctx.beginPath();
                ctx.moveTo(dx, dy);
                ctx.lineTo(dx + dw / 2, dy);
                ctx.lineTo(dx + dw, dy);
                ctx.stroke();

                // Door arcs
                ctx.beginPath();
                ctx.arc(dx, dy, dw / 2, 0, Math.PI / 2, false);
                ctx.arc(dx + dw, dy, dw / 2, Math.PI, Math.PI / 2, true);
                ctx.strokeStyle = 'rgba(56, 189, 248, 0.6)';
                ctx.setLineDash([3, 3]);
                ctx.stroke();
                ctx.setLineDash([]);
            } else {
                // Standard single leaf door
                ctx.beginPath();
                ctx.moveTo(dx, dy);
                ctx.lineTo(dx + dw, dy);
                ctx.stroke();

                ctx.beginPath();
                ctx.arc(dx, dy, dw, 0, Math.PI / 2, false);
                ctx.strokeStyle = 'rgba(56, 189, 248, 0.5)';
                ctx.setLineDash([2, 2]);
                ctx.stroke();
                ctx.setLineDash([]);
            }
        });
    }

    drawWindows(windows = []) {
        const ctx = this.ctx;
        windows.forEach(w => {
            const wx = this.toCanvasX(w.x);
            const wy = this.toCanvasY(w.y);
            const ww = w.w * this.scale;

            ctx.fillStyle = '#0ea5e9';
            ctx.fillRect(wx, wy - 3, ww, 6);

            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 1;
            ctx.strokeRect(wx, wy - 3, ww, 6);
        });
    }

    drawFurniture(furniture = []) {
        const ctx = this.ctx;
        furniture.forEach(f => {
            const fx = this.toCanvasX(f.x);
            const fy = this.toCanvasY(f.y);
            const fw = f.w * this.scale;
            const fh = f.h * this.scale;

            ctx.save();
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
            ctx.fillStyle = 'rgba(30, 41, 59, 0.85)';
            ctx.lineWidth = 1.5;

            switch (f.type) {
                case 'sofa':
                    ctx.fillRect(fx, fy, fw, fh);
                    ctx.strokeRect(fx, fy, fw, fh);
                    // Sofa cushions
                    ctx.strokeRect(fx + 4, fy + 4, fw - 8, fh - 12);
                    break;

                case 'bed_master':
                case 'bed_single':
                    ctx.fillStyle = '#1e293b';
                    ctx.fillRect(fx, fy, fw, fh);
                    ctx.strokeRect(fx, fy, fw, fh);
                    // Pillows
                    ctx.fillStyle = '#e2e8f0';
                    ctx.fillRect(fx + 6, fy + 6, (fw - 16) / 2, fh * 0.25);
                    if (f.type === 'bed_master') {
                        ctx.fillRect(fx + fw / 2 + 2, fy + 6, (fw - 16) / 2, fh * 0.25);
                    }
                    // Blanket line
                    ctx.strokeStyle = '#f59e0b';
                    ctx.beginPath();
                    ctx.moveTo(fx, fy + fh * 0.45);
                    ctx.lineTo(fx + fw, fy + fh * 0.45);
                    ctx.stroke();
                    break;

                case 'dining_table':
                    ctx.fillRect(fx, fy, fw, fh);
                    ctx.strokeRect(fx, fy, fw, fh);
                    // Chairs
                    ctx.fillStyle = '#64748b';
                    ctx.fillRect(fx + 6, fy - 6, fw * 0.35, 5);
                    ctx.fillRect(fx + fw * 0.55, fy - 6, fw * 0.35, 5);
                    ctx.fillRect(fx + 6, fy + fh + 1, fw * 0.35, 5);
                    ctx.fillRect(fx + fw * 0.55, fy + fh + 1, fw * 0.35, 5);
                    break;

                case 'altar_table':
                    ctx.fillStyle = '#7c2d12';
                    ctx.fillRect(fx, fy, fw, fh);
                    ctx.strokeStyle = '#fbbf24';
                    ctx.lineWidth = 2;
                    ctx.strokeRect(fx, fy, fw, fh);
                    // Incense icon
                    ctx.fillStyle = '#f59e0b';
                    ctx.beginPath();
                    ctx.arc(fx + fw / 2, fy + fh / 2, 6, 0, Math.PI * 2);
                    ctx.fill();
                    break;

                case 'stairs':
                    ctx.fillRect(fx, fy, fw, fh);
                    ctx.strokeRect(fx, fy, fw, fh);
                    const stepCount = 14;
                    const stepH = fh / stepCount;
                    ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
                    for (let s = 1; s < stepCount; s++) {
                        ctx.beginPath();
                        ctx.moveTo(fx, fy + s * stepH);
                        ctx.lineTo(fx + fw, fy + s * stepH);
                        ctx.stroke();
                    }
                    // Up arrow
                    ctx.strokeStyle = '#38bdf8';
                    ctx.lineWidth = 2;
                    ctx.beginPath();
                    ctx.moveTo(fx + fw / 2, fy + fh - 10);
                    ctx.lineTo(fx + fw / 2, fy + 10);
                    ctx.lineTo(fx + fw / 2 - 5, fy + 18);
                    ctx.moveTo(fx + fw / 2, fy + 10);
                    ctx.lineTo(fx + fw / 2 + 5, fy + 18);
                    ctx.stroke();
                    break;

                case 'toilet_bowl':
                    ctx.fillStyle = '#e2e8f0';
                    ctx.fillRect(fx, fy, fw, fh * 0.35); // Tank
                    ctx.beginPath();
                    ctx.ellipse(fx + fw / 2, fy + fh * 0.65, fw * 0.45, fh * 0.35, 0, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.stroke();
                    break;

                case 'lavabo':
                    ctx.fillStyle = '#e2e8f0';
                    ctx.fillRect(fx, fy, fw, fh);
                    ctx.beginPath();
                    ctx.ellipse(fx + fw / 2, fy + fh / 2, fw * 0.35, fh * 0.35, 0, 0, Math.PI * 2);
                    ctx.fillStyle = '#0ea5e9';
                    ctx.fill();
                    break;

                default:
                    ctx.fillRect(fx, fy, fw, fh);
                    ctx.strokeRect(fx, fy, fw, fh);
                    break;
            }

            ctx.restore();
        });
    }

    drawDimensions(dimensions = [], W, L) {
        const ctx = this.ctx;
        ctx.save();
        ctx.strokeStyle = '#94a3b8';
        ctx.fillStyle = '#94a3b8';
        ctx.font = '10px Inter, sans-serif';
        ctx.lineWidth = 1;

        // Width Dimension (Top)
        const topY = this.toCanvasY(0) - 25;
        ctx.beginPath();
        ctx.moveTo(this.toCanvasX(0), topY);
        ctx.lineTo(this.toCanvasX(W), topY);
        ctx.stroke();
        // Dimension ticks
        ctx.beginPath();
        ctx.moveTo(this.toCanvasX(0), topY - 5);
        ctx.lineTo(this.toCanvasX(0), topY + 5);
        ctx.moveTo(this.toCanvasX(W), topY - 5);
        ctx.lineTo(this.toCanvasX(W), topY + 5);
        ctx.stroke();

        ctx.textAlign = 'center';
        ctx.fillText(`Ngang: ${W}m`, this.toCanvasX(W / 2), topY - 6);

        // Length Dimension (Right)
        const rightX = this.toCanvasX(W) + 25;
        ctx.beginPath();
        ctx.moveTo(rightX, this.toCanvasY(0));
        ctx.lineTo(rightX, this.toCanvasY(L));
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(rightX - 5, this.toCanvasY(0));
        ctx.lineTo(rightX + 5, this.toCanvasY(0));
        ctx.moveTo(rightX - 5, this.toCanvasY(L));
        ctx.lineTo(rightX + 5, this.toCanvasY(L));
        ctx.stroke();

        ctx.save();
        ctx.translate(rightX + 15, this.toCanvasY(L / 2));
        ctx.rotate(Math.PI / 2);
        ctx.textAlign = 'center';
        ctx.fillText(`Dài: ${L}m`, 0, 0);
        ctx.restore();

        ctx.restore();
    }

    drawTitleBlock(floorData, options = {}) {
        const ctx = this.ctx;
        ctx.save();

        const boxW = 260;
        const boxH = 75;
        const boxX = 16;
        const boxY = this.canvas.height / (window.devicePixelRatio || 1) - boxH - 16;

        ctx.fillStyle = 'rgba(15, 23, 42, 0.9)';
        ctx.fillRect(boxX, boxY, boxW, boxH);
        ctx.strokeStyle = 'rgba(245, 158, 11, 0.4)';
        ctx.lineWidth = 1;
        ctx.strokeRect(boxX, boxY, boxW, boxH);

        ctx.fillStyle = '#fbbf24';
        ctx.font = 'bold 11px Inter, sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText(`MẶT BẰNG ${floorData.floorName.toUpperCase()}`, boxX + 12, boxY + 18);

        ctx.fillStyle = '#e2e8f0';
        ctx.font = '10px Inter, sans-serif';
        ctx.fillText(`Kích thước: ${floorData.widthM}m x ${floorData.lengthM}m`, boxX + 12, boxY + 34);
        ctx.fillText(`Tư vấn Phong Thủy: Dịch Sư Nguyễn Huy Hoàng`, boxX + 12, boxY + 50);

        ctx.fillStyle = '#94a3b8';
        ctx.font = '9px Inter, sans-serif';
        ctx.fillText(`Huyền Không Phi Tinh • Bát Trạch • Thước Lỗ Ban`, boxX + 12, boxY + 65);

        ctx.restore();
    }

    drawNorthArrow(facingDegree) {
        const ctx = this.ctx;
        ctx.save();

        const dpr = window.devicePixelRatio || 1;
        const cx = this.canvas.width / dpr - 50;
        const cy = 50;
        const radius = 24;

        ctx.translate(cx, cy);

        // Circular frame
        ctx.strokeStyle = 'rgba(245, 158, 11, 0.6)';
        ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(0, 0, radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // North pointer
        ctx.fillStyle = '#ef4444';
        ctx.beginPath();
        ctx.moveTo(0, -radius + 4);
        ctx.lineTo(6, 4);
        ctx.lineTo(0, 0);
        ctx.fill();

        ctx.fillStyle = '#e2e8f0';
        ctx.beginPath();
        ctx.moveTo(0, radius - 4);
        ctx.lineTo(-6, -4);
        ctx.lineTo(0, 0);
        ctx.fill();

        ctx.fillStyle = '#fbbf24';
        ctx.font = 'bold 10px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('N', 0, -radius - 4);

        ctx.restore();
    }
}
