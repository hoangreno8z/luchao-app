const fs = require('fs');
const path = require('path');
const { PdfReader } = require('pdfreader');

// Tìm file PDF có chữ "tu-ng-chan" hoặc tương tự
const currentDir = path.join(__dirname, '..');
const files = fs.readdirSync(currentDir);
const targetPdf = files.find(f => f.toLowerCase().includes('tu-ng-chan') && f.endsWith('.pdf'));

if (!targetPdf) {
    console.error('Không tìm thấy file Lục Hào Tượng Chẩn PDF');
    process.exit(1);
}

const pdfFile = path.join(currentDir, targetPdf);
const outputFile = path.join(__dirname, 'Luc_Hao_Tuong_Chan_clean.txt');

console.log('Đang trích xuất:', targetPdf);

let extractedText = '';
new PdfReader().parseFileItems(pdfFile, (err, item) => {
    if (err) {
        console.error('Lỗi:', err);
    } else if (!item) {
        console.log('Hoàn thành parse file. Đang lưu ra:', outputFile);
        fs.writeFileSync(outputFile, extractedText, 'utf-8');
        console.log('Trích xuất thành công!');
    } else if (item.text) {
        extractedText += item.text + '\n';
    }
});
