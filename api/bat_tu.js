import { applySecurityHeaders } from '../lib/security_helper.js';
import * as lunarJs from 'lunar-javascript';
import '../lib/vn_lunar_calendar.js';
import '../lib/bat_tu_than_sat.js';
import '../lib/bat_tu_engine.js';

// Bind Lunar to global if needed
if (!globalThis.Solar && lunarJs.Solar) {
    globalThis.Solar = lunarJs.Solar;
    globalThis.Lunar = lunarJs.Lunar;
}

export default async function handler(req, res) {
    if (!applySecurityHeaders(req, res)) return;

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
        const {
            calendarType = 'solar',
            isLeapMonth = false,
            year = 1990,
            month = 2,
            day = 1,
            hour = 1,
            minute = 0,
            gender = 'nam',
            name = 'VÔ DANH KHÁCH'
        } = body;


        const engine = globalThis.BatTuEngine;
        if (!engine) {
            throw new Error('BatTuEngine not loaded');
        }

        let pYear = parseInt(year, 10);
        let pMonth = parseInt(month, 10);
        let pDay = parseInt(day, 10);
        const pHour = parseInt(hour, 10);
        const pMin = parseInt(minute, 10);

        const VnCal = globalThis.VnLunarCalendar;
        if (calendarType === 'lunar') {
            try {
                const converted = VnCal.convertLunar2Solar(pDay, pMonth, pYear, Boolean(isLeapMonth), 7);
                pDay = converted.day;
                pMonth = converted.month;
                pYear = converted.year;
            } catch (convErr) {
                return res.status(400).json({ error: convErr.message });
            }
        } else if (VnCal && !VnCal.isValidSolarDate(pDay, pMonth, pYear)) {
            const maxDay = (pMonth >= 1 && pMonth <= 12) ? VnCal.daysInSolarMonth(pMonth, pYear) : 31;
            return res.status(400).json({
                error: `Ngày dương lịch không hợp lệ: ${pDay}/${pMonth}/${pYear} (Tháng ${pMonth}/${pYear} chỉ có tối đa ${maxDay} ngày).`
            });
        }

        const data = engine.calculateBatTu(pYear, pMonth, pDay, pHour, pMin, gender, name);

        return res.status(200).json(data);
    } catch (err) {
        console.error('Bat Tu Calculation Error:', err);
        return res.status(500).json({ error: 'Lỗi máy chủ khi tính toán lá Số BÁt Tự: ' + err.message });
    }
}