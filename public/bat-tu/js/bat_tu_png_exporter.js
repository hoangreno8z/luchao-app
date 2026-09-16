/**
 * Trình Xuất Ảnh & Vẽ Lá Số Bát Tự HD Canvas (2400x3200 px) — Dịch Sư Nguyễn Huy Hoàng
 * - Cố định 100% kích thước khung hình (2400x3200 px) cho cả 2 chế độ (10 năm / 100 năm)
 * - Lá số 10 năm: Thu hẹp cột bên trái (160px), nâng giãn cách chiều dọc các hàng (Tứ Trụ, 10 Đại Vận, 2 hàng Lưu Niên) cao rộng thoáng đãng, lấp đầy 100% không gian, bỏ vĩnh viễn khối cải vận bổ khuyết
 * - Lá số 100 năm: Giữ nguyên bố cục chuẩn 2 hàng x 5 cột
 * - Nền kem ngà ấm áp truyền thống (#faf6ee / #f6f0e2), hệ màu ngũ hành chuẩn High Contrast
 */

(function(global) {
    const STEM_COLORS = {
        'Giáp': '#15803D', 'Ất': '#15803D',
        'Bính': '#DC2626', 'Đinh': '#DC2626',
        'Mậu': '#CB9E2B', 'Kỷ': '#CB9E2B',
        'Canh': '#708090', 'Tân': '#708090',
        'Nhâm': '#000000', 'Quý': '#000000'
    };

    const BRANCH_COLORS = {
        'Dần': '#15803D', 'Mão': '#15803D',
        'Tị': '#DC2626', 'Ngọ': '#DC2626',
        'Thìn': '#CB9E2B', 'Tuất': '#CB9E2B', 'Sửu': '#CB9E2B', 'Mùi': '#CB9E2B',
        'Thân': '#708090', 'Dậu': '#708090',
        'Hợi': '#000000', 'Tý': '#000000'
    };

    function getStemColor(stem) {
        if (!stem) return '#000000';
        return STEM_COLORS[stem] || '#000000';
    }

    function getBranchColor(branch) {
        if (!branch) return '#000000';
        return BRANCH_COLORS[branch] || '#000000';
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

        // 1. Nền xám-ngà cổ truyền đồng nhất
        ctx.fillStyle = "#e7e8e2";
        ctx.fillRect(0, 0, width, height);

        const margin = 24;
        const gridW = width - margin * 2;
        const gridH = height - margin * 2;

        // Viền ngoài đen sắc nét
        ctx.strokeStyle = "#000000";
        ctx.lineWidth = 3.5;
        ctx.strokeRect(margin, margin, gridW, gridH);

        ctx.strokeStyle = "#000000";
        ctx.lineWidth = 1.5;
        ctx.strokeRect(margin + 6, margin + 6, gridW - 12, gridH - 12);

        // ==========================================
        // 2. HEADER: THÔNG TIN DỊCH SƯ & ĐƯƠNG SỐ
        // ==========================================
        const headY = 46;

        // Bên Trái: Thương hiệu Dịch Sư
        ctx.fillStyle = "#1D4ED8";
        ctx.font = "700 48px 'Inter', 'Be Vietnam Pro', sans-serif";
        ctx.textAlign = "left";
        ctx.fillText("DỊCH SƯ NGUYỄN HUY HOÀNG", margin + 30, headY + 45);

        ctx.fillStyle = "#000000";
        ctx.font = "600 32px 'Inter', sans-serif";
        ctx.fillText("Zalo: 0933 116 860  •  Facebook: Hoàng ngủ mơ", margin + 30, headY + 98);

        ctx.fillStyle = "#475569";
        ctx.font = "italic 400 25px 'Inter', sans-serif";
        ctx.fillText("Chuyên gia Bát Tự — Tử Bình — Cải Vận Bổ Khuyết", margin + 30, headY + 144);

        // Bên Phải: Thông Tin Đương Số
        const metaX = margin + 1360;
        const valX = metaX + 230;
        let mY = headY + 25;
        const mStep = 45;

        const metaRows = [
            { label: "Họ và tên:", val: data.name || "VÔ DANH KHÁCH", color: "#1D4ED8" },
            { label: "Giới tính:", val: data.genderLabel || (data.gender === "nam" ? "Nam Mệnh" : "Nữ Mệnh"), color: "#1D4ED8" },
            { label: "Dương lịch:", val: data.solarStr || "", color: "#1D4ED8" },
            { label: "Âm lịch:", val: data.lunarStr || "", color: "#1D4ED8" },
            { label: "Nạp âm:", val: data.banMenhNaYin || data.napAm || "Đại Lâm Mộc", color: "#1D4ED8" }
        ];

        metaRows.forEach(row => {
            ctx.font = "700 30px 'Inter', sans-serif";
            ctx.fillStyle = "#000000";
            ctx.textAlign = "left";
            ctx.fillText(row.label, metaX, mY);

            ctx.font = "700 31px 'Inter', sans-serif";
            ctx.fillStyle = row.color;
            ctx.fillText(row.val, valX, mY);

            mY += mStep;
        });

        // Đường kẻ ngăn cách Header (Đen tuyền)
        ctx.strokeStyle = "#000000";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(margin + 20, 280);
        ctx.lineTo(margin + gridW - 20, 280);
        ctx.stroke();

        // ==========================================
        // 3. BẢNG TỨ TRỤ (NĂM, THÁNG, NGÀY, GIỜ)
        // ==========================================
        const tblX = margin + 20;
        const tblY = 298;
        const tblW = gridW - 40;
        const colLabelW = 160;
        const colW = (tblW - colLabelW) / 4;

        const pYear = data.pillars?.year || {};
        const pMonth = data.pillars?.month || {};
        const pDay = data.pillars?.day || {};
        const pHour = data.pillars?.time || {};

        const pillars = [
            {
                name: 'Năm',
                gan: pYear.stem || 'Kỷ',
                zhi: pYear.branch || 'Tỵ',
                solar: String(data.solarYear || pYear.solarYear || '1990'),
                mainGod: pYear.chuTinh || 'Thực',
                hidden: pYear.hiddenStems || ['Bính', 'Canh', 'Mậu'],
                hiddenGods: pYear.phoTinh || ['Kiếp', 'Tài', 'Thương'],
                thanSat: pYear.thanSat || ['Kình Dương', 'Không Vong']
            },
            {
                name: 'Tháng',
                gan: pMonth.stem || 'Đinh',
                zhi: pMonth.branch || 'Sửu',
                solar: (data.solarMonth < 10 ? '0' + data.solarMonth : String(data.solarMonth || '02')),
                mainGod: pMonth.chuTinh || 'Tỷ',
                hidden: pMonth.hiddenStems || ['Kỷ', 'Quý', 'Tân'],
                hiddenGods: pMonth.phoTinh || ['Thực', 'Sát', 'T.Tài'],
                thanSat: pMonth.thanSat || ['Hoa Cái']
            },
            {
                name: 'Ngày',
                gan: pDay.stem || 'Đinh',
                zhi: pDay.branch || 'Dậu',
                solar: (data.solarDay < 10 ? '0' + data.solarDay : String(data.solarDay || '01')),
                mainGod: 'NHẬT CHỦ',
                hidden: pDay.hiddenStems || ['Tân'],
                hiddenGods: pDay.phoTinh || ['T.Tài'],
                thanSat: pDay.thanSat || ['Văn Xương', 'Thiên Ất', 'Tướng Tinh']
            },
            {
                name: 'Giờ',
                gan: pHour.stem || 'Tân',
                zhi: pHour.branch || 'Sửu',
                solar: pHour.solarTime || ((data.solarHour < 10 ? '0' + data.solarHour : String(data.solarHour || '01')) + ':' + (data.solarMinute < 10 ? '0' + data.solarMinute : String(data.solarMinute || '00'))),
                mainGod: pHour.chuTinh || 'T.Tài',
                hidden: pHour.hiddenStems || ['Kỷ', 'Quý', 'Tân'],
                hiddenGods: pHour.phoTinh || ['Thực', 'Sát', 'T.Tài'],
                thanSat: pHour.thanSat || ['Hoa Cái', 'Thiên Đức']
            }
        ];

        // 3.1. Hàng Tiêu Đề Cột
        const headRowH = !is100Years ? 80 : 65;
        ctx.fillStyle = "#e7e8e2";
        ctx.fillRect(tblX, tblY, tblW, headRowH);
        ctx.strokeStyle = "#000000";
        ctx.lineWidth = 1.5;
        ctx.strokeRect(tblX, tblY, tblW, headRowH);

        ctx.font = "700 30px 'Inter', sans-serif";
        ctx.fillStyle = "#000000";
        ctx.textAlign = "center";
        ctx.fillText("TRỤ NĂM", tblX + colLabelW + colW * 0.5, tblY + headRowH / 2 + 10);
        ctx.fillText("TRỤ THÁNG", tblX + colLabelW + colW * 1.5, tblY + headRowH / 2 + 10);
        ctx.fillText("TRỤ NGÀY (MỆNH)", tblX + colLabelW + colW * 2.5, tblY + headRowH / 2 + 10);
        ctx.fillText("TRỤ GIỜ", tblX + colLabelW + colW * 3.5, tblY + headRowH / 2 + 10);

        let curY = tblY + headRowH;

        // Chiều cao các hàng
        const rows = !is100Years ? [
            { label: "DƯƠNG LỊCH", h: 85, key: "solar" },
            { label: "CHỦ TINH", h: 90, key: "mainGod" },
            { label: "BÁT TỰ", h: 240, key: "batTu" },
            { label: "TÀNG ẨN", h: 90, key: "hidden" },
            { label: "PHÓ TINH", h: 90, key: "hiddenGods" },
            { label: "THẦN SÁT", h: 200, key: "thanSat" }
        ] : [
            { label: "DƯƠNG LỊCH", h: 72, key: "solar" },
            { label: "CHỦ TINH", h: 76, key: "mainGod" },
            { label: "BÁT TỰ", h: 175, key: "batTu" },
            { label: "TÀNG ẨN", h: 76, key: "hidden" },
            { label: "PHÓ TINH", h: 76, key: "hiddenGods" },
            { label: "THẦN SÁT", h: 160, key: "thanSat" }
        ];

        rows.forEach(r => {
            // Label Cell
            ctx.fillStyle = "#e7e8e2";
            ctx.fillRect(tblX, curY, colLabelW, r.h);
            ctx.strokeStyle = "#000000";
            ctx.lineWidth = 1.5;
            ctx.strokeRect(tblX, curY, colLabelW, r.h);

            ctx.fillStyle = "#000000";
            ctx.font = "700 26px 'Inter', sans-serif";
            ctx.textAlign = "center";
            ctx.fillText(r.label, tblX + colLabelW / 2, curY + r.h / 2 + 9);

            // 4 Cột Trụ
            pillars.forEach((p, cIdx) => {
                const cX = tblX + colLabelW + cIdx * colW;
                ctx.fillStyle = "#e7e8e2";
                ctx.fillRect(cX, curY, colW, r.h);
                ctx.strokeStyle = "#000000";
                ctx.lineWidth = 1.2;
                ctx.strokeRect(cX, curY, colW, r.h);

                const centerX = cX + colW / 2;

                if (r.key === "solar") {
                    ctx.fillStyle = "#000000";
                    ctx.font = "600 32px 'Inter', sans-serif";
                    ctx.textAlign = "center";
                    ctx.fillText(p.solar || "", centerX, curY + r.h / 2 + 11);
                } else if (r.key === "mainGod") {
                    const isMaster = (cIdx === 2);
                    ctx.fillStyle = isMaster ? "#DC2626" : "#000000";
                    ctx.font = isMaster ? "700 34px 'Inter', sans-serif" : "600 30px 'Inter', sans-serif";
                    ctx.textAlign = "center";
                    ctx.fillText(p.mainGod || (isMaster ? "NHẬT CHỦ" : ""), centerX, curY + r.h / 2 + 11);
                } else if (r.key === "batTu") {
                    // Thiên Can
                    ctx.fillStyle = getStemColor(p.gan);
                    ctx.font = "700 76px 'Inter', sans-serif";
                    ctx.textAlign = "center";
                    ctx.fillText(p.gan || "", centerX, curY + r.h * 0.38);

                    // Địa Chi
                    ctx.fillStyle = getBranchColor(p.zhi);
                    ctx.fillText(p.zhi || "", centerX, curY + r.h * 0.82);
                } else if (r.key === "hidden") {
                    const hStems = p.hidden || [];
                    const count = hStems.length || 1;
                    const subW = colW / count;
                    hStems.forEach((st, sIdx) => {
                        ctx.fillStyle = getStemColor(st);
                        ctx.font = "700 32px 'Inter', sans-serif";
                        ctx.textAlign = "center";
                        ctx.fillText(st, cX + sIdx * subW + subW / 2, curY + r.h / 2 + 11);
                    });
                } else if (r.key === "hiddenGods") {
                    const hGods = p.hiddenGods || [];
                    const count = hGods.length || 1;
                    const subW = colW / count;
                    hGods.forEach((hg, sIdx) => {
                        ctx.fillStyle = "#475569";
                        ctx.font = "600 30px 'Inter', sans-serif";
                        ctx.textAlign = "center";
                        ctx.fillText(hg, cX + sIdx * subW + subW / 2, curY + r.h / 2 + 11);
                    });
                } else if (r.key === "thanSat") {
                    const stars = p.thanSat || p.stars || [];
                    ctx.fillStyle = "#1D4ED8";
                    ctx.font = "600 28px 'Inter', sans-serif";
                    ctx.textAlign = "center";
                    const step = !is100Years ? 46 : 40;
                    let tsY = curY + (r.h - (Math.min(4, stars.length) - 1) * step) / 2 + 9;
                    stars.slice(0, 4).forEach(st => {
                        ctx.fillText(st, centerX, tsY);
                        tsY += step;
                    });
                }
            });

            curY += r.h;
        });

        // ==========================================
        // 4. KHỐI THÔNG TIN ĐẠI VẬN & LƯU NIÊN
        // ==========================================
        curY += !is100Years ? 30 : 24;

        // Header info bar
        const infoBarH = !is100Years ? 68 : 60;
        ctx.fillStyle = "#e7e8e2";
        ctx.fillRect(tblX, curY, tblW, infoBarH);
        ctx.strokeStyle = "#000000";
        ctx.lineWidth = 1.5;
        ctx.strokeRect(tblX, curY, tblW, infoBarH);

        ctx.fillStyle = "#000000";
        ctx.font = "700 28px 'Inter', sans-serif";
        ctx.textAlign = "left";
        ctx.fillText("Đại vận lưu niên:", tblX + 24, curY + infoBarH / 2 + 10);

        ctx.fillStyle = "#475569";
        ctx.font = "500 26px 'Inter', sans-serif";
        const startAgeStr = data.yun?.startAgeFormatted || "8 tuổi 9 tháng";
        const solarTermStr = data.solarTermInfo || "Tiết Tiểu hàn bắt đầu 05-01-1990 và kết thúc 04-02-1990";
        ctx.fillText(`Số tính đại vận = ${data.yun?.startAgeDecimal || '26.14'}; Nhập đại vận lúc ${startAgeStr}. ${solarTermStr}`, tblX + 260, curY + infoBarH / 2 + 10);

        curY += infoBarH + (!is100Years ? 30 : 18);

        const daYunList = data.daYun || [];
        const birthYear = data.birthYear || data.solarYear || 1990;
        const currentYear = 2026;
        const currentAge = currentYear - birthYear + 1;

        if (!is100Years) {
            // ========================================================
            // CHẾ ĐỘ 1: BẢNG 10 ĐẠI VẬN + 2 HÀNG LƯU NIÊN (KÉO DÃN LẤP ĐẦY 100% CHIỀU DỌC)
            // ========================================================
            const col10W = (tblW - colLabelW) / 10;
            const dyH = 500;

            // Header Cột Label 10 Đại Vận
            ctx.fillStyle = "#e7e8e2";
            ctx.fillRect(tblX, curY, colLabelW, dyH);
            ctx.strokeStyle = "#000000";
            ctx.strokeRect(tblX, curY, colLabelW, dyH);

            ctx.fillStyle = "#000000";
            ctx.font = "700 30px 'Inter', sans-serif";
            ctx.textAlign = "center";
            ctx.fillText("ĐẠI VẬN", tblX + colLabelW / 2, curY + dyH / 2 + 10);

            // 10 Cột Đại Vận
            daYunList.slice(0, 10).forEach((dy, idx) => {
                const dyX = tblX + colLabelW + idx * col10W;
                const startAge = Math.max(1, parseInt(dy.startYear, 10) - birthYear + 1);
                const endAge = startAge + 9;
                const isActive = (currentAge >= startAge && currentAge <= endAge);

                ctx.fillStyle = isActive ? "#DDDED4" : "#e7e8e2";
                ctx.fillRect(dyX, curY, col10W, dyH);
                ctx.strokeStyle = "#000000";
                ctx.lineWidth = isActive ? 2.5 : 1;
                ctx.strokeRect(dyX, curY, col10W, dyH);

                const cX = dyX + col10W / 2;
                const parts = (dy.ganZhi || `${dy.stem || ''} ${dy.branch || ''}`).split(' ');

                // Can Đại Vận
                ctx.fillStyle = getStemColor(parts[0]);
                ctx.font = "700 54px 'Inter', sans-serif";
                ctx.textAlign = "center";
                ctx.fillText(parts[0] || "", cX, curY + 80);

                // Chi Đại Vận
                ctx.fillStyle = getBranchColor(parts[1]);
                ctx.fillText(parts[1] || "", cX, curY + 160);

                // Thập thần
                ctx.fillStyle = "#475569";
                ctx.font = "600 32px 'Inter', sans-serif";
                ctx.fillText(dy.shiShen || "", cX, curY + 245);

                // Tuổi
                ctx.fillStyle = "#1D4ED8";
                ctx.font = "700 32px 'Inter', sans-serif";
                ctx.fillText(`${startAge}-${endAge}t`, cX, curY + 335);

                // Năm bắt đầu
                ctx.fillStyle = "#000000";
                ctx.font = "600 30px 'Inter', sans-serif";
                ctx.fillText(String(dy.startYear), cX, curY + 420);
            });

            curY += dyH + 26;

            // 2 HÀNG LƯU NIÊN (MỖI HÀNG 10 NĂM)
            const activeIdx = daYunList.findIndex(d => {
                const sAge = Math.max(1, parseInt(d.startYear, 10) - birthYear + 1);
                return currentAge >= sAge && currentAge <= sAge + 9;
            });

            const baseIdx = activeIdx >= 0 ? activeIdx : 2;
            const dy1 = daYunList[baseIdx] || daYunList[0];
            const dy2 = daYunList[baseIdx + 1] || daYunList[1];

            const lnGroups = [
                { dy: dy1, label: `LƯU NIÊN\n(${dy1?.ganZhi || ''})` },
                { dy: dy2, label: `LƯU NIÊN\n(${dy2?.ganZhi || ''})` }
            ];

            const lnH = 500;

            lnGroups.forEach(group => {
                ctx.fillStyle = "#e7e8e2";
                ctx.fillRect(tblX, curY, colLabelW, lnH);
                ctx.strokeStyle = "#000000";
                ctx.strokeRect(tblX, curY, colLabelW, lnH);

                ctx.fillStyle = "#000000";
                ctx.font = "700 28px 'Inter', sans-serif";
                ctx.textAlign = "center";
                ctx.fillText("LƯU NIÊN", tblX + colLabelW / 2, curY + lnH / 2 - 18);
                ctx.font = "700 24px 'Inter', sans-serif";
                ctx.fillStyle = "#15803D";
                ctx.fillText(`(${group.dy?.ganZhi || ''})`, tblX + colLabelW / 2, curY + lnH / 2 + 25);

                const lnList = group.dy?.liuNian || [];
                for (let i = 0; i < 10; i++) {
                    const lnX = tblX + colLabelW + i * col10W;
                    const lnYear = parseInt(lnList[i]?.year, 10) || (parseInt(group.dy?.startYear || birthYear, 10) + i);
                    const isCur = (lnYear === currentYear);

                    ctx.fillStyle = isCur ? "#DDDED4" : "#e7e8e2";
                    ctx.fillRect(lnX, curY, col10W, lnH);
                    ctx.strokeStyle = "#000000";
                    ctx.lineWidth = isCur ? 2.5 : 1;
                    ctx.strokeRect(lnX, curY, col10W, lnH);

                    const cX = lnX + col10W / 2;
                    const parts = (lnList[i]?.ganZhi || '').split(' ');

                    // Can
                    ctx.fillStyle = getStemColor(parts[0]);
                    ctx.font = "700 50px 'Inter', sans-serif";
                    ctx.textAlign = "center";
                    ctx.fillText(parts[0] || "", cX, curY + 80);

                    // Chi
                    ctx.fillStyle = getBranchColor(parts[1]);
                    ctx.fillText(parts[1] || "", cX, curY + 160);

                    // Năm DL
                    ctx.fillStyle = isCur ? "#DC2626" : "#000000";
                    ctx.font = "700 34px 'Inter', sans-serif";
                    ctx.fillText(String(lnYear), cX, curY + 250);

                    // Tuổi
                    const ageNum = Math.max(1, lnYear - birthYear + 1);
                    ctx.fillStyle = "#1D4ED8";
                    ctx.font = "700 32px 'Inter', sans-serif";
                    ctx.fillText(`${ageNum}t`, cX, curY + 335);

                    // Thập thần
                    ctx.fillStyle = "#475569";
                    ctx.font = "600 30px 'Inter', sans-serif";
                    ctx.fillText(lnList[i]?.shiShen || "", cX, curY + 420);
                }

                curY += lnH + 24;
            });

        } else {
            // ========================================================
            // CHẾ ĐỘ 2: 100 NĂM TOÀN CẢNH (2 HÀNG x 5 CỘT)
            // ========================================================
            const smallLabelW = 160;
            const dyColW = (tblW - smallLabelW) / 5;
            const dyRowH = 850;

            const row1 = daYunList.slice(0, 5);
            const row2 = daYunList.slice(5, 10);

            [row1, row2].forEach((rowGroup, gIdx) => {
                if (rowGroup.length === 0) return;

                const gY = curY + gIdx * (dyRowH + 20);

                // Label Cột Bên Trái (Gọn Gàng)
                ctx.fillStyle = "#e7e8e2";
                ctx.fillRect(tblX, gY, smallLabelW, dyRowH);
                ctx.strokeStyle = "#000000";
                ctx.strokeRect(tblX, gY, smallLabelW, dyRowH);

                ctx.fillStyle = "#000000";
                ctx.font = "700 26px 'Inter', sans-serif";
                ctx.textAlign = "center";
                ctx.fillText("ĐẠI VẬN", tblX + smallLabelW / 2, gY + dyRowH / 2 - 15);
                ctx.fillStyle = "#1D4ED8";
                ctx.font = "700 22px 'Inter', sans-serif";
                ctx.fillText(gIdx === 0 ? "(1 - 5)" : "(6 - 10)", tblX + smallLabelW / 2, gY + dyRowH / 2 + 20);

                rowGroup.forEach((dy, cIdx) => {
                    const dyX = tblX + smallLabelW + cIdx * dyColW;
                    const startYear = parseInt(dy.startYear, 10);
                    const startAge = Math.max(1, startYear - birthYear + 1);

                    ctx.fillStyle = "#e7e8e2";
                    ctx.fillRect(dyX, gY, dyColW, dyRowH);
                    ctx.strokeStyle = "#000000";
                    ctx.strokeRect(dyX, gY, dyColW, dyRowH);

                    // Header Đại Vận Box
                    ctx.fillStyle = "#e7e8e2";
                    ctx.fillRect(dyX, gY, dyColW, 95);
                    ctx.strokeStyle = "#000000";
                    ctx.strokeRect(dyX, gY, dyColW, 95);

                    const cX = dyX + dyColW / 2;

                    ctx.fillStyle = "#DC2626";
                    ctx.font = "700 28px 'Inter', sans-serif";
                    ctx.textAlign = "center";
                    const startM = data.yun?.startMonthNum || 6;
                    const mStr = startM < 10 ? '0' + startM : startM;
                    ctx.fillText(`${mStr}/${dy.startYear} — ${startAge}t`, cX, gY + 40);

                    // Can Chi & Thập Thần
                    ctx.fillStyle = getStemColor((dy.ganZhi || '').split(' ')[0]);
                    ctx.font = "700 30px 'Inter', sans-serif";
                    ctx.fillText(`${dy.ganZhi} - ${dy.shiShen}`, cX, gY + 78);

                    // 10 Dòng Lưu Niên
                    let lny = gY + 140;
                    const lnList = dy.liuNian || [];

                    for (let i = 0; i < 10; i++) {
                        const ln = lnList[i] || {};
                        const lnYear = parseInt(ln.year, 10) || (startYear + i);
                        const isCurYear = (lnYear === currentYear);

                        if (isCurYear) {
                            ctx.fillStyle = "#DDDED4";
                            ctx.fillRect(dyX + 4, lny - 30, dyColW - 8, 62);
                            ctx.strokeStyle = "#000000";
                            ctx.lineWidth = 1.5;
                            ctx.strokeRect(dyX + 4, lny - 30, dyColW - 8, 62);
                        }

                        ctx.textAlign = "left";
                        ctx.font = isCurYear ? "700 29px 'Inter', sans-serif" : "500 28px 'Inter', sans-serif";
                        ctx.fillStyle = isCurYear ? "#DC2626" : "#000000";
                        ctx.fillText(`${lnYear}`, dyX + 18, lny + 8);

                        ctx.font = "600 28px 'Inter', sans-serif";
                        ctx.fillStyle = getStemColor((ln.ganZhi || '').split(' ')[0]);
                        ctx.fillText(`- ${ln.ganZhi || ''}`, dyX + 105, lny + 8);

                        ctx.font = "500 26px 'Inter', sans-serif";
                        ctx.fillStyle = "#475569";
                        ctx.textAlign = "right";
                        ctx.fillText(`- ${ln.shiShen || ''}`, dyX + dyColW - 16, lny + 8);

                        lny += 70;
                    }
                });
            });
        }

        // ==========================================
        // 5. CHÂN TRANG & CHÚ GIẢI NGŨ HÀNH
        // ==========================================
        const footY = height - margin - 85;

        ctx.strokeStyle = "#000000";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(margin + 20, footY);
        ctx.lineTo(margin + gridW - 20, footY);
        ctx.stroke();

        // Bên trái: Thông tin Dịch Sư & Hotline
        ctx.fillStyle = "#000000";
        ctx.font = "600 28px 'Inter', sans-serif";
        ctx.textAlign = "left";
        ctx.fillText("Dịch Sư Nguyễn Huy Hoàng — Zalo: 0933 116 860", margin + 30, footY + 48);

        // Bên phải: Chú giải Ngũ Hành
        const legendX = margin + gridW - 650;
        ctx.textAlign = "left";
        ctx.font = "600 26px 'Inter', sans-serif";

        const elements = [
            { name: "Kim", color: "#708090" },
            { name: "Mộc", color: "#15803D" },
            { name: "Thủy", color: "#000000" },
            { name: "Hỏa", color: "#DC2626" },
            { name: "Thổ", color: "#CB9E2B" }
        ];

        let curLx = legendX;
        elements.forEach(el => {
            ctx.fillStyle = el.color;
            ctx.fillRect(curLx, footY + 28, 22, 22);
            ctx.fillStyle = "#000000";
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
