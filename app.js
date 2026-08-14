/**
 * Quản lý hoạt động chính của ứng dụng - app.js
 * (Adapted exactly from gieoque.id.vn logic to ensure 100% correctness)
 */

document.addEventListener('DOMContentLoaded', () => {
    let liveClockTimer = null;

    // -------------------------------------------------------------------------
    // 1. QUẢN LÝ ĐIỀU KHOẢN VÀ ĐỒNG Ý (DISCLAIMER)
    // -------------------------------------------------------------------------
    const disclaimerScreen = document.getElementById('disclaimer-screen');
    const mainScreen = document.getElementById('main-screen');
    const disclaimerCheckbox = document.getElementById('disclaimer-checkbox');
    const proceedBtn = document.getElementById('proceed-btn');

    disclaimerCheckbox.addEventListener('change', () => {
        proceedBtn.disabled = !disclaimerCheckbox.checked;
    });

    // Khởi động đồng hồ live và gán ngày giờ hiện tại ngay lập tức khi tải trang
    const nowInit = new Date();
    nowInit.setMinutes(nowInit.getMinutes() - nowInit.getTimezoneOffset());
    const dateInput = document.getElementById('current-date-time');
    if (dateInput) {
        dateInput.value = nowInit.toISOString().slice(0, 16);
    }
    updateClock();
    liveClockTimer = setInterval(updateClock, 1000);

    proceedBtn.addEventListener('click', () => {
        disclaimerScreen.classList.add('hidden');
        mainScreen.classList.remove('hidden');
        initMainFlow();
    });

    // -------------------------------------------------------------------------
    // 2. KHỞI TẠO LUỒNG CHÍNH VÀ ĐỒNG HỒ
    // -------------------------------------------------------------------------
    function initMainFlow() {
        // Đồng hồ đã được khởi chạy ngay khi tải trang
        // Khởi tạo userAnswers mặc định
        userAnswers = ['', '', '', '', '', ''];
    }

    function updateClock() {
        const liveClockSpan = document.getElementById('live-clock');
        if (!liveClockSpan) return;
        const now = new Date();
        const p = n => n < 10 ? '0' + n : n;
        liveClockSpan.innerHTML = `<span class="live-clock-time">${p(now.getHours())}:${p(now.getMinutes())}:${p(now.getSeconds())}</span> (Ngày ${p(now.getDate())}/${p(now.getMonth() + 1)}/${now.getFullYear()})`;
    }

    // -------------------------------------------------------------------------
    // 3. LUỒNG CÂU HỎI VÀ GIEO QUẺ
    // -------------------------------------------------------------------------
    const TOPIC_QUESTIONS = {
        'công việc': [
            "Câu 1: Bạn đang tìm việc hay đang có công việc?",
            "Câu 2: Công việc của bạn thuộc lĩnh vực gì?",
            "Câu 3: Khó khăn thường gặp của bạn là gì?",
            "Câu 4: Lợi thế của bạn là gì?",
            "Câu 5: Bạn bao nhiêu tuổi?",
            "Câu 6: Mong muốn hiện tại của bạn là gì?"
        ],
        'thi cử': [
            "Câu 1: Hãy chắc chắn bạn đang tĩnh tâm.",
            "Câu 2: Mô tả lợi thế của bạn.",
            "Câu 3: Mô tả khó khăn của bạn.",
            "Câu 4: Mô tả nguyện vọng của bạn.",
            "Câu 5: Mô tả lĩnh vực bạn yêu thích.",
            "Câu 6: Mô tả chi tiết câu hỏi của bạn."
        ],
        'tình yêu': [
            "Câu 1: Bạn đang có người yêu hay đang độc thân?",
            "Câu 2: Bạn sinh năm bao nhiêu?",
            "Câu 3: Bạn từng kết hôn chưa?",
            "Câu 4: Bạn có con chưa?",
            "Câu 5: Rào cản lớn nhất hiện tại là gì?",
            "Câu 6: Mô tả chi tiết câu hỏi và điều bạn muốn biết."
        ],
        'hôn nhân': [
            "Câu 1: Bạn đang muốn kết hôn hay ly hôn?",
            "Câu 2: Bạn sinh năm bao nhiêu?",
            "Câu 3: Hôn phối sinh năm bao nhiêu?",
            "Câu 4: Hai bạn cùng quê hay xa quê?",
            "Câu 5: Điều gì hiện tại khiến bạn trăn trở?",
            "Câu 6: Mô tả chi tiết câu hỏi và điều muốn biết."
        ],
        'sức khỏe': [
            "Câu 1: Mục này là xem vấn đề của bạn, nếu xem cho người thân hãy chọn chủ đề khác tương ứng.",
            "Câu 2: Xác nhận rằng QUẺ chỉ tham khảo, không thay thế quyết định y tế.",
            "Câu 3: Bạn bao nhiêu tuổi? đã đi khám chưa?",
            "Câu 4: Bác sĩ nói tình trạng thế nào?",
            "Câu 5: Mô tả các dấu hiệu sức khỏe của bạn.",
            "Câu 6: Chi tiết câu hỏi và điều muốn biết."
        ],
        'kinh doanh': [
            "Câu 1: Bạn kinh doanh 1 mình hay hợp tác?",
            "Câu 2: Vốn bạn tích lũy hay vay?",
            "Câu 3: Đây là ý tưởng thôi hay đã triển khai?",
            "Câu 4: Bạn kinh doanh online hay cửa hàng?",
            "Câu 5: Bạn kinh doanh sản phẩm gì?",
            "Câu 6: Mô tả chi tiết câu hỏi và điều muốn biết."
        ],
        'dự án': [
            "Câu 1: Bạn đầu tư 1 mình hay hợp tác?",
            "Câu 2: Lĩnh vực cụ thể là gì?",
            "Câu 3: Khó khăn hiện tại là gì?",
            "Câu 4: Lợi thế hiện tại là gì?",
            "Câu 5: Dự án đã triển khai chưa?",
            "Câu 6: Mô tả chi tiết câu hỏi và điều muốn biết."
        ],
        'phong thủy': [
            "Câu 1: Bạn xem nhà hay cửa hàng?",
            "Câu 2: Nhà này của bạn hay thuê lại?",
            "Câu 3: Nhà mặt tiền hay hẻm sâu?",
            "Câu 4: Kiến trúc cao tầng, chung cư hay trệt?",
            "Câu 5: Bạn ở tỉnh/thành nào?",
            "Câu 6: Mô tả chi tiết câu hỏi và điều mong muốn cải thiện."
        ],
        'kiện tụng': [
            "Câu 1: Bạn bị kiện hay bạn chủ động kiện?",
            "Câu 2: Tranh chấp dân sự hay hình sự?",
            "Câu 3: Đã giam giữ hay đang triệu tập?",
            "Câu 4: Bạn có thuê luật sư chưa?",
            "Câu 5: Mô tả chi tiết câu hỏi và điều muốn biết.",
            "Câu 6: QUẺ tham khảo và không thay thế quyết định của tòa bạn nhé."
        ],
        'tìm kiếm': [
            "Câu 1: Người/vật mất bao lâu rồi?",
            "Câu 2: Bạn ở nhà riêng hay ở trọ nơi xa?",
            "Câu 3: Người thất lạc bao nhiêu tuổi/ vật bị mất là gì?",
            "Câu 4: Bạn đã tìm hay đã trình báo chưa?",
            "Câu 5: Mô tả chi tiết tình trạng và mong muốn.",
            "Câu 6: QUẺ chỉ xác định phương hướng và cát hung, không định vị cụ thể."
        ],
        'thai sản': [
            "Câu 1: Bạn đang mang thai hay đang thả bầu?",
            "Câu 2: Bạn đã khám chuyên khoa chưa?",
            "Câu 3: Bạn có bệnh lý nào nghiêm trọng không?",
            "Câu 4: Bạn từng có em bé chưa?",
            "Câu 5: Mô tả chi tiết vấn đề và mong muốn.",
            "Câu 6: QUẺ chỉ tham khảo, không thay thế quyết định y tế."
        ],
        'ông bà cha mẹ': [
            "Câu 1: Người này là vai vế gì với bạn?",
            "Câu 2: Người này bao nhiêu tuổi?",
            "Câu 3: Mô tả tình trạng hiện tại.",
            "Câu 4: Khó khăn hiện tại là gì?",
            "Câu 5: Mô tả chi tiết câu hỏi và mong muốn.",
            "Câu 6: Quẻ chỉ mang tính chất tham khảo, không có giá trị pháp luật hoặc y tế."
        ],
        'con cháu': [
            "Câu 1: Người này là vai vế gì với bạn?",
            "Câu 2: Người này bao nhiêu tuổi?",
            "Câu 3: Mô tả tình trạng hiện tại.",
            "Câu 4: Khó khăn hiện tại là gì?",
            "Câu 5: Mô tả chi tiết câu hỏi và mong muốn.",
            "Câu 6: Quẻ chỉ mang tính chất tham khảo, không có giá trị pháp luật hoặc y tế."
        ],
        'anh em': [
            "Câu 1: Người này là vai vế gì với bạn?",
            "Câu 2: Người này bao nhiêu tuổi?",
            "Câu 3: Mô tả tình trạng hiện tại.",
            "Câu 4: Khó khăn hiện tại là gì?",
            "Câu 5: Mô tả chi tiết câu hỏi và mong muốn.",
            "Câu 6: Quẻ chỉ mang tính chất tham khảo, không có giá trị pháp luật hoặc y tế."
        ],
        'xem thay mặt chồng': [
            "Câu 1: Người này là vai vế gì với bạn?",
            "Câu 2: Người này bao nhiêu tuổi?",
            "Câu 3: Mô tả tình trạng hiện tại.",
            "Câu 4: Khó khăn hiện tại là gì?",
            "Câu 5: Mô tả chi tiết câu hỏi và mong muốn.",
            "Câu 6: Quẻ chỉ mang tính chất tham khảo, không có giá trị pháp luật hoặc y tế."
        ],
        'xem thay mặt vợ': [
            "Câu 1: Người này là vai vế gì với bạn?",
            "Câu 2: Người này bao nhiêu tuổi?",
            "Câu 3: Mô tả tình trạng hiện tại.",
            "Câu 4: Khó khăn hiện tại là gì?",
            "Câu 5: Mô tả chi tiết câu hỏi và mong muốn.",
            "Câu 6: Quẻ chỉ mang tính chất tham khảo, không có giá trị pháp luật hoặc y tế."
        ]
    };

    function getActiveQuestions() {
        const topicSelect = document.getElementById('topic-select');
        const selectedTopic = topicSelect ? topicSelect.value : 'công việc';
        return TOPIC_QUESTIONS[selectedTopic] || TOPIC_QUESTIONS['công việc'];
    }

    // Thiết lập listener reset trạng thái gieo xu trực tuyến khi đổi chủ đề
    document.getElementById('topic-select').addEventListener('change', () => {
        resetTossState();
    });

    function resetTossState() {
        currentStep = 0;
        userAnswers = [];
        hexLines = [];
        const progressText = document.getElementById('progress-text');
        if (progressText) {
            progressText.innerText = `Lần gieo: 0/6`;
        }
        for (let i = 1; i <= 6; i++) {
            const lineDiv = document.getElementById(`progress-line-${i}`);
            if (lineDiv) {
                lineDiv.innerHTML = `Hào ${i}: Đang chờ...`;
                lineDiv.style.color = '#888';
            }
        }
        const tossTriggerBtn = document.getElementById('toss-trigger-btn');
        if (tossTriggerBtn) {
            tossTriggerBtn.style.display = 'block';
            tossTriggerBtn.disabled = false;
            tossTriggerBtn.innerText = "TUNG ĐỒNG XU";
        }
        const finishContainer = document.getElementById('finish-container');
        if (finishContainer) {
            finishContainer.classList.add('hidden');
        }
    }

    // -------------------------------------------------------------------------
    // HÀM & LOGIC CHO TAB TỰ NHẬP 6 HÀO
    // -------------------------------------------------------------------------
    const tabToss = document.getElementById('tab-toss');
    const tabManual = document.getElementById('tab-manual');
    const methodTossArea = document.getElementById('method-toss-area');
    const methodManualArea = document.getElementById('method-manual-area');

    if (tabToss && tabManual) {
        tabToss.addEventListener('click', () => {
            tabToss.style.background = 'var(--gold-dark)';
            tabToss.style.borderColor = 'var(--gold)';
            tabToss.style.color = '#fff';
            tabManual.style.background = 'rgba(0,0,0,0.3)';
            tabManual.style.borderColor = 'rgba(223,177,91,0.2)';
            tabManual.style.color = 'var(--text-muted)';
            
            methodTossArea.classList.remove('hidden');
            methodManualArea.classList.add('hidden');
        });

        tabManual.addEventListener('click', () => {
            tabManual.style.background = 'var(--gold-dark)';
            tabManual.style.borderColor = 'var(--gold)';
            tabManual.style.color = '#fff';
            tabToss.style.background = 'rgba(0,0,0,0.3)';
            tabToss.style.borderColor = 'rgba(223,177,91,0.2)';
            tabToss.style.color = 'var(--text-muted)';
            
            methodManualArea.classList.remove('hidden');
            tabToss.style.background = 'rgba(0,0,0,0.3)';
            methodTossArea.classList.add('hidden');
        });
    }

    const manualSubmitBtn = document.getElementById('manual-submit-btn');
    if (manualSubmitBtn) {
        manualSubmitBtn.addEventListener('click', () => {
            const manualHexLines = [];
            // Lấy 6 hào từ 1 đến 6 (hào 1 dưới cùng, hào 6 trên cùng)
            // Logic:
            // Dương (1) + Không Động -> 1 (Thiếu Dương)
            // Dương (1) + Động -> 3 (Lão Dương)
            // Âm (2) + Không Động -> 2 (Thiếu Âm)
            // Âm (2) + Động -> 0 (Lão Âm)
            for (let i = 1; i <= 6; i++) {
                const lineVal = parseInt(document.getElementById(`manual-hao-${i}`).value);
                const isDong = document.getElementById(`manual-dong-${i}`).checked;
                let finalVal = 1;
                if (lineVal === 1) {
                    finalVal = isDong ? 3 : 1;
                } else if (lineVal === 2) {
                    finalVal = isDong ? 0 : 2;
                }
                manualHexLines.push(finalVal);
            }

            // Gán 6 câu trả lời trống vì người dùng không cần nhập câu hỏi khảo sát ở tab tự nhập
            userAnswers = ['', '', '', '', '', ''];

            // Tắt đếm giờ thực
            if (liveClockTimer) clearInterval(liveClockTimer);

            loadingOverlay.classList.add('visible');

            const dVal = document.getElementById('current-date-time').value;
            const calendarData = CALENDAR.calculateCanChi(dVal);
            const formattedDate = formatDate(dVal);

            // Gọi logic tính quẻ dịch với phương pháp "Nhập hào"
            const hexData = ICHING.calculateHexagramData(manualHexLines, calendarData, "Lục hào (Nhập hào)", formattedDate);

            // Tạo giao diện trong captureTarget
            renderCaptureHTML(hexData);

            // Chờ vẽ và lấy ảnh
            setTimeout(() => {
                const captureArea = document.getElementById('captureArea');
                const target = document.getElementById('captureTarget');

                captureArea.style.position = 'fixed';
                captureArea.style.left = '0';
                captureArea.style.top = '0';
                captureArea.style.zIndex = '-1';
                captureArea.style.opacity = '0.01';

                html2canvas(target, {
                    scale: Math.min(Math.max((window.devicePixelRatio || 2) * 1.5, 2.5), 3),
                    useCORS: true,
                    allowTaint: true,
                    backgroundColor: '#0f0a05',
                    logging: false
                }).then(canvas => {
                    captureArea.style.position = 'absolute';
                    captureArea.style.left = '-9999px';
                    captureArea.style.opacity = '1';

                    const syncDataUrl = canvas.toDataURL('image/png');
                    hexagramImg.src = syncDataUrl;
                    hexagramImg.style.userSelect = 'auto';
                    hexagramImg.style.webkitUserSelect = 'auto';
                    hexagramImg.style.webkitUserDrag = 'auto';
                    hexagramImg.style.webkitTouchCallout = 'default';
                    hexagramImg.style.pointerEvents = 'auto';
                    hexagramImg.style.touchAction = 'auto';

                    try {
                        canvas.toBlob(blob => {
                            if (blob) {
                                hexagramImg.src = URL.createObjectURL(blob);
                            }
                        }, 'image/png');
                    } catch (e) {}

                    // Cập nhật kết luận giải thích
                    displayInterpretation(hexData);

                    // Ẩn khu gieo và hiện khu kết quả
                    castingStage.classList.add('hidden');
                    resultArea.classList.remove('hidden');
                    loadingOverlay.classList.remove('visible');

                    // Cuộn mượt đến đầu kết quả
                    resultArea.scrollIntoView({ behavior: 'smooth' });

                }).catch(err => {
                    console.error(err);
                    loadingOverlay.classList.remove('visible');
                    alert("Có lỗi xảy ra khi tạo thẻ quẻ dịch!");
                });
            }, 300);
        });
    }

    let currentStep = 0;
    let userAnswers = [];
    let hexLines = []; // Lưu 6 hào: 0=Lão Âm, 1=Thiếu Dương, 2=Thiếu Âm, 3=Lão Dương

    const progressText = document.getElementById('progress-text');
    const finishContainer = document.getElementById('finish-container');
    const tossTriggerBtn = document.getElementById('toss-trigger-btn');

    if (tossTriggerBtn) {
        tossTriggerBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (currentStep >= 6) return;

            // Kích hoạt hiệu ứng toàn cảnh sấm sét chớp nháy nhẹ
            const lightningOverlay = document.getElementById('lightning-strike-overlay');
            if (lightningOverlay) {
                lightningOverlay.classList.remove('lightning-flash-active');
                void lightningOverlay.offsetWidth; // Trigger reflow to restart css animation
                lightningOverlay.classList.add('lightning-flash-active');
                
                // Gỡ class sau khi kết thúc animation (1.5 giây)
                setTimeout(() => {
                    lightningOverlay.classList.remove('lightning-flash-active');
                }, 1500);
            }

            // Vô hiệu hoá nút để chờ tung xu
            tossTriggerBtn.disabled = true;
            tossTriggerBtn.innerText = "ĐANG TUNG XU...";

            performCoinToss(() => {
                currentStep++;
                const lastLineVal = hexLines[hexLines.length - 1];
                const lineDiv = document.getElementById(`progress-line-${currentStep}`);

                if (lineDiv) {
                    lineDiv.style.color = '#fff';
                    if (lastLineVal === 1) {
                        lineDiv.innerHTML = `<span style="color: #ebd9c5; font-weight: bold; font-size: 1.1rem;">—</span> <span style="color: #ccc;">(Thiếu Dương)</span>`;
                    } else if (lastLineVal === 2) {
                        lineDiv.innerHTML = `<span style="color: #ebd9c5; font-weight: bold; font-size: 1.1rem;">- -</span> <span style="color: #ccc;">(Thiếu Âm)</span>`;
                    } else if (lastLineVal === 3) {
                        lineDiv.innerHTML = `<span style="color: #e60000; font-weight: bold; font-size: 1.1rem;">— O</span> <span style="color: #ff6666;">(Lão Dương - Động)</span>`;
                    } else if (lastLineVal === 0) {
                        lineDiv.innerHTML = `<span style="color: #e60000; font-weight: bold; font-size: 1.1rem;">- - X</span> <span style="color: #ff6666;">(Lão Âm - Động)</span>`;
                    }
                }

                if (progressText) {
                    progressText.innerText = `Lần gieo: ${currentStep}/6`;
                }

                tossTriggerBtn.disabled = false;
                tossTriggerBtn.innerText = "TUNG ĐỒNG XU";

                if (currentStep === 6) {
                    tossTriggerBtn.style.display = 'none';
                    
                    // Gán userAnswers mặc định cho flow tung xu tự động
                    userAnswers = ['', '', '', '', '', ''];
                    
                    // TỰ ĐỘNG CHUYỂN HẲN SANG QUẺ:
                    // Không cần người dùng bấm thêm nút Hoàn tất nào nữa
                    const autoFinishBtn = document.getElementById('finish-btn');
                    if (autoFinishBtn) {
                        autoFinishBtn.click();
                    }
                }
            });
        });
    }

    // -------------------------------------------------------------------------
    // 4. HIỆU ỨNG TUNG XU
    // -------------------------------------------------------------------------
    const coins = [
        document.getElementById('coin-1'),
        document.getElementById('coin-2'),
        document.getElementById('coin-3')
    ];

    // Hàm reset ngẫu nhiên mặt sấp ngửa của 3 đồng xu lúc khởi tạo hoặc back về
    function randomizeCoinsInitialState() {
        coins.forEach(coin => {
            if (!coin) return;
            const innerEl = coin.querySelector('.coin-inner');
            if (innerEl) {
                const isYang = Math.random() < 0.5;
                innerEl.style.transform = isYang ? 'rotateY(0deg)' : 'rotateY(180deg)';
            }
        });
    }

    // Thực hiện reset ngẫu nhiên ngay khi tải trang
    randomizeCoinsInitialState();

    function performCoinToss(callback) {
        // Tắt nút tung xu của giao diện
        if (tossTriggerBtn) tossTriggerBtn.disabled = true;

        const coinResults = [false, false, false];
        let coinsFinished = 0;

        // Cho mỗi đồng xu quay độc lập với thời gian ngẫu nhiên từ 1 giây đến 2.5 giây (1000ms - 2500ms)
        coins.forEach((coin, idx) => {
            if (!coin) return;

            // Kích hoạt class quay siêu tốc trên .coin-inner (chứa 2 mặt xu)
            const innerEl = coin.querySelector('.coin-inner');
            if (innerEl) {
                innerEl.style.transition = 'none'; // Tắt transition để animation mượt
                innerEl.classList.add('spinning-fast');
            }

            const coinSpinDuration = Math.floor(Math.random() * 1500) + 1000;

            setTimeout(() => {
                // Tắt quay siêu tốc
                if (innerEl) {
                    innerEl.classList.remove('spinning-fast');
                    innerEl.style.transition = 'transform 0.5s ease-in-out'; // Phục hồi transition
                }

                // Quyết định mặt ngửa (true/Dương) hay sấp (false/Âm)
                const isYang = Math.random() < 0.5;
                coinResults[idx] = isYang;

                // Cập nhật góc quay Y tương ứng trên .coin-inner
                if (innerEl) {
                    innerEl.style.transform = isYang ? 'rotateY(0deg)' : 'rotateY(180deg)';
                }

                coinsFinished++;

                // Khi cả 3 đồng xu đã dừng hẳn
                if (coinsFinished === 3) {
                    const yangCount = coinResults.filter(r => r).length;

                    // Tính hào dịch:
                    // 0 Dương (3 Âm): Lão Âm (Âm Động, value = 0)
                    // 1 Dương (2 Âm): Thiếu Dương (Dương Tĩnh, value = 1)
                    // 2 Dương (1 Âm): Thiếu Âm (Âm Tĩnh, value = 2)
                    // 3 Dương (0 Âm): Lão Dương (Dương Động, value = 3)
                    let lineValue;
                    if (yangCount === 0) {
                        lineValue = 0;
                    } else if (yangCount === 1) {
                        lineValue = 1;
                    } else if (yangCount === 2) {
                        lineValue = 2;
                    } else {
                        lineValue = 3;
                    }

                    hexLines.push(lineValue);

                    // Kích hoạt lại nút và chạy callback
                    if (tossTriggerBtn) tossTriggerBtn.disabled = false;
                    if (callback) callback();
                }
            }, coinSpinDuration);
        });
    }

    // -------------------------------------------------------------------------
    // 5. HIỂN THỊ KẾT QUẢ VÀ CHỤP CARD
    // -------------------------------------------------------------------------
    const finishBtn = document.getElementById('finish-btn');
    const castingStage = document.getElementById('casting-stage');
    const resultArea = document.getElementById('result-area');
    const loadingOverlay = document.getElementById('loading-overlay');
    const hexagramImg = document.getElementById('hexagram-img');
    const downloadBtn = document.getElementById('download-btn');

    finishBtn.addEventListener('click', () => {
        try {
            // Tắt đếm giờ thực
            if (liveClockTimer) clearInterval(liveClockTimer);

            loadingOverlay.classList.add('visible');

            const dVal = document.getElementById('current-date-time').value || new Date().toISOString().slice(0, 16);
            const calendarData = CALENDAR.calculateCanChi(dVal);
            const formattedDate = formatDate(dVal);

            // Gọi logic tính quẻ dịch
            const hexData = ICHING.calculateHexagramData(hexLines, calendarData, "Lục hào", formattedDate);

            // Tạo giao diện trong captureTarget
            renderCaptureHTML(hexData);

            // Chờ vẽ và lấy ảnh
            setTimeout(() => {
                const captureArea = document.getElementById('captureArea');
                const target = document.getElementById('captureTarget');

                captureArea.style.position = 'fixed';
                captureArea.style.left = '0';
                captureArea.style.top = '0';
                captureArea.style.zIndex = '-1';
                captureArea.style.opacity = '0.01';

                html2canvas(target, {
                    scale: Math.min(Math.max((window.devicePixelRatio || 2) * 1.5, 2.5), 3),
                    useCORS: true,
                    allowTaint: true,
                    backgroundColor: '#0f0a05',
                    logging: false
                }).then(canvas => {
                    captureArea.style.position = 'absolute';
                    captureArea.style.left = '-9999px';
                    captureArea.style.opacity = '1';

                    const syncDataUrl = canvas.toDataURL('image/png');
                    hexagramImg.src = syncDataUrl;
                    hexagramImg.style.userSelect = 'auto';
                    hexagramImg.style.webkitUserSelect = 'auto';
                    hexagramImg.style.webkitUserDrag = 'auto';
                    hexagramImg.style.webkitTouchCallout = 'default';
                    hexagramImg.style.pointerEvents = 'auto';
                    hexagramImg.style.touchAction = 'auto';

                    try {
                        canvas.toBlob(blob => {
                            if (blob) {
                                hexagramImg.src = URL.createObjectURL(blob);
                            }
                        }, 'image/png');
                    } catch (e) {}

                    // Cập nhật kết luận giải thích
                    displayInterpretation(hexData);

                    // Ẩn khu gieo và hiện khu kết quả
                    castingStage.classList.add('hidden');
                    resultArea.classList.remove('hidden');
                    loadingOverlay.classList.remove('visible');

                    // Cuộn mượt đến đầu kết quả
                    resultArea.scrollIntoView({ behavior: 'smooth' });

                }).catch(err => {
                    console.error(err);
                    loadingOverlay.classList.remove('visible');
                    alert("Có lỗi xảy ra khi tạo thẻ quẻ dịch: " + (err.message || err));
                });
            }, 300);
        } catch (err) {
            console.error("Lỗi lập quẻ dịch:", err);
            loadingOverlay.classList.remove('visible');
            alert("Có lỗi xảy ra khi tính toán bản đồ quẻ dịch! Vui lòng thử lại.");
        }
    });

    // Thêm sự kiện quay lại sửa đổi hào mà không mất dữ liệu đã nhập
    const backToCastBtn = document.getElementById('back-to-cast-btn');
    if (backToCastBtn) {
        backToCastBtn.addEventListener('click', () => {
            resultArea.classList.add('hidden');
            castingStage.classList.remove('hidden');
            castingStage.scrollIntoView({ behavior: 'smooth' });
            
            // Reset toàn bộ trạng thái gieo quẻ để cho phép gieo lại
            resetTossState();
            
            // Xáo trộn ngẫu nhiên mặt đồng xu khi quay lại
            randomizeCoinsInitialState();
            
            // Khởi động lại đồng hồ thời gian thực
            clearInterval(liveClockTimer);
            liveClockTimer = setInterval(updateClock, 1000);
        });
    }

    // Định dạng ngày giờ hiển thị
    function formatDate(isoStr) {
        if (!isoStr) return "";
        const d = new Date(isoStr);
        const p = n => n < 10 ? '0' + n : n;
        return `${p(d.getDate())}/${p(d.getMonth() + 1)}/${d.getFullYear()} - ${p(d.getHours())}:${p(d.getMinutes())}`;
    }

    // -------------------------------------------------------------------------
    // 6. TẠO HTML ĐỂ CHỤP ẢNH (EXPORT CARD RENDERING)
    // -------------------------------------------------------------------------
    function renderHexVisual(lines, isChanged) {
        const bits = lines.map(v => ICHING.getBit(v, isChanged));
        let html = '';
        for (let i = 5; i >= 0; i--) {
            const isMoving = (lines[i] === 0 || lines[i] === 3);
            const moveClass = isMoving ? 'moving' : '';
            html += `<div class="gua-line ${bits[i] === '1' ? 'yang' : 'yin'} ${moveClass}"></div>`;
        }
        return `<div class="gua-container">${html}</div>`;
    }

    function getAbbreviatedCan(can) {
        if (!can) return '';
        const map = {
            'Giáp': 'G.',
            'Ất': 'Ấ.',
            'Bính': 'B.',
            'Đinh': 'Đ.',
            'Mậu': 'M.',
            'Kỷ': 'K.',
            'Canh': 'C.',
            'Tân': 'T.',
            'Nhâm': 'N.',
            'Quý': 'Q.'
        };
        return map[can] || can[0] + '.';
    }

    function renderCaptureHTML(data) {
        const {
            mainName, changedName, palaceName,
            mainAttr, changedPalaceName, changedAttr,
            linesData, shensha, dateInfo, methodText, lines
        } = data;

        let rowsHtml = '';
        // Hiển thị từ hào 6 xuống hào 1
        for (let i = 5; i >= 0; i--) {
            const line = linesData[i];
            const rowClass = line.isMoving ? 'row-moving' : 'row-static';
            const sym = (line.val === 1) ? '—' : (line.val === 2) ? '--' : (line.val === 3) ? 'O' : 'X';

            let marker = '';
            if (line.isShi) marker = `<span class="marker-the">Thế</span>`;
            if (line.isYing) marker = `<span class="marker-ung">Ứng</span>`;

            let phucHtml = '-';
            if (line.phucThan) {
                const canAbbr = getAbbreviatedCan(line.phucThan.can);
                if (line.phucThan.isActive) {
                    phucHtml = `<span class="phuc-than active-phuc"><span class="phuc-rel">${line.phucThan.rel}</span> - <span class="tian-can-abbr">${canAbbr}</span>${line.phucThan.branch}</span>`;
                } else {
                    phucHtml = `<span class="phuc-than inactive-phuc"><span class="phuc-rel">${line.phucThan.rel}</span> - <span class="tian-can-abbr">${canAbbr}</span>${line.phucThan.branch}</span>`;
                }
            }

            const isTK = line.isTK ? 'K' : '-';
            const isCTK = line.isCTK ? 'K' : '-';

            rowsHtml += `
            <tr class="${rowClass}">
                <td>${sym}</td>
                <td>${marker}</td>
                <td>${line.relation}</td>
                <td><span class="tian-can-abbr">${getAbbreviatedCan(line.can)}</span>${line.chi}</td>
                <td>${phucHtml}</td>
                <td>${isTK}</td>
                <td class="sep-col">${line.changed.relation}</td>
                <td><span class="tian-can-abbr">${getAbbreviatedCan(line.changed.can)}</span>${line.changed.branch}</td>
                <td>${line.lucThu}</td>
                <td>${isCTK}</td>
            </tr>`;
        }

        const target = document.getElementById('captureTarget');
        target.style.position = 'relative'; // Bảo đảm layout relative cho seal-stamp định vị tuyệt đối
        target.innerHTML = `
            <img src="/seal_stamp.jpg" alt="Ấn Nguyễn Huy Hoàng" class="seal-stamp-capture" />
            <div class="info-header">
                <div class="info-content">
                    <div class="info-line"><strong>Ngày gieo:</strong> <span>${data.formattedDate}</span></div>
                    <div class="info-line"><strong>Ngày âm:</strong> <span>${dateInfo.fullCanChi}</span></div>
                    <div class="info-line"><strong>Tâm niệm:</strong> <span>${dateInfo.haoTamText || 'Không'}</span> &nbsp;&nbsp;&nbsp;&nbsp; <strong>Tuần Không:</strong> <span class="highlight">${dateInfo.tuanKhong}</span></div>
                    <div class="info-line"><strong>Nhật Thần:</strong> <span class="highlight">${dateInfo.nhatThan}</span> &nbsp;&nbsp;&nbsp;&nbsp; <strong>Nguyệt Lệnh:</strong> <span class="highlight">${dateInfo.nguyetLenh}</span></div>
                </div>
            </div>
            
            <div class="hex-visual-section">
                <div class="hex-box">
                    <div class="hex-title">${mainName}</div>
                    ${renderHexVisual(lines, false)}
                    <div class="hex-family">Họ ${palaceName}${mainAttr ? ' - ' + mainAttr : ''}</div>
                </div>
                
                <div class="hex-ngam-indicator">
                    ${data.ngamResult.length > 0 ? data.ngamResult.map(t => `<span>${t}</span>`).join('') : ''}
                </div>

                <div class="hex-box">
                    <div class="hex-title">${changedName}</div>
                    ${renderHexVisual(lines, true)}
                    <div class="hex-family">Họ ${changedPalaceName}${changedAttr ? ' - ' + changedAttr : ''}</div>
                </div>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>Hào</th>
                        <th>T/Ư</th>
                        <th>Lục Thân</th>
                        <th>Can Chi</th>
                        <th>P.Thần</th>
                        <th>TK</th>
                        <th class="sep-col">Lục Thân</th>
                        <th>Can Chi</th>
                        <th>Lục Thú</th>
                        <th>TK</th>
                    </tr>
                </thead>
                <tbody>${rowsHtml}</tbody>
            </table>
            
            <div class="shensha-section">
                <div class="shensha-title">Thần Sát</div>
                <div class="shensha-grid">
                    ${(() => {
                        const movingBranches = linesData.filter(l => l.isMoving).flatMap(l => [l.chi, l.changed.branch]);
                        return shensha.map(s => {
                            let parts = s.split('</strong> ');
                            if (parts.length > 1) {
                                let values = parts[1];
                                let hasMoving = false;
                                movingBranches.forEach(b => {
                                    if (values.includes(b)) hasMoving = true;
                                    values = values.split(b).join(`<span style="color: red; font-weight: bold;">${b}</span>`);
                                });
                                let title = parts[0];
                                if (hasMoving) {
                                    title = title.replace('<strong>', '<strong style="color: red;">');
                                }
                                return `<div class="ss-item">${title}</strong> ${values}</div>`;
                            }
                            return `<div class="ss-item">${s}</div>`;
                        }).join('');
                    })()}
                </div>
            </div>
            
            <div class="watermark" style="text-align: right; margin-top: 15px; font-size: 13px; font-weight: 500; color: #876121; line-height: 1.5; font-family: var(--font-serif);">
                Liên hệ luận giải:<br>
                Zalo : 0933116860 (Hoàng)
            </div>
        `;
    }

    // -------------------------------------------------------------------------
    // 7. HIỂN THỊ LUẬN GIẢI QUẺ DỊCH
    // -------------------------------------------------------------------------
    function displayInterpretation(data) {
        // Nội dung luận đoán tự động đã được thay thế hoàn toàn bằng thông tin hướng dẫn liên hệ luận giải tĩnh trong index.html
    }

    // -------------------------------------------------------------------------
    // 8. TẢI ẢNH VỀ MÁY
    // -------------------------------------------------------------------------
    function isZaloOrFbBrowser() {
        const ua = navigator.userAgent || navigator.vendor || window.opera || "";
        return /Zalo|FBAN|FBAV|Messenger/i.test(ua);
    }

    function openInExternalBrowser() {
        const currentUrl = window.location.href.replace(/^https?:\/\//, '');
        const isAndroid = /Android/i.test(navigator.userAgent);
        
        if (isAndroid) {
            // Android Chrome Intent URL (Mở thẳng Google Chrome từ Zalo)
            window.location.href = 'intent://' + currentUrl + '#Intent;scheme=https;package=com.android.chrome;end;';
        } else {
            // iOS Safari Guidance / Clipboard
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(window.location.href);
                alert("✅ Đã sao chép link web!\n\nHãy mở ứng dụng SAFARI trên iPhone, dán link vào thanh địa chỉ để tải ảnh tự động.");
            } else {
                alert("Hãy bấm nút [...] ở góc trên bên phải màn hình Zalo, chọn 'Mở bằng Safari' để tải ảnh.");
            }
        }
    }

    async function handleZaloDownload(imgData) {
        // 1. Thử dùng Web Share API (Phương thức mạnh nhất để nạp menu Lưu vào Ảnh trên mobile)
        try {
            const res = await fetch(imgData);
            const blob = await res.blob();
            const file = new File([blob], `que_luc_hao_${Date.now()}.png`, { type: 'image/png' });

            if (navigator.canShare && navigator.canShare({ files: [file] })) {
                await navigator.share({
                    files: [file],
                    title: 'Ảnh Quẻ Lục Hào HD',
                    text: 'Dịch Sư Nguyễn Huy Hoàng — Zalo: 0933116860'
                });
                return;
            }
        } catch (e) {
            console.log("Web Share API error:", e);
        }

        // 2. Fallback Modal với Nút Chuyển Mở Trình Duyệt Chrome/Safari (Option 1)
        showZaloImageModal(imgData);
    }

    function showZaloImageModal(imgData) {
        let modal = document.getElementById('zalo-img-modal');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'zalo-img-modal';
            modal.style.cssText = 'position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(5, 7, 17, 0.96); z-index: 99999; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 15px; box-sizing: border-box; backdrop-filter: blur(8px);';
            document.body.appendChild(modal);
        }

        modal.innerHTML = `
            <div style="width: 100%; max-width: 520px; text-align: center; position: relative; background: #0f0a05; border: 2px solid var(--gold); border-radius: 12px; padding: 20px 15px; box-sizing: border-box;">
                <button id="close-zalo-modal" style="position: absolute; top: 10px; right: 10px; background: #e74c3c; color: #fff; border: none; padding: 6px 14px; border-radius: 20px; font-weight: bold; font-size: 0.85rem; cursor: pointer; box-shadow: 0 2px 10px rgba(0,0,0,0.5);">✕ ĐÓNG</button>
                <h4 style="color: var(--gold); margin: 0 0 12px 0; font-family: var(--font-ancient); font-size: 1.05rem; border-bottom: 1px dashed rgba(223, 177, 91, 0.3); padding-bottom: 8px;">📍 CẢNH BÁO TRÌNH DUYỆT</h4>
                
                <div style="background: rgba(231, 76, 60, 0.15); border: 1.5px solid #e74c3c; border-radius: 8px; padding: 12px; margin-bottom: 12px; color: #ff6b6b; font-weight: bold; font-size: 0.95rem; line-height: 1.5;">
                    ⚠️ Trình duyệt này chặn tải ảnh, hãy zoom quẻ vừa màn hình rồi chụp lại.
                </div>

                <div style="width: 100%; max-height: 50vh; overflow-y: auto; border-radius: 8px; border: 1px solid var(--gold); box-shadow: 0 8px 30px rgba(0,0,0,0.8);">
                    <img src="${imgData}" alt="Ảnh Quẻ Dịch" style="width: 100%; height: auto; display: block; pointer-events: auto !important; user-select: none !important; -webkit-user-select: none !important; -webkit-touch-callout: default !important; touch-action: manipulation !important;" />
                </div>
            </div>
        `;

        modal.style.display = 'flex';
        document.getElementById('close-zalo-modal').onclick = function() {
            modal.style.display = 'none';
        };
    }

    downloadBtn.addEventListener('click', function() {
        const imgData = hexagramImg.src;
        if (!imgData) {
            alert("Không tìm thấy ảnh quẻ dịch!");
            return;
        }

        if (isZaloOrFbBrowser()) {
            handleZaloDownload(imgData);
        } else {
            const link = document.createElement('a');
            link.download = 'que_luc_hao_' + new Date().getTime() + '.png';
            link.href = imgData;
            link.style.display = 'none';
            document.body.appendChild(link);
            link.click();
            setTimeout(function() {
                if (document.body.contains(link)) {
                    document.body.removeChild(link);
                }
            }, 100);
        }
    });

    if (isZaloOrFbBrowser()) {
        const downloadTip = document.querySelector('.download-tip');
        if (downloadTip) {
            downloadTip.innerHTML = '<span style="color: #ff6b6b; font-weight: bold; font-size: 0.95rem;">⚠️ Trình duyệt này chặn tải ảnh, hãy zoom quẻ vừa màn hình rồi chụp lại.</span>';
        }
    }
});
