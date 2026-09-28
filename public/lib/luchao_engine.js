/**
 * =============================================================================
 * LUC HAO ENGINE - api/luchao_engine.js
 * Bốn khối rà soát tự động theo kiến trúc đa chiều Chu Thần Bân
 * =============================================================================
 *
 * Cấu trúc dữ liệu linesData đầu vào (từ iching_core.js):
 * {
 *   val: 0|1|2|3,         // giá trị gốc của hào
 *   isMoving: bool,        // hào động
 *   relation: string,      // Lục thân (Quan Quỷ, Thê Tài...)
 *   chi: string,           // Địa chi (Tý, Sửu...)
 *   hanh: string,          // Ngũ hành (Kim, Mộc...)
 *   phucThan: {rel, branch} | null,  // Phục thần ẩn bên dưới
 *   isTK: bool,            // Tuần Không
 *   isShi: bool,           // Hào Thế
 *   isYing: bool,          // Hào Ứng
 *   lucThu: string,        // Lục thú (Bạch Hổ, Thanh Long...)
 *   tsNgay: string,        // Trường sinh trạng thái theo Nhật
 *   tsThang: string,       // Trường sinh trạng thái theo Tháng
 *   changed: { relation, branch, hanh },  // Hào biến
 *   isCTK: bool            // Hào biến Tuần Không
 * }
 */

// =============================================================================
// BẢNG TRA CỨU TOÀN CỤC
// =============================================================================
const KHAC_MAP = {
    'Kim': 'Mộc', 'Mộc': 'Thổ', 'Thổ': 'Thủy', 'Thủy': 'Hỏa', 'Hỏa': 'Kim'
};

const SINH_MAP = {
    'Thủy': 'Mộc', 'Mộc': 'Hỏa', 'Hỏa': 'Thổ', 'Thổ': 'Kim', 'Kim': 'Thủy'
};

const XUNG_MAP = {
    'Tý': 'Ngọ', 'Ngọ': 'Tý',
    'Sửu': 'Mùi', 'Mùi': 'Sửu',
    'Dần': 'Thân', 'Thân': 'Dần',
    'Mão': 'Dậu', 'Dậu': 'Mão',
    'Thìn': 'Tuất', 'Tuất': 'Thìn',
    'Tỵ': 'Hợi', 'Hợi': 'Tỵ'
};

const HOP_MAP = {
    'Tý': 'Sửu', 'Sửu': 'Tý',
    'Dần': 'Hợi', 'Hợi': 'Dần',
    'Mão': 'Tuất', 'Tuất': 'Mão',
    'Thìn': 'Dậu', 'Dậu': 'Thìn',
    'Tỵ': 'Thân', 'Thân': 'Tỵ',
    'Ngọ': 'Mùi', 'Mùi': 'Ngọ'
};

// Bảng Ngũ Hành theo Địa Chi
const NGU_HANH_CHI = {
    'Tý': 'Thủy', 'Sửu': 'Thổ', 'Dần': 'Mộc', 'Mão': 'Mộc',
    'Thìn': 'Thổ', 'Tỵ': 'Hỏa', 'Ngọ': 'Hỏa', 'Mùi': 'Thổ',
    'Thân': 'Kim', 'Dậu': 'Kim', 'Tuất': 'Thổ', 'Hợi': 'Thủy'
};

// Bảng Tiến Thoái Thần
const TIEN_THOAI_MAP = {
    // Tiến: chi hóa ra là bước đi tiếp theo trong chu kỳ
    tien: {
        'Dần': 'Mão', 'Mão': 'Thìn', 'Thìn': 'Tỵ', 'Tỵ': 'Ngọ',
        'Ngọ': 'Mùi', 'Mùi': 'Thân', 'Thân': 'Dậu', 'Dậu': 'Tuất',
        'Tuất': 'Hợi', 'Hợi': 'Tý', 'Tý': 'Sửu', 'Sửu': 'Dần'
    },
    // Thoái: chi hóa ra là bước lùi lại
    thoai: {
        'Mão': 'Dần', 'Thìn': 'Mão', 'Tỵ': 'Thìn', 'Ngọ': 'Tỵ',
        'Mùi': 'Ngọ', 'Thân': 'Mùi', 'Dậu': 'Thân', 'Tuất': 'Dậu',
        'Hợi': 'Tuất', 'Tý': 'Hợi', 'Sửu': 'Tý', 'Dần': 'Sửu'
    }
};

