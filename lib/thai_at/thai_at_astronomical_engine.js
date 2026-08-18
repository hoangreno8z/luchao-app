/**
 * ====================================================================
 * 🚀 THÁI ẤT THIÊN VĂN THỰC TẾ 2.0 (NASA AUTO-CALIBRATED DUAL-ENGINE)
 * ====================================================================
 * Lõi tính toán thiên văn học thực tế hoàn toàn độc lập với Sa Bàn Cổ Điển.
 * Áp dụng giải tích cơ học thiên thể NASA / JPL (VSOP87, ELP-2000, IAU-2006)
 * và lượng tử hóa không gian trạng thái tô-pô 16 Cung Thần (S_16).
 */

class ThaiAtAstronomicalEngine {
    constructor(tueTich, kyDu, isDuongDon, namCanIdx, tuTru, year, month = 1, day = 1, hour = 12, minute = 0) {
        this.year = year;
        this.month = month;
        this.day = day;
        this.hour = hour;
        this.minute = minute;
        this.isDuongDon = isDuongDon;
        this.namCanIdx = namCanIdx;
        this.tuTru = tuTru;

        // 1. Tính toán tọa độ thực tế toàn bộ hệ Mặt Trời từ NASA VSOP87
        const dateObj = new Date(year, month - 1, day, hour, minute, 0);
        this.ephemeris = AstroVSOP87.calculateEphemeris(dateObj);

        // 2. Tích Niên & Kỷ Dư Cơ Sở
        this.tueTich = tueTich;
        this.kyDu = kyDu;
        this.kyDuNam = (this.tueTich % 360) || 360;
        this.nguyenNum = Math.floor((this.kyDuNam - 1) / 72) + 1;
        this.cucNum = (this.kyDuNam % 72) || 72;

        this.donCucName = (this.isDuongDon ? "Dương Độn" : "Âm Độn") + ` [NASA] — Nguyên ${this.nguyenNum} Cục ${this.cucNum}`;
    }

    // -------------------------------------------------------------------------
    // HÀM LƯỢNG TỬ HÓA TÔ-PÔ (TOPOLOGICAL QUANTIZATION OPERATORS)
    // -------------------------------------------------------------------------
    // 16 Cung Thần: mỗi cung 22.5 độ, tâm tại phương vị chân trời
    // 0: Thân(247.5°), 1: Dậu(270°), 2: Tuất(292.5°), 3: Kiền(315°), 4: Hợi(337.5°), 5: Tý(0°),
    // 6: Sửu(22.5°), 7: Cấn(45°), 8: Dần(67.5°), 9: Mão(90°), 10: Thìn(112.5°), 11: Tốn(135°),
    // 12: Tị(157.5°), 13: Ngọ(180°), 14: Mùi(202.5°), 15: Khôn(225°)
    static degTo16ThanIdx(deg) {
        const norm = ((deg % 360.0) + 360.0) % 360.0;
        // Bắt đầu từ Tý (0° +/- 11.25°)
        const shifted = (norm + 11.25) % 360.0;
        const sector = Math.floor(shifted / 22.5); // 0: Tý, 1: Sửu, 2: Cấn, 3: Dần, 4: Mão, 5: Thìn, 6: Tốn, 7: Tị, 8: Ngọ, 9: Mùi, 10: Khôn, 11: Thân, 12: Dậu, 13: Tuất, 14: Kiền, 15: Hợi
        const SECTOR_TO_THAN_IDX = [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0, 1, 2, 3, 4];
        return SECTOR_TO_THAN_IDX[sector];
    }

    // 12 Địa Chi Hoàng Đạo: mỗi chi 30 độ
    static degTo12ChiIdx(deg) {
        const norm = ((deg % 360.0) + 360.0) % 360.0;
        const chi = Math.floor(norm / 30.0); // 0: Bạch Dương/Tuất, ...
        // Quy đổi góc Hoàng Đạo sang 12 Chi: 0° Xuân Phân (Bạch Dương) ~ Mão(3) hoặc Tý(0)
        return (chi + 3) % 12;
    }

    // -------------------------------------------------------------------------
    // TÍNH TOÁN CÁC SAO THÁI ẤT THIÊN VĂN THỰC TẾ
    // -------------------------------------------------------------------------

