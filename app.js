/**
 * Quản Lý Hoạt Động Trang Web - app.js
 * Quản lý trạng thái gieo quẻ 6 lần, hiệu ứng tung xu, xuất ảnh quẻ dịch và hiển thị luận giải.
 */

const APP = (function () {
    // Luồng 6 câu hỏi gieo quẻ tương ứng 6 lần tung xu
    const QUESTIONS = [
        "Câu 1: Vấn đề này của bạn hay bạn đang thay mặt người khác để hỏi?",
        "Câu 2: Bản thân người cần xem là Nam hay Nữ?",
        "Câu 3: Người cần xem sinh năm bao nhiêu (Dương lịch hoặc Âm lịch)?",
        "Câu 4: Mô tả sơ lược vấn đề (ví dụ: công việc kinh doanh tháng này thế nào)?",
        "Câu 5: Bạn đang ở tỉnh/thành phố nào?",
        "Câu 6: Bạn thật tâm mong muốn điều gì diễn ra tốt đẹp nhất?"
    ];

    // Từ điển ý nghĩa cơ bản của 64 quẻ dịch (phục vụ hiển thị luận giải cơ bản)
    const HEX_MEANINGS = {
        "Bát Thuần Càn": "Quẻ Càn đại diện cho Trời, sự cương kiện, khởi đầu mạnh mẽ, hanh thông. Lời khuyên: Hãy giữ vững chí hướng chính trực, kiên trì nỗ lực sẽ gặt hái thành công lớn.",
        "Bát Thuần Khôn": "Quẻ Khôn đại diện cho Đất, sự nhu hòa, tĩnh lặng, bao dung. Lời khuyên: Nên thuận theo tự nhiên, lắng nghe lời khuyên của người đi trước, tránh tranh chấp đi đầu.",
        "Bát Thuần Khảm": "Quẻ Khảm là Nước, sự hiểm trở, gian nan, cản trở trùng điệp. Lời khuyên: Giữ vững lòng tin, kiên nhẫn vượt qua thử thách, thận trọng trong mọi quyết định tài chính.",
        "Bát Thuần Ly": "Quẻ Ly là Lửa, sự sáng suốt, rực rỡ, bám víu. Lời khuyên: Hãy hành xử minh bạch, giữ gìn các mối quan hệ xã hội, phát huy trí tuệ để giải quyết khó khăn.",
        "Bát Thuần Chấn": "Quẻ Chấn là Sấm sét, sự chấn động, lo sợ rồi bình yên. Lời khuyên: Gặp biến cố không nên hoảng loạn, giữ tâm thế bình tĩnh để tìm ra cơ hội trong thử thách.",
        "Bát Thuần Tốn": "Quẻ Tốn là Gió, sự mềm mại, thâm nhập từ từ, thuận theo. Lời khuyên: Hãy uyển chuyển thích nghi với hoàn cảnh, thuyết phục người khác bằng sự ôn hòa.",
        "Bát Thuần Cấn": "Quẻ Cấn là Núi, sự ngưng nghỉ, dừng lại đúng lúc. Lời khuyên: Khi gặp trở ngại lớn, việc dừng lại để tĩnh tâm và tích lũy sức mạnh là giải pháp tối ưu nhất.",
        "Bát Thuần Đoài": "Quẻ Đoài là Đầm nước, sự vui vẻ, hòa nhã, thuyết phục bằng lời nói. Lời khuyên: Cần chú ý lời ăn tiếng nói, mang lại niềm vui cho mọi người sẽ gặp nhiều thuận lợi.",
        "Thiên Phong Cấu": "Cơ hội gặp gỡ bất ngờ nhưng cần cảnh giác với những cám dỗ hoặc thế lực tiêu cực ngầm bên dưới.",
        "Thiên Sơn Độn": "Thời điểm nên rút lui, ẩn náu để bảo toàn lực lượng, tránh đối đầu trực diện.",
        "Thiên Địa Bĩ": "Thời kỳ bế tắc, bất đồng ý kiến, tiểu nhân đắc thế. Cần kiên nhẫn chờ thời.",
        "Phong Địa Quan": "Nên quan sát kỹ lưỡng, suy ngẫm sâu sắc trước khi đưa ra hành động cụ thể.",
        "Sơn Địa Bác": "Sự hao mòn, suy sụp từ bên trong. Tránh đầu tư mạo hiểm, giữ gìn sức khỏe.",
        "Hỏa Địa Tấn": "Sự tiến bộ vượt bậc, thăng tiến nhanh chóng như mặt trời mọc. Rất cát lợi.",
        "Hỏa Thiên Đại Hữu": "Sự giàu có, sở hữu lớn, hanh thông tuyệt đối nhờ hành xử khiêm tốn.",
        "Địa Lôi Phục": "Sự phục hồi, quay trở lại của sinh khí tốt đẹp. Cơ hội mới đang dần hé mở.",
        "Địa Trạch Lâm": "Sự tiếp cận, giám sát, thời cơ đang đến gần. Hãy hành động tích cực.",
        "Địa Thiên Thái": "Thời kỳ thái bình, hòa hợp, vạn vật sinh sôi nảy nở. Vô cùng cát tường.",
        "Lôi Thiên Đại Tráng": "Sức mạnh to lớn nhưng cần tránh sự nôn nóng, kiêu ngạo kẻo gặp họa tự mãn.",
        "Trạch Thiên Quải": "Quyết tâm loại bỏ cái xấu, giải quyết dứt điểm các vướng mắc cũ.",
        "Thủy Thiên Nhu": "Chờ đợi trong kiên nhẫn và nuôi dưỡng sức mạnh, thời cơ chín muồi sẽ thành công.",
        "Thủy Địa Tỷ": "Sự gắn kết, hợp tác thân thiện, tìm kiếm đồng minh chí hướng.",
        "Lôi Thủy Giải": "Giải tỏa căng thẳng, gỡ bỏ nút thắt khó khăn, tha thứ và bước tiếp.",
        "Lôi Phong Hằng": "Sự bền bỉ, lâu dài, giữ vững nguyên tắc ban đầu trước sóng gió.",
        "Địa Phong Thăng": "Sự thăng tiến bền vững từ thấp lên cao, được quý nhân nâng đỡ.",
        "Thủy Phong Tỉnh": "Giếng nước, sự cống hiến bền bỉ, nguồn lực vô tận nhưng cần bảo dưỡng kỹ càng.",
        "Trạch Phong Đại Quá": "Áp lực quá tải, cột xà bị cong. Cần dũng cảm thay đổi cấu trúc cũ.",
        "Trạch Lôi Tùy": "Thuận theo xu thế, đi theo người có năng lực, thích nghi linh hoạt.",
        "Phong Thiên Tiểu Súc": "Tích lũy nhỏ, gió mây kéo đến nhưng chưa mưa. Cần chờ đợi tích lũy thêm.",
        "Phong Hỏa Gia Nhân": "Tập trung chăm lo gia đình, nội bộ, giữ vững gia đạo hài hòa.",
        "Phong Lôi Ích": "Sự tăng ích, phát triển, mang lại lợi ích cho cộng đồng sẽ tự đắc lợi.",
        "Thiên Lôi Vô Vọng": "Hành động chính trực, không mưu cầu tư lợi quá mức sẽ tránh được thiên tai họa vô đơn chí.",
        "Hỏa Lôi Phệ Hạp": "Cắn đứt cản trở, thực thi pháp luật nghiêm minh để thiết lập trật tự.",
        "Sơn Lôi Di": "Chăm sóc bản thân, ăn uống lành mạnh và chú ý lời ăn tiếng nói.",
        "Sơn Phong Cổ": "Chấn chỉnh tệ nạn cũ, cải tổ các mối quan hệ hoặc công việc đã suy thoái.",
        "Hỏa Sơn Lữ": "Sự lữ hành, bất định, xa nhà. Nên khiêm tốn, tránh gây thù chuốc oán.",
        "Hỏa Phong Đỉnh": "Thiết lập cái mới vững chắc như vạc ba chân, hợp tác cùng phát triển.",
        "Hỏa Thủy Vị Tế": "Sự việc chưa hoàn thành xong, cần cẩn trọng ở những bước cuối cùng.",
        "Sơn Thủy Mông": "Sự non nớt, cần được khai sáng học hỏi, tìm thầy chỉ dạy.",
        "Phong Thủy Hoán": "Sự tan rã nỗi buồn, giải tỏa bất đồng để hướng tới đại đoàn kết.",
        "Phong Sơn Tiệm": "Tiến triển tuần tự từng bước vững chắc như chim hồng bay lên núi cao.",
        "Thiên Thủy Tụng": "Tranh chấp, kiện tụng. Nên tìm phương án hòa giải thay vì cố theo đuổi kiện cáo.",
        "Thiên Hỏa Đồng Nhân": "Đoàn kết rộng rãi, đồng tâm hiệp lực vượt qua khó khăn chung.",
        "Thủy Trạch Tiết": "Sự chừng mực, tiết chế chi tiêu và ham muốn để giữ gìn sự cân bằng.",
        "Thủy Lôi Truân": "Gian nan buổi ban đầu lập nghiệp, cần tìm kiếm sự trợ giúp từ trợ thủ đắc lực.",
        "Thủy Hỏa Ký Tế": "Mọi việc đã hoàn thành tốt đẹp, nhưng cần đề phòng sự suy thoái sau đỉnh cao.",
        "Trạch Hỏa Cách": "Cuộc cách mạng cải cách triệt để, đổi mới tư duy và cách làm việc.",
        "Lôi Hỏa Phong": "Thời kỳ thịnh vượng, phong phú dồi dào nhưng cần giữ tâm sáng suốt đề phòng sa sút.",
        "Địa Hỏa Minh Di": "Mặt trời lặn dưới đất, bóng tối bao trùm. Nên ẩn giấu tài năng, nhẫn nhịn vượt khó.",
        "Địa Thủy Sư": "Binh chúng đông đảo, cần người lãnh đạo kỷ luật và chính trực dẫn dắt.",
        "Sơn Thiên Đại Súc": "Tích lũy tài sản và tri thức lớn, thời cơ thuận lợi để làm việc lớn.",
        "Sơn Trạch Tổn": "Sự giảm bớt cái tôi, chấp nhận hao tổn nhỏ trước mắt để đổi lấy lợi ích lâu dài.",
        "Sơn Hỏa Bí": "Trang sức bên ngoài đẹp đẽ nhưng cần chú trọng thực chất bên trong.",
        "Sơn Phong Cổ": "Cải tổ bộ máy suy thoái, khắc phục sai lầm cũ.",
        "Sơn Thủy Mông": "Sự u tối, cần kiên nhẫn học hỏi tích lũy kiến thức.",
        "Sơn Địa Bác": "Sự suy tàn gặm nhấm dần, hãy giữ tĩnh lặng bảo toàn bản thân.",
        "Địa Trạch Lâm": "Thời cơ chín muồi đang tới gần, hãy chủ động tiếp cận.",
        "Địa Thiên Thái": "Sự hanh thông, âm dương giao hòa cát tường như ý.",
        "Địa Sơn Khiêm": "Sự khiêm tốn, nhường nhịn đem lại lợi ích bền vững, được mọi người kính trọng.",
        "Địa Lôi Phục": "Sự phục hồi trở lại của những điều tốt đẹp sau cơn bão.",
        "Trạch Thủy Khốn": "Sự khốn cùng, bị bao vây cô lập. Lời khuyên: Giữ vững khí tiết, hạn chế hành động.",
        "Trạch Địa Tụy": "Sự tụ họp đông vui, quần tụ quần chúng vì mục đích tốt đẹp.",
        "Trạch Sơn Hàm": "Sự cảm ứng chân thành giữa hai tâm hồn, rất tốt cho tình yêu hôn nhân.",
        "Thủy Sơn Kiển": "Đường đi hiểm trở khó khăn trước mắt, nên dừng lại tìm lối đi khác an toàn hơn.",
        "Lôi Sơn Tiểu Quá": "Hành động nhỏ thì cát, việc lớn không nên làm. Cần khiêm tốn, hạ mình.",
        "Lôi Trạch Quy Muội": "Sự kết hợp vội vã, không đúng trình tự, dễ mang lại kết quả không bền vững."
    };

    let currentStep = 1;
    let coinCasts = [];
    let calendarDetails = null;
    let currentQuestionsData = []; // Lưu câu trả lời của người dùng

    function init() {
        setupEventListeners();
        updateRealTimeClock();
        setInterval(updateRealTimeClock, 1000); // Cập nhật đồng hồ mỗi giây
    }

    function setupEventListeners() {
        const disclaimerCheckbox = document.getElementById("disclaimer-checkbox");
        const proceedBtn = document.getElementById("proceed-btn");

        // Bật/tắt nút Tiếp tục ở màn hình điều khoản
        disclaimerCheckbox.addEventListener("change", function () {
            proceedBtn.disabled = !this.checked;
        });

        // Vào web sau khi đồng ý điều khoản
        proceedBtn.addEventListener("click", function () {
            document.getElementById("disclaimer-screen").classList.add("hidden");
            document.getElementById("main-screen").classList.remove("hidden");
            // Cố định thời gian gieo quẻ ngay tại thời điểm bấm vào web
            setRealTimeInputs();
        });

        // Gửi câu trả lời
        const questionSubmit = document.getElementById("question-submit");
        const questionInput = document.getElementById("question-input");

        questionSubmit.addEventListener("click", function () {
            handleQuestionSubmit();
        });

        questionInput.addEventListener("keypress", function (e) {
            if (e.key === "Enter") {
                handleQuestionSubmit();
            }
        });

        // Nút hoàn tất kết quả
        const finishBtn = document.getElementById("finish-btn");
        finishBtn.addEventListener("click", function () {
            showHexagramResult();
        });

        // Nút tải ảnh
        const downloadBtn = document.getElementById("download-btn");
        downloadBtn.addEventListener("click", function () {
            downloadHexagramImage();
        });
    }

    // Luôn luôn hiển thị giờ Việt Nam cập nhật liên tục cho người dùng
    function updateRealTimeClock() {
        const clockEl = document.getElementById("live-clock");
        if (clockEl) {
            const now = new Date();
            // Định dạng theo chuẩn giờ Việt Nam (GMT+7)
            const options = {
                timeZone: 'Asia/Ho_Chi_Minh',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false
            };
            const timeStr = now.toLocaleTimeString('vi-VN', options);
            clockEl.textContent = timeStr;
        }
    }

    function setRealTimeInputs() {
        const dateTimeInput = document.getElementById("current-date-time");
        const now = new Date();
        
        // Định dạng thời gian cục bộ YYYY-MM-DDTHH:mm tương thích với datetime-local
        const offset = now.getTimezoneOffset() * 60000;
        const localISOTime = (new Date(now - offset)).toISOString().slice(0, 16);
        dateTimeInput.value = localISOTime;

        // Lưu thông tin lịch pháp ngay lúc này
        updateCalendarDetails();
    }

    function updateCalendarDetails() {
        const dateTimeVal = document.getElementById("current-date-time").value;
        const gDate = new Date(dateTimeVal);
        calendarDetails = CALENDAR.getCalendarDetails(gDate);
    }

    // Hàm tạo ngẫu nhiên 3 xu lúc mới vào web
    function randomizeInitialCoins() {
        const coins = [
            document.getElementById("coin-1"),
            document.getElementById("coin-2"),
            document.getElementById("coin-3")
        ];

        coins.forEach(coin => {
            const isYang = Math.random() < 0.5;
            setCoinVisual(coin, isYang);
        });
    }

    // Đặt mặt hiển thị của đồng xu
    // Dương (Yang - mặt 2 chữ): Hiển thị 2 chữ trái/phải
    // Âm (Yin - mặt 1 chữ): Hiển thị 1 chữ ở trên
    function setCoinVisual(coinEl, isYang) {
        const charactersContainer = coinEl.querySelector(".coin-characters");
        if (isYang) {
            // Dương: 2 chữ (mặt 2 chữ)
            charactersContainer.innerHTML = `
                <span class="coin-text ct-left">乾</span>
                <span class="coin-text ct-right">隆</span>
            `;
        } else {
            // Âm: 1 chữ (mặt 1 chữ)
            charactersContainer.innerHTML = `
                <span class="coin-text ct-top">寶</span>
            `;
        }
    }

    // Xử lý khi người dùng nhấn gửi câu trả lời
    function handleQuestionSubmit() {
        const questionInput = document.getElementById("question-input");
        const answerText = questionInput.value.trim();

        if (!answerText) {
            alert("Vui lòng nhập câu trả lời của bạn!");
            return;
        }

        // Lưu câu trả lời
        currentQuestionsData.push({
            question: QUESTIONS[currentStep - 1],
            answer: answerText
        });

        // Khóa giao diện nhập để tung xu
        setFormDisabled(true);

        // Bắt đầu hiệu ứng quay xu
        const coins = [
            document.getElementById("coin-1"),
            document.getElementById("coin-2"),
            document.getElementById("coin-3")
        ];

        coins.forEach(coin => coin.classList.add("spinning"));

        // Sinh ngẫu nhiên thời gian quay từ 3s đến 6s
        const spinDuration = Math.floor(Math.random() * 3000) + 3000;

        // Sinh kết quả quẻ trước
        let coinYangCount = 0;
        let coinOutcomes = [];
        for (let i = 0; i < 3; i++) {
            const isYang = Math.random() < 0.5;
            coinOutcomes.push(isYang);
            if (isYang) coinYangCount++;
        }

        // Xác định hào dựa trên số xu dương gieo được
        // 2 dương 1 âm là âm (8)
        // 2 âm 1 dương là dương (7)
        // 3 dương là dương động (9)
        // 3 âm là âm động (6)
        let haoValue = 7; // Mặc định
        if (coinYangCount === 3) haoValue = 9; // Lão Dương (Dương động)
        else if (coinYangCount === 0) haoValue = 6; // Lão Âm (Âm động)
        else if (coinYangCount === 2) haoValue = 8; // Thiếu Âm (Âm tĩnh)
        else if (coinYangCount === 1) haoValue = 7; // Thiếu Dương (Dương tĩnh)

        setTimeout(function () {
            // Dừng quay xu
            coins.forEach((coin, idx) => {
                coin.classList.remove("spinning");
                // Hiển thị mặt xu thực tế
                setCoinVisual(coin, coinOutcomes[idx]);
            });

            // Ghi nhận hào
            coinCasts.push(haoValue);

            // Chuyển sang bước tiếp theo
            if (currentStep < 6) {
                currentStep++;
                updateQuestionProgressUI();
                questionInput.value = "";
                setFormDisabled(false);
                questionInput.focus();
            } else {
                // Đã gieo xong 6 lần
                showFinishButtonUI();
            }

        }, spinDuration);
    }

    function setFormDisabled(disabled) {
        document.getElementById("question-input").disabled = disabled;
        document.getElementById("question-submit").disabled = disabled;
        document.getElementById("current-date-time").disabled = disabled;
        document.getElementById("topic-select").disabled = disabled;
        document.getElementById("gender-select").disabled = disabled;
    }

    function updateQuestionProgressUI() {
        const questionTextEl = document.getElementById("question-text");
        const progressTextEl = document.getElementById("progress-text");
        const progressFillEl = document.getElementById("progress-fill");

        questionTextEl.textContent = QUESTIONS[currentStep - 1];
        progressTextEl.textContent = `Lần gieo: ${currentStep}/6`;
        progressFillEl.style.width = `${((currentStep - 1) / 6) * 100}%`;
    }

    function showFinishButtonUI() {
        document.getElementById("question-flow-form").classList.add("hidden");
        
        const finishContainer = document.getElementById("finish-container");
        finishContainer.classList.remove("hidden");

        const progressFillEl = document.getElementById("progress-fill");
        progressFillEl.style.width = "100%";
        document.getElementById("progress-text").textContent = "Gieo xu hoàn tất!";
    }

    function showHexagramResult() {
        // Cập nhật lại lịch pháp chính xác trước khi dựng quẻ
        updateCalendarDetails();

        // Xử lý quẻ dịch
        const quereResult = ICHING.processQuere(coinCasts, calendarDetails);

        // Vẽ quẻ lên Canvas ẩn
        const canvas = document.getElementById("hexagram-canvas");
        RENDERER.drawHexagramCard(canvas, quereResult, calendarDetails);

        // Chuyển canvas thành ảnh PNG để hỗ trợ chạm giữ trên mobile
        const imgOutput = document.getElementById("hexagram-img");
        imgOutput.src = canvas.toDataURL("image/png");

        // Ẩn khu vực gieo quẻ, hiện màn hình kết quả
        document.getElementById("casting-stage").classList.add("hidden");
        document.getElementById("result-area").classList.remove("hidden");

        // Hiển thị luận giải cơ bản
        renderBasicInterpretation(quereResult);
    }

    function renderBasicInterpretation(quereResult) {
        const mainName = quereResult.main.name;
        const bienName = quereResult.bien.name;
        const topic = document.getElementById("topic-select").value;

        const mainMeaning = HEX_MEANINGS[mainName] || "Ý nghĩa quẻ chính đang được biên soạn chi tiết.";
        const bienMeaning = HEX_MEANINGS[bienName] || "Ý nghĩa quẻ biến đang được biên soạn chi tiết.";

        let topicInterpret = "";
        if (quereResult.main.isLucXung) {
            topicInterpret += `<p><strong>Đặc điểm quẻ:</strong> Quẻ chính thuộc quẻ <strong>Lục Xung</strong>. Thể hiện sự việc tiến triển nhanh chóng, biến động mạnh mẽ, dễ có xung đột hoặc thay đổi dứt khoát ngay lập tức.</p>`;
        }

        const bodyEl = document.getElementById("interpretation-body");
        bodyEl.innerHTML = `
            <p><strong>Dụng thần chính xác:</strong> Hệ thống tự động xác định chủ đề <strong>${topic}</strong> của bạn.</p>
            
            <h4>Quẻ Bản Thể: ${mainName} (${quereResult.main.palace} - ${quereResult.main.status})</h4>
            <p>${mainMeaning}</p>
            
            <h4>Quẻ Biến Đổi: ${bienName}</h4>
            <p>${bienMeaning}</p>
            
            ${topicInterpret}
            
            <h4>Hướng Dẫn Phân Tích:</h4>
            <p>Thế quẻ đang ngụ tại hào ${quereResult.main.the}, Ứng quẻ tại hào ${quereResult.main.ung}. 
            Các thông tin chi tiết về Sinh, Khắc, Vượng, Suy theo Nguyệt Lệnh (<strong>${calendarDetails.month.chi} - ${CALENDAR.NGU_HANH[calendarDetails.month.chi]}</strong>) 
            và Nhật Thần (<strong>${calendarDetails.day.chi} - ${CALENDAR.NGU_HANH[calendarDetails.day.chi]}</strong>) đã được tính toán đầy đủ trong ảnh thẻ quẻ để bạn tiện tham khảo và lưu trữ.</p>
        `;
    }

    function downloadHexagramImage() {
        const canvas = document.getElementById("hexagram-canvas");
        const image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
        
        const link = document.createElement("a");
        link.download = `que_dich_luc_hao_${calendarDetails.day.can}_${calendarDetails.day.chi}.png`;
        link.href = image;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    return {
        init,
        randomizeInitialCoins
    };

})();

// Khởi chạy ứng dụng khi DOM tải xong
document.addEventListener("DOMContentLoaded", function () {
    APP.init();
    APP.randomizeInitialCoins();
});
