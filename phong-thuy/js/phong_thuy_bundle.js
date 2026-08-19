// ============================================================
// Phong Thủy & Kiến Trúc Core Bundle (Client-Side Standalone)
// Tác giả: Dịch Sư Nguyễn Huy Hoàng
// ============================================================

// --- 1. THƯỚC LỖ BAN HELPER ---
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

// --- 2. BÁT TRẠCH PHỐI MỆNH ---
export const GUA_NAMES = {
    1: 'Khảm (Thủy - Đông Tứ Mệnh)',
    2: 'Khôn (Thổ - Tây Tứ Mệnh)',
    3: 'Chấn (Mộc - Đông Tứ Mệnh)',
    4: 'Tốn (Mộc - Đông Tứ Mệnh)',
    6: 'Càn (Kim - Tây Tứ Mệnh)',
    7: 'Đoài (Kim - Tây Tứ Mệnh)',
    8: 'Cấn (Thổ - Tây Tứ Mệnh)',
    9: 'Ly (Hỏa - Đông Tứ Mệnh)'
};

export const BAT_TRACH_MAP = {
    1: {
        'Bắc': { name: 'Phục Vị', type: 'CÁT', desc: 'Bình yên, củng cố sức mạnh tinh thần, may mắn thi cử' },
        'Nam': { name: 'Diên Niên', type: 'ĐẠI CÁT', desc: 'Củng cố quan hệ gia đình, tình yêu bền vững, trường thọ' },
        'Đông': { name: 'Thiên Y', type: 'ĐẠI CÁT', desc: 'Sức khỏe dồi dào, khỏi bệnh tật, gia tăng tài lộc' },
        'Đông Nam': { name: 'Sinh Khí', type: 'ĐẠI CÁT', desc: 'Thu hút tài lộc, danh tiếng, thăng quan phát tài' },
        'Tây Bắc': { name: 'Lục Sát', type: 'HUNG', desc: 'Xáo trộn quan hệ tình cảm, thù hận, kiện tụng, tai nạn' },
        'Tây Nam': { name: 'Tuyệt Mệnh', type: 'ĐẠI HUNG', desc: 'Phá sản, bệnh tật chết người, tổn đinh' },
        'Đông Bắc': { name: 'Ngũ Quỷ', type: 'HUNG', desc: 'Mất nguồn thu nhập, thất nghiệp, cãi lộn, hỏa hoạn' },
        'Tây': { name: 'Họa Hại', type: 'HUNG', desc: 'Không may mắn, thị phi, thất bại trong công việc' }
    },
    2: {
        'Tây Nam': { name: 'Phục Vị', type: 'CÁT', desc: 'Bình yên, hòa thuận' },
        'Tây Bắc': { name: 'Diên Niên', type: 'ĐẠI CÁT', desc: 'Gia đạo êm ấm, tài lộc ổn định' },
        'Tây': { name: 'Thiên Y', type: 'ĐẠI CÁT', desc: 'Sức khỏe dồi dào, thọ trường' },
        'Đông Bắc': { name: 'Sinh Khí', type: 'ĐẠI CÁT', desc: 'Đại phú đại quý, con cháu vinh hiển' },
        'Bắc': { name: 'Tuyệt Mệnh', type: 'ĐẠI HUNG', desc: 'Đại hung sát, tổn hại sinh khí' },
        'Nam': { name: 'Lục Sát', type: 'HUNG', desc: 'Gia đạo bất an, tai tiếng' },
        'Đông': { name: 'Họa Hại', type: 'HUNG', desc: 'Hao tài tốn của, thị phi' },
        'Đông Nam': { name: 'Ngũ Quỷ', type: 'HUNG', desc: 'Bệnh tật, tiểu nhân quấy phá' }
    },
    3: {
        'Đông': { name: 'Phục Vị', type: 'CÁT', desc: 'Gia đạo yên vui, nội lực vững mạnh' },
        'Đông Nam': { name: 'Diên Niên', type: 'ĐẠI CÁT', desc: 'Hạnh phúc trọn vẹn, tài lộc dài lâu' },
        'Bắc': { name: 'Thiên Y', type: 'ĐẠI CÁT', desc: 'Quý nhân phò trợ, thân thể tráng kiện' },
        'Nam': { name: 'Sinh Khí', type: 'ĐẠI CÁT', desc: 'Tài lộc hưng vượng, công danh rực rỡ' },
        'Tây': { name: 'Tuyệt Mệnh', type: 'ĐẠI HUNG', desc: 'Bại liệt phá sản, nguy nan' },
        'Tây Bắc': { name: 'Ngũ Quỷ', type: 'HUNG', desc: 'Hao hụt tiền bạc, tai bay vạ gió' },
        'Tây Nam': { name: 'Họa Hại', type: 'HUNG', desc: 'Trắc trở thị phi, gia sự muộn phiền' },
        'Đông Bắc': { name: 'Lục Sát', type: 'HUNG', desc: 'Bất hòa tranh chấp, tình duyên lận đận' }
    },
    4: {
        'Đông Nam': { name: 'Phục Vị', type: 'CÁT', desc: 'Vững vàng, thi cử phát đạt' },
        'Đông': { name: 'Diên Niên', type: 'ĐẠI CÁT', desc: 'Hòa hợp nhân duyên, phúc đức đầy nhà' },
        'Nam': { name: 'Thiên Y', type: 'ĐẠI CÁT', desc: 'Thân tâm an lạc, tiêu trừ bệnh tật' },
        'Bắc': { name: 'Sinh Khí', type: 'ĐẠI CÁT', desc: 'Sinh sôi nảy nở, tài vận hanh thông' },
        'Đông Bắc': { name: 'Tuyệt Mệnh', type: 'ĐẠI HUNG', desc: 'Tổn hại nhân đinh, hiểm nguy' },
        'Tây Nam': { name: 'Ngũ Quỷ', type: 'HUNG', desc: 'Mất mát tài sản, thị phi khẩu thiệt' },
        'Tây Bắc': { name: 'Họa Hại', type: 'HUNG', desc: 'Hao tài, kiện tụng' },
        'Tây': { name: 'Lục Sát', type: 'HUNG', desc: 'Tai tiếng, tổn thương tình cảm' }
    },
    6: {
        'Tây Bắc': { name: 'Phục Vị', type: 'CÁT', desc: 'Quyền uy, củng cố vị thế lãnh đạo' },
        'Tây Nam': { name: 'Diên Niên', type: 'ĐẠI CÁT', desc: 'Gia đạo bền vững, phú quý trường tồn' },
        'Đông Bắc': { name: 'Thiên Y', type: 'ĐẠI CÁT', desc: 'Thần khí minh mẫn, sống lâu khỏe mạnh' },
        'Tây': { name: 'Sinh Khí', type: 'ĐẠI CÁT', desc: 'Quan lộc hanh thông, công danh tột bậc' },
        'Nam': { name: 'Tuyệt Mệnh', type: 'ĐẠI HUNG', desc: 'Đại hung hiểm, hỏa khắc kim' },
        'Đông': { name: 'Ngũ Quỷ', type: 'HUNG', desc: 'Bất an trắc trở, tai ương bất ngờ' },
        'Đông Nam': { name: 'Họa Hại', type: 'HUNG', desc: 'Hao tổn tinh lực, mưu sự bất thành' },
        'Bắc': { name: 'Lục Sát', type: 'HUNG', desc: 'Tranh chấp, phiền toái' }
    },
    7: {
        'Tây': { name: 'Phục Vị', type: 'CÁT', desc: 'An lạc, khéo léo ăn nói, tài lộc đến' },
        'Đông Bắc': { name: 'Diên Niên', type: 'ĐẠI CÁT', desc: 'Phúc thọ song toàn, vợ chồng hòa hợp' },
        'Tây Nam': { name: 'Thiên Y', type: 'ĐẠI CÁT', desc: 'Sức khỏe hưng thịnh, gặp quý nhân' },
        'Tây Bắc': { name: 'Sinh Khí', type: 'ĐẠI CÁT', desc: 'Đại phát tài lộc, thăng tiến vượt bậc' },
        'Đông': { name: 'Tuyệt Mệnh', type: 'ĐẠI HUNG', desc: 'Tuyệt tự, phá sản' },
        'Nam': { name: 'Ngũ Quỷ', type: 'HUNG', desc: 'Bệnh tật, tranh cãi' },
        'Bắc': { name: 'Họa Hại', type: 'HUNG', desc: 'Thị phi phiền muộn, tai tiếng' },
        'Đông Nam': { name: 'Lục Sát', type: 'HUNG', desc: 'Tai nạn, tổn thất tình cảm' }
    },
    8: {
        'Đông Bắc': { name: 'Phục Vị', type: 'CÁT', desc: 'Điềm tĩnh, học vấn đỗ đạt' },
        'Tây': { name: 'Diên Niên', type: 'ĐẠI CÁT', desc: 'Hòa hợp, điền sản dồi dào' },
        'Tây Bắc': { name: 'Thiên Y', type: 'ĐẠI CÁT', desc: 'Trường thọ, tiêu trừ tai ách' },
        'Tây Nam': { name: 'Sinh Khí', type: 'ĐẠI CÁT', desc: 'Phú quý vinh hoa, tiền tài như nước' },
        'Đông Nam': { name: 'Tuyệt Mệnh', type: 'ĐẠI HUNG', desc: 'Tổn hại sức khỏe, tai biến' },
        'Bắc': { name: 'Ngũ Quỷ', type: 'HUNG', desc: 'Hao hụt tài chính, quấy nhiễu' },
        'Nam': { name: 'Họa Hại', type: 'HUNG', desc: 'Thị phi, trở ngại' },
        'Đông': { name: 'Lục Sát', type: 'HUNG', desc: 'Gia đạo bất hòa, tổn thương' }
    },
    9: {
        'Nam': { name: 'Phục Vị', type: 'CÁT', desc: 'Tỏa sáng, danh tiếng vẻ vang' },
        'Bắc': { name: 'Diên Niên', type: 'ĐẠI CÁT', desc: 'Thủy Hỏa ký tế, tình cảm thắm thiết' },
        'Đông Nam': { name: 'Thiên Y', type: 'ĐẠI CÁT', desc: 'Sức khỏe sung mãn, gặp may mắn' },
        'Đông': { name: 'Sinh Khí', type: 'ĐẠI CÁT', desc: 'Mộc sinh Hỏa vượng, đại phát tài danh' },
        'Tây Bắc': { name: 'Tuyệt Mệnh', type: 'ĐẠI HUNG', desc: 'Đại họa, nguy khốn' },
        'Tây': { name: 'Ngũ Quỷ', type: 'HUNG', desc: 'Hỏa khắc Kim, hỏa hoạn sát' },
        'Đông Bắc': { name: 'Họa Hại', type: 'HUNG', desc: 'Trắc trở công danh, tổn thất' },
        'Tây Nam': { name: 'Lục Sát', type: 'HUNG', desc: 'Bất an, tranh cãi' }
    }
};

