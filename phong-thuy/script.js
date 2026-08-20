// ============================================================
// Phong Thủy & Kiến Trúc Controller Script v5.0
// Tác giả: Dịch Sư Nguyễn Huy Hoàng
// Hỗ trợ 2 Tab Bản Vẽ Độc Lập Chuẩn Xác 100%:
// - Tab 1: Bản Vẽ Kiến Trúc CAD (Đen Trắng, Scan2CAD chuẩn ảnh 3)
// - Tab 2: La Kinh 24 Sơn 360° & Cửu Cung Phi Tinh (chuẩn ảnh 2 HKPT)
// ============================================================

import {
    findMountain,
    getOppositeMountain,
    calculateFlyingStars,
    calculateGua,
    generateParametricFloorplan,
    ArchitecturalCADRenderer,
    LuoPanAndFlyingStarsSvgRenderer,
    calculateFengShuiSpatial,
    SvgViewportController,
    getOrientedPalaceGrid,
    PALACE_NAMES,
    PALACE_SHORT
} from './js/phong_thuy_bundle.js';

let currentMode = 'empty_land'; // 'empty_land' | 'existing_house'
let currentFloorIndex = 1;
let currentDrawingTab = 'arch'; // 'arch' | 'fengshui'
let currentThemeMode = 'white'; // 'white' | 'dark'
let currentMatrixOrientMode = 'house'; // 'house' (Xoay theo hướng nhà) | 'loshu' (Lạc thư chuẩn)
let currentDndOrientMode = 'house'; // 'house' | 'loshu'
let isLandscapeMode = false; // false = Dọc | true = Ngang

let currentGeometry = null;
let currentSpatialResult = null;
let currentFlyingStars = null;
let currentBatTrach = null;

let cadRenderer = null;
let luoPanRenderer = null;
let viewportController = null;

const layerState = {
    dimensions: true,
    furniture: true,
    axes: true,
    compass: true,
    compassOverlay: true
};

const dndPlacements = {
    1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 7: [], 8: [], 9: []
};

function bootstrapApp() {
    initMenuDropdown();
    initAccordions();
    initModeTabs();
    initDrawingTabs();
    initFacingDegreeControls();
    initDragAndDropPalaces();
    initViewport();
    initToolbar();
    initActionButtons();

    // Auto-calculate and render immediately on load
    handleCalculate(false);
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootstrapApp);
} else {
    bootstrapApp();
}

/* 1. Menu Dropdown */
function initMenuDropdown() {
    const menuBtn = document.getElementById('menu-btn');
    const dropdownMenu = document.getElementById('dropdown-menu');
    if (!menuBtn || !dropdownMenu) return;

    menuBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdownMenu.classList.toggle('show');
    });

    document.addEventListener('click', (e) => {
        if (!menuBtn.contains(e.target) && !dropdownMenu.contains(e.target)) {
            dropdownMenu.classList.remove('show');
        }
    });
}

/* 2. Accordions (Thông Tin & Thiết Kế) */
function initAccordions() {
    const cardInfo = document.getElementById('accordionCardInfo');
    const headerInfo = document.getElementById('accordionHeaderInfo');
    const cardDesign = document.getElementById('accordionCardDesign');
    const headerDesign = document.getElementById('accordionHeaderDesign');

    if (headerInfo && cardInfo) {
        headerInfo.addEventListener('click', () => {
            cardInfo.classList.toggle('collapsed');
        });
    }

    if (headerDesign && cardDesign) {
        headerDesign.addEventListener('click', () => {
            cardDesign.classList.toggle('collapsed');
        });
    }
}

/* 3. Mode Selection Tabs (Đất & Nhà) */
function initModeTabs() {
    const tabEmptyLand = document.getElementById('tabEmptyLand');
    const tabExistingHouse = document.getElementById('tabExistingHouse');
    const cardDesign = document.getElementById('accordionCardDesign');
    const existingHousePanel = document.getElementById('existingRoomsSection');

    if (tabEmptyLand && tabExistingHouse) {
        tabEmptyLand.addEventListener('click', () => {
            currentMode = 'empty_land';
            tabEmptyLand.classList.add('active');
            tabExistingHouse.classList.remove('active');
            if (cardDesign) cardDesign.style.display = 'block';
            if (existingHousePanel) existingHousePanel.style.display = 'none';
        });

        tabExistingHouse.addEventListener('click', () => {
            currentMode = 'existing_house';
            tabExistingHouse.classList.add('active');
            tabEmptyLand.classList.remove('active');
            if (cardDesign) cardDesign.style.display = 'none';
            if (existingHousePanel) existingHousePanel.style.display = 'block';
            renderDndGrid();
        });
    }
}

