
function handleLandscapeMiniAction(action, landscapeId) {
    if (!currentGeometry || !currentGeometry.landscapes) return;
    const l = currentGeometry.landscapes.find(item => item.id === landscapeId);
    if (!l) return;

    if (action === 'confirm_landscape') {
        selectedLandscapeId = null;
        renderActiveDrawing();
        renderSmartPopup();
    } else if (action === 'rotate_landscape') {
        l.rot = ((l.rot || 0) + 45) % 360;
        renderActiveDrawing();
        renderSmartPopup();
        refreshSpatialFengShui();
    } else if (action === 'delete_landscape') {
        currentGeometry.landscapes = currentGeometry.landscapes.filter(item => item.id !== landscapeId);
        selectedLandscapeId = null;
        renderActiveDrawing();
        renderSmartPopup();
        refreshSpatialFengShui();
    }
}


function handleAddLandscapeDirect(type, name, w, h) {
    if (!currentGeometry) return;
    if (!currentGeometry.landscapes) currentGeometry.landscapes = [];

    const lCount = currentGeometry.landscapes.filter(l => l.type === type).length + 1;
    const id = `landscape_${type}_${Date.now()}`;
    const cleanName = lCount > 1 ? `${name} ${lCount}` : name;

    const houseW = currentGeometry.widthMm || 5000;
    const houseD = currentGeometry.depthMm || 16000;
    const cx = (currentGeometry.widthMm ? currentGeometry.widthMm / 2 : 2500) - w / 2;
    // Đặt mặc định ở phía trước hoặc bên ngoài nhà
    const cy = -h - 1500;

    const newLandscape = {
        id,
        name: cleanName.toUpperCase(),
        type,
        x: Math.round(cx),
        y: Math.round(cy),
        w,
        h,
        rot: 0
    };

    currentGeometry.landscapes.push(newLandscape);
    selectedLandscapeId = id;
    selectedRoomId = null;

    renderActiveDrawing();
    renderPopovers();
    renderSmartPopup();
    refreshSpatialFengShui();
}


function getRoomPalaceInfo(room) {
    if (!room || !currentGeometry) return null;
    const W = currentGeometry.widthMm || (currentGeometry.widthM * 1000) || 5000;
    const D = currentGeometry.depthMm || (currentGeometry.lengthM * 1000) || 16000;
    const rx = room.x + room.w / 2;
    const ry = room.y + room.h / 2;
    const col = Math.min(2, Math.max(0, Math.floor(rx / (W / 3))));
    const row = Math.min(2, Math.max(0, Math.floor(ry / (D / 3))));

    const gridToPalace = [
        [4, 9, 2],
        [3, 5, 7],
        [8, 1, 6]
    ];
    const palaceId = gridToPalace[row][col];
    if (!currentSpatialResult || !currentSpatialResult.spatialPalaces) return { palaceId, palaceName: PALACE_NAMES[palaceId] };
    return currentSpatialResult.spatialPalaces[palaceId];
}

function refreshSpatialFengShui() {
    if (!currentGeometry) return;
    const facingDegree = parseFloat(document.getElementById('inputFacingNumber')?.value || document.getElementById('inputFacingDegree')?.value || 180);
    const buildYear = parseInt(document.getElementById('inputBuildYear')?.value, 10) || 2025;
    const currentYear = parseInt(document.getElementById('inputCurrentYear')?.value, 10) || 2026;
    const currentMonth = parseInt(document.getElementById('inputCurrentMonth')?.value, 10) || 8;
    const currentDay = parseInt(document.getElementById('inputCurrentDay')?.value, 10) || 20;
    const currentHour = parseInt(document.getElementById('inputCurrentHour')?.value, 10) || 6;
    const ownerYear = parseInt(document.getElementById('inputOwnerYear')?.value, 10) || 1990;
    const ownerGender = document.getElementById('inputOwnerGender')?.value || 'nam';

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

    renderDetailedReport(currentSpatialResult);
}

// ============================================================
// Phong Thủy & Kiến Trúc Controller Script v8.0
// Tác giả: Dịch Sư Nguyễn Huy Hoàng & Computational Geometry Core
// 100% Thuần Code Vector (SVG / Canvas) — Không sử dụng Emoji
// ============================================================

import {
    FengShuiInterpretationEngine,
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
    renderUnifiedSvg,
    FloorplanVisionVectorizer,
    HouseCenterGeometryEngine,
    PALACE_NAMES,
    PALACE_SHORT
} from './js/phong_thuy_bundle.js';

let currentMode = 'empty_land'; // 'empty_land' | 'existing_house' | 'scan_image'
let currentThemeMode = 'white'; // 'white' | 'dark'
let currentMatrixOrientMode = 'house'; // 'house' | 'loshu'
let currentDndOrientMode = 'house'; // 'house' | 'loshu'
let isLandscapeMode = false;

let currentGeometry = null;
let currentSpatialResult = null;
let currentFlyingStars = null;
let currentBatTrach = null;

let cadRenderer = null;
let interpretationEngine = null;
let luoPanRenderer = null;
let viewportController = null;

let selectedRoomId = null;
let selectedLandscapeId = null;
let selectedEdgeIndex = null;
let lastScannedData = null;

let roomCounters = {
    bed: 0,
    wc: 0,
    living: 0,
    kitchen: 0,
    altar: 0,
    stairs: 0,
    garage: 0,
    laundry: 0
};

// Cache lưu vị trí phòng đã kéo / co giãn / xoay trên canvas cho cả Đất và Nhà Sẵn Có
const roomPositionCache = {};

let uploadedSourceImageSrc = '';

const layerState = {
    landscapes: true,
    walls: true,
    furniture: true,
    dimensions: true,
    roomLabels: true,
    axes: true,
    luoPan: true,
    luoPanScale: 1.0,
    ninePalaces: true,
    sourceImage: false,
    sourceImageOpacity: 0.35
};

const dndPlacements = {
    1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 7: [], 8: [], 9: []
};

// Pointer Drag & Resize State for CAD Manipulation
const pointerState = {
    isInteracting: false,
    mode: null, // 'move' | 'resize' | 'vertex'
    handle: null,
    targetRoomId: null,
    targetVertexIdx: null,
    startClientX: 0,
    startClientY: 0,
    origX: 0,
    origY: 0,
    origW: 0,
    origH: 0
};

function bootstrapApp() {
    initMenuDropdown();
    initAccordions();
    initModeTabs();
    initDrawingTabs();
    initFacingDegreeControls();
    initDragAndDropPalaces();
    initViewport();
    initFloatingToolbar();
    initActionButtons();
    initCadInteractiveEngine();
    initScanImageControls();

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

/* 3. Mode Selection Tabs (Đất, Nhà, Tải Bản Vẽ) */
function initModeTabs() {
    document.querySelectorAll('.btn-quick-reno').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const type = btn.getAttribute('data-type');
            const name = btn.getAttribute('data-name');
            const w = parseInt(btn.getAttribute('data-w'), 10) || 3000;
            const h = parseInt(btn.getAttribute('data-h'), 10) || 3500;
            handleAddRoomDirect(type, name, w, h);
            refreshSpatialFengShui();
            const resultsSection = document.getElementById('resultsSection');
            if (resultsSection) resultsSection.scrollIntoView({ behavior: 'smooth' });
        });
    });
    const tabEmptyLand = document.getElementById('tabEmptyLand');
    const tabExistingHouse = document.getElementById('tabExistingHouse');
    const tabScanImage = document.getElementById('tabScanImage');
    const cardDesign = document.getElementById('accordionCardDesign');
    const existingHousePanel = document.getElementById('existingRoomsSection');
    const scanImageSection = document.getElementById('scanImageSection');

    if (tabEmptyLand) {
        tabEmptyLand.addEventListener('click', () => {
            currentMode = 'empty_land';
            tabEmptyLand.classList.add('active');
            if (tabExistingHouse) tabExistingHouse.classList.remove('active');
            if (tabScanImage) tabScanImage.classList.remove('active');
            if (cardDesign) cardDesign.style.display = 'block';
            if (existingHousePanel) existingHousePanel.style.display = 'none';
            if (scanImageSection) scanImageSection.style.display = 'none';
            handleCalculate(false);
        });
    }

    if (tabExistingHouse) {
        tabExistingHouse.addEventListener('click', () => {
            currentMode = 'existing_house';
            tabExistingHouse.classList.add('active');
            if (tabEmptyLand) tabEmptyLand.classList.remove('active');
            if (tabScanImage) tabScanImage.classList.remove('active');
            if (cardDesign) cardDesign.style.display = 'none';
            if (existingHousePanel) existingHousePanel.style.display = 'block';
            if (scanImageSection) scanImageSection.style.display = 'none';
            renderDndGrid();
        });
    }

    if (tabScanImage) {
        tabScanImage.addEventListener('click', () => {
            currentMode = 'scan_image';
            tabScanImage.classList.add('active');
            if (tabEmptyLand) tabEmptyLand.classList.remove('active');
            if (tabExistingHouse) tabExistingHouse.classList.remove('active');
            if (cardDesign) cardDesign.style.display = 'none';
            if (existingHousePanel) existingHousePanel.style.display = 'none';
            if (scanImageSection) scanImageSection.style.display = 'block';
        });
    }
}

