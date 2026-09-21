/**
 * svgGlyphs.js - Bộ ký hiệu Vector SVG thuần cho Chiêm Tinh Học Horary Cổ Điển
 * ZERO EMOJIS - Tất cả ký hiệu hoàng đạo, hành tinh, góc chiếu và chuyển động
 * được vẽ hoàn toàn bằng tọa độ vector chuẩn xác, sắc nét trên mọi độ phân giải.
 */

// Định nghĩa path vector trong hệ quy chiếu chuẩn viewBox="-12 -12 24 24" (tâm 0,0, kích thước 24x24)
export const GLYPH_PATHS = {
    // ==========================================
    // 12 CUNG HOÀNG ĐẠO (ZODIAC SIGNS)
    // ==========================================
    // Bạch Dương (Aries): Đôi sừng cừu
    aries: {
        d: 'M -8,4 C -8,-2 -4,-8 0,-2 C 4,-8 8,-2 8,4 M 0,-2 L 0,9',
        fill: 'none',
        strokeWidth: 2,
        strokeLinecap: 'round',
        strokeLinejoin: 'round'
    },
    // Kim Ngưu (Taurus): Đầu và sừng bò
    taurus: {
        d: 'M -7,-5 C -5,-1 0,-1 0,-1 C 0,-1 5,-1 7,-5 M 0,0 A 5,5 0 1 1 0,10 A 5,5 0 1 1 0,0',
        fill: 'none',
        strokeWidth: 2,
        strokeLinecap: 'round',
        strokeLinejoin: 'round'
    },
    // Song Tử (Gemini): Cặp cột La Mã nối hai đầu
    gemini: {
        d: 'M -8,-9 C -3,-6 3,-6 8,-9 M -8,9 C -3,6 3,6 8,9 M -4,-7.5 L -4,7.5 M 4,-7.5 L 4,7.5',
        fill: 'none',
        strokeWidth: 2,
        strokeLinecap: 'round',
        strokeLinejoin: 'round'
    },
    // Cự Giải (Cancer): Cặp càng cua / số 69 ngang
    cancer: {
        d: 'M -7,-4 A 3.5,3.5 0 1 0 -3.5,-0.5 C 1,-0.5 7,-5 7,-5 M 7,4 A 3.5,3.5 0 1 0 3.5,0.5 C -1,0.5 -7,5 -7,5',
        fill: 'none',
        strokeWidth: 2,
        strokeLinecap: 'round',
        strokeLinejoin: 'round'
    },
    // Sư Tử (Leo): Bờm và đuôi sư tử
    leo: {
        d: 'M -7,4 A 3,3 0 1 0 -4,1 C -4,-3 2,-10 4,-3 C 5,2 7,8 10,6',
        fill: 'none',
        strokeWidth: 2,
        strokeLinecap: 'round',
        strokeLinejoin: 'round'
    },
    // Xử Nữ (Virgo): Chữ M với dải băng lượn
    virgo: {
        d: 'M -9,7 L -9,-4 C -9,-7 -5,-7 -5,-4 L -5,6 C -5,-7 -1,-7 -1,-4 L -1,6 C -1,-7 3,-7 3,-4 L 3,4 C 3,8 8,8 8,2 L 8,-2 M 1,2 L 9,8',
        fill: 'none',
        strokeWidth: 2,
        strokeLinecap: 'round',
        strokeLinejoin: 'round'
    },
    // Thiên Bình (Libra): Cán cân / Mặt Trời lặn trên đường chân trời
    libra: {
        d: 'M -9,6 L 9,6 M -9,10 L 9,10 M -8,2 L -3,2 A 4,4 0 1 1 3,2 L 8,2',
        fill: 'none',
        strokeWidth: 2,
        strokeLinecap: 'round',
        strokeLinejoin: 'round'
    },
    // Bọ Cạp (Scorpio): Chữ M với đuôi mũi tên độc
    scorpio: {
        d: 'M -9,7 L -9,-4 C -9,-7 -5,-7 -5,-4 L -5,6 C -5,-7 -1,-7 -1,-4 L -1,6 C -1,-7 3,-7 3,-4 L 3,6 C 3,8 7,8 8,5 M 6,2 L 9,5 L 6,8',
        fill: 'none',
        strokeWidth: 2,
        strokeLinecap: 'round',
        strokeLinejoin: 'round'
    },
    // Nhân Mã (Sagittarius): Cung tên chéo
    sagittarius: {
        d: 'M -8,8 L 8,-8 M 1,-8 L 8,-8 L 8,-1 M -3,1 L 1,5',
        fill: 'none',
        strokeWidth: 2,
        strokeLinecap: 'round',
        strokeLinejoin: 'round'
    },
    // Ma Kết (Capricorn): Sừng dê và đuôi cá xoắn
    capricorn: {
        d: 'M -8,-6 L -4,6 L 0,-6 C 2,-8 6,-6 6,0 C 6,4 3,8 5,10 C 7,11 9,8 7,5',
        fill: 'none',
        strokeWidth: 2,
        strokeLinecap: 'round',
        strokeLinejoin: 'round'
    },
    // Bảo Bình (Aquarius): Hai dòng sóng nước song song
    aquarius: {
        d: 'M -9,-3 L -6,-6 L -2,-1 L 2,-6 L 6,-1 L 9,-4 M -9,3 L -6,0 L -2,5 L 2,0 L 6,5 L 9,2',
        fill: 'none',
        strokeWidth: 2,
        strokeLinecap: 'round',
        strokeLinejoin: 'round'
    },
    // Song Ngư (Pisces): Hai vầng trăng khuyết đối diện nối nhau
    pisces: {
        d: 'M -5,-8 C -2,-4 -2,4 -5,8 M 5,-8 C 2,-4 2,4 5,8 M -8,0 L 8,0',
        fill: 'none',
        strokeWidth: 2,
        strokeLinecap: 'round',
        strokeLinejoin: 'round'
    },

    // ==========================================
    // 7 HÀNH TINH CỔ ĐIỂN & GIAO ĐIỂM
    // ==========================================
    // Mặt Trời (Sun): Vòng tròn có chấm tâm
    sun: {
        d: 'M 0,-6 A 6,6 0 1 1 0,6 A 6,6 0 1 1 0,-6 M 0,-0.75 A 0.75,0.75 0 1 1 0,0.75 A 0.75,0.75 0 1 1 0,-0.75',
        fill: 'none',
        strokeWidth: 2,
        strokeLinecap: 'round',
        strokeLinejoin: 'round'
    },
    // Mặt Trăng (Moon): Trăng lưỡi liềm
    moon: {
        d: 'M -3,-8 C 3,-5 4,5 -3,8 C 7,7 7,-7 -3,-8 Z',
        fill: 'none',
        strokeWidth: 2,
        strokeLinecap: 'round',
        strokeLinejoin: 'round'
    },
    // Thủy Tinh (Mercury): Vòng tròn, sừng trên, chữ thập dưới
    mercury: {
        d: 'M -5,-9 C -3,-6 3,-6 5,-9 M 0,-4 A 4,4 0 1 1 0,4 A 4,4 0 1 1 0,-4 M 0,4 L 0,10 M -3,7 L 3,7',
        fill: 'none',
        strokeWidth: 2,
        strokeLinecap: 'round',
        strokeLinejoin: 'round'
    },
    // Kim Tinh (Venus): Vòng tròn, chữ thập dưới
    venus: {
        d: 'M 0,-7 A 5,5 0 1 1 0,3 A 5,5 0 1 1 0,-7 M 0,3 L 0,10 M -3.5,6.5 L 3.5,6.5',
        fill: 'none',
        strokeWidth: 2,
        strokeLinecap: 'round',
        strokeLinejoin: 'round'
    },
    // Hỏa Tinh (Mars): Vòng tròn, mũi tên hướng góc 45 độ
    mars: {
        d: 'M -3,-3 A 5,5 0 1 1 -3,7 A 5,5 0 1 1 -3,-3 M 2,-2 L 9,-9 M 4,-9 L 9,-9 L 9,-4',
        fill: 'none',
        strokeWidth: 2,
        strokeLinecap: 'round',
        strokeLinejoin: 'round'
    },
    // Mộc Tinh (Jupiter): Số 4 uốn lượn có gạch ngang chữ thập
    jupiter: {
        d: 'M -7,-3 C -5,-8 -1,-8 1,-5 L 1,8 M -8,1 L 5,1 M 1,1 L 6,1',
        fill: 'none',
        strokeWidth: 2,
        strokeLinecap: 'round',
        strokeLinejoin: 'round'
    },
    // Thổ Tinh (Saturn): Lưỡi liềm chữ thập
    saturn: {
        d: 'M -4,-9 L -4,5 M -7,-5 L 0,-5 M -4,0 C -1,-4 4,-3 4,1 C 4,6 -1,9 -4,8',
        fill: 'none',
        strokeWidth: 2,
        strokeLinecap: 'round',
        strokeLinejoin: 'round'
    },
    // Bắc Giao Điểm (North Node / La Hầu): Đầu rồng
    northNode: {
        d: 'M -6,6 A 2.5,2.5 0 1 1 -4,1 C -3,-5 3,-5 4,1 A 2.5,2.5 0 1 1 6,6',
        fill: 'none',
        strokeWidth: 2,
        strokeLinecap: 'round',
        strokeLinejoin: 'round'
    },
    // Nam Giao Điểm (South Node / Kế Đô): Đuôi rồng
    southNode: {
        d: 'M -6,-6 A 2.5,2.5 0 1 0 -4,-1 C -3,5 3,5 4,-1 A 2.5,2.5 0 1 0 6,-6',
        fill: 'none',
        strokeWidth: 2,
        strokeLinecap: 'round',
        strokeLinejoin: 'round'
    },
    // Điểm May Mắn (Pars Fortunae): Vòng tròn chữ thập bánh xe số phận (Wheel of Fortune)
    partOfFortune: {
        d: 'M 0,-7 A 7,7 0 1 1 0,7 A 7,7 0 1 1 0,-7 M -4.95,-4.95 L 4.95,4.95 M -4.95,4.95 L 4.95,-4.95',
        fill: 'none',
        strokeWidth: 2,
        strokeLinecap: 'round',
        strokeLinejoin: 'round'
    },

    // ==========================================
    // 5 ASPECT HORARY CHÍNH (GÓC CHIẾU)
    // ==========================================
    // Conjunction (Đồng cung / Trùng tụ 0°): Vòng tròn nối tia tiếp tuyến
    conjunction: {
        d: 'M -3,0 A 4,4 0 1 1 -3,8 A 4,4 0 1 1 -3,0 M 1,4 L 9,-6',
        fill: 'none',
        strokeWidth: 2,
        strokeLinecap: 'round',
        strokeLinejoin: 'round'
    },
    // Sextile (Lục hợp 60°): Ngôi sao 6 cánh
    sextile: {
        d: 'M 0,-8 L 0,8 M -7,-4 L 7,4 M -7,4 L 7,-4',
        fill: 'none',
        strokeWidth: 2,
        strokeLinecap: 'round',
        strokeLinejoin: 'round'
    },
    // Square (Vuông góc 90°): Hình vuông viền nét
    square: {
        d: 'M -6,-6 L 6,-6 L 6,6 L -6,6 Z',
        fill: 'none',
        strokeWidth: 2,
        strokeLinecap: 'round',
        strokeLinejoin: 'round'
    },
    // Trine (Tam hợp 120°): Hình tam giác đều
    trine: {
        d: 'M 0,-7 L 7,6 L -7,6 Z',
        fill: 'none',
        strokeWidth: 2,
        strokeLinecap: 'round',
        strokeLinejoin: 'round'
    },
    // Opposition (Đối xung 180°): Hai vòng tròn nối thanh tạ
    opposition: {
        d: 'M -6,-3 A 3,3 0 1 1 -6,3 A 3,3 0 1 1 -6,-3 M 6,-3 A 3,3 0 1 1 6,3 A 3,3 0 1 1 6,-3 M -3,0 L 3,0',
        fill: 'none',
        strokeWidth: 2,
        strokeLinecap: 'round',
        strokeLinejoin: 'round'
    },

    // ==========================================
    // TRẠNG THÁI CHUYỂN ĐỘNG (MOTION GLYPHS)
    // ==========================================
    // Retrograde (℞ Nghịch hành): Chữ R có gạch ngang chân
    retrograde: {
        d: 'M -5,8 L -5,-7 L 1,-7 C 4,-7 5,-4 5,-2 C 5,1 3,2 0,2 L -5,2 M 0,2 L 5,8 M 1,3 L 5,7 M 5,4 L 2,7',
        fill: 'none',
        strokeWidth: 2,
        strokeLinecap: 'round',
        strokeLinejoin: 'round'
    },
    // Direct (D Thuận hành): Chữ D
    direct: {
        d: 'M -5,-7 L -1,-7 C 4,-7 5,-3 5,0 C 5,3 4,7 -1,7 L -5,7 Z',
        fill: 'none',
        strokeWidth: 2,
        strokeLinecap: 'round',
        strokeLinejoin: 'round'
    },
    // Stationary (S Đứng/Trạm): Chữ S
    stationary: {
        d: 'M 4,-4 C 4,-7 0,-7 -2,-7 C -4,-7 -5,-5 -5,-3 C -5,2 5,1 5,5 C 5,8 2,8 0,8 C -3,8 -5,6 -5,4',
        fill: 'none',
        strokeWidth: 2,
        strokeLinecap: 'round',
        strokeLinejoin: 'round'
    }
};