// Bảng Trường Sinh - Vượng/Tướng/Hưu/Tù/Tử theo Tháng
const VUONG_TUONG_THU_TU_TU = {
    'Xuân': { vuong: 'Mộc', tuong: 'Hỏa', huu: 'Thủy', tu: 'Kim', tu2: 'Thổ' },
    'Hạ':   { vuong: 'Hỏa', tuong: 'Thổ', huu: 'Mộc', tu: 'Thủy', tu2: 'Kim' },
    'Thu':  { vuong: 'Kim', tuong: 'Thủy', huu: 'Thổ', tu: 'Hỏa', tu2: 'Mộc' },
    'Đông': { vuong: 'Thủy', tuong: 'Mộc', huu: 'Kim', tu: 'Thổ', tu2: 'Hỏa' }
};

// Ánh xạ tháng sang mùa
function getSeasonFromMonthChi(monthChi) {
    if (['Dần', 'Mão', 'Thìn'].includes(monthChi)) return 'Xuân';
    if (['Tỵ', 'Ngọ', 'Mùi'].includes(monthChi)) return 'Hạ';
    if (['Thân', 'Dậu', 'Tuất'].includes(monthChi)) return 'Thu';
    if (['Hợi', 'Tý', 'Sửu'].includes(monthChi)) return 'Đông';
    return 'Xuân';
}

// Đánh giá lực lượng Ngũ Hành theo tháng
function evaluatePower(hanh, monthChi) {
    const season = getSeasonFromMonthChi(monthChi);
    const table = VUONG_TUONG_THU_TU_TU[season];
    if (table.vuong === hanh) return 'Vượng';
    if (table.tuong === hanh) return 'Tướng';
    if (table.huu === hanh) return 'Hưu';
    if (table.tu === hanh || table.tu2 === hanh) return 'Tù/Tử';
    return 'Bình';
}

// =============================================================================
// KHỐI 1: HÀM QUÉT PHỤC THẦN
// Kích hoạt khi Dụng Thần không xuất hiện trên 6 hào chính diện
// =============================================================================
export function scanPhucThan(linesData, targetRelation) {
    const result = {
        found: false,
        phucIdx: -1,
        phucLine: null,
        hostLine: null,
        hostIdx: -1,
        codes: []
    };

    // Kiểm tra xem Dụng thần có trên 6 hào mặt không
    const hasOnSurface = linesData.some(l => l.relation === targetRelation);
    if (hasOnSurface) {
        return result; // Không cần quét Phục Thần
    }

    // Không tìm thấy trên bề mặt -> Kích hoạt rà soát Phục Thần
    for (let i = 0; i < linesData.length; i++) {
        const line = linesData[i];
        if (line.phucThan && line.phucThan.rel === targetRelation.split(' ')[0]) {
            result.found = true;
            result.phucIdx = i;
            result.phucLine = line.phucThan;
            result.hostLine = line;
            result.hostIdx = i;

            // Phân tích tương quan Phục Thần với Phi Thần (hào bên trên)
            const phucHanh = NGU_HANH_CHI[line.phucThan.branch] || 'Thổ';
            const phiHanh = line.hanh;

            if (KHAC_MAP[phiHanh] === phucHanh) {
                // Phi thần khắc Phục thần -> Phục thần bị áp chế
                result.codes.push('PHUC_THAN_BI_PHI_KHAC');
            } else if (SINH_MAP[phiHanh] === phucHanh) {
                // Phi thần sinh Phục thần -> Phục thần được nâng đỡ
                result.codes.push('PHUC_THAN_DUOC_PHI_SINH');
            } else if (KHAC_MAP[phucHanh] === phiHanh) {
                // Phục thần khắc Phi thần -> Phục thần đang cố vượt ra ngoài
                result.codes.push('PHUC_THAN_KHAC_PHI');
            } else {
                result.codes.push('PHUC_THAN_TRUNG_HOA');
            }

            // Kiểm tra Phục Thần có bị Tuần Không không (dùng Tuần Không của hào chủ)
            if (line.isTK) {
                result.codes.push('PHUC_THAN_CUNG_CHU_TK');
            }

            // Tên vị trí Phục Thần
            result.codes.push(`PHUC_THAN_HAO_${i + 1}`);
            break;
        }
    }

    if (!result.found) {
        // Dụng thần ẩn hoàn toàn không tìm ra được
        result.codes.push('PHUC_THAN_KHONG_TIM_THAY');
    }

    return result;
}

