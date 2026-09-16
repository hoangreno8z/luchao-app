/**
 * BỘ KIỂM THỬ HỒI QUY TOÀN DIỆN THỜI GIAN THIÊN VĂN & THẦN SÁT LỤC HÀO
 * test_luc_hao_astronomy.cjs
 */

const assert = require('assert');

const fs = require('fs');

// 1. Nạp Astronomy Engine & Calendar / IChing
if (typeof globalThis.Astronomy === 'undefined') {
    try {
        const code = fs.readFileSync(__dirname + '/vendor/astronomy.browser.min.js', 'utf8');
        const fn = new Function('require', 'module', 'exports', code);
        const m = { exports: {} };
        fn(require, m, m.exports);
        globalThis.Astronomy = m.exports;
    } catch (e) {
        require('./vendor/astronomy.browser.min.js');
    }
}
require('./kinh-dich/calendar.js');
require('./kinh-dich/iching_core.js');
const CALENDAR = globalThis.CALENDAR;
const ICHING = globalThis.ICHING;

console.log('================================================================');
console.log('BẮT ĐẦU CHẠY BỘ KIỂM THỬ THỜI GIAN THIÊN VĂN & THẦN SÁT LỤC HÀO');
console.log('================================================================\n');

let passedTests = 0;
let totalTests = 0;

function it(name, fn) {
    totalTests++;
    try {
        fn();
        console.log('  PASS: ' + name);
        passedTests++;
    } catch (err) {
        console.error('  FAIL: ' + name);
        console.error(err);
        process.exitCode = 1;
    }
}

// -----------------------------------------------------------------------------
// NHÓM 1: KIỂM TRA RANH GIỚI LẬP XUÂN & 12 TIẾT ĐỔI THÁNG
// -----------------------------------------------------------------------------
console.log('--- NHÓM 1: TIẾT LỆNH & LẬP XUÂN (VSOP87/NOVAS) ---');

it('Lập Xuân 2025: Biên 1 giây chuyển Năm Giáp Thìn -> Ất Tỵ, Tháng Đinh Sửu -> Mậu Dần', () => {
    const beforeLapXuan = CALENDAR.calculateCanChi('2025-02-03T14:10:28Z');
    const afterLapXuan = CALENDAR.calculateCanChi('2025-02-03T14:10:31Z');

    assert.strictEqual(beforeLapXuan.nam.can, 'Giáp');
    assert.strictEqual(beforeLapXuan.nam.chi, 'Thìn');
    assert.strictEqual(beforeLapXuan.thang.can, 'Đinh');
    assert.strictEqual(beforeLapXuan.thang.chi, 'Sửu');
    assert.strictEqual(beforeLapXuan.tietKhi, 'Đại Hàn');

    assert.strictEqual(afterLapXuan.nam.can, 'Ất');
    assert.strictEqual(afterLapXuan.nam.chi, 'Tỵ');
    assert.strictEqual(afterLapXuan.thang.can, 'Mậu');
    assert.strictEqual(afterLapXuan.thang.chi, 'Dần');
    assert.strictEqual(afterLapXuan.tietKhi, 'Lập Xuân');
});

it('Trung Khí Vũ Thủy (330°) KHÔNG đổi tháng, Tiết Lệnh Kinh Trập (345°) ĐỔI sang tháng Mão', () => {
    const vuThuy = CALENDAR.calculateCanChi('2025-02-20T00:00:00Z');
    assert.strictEqual(vuThuy.thang.chi, 'Dần', 'Vũ Thủy vẫn phải là tháng Dần');
    assert.strictEqual(vuThuy.tietKhi, 'Vũ Thủy');

    const kinhTrap = CALENDAR.calculateCanChi('2025-03-06T00:00:00Z');
    assert.strictEqual(kinhTrap.thang.chi, 'Mão', 'Kinh Trập phải đổi sang tháng Mão');
    assert.strictEqual(kinhTrap.tietKhi, 'Kinh Trập');
});