export function calculateGua(birthYear, gender = 'nam') {
    const isMale = (gender === 'nam' || gender === 1 || gender === '1');
    const sumDigits = (n) => {
        let s = 0;
        while (n > 0 || s > 9) {
            if (n === 0) { n = s; s = 0; }
            s += n % 10;
            n = Math.floor(n / 10);
        }
        return s;
    };

    const lastTwo = birthYear % 100;
    let guaNum = 1;

    if (birthYear < 2000) {
        if (isMale) {
            guaNum = (10 - sumDigits(lastTwo)) % 9;
            if (guaNum === 0) guaNum = 9;
            if (guaNum === 5) guaNum = 2;
        } else {
            guaNum = (sumDigits(lastTwo) + 5) % 9;
            if (guaNum === 0) guaNum = 9;
            if (guaNum === 5) guaNum = 8;
        }
    } else {
        if (isMale) {
            guaNum = (9 - sumDigits(lastTwo)) % 9;
            if (guaNum === 0) guaNum = 9;
            if (guaNum === 5) guaNum = 2;
        } else {
            guaNum = (sumDigits(lastTwo) + 6) % 9;
            if (guaNum === 0) guaNum = 9;
            if (guaNum === 5) guaNum = 8;
        }
    }

    const isEastGroup = [1, 3, 4, 9].includes(guaNum);
    const groupName = isEastGroup ? 'Đông Tứ Mệnh' : 'Tây Tứ Mệnh';

    return {
        guaNum,
        guaName: GUA_NAMES[guaNum],
        isEastGroup,
        groupName,
        batTrachMap: BAT_TRACH_MAP[guaNum] || {}
    };
}

