import { applySecurityHeaders } from '../lib/security_helper.js';
import { TuViEngine } from '../lib/tu_vi_engine.js';
import { Solar } from 'lunar-javascript';

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
            solarDay = 1,
            solarMonth = 1,
            solarYear = 1990,
            hourIndex = 0,
            viewYear = 2026,
            showSaoLuu = true,
            showDaoHongLuu = true,
            luongThiMode = false
        } = body;

        let lunarDay = solarDay, lunarMonth = solarMonth, lunarYear = solarYear, isLeap = false;
        try {
            const solar = Solar.fromYmd(solarYear, solarMonth, solarDay);
            const lunar = solar.getLunar();
            lunarDay = lunar.getDay();
            lunarMonth = Math.abs(lunar.getMonth());
            lunarYear = lunar.getYear();
            isLeap = lunar.getMonth() < 0;
        } catch (err) {
            console.warn('Lunar conversion error:', err);
        }

        const horoscope = TuViEngine.calculateHoroscope({
            name,
            gender,
            solarDay, solarMonth, solarYear,
            lunarDay, lunarMonth, lunarYear, isLeap,
            hourIndex,
            viewYear,
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