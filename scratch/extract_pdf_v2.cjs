const fs = require('fs');
const path = require('path');
const pdf = require('pdf-parse');

const pdfFile = path.join(__dirname, '..', 'Ý Nghĩa 64 Quẻ 384 Hào.pdf');
const outputFile = path.join(__dirname, 'Ý Nghĩa 64 Quẻ 384 Hào_v2.txt');

console.log('Đang đọc file PDF bằng pdf-parse v1.1.1:', pdfFile);

if (!fs.existsSync(pdfFile)) {
    console.error('Không tìm thấy file PDF tại:', pdfFile);
    process.exit(1);
}

const dataBuffer = fs.readFileSync(pdfFile);

pdf(dataBuffer).then(function(data) {
    console.log('Số trang:', data.numpages);
    console.log('Đang ghi nội dung ra file:', outputFile);
    fs.writeFileSync(outputFile, data.text, 'utf-8');
    console.log('Trích xuất v2 thành công!');
}).catch(err => {
    console.error('Lỗi khi parse PDF:', err);
});
