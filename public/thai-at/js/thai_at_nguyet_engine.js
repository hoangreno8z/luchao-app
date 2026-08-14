/**
 * 🔒 [LOCKED & FROZEN ENGINE] - THÁI ẤT NGUYỆT KẾ ENGINE (QUẺ THÁNG)
 * TUYỆT ĐỐI KHÔNG SỬA ĐỔI HOẶC CAN THIỆP LOGIC TÍNH TOÁN BÊN DƯỚI.
 */
 * 1. 100% Dương Độn (cucNum = (kyDuThang % 72) || 72).
 * 2. Thái Ất & Tiểu Du chạy strictly trên 8 Cung Bát Quái (PALACES_8_THAN_IDX).
 * 3. Thái Tuế an vị tại Nguyệt Kiến (Địa Chi tháng hiện tại).
 * 4. Tam Tài Generals Lock Rule (Chỉ đuôi 5 mới vào Trung Cung, đuôi 0 Vô Thiên).
 * 5. Phi tinh 27 sao (TP, VX, QT) bằng rotateArray theo Lạc Thư chuẩn (Zero duplicates & Cung Mão đầy đủ).
 * 6. Đại Du & Tiểu Du mỏ neo theo Tích Niên năm (Dynamic Modulo calculation).
 */

class RealNguyetKeEngine extends ThaiAtBaseEngine {
    constructor(tueTich, kyDu, isDuongDon, namCanIdx, fullTueTich, tuTru) {
        // Mặc định 100% Dương Độn cho Nguyệt Kế
        super(tueTich, kyDu, true, namCanIdx, tuTru, 'nguyet');
        this.fullTueTich = fullTueTich;

        // Kỷ Dư Tháng được truyền vào trực tiếp từ NguyetKeEngine (ví dụ: 142 hoặc 139)
        this.kyDuThang = (kyDu % 360) || 360;
        this.nguyenNum = Math.floor((this.kyDuThang - 1) / 72) + 1;
        this.cucNum = (this.kyDuThang % 72) || 72;
        this.donCucName = `Dương Độn — Nguyên ${this.nguyenNum} Cục ${this.cucNum}`;
    }





