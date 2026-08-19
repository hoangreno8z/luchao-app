// ============================================================
// Architectural CAD Floorplan & 9-Palace Flying Star Renderer
// Theo Quy Chuẩn Bản Vẽ Kiến Trúc Phong Thủy Thực Tế (mauphongthuy.jpg)
// Tác giả: Dịch Sư Nguyễn Huy Hoàng
// ============================================================

export class CADFloorplanRenderer {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.showDimensions = true;
        this.showFurniture = true;
        this.showGrid = true;
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

        // Kích thước logic của viewport
        const viewW = this.canvas.width / dpr;
        const viewH = this.canvas.height / dpr;

        // Reset transform & clear
        ctx.save();
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.clearRect(0, 0, viewW, viewH);

        // --- 1. THUẬT TOÁN FIT-TO-SCREEN (BOUNDING BOX 85% - 90%) ---
        const marginX = 70;
        const marginY = 65;
        const availW = viewW - marginX * 2;
        const availH = viewH - marginY * 2;

        const scale = Math.min(availW / W, availH / L);
        this.scale = scale;

        // Đồng bộ trọng tâm ngôi nhà chính xác vào tâm Canvas
        const housePixelW = W * scale;
        const housePixelH = L * scale;
        const startX = (viewW - housePixelW) / 2;
        const startY = (viewH - housePixelH) / 2;

        this.originX = startX;
        this.originY = startY;

        // --- 2. VẼ NỀN SÀN GẠCH KIẾN TRÚC ---
        this.drawTiledFloor(ctx, startX, startY, housePixelW, housePixelH, scale);

        // --- 3. VẼ PHÂN VÙNG PHÒNG VÀ TÔ MÀU NHẸ ---
        this.drawRoomSpaces(ctx, floorData.rooms || [], scale, startX, startY);

        // --- 4. VẼ LƯỚI CỬU CUNG LẠC THƯ 9 Ô PHỦ KÍN MẶT BẰNG (THEO MẪU MAUPHONGTHUY.JPG) ---
        if (this.showPalaceOverlay) {
            this.drawNinePalacesOverlay(ctx, startX, startY, housePixelW, housePixelH, flyingStars, W, L);
        }

        // --- 5. VẼ TƯỜNG CẮT KIẾN TRÚC DÀY 220MM / 110MM ---
        this.drawArchitecturalWalls(ctx, floorData.walls || [], scale, startX, startY);

        // --- 6. VẼ CỬA ĐI (NÉT QUÉT 90°) & CỬA SỔ ---
        this.drawDoors(ctx, floorData.doors || [], scale, startX, startY);
        this.drawWindows(ctx, floorData.windows || [], scale, startX, startY);

        // --- 7. VẼ NỘI THẤT VECTOR CHI TIẾT ---
        if (this.showFurniture) {
            this.drawFurnitureVector(ctx, floorData.furniture || [], scale, startX, startY);
        }

        // --- 8. VẼ ĐƯỜNG KÍCH THƯỚC VÀ THƯỚC LỖ BAN ---
        if (this.showDimensions) {
            this.drawDimensionLines(ctx, startX, startY, housePixelW, housePixelH, W, L, floorData.dimensions || []);
        }

        // --- 9. VẼ KHUNG TÊN BẢN VẼ KIẾN TRÚC CHUYÊN NGHIỆP ---
        this.drawArchitecturalTitleBlock(ctx, viewW, viewH, floorData, options);

        // --- 10. VẼ LA BÀN / LA KINH HƯỚNG BẮC ĐỒNG BỘ ---
        if (this.showCompass) {
            this.drawNorthCompass(ctx, viewW - 55, 55, facingDegree);
        }

