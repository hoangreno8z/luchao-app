/**
 * traditionalDignities.js - Bảng Phẩm Giá Bản Chất (Essential Dignities)
 * Source: William Lilly, Christian Astrology (1647), Chapter XIX, p.104
 * "The Table of Essentiall Dignities of the Planets"
 *
 * Bao gồm:
 * 1. Domicile (Bản vị / Chủ cung) - Điểm +5
 * 2. Exaltation (Tôn quý / Đắc địa) - Điểm +4
 * 3. Triplicity (Tam hợp ngũ hành Ngày/Đêm theo Lilly/Ptolemy) - Điểm +3
 * 4. Terms (Giới hạn theo hệ Ai Cập / Lilly p.104) - Điểm +2
 * 5. Face / Decan (Thập phân độ theo thứ tự Chaldean) - Điểm +1
 * 6. Detriment (Hãm / Suy cung - cung đối diện Domicile) - Điểm -5
 * 7. Fall (Rơi đài / Tổn thương - cung đối diện Exaltation) - Điểm -4
 * 8. Peregrine (Lãng tử / Vô gia cư - không có bất kỳ phẩm giá nào ở trên) - Điểm -5
 */

// Bảng Tôn Quý (Exaltation) và Rơi Đài (Fall) - Kèm độ cực đại (Exact degree)
export const EXALTATIONS = {
    sun: { sign: 'aries', degree: 19, fallSign: 'libra', fallDegree: 19 },
    moon: { sign: 'taurus', degree: 3, fallSign: 'scorpio', fallDegree: 3 },
    mercury: { sign: 'virgo', degree: 15, fallSign: 'pisces', fallDegree: 15 },
    venus: { sign: 'pisces', degree: 27, fallSign: 'virgo', fallDegree: 27 },
    mars: { sign: 'capricorn', degree: 28, fallSign: 'cancer', fallDegree: 28 },
    jupiter: { sign: 'cancer', degree: 15, fallSign: 'capricorn', fallDegree: 15 },
    saturn: { sign: 'libra', degree: 21, fallSign: 'aries', fallDegree: 21 },
    northNode: { sign: 'gemini', degree: 3, fallSign: 'sagittarius', fallDegree: 3 },
    southNode: { sign: 'sagittarius', degree: 3, fallSign: 'gemini', fallDegree: 3 }
};

// Bảng Bản Vị (Domicile) và Hãm (Detriment)
export const DOMICILES = {
    sun: { signs: ['leo'], detrimentSigns: ['aquarius'] },
    moon: { signs: ['cancer'], detrimentSigns: ['capricorn'] },
    mercury: { signs: ['gemini', 'virgo'], detrimentSigns: ['sagittarius', 'pisces'] },
    venus: { signs: ['taurus', 'libra'], detrimentSigns: ['scorpio', 'aries'] },
    mars: { signs: ['aries', 'scorpio'], detrimentSigns: ['libra', 'taurus'] },
    jupiter: { signs: ['sagittarius', 'pisces'], detrimentSigns: ['gemini', 'virgo'] },
    saturn: { signs: ['capricorn', 'aquarius'], detrimentSigns: ['cancer', 'leo'] }
};

// Bảng Tam Hợp (Triplicity) theo William Lilly p.104
// Hỏa: Ngày = Mặt Trời, Đêm = Mộc Tinh
// Thổ: Ngày = Kim Tinh, Đêm = Mặt Trăng
// Khí: Ngày = Thổ Tinh, Đêm = Thủy Tinh
// Thủy: Ngày & Đêm = Hỏa Tinh (Theo Lilly / Ptolemy Water triplicity is Mars)
export const TRIPLICITIES = {
    fire: { day: 'sun', night: 'jupiter', signs: ['aries', 'leo', 'sagittarius'] },
    earth: { day: 'venus', night: 'moon', signs: ['taurus', 'virgo', 'capricorn'] },
    air: { day: 'saturn', night: 'mercury', signs: ['gemini', 'libra', 'aquarius'] },
    water: { day: 'mars', night: 'mars', signs: ['cancer', 'scorpio', 'pisces'] }
};

