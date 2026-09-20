/**
 * houseMeanings.js - Ý Nghĩa Cổ Điển 12 Nhà & Hệ Nhà Phái Sinh (Turned Houses)
 * Source: William Lilly, Christian Astrology (1647), Book I, Chapter VII, pp.50–56; Claude Dariot (1557).
 *
 * NGUYÊN TẮC HỌC THUẬT KINH ĐIỂN:
 * 1. Trung thành 100% nguyên tác William Lilly (1647), không pha trộn tâm lý học hiện đại.
 * 2. Giữ nguyên trật tự biểu thị kinh điển:
 *    - Nhà 4: Người Cha (Father), đất đai, nhà cửa, kết cuộc sau cùng ("The End of all things").
 *    - Nhà 10: Người Mẹ (Mother), địa vị, chức tước, sếp, quan tòa, danh dự.
 *    - Nhà 7: Hôn nhân, tình yêu, vợ/chồng, đối tác làm ăn, kẻ thù công khai, trộm cắp, thầy thuốc (trong câu hỏi y khoa).
 *    - Nhà 6: Bệnh tật, đau ốm, người giúp việc, gia nhân, tá điền, gia súc nhỏ (cừu, dê, lợn).
 *    - Nhà 8: Cái chết, bản chất cái chết, di chúc, của hồi môn / của cải người phối ngẫu (Nhà 2 từ Nhà 7), nỗi sợ hãi tâm trí.
 * 3. Hỗ trợ hệ nhà phái sinh (Turned Houses / Derived Houses) theo Claude Dariot (1557).
 * 4. Bổ sung đầy đủ metadata kinh điển: Nhà Dương/Âm, Góc/Kế/Rơi, Cung & Hành tinh Đồng cai quản, Niềm vui hành tinh (Joy), Thứ tự sức mạnh nhà.
 */

