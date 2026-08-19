// ============================================================
// Comprehensive Automated Test Suite for CAD & Feng Shui Engine
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
    checkLoBan
} from '../../phong-thuy/js/phong_thuy_bundle.js';

export function runTests() {
    console.log('------------------------------------------------------------');
    console.log('CHẠY BỘ KIỂM THỬ TỰ ĐỘNG: PARAMETRIC CAD & FENG SHUI ENGINE');
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

    // 4. Kiểm thử Bản Vẽ 1 — Architectural CAD SVG Renderer
    console.log('\n--- 4. Kiểm thử Bản Vẽ 1 (Kiến Trúc CAD 2D) ---');
    const cadRenderer = new ArchitecturalCADRenderer({ theme: 'white' });
    const archSvg = cadRenderer.renderSvg(wideGeometry, { facingDegree: 180 });

    assert(archSvg.startsWith('<svg') && archSvg.endsWith('</svg>'), 'Xuất ra chuỗi thẻ SVG hợp lệ');
    assert(archSvg.includes('viewBox="-1400 -1400 17300 12900"'), 'viewBox tỷ lệ thật theo mm chuẩn xác');
    assert(archSvg.includes('layer-grid-axes'), 'Có layer hệ trục định vị');
    assert(archSvg.includes('layer-dimensions'), 'Có layer 3 lớp kích thước mm');
    assert(archSvg.includes('layer-furniture'), 'Có layer nội thất vector kiến trúc');
    assert(archSvg.includes('layer-columns'), 'Có layer cột bê tông cốt thép');
    assert(archSvg.includes('NGUYỄN HUY HOÀNG'), 'Có khung tên tiêu đề bản vẽ tác giả');

    // 5. Kiểm thử Bản Vẽ 2 — Feng Shui Spatial Overlay Engine (Ảnh 3)
    console.log('\n--- 5. Kiểm thử Bản Vẽ 2 (Phong Thủy Cửu Cung Phủ Lên Bản Vẽ 1) ---');
    const spatialResult = calculateFengShuiSpatial(wideGeometry, { facingDegree: 180, buildYear: 2025 });
    const overlaySvg = renderNinePalacesOverlaySvg(spatialResult, true);

    assert(Object.keys(spatialResult.spatialPalaces).length === 9, 'Đủ 9 Cung Lạc Thư không gian');
    assert(overlaySvg.includes('layer-fengshui-overlay'), 'Có layer phủ Cửu Cung');
    assert(overlaySvg.includes('ĐN') && overlaySvg.includes('TB') && overlaySvg.includes('B'), 'Có nhãn 8 phương vị bao quanh như ảnh 3');

    // 6. Kiểm thử Single Source of Truth (Tính toàn vẹn hình học giữa 2 bản vẽ)
    console.log('\n--- 6. Kiểm thử Single Source of Truth (Bản vẽ 1 & Bản vẽ 2) ---');
    assert(spatialResult.geometry.widthMm === wideGeometry.widthMm, 'Cả 2 bản vẽ dùng chung 100% widthMm');
    assert(spatialResult.geometry.depthMm === wideGeometry.depthMm, 'Cả 2 bản vẽ dùng chung 100% depthMm');
    assert(spatialResult.geometry.rooms === wideGeometry.rooms, 'Cả 2 bản vẽ trỏ vào cùng một mảng Room hình học');

    // 7. Kiểm thử Huyền Không & Bát Trạch & Lỗ Ban
    console.log('\n--- 7. Kiểm thử Huyền Không, Bát Trạch & Lỗ Ban ---');
    const fsChart = calculateFlyingStars({ facingDegree: 180, buildYear: 2025 });
    assert(fsChart.van === 9, `Năm 2025 thuộc Vận 9 (nhận: ${fsChart.van})`);
    assert(fsChart.facingMountain === 'Ngọ', `Góc 180° = Hướng Ngọ (nhận: ${fsChart.facingMountain})`);
    assert(fsChart.sittingMountain === 'Tý', `Tọa Tý (nhận: ${fsChart.sittingMountain})`);

    const gua = calculateGua(1990, 'nam');
    assert(gua.guaNumber === 9 && gua.trachGroup === 'Đông Tứ Mệnh', `Nam 1990 = Ly 9 Đông Tứ Mệnh (nhận: ${gua.guaName} - ${gua.trachGroup})`);

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