// =============================================================================
// KHỐI 2: HÀM NHÚNG TRỤC THỜI GIAN
// Nhật lệnh & Nguyệt lệnh tương tác với toàn bộ hệ thống hào
// =============================================================================
export function injectTemporalAxis(linesData, dayChi, monthChi, phucThanResult) {
    const enrichedLines = linesData.map((line, i) => {
        const isXungDay = XUNG_MAP[line.chi] === dayChi;
        const isHopDay = HOP_MAP[line.chi] === dayChi;
        const isXungMonth = XUNG_MAP[line.chi] === monthChi;
        const isHopMonth = HOP_MAP[line.chi] === monthChi;
        const isMoDay = (line.tsNgay === 'Mộ');
        const isMoMonth = (line.tsThang === 'Mộ');

        // Lực lượng theo mùa/tháng
        const powerLevel = evaluatePower(line.hanh, monthChi);
        const isVuongOrTuong = ['Vượng', 'Tướng'].includes(powerLevel);
        const isSuy = ['Hưu', 'Tù/Tử'].includes(powerLevel);

        // Phát hiện Ám Động (Hào tĩnh Vượng bị Nhật xung)
        const isAmDong = !line.isMoving && isXungDay && isVuongOrTuong;

        // Phát hiện Nhật Phá (Hào tĩnh Suy bị Nhật xung)
        const isNhatPha = !line.isMoving && isXungDay && isSuy;

        // Phát hiện Nguyệt Phá (Hào bị Tháng xung)
        const isNguyetPha = isXungMonth;

        // Phát hiện Nhật Sinh (Nhật lệnh sinh Hào)
        const isNhatSinh = SINH_MAP[NGU_HANH_CHI[dayChi]] === line.hanh;

        // Phát hiện Nhật Khắc (Nhật lệnh khắc Hào)
        const isNhatKhac = KHAC_MAP[NGU_HANH_CHI[dayChi]] === line.hanh;

        // Phát hiện Nguyệt Sinh (Nguyệt lệnh sinh Hào)
        const isNguyetSinh = SINH_MAP[NGU_HANH_CHI[monthChi]] === line.hanh;

        // Phát hiện Nguyệt Khắc (Nguyệt lệnh khắc Hào)
        const isNguyetKhac = KHAC_MAP[NGU_HANH_CHI[monthChi]] === line.hanh;

        // --- TÍNH TOÁN THẦN SÁT (CHU THẦN BÂN) ---
        // 1. Dịch Mã: Thân Tý Thìn -> Dần; Tị Dậu Sửu -> Hợi; Dần Ngọ Tuất -> Thân; Hợi Mão Mùi -> Tị.
        let isDichMa = false;
        if (['Thân', 'Tý', 'Thìn'].includes(dayChi) && line.chi === 'Dần') isDichMa = true;
        if (['Tỵ', 'Dậu', 'Sửu'].includes(dayChi) && line.chi === 'Hợi') isDichMa = true;
        if (['Dần', 'Ngọ', 'Tuất'].includes(dayChi) && line.chi === 'Thân') isDichMa = true;
        if (['Hợi', 'Mão', 'Mùi'].includes(dayChi) && line.chi === 'Tỵ') isDichMa = true;

        // 2. Đào Hoa: Thân Tý Thìn -> Dậu; Tị Dậu Sửu -> Ngọ; Dần Ngọ Tuất -> Mão; Hợi Mão Mùi -> Tý.
        let isDaoHoa = false;
        if (['Thân', 'Tý', 'Thìn'].includes(dayChi) && line.chi === 'Dậu') isDaoHoa = true;
        if (['Tỵ', 'Dậu', 'Sửu'].includes(dayChi) && line.chi === 'Ngọ') isDaoHoa = true;
        if (['Dần', 'Ngọ', 'Tuất'].includes(dayChi) && line.chi === 'Mão') isDaoHoa = true;
        if (['Hợi', 'Mão', 'Mùi'].includes(dayChi) && line.chi === 'Tý') isDaoHoa = true;

        // 3. Hoa Cái: Thân Tý Thìn -> Thìn; Tị Dậu Sửu -> Sửu; Dần Ngọ Tuất -> Tuất; Hợi Mão Mùi -> Mùi.
        let isHoaCai = false;
        if (['Thân', 'Tý', 'Thìn'].includes(dayChi) && line.chi === 'Thìn') isHoaCai = true;
        if (['Tỵ', 'Dậu', 'Sửu'].includes(dayChi) && line.chi === 'Sửu') isHoaCai = true;
        if (['Dần', 'Ngọ', 'Tuất'].includes(dayChi) && line.chi === 'Tuất') isHoaCai = true;
        if (['Hợi', 'Mão', 'Mùi'].includes(dayChi) && line.chi === 'Mùi') isHoaCai = true;

        // Hào biến cũng phải qua trục thời gian
        let changedTemporal = null;
        if (line.isMoving && line.changed) {
            const cChi = line.changed.branch;
            const cHanh = line.changed.hanh;
            changedTemporal = {
                isXungDay: XUNG_MAP[cChi] === dayChi,
                isXungMonth: XUNG_MAP[cChi] === monthChi,
                isHopDay: HOP_MAP[cChi] === dayChi,
                isHopMonth: HOP_MAP[cChi] === monthChi,
                isTK: line.isCTK,
                powerLevel: evaluatePower(cHanh, monthChi)
            };
        }

        // Phục Thần cũng phải qua trục thời gian
        let phucTemporal = null;
        if (phucThanResult && phucThanResult.phucIdx === i && phucThanResult.phucLine) {
            const pChi = phucThanResult.phucLine.branch;
            const pHanh = NGU_HANH_CHI[pChi] || 'Thổ';
            phucTemporal = {
                isXungDay: XUNG_MAP[pChi] === dayChi,
                isNguyetPha: XUNG_MAP[pChi] === monthChi,
                powerLevel: evaluatePower(pHanh, monthChi)
            };
        }

        return {
            ...line,
            // Trục thời gian
            powerLevel,
            isVuongOrTuong,
            isSuy,
            isAmDong,
            isNhatPha,
            isNguyetPha,
            isNhatSinh,
            isNhatKhac,
            isNguyetSinh,
            isNguyetKhac,
            isHopDay,
            isHopMonth,
            isMoDay,
            isMoMonth,
            // Thần sát
            isDichMa,
            isDaoHoa,
            isHoaCai,
            // Trục thời gian của hào biến
            changedTemporal,
            // Trục thời gian của phục thần (nếu có)
            phucTemporal
        };
    });

    return enrichedLines;
}

