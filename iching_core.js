/**
 * Logic Kinh Dịch Lục Hào Cốt Lõi - iching_core.js
 * Xử lý các phép tính nạp giáp, họ quẻ, thế ứng, lục thân, phục thần, lục thú, trường sinh và thần sát.
 */

const ICHING = (function () {
    // 8 quẻ đơn
    const TRIGRAM_NAMES_MAP = {
        "Càn": 1, "Đoài": 2, "Ly": 3, "Chấn": 4, "Tốn": 5, "Khảm": 6, "Cấn": 7, "Khôn": 8
    };
    const TRIGRAM_IDS_MAP = {
        1: { name: "Càn", element: "Kim" },
        2: { name: "Đoài", element: "Kim" },
        3: { name: "Ly", element: "Hỏa" },
        4: { name: "Chấn", element: "Mộc" },
        5: { name: "Tốn", element: "Mộc" },
        6: { name: "Khảm", element: "Thủy" },
        7: { name: "Cấn", element: "Thổ" },
        8: { name: "Khôn", element: "Thổ" }
    };

    // Đường nét hào của 8 quẻ đơn [hào 1, hào 2, hào 3] (dưới lên trên)
    const TRIGRAM_LINES = {
        1: [1, 1, 1], // Càn
        2: [1, 1, 0], // Đoài
        3: [1, 0, 1], // Ly
        4: [1, 0, 0], // Chấn
        5: [0, 1, 1], // Tốn
        6: [0, 1, 0], // Khảm
        7: [0, 0, 1], // Cấn
        8: [0, 0, 0]  // Khôn
    };

    // Bảng Nạp Giáp cho 8 quẻ đơn (từ hào 1 đến hào 6)
    const TRIGRAM_NAP = {
        1: { // Càn
            lower: [{ can: "Giáp", chi: "Tý" }, { can: "Giáp", chi: "Dần" }, { can: "Giáp", chi: "Thìn" }],
            upper: [{ can: "Nhâm", chi: "Ngọ" }, { can: "Nhâm", chi: "Thân" }, { can: "Nhâm", chi: "Tuất" }]
        },
        2: { // Đoài
            lower: [{ can: "Đinh", chi: "Tỵ" }, { can: "Đinh", chi: "Mão" }, { can: "Đinh", chi: "Sửu" }],
            upper: [{ can: "Đinh", chi: "Hợi" }, { can: "Đinh", chi: "Dậu" }, { can: "Đinh", chi: "Mùi" }]
        },
        3: { // Ly
            lower: [{ can: "Kỷ", chi: "Mão" }, { can: "Kỷ", chi: "Sửu" }, { can: "Kỷ", chi: "Hợi" }],
            upper: [{ can: "Kỷ", chi: "Dậu" }, { can: "Kỷ", chi: "Mùi" }, { can: "Kỷ", chi: "Tỵ" }]
        },
        4: { // Chấn
            lower: [{ can: "Canh", chi: "Tý" }, { can: "Canh", chi: "Dần" }, { can: "Canh", chi: "Thìn" }],
            upper: [{ can: "Canh", chi: "Ngọ" }, { can: "Canh", chi: "Thân" }, { can: "Canh", chi: "Tuất" }]
        },
        5: { // Tốn
            lower: [{ can: "Tân", chi: "Sửu" }, { can: "Tân", chi: "Hợi" }, { can: "Tân", chi: "Dậu" }],
            upper: [{ can: "Tân", chi: "Mùi" }, { can: "Tân", chi: "Tỵ" }, { can: "Tân", chi: "Mão" }]
        },
        6: { // Khảm
            lower: [{ can: "Mậu", chi: "Dần" }, { can: "Mậu", chi: "Thìn" }, { can: "Mậu", chi: "Ngọ" }],
            upper: [{ can: "Mậu", chi: "Thân" }, { can: "Mậu", chi: "Tuất" }, { can: "Mậu", chi: "Tý" }]
        },
        7: { // Cấn
            lower: [{ can: "Bính", chi: "Thìn" }, { can: "Bính", chi: "Ngọ" }, { can: "Bính", chi: "Thân" }],
            upper: [{ can: "Bính", chi: "Tuất" }, { can: "Bính", chi: "Tý" }, { can: "Bính", chi: "Dần" }]
        },
        8: { // Khôn
            lower: [{ can: "Ất", chi: "Mùi" }, { can: "Ất", chi: "Tỵ" }, { can: "Ất", chi: "Mão" }],
            upper: [{ can: "Quý", chi: "Sửu" }, { can: "Quý", chi: "Hợi" }, { can: "Quý", chi: "Dậu" }]
        }
    };

    // Tên 64 quẻ (Upper-Lower)
    const HEX_NAMES = {
        "1-1": "Bát Thuần Càn", "1-2": "Thiên Trạch Lý", "1-3": "Thiên Hỏa Đồng Nhân", "1-4": "Thiên Lôi Vô Vọng",
        "1-5": "Thiên Phong Cấu", "1-6": "Thiên Thủy Tụng", "1-7": "Thiên Sơn Độn", "1-8": "Thiên Địa Bĩ",
        "2-1": "Trạch Thiên Quải", "2-2": "Bát Thuần Đoài", "2-3": "Trạch Hỏa Cách", "2-4": "Trạch Lôi Tùy",
        "2-5": "Trạch Phong Đại Quá", "2-6": "Trạch Thủy Khốn", "2-7": "Trạch Sơn Hàm", "2-8": "Trạch Địa Tụy",
        "3-1": "Hỏa Thiên Đại Hữu", "3-2": "Hỏa Trạch Khuê", "3-3": "Bát Thuần Ly", "3-4": "Hỏa Lôi Phệ Hạp",
        "3-5": "Hỏa Phong Đỉnh", "3-6": "Hỏa Thủy Vị Tế", "3-7": "Hỏa Sơn Lữ", "3-8": "Hỏa Địa Tấn",
        "4-1": "Lôi Thiên Đại Tráng", "4-2": "Lôi Trạch Quy Muội", "4-3": "Lôi Hỏa Phong", "4-4": "Bát Thuần Chấn",
        "4-5": "Lôi Phong Hằng", "4-6": "Lôi Thủy Giải", "4-7": "Lôi Sơn Tiểu Quá", "4-8": "Lôi Địa Dự",
        "5-1": "Phong Thiên Tiểu Súc", "5-2": "Phong Trạch Trung Phu", "5-3": "Phong Hỏa Gia Nhân", "5-4": "Phong Lôi Ích",
        "5-5": "Bát Thuần Tốn", "5-6": "Phong Thủy Hoán", "5-7": "Phong Sơn Tiệm", "5-8": "Phong Địa Quan",
        "6-1": "Thủy Thiên Nhu", "6-2": "Thủy Trạch Tiết", "6-3": "Thủy Hỏa Ký Tế", "6-4": "Thủy Lôi Truân",
        "6-5": "Thủy Phong Tỉnh", "6-6": "Bát Thuần Khảm", "6-7": "Thủy Sơn Kiển", "6-8": "Thủy Địa Tỷ",
        "7-1": "Sơn Thiên Đại Súc", "7-2": "Sơn Trạch Tổn", "7-3": "Sơn Hỏa Bí", "7-4": "Sơn Lôi Di",
        "7-5": "Sơn Phong Cổ", "7-6": "Sơn Thủy Mông", "7-7": "Bát Thuần Cấn", "7-8": "Sơn Địa Bác",
        "8-1": "Địa Thiên Thái", "8-2": "Địa Trạch Lâm", "8-3": "Địa Hỏa Minh Di", "8-4": "Địa Lôi Phục",
        "8-5": "Địa Phong Thăng", "8-6": "Địa Thủy Sư", "8-7": "Địa Sơn Khiêm", "8-8": "Bát Thuần Khôn"
    };

    // Lục thân quan hệ ngũ hành
    const ELEMENT_RELATIONS = {
        "Kim": { "Kim": "Huynh đệ", "Thủy": "Tử tôn", "Mộc": "Thê tài", "Hỏa": "Quan quỷ", "Thổ": "Phụ mẫu" },
        "Mộc": { "Mộc": "Huynh đệ", "Hỏa": "Tử tôn", "Thổ": "Thê tài", "Kim": "Quan quỷ", "Thủy": "Phụ mẫu" },
        "Thủy": { "Thủy": "Huynh đệ", "Mộc": "Tử tôn", "Hỏa": "Thê tài", "Thổ": "Quan quỷ", "Kim": "Phụ mẫu" },
        "Hỏa": { "Hỏa": "Huynh đệ", "Thổ": "Tử tôn", "Kim": "Thê tài", "Thủy": "Quan quỷ", "Mộc": "Phụ mẫu" },
        "Thổ": { "Thổ": "Huynh đệ", "Kim": "Tử tôn", "Thủy": "Thê tài", "Mộc": "Quan quỷ", "Hỏa": "Phụ mẫu" }
    };

    // Họ (Palace) và vị trí Thế/Ứng, ngũ hành của 64 quẻ
    let HEXAGRMAN_MAP = {};

    // Khởi tạo bảng tra cứu 64 quẻ tự động theo quy luật phân họ Lục Hào
    function initHexagramDatabase() {
        const palaces = [1, 8, 4, 5, 6, 3, 7, 2]; // Càn, Khôn, Chấn, Tốn, Khảm, Ly, Cấn, Đoài
        palaces.forEach(P => {
            const pName = TRIGRAM_IDS_MAP[P].name;
            const pElement = TRIGRAM_IDS_MAP[P].element;
            const pLines = TRIGRAM_LINES[P];
            const oppLines = pLines.map(b => b === 1 ? 0 : 1);

            // Hàm tìm ID quẻ đơn từ mảng hào [h1, h2, h3]
            const findTrigramId = (lines) => {
                const key = lines.join("");
                for (let id in TRIGRAM_LINES) {
                    if (TRIGRAM_LINES[id].join("") === key) return parseInt(id);
                }
                return P;
            };

            // 1. Bát Thuần
            let u1 = P, l1 = P;
            HEXAGRMAN_MAP[`${u1}-${l1}`] = { palace: pName, palaceElement: pElement, the: 6, ung: 3, status: "Bát Thuần" };

            // 2. Nhất Thế
            let u2 = P, l2 = findTrigramId([pLines[0] ^ 1, pLines[1], pLines[2]]);
            HEXAGRMAN_MAP[`${u2}-${l2}`] = { palace: pName, palaceElement: pElement, the: 1, ung: 4, status: "Nhất Thế" };

            // 3. Nhị Thế
            let u3 = P, l3 = findTrigramId([pLines[0] ^ 1, pLines[1] ^ 1, pLines[2]]);
            HEXAGRMAN_MAP[`${u3}-${l3}`] = { palace: pName, palaceElement: pElement, the: 2, ung: 5, status: "Nhị Thế" };

            // 4. Tam Thế
            let u4 = P, l4 = findTrigramId(oppLines);
            HEXAGRMAN_MAP[`${u4}-${l4}`] = { palace: pName, palaceElement: pElement, the: 3, ung: 6, status: "Tam Thế" };

            // 5. Tứ Thế
            let u5 = findTrigramId([pLines[0] ^ 1, pLines[1], pLines[2]]), l5 = findTrigramId(oppLines);
            HEXAGRMAN_MAP[`${u5}-${l5}`] = { palace: pName, palaceElement: pElement, the: 4, ung: 1, status: "Tứ Thế" };

            // 6. Ngũ Thế
            let u6 = findTrigramId([pLines[0] ^ 1, pLines[1] ^ 1, pLines[2]]), l6 = findTrigramId(oppLines);
            HEXAGRMAN_MAP[`${u6}-${l6}`] = { palace: pName, palaceElement: pElement, the: 5, ung: 2, status: "Ngũ Thế" };

            // 7. Du Hồn
            let u7 = findTrigramId([pLines[0], pLines[1] ^ 1, pLines[2]]), l7 = findTrigramId(oppLines);
            HEXAGRMAN_MAP[`${u7}-${l7}`] = { palace: pName, palaceElement: pElement, the: 4, ung: 1, status: "Du Hồn" };

            // 8. Quy Hồn
            let u8 = findTrigramId([pLines[0], pLines[1] ^ 1, pLines[2]]), l8 = P;
            HEXAGRMAN_MAP[`${u8}-${l8}`] = { palace: pName, palaceElement: pElement, the: 3, ung: 6, status: "Quy Hồn" };
        });
    }

    initHexagramDatabase();

    // Tìm ID quẻ đơn từ mảng hào 3 đường [bottom, mid, top]
    function getTrigramIdFromLines(lines3) {
        const s = lines3.join("");
        for (let id in TRIGRAM_LINES) {
            if (TRIGRAM_LINES[id].join("") === s) return parseInt(id);
        }
        return 8;
    }

    // Xây dựng thông tin hào hoàn chỉnh cho quẻ đơn hạ và quẻ đơn thượng
    function buildHexagramLines(lowerId, upperId, palaceElement) {
        let lines = [];
        // Hào 1, 2, 3 (Quẻ hạ)
        const lowerNap = TRIGRAM_NAP[lowerId].lower;
        for (let i = 0; i < 3; i++) {
            const can = lowerNap[i].can;
            const chi = lowerNap[i].chi;
            const element = CALENDAR.NGU_HANH[chi];
            const lucThan = ELEMENT_RELATIONS[palaceElement][element];
            lines.push({ lineNum: i + 1, can, chi, element, lucThan });
        }
        // Hào 4, 5, 6 (Quẻ thượng)
        const upperNap = TRIGRAM_NAP[upperId].upper;
        for (let i = 0; i < 3; i++) {
            const can = upperNap[i].can;
            const chi = upperNap[i].chi;
            const element = CALENDAR.NGU_HANH[chi];
            const lucThan = ELEMENT_RELATIONS[palaceElement][element];
            lines.push({ lineNum: i + 4, can, chi, element, lucThan });
        }
        return lines; // Chỉ số 0 là hào 1, chỉ số 5 là hào 6
    }

    // Hàm tra cứu Phục Thần của quẻ chính
    function getPhucThan(palaceName, presentLucThan) {
        const pId = TRIGRAM_NAMES_MAP[palaceName];
        const pElement = TRIGRAM_IDS_MAP[pId].element;
        // Quẻ Bát Thuần mẹ
        const parentLines = buildHexagramLines(pId, pId, pElement);
        
        const allLucThan = ["Huynh đệ", "Tử tôn", "Thê tài", "Quan quỷ", "Phụ mẫu"];
        const missingLucThan = allLucThan.filter(lt => !presentLucThan.includes(lt));

        let phucThanMap = {}; // index 0..5 -> phục thần
        missingLucThan.forEach(lt => {
            const idx = parentLines.findIndex(l => l.lucThan === lt);
            if (idx !== -1) {
                phucThanMap[idx] = {
                    lucThan: lt,
                    can: parentLines[idx].can,
                    chi: parentLines[idx].chi,
                    element: parentLines[idx].element,
                    napAm: CALENDAR.NAP_AM[`${parentLines[idx].can} ${parentLines[idx].chi}`] || ""
                };
            }
        });
        return phucThanMap;
    }

    // Xác định Lục Thú dựa vào Can ngày
    function getLucThu(dayCan) {
        const animals = ["Thanh Long", "Chu Tước", "Câu Trần", "Đằng Xà", "Bạch Hổ", "Huyền Vũ"];
        let startIdx = 0;
        if (dayCan === "Giáp" || dayCan === "Ất") startIdx = 0;
        else if (dayCan === "Bính" || dayCan === "Đinh") startIdx = 1;
        else if (dayCan === "Mậu") startIdx = 2;
        else if (dayCan === "Kỷ") startIdx = 3;
        else if (dayCan === "Canh" || dayCan === "Tân") startIdx = 4;
        else if (dayCan === "Nhâm" || dayCan === "Quý") startIdx = 5;

        let result = [];
        for (let i = 0; i < 6; i++) {
            result.push(animals[(startIdx + i) % 6]);
        }
        return result; // Hào 1 (đầu danh sách) -> Hào 6 (cuối danh sách)
    }

    // Tính trạng thái 12 Cung Trường Sinh của hào theo ngày/tháng
    function getTruongSinh(haoNguHanh, targetChi) {
        const targetChiIdx = CALENDAR.CHI.indexOf(targetChi);
        const CUNG_SHORT = ["T.Sinh", "M.Dục", "Q.Đới", "L.Quan", "Đ.Vượng", "Suy", "Bệnh", "Tử", "Mộ", "Tuyệt", "Thai", "Dưỡng"];

        let startBranchIdx = 0;
        if (haoNguHanh === "Mộc") startBranchIdx = CALENDAR.CHI.indexOf("Hợi");
        else if (haoNguHanh === "Hỏa") startBranchIdx = CALENDAR.CHI.indexOf("Dần");
        else if (haoNguHanh === "Kim") startBranchIdx = CALENDAR.CHI.indexOf("Tỵ");
        else if (haoNguHanh === "Thủy" || haoNguHanh === "Thổ") startBranchIdx = CALENDAR.CHI.indexOf("Thân");

        let diff = (targetChiIdx - startBranchIdx + 12) % 12;
        return CUNG_SHORT[diff];
    }

    // Tính toán Thần Sát dựa trên ngày gieo, năm gieo, tháng gieo
    function getShenSha(calDetails) {
        const canDay = calDetails.day.can;
        const chiDay = calDetails.day.chi;
        const chiYear = calDetails.year.chi;
        const chiMonth = calDetails.month.chi;

        // 1. Quý Nhân
        const mapQuy = {
            "Giáp": ["Sửu", "Mùi"], "Mậu": ["Sửu", "Mùi"], "Canh": ["Sửu", "Mùi"],
            "Ất": ["Tý", "Thân"], "Kỷ": ["Tý", "Thân"],
            "Bính": ["Hợi", "Dậu"], "Đinh": ["Hợi", "Dậu"],
            "Nhâm": ["Mão", "Tỵ"], "Quý": ["Mão", "Tỵ"],
            "Tân": ["Ngọ", "Dần"]
        };
        const quyNhan = mapQuy[canDay] || [];

        // 2. Lộc Thần
        const mapLoc = {
            "Giáp": "Dần", "Ất": "Mão", "Bính": "Tỵ", "Mậu": "Tỵ",
            "Đinh": "Ngọ", "Kỷ": "Ngọ", "Canh": "Thân", "Tân": "Dậu",
            "Nhâm": "Hợi", "Quý": "Tý"
        };
        const locThan = mapLoc[canDay] || "";

        // 3. Dương Nhận
        const mapNhan = {
            "Giáp": "Mão", "Ất": "Dần", "Bính": "Ngọ", "Mậu": "Ngọ",
            "Đinh": "Tỵ", "Kỷ": "Tỵ", "Canh": "Dậu", "Tân": "Thân",
            "Nhâm": "Tý", "Quý": "Hợi"
        };
        const duongNhan = mapNhan[canDay] || "";

        // 4. Văn Xương
        const mapXuong = {
            "Giáp": "Tỵ", "Ất": "Ngọ", "Bính": "Thân", "Mậu": "Thân",
            "Đinh": "Dậu", "Kỷ": "Dậu", "Canh": "Hợi", "Tân": "Tý",
            "Nhâm": "Dần", "Quý": "Mão"
        };
        const vanXuong = mapXuong[canDay] || "";

        // Mã hóa tam hợp để tính Dịch Mã, Đào Hoa, v.v.
        const getGroupIndex = (chi) => {
            if (["Thân", "Tý", "Thìn"].includes(chi)) return 0;
            if (["Tỵ", "Dậu", "Sửu"].includes(chi)) return 1;
            if (["Dần", "Ngọ", "Tuất"].includes(chi)) return 2;
            if (["Hợi", "Mão", "Mùi"].includes(chi)) return 3;
            return 0;
        };

        const gIdx = getGroupIndex(chiDay);

        // 5. Dịch Mã
        const dichMa = ["Dần", "Hợi", "Thân", "Tỵ"][gIdx];

        // 6. Đào Hoa
        const daoHoa = ["Dậu", "Ngọ", "Mão", "Tý"][gIdx];

        // 7. Tướng Tinh
        const tuongTinh = ["Tý", "Dậu", "Ngọ", "Mão"][gIdx];

        // 8. Kiếp Sát
        const kiepSát = ["Tỵ", "Dần", "Hợi", "Thân"][gIdx];

        // 9. Hoa Cái
        const hoaCai = ["Thìn", "Sửu", "Tuất", "Mùi"][gIdx];

        // 10. Mưu Tinh
        const muuTinh = ["Tuất", "Mùi", "Thìn", "Sửu"][gIdx];

        // 11. Tai Sát
        const taiSat = ["Ngọ", "Mão", "Tý", "Dậu"][gIdx];

        // 12. Vong Thần
        const vongThan = ["Hợi", "Thân", "Tỵ", "Dần"][gIdx];

        // 13. Thiên Y: Chi tháng lùi 1 vị
        const mIdx = CALENDAR.CHI.indexOf(chiMonth);
        const thienY = CALENDAR.CHI[(mIdx - 1 + 12) % 12];

        // 14. Thiên Hỉ: Theo mùa
        // Xuân (Dần, Mão, Thìn) -> Tuất
        // Hạ (Tỵ, Ngọ, Mùi) -> Sửu
        // Thu (Thân, Dậu, Tuất) -> Thìn
        // Đông (Hợi, Tý, Sửu) -> Mùi
        let thienHi = "Sửu";
        if (["Dần", "Mão", "Thìn"].includes(chiMonth)) thienHi = "Tuất";
        else if (["Tỵ", "Ngọ", "Mùi"].includes(chiMonth)) thienHi = "Sửu";
        else if (["Thân", "Dậu", "Tuất"].includes(chiMonth)) thienHi = "Thìn";
        else if (["Hợi", "Tý", "Sửu"].includes(chiMonth)) thienHi = "Mùi";

        return {
            quyNhan, locThan, duongNhan, vanXuong, dichMa, daoHoa,
            tuongTinh, kiepSát, hoaCai, muuTinh, taiSat, vongThan,
            thienY, thienHi
        };
    }

    // Xử lý ném 6 lần xu để dựng quẻ chính và biến
    // coinLines: mảng 6 phần tử từ hào 1 -> hào 6. Mỗi phần tử là số từ 6 đến 9:
    // 6: Âm động (x, 3 âm), 7: Dương tĩnh (1 dương, 2 âm), 8: Âm tĩnh (1 âm, 2 dương), 9: Dương động (o, 3 dương)
    function processQuere(coinLines, calDetails) {
        // Dựng hào quẻ chính (7, 9 -> 1: Dương; 6, 8 -> 0: Âm)
        let mainTrigramLines = coinLines.map(v => (v % 2 !== 0) ? 1 : 0);
        let lowerMainLines = mainTrigramLines.slice(0, 3);
        let upperMainLines = mainTrigramLines.slice(3, 6);
        let lowerMainId = getTrigramIdFromLines(lowerMainLines);
        let upperMainId = getTrigramIdFromLines(upperMainLines);

        const mainKey = `${upperMainId}-${lowerMainId}`;
        const mainHexMap = HEXAGRMAN_MAP[mainKey] || { palace: "Càn", palaceElement: "Kim", the: 6, ung: 3, status: "Bát Thuần" };
        const mainHexName = HEX_NAMES[mainKey] || "Quẻ Chính";

        // Dựng hào quẻ biến (6 -> 1, 9 -> 0, còn lại giữ nguyên)
        let bienTrigramLines = coinLines.map(v => {
            if (v === 6) return 1;
            if (v === 9) return 0;
            return (v % 2 !== 0) ? 1 : 0;
        });
        let lowerBienLines = bienTrigramLines.slice(0, 3);
        let upperBienLines = bienTrigramLines.slice(3, 6);
        let lowerBienId = getTrigramIdFromLines(lowerBienLines);
        let upperBienId = getTrigramIdFromLines(upperBienLines);

        const bienKey = `${upperBienId}-${lowerBienId}`;
        // Hào biến lục thân vẫn tính dựa trên ngũ hành họ của quẻ chính!
        const bienHexMap = HEXAGRMAN_MAP[bienKey] || { palace: "Càn", palaceElement: "Kim", the: 6, ung: 3, status: "Biến" };
        const bienHexName = HEX_NAMES[bienKey] || "Quẻ Biến";

        // Xây dựng hào quẻ chính chi tiết
        let mainLinesDetail = buildHexagramLines(lowerMainId, upperMainId, mainHexMap.palaceElement);
        // Xây dựng hào quẻ biến chi tiết (Dùng họ của Quẻ chính để xác định Lục Thân!)
        let bienLinesDetail = buildHexagramLines(lowerBienId, upperBienId, mainHexMap.palaceElement);

        // Bổ sung trạng thái Động (o hoặc x)
        for (let i = 0; i < 6; i++) {
            mainLinesDetail[i].dongSymbol = (coinLines[i] === 6) ? "X" : (coinLines[i] === 9 ? "O" : "-");
            mainLinesDetail[i].rawVal = coinLines[i];
            
            // Nạp âm hào chính
            mainLinesDetail[i].napAm = CALENDAR.NAP_AM[`${mainLinesDetail[i].can} ${mainLinesDetail[i].chi}`] || "";
            // Nạp âm hào biến
            bienLinesDetail[i].napAm = CALENDAR.NAP_AM[`${bienLinesDetail[i].can} ${bienLinesDetail[i].chi}`] || "";

            // Tuần Không
            mainLinesDetail[i].isTuanKhong = calDetails.tuanKhong.includes(mainLinesDetail[i].chi);
            bienLinesDetail[i].isTuanKhong = calDetails.tuanKhong.includes(bienLinesDetail[i].chi);

            // Trường Sinh theo Ngày và Tháng
            mainLinesDetail[i].tsNgay = getTruongSinh(mainLinesDetail[i].element, calDetails.day.chi);
            mainLinesDetail[i].tsThang = getTruongSinh(mainLinesDetail[i].element, calDetails.month.chi);
            bienLinesDetail[i].tsNgay = getTruongSinh(bienLinesDetail[i].element, calDetails.day.chi);
            bienLinesDetail[i].tsThang = getTruongSinh(bienLinesDetail[i].element, calDetails.month.chi);
        }

        // Tính Phục Thần
        const presentLucThan = mainLinesDetail.map(l => l.lucThan);
        const phucThanList = getPhucThan(mainHexMap.palace, presentLucThan);

        // Lục Thú
        const lucThuList = getLucThu(calDetails.day.can);

        // Thần Sát
        const shenSha = getShenSha(calDetails);

        // Kiểm tra Lục Xung / Lục Hợp của quẻ
        // Chúng ta ghi nhận thêm họ quẻ chính Lục Xung hay không
        // Các quẻ Lục Xung: 8 quẻ Bát Thuần + Thiên Lôi Vô Vọng + Lôi Thiên Đại Tráng.
        const lucXungHexKeys = ["1-1", "2-2", "3-3", "4-4", "5-5", "6-6", "7-7", "8-8", "1-4", "4-1"];
        const isLucXung = lucXungHexKeys.includes(mainKey);

        return {
            main: {
                key: mainKey,
                name: mainHexName,
                palace: mainHexMap.palace,
                palaceElement: mainHexMap.palaceElement,
                status: mainHexMap.status,
                the: mainHexMap.the,
                ung: mainHexMap.ung,
                lines: mainLinesDetail,
                isLucXung: isLucXung
            },
            bien: {
                key: bienKey,
                name: bienHexName,
                palace: bienHexMap.palace,
                lines: bienLinesDetail,
                the: bienHexMap.the,
                ung: bienHexMap.ung
            },
            phucThan: phucThanList,
            lucThu: lucThuList,
            shenSha: shenSha
        };
    }

    return {
        processQuere,
        getTruongSinh,
        getShenSha,
        HEX_NAMES
    };
})();
