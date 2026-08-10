// thai_at_luan_doan.js
// Xử lý Đại Du Vận Quái và Tiểu Du Vận Quái theo Thái Ất Thần Số

/**
 * Bát Quái theo Cửu Cung Biệt Số (bỏ Trung Cung):
 * Index: 0=Kiền(1), 1=Ly(2), 2=Cấn(3), 3=Chấn(4), 4=Đoài(6), 5=Khôn(7), 6=Khảm(8), 7=Tốn(9)
 */
const BAT_QUAI = ["Kiền", "Ly", "Cấn", "Chấn", "Đoài", "Khôn", "Khảm", "Tốn"];

/**
 * 64 Quẻ Kinh Dịch — Bảng tra trùng quái
 * Hàng (Ngoại/Thượng) × Cột (Nội/Hạ) → Tên quẻ
 * Index: Kiền=0, Ly=1, Cấn=2, Chấn=3, Đoài=4, Khôn=5, Khảm=6, Tốn=7
 * Theo thứ tự 8 quái Cửu Cung: Kiền-Ly-Cấn-Chấn-Đoài-Khôn-Khảm-Tốn
 */
const TRUNG_QUAI_TABLE = {
    // [ngoại][nội] → tên quẻ
    "Kiền_Kiền": "Thuần Càn", "Kiền_Ly": "Thiên Hỏa Đồng Nhân", "Kiền_Cấn": "Thiên Sơn Độn",
    "Kiền_Chấn": "Thiên Lôi Vô Vọng", "Kiền_Đoài": "Thiên Trạch Lý", "Kiền_Khôn": "Thiên Địa Bĩ",
    "Kiền_Khảm": "Thiên Thủy Tụng", "Kiền_Tốn": "Thiên Phong Cấu",

    "Ly_Kiền": "Hỏa Thiên Đại Hữu", "Ly_Ly": "Thuần Ly", "Ly_Cấn": "Hỏa Sơn Lữ",
    "Ly_Chấn": "Hỏa Lôi Phệ Hạp", "Ly_Đoài": "Hỏa Trạch Khuê", "Ly_Khôn": "Hỏa Địa Tấn",
    "Ly_Khảm": "Hỏa Thủy Vị Tế", "Ly_Tốn": "Hỏa Phong Đỉnh",

    "Cấn_Kiền": "Sơn Thiên Đại Súc", "Cấn_Ly": "Sơn Hỏa Bí", "Cấn_Cấn": "Thuần Cấn",
    "Cấn_Chấn": "Sơn Lôi Di", "Cấn_Đoài": "Sơn Trạch Tổn", "Cấn_Khôn": "Sơn Địa Bác",
    "Cấn_Khảm": "Sơn Thủy Mông", "Cấn_Tốn": "Sơn Phong Cổ",

    "Chấn_Kiền": "Lôi Thiên Đại Tráng", "Chấn_Ly": "Lôi Hỏa Phong", "Chấn_Cấn": "Lôi Sơn Tiểu Quá",
    "Chấn_Chấn": "Thuần Chấn", "Chấn_Đoài": "Lôi Trạch Quy Muội", "Chấn_Khôn": "Lôi Địa Dự",
    "Chấn_Khảm": "Lôi Thủy Giải", "Chấn_Tốn": "Lôi Phong Hằng",

    "Đoài_Kiền": "Trạch Thiên Quải", "Đoài_Ly": "Trạch Hỏa Cách", "Đoài_Cấn": "Trạch Sơn Hàm",
    "Đoài_Chấn": "Trạch Lôi Tùy", "Đoài_Đoài": "Thuần Đoài", "Đoài_Khôn": "Trạch Địa Tụy",
    "Đoài_Khảm": "Trạch Thủy Khốn", "Đoài_Tốn": "Trạch Phong Đại Quá",

    "Khôn_Kiền": "Địa Thiên Thái", "Khôn_Ly": "Địa Hỏa Minh Di", "Khôn_Cấn": "Địa Sơn Khiêm",
    "Khôn_Chấn": "Địa Lôi Phục", "Khôn_Đoài": "Địa Trạch Lâm", "Khôn_Khôn": "Thuần Khôn",
    "Khôn_Khảm": "Địa Thủy Sư", "Khôn_Tốn": "Địa Phong Thăng",

    "Khảm_Kiền": "Thủy Thiên Nhu", "Khảm_Ly": "Thủy Hỏa Ký Tế", "Khảm_Cấn": "Thủy Sơn Kiển",
    "Khảm_Chấn": "Thủy Lôi Truân", "Khảm_Đoài": "Thủy Trạch Tiết", "Khảm_Khôn": "Thủy Địa Tỷ",
    "Khảm_Khảm": "Thuần Khảm", "Khảm_Tốn": "Thủy Phong Tỉnh",

    "Tốn_Kiền": "Phong Thiên Tiểu Súc", "Tốn_Ly": "Phong Hỏa Gia Nhân", "Tốn_Cấn": "Phong Sơn Tiệm",
    "Tốn_Chấn": "Phong Lôi Ích", "Tốn_Đoài": "Phong Trạch Trung Phu", "Tốn_Khôn": "Phong Địa Quan",
    "Tốn_Khảm": "Phong Thủy Hoán", "Tốn_Tốn": "Thuần Tốn"
};

const TRIGRAM_LINES = {
    "Kiền": [1, 1, 1], // Sơ=1, Nhị=1, Tam=1
    "Đoài": [1, 1, 0],
    "Ly":   [1, 0, 1],
    "Chấn": [1, 0, 0],
    "Tốn":  [0, 1, 1],
    "Khảm": [0, 1, 0],
    "Cấn":  [0, 0, 1],
    "Khôn": [0, 0, 0]
};

const TRIGRAM_NATURE = {
    "Kiền": { nature: "Thiên (Trời)", direction: "Tây Bắc", element: "Kim" },
    "Khôn": { nature: "Địa (Đất)", direction: "Tây Nam", element: "Thổ" },
    "Chấn": { nature: "Lôi (Sấm)", direction: "Chính Đông", element: "Mộc" },
    "Tốn":  { nature: "Phong (Gió)", direction: "Đông Nam", element: "Mộc" },
    "Khảm": { nature: "Thủy (Nước)", direction: "Chính Bắc", element: "Thủy" },
    "Ly":   { nature: "Hỏa (Lửa)", direction: "Chính Nam", element: "Hỏa" },
    "Cấn":  { nature: "Sơn (Núi)", direction: "Đông Bắc", element: "Thổ" },
    "Đoài": { nature: "Trạch (Đầm)", direction: "Chính Tây", element: "Kim" }
};