/* 4. Drawing Tab Selection (Kiến Trúc CAD vs Phong Thủy Cửu Cung) */
function initDrawingTabs() {
    const btnTabArch = document.getElementById('tabDrawingArch');
    const btnTabFengShui = document.getElementById('tabDrawingFengShui');

    if (btnTabArch && btnTabFengShui) {
        btnTabArch.addEventListener('click', () => {
            currentDrawingTab = 'arch';
            btnTabArch.classList.add('active');
            btnTabFengShui.classList.remove('active');
            renderActiveDrawing();
        });

        btnTabFengShui.addEventListener('click', () => {
            currentDrawingTab = 'fengshui';
            btnTabFengShui.classList.add('active');
            btnTabArch.classList.remove('active');
            renderActiveDrawing();
        });
    }
}

/* 5. Facing Degree Inputs & Quick Slider */
function initFacingDegreeControls() {
    const slider = document.getElementById('inputFacingDegree');
    const number = document.getElementById('inputFacingNumber');
    const display = document.getElementById('mountainDisplay');
    const mountainStatusBadge = document.getElementById('mountainStatusBadge');

    function updateFacing(deg, triggerCalculate = false) {
        let normalized = ((deg % 360) + 360) % 360;
        const match = findMountain(normalized);
        const opp = getOppositeMountain(normalized);

        if (slider) slider.value = normalized;
        if (number) number.value = normalized;

        if (display) {
            display.textContent = `Hướng ${match.mountain.name} (${normalized.toFixed(1)}°) — Tọa ${opp.mountain.name} Hướng ${match.mountain.name} · Quái ${match.mountain.trigram} (${match.mountain.element})`;
        }

        if (mountainStatusBadge) {
            mountainStatusBadge.className = `audit-badge ${match.isKiemHuong ? 'bad' : 'good'}`;
            mountainStatusBadge.textContent = match.isKiemHuong ? `Kiêm Hướng (Lệch ${match.deviation}°)` : 'Chính Hướng (Hạ Quái)';
        }

        if (triggerCalculate) {
            handleCalculate(false);
        }
    }

    if (slider) {
        slider.addEventListener('input', (e) => {
            const deg = parseFloat(e.target.value) || 0;
            updateFacing(deg, true);
        });
    }

    if (number) {
        number.addEventListener('input', (e) => {
            const deg = parseFloat(e.target.value) || 0;
            updateFacing(deg, true);
        });
    }
}

/* 6. Drag and Drop 9-Palaces (TỰ ĐỘNG XOAY THEO HƯỚNG CỬA / HƯỚNG NHÀ) */
function initDragAndDropPalaces() {
    const rack = document.getElementById('availableRoomsRack');
    const btnOrientHouse = document.getElementById('btnDndOrientHouse');
    const btnOrientLoShu = document.getElementById('btnDndOrientLoShu');

    if (btnOrientHouse && btnOrientLoShu) {
        btnOrientHouse.addEventListener('click', () => {
            currentDndOrientMode = 'house';
            btnOrientHouse.classList.add('active');
            btnOrientLoShu.classList.remove('active');
            renderDndGrid();
        });

        btnOrientLoShu.addEventListener('click', () => {
            currentDndOrientMode = 'loshu';
            btnOrientLoShu.classList.add('active');
            btnOrientHouse.classList.remove('active');
            renderDndGrid();
        });
    }

    if (rack) {
        rack.querySelectorAll('.room-drag-chip').forEach(chip => {
            chip.addEventListener('dragstart', (e) => {
                const data = {
                    id: chip.getAttribute('data-room-id'),
                    name: chip.getAttribute('data-room-name')
                };
                e.dataTransfer.setData('application/json', JSON.stringify(data));
            });

            chip.addEventListener('click', () => {
                const facingPalace = currentFlyingStars ? currentFlyingStars.facingPalace : 9;
                addRoomToPalace(facingPalace, {
                    id: chip.getAttribute('data-room-id'),
                    name: chip.getAttribute('data-room-name')
                });
            });
        });
    }

    dndPlacements[9] = [{ id: 'living', name: 'Phòng Khách' }];
    dndPlacements[1] = [{ id: 'kitchen', name: 'Bếp Nấu' }];
}

