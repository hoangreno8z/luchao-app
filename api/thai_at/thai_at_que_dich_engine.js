/**
 * ====================================================================
 * ☯️ THÁI ẤT QUẺ DỊCH ENGINE (thai_at_que_dich_engine.js)
 * ====================================================================
 * Chuyên trách tính toán 3 Đại Quẻ Dịch Kinh Điển của Thái Ất Thần Số:
 * 1. Quẻ Thái Tuế (Thái Tuế Lưu Niên Trực Quái) - Chu kỳ 64 Quẻ
 * 2. Quẻ Đại Du (Đại Du Quỹ Vận Trùng Quái) - Chu kỳ 288 năm (Nội 36y, Ngoại 10y)
 * 3. Quẻ Tiểu Du (Tiểu Du Quỹ Vận Trùng Quái) - Chu kỳ 192 năm (Nội 24y, Ngoại 3y)
 * 
 * 100% Native Vanilla JavaScript - 0 Dependencies - Hoàn Toàn Độc Lập.
 */

// 8 Quẻ Đơn Bát Quái
const BAT_QUAI_SINGLE = [
    { id: "kien", name: "Càn",  symbol: "☰", lines: [1, 1, 1], num: 1, element: "kim" },
    { id: "doai", name: "Đoài", symbol: "☱", lines: [1, 1, 0], num: 2, element: "kim" },
    { id: "ly",   name: "Ly",   symbol: "☲", lines: [1, 0, 1], num: 3, element: "hoa" },
    { id: "chan", name: "Chấn", symbol: "☳", lines: [1, 0, 0], num: 4, element: "moc" },
    { id: "ton",  name: "Tốn",  symbol: "☴", lines: [0, 1, 1], num: 5, element: "moc" },
    { id: "kham", name: "Khảm", symbol: "☵", lines: [0, 1, 0], num: 6, element: "thuy" },
    { id: "can",  name: "Cấn",  symbol: "☶", lines: [0, 0, 1], num: 7, element: "tho" },
    { id: "khon", name: "Khôn", symbol: "☷", lines: [0, 0, 0], num: 8, element: "tho" }
];

// Thứ tự 8 Cung Bát Quái Đại Du & Tiểu Du theo Thái Ất Cổ Thư
// Đại Du: Càn, Đoài, Ly, Chấn, Tốn, Khảm, Cấn, Khôn
const DAYOU_BAGUA_ORDER = ["Càn", "Đoài", "Ly", "Chấn", "Tốn", "Khảm", "Cấn", "Khôn"];
// Tiểu Du: Càn, Khảm, Cấn, Chấn, Tốn, Ly, Khôn, Đoài (Lạc Thư phi tinh)
const XIAOYOU_BAGUA_ORDER = ["Càn", "Khảm", "Cấn", "Chấn", "Tốn", "Ly", "Khôn", "Đoài"];

