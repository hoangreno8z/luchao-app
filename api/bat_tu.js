import { applySecurityHeaders } from '../lib/security_helper.js';
import * as lunarJs from 'lunar-javascript';
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

        const data = engine.calculateBatTu(
            parseInt(year, 10),
            parseInt(month, 10),
            parseInt(day, 10),
            parseInt(hour, 10),
            parseInt(minute, 10),
            gender,
            name
        );

        return res.status(200).json(data);
    } catch (err) {
        console.error('Bat Tu Calculation Error:', err);
        return res.status(500).json({ error: 'Lỗi máy chủ khi tính toán lá Số BÁt Tự: ' + err.message });
    }
}