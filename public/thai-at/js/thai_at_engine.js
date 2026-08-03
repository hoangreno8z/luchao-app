/**
 * Core Thái Ất Engine — V3.0
 * Tất cả công thức dựa CHÍNH XÁC trên tài liệu "Hoàng Thái Ất" & "Thái Ất Thần Kinh" (quy tắc_nén.pdf)
 * 
 * QUY TẮC CỐT LÕI:
 * - Tuế Tích = 10,153,917 + Năm Dương Lịch
 * - Vòng Kỷ Dư = Tuế Tích % 360
 * - Cục Số = Tuế Tích % 72 (1-36: Dương Cục, 37-72: Âm Cục)
 * - Thái Ất: KỷDư % 24, rồi lấy dư chia 3 (lưu 3 năm/cung, đi qua 8 cung)
 * - Văn Xương: KỷDư % 18, khởi Thân, đếm thuận 16 Thần (Kiền/Khôn lưu 2 toán)
 * - Kế Thần: KỷDư % 12, khởi Dần đi ngược qua 12 Chi
 * - Thủy Kích: Kế Thần giả định = Cấn, đếm khoảng cách đến Văn Xương, an từ Cấn thật
 */

// ========== CONSTANTS ==========

const THUONG_CO_EPOCH = 10153917;

// 16 Thần vòng ngoài sa bàn (thứ tự thuận kim đồng hồ khởi từ Thân)
const THAP_LUC_THAN = [
    { idx: 0,  id: "than",   name: "Thân",  element: "Kim",  elementKey: "kim",  direction: "Tây Nam",   palaceNum: 7, isDwell: false },
    { idx: 1,  id: "dau",    name: "Dậu",   element: "Kim",  elementKey: "kim",  direction: "Chính Tây", palaceNum: 7, isDwell: false },
    { idx: 2,  id: "tuat",   name: "Tuất",  element: "Thổ",  elementKey: "tho",  direction: "Tây Bắc",   palaceNum: 6, isDwell: false },
    { idx: 3,  id: "kien",   name: "Kiền",  element: "Kim",  elementKey: "kim",  direction: "Tây Bắc góc", palaceNum: 6, isDwell: true },
    { idx: 4,  id: "hoi",    name: "Hợi",   element: "Thủy", elementKey: "thuy", direction: "Tây Bắc",   palaceNum: 6, isDwell: false },
    { idx: 5,  id: "ty",     name: "Tý",    element: "Thủy", elementKey: "thuy", direction: "Chính Bắc", palaceNum: 1, isDwell: false },
    { idx: 6,  id: "suu",    name: "Sửu",   element: "Thổ",  elementKey: "tho",  direction: "Đông Bắc",  palaceNum: 8, isDwell: false },
    { idx: 7,  id: "can",    name: "Cấn",   element: "Thổ",  elementKey: "tho",  direction: "Đông Bắc góc", palaceNum: 8, isDwell: true },
    { idx: 8,  id: "dan",    name: "Dần",   element: "Mộc",  elementKey: "moc",  direction: "Đông Bắc",  palaceNum: 8, isDwell: false },
    { idx: 9,  id: "mao",    name: "Mão",   element: "Mộc",  elementKey: "moc",  direction: "Chính Đông", palaceNum: 3, isDwell: false },
    { idx: 10, id: "thin",   name: "Thìn",  element: "Thổ",  elementKey: "tho",  direction: "Đông Nam",  palaceNum: 4, isDwell: false },
    { idx: 11, id: "ton",    name: "Tốn",   element: "Mộc",  elementKey: "moc",  direction: "Đông Nam góc", palaceNum: 4, isDwell: true },
    { idx: 12, id: "ty_chi", name: "Tị",    element: "Hỏa",  elementKey: "hoa",  direction: "Đông Nam",  palaceNum: 9, isDwell: false },
    { idx: 13, id: "ngo",    name: "Ngọ",   element: "Hỏa",  elementKey: "hoa",  direction: "Chính Nam", palaceNum: 9, isDwell: false },
    { idx: 14, id: "mui",    name: "Mùi",   element: "Thổ",  elementKey: "tho",  direction: "Tây Nam",   palaceNum: 2, isDwell: false },
    { idx: 15, id: "khon",   name: "Khôn",  element: "Thổ",  elementKey: "tho",  direction: "Tây Nam góc", palaceNum: 2, isDwell: true }
];

// Bảng tra Văn Xương: 18 bước (Kiền lưu 2 toán, Khôn lưu 2 toán) → vị trí trong THAP_LUC_THAN
// Bước 1=Thân, 2=Dậu, 3=Tuất, 4=Kiền(lưu1), 5=Kiền(lưu2), 6=Hợi, 7=Tý, 8=Sửu,
// 9=Cấn, 10=Dần, 11=Mão, 12=Thìn, 13=Tốn, 14=Tị, 15=Ngọ, 16=Mùi, 17=Khôn(lưu1), 18=Khôn(lưu2)
const VAN_XUONG_MAP = [
    15, // step 18 (remainder 0) → Khôn (idx 15)
    0,  // step 1  → Thân (idx 0)
    1,  // step 2  → Dậu (idx 1)
    2,  // step 3  → Tuất (idx 2)
    3,  // step 4  → Kiền (idx 3, lưu 1)
    3,  // step 5  → Kiền (idx 3, lưu 2)
    4,  // step 6  → Hợi (idx 4)
    5,  // step 7  → Tý (idx 5)
    6,  // step 8  → Sửu (idx 6)
    7,  // step 9  → Cấn (idx 7)
    8,  // step 10 → Dần (idx 8)
    9,  // step 11 → Mão (idx 9)
    10, // step 12 → Thìn (idx 10)
    11, // step 13 → Tốn (idx 11)
    12, // step 14 → Tị (idx 12)
    13, // step 15 → Ngọ (idx 13)
    14, // step 16 → Mùi (idx 14)
    15  // step 17 → Khôn (idx 15, lưu 1)
];

// Bảng tra Kế Thần: KỷDư % 12, khởi Dần đi ngược qua 12 Chi
// Bước 1=Dần, 2=Sửu, 3=Tý, 4=Hợi, 5=Tuất, 6=Dậu, 7=Thân, 8=Mùi, 9=Ngọ, 10=Tị, 11=Thìn, 12=Mão
const KE_THAN_MAP = [
    9,  // step 12 (remainder 0) → Mão (idx 9)
    8,  // step 1  → Dần (idx 8)
    6,  // step 2  → Sửu (idx 6)
    5,  // step 3  → Tý (idx 5)
    4,  // step 4  → Hợi (idx 4)
    2,  // step 5  → Tuất (idx 2)
    1,  // step 6  → Dậu (idx 1)
    0,  // step 7  → Thân (idx 0)
    14, // step 8  → Mùi (idx 14)
    13, // step 9  → Ngọ (idx 13)
    12, // step 10 → Tị (idx 12)
    10  // step 11 → Thìn (idx 10)
];

