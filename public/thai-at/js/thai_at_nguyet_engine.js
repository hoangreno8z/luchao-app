// thai_at_nguyet_engine.js
class RealNguyetKeEngine extends ThaiAtBaseEngine {
    constructor(tueTich, kyDu, isDuongDon, namCanIdx, fullTueTich, tuTru) {
        // tueTich here is the Nguyệt Tích Đặc Biệt or Nguyệt Tích
        super(tueTich, kyDu, isDuongDon, namCanIdx, tuTru);
        this.fullTueTich = fullTueTich; // Thượng Cổ Tuế Tích
    }
    
    // 2. Thái Ất bàn tháng (Chạy 9 cung, cứ 3 cục đổi 1 cung - 3 tháng 1 cung)
    calcThaiAt() {
        const step = Math.floor((this.cucNum - 1) / 3);
        const CUNG_TO_THAN = [
            0,  // Cung 1 (Khảm)
            2,  // Cung 2 (Khôn)
            4,  // Cung 3 (Chấn)
            6,  // Cung 4 (Tốn)
            -1, // Cung 5 (Trung Ương)
            10, // Cung 6 (Kiền)
            12, // Cung 7 (Đoài)
            14, // Cung 8 (Cấn)
            8   // Cung 9 (Ly)
        ];
        const currentCung = (step % 9); // 0 to 8 (Cung 1 to 9)
        const thanIdx = CUNG_TO_THAN[currentCung];
        return { thanIdx, class: 'thai-at', name: 'Thái Ất' + (thanIdx === -1 ? ' (Trung Cung)' : '') };
    }

    // 3. Thái Tuế Nguyệt Kể: An tại Địa Chi của Tháng cần xem (Điểm khác biệt 4)
    calcThaiTue() {
        const thangChiIdx = (this.tuTru && this.tuTru.month) ? this.tuTru.month.chiIdx : 0;
        const chiToThan = [0, 1, 2, 4, 5, 6, 8, 9, 10, 12, 13, 14];
        const thanIdx = chiToThan[thangChiIdx];
        return { thanIdx, class: 'thai-tue', name: 'Thái Tuế' };
    }

    // Thái Âm đứng sau Thái Tuế 2 cung (Chi tháng - 2)
    calcThaiAm() {
        const thangChiIdx = (this.tuTru && this.tuTru.month) ? this.tuTru.month.chiIdx : 0;
        const thaiAmChiIdx = (thangChiIdx - 2 + 12) % 12;
        const chiToThan = [0, 1, 2, 4, 5, 6, 8, 9, 10, 12, 13, 14];
        const thanIdx = chiToThan[thaiAmChiIdx];
        return { thanIdx, class: 'thai-am', name: 'Thái Âm' };
    }
    
