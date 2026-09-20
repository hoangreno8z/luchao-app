/**
 * houseMeanings.js - Ý Nghĩa 12 Nhà Chiêm Tinh Học Giờ Hỏi (Horary Astrology)
 * Source: William Lilly, Christian Astrology (1647), Chapters VII - XVIII.
 *
 * Chứa định nghĩa cốt lõi, từ khóa quan trọng và bộ sinh câu giải nghĩa tự động
 * giúp người mới hiểu ngay lập tức vai trò của từng nhà và chủ tinh đại diện.
 */

export const HOUSE_DEFINITIONS = [
    {
        number: 1,
        nameVi: 'Nhà 1 — Bản Thân & Người Hỏi (Querent)',
        nameShort: 'Bản thân / Người hỏi',
        keyword: 'Người hỏi, bản thân, thân thể, điều kiện chung',
        description: 'Trong Horary, Nhà 1 luôn đại diện cho người đặt câu hỏi (Querent), tình trạng sức khỏe, tâm trí và trạng thái khởi đầu của vấn đề.',
        roleFormula: 'Người đặt câu hỏi (Querent)'
    },
    {
        number: 2,
        nameVi: 'Nhà 2 — Tài Chính & Nguồn Lực (Possessions)',
        nameShort: 'Tiền bạc / Nguồn lực',
        keyword: 'Tiền bạc, tài sản lưu động, nguồn thu nhập, khả năng thanh toán',
        description: 'Nhà 2 biểu thị túi tiền, tài sản cá nhân, của cải di động, nguồn vốn và sự hỗ trợ vật chất của người hỏi.',
        roleFormula: 'Tài sản & nguồn lực tài chính của người hỏi'
    },
    {
        number: 3,
        nameVi: 'Nhà 3 — Giao Tiếp & Di Chuyển Ngắn (Communications)',
        nameShort: 'Tin tức / Chuyến đi ngắn',
        keyword: 'Anh chị em, hàng xóm, tin nhắn, thư từ, hợp đồng sơ bộ, hành trình ngắn',
        description: 'Nhà 3 cai quản các luồng thông tin, tin đồn, tin tức, hợp đồng, các chuyến đi lại gần và mối quan hệ với anh chị em hoặc đồng nghiệp kề cận.',
        roleFormula: 'Thông tin, thư từ và sự liên lạc'
    },
    {
        number: 4,
        nameVi: 'Nhà 4 — Nhà Đất, Gốc Rễ & Đoạn Kết (End of the Matter)',
        nameShort: 'Nhà đất / Kết cuộc sự việc',
        keyword: 'Bất động sản, nhà cửa, đất đai, cha mẹ, tổ tiên, đoạn kết chung cuộc',
        description: 'Nhà 4 đại diện cho bất động sản, nhà ở, gốc gác gia đình, và ĐẶC BIỆT trong Horary là "Đoạn Kết Chung Cuộc" của toàn bộ sự việc đang hỏi.',
        roleFormula: 'Bất động sản hoặc Kết quả cuối cùng của việc hỏi'
    },
    {
        number: 5,
        nameVi: 'Nhà 5 — Con Cái, Tình Cảm & May Rủi (Pleasure & Children)',
        nameShort: 'Con cái / Tình vui',
        keyword: 'Con cái, mang thai, tình yêu hẹn hò, vui chơi, đầu tư mạo hiểm, tiệc tùng',
        description: 'Nhà 5 cai quản chuyện con cái, thai sản, chuyện tình cảm lãng mạn không ràng buộc hôn nhân, các trò giải trí và các khoản đầu tư sinh lời nhanh.',
        roleFormula: 'Con cái, tình ái hoặc thú vui đầu tư'
    },
    {
        number: 6,
        nameVi: 'Nhà 6 — Bệnh Tật, Công Việc Hàng Ngày & Lao Dịch (Servants & Health)',
        nameShort: 'Bệnh tật / Cấp dưới',
        keyword: 'Bệnh tật, sức khỏe suy giảm, công việc làm thuê, cấp dưới, vật nuôi nhỏ',
        description: 'Nhà 6 biểu thị bệnh tật, đau ốm, nhân viên, người làm công, người cung cấp dịch vụ và những gánh nặng công nhật khó nhọc.',
        roleFormula: 'Bệnh tật, sức khỏe hoặc cấp dưới / nhân viên'
    },
    {
        number: 7,
        nameVi: 'Nhà 7 — Đối Phương, Đối Tác & Người Được Hỏi (Quesited)',
        nameShort: 'Đối tác / Đối phương',
        keyword: 'Vợ/chồng, người yêu chính thức, đối tác làm ăn, đối thủ tranh tụng, bên kia của giao dịch',
        description: 'Nhà 7 đối diện trực tiếp Nhà 1, đại diện cho bất kỳ đối tượng nào mà người hỏi đang hướng tới: người phối ngẫu, đối tác ký hợp đồng, kẻ thù công khai, người bán/mua hàng.',
        roleFormula: 'Đối phương / Đối tác / Người được hỏi (Quesited)'
    },
    {
        number: 8,
        nameVi: 'Nhà 8 — Tiền Người Khác & Khủng Hoảng (Death & Other’s Money)',
        nameShort: 'Tiền đối phương / Nợ nần',
        keyword: 'Tài sản của nhà 7 (tiền đối phương), nợ nần, thuế, thừa kế, khủng hoảng, mất mát',
        description: 'Nhà 8 là nhà 2 của nhà 7 (tức tiền bạc của đối phương), đại diện cho các khoản vay, nợ phải trả, thuế má, tài sản thừa kế và sự biến động tâm lý sâu sắc.',
        roleFormula: 'Tài chính của đối phương hoặc Nợ nần / Khủng hoảng'
    },
    {
        number: 9,
        nameVi: 'Nhà 9 — Tri Thức, Tôn Giáo & Đi Xa (Long Journeys & Higher Mind)',
        nameShort: 'Học vấn / Đi xa',
        keyword: 'Học vấn đại học/thạc sĩ, triết học, tôn giáo, du lịch nước ngoài, xuất nhập khẩu, pháp luật',
        description: 'Nhà 9 biểu thị học vấn bậc cao, sự thông thái, tôn giáo, các chuyến xuất ngoại, hành trình xa xôi và việc mở rộng tầm nhìn nhận thức.',
        roleFormula: 'Học vấn cao, hành trình đi xa hoặc vấn đề tôn giáo/tri thức'
    },
    {
        number: 10,
        nameVi: 'Nhà 10 — Sự Nghiệp, Danh Dự & Quyền Quyết Định (Career & Honor)',
        nameShort: 'Sự nghiệp / Quyền lực',
        keyword: 'Chức vụ, sự nghiệp, thăng tiến, danh dự, cấp trên, sếp, quan tòa/thẩm phán',
        description: 'Nhà 10 là đỉnh trời (MC), biểu thị đỉnh cao sự nghiệp, địa vị xã hội, cấp trên trực tiếp có quyền ban chức tước, hoặc thẩm phán trong vụ kiện tụng.',
        roleFormula: 'Sự nghiệp, chức vụ, cơ quan quyền lực hoặc sếp'
    },
    {
        number: 11,
        nameVi: 'Nhà 11 — Bạn Bè, Hy Vọng & Quý Nhân Hỗ Trợ (Friends & Hopes)',
        nameShort: 'Bạn bè / Hy vọng',
        keyword: 'Bạn bè, mạng lưới đồng minh, người bảo trợ, ước mơ, hy vọng thành tựu',
        description: 'Nhà 11 là "Good Fortune" (May Mắn Tốt Lành), biểu thị bạn bè chân thành, cộng đồng hỗ trợ, nguồn tài trợ và sự hiện thực hóa những kỳ vọng.',
        roleFormula: 'Bạn bè, đồng minh và hy vọng của người hỏi'
    },
    {
        number: 12,
        nameVi: 'Nhà 12 — Kẻ Thù Kín, Trở Ngại Ngầm & Giam Hãm (Secret Enemies & Isolation)',
        nameShort: 'Trở ngại ngầm / Tiểu nhân',
        keyword: 'Kẻ thù giấu mặt, âm mưu sau lưng, bệnh viện, nhà tù, sự cô lập, tự hại bản thân',
        description: 'Nhà 12 biểu thị những điều bị che khuất, kẻ tiểu nhân ngầm hãm hại, sự tự giới hạn bản thân, các không gian giam giữ hoặc cô lập bí mật.',
        roleFormula: 'Trở ngại kín đáo hoặc kẻ thù ngầm sau lưng'
    }
];

