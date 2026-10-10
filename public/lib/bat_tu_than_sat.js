/**
 * Module Tra Cứu Thần Sát Bát Tự Toàn Diện — Dịch Sư Nguyễn Huy Hoàng
 * Chuẩn hóa kinh điển theo:
 * - Tử Bình Chân Thuyên (子平真诠), Uyên Hải Tử Bình (渊海子平), Tam Mệnh Thông Hội (三命通会)
 * - Đối chiếu thực chứng parity với Vấn Chân Bát Tự (问真八字) & bazi-reader-mcp / guyu-bazi
 * 
 * Mở rộng 50+ Thần Sát Cát Hung toàn diện, phân định rành mạch:
 * - Thần Sát tra theo Nhật Can (Nhật Chủ) vs Niên Can (Tuế Thần)
 * - Sửa triệt để lỗi gán Lộc Thần cho Mậu tại Ngọ (Mậu lộc tại Tị, ngọ là Kình Dương)
 * - Sửa lỗi Thiên Đức Hợp ở các tháng Tứ Trọng (Tý, Ngọ, Mão, Dậu)
 * - Sửa lỗi chính tả Dịch Mã (không dùng Trạch Mã)
 * - Khắc phục Thiên La - Địa Võng tương kiến chuẩn xác
 * - Bổ sung Câu Thần, Giảo Thần, Thiên Xá, Đức Tú, Thiên Y, Thập Linh, Kim Thần, Lục Tú, Lưu Hà, Huyết Nhẫn...
 */

