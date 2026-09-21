/**
 * timeResolver.js - Bộ Phân Giải Thời Gian Dân Dụng (Wall Time), TimeZone IANA, DST & Julian Day
 *
 * NGUYÊN TẮC BẤT DI BẤT DỊCH:
 * 1. Không tự ý cộng/trừ giờ khi gặp DST Gap (NON_EXISTENT_TIME). Phải dừng và thông báo rõ.
 * 2. Không tự động chọn ứng viên khi gặp DST Fold (AMBIGUOUS_TIME). Bắt buộc cung cấp danh sách candidate cho người dùng chọn.
 * 3. Hỗ trợ 2 chế độ lịch: GREGORIAN (Hiện đại) và JULIAN (Nghiên cứu cổ thư 1647).
 * 4. UTC Instant là nguồn chân lý duy nhất để tính Julian Day UT.
 * 5. Định dạng offset chuẩn: UTC+07:00, UTC+05:30, UTC-04:00 (không bao giờ xuất UTC+5.5:00).
 */

/**
 * Định dạng số phút lệch múi giờ thành chuỗi chuẩn UTC+HH:MM hoặc UTC-HH:MM
 * @param {number} offsetMinutes - Số phút chênh lệch so với UTC
 * @returns {string} Ví dụ: "UTC+07:00", "UTC+05:30", "UTC-04:00"
 */
export function formatOffsetSeconds(offsetSeconds) {
    if (!Number.isFinite(offsetSeconds)) return 'UTC+00:00';
    const sign = offsetSeconds >= 0 ? '+' : '-';
    const absSec = Math.abs(Math.round(offsetSeconds));
    const h = String(Math.floor(absSec / 3600)).padStart(2, '0');
    const m = String(Math.floor((absSec % 3600) / 60)).padStart(2, '0');
    const s = String(absSec % 60).padStart(2, '0');
    if (absSec % 60 === 0) {
        return `UTC${sign}${h}:${m}`;
    }
    return `UTC${sign}${h}:${m}:${s}`;
}

/**
 * Định dạng số phút lệch múi giờ thành chuỗi chuẩn UTC+HH:MM hoặc UTC-HH:MM
 * @param {number} offsetMinutes - Số phút chênh lệch so với UTC
 * @returns {string} Ví dụ: "UTC+07:00", "UTC+05:30", "UTC-04:00"
 */
export function formatOffsetMinutes(offsetMinutes) {
    if (!Number.isFinite(offsetMinutes)) return 'UTC+00:00';
    return formatOffsetSeconds(Math.round(offsetMinutes * 60));
}

/**
 * Kiểm tra tính hợp lệ của ngày dân dụng (Civil Date Validation)
 * Có nhận thức chế độ lịch: Julian (nhuận chia hết cho 4) vs Gregorian (chuẩn 400 năm)
 */
