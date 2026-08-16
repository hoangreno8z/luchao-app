/**
 * Module Tra Cứu Thần Sát Bát Tự Toàn Diện — Dịch Sư Nguyễn Huy Hoàng
 * Chuẩn hóa theo Tử Bình Chân Thuyên, Uyên Hải Tử Bình, Tam Mệnh Thông Hội & bazi-reader-mcp
 * Mở rộng hơn 35+ Thần Sát Cát Hung và Quan Hệ Can Chi
 */

(function(global) {
    const STEMS = ["Giáp", "Ất", "Bính", "Đinh", "Mậu", "Kỷ", "Canh", "Tân", "Nhâm", "Quý"];
    const BRANCHES = ["Tý", "Sửu", "Dần", "Mão", "Thìn", "Tị", "Ngọ", "Mùi", "Thân", "Dậu", "Tuất", "Hợi"];

    // 1. Thiên Ất Quý Nhân (Tra theo Can Ngày & Can Năm)
    const THIEN_AT_MAP = {
        "Giáp": ["Sửu", "Mùi"], "Mậu": ["Sửu", "Mùi"], "Canh": ["Sửu", "Mùi"],
        "Ất": ["Tý", "Thân"],   "Kỷ": ["Tý", "Thân"],
        "Bính": ["Hợi", "Dậu"], "Đinh": ["Hợi", "Dậu"],
        "Tân": ["Ngọ", "Dần"],
        "Nhâm": ["Mão", "Tị"],  "Quý": ["Mão", "Tị"]
    };

    // 2. Thái Cực Quý Nhân (Tra theo Can Ngày & Can Năm)
    const THAI_CUC_MAP = {
        "Giáp": ["Tý", "Ngọ"], "Ất": ["Tý", "Ngọ"],
        "Bính": ["Mão", "Dậu"], "Đinh": ["Mão", "Dậu"],
        "Mậu": ["Thìn", "Tuất", "Sửu", "Mùi"], "Kỷ": ["Thìn", "Tuất", "Sửu", "Mùi"],
        "Canh": ["Dần", "Hợi"], "Tân": ["Dần", "Hợi"],
        "Nhâm": ["Tị", "Thân"], "Quý": ["Tị", "Thân"]
    };

    // 3. Phúc Tinh Quý Nhân
    const PHUC_TINH_MAP = {
        "Giáp": ["Dần", "Tý"],
        "Ất": ["Sửu", "Hợi"],
        "Bính": ["Tý"],
        "Đinh": ["Dậu"],
        "Mậu": ["Thân", "Tý"],
        "Kỷ": ["Mùi"],
        "Canh": ["Ngọ"],
        "Tân": ["Tị"],
        "Nhâm": ["Thìn"],
        "Quý": ["Mão", "Sửu"]
    };

    // 4. Văn Xương Quý Nhân
    const VAN_XUONG_MAP = {
        "Giáp": "Tị", "Ất": "Ngọ", "Bính": "Thân", "Mậu": "Thân",
        "Đinh": "Dậu", "Kỷ": "Dậu", "Canh": "Hợi", "Tân": "Tý",
        "Nhâm": "Dần", "Quý": "Mão"
    };

    // 5. Quốc Ấn Quý Nhân (Tra theo Can Ngày & Can Năm)
    const QUOC_AN_MAP = {
        "Giáp": "Tuất", "Ất": "Hợi", "Bính": "Sửu", "Đinh": "Dần",
        "Mậu": "Sửu", "Kỷ": "Dần", "Canh": "Thìn", "Tân": "Tị",
        "Nhâm": "Mùi", "Quý": "Thân"
    };

    // 6. Lộc Thần & Kình Dương (Dương Nhẫn) & Phi Nhẫn
    const LOC_THAN_MAP = {
        "Giáp": "Dần", "Ất": "Mão", "Bính": "Tị", "Mậu": "Tị",
        "Đinh": "Ngọ", "Kỷ": "Ngọ", "Canh": "Thân", "Tân": "Dậu",
        "Nhâm": "Hợi", "Quý": "Tý"
    };

    const KINH_DUONG_MAP = {
        "Giáp": "Mão", "Ất": "Thìn", "Bính": "Ngọ", "Mậu": "Ngọ",
        "Đinh": "Mùi", "Kỷ": "Mùi", "Canh": "Dậu", "Tân": "Tuất",
        "Nhâm": "Tý", "Quý": "Sửu"
    };

    const PHI_NHAN_MAP = {
        "Giáp": "Dậu", "Ất": "Tuất", "Bính": "Tý", "Mậu": "Tý",
        "Đinh": "Sửu", "Kỷ": "Sửu", "Canh": "Mão", "Tân": "Thìn",
        "Nhâm": "Ngọ", "Quý": "Mùi"
    };

    // 7. Kim Dư
    const KIM_DU_MAP = {
        "Giáp": "Thìn", "Ất": "Tị", "Bính": "Mùi", "Mậu": "Mùi",
        "Đinh": "Thân", "Kỷ": "Thân", "Canh": "Tuất", "Tân": "Hợi",
        "Nhâm": "Sửu", "Quý": "Dần"
    };

    // 8. Học Đường & Từ Quán
    const HOC_DUONG_MAP = {
        "Giáp": "Hợi", "Ất": "Ngọ", "Bính": "Dần", "Đinh": "Dậu",
        "Mậu": "Dần", "Kỷ": "Dậu", "Canh": "Tị", "Tân": "Tý",
        "Nhâm": "Thân", "Quý": "Mão"
    };

    // 9. Hồng Diễm Sát
    const HONG_DIEM_MAP = {
        "Giáp": ["Ngọ"], "Ất": ["Thân"], "Bính": ["Dần"], "Đinh": ["Mùi"],
        "Mậu": ["Thìn"], "Kỷ": ["Thìn"], "Canh": ["Tuất"], "Tân": ["Dậu"],
        "Nhâm": ["Tý"], "Quý": ["Thân"]
    };

    // 10. Hồng Loan & Thiên Hỷ (Tra theo Chi Năm)
    const HONG_LOAN_MAP = {
        "Tý": "Mão", "Sửu": "Dần", "Dần": "Sửu", "Mão": "Tý",
        "Thìn": "Hợi", "Tị": "Tuất", "Ngọ": "Dậu", "Mùi": "Thân",
        "Thân": "Mùi", "Dậu": "Ngọ", "Tuất": "Tị", "Hợi": "Thìn"
    };

    const THIEN_HY_MAP = {
        "Tý": "Dậu", "Sửu": "Thân", "Dần": "Mùi", "Mão": "Ngọ",
        "Thìn": "Tị", "Tị": "Thìn", "Ngọ": "Mão", "Mùi": "Dần",
        "Thân": "Sửu", "Dậu": "Tý", "Tuất": "Hợi", "Hợi": "Tuất"
    };

    // 11. Cô Thần & Quả Tú (Tra theo Chi Năm)
    function getCoThanQuaTu(yearBranch) {
        if (["Hợi", "Tý", "Sửu"].includes(yearBranch)) return { coThan: "Dần", quaTu: "Tuất" };
        if (["Dần", "Mão", "Thìn"].includes(yearBranch)) return { coThan: "Tị", quaTu: "Sửu" };
        if (["Tị", "Ngọ", "Mùi"].includes(yearBranch)) return { coThan: "Thân", quaTu: "Thìn" };
        return { coThan: "Hợi", quaTu: "Mùi" }; // Thân Dậu Tuất
    }

    // 12. Tam Hợp Cục Thần Sát (Tra theo Chi Ngày & Chi Năm)
    function getTamHopThanSat(branch) {
        if (["Thân", "Tý", "Thìn"].includes(branch)) {
            return {
                tuongTinh: "Tý",
                hoaCai: "Thìn",
                dichMa: "Dần",
                daoHoa: "Dậu",
                kiepSat: "Tị",
                vongThan: "Hợi",
                taiSat: "Ngọ",
                tueSat: "Mùi",
                cauGiao: "Sửu"
            };
        }
        if (["Dần", "Ngọ", "Tuất"].includes(branch)) {
            return {
                tuongTinh: "Ngọ",
                hoaCai: "Tuất",
                dichMa: "Thân",
                daoHoa: "Mão",
                kiepSat: "Hợi",
                vongThan: "Tị",
                taiSat: "Tý",
                tueSat: "Sửu",
                cauGiao: "Mùi"
            };
        }
        if (["Tị", "Dậu", "Sửu"].includes(branch)) {
            return {
                tuongTinh: "Dậu",
                hoaCai: "Sửu",
                dichMa: "Hợi",
                daoHoa: "Ngọ",
                kiepSat: "Dần",
                vongThan: "Thân",
                taiSat: "Mão",
                tueSat: "Thìn",
                cauGiao: "Tuất"
            };
        }
        // Hợi - Mão - Mùi
        return {
            tuongTinh: "Mão",
            hoaCai: "Mùi",
            dichMa: "Tị",
            daoHoa: "Tý",
            kiepSat: "Thân",
            vongThan: "Dần",
            taiSat: "Dậu",
            tueSat: "Tuất",
            cauGiao: "Thìn"
        };
    }

    // 13. Không Vong (Tuần Không) của Can Chi
    function getKhongVong(stem, branch) {
        const sIdx = STEMS.indexOf(stem);
        const bIdx = BRANCHES.indexOf(branch);
        if (sIdx === -1 || bIdx === -1) return [];
        const diff = (bIdx - sIdx + 12) % 12;
        const kv1Idx = (diff + 10) % 12;
        const kv2Idx = (diff + 11) % 12;
        return [BRANCHES[kv1Idx], BRANCHES[kv2Idx]];
    }

    // 14. Thiên Đức & Nguyệt Đức Quý Nhân (Tra theo Nguyệt Chi)
    function getThienNguyetDuc(monthBranch) {
        let thienDuc = null;
        let nguyetDuc = null;
        let thienDucHop = null;
        let nguyetDucHop = null;

        switch (monthBranch) {
            case "Dần": thienDuc = { type: "stem", val: "Đinh" }; thienDucHop = "Nhâm"; break;
            case "Mão": thienDuc = { type: "branch", val: "Thân" }; thienDucHop = "Tị"; break;
            case "Thìn": thienDuc = { type: "stem", val: "Nhâm" }; thienDucHop = "Đinh"; break;
            case "Tị": thienDuc = { type: "stem", val: "Tân" }; thienDucHop = "Bính"; break;
            case "Ngọ": thienDuc = { type: "branch", val: "Hợi" }; thienDucHop = "Dần"; break;
            case "Mùi": thienDuc = { type: "stem", val: "Giáp" }; thienDucHop = "Kỷ"; break;
            case "Thân": thienDuc = { type: "stem", val: "Quý" }; thienDucHop = "Mậu"; break;
            case "Dậu": thienDuc = { type: "branch", val: "Dần" }; thienDucHop = "Hợi"; break;
            case "Tuất": thienDuc = { type: "stem", val: "Bính" }; thienDucHop = "Tân"; break;
            case "Hợi": thienDuc = { type: "stem", val: "Ất" }; thienDucHop = "Canh"; break;
            case "Tý": thienDuc = { type: "branch", val: "Tị" }; thienDucHop = "Thân"; break;
            case "Sửu": thienDuc = { type: "stem", val: "Canh" }; thienDucHop = "Ất"; break;
        }

        if (["Dần", "Ngọ", "Tuất"].includes(monthBranch)) { nguyetDuc = "Bính"; nguyetDucHop = "Tân"; }
        else if (["Thân", "Tý", "Thìn"].includes(monthBranch)) { nguyetDuc = "Nhâm"; nguyetDucHop = "Đinh"; }
        else if (["Tị", "Dậu", "Sửu"].includes(monthBranch)) { nguyetDuc = "Canh"; nguyetDucHop = "Ất"; }
        else if (["Hợi", "Mão", "Mùi"].includes(monthBranch)) { nguyetDuc = "Giáp"; nguyetDucHop = "Kỷ"; }

        return { thienDuc, nguyetDuc, thienDucHop, nguyetDucHop };
    }

    // 15. Đại Hao (Nguyên Thần - Tra theo Chi Năm)
    function getDaiHao(yearBranch, isYangMaleOrYinFemale = true) {
        const bIdx = BRANCHES.indexOf(yearBranch);
        if (bIdx === -1) return null;
        if (isYangMaleOrYinFemale) {
            return BRANCHES[(bIdx + 7) % 12];
        } else {
            return BRANCHES[(bIdx + 5) % 12];
        }
    }

    // 16. Thiên La & Địa Võng
    function checkThienLaDiaVong(branch) {
        if (branch === "Tuất" || branch === "Hợi") return "Thiên La";
        if (branch === "Thìn" || branch === "Tị") return "Địa Võng";
        return null;
    }

    /**
     * Tra cứu Thần Sát chi tiết cho 4 Trụ (Năm, Tháng, Ngày, Giờ)
     */
    function calculatePillarsThanSat(pillars, isMale = true) {
        const { year, month, day, time } = pillars;
        const res = { year: [], month: [], day: [], time: [] };

        const dayStem = day.stem;
        const yearStem = year.stem;
        const dayBranch = day.branch;
        const yearBranch = year.branch;
        const monthBranch = month.branch;

        const dayTamHop = getTamHopThanSat(dayBranch);
        const yearTamHop = getTamHopThanSat(yearBranch);

        const dayKhongVong = getKhongVong(day.stem, day.branch);
        const yearKhongVong = getKhongVong(year.stem, year.branch);

        const { thienDuc, nguyetDuc, thienDucHop, nguyetDucHop } = getThienNguyetDuc(monthBranch);
        const { coThan, quaTu } = getCoThanQuaTu(yearBranch);
        
        const isYangYear = ["Giáp", "Bính", "Mậu", "Canh", "Nhâm"].includes(yearStem);
        const isYangMaleOrYinFemale = (isMale && isYangYear) || (!isMale && !isYangYear);
        const daiHaoBranch = getDaiHao(yearBranch, isYangMaleOrYinFemale);

        const pillarKeys = ["year", "month", "day", "time"];

        pillarKeys.forEach(k => {
            const p = pillars[k];
            const pStem = p.stem;
            const pBranch = p.branch;
            const list = new Set();

            // 1. Thiên Ất Quý Nhân
            const ta1 = THIEN_AT_MAP[dayStem] || [];
            const ta2 = THIEN_AT_MAP[yearStem] || [];
            if (ta1.includes(pBranch) || ta2.includes(pBranch)) list.add("Thiên Ất");

            // 2. Thái Cực Quý Nhân
            const tc1 = THAI_CUC_MAP[dayStem] || [];
            const tc2 = THAI_CUC_MAP[yearStem] || [];
            if (tc1.includes(pBranch) || tc2.includes(pBranch)) list.add("Thái Cực");

            // 3. Phúc Tinh Quý Nhân
            const pt1 = PHUC_TINH_MAP[dayStem] || [];
            const pt2 = PHUC_TINH_MAP[yearStem] || [];
            if (pt1.includes(pBranch) || pt2.includes(pBranch)) list.add("Phúc Tinh");

            // 4. Quốc Ấn Quý Nhân
            if (pBranch === QUOC_AN_MAP[dayStem] || pBranch === QUOC_AN_MAP[yearStem]) list.add("Quốc Ấn");

            // 5. Văn Xương Quý Nhân
            if (pBranch === VAN_XUONG_MAP[dayStem] || pBranch === VAN_XUONG_MAP[yearStem]) list.add("Văn Xương");

            // 6. Học Đường Quý Nhân
            if (pBranch === HOC_DUONG_MAP[dayStem]) list.add("Học Đường");

            // 7. Lộc Thần
            if (pBranch === LOC_THAN_MAP[dayStem] || pBranch === LOC_THAN_MAP[yearStem]) list.add("Lộc Thần");

            // 8. Kình Dương (Dương Nhẫn)
            if (pBranch === KINH_DUONG_MAP[dayStem] || pBranch === KINH_DUONG_MAP[yearStem]) list.add("Kình Dương");

            // 9. Phi Nhẫn
            if (pBranch === PHI_NHAN_MAP[dayStem] || pBranch === PHI_NHAN_MAP[yearStem]) list.add("Phi Nhẫn");

            // 10. Kim Dư
            if (pBranch === KIM_DU_MAP[dayStem] || pBranch === KIM_DU_MAP[yearStem]) list.add("Kim Dư");

            // 11. Tướng Tinh
            if (pBranch === dayTamHop.tuongTinh || pBranch === yearTamHop.tuongTinh) list.add("Tướng Tinh");

            // 12. Hoa Cái
            if (pBranch === dayTamHop.hoaCai || pBranch === yearTamHop.hoaCai) list.add("Hoa Cái");

            // 13. Dịch Mã / Trạch Mã
            if (pBranch === dayTamHop.dichMa || pBranch === yearTamHop.dichMa) list.add("Trạch Mã");

            // 14. Đào Hoa (Hàm Trì)
            if (pBranch === dayTamHop.daoHoa || pBranch === yearTamHop.daoHoa) list.add("Đào Hoa");

            // 15. Hồng Loan & Thiên Hỷ
            if (pBranch === HONG_LOAN_MAP[yearBranch]) list.add("Hồng Loan");
            if (pBranch === THIEN_HY_MAP[yearBranch]) list.add("Thiên Hỷ");

            // 16. Hồng Diễm Sát
            const hd1 = HONG_DIEM_MAP[dayStem] || [];
            if (hd1.includes(pBranch)) list.add("Hồng Diễm");

            // 17. Thiên Đức & Thiên Đức Hợp
            if (thienDuc) {
                if (thienDuc.type === "stem" && pStem === thienDuc.val) list.add("Thiên Đức");
                if (thienDuc.type === "branch" && pBranch === thienDuc.val) list.add("Thiên Đức");
            }
            if (thienDucHop && pStem === thienDucHop) list.add("Thiên Đức Hợp");

            // 18. Nguyệt Đức & Nguyệt Đức Hợp
            if (nguyetDuc && (pStem === nguyetDuc || (k === "day" && dayStem === nguyetDuc))) list.add("Nguyệt Đức");
            if (nguyetDucHop && pStem === nguyetDucHop) list.add("Nguyệt Đức Hợp");

            // 19. Kiếp Sát
            if (pBranch === dayTamHop.kiepSat || pBranch === yearTamHop.kiepSat) list.add("Kiếp Sát");

            // 20. Vong Thần
            if (pBranch === dayTamHop.vongThan || pBranch === yearTamHop.vongThan) list.add("Vong Thần");

            // 21. Tai Sát
            if (pBranch === dayTamHop.taiSat || pBranch === yearTamHop.taiSat) list.add("Tai Sát");

            // 22. Tuế Sát
            if (pBranch === dayTamHop.tueSat || pBranch === yearTamHop.tueSat) list.add("Tuế Sát");

            // 23. Cô Thần & Quả Tú
            if (pBranch === coThan) list.add("Cô Thần");
            if (pBranch === quaTu) list.add("Quả Tú");

            // 24. Đại Hao (Nguyên Thần)
            if (daiHaoBranch && pBranch === daiHaoBranch) list.add("Đại Hao");

            // 25. Thiên La & Địa Võng
            const tldv = checkThienLaDiaVong(pBranch);
            if (tldv) list.add(tldv);

            // 26. Không Vong (Tuần Không)
            if (dayKhongVong.includes(pBranch) || yearKhongVong.includes(pBranch)) list.add("Không Vong");

            // 27. Khôi Cương (Xét riêng cho Trụ Ngày)
            if (k === "day") {
                const dayGz = dayStem + " " + dayBranch;
                if (["Mậu Tuất", "Canh Thìn", "Canh Tuất", "Nhâm Thìn"].includes(dayGz)) {
                    list.add("Khôi Cương");
                }
                // Thập Ác Đại Bại
                if (["Giáp Thìn", "Ất Tị", "Bính Thân", "Đinh Hợi", "Mậu Tuất", "Kỷ Sửu", "Canh Thìn", "Tân Tị", "Nhâm Thân", "Quý Hợi"].includes(dayGz)) {
                    list.add("Thập Ác Đại Bại");
                }
                // Âm Dương Sai Thác
                if (["Bính Tý", "Bính Ngọ", "Đinh Sửu", "Đinh Mùi", "Mậu Dần", "Mậu Thân", "Tân Mão", "Tân Dậu", "Nhâm Thìn", "Nhâm Tuất", "Quý Tị", "Quý Hợi"].includes(dayGz)) {
                    list.add("Âm Dương Sai Thác");
                }
                // Cô Loan Sát
                if (["Ất Tị", "Đinh Tị", "Tân Hợi", "Mậu Thân", "Giáp Dần", "Mậu Ngọ", "Nhâm Tý"].includes(dayGz)) {
                    list.add("Cô Loan");
                }
            }

            res[k] = Array.from(list);
        });

        return res;
    }

    global.BatTuThanSat = {
        calculatePillarsThanSat,
        getTamHopThanSat,
        getKhongVong,
        getThienNguyetDuc,
        getCoThanQuaTu
    };

})(typeof window !== "undefined" ? window : globalThis);