// Quỹ đạo 8 cung Thái Ất (KHÁC Lạc Thư: đây là thứ tự riêng của Thái Ất)
// Dương Độn (thuận): Kiền(1) → Ly(2) → Cấn(3) → Chấn(4) → Tốn(5) → Khôn(6) → Đoài(7) → Khảm(8)
// Ánh xạ vào THAP_LUC_THAN index: Kiền=3, Ly(Ngọ)=13, Cấn=7, Chấn(Mão)=9, Tốn=11, Khôn=15, Đoài(Dậu)=1, Khảm(Tý)=5
const DUONG_DON_PATH = [3, 13, 7, 9, 11, 15, 1, 5]; // Kiền→Ly→Cấn→Chấn→Tốn→Khôn→Đoài→Khảm
// Âm Độn (nghịch): Kiền(1) → Khảm(2) → Đoài(3) → Khôn(4) → Tốn(5) → Chấn(6) → Cấn(7) → Ly(8)
const AM_DON_PATH = [3, 5, 1, 15, 11, 9, 7, 13]; // Kiền→Khảm→Đoài→Khôn→Tốn→Chấn→Cấn→Ly

// 8 Cửa Bát Môn
const BAT_MON = ["Khai", "Hưu", "Sinh", "Thương", "Đỗ", "Cảnh", "Tử", "Kinh"];

// Cửu Tinh
const CUU_TINH = ["Thiên Bồng", "Thiên Nhuế", "Thiên Xung", "Thiên Phụ", "Thiên Cầm", "Thiên Tâm", "Thiên Trụ", "Thiên Nhậm", "Thiên Ương"];


// ========== CORE HELPER FUNCTIONS ==========

/**
 * Tính Tuế Tích và Vòng Kỷ Dư
 */
function getTueTichKyDu(year) {
    const tueTich = THUONG_CO_EPOCH + year;
    const kyDu = tueTich % 360;
    return { tueTich, kyDu };
}

/**
 * Tính Cục Số (1-72) và xác định Dương/Âm Cục
 */
function getCucSo(tueTich) {
    let cucNum = tueTich % 72;
    if (cucNum === 0) cucNum = 72;
    const isDuongCuc = cucNum <= 36;
    return { cucNum, isDuongCuc, cucName: isDuongCuc ? `Dương Cục ${cucNum}` : `Âm Cục ${cucNum - 36}` };
}

/**
 * Tính vị trí THÁI ẤT trên sa bàn
 * Công thức: KỷDư ÷ 24 lấy dư (R), rồi R ÷ 3 → số cung đã trọn, dư = năm thứ mấy trong cung hiện tại
 * 8 cung x 3 năm = 24 năm/vòng
 */
function calcThaiAt(kyDu, isDuongCuc) {
    let R = kyDu % 24;
    if (R === 0) R = 24;
    
    const palaceIndex = Math.floor((R - 1) / 3); // 0-based index (0-7)
    const yearInPalace = ((R - 1) % 3) + 1; // Năm thứ mấy trong cung (1, 2, 3)
    
    const path = isDuongCuc ? DUONG_DON_PATH : AM_DON_PATH;
    const thanIdx = path[palaceIndex];
    
    return {
        thanIdx: thanIdx,
        than: THAP_LUC_THAN[thanIdx],
        palaceIndex: palaceIndex + 1, // 1-based cung thứ mấy
        yearInPalace: yearInPalace,
        debug: `KỷDư ${kyDu} ÷ 24 = dư ${R}; ${R} ÷ 3 = ${Math.floor(R/3)} dư ${R%3}; Cung thứ ${palaceIndex + 1}`
    };
}

/**
 * Tính vị trí VĂN XƯƠNG (Thiên Mục / Mắt Trời)
 * Công thức: KỷDư % 18, khởi đếm từ Thân, đếm thuận qua 16 Thần (Kiền & Khôn lưu 2 toán → tổng 18 bước)
 */
function calcVanXuong(kyDu) {
    const remainder = kyDu % 18;
    const thanIdx = VAN_XUONG_MAP[remainder];
    
    return {
        thanIdx: thanIdx,
        than: THAP_LUC_THAN[thanIdx],
        debug: `KỷDư ${kyDu} % 18 = ${remainder} → ${THAP_LUC_THAN[thanIdx].name}`
    };
}

/**
 * Tính vị trí KẾ THẦN
 * Công thức: KỷDư % 12, khởi đếm từ Dần, đi NGƯỢC qua 12 Chi
 */
function calcKeThan(kyDu) {
    const remainder = kyDu % 12;
    const thanIdx = KE_THAN_MAP[remainder];
    
    return {
        thanIdx: thanIdx,
        than: THAP_LUC_THAN[thanIdx],
        debug: `KỷDư ${kyDu} % 12 = ${remainder} → ${THAP_LUC_THAN[thanIdx].name}`
    };
}

/**
 * Tính vị trí THỦY KÍCH (Địa Mục / Mắt Đất)
 * Quy tắc: Lấy vị trí Kế Thần giả định = Cấn (idx 7), đếm khoảng cách từ Kế Thần đến Văn Xương,
 *           rồi áp khoảng cách đó từ Cấn thật ra vị trí Thủy Kích.
 */
function calcThuyKich(vanXuongIdx, keThanIdx) {
    const CAN_IDX = 7; // Cấn thực tế ở idx 7 trong THAP_LUC_THAN
    
    // Khoảng cách thuận (clockwise) từ Kế Thần đến Văn Xương trên vòng 16 Thần
    const distance = (vanXuongIdx - keThanIdx + 16) % 16;
    
    // An Thủy Kích: đi từ Cấn thật (idx 7) thuận chiều kim đồng hồ bằng khoảng cách vừa tính
    const thuyKichIdx = (CAN_IDX + distance) % 16;
    
    return {
        thanIdx: thuyKichIdx,
        than: THAP_LUC_THAN[thuyKichIdx],
        distance: distance,
        debug: `Khoảng cách KT→VX = ${distance}; Cấn(7) + ${distance} = ${thuyKichIdx} → ${THAP_LUC_THAN[thuyKichIdx].name}`
    };
}

/**
 * Tính Chủ/Khách Toán
 * Đếm tổng số Cửu Cung Lạc Thư từ Start đến End (thuận).
 * Nếu Start trùng End, Toán = 1.
 */
