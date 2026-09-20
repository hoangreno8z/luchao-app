/**
 * houseMeanings.js - Ý Nghĩa Cổ Điển 12 Nhà & Hệ Nhà Phái Sinh (Turned Houses)
 * Source: William Lilly, Christian Astrology (1647), Book II, Chapter VII, pp.50–56; Claude Dariot (1557).
 *
 * TUYỆT ĐỐI TUÂN THỦ NGUYÊN TẮC HORARY CỔ ĐIỂN:
 * 1. Không dùng tâm lý học hiện đại hay phân tâm học thế kỷ 20.
 * 2. Giữ nguyên trật tự biểu thị kinh điển:
 *    - Nhà 4: Người Cha (Father), đất đai, nhà cửa, kết cuộc sự việc ("The End of all things").
 *    - Nhà 10: Người Mẹ (Mother), địa vị, chức tước, sếp, quan tòa, danh dự.
 *    - Nhà 7: Hôn nhân, tình yêu, vợ/chồng, đối tác làm ăn, kẻ thù công khai, trộm cắp.
 *    - Nhà 8: Cái chết, di chúc, của hồi môn / tiền bạc của người khác (Nhà 2 của Nhà 7), nỗi sợ hãi tâm trí.
 * 3. Hỗ trợ hệ nhà phái sinh (Turned Houses / Derived Houses) theo Claude Dariot.
 */

