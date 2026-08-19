// ============================================================
// Architectural CAD Floorplan & 9-Palace Flying Star Renderer
// Chuẩn Bản Vẽ Kiến Trúc Thực Tế (CHATUY.VN / mauphongthuy.jpg)
// Tác giả: Dịch Sư Nguyễn Huy Hoàng
// ============================================================

export class CADFloorplanRenderer {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.theme = 'white'; // 'white' (Architectural Blueprint Paper) | 'dark' (CAD Midnight)
        this.showDimensions = true;
        this.showFurniture = true;
        this.showPalaceOverlay = true;
        this.showCompass = true;
    }

    render(floorData, options = {}) {
        if (!floorData || !this.canvas) return;
        const ctx = this.ctx;
        const dpr = window.devicePixelRatio || 1;

        const W = Math.max(3.0, parseFloat(floorData.widthM) || 5.0);
        const L = Math.max(5.0, parseFloat(floorData.lengthM) || 16.0);
        const facingDegree = options.facingDegree !== undefined ? options.facingDegree : 180;
        const flyingStars = options.flyingStars || null;

        const viewW = this.canvas.width / dpr;
        const viewH = this.canvas.height / dpr;

        // Reset transform & clear
        ctx.save();
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

        const isWhite = this.theme === 'white';

        // 1. Vẽ nền Canvas (Trắng Bản Vẽ Kỹ Thuật hoặc Tối CAD)
        ctx.fillStyle = isWhite ? '#ffffff' : '#080c16';
        ctx.fillRect(0, 0, viewW, viewH);

        // Khung viền bản vẽ kỹ thuật CAD
        ctx.strokeStyle = isWhite ? '#94a3b8' : '#1e293b';
        ctx.lineWidth = 1;
        ctx.strokeRect(10, 10, viewW - 20, viewH - 20);

        // --- 2. THUẬT TOÁN FIT-TO-SCREEN (BOUNDING BOX 85% - 90%) ---
        const marginX = 95;
        const marginY = 85;
        const availW = viewW - marginX * 2;
        const availH = viewH - marginY * 2;

        const scale = Math.min(availW / W, availH / L);
        this.scale = scale;

        const housePixelW = W * scale;
        const housePixelH = L * scale;
        const startX = (viewW - housePixelW) / 2;
        const startY = (viewH - housePixelH) / 2;

        this.originX = startX;
        this.originY = startY;

        // --- 3. VẼ HỆ LƯỚI TRỤC ĐỊNH VỊ (GRID AXES: 1, 2, 3, 4 / A, B, C, D) ---
        this.drawGridAxes(ctx, floorData, startX, startY, housePixelW, housePixelH, scale, isWhite);

        // --- 4. VẼ SÀN GẠCH KIẾN TRÚC ---
        this.drawTiledFloor(ctx, startX, startY, housePixelW, housePixelH, scale, isWhite);

        // --- 5. VẼ BẬC TAM CẤP SẢNH CHÍNH (NẾU CÓ) ---
        if (floorData.entrancePorch) {
            this.drawEntrancePorch(ctx, floorData.entrancePorch, startX, startY, scale, isWhite);
        }

        // --- 6. VẼ PHÂN VÙNG PHÒNG & TÊN PHÒNG KÈM DIỆN TÍCH M2 ---
        this.drawRoomSpaces(ctx, floorData.rooms || [], scale, startX, startY, isWhite);

        // --- 7. VẼ NỘI THẤT VECTOR KIẾN TRÚC CHI TIẾT ---
        if (this.showFurniture) {
            this.drawFurnitureVector(ctx, floorData.furniture || [], scale, startX, startY, isWhite);
        }

        // --- 8. VẼ TƯỜNG CẮT KIẾN TRÚC DÀY 220MM / 110MM ---
        this.drawArchitecturalWalls(ctx, floorData.walls || [], scale, startX, startY, isWhite);

        // --- 9. VẼ CỘT BÊ TÔNG CỐT THÉP 220x220MM ---
        this.drawConcreteColumns(ctx, floorData.columns || [], scale, startX, startY, isWhite);

        // --- 10. VẼ CỬA ĐI (NÉT QUÉT 90°) & CỬA SỔ KÍNH ---
        this.drawDoors(ctx, floorData.doors || [], scale, startX, startY, isWhite);
        this.drawWindows(ctx, floorData.windows || [], scale, startX, startY, isWhite);

        // --- 11. VẼ LƯỚI CỬU CUNG LẠC THƯ 9 Ô (THEO MẪU MAUPHONGTHUY.JPG) ---
        if (this.showPalaceOverlay) {
            this.drawNinePalacesOverlay(ctx, startX, startY, housePixelW, housePixelH, flyingStars, W, L, isWhite);
        }

        // --- 12. VẼ ĐƯỜNG GIÓNG KÍCH THƯỚC 3 LỚP (DIMENSION CHAINS) ---
        if (this.showDimensions) {
            this.drawDimensionChains(ctx, floorData, startX, startY, housePixelW, housePixelH, W, L, scale, isWhite);
        }

        // --- 13. VẼ ĐĨA LA KINH / HOA TIÊU 24 SƠN Ở TRUNG TÂM HOẶC GÓC ---
        if (this.showCompass) {
            this.drawCompassRose(ctx, startX + housePixelW / 2, startY + housePixelH / 2, Math.min(housePixelW, housePixelH) * 0.28, facingDegree, isWhite);
        }

        // --- 14. VẼ KHUNG TIÊU ĐỀ BẢN VẼ KIẾN TRÚC CHUẨN THI CÔNG ---
        this.drawArchitecturalTitleBlock(ctx, viewW, viewH, floorData, options, isWhite);

        ctx.restore();
    }

    drawGridAxes(ctx, floorData, ox, oy, pw, ph, scale, isWhite) {
        ctx.save();
        const axesX = floorData.axesX || [{ label: '1', x: 0 }, { label: '2', x: floorData.widthM }];
        const axesY = floorData.axesY || [{ label: 'A', y: 0 }, { label: 'B', y: floorData.lengthM }];

        const axisColor = isWhite ? '#64748b' : '#475569';
        const bubbleBg = isWhite ? '#ffffff' : '#0f172a';
        const bubbleText = isWhite ? '#0f172a' : '#f8fafc';
        const bubbleRadius = 11;

        ctx.strokeStyle = axisColor;
        ctx.lineWidth = 0.8;
        ctx.setLineDash([6, 4, 2, 4]); // Nét trục chấm gạch

        // Trục dọc X (Trục 1, 2, 3, 4...)
        axesX.forEach(ax => {
            const x = ox + ax.x * scale;
            ctx.beginPath();
            ctx.moveTo(x, oy - 45);
            ctx.lineTo(x, oy + ph + 45);
            ctx.stroke();

            // Vòng tròn trục phía trên
            this.drawAxisBubble(ctx, x, oy - 52, ax.label, bubbleBg, axisColor, bubbleText, bubbleRadius);
            // Vòng tròn trục phía dưới
            this.drawAxisBubble(ctx, x, oy + ph + 52, ax.label, bubbleBg, axisColor, bubbleText, bubbleRadius);
        });

        // Trục ngang Y (Trục A, B, C, D...)
        axesY.forEach(ay => {
            const y = oy + ay.y * scale;
            ctx.beginPath();
            ctx.moveTo(ox - 45, y);
            ctx.lineTo(ox + pw + 45, y);
            ctx.stroke();

            // Vòng tròn trục bên trái
            this.drawAxisBubble(ctx, ox - 52, y, ay.label, bubbleBg, axisColor, bubbleText, bubbleRadius);
            // Vòng tròn trục bên phải
            this.drawAxisBubble(ctx, ox + pw + 52, y, ay.label, bubbleBg, axisColor, bubbleText, bubbleRadius);
        });

        ctx.restore();
    }

    drawAxisBubble(ctx, cx, cy, label, bg, border, text, r) {
        ctx.save();
        ctx.setLineDash([]);
        ctx.fillStyle = bg;
        ctx.strokeStyle = border;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = text;
        ctx.font = 'bold 11px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(label, cx, cy);
        ctx.restore();
    }

    drawTiledFloor(ctx, x, y, w, h, scale, isWhite) {
        ctx.save();
        ctx.fillStyle = isWhite ? '#f8fafc' : '#0f172a';
        ctx.fillRect(x, y, w, h);

        // Kẻ lưới gạch lát sàn kiến trúc 600x600mm
        const tileStep = 0.6 * scale;
        if (tileStep >= 8) {
            ctx.strokeStyle = isWhite ? 'rgba(0, 0, 0, 0.04)' : 'rgba(255, 255, 255, 0.035)';
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            for (let px = x; px <= x + w + 0.1; px += tileStep) {
                ctx.moveTo(px, y);
                ctx.lineTo(px, y + h);
            }
            for (let py = y; py <= y + h + 0.1; py += tileStep) {
                ctx.moveTo(x, py);
                ctx.lineTo(x + w, py);
            }
            ctx.stroke();
        }
        ctx.restore();
    }

    drawEntrancePorch(ctx, porch, ox, oy, scale, isWhite) {
        ctx.save();
        const px = ox + porch.x * scale;
        const py = oy + porch.y * scale;
        const pw = porch.w * scale;
        const ph = porch.h * scale;

        const steps = porch.steps || 3;
        const stepH = ph / steps;

        for (let i = 0; i < steps; i++) {
            const sx = px + (i * 0.15 * scale);
            const sw = pw - (i * 0.3 * scale);
            const sy = py + (i * stepH);

            ctx.fillStyle = isWhite ? (i % 2 === 0 ? '#e2e8f0' : '#cbd5e1') : (i % 2 === 0 ? '#1e293b' : '#334155');
            ctx.fillRect(sx, sy, sw, stepH);
            ctx.strokeStyle = isWhite ? '#475569' : '#94a3b8';
            ctx.lineWidth = 1;
            ctx.strokeRect(sx, sy, sw, stepH);
        }

        ctx.restore();
    }

    drawRoomSpaces(ctx, rooms, scale, ox, oy, isWhite) {
        ctx.save();
        rooms.forEach(room => {
            const rx = ox + room.x * scale;
            const ry = oy + room.y * scale;
            const rw = room.w * scale;
            const rh = room.h * scale;

            // Nhãn tên phòng & diện tích m2 in hoa chuẩn CAD
            const cx = rx + rw / 2;
            const cy = ry + rh / 2;

            ctx.save();
            ctx.fillStyle = isWhite ? '#0f172a' : '#f8fafc';
            ctx.font = 'bold 11px Inter, sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'bottom';
            ctx.fillText(room.name.toUpperCase(), cx, cy - 2);

            ctx.fillStyle = isWhite ? '#0284c7' : '#38bdf8';
            ctx.font = '600 10px Inter, sans-serif';
            ctx.textBaseline = 'top';
            ctx.fillText(`${room.areaM2} m²`, cx, cy + 2);
            ctx.restore();
        });
        ctx.restore();
    }

    drawConcreteColumns(ctx, columns, scale, ox, oy, isWhite) {
        ctx.save();
        columns.forEach(col => {
            const size = (col.size || 0.22) * scale;
            const cx = ox + col.x * scale - size / 2;
            const cy = oy + col.y * scale - size / 2;

            ctx.fillStyle = isWhite ? '#1e293b' : '#f1f5f9';
            ctx.fillRect(cx, cy, size, size);

            ctx.strokeStyle = isWhite ? '#ffffff' : '#0f172a';
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(cx, cy);
            ctx.lineTo(cx + size, cy + size);
            ctx.moveTo(cx + size, cy);
            ctx.lineTo(cx, cy + size);
            ctx.stroke();
        });
        ctx.restore();
    }

    drawArchitecturalWalls(ctx, walls, scale, ox, oy, isWhite) {
        ctx.save();
        walls.forEach(w => {
            const x1 = ox + w.x1 * scale;
            const y1 = oy + w.y1 * scale;
            const x2 = ox + w.x2 * scale;
            const y2 = oy + w.y2 * scale;
            const thicknessPx = Math.max(3, (w.thickness || 0.22) * scale);

            ctx.strokeStyle = isWhite ? (w.type === 'outer' ? '#0f172a' : '#334155') : (w.type === 'outer' ? '#e2e8f0' : '#94a3b8');
            ctx.lineWidth = thicknessPx;
            ctx.lineCap = 'square';
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();

            // Nét tim tường mảnh
            if (thicknessPx >= 6) {
                ctx.strokeStyle = isWhite ? '#64748b' : '#475569';
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(x1, y1);
                ctx.lineTo(x2, y2);
                ctx.stroke();
            }
        });
        ctx.restore();
    }

    drawDoors(ctx, doors, scale, ox, oy, isWhite) {
        ctx.save();
        doors.forEach(d => {
            const dx = ox + d.x * scale;
            const dy = oy + d.y * scale;
            const dw = d.w * scale;
            const doorColor = isWhite ? '#0284c7' : '#38bdf8';

            ctx.strokeStyle = doorColor;
            ctx.lineWidth = 1.4;

            if (d.swing === 'double' || d.type === 'main_door') {
                // Cửa 2 cánh / 4 cánh: 2 cung quét mở 90°
                const halfW = dw / 2;
                ctx.setLineDash([]);
                ctx.beginPath();
                ctx.moveTo(dx, dy);
                ctx.lineTo(dx, dy + halfW);
                ctx.moveTo(dx + dw, dy);
                ctx.lineTo(dx + dw, dy + halfW);
                ctx.stroke();

                ctx.setLineDash([3, 2]);
                ctx.beginPath();
                ctx.arc(dx, dy, halfW, 0, Math.PI / 2, false);
                ctx.arc(dx + dw, dy, halfW, Math.PI, Math.PI / 2, true);
                ctx.stroke();
            } else {
                // Cửa 1 cánh: cung quét 90°
                ctx.setLineDash([]);
                ctx.beginPath();
                ctx.moveTo(dx, dy);
                ctx.lineTo(dx, dy + dw);
                ctx.stroke();

                ctx.setLineDash([3, 2]);
                ctx.beginPath();
                ctx.arc(dx, dy, dw, 0, Math.PI / 2, false);
                ctx.stroke();
            }
        });
        ctx.restore();
    }

    drawWindows(ctx, windows, scale, ox, oy, isWhite) {
        ctx.save();
        windows.forEach(w => {
            const wx = ox + w.x * scale;
            const wy = oy + w.y * scale;
            const ww = w.w * scale;

            ctx.fillStyle = isWhite ? '#e0f2fe' : '#0369a1';
            ctx.fillRect(wx, wy - 2, ww, 4);

            ctx.strokeStyle = isWhite ? '#0284c7' : '#38bdf8';
            ctx.lineWidth = 1.2;
            ctx.strokeRect(wx, wy - 2, ww, 4);
        });
        ctx.restore();
    }

    drawFurnitureVector(ctx, furnitureList, scale, ox, oy, isWhite) {
        ctx.save();
        const strokeColor = isWhite ? '#334155' : '#cbd5e1';
        const fillColor = isWhite ? 'rgba(241, 245, 249, 0.9)' : 'rgba(30, 41, 59, 0.8)';
        ctx.lineWidth = 1;

        furnitureList.forEach(f => {
            const fx = ox + f.x * scale;
            const fy = oy + f.y * scale;
            const fw = f.w * scale;
            const fh = f.h * scale;

            ctx.save();
            ctx.fillStyle = fillColor;
            ctx.strokeStyle = strokeColor;

            switch (f.type) {
                case 'sofa_living':
                case 'sofa':
                    // Sofa L-shape + Bàn trà
                    ctx.fillRect(fx, fy, fw, fh);
                    ctx.strokeRect(fx, fy, fw, fh);
                    // Đệm ngồi & tựa lưng
                    ctx.strokeRect(fx, fy, fw, fh * 0.3);
                    ctx.strokeRect(fx + fw * 0.2, fy + fh * 0.45, fw * 0.6, fh * 0.45);
                    break;

                case 'dining_set':
                case 'dining_table':
                    // Bàn ăn 6 ghế
                    ctx.fillRect(fx, fy, fw, fh);
                    ctx.strokeRect(fx, fy, fw, fh);
                    // Ghế 2 bên
                    const chairW = fw / 3.5;
                    for (let i = 0; i < 3; i++) {
                        ctx.strokeRect(fx + i * chairW * 1.1 + 2, fy - 6, chairW - 4, 6);
                        ctx.strokeRect(fx + i * chairW * 1.1 + 2, fy + fh, chairW - 4, 6);
                    }
                    break;

                case 'kitchen_set':
                case 'kitchen_counter':
                    // Tủ bếp L + Bếp nấu + Bồn rửa
                    ctx.fillRect(fx, fy, fw, fh);
                    ctx.strokeRect(fx, fy, fw, fh);
                    // 2 hố bếp gas (chấm đỏ)
                    ctx.fillStyle = '#ef4444';
                    ctx.beginPath();
                    ctx.arc(fx + fw * 0.3, fy + fh / 2, 4, 0, Math.PI * 2);
                    ctx.arc(fx + fw * 0.45, fy + fh / 2, 4, 0, Math.PI * 2);
                    ctx.fill();
                    // Bồn rửa (xanh dương)
                    ctx.strokeStyle = '#0284c7';
                    ctx.strokeRect(fx + fw * 0.7, fy + 3, fw * 0.25, fh - 6);
                    break;

                case 'bed_master':
                    // Giường King Size 2 gối + Nếp chăn
                    ctx.fillRect(fx, fy, fw, fh);
                    ctx.strokeRect(fx, fy, fw, fh);
                    // 2 gối đầu giường
                    ctx.strokeRect(fx + fw * 0.1, fy + 4, fw * 0.35, fh * 0.22);
                    ctx.strokeRect(fx + fw * 0.55, fy + 4, fw * 0.35, fh * 0.22);
                    // Nếp chăn
                    ctx.beginPath();
                    ctx.moveTo(fx, fy + fh * 0.45);
                    ctx.lineTo(fx + fw, fy + fh * 0.45);
                    ctx.stroke();
                    break;

                case 'bed_single':
                    // Giường đơn 1 gối
                    ctx.fillRect(fx, fy, fw, fh);
                    ctx.strokeRect(fx, fy, fw, fh);
                    ctx.strokeRect(fx + fw * 0.2, fy + 4, fw * 0.6, fh * 0.25);
                    ctx.beginPath();
                    ctx.moveTo(fx, fy + fh * 0.45);
                    ctx.lineTo(fx + fw, fy + fh * 0.45);
                    ctx.stroke();
                    break;

                case 'toilet_set':
                    // Vách tắm kính + Bồn cầu + Lavabo
                    ctx.fillRect(fx, fy, fw, fh);
                    ctx.strokeRect(fx, fy, fw, fh);
                    // Bồn cầu elip
                    ctx.beginPath();
                    ctx.arc(fx + fw * 0.7, fy + fh * 0.5, Math.min(fw, fh) * 0.25, 0, Math.PI * 2);
                    ctx.stroke();
                    // Lavabo
                    ctx.strokeRect(fx + 3, fy + 3, fw * 0.35, fh * 0.35);
                    break;

                case 'altar_set':
                case 'altar_table':
                    // Bàn thờ gia tiên viền vàng trang nghiêm
                    ctx.fillStyle = isWhite ? '#fef3c7' : '#451a03';
                    ctx.fillRect(fx, fy, fw, fh);
                    ctx.strokeStyle = '#d97706';
                    ctx.lineWidth = 1.5;
                    ctx.strokeRect(fx, fy, fw, fh);
                    // Bát nhang trung tâm
                    ctx.fillStyle = '#b45309';
                    ctx.beginPath();
                    ctx.arc(fx + fw / 2, fy + fh / 2, 5, 0, Math.PI * 2);
                    ctx.fill();
                    break;

                case 'stairs_flight':
                case 'stairs':
                    // Cầu thang 21 bậc ziczac có số bậc và mũi tên
                    ctx.fillRect(fx, fy, fw, fh);
                    ctx.strokeRect(fx, fy, fw, fh);
                    const stepCount = 14;
                    const stH = fh / stepCount;
                    ctx.beginPath();
                    for (let i = 1; i < stepCount; i++) {
                        ctx.moveTo(fx, fy + i * stH);
                        ctx.lineTo(fx + fw, fy + i * stH);
                    }
                    ctx.stroke();
                    // Mũi tên chỉ hướng đi lên
                    ctx.strokeStyle = '#0284c7';
                    ctx.lineWidth = 1.5;
                    ctx.beginPath();
                    ctx.arc(fx + fw / 2, fy + fh - 8, 3, 0, Math.PI * 2);
                    ctx.moveTo(fx + fw / 2, fy + fh - 8);
                    ctx.lineTo(fx + fw / 2, fy + 8);
                    ctx.lineTo(fx + fw / 2 - 4, fy + 14);
                    ctx.moveTo(fx + fw / 2, fy + 8);
                    ctx.lineTo(fx + fw / 2 + 4, fy + 14);
                    ctx.stroke();
                    break;

                case 'garage_car':
                    // Silhouette xe ô tô
                    ctx.strokeRect(fx, fy, fw, fh);
                    ctx.strokeRect(fx + fw * 0.15, fy + fh * 0.2, fw * 0.7, fh * 0.6);
                    break;

                case 'desk_study':
                    // Bàn làm việc L
                    ctx.fillRect(fx, fy, fw, fh);
                    ctx.strokeRect(fx, fy, fw, fh);
                    break;

                case 'laundry_set':
                    // Máy giặt tròn
                    ctx.fillRect(fx, fy, fw, fh);
                    ctx.strokeRect(fx, fy, fw, fh);
                    ctx.beginPath();
                    ctx.arc(fx + fw / 2, fy + fh / 2, Math.min(fw, fh) * 0.35, 0, Math.PI * 2);
                    ctx.stroke();
                    break;

                case 'skylight_vent':
                    // Giếng trời dấu X nét đứt
                    ctx.setLineDash([4, 3]);
                    ctx.strokeRect(fx, fy, fw, fh);
                    ctx.beginPath();
                    ctx.moveTo(fx, fy);
                    ctx.lineTo(fx + fw, fy + fh);
                    ctx.moveTo(fx + fw, fy);
                    ctx.lineTo(fx, fy + fh);
                    ctx.stroke();
                    break;
            }
            ctx.restore();
        });
        ctx.restore();
    }

    drawNinePalacesOverlay(ctx, ox, oy, w, h, flyingStars, W, L, isWhite) {
        ctx.save();
        const cellW = w / 3;
        const cellH = h / 3;

        const palaceMatrix = [
            [ { id: 4, name: 'ĐÔNG NAM', sub: 'TỐN' }, { id: 9, name: 'NAM', sub: 'LY' },          { id: 2, name: 'TÂY NAM', sub: 'KHÔN' } ],
            [ { id: 3, name: 'ĐÔNG', sub: 'CHẤN' },    { id: 5, name: 'TRUNG CUNG', sub: 'TRUNG' }, { id: 7, name: 'TÂY', sub: 'ĐOÀI' } ],
            [ { id: 8, name: 'ĐÔNG BẮC', sub: 'CẤN' }, { id: 1, name: 'BẮC', sub: 'KHẢM' },        { id: 6, name: 'TÂY BẮC', sub: 'CÀN' } ]
        ];

        ctx.strokeStyle = isWhite ? 'rgba(2, 132, 199, 0.4)' : 'rgba(56, 189, 248, 0.35)';
        ctx.lineWidth = 1.2;
        ctx.setLineDash([5, 4]);

        for (let r = 0; r < 3; r++) {
            for (let c = 0; c < 3; c++) {
                const cx = ox + c * cellW;
                const cy = oy + r * cellH;
                const pal = palaceMatrix[r][c];

                ctx.strokeRect(cx, cy, cellW, cellH);

                // Lấy thông tin sao Huyền Không
                let starText = '';
                if (flyingStars && flyingStars.palaces && flyingStars.palaces[pal.id]) {
                    const pData = flyingStars.palaces[pal.id];
                    const s = pData.sonStar || pData.mountainStar || 9;
                    const hStar = pData.huongStar || pData.facingStar || 9;
                    const v = pData.vanStar || pData.periodStar || 9;
                    starText = `${s}  ${hStar}  (V:${v})`;
                }

                // Tên Cung góc trên
                ctx.save();
                ctx.fillStyle = isWhite ? 'rgba(2, 132, 199, 0.85)' : 'rgba(56, 189, 248, 0.85)';
                ctx.font = 'bold 9px Inter, sans-serif';
                ctx.textAlign = 'left';
                ctx.fillText(`${pal.name} (${pal.sub})`, cx + 6, cy + 12);

                if (starText) {
                    ctx.fillStyle = isWhite ? '#b45309' : '#fbbf24';
                    ctx.font = 'bold 10px Inter, sans-serif';
                    ctx.textAlign = 'right';
                    ctx.fillText(starText, cx + cellW - 6, cy + 12);
                }
                ctx.restore();
            }
        }
        ctx.restore();
    }

    drawDimensionChains(ctx, floorData, ox, oy, pw, ph, W, L, scale, isWhite) {
        ctx.save();
        const dimColor = isWhite ? '#475569' : '#94a3b8';
        const textColor = isWhite ? '#0f172a' : '#f8fafc';

        ctx.strokeStyle = dimColor;
        ctx.fillStyle = textColor;
        ctx.lineWidth = 1;
        ctx.font = 'bold 10px Inter, sans-serif';

        // Dim tổng thể chiều ngang W (mm)
        const dimY = oy - 25;
        const wMm = Math.round(W * 1000);
        ctx.beginPath();
        ctx.moveTo(ox, dimY);
        ctx.lineTo(ox + pw, dimY);
        ctx.moveTo(ox, oy - 35);
        ctx.lineTo(ox, oy);
        ctx.moveTo(ox + pw, oy - 35);
        ctx.lineTo(ox + pw, oy);
        ctx.stroke();

        this.drawDimSlash(ctx, ox, dimY);
        this.drawDimSlash(ctx, ox + pw, dimY);
        ctx.textAlign = 'center';
        ctx.fillText(`${wMm}`, ox + pw / 2, dimY - 4);

        // Dim tổng thể chiều dài L (mm)
        const dimX = ox - 25;
        const lMm = Math.round(L * 1000);
        ctx.beginPath();
        ctx.moveTo(dimX, oy);
        ctx.lineTo(dimX, oy + ph);
        ctx.moveTo(ox - 35, oy);
        ctx.lineTo(ox, oy);
        ctx.moveTo(ox - 35, oy + ph);
        ctx.lineTo(ox, oy + ph);
        ctx.stroke();

        this.drawDimSlash(ctx, dimX, oy);
        this.drawDimSlash(ctx, dimX, oy + ph);

        ctx.save();
        ctx.translate(dimX - 6, oy + ph / 2);
        ctx.rotate(-Math.PI / 2);
        ctx.textAlign = 'center';
        ctx.fillText(`${lMm}`, 0, 0);
        ctx.restore();

        ctx.restore();
    }

    drawDimSlash(ctx, x, y) {
        ctx.save();
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.moveTo(x - 4, y + 4);
        ctx.lineTo(x + 4, y - 4);
        ctx.stroke();
        ctx.restore();
    }

    drawCompassRose(ctx, cx, cy, radius, facingDegree, isWhite) {
        ctx.save();
        ctx.translate(cx, cy);

        // Đĩa la bàn hoa tiêu 24 sơn thanh lịch
        ctx.fillStyle = isWhite ? 'rgba(255, 255, 255, 0.85)' : 'rgba(15, 23, 42, 0.85)';
        ctx.strokeStyle = isWhite ? '#cbd5e1' : '#334155';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(0, 0, radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // 8 cánh hoa tiêu định hướng
        const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
        for (let i = 0; i < 8; i++) {
            const angle = (i * 45 - 90) * (Math.PI / 180);
            const rTip = radius - 4;
            const rBase = radius * 0.25;

            ctx.fillStyle = i === 0 ? '#ef4444' : (isWhite ? '#64748b' : '#94a3b8');
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(Math.cos(angle - 0.2) * rBase, Math.sin(angle - 0.2) * rBase);
            ctx.lineTo(Math.cos(angle) * rTip, Math.sin(angle) * rTip);
            ctx.closePath();
            ctx.fill();

            // Chữ hướng
            ctx.fillStyle = i === 0 ? '#ef4444' : (isWhite ? '#0f172a' : '#f8fafc');
            ctx.font = 'bold 9px Inter, sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(directions[i], Math.cos(angle) * (radius + 8), Math.sin(angle) * (radius + 8));
        }

        ctx.restore();
    }

    drawArchitecturalTitleBlock(ctx, viewW, viewH, floorData, options, isWhite) {
        ctx.save();
        const boxW = 280;
        const boxH = 68;
        const boxX = 20;
        const boxY = viewH - boxH - 20;

        ctx.fillStyle = isWhite ? 'rgba(255, 255, 255, 0.95)' : 'rgba(15, 23, 42, 0.95)';
        ctx.strokeStyle = isWhite ? '#0284c7' : '#d97706';
        ctx.lineWidth = 1.2;
        ctx.fillRect(boxX, boxY, boxW, boxH);
        ctx.strokeRect(boxX, boxY, boxW, boxH);

        ctx.fillStyle = isWhite ? '#0f172a' : '#fef08a';
        ctx.font = 'bold 11px Inter, sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText(floorData.floorName ? floorData.floorName.toUpperCase() : 'MẶT BẰNG PHONG THỦY', boxX + 10, boxY + 16);

        ctx.fillStyle = isWhite ? '#475569' : '#cbd5e1';
        ctx.font = '10px Inter, sans-serif';
        ctx.fillText(`Kích thước: ${floorData.widthM}m x ${floorData.lengthM}m`, boxX + 10, boxY + 32);
        ctx.fillText(`Tư vấn: Dịch Sư Nguyễn Huy Hoàng — 0933 116 860`, boxX + 10, boxY + 46);

        ctx.fillStyle = isWhite ? '#0284c7' : '#38bdf8';
        ctx.font = '9px Inter, sans-serif';
        ctx.fillText(`Huyền Không Phi Tinh Vận 9 • Bát Trạch`, boxX + 10, boxY + 58);

        ctx.restore();
    }
}

