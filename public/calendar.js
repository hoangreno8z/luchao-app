/**
 * Lịch pháp và Can Chi Lục Hào - calendar.js
 * (Adapted exactly from gieoque.id.vn logic to ensure 100% correctness)
 */

const CALENDAR = (function () {
    const CAN = ['Giáp', 'Ất', 'Bính', 'Đinh', 'Mậu', 'Kỷ', 'Canh', 'Tân', 'Nhâm', 'Quý'];
    const CHI = ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi'];

    const NGU_HANH_CHI = {
        'Hợi': 'Thủy', 'Tý': 'Thủy',
        'Dần': 'Mộc', 'Mão': 'Mộc',
        'Tỵ': 'Hỏa', 'Ngọ': 'Hỏa',
        'Thân': 'Kim', 'Dậu': 'Kim',
        'Thìn': 'Thổ', 'Tuất': 'Thổ', 'Sửu': 'Thổ', 'Mùi': 'Thổ'
    };

    function calculateSolarTermDate(year, termIndex) {
        const baseDate = new Date(Date.UTC(year, 0, 1));
        const approxDays = termIndex * 15.218 + 5.5;
        let jd = (baseDate.getTime() / 86400000) + 2440587.5 + approxDays;
        let targetLong = (285 + termIndex * 15) % 360;

        for (let k = 0; k < 3; k++) {
            const t = (jd - 2451545.0) / 36525.0;
            const L0 = 280.46646 + 36000.76983 * t;
            const M = 357.52911 + 35999.05029 * t;
            const C = (1.914602 - 0.004817 * t) * Math.sin(M * Math.PI / 180) + (0.019993) * Math.sin(2 * M * Math.PI / 180);
            let trueLong = (L0 + C) % 360;
            if (trueLong < 0) trueLong += 360;
            let error = targetLong - trueLong;
            if (error > 180) error -= 360;
            if (error < -180) error += 360;
            jd += error / 0.9856;
        }

        const z = Math.floor(jd + 0.5);
        const f = jd + 0.5 - z;
        let alpha = Math.floor((z - 1867216.25) / 36524.25);
        const a = z + 1 + alpha - Math.floor(alpha / 4);
        const b = a + 1524;
        const c = Math.floor((b - 122.1) / 365.25);
        const d = Math.floor(365.25 * c);
        const e = Math.floor((b - d) / 30.6001);
        const day = b - d - Math.floor(30.6001 * e) + f;
        const month = e < 14 ? e - 1 : e - 13;
        const yy = month > 2 ? c - 4716 : c - 4715;
        const totalSec = Math.floor((day - Math.floor(day)) * 86400);

        return new Date(Date.UTC(yy, month - 1, Math.floor(day), Math.floor(totalSec / 3600), Math.floor((totalSec % 3600) / 60)));
    }

    function getSolarTerm(year) {
        const termInfo = [];
        for (let i = 0; i < 24; i++) {
            termInfo.push(calculateSolarTermDate(year, i));
        }
        return termInfo;
    }

    function calculateCanChi(dateInput) {
        let d = new Date(dateInput);
        if (d.getHours() >= 23) d.setDate(d.getDate() + 1); // Giờ Tý đổi ngày

        const y = d.getFullYear();
        const a = Math.floor((14 - (d.getMonth() + 1)) / 12);
        const yJD = d.getFullYear() + 4800 - a;
        const mJD = (d.getMonth() + 1) + 12 * a - 3;
        const jd = d.getDate() + Math.floor((153 * mJD + 2) / 5) + 365 * yJD + Math.floor(yJD / 4) - Math.floor(yJD / 100) + Math.floor(yJD / 400) - 32045;

        const canNgayIdx = (jd + 9) % 10;
        const chiNgayIdx = (jd + 1) % 12;

        const terms = getSolarTerm(y);
        const termsPrev = getSolarTerm(y - 1);
        const lapXuan = terms[2];

        let solarYear = d < lapXuan ? y - 1 : y;
        let canNamIdx = (solarYear - 4) % 10;
        if (canNamIdx < 0) canNamIdx += 10;
        let chiNamIdx = (solarYear - 4) % 12;
        if (chiNamIdx < 0) chiNamIdx += 12;

        let chiThangIdx = 1;
        if (d >= termsPrev[22] && d < terms[0]) {
            chiThangIdx = 0;
        } else {
            const checkOrder = [22, 20, 18, 16, 14, 12, 10, 8, 6, 4, 2, 0];
            const mapping = { 2: 2, 4: 3, 6: 4, 8: 5, 10: 6, 12: 7, 14: 8, 16: 9, 18: 10, 20: 11, 22: 0, 0: 1 };
            for (let tIdx of checkOrder) {
                if (d >= terms[tIdx]) {
                    chiThangIdx = mapping[tIdx];
                    break;
                }
            }
        }

        const canThangIdx = ((canNamIdx * 2 + 2) + (chiThangIdx - 2 + 12)) % 10;

        let h = d.getHours();
        const chiGioIdx = (h >= 23 || h < 1) ? 0 : Math.floor((h + 1) / 2) % 12;
        const canGioIdx = (((canNgayIdx % 5) * 2) + chiGioIdx) % 10;

        const diff = (chiNgayIdx - canNgayIdx + 12) % 12;
        const tk1 = CHI[(diff - 2 + 12) % 12];
        const tk2 = CHI[(diff - 1 + 12) % 12];

        let dayOfYear = Math.floor((d - new Date(y, 0, 0)) / 86400000);
        const termNames = ['Tiểu Hàn', 'Đại Hàn', 'Lập Xuân', 'Vũ Thủy', 'Kinh Trập', 'Xuân Phân', 'Thanh Minh', 'Cốc Vũ', 'Lập Hạ', 'Tiểu Mãn', 'Mang Chủng', 'Hạ Chí', 'Tiểu Thử', 'Đại Thử', 'Lập Thu', 'Xử Thử', 'Bạch Lộ', 'Thu Phân', 'Hàn Lộ', 'Sương Giáng', 'Lập Đông', 'Tiểu Tuyết', 'Đại Tuyết', 'Đông Chí'];
        let tIdx = Math.floor(dayOfYear / 15.22);
        if (tIdx > 23) tIdx = 23;

        // Bổ sung nạp âm ngày tháng năm
        const getNapAm = (can, chi) => {
            const key = `${can} ${chi}`;
            const map = {
                "Giáp Tý": "Hải Trung Kim", "Ất Sửu": "Hải Trung Kim",
                "Bính Dần": "Lô Trung Hỏa", "Đinh Mão": "Lô Trung Hỏa",
                "Mậu Thìn": "Đại Lâm Mộc", "Kỷ Tỵ": "Đại Lâm Mộc",
                "Canh Ngọ": "Lộ Bàng Thổ", "Tân Mùi": "Lộ Bàng Thổ",
                "Nhâm Thân": "Kiếm Phong Kim", "Quý Dậu": "Kiếm Phong Kim",
                "Giáp Tuất": "Sơn Đầu Hỏa", "Ất Hợi": "Sơn Đầu Hỏa",
                "Bính Tý": "Giản Hạ Thủy", "Đinh Sửu": "Giản Hạ Thủy",
                "Mậu Dần": "Thành Đầu Thổ", "Kỷ Mão": "Thành Đầu Thổ",
                "Canh Thìn": "Bạch Lạp Kim", "Tân Tỵ": "Bạch Lạp Kim",
                "Nhâm Ngọ": "Dương Liễu Mộc", "Quý Mùi": "Dương Liễu Mộc",
                "Giáp Thân": "Tuyền Trung Thủy", "Ất Dậu": "Tuyền Trung Thủy",
                "Bính Tuất": "Ốc Thượng Thổ", "Đinh Hợi": "Ốc Thượng Thổ",
                "Mậu Tý": "Tích Lịch Hỏa", "Kỷ Sửu": "Tích Lịch Hỏa",
                "Canh Dần": "Tùng Bách Mộc", "Tân Mão": "Tùng Bách Mộc",
                "Nhâm Thìn": "Trường Lưu Thủy", "Quý Tỵ": "Trường Lưu Thủy",
                "Giáp Ngọ": "Sa Trung Kim", "Ất Mùi": "Sa Trung Kim",
                "Bính Thân": "Sơn Hạ Hỏa", "Đinh Dậu": "Sơn Hạ Hỏa",
                "Mậu Tuất": "Bình Địa Mộc", "Kỷ Hợi": "Bình Địa Mộc",
                "Canh Tý": "Bích Thượng Thổ", "Tân Sửu": "Bích Thượng Thổ",
                "Nhâm Dần": "Kim Bạch Kim", "Quý Mão": "Kim Bạch Kim",
                "Giáp Thìn": "Phúc Đăng Hỏa", "Ất Tỵ": "Phúc Đăng Hỏa",
                "Bính Ngọ": "Thiên Hà Thủy", "Đinh Mùi": "Thiên Hà Thủy",
                "Mậu Thân": "Đại Trạch Thổ", "Kỷ Dậu": "Đại Trạch Thổ",
                "Canh Tuất": "Thoa Xuyến Kim", "Tân Hợi": "Thoa Xuyến Kim",
                "Nhâm Tý": "Tang Đố Mộc", "Quý Sửu": "Tang Đố Mộc",
                "Giáp Dần": "Đại Khê Thủy", "Ất Mão": "Đại Khê Thủy",
                "Bính Thìn": "Sa Trung Thổ", "Đinh Tỵ": "Sa Trung Thổ",
                "Mậu Ngọ": "Thiên Thượng Hỏa", "Kỷ Mùi": "Thiên Thượng Hỏa",
                "Canh Thân": "Thạch Lựu Mộc", "Tân Dậu": "Thạch Lựu Mộc",
                "Nhâm Tuất": "Đại Hải Thủy", "Quý Hợi": "Đại Hải Thủy"
            };
            return map[key] || "";
        };

        return {
            nam: { can: CAN[canNamIdx], chi: CHI[chiNamIdx], napAm: getNapAm(CAN[canNamIdx], CHI[chiNamIdx]) },
            thang: { can: CAN[canThangIdx], chi: CHI[chiThangIdx], hanh: NGU_HANH_CHI[CHI[chiThangIdx]], napAm: getNapAm(CAN[canThangIdx], CHI[chiThangIdx]) },
            ngay: { can: CAN[canNgayIdx], chi: CHI[chiNgayIdx], hanh: NGU_HANH_CHI[CHI[chiNgayIdx]], napAm: getNapAm(CAN[canNgayIdx], CHI[chiNgayIdx]) },
            gio: { can: CAN[canGioIdx], chi: CHI[chiGioIdx] },
            tuanKhong: [tk1, tk2],
            tietKhi: termNames[tIdx]
        };
    }

    return {
        CAN,
        CHI,
        NGU_HANH_CHI,
        calculateCanChi,
        calculateSolarTermDate,
        getSolarTerm
    };
})();