// Bảng Terms (Giới Hạn) theo William Lilly p.104 (Hệ Ai Cập truyền thống)
// Cấu trúc: [độ kết thúc, hành tinh] trong mỗi cung từ 0 đến 30 độ
export const TERMS_LILLY = {
    aries: [
        { maxDeg: 6, planet: 'jupiter' },
        { maxDeg: 12, planet: 'venus' },
        { maxDeg: 20, planet: 'mercury' },
        { maxDeg: 25, planet: 'mars' },
        { maxDeg: 30, planet: 'saturn' }
    ],
    taurus: [
        { maxDeg: 8, planet: 'venus' },
        { maxDeg: 14, planet: 'mercury' },
        { maxDeg: 22, planet: 'jupiter' },
        { maxDeg: 27, planet: 'saturn' },
        { maxDeg: 30, planet: 'mars' }
    ],
    gemini: [
        { maxDeg: 6, planet: 'mercury' },
        { maxDeg: 12, planet: 'jupiter' },
        { maxDeg: 17, planet: 'venus' },
        { maxDeg: 24, planet: 'mars' },
        { maxDeg: 30, planet: 'saturn' }
    ],
    cancer: [
        { maxDeg: 7, planet: 'mars' },
        { maxDeg: 13, planet: 'venus' },
        { maxDeg: 19, planet: 'mercury' },
        { maxDeg: 26, planet: 'jupiter' },
        { maxDeg: 30, planet: 'saturn' }
    ],
    leo: [
        { maxDeg: 6, planet: 'jupiter' },
        { maxDeg: 11, planet: 'venus' },
        { maxDeg: 18, planet: 'saturn' },
        { maxDeg: 24, planet: 'mercury' },
        { maxDeg: 30, planet: 'mars' }
    ],
    virgo: [
        { maxDeg: 7, planet: 'mercury' },
        { maxDeg: 17, planet: 'venus' },
        { maxDeg: 21, planet: 'jupiter' },
        { maxDeg: 28, planet: 'mars' },
        { maxDeg: 30, planet: 'saturn' }
    ],
    libra: [
        { maxDeg: 6, planet: 'saturn' },
        { maxDeg: 14, planet: 'mercury' },
        { maxDeg: 21, planet: 'jupiter' },
        { maxDeg: 28, planet: 'venus' },
        { maxDeg: 30, planet: 'mars' }
    ],
    scorpio: [
        { maxDeg: 7, planet: 'mars' },
        { maxDeg: 11, planet: 'venus' },
        { maxDeg: 19, planet: 'mercury' },
        { maxDeg: 24, planet: 'jupiter' },
        { maxDeg: 30, planet: 'saturn' }
    ],
    sagittarius: [
        { maxDeg: 12, planet: 'jupiter' },
        { maxDeg: 17, planet: 'venus' },
        { maxDeg: 21, planet: 'mercury' },
        { maxDeg: 26, planet: 'saturn' },
        { maxDeg: 30, planet: 'mars' }
    ],
    capricorn: [
        { maxDeg: 7, planet: 'mercury' },
        { maxDeg: 14, planet: 'jupiter' },
        { maxDeg: 22, planet: 'venus' },
        { maxDeg: 26, planet: 'saturn' },
        { maxDeg: 30, planet: 'mars' }
    ],
    aquarius: [
        { maxDeg: 7, planet: 'mercury' },
        { maxDeg: 13, planet: 'venus' },
        { maxDeg: 20, planet: 'jupiter' },
        { maxDeg: 25, planet: 'mars' },
        { maxDeg: 30, planet: 'saturn' }
    ],
    pisces: [
        { maxDeg: 12, planet: 'venus' },
        { maxDeg: 16, planet: 'jupiter' },
        { maxDeg: 19, planet: 'mercury' },
        { maxDeg: 28, planet: 'mars' },
        { maxDeg: 30, planet: 'saturn' }
    ]
};

// Bảng Faces / Decans (Thập phân độ 10°) theo thứ tự Chaldean cổ điển:
// Mars, Sun, Venus, Mercury, Moon, Saturn, Jupiter, lặp lại bắt đầu từ 0° Aries
export const FACES_LILLY = {
    aries: ['mars', 'sun', 'venus'],
    taurus: ['mercury', 'moon', 'saturn'],
    gemini: ['jupiter', 'mars', 'sun'],
    cancer: ['venus', 'mercury', 'moon'],
    leo: ['saturn', 'jupiter', 'mars'],
    virgo: ['sun', 'venus', 'mercury'],
    libra: ['moon', 'saturn', 'jupiter'],
    scorpio: ['mars', 'sun', 'venus'],
    sagittarius: ['mercury', 'moon', 'saturn'],
    capricorn: ['jupiter', 'mars', 'sun'],
    aquarius: ['venus', 'mercury', 'moon'],
    pisces: ['saturn', 'jupiter', 'mars']
};