/* 3.1 AI Scan & Floorplan Upload Controls */
function initScanImageControls() {
    const inputScanFile = document.getElementById('inputScanFile');
    const dropzone = document.getElementById('scanUploadDropzone');
    const btnSelectScanFile = document.getElementById('btnSelectScanFile');
    const btnUseSampleDrawing = document.getElementById('btnUseSampleDrawing');
    const btnApplyScanToCad = document.getElementById('btnApplyScanToCad');

    if (btnSelectScanFile && inputScanFile) {
        btnSelectScanFile.addEventListener('click', () => inputScanFile.click());
    }

    if (dropzone) {
        dropzone.addEventListener('dragover', (e) => {
            e.preventDefault();
            dropzone.classList.add('dragover');
        });
        dropzone.addEventListener('dragleave', () => dropzone.classList.remove('dragover'));
        dropzone.addEventListener('drop', (e) => {
            e.preventDefault();
            dropzone.classList.remove('dragover');
            if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                handleScanUploadedFile(e.dataTransfer.files[0]);
            }
        });
    }

    if (inputScanFile) {
        inputScanFile.addEventListener('change', (e) => {
            if (e.target.files && e.target.files[0]) {
                handleScanUploadedFile(e.target.files[0]);
            }
        });
    }

    if (btnUseSampleDrawing) {
        btnUseSampleDrawing.addEventListener('click', () => {
            loadSampleDrawing();
        });
    }

    if (btnApplyScanToCad) {
        btnApplyScanToCad.addEventListener('click', () => {
            applyScanResultToCad();
        });
    }
}

function handleScanUploadedFile(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
        uploadedSourceImageSrc = e.target.result;
        const imgPreview = document.getElementById('scanPreviewImg');
        const imgWrapper = document.getElementById('scanPreviewWrapper');
        if (imgPreview && imgWrapper) {
            imgPreview.src = e.target.result;
            imgWrapper.style.display = 'block';
        }

        const img = new Image();
        img.onload = async () => {
            try {
                const aspect = img.naturalWidth / img.naturalHeight;
                let widthM = 7.0;
                let depthM = 11.725;
                if (aspect < 1) {
                    widthM = 7.0;
                    depthM = parseFloat((7.0 / aspect).toFixed(2));
                } else {
                    depthM = 7.0;
                    widthM = parseFloat((7.0 * aspect).toFixed(2));
                }

                const result = await FloorplanVisionVectorizer.processImage(img, {
                    targetWidthM: widthM,
                    targetDepthM: depthM
                });

                lastScannedData = result;
                displayScanAnalysis(result);
                applyScanResultToCad(); // Tự động số hóa và vẽ ngay lập tức lên Canvas CAD!
            } catch (err) {
                console.error('Scan Error:', err);
                alert('Lỗi xử lý ảnh bản vẽ: ' + err.message);
            }
        };
        img.src = e.target.result;
    };
    reader.readAsDataURL(file);
}

function loadSampleDrawing() {
    const W = 7000;
    const D = 11725;
    const pts = [{ x: 0, y: 0 }, { x: W, y: 0 }, { x: W, y: D }, { x: 0, y: D }];
    const analysis = HouseCenterGeometryEngine.analyzePolygon(pts);

    const colLeftW = Math.round(W * 0.42); // 2940 mm
    const colRightW = W - colLeftW - 440;  // 3620 mm
    const bedH = Math.round((D - 660) / 3.4); // 3254 mm
    const wcH = Math.round(bedH * 0.7);

    const detectedRooms = [
        { id: 'scan_bed3', name: 'P.NGỦ 3', type: 'bed_regular', x: 220, y: 220, w: colLeftW, h: bedH, rot: 0 },
        { id: 'scan_bed2', name: 'P.NGỦ 2', type: 'bed_regular', x: 220, y: 220 + bedH + 110, w: colLeftW, h: bedH, rot: 0 },
        { id: 'scan_wc', name: 'WC CHUNG', type: 'toilet', x: 220, y: 220 + bedH * 2 + 220, w: colLeftW, h: wcH, rot: 0 },
        { id: 'scan_bed1', name: 'P.NGỦ 1', type: 'bed_master', x: 220, y: 220 + bedH * 2 + wcH + 330, w: colLeftW, h: D - (220 + bedH * 2 + wcH + 330) - 220, rot: 0 },
        { id: 'scan_yard_rear', name: 'SÂN SAU', type: 'yard', x: colLeftW + 330, y: 220, w: colRightW, h: Math.round(bedH * 0.65), rot: 0 },
        { id: 'scan_kitchen', name: 'P.BẾP + ĂN', type: 'kitchen_dining', x: colLeftW + 330, y: 220 + Math.round(bedH * 0.65) + 110, w: colRightW, h: Math.round(bedH * 1.35), rot: 0 },
        { id: 'scan_living', name: 'P.KHÁCH', type: 'living_room', x: colLeftW + 330, y: 220 + Math.round(bedH * 2.0) + 220, w: colRightW, h: Math.round(bedH * 1.2), rot: 0 },
        { id: 'scan_porch', name: 'SẢNH TRƯỚC', type: 'yard', x: colLeftW + 330, y: 220 + Math.round(bedH * 3.2) + 330, w: colRightW, h: D - (220 + Math.round(bedH * 3.2) + 330) - 220, rot: 0 }
    ];

    lastScannedData = {
        points: pts,
        analysis,
        rooms: detectedRooms,
        widthMm: W,
        depthMm: D,
        confidence: 98.6
    };

    const inputWidth = document.getElementById('inputWidth');
    const inputLength = document.getElementById('inputLength');
    if (inputWidth) inputWidth.value = '7.0';
    if (inputLength) inputLength.value = '11.7';

    displayScanAnalysis(lastScannedData);
    applyScanResultToCad(); // Tự động số hóa và vẽ ngay lập tức lên Canvas CAD!
}

function displayScanAnalysis(data) {
    const dashboard = document.getElementById('scanAnalysisDashboard');
    if (!dashboard) return;

    dashboard.style.display = 'block';
    const shapeEl = document.getElementById('scanStatShape');
    const dimsEl = document.getElementById('scanStatDims');
    const areaEl = document.getElementById('scanStatArea');
    const centroidEl = document.getElementById('scanStatCentroid');
    const confEl = document.getElementById('scanConfidenceBadge');

    if (shapeEl) shapeEl.textContent = data.analysis.shape === 'RECTANGLE' ? 'Hình Chữ Nhật (Standard)' : data.analysis.shape;
    if (dimsEl) dimsEl.textContent = `${data.widthMm} mm x ${data.depthMm} mm`;
    if (areaEl) areaEl.textContent = `${data.analysis.areaM2} m²`;
    if (centroidEl) centroidEl.textContent = `X: ${data.analysis.centroid.x} mm | Y: ${data.analysis.centroid.y} mm`;
    if (confEl) {
        confEl.textContent = `Độ Tin Cậy: ${data.confidence}%`;
        confEl.className = 'audit-badge good';
    }
}

function applyScanResultToCad() {
    if (!lastScannedData) return;

    const facingDegree = parseFloat(document.getElementById('inputFacingNumber')?.value || document.getElementById('inputFacingDegree')?.value || 180);
    const buildYear = parseInt(document.getElementById('inputBuildYear')?.value, 10) || 2025;
    const currentYear = parseInt(document.getElementById('inputCurrentYear')?.value, 10) || 2026;
    const currentMonth = parseInt(document.getElementById('inputCurrentMonth')?.value, 10) || 8;
    const currentDay = parseInt(document.getElementById('inputCurrentDay')?.value, 10) || 20;
    const currentHour = parseInt(document.getElementById('inputCurrentHour')?.value, 10) || 6;
    const ownerYear = parseInt(document.getElementById('inputOwnerYear')?.value, 10) || 1990;
    const ownerGender = document.getElementById('inputOwnerGender')?.value || 'nam';

    currentGeometry = {
        shape: lastScannedData.analysis.shape,
        footprintPoints: lastScannedData.points,
        widthMm: lastScannedData.widthMm,
        depthMm: lastScannedData.depthMm,
        totalFloors: 1,
        currentFloor: 1,
        floorsData: {
            1: {
                name: 'TẦNG TRỆT',
                rooms: lastScannedData.rooms
            }
        },
        facingDegree,
        rooms: lastScannedData.rooms
    };

    currentFlyingStars = calculateFlyingStars({
        facingDegree,
        buildYear,
        currentYear,
        currentMonth,
        currentDay,
        currentHour
    });

    currentBatTrach = calculateGua(ownerYear, ownerGender);

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

    renderFloorNavigator(1);
    renderActiveDrawing();
    renderFlyingStarsMatrix(currentFlyingStars, currentBatTrach);
    renderDetailedReport(currentSpatialResult);
    renderPopovers();
    renderSmartPopup();

    const resultsSection = document.getElementById('resultsSection');
    if (resultsSection) {
        resultsSection.scrollIntoView({ behavior: 'smooth' });
    }
}

/* 4. Drawing Layer Selection (Kiến Trúc CAD vs Phong Thủy Cửu Cung Layers) */
function initDrawingTabs() {
    const btnTabArch = document.getElementById('tabDrawingArch');
    const btnTabFengShui = document.getElementById('tabDrawingFengShui');

    if (btnTabArch) {
        btnTabArch.addEventListener('click', () => {
            layerState.furniture = !layerState.furniture;
            layerState.dimensions = layerState.furniture;
            btnTabArch.classList.toggle('active', layerState.furniture);

            const btnDim = document.getElementById('btnToggleDimensions');
            const btnFurn = document.getElementById('btnToggleFurniture');
            if (btnDim) btnDim.classList.toggle('active', layerState.dimensions);
            if (btnFurn) btnFurn.classList.toggle('active', layerState.furniture);

            renderActiveDrawing();
        });
    }

    if (btnTabFengShui) {
        btnTabFengShui.addEventListener('click', () => {
            layerState.luoPan = !layerState.luoPan;
            layerState.ninePalaces = layerState.luoPan;
            btnTabFengShui.classList.toggle('active', layerState.luoPan);

            const btnCompass = document.getElementById('btnToggleCompass');
            if (btnCompass) btnCompass.classList.toggle('active', layerState.luoPan);

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

/* 6. Drag & Drop Palaces Setup (Tab 2: Nhà) */
function initDragAndDropPalaces() {
    const rack = document.getElementById('availableRoomsRack');
    if (!rack) return;

    rack.querySelectorAll('.room-drag-chip').forEach(chip => {
        chip.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', JSON.stringify({
                id: chip.getAttribute('data-room-id'),
                name: chip.getAttribute('data-room-name'),
                type: chip.getAttribute('data-room-id')
            }));
        });
    });

    const btnDndOrientHouse = document.getElementById('btnDndOrientHouse');
    const btnDndOrientLoShu = document.getElementById('btnDndOrientLoShu');

    if (btnDndOrientHouse && btnDndOrientLoShu) {
        btnDndOrientHouse.addEventListener('click', () => {
            currentDndOrientMode = 'house';
            btnDndOrientHouse.classList.add('active');
            btnDndOrientLoShu.classList.remove('active');
            renderDndGrid();
        });

        btnDndOrientLoShu.addEventListener('click', () => {
            currentDndOrientMode = 'loshu';
            btnDndOrientLoShu.classList.add('active');
            btnDndOrientHouse.classList.remove('active');
            renderDndGrid();
        });
    }
}

