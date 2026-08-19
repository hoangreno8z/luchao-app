// ============================================================
// Phong Thủy & Kiến Trúc Controller Script v3.5
// Tự động xoay Cửu Cung theo Hướng Nhà, Chú thích trực quan & CAD Siêu Cấp
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
    CompassSvgRenderer,
    getOrientedPalaceGrid,
    PALACE_NAMES,
    PALACE_SHORT
} from './js/phong_thuy_bundle.js';

let currentMode = 'empty_land';
let currentFloorIndex = 1;
let currentDrawingTab = 'arch'; // 'arch' | 'fengshui'
let currentThemeMode = 'white'; // 'white' | 'dark'
let currentMatrixOrientMode = 'house'; // 'house' (Xoay theo hướng nhà) | 'loshu' (Lạc thư chuẩn)
let isLandscapeMode = false; // false = Dọc | true = Ngang

let currentGeometry = null;
let currentSpatialResult = null;
let currentFlyingStars = null;
let currentBatTrach = null;

let cadRenderer = null;
let viewportController = null;
let compassRenderer = null;

const layerState = {
    dimensions: true,
    furniture: true,
    axes: true,
    compass: true
};

const dndPlacements = {
    1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 7: [], 8: [], 9: []
};

function bootstrapApp() {
    initMenuDropdown();
    initModeTabs();
    initDrawingTabs();
    initCompassControls();
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
        if (!menuBtn.contains(e.target) && !dropdownMenu.contains(e.target)) {
            dropdownMenu.classList.remove('show');
        }
    });
}

/* Mode Selection Tabs (Đất Trống vs Đã Có Nhà) */
function initModeTabs() {
    const tabEmptyLand = document.getElementById('tabEmptyLand');
    const tabExistingHouse = document.getElementById('tabExistingHouse');
    const emptyLandPanel = document.getElementById('emptyLandRoomsConfig');
    const existingHousePanel = document.getElementById('existingRoomsSection');

    if (tabEmptyLand && tabExistingHouse) {
        tabEmptyLand.addEventListener('click', () => {
            currentMode = 'empty_land';
            tabEmptyLand.classList.add('active');
            tabExistingHouse.classList.remove('active');
            if (emptyLandPanel) emptyLandPanel.style.display = 'block';
            if (existingHousePanel) existingHousePanel.style.display = 'none';
        });

        tabExistingHouse.addEventListener('click', () => {
            currentMode = 'existing_house';
            tabExistingHouse.classList.add('active');
            tabEmptyLand.classList.remove('active');
            if (emptyLandPanel) emptyLandPanel.style.display = 'none';
            if (existingHousePanel) existingHousePanel.style.display = 'block';
        });
    }
}

/* Drawing Tab Selection (Kiến Trúc CAD vs Phong Thủy Cửu Cung) */
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

