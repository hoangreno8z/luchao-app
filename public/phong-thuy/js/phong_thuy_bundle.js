// ============================================================
// Phong Thủy & Kiến Trúc Core Bundle (Client-Side Standalone)
// Hỗ Trợ 9 Cung Toàn Diện & Loan Đầu Phối Hợp Lý Khí
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

// Ánh xạ 9 Cung vào lưới Ma trận tọa độ 3x3: [row, col] (0..2)
export const PALACE_GRID_POS = {
    4: { r: 0, c: 0, name: 'Đông Nam (Tốn)' },
    9: { r: 0, c: 1, name: 'Nam (Ly)' },
    2: { r: 0, c: 2, name: 'Tây Nam (Khôn)' },
    3: { r: 1, c: 0, name: 'Đông (Chấn)' },
    5: { r: 1, c: 1, name: 'Trung Cung' },
    7: { r: 1, c: 2, name: 'Tây (Đoài)' },
    8: { r: 2, c: 0, name: 'Đông Bắc (Cấn)' },
    1: { r: 2, c: 1, name: 'Bắc (Khảm)' },
    6: { r: 2, c: 2, name: 'Tây Bắc (Càn)' }
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
    return { type: 'KHONG_VONG', label: 'Phạm Tuyến Không Vong (Đại Hung)', isKhongVong: true };
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
    currentHour = 12,
    frontLandscape = 'duong_lo',
    backLandscape = 'nha_cao'
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

    const cachCuc = evaluateCachCuc(palacesData, sittingPalace, facingPalace, van, frontLandscape, backLandscape);

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
        cachCuc,
        frontLandscape,
        backLandscape
    };
}

