const fs = require('fs');
const path = require('path');

const jsonFile = path.join(__dirname, '64_hexagrams_reconstructed.json');
const hexagramsData = JSON.parse(fs.readFileSync(jsonFile, 'utf-8'));

// Bảng ánh xạ id quẻ
const TEN_QUE_MATRIX = [
    ['Bát Thuần Khôn', 'Địa Sơn Khiêm', 'Địa Thủy Sư', 'Địa Phong Thăng', 'Địa Lôi Phục', 'Địa Hỏa Minh Di', 'Địa Trạch Lâm', 'Địa Thiên Thái'],
    ['Sơn Địa Bác', 'Bát Thuần Cấn', 'Sơn Thủy Mông', 'Sơn Phong Cổ', 'Sơn Lôi Di', 'Sơn Hỏa Bí', 'Sơn Trạch Tổn', 'Sơn Thiên Đại Súc'],
    ['Thủy Địa Tỷ', 'Thủy Sơn Kiển', 'Bát Thuần Khảm', 'Thủy Phong Tỉnh', 'Thủy Lôi Truân', 'Thủy Hỏa Ký Tế', 'Thủy Trạch Tiết', 'Thủy Thiên Nhu'],
    ['Phong Địa Quan', 'Phong Sơn Tiệm', 'Phong Thủy Hoán', 'Bát Thuần Tốn', 'Phong Lôi Ích', 'Phong Hỏa Gia Nhân', 'Phong Trạch Trung Phu', 'Phong Thiên Tiểu Súc'],
    ['Lôi Địa Dự', 'Lôi Sơn Tiểu Quá', 'Lôi Thủy Giải', 'Lôi Phong Hằng', 'Bát Thuần Chấn', 'Lôi Hỏa Phong', 'Lôi Trạch Quy Muội', 'Lôi Thiên Đại Tráng'],
    ['Hỏa Địa Tấn', 'Hỏa Sơn Lữ', 'Hỏa Thủy Vị Tế', 'Hỏa Phong Đỉnh', 'Hỏa Lôi Phệ Hạp', 'Bát Thuần Ly', 'Hỏa Trạch Khuê', 'Hỏa Thiên Đại Hữu'],
    ['Trạch Địa Tụy', 'Trạch Sơn Hàm', 'Trạch Thủy Khốn', 'Trạch Phong Đại Quá', 'Trạch Lôi Tùy', 'Trạch Hỏa Cách', 'Bát Thuần Đoài', 'Trạch Thiên Quải'],
    ['Thiên Địa Bĩ', 'Thiên Sơn Độn', 'Thiên Thủy Tụng', 'Thiên Phong Cấu', 'Thiên Lôi Vô Vọng', 'Thiên Hỏa Đồng Nhân', 'Thiên Trạch Lý', 'Bát Thuần Càn']
];

