const fs = require('fs');
const path = require('path');
const { PdfReader } = require('pdfreader');

const currentDir = path.join(__dirname, '..');
const files = fs.readdirSync(currentDir);
// Tìm file cụ bân 3 theo kích thước ~24MB (khoảng 23,000,000 đến 25,000,000 byte)
const targetPdf = files.find(f => {
    if (!f.endsWith('.pdf')) return false;
    const stat = fs.statSync(path.join(currentDir, f));
    return stat.size > 23000000 && stat.size < 25000000;
});

if (!targetPdf) {
    console.error('Không tìm thấy file cụ bân 3');
    process.exit(1);
}

const pdfFile = path.join(currentDir, targetPdf);
const outputFile = path.join(__dirname, 'cuban3_clean.txt');

console.log('Đang trích xuất thử cụ bân 3:', targetPdf);

let extractedText = '';
new PdfReader().parseFileItems(pdfFile, (err, item) => {
    if (err) {
        console.error('Lỗi:', err);
    } else if (!item) {
        fs.writeFileSync(outputFile, extractedText, 'utf-8');
        console.log('Hoàn thành! Kích thước file tạo ra:', extractedText.length);
    } else if (item.text) {
        extractedText += item.text + '\n';
        // Dừng sớm nếu có text để tránh đầy ổ đĩa
        if (extractedText.length > 5000) {
            fs.writeFileSync(outputFile, extractedText, 'utf-8');
            console.log('Phát hiện có text chuẩn! Đã lưu thử 5000 ký tự đầu.');
            process.exit(0);
        }
    }
});
