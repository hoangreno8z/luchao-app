/**
 * ephemerisEngine.js - Lõi Tính Toán Thiên Văn Horary Đa Tầng Chuẩn Xác
 * Chuẩn mực Canonical: Swiss Ephemeris 2.10.03 qua WebAssembly (@kuntay/swisseph) nạp cục bộ
 *
 * NGUYÊN TẮC BẤT DI BẤT DỊCH:
 * 1. Tropical Zodiac, Geocentric positions.
 * 2. Hệ nhà Regiomontanus (mã 'R'): Swiss Ephemeris là nguồn duy nhất (Fail-Closed, không dùng fake fallback).
 * 3. Phân định nhà bằng Swiss Mundane House Position (_swe_house_pos), chính xác tuyệt đối ngay cả ở vĩ độ cao.
 * 4. 7 hành tinh truyền thống + La Hầu / Kế Đô (Mean Node IAU theo William Lilly).
 * 5. Nam Giao Điểm (South Node): d(sn)/dt = d(nn)/dt, kinh độ (nn + 180) % 360.
 * 6. Giao dịch toàn vẹn (Transactional Safety): Không bao giờ xuất xưởng lá số với dữ liệu hành tinh bị khuyết thiếu.
 * 7. Sect: True Unrefracted Solar Altitude (ngưỡng 0°, có cờ borderline < 1°).
 * 8. Pars Fortunae: William Lilly CA p.143 (ASC + Moon - Sun cho cả Ngày và Đêm).
 * 9. Quy tắc 5° Đỉnh Nhà (Lilly CA pp.33, 151): Giữ nguyên houseNumber hình học, cung cấp cuspInfluence.
 */

import { getZodiacPosition, formatZodiacDms, PLANETS_INFO } from './traditionalRulers.js';

let sweInstance = null;
let currentEphemerisSource = 'Chưa khởi tạo';

/**
 * Lấy đối tượng Astronomy Engine (hỗ trợ cả Node.js ESM/CJS và Trình duyệt)
 */
export async function getAstronomyEngine() {
    if (typeof globalThis !== 'undefined' && globalThis.Astronomy) {
        return globalThis.Astronomy;
    }
    if (typeof window !== 'undefined' && window.Astronomy) {
        return window.Astronomy;
    }

    const isNode = typeof process !== 'undefined' && process.versions && process.versions.node;
    if (isNode) {
        try {
            const fs = await import('fs');
            const path = await import('path');
            const cwd = process.cwd();
            const possiblePaths = [
                path.resolve(cwd, 'vendor/astronomy.browser.min.js'),
                path.resolve(cwd, 'public/vendor/astronomy.browser.min.js'),
                path.resolve(cwd, '../vendor/astronomy.browser.min.js')
            ];
            for (const p of possiblePaths) {
                if (fs.existsSync(p)) {
                    const code = fs.readFileSync(p, 'utf8');
                    const fn = new Function('require', 'module', 'exports', code);
                    const m = { exports: {} };
                    fn(() => {}, m, m.exports);
                    globalThis.Astronomy = m.exports;
                    return globalThis.Astronomy;
                }
            }
        } catch (e) {
            console.warn('Không thể nạp Astronomy Engine qua Node.js:', e);
        }
    }

    return null;
}

/**
 * Khởi tạo Swiss Ephemeris WebAssembly từ bản bundle cục bộ
 */