export function isValidCivilDate(year, month, day, calendarMode = 'GREGORIAN') {
    if (!Number.isFinite(year) || !Number.isFinite(month) || !Number.isFinite(day)) {
        throw new Error(`Ngày tháng không hợp lệ: year=${year}, month=${month}, day=${day}`);
    }
    if (month < 1 || month > 12) {
        throw new Error(`Tháng không hợp lệ: ${month}. Phải từ 1 đến 12.`);
    }
    const cal = String(calendarMode).toUpperCase();
    let isLeap = false;
    if (cal === 'JULIAN') {
        isLeap = (year % 4 === 0);
    } else {
        isLeap = (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
    }
    const daysInMonths = [31, isLeap ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const maxDay = daysInMonths[month - 1];
    if (day < 1 || day > maxDay) {
        throw new Error(`Ngày ${day}/${month}/${year} không tồn tại trong lịch ${cal} (Tháng ${month} năm ${year} chỉ có tối đa ${maxDay} ngày).`);
    }
    return true;
}

/**
 * Chuyển đổi nhãn ngày dân dụng Julian sang ngày dân dụng Gregorian tương ứng (Meeus Astronomical Algorithms)
 * Dùng trước khi giải múi giờ bằng Intl.DateTimeFormat (Intl sử dụng proleptic Gregorian calendar cho dữ liệu lịch sử)
 */
export function julianCivilToGregorian(y, m, d) {
    let yy = y;
    let mm = m;
    if (mm <= 2) {
        yy -= 1;
        mm += 12;
    }
    const jd = Math.floor(365.25 * (yy + 4716)) + Math.floor(30.6001 * (mm + 1)) + d - 1524.5;
    const Z = Math.floor(jd + 0.5);
    const F = (jd + 0.5) - Z;
    let A = Z;
    if (Z >= 2299161) {
        const alpha = Math.floor((Z - 1867216.25) / 36524.25);
        A = Z + 1 + alpha - Math.floor(alpha / 4);
    }
    const B = A + 1524;
    const C = Math.floor((B - 122.1) / 365.25);
    const D = Math.floor(365.25 * C);
    const E = Math.floor((B - D) / 30.6001);
    const day = B - D - Math.floor(30.6001 * E) + F;
    const month = E < 14 ? E - 1 : E - 13;
    const year = month > 2 ? C - 4716 : C - 4715;
    return { year, month, day: Math.floor(day) };
}

/**
 * Trích xuất các thành phần ngày/giờ địa phương (Wall Time) của một thời điểm UTC trong múi giờ IANA
 */
function getWallComponents(date, timeZone) {
    const dtf = new Intl.DateTimeFormat('en-US', {
        timeZone,
        year: 'numeric', month: 'numeric', day: 'numeric',
        hour: 'numeric', minute: 'numeric', second: 'numeric',
        hour12: false
    });
    const parts = {};
    for (const p of dtf.formatToParts(date)) {
        parts[p.type] = p.value;
    }
    let h = parseInt(parts.hour, 10);
    if (h === 24) h = 0;
    return {
        year: parseInt(parts.year, 10),
        month: parseInt(parts.month, 10),
        day: parseInt(parts.day, 10),
        hour: h,
        minute: parseInt(parts.minute, 10),
        second: parseInt(parts.second, 10)
    };
}

/**
 * Lấy số giờ lệch của múi giờ IANA tại một thời điểm UTC cụ thể (hỗ trợ tương thích ngược)
 */
export function getTimezoneOffsetHours(timeZone, dateObj) {
    try {
        const p = getWallComponents(dateObj, timeZone);
        const wallMs = Date.UTC(p.year, p.month - 1, p.day, p.hour, p.minute, p.second);
        return Math.round((wallMs - dateObj.getTime()) / 360000) / 10;
    } catch (_) {
        return 7;
    }
}

/**
 * Phân giải giờ dân dụng địa phương (Wall Time) sang UTC Instant duy nhất hoặc phát hiện DST Gap / Fold.
 * @param {object} params - { year, month, day, hour, minute, second, timeZone, calendarMode }
 * @returns {object}
 *   - VALID: { status: 'VALID', utcInstant: Date, offsetSeconds: number, offsetMinutes: number, formattedOffset: string, formattedUtc: string }
 *   - NON_EXISTENT_TIME: { status: 'NON_EXISTENT_TIME', message: string }
 *   - AMBIGUOUS_TIME: { status: 'AMBIGUOUS_TIME', candidates: Array<{ utcInstant: Date, offsetSeconds: number, offsetMinutes: number, label: string, formattedOffset: string, formattedUtc: string }> }
 */
export function resolveWallTimeToUtc(params) {
    // Hỗ trợ cả cú pháp truyền object { year, month, ... } và argument danh sách cũ (y, m, d, h, min, s, tz, cal)
    let year, month, day, hour, minute, second, timeZone, calendarMode;
    if (typeof params === 'object' && params !== null && !Array.isArray(params)) {
        year = parseInt(params.year, 10);
        month = parseInt(params.month, 10);
        day = parseInt(params.day, 10);
        hour = parseInt(params.hour !== undefined ? params.hour : 0, 10);
        minute = parseInt(params.minute !== undefined ? params.minute : 0, 10);
        second = parseInt(params.second !== undefined ? params.second : 0, 10);
        timeZone = params.timeZone || 'Asia/Ho_Chi_Minh';
        calendarMode = (params.calendarMode || params.calendar || 'GREGORIAN').toUpperCase();
    } else {
        year = parseInt(arguments[0], 10);
        month = parseInt(arguments[1], 10);
        day = parseInt(arguments[2], 10);
        hour = parseInt(arguments[3] !== undefined ? arguments[3] : 0, 10);
        minute = parseInt(arguments[4] !== undefined ? arguments[4] : 0, 10);
        second = parseInt(arguments[5] !== undefined ? arguments[5] : 0, 10);
        timeZone = arguments[6] || 'Asia/Ho_Chi_Minh';
        calendarMode = (arguments[7] || 'GREGORIAN').toUpperCase();
    }

    // 1. Kiểm tra tính hợp lệ của ngày dân dụng theo lịch đã chọn (Calendar-aware validation)
    isValidCivilDate(year, month, day, calendarMode);

    // 2. Nếu là lịch Julian, chuyển đổi ngày dân dụng Julian sang proleptic Gregorian trước khi giải IANA
    let effYear = year;
    let effMonth = month;
    let effDay = day;
    if (calendarMode === 'JULIAN') {
        const greg = julianCivilToGregorian(year, month, day);
        effYear = greg.year;
        effMonth = greg.month;
        effDay = greg.day;
    }

    const targetWallMs = Date.UTC(effYear, effMonth - 1, effDay, hour, minute, second);

    // Quét các offset tiềm năng của múi giờ (độ chính xác đến giây) trong khoảng +/- 14 giờ
    const candidateOffsetsSec = new Set();
    for (let testOffHours = -14; testOffHours <= 14; testOffHours += 0.5) {
        const testUtcDate = new Date(targetWallMs - testOffHours * 3600000);
        try {
            const p = getWallComponents(testUtcDate, timeZone);
            const wallMs = Date.UTC(p.year, p.month - 1, p.day, p.hour, p.minute, p.second);
            const offSec = Math.round((wallMs - testUtcDate.getTime()) / 1000);
            candidateOffsetsSec.add(offSec);
        } catch (_) {}
    }

    const matches = [];
    for (const offSec of candidateOffsetsSec) {
        const candidateUtcMs = targetWallMs - offSec * 1000;
        const candidateDate = new Date(candidateUtcMs);
        try {
            const p = getWallComponents(candidateDate, timeZone);
            if (p.year === effYear && p.month === effMonth && p.day === effDay &&
                p.hour === hour && p.minute === minute && p.second === second) {
                matches.push({
                    utcInstant: candidateDate,
                    offsetSeconds: offSec,
                    offsetMinutes: Math.round(offSec / 60),
                    formattedOffset: formatOffsetSeconds(offSec),
                    formattedUtc: candidateDate.toISOString()
                });
            }
        } catch (_) {}
    }

    // Sắp xếp thời điểm UTC sớm hơn lên trước
    matches.sort((a, b) => a.utcInstant.getTime() - b.utcInstant.getTime());

    if (matches.length === 0) {
        return {
            status: 'NON_EXISTENT_TIME',
            message: 'Giờ này không tồn tại tại địa điểm đã chọn do chuyển giờ DST.'
        };
    }

    if (matches.length === 1) {
        return {
            status: 'VALID',
            utcInstant: matches[0].utcInstant,
            offsetSeconds: matches[0].offsetSeconds,
            offsetMinutes: matches[0].offsetMinutes,
            formattedOffset: matches[0].formattedOffset,
            formattedUtc: matches[0].formattedUtc
        };
    }

    const candList = matches.map((m, idx) => ({
        ...m,
        candidateIndex: idx,
        label: idx === 0 ? 'Lần 1: Giờ mùa hè trước khi vặn lùi (Earlier)' : 'Lần 2: Giờ tiêu chuẩn sau khi vặn lùi (Later)'
    }));
    return {
        status: 'AMBIGUOUS_TIME',
        candidates: candList,
        instants: candList
    };
}

/**
 * Tính Julian Day (UT) trực tiếp từ UTC Instant và Chế độ lịch (Calendar Mode)
 * @param {Date} utcInstant - Thời điểm UTC chính xác
 * @param {string} calendarMode - 'GREGORIAN' | 'JULIAN' (giữ lại tham số để tương thích ngược)
 * @returns {number} Julian Day UT
 */
export function getJulianDayFromUtcInstant(utcInstant, calendarMode = 'GREGORIAN') {
    if (!(utcInstant instanceof Date) || isNaN(utcInstant.getTime())) {
        throw new Error('Thời điểm UTC Instant không hợp lệ để tính Julian Day');
    }
    // Chân lý thiên văn: UTC instant là một thời điểm vật lý duy nhất trong vũ trụ.
    // Julian Day UT được chuyển đổi trực tiếp từ epoch UTC một cách tuyệt đối:
    return utcInstant.getTime() / 86400000 + 2440587.5;
}

/**
 * Lấy ngày giờ hiện tại theo đúng múi giờ IANA của thành phố đang chọn
 * (Tuyệt đối không dùng đồng hồ thiết bị cục bộ của người dùng)
 * @param {string} timeZone - Múi giờ IANA (ví dụ: 'Europe/London', 'Asia/Ho_Chi_Minh')
 * @returns {object} { year, month, day, hour, minute, second }
 */
export function getNowInTimezone(timeZone = 'Asia/Ho_Chi_Minh') {
    const now = new Date();
    const p = getWallComponents(now, timeZone);
    return {
        year: p.year,
        month: p.month,
        day: p.day,
        hour: p.hour,
        minute: p.minute,
        second: p.second
    };
}

/**
 * Chức năng tương thích ngược (Fail-closed khi gặp DST gap/fold)
 */
export function localWallTimeToUtc(year, month, day, hour, minute, second = 0, timeZone = 'Asia/Ho_Chi_Minh', calendarMode = 'GREGORIAN') {
    const res = resolveWallTimeToUtc({ year, month, day, hour, minute, second, timeZone, calendarMode });
    if (res.status === 'VALID') return res.utcInstant;
    if (res.status === 'AMBIGUOUS_TIME') {
        throw new Error('Thời điểm bị trùng lặp do chuyển giờ DST (AMBIGUOUS_TIME). Phải chọn một candidate cụ thể.');
    }
    if (res.status === 'NON_EXISTENT_TIME') {
        throw new Error('Giờ này không tồn tại do chuyển giờ DST (NON_EXISTENT_TIME).');
    }
    throw new Error('Không thể phân giải thời gian: ' + (res.message || 'Lỗi không xác định'));
}

export function getTimezoneOffsetForWallTime(timeZone, year, month, day, hour, minute, second = 0, calendarMode = 'GREGORIAN') {
    const res = resolveWallTimeToUtc({ year, month, day, hour, minute, second, timeZone, calendarMode });
    if (res.status === 'VALID') return res.offsetMinutes / 60;
    if (res.status === 'AMBIGUOUS_TIME') {
        throw new Error('Thời điểm bị trùng lặp do chuyển giờ DST (AMBIGUOUS_TIME). Phải chọn một candidate cụ thể.');
    }
    if (res.status === 'NON_EXISTENT_TIME') {
        throw new Error('Giờ này không tồn tại do chuyển giờ DST (NON_EXISTENT_TIME).');
    }
    return getTimezoneOffsetHours(timeZone, new Date());
}
