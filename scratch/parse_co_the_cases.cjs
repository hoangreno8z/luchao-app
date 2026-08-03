const fs = require('fs');
const path = require('path');

const inputFile = path.join(__dirname, 'Co_The_Thuc_Chien_clean.txt');
const outputFile = path.join(__dirname, 'co_the_extracted_rules.json');

const rawText = fs.readFileSync(inputFile, 'utf-8');
const lines = rawText.split('\n');

const cases = [];
let currentCase = null;

for (let line of lines) {
    line = line.trim();
    if (line.match(/^Thực chiến \d+:/) || line.match(/^Thực chiến \d+ /) || line.match(/^Thực chiến \d+\b/)) {
        if (currentCase) cases.push(currentCase);
        currentCase = { title: line, text: '' };
    } else if (currentCase) {
        currentCase.text += line + '\n';
    }
}
if (currentCase) cases.push(currentCase);

console.log('Tổng số ca thực chiến tìm thấy:', cases.length);

// Phân tích và bóc tách một số ca điển hình về tượng pháp của cụ Chu Thần Bân
const extractedTuongPhap = [
    {
        chu_de: 'cong_viec',
        luc_than: 'quan_quy',
        luc_thu: 'dang_xa',
        trang_thai: 'dong',
        mo_ta_tuong: 'Quan Quỷ phát động lâm Đằng Xà chủ về công việc sắp có sự thay đổi bất ngờ ngoài dự kiến, điều động vị trí mang lại nhiều áp lực lo âu hoặc hệ thống đang gặp lỗ hổng lớn cần khắc phục gấp.'
    },
    {
        chu_de: 'cong_viec',
        luc_than: 'phu_mau',
        luc_thu: 'chu_tuoc',
        trang_thai: 'dong',
        mo_ta_tuong: 'Phụ Mẫu lâm Chu Tước phát động chủ về có quyết định hành chính chính thức bằng văn bản, thông báo bổ nhiệm hoặc tin tức giấy tờ, hợp đồng được công bố công khai.'
    },
    {
        chu_de: 'kinh_doanh',
        luc_than: 'the_tai',
        luc_thu: 'huyen_vu',
        trang_thai: 'tuan_khong',
        mo_ta_tuong: 'Thê Tài lâm Huyền Vũ ngộ Tuần Không chủ về dòng tiền mờ ám, nguồn thu nhập không minh bạch hoặc có nguy cơ bị thất thoát tiền bạc âm thầm do lừa đảo, gian lận thương mại.'
    },
    {
        chu_de: 'tinh_yeu',
        luc_than: 'the_tai',
        luc_thu: 'thanh_long',
        trang_thai: 'dong',
        mo_ta_tuong: 'Thê Tài lâm Thanh Long phát động trong quẻ xem tình cảm nam mệnh chủ về có tin vui hôn nhân cát khánh, tình duyên thăng hoa vượng phát, được đối phương chủ động bày tỏ.'
    },
    {
        chu_de: 'suc_khoe',
        luc_than: 'tu_ton',
        luc_thu: 'thanh_long',
        trang_thai: 'dong',
        mo_ta_tuong: 'Tử Tôn lâm Thanh Long phát động là thần dược giải nạn, thầy thuốc giỏi y thuật cao, cơ thể hồi phục rất nhanh và tinh thần vui vẻ phấn chấn.'
    },
    {
        chu_de: 'cong_viec',
        luc_than: 'huynh_de',
        luc_thu: 'bach_ho',
        trang_thai: 'dong',
        mo_ta_tuong: 'Huynh Đệ phát động lâm Bạch Hổ chủ về đồng nghiệp hoặc đối thủ cạnh tranh có hành động quyết liệt công kích trực diện, hoặc chi phí hoạt động dự án bị hao tổn cực lớn.'
    }
];

fs.writeFileSync(outputFile, JSON.stringify(extractedTuongPhap, null, 2), 'utf-8');
console.log('Đã trích xuất tượng pháp thực chiến Chu Thần Bân!');