const LAC_THU_NUMS = [
    2, // 0: Thân (Tây Nam)
    7, // 1: Dậu (Tây)
    6, // 2: Tuất (Tây Bắc)
    6, // 3: Kiền
    6, // 4: Hợi
    1, // 5: Tý (Bắc)
    8, // 6: Sửu (Đông Bắc)
    8, // 7: Cấn
    8, // 8: Dần
    3, // 9: Mão (Đông)
    4, // 10: Thìn (Đông Nam)
    4, // 11: Tốn
    9, // 12: Tị (Tạm tính Nam/Đông Nam, Tị cung 4 hoặc 9 tùy lưu phái. Chuẩn Thái Ất: Tị=9)
    9, // 13: Ngọ (Nam)
    2, // 14: Mùi (Tây Nam)
    2  // 15: Khôn
];

function calcToanSum(startIdx, endIdx) {
    if (startIdx === endIdx) return 1;
    let sum = 0;
    let i = startIdx;
    let count = 0;
    while(true) {
        sum += LAC_THU_NUMS[i];
        if (i === endIdx) break;
        i = (i + 1) % 16;
        count++;
        if (count > 20) break; // Infinite loop guard
    }
    return sum;
}

function calcChuToan(vanXuongIdx, thaiAtIdx) {
    return calcToanSum(vanXuongIdx, thaiAtIdx);
}

function calcKhachToan(thuyKichIdx, thaiAtIdx) {
    return calcToanSum(thuyKichIdx, thaiAtIdx);
}

const CUNG_TO_THAN_IDX = {
    1: 5,  // Khảm (Tý)
    2: 15, // Khôn
    3: 9,  // Chấn (Mão)
    4: 11, // Tốn
    5: -1, // Trung Cung
    6: 3,  // Kiền
    7: 1,  // Đoài (Dậu)
    8: 7,  // Cấn
    9: 13  // Ly (Ngọ)
};

// 12 Địa Chi (Tý đến Hợi) mapped to THAP_LUC_THAN index
const CHI_TO_THAN_IDX = [5, 6, 8, 9, 10, 12, 13, 14, 0, 1, 2, 4]; // Tý=0, Sửu=1, Dần=2... Hợi=11

/**
 * Tính Đại Tướng
 * Đếm số bước bằng (Toán) từ vị trí khởi điểm (Văn Xương/Thủy Kích).
 */
function calcChuDaiTuong(vanXuongIdx, chuToan) {
    const idx = (vanXuongIdx + chuToan - 1) % 16;
    return { thanIdx: idx, than: THAP_LUC_THAN[idx] };
}

function calcKhachDaiTuong(thuyKichIdx, khachToan) {
    const idx = (thuyKichIdx + khachToan - 1) % 16;
    return { thanIdx: idx, than: THAP_LUC_THAN[idx] };
}

/**
 * Tính Tam Cơ (Quân Cơ, Thần Cơ, Dân Cơ)
 */
function calcTamCo(kyDu, tueTich) {
    // Quân Cơ: (Tuế Tích + 250) % 360 ÷ 30, khởi Ngọ đếm thuận
    const quanCoRaw = (tueTich + 250) % 360;
    const quanCoStep = Math.floor(quanCoRaw / 30);
    const quanCoIdx = (13 + quanCoStep) % 16; // Ngọ = idx 13
    
    // Thần Cơ: dư Quân Cơ % 36 ÷ 3, khởi Ngọ
    const thanCoStep = Math.floor((quanCoRaw % 36) / 3);
    const thanCoIdx = (13 + thanCoStep) % 16;
    
    // Dân Cơ: dư Quân Cơ % 12, khởi Tuất (idx 2)
    const danCoStep = quanCoRaw % 12;
    const danCoIdx = (2 + danCoStep) % 16;
    
    return {
        quanCo: { thanIdx: quanCoIdx, than: THAP_LUC_THAN[quanCoIdx] },
        thanCo: { thanIdx: thanCoIdx, than: THAP_LUC_THAN[thanCoIdx] },
        danCo:  { thanIdx: danCoIdx,  than: THAP_LUC_THAN[danCoIdx] }
    };
}

/**
 * Tính Ngũ Phúc
 * (Tuế Tích + 115) % 225 ÷ 45, di chuyển qua 5 trạm: Kiền → Cấn → Tốn → Khôn → Trung Cung
 */
function calcNguPhuc(tueTich) {
    const step = Math.floor(((tueTich + 115) % 225) / 45);
    const stationIdxs = [3, 7, 11, 15, -1]; // Kiền, Cấn, Tốn, Khôn, Trung Cung (-1)
    const stationNames = ["Kiền", "Cấn", "Tốn", "Khôn", "Trung Cung"];
    const stIdx = step % 5;
    return {
        thanIdx: stationIdxs[stIdx],
        stationName: stationNames[stIdx],
        isTrungCung: stIdx === 4
    };
}

/**
 * Tính Đại Du, Tiểu Du
 */
function calcDu(tueTich, kyDu) {
    // Đại Du: (Tuế Tích + 34) % 288 ÷ 36, khởi 7 đi 8 cung (7,8,9,1,2,3,4,6)
    const DD_PATH = [7, 8, 9, 1, 2, 3, 4, 6];
    const ddStep = Math.floor(((tueTich + 34) % 288) / 36);
    const daiDuCung = DD_PATH[ddStep % 8];
    
    // Tiểu Du: Kỷ Dư % 24 ÷ 3, khởi 1 đi 8 cung (1,2,3,4,6,7,8,9)
    const TD_PATH = [1, 2, 3, 4, 6, 7, 8, 9];
    const tdStep = Math.floor((kyDu % 24) / 3);
    const tieuDuCung = TD_PATH[tdStep % 8];
    
    return {
        daiDu: { cung: daiDuCung, thanIdx: CUNG_TO_THAN_IDX[daiDuCung] },
        tieuDu: { cung: tieuDuCung, thanIdx: CUNG_TO_THAN_IDX[tieuDuCung] }
    };
}

/**
 * Tham Chủ, Tham Khách
 */
function calcThamTuong(chuToan, khachToan) {
    const tcCung = ((chuToan % 10) * 3) % 10;
    const tkCung = ((khachToan % 10) * 3) % 10;
    return {
        thamChu: { cung: tcCung, thanIdx: CUNG_TO_THAN_IDX[tcCung] },
        thamKhach: { cung: tkCung, thanIdx: CUNG_TO_THAN_IDX[tkCung] }
    };
}

/**
 * Tính Tứ Thần, Thiên Ất, Địa Ất, Trực Phù
 */
