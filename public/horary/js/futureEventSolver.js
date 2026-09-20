/**
 * futureEventSolver.js - Bộ Giải Nghiệm Sự Kiện Thiên Văn Tương Lai (Horary Event Solver)
 * Phục vụ chuẩn xác: Perfection, Refranation, Ingress, Out-of-sign Perfection
 * Source: William Lilly, Christian Astrology (1647), Chapters XXIII, XXIV & p.111–112.
 *
 * NGUYÊN TẮC BẤT DI BẤT DỊCH:
 * 1. Tuyệt đối KHÔNG dùng ngoại suy vận tốc tuyến tính (days = minError / rateOfApproach).
 * 2. Tại mỗi thời điểm tương lai t > t0, PHẢI TÁI TÍNH kinh độ và vận tốc thật từ Swiss Ephemeris hoặc Astronomy Engine.
 * 3. Tuyệt đối KHÔNG phụ thuộc vào mock properties (turnsRetrogradeBeforeExact, stationDays).
 * 4. Trạm dừng (Station) được phát hiện tự động khi vận tốc thật đổi dấu v(t1) * v(t2) <= 0.
 * 5. Refranation được xác lập khi station xảy ra trước exact và làm đảo chiều tiếp cận (khoảng sai bắt đầu tăng).
 * 6. Ingress trước exact không làm hủy aspect nếu vẫn perfect sau đó -> Gắn cờ PERFECTS_OUT_OF_SIGN theo tiền lệ William Lilly.
 */

import { calcBodyPositionAtJD } from './ephemerisEngine.js';
import { ZODIAC_SIGNS } from './traditionalRulers.js';

/**
 * Chuẩn hóa góc về khoảng [-180, 180)
 */
export function wrap180(theta) {
    return ((theta + 180) % 360 + 360) % 360 - 180;
}

/**
 * Xác định nhánh góc chiếu có hướng (Directed Branch)
 * Cho hai kinh độ lonA, lonB và góc aspect mong muốn alpha in {0, 60, 90, 120, 180}:
 * Tìm sigma in {+alpha, -alpha} sao cho |wrap180(lonA - lonB - sigma)| nhỏ nhất tại thời điểm t0.
 */
export function getDirectedAspectBranch(lonA, lonB, aspectAngle) {
    if (aspectAngle === 0) return 0;
    if (aspectAngle === 180) return 180;

    const errPlus = Math.abs(wrap180(lonA - lonB - aspectAngle));
    const errMinus = Math.abs(wrap180(lonA - lonB + aspectAngle));

    return errPlus <= errMinus ? aspectAngle : -aspectAngle;
}

/**
 * Tìm nghiệm exact aspect f(t) = wrap180(lonA(t) - lonB(t) - sigma) = 0 trong khoảng [a, b]
 * sử dụng phương pháp chia đôi (Bisection) với độ chính xác thời gian < 10^-6 ngày (< 0.08 giây)
 */
export async function bisectAspectRoot(bodyIdA, bodyIdB, sigma, a, b, options = {}) {
    async function evalF(t) {
        const pA = await calcBodyPositionAtJD(bodyIdA, t, options);
        const pB = await calcBodyPositionAtJD(bodyIdB, t, options);
        return wrap180(pA.longitude - pB.longitude - sigma);
    }

    let left = a;
    let right = b;
    let fLeft = await evalF(left);

    for (let iter = 0; iter < 45; iter++) {
        const mid = (left + right) / 2;
        const fMid = await evalF(mid);

        if (Math.abs(fMid) < 1e-7 || (right - left) < 1e-6) {
            return { jd: mid, error: Math.abs(fMid) };
        }

        // ƯU TIÊN TOÁN TỬ: Luôn dùng ((fa * fmid) <= 0)
        if ((fLeft * fMid) <= 0) {
            right = mid;
        } else {
            left = mid;
            fLeft = fMid;
        }
    }

    const finalMid = (left + right) / 2;
    const finalErr = Math.abs(await evalF(finalMid));
    return { jd: finalMid, error: finalErr };
}

/**
 * Tìm thời điểm trạm dừng chính xác v(t) = 0 của một hành tinh trong khoảng [a, b]
 */
