/**
 * aspectEngine.js - Lõi Động Học Tính Góc Chiếu & Điểm Hoàn Thành (Perfection)
 * Source: William Lilly, Christian Astrology (1647), Chapter XXIII & XXIV; Sahl ibn Bishr.
 *
 * NGUYÊN TẮC HORARY CỔ ĐIỂN:
 * 1. 5 aspect Horary chính: 0° (Trùng tụ), 60° (Lục hợp), 90° (Vuông góc), 120° (Tam hợp), 180° (Đối xung).
 * 2. TUYỆT ĐỐI KHÔNG dùng giới hạn Orb cố định theo aspect (bỏ defaultMaxOrb).
 *    Dùng hoàn toàn tổng bán kính ánh sáng (Moiety of Bodies): Max Orb = Moiety_A + Moiety_B.
 * 3. Phân định trạng thái động học bằng ĐẠO HÀM GIẢI TÍCH dE/dt tức thời,
 *    không dùng bước tiến cố định để tránh nhảy qua góc đối với Mặt Trăng.
 * 4. 5 trạng thái động học tường minh:
 *    - APPROACHING_OUT_OF_ORB: Đang tiến tới nhưng ngoài Orb
 *    - APPLYING: Đang tiến tới trong Orb
 *    - EXACT: Đạt góc chính xác tiệm cận 0
 *    - SEPARATING: Đã rời xa trong Orb
 *    - SEPARATED_OUT_OF_ORB: Đã rời xa ngoài Orb
 * 5. Bộ giải nghiệm thời gian Perfection và phát hiện Refranation (quay đầu trước khi thành góc), Ingress.
 */

export const MAJOR_ASPECTS = [
    { id: 'conjunction', nameVi: 'Đồng cung / Trùng tụ', nameEn: 'Conjunction', angle: 0, glyphKey: 'conjunction' },
    { id: 'sextile', nameVi: 'Lục hợp', nameEn: 'Sextile', angle: 60, glyphKey: 'sextile' },
    { id: 'square', nameVi: 'Vuông góc / Hình xung', nameEn: 'Square', angle: 90, glyphKey: 'square' },
    { id: 'trine', nameVi: 'Tam hợp', nameEn: 'Trine', angle: 120, glyphKey: 'trine' },
    { id: 'opposition', nameVi: 'Đối xung', nameEn: 'Opposition', angle: 180, glyphKey: 'opposition' }
];

// Bán kính ánh sáng (Moiety of Orb) chuẩn kinh điển theo William Lilly (Christian Astrology p.107)
export const MOIETY_OF_ORBS = {
    sun: 8.5,       // Toàn vòng 17° -> Bán phần 8.5°
    moon: 6.25,     // Toàn vòng 12.5° -> Bán phần 6.25°
    mercury: 3.5,   // Toàn vòng 7° -> Bán phần 3.5°
    venus: 4.0,     // Toàn vòng 8° -> Bán phần 4.0°
    mars: 3.75,     // Toàn vòng 7.5° -> Bán phần 3.75°
    jupiter: 4.5,   // Toàn vòng 9° -> Bán phần 4.5°
    saturn: 4.5     // Toàn vòng 9° -> Bán phần 4.5°
};

/**
 * Tính khoảng cách góc ngắn nhất giữa hai kinh độ trên vòng tròn 360° [0, 180]
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
 * sử dụng đạo hàm giải tích dE/dt tức thời.
 * @param {object} pA - { id, nameVi, longitude, speedLongitude, ... }
 * @param {object} pB - { id, nameVi, longitude, speedLongitude, ... }
 * @param {object} options - { inOrbOnly: boolean }
 * @returns {object|null}
 */
