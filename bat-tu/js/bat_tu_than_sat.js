/**
 * Module Tra Cứu Thần Sát Bát Tự Toàn Diện — Dịch Sư Nguyễn Huy Hoàng
 * Chuẩn hóa theo Tử Bình Chân Thuyên, Uyên Hải Tử Bình, Tam Mệnh Thông Hội
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

    // 3. Phúc Tinh Quý Nhân (Tra theo Can Ngày & Can Năm)
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

    // 4. Văn Xương Quý Nhân (Tra theo Can Ngày & Can Năm)
    const VAN_XUONG_MAP = {
        "Giáp": "Tị", "Ất": "Ngọ", "Bính": "Thân", "Mậu": "Thân",
        "Đinh": "Dậu", "Kỷ": "Dậu", "Canh": "Hợi", "Tân": "Tý",
        "Nhâm": "Dần", "Quý": "Mão"
    };

    // 5. Lộc Thần (Lộc Vị) & Kình Dương (Dương Nhẫn)
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

    // 6. Kim Dư (Tra theo Can Ngày & Năm)
    const KIM_DU_MAP = {
        "Giáp": "Thìn", "Ất": "Tị", "Bính": "Mùi", "Mậu": "Mùi",
        "Đinh": "Thân", "Kỷ": "Thân", "Canh": "Tuất", "Tân": "Hợi",
        "Nhâm": "Sửu", "Quý": "Dần"
    };

    // 7. Hồng Diễm Sát
    const HONG_DIEM_MAP = {
        "Giáp": ["Ngọ"], "Ất": ["Thân"], "Bính": ["Dần"], "Đinh": ["Mùi"],
        "Mậu": ["Thìn"], "Kỷ": ["Thìn"], "Canh": ["Tuất"], "Tân": ["Dậu"],
        "Nhâm": ["Tý"], "Quý": ["Thân"]
    };

    // 8. Tam Hợp Cục Thần Sát (Tra theo Chi Ngày & Chi Năm)
    function getTamHopThanSat(branch) {
        if (["Thân", "Tý", "Thìn"].includes(branch)) {
            return {
                tuongTinh: "Tý",
                hoaCai: "Thìn",
                dichMa: "Dần",
                daoHoa: "Dậu",
                kiepSat: "Tị",
                vongThan: "Hợi",
                taiSat: "Ngọ"
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
                taiSat: "Tý"
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
                taiSat: "Mão"
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
            taiSat: "Dậu"
        };
    }

    // 9. Không Vong (Tuần Không) của Can Chi
    function getKhongVong(stem, branch) {
        const sIdx = STEMS.indexOf(stem);
        const bIdx = BRANCHES.indexOf(branch);
        if (sIdx === -1 || bIdx === -1) return [];
        const diff = (bIdx - sIdx + 12) % 12;
        const kv1Idx = (diff + 10) % 12;
        const kv2Idx = (diff + 11) % 12;
        return [BRANCHES[kv1Idx], BRANCHES[kv2Idx]];
    }

    // 10. Thiên Đức & Nguyệt Đức Quý Nhân (Tra theo Nguyệt Chi)
    function getThienNguyetDuc(monthBranch) {
        let thienDuc = null;
        let nguyetDuc = null;

        switch (monthBranch) {
            case "Dần": thienDuc = { type: "stem", val: "Đinh" }; break;
            case "Mão": thienDuc = { type: "branch", val: "Thân" }; break;
            case "Thìn": thienDuc = { type: "stem", val: "Nhâm" }; break;
            case "Tị": thienDuc = { type: "stem", val: "Tân" }; break;
            case "Ngọ": thienDuc = { type: "branch", val: "Hợi" }; break;
            case "Mùi": thienDuc = { type: "stem", val: "Giáp" }; break;
            case "Thân": thienDuc = { type: "stem", val: "Quý" }; break;
            case "Dậu": thienDuc = { type: "branch", val: "Dần" }; break;
            case "Tuất": thienDuc = { type: "stem", val: "Bính" }; break;
            case "Hợi": thienDuc = { type: "stem", val: "Ất" }; break;
            case "Tý": thienDuc = { type: "branch", val: "Tị" }; break;
            case "Sửu": thienDuc = { type: "stem", val: "Canh" }; break;
        }

        if (["Dần", "Ngọ", "Tuất"].includes(monthBranch)) nguyetDuc = "Bính";
        else if (["Thân", "Tý", "Thìn"].includes(monthBranch)) nguyetDuc = "Nhâm";
        else if (["Tị", "Dậu", "Sửu"].includes(monthBranch)) nguyetDuc = "Canh";
        else if (["Hợi", "Mão", "Mùi"].includes(monthBranch)) nguyetDuc = "Giáp";

        return { thienDuc, nguyetDuc };
    }

    /**
     * Tra cứu Thần Sát cho 4 Trụ (Năm, Tháng, Ngày, Giờ)
     */
    function calculatePillarsThanSat(pillars) {
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

        const { thienDuc, nguyetDuc } = getThienNguyetDuc(monthBranch);

        const pillarKeys = ["year", "month", "day", "time"];

        pillarKeys.forEach(k => {
            const p = pillars[k];
            const pStem = p.stem;
            const pBranch = p.branch;
            const list = new Set();

            // 1. Hoa Cái
            if (pBranch === dayTamHop.hoaCai || pBranch === yearTamHop.hoaCai) list.add("Hoa Cái");

            // 2. Tướng Tinh
            if (pBranch === dayTamHop.tuongTinh || pBranch === yearTamHop.tuongTinh) list.add("Tướng Tinh");

            // 3. Dịch Mã / Trạch Mã
            if (pBranch === dayTamHop.dichMa || pBranch === yearTamHop.dichMa) list.add("Trạch Mã");

            // 4. Đào Hoa (Hàm Trì)
            if (pBranch === dayTamHop.daoHoa || pBranch === yearTamHop.daoHoa) list.add("Đào Hoa");

            // 5. Phúc Tinh Quý Nhân
            const pt1 = PHUC_TINH_MAP[dayStem] || [];
            const pt2 = PHUC_TINH_MAP[yearStem] || [];
            const pt3 = PHUC_TINH_MAP[pStem] || [];
            if (pt1.includes(pBranch) || pt2.includes(pBranch) || pt3.includes(pBranch)) list.add("Phúc Tinh");

            // 6. Nguyệt Đức Quý Nhân
            if (nguyetDuc && (pStem === nguyetDuc || (k === "day" && dayStem === nguyetDuc))) {
                list.add("Nguyệt Đức");
            }

            // 7. Thiên Đức Quý Nhân
            if (thienDuc) {
                if (thienDuc.type === "stem" && pStem === thienDuc.val) list.add("Thiên Đức");
                if (thienDuc.type === "branch" && pBranch === thienDuc.val) list.add("Thiên Đức");
            }

            // 8. Thiên Ất Quý Nhân
            const ta1 = THIEN_AT_MAP[dayStem] || [];
            const ta2 = THIEN_AT_MAP[yearStem] || [];
            if (ta1.includes(pBranch) || ta2.includes(pBranch)) list.add("Thiên Ất");

            // 9. Thái Cực Quý Nhân
            const tc1 = THAI_CUC_MAP[dayStem] || [];
            const tc2 = THAI_CUC_MAP[yearStem] || [];
            if (tc1.includes(pBranch) || tc2.includes(pBranch)) list.add("Thái Cực");

            // 10. Văn Xương
            if (pBranch === VAN_XUONG_MAP[dayStem] || pBranch === VAN_XUONG_MAP[yearStem]) list.add("Văn Xương");

            // 11. Lộc Thần
            if (pBranch === LOC_THAN_MAP[dayStem] || pBranch === LOC_THAN_MAP[yearStem]) list.add("Lộc Thần");

            // 12. Kình Dương
            if (pBranch === KINH_DUONG_MAP[dayStem] || pBranch === KINH_DUONG_MAP[yearStem]) list.add("Kình Dương");

            // 13. Kim Dư
            if (pBranch === KIM_DU_MAP[dayStem] || pBranch === KIM_DU_MAP[yearStem]) list.add("Kim Dư");

            // 14. Hồng Diễm
            const hd1 = HONG_DIEM_MAP[dayStem] || [];
            if (hd1.includes(pBranch)) list.add("Hồng Diễm");

            // 15. Không Vong (Tuần Không)
            if (dayKhongVong.includes(pBranch) || yearKhongVong.includes(pBranch)) list.add("Không Vong");

            // 16. Kiếp Sát
            if (pBranch === dayTamHop.kiepSat || pBranch === yearTamHop.kiepSat) list.add("Kiếp Sát");

            // 17. Vong Thần
            if (pBranch === dayTamHop.vongThan || pBranch === yearTamHop.vongThan) list.add("Vong Thần");

            res[k] = Array.from(list);
        });

        return res;
    }

    global.BatTuThanSat = {
        calculatePillarsThanSat,
        getTamHopThanSat,
        getKhongVong,
        getThienNguyetDuc
    };

})(typeof window !== "undefined" ? window : globalThis);
