/**
 * Bảng Từ Điển Tra Cứu Chú Thích Ý Nghĩa Bát Tự — Dịch Sư Nguyễn Huy Hoàng
 * Thập Thần, Thần Sát & Ngũ Hành Nạp Âm
 */

(function(global) {
    const THAP_THAN_MEANINGS = {
        "Tỷ": {
            name: "Tỷ Kiên (比肩)",
            nature: "Cùng hành, cùng âm dương với Nhật Chủ",
            symbol: "Bạn bè, anh em, đồng nghiệp, đối tác bình đẳng.",
            meaning: "Chủ về tính cách cương trực, tự lập, tự tin, kiên định, có ý chí vươn lên nhưng dễ bảo thủ, ít chịu khuất phục."
        },
        "Kiếp": {
            name: "Kiếp Tài (劫财)",
            nature: "Cùng hành, khác âm dương với Nhật Chủ",
            symbol: "Bạn bè dị tính, đối thủ cạnh tranh, người tranh đoạt tài lộc.",
            meaning: "Chủ về tính tình nhiệt tình, phóng khoáng, quảng giao, dám mạo hiểm, nhưng dễ hao tài tốn của, bốc đồng khi đầu tư."
        },
        "Thực": {
            name: "Thực Thần (食神)",
            nature: "Nhật Chủ sinh ra, cùng âm dương",
            symbol: "Tài hoa, phúc lộc, thọ khang, ăn uống, khẩu tài, con cái (với Nữ).",
            meaning: "Chủ về phúc hậu, thông minh, điềm đạm, có khiếu nghệ thuật, biết hưởng thụ cuộc sống, dồi dào tài lộc an nhàn."
        },
        "Thương": {
            name: "Thương Quan (伤官)",
            nature: "Nhật Chủ sinh ra, khác âm dương",
            symbol: "Tài năng xuất chúng, sáng tạo, cải cách, phản biện, khắc Chính Quan.",
            meaning: "Chủ về thông minh tột đỉnh, nhạy bén, phá cách, thích tự do nhưng dễ ngạo mạn, khắc khẩu với cấp trên hoặc hôn nhân trắc trở."
        },
        "Tài": {
            name: "Chính Tài (正财)",
            nature: "Nhật Chủ khắc ra, khác âm dương",
            symbol: "Tiền tài chính đáng từ công việc, lương bổng, vợ hiền (với Nam).",
            meaning: "Chủ về chăm chỉ, cần kiệm, thực tế, giữ chữ tín, tài vận ổn định vững chắc, gia đạo ấm êm."
        },
        "T.Tài": {
            name: "Thiên Tài (偏财)",
            nature: "Nhật Chủ khắc ra, cùng âm dương",
            symbol: "Tiền tài bất ngờ, kinh doanh, đầu tư, cơ hội, cha hoặc nhân tình (với Nam).",
            meaning: "Chủ về hào phóng, nhanh nhạy với thời cuộc, duyên kinh doanh buôn bán, có tài xoay sở kiếm tiền lớn ngoài luồng."
        },
        "Quan": {
            name: "Chính Quan (正官)",
            nature: "Khắc Nhật Chủ, khác âm dương",
            symbol: "Quan chức, kỷ luật, pháp luật, danh tiếng, chức vụ, chồng (với Nữ).",
            meaning: "Chủ về chính trực, đoan trang, có tinh thần trách nhiệm, tôn trọng pháp luật, dễ thành đạt trong con đường công danh sự nghiệp."
        },
        "Sát": {
            name: "Thất Sát / Thiên Quan (七杀)",
            nature: "Khắc Nhật Chủ, cùng âm dương",
            symbol: "Quyền lực quân sự, thử thách khắc nghiệt, kẻ thù, tai họa, tình nhân (với Nữ).",
            meaning: "Chủ về uy quyền, dũng cảm, quyết đoán, tinh thần thép, dám đương đầu hiểm nguy; nếu có chế hóa thì lập đại nghiệp vẻ vang."
        },
        "Ấn": {
            name: "Chính Ấn (正印)",
            nature: "Sinh Nhật Chủ, khác âm dương",
            symbol: "Mẹ hiền, học vấn, bằng cấp, quý nhân, chức quyền, đạo đức, danh dự.",
            meaning: "Chủ về nhân từ, bác ái, học rộng hiểu sâu, được bề trên che chở nâng đỡ, cuộc sống thanh cao, bình an vô sự."
        },
        "Kiêu": {
            name: "Kiêu Thần / Thiên Ấn (偏印)",
            nature: "Sinh Nhật Chủ, cùng âm dương",
            symbol: "Tư duy trừu tượng, triết học, tôn giáo, y học, nghệ thuật độc đáo, mẹ kế.",
            meaning: "Chủ về thông minh lập dị, trực giác nhạy bén, am hiểu huyền học, nghiên cứu chuyên sâu nhưng tính tình cô độc, đa nghi."
        }
    };

    const THAN_SAT_MEANINGS = {
        "Thiên Ất": {
            name: "Thiên Ất Quý Nhân (天乙贵人)",
            type: "Đại Cát Thần",
            meaning: "Đệ nhất cát thần trong Bát Tự. Gặp hung hóa cát, hoạn nạn có người giúp đỡ, cuộc đời gặp nhiều may mắn, dễ gần quý nhân quyền quý."
        },
        "Thái Cực": {
            name: "Thái Cực Quý Nhân (太极贵人)",
            type: "Đại Cát Thần",
            meaning: "Chủ về thông minh hiếu học, có duyên sâu sắc với triết học, huyền học, tôn giáo, làm việc gì cũng có đầu có đuôi, phúc thọ song toàn."
        },
        "Phúc Tinh": {
            name: "Phúc Tinh Quý Nhân (福星贵人)",
            type: "Cát Thần",
            meaning: "Chủ về bình an, may mắn, no ấm cả đời. Dù không làm quan to cũng hưởng cuộc sống thanh nhàn, cơm áo gạo tiền không lo thiếu thốn."
        },
        "Văn Xương": {
            name: "Văn Xương Quý Nhân (文昌贵人)",
            type: "Cát Thần",
            meaning: "Chủ về thông minh đĩnh ngộ, văn hay chữ tốt, học hành thi cử đỗ đạt cao, có khiếu ăn nói và sáng tác nghệ thuật xuất chúng."
        },
        "Thiên Đức": {
            name: "Thiên Đức Quý Nhân (天德贵人)",
            type: "Đại Cát Thần",
            meaning: "Âm đức trời ban. Gặp tai ương tự tiêu trừ, tính tình từ thiện nhân hậu, cả đời ít bị dính vào vòng lao lý hoặc tai kiếp bất ngờ."
        },
        "Nguyệt Đức": {
            name: "Nguyệt Đức Quý Nhân (月德贵人)",
            type: "Đại Cát Thần",
            meaning: "Đức độ của mặt trăng. Tăng cường phúc khí, hóa giải hung sát, mang lại sự thuận lợi cho hôn nhân, gia đạo và nhân duyên tốt đẹp."
        },
        "Tướng Tinh": {
            name: "Tướng Tinh (将星)",
            type: "Cát Tinh Quyền Uy",
            meaning: "Chủ về khả năng lãnh đạo, tổ chức chỉ huy, có uy phong quyết đoán, thích hợp làm tướng soái, quản lý cấp cao hoặc chính khách."
        },
        "Hoa Cái": {
            name: "Hoa Cái (华盖)",
            type: "Nghệ Thuật & Huyền Học",
            meaning: "Chủ về tư chất thông tuệ, có tài hoa nghệ thuật, yêu thích nghiên cứu tôn giáo triết học; tính cách thanh cao, thích không gian tĩnh lặng."
        },
        "Dịch Mã": {
            name: "Dịch Mã (驿马)",
            type: "Động Tinh Thăng Tiến",
            meaning: "Chủ về di chuyển, xuất ngoại, công tác xa, thay đổi nơi ở hoặc nghề nghiệp. Năng động, cầu tiến, phát triển mạnh khi đi xa lập nghiệp."
        },
        "Trạch Mã": {
            name: "Trạch Mã / Dịch Mã (驿马)",
            type: "Động Tinh Thăng Tiến",
            meaning: "Chủ về di chuyển, xuất ngoại, công tác xa, thay đổi nơi ở hoặc nghề nghiệp. Năng động, cầu tiến, phát triển mạnh khi đi xa lập nghiệp."
        },
        "Đào Hoa": {
            name: "Đào Hoa / Hàm Trì (桃花)",
            type: "Tình Cảm & Sức Hút",
            meaning: "Chủ về diện mạo tuấn tú/xinh đẹp, đa tình, có sức hút giới tính mạnh mẽ, duyên ăn nói thu hút đám đông; cần kiểm soát để tránh thị phi ái tình."
        },
        "Lộc Thần": {
            name: "Lộc Thần / Nhật Lộc (禄神)",
            type: "Cát Thần Tài Lộc",
            meaning: "Lộc trời ban theo Can Ngày, đại diện cho bổng lộc, tiền tài tự tay gây dựng, cơ thể khỏe mạnh dẻo dai, cuộc sống sung túc ấm no."
        },
        "Tuế Lộc": {
            name: "Tuế Lộc / Niên Lộc (岁禄)",
            type: "Cát Thần Phúc Ấm",
            meaning: "Lộc theo Can Năm của dòng họ tổ tiên truyền lại; chủ về được hưởng âm phúc gia đình, thừa kế điền sản hoặc tổ nghiệp vẻ vang."
        },
        "Kình Dương": {
            name: "Kình Dương / Dương Nhẫn (羊刃)",
            type: "Hung Tinh Cương Liệt",
            meaning: "Thanh đao sắc bén. Tính tình cương liệt, dũng cảm, quyết liệt; nếu đắc dụng thì nắm đại quyền, nếu vô chế thì dễ tai nạn thương tích hoặc bốc đồng."
        },
        "Niên Nhẫn": {
            name: "Niên Nhẫn (年刃)",
            type: "Hung Sát Cương Liệt",
            meaning: "Dương Nhẫn tra theo Can Năm; chủ về tính cách mạnh mẽ, tự lập sớm, cần tôi luyện kiên nhẫn để không xảy ra va chạm thị phi."
        },
        "Phi Nhẫn": {
            name: "Phi Nhẫn (飞刃)",
            type: "Hung Tinh Đối Xung",
            meaning: "Đối xung với Dương Nhẫn. Chủ về biến động bất ngờ, cẩn trọng khi tham gia thể thao mạo hiểm hoặc quyết định tài chính liều lĩnh."
        },
        "Quốc Ấn": {
            name: "Quốc Ấn Quý Nhân (国印贵人)",
            type: "Quyền Bính Cát Thần",
            meaning: "Con dấu của nhà nước. Đại diện cho phẩm hàm, chức vụ, sự chính trực, đáng tin cậy, dễ thăng tiến trong cơ quan công quyền hoặc tập đoàn lớn."
        },
        "Thiên Trù": {
            name: "Thiên Trù Quý Nhân (天厨贵人)",
            type: "Phúc Lộc Ẩm Thực",
            meaning: "Bếp trời ban phúc. Đại diện cho tài ẩm thực, ăn ngon mặc đẹp, cuộc sống an nhiên no đủ, hậu vận an khang."
        },
        "Kim Dư": {
            name: "Kim Dư (金舆)",
            type: "Phú Quý Cát Thần",
            meaning: "Xe vàng ngọc. Đại diện cho phú quý, hôn nhân môn đăng hộ đối hoặc lấy được bạn đời hiền đức trợ giúp đắc lực cho sự nghiệp."
        },
        "Học Đường": {
            name: "Học Đường Quý Nhân (学堂贵人)",
            type: "Học Thuật Cát Thần",
            meaning: "Trường sinh vị của bản mệnh. Chủ về thông minh, ham học hỏi, tiếp thu nhanh, học cao hiểu rộng, sự nghiệp học hành đỗ đạt vẻ vang."
        },
        "Từ Quán": {
            name: "Từ Quán Quý Nhân (词馆贵人)",
            type: "Văn Chương Cát Thần",
            meaning: "Kho sách thánh hiền. Chủ về văn phong lưu loát, tài hoa xuất chúng, có năng khiếu viết lách, ngôn luận và phát biểu thuyết phục."
        },
        "Hồng Diễm": {
            name: "Hồng Diễm Sát (红艳)",
            type: "Duyên Dáng Tình Duyên",
            meaning: "Chủ về nụ cười duyên dáng, lãng mạn, dễ làm say đắm lòng người, tình cảm phong phú và được nhiều người mến mộ."
        },
        "Lưu Hà": {
            name: "Lưu Hà Sát (流霞)",
            type: "Huyết Quang Hung Sát",
            meaning: "Chủ về kỵ huyết quang, sản nạn, di chuyển sông nước; cần chú ý an toàn khi đi xa và chăm sóc sức khỏe sinh sản định kỳ."
        },
        "Huyết Nhẫn": {
            name: "Huyết Nhẫn (血刃)",
            type: "Thương Tật Hung Sát",
            meaning: "Chủ về dễ gặp thương tật ngoài da, phẫu thuật dao kéo hoặc va quẹt xe cộ; nên hiến máu nhân đạo hoặc cạo vôi răng đầu năm để giải hạn."
        },
        "Thiên Đức Hợp": {
            name: "Thiên Đức Hợp (天德合)",
            type: "Cát Thần Che Chở",
            meaning: "Hợp khí với Thiên Đức. Gia tăng phúc thọ, giảm nhẹ tai ương, hóa giải các xung khắc bất ngờ trong cuộc sống."
        },
        "Nguyệt Đức Hợp": {
            name: "Nguyệt Đức Hợp (月德合)",
            type: "Cát Thần An Lành",
            meaning: "Hợp khí với Nguyệt Đức. Tăng cường phúc duyên hôn nhân gia đạo, gặp nạn có người đỡ đầu, tâm hồn hướng thiện."
        },
        "Đức Tú": {
            name: "Đức Tú Quý Nhân (德秀贵人)",
            type: "Thanh Tú Cát Thần",
            meaning: "Khí tú của ngũ hành theo lệnh tháng. Chủ về cốt cách thanh nhã, tài sắc song toàn, văn chương đoan chính, tính tình hòa nhã nhân từ."
        },
        "Thiên Xá": {
            name: "Thiên Xá Quý Nhân (天赦贵人)",
            type: "Đại Cát Cứu Giải",
            meaning: "Trời ban chiếu ân xá. Quý thần giải tai ách đệ nhất; dù gặp nạn lớn hay vướng vào pháp lý cũng được quý nhân giải cứu, gặp hung hóa cát."
        },
        "Thiên Y": {
            name: "Thiên Y Quý Nhân (天医贵人)",
            type: "Sức Khỏe & Y Thuật",
            meaning: "Thần sao thầy thuốc. Đại diện cho sức khỏe dẻo dai, biết cách phòng bệnh trị liệu; thích hợp làm nghề y dược, chăm sóc sức khỏe hoặc dưỡng sinh."
        },
        "Hồng Loan": {
            name: "Hồng Loan Tinh (红鸾)",
            type: "Hôn Nhân Hỷ Khánh",
            meaning: "Sao chủ về tình duyên chính thức, hôn nhân hạnh phúc, gia đạo có tin mừng thêm người thêm của, diện mạo đoan trang khả ái."
        },
        "Thiên Hỷ": {
            name: "Thiên Hỷ Tinh (天喜)",
            type: "Niềm Vui May Mắn",
            meaning: "Sao chủ về niềm vui, hỷ sự bất ngờ, tâm trạng vui tươi cởi mở; là vị tinh thần tiêu trừ buồn phiền âu lo."
        },
        "Cô Thần": {
            name: "Cô Thần (孤辰)",
            type: "Cô Độc Hung Sát",
            meaning: "Chủ về tính tình trầm lặng, thích ở một mình, hôn nhân duyên phận đến muộn; nếu tu tập hoặc nghiên cứu chuyên sâu thì rất tinh thông."
        },
        "Quả Tú": {
            name: "Quả Tú (寡宿)",
            type: "Thanh Lặng Hung Sát",
            meaning: "Chủ về ít giao thiệp, nội tâm kín đáo, khó sẻ chia tâm sự; cần chủ động mở lòng và tham gia các hoạt động cộng đồng."
        },
        "Câu Thần": {
            name: "Câu Thần Sát (勾神)",
            type: "Trở Ngại Thị Phi",
            meaning: "Chủ về khẩu thiệt thị phi, việc làm hay bị níu kéo trì hoãn; cần cẩn trọng trong các cam kết bằng văn bản hoặc hợp đồng."
        },
        "Giảo Thần": {
            name: "Giảo Thần Sát (绞神)",
            type: "Vướng Mắc Rắc Rối",
            meaning: "Chủ về công việc dễ bị dây dưa trói buộc, phiền phức từ các mối quan hệ xã giao; nên dứt khoát và rõ ràng trong tiền bạc."
        },
        "Đại Hao": {
            name: "Đại Hao / Nguyên Thần (大耗 / 元辰)",
            type: "Tổn Hao Hung Sát",
            meaning: "Chủ về hao tán tài của, chi tiêu bất ngờ, gặp việc khó lường; thích hợp đầu tư dài hạn vào tài sản cố định hoặc làm từ thiện tích đức."
        },
        "Ngũ Quỷ": {
            name: "Ngũ Quỷ / Quan Phù (五鬼 / 官符)",
            type: "Tiểu Nhân Quấy Phá",
            meaning: "Chủ về đề phòng tiểu nhân gièm pha, tranh chấp công việc; nên hành xử minh bạch, tránh bao che hoặc tham gia chuyện mờ ám."
        },
        "Thiên La": {
            name: "Thiên La (天罗)",
            type: "Lưới Trời Trói Buộc",
            meaning: "Lưới trời Tuất Hợi. Chủ về tâm trí trăn trở nhiều, dễ cảm thấy bế tắc định hướng; thích hợp hướng tâm vào nghiên cứu triết học, đạo học."
        },
        "Địa Võng": {
            name: "Địa Võng (地网)",
            type: "Lưới Đất Ràng Buộc",
            meaning: "Lưới đất Thìn Tị. Chủ về công việc nhiều ràng buộc, áp lực môi trường sống; cần giữ tinh thần lạc quan, tuân thủ pháp luật nghiêm ngặt."
        },
        "Khôi Cương": {
            name: "Khôi Cương Quý Cách (魁罡)",
            type: "Uy Quyền Cương Quyết",
            meaning: "Tính tình cương nghị, thông minh quyết đoán, có chí lớn làm lãnh đạo; kỵ hình xung phá cách, đắc cách thì phú quý tột bậc."
        },
        "Thập Linh": {
            name: "Thập Linh Nhật (十灵日)",
            type: "Trí Tuệ Linh Hoạt",
            meaning: "Ngộ tính cực cao, trực giác nhạy bén, thông minh đĩnh ngộ, có duyên sâu đậm với huyền học và nghệ thuật sáng tạo."
        },
        "Kim Thần": {
            name: "Kim Thần Quý Cách (金神)",
            type: "Uy Dũng Kiên Cường",
            meaning: "Chí khí hào kiệt, ý chí gang thép, không chịu khuất phục khó khăn; gặp đất Hỏa chế ngự thì phát tài phát lộc lớn."
        },
        "Lục Tú": {
            name: "Lục Tú Nhật (六秀日)",
            type: "Tài Hoa Thanh Nhã",
            meaning: "Vẻ ngoài tuấn tú/xinh đẹp, tài hoa phát lộ, ăn nói có duyên và cư xử hòa nhã lịch thiệp, dễ thành công trong xã hội."
        },
        "Thập Ác Đại Bại": {
            name: "Thập Ác Đại Bại (十恶大败)",
            type: "Bất Khả Kháng Hung Sát",
            meaning: "Chủ về tài vận thăng trầm khó giữ, tiền vào tay này ra tay khác; nên rèn luyện kỹ năng quản lý tài chính chặt chẽ."
        },
        "Âm Dương Sai Thác": {
            name: "Âm Dương Sai Thác (阴阳差错)",
            type: "Hôn Nhân Bất Hòa",
            meaning: "Duyên phận vợ chồng hoặc quan hệ với gia đình thông gia dễ có hiểu lầm trắc trở; cần bao dung lắng nghe để giữ hòa khí gia đình."
        },
        "Cô Loan": {
            name: "Cô Loan Sát (孤鸾煞)",
            type: "Phòng Trống Cô Đơn",
            meaning: "Chủ về tình duyên trắc trở, hôn nhân đến muộn hoặc khó hòa hợp trong đời sống vợ chồng; nên kết hôn muộn để hóa giải."
        },
        "Tai Sát": {
            name: "Tai Sát (灾煞)",
            type: "Tai Họa Đột Xuất",
            meaning: "Lục xung với Tướng Tinh. Cần thận trọng khi di chuyển xa hoặc đưa ra các quyết định liều lĩnh trong công việc."
        },
        "Tuế Sát": {
            name: "Tuế Sát (岁煞)",
            type: "Trở Ngại Tiến Trình",
            meaning: "Chủ về mưu sự hay gặp cản trở từ ngoại cảnh; cần chuẩn bị kế hoạch dự phòng chu đáo và kiên nhẫn vượt khó."
        },
        "Không Vong": {
            name: "Tuần Không / Không Vong (空亡)",
            type: "Hư Ảo & Chuyển Hóa",
            meaning: "Địa chi rơi vào trạng thái trống rỗng. Giảm bớt sức mạnh của cát thần hoặc hung sát ở trụ đó; người có Không Vong dễ hướng tâm linh giác ngộ."
        },
        "Kiếp Sát": {
            name: "Kiếp Sát (劫煞)",
            type: "Hung Sát Trở Ngại",
            meaning: "Chủ về trắc trở, cạnh tranh gay gắt, mưu sự nhiều gian nan; nếu kết hợp cát thần thì trở thành người thông minh mưu lược vô song."
        },
        "Vong Thần": {
            name: "Vong Thần (亡神)",
            type: "Biến Động Tinh",
            meaning: "Chủ về tâm tư sâu kín, mưu trí quyền biến; nếu gặp hỷ thần thì mưu trí hơn người, nếu gặp kỵ thần thì dễ lo nghĩ muộn phiền."
        }
    };

    const NAYIN_MEANINGS = {
        "Hải Trung Kim": "Vàng dưới đáy biển — Tiềm ẩn tài năng kín đáo, cần thời cơ khai phá.",
        "Lư Trung Hỏa": "Lửa trong lò — Nhiệt huyết rực cháy, ý chí kiên định, cần thêm củi Mộc để bền lâu.",
        "Đại Lâm Mộc": "Cây rừng lớn — Tán rộng che chở, khí phách anh hùng, có tinh thần tương trợ đại chúng.",
        "Lộ Bàng Thổ": "Đất ven đường — Vững chãi, trung thực, bao dung, làm nền tảng cho muôn người qua lại.",
        "Kiếm Phong Kim": "Vàng mũi kiếm — Sắc bén, quyết đoán, tài hoa phát lộ, tôi luyện qua lửa mới thành bảo kiếm.",
        "Sơn Đầu Hỏa": "Lửa trên núi — Sáng rực rỡ từ xa, khí thế ngút trời, âm thầm tỏa sáng.",
        "Giản Hạ Thủy": "Nước dưới khe — Uyển chuyển, thông minh sâu sắc, mềm mỏng nhưng khó lường.",
        "Thành Đầu Thổ": "Đất trên thành — Vững như bàn thạch, trung kiên thủ hộ, phòng ngự tuyệt vời.",
        "Bạch Lạp Kim": "Vàng sáp ong — Thanh khiết, đã được tinh luyện loại bỏ tạp chất, tinh tế tao nhã.",
        "Dương Liễu Mộc": "Cây dương liễu — Mềm mại, nhã nhặn, khéo léo thích nghi với mọi hoàn cảnh.",
        "Tuyền Trung Thủy": "Nước trong suối — Trong trẻo, mát lành, dồi dào sức sống, không bao giờ cạn kiệt.",
        "Ốc Thượng Thổ": "Đất mái nhà — Che mưa chắn gió, làm mái ấm cho gia đình, đức hạnh chở che.",
        "Tích Lịch Hỏa": "Lửa sấm sét — Nhanh như chớp, uy lực kinh thiên động địa, hành động thần tốc dứt khoát.",
        "Tùng Bách Mộc": "Cây tùng bách — Kiên cường vượt qua sương tuyết mùa đông, khí tiết thanh cao bất khuất.",
        "Trường Lưu Thủy": "Nước chảy dài — Bền bỉ, hướng ra biển lớn, ý chí tiến thủ không ngừng nghỉ.",
        "Sa Trung Kim": "Vàng trong cát — Cần đãi cát tìm vàng, kiên nhẫn tích lũy ắt phát lộ tài năng.",
        "Sơn Hạ Hỏa": "Lửa dưới chân núi — Ấm áp, gần gũi, thực tế, soi sáng bóng đêm nhân gian.",
        "Bình Địa Mộc": "Cây đồng bằng — Tươi tốt, sinh sôi nảy nở nhanh chóng, dễ thành tài trong hòa bình.",
        "Bích Thượng Thổ": "Đất trên vách — Trang nghiêm, ngăn nắp, tô điểm cho ngôi nhà thêm vững chắc.",
        "Kim Bạc Kim": "Vàng dát mỏng — Quý giá, làm đẹp cho tượng Phật cung điện, tinh xảo phi thường.",
        "Phúc Đăng Hỏa": "Lửa đèn dầu — Soi rọi trong đêm tối, đem lại ánh sáng tri thức và niềm tin.",
        "Thiên Hà Thủy": "Nước mưa trời — Nguồn nước tinh khiết tưới tắm cho vạn vật tốt tươi.",
        "Đại Dịch Thổ": "Đất quán dịch — Rộng lớn mênh mông, tiếp đón muôn phương, tâm hồn khoáng đạt.",
        "Thoa Xuyến Kim": "Vàng trang sức — Đẹp đẽ, quý phái, tôn vinh phẩm giá và vẻ đẹp cao sang.",
        "Tang Đố Mộc": "Cây dâu tằm — Nuôi tằm dệt lụa, hữu ích cho đời, cần cù cống hiến.",
        "Đại Khê Thủy": "Nước khe lớn — Thác lũ cuồn cuộn, biến hóa đa đoan, năng lượng dồi dào bất tận.",
        "Sa Trung Thổ": "Đất pha cát — Linh hoạt, dễ canh tác, sinh sôi mùa màng trù phú.",
        "Thiên Thượng Hỏa": "Lửa trên trời (Mặt Trời) — Soi rọi khắp thế gian, vô tư cống hiến, uy quang rực rỡ.",
        "Thạch Lựu Mộc": "Cây lựu đá — Chắc chắn, quả mọng ngọt ngào, kiên gan bền chí sinh tài lộc.",
        "Đại Hải Thủy": "Nước biển lớn — Bao la vô tận, dung nạp trăm sông, chí lớn bao trùm vũ trụ."
    };

    global.BatTuReference = {
        THAP_THAN_MEANINGS,
        THAN_SAT_MEANINGS,
        NAYIN_MEANINGS
    };

})(typeof window !== "undefined" ? window : globalThis);
