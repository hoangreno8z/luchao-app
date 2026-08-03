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
 * BÁO CÁO LUẬN GIẢI CHUYÊN SÂU CỤC DIỆN SA BÀN THÁI ẤT
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
    
    // Thái Ất vị thế
    let taVitheText = "";
    if ([1, 8, 4, 3].includes(taBietSo)) {
        taVitheText = `Thái Ất đang đóng ở cung <strong>${taName}</strong> (mang biệt số ${taBietSo}) là thế <strong>"Trợ Chủ"</strong>. Theo sách xưa, thế này tạo ra cục diện trợ giúp cho phe Chủ (tức phe phòng thủ/bên trong).`;
    } else if ([9, 2, 7, 6].includes(taBietSo)) {
        taVitheText = `Thái Ất đang đóng ở cung <strong>${taName}</strong> (mang biệt số ${taBietSo}) là thế <strong>"Trợ Khách"</strong>. Theo sách xưa, thế này tạo ra cục diện trợ giúp cho phe Khách (tức phe tiến công/bên ngoài).`;
    } else {
        taVitheText = `Thái Ất đang tọa tại cung <strong>${taName}</strong> là thế <strong>"Trung Hòa"</strong>, âm dương điều hòa.`;
    }

    // Toán Số
    const tcGoc = data.toanChuGoc || data.toanChu || 1;
    const tkGoc = data.toanKhachGoc || data.toanKhach || 1;
    const tdGoc = data.toanDinhGoc || data.toanDinh || 1;

    let tcText = `Số ${tcGoc} là Toán Chủ. `;
    if (tcGoc % 2 !== 0) tcText += `Thuộc khí Đơn Dương, khí vận phát động.`;
    else tcText += `Thuộc khí Đơn Âm, khí vận thu quái.`;

    let tkText = `Số ${tkGoc} là Toán Khách. `;
    if (tkGoc % 10 === 5) {
        tkText += `<strong>Cửa đóng (Không cửa)</strong>. Theo quy luật vận hành của Thái Ất thức, các sao không nhập Trung cung mang biệt số 5. Toán Khách đuôi 5 khiến Đại/Tiểu Tướng Khách không thể tiến vào Trung cung để hành sự, bế tắc mất phương hướng hành động.`;
    } else {
        tkText += `Hàng đơn vị khác 5, phe Khách hành sự thông suốt.`;
    }

    // Cách cục & Thể thức
    let cachCucItems = [];
    if (dtcPalace && dtcPalace === taPalace) {
        cachCucItems.push(`<strong>Đại Tướng Chủ bị Tù (Thể thức Tù)</strong>: Đại Tướng Chủ đóng cùng cung ${taName} với Thái Ất nên bị Tù. Mang ý nghĩa bất lợi, chủ về việc kẻ dưới phạm thượng hoặc đánh lại.`);
    }
    if (dtkPalace && dtkPalace === taPalace) {
        cachCucItems.push(`<strong>Đại Tướng Khách bị Tù (Thể thức Tù)</strong>: Đại Tướng Khách đóng cùng cung ${taName} với Thái Ất nên bị Tù, bế tắc tiến công.`);
    }
    if (data.batHung && data.batHung !== "Không thuộc Bát Hung.") {
        cachCucItems.push(`<strong>Biến động Bát Hung:</strong> ${data.batHung}`);
    }
    if (cachCucItems.length === 0) {
        cachCucItems.push("Không có thể thức hung hiểm đặc biệt.");
    }

    // Phương vị
    const huongChu = CUNG_HUONG[vxPalace] || CUNG_HUONG[taPalace] || "Đông Bắc";
    const huongKhach = CUNG_HUONG[tkPalace] || "Chính Nam";

    return `
    <div class="luan-doan-report-card">
        <div class="luan-doan-section">
            <h4 class="luan-doan-section-title">1. Phân Tích Thuật Ngữ Vị Thế & Thần Tinh</h4>
            <p class="luan-doan-item"><strong>Thái Ất Vị Thế:</strong> ${taVitheText}</p>
            <p class="luan-doan-item"><strong>Chủ Mục (Văn Xương):</strong> Chủ Mục là tên gọi khác của sao Văn Xương, đóng vai trò phụ tướng phò tá Thái Ất, trù tính kế sách nơi màn trướng và nắm quyền sinh sát. Trong lá số này, Văn Xương đóng tại cung <strong>${vxName}</strong>.</p>
            <p class="luan-doan-item"><strong>Khách Mục (Thủy Kích):</strong> Khách Mục là tên gọi khác của sao Thủy Kích (Địa Mục), đóng vai trò phó tướng phía Khách, quan sát trận địa và chỉ huy tác chiến. Trong lá số này, Thủy Kích đóng tại cung <strong>${tkName}</strong>.</p>
            <p class="luan-doan-item"><strong>Đại Tướng Chủ / Đại Tướng Khách:</strong> Đại Tướng Chủ đóng tại cung <strong>${dtcName}</strong>; Đại Tướng Khách đóng tại cung <strong>${dtkName}</strong>.</p>
        </div>

        <div class="luan-doan-section">
            <h4 class="luan-doan-section-title">2. Phân Tích Cách Cục & Toán Số</h4>
            <p class="luan-doan-item"><strong>Toán Chủ (${tcGoc}):</strong> ${tcText}</p>
            <p class="luan-doan-item"><strong>Toán Khách (${tkGoc}):</strong> ${tkText}</p>
            <p class="luan-doan-item"><strong>Toán Định (${tdGoc}):</strong> Toán Định đạt số ${tdGoc}, biểu thị nhịp vận định sẵn giữa nhân sự và thiên thời.</p>
            <div class="luan-doan-item"><strong>Cách Cục & Thể Thức:</strong>
                <ul style="padding-left: 20px; margin-top: 5px;">
                    ${cachCucItems.map(c => `<li style="margin-bottom: 4px;">${c}</li>`).join("")}
                </ul>
            </div>
        </div>

        <div class="luan-doan-section">
            <h4 class="luan-doan-section-title">3. Phân Tích Phương Vị & Khuyến Cáo Cục Diện</h4>
            <p class="luan-doan-item"><strong>Hướng Phòng Bị Phe Chủ:</strong> Phe Chủ nên chú ý phòng bị tại <strong>Hướng ${huongChu}</strong> (tương ứng cung ${vxName} nơi Chủ Mục tọa thủ).</p>
            <p class="luan-doan-item"><strong>Hướng Phòng Bị Phe Khách:</strong> Phe Khách nên trọng tâm quan sát <strong>Hướng ${huongKhach}</strong> (tương ứng cung ${tkName} nơi Khách Mục tọa thủ).</p>
            <div class="luan-doan-summary-box">
                <strong>📌 Tóm Tắt Cục Diện Tác Chiến:</strong>
                <p style="margin-top: 6px;">${(tkGoc % 10 === 5 || (dtcPalace === taPalace)) ? "Cả 2 bên Chủ và Khách đều gặp điểm bất lợi hoặc bế tắc thế trận. Chiến lược tối ưu nhất là cố thủ phòng ngự, không nên vội vã tiến công." : "Cục diện đang có sự phân định rõ ràng giữa phe Chủ và phe Khách, cần nương theo vị thế Thái Ất và Bát Môn để nắm giữ thế chủ động."}</p>
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
