/**
 * Modular Thái Ất Engine — V4.0 (Tái cấu trúc theo Cụm Công Thức)
 * 
 * PHÂN LỚP:
 * 1. Hằng số và Bảng Tra
 * 2. ThaiAtBaseEngine: Chứa tất cả công thức tính toán độc lập
 * 3. TueKeEngine, NguyetKeEngine...: Kế thừa và truyền Tích/Kỷ Dư phù hợp
 * 4. calculateThaiAtChart: Điều phối, tính Time Travel (Hiện tại & Tương lai)
 */

// ==========================================
// 1. CONSTANTS & MAPS
// ==========================================
const THUONG_CO_EPOCH = 10153917;

const THAP_LUC_THAN = [
    { idx: 0,  id: "than",   name: "Thân",  alias: "Vũ Đức",     element: "Kim",  elementKey: "kim",  direction: "Tây Nam",   palaceNum: 7, isDwell: false },
    { idx: 1,  id: "dau",    name: "Dậu",   alias: "Thái Tộc",   element: "Kim",  elementKey: "kim",  direction: "Chính Tây", palaceNum: 7, isDwell: false },
    { idx: 2,  id: "tuat",   name: "Tuất",  alias: "Âm Chủ",     element: "Thổ",  elementKey: "tho",  direction: "Tây Bắc",   palaceNum: 6, isDwell: false },
    { idx: 3,  id: "kien",   name: "Kiền",  alias: "Âm Đức",     element: "Kim",  elementKey: "kim",  direction: "Tây Bắc góc", palaceNum: 6, isDwell: true },
    { idx: 4,  id: "hoi",    name: "Hợi",   alias: "Đại Nghĩa",  element: "Thủy", elementKey: "thuy", direction: "Tây Bắc",   palaceNum: 6, isDwell: false },
    { idx: 5,  id: "ty",     name: "Tý",    alias: "Địa Chủ",    element: "Thủy", elementKey: "thuy", direction: "Chính Bắc", palaceNum: 1, isDwell: false },
    { idx: 6,  id: "suu",    name: "Sửu",   alias: "Dương Đức",  element: "Thổ",  elementKey: "tho",  direction: "Đông Bắc",  palaceNum: 8, isDwell: false },
    { idx: 7,  id: "can",    name: "Cấn",   alias: "Hòa Đức",    element: "Thổ",  elementKey: "tho",  direction: "Đông Bắc góc", palaceNum: 8, isDwell: true },
    { idx: 8,  id: "dan",    name: "Dần",   alias: "Lã Thân",    element: "Mộc",  elementKey: "moc",  direction: "Đông Bắc",  palaceNum: 8, isDwell: false },
    { idx: 9,  id: "mao",    name: "Mão",   alias: "Cao Tùng",   element: "Mộc",  elementKey: "moc",  direction: "Chính Đông", palaceNum: 3, isDwell: false },
    { idx: 10, id: "thin",   name: "Thìn",  alias: "Thái Dương", element: "Thổ",  elementKey: "tho",  direction: "Đông Nam",  palaceNum: 4, isDwell: false },
    { idx: 11, id: "ton",    name: "Tốn",   alias: "Đại Cảnh",   element: "Mộc",  elementKey: "moc",  direction: "Đông Nam góc", palaceNum: 4, isDwell: true },
    { idx: 12, id: "ty_chi", name: "Tị",    alias: "Đại Thần",   element: "Hỏa",  elementKey: "hoa",  direction: "Đông Nam",  palaceNum: 9, isDwell: false },
    { idx: 13, id: "ngo",    name: "Ngọ",   alias: "Đại Uy",     element: "Hỏa",  elementKey: "hoa",  direction: "Chính Nam", palaceNum: 9, isDwell: false },
    { idx: 14, id: "mui",    name: "Mùi",   alias: "Thiên Đạo",  element: "Thổ",  elementKey: "tho",  direction: "Tây Nam",   palaceNum: 2, isDwell: false },
    { idx: 15, id: "khon",   name: "Khôn",  alias: "Đại Vũ",     element: "Thổ",  elementKey: "tho",  direction: "Tây Nam góc", palaceNum: 2, isDwell: true }
];

const CUNG_TO_THAN_IDX = { 1: 5, 2: 15, 3: 9, 4: 11, 5: -1, 6: 3, 7: 1, 8: 7, 9: 13 };
const CHI_TO_THAN_IDX = [5, 6, 8, 9, 10, 12, 13, 14, 0, 1, 2, 4];
const CHI_LIST_LOCAL = ["Tý", "Sửu", "Dần", "Mão", "Thìn", "Tị", "Ngọ", "Mùi", "Thân", "Dậu", "Tuất", "Hợi"];
const CAN_CUNG_MAP = [0, 9, 8, 7, 1, 2, 3, 4, 5, 6]; // Giáp=0, Ất=9, Bính=8, Đinh=7...
const CUU_TINH = ["Thiên Bồng", "Thiên Nhuế", "Thiên Xung", "Thiên Phụ", "Thiên Cầm", "Thiên Tâm", "Thiên Trụ", "Thiên Nhậm", "Thiên Ương"];
const BAT_MON = ["Khai", "Hưu", "Sinh", "Thương", "Đỗ", "Cảnh", "Tử", "Kinh"];

function getThanName(thanIdx) {
    if (thanIdx === -1) return "Trung Cung";
    return THAP_LUC_THAN[thanIdx] ? THAP_LUC_THAN[thanIdx].name : "N/A";
}


// ==========================================
// 2. BASE CALCULATOR ENGINE
// ==========================================
class ThaiAtBaseEngine {
    constructor(tueTich, kyDu, isDuongDon, namCanIdx, tuTru) {
        this.tueTich = tueTich;
        this.kyDu = kyDu;
        this.isDuongDon = isDuongDon;
        this.namCanIdx = namCanIdx;
        this.tuTru = tuTru;
        
        // Cục Số (72)
        this.cucNum = (this.tueTich % 72) || 72;
        
        // Tích Trung Cổ Giáp Dần (Dành riêng cho Tuế Kể - Tam Cơ & Đại Du & Ngũ Phúc)
        const yearVal = this.tueTich > 10000000 ? (this.tueTich - THUONG_CO_EPOCH) : this.tueTich;
        this.tichTrungCo = yearVal + 12607;
    }
    
    // ------ NHÓM KỶ DƯ (MOD 360/24/18/12) ------
    calcThaiAt() {
        let R = this.kyDu % 24 || 24;
        const palaceIndex = Math.floor((R - 1) / 3);
        const yearInPalace = ((R - 1) % 3) + 1;
        // Dương độn: Càn(1)→Ly(2)→Cấn(3)→Chấn(4)→Đoài(6)→Khôn(7)→Khảm(8)→Tốn(9)
        // Âm độn: Tốn(9)→Khảm(8)→Khôn(7)→Đoài(6)→Chấn(4)→Cấn(3)→Ly(2)→Càn(1)
        const path = this.isDuongDon ? [3, 13, 7, 9, 1, 15, 5, 11] : [11, 5, 15, 1, 9, 7, 13, 3];
        const thanIdx = path[palaceIndex];
        return { thanIdx, name: `Thái Ất (Cung ${palaceIndex + 1}, Năm ${yearInPalace})`, class: "thai-at" };
    }
    
    calcVanXuong() {
        // Dương độn: Khởi Thân(đi thuận 16 thần, gặp Kiền Khôn lưu 2 toán)
        const R = this.kyDu % 18 || 18;
        let current = 0; // Thân idx=0
        let stepCount = 1;
        const pauseArr = this.isDuongDon ? [3, 15] : [7, 11]; // Kiền,Khôn vs Cấn,Tốn
        if (R <= 1) return { thanIdx: current, name: "Văn Xương (Thiên Mục)", class: "van-xuong" };
        let safety = 0;
        while (stepCount < R && safety < 100) {
            safety++;
            if (pauseArr.includes(current)) {
                stepCount++;
                if (stepCount >= R) return { thanIdx: current, name: "Văn Xương (Thiên Mục)", class: "van-xuong" };
            }
            current = (current + 1) % 16;
            stepCount++;
        }
        return { thanIdx: current, name: "Văn Xương (Thiên Mục)", class: "van-xuong" };
    }
    
    calcKeThan() {
        // Dương độn: Khởi Dần(idx=8) nghịch 12 Chi
        // Âm độn: Khởi Thân(idx=0) nghịch 12 Chi
        const R = this.kyDu % 12 || 12;
        const startIdx = this.isDuongDon ? 8 : 0; // Dần=8, Thân=0
        let current = startIdx;
        for (let i = 1; i < R; i++) {
            current = (current - 1 + 16) % 16;
            // Bỏ qua 4 góc (Kiền, Cấn, Tốn, Khôn) khi đếm 12 chi
            let safety = 0;
            while ([3, 7, 11, 15].includes(current) && safety < 10) {
                safety++;
                current = (current - 1 + 16) % 16;
            }
        }
        return { thanIdx: current, name: "Kế Định", class: "ke-than" };
    }

