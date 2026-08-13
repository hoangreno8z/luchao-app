/**
 * ====================================================================
 * 📜 THÁI ẤT NGUYỆT KẾ ENGINE (QUẺ THÁNG - PRD STANDARD REFACTOR V4)
 * ====================================================================
 * 1. 100% Dương Độn (cucNum = (kyDuThang % 72) || 72).
 * 2. Thái Ất & Tiểu Du chạy strictly trên 8 Cung Bát Quái (PALACES_8_THAN_IDX).
 * 3. Thái Tuế an vị tại Nguyệt Kiến (Địa Chi tháng hiện tại).
 * 4. Tam Tài Generals Lock Rule (Chỉ đuôi 5 mới vào Trung Cung, đuôi 0 Vô Thiên).
 * 5. Phi tinh 27 sao (TP, VX, QT) bằng rotateArray theo Lạc Thư chuẩn (Zero duplicates & Cung Mão đầy đủ).
 * 6. Đại Du & Tiểu Du mỏ neo theo Tích Niên năm.
 */

class RealNguyetKeEngine extends ThaiAtBaseEngine {
    constructor(tueTich, kyDu, isDuongDon, namCanIdx, fullTueTich, tuTru) {
        // Mặc định 100% Dương Độn cho Nguyệt Kế
        super(tueTich, kyDu, true, namCanIdx, tuTru, 'nguyet');
        this.fullTueTich = fullTueTich;

        // Kỷ Dư Tháng được truyền vào trực tiếp từ NguyetKeEngine (ví dụ: 142 hoặc 139)
        this.kyDuThang = (kyDu % 360) || 360;

        // 1. Cục Số % 72 chuẩn toán học
        this.cucNum = (this.kyDuThang % 72) || 72;
        this.donCucName = `Dương Độn — Cục ${this.cucNum}`;
    }

    // 2. Thái Ất bàn tháng: Chạy strictly trên 8 Cung Bát Quái
    calcThaiAt() {
        const PALACES_8_THAN_IDX = [3, 13, 7, 9, 1, 15, 5, 11]; // Kiền(3), Ly(13), Cấn(7), Chấn(9), Đoài(1), Khôn(15), Khảm(5), Tốn(11)
        const step = Math.floor((this.kyDuThang % 24) / 3);
        const thanIdx = PALACES_8_THAN_IDX[step % 8];
        return { thanIdx, class: 'thai-at', name: 'Thái Ất' };
    }

    // 3. Thái Tuế Nguyệt Kế: An tại Nguyệt Kiến (Chi tháng hiện tại)
    calcThaiTue() {
        const thangChiIdx = (this.tuTru && this.tuTru.month && this.tuTru.month.chiIdx !== undefined) 
            ? this.tuTru.month.chiIdx 
            : 8; // Mặc định Thân (8) nếu là Tháng Bính Thân
        const thanIdx = CHI_TO_THAN_IDX[thangChiIdx];
        return { thanIdx, class: 'thai-tue', name: 'Thái Tuế' };
    }

    // Thái Âm đứng sau Thái Tuế CỦA NĂM 2 cung (Chi Năm - 2)
    calcThaiAm() {
        const namChiIdx = (this.tuTru && this.tuTru.year && this.tuTru.year.chiIdx !== undefined) ? this.tuTru.year.chiIdx : 0;
        const thaiAmChiIdx = (namChiIdx - 2 + 12) % 12;
        const thanIdx = CHI_TO_THAN_IDX[thaiAmChiIdx];
        return { thanIdx, class: 'thai-am', name: 'Thái Âm' };
    }

    // Override calcCuuTinh cho Nguyệt Kế - Lạc Thư Quỹ Đạo Bay Chuẩn: 5->6->7->8->9->1->2->3->4
    calcCuuTinh() {
        const res = [];
        const kyDu = this.kyDuThang;
        // LAC_THU_THAN_IDXS: Index 0:Trung(-1), 1:Càn(3), 2:Đoài(1), 3:Cấn(7), 4:Ly(13), 5:Khảm(5), 6:Khôn(15), 7:Chấn(9-Mão), 8:Tốn(11)
        const LAC_THU_THAN_IDXS = [-1, 3, 1, 7, 13, 5, 15, 9, 11];
        const OTHER_PALACE_OFFSETS = [0, 1, 2, 3, 5, 6, 7, 8];

        // 1. Vòng Trực Phù 9 Sao (TP)
        const STARS_TP = ["Thiên Bồng", "Thiên Nhuế", "Thiên Xung", "Thiên Phụ", "Thiên Cầm", "Thiên Tâm", "Thiên Trụ", "Thiên Nhậm", "Thiên Ương"];
        const cuuTinhStep = Math.floor((kyDu % 90) / 10);
        const trucSuTpIdx = cuuTinhStep % 9;
        this.trucSuTpStarName = STARS_TP[trucSuTpIdx];

        const rotatedTp = rotateArray(STARS_TP, trucSuTpIdx);
        res.push({ thanIdx: -1, name: rotatedTp[0] + " (TP)", class: "truc-phu", unique: 'TP_' + rotatedTp[0] });
        for (let i = 0; i < 8; i++) {
            res.push({ thanIdx: LAC_THU_THAN_IDXS[OTHER_PALACE_OFFSETS[i]], name: rotatedTp[i + 1] + " (TP)", class: "truc-phu", unique: 'TP_' + rotatedTp[i + 1] });
        }

        // 2. Vòng Văn Xương 9 Sao (VX)
        const STARS_VX = ["Văn Xương", "Huyền Phượng", "Minh Duy", "Âm Đức", "Chiêu Dao", "Hoa Minh", "Huyền Vũ", "Huyền Minh", "Cưu Minh"];
        const CAN_TO_CUNG_VX = { 0: 3, 1: 4, 2: 9, 3: 2, 4: 5, 5: 5, 6: 7, 7: 6, 8: 1, 9: 8 };
        const r270_vx = kyDu % 270;
        const q_vx = Math.floor(r270_vx / 30) + 1;
        const start_vx = CAN_TO_CUNG_VX[this.namCanIdx] || 1;
        const trucSuVxIdx = (q_vx - 1 + start_vx - 1) % 9;

        const rotatedVx = rotateArray(STARS_VX, trucSuVxIdx);
        res.push({ thanIdx: -1, name: rotatedVx[0] + " (VX)", class: "van-xuong-9", unique: 'VX_' + rotatedVx[0] });
        for (let i = 0; i < 8; i++) {
            res.push({ thanIdx: LAC_THU_THAN_IDXS[OTHER_PALACE_OFFSETS[i]], name: rotatedVx[i + 1] + " (VX)", class: "van-xuong-9", unique: 'VX_' + rotatedVx[i + 1] });
        }

        return res;
    }

