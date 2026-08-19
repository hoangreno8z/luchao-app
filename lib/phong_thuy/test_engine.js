// ============================================================
// Comprehensive Automated Test Suite for CAD & Feng Shui Engine v3.0
// Tác giả: Dịch Sư Nguyễn Huy Hoàng
// ============================================================

import {
    areaM2,
    centerOfRect,
    overlaps,
    inside,
    polarToCartesian,
    getMountainDetail,
    generateCompassRingPaths,
    CompassSvgRenderer,
    generateParametricFloorplan,
    ArchitecturalCADRenderer,
    calculateFengShuiSpatial,
    renderNinePalacesOverlaySvg,
    calculateFlyingStars,
    calculateGua,
    checkLoBan,
    getOrientedPalaceGrid,
    getAnnualStar,
    getMonthlyStar,
    getDailyStar,
    getHourlyStar,
    MOUNTAINS_24,
    SIXTY_DRAGONS
} from '../../phong-thuy/js/phong_thuy_bundle.js';

export function runTests() {
    console.log('------------------------------------------------------------');
    console.log('CHẠY BỘ KIỂM THỬ TỰ ĐỘNG: PARAMETRIC CAD & FENG SHUI ENGINE v3.0');
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
    assert(SIXTY_DRAGONS.length === 60, `Đủ 60 Long Thấu Địa (nhận: ${SIXTY_DRAGONS.length})`);
    assert(SIXTY_DRAGONS[0].name === 'Giáp Tý', `Long đầu tiên = Giáp Tý (nhận: ${SIXTY_DRAGONS[0].name})`);
    assert(SIXTY_DRAGONS[59].name === 'Quý Hợi', `Long cuối cùng = Quý Hợi (nhận: ${SIXTY_DRAGONS[59].name})`);

    // 2. Kiểm thử Toán Học Tọa Độ Cực (Polar Math)
    console.log('\n--- 2. Kiểm thử Toán Học Tọa Độ Cực & La Bàn ---');
    const pNorth = polarToCartesian(250, 250, 100, 0); // 0° = North (trên cùng)
    assert(Math.abs(pNorth.x - 250) < 0.01 && Math.abs(pNorth.y - 150) < 0.01, `0° Bắc: X=250, Y=150 (nhận: ${pNorth.x.toFixed(1)}, ${pNorth.y.toFixed(1)})`);

    const pEast = polarToCartesian(250, 250, 100, 90); // 90° = East (phải)
    assert(Math.abs(pEast.x - 350) < 0.01 && Math.abs(pEast.y - 250) < 0.01, `90° Đông: X=350, Y=250 (nhận: ${pEast.x.toFixed(1)}, ${pEast.y.toFixed(1)})`);

    const pSouth = polarToCartesian(250, 250, 100, 180); // 180° = South (dưới)
    assert(Math.abs(pSouth.x - 250) < 0.01 && Math.abs(pSouth.y - 350) < 0.01, `180° Nam: X=250, Y=350 (nhận: ${pSouth.x.toFixed(1)}, ${pSouth.y.toFixed(1)})`);

    // 3. Kiểm thử Phân Loại Chính Hướng (Hạ Quái) vs Kiêm Hướng (Thế Quái)
    console.log('\n--- 3. Kiểm thử Chính Hướng vs Kiêm Hướng ---');
    const ngoExact = getMountainDetail(180);
    assert(ngoExact.mountain.name === 'Ngọ' && !ngoExact.isKiemHuong, `180° = Chính Hướng Ngọ (Hạ Quái)`);

    const ngoKiem = getMountainDetail(183.5);
    assert(ngoKiem.mountain.name === 'Ngọ' && ngoKiem.isKiemHuong && ngoKiem.deviation === 3.5, `183.5° = Kiêm Hướng Ngọ lệch 3.5° (Thế Quái)`);

    // 4. Kiểm thử La Bàn SVG Renderer (GPU Frozen Dial)
    console.log('\n--- 4. Kiểm thử La Bàn SVG Đóng Băng (GPU Acceleration) ---');
    const compassRenderer = new CompassSvgRenderer({ size: 500 });
    const dialSvg = compassRenderer.renderStaticDialSvg();
    assert(dialSvg.includes('<path d="M') && dialSvg.includes('stroke="#d97706"'), 'Sinh thẻ path gộp vạch chia thành công');
    assert(dialSvg.includes('Giáp Tý') && dialSvg.includes('KHẢM') && dialSvg.includes('Ngọ'), 'Chứa đầy đủ tên 24 Sơn, 60 Long, 8 Quái');

    // 5. Kiểm thử Bản Vẽ 1 — Architectural CAD SVG Renderer (Nét Mảnh & preserveAspectRatio)
    console.log('\n--- 5. Kiểm thử Bản Vẽ 1 (Kiến Trúc CAD 2D Khóa Viewport) ---');
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
    assert(archSvg.includes('stroke-width="35"'), 'Nét tường bao ngoài giảm xuống chuẩn CAD mảnh (35px thay vì 220px)');

    // 6. Kiểm thử Bản Vẽ 2 — Cửu Cung Spatial Overlay & Không Undefined
    console.log('\n--- 6. Kiểm thử Bản Vẽ 2 & Dữ Liệu Báo Cáo Không Undefined ---');
    const spatialResult = calculateFengShuiSpatial(wideGeometry, { facingDegree: 226, buildYear: 2025 });
    const overlaySvg = renderNinePalacesOverlaySvg(spatialResult, true);

    assert(Object.keys(spatialResult.spatialPalaces).length === 9, 'Đủ 9 Cung Lạc Thư không gian');
    assert(overlaySvg.includes('layer-fengshui-overlay'), 'Có layer phủ Cửu Cung');

    // Kiểm tra từng cung trong báo cáo không có bất kỳ trường nào undefined
    let hasUndefined = false;
    Object.values(spatialResult.spatialPalaces).forEach(p => {
        if (!p.palaceName || !p.grade || !p.analysis || !p.remedy || p.name === undefined || p.trigram === undefined) {
            hasUndefined = true;
        }
    });
    assert(!hasUndefined, 'Toàn bộ 9 Cung có đầy đủ palaceName, grade, analysis, remedy (KHÔNG CÒN LỖI UNDEFINED)');

    // 7. Kiểm thử Xoay Tinh Bàn (Hướng ở Trên, Tọa ở Dưới)
    console.log('\n--- 7. Kiểm thử Xoay Cửu Cung Theo Hướng Nhà ---');
    const gridKhon = getOrientedPalaceGrid(2);
    assert(gridKhon[1] === 2, `Cung Hướng (Khôn - 2) nằm ở giữa hàng trên (nhận: ${gridKhon[1]})`);
    assert(gridKhon[7] === 8, `Cung Tọa (Cấn - 8) nằm ở giữa hàng dưới (nhận: ${gridKhon[7]})`);

    // 8. Kiểm thử 4 Sao Thời Gian & Bát Trạch
    console.log('\n--- 8. Kiểm thử 4 Sao Thời Gian & Bát Trạch ---');
    const nienStar2026 = getAnnualStar(2026, 8, 19);
    assert(nienStar2026 === 1, `Năm 2026 = Nhất Bạch ① Niên Tinh (nhận: ${nienStar2026})`);

    const gua1990 = calculateGua(1990, 'nam');
    assert(gua1990.guaNumber === 8 && gua1990.trachGroup === 'Tây Tứ Mệnh', `Nam 1990 = Cấn 8 Tây Tứ Mệnh`);

    console.log('\n============================================================');
    console.log(`KẾT QUẢ KIỂM THỬ: ${passed} PASS, ${failed} FAIL`);
    console.log('============================================================\n');

    return { passed, failed };
}

if (typeof process !== 'undefined' && process.argv && process.argv[1]?.endsWith('test_engine.js')) {
    runTests();
}