function getTrigramByLines(lines3) {
    for (const name in TRIGRAM_LINES) {
        const t = TRIGRAM_LINES[name];
        if (t[0] === lines3[0] && t[1] === lines3[1] && t[2] === lines3[2]) return name;
    }
    return "Kiền";
}

function calcQueBien(lines6, haoDong) {
    const idx = Math.max(0, Math.min(5, haoDong - 1));
    const linesBien = [...lines6];
    linesBien[idx] = linesBien[idx] === 1 ? 0 : 1;

    const noiLines = linesBien.slice(0, 3);
    const ngoaiLines = linesBien.slice(3, 6);

    const noiQuai = getTrigramByLines(noiLines);
    const ngoaiQuai = getTrigramByLines(ngoaiLines);

    const key = `${ngoaiQuai}_${noiQuai}`;
    const hexName = TRUNG_QUAI_TABLE[key] || `${ngoaiQuai} / ${noiQuai}`;

    return {
        lines6Bien: linesBien,
        noiQuai,
        ngoaiQuai,
        hexName
    };
}

class ThaiAtLuanDoan {
    /**
     * @param {number} tueTich - Tích Niên Thái Ất của năm cầu việc
     * @param {number} namCanIdx - Index Thiên Can năm (0=Giáp, 1=Ất...)
     * @param {boolean} isDuongDon - Dương Độn hay Âm Độn
     * @param {string} mode - Chế độ (tue, nguyet, nhat, thoi)
     * @param {number} fullTueTich - Tích Niên Thượng Cổ (nếu có)
     * @param {number} lunarMonth - Tháng Âm lịch (1-12)
     * @param {number} kyDu - Kỷ Dư (Vòng Kỷ Dư) = tueTich % 360
     */
    constructor(tueTich, namCanIdx, isDuongDon, mode = "tue", fullTueTich = 0, lunarMonth = 1, kyDu = 0) {
        this.tueTich = tueTich;
        this.namCanIdx = namCanIdx;
        this.isDuongDon = isDuongDon;
        this.mode = mode;
        this.fullTueTich = fullTueTich;
        this.lunarMonth = lunarMonth;
        this.kyDu = kyDu || (tueTich % 360);
    }

    calcDaiTieuDu() {
        const tich = this.tueTich;
        const kyDu = this.kyDu;

        const DAI_DU_NGOAI_LIST = ["Khôn", "Khảm", "Tốn", "Kiền", "Ly", "Cấn", "Chấn", "Đoài"];
        const TIEU_DU_LIST = ["Kiền", "Ly", "Cấn", "Chấn", "Đoài", "Khôn", "Khảm", "Tốn"];

        // ===================== ĐẠI DU VẬN QUÁI =====================
        const ddNoiR1 = (tich + 34) % 2880;
        const ddNoiR2 = ddNoiR1 % 288;
        const ddNoiThanh = Math.floor(ddNoiR2 / 36);
        const ddNoiDu = ddNoiR2 % 36;
        const ddNoiQuai = BAT_QUAI[ddNoiThanh % 8];

        const ddNgoaiR1 = (tich + 60) % 640;
        const ddNgoaiR2 = ddNgoaiR1 % 80;
        const ddNgoaiThanh = Math.floor(ddNgoaiR2 / 10);
        const ddNgoaiDu = ddNgoaiR2 % 10;
        const ddNgoaiQuai = DAI_DU_NGOAI_LIST[ddNgoaiThanh % 8];

        const ddKey = `${ddNgoaiQuai}_${ddNoiQuai}`;
        const ddTrungQuai = TRUNG_QUAI_TABLE[ddKey] || `${ddNgoaiQuai} / ${ddNoiQuai}`;

        // Hào Động Đại Du: 36 năm / 6 hào = 6 năm 1 hào
        const ddHaoDong = Math.min(6, Math.floor(ddNoiDu / 6) + 1);

        // Mảng 6 hào (Index 0 = Hào 1 Sơ, Index 5 = Hào 6 Thượng)
        const ddNoiLines = TRIGRAM_LINES[ddNoiQuai] || [1, 1, 1];
        const ddNgoaiLines = TRIGRAM_LINES[ddNgoaiQuai] || [1, 1, 1];
        const ddLines6 = [...ddNoiLines, ...ddNgoaiLines];
        const ddBien = calcQueBien(ddLines6, ddHaoDong);

        // ===================== TIỂU DU VẬN QUÁI =====================
        const tdNoiR1 = tich % 192;
        const tdNoiThanh = Math.floor(tdNoiR1 / 24);
        const tdNoiDu = tdNoiR1 % 24;
        const tdNoiQuai = TIEU_DU_LIST[tdNoiThanh % 8];

        const tdNgoaiR1 = kyDu % 24;
        const tdNgoaiThanh = Math.floor(tdNgoaiR1 / 3);
        const tdNgoaiDu = tdNgoaiR1 % 3;
        const tdNgoaiQuai = TIEU_DU_LIST[tdNgoaiThanh % 8];

        const tdKey = `${tdNgoaiQuai}_${tdNoiQuai}`;
        const tdTrungQuai = TRUNG_QUAI_TABLE[tdKey] || `${tdNgoaiQuai} / ${tdNoiQuai}`;

        // Hào Động Tiểu Du: 24 năm / 6 hào = 4 năm 1 hào
        const tdHaoDong = Math.min(6, Math.floor(tdNoiDu / 4) + 1);

        // Mảng 6 hào (Index 0 = Hào 1 Sơ, Index 5 = Hào 6 Thượng)
        const tdNoiLines = TRIGRAM_LINES[tdNoiQuai] || [1, 1, 1];
        const tdNgoaiLines = TRIGRAM_LINES[tdNgoaiQuai] || [1, 1, 1];
        const tdLines6 = [...tdNoiLines, ...tdNgoaiLines];
        const tdBien = calcQueBien(tdLines6, tdHaoDong);

        return {
            // Đại Du
            ddNoiQuai,
            ddNoiThanh,
            ddNoiDu,
            ddNgoaiQuai,
            ddNgoaiThanh,
            ddNgoaiDu,
            ddTrungQuai,
            ddHaoDong,
            ddLines6,
            ddQueBienName: ddBien.hexName,
            ddLines6Bien: ddBien.lines6Bien,
            // Tiểu Du
            tdNoiQuai,
            tdNoiThanh,
            tdNoiDu,
            tdNgoaiQuai,
            tdNgoaiThanh,
            tdNgoaiDu,
            tdTrungQuai,
            tdHaoDong,
            tdLines6,
            tdQueBienName: tdBien.hexName,
            tdLines6Bien: tdBien.lines6Bien
        };
    }