function handleAddRoomToPalace(palaceId, roomType, roomName) {
    const prefix = roomType.substring(0, 4);
    roomCounters[prefix] = (roomCounters[prefix] || 0) + 1;
    const uniqueId = `${roomType}_${roomCounters[prefix]}`;

    const cleanName = roomCounters[prefix] > 1 ? `${roomName} ${roomCounters[prefix]}` : roomName;

    dndPlacements[palaceId].push({
        id: uniqueId,
        type: mapTypeToCadType(roomType),
        name: cleanName
    });

    renderDndGrid();
    handleCalculate(false);
}

function handleRemoveRoomFromPalace(palaceId, roomId) {
    dndPlacements[palaceId] = dndPlacements[palaceId].filter(r => r.id !== roomId);
    delete roomPositionCache[roomId];
    renderDndGrid();
    handleCalculate(false);
}

function mapTypeToCadType(type) {
    if (type === 'living') return 'living_room';
    if (type === 'kitchen') return 'kitchen_dining';
    if (type === 'master_bed' || type === 'bed') return 'bed_master';
    if (type === 'wc') return 'toilet';
    if (type === 'stairs') return 'stairs';
    if (type === 'garage') return 'garage';
    if (type === 'altar') return 'altar';
    if (type === 'laundry') return 'laundry';
    return 'living_room';
}

function renderDndGrid() {
    const grid = document.getElementById('dndPalacesGrid');
    if (!grid) return;

    const facingPalace = currentFlyingStars ? currentFlyingStars.facingPalace : 9;
    const sittingPalace = currentFlyingStars ? currentFlyingStars.sittingPalace : 1;

    const order = currentDndOrientMode === 'house'
        ? getOrientedPalaceGrid(facingPalace)
        : [4, 9, 2, 3, 5, 7, 8, 1, 6];

    grid.innerHTML = order.map(pId => {
        const isFacing = pId === facingPalace;
        const isSitting = pId === sittingPalace;

        let badgeTitle = PALACE_NAMES[pId] || `Cung ${pId}`;
        if (isFacing) badgeTitle = `[HƯỚNG] (${PALACE_SHORT[pId]})`;
        else if (isSitting) badgeTitle = `[TỌA] (${PALACE_SHORT[pId]})`;

        const palData = currentFlyingStars && currentFlyingStars.palaces ? currentFlyingStars.palaces[pId] : null;
        const starsBadge = palData ? `· Vận ${palData.vanStar}` : '';

        const rooms = dndPlacements[pId] || [];
        const roomTags = rooms.map(r => `
            <div class="dropped-room-tag" style="display: inline-flex; align-items: center; justify-content: space-between; background: rgba(2, 132, 199, 0.2); border: 1px solid #0284c7; padding: 2px 6px; border-radius: 4px; font-size: 0.72rem; margin: 2px 0;">
                <span style="color: #fff; font-weight: 700;">${r.name}</span>
                <button type="button" class="btn-remove-room" data-room-id="${r.id}" data-palace-id="${pId}" style="background: none; border: none; color: #ef4444; font-weight: bold; margin-left: 6px; cursor: pointer;">×</button>
            </div>
        `).join('');

        const cellBorder = isFacing 
            ? 'border: 2px solid #ef4444; background: rgba(239, 68, 68, 0.08);' 
            : (isSitting 
                ? 'border: 2px solid #3b82f6; background: rgba(59, 130, 246, 0.08);' 
                : 'border: 1px solid rgba(245, 158, 11, 0.3); background: rgba(15, 23, 42, 0.85);');

        return `
            <div class="dnd-palace-box" data-palace-id="${pId}" style="${cellBorder} border-radius: 8px; padding: 8px; min-height: 105px; display: flex; flex-direction: column; justify-content: space-between;">
                <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 4px; margin-bottom: 4px;">
                    <span style="font-size: 0.76rem; font-weight: 800; color: ${isFacing ? '#ef4444' : (isSitting ? '#38bdf8' : 'var(--gold-light)')};">${badgeTitle}</span>
                    <span style="font-size: 0.68rem; color: #94a3b8;">${starsBadge}</span>
                </div>
                <div class="dnd-room-target" style="flex: 1; display: flex; flex-direction: column; gap: 2px;">
                    ${roomTags.length > 0 ? roomTags : '<span style="font-size: 0.7rem; color: #64748b; font-style: italic;">+ Kéo phòng vào đây</span>'}
                </div>
            </div>
        `;
    }).join('');

    // Attach drag & drop listeners
    grid.querySelectorAll('.dnd-palace-box').forEach(box => {
        const pId = parseInt(box.getAttribute('data-palace-id'), 10);

        box.addEventListener('dragover', (e) => {
            e.preventDefault();
            box.style.borderColor = '#0284c7';
            box.style.background = 'rgba(2, 132, 199, 0.15)';
        });

        box.addEventListener('dragleave', () => {
            box.style.borderColor = '';
            box.style.background = '';
        });

        box.addEventListener('drop', (e) => {
            e.preventDefault();
            box.style.borderColor = '';
            box.style.background = '';
            try {
                const data = JSON.parse(e.dataTransfer.getData('text/plain'));
                if (data && data.type) {
                    handleAddRoomToPalace(pId, data.type, data.name);
                }
            } catch (err) {
                console.error(err);
            }
        });
    });

    grid.querySelectorAll('.btn-remove-room').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const rId = btn.getAttribute('data-room-id');
            const pId = parseInt(btn.getAttribute('data-palace-id'), 10);
            handleRemoveRoomFromPalace(pId, rId);
        });
    });
}

/* 7. Viewport Initialization */
function initViewport() {
    const stage = document.getElementById('svgStage');
    if (stage) {
        viewportController = new SvgViewportController(stage);
    }
}