export async function initEphemerisEngine() {
    if (sweInstance) return sweInstance;

    try {
        const isNode = typeof process !== 'undefined' && process.versions && process.versions.node;

        if (isNode) {
            let swisseph = null;
            try {
                swisseph = await import('@kuntay/swisseph');
            } catch (e1) {
                try {
                    swisseph = await import('../../vendor/swisseph/dist/index.js');
                } catch (e2) {
                    swisseph = await import('./vendor/swisseph/dist/index.js');
                }
            }

            sweInstance = await swisseph.createSwissEph();

            try {
                const fs = await import('fs');
                const path = await import('path');
                const ephePath = path.resolve(process.cwd(), 'node_modules/@kuntay/swisseph-data/ephe');
                if (fs.existsSync(ephePath)) {
                    sweInstance.mountEphemerisDirectory(ephePath);
                    currentEphemerisSource = 'Swiss Ephemeris 2.10.03 (DE441 Full Precision)';
                } else {
                    currentEphemerisSource = 'Swiss Ephemeris 2.10.03 (Moshier Engine WASM)';
                }
            } catch (e) {
                currentEphemerisSource = 'Swiss Ephemeris 2.10.03 (Moshier Engine WASM)';
            }
        } else {
            // Môi trường trình duyệt
            try {
                let swisseph = null;
                try {
                    swisseph = await import('../../vendor/swisseph/dist/index.js');
                } catch (errRel) {
                    swisseph = await import('/vendor/swisseph/dist/index.js');
                }

                sweInstance = await swisseph.createSwissEph();
                currentEphemerisSource = 'Swiss Ephemeris 2.10.03 (Moshier Engine WASM)';
            } catch (errBrowser) {
                console.warn('WASM Swiss Ephemeris không khả dụng trên trình duyệt:', errBrowser);
                sweInstance = null;
                currentEphemerisSource = 'Swiss Ephemeris Không Khả Dụng';
            }
        }
    } catch (err) {
        console.warn('Không thể khởi tạo Swiss Ephemeris WASM:', err);
        sweInstance = null;
        currentEphemerisSource = 'Swiss Ephemeris Không Khả Dụng';
    }

    return sweInstance;
}

/**
 * Chuyển đổi ngày giờ địa phương thành Julian Day (UT)
 */
export function getJulianDayUT(year, month, day, hour, minute, second, utcOffsetHours = 7, calendar = 'GREGORIAN') {
    const decimalLocalHour = hour + minute / 60 + second / 3600;
    const decimalUTHour = decimalLocalHour - utcOffsetHours;

    let y = year;
    let m = month;
    let d = day + decimalUTHour / 24;

    if (m <= 2) {
        y -= 1;
        m += 12;
    }

    let B = 0;
    if (String(calendar).toUpperCase() === 'GREGORIAN') {
        const A = Math.floor(y / 100);
        B = 2 - A + Math.floor(A / 4);
    }

    const jd = Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + d + B - 1524.5;
    return jd;
}

/**
 * Xác định vị trí nhà hình học 3D (Mundane House Position) bằng Swiss Ephemeris swe_house_pos
 * Chính xác tuyệt đối cho hệ Regiomontanus (mã 'R'), hoạt động hoàn hảo cả ở vĩ độ cực cao
 * @returns {{ houseNumber: number, exactHousePos: number } | null}
 */
export function getSwissHousePosition(swe, armc, geolat, eps, lon, lat = 0) {
    if (swe && swe.raw && swe.raw._swe_house_pos) {
        const raw = swe.raw;
        const swe_house_pos = raw.cwrap('swe_house_pos', 'number', ['number', 'number', 'number', 'number', 'number', 'number']);
        const xpinPtr = raw._malloc(16);
        const serrPtr = raw._malloc(256);
        try {
            raw.setValue(xpinPtr, lon, 'double');
            raw.setValue(xpinPtr + 8, lat, 'double');
            const hpos = swe_house_pos(armc, geolat, eps, 82 /* 'R' */, xpinPtr, serrPtr);
            let hNum = Math.floor(hpos);
            hNum = ((hNum - 1) % 12 + 12) % 12 + 1;
            return { houseNumber: hNum, exactHousePos: hpos };
        } catch (e) {
            console.warn('Lỗi gọi swe_house_pos:', e);
        } finally {
            raw._free(xpinPtr);
            raw._free(serrPtr);
        }
    }
    return null;
}

/**
 * Tính tọa độ kinh độ và vận tốc của một thiên thể tại thời điểm Julian Day bất kỳ
 */
