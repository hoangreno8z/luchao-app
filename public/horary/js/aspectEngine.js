/**
 * aspectEngine.js - Lõi Động Học Tính Góc Chiếu & Điểm Hoàn Thành (Perfection)
 * Source: William Lilly, Christian Astrology (1647), Chapter XXIII & XXIV.
 *
 * QUY TẮC BẮT BUỘC:
 * 1. Chỉ dùng 5 aspect Horary chính: 0° (Trùng tụ), 60° (Lục hợp), 90° (Vuông góc), 120° (Tam hợp), 180° (Đối xung).
 * 2. TUYỆT ĐỐI KHÔNG dùng so sánh độ ngây thơ (planetA.degree < planetB.degree).
 * 3. Phân định Applying (Đang tiến tới) vs Separating (Đã rời xa) dựa trên đạo hàm biến thiên sai số d(error)/dt thực.
 * 4. Xử lý chuẩn xác hiện tượng crossing 0° Bạch Dương, nghịch hành và trạm dừng.
 * 5. Bảng kiểm chứng chuyển động (-6h, 0h, +6h) và tìm điểm Perfection.
 */

export const MAJOR_ASPECTS = [
    { id: 'conjunction', nameVi: 'Đồng cung / Trùng tụ', nameEn: 'Conjunction', angle: 0, glyphKey: 'conjunction', defaultMaxOrb: 8.5 },
    { id: 'sextile', nameVi: 'Lục hợp', nameEn: 'Sextile', angle: 60, glyphKey: 'sextile', defaultMaxOrb: 6.0 },
    { id: 'square', nameVi: 'Vuông góc / Hình xung', nameEn: 'Square', angle: 90, glyphKey: 'square', defaultMaxOrb: 7.5 },
    { id: 'trine', nameVi: 'Tam hợp', nameEn: 'Trine', angle: 120, glyphKey: 'trine', defaultMaxOrb: 8.0 },
    { id: 'opposition', nameVi: 'Đối xung', nameEn: 'Opposition', angle: 180, glyphKey: 'opposition', defaultMaxOrb: 8.5 }
];

// Bán kính ánh sáng (Moiety of Orb) truyền thống theo William Lilly CA p.107
export const MOIETY_OF_ORBS = {
    sun: 8.5,       // Toàn vòng 17° -> Bán phần 8.5°
    moon: 6.25,     // Toàn vòng 12.5° -> Bán phần 6.25°
    mercury: 3.5,   // Toàn vòng 7° -> Bán phần 3.5°
    venus: 4.0,     // Toàn vòng 8° -> Bán phần 4.0°
    mars: 3.75,     // Toàn vòng 7.5° -> Bán phần 3.75°
    jupiter: 5.0,   // Toàn vòng 10° -> Bán phần 5.0°
    saturn: 5.0     // Toàn vòng 10° -> Bán phần 5.0°
};

/**
 * Tính khoảng cách góc ngắn nhất giữa hai kinh độ trên vòng tròn 360°
 * Xử lý hoàn hảo bước nhảy qua 0° Bạch Dương (ví dụ 359° và 1° -> 2°)
 */
export function getAngularDistance(lon1, lon2) {
    let diff = Math.abs(lon1 - lon2) % 360;
    if (diff > 180) {
        diff = 360 - diff;
    }
    return diff;
}

/**
 * Tính góc chiếu giữa hai hành tinh và xác định trạng thái Applying/Separating động
 * @param {object} pA - { id, nameVi, longitude, speedLongitude }
 * @param {object} pB - { id, nameVi, longitude, speedLongitude }
 * @returns {object|null} Chi tiết góc chiếu nếu nằm trong Orb
 */
