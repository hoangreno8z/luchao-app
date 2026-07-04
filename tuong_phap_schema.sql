-- =============================================================================
-- SCHEMA MỞ RỘNG - 3 BẢNG TƯỢNG PHÁP MODULE HÓA
-- Chạy toàn bộ file này trong Supabase → SQL Editor → New Query
-- =============================================================================

-- ─────────────────────────────────────────────────────────────────────────────
-- BẢNG 1: tuong_co_ban
-- Lưu ý nghĩa nền tảng của Lục Thân × Lục Thú theo từng chủ đề
-- Nhẹ, dùng để bốc nghĩa gốc / từ vựng cơ sở
-- ─────────────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS tuong_co_ban (
    id         SERIAL PRIMARY KEY,
    chu_de     VARCHAR(50)  NOT NULL,  -- cong_viec | tinh_yeu | suc_khoe | kinh_doanh | thi_cu | hon_nhan | chung_khoan | bat_dong_san
    luc_than   VARCHAR(50),            -- quan_quy | phu_mau | huynh_de | the_tai | tu_ton | NULL = không giới hạn
    luc_thu    VARCHAR(50),            -- thanh_long | chu_tuoc | cau_tran | dang_xa | bach_ho | huyen_vu | NULL = không giới hạn
    y_nghia    TEXT         NOT NULL,  -- Ý nghĩa nền tảng trong bối cảnh chủ đề
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (chu_de, luc_than, luc_thu)
);

