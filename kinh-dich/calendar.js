/**
 * Lịch pháp và Can Chi Lục Hào - calendar.js
 * Tích hợp động cơ cơ học thiên thể VSOP87/NOVAS (astronomy-engine).
 * 
 * NGUYÊN TẮC THIÊN VĂN & DỊCH HỌC:
 * 1. 24 Tiết Khí tính theo Định Khí Pháp (kinh độ hoàng đạo biểu kiến của Mặt Trời λ☉).
 * 2. 12 Tiết lệnh (Jie) đổi Nguyệt Kiến; 12 Trung Khí tuyệt đối KHÔNG đổi tháng.
 * 3. Lập Xuân (315° UTC) đổi Năm Can Chi (Thái Tuế).
 * 4. Chân Thái Dương Thời (Local Apparent Solar Time) tính qua góc giờ mặt trời HourAngle.
 * 5. Giờ Tý Sơ (23:00): chỉ áp dụng đổi Can Chi Ngày, KHÔNG đột biến mốc xét Tiết Khí/Tháng/Năm.
 * 6. Bán Cầu Nam: Giữ nguyên 100% tiết khí và chi, không đảo mùa.
 */

const CALENDAR = (function () {
    const CAN = ['Giáp', 'Ất', 'Bính', 'Đinh', 'Mậu', 'Kỷ', 'Canh', 'Tân', 'Nhâm', 'Quý'];
    const CHI = ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi'];

    const NGU_HANH_CHI = {
        'Hợi': 'Thủy', 'Tý': 'Thủy',
        'Dần': 'Mộc', 'Mão': 'Mộc',
        'Tỵ': 'Hỏa', 'Ngọ': 'Hỏa',
        'Thân': 'Kim', 'Dậu': 'Kim',
        'Thìn': 'Thổ', 'Tuất': 'Thổ', 'Sửu': 'Thổ', 'Mùi': 'Thổ'
    };

    // 24 Tiết Khí theo thứ tự góc kinh độ hoàng đạo biểu kiến từ Tiểu Hàn (285°)
    const SOLAR_TERMS_DEF = [
        { id: 0,  name: 'Tiểu Hàn',   lon: 285, isJie: true,  monthChi: 'Sửu' },
        { id: 1,  name: 'Đại Hàn',    lon: 300, isJie: false },
        { id: 2,  name: 'Lập Xuân',   lon: 315, isJie: true,  monthChi: 'Dần' },
        { id: 3,  name: 'Vũ Thủy',    lon: 330, isJie: false },
        { id: 4,  name: 'Kinh Trập',  lon: 345, isJie: true,  monthChi: 'Mão' },
        { id: 5,  name: 'Xuân Phân',  lon: 0,   isJie: false },
        { id: 6,  name: 'Thanh Minh', lon: 15,  isJie: true,  monthChi: 'Thìn' },
        { id: 7,  name: 'Cốc Vũ',     lon: 30,  isJie: false },
        { id: 8,  name: 'Lập Hạ',     lon: 45,  isJie: true,  monthChi: 'Tỵ' },
        { id: 9,  name: 'Tiểu Mãn',   lon: 60,  isJie: false },
        { id: 10, name: 'Mang Chủng', lon: 75,  isJie: true,  monthChi: 'Ngọ' },
        { id: 11, name: 'Hạ Chí',     lon: 90,  isJie: false },
        { id: 12, name: 'Tiểu Thử',   lon: 105, isJie: true,  monthChi: 'Mùi' },
        { id: 13, name: 'Đại Thử',    lon: 120, isJie: false },
        { id: 14, name: 'Lập Thu',    lon: 135, isJie: true,  monthChi: 'Thân' },
        { id: 15, name: 'Xử Thử',     lon: 150, isJie: false },
        { id: 16, name: 'Bạch Lộ',    lon: 165, isJie: true,  monthChi: 'Dậu' },
        { id: 17, name: 'Thu Phân',   lon: 180, isJie: false },
        { id: 18, name: 'Hàn Lộ',     lon: 195, isJie: true,  monthChi: 'Tuất' },
        { id: 19, name: 'Sương Giáng',lon: 210, isJie: false },
        { id: 20, name: 'Lập Đông',   lon: 225, isJie: true,  monthChi: 'Hợi' },
        { id: 21, name: 'Tiểu Tuyết', lon: 240, isJie: false },
        { id: 22, name: 'Đại Tuyết',  lon: 255, isJie: true,  monthChi: 'Tý' },
        { id: 23, name: 'Đông Chí',   lon: 270, isJie: false }
    ];

    function getAstroEngine() {
        if (typeof Astronomy !== 'undefined') return Astronomy;
        if (typeof globalThis !== 'undefined' && globalThis.Astronomy) return globalThis.Astronomy;
        if (typeof window !== 'undefined' && window.Astronomy) return window.Astronomy;
        if (typeof global !== 'undefined' && global.Astronomy) return global.Astronomy;
        return null;
    }

    const solarTermCache = {};

    function getSolarTermsForYear(year) {
        if (solarTermCache[year]) return solarTermCache[year];

        const Astro = getAstroEngine();
        if (Astro && typeof Astro.SearchSunLongitude === 'function') {
            try {
                const list = [];
                let searchDate = new Date(Date.UTC(year, 0, 1));
                for (let i = 0; i < 24; i++) {
                    const def = SOLAR_TERMS_DEF[i];
                    const res = Astro.SearchSunLongitude(def.lon, searchDate, 20);
                    if (!res || !res.date) throw new Error('SearchSunLongitude returned invalid result');
                    const termDate = res.date;
                    list.push({
                        id: i,
                        name: def.name,
                        lon: def.lon,
                        isJie: def.isJie,
                        monthChi: def.monthChi || null,
                        date: termDate
                    });
                    searchDate = new Date(termDate.getTime() + 13 * 86400000);
                }
                solarTermCache[year] = list;
                return list;
            } catch (err) {
                console.warn('Lỗi tính toán thiên văn SearchSunLongitude, chuyển sang thuật toán dự phòng:', err);
            }
        }

        // Fallback giải thuật nếu môi trường không có Astronomy
        const list = [];
        for (let i = 0; i < 24; i++) {
            const def = SOLAR_TERMS_DEF[i];
            list.push({
                id: i,
                name: def.name,
                lon: def.lon,
                isJie: def.isJie,
                monthChi: def.monthChi || null,
                date: fallbackCalculateSolarTerm(year, i)
            });
        }
        solarTermCache[year] = list;
        return list;
    }

    function fallbackCalculateSolarTerm(year, termIndex) {
        const baseDate = new Date(Date.UTC(year, 0, 1));
        const approxDays = termIndex * 15.218 + 5.5;
        let jd = (baseDate.getTime() / 86400000) + 2440587.5 + approxDays;
        let targetLong = (285 + termIndex * 15) % 360;

        for (let k = 0; k < 3; k++) {
            const t = (jd - 2451545.0) / 36525.0;
            const L0 = 280.46646 + 36000.76983 * t;
            const M = 357.52911 + 35999.05029 * t;
            const C = (1.914602 - 0.004817 * t) * Math.sin(M * Math.PI / 180) + (0.019993) * Math.sin(2 * M * Math.PI / 180);
            let trueLong = (L0 + C) % 360;
            if (trueLong < 0) trueLong += 360;
            let error = targetLong - trueLong;
            if (error > 180) error -= 360;
            if (error < -180) error += 360;
            jd += error / 0.9856;
        }

        const z = Math.floor(jd + 0.5);
        const f = jd + 0.5 - z;
        let alpha = Math.floor((z - 1867216.25) / 36524.25);
        const a = z + 1 + alpha - Math.floor(alpha / 4);
        const b = a + 1524;
        const c = Math.floor((b - 122.1) / 365.25);
        const d = Math.floor(365.25 * c);
        const e = Math.floor((b - d) / 30.6001);
        const day = b - d - Math.floor(30.6001 * e) + f;
        const month = e < 14 ? e - 1 : e - 13;
        const yy = month > 2 ? c - 4716 : c - 4715;
        const totalSec = Math.floor((day - Math.floor(day)) * 86400);

        return new Date(Date.UTC(yy, month - 1, Math.floor(day), Math.floor(totalSec / 3600), Math.floor((totalSec % 3600) / 60)));
    }

    function calculateSolarTermDate(year, termIndex) {
        const terms = getSolarTermsForYear(year);
        return terms[termIndex] ? terms[termIndex].date : fallbackCalculateSolarTerm(year, termIndex);
    }

    function getSolarTerm(year) {
        const terms = getSolarTermsForYear(year);
        return terms.map(t => t.date);
    }

    function getCivilParts(date, timeZone) {
        if (!timeZone) {
            return {
                year: date.getFullYear(),
                month: date.getMonth() + 1,
                day: date.getDate(),
                hour: date.getHours(),
                minute: date.getMinutes(),
                second: date.getSeconds()
            };
        }
        try {
            const formatter = new Intl.DateTimeFormat('en-US', {
                timeZone,
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
                hourCycle: 'h23'
            });
            const parts = formatter.formatToParts(date);
            const map = {};
            for (const p of parts) {
                if (p.type !== 'literal') {
                    map[p.type] = parseInt(p.value, 10);
                }
            }
            return {
                year: map.year,
                month: map.month,
                day: map.day,
                hour: map.hour,
                minute: map.minute,
                second: map.second || 0
            };
        } catch (e) {
            return {
                year: date.getFullYear(),
                month: date.getMonth() + 1,
                day: date.getDate(),
                hour: date.getHours(),
                minute: date.getMinutes(),
                second: date.getSeconds()
            };
        }
    }

    /**
     * Tính toán Can Chi, Lịch Tiết Khí và Thần Sát Lục Hào
     * @param {string|Date} dateInput - Thời gian gieo quẻ (ISO string hoặc Date)
     * @param {Object} [options] - Tùy chọn: { latitude, longitude, timezone }
     */
    function calculateCanChi(dateInput, options = {}) {
        let castInstantUtc;
        if (dateInput instanceof Date) {
            castInstantUtc = new Date(dateInput.getTime());
        } else if (typeof dateInput === 'string' && dateInput.trim()) {
            castInstantUtc = new Date(dateInput);
            if (isNaN(castInstantUtc.getTime())) {
                castInstantUtc = new Date();
            }
        } else {
            castInstantUtc = new Date();
        }

        const Astro = getAstroEngine();
        const tz = options.timezone || (typeof Intl !== 'undefined' ? Intl.DateTimeFormat().resolvedOptions().timeZone : '');
        const civil = getCivilParts(castInstantUtc, tz);

        // 1. TÍNH CHÂN THÁI DƯƠNG THỜI & NGÀY THÁI DƯƠNG (LOCAL APPARENT SOLAR TIME & DATE)
        const civilHourDecimal = civil.hour + civil.minute / 60 + civil.second / 3600;
        let solarHourDecimal = civilHourDecimal;
        let isSolarAdjusted = false;

        const hasGeo = (typeof options.latitude === 'number' && !isNaN(options.latitude)) &&
                        (typeof options.longitude === 'number' && !isNaN(options.longitude));

        if (hasGeo && Astro && typeof Astro.Observer === 'function' && typeof Astro.HourAngle === 'function') {
            try {
                const observer = new Astro.Observer(options.latitude, options.longitude, 0);
                const ha = Astro.HourAngle(Astro.Body.Sun, castInstantUtc, observer);
                if (typeof ha === 'number' && !isNaN(ha)) {
                    solarHourDecimal = ((12 + ha) % 24 + 24) % 24;
                    isSolarAdjusted = true;
                }
            } catch (err) {
                console.warn('Không thể tính Chân Thái Dương Thời qua HourAngle, fallback về giờ dân dụng:', err);
            }
        }

        // Xác định độ lệch giữa giờ Mặt Trời và giờ dân dụng để tính đúng Ngày Chân Thái Dương (apparentSolarDate)
        let diffHours = solarHourDecimal - civilHourDecimal;
        while (diffHours > 12) diffHours -= 24;
        while (diffHours < -12) diffHours += 24;

        const civilLocalMs = Date.UTC(civil.year, civil.month - 1, civil.day, civil.hour, civil.minute, civil.second);
        const solarInstantMs = civilLocalMs + Math.round(diffHours * 3600 * 1000);
        const solarDateObj = new Date(solarInstantMs);

        const appSolarYear = solarDateObj.getUTCFullYear();
        const appSolarMonth = solarDateObj.getUTCMonth() + 1;
        const appSolarDay = solarDateObj.getUTCDate();
        const sHour = solarDateObj.getUTCHours();
        const sMinute = solarDateObj.getUTCMinutes();
        const sSecond = solarDateObj.getUTCSeconds();

        // 2. QUY TẮC TÝ SƠ (23:00) CHUYỂN NGÀY CAN CHI
        // Nền tảng là ngày Chân Thái Dương (appSolarYear/appSolarMonth/appSolarDay).
        // Nếu giờ Chân Thái Dương sHour >= 23:00 (Tý Sơ) thì sang ngày Can Chi tiếp theo (+1 ngày).
        const isDayShifted = (sHour >= 23);
        const dayPillarDate = new Date(Date.UTC(appSolarYear, appSolarMonth - 1, appSolarDay + (isDayShifted ? 1 : 0)));

        const dpYear = dayPillarDate.getUTCFullYear();
        const dpMonth = dayPillarDate.getUTCMonth() + 1;
        const dpDay = dayPillarDate.getUTCDate();

        const aJD = Math.floor((14 - dpMonth) / 12);
        const yJD = dpYear + 4800 - aJD;
        const mJD = dpMonth + 12 * aJD - 3;
        const jd = dpDay + Math.floor((153 * mJD + 2) / 5) + 365 * yJD + Math.floor(yJD / 4) - Math.floor(yJD / 100) + Math.floor(yJD / 400) - 32045;

        const canNgayIdx = (jd + 9) % 10;
        const chiNgayIdx = (jd + 1) % 12;

        // 3. XÁC ĐỊNH NĂM CAN CHI & LẬP XUÂN (THEO THỜI KHẮC VẬT LÝ UTC TUYỆT ĐỐI)
        // BẤT BIẾN QUAN TRỌNG: Dùng castInstantUtc nguyên bản, TUYỆT ĐỐI KHÔNG dùng ngày đã bị dịch bởi Tý Sơ
        const utcYear = castInstantUtc.getUTCFullYear();
        const termsCurr = getSolarTermsForYear(utcYear);
        const lapXuanCurr = termsCurr[2].date;

        let solarYear;
        if (castInstantUtc < lapXuanCurr) {
            solarYear = utcYear - 1;
        } else {
            solarYear = utcYear;
        }

        let canNamIdx = (solarYear - 4) % 10;
        if (canNamIdx < 0) canNamIdx += 10;
        let chiNamIdx = (solarYear - 4) % 12;
        if (chiNamIdx < 0) chiNamIdx += 12;

        // 4. XÁC ĐỊNH NGUYỆT KIẾN (CHI THÁNG) & TIẾT KHÍ HIỆN HÀNH
        const termsPrev = getSolarTermsForYear(utcYear - 1);
        const termsNext = getSolarTermsForYear(utcYear + 1);
        const allTermsSequence = [...termsPrev, ...termsCurr, ...termsNext];

        // Tiết khí hiện hành: Tiết khí gần nhất có mốc thời gian <= castInstantUtc
        let currentTerm = allTermsSequence[0];
        for (let i = 0; i < allTermsSequence.length; i++) {
            if (castInstantUtc >= allTermsSequence[i].date) {
                currentTerm = allTermsSequence[i];
            } else {
                break;
            }
        }

        // Nguyệt Kiến (Chi Tháng): Chỉ đổi tại 12 Tiết lệnh (isJie === true), KHÔNG đổi tại Trung Khí
        let currentJie = null;
        for (let i = 0; i < allTermsSequence.length; i++) {
            if (allTermsSequence[i].isJie && castInstantUtc >= allTermsSequence[i].date) {
                currentJie = allTermsSequence[i];
            } else if (allTermsSequence[i].date > castInstantUtc) {
                break;
            }
        }

        const monthChiName = currentJie ? currentJie.monthChi : 'Dần';
        const chiThangIdx = CHI.indexOf(monthChiName);

        // Can Tháng tính theo ngũ hổ độn: Năm Can + Chi Tháng
        const diffChi = (chiThangIdx - 2 + 12) % 12; // Dần là index 2
        const canThangIdx = (((canNamIdx % 5) * 2 + 2) + diffChi) % 10;

        // 5. XÁC ĐỊNH CAN CHI GIỜ (THEO CHÂN THÁI DƯƠNG THỜI)
        const chiGioIdx = (sHour >= 23 || sHour < 1) ? 0 : Math.floor((sHour + 1) / 2) % 12;
        const canGioIdx = (((canNgayIdx % 5) * 2) + chiGioIdx) % 10;

        // 6. TUẦN KHÔNG (THEO CAN CHI NGÀY)
        const diffTK = (chiNgayIdx - canNgayIdx + 12) % 12;
        const tk1 = CHI[(diffTK - 2 + 12) % 12];
        const tk2 = CHI[(diffTK - 1 + 12) % 12];

        // Nạp Âm 60 Hoa Giáp
        const getNapAm = (can, chi) => {
            const key = can + ' ' + chi;
            const map = {
                'Giáp Tý': 'Hải Trung Kim', 'Ất Sửu': 'Hải Trung Kim',
                'Bính Dần': 'Lô Trung Hỏa', 'Đinh Mão': 'Lô Trung Hỏa',
                'Mậu Thìn': 'Đại Lâm Mộc', 'Kỷ Tỵ': 'Đại Lâm Mộc',
                'Canh Ngọ': 'Lộ Bàng Thổ', 'Tân Mùi': 'Lộ Bàng Thổ',
                'Nhâm Thân': 'Kiếm Phong Kim', 'Quý Dậu': 'Kiếm Phong Kim',
                'Giáp Tuất': 'Sơn Đầu Hỏa', 'Ất Hợi': 'Sơn Đầu Hỏa',
                'Bính Tý': 'Giản Hạ Thủy', 'Đinh Sửu': 'Giản Hạ Thủy',
                'Mậu Dần': 'Thành Đầu Thổ', 'Kỷ Mão': 'Thành Đầu Thổ',
                'Canh Thìn': 'Bạch Lạp Kim', 'Tân Tỵ': 'Bạch Lạp Kim',
                'Nhâm Ngọ': 'Dương Liễu Mộc', 'Quý Mùi': 'Dương Liễu Mộc',
                'Giáp Thân': 'Tuyền Trung Thủy', 'Ất Dậu': 'Tuyền Trung Thủy',
                'Bính Tuất': 'Ốc Thượng Thổ', 'Đinh Hợi': 'Ốc Thượng Thổ',
                'Mậu Tý': 'Tích Lịch Hỏa', 'Kỷ Sửu': 'Tích Lịch Hỏa',
                'Canh Dần': 'Tùng Bách Mộc', 'Tân Mão': 'Tùng Bách Mộc',
                'Nhâm Thìn': 'Trường Lưu Thủy', 'Quý Tỵ': 'Trường Lưu Thủy',
                'Giáp Ngọ': 'Sa Trung Kim', 'Ất Mùi': 'Sa Trung Kim',
                'Bính Thân': 'Sơn Hạ Hỏa', 'Đinh Dậu': 'Sơn Hạ Hỏa',
                'Mậu Tuất': 'Bình Địa Mộc', 'Kỷ Hợi': 'Bình Địa Mộc',
                'Canh Tý': 'Bích Thượng Thổ', 'Tân Sửu': 'Bích Thượng Thổ',
                'Nhâm Dần': 'Kim Bạch Kim', 'Quý Mão': 'Kim Bạch Kim',
                'Giáp Thìn': 'Phúc Đăng Hỏa', 'Ất Tỵ': 'Phúc Đăng Hỏa',
                'Bính Ngọ': 'Thiên Hà Thủy', 'Đinh Mùi': 'Thiên Hà Thủy',
                'Mậu Thân': 'Đại Trạch Thổ', 'Kỷ Dậu': 'Đại Trạch Thổ',
                'Canh Tuất': 'Thoa Xuyến Kim', 'Tân Hợi': 'Thoa Xuyến Kim',
                'Nhâm Tý': 'Tang Đố Mộc', 'Quý Sửu': 'Tang Đố Mộc',
                'Giáp Dần': 'Đại Khê Thủy', 'Ất Mão': 'Đại Khê Thủy',
                'Bính Thìn': 'Sa Trung Thổ', 'Đinh Tỵ': 'Sa Trung Thổ',
                'Mậu Ngọ': 'Thiên Thượng Hỏa', 'Kỷ Mùi': 'Thiên Thượng Hỏa',
                'Canh Thân': 'Thạch Lựu Mộc', 'Tân Dậu': 'Thạch Lựu Mộc',
                'Nhâm Tuất': 'Đại Hải Thủy', 'Quý Hợi': 'Đại Hải Thủy'
            };
            return map[key] || '';
        };

        const p = n => (n < 10 ? '0' + n : '' + n);
        const solarTimeFormatted = p(sHour) + ':' + p(sMinute) + ':' + p(sSecond);
        const solarDateFormatted = `${appSolarYear}-${p(appSolarMonth)}-${p(appSolarDay)}`;

        return {
            nam: { can: CAN[canNamIdx], chi: CHI[chiNamIdx], napAm: getNapAm(CAN[canNamIdx], CHI[chiNamIdx]) },
            thang: { can: CAN[canThangIdx], chi: CHI[chiThangIdx], hanh: NGU_HANH_CHI[CHI[chiThangIdx]], napAm: getNapAm(CAN[canThangIdx], CHI[chiThangIdx]) },
            ngay: { can: CAN[canNgayIdx], chi: CHI[chiNgayIdx], hanh: NGU_HANH_CHI[CHI[chiNgayIdx]], napAm: getNapAm(CAN[canNgayIdx], CHI[chiNgayIdx]) },
            gio: { can: CAN[canGioIdx], chi: CHI[chiGioIdx] },
            tuanKhong: [tk1, tk2],
            tietKhi: currentTerm.name,
            solarDetails: {
                currentTerm: currentTerm.name,
                termLongitude: currentTerm.lon,
                instantUtc: castInstantUtc.toISOString(),
                apparentSolarDate: solarDateFormatted,
                apparentSolarTime: solarTimeFormatted,
                solarHour: solarHourDecimal,
                isSolarAdjusted: isSolarAdjusted,
                isDayShifted: isDayShifted
            }
        };
    }

    return {
        CAN,
        CHI,
        NGU_HANH_CHI,
        SOLAR_TERMS_DEF,
        calculateCanChi,
        calculateSolarTermDate,
        getSolarTerm,
        getSolarTermsForYear,
        getAstroEngine
    };
})();

if (typeof globalThis !== 'undefined') {
    globalThis.CALENDAR = CALENDAR;
}
if (typeof window !== 'undefined') {
    window.CALENDAR = CALENDAR;
}
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CALENDAR;
}