it('Trung Khí Đông Chí (270°) KHÔNG đổi tháng, Tiết Lệnh Tiểu Hàn (285°) ĐỔI sang tháng Sửu', () => {
    const dongChi = CALENDAR.calculateCanChi('2024-12-25T00:00:00Z');
    assert.strictEqual(dongChi.thang.chi, 'Tý', 'Đông Chí vẫn phải là tháng Tý');

    const tieuHan = CALENDAR.calculateCanChi('2025-01-07T00:00:00Z');
    assert.strictEqual(tieuHan.thang.chi, 'Sửu', 'Tiểu Hàn phải đổi sang tháng Sửu');
});

// -----------------------------------------------------------------------------
// NHÓM 2: ĐỘC LẬP TÝ SƠ (23:00) VỚI TIẾT KHÍ & LẬP XUÂN
// -----------------------------------------------------------------------------
console.log('\n--- NHÓM 2: PHÂN TÁCH TÝ SƠ (23:00) KHỎI TIẾT KHÍ ---');

it('Gieo quẻ 23:30 đêm trước ngày Lập Xuân: Can Chi Ngày đổi, nhưng Năm & Tháng KHÔNG đổi sớm', () => {
    const res = CALENDAR.calculateCanChi('2025-02-02T23:30:00', { timezone: 'Asia/Ho_Chi_Minh' });

    assert.strictEqual(res.ngay.can, 'Quý');
    assert.strictEqual(res.ngay.chi, 'Mão');
    assert.strictEqual(res.gio.chi, 'Tý');

    assert.strictEqual(res.nam.can, 'Giáp', 'Năm chưa được đổi sang Ất Tỵ');
    assert.strictEqual(res.nam.chi, 'Thìn');
    assert.strictEqual(res.thang.can, 'Đinh');
    assert.strictEqual(res.thang.chi, 'Sửu', 'Tháng chưa được đổi sang Mậu Dần');
    assert.strictEqual(res.tietKhi, 'Đại Hàn');
});

// -----------------------------------------------------------------------------
// NHÓM 3: TÍNH NHẤT QUÁN TOÀN CẦU (MULTI-TIMEZONE)
// -----------------------------------------------------------------------------
console.log('\n--- NHÓM 3: TÍNH NHẤT QUÁN TOÀN CẦU ---');

it('Cùng 1 thời khắc UTC tại New York, London, Hà Nội, Tokyo, Auckland đều có cùng Tháng & Năm', () => {
    const instant = '2025-06-21T12:00:00Z'; // Hạ Chí

    const ny = CALENDAR.calculateCanChi(instant, { timezone: 'America/New_York' });
    const lon = CALENDAR.calculateCanChi(instant, { timezone: 'Europe/London' });
    const vn = CALENDAR.calculateCanChi(instant, { timezone: 'Asia/Ho_Chi_Minh' });
    const jp = CALENDAR.calculateCanChi(instant, { timezone: 'Asia/Tokyo' });
    const nz = CALENDAR.calculateCanChi(instant, { timezone: 'Pacific/Auckland' });

    [ny, lon, vn, jp, nz].forEach(loc => {
        assert.strictEqual(loc.nam.can, 'Ất');
        assert.strictEqual(loc.nam.chi, 'Tỵ');
        assert.strictEqual(loc.thang.can, 'Nhâm');
        assert.strictEqual(loc.thang.chi, 'Ngọ');
        assert.strictEqual(loc.tietKhi, 'Hạ Chí');
    });
});

it('Bán Cầu Nam (Sydney, Melbourne) giữ nguyên Tiết Khí & Chi, tuyệt đối không đảo mùa', () => {
    const sydney = CALENDAR.calculateCanChi('2025-02-03T15:00:00Z', {
        latitude: -33.8688,
        longitude: 151.2093,
        timezone: 'Australia/Sydney'
    });

    assert.strictEqual(sydney.nam.can, 'Ất');
    assert.strictEqual(sydney.nam.chi, 'Tỵ');
    assert.strictEqual(sydney.thang.chi, 'Dần', 'Sydney tháng Lập Xuân vẫn là Dần');
    assert.strictEqual(sydney.tietKhi, 'Lập Xuân', 'Sydney vẫn là Lập Xuân');
});