// Bảng 64 Quẻ Kinh Dịch
const HEXAGRAMS_64_DATA = [
    { num: 1,  name: "Bát Thuần Kiền", upper: "Càn", lower: "Càn", lines: [1, 1, 1, 1, 1, 1] },
    { num: 2,  name: "Bát Thuần Khôn", upper: "Khôn", lower: "Khôn", lines: [0, 0, 0, 0, 0, 0] },
    { num: 3,  name: "Thủy Lôi Truân", upper: "Khảm", lower: "Chấn", lines: [1, 0, 0, 0, 1, 0] },
    { num: 4,  name: "Sơn Thủy Mông", upper: "Cấn", lower: "Khảm", lines: [0, 1, 0, 0, 0, 1] },
    { num: 5,  name: "Thủy Thiên Nhu", upper: "Khảm", lower: "Càn", lines: [1, 1, 1, 0, 1, 0] },
    { num: 6,  name: "Thiên Thủy Tụng", upper: "Càn", lower: "Khảm", lines: [0, 1, 0, 1, 1, 1] },
    { num: 7,  name: "Địa Thủy Sư", upper: "Khôn", lower: "Khảm", lines: [0, 1, 0, 0, 0, 0] },
    { num: 8,  name: "Thủy Địa Tỷ", upper: "Khảm", lower: "Khôn", lines: [0, 0, 0, 0, 1, 0] },
    { num: 9,  name: "Phong Thiên Tiểu Súc", upper: "Tốn", lower: "Càn", lines: [1, 1, 1, 0, 1, 1] },
    { num: 10, name: "Thiên Trạch Lý", upper: "Càn", lower: "Đoài", lines: [1, 1, 0, 1, 1, 1] },
    { num: 11, name: "Địa Thiên Thái", upper: "Khôn", lower: "Càn", lines: [1, 1, 1, 0, 0, 0] },
    { num: 12, name: "Thiên Địa Bĩ", upper: "Càn", lower: "Khôn", lines: [0, 0, 0, 1, 1, 1] },
    { num: 13, name: "Thiên Hỏa Đồng Nhân", upper: "Càn", lower: "Ly", lines: [1, 0, 1, 1, 1, 1] },
    { num: 14, name: "Hỏa Thiên Đại Hữu", upper: "Ly", lower: "Càn", lines: [1, 1, 1, 1, 0, 1] },
    { num: 15, name: "Địa Sơn Khiêm", upper: "Khôn", lower: "Cấn", lines: [0, 0, 1, 0, 0, 0] },
    { num: 16, name: "Lôi Địa Dự", upper: "Chấn", lower: "Khôn", lines: [0, 0, 0, 1, 0, 0] },
    { num: 17, name: "Trạch Lôi Tùy", upper: "Đoài", lower: "Chấn", lines: [1, 0, 0, 1, 1, 0] },
    { num: 18, name: "Sơn Phong Cổ", upper: "Cấn", lower: "Tốn", lines: [0, 1, 1, 0, 0, 1] },
    { num: 19, name: "Địa Trạch Lâm", upper: "Khôn", lower: "Đoài", lines: [1, 1, 0, 0, 0, 0] },
    { num: 20, name: "Phong Địa Quan", upper: "Tốn", lower: "Khôn", lines: [0, 0, 0, 0, 1, 1] },
    { num: 21, name: "Hỏa Lôi Phệ Hạp", upper: "Ly", lower: "Chấn", lines: [1, 0, 0, 1, 0, 1] },
    { num: 22, name: "Sơn Hỏa Bí", upper: "Cấn", lower: "Ly", lines: [1, 0, 1, 0, 0, 1] },
    { num: 23, name: "Sơn Địa Bác", upper: "Cấn", lower: "Khôn", lines: [0, 0, 0, 0, 0, 1] },
    { num: 24, name: "Địa Lôi Phục", upper: "Khôn", lower: "Chấn", lines: [1, 0, 0, 0, 0, 0] },
    { num: 25, name: "Thiên Lôi Vô Vọng", upper: "Càn", lower: "Chấn", lines: [1, 0, 0, 1, 1, 1] },
    { num: 26, name: "Sơn Thiên Đại Súc", upper: "Cấn", lower: "Càn", lines: [1, 1, 1, 0, 0, 1] },
    { num: 27, name: "Sơn Lôi Di", upper: "Cấn", lower: "Chấn", lines: [1, 0, 0, 0, 0, 1] },
    { num: 28, name: "Trạch Phong Đại Quá", upper: "Đoài", lower: "Tốn", lines: [0, 1, 1, 1, 1, 0] },
    { num: 29, name: "Bát Thuần Khảm", upper: "Khảm", lower: "Khảm", lines: [0, 1, 0, 0, 1, 0] },
    { num: 30, name: "Bát Thuần Ly", upper: "Ly", lower: "Ly", lines: [1, 0, 1, 1, 0, 1] },
    { num: 31, name: "Trạch Sơn Hàm", upper: "Đoài", lower: "Cấn", lines: [0, 0, 1, 1, 1, 0] },
    { num: 32, name: "Lôi Phong Hằng", upper: "Chấn", lower: "Tốn", lines: [0, 1, 1, 1, 0, 0] },
    { num: 33, name: "Thiên Sơn Độn", upper: "Càn", lower: "Cấn", lines: [0, 0, 1, 1, 1, 1] },
    { num: 34, name: "Lôi Thiên Đại Tráng", upper: "Chấn", lower: "Càn", lines: [1, 1, 1, 1, 0, 0] },
    { num: 35, name: "Hỏa Địa Tấn", upper: "Ly", lower: "Khôn", lines: [0, 0, 0, 1, 0, 1] },
    { num: 36, name: "Địa Hỏa Minh Di", upper: "Khôn", lower: "Ly", lines: [1, 0, 1, 0, 0, 0] },
    { num: 37, name: "Phong Hỏa Gia Nhân", upper: "Tốn", lower: "Ly", lines: [1, 0, 1, 0, 1, 1] },
    { num: 38, name: "Hỏa Trạch Khuê", upper: "Ly", lower: "Đoài", lines: [1, 1, 0, 1, 0, 1] },
    { num: 39, name: "Thủy Sơn Kiển", upper: "Khảm", lower: "Cấn", lines: [0, 0, 1, 0, 1, 0] },
    { num: 40, name: "Lôi Thủy Giải", upper: "Chấn", lower: "Khảm", lines: [0, 1, 0, 1, 0, 0] },
    { num: 41, name: "Sơn Trạch Tổn", upper: "Cấn", lower: "Đoài", lines: [1, 1, 0, 0, 0, 1] },
    { num: 42, name: "Phong Lôi Ích", upper: "Tốn", lower: "Chấn", lines: [1, 0, 0, 0, 1, 1] },
    { num: 43, name: "Trạch Thiên Quải", upper: "Đoài", lower: "Càn", lines: [1, 1, 1, 1, 1, 0] },
    { num: 44, name: "Thiên Phong Cấu", upper: "Càn", lower: "Tốn", lines: [0, 1, 1, 1, 1, 1] },
    { num: 45, name: "Trạch Địa Tụy", upper: "Đoài", lower: "Khôn", lines: [0, 0, 0, 1, 1, 0] },
    { num: 46, name: "Địa Phong Thăng", upper: "Khôn", lower: "Tốn", lines: [0, 1, 1, 0, 0, 0] },
    { num: 47, name: "Trạch Thủy Khốn", upper: "Đoài", lower: "Khảm", lines: [0, 1, 0, 1, 1, 0] },
    { num: 48, name: "Thủy Phong Tỉnh", upper: "Khảm", lower: "Tốn", lines: [0, 1, 1, 0, 1, 0] },
    { num: 49, name: "Trạch Hỏa Cách", upper: "Đoài", lower: "Ly", lines: [1, 0, 1, 1, 1, 0] },
    { num: 50, name: "Hỏa Phong Đỉnh", upper: "Ly", lower: "Tốn", lines: [0, 1, 1, 1, 0, 1] },
    { num: 51, name: "Bát Thuần Chấn", upper: "Chấn", lower: "Chấn", lines: [1, 0, 0, 1, 0, 0] },
    { num: 52, name: "Bát Thuần Cấn", upper: "Cấn", lower: "Cấn", lines: [0, 0, 1, 0, 0, 1] },
    { num: 53, name: "Phong Sơn Tiệm", upper: "Tốn", lower: "Cấn", lines: [0, 0, 1, 0, 1, 1] },
    { num: 54, name: "Lôi Trạch Quy Muội", upper: "Chấn", lower: "Đoài", lines: [1, 1, 0, 1, 0, 0] },
    { num: 55, name: "Lôi Hỏa Phong", upper: "Chấn", lower: "Ly", lines: [1, 0, 1, 1, 0, 0] },
    { num: 56, name: "Hỏa Sơn Lữ", upper: "Ly", lower: "Cấn", lines: [0, 0, 1, 1, 0, 1] },
    { num: 57, name: "Bát Thuần Tốn", upper: "Tốn", lower: "Tốn", lines: [0, 1, 1, 0, 1, 1] },
    { num: 58, name: "Bát Thuần Đoài", upper: "Đoài", lower: "Đoài", lines: [1, 1, 0, 1, 1, 0] },
    { num: 59, name: "Phong Thủy Hoán", upper: "Tốn", lower: "Khảm", lines: [0, 1, 0, 0, 1, 1] },
    { num: 60, name: "Thủy Trạch Tiết", upper: "Khảm", lower: "Đoài", lines: [1, 1, 0, 0, 1, 0] },
    { num: 61, name: "Phong Trạch Trung Phu", upper: "Tốn", lower: "Đoài", lines: [1, 1, 0, 0, 1, 1] },
    { num: 62, name: "Lôi Sơn Tiểu Quá", upper: "Chấn", lower: "Cấn", lines: [0, 0, 1, 1, 0, 0] },
    { num: 63, name: "Thủy Hỏa Ký Tế", upper: "Khảm", lower: "Ly", lines: [1, 0, 1, 0, 1, 0] },
    { num: 64, name: "Hỏa Thủy Vị Tế", upper: "Ly", lower: "Khảm", lines: [0, 1, 0, 1, 0, 1] }
];

