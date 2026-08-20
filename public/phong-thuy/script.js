// ============================================================
// Phong Thủy & Kiến Trúc Controller Script v7.0
// Tác giả: Dịch Sư Nguyễn Huy Hoàng
// Hỗ trợ:
// 1. Kéo-thả không giới hạn số lượng phòng vào 9 cung
// 2. Khung viền Polygon tự động khớp kích thước thực W x D
// 3. Chỉnh sửa đa giác viền nhà (Vertex Dragging) cho nhà chữ L, xéo, méo, dị dạng
// 4. Interactive CAD Studio: Kéo di chuyển, co giãn 8 điểm neo, nút mini Xác Nhận/Làm Lại
// 5. Hai Tab Bản Vẽ Độc Lập Chuẩn 100%: Scan2CAD (Ảnh 3) & La Kinh Cửu Cung (Ảnh 2)
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
let currentDrawingTab = 'arch'; // 'arch' | 'fengshui'
let currentThemeMode = 'white'; // 'white' | 'dark'
let currentMatrixOrientMode = 'house'; // 'house' | 'loshu'
let currentDndOrientMode = 'house'; // 'house' | 'loshu'
let isLandscapeMode = false;

let currentGeometry = null;
let currentSpatialResult = null;
let currentFlyingStars = null;
let currentBatTrach = null;

let cadRenderer = null;
let luoPanRenderer = null;
let viewportController = null;

let selectedRoomId = null;
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
    initToolbar();
    initActionButtons();
    initCadInteractiveEngine();

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
            handleCalculate(false);
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

/* 6. Drag and Drop 9-Palaces (KHÔNG GIỚI HẠN SỐ LƯỢNG PHÒNG TRONG MỖI CUNG) */
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
                const type = chip.getAttribute('data-room-id');
                const baseName = chip.getAttribute('data-room-name');
                e.dataTransfer.setData('application/json', JSON.stringify({ type, baseName }));
            });

            chip.addEventListener('click', () => {
                const facingPalace = currentFlyingStars ? currentFlyingStars.facingPalace : 9;
                const type = chip.getAttribute('data-room-id');
                const baseName = chip.getAttribute('data-room-name');
                addUnlimitedRoomToPalace(facingPalace, type, baseName);
            });
        });
    }

    dndPlacements[9] = [{ id: 'r_living_1', type: 'living_room', name: 'Phòng Khách 1' }];
    dndPlacements[1] = [{ id: 'r_kitchen_1', type: 'kitchen_dining', name: 'Bếp Nấu 1' }];
    dndPlacements[8] = [{ id: 'r_bed_1', type: 'bed_master', name: 'Phòng Ngủ 1' }];
    dndPlacements[2] = [{ id: 'r_wc_1', type: 'toilet', name: 'Vệ Sinh 1' }, { id: 'r_wc_2', type: 'toilet', name: 'Vệ Sinh 2' }];
}

