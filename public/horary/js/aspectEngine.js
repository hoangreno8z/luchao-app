/**
 * aspectEngine.js - Lõi Động Học Tính Góc Chiếu & Trạng Thái Tiếp Cận
 * Source: William Lilly, Christian Astrology (1647), Chapters XXIII & XXIV; Sahl ibn Bishr.
 *
 * NGUYÊN TẮC HORARY CỔ ĐIỂN:
 * 1. 5 aspect Ptolemaic chính: 0° (Trùng tụ), 60° (Lục hợp), 90° (Vuông góc), 120° (Tam hợp), 180° (Đối xung).
 * 2. Orb dựa trên tổng bán kính ánh sáng (Moiety of Bodies): Max Orb = Moiety_A + Moiety_B.
 * 3. Hỗ trợ các Named Orb Presets: LILLY_AL_BIRUNI, LILLY_CA_P107 (mặc định), SAHL_ARABIC.
 * 4. Phân định trạng thái động học bằng ĐẠO HÀM GIẢI TÍCH dE/dt tức thời.
 * 5. Giải quyết điểm phân đôi 75° (giữa Sextile 60° và Square 90°) dựa trên dấu đạo hàm dS/dt.
 * 6. Tích hợp tương thích với futureEventSolver cho giải nghiệm thiên văn thật.
 */

import { solveAspectTimeline } from './futureEventSolver.js';

export const MAJOR_ASPECTS = [
    { id: 'conjunction', nameVi: 'Đồng cung / Trùng tụ', nameEn: 'Conjunction', angle: 0, glyphKey: 'conjunction' },
    { id: 'sextile', nameVi: 'Lục hợp', nameEn: 'Sextile', angle: 60, glyphKey: 'sextile' },
    { id: 'square', nameVi: 'Vuông góc / Hình xung', nameEn: 'Square', angle: 90, glyphKey: 'square' },
    { id: 'trine', nameVi: 'Tam hợp', nameEn: 'Trine', angle: 120, glyphKey: 'trine' },
    { id: 'opposition', nameVi: 'Đối xung', nameEn: 'Opposition', angle: 180, glyphKey: 'opposition' }
];

/**
 * Danh mục Named Moiety Presets chuẩn mực cổ điển
 */
export const MOIETY_PRESETS = {
    LILLY_CA_P107: {
        id: 'LILLY_CA_P107',
        name: 'William Lilly (Christian Astrology p.107)',
        moieties: {
            sun: 8.5,
            moon: 6.25,
            mercury: 3.5,
            venus: 4.0,
            mars: 3.75,
            jupiter: 4.5,
            saturn: 4.5
        }
    },
    LILLY_AL_BIRUNI: {
        id: 'LILLY_AL_BIRUNI',
        name: 'Al-Biruni / Lilly General',
        moieties: {
            sun: 7.5,
            moon: 6.0,
            mercury: 3.5,
            venus: 3.5,
            mars: 4.0,
            jupiter: 4.5,
            saturn: 4.5
        }
    },
    SAHL_ARABIC: {
        id: 'SAHL_ARABIC',
        name: 'Sahl ibn Bishr / Arabic Classical',
        moieties: {
            sun: 7.5,
            moon: 6.0,
            mercury: 3.5,
            venus: 3.5,
            mars: 4.0,
            jupiter: 4.5,
            saturn: 4.5
        }
    }
};

// Mặc định sử dụng bảng Lilly CA p.107
export const MOIETY_OF_ORBS = MOIETY_PRESETS.LILLY_CA_P107.moieties;

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
 *
 * @param {object} pA - { id, nameVi, longitude, speedLongitude, ... }
 * @param {object} pB - { id, nameVi, longitude, speedLongitude, ... }
 * @param {object} options - { inOrbOnly: boolean, presetKey: string }
 * @returns {object|null}
 */