/* Compass 360° Interactive Dial (GPU Hardware Accelerated) */
function initCompassControls() {
    const dialContainer = document.getElementById('compassDialContainer');
    const compassSvgStage = document.getElementById('compassSvgStage');
    const txtCompassDegree = document.getElementById('txtCompassDegree');
    const txtCompassMountain = document.getElementById('txtCompassMountain');
    const mountainStatusBadge = document.getElementById('mountainStatusBadge');
    const slider = document.getElementById('inputFacingDegree');
    const number = document.getElementById('inputFacingNumber');
    const display = document.getElementById('mountainDisplay');

    if (!compassSvgStage) return;

    compassRenderer = new CompassSvgRenderer({ size: 500 });
    compassSvgStage.innerHTML = `
        <svg viewBox="0 0 500 500" width="100%" height="100%" style="display:block;">
            ${compassRenderer.renderStaticDialSvg()}
        </svg>
    `;

    function updateCompass(deg, triggerCalculate = false) {
        let normalized = ((deg % 360) + 360) % 360;
        const match = findMountain(normalized);
        const opp = getOppositeMountain(normalized);

        // Xoay la bàn thuần túy bằng GPU Transform
        compassSvgStage.style.transform = `rotate(${-normalized}deg) translateZ(0)`;

        if (txtCompassDegree) txtCompassDegree.textContent = `${normalized.toFixed(1)}°`;
        if (txtCompassMountain) txtCompassMountain.textContent = `Hướng ${match.mountain.name}`;
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
            updateCompass(deg, true);
        });
    }

    if (number) {
        number.addEventListener('input', (e) => {
            const deg = parseFloat(e.target.value) || 0;
            updateCompass(deg, true);
        });
    }

    // Pointer rotation on Compass Dial
    if (dialContainer) {
        let isRotating = false;
        let startAngle = 0;
        let initialDeg = 0;

        const getAngleFromCenter = (clientX, clientY) => {
            const rect = dialContainer.getBoundingClientRect();
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;
            const rad = Math.atan2(clientY - cy, clientX - cx);
            let deg = (rad * 180) / Math.PI + 90;
            return (deg + 360) % 360;
        };

        dialContainer.addEventListener('pointerdown', (e) => {
            isRotating = true;
            startAngle = getAngleFromCenter(e.clientX, e.clientY);
            initialDeg = parseFloat(number?.value || slider?.value || 180);
            dialContainer.setPointerCapture(e.pointerId);
        });

        dialContainer.addEventListener('pointermove', (e) => {
            if (!isRotating) return;
            const currentAngle = getAngleFromCenter(e.clientX, e.clientY);
            const delta = currentAngle - startAngle;
            let targetDeg = ((initialDeg - delta) % 360 + 360) % 360;
            requestAnimationFrame(() => updateCompass(targetDeg, true));
        });

        const stopRotate = (e) => {
            if (isRotating) {
                isRotating = false;
                try { dialContainer.releasePointerCapture(e.pointerId); } catch (_) {}
            }
        };

        dialContainer.addEventListener('pointerup', stopRotate);
        dialContainer.addEventListener('pointercancel', stopRotate);
    }
}

/* Drag and Drop 9-Palaces */
function initDragAndDropPalaces() {
    const rack = document.getElementById('availableRoomsRack');
    const grid = document.getElementById('dndPalacesGrid');
    if (!rack || !grid) return;

    let draggedRoomData = null;
    const order = [4, 9, 2, 3, 5, 7, 8, 1, 6];

    grid.innerHTML = order.map(pId => `
        <div class="palace-drop-zone" data-palace-id="${pId}">
            <span class="palace-zone-title">${PALACE_NAMES[pId] || pId}</span>
            <div class="dropped-rooms-container"></div>
        </div>
    `).join('');

    rack.querySelectorAll('.room-drag-chip').forEach(chip => {
        chip.addEventListener('dragstart', (e) => {
            draggedRoomData = {
                id: chip.getAttribute('data-room-id'),
                name: chip.getAttribute('data-room-name')
            };
            e.dataTransfer.setData('application/json', JSON.stringify(draggedRoomData));
        });

        chip.addEventListener('click', () => {
            const firstP = order.find(p => dndPlacements[p].length === 0) || 9;
            addRoomToPalace(firstP, {
                id: chip.getAttribute('data-room-id'),
                name: chip.getAttribute('data-room-name')
            });
        });
    });

    grid.querySelectorAll('.palace-drop-zone').forEach(zone => {
        zone.addEventListener('dragover', (e) => {
            e.preventDefault();
            zone.classList.add('drag-over');
        });

        zone.addEventListener('dragleave', () => {
            zone.classList.remove('drag-over');
        });

        zone.addEventListener('drop', (e) => {
            e.preventDefault();
            zone.classList.remove('drag-over');
            const dataStr = e.dataTransfer.getData('application/json');
            if (!dataStr) return;
            const room = JSON.parse(dataStr);
            const pId = parseInt(zone.getAttribute('data-palace-id'), 10);
            addRoomToPalace(pId, room);
        });
    });

    function addRoomToPalace(palaceId, room) {
        Object.keys(dndPlacements).forEach(p => {
            dndPlacements[p] = dndPlacements[p].filter(r => r.id !== room.id);
        });
        dndPlacements[palaceId].push(room);
        renderDroppedRooms();
        handleCalculate(false);
    }

    function renderDroppedRooms() {
        grid.querySelectorAll('.palace-drop-zone').forEach(zone => {
            const pId = parseInt(zone.getAttribute('data-palace-id'), 10);
            const container = zone.querySelector('.dropped-rooms-container');
            if (!container) return;

            const rooms = dndPlacements[pId] || [];
            container.innerHTML = rooms.map(r => `
                <div class="dropped-room-tag">
                    <span>${r.name}</span>
                    <button type="button" class="btn-remove-room" data-room-id="${r.id}" data-palace-id="${pId}">×</button>
                </div>
            `).join('');

            container.querySelectorAll('.btn-remove-room').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const rId = btn.getAttribute('data-room-id');
                    const pal = btn.getAttribute('data-palace-id');
                    dndPlacements[pal] = dndPlacements[pal].filter(r => r.id !== rId);
                    renderDroppedRooms();
                    handleCalculate(false);
                });
            });
        });
    }

    dndPlacements[9].push({ id: 'living', name: 'Phòng Khách' });
    dndPlacements[1].push({ id: 'dining', name: 'Bếp Ăn' });
    renderDroppedRooms();
}