function addUnlimitedRoomToPalace(palaceId, type, baseName) {
    roomCounters[type] = (roomCounters[type] || 0) + 1;
    const roomIndex = roomCounters[type];
    const uniqueId = `r_${type}_${Date.now()}_${roomIndex}`;
    const displayName = `${baseName} ${roomIndex}`;

    dndPlacements[palaceId].push({
        id: uniqueId,
        type: mapTypeToCadType(type),
        name: displayName
    });

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
        if (isFacing) badgeTitle = `⭐ HƯỚNG (${PALACE_SHORT[pId]})`;
        else if (isSitting) badgeTitle = `🔵 TỌA (${PALACE_SHORT[pId]})`;

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
            <div class="palace-drop-zone ${isFacing ? 'facing-zone' : (isSitting ? 'sitting-zone' : '')}" data-palace-id="${pId}" style="${cellBorder} padding: 6px; border-radius: 8px; min-height: 95px; display: flex; flex-direction: column; justify-content: space-between;">
                <div style="font-size: 0.74rem; font-weight: 800; color: ${isFacing ? '#f87171' : (isSitting ? '#38bdf8' : '#fbbf24')}; text-align: center; margin-bottom: 4px;">
                    ${badgeTitle} ${starsBadge}
                </div>
                <div class="dropped-rooms-container" style="flex: 1; display: flex; flex-direction: column; gap: 2px; max-height: 120px; overflow-y: auto;">
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
            const data = JSON.parse(dataStr);
            const pId = parseInt(zone.getAttribute('data-palace-id'), 10);
            addUnlimitedRoomToPalace(pId, data.type, data.baseName);
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

/* 8. Interactive CAD Manipulation Engine (Pointer Events, Move, Resize, Vertex Dragging) */
function initCadInteractiveEngine() {
    const stage = document.getElementById('svgStage');
    if (!stage) return;

    stage.addEventListener('pointerdown', (e) => {
        const miniActionBtn = e.target.closest('.btn-cad-mini-action');
        if (miniActionBtn) {
            handleMiniActionClick(miniActionBtn);
            return;
        }

        // 1. Kéo điểm neo đỉnh của Polygon (Vertex Handles)
        const vertexHandle = e.target.closest('.cad-vertex-handle');
        if (vertexHandle) {
            e.stopPropagation();
            const vIdx = parseInt(vertexHandle.getAttribute('data-vertex-idx'), 10);
            startCadVertexInteraction(vIdx, e.clientX, e.clientY);
            return;
        }

        // 2. Kéo điểm neo co giãn phòng (Resize Handles)
        const resizeHandle = e.target.closest('.cad-resize-handle');
        if (resizeHandle) {
            e.stopPropagation();
            const rId = resizeHandle.getAttribute('data-room-id');
            const hId = resizeHandle.getAttribute('data-handle');
            startCadPointerInteraction('resize', rId, hId, e.clientX, e.clientY);
            return;
        }

        // 3. Kéo di chuyển thân phòng (Room Move)
        const roomEl = e.target.closest('.cad-room-interactive');
        if (roomEl) {
            e.stopPropagation();
            const rId = roomEl.getAttribute('data-room-id');
            selectedRoomId = rId;
            cadRenderer.selectedRoomId = rId;
            startCadPointerInteraction('move', rId, null, e.clientX, e.clientY);
            renderActiveDrawing();
            return;
        }

        // Bấm ra ngoài khoảng trống -> Bỏ chọn phòng
        if (selectedRoomId) {
            selectedRoomId = null;
            cadRenderer.selectedRoomId = null;
            renderActiveDrawing();
        }
    });

    window.addEventListener('pointermove', (e) => {
        if (!pointerState.isInteracting || !currentGeometry) return;

        const svgEl = stage.querySelector('svg');
        const ctm = svgEl ? svgEl.getScreenCTM() : null;
        const scale = ctm ? ctm.a : 0.2;
        const dx = (e.clientX - pointerState.startClientX) / scale;
        const dy = (e.clientY - pointerState.startClientY) / scale;

        // Kéo đỉnh polygon
        if (pointerState.mode === 'vertex') {
            if (currentGeometry.footprintPoints && currentGeometry.footprintPoints[pointerState.targetVertexIdx]) {
                const pt = currentGeometry.footprintPoints[pointerState.targetVertexIdx];
                pt.x = Math.round(pointerState.origX + dx);
                pt.y = Math.round(pointerState.origY + dy);
                requestAnimationFrame(() => renderActiveDrawing());
            }
            return;
        }

        // Kéo hoặc co giãn phòng
        if (!currentGeometry.rooms) return;
        const room = currentGeometry.rooms.find(r => r.id === pointerState.targetRoomId);
        if (!room) return;

        if (pointerState.mode === 'move') {
            room.x = Math.round(Math.max(0, Math.min(currentGeometry.widthMm - room.w, pointerState.origX + dx)));
            room.y = Math.round(Math.max(0, Math.min(currentGeometry.depthMm - room.h, pointerState.origY + dy)));
        } else if (pointerState.mode === 'resize') {
            const h = pointerState.handle;
            const minSize = 1200;

            if (h.includes('e')) {
                room.w = Math.max(minSize, Math.round(pointerState.origW + dx));
            }
            if (h.includes('s')) {
                room.h = Math.max(minSize, Math.round(pointerState.origH + dy));
            }
            if (h.includes('w')) {
                const newW = Math.max(minSize, Math.round(pointerState.origW - dx));
                room.x = Math.round(pointerState.origX + (pointerState.origW - newW));
                room.w = newW;
            }
            if (h.includes('n')) {
                const newH = Math.max(minSize, Math.round(pointerState.origH - dy));
                room.y = Math.round(pointerState.origY + (pointerState.origH - newH));
                room.h = newH;
            }
        }

        requestAnimationFrame(() => renderActiveDrawing());
    });

    window.addEventListener('pointerup', () => {
        if (pointerState.isInteracting) {
            pointerState.isInteracting = false;
            pointerState.mode = null;
            pointerState.handle = null;
        }
    });
}

function startCadVertexInteraction(vertexIdx, clientX, clientY) {
    if (!currentGeometry || !currentGeometry.footprintPoints || !currentGeometry.footprintPoints[vertexIdx]) return;
    const pt = currentGeometry.footprintPoints[vertexIdx];
    pointerState.isInteracting = true;
    pointerState.mode = 'vertex';
    pointerState.targetVertexIdx = vertexIdx;
    pointerState.startClientX = clientX;
    pointerState.startClientY = clientY;
    pointerState.origX = pt.x;
    pointerState.origY = pt.y;
}

function startCadPointerInteraction(mode, roomId, handle, clientX, clientY) {
    if (!currentGeometry || !currentGeometry.rooms) return;
    const room = currentGeometry.rooms.find(r => r.id === roomId);
    if (!room) return;

    pointerState.isInteracting = true;
    pointerState.mode = mode;
    pointerState.handle = handle;
    pointerState.targetRoomId = roomId;
    pointerState.startClientX = clientX;
    pointerState.startClientY = clientY;
    pointerState.origX = room.x;
    pointerState.origY = room.y;
    pointerState.origW = room.w;
    pointerState.origH = room.h;
}

function handleMiniActionClick(btn) {
    const action = btn.getAttribute('data-action');
    const roomId = btn.getAttribute('data-room-id');
    if (!currentGeometry || !currentGeometry.rooms) return;

    const roomIndex = currentGeometry.rooms.findIndex(r => r.id === roomId);
    if (roomIndex === -1) return;
    const room = currentGeometry.rooms[roomIndex];

    if (action === 'confirm') {
        room.history = { x: room.x, y: room.y, w: room.w, h: room.h, rot: room.rot || 0 };
        selectedRoomId = null;
        cadRenderer.selectedRoomId = null;
        renderActiveDrawing();
    } else if (action === 'reset') {
        if (room.history) {
            room.x = room.history.x;
            room.y = room.history.y;
            room.w = room.history.w;
            room.h = room.history.h;
        }
        selectedRoomId = null;
        cadRenderer.selectedRoomId = null;
        renderActiveDrawing();
    } else if (action === 'rotate') {
        const temp = room.w;
        room.w = room.h;
        room.h = temp;
        renderActiveDrawing();
    } else if (action === 'delete') {
        currentGeometry.rooms.splice(roomIndex, 1);
        selectedRoomId = null;
        cadRenderer.selectedRoomId = null;
        renderActiveDrawing();
    }
}

/* 9. Toolbar Buttons & Matrix Controls */
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

/* 10. Form Actions & Input Listeners */
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

    if (shouldScroll && resultsSection) {
        resultsSection.scrollIntoView({ behavior: 'smooth' });
    }
}