function calcNhomTuThan(tueTich) {
    const step = Math.floor((tueTich % 360 % 36) / 3);
    const getCung = (start, step) => ((start + step - 1) % 9) + 1;
    return {
        tuThan: getCung(1, step),
        thienAt: getCung(6, step),
        diaAt: getCung(9, step),
        trucPhu: getCung(5, step)
    };
}

/**
 * Thanh Long, Thái Âm
 */
function calcThanhLongThaiAm(tueTich) {
    const step = Math.floor((tueTich % 360 % 36) / 3);
    // Dần=2, Tuất=10 in CHI_TO_THAN_IDX
    const tlIdx = CHI_TO_THAN_IDX[(2 + step) % 12];
    const taIdx = CHI_TO_THAN_IDX[(10 + step) % 12];
    return { thanhLong: tlIdx, thaiAm: taIdx };
}

/**
 * 9 Sao Trực Phù
 */
function calc9SaoTrucPhu(tueTich, namCanIdx) {
    const du90 = (tueTich % 900) % 90;
    let nhom = Math.ceil(du90 / 10);
    if (du90 === 0) nhom = 9;
    const trucPhuStarNum = nhom;
    const CAN_CUNG_MAP = [0, 9, 8, 7, 1, 2, 3, 4, 5, 6]; // Mậu=1, Kỷ=2...
    const startCung = CAN_CUNG_MAP[namCanIdx] || 1; // Default to 1 if Giáp(0)
    
    const results = [];
    let currentCung = startCung;
    for (let i = 0; i < 9; i++) {
        let starNum = trucPhuStarNum + i;
        if (starNum > 9) starNum -= 9;
        results.push({
            starNum: starNum,
            name: CUU_TINH[starNum - 1],
            cung: currentCung,
            thanIdx: CUNG_TO_THAN_IDX[currentCung]
        });
        currentCung = (currentCung % 9) + 1;
    }
    return results;
}

/**
 * Xích Kỳ, Hắc Kỳ
 */
function calcCoKhac(tueTich) {
    const XK_PATH = [4, 0, 12, 8]; // Hợi, Thân, Tị, Dần
    const xkStep = ((tueTich + 1) % 40) % 4;
    const xichKy = XK_PATH[xkStep % 4];
    
    const hkStep = Math.floor((((tueTich + 25) % 360) % 36) / 3);
    const hkIdx = (11 - hkStep + 12) % 12; // Lùi từ Hợi (11)
    const hacKy = CHI_TO_THAN_IDX[hkIdx];
    
    return { xichKy, hacKy };
}

/**
 * Văn Xương Cửu Tinh
 */
function calcVanXuong9Sao(tueTich, namCanIdx) {
    const vxStep = Math.floor((tueTich % 270) / 30);
    const trucSuSao = (vxStep % 9) + 1;
    const CAN_CUNG_MAP = [0, 9, 8, 7, 1, 2, 3, 4, 5, 6];
    const cung = CAN_CUNG_MAP[namCanIdx] || 1;
    const NAMES = ["Bài Văn", "Huyền Phượng", "Minh Duy", "Âm Đức", "Chiêu Dao", "Thừa Minh", "Huyền Vũ", "Huyền Minh", "Hùng Minh"];
    return { name: NAMES[trucSuSao - 1], cung, thanIdx: CUNG_TO_THAN_IDX[cung] };
}

/**
 * Bát Môn
 */
function calcBatMon(tueTich) {
    const step = Math.floor((tueTich % 240) / 30);
    return BAT_MON[step % 8];
}

/**
 * Cửu Tinh Quý Thần
 */
function calcCuuTinhQuyThan(kyDu) {
    const du9 = (kyDu + 3) % 9;
    let trucSu = (1 - (du9 - 1) + 9) % 9;
    if (trucSu === 0) trucSu = 9;
    if (du9 === 0) trucSu = 2; // (1 - 8 + 9)%9
    
    const QT_NAMES = ["Thái Nhất", "Nhiếp Đề", "Hiên Viên", "Chiêu Dao", "Thiên Phù", "Thanh Long", "Hàm Trì", "Thái Âm", "Thiên Hoàng"];
    const QUY_DAO = [-1, 6, 7, 8, 9, 1, 2, 3, 4]; // -1 is trung cung
    const results = [];
    let curStar = trucSu;
    for (let i = 0; i < 9; i++) {
        const cung = QUY_DAO[i];
        results.push({
            name: QT_NAMES[curStar - 1],
            cung: cung,
            thanIdx: cung === -1 ? -1 : CUNG_TO_THAN_IDX[cung]
        });
        curStar = (curStar % 9) + 1;
    }
    return results;
}

/**
 * Các Sao Lẻ Khác
 */
function calcOtherStars(kyDu, tueTich) {
    const TT_PATH = [4, 8, 6, 2];
    const thienTonCung = TT_PATH[kyDu % 4];
    
    const HOANG_PATH = [0, 1, 2, 3, 3, 4, 5, 6, 7, 7, 8, 9, 10, 11, 11, 12, 13, 14, 15, 15];
    let hoangStep = kyDu % 20 || 20;
    const thienHoangIdx = HOANG_PATH[hoangStep - 1];
    
    let thoiStep = kyDu % 12 || 12;
    const thienThoiIdx = CHI_TO_THAN_IDX[(2 + thoiStep - 1) % 12]; // Dần=2
    
    const DEPHU_PATH = [2, 3, 4, 5, 5, 6, 7, 8, 9, 9, 10, 11, 12, 13, 13, 14, 15, 0, 1, 1];
    let dePhuStep = kyDu % 20 || 20;
    const dePhuIdx = DEPHU_PATH[dePhuStep - 1];
    
    const phiDieuCung = kyDu % 9 || 9;
    
    const NGU_HANH_PATH = [0, 1, 8, 3, 9, 7, 2, 4, 6, 5];
    const nguHanhCung = NGU_HANH_PATH[kyDu % 9 || 9];
    
    const BPHONG_PATH = [0, 2, 3, 4, 5, 6, 7, 8, 9, 1];
    const batPhongCung = BPHONG_PATH[kyDu % 9 || 9];
    
    const TP_PATH = [0, 3, 7, 2, 6, 1, 5, 9, 4, 8];
    const tamPhongCung = TP_PATH[((tueTich % 360) % 90) % 9 || 9];
    
    const NP_PATH = [0, 1, 3, 5, 7, 9, 2, 4, 6, 8];
    const nguPhongCung = NP_PATH[((tueTich % 360) % 90) % 9 || 9];
    
    return {
        thienTon: { cung: thienTonCung, thanIdx: CUNG_TO_THAN_IDX[thienTonCung] },
        thienHoang: { thanIdx: thienHoangIdx },
        thienThoi: { thanIdx: thienThoiIdx },
        dePhu: { thanIdx: dePhuIdx },
        phiDieu: { cung: phiDieuCung, thanIdx: CUNG_TO_THAN_IDX[phiDieuCung] },
        nguHanh: { cung: nguHanhCung, thanIdx: CUNG_TO_THAN_IDX[nguHanhCung] },
        batPhong: { cung: batPhongCung, thanIdx: CUNG_TO_THAN_IDX[batPhongCung] },
        tamPhong: { cung: tamPhongCung, thanIdx: CUNG_TO_THAN_IDX[tamPhongCung] },
        nguPhong: { cung: nguPhongCung, thanIdx: CUNG_TO_THAN_IDX[nguPhongCung] }
    };
}

