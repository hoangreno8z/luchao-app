// ============================================================
// Phong Thủy & Kiến Trúc Controller Script
// Parametric Floorplan Generator + Dual-Drawing SVG Viewport
// Tác giả: Dịch Sư Nguyễn Huy Hoàng
// ============================================================

import {
    findMountain,
    getOppositeMountain,
    calculateFlyingStars,
    calculateGua,
    generateParametricFloorplan,
    ArchitecturalCADRenderer,
    calculateFengShuiSpatial,
    renderNinePalacesOverlaySvg,
    SvgViewportController,
    PALACE_NAMES
} from './js/phong_thuy_bundle.js';

let currentMode = 'empty_land';
let currentFloorIndex = 1;
let currentDrawingTab = 'arch'; // 'arch' | 'fengshui'
let currentThemeMode = 'white'; // 'white' | 'dark'
let currentGeometry = null;
let currentSpatialResult = null;
let currentFlyingStars = null;
let currentBatTrach = null;

let cadRenderer = null;
let viewportController = null;

const layerState = {
    dimensions: true,
    furniture: true,
    axes: true,
    compass: true
};

document.addEventListener('DOMContentLoaded', () => {
    initMenuDropdown();
    initModeTabs();
    initDrawingTabs();
    initCompassControls();
    initViewport();
    initToolbar();
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

/* Mode Tabs: Đất Trống vs Nhà Sẵn Có */
function initModeTabs() {
    const tabEmptyLand = document.getElementById('tabEmptyLand');
    const tabExistingHouse = document.getElementById('tabExistingHouse');
    const groupFloors = document.getElementById('groupFloors');
    const emptyLandRoomsConfig = document.getElementById('emptyLandRoomsConfig');
    const existingRoomsSection = document.getElementById('existingRoomsSection');

    if (!tabEmptyLand || !tabExistingHouse) return;

    tabEmptyLand.addEventListener('click', () => {
        currentMode = 'empty_land';
        tabEmptyLand.classList.add('active');
        tabExistingHouse.classList.remove('active');
        if (groupFloors) groupFloors.style.display = 'flex';
        if (emptyLandRoomsConfig) emptyLandRoomsConfig.style.display = 'block';
        if (existingRoomsSection) existingRoomsSection.style.display = 'none';
    });

    tabExistingHouse.addEventListener('click', () => {
        currentMode = 'existing_house';
        tabExistingHouse.classList.add('active');
        tabEmptyLand.classList.remove('active');
        if (groupFloors) groupFloors.style.display = 'none';
        if (emptyLandRoomsConfig) emptyLandRoomsConfig.style.display = 'none';
        if (existingRoomsSection) existingRoomsSection.style.display = 'block';
    });
}

/* 2 Main Drawing Mode Tabs: Bản Vẽ Kiến Trúc vs Bản Vẽ Cửu Cung */
function initDrawingTabs() {
    const tabArch = document.getElementById('tabDrawingArch');
    const tabFengShui = document.getElementById('tabDrawingFengShui');

    if (!tabArch || !tabFengShui) return;

    tabArch.addEventListener('click', () => {
        currentDrawingTab = 'arch';
        tabArch.classList.add('active');
        tabFengShui.classList.remove('active');
        renderActiveDrawing();
    });

    tabFengShui.addEventListener('click', () => {
        currentDrawingTab = 'fengshui';
        tabFengShui.classList.add('active');
        tabArch.classList.remove('active');
        renderActiveDrawing();
    });
}

/* Compass Degree Slider */
function initCompassControls() {
    const slider = document.getElementById('inputFacingDegree');
    const number = document.getElementById('inputFacingNumber');
    const display = document.getElementById('mountainDisplay');

    if (!slider || !number || !display) return;

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

    updateMountainLabel(parseFloat(slider.value) || 180);
}

/* SVG Viewport Initialization */
function initViewport() {
    const stage = document.getElementById('svgStage');
    if (!stage) return;
    viewportController = new SvgViewportController(stage);
    cadRenderer = new ArchitecturalCADRenderer({ theme: currentThemeMode });
}

/* Toolbar Controls */
function initToolbar() {
    const btnToggleTheme = document.getElementById('btnToggleTheme');
    const txtThemeMode = document.getElementById('txtThemeMode');
    const btnToggleDimensions = document.getElementById('btnToggleDimensions');
    const btnToggleFurniture = document.getElementById('btnToggleFurniture');
    const btnToggleAxes = document.getElementById('btnToggleAxes');
    const btnToggleCompass = document.getElementById('btnToggleCompass');

    const btnZoomIn = document.getElementById('btnZoomIn');
    const btnZoomOut = document.getElementById('btnZoomOut');
    const btnZoomFit = document.getElementById('btnZoomFit');

    const btnExportSvg = document.getElementById('btnExportSvg');
    const btnExportPng = document.getElementById('btnExportPng');
    const wrapper = document.querySelector('.canvas-viewport-wrapper');

    if (btnToggleTheme) {
        btnToggleTheme.addEventListener('click', () => {
            currentThemeMode = currentThemeMode === 'white' ? 'dark' : 'white';
            if (txtThemeMode) {
                txtThemeMode.textContent = currentThemeMode === 'white' ? 'Bản Vẽ Trắng (CAD)' : 'Bản Vẽ Tối (CAD)';
            }
            if (wrapper) {
                if (currentThemeMode === 'dark') wrapper.classList.add('dark-mode');
                else wrapper.classList.remove('dark-mode');
            }
            cadRenderer.theme = currentThemeMode;
            renderActiveDrawing();
        });
    }

    if (btnToggleDimensions) {
        btnToggleDimensions.addEventListener('click', () => {
            layerState.dimensions = !layerState.dimensions;
            btnToggleDimensions.classList.toggle('active', layerState.dimensions);
            cadRenderer.showDimensions = layerState.dimensions;
            renderActiveDrawing();
        });
    }

    if (btnToggleFurniture) {
        btnToggleFurniture.addEventListener('click', () => {
            layerState.furniture = !layerState.furniture;
            btnToggleFurniture.classList.toggle('active', layerState.furniture);
            cadRenderer.showFurniture = layerState.furniture;
            renderActiveDrawing();
        });
    }

    if (btnToggleAxes) {
        btnToggleAxes.addEventListener('click', () => {
            layerState.axes = !layerState.axes;
            btnToggleAxes.classList.toggle('active', layerState.axes);
            cadRenderer.showAxes = layerState.axes;
            renderActiveDrawing();
        });
    }

    if (btnToggleCompass) {
        btnToggleCompass.addEventListener('click', () => {
            layerState.compass = !layerState.compass;
            btnToggleCompass.classList.toggle('active', layerState.compass);
            cadRenderer.showCompass = layerState.compass;
            renderActiveDrawing();
        });
    }

    if (btnZoomIn && viewportController) {
        btnZoomIn.addEventListener('click', () => viewportController.zoomIn());
    }
    if (btnZoomOut && viewportController) {
        btnZoomOut.addEventListener('click', () => viewportController.zoomOut());
    }
    if (btnZoomFit && viewportController) {
        btnZoomFit.addEventListener('click', () => viewportController.fitToScreen());
    }

    if (btnExportSvg && viewportController) {
        btnExportSvg.addEventListener('click', () => {
            const fileName = currentDrawingTab === 'arch' ? 'Ban_Ve_Kien_Truc.svg' : 'Ban_Ve_Cuu_Cung.svg';
            viewportController.exportSvg(fileName);
        });
    }

    if (btnExportPng && viewportController) {
        btnExportPng.addEventListener('click', () => {
            const fileName = currentDrawingTab === 'arch' ? 'Ban_Ve_Kien_Truc.png' : 'Ban_Ve_Cuu_Cung.png';
            viewportController.exportPng(fileName, 3);
        });
    }
}

/* Action Button: TRIỂN KHAI */
function initActionButtons() {
    const btnCalculate = document.getElementById('btnCalculate');
    if (btnCalculate) {
        btnCalculate.addEventListener('click', handleCalculate);
    }
}

/* Main Calculation & Geometry Synthesis */
function handleCalculate() {
    const widthM = parseFloat(document.getElementById('inputWidth').value) || 5.0;
    const lengthM = parseFloat(document.getElementById('inputLength').value) || 16.0;
    const floors = parseInt(document.getElementById('inputFloors').value, 10) || 2;
    const buildYear = parseInt(document.getElementById('inputBuildYear').value, 10) || 2025;
    const currentYear = document.getElementById('inputCurrentYear') ? parseInt(document.getElementById('inputCurrentYear').value, 10) || 2026 : 2026;
    const currentMonth = document.getElementById('inputCurrentMonth') ? parseInt(document.getElementById('inputCurrentMonth').value, 10) || 8 : 8;
    const currentDay = document.getElementById('inputCurrentDay') ? parseInt(document.getElementById('inputCurrentDay').value, 10) || 19 : 19;
    const currentHour = document.getElementById('inputCurrentHour') ? parseInt(document.getElementById('inputCurrentHour').value, 10) || 7 : 7;
    const ownerYear = parseInt(document.getElementById('inputOwnerYear').value, 10) || 1990;
    const ownerGender = document.getElementById('inputOwnerGender').value || 'nam';
    const facingDegree = parseFloat(document.getElementById('inputFacingDegree').value) || 180;

    const roomCounts = {
        livingRoom: document.getElementById('inputLivingRoom') ? document.getElementById('inputLivingRoom').value : '1',
        kitchen: document.getElementById('inputKitchen') ? document.getElementById('inputKitchen').value : '1',
        hasGarage: document.getElementById('inputGarage') ? document.getElementById('inputGarage').value : '0',
        stairsType: document.getElementById('inputStairsType') ? document.getElementById('inputStairsType').value : 'middle',
        bedrooms: document.getElementById('inputBedCount') ? document.getElementById('inputBedCount').value : '3',
        toilets: document.getElementById('inputWcCount') ? document.getElementById('inputWcCount').value : '2',
        hasAltar: document.getElementById('inputHasAltar') ? document.getElementById('inputHasAltar').value : '1',
        hasCommonRoom: document.getElementById('inputHasCommonRoom') ? document.getElementById('inputHasCommonRoom').value : '0',
        hasLaundry: document.getElementById('inputHasLaundry') ? document.getElementById('inputHasLaundry').value : 'roof',
        hasSkylight: document.getElementById('inputHasSkylight') ? document.getElementById('inputHasSkylight').value : '1'
    };

    // 1. Sinh HouseGeometry (Single Source of Truth)
    currentGeometry = generateParametricFloorplan({
        mode: currentMode,
        widthM,
        lengthM,
        floors,
        facingDegree,
        roomCounts
    });

    // 2. Tính Tinh Bàn Huyền Không (Vận + Niên, Nguyệt, Nhật, Thời) & Bát Trạch
    currentFlyingStars = calculateFlyingStars({
        facingDegree,
        buildYear,
        currentYear,
        currentMonth,
        currentDay,
        currentHour
    });
    currentBatTrach = calculateGua(ownerYear, ownerGender);

    // 3. Tính Cửu Cung Không Gian
    currentSpatialResult = calculateFengShuiSpatial(currentGeometry, {
        facingDegree,
        buildYear,
        currentYear,
        currentMonth,
        currentDay,
        currentHour,
        ownerYear,
        ownerGender
    });

    // 4. Hiển thị khu vực kết quả
    const resultsSection = document.getElementById('resultsSection');
    if (resultsSection) resultsSection.style.display = 'block';

    // 5. Cập nhật thanh điều hướng tầng
    renderFloorNavigator(currentGeometry.plansByFloor);

    // 6. Render bản vẽ SVG đang chọn
    renderActiveDrawing();

    // 7. Cập nhật Tinh Bàn 9 ô bên phải
    renderFlyingStarsMatrix(currentFlyingStars, currentBatTrach);

    // 8. Cập nhật báo cáo luận đoán chi tiết
    renderDetailedReport(currentSpatialResult);
}

/* Floor Switcher Navigation */
function renderFloorNavigator(plansByFloor) {
    const nav = document.getElementById('floorNavigator');
    if (!nav || !plansByFloor) return;

    nav.innerHTML = plansByFloor.map((p, idx) => `
        <button type="button" class="floor-btn ${p.floorIndex === currentFloorIndex ? 'active' : ''}" data-floor="${p.floorIndex}">
            ${p.floorName}
        </button>
    `).join('');

    nav.querySelectorAll('.floor-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            currentFloorIndex = parseInt(btn.getAttribute('data-floor'), 10) || 1;
            nav.querySelectorAll('.floor-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderActiveDrawing();
        });
    });
}

