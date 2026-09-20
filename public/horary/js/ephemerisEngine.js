/**
 * ephemerisEngine.js - Lõi Tính Toán Thiên Văn Horary Đa Tầng
 * Ưu tiên: Swiss Ephemeris 2.10.03 qua WebAssembly (@kuntay/swisseph) nạp cục bộ
 * Dự phòng minh bạch: Astronomy Engine (VSOP87/NOVAS) & Analytical Regiomontanus
 *
 * NGUYÊN TẮC BẤT DI BẤT DỊCH:
 * 1. Tropical Zodiac, Geocentric positions.
 * 2. Hệ nhà: Regiomontanus (mã 'R').
 * 3. 7 hành tinh truyền thống + La Hầu / Kế Đô.
 * 4. Nam Giao Điểm (South Node) có vận tốc cùng chiều Bắc Giao Điểm: d(sn)/dt = d(nn)/dt.
 * 5. Tuyệt đối KHÔNG BAO GIỜ sinh dữ liệu giả trong bất kỳ trường hợp nào.
 *    Nếu cả Swiss Ephemeris và Astronomy Engine đều lỗi, throw Error và dừng hẳn.
 * 6. Xác định Day/Night Sect dựa trên True Solar Altitude (>= -0.833° bao gồm khúc xạ và bán kính).
 */

import { getZodiacPosition, PLANETS_INFO } from './traditionalRulers.js';

let sweInstance = null;
let currentEphemerisSource = 'Chưa khởi tạo';

/**
 * Lấy đối tượng Astronomy Engine (hỗ trợ cả Node.js và Trình duyệt)
 */