class ThaiAtQueDichEngine {
    // -------------------------------------------------------------------------
    // 1. QUẺ THÁI TUẾ (LƯU NIÊN TRỰC QUÁI)
    // -------------------------------------------------------------------------
    static calcQueThaiTue(tueTich, yearChiIdx, yearChiName) {
        let queNum = (tueTich % 64) || 64;
        const hexObj = HEXAGRAMS_64_DATA[queNum - 1];

        const isDuongYear = (yearChiIdx % 2 === 0);
        const yearChiNum = yearChiIdx + 1;

        let haoDong = 1;
        let ruleText = "";

        if (isDuongYear) {
            const duongSeq = [1, 3, 5];
            haoDong = duongSeq[(yearChiNum - 1) % 3];
            ruleText = `Năm Dương (${yearChiName}): Đếm thăng lên Hào Dương (1 ➔ 3 ➔ 5), đếm ${yearChiNum} bước Chi năm ➔ Hào ${haoDong} Động.`;
        } else {
            const amSeq = [6, 4, 2];
            haoDong = amSeq[(yearChiNum - 1) % 3];
            ruleText = `Năm Âm (${yearChiName}): Đếm giáng xuống Hào Âm (6 ➔ 4 ➔ 2), đếm ${yearChiNum} bước Chi năm ➔ Hào ${haoDong} Động.`;
        }

        // Quẻ biến
        const linesBien = [...hexObj.lines];
        linesBien[haoDong - 1] = linesBien[haoDong - 1] === 1 ? 0 : 1;
        const hexBienObj = HEXAGRAMS_64_DATA.find(h => 
            h.lines.every((v, i) => v === linesBien[i])
        ) || hexObj;

        return {
            queNum,
            hexName: hexObj.name,
            lines: hexObj.lines,
            upper: hexObj.upper,
            lower: hexObj.lower,
            haoDong,
            ruleText,
            hexBienNum: hexBienObj.num,
            hexBienName: hexBienObj.name,
            linesBien: hexBienObj.lines
        };
    }