export function calculateAspectBetween(pA, pB, options = {}) {
    if (pA.id === pB.id) return null;

    const lonA = (pA.longitude % 360 + 360) % 360;
    const lonB = (pB.longitude % 360 + 360) % 360;
    const vA = pA.speedLongitude !== undefined ? pA.speedLongitude : 0;
    const vB = pB.speedLongitude !== undefined ? pB.speedLongitude : 0;

    // Khoảng cách góc có dấu từ B đến A [0, 360)
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

    // Chọn bảng Moiety theo preset được chỉ định
    const presetKey = options.presetKey || 'LILLY_CA_P107';
    const activeMoietyTable = (MOIETY_PRESETS[presetKey] && MOIETY_PRESETS[presetKey].moieties) || MOIETY_OF_ORBS;

    const moietyA = activeMoietyTable[pA.id] || 4.0;
    const moietyB = activeMoietyTable[pB.id] || 4.0;
    const maxOrbAllowed = moietyA + moietyB;

    // Tìm góc chiếu Ptolemaic gần nhất:
    // XỬ LÝ ĐẶC BIỆT ĐIỂM PHÂN ĐÔI 75° (giữa Sextile 60° và Square 90°):
    // Nếu S = 75°:
    // dS/dt > 0: khoảng cách đang nở rộng -> Đang hướng tới Square 90°
    // dS/dt < 0: khoảng cách đang thu hẹp -> Đang hướng tới Sextile 60°
    let closestAspect = null;
    let minError = Infinity;

    if (Math.abs(S - 75.0) < 1e-5) {
        if (dS_dt > 0) {
            closestAspect = MAJOR_ASPECTS.find(a => a.angle === 90);
            minError = 15.0;
        } else {
            closestAspect = MAJOR_ASPECTS.find(a => a.angle === 60);
            minError = 15.0;
        }
    } else {
        for (const asp of MAJOR_ASPECTS) {
            const err = Math.abs(S - asp.angle);
            if (err < minError) {
                minError = err;
                closestAspect = asp;
            }
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

    // Dự báo tức thời ban đầu (nếu chưa giải nghiệm ephemeris tương lai)
    let perfectionInfo = null;
    if (dE_dt < -1e-6) {
        const rateOfApproach = -dE_dt;
        const daysUntilExact = minError / rateOfApproach;
        const hoursUntilExact = daysUntilExact * 24;

        if (daysUntilExact > 0 && daysUntilExact <= 30) {
            const degInSignA = lonA % 30;
            const degInSignB = lonB % 30;
            const daysToIngressA = vA > 0 ? (30 - degInSignA) / vA : (vA < 0 ? degInSignA / Math.abs(vA) : Infinity);
            const daysToIngressB = vB > 0 ? (30 - degInSignB) / vB : (vB < 0 ? degInSignB / Math.abs(vB) : Infinity);
            const ingressBeforeAspect = (daysToIngressA < daysUntilExact) || (daysToIngressB < daysUntilExact);

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

    let orbDeg = Math.floor(minError);
    let orbMin = Math.floor((minError - orbDeg) * 60);
    if (orbMin >= 60) orbMin = 59;
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
 * Quét toàn bộ aspect giữa danh sách các hành tinh (đồng bộ)
 */
export function scanAllAspects(planetsList, options = {}) {
    const aspects = [];
    for (let i = 0; i < planetsList.length; i++) {
        for (let j = i + 1; j < planetsList.length; j++) {
            const asp = calculateAspectBetween(planetsList[i], planetsList[j], options);
            if (asp) {
                if (asp.inOrb || options.includeOutOfOrb) {
                    aspects.push(asp);
                }
            }
        }
    }
    aspects.sort((a, b) => a.orb - b.orb);
    return aspects;
}

/**
 * Quét toàn bộ aspect kèm giải nghiệm thiên văn tương lai bằng ephemeris thực (bất đồng bộ)
 * Tự động tính toán perfection, refranation thật và timeline sự kiện
 *
 * @param {Array<object>} planetsList 
 * @param {number} jdUT 
 * @param {object} options 
 * @returns {Promise<Array<object>>}
 */
export async function scanAllAspectsTimeline(planetsList, jdUT, options = {}) {
    const aspects = scanAllAspects(planetsList, options);

    for (const asp of aspects) {
        if (asp.state === 'APPLYING') {
            try {
                const timeline = await solveAspectTimeline(asp.planetA, asp.planetB, { angle: asp.aspectAngle, nameVi: asp.aspectNameVi }, jdUT, options);
                asp.timeline = timeline;
                asp.perfectionInfo = {
                    perfects: timeline.perfects,
                    isOutOfSign: timeline.isOutOfSign,
                    hoursUntilExact: timeline.hoursUntilExact,
                    daysUntilExact: timeline.daysUntilExact,
                    refranation: timeline.refranation,
                    refranationReason: timeline.refranationReason,
                    ingressBeforeAspect: timeline.isOutOfSign,
                    events: timeline.events,
                    description: timeline.description
                };
            } catch (err) {
                console.warn(`Không thể giải timeline cho cặp ${asp.planetA.id} - ${asp.planetB.id}:`, err);
            }
        }
    }

    return aspects;
}