    generateReport(toanChu, toanKhach, tkIdx, taIdx) {
        return {
            daiTieuDu: this.calcDaiTieuDu()
        };
    }
}

/**
 * BÁO CÁO LUẬN GIẢI CHUYÊN SÂU CỤC DIỆN SA BÀN THÁI ẤT (TỰ ĐỘNG THEO THUẬT TOÁN)
 */
function generateDetailedAnalysisReport(data) {
    if (!data || !data.placement) return "<p style='color: var(--text-muted);'>Chưa có dữ liệu sa bàn.</p>";

    const CUNG_NAMES = {
        "kien": "Kiền (Càn)", "hoi": "Hợi", "ty": "Tý", "suu": "Sửu",
        "can": "Cấn", "dan": "Dần", "mao": "Mão", "thin": "Thìn",
        "ton": "Tốn", "ty_chi": "Tị", "ngo": "Ngọ", "mui": "Mùi",
        "khon": "Khôn", "than": "Thân", "dau": "Dậu", "tuat": "Tuất",
        "trung_cung": "Trung Cung"
    };

    const CUNG_HUONG = {
        "can": "Đông Bắc", "dan": "Đông Bắc",
        "mao": "Chính Đông", "thin": "Đông Nam", "ton": "Đông Nam",
        "ty_chi": "Đông Nam", "ngo": "Chính Nam", "mui": "Tây Nam",
        "khon": "Tây Nam", "than": "Tây Nam", "dau": "Chính Tây",
        "tuat": "Tây Bắc", "kien": "Tây Bắc", "hoi": "Tây Bắc",
        "ty": "Chính Bắc", "suu": "Đông Bắc"
    };

    const CUNG_BIET_SO = {
        "kien": 1, "ngo": 2, "can": 3, "mao": 4, "ton": 9,
        "ty_chi": 9, "khon": 7, "dau": 6, "ty": 8, "hoi": 1,
        "dan": 3, "thin": 4, "mui": 2, "than": 7, "tuat": 6, "suu": 3
    };

    // Tìm vị trí các Thần Tinh
    let taPalace = "", vxPalace = "", tkPalace = "", dtcPalace = "", dtkPalace = "";
    for (const pKey in data.placement) {
        const stars = data.placement[pKey] || [];
        stars.forEach(s => {
            if (s.name.includes("Thái Ất")) taPalace = pKey;
            if (s.name.includes("Văn Xương")) vxPalace = pKey;
            if (s.name.includes("Thủy Kích")) tkPalace = pKey;
            if (s.name.includes("Đại Tướng Chủ")) dtcPalace = pKey;
            if (s.name.includes("Đại Tướng Khách")) dtkPalace = pKey;
        });
    }

    const taName = CUNG_NAMES[taPalace] || "Trung Cung";
    const vxName = CUNG_NAMES[vxPalace] || "Chưa xác định";
    const tkName = CUNG_NAMES[tkPalace] || "Chưa xác định";
    const dtcName = CUNG_NAMES[dtcPalace] || "Chưa xác định";
    const dtkName = CUNG_NAMES[dtkPalace] || "Chưa xác định";

    const taBietSo = CUNG_BIET_SO[taPalace] || 0;
    
    // 1. Thái Ất vị thế
    let taVitheText = "";
    if ([1, 8, 4, 3].includes(taBietSo)) {
        taVitheText = `Thái Ất đang đóng ở cung <strong>${taName}</strong> (mang biệt số ${taBietSo}) là thế <span style="color:#51cf66; font-weight:bold;">"Trợ Chủ"</span>. Theo sách Thái Ất Thần Kinh, thế này tạo ra cục diện trợ giúp cho phe Chủ (tức phe phòng thủ/bên trong). Đại Chủ phát, lợi thuộc về Chủ. Tiến công phe Khách bị suy kém.`;
    } else if ([9, 2, 7, 6].includes(taBietSo)) {
        taVitheText = `Thái Ất đang đóng ở cung <strong>${taName}</strong> (mang biệt số ${taBietSo}) là thế <span style="color:#ff922b; font-weight:bold;">"Trợ Khách"</span>. Theo sách Thái Ất Thần Kinh, thế này tạo ra cục diện trợ giúp cho phe Khách (tức phe tiến công/bên ngoài). Đại Khách phát, lợi thuộc về Khách.`;
    } else {
        taVitheText = `Thái Ất đang tọa tại cung <strong>${taName}</strong> là thế <strong>"Trung Hòa"</strong>, âm dương cân bằng, lực lượng hai bên tương đương.`;
    }

    // 2. Phân Tích Chuyên Sâu Toán Số (Toán Chủ, Toán Khách, Toán Định)
    const tcGoc = data.toanChuGoc || data.toanChu || 1;
    const tkGoc = data.toanKhachGoc || data.toanKhach || 1;
    const tdGoc = data.toanDinhGoc || data.toanDinh || 1;

    // Hàm phân tích chi tiết Toán Tam Tài & Cát Hung 5 Cấp Độ
    function analyzeToanDetail(num, roleName, palaceKey) {
        let items = [];
        const isDuongCung = [1, 8, 3, 4, 9].includes(CUNG_BIET_SO[palaceKey]);
        const hangDonVi = num % 10;

        // a. Tam Tài (Thiên - Địa - Nhân)
        if (num < 10) {
            items.push(`<span style="color:#ff6b6b; font-weight:bold;">[VÔ THIÊN - Thiếu 10]</span> Kết quả ${num} thuộc hàng đơn vị (< 10). Tượng trưng cho sự thiếu hụt sinh khí từ Trời. Thống tướng phe ${roleName} chịu thiệt thòi, lo âu, hành sự gian nan.`);
        }
        if (hangDonVi > 0 && hangDonVi < 5) {
            items.push(`<span style="color:#ffa94d; font-weight:bold;">[VÔ ĐỊA - Thiếu 5]</span> Hàng đơn vị là ${hangDonVi} (< 5). Tượng trưng cho sự bất ổn của Đất. Phó tướng phe ${roleName} không có lợi, nền tảng bất ổn, đừng cầu hưng sự.`);
        }
        if (hangDonVi === 0) {
            items.push(`<span style="color:#ff4757; font-weight:bold;">[VÔ NHÂN - Thiếu 1]</span> Hàng đơn vị là 0 (kết quả ${num}). Tượng trưng cho sự suy đồi, thất bại của con người. Ra quân sĩ tốt tổn hại ngắc ngư. Bất lợi cho cả Thống tướng, Phó tướng và Sĩ tốt.`);
        }
        if (items.length === 0) {
            items.push(`<span style="color:#51cf66; font-weight:bold;">[ĐỦ TAM TÀI]</span> Toán số hội tụ đủ Thiên (10), Địa (5), Nhân (1). Sinh khí dồi dào, thuận thời và hợp nhân tâm.`);
        }

        // b. Phân loại Khí Vận
        let classification = "";
        if ([3, 9].includes(num)) classification = "Thuần Dương (Khí bộc phát)";
        else if ([33, 39].includes(num)) classification = "Trùng Dương (Khí cực thịnh trùng điệp)";
        else if ([2, 6].includes(num)) classification = "Thuần Âm (Khí tích tụ thu liễm)";
        else if ([22, 26].includes(num)) classification = "Trùng Âm (Khí tích tụ trùng điệp)";
        else if ([13, 19, 31, 37].includes(num)) classification = "Tạp Trùng Dương (Mưu sâu kế hiểm sắp sẵn bên trong)";
        else if ([24, 28].includes(num)) classification = "Tạp Trùng Âm (Mưu sâu kế hiểm giăng sẵn bên ngoài)";
        else if (num % 2 !== 0) classification = "Đơn Dương (Khí vận phát động)";
        else classification = "Đơn Âm (Khí vận thu quái)";

        // c. Hòa / Bất Hòa
        const isEven = (num % 2 === 0);
        let isHoa = isDuongCung ? isEven : !isEven;
        let hoaText = isHoa 
            ? `<span style="color:#51cf66; font-weight:bold;">HÒA (Khí Thuận - Âm Dương tương hợp, tốt lành)</span>`
            : `<span style="color:#ff6b6b; font-weight:bold;">BẤT HÒA (Khí Nghịch - Trở ngại bế tắc)</span>`;

        // d. 5 Cấp Độ Cát Hung
        let capDo = "";
        if ((isDuongCung && [33, 39].includes(num)) || (!isDuongCung && [22, 26].includes(num))) {
            capDo = `<span style="color:#ff4757; font-weight:bold;">THÁI QUÁ (Thời Bạo Chúa - Quá đà hung hiểm)</span>`;
        } else if ((!isDuongCung && [3, 9].includes(num)) || (isDuongCung && [2, 6].includes(num))) {
            capDo = `<span style="color:#ff0000; font-weight:bold;">BẤT CẬP (ĐẠI HUNG - Cực Kỳ Hung Hiểm)</span>`;
        } else if ([13, 19, 31, 37, 24, 28].includes(num)) {
            capDo = `<span style="color:#ff922b; font-weight:bold;">THỨ HUNG (Mưu Sâu Kế Hiểm)</span>`;
        } else if ([1, 3, 14, 18, 33, 4, 8].includes(num)) {
            capDo = `<span style="color:#51cf66; font-weight:bold;">THƯỢNG HÒA (ĐẠI CÁT TƯỜNG - Cát Lành May Mắn)</span>`;
        } else {
            capDo = `<span style="color:#339af0; font-weight:bold;">THỨ HÒA (TIỂU CÁT - An Ổn Tiến Bước)</span>`;
        }

        return { items, classification, hoaText, capDo };
    }

    const tcAnalysis = analyzeToanDetail(tcGoc, "Chủ", vxPalace);
    const tkAnalysis = analyzeToanDetail(tkGoc, "Khách", tkPalace);

    let toanTrungCungMsg = "";
    if (tcGoc % 10 === 5) {
        toanTrungCungMsg += `<div style="margin-top:8px; padding:10px; background:rgba(255,71,87,0.15); border-left:4px solid #ff4757; border-radius:4px;">
            <strong style="color:#ff6b6b;">🔒 THẾ TRẬN "ĐẠI TIỂU CHỦ KHÔNG RA KHỎI CUNG GIỮA" (CỬA ĐÓNG - TƯỚNG BẤT XUẤT):</strong><br/>
            Toán Chủ = ${tcGoc} có hàng đơn vị là 5. Theo quy tắc Thái Ất, Đại Tướng Chủ lập tức nhập Trung Cung (Cung số 5). Phái sinh Tham Tướng Chủ (5 × 3 = 15 => đuôi 5) cũng bị hút vào Trung Cung cùng lúc.<br/>
            <em>Ý nghĩa Binh Pháp:</em> Trung Cung là nơi tù túng, tĩnh lặng nhất. Tướng Soái phe Chủ rơi vào đây coi như bị giam lỏng ở trung tâm, kẹt cứng tiến thoái lưỡng nan, hoàn toàn bất lợi cho việc xuất binh giao chiến!
        </div>`;
    }
    if (tkGoc % 10 === 5) {
        toanTrungCungMsg += `<div style="margin-top:8px; padding:10px; background:rgba(52,152,219,0.15); border-left:4px solid #3498db; border-radius:4px;">
            <strong style="color:#54a0ff;">🔒 THẾ TRẬN "ĐẠI TIỂU KHÁCH KHÔNG RA KHỎI CUNG GIỮA" (CỬA ĐÓNG - TƯỚNG BẤT XUẤT):</strong><br/>
            Toán Khách = ${tkGoc} có hàng đơn vị là 5. Theo quy tắc Thái Ất, Đại Tướng Khách lập tức nhập Trung Cung (Cung số 5). Phái sinh Tham Tướng Khách (5 × 3 = 15 => đuôi 5) cũng bị hút vào Trung Cung cùng lúc.<br/>
            <em>Ý nghĩa Binh Pháp:</em> Tướng Soái phe Khách kẹt cứng ở Trung Cung, bị vây lỏng không thể bộc phát lực lượng ra các cung xung quanh, tiến công thất bại, nên cố thủ.
        </div>`;
    }

    // 3. Phân tích Khối / Cục hiện tại
    const khoiNum = data.khoiSo || 1;
    let khoiText = `Khối ${khoiNum} (${data.tinhChatKhoi || 'Dương Độn'}): `;
    if (khoiNum === 55) {
        khoiText += `<strong>Thái Ất trợ Chủ. Toán Chủ hòa.</strong> Đại Chủ phát, lợi thuộc về Chủ. Đối trận lợi phát động sau, nên xuất quân hướng chính Tây, đánh lợi hướng chính Đông. Lợi thế trận vuông, phất cờ trắng. Mây từ hướng Tây kéo lại thì Chủ thắng. Nghe tin địch nên phòng bị hướng Tây Nam; kỳ binh hướng Tây Nam; phục binh lợi các giờ Dần - Mão - Thìn.<br/><em>Bên Khách:</em> Khách Mục Yểm. Toán Khách bất hòa. Đại Tướng Tù, bất lợi thuộc về Khách, nên cố thủ. Nghe tin địch nên phòng bị hướng Đông Bắc.`;
    } else {
        khoiText += `Đang vận hành tại Cục/Khối số ${khoiNum} thuộc sa bàn Thái Ất. Cần đối chiếu thế Thái Ất (${taName}), phối hợp Toán Chủ (${tcGoc}) và Toán Khách (${tkGoc}) để định hướng tiến thủ hoặc phòng thủ.`;
    }

    // 4. Cách Cục & Thể Thức & Bát Hung
    let cachCucItems = [];
    if (dtcPalace && dtcPalace === taPalace) {
        cachCucItems.push(`<span style="color:#ff4757; font-weight:bold;">[THỂ THỨC TÙ - Đại Tướng Chủ Bị Tù]</span> Đại Tướng Chủ đóng cùng cung <strong>${taName}</strong> với Thái Ất. Mang ý nghĩa bất lợi lớn cho phe Chủ, chủ về kẻ dưới phạm thượng, nội bộ mâu thuẫn hoặc tướng sĩ bị cầm chân.`);
    }
    if (dtkPalace && dtkPalace === taPalace) {
        cachCucItems.push(`<span style="color:#ff4757; font-weight:bold;">[THỂ THỨC TÙ - Đại Tướng Khách Bị Tù]</span> Đại Tướng Khách đóng cùng cung <strong>${taName}</strong> với Thái Ất. Phe Khách bị bế tắc tiến công, tướng quân sa lầy.`);
    }
    if (vxPalace && vxPalace === taPalace) {
        cachCucItems.push(`<span style="color:#ffa94d; font-weight:bold;">[THỂ THỨC YỂM - Chủ Mục Bị Yểm]</span> Văn Xương đóng cùng cung Thái Ất, mưu sĩ bị che mắt, trù tính kế sách gặp sai lầm.`);
    }
    if (tkPalace && tkPalace === taPalace) {
        cachCucItems.push(`<span style="color:#ffa94d; font-weight:bold;">[THỂ THỨC YỂM - Khách Mục Bị Yểm]</span> Thủy Kích đóng cùng cung Thái Ất, phó tướng Khách bị khống chế vision, trinh sát bế tắc.`);
    }
    if (data.batHung && data.batHung !== "Không thuộc Bát Hung.") {
        cachCucItems.push(`<strong>[BIẾN ĐỘNG BÁT HUNG]:</strong> ${data.batHung} — Tác động trực tiếp lên vận khí Tinh Bàn, cần cẩn trọng các nguy cơ đột biến.`);
    }
    if (cachCucItems.length === 0) {
        cachCucItems.push("<span style='color:#51cf66;'>Không có thể thức hung hiểm đặc biệt (Tù, Yểm, Bách, Kích). Cục diện ổn định.</span>");
    }

    // 5. Phương vị & Khuyến cáo
    const huongChu = CUNG_HUONG[vxPalace] || CUNG_HUONG[taPalace] || "Đông Bắc";
    const huongKhach = CUNG_HUONG[tkPalace] || "Chính Nam";

    return `
    <div class="luan-doan-report-card">
        <div class="luan-doan-section">
            <h4 class="luan-doan-section-title">1. Phân Tích Vị Thế Thần Tinh & Tướng Soái</h4>
            <p class="luan-doan-item"><strong>Thái Ất Vị Thế:</strong> ${taVitheText}</p>
            <p class="luan-doan-item"><strong>Chủ Mục (Văn Xương - Phụ Tướng Phe Chủ):</strong> Đóng tại cung <strong>${vxName}</strong> (${CUNG_HUONG[vxPalace] || ''}), giữ vai trò trù tính kế sách nơi màn trướng và nắm quyền sinh sát.</p>
            <p class="luan-doan-item"><strong>Khách Mục (Thủy Kích - Phụ Tướng Phe Khách):</strong> Đóng tại cung <strong>${tkName}</strong> (${CUNG_HUONG[tkPalace] || ''}), quan sát trận địa và chỉ huy lực lượng tiến công.</p>
            <p class="luan-doan-item"><strong>Đại Tướng Chủ & Khách:</strong> Đại Tướng Chủ tọa tại <strong>${dtcName}</strong>; Đại Tướng Khách tọa tại <strong>${dtkName}</strong>.</p>
        </div>

        <div class="luan-doan-section">
            <h4 class="luan-doan-section-title">2. Phân Tích Thuật Toán Tam Tài & Cát Hung Toán Số</h4>
            
            <div style="background: rgba(0,0,0,0.25); padding: 12px; border-radius: 6px; margin-bottom: 12px; border-left: 3px solid #e74c3c;">
                <p style="margin-bottom:4px;"><strong>🔴 TOÁN CHỦ (Kết quả: ${tcGoc}):</strong> Phân loại: ${tcAnalysis.classification} | Trạng thái: ${tcAnalysis.hoaText} | Cấp độ: ${tcAnalysis.capDo}</p>
                <ul style="padding-left: 18px; font-size: 0.88rem; color: #dedede;">
                    ${tcAnalysis.items.map(it => `<li>${it}</li>`).join("")}
                </ul>
            </div>

            <div style="background: rgba(0,0,0,0.25); padding: 12px; border-radius: 6px; margin-bottom: 12px; border-left: 3px solid #3498db;">
                <p style="margin-bottom:4px;"><strong>🔵 TOÁN KHÁCH (Kết quả: ${tkGoc}):</strong> Phân loại: ${tkAnalysis.classification} | Trạng thái: ${tkAnalysis.hoaText} | Cấp độ: ${tkAnalysis.capDo}</p>
                <ul style="padding-left: 18px; font-size: 0.88rem; color: #dedede;">
                    ${tkAnalysis.items.map(it => `<li>${it}</li>`).join("")}
                </ul>
            </div>

            <p class="luan-doan-item"><strong>🟢 TOÁN ĐỊNH (Kết quả: ${tdGoc}):</strong> Toán Định đạt số ${tdGoc}, biểu thị nhịp vận định sẵn giữa nhân sự và thiên thời, làm cầu nối dung hòa giữa Chủ và Khách.</p>
            ${toanTrungCungMsg}
        </div>

        <div class="luan-doan-section">
            <h4 class="luan-doan-section-title">3. Luận Giải Đặc Điểm KHỐI / CỤC SỐ SA BÀN</h4>
            <div style="background: rgba(212, 175, 55, 0.08); padding: 12px; border-radius: 6px; border: 1px solid rgba(212,175,55,0.3); font-size: 0.9rem;">
                ${khoiText}
            </div>
        </div>

        <div class="luan-doan-section">
            <h4 class="luan-doan-section-title">4. Phân Tích Thể Thức Hung Hiểm & Bát Hung</h4>
            <ul style="padding-left: 20px; margin-top: 5px;">
                ${cachCucItems.map(c => `<li style="margin-bottom: 6px;">${c}</li>`).join("")}
            </ul>
        </div>

        <div class="luan-doan-section">
            <h4 class="luan-doan-section-title">5. Phương Vị Tác Chiến & Chiến Lược Cục Diện</h4>
            <p class="luan-doan-item"><strong>Hướng Trọng Tâm Phe Chủ:</strong> Phòng bị tại <strong>Hướng ${huongChu}</strong> (ứng với cung ${vxName} nơi Chủ Mục đóng giữ).</p>
            <p class="luan-doan-item"><strong>Hướng Trọng Tâm Phe Khách:</strong> Tiến công / Quan sát tại <strong>Hướng ${huongKhach}</strong> (ứng với cung ${tkName} nơi Khách Mục đóng giữ).</p>
            
            <div class="luan-doan-summary-box" style="margin-top: 10px;">
                <strong>📌 KHUYẾN CÁO TỔNG QUAN BẢN TIN TÁC CHIẾN:</strong>
                <p style="margin-top: 6px;">${(tkGoc % 10 === 5 || (dtcPalace === taPalace)) 
                    ? "<span style='color:#ff6b6b; font-weight:bold;'>[THẾ THỦ]</span> Phe Khách bế tắc hoặc Đại Tướng Chủ bị tù. Cả 2 bên nên giằng co phòng ngự, giữ vững trận địa, tuyệt đối không vội vã liều lĩnh." 
                    : "<span style='color:#51cf66; font-weight:bold;'>[THẾ TIẾN]</span> Cục diện phân định rõ ràng. Bên nào nắm được Toán Hòa và nương theo Bát Môn Sinh/Khai sẽ chiếm ưu thế tuyệt đối trên sa bàn."}</p>
            </div>
        </div>
    </div>`;
}