    calcKeDinh(thaiTueIdx, vanXuongIdx) {
        const THAN_HOP_MAP = { 0:12, 1:10, 2:9, 3:15, 4:8, 5:6, 6:5, 7:11, 8:4, 9:2, 10:1, 11:7, 12:0, 13:14, 14:13, 15:3 };
        const thanHopIdx = THAN_HOP_MAP[thaiTueIdx] !== undefined ? THAN_HOP_MAP[thaiTueIdx] : thaiTueIdx;
        
        let stepCount = 1;
        let p = thanHopIdx;
        let safety = 0;
        while (p !== vanXuongIdx && safety < 32) {
            safety++;
            p = (p + 1) % 16;
            stepCount++;
        }
        
        let keDinhIdx = thaiTueIdx;
        for (let i = 1; i < stepCount; i++) {
            keDinhIdx = (keDinhIdx + 1) % 16;
        }
        
        return { thanIdx: keDinhIdx, name: "Kế Định", class: "ke-dinh", stepCount };
    }

    // ------ NHÓM TÍCH HỢP (THỦY KÍCH, TƯỚNG) ------
    calcThuyKich(vanXuongIdx, keThanIdx) {
        const CAN_IDX = 7;
        const distance = (vanXuongIdx - keThanIdx + 16) % 16;
        return { thanIdx: (CAN_IDX + distance) % 16, name: "Thủy Kích (Địa Mục)", class: "thuy-kich" };
    }
    
    calcDaiTuongAndThamTuong(taIdx, vxIdx, tkIdx) {
        const MAIN_PALACE_BIET_SO = { 3: 1, 13: 2, 7: 3, 9: 4, 1: 6, 15: 7, 5: 8, 11: 9 };
        const GIAN_THAN_IDXS = [0, 2, 4, 6, 8, 10, 12, 14];
        const PALACE_TO_THAN_IDX = [-1, 3, 13, 7, 9, -1, 1, 15, 5, 11];
        
        const getToan = (startIdx) => {
            if (startIdx === taIdx) return { raw: 1, val: 1 };
            
            let sum = 0;
            if (GIAN_THAN_IDXS.includes(startIdx)) {
                sum += 1;
            } else if (MAIN_PALACE_BIET_SO[startIdx] !== undefined) {
                sum += MAIN_PALACE_BIET_SO[startIdx];
            }
            
            let p = (startIdx + 1) % 16;
            let safety = 0;
            while (p !== taIdx && safety < 32) {
                safety++;
                if (MAIN_PALACE_BIET_SO[p] !== undefined) {
                    sum += MAIN_PALACE_BIET_SO[p];
                }
                p = (p + 1) % 16;
            }
            return { raw: sum, val: sum % 10 || 10 };
        };

        const chuToanObj = getToan(vxIdx);
        const khachToanObj = getToan(tkIdx);
        const chuToan = chuToanObj.val;
        const khachToan = khachToanObj.val;
        
        const chuTuongIdx = PALACE_TO_THAN_IDX[chuToan] !== undefined ? PALACE_TO_THAN_IDX[chuToan] : -1;
        const khachTuongIdx = PALACE_TO_THAN_IDX[khachToan] !== undefined ? PALACE_TO_THAN_IDX[khachToan] : -1;
        
        const thamChuToan = (chuToan * 3) % 10 || 10;
        const thamKhachToan = (khachToan * 3) % 10 || 10;
        
        return [
            { thanIdx: chuTuongIdx, name: `Đại Tướng Chủ (Toán ${chuToan})`, class: "chu-tuong", rawToan: chuToanObj.raw },
            { thanIdx: khachTuongIdx, name: `Đại Tướng Khách (Toán ${khachToan})`, class: "khach-tuong", rawToan: khachToanObj.raw },
            { thanIdx: PALACE_TO_THAN_IDX[thamChuToan] !== undefined ? PALACE_TO_THAN_IDX[thamChuToan] : -1, name: `Tham Tướng Chủ`, class: "chu-tuong" },
            { thanIdx: PALACE_TO_THAN_IDX[thamKhachToan] !== undefined ? PALACE_TO_THAN_IDX[thamKhachToan] : -1, name: `Tham Tướng Khách`, class: "khach-tuong" }
        ];
    }

    // ------ NHÓM CƠ, PHÚC, DU (MOD TÍCH 360) ------
    calcCoPhucDu() {
        const tichDu = this.tichTrungCo % 360;
        
        // Quân Cơ: Khởi Ngọ (6), đi thuận 12 chi, 30 năm/cung
        const quanCoStep = Math.floor(tichDu / 30);
        const quanCoIdx = CHI_TO_THAN_IDX[(6 + quanCoStep) % 12];
        
        // Thần Cơ: Khởi Ngọ (6), đi thuận 12 chi, 3 năm/cung
        const thanCoStep = Math.floor((tichDu % 36) / 3);
        const thanCoIdx = CHI_TO_THAN_IDX[(6 + thanCoStep) % 12];
        
        // Dân Cơ: Khởi Tuất (10), đi thuận 12 chi, 1 năm/cung
        const danCoStep = (this.tichTrungCo % 12 || 12) - 1;
        const danCoIdx = CHI_TO_THAN_IDX[(10 + danCoStep) % 12];
        
        // Ngũ Phúc (Dùng Tích Trung Cổ Giáp Dần % 225 / 45 -> Càn, Cấn, Tốn, Khôn, Trung)
        const npR = this.tichTrungCo % 225;
        const npQ = Math.floor(npR / 45);
        const npPath = [3, 7, 11, 15, -1]; // 1: Càn(3), 2: Cấn(7), 3: Tốn(11), 4: Khôn(15), 5: Trung(-1)
        const npIdx = npPath[npQ % 5];
        
        // Đại Du (Dùng Tích Trung Cổ)
        const ddStep = Math.floor(((this.tichTrungCo + 34) % 288) / 36);
        const ddCung = [7, 8, 9, 1, 2, 3, 4, 6][ddStep % 8];
        
        // Tiểu Du (Dùng Kỷ Dư Thượng Cổ)
        let R = this.kyDu % 24 || 24;
        const tdStep = Math.floor((R - 1) / 3);
        const tdCung = [1, 2, 3, 4, 6, 7, 8, 9][tdStep % 8];
        
        return [
            { thanIdx: quanCoIdx, name: "Quân Cơ", class: "quan-co" },
            { thanIdx: thanCoIdx, name: "Thần Cơ", class: "than-co" },
            { thanIdx: danCoIdx, name: "Dân Cơ", class: "dan-co" },
            { thanIdx: npIdx, name: "Ngũ Phúc", class: "ngu-phuc" },
            { thanIdx: CUNG_TO_THAN_IDX[ddCung], name: "Đại Du", class: "dai-du" },
            { thanIdx: CUNG_TO_THAN_IDX[tdCung], name: "Tiểu Du", class: "tieu-du" }
        ];
    }
    
