/**
 * Lịch pháp và Can Chi Lục Hào - calendar.js
 * Tính toán Julian Date, Can Chi ngày/giờ/tháng/năm theo Tiết khí, Tuần Không và Nạp Âm.
 */

const CALENDAR = (function () {
    const CAN = ["Giáp", "Ất", "Bính", "Đinh", "Mậu", "Kỷ", "Canh", "Tân", "Nhâm", "Quý"];
    const CHI = ["Tý", "Sửu", "Dần", "Mão", "Thìn", "Tỵ", "Ngọ", "Mùi", "Thân", "Dậu", "Tuất", "Hợi"];
    const NGU_HANH = {
        "Tý": "Thủy", "Hợi": "Thủy",
        "Dần": "Mộc", "Mão": "Mộc",
        "Tỵ": "Hỏa", "Ngọ": "Hỏa",
        "Thân": "Kim", "Dậu": "Kim",
        "Sửu": "Thổ", "Thìn": "Thổ", "Mùi": "Thổ", "Tuất": "Thổ"
    };

    // 24 Tiết Khí
    const TIET_KHI_NAMES = [
        "Xuân Phân", "Thanh Minh", "Cốc Vũ", "Lập Hạ", "Tiểu Mãn", "Mang Chủng",
        "Hạ Chí", "Tiểu Thử", "Đại Thử", "Lập Thu", "Xử Thử", "Bạch Lộ",
        "Thu Phân", "Hàn Lộ", "Sương Giáng", "Lập Đông", "Tiểu Tuyết", "Đại Tuyết",
        "Đông Chí", "Tiểu Hàn", "Đại Hàn", "Lập Xuân", "Vũ Thủy", "Kinh Trập"
    ];

    // Ngũ hành Nạp Âm cho 60 hoa giáp
    const NAP_AM = {
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

    // Tính toán Julian Date theo UTC
    function getJulianDate(dateObj) {
        let y = dateObj.getUTCFullYear();
        let m = dateObj.getUTCMonth() + 1;
        let d = dateObj.getUTCDate() + (dateObj.getUTCHours() + dateObj.getUTCMinutes() / 60 + dateObj.getUTCSeconds() / 3600) / 24;

        if (m <= 2) {
            y -= 1;
            m += 12;
        }
        let A = Math.floor(y / 100);
        let B = 2 - A + Math.floor(A / 4);
        return Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + d + B - 1524.5;
    }

    // Tính kinh độ mặt trời (Solar Longitude) để xác định Tiết khí
    function getSunLongitude(jd) {
        const D = jd - 2451545.0;
        let g = (357.529 + 0.98560028 * D) % 360;
        if (g < 0) g += 360;
        let q = (280.459 + 0.98564736 * D) % 360;
        if (q < 0) q += 360;
        const gRad = g * Math.PI / 180;
        let L = q + 1.915 * Math.sin(gRad) + 0.020 * Math.sin(2 * gRad);
        L = L % 360;
        if (L < 0) L += 360;
        return L;
    }

    // Lấy tên Tiết khí hiện tại từ kinh độ mặt trời L
    function getTietKhiName(L) {
        // L từ 0 (Xuân Phân), mỗi Tiết cách nhau 15 độ
        let idx = Math.floor(L / 15);
        return TIET_KHI_NAMES[idx] || TIET_KHI_NAMES[0];
    }

    // Xác định tháng tiết khí (0: Dần, 1: Mão, ..., 11: Sửu)
    function getSolarMonthBranchIdx(L) {
        // Lập Xuân ở 315 độ, tương ứng đầu tháng Dần
        let adjusted = (L - 315 + 360) % 360;
        return Math.floor(adjusted / 30);
    }

    // Lấy thông tin lịch pháp hoàn chỉnh cho một thời điểm cụ thể
    function getCalendarDetails(localDate) {
        // Lấy thông tin giờ địa phương Việt Nam (GMT+7)
        // Lưu ý: localDate truyền vào là một đối tượng Date biểu thị thời điểm gieo quẻ
        const jdUTC = getJulianDate(localDate);
        const L = getSunLongitude(jdUTC);

        const localYear = localDate.getFullYear();
        const localMonth = localDate.getMonth() + 1;
        const localDay = localDate.getDate();
        const localHour = localDate.getHours();

        // 1. Tính toán ngày Can Chi (sử dụng 12h trưa để đảm bảo tính ổn định)
        const dateNoonUTC = new Date(Date.UTC(localYear, localMonth - 1, localDay, 5, 0, 0)); // 5:00 UTC = 12:00 GMT+7
        const jdNoon = getJulianDate(dateNoonUTC);
        const dayIdx = Math.floor(jdNoon + 0.5);
        const dayCanIdx = (dayIdx + 9) % 10;
        const dayChiIdx = (dayIdx + 1) % 12;

        const dayCan = CAN[dayCanIdx];
        const dayChi = CHI[dayChiIdx];

        // 2. Tính toán Tháng tiết khí (Nguyệt Lệnh)
        const monthChiIdx = (getSolarMonthBranchIdx(L) + 2) % 12; // Dần=2, Mão=3...
        const monthChi = CHI[monthChiIdx];
        // Tính Can của Tháng theo "Ngũ Dần Khởi Ca"
        // Niên can khởi nguyệt can:
        // Giáp/Kỷ -> Bính Dần (2); Ất/Canh -> Mậu Dần (4); Bính/Tân -> Canh Dần (6); Đinh/Nhâm -> Nhâm Dần (8); Mậu/Quý -> Giáp Dần (0).
        // Phải biết Can năm của thời điểm Tiết khí này.
        // Xác định năm Tiết khí: nếu tháng Tiết khí hiện tại là Sửu (11) hoặc Tý (10) và lịch dương là đầu năm, 
        // hoặc nếu L < 315 (chưa đến Lập Xuân) trong tháng 1, 2 thì năm Tiết khí là localYear - 1.
        let solarYear = localYear;
        if (localMonth === 1) {
            solarYear = localYear - 1;
        } else if (localMonth === 2 && L < 315) {
            solarYear = localYear - 1;
        }
        
        const yearCanIdx = (solarYear - 4) % 10;
        const yearChiIdx = (solarYear - 4) % 12;
        const yearCan = CAN[yearCanIdx];
        const yearChi = CHI[yearChiIdx];

        // Tìm Can của tháng Dần
        const startMonthCanIdx = ((yearCanIdx % 5) * 2 + 2) % 10;
        // Số tháng trôi qua kể từ tháng Dần (Dần=0, Mão=1...)
        const monthsPassed = (monthChiIdx - 2 + 12) % 12;
        const monthCanIdx = (startMonthCanIdx + monthsPassed) % 10;
        const monthCan = CAN[monthCanIdx];

        // 3. Tính toán Giờ Can Chi
        // Chi giờ: 23-1h: Tý(0), 1-3h: Sửu(1)...
        let hourChiIdx = 0;
        if (localHour >= 23 || localHour < 1) hourChiIdx = 0;
        else hourChiIdx = Math.floor((localHour - 1) / 2) + 1;
        const hourChi = CHI[hourChiIdx];
        // Can giờ tính theo Nhật can:
        // Giáp/Kỷ -> Giáp Tý (0); Ất/Canh -> Bính Tý (2); Bính/Tân -> Mậu Tý (4); Đinh/Nhâm -> Canh Tý (6); Mậu/Quý -> Nhâm Tý (8).
        const startHourCanIdx = ((dayCanIdx % 5) * 2) % 10;
        const hourCanIdx = (startHourCanIdx + hourChiIdx) % 10;
        const hourCan = CAN[hourCanIdx];

        // 4. Tính toán Tuần Không của ngày
        // Thống kê Void chi:
        // diff = (dayChiIdx - dayCanIdx + 12) % 12
        // Void 1: (diff - 2 + 12) % 12
        // Void 2: (diff - 1 + 12) % 12
        const diff = (dayChiIdx - dayCanIdx + 12) % 12;
        const tk1Idx = (diff - 2 + 12) % 12;
        const tk2Idx = (diff - 1 + 12) % 12;
        const tuanKhong = [CHI[tk1Idx], CHI[tk2Idx]];

        // 5. Ngũ hành Nạp Âm của ngày và tháng
        const dayNapAm = NAP_AM[`${dayCan} ${dayChi}`] || "";
        const monthNapAm = NAP_AM[`${monthCan} ${monthChi}`] || "";
        const yearNapAm = NAP_AM[`${yearCan} ${yearChi}`] || "";

        return {
            solarDateStr: localDate.toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' }),
            tietKhi: getTietKhiName(L),
            year: { can: yearCan, chi: yearChi, napAm: yearNapAm },
            month: { can: monthCan, chi: monthChi, napAm: monthNapAm },
            day: { can: dayCan, chi: dayChi, napAm: dayNapAm, canIdx: dayCanIdx, chiIdx: dayChiIdx },
            hour: { can: hourCan, chi: hourChi },
            tuanKhong: tuanKhong,
            sunLongitude: L
        };
    }

    return {
        CAN,
        CHI,
        NGU_HANH,
        NAP_AM,
        getJulianDate,
        getSunLongitude,
        getTietKhiName,
        getSolarMonthBranchIdx,
        getCalendarDetails
    };
})();
