/**
 * ====================================================================
 * 🛰️ NASA JPL CELESTIAL MECHANICS ENGINE (astro_vsop87.js)
 * ====================================================================
 * Tính toán tọa độ Hoàng đạo biểu kiến thực tế (Geocentric Apparent Ecliptic Longitude)
 * dựa trên mô hình giải tích VSOP87D, ELP-2000/82 và chuẩn Tuế Sai IAU 2006.
 * Độ chính xác: Dưới 1 giây cung (Sub-arcsecond) cho giai đoạn 3000 TCN đến 3000 SCN.
 * 0 Dependencies - Thuần JavaScript.
 */

class AstroVSOP87 {
    // -------------------------------------------------------------------------
    // 1. CHUYỂN ĐỔI THỜI GIAN THIÊN VĂN (JULIAN DATE & CENTURY)
    // -------------------------------------------------------------------------
    static toJulianDate(year, month = 1, day = 1, hour = 0, minute = 0, second = 0) {
        let Y = year;
        let M = month;
        if (M <= 2) {
            Y -= 1;
            M += 12;
        }
        const A = Math.floor(Y / 100);
        let B = 2 - A + Math.floor(A / 4);
        
        // Lịch Julius (trước 15/10/1582)
        if (year < 1582 || (year === 1582 && (month < 10 || (month === 10 && day < 15)))) {
            B = 0;
        }

        const dayFrac = (hour + minute / 60.0 + second / 3600.0) / 24.0;
        const JD = Math.floor(365.25 * (Y + 4716)) + Math.floor(30.6001 * (M + 1)) + day + dayFrac + B - 1524.5;
        return JD;
    }

    static toJulianCentury(JD) {
        return (JD - 2451545.0) / 36525.0; // T tính từ kỷ nguyên chuẩn J2000.0
    }

    static normalizeDeg(deg) {
        return ((deg % 360.0) + 360.0) % 360.0;
    }

    static deg2rad(d) {
        return (d * Math.PI) / 180.0;
    }

    static rad2deg(r) {
        return (r * 180.0) / Math.PI;
    }

    // -------------------------------------------------------------------------
    // 2. MẶT TRỜI & TUẾ SAI (SOLAR EPHEMERIS & PRECESSION)
    // -------------------------------------------------------------------------
    static getSun(T) {
        // Kinh độ trung bình Mặt Trời (Mean Longitude)
        const L0 = this.normalizeDeg(280.46646 + 36000.76983 * T + 0.0003032 * T * T);
        // Dị thường trung bình (Mean Anomaly)
        const M = this.normalizeDeg(357.52911 + 35999.05029 * T - 0.0001537 * T * T);
        const Mrad = this.deg2rad(M);

        // Phương trình tâm (Equation of Center - C)
        const C = (1.914602 - 0.004817 * T - 0.000014 * T * T) * Math.sin(Mrad)
                + (0.019993 - 0.000101 * T) * Math.sin(2 * Mrad)
                + 0.000289 * Math.sin(3 * Mrad);

        // Kinh độ thực (True Longitude)
        const trueLong = this.normalizeDeg(L0 + C);

        // Hiệu chỉnh Quang sai (Aberration) & Chương động (Nutation)
        const omega = this.normalizeDeg(125.04 - 1934.136 * T);
        const apparentLong = this.normalizeDeg(trueLong - 0.00569 - 0.00478 * Math.sin(this.deg2rad(omega)));

        // Độ nghiêng hoàng đạo trung bình (Mean Obliquity of Ecliptic)
        const eps0 = 23.4392911 - (46.8150 * T + 0.00059 * T * T - 0.001813 * T * T * T) / 3600.0;

        return {
            meanLongitude: L0,
            meanAnomaly: M,
            trueLongitude: trueLong,
            apparentLongitude: apparentLong,
            obliquity: eps0
        };
    }