export function calculateAspectBetween(pA, pB) {
    if (pA.id === pB.id) return null;

    const currentDist = getAngularDistance(pA.longitude, pB.longitude);

    // Tính Orb tối đa cho phép theo trung bình Moiety của hai hành tinh
    const moietyA = MOIETY_OF_ORBS[pA.id] || 4.0;
    const moietyB = MOIETY_OF_ORBS[pB.id] || 4.0;
    const maxOrbAllowed = moietyA + moietyB;

    let closestAspect = null;
    let minError = Infinity;

    for (const asp of MAJOR_ASPECTS) {
        const err = Math.abs(currentDist - asp.angle);
        if (err < minError) {
            minError = err;
            closestAspect = asp;
        }
    }

    // Nếu khoảng sai vượt quá Orb cho phép -> Không có aspect
    if (!closestAspect || minError > Math.min(closestAspect.defaultMaxOrb, maxOrbAllowed)) {
        return null;
    }

    // =========================================================================
    // THUẬT TOÁN ĐỘNG HỌC: d(error)/dt
    // Tính khoảng cách tại t + dt (dt = 0.005 ngày ≈ 7.2 phút)
    // =========================================================================
    const dt = 0.005; // ngày
    const futureLonA = (pA.longitude + (pA.speedLongitude || 0) * dt + 360) % 360;
    const futureLonB = (pB.longitude + (pB.speedLongitude || 0) * dt + 360) % 360;
    const futureDist = getAngularDistance(futureLonA, futureLonB);
    const futureError = Math.abs(futureDist - closestAspect.angle);

    let state = 'SEPARATING';
    let stateVi = 'Đã rời xa';
    let stateClass = 'separating';
    let explanation = '';

    const exactThreshold = 0.005; // 18 arcseconds

    if (minError < exactThreshold) {
        state = 'EXACT';
        stateVi = 'Chính xác';
        stateClass = 'exact';
        explanation = 'Góc chiếu hiện đang đạt độ chính xác tuyệt đối (sai số tiệm cận 0).';
    } else if (futureError < minError) {
        state = 'APPLYING';
        stateVi = 'Đang tiến tới';
        stateClass = 'applying';
        explanation = 'Theo chuyển động thực của hai hành tinh, khoảng sai tới góc chính xác đang giảm dần. Đây là góc chiếu Đang Tiến Tới (Applying), biểu thị sự việc sắp diễn ra.';
    } else {
        state = 'SEPARATING';
        stateVi = 'Đã rời xa';
        stateClass = 'separating';
        explanation = 'Góc chiếu chính xác đã đi qua và khoảng sai hiện đang tăng dần. Đây là góc chiếu Đã Rời Xa (Separating), biểu thị sự việc đã hoàn thành hoặc đã qua đi.';
    }

    // =========================================================================
    // BẢNG KIỂM CHỨNG CHUYỂN ĐỘNG (-6 GIỜ, HIỆN TẠI, +6 GIỜ)
    // =========================================================================
    const dt6h = 0.25; // 6 giờ = 0.25 ngày
    const pastLonA = (pA.longitude - (pA.speedLongitude || 0) * dt6h + 360) % 360;
    const pastLonB = (pB.longitude - (pB.speedLongitude || 0) * dt6h + 360) % 360;
    const pastDist = getAngularDistance(pastLonA, pastLonB);

    const nextLonA = (pA.longitude + (pA.speedLongitude || 0) * dt6h + 360) % 360;
    const nextLonB = (pB.longitude + (pB.speedLongitude || 0) * dt6h + 360) % 360;
    const nextDist = getAngularDistance(nextLonA, nextLonB);

    const motionSteps = [
        { label: '-6 giờ', separation: pastDist.toFixed(2) + '°' },
        { label: 'Hiện tại', separation: currentDist.toFixed(2) + '°' },
        { label: '+6 giờ', separation: nextDist.toFixed(2) + '°' },
        { label: 'Exact chuẩn', separation: closestAspect.angle + '°' }
    ];

    // =========================================================================
    // TÍNH ĐIỂM PERFECTION (THỜI GIAN ĐẠT GÓC CHÍNH XÁC)
    // =========================================================================
    let perfectionInfo = null;
    if (state === 'APPLYING') {
        const ratePerDay = (futureDist - currentDist) / dt; // độ/ngày
        const distNeeded = closestAspect.angle - currentDist;

        if (Math.abs(ratePerDay) > 0.0001) {
            const daysUntilExact = distNeeded / ratePerDay;
            if (daysUntilExact > 0 && daysUntilExact < 30) {
                const hoursUntilExact = daysUntilExact * 24;
                perfectionInfo = {
                    perfects: true,
                    hoursUntilExact: hoursUntilExact.toFixed(1),
                    daysUntilExact: daysUntilExact.toFixed(2),
                    description: `Dự kiến đạt góc chính xác sau khoảng ${hoursUntilExact.toFixed(1)} giờ (~${daysUntilExact.toFixed(1)} ngày) nếu giữ nguyên vận tốc hiện tại.`
                };
            }
        }
    }

    const orbDeg = Math.floor(minError);
    const orbMin = Math.round((minError - orbDeg) * 60);
    const orbFormatted = `${orbDeg}°${String(orbMin).padStart(2, '0')}′`;

    return {
        planetA: pA,
        planetB: pB,
        aspectId: closestAspect.id,
        aspectNameVi: closestAspect.nameVi,
        aspectNameEn: closestAspect.nameEn,
        aspectAngle: closestAspect.angle,
        aspectGlyphKey: closestAspect.glyphKey,
        currentSeparation: currentDist,
        orb: minError,
        orbFormatted,
        state,
        stateVi,
        stateClass,
        explanation,
        motionSteps,
        perfectionInfo
    };
}

/**
 * Quét toàn bộ aspect giữa danh sách các hành tinh
 * @param {Array<object>} planetsList
 * @returns {Array<object>} Danh sách các góc chiếu hợp lệ
 */
export function scanAllAspects(planetsList) {
    const aspects = [];
    for (let i = 0; i < planetsList.length; i++) {
        for (let j = i + 1; j < planetsList.length; j++) {
            const asp = calculateAspectBetween(planetsList[i], planetsList[j]);
            if (asp) {
                aspects.push(asp);
            }
        }
    }
    // Sắp xếp góc chiếu theo độ chính xác của Orb (Orb nhỏ nhất lên đầu)
    aspects.sort((a, b) => a.orb - b.orb);
    return aspects;
}
