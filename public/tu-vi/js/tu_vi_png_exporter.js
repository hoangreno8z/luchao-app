/**
 * TU VI HD PNG EXPORTER - HIGH-RESOLUTION CANVAS RENDERER
 * Matches traditional Vietnamese Tu Vi chart layout (2400x3200 px)
 * Developed for Dich Su Nguyen Huy Hoang
 */

import { ELEMENT_COLORS, CAN_ELEMENTS } from './tu_vi_engine.js';

export class TuViPngExporter {

    static renderToCanvas(horoscopeData) {
        const width = 2400;
        const height = 3200;
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');

        // 1. Warm Traditional Paper Background (Màu kem ngà ấm áp)
        ctx.fillStyle = '#faf6ee';
        ctx.fillRect(0, 0, width, height);

        const margin = 24;
        const gridW = width - margin * 2;
        const gridH = height - margin * 2;
        const cellW = gridW / 4;
        const cellH = gridH / 4;

        // Grid coordinates for 12 Palaces (0=Tý, 1=Sửu, ..., 11=Hợi)
        // Top: Tị(5), Ngọ(6), Mùi(7), Thân(8)
        // Right: Dậu(9), Tuất(10), Hợi(11)
        // Bottom: Tý(0), Sửu(1), Dần(2)
        // Left: Mão(3), Thìn(4)
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
        ctx.strokeStyle = '#1e293b';
        ctx.lineWidth = 4;
        ctx.strokeRect(margin, margin, gridW, gridH);

        // Draw all 16 cells borders
        ctx.lineWidth = 1.5;
        ctx.strokeStyle = '#cbd5e1';
        for (let r = 0; r < 4; r++) {
            for (let c = 0; c < 4; c++) {
                if ((r === 1 || r === 2) && (c === 1 || c === 2)) continue;
                const x = margin + c * cellW;
                const y = margin + r * cellH;
                ctx.strokeRect(x, y, cellW, cellH);
            }
        }

        // Draw 12 Palaces Content
        horoscopeData.palaces.forEach(palace => {
            const gridPos = palaceGridPositions[palace.chiIndex];
            if (!gridPos) return;
            const x = margin + gridPos.col * cellW;
            const y = margin + gridPos.row * cellH;
            this.drawPalace(ctx, palace, x, y, cellW, cellH);
        });

        // Draw Trung Cung (Center Box) BEFORE Tuần Triệt so it never covers badges
        this.drawTrungCung(ctx, horoscopeData.metadata, margin + cellW, margin + cellH, cellW * 2, cellH * 2);

        // Draw Tuần & Triệt Badges on top layer at exact palace boundary edges (between the 2 palaces)
        this.drawTuanTriet(ctx, horoscopeData.metadata.tuanCungs, 'Tuần', margin, cellW, cellH);
        this.drawTuanTriet(ctx, horoscopeData.metadata.trietCungs, 'Triệt', margin, cellW, cellH);

        return canvas;
    }

    static generateChartDataUrl(horoscopeData) {
        const canvas = this.renderToCanvas(horoscopeData);
        return canvas.toDataURL('image/png');
    }

    static async exportToPng(horoscopeData, fileName = 'La_So_Tu_Vi.png') {
        const canvas = this.renderToCanvas(horoscopeData);
        canvas.toBlob((blob) => {
            if (!blob) return;
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.download = fileName;
            link.href = url;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            setTimeout(() => URL.revokeObjectURL(url), 2000);
        }, 'image/png');
    }

