// ============================================================
// Comprehensive Automated Test Suite for CAD & Feng Shui Engine v3.1
// Tác giả: Dịch Sư Nguyễn Huy Hoàng
// ============================================================

import {
    MOUNTAINS_24,
    SIXTY_DRAGONS,
    polarToCartesian,
    generateCompassPaths,
    getMountainDetail,
    bspSpacePartition,
    areaM2,
    centerOfRect,
    overlaps,
    inside,
    CompassSvgRenderer,
    generateParametricFloorplan,
    ArchitecturalCADRenderer,
    calculateFengShuiSpatial,
    renderNinePalacesOverlaySvg,
    calculateFlyingStars,
    calculateGua,
    getOrientedPalaceGrid,
    getAnnualStar,
    validatePalace
} from '../../phong-thuy/js/phong_thuy_bundle.js';

export function runTests() {
    console.log('------------------------------------------------------------');
    console.log('CHẠY BỘ KIỂM THỬ TỰ ĐỘNG: PARAMETRIC CAD & FENG SHUI ENGINE v3.1');
    console.log('------------------------------------------------------------');
    let passed = 0;
    let failed = 0;

    function assert(condition, message) {
        if (condition) {
            console.log(`[PASS] ${message}`);
            passed++;
        } else {
            console.error(`[FAIL] ${message}`);
            failed++;
        }
    }

    // 1. Kiểm thử Data Layer (24 Sơn & 60 Long Thấu Địa)
    console.log('\n--- 1. Kiểm thử Lớp Dữ Liệu Tĩnh (Data Layer) ---');
    assert(MOUNTAINS_24.length === 24, `Đủ 24 Sơn Hướng (nhận: ${MOUNTAINS_24.length})`);
    
    // Kiểm tra tổng độ 24 Sơn = 360 độ, không hở, không đè
    let totalMountainSpan = 0;
    MOUNTAINS_24.forEach(m => {
        let span = m.endDeg - m.startDeg;
        if (span < 0) span += 360;
        totalMountainSpan += span;
    });
    assert(Math.abs(totalMountainSpan - 360) < 0.001, `Tổng độ 24 Sơn = 360° (nhận: ${totalMountainSpan}°)`);

    assert(SIXTY_DRAGONS.length === 60, `Đủ 60 Long Thấu Địa (nhận: ${SIXTY_DRAGONS.length})`);
    let totalDragonSpan = 0;
    SIXTY_DRAGONS.forEach(d => {
        let span = d.endDeg - d.startDeg;
        if (span < 0) span += 360;
        totalDragonSpan += span;
    });
    assert(Math.abs(totalDragonSpan - 360) < 0.001, `Tổng độ 60 Long = 360° (nhận: ${totalDragonSpan}°)`);
    assert(SIXTY_DRAGONS[0].name === 'Giáp Tý', `Long đầu tiên = Giáp Tý (nhận: ${SIXTY_DRAGONS[0].name})`);
    assert(SIXTY_DRAGONS[59].name === 'Quý Hợi', `Long cuối cùng = Quý Hợi (nhận: ${SIXTY_DRAGONS[59].name})`);

    // 2. Kiểm thử Toán Học Tọa Độ Cực (Polar Math)
    console.log('\n--- 2. Kiểm thử Toán Học Tọa Độ Cực & La Bàn ---');
    const pNorth = polarToCartesian(250, 250, 100, 0); // 0° = North (trên cùng)
    assert(Math.abs(pNorth.x - 250) < 0.01 && Math.abs(pNorth.y - 150) < 0.01, `0° Bắc: X=250, Y=150 (nhận: ${pNorth.x}, ${pNorth.y})`);

    const pEast = polarToCartesian(250, 250, 100, 90); // 90° = East (phải)
    assert(Math.abs(pEast.x - 350) < 0.01 && Math.abs(pEast.y - 250) < 0.01, `90° Đông: X=350, Y=250 (nhận: ${pEast.x}, ${pEast.y})`);

    const pSouth = polarToCartesian(250, 250, 100, 180); // 180° = South (dưới)
    assert(Math.abs(pSouth.x - 250) < 0.01 && Math.abs(pSouth.y - 350) < 0.01, `180° Nam: X=250, Y=350 (nhận: ${pSouth.x}, ${pSouth.y})`);

    // 3. Kiểm thử Phân Loại Chính Hướng (Hạ Quái) vs Kiêm Hướng (Thế Quái)
    console.log('\n--- 3. Kiểm thử Chính Hướng vs Kiêm Hướng ---');
    const ngoExact = getMountainDetail(180);
    assert(ngoExact.mountain.name === 'Ngọ' && !ngoExact.isKiemHuong, `180° = Chính Hướng Ngọ (Hạ Quái)`);

    const ngoKiem = getMountainDetail(183.5);
    assert(ngoKiem.mountain.name === 'Ngọ' && ngoKiem.isKiemHuong && ngoKiem.deviationDeg === 3.5, `183.5° = Kiêm Hướng Ngọ lệch 3.5° (Thế Quái)`);

    // 4. Kiểm thử La Bàn SVG Renderer (GPU Frozen Dial)
    console.log('\n--- 4. Kiểm thử La Bàn SVG Đóng Băng (GPU Acceleration) ---');
    const compassRenderer = new CompassSvgRenderer({ size: 500 });
    const dialSvg = compassRenderer.renderStaticDialSvg();
    assert(dialSvg.includes('<path d="M') && dialSvg.includes('stroke="#d97706"'), 'Sinh thẻ path gộp vạch chia thành công');
    assert(dialSvg.includes('Giáp Tý') && dialSvg.includes('KHẢM') && dialSvg.includes('Ngọ'), 'Chứa đầy đủ tên 24 Sơn, 60 Long, 8 Quái');

    // 5. Kiểm thử Binary Space Partitioning (BSP) & Hành Lang Giao Thông
    console.log('\n--- 5. Kiểm thử Thuật Toán BSP & Hành Lang Giao Thông ---');
    const bspResult = bspSpacePartition(5000, 16000);
    assert(bspResult.rooms.length >= 4, `BSP sinh đủ phòng (nhận: ${bspResult.rooms.length})`);
    assert(bspResult.corridors.length > 0, `BSP bảo toàn trục hành lang giao thông không bị cắt đứt`);

    // 6. Kiểm thử Bản Vẽ 1 — Architectural CAD SVG Renderer (Nét Mảnh & preserveAspectRatio)
    console.log('\n--- 6. Kiểm thử Bản Vẽ 1 (Kiến Trúc CAD 2D Khóa Viewport) ---');
    const wideGeometry = generateParametricFloorplan({
        widthM: 14.5,
        lengthM: 9.9,
        floors: 1,
        facingDegree: 180,
        roomCounts: { bedrooms: 3, toilets: 2, hasAltar: '2' }
    });

    const cadRenderer = new ArchitecturalCADRenderer({ theme: 'white' });
    const archSvg = cadRenderer.renderSvg(wideGeometry, { facingDegree: 180 });

    assert(archSvg.startsWith('<svg') && archSvg.endsWith('</svg>'), 'Xuất ra chuỗi thẻ SVG hợp lệ');
    assert(archSvg.includes('preserveAspectRatio="xMidYMid meet"'), 'Có thuộc tính preserveAspectRatio khóa viewport');
    assert(archSvg.includes('stroke-width="35"'), 'Nét tường bao ngoài chuẩn CAD mảnh 35px');

    // 7. Kiểm thử Bản Vẽ 2 — Cửu Cung Spatial Overlay & Không Undefined
    console.log('\n--- 7. Kiểm thử Bản Vẽ 2 & Dữ Liệu Báo Cáo Không Undefined ---');
    const spatialResult = calculateFengShuiSpatial(wideGeometry, { facingDegree: 226, buildYear: 2025 });
    const overlaySvg = renderNinePalacesOverlaySvg(spatialResult, true);

    assert(Object.keys(spatialResult.spatialPalaces).length === 9, 'Đủ 9 Cung Lạc Thư không gian');
    assert(overlaySvg.includes('layer-fengshui-overlay'), 'Có layer phủ Cửu Cung');

    // Kiểm tra từng cung trong báo cáo không có bất kỳ trường nào undefined
    let allPalacesValid = true;
    Object.values(spatialResult.spatialPalaces).forEach(p => {
        if (!validatePalace(p)) {
            allPalacesValid = false;
        }
    });
    assert(allPalacesValid, 'Toàn bộ 9 Cung có đủ 9 trường dữ liệu chuẩn (KHÔNG CÒN LỖI UNDEFINED)');

    // 8. Kiểm thử Xoay Cửu Cung Theo Hướng Nhà
    console.log('\n--- 8. Kiểm thử Xoay Cửu Cung Theo Hướng Nhà ---');
    const gridKhon = getOrientedPalaceGrid(2);
    assert(gridKhon[1] === 2, `Cung Hướng (Khôn - 2) nằm ở giữa hàng trên (nhận: ${gridKhon[1]})`);
    assert(gridKhon[7] === 8, `Cung Tọa (Cấn - 8) nằm ở giữa hàng dưới (nhận: ${gridKhon[7]})`);

    // 9. Kiểm thử 4 Sao Thời Gian & Bát Trạch
    console.log('\n--- 9. Kiểm thử 4 Sao Thời Gian & Bát Trạch ---');
    const nienStar2026 = getAnnualStar(2026, 8, 19);
    assert(nienStar2026 === 1, `Năm 2026 = Nhất Bạch ① Niên Tinh (nhận: ${nienStar2026})`);

    const gua1990 = calculateGua(1990, 'nam');
    assert(gua1990.guaNum === 1 && gua1990.groupName === 'Đông Tứ Mệnh', `Nam 1990 = Khảm 1 Đông Tứ Mệnh (nhận: ${gua1990.guaName})`);

    console.log('\n============================================================');
    console.log(`KẾT QUẢ KIỂM THỬ: ${passed} PASS, ${failed} FAIL`);
    console.log('============================================================\n');

    return { passed, failed };
}

if (typeof process !== 'undefined' && process.argv && process.argv[1]?.endsWith('test_engine.js')) {
    runTests();
}