/**
 * Đánh giá phẩm giá bản chất của một hành tinh tại một vị trí kinh độ
 * @param {string} planetId - 'sun', 'moon', 'mercury', 'venus', 'mars', 'jupiter', 'saturn'
 * @param {number} longitude - Kinh độ hoàng đạo thực [0, 360)
 * @param {boolean} isDayChart - True nếu là lá số ban ngày (Mặt Trời ở nhà 7-12)
 * @returns {object} Chi tiết phẩm giá và điểm số Lilly
 */
export function calculateEssentialDignities(planetId, longitude, isDayChart = true) {
    let norm = longitude % 360;
    if (norm < 0) norm += 360;
    const signIndex = Math.floor(norm / 30) % 12;
    const signList = ['aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo', 'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces'];
    const signId = signList[signIndex];
    const degInSign = norm - signIndex * 30;

    let score = 0;
    let isDomicile = false;
    let isExaltation = false;
    let isDetriment = false;
    let isFall = false;
    let isTriplicity = false;
    let isTerm = false;
    let isFace = false;
    const explanations = [];

    // 1. Domicile & Detriment
    const domInfo = DOMICILES[planetId];
    if (domInfo) {
        if (domInfo.signs.includes(signId)) {
            isDomicile = true;
            score += 5;
            explanations.push(`Bản vị (Domicile) tại ${getSignNameVi(signId)} (+5 điểm)`);
        } else if (domInfo.detrimentSigns.includes(signId)) {
            isDetriment = true;
            score -= 5;
            explanations.push(`Hãm/Suy (Detriment) tại ${getSignNameVi(signId)} do đối diện cung chủ quản (-5 điểm)`);
        }
    }

    // 2. Exaltation & Fall
    const exInfo = EXALTATIONS[planetId];
    if (exInfo) {
        if (exInfo.sign === signId) {
            isExaltation = true;
            score += 4;
            explanations.push(`Tôn quý (Exaltation) tại ${getSignNameVi(signId)} (+4 điểm)`);
        } else if (exInfo.fallSign === signId) {
            isFall = true;
            score -= 4;
            explanations.push(`Tổn thương/Rơi đài (Fall) tại ${getSignNameVi(signId)} do đối diện cung đắc địa (-4 điểm)`);
        }
    }

    // 3. Triplicity (Chỉ tính cho 7 hành tinh chính)
    const element = getSignElement(signId);
    if (element && TRIPLICITIES[element]) {
        const tripRuler = isDayChart ? TRIPLICITIES[element].day : TRIPLICITIES[element].night;
        if (tripRuler === planetId) {
            isTriplicity = true;
            score += 3;
            explanations.push(`Chủ Tam hợp ${getElementNameVi(element)} (${isDayChart ? 'Ban ngày' : 'Ban đêm'}) (+3 điểm)`);
        }
    }

    // 4. Terms
    const signTerms = TERMS_LILLY[signId];
    if (signTerms) {
        for (const t of signTerms) {
            if (degInSign < t.maxDeg) {
                if (t.planet === planetId) {
                    isTerm = true;
                    score += 2;
                    explanations.push(`Thuộc Giới hạn (Term) của chính mình [đến ${t.maxDeg}°] (+2 điểm)`);
                }
                break;
            }
        }
    }

    // 5. Face / Decan
    const signFaces = FACES_LILLY[signId];
    if (signFaces) {
        const faceIndex = Math.min(2, Math.floor(degInSign / 10));
        if (signFaces[faceIndex] === planetId) {
            isFace = true;
            score += 1;
            explanations.push(`Thuộc Thập phân độ (Face) thứ ${faceIndex + 1} (+1 điểm)`);
        }
    }

    // 6. Peregrine (Lãng tử / Vô gia cư)
    const hasAnyDignity = isDomicile || isExaltation || isTriplicity || isTerm || isFace;
    const isPeregrine = !hasAnyDignity && !isDetriment && !isFall;
    if (isPeregrine) {
        score -= 5;
        explanations.push(`Lãng tử (Peregrine): Không có bất kỳ phẩm giá bản chất nào trong cung (-5 điểm)`);
    }

    // Xác định phẩm giá nổi bật nhất
    let primaryStatus = 'Bình thường';
    let primaryStatusClass = 'neutral';
    if (isDomicile) {
        primaryStatus = 'Bản vị (Vững mạnh)';
        primaryStatusClass = 'positive';
    } else if (isExaltation) {
        primaryStatus = 'Tôn quý (Đắc địa)';
        primaryStatusClass = 'positive';
    } else if (isDetriment) {
        primaryStatus = 'Hãm / Suy cung';
        primaryStatusClass = 'negative';
    } else if (isFall) {
        primaryStatus = 'Rơi đài / Tổn thương';
        primaryStatusClass = 'negative';
    } else if (isPeregrine) {
        primaryStatus = 'Lãng tử (Vô gia cư)';
        primaryStatusClass = 'warning';
    } else if (isTriplicity || isTerm || isFace) {
        primaryStatus = 'Thứ phẩm vi mô';
        primaryStatusClass = 'minor';
    }

    return {
        planetId,
        signId,
        score,
        primaryStatus,
        primaryStatusClass,
        isDomicile,
        isExaltation,
        isDetriment,
        isFall,
        isTriplicity,
        isTerm,
        isFace,
        isPeregrine,
        explanations
    };
}