/* 8. Floating Toolbar Initialization & Movable Drag Logic */
function initFloatingToolbar() {
    const btnLandscapeDirect = document.getElementById('btnTriggerLandscapeDirect');
    const popLandscapeDirect = document.getElementById('popoverMenuLandscapeDirect');
    const btnCloseLandscapeDirect = document.getElementById('btnClosePopoverLandscapeDirect');

    if (btnLandscapeDirect && popLandscapeDirect) {
        btnLandscapeDirect.addEventListener('click', (e) => {
            e.stopPropagation();
            const isVisible = popLandscapeDirect.style.display === 'block';
            closeAllPopovers();
            popLandscapeDirect.style.display = isVisible ? 'none' : 'block';
        });
    }

    if (btnCloseLandscapeDirect && popLandscapeDirect) {
        btnCloseLandscapeDirect.addEventListener('click', () => popLandscapeDirect.style.display = 'none');
    }

    document.querySelectorAll('.btn-sidebar-landscape').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const type = btn.getAttribute('data-type');
            const name = btn.getAttribute('data-name');
            const w = parseInt(btn.getAttribute('data-w'), 10) || 8000;
            const h = parseInt(btn.getAttribute('data-h'), 10) || 6000;
            handleAddLandscapeDirect(type, name, w, h);
            const resultsSection = document.getElementById('resultsSection');
            if (resultsSection) resultsSection.scrollIntoView({ behavior: 'smooth' });
        });
    });
    const tb = document.getElementById('cadFloatingToolbar');
    const dragHeader = document.getElementById('hudDragHeader');
    const btnMin = document.getElementById('btnMinimizeToolbar');
    const btnMax = document.getElementById('btnMaximizeToolbar');
    const body = document.getElementById('hudBody');

    if (!tb || !dragHeader) return;

    let isDragging = false;
    let startX = 0, startY = 0, origLeft = 0, origTop = 0;

    dragHeader.addEventListener('pointerdown', (e) => {
        if (e.target.closest('.hud-win-btn')) return;
        isDragging = true;
        startX = e.clientX;
        startY = e.clientY;
        
        const parentRect = (tb.offsetParent || document.getElementById('cad-workspace')).getBoundingClientRect();
        const tbRect = tb.getBoundingClientRect();
        
        origLeft = tbRect.left - parentRect.left;
        origTop = tbRect.top - parentRect.top;
        
        dragHeader.setPointerCapture(e.pointerId);
    });

    dragHeader.addEventListener('pointermove', (e) => {
        if (!isDragging) return;
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;
        
        const parentEl = tb.offsetParent || document.getElementById('cad-workspace');
        const maxW = parentEl ? (parentEl.clientWidth - tb.offsetWidth) : 2000;
        const maxH = parentEl ? (parentEl.clientHeight - tb.offsetHeight) : 2000;
        
        const newLeft = Math.max(0, Math.min(maxW, origLeft + dx));
        const newTop = Math.max(0, Math.min(maxH, origTop + dy));
        
        tb.style.left = `${newLeft}px`;
        tb.style.top = `${newTop}px`;
        tb.style.right = 'auto';
        tb.style.bottom = 'auto';
    });

    const stopDrag = (e) => {
        if (isDragging) {
            isDragging = false;
            try { dragHeader.releasePointerCapture(e.pointerId); } catch (_) {}
        }
    };

    dragHeader.addEventListener('pointerup', stopDrag);
    dragHeader.addEventListener('pointercancel', stopDrag);

    if (btnMin && tb) {
        btnMin.addEventListener('click', (e) => {
            e.stopPropagation();
            tb.classList.toggle('collapsed');
            btnMin.textContent = tb.classList.contains('collapsed') ? '+' : '−';
        });
    }

    if (btnMax) {
        btnMax.addEventListener('click', () => {
            tb.style.left = '20px';
            tb.style.top = '70px';
            tb.style.right = 'auto';
            tb.style.bottom = 'auto';
        });
    }

    // Popover Triggers
    const btnAdd = document.getElementById('btnTriggerAdd');
    const popAdd = document.getElementById('popoverMenuAdd');
    const btnCloseAdd = document.getElementById('btnClosePopoverAdd');

    const btnEdges = document.getElementById('btnTriggerEdges');
    const popEdges = document.getElementById('popoverMenuEdges');
    const btnCloseEdges = document.getElementById('btnClosePopoverEdges');

    const btnLayers = document.getElementById('btnTriggerLayers');
    const popLayers = document.getElementById('popoverMenuLayers');
    const btnCloseLayers = document.getElementById('btnClosePopoverLayers');

    if (btnLayers && popLayers) {
        btnLayers.addEventListener('click', (e) => {
            e.stopPropagation();
            const isVisible = popLayers.style.display === 'block';
            closeAllPopovers();
            popLayers.style.display = isVisible ? 'none' : 'block';
        });
    }

    if (btnCloseLayers && popLayers) {
        btnCloseLayers.addEventListener('click', () => popLayers.style.display = 'none');
    }

    // Layer checkboxes
    const chkWalls = document.getElementById('chkLayerWalls');
    const chkFurn = document.getElementById('chkLayerFurniture');
    const chkDims = document.getElementById('chkLayerDimensions');
    const chkLabels = document.getElementById('chkLayerLabels');
    const chkCenter = document.getElementById('chkLayerCenter');
    const chk9Pal = document.getElementById('chkLayerNinePalaces');
    const chkLuoPan = document.getElementById('chkLayerLuoPan');
    const chkSrcImg = document.getElementById('chkLayerSourceImg');
    const rngSrcOpacity = document.getElementById('rngSourceOpacity');

    if (chkWalls) chkWalls.addEventListener('change', (e) => { layerState.walls = e.target.checked; renderActiveDrawing(); });
    if (chkFurn) chkFurn.addEventListener('change', (e) => { layerState.furniture = e.target.checked; renderActiveDrawing(); });
    if (chkDims) chkDims.addEventListener('change', (e) => { layerState.dimensions = e.target.checked; renderActiveDrawing(); });
    if (chkLabels) chkLabels.addEventListener('change', (e) => { layerState.roomLabels = e.target.checked; renderActiveDrawing(); });
    if (chkCenter) chkCenter.addEventListener('change', (e) => { layerState.axes = e.target.checked; renderActiveDrawing(); });
    if (chk9Pal) chk9Pal.addEventListener('change', (e) => { layerState.ninePalaces = e.target.checked; renderActiveDrawing(); });
    if (chkLuoPan) chkLuoPan.addEventListener('change', (e) => { layerState.luoPan = e.target.checked; renderActiveDrawing(); });
    if (chkSrcImg) chkSrcImg.addEventListener('change', (e) => { layerState.sourceImage = e.target.checked; renderActiveDrawing(); });
    if (rngSrcOpacity) rngSrcOpacity.addEventListener('input', (e) => { 
        layerState.sourceImageOpacity = parseFloat(e.target.value) / 100;
        if (layerState.sourceImage) renderActiveDrawing();
    });

    const rngLuopanScale = document.getElementById('rngLuopanScale');
    const lblLuopanScale = document.getElementById('lblLuopanScale');
    if (rngLuopanScale) {
        rngLuopanScale.addEventListener('input', (e) => {
            const val = parseInt(e.target.value, 10) || 100;
            layerState.luoPanScale = val / 100;
            if (lblLuopanScale) lblLuopanScale.textContent = `${val}%`;
            renderActiveDrawing();
        });
    }

    if (btnAdd && popAdd) {
        btnAdd.addEventListener('click', (e) => {
            e.stopPropagation();
            const isVisible = popAdd.style.display === 'block';
            closeAllPopovers();
            popAdd.style.display = isVisible ? 'none' : 'block';
        });
    }

    if (btnCloseAdd && popAdd) {
        btnCloseAdd.addEventListener('click', () => popAdd.style.display = 'none');
    }

    if (btnEdges && popEdges) {
        btnEdges.addEventListener('click', (e) => {
            e.stopPropagation();
            const isVisible = popEdges.style.display === 'block';
            closeAllPopovers();
            popEdges.style.display = isVisible ? 'none' : 'block';
            renderPopovers();
        });
    }

    if (btnCloseEdges && popEdges) {
        btnCloseEdges.addEventListener('click', () => popEdges.style.display = 'none');
    }

    document.querySelectorAll('.hud-landscape-chip').forEach(chip => {
        chip.addEventListener('click', (e) => {
            e.stopPropagation();
            const type = chip.getAttribute('data-type');
            const name = chip.getAttribute('data-name');
            const w = parseInt(chip.getAttribute('data-w'), 10) || 8000;
            const h = parseInt(chip.getAttribute('data-h'), 10) || 6000;
            handleAddLandscapeDirect(type, name, w, h);
            if (popAdd) popAdd.style.display = 'none';
        });
    });

    const chkLayerLandscape = document.getElementById('chkLayerLandscape');
    if (chkLayerLandscape) {
        chkLayerLandscape.addEventListener('change', (e) => {
            layerState.landscapes = e.target.checked;
            renderActiveDrawing();
        });
    }

    document.querySelectorAll('.hud-comp-chip').forEach(chip => {
        chip.addEventListener('click', (e) => {
            e.stopPropagation();
            const type = chip.getAttribute('data-type');
            const name = chip.getAttribute('data-name');
            const w = parseInt(chip.getAttribute('data-w'), 10) || 3000;
            const h = parseInt(chip.getAttribute('data-h'), 10) || 3000;
            handleAddRoomDirect(type, name, w, h);
            if (popAdd) popAdd.style.display = 'none';
        });
    });

    document.addEventListener('click', (e) => {
        if (!e.target.closest('.hud-popover-wrapper')) {
            closeAllPopovers();
        }
    });
}

function handleAddRoomDirect(type, name, w, h) {
    if (!currentGeometry) return;
    const prefix = type.substring(0, 4);
    roomCounters[prefix] = (roomCounters[prefix] || 0) + 1;
    const id = `custom_${type}_${roomCounters[prefix]}`;
    const cleanName = roomCounters[prefix] > 1 ? `${name} ${roomCounters[prefix]}` : name;

    const cx = currentGeometry.widthMm ? currentGeometry.widthMm / 2 - w / 2 : 1000;
    const cy = currentGeometry.depthMm ? currentGeometry.depthMm / 2 - h / 2 : 1000;

    const newRoom = {
        id,
        name: cleanName.toUpperCase(),
        type,
        x: Math.round(cx),
        y: Math.round(cy),
        w,
        h,
        rot: 0
    };

    if (!currentGeometry.rooms) currentGeometry.rooms = [];
    currentGeometry.rooms.push(newRoom);
    selectedRoomId = id;

    renderActiveDrawing();
    renderPopovers();
    renderSmartPopup();
}

function closeAllPopovers() {
    document.querySelectorAll('.hud-popover-menu').forEach(m => m.style.display = 'none');
}

