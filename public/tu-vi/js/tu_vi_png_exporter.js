/**
 * TU VI HD PNG EXPORTER - HIGH-RESOLUTION CANVAS RENDERER
 * Matches traditional Vietnamese Tu Vi chart layout (2400x3200 px)
 * Developed for Dich Su Nguyen Huy Hoang
 */

import { ELEMENT_COLORS, CAN_ELEMENTS } from './tu_vi_engine.js';

export class TuViPngExporter {

    static async exportToPng(horoscopeData, fileName = 'La_So_Tu_Vi.png') {
        const width = 2400;
        const height = 3200;
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');

        // Background
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, width, height);

        const margin = 80;
        const gridW = width - margin * 2;
        const gridH = height - margin * 2;
        const cellW = gridW / 4;
        const cellH = gridH / 4;

        // Grid coordinates for 12 Palaces (0=Tý, 1=Sửu, ..., 11=Hợi)
        // Traditional layout:
        // Top: Tị(5) (col 0, row 0), Ngọ(6) (col 1, row 0), Mùi(7) (col 2, row 0), Thân(8) (col 3, row 0)
        // Right: Dậu(9) (col 3, row 1), Tuất(10) (col 3, row 2), Hợi(11) (col 3, row 3)
        // Bottom: Tý(0) (col 2, row 3), Sửu(1) (col 1, row 3), Dần(2) (col 0, row 3)
        // Left: Mão(3) (col 0, row 2), Thìn(4) (col 0, row 1)
        const palaceGridPositions = {
            5:  { col: 0, row: 0 }, // Tị
            6:  { col: 1, row: 0 }, // Ngọ
            7:  { col: 2, row: 0 }, // Mùi
            8:  { col: 3, row: 0 }, // Thân
            9:  { col: 3, row: 1 }, // Dậu
            10: { col: 3, row: 2 }, // Tuất
            11: { col: 3, row: 3 }, // Hợi
            0:  { col: 2, row: 3 }, // Tý
            1:  { col: 1, row: 3 }, // Sửu
            2:  { col: 0, row: 3 }, // Dần
            3:  { col: 0, row: 2 }, // Mão
            4:  { col: 0, row: 1 }  // Thìn
        };

        // Draw Outer Border & Grid Lines
        ctx.strokeStyle = '#111827';
        ctx.lineWidth = 6;
        ctx.strokeRect(margin, margin, gridW, gridH);

        // Draw all 16 cells borders
        ctx.lineWidth = 3;
        for (let r = 0; r < 4; r++) {
            for (let c = 0; c < 4; c++) {
                // If middle 4 cells (col 1,2 and row 1,2), don't draw inner cross
                if ((r === 1 || r === 2) && (c === 1 || c === 2)) continue;
                const x = margin + c * cellW;
                const y = margin + r * cellH;
                ctx.strokeRect(x, y, cellW, cellH);
            }
        }
        // Trung Cung outer border
        ctx.lineWidth = 4;
        ctx.strokeRect(margin + cellW, margin + cellH, cellW * 2, cellH * 2);

        // Draw 12 Palaces Content
        horoscopeData.palaces.forEach(palace => {
            const gridPos = palaceGridPositions[palace.chiIndex];
            if (!gridPos) return;
            const x = margin + gridPos.col * cellW;
            const y = margin + gridPos.row * cellH;
            this.drawPalace(ctx, palace, x, y, cellW, cellH);
        });

        // Draw Tuần & Triệt Badges
        this.drawTuanTriet(ctx, horoscopeData.metadata.tuanCungs, 'Tuần', margin, cellW, cellH, palaceGridPositions);
        this.drawTuanTriet(ctx, horoscopeData.metadata.trietCungs, 'Triệt', margin, cellW, cellH, palaceGridPositions);

        // Draw Trung Cung (Center Box)
        this.drawTrungCung(ctx, horoscopeData.metadata, margin + cellW, margin + cellH, cellW * 2, cellH * 2);

