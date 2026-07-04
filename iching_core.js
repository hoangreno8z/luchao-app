/**
 * Thư viện logic Kinh Dịch Lục Hào - iching_core.js
 * (Adapted exactly from gieoque.id.vn logic to ensure 100% correctness)
 */

const ICHING = (function () {
    const NGU_HANH_QUAI = {
        'Càn': 'Kim', 'Đoài': 'Kim',
        'Ly': 'Hỏa',
        'Chấn': 'Mộc', 'Tốn': 'Mộc',
        'Khảm': 'Thủy',
        'Cấn': 'Thổ', 'Khôn': 'Thổ'
    };

    const QUAI_SO = [
        { name: 'Khôn', bin: '000', hanh: 'Thổ' },
        { name: 'Cấn', bin: '001', hanh: 'Thổ' },
        { name: 'Khảm', bin: '010', hanh: 'Thủy' },
        { name: 'Tốn', bin: '011', hanh: 'Mộc' },
        { name: 'Chấn', bin: '100', hanh: 'Mộc' },
        { name: 'Ly', bin: '101', hanh: 'Hỏa' },
        { name: 'Đoài', bin: '110', hanh: 'Kim' },
        { name: 'Càn', bin: '111', hanh: 'Kim' }
    ];

    const NAP_GIAP = {
        'Càn': ['Tý', 'Dần', 'Thìn', 'Ngọ', 'Thân', 'Tuất'],
        'Khảm': ['Dần', 'Thìn', 'Ngọ', 'Thân', 'Tuất', 'Tý'],
        'Cấn': ['Thìn', 'Ngọ', 'Thân', 'Tuất', 'Tý', 'Dần'],
        'Chấn': ['Tý', 'Dần', 'Thìn', 'Ngọ', 'Thân', 'Tuất'],
        'Tốn': ['Sửu', 'Hợi', 'Dậu', 'Mùi', 'Tỵ', 'Mão'],
        'Ly': ['Mão', 'Sửu', 'Hợi', 'Dậu', 'Mùi', 'Tỵ'],
        'Khôn': ['Mùi', 'Tỵ', 'Mão', 'Sửu', 'Hợi', 'Dậu'],
        'Đoài': ['Tỵ', 'Mão', 'Sửu', 'Hợi', 'Dậu', 'Mùi']
    };

    const TEN_QUE = [
        ['Bát Thuần Khôn', 'Địa Sơn Khiêm', 'Địa Thủy Sư', 'Địa Phong Thăng', 'Địa Lôi Phục', 'Địa Hỏa Minh Di', 'Địa Trạch Lâm', 'Địa Thiên Thái'],
        ['Sơn Địa Bác', 'Bát Thuần Cấn', 'Sơn Thủy Mông', 'Sơn Phong Cổ', 'Sơn Lôi Di', 'Sơn Hỏa Bí', 'Sơn Trạch Tổn', 'Sơn Thiên Đại Súc'],
        ['Thủy Địa Tỷ', 'Thủy Sơn Kiển', 'Bát Thuần Khảm', 'Thủy Phong Tỉnh', 'Thủy Lôi Truân', 'Thủy Hỏa Ký Tế', 'Thủy Trạch Tiết', 'Thủy Thiên Nhu'],
        ['Phong Địa Quan', 'Phong Sơn Tiệm', 'Phong Thủy Hoán', 'Bát Thuần Tốn', 'Phong Lôi Ích', 'Phong Hỏa Gia Nhân', 'Phong Trạch Trung Phu', 'Phong Thiên Tiểu Súc'],
        ['Lôi Địa Dự', 'Lôi Sơn Tiểu Quá', 'Lôi Thủy Giải', 'Lôi Phong Hằng', 'Bát Thuần Chấn', 'Lôi Hỏa Phong', 'Lôi Trạch Quy Muội', 'Lôi Thiên Đại Tráng'],
        ['Hỏa Địa Tấn', 'Hỏa Sơn Lữ', 'Hỏa Thủy Vị Tế', 'Hỏa Phong Đỉnh', 'Hỏa Lôi Phệ Hạp', 'Bát Thuần Ly', 'Hỏa Trạch Khuê', 'Hỏa Thiên Đại Hữu'],
        ['Trạch Địa Tụy', 'Trạch Sơn Hàm', 'Trạch Thủy Khốn', 'Trạch Phong Đại Quá', 'Trạch Lôi Tùy', 'Trạch Hỏa Cách', 'Bát Thuần Đoài', 'Trạch Thiên Quải'],
        ['Thiên Địa Bĩ', 'Thiên Sơn Độn', 'Thiên Thủy Tụng', 'Thiên Phong Cấu', 'Thiên Lôi Vô Vọng', 'Thiên Hỏa Đồng Nhân', 'Thiên Trạch Lý', 'Bát Thuần Càn']
    ];

    const LUC_XUNG_LIST = ['Thiên Lôi Vô Vọng', 'Lôi Thiên Đại Tráng'];
    const LUC_HOP_LIST = [
        'Thiên Địa Bĩ', 'Địa Thiên Thái',
        'Thủy Trạch Tiết', 'Trạch Thủy Khốn',
        'Sơn Hỏa Bí', 'Hỏa Sơn Lữ',
        'Địa Lôi Phục', 'Lôi Địa Dự'
    ];

    function getHexAttribute(hexName, type) {
        if (type === 'Du Hồn') return 'Du Hồn';
        if (type === 'Quy Hồn') return 'Quy Hồn';
        if (type === 'Bát Thuần' || LUC_XUNG_LIST.includes(hexName)) return 'Lục Xung';
        if (LUC_HOP_LIST.includes(hexName)) return 'Lục Hợp';
        return '';
    }

    const PHAN_NGAM_PAIRS = {
        7: 3, 3: 7,  // Càn ↔ Tốn
        5: 2, 2: 5,  // Ly ↔ Khảm
        4: 6, 6: 4,  // Chấn ↔ Đoài
        1: 0, 0: 1   // Cấn ↔ Khôn
    };

    const PHUC_NGAM_PAIRS = {
        7: 4, 4: 7   // Càn ↔ Chấn
    };

    function checkNgam(mainInIdx, mainOutIdx, changedInIdx, changedOutIdx) {
        let noiResult = '';
        let ngoaiResult = '';

        if (mainInIdx !== changedInIdx) {
            if (PHUC_NGAM_PAIRS[mainInIdx] === changedInIdx) noiResult = 'phuc';
            else if (PHAN_NGAM_PAIRS[mainInIdx] === changedInIdx) noiResult = 'phan';
        }

        if (mainOutIdx !== changedOutIdx) {
            if (PHUC_NGAM_PAIRS[mainOutIdx] === changedOutIdx) ngoaiResult = 'phuc';
            else if (PHAN_NGAM_PAIRS[mainOutIdx] === changedOutIdx) ngoaiResult = 'phan';
        }

        const results = [];
        if (noiResult && ngoaiResult && noiResult === ngoaiResult) {
            if (noiResult === 'phan') results.push('Toàn Quẻ Phản Ngâm');
            else results.push('Toàn Quẻ Phục Ngâm');
            return results;
        }

        if (ngoaiResult === 'phan') results.push('Ngoại Quái Phản Ngâm');
        else if (ngoaiResult === 'phuc') results.push('Ngoại Quái Phục Ngâm');

        if (noiResult === 'phan') results.push('Nội Quái Phản Ngâm');
        else if (noiResult === 'phuc') results.push('Nội Quái Phục Ngâm');

        return results;
    }

    const HEX_MAP = {};

    function initHexMap() {
        const add = (o, i, p, shi, t) => {
            HEX_MAP[(o << 3) | i] = { p, shi, type: t };
        };
        // Càn cung
        add(7, 7, 7, 6, 'Bát Thuần'); add(7, 3, 7, 1, ''); add(7, 1, 7, 2, ''); add(7, 0, 7, 3, '');
        add(3, 0, 7, 4, ''); add(1, 0, 7, 5, ''); add(5, 0, 7, 4, 'Du Hồn'); add(5, 7, 7, 3, 'Quy Hồn');
        // Khảm cung
        add(2, 2, 2, 6, 'Bát Thuần'); add(2, 6, 2, 1, ''); add(2, 4, 2, 2, ''); add(2, 5, 2, 3, '');
        add(6, 5, 2, 4, ''); add(4, 5, 2, 5, ''); add(0, 5, 2, 4, 'Du Hồn'); add(0, 2, 2, 3, 'Quy Hồn');
        // Cấn cung
        add(1, 1, 1, 6, 'Bát Thuần'); add(1, 5, 1, 1, ''); add(1, 7, 1, 2, ''); add(1, 6, 1, 3, '');
        add(5, 6, 1, 4, ''); add(7, 6, 1, 5, ''); add(3, 6, 1, 4, 'Du Hồn'); add(3, 1, 1, 3, 'Quy Hồn');
        // Chấn cung
        add(4, 4, 4, 6, 'Bát Thuần'); add(4, 0, 4, 1, ''); add(4, 2, 4, 2, ''); add(4, 3, 4, 3, '');
        add(0, 3, 4, 4, ''); add(2, 3, 4, 5, ''); add(6, 3, 4, 4, 'Du Hồn'); add(6, 4, 4, 3, 'Quy Hồn');
        // Tốn cung
        add(3, 3, 3, 6, 'Bát Thuần'); add(3, 7, 3, 1, ''); add(3, 5, 3, 2, ''); add(3, 4, 3, 3, '');
        add(7, 4, 3, 4, ''); add(5, 4, 3, 5, ''); add(1, 4, 3, 4, 'Du Hồn'); add(1, 3, 3, 3, 'Quy Hồn');
        // Ly cung
        add(5, 5, 5, 6, 'Bát Thuần'); add(5, 1, 5, 1, ''); add(5, 3, 5, 2, ''); add(5, 2, 5, 3, '');
        add(1, 2, 5, 4, ''); add(3, 2, 5, 5, ''); add(7, 2, 5, 4, 'Du Hồn'); add(7, 5, 5, 3, 'Quy Hồn');
        // Khôn cung
        add(0, 0, 0, 6, 'Bát Thuần'); add(0, 4, 0, 1, ''); add(0, 6, 0, 2, ''); add(0, 7, 0, 3, '');
        add(4, 7, 0, 4, ''); add(6, 7, 0, 5, ''); add(2, 7, 0, 4, 'Du Hồn'); add(2, 0, 0, 3, 'Quy Hồn');
        // Đoài cung
        add(6, 6, 6, 6, 'Bát Thuần'); add(6, 2, 6, 1, ''); add(6, 0, 6, 2, ''); add(6, 1, 6, 3, '');
        add(2, 1, 6, 4, ''); add(0, 1, 6, 5, ''); add(4, 1, 6, 4, 'Du Hồn'); add(4, 6, 6, 3, 'Quy Hồn');
    }
    initHexMap();

    const LIFE_STAGES = ['T.Sinh', 'M.Dục', 'Q.Đới', 'L.Quan', 'Đ.Vượng', 'Suy', 'Bệnh', 'Tử', 'Mộ', 'Tuyệt', 'Thai', 'Dưỡng'];
    const LS_START = { 'Hỏa': 2, 'Kim': 5, 'Mộc': 11, 'Thủy': 8, 'Thổ': 8 };

    const LUC_THU = {
        'Giáp': ['Thanh Long', 'Chu Tước', 'Câu Trần', 'Đằng Xà', 'Bạch Hổ', 'Huyền Vũ'],
        'Ất': ['Thanh Long', 'Chu Tước', 'Câu Trần', 'Đằng Xà', 'Bạch Hổ', 'Huyền Vũ'],
        'Bính': ['Chu Tước', 'Câu Trần', 'Đằng Xà', 'Bạch Hổ', 'Huyền Vũ', 'Thanh Long'],
        'Đinh': ['Chu Tước', 'Câu Trần', 'Đằng Xà', 'Bạch Hổ', 'Huyền Vũ', 'Thanh Long'],
        'Mậu': ['Câu Trần', 'Đằng Xà', 'Bạch Hổ', 'Huyền Vũ', 'Thanh Long', 'Chu Tước'],
        'Kỷ': ['Đằng Xà', 'Bạch Hổ', 'Huyền Vũ', 'Thanh Long', 'Chu Tước', 'Câu Trần'],
        'Canh': ['Bạch Hổ', 'Huyền Vũ', 'Thanh Long', 'Chu Tước', 'Câu Trần', 'Đằng Xà'],
        'Tân': ['Bạch Hổ', 'Huyền Vũ', 'Thanh Long', 'Chu Tước', 'Câu Trần', 'Đằng Xà'],
        'Nhâm': ['Huyền Vũ', 'Thanh Long', 'Chu Tước', 'Câu Trần', 'Đằng Xà', 'Bạch Hổ'],
        'Quý': ['Huyền Vũ', 'Thanh Long', 'Chu Tước', 'Câu Trần', 'Đằng Xà', 'Bạch Hổ'],
    };

    function getBit(val, changed) {
        if (!changed) {
            return (val === 1 || val === 3) ? '1' : '0';
        }
        return (val === 0 || val === 1) ? '1' : '0';
    }

    function getRelation(el, palaceEl) {
        const els = ['Kim', 'Thủy', 'Mộc', 'Hỏa', 'Thổ'];
        const pI = els.indexOf(palaceEl);
        const lI = els.indexOf(el);

        if (pI === lI) return "Huynh Đệ";
        if ((pI + 1) % 5 === lI) return "Tử Tôn";
        if ((lI + 1) % 5 === pI) return "Phụ Mẫu";
        if ((pI + 2) % 5 === lI) return "Thê Tài";
        if ((lI + 2) % 5 === pI) return "Quan Quỷ";
        return "";
    }

    function getLifeStage(el, baseChi) {
        const start = LS_START[el];
        const current = CALENDAR.CHI.indexOf(baseChi);
        const diff = (current - start + 12) % 12;
        return LIFE_STAGES[diff];
    }

    function calculateShenSha(dCan, dChi, mChi) {
        const list = [];
        const add = (name, val) => {
            let vStr = val || '';
            if (Array.isArray(val)) vStr = val.join(', ');
            if (!vStr) vStr = '-';
            list.push(`<strong>${name}:</strong> ${vStr}`);
        };

        const quy = {
            'Giáp': ['Sửu', 'Mùi'], 'Mậu': ['Sửu', 'Mùi'],
            'Ất': ['Tý', 'Thân'], 'Kỷ': ['Tý', 'Thân'],
            'Bính': ['Hợi', 'Dậu'], 'Đinh': ['Hợi', 'Dậu'],
            'Nhâm': ['Mão', 'Tỵ'], 'Quý': ['Mão', 'Tỵ'],
            'Canh': ['Sửu', 'Mùi'], 'Tân': ['Ngọ', 'Dần']
        };
        add('Quý Nhân', quy[dCan]);

        const loc = { 'Giáp': 'Dần', 'Ất': 'Mão', 'Bính': 'Tỵ', 'Mậu': 'Tỵ', 'Đinh': 'Ngọ', 'Kỷ': 'Ngọ', 'Canh': 'Thân', 'Tân': 'Dậu', 'Nhâm': 'Hợi', 'Quý': 'Tý' };
        add('Lộc Thần', loc[dCan]);

        const kinh = { 'Giáp': 'Mão', 'Ất': 'Dần', 'Bính': 'Ngọ', 'Mậu': 'Ngọ', 'Đinh': 'Tỵ', 'Kỷ': 'Tỵ', 'Canh': 'Dậu', 'Tân': 'Thân', 'Nhâm': 'Tý', 'Quý': 'Hợi' };
        add('Dương Nhận', kinh[dCan]);

        const van = { 'Giáp': 'Tỵ', 'Ất': 'Ngọ', 'Bính': 'Thân', 'Mậu': 'Thân', 'Đinh': 'Dậu', 'Kỷ': 'Dậu', 'Canh': 'Hợi', 'Tân': 'Tý', 'Nhâm': 'Dần', 'Quý': 'Mão' };
        add('Văn Xương', van[dCan]);

        const triadMap = {
            'Thân': 'Thủy', 'Tý': 'Thủy', 'Thìn': 'Thủy',
            'Dần': 'Hỏa', 'Ngọ': 'Hỏa', 'Tuất': 'Hỏa',
            'Tỵ': 'Kim', 'Dậu': 'Kim', 'Sửu': 'Kim',
            'Hợi': 'Mộc', 'Mão': 'Mộc', 'Mùi': 'Mộc'
        };
        const group = triadMap[dChi];

        if (group) {
            const dm = { 'Thủy': 'Dần', 'Hỏa': 'Thân', 'Kim': 'Hợi', 'Mộc': 'Tỵ' };
            add('Dịch Mã', dm[group]);

            const dao = { 'Thủy': 'Dậu', 'Hỏa': 'Mão', 'Kim': 'Ngọ', 'Mộc': 'Tý' };
            add('Đào Hoa', dao[group]);

            const tuong = { 'Thủy': 'Tý', 'Hỏa': 'Ngọ', 'Kim': 'Dậu', 'Mộc': 'Mão' };
            add('Tướng Tinh', tuong[group]);

            const kiep = { 'Thủy': 'Tỵ', 'Hỏa': 'Hợi', 'Kim': 'Dần', 'Mộc': 'Thân' };
            add('Kiếp Sát', kiep[group]);

            const hoa = { 'Thủy': 'Thìn', 'Hỏa': 'Tuất', 'Kim': 'Sửu', 'Mộc': 'Mùi' };
            add('Hoa Cái', hoa[group]);

            const muu = { 'Thủy': 'Tuất', 'Kim': 'Mùi', 'Hỏa': 'Thìn', 'Mộc': 'Sửu' };
            add('Mưu Tinh', muu[group]);

            const tai = { 'Thủy': 'Ngọ', 'Hỏa': 'Tý', 'Kim': 'Mão', 'Mộc': 'Dậu' };
            add('Tai Sát', tai[group]);

            const vong = { 'Thủy': 'Hợi', 'Hỏa': 'Tỵ', 'Kim': 'Thân', 'Mộc': 'Dần' };
            add('Vong Thần', vong[group]);
        } else {
            for (let i = 0; i < 8; i++) add('', '');
        }

        const mIdx = CALENDAR.CHI.indexOf(mChi);
        if (mIdx !== -1) {
            const ty = CALENDAR.CHI[(mIdx - 1 + 12) % 12];
            add('Thiên Y', ty);
        } else {
            add('Thiên Y', '-');
        }

        const muaMap = {
            'Dần': 'Tuất', 'Mão': 'Tuất', 'Thìn': 'Tuất',
            'Tỵ': 'Sửu', 'Ngọ': 'Sửu', 'Mùi': 'Sửu',
            'Thân': 'Thìn', 'Dậu': 'Thìn', 'Tuất': 'Thìn',
            'Hợi': 'Mùi', 'Tý': 'Mùi', 'Sửu': 'Mùi'
        };
        add('Thiên Hỉ', muaMap[mChi]);

        return list;
    }

    function calculateHexagramData(lines, cal, methodText, formattedDate) {
        const mBits = lines.map(v => getBit(v, false));
        const mInBin = mBits.slice(0, 3).join('');
        const mOutBin = mBits.slice(3, 6).join('');
        const mInIdx = QUAI_SO.findIndex(q => q.bin === mInBin);
        const mOutIdx = QUAI_SO.findIndex(q => q.bin === mOutBin);

        const hexID = (mOutIdx << 3) | mInIdx;
        const info = HEX_MAP[hexID] || { p: 0, shi: 6, type: 'Bát Thuần' };
        const mainName = TEN_QUE[mOutIdx][mInIdx];
        const palaceName = QUAI_SO[info.p].name;
        const palaceEl = NGU_HANH_QUAI[palaceName];

        const mainAttr = getHexAttribute(mainName, info.type);

        const cBits = lines.map(v => getBit(v, true));
        const cInIdx = QUAI_SO.findIndex(q => q.bin === cBits.slice(0, 3).join(''));
        const cOutIdx = QUAI_SO.findIndex(q => q.bin === cBits.slice(3, 6).join(''));

        const hexIDChanged = (cOutIdx << 3) | cInIdx;
        const infoChanged = HEX_MAP[hexIDChanged] || { p: 0, shi: 6, type: '' };
        const changedName = TEN_QUE[cOutIdx][cInIdx];
        const changedPalaceName = QUAI_SO[infoChanged.p].name;
        const changedAttr = getHexAttribute(changedName, infoChanged.type);

        const ngamResult = checkNgam(mInIdx, mOutIdx, cInIdx, cOutIdx);
        const lucThuList = LUC_THU[cal.ngay.can];

        const presentRelations = new Set();
        for (let i = 0; i < 6; i++) {
            const mTriName = (i + 1 <= 3) ? QUAI_SO[mInIdx].name : QUAI_SO[mOutIdx].name;
            const mBranch = NAP_GIAP[mTriName][i];
            const mEl = CALENDAR.NGU_HANH_CHI[mBranch];
            const mRel = getRelation(mEl, palaceEl);
            presentRelations.add(mRel);
        }

        const linesData = [];
        const movingLines = [];

        for (let i = 0; i < 6; i++) {
            const lineVal = lines[i];
            const isMoving = (lineVal === 0 || lineVal === 3);

            const mTriName = (i + 1 <= 3) ? QUAI_SO[mInIdx].name : QUAI_SO[mOutIdx].name;
            const mBranch = NAP_GIAP[mTriName][i];
            const mEl = CALENDAR.NGU_HANH_CHI[mBranch];
            const mRel = getRelation(mEl, palaceEl);

            const tsNgay = getLifeStage(mEl, cal.ngay.chi);
            const tsThang = getLifeStage(mEl, cal.thang.chi);

            const shi = info.shi;
            const ying = (shi + 3) > 6 ? shi - 3 : shi + 3;
            const isShi = (shi === i + 1);
            const isYing = (ying === i + 1);

            let phucThan = null;
            if (!presentRelations.has("Tử Tôn") || !presentRelations.has("Thê Tài") ||
                !presentRelations.has("Quan Quỷ") || !presentRelations.has("Phụ Mẫu") ||
                !presentRelations.has("Huynh Đệ")) {
                const pureTri = QUAI_SO[info.p].name;
                const pureBranch = NAP_GIAP[pureTri][i];
                const pureEl = CALENDAR.NGU_HANH_CHI[pureBranch];
                const pureRel = getRelation(pureEl, palaceEl);
                if (!presentRelations.has(pureRel)) {
                    phucThan = {
                        rel: pureRel.split(' ')[0],
                        branch: pureBranch
                    };
                }
            }

            const isTK = cal.tuanKhong.includes(mBranch);

            const cTriName = (i + 1 <= 3) ? QUAI_SO[cInIdx].name : QUAI_SO[cOutIdx].name;
            const cBranch = NAP_GIAP[cTriName][i];
            const cEl = CALENDAR.NGU_HANH_CHI[cBranch];
            const cRel = getRelation(cEl, palaceEl);

            const isCTK = cal.tuanKhong.includes(cBranch);

            linesData.push({
                val: lineVal,
                isMoving,
                relation: mRel,
                chi: mBranch,
                hanh: mEl,
                phucThan,
                isTK,
                isShi,
                isYing,
                lucThu: lucThuList[i],
                tsNgay,
                tsThang,
                changed: {
                    relation: cRel,
                    branch: cBranch,
                    hanh: cEl
                },
                isCTK
            });

            if (isMoving) {
                movingLines.push(i + 1);
            }
        }

        // TÍNH HÀO TÂM NIỆM
        let haoTamObj = null;
        const shiIndex = linesData.findIndex(l => l.isShi);
        if (shiIndex !== -1) {
            const shiLine = linesData[shiIndex];
            
            const getTangHao = (idx) => {
                const pureTri = QUAI_SO[info.p].name;
                const pureBranch = NAP_GIAP[pureTri][idx];
                const pureEl = CALENDAR.NGU_HANH_CHI[pureBranch];
                const pureRel = getRelation(pureEl, palaceEl);
                return { rel: pureRel, branch: pureBranch };
            };

            if (!shiLine.isMoving) {
                if (shiLine.changed.relation !== shiLine.relation) {
                    haoTamObj = { rel: shiLine.changed.relation, branch: shiLine.changed.branch };
                }
            }

            if (!haoTamObj) {
                const tangHaoThe = getTangHao(shiIndex);
                if (tangHaoThe.rel !== shiLine.relation) {
                    haoTamObj = tangHaoThe;
                } else {
                    const hao5 = linesData[4];
                    if (hao5 && !hao5.isMoving) {
                        if (hao5.relation !== shiLine.relation) {
                            haoTamObj = { rel: hao5.relation, branch: hao5.chi };
                        }
                    } else if (hao5 && hao5.isMoving) {
                        const tangHao5 = getTangHao(4);
                        if (tangHao5.rel !== shiLine.relation) {
                            haoTamObj = tangHao5;
                        }
                    }
                }
            }
        }

        let haoTamText = "";
        if (haoTamObj) {
            const relMap = {
                'Tử Tôn': 'Tử', 'Thê Tài': 'Tài', 'Quan Quỷ': 'Quan',
                'Huynh Đệ': 'Huynh', 'Phụ Mẫu': 'Phụ'
            };
            const relShort = relMap[haoTamObj.rel] || haoTamObj.rel;
            haoTamText = `${relShort} - ${haoTamObj.branch}`;
        }

        const shensha = calculateShenSha(cal.ngay.can, cal.ngay.chi, cal.thang.chi);

        return {
            mainID: hexID,
            changedID: hexIDChanged,
            mainName,
            changedName,
            palaceName,
            palaceEl,
            mainAttr,
            changedPalaceName,
            changedAttr,
            info,
            lines,
            linesData,
            shensha,
            movingLines,
            ngamResult,
            formattedDate,
            methodText,
            dateInfo: {
                fullCanChi: `Giờ ${cal.gio.can} ${cal.gio.chi}, Ngày ${cal.ngay.can} ${cal.ngay.chi}`,
                tietKhi: cal.tietKhi,
                haoTamText: haoTamText,
                tuanKhong: cal.tuanKhong.join(', '),
                nhatThan: `${cal.ngay.chi} - ${cal.ngay.hanh}`,
                nguyetLenh: `${cal.thang.chi} - ${cal.thang.hanh}`,
                nhatLenhShort: `${cal.ngay.can} ${cal.ngay.chi}`,
                nguyetLenhShort: `${cal.thang.can} ${cal.thang.chi}`,
                shenshaRaw: shensha
            }
        };
    }

    return {
        QUAI_SO,
        getBit,
        calculateHexagramData,
        calculateShenSha,
        TEN_QUE
    };
})();
