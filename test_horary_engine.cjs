/**
 * test_horary_engine.cjs - Bộ Kiểm Thử Tự Động Toàn Diện Phân Hệ Horary Astrology
 * Chạy bằng: node test_horary_engine.cjs
 */

const assert = require('assert');

async function runTests() {
    console.log('================================================================');
    console.log('BẮT ĐẦU CHẠY BỘ KIỂM THỬ HORARY ASTROLOGY & THIÊN VĂN CỔ ĐIỂN');
    console.log('================================================================\n');

    let passed = 0;
    let failed = 0;

    function test(name, fn) {
        try {
            fn();
            console.log(`  PASS: ${name}`);
            passed++;
        } catch (err) {
            console.error(`  FAIL: ${name}`);
            console.error(`        ${err.message}`);
            failed++;
        }
    }

    async function testAsync(name, fn) {
        try {
            await fn();
            console.log(`  PASS: ${name}`);
            passed++;
        } catch (err) {
            console.error(`  FAIL: ${name}`);
            console.error(`        ${err.message}`);
            failed++;
        }
    }

    // Nạp các module ES động
    const { getZodiacPosition, getTraditionalRuler, ZODIAC_SIGNS } = await import('./horary/js/traditionalRulers.js');
    const { calculateEssentialDignities, getWhyDignityExplanation, DOMICILES, EXALTATIONS } = await import('./horary/js/traditionalDignities.js');
    const { getAngularDistance, calculateAspectBetween, scanAllAspects } = await import('./horary/js/aspectEngine.js');
    const { evaluateSingleReception, analyzePairReception } = await import('./horary/js/receptionEngine.js');
    const { generateHouseExplanation, HOUSE_DEFINITIONS } = await import('./horary/js/houseMeanings.js');
    const { calculateHoraryChart, getHouseOfLongitude } = await import('./horary/js/ephemerisEngine.js');

    // =========================================================================
    // NHÓM 1: CHUYỂN ĐỔI KINH ĐỘ & CUNG HOÀNG ĐẠO (ZODIAC CONVERSION)
    // =========================================================================
    console.log('--- NHÓM 1: CHUYỂN ĐỔI KINH ĐỘ & CUNG HOÀNG ĐẠO ---');

    test('0° chuyển đổi thành 0° Bạch Dương (Aries)', () => {
        const p = getZodiacPosition(0);
        assert.strictEqual(p.signId, 'aries');
        assert.strictEqual(p.degree, 0);
        assert.strictEqual(p.minute, 0);
    });

    test('29.999° vẫn nằm trong Bạch Dương (29°59′)', () => {
        const p = getZodiacPosition(29.999);
        assert.strictEqual(p.signId, 'aries');
        assert.strictEqual(p.degree, 29);
        assert.strictEqual(p.minute, 59);
    });

    test('30.0° bước sang 0° Kim Ngưu (Taurus)', () => {
        const p = getZodiacPosition(30.0);
        assert.strictEqual(p.signId, 'taurus');
        assert.strictEqual(p.degree, 0);
        assert.strictEqual(p.minute, 0);
    });

    test('359.5° chuyển đổi thành 29°30′ Song Ngư (Pisces)', () => {
        const p = getZodiacPosition(359.5);
        assert.strictEqual(p.signId, 'pisces');
        assert.strictEqual(p.degree, 29);
        assert.strictEqual(p.minute, 30);
    });

    test('Kinh độ âm hoặc > 360° tự động chuẩn hóa [0, 360)', () => {
        const p1 = getZodiacPosition(-10); // 350°
        assert.strictEqual(p1.signId, 'pisces');
        assert.strictEqual(p1.degree, 20);

        const p2 = getZodiacPosition(390); // 30°
        assert.strictEqual(p2.signId, 'taurus');
        assert.strictEqual(p2.degree, 0);
    });

    // =========================================================================
    // NHÓM 2: CHỦ TINH TRUYỀN THỐNG (7 HÀNH TINH, KHÔNG DÙNG NGOẠI VIỄN TINH)
    // =========================================================================
    console.log('\n--- NHÓM 2: CHỦ TINH TRUYỀN THỐNG (LILLY CA) ---');

    test('Bảo Bình (Aquarius) do Thổ Tinh (Saturn) cai quản, không phải Uranus', () => {
        const r = getTraditionalRuler('aquarius');
        assert.strictEqual(r.rulerId, 'saturn');
        assert.strictEqual(r.rulerNameVi, 'Thổ Tinh');
    });

    test('Bọ Cạp (Scorpio) do Hỏa Tinh (Mars) cai quản, không phải Pluto', () => {
        const r = getTraditionalRuler('scorpio');
        assert.strictEqual(r.rulerId, 'mars');
        assert.strictEqual(r.rulerNameVi, 'Hỏa Tinh');
    });

    test('Song Ngư (Pisces) do Mộc Tinh (Jupiter) cai quản, không phải Neptune', () => {
        const r = getTraditionalRuler('pisces');
        assert.strictEqual(r.rulerId, 'jupiter');
        assert.strictEqual(r.rulerNameVi, 'Mộc Tinh');
    });

    test('Đủ 12 cung hoàng đạo chỉ phân chia cho 7 hành tinh cổ điển', () => {
        const allowedRulers = ['sun', 'moon', 'mercury', 'venus', 'mars', 'jupiter', 'saturn'];
        for (const s of ZODIAC_SIGNS) {
            assert.ok(allowedRulers.includes(s.rulerId), `Cung ${s.id} dùng chủ tinh không hợp lệ: ${s.rulerId}`);
        }
    });

    // =========================================================================
    // NHÓM 3: XỬ LÝ GÓC QUA ĐIỂM 0° BẠCH DƯƠNG (ANGULAR WRAP)
    // =========================================================================
    console.log('\n--- NHÓM 3: TÍNH KHOẢNG CÁCH GÓC & WRAP 0° BẠCH DƯƠNG ---');

    test('Khoảng cách giữa 359° và 1° phải bằng 2°, KHÔNG ĐƯỢC bằng 358°', () => {
        const dist = getAngularDistance(359, 1);
        assert.strictEqual(dist, 2);
    });

    test('Khoảng cách giữa 10° và 350° phải bằng 20°', () => {
        const dist = getAngularDistance(10, 350);
        assert.strictEqual(dist, 20);
    });

    test('Khoảng cách đối diện 0° và 180° bằng 180°', () => {
        const dist = getAngularDistance(0, 180);
        assert.strictEqual(dist, 180);
    });

    // =========================================================================
    // NHÓM 4: ĐỘNG HỌC ASPECT (APPLYING VS SEPARATING VIA d(error)/dt)
    // =========================================================================
    console.log('\n--- NHÓM 4: THUẬT TOÁN ASPECT ĐỘNG (APPLYING / SEPARATING) ---');

    test('Ca 1: Hai hành tinh cùng thuận hành, hành tinh nhanh đuổi kịp hành tinh chậm -> APPLYING', () => {
        // Mặt Trăng ở 115° (tốc độ +13°/ngày) tiến tới tam hợp với Hỏa Tinh ở 120° (tốc độ +0.5°/ngày)
        // Hiện tại cách nhau 5° (Target 0°? Không, nếu lonA=115, lonB=120 thì dist=5°, target là Conjunction 0° error=5, dt sau: 115+0.065=115.065, 120+0.0025=120.0025, dist=4.9375 -> error giảm -> APPLYING)
        const moon = { id: 'moon', nameVi: 'Mặt Trăng', longitude: 115, speedLongitude: 13.0 };
        const mars = { id: 'mars', nameVi: 'Hỏa Tinh', longitude: 120, speedLongitude: 0.5 };
        const asp = calculateAspectBetween(moon, mars);
        assert.ok(asp, 'Phải tìm thấy aspect conjunction');
        assert.strictEqual(asp.state, 'APPLYING');
    });

    test('Ca 2: Hành tinh A vượt qua hành tinh B, khoảng cách đang giãn ra -> SEPARATING', () => {
        // Mặt Trăng ở 123° (tốc độ +13°/ngày), Hỏa Tinh ở 120° (tốc độ +0.5°/ngày)
        // Hiện tại cách nhau 3°, sau dt Mặt Trăng chạy xa hơn -> SEPARATING
        const moon = { id: 'moon', nameVi: 'Mặt Trăng', longitude: 123, speedLongitude: 13.0 };
        const mars = { id: 'mars', nameVi: 'Hỏa Tinh', longitude: 120, speedLongitude: 0.5 };
        const asp = calculateAspectBetween(moon, mars);
        assert.ok(asp);
        assert.strictEqual(asp.state, 'SEPARATING');
    });

    test('Ca 3: Hành tinh A nghịch hành lùi về phía hành tinh B -> APPLYING', () => {
        // Thổ Tinh nghịch hành ở 93° (tốc độ -0.08°/ngày) lùi về vuông góc 90° với Mặt Trời ở 0°
        // Hiện tại cách Mặt Trời 93° (error tới Square 90° là 3°)
        // Sau dt Thổ Tinh lùi về 92.999° -> error giảm -> APPLYING
        const saturn = { id: 'saturn', nameVi: 'Thổ Tinh', longitude: 93, speedLongitude: -0.08 };
        const sun = { id: 'sun', nameVi: 'Mặt Trời', longitude: 0, speedLongitude: 0.98 };
        // Chú ý: Mặt Trời chạy tiến (+0.98), Thổ Tinh chạy lùi (-0.08)
        // lonSaturn - lonSun: 93 - 0 = 93°. Sau dt: (93 - 0.08*dt) - (0 + 0.98*dt) = 93 - 1.06*dt -> khoảng cách đang giảm về 90° -> APPLYING!
        const asp = calculateAspectBetween(saturn, sun);
        assert.ok(asp);
        assert.strictEqual(asp.aspectId, 'square');
        assert.strictEqual(asp.state, 'APPLYING');
    });

    test('Ca 4: Aspect xuyên qua biên 0° Bạch Dương vẫn tính đúng APPLYING', () => {
        // Mặt Trăng ở 358° (tốc độ +13°/ngày) đuổi theo Sao Kim ở 2° (tốc độ +1°/ngày)
        // Conjunction 0°: hiện tại cách nhau 4°. Sau dt: khoảng cách giảm -> APPLYING
        const moon = { id: 'moon', nameVi: 'Mặt Trăng', longitude: 358, speedLongitude: 13.0 };
        const venus = { id: 'venus', nameVi: 'Kim Tinh', longitude: 2, speedLongitude: 1.0 };
        const asp = calculateAspectBetween(moon, venus);
        assert.ok(asp);
        assert.strictEqual(asp.aspectId, 'conjunction');
        assert.strictEqual(asp.state, 'APPLYING');
    });

    // =========================================================================
    // NHÓM 5: BẢNG PHẨM GIÁ BẢN CHẤT (WILLIAM LILLY CA p.104)
    // =========================================================================
    console.log('\n--- NHÓM 5: PHẨM GIÁ BẢN CHẤT (ESSENTIAL DIGNITIES) ---');

    test('Hỏa Tinh (Mars) tại Ma Kết (Capricorn) -> Tôn quý (Exaltation)', () => {
        const dig = calculateEssentialDignities('mars', 280, true); // 10° Ma Kết
        assert.strictEqual(dig.isExaltation, true);
        assert.strictEqual(dig.isFall, false);
        assert.ok(dig.score > 0);
    });

    test('Hỏa Tinh (Mars) tại Cự Giải (Cancer) -> Rơi đài / Tổn thương (Fall)', () => {
        const dig = calculateEssentialDignities('mars', 100, true); // 10° Cự Giải
        assert.strictEqual(dig.isFall, true);
        assert.strictEqual(dig.isExaltation, false);
        assert.ok(dig.score < 0);
    });

    test('Mặt Trăng (Moon) tại Cự Giải (Cancer) -> Bản vị (Domicile)', () => {
        const dig = calculateEssentialDignities('moon', 105, true); // 15° Cự Giải
        assert.strictEqual(dig.isDomicile, true);
        assert.strictEqual(dig.isDetriment, false);
    });

    test('Mặt Trăng (Moon) tại Ma Kết (Capricorn) -> Hãm / Suy cung (Detriment)', () => {
        const dig = calculateEssentialDignities('moon', 285, true); // 15° Ma Kết
        assert.strictEqual(dig.isDetriment, true);
        assert.strictEqual(dig.isDomicile, false);
    });

    test('Thổ Tinh (Saturn) tại Thiên Bình (Libra) -> Tôn quý (Exaltation)', () => {
        const dig = calculateEssentialDignities('saturn', 200, true); // 20° Thiên Bình
        assert.strictEqual(dig.isExaltation, true);
        assert.strictEqual(dig.isFall, false);
    });

    test('Thổ Tinh (Saturn) tại Bạch Dương (Aries) -> Rơi đài / Tổn thương (Fall)', () => {
        const dig = calculateEssentialDignities('saturn', 15, true); // 15° Bạch Dương
        assert.strictEqual(dig.isFall, true);
        assert.strictEqual(dig.isExaltation, false);
    });

    // =========================================================================
    // NHÓM 6: TIẾP NHẬN HAI CHIỀU & TIẾP NHẬN TƯƠNG HỖ (RECEPTIONS)
    // =========================================================================
    console.log('\n--- NHÓM 6: TIẾP NHẬN HAI CHIỀU & TIẾP NHẬN TƯƠNG HỖ ---');

    test('Hỏa Tinh tiếp nhận Mặt Trăng bằng Tôn quý khi Mặt Trăng ở Ma Kết', () => {
        // Hỏa Tinh được tôn quý ở Ma Kết (Capricorn)
        // Khi Mặt Trăng ở Ma Kết (280°), Hỏa Tinh tiếp nhận Mặt Trăng bằng Exaltation
        const rec = evaluateSingleReception('mars', 'moon', 280, true);
        assert.ok(rec);
        const hasEx = rec.receptionTypes.some(r => r.type === 'exaltation');
        assert.strictEqual(hasEx, true);
    });

    test('Phát hiện chính xác Tiếp nhận tương hỗ (Mutual Reception)', () => {
        // Mặt Trời ở Cự Giải (Cancer - nhà của Moon)
        // Mặt Trăng ở Sư Tử (Leo - nhà của Sun)
        const sun = { id: 'sun', longitude: 105 }; // Cancer
        const moon = { id: 'moon', longitude: 135 }; // Leo
        const pair = analyzePairReception(sun, moon, true);
        assert.strictEqual(pair.hasMutual, true);
        assert.ok(pair.mutualDescription.includes('TIẾP NHẬN LẪN NHAU'));
    });

    // =========================================================================
    // NHÓM 7: HỆ THỐNG NHÀ REGIOMONTANUS & LÕI THIÊN VĂN THỰC TẾ
    // =========================================================================
    console.log('\n--- NHÓM 7: LÕI THIÊN VĂN & HỆ NHÀ REGIOMONTANUS ---');

    await testAsync('Tính toán lá số với Swiss Ephemeris WASM và hệ nhà Regiomontanus', async () => {
        const chart = await calculateHoraryChart({
            year: 2026, month: 9, day: 20,
            hour: 15, minute: 30, second: 0,
            latitude: 21.0285, longitude: 105.8542,
            utcOffset: 7, locationName: 'Hà Nội'
        });

        assert.ok(chart.houses, 'Phải có dữ liệu hệ nhà');
        assert.strictEqual(chart.houses.cusps.length, 12, 'Phải có đủ 12 đỉnh nhà');
        assert.ok(chart.houses.ascendant >= 0 && chart.houses.ascendant < 360, 'ASC hợp lệ');
        assert.ok(chart.houses.midheaven >= 0 && chart.houses.midheaven < 360, 'MC hợp lệ');

        // Kiểm tra đối xứng trục
        const ascOpp = (chart.houses.ascendant + 180) % 360;
        const dscDiff = Math.abs(chart.houses.descendant - ascOpp);
        assert.ok(dscDiff < 0.001 || Math.abs(dscDiff - 360) < 0.001, 'DSC phải đối diện ASC 180°');

        const mcOpp = (chart.houses.midheaven + 180) % 360;
        const icDiff = Math.abs(chart.houses.imumCoeli - mcOpp);
        assert.ok(icDiff < 0.001 || Math.abs(icDiff - 360) < 0.001, 'IC phải đối diện MC 180°');

        // Kiểm tra 7 hành tinh
        assert.strictEqual(chart.planets.length >= 7, true, 'Phải có ít nhất 7 hành tinh');
        for (const p of chart.planets) {
            assert.ok(p.longitude >= 0 && p.longitude < 360, `Kinh độ ${p.id} hợp lệ`);
            assert.ok(p.houseNumber >= 1 && p.houseNumber <= 12, `Nhà của ${p.id} từ 1 đến 12`);
            assert.ok(['DIRECT', 'RETROGRADE', 'STATIONARY'].includes(p.motion), `Chuyển động ${p.id} hợp lệ`);
        }
    });

    console.log('\n================================================================');
    console.log(`KẾT QUẢ KIỂM THỬ: ${passed}/${passed + failed} TESTS ĐẠT (${((passed / (passed + failed)) * 100).toFixed(0)}% SUCCESS)`);
    console.log('================================================================\n');

    if (failed > 0) {
        process.exit(1);
    }
}

runTests().catch(err => {
    console.error('Lỗi khi chạy bộ kiểm thử:', err);
    process.exit(1);
});