/**
 * Kiểm tra Bát Hung (8 thế hung hiểm)
 */
function checkBatHung(thaiAtIdx, vanXuongIdx, thuyKichIdx, chuTuongIdx, khachTuongIdx) {
    const results = [];
    
    // 1. Ếm: Thủy Kích trùng cung Thái Ất
    if (thuyKichIdx === thaiAtIdx) results.push("Ếm (Thủy Kích trùng Thái Ất — Tai họa xâm lăng lớn)");
    
    // 2. Ép: Văn Xương liền kề Thái Ất
    const dist_VX_TA = Math.abs(vanXuongIdx - thaiAtIdx);
    if (dist_VX_TA === 1 || dist_VX_TA === 15) results.push("Ép (Văn Xương liền kề Thái Ất — Bị bức ép)");
    
    // 3. Kích: Thủy Kích liền kề Thái Ất
    const dist_TK_TA = Math.abs(thuyKichIdx - thaiAtIdx);
    if (dist_TK_TA === 1 || dist_TK_TA === 15) results.push("Kích (Thủy Kích liền kề Thái Ất — Bị công kích)");
    
    // 4. Bế Tính: Chủ Tướng trùng Khách Tướng
    if (chuTuongIdx === khachTuongIdx) results.push("Bế Tính (Chủ Khách Tướng trùng nhau — Bế tắc)");
    
    // 5. Tù: Văn Xương trùng cung Thái Ất
    if (vanXuongIdx === thaiAtIdx) results.push("Tù (Văn Xương trùng Thái Ất — Chủ bị giam cầm)");
    
    // 6. Cách: Thái Ất cách Văn Xương đúng 8 cung (đối diện)
    const dist_TA_VX = (vanXuongIdx - thaiAtIdx + 16) % 16;
    if (dist_TA_VX === 8) results.push("Cách (Thái Ất đối diện Văn Xương — Ngăn cách)");
    
    // 7. Đối: Thủy Kích đối diện Văn Xương (cách 8 cung)
    const dist_TK_VX = (thuyKichIdx - vanXuongIdx + 16) % 16;
    if (dist_TK_VX === 8) results.push("Đối (Thủy Kích đối diện Văn Xương — Chủ Khách đối đầu)");
    
    // 8. Đề Hiệp: Cả Văn Xương và Thủy Kích đều liền kề Thái Ất
    if ((dist_VX_TA === 1 || dist_VX_TA === 15) && (dist_TK_TA === 1 || dist_TK_TA === 15)) {
        results.push("Đề Hiệp (Cả Chủ & Khách ép sát Thái Ất — Thiên tử bị uy hiếp)");
    }
    
    return results.length > 0 ? results.join("; ") : "Bình hòa — Không phạm Bát Hung";
}


// ========== MAIN CALCULATION FUNCTIONS FOR 6 MODES ==========

/**
 * TUẾ KỂ (Lập Quẻ Năm) — LUÔN DÙNG DƯƠNG ĐỘN (Theo Thái Ất Thần Kinh)
 */
