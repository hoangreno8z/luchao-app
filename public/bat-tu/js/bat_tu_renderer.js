/**
 * Module Render Bảng HTML Thuần Lá Số Bát Tự — Dịch Sư Nguyễn Huy Hoàng
 * Chuẩn layout ma trận di động theo phong cách nguhanh.net
 * Nét vector 100%, không bao giờ bị vỡ hình hay mờ
 */

(function(global) {
    function getStemColor(stem) {
        if (!stem) return '#1e293b';
        const map = {
            'Giáp': '#27ae60', 'Ất': '#27ae60',
            'Bính': '#c0392b', 'Đinh': '#c0392b',
            'Mậu': '#8e5a2b', 'Kỷ': '#8e5a2b',
            'Canh': '#7f8c8d', 'Tân': '#7f8c8d',
            'Nhâm': '#2980b9', 'Quý': '#2980b9'
        };
        return map[stem] || '#1e293b';
    }

    function getBranchColor(branch) {
        if (!branch) return '#1e293b';
        const map = {
            'Dần': '#27ae60', 'Mão': '#27ae60',
            'Tị': '#c0392b', 'Ngọ': '#c0392b',
            'Thìn': '#8e5a2b', 'Tuất': '#8e5a2b', 'Sửu': '#8e5a2b', 'Mùi': '#8e5a2b',
            'Thân': '#7f8c8d', 'Dậu': '#7f8c8d',
            'Hợi': '#2980b9', 'Tý': '#2980b9'
        };
        return map[branch] || '#1e293b';
    }

    function renderBatTuHtmlTable(data, is100Years = false) {
        if (!data) return "";

        const pillars = [data.pillars.year, data.pillars.month, data.pillars.day, data.pillars.time];
        const daYunList = data.daYun || [];
        const birthYear = parseInt(data.solarYear || data.pillars?.year?.solarYear || 1988, 10);
        const currentAge = Math.max(1, 2026 - birthYear + 1);

        let html = `
        <div class="battu-sheet" id="battu-sheet-export">
            <!-- 1. Header Banner -->
            <div class="battu-header-grid">
                <div class="battu-brand-col">
                    <div class="battu-brand-name">☯ DỊCH SƯ NGUYỄN HUY HOÀNG</div>
                    <div class="battu-brand-contact">Zalo: 0933 116 860 &nbsp;•&nbsp; Facebook: Hoàng ngủ mơ</div>
                    <div class="battu-brand-sub">Chuyên gia Bát Tự — Tử Bình — Cải Vận Bổ Khuyết</div>
                </div>
                <div class="battu-title-col">
                    <div class="battu-main-title">LÁ SỐ BÁT TỰ</div>
                    <div class="battu-sub-title">CẢI VẬN BỔ KHUYẾT</div>
                </div>
                <div class="battu-meta-col">
                    <div class="battu-meta-row"><span>Họ và tên:</span> <strong>${data.name || 'VÔ DANH KHÁCH'}</strong></div>
                    <div class="battu-meta-row"><span>Giới tính:</span> <strong style="color:#27ae60;">${data.genderLabel || 'Nam Mệnh'}</strong></div>
                    <div class="battu-meta-row"><span>Dương lịch:</span> <strong style="color:#c0392b;">${data.solarStr || ''}</strong></div>
                    <div class="battu-meta-row"><span>Âm lịch:</span> <strong style="color:#2980b9;">${data.lunarStr || ''}</strong></div>
                    <div class="battu-meta-row"><span>Bản Mệnh:</span> <strong style="color:#8e5a2b;">${data.banMenhNaYin || ''}</strong></div>
                </div>
            </div>

            <!-- 2. Bảng Tứ Trụ Chính (4 Cột Đều 25%) -->
            <div class="table-responsive-box">
                <table class="battu-table battu-tu-tru-table">
                    <thead>
                        <tr>
                            <th style="width: 14%;">TRỤ</th>
                            <th style="width: 21.5%;">NĂM (NIÊN)</th>
                            <th style="width: 21.5%;">THÁNG (NGUYỆT)</th>
                            <th style="width: 21.5%;">NGÀY (NHẬT)</th>
                            <th style="width: 21.5%;">GIỜ (THỜI)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <!-- Hàng Dương Lịch -->
                        <tr>
                            <td class="row-label">DƯƠNG LỊCH</td>
                            <td>${pillars[0].solarYear || data.solarYear || ''}</td>
                            <td>${String(pillars[1].solarMonth || data.solarMonth || '').padStart(2, '0')}</td>
                            <td>${String(pillars[2].solarDay || data.solarDay || '').padStart(2, '0')}</td>
                            <td>${pillars[3].solarTime || '00:00'}</td>
                        </tr>

                        <!-- Hàng Chủ Tinh -->
                        <tr>
                            <td class="row-label">CHỦ TINH</td>
                            <td class="cell-chutinh">${pillars[0].chuTinh || '-'}</td>
                            <td class="cell-chutinh">${pillars[1].chuTinh || '-'}</td>
                            <td class="cell-chutinh cell-nhatchu">NHẬT CHỦ</td>
                            <td class="cell-chutinh">${pillars[3].chuTinh || '-'}</td>
                        </tr>

                        <!-- Hàng Bát Tự (Can Chi To Đậm) -->
                        <tr class="row-battu">
                            <td class="row-label">BÁT TỰ</td>
                            <td>
                                <div class="stem-txt" style="color: ${getStemColor(pillars[0].stem)};">${pillars[0].stem}</div>
                                <div class="branch-txt" style="color: ${getBranchColor(pillars[0].branch)};">${pillars[0].branch}</div>
                            </td>
                            <td>
                                <div class="stem-txt" style="color: ${getStemColor(pillars[1].stem)};">${pillars[1].stem}</div>
                                <div class="branch-txt" style="color: ${getBranchColor(pillars[1].branch)};">${pillars[1].branch}</div>
                            </td>
                            <td>
                                <div class="stem-txt" style="color: ${getStemColor(pillars[2].stem)};">${pillars[2].stem}</div>
                                <div class="branch-txt" style="color: ${getBranchColor(pillars[2].branch)};">${pillars[2].branch}</div>
                            </td>
                            <td>
                                <div class="stem-txt" style="color: ${getStemColor(pillars[3].stem)};">${pillars[3].stem}</div>
                                <div class="branch-txt" style="color: ${getBranchColor(pillars[3].branch)};">${pillars[3].branch}</div>
                            </td>
                        </tr>

                        <!-- Hàng Tàng Ẩn -->
                        <tr>
                            <td class="row-label">TÀNG ẨN</td>
                            ${pillars.map(p => {
                                const hidden = p.hiddenStems || [];
                                if (hidden.length === 0) return '<td>-</td>';
                                return `<td><div class="hidden-stems-flex">${hidden.map(hs => `<span style="color:${getStemColor(hs)}; font-weight:700;">${hs}</span>`).join('')}</div></td>`;
                            }).join('')}
                        </tr>

                        <!-- Hàng Phó Tinh -->
                        <tr>
                            <td class="row-label">PHÓ TINH</td>
                            ${pillars.map(p => {
                                const pho = p.phoTinh || p.hiddenShiShen || [];
                                if (pho.length === 0) return '<td>-</td>';
                                return `<td><div class="pho-tinh-flex">${pho.map(pt => `<span>${pt}</span>`).join('')}</div></td>`;
                            }).join('')}
                        </tr>

                        <!-- Hàng Thần Sát (Liệt Kê Đầy Đủ) -->
                        <tr class="row-thansat">
                            <td class="row-label">THẦN SÁT</td>
                            ${pillars.map(p => {
                                const stars = p.thanSat || p.stars || [];
                                if (stars.length === 0) return '<td style="color:#94a3b8;">-</td>';
                                return `<td><div class="than-sat-list">${stars.map(s => `<span class="than-sat-tag">${s}</span>`).join('')}</div></td>`;
                            }).join('')}
                        </tr>

                        <!-- Hàng Nạp Âm -->
                        <tr>
                            <td class="row-label">NẠP ÂM</td>
                            ${pillars.map(p => `<td class="cell-nayin">${p.nayin || '-'}</td>`).join('')}
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- 3. Bảng Đại Vận & Lưu Niên -->
            <div class="battu-dayun-header">
                <strong>ĐẠI VẬN & LƯU NIÊN</strong>
                <span class="battu-dayun-summary">${data.yun?.summaryText || 'Khởi Đại Vận theo Tiết Khí'}</span>
            </div>
        `;

        if (!is100Years) {
            // ========================================================
            // CHẾ ĐỘ 10 NĂM TRONG 1 ĐẠI VẬN GẦN NHẤT (TINH GỌN)
            // ========================================================
            html += `
            <div class="table-responsive-box">
                <!-- 10 Cột Đại Vận -->
                <table class="battu-table battu-dayun-10-table">
                    <thead>
                        <tr>
                            <th style="width: 10%;">10 ĐẠI VẬN</th>
                            ${daYunList.slice(0, 10).map((dy) => {
                                const sAge = Math.max(1, parseInt(dy.startYear, 10) - birthYear + 1);
                                const eAge = sAge + 9;
                                const isActive = (currentAge >= sAge && currentAge <= eAge);
                                return `
                                <th class="${isActive ? 'active-dayun-col' : ''}">
                                    <div class="dy-ganzhi" style="color:${dy.stemColor || '#27ae60'};">${dy.ganZhi}</div>
                                    <div class="dy-shishen">${dy.shiShen}</div>
                                    <div class="dy-age">${sAge}-${eAge}t</div>
                                    <div class="dy-year">${dy.startYear}</div>
                                </th>`;
                            }).join('')}
                        </tr>
                    </thead>
                </table>

                <!-- Hàng 10 Năm Lưu Niên Của Đại Vận Hiện Tại -->
                ${(() => {
                    const activeDaYun = daYunList.find(d => {
                        const sAge = Math.max(1, parseInt(d.startYear, 10) - birthYear + 1);
                        return currentAge >= sAge && currentAge <= sAge + 9;
                    }) || daYunList[0];

                    if (!activeDaYun || !activeDaYun.liuNian) return '';

                    return `
                    <table class="battu-table battu-liunian-10-table" style="margin-top: 6px;">
                        <tbody>
                            <tr>
                                <td class="row-label" style="width: 10%; font-weight: 800;">
                                    LƯU NIÊN<br><small style="color:#27ae60;">(${activeDaYun.ganZhi})</small>
                                </td>
                                ${activeDaYun.liuNian.slice(0, 10).map((ln) => {
                                    const lnYear = parseInt(ln.year, 10);
                                    const lnAge = Math.max(1, lnYear - birthYear + 1);
                                    const isCurYear = (lnYear === 2026);
                                    return `
                                    <td class="${isCurYear ? 'active-year-cell' : ''}">
                                        <div style="font-weight:700; color:${getStemColor(ln.ganZhi.split(' ')[0])}; font-size:0.88rem;">${ln.ganZhi}</div>
                                        <div style="font-size:0.82rem; font-weight:700; color:${isCurYear ? '#b91c1c' : '#1e293b'};">${lnYear}</div>
                                        <div style="color:#c0392b; font-weight:800; font-size:0.8rem;">${lnAge}t</div>
                                        <div style="color:#64748b; font-size:0.75rem;">${ln.shiShen}</div>
                                    </td>`;
                                }).join('')}
                            </tr>
                        </tbody>
                    </table>`;
                })()}

                <!-- Bảng Thần Sát Nguyên Cục -->
                <table class="battu-table battu-thansat-table" style="margin-top: 6px;">
                    <thead>
                        <tr>
                            <th style="width: 10%;">THẦN SÁT</th>
                            <th style="width: 22.5%;">NIÊN THẦN (NĂM)</th>
                            <th style="width: 22.5%;">NGUYỆT THẦN (THÁNG)</th>
                            <th style="width: 22.5%;">NHẬT THẦN (NGÀY)</th>
                            <th style="width: 22.5%;">THỜI THẦN (GIỜ)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="row-label">DANH MỤC</td>
                            ${pillars.map(p => {
                                const stars = p.thanSat || p.stars || [];
                                return `<td><div class="than-sat-list">${stars.map(s => `<span class="than-sat-tag">${s}</span>`).join('') || '-'}</div></td>`;
                            }).join('')}
                        </tr>
                    </tbody>
                </table>
            </div>`;
        } else {
            // ========================================================
            // CHẾ ĐỘ 100 NĂM TRONG 10 ĐẠI VẬN (2 HÀNG x 5 CỘT NHƯ NGUHANH.NET)
            // ========================================================
            const row1 = daYunList.slice(0, 5);
            const row2 = daYunList.slice(5, 10);

            html += `
            <div class="table-responsive-box">
                ${[row1, row2].map((rowGroup, gIdx) => {
                    if (rowGroup.length === 0) return '';
                    return `
                    <table class="battu-table battu-dayun-100-table" style="margin-bottom: 8px; min-width: 660px;">
                        <thead>
                            <tr>
                                <th style="width: 8%; vertical-align: middle; font-size: 0.8rem;">${gIdx === 0 ? 'ĐẠI VẬN' : 'ĐẠI VẬN'}</th>
                                ${rowGroup.map(dy => {
                                    const sYear = parseInt(dy.startYear, 10);
                                    const sAge = Math.max(1, sYear - birthYear + 1);
                                    const sM = data.yun?.startMonthNum || 6;
                                    const mStr = sM < 10 ? '0' + sM : sM;
                                    return `
                                    <th style="width: 18.4%; background: #fffdf8; border: 1px solid #2b5797; padding: 4px 2px;">
                                        <div style="color:#b91c1c; font-size:0.8rem; font-weight:800;">${mStr}/${dy.startYear} — ${sAge}t</div>
                                        <div style="color:${dy.stemColor || '#27ae60'}; font-size:0.92rem; font-weight:900;">${dy.ganZhi} - ${dy.shiShen}</div>
                                    </th>`;
                                }).join('')}
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td class="row-label" style="font-size: 0.76rem; width: 8%;">${gIdx === 0 ? 'LƯU NIÊN' : 'LƯU NIÊN'}</td>
                                ${rowGroup.map(dy => {
                                    const lnList = dy.liuNian || [];
                                    return `
                                    <td class="cell-liunian-list" style="padding: 4px 3px !important; text-align: left; vertical-align: top;">
                                        ${lnList.map(ln => {
                                            const lnYear = parseInt(ln.year, 10);
                                            const gzFirst = ln.ganZhi.split(' ')[0];
                                            return `
                                            <div class="ln-single-line">
                                                <span class="ln-y">${lnYear}</span>
                                                <span class="ln-sep">-</span>
                                                <span class="ln-gz" style="color:${getStemColor(gzFirst)};">${ln.ganZhi}</span>
                                                <span class="ln-sep">-</span>
                                                <span class="ln-ss">${ln.shiShen}</span>
                                            </div>`;
                                        }).join('')}
                                    </td>`;
                                }).join('')}
                            </tr>
                        </tbody>
                    </table>`;
                }).join('')}
            </div>`;
        }

        // Chú giải Ngũ Hành
        html += `
            <div class="battu-sheet-footer">
                <div class="battu-legend">
                    <span style="color:#7f8c8d;">■ Kim</span>
                    <span style="color:#27ae60;">■ Mộc</span>
                    <span style="color:#2980b9;">■ Thủy</span>
                    <span style="color:#c0392b;">■ Hỏa</span>
                    <span style="color:#8e5a2b;">■ Thổ</span>
                </div>
            </div>
        </div>`;

        return html;
    }

    global.BatTuRenderer = {
        renderBatTuHtmlTable
    };

})(typeof window !== "undefined" ? window : globalThis);