function addRoomToPalace(palaceId, room) {
    Object.keys(dndPlacements).forEach(p => {
        dndPlacements[p] = dndPlacements[p].filter(r => r.id !== room.id);
    });
    dndPlacements[palaceId].push(room);
    renderDndGrid();
    handleCalculate(false);
}

function renderDndGrid() {
    const grid = document.getElementById('dndPalacesGrid');
    if (!grid) return;

    const facingPalace = currentFlyingStars ? currentFlyingStars.facingPalace : 9;
    const sittingPalace = currentFlyingStars ? currentFlyingStars.sittingPalace : 1;

    // Thứ tự 9 cung: Xoay theo Hướng Nhà (Cung Hướng nằm ở ô trên cùng chính giữa) hoặc Lạc Thư chuẩn
    const order = currentDndOrientMode === 'house'
        ? getOrientedPalaceGrid(facingPalace)
        : [4, 9, 2, 3, 5, 7, 8, 1, 6];

    grid.innerHTML = order.map(pId => {
        const isFacing = pId === facingPalace;
        const isSitting = pId === sittingPalace;

        let badgeTitle = PALACE_NAMES[pId] || `Cung ${pId}`;
        if (isFacing) badgeTitle = `⭐ HƯỚNG (${PALACE_SHORT[pId]})`;
        else if (isSitting) badgeTitle = `🔵 TỌA (${PALACE_SHORT[pId]})`;

        const palData = currentFlyingStars && currentFlyingStars.palaces ? currentFlyingStars.palaces[pId] : null;
        const starsBadge = palData ? `· Vận ${palData.vanStar}` : '';

        const rooms = dndPlacements[pId] || [];
        const roomTags = rooms.map(r => `
            <div class="dropped-room-tag">
                <span>${r.name}</span>
                <button type="button" class="btn-remove-room" data-room-id="${r.id}" data-palace-id="${pId}">×</button>
            </div>
        `).join('');

        const cellBorder = isFacing 
            ? 'border: 2px solid #ef4444; background: rgba(239, 68, 68, 0.08);' 
            : (isSitting 
                ? 'border: 2px solid #3b82f6; background: rgba(59, 130, 246, 0.08);' 
                : 'border: 1px solid rgba(245, 158, 11, 0.3); background: rgba(15, 23, 42, 0.85);');

        return `
            <div class="palace-drop-zone ${isFacing ? 'facing-zone' : (isSitting ? 'sitting-zone' : '')}" data-palace-id="${pId}" style="${cellBorder} padding: 8px; border-radius: 8px; min-height: 95px; display: flex; flex-direction: column; justify-content: space-between;">
                <span class="palace-zone-title" style="font-size: 0.76rem; font-weight: 800; color: ${isFacing ? '#f87171' : (isSitting ? '#38bdf8' : '#fbbf24')}; text-align: center; display: block; margin-bottom: 4px;">
                    ${badgeTitle} ${starsBadge}
                </span>
                <div class="dropped-rooms-container" style="flex: 1; display: flex; flex-direction: column; gap: 3px;">
                    ${roomTags}
                </div>
            </div>
        `;
    }).join('');

    grid.querySelectorAll('.palace-drop-zone').forEach(zone => {
        zone.addEventListener('dragover', (e) => {
            e.preventDefault();
            zone.style.background = 'rgba(245, 158, 11, 0.2)';
        });

        zone.addEventListener('dragleave', () => {
            zone.style.background = '';
        });

        zone.addEventListener('drop', (e) => {
            e.preventDefault();
            zone.style.background = '';
            const dataStr = e.dataTransfer.getData('application/json');
            if (!dataStr) return;
            const room = JSON.parse(dataStr);
            const pId = parseInt(zone.getAttribute('data-palace-id'), 10);
            addRoomToPalace(pId, room);
        });

        zone.querySelectorAll('.btn-remove-room').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const rId = btn.getAttribute('data-room-id');
                const pal = btn.getAttribute('data-palace-id');
                dndPlacements[pal] = dndPlacements[pal].filter(r => r.id !== rId);
                renderDndGrid();
                handleCalculate(false);
            });
        });
    });
}

