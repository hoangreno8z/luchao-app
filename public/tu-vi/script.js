/**
 * TU VI INTERACTIVE CONTROLLER
 * Developed for Dich Su Nguyen Huy Hoang
 */

import { TuViEngine, ELEMENT_COLORS, CAN_ELEMENTS } from './js/tu_vi_engine.js';
import { TuViPngExporter } from './js/tu_vi_png_exporter.js';
import { TU_VI_REFERENCE } from './js/tu_vi_reference.js';

let currentHoroscope = null;

// Initial setup on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    // Menu Dropdown Toggle
    const menuBtn = document.getElementById('menuToggleBtn');
    const dropdown = document.getElementById('portalDropdownMenu');
    if (menuBtn && dropdown) {
        menuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            dropdown.classList.toggle('show');
        });
        document.addEventListener('click', () => {
            dropdown.classList.remove('show');
        });
    }

    // Reference Tabs
    setupReferenceTabs();

    // Export PNG Button
    const btnExport = document.getElementById('btnExportPng');
    if (btnExport) {
        btnExport.addEventListener('click', () => {
            if (currentHoroscope) {
                const name = currentHoroscope.metadata.name.replace(/\s+/g, '_');
                TuViPngExporter.exportToPng(currentHoroscope, `La_So_Tu_Vi_${name}.png`);
            }
        });
    }

    // Print Button
    const btnPrint = document.getElementById('btnPrintTuVi');
    if (btnPrint) {
        btnPrint.addEventListener('click', () => {
            window.print();
        });
    }

    // Form Submit
    const form = document.getElementById('tuViForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            generateHoroscope();
        });
    }

    // Toggle Sao Luu Events
    const cbSaoLuu = document.getElementById('checkboxSaoLuu');
    if (cbSaoLuu) {
        cbSaoLuu.addEventListener('change', () => {
            generateHoroscope();
        });
    }

    const cbDaoHong = document.getElementById('checkboxDaoHongLuu');
    if (cbDaoHong) {
        cbDaoHong.addEventListener('change', () => {
            generateHoroscope();
        });
    }

    const cbLuongThi = document.getElementById('checkboxLuongThi');
    if (cbLuongThi) {
        cbLuongThi.addEventListener('change', () => {
            generateHoroscope();
        });
    }

    // Toggle Mobile View Mode (Fit Screen vs Zoom)
    const btnToggleFit = document.getElementById('btnToggleFitScreen');
    const chartWrapper = document.querySelector('.chart-container-wrapper');
    if (btnToggleFit && chartWrapper) {
        btnToggleFit.addEventListener('click', () => {
            chartWrapper.classList.toggle('fit-screen-mode');
            if (chartWrapper.classList.contains('fit-screen-mode')) {
                btnToggleFit.innerHTML = '<span>🔍 Chế Độ Phóng To</span>';
            } else {
                btnToggleFit.innerHTML = '<span>📱 Vừa Màn Hình</span>';
            }
        });
    }

    // Set default values (e.g. 2008 Mậu Tý like example)
    document.getElementById('inputName').value = 'Nguyễn Văn A';
    document.getElementById('inputGender').value = 'Nam';
    document.getElementById('inputSolarDay').value = 8;
    document.getElementById('inputSolarMonth').value = 8;
    document.getElementById('inputSolarYear').value = 2008;
    document.getElementById('inputHour').value = 5; // Tị (9h-11h)
    document.getElementById('inputViewYear').value = 2026;

    // Generate initial chart
    generateHoroscope();
});

function generateHoroscope() {
    const name = document.getElementById('inputName').value.trim() || 'Đương Số';
    const gender = document.getElementById('inputGender').value;
    const solarDay = parseInt(document.getElementById('inputSolarDay').value);
    const solarMonth = parseInt(document.getElementById('inputSolarMonth').value);
    const solarYear = parseInt(document.getElementById('inputSolarYear').value);
    const hourIndex = parseInt(document.getElementById('inputHour').value);
    const viewYear = parseInt(document.getElementById('inputViewYear').value) || 2026;

    const showSaoLuu = document.getElementById('checkboxSaoLuu') ? document.getElementById('checkboxSaoLuu').checked : true;
    const showDaoHongLuu = document.getElementById('checkboxDaoHongLuu') ? document.getElementById('checkboxDaoHongLuu').checked : true;
    const luongThiMode = document.getElementById('checkboxLuongThi') ? document.getElementById('checkboxLuongThi').checked : false;

    // Convert Solar to Lunar using Lunar-JS
    let lunarDay = solarDay, lunarMonth = solarMonth, lunarYear = solarYear, isLeap = false;
    try {
        if (window.Solar) {
            const solar = window.Solar.fromYmd(solarYear, solarMonth, solarDay);
            const lunar = solar.getLunar();
            lunarDay = lunar.getDay();
            lunarMonth = Math.abs(lunar.getMonth());
            lunarYear = lunar.getYear();
            isLeap = lunar.getMonth() < 0;
        }
    } catch (err) {
        console.warn('Lunar conversion fallback:', err);
    }

    // Calculate Horoscope
    currentHoroscope = TuViEngine.calculateHoroscope({
        name,
        gender,
        solarDay, solarMonth, solarYear,
        lunarDay, lunarMonth, lunarYear, isLeap,
        hourIndex,
        viewYear,
        showSaoLuu,
        showDaoHongLuu,
        luongThiMode
    });

    // Render to Grid
    renderChart(currentHoroscope);
}