// --- 3. HUYỀN KHÔNG PHI TINH ENGINE ---
export const MOUNTAINS = [
    { name: 'Nhâm', center: 345, yinYang: 1,  sanYuan: 'Địa',  palace: 1, element: 'Thủy', direction: 'Bắc' },
    { name: 'Tý',   center: 0,   yinYang: -1, sanYuan: 'Thiên', palace: 1, element: 'Thủy', direction: 'Bắc' },
    { name: 'Quý',  center: 15,  yinYang: -1, sanYuan: 'Nhân',  palace: 1, element: 'Thủy', direction: 'Bắc' },
    { name: 'Sửu',  center: 30,  yinYang: -1, sanYuan: 'Địa',  palace: 8, element: 'Thổ',  direction: 'Đông Bắc' },
    { name: 'Cấn',  center: 45,  yinYang: 1,  sanYuan: 'Thiên', palace: 8, element: 'Thổ',  direction: 'Đông Bắc' },
    { name: 'Dần',  center: 60,  yinYang: 1,  sanYuan: 'Nhân',  palace: 8, element: 'Thổ',  direction: 'Đông Bắc' },
    { name: 'Giáp', center: 75,  yinYang: 1,  sanYuan: 'Địa',  palace: 3, element: 'Mộc',  direction: 'Đông' },
    { name: 'Mão',  center: 90,  yinYang: -1, sanYuan: 'Thiên', palace: 3, element: 'Mộc',  direction: 'Đông' },
    { name: 'Ất',   center: 105, yinYang: -1, sanYuan: 'Nhân',  palace: 3, element: 'Mộc',  direction: 'Đông' },
    { name: 'Thìn', center: 120, yinYang: -1, sanYuan: 'Địa',  palace: 4, element: 'Mộc',  direction: 'Đông Nam' },
    { name: 'Tốn',  center: 135, yinYang: 1,  sanYuan: 'Thiên', palace: 4, element: 'Mộc',  direction: 'Đông Nam' },
    { name: 'Tỵ',   center: 150, yinYang: 1,  sanYuan: 'Nhân',  palace: 4, element: 'Hỏa',  direction: 'Đông Nam' },
    { name: 'Bính', center: 165, yinYang: 1,  sanYuan: 'Địa',  palace: 9, element: 'Hỏa',  direction: 'Nam' },
    { name: 'Ngọ',  center: 180, yinYang: -1, sanYuan: 'Thiên', palace: 9, element: 'Hỏa',  direction: 'Nam' },
    { name: 'Đinh', center: 195, yinYang: -1, sanYuan: 'Nhân',  palace: 9, element: 'Hỏa',  direction: 'Nam' },
    { name: 'Mùi',  center: 210, yinYang: -1, sanYuan: 'Địa',  palace: 2, element: 'Thổ',  direction: 'Tây Nam' },
    { name: 'Khôn', center: 225, yinYang: 1,  sanYuan: 'Thiên', palace: 2, element: 'Thổ',  direction: 'Tây Nam' },
    { name: 'Thân', center: 240, yinYang: 1,  sanYuan: 'Nhân',  palace: 2, element: 'Kim',  direction: 'Tây Nam' },
    { name: 'Canh', center: 255, yinYang: 1,  sanYuan: 'Địa',  palace: 7, element: 'Kim',  direction: 'Tây' },
    { name: 'Dậu',  center: 270, yinYang: -1, sanYuan: 'Thiên', palace: 7, element: 'Kim',  direction: 'Tây' },
    { name: 'Tân',  center: 285, yinYang: -1, sanYuan: 'Nhân',  palace: 7, element: 'Kim',  direction: 'Tây' },
    { name: 'Tuất', center: 300, yinYang: -1, sanYuan: 'Địa',  palace: 6, element: 'Thổ',  direction: 'Tây Bắc' },
    { name: 'Càn',  center: 315, yinYang: 1,  sanYuan: 'Thiên', palace: 6, element: 'Kim',  direction: 'Tây Bắc' },
    { name: 'Hợi',  center: 330, yinYang: 1,  sanYuan: 'Nhân',  palace: 6, element: 'Thủy', direction: 'Tây Bắc' }
];

export const PALACE_NAMES = {
    1: 'Khảm (Bắc)',
    2: 'Khôn (Tây Nam)',
    3: 'Chấn (Đông)',
    4: 'Tốn (Đông Nam)',
    5: 'Trung Cung',
    6: 'Càn (Tây Bắc)',
    7: 'Đoài (Tây)',
    8: 'Cấn (Đông Bắc)',
    9: 'Ly (Nam)'
};

export const STAR_PROPERTIES = {
    1: { name: 'Nhất Bạch Tham Lang', element: 'Thủy', nature: 'Cát Tinh', meaning: 'Văn chương, trí tuệ, tài lộc, đào hoa quý nhân' },
    2: { name: 'Nhị Hắc Cự Môn',    element: 'Thổ',  nature: 'Hung Tinh (Bệnh Phù)', meaning: 'Bệnh tật, tai ách, u sầu, tổn thất thân thể' },
    3: { name: 'Tam Bích Lộc Tồn',   element: 'Mộc',  nature: 'Hung Tinh (Si Vưu)', meaning: 'Thị phi, tranh chấp, kiện tụng, khẩu thiệt' },
    4: { name: 'Tứ Lục Văn Khúc',    element: 'Mộc',  nature: 'Cát Tinh (Văn Xương)', meaning: 'Học vấn, công danh, thi cử, nghệ thuật' },
    5: { name: 'Ngũ Hoàng Liêm Trinh', element: 'Thổ', nature: 'Đại Hung Tinh (Chính Quan Sát)', meaning: 'Đại sát, tai họa khôn lường, phá tài thương tổn' },
    6: { name: 'Lục Bạch Vũ Khúc',   element: 'Kim',  nature: 'Cát Tinh (Vũ Khúc)', meaning: 'Quyền uy, chức tước, quý nhân phò trợ' },
    7: { name: 'Thất Xích Phá Quân',  element: 'Kim',  nature: 'Bình / Hung (Tặc Đạo)', meaning: 'Trộm cắp, phá tán, phẫu thuật, khẩu thiệt thị phi' },
    8: { name: 'Bát Bạch Tả Phụ',   element: 'Thổ',  nature: 'Đại Cát Tinh', meaning: 'Điền sản, tài lộc dồi dào, phúc lộc thăng tiến' },
    9: { name: 'Cửu Tử Hữu Bật',    element: 'Hỏa',  nature: 'Đương Vận Cát Tinh (Vận 9)', meaning: 'Hỷ khánh, danh tiếng vang dội, phát đạt tức thì' }
};

