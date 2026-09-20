/**
 * traditionalRulers.js - Bảng Chủ Tinh Truyền Thống 12 Cung Hoàng Đạo
 * Source: William Lilly, Christian Astrology (1647), Chapter XI & XII.
 *
 * QUY TẮC BẮT BUỘC TRONG HORARY TRUYỀN THỐNG:
 * - Chỉ sử dụng 7 hành tinh cổ điển (Mặt Trời đến Thổ Tinh) làm chủ tinh.
 * - Bảo Bình (Aquarius) -> Thổ Tinh (Saturn), TUYỆT ĐỐI KHÔNG dùng Uranus.
 * - Bọ Cạp (Scorpio)   -> Hỏa Tinh (Mars), TUYỆT ĐỐI KHÔNG dùng Pluto.
 * - Song Ngư (Pisces)   -> Mộc Tinh (Jupiter), TUYỆT ĐỐI KHÔNG dùng Neptune.
 */

export const ZODIAC_SIGNS = [
    {
        index: 0,
        id: 'aries',
        nameVi: 'Bạch Dương',
        nameEn: 'Aries',
        startDeg: 0,
        endDeg: 30,
        element: 'fire',
        elementVi: 'Hỏa',
        modality: 'cardinal',
        modalityVi: 'Thống lĩnh (Cardinal)',
        rulerId: 'mars',
        rulerNameVi: 'Hỏa Tinh',
        glyphKey: 'aries'
    },
    {
        index: 1,
        id: 'taurus',
        nameVi: 'Kim Ngưu',
        nameEn: 'Taurus',
        startDeg: 30,
        endDeg: 60,
        element: 'earth',
        elementVi: 'Thổ',
        modality: 'fixed',
        modalityVi: 'Kiên định (Fixed)',
        rulerId: 'venus',
        rulerNameVi: 'Kim Tinh',
        glyphKey: 'taurus'
    },
    {
        index: 2,
        id: 'gemini',
        nameVi: 'Song Tử',
        nameEn: 'Gemini',
        startDeg: 60,
        endDeg: 90,
        element: 'air',
        elementVi: 'Khí',
        modality: 'mutable',
        modalityVi: 'Biến đổi (Mutable)',
        rulerId: 'mercury',
        rulerNameVi: 'Thủy Tinh',
        glyphKey: 'gemini'
    },
    {
        index: 3,
        id: 'cancer',
        nameVi: 'Cự Giải',
        nameEn: 'Cancer',
        startDeg: 90,
        endDeg: 120,
        element: 'water',
        elementVi: 'Thủy',
        modality: 'cardinal',
        modalityVi: 'Thống lĩnh (Cardinal)',
        rulerId: 'moon',
        rulerNameVi: 'Mặt Trăng',
        glyphKey: 'cancer'
    },
    {
        index: 4,
        id: 'leo',
        nameVi: 'Sư Tử',
        nameEn: 'Leo',
        startDeg: 120,
        endDeg: 150,
        element: 'fire',
        elementVi: 'Hỏa',
        modality: 'fixed',
        modalityVi: 'Kiên định (Fixed)',
        rulerId: 'sun',
        rulerNameVi: 'Mặt Trời',
        glyphKey: 'leo'
    },
    {
        index: 5,
        id: 'virgo',
        nameVi: 'Xử Nữ',
        nameEn: 'Virgo',
        startDeg: 150,
        endDeg: 180,
        element: 'earth',
        elementVi: 'Thổ',
        modality: 'mutable',
        modalityVi: 'Biến đổi (Mutable)',
        rulerId: 'mercury',
        rulerNameVi: 'Thủy Tinh',
        glyphKey: 'virgo'
    },
    {
        index: 6,
        id: 'libra',
        nameVi: 'Thiên Bình',
        nameEn: 'Libra',
        startDeg: 180,
        endDeg: 210,
        element: 'air',
        elementVi: 'Khí',
        modality: 'cardinal',
        modalityVi: 'Thống lĩnh (Cardinal)',
        rulerId: 'venus',
        rulerNameVi: 'Kim Tinh',
        glyphKey: 'libra'
    },
    {
        index: 7,
        id: 'scorpio',
        nameVi: 'Bọ Cạp',
        nameEn: 'Scorpio',
        startDeg: 210,
        endDeg: 240,
        element: 'water',
        elementVi: 'Thủy',
        modality: 'fixed',
        modalityVi: 'Kiên định (Fixed)',
        rulerId: 'mars',
        rulerNameVi: 'Hỏa Tinh',
        glyphKey: 'scorpio'
    },
    {
        index: 8,
        id: 'sagittarius',
        nameVi: 'Nhân Mã',
        nameEn: 'Sagittarius',
        startDeg: 240,
        endDeg: 270,
        element: 'fire',
        elementVi: 'Hỏa',
        modality: 'mutable',
        modalityVi: 'Biến đổi (Mutable)',
        rulerId: 'jupiter',
        rulerNameVi: 'Mộc Tinh',
        glyphKey: 'sagittarius'
    },
    {
        index: 9,
        id: 'capricorn',
        nameVi: 'Ma Kết',
        nameEn: 'Capricorn',
        startDeg: 270,
        endDeg: 300,
        element: 'earth',
        elementVi: 'Thổ',
        modality: 'cardinal',
        modalityVi: 'Thống lĩnh (Cardinal)',
        rulerId: 'saturn',
        rulerNameVi: 'Thổ Tinh',
        glyphKey: 'capricorn'
    },
    {
        index: 10,
        id: 'aquarius',
        nameVi: 'Bảo Bình',
        nameEn: 'Aquarius',
        startDeg: 300,
        endDeg: 330,
        element: 'air',
        elementVi: 'Khí',
        modality: 'fixed',
        modalityVi: 'Kiên định (Fixed)',
        rulerId: 'saturn',
        rulerNameVi: 'Thổ Tinh',
        glyphKey: 'aquarius'
    },
    {
        index: 11,
        id: 'pisces',
        nameVi: 'Song Ngư',
        nameEn: 'Pisces',
        startDeg: 330,
        endDeg: 360,
        element: 'water',
        elementVi: 'Thủy',
        modality: 'mutable',
        modalityVi: 'Biến đổi (Mutable)',
        rulerId: 'jupiter',
        rulerNameVi: 'Mộc Tinh',
        glyphKey: 'pisces'
    }
];