function renderChart(data) {
    const grid = document.getElementById('tuviGrid');
    if (!grid) return;
    grid.innerHTML = '';

    // Palace cell map for 4x4 Grid layout:
    // Row 0: 5 (Tị), 6 (Ngọ), 7 (Mùi), 8 (Thân)
    // Row 1: 4 (Thìn), [TC], [TC], 9 (Dậu)
    // Row 2: 3 (Mão), [TC], [TC], 10 (Tuất)
    // Row 3: 2 (Dần), 1 (Sửu), 0 (Tý), 11 (Hợi)
    const gridMatrix = [
        [5, 6, 7, 8],
        [4, 'TC', 'TC', 9],
        [3, 'TC', 'TC', 10],
        [2, 1, 0, 11]
    ];

    // Render Middle Trung Cung First
    const tcBox = document.createElement('div');
    tcBox.className = 'trung-cung-box';
    tcBox.innerHTML = `
        <div class="tc-header">
            <div class="tc-title">DỊCH SƯ NGUYỄN HUY HOÀNG</div>
        </div>
        <div class="tc-info-grid">
            <div class="tc-row"><span class="tc-label">Họ tên:</span><span class="tc-value" style="color:#1d4ed8;">${data.metadata.name}</span></div>
            <div class="tc-row"><span class="tc-label">Âm Dương:</span><span class="tc-value">${data.metadata.amDuongNamNu}</span></div>
            
            <div class="tc-row"><span class="tc-label">Năm sinh:</span><span class="tc-value">${data.metadata.solarDate.split('/')[2]} (${data.metadata.lunarYearCanChi})</span></div>
            <div class="tc-row"><span class="tc-label">Bản Mệnh:</span><span class="tc-value" style="color:${ELEMENT_COLORS[data.metadata.banMenhElement]};">${data.metadata.banMenh}</span></div>
            
            <div class="tc-row"><span class="tc-label">Tháng sinh:</span><span class="tc-value">${data.metadata.solarDate.split('/')[1]} (${data.metadata.lunarMonthCanChi})</span></div>
            <div class="tc-row"><span class="tc-label">Cục:</span><span class="tc-value" style="color:${ELEMENT_COLORS[data.metadata.cucInfo.element]};">${data.metadata.cucInfo.name}</span></div>
            
            <div class="tc-row"><span class="tc-label">Ngày sinh:</span><span class="tc-value">${data.metadata.solarDate.split('/')[0]} (${data.metadata.lunarDayCanChi})</span></div>
            <div class="tc-row"><span class="tc-label">Chủ Mệnh:</span><span class="tc-value">${data.metadata.chuMenh}</span></div>
            
            <div class="tc-row"><span class="tc-label">Giờ sinh:</span><span class="tc-value">Giờ ${data.metadata.hourName}</span></div>
            <div class="tc-row"><span class="tc-label">Chủ Thân:</span><span class="tc-value">${data.metadata.chuThan}</span></div>
            
            <div class="tc-row"><span class="tc-label">Năm xem:</span><span class="tc-value">${data.metadata.viewYear} (${data.metadata.viewYearCanChi}) — ${data.metadata.age}t</span></div>
            <div class="tc-row"><span class="tc-label">Thân cư:</span><span class="tc-value" style="color:#b91c1c;">Thân cư ${data.metadata.thanCungName}</span></div>
            
            <div class="tc-row"><span class="tc-label">Đánh giá:</span><span class="tc-value">${data.metadata.amDuongLy}</span></div>
            <div class="tc-row"><span class="tc-label">Tương tác:</span><span class="tc-value">${data.metadata.cucMenhTuongTac}</span></div>
        </div>
        <div class="tc-author-box">
            <div class="tc-author-contact">Zalo: 0933 116 860  •  Facebook: Hoàng ngủ mơ</div>
            <div class="tc-author-quote">“Gìn giữ tri thức cổ • Ứng dụng vào đời sống • Hướng tới minh triết và an tâm”</div>
        </div>
    `;

    // Map 12 Palaces into Grid Cells
    for (let r = 0; r < 4; r++) {
        for (let c = 0; c < 4; c++) {
            const cellType = gridMatrix[r][c];
            if (cellType === 'TC') {
                if (r === 1 && c === 1) {
                    grid.appendChild(tcBox);
                }
                continue;
            }

            const palace = data.palaces[cellType];
            const pEl = document.createElement('div');
            pEl.className = 'palace-box';
            pEl.style.gridRow = `${r + 1}`;
            pEl.style.gridColumn = `${c + 1}`;

            // Can Cung Color
            const canColor = ELEMENT_COLORS[palace.canElement] || '#0f172a';
            const cungNameColorClass = palace.cungName === 'MỆNH' ? 'menh' : '';
            const cungTitle = palace.isThan ? `${palace.cungName} &lt;THÂN&gt;` : palace.cungName;

            // Main Stars HTML
            let mainStarsHtml = '';
            palace.mainStars.forEach(s => {
                const sColor = ELEMENT_COLORS[s.element] || '#0f172a';
                const text = s.mieuHam ? `${s.name}(${s.mieuHam})` : s.name;
                mainStarsHtml += `<span class="main-star-item" style="color:${sColor};">${text}</span>`;
            });

            // Good Stars HTML (Left Column)
            let goodStarsHtml = '';
            palace.goodStars.forEach(s => {
                const sColor = ELEMENT_COLORS[s.element] || '#15803d';
                const text = s.mieuHam ? `${s.name}(${s.mieuHam})` : s.name;
                goodStarsHtml += `<span style="color:${sColor};">${text}</span>`;
            });

            // Bad Stars HTML (Right Column)
            let badStarsHtml = '';
            palace.badStars.forEach(s => {
                const sColor = ELEMENT_COLORS[s.element] || '#dc2626';
                const text = s.mieuHam ? `${s.name}(${s.mieuHam})` : s.name;
                badStarsHtml += `<span style="color:${sColor};">${text}</span>`;
            });

            pEl.innerHTML = `
                <div class="palace-header">
                    <span class="can-cung" style="color:${canColor};">${palace.canName}</span>
                    <span class="cung-name ${cungNameColorClass}">${cungTitle}</span>
                    <span class="dai-han">${palace.daiHan}</span>
                </div>
                <div class="main-stars-list">
                    ${mainStarsHtml}
                </div>
                <div class="stars-two-columns">
                    <div class="col-good">${goodStarsHtml}</div>
                    <div class="col-bad">${badStarsHtml}</div>
                </div>
                <div class="palace-footer">
                    <span>${palace.chiName}</span>
                    <span>${palace.trangSinh}</span>
                    <span>${palace.nguyetHan}</span>
                </div>
            `;
            grid.appendChild(pEl);
        }
    }

    // Attach Tuần & Triệt Badges if applicable
    renderTuanTrietBadges(grid, data.metadata.tuanCungs, 'Tuần');
    renderTuanTrietBadges(grid, data.metadata.trietCungs, 'Triệt');
}