export const FORWARD_PATH = [5, 6, 7, 8, 9, 1, 2, 3, 4];
export const REVERSE_PATH = [5, 4, 3, 2, 1, 9, 8, 7, 6];

export const REPLACEMENT_STAR = {
    'Tý': 1, 'Quý': 1, 'Giáp': 1, 'Thân': 1,
    'Khôn': 2, 'Nhâm': 2, 'Ất': 2, 'Mão': 2, 'Mùi': 2,
    'Tuất': 6, 'Càn': 6, 'Hợi': 6, 'Thìn': 6, 'Tốn': 6, 'Tỵ': 6,
    'Cấn': 7, 'Bính': 7, 'Tân': 7, 'Dậu': 7, 'Sửu': 7,
    'Dần': 9, 'Ngọ': 9, 'Canh': 9, 'Đinh': 9
};

export function wrapStar(n) {
    return ((n - 1) % 9 + 9) % 9 + 1;
}

export function degreeDiff(a, b) {
    let diff = Math.abs(a - b);
    if (diff > 180) diff = 360 - diff;
    return diff;
}

export function getVan(year) {
    const cycleYear = ((year - 1864) % 180 + 180) % 180;
    return Math.floor(cycleYear / 20) + 1;
}

export function findMountain(degree) {
    degree = ((degree % 360) + 360) % 360;
    let best = null;
    let bestDiff = 999;
    for (const m of MOUNTAINS) {
        const diff = degreeDiff(degree, m.center);
        if (diff < bestDiff) {
            bestDiff = diff;
            best = m;
        }
    }
    return { mountain: best, deviation: bestDiff };
}

export function getOppositeMountain(degree) {
    let opp = (degree + 180) % 360;
    return findMountain(opp);
}

export function classifyChart(deviation) {
    if (deviation <= 3.0) return { type: 'HA_QUAI', label: 'Hạ Quái (Chính Hướng)', isKhongVong: false };
    if (deviation <= 6.0) return { type: 'THE_QUAI', label: 'Thế Quái (Kiêm Hướng)', isKhongVong: false };
    return { type: 'KHONG_VONG', label: 'Phạm Tuyến Không Vong', isKhongVong: true };
}

export function findMountainInPalace(palace, sanYuan) {
    return MOUNTAINS.find(m => m.palace === palace && m.sanYuan === sanYuan);
}

export function buildVanBan(vanNumber) {
    const chart = {};
    for (let i = 0; i < 9; i++) {
        const palace = FORWARD_PATH[i];
        chart[palace] = wrapStar(vanNumber + i);
    }
    return chart;
}

export function buildStarBan(startStar, isForward) {
    const path = isForward ? FORWARD_PATH : REVERSE_PATH;
    const chart = {};
    for (let i = 0; i < 9; i++) {
        const palace = path[i];
        chart[palace] = wrapStar(startStar + i);
    }
    return chart;
}

export function getDirection(star, sanYuan, originalMountain) {
    if (star === 5) {
        return originalMountain.yinYang === 1;
    }
    const refMountain = findMountainInPalace(star, sanYuan);
    if (!refMountain) return true;
    return refMountain.yinYang === 1;
}

export function getAnnualStar(year) {
    const remainder = (year - 4) % 9;
    const star = wrapStar(11 - remainder);
    return star;
}

export function getMonthlyStar(solarYear, solarMonth) {
    const yearZhi = (solarYear - 4) % 12;
    let startStar = 8;
    if ([0, 3, 6, 9].includes(yearZhi)) startStar = 8;
    else if ([1, 4, 7, 10].includes(yearZhi)) startStar = 5;
    else startStar = 2;

    const monthOffset = (solarMonth - 1);
    const star = wrapStar(startStar - monthOffset);
    return star;
}

export function calculateFlyingStars({
    facingDegree = 180,
    buildYear = 2025,
    currentYear = 2026,
    currentMonth = 2,
    currentDay = 1,
    currentHour = 12
}) {
    const van = getVan(buildYear);
    const facingMatch = findMountain(facingDegree);
    const facingMountain = facingMatch.mountain;
    const deviation = facingMatch.deviation;
    const chartClassification = classifyChart(deviation);

    const sittingDegree = (facingDegree + 180) % 360;
    const sittingMountain = getOppositeMountain(facingDegree).mountain;

    const vanBan = buildVanBan(van);

    const sittingPalace = sittingMountain.palace;
    const facingPalace = facingMountain.palace;

    const rawSittingStar = vanBan[sittingPalace];
    const rawFacingStar = vanBan[facingPalace];

    let sittingStar = rawSittingStar;
    let facingStar = rawFacingStar;
    let isSittingForward = true;
    let isFacingForward = true;

    if (chartClassification.type === 'HA_QUAI' || chartClassification.type === 'KHONG_VONG') {
        isSittingForward = getDirection(rawSittingStar, sittingMountain.sanYuan, sittingMountain);
        isFacingForward = getDirection(rawFacingStar, facingMountain.sanYuan, facingMountain);
    } else {
        const repSitting = REPLACEMENT_STAR[sittingMountain.name] || rawSittingStar;
        const repFacing = REPLACEMENT_STAR[facingMountain.name] || rawFacingStar;
        sittingStar = repSitting;
        facingStar = repFacing;
        isSittingForward = getDirection(rawSittingStar, sittingMountain.sanYuan, sittingMountain);
        isFacingForward = getDirection(rawFacingStar, facingMountain.sanYuan, facingMountain);
    }

    const sonBan = buildStarBan(sittingStar, isSittingForward);
    const huongBan = buildStarBan(facingStar, isFacingForward);

    const annualCenter = getAnnualStar(currentYear);
    const monthlyCenter = getMonthlyStar(currentYear, currentMonth);

    const nienBan = buildStarBan(annualCenter, true);
    const nguyetBan = buildStarBan(monthlyCenter, true);

    const palacesData = {};
    for (let p = 1; p <= 9; p++) {
        const vStar = vanBan[p];
        const sStar = sonBan[p];
        const hStar = huongBan[p];
        const nStar = nienBan[p];
        const mStar = nguyetBan[p];

        const isSittingPalace = (p === sittingPalace);
        const isFacingPalace = (p === facingPalace);

        const analysis = evaluateStarPair(sStar, hStar, vStar, van);

        palacesData[p] = {
            palaceId: p,
            palaceName: PALACE_NAMES[p],
            direction: MOUNTAINS.find(m => m.palace === p)?.direction || 'Trung Cung',
            vanStar: vStar,
            sonStar: sStar,
            huongStar: hStar,
            nienStar: nStar,
            nguyetStar: mStar,
            isSitting: isSittingPalace,
            isFacing: isFacingPalace,
            analysis: analysis
        };
    }

    const cachCuc = evaluateCachCuc(palacesData, sittingPalace, facingPalace, van);

    return {
        van,
        buildYear,
        currentYear,
        currentMonth,
        facingDegree,
        sittingDegree,
        facingMountain: facingMountain.name,
        sittingMountain: sittingMountain.name,
        sanYuan: facingMountain.sanYuan,
        deviation: Math.round(deviation * 10) / 10,
        chartType: chartClassification.type,
        chartTypeLabel: chartClassification.label,
        isKhongVong: chartClassification.isKhongVong,
        isSittingForward,
        isFacingForward,
        palaces: palacesData,
        cachCuc
    };
}

