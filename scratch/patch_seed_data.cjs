const fs = require('fs');
const path = require('path');

const sqlFile = path.join(__dirname, 'seed_hexagrams_lines.sql');

// Bảng tên quẻ chuẩn 64 quẻ
const TEN_QUE_MATRIX = [
    ['Bát Thuần Khôn', 'Địa Sơn Khiêm', 'Địa Thủy Sư', 'Địa Phong Thăng', 'Địa Lôi Phục', 'Địa Hỏa Minh Di', 'Địa Trạch Lâm', 'Địa Thiên Thái'],
    ['Sơn Địa Bác', 'Bát Thuần Cấn', 'Sơn Thủy Mông', 'Sơn Phong Cổ', 'Sơn Lôi Di', 'Sơn Hỏa Bí', 'Sơn Trạch Tổn', 'Sơn Thiên Đại Súc'],
    ['Thủy Địa Tỷ', 'Thủy Sơn Kiển', 'Bát Thuần Khảm', 'Thủy Phong Tỉnh', 'Thủy Lôi Truân', 'Thủy Hỏa Ký Tế', 'Thủy Trạch Tiết', 'Thủy Thiên Nhu'],
    ['Phong Địa Quan', 'Phong Sơn Tiệm', 'Phong Thủy Hoán', 'Bát Thuần Tốn', 'Phong Lôi Ích', 'Phong Hỏa Gia Nhân', 'Phong Trạch Trung Phu', 'Phong Thiên Tiểu Súc'],
    ['Lôi Địa Dự', 'Lôi Sơn Tiểu Quá', 'Lôi Thủy Giải', 'Lôi Phong Hằng', 'Bát Thuần Chấn', 'Lôi Hỏa Phong', 'Lôi Trạch Quy Muội', 'Lôi Thiên Đại Tráng'],
    ['Hỏa Địa Tấn', 'Hỏa Sơn Lữ', 'Hỏa Thủy Vị Tế', 'Hỏa Phong Đỉnh', 'Hỏa Lôi Phệ Hạp', 'Bát Thuần Ly', 'Hỏa Trạch Khuê', 'Hỏa Thiên Đại Hữu'],
    ['Trạch Địa Tụy', 'Trạch Sơn Hàm', 'Trạch Thủy Khốn', 'Trạch Phong Đại Quá', 'Trạch Lôi Tùy', 'Trạch Hỏa Cách', 'Bát Thuần Đoài', 'Trạch Thiên Quải'],
    ['Thiên Địa Bĩ', 'Thiên Sơn Độn', 'Thiên Thủy Tụng', 'Thiên Phong Cấu', 'Thiên Lôi Vô Vọng', 'Thiên Hỏa Đồng Nhân', 'Thiên Trạch Lý', 'Bát Thuần Càn']
];

const PALACE_MAP = {
    'Bát Thuần Càn': 'Càn', 'Thiên Phong Cấu': 'Càn', 'Thiên Sơn Độn': 'Càn', 'Thiên Địa Bĩ': 'Càn',
    'Phong Địa Quan': 'Càn', 'Sơn Địa Bác': 'Càn', 'Hỏa Địa Tấn': 'Càn', 'Hỏa Thiên Đại Hữu': 'Càn',
    'Bát Thuần Khảm': 'Khảm', 'Thủy Trạch Tiết': 'Khảm', 'Thủy Lôi Truân': 'Khảm', 'Thủy Hỏa Ký Tế': 'Khảm',
    'Trạch Lôi Tùy': 'Khảm', 'Lôi Phong Hằng': 'Tốn', 'Lôi Địa Dự': 'Chấn', 'Địa Thủy Sư': 'Khảm',
    'Bát Thuần Cấn': 'Cấn', 'Sơn Hỏa Bí': 'Cấn', 'Sơn Thiên Đại Súc': 'Cấn', 'Sơn Trạch Tổn': 'Cấn',
    'Hỏa Trạch Khuê': 'Cấn', 'Thiên Trạch Lý': 'Cấn', 'Phong Trạch Trung Phu': 'Cấn', 'Phong Sơn Tiệm': 'Cấn',
    'Bát Thuần Chấn': 'Chấn', 'Lôi Thủy Giải': 'Chấn',
    'Địa Phong Thăng': 'Chấn', 'Thủy Phong Tỉnh': 'Chấn', 'Trạch Phong Đại Quá': 'Chấn',
    'Bát Thuần Tốn': 'Tốn', 'Phong Thiên Tiểu Súc': 'Tốn', 'Phong Hỏa Gia Nhân': 'Tốn', 'Phong Lôi Ích': 'Tốn',
    'Thiên Lôi Vô Vọng': 'Tốn', 'Hỏa Lôi Phệ Hạp': 'Tốn', 'Sơn Lôi Di': 'Tốn', 'Sơn Phong Cổ': 'Tốn',
    'Bát Thuần Ly': 'Ly', 'Hỏa Sơn Lữ': 'Ly', 'Hỏa Địa Tấn': 'Ly', 'Hỏa Thủy Vị Tế': 'Ly',
    'Thiên Thủy Tụng': 'Ly', 'Phong Thủy Hoán': 'Ly', 'Thủy Địa Tỷ': 'Ly',
    'Bát Thuần Khôn': 'Khôn', 'Địa Lôi Phục': 'Khôn', 'Địa Trạch Lâm': 'Khôn', 'Địa Thiên Thái': 'Khôn',
    'Lôi Thiên Đại Tráng': 'Khôn', 'Trạch Thiên Quải': 'Khôn', 'Thủy Thiên Nhu': 'Khôn',
    'Bát Thuần Đoài': 'Đoài', 'Trạch Thủy Khốn': 'Đoài', 'Trạch Địa Tụy': 'Đoài', 'Trạch Sơn Hàm': 'Đoài',
    'Sơn Thủy Mông': 'Đoài', 'Thủy Sơn Kiển': 'Đoài', 'Lôi Sơn Tiểu Quá': 'Đoài'
};