    // ------ NHÓM TỨ THẦN KỲ (MOD 36/12) ------
    calcTuThanKy() {
        // Dùng Kỷ Dư (kyDu) chia 36 lấy dư, dư chia 3, kết quả + 1 = P
        const kVal = this.kyDu !== undefined ? this.kyDu : (this.tueTich % 360);
        const r36 = kVal % 36;
        const P = Math.floor(r36 / 3) + 1; // 1-12
        
        // Mảng 12 cung Tứ Thần Kỳ: 1:Càn(3), 2:Ly(13), 3:Cấn(7), 4:Chấn(9), 5:Trung(-1), 6:Đoài(1), 7:Khôn(15), 8:Khảm(5), 9:Tốn(11), 10:Tị(12), 11:Thân(0), 12:Dần(8)
        const MASTER_PATH = [3, 13, 7, 9, -1, 1, 15, 5, 11, 12, 0, 8];
        
        const tuThanIdx = MASTER_PATH[(0 + P - 1) % 12];   // Khởi Càn (idx 0 của MASTER_PATH)
        const thienAtIdx = MASTER_PATH[(5 + P - 1) % 12];  // Khởi Đoài (idx 5 của MASTER_PATH)
        const trucPhuIdx = MASTER_PATH[(4 + P - 1) % 12];  // Khởi Trung Cung (idx 4 của MASTER_PATH)
        const diaAtIdx = MASTER_PATH[(8 + P - 1) % 12];    // Khởi Tốn (idx 8 của MASTER_PATH)
        
        // 1. Thanh Long: Kỷ Dư % 60 % 12, khởi Hợi thuận 12 địa chi
        const r60_tl = kVal % 60;
        const r12_tl = (r60_tl % 12) || 12;
        const THANH_LONG_PATH = [4, 5, 6, 8, 9, 10, 12, 13, 14, 0, 1, 2];
        const tlIdx = THANH_LONG_PATH[r12_tl - 1];
        
        // 2. Thái Âm: luôn đứng sau Thái Tuế 2 cung (Thái Tuế - 2)
        let thaiTueChiIdx = 6; // Mặc định Ngọ
        if (this.tuTru) {
            if (this.tuTru.hour && this.tuTru.hour.chiIdx !== undefined && this.mode === 'thoi') thaiTueChiIdx = this.tuTru.hour.chiIdx;
            else if (this.tuTru.day && this.tuTru.day.chiIdx !== undefined && this.mode === 'nhat') thaiTueChiIdx = this.tuTru.day.chiIdx;
            else if (this.tuTru.month && this.tuTru.month.chiIdx !== undefined && this.mode === 'nguyet') thaiTueChiIdx = this.tuTru.month.chiIdx;
            else if (this.tuTru.year && this.tuTru.year.chiIdx !== undefined) thaiTueChiIdx = this.tuTru.year.chiIdx;
        }
        const thaiAmChiIdx = (thaiTueChiIdx - 2 + 12) % 12;
        const taIdx = CHI_TO_THAN_IDX[thaiAmChiIdx];
        
        // 3. Phi Phù: Kỷ Dư % 72 / 3 + 1, đếm theo vòng 12 cung Dương/Âm Độn
        const r72 = kVal % 72;
        const P_pp = Math.floor(r72 / 3) + 1;
        const ppStepIdx = (P_pp - 1) % 12;
        const PHI_PHU_DUONG = [11, 11, 15, 3, 3, 13, 7, 9, -1, 1, 15, 5];
        const PHI_PHU_AM = [3, 3, 15, 11, 11, 5, 15, 1, -1, 9, 7, 13];
        const phiPhuPath = (this.isDuongDon !== false) ? PHI_PHU_DUONG : PHI_PHU_AM;
        const phiPhuIdx = phiPhuPath[ppStepIdx];
        
        // 4. Xích Kỳ: (Kỷ Dư + 1) % 40 % 4, khởi Hợi->Thân->Tị->Dần
        const r40_xk = (kVal + 1) % 40;
        const r4_xk = (r40_xk % 4) || 4;
        const XICH_KY_PATH = [4, 0, 12, 8];
        const xkIdx = XICH_KY_PATH[r4_xk - 1];
        
        // 5. Hắc Kỳ: (Kỷ Dư + 25) % 36 / 3 + 1, khởi Hợi nghịch 12 địa chi
        const r36_hk = (kVal + 25) % 36;
        const P_hk = Math.floor(r36_hk / 3) + 1;
        const HAC_KY_PATH = [4, 2, 1, 0, 14, 13, 12, 10, 9, 8, 6, 5];
        const hkIdx = HAC_KY_PATH[(P_hk - 1) % 12];
        
        return [
            { thanIdx: tuThanIdx, name: "Tứ Thần", class: "tu-than" },
            { thanIdx: thienAtIdx, name: "Thiên Ất", class: "tu-than" },
            { thanIdx: diaAtIdx, name: "Địa Ất", class: "tu-than" },
            { thanIdx: trucPhuIdx, name: "Trực Phù", class: "tu-than" },
            { thanIdx: tlIdx, name: "Thanh Long (Cờ Xanh)", class: "tu-than" },
            { thanIdx: taIdx, name: "Thái Âm", class: "tu-than" },
            { thanIdx: phiPhuIdx, name: "Phi Phù", class: "tu-than" },
            { thanIdx: xkIdx, name: "Xích Kỳ (Cờ Đỏ)", class: "co-khac" },
            { thanIdx: hkIdx, name: "Hắc Kỳ (Cờ Đen)", class: "co-khac" }
        ];
    }

    // ------ NHÓM CỬU TINH (VĂN XƯƠNG & TRỰC PHÙ) ------
    calcCuuTinh() {
        const res = [];
        const CUNG_TO_THAN_IDX = [-1, 3, 13, 7, 9, -1, 1, 15, 5, 11];

        // 1. Cửu Tinh Trực Phù (900/90/10 năm, Lục Can -> Cung Gốc)
        const TP_SAO_NAMES = ["Thiên Bồng", "Thiên Nhuế", "Thiên Xung", "Thiên Phụ", "Thiên Cầm", "Thiên Tâm", "Thiên Trụ", "Thiên Nhậm", "Thiên Ương"];
        const CAN_TO_CUNG_TP = { 0: 1, 1: 9, 2: 8, 3: 7, 4: 1, 5: 2, 6: 3, 7: 4, 8: 5, 9: 6 };
        const r900_tp = (this.tueTich % 900) % 90;
        const q_tp = Math.floor(r900_tp / 10) + 1;
        const start_tp = CAN_TO_CUNG_TP[this.namCanIdx] || 1;
        for (let i = 0; i < 9; i++) {
            const starIdx = (q_tp - 1 + i) % 9;
            const cungNum = (start_tp - 1 + i) % 9 + 1;
            res.push({
                thanIdx: CUNG_TO_THAN_IDX[cungNum],
                name: TP_SAO_NAMES[starIdx] + " (TP)",
                class: "truc-phu",
                unique: 'TP_' + TP_SAO_NAMES[starIdx]
            });
        }
        
        // 2. Cửu Tinh Văn Xương (270/30 năm, Can năm -> Cung Gốc)
        const VX_SAO_NAMES = ["Văn Xương", "Huyền Phượng", "Minh Duy", "Âm Đức", "Chiêu Dao", "Hoa Minh", "Huyền Vũ", "Huyền Minh", "Cưu Minh"];
        const CAN_TO_CUNG_VX = { 0: 3, 1: 4, 2: 9, 3: 2, 4: 5, 5: 5, 6: 7, 7: 6, 8: 1, 9: 8 };
        const r270_vx = this.tueTich % 270;
        const q_vx = Math.floor(r270_vx / 30) + 1;
        const start_vx = CAN_TO_CUNG_VX[this.namCanIdx] || 1;
        for (let i = 0; i < 9; i++) {
            const starIdx = (q_vx - 1 + i) % 9;
            const cungNum = (start_vx - 1 + i) % 9 + 1;
            res.push({
                thanIdx: CUNG_TO_THAN_IDX[cungNum],
                name: VX_SAO_NAMES[starIdx] + " (VX)",
                class: "van-xuong-9"
            });
        }
        
        return res;
    }
    
