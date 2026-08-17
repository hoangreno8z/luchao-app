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

    // Form Submit
    const form = document.getElementById('tuViForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            generateHoroscope();
        });
    }

    // Toggle Sao Luu & Luong Thi Events
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
    const solarDay = parseInt(document.getElementById('inputSolarDay').value, 10);
    const solarMonth = parseInt(document.getElementById('inputSolarMonth').value, 10);
    const solarYear = parseInt(document.getElementById('inputSolarYear').value, 10);
    const hourIndex = parseInt(document.getElementById('inputHour').value, 10);
    const viewYear = parseInt(document.getElementById('inputViewYear').value, 10) || 2026;

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

    // Render directly to HD Image Mount
    renderChart(currentHoroscope);
}

function renderChart(data) {
    const imgMount = document.getElementById('tuviImageMount');
    if (!imgMount || !data) return;

    try {
        const dataUrl = TuViPngExporter.generateChartDataUrl(data);
        imgMount.src = dataUrl;
    } catch (err) {
        console.error('Error rendering chart image:', err);
    }
}

/**
 * Setup Reference Dictionary Tabs
 */
function setupReferenceTabs() {
    const tabButtons = document.querySelectorAll('.ref-tab-btn');
    const container = document.getElementById('refContentMount');

    if (!tabButtons.length || !container) return;

    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            tabButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const tabKey = btn.getAttribute('data-tab');
            renderReferenceContent(tabKey, container);
        });
    });

    // Default Tab
    renderReferenceContent('chinh_tinh', container);
}

function renderReferenceContent(tabKey, container) {
    const data = TU_VI_REFERENCE[tabKey];
    if (!data) {
        container.innerHTML = '<p style="color:#94a3b8; text-align:center;">Chưa có dữ liệu tra cứu cho mục này.</p>';
        return;
    }

    let html = '';
    data.forEach(item => {
        const nature = item.nature ? `<div class="ref-star-nature">${item.nature}</div>` : '';
        const elementColor = ELEMENT_COLORS[item.element] || '#fbbf24';
        const elementBadge = item.element ? `<span style="color:${elementColor}; font-size:0.75rem; font-weight:700;">[Hành ${item.element}]</span>` : '';

        html += `
            <div class="ref-star-card">
                <div class="ref-star-title">
                    <span style="color:#f8fafc;">${item.name}</span>
                    ${elementBadge}
                </div>
                ${nature}
                <div class="ref-star-desc">${item.meaning}</div>
            </div>
        `;
    });

    container.innerHTML = html;
}