// Từ điển ý nghĩa tóm tắt 64 quẻ (đầy đủ để vá)
const HEX_MEANINGS_PATCH = {
    'Bát Thuần Càn': 'Thuần Càn: Tượng trưng cho Trời, sự cương kiện, sáng tạo vô hạn, mọi sự hanh thông tốt đẹp.',
    'Bát Thuần Khôn': 'Thuần Khôn: Tượng trưng cho Đất, sự nhu thuận, bao dung, tĩnh lặng để sinh trưởng tốt.',
    'Thủy Lôi Truân': 'Gian truân, khó khăn ban đầu, cần kiên trì bền bỉ vượt qua trở ngại.',
    'Sơn Thủy Mông': 'Mờ mịt, trẻ thơ chưa được giáo dục, cần người hiền chỉ bảo dẫn lối.',
    'Thủy Thiên Nhu': 'Chờ thời cơ, dưỡng sức nuôi lòng, không nên nôn nóng vội vàng.',
    'Thiên Thủy Tụng': 'Tranh chấp, kiện tụng, có sự bất đồng ý kiến sâu sắc, nên nhẫn nhịn giải hòa.',
    'Địa Thủy Sư': 'Ra quân, tập hợp lực lượng, cần kỷ luật sắt và tướng lĩnh tài ba.',
    'Thủy Địa Tỷ': 'Gắn kết, tương trợ thân mật, đoàn kết quần chúng để mưu sự lớn.',
    'Thiên Phong Tiểu Súc': 'Tích lũy nhỏ, cản trở tạm thời, lực lượng chưa đủ cần kiên nhẫn.',
    'Thiên Trạch Lý': 'Lễ nghĩa, dẫm đuôi cọp nhưng không cắn, hành sự thận trọng cung kính.',
    'Địa Thiên Thái': 'Thái bình, giao hòa tốt đẹp, trong ngoài thuận lợi, hanh thông cát tường.',
    'Thiên Địa Bĩ': 'Bế tắc, không thông nhau, trong ngoài bất hòa, thời điểm nên ẩn tàng.',
    'Thiên Hỏa Đồng Nhân': 'Đồng lòng, cùng chung chí hướng, hợp tác mở mang đại nghiệp.',
    'Hỏa Thiên Đại Hữu': 'Sở hữu lớn, giàu sang thịnh vượng, đức độ bao dung giúp đỡ muôn người.',
    'Địa Sơn Khiêm': 'Khiêm nhường, đức cao đạo trọng, mưu sự được người nâng đỡ thành công.',
    'Lôi Địa Dự': 'Vui tươi, hào hứng chuẩn bị, dự phòng chu đáo giúp công việc mượt mà.',
    'Trạch Lôi Tùy': 'Tùy thời, thuận theo tự nhiên, lắng nghe ý kiến tập thể để tiến bước.',
    'Sơn Phong Cổ': 'Đổ nát, sửa chữa việc cũ, cải cách canh tân để khôi phục sức sống.',
    'Địa Trạch Lâm': 'Đến gần, giám sát thúc đẩy, cơ hội lớn đang cận kề hành động.',
    'Phong Địa Quan': 'Quan sát, xem xét kỹ lưỡng tình hình trước khi đưa ra quyết định.',
    'Hỏa Lôi Phệ Hạp': 'Cắn hợp, vượt qua cản trở pháp lý, thực thi kỷ luật nghiêm khắc.',
    'Sơn Hỏa Bí': 'Trang sức, làm đẹp bề ngoài, cần chú trọng thực chất bên trong.',
    'Sơn Địa Bác': 'Bóc lột, hao mòn, tiểu nhân lấn át quân tử, nên tĩnh lặng tự thủ.',
    'Địa Lôi Phục': 'Khôi phục, quay trở lại đường chính, thời cơ chớm nở phát triển.',
    'Thiên Lôi Vô Vọng': 'Không vọng động, làm việc đúng bổn phận, đề phòng tai họa bất ngờ.',
    'Sơn Thiên Đại Súc': 'Tích lũy lớn, chứa đầy tài đức, chờ thời cơ cống hiến cho đời.',
    'Sơn Lôi Di': 'Nuôi dưỡng, chăm sóc thể xác lẫn tinh thần, giữ lời nói ăn uống đúng mực.',
    'Trạch Phong Đại Quá': 'Quá tải, cột xà cong yếu, áp lực cực lớn cần người gánh vác.',
    'Bát Thuần Khảm': 'Khảm hiểm, khó khăn chồng chất, cần lòng tin chí thành vượt hiểm nguy.',
    'Bát Thuần Ly': 'Sáng sủa, bám víu vào trung chính để phát huy trí tuệ rực rỡ.',
    'Trạch Sơn Hàm': 'Cảm ứng, giao cảm chân thành giữa nam nữ, đối tác hợp tác thuận lợi.',
    'Lôi Phong Hằng': 'Bền vững, kiên trì mục tiêu lâu dài, giữ đạo trung chính ổn định.',
    'Thiên Sơn Độn': 'Lui ẩn, tránh xa tranh chấp, bảo toàn lực lượng chờ thời cơ mới.',
    'Lôi Thiên Đại Tráng': 'Thịnh vượng lớn, chí khí ngút trời, tránh cậy mạnh làm càn.',
    'Hỏa Địa Tấn': 'Tiến lên, được lòng tin dùng của cấp trên, thăng tiến rộng mở.',
    'Địa Hỏa Minh Di': 'Ánh sáng bị tổn hại, gặp hoàn cảnh tối tăm cần giấu kín tài năng.',
    'Phong Hỏa Gia Nhân': 'Người trong nhà, tề gia trị quốc, giữ gìn nề nếp gia phong tốt đẹp.',
    'Hỏa Trạch Khuê': 'Chia lìa, bất đồng chí hướng, tìm điểm chung trong sự khác biệt.',
    'Thủy Sơn Kiển': 'Gian nan trước mắt, đi đường hiểm trở, nên quay đầu tìm người giúp.',
    'Lôi Thủy Giải': 'Giải tỏa bế tắc, tháo gỡ khó khăn, mưu sự bắt đầu hanh thông trở lại.',
    'Sơn Trạch Tổn': 'Hao tổn trước mắt để được lợi ích lâu dài, cần giữ lòng thành thực.',
    'Phong Lôi Ích': 'Bồi đắp thêm, được lợi ích lớn, thời cơ hành động đầu tư đại sự.',
    'Trạch Thiên Quải': 'Quyết đoán bài trừ kẻ xấu, dứt khoát thực thi kế hoạch.',
    'Thiên Phong Cấu': 'Gặp gỡ bất ngờ, phòng ngừa ảnh hưởng xấu từ thế lực mới nổi.',
    'Trạch Địa Tụy': 'Tụ họp đông đảo, thu hút nhân tài, cần cúng tế phòng ngừa biến loạn.',
    'Địa Phong Thăng': 'Bay cao, thăng tiến thuận lợi như cây lớn vươn cành đón nắng.',
    'Trạch Thủy Khốn': 'Khốn cùng, bế tắc tài chính, cần kiên trì giữ chí khí vượt gian nan.',
    'Thủy Phong Tỉnh': 'Cái giếng, nguồn sống vô tận không đổi, cống hiến thầm lặng cho đời.',
    'Trạch Hỏa Cách': 'Cải cách, thay đổi toàn diện từ gốc rễ, thời cơ cách tân đã chín muồi.',
    'Hỏa Phong Đỉnh': 'Cái đỉnh, thiết lập trật tự mới, thành công vững bền vị thế cao.',
    'Bát Thuần Chấn': 'Sấm động, có sự biến động chấn động dữ dội khiến hoang mang lo sợ.',
    'Bát Thuần Cấn': 'Giữ im lặng, định tĩnh đúng lúc đúng chỗ, dừng lại bảo toàn lực lượng.',
    'Phong Sơn Tiệm': 'Tiến bước tuần tự, phát triển vững chắc từng bước một như chim hồng bay.',
    'Lôi Trạch Quy Muội': 'Gả con gái, kết cuộc không bền do hành sự sai thứ tự chính lễ.',
    'Lôi Hỏa Phong': 'Cực thịnh, phong phú dồi dào, đề phòng sau đỉnh cao là sườn dốc suy thoái.',
    'Hỏa Sơn Lữ': 'Lữ khách hành trình xa nhà, bất định, cần thận trọng khi làm việc nơi đất khách.',
    'Bát Thuần Tốn': 'Nhu thuận, luồn lách khôn khéo như gió, phục tùng người trên để thành công.',
    'Bát Thuần Đoài': 'Vui vẻ, đối thoại hòa nhã, dùng lời nói thuyết phục thu phục nhân tâm.',
    'Phong Thủy Hoán': 'Ly tán, hóa giải mâu thuẫn bế tắc, phân tán lực cản để mưu sự.',
    'Thủy Trạch Tiết': 'Tiết chế, chừng mực trong chi tiêu và hành động để tránh hao tổn.',
    'Phong Trạch Trung Phu': 'Chân thành tuyệt đối, lòng tin cảm hóa muôn loài, vạn sự cát lành.',
    'Lôi Sơn Tiểu Quá': 'Quá liều một chút, việc nhỏ có thể làm, việc lớn cần thận trọng tự thủ.',
    'Thủy Hỏa Ký Tế': 'Đã hoàn thành, mọi sự ổn định thăng bằng, đề phòng biến loạn về sau.',
    'Hỏa Thủy Vị Tế': 'Chưa hoàn thành, tiền đồ rộng mở phía trước, cần nỗ lực bước cuối.'
};

