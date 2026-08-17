/**
 * Trình Xuất Ảnh & Vẽ Lá Số Bát Tự HD Canvas (2400x3200 px) — Dịch Sư Nguyễn Huy Hoàng
 * - Cố định 100% kích thước khung hình (2400x3200 px) cho cả 2 chế độ (20 năm và 100 năm)
 * - Tông màu nền giấy kem ngà ấm áp truyền thống (#faf6ee / #f6f0e2)
 * - Hệ màu ngũ hành chuẩn High Contrast
 * - Không có logo thừa hay tiêu đề thừa theo yêu cầu
 */

(function(global) {
    const STEM_COLORS = {
        'Giáp': '#15803d', 'Ất': '#15803d',
        'Bính': '#dc2626', 'Đinh': '#dc2626',
        'Mậu': '#92400e', 'Kỷ': '#92400e',
        'Canh': '#475569', 'Tân': '#475569',
        'Nhâm': '#1d4ed8', 'Quý': '#1d4ed8'
    };

    const BRANCH_COLORS = {
        'Dần': '#15803d', 'Mão': '#15803d',
        'Tị': '#dc2626', 'Ngọ': '#dc2626',
        'Thìn': '#92400e', 'Tuất': '#92400e', 'Sửu': '#92400e', 'Mùi': '#92400e',
        'Thân': '#475569', 'Dậu': '#475569',
        'Hợi': '#1d4ed8', 'Tý': '#1d4ed8'
    };

    function getStemColor(stem) {
        if (!stem) return '#0f172a';
        return STEM_COLORS[stem] || '#0f172a';
    }

    function getBranchColor(branch) {
        if (!branch) return '#0f172a';
        return BRANCH_COLORS[branch] || '#0f172a';
    }

    /**
     * Render Canvas Bát Tự HD Cố Định 2400 x 3200 px
     */
    function renderToCanvas(data, is100Years = false) {
        if (!data) return null;

        const width = 2400;
        const height = 3200;
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (!ctx) return null;

        // 1. Nền kem ngà ấm áp truyền thống
        ctx.fillStyle = "#faf6ee";
        ctx.fillRect(0, 0, width, height);

        const margin = 24;
        const gridW = width - margin * 2;
        const gridH = height - margin * 2;

        // Viền ngoài sang trọng
        ctx.strokeStyle = "#1e293b";
        ctx.lineWidth = 4;
        ctx.strokeRect(margin, margin, gridW, gridH);

        ctx.strokeStyle = "#cbd5e1";
        ctx.lineWidth = 1.5;
        ctx.strokeRect(margin + 6, margin + 6, gridW - 12, gridH - 12);

        // ==========================================
        // 2. HEADER: THÔNG TIN DỊCH SƯ & ĐƯƠNG SỐ
        // ==========================================
        const headY = 46;

        // Bên Trái: Thương hiệu Dịch Sư
        ctx.fillStyle = "#b91c1c";
        ctx.font = "700 44px 'Inter', 'Be Vietnam Pro', sans-serif";
        ctx.textAlign = "left";
        ctx.fillText("DỊCH SƯ NGUYỄN HUY HOÀNG", margin + 30, headY + 45);

        ctx.fillStyle = "#0f172a";
        ctx.font = "600 30px 'Inter', sans-serif";
        ctx.fillText("Zalo: 0933 116 860  •  Facebook: Hoàng ngủ mơ", margin + 30, headY + 95);

        ctx.fillStyle = "#64748b";
        ctx.font = "italic 400 24px 'Inter', sans-serif";
        ctx.fillText("Chuyên gia Bát Tự — Tử Bình — Cải Vận Bổ Khuyết", margin + 30, headY + 140);

        // Bên Phải: Thông Tin Đương Số
        const metaX = margin + 1380;
        const valX = metaX + 220;
        let mY = headY + 25;
        const mStep = 44;

        const metaRows = [
            { label: "Họ và tên:", val: data.name || "VÔ DANH KHÁCH", color: "#1d4ed8" },
            { label: "Giới tính:", val: data.genderLabel || (data.gender === "nam" ? "Nam Mệnh" : "Nữ Mệnh"), color: "#0f172a" },
            { label: "Dương lịch:", val: data.solarStr || "", color: "#b91c1c" },
            { label: "Âm lịch:", val: data.lunarStr || "", color: "#15803d" },
            { label: "Nạp âm:", val: data.napAm || "Đại Lâm Mộc", color: "#92400e" }
        ];

        metaRows.forEach(row => {
            ctx.font = "500 28px 'Inter', sans-serif";
            ctx.fillStyle = "#475569";
            ctx.textAlign = "left";
            ctx.fillText(row.label, metaX, mY);

            ctx.font = "700 29px 'Inter', sans-serif";
            ctx.fillStyle = row.color;
            ctx.fillText(row.val, valX, mY);

            mY += mStep;
        });

        // Đường kẻ ngăn cách Header
        ctx.strokeStyle = "#cbd5e1";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(margin + 20, 275);
        ctx.lineTo(margin + gridW - 20, 275);
        ctx.stroke();

        // ==========================================
        // 3. BẢNG TỨ TRỤ (NĂM, THÁNG, NGÀY, GIỜ)
        // ==========================================
        const tblX = margin + 20;
        const tblY = 295;
        const tblW = gridW - 40;
        const colLabelW = 280;
        const colW = (tblW - colLabelW) / 4;

        const pillars = [
            data.yearPillar || { name: 'Năm', gan: 'Kỷ', zhi: 'Tỵ', solar: '1990', mainGod: 'Thực', hidden: ['Bính', 'Canh', 'Mậu'], hiddenGods: ['Kiếp', 'Tài', 'Thương'], thanSat: ['Kình Dương', 'Không Vong'] },
            data.monthPillar || { name: 'Tháng', gan: 'Đinh', zhi: 'Sửu', solar: '02', mainGod: 'Tỷ', hidden: ['Kỷ', 'Quý', 'Tân'], hiddenGods: ['Thực', 'Sát', 'T.Tài'], thanSat: ['Hoa Cái'] },
            data.dayPillar || { name: 'Ngày', gan: 'Đinh', zhi: 'Dậu', solar: '01', mainGod: 'NHẬT CHỦ', hidden: ['Tân'], hiddenGods: ['T.Tài'], thanSat: ['Văn Xương', 'Thiên Ất', 'Tướng Tinh'] },
            data.hourPillar || { name: 'Giờ', gan: 'Tân', zhi: 'Sửu', solar: '01:00', mainGod: 'T.Tài', hidden: ['Kỷ', 'Quý', 'Tân'], hiddenGods: ['Thực', 'Sát', 'T.Tài'], thanSat: ['Hoa Cái', 'Thiên Đức'] }
        ];

        // 3.1. Hàng Tiêu Đề Cột
        ctx.fillStyle = "#f6f0e2";
        ctx.fillRect(tblX, tblY, tblW, 60);
        ctx.strokeStyle = "#94a3b8";
        ctx.lineWidth = 1.5;
        ctx.strokeRect(tblX, tblY, tblW, 60);

        ctx.font = "700 28px 'Inter', sans-serif";
        ctx.fillStyle = "#0f172a";
        ctx.textAlign = "center";
        ctx.fillText("TRỤ NĂM", tblX + colLabelW + colW * 0.5, tblY + 40);
        ctx.fillText("TRỤ THÁNG", tblX + colLabelW + colW * 1.5, tblY + 40);
        ctx.fillText("TRỤ NGÀY (MỆNH)", tblX + colLabelW + colW * 2.5, tblY + 40);
        ctx.fillText("TRỤ GIỜ", tblX + colLabelW + colW * 3.5, tblY + 40);

        let curY = tblY + 60;

        const rows = [
            { label: "DƯƠNG LỊCH", h: 65, key: "solar" },
            { label: "CHỦ TINH", h: 70, key: "mainGod" },
            { label: "BÁT TỰ", h: 145, key: "batTu" },
            { label: "TÀNG ẨN", h: 70, key: "hidden" },
            { label: "PHÓ TINH", h: 70, key: "hiddenGods" },
            { label: "THẦN SÁT", h: 130, key: "thanSat" }
        ];

        rows.forEach(r => {
            // Label Cell
            ctx.fillStyle = "#f6f0e2";
            ctx.fillRect(tblX, curY, colLabelW, r.h);
            ctx.strokeStyle = "#cbd5e1";
            ctx.lineWidth = 1.5;
            ctx.strokeRect(tblX, curY, colLabelW, r.h);

            ctx.fillStyle = "#0f172a";
            ctx.font = "700 26px 'Inter', sans-serif";
            ctx.textAlign = "center";
            ctx.fillText(r.label, tblX + colLabelW / 2, curY + r.h / 2 + 9);

            // 4 Cột Trụ
            pillars.forEach((p, cIdx) => {
                const cX = tblX + colLabelW + cIdx * colW;
                ctx.fillStyle = cIdx % 2 === 0 ? "#ffffff" : "#fdfaf4";
                ctx.fillRect(cX, curY, colW, r.h);
                ctx.strokeStyle = "#cbd5e1";
                ctx.strokeRect(cX, curY, colW, r.h);

                const centerX = cX + colW / 2;

                if (r.key === "solar") {
                    ctx.fillStyle = "#0f172a";
                    ctx.font = "600 30px 'Inter', sans-serif";
                    ctx.textAlign = "center";
                    ctx.fillText(p.solar || "", centerX, curY + 42);
                } else if (r.key === "mainGod") {
                    const isMaster = (cIdx === 2);
                    ctx.fillStyle = isMaster ? "#b91c1c" : "#0f172a";
                    ctx.font = isMaster ? "700 32px 'Inter', sans-serif" : "600 28px 'Inter', sans-serif";
                    ctx.textAlign = "center";
                    ctx.fillText(p.mainGod || (isMaster ? "NHẬT CHỦ" : ""), centerX, curY + 45);
                } else if (r.key === "batTu") {
                    // Thiên Can
                    ctx.fillStyle = getStemColor(p.gan);
                    ctx.font = "700 58px 'Inter', sans-serif";
                    ctx.textAlign = "center";
                    ctx.fillText(p.gan || "", centerX, curY + 60);

                    // Địa Chi
                    ctx.fillStyle = getBranchColor(p.zhi);
                    ctx.font = "700 58px 'Inter', sans-serif";
                    ctx.fillText(p.zhi || "", centerX, curY + 125);
                } else if (r.key === "hidden") {
                    const hStems = p.hidden || [];
                    const count = hStems.length || 1;
                    const subW = colW / count;
                    hStems.forEach((st, sIdx) => {
                        ctx.fillStyle = getStemColor(st);
                        ctx.font = "600 28px 'Inter', sans-serif";
                        ctx.textAlign = "center";
                        ctx.fillText(st, cX + sIdx * subW + subW / 2, curY + 45);
                    });
                } else if (r.key === "hiddenGods") {
                    const hGods = p.hiddenGods || [];
                    const count = hGods.length || 1;
                    const subW = colW / count;
                    hGods.forEach((hg, sIdx) => {
                        ctx.fillStyle = "#475569";
                        ctx.font = "500 26px 'Inter', sans-serif";
                        ctx.textAlign = "center";
                        ctx.fillText(hg, cX + sIdx * subW + subW / 2, curY + 45);
                    });
                } else if (r.key === "thanSat") {
                    const stars = p.thanSat || p.stars || [];
                    ctx.fillStyle = "#1e40af";
                    ctx.font = "500 26px 'Inter', sans-serif";
                    ctx.textAlign = "center";
                    let tsY = curY + 36;
                    stars.slice(0, 4).forEach(st => {
                        ctx.fillText(st, centerX, tsY);
                        tsY += 34;
                    });
                }
            });

            curY += r.h;
        });

        // ==========================================
        // 4. KHỐI THÔNG TIN ĐẠI VẬN & LƯU NIÊN
        // ==========================================
        curY += 20;

        // Header info bar
        ctx.fillStyle = "#f6f0e2";
        ctx.fillRect(tblX, curY, tblW, 55);
        ctx.strokeStyle = "#94a3b8";
        ctx.lineWidth = 1.5;
        ctx.strokeRect(tblX, curY, tblW, 55);

        ctx.fillStyle = "#0f172a";
        ctx.font = "700 26px 'Inter', sans-serif";
        ctx.textAlign = "left";
        ctx.fillText("Đại vận lưu niên:", tblX + 20, curY + 36);

        ctx.fillStyle = "#475569";
        ctx.font = "500 24px 'Inter', sans-serif";
        const startAgeStr = data.yun?.startAgeFormatted || "8 tuổi 9 tháng";
        const solarTermStr = data.solarTermInfo || "Tiểu hàn bắt đầu 05-01-1990 và kết thúc 04-02-1990";
        ctx.fillText(`Số tính đại vận = ${data.yun?.startAgeDecimal || '26.14'}; Nhập đại vận lúc ${startAgeStr}. ${solarTermStr}`, tblX + 240, curY + 36);

        curY += 65;

        const daYunList = data.daYun || [];
        const birthYear = data.birthYear || 1990;
        const currentYear = 2026;
        const currentAge = currentYear - birthYear + 1;

        if (!is100Years) {
            // ========================================================
            // CHẾ ĐỘ 1: BẢNG 10 ĐẠI VẬN + 2 HÀNG LƯU NIÊN (20 NĂM)
            // ========================================================
            const col10W = (tblW - colLabelW) / 10;
            const dyH = 220;

            // Header Cột Label 10 Đại Vận
            ctx.fillStyle = "#f6f0e2";
            ctx.fillRect(tblX, curY, colLabelW, dyH);
            ctx.strokeStyle = "#cbd5e1";
            ctx.strokeRect(tblX, curY, colLabelW, dyH);

            ctx.fillStyle = "#0f172a";
            ctx.font = "700 28px 'Inter', sans-serif";
            ctx.textAlign = "center";
            ctx.fillText("ĐẠI VẬN", tblX + colLabelW / 2, curY + dyH / 2 + 10);

            // 10 Cột Đại Vận
            daYunList.slice(0, 10).forEach((dy, idx) => {
                const dyX = tblX + colLabelW + idx * col10W;
                const startAge = Math.max(1, parseInt(dy.startYear, 10) - birthYear + 1);
                const endAge = startAge + 9;
                const isActive = (currentAge >= startAge && currentAge <= endAge);

                ctx.fillStyle = isActive ? "#fffbeb" : (idx % 2 === 0 ? "#ffffff" : "#fdfaf4");
                ctx.fillRect(dyX, curY, col10W, dyH);
                ctx.strokeStyle = isActive ? "#f59e0b" : "#cbd5e1";
                ctx.lineWidth = isActive ? 2 : 1;
                ctx.strokeRect(dyX, curY, col10W, dyH);

                const cX = dyX + col10W / 2;

                // Can Đại Vận
                ctx.fillStyle = getStemColor(dy.gan);
                ctx.font = "700 36px 'Inter', sans-serif";
                ctx.textAlign = "center";
                ctx.fillText(dy.gan || "", cX, curY + 48);

                // Chi Đại Vận
                ctx.fillStyle = getBranchColor(dy.zhi);
                ctx.font = "700 36px 'Inter', sans-serif";
                ctx.fillText(dy.zhi || "", cX, curY + 95);

                // Thập thần
                ctx.fillStyle = "#475569";
                ctx.font = "600 24px 'Inter', sans-serif";
                ctx.fillText(dy.shiShen || "", cX, curY + 135);

                // Tuổi
                ctx.fillStyle = "#1d4ed8";
                ctx.font = "700 24px 'Inter', sans-serif";
                ctx.fillText(`${startAge}-${endAge}t`, cX, curY + 172);

                // Năm bắt đầu
                ctx.fillStyle = "#0f172a";
                ctx.font = "600 24px 'Inter', sans-serif";
                ctx.fillText(String(dy.startYear), cX, curY + 204);
            });

            curY += dyH + 20;

            // 2 HÀNG LƯU NIÊN (MỖI HÀNG 10 NĂM)
            const activeIdx = daYunList.findIndex(d => {
                const sAge = Math.max(1, parseInt(d.startYear, 10) - birthYear + 1);
                return currentAge >= sAge && currentAge <= sAge + 9;
            });

            const dy1 = daYunList[activeIdx >= 0 ? activeIdx : 2] || daYunList[0];
            const dy2 = daYunList[(activeIdx >= 0 ? activeIdx : 2) + 1] || daYunList[1];

            const lnGroups = [
                { dy: dy1, label: `LƯU NIÊN\n(${dy1?.ganZhi || ''})` },
                { dy: dy2, label: `LƯU NIÊN\n(${dy2?.ganZhi || ''})` }
            ];

            const lnH = 210;

            lnGroups.forEach(group => {
                ctx.fillStyle = "#f6f0e2";
                ctx.fillRect(tblX, curY, colLabelW, lnH);
                ctx.strokeStyle = "#cbd5e1";
                ctx.strokeRect(tblX, curY, colLabelW, lnH);

                ctx.fillStyle = "#0f172a";
                ctx.font = "700 26px 'Inter', sans-serif";
                ctx.textAlign = "center";
                ctx.fillText("LƯU NIÊN", tblX + colLabelW / 2, curY + lnH / 2 - 10);
                ctx.font = "600 22px 'Inter', sans-serif";
                ctx.fillStyle = "#15803d";
                ctx.fillText(`(${group.dy?.ganZhi || ''})`, tblX + colLabelW / 2, curY + lnH / 2 + 20);

                const lnList = group.dy?.liuNian || [];
                for (let i = 0; i < 10; i++) {
                    const lnX = tblX + colLabelW + i * col10W;
                    const ln = lnList[i] || {};
                    const lnYear = parseInt(ln.year, 10) || (birthYear + i);
                    const isCur = (lnYear === currentYear);

                    ctx.fillStyle = isCur ? "#fffbeb" : (i % 2 === 0 ? "#ffffff" : "#fdfaf4");
                    ctx.fillRect(lnX, curY, col10W, lnH);
                    ctx.strokeStyle = isCur ? "#f59e0b" : "#cbd5e1";
                    ctx.lineWidth = isCur ? 2 : 1;
                    ctx.strokeRect(lnX, curY, col10W, lnH);

                    const cX = lnX + col10W / 2;

                    // Can Chi
                    const parts = (ln.ganZhi || '').split(' ');
                    ctx.fillStyle = getStemColor(parts[0]);
                    ctx.font = "700 30px 'Inter', sans-serif";
                    ctx.textAlign = "center";
                    ctx.fillText(parts[0] || "", cX, curY + 44);

                    ctx.fillStyle = getBranchColor(parts[1]);
                    ctx.fillText(parts[1] || "", cX, curY + 84);

                    // Năm DL
                    ctx.fillStyle = isCur ? "#b91c1c" : "#0f172a";
                    ctx.font = "700 26px 'Inter', sans-serif";
                    ctx.fillText(String(lnYear), cX, curY + 124);

                    // Tuổi
                    const ageNum = Math.max(1, lnYear - birthYear + 1);
                    ctx.fillStyle = "#1d4ed8";
                    ctx.font = "600 24px 'Inter', sans-serif";
                    ctx.fillText(`${ageNum}t`, cX, curY + 158);

                    // Thập thần
                    ctx.fillStyle = "#475569";
                    ctx.font = "500 22px 'Inter', sans-serif";
                    ctx.fillText(ln.shiShen || "", cX, curY + 190);
                }

                curY += lnH + 16;
            });

            // Nhận định Cải Vận Bổ Khuyết / Dụng Thần
            const remH = 3000 - curY;
            if (remH > 100) {
                ctx.fillStyle = "#f6f0e2";
                ctx.fillRect(tblX, curY, tblW, remH);
                ctx.strokeStyle = "#cbd5e1";
                ctx.strokeRect(tblX, curY, tblW, remH);

                ctx.fillStyle = "#b91c1c";
                ctx.font = "700 30px 'Inter', sans-serif";
                ctx.textAlign = "left";
                ctx.fillText("PHƯƠNG PHÁP CẢI VẬN BỔ KHUYẾT & DỤNG THẦN", tblX + 30, curY + 50);

                ctx.fillStyle = "#0f172a";
                ctx.font = "500 26px 'Inter', sans-serif";
                ctx.fillText(`• Dụng Thần: ${data.analysis?.dungThan || 'Hỏa'}   • Hỷ Thần: ${data.analysis?.hyThan || 'Mộc'}   • Kỵ Thần: ${data.analysis?.kyThan || 'Thủy'}`, tblX + 30, curY + 100);
                ctx.fillText(`• Thân Vượng/Nhược: ${data.analysis?.thanVuongNhuoc || 'Thân Nhược'}   • Cách Cục: ${data.analysis?.cachCuc || 'Chính Quan Cách'}`, tblX + 30, curY + 150);
                ctx.fillText(`• Lời khuyên: Bổ sung hành Dụng Thần qua phương hướng, màu sắc y phục, nghề nghiệp và lối sống hàng ngày.`, tblX + 30, curY + 200);
            }

        } else {
            // ========================================================
            // CHẾ ĐỘ 2: 100 NĂM TOÀN CẢNH TRONG CÙNG KHUNG HÌNH (2 HÀNG x 5 CỘT)
            // ========================================================
            const dyColW = (tblW - colLabelW) / 5;
            const dyRowH = 820;

            const row1 = daYunList.slice(0, 5);
            const row2 = daYunList.slice(5, 10);

            [row1, row2].forEach((rowGroup, gIdx) => {
                if (rowGroup.length === 0) return;

                const gY = curY + gIdx * (dyRowH + 16);

                // Label Cột Bên Trái
                ctx.fillStyle = "#f6f0e2";
                ctx.fillRect(tblX, gY, colLabelW, dyRowH);
                ctx.strokeStyle = "#cbd5e1";
                ctx.strokeRect(tblX, gY, colLabelW, dyRowH);

                ctx.fillStyle = "#0f172a";
                ctx.font = "700 28px 'Inter', sans-serif";
                ctx.textAlign = "center";
                ctx.fillText(gIdx === 0 ? "ĐẠI VẬN" : "ĐẠI VẬN", tblX + colLabelW / 2, gY + dyRowH / 2 - 15);
                ctx.fillStyle = "#1d4ed8";
                ctx.font = "700 24px 'Inter', sans-serif";
                ctx.fillText(gIdx === 0 ? "(VẬN 1 - 5)" : "(VẬN 6 - 10)", tblX + colLabelW / 2, gY + dyRowH / 2 + 20);

                rowGroup.forEach((dy, cIdx) => {
                    const dyX = tblX + colLabelW + cIdx * dyColW;
                    const startYear = parseInt(dy.startYear, 10);
                    const startAge = Math.max(1, startYear - birthYear + 1);
                    const endAge = startAge + 9;

                    ctx.fillStyle = "#ffffff";
                    ctx.fillRect(dyX, gY, dyColW, dyRowH);
                    ctx.strokeStyle = "#cbd5e1";
                    ctx.strokeRect(dyX, gY, dyColW, dyRowH);

                    // Header Đại Vận Box
                    ctx.fillStyle = "#fdfaf4";
                    ctx.fillRect(dyX, gY, dyColW, 90);
                    ctx.strokeStyle = "#cbd5e1";
                    ctx.strokeRect(dyX, gY, dyColW, 90);

                    const cX = dyX + dyColW / 2;

                    ctx.fillStyle = "#b91c1c";
                    ctx.font = "700 25px 'Inter', sans-serif";
                    ctx.textAlign = "center";
                    const startM = data.yun?.startMonthNum || 6;
                    const mStr = startM < 10 ? '0' + startM : startM;
                    ctx.fillText(`${mStr}/${dy.startYear} — ${startAge}t`, cX, gY + 38);

                    // Can Chi & Thập Thần
                    ctx.fillStyle = getStemColor(dy.gan);
                    ctx.font = "700 27px 'Inter', sans-serif";
                    ctx.fillText(`${dy.ganZhi} - ${dy.shiShen}`, cX, gY + 74);

                    // 10 Dòng Lưu Niên
                    let lny = gY + 128;
                    const lnList = dy.liuNian || [];

                    for (let i = 0; i < 10; i++) {
                        const ln = lnList[i] || {};
                        const lnYear = parseInt(ln.year, 10) || (startYear + i);
                        const isCurYear = (lnYear === currentYear);

                        if (isCurYear) {
                            ctx.fillStyle = "#fffbeb";
                            ctx.fillRect(dyX + 4, lny - 26, dyColW - 8, 56);
                            ctx.strokeStyle = "#f59e0b";
                            ctx.lineWidth = 1.5;
                            ctx.strokeRect(dyX + 4, lny - 26, dyColW - 8, 56);
                        }

                        ctx.textAlign = "left";
                        ctx.font = isCurYear ? "700 27px 'Inter', sans-serif" : "500 25px 'Inter', sans-serif";
                        ctx.fillStyle = isCurYear ? "#b91c1c" : "#0f172a";
                        ctx.fillText(`${lnYear}`, dyX + 16, lny + 10);

                        ctx.font = "600 25px 'Inter', sans-serif";
                        ctx.fillStyle = getStemColor((ln.ganZhi || '').split(' ')[0]);
                        ctx.fillText(`- ${ln.ganZhi || ''}`, dyX + 90, lny + 10);

                        ctx.font = "500 24px 'Inter', sans-serif";
                        ctx.fillStyle = "#475569";
                        ctx.textAlign = "right";
                        ctx.fillText(`- ${ln.shiShen || ''}`, dyX + dyColW - 14, lny + 10);

                        lny += 68;
                    }
                });
            });
        }

        // ==========================================
        // 5. CHÂN TRANG & CHÚ GIẢI NGŨ HÀNH
        // ==========================================
        const footY = height - margin - 85;

        ctx.strokeStyle = "#cbd5e1";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(margin + 20, footY);
        ctx.lineTo(margin + gridW - 20, footY);
        ctx.stroke();

        // Bên trái: Website & Tác giả
        ctx.fillStyle = "#0f172a";
        ctx.font = "600 27px 'Inter', sans-serif";
        ctx.textAlign = "left";
        ctx.fillText("Lá số lập tại: lapque.vercel.app  •  Dịch Sư Nguyễn Huy Hoàng — Zalo: 0933 116 860", margin + 30, footY + 48);

        // Bên phải: Chú giải Ngũ Hành
        const legendX = margin + gridW - 650;
        ctx.textAlign = "left";
        ctx.font = "600 26px 'Inter', sans-serif";

        const elements = [
            { name: "Kim", color: "#475569" },
            { name: "Mộc", color: "#15803d" },
            { name: "Thủy", color: "#1d4ed8" },
            { name: "Hỏa", color: "#dc2626" },
            { name: "Thổ", color: "#92400e" }
        ];

        let curLx = legendX;
        elements.forEach(el => {
            ctx.fillStyle = el.color;
            ctx.fillRect(curLx, footY + 28, 22, 22);
            ctx.fillStyle = "#0f172a";
            ctx.fillText(el.name, curLx + 30, footY + 48);
            curLx += 120;
        });

        return canvas;
    }

    function generateChartDataUrl(data, is100Years = false) {
        const canvas = renderToCanvas(data, is100Years);
        return canvas ? canvas.toDataURL('image/png') : "";
    }

    function exportToPng(data, is100Years = false, fileName = 'La_So_Bat_Tu.png') {
        const canvas = renderToCanvas(data, is100Years);
        if (!canvas) return;

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

    global.BatTuPngExporter = {
        renderToCanvas,
        generateChartDataUrl,
        exportToPng
    };

})(typeof window !== 'undefined' ? window : this);