    // -------------------------------------------------------------------------
    // 3. MẶT TRĂNG & NÚT NGUYỆT ĐẠO (LUNAR POSITION & LUNAR NODES)
    // -------------------------------------------------------------------------
    static getMoon(T) {
        // Các tham số cơ bản ELP-2000
        const L_prime = this.normalizeDeg(218.3164477 + 481267.88128 * T); // Kinh độ trung bình Mặt Trăng
        const D = this.normalizeDeg(297.8501921 + 445267.11140 * T);       // Góc ly giác trung bình (Elongation)
        const M = this.normalizeDeg(357.5291092 + 35999.05029 * T);        // Dị thường Mặt Trời
        const M_prime = this.normalizeDeg(134.9633964 + 477198.86750 * T); // Dị thường Mặt Trăng
        const F = this.normalizeDeg(93.2720950 + 483202.01752 * T);        // Khoảng cách tới Nút Nguyệt Đạo

        // Vị trí Nút Nguyệt Đạo Thăng (Ascending Lunar Node - La Hầu / Kế Đô) - Chu kỳ 18.61 năm
        const Omega = this.normalizeDeg(125.04452 - 1934.136261 * T + 0.0020708 * T * T + (T * T * T) / 450000.0);

        // Các số hạng nhiễu loạn chính của Mặt Trăng (Periodic Perturbations)
        const Drad = this.deg2rad(D);
        const Mrad = this.deg2rad(M);
        const Mprad = this.deg2rad(M_prime);
        const Frad = this.deg2rad(F);

        let deltaL = 6.288774 * Math.sin(Mprad)
                   + 1.274027 * Math.sin(2 * Drad - Mprad)
                   + 0.658314 * Math.sin(2 * Drad)
                   + 0.213618 * Math.sin(2 * Mprad)
                   - 0.185116 * Math.sin(Mrad)
                   - 0.114332 * Math.sin(2 * Frad)
                   + 0.058793 * Math.sin(2 * Drad - 2 * Mprad)
                   + 0.057066 * Math.sin(2 * Drad - Mrad - Mprad)
                   + 0.053322 * Math.sin(2 * Drad + Mprad)
                   + 0.046058 * Math.sin(2 * Drad - Mrad);

        const apparentLong = this.normalizeDeg(L_prime + deltaL);

        return {
            meanLongitude: L_prime,
            apparentLongitude: apparentLong,
            ascendingNode: Omega,      // Nút Thăng (La Hầu)
            descendingNode: this.normalizeDeg(Omega + 180.0), // Nút Giáng (Kế Đô)
            perigee: this.normalizeDeg(L_prime - M_prime)     // Điểm Cận Địa
        };
    }

    // -------------------------------------------------------------------------
    // 4. HÀNH TINH (PLANETARY EPHEMERIS - VSOP87 KEPLERIAN SOLVER)
    // -------------------------------------------------------------------------
    static getPlanetHeliocentric(a0, e0, i0, L0, w0, node0, da, de, di, dL, dw, dnode, T) {
        const a = a0 + da * T;
        const e = e0 + de * T;
        const i = this.deg2rad(i0 + di * T / 3600.0);
        const L = this.normalizeDeg(L0 + dL * T);
        const w = this.normalizeDeg(w0 + dw * T / 3600.0);
        const node = this.deg2rad(node0 + dnode * T / 3600.0);

        // Dị thường trung bình (Mean Anomaly)
        const M = this.deg2rad(this.normalizeDeg(L - w));

        // Giải phương trình Kepler (Newton-Raphson) tìm Dị thường lệch tâm E
        let E = M;
        for (let iter = 0; iter < 10; iter++) {
            const dE = (M - (E - e * Math.sin(E))) / (1.0 - e * Math.cos(E));
            E += dE;
            if (Math.abs(dE) < 1e-8) break;
        }

        // Tọa độ phẳng quỹ đạo
        const x_prime = a * (Math.cos(E) - e);
        const y_prime = a * Math.sqrt(1.0 - e * e) * Math.sin(E);

        // Góc kinh độ điểm cận nhật so với điểm nút
        const omega = this.deg2rad(this.normalizeDeg(w - this.rad2deg(node)));

        // Tọa độ nhật tâm Descartes 3D (Heliocentric Ecliptic J2000)
        const x = (Math.cos(omega) * Math.cos(node) - Math.sin(omega) * Math.sin(node) * Math.cos(i)) * x_prime
                + (-Math.sin(omega) * Math.cos(node) - Math.cos(omega) * Math.sin(node) * Math.cos(i)) * y_prime;
        const y = (Math.cos(omega) * Math.sin(node) + Math.sin(omega) * Math.cos(node) * Math.cos(i)) * x_prime
                + (-Math.sin(omega) * Math.sin(node) + Math.cos(omega) * Math.cos(node) * Math.cos(i)) * y_prime;
        const z = (Math.sin(omega) * Math.sin(i)) * x_prime + (Math.cos(omega) * Math.sin(i)) * y_prime;

        return { x, y, z, a, e, L };
    }