export const HOUSE_DEFINITIONS = [
    {
        number: 1,
        nameVi: 'Nhà 1 — Bản Thân & Người Hỏi (Querent)',
        nameShort: 'Người hỏi / Bản thân',
        keyword: 'Người hỏi, sinh mệnh, thân thể, hình thể, tính khí, khởi đầu sự việc',
        description: 'Đại diện cho chính người đặt câu hỏi (Querent), sinh mạng, thể trạng sức khỏe, thể chất và điều kiện khởi phát của sự việc (Lilly CA Book I, Ch. VII, p.50).',
        roleFormula: 'Người đặt câu hỏi (Querent) và thân mệnh của họ',
        masculineOrFeminine: 'masculine',
        cardinality: 'angular',
        cardinalityVi: 'Nhà Góc (Angular)',
        cosignifyingSign: 'aries',
        cosignifyingPlanet: 'saturn',
        planetaryJoy: 'mercury',
        planetaryJoyVi: 'Thủy Tinh (Mercury)',
        strengthOrder: 1,
        sourceBook: 'Book I',
        sourceChapter: 'Chapter VII',
        sourcePages: 'pp.50-51'
    },
    {
        number: 2,
        nameVi: 'Nhà 2 — Của Cải & Gia Sản Di Động (Estate & Fortune)',
        nameShort: 'Của cải / Tiền bạc',
        keyword: 'Tài sản di động, tiền của, đồ đạc có giá trị, tiền cho vay, lãi lỗ buôn bán',
        description: 'Đại diện cho gia sản, tiền bạc, của cải lưu động, hàng hóa, nguồn lực vật chất, tiền cho vay và khả năng chi trả của người hỏi (Lilly CA Book I, Ch. VII, p.51).',
        roleFormula: 'Tài sản, tiền bạc và nguồn lực của người hỏi',
        masculineOrFeminine: 'feminine',
        cardinality: 'succedent',
        cardinalityVi: 'Nhà Kế tiếp (Succedent)',
        cosignifyingSign: 'taurus',
        cosignifyingPlanet: 'jupiter',
        planetaryJoy: null,
        planetaryJoyVi: 'Không có',
        strengthOrder: 9,
        sourceBook: 'Book I',
        sourceChapter: 'Chapter VII',
        sourcePages: 'pp.51-52'
    },
    {
        number: 3,
        nameVi: 'Nhà 3 — Anh Chị Em, Láng Giềng & Thư Tín (Brethren & Messages)',
        nameShort: 'Anh em / Tin tức / Đi gần',
        keyword: 'Anh chị em, họ hàng gần, hàng xóm, thư từ, tin đồn, sứ giả, chuyến đi ngắn nội địa',
        description: 'Cai quản anh chị em ruột, anh em họ, láng giềng, các chuyến đi ngắn trong hạt/vùng, thư tín, tin tức truyền khẩu và người đưa tin (Lilly CA Book I, Ch. VII, p.52).',
        roleFormula: 'Anh chị em, láng giềng, thư từ hoặc các chuyến đi ngắn',
        masculineOrFeminine: 'masculine',
        cardinality: 'cadent',
        cardinalityVi: 'Nhà Rơi / Tiếp biến (Cadent)',
        cosignifyingSign: 'gemini',
        cosignifyingPlanet: 'mars',
        planetaryJoy: 'moon',
        planetaryJoyVi: 'Mặt Trăng (Moon)',
        strengthOrder: 8,
        sourceBook: 'Book I',
        sourceChapter: 'Chapter VII',
        sourcePages: 'p.52'
    },
    {
        number: 4,
        nameVi: 'Nhà 4 — Người Cha, Đất Đai & Đoạn Kết (Fathers, Lands & End of Matters)',
        nameShort: 'Người Cha / Đất đai / Đoạn kết',
        keyword: 'Người cha, đất đai, bất động sản, nhà cửa, kho báu ẩn giấu, kết cuộc sau cùng',
        description: 'Đại diện cho người cha, đất đai thừa kế, nhà đất, nông trại, lâu đài, mỏ khoáng sản hoặc kho báu dưới lòng đất. ĐẶC BIỆT trong Horary, đây là "Đoạn Kết Chung Cuộc của mọi vấn đề" (Lilly CA Book I, Ch. VII, p.52).',
        roleFormula: 'Người cha, bất động sản hoặc Kết quả chung cuộc của việc hỏi',
        masculineOrFeminine: 'feminine',
        cardinality: 'angular',
        cardinalityVi: 'Nhà Góc (Angular)',
        cosignifyingSign: 'cancer',
        cosignifyingPlanet: 'sun',
        planetaryJoy: null,
        planetaryJoyVi: 'Không có',
        strengthOrder: 4,
        sourceBook: 'Book I',
        sourceChapter: 'Chapter VII',
        sourcePages: 'pp.52-53'
    },
    {
        number: 5,
        nameVi: 'Nhà 5 — Con Cái, Thai Sản & Sứ Giả (Children & Pleasures)',
        nameShort: 'Con cái / Vui chơi',
        keyword: 'Con cái, mang thai, sứ thần, tiệc tùng, quán rượu, yến tiệc, y phục lộng lẫy',
        description: 'Cai quản con cái, chuyện thai nghén, sứ giả đại diện quốc gia, sự hưởng thụ, tiệc tùng, quán rượu và những niềm vui trần thế (Lilly CA Book I, Ch. VII, p.53).',
        roleFormula: 'Con cái, chuyện thai sản hoặc sự hưởng thụ',
        masculineOrFeminine: 'masculine',
        cardinality: 'succedent',
        cardinalityVi: 'Nhà Kế tiếp (Succedent)',
        cosignifyingSign: 'leo',
        cosignifyingPlanet: 'venus',
        planetaryJoy: 'venus',
        planetaryJoyVi: 'Kim Tinh (Venus)',
        strengthOrder: 6,
        sourceBook: 'Book I',
        sourceChapter: 'Chapter VII',
        sourcePages: 'p.53'
    },
    {
        number: 6,
        nameVi: 'Nhà 6 — Bệnh Tật, Gia Nhân & Gia Súc Nhỏ (Sickness & Servants)',
        nameShort: 'Bệnh tật / Người làm công',
        keyword: 'Bệnh tật, nguyên nhân đau ốm, người giúp việc, tá điền, gia súc nhỏ (cừu, dê, lợn)',
        description: 'Biểu thị bệnh tật, nguyên nhân và bản chất đau ốm; người giúp việc, người làm công nhật, tá điền thuê đất và các loài gia súc nhỏ (Lilly CA Book I, Ch. VII, p.53). Lưu ý: Trong câu hỏi y khoa Horary, thầy thuốc thuộc Nhà 7.',
        roleFormula: 'Bệnh tật, thể trạng đau ốm hoặc người làm thuê / cấp dưới',
        masculineOrFeminine: 'feminine',
        cardinality: 'cadent',
        cardinalityVi: 'Nhà Rơi / Tiếp biến (Cadent)',
        cosignifyingSign: 'virgo',
        cosignifyingPlanet: 'mercury',
        planetaryJoy: 'mars',
        planetaryJoyVi: 'Hỏa Tinh (Mars)',
        strengthOrder: 11,
        sourceBook: 'Book I',
        sourceChapter: 'Chapter VII',
        sourcePages: 'pp.53-54'
    },
    {
        number: 7,
        nameVi: 'Nhà 7 — Hôn Nhân, Đối Tác & Đối Thủ Công Khai (Marriage & Quesited)',
        nameShort: 'Hôn nhân / Đối tác / Đối phương',
        keyword: 'Vợ/chồng, tình yêu đôi lứa, đối tác giao kèo, đối thủ kiện tụng, thầy thuốc, kẻ trộm',
        description: 'Đại diện cho hôn nhân và mọi câu hỏi tình yêu; người phối ngẫu, đối tác ký kết hiệp ước, kẻ thù công khai trên tòa án, thầy thuốc chữa bệnh, kẻ trộm cắp và người được hỏi (Quesited) (Lilly CA Book I, Ch. VII, p.54).',
        roleFormula: 'Người được hỏi (Quesited), vợ/chồng, đối tác hoặc kẻ thù công khai',
        masculineOrFeminine: 'masculine',
        cardinality: 'angular',
        cardinalityVi: 'Nhà Góc (Angular)',
        cosignifyingSign: 'libra',
        cosignifyingPlanet: 'moon',
        planetaryJoy: null,
        planetaryJoyVi: 'Không có',
        strengthOrder: 3,
        sourceBook: 'Book I',
        sourceChapter: 'Chapter VII',
        sourcePages: 'p.54'
    },
    {
        number: 8,
        nameVi: 'Nhà 8 — Cái Chết, Di Sản & Của Hồi Môn (Death & Dowry)',
        nameShort: 'Cái chết / Của hồi môn / Tiền đối phương',
        keyword: 'Cái chết, di chúc, quyền thừa kế, của hồi môn/của cải người phối ngẫu, nỗi sợ hãi',
        description: 'Biểu thị cái chết, bản chất và thời điểm của cái chết; di chúc, quyền thừa kế; của cải và tiền bạc của đối phương/vợ chồng (Nhà 2 từ Nhà 7); và sự sợ hãi lo âu tinh thần (Lilly CA Book I, Ch. VII, pp.54-55).',
        roleFormula: 'Tiền bạc của đối phương, tài sản thừa kế hoặc sự khủng hoảng',
        masculineOrFeminine: 'feminine',
        cardinality: 'succedent',
        cardinalityVi: 'Nhà Kế tiếp (Succedent)',
        cosignifyingSign: 'scorpio',
        cosignifyingPlanet: 'saturn',
        planetaryJoy: null,
        planetaryJoyVi: 'Không có',
        strengthOrder: 10,
        sourceBook: 'Book I',
        sourceChapter: 'Chapter VII',
        sourcePages: 'pp.54-55'
    },
    {
        number: 9,
        nameVi: 'Nhà 9 — Đi Xa Vượt Biển, Tôn Giáo & Tri Thức (Long Journeys & Religion)',
        nameShort: 'Hành trình xa / Tôn giáo',
        keyword: 'Chuyến đi xa vượt biển, tôn giáo, giáo sĩ, sách vở, tri thức học thuật, giấc mơ',
        description: 'Cai quản những chuyến viễn du hải ngoại, tôn giáo, giới tăng lữ, triết học, học thuật uyên bác, sách vở và điềm báo giấc mơ (Lilly CA Book I, Ch. VII, p.55).',
        roleFormula: 'Chuyến đi xa vượt biển, học vấn cao hoặc tôn giáo',
        masculineOrFeminine: 'masculine',
        cardinality: 'cadent',
        cardinalityVi: 'Nhà Rơi / Tiếp biến (Cadent)',
        cosignifyingSign: 'sagittarius',
        cosignifyingPlanet: 'jupiter',
        planetaryJoy: 'sun',
        planetaryJoyVi: 'Mặt Trời (Sun)',
        strengthOrder: 7,
        sourceBook: 'Book I',
        sourceChapter: 'Chapter VII',
        sourcePages: 'p.55'
    },
    {
        number: 10,
        nameVi: 'Nhà 10 — Người Mẹ, Danh Dự, Chức Tước & Quan Tòa (Honor & Mothers)',
        nameShort: 'Người Mẹ / Chức tước / Thẩm phán',
        keyword: 'Người mẹ, vua chúa, quan tòa, sếp lớn, danh dự, chức vụ công quyền, nghề nghiệp',
        description: 'Đỉnh trời (MC), biểu thị người mẹ, các vị vua, thẩm phán ban phát phán quyết, quan chức có thẩm quyền, danh dự, phẩm hàm và sự nghiệp chính thức (Lilly CA Book I, Ch. VII, p.55).',
        roleFormula: 'Người mẹ, quan tòa, cấp trên có quyền định đoạt hoặc sự nghiệp',
        masculineOrFeminine: 'feminine',
        cardinality: 'angular',
        cardinalityVi: 'Nhà Góc (Angular)',
        cosignifyingSign: 'capricorn',
        cosignifyingPlanet: 'mars',
        planetaryJoy: null,
        planetaryJoyVi: 'Không có',
        strengthOrder: 2,
        sourceBook: 'Book I',
        sourceChapter: 'Chapter VII',
        sourcePages: 'pp.55-56'
    },
    {
        number: 11,
        nameVi: 'Nhà 11 — Bạn Bè, Hy Vọng & Quý Nhân (Friends & Hopes)',
        nameShort: 'Bạn hữu / Hy vọng',
        keyword: 'Bạn bè chân thành, sự che chở, hy vọng, lòng tin, quốc khố của vua chúa',
        description: 'Nhà của May Mắn Tốt Lành (Good Fortune), biểu thị bạn hữu trung thành, sự ủng hộ của triều đình, người bảo trợ và những ước vọng thành tựu (Lilly CA Book I, Ch. VII, p.56).',
        roleFormula: 'Bạn bè thân hữu, sự bảo trợ và niềm hy vọng',
        masculineOrFeminine: 'masculine',
        cardinality: 'succedent',
        cardinalityVi: 'Nhà Kế tiếp (Succedent)',
        cosignifyingSign: 'aquarius',
        cosignifyingPlanet: 'sun',
        planetaryJoy: 'jupiter',
        planetaryJoyVi: 'Mộc Tinh (Jupiter)',
        strengthOrder: 5,
        sourceBook: 'Book I',
        sourceChapter: 'Chapter VII',
        sourcePages: 'p.56'
    },
    {
        number: 12,
        nameVi: 'Nhà 12 — Kẻ Thù Kín, Sự Giam Hãm & Gia Súc Lớn (Secret Enemies & Prison)',
        nameShort: 'Kẻ thù ngầm / Giam cầm',
        keyword: 'Kẻ thù giấu mặt, âm mưu hãm hại, phù thủy, tù ngục, sự giam hãm, gia súc lớn (ngựa, voi)',
        description: 'Cai quản kẻ thù giấu mặt ngầm hãm hại, sự phản trắc, ngục tù giam hãm, nỗi khổ đau tự chuốc lấy, và các loài đại gia súc như ngựa, bò, voi (Lilly CA Book I, Ch. VII, p.56).',
        roleFormula: 'Kẻ thù ngầm kín, tai họa giấu mặt hoặc sự giam hãm',
        masculineOrFeminine: 'feminine',
        cardinality: 'cadent',
        cardinalityVi: 'Nhà Rơi / Tiếp biến (Cadent)',
        cosignifyingSign: 'pisces',
        cosignifyingPlanet: 'venus',
        planetaryJoy: 'saturn',
        planetaryJoyVi: 'Thổ Tinh (Saturn)',
        strengthOrder: 12,
        sourceBook: 'Book I',
        sourceChapter: 'Chapter VII',
        sourcePages: 'p.56'
    }
];

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
 */
