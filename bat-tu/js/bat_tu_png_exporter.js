/**
 * Trình Xuất Ảnh & Vẽ Lá Số Bát Tự HD Canvas — Dịch Sư Nguyễn Huy Hoàng
 * Hỗ trợ 2 chế độ:
 * 1. Chế độ 10 Đại Vận Tinh Gọn (Bố cục Mệnh Bàn chuẩn phong cách mới, chữ to rõ ràng)
 * 2. Chế độ 100 Năm Lưu Niên Toàn Cảnh
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
     * Vẽ Lá Số Bát Tự lên Canvas 2D
     * viewMode: 'compact' (10 Đại Vận Mệnh Bàn) | 'full100' (100 Năm Lưu Niên)
     */
    function drawBatTuChart(data, viewMode = 'compact') {
        if (!data) return "";

        const canvas = document.createElement("canvas");
        const isFull100 = (viewMode === 'full100');
        
        const W = 1200;
        const H = isFull100 ? 1420 : 1060;
        canvas.width = W * 2;
        canvas.height = H * 2;
        const ctx = canvas.getContext("2d");
        if (!ctx) return "";

        ctx.scale(2, 2);

        // 1. Background
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0, 0, W, H);

        // Viền kép sang trọng
        ctx.strokeStyle = "#1A5276";
        ctx.lineWidth = 3;
        ctx.strokeRect(8, 8, W - 16, H - 16);

        ctx.strokeStyle = "#2980B9";
        ctx.lineWidth = 1;
        ctx.strokeRect(12, 12, W - 24, H - 24);

        // ==========================================
        // 2. HEADER SECTION (Top Banner)
        // ==========================================
        const headY = 18;
        
        // Left Branding
        ctx.fillStyle = "#0A3871";
        ctx.font = "900 21px 'Be Vietnam Pro', sans-serif";
        ctx.textAlign = "left";
        ctx.fillText("☯ DỊCH SƯ NGUYỄN HUY HOÀNG", 24, headY + 30);

        ctx.fillStyle = "#8B0000";
        ctx.font = "bold 13.5px 'Inter', sans-serif";
        ctx.fillText("Zalo: 0933 116 860  •  Facebook: Hoàng ngủ mơ", 24, headY + 52);

        ctx.fillStyle = "#555555";
        ctx.font = "12px 'Inter', sans-serif";
        ctx.fillText("Chuyên gia Bát Tự — Tử Bình — Cải Vận Bổ Khuyết", 24, headY + 72);

        // Center Title
        ctx.fillStyle = "#0A3871";
        ctx.font = "900 24px 'Be Vietnam Pro', sans-serif";
        ctx.textAlign = "center";
        ctx.fillText("TỨ TRỤ MỆNH BÀN", 540, headY + 34);

        ctx.fillStyle = "#2980B9";
        ctx.font = "bold 16px 'Be Vietnam Pro', sans-serif";
        ctx.fillText("LÁ SỐ BÁT TỰ", 540, headY + 64);

        // Right Metadata
        const metaX = 780;
        ctx.textAlign = "left";
        ctx.font = "13px 'Inter', sans-serif";

        ctx.fillStyle = "#555555";
        ctx.fillText("Họ và tên", metaX, headY + 22);
        ctx.fillStyle = "#0A3871";
        ctx.font = "bold 14px 'Inter', sans-serif";
        ctx.fillText(`: ${data.name || 'VÔ DANH KHÁCH'}`, metaX + 90, headY + 22);

        ctx.font = "13px 'Inter', sans-serif";
        ctx.fillStyle = "#555555";
        ctx.fillText("Giới tính", metaX, headY + 42);
        ctx.fillStyle = "#27ae60";
        ctx.font = "bold 13px 'Inter', sans-serif";
        ctx.fillText(`: ${data.genderLabel || 'Nam Mệnh'}`, metaX + 90, headY + 42);

        ctx.font = "13px 'Inter', sans-serif";
        ctx.fillStyle = "#555555";
        ctx.fillText("Dương lịch", metaX, headY + 62);
        ctx.fillStyle = "#c0392b";
        ctx.font = "bold 13px 'Inter', sans-serif";
        ctx.fillText(`: ${data.solarStr || ''}`, metaX + 90, headY + 62);

        ctx.font = "13px 'Inter', sans-serif";
        ctx.fillStyle = "#555555";
        ctx.fillText("Âm lịch", metaX, headY + 82);
        ctx.fillStyle = "#2980b9";
        ctx.font = "bold 13px 'Inter', sans-serif";
        ctx.fillText(`: ${data.lunarStr || ''}`, metaX + 90, headY + 82);

        // ==========================================
        // 3. BẢNG TỨ TRỤ (4 CỘT CHÍNH)
        // ==========================================
        const tblX = 20;
        const tblY = 118;
        const tblW = W - 40;
        const colLabelW = 120;
        const colW = (tblW - colLabelW) / 4;

        const rows = [
            { label: "DƯƠNG LỊCH", h: 32, key: "solar" },
            { label: "CHỦ TINH", h: 36, key: "chuTinh" },
            { label: "BÁT TỰ", h: 62, key: "batTu" },
            { label: "TÀNG ẨN", h: 34, key: "tangAn" },
            { label: "PHÓ TINH", h: 34, key: "phoTinh" },
            { label: "TRƯỜNG SINH", h: 32, key: "truongSinh" },
            { label: "THẦN SÁT", h: 48, key: "thanSat" },
            { label: "NẠP ÂM", h: 34, key: "napAm" }
        ];

        let curY = tblY;

        // Vẽ Header Cột
        ctx.fillStyle = "#0A3871";
        ctx.fillRect(tblX, curY, colLabelW, 36);
        ctx.strokeStyle = "#2980B9";
        ctx.lineWidth = 1;
        ctx.strokeRect(tblX, curY, colLabelW, 36);

        ctx.fillStyle = "#FFFFFF";
        ctx.font = "bold 14px 'Be Vietnam Pro', sans-serif";
        ctx.textAlign = "center";
        ctx.fillText("TRỤ", tblX + colLabelW / 2, curY + 23);

        const pillarTitles = ["NĂM (NIÊN)", "THÁNG (NGUYỆT)", "NGÀY (NHẬT)", "GIỜ (THỜI)"];
        pillarTitles.forEach((t, i) => {
            const cx = tblX + colLabelW + i * colW;
            ctx.fillStyle = "#0A3871";
            ctx.fillRect(cx, curY, colW, 36);
            ctx.strokeStyle = "#2980B9";
            ctx.strokeRect(cx, curY, colW, 36);

            ctx.fillStyle = "#FFFFFF";
            ctx.font = "bold 14px 'Be Vietnam Pro', sans-serif";
            ctx.fillText(t, cx + colW / 2, curY + 23);
        });

        curY += 36;

        // Vẽ từng hàng dữ liệu Tứ Trụ
        const pillars = [data.pillars.year, data.pillars.month, data.pillars.day, data.pillars.time];

        rows.forEach(row => {
            // Cột Nhãn bên trái
            ctx.fillStyle = "#F4F9FD";
            ctx.fillRect(tblX, curY, colLabelW, row.h);
            ctx.strokeStyle = "#2980B9";
            ctx.strokeRect(tblX, curY, colLabelW, row.h);

            ctx.fillStyle = "#0A3871";
            ctx.font = "bold 12px 'Be Vietnam Pro', sans-serif";
            ctx.textAlign = "center";
            ctx.fillText(row.label, tblX + colLabelW / 2, curY + row.h / 2 + 4);

            // 4 Cột Trụ
            pillars.forEach((item, colIdx) => {
                const cx = tblX + colLabelW + colIdx * colW;

                ctx.fillStyle = (colIdx % 2 === 0) ? "#FFFFFF" : "#FAFCFF";
                ctx.fillRect(cx, curY, colW, row.h);
                ctx.strokeStyle = "#2980B9";
                ctx.strokeRect(cx, curY, colW, row.h);

                ctx.textAlign = "center";

                if (row.key === "solar") {
                    ctx.fillStyle = "#111827";
                    ctx.font = "bold 13px 'Inter', sans-serif";
                    let text = "";
                    if (colIdx === 0) text = String(item.solarValue || '');
                    else if (colIdx === 1) text = String(item.solarValue || '');
                    else if (colIdx === 2) text = String(item.solarValue || '');
                    else if (colIdx === 3) text = String(item.solarValue || '');
                    ctx.fillText(text, cx + colW / 2, curY + row.h / 2 + 4);

                } else if (row.key === "chuTinh") {
                    if (colIdx === 2) {
                        ctx.fillStyle = "#c0392b";
                        ctx.font = "900 13px 'Inter', sans-serif";
                        ctx.fillText("NHẬT CHỦ", cx + colW / 2, curY + row.h / 2 + 4);
                    } else {
                        ctx.fillStyle = "#1A5276";
                        ctx.font = "bold 13px 'Inter', sans-serif";
                        ctx.fillText(item.shiShen || "-", cx + colW / 2, curY + row.h / 2 + 4);
                    }

                } else if (row.key === "batTu") {
                    // Can Chi to rõ ràng
                    ctx.font = "900 24px 'Be Vietnam Pro', sans-serif";
                    ctx.fillStyle = getStemColor(item.stem);
                    ctx.fillText(item.stem, cx + colW / 2, curY + 27);

                    ctx.fillStyle = getBranchColor(item.branch);
                    ctx.fillText(item.branch, cx + colW / 2, curY + 53);

                } else if (row.key === "tangAn") {
                    ctx.font = "bold 12.5px 'Inter', sans-serif";
                    const hidden = item.hiddenStems || [];
                    if (hidden.length > 0) {
                        const step = colW / (hidden.length + 1);
                        hidden.forEach((hs, hIdx) => {
                            ctx.fillStyle = getStemColor(hs);
                            ctx.fillText(hs, cx + (hIdx + 1) * step, curY + row.h / 2 + 4);
                        });
                    } else {
                        ctx.fillStyle = "#999999";
                        ctx.fillText("-", cx + colW / 2, curY + row.h / 2 + 4);
                    }

                } else if (row.key === "phoTinh") {
                    ctx.font = "500 11.5px 'Inter', sans-serif";
                    ctx.fillStyle = "#555555";
                    const hiddenShiShen = item.hiddenShiShen || [];
                    if (hiddenShiShen.length > 0) {
                        const step = colW / (hiddenShiShen.length + 1);
                        hiddenShiShen.forEach((hss, hIdx) => {
                            ctx.fillText(hss, cx + (hIdx + 1) * step, curY + row.h / 2 + 4);
                        });
                    } else {
                        ctx.fillText("-", cx + colW / 2, curY + row.h / 2 + 4);
                    }

                } else if (row.key === "truongSinh") {
                    ctx.fillStyle = "#0A3871";
                    ctx.font = "bold 12.5px 'Inter', sans-serif";
                    ctx.fillText(item.trangSinh || "-", cx + colW / 2, curY + row.h / 2 + 4);

                } else if (row.key === "thanSat") {
                    const stars = item.stars || [];
                    if (stars.length > 0) {
                        ctx.fillStyle = "#2980b9";
                        ctx.font = "600 11px 'Inter', sans-serif";
                        stars.slice(0, 3).forEach((st, sIdx) => {
                            ctx.fillText(st, cx + colW / 2, curY + 15 + sIdx * 14);
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
        // 4. PHẦN ĐẠI VẬN & LƯU NIÊN
        // ==========================================
        curY += 12;
        
        ctx.fillStyle = "#0A3871";
        ctx.font = "900 16px 'Be Vietnam Pro', sans-serif";
        ctx.textAlign = "left";
        ctx.fillText("ĐẠI VẬN & LƯU NIÊN", tblX + 8, curY + 16);

        ctx.font = "12px 'Inter', sans-serif";
        ctx.fillStyle = "#555555";
        ctx.fillText(data.yun?.summaryText || "Khởi Đại Vận theo Tiết Khí", tblX + 8, curY + 34);

        curY += 42;

        const daYunList = data.daYun || [];

        if (!isFull100) {
            // ========================================================
            // CHẾ ĐỘ 10 ĐẠI VẬN TINH GỌN (MỆNH BÀN ĐỈNH CAO - CHỮ TO RÕ NÉT)
            // ========================================================
            const col10W = (tblW - colLabelW) / 10;
            const dyBoxH = 80;

            // Header Nhãn
            ctx.fillStyle = "#F4F9FD";
            ctx.fillRect(tblX, curY, colLabelW, dyBoxH);
            ctx.strokeStyle = "#2980B9";
            ctx.strokeRect(tblX, curY, colLabelW, dyBoxH);

            ctx.fillStyle = "#0A3871";
            ctx.font = "900 13px 'Be Vietnam Pro', sans-serif";
            ctx.textAlign = "center";
            ctx.fillText("10 ĐẠI VẬN", tblX + colLabelW / 2, curY + 35);
            ctx.font = "bold 11px 'Inter', sans-serif";
            ctx.fillStyle = "#c0392b";
            ctx.fillText("(TUỔI & NĂM)", tblX + colLabelW / 2, curY + 54);

            // 10 Cột Đại Vận
            daYunList.slice(0, 10).forEach((dy, idx) => {
                const dyX = tblX + colLabelW + idx * col10W;
                const endAge = dy.startAge + 9;

                // Nền nổi bật nếu là Đại Vận hiện tại (đương số đang trong tuổi này)
                const currentAge = 2026 - (data.solarYear || 1994) + 1;
                const isActive = (currentAge >= dy.startAge && currentAge <= endAge);

                ctx.fillStyle = isActive ? "#FFF4DE" : (idx % 2 === 0 ? "#FFFFFF" : "#F9FBFE");
                ctx.fillRect(dyX, curY, col10W, dyBoxH);
                ctx.strokeStyle = isActive ? "#D4AF37" : "#2980B9";
                ctx.lineWidth = isActive ? 2 : 1;
                ctx.strokeRect(dyX, curY, col10W, dyBoxH);

                // Can Chi Đại Vận
                ctx.fillStyle = dy.stemColor || "#27ae60";
                ctx.font = "900 16px 'Be Vietnam Pro', sans-serif";
                ctx.textAlign = "center";
                ctx.fillText(dy.ganZhi, dyX + col10W / 2, curY + 24);

                // Thập thần Đại Vận
                ctx.fillStyle = "#1A5276";
                ctx.font = "bold 11.5px 'Inter', sans-serif";
                ctx.fillText(dy.shiShen, dyX + col10W / 2, curY + 42);

                // Tuổi: ví dụ 4 - 13t
                ctx.fillStyle = "#c0392b";
                ctx.font = "900 11.5px 'Inter', sans-serif";
                ctx.fillText(`${dy.startAge} - ${endAge}t`, dyX + col10W / 2, curY + 59);

                // Năm bắt đầu
                ctx.fillStyle = "#555555";
                ctx.font = "500 10.5px 'Inter', sans-serif";
                ctx.fillText(String(dy.startYear), dyX + col10W / 2, curY + 73);
            });

            curY += dyBoxH + 10;

            // Hàng Lưu Niên 10 Năm Gần Nhất (Đại Vận Hiện Tại)
            const activeDaYun = daYunList.find(d => currentAge >= d.startAge && currentAge <= d.startAge + 9) || daYunList[0];
            if (activeDaYun && activeDaYun.liuNian) {
                const lnBoxH = 75;

                ctx.fillStyle = "#F4F9FD";
                ctx.fillRect(tblX, curY, colLabelW, lnBoxH);
                ctx.strokeStyle = "#2980B9";
                ctx.strokeRect(tblX, curY, colLabelW, lnBoxH);

                ctx.fillStyle = "#0A3871";
                ctx.font = "900 12px 'Be Vietnam Pro', sans-serif";
                ctx.textAlign = "center";
                ctx.fillText("LƯU NIÊN", tblX + colLabelW / 2, curY + 32);
                ctx.font = "bold 10.5px 'Inter', sans-serif";
                ctx.fillStyle = "#27ae60";
                ctx.fillText(`(ĐẠI VẬN ${activeDaYun.ganZhi})`, tblX + colLabelW / 2, curY + 50);

                activeDaYun.liuNian.slice(0, 10).forEach((ln, idx) => {
                    const lnX = tblX + colLabelW + idx * col10W;
                    const isCurYear = (ln.year === 2026);

                    ctx.fillStyle = isCurYear ? "#FFF9D2" : (idx % 2 === 0 ? "#FFFFFF" : "#F9FBFE");
                    ctx.fillRect(lnX, curY, col10W, lnBoxH);
                    ctx.strokeStyle = isCurYear ? "#D4AF37" : "#2980B9";
                    ctx.lineWidth = isCurYear ? 2 : 1;
                    ctx.strokeRect(lnX, curY, col10W, lnBoxH);

                    // Can Chi Năm
                    ctx.fillStyle = getStemColor(ln.ganZhi.split(' ')[0]);
                    ctx.font = "bold 13.5px 'Be Vietnam Pro', sans-serif";
                    ctx.textAlign = "center";
                    ctx.fillText(ln.ganZhi, lnX + col10W / 2, curY + 22);

                    // Năm DL
                    ctx.fillStyle = isCurYear ? "#b91c1c" : "#111827";
                    ctx.font = "bold 12px 'Inter', sans-serif";
                    ctx.fillText(String(ln.year), lnX + col10W / 2, curY + 40);

                    // Tuổi
                    const ageNum = ln.year - (data.solarYear || 1994) + 1;
                    ctx.fillStyle = "#c0392b";
                    ctx.font = "bold 11px 'Inter', sans-serif";
                    ctx.fillText(`${ageNum}t`, lnX + col10W / 2, curY + 56);

                    // Thập thần
                    ctx.fillStyle = "#555555";
                    ctx.font = "500 10.5px 'Inter', sans-serif";
                    ctx.fillText(ln.shiShen, lnX + col10W / 2, curY + 69);
                });

                curY += lnBoxH + 10;
            }

            // BẢNG THẦN SÁT NGUYÊN CỤC TỔNG HỢP (như ảnh mẫu)
            const tsH = 68;
            ctx.fillStyle = "#F4F9FD";
            ctx.fillRect(tblX, curY, colLabelW, tsH);
            ctx.strokeStyle = "#2980B9";
            ctx.strokeRect(tblX, curY, colLabelW, tsH);

            ctx.fillStyle = "#0A3871";
            ctx.font = "900 12px 'Be Vietnam Pro', sans-serif";
            ctx.textAlign = "center";
            ctx.fillText("THẦN SÁT", tblX + colLabelW / 2, curY + 30);
            ctx.fillText("NGUYÊN CỤC", tblX + colLabelW / 2, curY + 48);

            const tsColW = (tblW - colLabelW) / 4;
            const tsHeaders = ["NIÊN THẦN", "NGUYỆT THẦN", "NHẬT THẦN", "THỜI THẦN"];
            pillars.forEach((p, idx) => {
                const tsX = tblX + colLabelW + idx * tsColW;
                ctx.fillStyle = "#FFFFFF";
                ctx.fillRect(tsX, curY, tsColW, tsH);
                ctx.strokeStyle = "#2980B9";
                ctx.strokeRect(tsX, curY, tsColW, tsH);

                ctx.fillStyle = "#0A3871";
                ctx.font = "bold 11.5px 'Inter', sans-serif";
                ctx.textAlign = "center";
                ctx.fillText(tsHeaders[idx], tsX + tsColW / 2, curY + 18);

                ctx.fillStyle = "#2980b9";
                ctx.font = "500 11px 'Inter', sans-serif";
                const stars = p.stars || [];
                if (stars.length > 0) {
                    ctx.fillText(stars.slice(0, 2).join(' • '), tsX + tsColW / 2, curY + 42);
                } else {
                    ctx.fillStyle = "#999999";
                    ctx.fillText("-", tsX + tsColW / 2, curY + 42);
                }
            });

        } else {
            // ========================================================
            // CHẾ ĐỘ 100 NĂM LƯU NIÊN TOÀN CẢNH (2 HÀNG x 5 CỘT)
            // ========================================================
            const dyColW = (tblW - colLabelW) / 5;
            const dyRowH = 345;

            const row1 = daYunList.slice(0, 5);
            const row2 = daYunList.slice(5, 10);

            [row1, row2].forEach((rowGroup, gIdx) => {
                if (rowGroup.length === 0) return;

                const gY = curY + gIdx * (dyRowH + 6);

                ctx.fillStyle = "#F4F9FD";
                ctx.fillRect(tblX, gY, colLabelW, dyRowH);
                ctx.strokeStyle = "#2980B9";
                ctx.strokeRect(tblX, gY, colLabelW, dyRowH);

                ctx.fillStyle = "#0A3871";
                ctx.font = "900 14px 'Be Vietnam Pro', sans-serif";
                ctx.textAlign = "center";
                ctx.fillText(gIdx === 0 ? "ĐẠI VẬN (1 - 5)" : "ĐẠI VẬN (6 - 10)", tblX + colLabelW / 2, gY + dyRowH / 2);

                rowGroup.forEach((dy, cIdx) => {
                    const dyX = tblX + colLabelW + cIdx * dyColW;
                    const endAge = dy.startAge + 9;

                    ctx.fillStyle = "#FFFFFF";
                    ctx.fillRect(dyX, gY, dyColW, dyRowH);
                    ctx.strokeStyle = "#2980B9";
                    ctx.strokeRect(dyX, gY, dyColW, dyRowH);

                    // Header of DaYun
                    ctx.fillStyle = "#FFF9ED";
                    ctx.fillRect(dyX, gY, dyColW, 46);
                    ctx.strokeStyle = "#2980B9";
                    ctx.strokeRect(dyX, gY, dyColW, 46);

                    ctx.fillStyle = "#8B0000";
                    ctx.font = "bold 12.5px 'Inter', sans-serif";
                    ctx.textAlign = "center";
                    const startM = data.yun?.startMonthNum || 6;
                    const mStr = startM < 10 ? '0' + startM : startM;
                    ctx.fillText(`${mStr}/${dy.startYear} — ${dy.startAge}-${endAge}t`, dyX + dyColW / 2, gY + 18);

                    // Can Chi & Thập Thần
                    ctx.fillStyle = dy.stemColor || "#27ae60";
                    ctx.font = "bold 13.5px 'Inter', sans-serif";
                    ctx.fillText(`${dy.ganZhi} - ${dy.shiShen}`, dyX + dyColW / 2, gY + 38);

                    // 10 Dòng Lưu Niên
                    let lny = gY + 66;
                    const lnList = dy.liuNian || [];
                    lnList.forEach(ln => {
                        const lnAge = ln.year - (data.solarYear || 1994) + 1;
                        ctx.fillStyle = "#333333";
                        ctx.font = "12px 'Inter', sans-serif";
                        ctx.textAlign = "left";
                        ctx.fillText(`${ln.year} (${lnAge}t) - ${ln.ganZhi} - ${ln.shiShen}`, dyX + 10, lny);
                        lny += 27;
                    });
                });
            });
        }

        // ==========================================
        // 5. CHÚ GIẢI NGŨ HÀNH (Không còn dòng chữ footer thừa)
        // ==========================================
        const footY = H - 28;
        ctx.textAlign = "right";
        ctx.font = "bold 12px 'Inter', sans-serif";
        const legendX = W - 28;
        
        ctx.fillStyle = "#8e5a2b";
        ctx.fillText("■ Thổ", legendX, footY);
        ctx.fillStyle = "#c0392b";
        ctx.fillText("■ Hỏa  ", legendX - 50, footY);
        ctx.fillStyle = "#2980b9";
        ctx.fillText("■ Thủy  ", legendX - 105, footY);
        ctx.fillStyle = "#27ae60";
        ctx.fillText("■ Mộc  ", legendX - 165, footY);
        ctx.fillStyle = "#7f8c8d";
        ctx.fillText("■ Kim  ", legendX - 225, footY);

        return canvas.toDataURL("image/png");
    }

    global.BatTuPngExporter = {
        drawBatTuChart
    };

})(typeof window !== "undefined" ? window : globalThis);