export async function bisectStationRoot(bodyId, a, b, options = {}) {
    async function evalSpeed(t) {
        const p = await calcBodyPositionAtJD(bodyId, t, options);
        return p.speedLongitude;
    }

    let left = a;
    let right = b;
    let vLeft = await evalSpeed(left);

    for (let iter = 0; iter < 40; iter++) {
        const mid = (left + right) / 2;
        const vMid = await evalSpeed(mid);

        if (Math.abs(vMid) < 1e-6 || (right - left) < 1e-6) {
            return mid;
        }

        if ((vLeft * vMid) <= 0) {
            right = mid;
        } else {
            left = mid;
            vLeft = vMid;
        }
    }

    return (left + right) / 2;
}

/**
 * Tìm thời điểm đổi cung (Ingress) chính xác của một hành tinh trong khoảng [a, b]
 */
export async function bisectIngressRoot(bodyId, targetBoundaryLon, a, b, options = {}) {
    async function evalDist(t) {
        const p = await calcBodyPositionAtJD(bodyId, t, options);
        return wrap180(p.longitude - targetBoundaryLon);
    }

    let left = a;
    let right = b;
    let dLeft = await evalDist(left);

    for (let iter = 0; iter < 40; iter++) {
        const mid = (left + right) / 2;
        const dMid = await evalDist(mid);

        if (Math.abs(dMid) < 1e-6 || (right - left) < 1e-6) {
            return mid;
        }

        if ((dLeft * dMid) <= 0) {
            right = mid;
        } else {
            left = mid;
            dLeft = dMid;
        }
    }

    return (left + right) / 2;
}

/**
 * Giải toàn diện timeline sự kiện thiên văn tương lai (Perfection, Stations, Ingresses, Refranation)
 *
 * @param {object} pA - Hành tinh A { id, nameVi, longitude, speedLongitude, ... }
 * @param {object} pB - Hành tinh B { id, nameVi, longitude, speedLongitude, ... }
 * @param {object} aspect - Góc chiếu { id, nameVi, angle, ... }
 * @param {number} jd0 - Julian Day UT hiện tại
 * @param {object} options - { maxDays: number, preferredEngine: 'swiss'|'astronomy' }
 * @returns {Promise<object>} Timeline chi tiết và trạng thái hoàn thành góc
 */