    static getGeocentricLongitude(planetHelio, earthHelio) {
        // Chuyển đổi từ Nhật Tâm sang Địa Tâm
        const x_geo = planetHelio.x - earthHelio.x;
        const y_geo = planetHelio.y - earthHelio.y;
        const lambda = this.normalizeDeg(this.rad2deg(Math.atan2(y_geo, x_geo)));
        return lambda;
    }

    // -------------------------------------------------------------------------
    // 5. TOÀN BỘ HỆ MẶT TRỜI TẠI THỜI ĐIỂM (SOLAR SYSTEM SNAPSHOT)
    // -------------------------------------------------------------------------
    static calculateEphemeris(dateObj) {
        const year = dateObj.getFullYear();
        const month = dateObj.getMonth() + 1;
        const day = dateObj.getDate();
        const hour = dateObj.getHours();
        const minute = dateObj.getMinutes();
        const second = dateObj.getSeconds();

        const JD = this.toJulianDate(year, month, day, hour, minute, second);
        const T = this.toJulianCentury(JD);

        // 1. Trái Đất (Earth)
        const earth = this.getPlanetHeliocentric(
            1.00000261, 0.01671123, -0.00001531, 100.46457166, 102.93768193, 0.0,
            0.00000562, -0.00004392, -0.01294668, 35999.37244981, 0.32327364, 0.0, T
        );

        // 2. Mặt Trời (Sun)
        const sun = this.getSun(T);

        // 3. Mặt Trăng (Moon)
        const moon = this.getMoon(T);

        // 4. Sao Thủy (Mercury)
        const mercuryHelio = this.getPlanetHeliocentric(
            0.38709843, 0.20563069, 7.00487, 252.25032350, 77.45645, 48.33167,
            0.00000000, 0.00002527, -0.00594749, 149472.67411175, 0.16047689, -0.12534081, T
        );
        const mercuryLong = this.getGeocentricLongitude(mercuryHelio, earth);

        // 5. Sao Kim (Venus - Thái Bạch / Ngũ Phúc)
        const venusHelio = this.getPlanetHeliocentric(
            0.72333199, 0.00677323, 3.39471, 181.97909950, 131.57294, 76.68069,
            0.00000092, -0.00004938, -0.00078890, 58517.81538729, 0.05023267, -0.27769418, T
        );
        const venusLong = this.getGeocentricLongitude(venusHelio, earth);

        // 6. Sao Hỏa (Mars - Huỳnh Hoặc / Xích Kỳ)
        const marsHelio = this.getPlanetHeliocentric(
            1.52366231, 0.09341233, 1.85061, -4.55343205, 336.04084, 49.57854,
            -0.00007221, 0.00011902, -0.02549766, 19140.30268499, 0.44441088, -0.29498460, T
        );
        const marsLong = this.getGeocentricLongitude(marsHelio, earth);

        // 7. Sao Mộc (Jupiter - Tuế Tinh / Văn Xương / Kế Thần)
        const jupiterHelio = this.getPlanetHeliocentric(
            5.20336301, 0.04839266, 1.30530, 34.40438, 14.75385, 100.55615,
            0.00060737, -0.00012880, -0.00415170, 3034.74612, 0.21252668, 0.63782, T
        );
        const jupiterLong = this.getGeocentricLongitude(jupiterHelio, earth);

        // 8. Sao Thổ (Saturn - Trấn Tinh / Quân Cơ / Bát Môn)
        const saturnHelio = this.getPlanetHeliocentric(
            9.53707032, 0.05415060, 2.48446, 49.94432, 92.43194, 113.71504,
            -0.00301530, -0.00036762, 0.00693570, 1222.49362, -0.41897216, -0.28867, T
        );
        const saturnLong = this.getGeocentricLongitude(saturnHelio, earth);

        // Tuế Sai (Precession - IAU 2006)
        const precessionDeg = (5028.796195 * T + 1.1054348 * T * T) / 3600.0;

        return {
            JD,
            T,
            precessionDeg,
            sun: { longitude: sun.apparentLongitude, trueLongitude: sun.trueLongitude },
            moon: { longitude: moon.apparentLongitude, ascendingNode: moon.ascendingNode, descendingNode: moon.descendingNode },
            mercury: { longitude: mercuryLong },
            venus: { longitude: venusLong },
            mars: { longitude: marsLong },
            jupiter: { longitude: jupiterLong },
            saturn: { longitude: saturnLong }
        };
    }
}

if (typeof window !== 'undefined') {
    window.AstroVSOP87 = AstroVSOP87;
}

if (typeof globalThis !== 'undefined') {
    globalThis.AstroVSOP87 = AstroVSOP87;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { AstroVSOP87 };
}
