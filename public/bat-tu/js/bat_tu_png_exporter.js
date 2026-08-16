/**
 * Trình Xuất Ảnh Lá Số Bát Tự HD Canvas — Dịch Sư Nguyễn Huy Hoàng
 * Mô phỏng chuẩn xác 100% bố cục và màu sắc theo đồ hình mẫu
 */

(function(global) {
    function getStemColor(stem) {
        if (!stem) return '#333333';
        const map = {
            'Giáp': '#27ae60', 'Ất': '#27ae60',
            'Bính': '#c0392b', 'Đinh': '#c0392b',
            'Mậu': '#8e5a2b', 'Kỷ': '#8e5a2b',
            'Canh': '#7f8c8d', 'Tân': '#7f8c8d',
            'Nhâm': '#2980b9', 'Quý': '#2980b9'
        };
        return map[stem] || '#333333';
    }

    function getBranchColor(branch) {
        if (!branch) return '#333333';
        const map = {
            'Dần': '#27ae60', 'Mão': '#27ae60',
            'Tị': '#c0392b', 'Ngọ': '#c0392b',
            'Thìn': '#8e5a2b', 'Tuất': '#8e5a2b', 'Sửu': '#8e5a2b', 'Mùi': '#8e5a2b',
            'Thân': '#7f8c8d', 'Dậu': '#7f8c8d',
            'Hợi': '#2980b9', 'Tý': '#2980b9'
        };
        return map[branch] || '#333333';
    }

    /**
     * Vẽ Lá Số Bát Tự lên Canvas 2D và trả về DataURL
     */
    function drawBatTuChart(data) {
        if (!data) return "";

        const canvas = document.createElement("canvas");
        const W = 1180;
        const H = 1420;
        canvas.width = W * 2;
        canvas.height = H * 2;
        const ctx = canvas.getContext("2d");
        if (!ctx) return "";

        ctx.scale(2, 2);

        // 1. Background
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0, 0, W, H);

        // Khung viền ngoài
        ctx.strokeStyle = "#1A5276";
        ctx.lineWidth = 3;
        ctx.strokeRect(10, 10, W - 20, H - 20);

        ctx.strokeStyle = "#2980B9";
        ctx.lineWidth = 1;
        ctx.strokeRect(14, 14, W - 28, H - 28);

        // ==========================================
        // 2. HEADER SECTION (Top Banner)
        // ==========================================
        const headY = 22;
        const headH = 100;

        // Left Branding
        ctx.fillStyle = "#0A3871";
        ctx.font = "bold 20px 'Be Vietnam Pro', 'Inter', sans-serif";
        ctx.textAlign = "left";
        ctx.fillText("☯ DỊCH SƯ NGUYỄN HUY HOÀNG", 28, headY + 32);

        ctx.fillStyle = "#8B0000";
        ctx.font = "bold 13px 'Inter', sans-serif";
        ctx.fillText("Zalo: 0933116860  |  Sacombank: 060216644258", 28, headY + 54);

        ctx.fillStyle = "#555555";
        ctx.font = "12px 'Inter', sans-serif";
        ctx.fillText("Chuyên gia Bát Tự — Tử Bình — Cải Vận Bổ Khuyết", 28, headY + 74);

        // Center Title
        ctx.fillStyle = "#0A3871";
        ctx.font = "900 24px 'Be Vietnam Pro', 'Inter', sans-serif";
        ctx.textAlign = "center";
        ctx.fillText("LÁ SỐ BÁT TỰ", 530, headY + 36);

        ctx.fillStyle = "#2980B9";
        ctx.font = "bold 18px 'Be Vietnam Pro', 'Inter', sans-serif";
        ctx.fillText("CẢI VẬN BỔ KHUYẾT", 530, headY + 68);

        // Right Metadata
        const metaX = 770;
        ctx.textAlign = "left";
        ctx.font = "13px 'Inter', sans-serif";

        ctx.fillStyle = "#333333";
        ctx.fillText("Họ và tên", metaX, headY + 22);
        ctx.fillStyle = "#0A3871";
        ctx.font = "bold 13.5px 'Inter', sans-serif";
        ctx.fillText(`: ${data.name || 'VÔ DANH KHÁCH'}`, metaX + 85, headY + 22);

        ctx.font = "13px 'Inter', sans-serif";
        ctx.fillStyle = "#333333";
        ctx.fillText("Giới tính", metaX, headY + 40);
        ctx.fillStyle = "#0A3871";
        ctx.font = "bold 13.5px 'Inter', sans-serif";
        ctx.fillText(`: ${data.genderLabel || (data.gender === 'nam' ? 'Dương Nam' : 'Âm Nữ')}`, metaX + 85, headY + 40);

        ctx.font = "13px 'Inter', sans-serif";
        ctx.fillStyle = "#333333";
        ctx.fillText("Dương lịch", metaX, headY + 58);
        ctx.fillStyle = "#c0392b";
        ctx.font = "bold 13px 'Inter', sans-serif";
        ctx.fillText(`: ${data.solarStr || '-'}`, metaX + 85, headY + 58);

        ctx.font = "13px 'Inter', sans-serif";
        ctx.fillStyle = "#333333";
        ctx.fillText("Âm lịch", metaX, headY + 76);
        ctx.fillStyle = "#27ae60";
        ctx.font = "bold 13px 'Inter', sans-serif";
        ctx.fillText(`: ${data.lunarStr || '-'}`, metaX + 85, headY + 76);

        ctx.font = "13px 'Inter', sans-serif";
        ctx.fillStyle = "#333333";
        ctx.fillText("Nạp âm", metaX, headY + 94);
        ctx.fillStyle = "#27ae60";
        ctx.font = "bold 13px 'Inter', sans-serif";
        ctx.fillText(`: ${data.banMenhNaYin || '-'}`, metaX + 85, headY + 94);

        // Header bottom divider
        ctx.strokeStyle = "#2980B9";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(14, headY + headH + 8);
        ctx.lineTo(W - 14, headY + headH + 8);
        ctx.stroke();

        // ==========================================
        // 3. BẢNG TỨ TRỤ (4 PILLARS TABLE)
        // ==========================================
        const tblX = 14;
        const tblY = headY + headH + 12;
        const colLabelW = 130;
        const colW = (W - 28 - colLabelW) / 4; // ~252px per pillar column

        const rowDefs = [
            { label: "DƯƠNG LỊCH", h: 36, key: "solar" },
            { label: "CHỦ TINH", h: 36, key: "chuTinh" },
            { label: "BÁT TỰ", h: 86, key: "batTu" },
            { label: "TÀNG ẨN", h: 36, key: "tangAn" },
            { label: "PHÓ TINH", h: 36, key: "phoTinh" },
            { label: "THẦN SÁT", h: 86, key: "thanSat" },
            { label: "NẠP ÂM", h: 36, key: "napAm" }
        ];

        const pillarKeys = ["year", "month", "day", "time"];
        const pData = data.pillars || {};

        let curY = tblY;

        rowDefs.forEach((row, rIdx) => {
            // Draw Label Box
            ctx.fillStyle = "#F4F9FD";
            ctx.fillRect(tblX, curY, colLabelW, row.h);
            ctx.strokeStyle = "#2980B9";
            ctx.lineWidth = 1;
            ctx.strokeRect(tblX, curY, colLabelW, row.h);

            ctx.fillStyle = "#0A3871";
            ctx.font = "bold 13px 'Inter', sans-serif";
            ctx.textAlign = "center";
            ctx.fillText(row.label, tblX + colLabelW / 2, curY + row.h / 2 + 5);

            // Draw 4 Pillar Cells
            pillarKeys.forEach((pk, cIdx) => {
                const cx = tblX + colLabelW + cIdx * colW;
                ctx.fillStyle = (rIdx % 2 === 0) ? "#FFFFFF" : "#FCFDFE";
                ctx.fillRect(cx, curY, colW, row.h);
                ctx.strokeStyle = "#2980B9";
                ctx.lineWidth = 1;
                ctx.strokeRect(cx, curY, colW, row.h);

                const item = pData[pk] || {};

                if (row.key === "solar") {
                    ctx.fillStyle = "#333333";
                    ctx.font = "14px 'Inter', sans-serif";
                    const val = pk === "year" ? item.solarYear : (pk === "month" ? (item.solarMonth < 10 ? '0' + item.solarMonth : item.solarMonth) : (pk === "day" ? (item.solarDay < 10 ? '0' + item.solarDay : item.solarDay) : item.solarTime));
                    ctx.fillText(String(val || '-'), cx + colW / 2, curY + 23);

                } else if (row.key === "chuTinh") {
                    const ct = item.chuTinh || '-';
                    ctx.fillStyle = ct === "NHẬT CHỦ" ? "#0A3871" : "#333333";
                    ctx.font = ct === "NHẬT CHỦ" ? "900 14px 'Inter', sans-serif" : "bold 13.5px 'Inter', sans-serif";
                    ctx.fillText(ct, cx + colW / 2, curY + 23);

                } else if (row.key === "batTu") {
                    // Render Can Chi to rõ ràng (Màu theo ngũ hành)
                    const stem = item.stem || '';
                    const branch = item.branch || '';
                    const sColor = getStemColor(stem);
                    const bColor = getBranchColor(branch);

                    ctx.font = "900 24px 'Be Vietnam Pro', 'Inter', sans-serif";
                    ctx.fillStyle = sColor;
                    ctx.fillText(stem.toUpperCase(), cx + colW / 2, curY + 34);

                    ctx.fillStyle = bColor;
                    ctx.fillText(branch.toUpperCase(), cx + colW / 2, curY + 68);

                } else if (row.key === "tangAn") {
                    const hidden = item.hiddenStems || [];
                    if (hidden.length > 0) {
                        const stepX = colW / (hidden.length + 1);
                        hidden.forEach((hStem, hIdx) => {
                            ctx.fillStyle = getStemColor(hStem);
                            ctx.font = "bold 13px 'Inter', sans-serif";
                            ctx.fillText(hStem, cx + (hIdx + 1) * stepX, curY + 23);
                        });
                    } else {
                        ctx.fillStyle = "#888888";
                        ctx.fillText("-", cx + colW / 2, curY + 23);
                    }

                } else if (row.key === "phoTinh") {
                    const phos = item.phoTinh || [];
                    if (phos.length > 0) {
                        const stepX = colW / (phos.length + 1);
                        phos.forEach((pVal, pIdx) => {
                            ctx.fillStyle = "#333333";
                            ctx.font = "12.5px 'Inter', sans-serif";
                            ctx.fillText(pVal, cx + (pIdx + 1) * stepX, curY + 23);
                        });
                    } else {
                        ctx.fillStyle = "#888888";
                        ctx.fillText("-", cx + colW / 2, curY + 23);
                    }

                } else if (row.key === "thanSat") {
                    const tsList = item.thanSat || [];
                    ctx.font = "12.5px 'Inter', sans-serif";
                    let sy = curY + 20;
                    if (tsList.length > 0) {
                        tsList.forEach(ts => {
                            if (sy <= curY + row.h - 10) {
                                ctx.fillStyle = ["Thiên Ất", "Thái Cực", "Phúc Tinh", "Nguyệt Đức", "Thiên Đức", "Tướng Tinh", "Hoa Cái"].includes(ts) ? "#0A3871" : "#8e5a2b";
                                ctx.fillText(ts, cx + colW / 2, sy);
                                sy += 20;
                            }
                        });
                    } else {
                        ctx.fillStyle = "#aaaaaa";
                        ctx.fillText("-", cx + colW / 2, curY + row.h / 2 + 4);
                    }

                } else if (row.key === "napAm") {
                    ctx.fillStyle = "#27ae60";
                    ctx.font = "bold 13px 'Inter', sans-serif";
                    ctx.fillText(item.nayin || '-', cx + colW / 2, curY + 23);
                }
            });

            curY += row.h;
        });

        // ==========================================
        // 4. PHẦN ĐẠI VẬN & LƯU NIÊN (10 CỘT x 10 NĂM)
        // ==========================================
        curY += 10;
        const dyHeaderY = curY;
        
        ctx.fillStyle = "#0A3871";
        ctx.font = "900 17px 'Be Vietnam Pro', 'Inter', sans-serif";
        ctx.textAlign = "left";
        ctx.fillText("Đại vận lưu niên", tblX + 8, curY + 16);

        ctx.font = "12px 'Inter', sans-serif";
        ctx.fillStyle = "#333333";
        ctx.fillText(data.yun?.summaryText || "Khởi Đại Vận theo Tiết Khí", tblX + 8, curY + 34);

        curY += 44;

        const daYunList = data.daYun || [];
        const dyColW = (W - 28 - colLabelW) / 5; // 5 columns per row = ~201px each
        const dyRowH = 345; // Height for each 5-pillar block

        // 2 Hàng Đại Vận (Hàng 1: index 0..4, Hàng 2: index 5..9)
        const row1 = daYunList.slice(0, 5);
        const row2 = daYunList.slice(5, 10);

        [row1, row2].forEach((rowGroup, gIdx) => {
            if (rowGroup.length === 0) return;

            const gY = curY + gIdx * (dyRowH + 6);

            // Left Label Box for Group
            ctx.fillStyle = "#F4F9FD";
            ctx.fillRect(tblX, gY, colLabelW, dyRowH);
            ctx.strokeStyle = "#2980B9";
            ctx.lineWidth = 1;
            ctx.strokeRect(tblX, gY, colLabelW, dyRowH);

            ctx.fillStyle = "#0A3871";
            ctx.font = "900 15px 'Inter', sans-serif";
            ctx.textAlign = "center";
            ctx.fillText(gIdx === 0 ? "ĐẠI VẬN (1 - 5)" : "ĐẠI VẬN (6 - 10)", tblX + colLabelW / 2, gY + dyRowH / 2);

            // 5 Columns
            rowGroup.forEach((dy, cIdx) => {
                const dyX = tblX + colLabelW + cIdx * dyColW;

                // Outer Box
                ctx.fillStyle = "#FFFFFF";
                ctx.fillRect(dyX, gY, dyColW, dyRowH);
                ctx.strokeStyle = "#2980B9";
                ctx.lineWidth = 1;
                ctx.strokeRect(dyX, gY, dyColW, dyRowH);

                // Header of DaYun (Start Month/Year - Age & Stem Branch - ShiShen)
                ctx.fillStyle = "#FFF9ED";
                ctx.fillRect(dyX, gY, dyColW, 46);
                ctx.strokeStyle = "#2980B9";
                ctx.strokeRect(dyX, gY, dyColW, 46);

                ctx.fillStyle = "#8B0000";
                ctx.font = "bold 12.5px 'Inter', sans-serif";
                ctx.textAlign = "center";
                const startM = data.yun?.startMonthNum || 6;
                const mStr = startM < 10 ? '0' + startM : startM;
                ctx.fillText(`${mStr}/${dy.startYear} — ${dy.startAge}t`, dyX + dyColW / 2, gY + 18);

                // Can Chi Đại Vận & Thập Thần
                ctx.fillStyle = dy.stemColor || "#27ae60";
                ctx.font = "bold 13.5px 'Inter', sans-serif";
                ctx.fillText(`${dy.ganZhi} - ${dy.shiShen}`, dyX + dyColW / 2, gY + 38);

                // 10 Dòng Lưu Niên
                let lny = gY + 66;
                const lnList = dy.liuNian || [];
                lnList.forEach(ln => {
                    ctx.fillStyle = "#333333";
                    ctx.font = "12px 'Inter', sans-serif";
                    ctx.textAlign = "left";
                    ctx.fillText(`${ln.year} - ${ln.ganZhi} - ${ln.shiShen}`, dyX + 18, lny);
                    lny += 27;
                });
            });
        });

        // ==========================================
        // 5. FOOTER BLOCK (Legend & Contact)
        // ==========================================
        const footY = H - 42;
        ctx.fillStyle = "#0A3871";
        ctx.font = "bold 12.5px 'Be Vietnam Pro', 'Inter', sans-serif";
        ctx.textAlign = "left";
        ctx.fillText("Dịch Sư Nguyễn Huy Hoàng — Zalo: 0933116860 — Sacombank: 060216644258", tblX + 8, footY + 18);

        // Chú giải màu Ngũ Hành
        ctx.textAlign = "right";
        ctx.font = "bold 12px 'Inter', sans-serif";
        const legendX = W - 28;
        
        ctx.fillStyle = "#8e5a2b";
        ctx.fillText("■ Thổ", legendX, footY + 18);
        ctx.fillStyle = "#c0392b";
        ctx.fillText("■ Hỏa  ", legendX - 50, footY + 18);
        ctx.fillStyle = "#2980b9";
        ctx.fillText("■ Thủy  ", legendX - 105, footY + 18);
        ctx.fillStyle = "#27ae60";
        ctx.fillText("■ Mộc  ", legendX - 165, footY + 18);
        ctx.fillStyle = "#7f8c8d";
        ctx.fillText("■ Kim  ", legendX - 225, footY + 18);

        return canvas.toDataURL("image/png");
    }

    global.BatTuPngExporter = {
        drawBatTuChart
    };

})(typeof window !== "undefined" ? window : globalThis);