-- ─────────────────────────────────────────────────────────────────────────────
-- BẢNG 2: tuong_da_tang
-- Tổ hợp đặc hiệu đa tầng: Vị hào × Lục Thân × Lục Thú × Thần Sát × Trạng Thái × Chủ Đề
-- ─────────────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS tuong_da_tang (
    id          SERIAL PRIMARY KEY,
    hao_vi      INT          CHECK (hao_vi BETWEEN 1 AND 6),  -- 1-6, NULL = áp dụng mọi hào
    luc_than    VARCHAR(50)  NOT NULL,   -- quan_quy | phu_mau | huynh_de | the_tai | tu_ton
    luc_thu     VARCHAR(50),             -- thanh_long | chu_tuoc | cau_tran | dang_xa | bach_ho | huyen_vu
    than_sat    VARCHAR(100),            -- Thần Sát kèm theo (quy_nhan | loc_than | ...)
    trang_thai  VARCHAR(50)  NOT NULL,   -- dong | tinh | tuan_khong | nhap_mo | am_dong | nguyet_pha | nhat_pha
    chu_de      VARCHAR(50)  NOT NULL,   -- chủ đề áp dụng
    mo_ta_tuong TEXT         NOT NULL,   -- Mô tả tượng pháp đầy đủ
    created_at  TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ─────────────────────────────────────────────────────────────────────────────
-- BẢNG 3: tuong_dong_bien
-- Tượng pháp động biến: Pha chuyển Lục Thân gốc → Biến thể + Hướng biến
-- ─────────────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS tuong_dong_bien (
    id            SERIAL PRIMARY KEY,
    luc_than_goc  VARCHAR(50) NOT NULL,   -- Lục Thân của hào động gốc
    luc_than_bien VARCHAR(50) NOT NULL,   -- Lục Thân của hào biến
    huong_bien    VARCHAR(50) NOT NULL,   -- hoi_dau_sinh | hoi_dau_khac | hoa_tien | hoa_thoai | hoa_tuyet | hoa_mu
    chu_de        VARCHAR(50) NOT NULL,   -- chủ đề áp dụng
    mo_ta_bien    TEXT        NOT NULL,   -- Mô tả diễn biến năng lượng chi tiết
    created_at    TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (luc_than_goc, luc_than_bien, huong_bien, chu_de)
);

-- ─────────────────────────────────────────────────────────────────────────────
-- INDEX TỐI ƯU TỐC ĐỘ TRUY VẤN
-- ─────────────────────────────────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_tuong_co_ban_chuDe      ON tuong_co_ban (chu_de);
CREATE INDEX IF NOT EXISTS idx_tuong_co_ban_lucThan     ON tuong_co_ban (luc_than);
CREATE INDEX IF NOT EXISTS idx_tuong_da_tang_main       ON tuong_da_tang (chu_de, luc_than, trang_thai);
CREATE INDEX IF NOT EXISTS idx_tuong_da_tang_haoVi      ON tuong_da_tang (hao_vi, luc_than, luc_thu);
CREATE INDEX IF NOT EXISTS idx_tuong_dong_bien_main     ON tuong_dong_bien (luc_than_goc, luc_than_bien, huong_bien, chu_de);


-- =============================================================================
-- SEED DATA - BẢNG 1: tuong_co_ban
-- =============================================================================
INSERT INTO tuong_co_ban (chu_de, luc_than, luc_thu, y_nghia) VALUES
-- cong_viec x luc_than
('cong_viec', 'quan_quy',  NULL,         'KPI, áp lực công việc, sếp/quản lý, cơ hội thăng tiến, chức vụ, cạnh tranh'),
('cong_viec', 'phu_mau',   NULL,         'Hợp đồng, giấy tờ, quy trình, đào tạo, tài liệu, server hệ thống, quy định công ty'),
('cong_viec', 'huynh_de',  NULL,         'Đồng nghiệp cùng cấp, đối thủ nội bộ, hao phí chi phí, tranh chấp nguồn lực'),
('cong_viec', 'the_tai',   NULL,         'Thu nhập, bonus, hoa hồng, khách hàng, tài nguyên dự án, ngân sách'),
('cong_viec', 'tu_ton',    NULL,         'Nghỉ ngơi, giải tỏa áp lực, sáng tạo tự do, nhân viên cấp dưới, phúc lợi'),
-- cong_viec x luc_thu
('cong_viec', NULL,        'thanh_long', 'Tín hiệu tốt, cơ hội vàng, thăng chức rõ ràng, sếp ủng hộ, hợp đồng béo bở'),
('cong_viec', NULL,        'chu_tuoc',   'Email quan trọng, cuộc họp căng thẳng, tranh cãi quyết sách, tin đồn nội bộ'),
('cong_viec', NULL,        'cau_tran',   'Dự án bị trì hoãn, hành chính quan liêu, deadline kéo dài vô tận, thủ tục phức tạp'),
('cong_viec', NULL,        'dang_xa',    'Lo lắng mơ hồ về tương lai công việc, áp lực tâm lý không rõ nguồn gốc, dự án bí ẩn'),
('cong_viec', NULL,        'bach_ho',    'Tai nạn lao động, xung đột gay gắt, sa thải bất ngờ, áp lực đến mức burnout'),
('cong_viec', NULL,        'huyen_vu',   'Âm mưu nội bộ, đồng nghiệp phản bội, ăn cắp ý tưởng, thông tin bị rò rỉ'),
-- tinh_yeu x luc_than
('tinh_yeu',  'quan_quy',  NULL,         'Người yêu/chồng (nữ hỏi), sức hút mạnh mẽ, sự chiếm hữu, áp lực tình cảm, ghen tuông'),
('tinh_yeu',  'phu_mau',   NULL,         'Hôn ước, cam kết chính thức, cha mẹ can thiệp, điều kiện cưới hỏi, tổ chức lễ cưới'),
('tinh_yeu',  'huynh_de',  NULL,         'Tình địch, người thứ ba, bạn bè can thiệp, tranh giành người yêu, hao tình cảm'),
('tinh_yeu',  'the_tai',   NULL,         'Người yêu/vợ (nam hỏi), vật chất trong tình yêu, quà tặng, đi du lịch cùng'),
('tinh_yeu',  'tu_ton',    NULL,         'Niềm vui, hạnh phúc ngọt ngào, con cái, tình cảm nhẹ nhàng không ràng buộc'),
-- tinh_yeu x luc_thu
('tinh_yeu',  NULL,        'thanh_long', 'Tin vui tình cảm, cầu hôn thành công, mối quan hệ thăng hoa, hôn nhân vui vẻ'),
('tinh_yeu',  NULL,        'dang_xa',    'Mơ hồ trong tình cảm, không chắc chắn, hay lo âu vô cớ, tình cảm ảo'),
('tinh_yeu',  NULL,        'bach_ho',    'Chia tay đau đớn, cãi vã lớn, bạo lực lời nói, tổn thương sâu trong lòng'),
('tinh_yeu',  NULL,        'huyen_vu',   'Bí mật trong tình yêu, tình ngoài hôn nhân, người yêu giấu giếm điều gì đó'),
-- suc_khoe x luc_than
('suc_khoe',  'quan_quy',  NULL,         'Bệnh tật cụ thể, mầm bệnh, tai nạn, bác sĩ điều trị, phẫu thuật'),
('suc_khoe',  'phu_mau',   NULL,         'Đơn thuốc, hồ sơ bệnh án, chế độ ăn uống, nghỉ dưỡng theo chỉ dẫn'),
('suc_khoe',  'huynh_de',  NULL,         'Căng thẳng hao tổn thể lực, nhiễm trùng chéo, tranh chấp nguồn sinh lực'),
('suc_khoe',  'the_tai',   NULL,         'Chi phí thuốc men bệnh viện, suy kiệt thể lực vì lao lực'),
('suc_khoe',  'tu_ton',    NULL,         'Thuốc men hiệu quả, sức đề kháng tốt, hồi phục nhanh, sức khỏe tốt'),
-- suc_khoe x luc_thu
('suc_khoe',  NULL,        'bach_ho',    'Xuất huyết, chấn thương nặng, phẫu thuật gấp, bệnh phát nhanh và nguy hiểm'),
('suc_khoe',  NULL,        'dang_xa',    'Bệnh không rõ nguyên nhân, triệu chứng lạ, lo âu tâm lý, mất ngủ triền miên'),
('suc_khoe',  NULL,        'chu_tuoc',   'Bệnh hô hấp, viêm họng, cần tư vấn chuyên gia y tế gấp'),
-- kinh_doanh x luc_than
('kinh_doanh','quan_quy',  NULL,         'Cơ quan quản lý, giấy phép, thuế, đối thủ cạnh tranh, rào cản pháp lý'),
('kinh_doanh','phu_mau',   NULL,         'Vốn vay, hợp đồng đối tác, giấy phép, kế hoạch kinh doanh, công nghệ nền tảng'),
('kinh_doanh','huynh_de',  NULL,         'Đối thủ tranh thị phần, đối tác phản bội, chi phí vô hình, hao tổn tài lực'),
('kinh_doanh','the_tai',   NULL,         'Doanh thu, lợi nhuận, khách hàng chốt đơn, sản phẩm thành công, thị trường tiêu thụ'),
('kinh_doanh','tu_ton',    NULL,         'Đội ngũ nhân viên trung thành, phúc lợi, giải quyết khủng hoảng, sáng kiến mới'),
-- kinh_doanh x luc_thu
('kinh_doanh',NULL,        'thanh_long', 'Đối tác chiến lược uy tín, hợp đồng lớn thành công, thị trường mở rộng tốt'),
('kinh_doanh',NULL,        'bach_ho',    'Phá sản rủi ro, kiện tụng thương mại, mất hợp đồng lớn, khủng hoảng nghiêm trọng'),
('kinh_doanh',NULL,        'huyen_vu',   'Gian lận hợp đồng, đối tác lừa đảo, tiền vốn biến mất, thao túng giá ngầm'),
-- chung_khoan x luc_than
('chung_khoan','quan_quy', NULL,         'Lực lượng thị trường lớn (big player), áp lực pháp lý, quy định UBCKNN, rủi ro hệ thống'),
('chung_khoan','phu_mau',  NULL,         'Báo cáo tài chính, tin tức cơ bản, chỉ số phân tích, dữ liệu nền'),
('chung_khoan','huynh_de', NULL,         'Nhà đầu tư bán tháo, phí giao dịch hao tổn, đua lệnh thua lỗ, bẫy thanh khoản'),
('chung_khoan','the_tai',  NULL,         'Cổ phiếu tăng giá, chốt lời thành công, tài sản sinh lời, margin hiệu quả'),
('chung_khoan','tu_ton',   NULL,         'Cắt lỗ đúng thời điểm, quản lý rủi ro tốt, tâm lý điềm tĩnh, chiến lược bảo vệ vốn'),
-- chung_khoan x luc_thu
('chung_khoan',NULL,       'bach_ho',    'Sàn sập, sell-off mạnh, tin xấu bất ngờ, margin call, mất vốn nghiêm trọng'),
('chung_khoan',NULL,       'thanh_long', 'Phá kháng cự, uptrend rõ, cổ phiếu có sóng, mua vào đúng thời điểm vàng'),
('chung_khoan',NULL,       'huyen_vu',   'Thao túng giá, cổ phiếu lừa đảo, thông tin nội gián âm thầm, bơm xả không rõ'),
-- bat_dong_san x luc_than
('bat_dong_san','quan_quy',NULL,         'Quy hoạch nhà nước, pháp lý đất đai, tranh chấp sở hữu, áp lực vay thế chấp'),
('bat_dong_san','phu_mau', NULL,         'Sổ đỏ/sổ hồng, hợp đồng mua bán, giấy phép xây dựng, quy hoạch 1/500'),
('bat_dong_san','huynh_de',NULL,         'Đối thủ tranh mua, môi giới phản bội, chi phí phát sinh ngoài dự toán'),
('bat_dong_san','the_tai', NULL,         'Giá trị tài sản tăng, chốt lời BĐS, cho thuê có lợi, thanh khoản tốt'),
('bat_dong_san','tu_ton',  NULL,         'Mua để ở yên ổn, nơi an cư lạc nghiệp, cải tạo nội thất, bảo vệ tài sản')
ON CONFLICT (chu_de, luc_than, luc_thu) DO UPDATE SET y_nghia = EXCLUDED.y_nghia;


-- =============================================================================
-- SEED DATA - BẢNG 2: tuong_da_tang
-- =============================================================================
INSERT INTO tuong_da_tang (hao_vi, luc_than, luc_thu, than_sat, trang_thai, chu_de, mo_ta_tuong) VALUES
-- cong_viec - hào 1
(1, 'the_tai',  'thanh_long', NULL, 'dong',       'cong_viec', 'Cơ hội tài chính mới xuất hiện ngay ở giai đoạn khởi đầu, rất thuận lợi để nhận dự án hoặc ký hợp đồng'),
(1, 'huynh_de', 'chu_tuoc',   NULL, 'dong',       'cong_viec', 'Nội bộ xảy ra tranh cãi lúc mới bắt đầu, đồng nghiệp cạnh tranh hoặc lan truyền tin không tốt về bạn'),
(1, 'quan_quy', 'dang_xa',    NULL, 'tuan_khong', 'cong_viec', 'Sếp hoặc áp lực cấp trên chưa thực sự hiện hữu, đây là lo lắng ảo, chưa có nguy cơ thực sự'),
-- cong_viec - hào 2
(2, 'phu_mau',  'cau_tran',   NULL, 'tuan_khong', 'cong_viec', 'Hợp đồng hoặc giấy tờ còn vướng mắc thủ tục, hiện tại chưa có hiệu lực hoặc chưa được duyệt'),
(2, 'the_tai',  'thanh_long', NULL, 'dong',       'cong_viec', 'Năng lực tài chính bản thân đang tốt, thu nhập tăng trưởng, nhận được khen thưởng xứng đáng'),
(2, 'huynh_de', 'huyen_vu',   NULL, 'dong',       'cong_viec', 'Có người âm thầm phá hoại từ bên trong nội bộ, cẩn thận bị mạo danh hoặc lấy cắp thông tin'),
-- cong_viec - hào 3 (ngưỡng cửa, rủi ro)
(3, 'quan_quy', 'chu_tuoc',   NULL, 'dong',       'cong_viec', 'Áp lực cấp trên tăng mạnh, tranh cãi và thách thức trực tiếp, điểm bùng phát xung đột công việc'),
(3, 'quan_quy', 'dang_xa',    NULL, 'dong',       'cong_viec', 'Lo lắng cực độ về vị trí công việc, áp lực tâm lý tích tụ lâu bùng phát, giai đoạn rất căng thẳng'),
(3, 'quan_quy', 'chu_tuoc',   NULL, 'tuan_khong', 'cong_viec', 'Tranh chấp với cấp trên hiện tại còn là không trung, mâu thuẫn chưa bùng phát — hãy chủ động hóa giải'),
(3, 'huynh_de', 'bach_ho',    NULL, 'dong',       'cong_viec', 'Đồng nghiệp hoặc đối thủ hành động quyết liệt gây tổn hại trực tiếp, thậm chí có thể mất việc'),
-- cong_viec - hào 4
(4, 'quan_quy', 'thanh_long', NULL, 'dong',       'cong_viec', 'Cơ hội thăng tiến cụ thể từ cấp trên hoặc đối tác quan trọng bên ngoài, lời đề nghị có giá trị'),
(4, 'phu_mau',  'cau_tran',   NULL, 'dong',       'cong_viec', 'Dự án bị kéo dài hoặc quy trình phê duyệt chậm, cần kiên nhẫn chờ đợi thủ tục bên ngoài'),
(4, 'the_tai',  'huyen_vu',   NULL, 'dong',       'cong_viec', 'Khách hàng hoặc đối tác bên ngoài không minh bạch, có thể xảy ra gian lận hoặc trốn tránh thanh toán'),
-- cong_viec - hào 5 (đỉnh quyền lực)
(5, 'quan_quy', 'dang_xa',    NULL, 'dong',       'cong_viec', 'Vị trí quản lý cấp cao đang chịu áp lực tinh thần cực lớn, quyết sách khó khăn, hoặc hệ thống gặp lỗi bất ngờ'),
(5, 'quan_quy', 'thanh_long', NULL, 'dong',       'cong_viec', 'Thăng tiến lên vị trí cao, được giao trọng trách, cấp trên tin tưởng và đề bạt chính thức'),
(5, 'phu_mau',  'chu_tuoc',   NULL, 'dong',       'cong_viec', 'Văn bản chính sách quan trọng được ban hành, hợp đồng lớn cần thương thảo kỹ, trao đổi căng thẳng cấp cao'),
(5, 'huynh_de', 'bach_ho',    NULL, 'dong',       'cong_viec', 'Đối thủ hoặc đồng nghiệp ngang cấp ra đòn quyết định, có thể xảy ra tranh giành vị trí cấp cao'),
(5, 'quan_quy', 'dang_xa',    NULL, 'tuan_khong', 'cong_viec', 'Áp lực lãnh đạo hiện tại chỉ là lo sợ ảo, thực tế chưa có nguy cơ — tâm lý tự tạo áp lực không cần thiết'),
-- cong_viec - hào 6 (kết cục)
(6, 'phu_mau',  'cau_tran',   NULL, 'dong',       'cong_viec', 'Hợp đồng hoặc dự án đến giai đoạn cuối nhưng bị trì hoãn, kết thúc không đúng kế hoạch'),
(6, 'quan_quy', 'bach_ho',    NULL, 'dong',       'cong_viec', 'Kết cục cực đoan, có thể là sa thải, nghỉ việc bắt buộc, sự cố nghiêm trọng khi dự án vào giai đoạn cuối'),
(6, 'the_tai',  'thanh_long', NULL, 'dong',       'cong_viec', 'Phần thưởng và thành quả đến vào giai đoạn cuối chu kỳ, công sức được đền đáp xứng đáng'),
-- cong_viec - trạng thái đặc biệt (áp dụng mọi hào)
(NULL,'quan_quy',NULL,        NULL, 'nhap_mo',    'cong_viec', 'Cơ hội thăng tiến hoặc trọng trách bị giam hãm, bế tắc không tiến lên được dù đã cố gắng rất nhiều'),
(NULL,'the_tai', NULL,        NULL, 'nhap_mo',    'cong_viec', 'Thu nhập hoặc tài nguyên bị đóng băng, tiền đến tay rồi lại bị giữ lại hoặc tốn hết không rõ nguyên nhân'),
(NULL,'phu_mau', NULL,        NULL, 'nguyet_pha', 'cong_viec', 'Hợp đồng hoặc kế hoạch bị phá vỡ hoàn toàn trong tháng này, không thể cứu vãn được'),
(NULL,'quan_quy',NULL,        NULL, 'am_dong',    'cong_viec', 'Sếp hoặc áp lực công việc sẽ bùng phát rất nhanh và bất ngờ, cần phản ứng ngay lập tức'),
(NULL,'huynh_de',NULL,        NULL, 'am_dong',    'cong_viec', 'Đồng nghiệp hoặc đối thủ sẽ bất ngờ hành động, không có thời gian chuẩn bị — phải đề phòng ngay'),
-- tinh_yeu
(3, 'huynh_de', 'chu_tuoc',   NULL, 'dong',       'tinh_yeu', 'Người thứ ba xuất hiện và gây ra tranh cãi công khai, mối quan hệ bị thử thách nghiêm trọng'),
(5, 'the_tai',  'thanh_long', NULL, 'dong',       'tinh_yeu', 'Cầu hôn hoặc xác nhận mối quan hệ chính thức từ đối phương, tin vui tình cảm ở cấp độ cao nhất'),
(5, 'quan_quy', 'dang_xa',    NULL, 'dong',       'tinh_yeu', 'Người yêu (nữ hỏi) đang lo lắng ẩn giấu điều gì đó, tình cảm mơ hồ không chắc chắn'),
(2, 'the_tai',  'huyen_vu',   NULL, 'dong',       'tinh_yeu', 'Người yêu có bí mật riêng, âm thầm liên lạc với người khác, cần kiểm tra lại lòng chân thành'),
(NULL,'quan_quy',NULL,        NULL, 'tuan_khong', 'tinh_yeu', 'Người yêu/chồng hiện tại chưa xuất hiện trong cuộc sống thực, hoặc mối quan hệ đang ở trạng thái hư ảo'),
-- suc_khoe
(NULL,'quan_quy','bach_ho',   NULL, 'dong',       'suc_khoe', 'Bệnh tật phát nặng bất ngờ cần nhập viện hoặc phẫu thuật gấp, đây là dấu hiệu y tế khẩn cấp'),
(NULL,'tu_ton', 'thanh_long', NULL, 'dong',       'suc_khoe', 'Thuốc đúng, phác đồ hiệu quả, cơ thể hồi phục nhanh chóng, tinh thần tốt dần lên'),
(NULL,'quan_quy','dang_xa',   NULL, 'dong',       'suc_khoe', 'Bệnh không rõ nguyên nhân, khó chẩn đoán, cần làm thêm xét nghiệm chuyên sâu hoặc đổi bác sĩ'),
-- chung_khoan
(NULL,'the_tai', 'thanh_long',NULL, 'dong',       'chung_khoan', 'Cổ phiếu phá kháng cự, tạo đỉnh mới, tín hiệu mua vào rất mạnh, uptrend xác nhận rõ ràng'),
(NULL,'the_tai', 'bach_ho',   NULL, 'dong',       'chung_khoan', 'Sell-off mạnh, cổ phiếu lao dốc nhanh, cần cắt lỗ ngay hoặc đứng ngoài thị trường'),
(NULL,'huynh_de','huyen_vu',  NULL, 'dong',       'chung_khoan', 'Thao túng giá, nhà đầu tư nhỏ lẻ bị bẫy vào để xả hàng, cẩn thận cổ phiếu làm giá ngầm'),
(NULL,'tu_ton',  NULL,        NULL, 'dong',       'chung_khoan', 'Cắt lỗ đúng lúc bảo vệ vốn, hoặc chốt lời hợp lý trước khi thị trường đảo chiều'),
-- bat_dong_san
(NULL,'the_tai', 'thanh_long',NULL, 'dong',       'bat_dong_san', 'Cơ hội mua BĐS tốt xuất hiện, giá hợp lý, pháp lý sạch, thanh khoản tốt — nên hành động'),
(NULL,'phu_mau', 'cau_tran',  NULL, 'dong',       'bat_dong_san', 'Sổ đỏ hoặc hợp đồng công chứng đang bị kẹt thủ tục, cần thêm thời gian để hoàn thiện giấy tờ'),
(NULL,'quan_quy','bach_ho',   NULL, 'dong',       'bat_dong_san', 'Tranh chấp pháp lý nghiêm trọng, nguy cơ mất tiền đặt cọc hoặc bị thu hồi tài sản, cần luật sư ngay'),
(NULL,'huynh_de','huyen_vu',  NULL, 'dong',       'bat_dong_san', 'Môi giới hoặc đối tác âm thầm gian lận, bán cùng lúc cho nhiều người, cần kiểm tra pháp lý độc lập');


-- =============================================================================
-- SEED DATA - BẢNG 3: tuong_dong_bien
-- =============================================================================
INSERT INTO tuong_dong_bien (luc_than_goc, luc_than_bien, huong_bien, chu_de, mo_ta_bien) VALUES
-- cong_viec - hồi đầu khắc
('quan_quy',  'tu_ton',    'hoi_dau_khac', 'cong_viec', 'Công việc ban đầu tưởng tốt nhưng về sau bị nhân viên cấp dưới hoặc đồng nghiệp cản trở, dẫn đến đổ vỡ thất bại hoàn toàn'),
('the_tai',   'huynh_de',  'hoi_dau_khac', 'cong_viec', 'Hợp đồng hoặc thu nhập tưởng chắc chắn nhưng bị đồng nghiệp tranh giành hoặc chi phí ăn hết lợi nhuận'),
('phu_mau',   'quan_quy',  'hoi_dau_khac', 'cong_viec', 'Hợp đồng ký xong lại trở thành gánh nặng áp lực, điều khoản bất lợi bộc lộ sau khi đã cam kết'),
('huynh_de',  'phu_mau',   'hoi_dau_khac', 'cong_viec', 'Đồng nghiệp hợp tác lúc đầu tốt đẹp nhưng về sau tạo ra ràng buộc, thủ tục phức tạp khó thoát ra'),
('tu_ton',    'quan_quy',  'hoi_dau_khac', 'cong_viec', 'Kế hoạch nghỉ ngơi hay dự án sáng tạo tự do lại dẫn đến áp lực mới và trách nhiệm nặng nề hơn'),
-- cong_viec - hồi đầu sinh
('quan_quy',  'phu_mau',   'hoi_dau_sinh', 'cong_viec', 'Áp lực công việc nặng nề lúc đầu nhưng tạo ra hợp đồng quý giá và kiến thức vững chắc về lâu dài'),
('the_tai',   'tu_ton',    'hoi_dau_sinh', 'cong_viec', 'Thu nhập có vẻ giảm ban đầu nhưng mang lại sự ổn định và phúc lợi lâu dài cho bản thân và đội nhóm'),
('huynh_de',  'the_tai',   'hoi_dau_sinh', 'cong_viec', 'Tranh chấp với đồng nghiệp lúc đầu căng thẳng nhưng cuối cùng lại sinh ra lợi ích và tài nguyên mới'),
('phu_mau',   'tu_ton',    'hoi_dau_sinh', 'cong_viec', 'Thủ tục giấy tờ lúc đầu phức tạp nhưng hoàn thiện xong tạo nền tảng vững chắc, giảm rủi ro lâu dài'),
-- cong_viec - hóa tiến
('the_tai',   'the_tai',   'hoa_tien',     'cong_viec', 'Thu nhập và cơ hội tài chính ngày càng tăng trưởng, đang trên đà đi lên mạnh mẽ'),
('quan_quy',  'quan_quy',  'hoa_tien',     'cong_viec', 'Vị trí và quyền lực ngày càng được củng cố, thăng tiến đang trên đà tăng tốc rõ rệt'),
('phu_mau',   'phu_mau',   'hoa_tien',     'cong_viec', 'Dự án và hợp đồng ngày càng trưởng thành, mọi thủ tục đang đi đúng hướng và tiến triển tốt'),
-- cong_viec - hóa thoái
('the_tai',   'the_tai',   'hoa_thoai',    'cong_viec', 'Thu nhập và cơ hội dần co lại, cần điều chỉnh chiến lược trước khi tình hình tệ hơn'),
('quan_quy',  'quan_quy',  'hoa_thoai',    'cong_viec', 'Quyền lực và ảnh hưởng đang suy giảm dần, vị trí không còn vững chắc như trước'),
('phu_mau',   'phu_mau',   'hoa_thoai',    'cong_viec', 'Hợp đồng hoặc dự án đang mất đà, cần xem lại toàn bộ kế hoạch và điều kiện thực hiện'),
-- tinh_yeu
('quan_quy',  'tu_ton',    'hoi_dau_khac', 'tinh_yeu', 'Người yêu ban đầu cuốn hút mạnh nhưng về sau bị con cái hoặc người thân đối phương can thiệp gây chia rẽ'),
('the_tai',   'huynh_de',  'hoi_dau_khac', 'tinh_yeu', 'Tình cảm ban đầu nồng ấm nhưng người thứ ba xuất hiện hoặc bạn bè can thiệp phá vỡ mối quan hệ'),
('quan_quy',  'phu_mau',   'hoi_dau_sinh', 'tinh_yeu', 'Tình cảm ban đầu có nhiều ràng buộc nhưng cuối cùng dẫn đến hôn nhân chính thức được gia đình chấp thuận'),
('tu_ton',    'quan_quy',  'hoi_dau_khac', 'tinh_yeu', 'Mối quan hệ nhẹ nhàng thoải mái lúc đầu bỗng trở nên ràng buộc và áp lực, dễ gây ngột ngạt'),
('the_tai',   'tu_ton',    'hoi_dau_sinh', 'tinh_yeu', 'Tình cảm bắt đầu từ mục đích vật chất nhưng dần dần trở nên thuần khiết, hạnh phúc thực sự'),
-- kinh_doanh
('the_tai',   'huynh_de',  'hoi_dau_khac', 'kinh_doanh', 'Doanh thu ban đầu tưởng tốt nhưng đối thủ hoặc chi phí phát sinh ăn hết lợi nhuận, thực sự thua lỗ'),
('phu_mau',   'quan_quy',  'hoi_dau_khac', 'kinh_doanh', 'Vốn vay hoặc đầu tư ban đầu trở thành gánh nặng pháp lý và áp lực tài chính, nguy cơ vỡ nợ'),
('the_tai',   'tu_ton',    'hoi_dau_sinh', 'kinh_doanh', 'Doanh thu giảm giai đoạn đầu nhưng đang xây dựng đội ngũ tốt và nền tảng vững cho tương lai'),
('quan_quy',  'phu_mau',   'hoi_dau_sinh', 'kinh_doanh', 'Vượt qua rào cản pháp lý khó khăn lúc đầu giúp doanh nghiệp vận hành bền vững hơn về sau'),
-- suc_khoe
('quan_quy',  'tu_ton',    'hoi_dau_khac', 'suc_khoe', 'Bệnh tình tưởng thuyên giảm nhưng thuốc không phù hợp gây phản ứng phụ hoặc bệnh khác phát sinh'),
('tu_ton',    'quan_quy',  'hoi_dau_khac', 'suc_khoe', 'Phương pháp điều trị ban đầu có vẻ ổn nhưng về sau gây biến chứng mới nghiêm trọng hơn'),
('quan_quy',  'phu_mau',   'hoi_dau_sinh', 'suc_khoe', 'Bệnh tình phức tạp nhưng tìm được đúng bác sĩ và phác đồ, dần dần hồi phục theo đúng kế hoạch'),
('tu_ton',    'phu_mau',   'hoa_tien',     'suc_khoe', 'Sức khỏe đang phục hồi tốt từng ngày, thuốc và chế độ dinh dưỡng đang phát huy hiệu quả rõ ràng'),
-- chung_khoan
('the_tai',   'huynh_de',  'hoi_dau_khac', 'chung_khoan', 'Cổ phiếu tăng đẹp lúc đầu nhưng sau đó bị xả hàng mạnh, lãi chưa kịp chốt đã hóa thành thua lỗ'),
('the_tai',   'tu_ton',    'hoi_dau_sinh', 'chung_khoan', 'Giai đoạn điều chỉnh ngắn hạn nhưng đây là cơ hội gom hàng tốt, về lâu dài cổ phiếu sẽ tăng bền vững'),
('huynh_de',  'the_tai',   'hoi_dau_sinh', 'chung_khoan', 'Sau giai đoạn bán tháo và mất mát, thị trường đảo chiều và sinh lời bất ngờ cho những ai giữ vị thế'),
-- bat_dong_san
('the_tai',   'huynh_de',  'hoi_dau_khac', 'bat_dong_san', 'BĐS tưởng có lời nhưng chi phí phát sinh và tranh chấp ăn hết giá trị, cuối cùng thua lỗ nặng'),
('phu_mau',   'tu_ton',    'hoi_dau_sinh', 'bat_dong_san', 'Thủ tục pháp lý phức tạp ban đầu nhưng sau khi hoàn thiện, tài sản sinh lời ổn định và an toàn')
ON CONFLICT (luc_than_goc, luc_than_bien, huong_bien, chu_de) DO UPDATE SET mo_ta_bien = EXCLUDED.mo_ta_bien;