/* 7. Viewport Shell Initialization */
function initViewport() {
    const stage = document.getElementById('svgStage');
    if (!stage) return;
    viewportController = new SvgViewportController(stage);
    cadRenderer = new ArchitecturalCADRenderer({ theme: currentThemeMode });
    luoPanRenderer = new LuoPanAndFlyingStarsSvgRenderer({ size: 800 });
}

/* 8. Toolbar Buttons & Matrix Controls */
function initToolbar() {
    const btnToggleTheme = document.getElementById('btnToggleTheme');
    const txtThemeMode = document.getElementById('txtThemeMode');
    const btnToggleDimensions = document.getElementById('btnToggleDimensions');
    const btnToggleFurniture = document.getElementById('btnToggleFurniture');
    const btnToggleAxes = document.getElementById('btnToggleAxes');
    const btnToggleCompass = document.getElementById('btnToggleCompass');
    const btnToggleOrientation = document.getElementById('btnToggleOrientation');
    const txtOrientationMode = document.getElementById('txtOrientationMode');
    const viewportWrapper = document.getElementById('svgViewportShell');

    const btnZoomIn = document.getElementById('btnZoomIn');
    const btnZoomOut = document.getElementById('btnZoomOut');
    const btnZoomFit = document.getElementById('btnZoomFit');
    const btnExportSvg = document.getElementById('btnExportSvg');
    const btnExportPng = document.getElementById('btnExportPng');

    const btnMatrixOrientHouse = document.getElementById('btnMatrixOrientHouse');
    const btnMatrixOrientLoShu = document.getElementById('btnMatrixOrientLoShu');

    if (btnToggleTheme) {
        btnToggleTheme.addEventListener('click', () => {
            currentThemeMode = currentThemeMode === 'white' ? 'dark' : 'white';
            if (txtThemeMode) {
                txtThemeMode.textContent = currentThemeMode === 'white' ? 'Bản Vẽ Trắng (CAD)' : 'Bản Vẽ Tối (Dark)';
            }
            if (viewportWrapper) {
                viewportWrapper.classList.toggle('dark-mode', currentThemeMode === 'dark');
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
            layerState.compassOverlay = layerState.compass;
            btnToggleCompass.classList.toggle('active', layerState.compass);
            cadRenderer.showCompass = layerState.compass;
            cadRenderer.showCompassOverlay = layerState.compassOverlay;
            renderActiveDrawing();
        });
    }

    if (btnToggleOrientation) {
        btnToggleOrientation.addEventListener('click', () => {
            isLandscapeMode = !isLandscapeMode;
            btnToggleOrientation.classList.toggle('active', isLandscapeMode);
            if (txtOrientationMode) {
                txtOrientationMode.textContent = isLandscapeMode ? 'Khổ Nằm (Ngang)' : 'Khổ Đứng (Dọc)';
            }
            cadRenderer.isLandscape = isLandscapeMode;
            handleCalculate(false);
        });
    }

    if (btnMatrixOrientHouse && btnMatrixOrientLoShu) {
        btnMatrixOrientHouse.addEventListener('click', () => {
            currentMatrixOrientMode = 'house';
            btnMatrixOrientHouse.classList.add('active');
            btnMatrixOrientLoShu.classList.remove('active');
            if (currentFlyingStars && currentBatTrach) {
                renderFlyingStarsMatrix(currentFlyingStars, currentBatTrach);
            }
        });

        btnMatrixOrientLoShu.addEventListener('click', () => {
            currentMatrixOrientMode = 'loshu';
            btnMatrixOrientLoShu.classList.add('active');
            btnMatrixOrientHouse.classList.remove('active');
            if (currentFlyingStars && currentBatTrach) {
                renderFlyingStarsMatrix(currentFlyingStars, currentBatTrach);
            }
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
            const fileName = currentDrawingTab === 'arch' ? 'Ban_Ve_Kien_Truc.svg' : 'Ban_Ve_La_Kinh_Cuu_Cung.svg';
            viewportController.exportSvg(fileName);
        });
    }

    if (btnExportPng && viewportController) {
        btnExportPng.addEventListener('click', () => {
            const fileName = currentDrawingTab === 'arch' ? 'Ban_Ve_Kien_Truc.png' : 'Ban_Ve_La_Kinh_Cuu_Cung.png';
            viewportController.exportPng(fileName);
        });
    }
}

/* 9. Calculate & Form Input Listeners */
function initActionButtons() {
    const btnCalculate = document.getElementById('btnCalculate');
    if (btnCalculate) {
        btnCalculate.addEventListener('click', () => handleCalculate(true));
    }

    const liveInputs = [
        'inputShape', 'inputWidth', 'inputLength', 'inputFloors',
        'inputBuildYear', 'inputCurrentYear', 'inputCurrentMonth', 'inputCurrentDay', 'inputCurrentHour',
        'inputOwnerYear', 'inputOwnerGender',
        'inputBedCount', 'inputWcCount', 'inputHasAltar',
        'inputLivingRoom', 'inputKitchen', 'inputGarage', 'inputStairsType',
        'inputHasCommonRoom', 'inputHasLaundry', 'inputHasSkylight'
    ];

    liveInputs.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.addEventListener('change', () => handleCalculate(false));
            if (el.tagName === 'INPUT') {
                el.addEventListener('input', () => {
                    clearTimeout(window._calcDebounce);
                    window._calcDebounce = setTimeout(() => handleCalculate(false), 250);
                });
            }
        }
    });
}