function renderSmartPopup() {
    const popup = document.getElementById('cadSmartPopup');
    if (!popup || !currentGeometry) return;

    if (selectedLandscapeId) {
        const l = currentGeometry.landscapes?.find(item => item.id === selectedLandscapeId);
        if (l) {
            popup.style.display = 'flex';
            popup.innerHTML = `
                <div class="popup-drag-header" id="popupDragHeader" style="display:flex; justify-content:space-between; align-items:center; cursor:move; padding-bottom:3px; border-bottom:1px solid rgba(255,255,255,0.1);">
                    <span style="font-size:0.68rem; font-weight:800; color:#f59e0b; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; max-width:115px;">${l.name}</span>
                    <button type="button" id="btnPopupCloseLandscape" title="Ẩn bảng" style="background:none; border:none; color:#94a3b8; font-weight:bold; cursor:pointer; font-size:0.85rem; padding:0 3px;">✕</button>
                </div>
                <div style="font-size:0.6rem; color:#38bdf8; margin-top:2px; font-weight:700;">
                    🏔 Ngoại Cảnh (Loan Đầu) · Góc Xoay: ${l.rot || 0}°
                </div>
                <div style="display:flex; gap:3px; align-items:center; margin-top:2px;">
                    <div style="flex:1; display:flex; align-items:center; gap:2px; background:rgba(0,0,0,0.4); border:1px solid rgba(255,255,255,0.15); border-radius:4px; padding:2px 4px;">
                        <span style="font-size:0.6rem; color:#94a3b8; font-weight:700;">R:</span>
                        <input type="number" id="popupInputLandscapeW" value="${l.w}" min="500" step="100" style="width:100%; background:transparent; border:none; color:#fff; font-size:0.72rem; font-weight:800; font-family:monospace; outline:none; text-align:right;">
                    </div>
                    <div style="flex:1; display:flex; align-items:center; gap:2px; background:rgba(0,0,0,0.4); border:1px solid rgba(255,255,255,0.15); border-radius:4px; padding:2px 4px;">
                        <span style="font-size:0.6rem; color:#94a3b8; font-weight:700;">D:</span>
                        <input type="number" id="popupInputLandscapeH" value="${l.h}" min="500" step="100" style="width:100%; background:transparent; border:none; color:#fff; font-size:0.72rem; font-weight:800; font-family:monospace; outline:none; text-align:right;">
                    </div>
                </div>
                <div style="display:flex; gap:3px; margin-top:2px;">
                    <button type="button" class="popup-action-btn save" id="btnPopupSaveLandscape" style="flex:1; padding:3px 0; font-size:0.66rem; font-weight:800; background:#16a34a; color:#fff; border:none; border-radius:4px; cursor:pointer;">LƯU</button>
                    <button type="button" class="popup-action-btn cancel" id="btnPopupRotateLandscape" style="flex:1; padding:3px 0; font-size:0.66rem; font-weight:700; background:#0284c7; color:#fff; border:none; border-radius:4px; cursor:pointer;">XOAY 45°</button>
                </div>
            `;

            initDraggablePopup(popup);

            document.getElementById('btnPopupSaveLandscape')?.addEventListener('click', () => {
                l.w = Math.max(500, parseInt(document.getElementById('popupInputLandscapeW').value, 10) || l.w);
                l.h = Math.max(500, parseInt(document.getElementById('popupInputLandscapeH').value, 10) || l.h);
                renderActiveDrawing();
            });
            document.getElementById('btnPopupRotateLandscape')?.addEventListener('click', () => {
                l.rot = ((l.rot || 0) + 45) % 360;
                renderActiveDrawing();
                refreshSpatialFengShui();
            });
            document.getElementById('btnPopupCloseLandscape')?.addEventListener('click', () => { popup.style.display = 'none'; });
            return;
        }
    }

    const pts = currentGeometry.footprintPoints || [];

    if (selectedEdgeIndex !== null && pts.length > selectedEdgeIndex) {
        const p1 = pts[selectedEdgeIndex];
        const p2 = pts[(selectedEdgeIndex + 1) % pts.length];
        const len = Math.round(Math.hypot(p2.x - p1.x, p2.y - p1.y));
        popup.style.display = 'flex';
        popup.innerHTML = `
            <div class="popup-drag-header" id="popupDragHeader" style="display:flex; justify-content:space-between; align-items:center; cursor:move; padding-bottom:3px; border-bottom:1px solid rgba(255,255,255,0.1);">
                <span style="font-size:0.68rem; font-weight:800; color:var(--gold-light);">CẠNH ${selectedEdgeIndex + 1}</span>
                <button type="button" id="btnPopupCloseEdge" title="Đóng bảng (Vẫn giữ chọn)" style="background:none; border:none; color:#94a3b8; font-weight:bold; cursor:pointer; font-size:0.85rem; padding:0 3px;">✕</button>
            </div>
            <div style="display:flex; align-items:center; gap:3px; background:rgba(0,0,0,0.4); border:1px solid rgba(255,255,255,0.15); border-radius:4px; padding:2px 4px; margin-top:2px;">
                <span style="font-size:0.6rem; color:#94a3b8; font-weight:700;">Dài:</span>
                <input type="number" id="popupInputEdgeL" value="${len}" min="200" step="100" style="width:100%; background:transparent; border:none; color:#fff; font-size:0.72rem; font-weight:800; font-family:monospace; outline:none; text-align:right;">
            </div>
            <div style="display:flex; gap:3px; margin-top:2px;">
                <button type="button" class="popup-action-btn save" id="btnPopupSaveEdge" style="flex:1; padding:3px 0; font-size:0.66rem; font-weight:800; background:#16a34a; color:#fff; border:none; border-radius:4px; cursor:pointer;">LƯU</button>
                <button type="button" class="popup-action-btn cancel" id="btnPopupCancelEdge" style="flex:1; padding:3px 0; font-size:0.66rem; font-weight:700; background:rgba(255,255,255,0.1); color:#cbd5e1; border:none; border-radius:4px; cursor:pointer;">ẨN</button>
            </div>
        `;

        initDraggablePopup(popup);

        document.getElementById('btnPopupSaveEdge')?.addEventListener('click', () => {
            const newL = parseFloat(document.getElementById('popupInputEdgeL')?.value);
            const dx = p2.x - p1.x; const dy = p2.y - p1.y;
            const curL = Math.hypot(dx, dy);
            if (newL > 100 && curL > 0) {
                p2.x = Math.round(p1.x + (dx / curL) * newL);
                p2.y = Math.round(p1.y + (dy / curL) * newL);
                renderActiveDrawing(); renderPopovers();
            }
        });
        document.getElementById('btnPopupCancelEdge')?.addEventListener('click', () => { popup.style.display = 'none'; });
        document.getElementById('btnPopupCloseEdge')?.addEventListener('click', () => { popup.style.display = 'none'; });
        return;
    }

    if (selectedRoomId) {
        const room = currentGeometry.rooms?.find(r => r.id === selectedRoomId);
        if (room) {
            const palInfo = getRoomPalaceInfo(room);
            const isGood = palInfo && (palInfo.grade === 'ĐẠI CÁT' || palInfo.grade === 'CÁT');
            const isBad = palInfo && (palInfo.grade === 'ĐẠI HUNG' || palInfo.grade === 'HUNG');
            const statusBadge = palInfo ? `<span class="audit-badge ${isGood ? 'good' : (isBad ? 'bad' : 'neutral')}" style="font-size:0.58rem; padding:1px 4px;">${palInfo.grade || 'BÌNH'}</span>` : '';
            const palLabel = palInfo ? `${palInfo.palaceName} (${palInfo.bazhaiStar || ''})` : '';

            popup.style.display = 'flex';
            popup.innerHTML = `
                <div class="popup-drag-header" id="popupDragHeader" style="display:flex; justify-content:space-between; align-items:center; cursor:move; padding-bottom:3px; border-bottom:1px solid rgba(255,255,255,0.1);">
                    <span style="font-size:0.68rem; font-weight:800; color:var(--gold-light); overflow:hidden; text-overflow:ellipsis; white-space:nowrap; max-width:110px;">${room.name}</span>
                    <div style="display:flex; align-items:center; gap:3px;">
                        ${statusBadge}
                        <button type="button" id="btnPopupCloseRoom" title="Ẩn bảng" style="background:none; border:none; color:#94a3b8; font-weight:bold; cursor:pointer; font-size:0.85rem; padding:0 3px;">✕</button>
                    </div>
                </div>
                <div style="font-size:0.6rem; color:#38bdf8; margin-top:2px; font-weight:700; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">
                    📍 Cung: ${palLabel}
                </div>
                <div style="display:flex; gap:3px; align-items:center; margin-top:2px;">
                    <div style="flex:1; display:flex; align-items:center; gap:2px; background:rgba(0,0,0,0.4); border:1px solid rgba(255,255,255,0.15); border-radius:4px; padding:2px 4px;">
                        <span style="font-size:0.6rem; color:#94a3b8; font-weight:700;">R:</span>
                        <input type="number" id="popupInputRoomW" value="${room.w}" min="300" step="100" style="width:100%; background:transparent; border:none; color:#fff; font-size:0.72rem; font-weight:800; font-family:monospace; outline:none; text-align:right;">
                    </div>
                    <div style="flex:1; display:flex; align-items:center; gap:2px; background:rgba(0,0,0,0.4); border:1px solid rgba(255,255,255,0.15); border-radius:4px; padding:2px 4px;">
                        <span style="font-size:0.6rem; color:#94a3b8; font-weight:700;">D:</span>
                        <input type="number" id="popupInputRoomH" value="${room.h}" min="300" step="100" style="width:100%; background:transparent; border:none; color:#fff; font-size:0.72rem; font-weight:800; font-family:monospace; outline:none; text-align:right;">
                    </div>
                </div>
                <div style="display:flex; gap:3px; margin-top:2px;">
                    <button type="button" class="popup-action-btn save" id="btnPopupSaveRoom" style="flex:1; padding:3px 0; font-size:0.66rem; font-weight:800; background:#16a34a; color:#fff; border:none; border-radius:4px; cursor:pointer;">LƯU</button>
                    <button type="button" class="popup-action-btn cancel" id="btnPopupCancelRoom" style="flex:1; padding:3px 0; font-size:0.66rem; font-weight:700; background:rgba(255,255,255,0.1); color:#cbd5e1; border:none; border-radius:4px; cursor:pointer;">ẨN</button>
                </div>
            `;

            initDraggablePopup(popup);

            document.getElementById('btnPopupSaveRoom')?.addEventListener('click', () => {
                room.w = Math.max(300, parseInt(document.getElementById('popupInputRoomW').value, 10) || room.w);
                room.h = Math.max(300, parseInt(document.getElementById('popupInputRoomH').value, 10) || room.h);
                roomPositionCache[room.id] = { x: room.x, y: room.y, w: room.w, h: room.h, rot: room.rot || 0 };
                // Giữ nguyên 8 điểm kéo trên phòng!
                renderActiveDrawing(); renderPopovers();
            });
            document.getElementById('btnPopupCancelRoom')?.addEventListener('click', () => { 
                // Chỉ ẩn bảng nhập, giữ nguyên 8 điểm kéo trên phòng!
                popup.style.display = 'none'; 
            });
            document.getElementById('btnPopupCloseRoom')?.addEventListener('click', () => { 
                // Chỉ ẩn bảng nhập, giữ nguyên 8 điểm kéo trên phòng!
                popup.style.display = 'none'; 
            });
            return;
        }
    }
    popup.style.display = 'none';
}