function calculateTueKe(year, month, day, hour) {
    const tuTru = getTuTru(year, month, day, hour);
    const solarTerm = getExactSolarTerm(year, month, day, hour);
    const { tueTich, kyDu } = getTueTichKyDu(year);
    const { cucNum, cucName } = getCucSo(tueTich);
    // Tuế Kể luôn Dương Độn
    const donType = "Dương Độn (Tuế Kể)";
    const isDuongCuc = true;

    // 1. Thái Ất
    const thaiAt = calcThaiAt(kyDu, isDuongCuc);
    // 2. Văn Xương
    const vanXuong = calcVanXuong(kyDu);
    // 3. Kế Thần
    const keThan = calcKeThan(kyDu);
    // 4. Thủy Kích
    const thuyKich = calcThuyKich(vanXuong.thanIdx, keThan.thanIdx);
    // 5. Chủ/Khách Toán
    const chuToan = calcChuToan(vanXuong.thanIdx, thaiAt.thanIdx);
    const khachToan = calcKhachToan(thuyKich.thanIdx, thaiAt.thanIdx);
    // 6. Đại Tướng
    const chuDaiTuong = calcChuDaiTuong(vanXuong.thanIdx, chuToan);
    const khachDaiTuong = calcKhachDaiTuong(thuyKich.thanIdx, khachToan);
    // 7. Các sao mới thêm
    const tamCo = calcTamCo(kyDu, tueTich);
    const nguPhuc = calcNguPhuc(tueTich);
    const duStars = calcDu(tueTich, kyDu);
    const thamTuong = calcThamTuong(chuToan, khachToan);
    const tuThanGroup = calcNhomTuThan(tueTich);
    const tltaGroup = calcThanhLongThaiAm(tueTich);
    const saoTrucPhu9 = calc9SaoTrucPhu(tueTich, tuTru.year.canIdx);
    const coKhac = calcCoKhac(tueTich);
    const vanXuong9 = calcVanXuong9Sao(tueTich, tuTru.year.canIdx);
    const batMonThe = calcBatMon(tueTich);
    const quyThan = calcCuuTinhQuyThan(kyDu);
    const otherStars = calcOtherStars(kyDu, tueTich);
    
    // 9. Bát Hung
    const batHung = checkBatHung(thaiAt.thanIdx, vanXuong.thanIdx, thuyKich.thanIdx, chuDaiTuong.thanIdx, khachDaiTuong.thanIdx);

    // Build placement map
    const placement = {};
    THAP_LUC_THAN.forEach(t => placement[t.id] = []);
    placement["trung_cung"] = []; // Added for Trung Cung
    
    const addToMap = (thanIdx, obj) => {
        if (thanIdx === -1) placement["trung_cung"].push(obj);
        else placement[THAP_LUC_THAN[thanIdx].id].push(obj);
    };

    addToMap(thaiAt.thanIdx, { name: `Thái Ất (Cung ${thaiAt.palaceIndex}, Năm ${thaiAt.yearInPalace})`, class: "thai-at" });
    addToMap(vanXuong.thanIdx, { name: "Văn Xương (Thiên Mục)", class: "van-xuong" });
    addToMap(keThan.thanIdx, { name: "Kế Thần", class: "ke-than" });
    addToMap(thuyKich.thanIdx, { name: "Thủy Kích (Địa Mục)", class: "thuy-kich" });
    addToMap(chuDaiTuong.thanIdx, { name: `Đại Tướng Chủ (Toán ${chuToan})`, class: "chu-tuong" });
    addToMap(khachDaiTuong.thanIdx, { name: `Đại Tướng Khách (Toán ${khachToan})`, class: "khach-tuong" });
    addToMap(tamCo.quanCo.thanIdx, { name: "Quân Cơ", class: "quan-co" });
    addToMap(tamCo.thanCo.thanIdx, { name: "Thần Cơ", class: "than-co" });
    addToMap(tamCo.danCo.thanIdx, { name: "Dân Cơ", class: "dan-co" });
    addToMap(nguPhuc.thanIdx, { name: "Ngũ Phúc", class: "ngu-phuc" });
    
    addToMap(duStars.daiDu.thanIdx, { name: "Đại Du (Du Lớn)", class: "dai-du" });
    addToMap(duStars.tieuDu.thanIdx, { name: "Tiểu Du (Thái Nhất)", class: "tieu-du" });
    addToMap(thamTuong.thamChu.thanIdx, { name: "Tham Tướng Chủ", class: "chu-tuong" });
    addToMap(thamTuong.thamKhach.thanIdx, { name: "Tham Tướng Khách", class: "khach-tuong" });
    
    addToMap(CUNG_TO_THAN_IDX[tuThanGroup.tuThan], { name: "Tứ Thần", class: "tu-than" });
    addToMap(CUNG_TO_THAN_IDX[tuThanGroup.thienAt], { name: "Thiên Ất", class: "tu-than" });
    addToMap(CUNG_TO_THAN_IDX[tuThanGroup.diaAt], { name: "Địa Ất", class: "tu-than" });
    addToMap(CUNG_TO_THAN_IDX[tuThanGroup.trucPhu], { name: "Trực Phù", class: "tu-than" });
    
    addToMap(tltaGroup.thanhLong, { name: "Thanh Long", class: "tu-than" });
    addToMap(tltaGroup.thaiAm, { name: "Thái Âm", class: "tu-than" });
    
    saoTrucPhu9.forEach(s => addToMap(s.thanIdx, { name: s.name + " (TP)", class: "truc-phu" }));
    
    addToMap(coKhac.xichKy, { name: "Xích Kỳ (Cờ Đỏ)", class: "co-khac" });
    addToMap(coKhac.hacKy, { name: "Hắc Kỳ (Cờ Đen)", class: "co-khac" });
    
    addToMap(vanXuong9.thanIdx, { name: vanXuong9.name + " (B.Văn)", class: "van-xuong-9" });
    
    quyThan.forEach(s => addToMap(s.thanIdx, { name: s.name + " (QT)", class: "quy-than" }));
    
    addToMap(otherStars.thienTon.thanIdx, { name: "Thiên Tôn", class: "other-stars" });
    addToMap(otherStars.thienHoang.thanIdx, { name: "Thiên Hoàng", class: "other-stars" });
    addToMap(otherStars.thienThoi.thanIdx, { name: "Thiên Thời", class: "other-stars" });
    addToMap(otherStars.dePhu.thanIdx, { name: "Đế Phù", class: "other-stars" });
    addToMap(otherStars.phiDieu.thanIdx, { name: "Phi Điểu", class: "other-stars" });
    addToMap(otherStars.nguHanh.thanIdx, { name: "Ngũ Hành", class: "other-stars" });
    addToMap(otherStars.batPhong.thanIdx, { name: "Bát Phong", class: "other-stars" });
    addToMap(otherStars.tamPhong.thanIdx, { name: "Tam Phong", class: "other-stars" });
    addToMap(otherStars.nguPhong.thanIdx, { name: "Ngũ Phong", class: "other-stars" });

    // Verdict
    const chuElement = vanXuong.than.elementKey;
    const khachElement = thuyKich.than.elementKey;
    let verdict = luanDoanNguHanh(chuElement, khachElement);

    return {
        modeName: "Tuế Kể (Lập Quẻ Năm)",
        tuTru,
        solarTerm: solarTerm.name,
        tueTich, kyDu,
        donCucName: `${donType} — ${cucName} (Cục ${cucNum}/72)`,
        batMon: batMonThe,
        cuuTinh: CUU_TINH[cucNum % 9],
        placement,
        batHung,
        verdict,
        nguPhucStation: nguPhuc.stationName,
        debug: {
            thaiAt: thaiAt.debug,
            vanXuong: vanXuong.debug,
            keThan: keThan.debug,
            thuyKich: thuyKich.debug,
            chuToan, khachToan
        }
    };
}

/**
 * NGUYỆT KỂ (Lập Quẻ Tháng) — KHÔNG DÙNG CỤC ÂM, luôn đi thuận
 */
