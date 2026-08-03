// thai_at_thoi_engine.js
class RealThoiKeEngine extends ThaiAtBaseEngine {
    constructor(tueTich, kyDu, isDuongDon, namCanIdx, soGio, tuTru) {
        super(tueTich, kyDu, isDuongDon, namCanIdx, tuTru);
        this.soGio = soGio;
    }
    
    // Thái Ất Bàn Giờ
    calcThaiAt() {
        const cucNum = (this.soGio % 72) || 72;
        const step = Math.floor((cucNum - 1) / 3);
        const CUNG_TO_THAN = [0, 2, 4, 6, -1, 10, 12, 14, 8];
        
        let thanIdx = 0;
        if (this.isDuongDon) {
            // Dương đi thuận 9 cung: 1->2->3->4->5->6->7->8->9
            thanIdx = CUNG_TO_THAN[step % 9];
        } else {
            // Âm đi ngược 9 cung khởi Tốn(4): 4->3->2->1->9->8->7->6->5
            const PATH = [6, 4, 2, 0, 8, 14, 12, 10, -1]; // Index of CUNG_TO_THAN tương ứng
            thanIdx = PATH[step % 9];
        }
        
        return { thanIdx, class: 'thai-at', name: 'Thái Ất' + (thanIdx === -1 ? ' (Trung Cung)' : '') };
    }

    // Mục, Kích: Override logic
    calcMucKich(thaiAtIdx) {
        // Dương: Thiên Mục khởi Thân thuận lưu 2 góc
        // Âm: Thiên Mục khởi Dần ngược lưu Cấn Tốn
        const muKyDu = this.kyDu % 18;
        let mucThanIdx;
        
        if (this.isDuongDon) {
            mucThanIdx = (7 + muKyDu) % 16;
            if (muKyDu > 0 && mucThanIdx % 2 !== 0 && [1, 5, 11, 15].includes(mucThanIdx)) {
                mucThanIdx = (mucThanIdx + 1) % 16;
            }
        } else {
            // Khởi Dần(11) ngược
            mucThanIdx = (11 - muKyDu + 32) % 16;
            if (muKyDu > 0 && mucThanIdx % 2 !== 0 && [3, 9].includes(mucThanIdx)) {
                mucThanIdx = (mucThanIdx - 1 + 16) % 16;
            }
        }

        // Kế Thần
        let keThanIdx;
        const keStep = this.kyDu % 12;
        const chiToThan = [0,1,2, 4,5,6, 8,9,10, 12,13,14];
        if (this.isDuongDon) {
            // Dần(2) ngược
            keThanIdx = chiToThan[(2 - keStep + 12) % 12];
        } else {
            // Thân(8) ngược
            keThanIdx = chiToThan[(8 - keStep + 12) % 12];
        }

        // Thủy Kích
        let k1 = (keThanIdx % 2 === 0) ? keThanIdx : keThanIdx - 1;
        let m1 = (mucThanIdx % 2 === 0) ? mucThanIdx : mucThanIdx - 1;
        const khoangCach = (m1 - k1 + 16) % 16;
        let thuyKichIdx = (14 + khoangCach) % 16; // Từ Cấn(14)
        if (thuyKichIdx % 2 !== 0) thuyKichIdx = (thuyKichIdx + 1) % 16;

        return { mucThanIdx, keThanIdx, thuyKichIdx };
    }

    calcOtherStars() {
        const stars = [];
        const soGio = this.soGio; 
        const kyDu = this.kyDu; 
        
        const pushStar = (thanIdx, cls, name) => {
            if (thanIdx !== undefined && thanIdx !== null && thanIdx !== -1) {
                stars.push({ thanIdx, class: cls, name });
            }
        };
        const CUNG_TO_THAN = [0, 2, 4, 6, -1, 10, 12, 14, 8];
        const chiToThan = [0,1,2, 4,5,6, 8,9,10, 12,13,14];

        // Thiên Hoàng: Dương Thân thuận, Âm Dần ngược
        const thStep = kyDu % 20;
        let thThan = this.isDuongDon ? (7 + thStep) % 16 : (11 - thStep + 32) % 16;
        if (this.isDuongDon && thStep > 0 && thThan % 2 !== 0 && [1, 5, 11, 15].includes(thThan)) thThan = (thThan + 1) % 16;
        if (!this.isDuongDon && thStep > 0 && thThan % 2 !== 0 && [3, 9].includes(thThan)) thThan = (thThan - 1 + 16) % 16;
        pushStar(thThan, 'thien-hoang', 'Thiên Hoàng');

        // Thiên Thời: Dương Dần thuận, Âm Thân ngược
        const ttStep = kyDu % 12;
        pushStar(chiToThan[(this.isDuongDon ? 2 + ttStep : 8 - ttStep + 12) % 12], 'thien-thoi', 'Thiên Thời');
        
        // Đế Phù: Dương Tuất thuận, Âm Thìn ngược
        const dpStep = kyDu % 20;
        let dpThan = this.isDuongDon ? (13 + dpStep) % 16 : (5 - dpStep + 32) % 16;
        if (this.isDuongDon && dpStep > 0 && dpThan % 2 === 0) dpThan = (dpThan + 1) % 16;
        if (!this.isDuongDon && dpStep > 0 && dpThan % 2 === 0) dpThan = (dpThan - 1 + 16) % 16;
        pushStar(dpThan, 'de-phu', 'Đế Phù');

        // Phi Điểu
        let pdCung = this.isDuongDon ? kyDu % 9 : (8 - (kyDu % 9));
        pushStar(CUNG_TO_THAN[pdCung], 'phi-dieu', 'Phi Điểu');
        
        // Ngũ Hành
        const ngArr = this.isDuongDon ? [1, 8, 3, 9, 7] : [9, 2, 7, 1, 3];
        pushStar(CUNG_TO_THAN[ngArr[kyDu % 5] - 1], 'ngu-hanh', 'Ngũ Hành');
        
        // Tam Phong
        const tpArr = this.isDuongDon ? [3, 7, 2, 6, 1, 5, 9, 4, 8] : [7, 3, 8, 4, 9, 5, 1, 6, 2];
        pushStar(CUNG_TO_THAN[tpArr[Math.floor((kyDu % 90) / 9) % 9] - 1], 'tam-phong', 'Tam Phong');
        
        // Ngũ Phong
        const npArr = this.isDuongDon ? [1, 3, 5, 7, 9, 2, 4, 6, 8] : [9, 7, 5, 3, 1, 8, 6, 4, 2];
        pushStar(CUNG_TO_THAN[npArr[Math.floor((kyDu % 90) / 9) % 9] - 1], 'ngu-phong', 'Ngũ Phong');
        
        // Bát Phong
        const bpArr = this.isDuongDon ? [2, 3, 4, 5, 6, 7, 8, 9, 1] : [9, 8, 7, 6, 5, 4, 3, 2, 1];
        pushStar(CUNG_TO_THAN[bpArr[kyDu % 9] - 1], 'bat-phong', 'Bát Phong');

        // Thiên Tôn
        const ttnArr = this.isDuongDon ? [8, 6, 2, 4] : [4, 2, 6, 8];
        pushStar(CUNG_TO_THAN[ttnArr[kyDu % 4] - 1], 'thien-ton', 'Thiên Tôn');

        // Bát Môn & Cửu Tinh Trực Sự cũng sẽ render ở ngoài UI, nhưng có thể map ở đây nếu muốn.

        return stars;
    }
}