    // 1. THÁI ẤT: Tọa độ gốc tham chiếu động + Hiệu chỉnh Tuế Sai IAU 2006
    calcThaiAt() {
        const cucNum = this.cucNum;
        const step = Math.floor(((cucNum - 1) % 24) / 3);
        const rem = ((cucNum - 1) % 3) + 1;

        const PATH_DUONG = [3, 13, 7, 9, 1, 15, 5, 11]; // Kiền, Ly, Cấn, Chấn, Đoài, Khôn, Khảm, Tốn
        const PATH_AM = [11, 5, 15, 1, 9, 7, 13, 3];
        const PATH_NAMES_DUONG = ["Kiền", "Ly", "Cấn", "Chấn", "Đoài", "Khôn", "Khảm", "Tốn"];
        const PATH_NAMES_AM = ["Tốn", "Khảm", "Khôn", "Đoài", "Chấn", "Cấn", "Ly", "Kiền"];

        const path = this.isDuongDon ? PATH_DUONG : PATH_AM;
        const namePath = this.isDuongDon ? PATH_NAMES_DUONG : PATH_NAMES_AM;
        
        // Hiệu chỉnh bước chuyển dựa trên vector Tuế sai thực tế
        const precShift = Math.floor(this.ephemeris.precessionDeg / 45.0);
        const finalStep = (step + precShift + 80) % 8;

        const thanIdx = path[finalStep];
        const cungName = namePath[finalStep];

        return {
            thanIdx,
            cungName,
            soNamAnToa: rem,
            name: `Thái Ất (Cung ${cungName} - ${rem} năm [NASA])`,
            class: "thai-at"
        };
    }

    // 2. VĂN XƯƠNG (Thiên Mục): Lượng tử hóa Nút Nguyệt Đạo thực tế (Lunar Ascending Node)
    calcVanXuong() {
        // Nút Nguyệt Đạo thực tế từ NASA ELP-2000 (chu kỳ 18.61 năm)
        const nodeLong = this.ephemeris.moon.ascendingNode;
        const thanIdx = ThaiAtAstronomicalEngine.degTo16ThanIdx(nodeLong);
        return {
            thanIdx,
            name: `Văn Xương [Ω Moon ${nodeLong.toFixed(1)}°]`,
            class: "van-xuong"
        };
    }

    // 3. KẾ THẦN (Thần Cơ): Lượng tử hóa pha Mộc Tinh (Jupiter Ecliptic Phase)
    calcKeThan() {
        // Sao Mộc thực tế từ NASA VSOP87 (chu kỳ 11.8618 năm)
        const jupLong = this.ephemeris.jupiter.longitude;
        const thanIdx = ThaiAtAstronomicalEngine.degTo16ThanIdx(jupLong);
        return {
            thanIdx,
            name: `Kế Thần [♃ Jup ${jupLong.toFixed(1)}°]`,
            class: "ke-than"
        };
    }

    // 4. KẾ ĐỊNH: Pha tương hỗ Mộc Tinh - Thái Tuế
    calcKeDinh(thaiTueIdx, vanXuongIdx) {
        if (vanXuongIdx === undefined) return { thanIdx: 15, name: "Kế Định", class: "ke-dinh" };
        const sunLong = this.ephemeris.sun.longitude;
        const jupLong = this.ephemeris.jupiter.longitude;
        const diff = ((sunLong - jupLong) + 360.0) % 360.0;
        const thanIdx = ThaiAtAstronomicalEngine.degTo16ThanIdx(diff);
        return { thanIdx, name: "Kế Định [NASA]", class: "ke-dinh" };
    }

    // 5. THỦY KÍCH (Địa Mục): Góc giao hội Mộc Tinh - Nút Nguyệt Đạo (Synodic Angle)
    calcThuyKich(vanXuongIdx, keThanIdx) {
        const jupLong = this.ephemeris.jupiter.longitude;
        const nodeLong = this.ephemeris.moon.ascendingNode;
        // Góc lệch pha tương đối giữa Nút Mặt Trăng và Sao Mộc
        const synodicAngle = ((nodeLong - jupLong) + 360.0) % 360.0;
        const thanIdx = ThaiAtAstronomicalEngine.degTo16ThanIdx(synodicAngle);
        return {
            thanIdx,
            name: `Thủy Kích [Δ(Ω-♃) ${synodicAngle.toFixed(1)}°]`,
            class: "thuy-kich"
        };
    }

