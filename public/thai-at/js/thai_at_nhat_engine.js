// thai_at_nhat_engine.js
class RealNhatKeEngine extends ThaiAtBaseEngine {
    constructor(tueTich, kyDu, isDuongDon, namCanIdx, jdInt, soNgay, tuTru) {
        super(tueTich, kyDu, isDuongDon, namCanIdx, tuTru);
        this.jdInt = jdInt;
        this.soNgay = soNgay;
    }
    
    // Mốc tương đối (Tìm Cục, Thái Ất)
    calcThaiAt() {
        const cucNum = (this.soNgay % 72) || 72; // 1-72
        const step = Math.floor((cucNum - 1) / 3);
        // Khởi cung 1 đi thuận 8 cung (Bỏ qua Trung Cung)
        // 1(Khảm), 2(Khôn), 3(Chấn), 4(Tốn), 6(Kiền), 7(Đoài), 8(Cấn), 9(Ly)
        const PATH_8 = [0, 2, 4, 6, 10, 12, 14, 8];
        const thanIdx = PATH_8[step % 8];
        return { thanIdx, class: 'thai-at', name: 'Thái Ất' };
    }

    calcOtherStars() {
        const stars = [];
        const tichNhat = this.tueTich; // Tích Nhật = JD + offset
        const kyDu = this.kyDu;        // Tích Nhật % 360
        
        const pushStar = (thanIdx, cls, name) => {
            if (thanIdx !== undefined && thanIdx !== null && thanIdx !== -1) {
                stars.push({ thanIdx, class: cls, name });
            }
        };
        const CUNG_TO_THAN = [0, 2, 4, 6, -1, 10, 12, 14, 8];
        const chiToThan = [0,1,2, 4,5,6, 8,9,10, 12,13,14];

        // NHÓM 5: Bát Môn & Cửu Tinh Trực Sự
        // Bát Môn: Tích Nhật % 240 / 30 khởi Khai (đi thuận)
        // Cửu Tinh Trực Sự: Tích Nhật % 90 / 10 khởi Thiên Bồng (cung 1) đi xuôi 9 cung Lạc Thư
        // Sẽ được gọi riêng bởi UI hoặc tính chung. Tạm bỏ qua thêm vào sao vì render ngoài UI.

        // NHÓM 8: Thiên Hoàng, Thiên Thời, Đế Phù (Kỷ dư của ngày)
        const thStep = kyDu % 20;
        let thThan = (7 + thStep) % 16;
        if (thStep > 0 && thThan % 2 !== 0 && [1, 5, 11, 15].includes(thThan)) thThan = (thThan + 1) % 16;
        pushStar(thThan, 'thien-hoang', 'Thiên Hoàng');

        const ttStep = kyDu % 12; // Dần thuận
        pushStar(chiToThan[(2 + ttStep) % 12], 'thien-thoi', 'Thiên Thời');
        
        const dpStep = kyDu % 20;
        let dpThan = (13 + dpStep) % 16;
        if (dpStep > 0 && dpThan % 2 === 0) dpThan = (dpThan + 1) % 16;
        pushStar(dpThan, 'de-phu', 'Đế Phù');

        // NHÓM 9: Phong Vũ (Kỷ dư ngày)
        pushStar(CUNG_TO_THAN[(kyDu % 9)], 'phi-dieu', 'Phi Điểu');
        
        const ngArr = [1, 8, 3, 9, 7].map(c => CUNG_TO_THAN[c-1]);
        pushStar(ngArr[kyDu % 5], 'ngu-hanh', 'Ngũ Hành');
        
        const tpArr = [3, 7, 2, 6, 1, 5, 9, 4, 8].map(c => CUNG_TO_THAN[c-1]);
        pushStar(tpArr[Math.floor((kyDu % 90) / 9) % 9], 'tam-phong', 'Tam Phong');
        
        const npArr = [1, 3, 5, 7, 9, 2, 4, 6, 8].map(c => CUNG_TO_THAN[c-1]);
        pushStar(npArr[Math.floor((kyDu % 90) / 9) % 9], 'ngu-phong', 'Ngũ Phong');
        
        const bpArr = [2, 3, 4, 5, 6, 7, 8, 9, 1].map(c => CUNG_TO_THAN[c-1]);
        pushStar(bpArr[kyDu % 9], 'bat-phong', 'Bát Phong');

        // Thiên Tôn (Khởi 8 ngược: 8, 6, 2, 4)
        const ttnArr = [8, 6, 2, 4].map(c => CUNG_TO_THAN[c-1]);
        pushStar(ttnArr[kyDu % 4], 'thien-ton', 'Thiên Tôn');

        // NHÓM 10: Đại Tinh (Tích Nhật)
        const nfStep = Math.floor(((tichNhat + 115) % 225) / 45);
        const nfArr = [8, 6, 4, 2, 5].map(c => CUNG_TO_THAN[c-1]);
        pushStar(nfArr[nfStep % 5], 'ngu-phuc', 'Ngũ Phúc');

        const ddStep = Math.floor(((tichNhat + 34) % 288) / 36);
        const ddArr = [7, 8, 1, 2, 3, 4, 9, 6].map(c => CUNG_TO_THAN[c-1]); 
        pushStar(ddArr[ddStep % 8], 'dai-du', 'Đại Du');
        
        const tdStep = Math.floor(((tichNhat % 360) % 24) / 3);
        const tdArr = [1, 2, 3, 4, 9, 8, 7, 6].map(c => CUNG_TO_THAN[c-1]); 
        pushStar(tdArr[tdStep % 8], 'tieu-du', 'Tiểu Du');

        // Tứ thần (Khởi 1, 6, 5, 9)
        const bStep = Math.floor((tichNhat % 360 % 36) / 3);
        const BT_PATH = [0, 14, 2, 10, 4, 8, 6, 12, 5, 7, 11, 15]; 
        pushStar(BT_PATH[(0 + bStep) % 12], 'tu-than', 'Tứ Thần');
        pushStar(BT_PATH[(5 + bStep) % 12], 'thien-at', 'Thiên Ất'); // 6
        pushStar(BT_PATH[(4 + bStep) % 12], 'truc-phu', 'Trực Phù'); // 5
        pushStar(BT_PATH[(8 + bStep) % 12], 'dia-at', 'Địa Ất');     // 9

        // NHÓM 11: Tam Cơ (Tích Nhật)
        pushStar(chiToThan[(6 + Math.floor((tichNhat % 360) / 30)) % 12], 'quan-co', 'Quân Cơ'); // Ngọ
        pushStar(chiToThan[(6 + Math.floor((tichNhat % 360 % 36) / 3)) % 12], 'than-co', 'Thần Cơ'); // Ngọ
        pushStar(chiToThan[(10 + (tichNhat % 12)) % 12], 'dan-co', 'Dân Cơ'); // Tuất

        // NHÓM 12: Ba Cờ (Tích Nhật)
        pushStar(chiToThan[(11 + Math.floor((tichNhat % 60) / 12)) % 12], 'thanh-long', 'Thanh Long (Cờ Xanh)'); // Hợi
        const xkStep = Math.floor(((tichNhat + 1) % 40) / 4);
        const tuManh = [11, 7, 5, 11]; // Hợi, Thân, Tị, Dần
        pushStar(chiToThan[tuManh[xkStep % 4]], 'xich-ky', 'Xích Kỳ (Cờ Đỏ)');
        pushStar(chiToThan[(11 - Math.floor((tichNhat + 25) % 360 % 36 / 3) + 120) % 12], 'hac-ky', 'Hắc Kỳ (Cờ Đen)'); // Hợi ngược

        // NHÓM 13: 9 Tinh Quý Thần (Vòng Kỷ Dư + 3)
        const qsStep = (kyDu + 3) % 9;
        const LAC_THU = [6, 7, 8, 9, 1, 2, 3, 4];
        const qtNames = ["Thái Nhất", "Thượng Tướng", "Thứ Tướng", "Đại Tướng", "Khách Tham", "Lôi Công", "Thập Tướng", "Phi Âm"];
        
        const BACK_PATH = [1, 9, 8, 7, 6, 5, 4, 3, 2];
        const trucSuCung = BACK_PATH[qsStep]; 
        
        let qtOffset = 0;
        if (trucSuCung !== 5) {
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
