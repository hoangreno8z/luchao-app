/**
 * Trình Xuất Ảnh & Vẽ Lá Số Bát Tự HD Canvas — Dịch Sư Nguyễn Huy Hoàng
 * Chuẩn hóa tối đa không gian, chữ to rõ nét, loại bỏ viền dày & khoảng trống thừa
 * Hỗ trợ Nút Gạt:
 * - OFF: Hiển thị 10 năm trong 1 Đại Vận gần nhất (chữ to, nét, tối ưu mobile)
 * - ON: Hiển thị 100 năm trong 10 Đại Vận
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
     * is100Years: false (10 năm gần nhất) | true (100 năm toàn cảnh)
     */
    function drawBatTuChart(data, is100Years = false) {
        if (!data) return "";

        const canvas = document.createElement("canvas");
        
        // Kích thước chuẩn tối ưu không gian
        const W = 1100;
        const H = is100Years ? 1340 : 880;
        canvas.width = W * 2;
        canvas.height = H * 2;
        const ctx = canvas.getContext("2d");
        if (!ctx) return "";

        ctx.scale(2, 2);

        // 1. Nền & Viền mỏng gọn gàng
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0, 0, W, H);

        ctx.strokeStyle = "#1A5276";
        ctx.lineWidth = 2;
        ctx.strokeRect(6, 6, W - 12, H - 12);

        ctx.strokeStyle = "#2980B9";
        ctx.lineWidth = 1;
        ctx.strokeRect(9, 9, W - 18, H - 18);

        // ==========================================
        // 2. HEADER BANNER
        // ==========================================
        const headY = 16;
        
        // Left Branding
        ctx.fillStyle = "#0A3871";
        ctx.font = "900 21px 'Be Vietnam Pro', sans-serif";
        ctx.textAlign = "left";
        ctx.fillText("☯ DỊCH SƯ NGUYỄN HUY HOÀNG", 18, headY + 26);

        ctx.fillStyle = "#8B0000";
        ctx.font = "bold 13.5px 'Inter', sans-serif";
        ctx.fillText("Zalo: 0933 116 860  •  Facebook: Hoàng ngủ mơ", 18, headY + 48);

        ctx.fillStyle = "#555555";
        ctx.font = "12px 'Inter', sans-serif";
        ctx.fillText("Chuyên gia Bát Tự — Tử Bình — Cải Vận Bổ Khuyết", 18, headY + 68);

        // Center Title
        ctx.fillStyle = "#0A3871";
        ctx.font = "900 24px 'Be Vietnam Pro', sans-serif";
        ctx.textAlign = "center";
        ctx.fillText("TỨ TRỤ MỆNH BÀN", 510, headY + 30);

        ctx.fillStyle = "#2980B9";
        ctx.font = "bold 15px 'Be Vietnam Pro', sans-serif";
        ctx.fillText("LÁ SỐ BÁT TỰ", 510, headY + 58);

        // Right Metadata
        const metaX = 720;
        ctx.textAlign = "left";
        ctx.font = "13px 'Inter', sans-serif";

        ctx.fillStyle = "#555555";
        ctx.fillText("Họ và tên", metaX, headY + 18);
        ctx.fillStyle = "#0A3871";
        ctx.font = "bold 14px 'Inter', sans-serif";
        ctx.fillText(`: ${data.name || 'VÔ DANH KHÁCH'}`, metaX + 85, headY + 18);

        ctx.fillStyle = "#555555";
        ctx.fillText("Giới tính", metaX, headY + 38);
        ctx.fillStyle = "#27ae60";
        ctx.font = "bold 13.5px 'Inter', sans-serif";
        ctx.fillText(`: ${data.genderLabel || 'Nam Mệnh'}`, metaX + 85, headY + 38);

        ctx.fillStyle = "#555555";
        ctx.fillText("Dương lịch", metaX, headY + 58);
        ctx.fillStyle = "#c0392b";
        ctx.font = "bold 13px 'Inter', sans-serif";
        ctx.fillText(`: ${data.solarStr || ''}`, metaX + 85, headY + 58);

        ctx.fillStyle = "#555555";
        ctx.fillText("Âm lịch", metaX, headY + 78);
        ctx.fillStyle = "#2980b9";
        ctx.font = "bold 13px 'Inter', sans-serif";
        ctx.fillText(`: ${data.lunarStr || ''}`, metaX + 85, headY + 78);

        // ==========================================
        // 3. BẢNG TỨ TRỤ (CANH CHUẨN TỐI ƯU KHÔNG GIAN)
        // ==========================================
        const tblX = 14;
        const tblY = 104;
        const tblW = W - 28;
        const colLabelW = 115;
        const colW = (tblW - colLabelW) / 4;

        const rows = [
            { label: "DƯƠNG LỊCH", h: 32, key: "solar" },
            { label: "CHỦ TINH", h: 36, key: "chuTinh" },
            { label: "BÁT TỰ", h: 68, key: "batTu" },
            { label: "TÀNG ẨN", h: 36, key: "tangAn" },
            { label: "PHÓ TINH", h: 36, key: "phoTinh" },
            { label: "TRƯỜNG SINH", h: 34, key: "truongSinh" },
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
            // Nhãn hàng bên trái
            ctx.fillStyle = "#F4F9FD";
            ctx.fillRect(tblX, curY, colLabelW, row.h);
            ctx.strokeStyle = "#2980B9";
            ctx.strokeRect(tblX, curY, colLabelW, row.h);

            ctx.fillStyle = "#0A3871";
            ctx.font = "bold 12.5px 'Be Vietnam Pro', sans-serif";
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
                    ctx.font = "bold 14px 'Inter', sans-serif";
                    ctx.fillText(String(item.solarValue || ''), cx + colW / 2, curY + row.h / 2 + 5);

                } else if (row.key === "chuTinh") {
                    if (colIdx === 2) {
                        ctx.fillStyle = "#c0392b";
                        ctx.font = "900 14px 'Inter', sans-serif";
                        ctx.fillText("NHẬT CHỦ", cx + colW / 2, curY + row.h / 2 + 5);
                    } else {
                        ctx.fillStyle = "#1A5276";
                        ctx.font = "bold 14px 'Inter', sans-serif";
                        ctx.fillText(item.shiShen || "-", cx + colW / 2, curY + row.h / 2 + 5);
                    }

                } else if (row.key === "batTu") {
                    // Chữ Bát Tự TO ĐẬM RÕ RÀNG
                    ctx.font = "900 27px 'Be Vietnam Pro', sans-serif";
                    ctx.fillStyle = getStemColor(item.stem);
                    ctx.fillText(item.stem, cx + colW / 2, curY + 30);

                    ctx.fillStyle = getBranchColor(item.branch);
                    ctx.fillText(item.branch, cx + colW / 2, curY + 58);

                } else if (row.key === "tangAn") {
                    ctx.font = "bold 13.5px 'Inter', sans-serif";
                    const hidden = item.hiddenStems || [];
                    if (hidden.length > 0) {
                        const step = colW / (hidden.length + 1);
                        hidden.forEach((hs, hIdx) => {
                            ctx.fillStyle = getStemColor(hs);
                            ctx.fillText(hs, cx + (hIdx + 1) * step, curY + row.h / 2 + 5);
                        });
                    } else {
                        ctx.fillStyle = "#999999";
                        ctx.fillText("-", cx + colW / 2, curY + row.h / 2 + 5);
                    }

                } else if (row.key === "phoTinh") {
                    ctx.font = "600 12.5px 'Inter', sans-serif";
                    ctx.fillStyle = "#555555";
                    const hiddenShiShen = item.hiddenShiShen || [];
                    if (hiddenShiShen.length > 0) {
                        const step = colW / (hiddenShiShen.length + 1);
                        hiddenShiShen.forEach((hss, hIdx) => {
                            ctx.fillText(hss, cx + (hIdx + 1) * step, curY + row.h / 2 + 5);
                        });
                    } else {
                        ctx.fillText("-", cx + colW / 2, curY + row.h / 2 + 5);
                    }

                } else if (row.key === "truongSinh") {
                    ctx.fillStyle = "#0A3871";
                    ctx.font = "bold 13.5px 'Inter', sans-serif";
                    ctx.fillText(item.trangSinh || "-", cx + colW / 2, curY + row.h / 2 + 5);

                } else if (row.key === "thanSat") {
                    const stars = item.stars || [];
                    if (stars.length > 0) {
                        ctx.fillStyle = "#2980b9";
                        ctx.font = "600 12px 'Inter', sans-serif";
                        stars.slice(0, 3).forEach((st, sIdx) => {
                            ctx.fillText(st, cx + colW / 2, curY + 15 + sIdx * 14);
                        });
                    } else {
                        ctx.fillStyle = "#aaaaaa";
                        ctx.fillText("-", cx + colW / 2, curY + row.h / 2 + 5);
                    }

                } else if (row.key === "napAm") {
                    ctx.fillStyle = "#27ae60";
                    ctx.font = "bold 13.5px 'Inter', sans-serif";
                    ctx.fillText(item.nayin || '-', cx + colW / 2, curY + 23);
                }
            });

            curY += row.h;
        });

        // ==========================================
        // 4. PHẦN ĐẠI VẬN & LƯU NIÊN
        // ==========================================
        curY += 10;
        
        ctx.fillStyle = "#0A3871";
        ctx.font = "900 16px 'Be Vietnam Pro', sans-serif";
        ctx.textAlign = "left";
        ctx.fillText("ĐẠI VẬN & LƯU NIÊN", tblX + 4, curY + 15);

        ctx.font = "12px 'Inter', sans-serif";
        ctx.fillStyle = "#555555";
        ctx.fillText(data.yun?.summaryText || "Khởi Đại Vận theo Tiết Khí", tblX + 4, curY + 32);

        curY += 40;

        const daYunList = data.daYun || [];
        const currentAge = 2026 - (data.solarYear || 1994) + 1;

        if (!is100Years) {
            // ========================================================
            // CHẾ ĐỘ 10 NĂM TRONG 1 ĐẠI VẬN GẦN NHẤT (CHỮ TO NÉT CỰC ĐẸP)
            // ========================================================
            const col10W = (tblW - colLabelW) / 10;
            const dyBoxH = 88;

            // Nhãn 10 Đại Vận
            ctx.fillStyle = "#F4F9FD";
            ctx.fillRect(tblX, curY, colLabelW, dyBoxH);
            ctx.strokeStyle = "#2980B9";
            ctx.strokeRect(tblX, curY, colLabelW, dyBoxH);

            ctx.fillStyle = "#0A3871";
            ctx.font = "900 13.5px 'Be Vietnam Pro', sans-serif";
            ctx.textAlign = "center";
            ctx.fillText("10 ĐẠI VẬN", tblX + colLabelW / 2, curY + 38);
            ctx.font = "bold 12px 'Inter', sans-serif";
            ctx.fillStyle = "#c0392b";
            ctx.fillText("(TUỔI & NĂM)", tblX + colLabelW / 2, curY + 58);

            // 10 Cột Đại Vận
            daYunList.slice(0, 10).forEach((dy, idx) => {
                const dyX = tblX + colLabelW + idx * col10W;
                const endAge = dy.startAge + 9;
                const isActive = (currentAge >= dy.startAge && currentAge <= endAge);

                ctx.fillStyle = isActive ? "#FFF4DE" : (idx % 2 === 0 ? "#FFFFFF" : "#F9FBFE");
                ctx.fillRect(dyX, curY, col10W, dyBoxH);
                ctx.strokeStyle = isActive ? "#D4AF37" : "#2980B9";
                ctx.lineWidth = isActive ? 2 : 1;
                ctx.strokeRect(dyX, curY, col10W, dyBoxH);

                // Can Chi Đại Vận
                ctx.fillStyle = dy.stemColor || "#27ae60";
                ctx.font = "900 17px 'Be Vietnam Pro', sans-serif";
                ctx.textAlign = "center";
                ctx.fillText(dy.ganZhi, dyX + col10W / 2, curY + 26);

                // Thập thần Đại Vận
                ctx.fillStyle = "#1A5276";
                ctx.font = "bold 12.5px 'Inter', sans-serif";
                ctx.fillText(dy.shiShen, dyX + col10W / 2, curY + 46);

                // Tuổi
                ctx.fillStyle = "#c0392b";
                ctx.font = "900 12.5px 'Inter', sans-serif";
                ctx.fillText(`${dy.startAge}-${endAge}t`, dyX + col10W / 2, curY + 65);

                // Năm bắt đầu
                ctx.fillStyle = "#555555";
                ctx.font = "500 11px 'Inter', sans-serif";
                ctx.fillText(String(dy.startYear), dyX + col10W / 2, curY + 80);
            });

            curY += dyBoxH + 8;

            // Hàng 10 Năm Lưu Niên (Đại Vận Gần Nhất / Hiện Tại)
            const activeDaYun = daYunList.find(d => currentAge >= d.startAge && currentAge <= d.startAge + 9) || daYunList[0];
            if (activeDaYun && activeDaYun.liuNian) {
                const lnBoxH = 82;

                ctx.fillStyle = "#F4F9FD";
                ctx.fillRect(tblX, curY, colLabelW, lnBoxH);
                ctx.strokeStyle = "#2980B9";
                ctx.strokeRect(tblX, curY, colLabelW, lnBoxH);

                ctx.fillStyle = "#0A3871";
                ctx.font = "900 13px 'Be Vietnam Pro', sans-serif";
                ctx.textAlign = "center";
                ctx.fillText("LƯU NIÊN", tblX + colLabelW / 2, curY + 36);
                ctx.font = "bold 11px 'Inter', sans-serif";
                ctx.fillStyle = "#27ae60";
                ctx.fillText(`(${activeDaYun.ganZhi})`, tblX + colLabelW / 2, curY + 56);

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
                    ctx.font = "bold 14px 'Be Vietnam Pro', sans-serif";
                    ctx.textAlign = "center";
                    ctx.fillText(ln.ganZhi, lnX + col10W / 2, curY + 24);

                    // Năm DL
                    ctx.fillStyle = isCurYear ? "#b91c1c" : "#111827";
                    ctx.font = "bold 12.5px 'Inter', sans-serif";
                    ctx.fillText(String(ln.year), lnX + col10W / 2, curY + 44);

                    // Tuổi
                    const ageNum = ln.year - (data.solarYear || 1994) + 1;
                    ctx.fillStyle = "#c0392b";
                    ctx.font = "900 11.5px 'Inter', sans-serif";
                    ctx.fillText(`${ageNum}t`, lnX + col10W / 2, curY + 62);

                    // Thập thần
                    ctx.fillStyle = "#555555";
                    ctx.font = "500 11px 'Inter', sans-serif";
                    ctx.fillText(ln.shiShen, lnX + col10W / 2, curY + 76);
                });

                curY += lnBoxH + 8;
            }

            // Bảng Thần Sát Nguyên Cục
            const tsH = 70;
            ctx.fillStyle = "#F4F9FD";
            ctx.fillRect(tblX, curY, colLabelW, tsH);
            ctx.strokeStyle = "#2980B9";
            ctx.strokeRect(tblX, curY, colLabelW, tsH);

            ctx.fillStyle = "#0A3871";
            ctx.font = "900 12.5px 'Be Vietnam Pro', sans-serif";
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
                ctx.font = "bold 12px 'Inter', sans-serif";
                ctx.textAlign = "center";
                ctx.fillText(tsHeaders[idx], tsX + tsColW / 2, curY + 20);

                ctx.fillStyle = "#2980b9";
                ctx.font = "600 12px 'Inter', sans-serif";
                const stars = p.stars || [];
                if (stars.length > 0) {
                    ctx.fillText(stars.slice(0, 2).join(' • '), tsX + tsColW / 2, curY + 46);
                } else {
                    ctx.fillStyle = "#999999";
                    ctx.fillText("-", tsX + tsColW / 2, curY + 46);
                }
            });

        } else {
            // ========================================================
            // CHẾ ĐỘ 100 NĂM TRONG 10 ĐẠI VẬN (2 HÀNG x 5 CỘT)
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
                    ctx.font = "bold 13px 'Inter', sans-serif";
                    ctx.textAlign = "center";
                    const startM = data.yun?.startMonthNum || 6;
                    const mStr = startM < 10 ? '0' + startM : startM;
                    ctx.fillText(`${mStr}/${dy.startYear} — ${dy.startAge}-${endAge}t`, dyX + dyColW / 2, gY + 18);

                    ctx.fillStyle = dy.stemColor || "#27ae60";
                    ctx.font = "bold 14px 'Inter', sans-serif";
                    ctx.fillText(`${dy.ganZhi} - ${dy.shiShen}`, dyX + dyColW / 2, gY + 38);

                    let lny = gY + 66;
                    const lnList = dy.liuNian || [];
                    lnList.forEach(ln => {
                        const lnAge = ln.year - (data.solarYear || 1994) + 1;
                        ctx.fillStyle = "#333333";
                        ctx.font = "12.5px 'Inter', sans-serif";
                        ctx.textAlign = "left";
                        ctx.fillText(`${ln.year} (${lnAge}t) - ${ln.ganZhi} - ${ln.shiShen}`, dyX + 8, lny);
                        lny += 27;
                    });
                });
            });
        }

        // ==========================================
        // 5. CHÚ GIẢI NGŨ HÀNH (Không còn dòng thừa)
        // ==========================================
        const footY = H - 24;
        ctx.textAlign = "right";
        ctx.font = "bold 12px 'Inter', sans-serif";
        const legendX = W - 20;
        
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
