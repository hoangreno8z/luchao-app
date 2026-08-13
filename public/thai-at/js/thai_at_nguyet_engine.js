/**
 * ====================================================================
 * 📜 THÁI ẤT NGUYỆT KẾ ENGINE (QUẺ THÁNG - PRD STANDARD REFACTOR)
 * ====================================================================
 * 1. 100% Dương Độn (Đi thuận).
 * 2. Thái Ất & Tiểu Du chạy strictly trên 8 Cung Bát Quái (PALACES_8_THAN_IDX).
 * 3. Thái Tuế an vị tại Nguyệt Kiến (Địa Chi tháng hiện tại).
 * 4. Tam Tài Generals Lock Rule (Chỉ đuôi 5 mới vào Trung Cung).
 * 5. Phi tinh 27 sao (TP, VX, QT) bằng rotateArray theo Lạc Thư.
 */

class RealNguyetKeEngine extends ThaiAtBaseEngine {
    constructor(tueTich, kyDu, isDuongDon, namCanIdx, fullTueTich, tuTru) {
        // Mặc định 100% Dương Độn cho Nguyệt Kế
        super(tueTich, kyDu, true, namCanIdx, tuTru, 'nguyet');
        this.fullTueTich = fullTueTich;

        // Tính Kỷ Dư Tháng (Monthly Modulo)
        const monthNum = (this.tuTru && this.tuTru.month && this.tuTru.month.lunarMonth) 
            ? this.tuTru.month.lunarMonth 
            : 8;
        const kyDuNam = (this.tuTru && this.tuTru.year && this.tuTru.year.tueTich) 
            ? (this.tuTru.year.tueTich % 360) 
            : (this.kyDu || 1);
            
        const rawKyDuThang = (((kyDuNam - 1) * 12) + monthNum + 2) % 360;
        this.kyDuThang = (rawKyDuThang + 360) % 360 || 360;
        this.cucNum = Math.floor((this.kyDuThang - 1) / 72) + 1;
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

    // 5. Bát Môn, Cửu Tinh, Tứ Thần, Quý Thần, Đại Tinh...
    calcOtherStars() {
        const stars = [];
        const pushStar = (thanIdx, cls, name) => {
            if (thanIdx !== undefined && thanIdx !== null) {
                stars.push({ thanIdx, class: cls, name });
            }
        };

        const kyDu = this.kyDuThang;

        // Vòng Quý Thần 9 Sao (QT) - Rotate Array Lạc Thư
        const STARS_QT = ["Thái Nhất", "Nhiếp Đề", "Hiên Viên", "Chiêu Dao", "Thiên Phù", "Thanh Long", "Hàm Trì", "Thái Âm", "Thiên Hoàng"];
        const LAC_THU_THAN_IDXS = [5, 15, 9, 11, -1, 3, 1, 7, 13];
        const OTHER_PALACE_OFFSETS = [0, 1, 2, 3, 5, 6, 7, 8];
        const r_qt = (kyDu + 3) % 9 || 9;
        const trucSuQtIdx = (r_qt - 1) % 9;

        const rotatedQt = rotateArray(STARS_QT, trucSuQtIdx);
        stars.push({
            thanIdx: -1,
            name: rotatedQt[0] + " (QT)",
            class: "quy-than",
            unique: 'QT_' + rotatedQt[0]
        });
        for (let i = 0; i < 8; i++) {
            const palIdx = OTHER_PALACE_OFFSETS[i];
            stars.push({
                thanIdx: LAC_THU_THAN_IDXS[palIdx],
                name: rotatedQt[i + 1] + " (QT)",
                class: "quy-than",
                unique: 'QT_' + rotatedQt[i + 1]
            });
        }

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