const PALACE_MAP = {
    'Bát Thuần Càn': 'Càn', 'Thiên Phong Cấu': 'Càn', 'Thiên Sơn Độn': 'Càn', 'Thiên Địa Bĩ': 'Càn',
    'Phong Địa Quan': 'Càn', 'Sơn Địa Bác': 'Càn', 'Hỏa Địa Tấn': 'Càn', 'Hỏa Thiên Đại Hữu': 'Càn',
    'Bát Thuần Khảm': 'Khảm', 'Thủy Trạch Tiết': 'Khảm', 'Thủy Lôi Truân': 'Khảm', 'Thủy Hỏa Ký Tế': 'Khảm',
    'Trạch Lôi Tùy': 'Khảm', 'Lôi Phong Hằng': 'Tốn', 'Lôi Địa Dự': 'Chấn', 'Địa Thủy Sư': 'Khảm',
    'Bát Thuần Cấn': 'Cấn', 'Sơn Hỏa Bí': 'Cấn', 'Sơn Thiên Đại Súc': 'Cấn', 'Sơn Trạch Tổn': 'Cấn',
    'Hỏa Trạch Khuê': 'Cấn', 'Thiên Trạch Lý': 'Cấn', 'Phong Trạch Trung Phu': 'Cấn', 'Phong Sơn Tiệm': 'Cấn',
    'Bát Thuần Chấn': 'Chấn', 'Lôi Thủy Giải': 'Chấn',
    'Địa Phong Thăng': 'Chấn', 'Thủy Phong Tỉnh': 'Chấn', 'Trạch Phong Đại Quá': 'Chấn',
    'Bát Thuần Tốn': 'Tốn', 'Phong Thiên Tiểu Súc': 'Tốn', 'Phong Hỏa Gia Nhân': 'Tốn', 'Phong Lôi Ích': 'Tốn',
    'Thiên Lôi Vô Vọng': 'Tốn', 'Hỏa Lôi Phệ Hạp': 'Tốn', 'Sơn Lôi Di': 'Tốn', 'Sơn Phong Cổ': 'Tốn',
    'Bát Thuần Ly': 'Ly', 'Hỏa Sơn Lữ': 'Ly', 'Hỏa Địa Tấn': 'Ly', 'Hỏa Thủy Vị Tế': 'Ly',
    'Thiên Thủy Tụng': 'Ly', 'Phong Thủy Hoán': 'Ly', 'Thủy Địa Tỷ': 'Ly',
    'Bát Thuần Khôn': 'Khôn', 'Địa Lôi Phục': 'Khôn', 'Địa Trạch Lâm': 'Khôn', 'Địa Thiên Thái': 'Khôn',
    'Lôi Thiên Đại Tráng': 'Khôn', 'Trạch Thiên Quải': 'Khôn', 'Thủy Thiên Nhu': 'Khôn',
    'Bát Thuần Đoài': 'Đoài', 'Trạch Thủy Khốn': 'Đoài', 'Trạch Địa Tụy': 'Đoài', 'Trạch Sơn Hàm': 'Đoài',
    'Sơn Thủy Mông': 'Đoài', 'Thủy Sơn Kiển': 'Đoài', 'Lôi Sơn Tiểu Quá': 'Đoài'
};

const outputData = {};

for (let outIdx = 0; outIdx < 8; outIdx++) {
    for (let inIdx = 0; inIdx < 8; inIdx++) {
        const hexName = TEN_QUE_MATRIX[outIdx][inIdx];
        const hexId = (outIdx << 3) | inIdx;
        const palace = PALACE_MAP[hexName] || 'Chưa rõ';
        const source = hexagramsData[hexName] || { overall: '', lines: {} };
        
        outputData[hexId] = {
            id: hexId,
            name: hexName,
            palace: palace,
            overall: (source.overall || 'Luận giải đang cập nhật.').replace(/"/g, '\\"'),
            lines: {}
        };
        
        for (let h = 1; h <= 6; h++) {
            const lineInfo = source.lines?.[h] || { meaning_static: 'Đang cập nhật.', meaning_active: 'Đang cập nhật.' };
            outputData[hexId].lines[h] = {
                static: (lineInfo.meaning_static || 'Đang cập nhật.').replace(/"/g, '\\"'),
                active: (lineInfo.meaning_active || 'Đang cập nhật.').replace(/"/g, '\\"')
            };
        }
    }
}

const jsContent = `/**
 * FALLBACK KNOWLEDGE DATABASE
 * Tự động tạo bởi extract script - chứa đầy đủ 64 quẻ và 384 hào.
 */
export const FALLBACK_HEXAGRAMS_DB = ${JSON.stringify(outputData, null, 2)};
`;

fs.writeFileSync(path.join(__dirname, '..', 'api', 'fallback_db.js'), jsContent, 'utf-8');
console.log('Đã tạo thành công api/fallback_db.js chứa trọn vẹn 64 quẻ!');