const NAP_GIAP_DATA = {
    "Kiền": {
        can: "Giáp, Nhâm",
        noi: ["Giáp Tý", "Giáp Dần", "Giáp Thìn"],
        ngoai: ["Nhâm Ngọ", "Nhâm Thân", "Nhâm Tuất"]
    },
    "Khôn": {
        can: "Ất, Quý",
        noi: ["Ất Mùi", "Ất Tị", "Ất Mão"],
        ngoai: ["Quý Sửu", "Quý Hợi", "Quý Dậu"]
    },
    "Chấn": {
        can: "Canh",
        noi: ["Canh Tý", "Canh Dần", "Canh Thìn"],
        ngoai: ["Canh Ngọ", "Canh Thân", "Canh Tuất"]
    },
    "Cấn": {
        can: "Bính",
        noi: ["Bính Thìn", "Bính Ngọ", "Bính Thân"],
        ngoai: ["Bính Tuất", "Bính Tý", "Bính Dần"]
    },
    "Tốn": {
        can: "Tân",
        noi: ["Tân Sửu", "Tân Hợi", "Tân Dậu"],
        ngoai: ["Tân Mùi", "Tân Tị", "Tân Mão"]
    },
    "Ly": {
        can: "Kỷ",
        noi: ["Kỷ Mão", "Kỷ Sửu", "Kỷ Hợi"],
        ngoai: ["Kỷ Dậu", "Kỷ Mùi", "Kỷ Tị"]
    },
    "Khảm": {
        can: "Mậu",
        noi: ["Mậu Dần", "Mậu Thìn", "Mậu Ngọ"],
        ngoai: ["Mậu Thân", "Mậu Tuất", "Mậu Tý"]
    },
    "Đoài": {
        can: "Đinh",
        noi: ["Đinh Tị", "Đinh Mão", "Đinh Sửu"],
        ngoai: ["Đinh Hợi", "Đinh Dậu", "Đinh Mùi"]
    }
};

