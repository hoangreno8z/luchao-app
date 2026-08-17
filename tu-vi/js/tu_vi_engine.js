/**
 * TU VI DAU SO ENGINE - VIETNAMESE TRADITIONAL ASTRONOMICAL & ASTROLOGICAL CORE
 * Developed for Dich Su Nguyen Huy Hoang
 * Full implementation of 14 Main Stars, Luc Sat, Luc Cat, Tu Hoa, Thai Tue 12, Bac Sy 12, Trang Sinh 12,
 * Am Sat, Nguyet Sat, Vong Tuong Tinh, Tuan/Triet, Luu Tinh, and 12-Palace Analysis.
 */

// 1. CAN CHI & NGU HANH CONSTANTS
export const CAN_NAMES = ["Giáp", "Ất", "Bính", "Đinh", "Mậu", "Kỷ", "Canh", "Tân", "Nhâm", "Quý"];
export const CHI_NAMES = ["Tý", "Sửu", "Dần", "Mão", "Thìn", "Tị", "Ngọ", "Mùi", "Thân", "Dậu", "Tuất", "Hợi"];

// Ngũ hành của 10 Can
export const CAN_ELEMENTS = {
    "Giáp": "Mộc", "Ất": "Mộc",
    "Bính": "Hỏa", "Đinh": "Hỏa",
    "Mậu": "Thổ", "Kỷ": "Thổ",
    "Canh": "Kim", "Tân": "Kim",
    "Nhâm": "Thủy", "Quý": "Thủy"
};

// Ngũ hành của 12 Chi
export const CHI_ELEMENTS = {
    "Tý": "Thủy", "Sửu": "Thổ", "Dần": "Mộc", "Mão": "Mộc",
    "Thìn": "Thổ", "Tị": "Hỏa", "Ngọ": "Hỏa", "Mùi": "Thổ",
    "Thân": "Kim", "Dậu": "Kim", "Tuất": "Thổ", "Hợi": "Thủy"
};

// Bảng màu chuẩn Ngũ Hành - Độ Đậm Màu Tối Đa (High Contrast)
export const ELEMENT_COLORS = {
    "Kim": "#475569",   // Xám chì đậm / Khí Kim
    "Mộc": "#15803d",   // Xanh lá đậm / Khí Mộc
    "Thủy": "#1d4ed8",  // Xanh lam đậm / Khí Thủy
    "Hỏa": "#dc2626",   // Đỏ tươi đậm / Khí Hỏa
    "Thổ": "#92400e"    // Nâu hổ phách đậm / Khí Thổ
};

// 60 Hoa Giáp Nạp Âm
export const NAP_AM_60 = {
    "Giáp Tý": "Hải Trung Kim", "Ất Sửu": "Hải Trung Kim",
    "Bính Dần": "Lư Trung Hỏa", "Đinh Mão": "Lư Trung Hỏa",
    "Mậu Thìn": "Đại Lâm Mộc", "Kỷ Tị": "Đại Lâm Mộc",
    "Canh Ngọ": "Lộ Bàng Thổ", "Tân Mùi": "Lộ Bàng Thổ",
    "Nhâm Thân": "Kiếm Phong Kim", "Quý Dậu": "Kiếm Phong Kim",
    "Giáp Tuất": "Sơn Đầu Hỏa", "Ất Hợi": "Sơn Đầu Hỏa",
    "Bính Tý": "Giản Hạ Thủy", "Đinh Sửu": "Giản Hạ Thủy",
    "Mậu Dần": "Thành Đầu Thổ", "Kỷ Mão": "Thành Đầu Thổ",
    "Canh Thìn": "Bạch Lạp Kim", "Tân Tị": "Bạch Lạp Kim",
    "Nhâm Ngọ": "Dương Liễu Mộc", "Quý Mùi": "Dương Liễu Mộc",
    "Giáp Thân": "Tuyền Trung Thủy", "Ất Dậu": "Tuyền Trung Thủy",
    "Bính Tuất": "Ốc Thượng Thổ", "Đinh Hợi": "Ốc Thượng Thổ",
    "Mậu Tý": "Tích Lịch Hỏa", "Kỷ Sửu": "Tích Lịch Hỏa",
    "Canh Dần": "Tùng Bách Mộc", "Tân Mão": "Tùng Bách Mộc",
    "Nhâm Thìn": "Trường Lưu Thủy", "Quý Tị": "Trường Lưu Thủy",
    "Giáp Ngọ": "Sa Trung Kim", "Ất Mùi": "Sa Trung Kim",
    "Bính Thân": "Sơn Hạ Hỏa", "Đinh Dậu": "Sơn Hạ Hỏa",
    "Mậu Tuất": "Bình Địa Mộc", "Kỷ Hợi": "Bình Địa Mộc",
    "Canh Tý": "Bích Thượng Thổ", "Tân Sửu": "Bích Thượng Thổ",
    "Nhâm Dần": "Kim Bạch Kim", "Quý Mão": "Kim Bạch Kim",
    "Giáp Thìn": "Phúc Đăng Hỏa", "Ất Tị": "Phúc Đăng Hỏa",
    "Bính Ngọ": "Thiên Hà Thủy", "Đinh Mùi": "Thiên Hà Thủy",
    "Mậu Thân": "Đại Dịch Thổ", "Kỷ Dậu": "Đại Dịch Thổ",
    "Canh Tuất": "Thoa Xuyến Kim", "Tân Hợi": "Thoa Xuyến Kim",
    "Nhâm Tý": "Tang Đố Mộc", "Quý Sửu": "Tang Đố Mộc",
    "Giáp Dần": "Đại Khê Thủy", "Ất Mão": "Đại Khê Thủy",
    "Bính Thìn": "Sa Trung Thổ", "Đinh Tị": "Sa Trung Thổ",
    "Mậu Ngọ": "Thiên Thượng Hỏa", "Kỷ Mùi": "Thiên Thượng Hỏa",
    "Canh Thân": "Thạch Lựu Mộc", "Tân Dậu": "Thạch Lựu Mộc",
    "Nhâm Tuất": "Đại Hải Thủy", "Quý Hợi": "Đại Hải Thủy"
};

// Tên 12 Cung chức năng
export const CUNG_CHUC_NANG = [
    "MỆNH", "PHỤ MẪU", "PHÚC ĐỨC", "ĐIỀN TRẠCH",
    "QUAN LỘC", "NÔ BỘC", "THIÊN DI", "TẬT ÁCH",
    "TÀI BẠCH", "TỬ TỨC", "PHU THÊ", "HUYNH ĐỆ"
];

// Ngũ Hành Cục: Tên, Số Cục, Ngũ Hành
export const CUC_INFO = {
    2: { name: "Thủy nhị cục", number: 2, element: "Thủy" },
    3: { name: "Mộc tam cục", number: 3, element: "Mộc" },
    4: { name: "Kim tứ cục", number: 4, element: "Kim" },
    5: { name: "Thổ ngũ cục", number: 5, element: "Thổ" },
    6: { name: "Hỏa lục cục", number: 6, element: "Hỏa" }
};

