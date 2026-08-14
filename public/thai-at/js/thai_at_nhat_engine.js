/**
 * 🔒 [LOCKED & FROZEN ENGINE] - THÁI ẤT NHẬT KẾ ENGINE (QUẺ NGÀY)
 * TUYỆT ĐỐI KHÔNG SỬA ĐỔI HOẶC CAN THIỆP LOGIC TÍNH TOÁN BÊN DƯỚI.
 */
class RealNhatKeEngine extends ThaiAtBaseEngine {
    constructor(tueTich, kyDu, isDuongDon, namCanIdx, jdInt, soNgay, tuTru) {
        super(tueTich, kyDu, isDuongDon, namCanIdx, tuTru, 'nhat');
        this.jdInt = jdInt;
        this.soNgay = soNgay;
        this.kyDuNgay = (soNgay % 360) || 360;
        this.nguyenNum = Math.floor((this.kyDuNgay - 1) / 72) + 1;
        this.cucNum = (this.kyDuNgay % 72) || 72;
        this.donCucName = (this.isDuongDon ? "Dương Độn" : "Âm Độn") + ` — Nguyên ${this.nguyenNum} Cục ${this.cucNum}`;
    }

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

        const tichVal = this.soNgay || this.kyDuNgay || 142;
        const du240 = tichVal % 240;
        const batMonStep = Math.floor(du240 / 30);
        const soNgayTrucSu = (du240 % 30) || 30;
        const rotatedDoors = rotateArray(BAT_MON_LIST, batMonStep % 8);

        for (let i = 0; i < 8; i++) {
            const pal = BAT_QUAI_PALACES[i];
            const gateName = rotatedDoors[i];
            const isTrucSu = (i === 0);

            res.push({
                thanIdx: pal.thanIdx,
                name: isTrucSu ? `Cửa ${gateName} (Trực Sự - ${soNgayTrucSu} ngày)` : `Cửa ${gateName}`,
                class: isTrucSu ? "bat-mon-truc-su" : "bat-mon-phu",
                gateName: gateName,
                isTrucSu: isTrucSu,
                soNgayTrucSu: isTrucSu ? soNgayTrucSu : null
            });
        }

        return res;
    }
}

if (typeof window === 'undefined') {
    global.RealNhatKeEngine = RealNhatKeEngine;
}
