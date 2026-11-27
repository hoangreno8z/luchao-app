/**
 * LỊCH ÂM DƯƠNG VIỆT NAM CHUẨN (UTC+7)
 * Dựa trên thuật toán thiên văn Jean Meeus & Hồ Ngọc Đức (timeZone = +7).
 * Dùng chung cho cả trình duyệt (globalThis.VnLunarCalendar) và Node.js (ESM/CJS).
 *
 * Lưu ý chuyên môn:
 * - Tử Vi Đẩu Số dùng ngày/tháng/năm Âm lịch Việt Nam (có xét tháng nhuận).
 * - Bát Tự Tứ Trụ dùng Tiết Khí (UTC+7) cho Trụ Năm/Tháng/Đại Vận; lịch âm ở đây chỉ dùng hiển thị
 *   ngày âm lịch Việt Nam và tính Can Chi ngày theo JDN, tuyệt đối không dùng tháng nhuận cho Bát Tự.
 */
(function (global) {
    'use strict';

    const PI = Math.PI;
    const VN_TIMEZONE = 7;

    const CAN_NAMES = ['Giáp', 'Ất', 'Bính', 'Đinh', 'Mậu', 'Kỷ', 'Canh', 'Tân', 'Nhâm', 'Quý'];
    const CHI_NAMES = ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi'];

    function INT(d) {
        return Math.floor(d);
    }

    function isLeapSolarYear(year) {
        return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
    }

    function daysInSolarMonth(month, year) {
        if (month === 2) return isLeapSolarYear(year) ? 29 : 28;
        if (month === 4 || month === 6 || month === 9 || month === 11) return 30;
        return 31;
    }

    /**
     * Kiểm tra ngày Dương lịch có tồn tại thực tế không (chặn 31/02, 29/02 năm không nhuận, 31/04...)
     */
    function isValidSolarDate(day, month, year) {
        if (!Number.isInteger(day) || !Number.isInteger(month) || !Number.isInteger(year)) return false;
        if (year < 1800 || year > 2199) return false;
        if (month < 1 || month > 12) return false;
        const maxDay = daysInSolarMonth(month, year);
        return day >= 1 && day <= maxDay;
    }

    /**
     * Cộng/trừ số ngày vào một ngày Dương lịch bằng UTC (an toàn 100%, không bị lệch DST).
     */
    function addDays(year, month, day, deltaDays) {
        const dt = new Date(Date.UTC(year, month - 1, day + deltaDays));
        return {
            year: dt.getUTCFullYear(),
            month: dt.getUTCMonth() + 1,
            day: dt.getUTCDate()
        };
    }

    /**
     * Tính số ngày Julius (Julian Day Number) từ ngày Dương lịch dd/mm/yy.
     */
    function jdFromDate(dd, mm, yy) {
        const a = INT((14 - mm) / 12);
        const y = yy + 4800 - a;
        const m = mm + 12 * a - 3;
        let jd = dd + INT((153 * m + 2) / 5) + 365 * y + INT(y / 4) - INT(y / 100) + INT(y / 400) - 32045;
        if (jd < 2299161) {
            jd = dd + INT((153 * m + 2) / 5) + 365 * y + INT(y / 4) - 32083;
        }
        return jd;
    }

    /**
     * Quy đổi Julian Day Number về ngày Dương lịch [day, month, year].
     */
    function jdToDate(jd) {
        let a, b, c;
        if (jd > 2299160) {
            a = jd + 32044;
            b = INT((4 * a + 3) / 146097);
            c = a - INT((b * 146097) / 4);
        } else {
            b = 0;
            c = jd + 32082;
        }
        const d = INT((4 * c + 3) / 1461);
        const e = c - INT((1461 * d) / 4);
        const m = INT((5 * e + 2) / 153);
        const day = e - INT((153 * m + 2) / 5) + 1;
        const month = m + 3 - 12 * INT(m / 10);
        const year = b * 100 + d - 4800 + INT(m / 10);
        return { day, month, year };
    }

    /**
     * Thời điểm Sóc (New Moon) thứ k tính từ 01/01/1900 (Jean Meeus, Astronomical Algorithms, Ch. 49).
     */
    function newMoon(k) {
        const T = k / 1236.85;
        const T2 = T * T;
        const T3 = T2 * T;
        const dr = PI / 180;
        let Jd1 = 2415020.75933 + 29.53058868 * k + 0.0001178 * T2 - 0.000000155 * T3;
        Jd1 = Jd1 + 0.00033 * Math.sin((166.56 + 132.87 * T - 0.009173 * T2) * dr);
        const M = 359.2242 + 29.10535608 * k - 0.0000333 * T2 - 0.00000347 * T3;
        const Mpr = 306.0253 + 385.81691806 * k + 0.0107306 * T2 + 0.00001236 * T3;
        const F = 21.2964 + 390.67050646 * k - 0.0016528 * T2 - 0.00000239 * T3;
        let C1 = (0.1734 - 0.000393 * T) * Math.sin(M * dr) + 0.0021 * Math.sin(2 * dr * M);
        C1 = C1 - 0.4068 * Math.sin(Mpr * dr) + 0.0161 * Math.sin(dr * 2 * Mpr);
        C1 = C1 - 0.0004 * Math.sin(dr * 3 * Mpr);
        C1 = C1 + 0.0104 * Math.sin(dr * 2 * F) - 0.0051 * Math.sin(dr * (M + Mpr));
        C1 = C1 - 0.0074 * Math.sin(dr * (M - Mpr)) + 0.0004 * Math.sin(dr * (2 * F + M));
        C1 = C1 - 0.0004 * Math.sin(dr * (2 * F - M)) - 0.0006 * Math.sin(dr * (2 * F + Mpr));
        C1 = C1 + 0.0010 * Math.sin(dr * (2 * F - Mpr)) + 0.0005 * Math.sin(dr * (2 * Mpr + M));
        let deltat;
        if (T < -11) {
            deltat = 0.001 + 0.000839 * T + 0.0002261 * T2 - 0.00000845 * T3 - 0.000000081 * T * T3;
        } else {
            deltat = -0.000278 + 0.000265 * T + 0.000262 * T2;
        }
        return Jd1 + C1 - deltat;
    }

    function getNewMoonDay(k, timeZone) {
        return INT(newMoon(k) + 0.5 + timeZone / 24);
    }

    /**
     * Kinh độ Mặt Trời (radian) tại thời điểm Julian Day jdn (Jean Meeus, Ch. 25).
     */
    function sunLongitude(jdn) {
        const T = (jdn - 2451545.0) / 36525;
        const T2 = T * T;
        const dr = PI / 180;
        const M = 357.52910 + 35999.05030 * T - 0.0001559 * T2 - 0.00000048 * T * T2;
        const L0 = 280.46645 + 36000.76983 * T + 0.0003032 * T2;
        let DL = (1.914600 - 0.004817 * T - 0.000014 * T2) * Math.sin(dr * M);
        DL = DL + (0.019993 - 0.000101 * T) * Math.sin(dr * 2 * M) + 0.000290 * Math.sin(dr * 3 * M);
        let L = L0 + DL;
        L = L * dr;
        L = L - PI * 2 * (INT(L / (PI * 2)));
        return L;
    }

    function getSunLongitude(dayNumber, timeZone) {
        return INT(sunLongitude(dayNumber - 0.5 - timeZone / 24) / PI * 6);
    }

    function getLunarMonth11(yy, timeZone) {
        const off = jdFromDate(31, 12, yy) - 2415021;
        const k = INT(off / 29.530588853);
        let nm = getNewMoonDay(k, timeZone);
        const sunLong = getSunLongitude(nm, timeZone);
        if (sunLong >= 9) {
            nm = getNewMoonDay(k - 1, timeZone);
        }
        return nm;
    }

    function getLeapMonthOffset(a11, timeZone) {
        const k = INT((a11 - 2415021.076998695) / 29.530588853 + 0.5);
        let last = 0;
        let i = 1;
        let arc = getSunLongitude(getNewMoonDay(k + i, timeZone), timeZone);
        do {
            last = arc;
            i++;
            arc = getSunLongitude(getNewMoonDay(k + i, timeZone), timeZone);
        } while (arc !== last && i < 14);
        return i - 1;
    }

    /**
     * Đổi Dương lịch → Âm lịch Việt Nam (mặc định UTC+7).
     * @returns {{ day: number, month: number, year: number, isLeap: boolean, jdn: number }}
     */
    function convertSolar2Lunar(dd, mm, yy, timeZone = VN_TIMEZONE) {
        if (!isValidSolarDate(dd, mm, yy)) {
            throw new Error(`Ngày dương lịch không hợp lệ: ${dd}/${mm}/${yy} (Tháng ${mm}/${yy} chỉ có tối đa ${daysInSolarMonth(mm, yy)} ngày).`);
        }

        const dayNumber = jdFromDate(dd, mm, yy);
        const k = INT((dayNumber - 2415021.076998695) / 29.530588853);
        let monthStart = getNewMoonDay(k + 1, timeZone);
        if (monthStart > dayNumber) {
            monthStart = getNewMoonDay(k, timeZone);
        }
        let a11 = getLunarMonth11(yy, timeZone);
        let b11 = a11;
        let lunarYear;
        if (a11 >= monthStart) {
            lunarYear = yy;
            a11 = getLunarMonth11(yy - 1, timeZone);
        } else {
            lunarYear = yy + 1;
            b11 = getLunarMonth11(yy + 1, timeZone);
        }
        const lunarDay = dayNumber - monthStart + 1;
        const diff = INT((monthStart - a11) / 29);
        let lunarLeap = false;
        let lunarMonth = diff + 11;
        if (b11 - a11 > 365) {
            const leapMonthDiff = getLeapMonthOffset(a11, timeZone);
            if (diff >= leapMonthDiff) {
                lunarMonth = diff + 10;
                if (diff === leapMonthDiff) {
                    lunarLeap = true;
                }
            }
        }
        if (lunarMonth > 12) {
            lunarMonth = lunarMonth - 12;
        }
        if (lunarMonth >= 11 && diff < 4) {
            lunarYear -= 1;
        }

        return {
            day: lunarDay,
            month: lunarMonth,
            year: lunarYear,
            isLeap: lunarLeap,
            jdn: dayNumber
        };
    }

    function getDayCanChi(dd, mm, yy) {
        const jdn = jdFromDate(dd, mm, yy);
        const canIdx = (jdn + 9) % 10;
        const chiIdx = (jdn + 1) % 12;
        return {
            canIdx,
            chiIdx,
            canName: CAN_NAMES[canIdx],
            chiName: CHI_NAMES[chiIdx],
            canChi: `${CAN_NAMES[canIdx]} ${CHI_NAMES[chiIdx]}`
        };
    }

    function getYearCanChi(lunarYear) {
        const canIdx = ((lunarYear - 4) % 10 + 10) % 10;
        const chiIdx = ((lunarYear - 4) % 12 + 12) % 12;
        return {
            canIdx,
            chiIdx,
            canName: CAN_NAMES[canIdx],
            chiName: CHI_NAMES[chiIdx],
            canChi: `${CAN_NAMES[canIdx]} ${CHI_NAMES[chiIdx]}`
        };
    }

    const api = {
        VN_TIMEZONE,
        CAN_NAMES,
        CHI_NAMES,
        isLeapSolarYear,
        daysInSolarMonth,
        isValidSolarDate,
        addDays,
        jdFromDate,
        jdToDate,
        convertSolar2Lunar,
        getDayCanChi,
        getYearCanChi
    };

    global.VnLunarCalendar = api;
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = api;
    }
})(typeof window !== 'undefined' ? window : globalThis);
