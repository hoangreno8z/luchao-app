/**
 * ====================================================================
 * 🚀 THÁI ẤT THIÊN VĂN THỰC TẾ (NASA / MODERN ASTRONOMICAL ENGINE)
 * ====================================================================
 * Tích hợp Hàm Bù Trừ Động Lực Học (ThaiYiCalibrator) dựa trên:
 * 1. Chu kỳ thực tế Sao Mộc (11.8618 năm) vs Thái Tuế cổ truyền (12 năm).
 * 2. Vector Tuế Sai trục Trái Đất (Precession of the Equinoxes 50.3"/năm).
 * 3. Kinh độ Mặt Trời thực tế (True Solar Longitude) & Phương trình Thời gian (EoT).
 */

class ThaiYiCalibrator {
    // 1. Tính Julian Date (JD) từ Ngày/Tháng/Năm
    static dateToJD(year, month = 1, day = 1, hour = 12) {
        let Y = year;
        let M = month;
        if (M <= 2) {
            Y -= 1;
            M += 12;
        }
        const A = Math.floor(Y / 100);
        const B = 2 - A + Math.floor(A / 4);
        const dayFraction = (hour - 12) / 24;
        const JD = Math.floor(365.25 * (Y + 4716)) + Math.floor(30.6001 * (M + 1)) + day + dayFraction + B - 1524.5;
        return JD;
    }

    // 2. Tính Thế Kỷ Julian (Julian Century - T) từ mốc J2000.0
    static getJulianCentury(year, month = 1, day = 1, hour = 12) {
        const jd = this.dateToJD(year, month, day, hour);
        return (jd - 2451545.0) / 36525.0;
    }

    // 3. Hiệu chỉnh Tích Niên cho Tuế Kế (Bù trôi dạt Sao Mộc 11.8618 năm)
    static calibrateYearTichNien(year, traditionalTichNien, month = 1, day = 1) {
        const T = this.getJulianCentury(year, month, day);
        // Hằng số bù trừ trôi dạt quỹ đạo Sao Mộc
        const deltaDYear = Math.floor(T * (12.0 - 11.8618) * 360.25);
        const calibratedTichNien = traditionalTichNien - deltaDYear;
        return {
            calibratedTichNien,
            deltaDYear,
            julianCentury: T,
            calibratedKyDu: ((calibratedTichNien % 360) + 360) % 360
        };
    }

    // 4. Hiệu chỉnh Thủy Kích bằng Vector Tuế Sai (Precession Shift)
    static calibrateThuyKich(baseThanIdx, year, month = 1, day = 1) {
        const T = this.getJulianCentury(year, month, day);
        // Quy đổi góc Tuế sai 50.3"/năm sang bước nhảy cung 16 (360 deg / 16 = 22.5 deg)
        const precessionShift = Math.floor((T * 100 * 50.3) / 81000);
        const calibratedThanIdx = (baseThanIdx + precessionShift) % 16;
        return {
            calibratedThanIdx: calibratedThanIdx < 0 ? calibratedThanIdx + 16 : calibratedThanIdx,
            precessionShift
        };
    }

    // 5. Tính Kinh độ Mặt Trời thực tế (True Solar Longitude λs)
    static getTrueSolarLongitude(year, month, day, hour = 12) {
        const JD = this.dateToJD(year, month, day, hour);
        const D = JD - 2451545.0;
        // Dị thường trung bình (g) & Kinh độ trung bình (L0) bằng độ (degrees)
        const g = (357.529 + 0.98560028 * D) % 360;
        const L0 = (280.46646 + 0.98564736 * D) % 360;
        const gRad = (g * Math.PI) / 180;
        const lambdaS = (L0 + 1.915 * Math.sin(gRad) + 0.020 * Math.sin(2 * gRad) + 360) % 360;
        return lambdaS;
    }

    // 6. Phương trình thời gian (Equation of Time EoT) tính bằng phút
    static getEquationOfTime(year, month, day, hour = 12) {
        const JD = this.dateToJD(year, month, day, hour);
        const D = JD - 2451545.0;
        const g = ((357.529 + 0.98560028 * D) * Math.PI) / 180;
        const L0 = ((280.46646 + 0.98564736 * D) * Math.PI) / 180;
        const y = Math.pow(Math.tan((23.439 * Math.PI) / 360), 2);
        const e = 0.0167086;
        const eotRad = y * Math.sin(2 * L0) - 2 * e * Math.sin(g) + 4 * e * y * Math.sin(g) * Math.cos(2 * L0) - 0.5 * y * y * Math.sin(4 * L0) - 1.25 * e * e * Math.sin(2 * g);
        return (eotRad * 180 / Math.PI) * 4; // Quy đổi ra phút
    }
}

// Class mở rộng Thái Ất Thiên Văn Thực Tế
class ThaiAtAstronomicalEngine extends ThaiAtBaseEngine {
    constructor(tueTich, kyDu, isDuongDon, namCanIdx, tuTru, year, month = 1, day = 1, hour = 12) {
        // Áp dụng calibration lên Tích Niên & Kỷ Dư
        const calib = ThaiYiCalibrator.calibrateYearTichNien(year, tueTich, month, day);
        super(calib.calibratedTichNien, calib.calibratedKyDu, isDuongDon, namCanIdx, tuTru, 'astronomical');
        this.astronomicalData = {
            traditionalTichNien: tueTich,
            calibratedTichNien: calib.calibratedTichNien,
            deltaDYear: calib.deltaDYear,
            julianCentury: calib.julianCentury,
            solarLongitude: ThaiYiCalibrator.getTrueSolarLongitude(year, month, day, hour),
            equationOfTime: ThaiYiCalibrator.getEquationOfTime(year, month, day, hour)
        };
    }
}

if (typeof window === 'undefined') {
    global.ThaiYiCalibrator = ThaiYiCalibrator;
    global.ThaiAtAstronomicalEngine = ThaiAtAstronomicalEngine;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        ThaiYiCalibrator,
        ThaiAtAstronomicalEngine
    };
}
