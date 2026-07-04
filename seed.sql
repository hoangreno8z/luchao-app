-- Seed data for Lục Hào Database on Supabase
-- Run this in Supabase -> SQL Editor -> New Query

-- 1. Nạp quy tắc Dụng Thần (topics_rules)
INSERT INTO topics_rules (topic_name, primary_deity, secondary_deity, description) VALUES
('công việc', 'Quan Quỷ', 'Tử Tôn', 'Quan Quỷ chủ công danh sự nghiệp, chức vụ. Tử Tôn là kỵ thần khắc Quan Quỷ.'),
('thi cử', 'Phụ Mẫu', 'Quan Quỷ', 'Phụ Mẫu đại diện cho bài thi, bằng cấp. Quan Quỷ hỗ trợ bổ nhiệm công danh.'),
('tình yêu', 'Thê Tài/Quan Quỷ', 'Huynh Đệ', 'Nam lấy Thê Tài làm dụng thần, Nữ lấy Quan Quỷ làm dụng thần. Huynh Đệ là kỵ thần khắc tài.'),
('hôn nhân', 'Thê Tài/Quan Quỷ', 'Huynh Đệ', 'Nam lấy Thê Tài làm dụng thần, Nữ lấy Quan Quỷ làm dụng thần. Huynh Đệ chủ tranh đoạt, chia rẽ.'),
('sức khỏe', 'Tử Tôn', 'Quan Quỷ', 'Tử Tôn chủ thuốc men, giải tai ương. Quan Quỷ đại diện cho bệnh tật, ma quỷ.'),
('kinh doanh', 'Thê Tài', 'Tử Tôn', 'Thê Tài chủ lợi nhuận, tiền bạc. Tử Tôn sinh trợ tài tinh (nguồn tài lộc).'),
('dự án', 'Thê Tài', 'Huynh Đệ', 'Thê Tài chủ tài chính dự án. Huynh Đệ chủ hao tài tốn của, tranh chấp góp vốn.'),
('tìm kiếm', 'Thê Tài', 'Quan Quỷ', 'Tìm vật mất lấy Thê Tài làm dụng thần. Tìm người đi lạc hoặc thú cưng lấy Tử Tôn.'),
('thai sản', 'Tử Tôn', 'Phụ Mẫu', 'Tử Tôn đại diện cho em bé. Phụ Mẫu đại diện cho sản phụ hoặc khắc chế Tử Tôn.'),
('ông bà cha mẹ', 'Phụ Mẫu', 'Thê Tài', 'Phụ Mẫu đại diện cho cha mẹ, người bề trên.'),
('con cháu', 'Tử Tôn', 'Phụ Mẫu', 'Tử Tôn đại diện cho con cháu, thế hệ sau.'),
('anh em', 'Huynh Đệ', 'Quan Quỷ', 'Huynh Đệ đại diện cho anh chị em, bạn bè đồng nghiệp.'),
('xem thay mặt vợ', 'Thê Tài', 'Huynh Đệ', 'Thê Tài đại diện cho người vợ.'),
('xem thay mặt chồng', 'Quan Quỷ', 'Tử Tôn', 'Quan Quỷ đại diện cho người chồng.'),
('xem thay mặt con', 'Tử Tôn', 'Phụ Mẫu', 'Tử Tôn đại diện cho con cái.'),
('xem thay mặt người lớn', 'Phụ Mẫu', 'Thê Tài', 'Phụ Mẫu đại diện cho trưởng bối.')
ON CONFLICT (topic_name) DO UPDATE 
SET primary_deity = EXCLUDED.primary_deity, 
    secondary_deity = EXCLUDED.secondary_deity, 
    description = EXCLUDED.description;