export async function solveAspectTimeline(pA, pB, aspect, jd0, options = {}) {
    const maxDays = options.maxDays || 14.0;
    const stepDays = 0.05; // 1.2 giờ mỗi bước quét
    const totalSteps = Math.ceil(maxDays / stepDays);

    const bodyIdA = pA.id;
    const bodyIdB = pB.id;
    const aspectAngle = aspect.angle;

    // 1. Xác định nhánh góc chiếu có hướng sigma tại t0
    const sigma = getDirectedAspectBranch(pA.longitude, pB.longitude, aspectAngle);

    async function evalAspectDiff(t) {
        const posA = await calcBodyPositionAtJD(bodyIdA, t, options);
        const posB = await calcBodyPositionAtJD(bodyIdB, t, options);
        return wrap180(posA.longitude - posB.longitude - sigma);
    }

    let exactRoot = null;
    const stationEvents = [];
    const ingressEvents = [];
    const allEvents = [];

    // Trạng thái ở bước k
    let prevT = jd0;
    let prevDiff = await evalAspectDiff(prevT);
    let prevPosA = await calcBodyPositionAtJD(bodyIdA, prevT, options);
    let prevPosB = await calcBodyPositionAtJD(bodyIdB, prevT, options);

    let prevSignA = Math.floor(prevPosA.longitude / 30) % 12;
    let prevSignB = Math.floor(prevPosB.longitude / 30) % 12;

    for (let k = 1; k <= totalSteps; k++) {
        const currT = jd0 + k * stepDays;
        const currDiff = await evalAspectDiff(currT);
        const currPosA = await calcBodyPositionAtJD(bodyIdA, currT, options);
        const currPosB = await calcBodyPositionAtJD(bodyIdB, currT, options);

        // a. Kiểm tra trạm dừng (Station) của Hành tinh A
        if (bodyIdA !== 'sun' && bodyIdA !== 'moon' && !bodyIdA.includes('Node')) {
            if ((prevPosA.speedLongitude * currPosA.speedLongitude) <= 0 && Math.abs(currPosA.speedLongitude - prevPosA.speedLongitude) > 1e-4) {
                const tStat = await bisectStationRoot(bodyIdA, prevT, currT, options);
                const posAtStat = await calcBodyPositionAtJD(bodyIdA, tStat, options);
                const statEvent = {
                    type: 'STATION',
                    planetId: bodyIdA,
                    planetNameVi: pA.nameVi,
                    jd: tStat,
                    hoursFromNow: (tStat - jd0) * 24,
                    daysFromNow: tStat - jd0,
                    longitude: posAtStat.longitude,
                    stationType: currPosA.speedLongitude < 0 ? 'STATION_RETROGRADE' : 'STATION_DIRECT'
                };
                stationEvents.push(statEvent);
                allEvents.push(statEvent);
            }
        }

        // b. Kiểm tra trạm dừng (Station) của Hành tinh B
        if (bodyIdB !== 'sun' && bodyIdB !== 'moon' && !bodyIdB.includes('Node')) {
            if ((prevPosB.speedLongitude * currPosB.speedLongitude) <= 0 && Math.abs(currPosB.speedLongitude - prevPosB.speedLongitude) > 1e-4) {
                const tStat = await bisectStationRoot(bodyIdB, prevT, currT, options);
                const posAtStat = await calcBodyPositionAtJD(bodyIdB, tStat, options);
                const statEvent = {
                    type: 'STATION',
                    planetId: bodyIdB,
                    planetNameVi: pB.nameVi,
                    jd: tStat,
                    hoursFromNow: (tStat - jd0) * 24,
                    daysFromNow: tStat - jd0,
                    longitude: posAtStat.longitude,
                    stationType: currPosB.speedLongitude < 0 ? 'STATION_RETROGRADE' : 'STATION_DIRECT'
                };
                stationEvents.push(statEvent);
                allEvents.push(statEvent);
            }
        }

        // c. Kiểm tra Ingress của Hành tinh A
        const currSignA = Math.floor(currPosA.longitude / 30) % 12;
        if (currSignA !== prevSignA) {
            const targetBoundary = (currPosA.speedLongitude >= 0 ? currSignA * 30 : prevSignA * 30);
            const tIngress = await bisectIngressRoot(bodyIdA, targetBoundary, prevT, currT, options);
            const fromSignName = ZODIAC_SIGNS[prevSignA].nameVi;
            const toSignName = ZODIAC_SIGNS[currSignA].nameVi;
            const ingEvent = {
                type: 'INGRESS',
                planetId: bodyIdA,
                planetNameVi: pA.nameVi,
                fromSign: prevSignA,
                toSign: currSignA,
                fromSignName,
                toSignName,
                jd: tIngress,
                hoursFromNow: (tIngress - jd0) * 24,
                daysFromNow: tIngress - jd0
            };
            ingressEvents.push(ingEvent);
            allEvents.push(ingEvent);
        }

        // d. Kiểm tra Ingress của Hành tinh B
        const currSignB = Math.floor(currPosB.longitude / 30) % 12;
        if (currSignB !== prevSignB) {
            const targetBoundary = (currPosB.speedLongitude >= 0 ? currSignB * 30 : prevSignB * 30);
            const tIngress = await bisectIngressRoot(bodyIdB, targetBoundary, prevT, currT, options);
            const fromSignName = ZODIAC_SIGNS[prevSignB].nameVi;
            const toSignName = ZODIAC_SIGNS[currSignB].nameVi;
            const ingEvent = {
                type: 'INGRESS',
                planetId: bodyIdB,
                planetNameVi: pB.nameVi,
                fromSign: prevSignB,
                toSign: currSignB,
                fromSignName,
                toSignName,
                jd: tIngress,
                hoursFromNow: (tIngress - jd0) * 24,
                daysFromNow: tIngress - jd0
            };
            ingressEvents.push(ingEvent);
            allEvents.push(ingEvent);
        }

        // e. Kiểm tra kẹp nghiệm Exact Aspect Root: wrap180(lonA - lonB - sigma) = 0
        if (!exactRoot) {
            if ((prevDiff * currDiff) <= 0 && Math.abs(currDiff - prevDiff) < 90) {
                const root = await bisectAspectRoot(bodyIdA, bodyIdB, sigma, prevT, currT, options);
                exactRoot = root;
                allEvents.push({
                    type: 'EXACT_PERFECTION',
                    jd: root.jd,
                    hoursFromNow: (root.jd - jd0) * 24,
                    daysFromNow: root.jd - jd0,
                    aspectNameVi: aspect.nameVi,
                    aspectAngle: aspect.angle
                });
                // Nếu đã tìm thấy exact root và đã quét qua nó, ta dừng quét thêm sau 1 ngày nữa
                // để kiểm tra xem có station nào ngay trước đó không
            }
        }

        // Nếu đã có exactRoot và đã quét vượt quá exactRoot 0.5 ngày, có thể dừng sớm
        if (exactRoot && currT > exactRoot.jd + 0.5) {
            break;
        }

        prevT = currT;
        prevDiff = currDiff;
        prevPosA = currPosA;
        prevPosB = currPosB;
        prevSignA = currSignA;
        prevSignB = currSignB;
    }

    // Sắp xếp sự kiện theo thời gian JD tăng dần
    allEvents.sort((a, b) => a.jd - b.jd);

    // =========================================================================
    // PHÂN TÍCH REFRANATION & OUT-OF-SIGN THEO CHUẨN THIÊN VĂN THỰC
    // =========================================================================
    let status = 'NO_PERFECTION_IN_WINDOW';
    let refranation = false;
    let refranationReason = '';
    let isOutOfSign = false;
    let description = '';

    // Kiểm tra xem có trạm dừng nào xảy ra TRƯỚC exactRoot (hoặc xảy ra khi chưa đạt exact) không
    if (stationEvents.length > 0) {
        for (const st of stationEvents) {
            if (!exactRoot || st.jd < exactRoot.jd) {
                // Kiểm tra động học ngay sau trạm dừng: khoảng cách có bị đảo chiều khiến không đạt exact không?
                const testT1 = st.jd;
                const testT2 = Math.min(st.jd + 0.1, jd0 + maxDays);
                const diff1 = Math.abs(await evalAspectDiff(testT1));
                const diff2 = Math.abs(await evalAspectDiff(testT2));

                if (diff2 > diff1) {
                    // Khoảng sai tăng lên -> Hành tinh quay đầu làm phân ly -> REFRANATION thực sự!
                    refranation = true;
                    refranationReason = `${st.planetNameVi} đứng trạm và đổi chiều sau ${st.hoursFromNow.toFixed(1)}h (${st.daysFromNow.toFixed(2)} ngày), quay đầu rời xa khiến góc chiếu bị phá vỡ (Refranation).`;
                    status = 'REFRANATION';
                    break;
                }
            }
        }
    }

    if (!refranation && exactRoot) {
        // Kiểm tra Ingress xảy ra trước Exact Root
        const ingBeforeExact = ingressEvents.filter(ing => ing.jd < exactRoot.jd);
        if (ingBeforeExact.length > 0) {
            status = 'PERFECTS_OUT_OF_SIGN';
            isOutOfSign = true;
            const ingNames = ingBeforeExact.map(i => `${i.planetNameVi} sang ${i.toSignName} (sau ${i.hoursFromNow.toFixed(1)}h)`).join(', ');
            description = `[OUT-OF-SIGN PERFECTION] Đạt góc chính xác sau ${((exactRoot.jd - jd0) * 24).toFixed(1)}h (~${(exactRoot.jd - jd0).toFixed(2)} ngày), sau khi ${ingNames}. William Lilly coi đây là sự việc vẫn thành nhưng hoàn cảnh biến đổi.`;
        } else {
            status = 'PERFECTS';
            description = `Đạt góc chính xác (Perfection) sau ${((exactRoot.jd - jd0) * 24).toFixed(1)} giờ (~${(exactRoot.jd - jd0).toFixed(2)} ngày) trong cùng cung hoàng đạo.`;
        }
    } else if (refranation) {
        description = `[REFRANATION] ${refranationReason}`;
    } else {
        description = `Không đạt góc chính xác (Perfection) trong phạm vi quét ${maxDays} ngày tới.`;
    }

    const hoursUntilExact = exactRoot ? (exactRoot.jd - jd0) * 24 : null;
    const daysUntilExact = exactRoot ? (exactRoot.jd - jd0) : null;

    return {
        status,
        perfects: (status === 'PERFECTS' || status === 'PERFECTS_OUT_OF_SIGN'),
        isOutOfSign,
        changeOfCondition: isOutOfSign,
        refranation,
        refranationReason,
        exactJD: exactRoot ? exactRoot.jd : null,
        hoursUntilExact: hoursUntilExact !== null ? hoursUntilExact.toFixed(1) : null,
        daysUntilExact: daysUntilExact !== null ? daysUntilExact.toFixed(2) : null,
        events: allEvents,
        ingressEvents,
        stationEvents,
        description
    };
}
