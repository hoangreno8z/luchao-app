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
export function formatOffsetMinutes(offsetMinutes) {
    if (!Number.isFinite(offsetMinutes)) return 'UTC+00:00';
    const sign = offsetMinutes >= 0 ? '+' : '-';
    const absMin = Math.abs(offsetMinutes);
    const h = String(Math.floor(absMin / 60)).padStart(2, '0');
    const m = String(Math.round(absMin % 60)).padStart(2, '0');
    return `UTC${sign}${h}:${m}`;
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
 * @param {object} params - { year, month, day, hour, minute, second, timeZone }
 * @returns {object}
 *   - VALID: { status: 'VALID', utcInstant: Date, offsetMinutes: number, formattedOffset: string, formattedUtc: string }
 *   - NON_EXISTENT_TIME: { status: 'NON_EXISTENT_TIME', message: string }
 *   - AMBIGUOUS_TIME: { status: 'AMBIGUOUS_TIME', candidates: Array<{ utcInstant: Date, offsetMinutes: number, label: string, formattedOffset: string, formattedUtc: string }> }
 */
export function resolveWallTimeToUtc(params) {
    // Hỗ trợ cả cú pháp truyền object { year, month, ... } và argument danh sách cũ (y, m, d, h, min, s, tz)
    let year, month, day, hour, minute, second, timeZone;
    if (typeof params === 'object' && params !== null && !Array.isArray(params)) {
        year = parseInt(params.year, 10);
        month = parseInt(params.month, 10);
        day = parseInt(params.day, 10);
        hour = parseInt(params.hour || 0, 10);
        minute = parseInt(params.minute || 0, 10);
        second = parseInt(params.second || 0, 10);
        timeZone = params.timeZone || 'Asia/Ho_Chi_Minh';
    } else {
        year = parseInt(arguments[0], 10);
        month = parseInt(arguments[1], 10);
        day = parseInt(arguments[2], 10);
        hour = parseInt(arguments[3] || 0, 10);
        minute = parseInt(arguments[4] || 0, 10);
        second = parseInt(arguments[5] || 0, 10);
        timeZone = arguments[6] || 'Asia/Ho_Chi_Minh';
    }

    if (!Number.isFinite(year) || !Number.isFinite(month) || !Number.isFinite(day)) {
        throw new Error(`Ngày tháng không hợp lệ: year=${year}, month=${month}, day=${day}`);
    }

    const targetWallMs = Date.UTC(year, month - 1, day, hour, minute, second);

    // Quét các offset tiềm năng của múi giờ trong khoảng +/- 14 giờ xung quanh ngày này
    const candidateOffsets = new Set();
    for (let testOffHours = -14; testOffHours <= 14; testOffHours += 0.5) {
        const testUtcDate = new Date(targetWallMs - testOffHours * 3600000);
        try {
            const p = getWallComponents(testUtcDate, timeZone);
            const wallMs = Date.UTC(p.year, p.month - 1, p.day, p.hour, p.minute, p.second);
            const offMin = Math.round((wallMs - testUtcDate.getTime()) / 60000);
            candidateOffsets.add(offMin);
        } catch (_) {}
    }

    const matches = [];
    for (const offMin of candidateOffsets) {
        const candidateUtcMs = targetWallMs - offMin * 60000;
        const candidateDate = new Date(candidateUtcMs);
        try {
            const p = getWallComponents(candidateDate, timeZone);
            if (p.year === year && p.month === month && p.day === day &&
                p.hour === hour && p.minute === minute && p.second === second) {
                matches.push({
                    utcInstant: candidateDate,
                    offsetMinutes: offMin,
                    formattedOffset: formatOffsetMinutes(offMin),
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
 * @param {string} calendarMode - 'GREGORIAN' | 'JULIAN'
 * @returns {number} Julian Day UT
 */
export function getJulianDayFromUtcInstant(utcInstant, calendarMode = 'GREGORIAN') {
    if (!(utcInstant instanceof Date) || isNaN(utcInstant.getTime())) {
        throw new Error('Thời điểm UTC Instant không hợp lệ để tính Julian Day');
    }

    const year = utcInstant.getUTCFullYear();
    const month = utcInstant.getUTCMonth() + 1;
    const day = utcInstant.getUTCDate();
    const hour = utcInstant.getUTCHours();
    const minute = utcInstant.getUTCMinutes();
    const second = utcInstant.getUTCSeconds() + utcInstant.getUTCMilliseconds() / 1000;

    const decimalDay = day + (hour + minute / 60 + second / 3600) / 24;
    let y = year;
    let m = month;

    if (m <= 2) {
        y -= 1;
        m += 12;
    }

    let B = 0;
    if (String(calendarMode).toUpperCase() === 'GREGORIAN') {
        const A = Math.floor(y / 100);
        B = 2 - A + Math.floor(A / 4);
    }

    const jd = Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + decimalDay + B - 1524.5;
    return jd;
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
 * Chức năng tương thích ngược
 */
export function localWallTimeToUtc(year, month, day, hour, minute, second = 0, timeZone = 'Asia/Ho_Chi_Minh') {
    const res = resolveWallTimeToUtc({ year, month, day, hour, minute, second, timeZone });
    if (res.status === 'VALID') return res.utcInstant;
    if (res.status === 'AMBIGUOUS_TIME') return res.candidates[0].utcInstant;
    return new Date(Date.UTC(year, month - 1, day, hour, minute, second));
}

export function getTimezoneOffsetForWallTime(timeZone, year, month, day, hour, minute, second = 0) {
    const res = resolveWallTimeToUtc({ year, month, day, hour, minute, second, timeZone });
    if (res.status === 'VALID') return res.offsetMinutes / 60;
    if (res.status === 'AMBIGUOUS_TIME') return res.candidates[0].offsetMinutes / 60;
    return getTimezoneOffsetHours(timeZone, new Date());
}