-- 2. Nạp dữ liệu mẫu cho bảng hexagrams (Ví dụ 8 quẻ Bát Thuần tiêu biểu đại diện)
-- Các quẻ này tương ứng với ID được tính theo: (o << 3) | i
-- Với: Càn=7, Khảm=2, Cấn=1, Chấn=4, Tốn=3, Ly=5, Khôn=0, Đoài=6
-- Bát Thuần Càn: (7 << 3) | 7 = 63
-- Bát Thuần Khôn: (0 << 3) | 0 = 0
-- Bát Thuần Khảm: (2 << 3) | 2 = 18
-- Bát Thuần Ly: (5 << 3) | 5 = 45
-- Bát Thuần Chấn: (4 << 3) | 4 = 36
-- Bát Thuần Tốn: (3 << 3) | 3 = 27
-- Bát Thuần Cấn: (1 << 3) | 1 = 9
-- Bát Thuần Đoài: (6 << 3) | 6 = 54

INSERT INTO hexagrams (id, name, palace, vietnamese_meaning, overall_meaning, career_meaning, love_meaning, wealth_meaning, health_meaning) VALUES
(63, 'Bát Thuần Càn', 'Càn', 'Thuần Càn (Trời)', 
'Quẻ Càn tượng trưng cho Trời, sức mạnh sáng tạo vô biên, sự cương kiện và vĩ đại. Đây là quẻ cực cát nếu biết hành động đúng thời cơ và giữ vững sự trung chính.',
'Sự nghiệp vượng phát, có cơ hội thăng tiến mạnh mẽ hoặc đảm nhận vị trí lãnh đạo. Tránh kiêu ngạo tự phụ.',
'Tình duyên nồng nhiệt, nam giới chiếm ưu thế. Tuy nhiên, tính cách quá mạnh mẽ của hai bên dễ dẫn đến bất hòa, cần nhường nhịn.',
'Tài lộc hanh thông, đầu tư có lời lớn. Thích hợp khởi sự kinh doanh quy mô lớn.',
'Sức khỏe tốt, sinh lực dồi dào. Cần phòng các bệnh cao huyết áp hoặc đau đầu do hoạt động quá công suất.'),

(0, 'Bát Thuần Khôn', 'Khôn', 'Thuần Khôn (Đất)', 
'Quẻ Khôn tượng trưng cho Đất, sự nhu thuận, bao dung, tĩnh lặng để nuôi dưỡng vạn vật. Quẻ khuyên người gieo nên thuận theo tự nhiên, làm hậu phương vững chắc sẽ gặt hái đại cát.',
'Sự nghiệp cần sự kiên trì, làm việc nhóm hoặc hỗ trợ cấp trên sẽ có kết quả tốt hơn tự mình đứng mũi chịu sào.',
'Tình duyên êm đẹp, dịu dàng. Hôn nhân gia đình hòa thuận, bao dung lẫn nhau.',
'Tài lộc ổn định, thu hoạch đều đặn từ tích lũy. Không nên tham gia các dự án đầu cơ mạo hiểm.',
'Sức khỏe bình thường, cần chú ý chăm sóc hệ tiêu hóa, dạ dày và tránh suy nghĩ quá nhiều gây mệt mỏi.'),

(18, 'Bát Thuần Khảm', 'Khảm', 'Thuần Khảm (Nước)', 
'Quẻ Khảm tượng trưng cho Nước, vực sâu hiểm trở, khó khăn chồng chất. Quẻ báo hiệu thời kỳ gian nan, cần sự tỉnh táo và lòng tin vững vàng để vượt qua hiểm cảnh.',
'Sự nghiệp gặp bế tắc, nhiều cạm bẫy hoặc tiểu nhân hãm hại. Nên giữ mình bình tĩnh, không nên thay đổi công việc lúc này.',
'Tình duyên trắc trở, nhiều hiểu lầm hoặc rạn nứt. Cần giao tiếp chân thành để tháo gỡ nút thắt.',
'Tài lộc kém, dễ thất thoát tiền bạc hoặc gặp tranh chấp tài chính. Tránh cho vay mượn tiền bạc.',
'Sức khỏe yếu, phòng ngừa các bệnh về hệ tiết niệu, thận, hoặc tai nạn liên quan đến sông nước.'),

