import { applySecurityHeaders } from '../lib/security_helper.js';
import { calculateFlyingStars } from '../lib/phong_thuy/huyen_khong_engine.js';
import { calculateGua } from '../lib/phong_thuy/bat_trach_engine.js';
import { generateParametricFloorplan } from '../lib/phong_thuy/layout_engine.js';
import { calculateFengShuiSpatial } from '../lib/phong_thuy/fengshui_spatial_engine.js';

export default async function handler(req, res) {
    if (!applySecurityHeaders(req, res)) return;

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
        const {
            mode = 'empty_land',
            width = 5.0,
            length = 16.0,
            floors = 2,
            facingDegree = 180,
            buildYear = 2025,
            ownerYear = 1990,
            ownerGender = 'nam',
            frontLandscape = 'duong_lo',
            backLandscape = 'nha_cao',
            roomCounts = {}
        } = body;

        // 1. Tính Tinh Bàn Huyền Không Phi Tinh
        const flyingStars = calculateFlyingStars({
            facingDegree: parseFloat(facingDegree) || 180,
            buildYear: parseInt(buildYear, 10) || 2025,
            frontLandscape,
            backLandscape
        });

        // 2. Tính Bát Trạch Phối Mệnh Gia Chủ
        let batTrach = null;
        if (ownerYear) {
            batTrach = calculateGua(parseInt(ownerYear, 10) || 1990, ownerGender);
        }

        // 3. Tự Động Thiết Kế Mặt Bằng Kiến Trúc Parametric CAD (Millimeter)
        const parametricGeometry = generateParametricFloorplan({
            mode,
            widthM: parseFloat(width) || 5.0,
            lengthM: parseFloat(length) || 16.0,
            floors: parseInt(floors, 10) || 2,
            facingDegree: parseFloat(facingDegree) || 180,
            roomCounts
        });

        // 4. Tính Toán Lớp Phủ Cửu Cung Không Gian
        const spatialFengShui = calculateFengShuiSpatial(parametricGeometry, {
            facingDegree: parseFloat(facingDegree) || 180,
            buildYear: parseInt(buildYear, 10) || 2025,
            ownerYear: parseInt(ownerYear, 10) || 1990,
            ownerGender
        });

        return res.status(200).json({
            status: 'success',
            flyingStars,
            batTrach,
            parametricGeometry,
            spatialFengShui
        });
    } catch (err) {
        console.error('Phong Thuy Engine Error:', err);
        return res.status(500).json({ error: 'Lỗi tính toán phong thủy kiến trúc: ' + err.message });
    }
}
