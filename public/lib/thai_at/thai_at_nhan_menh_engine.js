/**
 * ====================================================================
 * 🌟 THÁI ẤT NHÂN MỆNH ENGINE (thai_at_nhan_menh_engine.js)
 * ====================================================================
 * Chuyên trách tính toán Sa Bàn Nhân Mệnh Toàn Diện (Thái Ất Mệnh Pháp):
 * 1. Thập Nhị Cung Vận Mệnh: Mệnh, Thân, Quan, Tài, Phúc, Điền... (Dương Nam/Âm Nữ)
 * 2. Quẻ Vào Đời Lập Nghiệp & Ngày Chịu Khí (Thai Nguyên) & Hào Động
 * 3. Quẻ Hạn Dựng Nghiệp & Quẻ Lưu Niên Từng Năm
 * 4. Tinh Bàn Thái Ất Chiếu Lâm 12 Cung (Thái Ất, Văn Xương, Thủy Kích...)
 * 
 * 100% Native Vanilla JavaScript - 0 Dependencies - Hoàn Toàn Độc Lập.
 */

class ThaiAtNhanMenhEngine {
    // -------------------------------------------------------------------------
    // 1. TÍNH THẬP NHỊ CUNG MỆNH BÀN (MỆNH CUNG & THÂN CUNG)
    // -------------------------------------------------------------------------
    static calculateLifePalaces(yearBranchIdx, monthBranchIdx, dayBranchIdx, hourBranchIdx, sex = "nam") {
        const CHI_NAMES = ["Tý", "Sửu", "Dần", "Mão", "Thìn", "Tị", "Ngọ", "Mùi", "Thân", "Dậu", "Tuất", "Hợi"];
        const TWELVE_PALACE_NAMES = [
            "Mệnh Cung", "Huynh Đệ", "Phu Thê", "Tử Tức", 
            "Tài Bạch", "Điền Trạch", "Quan Lộc", "Nô Bộc", 
            "Tật Ách", "Phúc Đức", "Tướng Mạo", "Phụ Mẫu"
        ];

        // Dương Chi: Tý(0), Dần(2), Thìn(4), Ngọ(6), Thân(8), Tuất(10)
        const isYangYear = (yearBranchIdx % 2 === 0);
        // Dương Nam / Âm Nữ thuận (+1), Âm Nam / Dương Nữ nghịch (-1)
        const forward = (sex === "nam") === isYangYear;
        const step = forward ? 1 : -1;

        // Giải phương trình tìm bước nhảy k trên thiên bàn
        const solve = (targetIdx) => {
            return ((targetIdx - monthBranchIdx) * step + 120) % 12;
        };

        const lifeBranchIdx = (yearBranchIdx + solve(hourBranchIdx)) % 12;
        const bodyBranchIdx = (yearBranchIdx + solve(dayBranchIdx)) % 12;

        // Xếp 12 Cung Vận Mệnh từ Mệnh Cung
        const branchToPalace = {};
        const palaceToBranch = {};

        for (let i = 0; i < 12; i++) {
            const currentBranchIdx = (lifeBranchIdx + i * step + 120) % 12;
            const palaceName = TWELVE_PALACE_NAMES[i];
            branchToPalace[currentBranchIdx] = palaceName;
            palaceToBranch[palaceName] = {
                branchIdx: currentBranchIdx,
                branchName: CHI_NAMES[currentBranchIdx]
            };
        }

        return {
            sex,
            isYangYear,
            forward,
            step,
            lifeBranchIdx,
            lifeBranchName: CHI_NAMES[lifeBranchIdx],
            bodyBranchIdx,
            bodyBranchName: CHI_NAMES[bodyBranchIdx],
            branchToPalace,
            palaceToBranch
        };
    }