    static drawPalace(ctx, palace, x, y, w, h) {
        const padding = 20;

        // 1. Can Cung (Top Left)
        ctx.font = '600 36px "Inter", "Be Vietnam Pro", sans-serif';
        ctx.fillStyle = ELEMENT_COLORS[palace.canElement] || '#0f172a';
        ctx.textAlign = 'left';
        ctx.fillText(palace.canName, x + padding, y + 48);

        // 2. Cung Name (Top Center)
        ctx.font = '700 40px "Inter", "Be Vietnam Pro", sans-serif';
        ctx.fillStyle = palace.cungName === 'MỆNH' ? '#dc2626' : '#0f172a';
        ctx.textAlign = 'center';
        const cungTitle = palace.isThan ? `${palace.cungName} <THÂN>` : palace.cungName;
        ctx.fillText(cungTitle, x + w / 2, y + 48);

        // 3. Đại Hạn (Top Right)
        ctx.font = '600 36px "Inter", "Be Vietnam Pro", sans-serif';
        ctx.fillStyle = '#0f172a';
        ctx.textAlign = 'right';
        ctx.fillText(String(palace.daiHan), x + w - padding, y + 48);

        // Divider under header
        ctx.strokeStyle = '#e2e8f0';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(x + 10, y + 66);
        ctx.lineTo(x + w - 10, y + 66);
        ctx.stroke();

        // 4. Chính Tinh (Center Top of Palace)
        let mainY = y + 118;
        palace.mainStars.forEach(star => {
            ctx.font = '700 46px "Inter", "Be Vietnam Pro", sans-serif';
            ctx.fillStyle = ELEMENT_COLORS[star.element] || '#0f172a';
            ctx.textAlign = 'center';
            const starText = star.mieuHam ? `${star.name}(${star.mieuHam})` : star.name;
            ctx.fillText(starText, x + w / 2, mainY);
            mainY += 54;
        });

        // 5. Cát Tinh (Left Column) & Hung Sát Tinh (Right Column) - FONT 38px, WEIGHT 500 (NÉT MẢNH, TO RÕ, KHÔNG NHÒE)
        const colLeftX = x + padding + 4;
        const colRightX = x + w - padding - 4;
        let starYLeft = mainY + 20;
        let starYRight = mainY + 20;
        const starLineHeight = 50;

        palace.goodStars.forEach(star => {
            if (starYLeft < y + h - 65) {
                ctx.font = '500 38px "Inter", "Be Vietnam Pro", sans-serif';
                ctx.fillStyle = ELEMENT_COLORS[star.element] || '#15803d';
                ctx.textAlign = 'left';
                const text = star.mieuHam ? `${star.name}(${star.mieuHam})` : star.name;
                ctx.fillText(text, colLeftX, starYLeft);
                starYLeft += starLineHeight;
            }
        });

        palace.badStars.forEach(star => {
            if (starYRight < y + h - 65) {
                ctx.font = '500 38px "Inter", "Be Vietnam Pro", sans-serif';
                ctx.fillStyle = ELEMENT_COLORS[star.element] || '#dc2626';
                ctx.textAlign = 'right';
                const text = star.mieuHam ? `${star.name}(${star.mieuHam})` : star.name;
                ctx.fillText(text, colRightX, starYRight);
                starYRight += starLineHeight;
            }
        });

        // 6. Bottom Bar (Chi Cung, Tràng Sinh, Nguyệt Hạn)
        ctx.strokeStyle = '#e2e8f0';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(x + 10, y + h - 55);
        ctx.lineTo(x + w - 10, y + h - 55);
        ctx.stroke();

        ctx.font = '500 32px "Inter", "Be Vietnam Pro", sans-serif';
        ctx.fillStyle = '#475569';

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

    static drawTuanTriet(ctx, cungs, label, margin, cellW, cellH) {
        if (!cungs || cungs.length < 2) return;

        // Vị trí chuẩn tâm của 12 vách ngăn ranh giới giữa 2 cung kề nhau
        const boundaryMap = {
            "2_3":   { colRatio: 0.5, rowRatio: 3.0 }, // Dần - Mão (vách ngăn ngang giữa cột 0)
            "3_4":   { colRatio: 0.5, rowRatio: 2.0 }, // Mão - Thìn (vách ngăn ngang giữa cột 0)
            "4_5":   { colRatio: 0.5, rowRatio: 1.0 }, // Thìn - Tị (vách ngăn ngang giữa cột 0)
            "5_6":   { colRatio: 1.0, rowRatio: 0.5 }, // Tị - Ngọ (vách ngăn dọc giữa hàng 0)
            "6_7":   { colRatio: 2.0, rowRatio: 0.5 }, // Ngọ - Mùi (vách ngăn dọc giữa hàng 0)
            "7_8":   { colRatio: 3.0, rowRatio: 0.5 }, // Mùi - Thân (vách ngăn dọc giữa hàng 0)
            "8_9":   { colRatio: 3.5, rowRatio: 1.0 }, // Thân - Dậu (vách ngăn ngang giữa cột 3)
            "9_10":  { colRatio: 3.5, rowRatio: 2.0 }, // Dậu - Tuất (vách ngăn ngang giữa cột 3)
            "10_11": { colRatio: 3.5, rowRatio: 3.0 }, // Tuất - Hợi (vách ngăn ngang giữa cột 3)
            "11_0":  { colRatio: 3.0, rowRatio: 3.5 }, // Hợi - Tý (vách ngăn dọc giữa hàng 3)
            "0_1":   { colRatio: 2.0, rowRatio: 3.5 }, // Tý - Sửu (vách ngăn dọc giữa hàng 3)
            "1_2":   { colRatio: 1.0, rowRatio: 3.5 }  // Sửu - Dần (vách ngăn dọc giữa hàng 3)
        };

        const c1 = cungs[0];
        const c2 = cungs[1];
        const key = (c1 === 11 && c2 === 0) || (c1 === 0 && c2 === 11)
            ? "11_0"
            : `${Math.min(c1, c2)}_${Math.max(c1, c2)}`;

        const boundary = boundaryMap[key];
        if (!boundary) return;

        const midX = margin + boundary.colRatio * cellW;
        const midY = margin + boundary.rowRatio * cellH;

        // Badge Dimensions: Nhỏ gọn, mỏng thanh lịch
        const bw = 92;
        const bh = 34;

        ctx.fillStyle = '#000000';
        ctx.fillRect(midX - bw / 2, midY - bh / 2, bw, bh);

        const isTuan = label === 'Tuần';
        ctx.strokeStyle = isTuan ? '#fbbf24' : '#ffffff';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(midX - bw / 2, midY - bh / 2, bw, bh);

        ctx.font = 'bold 20px "Inter", "Be Vietnam Pro", sans-serif';
        ctx.fillStyle = isTuan ? '#fbbf24' : '#ffffff';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(label, midX, midY);
        ctx.textBaseline = 'alphabetic'; // Reset
    }

    static drawTrungCung(ctx, meta, x, y, w, h) {
        // Background tint for Center Palace
        ctx.fillStyle = '#f6f0e2';
        ctx.fillRect(x + 1, y + 1, w - 2, h - 2);

        // Border for Center Box
        ctx.strokeStyle = '#94a3b8';
        ctx.lineWidth = 2;
        ctx.strokeRect(x, y, w, h);

        // Header Title (Không tăng kích thước)
        ctx.font = '700 46px "Inter", "Be Vietnam Pro", sans-serif';
        ctx.fillStyle = '#b91c1c';
        ctx.textAlign = 'center';
        ctx.fillText('DỊCH SƯ NGUYỄN HUY HOÀNG', x + w / 2, y + 80);

        // Line under title
        ctx.strokeStyle = '#dc2626';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.moveTo(x + w / 2 - 240, y + 104);
        ctx.lineTo(x + w / 2 + 240, y + 104);
        ctx.stroke();

        // 1 CỘT DỌC DUY NHẤT (SINGLE COLUMN LAYOUT) - TO RÕ, TRẢI ĐỀU TOÀN BỘ Ô GIỮA
        const labelX = x + 90;
        const valX = x + 350;

        let curY = y + 175;
        const stepY = 76;

        const infoList = [
            { label: 'Họ và tên:', value: meta.name, color: '#1d4ed8' },
            { label: 'Âm Dương:', value: `${meta.amDuongNamNu} • ${meta.amDuongLy}`, color: '#0f172a' },
            { label: 'Năm sinh:', value: `${meta.solarDate.split('/')[2]} (${meta.lunarYearCanChi})`, color: '#0f172a' },
            { label: 'Tháng sinh:', value: `${meta.solarDate.split('/')[1]} (${meta.lunarMonthCanChi})`, color: '#0f172a' },
            { label: 'Ngày sinh:', value: `${meta.solarDate.split('/')[0]} (${meta.lunarDayCanChi})`, color: '#0f172a' },
            { label: 'Giờ sinh:', value: `Giờ ${meta.hourName}`, color: '#0f172a' },
            { label: 'Bản Mệnh:', value: meta.banMenh, color: ELEMENT_COLORS[meta.banMenhElement] || '#92400e' },
            { label: 'Cục:', value: `${meta.cucInfo.name} (${meta.cucMenhTuongTac})`, color: ELEMENT_COLORS[meta.cucInfo.element] || '#1d4ed8' },
            { label: 'Chủ Mệnh & Thân:', value: `Mệnh: ${meta.chuMenh}  •  Thân: ${meta.chuThan}`, color: '#0f172a' },
            { label: 'Thân cư:', value: `Thân cư ${meta.thanCungName}`, color: '#b91c1c' },
            { label: 'Năm xem:', value: `${meta.viewYear} (${meta.viewYearCanChi}) — ${meta.age} tuổi`, color: '#0f172a' }
        ];

        infoList.forEach(item => {
            // Label
            ctx.font = '500 35px "Inter", "Be Vietnam Pro", sans-serif';
            ctx.fillStyle = '#475569';
            ctx.textAlign = 'left';
            ctx.fillText(item.label, labelX, curY);

            // Value
            ctx.font = '700 35px "Inter", "Be Vietnam Pro", sans-serif';
            ctx.fillStyle = item.color;
            ctx.fillText(item.value, valX, curY);

            // Subtle dashed divider line
            ctx.strokeStyle = '#e2e8f0';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(labelX, curY + 18);
            ctx.lineTo(x + w - 80, curY + 18);
            ctx.stroke();

            curY += stepY;
        });

        // Seal & Contact Footer
        ctx.strokeStyle = '#cbd5e1';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(x + 60, y + h - 120);
        ctx.lineTo(x + w - 60, y + h - 120);
        ctx.stroke();

        ctx.font = '700 34px "Inter", "Be Vietnam Pro", sans-serif';
        ctx.fillStyle = '#0f172a';
        ctx.textAlign = 'center';
        ctx.fillText('Zalo: 0933 116 860  •  Facebook: Hoàng ngủ mơ', x + w / 2, y + h - 75);

        ctx.font = 'italic 500 26px "Inter", "Be Vietnam Pro", sans-serif';
        ctx.fillStyle = '#64748b';
        ctx.fillText('“Gìn giữ tri thức cổ • Ứng dụng vào đời sống • Hướng tới minh triết và an tâm”', x + w / 2, y + h - 32);
    }
}