    // ------ NHÓM QUÝ THẦN & KHÁC ------
    calcOtherStars() {
        const res = [];
        const CUNG_TO_THAN_IDX = [-1, 5, 15, 9, 11, -1, 3, 1, 7, 13];
        
        // --- CÁC SAO PHỤ ---
        // Helper đếm bước lưu toán
        const countSteps = (startIdx, steps, pauseArr) => {
            let current = startIdx;
            let stepCount = 1;
            if (steps <= 1) return current;
            let safety = 0;
            while (safety < 100) {
                safety++;
                if (pauseArr.includes(current)) {
                    stepCount++;
                    if (stepCount >= steps) return current;
                }
                current = (current + 1) % 16;
                stepCount++;
                if (stepCount >= steps) return current;
            }
            return current;
        };

        const kVal = this.kyDu !== undefined ? this.kyDu : (this.tueTich % 360);
        const isDuong = this.isDuongDon !== false;

        // 1. Thiên Tôn (dư mod 4, Dương: Khảm->Đoài->Ly->Chấn, Âm: Chấn->Ly->Đoài->Khảm)
        const r4 = (kVal % 4) || 4;
        const THIEN_TON_DUONG = [5, 1, 13, 9];
        const THIEN_TON_AM = [9, 13, 1, 5];
        const ttonIdx = (isDuong ? THIEN_TON_DUONG : THIEN_TON_AM)[r4 - 1];
        
        // 2. Thiên Hoàng (dư mod 20, Dương khởi Thân lưu 2 toán ở 4 góc, Âm khởi Dần lưu 2 toán ở 4 góc)
        const r20 = (kVal % 20) || 20;
        const THIEN_HOANG_DUONG = [0, 1, 2, 3, 3, 4, 5, 6, 7, 7, 8, 9, 10, 11, 11, 12, 13, 14, 15, 15];
        const THIEN_HOANG_AM = [8, 7, 7, 6, 5, 4, 3, 3, 2, 1, 0, 15, 15, 14, 13, 12, 11, 11, 10, 9];
        const thoangIdx = (isDuong ? THIEN_HOANG_DUONG : THIEN_HOANG_AM)[r20 - 1];
        
        // 3. Thiên Thời (dư mod 12, Dương khởi Dần thuận 12 chi, Âm khởi Thân nghịch 12 chi)
        const r12 = (kVal % 12) || 12;
        const THIEN_THOI_DUONG = [8, 9, 10, 12, 13, 14, 0, 1, 2, 4, 5, 6];
        const THIEN_THOI_AM = [0, 14, 13, 12, 10, 9, 8, 6, 5, 4, 2, 1];
        const tthoiIdx = (isDuong ? THIEN_THOI_DUONG : THIEN_THOI_AM)[r12 - 1];
        
        // Đế Phù (chia 20, khởi Tuất đi thuận, lưu 2 toán ở 4 chính: Tý, Mão, Ngọ, Dậu)
        const dephuR = kVal % 20 || 20;
        const dephuIdx = countSteps(2, dephuR, [5, 9, 13, 1]); // Tuất=2
        
        // 4. Phi Điểu (dư mod 9, Dương khởi Càn thuận 9 cung, Âm khởi Tốn nghịch 9 cung)
        const r9 = (kVal % 9) || 9;
        const PHI_DIEU_DUONG = [3, 13, 7, 9, -1, 1, 15, 5, 11];
        const PHI_DIEU_AM = [11, 5, 15, 1, -1, 9, 7, 13, 3];
        const pdIdx = (isDuong ? PHI_DIEU_DUONG : PHI_DIEU_AM)[r9 - 1];
        
        // 5. Ngũ Hành (dư mod 5, Dương: Càn->Khảm->Cấn->Tốn->Khôn, Âm: Tốn->Ly->Khôn->Càn->Cấn)
        const r5_nh = (kVal % 5) || 5;
        const NGU_HANH_DUONG = [3, 5, 7, 11, 15];
        const NGU_HANH_AM = [11, 13, 15, 3, 7];
        const nhanhIdx = (isDuong ? NGU_HANH_DUONG : NGU_HANH_AM)[r5_nh - 1];
        
        // Dùng chung dư mod 9 cho 3 sao Phong: Tam Phong, Ngũ Phong, Bát Phong
        const r9_phong = (kVal % 9) || 9;
        
        // 6. Tam Phong (dư mod 9, Dương: Cấn->Khôn->Ly->Đoài->Càn->Trung->Tốn->Chấn->Khảm)
        const TAM_PHONG_DUONG = [7, 15, 13, 1, 3, -1, 11, 9, 5];
        const TAM_PHONG_AM = [15, 7, 5, 9, 11, -1, 3, 1, 13];
        const tphongIdx = (isDuong ? TAM_PHONG_DUONG : TAM_PHONG_AM)[r9_phong - 1];
        
        // 7. Ngũ Phong (dư mod 9, Dương: Càn->Cấn->Trung->Khôn->Tốn->Ly->Chấn->Đoài->Khảm)
        const NGU_PHONG_DUONG = [3, 7, -1, 15, 11, 13, 9, 1, 5];
        const NGU_PHONG_AM = [15, 7, 5, 9, 11, -1, 3, 1, 13];
        const ngphongIdx = (isDuong ? NGU_PHONG_DUONG : NGU_PHONG_AM)[r9_phong - 1];
        
        // 8. Bát Phong (dư mod 9, Dương: Ly->Cấn->Chấn->Trung->Đoài->Khôn->Khảm->Tốn->Càn)
        const BAT_PHONG_DUONG = [13, 7, 9, -1, 1, 15, 5, 11, 3];
        const BAT_PHONG_AM = [5, 15, 1, -1, 9, 7, 13, 3, 11];
        const bphongIdx = (isDuong ? BAT_PHONG_DUONG : BAT_PHONG_AM)[r9_phong - 1];

        res.push(
            { thanIdx: ttonIdx, name: "Thiên Tôn", class: "other-stars" },
            { thanIdx: thoangIdx, name: "Thiên Hoàng", class: "other-stars" },
            { thanIdx: tthoiIdx, name: "Thiên Thời", class: "other-stars" },
            { thanIdx: dephuIdx, name: "Đế Phù", class: "other-stars" },
            { thanIdx: pdIdx, name: "Phi Điểu", class: "other-stars" },
            { thanIdx: nhanhIdx, name: "Ngũ Hành", class: "other-stars" },
            { thanIdx: tphongIdx, name: "Tam Phong", class: "other-stars" },
            { thanIdx: ngphongIdx, name: "Ngũ Phong", class: "other-stars" },
            { thanIdx: bphongIdx, name: "Bát Phong", class: "other-stars" }
        );

        // --- QUÝ THẦN (9 SAO QUÝ THẦN: Nhập Trung Cung, bay lùi 8 cung xung quanh) ---
        const QT_SAO_NAMES = ["Thái Nhất", "Thiên Hoàng", "Thái Âm", "Hàm Trì", "Thanh Long", "Thiên Phù", "Chiêu Dao", "Hiên Viên", "Nhiếp Đề"];
        const QT_PATH_8 = [3, 1, 7, 13, 5, 15, 9, 11]; // Kiền, Đoài, Cấn, Ly, Khảm, Khôn, Chấn, Tốn
        const r_qt = (kVal + 3) % 9 || 9;

        let stIdx = r_qt - 1; // 0-based index of star
        // Trung Cung
        res.push({
            thanIdx: -1,
            name: QT_SAO_NAMES[stIdx] + " (QT)",
            class: "quy-than",
            unique: 'QT_' + QT_SAO_NAMES[stIdx]
        });

        // Bay lùi 8 cung
        for (let i = 0; i < 8; i++) {
            stIdx = (stIdx - 1 + 9) % 9;
            res.push({
                thanIdx: QT_PATH_8[i],
                name: QT_SAO_NAMES[stIdx] + " (QT)",
                class: "quy-than",
                unique: 'QT_' + QT_SAO_NAMES[stIdx]
            });
        }
        
        return res;
    }

    getAllStars() {
        const thaiAt = this.calcThaiAt();
        const vanXuong = this.calcVanXuong();
        const keThan = this.calcKeThan();
        const thaiTueIdx = (this.tuTru && this.tuTru.year && this.tuTru.year.chiIdx !== undefined) ? CHI_TO_THAN_IDX[this.tuTru.year.chiIdx] : 13;
        const keDinh = this.calcKeDinh(thaiTueIdx, vanXuong.thanIdx);
        const thuyKich = this.calcThuyKich(vanXuong.thanIdx, keThan.thanIdx);
        const tuongStars = this.calcDaiTuongAndThamTuong(thaiAt.thanIdx, vanXuong.thanIdx, thuyKich.thanIdx);
        
        const all = [
            thaiAt, vanXuong, keThan, keDinh, thuyKich,
            ...tuongStars,
            ...this.calcCoPhucDu(),
            ...this.calcTuThanKy(),
            ...this.calcCuuTinh(),
            ...this.calcOtherStars()
        ];
        
        // Populate Placement Map
        const placement = { "trung_cung": [] };
        THAP_LUC_THAN.forEach(t => placement[t.id] = []);
        all.forEach(s => {
            if (s.thanIdx === -1) placement["trung_cung"].push(s);
            else if (THAP_LUC_THAN[s.thanIdx]) placement[THAP_LUC_THAN[s.thanIdx].id].push(s);
        });
        
        return {
            placement, 
            flat: all, 
            core: { taIdx: thaiAt.thanIdx, vxIdx: vanXuong.thanIdx, tkIdx: thuyKich.thanIdx, ctIdx: tuongStars[0].thanIdx, ktIdx: tuongStars[1].thanIdx }
        };
    }
}


// ==========================================
// 3. MODE IMPLEMENTATIONS
// ==========================================
function luanDoanNguHanh(chuElement, khachElement) {
    const KHAC = { moc: "tho", hoa: "kim", tho: "thuy", kim: "moc", thuy: "hoa" };
    const SINH = { moc: "hoa", hoa: "tho", tho: "kim", kim: "thuy", thuy: "moc" };
    if (KHAC[chuElement] === khachElement) return "CHỦ THẮNG — Văn Xương khắc chế Thủy Kích.";
    if (KHAC[khachElement] === chuElement) return "KHÁCH THẮNG — Thủy Kích khắc chế Văn Xương.";
    if (SINH[chuElement] === khachElement || SINH[khachElement] === chuElement) return "HÒA HỢP — Chủ Khách tương sinh.";
    if (chuElement === khachElement) return "GIẰNG CO — Đồng hành.";
    return "Cần xét thêm vị trí Đại Tướng.";
}

class TueKeEngine {
    constructor(year, month, day, hour) {
        this.tuTru = getTuTru(year, month, day, hour);
        this.tueTich = THUONG_CO_EPOCH + year;
        this.namCanIdx = this.tuTru.year.canIdx;
    }
    getEngine(offset = 0) {
        const t = this.tueTich + offset;
        return new ThaiAtBaseEngine(t, t % 360, true, this.namCanIdx, this.tuTru);
    }
    getMetadata() {
        return { name: "Tuế Kể (Lập Quẻ Năm)", don: "Dương Độn", cucNum: this.getEngine(0).cucNum };
    }
}