function evaluateCachCuc(palaces, sittingPalace, facingPalace, currentVan, frontLandscape, backLandscape) {
    const sitSonStar = palaces[sittingPalace].sonStar;
    const faceHuongStar = palaces[facingPalace].huongStar;
    const sitHuongStar = palaces[sittingPalace].huongStar;
    const faceSonStar = palaces[facingPalace].sonStar;

    let loanDauNote = '';
    if (frontLandscape === 'song_ho') loanDauNote += ' Phía trước có thủy tụ (sông/hồ) giúp dẫn vượng khí đắc tài.';
    else if (frontLandscape === 'nga_ba') loanDauNote += ' Phía trước có ngã ba/ngã tư giao lộ đón dòng khí động tài vận nhanh.';
    if (backLandscape === 'nha_cao') loanDauNote += ' Phía sau có nhà cao tựa sơn vững chắc, bảo vệ nhân đinh và sức khỏe.';
    else if (backLandscape === 'thoat_thuy') loanDauNote += ' Phía sau có dòng nước thoát/trũng cần chắn tường cao hoặc trồng cây hóa giải thoát khí.';

    if (sitSonStar === currentVan && faceHuongStar === currentVan) {
        return {
            name: 'VƯỢNG SƠN VƯỢNG HƯỚNG (ĐÁO SƠN ĐÁO HƯỚNG)',
            level: 'ĐẠI CÁT',
            summary: 'Đinh tài lưỡng vượng, người nhà khỏe mạnh, nhân tài xuất chúng, tiền tài thịnh vượng bền vững.' + loanDauNote,
            recommendation: 'Phía sau nhà cần có chỗ tựa vững chắc (núi/nhà cao), phía trước mở cửa đón minh đường thoáng có nước tụ tài lộc.'
        };
    } else if (faceSonStar === currentVan && faceHuongStar === currentVan) {
        return {
            name: 'SONG TINH ĐÁO HƯỚNG',
            level: 'CÁT VỀ TÀI LỘC',
            summary: 'Vượng tài nhưng tổn đinh. Kinh doanh buôn bán cực phát đạt nhưng cần chú ý sức khỏe.' + loanDauNote,
            recommendation: 'Phía trước cửa cần vừa có Minh đường thoáng đãng có nước, vừa có vật nâng đỡ (hòn non bộ, cây xanh) để bổ trợ nhân đinh.'
        };
    } else if (sitSonStar === currentVan && sitHuongStar === currentVan) {
        return {
            name: 'SONG TINH ĐÁO TỌA',
            level: 'CÁT VỀ NHÂN ĐINH',
            summary: 'Vượng đinh nhưng tổn tài. Gia đạo yên ấm hòa thuận nhưng tiền bạc dễ bị chậm sinh lợi.' + loanDauNote,
            recommendation: 'Phía sau nhà cần có chỗ tựa cao ráo và nên mở giếng trời hoặc đặt phong thủy luân phía sau để kích hoạt tài lộc.'
        };
    } else if (sitHuongStar === currentVan && faceSonStar === currentVan) {
        return {
            name: 'THƯỢNG SƠN HẠ THỦY',
            level: 'ĐẠI HUNG CÁCH',
            summary: 'Tổn đinh thoái tài, bệnh tật triền miên, tài lộc hao tán nặng nề.' + loanDauNote,
            recommendation: 'Cần bố trí Đảo Khí: Phía sau làm không gian thoáng có nước, phía trước đặt bình phong hoặc non bộ chắn sát khí.'
        };
    }

    return {
        name: 'CÁCH CỤC BÌNH HÒA',
        level: 'TRUNG BÌNH',
        summary: 'Các cung vị vận hành ổn định, cần dựa vào sự phối hợp các phòng chức năng để tối ưu cát khí.' + loanDauNote,
        recommendation: 'Bố trí phòng khách, cửa chính, bếp và phòng ngủ vào các cung có Cát Tinh đương vận để kích tài nạp phúc.'
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

// --- 4. ARCHITECTURAL FLOORPLAN GENERATOR (MULTI-FLOOR & 9-PALACES) ---
export function generateArchitecturalPlan({
    mode = 'empty_land',
    widthM = 5.0,
    lengthM = 16.0,
    floors = 2,
    facingDegree = 180,
    flyingStarsData = null,
    batTrachData = null,
    existingRoomsMap = {},
    roomCounts = {}
}) {
    const W = Math.max(3.0, Math.min(30.0, parseFloat(widthM) || 5.0));
    const L = Math.max(5.0, Math.min(60.0, parseFloat(lengthM) || 16.0));
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
            floorName = 'Hiện Trạng Bố Trí Nhà';
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
            existingRoomsMap,
            roomCounts
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
    existingRoomsMap = {},
    roomCounts = {}
}) {
    const walls = [];
    const doors = [];
    const windows = [];
    const furniture = [];
    const rooms = [];
    const dimensions = [];

    const outerT = 0.22;
    const innerT = 0.11;

    // Chu vi ngoại thất ngôi nhà
    walls.push({ x1: 0, y1: 0, x2: W, y2: 0, thickness: outerT, type: 'outer' });
    walls.push({ x1: 0, y1: L, x2: W, y2: L, thickness: outerT, type: 'outer' });
    walls.push({ x1: 0, y1: 0, x2: 0, y2: L, thickness: outerT, type: 'outer' });
    walls.push({ x1: W, y1: 0, x2: W, y2: L, thickness: outerT, type: 'outer' });

    // Kích thước ô lưới 9 Cung
    const cellW = W / 3;
    const cellH = L / 3;

    if (mode === 'existing_house') {
        // --- CHẾ ĐỘ 1: NHÀ SẴN CÓ (DỰA TRÊN VỊ TRÍ 9 CUNG DO GIA CHỦ CHỌN) ---
        // Vách ngăn lưới 9 Cung
        walls.push({ x1: cellW, y1: 0, x2: cellW, y2: L, thickness: innerT, type: 'partition' });
        walls.push({ x1: cellW * 2, y1: 0, x2: cellW * 2, y2: L, thickness: innerT, type: 'partition' });
        walls.push({ x1: 0, y1: cellH, x2: W, y2: cellH, thickness: innerT, type: 'partition' });
        walls.push({ x1: 0, y1: cellH * 2, x2: W, y2: cellH * 2, thickness: innerT, type: 'partition' });

        // Hàm lấy tọa độ x, y của Cung được chọn
        const getPalaceCoord = (palaceId) => {
            const pId = parseInt(palaceId, 10);
            const pos = PALACE_GRID_POS[pId];
            if (!pos) return null;
            return {
                x: pos.c * cellW,
                y: pos.r * cellH,
                w: cellW,
                h: cellH,
                palaceName: pos.name
            };
        };

        // 1. Cửa chính
        if (existingRoomsMap.main_door && existingRoomsMap.main_door !== 'none') {
            const coord = getPalaceCoord(existingRoomsMap.main_door);
            if (coord) {
                const dw = Math.min(2.4, coord.w * 0.7);
                const doorY = (coord.y === 0) ? 0 : ((coord.y >= cellH * 2) ? L : coord.y);
                doors.push({
                    x: coord.x + (coord.w - dw) / 2,
                    y: doorY,
                    w: dw,
                    h: outerT,
                    type: 'main_door',
                    label: `Cửa Chính (${PALACE_NAMES[existingRoomsMap.main_door]})`,
                    isGood: true
                });
            }
        }

        // 2. Phòng khách
        if (existingRoomsMap.living_room && existingRoomsMap.living_room !== 'none') {
            const coord = getPalaceCoord(existingRoomsMap.living_room);
            if (coord) {
                rooms.push({
                    name: 'Phòng Khách',
                    areaM2: Math.round(coord.w * coord.h * 10) / 10,
                    x: coord.x, y: coord.y, w: coord.w, h: coord.h,
                    zone: coord.palaceName
                });
                furniture.push({ type: 'sofa', x: coord.x + 0.3, y: coord.y + 0.4, w: coord.w - 0.6, h: Math.min(1.2, coord.h * 0.4), label: 'Sofa Khách' });
            }
        }

        // 3. Bàn thờ
        if (existingRoomsMap.altar && existingRoomsMap.altar !== 'none') {
            const coord = getPalaceCoord(existingRoomsMap.altar);
            if (coord) {
                rooms.push({
                    name: 'Bàn Thờ',
                    areaM2: Math.round(coord.w * coord.h * 10) / 10,
                    x: coord.x, y: coord.y, w: coord.w, h: coord.h,
                    zone: coord.palaceName
                });
                furniture.push({ type: 'altar_table', x: coord.x + (coord.w - 1.5) / 2, y: coord.y + 0.3, w: 1.5, h: 0.7, label: 'Bàn Thờ', isGood: true });
            }
        }

        // 4. Bếp nấu
        if (existingRoomsMap.kitchen && existingRoomsMap.kitchen !== 'none') {
            const coord = getPalaceCoord(existingRoomsMap.kitchen);
            if (coord) {
                rooms.push({
                    name: 'Bếp Nấu & Ăn',
                    areaM2: Math.round(coord.w * coord.h * 10) / 10,
                    x: coord.x, y: coord.y, w: coord.w, h: coord.h,
                    zone: coord.palaceName
                });
                furniture.push({ type: 'kitchen_counter', x: coord.x + 0.3, y: coord.y + coord.h - 0.7, w: coord.w - 0.6, h: 0.6, label: 'Bếp Nấu' });
                furniture.push({ type: 'dining_table', x: coord.x + (coord.w - 1.4) / 2, y: coord.y + 0.5, w: 1.4, h: 0.8, label: 'Bàn Ăn' });
            }
        }

        // 5. Phòng ngủ 1 (Master)
        if (existingRoomsMap.master_bed && existingRoomsMap.master_bed !== 'none') {
            const coord = getPalaceCoord(existingRoomsMap.master_bed);
            if (coord) {
                rooms.push({
                    name: 'Phòng Ngủ Master',
                    areaM2: Math.round(coord.w * coord.h * 10) / 10,
                    x: coord.x, y: coord.y, w: coord.w, h: coord.h,
                    zone: coord.palaceName
                });
                furniture.push({ type: 'bed_master', x: coord.x + (coord.w - 1.8) / 2, y: coord.y + 0.5, w: 1.8, h: 2.0, label: 'Giường Master' });
            }
        }

        // 6. Phòng ngủ 2
        if (existingRoomsMap.bed_2 && existingRoomsMap.bed_2 !== 'none') {
            const coord = getPalaceCoord(existingRoomsMap.bed_2);
            if (coord) {
                rooms.push({
                    name: 'Phòng Ngủ 2',
                    areaM2: Math.round(coord.w * coord.h * 10) / 10,
                    x: coord.x, y: coord.y, w: coord.w, h: coord.h,
                    zone: coord.palaceName
                });
                furniture.push({ type: 'bed_single', x: coord.x + (coord.w - 1.4) / 2, y: coord.y + 0.5, w: 1.4, h: 2.0, label: 'Giường Ngủ 2' });
            }
        }

        // 7. Phòng ngủ 3
        if (existingRoomsMap.bed_3 && existingRoomsMap.bed_3 !== 'none') {
            const coord = getPalaceCoord(existingRoomsMap.bed_3);
            if (coord) {
                rooms.push({
                    name: 'Phòng Ngủ 3',
                    areaM2: Math.round(coord.w * coord.h * 10) / 10,
                    x: coord.x, y: coord.y, w: coord.w, h: coord.h,
                    zone: coord.palaceName
                });
                furniture.push({ type: 'bed_single', x: coord.x + (coord.w - 1.4) / 2, y: coord.y + 0.5, w: 1.4, h: 2.0, label: 'Giường Ngủ 3' });
            }
        }

        // 8. Nhà Vệ Sinh 1
        if (existingRoomsMap.toilet_1 && existingRoomsMap.toilet_1 !== 'none') {
            const coord = getPalaceCoord(existingRoomsMap.toilet_1);
            if (coord) {
                rooms.push({
                    name: 'WC 1',
                    areaM2: Math.round(coord.w * coord.h * 10) / 10,
                    x: coord.x, y: coord.y, w: coord.w, h: coord.h,
                    zone: coord.palaceName
                });
                furniture.push({ type: 'toilet_bowl', x: coord.x + coord.w - 0.7, y: coord.y + 0.4, w: 0.5, h: 0.7, label: 'Bồn Cầu' });
                furniture.push({ type: 'lavabo', x: coord.x + 0.4, y: coord.y + 0.4, w: 0.5, h: 0.5, label: 'Lavabo' });
            }
        }

        // 9. Nhà Vệ Sinh 2
        if (existingRoomsMap.toilet_2 && existingRoomsMap.toilet_2 !== 'none') {
            const coord = getPalaceCoord(existingRoomsMap.toilet_2);
            if (coord) {
                rooms.push({
                    name: 'WC 2',
                    areaM2: Math.round(coord.w * coord.h * 10) / 10,
                    x: coord.x, y: coord.y, w: coord.w, h: coord.h,
                    zone: coord.palaceName
                });
                furniture.push({ type: 'toilet_bowl', x: coord.x + coord.w - 0.7, y: coord.y + 0.4, w: 0.5, h: 0.7, label: 'Bồn Cầu' });
            }
        }

        // 10. Cầu thang
        if (existingRoomsMap.stairs && existingRoomsMap.stairs !== 'none') {
            const coord = getPalaceCoord(existingRoomsMap.stairs);
            if (coord) {
                furniture.push({
                    type: 'stairs', x: coord.x + 0.3, y: coord.y + 0.3, w: coord.w - 0.6, h: coord.h - 0.6,
                    steps: 21, label: 'Cầu Thang'
                });
            }
        }

        // 11. Phòng làm việc
        if (existingRoomsMap.work_room && existingRoomsMap.work_room !== 'none') {
            const coord = getPalaceCoord(existingRoomsMap.work_room);
            if (coord) {
                rooms.push({
                    name: 'Phòng Làm Việc',
                    areaM2: Math.round(coord.w * coord.h * 10) / 10,
                    x: coord.x, y: coord.y, w: coord.w, h: coord.h,
                    zone: coord.palaceName
                });
            }
        }

    } else {
        // --- CHẾ ĐỘ 2: ĐẤT TRỐNG (MÁY TỰ THIẾT KẾ MẶT BẰNG CHUẨN THEO SỐ TẦNG & SỐ PHÒNG) ---
        const bedCount = parseInt(roomCounts.bedrooms, 10) || 3;
        const wcCount = parseInt(roomCounts.toilets, 10) || 2;
        const hasAltar = roomCounts.hasAltar !== false;
        const hasSkylight = roomCounts.hasSkylight !== false;

        if (floorIndex === 1) {
            // TẦNG TRỆT: Phòng Khách + Sảnh Thang/Giếng Trời + Bếp Ăn + 1 WC
            const livingL = Math.max(4.0, L * 0.36);
            const stairL = Math.max(2.4, Math.min(3.2, L * 0.22));
            const kitchenL = L - livingL - stairL;

            const y1 = livingL;
            const y2 = y1 + stairL;

            walls.push({ x1: 0, y1: y1, x2: W * 0.65, y2: y1, thickness: innerT, type: 'partition' });
            walls.push({ x1: 0, y1: y2, x2: W, y2: y2, thickness: innerT, type: 'partition' });

            // Phòng khách
            rooms.push({
                name: 'Phòng Khách',
                areaM2: Math.round(W * livingL * 10) / 10,
                x: 0, y: 0, w: W, h: livingL,
                zone: 'Tiền Minh Đường'
            });

            // Cửa chính
            const dw = W >= 5.0 ? 2.8 : 2.2;
            const loban = checkLoBan(dw * 1000, '522');
            doors.push({ x: (W - dw) / 2, y: 0, w: dw, h: outerT, type: 'main_door', label: `Cửa Chính (${dw}m - Cung ${loban.cung})`, isGood: loban.isGood });
            furniture.push({ type: 'sofa', x: 0.5, y: 0.8, w: Math.min(2.6, W * 0.5), h: 0.9, label: 'Sofa' });

            // Sảnh thang & Giếng trời
            furniture.push({ type: 'stairs', x: 0.3, y: y1 + 0.3, w: Math.min(2.4, W * 0.45), h: stairL - 0.6, steps: 21, label: 'Cầu Thang' });
            if (hasSkylight) {
                furniture.push({ type: 'skylight', x: W - 1.8, y: y1 + 0.4, w: 1.5, h: stairL - 0.8, label: 'Giếng Trời' });
            }

            // WC Trệt
            const wcW = Math.min(1.8, W * 0.38);
            const wcL = Math.min(2.0, kitchenL * 0.45);
            walls.push({ x1: W - wcW, y1: y2, x2: W - wcW, y2: y2 + wcL, thickness: innerT, type: 'partition' });
            walls.push({ x1: W - wcW, y1: y2 + wcL, x2: W, y2: y2 + wcL, thickness: innerT, type: 'partition' });
            rooms.push({ name: 'WC Trệt', areaM2: Math.round(wcW * wcL * 10) / 10, x: W - wcW, y: y2, w: wcW, h: wcL, zone: 'Khu Phụ' });
            furniture.push({ type: 'toilet_bowl', x: W - 0.7, y: y2 + 0.4, w: 0.5, h: 0.7, label: 'Bồn Cầu' });
            furniture.push({ type: 'lavabo', x: W - 1.5, y: y2 + 0.4, w: 0.5, h: 0.5, label: 'Lavabo' });

            // Bếp & Ăn
            rooms.push({ name: 'Bếp & Phòng Ăn', areaM2: Math.round((W * kitchenL - wcW * wcL) * 10) / 10, x: 0, y: y2, w: W - wcW, h: kitchenL, zone: 'Hậu Trạch' });
            furniture.push({ type: 'kitchen_counter', x: 0.4, y: L - 0.7, w: Math.min(3.2, W * 0.55), h: 0.6, label: 'Bếp Nấu' });
            furniture.push({ type: 'dining_table', x: 1.0, y: y2 + 1.0, w: 1.5, h: 0.8, label: 'Bàn Ăn 6 Ghế' });

        } else if (floorIndex < totalFloors || totalFloors === 1) {
            // CÁC LẦU PHÒNG NGỦ (Lầu 1, Lầu 2...)
            const masterL = Math.max(4.0, L * 0.38);
            const stairL = Math.max(2.4, Math.min(3.2, L * 0.22));
            const secondL = L - masterL - stairL;

            const y1 = masterL;
            const y2 = y1 + stairL;

            walls.push({ x1: 0, y1: y1, x2: W, y2: y1, thickness: innerT, type: 'partition' });
            walls.push({ x1: 0, y1: y2, x2: W, y2: y2, thickness: innerT, type: 'partition' });

            // Phòng ngủ Master phía trước
            rooms.push({ name: `Phòng Ngủ Master (T${floorIndex})`, areaM2: Math.round(W * masterL * 10) / 10, x: 0, y: 0, w: W, h: masterL, zone: 'Cung Vượng Đinh' });
            furniture.push({ type: 'bed_master', x: 0.8, y: 1.0, w: 1.8, h: 2.0, label: 'Giường Master' });
            doors.push({ x: W / 2 - 0.6, y: 0, w: 1.2, h: outerT, type: 'balcony_door', label: 'Cửa Ban Công' });

            // Cầu thang & WC Lầu
            furniture.push({ type: 'stairs', x: 0.3, y: y1 + 0.3, w: Math.min(2.4, W * 0.45), h: stairL - 0.6, label: 'Cầu Thang' });
            const wcW = Math.min(2.0, W * 0.4);
            walls.push({ x1: W - wcW, y1: y1, x2: W - wcW, y2: y2, thickness: innerT, type: 'partition' });
            rooms.push({ name: `WC Tầng ${floorIndex}`, areaM2: Math.round(wcW * stairL * 10) / 10, x: W - wcW, y: y1, w: wcW, h: stairL, zone: 'Khép Kín' });
            furniture.push({ type: 'toilet_bowl', x: W - 0.7, y: y1 + 1.4, w: 0.5, h: 0.7, label: 'Bồn Cầu' });
            furniture.push({ type: 'lavabo', x: W - 1.6, y: y1 + 1.4, w: 0.5, h: 0.5, label: 'Lavabo' });

            // Phòng ngủ phía sau
            rooms.push({ name: `Phòng Ngủ 2 (T${floorIndex})`, areaM2: Math.round(W * secondL * 10) / 10, x: 0, y: y2, w: W, h: secondL, zone: 'Cung Văn Xương' });
            furniture.push({ type: 'bed_single', x: 0.8, y: y2 + 0.8, w: 1.4, h: 2.0, label: 'Giường Đơn' });
            windows.push({ x: W / 2 - 0.7, y: L, w: 1.4, h: outerT, label: 'Cửa Sổ Lấy Sáng' });

        } else {
            // TẦNG THƯỢNG: Phòng Thờ + Cầu Thang + Sân Phơi/Giặt
            const altarL = Math.max(3.5, L * 0.35);
            const stairL = Math.max(2.4, Math.min(3.2, L * 0.25));
            const terraceL = L - altarL - stairL;

            const y1 = altarL;
            const y2 = y1 + stairL;

            walls.push({ x1: 0, y1: y1, x2: W, y2: y1, thickness: innerT, type: 'partition' });

            if (hasAltar) {
                rooms.push({ name: 'Phòng Thờ Gia Tiên', areaM2: Math.round(W * altarL * 10) / 10, x: 0, y: 0, w: W, h: altarL, zone: 'Tôn Nghiêm Tối Thượng' });
                const lobanAltar = checkLoBan(1530, '388');
                furniture.push({ type: 'altar_table', x: (W - 1.53) / 2, y: 0.4, w: 1.53, h: 0.8, label: `Bàn Thờ (${lobanAltar.cung})`, isGood: true });
            }

            furniture.push({ type: 'stairs', x: 0.3, y: y1 + 0.3, w: Math.min(2.4, W * 0.45), h: stairL - 0.6, label: 'Cầu Thang' });

            rooms.push({ name: 'Sân Phơi & Giặt Phía Sau', areaM2: Math.round(W * terraceL * 10) / 10, x: 0, y: y2, w: W, h: terraceL, zone: 'Sân Hậu' });
            furniture.push({ type: 'washing_machine', x: W - 1.0, y: y2 + 0.5, w: 0.7, h: 0.7, label: 'Máy Giặt' });
        }
    }

    dimensions.push({ x1: 0, y1: 0, x2: W, y2: 0, text: `Ngang ${W}m`, loban: checkLoBan(W * 1000, '429') });
    dimensions.push({ x1: W, y1: 0, x2: W, y2: L, text: `Dài ${L}m`, loban: checkLoBan(L * 1000, '429') });

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
