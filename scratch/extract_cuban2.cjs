const fs = require('fs');
const path = require('path');
const { PdfReader } = require('pdfreader');

const currentDir = path.join(__dirname, '..');
const files = fs.readdirSync(currentDir);
// Khớp file cụ bân 2 theo kích thước ~28.7MB (khoảng 28,000,000 đến 29,500,000 byte)
const targetPdf = files.find(f => {
    if (!f.endsWith('.pdf')) return false;
    const stat = fs.statSync(path.join(currentDir, f));
    return stat.size > 28000000 && stat.size < 29500000;
});

if (!targetPdf) {
    console.error('Không tìm thấy file cụ bân 2 PDF theo kích thước');
    process.exit(1);
}

const pdfFile = path.join(currentDir, targetPdf);
const outputFile = path.join(__dirname, 'cuban2_clean.txt');

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
        // Chỉ lưu các dòng chứa thông tin luận quẻ hữu ích để tiết kiệm dung lượng
        extractedText += item.text + '\n';
    }
});