    // Override calcCuuTinh cho Nguyệt Kế - Lạc Thư Quỹ Đạo Bay Chuẩn: 5->6->7->8->9->1->2->3->4
    calcCuuTinh() {
        const res = [];
        const kyDu = this.kyDuThang;
        // LAC_THU_THAN_IDXS: Index 0:Trung(-1), 1:Càn(3), 2:Đoài(1), 3:Cấn(7), 4:Ly(13), 5:Khảm(5), 6:Khôn(15), 7:Chấn(9-Mão), 8:Tốn(11)
        const LAC_THU_THAN_IDXS = [-1, 3, 1, 7, 13, 5, 15, 9, 11];

        // 1. Vòng Trực Phù 9 Sao (TP)
        const STARS_TP = ["Thiên Bồng", "Thiên Nhuế", "Thiên Xung", "Thiên Phụ", "Thiên Cầm", "Thiên Tâm", "Thiên Trụ", "Thiên Nhậm", "Thiên Ương"];
        const cuuTinhStep = Math.floor((kyDu % 90) / 10);
        const trucSuTpIdx = cuuTinhStep % 9;
        this.trucSuTpStarName = STARS_TP[trucSuTpIdx];

        const rotatedTp = rotateArray(STARS_TP, trucSuTpIdx);
        for (let i = 0; i < 9; i++) {
            res.push({
                thanIdx: LAC_THU_THAN_IDXS[i],
                name: rotatedTp[i] + " (TP)",
                class: "truc-phu",
                unique: 'TP_' + rotatedTp[i]
            });
        }

        // 2. Vòng Văn Xương 9 Sao (VX)
        const STARS_VX = ["Văn Xương", "Huyền Phượng", "Minh Duy", "Âm Đức", "Chiêu Dao", "Hoa Minh", "Huyền Vũ", "Huyền Minh", "Cưu Minh"];
        const CAN_TO_CUNG_VX = { 0: 3, 1: 4, 2: 9, 3: 2, 4: 5, 5: 5, 6: 7, 7: 6, 8: 1, 9: 8 };
        const r270_vx = kyDu % 270;
        const q_vx = Math.floor(r270_vx / 30) + 1;
        const start_vx = CAN_TO_CUNG_VX[this.namCanIdx] || 1;
        const trucSuVxIdx = (q_vx - 1 + start_vx - 1) % 9;

        const rotatedVx = rotateArray(STARS_VX, trucSuVxIdx);
        for (let i = 0; i < 9; i++) {
            res.push({
                thanIdx: LAC_THU_THAN_IDXS[i],
                name: rotatedVx[i] + " (VX)",
                class: "van-xuong-9",
                unique: 'VX_' + rotatedVx[i]
            });
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

        // 3. Vòng Quý Thần 9 Sao (QT) - Rotate Array Lạc Thư
        const STARS_QT = ["Thái Nhất", "Nhiếp Đề", "Hiên Viên", "Chiêu Dao", "Thiên Phù", "Thanh Long", "Hàm Trì", "Thái Âm", "Thiên Hoàng"];
        const r_qt = (kyDu + 3) % 9 || 9;
        const trucSuQtIdx = (r_qt - 1) % 9;

        const rotatedQt = rotateArray(STARS_QT, trucSuQtIdx);
        for (let i = 0; i < 9; i++) {
            stars.push({
                thanIdx: LAC_THU_THAN_IDXS[i],
                name: rotatedQt[i] + " (QT)",
                class: "quy-than",
                unique: 'QT_' + rotatedQt[i]
            });
        }



        // Tứ Thần Kỳ, Thiên Hoàng, Thiên Thời, Đế Phù (Tra mảng & countSteps chuẩn)
        const r20 = (kyDu % 20) || 20;
        const THIEN_HOANG_DUONG = [0, 1, 2, 3, 3, 4, 5, 6, 7, 7, 8, 9, 10, 11, 11, 12, 13, 14, 15, 15];
        const thThan = THIEN_HOANG_DUONG[r20 - 1];
        pushStar(thThan, 'thien-hoang', 'Thiên Hoàng');

        const ttStep = kyDu % 12;
        pushStar(CHI_TO_THAN_IDX[(2 + ttStep) % 12], 'thien-thoi', 'Thiên Thời');
        
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
        const dephuR = kyDu % 20 || 20;
        const dpThan = countSteps(2, dephuR, [5, 9, 13, 1]); // Tuất=2
        pushStar(dpThan, 'de-phu', 'Đế Phù');
        return stars;
    }

    // Override calcBatMon8 cho Nguyệt Kế - Dùng trực tiếp kyDuThang
    calcBatMon8() {
        const res = [];
        const BAT_MON_LIST = ["Khai", "Hưu", "Sinh", "Thương", "Đỗ", "Cảnh", "Tử", "Kinh"];
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

        const tichVal = this.tichThang || (this.kyDuThang ? this.kyDuThang : 3966);
        const du240 = tichVal % 240;
        const batMonStep = Math.floor(du240 / 30);
        const soThangTrucSu = (du240 % 30) || 30;
        const rotatedDoors = rotateArray(BAT_MON_LIST, batMonStep % 8);

        for (let i = 0; i < 8; i++) {
            const pal = BAT_QUAI_PALACES[i];
            const gateName = rotatedDoors[i];
            const isTrucSu = (i === 0);

            res.push({
                thanIdx: pal.thanIdx,
                name: isTrucSu ? `Cửa ${gateName} (Trực Sự - ${soThangTrucSu} tháng)` : `Cửa ${gateName}`,
                class: isTrucSu ? "bat-mon-truc-su" : "bat-mon-phu",
                gateName: gateName,
                isTrucSu: isTrucSu,
                soThangTrucSu: isTrucSu ? soThangTrucSu : null
            });
        }

        return res;
    }
}

if (typeof window === 'undefined') {
    global.RealNguyetKeEngine = RealNguyetKeEngine;
}
