/**
 * 🔒 [LOCKED & FROZEN ENGINE] - THÁI ẤT THẦN SỐ ENGINE V4.0
 * TOÀN BỘ CÔNG THỨC TOÁN HỌC & LOGIC ĐÃ ĐƯỢC KIỂM ĐỊNH CHUẨN XÁC VỚI 144 CỤC ÂM DƯƠNG.
 * TUYỆT ĐỐI KHÔNG SỬA ĐỔI HOẶC CAN THIỆP CÁC CÔNG THỨC VẬN HÀNH THẦN TINH, SỐ TOÁN VÀ BÁT MÔN BÊN DƯỚI.
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

function rotateArray(arr, indexToFront) {
    if (!arr || arr.length === 0) return [];
    const idx = ((indexToFront % arr.length) + arr.length) % arr.length;
    return arr.slice(idx).concat(arr.slice(0, idx));
}


// ==========================================
// 2. BASE CALCULATOR ENGINE
// ==========================================
class ThaiAtBaseEngine {
    constructor(tueTich, kyDu, isDuongDon, namCanIdx, tuTru, mode) {
        this.tueTich = tueTich;
        this.kyDu = kyDu;
        this.isDuongDon = isDuongDon;
        this.namCanIdx = namCanIdx;
        this.tuTru = tuTru;
        this.mode = mode || null;
        
        // Cục Số (72)
        this.kyDuNam = (this.tueTich % 360) || 360;
        this.nguyenNum = Math.floor((this.kyDuNam - 1) / 72) + 1;
        this.cucNum = (this.kyDuNam % 72) || 72;
        this.donCucName = (this.isDuongDon ? "Dương Độn" : "Âm Độn") + ` — Nguyên ${this.nguyenNum} Cục ${this.cucNum}`;    
        // Tích Trung Cổ Giáp Dần (Dành riêng cho Tuế Kể - Tam Cơ & Đại Du & Ngũ Phúc)
        const yearVal = this.tueTich > 10000000 ? (this.tueTich - THUONG_CO_EPOCH) : this.tueTich;
        this.tichTrungCo = yearVal + 12607;
    }
    
    // ------ NHÓM KỶ DƯ (MOD 360/24/18/12) ------
    calcThaiAt() {
        const cucNum = (this.cucNum || (this.kyDu % 72) || 72);
        const step = Math.floor(((cucNum - 1) % 24) / 3);
        const rem = ((cucNum - 1) % 3) + 1;

        const PATH_DUONG = [3, 13, 7, 9, 1, 15, 5, 11]; // Kiền, Ly, Cấn, Chấn, Đoài, Khôn, Khảm, Tốn
        const PATH_AM = [11, 5, 15, 1, 9, 7, 13, 3];    // Tốn, Khảm, Khôn, Đoài, Chấn, Cấn, Ly, Kiền
        const PATH_NAMES_DUONG = ["Kiền", "Ly", "Cấn", "Chấn", "Đoài", "Khôn", "Khảm", "Tốn"];
        const PATH_NAMES_AM = ["Tốn", "Khảm", "Khôn", "Đoài", "Chấn", "Cấn", "Ly", "Kiền"];

        const path = this.isDuongDon ? PATH_DUONG : PATH_AM;
        const namePath = this.isDuongDon ? PATH_NAMES_DUONG : PATH_NAMES_AM;
        const thanIdx = path[step % 8];
        const cungName = namePath[step % 8];
        const unitName = (this.mode === 'nguyet') ? 'tháng' : (this.mode === 'nhat') ? 'ngày' : (this.mode === 'thoi') ? 'giờ' : 'năm';

        return {
            thanIdx,
            cungName,
            soNamAnToa: rem,
            name: `Thái Ất (Cung ${cungName} - ${rem} ${unitName})`,
            class: "thai-at"
        };
    }
    
    calcVanXuong() {
        const cucNum = (this.cucNum || (this.kyDu % 72) || 72);
        const R = (cucNum % 18) || 18;
        let current = this.isDuongDon ? 0 : 8; // Dương: Thân(0), Âm: Dần(8)
        let stepCount = 1;
        const pauseArr = this.isDuongDon ? [3, 15] : [7, 11]; // Dương: Kiền(3),Khôn(15) vs Âm: Cấn(7),Tốn(11)
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
        // Dương độn: Khởi Dần (Chi Dần = 2), đi nghịch 12 địa chi
        // Âm độn: Khởi Thân (Chi Thân = 8), đi nghịch 12 địa chi
        const cucNum = (this.cucNum || (this.kyDu % 72) || 72);
        const startChiIdx = (this.isDuongDon !== false) ? 2 : 8; // Dần = 2, Thân = 8
        const r12 = (cucNum % 12) || 12;
        const targetChiIdx = (startChiIdx - (r12 - 1) + 120) % 12;
        const thanIdx = CHI_TO_THAN_IDX[targetChiIdx];
        return { thanIdx, name: "Kế Thần", class: "ke-than" };
    }

    calcKeDinh(thaiTueIdx, vanXuongIdx) {
        if (vanXuongIdx === undefined) return { thanIdx: 15, name: "Kế Định", class: "ke-dinh" };
        
        // Thái Tuế lấy trực tiếp theo Địa Chi của Cục (Cục 1 -> Tý, Cục 71 -> Tuất...)
        const cucChiIdx = ((this.cucNum || (this.kyDu % 72) || 72) - 1) % 12;
        const ttIdx = CHI_TO_THAN_IDX[cucChiIdx];
        
        // Lục Hợp Địa Chi: Tý(5)<->Sửu(6), Dần(8)<->Hợi(4), Mão(9)<->Tuất(2), Thìn(10)<->Dậu(1), Tị(12)<->Thân(0), Ngọ(13)<->Mùi(14)
        const THAN_HOP_MAP = { 5:6, 6:5, 8:4, 4:8, 9:2, 2:9, 10:1, 1:10, 12:0, 0:12, 13:14, 14:13 };
        const thanHopIdx = THAN_HOP_MAP[ttIdx] !== undefined ? THAN_HOP_MAP[ttIdx] : ttIdx;
        
        // Đếm từ Thần Hợp đến Văn Xương bao gồm 2 đầu
        const distInclusive = (vanXuongIdx - thanHopIdx + 16) % 16 + 1;
        
        // Khởi từ Thái Tuế đếm thuận 16 Thần Cung vừa đủ số ngôi bao gồm 2 đầu
        const thanIdx = (ttIdx + distInclusive - 1) % 16;
        return { thanIdx, name: "Kế Định", class: "ke-dinh" };
    }

    /**
     * Phân tích sâu Tam Tài Toán Pháp & Lý Luận Số Toán Âm Dương Hòa/Bất Hòa
     */
    static analyzeToanFull(rawToan, thanIdx, starType) {
        if (rawToan === undefined || rawToan === null) return null;
        
        const donVi = rawToan % 10;
        
        // 1. Tam Tài Toán Pháp
        const isVoThien = rawToan < 10; // Hàng đơn vị từ 1-9 (chưa quá 10)
        const isVoDia = (donVi > 0 && donVi < 5); // Hàng đơn vị < 5 (1, 2, 3, 4)
        const isVoNhan = (donVi === 0); // Hàng đơn vị = 0 (10, 20, 30, 40)
        
        const tamTaiBadges = [];
        if (isVoThien) tamTaiBadges.push("Vô Thiên");
        if (isVoDia) tamTaiBadges.push("Vô Địa");
        if (isVoNhan) tamTaiBadges.push("Vô Nhân");
        
        // 2. Cung Dương / Cung Âm
        const DUONG_PALACES = [7, 9, 11, 13];
        const AM_PALACES = [15, 1, 3, 5];
        const GIAN_THAN_PALACES = [0, 2, 4, 6, 8, 10, 12, 14];
        
        const isDuongPalace = DUONG_PALACES.includes(thanIdx);
        const isAmPalace = AM_PALACES.includes(thanIdx);
        const isGianThanPalace = GIAN_THAN_PALACES.includes(thanIdx);
        const isEven = (rawToan % 2 === 0);
        
        // 3. Thái Ất & Nhị Mục Hòa / Bất Hòa
        let isHoa = false;
        let hoaType = "Chưa rõ";
        
        if (starType === 'thai_at') {
            if (isDuongPalace) isHoa = isEven;
            else if (isAmPalace) isHoa = !isEven;
            hoaType = isHoa ? "Thái Ất Hòa" : "Thái Ất Bất Hòa";
        } else if (starType === 'van_xuong' || starType === 'thuy_kich' || starType === 'nhi_muc') {
            if (!isGianThanPalace) isHoa = isEven;
            else isHoa = !isEven;
            hoaType = isHoa ? "Nhị Mục Hòa" : "Nhị Mục Bất Hòa";
        } else {
            if (isDuongPalace) isHoa = isEven;
            else if (isAmPalace) isHoa = !isEven;
            else isHoa = !isEven;
            hoaType = isHoa ? "Toán Hòa" : "Toán Bất Hòa";
        }
        
        // 4. Phân Loại Số Toán & 5 Mức Cát Hung
        let starNumberType = "";
        let catHungLevel = "";
        let catHungDesc = "";
        
        if ((isDuongPalace && [33, 39].includes(rawToan)) || (isAmPalace && [22, 26].includes(rawToan))) {
            starNumberType = isDuongPalace ? "Trùng Dương" : "Trùng Âm";
            catHungLevel = "Thái Quá";
            catHungDesc = "Thời có hôn quân, bạo chúa.";
        } else if ((isAmPalace && [3, 9].includes(rawToan)) || (isDuongPalace && [2, 6].includes(rawToan))) {
            starNumberType = isAmPalace ? "Thuần Dương trong Âm" : "Thuần Âm trong Dương";
            catHungLevel = "Bất Cập (Đại Hung)";
            catHungDesc = "Toán Bất Cập là toán Đại Hung. Ở cung Tuyệt Dương tai họa hung hiểm bội phần.";
        } else if ((isDuongPalace && [13, 19, 31, 37].includes(rawToan)) || (isAmPalace && [24, 28].includes(rawToan))) {
            starNumberType = isDuongPalace ? "Tạp Trùng Dương" : "Tạp Trùng Âm";
            catHungLevel = "Thứ Hung";
            catHungDesc = "Trong ngoài có mưu sâu kế hiểm ngầm.";
        } else if ((isDuongPalace && [13, 17].includes(rawToan)) || (isAmPalace && [44, 48].includes(rawToan))) {
            starNumberType = isDuongPalace ? "Âm Trùng trong Dương" : "Dương Trùng trong Âm";
            catHungLevel = "Đại Hung";
            catHungDesc = "Mưu sâu kế hiểm sắp sẵn (Trùng Dương mưu trong, Trùng Âm mưu ngoài).";
        } else if ([14, 18, 33].includes(rawToan)) {
            starNumberType = "Dương Âm Thượng Hòa";
            catHungLevel = "Thượng Hòa (Đại Cát)";
            catHungDesc = "Khí thuận, âm dương tương hợp, may mắn tốt lành.";
        } else if ([23, 29, 32].includes(rawToan)) {
            starNumberType = "Thứ Hòa";
            catHungLevel = "Thứ Hòa (Thứ Cát)";
            catHungDesc = "Khí hòa thuận, sự việc yên ổn.";
        } else if ([12, 16, 27, 34, 38].includes(rawToan)) {
            starNumberType = "Hạ Hòa";
            catHungLevel = "Hạ Hòa (Tiểu Cát)";
            catHungDesc = "Âm dương phối hợp, tiểu cát.";
        } else {
            starNumberType = isEven ? "Âm Số" : "Dương Số";
            catHungLevel = isHoa ? "Hòa (Cát)" : "Bất Hòa (Hung)";
            catHungDesc = isHoa ? "Toán hòa thì khí thuận, vạn sự may mắn." : "Toán bất hòa thì khí nghịch, âm dương đối lập, tai ương phát động.";
        }
        
        return {
            rawToan,
            donVi,
            isVoThien,
            isVoDia,
            isVoNhan,
            tamTaiBadges,
            isHoa,
            hoaType,
            starNumberType,
            catHungLevel,
            catHungDesc
        };
    }

    // ------ NHÓM TÍCH HỢP (THỦY KÍCH, TƯỚNG) ------
    calcThuyKich(vanXuongIdx, keThanIdx) {
        if (vanXuongIdx === undefined || keThanIdx === undefined) return { thanIdx: 12, name: "Thủy Kích (Địa Mục)", class: "thuy-kich" };
        const CAN_IDX = 7; // Cung Cấn
        const distInclusive = (vanXuongIdx - keThanIdx + 16) % 16 + 1;
        const thanIdx = (CAN_IDX + distInclusive - 1) % 16;
        return { thanIdx, name: "Thủy Kích (Địa Mục)", class: "thuy-kich" };
    }
    
    /**
     * Phép tính Số Toán (Toán Chủ, Toán Khách, Toán Định)
     * Quy tắc: BỎ ĐẦU TÍNH CUỐI — Bỏ cung khởi phát (Văn Xương/Thủy Kích/Kế Định),
     * đếm thuận qua các cung trung gian rồi TÍNH LUÔN cung Thái Ất (targetIdx).
     * Cung chính ăn Biệt số (Càn=1, Ly=2, Cấn=3, Chấn=4, Trung=5, Đoài=6, Khôn=7, Khảm=8, Tốn=9),
     * gián thần ăn 1 số.
     */
    /**
     * Phép tính Số Toán (Toán Chủ, Toán Khách, Toán Định)
     * Chuẩn Thái Ất Thần Kinh:
     * - Bảng Biệt Số Cửu Cung Thái Ất: Kiền=1, Ly=2, Cấn=3, Chấn=4, Đoài=6, Khôn=7, Khảm=8, Tốn=9.
     * - Đường đi: Xuất phát từ startIdx, đi thuận 16 Thần đến trước targetIdx (bỏ targetIdx).
     * - Nếu startIdx là Gián Thần: cộng 1 vào tổng.
     * - Mỗi Cung Bát Quái trên đường đi (odd index: 1, 3, 5, 7, 9, 11, 13, 15): cộng Biệt Số của Cung đó.
     * - Các Gián Thần trung gian không cộng số.
     */
    static getToanUnified(startIdx, targetIdx) {
        // Biệt số Cửu Cung Thái Ất:
        // 1: Đoài(6), 3: Kiền(1), 5: Khảm(8), 7: Cấn(3), 9: Chấn(4), 11: Tốn(9), 13: Ly(2), 15: Khôn(7)
        const MAIN_PALACE_BIET_SO = { 1: 6, 3: 1, 5: 8, 7: 3, 9: 4, 11: 9, 13: 2, 15: 7 };
        const GIAN_THAN_IDXS = [0, 2, 4, 6, 8, 10, 12, 14];

        if (startIdx === targetIdx) {
            const bVal = GIAN_THAN_IDXS.includes(startIdx) ? 1 : (MAIN_PALACE_BIET_SO[startIdx] || 1);
            return { raw: bVal, val: bVal % 10 || 10 };
        }
        
        let sum = 0;
        if (GIAN_THAN_IDXS.includes(startIdx)) {
            sum += 1;
        }
        
        let p = startIdx;
        let safety = 0;
        while (p !== targetIdx && safety < 32) {
            safety++;
            if (!GIAN_THAN_IDXS.includes(p)) {
                sum += MAIN_PALACE_BIET_SO[p];
            }
            p = (p + 1) % 16;
        }
        return { raw: sum, val: sum % 10 || 10 };
    }

    calcDaiTuongAndThamTuong(taIdx, vxIdx, tkIdx) {
        // Index 1..9 corresponding to Palace 1..9 in Thái Ất Biệt Số Order:
        // 1=Kiền(3), 2=Ly(13), 3=Cấn(7), 4=Chấn(9), 5=Trung Cung(-1), 6=Đoài(1), 7=Khôn(15), 8=Khảm(5), 9=Tốn(11)
        const PALACE_TO_THAN_IDX = [-1, 3, 13, 7, 9, -1, 1, 15, 5, 11];

        const chuToanObj = ThaiAtBaseEngine.getToanUnified(vxIdx, taIdx);
        const khachToanObj = ThaiAtBaseEngine.getToanUnified(tkIdx, taIdx);

        function getDaiTuongInfo(rawToan) {
            const donVi = rawToan % 10;
            if (donVi === 5) return { cungNum: 5, thanIdx: null, isClosed: true }; // 5, 15, 25, 35: Cửa đóng, không nhập Trung Cung
            let cungNum = donVi;
            if (donVi === 0) {
                // 10, 20, 30, 40: Lấy theo hàng chục (10->Kiền 1, 20->Ly 2, 30->Cấn 3, 40->Chấn 4)
                cungNum = (Math.floor(rawToan / 10) % 10) || 1;
            }
            const thanIdx = PALACE_TO_THAN_IDX[cungNum] !== undefined ? PALACE_TO_THAN_IDX[cungNum] : null;
            return { cungNum, thanIdx, isClosed: false };
        }

        function getThamTuongInfo(daiCungNum) {
            if (!daiCungNum || daiCungNum === 5) return null;
            const thamCungNum = (daiCungNum * 3) % 10;
            if (thamCungNum === 5 || thamCungNum === 0) return null;
            const thanIdx = PALACE_TO_THAN_IDX[thamCungNum] !== undefined ? PALACE_TO_THAN_IDX[thamCungNum] : null;
            return { cungNum: thamCungNum, thanIdx };
        }

        const chuDaiInfo = getDaiTuongInfo(chuToanObj.raw);
        const khachDaiInfo = getDaiTuongInfo(khachToanObj.raw);

        const res = [];
        if (chuDaiInfo.thanIdx !== null) {
            res.push({ thanIdx: chuDaiInfo.thanIdx, name: `Đại Tướng Chủ (Toán ${chuToanObj.raw})`, class: "chu-tuong", rawToan: chuToanObj.raw, cungNum: chuDaiInfo.cungNum });
            const chuThamInfo = getThamTuongInfo(chuDaiInfo.cungNum);
            if (chuThamInfo && chuThamInfo.thanIdx !== null) {
                res.push({ thanIdx: chuThamInfo.thanIdx, name: `Tham Tướng Chủ`, class: "chu-tuong", cungNum: chuThamInfo.cungNum });
            }
        }
        
        if (khachDaiInfo.thanIdx !== null) {
            res.push({ thanIdx: khachDaiInfo.thanIdx, name: `Đại Tướng Khách (Toán ${khachToanObj.raw})`, class: "khach-tuong", rawToan: khachToanObj.raw, cungNum: khachDaiInfo.cungNum });
            const khachThamInfo = getThamTuongInfo(khachDaiInfo.cungNum);
            if (khachThamInfo && khachThamInfo.thanIdx !== null) {
                res.push({ thanIdx: khachThamInfo.thanIdx, name: `Tham Tướng Khách`, class: "khach-tuong", cungNum: khachThamInfo.cungNum });
            }
        }
        
        return res;
    }

    // ------ NHÓM CƠ, PHÚC, DU (MOD TÍCH 360) ------
    calcCoPhucDu() {
        const cucNum = (this.cucNum || (this.kyDu % 72) || 72);
        const unitName = (this.mode === 'nguyet') ? 'tháng' : (this.mode === 'nhat') ? 'ngày' : (this.mode === 'thoi') ? 'giờ' : 'năm';
        const CHI_NAMES = ["Tý", "Sửu", "Dần", "Mão", "Thìn", "Tị", "Ngọ", "Mùi", "Thân", "Dậu", "Tuất", "Hợi"];
        
        // Bài thơ Tam Cơ:
        // "Tuế tích hai trăm rưỡi lại gia
        //  Ba trăm sáu chục lại trừ ra
        //  Lấy ngay ngôi trú mà trừ số
        //  Khởi Ngọ, Quân Thần, Dân Tuất qua
        //  3 chục năm Quân Cơ 1 đổi
        //  Thần 3, Dân 1 thuận theo đà"
        
        // 1. Quân Cơ: Khởi Ngọ (Chi 6), 30 số/cung (30 năm 1 cung)
        const chiQuan = (6 + Math.floor((cucNum - 1) / 30)) % 12;
        const quanCoIdx = CHI_TO_THAN_IDX[chiQuan];
        const quanCoCungName = CHI_NAMES[chiQuan];
        const remQuan = ((cucNum - 1) % 30) + 1;
        
        // 2. Thần Cơ: Khởi Ngọ (Chi 6), 3 số/cung (3 năm 1 cung)
        const chiThan = (6 + Math.floor((cucNum - 1) / 3)) % 12;
        const thanCoIdx = CHI_TO_THAN_IDX[chiThan];
        const thanCoCungName = CHI_NAMES[chiThan];
        const remThan = ((cucNum - 1) % 3) + 1;
        
        // 3. Dân Cơ: Khởi Tuất (Chi 10), 1 số/cung (1 năm 1 cung)
        const chiDan = (10 + (cucNum - 1)) % 12;
        const danCoIdx = CHI_TO_THAN_IDX[chiDan];
        const danCoCungName = CHI_NAMES[chiDan];
        
        // Ngũ Phúc (Dùng Tích % 225 / 45 -> Kiền, Cấn, Tốn, Khôn, Trung)
        // Ngũ Phúc: Tích % 225 / 45 -> 0:Kiền(3), 1:Cấn(7), 2:Tốn(11), 3:Khôn(15), 4:Trung(-1)
        const npR = (cucNum * 5 + 25) % 225;
        const npQ = Math.floor(npR / 45);
        const npRem = (npR % 45) || 45;
        const npPath = [3, 7, 11, 15, -1]; // 1: Kiền(3), 2: Cấn(7), 3: Tốn(11), 4: Khôn(15), 5: Trung(-1)
        const npNames = ["Kiền", "Cấn", "Tốn", "Khôn", "Trung Cung"];
        const npIdx = npPath[npQ % 5];
        const npCungName = npNames[npQ % 5];
        
        // Đại Du (Chu kỳ 288 năm, 36 năm/cung, 8 cung Bát Quái: Khôn, Khảm, Tốn, Kiền, Ly, Cấn, Chấn, Đoài)
        const ddVal = (cucNum * 5 + 34);
        const ddR = ddVal % 288;
        const ddStep = Math.floor(ddR / 36);
        const ddRem = (ddR % 36) || 36;
        const PATH_DAI_DU = [15, 5, 11, 3, 13, 7, 9, 1]; // 0:Khôn(15), 1:Khảm(5), 2:Tốn(11), 3:Kiền(3), 4:Ly(13), 5:Cấn(7), 6:Chấn(9), 7:Đoài(1)
        const NAMES_DAI_DU = ["Khôn", "Khảm", "Tốn", "Kiền", "Ly", "Cấn", "Chấn", "Đoài"];
        const ddIdx = PATH_DAI_DU[ddStep % 8];
        const ddCungName = NAMES_DAI_DU[ddStep % 8];
        
        // Tiểu Du (Chu kỳ 192 năm, 24 năm/cung, 8 cung Bát Quái: Kiền, Ly, Cấn, Chấn, Đoài, Khôn, Khảm, Tốn)
        const yTichVal = (cucNum * 5 + 10);
        const tdStep = Math.floor((yTichVal % 192) / 24);
        const PATH_TIEU_DU = [3, 13, 7, 9, 1, 15, 5, 11]; // 0:Càn(3), 1:Ly(13), 2:Cấn(7), 3:Chấn(9), 4:Đoài(1), 5:Khôn(15), 6:Khảm(5), 7:Tốn(11)
        const tdIdx = PATH_TIEU_DU[tdStep % 8];
        
        return [
            { thanIdx: quanCoIdx, name: `Quân Cơ (Cung ${quanCoCungName} - ${remQuan} ${unitName})`, class: "quan-co", unique: "quan_co" },
            { thanIdx: thanCoIdx, name: `Thần Cơ (Cung ${thanCoCungName} - ${remThan} ${unitName})`, class: "than-co", unique: "than_co" },
            { thanIdx: danCoIdx, name: `Dân Cơ (Cung ${danCoCungName})`, class: "dan-co", unique: "dan_co" },
            { thanIdx: npIdx, name: `Ngũ Phúc (Cung ${npCungName} - ${npRem} ${unitName})`, class: "ngu-phuc", unique: "ngu_phuc" },
            { thanIdx: ddIdx, name: `Đại Du (Cung ${ddCungName} - ${ddRem} ${unitName})`, class: "dai-du", unique: "dai_du" },
            { thanIdx: tdIdx, name: "Tiểu Du", class: "tieu-du", unique: "tieu_du" }
        ];
    }
    
    // ------ NHÓM TỨ THẦN KỲ (MOD 36/12) ------
    calcTuThanKy() {
        const cucNum = (this.cucNum || (this.kyDu % 72) || 72);
        const kVal = (this.kyDu !== undefined ? this.kyDu : (this.tueTich % 360) || cucNum);
        const step = Math.floor((cucNum - 1) / 3) % 12;
        
        // Mảng 12 cung Tứ Thần Kỳ: 1:Càn(3), 2:Ly(13), 3:Cấn(7), 4:Chấn(9), 5:Trung(-1), 6:Đoài(1), 7:Khôn(15), 8:Khảm(5), 9:Tốn(11), 10:Tị(12), 11:Thân(0), 12:Dần(8)
        const MASTER_PATH = [3, 13, 7, 9, -1, 1, 15, 5, 11, 12, 0, 8];
        
        const tuThanIdx = MASTER_PATH[(0 + step) % 12];   // Khởi Càn (idx 0 của MASTER_PATH)
        const thienAtIdx = MASTER_PATH[(5 + step) % 12];  // Khởi Đoài (idx 5 của MASTER_PATH)
        const trucPhuIdx = MASTER_PATH[(8 + step) % 12];  // Khởi Tốn (idx 8 của MASTER_PATH)
        const diaAtIdx = MASTER_PATH[(4 + step) % 12];    // Khởi Trung Cung (idx 4 của MASTER_PATH -> Cục 32 ở Cấn)
        
        // 1. Thanh Long: Kỷ Dư % 60 % 12, khởi Hợi thuận 12 địa chi
        const r60_tl = kVal % 60;
        const r12_tl = (r60_tl % 12) || 12;
        const THANH_LONG_PATH = [4, 5, 6, 8, 9, 10, 12, 13, 14, 0, 1, 2];
        const tlIdx = THANH_LONG_PATH[r12_tl - 1];
        
        // 2. Thái Âm: luôn đứng sau Thái Tuế CỦA CỤC 2 cung (Nghịch lùi 2 cung Chi từ Chi Thái Tuế)
        const cucChiIdx = ((this.cucNum || (this.kyDu % 72) || 72) - 1) % 12;
        const thaiAmChiIdx = (cucChiIdx - 2 + 12) % 12;
        const taIdx = CHI_TO_THAN_IDX[thaiAmChiIdx];
        
        // 3. Phi Phù: Kỷ Dư % 72 / 3, đếm theo vòng 12 cung Dương/Âm Độn
        const r72 = (kVal % 72) || 72;
        const rem3 = (r72 % 3) || 3;
        const ppStepIdx = Math.floor((r72 - 1) / 3) % 12;
        const PHI_PHU_DUONG = [11, 11, 15, 3, 3, 13, 7, 9, -1, 1, 15, 5];
        const PHI_PHU_AM = [3, 3, 15, 11, 11, 5, 15, 1, -1, 9, 7, 13];
        const phiPhuPath = (this.isDuongDon !== false) ? PHI_PHU_DUONG : PHI_PHU_AM;
        const phiPhuIdx = phiPhuPath[ppStepIdx];
        
        // 4. Xích Kỳ: (Kỷ Dư + 1) % 40 % 4, khởi Hợi->Thân->Tị->Dần
        const r40_xk = (kVal + 1) % 40;
        const r4_xk = (r40_xk % 4) || 4;
        const XICH_KY_PATH = [4, 0, 12, 8];
        const xkIdx = XICH_KY_PATH[r4_xk - 1];
        
        // 5. Hắc Kỳ: (Kỷ Dư + 25) % 36 / 3, khởi Hợi nghịch 12 địa chi
        const unitName = (this.mode === 'nguyet') ? "tháng" : ((this.mode === 'nhat') ? "ngày" : ((this.mode === 'thoi') ? "giờ" : "năm"));
        const r36_hk = (kVal + 25) % 36;
        const P_hk = Math.floor(r36_hk / 3);
        const hkRem = (r36_hk % 3) || 3;
        const HAC_KY_PATH = [4, 2, 1, 0, 14, 13, 12, 10, 9, 8, 6, 5];
        const hkIdx = HAC_KY_PATH[P_hk % 12];
        
        // 6. Thiên Tôn: Kỷ Dư % 4 (nếu 0 thì = 4)
        // Dương độn: Khảm(5) -> Đoài(1) -> Ly(13) -> Chấn(9)
        // Âm độn: Chấn(9) -> Ly(13) -> Đoài(1) -> Khảm(5)
        const du4_tt = (kVal % 4) || 4;
        const THIEN_TON_DUONG = [5, 1, 13, 9];
        const THIEN_TON_AM = [9, 13, 1, 5];
        const ttPath = (this.isDuongDon !== false) ? THIEN_TON_DUONG : THIEN_TON_AM;
        const thienTonIdx = ttPath[du4_tt - 1];

        // 7. Thiên Hoàng: Kỷ Dư % 20 (nếu 0 thì = 20)
        // Dương độn: Thân(0), Dậu(1), Tuất(2), Kiền(3), Kiền(3), Hợi(4), Tý(5), Sửu(6), Cấn(7), Cấn(7), Dần(8), Mão(9), Thìn(10), Tốn(11), Tốn(11), Tị(12), Ngọ(13), Mùi(14), Khôn(15), Khôn(15)
        // Âm độn: Dần(8), Cấn(7), Cấn(7), Sửu(6), Tý(5), Hợi(4), Kiền(3), Kiền(3), Tuất(2), Dậu(1), Thân(0), Khôn(15), Khôn(15), Mùi(14), Ngọ(13), Tị(12), Tốn(11), Tốn(11), Thìn(10), Mão(9)
        const du20_th = (kVal % 20) || 20;
        const THIEN_HOANG_DUONG = [0, 1, 2, 3, 3, 4, 5, 6, 7, 7, 8, 9, 10, 11, 11, 12, 13, 14, 15, 15];
        const THIEN_HOANG_AM = [8, 7, 7, 6, 5, 4, 3, 3, 2, 1, 0, 15, 15, 14, 13, 12, 11, 11, 10, 9];
        const thPath = (this.isDuongDon !== false) ? THIEN_HOANG_DUONG : THIEN_HOANG_AM;
        const thienHoangIdx = thPath[du20_th - 1];

        // 8. Thiên Thời: Kỷ Dư % 12 (nếu 0 thì = 12)
        // Dương độn: Dần(8) -> Mão(9) -> Thìn(10) -> Tị(12) -> Ngọ(13) -> Mùi(14) -> Thân(0) -> Dậu(1) -> Tuất(2) -> Hợi(4) -> Tý(5) -> Sửu(6)
        // Âm độn: Thân(0) -> Mùi(14) -> Ngọ(13) -> Tị(12) -> Thìn(10) -> Mão(9) -> Dần(8) -> Sửu(6) -> Tý(5) -> Hợi(4) -> Tuất(2) -> Dậu(1)
        const du12_tthoi = (kVal % 12) || 12;
        const THIEN_THOI_DUONG = [8, 9, 10, 12, 13, 14, 0, 1, 2, 4, 5, 6];
        const THIEN_THOI_AM = [0, 14, 13, 12, 10, 9, 8, 6, 5, 4, 2, 1];
        const tthoiPath = (this.isDuongDon !== false) ? THIEN_THOI_DUONG : THIEN_THOI_AM;
        const thienThoiIdx = tthoiPath[du12_tthoi - 1];

        // 9. Đế Phù: Kỷ Dư % 20 (nếu 0 thì = 20)
        // Dương độn: Tuất(2), Kiền(3), Hợi(4), Tý(5), Tý(5), Sửu(6), Cấn(7), Dần(8), Mão(9), Mão(9), Thìn(10), Tốn(11), Tị(12), Ngọ(13), Ngọ(13), Mùi(14), Khôn(15), Thân(0), Dậu(1), Dậu(1)
        // Âm độn: Thìn(10), Mão(9), Mão(9), Dần(8), Cấn(7), Sửu(6), Tý(5), Tý(5), Hợi(4), Kiền(3), Tuất(2), Dậu(1), Dậu(1), Thân(0), Khôn(15), Mùi(14), Ngọ(13), Ngọ(13), Tị(12), Tốn(11)
        const du20_dp = (kVal % 20) || 20;
        const DE_PHU_DUONG = [2, 3, 4, 5, 5, 6, 7, 8, 9, 9, 10, 11, 12, 13, 13, 14, 15, 0, 1, 1];
        const DE_PHU_AM = [10, 9, 9, 8, 7, 6, 5, 5, 4, 3, 2, 1, 1, 0, 15, 14, 13, 13, 12, 11];
        const dpPath = (this.isDuongDon !== false) ? DE_PHU_DUONG : DE_PHU_AM;
        const dePhuIdx = dpPath[du20_dp - 1];

        // 10. Phi Điểu: Kỷ Dư % 9 (nếu 0 thì = 9)
        // Dương độn: Kiền(3) -> Ly(13) -> Cấn(7) -> Chấn(9) -> Trung(-1) -> Đoài(1) -> Khôn(15) -> Khảm(5) -> Tốn(11)
        // Âm độn: Tốn(11) -> Khảm(5) -> Khôn(15) -> Đoài(1) -> Trung(-1) -> Chấn(9) -> Cấn(7) -> Ly(13) -> Kiền(3)
        const du9_pd = (kVal % 9) || 9;
        const PHI_DIEU_DUONG = [3, 13, 7, 9, -1, 1, 15, 5, 11];
        const PHI_DIEU_AM = [11, 5, 15, 1, -1, 9, 7, 13, 3];
        const pdPath = (this.isDuongDon !== false) ? PHI_DIEU_DUONG : PHI_DIEU_AM;
        const phiDieuIdx = pdPath[du9_pd - 1];

        // 11. Năm Hành (Ngũ Hành): Kỷ Dư % 5 (nếu 0 thì = 5)
        // Dương độn: Kiền(3) -> Khảm(5) -> Cấn(7) -> Tốn(11) -> Khôn(15)
        // Âm độn: Tốn(11) -> Ly(13) -> Khôn(15) -> Kiền(3) -> Cấn(7)
        const du5_nh = (kVal % 5) || 5;
        const NGU_HANH_DUONG = [3, 5, 7, 11, 15];
        const NGU_HANH_AM = [11, 13, 15, 3, 7];
        const nhPath = (this.isDuongDon !== false) ? NGU_HANH_DUONG : NGU_HANH_AM;
        const nguHanhIdx = nhPath[du5_nh - 1];

        // 12. Tam Phong: Kỷ Dư % 9 (nếu 0 thì = 9)
        // Dương độn: Cấn(7) -> Khôn(15) -> Ly(13) -> Đoài(1) -> Kiền(3) -> Trung(-1) -> Tốn(11) -> Chấn(9) -> Khảm(5)
        // Âm độn: Khôn(15) -> Cấn(7) -> Khảm(5) -> Chấn(9) -> Tốn(11) -> Trung(-1) -> Kiền(3) -> Đoài(1) -> Ly(13)
        const du9_tp = (kVal % 9) || 9;
        const TAM_PHONG_DUONG = [7, 15, 13, 1, 3, -1, 11, 9, 5];
        const TAM_PHONG_AM = [15, 7, 5, 9, 11, -1, 3, 1, 13];
        const tpPath = (this.isDuongDon !== false) ? TAM_PHONG_DUONG : TAM_PHONG_AM;
        const tamPhongIdx = tpPath[du9_tp - 1];

        // 13. Ngũ Phong: Kỷ Dư % 9 (nếu 0 thì = 9)
        // Dương độn: Kiền(3) -> Cấn(7) -> Trung(-1) -> Khôn(15) -> Tốn(11) -> Ly(13) -> Chấn(9) -> Đoài(1) -> Khảm(5)
        // Âm độn: Khôn(15) -> Cấn(7) -> Khảm(5) -> Chấn(9) -> Tốn(11) -> Trung(-1) -> Kiền(3) -> Đoài(1) -> Ly(13)
        const du9_np = (kVal % 9) || 9;
        const NGU_PHONG_DUONG = [3, 7, -1, 15, 11, 13, 9, 1, 5];
        const NGU_PHONG_AM = [15, 7, 5, 9, 11, -1, 3, 1, 13];
        const npPhongPath = (this.isDuongDon !== false) ? NGU_PHONG_DUONG : NGU_PHONG_AM;
        const nguPhongIdx = npPhongPath[du9_np - 1];

        // 14. Bát Phong: Kỷ Dư % 9 (nếu 0 thì = 9)
        // Dương độn: Ly(13) -> Cấn(7) -> Chấn(9) -> Trung(-1) -> Đoài(1) -> Khôn(15) -> Khảm(5) -> Tốn(11) -> Kiền(3)
        // Âm độn: Khảm(5) -> Khôn(15) -> Đoài(1) -> Trung(-1) -> Chấn(9) -> Cấn(7) -> Ly(13) -> Kiền(3) -> Tốn(11)
        const du9_bp = (kVal % 9) || 9;
        const BAT_PHONG_DUONG = [13, 7, 9, -1, 1, 15, 5, 11, 3];
        const BAT_PHONG_AM = [5, 15, 1, -1, 9, 7, 13, 3, 11];
        const bpPath = (this.isDuongDon !== false) ? BAT_PHONG_DUONG : BAT_PHONG_AM;
        const batPhongIdx = bpPath[du9_bp - 1];

        return [
            { thanIdx: tuThanIdx, name: "Tứ Thần", class: "tu-than" },
            { thanIdx: thienAtIdx, name: "Thiên Ất", class: "tu-than" },
            { thanIdx: diaAtIdx, name: "Địa Ất", class: "tu-than" },
            { thanIdx: trucPhuIdx, name: "Trực Phù", class: "tu-than" },
            { thanIdx: tlIdx, name: "Thanh Long (Cờ Xanh)", class: "tu-than" },
            { thanIdx: taIdx, name: "Thái Âm", class: "tu-than" },
            { thanIdx: phiPhuIdx, name: "Phi Phù", class: "tu-than" },
            { thanIdx: thienTonIdx, name: "Thiên Tôn", class: "tu-than" },
            { thanIdx: thienHoangIdx, name: "Thiên Hoàng", class: "tu-than" },
            { thanIdx: thienThoiIdx, name: "Thiên Thời", class: "tu-than" },
            { thanIdx: dePhuIdx, name: "Đế Phù", class: "tu-than" },
            { thanIdx: phiDieuIdx, name: "Phi Điểu", class: "tu-than" },
            { thanIdx: nguHanhIdx, name: "Ngũ Hành", class: "tu-than" },
            { thanIdx: tamPhongIdx, name: "Tam Phong", class: "tu-than" },
            { thanIdx: nguPhongIdx, name: "Ngũ Phong", class: "tu-than" },
            { thanIdx: batPhongIdx, name: "Bát Phong", class: "tu-than" },
            { thanIdx: xkIdx, name: "Xích Kỳ (Cờ Đỏ)", class: "co-khac" },
            { thanIdx: hkIdx, name: `Hắc Kỳ (Cờ Đen - ${hkRem} ${unitName})`, class: "co-khac" }
        ];
    }

    // ------ NHÓM CỬU TINH (3 VÒNG SAO LẠC THƯ PHI TINH) ------
    calcCuuTinh() {
        const res = [];
        const LAC_THU_THAN_IDXS = [-1, 3, 1, 7, 13, 5, 15, 9, 11];
        const OTHER_PALACE_OFFSETS = [0, 1, 2, 3, 5, 6, 7, 8];

        // 1. Cửu Tinh Trực Phù (Phối Kỳ Môn Độn Giáp & Lục Nghi Tam Kỳ - 900/90/10 năm)
        const TP_SAO_NAMES = ["Thiên Bồng", "Thiên Nhuế", "Thiên Xung", "Thiên Phụ", "Thiên Cầm", "Thiên Tâm", "Thiên Trụ", "Thiên Nhậm", "Thiên Ương"];
        const CAN_TO_BIET_SO = { 0: 1, 1: 9, 2: 8, 3: 7, 4: 1, 5: 2, 6: 3, 7: 4, 8: 5, 9: 6 };
        const BIET_SO_TO_THAN_IDX = { 1: 5, 2: 15, 3: 9, 4: 11, 5: -1, 6: 3, 7: 1, 8: 7, 9: 13 };

        const kValTP = this.kyDu !== undefined ? this.kyDu : (this.tueTich % 360);
        const du90_tp = kValTP % 90;
        const q10_tp = Math.floor(du90_tp / 10);
        const rem10_tp = (du90_tp % 10) || 10;
        const unitName = (this.mode === 'nguyet') ? 'tháng' : (this.mode === 'nhat') ? 'ngày' : (this.mode === 'thoi') ? 'giờ' : 'năm';

        const starTpIdx = q10_tp % 9;
        this.trucSuTpStarName = TP_SAO_NAMES[starTpIdx];
        
        const canIdx = (this.namCanIdx !== undefined) ? this.namCanIdx : (this.tuTru && this.tuTru.year && this.tuTru.year.canIdx !== undefined ? this.tuTru.year.canIdx : 0);
        const targetBietSo = CAN_TO_BIET_SO[canIdx] || 1;

        for (let bietSo = 1; bietSo <= 9; bietSo++) {
            const offset = (bietSo - targetBietSo + 9) % 9;
            const currentStarIdx = (starTpIdx + offset) % 9;
            const currentStarName = TP_SAO_NAMES[currentStarIdx];
            const thanIdx = BIET_SO_TO_THAN_IDX[bietSo];
            const isTrucPhuStar = (bietSo === targetBietSo);

            res.push({
                thanIdx: thanIdx,
                name: currentStarName + (isTrucPhuStar ? ` (TP - ${rem10_tp} ${unitName})` : " (TP)"),
                class: "truc-phu",
                unique: 'TP_' + currentStarName
            });
        }

        // 2. Cửu Tinh Văn Xương (Phận Dã Trực Sự - 270/30 năm)
        const VX_SAO_NAMES = ["Văn Xương", "Huyền Phượng", "Minh Duy", "Âm Đức", "Chiêu Dao", "Hoa Minh", "Huyền Vũ", "Huyền Minh", "Cưu Minh"];
        const CAN_TO_BIET_SO_VX = { 0: 3, 1: 4, 2: 9, 3: 2, 4: 5, 5: 5, 6: 7, 7: 6, 8: 1, 9: 8 };
        
        const tueTichVal = (this.tueTich && this.mode === 'tue') ? this.tueTich : (this.tichTrungCo ? (this.tichTrungCo + 10143297) : (1987 + 10153917));
        const du270_vx = (tueTichVal + 30) % 270;
        const q30_vx = Math.floor(du270_vx / 30);
        const rem30_vx = (du270_vx % 30) || 30;

        const starVxIdx = q30_vx % 9;
        this.trucSuVxStarName = VX_SAO_NAMES[starVxIdx];

        const targetBietSoVx = CAN_TO_BIET_SO_VX[canIdx] || 1;

        for (let bietSo = 1; bietSo <= 9; bietSo++) {
            const offset = (bietSo - targetBietSoVx + 9) % 9;
            const currentStarIdx = (starVxIdx + offset) % 9;
            const currentStarName = VX_SAO_NAMES[currentStarIdx];
            const thanIdx = BIET_SO_TO_THAN_IDX[bietSo];
            const isTrucSuVxStar = (bietSo === targetBietSoVx);

            res.push({
                thanIdx: thanIdx,
                name: currentStarName + (isTrucSuVxStar ? ` (VX - ${rem30_vx} ${unitName})` : " (VX)"),
                class: "van-xuong-9",
                unique: 'VX_' + currentStarName
            });
        }
        
        // 3. Cửu Tinh Quý Thần (Giữ Phận Dã Trực Sự - % 9 + 3)
        const QT_SAO_NAMES = [
            "Thái Nhất", "Thiên Hoàng", "Thái Âm", 
            "Hàm Trì", "Thanh Long", "Thiên Phù", 
            "Chiêu Dao", "Hiên Viên", "Nhiếp Đề"
        ];
        const QT_PALACE_ORDER = [
            { bietSo: 6, thanIdx: 3 },  // Kiền
            { bietSo: 7, thanIdx: 1 },  // Đoài
            { bietSo: 8, thanIdx: 7 },  // Cấn
            { bietSo: 9, thanIdx: 13 }, // Ly
            { bietSo: 1, thanIdx: 5 },  // Khảm
            { bietSo: 2, thanIdx: 15 }, // Khôn
            { bietSo: 3, thanIdx: 9 },  // Chấn
            { bietSo: 4, thanIdx: 11 }  // Tốn
        ];

        const kValQT = this.kyDu !== undefined ? this.kyDu : (this.tueTich % 360);
        const du9_qt = ((kValQT + 3) % 9) || 9;
        const trucSuQtStarIdx = du9_qt - 1;
        this.trucSuQtStarName = QT_SAO_NAMES[trucSuQtStarIdx];

        // Trung Cung (-1): Trực Sự Quý Thần
        res.push({
            thanIdx: -1,
            name: QT_SAO_NAMES[trucSuQtStarIdx] + " (QT)",
            class: "quy-than-9",
            unique: 'QT_' + QT_SAO_NAMES[trucSuQtStarIdx]
        });

        // 8 cung xung quanh: phi lùi từ sao Trực Sự
        for (let i = 0; i < 8; i++) {
            const currentStarIdx = (trucSuQtStarIdx - 1 - i + 900) % 9;
            const currentStarName = QT_SAO_NAMES[currentStarIdx];
            const pal = QT_PALACE_ORDER[i];

            res.push({
                thanIdx: pal.thanIdx,
                name: currentStarName + " (QT)",
                class: "quy-than-9",
                unique: 'QT_' + currentStarName
            });
        }

        return res;
    }
    
    // ------ NHÓM KHÁC ------
    calcOtherStars() {
        return [];
    }

    // ------ BÁT MÔN (8 CỬA AN LÊN 8 CUNG BÁT QUÁI) ------
    calcBatMon8() {
        const res = [];
        const BAT_MON_LIST = ["Khai", "Hưu", "Sinh", "Thương", "Đỗ", "Cảnh", "Tử", "Kinh"];
        
        // 8 Cung Bát Quái trên Sa Bàn Thái Ất (thứ tự Càn, Khảm, Cấn, Chấn, Tốn, Ly, Khôn, Đoài)
        const BAT_QUAI_PALACES = [
            { thanIdx: 3,  id: "kien", name: "Càn" },
            { thanIdx: 5,  id: "ty",   name: "Khảm" },
            { thanIdx: 7,  id: "can",  name: "Cấn" },
            { thanIdx: 9,  id: "mao",  name: "Chấn" },
            { thanIdx: 11, id: "ton",  name: "Tốn" },
            { thanIdx: 13, id: "ngo",  name: "Ly" },
            { thanIdx: 15, id: "khon", name: "Khôn" },
            { thanIdx: 1,  id: "dau",  name: "Đoài" }
        ];

        // Tính bước Trực Sự Bát Môn Kể Năm: Tích Niên % 240 / 30 (Số cửa đã qua)
        const tichVal = this.kyDuThang || this.kyDuNgay || this.kyDuGio || this.kyDuNam || (this.tueTich % 360) || 360;
        const du240 = (this.tueTich && this.mode === 'tue') ? (this.tueTich % 240) : (tichVal % 240);
        const batMonStep = Math.floor(du240 / 30);
        const soNamTrucSu = (du240 % 30) || 30; // Số năm/thời gian đóng ở cửa hiện tại
        const rotatedDoors = rotateArray(BAT_MON_LIST, batMonStep % 8);

        for (let i = 0; i < 8; i++) {
            const pal = BAT_QUAI_PALACES[i];
            const gateName = rotatedDoors[i];
            const isTrucSu = (i === 0);

            res.push({
                thanIdx: pal.thanIdx,
                name: isTrucSu ? `Cửa ${gateName} (Trực Sự - ${soNamTrucSu} năm)` : `Cửa ${gateName}`,
                class: isTrucSu ? "bat-mon-truc-su" : "bat-mon-phu",
                gateName: gateName,
                isTrucSu: isTrucSu,
                soNamTrucSu: isTrucSu ? soNamTrucSu : null
            });
        }

        return res;
    }

    calcThaiTue() {
        const cucChiIdx = ((this.cucNum || (this.kyDu % 72) || 72) - 1) % 12;
        const thanIdx = CHI_TO_THAN_IDX[cucChiIdx];
        return { thanIdx, class: 'thai-tue', name: 'Thái Tuế' };
    }

    getAllStars() {
        const thaiAt = this.calcThaiAt();
        const vanXuong = this.calcVanXuong();
        const keThan = this.calcKeThan();
        const thaiTue = this.calcThaiTue();
        const thaiTueIdx = thaiTue.thanIdx;
        const keDinh = this.calcKeDinh(thaiTueIdx, vanXuong.thanIdx);
        const thuyKich = this.calcThuyKich(vanXuong.thanIdx, keThan.thanIdx);
        const tuongStars = this.calcDaiTuongAndThamTuong(thaiAt.thanIdx, vanXuong.thanIdx, thuyKich.thanIdx);
        
        // Add Thái Tuế and Thần Hợp explicitly
        const THAN_HOP_MAP = { 0:12, 1:10, 2:9, 3:15, 4:8, 5:6, 6:5, 7:11, 8:4, 9:2, 10:1, 11:7, 12:0, 13:14, 14:13, 15:3 };
        const thanHopIdx = THAN_HOP_MAP[thaiTueIdx] !== undefined ? THAN_HOP_MAP[thaiTueIdx] : thaiTueIdx;

        const thaiTueStar = { thanIdx: thaiTueIdx, name: "Thái Tuế", class: "other-stars", unique: "thai_tue" };
        const thanHopStar = { thanIdx: thanHopIdx, name: "Thần Hợp", class: "other-stars", unique: "than_hop" };

        const all = [
            thaiAt, vanXuong, keThan, keDinh, thuyKich,
            thaiTueStar, thanHopStar,
            ...tuongStars,
            ...this.calcCoPhucDu(),
            ...this.calcTuThanKy(),
            ...this.calcCuuTinh(),
            ...this.calcOtherStars(),
            ...this.calcBatMon8()
        ];
        
        // Populate Placement Map with strict deduplication per palace
        const placement = { "trung_cung": [] };
        THAP_LUC_THAN.forEach(t => placement[t.id] = []);
        const seenInPalace = {};
        
        all.forEach(s => {
            if (!s || s.thanIdx === undefined) return;
            const targetKey = s.thanIdx === -1 ? "trung_cung" : (THAP_LUC_THAN[s.thanIdx] ? THAP_LUC_THAN[s.thanIdx].id : null);
            if (!targetKey) return;
            
            if (!seenInPalace[targetKey]) seenInPalace[targetKey] = new Set();
            const starKey = s.unique || s.name;
            
            if (!seenInPalace[targetKey].has(starKey) || s.name.startsWith("Cửa ")) {
                seenInPalace[targetKey].add(starKey);
                placement[targetKey].push(s);
            }
        });
        
        const chuTuongStar = tuongStars.find(s => s.class === "chu-tuong" && s.name.startsWith("Đại Tướng"));
        const khachTuongStar = tuongStars.find(s => s.class === "khach-tuong" && s.name.startsWith("Đại Tướng"));
        const ctIdx = chuTuongStar ? chuTuongStar.thanIdx : -1;
        const ktIdx = khachTuongStar ? khachTuongStar.thanIdx : -1;
        
        return {
            placement, 
            flat: all, 
            core: { taIdx: thaiAt.thanIdx, vxIdx: vanXuong.thanIdx, tkIdx: thuyKich.thanIdx, ctIdx, ktIdx }
        };
    }
}