/* Viewport Shell Initialization */
function initViewport() {
    const stage = document.getElementById('svgStage');
    if (!stage) return;
    viewportController = new SvgViewportController(stage);
    cadRenderer = new ArchitecturalCADRenderer({ theme: currentThemeMode });
}

/* Toolbar Buttons & Matrix Controls */
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
            btnToggleCompass.classList.toggle('active', layerState.compass);
            cadRenderer.showCompass = layerState.compass;
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

    // Matrix Orientation Toggles
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
            const fileName = currentDrawingTab === 'arch' ? 'Ban_Ve_Kien_Truc.svg' : 'Ban_Ve_Cuu_Cung.svg';
            viewportController.exportSvg(fileName);
        });
    }

    if (btnExportPng && viewportController) {
        btnExportPng.addEventListener('click', () => {
            const fileName = currentDrawingTab === 'arch' ? 'Ban_Ve_Kien_Truc.png' : 'Ban_Ve_Cuu_Cung.png';
            viewportController.exportPng(fileName);
        });
    }
}

/* Calculate & Form Input Listeners */
function initActionButtons() {
    const btnCalculate = document.getElementById('btnCalculate');
    if (btnCalculate) {
        btnCalculate.addEventListener('click', () => handleCalculate(true));
    }

    const liveInputs = [
        'inputWidth', 'inputLength', 'inputFloors',
        'inputBuildYear', 'inputCurrentYear', 'inputCurrentMonth', 'inputCurrentDay', 'inputCurrentHour',
        'inputOwnerYear', 'inputOwnerGender',
        'inputBedCount', 'inputWcCount', 'inputHasAltar',
        'inputLivingRoom', 'inputKitchen', 'inputGarage', 'inputStairsType'
    ];

    liveInputs.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.addEventListener('change', () => handleCalculate(false));
            if (el.tagName === 'INPUT') {
                el.addEventListener('input', () => {
                    clearTimeout(window._calcDebounce);
                    window._calcDebounce = setTimeout(() => handleCalculate(false), 300);
                });
            }
        }
    });
}