function evaluateCachCuc(palaces, sittingPalace, facingPalace, currentVan) {
    const sitSonStar = palaces[sittingPalace].sonStar;
    const faceHuongStar = palaces[facingPalace].huongStar;
    const sitHuongStar = palaces[sittingPalace].huongStar;
    const faceSonStar = palaces[facingPalace].sonStar;

    if (sitSonStar === currentVan && faceHuongStar === currentVan) {
        return {
            name: 'VƯỢNG SƠN VƯỢNG HƯỚNG',
            level: 'ĐẠI CÁT',
            summary: 'Đinh tài lưỡng vượng, người nhà khỏe mạnh, nhân tài xuất chúng, tiền tài thịnh vượng bền vững.',
            recommendation: 'Phía sau nhà cần có chỗ tựa vững chắc, phía trước nhà cần có không gian thoáng rộng đón tài lộc.'
        };
    } else if (faceSonStar === currentVan && faceHuongStar === currentVan) {
        return {
            name: 'SONG TINH ĐÁO HƯỚNG',
            level: 'CÁT VỀ TÀI LỘC',
            summary: 'Vượng tài nhưng tổn đinh. Kinh doanh buôn bán cực phát đạt nhưng cần chú ý sức khỏe.',
            recommendation: 'Phía trước cửa cần minh đường thoáng đãng có nước, vừa có vật nâng đỡ để bổ trợ nhân đinh.'
        };
    } else if (sitSonStar === currentVan && sitHuongStar === currentVan) {
        return {
            name: 'SONG TINH ĐÁO TỌA',
            level: 'CÁT VỀ NHÂN ĐINH',
            summary: 'Vượng đinh nhưng tổn tài. Gia đạo yên ấm hòa thuận nhưng tiền bạc dễ bị chậm sinh lợi.',
            recommendation: 'Phía sau nhà cần có chỗ tựa cao ráo và nên mở giếng trời phía sau để kích hoạt tài lộc.'
        };
    } else if (sitHuongStar === currentVan && faceSonStar === currentVan) {
        return {
            name: 'THƯỢNG SƠN HẠ THỦY',
            level: 'ĐẠI HUNG CÁCH',
            summary: 'Tổn đinh thoái tài, bệnh tật triền miên, tài lộc hao tán nặng nề.',
            recommendation: 'Bố trí đảo khí: Phía sau nhà làm không gian thoáng, phía trước đặt bình phong chắn sát khí.'
        };
    }

    return {
        name: 'CÁCH CỤC BÌNH HÒA',
        level: 'TRUNG BÌNH',
        summary: 'Các cung vị vận hành ổn định, cần dựa vào sự phối hợp các phòng chức năng để tối ưu cát khí.',
        recommendation: 'Bố trí phòng khách, cửa chính, bếp và phòng ngủ vào các cung có Cát Tinh đương vận.'
    };
}

function evaluateStarPair(sStar, hStar, vStar, currentVan) {
    const pairKey = `${Math.min(sStar, hStar)}-${Math.max(sStar, hStar)}`;

    const specialCombos = {
        '1-4': { title: 'Tứ Lục Khảm Thủy — Văn Xương', grade: 'CÁT', desc: 'Chủ về học hành đỗ đạt, thi cử công danh, trí tuệ mẫn tiệp, phát về nghệ thuật & danh tiếng.' },
        '1-6': { title: 'Thiên Địa Giao Thái — Quan Lộc', grade: 'CÁT', desc: 'Chủ về quyền thế, chức tước cao, quý nhân phù trợ, mưu sự đại thành.' },
        '6-8': { title: 'Vũ Khúc Tả Phụ — Phú Quý', grade: 'ĐẠI CÁT', desc: 'Kim Thổ tương sinh, điền sản hưng vượng, tài vận dồi dào, gia nghiệp bền vững.' },
        '8-9': { title: 'Cửu Tử Bát Bạch — Hỷ Khánh', grade: 'ĐẠI CÁT', desc: 'Hỏa Thổ tương sinh, gia đạo hỷ sự trùng phùng, tiền tài phát đạt mau chóng.' },
        '2-5': { title: 'Nhị Hắc Ngũ Hoàng — Nhị Ngũ Giao Gia', grade: 'ĐẠI HUNG', desc: 'Đại sát tinh hội tụ. Chủ về bệnh tật tai ách. Không nên mở cửa chính, bếp hay phòng ngủ tại đây.' },
        '3-7': { title: 'Tam Bích Thất Xích — Xuyên Tâm Sát', grade: 'HUNG', desc: 'Mộc Kim giao chiến, dễ bị trộm cắp, tranh chấp pháp lý kiện tụng.' },
        '7-9': { title: 'Cửu Thất Hợp Sát — Hồi Lộc Chi Tai', grade: 'HUNG', desc: 'Hỏa khắc Kim, cẩn phòng hỏa hoạn sát khí, bệnh tim mạch hoặc phụ nữ trong nhà bất hòa.' },
        '2-3': { title: 'Đấu Ngưu Sát — Thị Phi Khẩu Thiệt', grade: 'HUNG', desc: 'Mộc khắc Thổ, tranh cãi bất hòa, gia đạo không yên.' }
    };

    const found = specialCombos[pairKey];
    if (found) return found;

    if (hStar === 9 || hStar === 8 || hStar === 1) {
        return {
            title: `Cát Tinh Tụ Khí (${sStar}-${hStar})`,
            grade: 'CÁT',
            desc: `Hướng Tinh ${hStar} là cát tinh mang lại sinh khí và tài lộc tốt cho cung vị này.`
        };
    }

    if (hStar === 5 || hStar === 2) {
        return {
            title: `Sát Tinh Cần Hóa Giải (${sStar}-${hStar})`,
            grade: 'HUNG',
            desc: `Cung vị gặp Hướng Tinh ${hStar}. Nên dùng vật phẩm hành Kim (hồ lô đồng, chuông gió) để tiết khí Thổ hung.`
        };
    }

    return {
        title: `Phối Hợp Tinh Tú (${sStar}-${hStar})`,
        grade: 'BÌNH',
        desc: `Cung vị có năng lượng cân bằng, giữ gìn sạch sẽ thoáng mát để duy trì sinh khí tự nhiên.`
    };
}