    // -------------------------------------------------------------------------
    // 2. QUẺ ĐẠI DU (ĐẠI DU QUỸ VẬN TRÙNG QUÁI - 288 NĂM)
    // -------------------------------------------------------------------------
    static calcQueDaiDu(tueTich) {
        // A. Đại Du Nội Quái: 288 năm, mỗi quái 36 năm, mỗi hào 6 năm
        const remNei = ((tueTich + 34) % 2880) % 288;
        const qNei = Math.floor(remNei / 36);
        const yearsNei = (remNei % 36) || 36;
        const neiGuaName = DAYOU_BAGUA_ORDER[qNei % 8];
        const neiYao = Math.floor((yearsNei - 1) / 6) + 1;

        // B. Đại Du Ngoại Quái: 640 năm, mỗi quái 10 năm
        const remWai = ((tueTich + 50) % 640) % 80;
        const qWai = Math.floor(remWai / 10);
        const yearsWai = (remWai % 10) || 10;
        const waiGuaName = DAYOU_BAGUA_ORDER[qWai % 8];
        const waiYao = yearsWai === 10 ? 6 : Math.max(1, Math.floor((yearsWai - 1) / 2) + 4);

        // C. Đại Du Trùng Quái: Thượng (Ngoại) + Hạ (Nội)
        const chongHex = HEXAGRAMS_64_DATA.find(h => h.upper === waiGuaName && h.lower === neiGuaName) || HEXAGRAMS_64_DATA[0];

        return {
            neiGua: neiGuaName,
            neiYears: yearsNei,
            neiYao,
            waiGua: waiGuaName,
            waiYears: yearsWai,
            waiYao,
            chongGuaName: chongHex.name,
            chongGuaNum: chongHex.num,
            lines: chongHex.lines,
            keyNote: "Nội quái (Hạ) chủ về khởi nghiệp, nền tảng; Ngoại quái (Thượng) chủ về hưng thịnh suy vi của thời cuộc."
        };
    }

