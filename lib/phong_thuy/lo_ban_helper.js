// ============================================================
// Thước Lỗ Ban Helper (52.2cm - 42.9cm - 38.8cm)
// Tác giả: Dịch Sư Nguyễn Huy Hoàng
// ============================================================

export const LO_BAN_522 = [
    { name: 'Quý Nhân', isGood: true,  desc: 'Gia cảnh khả quan, làm ăn phát đạt, bạn bè trung thành' },
    { name: 'Hiểm Họa', isGood: false, desc: 'Gia đạo bất an, phiêu bạt, tán tài, trôi dạt' },
    { name: 'Thiên Tai', isGood: false, desc: 'Bệnh tật, ốm đau, mất tiền của, vợ chồng bất hòa' },
    { name: 'Thiên Tài', isGood: true,  desc: 'Tài năng trời cho, may mắn đắc lợi, con cái hiếu thuận' },
    { name: 'Phúc Lộc',  isGood: true,  desc: 'Phúc ấm gia đình, sống lâu thịnh vượng, quan lộc cao' },
    { name: 'Cô Độc',   isGood: false, desc: 'Chia ly, cô quạnh, tổn hại nhân đinh' },
    { name: 'Thiên Tặc', isGood: false, desc: 'Bị trộm cắp, khẩu thiệt, kiện cáo, tù ngục' },
    { name: 'Tể Tướng',  isGood: true,  desc: 'Gia đạo hanh thông, sinh quý tử, công danh hiển đạt' }
];

export const LO_BAN_429 = [
    { name: 'Tài',   isGood: true,  desc: 'Tài đức, bảo khố, lục hợp, nghênh phúc' },
    { name: 'Bệnh',  isGood: false, desc: 'Thoát tài, công sự, lao ngục, cô quả' },
    { name: 'Ly',    isGood: false, desc: 'Trưởng khố, kiếp tài, quan quỷ, thất thoát' },
    { name: 'Nghĩa', isGood: true,  desc: 'Thiêm đinh, ích lợi, quý tử, đại cát' },
    { name: 'Quan',  isGood: true,  desc: 'Thuận khoa, hoành tài, tiến ích, phú quý' },
    { name: 'Kiếp',  isGood: false, desc: 'Tử biệt, thoái khẩu, ly hương, tài thất' },
    { name: 'Hại',   isGood: false, desc: 'Tai bệnh, tử tuyệt, khẩu thiệt, họa hoạn' },
    { name: 'Bản',   isGood: true,  desc: 'Tài chí, đăng khoa, tiến bảo, hưng vượng' }
];

export const LO_BAN_388 = [
    { name: 'Đinh',  isGood: true,  desc: 'Phúc tinh, đỗ đạt, tài vượng, đăng khoa' },
    { name: 'Hại',   isGood: false, desc: 'Khẩu thiệt, bệnh tật, tử tuyệt, tai ách' },
    { name: 'Vượng', isGood: true,  desc: 'Thiên đức, hỷ sự, tiến bảo, nạp phúc' },
    { name: 'Khổ',   isGood: false, desc: 'Mất của, quan phi, chia ly, tranh chấp' },
    { name: 'Nghĩa', isGood: true,  desc: 'Đại cát, tài lộc, quý tử, ích lợi' },
    { name: 'Quan',  isGood: true,  desc: 'Thuận khoa, phú quý, tài tiến, quan vận' },
    { name: 'Tử',    isGood: false, desc: 'Ly hương, tử biệt, tuyệt tự, thất thoát' },
    { name: 'Hưng',  isGood: true,  desc: 'Đăng khoa, quý tử, thêm đinh, hưng thịnh' },
    { name: 'Thất',  isGood: false, desc: 'Cô quả, thoái tài, công sự, ngục tù' },
    { name: 'Tài',   isGood: true,  desc: 'Nghênh phúc, thoái tài, lục hợp, đại phú' }
];

/**
 * Tra cứu kích thước Lỗ Ban theo milimet (mm)
 * @param {number} mm - Kích thước (mm)
 * @param {'522'|'429'|'388'} type - 522=Thông Thủy, 429=Dương Trạch, 388=Bàn Thờ
 */
export function checkLoBan(mm, type = '522') {
    const cm = mm / 10;
    if (type === '522') {
        const cycle = 52.2;
        const pos = cm % cycle;
        const index = Math.floor(pos / (cycle / 8)) % 8;
        const item = LO_BAN_522[index];
        return {
            cm,
            cycle,
            cung: item.name,
            isGood: item.isGood,
            color: item.isGood ? '#10b981' : '#ef4444',
            desc: item.desc,
            typeLabel: 'Thước Lỗ Ban 52.2cm (Cửa & Thông Thủy)'
        };
    } else if (type === '429') {
        const cycle = 42.9;
        const pos = cm % cycle;
        const index = Math.floor(pos / (cycle / 8)) % 8;
        const item = LO_BAN_429[index];
        return {
            cm,
            cycle,
            cung: item.name,
            isGood: item.isGood,
            color: item.isGood ? '#10b981' : '#ef4444',
            desc: item.desc,
            typeLabel: 'Thước Lỗ Ban 42.9cm (Khối Xây & Bếp/Nội Thất)'
        };
    } else {
        const cycle = 38.8;
        const pos = cm % cycle;
        const index = Math.floor(pos / (cycle / 10)) % 10;
        const item = LO_BAN_388[index];
        return {
            cm,
            cycle,
            cung: item.name,
            isGood: item.isGood,
            color: item.isGood ? '#10b981' : '#ef4444',
            desc: item.desc,
            typeLabel: 'Thước Lỗ Ban 38.8cm (Bàn Thờ & Âm Phần)'
        };
    }
}