/* 10. Core Master Calculation Pipeline */
function handleCalculate(shouldScroll = false) {
    const resultsSection = document.getElementById('resultsSection');
    if (resultsSection) {
        resultsSection.style.display = 'block';
    }

    const shape = document.getElementById('inputShape')?.value || 'RECTANGLE';
    let widthM = parseFloat(document.getElementById('inputWidth')?.value) || 5.0;
    let lengthM = parseFloat(document.getElementById('inputLength')?.value) || 16.0;

    if (isLandscapeMode && widthM < lengthM) {
        const temp = widthM;
        widthM = lengthM;
        lengthM = temp;
    }

    const floors = parseInt(document.getElementById('inputFloors')?.value, 10) || 2;
    const facingDegree = parseFloat(document.getElementById('inputFacingNumber')?.value || document.getElementById('inputFacingDegree')?.value || 180);
    const buildYear = parseInt(document.getElementById('inputBuildYear')?.value, 10) || 2025;
    const currentYear = parseInt(document.getElementById('inputCurrentYear')?.value, 10) || 2026;
    const currentMonth = parseInt(document.getElementById('inputCurrentMonth')?.value, 10) || 8;
    const currentDay = parseInt(document.getElementById('inputCurrentDay')?.value, 10) || 20;
    const currentHour = parseInt(document.getElementById('inputCurrentHour')?.value, 10) || 6;

    const ownerYear = parseInt(document.getElementById('inputOwnerYear')?.value, 10) || 1990;
    const ownerGender = document.getElementById('inputOwnerGender')?.value || 'nam';

    // 1. Generate Parametric Floorplan Geometry
    currentGeometry = generateParametricFloorplan({
        shape,
        widthM,
        lengthM,
        floors,
        facingDegree
    });

    // 2. Compute Flying Stars Chart
    currentFlyingStars = calculateFlyingStars({
        facingDegree,
        buildYear,
        currentYear,
        currentMonth,
        currentDay,
        currentHour
    });

    // 3. Compute Owner Gua
    currentBatTrach = calculateGua(ownerYear, ownerGender);

    // 4. Compute 9-Palace Spatial Assignment
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

    // 5. Render Floor Navigator
    renderFloorNavigator(currentGeometry.totalFloors);

    // 6. Render Active Drawing (Bản Vẽ Kiến Trúc CAD hoặc La Kinh Cửu Cung)
    renderActiveDrawing();

    // 7. Render 9-Palace Matrix (Oriented by House facing or Lo Shu)
    renderFlyingStarsMatrix(currentFlyingStars, currentBatTrach);

    // 8. Render Drag & Drop 9-Palaces Grid (Tab Nhà)
    renderDndGrid();

    // 9. Render Audit Report
    renderDetailedReport(currentSpatialResult);

    if (shouldScroll && resultsSection) {
        resultsSection.scrollIntoView({ behavior: 'smooth' });
    }
}