// ==========================================
// 3. MODE IMPLEMENTATIONS
// ==========================================
function isPalaceHarmony(palaceIdx, toanVal) {
    const DUONG_CUNGS = [3, 7, 9, 5]; // Kiền(3), Cấn(7), Chấn(9), Khảm(5)
    const isDuongCung = DUONG_CUNGS.includes(palaceIdx);
    const isToanChan = (toanVal % 2 === 0);

    if (isDuongCung && !isToanChan) return false; // BẤT HÒA
    if (!isDuongCung && isToanChan) return false; // BẤT HÒA
    return true; // HÒA
}

function evaluateThaiAtVerdict(taIdx, vxIdx, tkIdx, toanChuVal, toanKhachVal, batHungStr) {
    if (batHungStr && batHungStr.includes("Yểm")) {
        return "YỂM — Giặc đánh úp, âm thịnh dương suy, mặt trời bị che lấp!";
    }
    if (batHungStr && batHungStr.includes("Kích")) {
        return "KÍCH — Bề tôi phản nghịch, quân địch áp sát!";
    }
    if (batHungStr && batHungStr.includes("Tù")) {
        return "TÙ — Quân vương bị giam lỏng, nguy cơ cướp ngôi!";
    }

    const isTaHoa = isPalaceHarmony(taIdx, toanChuVal);
    const isNmHoa = isPalaceHarmony(vxIdx, toanKhachVal);

    if (!isTaHoa && !isNmHoa) {
        return "BẤT HÒA — Khí nghịch, âm dương đối lập, vạn sự trái với lẽ tự nhiên.";
    }
    if (!isTaHoa) {
        return "THÁI ẤT BẤT HÒA — Vận khí bị trệ, cần thận trọng tích trữ lực lượng.";
    }
    if (!isNmHoa) {
        return "NHỊ MỤC BẤT HÒA — Kế sách mưu lược có trở ngại, phe Khách hành sự trái nghịch.";
    }
    return "HÒA HỢP — Âm dương điều hòa, vạn sự hanh thông.";
}

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
        
        // PRD Chuẩn: Số tháng đã qua tính từ mốc tháng 11 năm trước (Thiên Chính, Chi Tuất index 10)
        // Công thức theo sách Giải Mã Thái Ất: soThangDaQua = (thangChiIdx - 10 + 12) % 12 + 1
        const soThangDaQua = (thangChiIdx - 10 + 12) % 12 + 1;

        // Tích Tháng = (kyDuNam - 1) * 12 + soThangDaQua + 2 (2 tháng Thiên Chính & Địa Chính)
        this.tichThang = ((kyDuNam - 1) * 12) + soThangDaQua + 2;

        let kyDuThang = this.tichThang % 360;
        if (kyDuThang === 0) kyDuThang = 360;
        this.kyDu = kyDuThang;

        // 2. Định Âm Cục và Dương Cục:
        // Theo chuẩn Thái Ất Thần Kinh, Tuế Kế, Nguyệt Kế, Nhật Kế LUÔN DÙNG DƯƠNG ĐỘN (Âm Độn 72 khối chỉ dành cho Thời Kế).
        this.isDuongDon = true;

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
        // Theo chuẩn Thái Ất Thần Kinh, Nhật Kế LUÔN DÙNG DƯƠNG ĐỘN (Âm Độn 72 khối chỉ dành cho Thời Kế).
        this.isDuongDon = true;

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