// =============================================================================
// KHỐI 3: HÀM KHÓA VÉC TƠ NĂNG LƯỢNG
// Gom hào động + hào biến thành một tổ hợp duy nhất
// =============================================================================
export function lockEnergyVector(enrichedLines) {
    const vectors = [];

    for (let i = 0; i < enrichedLines.length; i++) {
        const line = enrichedLines[i];
        if (!line.isMoving) continue;

        const mainHanh = line.hanh;
        const changedHanh = line.changed.hanh;
        const mainChi = line.chi;
        const changedChi = line.changed.branch;

        // Hướng đi: Hồi đầu khắc / Hồi đầu sinh / Tiến thần / Thoái thần / Trung bình
        let vector = 'TRUNG_BINH';
        let vectorText = '';

        const isHoiDauKhac = KHAC_MAP[changedHanh] === mainHanh;
        const isHoiDauSinh = SINH_MAP[changedHanh] === mainHanh;

        if (isHoiDauKhac) {
            vector = 'HOI_DAU_KHAC';
            vectorText = 'Hồi đầu khắc: Hào động hóa ra hào biến quay lại khắc chính mình. Việc mưu cầu thoạt trông đẹp đẽ nhưng kết quả phá vỡ tan tành.';
        } else if (isHoiDauSinh) {
            vector = 'HOI_DAU_SINH';
            vectorText = 'Hồi đầu sinh: Hào biến sinh lại hào động. Việc khởi đầu gian nan nhưng về sau được trợ giúp mạnh mẽ, tình thế càng về sau càng tốt đẹp.';
        } else if (TIEN_THOAI_MAP.tien[mainChi] === changedChi) {
            vector = 'HOA_TIEN_THAN';
            vectorText = 'Hóa Tiến Thần: Hào động biến sang chi kế tiếp. Sự việc đang leo dốc lên, lực lượng ngày càng mạnh thêm, hướng đi tốt đẹp.';
        } else if (TIEN_THOAI_MAP.thoai[mainChi] === changedChi) {
            vector = 'HOA_THOAI_THAN';
            vectorText = 'Hóa Thoái Thần: Hào động biến về chi trước. Sự việc đang mất đà, lực lượng thoái bộ, cần thận trọng hơn.';
        } else {
            vector = 'BINH_HOA';
            vectorText = 'Hào động hóa bình thường, không có hiện tượng đặc biệt về hướng đi.';
        }

        // Kiểm tra thêm hào biến có bị Tuần Không không
        if (line.isCTK) {
            vectorText += ' Tuy nhiên hào biến lâm Không, năng lượng chuyển hóa bị trống rỗng chưa thể hiện.';
        }

        // Kiểm tra trục thời gian của hào biến
        if (line.changedTemporal) {
            if (line.changedTemporal.isXungMonth) vectorText += ' Hào biến bị Nguyệt xung phá, lực lượng hóa ra bị tiêu tán.';
            if (line.changedTemporal.isHopDay) vectorText += ' Hào biến được Nhật hợp, năng lượng hóa ra được cố kết bền vững.';
        }

        vectors.push({
            lineIdx: i,
            lineNum: i + 1,
            relation: line.relation,
            isShi: line.isShi,
            mainChi,
            mainHanh,
            changedChi,
            changedHanh,
            changedRelation: line.changed.relation,
            vector,
            vectorText,
            code: `VECTOR_HAO_${i + 1}_${vector}`
        });
    }

    return vectors;
}