function initDraggablePopup(popupEl) {
    const header = popupEl.querySelector('.popup-drag-header');
    if (!header) return;

    let isDragging = false;
    let startX = 0, startY = 0, origLeft = 0, origTop = 0;

    header.addEventListener('pointerdown', (e) => {
        if (e.target.tagName === 'BUTTON') return;
        isDragging = true;
        startX = e.clientX;
        startY = e.clientY;
        
        const parentRect = (popupEl.offsetParent || document.getElementById('cad-workspace')).getBoundingClientRect();
        const pRect = popupEl.getBoundingClientRect();
        
        origLeft = pRect.left - parentRect.left;
        origTop = pRect.top - parentRect.top;
        
        header.setPointerCapture(e.pointerId);
    });

    header.addEventListener('pointermove', (e) => {
        if (!isDragging) return;
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;
        
        const parentEl = popupEl.offsetParent || document.getElementById('cad-workspace');
        const maxW = parentEl ? (parentEl.clientWidth - popupEl.offsetWidth) : 2000;
        const maxH = parentEl ? (parentEl.clientHeight - popupEl.offsetHeight) : 2000;
        
        const newLeft = Math.max(0, Math.min(maxW, origLeft + dx));
        const newTop = Math.max(0, Math.min(maxH, origTop + dy));
        
        popupEl.style.left = `${newLeft}px`;
        popupEl.style.top = `${newTop}px`;
        popupEl.style.bottom = 'auto';
        popupEl.style.transform = 'none';
    });

    const stopDrag = (e) => {
        if (isDragging) {
            isDragging = false;
            try { header.releasePointerCapture(e.pointerId); } catch (_) {}
        }
    };

    header.addEventListener('pointerup', stopDrag);
    header.addEventListener('pointercancel', stopDrag);
}

function renderPopovers() {
    const edgesList = document.getElementById('popoverEdgesList');
    const hudRoomChipsList = document.getElementById('hudRoomChipsList');
    if (!currentGeometry) return;

    // 1. Cạnh thửa đất
    if (edgesList) {
        const pts = currentGeometry.footprintPoints || [];
        if (pts.length < 2) {
            edgesList.innerHTML = '<span style="font-size:0.75rem; color:#94a3b8; padding: 4px;">Không có cạnh</span>';
        } else {
            edgesList.innerHTML = pts.map((p1, idx) => {
                const p2 = pts[(idx + 1) % pts.length];
                const len = Math.round(Math.hypot(p2.x - p1.x, p2.y - p1.y));
                const isSel = selectedEdgeIndex === idx;
                return `
                    <div class="popover-item-row ${isSel ? 'active' : ''}" data-edge-idx="${idx}">
                        <span>Cạnh ${idx + 1}</span>
                        <span class="chip-dim">${len} mm</span>
                    </div>
                `;
            }).join('');

            edgesList.querySelectorAll('.popover-item-row').forEach(item => {
                item.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const idx = parseInt(item.getAttribute('data-edge-idx'), 10);
                    selectEdge(idx, true);
                });
            });
        }
    }

    // 2. Danh sách phòng độc lập
    if (hudRoomChipsList) {
        const rooms = currentGeometry.rooms || [];
        if (rooms.length === 0) {
            hudRoomChipsList.innerHTML = '<span style="font-size:0.65rem; color:#94a3b8; font-style:italic; padding:4px;">Chưa có phòng nào</span>';
        } else {
            hudRoomChipsList.innerHTML = rooms.map(r => {
                const isSel = (r.id === selectedRoomId);
                return `
                    <button type="button" class="hud-room-chip-btn ${isSel ? 'active' : ''}" data-room-id="${r.id}" title="Chạm để chỉnh sửa kích thước ${r.name}">
                        <span>${r.name}</span>
                    </button>
                `;
            }).join('');

            hudRoomChipsList.querySelectorAll('.hud-room-chip-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const rId = btn.getAttribute('data-room-id');
                    selectRoom(rId, true);
                });
            });
        }
    }
}

function selectRoom(roomId, rerender = true) {
    selectedRoomId = roomId;
    selectedEdgeIndex = null;
    if (rerender) {
        renderActiveDrawing();
        renderPopovers();
        renderSmartPopup();
    }
}

function selectEdge(edgeIdx, rerender = true) {
    selectedEdgeIndex = edgeIdx;
    selectedRoomId = null;
    if (rerender) {
        renderActiveDrawing();
        renderPopovers();
        renderSmartPopup();
    }
}

/* 9. Action Buttons, Fullscreen & Zoom Controller */
function initActionButtons() {
    const btnCalc = document.getElementById('btnCalculate');
    const btnToggleFs = document.getElementById('btnToggleFullscreen');
    const btnExportPng = document.getElementById('btnExportPng');
    const btnZoomIn = document.getElementById('btnZoomIn');
    const btnZoomOut = document.getElementById('btnZoomOut');
    const btnZoomFit = document.getElementById('btnZoomFit');

    if (btnCalc) {
        btnCalc.addEventListener('click', () => handleCalculate(true));
    }

    // Auto recalculate and update Flying Stars & Luopan whenever inputs change
    ['inputBuildYear', 'inputCurrentYear', 'inputCurrentMonth', 'inputCurrentDay', 'inputCurrentHour', 'inputOwnerYear', 'inputOwnerGender', 'inputShape', 'inputWidth', 'inputLength', 'inputFloors'].forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.addEventListener('change', () => handleCalculate(false));
            if (el.tagName === 'INPUT' && el.type !== 'file') {
                el.addEventListener('input', () => handleCalculate(false));
            }
        }
    });

    if (btnToggleFs) {
        btnToggleFs.addEventListener('click', () => toggleCadFullscreen());
    }

    if (btnZoomIn) {
        btnZoomIn.addEventListener('click', () => {
            if (viewportController) viewportController.zoom(1.25);
        });
    }

    if (btnZoomOut) {
        btnZoomOut.addEventListener('click', () => {
            if (viewportController) viewportController.zoom(0.8);
        });
    }

    if (btnZoomFit) {
        btnZoomFit.addEventListener('click', () => {
            if (viewportController) viewportController.fitToScreen();
        });
    }

    if (btnExportPng) {
        btnExportPng.addEventListener('click', () => {
            exportSvgToPng();
        });
    }

    // Synchronize Fullscreen Events across all browser types
    const syncFullscreenState = () => {
        const ws = document.getElementById('cad-workspace');
        const isFs = !!(document.fullscreenElement || document.webkitFullscreenElement || (ws && ws.classList.contains('is-fullscreen')));
        updateFullscreenUi(isFs);
    };

    document.addEventListener('fullscreenchange', syncFullscreenState);
    document.addEventListener('webkitfullscreenchange', syncFullscreenState);
    document.addEventListener('mozfullscreenchange', syncFullscreenState);
    document.addEventListener('MSFullscreenChange', syncFullscreenState);
}

function toggleCadFullscreen() {
    const ws = document.getElementById('cad-workspace');
    if (!ws) return;

    const isFs = !!(document.fullscreenElement || document.webkitFullscreenElement || ws.classList.contains('is-fullscreen'));

    if (!isFs) {
        const req = ws.requestFullscreen || ws.webkitRequestFullscreen || ws.mozRequestFullScreen || ws.msRequestFullscreen;
        if (req) {
            req.call(ws).catch(() => {
                ws.classList.add('is-fullscreen');
                updateFullscreenUi(true);
            });
        } else {
            ws.classList.add('is-fullscreen');
            updateFullscreenUi(true);
        }
    } else {
        const exit = document.exitFullscreen || document.webkitExitFullscreen || document.mozCancelFullScreen || document.msExitFullscreen;
        if (document.fullscreenElement && exit) {
            exit.call(document).catch(() => {});
        }
        ws.classList.remove('is-fullscreen');
        updateFullscreenUi(false);
    }
}

function updateFullscreenUi(isFs) {
    const iconOpen = document.getElementById('iconFullscreenOpen');
    const iconExit = document.getElementById('iconFullscreenExit');
    const txtFs = document.getElementById('txtFullscreen');

    if (iconOpen) iconOpen.style.display = isFs ? 'none' : 'inline-block';
    if (iconExit) iconExit.style.display = isFs ? 'inline-block' : 'none';
    if (txtFs) txtFs.textContent = isFs ? 'Thu Nhỏ' : 'Toàn Màn';

    if (viewportController) {
        setTimeout(() => viewportController.updateTransform(), 120);
    }
}

function exportSvgToPng() {
    const svgEl = document.querySelector('#svgStage svg');
    if (!svgEl) return;

    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(svgEl);
    const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
    const URL = window.URL || window.webkitURL || window;
    const blobURL = URL.createObjectURL(svgBlob);

    const image = new Image();
    image.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = 3840; // 4K Resolution
        canvas.height = Math.round((3840 * image.naturalHeight) / image.naturalWidth);
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

        const pngURL = canvas.toDataURL('image/png');
        const downloadLink = document.createElement('a');
        downloadLink.href = pngURL;
        downloadLink.download = `Ban-Ve-Phong-Thuy-${Date.now()}.png`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    };
    image.src = blobURL;
}


/* Snapping & Alignment Engine */
function snapToGrid(val, step = 50) {
    return Math.round(val / step) * step;
}

function snapRoomPosition(x, y, w, h, currentRoomId) {
    let snappedX = snapToGrid(x, 50);
    let snappedY = snapToGrid(y, 50);
    const snapThreshold = 120;

    // Snap to footprint points
    if (currentGeometry && currentGeometry.footprintPoints) {
        currentGeometry.footprintPoints.forEach(p => {
            if (Math.abs(snappedX - p.x) < snapThreshold) snappedX = p.x;
            if (Math.abs(snappedX + w - p.x) < snapThreshold) snappedX = p.x - w;
            if (Math.abs(snappedY - p.y) < snapThreshold) snappedY = p.y;
            if (Math.abs(snappedY + h - p.y) < snapThreshold) snappedY = p.y - h;
        });
    }

    // Snap to other rooms
    if (currentGeometry && currentGeometry.rooms) {
        currentGeometry.rooms.forEach(other => {
            if (other.id === currentRoomId) return;
            if (Math.abs(snappedX - other.x) < snapThreshold) snappedX = other.x;
            if (Math.abs(snappedX - (other.x + other.w)) < snapThreshold) snappedX = other.x + other.w;
            if (Math.abs(snappedX + w - other.x) < snapThreshold) snappedX = other.x - w;
            if (Math.abs(snappedX + w - (other.x + other.w)) < snapThreshold) snappedX = other.x + other.w - w;

            if (Math.abs(snappedY - other.y) < snapThreshold) snappedY = other.y;
            if (Math.abs(snappedY - (other.y + other.h)) < snapThreshold) snappedY = other.y + other.h;
            if (Math.abs(snappedY + h - other.y) < snapThreshold) snappedY = other.y - h;
            if (Math.abs(snappedY + h - (other.y + other.h)) < snapThreshold) snappedY = other.y + other.h - h;
        });
    }

    return { x: snappedX, y: snappedY };
}