// Độ Miếu Hãm của 14 Chính Tinh tại 12 Cung (0=Tý, 1=Sửu, ..., 11=Hợi)
export const CHINH_TINH_MIEU_HAM = {
    "Tử Vi":      ["B", "Đ", "M", "B", "V", "M", "M", "Đ", "M", "B", "V", "B"],
    "Liêm Trinh": ["V", "Đ", "M", "H", "V", "H", "V", "Đ", "M", "H", "V", "H"],
    "Thiên Cơ":   ["M", "Đ", "H", "M", "V", "B", "M", "Đ", "H", "M", "V", "B"],
    "Vũ Khúc":    ["V", "M", "V", "Đ", "M", "H", "V", "M", "V", "Đ", "M", "H"],
    "Thái Dương": ["H", "Đ", "V", "M", "V", "V", "M", "Đ", "H", "H", "H", "H"],
    "Thiên Đồng": ["V", "H", "M", "Đ", "H", "Đ", "H", "H", "M", "H", "V", "Đ"],
    "Thiên Phủ":  ["M", "M", "M", "B", "M", "Đ", "V", "M", "M", "B", "M", "Đ"],
    "Thái Âm":    ["M", "Đ", "H", "H", "H", "H", "H", "Đ", "V", "M", "M", "M"],
    "Tham Lang":  ["H", "M", "Đ", "H", "V", "H", "H", "M", "Đ", "H", "V", "H"],
    "Cự Môn":     ["V", "H", "M", "M", "H", "H", "V", "H", "M", "M", "Đ", "Đ"],
    "Thiên Tướng":["V", "M", "M", "H", "V", "Đ", "V", "Đ", "M", "H", "V", "Đ"],
    "Thiên Lương":["V", "V", "M", "M", "V", "H", "M", "Đ", "V", "H", "M", "H"],
    "Thất Sát":   ["M", "Đ", "M", "H", "H", "V", "M", "Đ", "M", "H", "H", "V"],
    "Phá Quân":   ["M", "V", "H", "H", "Đ", "H", "M", "V", "H", "H", "Đ", "H"]
};

// Ngũ Hành của các Tinh Đẩu
export const STAR_ELEMENTS = {
    // 14 Chính Tinh
    "Tử Vi": "Thổ", "Liêm Trinh": "Hỏa", "Thiên Cơ": "Mộc", "Vũ Khúc": "Kim",
    "Thái Dương": "Hỏa", "Thiên Đồng": "Thủy", "Thiên Phủ": "Thổ", "Thái Âm": "Thủy",
    "Tham Lang": "Thủy", "Cự Môn": "Thủy", "Thiên Tướng": "Thủy", "Thiên Lương": "Mộc",
    "Thất Sát": "Kim", "Phá Quân": "Thủy",

    // Lục Cát & Phụ Tinh Tốt
    "Văn Xương": "Kim", "Văn Khúc": "Thủy", "Tả Phù": "Thổ", "Hữu Bật": "Thổ",
    "Thiên Khôi": "Hỏa", "Thiên Việt": "Hỏa", "Lộc Tồn": "Thổ", "Thiên Mã": "Hỏa",
    "Long Trì": "Thủy", "Phượng Các": "Thổ", "Hồng Loan": "Thủy", "Thiên Hỷ": "Thủy",
    "Hoa Cái": "Kim", "Đào Hoa": "Mộc", "Tam Thai": "Thủy", "Bát Tọa": "Thủy",
    "Ân Quang": "Mộc", "Thiên Quý": "Thổ", "Thai Phụ": "Kim", "Phong Cáo": "Thổ",
    "Thiên Quan": "Hỏa", "Thiên Phúc": "Thổ", "Thiên Giải": "Hỏa", "Địa Giải": "Thổ",
    "Nguyệt Giải": "Hỏa", "Giải Thần": "Mộc", "Quốc Ấn": "Thổ", "Đường Phù": "Mộc",
    "Thiên Trù": "Thổ", "Thiên Tài": "Thổ", "Thiên Thọ": "Thổ", "Thiên Đức": "Hỏa",
    "Nguyệt Đức": "Hỏa", "Phúc Đức": "Thổ", "Thiếu Dương": "Hỏa", "Thiếu Âm": "Thủy",
    "Long Đức": "Thủy", "Bác Sỹ": "Thủy", "Lực Sĩ": "Hỏa", "Thanh Long": "Thủy",
    "Tướng Quân": "Mộc", "Tấu Thư": "Kim", "Hỷ Thần": "Hỏa",

    // Lục Sát & Hung Bại Tinh
    "Kình Dương": "Kim", "Đà La": "Kim", "Địa Không": "Hỏa", "Địa Kiếp": "Hỏa",
    "Hỏa Tinh": "Hỏa", "Linh Tinh": "Hỏa", "Thiên Hình": "Hỏa", "Thiên Diêu": "Thủy",
    "Thiên Y": "Thủy", "Cô Thần": "Thổ", "Quả Tú": "Thổ", "Kiếp Sát": "Hỏa",
    "Phá Toái": "Hỏa", "Thiên Khốc": "Thủy", "Thiên Hư": "Thủy", "Tang Môn": "Mộc",
    "Bạch Hổ": "Kim", "Tuế Phá": "Hỏa", "Điếu Khách": "Hỏa", "Trực Phù": "Hỏa",
    "Tiểu Hao": "Hỏa", "Đại Hao": "Hỏa", "Bệnh Phù": "Thổ", "Phục Binh": "Hỏa",
    "Quan Phủ": "Hỏa", "Quan Phù": "Hỏa", "Tử Phù": "Hỏa", "Thiên Thương": "Thổ",
    "Thiên Sứ": "Thủy", "Thiên La": "Thổ", "Địa Võng": "Thổ", "Lưu Hà": "Thủy",
    "Đẩu Quân": "Hỏa", "Âm Sát": "Thổ", "Nguyệt Sát": "Hỏa",

    // Vòng Tướng Tinh
    "Tướng Tinh": "Mộc", "Phan An": "Thủy", "Tuế Dịch": "Hỏa", "Tức Thần": "Hỏa",
    "Tai Sát": "Hỏa", "Thiên Sát": "Hỏa", "Chỉ Bối": "Hỏa", "Hàm Trì": "Thủy",
    "Vong Thần": "Hỏa",

    // Tứ Hóa
    "Hóa Lộc": "Mộc", "Hóa Quyền": "Mộc", "Hóa Khoa": "Thủy", "Hóa Kỵ": "Thủy",

    // Sao Lưu
    "L.Thái Tuế": "Hỏa", "L.Tang Môn": "Mộc", "L.Bạch Hổ": "Kim",
    "L.Kình Dương": "Kim", "L.Đà La": "Kim", "L.Thiên Mã": "Hỏa",
    "L.Thiên Khốc": "Thủy", "L.Thiên Hư": "Thủy", "L.Lộc Tồn": "Thổ",
    "L.Văn Tinh": "Hỏa"
};

// 2. THUẬT TOÁN TÍNH TOÁN AN SAO TỬ VI ĐẨU SỐ TOÀN DIỆN
export class TuViEngine {

