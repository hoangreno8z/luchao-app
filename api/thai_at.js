import { applySecurityHeaders } from './security_helper.js';
import fs from 'fs';
import path from 'path';
import vm from 'vm';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let thaiAtContext = null;

function getThaiAtContext() {
    if (thaiAtContext) return thaiAtContext;
    
    const context = {
        console,
        Math,
        Date,
        parseInt,
        parseFloat,
        isNaN,
        isFinite,
        Array,
        Object,
        String,
        Number,
        Boolean,
        RegExp,
        Set,
        Map
    };
    context.window = context;
    context.global = context;
    context.globalThis = context;


    vm.createContext(context);

    const scriptFiles = [
        'lunar_solar.js',
        'thai_at_reference.js',
        'phan_da_map.js',
        'thai_at_que_dich_engine.js',
        'thai_at_nhan_menh_engine.js',
        'thai_at_engine_v4.js',
        'thai_at_nguyet_engine.js',
        'thai_at_nhat_engine.js',
        'thai_at_thoi_engine.js',
        'astro_vsop87.js',
        'thai_at_astronomical_engine.js',
        'thai_at_luan_doan.js'
    ];

    for (const f of scriptFiles) {
        const p = path.join(__dirname, 'thai_at', f);
        if (fs.existsSync(p)) {
            const code = fs.readFileSync(p, 'utf8');
            vm.runInContext(code, context);
        }
    }

    thaiAtContext = context;
    return context;
}

export default async function handler(req, res) {
    if (!applySecurityHeaders(req, res)) return;

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
        const {
            mode = 'tue',
            year = 2026,
            month = 1,
            day = 1,
            hour = 0,
            engineType = 'traditional',
            gender = 'nam'
        } = body;

        const ctx = getThaiAtContext();

        const data = ctx.calculateThaiAtChart(
            mode,
            parseInt(year, 10),
            parseInt(month, 10),
            parseInt(day, 10),
            parseInt(hour, 10),
            engineType,
            gender
        );

        return res.status(200).json(data);
    } catch (err) {
        console.error('Thai At Calculation Error:', err);
        return res.status(500).json({ error: 'Lỗi máy chủ khi tính toán sa bàn Thái ất: ' + err.message });
    }
}