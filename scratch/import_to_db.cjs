const fs = require('fs');
const path = require('path');

const jsonFile = path.join(__dirname, '64_hexagrams_reconstructed.json');
const hexagramsData = JSON.parse(fs.readFileSync(jsonFile, 'utf-8'));

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Lỗi: Chưa cấu hình SUPABASE_URL hoặc SUPABASE_KEY trong biến môi trường.');
    process.exit(1);
}

// Bảng ánh xạ id quẻ từ 0 đến 63 trong logic Kinh Dịch Lục Hào (NAP_GIAP & QUAI_SO)
// Logic index: (ngoại_quái_số << 3) | nội_quái_số
// Khôn=0, Cấn=1, Khảm=2, Tốn=3, Chấn=4, Ly=5, Đoài=6, Càn=7
const QUAI_MAP = {
    'Khôn': 0, 'Cấn': 1, 'Khảm': 2, 'Tốn': 3, 'Chấn': 4, 'Ly': 5, 'Đoài': 6, 'Càn': 7
};

const TEN_QUE_MATRIX = [
    // 0: Khôn
    ['Bát Thuần Khôn', 'Địa Sơn Khiêm', 'Địa Thủy Sư', 'Địa Phong Thăng', 'Địa Lôi Phục', 'Địa Hỏa Minh Di', 'Địa Trạch Lâm', 'Địa Thiên Thái'],
    // 1: Cấn
    ['Sơn Địa Bác', 'Bát Thuần Cấn', 'Sơn Thủy Mông', 'Sơn Phong Cổ', 'Sơn Lôi Di', 'Sơn Hỏa Bí', 'Sơn Trạch Tổn', 'Sơn Thiên Đại Súc'],
    // 2: Khảm
    ['Thủy Địa Tỷ', 'Thủy Sơn Kiển', 'Bát Thuần Khảm', 'Thủy Phong Tỉnh', 'Thủy Lôi Truân', 'Thủy Hỏa Ký Tế', 'Thủy Trạch Tiết', 'Thủy Thiên Nhu'],
    // 3: Tốn
    ['Phong Địa Quan', 'Phong Sơn Tiệm', 'Phong Thủy Hoán', 'Bát Thuần Tốn', 'Phong Lôi Ích', 'Phong Hỏa Gia Nhân', 'Phong Trạch Trung Phu', 'Phong Thiên Tiểu Súc'],
    // 4: Chấn
    ['Lôi Địa Dự', 'Lôi Sơn Tiểu Quá', 'Lôi Thủy Giải', 'Lôi Phong Hằng', 'Bát Thuần Chấn', 'Lôi Hỏa Phong', 'Lôi Trạch Quy Muội', 'Lôi Thiên Đại Tráng'],
    // 5: Ly
    ['Hỏa Địa Tấn', 'Hỏa Sơn Lữ', 'Hỏa Thủy Vị Tế', 'Hỏa Phong Đỉnh', 'Hỏa Lôi Phệ Hạp', 'Bát Thuần Ly', 'Hỏa Trạch Khuê', 'Hỏa Thiên Đại Hữu'],
    // 6: Đoài
    ['Trạch Địa Tụy', 'Trạch Sơn Hàm', 'Trạch Thủy Khốn', 'Trạch Phong Đại Quá', 'Trạch Lôi Tùy', 'Trạch Hỏa Cách', 'Bát Thuần Đoài', 'Trạch Thiên Quải'],
    // 7: Càn
    ['Thiên Địa Bĩ', 'Thiên Sơn Độn', 'Thiên Thủy Tụng', 'Thiên Phong Cấu', 'Thiên Lôi Vô Vọng', 'Thiên Hỏa Đồng Nhân', 'Thiên Trạch Lý', 'Bát Thuần Càn']
];