    /**
     * Tính toán toàn bộ lá số Tử Vi
     */
    static calculateHoroscope({
        name = "Đương Số",
        gender = "Nam", // "Nam" | "Nữ"
        solarDay, solarMonth, solarYear,
        lunarDay, lunarMonth, lunarYear, isLeap = false,
        hourIndex, // 0=Tý, 1=Sửu, ..., 11=Hợi
        viewYear = 2026,
        showSaoLuu = true,
        showDaoHongLuu = true,
        luongThiMode = false
    }) {
        // Can Chi Năm, Tháng, Ngày, Giờ
        const yearCanIdx = (lunarYear - 4) % 10;
        const yearChiIdx = (lunarYear - 4) % 12;
        const yearCan = CAN_NAMES[yearCanIdx];
        const yearChi = CHI_NAMES[yearChiIdx];
        const yearCanChi = `${yearCan} ${yearChi}`;

        // Xác định Âm / Dương của năm sinh
        // Giáp, Bính, Mậu, Canh, Nhâm = Dương (0, 2, 4, 6, 8)
        // Ất, Đinh, Kỷ, Tân, Quý = Âm (1, 3, 5, 7, 9)
        const isDuongYear = (yearCanIdx % 2 === 0);
        const amDuongNamNu = isDuongYear 
            ? (gender === "Nam" ? "Dương Nam" : "Dương Nữ")
            : (gender === "Nam" ? "Âm Nam" : "Âm Nữ");

        // Chiều vận hành Đại Hạn: Dương Nam, Âm Nữ = Thuận (1); Âm Nam, Dương Nữ = Nghịch (-1)
        const isThuan = (gender === "Nam" && isDuongYear) || (gender === "Nữ" && !isDuongYear);
        const direction = isThuan ? 1 : -1;

        // Nạp Âm Bản Mệnh
        const banMenh = NAP_AM_60[yearCanChi] || "Sa Trung Kim";
        const banMenhElement = banMenh.split(" ").pop(); // Lấy chữ cuối: Kim, Mộc, Thủy, Hỏa, Thổ

        // 1. TÌM CUNG MỆNH & CUNG THÂN
        // Khởi từ Dần (cung index 2)
        // Tháng sinh (lunarMonth), Giờ sinh (hourIndex: 0=Tý, 1=Sửu...)
        // Mệnh = (2 + (lunarMonth - 1) - hourIndex + 24) % 12
        // Thân = (2 + (lunarMonth - 1) + hourIndex) % 12
        const menhPos = (2 + (lunarMonth - 1) - hourIndex + 24) % 12;
        const thanPos = (2 + (lunarMonth - 1) + hourIndex) % 12;

        // 2. NGŨ HỔ ĐỘN: AN CAN CHO 12 CUNG
        // Khởi từ Dần (cung index 2) theo Can Năm:
        // Giáp/Kỷ -> Bính Dần (2)
        // Ất/Canh -> Mậu Dần (4)
        // Bính/Tân -> Canh Dần (6)
        // Đinh/Nhâm -> Nhâm Dần (8)
        // Mậu/Quý -> Giáp Dần (0)
        // Quy tắc: Can Tý = Can Dần, Can Sửu = Can Mão
        const danCanStart = [2, 4, 6, 8, 0, 2, 4, 6, 8, 0][yearCanIdx];
        const cungCanMap = {
            2: danCanStart,                      // Dần (khởi điểm)
            3: (danCanStart + 1) % 10,           // Mão
            4: (danCanStart + 2) % 10,           // Thìn
            5: (danCanStart + 3) % 10,           // Tị
            6: (danCanStart + 4) % 10,           // Ngọ
            7: (danCanStart + 5) % 10,           // Mùi
            8: (danCanStart + 6) % 10,           // Thân
            9: (danCanStart + 7) % 10,           // Dậu
            10: (danCanStart + 8) % 10,          // Tuất
            11: (danCanStart + 9) % 10,          // Hợi
            0: danCanStart,                      // Tý (bằng Dần)
            1: (danCanStart + 1) % 10            // Sửu (bằng Mão)
        };
        const cungCanList = new Array(12);
        for (let i = 0; i < 12; i++) {
            cungCanList[i] = CAN_NAMES[cungCanMap[i]];
        }

        // 3. TÍNH CỤC (NGŨ HÀNH CỤC)
        // Dựa vào Can Cung Mệnh và Chi Cung Mệnh
        const menhCan = cungCanList[menhPos];
        const menhChi = CHI_NAMES[menhPos];
        const menhCanChi = `${menhCan} ${menhChi}`;
        const menhNapAm = NAP_AM_60[menhCanChi] || "Hải Trung Kim";
        const menhCucElement = menhNapAm.split(" ").pop();

        let cucNumber = 2; // Mặc định Thủy nhị cục
        if (menhCucElement === "Thủy") cucNumber = 2;
        else if (menhCucElement === "Mộc") cucNumber = 3;
        else if (menhCucElement === "Kim") cucNumber = 4;
        else if (menhCucElement === "Thổ") cucNumber = 5;
        else if (menhCucElement === "Hỏa") cucNumber = 6;
        const cucInfo = CUC_INFO[cucNumber];

        // 4. AN 12 CUNG CHỨC NĂNG
        // Thứ tự thuận chiều kim đồng hồ từ Mệnh: Mệnh, Phụ Mẫu, Phúc Đức, Điền Trạch, Quan Lộc, Nô Bộc, Thiên Di, Tật Ách, Tài Bạch, Tử Tức, Phu Thê, Huynh Đệ
        const cungNames = new Array(12);
        for (let k = 0; k < 12; k++) {
            const pos = (menhPos + k) % 12;
            cungNames[pos] = CUNG_CHUC_NANG[k];
        }

        // Thân cư cung nào?
        const thanCungName = cungNames[thanPos];

        // 5. KHỞI ĐẠI HẠN (10 NĂM MỖI CUNG)
        const daiHanList = new Array(12);
        for (let step = 0; step < 12; step++) {
            const pos = (menhPos + step * direction + 120) % 12;
            daiHanList[pos] = cucNumber + step * 10;
        }

        // 6. KHỞI TIỂU HẠN & NGUYỆT HẠN
        // Tiểu hạn nam thuận nữ nghịch, khởi theo Chi Năm:
        // Thân Tý Thìn -> Tuất (10); Dần Ngọ Tuất -> Thìn (4); Tỵ Dậu Sửu -> Mùi (7); Hợi Mão Mùi -> Sửu (1)
        const tieuHanStartChi = [10, 7, 4, 1, 10, 7, 4, 1, 10, 7, 4, 1][yearChiIdx];
        const tieuHanDir = (gender === "Nam") ? 1 : -1;
        const tieuHanList = new Array(12);
        for (let i = 0; i < 12; i++) {
            const pos = (tieuHanStartChi + i * tieuHanDir + 120) % 12;
            tieuHanList[pos] = CHI_NAMES[i];
        }

        // 7. KHỞI NGUYỆT HẠN (12 THÁNG)
        // Tìm cung có Tiểu Hạn = Chi năm xem
        const viewYearChiIdx = (viewYear - 4) % 12;
        let tieuHanViewYearPos = 0;
        for (let p = 0; p < 12; p++) {
            if (tieuHanList[p] === CHI_NAMES[viewYearChiIdx]) {
                tieuHanViewYearPos = p;
                break;
            }
        }
        // Từ cung Tiểu hạn năm xem, coi là tháng 1, đếm nghịch đến tháng sinh, rồi thuận đến giờ sinh gặp cung đó là tháng 1 nguyệt hạn
        const nguyetHan1Pos = (tieuHanViewYearPos - (lunarMonth - 1) + hourIndex + 24) % 12;
        const nguyetHanList = new Array(12);
        for (let m = 1; m <= 12; m++) {
            const pos = (nguyetHan1Pos + (m - 1)) % 12;
            nguyetHanList[pos] = `Tháng ${m}`;
        }

        // 8. TÌM VỊ TRÍ TỬ VI
        const tuViPos = this.findTuViPosition(lunarDay, cucNumber);

        // 9. CẤU TRÚC 12 Ô LÁ SỐ
        const palaces = [];
        for (let i = 0; i < 12; i++) {
            palaces.push({
                chiIndex: i,
                chiName: CHI_NAMES[i],
                canName: cungCanList[i], // CHỈ HIỂN THỊ TÊN CAN (ví dụ "Giáp", "Ất", "Mậu")
                canElement: CAN_ELEMENTS[cungCanList[i]],
                cungName: cungNames[i],
                isThan: (i === thanPos),
                daiHan: daiHanList[i],
                tieuHan: tieuHanList[i],
                nguyetHan: nguyetHanList[i],
                mainStars: [],    // 14 Chính tinh
                goodStars: [],    // Cát tinh (cột trái)
                badStars: [],     // Sát tinh / Bại tinh (cột phải)
                trangSinh: "",    // Sao Vòng Tràng Sinh
                bacSy: "",        // Sao Vòng Bác Sỹ
                thaiTue: ""       // Sao Vòng Thái Tuế
            });
        }

        // 10. AN 14 CHÍNH TINH
        // Vòng Tử Vi (nghịch)
        const tuViGroup = [
            { name: "Tử Vi", offset: 0 },
            { name: "Thiên Cơ", offset: -1 },
            { name: "Thái Dương", offset: -3 },
            { name: "Vũ Khúc", offset: -4 },
            { name: "Thiên Đồng", offset: -5 },
            { name: "Liêm Trinh", offset: -8 }
        ];
        tuViGroup.forEach(star => {
            const pos = (tuViPos + star.offset + 24) % 12;
            const mieuHam = CHINH_TINH_MIEU_HAM[star.name][pos];
            palaces[pos].mainStars.push({
                name: star.name,
                mieuHam,
                element: STAR_ELEMENTS[star.name]
            });
        });

        // Vòng Thiên Phủ (thuận)
        // Thiên Phủ đối xứng Tử Vi qua trục Dần (2) - Thân (8): posTP = (4 - posTuVi + 12) % 12
        const thienPhuPos = (4 - tuViPos + 24) % 12;
        const thienPhuGroup = [
            { name: "Thiên Phủ", offset: 0 },
            { name: "Thái Âm", offset: 1 },
            { name: "Tham Lang", offset: 2 },
            { name: "Cự Môn", offset: 3 },
            { name: "Thiên Tướng", offset: 4 },
            { name: "Thiên Lương", offset: 5 },
            { name: "Thất Sát", offset: 6 },
            { name: "Phá Quân", offset: 10 }
        ];
        thienPhuGroup.forEach(star => {
            const pos = (thienPhuPos + star.offset + 24) % 12;
            const mieuHam = CHINH_TINH_MIEU_HAM[star.name][pos];
            palaces[pos].mainStars.push({
                name: star.name,
                mieuHam,
                element: STAR_ELEMENTS[star.name]
            });
        });

        // 11. AN VÒNG THÁI TUẾ (12 SAO THEO CHI NĂM)
        const thaiTueGroup = [
            { name: "Thái Tuế", bad: false },
            { name: "Thiếu Dương", bad: false },
            { name: "Tang Môn", bad: true, mieu: ["H", "Đ", "M", "H", "H", "Đ", "H", "H", "M", "H", "H", "Đ"] },
            { name: "Thiếu Âm", bad: false },
            { name: "Quan Phù", bad: true },
            { name: "Tử Phù", bad: true },
            { name: "Tuế Phá", bad: true },
            { name: "Long Đức", bad: false },
            { name: "Bạch Hổ", bad: true, mieu: ["H", "Đ", "M", "H", "H", "Đ", "H", "H", "M", "H", "H", "Đ"] },
            { name: "Phúc Đức", bad: false },
            { name: "Điếu Khách", bad: true },
            { name: "Trực Phù", bad: true }
        ];
        thaiTueGroup.forEach((star, idx) => {
            const pos = (yearChiIdx + idx) % 12;
            const mieuHam = star.mieu ? star.mieu[pos] : "";
            const starObj = { name: star.name, mieuHam, element: STAR_ELEMENTS[star.name] || "Hỏa" };
            if (idx === 0) palaces[pos].thaiTue = star.name;
            if (star.bad) palaces[pos].badStars.push(starObj);
            else palaces[pos].goodStars.push(starObj);
        });

        // 12. AN LỘC TỒN & VÒNG BÁC SỸ (12 SAO THEO CAN NĂM)
        // Vị trí Lộc Tồn: Giáp: Dần(2), Ất: Mão(3), Bính/Mậu: Tị(5), Đinh/Kỷ: Ngọ(6), Canh: Thân(8), Tân: Dậu(9), Nhâm: Hợi(11), Quý: Tý(0)
        const locTonPositions = [2, 3, 5, 6, 5, 6, 8, 9, 11, 0];
        const locTonPos = locTonPositions[yearCanIdx];

        // Kình Dương (trước Lộc Tồn 1 cung), Đà La (sau Lộc Tồn 1 cung)
        const kinhDuongPos = (locTonPos + 1) % 12;
        const daLaPos = (locTonPos - 1 + 12) % 12;
        const kinhDuongMieu = ["H", "Đ", "H", "H", "M", "H", "H", "Đ", "H", "H", "M", "H"][kinhDuongPos];
        const daLaMieu = ["H", "Đ", "H", "H", "M", "H", "H", "Đ", "H", "H", "M", "H"][daLaPos];

        palaces[locTonPos].goodStars.push({ name: "Lộc Tồn", mieuHam: "Đ", element: "Thổ" });
        palaces[kinhDuongPos].badStars.push({ name: "Kình Dương", mieuHam: kinhDuongMieu, element: "Kim" });
        palaces[daLaPos].badStars.push({ name: "Đà La", mieuHam: daLaMieu, element: "Kim" });

        // Vòng Bác Sỹ (thuận/nghịch theo Âm Dương Nam Nữ)
        const bacSyGroup = [
            { name: "Bác Sỹ", bad: false }, { name: "Lực Sĩ", bad: false },
            { name: "Thanh Long", bad: false }, { name: "Tiểu Hao", bad: true, mieu: ["H", "Đ", "M", "H", "H", "Đ", "H", "H", "M", "H", "H", "Đ"] },
            { name: "Tướng Quân", bad: false }, { name: "Tấu Thư", bad: false },
            { name: "Phi Liêm", bad: true }, { name: "Hỷ Thần", bad: false },
            { name: "Bệnh Phù", bad: true }, { name: "Đại Hao", bad: true, mieu: ["H", "Đ", "M", "H", "H", "Đ", "H", "H", "M", "H", "H", "Đ"] },
            { name: "Phục Binh", bad: true }, { name: "Quan Phủ", bad: true }
        ];
        bacSyGroup.forEach((star, idx) => {
            const pos = (locTonPos + idx * direction + 120) % 12;
            const mieuHam = star.mieu ? star.mieu[pos] : "";
            const starObj = { name: star.name, mieuHam, element: STAR_ELEMENTS[star.name] || "Thủy" };
            if (idx === 0) palaces[pos].bacSy = star.name;
            if (star.bad) palaces[pos].badStars.push(starObj);
            else palaces[pos].goodStars.push(starObj);
        });

        // 13. AN VÒNG TRÀNG SINH (THEO CỤC)
        // Khởi Tràng Sinh: Thủy/Thổ khởi Thân(8), Mộc khởi Hợi(11), Kim khởi Tị(5), Hỏa khởi Dần(2)
        let trangSinhStart = 8;
        if (cucNumber === 3) trangSinhStart = 11;
        else if (cucNumber === 4) trangSinhStart = 5;
        else if (cucNumber === 6) trangSinhStart = 2;

        const trangSinhGroup = [
            "Trường Sinh", "Mộc Dục", "Quan Đới", "Lâm Quan",
            "Đế Vượng", "Suy", "Bệnh", "Tử",
            "Mộ", "Tuyệt", "Thai", "Dưỡng"
        ];
        trangSinhGroup.forEach((name, idx) => {
            const pos = (trangSinhStart + idx * direction + 120) % 12;
            palaces[pos].trangSinh = name;
        });

        // 14. AN SAO THEO THÁNG SINH
        // Tả Phù (Thìn + tháng - 1), Hữu Bật (Tuất - tháng + 1)
        const taPhuPos = (4 + (lunarMonth - 1)) % 12;
        const huuBatPos = (10 - (lunarMonth - 1) + 24) % 12;
        palaces[taPhuPos].goodStars.push({ name: "Tả Phù", mieuHam: "", element: "Thổ" });
        palaces[huuBatPos].goodStars.push({ name: "Hữu Bật", mieuHam: "", element: "Thổ" });

        // Thiên Hình (Dậu + tháng - 1), Thiên Diêu (Sửu + tháng - 1), Thiên Y (Sửu + tháng - 1)
        const thienHinhPos = (9 + (lunarMonth - 1)) % 12;
        const thienDieuPos = (1 + (lunarMonth - 1)) % 12;
        const thienYPos = (1 + (lunarMonth - 1)) % 12;
        const thienHinhMieu = ["H", "H", "M", "M", "H", "H", "H", "H", "M", "M", "H", "H"][thienHinhPos];
        const thienDieuMieu = ["H", "H", "M", "M", "H", "H", "H", "H", "M", "M", "H", "H"][thienDieuPos];

        palaces[thienHinhPos].badStars.push({ name: "Thiên Hình", mieuHam: thienHinhMieu, element: "Hỏa" });
        palaces[thienDieuPos].badStars.push({ name: "Thiên Diêu", mieuHam: thienDieuMieu, element: "Thủy" });
        palaces[thienYPos].goodStars.push({ name: "Thiên Y", mieuHam: "", element: "Thủy" });

        // Thiên Giải, Địa Giải, Nguyệt Giải
        const thienGiaiTable = [8, 8, 9, 9, 10, 10, 11, 11, 0, 0, 1, 1];
        const thienGiaiPos = thienGiaiTable[lunarMonth - 1];
        const diaGiaiPos = (7 + (lunarMonth - 1)) % 12; // Khởi Mùi
        palaces[thienGiaiPos].goodStars.push({ name: "Thiên Giải", mieuHam: "", element: "Hỏa" });
        palaces[diaGiaiPos].goodStars.push({ name: "Địa Giải", mieuHam: "", element: "Thổ" });

        // Âm Sát (Tháng 1,7: Dần; 2,8: Tý; 3,9: Tuất; 4,10: Thân; 5,11: Ngọ; 6,12: Thìn)
        const amSatTable = [2, 0, 10, 8, 6, 4, 2, 0, 10, 8, 6, 4];
        const amSatPos = amSatTable[lunarMonth - 1];
        palaces[amSatPos].badStars.push({ name: "Âm Sát", mieuHam: "", element: "Thổ" });

        // 15. AN SAO THEO GIỜ SINH
        // Văn Xương (Tuất - giờ), Văn Khúc (Thìn + giờ)
        const vanXuongPos = (10 - hourIndex + 24) % 12;
        const vanKhucPos = (4 + hourIndex) % 12;
        const vanXuongMieu = ["H", "Đ", "M", "H", "H", "Đ", "H", "H", "M", "H", "H", "Đ"][vanXuongPos];
        const vanKhucMieu = ["H", "Đ", "M", "H", "H", "Đ", "H", "H", "M", "H", "H", "Đ"][vanKhucPos];
        palaces[vanXuongPos].goodStars.push({ name: "Văn Xương", mieuHam: vanXuongMieu, element: "Kim" });
        palaces[vanKhucPos].goodStars.push({ name: "Văn Khúc", mieuHam: vanKhucMieu, element: "Thủy" });

        // Địa Không (Hợi - giờ), Địa Kiếp (Hợi + giờ)
        const diaKhongPos = (11 - hourIndex + 24) % 12;
        const diaKiepPos = (11 + hourIndex) % 12;
        const diaKhongMieu = ["H", "H", "Đ", "H", "H", "Đ", "H", "H", "Đ", "H", "H", "Đ"][diaKhongPos];
        const diaKiepMieu = ["H", "H", "Đ", "H", "H", "Đ", "H", "H", "Đ", "H", "H", "Đ"][diaKiepPos];
        palaces[diaKhongPos].badStars.push({ name: "Địa Không", mieuHam: diaKhongMieu, element: "Hỏa" });
        palaces[diaKiepPos].badStars.push({ name: "Địa Kiếp", mieuHam: diaKiepMieu, element: "Hỏa" });

        // Thai Phụ (Khúc + 2), Phong Cáo (Khúc - 2)
        const thaiPhuPos = (vanKhucPos + 2) % 12;
        const phongCaoPos = (vanKhucPos - 2 + 24) % 12;
        palaces[thaiPhuPos].goodStars.push({ name: "Thai Phụ", mieuHam: "", element: "Kim" });
        palaces[phongCaoPos].goodStars.push({ name: "Phong Cáo", mieuHam: "", element: "Thổ" });

        // 16. AN SAO THEO NGÀY SINH
        // Tam Thai (Tả Phù + ngày - 1), Bát Tọa (Hữu Bật - ngày + 1)
        const tamThaiPos = (taPhuPos + (lunarDay - 1)) % 12;
        const batToaPos = (huuBatPos - (lunarDay - 1) + 240) % 12;
        palaces[tamThaiPos].goodStars.push({ name: "Tam Thai", mieuHam: "", element: "Thủy" });
        palaces[batToaPos].goodStars.push({ name: "Bát Tọa", mieuHam: "", element: "Thủy" });

        // Ân Quang (Xương + ngày - 2), Thiên Quý (Khúc - ngày + 2)
        const anQuangPos = (vanXuongPos + (lunarDay - 2) + 240) % 12;
        const thienQuyPos = (vanKhucPos - (lunarDay - 2) + 240) % 12;
        palaces[anQuangPos].goodStars.push({ name: "Ân Quang", mieuHam: "", element: "Mộc" });
        palaces[thienQuyPos].goodStars.push({ name: "Thiên Quý", mieuHam: "", element: "Thổ" });

        // 17. AN SAO THEO CAN NĂM
        // Thiên Khôi, Thiên Việt
        // Giáp/Mậu -> Sửu/Mùi; Ất/Kỷ -> Tý/Thân; Bính/Đinh -> Hợi/Dậu; Canh/Tân -> Ngọ/Dần; Nhâm/Quý -> Mão/Tị
        const khoiTable = [1, 0, 11, 11, 1, 0, 6, 6, 3, 3];
        const vietTable = [7, 8, 9, 9, 7, 8, 2, 2, 5, 5];
        palaces[khoiTable[yearCanIdx]].goodStars.push({ name: "Thiên Khôi", mieuHam: "", element: "Hỏa" });
        palaces[vietTable[yearCanIdx]].goodStars.push({ name: "Thiên Việt", mieuHam: "", element: "Hỏa" });

        // Quốc Ấn (Lộc + 8), Đường Phù (Lộc - 7)
        const quocAnPos = (locTonPos + 8) % 12;
        const duongPhuPos = (locTonPos - 7 + 24) % 12;
        palaces[quocAnPos].goodStars.push({ name: "Quốc Ấn", mieuHam: "", element: "Thổ" });
        palaces[duongPhuPos].goodStars.push({ name: "Đường Phù", mieuHam: "", element: "Mộc" });

        // Thiên Quan, Thiên Phúc, Lưu Hà, Thiên Trù
        const thienQuanTable = [7, 4, 5, 2, 3, 9, 11, 9, 10, 6];
        const thienPhucTable = [9, 8, 0, 11, 3, 2, 6, 5, 6, 5];
        const luuHaTable = [9, 10, 7, 8, 5, 6, 3, 4, 1, 2];
        const thienTruTable = [5, 6, 0, 5, 6, 8, 2, 6, 9, 11];
        palaces[thienQuanTable[yearCanIdx]].goodStars.push({ name: "Thiên Quan", mieuHam: "", element: "Hỏa" });
        palaces[thienPhucTable[yearCanIdx]].goodStars.push({ name: "Thiên Phúc", mieuHam: "", element: "Thổ" });
        palaces[luuHaTable[yearCanIdx]].badStars.push({ name: "Lưu Hà", mieuHam: "", element: "Thủy" });
        palaces[thienTruTable[yearCanIdx]].goodStars.push({ name: "Thiên Trù", mieuHam: "", element: "Thổ" });

        // 18. AN SAO THEO CHI NĂM
        // Long Trì (Thìn + Chi), Phượng Các (Tuất - Chi)
        const longTriPos = (4 + yearChiIdx) % 12;
        const phuongCacPos = (10 - yearChiIdx + 24) % 12;
        palaces[longTriPos].goodStars.push({ name: "Long Trì", mieuHam: "", element: "Thủy" });
        palaces[phuongCacPos].goodStars.push({ name: "Phượng Các", mieuHam: "", element: "Thổ" });
        palaces[phuongCacPos].goodStars.push({ name: "Giải Thần", mieuHam: "", element: "Mộc" });

        // Thiên Mã, Hoa Cái, Đào Hoa, Kiếp Sát
        // Dần Ngọ Tuất -> Thân(8), Tuất(10), Mão(3), Hợi(11)
        // Thân Tý Thìn -> Dần(2), Thìn(4), Dậu(9), Tị(5)
        // Tỵ Dậu Sửu -> Hợi(11), Sửu(1), Ngọ(6), Dần(2)
        // Hợi Mão Mùi -> Tị(5), Mùi(7), Tý(0), Thân(8)
        let maPos = 8, hoaCaiPos = 10, daoHoaPos = 3, kiepSatPos = 11;
        if ([0, 4, 8].includes(yearChiIdx)) { maPos = 2; hoaCaiPos = 4; daoHoaPos = 9; kiepSatPos = 5; }
        else if ([1, 5, 9].includes(yearChiIdx)) { maPos = 11; hoaCaiPos = 1; daoHoaPos = 6; kiepSatPos = 2; }
        else if ([3, 7, 11].includes(yearChiIdx)) { maPos = 5; hoaCaiPos = 7; daoHoaPos = 0; kiepSatPos = 8; }

        const maMieu = ["H", "H", "Đ", "H", "H", "Đ", "H", "H", "Đ", "H", "H", "Đ"][maPos];
        palaces[maPos].goodStars.push({ name: "Thiên Mã", mieuHam: maMieu, element: "Hỏa" });
        palaces[hoaCaiPos].goodStars.push({ name: "Hoa Cái", mieuHam: "", element: "Kim" });
        palaces[daoHoaPos].goodStars.push({ name: "Đào Hoa", mieuHam: "", element: "Mộc" });
        palaces[kiepSatPos].badStars.push({ name: "Kiếp Sát", mieuHam: "", element: "Hỏa" });

        // Hồng Loan (Mão - Chi), Thiên Hỷ (Dậu - Chi)
        const hongLoanPos = (3 - yearChiIdx + 24) % 12;
        const thienHyPos = (hongLoanPos + 6) % 12;
        palaces[hongLoanPos].goodStars.push({ name: "Hồng Loan", mieuHam: "", element: "Thủy" });
        palaces[thienHyPos].goodStars.push({ name: "Thiên Hỷ", mieuHam: "", element: "Thủy" });

        // Thiên Khốc (Ngọ - Chi), Thiên Hư (Ngọ + Chi)
        const thienKhocPos = (6 - yearChiIdx + 24) % 12;
        const thienHuPos = (6 + yearChiIdx) % 12;
        const khocMieu = ["H", "Đ", "M", "H", "H", "Đ", "H", "H", "M", "H", "H", "Đ"][thienKhocPos];
        const huMieu = ["H", "Đ", "M", "H", "H", "Đ", "H", "H", "M", "H", "H", "Đ"][thienHuPos];
        palaces[thienKhocPos].badStars.push({ name: "Thiên Khốc", mieuHam: khocMieu, element: "Thủy" });
        palaces[thienHuPos].badStars.push({ name: "Thiên Hư", mieuHam: huMieu, element: "Thủy" });

        // Cô Thần, Quả Tú
        let coThanPos = 2, quaTuPos = 10;
        if ([2, 3, 4].includes(yearChiIdx)) { coThanPos = 5; quaTuPos = 1; }
        else if ([5, 6, 7].includes(yearChiIdx)) { coThanPos = 8; quaTuPos = 4; }
        else if ([8, 9, 10].includes(yearChiIdx)) { coThanPos = 11; quaTuPos = 7; }
        palaces[coThanPos].badStars.push({ name: "Cô Thần", mieuHam: "", element: "Thổ" });
        palaces[quaTuPos].badStars.push({ name: "Quả Tú", mieuHam: "", element: "Thổ" });

        // Phá Toái (Tý Ngọ Mão Dậu -> Tị; Thìn Tuất Sửu Mùi -> Sửu; Dần Thân Tỵ Hợi -> Dậu)
        let phaToaiPos = 5;
        if ([1, 4, 7, 10].includes(yearChiIdx)) phaToaiPos = 1;
        else if ([2, 5, 8, 11].includes(yearChiIdx)) phaToaiPos = 9;
        palaces[phaToaiPos].badStars.push({ name: "Phá Toái", mieuHam: "", element: "Hỏa" });

        // Thiên Đức (Dậu + Chi), Nguyệt Đức (Tị + Chi), Phúc Đức (đã có ở vòng Thái Tuế)
        const thienDucPos = (9 + yearChiIdx) % 12;
        const nguyetDucPos = (5 + yearChiIdx) % 12;
        palaces[thienDucPos].goodStars.push({ name: "Thiên Đức", mieuHam: "", element: "Hỏa" });
        palaces[nguyetDucPos].goodStars.push({ name: "Nguyệt Đức", mieuHam: "", element: "Hỏa" });

        // Thiên Tài (Mệnh + Chi), Thiên Thọ (Thân + Chi)
        const thienTaiPos = (menhPos + yearChiIdx) % 12;
        const thienThoPos = (thanPos + yearChiIdx) % 12;
        palaces[thienTaiPos].goodStars.push({ name: "Thiên Tài", mieuHam: "", element: "Thổ" });
        palaces[thienThoPos].goodStars.push({ name: "Thiên Thọ", mieuHam: "", element: "Thổ" });

        // VÒNG TƯỚNG TINH: Nguyệt Sát (Tướng Tinh + 10)
        let tuongTinhPos = 6;
        if ([0, 4, 8].includes(yearChiIdx)) tuongTinhPos = 0;
        else if ([1, 5, 9].includes(yearChiIdx)) tuongTinhPos = 9;
        else if ([3, 7, 11].includes(yearChiIdx)) tuongTinhPos = 3;
        const nguyetSatPos = (tuongTinhPos + 10) % 12;
        palaces[nguyetSatPos].badStars.push({ name: "Nguyệt Sát", mieuHam: "", element: "Hỏa" });

        // Đẩu Quân: Từ Thái Tuế (Chi năm), đếm nghịch đến tháng sinh, rồi thuận đến giờ sinh
        const dauQuanPos = (yearChiIdx - (lunarMonth - 1) + hourIndex + 24) % 12;
        palaces[dauQuanPos].badStars.push({ name: "Đẩu Quân", mieuHam: "", element: "Hỏa" });

        // Thiên Thương (ở cung Nô Bộc), Thiên Sứ (ở cung Tật Ách)
        for (let p = 0; p < 12; p++) {
            if (palaces[p].cungName === "NÔ BỘC") palaces[p].badStars.push({ name: "Thiên Thương", mieuHam: "", element: "Thổ" });
            if (palaces[p].cungName === "TẬT ÁCH") palaces[p].badStars.push({ name: "Thiên Sứ", mieuHam: "", element: "Thủy" });
        }

        // Thiên La (cố định ở Thìn - 4), Địa Võng (cố định ở Tuất - 10)
        palaces[4].badStars.push({ name: "Thiên La", mieuHam: "", element: "Thổ" });
        palaces[10].badStars.push({ name: "Địa Võng", mieuHam: "", element: "Thổ" });

        // 19. AN HỎA TINH & LINH TINH
        // Dần Ngọ Tuất: Hỏa Sửu thuận, Linh Mão thuận/nghịch
        // Thân Tý Thìn: Hỏa Dần thuận, Linh Tuất thuận/nghịch
        // Tỵ Dậu Sửu: Hỏa Mão thuận, Linh Tuất thuận/nghịch
        // Hợi Mão Mùi: Hỏa Dậu thuận, Linh Tuất thuận/nghịch
        let hoaStart = 1, linhStart = 3;
        if ([0, 4, 8].includes(yearChiIdx)) { hoaStart = 2; linhStart = 10; }
        else if ([1, 5, 9].includes(yearChiIdx)) { hoaStart = 3; linhStart = 10; }
        else if ([3, 7, 11].includes(yearChiIdx)) { hoaStart = 9; linhStart = 10; }

        const hoaTinhPos = (hoaStart + hourIndex * direction + 24) % 12;
        const linhTinhPos = (linhStart - hourIndex * direction + 24) % 12;
        const hoaMieu = ["H", "H", "Đ", "M", "H", "H", "Đ", "M", "H", "H", "Đ", "M"][hoaTinhPos];
        const linhMieu = ["H", "H", "Đ", "M", "H", "H", "Đ", "M", "H", "H", "Đ", "M"][linhTinhPos];
        palaces[hoaTinhPos].badStars.push({ name: "Hỏa Tinh", mieuHam: hoaMieu, element: "Hỏa" });
        palaces[linhTinhPos].badStars.push({ name: "Linh Tinh", mieuHam: linhMieu, element: "Hỏa" });

        // 20. BỘ TỨ HÓA (THEO CAN NĂM)
        // [Hóa Lộc, Hóa Quyền, Hóa Khoa, Hóa Kỵ]
        const tuHoaRules = [
            ["Liêm Trinh", "Phá Quân", "Vũ Khúc", "Thái Dương"],  // Giáp
            ["Thiên Cơ", "Thiên Lương", "Tử Vi", "Thái Âm"],       // Ất
            ["Thiên Đồng", "Thiên Cơ", "Văn Xương", "Liêm Trinh"], // Bính
            ["Thái Âm", "Thiên Đồng", "Thiên Cơ", "Cự Môn"],       // Đinh
            ["Tham Lang", "Thái Âm", "Hữu Bật", "Thiên Cơ"],       // Mậu
            ["Vũ Khúc", "Tham Lang", "Thiên Lương", "Văn Khúc"],   // Kỷ
            ["Thái Dương", "Vũ Khúc", "Thiên Đồng", "Thái Âm"],    // Canh
            ["Cự Môn", "Thái Dương", "Văn Khúc", "Văn Xương"],     // Tân
            ["Thiên Lương", "Tử Vi", "Tả Phù", "Vũ Khúc"],         // Nhâm
            ["Phá Quân", "Cự Môn", "Thái Âm", "Tham Lang"]         // Quý
        ];
        const currentTuHoa = tuHoaRules[yearCanIdx];
        const tuHoaNames = ["Hóa Lộc", "Hóa Quyền", "Hóa Khoa", "Hóa Kỵ"];
        const tuHoaElements = ["Mộc", "Mộc", "Thủy", "Thủy"];

        // Tìm cung chứa sao được hóa để gán nhãn Tứ Hóa
        currentTuHoa.forEach((starName, idx) => {
            const hoaName = tuHoaNames[idx];
            for (let p = 0; p < 12; p++) {
                // Kiểm tra trong mainStars và goodStars
                const hasMain = palaces[p].mainStars.some(s => s.name === starName);
                const hasGood = palaces[p].goodStars.some(s => s.name === starName);
                if (hasMain || hasGood) {
                    if (idx === 3) {
                        palaces[p].badStars.push({ name: `${hoaName}(Đ)`, mieuHam: "", element: tuHoaElements[idx] });
                    } else {
                        palaces[p].goodStars.push({ name: `${hoaName}(V)`, mieuHam: "", element: tuHoaElements[idx] });
                    }
                    break;
                }
            }
        });

        // 21. AN TUẦN KHÔNG & TRIỆT KHÔNG (VẮT NGANG 2 CUNG)
        // Triệt Không theo Can Năm:
        // Giáp/Kỷ -> Thân - Dậu (8 - 9)
        // Ất/Canh -> Ngọ - Mùi (6 - 7)
        // Bính/Tân -> Thìn - Tị (4 - 5)
        // Đinh/Nhâm -> Dần - Mão (2 - 3)
        // Mậu/Quý -> Tý - Sửu (0 - 1)
        const trietMap = [
            [8, 9], [6, 7], [4, 5], [2, 3], [0, 1],
            [8, 9], [6, 7], [4, 5], [2, 3], [0, 1]
        ];
        const trietCungs = trietMap[yearCanIdx];

        // Tuần Không theo Tuần Giáp (Can Chi năm):
        // Giáp Tý -> Tuất Hợi (10 - 11)
        // Giáp Tuất -> Thân Dậu (8 - 9)
        // Giáp Thân -> Ngọ Mùi (6 - 7)
        // Giáp Ngọ -> Thìn Tị (4 - 5)
        // Giáp Thìn -> Dần Mão (2 - 3)
        // Giáp Dần -> Tý Sửu (0 - 1)
        const tuanOffset = (yearChiIdx - yearCanIdx + 12) % 12;
        const tuanCungs = [(tuanOffset + 10) % 12, (tuanOffset + 11) % 12];

        // 22. AN SAO LƯU NĂM XEM (VIEW YEAR)
        const viewCanIdx = (viewYear - 4) % 10;
        const viewChiIdx = (viewYear - 4) % 12;

        if (showSaoLuu) {
            // L.Thái Tuế (tại Chi năm xem)
            palaces[viewChiIdx].badStars.push({ name: "L.Thái Tuế", mieuHam: "", element: "Hỏa" });

            // L.Kình Dương, L.Đà La, L.Lộc Tồn theo Can năm xem
            const viewLocTonPos = locTonPositions[viewCanIdx];
            const viewKinhPos = (viewLocTonPos + 1) % 12;
            const viewDaLaPos = (viewLocTonPos - 1 + 12) % 12;
            palaces[viewLocTonPos].goodStars.push({ name: "L.Lộc Tồn", mieuHam: "", element: "Thổ" });
            palaces[viewKinhPos].badStars.push({ name: "L.Kình Dương", mieuHam: "", element: "Kim" });
            palaces[viewDaLaPos].badStars.push({ name: "L.Đà La", mieuHam: "", element: "Kim" });

            // L.Tang Môn (Chi xem + 2), L.Bạch Hổ (Chi xem + 8)
            const viewTangMonPos = (viewChiIdx + 2) % 12;
            const viewBachHoPos = (viewChiIdx + 8) % 12;
            palaces[viewTangMonPos].badStars.push({ name: "L.Tang Môn", mieuHam: "", element: "Mộc" });
            palaces[viewBachHoPos].badStars.push({ name: "L.Bạch Hổ", mieuHam: "", element: "Kim" });

            // L.Thiên Khốc, L.Thiên Hư
            const viewKhocPos = (6 - viewChiIdx + 24) % 12;
            const viewHuPos = (6 + viewChiIdx) % 12;
            palaces[viewKhocPos].badStars.push({ name: "L.Thiên Khốc", mieuHam: "", element: "Thủy" });
            palaces[viewHuPos].badStars.push({ name: "L.Thiên Hư", mieuHam: "", element: "Thủy" });

            // L.Thiên Mã
            let viewMaPos = 8;
            if ([0, 4, 8].includes(viewChiIdx)) viewMaPos = 2;
            else if ([1, 5, 9].includes(viewChiIdx)) viewMaPos = 11;
            else if ([3, 7, 11].includes(viewChiIdx)) viewMaPos = 5;
            palaces[viewMaPos].goodStars.push({ name: "L.Thiên Mã", mieuHam: "", element: "Hỏa" });
        }

        // Lưu Đào Hoa & Lưu Hồng Loan (và Lưu Thiên Hỷ)
        if (showDaoHongLuu) {
            const viewChiIdx = (viewYear - 4) % 12;
            
            // Lưu Hồng Loan (Khởi Mão đếm nghịch đến Chi xem)
            const viewHongLoanPos = (3 - viewChiIdx + 24) % 12;
            // Lưu Thiên Hỷ (Đối xung Lưu Hồng Loan)
            const viewThienHyPos = (viewHongLoanPos + 6) % 12;
            palaces[viewHongLoanPos].goodStars.push({ name: "L.Hồng Loan", mieuHam: "", element: "Thủy" });
            palaces[viewThienHyPos].goodStars.push({ name: "L.Thiên Hỷ", mieuHam: "", element: "Thủy" });

            // Lưu Đào Hoa (theo Tam hợp Chi năm xem)
            let viewDaoHoaPos = 3; // Dần Ngọ Tuất -> Mão
            if ([0, 4, 8].includes(viewChiIdx)) viewDaoHoaPos = 9; // Thân Tý Thìn -> Dậu
            else if ([1, 5, 9].includes(viewChiIdx)) viewDaoHoaPos = 6; // Tỵ Dậu Sửu -> Ngọ
            else if ([3, 7, 11].includes(viewChiIdx)) viewDaoHoaPos = 0; // Hợi Mão Mùi -> Tý
            palaces[viewDaoHoaPos].goodStars.push({ name: "L.Đào Hoa", mieuHam: "", element: "Mộc" });
        }

        // 23. CHỦ MỆNH & CHỦ THÂN
        const chuMenhTable = ["Tham Lang", "Cự Môn", "Lộc Tồn", "Văn Khúc", "Liêm Trinh", "Vũ Khúc", "Phá Quân", "Vũ Khúc", "Liêm Trinh", "Văn Khúc", "Lộc Tồn", "Cự Môn"];
        const chuThanTable = ["Linh Tinh", "Thiên Tướng", "Thiên Lương", "Thiên Đồng", "Văn Xương", "Thiên Cơ", "Hỏa Tinh", "Thiên Cơ", "Văn Xương", "Thiên Đồng", "Thiên Lương", "Thiên Tướng"];
        const chuMenh = chuMenhTable[yearChiIdx];
        const chuThan = chuThanTable[yearChiIdx];

        // 24. ĐÁNH GIÁ TỔNG QUAN
        // Âm Dương thuận lý / nghịch lý:
        // Cung Mệnh là Dương cung (Tý, Dần, Thìn, Ngọ, Thân, Tuất: chẵn) -> Dương Mệnh
        const isMenhDuongCung = (menhPos % 2 === 0);
        const amDuongLy = (isDuongYear === isMenhDuongCung) ? "Âm Dương thuận lý" : "Âm Dương nghịch lý";

        // Cục & Mệnh sinh khắc:
        const cucElement = cucInfo.element;
        let cucMenhTuongTac = "Cục Mệnh Tương Hòa";
        if (cucElement === banMenhElement) cucMenhTuongTac = "Cục Mệnh Tương Hòa";
        else if (
            (cucElement === "Thủy" && banMenhElement === "Mộc") ||
            (cucElement === "Mộc" && banMenhElement === "Hỏa") ||
            (cucElement === "Hỏa" && banMenhElement === "Thổ") ||
            (cucElement === "Thổ" && banMenhElement === "Kim") ||
            (cucElement === "Kim" && banMenhElement === "Thủy")
        ) cucMenhTuongTac = "Cục sinh Mệnh";
        else if (
            (banMenhElement === "Thủy" && cucElement === "Mộc") ||
            (banMenhElement === "Mộc" && cucElement === "Hỏa") ||
            (banMenhElement === "Hỏa" && cucElement === "Thổ") ||
            (banMenhElement === "Thổ" && cucElement === "Kim") ||
            (banMenhElement === "Kim" && cucElement === "Thủy")
        ) cucMenhTuongTac = "Mệnh sinh Cục";
        // 25. BẮC PHÁI (LƯƠNG THỊ) - CHỈ HIỂN THỊ 14 CHÍNH TINH + TẢ, HỮU, XƯƠNG, KHÚC, TỨ HÓA
        if (luongThiMode) {
            const allowedPhuLuongThi = new Set([
                "Văn Xương", "Văn Khúc", "Tả Phù", "Hữu Bật",
                "Hóa Lộc", "Hóa Quyền", "Hóa Khoa", "Hóa Kỵ"
            ]);
            for (let p = 0; p < 12; p++) {
                palaces[p].goodStars = palaces[p].goodStars.filter(s => {
                    const cleanName = s.name.split('(')[0].trim();
                    return allowedPhuLuongThi.has(cleanName) || cleanName.startsWith("Hóa ");
                });
                palaces[p].badStars = palaces[p].badStars.filter(s => {
                    const cleanName = s.name.split('(')[0].trim();
                    return allowedPhuLuongThi.has(cleanName) || cleanName.startsWith("Hóa ");
                });
            }
        }

        return {
            metadata: {
                name,
                gender,
                solarDate: `${solarDay}/${solarMonth}/${solarYear}`,
                lunarDate: `${lunarDay}/${lunarMonth}/${lunarYear} ${isLeap ? '(Nhuận)' : ''}`,
                lunarYearCanChi: yearCanChi,
                lunarMonthCanChi: `${CAN_NAMES[(yearCanIdx * 2 + lunarMonth + 1) % 10]} ${CHI_NAMES[(lunarMonth + 1) % 12]}`,
                lunarDayCanChi: `Ngày ${lunarDay}`,
                lunarHourCanChi: `${CAN_NAMES[(yearCanIdx * 2 + hourIndex) % 10]} ${CHI_NAMES[hourIndex]}`,
                hourIndex,
                hourName: CHI_NAMES[hourIndex],
                viewYear,
                viewYearCanChi: `${CAN_NAMES[viewCanIdx]} ${CHI_NAMES[viewChiIdx]}`,
                age: viewYear - lunarYear + 1,
                amDuongNamNu,
                banMenh,
                banMenhElement,
                cucInfo,
                chuMenh,
                chuThan,
                amDuongLy,
                cucMenhTuongTac,
                thanCungName,
                trietCungs,
                tuanCungs
            },
            palaces
        };
    }

    /**
     * Tìm cung an Tử Vi dựa vào ngày sinh và số Cục
     */
    static findTuViPosition(day, cuc) {
        if (day % cuc === 0) {
            const q = day / cuc;
            return (2 + q - 1) % 12;
        } else {
            const x = cuc - (day % cuc);
            const q = (day + x) / cuc;
            if (x % 2 === 0) {
                // x chẵn: đếm thuận x bước từ vị trí q
                return (2 + q - 1 + x) % 12;
            } else {
                // x lẻ: đếm nghịch x bước từ vị trí q
                return (2 + q - 1 - x + 24) % 12;
            }
        }
    }
}