        // Trigger Download
        const link = document.createElement('a');
        link.download = fileName;
        link.href = canvas.toDataURL('image/png');
        link.click();
    }

    static drawPalace(ctx, palace, x, y, w, h) {
        const padding = 20;

        // 1. Can Cung (Top Left) - FULL CAN NAME with Element Color
        ctx.font = 'bold 36px "Be Vietnam Pro", sans-serif';
        ctx.fillStyle = ELEMENT_COLORS[palace.canElement] || '#111827';
        ctx.textAlign = 'left';
        ctx.fillText(palace.canName, x + padding, y + 50);

        // 2. Cung Name (Top Center)
        ctx.font = 'bold 38px "Be Vietnam Pro", sans-serif';
        ctx.fillStyle = palace.cungName === 'MỆNH' ? '#b91c1c' : '#111827';
        ctx.textAlign = 'center';
        const cungTitle = palace.isThan ? `${palace.cungName} <THÂN>` : palace.cungName;
        ctx.fillText(cungTitle, x + w / 2 + 10, y + 50);

        // 3. Đại Hạn (Top Right)
        ctx.font = 'bold 36px "Be Vietnam Pro", sans-serif';
        ctx.fillStyle = '#111827';
        ctx.textAlign = 'right';
        ctx.fillText(String(palace.daiHan), x + w - padding, y + 50);

        // Divider under header
        ctx.strokeStyle = '#e5e7eb';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x + 10, y + 65);
        ctx.lineTo(x + w - 10, y + 65);
        ctx.stroke();

        // 4. Chính Tinh (Center Top of Palace)
        let mainY = y + 115;
        palace.mainStars.forEach(star => {
            ctx.font = 'bold 40px "Be Vietnam Pro", sans-serif';
            ctx.fillStyle = ELEMENT_COLORS[star.element] || '#111827';
            ctx.textAlign = 'center';
            const starText = star.mieuHam ? `${star.name}(${star.mieuHam})` : star.name;
            ctx.fillText(starText, x + w / 2, mainY);
            mainY += 50;
        });

        // 5. Cát Tinh (Left Column) & Sát Tinh (Right Column)
        const colLeftX = x + padding;
        const colRightX = x + w - padding;
        let starYLeft = mainY + 20;
        let starYRight = mainY + 20;
        const starLineHeight = 42;

        palace.goodStars.forEach(star => {
            if (starYLeft < y + h - 70) {
                ctx.font = '500 30px "Be Vietnam Pro", sans-serif';
                ctx.fillStyle = ELEMENT_COLORS[star.element] || '#16a34a';
                ctx.textAlign = 'left';
                const text = star.mieuHam ? `${star.name}(${star.mieuHam})` : star.name;
                ctx.fillText(text, colLeftX, starYLeft);
                starYLeft += starLineHeight;
            }
        });

        palace.badStars.forEach(star => {
            if (starYRight < y + h - 70) {
                ctx.font = '500 30px "Be Vietnam Pro", sans-serif';
                ctx.fillStyle = ELEMENT_COLORS[star.element] || '#dc2626';
                ctx.textAlign = 'right';
                const text = star.mieuHam ? `${star.name}(${star.mieuHam})` : star.name;
                ctx.fillText(text, colRightX, starYRight);
                starYRight += starLineHeight;
            }
        });

        // 6. Bottom Bar (Chi Cung, Tràng Sinh, Nguyệt Hạn)
        ctx.strokeStyle = '#e5e7eb';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x + 10, y + h - 55);
        ctx.lineTo(x + w - 10, y + h - 55);
        ctx.stroke();

        ctx.font = '600 30px "Be Vietnam Pro", sans-serif';
        ctx.fillStyle = '#374151';

        // Chi Cung (Left)
        ctx.textAlign = 'left';
        ctx.fillText(palace.chiName, x + padding, y + h - 18);

        // Tràng Sinh (Center)
        ctx.textAlign = 'center';
        ctx.fillText(palace.trangSinh, x + w / 2, y + h - 18);

        // Nguyệt Hạn (Right)
        ctx.textAlign = 'right';
        ctx.fillText(palace.nguyetHan, x + w - padding, y + h - 18);
    }

    static drawTuanTriet(ctx, cungs, label, margin, cellW, cellH, palaceGridPositions) {
        if (!cungs || cungs.length < 2) return;
        const pos1 = palaceGridPositions[cungs[0]];
        const pos2 = palaceGridPositions[cungs[1]];
        if (!pos1 || !pos2) return;

        // Calculate center line between pos1 and pos2
        const x1 = margin + pos1.col * cellW;
        const y1 = margin + pos1.row * cellH;
        const x2 = margin + pos2.col * cellW;
        const y2 = margin + pos2.row * cellH;

        let midX = (x1 + x2 + cellW) / 2;
        let midY = (y1 + y2 + cellH) / 2;

        // Badge Dimensions
        const bw = 140;
        const bh = 50;

        ctx.fillStyle = '#0f172a';
        ctx.fillRect(midX - bw / 2, midY - bh / 2, bw, bh);

        ctx.strokeStyle = '#e2e8f0';
        ctx.lineWidth = 2;
        ctx.strokeRect(midX - bw / 2, midY - bh / 2, bw, bh);

        ctx.font = 'bold 30px "Be Vietnam Pro", sans-serif';
        ctx.fillStyle = '#ffffff';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(label, midX, midY);
        ctx.textBaseline = 'alphabetic'; // Reset
    }

    static drawTrungCung(ctx, meta, x, y, w, h) {
        // Subtle background tint for Center Palace
        ctx.fillStyle = '#faf8f5';
        ctx.fillRect(x + 2, y + 2, w - 4, h - 4);

        // Header Title
        ctx.font = '900 64px "Be Vietnam Pro", sans-serif';
        ctx.fillStyle = '#b91c1c';
        ctx.textAlign = 'center';
        ctx.fillText('DỊCH SƯ NGUYỄN HUY HOÀNG', x + w / 2, y + 100);

        // Line under title
        ctx.strokeStyle = '#b91c1c';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(x + w / 2 - 250, y + 130);
        ctx.lineTo(x + w / 2 + 250, y + 130);
        ctx.stroke();

        // Info Table
        const leftX = x + 100;
        const valX = x + 340;
        let infoY = y + 210;
        const stepY = 56;

        ctx.font = 'bold 32px "Be Vietnam Pro", sans-serif';
        ctx.textAlign = 'left';

        const drawRow = (label, value, valColor = '#111827') => {
            ctx.fillStyle = '#374151';
            ctx.fillText(label, leftX, infoY);
            ctx.fillStyle = valColor;
            ctx.fillText(value, valX, infoY);
            infoY += stepY;
        };

        drawRow('Họ tên:', meta.name, '#1d4ed8');
        drawRow('Năm sinh:', `${meta.solarDate.split('/')[2]} (${meta.lunarYearCanChi})`);
        drawRow('Tháng sinh:', `${meta.solarDate.split('/')[1]} (${meta.lunarMonthCanChi})`);
        drawRow('Ngày sinh:', `${meta.solarDate.split('/')[0]} (${meta.lunarDayCanChi})`);
        drawRow('Giờ sinh:', `Giờ ${meta.hourName}`);
        drawRow('Năm xem:', `${meta.viewYear} (${meta.viewYearCanChi}) — ${meta.age} tuổi`);

        infoY += 15;
        drawRow('Âm Dương:', meta.amDuongNamNu);
        drawRow('Bản Mệnh:', `${meta.banMenh} (${meta.banMenhElement})`, ELEMENT_COLORS[meta.banMenhElement]);
        drawRow('Cục:', `${meta.cucInfo.name} (${meta.cucInfo.element})`, ELEMENT_COLORS[meta.cucInfo.element]);
        drawRow('Chủ Mệnh:', meta.chuMenh);
        drawRow('Chủ Thân:', meta.chuThan);

        infoY += 15;
        drawRow('Đánh giá:', meta.amDuongLy);
        drawRow('Tương tác:', meta.cucMenhTuongTac);
        drawRow('Thân cư:', `Thân cư ${meta.thanCungName}`, '#b91c1c');

        // Author & Contact Footer Box
        const footerY = y + h - 140;
        ctx.fillStyle = '#f3f4f6';
        ctx.fillRect(x + 40, footerY - 30, w - 80, 130);
        ctx.strokeStyle = '#d1d5db';
        ctx.strokeRect(x + 40, footerY - 30, w - 80, 130);

        ctx.font = 'bold 28px "Be Vietnam Pro", sans-serif';
        ctx.fillStyle = '#1f2937';
        ctx.textAlign = 'center';
        ctx.fillText('Zalo: 0933 116 860  •  Facebook: Hoàng ngủ mơ', x + w / 2, footerY + 25);

        ctx.font = 'italic 22px "Be Vietnam Pro", sans-serif';
        ctx.fillStyle = '#6b7280';
        ctx.fillText('“Gìn giữ tri thức cổ • Ứng dụng vào đời sống • Hướng tới minh triết và an tâm”', x + w / 2, footerY + 70);

        // Red Seal Stamp
        ctx.strokeStyle = '#b91c1c';
        ctx.lineWidth = 5;
        ctx.strokeRect(x + w - 180, y + h - 350, 120, 120);
        ctx.fillStyle = '#b91c1c';
        ctx.font = 'bold 34px serif';
        ctx.textAlign = 'center';
        ctx.fillText('TỬ VI', x + w - 120, y + h - 285);
        ctx.fillText('HOÀNG', x + w - 120, y + h - 245);
    }
}