// --- 4. ARCHITECTURAL FLOORPLAN GENERATOR ---
export function generateArchitecturalPlan({
    mode = 'empty_land',
    widthM = 5.0,
    lengthM = 16.0,
    floors = 2,
    facingDegree = 180,
    flyingStarsData = null,
    batTrachData = null,
    existingRooms = []
}) {
    const W = Math.max(3.0, Math.min(30.0, parseFloat(widthM) || 5.0));
    const L = Math.max(6.0, Math.min(60.0, parseFloat(lengthM) || 16.0));
    const totalFloors = (mode === 'existing_house') ? 1 : Math.max(1, Math.min(7, parseInt(floors) || 2));

    const plansByFloor = [];

    for (let f = 1; f <= totalFloors; f++) {
        let floorName = 'Tầng Trệt';
        if (f > 1 && f < totalFloors) {
            floorName = `Lầu ${f - 1} (Tầng ${f})`;
        } else if (f === totalFloors && totalFloors > 1) {
            floorName = `Tầng Thượng (Lầu ${f - 1})`;
        }

        if (mode === 'existing_house') {
            floorName = 'Hiện Trạng Nhà Đang Có';
        }

        const floorPlan = generateSingleFloor({
            floorIndex: f,
            totalFloors,
            floorName,
            W,
            L,
            facingDegree,
            flyingStarsData,
            batTrachData,
            mode,
            existingRooms
        });

        plansByFloor.push(floorPlan);
    }

    return {
        widthM: W,
        lengthM: L,
        totalFloors,
        totalAreaM2: Math.round(W * L * totalFloors * 10) / 10,
        plansByFloor
    };
}