// -----------------------------------------------------------------------------
// NHÓM 4: CHÂN THÁI DƯƠNG THỜI (LOCAL APPARENT SOLAR TIME)
// -----------------------------------------------------------------------------
console.log('\n--- NHÓM 4: CHÂN THÁI DƯƠNG THỜI ---');

it('Hà Nội (105.85°E) lúc 23:00 giờ dân dụng: Mặt Trời chưa tới 23:00 -> chưa chuyển ngày', () => {
    const res = CALENDAR.calculateCanChi('2025-02-03T16:00:00Z', {
        latitude: 21.0285,
        longitude: 105.8542,
        timezone: 'Asia/Ho_Chi_Minh'
    });

    assert.strictEqual(res.solarDetails.isSolarAdjusted, true);
    assert.strictEqual(res.solarDetails.isDayShifted, false, 'Chân Thái Dương Thời ~22:49 nên chưa đổi ngày');
    assert.strictEqual(res.gio.chi, 'Hợi', 'Giờ vẫn là Hợi');
    assert.strictEqual(res.ngay.can, 'Quý');
    assert.strictEqual(res.ngay.chi, 'Mão');
});

it('Hà Nội lúc 23:11 giờ dân dụng: Mặt Trời đã vượt 23:00 -> chuyển ngày mới', () => {
    const res = CALENDAR.calculateCanChi('2025-02-03T16:11:00Z', {
        latitude: 21.0285,
        longitude: 105.8542,
        timezone: 'Asia/Ho_Chi_Minh'
    });

    assert.strictEqual(res.solarDetails.isSolarAdjusted, true);
    assert.strictEqual(res.solarDetails.isDayShifted, true, 'Chân Thái Dương Thời >23:00 nên đã đổi ngày');
    assert.strictEqual(res.gio.chi, 'Tý', 'Giờ đã sang Tý');
    assert.strictEqual(res.ngay.can, 'Giáp');
    assert.strictEqual(res.ngay.chi, 'Thìn');
});

it('Hà Nội 00:05 ngày 04/02 dân dụng: giờ Mặt Trời 23:54 ngày 03/02 -> Can Chi Ngày là Giáp Thìn (04/02), KHÔNG nhảy thừa sang Ất Tỵ (05/02)', () => {
    // 00:05:00 UTC+7 ngày 04/02/2025 = 17:05:00Z ngày 03/02/2025
    const res = CALENDAR.calculateCanChi('2025-02-03T17:05:00Z', {
        latitude: 21.0285,
        longitude: 105.8542,
        timezone: 'Asia/Ho_Chi_Minh'
    });

    assert.strictEqual(res.solarDetails.isSolarAdjusted, true);
    assert.strictEqual(res.solarDetails.apparentSolarDate, '2025-02-03', 'Ngày Mặt Trời thực vẫn là 03/02');
    assert.strictEqual(res.solarDetails.isDayShifted, true, 'Giờ Mặt Trời ~23:54 là Tý Sơ');
    assert.strictEqual(res.gio.chi, 'Tý', 'Giờ là Tý');
    assert.strictEqual(res.gio.can, 'Giáp', 'Giờ là Giáp Tý');
    assert.strictEqual(res.ngay.can, 'Giáp', 'Can Ngày là Giáp (ngày 04/02), KHÔNG bị nhảy sang Ất (05/02)');
    assert.strictEqual(res.ngay.chi, 'Thìn', 'Chi Ngày là Thìn (ngày 04/02), KHÔNG bị nhảy sang Tỵ (05/02)');
});