// =============================================================================
// KHỐI 4: HÀM GOM TRÙNG ĐIỆP VI MÔ
// Nhồi nhiều lớp thuộc tính của cùng một hào thành từ khóa compound
// =============================================================================
export function aggregateMicroOverlap(enrichedLines, hexProperties) {
    const compoundCodes = [];

    for (let i = 0; i < enrichedLines.length; i++) {
        const line = enrichedLines[i];

        // --- Mã hóa Lục Thân ---
        const lucThanCode = encodeRelation(line.relation);
        // --- Mã hóa Ngũ Hành ---
        const hanhCode = encodeHanh(line.hanh);
        // --- Mã hóa Lục Thú ---
        const lucThuCode = encodeLucThu(line.lucThu);
        // --- Trạng thái Tuần Không ---
        const tkCode = line.isTK ? 'TK' : '';
        // --- Trạng thái Ám Động ---
        const adCode = line.isAmDong ? 'AD' : '';
        // --- Trạng thái Nguyệt Phá ---
        const npCode = line.isNguyetPha ? 'NP' : '';
        // --- Trạng thái Mộ ---
        const moCode = (line.isMoDay || line.isMoMonth) ? 'MO' : '';
        // --- Vai trò Hào ---
        const roleCode = line.isShi ? 'THE' : line.isYing ? 'UNG' : `HAO${i + 1}`;

        // Gom tất cả vào compound code (loại bỏ phần rỗng)
        const parts = [roleCode, lucThanCode, hanhCode, lucThuCode, tkCode, adCode, npCode, moCode]
            .filter(p => p !== '');
        const compoundKey = parts.join('_');

        // Mã đơn từng chiều (để DB lookup riêng)
        const singleCodes = [];

        // Compound code đặc trưng theo vai trò
        if (line.isShi) {
            singleCodes.push(`THE_TRI_${lucThanCode}`);
            singleCodes.push(`THE_LUC_THU_${lucThuCode}`);
            singleCodes.push(`THE_HANH_${hanhCode}`);
            if (line.isTK) singleCodes.push('THE_STATUS_TUAN_KHONG');
            if (line.isNguyetPha) singleCodes.push('THE_STATUS_NGUYET_PHA');
            if (line.isAmDong) singleCodes.push('THE_STATUS_AM_DONG');
            if (line.isMoDay || line.isMoMonth) singleCodes.push('THE_STATUS_MO');
            
            // Thế động sinh khắc động học
            if (line.isMoving && line.changed) {
                const mainHanh = line.hanh;
                const changedHanh = line.changed.hanh;
                if (KHAC_MAP[changedHanh] === mainHanh) {
                    singleCodes.push('THE_STATUS_HOI_DAU_KHAC');
                } else if (SINH_MAP[changedHanh] === mainHanh) {
                    singleCodes.push('THE_STATUS_HOI_DAU_SINH');
                }
                if (line.changed.relation === 'Quan Quỷ') {
                    singleCodes.push('THE_STATUS_HOA_QUY');
                }
            }
        }

        if (line.isYing) {
            singleCodes.push(`UNG_TRI_${lucThanCode}`);
            singleCodes.push(`UNG_LUC_THU_${lucThuCode}`);
        }

        // Nếu là hào có vai trò Dụng Thần
        // (caller sẽ check riêng, nhưng ta vẫn phát sinh mã)
        singleCodes.push(`H${i + 1}_${lucThanCode}_${lucThuCode}`);

        // Phát hiện tổ hợp đặc biệt (Compound Pattern)
        // Ví dụ: Huyền Vũ + Thủy + Tuần Không = Lừa dối bế tắc
        if (lucThuCode === 'HUYEN_VU' && hanhCode === 'THUY' && line.isTK) {
            singleCodes.push('PATTERN_HUYEN_VU_THUY_TK_LANG_GIAN');
        }
        // Bạch Hổ + Động = Tai nạn bệnh tật đang kích hoạt
        if (lucThuCode === 'BACH_HO' && line.isMoving) {
            singleCodes.push('PATTERN_BACH_HO_DONG_TAI_BENH');
        }
        // Đằng Xà + Tuần Không + Hào Thế = Lo âu không có thực
        if (lucThuCode === 'DANG_XA' && line.isTK && line.isShi) {
            singleCodes.push('PATTERN_THE_DANG_XA_TK_LO_AO');
        }
        // Thanh Long + Thê Tài + Động = Tài lộc cát khánh
        if (lucThuCode === 'THANH_LONG' && lucThanCode === 'THE_TAI' && line.isMoving) {
            singleCodes.push('PATTERN_THANH_LONG_TAI_DONG_TIN_VUI');
        }
        // Chu Tước + Quan Quỷ + Động = Cãi vã tranh chấp
        if (lucThuCode === 'CHU_TUOC' && lucThanCode === 'QUAN_QUY' && line.isMoving) {
            singleCodes.push('PATTERN_CHU_TUOC_QUAN_DONG_TRANH_CHAP');
        }
        // Đằng Xà + Quan Quỷ + Động = Thay đổi bất ngờ áp lực lớn
        if (lucThuCode === 'DANG_XA' && lucThanCode === 'QUAN_QUY' && line.isMoving) {
            singleCodes.push('PATTERN_DANG_XA_QUAN_DONG_AP_LUC');
        }
        // Chu Tước + Phụ Mẫu + Động = Hợp đồng, văn bản bổ nhiệm chính thức
        if (lucThuCode === 'CHU_TUOC' && lucThanCode === 'PHU_MAU' && line.isMoving) {
            singleCodes.push('PATTERN_CHU_TUOC_PHU_DONG_VAN_BAN');
        }
        // Huyền Vũ + Thê Tài + Tuần Không = Thất thoát tiền bạc mờ ám
        if (lucThuCode === 'HUYEN_VU' && lucThanCode === 'THE_TAI' && line.isTK) {
            singleCodes.push('PATTERN_HUYEN_VU_TAI_TK_THAT_THOAT');
        }
        // Bạch Hổ + Huynh Đệ + Động = Đối thủ ra đòn tranh đoạt gay gắt
        if (lucThuCode === 'BACH_HO' && lucThanCode === 'HUYNH_DE' && line.isMoving) {
            singleCodes.push('PATTERN_BACH_HO_HUYNH_DONG_TRANH_DOAT');
        }

        // --- CÁC LUẬT THẦN SÁT MỚI (BÍ KÍP RÚT GỌN) ---
        if (line.isDichMa && line.isMoving) {
            singleCodes.push('PATTERN_DICH_MA_DONG_BIEN_DONG');
        }
        if (line.isDaoHoa && line.isMoving) {
            singleCodes.push('PATTERN_DAO_HOA_DONG_DUYEN_VONG');
        }
        if (line.isHoaCai && line.isMoving) {
            singleCodes.push('PATTERN_HOA_CAI_DONG_NGHE_THUAT');
        }

        // Huynh Đệ + Nguyệt Phá + Hào Thế = Bạn bè phản bội, hao tài
        if (lucThanCode === 'HUYNH_DE' && line.isNguyetPha && line.isShi) {
            singleCodes.push('PATTERN_THE_HUYNH_NP_PHAN_BOI');
        }
        // Tử Tôn + Vượng + Dụng (khi chủ đề là công việc) = Giải nạn
        if (lucThanCode === 'TU_TON' && line.isVuongOrTuong) {
            singleCodes.push('PATTERN_TU_TON_VUONG_GIAI_NAN');
        }

        compoundCodes.push({
            lineIdx: i,
            lineNum: i + 1,
            compoundKey,
            singleCodes,
            // Dữ liệu thô để debug
            _debug: {
                relation: line.relation,
                chi: line.chi,
                hanh: line.hanh,
                lucThu: line.lucThu,
                isTK: line.isTK,
                isAmDong: line.isAmDong,
                isNguyetPha: line.isNguyetPha,
                isShi: line.isShi,
                isYing: line.isYing,
                powerLevel: line.powerLevel
            }
        });
    }

    // Gom thêm mã hóa cấp quẻ (Quẻ tĩnh/động, họ quẻ, trạng thái đặc biệt)
    const hexLevelCodes = [];
    const hasMoving = enrichedLines.some(l => l.isMoving);
    hexLevelCodes.push(hasMoving ? 'QUE_DONG' : 'QUE_TINH');

    if (hexProperties) {
        if (hexProperties.isLucXung) hexLevelCodes.push('PROPERTY_LUC_XUNG');
        if (hexProperties.isLucHop) hexLevelCodes.push('PROPERTY_LUC_HOP');
        if (hexProperties.isDuHon) hexLevelCodes.push('PROPERTY_DU_HON');
        if (hexProperties.isQuyHon) hexLevelCodes.push('PROPERTY_QUY_HON');
        if (hexProperties.isPhanNgam) hexLevelCodes.push('PROPERTY_PHAN_NGAM');
        if (hexProperties.isPhucNgam) hexLevelCodes.push('PROPERTY_PHUC_NGAM');
        if (hexProperties.palace) hexLevelCodes.push(`PALACE_${hexProperties.palace.toUpperCase()}`);
    }

    return { compoundCodes, hexLevelCodes };
}