/* Render Active Drawing (Arch vs Feng Shui Overlay) */
function renderActiveDrawing() {
    if (!currentGeometry || !viewportController) return;

    const floorGeometry = (currentGeometry.plansByFloor && currentGeometry.plansByFloor[currentFloorIndex - 1]) 
        ? currentGeometry.plansByFloor[currentFloorIndex - 1] 
        : currentGeometry;

    // Render Bản vẽ 1 (Kiến trúc CAD)
    let baseSvg = cadRenderer.renderSvg(floorGeometry, {
        theme: currentThemeMode,
        facingDegree: currentFlyingStars ? currentFlyingStars.facingDegree : 180
    });

    if (currentDrawingTab === 'fengshui') {
        const spatial = calculateFengShuiSpatial(floorGeometry, {
            facingDegree: currentFlyingStars ? currentFlyingStars.facingDegree : 180,
            buildYear: currentFlyingStars ? currentFlyingStars.van : 2025
        });
        const overlaySvg = renderNinePalacesOverlaySvg(spatial, currentThemeMode === 'white');
        baseSvg = baseSvg.replace('</svg>', `${overlaySvg}</svg>`);
    }

    viewportController.setSvgContent(baseSvg);
}

/* Render 9-Palace Xuan Kong Matrix Display */
function renderFlyingStarsMatrix(flyingStars, batTrach) {
    const matrixContainer = document.getElementById('flyingStarsMatrix');
    const metaVan = document.getElementById('metaVan');
    const metaToaHuong = document.getElementById('metaToaHuong');
    const metaGua = document.getElementById('metaGua');

    if (metaVan) metaVan.textContent = `Vận ${flyingStars.van} (${flyingStars.currentYear || 2026})`;
    if (metaToaHuong) metaToaHuong.textContent = `Tọa ${flyingStars.sittingMountain} Hướng ${flyingStars.facingMountain} (${flyingStars.chartType === 'chinh_huong' ? 'Hạ Quái' : 'Thế Quái'})`;
    if (metaGua) metaGua.textContent = `${batTrach.guaName} (${batTrach.trachGroup})`;

    if (!matrixContainer || !flyingStars.palaces) return;

    // Lạc Thư: 4, 9, 2 / 3, 5, 7 / 8, 1, 6
    const order = [4, 9, 2, 3, 5, 7, 8, 1, 6];

    matrixContainer.innerHTML = order.map(pId => {
        const pal = flyingStars.palaces[pId];
        if (!pal) return '';
        return `
            <div class="palace-cell">
                <div class="time-stars-row" style="display: flex; justify-content: center; gap: 3px; margin-bottom: 4px;">
                    <span style="display:inline-block; width:18px; height:18px; line-height:18px; border-radius:50%; background:#22c55e; color:#fff; font-size:10px; font-weight:bold; text-align:center;" title="Niên Tinh">${pal.nienStar}</span>
                    <span style="display:inline-block; width:18px; height:18px; line-height:18px; border-radius:50%; background:#ef4444; color:#fff; font-size:10px; font-weight:bold; text-align:center;" title="Nguyệt Tinh">${pal.nguyetStar}</span>
                    <span style="display:inline-block; width:18px; height:18px; line-height:18px; border-radius:50%; background:#3b82f6; color:#fff; font-size:10px; font-weight:bold; text-align:center;" title="Nhật Tinh">${pal.nhatStar}</span>
                    <span style="display:inline-block; width:18px; height:18px; line-height:18px; border-radius:50%; background:#eab308; color:#000; font-size:10px; font-weight:bold; text-align:center;" title="Thời Tinh">${pal.thoiStar}</span>
                </div>
                <div class="palace-stars-trio">
                    <span class="star-badge-son" title="Sơn Tinh">${pal.sonStar}</span>
                    <span class="star-badge-van" title="Vận Tinh" style="font-size: 1.4rem; font-weight: 900;">${pal.vanStar}</span>
                    <span class="star-badge-huong" title="Hướng Tinh">${pal.huongStar}</span>
                </div>
                <span class="palace-name-badge">${PALACE_NAMES[pId] || pId}</span>
            </div>
        `;
    }).join('');
}