export async function calcBodyPositionAtJD(bodyId, jdUT, options = {}) {
    if (!sweInstance && options.preferredEngine !== 'astronomy') {
        await initEphemerisEngine();
    }

    if (bodyId === 'southNode') {
        const nn = await calcBodyPositionAtJD('northNode', jdUT, options);
        return {
            longitude: (nn.longitude + 180) % 360,
            speedLongitude: nn.speedLongitude,
            latitude: -nn.latitude,
            distance: nn.distance
        };
    }

    const nodeType = options.nodeType || 'MEAN';
    const swissBodyMap = {
        sun: 0,
        moon: 1,
        mercury: 2,
        venus: 3,
        mars: 4,
        jupiter: 5,
        saturn: 6,
        northNode: nodeType === 'TRUE' ? 11 : 10
    };

    if (sweInstance && options.preferredEngine !== 'astronomy') {
        try {
            const bodyCode = swissBodyMap[bodyId];
            if (bodyCode !== undefined) {
                const pos = sweInstance.calc(jdUT, bodyCode);
                return {
                    longitude: (pos.longitude % 360 + 360) % 360,
                    speedLongitude: pos.longitudeSpeed,
                    latitude: pos.latitude,
                    distance: pos.distance
                };
            }
        } catch (e) {
            // Chuyển tiếp sang Astronomy Engine
        }
    }

    // Astronomy Engine Fallback (VSOP87 / NOVAS) cho tương lai / so sánh
    const ast = await getAstronomyEngine();
    if (!ast) {
        throw new Error(`Không thể tính tọa độ thiên văn cho ${bodyId} tại JD=${jdUT}: Không có engine khả dụng.`);
    }

    const dateMs = (jdUT - 2440587.5) * 86400000;
    const time = ast.MakeTime(new Date(dateMs));
    const dt = 0.0005;
    const timePlus = ast.MakeTime(new Date(dateMs + dt * 86400000));

    if (bodyId === 'northNode') {
        const calcNodeLon = (jd) => {
            const tVal = (jd - 2451545.0) / 36525.0;
            let omega = 125.04452 - 1934.136261 * tVal + 0.0020708 * tVal * tVal + (tVal * tVal * tVal) / 450000;
            return ((omega % 360) + 360) % 360;
        };
        const lon1 = calcNodeLon(jdUT);
        const lon2 = calcNodeLon(jdUT + dt);
        let dLon = lon2 - lon1;
        while (dLon > 180) dLon -= 360;
        while (dLon < -180) dLon += 360;
        return {
            longitude: lon1,
            speedLongitude: dLon / dt,
            latitude: 0,
            distance: 1
        };
    }

    function getCoords(bId, t) {
        if (bId === 'sun') {
            const pos = ast.SunPosition(t);
            return { lon: pos.elon, lat: pos.elat, dist: pos.vec.Length() };
        }
        if (bId === 'moon') {
            const vMoon = ast.GeoMoon(t);
            const ecl = ast.Ecliptic(vMoon);
            return { lon: ecl.elon, lat: ecl.elat, dist: ecl.vec ? ecl.vec.Length() : 0.00257 };
        }
        const nameMap = { mercury: 'Mercury', venus: 'Venus', mars: 'Mars', jupiter: 'Jupiter', saturn: 'Saturn' };
        const astName = nameMap[bId];
        if (!astName) return null;
        const vec = ast.GeoVector(astName, t, true);
        const ecl = ast.Ecliptic(vec);
        return { lon: ecl.elon, lat: ecl.elat, dist: ecl.vec ? ecl.vec.Length() : 1 };
    }

    const c1 = getCoords(bodyId, time);
    const c2 = getCoords(bodyId, timePlus);
    if (!c1 || !c2) {
        throw new Error(`Không tìm thấy dữ liệu thiên thể cho ${bodyId}`);
    }

    let dLon = c2.lon - c1.lon;
    while (dLon > 180) dLon -= 360;
    while (dLon < -180) dLon += 360;
    const speed = dLon / dt;

    return {
        longitude: (c1.lon % 360 + 360) % 360,
        speedLongitude: speed,
        latitude: c1.lat,
        distance: c1.dist
    };
}

/**
 * Tính toán toàn bộ lá số Horary Canonical
 * Áp dụng Transactional Safety: Nếu bất kỳ phần tử nào khuyết thiếu, throw Error và dừng hẳn.
 */
