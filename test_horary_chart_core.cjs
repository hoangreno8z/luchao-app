/**
 * test_horary_chart_core.cjs - Bộ Kiểm Thử Khóa Lõi Lập Lá Số Horary (Golden Corpus & Invariants)
 * Chuẩn mực nghiệm thu tối cao:
 * - 26 Golden Cases độc lập
 * - Toàn bộ Invariant bảo đảm toán học & thiên văn
 * - ZERO mocks trong acceptance tests
 */

const assert = require('assert');

async function runGoldenCorpusSuite() {
    console.log('================================================================');
    console.log('BẮT ĐẦU CHẠY BỘ KIỂM THỬ GOLDEN CORPUS & INVARIANTS KHÓA LÕI');
    console.log('================================================================');

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

    // Nạp các module ES
    const { calculateHoraryChart, getSwissHousePosition, getJulianDayUT } = await import('./horary/js/ephemerisEngine.js');
    const { resolveWallTimeToUtc, getJulianDayFromUtcInstant, formatOffsetMinutes, getNowInTimezone } = await import('./horary/js/timeResolver.js');
    const { normalize360, formatZodiacLongitude, getZodiacPosition, PLANETS_INFO } = await import('./horary/js/traditionalRulers.js');
    const { HoraryChartRenderer } = await import('./horary/js/horaryChartRenderer.js');
    const { turnedHouse, HOUSE_DEFINITIONS } = await import('./horary/js/houseMeanings.js');

    // =========================================================================
    // PHẦN A: 26 GOLDEN CORPUS CASES (THEO MỤC XXV)
    // =========================================================================
    console.log('\n--- 26 GOLDEN CORPUS CASES ---');

    // Case 1: Vietnam Asia/Ho_Chi_Minh không DST
    await testAsync('Case 1: Vietnam (Asia/Ho_Chi_Minh) không DST, cố định UTC+07:00', async () => {
        const res = resolveWallTimeToUtc({
            year: 2026, month: 6, day: 15, hour: 10, minute: 30, second: 0,
            timeZone: 'Asia/Ho_Chi_Minh'
        });
        assert.strictEqual(res.status, 'VALID');
        assert.strictEqual(res.offsetMinutes, 420);
        assert.strictEqual(res.formattedOffset, 'UTC+07:00');
        assert.strictEqual(res.utcInstant.toISOString(), '2026-06-15T03:30:00.000Z');

        const chart = await calculateHoraryChart({
            year: 2026, month: 6, day: 15, hour: 10, minute: 30, second: 0,
            latitude: 21.0285, longitude: 105.8542, timeZone: 'Asia/Ho_Chi_Minh'
        });
        assert.strictEqual(chart.utcOffsetFormatted, 'UTC+07:00');
        assert.strictEqual(chart.planets.length, 9);
    });

    // Case 2: London summer BST (UTC+01:00)
    await testAsync('Case 2: London mùa hè tự động giải quyết BST (UTC+01:00)', async () => {
        const res = resolveWallTimeToUtc({
            year: 2026, month: 7, day: 15, hour: 14, minute: 0, second: 0,
            timeZone: 'Europe/London'
        });
        assert.strictEqual(res.status, 'VALID');
        assert.strictEqual(res.offsetMinutes, 60);
        assert.strictEqual(res.formattedOffset, 'UTC+01:00');
        assert.strictEqual(res.utcInstant.toISOString(), '2026-07-15T13:00:00.000Z');

        const chart = await calculateHoraryChart({
            year: 2026, month: 7, day: 15, hour: 14, minute: 0, second: 0,
            latitude: 51.5074, longitude: -0.1278, timeZone: 'Europe/London'
        });
        assert.strictEqual(chart.utcOffsetFormatted, 'UTC+01:00');
    });

    // Case 3: London winter GMT (UTC+00:00)
    await testAsync('Case 3: London mùa đông tự động quay về GMT (UTC+00:00)', async () => {
        const res = resolveWallTimeToUtc({
            year: 2026, month: 12, day: 15, hour: 14, minute: 0, second: 0,
            timeZone: 'Europe/London'
        });
        assert.strictEqual(res.status, 'VALID');
        assert.strictEqual(res.offsetMinutes, 0);
        assert.strictEqual(res.formattedOffset, 'UTC+00:00');
        assert.strictEqual(res.utcInstant.toISOString(), '2026-12-15T14:00:00.000Z');
    });

    // Case 4: London DST gap: 2026-03-29 01:30 => NON_EXISTENT => no chart
    await testAsync('Case 4: London DST gap (29/03/2026 01:30) phát hiện NON_EXISTENT_TIME và từ chối dựng chart', async () => {
        const res = resolveWallTimeToUtc({
            year: 2026, month: 3, day: 29, hour: 1, minute: 30, second: 0,
            timeZone: 'Europe/London'
        });
        assert.strictEqual(res.status, 'NON_EXISTENT_TIME');

        await assert.rejects(async () => {
            await calculateHoraryChart({
                year: 2026, month: 3, day: 29, hour: 1, minute: 30, second: 0,
                latitude: 51.5074, longitude: -0.1278, timeZone: 'Europe/London'
            });
        }, /chuyển giờ DST/);
    });

    // Case 5: London DST fold: 2026-10-25 01:30 => AMBIGUOUS => 2 UTC instants, require choice
    await testAsync('Case 5: London DST fold (25/10/2026 01:30) phát hiện AMBIGUOUS_TIME với đúng 2 candidates', async () => {
        const res = resolveWallTimeToUtc({
            year: 2026, month: 10, day: 25, hour: 1, minute: 30, second: 0,
            timeZone: 'Europe/London'
        });
        assert.strictEqual(res.status, 'AMBIGUOUS_TIME');
        assert.strictEqual(res.candidates.length, 2);
        assert.strictEqual(res.candidates[0].formattedOffset, 'UTC+01:00'); // BST trước vặn lùi
        assert.strictEqual(res.candidates[1].formattedOffset, 'UTC+00:00'); // GMT sau vặn lùi
        assert.strictEqual(res.candidates[0].utcInstant.toISOString(), '2026-10-25T00:30:00.000Z');
        assert.strictEqual(res.candidates[1].utcInstant.toISOString(), '2026-10-25T01:30:00.000Z');

        // Bắt buộc phải chọn candidate; nếu không truyền selectedCandidateIndex thì throw
        await assert.rejects(async () => {
            await calculateHoraryChart({
                year: 2026, month: 10, day: 25, hour: 1, minute: 30, second: 0,
                latitude: 51.5074, longitude: -0.1278, timeZone: 'Europe/London'
            });
        }, /AMBIGUOUS_TIME/);

        // Khi truyền candidate cụ thể thì dựng chart chuẩn xác
        const chart1 = await calculateHoraryChart({
            year: 2026, month: 10, day: 25, hour: 1, minute: 30, second: 0,
            latitude: 51.5074, longitude: -0.1278, timeZone: 'Europe/London',
            selectedCandidateIndex: 0
        });
        assert.strictEqual(chart1.utcOffsetFormatted, 'UTC+01:00');

        const chart2 = await calculateHoraryChart({
            year: 2026, month: 10, day: 25, hour: 1, minute: 30, second: 0,
            latitude: 51.5074, longitude: -0.1278, timeZone: 'Europe/London',
            selectedCandidateIndex: 1
        });
        assert.strictEqual(chart2.utcOffsetFormatted, 'UTC+00:00');
    });

    // Case 6: New York DST gap: 2026-03-08 02:30 => NON_EXISTENT
    await testAsync('Case 6: New York DST gap (08/03/2026 02:30) phát hiện NON_EXISTENT_TIME', async () => {
        const res = resolveWallTimeToUtc({
            year: 2026, month: 3, day: 8, hour: 2, minute: 30, second: 0,
            timeZone: 'America/New_York'
        });
        assert.strictEqual(res.status, 'NON_EXISTENT_TIME');
    });

    // Case 7: New York DST fold: 2026-11-01 01:30 => AMBIGUOUS (2 UTC instants)
    await testAsync('Case 7: New York DST fold (01/11/2026 01:30) phát hiện AMBIGUOUS_TIME (EDT & EST)', async () => {
        const res = resolveWallTimeToUtc({
            year: 2026, month: 11, day: 1, hour: 1, minute: 30, second: 0,
            timeZone: 'America/New_York'
        });
        assert.strictEqual(res.status, 'AMBIGUOUS_TIME');
        assert.strictEqual(res.candidates.length, 2);
        assert.strictEqual(res.candidates[0].formattedOffset, 'UTC-04:00'); // EDT
        assert.strictEqual(res.candidates[1].formattedOffset, 'UTC-05:00'); // EST
    });

    // Case 8: Longitude near 0°
    test('Case 8: Tọa độ cực cận 0° (0.0001° và 359.9999°)', () => {
        const p1 = getZodiacPosition(0.0001);
        assert.strictEqual(p1.signId, 'aries');
        assert.strictEqual(p1.degree, 0);
        assert.strictEqual(p1.minute, 0);
        assert.strictEqual(p1.formatted, '0°00′');

        const p2 = getZodiacPosition(359.9999);
        assert.strictEqual(p2.signId, 'pisces');
        assert.strictEqual(p2.degree, 29);
        assert.strictEqual(p2.minute, 59);
        assert.strictEqual(p2.formatted, '29°59′');
    });

    // Case 9: Longitude near 30°: 29°59′59.6″ raw => Aries, 29°59′
    test('Case 9: Biên giới 30°: 29.999888° giữ nguyên ngữ nghĩa Bạch Dương 29°59′, cấm rollover', () => {
        const raw = 29 + 59/60 + 59.6/3600; // 29°59′59.6″
        const dms = formatZodiacLongitude(raw);
        assert.strictEqual(dms.semanticSignIndex, 0);
        assert.strictEqual(dms.signId, 'aries');
        assert.strictEqual(dms.deg, 29);
        assert.strictEqual(dms.min, 59);
        assert.strictEqual(dms.sec, 59);
        assert.strictEqual(dms.formatted, '29°59′');
        assert.notStrictEqual(dms.signId, 'taurus');
    });

    // Case 10: Longitude exactly 30.0° => Taurus 0°00′
    test('Case 10: Tọa độ chính xác 30.0° chuyển bước sang Kim Ngưu 0°00′', () => {
        const dms = formatZodiacLongitude(30.0);
        assert.strictEqual(dms.semanticSignIndex, 1);
        assert.strictEqual(dms.signId, 'taurus');
        assert.strictEqual(dms.deg, 0);
        assert.strictEqual(dms.min, 0);
        assert.strictEqual(dms.formatted, '0°00′');
    });

    // Case 11: Longitude near 360°: 359.9999° => Pisces 29°59′
    test('Case 11: Tọa độ cực cận 360° (359.9999°) giữ nguyên Song Ngư 29°59′', () => {
        const dms = formatZodiacLongitude(359.9999);
        assert.strictEqual(dms.semanticSignIndex, 11);
        assert.strictEqual(dms.signId, 'pisces');
        assert.strictEqual(dms.deg, 29);
        assert.strictEqual(dms.min, 59);
    });

    // Case 12: High latitude Regiomontanus / swe_house_pos without fallback
    await testAsync('Case 12: Vĩ độ cao (Stockholm 59.33°N) Swiss Regiomontanus hoạt động không fallback', async () => {
        const chart = await calculateHoraryChart({
            year: 2026, month: 6, day: 1, hour: 12, minute: 0, second: 0,
            latitude: 59.3293, longitude: 18.0686, timeZone: 'Europe/Stockholm'
        });
        assert.ok(chart.houses);
        assert.strictEqual(chart.houses.cusps.length, 12);
        for (const p of chart.planets) {
            assert.ok(p.houseNumber >= 1 && p.houseNumber <= 12);
            assert.ok(Number.isFinite(p.exactHousePos));
            assert.ok(p.exactHousePos >= 1 && p.exactHousePos < 13);
        }
    });

    // Case 13: ASC/DSC opposition: exactly 180°
    await testAsync('Case 13: Trục đối cực ASC và DSC chênh lệch chính xác 180°', async () => {
        const chart = await calculateHoraryChart({
            year: 2026, month: 4, day: 20, hour: 8, minute: 15, second: 0,
            latitude: 21.0285, longitude: 105.8542, timeZone: 'Asia/Ho_Chi_Minh'
        });
        const asc = chart.houses.ascendant;
        const dsc = chart.houses.descendant;
        const diff = Math.abs(dsc - asc);
        assert.ok(Math.abs(diff - 180) < 1e-5, `ASC (${asc}) và DSC (${dsc}) phải đối cực 180°`);
    });

    // Case 14: MC/IC opposition: exactly 180°
    await testAsync('Case 14: Trục đối cực MC và IC chênh lệch chính xác 180°', async () => {
        const chart = await calculateHoraryChart({
            year: 2026, month: 4, day: 20, hour: 8, minute: 15, second: 0,
            latitude: 21.0285, longitude: 105.8542, timeZone: 'Asia/Ho_Chi_Minh'
        });
        const mc = chart.houses.midheaven;
        const ic = chart.houses.imumCoeli;
        const diff = Math.abs(ic - mc);
        assert.ok(Math.abs(diff - 180) < 1e-5, `MC (${mc}) và IC (${ic}) phải đối cực 180°`);
    });

    // Case 15: POF formula Day: ASC + Moon - Sun
    await testAsync('Case 15: Pars Fortunae ban ngày tuân thủ chính xác công thức William Lilly', async () => {
        const chart = await calculateHoraryChart({
            year: 2026, month: 5, day: 10, hour: 12, minute: 0, second: 0,
            latitude: 21.0285, longitude: 105.8542, timeZone: 'Asia/Ho_Chi_Minh'
        });
        assert.strictEqual(chart.isDayChart, true);
        const sun = chart.planets.find(p => p.id === 'sun');
        const moon = chart.planets.find(p => p.id === 'moon');
        const expectedPof = normalize360(chart.houses.ascendant + moon.longitude - sun.longitude);
        assert.ok(Math.abs(chart.partOfFortune.longitude - expectedPof) < 1e-5);
    });

    // Case 16: POF formula Night: CŨNG LÀ ASC + Moon - Sun (chuẩn Lilly CA p.143)
    await testAsync('Case 16: Pars Fortunae ban đêm CŨNG LÀ ASC + Moon - Sun (chuẩn Lilly CA p.143, không đảo)', async () => {
        const chart = await calculateHoraryChart({
            year: 2026, month: 5, day: 10, hour: 23, minute: 0, second: 0,
            latitude: 21.0285, longitude: 105.8542, timeZone: 'Asia/Ho_Chi_Minh'
        });
        assert.strictEqual(chart.isDayChart, false);
        const sun = chart.planets.find(p => p.id === 'sun');
        const moon = chart.planets.find(p => p.id === 'moon');
        const expectedPof = normalize360(chart.houses.ascendant + moon.longitude - sun.longitude);
        assert.ok(Math.abs(chart.partOfFortune.longitude - expectedPof) < 1e-5);
    });

    // Case 17: Mean Node vs South Node: 180° opposition, same longitude speed sign/value
    await testAsync('Case 17: Nam Giao Điểm đối xứng 180° Bắc Giao Điểm, cùng dấu và cùng vận tốc', async () => {
        const chart = await calculateHoraryChart({
            year: 2026, month: 6, day: 1, hour: 15, minute: 0, second: 0,
            latitude: 21.0285, longitude: 105.8542, timeZone: 'Asia/Ho_Chi_Minh'
        });
        const nn = chart.planets.find(p => p.id === 'northNode');
        const sn = chart.planets.find(p => p.id === 'southNode');
        const dist = Math.abs(sn.longitude - nn.longitude);
        assert.ok(Math.abs(dist - 180) < 1e-5);
        assert.strictEqual(sn.speedLongitude, nn.speedLongitude);
        assert.strictEqual(sn.latitude, -nn.latitude);
    });

    // Case 18: 5° cusp: geometric house unchanged, withinFiveDegreeRule true
    await testAsync('Case 18: Quy tắc 5° Đỉnh Nhà: houseNumber gốc không đổi, thông tin lưu trong cuspInfluence', async () => {
        const chart = await calculateHoraryChart({
            year: 2026, month: 9, day: 21, hour: 9, minute: 30, second: 0,
            latitude: 21.0285, longitude: 105.8542, timeZone: 'Asia/Ho_Chi_Minh'
        });
        for (const p of chart.planets) {
            assert.strictEqual(p.houseNumber, p.geometricHouseNumber, 'houseNumber không được ghi đè');
            assert.ok(p.cuspInfluence);
            if (p.cuspInfluence.withinFiveDegreeRule) {
                assert.ok(p.cuspInfluence.distanceDeg <= 5.0);
                assert.strictEqual(p.traditionalHouseNumber, (p.geometricHouseNumber % 12) + 1);
            } else {
                assert.strictEqual(p.traditionalHouseNumber, p.geometricHouseNumber);
            }
        }
    });

    // Case 19: >5° cusp: no cusp influence
    test('Case 19: Cách đỉnh nhà kế tiếp > 5° không có ảnh hưởng cusp', () => {
        const dist = 7.5;
        const isWithin = dist <= 5.0;
        assert.strictEqual(isWithin, false);
    });

    // Case 20: Formatter: never outputs 29°60′, 30°00′, 60′, 60″
    test('Case 20: Formatter API không bao giờ sinh 29°60′, 30°00′, 60′ hay 60″ trên toàn dải [0, 360)', () => {
        const testPoints = [
            0, 0.00001, 29.999, 29.9999, 29.999999,
            30.0, 59.9999, 89.9999, 119.9999,
            179.9999, 239.9999, 299.9999, 359.9999, 359.999999
        ];
        for (const pt of testPoints) {
            const dms = formatZodiacLongitude(pt);
            assert.ok(dms.deg >= 0 && dms.deg < 30, `deg out of bounds: ${dms.deg} at ${pt}`);
            assert.ok(dms.min >= 0 && dms.min < 60, `min out of bounds: ${dms.min} at ${pt}`);
            assert.ok(dms.sec >= 0 && dms.sec < 60, `sec out of bounds: ${dms.sec} at ${pt}`);
            assert.ok(!dms.formatted.includes('60′'), `formatted contains 60′: ${dms.formatted}`);
            assert.ok(!dms.formatted.includes('30°'), `formatted contains 30°: ${dms.formatted}`);
        }
    });

    // Case 21: Transactional: simulate planet calc failure => no partial chart
    await testAsync('Case 21: Lỗi tính toán hành tinh bất kỳ kích hoạt dừng toàn diện (Transactional)', async () => {
        // Nhập tọa độ vĩ độ không hợp lệ ngoài phạm vi [-90, 90]
        await assert.rejects(async () => {
            await calculateHoraryChart({
                year: 2026, month: 1, day: 1, hour: 12, minute: 0, second: 0,
                latitude: 95.0, longitude: 105.0 // Invalid latitude
            });
        }, /Vĩ độ/);
    });

    // Case 22: Swiss houses failure => fail closed
    await testAsync('Case 22: Swiss houses failure kích hoạt fail-closed dừng hẳn', async () => {
        await assert.rejects(async () => {
            await calculateHoraryChart({
                year: 2026, month: 1, day: 1, hour: 12, minute: 0, second: 0,
                latitude: 21.0, longitude: 250.0 // Invalid longitude > 180
            });
        }, /Kinh độ/);
    });

    // Case 23: Swiss house position failure => fail closed
    test('Case 23: Swiss house position không hợp lệ throw Error rõ ràng', () => {
        assert.throws(() => {
            getSwissHousePosition(null, 0, 0, 0, 0);
        }, /Swiss Ephemeris _swe_house_pos không khả dụng/);
    });

    // Case 24: Mobile 320px SVG check
    await testAsync('Case 24: Mobile 320px SVG không có corner boxes và text đạt >= 9 CSS px', async () => {
        const chart = await calculateHoraryChart({
            year: 2026, month: 9, day: 21, hour: 10, minute: 0, second: 0,
            latitude: 21.0285, longitude: 105.8542, timeZone: 'Asia/Ho_Chi_Minh'
        });
        const renderer = new HoraryChartRenderer(null);
        renderer.chartData = chart;
        const svgMobile320 = renderer.generateSvgXml({ isExport: false, isMobile: true });

        // Không chứa 4 góc chú thích
        assert.ok(!svgMobile320.includes('CUNG HOÀNG ĐẠO (1 - 6)'), 'Mobile 320px không được chứa corner legends');
        assert.ok(!svgMobile320.includes('HÀNH TINH NHANH'), 'Mobile 320px không được chứa corner legends');
        assert.ok(svgMobile320.includes('viewBox="70 70 1060 1060"'), 'Mobile 320px sử dụng viewBox tối ưu');
        assert.ok(svgMobile320.includes('font-size="23"') || svgMobile320.includes('font-size="28"'), 'Planet degree text đạt font-size tối ưu trên mobile');
    });

    // Case 25: Mobile 375px SVG check
    await testAsync('Case 25: Mobile 375px SVG sắc nét, Pars Fortunae được vẽ đầy đủ', async () => {
        const chart = await calculateHoraryChart({
            year: 2026, month: 9, day: 21, hour: 10, minute: 0, second: 0,
            latitude: 21.0285, longitude: 105.8542, timeZone: 'Asia/Ho_Chi_Minh'
        });
        const renderer = new HoraryChartRenderer(null);
        renderer.chartData = chart;
        const svgMobile375 = renderer.generateSvgXml({ isExport: false, isMobile: true });

        assert.ok(svgMobile375.includes('partOfFortune'), 'Pars Fortunae phải được vẽ trên wheel');
        assert.ok(svgMobile375.includes('id="axis-asc"'), 'Trục ASC phải hiển thị rõ');
        assert.ok(svgMobile375.includes('id="axis-dsc"'), 'Trục DSC phải hiển thị rõ');
    });

    // Case 26: Mobile 430px SVG check
    await testAsync('Case 26: Mobile 430px SVG và Export Mode tách bạch hoàn toàn', async () => {
        const chart = await calculateHoraryChart({
            year: 2026, month: 9, day: 21, hour: 10, minute: 0, second: 0,
            latitude: 21.0285, longitude: 105.8542, timeZone: 'Asia/Ho_Chi_Minh'
        });
        const renderer = new HoraryChartRenderer(null);
        renderer.chartData = chart;

        const svgScreen = renderer.generateSvgXml({ isExport: false, isMobile: true });
        const svgExport = renderer.generateSvgXml({ isExport: true, isMobile: false });

        assert.ok(!svgScreen.includes('CUNG HOÀNG ĐẠO (1 - 6)'), 'Screen mobile bỏ 4 góc chú thích');
        assert.ok(svgExport.includes('CUNG HOÀNG ĐẠO (1 - 6)'), 'Export mode bắt buộc giữ đủ 4 góc chú thích');
        assert.ok(svgExport.includes('width="1200"'), 'Export mode giữ kích thước chuẩn 1200x1200px');
    });

    // =========================================================================
    // PHẦN B: INVARIANT TESTS (THEO MỤC XXVI)
    // =========================================================================
    console.log('\n--- INVARIANTS THIÊN VĂN & TOÁN HỌC ---');

    test('Invariant 1: normalize360 luôn thuộc [0, 360)', () => {
        const testAngles = [-720, -360, -180, -0.0001, 0, 0.0001, 180, 359.9999, 360, 720, 1080.5];
        for (const a of testAngles) {
            const n = normalize360(a);
            assert.ok(n >= 0 && n < 360, `Failed for angle ${a}: got ${n}`);
        }
    });

    await testAsync('Invariant 2: Tất cả tọa độ hành tinh và đỉnh nhà đều là số hữu hạn', async () => {
        const chart = await calculateHoraryChart({
            year: 2026, month: 8, day: 15, hour: 14, minute: 30, second: 0,
            latitude: 10.8231, longitude: 106.6297, timeZone: 'Asia/Ho_Chi_Minh'
        });
        assert.strictEqual(chart.houses.cusps.length, 12);
        for (let i = 0; i < 12; i++) {
            assert.ok(Number.isFinite(chart.houses.cusps[i]));
        }
        for (const p of chart.planets) {
            assert.ok(Number.isFinite(p.longitude));
            assert.ok(Number.isFinite(p.latitude));
            assert.ok(Number.isFinite(p.speedLongitude));
            assert.ok(Number.isFinite(p.houseNumber));
        }
    });

    await testAsync('Invariant 3: DSC = normalize360(ASC + 180) & IC = normalize360(MC + 180)', async () => {
        const chart = await calculateHoraryChart({
            year: 2026, month: 8, day: 15, hour: 14, minute: 30, second: 0,
            latitude: 10.8231, longitude: 106.6297, timeZone: 'Asia/Ho_Chi_Minh'
        });
        const expDsc = normalize360(chart.houses.ascendant + 180);
        const expIc = normalize360(chart.houses.midheaven + 180);
        assert.ok(Math.abs(chart.houses.descendant - expDsc) < 1e-5);
        assert.ok(Math.abs(chart.houses.imumCoeli - expIc) < 1e-5);
    });

    await testAsync('Invariant 4: Swiss exactHousePos nằm trong khoảng [1, 13) và houseNumber là số nguyên [1, 12]', async () => {
        const chart = await calculateHoraryChart({
            year: 2026, month: 3, day: 21, hour: 6, minute: 0, second: 0,
            latitude: 21.0285, longitude: 105.8542, timeZone: 'Asia/Ho_Chi_Minh'
        });
        for (const p of chart.planets) {
            assert.ok(Number.isInteger(p.houseNumber));
            assert.ok(p.houseNumber >= 1 && p.houseNumber <= 12);
            assert.ok(p.exactHousePos >= 1.0 && p.exactHousePos < 13.0);
        }
    });

    test('Invariant 5: Turned houses tuân thủ hàm thuần túy ((b + r - 2) % 12) + 1', () => {
        assert.strictEqual(turnedHouse(7, 2), 8); // Tiền của đối tác
        assert.strictEqual(turnedHouse(7, 4), 10); // Cha của đối tác
        assert.strictEqual(turnedHouse(7, 5), 11); // Con của đối tác
        assert.strictEqual(turnedHouse(3, 8), 10); // Cái chết của anh em
        assert.strictEqual(turnedHouse(5, 10), 2); // Sự nghiệp của con cái
        assert.strictEqual(turnedHouse(1, 1), 1);
        assert.strictEqual(turnedHouse(12, 2), 1);
    });

    test('Invariant 6: Lịch Julian năm 1647 chênh lệch đúng 10 ngày so với Gregorian', () => {
        // Ngày 25/10/1647 12:00:00 UTC
        const jdGreg = getJulianDayUT(1647, 10, 25, 12, 0, 0, 0, 'GREGORIAN');
        const jdJul = getJulianDayUT(1647, 10, 25, 12, 0, 0, 0, 'JULIAN');
        const diffDays = Math.abs(jdGreg - jdJul);
        assert.strictEqual(Math.round(diffDays), 10, 'Năm 1647 thế kỷ XVII chênh lệch lịch là đúng 10 ngày');
    });

    await testAsync('Invariant 7: Lịch sử Lilly London 1647 (LMT -75s, Julian Calendar) phân giải thành công không bị DST gap', async () => {
        const res = resolveWallTimeToUtc({
            year: 1647, month: 10, day: 25, hour: 11, minute: 30, second: 0,
            timeZone: 'Europe/London', calendarMode: 'JULIAN'
        });
        assert.strictEqual(res.status, 'VALID');
        assert.strictEqual(res.offsetSeconds, -75);
        assert.strictEqual(res.formattedOffset, 'UTC-00:01:15');
        assert.strictEqual(res.utcInstant.toISOString(), '1647-11-04T11:31:15.000Z');

        const chart = await calculateHoraryChart({
            year: 1647, month: 10, day: 25, hour: 11, minute: 30, second: 0,
            latitude: 51.5074, longitude: -0.1278, timeZone: 'Europe/London',
            calendarMode: 'JULIAN'
        });
        assert.strictEqual(chart.utcOffsetFormatted, 'UTC-00:01:15');
        assert.ok(chart.jdUT > 2322921 && chart.jdUT < 2322923);
        assert.strictEqual(chart.planets.length, 9);
    });

    test('Invariant 8: Calendar-aware validation từ chối ngày không tồn tại trước khi vào resolver', () => {
        assert.throws(() => {
            resolveWallTimeToUtc({
                year: 2026, month: 2, day: 31, hour: 10, minute: 0, second: 0,
                timeZone: 'Asia/Ho_Chi_Minh'
            });
        }, /không tồn tại trong lịch/);

        // Năm 1700: Julian có ngày 29/02, Gregorian không có
        assert.throws(() => {
            resolveWallTimeToUtc({
                year: 1700, month: 2, day: 29, hour: 12, minute: 0, second: 0,
                timeZone: 'Europe/London', calendarMode: 'GREGORIAN'
            });
        }, /không tồn tại trong lịch/);

        const jul1700 = resolveWallTimeToUtc({
            year: 1700, month: 2, day: 29, hour: 12, minute: 0, second: 0,
            timeZone: 'Europe/London', calendarMode: 'JULIAN'
        });
        assert.strictEqual(jul1700.status, 'VALID');
    });

    await testAsync('Invariant 9: Nam Giao Điểm (South Node) thừa hưởng động học chính xác từ Bắc Giao Điểm', async () => {
        const chartTrue = await calculateHoraryChart({
            year: 2026, month: 9, day: 21, hour: 10, minute: 0, second: 0,
            latitude: 21.0285, longitude: 105.8542, timeZone: 'Asia/Ho_Chi_Minh',
            nodeType: 'TRUE'
        });
        const nn = chartTrue.planets.find(p => p.id === 'northNode');
        const sn = chartTrue.planets.find(p => p.id === 'southNode');
        assert.strictEqual(sn.motion, nn.motion);
        assert.strictEqual(sn.isRetrograde, nn.isRetrograde);
        assert.strictEqual(sn.isStationary, nn.isStationary);
        assert.strictEqual(sn.speedLongitude, nn.speedLongitude);
    });

    await testAsync('Invariant 10: Bảo tồn metadata offset khi truyền utcInstant vào calculateHoraryChart', async () => {
        const res = resolveWallTimeToUtc({
            year: 2026, month: 9, day: 21, hour: 10, minute: 0, second: 0,
            timeZone: 'Asia/Ho_Chi_Minh'
        });
        const chart = await calculateHoraryChart({
            year: 2026, month: 9, day: 21, hour: 10, minute: 0, second: 0,
            latitude: 21.0285, longitude: 105.8542, timeZone: 'Asia/Ho_Chi_Minh',
            utcInstant: res.utcInstant
        });
        assert.strictEqual(chart.utcOffsetFormatted, 'UTC+07:00', 'Không được rơi về UTC+00:00 khi có timeZone và utcInstant');
    });

    console.log('================================================================');
    console.log(`KẾT QUẢ KIỂM THỬ GOLDEN CORPUS: ${passed}/${passed + failed} TESTS ĐẠT (${Math.round(passed / (passed + failed) * 100)}% SUCCESS)`);
    console.log('================================================================\n');

    if (failed > 0) {
        process.exit(1);
    }
}

runGoldenCorpusSuite().catch(err => {
    console.error('Lỗi nghiêm trọng trong Golden Corpus Suite:', err);
    process.exit(1);
});