    // 5. Bát Môn, Cửu Tinh, Tứ Thần, Tam Cơ, Ba Cờ, Phong Vũ, Quý Thần, Đại Tinh...
    calcOtherStars() {
        const stars = [];
        const tich = this.tueTich; // Nguyệt Tích
        const kyDu = this.kyDu;    // Nguyệt Tích % 360
        const tueTichThuongCo = this.fullTueTich;
        
        const pushStar = (thanIdx, cls, name) => {
            if (thanIdx !== undefined && thanIdx !== null && thanIdx !== -1) {
                stars.push({ thanIdx, class: cls, name });
            }
        };
        const CUNG_TO_THAN = [0, 2, 4, 6, -1, 10, 12, 14, 8];

        // NHÓM 5: Bát Môn & Cửu Tinh
        // Bát Môn được render ngoài UI, Cửu Tinh Trực Sự cũng thế, nhưng cần tính Tinh Trực Sự (9 Sao Trực Sự) theo mục 32c
        // Nguyệt Tích Đặc Biệt = Tuế Tích * 12 + 2 (Thiên chính và Địa chính) + Nhuận + Tháng hiện tại
        // Sẽ tính ở ngoài factory và truyền vào hoặc tính lại ở đây
        const leapMonths = Math.floor(tueTichThuongCo * 7 / 19);
        // Nguyệt Tích Đặc Biệt
        const tichDacBiet = tich + 2 + leapMonths;
        const cuuTinhTrcSuStep = Math.floor((tichDacBiet % 90) / 10);
        // Khởi Thiên Bồng (cung 1) đi xuôi 9 cung
        const cuuTinhTrcSuCung = cuuTinhTrcSuStep % 9;
        // Bỏ qua render thẳng vào sao vì UI hiển thị riêng ở Trung Cung

        // NHÓM 8: Thiên Hoàng, Thiên Thời, Đế Phù
        const thStep = kyDu % 20;
        let thThan = (7 + thStep) % 16;
        if (thStep > 0 && thThan % 2 !== 0 && [1, 5, 11, 15].includes(thThan)) thThan = (thThan + 1) % 16;
        pushStar(thThan, 'thien-hoang', 'Thiên Hoàng');

        const ttStep = kyDu % 12; // Dần đi thuận
        const chiToThan = [0,1,2, 4,5,6, 8,9,10, 12,13,14];
        pushStar(chiToThan[(2 + ttStep) % 12], 'thien-thoi', 'Thiên Thời');
        
        const dpStep = kyDu % 20;
        let dpThan = (13 + dpStep) % 16;
        if (dpStep > 0 && dpThan % 2 === 0) dpThan = (dpThan + 1) % 16;
        pushStar(dpThan, 'de-phu', 'Đế Phù');

        // NHÓM 9: Phong Vũ
        pushStar(CUNG_TO_THAN[(kyDu % 9)], 'phi-dieu', 'Phi Điểu');
        
        const ngArr = [1, 8, 3, 9, 7].map(c => CUNG_TO_THAN[c-1]);
        pushStar(ngArr[kyDu % 5], 'ngu-hanh', 'Ngũ Hành');
        
        const tpArr = [3, 7, 2, 6, 1, 5, 9, 4, 8].map(c => CUNG_TO_THAN[c-1]);
        pushStar(tpArr[Math.floor(kyDu % 90 / 9) % 9], 'tam-phong', 'Tam Phong');
        
        const npArr = [1, 3, 5, 7, 9, 2, 4, 6, 8].map(c => CUNG_TO_THAN[c-1]);
        pushStar(npArr[Math.floor(kyDu % 90 / 9) % 9], 'ngu-phong', 'Ngũ Phong');
        
        const bpArr = [2, 3, 4, 5, 6, 7, 8, 9, 1].map(c => CUNG_TO_THAN[c-1]);
        pushStar(bpArr[kyDu % 9], 'bat-phong', 'Bát Phong');

        // Thiên Tôn
        const ttnArr = [8, 6, 2, 4].map(c => CUNG_TO_THAN[c-1]);
        pushStar(ttnArr[kyDu % 4], 'thien-ton', 'Thiên Tôn');

        // NHÓM 10: Đại Tinh
        const nfStep = Math.floor(((tich + 115) % 225) / 45);
        const nfArr = [6, 8, 4, 2, 5].map(c => CUNG_TO_THAN[c-1]);
        pushStar(nfArr[nfStep % 5], 'ngu-phuc', 'Ngũ Phúc');

        const ddStep = Math.floor(((tich + 34) % 288) / 36);
        const ddArr = [7, 8, 1, 2, 3, 4, 9, 6].map(c => CUNG_TO_THAN[c-1]);
        pushStar(ddArr[ddStep % 8], 'dai-du', 'Đại Du');
        
        const tdStep = Math.floor(((tich % 360) % 24) / 3);
        const tdArr = [1, 2, 3, 4, 9, 8, 7, 6].map(c => CUNG_TO_THAN[c-1]);
        pushStar(tdArr[tdStep % 8], 'tieu-du', 'Tiểu Du');

        // Bốn thần
        const bStep = Math.floor((tich % 360 % 36) / 3);
        const BT_PATH = [0, 14, 2, 10, 4, 8, 6, 12, 5, 7, 11, 15]; // Cung phụ: Tị(5), Thân(7), Dần(11)
        pushStar(BT_PATH[(0 + bStep) % 12], 'tu-than', 'Tứ Thần');
        pushStar(BT_PATH[(5 + bStep) % 12], 'thien-at', 'Thiên Ất');
        pushStar(BT_PATH[(4 + bStep) % 12], 'truc-phu', 'Trực Phù');
        pushStar(BT_PATH[(8 + bStep) % 12], 'dia-at', 'Địa Ất');

        // NHÓM 11: Tam Cơ
        pushStar(chiToThan[(6 + Math.floor((tich % 360) / 30)) % 12], 'quan-co', 'Quân Cơ'); // Ngọ
        pushStar(chiToThan[(6 + Math.floor((tich % 360 % 36) / 3)) % 12], 'than-co', 'Thần Cơ'); // Ngọ
        pushStar(chiToThan[(10 + (tich % 12)) % 12], 'dan-co', 'Dân Cơ'); // Tuất

        // NHÓM 12: Ba Cờ
        pushStar(chiToThan[(11 + Math.floor((tich % 60) / 12)) % 12], 'thanh-long', 'Thanh Long (Cờ Xanh)'); // Hợi
        const xkStep = Math.floor(((tich + 1) % 40) / 4);
        const tuManh = [11, 7, 5, 11]; // Hợi, Thân, Tị, Dần
        pushStar(chiToThan[tuManh[xkStep % 4]], 'xich-ky', 'Xích Kỳ (Cờ Đỏ)');
        pushStar(chiToThan[(11 - Math.floor((tich + 25) % 360 % 36 / 3) + 120) % 12], 'hac-ky', 'Hắc Kỳ (Cờ Đen)'); // Hợi ngược

        // NHÓM 13: 9 Tinh Quý Thần
        const qsStep = (tich + 3) % 9;
        const LAC_THU = [6, 7, 8, 9, 1, 2, 3, 4]; // Kiền Đoài Cấn Ly Khảm Khôn Chấn Tốn
        const qtNames = ["Thái Nhất", "Thượng Tướng", "Thứ Tướng", "Đại Tướng", "Khách Tham", "Lôi Công", "Thập Tướng", "Phi Âm"];
        
        let startIdx = 0;
        // Quỹ đạo lùi 9 cung (1->9->8->7->6->5->4->3->2)
        const BACK_PATH = [1, 9, 8, 7, 6, 5, 4, 3, 2];
        const trucSuCung = BACK_PATH[qsStep]; // 1-9
        
        // Cung 5 là trung cung. Trực sự được rút vào trung cung, 8 sao xếp Lạc Thư
        // Ta chỉ gán 8 sao vào các cung Lạc Thư
        let qtOffset = 0;
        if (trucSuCung !== 5) {
            // Xác định xem Trực Sự đang ở đâu so với vòng Lạc Thư để bù offset
            const idxInLacThu = LAC_THU.indexOf(trucSuCung);
            if (idxInLacThu !== -1) qtOffset = idxInLacThu;
        }

        for (let i = 0; i < 8; i++) {
            const actualCung = LAC_THU[(i + qtOffset) % 8];
            pushStar(CUNG_TO_THAN[actualCung - 1], 'quy-than', qtNames[i]);
        }

        return stars;
    }
}