/**
 * Sinh câu diễn giải hoàn chỉnh cho một đỉnh nhà
 * @param {number} houseNum - 1 đến 12
 * @param {string} signNameVi - Tên tiếng Việt của cung đỉnh nhà
 * @param {string} rulerNameVi - Tên tiếng Việt của hành tinh chủ quản
 * @param {string} cuspFormatted - Tọa độ đỉnh nhà (ví dụ: '03°17′')
 * @returns {object} Câu diễn giải tự động
 */
export function generateHouseExplanation(houseNum, signNameVi, rulerNameVi, cuspFormatted = '') {
    const def = HOUSE_DEFINITIONS.find(h => h.number === houseNum);
    if (!def) return null;

    const cuspText = cuspFormatted ? ` tại ${cuspFormatted}` : '';
    const explanationText = `Đỉnh Nhà ${houseNum}${cuspText} nằm ở cung ${signNameVi}. Cung ${signNameVi} do ${rulerNameVi} cai quản bản vị. Vì vậy trong câu hỏi này, ${rulerNameVi} chính là chủ tinh đại diện cho ${def.roleFormula}.`;

    return {
        houseNumber: houseNum,
        title: def.nameVi,
        shortTitle: def.nameShort,
        cuspSign: signNameVi,
        rulerPlanet: rulerNameVi,
        sentence: explanationText,
        fullMeaning: def.description,
        keyword: def.keyword
    };
}