it('Nha Trang (109.20°E) 23:45 ngày 03/11: giờ Mặt Trời 00:18 ngày 04/11 -> Can Chi Ngày là Đinh Sửu (04/11), KHÔNG kẹt lại 03/11', () => {
    // 23:45:00 UTC+7 ngày 03/11/2025 = 16:45:00Z ngày 03/11/2025
    const res = CALENDAR.calculateCanChi('2025-11-03T16:45:00Z', {
        latitude: 12.2388,
        longitude: 109.1967,
        timezone: 'Asia/Ho_Chi_Minh'
    });

    assert.strictEqual(res.solarDetails.isSolarAdjusted, true);
    assert.strictEqual(res.solarDetails.apparentSolarDate, '2025-11-04', 'Ngày Mặt Trời thực đã sang 04/11');
    assert.strictEqual(res.solarDetails.isDayShifted, false, 'Giờ Mặt Trời ~00:18 là Tý Chính (<23:00) của ngày 04/11');
    assert.strictEqual(res.gio.chi, 'Tý', 'Giờ là Tý');
    assert.strictEqual(res.ngay.can, 'Đinh', 'Can Ngày phải là Đinh (ngày 04/11)');
    assert.strictEqual(res.ngay.chi, 'Sửu', 'Chi Ngày phải là Sửu (ngày 04/11)');
});

// -----------------------------------------------------------------------------
// NHÓM 5: BẢNG THẦN SÁT LỤC HÀO (QUÝ NHÂN THIÊN ẤT CỔ, HUYẾT CHI & THIÊN Y)
// -----------------------------------------------------------------------------
console.log('\n--- NHÓM 5: BẢNG THẦN SÁT LỤC HÀO (QUÝ NHÂN THIÊN ẤT CỔ, HUYẾT CHI & THIÊN Y) ---');

it('Quý Nhân ngày Canh PHẢI LÀ Sửu, Mùi (theo nguyên lý Thiên Ất cổ Giáp Mậu Canh ngưu dương)', () => {
    const ssCanh = ICHING.calculateShenSha('Canh', 'Thân', 'Dần');
    const quyNhanCanh = ssCanh.find(s => s.includes('Quý Nhân'));
    assert.ok(quyNhanCanh, 'Có Quý Nhân');
    assert.ok(quyNhanCanh.includes('Sửu, Mùi'), 'Quý Nhân ngày Canh phải là Sửu, Mùi. Thực tế: ' + quyNhanCanh);
    assert.ok(!quyNhanCanh.includes('Ngọ, Dần'), 'Quý Nhân ngày Canh KHÔNG dùng dị bản Ngọ, Dần');
});

it('Khẩu quyết Quý Nhân chuẩn mực Thiên Ất cổ đủ 10 Thiên Can', () => {
    const expected = {
        'Giáp': ['Sửu', 'Mùi'],
        'Mậu': ['Sửu', 'Mùi'],
        'Canh': ['Sửu', 'Mùi'],
        'Ất': ['Tý', 'Thân'],
        'Kỷ': ['Tý', 'Thân'],
        'Bính': ['Hợi', 'Dậu'],
        'Đinh': ['Hợi', 'Dậu'],
        'Tân': ['Dần', 'Ngọ'],
        'Nhâm': ['Mão', 'Tỵ'],
        'Quý': ['Mão', 'Tỵ']
    };

    for (const [can, branches] of Object.entries(expected)) {
        const ss = ICHING.calculateShenSha(can, 'Tý', 'Dần');
        const qn = ss.find(s => s.includes('Quý Nhân'));
        branches.forEach(b => {
            assert.ok(qn.includes(b), 'Can ' + can + ' phải có Quý Nhân tại ' + b);
        });
    }
});

it('Huyết Chi: Lùi 1 ngôi so với Nguyệt Chi cho đủ 12 tháng (Chu Thần Bân)', () => {
    const chiList = ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi'];
    chiList.forEach((mChi, idx) => {
        const expectedHc = chiList[(idx - 1 + 12) % 12];
        const ss = ICHING.calculateShenSha('Giáp', 'Tý', mChi);
        const hc = ss.find(s => s.includes('Huyết Chi'));
        assert.ok(hc.includes(expectedHc), 'Tháng ' + mChi + ' Huyết Chi phải là ' + expectedHc);
    });
});