export const HOUSE_DEFINITIONS = [
    {
        number: 1,
        nameVi: 'Nhà 1 — Bản Thân & Người Hỏi (Querent)',
        nameShort: 'Người hỏi / Bản thân',
        keyword: 'Người hỏi, sinh mệnh, thân thể, hình thể, tính khí, trạng thái khởi đầu',
        description: 'Đại diện cho chính người đặt câu hỏi (Querent), sinh mạng, thể trạng sức khỏe, thể chất và điều kiện khởi phát của sự việc (Lilly CA p.50).',
        roleFormula: 'Người đặt câu hỏi (Querent) và thân mệnh của họ'
    },
    {
        number: 2,
        nameVi: 'Nhà 2 — Tài Sản Di Động & Của Cải (Estate & Fortune)',
        nameShort: 'Của cải / Tiền bạc',
        keyword: 'Tài sản di động, tiền của, đồ đạc có giá trị, tiền cho vay, lãi lỗ buôn bán',
        description: 'Đại diện cho gia sản, tiền bạc, của cải lưu động, hàng hóa, nguồn lực vật chất, tiền cho vay và khả năng chi trả của người hỏi (Lilly CA p.51).',
        roleFormula: 'Tài sản, tiền bạc và nguồn lực của người hỏi'
    },
    {
        number: 3,
        nameVi: 'Nhà 3 — Anh Chị Em, Láng Giềng & Thư Tín (Brethren & Messages)',
        nameShort: 'Anh em / Tin tức / Đi gần',
        keyword: 'Anh chị em, họ hàng gần, hàng xóm, thư từ, tin đồn, sứ giả, chuyến đi ngắn nội địa',
        description: 'Cai quản anh chị em ruột, anh em họ, láng giềng, các chuyến đi ngắn trong hạt/vùng, thư tín, tin tức truyền khẩu và người đưa tin (Lilly CA p.52).',
        roleFormula: 'Anh chị em, láng giềng, thư từ hoặc các chuyến đi ngắn'
    },
    {
        number: 4,
        nameVi: 'Nhà 4 — Người Cha, Đất Đai & Đoạn Kết (Fathers, Lands & End of Matters)',
        nameShort: 'Người Cha / Đất đai / Đoạn kết',
        keyword: 'Người cha, đất đai, bất động sản, nhà cửa, kho báu ẩn giấu, kết cuộc sau cùng',
        description: 'Đại diện cho người cha, đất đai thừa kế, nhà đất, nông trại, lâu đài, mỏ khoáng sản hoặc kho báu dưới lòng đất. ĐẶC BIỆT trong Horary, đây là "Đoạn Kết Chung Cuộc của mọi vấn đề" (Lilly CA p.52).',
        roleFormula: 'Người cha, bất động sản hoặc Kết quả chung cuộc của việc hỏi'
    },
    {
        number: 5,
        nameVi: 'Nhà 5 — Con Cái, Thai Sản & Sứ Giả (Children & Pleasures)',
        nameShort: 'Con cái / Vui chơi',
        keyword: 'Con cái, mang thai, sứ thần, tiệc tùng, quán rượu, yến tiệc, y phục lộng lẫy',
        description: 'Cai quản con cái, chuyện thai nghén, sứ giả đại diện quốc gia, sự hưởng thụ, tiệc tùng, quán rượu và những niềm vui trần thế (Lilly CA p.53).',
        roleFormula: 'Con cái, chuyện thai sản hoặc sự hưởng thụ'
    },
    {
        number: 6,
        nameVi: 'Nhà 6 — Bệnh Tật, Gia Nhân & Gia Súc Nhỏ (Sickness & Servants)',
        nameShort: 'Bệnh tật / Người làm công',
        keyword: 'Bệnh tật, thầy thuốc chữa bệnh, người làm thuê, tá điền, gia súc nhỏ (cừu, dê, lợn)',
        description: 'Biểu thị bệnh tật, căn nguyên và phương thuốc chữa trị; người giúp việc, người làm công nhật, tá điền thuê đất và các loài gia súc nhỏ (Lilly CA p.53).',
        roleFormula: 'Bệnh tật, thể trạng đau ốm hoặc người làm thuê / cấp dưới'
    },
    {
        number: 7,
        nameVi: 'Nhà 7 — Hôn Nhân, Đối Tác & Đối Thủ Công Khai (Marriage & Quesited)',
        nameShort: 'Hôn nhân / Đối tác / Đối phương',
        keyword: 'Vợ/chồng, tình yêu đôi lứa, đối tác giao kèo, đối thủ kiện tụng, kẻ trộm, người được hỏi',
        description: 'Đại diện cho hôn nhân và mọi câu hỏi tình yêu; người phối ngẫu, đối tác ký kết hiệp ước, kẻ thù công khai đối đầu trên tòa án, kẻ trộm cắp và người được hỏi (Quesited) (Lilly CA p.54).',
        roleFormula: 'Người được hỏi (Quesited), vợ/chồng, đối tác hoặc kẻ thù công khai'
    },
    {
        number: 8,
        nameVi: 'Nhà 8 — Cái Chết, Di Sản & Tiền Người Khác (Death & Dowry)',
        nameShort: 'Cái chết / Của hồi môn / Tiền đối phương',
        keyword: 'Cái chết, di chúc, tài sản thừa kế, của hồi môn/tiền bạc của người phối ngẫu, nỗi sợ hãi',
        description: 'Biểu thị cái chết, bản chất cái chết, di chúc, quyền thừa kế; của cải và tiền bạc của đối phương/vợ chồng (Nhà 2 của Nhà 7); các khoản nợ và sự sợ hãi tinh thần (Lilly CA p.54).',
        roleFormula: 'Tiền bạc của đối phương, tài sản thừa kế, nợ nần hoặc sự khủng hoảng'
    },
    {
        number: 9,
        nameVi: 'Nhà 9 — Đi Xa Vượt Biển, Tôn Giáo & Tri Thức (Long Journeys & Religion)',
        nameShort: 'Hành trình xa / Tôn giáo',
        keyword: 'Chuyến đi xa vượt biển, tôn giáo, giáo sĩ, sách vở, tri thức học thuật, giấc mơ',
        description: 'Cai quản những chuyến viễn du hải ngoại, tôn giáo, giới tăng lữ, triết học, học thuật uyên bác, sách vở và điềm báo giấc mơ (Lilly CA p.55).',
        roleFormula: 'Chuyến đi xa vượt biển, học vấn cao hoặc tôn giáo'
    },
    {
        number: 10,
        nameVi: 'Nhà 10 — Người Mẹ, Danh Dự, Chức Tước & Quan Tòa (Honor & Mothers)',
        nameShort: 'Người Mẹ / Chức tước / Thẩm phán',
        keyword: 'Người mẹ, vua chúa, quan tòa, sếp lớn, danh dự, chức vụ công quyền, nghề nghiệp',
        description: 'Đỉnh trời (MC), biểu thị người mẹ, các vị vua, thẩm phán ban phát phán quyết, quan chức có thẩm quyền, danh dự, phẩm hàm và sự nghiệp chính thức (Lilly CA p.55).',
        roleFormula: 'Người mẹ, quan tòa, cấp trên có quyền định đoạt hoặc sự nghiệp'
    },
    {
        number: 11,
        nameVi: 'Nhà 11 — Bạn Bè, Hy Vọng & Quý Nhân (Friends & Hopes)',
        nameShort: 'Bạn hữu / Hy vọng',
        keyword: 'Bạn bè chân thành, sự che chở, hy vọng, lòng tin, quốc khố của vua chúa',
        description: 'Nhà của May Mắn Tốt Lành (Good Fortune), biểu thị bạn hữu trung thành, sự ủng hộ của triều đình, người bảo trợ và những ước vọng thành tựu (Lilly CA p.56).',
        roleFormula: 'Bạn bè thân hữu, sự bảo trợ và niềm hy vọng'
    },
    {
        number: 12,
        nameVi: 'Nhà 12 — Kẻ Thù Kín, Sự Giam Hãm & Gia Súc Lớn (Secret Enemies & Prison)',
        nameShort: 'Kẻ thù ngầm / Giam cầm',
        keyword: 'Kẻ thù giấu mặt, âm mưu hãm hại, phù thủy, tù ngục, sự giam hãm, gia súc lớn (ngựa, voi)',
        description: 'Cai quản kẻ thù giấu mặt ngầm hãm hại, sự phản trắc, ngục tù giam hãm, nỗi khổ đau tự chuốc lấy, và các loài đại gia súc như ngựa, bò, voi (Lilly CA p.56).',
        roleFormula: 'Kẻ thù ngầm kín, tai họa giấu mặt hoặc sự giam hãm'
    }
];