class NguyetKeEngine {
    constructor(year, month, day, hour) {
        this.tuTru = getTuTru(year, month, day, hour);
        this.namCanIdx = this.tuTru.year.canIdx;

        // 1. Vòng Kỷ Dư Tháng (Kỷ Dư Nguyệt Kể):
        // Lùi về Tiết Đông Chí gần nhất (thường ở tháng 12 năm trước nếu ngày/tháng xem trước ngày 21/12)
        let dongChiYear = year;
        if (month < 12 || (month === 12 && day < 21)) {
            dongChiYear = year - 1;
        }

        // Kỷ Dư Năm chứa tiết Đông Chí gần nhất
        const tueTichDongChi = THUONG_CO_EPOCH + dongChiYear;
        const kyDuNam = tueTichDongChi % 360 || 360;

        // Chi tháng Tứ Trụ chính xác theo Tiết Khí (Tháng Tý chứa Đông Chí = 0, Sửu = 1, Dần = 2, ..., Hợi = 11)
        const thangChiIdx = (this.tuTru && this.tuTru.month) ? this.tuTru.month.chiIdx : ((month + 1) % 12);
        
        // Số tháng đếm từ Tiết Đông Chí (Tháng Tý)
        const soThangTuDongChi = (thangChiIdx - 0 + 12) % 12;

        // Tích Tháng = (kyDuNam - 1) * 12 + soThangTuDongChi + 2 (2 tháng Thiên Chính & Địa Chính Tý, Sửu)
        this.tichThang = (kyDuNam - 1) * 12 + soThangTuDongChi + 2;

        let kyDuThang = this.tichThang % 360;
        if (kyDuThang === 0) kyDuThang = 360;
        this.kyDu = kyDuThang;

        // 2. Định Âm Cục và Dương Cục:
        // Nguyệt Cục luôn đồng bộ với thuộc tính Tuế Cục (Can năm Dương -> Dương Độn, Can năm Âm -> Âm Độn)
        this.isDuongDon = (this.namCanIdx % 2 === 0);

        this.tueTich = this.tichThang;
        this.tueTichThuongCo = tueTichDongChi;
    }
    getEngine(offset = 0) {
        const t = this.tichThang + offset;
        let k = t % 360;
        if (k === 0) k = 360;
        return new RealNguyetKeEngine(t, k, this.isDuongDon, this.namCanIdx, this.tueTichThuongCo, this.tuTru);
    }
    getMetadata() {
        const donStr = this.isDuongDon ? "Dương Độn" : "Âm Độn";
        return { name: "Nguyệt Kể (Lập Quẻ Tháng)", don: donStr, cucNum: this.getEngine(0).cucNum };
    }
}

class NhatKeEngine {
    constructor(year, month, day, hour) {
        this.tuTru = getTuTru(year, month, day, hour);
        
        const currentJD = getCanChiDay(year, month, day).jdInt || 0;
        this.tichNhat = currentJD - 11 + 60000000;
        
        // MỐC KHỞI: Số ngày đếm từ ngày Giáp Tý đầu tiên sau tiết Đông Chí của năm trước
        let dongChiYear = year;
        if (month < 12 || (month === 12 && day < 21)) dongChiYear = year - 1;
        
        const dongChiJD = Math.round(getJulianDay(dongChiYear, 12, 22, 12, 0));
        
        let giapTyJD = dongChiJD;
        let safety1 = 0;
        while (giapTyJD % 60 !== 11 && safety1 < 120) {
            giapTyJD++;
            safety1++;
        }
        
        this.soNgayTuGiapTy = currentJD - giapTyJD;
        if (this.soNgayTuGiapTy < 0 || isNaN(this.soNgayTuGiapTy)) {
            dongChiYear--;
            const prevDongChiJD = Math.round(getJulianDay(dongChiYear, 12, 22, 12, 0));
            giapTyJD = prevDongChiJD;
            let safety2 = 0;
            while (giapTyJD % 60 !== 11 && safety2 < 120) {
                giapTyJD++;
                safety2++;
            }
            this.soNgayTuGiapTy = currentJD - giapTyJD;
        }
        if (isNaN(this.soNgayTuGiapTy) || this.soNgayTuGiapTy < 1) {
            this.soNgayTuGiapTy = 1;
        }

        // Âm Độn / Dương Độn cho Nhật Kể:
        // Từ Đông Chí (21/12) đến trước Hạ Chí (21/6) là Dương Độn, sau Hạ Chí là Âm Độn
        this.isDuongDon = true;
        if ((month > 6 && month < 12) || (month === 6 && day >= 21) || (month === 12 && day < 21)) {
            this.isDuongDon = false;
        }

        this.namCanIdx = this.tuTru.year.canIdx;
        this.tueTich = this.soNgayTuGiapTy;
        this.kyDu = (this.soNgayTuGiapTy % 360) || 360;
    }
    getEngine(offset = 0) {
        const soNgay = this.soNgayTuGiapTy + offset;
        let kyDuNgay = (soNgay % 360) || 360;
        return new RealNhatKeEngine(soNgay, kyDuNgay, this.isDuongDon, this.namCanIdx, this.tichNhat, soNgay, this.tuTru);
    }
    getMetadata() {
        const donStr = this.isDuongDon ? "Dương Độn" : "Âm Độn";
        return { name: "Nhật Kể (Lập Quẻ Ngày)", don: donStr, cucNum: (this.soNgayTuGiapTy % 72) || 72 };
    }
}

class ThoiKeEngine {
    constructor(year, month, day, hour) {
        this.tuTru = getTuTru(year, month, day, hour);
        
        const currentJD = getCanChiDay(year, month, day).jdInt || 0;
        const gioChiNum = this.tuTru.hour.chiIdx + 1; // 1=Tý, 2=Sửu... 12=Hợi
        
        // 1. Phân định Âm Cục và Dương Cục theo Tiết Khí:
        // Dương Cục: Sau tiết Đông Chí (21/12) đến trước Hạ Chí (21/6)
        // Âm Cục: Sau tiết Hạ Chí (21/6) đến trước Đông Chí (21/12)
        let isDuongDon = true;
        if ((month > 6 && month < 12) || (month === 6 && day >= 21) || (month === 12 && day < 21)) {
            isDuongDon = false;
        }
        this.isDuongDon = isDuongDon;

        // 2. Mốc khởi tính Vòng Kỷ Dư Giờ: Ngày Giáp Tý hoặc Giáp Ngọ gần nhất
        // Giáp Tý: JD % 60 === 11, Giáp Ngọ: JD % 60 === 41
        let gtgnJD = currentJD;
        let safety3 = 0;
        while ((gtgnJD % 60 !== 11 && gtgnJD % 60 !== 41) && safety3 < 120) {
            gtgnJD--;
            safety3++;
        }
        if (isNaN(gtgnJD)) gtgnJD = currentJD;

        // Số ngày D đếm từ mốc Giáp Tý/Giáp Ngọ đến ngày cầu việc
        let numDays = currentJD - gtgnJD + 1; // 1-indexed
        if (isNaN(numDays) || numDays < 1) numDays = 1;

        // Tích Giờ = (D - 1) * 12 + gioChiNum
        this.tichGio = (numDays - 1) * 12 + gioChiNum;

        // Vòng Kỷ Dư Giờ = tichGio % 360
        let kyDuGio = this.tichGio % 360;
        if (kyDuGio === 0) kyDuGio = 360;
        this.kyDu = kyDuGio;

        this.namCanIdx = this.tuTru.year.canIdx;
        this.tueTich = this.tichGio;
    }

    getEngine(offset = 0) {
        const tichCurrent = this.tichGio + offset;
        let kyDuCurrent = tichCurrent % 360;
        if (kyDuCurrent === 0) kyDuCurrent = 360;
        return new RealThoiKeEngine(tichCurrent, kyDuCurrent, this.isDuongDon, this.namCanIdx, this.tichGio, this.tuTru);
    }

    getMetadata() {
        const donStr = this.isDuongDon ? "Dương Độn" : "Âm Độn";
        return { name: "Thời Kể (Lập Quẻ Giờ)", don: donStr, cucNum: (this.tichGio % 72) || 72 };
    }
}