/* 11. Render Floor Navigator */
function renderFloorNavigator(totalFloors) {
    const nav = document.getElementById('floorNavigator');
    if (!nav) return;

    let buttons = '';
    for (let f = 1; f <= totalFloors; f++) {
        const isActive = f === currentFloorIndex;
        const name = f === 1 ? 'TẦNG TRỆT' : `TẦNG ${f}`;
        buttons += `
            <button type="button" class="floor-btn ${isActive ? 'active' : ''}" data-floor="${f}">
                ${name}
            </button>
        `;
    }

    nav.innerHTML = buttons;
    nav.querySelectorAll('.floor-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            currentFloorIndex = parseInt(btn.getAttribute('data-floor'), 10);
            renderFloorNavigator(totalFloors);
            renderActiveDrawing();
        });
    });
}

/* 12. Render Active Drawing (CAD Floorplan vs La Kinh 24 Sơn Cửu Cung) */
function renderActiveDrawing() {
    if (!currentGeometry || !viewportController) return;

    if (currentDrawingTab === 'arch') {
        // Tab 1: Bản vẽ kiến trúc CAD đen trắng chuẩn 100% Ảnh 3 Scan2CAD
        const svgCode = cadRenderer.renderSvg(currentGeometry, {
            theme: currentThemeMode,
            facingDegree: currentFlyingStars ? currentFlyingStars.facingDegree : 180
        });
        viewportController.setSvgContent(svgCode);
    } else {
        // Tab 2: La Kinh 24 Sơn 360° & Cửu Cung Phi Tinh chuẩn 100% Ảnh 2 HKPT
        if (!luoPanRenderer) {
            luoPanRenderer = new LuoPanAndFlyingStarsSvgRenderer({ size: 800 });
        }
        const svgCode = luoPanRenderer.renderSvg(currentFlyingStars, {
            theme: currentThemeMode
        });
        viewportController.setSvgContent(svgCode);
    }
}