/* 10. Interactive CAD Manipulation Engine (Pointer Events) */
function initCadInteractiveEngine() {

    // Keyboard shortcuts for CAD Drawing
    window.addEventListener('keydown', (e) => {
        if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName)) return;

        if (e.key === 'Escape') {
            closeAllPopovers();
            const popup = document.getElementById('cadSmartPopup');
            if (popup) popup.style.display = 'none';
        } else if (selectedRoomId) {
            const room = currentGeometry?.rooms?.find(r => r.id === selectedRoomId);
            if (!room) return;
            const step = e.shiftKey ? 200 : 50;

            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                room.x -= step;
                renderActiveDrawing();
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                room.x += step;
                renderActiveDrawing();
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                room.y -= step;
                renderActiveDrawing();
            } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                room.y += step;
                renderActiveDrawing();
            } else if (e.key === 'r' || e.key === 'R') {
                e.preventDefault();
                handleMiniAction('rotate', room.id);
            } else if (e.key === 'Delete' || e.key === 'Backspace') {
                e.preventDefault();
                handleMiniAction('delete', room.id);
            }
        }
    });

    const stage = document.getElementById('svgStage');
    if (!stage) return;

    stage.addEventListener('pointerdown', (e) => {
        const miniActionBtn = e.target.closest('.btn-cad-mini-action');
        if (miniActionBtn) {
            e.stopPropagation();
            const action = miniActionBtn.getAttribute('data-action');
            const roomId = miniActionBtn.getAttribute('data-room-id');
            const landscapeId = miniActionBtn.getAttribute('data-landscape-id');
            if (landscapeId) {
                handleLandscapeMiniAction(action, landscapeId);
                return;
            }
            if (roomId) {
                handleMiniAction(action, roomId);
                return;
            }
        }

        const landscapeResizeHandle = e.target.closest('.cad-resize-handle[data-landscape-id]') || e.target.closest('.cad-resize-handle-group[data-landscape-id]');
        if (landscapeResizeHandle) {
            e.stopPropagation();
            const handleId = landscapeResizeHandle.getAttribute('data-handle');
            const lId = landscapeResizeHandle.getAttribute('data-landscape-id');
            const l = currentGeometry.landscapes?.find(item => item.id === lId);
            if (!l) return;

            pointerState.isInteracting = true;
            pointerState.mode = 'resize_landscape';
            pointerState.handle = handleId;
            pointerState.targetLandscapeId = lId;
            pointerState.startClientX = e.clientX;
            pointerState.startClientY = e.clientY;
            pointerState.origX = l.x;
            pointerState.origY = l.y;
            pointerState.origW = l.w;
            pointerState.origH = l.h;

            stage.setPointerCapture(e.pointerId);
            return;
        }

        const landscapeEl = e.target.closest('.cad-landscape-interactive');
        if (landscapeEl) {
            e.stopPropagation();
            const lId = landscapeEl.getAttribute('data-landscape-id');
            selectedLandscapeId = lId;
            selectedRoomId = null;
            selectedEdgeIndex = null;

            const l = currentGeometry.landscapes?.find(item => item.id === lId);
            if (!l) return;

            pointerState.isInteracting = true;
            pointerState.mode = 'move_landscape';
            pointerState.targetLandscapeId = lId;
            pointerState.startClientX = e.clientX;
            pointerState.startClientY = e.clientY;
            pointerState.origX = l.x;
            pointerState.origY = l.y;

            renderActiveDrawing();
            renderSmartPopup();
            stage.setPointerCapture(e.pointerId);
            return;
        }
        if (miniActionBtn) {
            e.stopPropagation();
            const action = miniActionBtn.getAttribute('data-action');
            const roomId = miniActionBtn.getAttribute('data-room-id');
            handleMiniAction(action, roomId);
            return;
        }

        const resizeHandle = e.target.closest('.cad-resize-handle') || e.target.closest('.cad-resize-handle-group');
        if (resizeHandle) {
            e.stopPropagation();
            const handleId = resizeHandle.getAttribute('data-handle');
            const rId = resizeHandle.getAttribute('data-room-id');
            const room = currentGeometry.rooms?.find(r => r.id === rId);
            if (!room) return;

            pointerState.isInteracting = true;
            pointerState.mode = 'resize';
            pointerState.handle = handleId;
            pointerState.targetRoomId = rId;
            pointerState.startClientX = e.clientX;
            pointerState.startClientY = e.clientY;
            pointerState.origX = room.x;
            pointerState.origY = room.y;
            pointerState.origW = room.w;
            pointerState.origH = room.h;

            stage.setPointerCapture(e.pointerId);
            return;
        }

        const vertexHandle = e.target.closest('.cad-vertex-handle') || e.target.closest('.cad-vertex-group');
        if (vertexHandle) {
            e.stopPropagation();
            const vIdx = parseInt(vertexHandle.getAttribute('data-vertex-idx'), 10);
            const pt = currentGeometry.footprintPoints?.[vIdx];
            if (!pt) return;

            pointerState.isInteracting = true;
            pointerState.mode = 'vertex';
            pointerState.targetVertexIdx = vIdx;
            pointerState.startClientX = e.clientX;
            pointerState.startClientY = e.clientY;
            pointerState.origX = pt.x;
            pointerState.origY = pt.y;

            stage.setPointerCapture(e.pointerId);
            return;
        }

        const roomEl = e.target.closest('.cad-room-interactive');
        if (roomEl) {
            e.stopPropagation();
            const rId = roomEl.getAttribute('data-room-id');
            selectRoom(rId, true);

            const room = currentGeometry.rooms?.find(r => r.id === rId);
            if (!room) return;

            pointerState.isInteracting = true;
            pointerState.mode = 'move';
            pointerState.targetRoomId = rId;
            pointerState.startClientX = e.clientX;
            pointerState.startClientY = e.clientY;
            pointerState.origX = room.x;
            pointerState.origY = room.y;

            stage.setPointerCapture(e.pointerId);
            return;
        }

        const edgeEl = e.target.closest('.cad-edge-hitbox') || e.target.closest('.cad-edge-group');
        if (edgeEl) {
            e.stopPropagation();
            const eIdx = parseInt(edgeEl.getAttribute('data-edge-idx'), 10);
            selectEdge(eIdx, true);
            return;
        }
    });

    stage.addEventListener('pointermove', (e) => {
        if (!pointerState.isInteracting) return;

        const svgEl = stage.querySelector('svg');
        if (!svgEl) return;

        const rect = svgEl.getBoundingClientRect();
        const vb = cadRenderer.renderLayers(currentGeometry).viewBox;
        const scaleX = vb.w / rect.width;
        const scaleY = vb.h / rect.height;

        const dx = (e.clientX - pointerState.startClientX) * scaleX;
        const dy = (e.clientY - pointerState.startClientY) * scaleY;

        if (pointerState.mode === 'move_landscape') {
            const l = currentGeometry.landscapes?.find(item => item.id === pointerState.targetLandscapeId);
            if (l) {
                l.x = snapToGrid(pointerState.origX + dx, 50);
                l.y = snapToGrid(pointerState.origY + dy, 50);
                renderActiveDrawing();
            }
        } else if (pointerState.mode === 'resize_landscape') {
            const l = currentGeometry.landscapes?.find(item => item.id === pointerState.targetLandscapeId);
            if (l) {
                const hId = pointerState.handle;
                if (hId.includes('e')) l.w = Math.max(1000, snapToGrid(pointerState.origW + dx, 50));
                if (hId.includes('s')) l.h = Math.max(1000, snapToGrid(pointerState.origH + dy, 50));
                if (hId.includes('w')) {
                    const newW = Math.max(1000, snapToGrid(pointerState.origW - dx, 50));
                    l.x = pointerState.origX + (pointerState.origW - newW);
                    l.w = newW;
                }
                if (hId.includes('n')) {
                    const newH = Math.max(1000, snapToGrid(pointerState.origH - dy, 50));
                    l.y = pointerState.origY + (pointerState.origH - newH);
                    l.h = newH;
                }
                renderActiveDrawing();
            }
        } else if (pointerState.mode === 'move') {
            const room = currentGeometry.rooms?.find(r => r.id === pointerState.targetRoomId);
            if (room) {
                const rawX = pointerState.origX + dx;
                const rawY = pointerState.origY + dy;
                const snapped = snapRoomPosition(rawX, rawY, room.w, room.h, room.id);
                room.x = snapped.x;
                room.y = snapped.y;
                roomPositionCache[room.id] = { x: room.x, y: room.y, w: room.w, h: room.h, rot: room.rot || 0 };
                renderActiveDrawing();
            }
        } else if (pointerState.mode === 'resize') {
            const room = currentGeometry.rooms?.find(r => r.id === pointerState.targetRoomId);
            if (room) {
                const h = pointerState.handle;
                if (h.includes('e')) room.w = Math.max(400, snapToGrid(pointerState.origW + dx, 50));
                if (h.includes('s')) room.h = Math.max(400, snapToGrid(pointerState.origH + dy, 50));
                if (h.includes('w')) {
                    const newW = Math.max(400, snapToGrid(pointerState.origW - dx, 50));
                    room.x = snapToGrid(pointerState.origX + (pointerState.origW - newW), 50);
                    room.w = newW;
                }
                if (h.includes('n')) {
                    const newH = Math.max(400, snapToGrid(pointerState.origH - dy, 50));
                    room.y = snapToGrid(pointerState.origY + (pointerState.origH - newH), 50);
                    room.h = newH;
                }
                roomPositionCache[room.id] = { x: room.x, y: room.y, w: room.w, h: room.h, rot: room.rot || 0 };
                renderActiveDrawing();

                // Live update inputs in popup if open
                const inpW = document.getElementById('popupInputRoomW');
                const inpH = document.getElementById('popupInputRoomH');
                if (inpW) inpW.value = room.w;
                if (inpH) inpH.value = room.h;
            }
        } else if (pointerState.mode === 'vertex') {
            const pt = currentGeometry.footprintPoints?.[pointerState.targetVertexIdx];
            if (pt) {
                pt.x = snapToGrid(pointerState.origX + dx, 50);
                pt.y = snapToGrid(pointerState.origY + dy, 50);
                renderActiveDrawing();
            }
        }
    });

    const stopInteraction = (e) => {
        if (pointerState.isInteracting) {
            pointerState.isInteracting = false;
            pointerState.mode = null;
            try { stage.releasePointerCapture(e.pointerId); } catch (_) {}
            renderSmartPopup();
            renderPopovers();
            refreshSpatialFengShui();
        }
    };

    stage.addEventListener('pointerup', stopInteraction);
    stage.addEventListener('pointercancel', stopInteraction);
}

