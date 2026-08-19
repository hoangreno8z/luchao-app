// ============================================================
// Phong Thủy & Kiến Trúc Controller Script
// Tác giả: Dịch Sư Nguyễn Huy Hoàng
// ============================================================

import { CADFloorplanRenderer } from './js/cad_floorplan_renderer.js';
import { LaKinhRenderer } from './js/la_kinh_renderer.js';
import { findMountain, getOppositeMountain, MOUNTAINS, calculateFlyingStars, calculateGua, generateArchitecturalPlan } from './js/phong_thuy_bundle.js';

let currentMode = 'empty_land';
let currentFloorIndex = 1;
let currentResultData = null;
let cadRenderer = null;
let laKinhRenderer = null;

document.addEventListener('DOMContentLoaded', () => {
    initMenuDropdown();
    initModeTabs();
    initCompassControls();
    initCanvas();
    initActionButtons();

    // Auto-calculate on initial load
    handleCalculate();
});

/* Menu Dropdown */
function initMenuDropdown() {
    const menuBtn = document.getElementById('menu-btn');
    const dropdownMenu = document.getElementById('dropdown-menu');
    if (!menuBtn || !dropdownMenu) return;

    menuBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdownMenu.classList.toggle('show');
    });

    document.addEventListener('click', (e) => {
        if (!dropdownMenu.contains(e.target) && !menuBtn.contains(e.target)) {
            dropdownMenu.classList.remove('show');
        }
    });
}

/* Mode Tabs */
function initModeTabs() {
    const tabEmptyLand = document.getElementById('tabEmptyLand');
    const tabExistingHouse = document.getElementById('tabExistingHouse');
    const groupFloors = document.getElementById('groupFloors');
    const existingRoomsSection = document.getElementById('existingRoomsSection');

    tabEmptyLand.addEventListener('click', () => {
        currentMode = 'empty_land';
        tabEmptyLand.classList.add('active');
        tabExistingHouse.classList.remove('active');
        groupFloors.style.display = 'flex';
        existingRoomsSection.style.display = 'none';
    });

    tabExistingHouse.addEventListener('click', () => {
        currentMode = 'existing_house';
        tabExistingHouse.classList.add('active');
        tabEmptyLand.classList.remove('active');
        existingRoomsSection.style.display = 'block';
    });
}

/* Compass Degree Slider */
function initCompassControls() {
    const slider = document.getElementById('inputFacingDegree');
    const number = document.getElementById('inputFacingNumber');
    const display = document.getElementById('mountainDisplay');

    function updateMountainLabel(deg) {
        const match = findMountain(deg);
        const opp = getOppositeMountain(deg);
        display.textContent = `Hướng ${match.mountain.name} (${deg}°) — Tọa ${opp.mountain.name} Hướng ${match.mountain.name}`;
    }

    slider.addEventListener('input', (e) => {
        const deg = parseFloat(e.target.value) || 0;
        number.value = deg;
        updateMountainLabel(deg);
    });

    number.addEventListener('input', (e) => {
        let deg = parseFloat(e.target.value) || 0;
        deg = Math.max(0, Math.min(360, deg));
        slider.value = deg;
        updateMountainLabel(deg);
    });

    updateMountainLabel(parseFloat(slider.value));
}

/* Initialize Canvas & Renderer */
function initCanvas() {
    const canvas = document.getElementById('cadCanvas');
    if (!canvas) return;

    // High DPI Support
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = (rect.width || 800) * dpr;
    canvas.height = 560 * dpr;

    cadRenderer = new CADFloorplanRenderer(canvas);
    laKinhRenderer = new LaKinhRenderer(canvas);
}

/* Action Buttons & Toolbar */
function initActionButtons() {
    const btnCalculate = document.getElementById('btnCalculate');
    btnCalculate.addEventListener('click', handleCalculate);

    const btnToggleDimensions = document.getElementById('btnToggleDimensions');
    btnToggleDimensions.addEventListener('click', () => {
        cadRenderer.showDimensions = !cadRenderer.showDimensions;
        btnToggleDimensions.classList.toggle('active', cadRenderer.showDimensions);
        renderCurrentFloor();
    });

    const btnToggleFurniture = document.getElementById('btnToggleFurniture');
    btnToggleFurniture.addEventListener('click', () => {
        cadRenderer.showFurniture = !cadRenderer.showFurniture;
        btnToggleFurniture.classList.toggle('active', cadRenderer.showFurniture);
        renderCurrentFloor();
    });

    const btnToggleCompass = document.getElementById('btnToggleCompass');
    btnToggleCompass.addEventListener('click', () => {
        cadRenderer.showCompass = !cadRenderer.showCompass;
        btnToggleCompass.classList.toggle('active', cadRenderer.showCompass);
        renderCurrentFloor();
    });

    const btnExportPng = document.getElementById('btnExportPng');
    btnExportPng.addEventListener('click', handleExportPng);
}