/* 13. Render 9-Palace Xuan Kong Matrix Display */
function renderFlyingStarsMatrix(flyingStars, batTrach) {
    const matrixContainer = document.getElementById('flyingStarsMatrix');
    const metaVan = document.getElementById('metaVan');
    const metaToaHuong = document.getElementById('metaToaHuong');
    const metaGua = document.getElementById('metaGua');

    if (metaVan) metaVan.textContent = `Vận ${flyingStars.van} (${flyingStars.currentYear || 2026})`;
    if (metaToaHuong) metaToaHuong.textContent = `Tọa ${flyingStars.sittingMountain} Hướng ${flyingStars.facingMountain} (${flyingStars.chartType === 'chinh_huong' ? 'Hạ Quái' : 'Thế Quái'})`;
    if (metaGua && batTrach) {
        const gName = batTrach.guaName || batTrach.name || 'Khảm (Thủy)';
        const gGroup = batTrach.groupName || batTrach.trachGroup || 'Đông Tứ Mệnh';
        metaGua.textContent = `${gName} (${gGroup})`;
    }

    if (!matrixContainer || !flyingStars.palaces) return;

    const order = currentMatrixOrientMode === 'house'
        ? getOrientedPalaceGrid(flyingStars.facingPalace)
        : [4, 9, 2, 3, 5, 7, 8, 1, 6];

    matrixContainer.innerHTML = order.map(pId => {
        const pal = flyingStars.palaces[pId];
        if (!pal) return '';

        const isFacingPal = pId === flyingStars.facingPalace;
        const isSittingPal = pId === sittingPalace;

        let palTag = PALACE_NAMES[pId] || pId;
        if (isFacingPal) palTag = `⭐ HƯỚNG (${PALACE_SHORT[pId]})`;
        else if (isSittingPal) palTag = `🔵 TỌA (${PALACE_SHORT[pId]})`;

        return `
            <div class="palace-cell ${isFacingPal ? 'facing-cell' : (isSittingPal ? 'sitting-cell' : '')}" style="${isFacingPal ? 'border: 2px solid #ef4444; background: rgba(239, 68, 68, 0.08);' : (isSittingPal ? 'border: 2px solid #3b82f6; background: rgba(59, 130, 246, 0.08);' : '')}">
                <div class="time-stars-row" style="display: flex; justify-content: center; gap: 4px; margin-bottom: 5px;">
                    <span style="display:inline-block; width:18px; height:18px; line-height:18px; border-radius:50%; background:#22c55e; color:#fff; font-size:10px; font-weight:900; text-align:center;" title="Niên Tinh (Năm)">${pal.nienStar}</span>
                    <span style="display:inline-block; width:18px; height:18px; line-height:18px; border-radius:50%; background:#ef4444; color:#fff; font-size:10px; font-weight:900; text-align:center;" title="Nguyệt Tinh (Tháng)">${pal.nguyetStar}</span>
                    <span style="display:inline-block; width:18px; height:18px; line-height:18px; border-radius:50%; background:#3b82f6; color:#fff; font-size:10px; font-weight:900; text-align:center;" title="Nhật Tinh (Ngày)">${pal.nhatStar}</span>
                    <span style="display:inline-block; width:18px; height:18px; line-height:18px; border-radius:50%; background:#eab308; color:#000; font-size:10px; font-weight:900; text-align:center;" title="Thời Tinh (Giờ)">${pal.thoiStar}</span>
                </div>
                <div class="palace-stars-trio" style="display: flex; justify-content: space-around; align-items: center; margin: 4px 0;">
                    <span class="star-badge-son" style="color: #38bdf8; font-weight: 900; font-size: 1.15rem;" title="Sơn Tinh (Trái)">${pal.sonStar}</span>
                    <span class="star-badge-van" style="font-size: 1.5rem; font-weight: 900; color: #ffffff;" title="Vận Tinh (Giữa)">${pal.vanStar}</span>
                    <span class="star-badge-huong" style="color: #f87171; font-weight: 900; font-size: 1.15rem;" title="Hướng Tinh (Phải)">${pal.huongStar}</span>
                </div>
                <span class="palace-name-badge" style="font-size: 0.72rem; font-weight: 800; color: ${isFacingPal ? '#f87171' : (isSittingPal ? '#38bdf8' : '#fbbf24')};">${palTag}</span>
            </div>
        `;
    }).join('');
}

/* 14. Render Detailed Report */
function renderDetailedReport(spatialResult) {
    const container = document.getElementById('detailedReportContainer');
    if (!container || !spatialResult || !spatialResult.spatialPalaces) return;

    const palaces = Object.values(spatialResult.spatialPalaces);

    container.innerHTML = palaces.map(p => {
        const isGood = p.grade === 'CÁT' || p.grade === 'ĐẠI CÁT';
        return `
            <div class="report-card">
                <div class="report-card-header">
                    <span class="report-palace-title">${p.palaceName} (${p.directionName})</span>
                    <span class="audit-badge ${isGood ? 'good' : 'bad'}">${p.grade}</span>
                </div>
                <div style="font-size: 0.82rem; color: #cbd5e1; line-height: 1.4;">
                    <strong>Bộ Sao:</strong> Sơn ${p.sonStar} (Trái) · Hướng ${p.huongStar} (Phải) · Vận ${p.vanStar} (Giữa) · Niên ${p.nienStar}
                </div>
                <div style="font-size: 0.82rem; color: #fbbf24; line-height: 1.4;">
                    ${p.analysis}
                </div>
                <div style="font-size: 0.8rem; color: #94a3b8; line-height: 1.4;">
                    <strong>Đề xuất bố trí:</strong> ${p.remedy}
                </div>
            </div>
        `;
    }).join('');
}