    // 6. ĐẠI TƯỚNG & THAM TƯỚNG (CHỦ / KHÁCH): Tích phân đường Decile & Sóng hài bậc 3
    calcDaiTuongAndThamTuong(taIdx, vxIdx, tkIdx) {
        const PALACE_TO_THAN_IDX = [-1, 3, 13, 7, 9, -1, 1, 15, 5, 11];

        const chuToanObj = ThaiAtBaseEngine.getToanUnified(vxIdx, taIdx);
        const khachToanObj = ThaiAtBaseEngine.getToanUnified(tkIdx, taIdx);

        function getDaiTuongInfo(rawToan) {
            const donVi = rawToan % 10;
            if (donVi === 5) return { cungNum: 5, thanIdx: null, isClosed: true };
            let cungNum = donVi;
            if (donVi === 0) {
                cungNum = (Math.floor(rawToan / 10) % 10) || 1;
            }
            const thanIdx = PALACE_TO_THAN_IDX[cungNum] !== undefined ? PALACE_TO_THAN_IDX[cungNum] : null;
            return { cungNum, thanIdx, isClosed: false };
        }

        function getThamTuongInfo(daiCungNum) {
            if (!daiCungNum || daiCungNum === 5) return null;
            const thamCungNum = (daiCungNum * 3) % 10;
            if (thamCungNum === 5 || thamCungNum === 0) return null;
            const thanIdx = PALACE_TO_THAN_IDX[thamCungNum] !== undefined ? PALACE_TO_THAN_IDX[thamCungNum] : null;
            return { cungNum: thamCungNum, thanIdx };
        }

        const chuDaiInfo = getDaiTuongInfo(chuToanObj.raw);
        const khachDaiInfo = getDaiTuongInfo(khachToanObj.raw);

        const res = [];
        if (chuDaiInfo.thanIdx !== null) {
            res.push({ thanIdx: chuDaiInfo.thanIdx, name: `Đại Tướng Chủ (Toán ${chuToanObj.raw})`, class: "chu-tuong", rawToan: chuToanObj.raw, cungNum: chuDaiInfo.cungNum });
            const chuThamInfo = getThamTuongInfo(chuDaiInfo.cungNum);
            if (chuThamInfo && chuThamInfo.thanIdx !== null) {
                res.push({ thanIdx: chuThamInfo.thanIdx, name: `Tham Tướng Chủ`, class: "chu-tuong", cungNum: chuThamInfo.cungNum });
            }
        }
        
        if (khachDaiInfo.thanIdx !== null) {
            res.push({ thanIdx: khachDaiInfo.thanIdx, name: `Đại Tướng Khách (Toán ${khachToanObj.raw})`, class: "khach-tuong", rawToan: khachToanObj.raw, cungNum: khachDaiInfo.cungNum });
            const khachThamInfo = getThamTuongInfo(khachDaiInfo.cungNum);
            if (khachThamInfo && khachThamInfo.thanIdx !== null) {
                res.push({ thanIdx: khachThamInfo.thanIdx, name: `Tham Tướng Khách`, class: "khach-tuong", cungNum: khachThamInfo.cungNum });
            }
        }
        
        return res;
    }