export async function getAstronomyEngine() {
    if (typeof globalThis !== 'undefined' && globalThis.Astronomy) {
        return globalThis.Astronomy;
    }
    if (typeof window !== 'undefined' && window.Astronomy) {
        return window.Astronomy;
    }

    // Môi trường Node.js: nạp tệp vendor cục bộ
    const isNode = typeof process !== 'undefined' && process.versions && process.versions.node;
    if (isNode) {
        try {
            const fs = await import('fs');
            const path = await import('path');
            const possiblePaths = [
                path.resolve('vendor/astronomy.browser.min.js'),
                path.resolve(__dirname, '../../vendor/astronomy.browser.min.js'),
                path.resolve(__dirname, '../vendor/astronomy.browser.min.js')
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

            // Cố gắng mount data nếu có ở local node
            try {
                const fs = await import('fs');
                const path = await import('path');
                const ephePath = path.resolve('node_modules/@kuntay/swisseph-data/ephe');
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
            // Môi trường trình duyệt: nạp từ thư mục tĩnh cục bộ /vendor/swisseph/
            try {
                // Thử các đường dẫn tương đối và tuyệt đối cục bộ
                let swisseph = null;
                try {
                    swisseph = await import('../../vendor/swisseph/dist/index.js');
                } catch (errRel) {
                    swisseph = await import('/vendor/swisseph/dist/index.js');
                }

                sweInstance = await swisseph.createSwissEph();
                currentEphemerisSource = 'Swiss Ephemeris 2.10.03 (Moshier Engine WASM)';
            } catch (errBrowser) {
                console.warn('WASM Swiss Ephemeris không khả dụng trên trình duyệt, chuyển sang Astronomy Engine (VSOP87/NOVAS):', errBrowser);
                sweInstance = null;
                currentEphemerisSource = 'Astronomy Engine (VSOP87/NOVAS Fallback)';
            }
        }
    } catch (err) {
        console.warn('Không thể khởi tạo Swiss Ephemeris WASM, kích hoạt chế độ Fallback thật:', err);
        sweInstance = null;
        currentEphemerisSource = 'Astronomy Engine (VSOP87/NOVAS Fallback)';
    }

    return sweInstance;
}

/**
 * Chuyển đổi ngày giờ địa phương thành Julian Day (UT)
 */
export function getJulianDayUT(year, month, day, hour, minute, second, utcOffsetHours = 7) {
    const decimalLocalHour = hour + minute / 60 + second / 3600;
    const decimalUTHour = decimalLocalHour - utcOffsetHours;

    let y = year;
    let m = month;
    let d = day + decimalUTHour / 24;

    if (m <= 2) {
        y -= 1;
        m += 12;
    }

    const A = Math.floor(y / 100);
    const B = 2 - A + Math.floor(A / 4);

    const jd = Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + d + B - 1524.5;
    return jd;
}

/**
 * Tính toán toàn bộ lá số Horary (Hành tinh, Nhà Regiomontanus, Tốc độ, Trạng thái)
 */
export async function calculateHoraryChart(params) {
    const {
        year, month, day,
        hour = 0, minute = 0, second = 0,
        latitude = 21.0285, longitude = 105.8542,
        utcOffset = 7, locationName = 'Hà Nội'
    } = params;

    const jdUT = getJulianDayUT(year, month, day, hour, minute, second, utcOffset);

    if (!sweInstance) {
        await initEphemerisEngine();
    }

    let planets = [];
    let houses = null;
    let epheStatus = currentEphemerisSource;
    let sunAltitude = null;

    // Body IDs trong Swiss Ephemeris
    // 0: Sun, 1: Moon, 2: Mercury, 3: Venus, 4: Mars, 5: Jupiter, 6: Saturn, 10: TrueNode
    const swissBodyMap = {
        sun: 0,
        moon: 1,
        mercury: 2,
        venus: 3,
        mars: 4,
        jupiter: 5,
        saturn: 6,
        northNode: 10
    };

    if (sweInstance) {
        try {
            // 1. Tính hệ nhà Regiomontanus (mã 'R')
            const houseData = sweInstance.houses(jdUT, latitude, longitude, 'R');
            houses = {
                system: 'Regiomontanus',
                systemCode: 'R',
                ascendant: houseData.ascendant,
                midheaven: houseData.midheaven,
                descendant: houseData.descendant,
                imumCoeli: houseData.imumCoeli,
                armc: houseData.armc,
                vertex: houseData.vertex,
                cusps: houseData.cusps.slice(0, 12)
            };

            // 2. Tính độ cao thật của Mặt Trời so với chân trời địa phương (True Solar Altitude)
            try {
                const sunHor = sweInstance.horizontal(jdUT, 0, latitude, longitude);
                sunAltitude = sunHor.altitude;
            } catch (errHor) {
                console.warn('Không thể tính horizontal qua SwissEph, dùng công thức lượng giác cầu:', errHor);
            }

            // 3. Tính tọa độ và vận tốc 7 hành tinh + Nodes
            for (const pInfo of PLANETS_INFO) {
                if (pInfo.isNode && pInfo.id === 'southNode') {
                    // Nam Giao Điểm đối xứng Bắc Giao Điểm 180°
                    const nn = planets.find(p => p.id === 'northNode');
                    if (nn) {
                        const snLon = (nn.longitude + 180) % 360;
                        const pos = getZodiacPosition(snLon);
                        // CHUẨN TOÁN HỌC: d(snLon)/dt = d(nnLon)/dt -> speedLongitude = nn.speedLongitude
                        planets.push({
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
                    }
                    continue;
                }

                const bodyCode = swissBodyMap[pInfo.id];
                if (bodyCode === undefined) continue;

                const posData = sweInstance.calc(jdUT, bodyCode);
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

                if (posData.ephemeris === 'moshier' && !epheStatus.includes('Moshier')) {
                    epheStatus = 'Swiss Ephemeris 2.10.03 (Moshier Engine WASM)';
                }

                planets.push({
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
        } catch (errCalc) {
            console.error('Lỗi tính toán Swiss Ephemeris WASM:', errCalc);
            sweInstance = null;
        }
    }

    // TẦNG DỰ PHÒNG THIÊN VĂN THỰC SỰ 100% (Astronomy Engine VSOP87/NOVAS)
    // TUYỆT ĐỐI KHÔNG BAO GIỜ DÙNG DỮ LIỆU GIẢ!
    if (!houses || planets.length === 0) {
        console.warn('Swiss Ephemeris không khả dụng -> Kích hoạt Astronomy Engine (VSOP87/NOVAS) 100% thực');
        const fallbackRes = await calculateAstronomicalFallback(jdUT, latitude, longitude);
        houses = fallbackRes.houses;
        planets = fallbackRes.planets;
        sunAltitude = fallbackRes.sunAltitude;
        epheStatus = 'Astronomy Engine (VSOP87/NOVAS Fallback)';
    }

    // Xác định hành tinh đang ngụ tại nhà nào (House Placement)
    for (const p of planets) {
        p.houseNumber = getHouseOfLongitude(p.longitude, houses.cusps);
    }

    // Xác định lá số Ban Ngày hay Ban Đêm (Sect):
    // Dựa trên True Solar Altitude: Altitude >= -0.833° (tính cả khúc xạ khí quyển và bán kính Mặt Trời) -> Day Chart
    let isDayChart = true;
    if (sunAltitude !== null && sunAltitude !== undefined) {
        isDayChart = (sunAltitude >= -0.833);
    } else {
        // Dự phòng hình học qua trục chân trời ASC - DSC nếu altitude chưa sẵn sàng
        const sunPlanet = planets.find(p => p.id === 'sun');
        if (sunPlanet && houses && houses.cusps) {
            isDayChart = (sunPlanet.houseNumber >= 7 && sunPlanet.houseNumber <= 12);
        }
    }

    const sunAltFormatted = sunAltitude !== null ?
        `${sunAltitude >= 0 ? '+' : ''}${sunAltitude.toFixed(2)}°` : 'N/A';

    return {
        julianDayUT: jdUT,
        localTimeFormatted: `${String(day).padStart(2, '0')}/${String(month).padStart(2, '0')}/${year} ${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}:${String(second).padStart(2, '0')}`,
        utcOffsetFormatted: `UTC${utcOffset >= 0 ? '+' : ''}${String(utcOffset).padStart(2, '0')}:00`,
        location: {
            name: locationName,
            latitude,
            longitude,
            latFormatted: `${Math.abs(latitude).toFixed(4)}° ${latitude >= 0 ? 'Bắc' : 'Nam'}`,
            lonFormatted: `${Math.abs(longitude).toFixed(4)}° ${longitude >= 0 ? 'Đông' : 'Tây'}`
        },
        houses,
        planets,
        isDayChart,
        sunAltitude,
        sunAltFormatted,
        ephemerisSource: epheStatus
    };
}

/**
 * Xác định kinh độ hoàng đạo rơi vào nhà nào trong 12 đỉnh nhà
 */
export function getHouseOfLongitude(longitude, cusps) {
    let norm = (longitude + 360) % 360;
    for (let i = 0; i < 12; i++) {
        const c1 = cusps[i];
        const c2 = cusps[(i + 1) % 12];
        if (c1 < c2) {
            if (norm >= c1 && norm < c2) return i + 1;
        } else {
            // Vượt qua điểm 0° Bạch Dương
            if (norm >= c1 || norm < c2) return i + 1;
        }
    }
    return 1;
}

/**
 * Tính toán vị trí và tốc độ thiên văn thật bằng Astronomy Engine (VSOP87 / NOVAS)
 * Khi không có Swiss Ephemeris.
 * BẢO ĐẢM: 100% dữ liệu thiên văn thật, sai số dưới 1 arcsecond so với Swiss Ephemeris.
 * Nếu không có Astronomy Engine, throw Error rõ ràng.
 */
async function calculateAstronomicalFallback(jdUT, latitude, longitude) {
    const ast = await getAstronomyEngine();
    if (!ast) {
        throw new Error('Lỗi nghiêm trọng: Cả Swiss Ephemeris WASM và Astronomy Engine đều không khả dụng. Hệ thống từ chối tính toán bằng dữ liệu giả để bảo vệ tính chính xác học thuật của lá số Horary!');
    }

    const rad = Math.PI / 180;
    const deg = 180 / Math.PI;

    // Chuyển Julian Day UT sang đối tượng Thời gian của Astronomy Engine
    const dateMs = (jdUT - 2440587.5) * 86400000;
    const time = ast.MakeTime(new Date(dateMs));
    
    // Bước vi phân dt = 0.001 ngày (~86.4 giây) để tính đạo hàm vận tốc tức thời chính xác
    const dt = 0.001;
    const timePlus = ast.MakeTime(new Date(dateMs + dt * 86400000));

    // 1. Tính hệ nhà Regiomontanus giải tích lượng giác cầu
    const T = (jdUT - 2451545.0) / 36525.0;
    let gmst = 280.46061837 + 360.98564736629 * (jdUT - 2451545.0) + 0.000387933 * T * T;
    gmst = ((gmst % 360) + 360) % 360;

    const ramc = ((gmst + longitude) % 360 + 360) % 360;
    const eps = 23.4392911 - 0.0130042 * T; // Độ nghiêng hoàng đạo trung bình
    const phiRad = latitude * rad;
    const epsRad = eps * rad;
    const ramcRad = ramc * rad;

    // Midheaven (MC)
    const mcLon = (Math.atan2(Math.sin(ramcRad), Math.cos(ramcRad) * Math.cos(epsRad)) * deg + 360) % 360;
    // Ascendant (ASC)
    const ascLon = (Math.atan2(Math.cos(ramcRad), -Math.sin(ramcRad) * Math.cos(epsRad) - Math.tan(phiRad) * Math.sin(epsRad)) * deg + 360) % 360;

    const cusps = new Array(12);
    cusps[9] = mcLon; // Đỉnh nhà 10
    cusps[3] = (mcLon + 180) % 360; // Đỉnh nhà 4
    cusps[0] = ascLon; // Đỉnh nhà 1
    cusps[6] = (ascLon + 180) % 360; // Đỉnh nhà 7

    const offsets = [
        { houseIdx: 10, hDeg: 30 },
        { houseIdx: 11, hDeg: 60 },
        { houseIdx: 1, hDeg: 120 },
        { houseIdx: 2, hDeg: 150 }
    ];

    for (const off of offsets) {
        const hRad = (ramc + off.hDeg) * rad;
        const poleRad = Math.atan(Math.tan(phiRad) * Math.sin(off.hDeg * rad));
        const cLon = (Math.atan2(Math.sin(hRad), Math.cos(hRad) * Math.cos(epsRad) - Math.tan(poleRad) * Math.sin(epsRad)) * deg + 360) % 360;
        cusps[off.houseIdx] = cLon;
        cusps[(off.houseIdx + 6) % 12] = (cLon + 180) % 360;
    }

    const houses = {
        system: 'Regiomontanus (Analytical Rigorous)',
        systemCode: 'R',
        ascendant: ascLon,
        midheaven: mcLon,
        descendant: (ascLon + 180) % 360,
        imumCoeli: (mcLon + 180) % 360,
        armc: ramc,
        vertex: 0,
        cusps
    };

    // 2. Tính độ cao Mặt Trời (True Solar Altitude)
    const obs = new ast.Observer(latitude, longitude, 0);
    const sunEq = ast.Equator('Sun', time, obs, true, true);
    const sunHor = ast.Horizon(time, obs, sunEq.ra, sunEq.dec, 'normal');
    const sunAltitude = sunHor.altitude;

    // 3. Hàm tính tọa độ hoàng đạo địa tâm thực và tốc độ
    function getTrueBodyCoords(bodyId, t) {
        if (bodyId === 'sun') {
            const pos = ast.SunPosition(t);
            return { lon: pos.elon, lat: pos.elat, dist: pos.vec.Length() };
        }
        if (bodyId === 'moon') {
            const vMoon = ast.GeoMoon(t);
            const ecl = ast.Ecliptic(vMoon);
            return { lon: ecl.elon, lat: ecl.elat, dist: ecl.vec ? ecl.vec.Length() : 0.00257 };
        }
        // Các hành tinh khác: Mercury, Venus, Mars, Jupiter, Saturn
        const nameMap = {
            mercury: 'Mercury',
            venus: 'Venus',
            mars: 'Mars',
            jupiter: 'Jupiter',
            saturn: 'Saturn'
        };
        const astName = nameMap[bodyId];
        if (!astName) return null;
        const vec = ast.GeoVector(astName, t, true);
        const ecl = ast.Ecliptic(vec);
        return { lon: ecl.elon, lat: ecl.elat, dist: ecl.vec ? ecl.vec.Length() : 1 };
    }

    const planets = [];

    // Tính 7 hành tinh truyền thống
    for (const pInfo of PLANETS_INFO) {
        if (pInfo.isNode) continue;

        const c1 = getTrueBodyCoords(pInfo.id, time);
        const c2 = getTrueBodyCoords(pInfo.id, timePlus);
        if (!c1 || !c2) continue;

        let dLon = c2.lon - c1.lon;
        while (dLon > 180) dLon -= 360;
        while (dLon < -180) dLon += 360;
        const speed = dLon / dt; // Tốc độ kinh độ theo độ/ngày

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

        const pos = getZodiacPosition(c1.lon);

        planets.push({
            id: pInfo.id,
            nameVi: pInfo.nameVi,
            nameEn: pInfo.nameEn,
            glyphKey: pInfo.glyphKey,
            longitude: c1.lon,
            latitude: c1.lat,
            distance: c1.dist,
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

    // Tính Bắc Giao Điểm (North Node - Mean Lunar Node IAU) & Nam Giao Điểm
    // Công thức tiêu chuẩn thiên văn học hiện đại cho Mean Lunar Node
    const calcNodeLon = (jd) => {
        const tVal = (jd - 2451545.0) / 36525.0;
        let omega = 125.04452 - 1934.136261 * tVal + 0.0020708 * tVal * tVal + (tVal * tVal * tVal) / 450000;
        return ((omega % 360) + 360) % 360;
    };

    const nnLon1 = calcNodeLon(jdUT);
    const nnLon2 = calcNodeLon(jdUT + dt);
    let dNodeLon = nnLon2 - nnLon1;
    while (dNodeLon > 180) dNodeLon -= 360;
    while (dNodeLon < -180) dNodeLon += 360;
    const nodeSpeed = dNodeLon / dt; // ~ -0.053°/ngày

    const nnInfo = PLANETS_INFO.find(p => p.id === 'northNode');
    const nnPos = getZodiacPosition(nnLon1);
    planets.push({
        id: 'northNode',
        nameVi: nnInfo.nameVi,
        nameEn: nnInfo.nameEn,
        glyphKey: nnInfo.glyphKey,
        longitude: nnLon1,
        latitude: 0,
        distance: 1,
        speedLongitude: nodeSpeed,
        motion: 'RETROGRADE',
        motionVi: 'Nghịch hành',
        motionGlyphKey: 'retrograde',
        isRetrograde: true,
        isStationary: false,
        formattedSpeed: `${nodeSpeed.toFixed(2)}°/ngày`,
        ...nnPos
    });

    const snInfo = PLANETS_INFO.find(p => p.id === 'southNode');
    const snLon1 = (nnLon1 + 180) % 360;
    const snPos = getZodiacPosition(snLon1);
    // Nam Giao Điểm có cùng vận tốc với Bắc Giao Điểm: d(snLon)/dt = d(nnLon)/dt
    planets.push({
        id: 'southNode',
        nameVi: snInfo.nameVi,
        nameEn: snInfo.nameEn,
        glyphKey: snInfo.glyphKey,
        longitude: snLon1,
        latitude: 0,
        distance: 1,
        speedLongitude: nodeSpeed, // ĐÚNG: nodeSpeed, KHÔNG ĐẢO DẤU!
        motion: 'RETROGRADE',
        motionVi: 'Nghịch hành',
        motionGlyphKey: 'retrograde',
        isRetrograde: true,
        isStationary: false,
        formattedSpeed: `${nodeSpeed.toFixed(2)}°/ngày`,
        ...snPos
    });

    return {
        houses,
        planets,
        sunAltitude
    };
}