    // -------------------------------------------------------------------------
    // 3. QUẺ TIỂU DU (TIỂU DU QUỸ VẬN TRÙNG QUÁI - 192 NĂM)
    // -------------------------------------------------------------------------
    static calcQueTieuDu(tueTich) {
        // A. Tiểu Du Nội Quái: 192 năm, mỗi quái 24 năm, mỗi hào 4 năm
        const remNei = (tueTich % 1920) % 192;
        const qNei = Math.floor(remNei / 24);
        const yearsNei = (remNei % 24) || 24;
        const neiGuaName = XIAOYOU_BAGUA_ORDER[qNei % 8];
        const neiYao = Math.floor((yearsNei - 1) / 4) + 1;

        // B. Tiểu Du Ngoại Quái: 24 năm, mỗi quái 3 năm (Tam tài)
        const remWai = (tueTich % 360) % 24;
        const qWai = Math.floor(remWai / 3);
        const yearsWai = (remWai % 3) || 3;
        const waiGuaName = XIAOYOU_BAGUA_ORDER[qWai % 8];
        const tamTaiName = ["Lý Thiên (Trời)", "Lý Địa (Đất)", "Lý Nhân (Người)"][yearsWai - 1];

        // C. Tiểu Du Trùng Quái: Thượng (Ngoại) + Hạ (Nội)
        const chongHex = HEXAGRAMS_64_DATA.find(h => h.upper === waiGuaName && h.lower === neiGuaName) || HEXAGRAMS_64_DATA[0];

        return {
            neiGua: neiGuaName,
            neiYears: yearsNei,
            neiYao,
            waiGua: waiGuaName,
            waiYears: yearsWai,
            tamTai: tamTaiName,
            chongGuaName: chongHex.name,
            chongGuaNum: chongHex.num,
            lines: chongHex.lines,
            keyNote: "Tiểu Du biến chuyển theo chu kỳ trung hạn 192 năm, mỗi năm ngoại quái phân định quản Lý Thiên, Lý Địa hoặc Lý Nhân."
        };
    }

    // -------------------------------------------------------------------------
    // 4. TOÀN BỘ BÁO CÁO QUẺ DỊCH THÁI ẤT
    // -------------------------------------------------------------------------
    static calculateAllQueDich(year, month, day, hour, tueTich, tuTru) {
        const yearChiIdx = tuTru.year.chiIdx;
        const yearChiName = tuTru.year.chiName || "Ngọ";

        const thaiTue = this.calcQueThaiTue(tueTich, yearChiIdx, yearChiName);
        const daiDu = this.calcQueDaiDu(tueTich);
        const tieuDu = this.calcQueTieuDu(tueTich);

        return {
            tueTich,
            tuTru,
            thaiTue,
            daiDu,
            tieuDu
        };
    }
}

if (typeof window !== 'undefined') {
    window.ThaiAtQueDichEngine = ThaiAtQueDichEngine;
    window.HEXAGRAMS_64_DATA = HEXAGRAMS_64_DATA;
    window.BAT_QUAI_SINGLE = BAT_QUAI_SINGLE;
}

if (typeof globalThis !== 'undefined') {
    globalThis.ThaiAtQueDichEngine = ThaiAtQueDichEngine;
    globalThis.HEXAGRAMS_64_DATA = HEXAGRAMS_64_DATA;
    globalThis.BAT_QUAI_SINGLE = BAT_QUAI_SINGLE;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ThaiAtQueDichEngine, HEXAGRAMS_64_DATA, BAT_QUAI_SINGLE };
}