/* Core Master Calculation Pipeline */
function handleCalculate(shouldScroll = false) {
    const resultsSection = document.getElementById('resultsSection');
    if (resultsSection) {
        resultsSection.style.display = 'block';
    }

    let widthM = parseFloat(document.getElementById('inputWidth')?.value) || 5.0;
    let lengthM = parseFloat(document.getElementById('inputLength')?.value) || 16.0;

    // Swap if landscape mode
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
    const currentDay = parseInt(document.getElementById('inputCurrentDay')?.value, 10) || 19;
    const currentHour = parseInt(document.getElementById('inputCurrentHour')?.value, 10) || 7;

    const ownerYear = parseInt(document.getElementById('inputOwnerYear')?.value, 10) || 1990;
    const ownerGender = document.getElementById('inputOwnerGender')?.value || 'nam';

    const bedrooms = parseInt(document.getElementById('inputBedCount')?.value, 10) || 3;
    const toilets = parseInt(document.getElementById('inputWcCount')?.value, 10) || 2;
    const hasAltar = document.getElementById('inputHasAltar')?.value || '1';

    // 1. Generate Parametric Floorplan Geometry
    currentGeometry = generateParametricFloorplan({
        widthM,
        lengthM,
        floors,
        facingDegree,
        roomCounts: { bedrooms, toilets, hasAltar }
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

    // 3. Compute Owner Gua (Bát Trạch Phối Mệnh)
    currentBatTrach = calculateGua(ownerYear, ownerGender);

    // 4. Compute 9-Palace Spatial Assignment
    const floorGeo = (currentGeometry.plansByFloor && currentGeometry.plansByFloor[currentFloorIndex - 1]) 
        ? currentGeometry.plansByFloor[currentFloorIndex - 1] 
        : currentGeometry;

    currentSpatialResult = calculateFengShuiSpatial(floorGeo, {
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

    // 6. Render Active Drawing (CAD or Feng Shui Overlay)
    renderActiveDrawing();

    // 7. Render 9-Palace Matrix (Oriented by House facing or Lo Shu)
    renderFlyingStarsMatrix(currentFlyingStars, currentBatTrach);

    // 8. Render Audit Report
    renderDetailedReport(currentSpatialResult);

    // 9. Smooth scroll to drawing if clicked
    if (shouldScroll && resultsSection) {
        resultsSection.scrollIntoView({ behavior: 'smooth' });
    }
}

/* Render Floor Navigator */
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
        const buildYear = currentFlyingStars ? (currentFlyingStars.buildYear || 2025) : 2025;
        const spatial = calculateFengShuiSpatial(floorGeometry, {
            facingDegree: currentFlyingStars ? currentFlyingStars.facingDegree : 180,
            buildYear: buildYear,
            currentYear: currentFlyingStars ? currentFlyingStars.currentYear : 2026,
            currentMonth: currentFlyingStars ? currentFlyingStars.currentMonth : 8,
            currentDay: currentFlyingStars ? currentFlyingStars.currentDay : 19,
            currentHour: currentFlyingStars ? currentFlyingStars.currentHour : 7
        });
        const overlaySvg = renderNinePalacesOverlaySvg(spatial, currentThemeMode === 'white');
        baseSvg = baseSvg.replace('</svg>', `${overlaySvg}</svg>`);
    }

    viewportController.setSvgContent(baseSvg);
}

/* Render 9-Palace Xuan Kong Matrix Display (TỰ ĐỘNG XOAY THEO HƯỚNG NHÀ HOẶC LẠC THƯ) */
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

    // Xác định thứ tự 9 cung: Xoay theo hướng nhà (House) hoặc Lạc Thư chuẩn (Lo Shu)
    const order = currentMatrixOrientMode === 'house'
        ? getOrientedPalaceGrid(flyingStars.facingPalace)
        : [4, 9, 2, 3, 5, 7, 8, 1, 6];

    matrixContainer.innerHTML = order.map(pId => {
        const pal = flyingStars.palaces[pId];
        if (!pal) return '';

        const isFacingPal = pId === flyingStars.facingPalace;
        const isSittingPal = pId === flyingStars.sittingPalace;

        let palTag = PALACE_NAMES[pId] || pId;
        if (isFacingPal) palTag = `⭐ HƯỚNG (${PALACE_SHORT[pId]})`;
        else if (isSittingPal) palTag = `🔵 TỌA (${PALACE_SHORT[pId]})`;

        return `
            <div class="palace-cell ${isFacingPal ? 'facing-cell' : (isSittingPal ? 'sitting-cell' : '')}" style="${isFacingPal ? 'border: 2px solid #ef4444; background: rgba(239, 68, 68, 0.08);' : (isSittingPal ? 'border: 2px solid #3b82f6; background: rgba(59, 130, 246, 0.08);' : '')}">
                <!-- Hàng 4 Sao Thời Gian -->
                <div class="time-stars-row" style="display: flex; justify-content: center; gap: 4px; margin-bottom: 5px;">
                    <span style="display:inline-block; width:18px; height:18px; line-height:18px; border-radius:50%; background:#22c55e; color:#fff; font-size:10px; font-weight:900; text-align:center;" title="Niên Tinh (Năm)">${pal.nienStar}</span>
                    <span style="display:inline-block; width:18px; height:18px; line-height:18px; border-radius:50%; background:#ef4444; color:#fff; font-size:10px; font-weight:900; text-align:center;" title="Nguyệt Tinh (Tháng)">${pal.nguyetStar}</span>
                    <span style="display:inline-block; width:18px; height:18px; line-height:18px; border-radius:50%; background:#3b82f6; color:#fff; font-size:10px; font-weight:900; text-align:center;" title="Nhật Tinh (Ngày)">${pal.nhatStar}</span>
                    <span style="display:inline-block; width:18px; height:18px; line-height:18px; border-radius:50%; background:#eab308; color:#000; font-size:10px; font-weight:900; text-align:center;" title="Thời Tinh (Giờ)">${pal.thoiStar}</span>
                </div>
                <!-- Bộ 3 Sao Huyền Không -->
                <div class="palace-stars-trio" style="display: flex; justify-content: space-around; align-items: center; margin: 4px 0;">
                    <span class="star-badge-son" style="color: #38bdf8; font-weight: 900; font-size: 1.15rem;" title="Sơn Tinh (Trái)">${pal.sonStar}</span>
                    <span class="star-badge-van" style="font-size: 1.5rem; font-weight: 900; color: #ffffff;" title="Vận Tinh (Giữa)">${pal.vanStar}</span>
                    <span class="star-badge-huong" style="color: #f87171; font-weight: 900; font-size: 1.15rem;" title="Hướng Tinh (Phải)">${pal.huongStar}</span>
                </div>
                <!-- Tên Cung & Phương Vị -->
                <span class="palace-name-badge" style="font-size: 0.72rem; font-weight: 800; color: ${isFacingPal ? '#f87171' : (isSittingPal ? '#38bdf8' : '#fbbf24')};">${palTag}</span>
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
                    <span class="report-palace-title">${p.palaceName || p.name} (${p.short || p.trigram})</span>
                    <span class="audit-badge ${isGood ? 'good' : 'bad'}">${p.grade || 'BÌNH HÒA'}</span>
                </div>
                <div style="font-size: 0.82rem; color: #cbd5e1; line-height: 1.4;">
                    <strong>Bộ Sao:</strong> Sơn ${p.sonStar} (Trái) · Hướng ${p.huongStar} (Phải) · Vận ${p.vanStar} (Giữa) · Niên ${p.nienStar}
                </div>
                <div style="font-size: 0.82rem; color: #fbbf24; line-height: 1.4;">
                    ${p.analysis || 'Phương vị ổn định, tiếp nhận sinh khí tự nhiên.'}
                </div>
                <div style="font-size: 0.8rem; color: #94a3b8; line-height: 1.4;">
                    <strong>Đề xuất bố trí:</strong> ${p.remedy || 'Bố trí công năng phù hợp với tọa hướng công trình.'}
                </div>
            </div>
        `;
    }).join('');
}
