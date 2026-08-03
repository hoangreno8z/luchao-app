const fs = require('fs');
const path = require('path');

const inputFile = path.join(__dirname, 'Ý Nghĩa 64 Quẻ 384 Hào_clean.txt');
const outputFile = path.join(__dirname, '64_hexagrams_reconstructed.json');

const rawText = fs.readFileSync(inputFile, 'utf-8');
const lines = rawText.split('\n').map(l => l.trim());

// Danh sách 64 quẻ theo đúng thứ tự cặp cột trong file PDF
// Cặp 1: Càn (1) - Khôn (2)
// Cặp 2: Truân (3) - Mông (4)
// Cặp 3: Nhu (5) - Tụng (6)
// Cặp 4: Sư (7) - Tỷ (8)
// Cặp 5: Tiểu Súc (9) - Lý (10)
// Cặp 6: Thái (11) - Bĩ (12)
// ...
const HEX_NAMES_ORDER = [
    // 1-2
    { left: 'Bát Thuần Càn', right: 'Bát Thuần Khôn' },
    // 3-4
    { left: 'Thủy Lôi Truân', right: 'Sơn Thủy Mông' },
    // 5-6
    { left: 'Thủy Thiên Nhu', right: 'Thiên Thủy Tụng' },
    // 7-8
    { left: 'Địa Thủy Sư', right: 'Thủy Địa Tỷ' },
    // 9-10
    { left: 'Thiên Phong Tiểu Súc', right: 'Thiên Trạch Lý' },
    // 11-12
    { left: 'Địa Thiên Thái', right: 'Thiên Địa Bĩ' },
    // 13-14
    { left: 'Thiên Hỏa Đồng Nhân', right: 'Hỏa Thiên Đại Hữu' },
    // 15-16
    { left: 'Địa Sơn Khiêm', right: 'Lôi Địa Dự' },
    // 17-18
    { left: 'Trạch Lôi Tùy', right: 'Sơn Phong Cổ' },
    // 19-20
    { left: 'Địa Trạch Lâm', right: 'Phong Địa Quan' },
    // 21-22
    { left: 'Hỏa Lôi Phệ Hạp', right: 'Sơn Hỏa Bí' },
    // 23-24
    { left: 'Sơn Địa Bác', right: 'Địa Lôi Phục' },
    // 25-26
    { left: 'Thiên Lôi Vô Vọng', right: 'Sơn Thiên Đại Súc' },
    // 27-28
    { left: 'Sơn Lôi Di', right: 'Trạch Phong Đại Quá' },
    // 29-30
    { left: 'Bát Thuần Khảm', right: 'Bát Thuần Ly' },
    // 31-32
    { left: 'Trạch Sơn Hàm', right: 'Lôi Phong Hằng' },
    // 33-34
    { left: 'Thiên Sơn Độn', right: 'Lôi Thiên Đại Tráng' },
    // 35-36
    { left: 'Hỏa Địa Tấn', right: 'Hỏa Sơn Lữ' },
    // 37-38
    { left: 'Phong Hỏa Gia Nhân', right: 'Hỏa Trạch Khuê' },
    // 39-40
    { left: 'Thủy Sơn Kiển', right: 'Lôi Thủy Giải' },
    // 41-42
    { left: 'Sơn Trạch Tổn', right: 'Phong Lôi Ích' },
    // 43-44
    { left: 'Trạch Thiên Quải', right: 'Thiên Phong Cấu' },
    // 45-46
    { left: 'Trạch Địa Tụy', right: 'Địa Phong Thăng' },
    // 47-48
    { left: 'Trạch Thủy Khốn', right: 'Thủy Phong Tỉnh' },
    // 49-50
    { left: 'Trạch Hỏa Cách', right: 'Hỏa Phong Đỉnh' },
    // 51-52
    { left: 'Bát Thuần Chấn', right: 'Bát Thuần Cấn' },
    // 53-54
    { left: 'Phong Sơn Tiệm', right: 'Lôi Trạch Quy Muội' },
    // 55-56
    { left: 'Lôi Hỏa Phong', right: 'Hỏa Sơn Lữ' }, // Lưu ý: xem lại cặp 56
    // 57-58
    { left: 'Bát Thuần Tốn', right: 'Bát Thuần Đoài' },
    // 59-60
    { left: 'Phong Thủy Hoán', right: 'Thủy Trạch Tiết' },
    // 61-62
    { left: 'Phong Trạch Trung Phu', right: 'Lôi Sơn Tiểu Quá' },
    // 63-64
    { left: 'Thủy Hỏa Ký Tế', right: 'Hỏa Thủy Vị Tế' }
];