// ==========================================
// 4. MAIN DISPATCHER & TIME TRAVEL
// ==========================================
function calculateThaiAtChart(mode, year, month, day, hour) {
    // Mode Bypass for Dich & Menh
    if (mode === "dich") return calculateQueDich(year, month, day, hour);
    if (mode === "menh") return calculateNhanMenh(year, month, day, hour);
    
    let factory;
    if (mode === "tue") factory = new TueKeEngine(year, month, day, hour);
    else if (mode === "nguyet") factory = new NguyetKeEngine(year, month, day, hour);
    else if (mode === "nhat") factory = new NhatKeEngine(year, month, day, hour);
    else factory = new ThoiKeEngine(year, month, day, hour);
    
    const engCurrent = factory.getEngine(0);
    const engNext = factory.getEngine(1);
    
    const currRes = engCurrent.getAllStars();
    const nextRes = engNext.getAllStars();
    
    // So sánh sự khác biệt (Time Travel Diff)
    const movingStars = [];
    const currFlat = currRes.flat;
    const nextFlat = nextRes.flat;
    
    for (let i = 0; i < currFlat.length; i++) {
        const s1 = currFlat[i];
        if (!s1) continue;
        const s2 = nextFlat.find(s => s && s.name === s1.name);
        if (s2 && s1.thanIdx !== s2.thanIdx) {
            let trueName = s1.name;
            if (s1.name.includes("Thái Ất (Cung")) trueName = "Thái Ất";
            movingStars.push({
                name: trueName,
                currCungName: getThanName(s1.thanIdx),
                nextCungName: getThanName(s2.thanIdx)
            });
        }
    }
    
    const meta = factory.getMetadata();
    const tuTru = factory.tuTru;
    const solarTerm = factory.solarTerm || getExactSolarTerm(year, month, day, hour);
    
    const vxEl = engCurrent.calcVanXuong().thanIdx !== -1 ? THAP_LUC_THAN[engCurrent.calcVanXuong().thanIdx].elementKey : "tho";
    const tkEl = currRes.core.tkIdx !== -1 ? THAP_LUC_THAN[currRes.core.tkIdx].elementKey : "tho";
    
    // Cửa Trực Sự (Bát Môn) - Chu kỳ 240 năm, 30 năm 1 cung
    const batMonStep = Math.floor((factory.tueTich % 240) / 30);
    const batMonStr = BAT_MON[batMonStep % 8];
    
    // Sao Trực Sự (Cửu Tinh) - Chu kỳ 90 năm, 10 năm 1 sao
    const cuuTinhStep = Math.floor((factory.tueTich % 90) / 10);
    const cuuTinhStr = CUU_TINH[cuuTinhStep % 9];
    
    // Export Toán numbers & Kế values for UI
    let toanChuVal = 1;
    let toanChuRawVal = 1;
    let toanKhachVal = 1;
    let toanKhachRawVal = 1;
    for (const key in currRes.placement) {
        if (!currRes.placement[key]) continue;
        const sC = currRes.placement[key].find(s => s.name.includes('Đại Tướng Chủ'));
        if (sC) {
            const m = sC.name.match(/Toán (\d+)/);
            if (m) toanChuVal = parseInt(m[1]);
            if (sC.rawToan !== undefined) toanChuRawVal = sC.rawToan;
            else toanChuRawVal = toanChuVal;
        }
        const sK = currRes.placement[key].find(s => s.name.includes('Đại Tướng Khách'));
        if (sK) {
            const m = sK.name.match(/Toán (\d+)/);
            if (m) toanKhachVal = parseInt(m[1]);
            if (sK.rawToan !== undefined) toanKhachRawVal = sK.rawToan;
            else toanKhachRawVal = toanKhachVal;
        }
    }
    
    // Gọi module Luận Đoán cho tất cả các chế độ
    let luanDoanData = null;
    if (typeof ThaiAtLuanDoan !== 'undefined') {
        const fullTue = factory.tichNhat || factory.tueTichThuongCo || 0; // Tích Nhật hoặc Tuế Tích Thượng Cổ
        const namCanIdx = factory.namCanIdx || factory.tuTru.year.canIdx || 0;
        const lunarMonth = (factory.tuTru.month && factory.tuTru.month.chiIdx !== undefined) ? ((factory.tuTru.month.chiIdx + 10) % 12 + 1) : 1;
        const isDuongDon = factory.isDuongDon !== undefined ? factory.isDuongDon : true;
        const kyDuVal = factory.kyDu !== undefined ? factory.kyDu : (factory.tueTich % 360);
        const ld = new ThaiAtLuanDoan(factory.tueTich, namCanIdx, isDuongDon, mode, fullTue, lunarMonth, kyDuVal);
        luanDoanData = ld.generateReport(toanChuVal, toanKhachVal, currRes.core.tkIdx, currRes.core.taIdx);
    }
    
    // Toán Định (Tính từ Kế Định đến Thái Ất)
    const MAIN_PALACE_BIET_SO = { 3: 1, 13: 2, 7: 3, 9: 4, 1: 6, 15: 7, 5: 8, 11: 9 };
    const GIAN_THAN_IDXS = [0, 2, 4, 6, 8, 10, 12, 14];
    const calcToanFunc = (startIdx, targetIdx) => {
        if (startIdx === targetIdx) return 1;
        let sum = 0;
        if (GIAN_THAN_IDXS.includes(startIdx)) sum += 1;
        else if (MAIN_PALACE_BIET_SO[startIdx] !== undefined) sum += MAIN_PALACE_BIET_SO[startIdx];
        let p = (startIdx + 1) % 16;
        while (p !== targetIdx) {
            if (MAIN_PALACE_BIET_SO[p] !== undefined) sum += MAIN_PALACE_BIET_SO[p];
            p = (p + 1) % 16;
        }
        return sum;
    };

    const keDinhStar = currRes.flat.find(s => s.name === "Kế Định");
    const keDinhIdx = keDinhStar ? keDinhStar.thanIdx : 4;
    const toanDinhRawVal = calcToanFunc(keDinhIdx, currRes.core.taIdx);
    const toanDinhVal = toanDinhRawVal % 10 || 10;
    
    // Kế Đại, Kế Tiểu, Kế Định
    const keDaiVal = factory.tichNhat || factory.tueTichThuongCo || factory.tueTich || 0;
    const keTieuVal = factory.kyDu !== undefined ? factory.kyDu : (factory.tueTich % 360);
    const keDinhValStr = (keDinhIdx !== -1 ? getThanName(keDinhIdx) : "Trung Cung");
    
    // Dynamic Bát Hung Evaluation
    const evalBatHung = () => {
        const activeHung = [];
        const taIdx = currRes.core ? currRes.core.taIdx : -1;
        const tkIdx = currRes.core ? currRes.core.tkIdx : -1;
        const ctIdx = currRes.core ? currRes.core.ctIdx : -1;
        const ktIdx = currRes.core ? currRes.core.ktIdx : -1;

        // 1. Kích: Thái Ất gặp Thủy Kích đồng cung
        if (taIdx !== -1 && taIdx === tkIdx) {
            activeHung.push("Kích (Thái Ất gặp Thủy Kích đồng cung)");
        }

        // 2. Yểm: Thái Ất lâm cung gặp Hắc Kỳ hoặc Xích Kỳ
        if (taIdx !== -1) {
            const taPalaceName = THAP_LUC_THAN[taIdx] ? THAP_LUC_THAN[taIdx].id : "";
            const taStars = currRes.placement[taPalaceName] || [];
            if (taStars.some(s => s.name.includes("Hắc Kỳ") || s.name.includes("Xích Kỳ"))) {
                activeHung.push("Yểm (Thái Ất bị hung tinh chế ngự)");
            }
        }

        // 3. Đối: Thái Ất và Thủy Kích ở 2 cung đối nhau
        if (taIdx !== -1 && tkIdx !== -1 && Math.abs(taIdx - tkIdx) === 8) {
            activeHung.push("Đối (Thái Ất đối xung Thủy Kích)");
        }

        // 4. Chấp Đề: Đại Tướng Chủ và Đại Tướng Khách ở 2 cung đối nhau
        if (ctIdx !== -1 && ktIdx !== -1 && Math.abs(ctIdx - ktIdx) === 8) {
            activeHung.push("Chấp Đề (Chủ Khách đối thế)");
        }

        // 5. Tù: Thái Ất ở Tý (5), Dần (8), Mão (9), Dậu (1) gặp hung tinh
        if ([5, 8, 9, 1].includes(taIdx)) {
            const taPalaceName = THAP_LUC_THAN[taIdx] ? THAP_LUC_THAN[taIdx].id : "";
            const taStars = currRes.placement[taPalaceName] || [];
            if (taStars.length > 2) {
                activeHung.push("Tù (Thái Ất rơi vào hãm địa)");
            }
        }

        if (activeHung.length > 0) return activeHung.join("; ");
        return "Không thuộc Bát Hung.";
    };

    return {
        modeName: meta.name,
        tuTru,
        solarTerm: solarTerm.name,
        donCucName: `${meta.don} — Cục ${meta.cucNum}`,
        batMon: batMonStr,
        cuuTinh: cuuTinhStr,
        toanChu: toanChuVal,
        toanChuGoc: toanChuRawVal,
        toanKhach: toanKhachVal,
        toanKhachGoc: toanKhachRawVal,
        toanDinh: toanDinhVal,
        toanDinhGoc: toanDinhRawVal,
        keDai: keDaiVal,
        keTieu: keTieuVal,
        keDinh: keDinhValStr,
        placement: currRes.placement,
        batHung: evalBatHung(),
        verdict: luanDoanNguHanh(vxEl, tkEl),
        movingStars: movingStars,
        luanDoanData: luanDoanData
    };
}

