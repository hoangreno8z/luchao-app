/**
 * TU VI HD PNG EXPORTER - HIGH-RESOLUTION CANVAS RENDERER
 * Matches traditional Vietnamese Tu Vi chart layout (2400x3200 px)
 * Developed for Dich Su Nguyen Huy Hoang
 */

import { ELEMENT_COLORS, CAN_ELEMENTS } from './tu_vi_engine.js';

export class TuViPngExporter {

    // ── Matte Paper Noise Texture Generator ──────────────────────────────
    // Generates a tileable grain noise ImageData tile (tileSize × tileSize).
    // Uses a seeded Mulberry32 PRNG for determinism (no Math.random drift).
    // Opacity range ~2.5–4% ensures the texture is invisible at arm's length
    // but adds perceptible depth on close inspection. Gaussian-approximated
    // distribution (sum of 3 uniform randoms) avoids harsh single-pixel spikes.
    static _generateNoiseTile(tileSize = 180) {
        const offCanvas = document.createElement('canvas');
        offCanvas.width = tileSize;
        offCanvas.height = tileSize;
        const offCtx = offCanvas.getContext('2d');
        const imgData = offCtx.createImageData(tileSize, tileSize);
        const d = imgData.data;

        // Mulberry32 PRNG (seeded, deterministic)
        let seed = 0xDEAD_BEEF;
        const rand = () => {
            seed |= 0; seed = (seed + 0x6D2B79F5) | 0;
            let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
            t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
            return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
        };

        for (let i = 0; i < d.length; i += 4) {
            // Gaussian-approximated grain (sum of 3 uniforms → smoother distribution)
            const g = ((rand() + rand() + rand()) / 3);
            // Map to subtle light/dark offset around neutral gray
            const val = g < 0.5 ? 0 : 255;
            d[i]     = val; // R
            d[i + 1] = val; // G
            d[i + 2] = val; // B
            // Alpha 6–10 out of 255 ≈ 2.3–3.9% opacity
            d[i + 3] = Math.floor(6 + rand() * 4);
        }
        offCtx.putImageData(imgData, 0, 0);
        return offCanvas;
    }

    // ── Inset Shadow (Paper Depression) on a Cell ──────────────────────
    // Draws extremely subtle top-inner shadow + bottom-inner highlight
    // to simulate pressed / debossed paper surface.
    static _drawCellInsetShadow(ctx, x, y, w, h) {
        // Top inset shadow: dark warm tone
        const topGrad = ctx.createLinearGradient(x, y, x, y + 6);
        topGrad.addColorStop(0, 'rgba(80, 65, 45, 0.035)');
        topGrad.addColorStop(1, 'rgba(80, 65, 45, 0)');
        ctx.fillStyle = topGrad;
        ctx.fillRect(x, y, w, 6);

        // Bottom inset highlight: warm white
        const botGrad = ctx.createLinearGradient(x, y + h - 4, x, y + h);
        botGrad.addColorStop(0, 'rgba(255, 255, 255, 0)');
        botGrad.addColorStop(1, 'rgba(255, 255, 255, 0.35)');
        ctx.fillStyle = botGrad;
        ctx.fillRect(x, y + h - 4, w, 4);
    }