function renderTuanTrietBadges(grid, cungs, label) {
    if (!cungs || cungs.length < 2) return;
    const badge = document.createElement('div');
    badge.className = label === 'Tuần' ? 'badge-tuan' : 'badge-triet';
    badge.textContent = label;

    // Helper positions for Tuần / Triệt pairs in 4x4 layout:
    // (5,6): top col 0-1, (6,7): top col 1-2, (7,8): top col 2-3
    // (8,9): right row 0-1, (9,10): right row 1-2, (10,11): right row 2-3
    // (11,0): bottom col 3-2, (0,1): bottom col 2-1, (1,2): bottom col 1-0
    // (2,3): left row 3-2, (3,4): left row 2-1, (4,5): left row 1-0
    const [c1, c2] = cungs;
    let topPercent = '50%', leftPercent = '50%';

    if ((c1 === 8 && c2 === 9) || (c1 === 9 && c2 === 8)) {
        topPercent = '25%'; leftPercent = '100%';
    } else if ((c1 === 6 && c2 === 7) || (c1 === 7 && c2 === 6)) {
        topPercent = '0%'; leftPercent = '50%';
    } else if ((c1 === 4 && c2 === 5) || (c1 === 5 && c2 === 4)) {
        topPercent = '25%'; leftPercent = '0%';
    } else if ((c1 === 2 && c2 === 3) || (c1 === 3 && c2 === 2)) {
        topPercent = '75%'; leftPercent = '0%';
    } else if ((c1 === 0 && c2 === 1) || (c1 === 1 && c2 === 0)) {
        topPercent = '100%'; leftPercent = '50%';
    } else if ((c1 === 10 && c2 === 11) || (c1 === 11 && c2 === 10)) {
        topPercent = '75%'; leftPercent = '100%';
    }

    badge.style.top = topPercent;
    badge.style.left = leftPercent;
    grid.appendChild(badge);
}

function setupReferenceTabs() {
    const tabs = document.querySelectorAll('.ref-tab-btn');
    const container = document.getElementById('refContentGrid');
    if (!tabs || !container) return;

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            const key = tab.dataset.tab;
            renderReferenceCategory(key, container);
        });
    });

    renderReferenceCategory('chinh_tinh', container);
}

function renderReferenceCategory(key, container) {
    const data = TU_VI_REFERENCE[key];
    if (!data) return;

    let html = '';
    data.stars.forEach(s => {
        html += `
            <div class="ref-star-card">
                <div class="ref-star-title">
                    <span>${s.name}</span>
                    <span style="font-size:0.8rem; color:${ELEMENT_COLORS[s.element] || '#fbbf24'};">${s.element || ''}</span>
                </div>
                ${s.nature ? `<div class="ref-star-nature">${s.nature}</div>` : ''}
                <div class="ref-star-desc">${s.meaning}</div>
            </div>
        `;
    });
    container.innerHTML = html;
}