export const PLANETS_INFO = [
    { id: 'sun', nameVi: 'Mặt Trời', nameEn: 'Sun', glyphKey: 'sun', speedStationaryThreshold: 0.0001, isLuminary: true },
    { id: 'moon', nameVi: 'Mặt Trăng', nameEn: 'Moon', glyphKey: 'moon', speedStationaryThreshold: 0.0001, isLuminary: true },
    { id: 'mercury', nameVi: 'Thủy Tinh', nameEn: 'Mercury', glyphKey: 'mercury', speedStationaryThreshold: 0.005 },
    { id: 'venus', nameVi: 'Kim Tinh', nameEn: 'Venus', glyphKey: 'venus', speedStationaryThreshold: 0.005 },
    { id: 'mars', nameVi: 'Hỏa Tinh', nameEn: 'Mars', glyphKey: 'mars', speedStationaryThreshold: 0.005 },
    { id: 'jupiter', nameVi: 'Mộc Tinh', nameEn: 'Jupiter', glyphKey: 'jupiter', speedStationaryThreshold: 0.002 },
    { id: 'saturn', nameVi: 'Thổ Tinh', nameEn: 'Saturn', glyphKey: 'saturn', speedStationaryThreshold: 0.001 },
    { id: 'northNode', nameVi: 'Bắc Giao Điểm (La Hầu)', nameEn: 'North Node', glyphKey: 'northNode', isNode: true },
    { id: 'southNode', nameVi: 'Nam Giao Điểm (Kế Đô)', nameEn: 'South Node', glyphKey: 'southNode', isNode: true }
];

/**
 * Lấy thông tin cung hoàng đạo và độ/phút/giây từ kinh độ hoàng đạo thực [0, 360)
 * @param {number} longitude - Kinh độ hoàng đạo (độ)
 * @returns {object} Thông tin chi tiết vị trí cung
 */
export function getZodiacPosition(longitude) {
    let norm = longitude % 360;
    if (norm < 0) norm += 360;

    // Chuyển toàn bộ kinh độ sang đơn vị giây cung nguyên (arcseconds) [0, 1295999]
    // 360 độ = 1,296,000 giây cung. Đảm bảo triệt để 100% không bao giờ có lỗi làm tròn 60 giây hay 30 độ
    const totalSecCircle = 360 * 3600; // 1296000
    let totalSec = Math.round(norm * 3600);
    totalSec = ((totalSec % totalSecCircle) + totalSecCircle) % totalSecCircle;

    const secPerSign = 30 * 3600; // 108000
    const signIndex = Math.floor(totalSec / secPerSign) % 12;
    const sign = ZODIAC_SIGNS[signIndex];

    const secInSign = totalSec % secPerSign;
    const degree = Math.floor(secInSign / 3600);
    const minute = Math.floor((secInSign % 3600) / 60);
    const second = secInSign % 60;
    const degreeDecimal = secInSign / 3600;

    const formatted = `${degree}°${String(minute).padStart(2, '0')}′`;
    const formattedWithSec = `${degree}°${String(minute).padStart(2, '0')}′${String(second).padStart(2, '0')}″`;

    return {
        longitude: norm,
        signIndex,
        signId: sign.id,
        signNameVi: sign.nameVi,
        signNameEn: sign.nameEn,
        signGlyphKey: sign.glyphKey,
        rulerId: sign.rulerId,
        rulerNameVi: sign.rulerNameVi,
        degreeDecimal,
        degree,
        minute,
        second,
        formatted,
        formattedWithSec,
        fullDisplay: `${formatted} ${sign.nameVi}`
    };
}

/**
 * Lấy chủ tinh của một cung
 * @param {string|number} signIdOrIndex
 * @returns {object} Thông tin chủ tinh
 */
export function getTraditionalRuler(signIdOrIndex) {
    let sign;
    if (typeof signIdOrIndex === 'number') {
        sign = ZODIAC_SIGNS[signIdOrIndex % 12];
    } else {
        sign = ZODIAC_SIGNS.find(s => s.id === signIdOrIndex || s.nameEn.toLowerCase() === String(signIdOrIndex).toLowerCase());
    }
    if (!sign) return null;
    return {
        rulerId: sign.rulerId,
        rulerNameVi: sign.rulerNameVi,
        signId: sign.id,
        signNameVi: sign.nameVi
    };
}