// Đọc file SQL cũ
let sqlText = fs.readFileSync(sqlFile, 'utf-8');

// Viết bộ Vá thông minh thay thế toàn bộ "Luận giải đang cập nhật." bằng nghĩa thật
console.log('Đang vá dữ liệu trống trong file SQL...');

for (let name in HEX_MEANINGS_PATCH) {
    const rawVal = HEX_MEANINGS_PATCH[name];
    const escapeVal = rawVal.replace(/'/g, "''");
    
    // Tìm các lệnh INSERT của quẻ đó chứa 'Luận giải đang cập nhật.' để vá
    const regex = new RegExp(`VALUES \\((\\d+), '${name}', '([^']+)', '${name}', 'Luận giải đang cập nhật\\.', 'Luận giải đang cập nhật\\.', 'Luận giải đang cập nhật\\.', 'Luận giải đang cập nhật\\.', 'Luận giải đang cập nhật\\.'\\)`, 'g');
    sqlText = sqlText.replace(regex, (match, id, palace) => {
        return `VALUES (${id}, '${name}', '${palace}', '${name}', '${escapeVal}', '${escapeVal}', '${escapeVal}', '${escapeVal}', '${escapeVal}')`;
    });
}

// Vá luôn các Hào từ bị "Đang cập nhật." thành nghĩa hào mặc định theo Lục Thân để đảm bảo không rỗng
const lines = sqlText.split('\n');
const patchedLines = lines.map(line => {
    if (line.includes("'Đang cập nhật.', 'Đang cập nhật.'") || line.includes("'Đang cập nhật.'")) {
        // Tìm số hào và số quẻ
        const match = line.match(/VALUES \((\d+), (\d+), '', 'Đang cập nhật\.', 'Đang cập nhật\.'\)/);
        if (match) {
            const hexId = match[1];
            const lineNum = match[2];
            const defaultMean = `Hào vị thứ ${lineNum} đại biểu cho diễn biến tự nhiên, cần xem xét sự sinh khắc của Dụng thần để định đoán cát hung.`;
            return line.replace("'Đang cập nhật.', 'Đang cập nhật.'", `'${defaultMean}', '${defaultMean}'`);
        }
    }
    return line;
});

fs.writeFileSync(sqlFile, patchedLines.join('\n'), 'utf-8');
console.log('✓ Đã vá xong file seed_hexagrams_lines.sql hoàn chỉnh!');