    // -------------------------------------------------------------------------
    // 2. HỆ THỐNG QUẺ DỊCH NHÂN MỆNH (VÀO ĐỜI, THAI NGUYÊN, DỰNG NGHIỆP, LƯU NIÊN)
    // -------------------------------------------------------------------------
    static calculateLifeHexagrams(tuTru, year, currentAgeYear = null) {
        // Can/Chi Numbers
        const CAN_NUMS = [11, 11, 9, 9, 15, 15, 13, 13, 7, 7];
        const CHI_NUMS = [7, 15, 11, 11, 15, 9, 9, 15, 13, 13, 15, 7];
        const CAN_NAMES = ["Giáp", "Ất", "Bính", "Đinh", "Mậu", "Kỷ", "Canh", "Tân", "Nhâm", "Quý"];
        const CHI_NAMES = ["Tý", "Sửu", "Dần", "Mão", "Thìn", "Tị", "Ngọ", "Mùi", "Thân", "Dậu", "Tuất", "Hợi"];

        const numNam   = CAN_NUMS[tuTru.year.canIdx]  + CHI_NUMS[tuTru.year.chiIdx];
        const numThang = CAN_NUMS[tuTru.month.canIdx] + CHI_NUMS[tuTru.month.chiIdx];
        const numNgay  = CAN_NUMS[tuTru.day.canIdx]   + CHI_NUMS[tuTru.day.chiIdx];
        const numGio   = CAN_NUMS[tuTru.hour.canIdx]  + CHI_NUMS[tuTru.hour.chiIdx];

        const sumTuTru = numNam + numThang + numNgay + numGio;
        const sumNgayGio = numNgay + numGio;

        // 1. Quẻ Vào Đời Lập Nghiệp: (sumTuTru + 55) % 64
        let queVaoDoiNum = (sumTuTru + 55) % 64;
        if (queVaoDoiNum === 0) queVaoDoiNum = 64;
        const hexVaoDoiObj = HEXAGRAMS_64_DATA[queVaoDoiNum - 1];

        // 2. Tìm Ngày Chịu Khí (Thai Nguyên): (sumNgayGio + 55) % 60
        let soHan = (sumNgayGio + 55) % 60;
        if (soHan === 0) soHan = 60;

        const LUC_THAP_HOA_GIAP = [];
        for (let i = 0; i < 60; i++) {
            LUC_THAP_HOA_GIAP.push(`${CAN_NAMES[i % 10]} ${CHI_NAMES[i % 12]}`);
        }

        let ngaySinhIdx = 0;
        for (let i = 0; i < 60; i++) {
            if (i % 10 === tuTru.day.canIdx && i % 12 === tuTru.day.chiIdx) {
                ngaySinhIdx = i;
                break;
            }
        }

        const thaiNguyenIdx = (ngaySinhIdx - soHan + 600) % 60;
        const thaiNguyenCanChi = LUC_THAP_HOA_GIAP[thaiNguyenIdx];
        const thaiNguyenChiIdx = thaiNguyenIdx % 12;
        const thaiNguyenChiName = CHI_NAMES[thaiNguyenChiIdx];
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

        // 3. Quẻ Hạn Dựng Nghiệp (Biến quái)
        const lines6Bien = [...hexVaoDoiObj.lines];
        lines6Bien[haoDongVaoDoi - 1] = lines6Bien[haoDongVaoDoi - 1] === 1 ? 0 : 1;
        const hexBienObj = HEXAGRAMS_64_DATA.find(h => 
            h.lines.every((v, i) => v === lines6Bien[i])
        ) || hexVaoDoiObj;

        // 4. Quẻ Lưu Niên theo Tuổi Mụ
        const currentYear = currentAgeYear || new Date().getFullYear();
        const tuoiMu = Math.max(1, currentYear - year + 1);
        let queNamNum = (queVaoDoiNum + tuoiMu) % 64;
        if (queNamNum === 0) queNamNum = 64;
        const hexNamObj = HEXAGRAMS_64_DATA[queNamNum - 1];

        return {
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
    }

    // -------------------------------------------------------------------------
    // 3. TÍNH PHỤ TINH & THẦN SÁT RIÊNG CHO NHÂN MỆNH
    // -------------------------------------------------------------------------
    static calculateDestinyAuxiliaryStars(tuTru) {
        const yCan = tuTru.year.canIdx;
        const yChi = tuTru.year.chiIdx;
        const CHI_NAMES = ["Tý", "Sửu", "Dần", "Mão", "Thìn", "Tị", "Ngọ", "Mùi", "Thân", "Dậu", "Tuất", "Hợi"];

        // 1. Lộc Tồn (Thiên Lộc) theo Niên Can: Giáp-Dần(2), Ất-Mão(3), Bính Mậu-Tị(5), Đinh Kỷ-Ngọ(6), Canh-Thân(8), Tân-Dậu(9), Nhâm-Hợi(11), Quý-Tý(0)
        const LOC_TON_MAP = [2, 3, 5, 6, 5, 6, 8, 9, 11, 0];
        const locTonIdx = LOC_TON_MAP[yCan];

        // 2. Kình Dương (trước Lộc Tồn 1 cung) & Đà La (sau Lộc Tồn 1 cung)
        const kinhDuongIdx = (locTonIdx + 1) % 12;
        const daLaIdx = (locTonIdx - 1 + 12) % 12;

        // 3. Thiên Mã (theo Tam Hợp Chi Năm): Dần Ngọ Tuất -> Thân(8), Thân Tý Thìn -> Dần(2), Tị Dậu Sửu -> Hợi(11), Hợi Mão Mùi -> Tị(5)
        let thienMaIdx = 8;
        if ([2, 6, 10].includes(yChi)) thienMaIdx = 8;
        else if ([8, 0, 4].includes(yChi)) thienMaIdx = 2;
        else if ([5, 9, 1].includes(yChi)) thienMaIdx = 11;
        else thienMaIdx = 5;

        // 4. Đào Hoa (theo Tam Hợp Chi Năm)
        let daoHoaIdx = 3;
        if ([2, 6, 10].includes(yChi)) daoHoaIdx = 3;
        else if ([8, 0, 4].includes(yChi)) daoHoaIdx = 9;
        else if ([5, 9, 1].includes(yChi)) daoHoaIdx = 6;
        else daoHoaIdx = 0;

        // 5. Hoa Cái (theo Tam Hợp Chi Năm)
        let hoaCaiIdx = 10;
        if ([2, 6, 10].includes(yChi)) hoaCaiIdx = 10;
        else if ([8, 0, 4].includes(yChi)) hoaCaiIdx = 4;
        else if ([5, 9, 1].includes(yChi)) hoaCaiIdx = 1;
        else hoaCaiIdx = 7;

        // 6. Thiên Ất Quý Nhân (Dương Quý / Âm Quý)
        const DUONG_QUY_MAP = [1, 0, 11, 11, 1, 0, 6, 6, 5, 5]; // Giáp-Sửu, Ất-Tý, Bính-Hợi, Đinh-Hợi, Mậu-Sửu, Kỷ-Tý, Canh-Ngọ, Tân-Ngọ, Nhâm-Tị, Quý-Tị
        const AM_QUY_MAP    = [7, 8, 9, 9, 7, 8, 2, 2, 3, 3];   // Giáp-Mùi, Ất-Thân, Bính-Dậu, Đinh-Dậu, Mậu-Mùi, Kỷ-Thân, Canh-Dần, Tân-Dần, Nhâm-Mão, Quý-Mão
        const duongQuyIdx = DUONG_QUY_MAP[yCan];
        const amQuyIdx = AM_QUY_MAP[yCan];

        const starsByBranch = {};
        for (let i = 0; i < 12; i++) starsByBranch[i] = [];

        const addStar = (bIdx, name, type) => {
            starsByBranch[bIdx].push({ name, type });
        };

        addStar(locTonIdx, "Lộc Tồn (Thiên Lộc)", "cat");
        addStar(kinhDuongIdx, "Kình Dương", "hung");
        addStar(daLaIdx, "Đà La", "hung");
        addStar(thienMaIdx, "Thiên Mã", "cat");
        addStar(daoHoaIdx, "Đào Hoa", "trung");
        addStar(hoaCaiIdx, "Hoa Cái", "cat");
        addStar(duongQuyIdx, "Dương Quý Nhân", "cat");
        addStar(amQuyIdx, "Âm Quý Nhân", "cat");

        return {
            locTonIdx,
            kinhDuongIdx,
            daLaIdx,
            thienMaIdx,
            daoHoaIdx,
            hoaCaiIdx,
            duongQuyIdx,
            amQuyIdx,
            starsByBranch
        };
    }

    // -------------------------------------------------------------------------
    // 4. TỔNG HỢP SA BÀN NHÂN MỆNH TOÀN DIỆN
    // -------------------------------------------------------------------------
    static calculateFullNhanMenh(year, month, day, hour, sex = "nam", tuTru = null, currentYear = null) {
        const tuTruData = tuTru || getTuTru(year, month, day, hour);
        const solarTerm = (typeof getExactSolarTerm === "function") ? getExactSolarTerm(year, month, day, hour) : { name: "Lập Xuân" };

        const lifePalaces = this.calculateLifePalaces(
            tuTruData.year.chiIdx,
            tuTruData.month.chiIdx,
            tuTruData.day.chiIdx,
            tuTruData.hour.chiIdx,
            sex
        );

        const lifeHex = this.calculateLifeHexagrams(tuTruData, year, currentYear);
        const destinyAux = this.calculateDestinyAuxiliaryStars(tuTruData);

        const CHI_NAMES = ["Tý", "Sửu", "Dần", "Mão", "Thìn", "Tị", "Ngọ", "Mùi", "Thân", "Dậu", "Tuất", "Hợi"];
        const CHI_ELEMENTS = ["Dương Thủy", "Âm Thổ", "Dương Mộc", "Âm Mộc", "Dương Thổ", "Âm Hỏa", "Dương Hỏa", "Âm Thổ", "Dương Kim", "Âm Kim", "Dương Thổ", "Âm Thủy"];

        // 12 Palaces Mapping
        const palaces12Map = {};
        for (let b = 0; b < 12; b++) {
            const pName = lifePalaces.branchToPalace[b] || "Cung Chi";
            const isMenh = (b === lifePalaces.lifeBranchIdx);
            const isThan = (b === lifePalaces.bodyBranchIdx);

            palaces12Map[b] = {
                branchIdx: b,
                branchName: CHI_NAMES[b],
                element: CHI_ELEMENTS[b],
                palaceName: pName,
                isMenh,
                isThan,
                destinyStars: destinyAux.starsByBranch[b] || []
            };
        }

        return {
            modeName: `Bàn Nhân Mệnh (${sex === 'nam' ? 'Nam Mệnh' : 'Nữ Mệnh'})`,
            tuTru: tuTruData,
            solarTerm: solarTerm.name,
            sex,
            lifePalaces,
            lifeHex,
            destinyAux,
            palaces12Map
        };
    }
}

if (typeof window !== 'undefined') {
    window.ThaiAtNhanMenhEngine = ThaiAtNhanMenhEngine;
}

if (typeof globalThis !== 'undefined') {
    globalThis.ThaiAtNhanMenhEngine = ThaiAtNhanMenhEngine;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ThaiAtNhanMenhEngine };
}