/**
 * Trả về giải thích chi tiết vì sao một hành tinh có phẩm giá đó
 */
export function getWhyDignityExplanation(planetId, signId) {
    const pName = getPlanetNameVi(planetId);
    const sName = getSignNameVi(signId);

    // Kiểm tra Domicile / Detriment
    const dom = DOMICILES[planetId];
    if (dom) {
        if (dom.signs.includes(signId)) {
            return `${pName} là chủ quản bản vị (Domicile) của ${sName}. Tại đây, hành tinh có toàn quyền kiểm soát như một vị chủ nhân ở trong chính ngôi nhà của mình.`;
        }
        if (dom.detrimentSigns.includes(signId)) {
            const oppSigns = dom.signs.map(getSignNameVi).join(', ');
            return `${pName} bị Hãm/Suy (Detriment) tại ${sName} vì ${sName} đối diện trực tiếp với cung nhà chính (${oppSigns}). Hành tinh rơi vào thế bị cô lập hoặc mất quyền lực tự chủ.`;
        }
    }

    // Kiểm tra Exaltation / Fall
    const ex = EXALTATIONS[planetId];
    if (ex) {
        if (ex.sign === signId) {
            return `${pName} được Tôn quý (Exaltation) tại ${sName} (đạt đỉnh tại ${ex.degree}°). Tại đây hành tinh được tiếp đón như một vị khách quý tối cao và phát huy năng lượng rực rỡ nhất.`;
        }
        if (ex.fallSign === signId) {
            return `${pName} bị Rơi đài/Tổn thương (Fall) tại ${sName} vì cung này đối diện trực tiếp với cung tôn quý (${getSignNameVi(ex.sign)}). Hành tinh cảm thấy bất an và suy kiệt vị thế.`;
        }
    }

    return `${pName} tại ${sName} không thuộc Domicile hay Exaltation cơ bản, cần xét thêm Tam hợp (Triplicity), Giới hạn (Term) và Thập phân độ (Face).`;
}

function getSignNameVi(id) {
    const names = {
        aries: 'Bạch Dương', taurus: 'Kim Ngưu', gemini: 'Song Tử', cancer: 'Cự Giải',
        leo: 'Sư Tử', virgo: 'Xử Nữ', libra: 'Thiên Bình', scorpio: 'Bọ Cạp',
        sagittarius: 'Nhân Mã', capricorn: 'Ma Kết', aquarius: 'Bảo Bình', pisces: 'Song Ngư'
    };
    return names[id] || id;
}

function getPlanetNameVi(id) {
    const names = {
        sun: 'Mặt Trời', moon: 'Mặt Trăng', mercury: 'Thủy Tinh',
        venus: 'Kim Tinh', mars: 'Hỏa Tinh', jupiter: 'Mộc Tinh', saturn: 'Thổ Tinh'
    };
    return names[id] || id;
}

function getSignElement(signId) {
    if (['aries', 'leo', 'sagittarius'].includes(signId)) return 'fire';
    if (['taurus', 'virgo', 'capricorn'].includes(signId)) return 'earth';
    if (['gemini', 'libra', 'aquarius'].includes(signId)) return 'air';
    if (['cancer', 'scorpio', 'pisces'].includes(signId)) return 'water';
    return null;
}

function getElementNameVi(elem) {
    const map = { fire: 'Hỏa', earth: 'Thổ', air: 'Khí', water: 'Thủy' };
    return map[elem] || elem;
}