(45, 'Bát Thuần Ly', 'Ly', 'Thuần Ly (Lửa)', 
'Quẻ Ly tượng trưng cho Lửa, sự bám víu, ánh sáng và trí tuệ. Quẻ mang ý nghĩa tươi sáng, rực rỡ nhưng cần sự chừng mực, tránh nóng nảy thiêu rụi thành quả.',
'Sự nghiệp thăng hoa, thích hợp với các lĩnh vực sáng tạo, truyền thông, giáo dục. Cần giữ bình tĩnh khi làm việc với đối tác.',
'Tình cảm nồng cháy nhưng nhanh đến nhanh đi, dễ phát sinh tranh cãi nhỏ do nóng tính. Hôn nhân cần sự nhẫn nại.',
'Tài lộc có nguồn thu tốt từ các dự án ngắn hạn. Cần quản lý chi tiêu tránh vung tay quá trán.',
'Sức khỏe chú ý các bệnh về tim mạch, huyết áp, mắt và các bệnh nhiệt trong người.'),

(36, 'Bát Thuần Chấn', 'Chấn', 'Thuần Chấn (Sấm Sét)', 
'Quẻ Chấn tượng trưng cho Sấm sét, sự chấn động, thức tỉnh. Vạn sự ban đầu có thể gây kinh sợ, bất ngờ nhưng kết quả cuối cùng lại bình yên, mang lại sự đổi mới tốt lành.',
'Công việc có biến động bất ngờ (chuyển bộ phận, công tác đột xuất). Hãy chủ động thích ứng, biến động này sẽ mang lại cơ hội phát triển.',
'Tình duyên có bất ngờ thú vị hoặc có tranh cãi lớn rồi lại làm lành nhanh chóng. Giai đoạn nhiều cảm xúc xáo trộn.',
'Tài lộc có biến động mạnh, có thể thu được khoản tiền lớn bất ngờ hoặc chi tiêu đột xuất cho người thân.',
'Chú ý các bệnh về thần kinh, mất ngủ, đau đầu hoặc chấn thương ở chân tay do vận động mạnh.'),

(27, 'Bát Thuần Tốn', 'Tốn', 'Thuần Tốn (Gió)', 
'Quẻ Tốn tượng trưng cho Gió, sự nhu hòa, len lỏi và thấu suốt. Quẻ khuyên nên uyển chuyển như làn gió, thuận theo thời thế để đạt được mục tiêu một cách êm thấm.',
'Công việc tiến triển thuận lợi nhờ tài ngoại giao và sự khéo léo. Thích hợp làm các công việc tư vấn, đàm phán.',
'Tình duyên êm dịu, tiến triển tự nhiên. Hai bên thấu hiểu và biết chia sẻ cùng nhau.',
'Tài lộc nhỏ nhưng đều đặn, không có đột phá lớn nhưng dòng tiền ổn định.',
'Chú ý các bệnh cảm mạo, đường hô hấp, phổi hoặc phong thấp.'),

(9, 'Bát Thuần Cấn', 'Cấn', 'Thuần Cấn (Núi)', 
'Quẻ Cấn tượng trưng cho Núi, sự dừng lại, tĩnh lặng và vững chãi. Quẻ báo hiệu thời điểm nên dừng lại để suy ngẫm, củng cố nội lực hơn là cố chấp tiến lên phía trước.',
'Sự nghiệp đứng yên, không nên mưu cầu thăng tiến hay đổi việc lúc này. Hãy tận dụng thời gian để học hỏi thêm.',
'Tình duyên rơi vào giai đoạn lạnh nhạt, im lặng. Cần tôn trọng không gian riêng của nhau thay vì dồn ép.',
'Tài lộc ngưng trệ, thu chi cân bằng, không thích hợp đầu tư mới.',
'Chú ý các bệnh về xương khớp, đau lưng hoặc các bệnh mãn tính tái phát.'),