const THAI_TUE_HEXAGRAMS_64 = [
    { num: 1,  name: "Bát Thuần Kiền", lines: [1, 1, 1, 1, 1, 1] },
    { num: 2,  name: "Bát Thuần Khôn", lines: [0, 0, 0, 0, 0, 0] },
    { num: 3,  name: "Thủy Lôi Truân", lines: [1, 0, 0, 0, 1, 0] },
    { num: 4,  name: "Sơn Thủy Mông", lines: [0, 1, 0, 0, 0, 1] },
    { num: 5,  name: "Thủy Thiên Nhu", lines: [1, 1, 1, 0, 1, 0] },
    { num: 6,  name: "Thiên Thủy Tụng", lines: [0, 1, 0, 1, 1, 1] },
    { num: 7,  name: "Địa Thủy Sư", lines: [0, 1, 0, 0, 0, 0] },
    { num: 8,  name: "Thủy Địa Tỷ", lines: [0, 0, 0, 0, 1, 0] },
    { num: 9,  name: "Phong Thiên Tiểu Súc", lines: [1, 1, 1, 0, 1, 1] },
    { num: 10, name: "Thiên Trạch Lý", lines: [1, 1, 0, 1, 1, 1] },
    { num: 11, name: "Địa Thiên Thái", lines: [1, 1, 1, 0, 0, 0] },
    { num: 12, name: "Thiên Địa Bĩ", lines: [0, 0, 0, 1, 1, 1] },
    { num: 13, name: "Thiên Hỏa Đồng Nhân", lines: [1, 0, 1, 1, 1, 1] },
    { num: 14, name: "Hỏa Thiên Đại Hữu", lines: [1, 1, 1, 1, 0, 1] },
    { num: 15, name: "Địa Sơn Khiêm", lines: [0, 0, 1, 0, 0, 0] },
    { num: 16, name: "Lôi Địa Dự", lines: [0, 0, 0, 1, 0, 0] },
    { num: 17, name: "Trạch Lôi Tùy", lines: [1, 0, 0, 1, 1, 0] },
    { num: 18, name: "Sơn Phong Cổ", lines: [0, 1, 1, 0, 0, 1] },
    { num: 19, name: "Địa Trạch Lâm", lines: [1, 1, 0, 0, 0, 0] },
    { num: 20, name: "Phong Địa Quan", lines: [0, 0, 0, 0, 1, 1] },
    { num: 21, name: "Hỏa Lôi Phệ Hạp", lines: [1, 0, 0, 1, 0, 1] },
    { num: 22, name: "Sơn Hỏa Bí", lines: [1, 0, 1, 0, 0, 1] },
    { num: 23, name: "Sơn Địa Bác", lines: [0, 0, 0, 0, 0, 1] },
    { num: 24, name: "Địa Lôi Phục", lines: [1, 0, 0, 0, 0, 0] },
    { num: 25, name: "Thiên Lôi Vô Vọng", lines: [1, 0, 0, 1, 1, 1] },
    { num: 26, name: "Sơn Thiên Đại Súc", lines: [1, 1, 1, 0, 0, 1] },
    { num: 27, name: "Sơn Lôi Di", lines: [1, 0, 0, 0, 0, 1] },
    { num: 28, name: "Trạch Phong Đại Quá", lines: [0, 1, 1, 1, 1, 0] },
    { num: 29, name: "Bát Thuần Khảm", lines: [0, 1, 0, 0, 1, 0] },
    { num: 30, name: "Bát Thuần Ly", lines: [1, 0, 1, 1, 0, 1] },
    { num: 31, name: "Trạch Sơn Hàm", lines: [0, 0, 1, 1, 1, 0] },
    { num: 32, name: "Lôi Phong Hằng", lines: [0, 1, 1, 1, 0, 0] },
    { num: 33, name: "Thiên Sơn Độn", lines: [0, 0, 1, 1, 1, 1] },
    { num: 34, name: "Lôi Thiên Đại Tráng", lines: [1, 1, 1, 1, 0, 0] },
    { num: 35, name: "Hỏa Địa Tấn", lines: [0, 0, 0, 1, 0, 1] },
    { num: 36, name: "Địa Hỏa Minh Di", lines: [1, 0, 1, 0, 0, 0] },
    { num: 37, name: "Phong Hỏa Gia Nhân", lines: [1, 0, 1, 0, 1, 1] },
    { num: 38, name: "Hỏa Trạch Khuê", lines: [1, 1, 0, 1, 0, 1] },
    { num: 39, name: "Thủy Sơn Kiển", lines: [0, 0, 1, 0, 1, 0] },
    { num: 40, name: "Lôi Thủy Giải", lines: [0, 1, 0, 1, 0, 0] },
    { num: 41, name: "Sơn Trạch Tổn", lines: [1, 1, 0, 0, 0, 1] },
    { num: 42, name: "Phong Lôi Ích", lines: [1, 0, 0, 0, 1, 1] },
    { num: 43, name: "Trạch Thiên Quải", lines: [1, 1, 1, 1, 1, 0] },
    { num: 44, name: "Thiên Phong Cấu", lines: [0, 1, 1, 1, 1, 1] },
    { num: 45, name: "Trạch Địa Tụy", lines: [0, 0, 0, 1, 1, 0] },
    { num: 46, name: "Địa Phong Thăng", lines: [0, 1, 1, 0, 0, 0] },
    { num: 47, name: "Trạch Thủy Khốn", lines: [0, 1, 0, 1, 1, 0] },
    { num: 48, name: "Thủy Phong Tỉnh", lines: [0, 1, 1, 0, 1, 0] },
    { num: 49, name: "Trạch Hỏa Cách", lines: [1, 0, 1, 1, 1, 0] },
    { num: 50, name: "Hỏa Phong Đỉnh", lines: [0, 1, 1, 1, 0, 1] },
    { num: 51, name: "Bát Thuần Chấn", lines: [1, 0, 0, 1, 0, 0] },
    { num: 52, name: "Bát Thuần Cấn", lines: [0, 0, 1, 0, 0, 1] },
    { num: 53, name: "Phong Sơn Tiệm", lines: [0, 0, 1, 0, 1, 1] },
    { num: 54, name: "Lôi Trạch Quy Muội", lines: [1, 1, 0, 1, 0, 0] },
    { num: 55, name: "Lôi Hỏa Phong", lines: [1, 0, 1, 1, 0, 0] },
    { num: 56, name: "Hỏa Sơn Lữ", lines: [0, 0, 1, 1, 0, 1] },
    { num: 57, name: "Bát Thuần Tốn", lines: [0, 1, 1, 0, 1, 1] },
    { num: 58, name: "Bát Thuần Đoài", lines: [1, 1, 0, 1, 1, 0] },
    { num: 59, name: "Phong Thủy Hoán", lines: [0, 1, 0, 0, 1, 1] },
    { num: 60, name: "Thủy Trạch Tiết", lines: [1, 1, 0, 0, 1, 0] },
    { num: 61, name: "Phong Trạch Trung Phu", lines: [1, 1, 0, 0, 1, 1] },
    { num: 62, name: "Lôi Sơn Tiểu Quá", lines: [0, 0, 1, 1, 0, 0] },
    { num: 63, name: "Thủy Hỏa Ký Tế", lines: [1, 0, 1, 0, 1, 0] },
    { num: 64, name: "Hỏa Thủy Vị Tế", lines: [0, 1, 0, 1, 0, 1] }
];

