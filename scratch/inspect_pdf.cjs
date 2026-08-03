const fs = require('fs');
const path = require('path');
const pdfModule = require('pdf-parse');

const pdfFile = path.join(__dirname, '..', 'Ý Nghĩa 64 Quẻ 384 Hào.pdf');

const dataBuffer = fs.readFileSync(pdfFile);

console.log('Các thuộc tính của pdfModule:', Object.keys(pdfModule));

// Thử khởi tạo PDFParse nếu nó là class
if (pdfModule.PDFParse) {
    try {
        const parser = new pdfModule.PDFParse();
        console.log('Khởi tạo PDFParse thành công!');
        // Kiểm tra các method của instance
        console.log('Các phương thức của instance:', Object.getOwnPropertyNames(Object.getPrototypeOf(parser)));
    } catch(e) {
        console.log('Không thể khởi tạo PDFParse bằng new:', e.message);
    }
}