/**
 * Bản đồ quy đổi tên tiếng Việt của 12 cung hoàng đạo và 7 hành tinh
 */
const SIGN_NAME_MAP = {
    aries: 'Bạch Dương', taurus: 'Kim Ngưu', gemini: 'Song Tử', cancer: 'Cự Giải',
    leo: 'Sư Tử', virgo: 'Xử Nữ', libra: 'Thiên Bình', scorpio: 'Bọ Cạp',
    sagittarius: 'Nhân Mã', capricorn: 'Ma Kết', aquarius: 'Bảo Bình', pisces: 'Song Ngư'
};

const PLANET_NAME_MAP = {
    sun: 'Mặt Trời', moon: 'Mặt Trăng', mercury: 'Thủy Tinh',
    venus: 'Kim Tinh', mars: 'Hỏa Tinh', jupiter: 'Mộc Tinh', saturn: 'Thổ Tinh',
    northNode: 'Bắc Giao Điểm', southNode: 'Nam Giao Điểm'
};

/**
 * Tính nhà phái sinh (Turned Houses / Derived Houses) theo Claude Dariot (1557) & William Lilly.
 * Công thức: ((baseHouse + relativeHouse - 2) % 12) + 1
 *
 * Ví dụ:
 * - Tiền bạc của đối tác: base = 7, relative = 2 -> ((7 + 2 - 2) % 12) + 1 = Nhà 8
 * - Con cái của đối tác: base = 7, relative = 5 -> ((7 + 5 - 2) % 12) + 1 = Nhà 11
 * - Cha của người phối ngẫu: base = 7, relative = 4 -> ((7 + 4 - 2) % 12) + 1 = Nhà 10
 * - Bệnh tật của anh em: base = 3, relative = 6 -> ((3 + 6 - 2) % 12) + 1 = Nhà 8
 *
 * @param {number} baseHouse - Nhà cơ sở (1 đến 12)
 * @param {number} relativeHouse - Nhà tương đối cần xét (1 đến 12)
 * @returns {number} Số thứ tự nhà trong lá số (1 đến 12)
 */