function calculateThaiAtChart(mode, year, month, day, hour, engineType = "classic") {
    // Mode Bypass for Dich & Menh
    if (mode === "dich") return calculateQueDich(year, month, day, hour);
    if (mode === "menh") return calculateNhanMenh(year, month, day, hour);
    
    let factory;
    if (mode === "tue") factory = new TueKeEngine(year, month, day, hour);
    else if (mode === "nguyet") factory = new NguyetKeEngine(year, month, day, hour);
    else if (mode === "nhat") factory = new NhatKeEngine(year, month, day, hour);
    else factory = new ThoiKeEngine(year, month, day, hour);
    
    let astroInfo = null;
    let engCurrent, engNext;
    
    if (engineType === "astronomical" && typeof ThaiAtAstronomicalEngine !== "undefined" && typeof AstroVSOP87 !== "undefined") {
        const eph = AstroVSOP87.calculateEphemeris(new Date(year, month - 1, day, hour, 0, 0));
        astroInfo = {
            jd: eph.JD,
            deltaDYear: (eph.T * 100 * (12.0 - 11.8618) * 30).toFixed(1),
            calibratedTichNien: Math.floor((factory.tueTich || 10155943) - eph.T * 100 * 4.14),
            calibratedKyDu: Math.floor(((factory.tueTich || 10155943) - eph.T * 100 * 4.14) % 360),
            solarLongitude: eph.sun.longitude,
            equationOfTime: (eph.sun.longitude - eph.sun.trueLongitude) * 4
        };
        
        const baseTich = factory.tueTich || 10155943;
        const isDuong = (factory.getEngine && factory.getEngine(0)) ? factory.getEngine(0).isDuongDon : true;
        engCurrent = new ThaiAtAstronomicalEngine(baseTich, baseTich % 360, isDuong, factory.namCanIdx, factory.tuTru, year, month, day, hour, 0);
        engNext = new ThaiAtAstronomicalEngine(baseTich + 1, (baseTich + 1) % 360, isDuong, factory.namCanIdx, factory.tuTru, year + 1, month, day, hour, 0);
    } else {
        engCurrent = factory.getEngine(0);
        engNext = factory.getEngine(1);
    }
    
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
    
    // Cửa Trực Sự (Bát Môn) - Chu kỳ 240, 30 đơn vị 1 cung
    let batMonTich = factory.tueTich;
    if (mode === 'nguyet' && engCurrent.kyDuThang !== undefined) batMonTich = engCurrent.kyDuThang;
    else if (mode === 'nhat' && engCurrent.soNgay !== undefined) batMonTich = engCurrent.soNgay;
    else if (mode === 'thoi' && engCurrent.soGio !== undefined) batMonTich = engCurrent.soGio;

    const batMonStep = Math.floor(((batMonTich !== undefined ? batMonTich : factory.tueTich) % 240) / 30);
    const batMonStr = BAT_MON[batMonStep % 8];
    
    // Sao Trực Sự (Cửu Tinh) - Synchronized with Engine Trực Phù Star
    let cuuTinhStr = engCurrent.trucSuTpStarName;
    if (!cuuTinhStr) {
        const cuuTinhStep = Math.floor((factory.tueTich % 90) / 10);
        cuuTinhStr = CUU_TINH[cuuTinhStep % 9];
    }
    
    // Export Toán numbers & Kế values for UI
    const chuToanObj = ThaiAtBaseEngine.getToanUnified(currRes.core.vxIdx, currRes.core.taIdx);
    const khachToanObj = ThaiAtBaseEngine.getToanUnified(currRes.core.tkIdx, currRes.core.taIdx);
    const toanChuRawVal = chuToanObj.raw;
    const toanChuVal = chuToanObj.val;
    const toanKhachRawVal = khachToanObj.raw;
    const toanKhachVal = khachToanObj.val;
    
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
    const keDinhStar = currRes.flat.find(s => s.name === "Kế Định");
    const keDinhIdx = keDinhStar ? keDinhStar.thanIdx : 4;
    const toanDinhObj = ThaiAtBaseEngine.getToanUnified(keDinhIdx, currRes.core.taIdx);
    const toanDinhRawVal = toanDinhObj.raw;
    const toanDinhVal = toanDinhObj.val;
    
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

        // 1. YỂM: Thái Ất và Thủy Kích đồng cung (Ví dụ: Năm 2026 đồng cung Cấn)
        if (taIdx !== -1 && taIdx === tkIdx) {
            activeHung.push("Yểm (Thái Ất và Thủy Kích đồng cung)");
        }

        // 2. KÍCH: Thủy Kích áp sát trước hoặc sau Thái Ất 1 cung
        if (taIdx !== -1 && tkIdx !== -1 && taIdx !== tkIdx) {
            const diff = Math.abs(taIdx - tkIdx);
            if (diff === 1 || diff === 15) {
                activeHung.push("Kích (Thủy Kích áp sát Thái Ất)");
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

        // 5. TÙ: Thái Ất, Văn Xương và Đại Tướng Chủ CÙNG ĐÓNG TẠI 1 CUNG (Đồng Cung)
        if (taIdx !== -1 && taIdx === currRes.core.vxIdx && taIdx === ctIdx) {
            activeHung.push("Tù (Thái Ất, Văn Xương và Đại Tướng Chủ đồng cung)");
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
        verdict: evaluateThaiAtVerdict(currRes.core.taIdx, currRes.core.vxIdx, currRes.core.tkIdx, toanChuVal, toanKhachVal, evalBatHung()),
        toanProperties: {
            chu: ThaiAtBaseEngine.analyzeToanFull(toanChuRawVal, currRes.core ? currRes.core.ctIdx : -1, 'chu_toan'),
            khach: ThaiAtBaseEngine.analyzeToanFull(toanKhachRawVal, currRes.core ? currRes.core.ktIdx : -1, 'khach_toan'),
            dinh: ThaiAtBaseEngine.analyzeToanFull(toanDinhRawVal, keDinhIdx, 'dinh_toan'),
            thaiAt: ThaiAtBaseEngine.analyzeToanFull(toanChuRawVal, currRes.core ? currRes.core.taIdx : -1, 'thai_at')
        },
        luanDoanData: luanDoanData,
        khoiSo: factory.khoiSo,
        tinhChatKhoi: factory.tinhChatKhoi,
        astroInfo: astroInfo
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

if (typeof window === 'undefined') {
    global.ThaiAtBaseEngine = ThaiAtBaseEngine;
    global.NguyetKeEngine = NguyetKeEngine;
    global.TueKeEngine = TueKeEngine;
    global.NhatKeEngine = NhatKeEngine;
    global.ThoiKeEngine = ThoiKeEngine;
    global.calculateThaiAtChart = calculateThaiAtChart;
    global.rotateArray = rotateArray;
    global.getTuTru = (typeof getTuTru !== 'undefined') ? getTuTru : null;
    global.CUNG_TO_THAN_IDX = CUNG_TO_THAN_IDX;
    global.CHI_TO_THAN_IDX = CHI_TO_THAN_IDX;
    global.THAP_LUC_THAN = THAP_LUC_THAN;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        calculateThaiAtChart,
        TueKeEngine,
        NguyetKeEngine,
        NhatKeEngine,
        ThoiKeEngine,
        ThaiAtBaseEngine,
        THAP_LUC_THAN,
        CUNG_TO_THAN_IDX,
        CHI_TO_THAN_IDX
    };
}