(54, 'Bát Thuần Đoài', 'Đoài', 'Thuần Đoài (Đầm Hồ)', 
'Quẻ Đoài tượng trưng cho Đầm hồ, sự vui vẻ, hòa nhã và ăn nói. Quẻ mang điềm cát tường về tiệc tùng, các mối quan hệ xã giao tốt đẹp nhưng phòng thị phi từ lời nói.',
'Sự nghiệp gặp thuận lợi nhờ khả năng giao tiếp và thuyết phục. Phòng ngừa tiểu nhân nói xấu sau lưng.',
'Tình cảm hạnh phúc, ngọt ngào. Hai bên có nhiều buổi hẹn hò, đi chơi vui vẻ cùng nhau.',
'Tài lộc dồi dào, có lộc ăn uống, quà tặng hoặc doanh thu từ bán hàng rất tốt.',
'Sức khỏe ổn định, đề phòng các bệnh về răng miệng, cổ họng hoặc phế quản.')
ON CONFLICT (id) DO UPDATE 
SET name = EXCLUDED.name, 
    palace = EXCLUDED.palace,
    vietnamese_meaning = EXCLUDED.vietnamese_meaning,
    overall_meaning = EXCLUDED.overall_meaning,
    career_meaning = EXCLUDED.career_meaning,
    love_meaning = EXCLUDED.love_meaning,
    wealth_meaning = EXCLUDED.wealth_meaning,
    health_meaning = EXCLUDED.health_meaning;

-- 3. Nạp dữ liệu mẫu cho bảng lines (Giải hào Thế/Ứng tĩnh động cho Bát Thuần Càn)
INSERT INTO lines (hexagram_id, line_number, relation, meaning_static, meaning_active) VALUES
(63, 1, 'Tử Tôn', 'Hào 1 tĩnh: Mọi sự khởi đầu cần âm thầm tích lũy, không nên vội vã thể hiện bản thân.', 'Hào 1 động (Tử Tôn động): Điềm cát tường, có lộc nhỏ hoặc có ý tưởng sáng tạo mới nảy sinh giúp giải quyết khó khăn.'),
(63, 2, 'Thê Tài', 'Hào 2 tĩnh: Thời cơ thuận lợi bắt đầu xuất hiện, gặp được đối tác hoặc cơ hội tốt.', 'Hào 2 động (Thê Tài động): Tiền tài hanh thông, công việc làm ăn thuận lợi, mưu sự dễ thành.'),
(63, 3, 'Huynh Đệ', 'Hào 3 tĩnh: Công việc bận rộn vất vả, chịu nhiều áp lực nhưng nếu kiên trì sẽ thành công.', 'Hào 3 động (Huynh Đệ động): Đề phòng hao tài, tranh chấp với đồng nghiệp hoặc có kẻ dòm ngó tài sản.'),
(63, 4, 'Tử Tôn', 'Hào 4 tĩnh: Cơ hội thăng tiến đang ở thế lưỡng lự, cần quan sát kỹ lưỡng để chọn thời điểm.', 'Hào 4 động (Tử Tôn động): Khó khăn được tháo gỡ nhờ có người trợ giúp hoặc tìm ra phương pháp đúng đắn.'),
(63, 5, 'Thê Tài', 'Hào 5 tĩnh: Vị trí cao nhất, công danh và tài lộc viên mãn, nhận được sự kính trọng.', 'Hào 5 động (Thê Tài động): Gặp vận may lớn về tiền bạc, hợp đồng lớn ký kết thành công.'),
(63, 6, 'Phụ Mẫu', 'Hào 6 tĩnh: Cực thịnh dễ suy, tránh kiêu ngạo tự phụ dẫn đến sai lầm đáng tiếc.', 'Hào 6 động (Phụ Mẫu động): Điềm báo công việc nhiều giấy tờ mệt mỏi, áp lực từ cấp trên hoặc người lớn tuổi.')
ON CONFLICT (hexagram_id, line_number) DO UPDATE
SET relation = EXCLUDED.relation,
    meaning_static = EXCLUDED.meaning_static,
    meaning_active = EXCLUDED.meaning_active;
