const fs = require('fs');
const path = require('path');

const inputFile = path.join(__dirname, 'Ý Nghĩa 64 Quẻ 384 Hào.txt');
const outputFile = path.join(__dirname, 'Ý Nghĩa 64 Quẻ 384 Hào_clean.txt');

console.log('Đang đọc file text bị bẻ chữ...');
const rawText = fs.readFileSync(inputFile, 'utf-8');

// Thuật toán gộp từ bị bẻ dòng do lỗi Unicode tiếng Việt dấu rời
const lines = rawText.split('\n').map(line => line.trim());
const cleanedLines = [];

const NGUYEN_AM_DAU = ['á','à','ả','ã','ạ','ă','ắ','ằ','ẳ','ẵ','ặ','â','ấ','ầ','ẩ','ẫ','ậ','é','è','ẻ','ẽ','ẹ','ê','ế','ề','ể','ễ','ệ','í','ì','ỉ','ĩ','ị','ó','ò','ỏ','õ','ọ','ô','ố','ồ','ổ','ỗ','ộ','ơ','ớ','ờ','ở','ỡ','ợ','ú','ù','ủ','ũ','ụ','ư','ứ','ừ','ử','ữ','ự','ý','ỳ','ỷ','ỹ','ỵ','đ'];

let i = 0;
while (i < lines.length) {
    let currentLine = lines[i];
    
    if (!currentLine) {
        cleanedLines.push('');
        i++;
        continue;
    }
    
    // Nếu dòng tiếp theo là một ký tự dấu rời rạc hoặc nguyên âm có dấu rời rạc
    // hoặc một chữ ngắn đại diện cho phần cuối của từ bị bẻ (VD: "ầ", "ĩ", "ượ", "ng")
    while (i + 1 < lines.length) {
        const nextLine = lines[i + 1];
        if (!nextLine) break;

        // Luật 1: Dòng tiếp theo là chữ cái dấu hoặc phụ âm đơn lẻ bị rơi
        const isSingleChar = nextLine.length === 1;
        const isEndSuffix = ['ng', 'ch', 'nh', 'c', 't', 'p', 'm', 'n', 'o', 'u', 'i', 'y', 'a', 'e'].includes(nextLine.toLowerCase());
        const isVietnameseVowel = NGUYEN_AM_DAU.includes(nextLine.toLowerCase()[0]);
        
        // Nếu dòng hiện tại kết thúc bằng chữ dở dang (VD: "Ý Ngh", dòng sau: "ĩ")
        // Hoặc dòng hiện tại là phụ âm đầu ("Thu", dòng sau: "ầ")
        if (isSingleChar || isEndSuffix || (isVietnameseVowel && currentLine.length < 15)) {
            // Nối từ lại
            currentLine += nextLine;
            i++; // Bỏ qua dòng tiếp theo đã được gộp
        } else {
            break;
        }
    }
    
    cleanedLines.push(currentLine);
    i++;
}

// Giai đoạn 2: Nối các dòng thuộc cùng một đoạn văn (Paragraph Rebuilding)
const finalLines = [];
let tempParagraph = [];

for (let line of cleanedLines) {
    if (line === '') {
        if (tempParagraph.length > 0) {
            finalLines.push(tempParagraph.join(' '));
            tempParagraph = [];
        }
        finalLines.push('');
    } else {
        // Nếu dòng bắt đầu bằng tiêu đề quẻ hoặc hào từ, lưu đoạn cũ và mở đoạn mới
        if (line.match(/^Hào \d/) || line.match(/^\d+\s/) || line.match(/^Thuần\s/) || line.match(/^Tên\sQuái/i) || line.match(/^Lời\sKinh/i) || line.match(/^Bàn\svề/i)) {
            if (tempParagraph.length > 0) {
                finalLines.push(tempParagraph.join(' '));
                tempParagraph = [];
            }
            finalLines.push(line);
        } else {
            tempParagraph.push(line);
        }
    }
}
if (tempParagraph.length > 0) {
    finalLines.push(tempParagraph.join(' '));
}

// Ghi file sạch
fs.writeFileSync(outputFile, finalLines.join('\n'), 'utf-8');
console.log('Đã làm sạch và sửa lỗi bẻ chữ thành công! File ghi ra:', outputFile);