// Map tên quẻ chuẩn trong app với tên quái trong file
const NORM_NAME_MAP = {
    'Thuần Kiền': 'Bát Thuần Càn',
    'Thuần Khôn': 'Bát Thuần Khôn',
    'Truân': 'Thủy Lôi Truân',
    'Mông': 'Sơn Thủy Mông',
    'Nhu': 'Thủy Thiên Nhu',
    'Tụng': 'Thiên Thủy Tụng',
    'Sư': 'Địa Thủy Sư',
    'Tỷ': 'Thủy Địa Tỷ',
    'Tiểu Súc': 'Thiên Phong Tiểu Súc',
    'Lý': 'Thiên Trạch Lý',
    'Thái': 'Địa Thiên Thái',
    'Bĩ': 'Thiên Địa Bĩ',
    'Đồng Nhân': 'Thiên Hỏa Đồng Nhân',
    'Đại Hữu': 'Hỏa Thiên Đại Hữu',
    'Khiêm': 'Địa Sơn Khiêm',
    'Dự': 'Lôi Địa Dự',
    'Tùy': 'Trạch Lôi Tùy',
    'Cổ': 'Sơn Phong Cổ',
    'Lâm': 'Địa Trạch Lâm',
    'Quan': 'Phong Địa Quan',
    'Phệ Hạp': 'Hỏa Lôi Phệ Hạp',
    'Bí': 'Sơn Hỏa Bí',
    'Bác': 'Sơn Địa Bác',
    'Phục': 'Địa Lôi Phục',
    'Vô Vọng': 'Thiên Lôi Vô Vọng',
    'Đại Súc': 'Sơn Thiên Đại Súc',
    'Di': 'Sơn Lôi Di',
    'Đại Quá': 'Trạch Phong Đại Quá',
    'Khảm': 'Bát Thuần Khảm',
    'Ly': 'Bát Thuần Ly',
    'Hàm': 'Trạch Sơn Hàm',
    'Hằng': 'Lôi Phong Hằng',
    'Độn': 'Thiên Sơn Độn',
    'Đại Tráng': 'Lôi Thiên Đại Tráng',
    'Tấn': 'Hỏa Địa Tấn',
    'Minh Di': 'Địa Hỏa Minh Di',
    'Gia Nhân': 'Phong Hỏa Gia Nhân',
    'Khuê': 'Hỏa Trạch Khuê',
    'Kiển': 'Thủy Sơn Kiển',
    'Giải': 'Lôi Thủy Giải',
    'Tổn': 'Sơn Trạch Tổn',
    'Ích': 'Phong Lôi Ích',
    'Quải': 'Trạch Thiên Quải',
    'Cấu': 'Thiên Phong Cấu',
    'Tụy': 'Trạch Địa Tụy',
    'Thăng': 'Địa Phong Thăng',
    'Khốn': 'Trạch Thủy Khốn',
    'Tỉnh': 'Thủy Phong Tỉnh',
    'Cách': 'Trạch Hỏa Cách',
    'Đỉnh': 'Hỏa Phong Đỉnh',
    'Chấn': 'Bát Thuần Chấn',
    'Cấn': 'Bát Thuần Cấn',
    'Tiệm': 'Phong Sơn Tiệm',
    'Quy Muội': 'Lôi Trạch Quy Muội',
    'Phong': 'Lôi Hỏa Phong',
    'Lữ': 'Hỏa Sơn Lữ',
    'Tốn': 'Bát Thuần Tốn',
    'Đoài': 'Bát Thuần Đoài',
    'Hoán': 'Phong Thủy Hoán',
    'Tiết': 'Thủy Trạch Tiết',
    'Trung Phu': 'Phong Trạch Trung Phu',
    'Tiểu Quá': 'Lôi Sơn Tiểu Quá',
    'Ký Tế': 'Thủy Hỏa Ký Tế',
    'Vị Tế': 'Hỏa Thủy Vị Tế'
};

const resultHexagrams = {};

// Khởi tạo đối tượng cho cả 64 quẻ
for (let key in NORM_NAME_MAP) {
    resultHexagrams[NORM_NAME_MAP[key]] = {
        name: NORM_NAME_MAP[key],
        meaning: '',
        overall: '',
        career: '',
        lines: {
            1: { meaning_static: '', meaning_active: '' },
            2: { meaning_static: '', meaning_active: '' },
            3: { meaning_static: '', meaning_active: '' },
            4: { meaning_static: '', meaning_active: '' },
            5: { meaning_static: '', meaning_active: '' },
            6: { meaning_static: '', meaning_active: '' }
        }
    };
}

