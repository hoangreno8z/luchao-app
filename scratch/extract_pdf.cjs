const fs = require('fs');
const path = require('path');
const { PdfReader } = require('pdfreader');

const pdfFile = path.join(__dirname, '..', 'Ý Nghĩa 64 Quẻ 384 Hào.pdf');
const outputFile = path.join(__dirname, 'Ý Nghĩa 64 Quẻ 384 Hào.txt');

console.log('Đang đọc file PDF bằng pdfreader:', pdfFile);

if (!fs.existsSync(pdfFile)) {
    console.error('Không tìm thấy file PDF tại:', pdfFile);
    process.exit(1);
}

let extractedText = '';
new PdfReader().parseFileItems(pdfFile, (err, item) => {
    if (err) {
        console.error('Lỗi khi parse PDF:', err);
    } else if (!item) {
        console.log('Hoàn thành parse file. Đang ghi ra:', outputFile);
        fs.writeFileSync(outputFile, extractedText, 'utf-8');
        console.log('Trích xuất thành công!');
    } else if (item.text) {
        // Tích lũy chữ kèm xuống dòng
        extractedText += item.text + '\n';
    }
});