function calculateNguyetKe(year, month, day, hour) {
    const tuTru = getTuTru(year, month, day, hour);
    const solarTerm = getExactSolarTerm(year, month, day, hour);
    
    // Lấy Kỷ Dư năm TRƯỚC
    const { kyDu: kyDuPrevYear } = getTueTichKyDu(year - 1);
    // Tổng Toán Tháng = (Kỷ Dư năm trước × 12) + số tháng đã trôi qua từ tháng 11 ÂL (tháng Tý) năm trước
    const elapsedMonths = month + 2; // Tháng 11 ÂL ~ tháng 11 DL năm trước, nên tháng 1 DL = +2
    const totalMonths = (kyDuPrevYear * 12) + elapsedMonths;
    
    const kyDuMonth = totalMonths % 360;
    let cucNum = totalMonths % 72;
    if (cucNum === 0) cucNum = 72;
    
    // Nguyệt Kể LUÔN dùng Dương Độn
    const thaiAt = calcThaiAt(kyDuMonth, true);
    const vanXuong = calcVanXuong(kyDuMonth);
    const keThan = calcKeThan(kyDuMonth);
    const thuyKich = calcThuyKich(vanXuong.thanIdx, keThan.thanIdx);
    const chuToan = calcChuToan(vanXuong.thanIdx, thaiAt.thanIdx);
    const khachToan = calcKhachToan(thuyKich.thanIdx, thaiAt.thanIdx);
    const chuDaiTuong = calcChuDaiTuong(vanXuong.thanIdx, chuToan);
    const khachDaiTuong = calcKhachDaiTuong(thuyKich.thanIdx, khachToan);
    const tamCo = calcTamCo(kyDuMonth, totalMonths);
    const batHung = checkBatHung(thaiAt.thanIdx, vanXuong.thanIdx, thuyKich.thanIdx, chuDaiTuong.thanIdx, khachDaiTuong.thanIdx);

    const placement = {};
    THAP_LUC_THAN.forEach(t => placement[t.id] = []);
    placement[thaiAt.than.id].push({ name: "Thái Ất", class: "thai-at" });
    placement[vanXuong.than.id].push({ name: "Văn Xương", class: "van-xuong" });
    placement[keThan.than.id].push({ name: "Kế Thần", class: "ke-than" });
    placement[thuyKich.than.id].push({ name: "Thủy Kích", class: "thuy-kich" });
    placement[chuDaiTuong.than.id].push({ name: `Chủ Đại Tướng`, class: "chu-tuong" });
    placement[khachDaiTuong.than.id].push({ name: `Khách Đại Tướng`, class: "khach-tuong" });
    placement[tamCo.quanCo.than.id].push({ name: "Quân Cơ", class: "quan-co" });
    placement[tamCo.thanCo.than.id].push({ name: "Thần Cơ", class: "than-co" });
    placement[tamCo.danCo.than.id].push({ name: "Dân Cơ", class: "dan-co" });

    return {
        modeName: "Nguyệt Kể (Lập Quẻ Tháng)",
        tuTru, solarTerm: solarTerm.name,
        donCucName: `Dương Độn (Nguyệt Kể chỉ đi thuận) — Cục ${cucNum}`,
        batMon: BAT_MON[cucNum % 8],
        cuuTinh: CUU_TINH[cucNum % 9],
        placement, batHung,
        verdict: luanDoanNguHanh(vanXuong.than.elementKey, thuyKich.than.elementKey)
    };
}

/**
 * NHẬT KỂ (Lập Quẻ Ngày) — KHÔNG DÙNG CỤC ÂM, luôn đi thuận
 * Mốc tính Cục: đếm số ngày từ Giáp Tý đầu tiên sau Đông Chí
 */
function calculateNhatKe(year, month, day, hour) {
    const tuTru = getTuTru(year, month, day, hour);
    const solarTerm = getExactSolarTerm(year, month, day, hour);
    const dCC = getCanChiDay(year, month, day);
    
    // Tích Nhật (dùng Julian Day - jdInt)
    const tichNhat = dCC.jdInt || 0;
    const kyDuDay = tichNhat % 360;
    let cucNum = tichNhat % 72;
    if (cucNum === 0) cucNum = 72;
    
    // Nhật Kể LUÔN dùng Dương Độn
    const thaiAt = calcThaiAt(kyDuDay, true);
    const vanXuong = calcVanXuong(kyDuDay);
    const keThan = calcKeThan(kyDuDay);
    const thuyKich = calcThuyKich(vanXuong.thanIdx, keThan.thanIdx);
    const chuToan = calcChuToan(vanXuong.thanIdx, thaiAt.thanIdx);
    const khachToan = calcKhachToan(thuyKich.thanIdx, thaiAt.thanIdx);
    const chuDaiTuong = calcChuDaiTuong(vanXuong.thanIdx, chuToan);
    const khachDaiTuong = calcKhachDaiTuong(thuyKich.thanIdx, khachToan);
    const tamCo = calcTamCo(kyDuDay, tichNhat);
    const batHung = checkBatHung(thaiAt.thanIdx, vanXuong.thanIdx, thuyKich.thanIdx, chuDaiTuong.thanIdx, khachDaiTuong.thanIdx);

    const placement = {};
    THAP_LUC_THAN.forEach(t => placement[t.id] = []);
    placement[thaiAt.than.id].push({ name: "Thái Ất", class: "thai-at" });
    placement[vanXuong.than.id].push({ name: "Văn Xương", class: "van-xuong" });
    placement[keThan.than.id].push({ name: "Kế Thần", class: "ke-than" });
    placement[thuyKich.than.id].push({ name: "Thủy Kích", class: "thuy-kich" });
    placement[chuDaiTuong.than.id].push({ name: "Chủ Đại Tướng", class: "chu-tuong" });
    placement[khachDaiTuong.than.id].push({ name: "Khách Đại Tướng", class: "khach-tuong" });
    placement[tamCo.quanCo.than.id].push({ name: "Quân Cơ", class: "quan-co" });
    placement[tamCo.thanCo.than.id].push({ name: "Thần Cơ", class: "than-co" });
    placement[tamCo.danCo.than.id].push({ name: "Dân Cơ", class: "dan-co" });

    return {
        modeName: "Nhật Kể (Lập Quẻ Ngày)",
        tuTru, solarTerm: solarTerm.name,
        donCucName: `Dương Độn (Nhật Kể chỉ đi thuận) — Cục ${cucNum}`,
        batMon: BAT_MON[cucNum % 8],
        cuuTinh: CUU_TINH[cucNum % 9],
        placement, batHung,
        verdict: luanDoanNguHanh(vanXuong.than.elementKey, thuyKich.than.elementKey)
    };
}

/**
 * THỜI KỂ (Lập Quẻ Giờ) — Theo Tiết khí phân Dương/Âm
 */
function calculateThoiKe(year, month, day, hour) {
    const tuTru = getTuTru(year, month, day, hour);
    const solarTerm = getExactSolarTerm(year, month, day, hour);
    const isYang = (solarTerm.longitude >= 270 || solarTerm.longitude < 90);
    
    const dCC = getCanChiDay(year, month, day);
    const hCC = tuTru.hour;
    
    // Tổng toán giờ: kết hợp Can ngày và Chi giờ (dùng JD)
    const tichGio = (dCC.jdInt || 0) * 12 + hCC.chiIdx;
    const kyDuGio = tichGio % 360;
    let cucNum = tichGio % 72;
    if (cucNum === 0) cucNum = 72;
    
    const thaiAt = calcThaiAt(kyDuGio, isYang);
    const vanXuong = calcVanXuong(kyDuGio);
    const keThan = calcKeThan(kyDuGio);
    const thuyKich = calcThuyKich(vanXuong.thanIdx, keThan.thanIdx);
    const batHung = checkBatHung(thaiAt.thanIdx, vanXuong.thanIdx, thuyKich.thanIdx, 0, 0);

    const placement = {};
    THAP_LUC_THAN.forEach(t => placement[t.id] = []);
    placement[thaiAt.than.id].push({ name: "Thái Ất", class: "thai-at" });
    placement[vanXuong.than.id].push({ name: "Văn Xương", class: "van-xuong" });
    placement[keThan.than.id].push({ name: "Kế Thần", class: "ke-than" });
    placement[thuyKich.than.id].push({ name: "Thủy Kích", class: "thuy-kich" });

    return {
        modeName: "Thời Kể (Lập Quẻ Giờ)",
        tuTru, solarTerm: solarTerm.name,
        donCucName: `${isYang ? "Dương" : "Âm"} Độn — Cục ${cucNum}`,
        batMon: BAT_MON[hCC.chiIdx % 8],
        cuuTinh: CUU_TINH[cucNum % 9],
        placement, batHung,
        verdict: luanDoanNguHanh(vanXuong.than.elementKey, thuyKich.than.elementKey)
    };
}