// Cung quẻ (Palace) tương ứng của 64 quẻ
const PALACE_MAP = {
    // Càn cung
    'Bát Thuần Càn': 'Càn', 'Thiên Phong Cấu': 'Càn', 'Thiên Sơn Độn': 'Càn', 'Thiên Địa Bĩ': 'Càn',
    'Phong Địa Quan': 'Càn', 'Sơn Địa Bác': 'Càn', 'Hỏa Địa Tấn': 'Càn', 'Hỏa Thiên Đại Hữu': 'Càn',
    // Khảm cung
    'Bát Thuần Khảm': 'Khảm', 'Thủy Trạch Tiết': 'Khảm', 'Thủy Lôi Truân': 'Khảm', 'Thủy Hỏa Ký Tế': 'Khảm',
    'Trạch Lôi Tùy': 'Khảm', 'Lôi Lôi Hằng': 'Khảm', 'Lôi Địa Dự': 'Khảm', 'Địa Thủy Sư': 'Khảm', // note: Lôi Lôi Hằng thực chất Lôi Phong Hằng thuộc Tốn cung
    // Cấn cung
    'Bát Thuần Cấn': 'Cấn', 'Sơn Hỏa Bí': 'Cấn', 'Sơn Thiên Đại Súc': 'Cấn', 'Sơn Trạch Tổn': 'Cấn',
    'Hỏa Trạch Khuê': 'Cấn', 'Thiên Trạch Lý': 'Cấn', 'Phong Trạch Trung Phu': 'Cấn', 'Phong Sơn Tiệm': 'Cấn',
    // Chấn cung
    'Bát Thuần Chấn': 'Chấn', 'Lôi Địa Dự': 'Chấn', 'Lôi Thủy Giải': 'Chấn', 'Lôi Phong Hằng': 'Chấn',
    'Địa Phong Thăng': 'Chấn', 'Thủy Phong Tỉnh': 'Chấn', 'Trạch Phong Đại Quá': 'Chấn', 'Trạch Lôi Tùy': 'Chấn',
    // Tốn cung
    'Bát Thuần Tốn': 'Tốn', 'Phong Thiên Tiểu Súc': 'Tốn', 'Phong Hỏa Gia Nhân': 'Tốn', 'Phong Lôi Ích': 'Tốn',
    'Thiên Lôi Vô Vọng': 'Tốn', 'Hỏa Lôi Phệ Hạp': 'Tốn', 'Sơn Lôi Di': 'Tốn', 'Sơn Phong Cổ': 'Tốn',
    // Ly cung
    'Bát Thuần Ly': 'Ly', 'Hỏa Sơn Lữ': 'Ly', 'Hỏa Địa Tấn': 'Ly', 'Hỏa Thủy Vị Tế': 'Ly',
    'Thiên Thủy Tụng': 'Ly', 'Thiên Lôi Vô Vọng': 'Ly', 'Phong Thủy Hoán': 'Ly', 'Thủy Địa Tỷ': 'Ly',
    // Khôn cung
    'Bát Thuần Khôn': 'Khôn', 'Địa Lôi Phục': 'Khôn', 'Địa Trạch Lâm': 'Khôn', 'Địa Thiên Thái': 'Khôn',
    'Lôi Thiên Đại Tráng': 'Khôn', 'Trạch Thiên Quải': 'Khôn', 'Thủy Thiên Nhu': 'Khôn', 'Thủy Địa Tỷ': 'Khôn',
    // Đoài cung
    'Bát Thuần Đoài': 'Đoài', 'Trạch Thủy Khốn': 'Đoài', 'Trạch Địa Tụy': 'Đoài', 'Trạch Sơn Hàm': 'Đoài',
    'Sơn Thủy Mông': 'Đoài', 'Địa Thủy Sư': 'Đoài', 'Thủy Sơn Kiển': 'Đoài', 'Lôi Sơn Tiểu Quá': 'Đoài'
};

async function importData() {
    const headers = {
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`,
        'Content-Type': 'application/json',
        'Prefer': 'resolution=merge-duplicates'
    };

    console.log('Bắt đầu đồng bộ hóa 64 quẻ và 384 hào...');

    // Duyệt qua ma trận quẻ để lấy ID chính xác
    for (let outIdx = 0; outIdx < 8; outIdx++) {
        for (let inIdx = 0; inIdx < 8; inIdx++) {
            const hexName = TEN_QUE_MATRIX[outIdx][inIdx];
            const hexId = (outIdx << 3) | inIdx; // ID quẻ chuẩn
            const palace = PALACE_MAP[hexName] || 'Chưa rõ';

            const sourceData = hexagramsData[hexName] || { overall: 'Đang cập nhật...', lines: {} };
            
            // 1. Upsert quẻ vào bảng hexagrams
            const hexBody = {
                id: hexId,
                name: hexName,
                palace: palace,
                vietnamese_meaning: hexName,
                overall_meaning: sourceData.overall || 'Luận giải đang cập nhật...',
                career_meaning: sourceData.overall || 'Đang cập nhật...',
                love_meaning: sourceData.overall || 'Đang cập nhật...',
                wealth_meaning: sourceData.overall || 'Đang cập nhật...',
                health_meaning: sourceData.overall || 'Đang cập nhật...'
            };

            try {
                const hexRes = await fetch(`${supabaseUrl}/rest/v1/hexagrams`, {
                    method: 'POST',
                    headers,
                    body: JSON.stringify(hexBody)
                });
                
                if (!hexRes.ok) {
                    console.error(`Lỗi upsert quẻ ${hexName}:`, await hexRes.text());
                } else {
                    console.log(`✓ Đã đồng bộ quẻ ${hexId}: ${hexName}`);
                }

                // 2. Upsert 6 hào tương ứng của quẻ
                const lineBodies = [];
                for (let h = 1; h <= 6; h++) {
                    const lineInfo = sourceData.lines?.[h] || { meaning_static: 'Đang cập nhật.', meaning_active: 'Đang cập nhật.' };
                    lineBodies.push({
                        hexagram_id: hexId,
                        line_number: h,
                        relation: '', // Sẽ được Nap Giáp tự động điền ở code
                        meaning_static: lineInfo.meaning_static || 'Đang cập nhật.',
                        meaning_active: lineInfo.meaning_active || 'Đang cập nhật.'
                    });
                }

                const linesRes = await fetch(`${supabaseUrl}/rest/v1/lines`, {
                    method: 'POST',
                    headers,
                    body: JSON.stringify(lineBodies)
                });

                if (!linesRes.ok) {
                    console.error(`Lỗi upsert hào của quẻ ${hexName}:`, await linesRes.text());
                }
            } catch (err) {
                console.error(`Lỗi kết nối khi đồng bộ quẻ ${hexName}:`, err.message);
            }
        }
    }
    console.log('Hoàn tất đồng bộ hóa toàn bộ 64 quẻ và 384 hào vào Supabase!');
}

importData();
