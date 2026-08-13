const THAI_AT_REFERENCE = {
    CUNG_MEANINGS: {
        "Tý": "Địa Chủ: Thủy, Khảm (8). Tháng 11. Dương khí bắt đầu sinh. Lời nói không ổn định.",
        "Sửu": "Dương Đức: Thổ, Đông Bắc (5). Tháng 12. Dương khí sinh từ từ, ban ân giáo dưỡng.",
        "Cấn": "Hòa Đức: Thổ, Cấn (3). Giao Đông-Xuân. Âm dương điều hòa, tác thành.",
        "Dần": "Lã Thân: Mộc, Cấn (3). Tháng Giêng. Khí thuần dương, chi phối người và vạn vật.",
        "Mão": "Cao Tùng: Mộc, Chấn (4). Tháng 2. Dương khí thịnh vượng (dương tạp). Chủ phát huy.",
        "Thìn": "Thái Dương: Thổ, Chấn (4). Tháng 3. Dương đắc vị, sấm sét rền vang, tai ách binh đao.",
        "Tốn": "Đại Cảnh: Mộc, Tốn (9). Giao Xuân-Hạ. Dương cực thịnh (tuyệt). Chủ mệnh lệnh.",
        "Tị": "Đại Thần: Hỏa, Tốn (9). Tháng 4. Dương đạt cực điểm. Hỏa thần đương uy. Phá hoại lỡ việc.",
        "Ngọ": "Đại Uy: Hỏa, Ly (2). Tháng 5. Khí dương thuần. Quang chính nghiêm minh.",
        "Mùi": "Thiên Đạo: Thổ, Ly (2). Tháng 6. Âm khí tăng dần, địa đạo lấn lướt. Ngấm ngầm xấu xa.",
        "Khôn": "Đại Vũ: Thổ, Khôn (7). Giao Hạ-Thu. Âm khí tăng, Kim thần nắm lệnh. Hình phạt, thương tổn.",
        "Thân": "Vũ Đức: Kim, Khôn (7). Tháng 7. Âm thịnh vượng. Vạn vật tàn lụi, đổi dời.",
        "Dậu": "Thái Tộc: Kim, Đoài (6). Tháng 8. Âm thịnh, chín muồi. Chủ biến đổi.",
        "Tuất": "Âm Chủ: Thổ, Đoài (6). Tháng 9. Âm đắc vị. Vạn vật điêu linh. Tai ách binh tang.",
        "Càn": "Âm Đức: Kim, Càn (1). Giao Thu-Đông. Âm cực thịnh (tuyệt). Ban bố ân đức.",
        "Hợi": "Đại Nghĩa: Thủy, Càn (1). Tháng 10. Dương khí sắp xuất hiện. Chủ mưu kế, bỏ đi."
    },
    STAR_MEANINGS: {
        "Thái Ất": "Thái Ất (Mộc): Hợp Ngũ Phúc, Văn Xương ở đất miếu vượng là văn võ song toàn, khoa bảng lớn.",
        "Văn Xương": "Văn Xương / Thiên Mục (Thổ): Chủ quyền uy học vấn. Kỵ nhất ở Tý, Dần, Mão, Dậu.",
        "Thiên Mục": "Văn Xương / Thiên Mục (Thổ): Chủ quyền uy học vấn. Kỵ nhất ở Tý, Dần, Mão, Dậu.",
        "Thủy Kích": "Thủy Kích / Địa Mục (Hỏa): Chủ bạo lực, đâm giết. Nữ mệnh sát chồng khóc con.",
        "Địa Mục": "Thủy Kích / Địa Mục (Hỏa): Chủ bạo lực, đâm giết. Nữ mệnh sát chồng khóc con.",
        "Kế Thần": "Kế Thần (Hỏa): Đo lường sự việc còn trong vòng u minh.",
        "Đại Tướng Chủ": "Đại Tướng Chủ (Kim): Ở miếu vượng là tướng soái, khoa danh. Hãm địa dễ tù tội.",
        "Đại Tướng Khách": "Đại Tướng Khách (Thủy): Ở miếu vượng là tướng soái. Hãm địa dễ hình khắc.",
        "Tham Tướng Chủ": "Tham Tướng Chủ (Thủy): Phó tướng bên Chủ.",
        "Tham Tướng Khách": "Tham Tướng Khách (Mộc): Phó tướng bên Khách.",
        "Ngũ Phúc": "Ngũ Phúc (Thổ): Ban phúc (Phú, quý, thọ, khang, ninh). Ở cung ác tuyệt bị khắc thì thất bại.",
        "Quân Cơ": "Quân Cơ (Thổ): Cát tinh phò tá, chủ vinh hoa. Hội đủ Tam Cơ là cách Cửu Hoa đại quý.",
        "Thần Cơ": "Thần Cơ (Thổ): Chủ bách tính an vui, tể tướng.",
        "Dân Cơ": "Dân Cơ (Thổ): Chủ dân chúng, lương thảo.",
        "Tứ Thần": "Tứ Thần (Thủy): Hệ thống thần bảo vệ 4 phương.",
        "Thiên Ất": "Thiên Ất (Kim): Phò tá Thái Ất.",
        "Trực Phù": "Trực Phù (Hỏa): Chỉ huy trận tiền.",
        "Địa Ất": "Địa Ất (Thổ): Trấn giữ hậu phương.",
        "Đại Du": "Đại Du (Kim): Quẻ Trong của vận hạn dài hạn.",
        "Tiểu Du": "Tiểu Du (Mộc hóa Thủy): Quẻ Ngoài, vận hành như Thái Ất.",
        "Thanh Long": "Thanh Long (Cờ Xanh): Cát tinh, chủ may mắn phương Đông.",
        "Xích Kỳ": "Xích Kỳ (Cờ Đỏ): Binh đao, chiến trận.",
        "Hắc Kỳ": "Hắc Kỳ (Cờ Đen): Hung tinh, chủ tang tóc.",
        "Thiên Tôn": "Thiên Tôn: Chủ phong vũ khí hậu.",
        "Thiên Hoàng": "Thiên Hoàng: Chủ vua chúa, quốc gia.",
        "Thiên Thời": "Thiên Thời: Chủ thời tiết, thời vận.",
        "Đế Phù": "Đế Phù: Phò tá đế vương.",
        "Phi Điểu": "Phi Điểu: Chim bay, chủ tin tức xa.",
        "Bát Phong": "Bát/Tam/Ngũ Phong, Ngũ Hành: Hệ thống dự báo khí tượng.",
        "Tam Phong": "Bát/Tam/Ngũ Phong, Ngũ Hành: Hệ thống dự báo khí tượng.",
        "Ngũ Phong": "Bát/Tam/Ngũ Phong, Ngũ Hành: Hệ thống dự báo khí tượng.",
        "Ngũ Hành": "Bát/Tam/Ngũ Phong, Ngũ Hành: Hệ thống dự báo khí tượng."
    },
    BAT_MON_DETAIL: {
        "Khai": "Khai (Càn 1 - Kim): Thiên Môn. Thuận khai hướng, không thuận xuất quân.",
        "Hưu": "Hưu (Khảm 8 - Thủy): Đoan Môn. Thuận an binh tụ chúng, dễ sinh nghi ngờ.",
        "Sinh": "Sinh (Cấn 3 - Thổ): Hòa Đức Môn. Nơi vạn vật xuất sinh, cát lợi.",
        "Thương": "Thương (Chấn 4 - Mộc): Lôi Đình Môn. Dương khí thịnh, chủ tai ương tổn hại.",
        "Đỗ": "Đỗ (Tốn 9 - Thủy): Địa Hộ Môn. Dương khí tới chỗ tuyệt, bế tắc, nên cố thủ.",
        "Cảnh": "Cảnh (Ly 2 - Hỏa): Minh Đường Môn. Tôn quý đẹp đẽ, thuận xem xét phòng binh.",
        "Tử": "Tử (Khôn 7 - Thổ): Địa Ngục Môn. Khí âm phản liệt, chủ mai táng chết chóc. Cực hung.",
        "Kinh": "Kinh (Đoài 6 - Kim): Túc Sát Môn. Chủ kinh sợ, rối loạn."
    },
    CACH_CUC: {
        "Yểm": "Thái Ất lâm cung ác, bị hung tinh chế ngự.",
        "Kích": "Thái Ất gặp Thủy Kích đồng cung.",
        "Ép": "Thái Ất bị kìm kẹp giữa ác tinh.",
        "Cách": "Thái Ất bị ngăn cản, khó phát huy.",
        "Tù": "Thái Ất rơi vào cung hãm địa.",
        "Chặn": "Thái Ất bị chặn đường tiến thoái.",
        "Đối": "Thái Ất đối xung với hung tinh.",
        "Đề Hiệp": "Thái Ất bị ép hai bên.",
        "Chấp Đề": "Khách bắt giữ Chủ, hung họa.",
        "Đề Cách": "Chủ Khách không hòa thuận.",
        "Tứ Quách Cố Đỗ": "Bốn bề vây hãm, đóng kín bế tắc."
    },
    HEXAGRAM_BRIEF: {
        "Thuần Càn": "Trời, cứng rắn, mạnh mẽ, vĩ đại.",
        "Thuần Khôn": "Đất, mềm mỏng, nhu thuận, bao dung.",
        "Thủy Lôi Truân": "Gian nan, khó khăn lúc ban đầu.",
        "Sơn Thủy Mông": "Mờ mịt, thơ ấu, cần giáo dục.",
        "Thủy Thiên Nhu": "Chờ đợi, nhẫn nại, cần thời gian.",
        "Thiên Thủy Tụng": "Kiện cáo, tranh chấp, bất hòa.",
        "Địa Thủy Sư": "Quân đội, chiến tranh, dẫn dắt quần chúng.",
        "Thủy Địa Tỷ": "Gần gũi, thân thiết, liên kết.",
        "Phong Thiên Tiểu Súc": "Tích lũy nhỏ, bị kìm hãm tạm thời.",
        "Thiên Trạch Lý": "Giẫm lên, cẩn thận, lễ nghi.",
        "Địa Thiên Thái": "Thái bình, thông suốt, hài hòa.",
        "Thiên Địa Bĩ": "Bế tắc, không thông, kẻ tiểu nhân đắc chí.",
        "Thiên Hỏa Đồng Nhân": "Cùng người, đồng tâm hiệp lực.",
        "Hỏa Thiên Đại Hữu": "Sở hữu lớn, phong phú, thịnh vượng.",
        "Địa Sơn Khiêm": "Khiêm tốn, nhún nhường, thoái lui.",
        "Lôi Địa Dự": "Vui vẻ, chuẩn bị, phòng ngừa.",
        "Trạch Lôi Tùy": "Theo sau, tùy tòng, thuận theo.",
        "Sơn Phong Cổ": "Sửa chữa, thối nát, giải quyết rắc rối.",
        "Địa Trạch Lâm": "Tiến đến, cai quản, lớn mạnh.",
        "Phong Địa Quan": "Quan sát, xem xét, làm gương.",
        "Hỏa Lôi Phệ Hạp": "Cắn đứt, hình phạt, giải quyết chướng ngại.",
        "Sơn Hỏa Bí": "Trang sức, bề ngoài, hình thức.",
        "Sơn Địa Bác": "Bóc lột, suy rơi, tàn tạ.",
        "Địa Lôi Phục": "Phục hồi, trở lại, tái sinh.",
        "Thiên Lôi Vô Vọng": "Không càn bậy, chân thật, tự nhiên.",
        "Sơn Thiên Đại Súc": "Tích lũy lớn, chứa đựng nhiều.",
        "Sơn Lôi Di": "Nuôi dưỡng, ăn uống, tu tâm.",
        "Trạch Phong Đại Quá": "Vượt quá, thái quá, trách nhiệm nặng nề.",
        "Thuần Khảm": "Hiểm nguy, hố sâu, vất vả.",
        "Thuần Ly": "Sáng sủa, rực rỡ, bám víu.",
        "Trạch Sơn Hàm": "Cảm ứng, rung động, tình cảm.",
        "Lôi Phong Hằng": "Bền lâu, trường cửu, ổn định.",
        "Thiên Sơn Độn": "Lùi bước, ẩn náu, trốn tránh.",
        "Lôi Thiên Đại Tráng": "Lớn mạnh, cường thịnh, quá đà.",
        "Hỏa Địa Tấn": "Tiến lên, phát triển, rạng rỡ.",
        "Địa Hỏa Minh Di": "Ánh sáng bị vùi dập, đen tối.",
        "Phong Hỏa Gia Nhân": "Người trong nhà, gia đình, nề nếp.",
        "Hỏa Trạch Khuê": "Trái ngược, xa cách, chia rẽ.",
        "Thủy Sơn Kiển": "Tốn công, gian khổ, tắc nghẽn.",
        "Lôi Thủy Giải": "Giải thoát, gỡ rối, phân tán.",
        "Sơn Trạch Tổn": "Tổn thất, bớt đi, hao hụt.",
        "Phong Lôi Ích": "Gia tăng, lợi ích, tiến bộ.",
        "Trạch Thiên Quải": "Quyết đoán, tiêu trừ kẻ xấu.",
        "Thiên Phong Cấu": "Gặp gỡ, giao hợp, bất ngờ.",
        "Trạch Địa Tụy": "Tụ họp, gom lại, đông đúc.",
        "Địa Phong Thăng": "Thăng tiến, bay lên, tiến bước.",
        "Trạch Thủy Khốn": "Khốn cùng, mệt mỏi, kẹt cứng.",
        "Thủy Phong Tỉnh": "Cái giếng, không đổi, nuôi dưỡng.",
        "Trạch Hỏa Cách": "Thay đổi, cải cách, cách mạng.",
        "Hỏa Phong Đỉnh": "Cái vạc, vững chãi, nuôi dưỡng hiền tài.",
        "Thuần Chấn": "Sấm sét, chấn động, sợ hãi.",
        "Thuần Cấn": "Ngừng lại, đồi núi, tĩnh lặng.",
        "Phong Sơn Tiệm": "Tiến dần dần, từ từ, tuần tự.",
        "Lôi Trạch Quy Muội": "Gái lấy chồng, không chính đáng.",
        "Lôi Hỏa Phong": "Phong phú, dồi dào, to lớn.",
        "Hỏa Sơn Lữ": "Lữ hành, tạm bợ, lang thang.",
        "Thuần Tốn": "Gió, mềm mỏng, thuận theo.",
        "Thuần Đoài": "Vui vẻ, đầm lầy, khuyết thiếu.",
        "Phong Thủy Hoán": "Phân tán, lan rộng, vượt qua nguy hiểm.",
        "Thủy Trạch Tiết": "Tiết chế, giới hạn, chừng mực.",
        "Phong Trạch Trung Phu": "Trung thực, tin cậy, cảm hóa.",
        "Lôi Sơn Tiểu Quá": "Hơi quá đà, việc nhỏ.",
        "Thủy Hỏa Ký Tế": "Đã xong, hoàn tất, cần thận trọng.",
        "Hỏa Thủy Vị Tế": "Chưa xong, dở dang, hy vọng."
    },
    NGU_HANH_TUONG_TINH: {
        "Thái Ất": { element: "Mộc", status: "Vượng Xuân (Đông phương)", desc: "Chính khí Mộc thần, văn võ song toàn." },
        "Thủy Kích": { element: "Hỏa", status: "Vượng Hạ (Nam phương)", desc: "Chính khí Hỏa thần, bạo lực hình khắc." },
        "Văn Xương": { element: "Thổ", status: "Vượng Tứ Quý (Thìn, Tuất, Sửu, Mùi)", desc: "Chính khí Thổ thần, chủ học vấn uy quyền." },
        "Đại Tướng Chủ": { element: "Kim", status: "Vượng Thu (Tây phương)", desc: "Chính khí Kim thần, chỉ huy quân Chủ." },
        "Tham Tướng Chủ": { element: "Thủy", status: "Bắc phương", desc: "Trợ thủ phó tướng quân Chủ." },
        "Đại Tướng Khách": { element: "Thủy", status: "Vượng Đông (Bắc phương)", desc: "Chính khí Thủy thần, chỉ huy quân Khách." },
        "Tham Tướng Khách": { element: "Mộc", status: "Đông phương", desc: "Trợ thủ phó tướng quân Khách." },
        "Ngũ Phúc": { element: "Thổ", status: "Kinh hành 5 cung chính (225 năm)", desc: "Thần ban phúc đức, phú quý khang ninh." },
        "Quân Cơ": { element: "Thổ", status: "Chu kỳ 360 năm (30 năm/cung từ Ngọ)", desc: "Tử Vi Đại Đế, phò quốc an dân." },
        "Thần Cơ": { element: "Thổ", status: "Chu kỳ 36 năm (3 năm/cung từ Ngọ)", desc: "Phụ tá Thiên Đế, cai quản lục cung." },
        "Dân Cơ": { element: "Thổ", status: "Chu kỳ 12 năm (1 năm/cung từ Tuất)", desc: "Thần tài phú, an lòng bách tính." },
        "Đại Du": { element: "Kim", status: "Chu kỳ 288 năm (36 năm/cung từ Khôn)", desc: "Hung thần tàn phá, thiên vận thất thường." },
        "Tiểu Du": { element: "Mộc hóa Thủy", status: "Chu kỳ 192 năm (24 năm/cung từ Kiền)", desc: "Quẻ Ngoại, vận hành như Thái Ất." },
        "Phi Phù": { element: "Hỏa", status: "Chu kỳ 36 năm (3 năm/cung)", desc: "Sao Lửa Bùa Bay, hung tinh xung chiếu Thái Ất." },
        "Thanh Long": { element: "Mộc", status: "Cờ Xanh Thái Tuế (12 năm từ Hợi)", desc: "Giữ cờ hiệu lệnh thời tiết bình bị." },
        "Xích Kỳ": { element: "Hỏa", status: "Cờ Đỏ Tứ Mạnh (4 năm từ Hợi)", desc: "Bất thường thời tiết bất lợi dụng binh." },
        "Hắc Kỳ": { element: "Thủy/Hậu Phi", status: "Cờ Đen Thái Âm (36 năm nghịch Hợi)", desc: "Báo hiệu chiến trường và thời tiết khí hậu." }
    },
    CUNG_PHAN_DA_9_CHAU: {
        1: { cung: "Càn", chau: "Dực Châu", can: "Nhâm", sao: "Văn Xương / Chiêu Dao" },
        2: { cung: "Ly", chau: "Kinh Châu", can: "Đinh", sao: "Huyền Phượng / Hoa Minh" },
        3: { cung: "Cấn", chau: "Thanh Châu", can: "Giáp", sao: "Minh Duy / Huyền Vũ" },
        4: { cung: "Chấn", chau: "Từ Châu", can: "Ất", sao: "Âm Đức / Huyền Minh" },
        5: { cung: "Trung Cung", chau: "Dự Châu", can: "Mậu / Kỷ", sao: "Chiêu Dao / Cưu Minh" },
        6: { cung: "Đoài", chau: "Ung Châu", can: "Tân", sao: "Hoa Minh / Văn Xương" },
        7: { cung: "Khôn", chau: "Lương Châu", can: "Canh", sao: "Huyền Vũ / Huyền Phượng" },
        8: { cung: "Khảm", chau: "Duyên Châu", can: "Quý", sao: "Huyền Minh / Minh Duy" },
        9: { cung: "Tốn", chau: "Dương Châu", can: "Bính", sao: "Cưu Minh / Âm Đức" }
    },
    QUY_THAN_CUU_TINH_LUAN_GIAI: {
        "Thái Nhất": {
            general: "Thần tinh tốt lành, may mắn, quý thần bậc nhất. Tuy nhiên nếu gia lâm các cung mà gặp Đại Du và Tứ Thần thì sinh tai họa lụt lội, dịch bệnh, tổn hại mùa màng.",
            byPalace: {
                "Kiền": "Gặp Đại Du/Tứ Thần: Băng tuyết lạnh giá, hại đời sống con người, việc thổ công vất vả.",
                "Khảm": "Gặp Đại Du/Tứ Thần: Mưa rơi tuyết lạnh, nước sông dâng cao gây lụt lội.",
                "Cấn": "Gặp Đại Du/Tứ Thần: Thủy thổ phát sinh bệnh tật.",
                "Chấn": "Gặp Đại Du/Tứ Thần: Lúa ngô mùa màng bị sâu bọ côn trùng phá hoại.",
                "Tốn": "Gặp Đại Du/Tứ Thần: Kẻ dưới chuyên quyền, việc thổ công nặng nhọc, mưa nhiều hại mùa màng.",
                "Ly": "Gặp Đại Du/Tứ Thần: Sưu cao thuế nặng, hạn hán, sét đánh, cháy rừng.",
                "Khôn": "Gặp Đại Du/Tứ Thần: Nước to, ứng tháng 6-7 thì hạn chế việc binh.",
                "Đoài": "Gặp Đại Du/Tứ Thần: Công việc tạp nhạp, nước dâng, nội loạn.",
                "Sửu_Mùi_Extra": "Tại Sửu-Mùi Thái Ất Kế Tháng gặp các cách trên: Vua chúa hoặc bậc quyền quý có sự chẳng lành."
            }
        },
        "Nhiếp Đề": {
            general: "Đóng ở cung nào năm ấy gió sương lạnh lẽo, phát sinh bệnh tật (nhất là bệnh thận và đường ruột).",
            byCombination: {
                "TieuDu_DaiDu": "Dịch tả, binh lính làm càn, kỷ luật lỏng lẻo, nạn nước lửa.",
                "ThaiAt_4Palaces_Khon_Chan_Doai_Kien": "Thời tiết thất thường, dân chúng suy kiệt, thóc gạo hiếm.",
                "ThaiAt_4Palaces_Ton_Can_Kham_Ly": "Phát sinh dịch bệnh, nhiều cái chết bất thường."
            }
        },
        "Hiên Viên": {
            general: "Đến Chấn-Tốn muôn vật tốt tươi. Gặp Thái Ất khí trời ấm áp hài hòa, bội thu.",
            byCombination: {
                "TuThan_DaiDu": "Thời tiết nóng lạnh thất thường, mùa màng kém thu hoạch, nhiều sấm sét, trộm cắp cướp bóc.",
                "Seasonal": "Mùa Xuân ở Cấn-Chấn, Hạ ở Tốn-Ly, Thu ở Khôn-Đoài, Đông ở Kiền-Khảm: Gió to, sấm sét dồn dập."
            }
        },
        "Chiêu Dao": {
            general: "Vào cung nào năm ấy có gió lớn, rừng cây đổ gãy, mùa màng thất thu.",
            byCombination: {
                "TuThan_DaiDu": "Dân chúng xác xơ đói kém, sâu bệnh tàn hại mùa màng, bệnh tật, động đất, hạn hán, chiến loạn.",
                "Ton": "Gió nóng, vật cháy bị nướng chín.",
                "Can": "Mưa gió liên miên.",
                "Ly": "Hạn hán, gió nóng.",
                "Chan": "Sấm sét nhiều, mưa gây tai hại."
            }
        },
        "Thiên Phù": {
            general: "Hội Tứ Thần - Đại Du: Dân tình khốn khổ, sưu cao thuế nặng, thổ công nặng nhọc, binh dịch vất vả, sâu bệnh.",
            byPalace: {
                "Khảm": "Đê vỡ, dân bệnh.",
                "Cấn_Đoài": "Sương lạnh, gia súc chết.",
                "Kiền": "Trời lạnh giá, băng tuyết.",
                "Ly": "Hạn hán.",
                "Tốn": "Sấm rền, mưa đá, nông nhọc.",
                "TrungCung": "Hại Hậu Phi, nhất là tháng Sửu, Mùi.",
                "Chấn": "Sương lạnh, mưa nhiều, dịch bệnh, sâu lúa.",
                "Khôn": "Nắng hanh cỏ cháy, mưa nhiều, dịch bệnh."
            }
        },
        "Thanh Long": {
            general: "Vào cung nào cũng thời tiết lạnh buốt, sương giá.",
            byCombination: {
                "TuThan_DaiDu_TieuDu": "Dân chúng xiêu liêu, dịch bệnh hoành hành, quân binh mệt mỏi.",
                "Ly": "Nước lụt, binh lính mệt mỏi.",
                "TrungCung": "Vào tháng 11, 12: Dân đói, thời tiết lạnh giá."
            }
        },
        "Hàm Trì": {
            general: "Vào cung nào cũng sương lạnh, cỏ cháy, lúa khô, dân đói, ngoại xâm, nước dâng, bệnh tật, sạt lở núi.",
            byCombination: {
                "DaiDu_TieuDu_TuThan_ThaiAt": "Gió Tây thổi đến mang vị mặn, xảy ra nhiều việc tai quái."
            }
        },
        "Thái Âm": {
            general: "Trời trăng mờ mịt, ít sao.",
            byCombination: {
                "TuThan_DaiDu_TieuDu": "Hậu Phi cần giữ chính, Đại Thần chuyên quyền, phiền dân, thời tiết mưa gió trái mùa, thất thu."
            }
        },
        "Thiên Hoàng": {
            general: "Còn gọi là Thiên Ất. Đại hạn, chướng khí nóng, người đau bệnh, côn trùng hại mùa.",
            byCombination: {
                "TuThan_DaiDu_TieuDu": "Chiến loạn liên miên.",
                "Kham_TuThan_DaiDu_TieuDu": "Sưu cao thuế nặng, lòng dân bất ổn, hỏa hoạn."
            }
        }
    }
};