const CAN_CHI_NUMBERS = {
    "Giáp": 9, "Kỷ": 9, "Tý": 9, "Ngọ": 9,
    "Ất": 8, "Canh": 8, "Sửu": 8, "Mùi": 8,
    "Bính": 7, "Tân": 7, "Dần": 7, "Thân": 7,
    "Đinh": 6, "Nhâm": 6, "Mão": 6, "Dậu": 6,
    "Mậu": 5, "Quý": 5, "Thìn": 5, "Tuất": 5,
    "Tị": 4, "Hợi": 4
};

function getNapGiapForHao(noiQuai, ngoaiQuai, haoDong) {
    let canChi = "";
    if (haoDong >= 1 && haoDong <= 3) {
        canChi = (NAP_GIAP_DATA[noiQuai] && NAP_GIAP_DATA[noiQuai].noi) ? NAP_GIAP_DATA[noiQuai].noi[haoDong - 1] : "";
    } else {
        canChi = (NAP_GIAP_DATA[ngoaiQuai] && NAP_GIAP_DATA[ngoaiQuai].ngoai) ? NAP_GIAP_DATA[ngoaiQuai].ngoai[haoDong - 4] : "";
    }
    
    if (!canChi) return { canChi: "Chưa rõ", can: "", chi: "", canNum: 0, chiNum: 0, totalNum: 0, taiHoa: "", huong: "" };
    
    const parts = canChi.split(" ");
    const can = parts[0];
    const chi = parts[1];
    
    const canNum = CAN_CHI_NUMBERS[can] || 0;
    const chiNum = CAN_CHI_NUMBERS[chi] || 0;
    const totalNum = canNum + chiNum;

    let taiHoa = "";
    let huong = "";
    if (["Giáp", "Ất"].includes(can)) {
        taiHoa = "Gió mưa, bệnh dịch, lưu vong.";
        huong = "Phương Đông (Di bên Đông)";
    } else if (["Bính", "Đinh"].includes(can)) {
        taiHoa = "Lửa, hạn, cháy quái, miệng tiếng, trong hậu cung có biến.";
        huong = "Phương Nam (Mường bên Nam)";
    } else if (["Mậu", "Kỷ"].includes(can)) {
        taiHoa = "Sâu lúa, việc thổ công, gầm trời tang lớn.";
        huong = "Phương Trung Cung (Nước giữa)";
    } else if (["Canh", "Tân"].includes(can)) {
        taiHoa = "Binh qua trộm cướp.";
        huong = "Phương Tây (Di bên Tây)";
    } else if (["Nhâm", "Quý"].includes(can)) {
        taiHoa = "Mưa bay tối tăm, nước lớn ngập sông, Hậu Phi không yên.";
        huong = "Phương Bắc (Di bên Bắc)";
    }

    return { canChi, can, chi, canNum, chiNum, totalNum, taiHoa, huong };
}

