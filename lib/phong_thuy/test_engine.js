// ============================================================
// Comprehensive Automated Test Suite for CAD & Feng Shui Engine v2.0
// Tác giả: Dịch Sư Nguyễn Huy Hoàng
// ============================================================

import {
    areaM2,
    centerOfRect,
    overlaps,
    inside,
    rotatePoint,
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
    getHourlyStar
} from '../../phong-thuy/js/phong_thuy_bundle.js';

export function runTests() {
    console.log('------------------------------------------------------------');
    console.log('CHẠY BỘ KIỂM THỬ TỰ ĐỘNG: PARAMETRIC CAD & FENG SHUI ENGINE v2.0');
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

    // 1. Kiểm thử Hình học cơ bản
    console.log('\n--- 1. Kiểm thử Hình học cơ bản (Millimeter) ---');
    const r1 = { x: 0, y: 0, width: 5000, height: 16000 };
    assert(areaM2(r1) === 80, `Diện tích 5000x16000mm = 80 m² (nhận: ${areaM2(r1)})`);

    const rWide = { x: 0, y: 0, width: 14500, height: 9900 };
    assert(areaM2(rWide) === 143.55, `Diện tích 14500x9900mm = 143.55 m² (nhận: ${areaM2(rWide)})`);

    const c1 = centerOfRect(r1);
    assert(c1.x === 2500 && c1.y === 8000, `Tâm hình chữ nhật = (2500, 8000) (nhận: ${c1.x}, ${c1.y})`);

    const r2 = { x: 1000, y: 1000, width: 3000, height: 4000 };
    assert(inside(r2, r1, 0), 'Hình r2 nằm trọn vẹn bên trong r1');

    const r3 = { x: 4500, y: 1000, width: 2000, height: 3000 };
    assert(overlaps(r1, r3), 'Hình r1 và r3 giao nhau (overlap)');

    // 2. Kiểm thử Parametric Floorplan Layout Engine: Nhà Ống (5x16m)
    console.log('\n--- 2. Kiểm thử Layout Nhà Ống (5x16m, 2 Tầng) ---');
    const tubeGeometry = generateParametricFloorplan({
        widthM: 5.0,
        lengthM: 16.0,
        floors: 2,
        facingDegree: 180,
        roomCounts: { bedrooms: 3, toilets: 2, hasAltar: '1', hasGarage: '0', hasSkylight: '1' }
    });

    assert(tubeGeometry.widthMm === 5000, 'Chiều rộng = 5000 mm');
    assert(tubeGeometry.depthMm === 16000, 'Chiều dài = 16000 mm');
    assert(tubeGeometry.totalFloors === 2, 'Số tầng = 2');
    assert(tubeGeometry.plansByFloor.length === 2, 'Sinh đủ 2 mặt bằng tầng');
    assert(tubeGeometry.rooms.length >= 3, `Tầng trệt có đủ phòng chức năng (số phòng: ${tubeGeometry.rooms.length})`);
    assert(tubeGeometry.columns.length >= 8, `Có đủ cột bê tông chịu lực (số cột: ${tubeGeometry.columns.length})`);
    assert(tubeGeometry.axesX.length >= 3, 'Có trục định vị dọc');
    assert(tubeGeometry.axesY.length >= 3, 'Có trục định vị ngang');

    // 3. Kiểm thử Parametric Floorplan Layout Engine: Nhà Ngang Biệt Thự Vườn (14.5x9.9m như mẫu ảnh 2)
    console.log('\n--- 3. Kiểm thử Layout Nhà Ngang Biệt Thự Vườn (14.5x9.9m, Ảnh 2) ---');
    const wideGeometry = generateParametricFloorplan({
        widthM: 14.5,
        lengthM: 9.9,
        floors: 1,
        facingDegree: 180,
        roomCounts: { bedrooms: 3, toilets: 2, hasAltar: '2' }
    });

    assert(wideGeometry.widthMm === 14500, 'Chiều rộng = 14500 mm');
    assert(wideGeometry.depthMm === 9900, 'Chiều dài = 9900 mm');
    assert(wideGeometry.entrancePorch !== null, 'Có sảnh đón bậc tam cấp phía trước');
    assert(wideGeometry.rooms.some(r => r.name.includes('THỜ')), 'Có phòng thờ gia tiên bố trí trang trọng');
    assert(wideGeometry.rooms.some(r => r.name.includes('KHÁCH')), 'Có phòng khách ở trung tâm');
    assert(wideGeometry.rooms.some(r => r.name.includes('BẾP')), 'Có bếp & phòng ăn');

    // 4. Kiểm thử Bản Vẽ 1 — Architectural CAD SVG Renderer (Nét CAD thanh mảnh 2/10)
    console.log('\n--- 4. Kiểm thử Bản Vẽ 1 (Kiến Trúc CAD 2D Nét Mảnh) ---');
    const cadRenderer = new ArchitecturalCADRenderer({ theme: 'white' });
    const archSvg = cadRenderer.renderSvg(wideGeometry, { facingDegree: 180 });

    assert(archSvg.startsWith('<svg') && archSvg.endsWith('</svg>'), 'Xuất ra chuỗi thẻ SVG hợp lệ');
    assert(archSvg.includes('layer-grid-axes'), 'Có layer hệ trục định vị');
    assert(archSvg.includes('layer-dimensions'), 'Có layer 3 lớp kích thước mm');
    assert(archSvg.includes('layer-furniture'), 'Có layer nội thất vector kiến trúc');
    assert(archSvg.includes('layer-columns'), 'Có layer cột bê tông cốt thép');
    assert(archSvg.includes('stroke-width="35"'), 'Nét tường bao ngoài giảm xuống chuẩn CAD mảnh (35px thay vì 220px)');
    assert(archSvg.includes('NGUYỄN HUY HOÀNG'), 'Có khung tên tiêu đề bản vẽ tác giả');

    // 5. Kiểm thử Xoay Tinh Bàn Theo Hướng Nhà (Hướng Luôn Ở Trên, Tọa Ở Dưới)
    console.log('\n--- 5. Kiểm thử Logic Xoay Tinh Bàn (Hướng ở trên, Tọa ở dưới) ---');
    // Trường hợp Hướng Khôn (Tây Nam - Cung 2), Tọa Cấn (Đông Bắc - Cung 8) như mẫu hkpt.vercel.app
    const gridKhon = getOrientedPalaceGrid(2);
    assert(gridKhon[1] === 2, `Cung Hướng (Khôn - 2) nằm ở giữa hàng trên (nhận: ${gridKhon[1]})`);
    assert(gridKhon[7] === 8, `Cung Tọa (Cấn - 8) nằm ở giữa hàng dưới (nhận: ${gridKhon[7]})`);
    assert(gridKhon[4] === 5, `Trung Cung (5) luôn ở chính giữa (nhận: ${gridKhon[4]})`);

    // Trường hợp Hướng Nam (Ly - 9), Tọa Bắc (Khảm - 1)
    const gridLy = getOrientedPalaceGrid(9);
    assert(gridLy[1] === 9, `Cung Hướng (Ly - 9) nằm ở giữa hàng trên (nhận: ${gridLy[1]})`);
    assert(gridLy[7] === 1, `Cung Tọa (Khảm - 1) nằm ở giữa hàng dưới (nhận: ${gridLy[7]})`);

    // 6. Kiểm thử 4 Sao Thời Gian: Niên, Nguyệt, Nhật, Thời Tinh
    console.log('\n--- 6. Kiểm thử 4 Sao Thời Gian (Niên, Nguyệt, Nhật, Thời Tinh) ---');
    const nienStar2026 = getAnnualStar(2026, 8, 19);
    assert(nienStar2026 === 1, `Năm 2026 = Nhất Bạch ① Niên Tinh (nhận: ${nienStar2026})`);

    const nguyetStar = getMonthlyStar(2026, 8, 19);
    assert(nguyetStar >= 1 && nguyetStar <= 9, `Nguyệt tinh hợp lệ 1-9 (nhận: ${nguyetStar})`);

    const nhatStar = getDailyStar(2026, 8, 19);
    assert(nhatStar >= 1 && nhatStar <= 9, `Nhật tinh hợp lệ 1-9 (nhận: ${nhatStar})`);

    const thoiStar = getHourlyStar(2026, 8, 19, 7);
    assert(thoiStar >= 1 && thoiStar <= 9, `Thời tinh hợp lệ 1-9 (nhận: ${thoiStar})`);

    // 7. Kiểm thử Bản Vẽ 2 — Feng Shui Spatial Overlay Engine
    console.log('\n--- 7. Kiểm thử Bản Vẽ 2 (Phong Thủy Cửu Cung Phủ Lên Bản Vẽ 1) ---');
    const spatialResult = calculateFengShuiSpatial(wideGeometry, { facingDegree: 226, buildYear: 2025 });
    const overlaySvg = renderNinePalacesOverlaySvg(spatialResult, true);

    assert(Object.keys(spatialResult.spatialPalaces).length === 9, 'Đủ 9 Cung Lạc Thư không gian');
    assert(overlaySvg.includes('layer-fengshui-overlay'), 'Có layer phủ Cửu Cung');
    assert(overlaySvg.includes('arrow-facing-top'), 'Có mũi tên HƯỚNG chỉ lên đỉnh trên bản vẽ');
    assert(overlaySvg.includes('arrow-sitting-bottom'), 'Có mũi tên TỌA chỉ xuống đáy trên bản vẽ');

    // 8. Kiểm thử Bát Trạch & Lỗ Ban
    console.log('\n--- 8. Kiểm thử Bát Trạch & Lỗ Ban ---');
    const gua = calculateGua(1990, 'nam');
    assert(gua.guaNumber === 8 && gua.trachGroup === 'Tây Tứ Mệnh', `Nam 1990 = Cấn 8 Tây Tứ Mệnh (nhận: ${gua.guaName} - ${gua.trachGroup})`);
    const gua1994 = calculateGua(1994, 'nam');
    assert(gua1994.guaNumber === 6 && gua1994.trachGroup === 'Tây Tứ Mệnh', `Nam 1994 = Càn 6 Tây Tứ Mệnh (nhận: ${gua1994.guaName} - ${gua1994.trachGroup})`);

    const loban = checkLoBan(3200, '522');
    assert(loban.cung !== undefined, `Thước Lỗ Ban 3200mm = Cung ${loban.cung}`);

    console.log('\n============================================================');
    console.log(`KẾT QUẢ KIỂM THỬ: ${passed} PASS, ${failed} FAIL`);
    console.log('============================================================\n');

    return { passed, failed };
}

if (typeof process !== 'undefined' && process.argv && process.argv[1]?.endsWith('test_engine.js')) {
    runTests();
}