/* Handle Calculate Calculation */
async function handleCalculate() {
    const width = parseFloat(document.getElementById('inputWidth').value) || 5.0;
    const length = parseFloat(document.getElementById('inputLength').value) || 16.0;
    const floors = parseInt(document.getElementById('inputFloors').value) || 2;
    const facingDegree = parseFloat(document.getElementById('inputFacingDegree').value) || 180;
    const buildYear = parseInt(document.getElementById('inputBuildYear').value) || 2025;
    const ownerYear = parseInt(document.getElementById('inputOwnerYear').value) || 1990;
    const ownerGender = document.getElementById('inputOwnerGender').value || 'nam';

    // Existing rooms if in tab 2
    const existingRooms = [];
    if (currentMode === 'existing_house') {
        document.querySelectorAll('input[name="roomItem"]:checked').forEach(cb => {
            existingRooms.push(cb.value);
        });
    }

    const payload = {
        mode: currentMode,
        width,
        length,
        floors: (currentMode === 'existing_house' ? 1 : floors),
        facingDegree,
        buildYear,
        ownerYear,
        ownerGender,
        existingRooms
    };

    let result = null;
    try {
        const res = await fetch('/api/phong_thuy', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        if (res.ok) {
            result = await res.json();
        }
    } catch (e) {
        console.warn('API error, using local fallback:', e);
    }

    // Local Fallback if offline or API unavailable
    if (!result || !result.flyingStars) {
        const flyingStars = calculateFlyingStars({ facingDegree, buildYear });
        const batTrach = calculateGua(ownerYear, ownerGender);
        const architecturalPlan = generateArchitecturalPlan({
            mode: currentMode,
            widthM: width,
            lengthM: length,
            floors: (currentMode === 'existing_house' ? 1 : floors),
            facingDegree,
            flyingStarsData: flyingStars,
            batTrachData: batTrach,
            existingRooms
        });
        result = { flyingStars, batTrach, architecturalPlan };
    }

    currentResultData = result;
    currentFloorIndex = 1;

    document.getElementById('resultsSection').style.display = 'block';

    // Render floor selector
    renderFloorNavigator(result.architecturalPlan.plansByFloor);

    // Render Flying Stars Matrix on Right Panel
    renderFlyingStarsMatrix(result.flyingStars);

    // Render Detailed Assessment
    renderDetailedReport(result);

    // Render CAD Canvas
    renderCurrentFloor();

    // Smooth scroll to results
    document.getElementById('resultsSection').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/* Floor Switcher */
function renderFloorNavigator(plans = []) {
    const nav = document.getElementById('floorNavigator');
    nav.innerHTML = '';

    plans.forEach((p, idx) => {
        const fNum = idx + 1;
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = `floor-btn ${fNum === currentFloorIndex ? 'active' : ''}`;
        btn.textContent = p.floorName;
        btn.addEventListener('click', () => {
            currentFloorIndex = fNum;
            document.querySelectorAll('.floor-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderCurrentFloor();
        });
        nav.appendChild(btn);
    });
}

/* Render Current Floor on Canvas */
function renderCurrentFloor() {
    if (!currentResultData || !cadRenderer) return;
    const plans = currentResultData.architecturalPlan.plansByFloor || [];
    const floorPlan = plans[currentFloorIndex - 1] || plans[0];
    if (!floorPlan) return;

    floorPlan.widthM = currentResultData.architecturalPlan.widthM;
    floorPlan.lengthM = currentResultData.architecturalPlan.lengthM;

    cadRenderer.render(floorPlan, {
        facingDegree: currentResultData.flyingStars.facingDegree,
        facingMountain: currentResultData.flyingStars.facingMountain,
        sittingMountain: currentResultData.flyingStars.sittingMountain
    });
}

/* Render 9-Palace Matrix */
function renderFlyingStarsMatrix(fs) {
    const matrix = document.getElementById('flyingStarsMatrix');
    if (!matrix || !fs || !fs.palaces) return;

    matrix.innerHTML = '';

    // Standard Lo Shu order: 4, 9, 2 / 3, 5, 7 / 8, 1, 6
    const loShuOrder = [4, 9, 2, 3, 5, 7, 8, 1, 6];

    loShuOrder.forEach(p => {
        const pal = fs.palaces[p];
        if (!pal) return;

        const cell = document.createElement('div');
        let cellClass = 'palace-cell';
        if (p === 5) cellClass += ' center-cell';
        if (pal.isSitting) cellClass += ' sitting-cell';
        if (pal.isFacing) cellClass += ' facing-cell';
        cell.className = cellClass;

        cell.innerHTML = `
            <div class="cell-header">${pal.palaceName.split(' ')[0]}</div>
            <div class="cell-stars-row">
                <span class="star-son" title="Sao Tọa">${pal.sonStar}</span>
                <span class="star-huong" title="Sao Hướng">${pal.huongStar}</span>
            </div>
            <div class="star-van" title="Sao Vận">${pal.vanStar}</div>
            <div class="star-nien-nguyet">N:${pal.nienStar} T:${pal.nguyetStar}</div>
        `;
        matrix.appendChild(cell);
    });

    // Update Meta
    document.getElementById('metaVan').textContent = `Vận ${fs.van} (2024 - 2043)`;
    document.getElementById('metaToaHuong').textContent = `Tọa ${fs.sittingMountain} — Hướng ${fs.facingMountain} (${fs.facingDegree}°)`;
    document.getElementById('chartTypeBadge').textContent = fs.chartTypeLabel;

    if (currentResultData && currentResultData.batTrach) {
        document.getElementById('metaGua').textContent = currentResultData.batTrach.guaName;
    }

    // Update Cách Cục Summary
    document.getElementById('cachCucTitle').textContent = fs.cachCuc.name;
    document.getElementById('cachCucDesc').textContent = fs.cachCuc.summary + ' ' + fs.cachCuc.recommendation;
}

/* Render Detailed Feng Shui Report */
function renderDetailedReport(data) {
    const container = document.getElementById('detailedReportContainer');
    if (!container || !data || !data.flyingStars) return;

    container.innerHTML = '';

    const fs = data.flyingStars;
    const bt = data.batTrach || {};
    const btMap = bt.batTrachMap || {};

    for (let p = 1; p <= 9; p++) {
        const pal = fs.palaces[p];
        if (!pal) continue;

        const btInfo = btMap[pal.direction] || { name: 'Bình Hòa', type: 'BÌNH', desc: 'Cung vị trung tính' };

        const card = document.createElement('div');
        card.style.background = 'rgba(15, 23, 42, 0.7)';
        card.style.border = '1px solid rgba(245, 158, 11, 0.2)';
        card.style.borderRadius = '10px';
        card.style.padding = '14px';

        let gradeBadge = '<span class="audit-badge good">Cát Tinh</span>';
        if (pal.analysis.grade === 'HUNG' || pal.analysis.grade === 'ĐẠI HUNG') {
            gradeBadge = '<span class="audit-badge bad">Hung Sát</span>';
        } else if (pal.analysis.grade === 'ĐẠI CÁT') {
            gradeBadge = '<span class="audit-badge good" style="background:#10b981; color:#fff;">Đại Cát</span>';
        }

        card.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
                <strong style="color:var(--gold-light); font-size:0.95rem;">${pal.palaceName}</strong>
                ${gradeBadge}
            </div>
            <div style="font-size:0.82rem; color:#cbd5e1; margin-bottom:6px;">
                <strong>Sao Tinh Bàn:</strong> Sơn ${pal.sonStar} — Hướng ${pal.huongStar} (Vận ${pal.vanStar})
            </div>
            <div style="font-size:0.82rem; color:#93c5fd; margin-bottom:6px;">
                <strong>Bát Trạch Mệnh:</strong> ${btInfo.name} (${btInfo.type}) — ${btInfo.desc}
            </div>
            <div style="font-size:0.8rem; color:#94a3b8; line-height:1.5;">
                <strong>Luận Đoán & Hóa Giải:</strong> ${pal.analysis.desc}
            </div>
        `;

        container.appendChild(card);
    }
}

/* Export HD PNG */
function handleExportPng() {
    const canvas = document.getElementById('cadCanvas');
    if (!canvas) return;

    const link = document.createElement('a');
    link.download = `Mat_Bang_Phong_Thuy_${currentResultData?.flyingStars?.facingMountain || 'Nha'}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
}