/**
 * Tạo thẻ SVG standalone từ mã ký hiệu
 * @param {string} key - Mã ký hiệu (ví dụ: 'aries', 'sun', 'trine', 'retrograde')
 * @param {number} size - Kích thước (px), mặc định 20
 * @param {string} color - Mã màu stroke, mặc định 'currentColor'
 * @param {string} extraClass - Class CSS bổ sung
 * @returns {string} - Chuỗi thẻ <svg> hoàn chỉnh
 */
export function renderGlyphSvg(key, size = 20, color = 'currentColor', extraClass = '') {
    const glyph = GLYPH_PATHS[key];
    if (!glyph) return '';
    return `<svg class="horary-glyph ${extraClass}" viewBox="-12 -12 24 24" width="${size}" height="${size}" style="display:inline-block; vertical-align:middle;">
        <path d="${glyph.d}" fill="${glyph.fill || 'none'}" stroke="${color}" stroke-width="${glyph.strokeWidth || 2}" stroke-linecap="${glyph.strokeLinecap || 'round'}" stroke-linejoin="${glyph.strokeLinejoin || 'round'}" />
    </svg>`;
}

/**
 * Trả về đoạn XML `<g>` để nhúng trực tiếp vào thẻ SVG lớn của lá số
 * @param {string} key - Mã ký hiệu
 * @param {number} x - Tọa độ X tâm
 * @param {number} y - Tọa độ Y tâm
 * @param {number} scale - Tỷ lệ co giãn (1 = 24x24)
 * @param {string} color - Màu stroke
 * @param {number} strokeWidth - Độ dày nét
 * @returns {string} - Thẻ `<g transform="...">`
 */
export function getGlyphGroupXml(key, x, y, scale = 1, color = '#1e293b', strokeWidth = 2) {
    const glyph = GLYPH_PATHS[key];
    if (!glyph) return '';
    return `<g transform="translate(${x.toFixed(2)}, ${y.toFixed(2)}) scale(${scale})">
        <path d="${glyph.d}" fill="${glyph.fill || 'none'}" stroke="${color}" stroke-width="${strokeWidth}" stroke-linecap="${glyph.strokeLinecap || 'round'}" stroke-linejoin="${glyph.strokeLinejoin || 'round'}" />
    </g>`;
}