(function(global) {
    const STEMS = ["Giáp", "Ất", "Bính", "Đinh", "Mậu", "Kỷ", "Canh", "Tân", "Nhâm", "Quý"];
    const BRANCHES = ["Tý", "Sửu", "Dần", "Mão", "Thìn", "Tị", "Ngọ", "Mùi", "Thân", "Dậu", "Tuất", "Hợi"];

    // =========================================================================
    // 1. CÁC BẢNG TRA CỨU QUÝ NHÂN & CÁT THẦN (THEO THIÊN CAN)
    // =========================================================================

    // 1.1. Thiên Ất Quý Nhân (Tra theo Can Ngày & Can Năm — Chuẩn Ca Quyết: 甲戊庚牛羊)
    const THIEN_AT_MAP = {
        "Giáp": ["Sửu", "Mùi"], "Mậu": ["Sửu", "Mùi"], "Canh": ["Sửu", "Mùi"],
        "Ất": ["Tý", "Thân"],   "Kỷ": ["Tý", "Thân"],
        "Bính": ["Hợi", "Dậu"], "Đinh": ["Hợi", "Dậu"],
        "Tân": ["Ngọ", "Dần"],
        "Nhâm": ["Mão", "Tị"],  "Quý": ["Mão", "Tị"]
    };

    // 1.2. Thái Cực Quý Nhân (Tra theo Can Ngày & Can Năm)
    const THAI_CUC_MAP = {
        "Giáp": ["Tý", "Ngọ"], "Ất": ["Tý", "Ngọ"],
        "Bính": ["Mão", "Dậu"], "Đinh": ["Mão", "Dậu"],
        "Mậu": ["Thìn", "Tuất", "Sửu", "Mùi"], "Kỷ": ["Thìn", "Tuất", "Sửu", "Mùi"],
        "Canh": ["Dần", "Hợi"], "Tân": ["Dần", "Hợi"],
        "Nhâm": ["Tị", "Thân"], "Quý": ["Tị", "Thân"]
    };

    // 1.3. Phúc Tinh Quý Nhân (Chuẩn Ca Quyết Vấn Chân Bát Tự 问真八字 & Uyên Hải Tử Bình:
    // 甲丙相邀寅子位，乙癸相邀卯丑知，戊喜申乡己喜未，丁见亥上壬见辰，庚寻午位辛寻巳)
    const PHUC_TINH_MAP = {
        "Giáp": ["Dần", "Tý"],
        "Ất": ["Mão", "Sửu"],
        "Bính": ["Dần", "Tý"],
        "Đinh": ["Hợi"],
        "Mậu": ["Thân"],
        "Kỷ": ["Mùi"],
        "Canh": ["Ngọ"],
        "Tân": ["Tị"],
        "Nhâm": ["Thìn"],
        "Quý": ["Mão", "Sửu"]
    };

    // 1.4. Văn Xương Quý Nhân (Tra theo Can Ngày & Can Năm)
    const VAN_XUONG_MAP = {
        "Giáp": "Tị", "Ất": "Ngọ", "Bính": "Thân", "Mậu": "Thân",
        "Đinh": "Dậu", "Kỷ": "Dậu", "Canh": "Hợi", "Tân": "Tý",
        "Nhâm": "Dần", "Quý": "Mão"
    };

    // 1.5. Quốc Ấn Quý Nhân (Tra theo Can Ngày & Can Năm)
    const QUOC_AN_MAP = {
        "Giáp": "Tuất", "Ất": "Hợi", "Bính": "Sửu", "Đinh": "Dần",
        "Mậu": "Sửu", "Kỷ": "Dần", "Canh": "Thìn", "Tân": "Tị",
        "Nhâm": "Mùi", "Quý": "Thân"
    };

    // 1.6. Thiên Trù Quý Nhân (Tra theo Can Ngày & Can Năm — Sao Ẩm Thực, Phúc Lộc)
    const THIEN_CHU_MAP = {
        "Giáp": "Tị", "Ất": "Ngọ", "Bính": "Tị", "Đinh": "Ngọ",
        "Mậu": "Thân", "Kỷ": "Dậu", "Canh": "Hợi", "Tân": "Tý",
        "Nhâm": "Dần", "Quý": "Mão"
    };

    // 1.7. Lộc Thần (Chân Lộc / Nhật Lộc — Tra theo Can Ngày)
    // Giáp lộc Dần, Ất lộc Mão, Bính Mậu lộc Tị, Đinh Kỷ lộc Ngọ, Canh lộc Thân, Tân lộc Dậu, Nhâm lộc Hợi, Quý lộc Tý
    const LOC_THAN_MAP = {
        "Giáp": "Dần", "Ất": "Mão", "Bính": "Tị", "Mậu": "Tị",
        "Đinh": "Ngọ", "Kỷ": "Ngọ", "Canh": "Thân", "Tân": "Dậu",
        "Nhâm": "Hợi", "Quý": "Tý"
    };

    // 1.8. Kình Dương / Dương Nhẫn (Chuẩn Vấn Chân Bát Tự 问真八字 & Tam Mệnh Thông Hội)
    // Dương Can đắc Đế Vượng vị; Âm Can đắc Lâm Quan vị của Dương Can cùng ngũ hành (Ất-Dần, Đinh/Kỷ-Tị, Tân-Thân, Quý-Hợi)
    const KINH_DUONG_MAP = {
        "Giáp": "Mão", "Ất": "Dần", "Bính": "Ngọ", "Đinh": "Tị",
        "Mậu": "Ngọ",  "Kỷ": "Tị",  "Canh": "Dậu", "Tân": "Thân",
        "Nhâm": "Tý",  "Quý": "Hợi"
    };

    // 1.9. Phi Nhẫn (Lục Xung của Dương Nhẫn — Chuẩn Vấn Chân Bát Tự 问真八字)
    const PHI_NHAN_MAP = {
        "Giáp": "Dậu", "Ất": "Thân", "Bính": "Tý", "Đinh": "Hợi",
        "Mậu": "Tý",  "Kỷ": "Hợi",  "Canh": "Mão", "Tân": "Dần",
        "Nhâm": "Ngọ", "Quý": "Tị"
    };

    // 1.10. Kim Dư (Tra theo Can Ngày — Lộc tiền nhị vị: Giáp Thìn, Ất Tị...)
    const KIM_DU_MAP = {
        "Giáp": "Thìn", "Ất": "Tị", "Bính": "Mùi", "Mậu": "Mùi",
        "Đinh": "Thân", "Kỷ": "Thân", "Canh": "Tuất", "Tân": "Hợi",
        "Nhâm": "Sửu", "Quý": "Dần"
    };

    // 1.11. Học Đường (Trường Sinh vị — Tra theo Can Ngày)
    const HOC_DUONG_MAP = {
        "Giáp": "Hợi", "Ất": "Ngọ", "Bính": "Dần", "Đinh": "Dậu",
        "Mậu": "Dần", "Kỷ": "Dậu", "Canh": "Tị", "Tân": "Tý",
        "Nhâm": "Thân", "Quý": "Mão"
    };

    // 1.12. Từ Quán (Tra theo Can Ngày)
    const TU_QUAN_MAP = {
        "Giáp": "Dần", "Ất": "Tị", "Bính": "Tị", "Đinh": "Thân",
        "Mậu": "Thân", "Kỷ": "Hợi", "Canh": "Hợi", "Tân": "Dần",
        "Nhâm": "Dần", "Quý": "Tị"
    };

    // 1.13. Hồng Diễm Sát (Tra theo Can Ngày)
    const HONG_DIEM_MAP = {
        "Giáp": ["Ngọ"], "Ất": ["Ngọ", "Thân"], "Bính": ["Dần"], "Đinh": ["Mùi"],
        "Mậu": ["Thìn"], "Kỷ": ["Thìn"], "Canh": ["Tuất"], "Tân": ["Dậu"],
        "Nhâm": ["Tý"], "Quý": ["Thân"]
    };

    // 1.14. Lưu Hà (Sát chủ huyết quang, sản nạn — Tra theo Can Ngày)
    const LIU_XIA_MAP = {
        "Giáp": "Dậu", "Ất": "Tuất", "Bính": "Mùi", "Đinh": "Thân",
        "Mậu": "Tị",  "Kỷ": "Ngọ", "Canh": "Thìn", "Tân": "Mão",
        "Nhâm": "Hợi", "Quý": "Dần"
    };

    // =========================================================================
    // 2. CÁC BẢNG TRA CỨU THEO CHI NĂM & CHI NGÀY (NIÊN CHI / NHẬT CHI)
    // =========================================================================

    // 2.1. Hồng Loan & Thiên Hỷ (Tra theo Chi Năm)
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

    // 2.2. Cô Thần & Quả Tú (Tra theo Chi Năm)
    function getCoThanQuaTu(yearBranch) {
        if (["Hợi", "Tý", "Sửu"].includes(yearBranch)) return { coThan: "Dần", quaTu: "Tuất" };
        if (["Dần", "Mão", "Thìn"].includes(yearBranch)) return { coThan: "Tị", quaTu: "Sửu" };
        if (["Tị", "Ngọ", "Mùi"].includes(yearBranch)) return { coThan: "Thân", quaTu: "Thìn" };
        return { coThan: "Hợi", quaTu: "Mùi" }; // Thân Dậu Tuất
    }

    // 2.3. Tam Hợp Cục Thần Sát (Tra theo Chi Ngày & Chi Năm)
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
                tueSat: "Mùi"
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
                tueSat: "Sửu"
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
                tueSat: "Thìn"
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
            tueSat: "Tuất"
        };
    }

    // 2.4. Câu Thần & Giảo Thần (Tra theo Chi Năm kết hợp Âm Dương Nam Nữ)
    function getCauGiao(yearBranch, isYangMaleOrYinFemale = true) {
        const bIdx = BRANCHES.indexOf(yearBranch);
        if (bIdx === -1) return { cau: null, giao: null };
        if (isYangMaleOrYinFemale) {
            // Dương Nam / Âm Nữ: tiến 3 là Câu, lùi 3 là Giảo
            return {
                cau: BRANCHES[(bIdx + 3) % 12],
                giao: BRANCHES[(bIdx - 3 + 12) % 12]
            };
        } else {
            // Âm Nam / Dương Nữ: lùi 3 là Câu, tiến 3 là Giảo
            return {
                cau: BRANCHES[(bIdx - 3 + 12) % 12],
                giao: BRANCHES[(bIdx + 3) % 12]
            };
        }
    }

    // 2.5. Đại Hao / Nguyên Thần (Tra theo Chi Năm)
    function getDaiHao(yearBranch, isYangMaleOrYinFemale = true) {
        const bIdx = BRANCHES.indexOf(yearBranch);
        if (bIdx === -1) return null;
        if (isYangMaleOrYinFemale) {
            return BRANCHES[(bIdx + 7) % 12];
        } else {
            return BRANCHES[(bIdx + 5) % 12];
        }
    }

    // 2.6. Ngũ Quỷ / Quan Phù (Tra theo Chi Năm)
    const NGU_QUI_MAP = {
        "Tý": "Thìn", "Sửu": "Tị", "Dần": "Ngọ", "Mão": "Mùi",
        "Thìn": "Thân", "Tị": "Dậu", "Ngọ": "Tuất", "Mùi": "Hợi",
        "Thân": "Tý", "Dậu": "Sửu", "Tuất": "Dần", "Hợi": "Mão"
    };

    // 2.7. Tuần Không (Không Vong) của Can Chi
    function getKhongVong(stem, branch) {
        const sIdx = STEMS.indexOf(stem);
        const bIdx = BRANCHES.indexOf(branch);
        if (sIdx === -1 || bIdx === -1) return [];
        const diff = (bIdx - sIdx + 12) % 12;
        const kv1Idx = (diff + 10) % 12;
        const kv2Idx = (diff + 11) % 12;
        return [BRANCHES[kv1Idx], BRANCHES[kv2Idx]];
    }

    // =========================================================================
    // 3. CÁC BẢNG TRA CỨU THEO NGUYỆT CHI (THÁNG SINH)
    // =========================================================================

    // 3.1. Thiên Đức, Nguyệt Đức, Thiên Đức Hợp & Nguyệt Đức Hợp
    function getThienNguyetDuc(monthBranch) {
        let thienDuc = null;      // { type: 'stem'|'branch', val: string }
        let nguyetDuc = null;     // string (stem)
        let thienDucHop = null;   // { type: 'stem'|'branch', val: string }
        let nguyetDucHop = null;  // string (stem)

        switch (monthBranch) {
            case "Dần":
                thienDuc = { type: "stem", val: "Đinh" };
                thienDucHop = { type: "stem", val: "Nhâm" };
                break;
            case "Mão":
                thienDuc = { type: "branch", val: "Thân" };
                thienDucHop = { type: "branch", val: "Tị" }; // Tị Thân lục hợp
                break;
            case "Thìn":
                thienDuc = { type: "stem", val: "Nhâm" };
                thienDucHop = { type: "stem", val: "Đinh" };
                break;
            case "Tị":
                thienDuc = { type: "stem", val: "Tân" };
                thienDucHop = { type: "stem", val: "Bính" };
                break;
            case "Ngọ":
                thienDuc = { type: "branch", val: "Hợi" };
                thienDucHop = { type: "branch", val: "Dần" }; // Dần Hợi lục hợp
                break;
            case "Mùi":
                thienDuc = { type: "stem", val: "Giáp" };
                thienDucHop = { type: "stem", val: "Kỷ" };
                break;
            case "Thân":
                thienDuc = { type: "stem", val: "Quý" };
                thienDucHop = { type: "stem", val: "Mậu" };
                break;
            case "Dậu":
                thienDuc = { type: "branch", val: "Dần" };
                thienDucHop = { type: "branch", val: "Hợi" }; // Dần Hợi lục hợp
                break;
            case "Tuất":
                thienDuc = { type: "stem", val: "Bính" };
                thienDucHop = { type: "stem", val: "Tân" };
                break;
            case "Hợi":
                thienDuc = { type: "stem", val: "Ất" };
                thienDucHop = { type: "stem", val: "Canh" };
                break;
            case "Tý":
                thienDuc = { type: "branch", val: "Tị" };
                thienDucHop = { type: "branch", val: "Thân" }; // Tị Thân lục hợp
                break;
            case "Sửu":
                thienDuc = { type: "stem", val: "Canh" };
                thienDucHop = { type: "stem", val: "Ất" };
                break;
        }

        if (["Dần", "Ngọ", "Tuất"].includes(monthBranch)) {
            nguyetDuc = "Bính";
            nguyetDucHop = "Tân";
        } else if (["Thân", "Tý", "Thìn"].includes(monthBranch)) {
            nguyetDuc = "Nhâm";
            nguyetDucHop = "Đinh";
        } else if (["Tị", "Dậu", "Sửu"].includes(monthBranch)) {
            nguyetDuc = "Canh";
            nguyetDucHop = "Ất";
        } else if (["Hợi", "Mão", "Mùi"].includes(monthBranch)) {
            nguyetDuc = "Giáp";
            nguyetDucHop = "Kỷ";
        }

        return { thienDuc, nguyetDuc, thienDucHop, nguyetDucHop };
    }

    // 3.2. Đức Tú Quý Nhân (Tra theo Nguyệt Chi Tam Hợp Cục — Chuẩn Vấn Chân Bát Tự)
    const DUC_TU_MAP = {
        "Dần": new Set(["Bính", "Đinh", "Mậu", "Quý"]),
        "Ngọ": new Set(["Bính", "Đinh", "Mậu", "Quý"]),
        "Tuất": new Set(["Bính", "Đinh", "Mậu", "Quý"]),
        "Thân": new Set(["Nhâm", "Quý", "Bính", "Tân", "Giáp", "Mậu", "Kỷ"]),
        "Tý": new Set(["Nhâm", "Quý", "Bính", "Tân", "Giáp", "Mậu", "Kỷ"]),
        "Thìn": new Set(["Nhâm", "Quý", "Bính", "Tân", "Giáp", "Mậu", "Kỷ"]),
        "Tị": new Set(["Canh", "Tân", "Ất"]),
        "Dậu": new Set(["Canh", "Tân", "Ất"]),
        "Sửu": new Set(["Canh", "Tân", "Ất"]),
        "Hợi": new Set(["Giáp", "Ất", "Đinh", "Nhâm"]),
        "Mão": new Set(["Giáp", "Ất", "Đinh", "Nhâm"]),
        "Mùi": new Set(["Giáp", "Ất", "Đinh", "Nhâm"])
    };

    // 3.3. Thiên Y (Tra theo Nguyệt Chi — Chi trước tháng 1 vị)
    const THIEN_Y_MAP = {
        "Dần": "Sửu", "Mão": "Dần", "Thìn": "Mão", "Tị": "Thìn",
        "Ngọ": "Tị",  "Mùi": "Ngọ", "Thân": "Mùi", "Dậu": "Thân",
        "Tuất": "Dậu", "Hợi": "Tuất", "Tý": "Hợi",  "Sửu": "Tý"
    };

    // 3.4. Huyết Nhẫn (Sát chủ thương tích, phẫu thuật — Tra theo Nguyệt Chi)
    const HUYET_NHAN_MAP = {
        "Tý": "Ngọ", "Sửu": "Tý", "Dần": "Sửu", "Mão": "Mùi",
        "Thìn": "Dần", "Tị": "Thân", "Ngọ": "Mão", "Mùi": "Dậu",
        "Thân": "Thìn", "Dậu": "Tuất", "Tuất": "Tị", "Hợi": "Hợi"
    };

    // 3.5. Thiên Xá (Quý thần giải ách tối thượng — Xét theo Mùa và Ngày Sinh)
    function checkThienXa(monthBranch, dayStem, dayBranch) {
        const dayGz = dayStem + " " + dayBranch;
        if (["Dần", "Mão", "Thìn"].includes(monthBranch) && dayGz === "Mậu Dần") return true;
        if (["Tị", "Ngọ", "Mùi"].includes(monthBranch) && dayGz === "Giáp Ngọ") return true;
        if (["Thân", "Dậu", "Tuất"].includes(monthBranch) && dayGz === "Mậu Thân") return true;
        if (["Hợi", "Tý", "Sửu"].includes(monthBranch) && dayGz === "Giáp Tý") return true;
        return false;
    }

    // =========================================================================
    // 4. THIÊN LA & ĐỊA VÕNG (CHUẨN TƯƠNG KIẾN CỔ THƯ & VẤN CHÂN BÁT TỰ)
    // =========================================================================
    // Thiên La: Chi ngày Tuất thấy Hợi hoặc Chi ngày Hợi thấy Tuất
    // Địa Võng: Chi ngày Thìn thấy Tị hoặc Chi ngày Tị thấy Thìn
    function checkPillarsThienLaDiaVong(allBranches, dayBranch) {
        const result = { thienLa: false, diaVong: false, thienLaBranches: new Set(), diaVongBranches: new Set() };
        if (dayBranch === "Tuất" && allBranches.includes("Hợi")) {
            result.thienLa = true;
            result.thienLaBranches.add("Tuất");
            result.thienLaBranches.add("Hợi");
        } else if (dayBranch === "Hợi" && allBranches.includes("Tuất")) {
            result.thienLa = true;
            result.thienLaBranches.add("Tuất");
            result.thienLaBranches.add("Hợi");
        }

        if (dayBranch === "Thìn" && allBranches.includes("Tị")) {
            result.diaVong = true;
            result.diaVongBranches.add("Thìn");
            result.diaVongBranches.add("Tị");
        } else if (dayBranch === "Tị" && allBranches.includes("Thìn")) {
            result.diaVong = true;
            result.diaVongBranches.add("Thìn");
            result.diaVongBranches.add("Tị");
        }
        return result;
    }

    // =========================================================================
    // 5. PHÂN LOẠI CÁT THẦN & HUNG SÁT (CHUẨN PHỤC VỤ UI/UX TÔ MÀU)
    // =========================================================================
    const CAT_THAN_SET = new Set([
        "Thiên Ất", "Thái Cực", "Phúc Tinh", "Văn Xương", "Quốc Ấn", "Thiên Trù",
        "Học Đường", "Từ Quán", "Lộc Thần", "Tuế Lộc", "Kim Dư", "Tướng Tinh", "Hoa Cái",
        "Dịch Mã", "Hồng Loan", "Thiên Hỷ", "Thiên Đức", "Thiên Đức Hợp",
        "Nguyệt Đức", "Nguyệt Đức Hợp", "Đức Tú", "Thiên Xá", "Thiên Y",
        "Thập Linh", "Lục Tú"
    ]);

    function isCatThan(starName) {
        return CAT_THAN_SET.has(starName);
    }

    // =========================================================================
    // 6. HÀM TÍNH TOÁN THẦN SÁT CHO TOÀN BỘ 4 TRỤ (CHÍNH QUY)
    // =========================================================================
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

        const { cau: cauBranch, giao: giaoBranch } = getCauGiao(yearBranch, isYangMaleOrYinFemale);
        const daiHaoBranch = getDaiHao(yearBranch, isYangMaleOrYinFemale);
        const nguQuiBranch = NGU_QUI_MAP[yearBranch];

        const allBranches = [year.branch, month.branch, day.branch, time.branch];
        const tldv = checkPillarsThienLaDiaVong(allBranches, dayBranch);

        const isThienXaDay = checkThienXa(monthBranch, dayStem, dayBranch);

        const pillarKeys = ["year", "month", "day", "time"];

        pillarKeys.forEach(k => {
            const p = pillars[k];
            const pStem = p.stem;
            const pBranch = p.branch;
            const list = new Set();

            // 1. Thiên Ất Quý Nhân (Tra theo Can Ngày & Can Năm)
            const ta1 = THIEN_AT_MAP[dayStem] || [];
            const ta2 = THIEN_AT_MAP[yearStem] || [];
            if (ta1.includes(pBranch) || ta2.includes(pBranch)) list.add("Thiên Ất");

            // 2. Thái Cực Quý Nhân (Tra theo Can Ngày & Can Năm)
            const tc1 = THAI_CUC_MAP[dayStem] || [];
            const tc2 = THAI_CUC_MAP[yearStem] || [];
            if (tc1.includes(pBranch) || tc2.includes(pBranch)) list.add("Thái Cực");

            // 3. Phúc Tinh Quý Nhân (Tra theo Can Ngày & Can Năm)
            const pt1 = PHUC_TINH_MAP[dayStem] || [];
            const pt2 = PHUC_TINH_MAP[yearStem] || [];
            if (pt1.includes(pBranch) || pt2.includes(pBranch)) list.add("Phúc Tinh");

            // 4. Quốc Ấn Quý Nhân (Tra theo Can Ngày & Can Năm)
            if (pBranch === QUOC_AN_MAP[dayStem] || pBranch === QUOC_AN_MAP[yearStem]) list.add("Quốc Ấn");

            // 5. Văn Xương Quý Nhân (Tra theo Can Ngày & Can Năm)
            if (pBranch === VAN_XUONG_MAP[dayStem] || pBranch === VAN_XUONG_MAP[yearStem]) list.add("Văn Xương");

            // 6. Thiên Trù Quý Nhân (Tra theo Can Ngày & Can Năm)
            if (pBranch === THIEN_CHU_MAP[dayStem] || pBranch === THIEN_CHU_MAP[yearStem]) list.add("Thiên Trù");

            // 7. Học Đường Quý Nhân (Tra theo Can Ngày)
            if (pBranch === HOC_DUONG_MAP[dayStem]) list.add("Học Đường");

            // 8. Từ Quán (Tra theo Can Ngày)
            if (pBranch === TU_QUAN_MAP[dayStem]) list.add("Từ Quán");

            // 9. LỘC THẦN (Nhật Lộc) vs TUẾ LỘC (Niên Lộc)
            // Lộc Thần CHUẨN TẮC: Chỉ tra theo Nhật Can (Can Ngày)!
            // Mậu lộc tại Tị; Mậu gặp Ngọ tuyệt đối KHÔNG PHẢI Lộc Thần!
            if (pBranch === LOC_THAN_MAP[dayStem]) {
                list.add("Lộc Thần");
            } else if (pBranch === LOC_THAN_MAP[yearStem]) {
                // Nếu trùng Lộc của Can Năm thì ghi nhận rõ là Tuế Lộc để không nhầm với Nhật Lộc
                list.add("Tuế Lộc");
            }

            // 10. KÌNH DƯƠNG (Dương Nhẫn của Can Ngày) vs NIÊN NHẪN (của Can Năm)
            // Mậu gặp Ngọ là Kình Dương (Dương Nhẫn)!
            if (pBranch === KINH_DUONG_MAP[dayStem]) {
                list.add("Kình Dương");
            } else if (pBranch === KINH_DUONG_MAP[yearStem]) {
                list.add("Niên Nhẫn");
            }

            // 11. Phi Nhẫn (Lục Xung của Kình Dương — Tra theo Can Ngày)
            if (pBranch === PHI_NHAN_MAP[dayStem]) list.add("Phi Nhẫn");

            // 12. Kim Dư (Tra theo Can Ngày)
            if (pBranch === KIM_DU_MAP[dayStem] || pBranch === KIM_DU_MAP[yearStem]) list.add("Kim Dư");

            // 13. Tướng Tinh
            if (pBranch === dayTamHop.tuongTinh || pBranch === yearTamHop.tuongTinh) list.add("Tướng Tinh");

            // 14. Hoa Cái
            if (pBranch === dayTamHop.hoaCai || pBranch === yearTamHop.hoaCai) list.add("Hoa Cái");

            // 15. Dịch Mã (Chuẩn thuật ngữ Bát Tự kinh điển — không dùng Trạch Mã)
            if (pBranch === dayTamHop.dichMa || pBranch === yearTamHop.dichMa) list.add("Dịch Mã");

            // 16. Đào Hoa (Hàm Trì)
            if (pBranch === dayTamHop.daoHoa || pBranch === yearTamHop.daoHoa) list.add("Đào Hoa");

            // 17. Hồng Loan & Thiên Hỷ (Tra theo Chi Năm)
            if (pBranch === HONG_LOAN_MAP[yearBranch]) list.add("Hồng Loan");
            if (pBranch === THIEN_HY_MAP[yearBranch]) list.add("Thiên Hỷ");

            // 18. Hồng Diễm Sát (Tra theo Can Ngày)
            const hd1 = HONG_DIEM_MAP[dayStem] || [];
            if (hd1.includes(pBranch)) list.add("Hồng Diễm");

            // 19. Lưu Hà (Tra theo Can Ngày)
            if (pBranch === LIU_XIA_MAP[dayStem]) list.add("Lưu Hà");

            // 20. Thiên Đức & Thiên Đức Hợp (Sửa triệt để bug so sánh Can với Chi)
            if (thienDuc) {
                if (thienDuc.type === "stem" && pStem === thienDuc.val) list.add("Thiên Đức");
                if (thienDuc.type === "branch" && pBranch === thienDuc.val) list.add("Thiên Đức");
            }
            if (thienDucHop) {
                if (thienDucHop.type === "stem" && pStem === thienDucHop.val) list.add("Thiên Đức Hợp");
                if (thienDucHop.type === "branch" && pBranch === thienDucHop.val) list.add("Thiên Đức Hợp");
            }

            // 21. Nguyệt Đức & Nguyệt Đức Hợp
            if (nguyetDuc && (pStem === nguyetDuc || (k === "day" && dayStem === nguyetDuc))) list.add("Nguyệt Đức");
            if (nguyetDucHop && pStem === nguyetDucHop) list.add("Nguyệt Đức Hợp");

            // 22. Đức Tú Quý Nhân (Tra theo Nguyệt Chi Tam Hợp Cục)
            const ducTuSet = DUC_TU_MAP[monthBranch];
            if (ducTuSet && ducTuSet.has(pStem)) list.add("Đức Tú");

            // 23. Thiên Y (Tra theo Nguyệt Chi)
            if (pBranch === THIEN_Y_MAP[monthBranch]) list.add("Thiên Y");

            // 24. Huyết Nhẫn (Tra theo Nguyệt Chi)
            if (pBranch === HUYET_NHAN_MAP[monthBranch]) list.add("Huyết Nhẫn");

            // 25. Kiếp Sát
            if (pBranch === dayTamHop.kiepSat || pBranch === yearTamHop.kiepSat) list.add("Kiếp Sát");

            // 26. Vong Thần
            if (pBranch === dayTamHop.vongThan || pBranch === yearTamHop.vongThan) list.add("Vong Thần");

            // 27. Tai Sát
            if (pBranch === dayTamHop.taiSat || pBranch === yearTamHop.taiSat) list.add("Tai Sát");

            // 28. Tuế Sát
            if (pBranch === dayTamHop.tueSat || pBranch === yearTamHop.tueSat) list.add("Tuế Sát");

            // 29. Cô Thần & Quả Tú (Tra theo Chi Năm)
            if (pBranch === coThan) list.add("Cô Thần");
            if (pBranch === quaTu) list.add("Quả Tú");

            // 30. Câu Thần & Giảo Thần (Tra theo Chi Năm & Âm Dương Nam Nữ)
            if (cauBranch && pBranch === cauBranch) list.add("Câu Thần");
            if (giaoBranch && pBranch === giaoBranch) list.add("Giảo Thần");

            // 31. Đại Hao (Nguyên Thần — Tra theo Chi Năm)
            if (daiHaoBranch && pBranch === daiHaoBranch) list.add("Đại Hao");

            // 32. Ngũ Quỷ / Quan Phù (Tra theo Chi Năm)
            if (nguQuiBranch && pBranch === nguQuiBranch) list.add("Ngũ Quỷ");

            // 33. Thiên La & Địa Võng (Quy tắc tương kiến cặp chuẩn xác)
            if (tldv.thienLa && tldv.thienLaBranches.has(pBranch)) list.add("Thiên La");
            if (tldv.diaVong && tldv.diaVongBranches.has(pBranch)) list.add("Địa Võng");

            // 34. Không Vong (Tuần Không)
            if (dayKhongVong.includes(pBranch) || yearKhongVong.includes(pBranch)) list.add("Không Vong");

            // 35. Các Thần Sát xét theo Trụ Ngày hoặc Can Chi đặc thù
            const currentGz = pStem + " " + pBranch;

            if (k === "day") {
                // Thiên Xá (Quý thần mùa màng giải tai ách)
                if (isThienXaDay) list.add("Thiên Xá");

                // Khôi Cương
                if (["Mậu Tuất", "Canh Thìn", "Canh Tuất", "Nhâm Thìn"].includes(currentGz)) {
                    list.add("Khôi Cương");
                }
                // Thập Linh Nhật
                if (["Giáp Thìn", "Ất Hợi", "Bính Thìn", "Đinh Dậu", "Mậu Ngọ", "Canh Tuất", "Canh Dần", "Tân Hợi", "Nhâm Dần", "Quý Mùi"].includes(currentGz)) {
                    list.add("Thập Linh");
                }
                // Lục Tú Nhật
                if (["Bính Ngọ", "Đinh Mùi", "Mậu Tý", "Mậu Ngọ", "Kỷ Sửu", "Kỷ Mùi"].includes(currentGz)) {
                    list.add("Lục Tú");
                }
                // Thập Ác Đại Bại
                if (["Giáp Thìn", "Ất Tị", "Bính Thân", "Đinh Hợi", "Mậu Tuất", "Kỷ Sửu", "Canh Thìn", "Tân Tị", "Nhâm Thân", "Quý Hợi"].includes(currentGz)) {
                    list.add("Thập Ác Đại Bại");
                }
                // Âm Dương Sai Thác
                if (["Bính Tý", "Bính Ngọ", "Đinh Sửu", "Đinh Mùi", "Mậu Dần", "Mậu Thân", "Tân Mão", "Tân Dậu", "Nhâm Thìn", "Nhâm Tuất", "Quý Tị", "Quý Hợi"].includes(currentGz)) {
                    list.add("Âm Dương Sai Thác");
                }
                // Cô Loan Sát
                if (["Ất Tị", "Đinh Tị", "Tân Hợi", "Mậu Thân", "Giáp Dần", "Mậu Ngọ", "Nhâm Tý", "Bính Ngọ"].includes(currentGz)) {
                    list.add("Cô Loan");
                }
            }

            // Kim Thần (Xét Trụ Ngày hoặc Trụ Giờ)
            if ((k === "day" || k === "time") && ["Ất Sửu", "Kỷ Tị", "Quý Dậu"].includes(currentGz)) {
                list.add("Kim Thần");
            }

            res[k] = Array.from(list);
        });

        return res;
    }

    // =========================================================================
    // 7. XUẤT KHẨU MODULE
    // =========================================================================
    global.BatTuThanSat = {
        calculatePillarsThanSat,
        getTamHopThanSat,
        getKhongVong,
        getThienNguyetDuc,
        getCoThanQuaTu,
        getCauGiao,
        getDaiHao,
        checkThienXa,
        checkPillarsThienLaDiaVong,
        isCatThan,
        CAT_THAN_SET
    };

})(typeof window !== "undefined" ? window : globalThis);