        ctx.restore();
    }

    drawTiledFloor(ctx, x, y, w, h, scale) {
        ctx.save();
        // Nền mặt bằng nhà
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(x, y, w, h);

        // Kẻ ô gạch nền kiến trúc (mỗi viên gạch 0.6m)
        const tileStep = 0.6 * scale;
        if (tileStep >= 10) {
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.035)';
            ctx.lineWidth = 1;
            ctx.beginPath();
            for (let gx = x; gx <= x + w; gx += tileStep) {
                ctx.moveTo(gx, y);
                ctx.lineTo(gx, y + h);
            }
            for (let gy = y; gy <= y + h; gy += tileStep) {
                ctx.moveTo(x, gy);
                ctx.lineTo(x + w, gy);
            }
            ctx.stroke();
        }
        ctx.restore();
    }

    drawRoomSpaces(ctx, rooms, scale, ox, oy) {
        ctx.save();
        rooms.forEach((r, idx) => {
            const rx = ox + r.x * scale;
            const ry = oy + r.y * scale;
            const rw = r.w * scale;
            const rh = r.h * scale;

            // Màu phủ phòng nhẹ
            ctx.fillStyle = (idx % 2 === 0) ? 'rgba(30, 41, 59, 0.35)' : 'rgba(15, 23, 42, 0.45)';
            ctx.fillRect(rx, ry, rw, rh);

            // Tên phòng
            ctx.fillStyle = '#f1f5f9';
            ctx.font = 'bold 11px Inter, sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText(r.name, rx + rw / 2, ry + rh / 2 - 4);

            if (r.areaM2) {
                ctx.fillStyle = '#f59e0b';
                ctx.font = '10px Inter, sans-serif';
                ctx.fillText(`S ≈ ${r.areaM2} m²`, rx + rw / 2, ry + rh / 2 + 10);
            }
        });
        ctx.restore();
    }

    drawNinePalacesOverlay(ctx, ox, oy, w, h, flyingStars, W, L) {
        ctx.save();
        const cellW = w / 3;
        const cellH = h / 3;

        // Vị trí 9 Cung trên lưới 3x3 (Hàng 1: Đông Nam, Nam, Tây Nam / Hàng 2: Đông, Trung Cung, Tây / Hàng 3: Đông Bắc, Bắc, Tây Bắc)
        // Ánh xạ theo phương vị chuẩn Lạc Thư:
        // [0,0] = Tốn (4)     [1,0] = Ly (9)       [2,0] = Khôn (2)
        // [0,1] = Chấn (3)    [1,1] = Trung (5)    [2,1] = Đoài (7)
        // [0,2] = Cấn (8)     [1,2] = Khảm (1)     [2,2] = Càn (6)
        const palaceMatrix = [
            [ { id: 4, name: 'ĐÔNG NAM (TỐN)', en: 'SOUTHEAST' }, { id: 9, name: 'NAM (LY)', en: 'SOUTH' },          { id: 2, name: 'TÂY NAM (KHÔN)', en: 'SOUTHWEST' } ],
            [ { id: 3, name: 'ĐÔNG (CHẤN)', en: 'EAST' },          { id: 5, name: 'TRUNG CUNG', en: 'CENTER' },         { id: 7, name: 'TÂY (ĐOÀI)', en: 'WEST' } ],
            [ { id: 8, name: 'ĐÔNG BẮC (CẤN)', en: 'NORTHEAST' }, { id: 1, name: 'BẮC (KHẢM)', en: 'NORTH' },         { id: 6, name: 'TÂY BẮC (CÀN)', en: 'NORTHWEST' } ]
        ];

        // Vẽ lưới viền Cửu Cung màu xanh lam kỹ thuật (như mẫu mauphongthuy.jpg)
        ctx.strokeStyle = '#0284c7';
        ctx.lineWidth = 1.5;
        ctx.setLineDash([4, 3]);

        for (let col = 1; col <= 2; col++) {
            ctx.beginPath();
            ctx.moveTo(ox + col * cellW, oy);
            ctx.lineTo(ox + col * cellW, oy + h);
            ctx.stroke();
        }
        for (let row = 1; row <= 2; row++) {
            ctx.beginPath();
            ctx.moveTo(ox, oy + row * cellH);
            ctx.lineTo(ox + w, oy + row * cellH);
            ctx.stroke();
        }
        ctx.setLineDash([]);

        // Vẽ nhãn phương hướng và số sao Tinh Bàn trên từng Cung
        for (let r = 0; r < 3; r++) {
            for (let c = 0; c < 3; c++) {
                const pInfo = palaceMatrix[r][c];
                const cx = ox + c * cellW;
                const cy = oy + r * cellH;

                // Tên cung & Phương vị (Góc trên bên trái mỗi ô)
                ctx.fillStyle = 'rgba(56, 189, 248, 0.85)';
                ctx.font = 'bold 9px Inter, sans-serif';
                ctx.textAlign = 'left';
                ctx.fillText(pInfo.name, cx + 6, cy + 13);

                // Số sao Huyền Không nếu có
                if (flyingStars && flyingStars.palaces && flyingStars.palaces[pInfo.id]) {
                    const pal = flyingStars.palaces[pInfo.id];
                    // Sao Tọa (Xanh lam) & Sao Hướng (Vàng hổ phách) & Sao Vận
                    ctx.textAlign = 'right';
                    ctx.font = 'bold 11px Inter, sans-serif';
                    ctx.fillStyle = '#38bdf8';
                    ctx.fillText(`${pal.sonStar}`, cx + cellW - 20, cy + 14);

                    ctx.fillStyle = '#f59e0b';
                    ctx.fillText(`${pal.huongStar}`, cx + cellW - 6, cy + 14);

                    ctx.font = '9px Inter, sans-serif';
                    ctx.fillStyle = '#cbd5e1';
                    ctx.fillText(`V:${pal.vanStar}`, cx + cellW - 6, cy + 26);
                }
            }
        }

        ctx.restore();
    }

    drawArchitecturalWalls(ctx, walls, scale, ox, oy) {
        ctx.save();
        walls.forEach(w => {
            const x1 = ox + w.x1 * scale;
            const y1 = oy + w.y1 * scale;
            const x2 = ox + w.x2 * scale;
            const y2 = oy + w.y2 * scale;

            const thicknessPx = Math.max(3, (w.thickness || 0.22) * scale);

            // Nét cắt tường chuẩn CAD: Thân tường đậm, viền sắc nét
            ctx.strokeStyle = w.type === 'outer' ? '#e2e8f0' : '#94a3b8';
            ctx.lineWidth = thicknessPx;
            ctx.lineCap = 'square';
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();

            // Lớp lõi ruột tường kỹ thuật
            ctx.strokeStyle = w.type === 'outer' ? '#334155' : '#1e293b';
            ctx.lineWidth = Math.max(1, thicknessPx - 2);
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();
        });
        ctx.restore();
    }

    drawDoors(ctx, doors, scale, ox, oy) {
        ctx.save();
        doors.forEach(d => {
            const dx = ox + d.x * scale;
            const dy = oy + d.y * scale;
            const dw = d.w * scale;

            ctx.strokeStyle = '#38bdf8';
            ctx.lineWidth = 1.5;

            if (d.type === 'main_door') {
                // Cửa chính 4 cánh hoặc 2 cánh mở quay
                ctx.beginPath();
                ctx.moveTo(dx, dy);
                ctx.lineTo(dx + dw, dy);
                ctx.stroke();

                // Cung quét mở cửa 90 độ
                ctx.beginPath();
                ctx.arc(dx, dy, dw / 2, 0, Math.PI / 2, false);
                ctx.arc(dx + dw, dy, dw / 2, Math.PI, Math.PI / 2, true);
                ctx.strokeStyle = 'rgba(56, 189, 248, 0.5)';
                ctx.setLineDash([2, 2]);
                ctx.stroke();
                ctx.setLineDash([]);
            } else {
                // Cửa phòng 1 cánh chuẩn kiến trúc
                ctx.beginPath();
                ctx.moveTo(dx, dy);
                ctx.lineTo(dx + dw, dy);
                ctx.stroke();

                ctx.beginPath();
                ctx.arc(dx, dy, dw, 0, Math.PI / 2, false);
                ctx.strokeStyle = 'rgba(56, 189, 248, 0.45)';
                ctx.setLineDash([2, 2]);
                ctx.stroke();
                ctx.setLineDash([]);
            }
        });
        ctx.restore();
    }

    drawWindows(ctx, windows, scale, ox, oy) {
        ctx.save();
        windows.forEach(w => {
            const wx = ox + w.x * scale;
            const wy = oy + w.y * scale;
            const ww = w.w * scale;

            // Ký hiệu cửa sổ kính 2 lớp
            ctx.fillStyle = '#0284c7';
            ctx.fillRect(wx, wy - 3, ww, 6);

            ctx.strokeStyle = '#f8fafc';
            ctx.lineWidth = 1;
            ctx.strokeRect(wx, wy - 3, ww, 6);
        });
        ctx.restore();
    }

    drawFurnitureVector(ctx, furniture, scale, ox, oy) {
        ctx.save();
        furniture.forEach(f => {
            const fx = ox + f.x * scale;
            const fy = oy + f.y * scale;
            const fw = f.w * scale;
            const fh = f.h * scale;

            ctx.save();
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.65)';
            ctx.fillStyle = 'rgba(30, 41, 59, 0.85)';
            ctx.lineWidth = 1.2;

            switch (f.type) {
                case 'sofa':
                    ctx.fillRect(fx, fy, fw, fh);
                    ctx.strokeRect(fx, fy, fw, fh);
                    // Đệm tựa sofa
                    ctx.strokeRect(fx + 3, fy + 3, fw - 6, fh - 8);
                    break;

                case 'bed_master':
                case 'bed_single':
                    ctx.fillStyle = '#1e293b';
                    ctx.fillRect(fx, fy, fw, fh);
                    ctx.strokeRect(fx, fy, fw, fh);
                    // Gối đầu giường
                    ctx.fillStyle = '#e2e8f0';
                    ctx.fillRect(fx + 4, fy + 4, (fw - 12) / 2, fh * 0.22);
                    if (f.type === 'bed_master') {
                        ctx.fillRect(fx + fw / 2 + 2, fy + 4, (fw - 12) / 2, fh * 0.22);
                    }
                    // Mép chăn
                    ctx.strokeStyle = '#f59e0b';
                    ctx.beginPath();
                    ctx.moveTo(fx, fy + fh * 0.42);
                    ctx.lineTo(fx + fw, fy + fh * 0.42);
                    ctx.stroke();
                    break;

                case 'dining_table':
                    ctx.fillRect(fx, fy, fw, fh);
                    ctx.strokeRect(fx, fy, fw, fh);
                    // Ký hiệu 6 ghế ăn
                    ctx.fillStyle = '#64748b';
                    ctx.fillRect(fx + 4, fy - 5, fw * 0.38, 4);
                    ctx.fillRect(fx + fw * 0.55, fy - 5, fw * 0.38, 4);
                    ctx.fillRect(fx + 4, fy + fh + 1, fw * 0.38, 4);
                    ctx.fillRect(fx + fw * 0.55, fy + fh + 1, fw * 0.38, 4);
                    break;

                case 'kitchen_counter':
                    ctx.fillRect(fx, fy, fw, fh);
                    ctx.strokeRect(fx, fy, fw, fh);
                    // Bếp nấu 2 lò
                    ctx.fillStyle = '#ef4444';
                    ctx.beginPath();
                    ctx.arc(fx + fw * 0.25, fy + fh / 2, Math.min(8, fh * 0.3), 0, Math.PI * 2);
                    ctx.arc(fx + fw * 0.45, fy + fh / 2, Math.min(8, fh * 0.3), 0, Math.PI * 2);
                    ctx.fill();
                    // Bồn rửa đôi
                    ctx.fillStyle = '#0ea5e9';
                    ctx.fillRect(fx + fw * 0.7, fy + 4, fw * 0.22, fh - 8);
                    break;

                case 'altar_table':
                    ctx.fillStyle = '#7c2d12';
                    ctx.fillRect(fx, fy, fw, fh);
                    ctx.strokeStyle = '#fbbf24';
                    ctx.lineWidth = 1.8;
                    ctx.strokeRect(fx, fy, fw, fh);
                    // Bát nhang & Đèn thờ
                    ctx.fillStyle = '#f59e0b';
                    ctx.beginPath();
                    ctx.arc(fx + fw / 2, fy + fh / 2, Math.min(6, fh * 0.3), 0, Math.PI * 2);
                    ctx.fill();
                    break;

                case 'stairs':
                    ctx.fillRect(fx, fy, fw, fh);
                    ctx.strokeRect(fx, fy, fw, fh);
                    const steps = 14;
                    const stepH = fh / steps;
                    ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
                    for (let s = 1; s < steps; s++) {
                        ctx.beginPath();
                        ctx.moveTo(fx, fy + s * stepH);
                        ctx.lineTo(fx + fw, fy + s * stepH);
                        ctx.stroke();
                    }
                    // Mũi tên hướng lên
                    ctx.strokeStyle = '#38bdf8';
                    ctx.lineWidth = 1.5;
                    ctx.beginPath();
                    ctx.moveTo(fx + fw / 2, fy + fh - 6);
                    ctx.lineTo(fx + fw / 2, fy + 8);
                    ctx.lineTo(fx + fw / 2 - 4, fy + 14);
                    ctx.moveTo(fx + fw / 2, fy + 8);
                    ctx.lineTo(fx + fw / 2 + 4, fy + 14);
                    ctx.stroke();
                    break;

                case 'toilet_bowl':
                    ctx.fillStyle = '#e2e8f0';
                    ctx.fillRect(fx, fy, fw, fh * 0.35);
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
        ctx.restore();
    }

    drawDimensionLines(ctx, ox, oy, pw, ph, W, L, dimensions) {
        ctx.save();
        ctx.strokeStyle = '#94a3b8';
        ctx.fillStyle = '#94a3b8';
        ctx.font = '10px Inter, sans-serif';
        ctx.lineWidth = 1;

        // Kích thước Ngang (Trên)
        const topY = oy - 18;
        ctx.beginPath();
        ctx.moveTo(ox, topY);
        ctx.lineTo(ox + pw, topY);
        ctx.moveTo(ox, topY - 4);
        ctx.lineTo(ox, topY + 4);
        ctx.moveTo(ox + pw, topY - 4);
        ctx.lineTo(ox + pw, topY + 4);
        ctx.stroke();

        ctx.textAlign = 'center';
        ctx.fillText(`Ngang: ${W}m`, ox + pw / 2, topY - 4);

        // Kích thước Dài (Phải)
        const rightX = ox + pw + 18;
        ctx.beginPath();
        ctx.moveTo(rightX, oy);
        ctx.lineTo(rightX, oy + ph);
        ctx.moveTo(rightX - 4, oy);
        ctx.lineTo(rightX + 4, oy);
        ctx.moveTo(rightX - 4, oy + ph);
        ctx.lineTo(rightX + 4, oy + ph);
        ctx.stroke();

        ctx.save();
        ctx.translate(rightX + 12, oy + ph / 2);
        ctx.rotate(Math.PI / 2);
        ctx.textAlign = 'center';
        ctx.fillText(`Dài: ${L}m`, 0, 0);
        ctx.restore();

        ctx.restore();
    }

    drawArchitecturalTitleBlock(ctx, viewW, viewH, floorData, options) {
        ctx.save();
        const boxW = 250;
        const boxH = 65;
        const boxX = 12;
        const boxY = viewH - boxH - 12;

        ctx.fillStyle = 'rgba(15, 23, 42, 0.92)';
        ctx.fillRect(boxX, boxY, boxW, boxH);
        ctx.strokeStyle = 'rgba(245, 158, 11, 0.5)';
        ctx.lineWidth = 1;
        ctx.strokeRect(boxX, boxY, boxW, boxH);

        ctx.fillStyle = '#fbbf24';
        ctx.font = 'bold 11px Inter, sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText(floorData.floorName ? floorData.floorName.toUpperCase() : 'MẶT BẰNG PHONG THỦY', boxX + 10, boxY + 16);

        ctx.fillStyle = '#e2e8f0';
        ctx.font = '10px Inter, sans-serif';
        ctx.fillText(`Kích thước: ${floorData.widthM}m x ${floorData.lengthM}m`, boxX + 10, boxY + 32);
        ctx.fillText(`Tư vấn: Dịch Sư Nguyễn Huy Hoàng`, boxX + 10, boxY + 46);

        ctx.fillStyle = '#94a3b8';
        ctx.font = '9px Inter, sans-serif';
        ctx.fillText(`Huyền Không Phi Tinh Vận 9 • Bát Trạch`, boxX + 10, boxY + 58);

        ctx.restore();
    }

    drawNorthCompass(ctx, cx, cy, facingDegree) {
        ctx.save();
        ctx.translate(cx, cy);

        const radius = 22;

        // Vòng tròn la bàn
        ctx.strokeStyle = 'rgba(245, 158, 11, 0.7)';
        ctx.fillStyle = 'rgba(15, 23, 42, 0.88)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(0, 0, radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // Kim chỉ Bắc
        ctx.fillStyle = '#ef4444';
        ctx.beginPath();
        ctx.moveTo(0, -radius + 4);
        ctx.lineTo(5, 3);
        ctx.lineTo(0, 0);
        ctx.fill();

        ctx.fillStyle = '#e2e8f0';
        ctx.beginPath();
        ctx.moveTo(0, radius - 4);
        ctx.lineTo(-5, -3);
        ctx.lineTo(0, 0);
        ctx.fill();

        ctx.fillStyle = '#fbbf24';
        ctx.font = 'bold 10px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('N', 0, -radius - 3);

        ctx.restore();
    }
}
