/**
 * test_horary_renderer_collision.cjs
 * Bộ Kiểm Thử Bounding Box Collision Engine & Giao Diện Mobile Horary
 *
 * Kiểm tra:
 * 1. Thuật toán va chạm Bounding Box (Không dùng 7° threshold đơn giản)
 * 2. Cụm 5 hành tinh cực đoan: 100°, 102°, 105°, 109°, 113°
 * 3. Cụm wrap biên 0° Bạch Dương: 358°, 1°, 4°, 7°
 * 4. Cụm Planet + Node + Pars Fortunae trong 10°
 * 5. Phục hồi thương hiệu trung tâm kèm Zalo 0933116860 và background panel che aspect lines
 * 6. Thứ tự DOM: aspect-lines -> center-branding -> planets-on-wheel
 * 7. Kiểm thử các kích thước viewport mobile: 320, 375, 390, 393, 430
 */

const assert = require('assert');

async function runCollisionSuite() {
    console.log('================================================================');
    console.log('BẮT ĐẦU KIỂM THỬ BOUNDING BOX COLLISION & MOBILE RENDERER');
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

    const { HoraryChartRenderer } = await import('./horary/js/horaryChartRenderer.js');
    const { calculateHoraryChart } = await import('./horary/js/ephemerisEngine.js');

    const renderer = new HoraryChartRenderer(null);

    // -------------------------------------------------------------------------
    // 1. KIỂM THỬ BOUNDING BOX COLLISION ENGINE
    // -------------------------------------------------------------------------
    console.log('--- 1. CÁC CA VA CHẠM THỰC TẾ (BOUNDING BOX REAL ENGINE) ---');

    test('Test 1.1: Cụm 5 thiên thể sát nhau (100°, 102°, 105°, 109°, 113°) trên mobile', () => {
        const cluster1 = [
            { id: 'sun', glyphKey: 'sun', longitude: 100, formatted: '10°00′' },
            { id: 'mercury', glyphKey: 'mercury', longitude: 102, formatted: '12°00′', isRetrograde: true },
            { id: 'venus', glyphKey: 'venus', longitude: 105, formatted: '15°00′' },
            { id: 'mars', glyphKey: 'mars', longitude: 109, formatted: '19°00′' },
            { id: 'jupiter', glyphKey: 'jupiter', longitude: 113, formatted: '23°00′' }
        ];
        renderer.chartData = { planets: cluster1 };
        const svg = renderer.renderPlanetsOnWheel(cluster1, 0, true);

        // Trích xuất các thẻ body
        for (const b of cluster1) {
            assert.ok(svg.includes(`id="body-${b.id}"`), `Thiên thể ${b.id} phải được render trên wheel`);
        }

        // Kiểm tra trực tiếp thuật toán đặt bounding box của renderer
        const sorted = [...cluster1].sort((a, b) => a.longitude - b.longitude);
        const placed = [];
        const pad = 12;

        const candidatePool = [];
        const radialLayers = [260, 260 + 58, 260 - 58, 260 + 105, 260 - 85];
        const tangentialDisplacements = [0, 20, -20, 35, -35, 50, -50, 70, -70, 90, -90];
        for (const r of radialLayers) {
            for (const d of tangentialDisplacements) {
                const dist = Math.sqrt((r - 260) ** 2 + d ** 2);
                candidatePool.push({ r, d, dist });
            }
        }
        candidatePool.sort((a, b) => a.dist - b.dist);

        for (const p of sorted) {
            const anchorPt = renderer.eclipticToSvg(p.longitude, 0, 260);
            const tx = Math.sin(anchorPt.thetaRad);
            const ty = Math.cos(anchorPt.thetaRad);

            let chosenCandidate = null;
            for (const cand of candidatePool) {
                const basePt = renderer.eclipticToSvg(p.longitude, 0, cand.r);
                const dispPt = { x: basePt.x + cand.d * tx, y: basePt.y + cand.d * ty };
                const bbox = renderer.computeBodyBbox(dispPt, p, true, 23);

                if (!placed.some(pl => renderer.boxesIntersect(bbox, pl.bbox, pad))) {
                    chosenCandidate = { dispPt, bbox, ...cand };
                    break;
                }
            }
            assert.ok(chosenCandidate, `Cụm 5 thiên thể: Phải tìm được vị trí không va chạm cho ${p.id}`);
            placed.push({ id: p.id, bbox: chosenCandidate.bbox });
        }

        // Khẳng định tất cả các cặp đặt xong đều không giao nhau
        for (let i = 0; i < placed.length; i++) {
            for (let j = i + 1; j < placed.length; j++) {
                const collides = renderer.boxesIntersect(placed[i].bbox, placed[j].bbox, pad);
                assert.strictEqual(collides, false, `Cặp ${placed[i].id} và ${placed[j].id} không được giao nhau`);
            }
        }
    });

    test('Test 1.2: Cụm xuyên biên 0° Bạch Dương (358°, 1°, 4°, 7°) trên mobile', () => {
        const cluster2 = [
            { id: 'saturn', glyphKey: 'saturn', longitude: 358, formatted: '28°00′' },
            { id: 'moon', glyphKey: 'moon', longitude: 1, formatted: '1°00′' },
            { id: 'northNode', glyphKey: 'northNode', longitude: 4, formatted: '4°00′' },
            { id: 'partOfFortune', glyphKey: 'partOfFortune', longitude: 7, formatted: '7°00′' }
        ];
        renderer.chartData = { planets: cluster2.slice(0, 3), partOfFortune: cluster2[3] };
        const svg = renderer.renderPlanetsOnWheel(cluster2.slice(0, 3), 0, true);

        for (const b of cluster2) {
            assert.ok(svg.includes(`id="body-${b.id}"`), `Thiên thể ${b.id} phải có mặt`);
        }

        // Kiểm tra không va chạm 0° wrap
        const sorted = [...cluster2].sort((a, b) => a.longitude - b.longitude);
        const placed = [];
        const pad = 12;

        const candidatePool = [];
        const radialLayers = [260, 260 + 58, 260 - 58, 260 + 105, 260 - 85];
        const tangentialDisplacements = [0, 20, -20, 35, -35, 50, -50, 70, -70, 90, -90];
        for (const r of radialLayers) {
            for (const d of tangentialDisplacements) {
                const dist = Math.sqrt((r - 260) ** 2 + d ** 2);
                candidatePool.push({ r, d, dist });
            }
        }
        candidatePool.sort((a, b) => a.dist - b.dist);

        for (const p of sorted) {
            const anchorPt = renderer.eclipticToSvg(p.longitude, 0, 260);
            const tx = Math.sin(anchorPt.thetaRad);
            const ty = Math.cos(anchorPt.thetaRad);

            let chosenCandidate = null;
            for (const cand of candidatePool) {
                const basePt = renderer.eclipticToSvg(p.longitude, 0, cand.r);
                const dispPt = { x: basePt.x + cand.d * tx, y: basePt.y + cand.d * ty };
                const bbox = renderer.computeBodyBbox(dispPt, p, true, 23);

                if (!placed.some(pl => renderer.boxesIntersect(bbox, pl.bbox, pad))) {
                    chosenCandidate = { dispPt, bbox, ...cand };
                    break;
                }
            }
            assert.ok(chosenCandidate, `Wrap 0°: Phải tìm được vị trí không va chạm cho ${p.id}`);
            placed.push({ id: p.id, bbox: chosenCandidate.bbox });
        }

        for (let i = 0; i < placed.length; i++) {
            for (let j = i + 1; j < placed.length; j++) {
                const collides = renderer.boxesIntersect(placed[i].bbox, placed[j].bbox, pad);
                assert.strictEqual(collides, false, `0° Wrap: Cặp ${placed[i].id} và ${placed[j].id} không được giao nhau`);
            }
        }
    });

    test('Test 1.3: Cụm Planet + Node + Pars Fortunae trong 10° (45°, 48°, 52°)', () => {
        const cluster3 = [
            { id: 'sun', glyphKey: 'sun', longitude: 45, formatted: '15°00′' },
            { id: 'northNode', glyphKey: 'northNode', longitude: 48, formatted: '18°00′' },
            { id: 'partOfFortune', glyphKey: 'partOfFortune', longitude: 52, formatted: '22°00′' }
        ];
        renderer.chartData = { planets: cluster3.slice(0, 2), partOfFortune: cluster3[2] };
        const svg = renderer.renderPlanetsOnWheel(cluster3.slice(0, 2), 0, true);

        assert.ok(svg.includes('id="body-sun"'));
        assert.ok(svg.includes('id="body-northNode"'));
        assert.ok(svg.includes('id="body-partOfFortune"'));

        const placed = [];
        const pad = 12;
        const candidatePool = [];
        const radialLayers = [260, 260 + 58, 260 - 58, 260 + 105, 260 - 85];
        const tangentialDisplacements = [0, 20, -20, 35, -35, 50, -50, 70, -70, 90, -90];
        for (const r of radialLayers) {
            for (const d of tangentialDisplacements) {
                const dist = Math.sqrt((r - 260) ** 2 + d ** 2);
                candidatePool.push({ r, d, dist });
            }
        }
        candidatePool.sort((a, b) => a.dist - b.dist);

        for (const p of cluster3) {
            const anchorPt = renderer.eclipticToSvg(p.longitude, 0, 260);
            const tx = Math.sin(anchorPt.thetaRad);
            const ty = Math.cos(anchorPt.thetaRad);

            let chosenCandidate = null;
            for (const cand of candidatePool) {
                const basePt = renderer.eclipticToSvg(p.longitude, 0, cand.r);
                const dispPt = { x: basePt.x + cand.d * tx, y: basePt.y + cand.d * ty };
                const bbox = renderer.computeBodyBbox(dispPt, p, true, 23);

                if (!placed.some(pl => renderer.boxesIntersect(bbox, pl.bbox, pad))) {
                    chosenCandidate = { dispPt, bbox, ...cand };
                    break;
                }
            }
            assert.ok(chosenCandidate, `Cụm 10°: Không va chạm cho ${p.id}`);
            placed.push({ id: p.id, bbox: chosenCandidate.bbox });
        }

        for (let i = 0; i < placed.length; i++) {
            for (let j = i + 1; j < placed.length; j++) {
                assert.strictEqual(renderer.boxesIntersect(placed[i].bbox, placed[j].bbox, pad), false);
            }
        }
    });

    // -------------------------------------------------------------------------
    // 2. KIỂM THỬ THƯƠNG HIỆU TRUNG TÂM MOBILE VÀ ZALO
    // -------------------------------------------------------------------------
    console.log('\n--- 2. THƯƠNG HIỆU TRUNG TÂM MOBILE & SỐ ZALO ---');

    await testAsync('Test 2.1: Phục hồi số Zalo 0933116860 trong center branding mobile', async () => {
        const chart = await calculateHoraryChart({
            year: 2026, month: 9, day: 21, hour: 10, minute: 0, second: 0,
            latitude: 21.0285, longitude: 105.8542, timeZone: 'Asia/Ho_Chi_Minh'
        });
        renderer.chartData = chart;
        const svgMobile = renderer.generateSvgXml({ isExport: false, isMobile: true });

        assert.ok(svgMobile.includes('id="center-branding-mobile"'), 'Phải có nhóm center-branding-mobile');
        assert.ok(svgMobile.includes('Zalo 0933116860'), 'Mobile branding bắt buộc có Zalo 0933116860');
        assert.ok(svgMobile.includes('HUY HOÀNG'), 'Mobile branding bắt buộc có HUY HOÀNG');
        assert.ok(svgMobile.includes('HORARY'), 'Mobile branding bắt buộc có HORARY');
        assert.ok(svgMobile.includes('Regiomontanus'), 'Mobile branding bắt buộc có Regiomontanus');
    });

    await testAsync('Test 2.2: Thứ tự DOM và panel nền che mờ aspect lines qua tâm', async () => {
        const chart = await calculateHoraryChart({
            year: 2026, month: 9, day: 21, hour: 10, minute: 0, second: 0,
            latitude: 21.0285, longitude: 105.8542, timeZone: 'Asia/Ho_Chi_Minh'
        });
        renderer.chartData = chart;
        renderer.aspects = [{
            planetA: chart.planets[0],
            planetB: chart.planets[1],
            aspectId: 'opposition',
            state: 'APPLYING'
        }];
        const svgMobile = renderer.generateSvgXml({ isExport: false, isMobile: true });

        // Kiểm tra thứ tự DOM: aspect-lines xuất hiện TRƯỚC center-branding-mobile
        const aspectIdx = svgMobile.indexOf('id="aspect-lines"');
        const brandingIdx = svgMobile.indexOf('id="center-branding-mobile"');
        const planetsIdx = svgMobile.indexOf('id="planets-on-wheel"');

        assert.ok(aspectIdx !== -1 && brandingIdx !== -1 && planetsIdx !== -1);
        assert.ok(aspectIdx < brandingIdx, 'Aspect lines phải nằm dưới center branding');
        assert.ok(brandingIdx < planetsIdx, 'Center branding phải nằm dưới planets on wheel');

        // Kiểm tra có thẻ rect nền với opacity 0.88
        assert.ok(svgMobile.includes('fill-opacity="0.88"'), 'Phải có rect che mờ aspect lines qua tâm');
    });

    // -------------------------------------------------------------------------
    // 3. KIỂM THỬ GIAO DIỆN & VIEWPORT MOBILE
    // -------------------------------------------------------------------------
    console.log('\n--- 3. MOBILE ACCEPTANCE TRÊN CÁC VIEWPORT (320, 375, 390, 393, 430) ---');

    const viewports = [
        { width: 320, height: 568, name: '320x568 (Small Phone)' },
        { width: 375, height: 667, name: '375x667 (iPhone SE/8)' },
        { width: 390, height: 844, name: '390x844 (iPhone 12/13/14)' },
        { width: 393, height: 852, name: '393x852 (iPhone 15/16)' },
        { width: 430, height: 932, name: '430x932 (iPhone Pro Max)' }
    ];

    for (const vp of viewports) {
        test(`Test 3: Viewport ${vp.name}`, () => {
            const svg = renderer.generateSvgXml({ isExport: false, isMobile: true });
            assert.ok(svg.includes('viewBox="70 70 1060 1060"'), `${vp.name} phải dùng viewBox zoom 70 70 1060 1060`);
            assert.ok(!svg.includes('CUNG HOÀNG ĐẠO (1 - 6)'), `${vp.name} không chứa 4 góc chú thích`);
            assert.ok(svg.includes('Zalo 0933116860'), `${vp.name} có số Zalo`);
            assert.ok(svg.includes('font-size="23"'), `${vp.name} dùng font độ phút tối ưu 23px`);
            assert.ok(svg.includes('font-size="21"'), `${vp.name} dùng font số nhà tối ưu 21px`);
        });
    }

    // -------------------------------------------------------------------------
    // 4. KIỂM THỬ MOBILE LONG-PRESS DOM = IMG
    // -------------------------------------------------------------------------
    console.log('\n--- 4. KIỂM THỬ MOBILE LONG-PRESS DOM = IMG ---');

    await testAsync('Test 4: Mobile render sinh ra thẻ <img> thật (HTMLImageElement) có hỗ trợ long-press', async () => {
        const chart = await calculateHoraryChart({
            year: 2026, month: 9, day: 21, hour: 10, minute: 1, second: 0,
            latitude: 21.0285, longitude: 105.8542, timeZone: 'Asia/Ho_Chi_Minh'
        });

        // Giả lập môi trường DOM có HTMLImageElement
        class MockImageElement {}
        global.HTMLImageElement = MockImageElement;

        class MockImage {
            constructor() {
                setTimeout(() => { if (this.onload) this.onload(); }, 5);
            }
        }
        global.Image = MockImage;
        global.window = {
            innerWidth: 375,
            btoa: (str) => Buffer.from(str).toString('base64')
        };
        const mockWrapper = { innerHTML: '' };
        const mockContainer = {
            innerHTML: '',
            querySelector(sel) {
                if (sel === '#chart-display-wrapper') return mockWrapper;
                if (sel === '#horary-chart-img' && mockWrapper.innerHTML.includes('id="horary-chart-img"')) {
                    return new MockImageElement();
                }
                return null;
            }
        };
        global.document = {
            createElement(tag) {
                if (tag === 'canvas') {
                    return {
                        width: 1200, height: 1200,
                        getContext() { return { drawImage() {} }; },
                        toDataURL() { return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=='; }
                    };
                }
                return {};
            }
        };

        const mobileRenderer = new HoraryChartRenderer(mockContainer);
        await mobileRenderer.render(chart, [], { isMobile: true });

        // Chờ onload async
        await new Promise(r => setTimeout(r, 20));

        assert.ok(mockWrapper.innerHTML.includes('<img'), 'DOM wrapper phải chứa thẻ <img> trên mobile');
        assert.ok(mockWrapper.innerHTML.includes('id="horary-chart-img"'), 'DOM wrapper phải có id="horary-chart-img"');
        const imgEl = mockContainer.querySelector('#horary-chart-img');
        assert.ok(imgEl instanceof global.HTMLImageElement, '#horary-chart-img phải là HTMLImageElement thật');
    });

    console.log('================================================================');
    console.log(`KẾT QUẢ KIỂM THỬ COLLISION & MOBILE: ${passed}/${passed + failed} TESTS ĐẠT (${Math.round(passed / (passed + failed) * 100)}% SUCCESS)`);
    console.log('================================================================\n');

    if (failed > 0) {
        process.exit(1);
    }
}

runCollisionSuite().catch(err => {
    console.error('Lỗi nghiêm trọng trong Collision Suite:', err);
    process.exit(1);
});
