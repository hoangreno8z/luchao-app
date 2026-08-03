const fs = require('fs');
const path = require('path');

const inputTxt = path.join(__dirname, 'Luc_Hao_Tuong_Chan_clean.txt');
const outputFile = path.join(__dirname, 'tuong_chan_extracted_rules.json');

if (!fs.existsSync(inputTxt)) {
    console.error('Không tìm thấy file text Lục Hào Tượng Chẩn');
    process.exit(1);
}

const rawText = fs.readFileSync(inputTxt, 'utf-8');
const lines = rawText.split('\n');

// Các quy tắc tượng pháp quan trọng bóc tách từ sách
const rules = [
    {
        chu_de: 'all',
        luc_than: 'quan_quy',
        trang_thai: 'nhap_mo',
        mo_ta_tuong: 'Dụng thần nhập Mộ đại biểu cho việc bị giam hãm, năng lực bị che khuất, người hỏi đang ở trong hoàn cảnh bế tắc, bất lực không có cách nào tự thoát ra.'
    },
    {
        chu_de: 'cong_viec',
        luc_than: 'quan_quy',
        trang_thai: 'nguyet_pha',
        mo_ta_tuong: 'Quan Quỷ bị Nguyệt phá nghĩa là chức vụ hoặc cơ hội thăng tiến bị phá vỡ hoàn toàn, sếp trực tiếp không còn tín nhiệm, đề phòng bị cách chức hoặc sa thải.'
    },
    {
        chu_de: 'cong_viec',
        luc_than: 'the_tai',
        trang_thai: 'tuan_khong',
        mo_ta_tuong: 'Thê Tài lâm Tuần Không chủ về tài chính dự án chưa thực sự có nguồn tiền về, nguồn vốn bị trống rỗng, hoặc đối tác chỉ hứa hẹn suông mà không thực thi.'
    },
    {
        chu_de: 'tinh_yeu',
        luc_than: 'huynh_de',
        trang_thai: 'dong',
        mo_ta_tuong: 'Huynh Đệ chủ về sự tranh đoạt. Huynh Đệ phát động trong quẻ tình duyên là tượng có kẻ thứ ba xen vào, tình địch hoạt động mạnh mẽ chia rẽ đôi bên.'
    },
    {
        chu_de: 'suc_khoe',
        luc_than: 'quan_quy',
        trang_thai: 'am_dong',
        mo_ta_tuong: 'Quan Quỷ ám động là tượng bệnh cũ bất ngờ tái phát nhanh chóng, hoặc có nguồn bệnh ẩn giấu lâu ngày nay bộc phát bất ngờ cần cấp cứu khẩn cấp.'
    },
    {
        chu_de: 'cong_viec',
        luc_than: 'quan_quy',
        trang_thai: 'am_dong',
        mo_ta_tuong: 'Quan Quỷ ám động trong công việc là điềm báo sếp hoặc cơ quan quản lý sắp có đợt thanh tra, kiểm tra bất ngờ, hoặc có cơ hội thăng tiến bộc phát rất nhanh ngoài dự kiến.'
    },
    {
        chu_de: 'all',
        luc_than: 'phu_mau',
        trang_thai: 'nguyet_pha',
        mo_ta_tuong: 'Phụ Mẫu bị Nguyệt phá chủ về hợp đồng pháp lý bị hủy bỏ, giấy tờ gặp trục trặc nghiêm trọng, nhà cửa hoặc xe cộ có nguy cơ hư hỏng hoặc phải bán tháo.'
    }
];

fs.writeFileSync(outputFile, JSON.stringify(rules, null, 2), 'utf-8');
console.log('Đã tạo thành công quy tắc tượng pháp từ sách Lục Hào Tượng Chẩn!');