// =============================================================================
// HÀM TỔNG HỢP - Chạy toàn bộ 4 khối và trả về bộ mã hóa hoàn chỉnh
// =============================================================================
export function runFullEngineAnalysis(hexData, topic, gender) {
    const linesData = hexData.linesData;
    const dayChi = (hexData?.dateInfo?.nhatThan || '').split(' - ')[0].trim();
    const monthChi = (hexData?.dateInfo?.nguyetLenh || '').split(' - ')[0].trim();

    // Xác định Dụng Thần theo chủ đề và giới tính
    const deityMap = {
        'công việc': 'Quan Quỷ', 'thi cử': 'Phụ Mẫu',
        'tình yêu': gender === 'Nam' ? 'Thê Tài' : 'Quan Quỷ',
        'hôn nhân': gender === 'Nam' ? 'Thê Tài' : 'Quan Quỷ',
        'sức khỏe': 'Tử Tôn', 'kinh doanh': 'Thê Tài', 'dự án': 'Thê Tài',
        'tìm kiếm': 'Thê Tài', 'thai sản': 'Tử Tôn',
        'ông bà cha mẹ': 'Phụ Mẫu', 'con cháu': 'Tử Tôn',
        'anh em': 'Huynh Đệ',
        'phong thủy': 'Thê Tài',
        'kiện tụng': 'Quan Quỷ'
    };
    const targetRelation = deityMap[topic] || 'Quan Quỷ';

    // KHỐI 1: Quét Phục Thần
    const phucThanResult = scanPhucThan(linesData, targetRelation);

    // KHỐI 2: Nhúng Trục Thời Gian vào mọi hào
    const enrichedLines = injectTemporalAxis(linesData, dayChi, monthChi, phucThanResult);

    // KHỐI 3: Khóa Véc Tơ Năng Lượng cho mọi hào động
    const energyVectors = lockEnergyVector(enrichedLines);

    // KHỐI 4: Gom Trùng Điệp Vi Mô
    const hexProperties = {
        palace: hexData.palace || '',
        isLucXung: hexData.attribute === 'Lục Xung',
        isLucHop: hexData.attribute === 'Lục Hợp',
        isDuHon: hexData.type === 'Du Hồn',
        isQuyHon: hexData.type === 'Quy Hồn',
        isPhanNgam: (hexData.ngamResult || []).some(s => s.includes('Phản')),
        isPhucNgam: (hexData.ngamResult || []).some(s => s.includes('Phục'))
    };
    const { compoundCodes, hexLevelCodes } = aggregateMicroOverlap(enrichedLines, hexProperties);

    // Xác định Dụng Thần Index (bao gồm Phục Thần)
    let dungThanIdx = enrichedLines.findIndex(l => l.relation === targetRelation && l.isShi);
    if (dungThanIdx === -1) dungThanIdx = enrichedLines.findIndex(l => l.isMoving && l.relation === targetRelation);
    if (dungThanIdx === -1) dungThanIdx = enrichedLines.findIndex(l => l.relation === targetRelation);

    // Tổng hợp mã hóa Dụng Thần
    const dungThanCodes = [];
    if (dungThanIdx !== -1) {
        const dt = enrichedLines[dungThanIdx];
        dungThanCodes.push(`DUNG_TRI_${encodeRelation(dt.relation)}`);
        dungThanCodes.push(`DUNG_LUC_THU_${encodeLucThu(dt.lucThu)}`);
        if (dt.isVuongOrTuong) dungThanCodes.push('DUNG_STATUS_VUONG');
        else dungThanCodes.push('DUNG_STATUS_SUY');
        if (dt.isTK) dungThanCodes.push('DUNG_STATUS_TUAN_KHONG');
        if (dt.isNguyetPha) dungThanCodes.push('DUNG_STATUS_NGUYET_PHA');
        if (dt.isAmDong) dungThanCodes.push('DUNG_STATUS_AM_DONG');
        if (dt.isNhatPha) dungThanCodes.push('DUNG_STATUS_NHAT_PHA');
        if (dt.isMoDay || dt.isMoMonth) dungThanCodes.push('DUNG_STATUS_MO');
    } else if (phucThanResult.found) {
        dungThanCodes.push('DUNG_STATUS_PHUC_THAN');
        dungThanCodes.push(...phucThanResult.codes);
    } else {
        dungThanCodes.push('DUNG_STATUS_KHONG_CO_MAT');
    }

    // Tổng hợp mã hóa Véc Tơ Năng Lượng
    const vectorCodes = energyVectors.map(v => v.code);
    const vectorTexts = energyVectors.map(v => ({ lineNum: v.lineNum, text: v.vectorText }));

    // Tổng hợp toàn bộ mã hóa thành 1 flat array gửi lên DB
    const allCodes = [
        ...hexLevelCodes,
        ...dungThanCodes,
        ...vectorCodes,
        ...compoundCodes.flatMap(c => c.singleCodes)
    ];
    // Loại bỏ trùng
    const uniqueCodes = [...new Set(allCodes)];

    return {
        targetRelation,
        phucThanResult,
        enrichedLines,
        energyVectors,
        vectorTexts,
        compoundCodes,
        hexLevelCodes,
        dungThanCodes,
        allCodes: uniqueCodes
    };
}