function generateSingleFloor({
    floorIndex,
    totalFloors,
    floorName,
    W,
    L,
    facingDegree,
    flyingStarsData,
    batTrachData,
    mode,
    existingRooms = []
}) {
    const walls = [];
    const doors = [];
    const windows = [];
    const furniture = [];
    const rooms = [];
    const dimensions = [];

    const outerT = 0.22;
    const innerT = 0.11;

    const frontYardL = (floorIndex === 1 && L >= 12 && mode !== 'existing_house') ? Math.min(3.0, L * 0.15) : 0;
    const backYardL = (floorIndex === 1 && L >= 14 && mode !== 'existing_house') ? Math.min(2.0, L * 0.10) : 0;
    const houseL = L - frontYardL - backYardL;

    const houseYStart = frontYardL;
    const houseYEnd = frontYardL + houseL;

    // Outer perimeter walls
    walls.push({ x1: 0, y1: houseYStart, x2: W, y2: houseYStart, thickness: outerT, type: 'outer' });
    walls.push({ x1: 0, y1: houseYEnd, x2: W, y2: houseYEnd, thickness: outerT, type: 'outer' });
    walls.push({ x1: 0, y1: houseYStart, x2: 0, y2: houseYEnd, thickness: outerT, type: 'outer' });
    walls.push({ x1: W, y1: houseYStart, x2: W, y2: houseYEnd, thickness: outerT, type: 'outer' });

    if (mode === 'existing_house') {
        // --- CHẾ ĐỘ HIỆN TRẠNG NHÀ SẴN CÓ ---
        const livingL = houseL * 0.35;
        const middleL = houseL * 0.30;
        const backL = houseL - livingL - middleL;

        const y1 = houseYStart + livingL;
        const y2 = y1 + middleL;

        walls.push({ x1: 0, y1: y1, x2: W, y2: y1, thickness: innerT, type: 'partition' });
        walls.push({ x1: 0, y1: y2, x2: W, y2: y2, thickness: innerT, type: 'partition' });

        // Cửa chính
        if (existingRooms.includes('main_door')) {
            const mainDoorW = Math.min(2.8, W * 0.5);
            doors.push({
                x: (W - mainDoorW) / 2, y: houseYStart, w: mainDoorW, h: outerT,
                type: 'main_door', label: `Cửa Chính (${mainDoorW.toFixed(1)}m)`,
                isGood: true
            });
        }

        // Phòng Khách
        if (existingRooms.includes('living_room')) {
            rooms.push({
                name: 'Phòng Khách Hiện Trạng',
                areaM2: Math.round(W * livingL * 10) / 10,
                x: 0, y: houseYStart, w: W, h: livingL,
                zone: 'Khu Vực Tiền Trạch',
                fengShuiNote: 'Khảo sát dòng khí nạp từ cửa chính vào phòng khách.'
            });
            furniture.push({ type: 'sofa', x: 0.5, y: houseYStart + 0.8, w: Math.min(2.4, W * 0.5), h: 0.9, label: 'Sofa' });
        }

        // Bàn thờ
        if (existingRooms.includes('altar')) {
            const altarW = 1.53;
            furniture.push({
                type: 'altar_table', x: (W - altarW) / 2, y: houseYStart + 0.3, w: altarW, h: 0.8,
                label: 'Bàn Thờ Hiện Trạng', isGood: true
            });
        }

        // Cầu thang & Giếng trời
        if (existingRooms.includes('stairs')) {
            furniture.push({
                type: 'stairs', x: 0.3, y: y1 + 0.3, w: Math.min(2.2, W * 0.45), h: middleL - 0.6,
                steps: 21, label: 'Cầu Thang'
            });
        }

        // Phòng ngủ
        if (existingRooms.includes('master_bed')) {
            rooms.push({
                name: 'Phòng Ngủ Hiện Trạng',
                areaM2: Math.round(W * 0.55 * middleL * 10) / 10,
                x: W * 0.45, y: y1, w: W * 0.55, h: middleL,
                zone: 'Khu Trung Trạch',
                fengShuiNote: 'Khảo sát vị trí đầu giường và cung vị tọa sao.'
            });
            furniture.push({ type: 'bed_master', x: W * 0.45 + 0.4, y: y1 + 0.5, w: 1.8, h: 2.0, label: 'Giường Ngủ' });
        }

        // Bếp
        if (existingRooms.includes('kitchen')) {
            rooms.push({
                name: 'Bếp Nấu Hiện Trạng',
                areaM2: Math.round(W * 0.6 * backL * 10) / 10,
                x: 0, y: y2, w: W * 0.6, h: backL,
                zone: 'Khu Hậu Trạch',
                fengShuiNote: 'Khảo sát bếp tọa hung hướng cát và thế tương xung thủy hỏa.'
            });
            furniture.push({ type: 'kitchen_counter', x: 0.4, y: houseYEnd - 0.7, w: Math.min(3.0, W * 0.5), h: 0.6, label: 'Bếp Nấu' });
        }

        // Toilet
        if (existingRooms.includes('toilet')) {
            const wcW = Math.min(1.8, W * 0.38);
            walls.push({ x1: W - wcW, y1: y2, x2: W - wcW, y2: houseYEnd, thickness: innerT, type: 'partition' });
            rooms.push({
                name: 'WC Hiện Trạng',
                areaM2: Math.round(wcW * backL * 10) / 10,
                x: W - wcW, y: y2, w: wcW, h: backL,
                zone: 'Vệ Sinh',
                fengShuiNote: 'Khảo sát điểm uế khí để đặt phương án áp sát hóa giải.'
            });
            furniture.push({ type: 'toilet_bowl', x: W - 0.8, y: y2 + 0.5, w: 0.5, h: 0.7, label: 'Bồn Cầu' });
        }

    } else if (floorIndex === 1) {
        // --- TẦNG TRỆT (ĐẤT TRỐNG) ---
        const livingRoomL = Math.max(4.0, houseL * 0.35);
        const stairL = Math.max(2.5, Math.min(3.5, houseL * 0.22));
        const kitchenL = houseL - livingRoomL - stairL;

        const yLivingEnd = houseYStart + livingRoomL;
        const yStairEnd = yLivingEnd + stairL;
        const yKitchenEnd = houseYEnd;

        walls.push({ x1: 0, y1: yLivingEnd, x2: W * 0.6, y2: yLivingEnd, thickness: innerT, type: 'partition' });
        walls.push({ x1: 0, y1: yStairEnd, x2: W, y2: yStairEnd, thickness: innerT, type: 'partition' });

        rooms.push({
            name: 'Phòng Khách',
            areaM2: Math.round(W * livingRoomL * 10) / 10,
            x: 0, y: houseYStart, w: W, h: livingRoomL,
            zone: 'Tiền Minh Đường',
            fengShuiNote: 'Khu vực nạp khí sinh tài, đón Cát Tinh đương vận từ hướng chính.'
        });

        const mainDoorW = W >= 5.0 ? 2.8 : 2.15;
        const loBanDoor = checkLoBan(mainDoorW * 1000, '522');
        doors.push({
            x: (W - mainDoorW) / 2, y: houseYStart, w: mainDoorW, h: outerT,
            type: 'main_door', label: `Cửa Chính (${mainDoorW}m - Cung ${loBanDoor.cung})`,
            isGood: loBanDoor.isGood
        });

        furniture.push({ type: 'sofa', x: 0.5, y: houseYStart + 1.0, w: Math.min(2.6, W * 0.5), h: 0.9, label: 'Sofa' });
        furniture.push({ type: 'tv_cabinet', x: W - 0.7, y: houseYStart + 1.0, w: 0.5, h: 2.0, label: 'Kệ TV' });

        const stairW = Math.min(2.4, W * 0.45);
        furniture.push({
            type: 'stairs', x: 0.3, y: yLivingEnd + 0.3, w: stairW, h: stairL - 0.6,
            steps: 21, label: 'Cầu Thang (21 Bậc - Cung Sinh)'
        });
        furniture.push({
            type: 'skylight', x: W - 1.8, y: yLivingEnd + 0.4, w: 1.5, h: stairL - 0.8,
            label: 'Giếng Trời (Hút Gió & Ánh Sáng)'
        });

        const wcW = Math.min(1.8, W * 0.38);
        const wcL = Math.min(2.2, kitchenL * 0.4);
        walls.push({ x1: W - wcW, y1: yStairEnd, x2: W - wcW, y2: yStairEnd + wcL, thickness: innerT, type: 'partition' });
        walls.push({ x1: W - wcW, y1: yStairEnd + wcL, x2: W, y2: yStairEnd + wcL, thickness: innerT, type: 'partition' });

        rooms.push({
            name: 'WC Trệt',
            areaM2: Math.round(wcW * wcL * 10) / 10,
            x: W - wcW, y: yStairEnd, w: wcW, h: wcL,
            zone: 'Khu Phụ Trợ',
            fengShuiNote: 'Tọa Hung áp sát, giữ uế khí không phát tán ra phòng khách.'
        });
        furniture.push({ type: 'toilet_bowl', x: W - 0.8, y: yStairEnd + 0.4, w: 0.5, h: 0.7, label: 'Bồn Cầu' });
        furniture.push({ type: 'lavabo', x: W - 1.5, y: yStairEnd + 0.4, w: 0.5, h: 0.5, label: 'Lavabo' });

        const kitchenActualL = kitchenL;
        rooms.push({
            name: 'Bếp & Phòng Ăn',
            areaM2: Math.round((W * kitchenActualL - wcW * wcL) * 10) / 10,
            x: 0, y: yStairEnd, w: W - wcW, h: kitchenActualL,
            zone: 'Hậu Trạch',
            fengShuiNote: 'Bếp Tọa Hung Hướng Cát, điểm tụ hỏa nuôi dưỡng sinh lực cho gia quyến.'
        });
        furniture.push({ type: 'kitchen_counter', x: 0.4, y: yKitchenEnd - 0.7, w: Math.min(3.5, W * 0.6), h: 0.6, label: 'Bếp Nấu & Bồn Rửa' });
        furniture.push({ type: 'dining_table', x: 1.2, y: yStairEnd + 1.2, w: 1.6, h: 0.9, label: 'Bàn Ăn 6 Ghế' });

        if (backYardL > 0) {
            doors.push({ x: W * 0.5, y: houseYEnd, w: 0.9, h: outerT, type: 'back_door', label: 'Cửa Sân Sau' });
        }

    } else if (floorIndex < totalFloors || totalFloors === 1) {
        // --- CÁC TẦNG LẦU PHÒNG NGỦ ---
        const masterBedL = Math.max(4.2, houseL * 0.38);
        const stairL = Math.max(2.5, Math.min(3.5, houseL * 0.22));
        const secondBedL = houseL - masterBedL - stairL;

        const yMasterEnd = houseYStart + masterBedL;
        const yStairEnd = yMasterEnd + stairL;

        walls.push({ x1: 0, y1: yMasterEnd, x2: W, y2: yMasterEnd, thickness: innerT, type: 'partition' });
        walls.push({ x1: 0, y1: yStairEnd, x2: W, y2: yStairEnd, thickness: innerT, type: 'partition' });

        const balconyL = 1.2;
        walls.push({ x1: 0, y1: houseYStart - balconyL, x2: W, y2: houseYStart - balconyL, thickness: innerT, type: 'railing' });
        walls.push({ x1: 0, y1: houseYStart - balconyL, x2: 0, y2: houseYStart, thickness: innerT, type: 'railing' });
        walls.push({ x1: W, y1: houseYStart - balconyL, x2: W, y2: houseYStart, thickness: innerT, type: 'railing' });

        rooms.push({
            name: `Phòng Ngủ Master ${floorIndex - 1}`,
            areaM2: Math.round(W * masterBedL * 10) / 10,
            x: 0, y: houseYStart, w: W, h: masterBedL,
            zone: 'Cung Vượng Đinh',
            fengShuiNote: 'Tọa cung Sơn Tinh cát lợi, tăng cường sức khỏe, hạnh phúc vợ chồng.'
        });
        furniture.push({ type: 'bed_master', x: 0.8, y: houseYStart + 1.2, w: 1.8, h: 2.0, label: 'Giường 1.8x2.0m' });
        furniture.push({ type: 'wardrobe', x: W - 0.7, y: houseYStart + 0.8, w: 0.6, h: 2.2, label: 'Tủ Quần Áo' });

        doors.push({ x: W * 0.5 - 0.6, y: houseYStart, w: 1.2, h: outerT, type: 'balcony_door', label: 'Cửa Ban Công' });

        furniture.push({ type: 'stairs', x: 0.3, y: yMasterEnd + 0.3, w: Math.min(2.4, W * 0.45), h: stairL - 0.6, label: 'Cầu Thang Lầu' });

        const wcW = Math.min(2.0, W * 0.4);
        const wcL = stairL;
        walls.push({ x1: W - wcW, y1: yMasterEnd, x2: W - wcW, y2: yMasterEnd + wcL, thickness: innerT, type: 'partition' });

        rooms.push({
            name: `WC Tầng ${floorIndex}`,
            areaM2: Math.round(wcW * wcL * 10) / 10,
            x: W - wcW, y: yMasterEnd, w: wcW, h: wcL,
            zone: 'Vệ Sinh Khép Kín',
            fengShuiNote: 'Hệ thống cấp thoát nước tiêu chuẩn, có quạt thông gió khử mùi.'
        });
        furniture.push({ type: 'toilet_bowl', x: W - 0.8, y: yMasterEnd + 1.5, w: 0.5, h: 0.7, label: 'Bồn Cầu' });
        furniture.push({ type: 'lavabo', x: W - 1.7, y: yMasterEnd + 1.5, w: 0.5, h: 0.5, label: 'Lavabo' });

        rooms.push({
            name: `Phòng Ngủ 2 (Tầng ${floorIndex})`,
            areaM2: Math.round(W * secondBedL * 10) / 10,
            x: 0, y: yStairEnd, w: W, h: secondBedL,
            zone: 'Cung Văn Xương',
            fengShuiNote: 'Không gian yên tĩnh, thông thoáng, đón ánh sáng tự nhiên.'
        });
        furniture.push({ type: 'bed_single', x: 0.8, y: yStairEnd + 0.8, w: 1.4, h: 2.0, label: 'Giường 1.4x2.0m' });
        windows.push({ x: W * 0.5 - 0.7, y: houseYEnd, w: 1.4, h: outerT, label: 'Cửa Sổ Lấy Sáng' });

    } else {
        // --- TẦNG THƯỢNG ---
        const altarRoomL = Math.max(3.5, houseL * 0.35);
        const stairL = Math.max(2.5, Math.min(3.5, houseL * 0.25));
        const terraceBackL = houseL - altarRoomL - stairL;

        const yAltarEnd = houseYStart + altarRoomL;
        const yStairEnd = yAltarEnd + stairL;

        walls.push({ x1: 0, y1: yAltarEnd, x2: W, y2: yAltarEnd, thickness: innerT, type: 'partition' });

        rooms.push({
            name: 'Phòng Thờ Gia Tiên',
            areaM2: Math.round(W * altarRoomL * 10) / 10,
            x: 0, y: houseYStart, w: W, h: altarRoomL,
            zone: 'Tối Thượng Tôn Nghiêm',
            fengShuiNote: 'Tọa Cát Hướng Cát, tụ linh khí tổ tiên phù hộ độ trì cho con cháu.'
        });

        const altarW = 1.53;
        const loBanAltar = checkLoBan(altarW * 1000, '388');
        furniture.push({
            type: 'altar_table', x: (W - altarW) / 2, y: houseYStart + 0.5, w: altarW, h: 0.8,
            label: `Bàn Thờ (${altarW}m - Cung ${loBanAltar.cung})`,
            isGood: loBanAltar.isGood
        });

        furniture.push({ type: 'stairs', x: 0.3, y: yAltarEnd + 0.3, w: Math.min(2.4, W * 0.45), h: stairL - 0.6, label: 'Cầu Thang Tầng Thượng' });

        rooms.push({
            name: 'Sân Phơi & Giặt Phía Sau',
            areaM2: Math.round(W * terraceBackL * 10) / 10,
            x: 0, y: yStairEnd, w: W, h: terraceBackL,
            zone: 'Sân Thượng Hậu',
            fengShuiNote: 'Không gian phơi phóng, giặt giũ và bồn nước kỹ thuật.'
        });
        furniture.push({ type: 'washing_machine', x: W - 1.0, y: yStairEnd + 0.5, w: 0.7, h: 0.7, label: 'Máy Giặt' });
    }

    dimensions.push({ x1: 0, y1: houseYStart, x2: W, y2: houseYStart, text: `Ngang ${W}m`, loban: checkLoBan(W * 1000, '429') });
    dimensions.push({ x1: W, y1: houseYStart, x2: W, y2: houseYEnd, text: `Dài ${houseL}m`, loban: checkLoBan(houseL * 1000, '429') });

    return {
        floorIndex,
        floorName,
        walls,
        doors,
        windows,
        furniture,
        rooms,
        dimensions
    };
}