    // 7. TAM CƠ, NGŨ PHÚC, ĐẠI DU (CƠ HỌC SAO THỔ, SAO MỘC & SAO KIM)
    calcCoPhucDu() {
        const satLong = this.ephemeris.saturn.longitude; // Sao Thổ (29.46 năm)
        const jupLong = this.ephemeris.jupiter.longitude; // Sao Mộc (11.86 năm)
        const venLong = this.ephemeris.venus.longitude;   // Sao Kim (8 năm Pentagram)
        const sunLong = this.ephemeris.sun.longitude;     // Mặt Trời

        // 1. Quân Cơ: Lượng tử hóa trực tiếp từ tọa độ Sao Thổ thực tế
        const quanCoIdx = ThaiAtAstronomicalEngine.degTo16ThanIdx(satLong);

        // 2. Thần Cơ: Lượng tử hóa sóng hài bậc 3 của Sao Mộc
        const thanCoIdx = ThaiAtAstronomicalEngine.degTo16ThanIdx(jupLong * 3.0);

        // 3. Dân Cơ: Lượng tử hóa từ kinh độ Mặt Trời thực tế
        const danCoIdx = ThaiAtAstronomicalEngine.degTo16ThanIdx(sunLong);

        // 4. Ngũ Phúc: Lượng tử hóa từ chu kỳ hoa văn 5 cánh Sao Kim (Venus Pentagram)
        const npIdx = ThaiAtAstronomicalEngine.degTo16ThanIdx(venLong * 5.0);

        // 5. Đại Du: Cộng hưởng Mộc - Thổ
        const ddIdx = ThaiAtAstronomicalEngine.degTo16ThanIdx(jupLong - satLong);

        // 6. Tiểu Du: Tương tác Nhật - Nguyệt
        const moonLong = this.ephemeris.moon.longitude;
        const tdIdx = ThaiAtAstronomicalEngine.degTo16ThanIdx(moonLong - sunLong);

        return [
            { thanIdx: quanCoIdx, name: `Quân Cơ [♄ Saturn ${satLong.toFixed(1)}°]`, class: "quan-co", unique: "quan_co" },
            { thanIdx: thanCoIdx, name: `Thần Cơ [♃ Jovian 3H ${(jupLong*3%360).toFixed(1)}°]`, class: "than-co", unique: "than_co" },
            { thanIdx: danCoIdx, name: `Dân Cơ [☉ Sun ${sunLong.toFixed(1)}°]`, class: "dan-co", unique: "dan_co" },
            { thanIdx: npIdx, name: `Ngũ Phúc [♀ Venus 5H]`, class: "ngu-phuc", unique: "ngu_phuc" },
            { thanIdx: ddIdx, name: `Đại Du [♃-♄ Conjunction]`, class: "dai-du", unique: "dai_du" },
            { thanIdx: tdIdx, name: "Tiểu Du [NASA]", class: "tieu-du", unique: "tieu_du" }
        ];
    }

    // 8. TỨ THẦN & BỘ CỜ KHÍ HỌC THIÊN VĂN
    calcTuThanKy() {
        const marsLong = this.ephemeris.mars.longitude;   // Sao Hỏa (Huỳnh Hoặc / Xích Kỳ)
        const jupLong = this.ephemeris.jupiter.longitude; // Sao Mộc (Thanh Long)
        const satLong = this.ephemeris.saturn.longitude; // Sao Thổ
        const sunLong = this.ephemeris.sun.longitude;     // Mặt Trời

        const tlIdx = ThaiAtAstronomicalEngine.degTo16ThanIdx(jupLong);       // Thanh Long (Mộc Kỳ)
        const xkIdx = ThaiAtAstronomicalEngine.degTo16ThanIdx(marsLong);      // Xích Kỳ (Hỏa Kỳ)
        const hkIdx = ThaiAtAstronomicalEngine.degTo16ThanIdx(jupLong - marsLong); // Hắc Kỳ (Thủy Kỳ)

        // Bát Phong / Tam Phong / Ngũ Phong: Lượng tử hóa trực tiếp từ góc chiếu Tiết Khí Mặt Trời thực tế
        const bpIdx = ThaiAtAstronomicalEngine.degTo16ThanIdx(sunLong * 8.0);
        const tpIdx = ThaiAtAstronomicalEngine.degTo16ThanIdx(sunLong * 3.0);
        const npPhongIdx = ThaiAtAstronomicalEngine.degTo16ThanIdx(sunLong * 5.0);
        const nhIdx = ThaiAtAstronomicalEngine.degTo16ThanIdx(sunLong * 4.0);

        // Tứ Thần không gian
        const tuThanIdx = ThaiAtAstronomicalEngine.degTo16ThanIdx(this.ephemeris.precessionDeg * 100.0);
        const thienAtIdx = ThaiAtAstronomicalEngine.degTo16ThanIdx(satLong + 60.0);
        const diaAtIdx = ThaiAtAstronomicalEngine.degTo16ThanIdx(satLong + 240.0);
        const trucPhuIdx = ThaiAtAstronomicalEngine.degTo16ThanIdx(jupLong + 180.0);
        const taIdx = ThaiAtAstronomicalEngine.degTo16ThanIdx(this.ephemeris.moon.longitude);

        return [
            { thanIdx: tuThanIdx, name: "Tứ Thần [Thiên Cực]", class: "tu-than" },
            { thanIdx: thienAtIdx, name: "Thiên Ất [Thuban]", class: "tu-than" },
            { thanIdx: diaAtIdx, name: "Địa Ất [Cực Hoàng Đạo]", class: "tu-than" },
            { thanIdx: trucPhuIdx, name: "Trực Phù [Thiên Đỉnh]", class: "tu-than" },
            { thanIdx: tlIdx, name: `Thanh Long [♃ Jup ${jupLong.toFixed(1)}°]`, class: "tu-than" },
            { thanIdx: taIdx, name: `Thái Âm [☽ Moon ${this.ephemeris.moon.longitude.toFixed(1)}°]`, class: "tu-than" },
            { thanIdx: xkIdx, name: `Xích Kỳ [♂ Mars ${marsLong.toFixed(1)}°]`, class: "co-khac" },
            { thanIdx: hkIdx, name: `Hắc Kỳ [Δ(♃-♂)]`, class: "co-khac" },
            { thanIdx: bpIdx, name: "Bát Phong [8 Tiết Khí]", class: "tu-than" },
            { thanIdx: tpIdx, name: "Tam Phong [3 Hoàn Lưu]", class: "tu-than" },
            { thanIdx: npPhongIdx, name: "Ngũ Phong [5 Khí Áp]", class: "tu-than" },
            { thanIdx: nhIdx, name: "Ngũ Hành [ENSO]", class: "tu-than" }
        ];
    }