// Bắt đầu duyệt text và phân bổ theo cặp
let pairIndex = 0;
let currentLeft = null;
let currentRight = null;

let lineIdx = 0;
while (lineIdx < lines.length) {
    const line = lines[lineIdx];
    
    // Tìm tiêu đề quẻ mới
    if (line.startsWith('TÊN QUÁI') && pairIndex < HEX_NAMES_ORDER.length) {
        const pair = HEX_NAMES_ORDER[pairIndex];
        currentLeft = resultHexagrams[pair.left];
        currentRight = resultHexagrams[pair.right];
        pairIndex++;
        lineIdx++;
        continue;
    }
    
    if (!currentLeft || !currentRight) {
        lineIdx++;
        continue;
    }
    
    // Đọc phần Lời Kinh (Lời Kinh quẻ trái nằm trước, Lời Kinh quẻ phải nằm sau)
    if (line.startsWith('Lời Kinh')) {
        let leftText = '';
        let rightText = '';
        lineIdx++;
        
        // Đoạn đầu là Lời Kinh quẻ trái
        while (lineIdx < lines.length && !lines[lineIdx].startsWith('Bàn về')) {
            if (lines[lineIdx]) leftText += lines[lineIdx] + ' ';
            lineIdx++;
        }
        
        // Bỏ qua chữ "Bàn về"
        if (lineIdx < lines.length && lines[lineIdx].startsWith('Bàn về')) {
            lineIdx++;
        }
        
        // Đoạn sau là Lời Kinh quẻ phải
        while (lineIdx < lines.length && !lines[lineIdx].startsWith('Hào 1') && !lines[lineIdx].startsWith('Lời Kinh') && !lines[lineIdx].startsWith('TÊN QUÁI')) {
            if (lines[lineIdx]) rightText += lines[lineIdx] + ' ';
            lineIdx++;
        }
        
        currentLeft.overall = leftText.trim();
        currentRight.overall = rightText.trim();
        continue;
    }
    
    // Đọc phần Hào từ (Hào 1 đến Hào 6)
    if (line.startsWith('Hào')) {
        const match = line.match(/^Hào\s(\d)/);
        if (match) {
            const haoNum = parseInt(match[1]);
            lineIdx++;
            
            let leftHaoText = '';
            let rightHaoText = '';
            
            // Đọc Hào quẻ trái
            while (lineIdx < lines.length && !lines[lineIdx].startsWith('Hào') && !lines[lineIdx].startsWith('TÊN QUÁI') && !lines[lineIdx].startsWith('Lời Kinh')) {
                // Nếu thấy ngoặc đơn tiếp theo, có thể là Hào quẻ phải bắt đầu
                if (lines[lineIdx].startsWith('(') && leftHaoText !== '') {
                    break;
                }
                if (lines[lineIdx]) leftHaoText += lines[lineIdx] + ' ';
                lineIdx++;
            }
            
            // Đọc Hào quẻ phải
            while (lineIdx < lines.length && !lines[lineIdx].startsWith('Hào') && !lines[lineIdx].startsWith('TÊN QUÁI') && !lines[lineIdx].startsWith('Lời Kinh')) {
                if (lines[lineIdx]) rightHaoText += lines[lineIdx] + ' ';
                lineIdx++;
            }
            
            // Phân tách tĩnh/động trong Hào (file PDF mô tả: (Nghĩa tĩnh). (Nghĩa động/biến).)
            const parseHaoText = (txt) => {
                const parts = txt.split(').');
                if (parts.length >= 2) {
                    return {
                        static: (parts[0] + ')').trim(),
                        active: parts.slice(1).join(').').trim()
                    };
                }
                return { static: txt.trim(), active: txt.trim() };
            };
            
            const leftParsed = parseHaoText(leftHaoText);
            const rightParsed = parseHaoText(rightHaoText);
            
            currentLeft.lines[haoNum] = {
                meaning_static: leftParsed.static,
                meaning_active: leftParsed.active
            };
            currentRight.lines[haoNum] = {
                meaning_static: rightParsed.static,
                meaning_active: rightParsed.active
            };
            continue;
        }
    }
    
    lineIdx++;
}

// Lưu file kết quả JSON
fs.writeFileSync(outputFile, JSON.stringify(resultHexagrams, null, 2), 'utf-8');
console.log('Phân tách và cấu trúc hóa dữ liệu 64 quẻ thành công!');