export async function calculateHoraryChart(params) {
    const {
        year, month, day,
        hour = 0, minute = 0, second = 0,
        latitude = 21.0285, longitude = 105.8542,
        utcOffset = 7, locationName = 'Hà Nội',
        calendar = 'GREGORIAN',
        nodeType = 'MEAN'
    } = params;

    const jdUT = getJulianDayUT(year, month, day, hour, minute, second, utcOffset, calendar);

    if (!sweInstance) {
        await initEphemerisEngine();
    }

    if (!sweInstance) {
        throw new Error('Lỗi nghiêm trọng: Swiss Ephemeris WebAssembly không khả dụng. Hệ thống từ chối tính toán lá số Horary bằng công thức xấp xỉ để bảo vệ tính chính xác canonical!');
    }

    // Body IDs trong Swiss Ephemeris
    const swissBodyMap = {
        sun: 0,
        moon: 1,
        mercury: 2,
        venus: 3,
        mars: 4,
        jupiter: 5,
        saturn: 6,
        northNode: nodeType === 'TRUE' ? 11 : 10
    };

    // =========================================================================
    // 1. TRANSACTIONAL STAGING CHO HỆ NHÀ REGIOMONTANUS
    // =========================================================================
    let candidateHouses = null;
    let candidateSunAltitude = null;
    let trueObliquity = 23.439;

    try {
        const houseData = sweInstance.houses(jdUT, latitude, longitude, 'R');
        if (!houseData || !houseData.cusps || houseData.cusps.length < 12) {
            throw new Error('Dữ liệu đỉnh nhà Swiss Ephemeris trả về không đủ 12 nhà');
        }

        // Kiểm tra tính hữu hạn của tọa độ các đỉnh nhà
        for (let i = 0; i < 12; i++) {
            if (!Number.isFinite(houseData.cusps[i])) {
                throw new Error(`Đỉnh nhà ${i + 1} không phải số hữu hạn hợp lệ`);
            }
        }

        // Lấy độ nghiêng hoàng đạo thực
        try {
            const obl = sweInstance.obliquity(jdUT);
            trueObliquity = obl.trueObliquity;
        } catch (eObl) {
            trueObliquity = 23.4392911 - 0.0130042 * ((jdUT - 2451545.0) / 36525.0);
        }

        candidateHouses = {
            system: 'Regiomontanus (Canonical Swiss Ephemeris)',
            systemCode: 'R',
            ascendant: houseData.ascendant,
            midheaven: houseData.midheaven,
            descendant: houseData.descendant,
            imumCoeli: houseData.imumCoeli,
            armc: houseData.armc,
            vertex: houseData.vertex,
            cusps: houseData.cusps.slice(0, 12),
            cuspsFormatted: houseData.cusps.slice(0, 12).map(c => formatZodiacDms(c).formatted)
        };

        // Độ cao hình học không khúc xạ của Mặt Trời (True Unrefracted Solar Altitude)
        const sunHor = sweInstance.horizontal(jdUT, 0, latitude, longitude);
        candidateSunAltitude = sunHor.altitude;
    } catch (errHouses) {
        throw new Error(`Lỗi tính hệ nhà Regiomontanus Canonical: ${errHouses.message}`);
    }

    // =========================================================================
    // 2. TRANSACTIONAL STAGING CHO 7 HÀNH TINH + GIAO ĐIỂM
    // =========================================================================
    const candidatePlanets = [];
    const requiredPlanetIds = ['sun', 'moon', 'mercury', 'venus', 'mars', 'jupiter', 'saturn', 'northNode', 'southNode'];

    for (const pInfo of PLANETS_INFO) {
        if (pInfo.isNode && pInfo.id === 'southNode') {
            const nn = candidatePlanets.find(p => p.id === 'northNode');
            if (!nn) {
                throw new Error('Không tìm thấy Bắc Giao Điểm để suy diễn Nam Giao Điểm');
            }
            const snLon = (nn.longitude + 180) % 360;
            const pos = getZodiacPosition(snLon);
            candidatePlanets.push({
                id: 'southNode',
                nameVi: pInfo.nameVi,
                nameEn: pInfo.nameEn,
                glyphKey: pInfo.glyphKey,
                longitude: snLon,
                latitude: -nn.latitude,
                distance: nn.distance,
                speedLongitude: nn.speedLongitude,
                motion: 'RETROGRADE',
                motionVi: 'Nghịch hành',
                motionGlyphKey: 'retrograde',
                isRetrograde: true,
                isStationary: false,
                formattedSpeed: `${nn.speedLongitude >= 0 ? '+' : ''}${nn.speedLongitude.toFixed(2)}°/ngày`,
                ...pos
            });
            continue;
        }

        const bodyCode = swissBodyMap[pInfo.id];
        if (bodyCode === undefined) continue;

        const posData = sweInstance.calc(jdUT, bodyCode);
        if (!posData || !Number.isFinite(posData.longitude) || !Number.isFinite(posData.longitudeSpeed)) {
            throw new Error(`Tọa độ hoặc vận tốc không hợp lệ cho hành tinh ${pInfo.id}`);
        }

        const pos = getZodiacPosition(posData.longitude);
        const speed = posData.longitudeSpeed;
        const threshold = pInfo.speedStationaryThreshold || 0.001;

        let motion = 'DIRECT';
        let motionVi = 'Thuận hành';
        let motionGlyphKey = 'direct';
        let isRetrograde = false;
        let isStationary = false;

        if (Math.abs(speed) <= threshold) {
            motion = 'STATIONARY';
            motionVi = 'Đứng / Trạm';
            motionGlyphKey = 'stationary';
            isStationary = true;
        } else if (speed < -threshold) {
            motion = 'RETROGRADE';
            motionVi = 'Nghịch hành';
            motionGlyphKey = 'retrograde';
            isRetrograde = true;
        }

        candidatePlanets.push({
            id: pInfo.id,
            nameVi: pInfo.nameVi,
            nameEn: pInfo.nameEn,
            glyphKey: pInfo.glyphKey,
            longitude: posData.longitude,
            latitude: posData.latitude,
            distance: posData.distance,
            speedLongitude: speed,
            motion,
            motionVi,
            motionGlyphKey,
            isRetrograde,
            isStationary,
            formattedSpeed: `${speed >= 0 ? '+' : ''}${speed.toFixed(2)}°/ngày`,
            ...pos
        });
    }

    // Kiểm tra tính toàn vẹn tuyệt đối: đủ 9 đối tượng (7 hành tinh + 2 nodes)
    const isComplete = requiredPlanetIds.every(id => candidatePlanets.some(p => p.id === id));
    if (!isComplete || candidatePlanets.length < 9) {
        throw new Error('Danh sách hành tinh không đầy đủ, hủy bỏ xuất lá số');
    }

    // =========================================================================
    // 3. GÁN NHÀ HÌNH HỌC (SWISS MUNDANE HOUSE POSITION) & QUY TẮC 5° LILLY
    // =========================================================================
    for (const p of candidatePlanets) {
        // Ưu tiên 1: Mundane House Position từ Swiss Ephemeris swe_house_pos
        const swissHPos = getSwissHousePosition(sweInstance, candidateHouses.armc, latitude, trueObliquity, p.longitude, 0);
        let geomHouse = swissHPos ? swissHPos.houseNumber : getHouseOfLongitude(p.longitude, candidateHouses.cusps);

        // Khoảng cách tới đỉnh nhà kế tiếp
        const nextCuspIndex = geomHouse % 12;
        const nextCuspLon = candidateHouses.cusps[nextCuspIndex];
        let distToNextCusp = (nextCuspLon - p.longitude + 360) % 360;
        const isWithin5Deg = distToNextCusp <= 5.0;

        // KIẾN TRÚC CHUẨN: houseNumber = geometricHouseNumber (không bị ghi đè!)
        p.geometricHouseNumber = geomHouse;
        p.houseNumber = geomHouse;
        p.cuspInfluence = {
            nextHouse: (geomHouse % 12) + 1,
            distanceDeg: Math.round(distToNextCusp * 100) / 100,
            withinFiveDegreeRule: isWithin5Deg
        };
        p.isWithinFiveDegreeCusp = isWithin5Deg;
        p.distanceToNextCusp = Math.round(distToNextCusp * 100) / 100;
        p.traditionalHouseNumber = isWithin5Deg ? (geomHouse % 12) + 1 : geomHouse;
    }

    // Phân định Sect (Day/Night Chart) dựa trên True Unrefracted Solar Altitude
    const isDayChart = candidateSunAltitude >= 0;
    const isBorderlineSect = Math.abs(candidateSunAltitude) < 1.0;

    // Tính Điểm May Mắn (Pars Fortunae) theo William Lilly CA Book I, Ch. XXIII (p.143)
    const moonObj = candidatePlanets.find(p => p.id === 'moon');
    const sunObj = candidatePlanets.find(p => p.id === 'sun');
    let partOfFortune = null;

    if (moonObj && sunObj && candidateHouses) {
        const lillyPofLon = (candidateHouses.ascendant + moonObj.longitude - sunObj.longitude + 720) % 360;
        const pofPos = getZodiacPosition(lillyPofLon);
        const pofSwissHPos = getSwissHousePosition(sweInstance, candidateHouses.armc, latitude, trueObliquity, lillyPofLon, 0);
        const pofGeomHouse = pofSwissHPos ? pofSwissHPos.houseNumber : getHouseOfLongitude(lillyPofLon, candidateHouses.cusps);
        const pofNextCusp = candidateHouses.cusps[pofGeomHouse % 12];
        const pofDistToNext = (pofNextCusp - lillyPofLon + 360) % 360;
        const pofIs5Deg = pofDistToNext <= 5.0;

        partOfFortune = {
            id: 'partOfFortune',
            nameVi: 'Điểm May Mắn (Pars Fortunae)',
            nameEn: 'Part of Fortune',
            glyphKey: 'partOfFortune',
            longitude: lillyPofLon,
            rule: 'William Lilly (CA p.143: ASC + Moon - Sun cho cả Ngày và Đêm)',
            houseNumber: pofGeomHouse,
            geometricHouseNumber: pofGeomHouse,
            cuspInfluence: {
                nextHouse: (pofGeomHouse % 12) + 1,
                distanceDeg: Math.round(pofDistToNext * 100) / 100,
                withinFiveDegreeRule: pofIs5Deg
            },
            isWithinFiveDegreeCusp: pofIs5Deg,
            distanceToNextCusp: Math.round(pofDistToNext * 100) / 100,
            traditionalHouseNumber: pofIs5Deg ? (pofGeomHouse % 12) + 1 : pofGeomHouse,
            ...pofPos
        };
    }

    const sunAltFormatted = candidateSunAltitude !== null ?
        `${candidateSunAltitude >= 0 ? '+' : ''}${candidateSunAltitude.toFixed(2)}°` : 'N/A';

    return {
        julianDayUT: jdUT,
        calendarMode: calendar.toUpperCase(),
        localTimeFormatted: `${String(day).padStart(2, '0')}/${String(month).padStart(2, '0')}/${year} ${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}:${String(second).padStart(2, '0')}`,
        utcOffsetFormatted: `UTC${utcOffset >= 0 ? '+' : ''}${String(utcOffset).padStart(2, '0')}:00`,
        location: {
            name: locationName,
            latitude,
            longitude,
            latFormatted: `${Math.abs(latitude).toFixed(4)}° ${latitude >= 0 ? 'Bắc' : 'Nam'}`,
            lonFormatted: `${Math.abs(longitude).toFixed(4)}° ${longitude >= 0 ? 'Đông' : 'Tây'}`
        },
        houses: candidateHouses,
        planets: candidatePlanets,
        partOfFortune,
        isDayChart,
        isBorderlineSect,
        sunAltitude: candidateSunAltitude,
        sunAltFormatted,
        ephemerisSource: currentEphemerisSource
    };
}

/**
 * Xác định kinh độ hoàng đạo rơi vào nhà nào trong 12 đỉnh nhà (dự phòng test đơn giản)
 */
export function getHouseOfLongitude(longitude, cusps) {
    let norm = (longitude + 360) % 360;
    for (let i = 0; i < 12; i++) {
        const c1 = cusps[i];
        const c2 = cusps[(i + 1) % 12];
        if (c1 < c2) {
            if (norm >= c1 && norm < c2) return i + 1;
        } else {
            if (norm >= c1 || norm < c2) return i + 1;
        }
    }
    return 1;
}
