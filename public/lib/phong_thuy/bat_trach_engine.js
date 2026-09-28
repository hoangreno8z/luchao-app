// ============================================================
// Bát Trạch Phối Mệnh Engine
// Tác giả: Dịch Sư Nguyễn Huy Hoàng
// ============================================================

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

// 8 Cung Bát Trạch theo từng Quái Mệnh
export const BAT_TRACH_MAP = {
    // Khảm (1) - Thủy
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
    // Khôn (2) - Thổ
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
    // Chấn (3) - Mộc
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
    // Tốn (4) - Mộc
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
    // Càn (6) - Kim
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
    // Đoài (7) - Kim
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
    // Cấn (8) - Thổ
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
    // Ly (9) - Hỏa
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

/**
 * Tính Quái Mệnh theo năm sinh và giới tính
 */
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

    // Chuẩn công thức Cung Phi Bát Trạch:
    // Sinh trước 2000:
    // Nam: (100 - 2 số cuối) % 9 (nếu = 5 thì Nam quy về Khôn 2)
    // Nữ: (2 số cuối - 4) % 9 (nếu = 5 thì Nữ quy về Cấn 8)
    const lastTwo = birthYear % 100;
    let guaNum = 1;

    if (birthYear < 2000) {
        if (isMale) {
            guaNum = (10 - sumDigits(lastTwo)) % 9;
            if (guaNum === 0) guaNum = 9;
            if (guaNum === 5) guaNum = 2; // Nam 5 -> Khôn 2
        } else {
            guaNum = (sumDigits(lastTwo) + 5) % 9;
            if (guaNum === 0) guaNum = 9;
            if (guaNum === 5) guaNum = 8; // Nữ 5 -> Cấn 8
        }
    } else {
        // Từ 2000 trở đi:
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
