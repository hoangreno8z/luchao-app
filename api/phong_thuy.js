import { applySecurityHeaders } from '../lib/security_helper.js';
import { calculateFlyingStars } from '../lib/phong_thuy/huyen_khong_engine.js';
import { calculateGua } from '../lib/phong_thuy/bat_trach_engine.js';
import { generateArchitecturalPlan } from '../lib/phong_thuy/floorplan_generator.js';

export default async function handler(req, res) {
    if (!applySecurityHeaders(req, res)) return;

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
        const {
            mode = 'empty_land', // 'empty_land' | 'existing_house'
            width = 5.0,
            length = 16.0,
            floors = 2,
            facingDegree = 180,
            buildYear = 2024,
            currentYear = 2026,
            currentMonth = 2,
            currentDay = 1,
            currentHour = 12,
            ownerYear = 1990,
            ownerGender = 'nam',
            frontLandscape = 'duong_lo',
            backLandscape = 'nha_cao',
            existingRoomsMap = {},
            roomCounts = {}
        } = body;

        // 1. Tính Tinh Bàn Huyền Không Phi Tinh (Vận 9, 24 Sơn, Niên/Nguyệt Tinh, Loan Đầu)
        const flyingStars = calculateFlyingStars({
            facingDegree: parseFloat(facingDegree) || 180,
            buildYear: parseInt(buildYear, 10) || 2024,
            currentYear: parseInt(currentYear, 10) || 2026,
            currentMonth: parseInt(currentMonth, 10) || 2,
            currentDay: parseInt(currentDay, 10) || 1,
            currentHour: parseInt(currentHour, 10) || 12,
            frontLandscape,
            backLandscape
        });

        // 2. Tính Bát Trạch Phối Mệnh Gia Chủ
        let batTrach = null;
        if (ownerYear) {
            batTrach = calculateGua(parseInt(ownerYear, 10) || 1990, ownerGender);
        }

        // 3. Tự Động Thiết Kế Mặt Bằng Kiến Trúc CAD 2D Theo Phong Thủy
        const architecturalPlan = generateArchitecturalPlan({
            mode,
            widthM: parseFloat(width) || 5.0,
            lengthM: parseFloat(length) || 16.0,
            floors: parseInt(floors, 10) || 2,
            facingDegree: parseFloat(facingDegree) || 180,
            flyingStarsData: flyingStars,
            batTrachData: batTrach,
            existingRoomsMap,
            roomCounts
        });

        return res.status(200).json({
            status: 'success',
            flyingStars,
            batTrach,
            architecturalPlan
        });
    } catch (err) {
        console.error('Phong Thuy Engine Error:', err);
        return res.status(500).json({ error: 'Lỗi máy chủ khi tính toán phong thủy kiến trúc: ' + err.message });
    }
}