function getHaoPositionInterpretation(haoDong) {
    if (haoDong === 2 || haoDong === 5) {
        return {
            level: "Được Trung Chính (Rất Cát)",
            desc: "Đời bằng yên, lộc thọ dài. Vua được tôi trợ, thương quân dân, đời giàu thịnh lớn."
        };
    } else if (haoDong === 1 || haoDong === 4) {
        return {
            level: "Tốt Nhì (Cát/Bình)",
            desc: "Tốt nhì. Nếu toán hòa có ứng là lành; không hòa, không ứng thì vua không tôi trợ, đời không yên ổn. Gặp kỵ niên (Bế, Tù, Yếm, Kích) không phải là đất yên lành."
        };
    } else {
        return {
            level: "Cực Hung (Sợ Hào Cực)",
            desc: haoDong === 3 
                ? "Sợ hào cực của Nội quái (Hào 3). Việc nhiều hung biến, thời đổ vỡ nguy hại. Cực ở trong thì tai nạn nhẹ hơn ở ngoài." 
                : "Sợ hào cực của Ngoại quái (Hào 6). Việc nhiều hung biến, thời đổ vỡ nguy hại không quay chân lại được. Cùng ở ngoài thì tai nạn rất nặng!"
        };
    }
}

/**
 * BÁO CÁO PHÂN TÍCH QUẺ ĐẠI DU & TIỂU DU VẬN QUÁI 4 BƯỚC CHUẨN TÁC
 * Theo Tôn Chỉ: "Quái nói về việc - Hào nói về thời - Tượng nói lành dữ"
 */