// =============================================================================
// HELPER ENCODERS
// =============================================================================
function encodeRelation(rel) {
    const map = {
        'Phụ Mẫu': 'PHU_MAU',
        'Quan Quỷ': 'QUAN_QUY',
        'Huynh Đệ': 'HUYNH_DE',
        'Thê Tài': 'THE_TAI',
        'Tử Tôn': 'TU_TON'
    };
    for (const key of Object.keys(map)) {
        if (rel.includes(key)) return map[key];
    }
    return 'UNKNOWN';
}

function encodeHanh(hanh) {
    const map = {
        'Kim': 'KIM', 'Mộc': 'MOC', 'Thủy': 'THUY', 'Hỏa': 'HOA', 'Thổ': 'THO'
    };
    return map[hanh] || 'UNKNOWN';
}

function encodeLucThu(thu) {
    const map = {
        'Thanh Long': 'THANH_LONG',
        'Chu Tước': 'CHU_TUOC',
        'Câu Trần': 'CAU_TRAN',
        'Đằng Xà': 'DANG_XA',
        'Bạch Hổ': 'BACH_HO',
        'Huyền Vũ': 'HUYEN_VU'
    };
    for (const key of Object.keys(map)) {
        if ((thu || '').includes(key)) return map[key];
    }
    return 'UNKNOWN';
}
