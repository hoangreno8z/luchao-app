import { applySecurityHeaders } from '../lib/security_helper.js';
import { TuViEngine } from '../lib/tu_vi_engine.js';
import '../lib/vn_lunar_calendar.js';

export default async function handler(req, res) {
    if (!applySecurityHeaders(req, res)) return;

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
        const {
            name = 'Đương Số',
            gender = 'Nam',
            calendarType = 'solar',
            isLeapMonth = false,
            solarDay = 1,
            solarMonth = 1,
            solarYear = 1990,
            lunarDay: reqLunarDay,
            lunarMonth: reqLunarMonth,
            lunarYear: reqLunarYear,
            hourIndex = 0,
            viewYear = new Date().getFullYear(),
            showSaoLuu = true,
            showDaoHongLuu = true,
            luongThiMode = false
        } = body;

        const VnCal = globalThis.VnLunarCalendar;
        let sDay = parseInt(solarDay, 10);
        let sMonth = parseInt(solarMonth, 10);
        let sYear = parseInt(solarYear, 10);
        const hIdx = parseInt(hourIndex, 10);

        if (calendarType === 'lunar') {
            const lDay = parseInt(reqLunarDay ?? solarDay, 10);
            const lMonth = parseInt(reqLunarMonth ?? solarMonth, 10);
            const lYear = parseInt(reqLunarYear ?? solarYear, 10);
            try {
                const converted = VnCal.convertLunar2Solar(lDay, lMonth, lYear, Boolean(isLeapMonth), 7);
                sDay = converted.day;
                sMonth = converted.month;
                sYear = converted.year;
            } catch (convErr) {
                return res.status(400).json({ error: convErr.message });
            }
        } else if (!VnCal.isValidSolarDate(sDay, sMonth, sYear)) {
            const maxDay = (sMonth >= 1 && sMonth <= 12) ? VnCal.daysInSolarMonth(sMonth, sYear) : 31;
            return res.status(400).json({
                error: `Ngày dương lịch không hợp lệ: ${sDay}/${sMonth}/${sYear} (Tháng ${sMonth}/${sYear} chỉ có tối đa ${maxDay} ngày).`
            });
        }

        // Giờ Tý muộn (23h-24h, hourIndex = 12): bắt buộc chuyển sang giờ Tý đầu ngày hôm sau
        const isLateZi = (hIdx === 12);
        const effSolar = isLateZi ? VnCal.addDays(sYear, sMonth, sDay, 1) : { year: sYear, month: sMonth, day: sDay };
        const effectiveHourIndex = isLateZi ? 0 : hIdx;

        // Quy đổi sang Âm lịch Việt Nam chuẩn (UTC+7 — Hồ Ngọc Đức)
        const vnLunar = VnCal.convertSolar2Lunar(effSolar.day, effSolar.month, effSolar.year, 7);

        const horoscope = TuViEngine.calculateHoroscope({
            name,
            gender,
            solarDay: sDay,
            solarMonth: sMonth,
            solarYear: sYear,
            effectiveSolarDay: effSolar.day,
            effectiveSolarMonth: effSolar.month,
            effectiveSolarYear: effSolar.year,
            lunarDay: vnLunar.day,
            lunarMonth: vnLunar.month,
            lunarYear: vnLunar.year,
            isLeap: vnLunar.isLeap,
            hourIndex: effectiveHourIndex,
            isLateZi,
            viewYear: parseInt(viewYear, 10) || new Date().getFullYear(),
            showSaoLuu,
            showDaoHongLuu,
            luongThiMode
        });

        return res.status(200).json(horoscope);
    } catch (err) {
        console.error('Tu Vi Calculation Error:', err);
        return res.status(500).json({ error: 'Lỗi máy chủ khi tính toán lá số Tử Vi: ' + err.message });
    }
}