    // 9. CỬU TINH VĂN XƯƠNG, QUÝ THẦN & BÁT MÔN
    calcCuuTinh() {
        const res = [];
        const satLong = this.ephemeris.saturn.longitude;
        const BIET_SO_TO_THAN_IDX = { 1: 5, 2: 15, 3: 9, 4: 11, 5: -1, 6: 3, 7: 1, 8: 7, 9: 13 };
        
        // 9 Sao Văn Xương: phân bố trên 9 chu kỳ Sao Thổ (270 năm)
        const VX_SAO_NAMES = ["Văn Xương", "Huyền Phượng", "Minh Duy", "Âm Đức", "Chiêu Dao", "Hoa Minh", "Huyền Vũ", "Huyền Minh", "Cưu Minh"];
        const vxStarIdx = Math.floor(satLong / 40.0) % 9;
        
        for (let bietSo = 1; bietSo <= 9; bietSo++) {
            const currentStarName = VX_SAO_NAMES[(vxStarIdx + bietSo - 1) % 9];
            const thanIdx = BIET_SO_TO_THAN_IDX[bietSo];
            res.push({
                thanIdx: thanIdx,
                name: currentStarName + " (VX-NASA)",
                class: "van-xuong-9",
                unique: 'VX_' + currentStarName
            });
        }

        // 9 Sao Quý Thần (Bắc Đẩu Cửu Tinh)
        const QT_SAO_NAMES = ["Thái Nhất", "Thiên Hoàng", "Thái Âm", "Hàm Trì", "Thanh Long", "Thiên Phù", "Chiêu Dao", "Hiên Viên", "Nhiếp Đề"];
        const qtStarIdx = Math.floor(this.ephemeris.sun.longitude / 40.0) % 9;
        
        for (let i = 0; i < 9; i++) {
            const starName = QT_SAO_NAMES[(qtStarIdx + i) % 9];
            const thanIdx = BIET_SO_TO_THAN_IDX[i + 1] || -1;
            res.push({
                thanIdx: thanIdx,
                name: starName + " (QT-NASA)",
                class: "quy-than-9",
                unique: 'QT_' + starName
            });
        }

        return res;
    }

    // 10. BÁT MÔN THIÊN VĂN (8 Cửa Giao Hội Mộc - Thổ)
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

        const jupLong = this.ephemeris.jupiter.longitude;
        const satLong = this.ephemeris.saturn.longitude;
        const phaseJupSat = ((jupLong - satLong) + 360.0) % 360.0;
        const startDoorIdx = Math.floor(phaseJupSat / 45.0) % 8;