function calculateQueDich(year, month, day, hour) {
    const tuTru = getTuTru(year, month, day, hour);
    const solarTerm = getExactSolarTerm(year, month, day, hour);
    const tueTich = THUONG_CO_EPOCH + year;

    // 1. Quẻ Thái Tuế Lưu Niên Trực Quái: Tích Niên Thái Ất mod 64
    let queNum = tueTich % 64;
    if (queNum === 0) queNum = 64;
    const hexObj = THAI_TUE_HEXAGRAMS_64[queNum - 1];

    // 2. Hào Động theo Chi năm
    const yearChiIdx = tuTru.year.chiIdx; // 0=Tý, 1=Sửu, 2=Dần... 11=Hợi
    const yearChiNum = yearChiIdx + 1;    // 1..12
    const yearChiName = CHI_LIST_LOCAL[yearChiIdx];
    const isDuongYear = (yearChiIdx % 2 === 0);

    let haoDong = 1;
    let ruleText = "";
    if (isDuongYear) {
        // Năm Dương (Thân, Tý, Thìn, Dần, Ngọ, Tuất): Thăng lên các Hào Dương (1, 3, 5)
        const duongSeq = [1, 3, 5];
        haoDong = duongSeq[(yearChiNum - 1) % 3];
        ruleText = `Năm Dương (${yearChiName}): Đếm thăng lên Hào Dương (1 ➔ 3 ➔ 5), đếm ${yearChiNum} bước Chi năm ➔ Hào ${haoDong} Động.`;
    } else {
        // Năm Âm (Tị, Dậu, Sửu, Hợi, Mão, Mùi): Giáng xuống các Hào Âm (6, 4, 2)
        const amSeq = [6, 4, 2];
        haoDong = amSeq[(yearChiNum - 1) % 3];
        ruleText = `Năm Âm (${yearChiName}): Đếm giáng xuống Hào Âm (6 ➔ 4 ➔ 2), đếm ${yearChiNum} bước Chi năm ➔ Hào ${haoDong} Động.`;
    }

    const placement = { "trung_cung": [] };
    THAP_LUC_THAN.forEach(t => placement[t.id] = []);
    placement["kien"].push({ name: `Quẻ ${queNum}: ${hexObj.name}`, class: "thai-at" });
    placement["ngo"].push({ name: `Hào ${haoDong} Động`, class: "thuy-kich" });

    const thaiTueData = {
        queNum,
        hexName: hexObj.name,
        lines6: hexObj.lines,
        haoDong,
        yearChiName,
        isDuongYear,
        ruleText,
        tueTich
    };

    return {
        modeName: "Quẻ Thái Tuế Lưu Niên Trực Quái",
        tuTru,
        solarTerm: solarTerm.name,
        donCucName: `Quẻ thứ ${queNum}/64: ${hexObj.name} — Hào ${haoDong} Động`,
        batMon: `Hào ${haoDong}`,
        cuuTinh: hexObj.name,
        placement,
        batHung: "-",
        verdict: ruleText,
        movingStars: [],
        thaiTueData,
        luanDoanData: {
            daiTieuDu: null,
            thaiTueData
        }
    };
}

function calculateNhanMenh(year, month, day, hour) {
    const tuTru = getTuTru(year, month, day, hour);
    const solarTerm = getExactSolarTerm(year, month, day, hour);

    // CAN_NUMS: Giáp(11), Ất(11), Bính(9), Đinh(9), Mậu(15), Kỷ(15), Canh(13), Tân(13), Nhâm(7), Quý(7)
    const CAN_NUMS = [11, 11, 9, 9, 15, 15, 13, 13, 7, 7];
    // CHI_NUMS: Tý(7), Sửu(15), Dần(11), Mão(11), Thìn(15), Tị(9), Ngọ(9), Mùi(15), Thân(13), Dậu(13), Tuất(15), Hợi(7)
    const CHI_NUMS = [7, 15, 11, 11, 15, 9, 9, 15, 13, 13, 15, 7];

    const numNam   = CAN_NUMS[tuTru.year.canIdx]  + CHI_NUMS[tuTru.year.chiIdx];
    const numThang = CAN_NUMS[tuTru.month.canIdx] + CHI_NUMS[tuTru.month.chiIdx];
    const numNgay  = CAN_NUMS[tuTru.day.canIdx]   + CHI_NUMS[tuTru.day.chiIdx];
    const numGio   = CAN_NUMS[tuTru.hour.canIdx]  + CHI_NUMS[tuTru.hour.chiIdx];

    const sumTuTru = numNam + numThang + numNgay + numGio;
    const sumNgayGio = numNgay + numGio;

    // 1. Quẻ Vào Đời Lập Nghiệp: (sumTuTru + 55) % 64
    let queVaoDoiNum = (sumTuTru + 55) % 64;
    if (queVaoDoiNum === 0) queVaoDoiNum = 64;
    const hexVaoDoiObj = THAI_TUE_HEXAGRAMS_64[queVaoDoiNum - 1];

    // 2. Tìm Ngày Chịu Khí (Thai Nguyên): (sumNgayGio + 55) % 60
    let soHan = (sumNgayGio + 55) % 60;
    if (soHan === 0) soHan = 60;

    const CAN_NAMES_LOCAL = ["Giáp", "Ất", "Bính", "Đinh", "Mậu", "Kỷ", "Canh", "Tân", "Nhâm", "Quý"];
    const LUC_THAP_HOA_GIAP_LOCAL = [];
    for (let i = 0; i < 60; i++) {
        LUC_THAP_HOA_GIAP_LOCAL.push(`${CAN_NAMES_LOCAL[i % 10]} ${CHI_LIST_LOCAL[i % 12]}`);
    }

    let ngaySinhIdx = 0;
    for (let i = 0; i < 60; i++) {
        if (i % 10 === tuTru.day.canIdx && i % 12 === tuTru.day.chiIdx) {
            ngaySinhIdx = i;
            break;
        }
    }

    const thaiNguyenIdx = (ngaySinhIdx - soHan + 600) % 60;
    const thaiNguyenCanChi = LUC_THAP_HOA_GIAP_LOCAL[thaiNguyenIdx];
    const thaiNguyenChiIdx = thaiNguyenIdx % 12;
    const thaiNguyenChiName = CHI_LIST_LOCAL[thaiNguyenChiIdx];
    const thaiNguyenChiNum = thaiNguyenChiIdx + 1;
    const isDuongThai = (thaiNguyenChiIdx % 2 === 0);

    let haoDongVaoDoi = 1;
    let thaiNguyenRuleText = "";
    if (isDuongThai) {
        const duongSeq = [1, 3, 5];
        haoDongVaoDoi = duongSeq[(thaiNguyenChiNum - 1) % 3];
        thaiNguyenRuleText = `Ngày chịu khí ${thaiNguyenCanChi} (${thaiNguyenChiName} - Dương): Đếm thăng Hào Dương (1 ➔ 3 ➔ 5) ${thaiNguyenChiNum} bước ➔ Hào ${haoDongVaoDoi} Động.`;
    } else {
        const amSeq = [6, 4, 2];
        haoDongVaoDoi = amSeq[(thaiNguyenChiNum - 1) % 3];
        thaiNguyenRuleText = `Ngày chịu khí ${thaiNguyenCanChi} (${thaiNguyenChiName} - Âm): Đếm giáng Hào Âm (6 ➔ 4 ➔ 2) ${thaiNguyenChiNum} bước ➔ Hào ${haoDongVaoDoi} Động.`;
    }

    // 3. Quẻ Hạn Dựng Nghiệp (Biến quái từ Hào Động quẻ Vào Đời)
    const lines6Bien = [...hexVaoDoiObj.lines];
    lines6Bien[haoDongVaoDoi - 1] = lines6Bien[haoDongVaoDoi - 1] === 1 ? 0 : 1;

    const hexBienObj = THAI_TUE_HEXAGRAMS_64.find(h => 
        h.lines.every((val, idx) => val === lines6Bien[idx])
    ) || hexVaoDoiObj;

    // 4. Quẻ Lưu Niên (Quẻ Năm) theo tuổi mụ hiện tại
    const currentYear = new Date().getFullYear();
    const tuoiMu = Math.max(1, currentYear - year + 1);
    let queNamNum = (queVaoDoiNum + tuoiMu) % 64;
    if (queNamNum === 0) queNamNum = 64;
    const hexNamObj = THAI_TUE_HEXAGRAMS_64[queNamNum - 1];

    const nhanMenhData = {
        sumTuTru,
        sumNgayGio,
        queVaoDoiNum,
        hexVaoDoiName: hexVaoDoiObj.name,
        lines6VaoDoi: hexVaoDoiObj.lines,
        soHan,
        thaiNguyenCanChi,
        thaiNguyenChiName,
        isDuongThai,
        haoDongVaoDoi,
        thaiNguyenRuleText,
        queDungNghiepNum: hexBienObj.num,
        hexDungNghiepName: hexBienObj.name,
        lines6DungNghiep: hexBienObj.lines,
        tuoiMu,
        queNamNum,
        hexNamName: hexNamObj.name,
        lines6Nam: hexNamObj.lines
    };

    const placement = { "trung_cung": [] };
    THAP_LUC_THAN.forEach(t => placement[t.id] = []);
    placement["kien"].push({ name: `Vào Đời: ${hexVaoDoiObj.name}`, class: "thai-at" });
    placement["khon"].push({ name: `Dựng Nghiệp: ${hexBienObj.name}`, class: "van-xuong" });
    placement["ngo"].push({ name: `Hào ${haoDongVaoDoi} Động`, class: "thuy-kich" });

    return {
        modeName: "Bàn Nhân Mệnh",
        tuTru,
        solarTerm: solarTerm.name,
        donCucName: `Vào Đời: ${hexVaoDoiObj.name} ➔ Dựng Nghiệp: ${hexBienObj.name}`,
        batMon: `Hào ${haoDongVaoDoi}`,
        cuuTinh: `${hexVaoDoiObj.name}/${hexBienObj.name}`,
        placement,
        batHung: "-",
        verdict: thaiNguyenRuleText,
        movingStars: [],
        nhanMenhData,
        luanDoanData: {
            daiTieuDu: null,
            nhanMenhData
        }
    };
}
