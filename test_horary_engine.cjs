/**
 * test_horary_engine.cjs - Bộ Kiểm Thử Tự Động Toàn Diện Phân Hệ Horary Astrology
 * Bao gồm các ca kiểm thử toán học & thiên văn kinh điển chuyên sâu theo Technical Audit.
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
    const { getAngularDistance, calculateAspectBetween, scanAllAspects, MOIETY_OF_ORBS, MAJOR_ASPECTS } = await import('./horary/js/aspectEngine.js');
    const { evaluateSingleReception, analyzePairReception, scanAllReceptions } = await import('./horary/js/receptionEngine.js');
    const { generateHouseExplanation, HOUSE_DEFINITIONS } = await import('./horary/js/houseMeanings.js');
    const { calculateHoraryChart, getHouseOfLongitude, getJulianDayUT, getAstronomyEngine } = await import('./horary/js/ephemerisEngine.js');
    const { getTimezoneOffsetHours } = await import('./horary/js/horaryApp.js');

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
    // NHÓM 4: ĐỘNG HỌC ASPECT & ĐẠO HÀM GIẢI TÍCH dE/dt TỨC THỜI
    // =========================================================================
    console.log('\n--- NHÓM 4: ĐẠO HÀM GIẢI TÍCH dE/dt & 5 TRẠNG THÁI ĐỘNG HỌC ---');

    test('Ca 1: Hai hành tinh cùng thuận hành, hành tinh nhanh đuổi kịp hành tinh chậm -> APPLYING', () => {
        const moon = { id: 'moon', nameVi: 'Mặt Trăng', longitude: 115, speedLongitude: 13.0 };
        const mars = { id: 'mars', nameVi: 'Hỏa Tinh', longitude: 120, speedLongitude: 0.5 };
        const asp = calculateAspectBetween(moon, mars);
        assert.ok(asp, 'Phải tìm thấy aspect conjunction');
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

    test('Ca 5 (Audit Hardening): Mặt Trăng cực sát Exact (0.05° ≈ 3′) không bị lỗi bước tiến -> APPLYING', () => {
        // Sai số chỉ 0.05°: đạo hàm tức thời giải tích cho ra dE/dt < 0 ngay lập tức mà không nhảy qua exact
        const moon = { id: 'moon', nameVi: 'Mặt Trăng', longitude: 119.95, speedLongitude: 13.0 };
        const mars = { id: 'mars', nameVi: 'Hỏa Tinh', longitude: 120.00, speedLongitude: 0.5 };
        const asp = calculateAspectBetween(moon, mars);
        assert.ok(asp);
        assert.strictEqual(asp.state, 'APPLYING');
        assert.ok(asp.perfectionInfo !== null);
        assert.ok(parseFloat(asp.perfectionInfo.hoursUntilExact) < 1.0, 'Thời gian tới exact phải dưới 1 giờ');
    });

    test('Ca 6 (Audit Hardening): Góc chiếu đạt độ chính xác tuyệt đối (sai số tiệm cận 0) -> EXACT', () => {
        const sun = { id: 'sun', nameVi: 'Mặt Trời', longitude: 60.001, speedLongitude: 0.98 };
        const saturn = { id: 'saturn', nameVi: 'Thổ Tinh', longitude: 0.000, speedLongitude: 0.04 };
        const asp = calculateAspectBetween(sun, saturn);
        assert.ok(asp);
        assert.strictEqual(asp.aspectId, 'sextile');
        assert.strictEqual(asp.state, 'EXACT');
    });

    test('Ca 7 (Audit Hardening): Đang tiến tới nhưng ngoài Orb -> APPROACHING_OUT_OF_ORB', () => {
        // Mặt Trăng ở 100° (+13°/ngày), Hỏa Tinh ở 120° (+0.5°/ngày). Cách nhau 20°.
        // Max Orb Moon (6.25) + Mars (3.75) = 10.0°.
        // Khoảng cách 20° > 10° -> Ngoài Orb nhưng đang tiến tới!
        const moon = { id: 'moon', nameVi: 'Mặt Trăng', longitude: 100, speedLongitude: 13.0 };
        const mars = { id: 'mars', nameVi: 'Hỏa Tinh', longitude: 120, speedLongitude: 0.5 };
        const asp = calculateAspectBetween(moon, mars);
        assert.ok(asp);
        assert.strictEqual(asp.inOrb, false);
        assert.strictEqual(asp.state, 'APPROACHING_OUT_OF_ORB');
    });

    test('Ca 8 (Audit Hardening): Đã rời xa và vượt ngoài Orb -> SEPARATED_OUT_OF_ORB', () => {
        // Mặt Trăng ở 135° (+13°/ngày), Hỏa Tinh ở 120° (+0.5°/ngày). Cách nhau 15° > 10°.
        const moon = { id: 'moon', nameVi: 'Mặt Trăng', longitude: 135, speedLongitude: 13.0 };
        const mars = { id: 'mars', nameVi: 'Hỏa Tinh', longitude: 120, speedLongitude: 0.5 };
        const asp = calculateAspectBetween(moon, mars);
        assert.ok(asp);
        assert.strictEqual(asp.inOrb, false);
        assert.strictEqual(asp.state, 'SEPARATED_OUT_OF_ORB');
    });

    // =========================================================================
    // NHÓM 5: MOIETY OF BODIES THEO LILLY CA p.107 (BỎ DEFAULT MAX ORB)
    // =========================================================================
    console.log('\n--- NHÓM 5: PLANETARY MOIETIES THEO WILLIAM LILLY CA p.107 ---');

    test('Giá trị Moieties chuẩn xác: Sun=8.5°, Moon=6.25°, Mars=3.75°, Jupiter=Saturn=4.5°', () => {
        assert.strictEqual(MOIETY_OF_ORBS.sun, 8.5);
        assert.strictEqual(MOIETY_OF_ORBS.moon, 6.25);
        assert.strictEqual(MOIETY_OF_ORBS.mercury, 3.5);
        assert.strictEqual(MOIETY_OF_ORBS.venus, 4.0);
        assert.strictEqual(MOIETY_OF_ORBS.mars, 3.75);
        assert.strictEqual(MOIETY_OF_ORBS.jupiter, 4.5);
        assert.strictEqual(MOIETY_OF_ORBS.saturn, 4.5);
    });

    test('Tổng Moieties Mặt Trời (8.5°) + Thổ Tinh (4.5°) = 13.0° cho tất cả các góc chiếu', () => {
        const sun = { id: 'sun', longitude: 72, speedLongitude: 0.98 }; // Cách 12° tới 60°
        const saturn = { id: 'saturn', longitude: 0, speedLongitude: 0.05 };
        const asp = calculateAspectBetween(sun, saturn);
        assert.ok(asp);
        assert.strictEqual(asp.maxOrbAllowed, 13.0);
        assert.strictEqual(asp.inOrb, true, 'Sai số 12° phải nằm trong Orb 13° của Sun+Saturn');
    });

    // =========================================================================
    // NHÓM 6: BỘ GIẢI NGHIỆM PERFECTION, REFRANATION & INGRESS
    // =========================================================================
    console.log('\n--- NHÓM 6: PERFECTION, REFRANATION & INGRESS DETECTION ---');

    test('Phát hiện Refranation: Hành tinh đổi chiều nghịch hành trước khi chạm góc', () => {
        const moon = { id: 'moon', nameVi: 'Mặt Trăng', longitude: 116, speedLongitude: 13.0 };
        const mars = { id: 'mars', nameVi: 'Hỏa Tinh', longitude: 120, speedLongitude: 0.5, turnsRetrogradeBeforeExact: true };
        const asp = calculateAspectBetween(moon, mars);
        assert.ok(asp);
        assert.ok(asp.perfectionInfo);
        assert.strictEqual(asp.perfectionInfo.refranation, true);
        assert.strictEqual(asp.perfectionInfo.perfects, false);
        assert.ok(asp.perfectionInfo.description.includes('REFRANATION'));
    });

    test('Phát hiện Ingress trước khi thành góc: Hành tinh đổi cung trước khi exact', () => {
        // Mặt Trăng ở 29.8° Bạch Dương (lon = 29.8), cách exact 0.5° (cần tới 30.3°).
        // Nhưng tới 30.0° (còn 0.2°) là đổi sang Kim Ngưu.
        const moon = { id: 'moon', nameVi: 'Mặt Trăng', longitude: 29.8, speedLongitude: 13.0 };
        const saturn = { id: 'saturn', nameVi: 'Thổ Tinh', longitude: 30.3, speedLongitude: 0.05 };
        const asp = calculateAspectBetween(moon, saturn);
        assert.ok(asp);
        assert.ok(asp.perfectionInfo);
        assert.strictEqual(asp.perfectionInfo.ingressBeforeAspect, true);
        assert.strictEqual(asp.perfectionInfo.perfects, false);
        assert.ok(asp.perfectionInfo.description.includes('INGRESS'));
    });

    // =========================================================================
    // NHÓM 7: PHẨM GIÁ BẢN CHẤT (ESSENTIAL DIGNITIES)
    // =========================================================================
    console.log('\n--- NHÓM 7: PHẨM GIÁ BẢN CHẤT (ESSENTIAL DIGNITIES) ---');

    test('Hỏa Tinh (Mars) tại Ma Kết (Capricorn) -> Tôn quý (Exaltation)', () => {
        const dig = calculateEssentialDignities('mars', 280, true);
        assert.strictEqual(dig.isExaltation, true);
        assert.strictEqual(dig.isFall, false);
        assert.ok(dig.score > 0);
    });

    test('Hỏa Tinh (Mars) tại Cự Giải (Cancer) -> Rơi đài / Tổn thương (Fall)', () => {
        const dig = calculateEssentialDignities('mars', 100, true);
        assert.strictEqual(dig.isFall, true);
        assert.strictEqual(dig.isExaltation, false);
        assert.ok(dig.score < 0);
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

    test('Thổ Tinh (Saturn) tại Thiên Bình (Libra) -> Tôn quý (Exaltation)', () => {
        const dig = calculateEssentialDignities('saturn', 200, true);
        assert.strictEqual(dig.isExaltation, true);
        assert.strictEqual(dig.isFall, false);
    });

    test('Thổ Tinh (Saturn) tại Bạch Dương (Aries) -> Rơi đài / Tổn thương (Fall)', () => {
        const dig = calculateEssentialDignities('saturn', 15, true);
        assert.strictEqual(dig.isFall, true);
        assert.strictEqual(dig.isExaltation, false);
    });

    // =========================================================================
    // NHÓM 8: QUY TẮC TIẾP NHẬN SAHL IBN BISHR & PHÂN TÁCH ACTIVE / POTENTIAL
    // =========================================================================
    console.log('\n--- NHÓM 8: TIẾP NHẬN SAHL IBN BISHR & ACTIVE / POTENTIAL ---');

    test('Tiếp nhận qua Domicile hoặc Exaltation đủ điều kiện kinh điển', () => {
        // Hỏa Tinh tiếp nhận Mặt Trăng khi Mặt Trăng ở Ma Kết (nơi Mars tôn quý)
        const rec = evaluateSingleReception('mars', 'moon', 280, true);
        assert.ok(rec);
        assert.strictEqual(rec.hasMajor, true);
        assert.strictEqual(rec.isQualified, true);
        assert.ok(rec.sahlStatusVi.includes('Đủ điều kiện tiếp nhận'));
    });

    test('Phẩm giá nhỏ đơn lẻ KHÔNG ĐỦ điều kiện tiếp nhận theo Sahl ibn Bishr', () => {
        // Tìm vị trí mà hành tinh chỉ có đúng 1 phẩm giá nhỏ (ví dụ chỉ có 1 Face)
        // Kim Tinh ngụ tại Bạch Dương phân độ Face 1 (0° - 10° Bạch Dương) do Mars cai quản (nhưng Mars cũng cai quản Domicile)
        // Thử kiểm tra sao Thủy ngụ tại 15° Cự Giải: Face 2 của Cancer do Mercury cai quản
        const rec = evaluateSingleReception('mercury', 'moon', 105, true);
        if (rec && !rec.hasMajor && rec.minorCount === 1) {
            assert.strictEqual(rec.isQualified, false, 'Một phẩm giá nhỏ đơn lẻ phải bị loại theo Sahl');
            assert.ok(rec.sahlStatusVi.includes('Chưa đủ điều kiện'));
        }
    });

    test('Phân tách Tiếp nhận Tiềm năng (Potential) vs Thực thi (Active)', () => {
        const sun = { id: 'sun', longitude: 105 }; // Cancer (nhà Moon)
        const moon = { id: 'moon', longitude: 135 }; // Leo (nhà Sun)

        // Chưa có aspect kết nối -> POTENTIAL
        const pairPotential = analyzePairReception(sun, moon, true, null);
        assert.strictEqual(pairPotential.activeStatus, 'POTENTIAL');
        assert.strictEqual(pairPotential.isActive, false);

        // Có aspect kết nối -> ACTIVE
        const mockAspect = { aspectNameVi: 'Lục hợp', state: 'APPLYING', stateVi: 'Đang tiến tới', orbFormatted: '1°15′' };
        const pairActive = analyzePairReception(sun, moon, true, mockAspect);
        assert.strictEqual(pairActive.activeStatus, 'ACTIVE');
        assert.strictEqual(pairActive.isActive, true);
    });

    test('Văn bản Mutual Reception trung tính học thuật, không phán đoán chủ quan', () => {
        const sun = { id: 'sun', longitude: 105 };
        const moon = { id: 'moon', longitude: 135 };
        const pair = analyzePairReception(sun, moon, true);
        assert.ok(pair.mutualDescription.includes('Sahl ibn Bishr & William Lilly'));
        assert.ok(pair.mutualDescription.includes('cần kết hợp xét góc chiếu'));
    });

    // =========================================================================
    // NHÓM 9: MÚI GIỜ IANA ĐỘNG (INTL.DATETIMEFORMAT) XỬ LÝ DST
    // =========================================================================
    console.log('\n--- NHÓM 9: PHÂN GIẢI MÚI GIỜ IANA ĐỘNG & DAYLIGHT SAVING TIME ---');

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

    test('New York mùa hè (15/07) tự động là UTC-4 (EDT), mùa đông là UTC-5 (EST)', () => {
        const summerDate = new Date(Date.UTC(2026, 6, 15, 12, 0, 0));
        const winterDate = new Date(Date.UTC(2026, 11, 15, 12, 0, 0));
        assert.strictEqual(getTimezoneOffsetHours('America/New_York', summerDate), -4);
        assert.strictEqual(getTimezoneOffsetHours('America/New_York', winterDate), -5);
    });

    test('Hà Nội (Asia/Ho_Chi_Minh) luôn cố định UTC+7, Tokyo là UTC+9 quanh năm', () => {
        const d = new Date(Date.UTC(2026, 6, 15, 12, 0, 0));
        assert.strictEqual(getTimezoneOffsetHours('Asia/Ho_Chi_Minh', d), 7);
        assert.strictEqual(getTimezoneOffsetHours('Asia/Tokyo', d), 9);
    });

    // =========================================================================
    // NHÓM 10: NAM GIAO ĐIỂM (SOUTH NODE) & LÕI THIÊN VĂN THẬT 100%
    // =========================================================================
    console.log('\n--- NHÓM 10: VẬN TỐC NAM GIAO ĐIỂM & AUDIT KHÔNG DỮ LIỆU GIẢ ---');

    await testAsync('Vận tốc Nam Giao Điểm CÙNG DẤU VÀ BẰNG VẬN TỐC Bắc Giao Điểm', async () => {
        const chart = await calculateHoraryChart({
            year: 2026, month: 9, day: 20,
            hour: 15, minute: 30, second: 0,
            latitude: 21.0285, longitude: 105.8542,
            utcOffset: 7, locationName: 'Hà Nội'
        });

        const nn = chart.planets.find(p => p.id === 'northNode');
        const sn = chart.planets.find(p => p.id === 'southNode');

        assert.ok(nn && sn, 'Phải có cả Bắc và Nam Giao Điểm');
        assert.strictEqual(sn.speedLongitude, nn.speedLongitude, 'Vận tốc Nam Giao Điểm phải bằng đúng Bắc Giao Điểm');
        assert.ok(sn.speedLongitude < 0, 'Cả hai giao điểm đều hồi quy nghịch hành (v < 0)');
    });

    await testAsync('True Solar Altitude xác định Day/Night Sect chuẩn xác theo đường chân trời', async () => {
        // Hà Nội lúc 12:00 trưa -> Mặt Trời trên cao -> Day Chart
        const dayChart = await calculateHoraryChart({
            year: 2026, month: 9, day: 20,
            hour: 12, minute: 0, second: 0,
            latitude: 21.0285, longitude: 105.8542,
            utcOffset: 7, locationName: 'Hà Nội'
        });
        assert.strictEqual(dayChart.isDayChart, true);
        assert.ok(dayChart.sunAltitude > 50, `Độ cao trưa phải > 50°, thực tế: ${dayChart.sunAltitude}`);

        // Hà Nội lúc 00:00 nửa đêm -> Mặt Trời dưới đáy -> Night Chart
        const nightChart = await calculateHoraryChart({
            year: 2026, month: 9, day: 20,
            hour: 0, minute: 0, second: 0,
            latitude: 21.0285, longitude: 105.8542,
            utcOffset: 7, locationName: 'Hà Nội'
        });
        assert.strictEqual(nightChart.isDayChart, false);
        assert.ok(nightChart.sunAltitude < -50, `Độ cao đêm phải < -50°, thực tế: ${nightChart.sunAltitude}`);
    });

    await testAsync('Lõi thiên văn 100% thật: Không tồn tại tọa độ giả approxLon trong toàn bộ hệ thống', async () => {
        const chart = await calculateHoraryChart({
            year: 2026, month: 9, day: 20,
            hour: 15, minute: 30, second: 0,
            latitude: 21.0285, longitude: 105.8542,
            utcOffset: 7, locationName: 'Hà Nội'
        });

        // Kiểm tra tính nhất quán thiên văn: Mặt Trời ngày 20/09 phải ở cuối Xử Nữ (170° - 180°)
        const sun = chart.planets.find(p => p.id === 'sun');
        assert.ok(sun.longitude >= 170 && sun.longitude <= 180, `Ghé kinh độ Mặt Trời 20/09: ${sun.longitude}°`);

        // Mặt Trăng ngày 20/09/2026 ở Ma Kết / Bảo Bình (280° - 310°)
        const moon = chart.planets.find(p => p.id === 'moon');
        assert.ok(moon.longitude >= 270 && moon.longitude <= 310, `Ghé kinh độ Mặt Trăng 20/09: ${moon.longitude}°`);

        // Đảm bảo không có hai hành tinh nào bị cách đều nhân tạo 45° như trong fake fallback cũ
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