export function turnedHouse(baseHouse, relativeHouse) {
    const b = parseInt(baseHouse, 10);
    const r = parseInt(relativeHouse, 10);
    if (isNaN(b) || isNaN(r) || b < 1 || b > 12 || r < 1 || r > 12) {
        throw new Error(`Nhà không hợp lệ: baseHouse=${baseHouse}, relativeHouse=${relativeHouse}. Phải nằm trong [1, 12].`);
    }
    return ((b + r - 2) % 12) + 1;
}

/**
 * Mô tả diễn giải nhà phái sinh dạng văn bản học thuật
 * @param {number} baseHouse 
 * @param {number} relativeHouse 
 * @returns {string}
 */
export function describeTurnedHouse(baseHouse, relativeHouse) {
    const resultingHouse = turnedHouse(baseHouse, relativeHouse);
    const baseDef = HOUSE_DEFINITIONS.find(h => h.number === baseHouse);
    const relDef = HOUSE_DEFINITIONS.find(h => h.number === relativeHouse);
    return `Nhà ${resultingHouse} trong lá số là Nhà ${relativeHouse} (${relDef.nameShort}) của Nhà ${baseHouse} (${baseDef.nameShort}).`;
}

/**
 * Sinh câu diễn giải hoàn chỉnh cho một đỉnh nhà
 * Hỗ trợ linh hoạt cả mã ID ('aries', 'mars') lẫn tên tiếng Việt ('Bạch Dương', 'Hỏa Tinh')
 * và đối tượng hành tinh đầy đủ.
 *
 * @param {number} houseNum - 1 đến 12
 * @param {string} signNameOrId - Tên tiếng Việt hoặc id của cung hoàng đạo đỉnh nhà
 * @param {string} rulerNameOrId - Tên tiếng Việt hoặc id của hành tinh chủ quản
 * @param {string} cuspFormatted - Tọa độ đỉnh nhà (ví dụ: '03°17′')
 * @param {object|null} rulerPlanetObj - Đối tượng hành tinh (nếu có)
 * @returns {object} Câu diễn giải tự động
 */
export function generateHouseExplanation(houseNum, signNameOrId, rulerNameOrId, cuspFormatted = '', rulerPlanetObj = null) {
    const def = HOUSE_DEFINITIONS.find(h => h.number === houseNum);
    if (!def) return null;

    const signVi = SIGN_NAME_MAP[signNameOrId] || signNameOrId;
    let rulerVi = rulerNameOrId;
    if (rulerPlanetObj && rulerPlanetObj.nameVi) {
        rulerVi = rulerPlanetObj.nameVi;
    } else if (PLANET_NAME_MAP[rulerNameOrId]) {
        rulerVi = PLANET_NAME_MAP[rulerNameOrId];
    }

    const cuspText = cuspFormatted ? ` tại ${cuspFormatted}` : '';
    const explanationText = `Đỉnh Nhà ${houseNum}${cuspText} nằm ở cung ${signVi}. Cung ${signVi} do ${rulerVi} cai quản bản vị. Vì vậy trong câu hỏi này, ${rulerVi} chính là chủ tinh đại diện cho ${def.roleFormula}.`;

    return {
        houseNumber: houseNum,
        title: def.nameVi,
        shortTitle: def.nameShort,
        cuspSign: signVi,
        rulerPlanet: rulerVi,
        sentence: explanationText,
        fullMeaning: def.description,
        traditionalMeaning: def.description, // Alias đảm bảo tương thích ngược
        keyword: def.keyword,
        roleFormula: def.roleFormula
    };
}