    static renderToCanvas(horoscopeData) {
        const width = 2400;
        const height = 3200;
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');

        // ── Color Palette (Matte Paper / Giấy Mỹ Thuật Cao Cấp) ──────
        const COL_BG_MAIN    = '#F3EFE6'; // Nền tổng
        const COL_BG_PALACE  = '#F8F5EE'; // Nền 12 cung
        const COL_BG_CENTER  = '#F6F1E8'; // Nền trung tâm
        const COL_BORDER_PRI = '#C9C1B3'; // Viền chính
        const COL_BORDER_SEC = '#DDD6C8'; // Viền phụ (đường chia nội bộ ô)

        // 1. Fill entire canvas with main background
        ctx.fillStyle = COL_BG_MAIN;
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

        // 2. Fill each of the 12 palace cells with palace background
        for (let r = 0; r < 4; r++) {
            for (let c = 0; c < 4; c++) {
                if ((r === 1 || r === 2) && (c === 1 || c === 2)) continue; // skip center
                const cx = margin + c * cellW;
                const cy = margin + r * cellH;
                ctx.fillStyle = COL_BG_PALACE;
                ctx.fillRect(cx, cy, cellW, cellH);
                // Subtle inset shadow per cell
                this._drawCellInsetShadow(ctx, cx, cy, cellW, cellH);
            }
        }

        // 3. Fill center 2×2 with center background
        ctx.fillStyle = COL_BG_CENTER;
        ctx.fillRect(margin + cellW, margin + cellH, cellW * 2, cellH * 2);
        this._drawCellInsetShadow(ctx, margin + cellW, margin + cellH, cellW * 2, cellH * 2);

        // 4. Apply matte paper noise texture (tiled across entire canvas)
        const noiseTile = this._generateNoiseTile(180);
        const pattern = ctx.createPattern(noiseTile, 'repeat');
        if (pattern) {
            ctx.globalCompositeOperation = 'multiply';
            ctx.fillStyle = pattern;
            ctx.fillRect(0, 0, width, height);
            ctx.globalCompositeOperation = 'source-over';
        }

        // 5. Draw Outer Border (soft warm, not black)
        ctx.strokeStyle = COL_BORDER_PRI;
        ctx.lineWidth = 3.5;
        ctx.strokeRect(margin, margin, gridW, gridH);

        // 6. Draw all 12 palace cell borders (soft warm secondary)
        ctx.lineWidth = 1.5;
        ctx.strokeStyle = COL_BORDER_SEC;
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

        // Draw Tuần & Triệt Badges on top layer at exact perimeter boundary edges
        const tuanKey = this.getBoundaryKey(horoscopeData.metadata.tuanCungs);
        const trietKey = this.getBoundaryKey(horoscopeData.metadata.trietCungs);

        if (tuanKey && trietKey && tuanKey === trietKey) {
            // Khi Tuần và Triệt cùng 1 vị trí -> tách ra theo hàng ngang nằm cạnh nhau [Tuần] [Triệt]
            this.drawTuanTrietCoLocated(ctx, horoscopeData.metadata.tuanCungs, margin, cellW, cellH);
        } else {
            // Khi ở khác vị trí -> vẽ độc lập bình thường
            this.drawTuanTriet(ctx, horoscopeData.metadata.tuanCungs, 'Tuần', margin, cellW, cellH);
            this.drawTuanTriet(ctx, horoscopeData.metadata.trietCungs, 'Triệt', margin, cellW, cellH);
        }

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
        ctx.strokeStyle = '#DDD6C8';
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

        // 5. Cát Tinh (Left Column) & Hung Sát Tinh (Right Column) - GIẢM ĐỘ DÀY NÉT (FONT WEIGHT 400), TO RÕ, NÉT GẦY SẮC SẢO
        const colLeftX = x + padding + 4;
        const colRightX = x + w - padding - 4;
        let starYLeft = mainY + 20;
        let starYRight = mainY + 20;
        const starLineHeight = 50;

        palace.goodStars.forEach(star => {
            if (starYLeft < y + h - 65) {
                ctx.font = '400 38px "Inter", "Be Vietnam Pro", sans-serif';
                ctx.fillStyle = ELEMENT_COLORS[star.element] || '#15803d';
                ctx.textAlign = 'left';
                const text = star.mieuHam ? `${star.name}(${star.mieuHam})` : star.name;
                ctx.fillText(text, colLeftX, starYLeft);
                starYLeft += starLineHeight;
            }
        });

        palace.badStars.forEach(star => {
            if (starYRight < y + h - 65) {
                ctx.font = '400 38px "Inter", "Be Vietnam Pro", sans-serif';
                ctx.fillStyle = ELEMENT_COLORS[star.element] || '#dc2626';
                ctx.textAlign = 'right';
                const text = star.mieuHam ? `${star.name}(${star.mieuHam})` : star.name;
                ctx.fillText(text, colRightX, starYRight);
                starYRight += starLineHeight;
            }
        });

        // 6. Bottom Bar (Chi Cung, Tràng Sinh, Nguyệt Hạn)
        ctx.strokeStyle = '#DDD6C8';
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

    static getBoundaryKey(cungs) {
        if (!cungs || cungs.length < 2) return null;
        const c1 = cungs[0];
        const c2 = cungs[1];
        return (c1 === 11 && c2 === 0) || (c1 === 0 && c2 === 11)
            ? "11_0"
            : `${Math.min(c1, c2)}_${Math.max(c1, c2)}`;
    }

    static drawTuanTriet(ctx, cungs, label, margin, cellW, cellH) {
        const boundaryMap = {
            "2_3":   { colRatio: 0.5, rowRatio: 3.0 }, // Dần - Mão
            "3_4":   { colRatio: 0.5, rowRatio: 2.0 }, // Mão - Thìn
            "4_5":   { colRatio: 0.5, rowRatio: 1.0 }, // Thìn - Tị
            "5_6":   { colRatio: 1.0, rowRatio: 1.0 }, // Tị - Ngọ
            "6_7":   { colRatio: 2.0, rowRatio: 1.0 }, // Ngọ - Mùi (đúng mép trên Trung Cung)
            "7_8":   { colRatio: 3.0, rowRatio: 1.0 }, // Mùi - Thân
            "8_9":   { colRatio: 3.5, rowRatio: 1.0 }, // Thân - Dậu (vách ngăn ngang giữa Thân và Dậu)
            "9_10":  { colRatio: 3.5, rowRatio: 2.0 }, // Dậu - Tuất
            "10_11": { colRatio: 3.5, rowRatio: 3.0 }, // Tuất - Hợi
            "11_0":  { colRatio: 3.0, rowRatio: 3.0 }, // Hợi - Tý
            "0_1":   { colRatio: 2.0, rowRatio: 3.0 }, // Tý - Sửu (đúng mép dưới Trung Cung)
            "1_2":   { colRatio: 1.0, rowRatio: 3.0 }  // Sửu - Dần
        };

        const key = this.getBoundaryKey(cungs);
        if (!key) return;

        const boundary = boundaryMap[key];
        if (!boundary) return;

        const midX = margin + boundary.colRatio * cellW;
        const midY = margin + boundary.rowRatio * cellH;

        // Badge Dimensions
        const bw = 80;
        const bh = 28;

        ctx.fillStyle = '#000000';
        ctx.fillRect(midX - bw / 2, midY - bh / 2, bw, bh);

        const isTuan = label === 'Tuần';
        ctx.strokeStyle = isTuan ? '#fbbf24' : '#ffffff';
        ctx.lineWidth = 1.2;
        ctx.strokeRect(midX - bw / 2, midY - bh / 2, bw, bh);

        ctx.font = 'bold 18px "Inter", "Be Vietnam Pro", sans-serif';
        ctx.fillStyle = isTuan ? '#fbbf24' : '#ffffff';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(label, midX, midY);
        ctx.textBaseline = 'alphabetic'; // Reset
    }

    static drawTuanTrietCoLocated(ctx, cungs, margin, cellW, cellH) {
        const boundaryMap = {
            "2_3":   { colRatio: 0.5, rowRatio: 3.0 },
            "3_4":   { colRatio: 0.5, rowRatio: 2.0 },
            "4_5":   { colRatio: 0.5, rowRatio: 1.0 },
            "5_6":   { colRatio: 1.0, rowRatio: 1.0 },
            "6_7":   { colRatio: 2.0, rowRatio: 1.0 },
            "7_8":   { colRatio: 3.0, rowRatio: 1.0 },
            "8_9":   { colRatio: 3.5, rowRatio: 1.0 },
            "9_10":  { colRatio: 3.5, rowRatio: 2.0 },
            "10_11": { colRatio: 3.5, rowRatio: 3.0 },
            "11_0":  { colRatio: 3.0, rowRatio: 3.0 },
            "0_1":   { colRatio: 2.0, rowRatio: 3.0 },
            "1_2":   { colRatio: 1.0, rowRatio: 3.0 }
        };

        const key = this.getBoundaryKey(cungs);
        if (!key) return;

        const boundary = boundaryMap[key];
        if (!boundary) return;

        const midX = margin + boundary.colRatio * cellW;
        const midY = margin + boundary.rowRatio * cellH;

        const bw = 70;
        const bh = 28;
        const offset = (bw / 2) + 3;

        // 1. Badge Tuần (Bên trái)
        const tuanX = midX - offset;
        ctx.fillStyle = '#000000';
        ctx.fillRect(tuanX - bw / 2, midY - bh / 2, bw, bh);
        ctx.strokeStyle = '#fbbf24';
        ctx.lineWidth = 1.2;
        ctx.strokeRect(tuanX - bw / 2, midY - bh / 2, bw, bh);
        ctx.font = 'bold 18px "Inter", "Be Vietnam Pro", sans-serif';
        ctx.fillStyle = '#fbbf24';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('Tuần', tuanX, midY);

        // 2. Badge Triệt (Bên phải)
        const trietX = midX + offset;
        ctx.fillStyle = '#000000';
        ctx.fillRect(trietX - bw / 2, midY - bh / 2, bw, bh);
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1.2;
        ctx.strokeRect(trietX - bw / 2, midY - bh / 2, bw, bh);
        ctx.font = 'bold 18px "Inter", "Be Vietnam Pro", sans-serif';
        ctx.fillStyle = '#ffffff';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('Triệt', trietX, midY);

        ctx.textBaseline = 'alphabetic'; // Reset
    }

    static drawTrungCung(ctx, meta, x, y, w, h) {
        // Background tint for Center Palace (matte paper center tone)
        ctx.fillStyle = '#F6F1E8';
        ctx.fillRect(x + 1, y + 1, w - 2, h - 2);

        // Border for Center Box (warm primary border)
        ctx.strokeStyle = '#C9C1B3';
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

        // 1 CỘT DỌC DUY NHẤT (SINGLE COLUMN LAYOUT) - CAN CHI ĐẦY ĐỦ CHO NGÀY, THÁNG, NĂM, GIỜ
        const labelX = x + 80;
        const valX = x + 300;

        let curY = y + 165;
        const stepY = 70;

        const infoList = [
            { label: 'Họ tên:', value: meta.name, color: '#1d4ed8' },
            { label: 'Âm Dương:', value: `${meta.amDuongNamNu} (${meta.amDuongLy})`, color: '#0f172a' },
            { label: 'Năm sinh:', value: `${meta.solarDate.split('/')[2]} (${meta.lunarYearCanChi})`, color: '#0f172a' },
            { label: 'Tháng sinh:', value: `${meta.solarDate.split('/')[1]} (${meta.lunarMonthCanChi})`, color: '#0f172a' },
            { label: 'Ngày sinh:', value: `${meta.solarDate.split('/')[0]} (Ngày ${meta.lunarDay} ${meta.lunarDayCanChi})`, color: '#0f172a' },
            { label: 'Giờ sinh:', value: `Giờ ${meta.hourName} (${meta.lunarHourCanChi})`, color: '#0f172a' },
            { label: 'Bản Mệnh:', value: meta.banMenh, color: ELEMENT_COLORS[meta.banMenhElement] || '#92400e' },
            { label: 'Cục:', value: `${meta.cucInfo.name} (${meta.cucMenhTuongTac})`, color: ELEMENT_COLORS[meta.cucInfo.element] || '#1d4ed8' },
            { label: 'Chủ Mệnh:', value: meta.chuMenh, color: '#0f172a' },
            { label: 'Chủ Thân:', value: meta.chuThan, color: '#0f172a' },
            { label: 'Thân cư:', value: `Thân cư ${meta.thanCungName}`, color: '#b91c1c' },
            { label: 'Năm xem:', value: `${meta.viewYear} (${meta.viewYearCanChi}) — ${meta.age} tuổi`, color: '#0f172a' }
        ];

        infoList.forEach(item => {
            // Label
            ctx.font = '400 32px "Inter", "Be Vietnam Pro", sans-serif';
            ctx.fillStyle = '#475569';
            ctx.textAlign = 'left';
            ctx.fillText(item.label, labelX, curY);

            // Value
            ctx.font = '600 32px "Inter", "Be Vietnam Pro", sans-serif';
            ctx.fillStyle = item.color;
            ctx.fillText(item.value, valX, curY);

            // Subtle dashed divider line
            ctx.strokeStyle = '#DDD6C8';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(labelX, curY + 16);
            ctx.lineTo(x + w - 70, curY + 16);
            ctx.stroke();

            curY += stepY;
        });

        // Seal & Contact Footer
        ctx.strokeStyle = '#C9C1B3';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(x + 60, y + h - 110);
        ctx.lineTo(x + w - 60, y + h - 110);
        ctx.stroke();

        ctx.font = '700 32px "Inter", "Be Vietnam Pro", sans-serif';
        ctx.fillStyle = '#0f172a';
        ctx.textAlign = 'center';
        ctx.fillText('Zalo: 0933 116 860  •  Facebook: Hoàng ngủ mơ', x + w / 2, y + h - 68);

        ctx.font = 'italic 500 24px "Inter", "Be Vietnam Pro", sans-serif';
        ctx.fillStyle = '#64748b';
        ctx.fillText('“Gìn giữ tri thức cổ • Ứng dụng vào đời sống • Hướng tới minh triết và an tâm”', x + w / 2, y + h - 28);
    }
}