function generateVanQuaiAnalysisReport(du) {
    if (!du) return "";

    const ddNgoaiT = TRIGRAM_NATURE[du.ddNgoaiQuai] || { nature: "Thiên", direction: "Tây Bắc", element: "Kim" };
    const ddNoiT = TRIGRAM_NATURE[du.ddNoiQuai] || { nature: "Địa", direction: "Tây Nam", element: "Thổ" };

    const tdNgoaiT = TRIGRAM_NATURE[du.tdNgoaiQuai] || { nature: "Thiên", direction: "Tây Bắc", element: "Kim" };
    const tdNoiT = TRIGRAM_NATURE[du.tdNoiQuai] || { nature: "Địa", direction: "Tây Nam", element: "Thổ" };

    const ddNap = getNapGiapForHao(du.ddNoiQuai, du.ddNgoaiQuai, du.ddHaoDong);
    const ddHaoInterp = getHaoPositionInterpretation(du.ddHaoDong);

    const tdNap = getNapGiapForHao(du.tdNoiQuai, du.tdNgoaiQuai, du.tdHaoDong);
    const tdHaoInterp = getHaoPositionInterpretation(du.tdHaoDong);

    return `
    <div style="margin-top: 20px; padding: 18px; background: rgba(15, 20, 42, 0.95); border-radius: 10px; border: 1px solid rgba(212, 175, 55, 0.35); font-size: 0.9rem; color: #e0e6ed; line-height: 1.8;">
        
        <!-- TÔN CHỈ VẬN QUÁI CỐT LÕI -->
        <div style="background: rgba(212, 175, 55, 0.08); border-left: 4px solid var(--gold); border-radius: 6px; padding: 12px 16px; margin-bottom: 16px;">
            <h4 style="color: var(--gold); font-family: 'Cinzel', serif; font-size: 1.05rem; margin-bottom: 4px;">
                ☯ TÔN CHỈ LUẬN GIẢI CỐT LÕI VẬN QUÁI THÁI ẤT (MỤC 59)
            </h4>
            <p style="font-size: 0.95rem; color: #ffffff; font-weight: 700; margin-bottom: 4px;">
                👉 <em>"Quái nói về việc — Hào nói về thời — Tượng nói lành dữ"</em>
            </p>
            <p style="font-size: 0.86rem; color: #cbd5e0; margin: 0;">
                - <strong>Quái giữ việc:</strong> Trùng quái xác định chủ đề, tính chất và sự việc/tai ách diễn ra.<br/>
                - <strong>Hào giữ thời:</strong> Hào đang động chỉ rõ thời điểm và giai đoạn của biến cố.<br/>
                - <strong>Tượng nói lành dữ:</strong> Kết luận cát hung dựa trên so sánh giữa <strong>Quẻ Chủ (Trực quái)</strong> và <strong>Quẻ Biến (Hào động)</strong>.<br/>
                - <strong>Phép Nhìn Tượng:</strong> Trước xem thể trong (Nội quái), rồi suy tượng ngoài (Ngoại quái), tỏ điều đã qua, xét điều sắp tới thì thấy lành dữ.
            </p>
        </div>

        <!-- 1. PHÂN TÍCH QUẺ ĐẠI DU VẬN QUÁI -->
        <div class="luan-doan-section" style="margin-bottom: 16px;">
            <h4 class="luan-doan-section-title">1. Phân Tích Quẻ Đại Du Vận Quái (Vận 36 Năm / Quẻ — 6 Năm 1 Hào)</h4>
            
            <p class="luan-doan-item">
                <strong>🔹 Bước 1 — Phân Tích Tượng Quẻ & Phương Vị Địa Lý:</strong><br/>
                - Thượng Quái (Ngoại): Quẻ <strong>${du.ddNgoaiQuai}</strong> (Hình tượng <em>${ddNgoaiT.nature}</em> — Trấn ở Hướng <strong>${ddNgoaiT.direction}</strong>).<br/>
                - Hạ Quái (Nội): Quẻ <strong>${du.ddNoiQuai}</strong> (Hình tượng <em>${ddNoiT.nature}</em> — Trấn ở Hướng <strong>${ddNoiT.direction}</strong>).<br/>
                - Tụ Hội Không Gian: Sự tương tác giữa ${ddNgoaiT.nature} và ${ddNoiT.nature} tại dải phương vị ${ddNgoaiT.direction} — ${ddNoiT.direction}.
            </p>

            <p class="luan-doan-item">
                <strong>🔹 Bước 2 — Giải Nghĩa Quẻ Chủ Đại Du:</strong><br/>
                - Quẻ Chủ: <strong>Quẻ ${du.ddTrungQuai}</strong>.<br/>
                - Ý Nghĩa & Tự Quái: Quẻ giữ việc, biểu thị môi trường vận hạn Đại Du trong chu kỳ 36 năm.
            </p>

            <p class="luan-doan-item">
                <strong>🔹 Bước 3 — Xét Lời Hào, Vị Trí Hào & Nạp Giáp (Thời Điểm & Tai Họa):</strong><br/>
                - Thời Điểm Vận Hạn: Đang ở <strong>Hào ${du.ddHaoDong} Động</strong> (Năm thứ ${du.ddNoiDu + 1}/36 trong chu kỳ 36 năm).<br/>
                - Đánh Giá Vị Trí Hào: <strong style="color: var(--gold);">${ddHaoInterp.level}</strong> ➔ ${ddHaoInterp.desc}<br/>
                - <strong>Nạp Giáp Hào Động:</strong> Can Chi <strong>${ddNap.canChi}</strong> (Số Nạp Giáp: Can ${ddNap.can}:${ddNap.canNum} + Chi ${ddNap.chi}:${ddNap.chiNum} = <strong>${ddNap.totalNum}</strong>).<br/>
                - <strong>Phương Vị & Tai Họa Ứng Nghiệm:</strong> ${ddNap.taiHoa} (Ứng tại <strong>${ddNap.huong}</strong>).<br/>
                - Biến Đổi Âm/Dương: Hào ${du.ddHaoDong} động biến ➔ Quẻ Chủ <strong>${du.ddTrungQuai}</strong> chuyển thành <strong>Quẻ Biến ${du.ddQueBienName}</strong>.
            </p>

            <div class="luan-doan-summary-box">
                <strong>📌 Bước 4 — Phương Châm Xử Thế Đại Du:</strong>
                <p style="margin-top: 4px;">Căn cứ sự chuyển biến từ tượng Quẻ Chủ ${du.ddTrungQuai} sang Quẻ Biến <strong>${du.ddQueBienName}</strong> tại Hào ${du.ddHaoDong} động để chủ động điều chỉnh sách lược đối phó, giữ vững trung chính.</p>
            </div>
        </div>

        <!-- 2. PHÂN TÍCH QUẺ TIỂU DU VẬN QUÁI -->
        <div class="luan-doan-section">
            <h4 class="luan-doan-section-title">2. Phân Tích Quẻ Tiểu Du Vận Quái (Vận 24 Năm / Quẻ — 4 Năm 1 Hào)</h4>
            
            <p class="luan-doan-item">
                <strong>🔹 Bước 1 — Phân Tích Tượng Quẻ & Phương Vị Địa Lý:</strong><br/>
                - Thượng Quái (Ngoại): Quẻ <strong>${du.tdNgoaiQuai}</strong> (Hình tượng <em>${tdNgoaiT.nature}</em> — Trấn ở Hướng <strong>${tdNgoaiT.direction}</strong>).<br/>
                - Hạ Quái (Nội): Quẻ <strong>${du.tdNoiQuai}</strong> (Hình tượng <em>${tdNoiT.nature}</em> — Trấn ở Hướng <strong>${tdNoiT.direction}</strong>).<br/>
                - Tụ Hội Không Gian: Sự tương tác giữa ${tdNgoaiT.nature} và ${tdNoiT.nature} tại dải phương vị ${tdNgoaiT.direction} — ${tdNoiT.direction}.
            </p>

            <p class="luan-doan-item">
                <strong>🔹 Bước 2 — Giải Nghĩa Quẻ Chủ Tiểu Du:</strong><br/>
                - Quẻ Chủ: <strong>Quẻ ${du.tdTrungQuai}</strong>.<br/>
                - Ý Nghĩa & Tự Quái: Quẻ giữ việc, biểu thị môi trường vận hạn Tiểu Du trong chu kỳ ngắn hạn 24 năm.
            </p>

            <p class="luan-doan-item">
                <strong>🔹 Bước 3 — Xét Lời Hào, Vị Trí Hào & Nạp Giáp (Thời Điểm & Tai Họa):</strong><br/>
                - Thời Điểm Vận Hạn: Đang ở <strong>Hào ${du.tdHaoDong} Động</strong> (Năm thứ ${du.tdNoiDu + 1}/24 trong chu kỳ 24 năm).<br/>
                - Đánh Giá Vị Trí Hào: <strong style="color: var(--gold);">${tdHaoInterp.level}</strong> ➔ ${tdHaoInterp.desc}<br/>
                - <strong>Nạp Giáp Hào Động:</strong> Can Chi <strong>${tdNap.canChi}</strong> (Số Nạp Giáp: Can ${tdNap.can}:${tdNap.canNum} + Chi ${tdNap.chi}:${tdNap.chiNum} = <strong>${tdNap.totalNum}</strong>).<br/>
                - <strong>Phương Vị & Tai Họa Ứng Nghiệm:</strong> ${tdNap.taiHoa} (Ứng tại <strong>${tdNap.huong}</strong>).<br/>
                - Biến Đổi Âm/Dương: Hào ${du.tdHaoDong} động biến ➔ Quẻ Chủ <strong>${du.tdTrungQuai}</strong> chuyển thành <strong>Quẻ Biến ${du.tdQueBienName}</strong>.
            </p>

            <div class="luan-doan-summary-box">
                <strong>📌 Bước 4 — Phương Châm Xử Thế Tiểu Du:</strong>
                <p style="margin-top: 4px;">Căn cứ sự chuyển biến từ tượng Quẻ Chủ ${du.tdTrungQuai} sang Quẻ Biến <strong>${du.tdQueBienName}</strong> tại Hào ${du.tdHaoDong} động để chủ động ứng phó thời cuộc.</p>
            </div>
        </div>
    </div>`;
}