export function calculateAspectBetween(pA, pB, options = {}) {
    if (pA.id === pB.id) return null;

    const lonA = (pA.longitude % 360 + 360) % 360;
    const lonB = (pB.longitude % 360 + 360) % 360;
    const vA = pA.speedLongitude !== undefined ? pA.speedLongitude : 0;
    const vB = pB.speedLongitude !== undefined ? pB.speedLongitude : 0;

    // Khoảng cách góc có dấu từ B đến A
    let deltaLon = (lonA - lonB) % 360;
    if (deltaLon < 0) deltaLon += 360;

    // Khoảng cách góc ngắn nhất S và đạo hàm dS/dt
    let S = 0;
    let dS_dt = 0;
    if (deltaLon <= 180) {
        S = deltaLon;
        dS_dt = vA - vB;
    } else {
        S = 360 - deltaLon;
        dS_dt = -(vA - vB); // tương đương vB - vA
    }

    // Tính Orb tối đa cho phép = Tổng Moieties của hai thiên thể (Lilly CA p.107)
    const moietyA = MOIETY_OF_ORBS[pA.id] || 4.0;
    const moietyB = MOIETY_OF_ORBS[pB.id] || 4.0;
    const maxOrbAllowed = moietyA + moietyB;

    // Tìm góc chiếu Ptolemaic gần nhất
    let closestAspect = null;
    let minError = Infinity;

    for (const asp of MAJOR_ASPECTS) {
        const err = Math.abs(S - asp.angle);
        if (err < minError) {
            minError = err;
            closestAspect = asp;
        }
    }

    if (!closestAspect) return null;

    const inOrb = minError <= maxOrbAllowed;
    if (options.inOrbOnly && !inOrb) {
        return null;
    }

    // =========================================================================
    // ĐẠO HÀM GIẢI TÍCH dE/dt CỦA SAI SỐ GÓC (ANALYTICAL DERIVATIVE)
    // E = |S - alpha|
    // Khi S > alpha: dE/dt = dS/dt
    // Khi S < alpha: dE/dt = -dS/dt
    // dE/dt < 0: Khoảng sai đang giảm -> Tiến tới (Applying / Approaching)
    // dE/dt > 0: Khoảng sai đang tăng -> Rời xa (Separating / Separated)
    // =========================================================================
    const diffFromAspect = S - closestAspect.angle;
    let dE_dt = 0;

    if (Math.abs(diffFromAspect) < 1e-7) {
        dE_dt = 0;
    } else if (diffFromAspect > 0) {
        dE_dt = dS_dt;
    } else {
        dE_dt = -dS_dt;
    }

    // =========================================================================
    // 5 TRẠNG THÁI ĐỘNG HỌC HORARY TƯỜNG MINH
    // =========================================================================
    const exactThreshold = 0.005; // 18 arcseconds

    let state = 'SEPARATING';
    let stateVi = 'Đã rời xa';
    let stateClass = 'separating';
    let explanation = '';

    if (minError <= exactThreshold) {
        state = 'EXACT';
        stateVi = 'Chính xác';
        stateClass = 'exact';
        explanation = 'Góc chiếu hiện đang đạt độ chính xác tuyệt đối (sai số tiệm cận 0).';
    } else if (inOrb) {
        if (dE_dt < -1e-6) {
            state = 'APPLYING';
            stateVi = 'Đang tiến tới';
            stateClass = 'applying';
            explanation = 'Khoảng sai tới góc chính xác đang giảm dần theo vận tốc giải tích thực. Đây là góc chiếu Đang Tiến Tới (Applying), biểu thị sự việc sắp diễn ra.';
        } else if (dE_dt > 1e-6) {
            state = 'SEPARATING';
            stateVi = 'Đã rời xa';
            stateClass = 'separating';
            explanation = 'Góc chiếu chính xác đã đi qua và khoảng sai đang tăng dần. Đây là góc chiếu Đã Rời Xa (Separating), biểu thị sự việc đã hoàn thành hoặc đã qua đi.';
        } else {
            state = 'STATIONARY_ASPECT';
            stateVi = 'Đứng trạm tại góc';
            stateClass = 'stationary';
            explanation = 'Vận tốc tương đối giữa hai hành tinh tiệm cận 0 tại thời điểm hiện tại.';
        }
    } else {
        // Ngoài phạm vi Orb
        if (dE_dt < -1e-6) {
            state = 'APPROACHING_OUT_OF_ORB';
            stateVi = 'Tiến tới (ngoài Orb)';
            stateClass = 'approaching-out';
            explanation = 'Hai hành tinh đang tiến về góc chiếu này nhưng hiện khoảng cách sai số còn vượt quá tổng Moieties cho phép.';
        } else {
            state = 'SEPARATED_OUT_OF_ORB';
            stateVi = 'Rời xa (ngoài Orb)';
            stateClass = 'separated-out';
            explanation = 'Góc chiếu này đã đi qua và hiện đã rời xa vượt ra ngoài phạm vi Orb.';
        }
    }

    // =========================================================================
    // BẢNG KIỂM CHỨNG CHUYỂN ĐỘNG (-6 GIỜ, HIỆN TẠI, +6 GIỜ)
    // =========================================================================
    const dt6h = 0.25; // 6 giờ = 0.25 ngày
    const pastLonA = (lonA - vA * dt6h + 360) % 360;
    const pastLonB = (lonB - vB * dt6h + 360) % 360;
    const pastDist = getAngularDistance(pastLonA, pastLonB);

    const nextLonA = (lonA + vA * dt6h + 360) % 360;
    const nextLonB = (lonB + vB * dt6h + 360) % 360;
    const nextDist = getAngularDistance(nextLonA, nextLonB);

    const motionSteps = [
        { label: '-6 giờ', separation: pastDist.toFixed(2) + '°' },
        { label: 'Hiện tại', separation: S.toFixed(2) + '°' },
        { label: '+6 giờ', separation: nextDist.toFixed(2) + '°' },
        { label: 'Exact chuẩn', separation: closestAspect.angle + '°' }
    ];

    // =========================================================================
    // BỘ GIẢI NGHIỆM THỜI GIAN PERFECTION & KIỂM TRA REFRANATION / INGRESS
    // =========================================================================
    let perfectionInfo = null;
    if (dE_dt < -1e-6) {
        const rateOfApproach = -dE_dt; // Tốc độ thu hẹp khoảng sai (độ/ngày)
        const daysUntilExact = minError / rateOfApproach;
        const hoursUntilExact = daysUntilExact * 24;

        if (daysUntilExact > 0 && daysUntilExact <= 30) {
            // Kiểm tra Ingress trước khi đạt exact
            const degInSignA = lonA % 30;
            const degInSignB = lonB % 30;
            const daysToIngressA = vA > 0 ? (30 - degInSignA) / vA : (vA < 0 ? degInSignA / Math.abs(vA) : Infinity);
            const daysToIngressB = vB > 0 ? (30 - degInSignB) / vB : (vB < 0 ? degInSignB / Math.abs(vB) : Infinity);
            const ingressBeforeAspect = (daysToIngressA < daysUntilExact) || (daysToIngressB < daysUntilExact);

            // Kiểm tra Refranation (quay đầu trước khi thành góc)
            let refranation = false;
            let refranationReason = '';

            if (pA.turnsRetrogradeBeforeExact || pB.turnsRetrogradeBeforeExact) {
                refranation = true;
                refranationReason = 'Hành tinh quay đầu nghịch hành trước khi hoàn thành góc (Refranation).';
            } else if (pA.stationDays !== undefined && pA.stationDays < daysUntilExact) {
                refranation = true;
                refranationReason = `${pA.nameVi} đứng trạm và đổi chiều sau ${pA.stationDays.toFixed(1)} ngày, phá vỡ góc chiếu.`;
            } else if (pB.stationDays !== undefined && pB.stationDays < daysUntilExact) {
                refranation = true;
                refranationReason = `${pB.nameVi} đứng trạm và đổi chiều sau ${pB.stationDays.toFixed(1)} ngày, phá vỡ góc chiếu.`;
            }

            let desc = '';
            if (refranation) {
                desc = `[REFRANATION] Dự kiến tiến sát sau ~${hoursUntilExact.toFixed(1)}h nhưng bị phá vỡ vì hành tinh đứng trạm/đổi chiều trước khi chạm đỉnh.`;
            } else if (ingressBeforeAspect) {
                desc = `[INGRESS] Dự kiến tới exact sau ~${hoursUntilExact.toFixed(1)}h, nhưng hành tinh đổi cung trước khi hoàn thành góc.`;
            } else {
                desc = `Dự kiến đạt góc chính xác sau khoảng ${hoursUntilExact.toFixed(1)} giờ (~${daysUntilExact.toFixed(1)} ngày) nếu duy trì vận tốc thực.`;
            }

            perfectionInfo = {
                perfects: !refranation && !ingressBeforeAspect,
                hoursUntilExact: hoursUntilExact.toFixed(1),
                daysUntilExact: daysUntilExact.toFixed(2),
                dEdT: dE_dt,
                refranation,
                refranationReason,
                ingressBeforeAspect,
                description: desc
            };
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
        currentSeparation: S,
        orb: minError,
        orbFormatted,
        maxOrbAllowed,
        moietyA,
        moietyB,
        inOrb,
        dEdT: dE_dt,
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
 * Mặc định trả về các góc trong Orb; hỗ trợ tùy chọn bao gồm góc approaching ngoài orb.
 * @param {Array<object>} planetsList
 * @param {object} options - { includeOutOfOrb: boolean }
 * @returns {Array<object>} Danh sách các góc chiếu
 */
export function scanAllAspects(planetsList, options = {}) {
    const aspects = [];
    for (let i = 0; i < planetsList.length; i++) {
        for (let j = i + 1; j < planetsList.length; j++) {
            const asp = calculateAspectBetween(planetsList[i], planetsList[j]);
            if (asp) {
                if (asp.inOrb || options.includeOutOfOrb) {
                    aspects.push(asp);
                }
            }
        }
    }
    // Sắp xếp theo Orb nhỏ nhất lên đầu
    aspects.sort((a, b) => a.orb - b.orb);
    return aspects;
}
