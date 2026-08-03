const fs = require('fs');
const path = require('path');
const { PdfReader } = require('pdfreader');

const currentDir = path.join(__dirname, '..');
const files = fs.readdirSync(currentDir);
// Tìm file PDF theo kích thước ~4.1MB (khoảng 4,100,000 đến 4,200,000 byte)
const targetPdf = files.find(f => {
    if (!f.endsWith('.pdf')) return false;
    const stat = fs.statSync(path.join(currentDir, f));
    return stat.size > 4000000 && stat.size < 4300000;
});

if (!targetPdf) {
    console.error('Không tìm thấy file Cổ Thệ Thực Chiến 1 PDF theo kích thước');
    process.exit(1);
}

const pdfFile = path.join(currentDir, targetPdf);
const outputFile = path.join(__dirname, 'Co_The_Thuc_Chien_clean.txt');

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
