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

        // 1. Warm Traditional Paper Background (Màu kem ngà ấm áp truyền thống)
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

        // Draw Tuần & Triệt Badges on top layer at exact palace boundary edges
        this.drawTuanTriet(ctx, horoscopeData.metadata.tuanCungs, 'Tuần', margin, cellW, cellH, palaceGridPositions);
        this.drawTuanTriet(ctx, horoscopeData.metadata.trietCungs, 'Triệt', margin, cellW, cellH, palaceGridPositions);

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

        // 5. Cát Tinh (Left Column) & Hung Sát Tinh (Right Column) - TO GẤP ĐÔI & KHOẢNG CÁCH THOÁNG
        const colLeftX = x + padding + 4;
        const colRightX = x + w - padding - 4;
        let starYLeft = mainY + 22;
        let starYRight = mainY + 22;
        const starLineHeight = 52;

        palace.goodStars.forEach(star => {
            if (starYLeft < y + h - 65) {
                ctx.font = '600 36px "Inter", "Be Vietnam Pro", sans-serif';
                ctx.fillStyle = ELEMENT_COLORS[star.element] || '#15803d';
                ctx.textAlign = 'left';
                const text = star.mieuHam ? `${star.name}(${star.mieuHam})` : star.name;
                ctx.fillText(text, colLeftX, starYLeft);
                starYLeft += starLineHeight;
            }
        });

        palace.badStars.forEach(star => {
            if (starYRight < y + h - 65) {
                ctx.font = '600 36px "Inter", "Be Vietnam Pro", sans-serif';
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

    static drawTuanTriet(ctx, cungs, label, margin, cellW, cellH, palaceGridPositions) {
        if (!cungs || cungs.length < 2) return;
        const pos1 = palaceGridPositions[cungs[0]];
        const pos2 = palaceGridPositions[cungs[1]];
        if (!pos1 || !pos2) return;

        let midX = 0;
        let midY = 0;

        // Xử lý vị trí mép ranh giới giữa 2 cung
        if (pos1.row === pos2.row) {
            // Cùng hàng
            const colMax = Math.max(pos1.col, pos2.col);
            midX = margin + colMax * cellW;
            if (pos1.row === 0) {
                midY = margin + cellH; // Mép dưới hàng 0
            } else if (pos1.row === 3) {
                midY = margin + 3 * cellH; // Mép trên hàng 3
            } else {
                midY = margin + pos1.row * cellH + cellH / 2;
            }
        } else if (pos1.col === pos2.col) {
            // Cùng cột
            const rowMax = Math.max(pos1.row, pos2.row);
            midY = margin + rowMax * cellH;
            if (pos1.col === 0) {
                midX = margin + cellW; // Mép phải cột 0
            } else if (pos1.col === 3) {
                midX = margin + 3 * cellW; // Mép trái cột 3
            } else {
                midX = margin + pos1.col * cellW + cellW / 2;
            }
        } else {
            // Góc ranh giới
            const colMax = Math.max(pos1.col, pos2.col);
            const rowMax = Math.max(pos1.row, pos2.row);
            midX = margin + colMax * cellW;
            midY = margin + rowMax * cellH;
        }

        // Badge Dimensions
        const bw = 130;
        const bh = 46;

        ctx.fillStyle = '#000000';
        ctx.fillRect(midX - bw / 2, midY - bh / 2, bw, bh);

        const isTuan = label === 'Tuần';
        ctx.strokeStyle = isTuan ? '#fbbf24' : '#ffffff';
        ctx.lineWidth = 2;
        ctx.strokeRect(midX - bw / 2, midY - bh / 2, bw, bh);

        ctx.font = 'bold 28px "Inter", "Be Vietnam Pro", sans-serif';
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

        // Header Title (Không tăng, giữ nguyên tỉ lệ đẹp)
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

        // 2 Columns Info Layout with Larger Fonts & Generous Line Spacing
        const col1LabelX = x + 50;
        const col1ValX = x + 250;
        const col2LabelX = x + w / 2 + 30;
        const col2ValX = x + w / 2 + 240;

        let curY = y + 175;
        const stepY = 66;

        const rows = [
            [
                { label: 'Họ tên:', value: meta.name, color: '#1d4ed8' },
                { label: 'Âm Dương:', value: meta.amDuongNamNu, color: '#0f172a' }
            ],
            [
                { label: 'Năm sinh:', value: `${meta.solarDate.split('/')[2]} (${meta.lunarYearCanChi})`, color: '#0f172a' },
                { label: 'Bản Mệnh:', value: meta.banMenh, color: ELEMENT_COLORS[meta.banMenhElement] || '#92400e' }
            ],
            [
                { label: 'Tháng sinh:', value: `${meta.solarDate.split('/')[1]} (${meta.lunarMonthCanChi})`, color: '#0f172a' },
                { label: 'Cục:', value: meta.cucInfo.name, color: ELEMENT_COLORS[meta.cucInfo.element] || '#1d4ed8' }
            ],
            [
                { label: 'Ngày sinh:', value: `${meta.solarDate.split('/')[0]} (${meta.lunarDayCanChi})`, color: '#0f172a' },
                { label: 'Chủ Mệnh:', value: meta.chuMenh, color: '#0f172a' }
            ],
            [
                { label: 'Giờ sinh:', value: `Giờ ${meta.hourName}`, color: '#0f172a' },
                { label: 'Chủ Thân:', value: meta.chuThan, color: '#0f172a' }
            ],
            [
                { label: 'Năm xem:', value: `${meta.viewYear} (${meta.viewYearCanChi}) — ${meta.age}t`, color: '#0f172a' },
                { label: 'Thân cư:', value: `Thân cư ${meta.thanCungName}`, color: '#b91c1c' }
            ],
            [
                { label: 'Đánh giá:', value: meta.amDuongLy, color: '#0f172a' },
                { label: 'Tương tác:', value: meta.cucMenhTuongTac, color: '#0f172a' }
            ]
        ];

        rows.forEach(r => {
            // Col 1
            ctx.font = '500 33px "Inter", "Be Vietnam Pro", sans-serif';
            ctx.fillStyle = '#475569';
            ctx.textAlign = 'left';
            ctx.fillText(r[0].label, col1LabelX, curY);

            ctx.font = '700 33px "Inter", "Be Vietnam Pro", sans-serif';
            ctx.fillStyle = r[0].color;
            ctx.fillText(r[0].value, col1ValX, curY);

            // Col 2
            ctx.font = '500 33px "Inter", "Be Vietnam Pro", sans-serif';
            ctx.fillStyle = '#475569';
            ctx.fillText(r[1].label, col2LabelX, curY);

            ctx.font = '700 33px "Inter", "Be Vietnam Pro", sans-serif';
            ctx.fillStyle = r[1].color;
            ctx.fillText(r[1].value, col2ValX, curY);

            // Subtle dashed line
            ctx.strokeStyle = '#e2e8f0';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(col1LabelX, curY + 16);
            ctx.lineTo(x + w - 50, curY + 16);
            ctx.stroke();

            curY += stepY;
        });

        // Seal & Contact Footer
        ctx.strokeStyle = '#cbd5e1';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(x + 50, y + h - 115);
        ctx.lineTo(x + w - 50, y + h - 115);
        ctx.stroke();

        ctx.font = '700 33px "Inter", "Be Vietnam Pro", sans-serif';
        ctx.fillStyle = '#0f172a';
        ctx.textAlign = 'center';
        ctx.fillText('Zalo: 0933 116 860  •  Facebook: Hoàng ngủ mơ', x + w / 2, y + h - 70);

        ctx.font = 'italic 500 26px "Inter", "Be Vietnam Pro", sans-serif';
        ctx.fillStyle = '#64748b';
        ctx.fillText('“Gìn giữ tri thức cổ • Ứng dụng vào đời sống • Hướng tới minh triết và an tâm”', x + w / 2, y + h - 30);
    }
}