        for (let i = 0; i < 8; i++) {
            const doorName = BAT_MON_LIST[(startDoorIdx + i) % 8];
            const pal = BAT_QUAI_PALACES[i];
            const isSinhOrKhai = (doorName === "Sinh" || doorName === "Khai");
            res.push({
                thanIdx: pal.thanIdx,
                name: `Cửa ${doorName} [NASA]`,
                class: isSinhOrKhai ? "bat-mon-good" : "bat-mon-normal",
                cungName: pal.name
            });
        }
        return res;
    }

    calcOtherStars() {
        return [];
    }

    calcThaiTue() {
        const jupLong = this.ephemeris.jupiter.longitude;
        const thanIdx = ThaiAtAstronomicalEngine.degTo16ThanIdx(jupLong);
        return { thanIdx, class: 'thai-tue', name: 'Thái Tuế [♃ Jupiter]' };
    }

    getAllStars() {
        const thaiAt = this.calcThaiAt();
        const vanXuong = this.calcVanXuong();
        const keThan = this.calcKeThan();
        const thaiTue = this.calcThaiTue();
        const thaiTueIdx = thaiTue.thanIdx;
        const keDinh = this.calcKeDinh(thaiTueIdx, vanXuong.thanIdx);
        const thuyKich = this.calcThuyKich(vanXuong.thanIdx, keThan.thanIdx);
        const tuongStars = this.calcDaiTuongAndThamTuong(thaiAt.thanIdx, vanXuong.thanIdx, thuyKich.thanIdx);
        
        const THAN_HOP_MAP = { 0:12, 1:10, 2:9, 3:15, 4:8, 5:6, 6:5, 7:11, 8:4, 9:2, 10:1, 11:7, 12:0, 13:14, 14:13, 15:3 };
        const thanHopIdx = THAN_HOP_MAP[thaiTueIdx] !== undefined ? THAN_HOP_MAP[thaiTueIdx] : thaiTueIdx;

        const thaiTueStar = { thanIdx: thaiTueIdx, name: "Thái Tuế [♃ Jup]", class: "other-stars", unique: "thai_tue" };
        const thanHopStar = { thanIdx: thanHopIdx, name: "Thần Hợp", class: "other-stars", unique: "than_hop" };

        const all = [
            thaiAt, vanXuong, keThan, keDinh, thuyKich,
            thaiTueStar, thanHopStar,
            ...tuongStars,
            ...this.calcCoPhucDu(),
            ...this.calcTuThanKy(),
            ...this.calcCuuTinh(),
            ...this.calcOtherStars(),
            ...this.calcBatMon8()
        ];
        
        const placement = { "trung_cung": [] };
        if (typeof THAP_LUC_THAN !== 'undefined') {
            THAP_LUC_THAN.forEach(t => placement[t.id] = []);
        } else {
            const ids = ["than", "dau", "tuat", "kien", "hoi", "ty", "suu", "can", "dan", "mao", "thin", "ton", "ty_chi", "ngo", "mui", "khon"];
            ids.forEach(id => placement[id] = []);
        }
        const seenInPalace = {};
        
        all.forEach(s => {
            if (!s || s.thanIdx === undefined) return;
            let targetKey = "trung_cung";
            if (s.thanIdx !== -1) {
                if (typeof THAP_LUC_THAN !== 'undefined' && THAP_LUC_THAN[s.thanIdx]) {
                    targetKey = THAP_LUC_THAN[s.thanIdx].id;
                } else {
                    const ids = ["than", "dau", "tuat", "kien", "hoi", "ty", "suu", "can", "dan", "mao", "thin", "ton", "ty_chi", "ngo", "mui", "khon"];
                    targetKey = ids[s.thanIdx];
                }
            }
            if (!targetKey) return;
            
            if (!seenInPalace[targetKey]) seenInPalace[targetKey] = new Set();
            const starKey = s.unique || s.name;
            
            if (!seenInPalace[targetKey].has(starKey) || s.name.startsWith("Cửa ")) {
                seenInPalace[targetKey].add(starKey);
                placement[targetKey].push(s);
            }
        });
        
        const chuTuongStar = tuongStars.find(s => s.class === "chu-tuong" && s.name.startsWith("Đại Tướng"));
        const khachTuongStar = tuongStars.find(s => s.class === "khach-tuong" && s.name.startsWith("Đại Tướng"));
        const ctIdx = chuTuongStar ? chuTuongStar.thanIdx : -1;
        const ktIdx = khachTuongStar ? khachTuongStar.thanIdx : -1;
        
        return {
            placement, 
            flat: all, 
            core: { taIdx: thaiAt.thanIdx, vxIdx: vanXuong.thanIdx, tkIdx: thuyKich.thanIdx, ctIdx, ktIdx }
        };
    }
}

if (typeof window !== 'undefined') {
    window.ThaiAtAstronomicalEngine = ThaiAtAstronomicalEngine;
}

if (typeof globalThis !== 'undefined') {
    globalThis.ThaiAtAstronomicalEngine = ThaiAtAstronomicalEngine;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ThaiAtAstronomicalEngine };
}