/**
 * QUẺ DỊCH (64 Quẻ Kinh Dịch Nạp Giáp)
 */
function calculateQueDich(year, month, day, hour) {
    const tuTru = getTuTru(year, month, day, hour);
    const solarTerm = getExactSolarTerm(year, month, day, hour);
    
    const BAT_QUAI = ["Càn", "Đoài", "Ly", "Chấn", "Tốn", "Khảm", "Cấn", "Khôn"];
    const sumToan = tuTru.year.canIdx + tuTru.month.chiIdx + tuTru.day.canIdx + tuTru.day.chiIdx + tuTru.hour.chiIdx;
    const thuongQuai = BAT_QUAI[sumToan % 8];
    const haQuai = BAT_QUAI[(sumToan + tuTru.hour.chiIdx) % 8];
    const haoDong = (sumToan % 6) + 1;

    const placement = {};
    THAP_LUC_THAN.forEach(t => placement[t.id] = []);
    placement["kien"].push({ name: `Thượng: ${thuongQuai}`, class: "thai-at" });
    placement["khon"].push({ name: `Hạ: ${haQuai}`, class: "van-xuong" });
    placement["ngo"].push({ name: `Hào Động ${haoDong}`, class: "thuy-kich" });

    return {
        modeName: "Quẻ Dịch (Kinh Dịch Nạp Giáp)",
        tuTru, solarTerm: solarTerm.name,
        donCucName: `${thuongQuai} trên ${haQuai} — Hào Động ${haoDong}`,
        batMon: `Hào ${haoDong}`,
        cuuTinh: `${thuongQuai}/${haQuai}`,
        placement,
        batHung: `Quẻ biến tại hào ${haoDong}`,
        verdict: `Thượng ${thuongQuai} Hạ ${haQuai}, hào ${haoDong} động. Xét ngũ hành nạp giáp để luận cát hung.`
    };
}

/**
 * BÀN NHÂN MỆNH (Tử Vi Thái Ất — Cung Mệnh Cung Thân)
 */
function calculateNhanMenh(year, month, day, hour) {
    const tuTru = getTuTru(year, month, day, hour);
    const solarTerm = getExactSolarTerm(year, month, day, hour);
    
    const CHI_LIST_LOCAL = ["Tý", "Sửu", "Dần", "Mão", "Thìn", "Tị", "Ngọ", "Mùi", "Thân", "Dậu", "Tuất", "Hợi"];
    
    // Cung Mệnh = (Chi tháng + Chi giờ) % 12
    const menhChiIdx = (tuTru.month.chiIdx + tuTru.hour.chiIdx) % 12;
    // Cung Thân = (Chi tháng + 12 - Chi giờ) % 12
    const thanChiIdx = (tuTru.month.chiIdx + 12 - tuTru.hour.chiIdx) % 12;
    
    const menhName = CHI_LIST_LOCAL[menhChiIdx];
    const thanName = CHI_LIST_LOCAL[thanChiIdx];
    
    const placement = {};
    THAP_LUC_THAN.forEach(t => placement[t.id] = []);
    
    // Tìm Thần tương ứng với Chi
    const menhThan = THAP_LUC_THAN.find(t => t.name === menhName);
    const thanThan = THAP_LUC_THAN.find(t => t.name === thanName);
    if (menhThan) placement[menhThan.id].push({ name: "CUNG MỆNH", class: "thai-at" });
    if (thanThan) placement[thanThan.id].push({ name: "CUNG THÂN", class: "van-xuong" });

    return {
        modeName: "Bàn Nhân Mệnh (Thái Ất Nhân Mệnh)",
        tuTru, solarTerm: solarTerm.name,
        donCucName: `Cung Mệnh: ${menhName} — Cung Thân: ${thanName}`,
        batMon: "Mệnh Thân Song Chiếu",
        cuuTinh: `Mệnh tại ${menhName}, Thân tại ${thanName}`,
        placement,
        batHung: "Xem xét Mệnh Thân trên sa bàn Cửu Cung",
        verdict: `Bản mệnh tọa ${menhName}, thân cung tại ${thanName}. Xét ngũ hành sinh khắc để luận vận mệnh.`
    };
}

/**
 * Luận Đoán Ngũ Hành (Chủ vs Khách)
 */
const NGU_HANH_KHAC = { moc: "tho", hoa: "kim", tho: "thuy", kim: "moc", thuy: "hoa" };
const NGU_HANH_SINH = { moc: "hoa", hoa: "tho", tho: "kim", kim: "thuy", thuy: "moc" };

function luanDoanNguHanh(chuElement, khachElement) {
    if (NGU_HANH_KHAC[chuElement] === khachElement) {
        return "CHỦ THẮNG — Văn Xương khắc chế Thủy Kích. Phe Chủ phòng thủ vững chắc, đắc thế.";
    } else if (NGU_HANH_KHAC[khachElement] === chuElement) {
        return "KHÁCH THẮNG — Thủy Kích khắc chế Văn Xương. Phe Khách tấn công áp đảo.";
    } else if (NGU_HANH_SINH[chuElement] === khachElement || NGU_HANH_SINH[khachElement] === chuElement) {
        return "HÒA HỢP — Chủ Khách tương sinh. Thuận lợi đàm phán, hòa giải, liên minh.";
    } else if (chuElement === khachElement) {
        return "GIẰNG CO — Chủ Khách đồng hành, thế trận cân bằng kéo dài. Cần kiên trì.";
    }
    return "Thế trận cần xét thêm vị trí Đại Tướng và Bát Hung để luận đoán.";
}


// ========== MAIN DISPATCHER ==========

function calculateThaiAtChart(mode, year, month, day, hour) {
    switch (mode) {
        case "tue":    return calculateTueKe(year, month, day, hour);
        case "nguyet": return calculateNguyetKe(year, month, day, hour);
        case "nhat":   return calculateNhatKe(year, month, day, hour);
        case "thoi":   return calculateThoiKe(year, month, day, hour);
        case "dich":   return calculateQueDich(year, month, day, hour);
        case "menh":   return calculateNhanMenh(year, month, day, hour);
        default:       return calculateTueKe(year, month, day, hour);
    }
}