export function describeTurnedHouse(baseHouse, relativeHouse) {
    const resultingHouse = turnedHouse(baseHouse, relativeHouse);
    const baseDef = HOUSE_DEFINITIONS.find(h => h.number === baseHouse);
    const relDef = HOUSE_DEFINITIONS.find(h => h.number === relativeHouse);
    return `Nhà ${resultingHouse} trong lá số là Nhà ${relativeHouse} (${relDef.nameShort}) của Nhà ${baseHouse} (${baseDef.nameShort}).`;
}

/**
 * Sinh câu diễn giải hoàn chỉnh cho một đỉnh nhà
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
        traditionalMeaning: def.description,
        keyword: def.keyword,
        roleFormula: def.roleFormula,
        metadata: {
            masculineOrFeminine: def.masculineOrFeminine,
            cardinality: def.cardinality,
            cardinalityVi: def.cardinalityVi,
            cosignifyingSign: def.cosignifyingSign,
            cosignifyingPlanet: def.cosignifyingPlanet,
            planetaryJoy: def.planetaryJoy,
            planetaryJoyVi: def.planetaryJoyVi,
            strengthOrder: def.strengthOrder,
            source: `${def.sourceBook}, ${def.sourceChapter}, ${def.sourcePages}`
        }
    };
}