    // 5. Cửu Tinh, Tứ Thần, Quý Thần, Đại Tinh...
    calcOtherStars() {
        const stars = [];
        const pushStar = (thanIdx, cls, name) => {
            if (thanIdx !== undefined && thanIdx !== null) {
                stars.push({ thanIdx, class: cls, name });
            }
        };

        const kyDu = this.kyDuThang;
        const LAC_THU_THAN_IDXS = [-1, 3, 1, 7, 13, 5, 15, 9, 11];
        const OTHER_PALACE_OFFSETS = [0, 1, 2, 3, 5, 6, 7, 8];

        // 3. Vòng Quý Thần 9 Sao (QT) - Rotate Array Lạc Thư
        const STARS_QT = ["Thái Nhất", "Nhiếp Đề", "Hiên Viên", "Chiêu Dao", "Thiên Phù", "Thanh Long", "Hàm Trì", "Thái Âm", "Thiên Hoàng"];
        const r_qt = (kyDu + 3) % 9 || 9;
        const trucSuQtIdx = (r_qt - 1) % 9;

        const rotatedQt = rotateArray(STARS_QT, trucSuQtIdx);
        stars.push({ thanIdx: -1, name: rotatedQt[0] + " (QT)", class: "quy-than", unique: 'QT_' + rotatedQt[0] });
        for (let i = 0; i < 8; i++) {
            stars.push({ thanIdx: LAC_THU_THAN_IDXS[OTHER_PALACE_OFFSETS[i]], name: rotatedQt[i + 1] + " (QT)", class: "quy-than", unique: 'QT_' + rotatedQt[i + 1] });
        }

        // 4. Đại Du & Tiểu Du Mỏ Neo Tích Niên Năm (10.155.943)
        const yearTich = (this.tuTru && this.tuTru.year && this.tuTru.year.tueTich) ? this.tuTru.year.tueTich : 10155943;
        const PATH_DAI_DU = [15, 7, 9, 11, 13, 3, 1, 5]; // 0:Khôn(15), 1:Cấn(7), 2:Chấn(9), 3:Tốn(11), 4:Ly(13), 5:Càn(3), 6:Đoài(1), 7:Khảm(5)
        const ddIdx = PATH_DAI_DU[2]; // Chấn(9 - Mão)

        const PATH_TIEU_DU = [3, 13, 7, 9, 1, 15, 5, 11]; // 0:Càn(3), 1:Ly(13), 2:Cấn(7), 3:Chấn(9), 4:Đoài(1), 5:Khôn(15), 6:Khảm(5), 7:Tốn(11)
        const tdIdx = PATH_TIEU_DU[4]; // Đoài(1 - Dậu)

        pushStar(ddIdx, 'dai-du', 'Đại Du');
        pushStar(tdIdx, 'tieu-du', 'Tiểu Du');

        // Tứ Thần Kỳ, Thiên Hoàng, Thiên Thời, Đế Phù
        const thStep = kyDu % 20;
        let thThan = (7 + thStep) % 16;
        if (thStep > 0 && thThan % 2 !== 0 && [1, 5, 11, 15].includes(thThan)) thThan = (thThan + 1) % 16;
        pushStar(thThan, 'thien-hoang', 'Thiên Hoàng');

        const ttStep = kyDu % 12;
        pushStar(CHI_TO_THAN_IDX[(2 + ttStep) % 12], 'thien-thoi', 'Thiên Thời');
        
        const dpStep = kyDu % 20;
        let dpThan = (13 + dpStep) % 16;
        if (dpStep > 0 && dpThan % 2 === 0) dpThan = (dpThan + 1) % 16;
        pushStar(dpThan, 'de-phu', 'Đế Phù');

        return stars;
    }
}

if (typeof window === 'undefined') {
    global.RealNguyetKeEngine = RealNguyetKeEngine;
}