/* 12. Render Floor Navigator */
function renderFloorNavigator(totalFloors) {
    const nav = document.getElementById('floorNavigator');
    if (!nav) return;

    let buttons = '';
    for (let f = 1; f <= totalFloors; f++) {
        const isActive = f === 1;
        const name = f === 1 ? 'TẦNG TRỆT' : `TẦNG ${f}`;
        buttons += `
            <button type="button" class="floor-btn ${isActive ? 'active' : ''}" data-floor="${f}">
                ${name}
            </button>
        `;
    }

    nav.innerHTML = buttons;
}

/* 13. Render Active Drawing (CAD Floorplan vs La Kinh 24 Sơn Cửu Cung) */
function renderActiveDrawing() {
    if (!currentGeometry || !viewportController) return;

    if (currentDrawingTab === 'arch') {
        const svgCode = cadRenderer.renderSvg(currentGeometry, {
            theme: currentThemeMode,
            facingDegree: currentFlyingStars ? currentFlyingStars.facingDegree : 180,
            selectedRoomId: selectedRoomId
        });
        viewportController.setSvgContent(svgCode);
    } else {
        if (!luoPanRenderer) {
            luoPanRenderer = new LuoPanAndFlyingStarsSvgRenderer({ size: 800 });
        }
        const svgCode = luoPanRenderer.renderSvg(currentFlyingStars, {
            theme: currentThemeMode
        });
        viewportController.setSvgContent(svgCode);
    }
}

/* 14. Render 9-Palace Xuan Kong Matrix Display */
function renderFlyingStarsMatrix(flyingStars, batTrach) {
    const matrixContainer = document.getElementById('flyingStarsMatrix');
    const metaVan = document.getElementById('metaVan');
    const metaToaHuong = document.getElementById('metaToaHuong');
    const metaGua = document.getElementById('metaGua');

    if (metaVan) metaVan.textContent = `Vận ${flyingStars.van} (${flyingStars.currentYear || 2026})`;
    if (metaToaHuong) metaToaHuong.textContent = `Tọa ${flyingStars.sittingMountain} Hướng ${flyingStars.facingMountain} (${flyingStars.chartType === 'chinh_huong' ? 'Hạ Quái' : 'Thế Quái'})`;
    if (metaGua && batTrach) {
        const gName = batTrach.guaName || 'Khảm (Thủy)';
        const gGroup = batTrach.groupName || 'Đông Tứ Mệnh';
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

/* 15. Render Detailed Report */
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