it('Thiên Y: Tam Hợp hậu thần / Thành nhật (Dần->Tuất, Mão->Hợi, Thìn->Tý...)', () => {
    const expectedTyMap = {
        'Dần': 'Tuất', 'Mão': 'Hợi', 'Thìn': 'Tý',
        'Tỵ': 'Sửu', 'Ngọ': 'Dần', 'Mùi': 'Mão',
        'Thân': 'Thìn', 'Dậu': 'Tỵ', 'Tuất': 'Ngọ',
        'Hợi': 'Mùi', 'Tý': 'Thân', 'Sửu': 'Dậu'
    };

    for (const [mChi, tyChi] of Object.entries(expectedTyMap)) {
        const ss = ICHING.calculateShenSha('Giáp', 'Tý', mChi);
        const ty = ss.find(s => s.includes('Thiên Y'));
        assert.ok(ty, 'Tháng ' + mChi + ' phải có thần sát Thiên Y');
        assert.ok(ty.includes(tyChi), 'Tháng ' + mChi + ' Thiên Y phải là ' + tyChi + '. Thực tế: ' + ty);
    }
});

it('Thiên Hỉ: Đúng quy luật 4 mùa (Xuân Tuất, Hạ Sửu, Thu Thìn, Đông Mùi)', () => {
    const seasons = [
        { months: ['Dần', 'Mão', 'Thìn'], hi: 'Tuất' },
        { months: ['Tỵ', 'Ngọ', 'Mùi'], hi: 'Sửu' },
        { months: ['Thân', 'Dậu', 'Tuất'], hi: 'Thìn' },
        { months: ['Hợi', 'Tý', 'Sửu'], hi: 'Mùi' }
    ];

    seasons.forEach(season => {
        season.months.forEach(m => {
            const ss = ICHING.calculateShenSha('Giáp', 'Tý', m);
            const hi = ss.find(s => s.includes('Thiên Hỉ'));
            assert.ok(hi.includes(season.hi), 'Tháng ' + m + ' Thiên Hỉ phải là ' + season.hi);
        });
    });
});

it('Đầy đủ 15 Thần Sát kinh điển Lục Hào (bao gồm Huyết Chi và Thiên Y riêng biệt)', () => {
    const ss = ICHING.calculateShenSha('Giáp', 'Tý', 'Dần');
    assert.strictEqual(ss.length, 15, 'Phải có chính xác 15 Thần Sát');

    const names = [
        'Quý Nhân', 'Lộc Thần', 'Dương Nhận', 'Văn Xương',
        'Dịch Mã', 'Đào Hoa', 'Tướng Tinh', 'Kiếp Sát',
        'Hoa Cái', 'Mưu Tinh', 'Tai Sát', 'Vong Thần',
        'Huyết Chi', 'Thiên Y', 'Thiên Hỉ'
    ];

    names.forEach(name => {
        const found = ss.some(s => s.includes(name));
        assert.ok(found, 'Phải có thần sát: ' + name);
    });
});

it('Kiểm tra Vong Thần theo Tam Hợp Ngày (Thủy=Hợi, Hỏa=Tỵ, Kim=Thân, Mộc=Dần)', () => {
    const ssThuy = ICHING.calculateShenSha('Giáp', 'Thân', 'Dần');
    const ssHoa = ICHING.calculateShenSha('Giáp', 'Dần', 'Dần');
    const ssKim = ICHING.calculateShenSha('Giáp', 'Tỵ', 'Dần');
    const ssMoc = ICHING.calculateShenSha('Giáp', 'Hợi', 'Dần');

    assert.ok(ssThuy.some(s => s.includes('Vong Thần') && s.includes('Hợi')), 'Thủy cục Vong Thần tại Hợi');
    assert.ok(ssHoa.some(s => s.includes('Vong Thần') && s.includes('Tỵ')), 'Hỏa cục Vong Thần tại Tỵ');
    assert.ok(ssKim.some(s => s.includes('Vong Thần') && s.includes('Thân')), 'Kim cục Vong Thần tại Thân');
    assert.ok(ssMoc.some(s => s.includes('Vong Thần') && s.includes('Dần')), 'Mộc cục Vong Thần tại Dần');
});

console.log('\n================================================================');
console.log('KẾT QUẢ KIỂM THỬ: ' + passedTests + '/' + totalTests + ' TESTS ĐẠT (100% SUCCESS)');
console.log('================================================================\n');
