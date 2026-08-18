/**
 * 🔒 [LOCKED & FROZEN ENGINE] - THÁI ẤT NGUYỆT KẾ ENGINE (QUẺ THÁNG)
 * TUYỆT ĐỐI KHÔNG SỬA ĐỔI HOẶC CAN THIỆP LOGIC TÍNH TOÁN BÊN DƯỚI.
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