/* Render Detailed Report */
function renderDetailedReport(spatialResult) {
    const container = document.getElementById('detailedReportContainer');
    if (!container || !spatialResult || !spatialResult.spatialPalaces) return;

    const palaces = Object.values(spatialResult.spatialPalaces);

    container.innerHTML = palaces.map(p => {
        const isGood = p.grade === 'CÁT' || p.grade === 'ĐẠI CÁT';
        return `
            <div class="report-card">
                <div class="report-card-header">
                    <span class="report-palace-title">${p.name} (${p.trigram})</span>
                    <span class="audit-badge ${isGood ? 'good' : 'bad'}">${p.grade || 'BÌNH HÒA'}</span>
                </div>
                <div style="font-size: 0.82rem; color: #cbd5e1; line-height: 1.4;">
                    <strong>Bộ Sao:</strong> Sơn ${p.sonStar} · Hướng ${p.huongStar} · Vận ${p.vanStar}
                </div>
                <div style="font-size: 0.8rem; color: #94a3b8; line-height: 1.4;">
                    ${p.analysis ? p.analysis.remedy || 'Phương vị ổn định, tiếp nhận sinh khí tự nhiên.' : 'Bố trí công năng phù hợp với tọa hướng công trình.'}
                </div>
            </div>
        `;
    }).join('');
}