function handleMiniAction(action, roomId) {
    const room = currentGeometry.rooms?.find(r => r.id === roomId);
    if (!room) return;

    if (action === 'confirm') {
        selectedRoomId = null;
        renderActiveDrawing();
        renderSmartPopup();
        renderPopovers();
    } else if (action === 'rotate') {
        const tempW = room.w;
        room.w = room.h;
        room.h = tempW;
        room.rot = ((room.rot || 0) + 90) % 360;
        roomPositionCache[room.id] = { x: room.x, y: room.y, w: room.w, h: room.h, rot: room.rot };
        renderActiveDrawing();
        renderSmartPopup();
    } else if (action === 'size_plus') {
        room.w = Math.round(room.w * 1.1);
        room.h = Math.round(room.h * 1.1);
        roomPositionCache[room.id] = { x: room.x, y: room.y, w: room.w, h: room.h, rot: room.rot || 0 };
        renderActiveDrawing();
        renderSmartPopup();
    } else if (action === 'size_minus') {
        room.w = Math.max(800, Math.round(room.w * 0.9));
        room.h = Math.max(800, Math.round(room.h * 0.9));
        roomPositionCache[room.id] = { x: room.x, y: room.y, w: room.w, h: room.h, rot: room.rot || 0 };
        renderActiveDrawing();
        renderSmartPopup();
    } else if (action === 'delete') {
        currentGeometry.rooms = currentGeometry.rooms.filter(r => r.id !== roomId);
        delete roomPositionCache[roomId];
        selectedRoomId = null;
        renderActiveDrawing();
        renderSmartPopup();
        renderPopovers();
    }
}

/* 11. Core Master Calculation Pipeline */
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

    let customRooms = null;
    if (currentMode === 'existing_house') {
        const W = Math.round(widthM * 1000);
        const D = Math.round(lengthM * 1000);
        customRooms = [];

        const orientedGrid = getOrientedPalaceGrid(findMountain(facingDegree).mountain.trigram);
        const cellW = W / 3;
        const cellH = D / 3;

        orientedGrid.forEach((pId, idx) => {
            const row = Math.floor(idx / 3);
            const col = idx % 3;
            const roomsInPalace = dndPlacements[pId] || [];

            roomsInPalace.forEach((r, rIdx) => {
                const cached = roomPositionCache[r.id];
                if (cached) {
                    customRooms.push({
                        id: r.id,
                        name: r.name.toUpperCase(),
                        type: r.type,
                        x: cached.x,
                        y: cached.y,
                        w: cached.w,
                        h: cached.h,
                        rot: cached.rot || 0
                    });
                    return;
                }

                const subH = (cellH - 400) / Math.max(1, roomsInPalace.length);
                customRooms.push({
                    id: r.id,
                    name: r.name.toUpperCase(),
                    type: r.type,
                    x: Math.round(col * cellW + 200),
                    y: Math.round(row * cellH + 200 + rIdx * subH),
                    w: Math.round(cellW - 400),
                    h: Math.round(subH - 100),
                    rot: 0
                });
            });
        });
    }

    currentGeometry = generateParametricFloorplan({
        shape,
        widthM,
        lengthM,
        floors,
        facingDegree,
        customRooms
    });

    currentFlyingStars = calculateFlyingStars({
        facingDegree,
        buildYear,
        currentYear,
        currentMonth,
        currentDay,
        currentHour
    });

    currentBatTrach = calculateGua(ownerYear, ownerGender);

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

    renderFloorNavigator(currentGeometry.totalFloors);
    renderActiveDrawing();
    renderFlyingStarsMatrix(currentFlyingStars, currentBatTrach);
    renderDndGrid();
    renderDetailedReport(currentSpatialResult);
    renderPopovers();
    renderSmartPopup();

    if (shouldScroll && resultsSection) {
        resultsSection.scrollIntoView({ behavior: 'smooth' });
    }
}

/* 12. Render Floor Navigator with Click Handlers */
function renderFloorNavigator(totalFloors) {
    const nav = document.getElementById('floorNavigator');
    if (!nav) return;

    let buttons = '';
    const curF = currentGeometry ? (currentGeometry.currentFloor || 1) : 1;
    for (let f = 1; f <= totalFloors; f++) {
        const isActive = (f === curF);
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
            const targetFloor = parseInt(btn.getAttribute('data-floor'), 10);
            if (currentGeometry && currentGeometry.floorsData && currentGeometry.floorsData[targetFloor]) {
                currentGeometry.currentFloor = targetFloor;
                currentGeometry.rooms = currentGeometry.floorsData[targetFloor].rooms.map(r => {
                    const cached = roomPositionCache[r.id];
                    if (cached) {
                        return { ...r, x: cached.x, y: cached.y, w: cached.w, h: cached.h, rot: cached.rot || 0 };
                    }
                    return { ...r };
                });
                renderFloorNavigator(totalFloors);
                renderActiveDrawing();
                renderPopovers();
            }
        });
    });
}

/* 13. Render Active Drawing (Multi-layer Unified CAD + La Kinh + Cửu Cung) */
function renderActiveDrawing() {
    if (!currentGeometry || !viewportController) return;

    if (!cadRenderer) {
        cadRenderer = new ArchitecturalCADRenderer({ theme: currentThemeMode });
    }
    if (!luoPanRenderer) {
        luoPanRenderer = new LuoPanAndFlyingStarsSvgRenderer({ size: 800 });
    }

    const cadLayers = cadRenderer.renderLayers(currentGeometry, {
        selectedRoomId,
        selectedLandscapeId,
        selectedEdgeIndex
    });

    const luoPanScaleFactor = layerState.luoPanScale || 1.0;

    const luoPanOverlay = luoPanRenderer.renderOverlayLayer(
        currentFlyingStars,
        cadLayers.houseCenterX,
        cadLayers.houseCenterY,
        cadLayers.houseWidth,
        cadLayers.houseDepth,
        luoPanScaleFactor
    );

    const ninePalacesOverlay = luoPanRenderer.renderNinePalacesLayer(
        currentFlyingStars,
        cadLayers.houseCenterX,
        cadLayers.houseCenterY,
        cadLayers.houseWidth,
        cadLayers.houseDepth,
        currentFlyingStars ? currentFlyingStars.facingPalace : 9,
        luoPanScaleFactor
    );

    const fullSvg = renderUnifiedSvg(
        cadLayers,
        luoPanOverlay,
        ninePalacesOverlay,
        layerState,
        { sourceImageUrl: uploadedSourceImageSrc }
    );

    viewportController.setSvgContent(fullSvg);
}

/* 14. Render Flying Stars 3x3 Matrix */
function renderFlyingStarsMatrix(flyingStars, batTrach) {
    const grid = document.getElementById('flyingStarsMatrix') || document.getElementById('flyingStarsGrid');
    if (!grid || !flyingStars) return;

    const order = [4, 9, 2, 3, 5, 7, 8, 1, 6]; // Standard Lo Shu order for reference table

    grid.innerHTML = order.map(pId => {
        const pal = flyingStars.palaces[pId];
        if (!pal) return '';

        const isFacingPal = (pId === flyingStars.facingPalace);
        const isSittingPal = (pId === flyingStars.sittingPalace);

        let palTag = PALACE_NAMES[pId];
        if (isFacingPal) palTag = `[HƯỚNG] (${PALACE_SHORT[pId]})`;
        else if (isSittingPal) palTag = `[TỌA] (${PALACE_SHORT[pId]})`;

        return `
            <div class="palace-cell">
                <div class="palace-name-badge">${palTag}</div>
                <div class="palace-stars-trio">
                    <span class="star-badge-son" title="Sơn Tinh (Tọa)">${pal.sonStar}</span>
                    <span class="star-badge-van" title="Vận Tinh">${pal.vanStar}</span>
                    <span class="star-badge-huong" title="Hướng Tinh">${pal.huongStar}</span>
                </div>
            </div>
        `;
    }).join('');
}

/* 15. Render Standalone Detailed Architectural & Spatial Report */
function renderDetailedReport(spatialResult) {
    const container = document.getElementById('detailedReportContainer') || document.getElementById('palaceReportsContainer');
    if (!container || !spatialResult) return;

    if (!interpretationEngine) {
        interpretationEngine = new FengShuiInterpretationEngine();
    }

    interpretationEngine.renderReports(spatialResult, container, interpretationEngine.currentFilter || 'all');
}
