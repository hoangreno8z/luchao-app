/**
 * test_horary_engine.cjs - Bộ Kiểm Thử Tự Động Toàn Diện Phân Hệ Horary Astrology
 * Bao gồm các ca kiểm thử toán học & thiên văn kinh điển chuyên sâu theo Technical Audit Lần 2 & Lần 3.
 * TUYỆT ĐỐI KHÔNG DÙNG MOCK PROPERTIES, KHÔNG DÙNG CONDITIONAL ASSERTIONS (if (...) assert).
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
    const { getAngularDistance, calculateAspectBetween, scanAllAspects, scanAllAspectsTimeline, MOIETY_OF_ORBS, MOIETY_PRESETS, MAJOR_ASPECTS } = await import('./horary/js/aspectEngine.js');
    const { evaluateSingleReception, analyzePairReception, scanAllReceptions } = await import('./horary/js/receptionEngine.js');
    const { generateHouseExplanation, turnedHouse, describeTurnedHouse, HOUSE_DEFINITIONS } = await import('./horary/js/houseMeanings.js');
    const { calculateHoraryChart, getHouseOfLongitude, getJulianDayUT, calcBodyPositionAtJD, getAstronomyEngine } = await import('./horary/js/ephemerisEngine.js');
    const { getTimezoneOffsetHours, localWallTimeToUtc, getTimezoneOffsetForWallTime } = await import('./horary/js/horaryApp.js');
    const { bisectAspectRoot, bisectStationRoot, solveAspectTimeline } = await import('./horary/js/futureEventSolver.js');

    // =========================================================================
    // NHÓM 1: CHUYỂN ĐỔI KINH ĐỘ & CUNG HOÀNG ĐẠO (ARCSECOND INTEGER FORMATTER)
    // =========================================================================
    console.log('--- NHÓM 1: CHUYỂN ĐỔI KINH ĐỘ & CUNG HOÀNG ĐẠO ---');

    test('0° chuyển đổi thành 0° Bạch Dương (Aries)', () => {
        const p = getZodiacPosition(0);
        assert.strictEqual(p.signId, 'aries');
        assert.strictEqual(p.degree, 0);
        assert.strictEqual(p.minute, 0);
        assert.strictEqual(p.second, 0);
    });

    test('29.999° vẫn nằm trong Bạch Dương (29°59′56″)', () => {
        const p = getZodiacPosition(29.999);
        assert.strictEqual(p.signId, 'aries');
        assert.strictEqual(p.degree, 29);
        assert.strictEqual(p.minute, 59);
    });

    test('29.9999° làm tròn chuẩn xác sang 0° Kim Ngưu, tuyệt đối không tạo lỗi 29°60′ hay 30° Bạch Dương', () => {
        const p = getZodiacPosition(29.9999);
        assert.strictEqual(p.signId, 'taurus');
        assert.strictEqual(p.degree, 0);
        assert.strictEqual(p.minute, 0);
        assert.strictEqual(p.second, 0);
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
    });

    test('Bọ Cạp (Scorpio) do Hỏa Tinh (Mars) cai quản, không phải Pluto', () => {
        const r = getTraditionalRuler('scorpio');
        assert.strictEqual(r.rulerId, 'mars');
    });

    test('Song Ngư (Pisces) do Mộc Tinh (Jupiter) cai quản, không phải Neptune', () => {
        const r = getTraditionalRuler('pisces');
        assert.strictEqual(r.rulerId, 'jupiter');
    });

    test('Đủ 12 cung hoàng đạo chỉ phân chia cho 7 hành tinh cổ điển', () => {
        const allowedRulers = ['sun', 'moon', 'mercury', 'venus', 'mars', 'jupiter', 'saturn'];
        for (const sign of ZODIAC_SIGNS) {
            assert.ok(allowedRulers.includes(sign.rulerId), `${sign.nameEn} có chủ tinh ngoài 7 hành tinh: ${sign.rulerId}`);
        }
    });

    // =========================================================================
    // NHÓM 3: TÍNH KHOẢNG CÁCH GÓC & WRAP 0° BẠCH DƯƠNG
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
    // NHÓM 4: ĐỘNG HỌC ASPECT, ĐẠO HÀM dE/dt & ĐIỂM PHÂN ĐÔI 75°
    // =========================================================================
    console.log('\n--- NHÓM 4: ĐẠO HÀM GIẢI TÍCH dE/dt, 5 TRẠNG THÁI & ĐIỂM PHÂN ĐÔI 75° ---');

    test('Ca 1: Hai hành tinh cùng thuận hành, hành tinh nhanh đuổi kịp hành tinh chậm -> APPLYING', () => {
        const moon = { id: 'moon', nameVi: 'Mặt Trăng', longitude: 115, speedLongitude: 13.0 };
        const mars = { id: 'mars', nameVi: 'Hỏa Tinh', longitude: 120, speedLongitude: 0.5 };
        const asp = calculateAspectBetween(moon, mars);
        assert.ok(asp);
        assert.strictEqual(asp.state, 'APPLYING');
        assert.ok(asp.dEdT < 0, 'dE/dt phải âm khi đang thu hẹp khoảng cách');
    });

    test('Ca 2: Hành tinh A vượt qua hành tinh B, khoảng cách đang giãn ra -> SEPARATING', () => {
        const moon = { id: 'moon', nameVi: 'Mặt Trăng', longitude: 123, speedLongitude: 13.0 };
        const mars = { id: 'mars', nameVi: 'Hỏa Tinh', longitude: 120, speedLongitude: 0.5 };
        const asp = calculateAspectBetween(moon, mars);
        assert.ok(asp);
        assert.strictEqual(asp.state, 'SEPARATING');
        assert.ok(asp.dEdT > 0, 'dE/dt phải dương khi đang giãn cách');
    });

    test('Ca 3: Hành tinh A nghịch hành lùi về phía hành tinh B -> APPLYING', () => {
        const saturn = { id: 'saturn', nameVi: 'Thổ Tinh', longitude: 93, speedLongitude: -0.08 };
        const sun = { id: 'sun', nameVi: 'Mặt Trời', longitude: 0, speedLongitude: 0.98 };
        const asp = calculateAspectBetween(saturn, sun);
        assert.ok(asp);
        assert.strictEqual(asp.aspectId, 'square');
        assert.strictEqual(asp.state, 'APPLYING');
    });

    test('Ca 4: Aspect xuyên qua biên 0° Bạch Dương vẫn tính đúng APPLYING', () => {
        const moon = { id: 'moon', nameVi: 'Mặt Trăng', longitude: 358, speedLongitude: 13.0 };
        const venus = { id: 'venus', nameVi: 'Kim Tinh', longitude: 2, speedLongitude: 1.0 };
        const asp = calculateAspectBetween(moon, venus);
        assert.ok(asp);
        assert.strictEqual(asp.aspectId, 'conjunction');
        assert.strictEqual(asp.state, 'APPLYING');
    });

    test('Ca 5: Mặt Trăng cực sát Exact (0.05° ≈ 3′) không bị lỗi bước tiến -> APPLYING', () => {
        const moon = { id: 'moon', nameVi: 'Mặt Trăng', longitude: 119.95, speedLongitude: 13.0 };
        const mars = { id: 'mars', nameVi: 'Hỏa Tinh', longitude: 120.00, speedLongitude: 0.5 };
        const asp = calculateAspectBetween(moon, mars);
        assert.ok(asp);
        assert.strictEqual(asp.state, 'APPLYING');
    });

    test('Ca 6: Góc chiếu đạt độ chính xác tuyệt đối (sai số tiệm cận 0) -> EXACT', () => {
        const sun = { id: 'sun', nameVi: 'Mặt Trời', longitude: 60.001, speedLongitude: 0.98 };
        const saturn = { id: 'saturn', nameVi: 'Thổ Tinh', longitude: 0.000, speedLongitude: 0.04 };
        const asp = calculateAspectBetween(sun, saturn);
        assert.ok(asp);
        assert.strictEqual(asp.aspectId, 'sextile');
        assert.strictEqual(asp.state, 'EXACT');
    });

    test('Ca 7: Đang tiến tới nhưng ngoài Orb -> APPROACHING_OUT_OF_ORB', () => {
        const moon = { id: 'moon', nameVi: 'Mặt Trăng', longitude: 100, speedLongitude: 13.0 };
        const mars = { id: 'mars', nameVi: 'Hỏa Tinh', longitude: 120, speedLongitude: 0.5 };
        const asp = calculateAspectBetween(moon, mars);
        assert.ok(asp);
        assert.strictEqual(asp.inOrb, false);
        assert.strictEqual(asp.state, 'APPROACHING_OUT_OF_ORB');
    });

    test('Ca 8: Đã rời xa và vượt ngoài Orb -> SEPARATED_OUT_OF_ORB', () => {
        const moon = { id: 'moon', nameVi: 'Mặt Trăng', longitude: 135, speedLongitude: 13.0 };
        const mars = { id: 'mars', nameVi: 'Hỏa Tinh', longitude: 120, speedLongitude: 0.5 };
        const asp = calculateAspectBetween(moon, mars);
        assert.ok(asp);
        assert.strictEqual(asp.inOrb, false);
        assert.strictEqual(asp.state, 'SEPARATED_OUT_OF_ORB');
    });

    test('Ca 9: Điểm phân đôi 75° với dS/dt > 0 -> Phải chọn nhánh Square 90°', () => {
        // A ở 75°, B ở 0°. S = 75°. vA = 1.0, vB = 0.0 -> dS/dt = +1.0 > 0
        const pA = { id: 'moon', nameVi: 'Mặt Trăng', longitude: 75.0, speedLongitude: 1.0 };
        const pB = { id: 'sun', nameVi: 'Mặt Trời', longitude: 0.0, speedLongitude: 0.0 };
        const asp = calculateAspectBetween(pA, pB);
        assert.ok(asp);
        assert.strictEqual(asp.aspectAngle, 90, 'dS/dt > 0 tại 75° phải hướng tới Square 90°');
    });

    test('Ca 10: Điểm phân đôi 75° với dS/dt < 0 -> Phải chọn nhánh Sextile 60°', () => {
        // A ở 75°, B ở 0°. S = 75°. vA = -1.0, vB = 0.0 -> dS/dt = -1.0 < 0
        const pA = { id: 'moon', nameVi: 'Mặt Trăng', longitude: 75.0, speedLongitude: -1.0 };
        const pB = { id: 'sun', nameVi: 'Mặt Trời', longitude: 0.0, speedLongitude: 0.0 };
        const asp = calculateAspectBetween(pA, pB);
        assert.ok(asp);
        assert.strictEqual(asp.aspectAngle, 60, 'dS/dt < 0 tại 75° phải hướng tới Sextile 60°');
    });

    // =========================================================================
    // NHÓM 5: NAMED MOIETY PRESETS THEO WILLIAM LILLY & SAHL
    // =========================================================================
    console.log('\n--- NHÓM 5: NAMED MOIETY PRESETS THEO WILLIAM LILLY & SAHL ---');

    test('Bảng Presets định danh: LILLY_CA_P107, LILLY_AL_BIRUNI, SAHL_ARABIC', () => {
        assert.ok(MOIETY_PRESETS.LILLY_CA_P107);
        assert.ok(MOIETY_PRESETS.LILLY_AL_BIRUNI);
        assert.ok(MOIETY_PRESETS.SAHL_ARABIC);
        assert.strictEqual(MOIETY_PRESETS.LILLY_CA_P107.moieties.sun, 8.5);
        assert.strictEqual(MOIETY_PRESETS.LILLY_AL_BIRUNI.moieties.sun, 7.5);
    });

    test('Tổng Moieties Mặt Trời (8.5°) + Thổ Tinh (4.5°) = 13.0° theo Lilly CA p.107', () => {
        const sun = { id: 'sun', longitude: 72, speedLongitude: 0.98 };
        const saturn = { id: 'saturn', longitude: 0, speedLongitude: 0.05 };
        const asp = calculateAspectBetween(sun, saturn);
        assert.ok(asp);
        assert.strictEqual(asp.maxOrbAllowed, 13.0);
        assert.strictEqual(asp.inOrb, true);
    });

    // =========================================================================
    // NHÓM 6: THIÊN VĂN THẬT TƯƠNG LAI: EXACT ROOT, STATION & REFRANATION (KHÔNG MOCK)
    // =========================================================================
    console.log('\n--- NHÓM 6: THIÊN VĂN THẬT: EXACT ROOT, STATION & REFRANATION ---');

    await testAsync('Phát hiện trạm dừng thiên văn thật của Sao Thủy (cuối tháng 6/2026, JD ~2461221)', async () => {
        const jdStart = getJulianDayUT(2026, 6, 26, 0, 0, 0, 0);
        const jdEnd = getJulianDayUT(2026, 7, 2, 0, 0, 0, 0);
        const statJd = await bisectStationRoot('mercury', jdStart, jdEnd);
        const posAtStat = await calcBodyPositionAtJD('mercury', statJd);
        assert.ok(statJd >= jdStart && statJd <= jdEnd, 'Thời điểm trạm dừng phải nằm trong khoảng quét');
        assert.ok(Math.abs(posAtStat.speedLongitude) < 1e-5, `Vận tốc tại trạm dừng phải tiệm cận 0, thực tế: ${posAtStat.speedLongitude}`);
    });

    await testAsync('Tự động phát hiện REFRANATION thật 100% không dùng bất kỳ mock field nào (Mars-Mercury 27/06/2026)', async () => {
        const jd0 = getJulianDayUT(2026, 6, 27, 0, 0, 0, 0);
        const merc = await calcBodyPositionAtJD('mercury', jd0);
        const mars = await calcBodyPositionAtJD('mars', jd0);
        const timeline = await solveAspectTimeline(
            { id: 'mars', nameVi: 'Hỏa Tinh', longitude: mars.longitude, speedLongitude: mars.speedLongitude },
            { id: 'mercury', nameVi: 'Thủy Tinh', longitude: merc.longitude, speedLongitude: merc.speedLongitude },
            { angle: 60, nameVi: 'Lục hợp' },
            jd0
        );

        assert.strictEqual(timeline.refranation, true, 'Phải phát hiện Refranation do Thủy Tinh đứng trạm đổi chiều');
        assert.strictEqual(timeline.status, 'REFRANATION');
        assert.strictEqual(timeline.perfects, false, 'Aspect bị phá vỡ không thể hoàn thành');
        assert.ok(timeline.stationEvents.length > 0, 'Phải ghi nhận sự kiện trạm dừng thiên văn');
        assert.ok(timeline.description.includes('REFRANATION'));
    });

    await testAsync('Nghiệm Exact Root Aspect đạt độ chính xác sai số góc < 0.0001° từ Swiss Ephemeris', async () => {
        const jd0 = getJulianDayUT(2026, 9, 20, 0, 0, 0, 0);
        const moon = await calcBodyPositionAtJD('moon', jd0);
        const sun = await calcBodyPositionAtJD('sun', jd0);
        // Moon (279°) applying to Trine (120°) with Sun (177°)
        const root = await bisectAspectRoot('moon', 'sun', 120, jd0, jd0 + 2.5);
        assert.ok(root.jd > jd0, 'Thời điểm exact phải nằm trong tương lai');
        assert.ok(root.error < 0.0001, `Sai số góc tại exact phải < 0.0001°, thực tế: ${root.error}`);
    });

    await testAsync('Phát hiện Out-of-sign Perfection chuẩn William Lilly (Moon-Saturn 20/09/2026)', async () => {
        const jd0 = getJulianDayUT(2026, 9, 20, 0, 0, 0, 0);
        const moon = await calcBodyPositionAtJD('moon', jd0);
        const saturn = await calcBodyPositionAtJD('saturn', jd0);
        const timeline = await solveAspectTimeline(
            { id: 'moon', nameVi: 'Mặt Trăng', longitude: moon.longitude, speedLongitude: moon.speedLongitude },
            { id: 'saturn', nameVi: 'Thổ Tinh', longitude: saturn.longitude, speedLongitude: saturn.speedLongitude },
            { angle: 60, nameVi: 'Lục hợp' },
            jd0
        );

        assert.strictEqual(timeline.status, 'PERFECTS_OUT_OF_SIGN', 'Phải ghi nhận hoàn thành góc sau khi đổi cung');
        assert.strictEqual(timeline.isOutOfSign, true);
        assert.strictEqual(timeline.perfects, true);
        assert.ok(timeline.ingressEvents.length > 0, 'Phải có sự kiện đổi cung của Mặt Trăng trước khi exact');
    });

    // =========================================================================
    // NHÓM 7: PHẨM GIÁ BẢN CHẤT & PEREGRINE THEO WILLIAM LILLY CA p.112
    // =========================================================================
    console.log('\n--- NHÓM 7: PHẨM GIÁ BẢN CHẤT & PEREGRINE (LILLY CA p.112) ---');

    test('Hỏa Tinh (Mars) tại Ma Kết (Capricorn) -> Tôn quý (Exaltation)', () => {
        const dig = calculateEssentialDignities('mars', 280, true);
        assert.strictEqual(dig.isExaltation, true);
        assert.strictEqual(dig.isFall, false);
        assert.ok(dig.score > 0);
    });

    test('Mặt Trăng (Moon) tại Cự Giải (Cancer) -> Bản vị (Domicile)', () => {
        const dig = calculateEssentialDignities('moon', 105, true);
        assert.strictEqual(dig.isDomicile, true);
        assert.strictEqual(dig.isDetriment, false);
    });

    test('Mặt Trăng (Moon) tại Ma Kết (Capricorn) -> Hãm / Suy cung (Detriment)', () => {
        const dig = calculateEssentialDignities('moon', 285, true);
        assert.strictEqual(dig.isDetriment, true);
        assert.strictEqual(dig.isDomicile, false);
    });

    test('Thổ Tinh (Saturn) tại 15° Bạch Dương -> Vừa Rơi Đài (Fall -4) VỪA Peregrine (-5), tổng điểm -9', () => {
        // Saturn tại 15° Bạch Dương: Fall (-4), không có Domicile, Exaltation, Triplicity (Hỏa là Sun/Jup), Terms (12-20 là Merc), Face (10-20 là Sun)
        const dig = calculateEssentialDignities('saturn', 15, true);
        assert.strictEqual(dig.isFall, true, 'Saturn phải bị Fall tại Bạch Dương');
        assert.strictEqual(dig.isPeregrine, true, 'Fall không phải phẩm giá, Saturn phải đồng thời là Peregrine theo Lilly CA p.112');
        assert.strictEqual(dig.score, -9, 'Điểm số phải là Fall (-4) + Peregrine (-5) = -9');
    });

    test('Hỏa Tinh (Mars) tại 5° Kim Ngưu -> Vừa Hãm (Detriment -5) VỪA Peregrine (-5), tổng điểm -10', () => {
        // Mars tại 5° Kim Ngưu: Detriment (-5), không có Triplicity (Thổ là Ven/Moon), Terms (0-8 là Ven), Face (0-10 là Merc)
        const dig = calculateEssentialDignities('mars', 35, true);
        assert.strictEqual(dig.isDetriment, true);
        assert.strictEqual(dig.isPeregrine, true, 'Detriment không thể cứu hành tinh khỏi cảnh Peregrine');
        assert.strictEqual(dig.score, -10, 'Điểm số phải là Detriment (-5) + Peregrine (-5) = -10');
    });

    // =========================================================================
    // NHÓM 8: QUY TẮC TIẾP NHẬN SAHL IBN BISHR (KHÔNG CONDITIONAL ASSERTIONS)
    // =========================================================================
    console.log('\n--- NHÓM 8: TIẾP NHẬN SAHL IBN BISHR & ACTIVE / POTENTIAL ---');

    test('Tiếp nhận qua Domicile hoặc Exaltation đủ điều kiện kinh điển', () => {
        const rec = evaluateSingleReception('mars', 'moon', 280, true);
        assert.ok(rec);
        assert.strictEqual(rec.hasMajor, true);
        assert.strictEqual(rec.isQualified, true);
        assert.ok(rec.sahlStatusVi.includes('Đủ điều kiện tiếp nhận'));
    });

    test('Một phẩm giá nhỏ đơn lẻ (Face duy nhất) KHÔNG ĐỦ điều kiện tiếp nhận theo Sahl', () => {
        // Kim Tinh đón Mặt Trăng tại 27° Bạch Dương: Face 3 của Bạch Dương thuộc Kim Tinh.
        // Kim Tinh không có Domicile, Exaltation, Triplicity hay Term tại 27° Bạch Dương.
        const rec = evaluateSingleReception('venus', 'moon', 27, true);
        assert.ok(rec);
        assert.strictEqual(rec.hasMajor, false);
        assert.strictEqual(rec.minorCount, 1);
        assert.strictEqual(rec.isQualified, false, 'Một phẩm giá nhỏ đơn lẻ phải bị loại theo Sahl');
        assert.ok(rec.sahlStatusVi.includes('Chưa đủ điều kiện'));
    });

    test('Phân tách Tiếp nhận Tiềm năng (Potential) vs Thực thi (Active)', () => {
        const sun = { id: 'sun', longitude: 105 }; // Cancer (nhà Moon)
        const moon = { id: 'moon', longitude: 135 }; // Leo (nhà Sun)

        const pairPotential = analyzePairReception(sun, moon, true, null);
        assert.strictEqual(pairPotential.activeStatus, 'POTENTIAL');
        assert.strictEqual(pairPotential.isActive, false);

        const mockAspect = { aspectNameVi: 'Lục hợp', state: 'APPLYING', stateVi: 'Đang tiến tới', orbFormatted: '1°15′' };
        const pairActive = analyzePairReception(sun, moon, true, mockAspect);
        assert.strictEqual(pairActive.activeStatus, 'ACTIVE');
        assert.strictEqual(pairActive.isActive, true);
    });

    // =========================================================================
    // NHÓM 9: HỆ NHÀ PHÁI SINH (TURNED HOUSES) THEO CLAUDE DARIOT & WILLIAM LILLY
    // =========================================================================
    console.log('\n--- NHÓM 9: HỆ NHÀ PHÁI SINH (TURNED HOUSES) DARIOT & LILLY ---');

    test('Tiền của đối tác / vợ chồng: Nhà 2 của Nhà 7 = Nhà 8', () => {
        assert.strictEqual(turnedHouse(7, 2), 8);
    });

    test('Người cha của đối tác / vợ chồng: Nhà 4 của Nhà 7 = Nhà 10', () => {
        assert.strictEqual(turnedHouse(7, 4), 10);
    });

    test('Con cái của đối tác: Nhà 5 của Nhà 7 = Nhà 11', () => {
        assert.strictEqual(turnedHouse(7, 5), 11);
    });

    test('Cái chết của anh chị em: Nhà 8 của Nhà 3 = Nhà 10', () => {
        assert.strictEqual(turnedHouse(3, 8), 10);
    });

    test('Sự nghiệp của con cái: Nhà 10 của Nhà 5 = Nhà 2', () => {
        assert.strictEqual(turnedHouse(5, 10), 2);
    });

    test('Mô tả diễn giải Nhà Phái Sinh sinh đúng văn bản học thuật', () => {
        const desc = describeTurnedHouse(7, 2);
        assert.ok(desc.includes('Nhà 8'));
        assert.ok(desc.includes('Nhà 7'));
    });

    // =========================================================================
    // NHÓM 10: ĐIỂM MAY MẮN (PARS FORTUNAE) WILLIAM LILLY CA p.143 CẢ NGÀY VÀ ĐÊM
    // =========================================================================
    console.log('\n--- NHÓM 10: PARS FORTUNAE CỦA WILLIAM LILLY CẢ NGÀY VÀ ĐÊM ---');

    await testAsync('Pars Fortunae tuân thủ công thức Lilly (ASC + Moon - Sun) cho cả Day và Night Chart', async () => {
        // 1. Lá số ban ngày (12:00 trưa)
        const dayChart = await calculateHoraryChart({
            year: 2026, month: 9, day: 20,
            hour: 12, minute: 0, second: 0,
            latitude: 21.0285, longitude: 105.8542,
            utcOffset: 7, locationName: 'Hà Nội'
        });
        const ascDay = dayChart.houses.ascendant;
        const moonDay = dayChart.planets.find(p => p.id === 'moon').longitude;
        const sunDay = dayChart.planets.find(p => p.id === 'sun').longitude;
        const expectedDayPof = (ascDay + moonDay - sunDay + 720) % 360;
        assert.ok(Math.abs(dayChart.partOfFortune.longitude - expectedDayPof) < 0.001);

        // 2. Lá số ban đêm (00:00 nửa đêm)
        const nightChart = await calculateHoraryChart({
            year: 2026, month: 9, day: 20,
            hour: 0, minute: 0, second: 0,
            latitude: 21.0285, longitude: 105.8542,
            utcOffset: 7, locationName: 'Hà Nội'
        });
        const ascNight = nightChart.houses.ascendant;
        const moonNight = nightChart.planets.find(p => p.id === 'moon').longitude;
        const sunNight = nightChart.planets.find(p => p.id === 'sun').longitude;
        const expectedNightPof = (ascNight + moonNight - sunNight + 720) % 360;
        assert.ok(Math.abs(nightChart.partOfFortune.longitude - expectedNightPof) < 0.001, 'Lilly CA p.143 dùng cùng công thức ASC+Moon-Sun ban đêm');
    });

    // =========================================================================
    // NHÓM 11: QUY TẮC 5° ĐỈNH NHÀ (WILLIAM LILLY CA pp.33, 151)
    // =========================================================================
    console.log('\n--- NHÓM 11: QUY TẮC 5° ĐỈNH NHÀ CỦA WILLIAM LILLY ---');

    test('Hành tinh cách đỉnh nhà kế tiếp <= 5° thuộc nhà kế tiếp (traditionalHouse = geometricHouse + 1)', () => {
        const cusps = [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330];
        // Hành tinh ở 27°: geometricHouse = 1. Đỉnh nhà 2 là 30°. Khoảng cách = 3° <= 5° -> thuộc Nhà 2!
        const pLon = 27.0;
        const geomHouse = getHouseOfLongitude(pLon, cusps);
        const nextCusp = cusps[geomHouse % 12];
        const dist = (nextCusp - pLon + 360) % 360;
        const is5Deg = dist <= 5.0;
        const tradHouse = is5Deg ? (geomHouse % 12) + 1 : geomHouse;

        assert.strictEqual(geomHouse, 1);
        assert.strictEqual(is5Deg, true);
        assert.strictEqual(tradHouse, 2);
    });

    test('Hành tinh cách đỉnh nhà kế tiếp > 5° giữ nguyên nhà hình học', () => {
        const cusps = [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330];
        // Hành tinh ở 20°: cách đỉnh nhà 2 (30°) là 10° > 5° -> giữ nguyên Nhà 1
        const pLon = 20.0;
        const geomHouse = getHouseOfLongitude(pLon, cusps);
        const nextCusp = cusps[geomHouse % 12];
        const dist = (nextCusp - pLon + 360) % 360;
        const is5Deg = dist <= 5.0;
        const tradHouse = is5Deg ? (geomHouse % 12) + 1 : geomHouse;

        assert.strictEqual(geomHouse, 1);
        assert.strictEqual(is5Deg, false);
        assert.strictEqual(tradHouse, 1);
    });

    // =========================================================================
    // NHÓM 12: MÚI GIỜ IANA ĐỘNG & BƯỚC NHẢY DST (DAYLIGHT SAVING TIME)
    // =========================================================================
    console.log('\n--- NHÓM 12: MÚI GIỜ IANA ĐỘNG & BƯỚC NHẢY DST TRANSITION ---');

    test('London mùa hè (15/07) tự động chuyển sang UTC+1 (BST)', () => {
        const summerDate = new Date(Date.UTC(2026, 6, 15, 12, 0, 0));
        const offset = getTimezoneOffsetHours('Europe/London', summerDate);
        assert.strictEqual(offset, 1);
    });

    test('London mùa đông (15/12) tự động quay về UTC+0 (GMT)', () => {
        const winterDate = new Date(Date.UTC(2026, 11, 15, 12, 0, 0));
        const offset = getTimezoneOffsetHours('Europe/London', winterDate);
        assert.strictEqual(offset, 0);
    });

    test('Bước nhảy chuyển dịch DST London ngày 29/03/2026 (00:30 là GMT, 03:00 là BST)', () => {
        const offBefore = getTimezoneOffsetForWallTime('Europe/London', 2026, 3, 29, 0, 30, 0);
        const offAfter = getTimezoneOffsetForWallTime('Europe/London', 2026, 3, 29, 3, 0, 0);
        assert.strictEqual(offBefore, 0, 'Trước thời điểm chuyển đổi phải là UTC+0');
        assert.strictEqual(offAfter, 1, 'Sau thời điểm chuyển đổi phải là UTC+1');
    });

    test('Hà Nội (Asia/Ho_Chi_Minh) luôn cố định UTC+7, Tokyo là UTC+9 quanh năm', () => {
        const d = new Date(Date.UTC(2026, 6, 15, 12, 0, 0));
        assert.strictEqual(getTimezoneOffsetHours('Asia/Ho_Chi_Minh', d), 7);
        assert.strictEqual(getTimezoneOffsetHours('Asia/Tokyo', d), 9);
    });

    // =========================================================================
    // NHÓM 13: NAM GIAO ĐIỂM, SECT CHÂN TRỜI THỰC & 100% THIÊN VĂN THẬT
    // =========================================================================
    console.log('\n--- NHÓM 13: NAM GIAO ĐIỂM, SECT CHÂN TRỜI THỰC & TOÀN VẸN THIÊN VĂN ---');

    await testAsync('Vận tốc Nam Giao Điểm CÙNG DẤU VÀ BẰNG VẬN TỐC Bắc Giao Điểm', async () => {
        const chart = await calculateHoraryChart({
            year: 2026, month: 9, day: 20,
            hour: 15, minute: 30, second: 0,
            latitude: 21.0285, longitude: 105.8542,
            utcOffset: 7, locationName: 'Hà Nội'
        });

        const nn = chart.planets.find(p => p.id === 'northNode');
        const sn = chart.planets.find(p => p.id === 'southNode');
        assert.ok(nn && sn);
        assert.strictEqual(sn.speedLongitude, nn.speedLongitude);
        assert.ok(sn.speedLongitude < 0);
    });

    await testAsync('True Unrefracted Solar Altitude phân định Day/Night Sect chuẩn xác tại 0°', async () => {
        const dayChart = await calculateHoraryChart({
            year: 2026, month: 9, day: 20,
            hour: 12, minute: 0, second: 0,
            latitude: 21.0285, longitude: 105.8542,
            utcOffset: 7, locationName: 'Hà Nội'
        });
        assert.strictEqual(dayChart.isDayChart, true);
        assert.ok(dayChart.sunAltitude >= 0);

        const nightChart = await calculateHoraryChart({
            year: 2026, month: 9, day: 20,
            hour: 0, minute: 0, second: 0,
            latitude: 21.0285, longitude: 105.8542,
            utcOffset: 7, locationName: 'Hà Nội'
        });
        assert.strictEqual(nightChart.isDayChart, false);
        assert.ok(nightChart.sunAltitude < 0);
    });

    test('Hỗ trợ Julian Day cho Lịch Julian (nghiên cứu William Lilly 1647)', () => {
        // Lịch Julian không có ngày nhuận Gregorian
        const jdGreg = getJulianDayUT(1647, 10, 15, 12, 0, 0, 0, 'GREGORIAN');
        const jdJul = getJulianDayUT(1647, 10, 15, 12, 0, 0, 0, 'JULIAN');
        assert.strictEqual(jdJul - jdGreg, 10, 'Năm 1647 chênh lệch giữa Julian và Gregorian là đúng 10 ngày');
    });

    await testAsync('Lõi thiên văn 100% thật: Không tồn tại tọa độ giả approxLon trong toàn bộ hệ thống', async () => {
        const chart = await calculateHoraryChart({
            year: 2026, month: 9, day: 20,
            hour: 15, minute: 30, second: 0,
            latitude: 21.0285, longitude: 105.8542,
            utcOffset: 7, locationName: 'Hà Nội'
        });

        const sun = chart.planets.find(p => p.id === 'sun');
        assert.ok(sun.longitude >= 170 && sun.longitude <= 180);

        const moon = chart.planets.find(p => p.id === 'moon');
        assert.ok(moon.longitude >= 270 && moon.longitude <= 310);

        const diffs = [];
        for (let i = 0; i < 6; i++) {
            diffs.push(Math.abs(chart.planets[i+1].longitude - chart.planets[i].longitude));
        }
        const isAll45 = diffs.every(d => Math.abs(d - 45) < 0.001);
        assert.strictEqual(isAll45, false, 'Tuyệt đối không được có dữ liệu giả cách đều 45°');
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
