/**
 * Quản lý hoạt động chính của ứng dụng - app.js
 * (Adapted exactly from gieoque.id.vn logic to ensure 100% correctness)
 */

document.addEventListener('DOMContentLoaded', () => {
    let liveClockTimer = null;
    let currentStep = 0;
    let userAnswers = ['', '', '', '', '', ''];
    let hexLines = []; // Lưu 6 hào: 0=Lão Âm, 1=Thiếu Dương, 2=Thiếu Âm, 3=Lão Dương

    // -------------------------------------------------------------------------
    // 1. QUẢN LÝ ĐIỀU KHOẢN VÀ ĐỒNG Ý (DISCLAIMER)
    // -------------------------------------------------------------------------
    const disclaimerScreen = document.getElementById('disclaimer-screen');
    const mainScreen = document.getElementById('main-screen');
    const disclaimerCheckbox = document.getElementById('disclaimer-checkbox');
    const proceedBtn = document.getElementById('proceed-btn');
    const castingStage = document.getElementById('casting-stage');
    const resultArea = document.getElementById('result-area');
    const loadingOverlay = document.getElementById('loading-overlay');
    const hexagramImg = document.getElementById('hexagram-img');
    const downloadBtn = document.getElementById('download-btn');

    if (disclaimerCheckbox && proceedBtn) {
        disclaimerCheckbox.addEventListener('change', () => {
            proceedBtn.disabled = !disclaimerCheckbox.checked;
        });
    }

    // Khởi động đồng hồ live và gán ngày giờ hiện tại ngay lập tức khi tải trang
    const nowInit = new Date();
    nowInit.setMinutes(nowInit.getMinutes() - nowInit.getTimezoneOffset());
    const dateInput = document.getElementById('current-date-time');
    if (dateInput) {
        dateInput.value = nowInit.toISOString().slice(0, 16);
    }
    updateClock();
    liveClockTimer = setInterval(updateClock, 1000);
    initMainFlow();

    if (proceedBtn) {
        proceedBtn.addEventListener('click', () => {
            if (disclaimerScreen) disclaimerScreen.classList.add('hidden');
            if (mainScreen) mainScreen.classList.remove('hidden');
            initMainFlow();
        });
    }

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

    const topicSelectEl = document.getElementById('topic-select');
    if (topicSelectEl) {
        topicSelectEl.addEventListener('change', () => {
            resetTossState();
        });
    }

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
    // HÀM & LOGIC CHO CÁC PHƯƠNG THỨC LẬP QUẺ (TUNG XU / TỰ NHẬP HÀO / NHẬP SỐ)
    // -------------------------------------------------------------------------
    const tabToss = document.getElementById('tab-toss');
    const tabManual = document.getElementById('tab-manual');
    const tabNumber = document.getElementById('tab-number');
    const tabIntent = document.getElementById('tab-intent');
    const methodTossArea = document.getElementById('method-toss-area');
    const methodManualArea = document.getElementById('method-manual-area');
    const methodNumberArea = document.getElementById('method-number-area');
    const methodIntentArea = document.getElementById('method-intent-area');

    function switchMethodTab(activeTab) {
        const tabTossEl = document.getElementById('tab-toss');
        const tabManualEl = document.getElementById('tab-manual');
        const tabNumberEl = document.getElementById('tab-number');
        const tabIntentEl = document.getElementById('tab-intent');
        const methodTossAreaEl = document.getElementById('method-toss-area');
        const methodManualAreaEl = document.getElementById('method-manual-area');
        const methodNumberAreaEl = document.getElementById('method-number-area');
        const methodIntentAreaEl = document.getElementById('method-intent-area');

        const tabs = [
            { el: tabTossEl, id: 'toss' },
            { el: tabManualEl, id: 'manual' },
            { el: tabNumberEl, id: 'number' },
            { el: tabIntentEl, id: 'intent' }
        ];

        tabs.forEach(t => {
            if (t.el) {
                t.el.classList.toggle('active-tab-btn', t.id === activeTab);
                t.el.classList.toggle('active', t.id === activeTab);
                // Clear any inline overrides
                t.el.style.background = '';
                t.el.style.borderColor = '';
                t.el.style.color = '';
                t.el.style.fontWeight = '';
                t.el.style.boxShadow = '';
            }
        });

        if (methodTossAreaEl) {
            methodTossAreaEl.classList.toggle('hidden', activeTab !== 'toss');
            methodTossAreaEl.style.display = (activeTab === 'toss') ? 'block' : 'none';
        }
        if (methodManualAreaEl) {
            methodManualAreaEl.classList.toggle('hidden', activeTab !== 'manual');
            methodManualAreaEl.style.display = (activeTab === 'manual') ? 'block' : 'none';
        }
        if (methodNumberAreaEl) {
            methodNumberAreaEl.classList.toggle('hidden', activeTab !== 'number');
            methodNumberAreaEl.style.display = (activeTab === 'number') ? 'block' : 'none';
        }
        if (methodIntentAreaEl) {
            methodIntentAreaEl.classList.toggle('hidden', activeTab !== 'intent');
            methodIntentAreaEl.style.display = (activeTab === 'intent') ? 'block' : 'none';
        }

        if (activeTab === 'number') {
            const numInput = document.getElementById('number-input');
            if (numInput) setTimeout(() => numInput.focus(), 100);
        } else if (activeTab === 'intent') {
            const intentInput = document.getElementById('intent-input');
            if (intentInput) setTimeout(() => intentInput.focus(), 100);
        }
    }
    window.switchMethodTab = switchMethodTab;

    if (tabToss) tabToss.addEventListener('click', (e) => { e.preventDefault(); switchMethodTab('toss'); });
    if (tabManual) tabManual.addEventListener('click', (e) => { e.preventDefault(); switchMethodTab('manual'); });
    if (tabNumber) tabNumber.addEventListener('click', (e) => { e.preventDefault(); switchMethodTab('number'); });
    if (tabIntent) tabIntent.addEventListener('click', (e) => { e.preventDefault(); switchMethodTab('intent'); });

    // -------------------------------------------------------------------------
    // BẢNG TIÊN THIÊN BÁT QUÁI & THUẬT TOÁN LẬP QUẺ BẰNG SỐ
    // -------------------------------------------------------------------------
    const TIEN_THIEN_BAT_QUAI = {
        1: { name: 'Càn', bin: [1, 1, 1] }, // [hào 1, hào 2, hào 3]
        2: { name: 'Đoài', bin: [1, 1, 0] },
        3: { name: 'Ly', bin: [1, 0, 1] },
        4: { name: 'Chấn', bin: [1, 0, 0] },
        5: { name: 'Tốn', bin: [0, 1, 1] },
        6: { name: 'Khảm', bin: [0, 1, 0] },
        7: { name: 'Cấn', bin: [0, 0, 1] },
        8: { name: 'Khôn', bin: [0, 0, 0] }
    };

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

    const TIEN_THIEN_TO_QUAI_IDX = { 8: 0, 7: 1, 6: 2, 5: 3, 4: 4, 3: 5, 2: 6, 1: 7 };
    const BIN_TO_TIEN_THIEN = { '111': 1, '110': 2, '101': 3, '100': 4, '011': 5, '010': 6, '001': 7, '000': 8 };

    function getHexagramPairNames(thuongNum, haNum, haoDong) {
        const tIdx = TIEN_THIEN_TO_QUAI_IDX[thuongNum];
        const hIdx = TIEN_THIEN_TO_QUAI_IDX[haNum];
        const mainHexName = (TEN_QUE_MATRIX[tIdx] && TEN_QUE_MATRIX[tIdx][hIdx]) ? TEN_QUE_MATRIX[tIdx][hIdx] : '';

        const tQuai = TIEN_THIEN_BAT_QUAI[thuongNum];
        const hQuai = TIEN_THIEN_BAT_QUAI[haNum];
        if (!tQuai || !hQuai) return { mainHexName, changedHexName: '' };

        const raw6 = [
            hQuai.bin[0], hQuai.bin[1], hQuai.bin[2],
            tQuai.bin[0], tQuai.bin[1], tQuai.bin[2]
        ];
        
        const changed6 = [...raw6];
        if (haoDong >= 1 && haoDong <= 6) {
            changed6[haoDong - 1] = (changed6[haoDong - 1] === 1) ? 0 : 1;
        }

        const changedHaBin = '' + changed6[0] + changed6[1] + changed6[2];
        const changedThuongBin = '' + changed6[3] + changed6[4] + changed6[5];

        const changedHaNum = BIN_TO_TIEN_THIEN[changedHaBin];
        const changedThuongNum = BIN_TO_TIEN_THIEN[changedThuongBin];

        const ctIdx = TIEN_THIEN_TO_QUAI_IDX[changedThuongNum];
        const chIdx = TIEN_THIEN_TO_QUAI_IDX[changedHaNum];
        const changedHexName = (TEN_QUE_MATRIX[ctIdx] && TEN_QUE_MATRIX[ctIdx][chIdx]) ? TEN_QUE_MATRIX[ctIdx][chIdx] : '';

        return { mainHexName, changedHexName };
    }

    function parseNumberHexagram(rawInput) {
        if (!rawInput || typeof rawInput !== 'string') return { success: false, error: 'Vui lòng nhập dãy số' };
        const trimmed = rawInput.trim();
        if (!trimmed) return { success: false, error: 'Vui lòng nhập dãy số' };

        let thuongQuai = 1;
        let haQuai = 1;
        let haoDong = 1;
        let explain = '';

        // Trường hợp 1: Nhập theo cặp số có khoảng cách (ví dụ '20 30', '12 34', '123 456')
        const spaceParts = trimmed.split(/[\s,]+/).filter(p => p.length > 0);
        if (spaceParts.length === 2 && /^\d+$/.test(spaceParts[0]) && /^\d+$/.test(spaceParts[1])) {
            const p1 = parseInt(spaceParts[0], 10);
            const p2 = parseInt(spaceParts[1], 10);
            
            let t = p1 % 8;
            if (t === 0) t = 8;
            let h = p2 % 8;
            if (h === 0) h = 8;
            
            let d = (p1 + p2) % 6;
            if (d === 0) d = 6;
            
            thuongQuai = t;
            haQuai = h;
            haoDong = d;
            explain = `Cặp số cách nhau (${p1} & ${p2}): Thượng quái = ${p1} % 8 = ${t} (${TIEN_THIEN_BAT_QUAI[t].name}), Hạ quái = ${p2} % 8 = ${h} (${TIEN_THIEN_BAT_QUAI[h].name}), Hào động = (${p1}+${p2}) % 6 = ${d} (Động Hào ${d})`;
        } else {
            const clean = trimmed.replace(/\D/g, '');
            if (clean.length < 2) {
                return { success: false, error: 'Dãy số cần có ít nhất 2 chữ số' };
            }
            const len = clean.length;

            // Trường hợp 2: Dãy 2 chữ số (ví dụ '00', '12', '46', '99')
            if (len === 2) {
                let r1 = parseInt(clean[0], 10);
                let r2 = parseInt(clean[1], 10);
                let n1 = (r1 % 8 === 0) ? 8 : (r1 % 8);
                let n2 = (r2 % 8 === 0) ? 8 : (r2 % 8);
                
                let sum = r1 + r2;
                let d = sum % 6;
                if (d === 0) d = 6;

                thuongQuai = n1;
                haQuai = n2;
                haoDong = d;
                explain = `Dãy 2 chữ số (${clean}): Số 1 = ${r1} ➔ ${n1} (${TIEN_THIEN_BAT_QUAI[n1].name}), Số 2 = ${r2} ➔ ${n2} (${TIEN_THIEN_BAT_QUAI[n2].name}), Hào động = (${r1}+${r2}) = ${sum} % 6 ➔ Động Hào ${d}`;
            }
            // Trường hợp 3: Dãy 3 chữ số (ví dụ '357', '888', '000')
            else if (len === 3) {
                let r1 = parseInt(clean[0], 10);
                let r2 = parseInt(clean[1], 10);
                let r3 = parseInt(clean[2], 10);
                let n1 = (r1 % 8 === 0) ? 8 : (r1 % 8);
                let n2 = (r2 % 8 === 0) ? 8 : (r2 % 8);

                let d = r3 % 6;
                if (d === 0) d = 6;

                thuongQuai = n1;
                haQuai = n2;
                haoDong = d;
                explain = `Dãy 3 chữ số (${clean}): Số 1 = ${r1} ➔ ${n1} (${TIEN_THIEN_BAT_QUAI[n1].name}), Số 2 = ${r2} ➔ ${n2} (${TIEN_THIEN_BAT_QUAI[n2].name}), Số 3 = ${r3} % 6 ➔ Động Hào ${d}`;
            }
            // Trường hợp 4 & 5: Dãy số >= 4 chữ số (chẵn hoặc lẻ)
            else {
                const isEven = (len % 2 === 0);
                const half1Len = isEven ? (len / 2) : Math.floor(len / 2);
                const s1Str = clean.slice(0, half1Len);
                const s2Str = clean.slice(half1Len);
                
                let sum1 = s1Str.split('').reduce((acc, c) => acc + parseInt(c, 10), 0);
                let sum2 = s2Str.split('').reduce((acc, c) => acc + parseInt(c, 10), 0);
                
                let t = (sum1 % 8 === 0) ? 8 : (sum1 % 8);
                let h = (sum2 % 8 === 0) ? 8 : (sum2 % 8);
                
                // Hào động: Tổng tất cả các chữ số trong dãy chia 6 lấy dư (dư 0 lấy 6)
                let totalAllDigits = sum1 + sum2;
                let d = totalAllDigits % 6;
                if (d === 0) d = 6;
                
                thuongQuai = t;
                haQuai = h;
                haoDong = d;
                explain = `Dãy ${len} số (${clean}): Nửa đầu ${s1Str} (tổng ${sum1} ➔ ${t} ${TIEN_THIEN_BAT_QUAI[t].name}), Nửa sau ${s2Str} (tổng ${sum2} ➔ ${h} ${TIEN_THIEN_BAT_QUAI[h].name}), Hào động = Tổng ${totalAllDigits} % 6 ➔ Động Hào ${d}`;
            }
        }

        // Ghép 6 hào: Hào 1..3 từ Hạ Quái, Hào 4..6 từ Thượng Quái
        const tQuai = TIEN_THIEN_BAT_QUAI[thuongQuai];
        const hQuai = TIEN_THIEN_BAT_QUAI[haQuai];
        const raw6 = [
            hQuai.bin[0], hQuai.bin[1], hQuai.bin[2],
            tQuai.bin[0], tQuai.bin[1], tQuai.bin[2]
        ];

        // Ánh xạ sang giá trị hào Lục Hào:
        // 1 = Thiếu Dương (Dương tĩnh), 2 = Thiếu Âm (Âm tĩnh)
        // 3 = Lão Dương (Dương động biến Âm), 0 = Lão Âm (Âm động biến Dương)
        const hexLines = raw6.map((val, idx) => {
            const lineNum = idx + 1;
            const isDong = (lineNum === haoDong);
            if (val === 1) return isDong ? 3 : 1;
            return isDong ? 0 : 2;
        });

        return {
            success: true,
            thuongQuai,
            thuongName: tQuai.name,
            haQuai,
            haName: hQuai.name,
            haoDong,
            hexLines,
            explain
        };
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

    // -------------------------------------------------------------------------
    // SỰ KIỆN XEM TRƯỚC VÀ LẬP QUẺ CHO TAB NHẬP SỐ (MAI HOA DỊCH SỐ)
    // -------------------------------------------------------------------------
    const numberInput = document.getElementById('number-input');
    const numberPreviewBox = document.getElementById('number-preview-box');
    const npThuong = document.getElementById('np-thuong');
    const npHa = document.getElementById('np-ha');
    const npDong = document.getElementById('np-dong');
    const npResultName = document.getElementById('np-result-name');
    const npExplain = document.getElementById('np-explain');
    const numberSubmitBtn = document.getElementById('number-submit-btn');

    if (numberInput) {
        numberInput.addEventListener('input', () => {
            const val = numberInput.value;
            const res = parseNumberHexagram(val);
            if (res.success) {
                const hexNames = getHexagramPairNames(res.thuongQuai, res.haQuai, res.haoDong);
                if (numberPreviewBox) numberPreviewBox.style.display = 'block';
                if (npThuong) npThuong.innerHTML = `${res.thuongName} (${res.thuongQuai})`;
                if (npHa) npHa.innerHTML = `${res.haName} (${res.haQuai})`;
                if (npDong) npDong.innerHTML = `Hào ${res.haoDong}`;
                if (npResultName) {
                    npResultName.innerHTML = `Quẻ Chủ: <span style="color: #fff;">${hexNames.mainHexName}</span> &nbsp;➔&nbsp; Biến: <span style="color: #ffd700;">${hexNames.changedHexName}</span>`;
                }
            } else {
                if (val.trim().length > 0) {
                    if (numberPreviewBox) numberPreviewBox.style.display = 'block';
                    if (npThuong) npThuong.innerHTML = '--';
                    if (npHa) npHa.innerHTML = '--';
                    if (npDong) npDong.innerHTML = '--';
                    if (npResultName) npResultName.innerHTML = `<span style="color:#ff6b6b; font-size: 0.9rem;">⚠️ ${res.error}</span>`;
                } else {
                    if (numberPreviewBox) numberPreviewBox.style.display = 'none';
                }
            }
        });

        numberInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                if (numberSubmitBtn) numberSubmitBtn.click();
            }
        });
    }

    if (numberSubmitBtn) {
        numberSubmitBtn.addEventListener('click', () => {
            const val = numberInput ? numberInput.value : '';
            const res = parseNumberHexagram(val);
            if (!res.success) {
                alert(res.error || "Vui lòng nhập dãy số hợp lệ trước khi lập quẻ!");
                if (numberInput) numberInput.focus();
                return;
            }

            // Gán 6 câu trả lời trống vì người dùng không cần nhập câu hỏi khảo sát ở tab nhập số
            userAnswers = ['', '', '', '', '', ''];

            // Tắt đếm giờ thực
            if (liveClockTimer) clearInterval(liveClockTimer);

            loadingOverlay.classList.add('visible');

            const dVal = document.getElementById('current-date-time').value;
            const calendarData = CALENDAR.calculateCanChi(dVal);
            const formattedDate = formatDate(dVal);

            // Gọi logic tính quẻ dịch với phương pháp "Mai hoa (Nhập số)"
            const hexData = ICHING.calculateHexagramData(res.hexLines, calendarData, "Mai hoa (Nhập số)", formattedDate);

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

    // -------------------------------------------------------------------------
    // THUẬT TOÁN GIEO Ý NIỆM (INTENT-BASED HEXAGRAM CASTING)
    // -------------------------------------------------------------------------
    const VIETNAMESE_CHAR_WEIGHTS = {
        // a
        'à': ['a', 'huyền'], 'á': ['a', 'sắc'], 'ả': ['a', 'hỏi'], 'ã': ['a', 'ngã'], 'ạ': ['a', 'nặng'],
        'ă': ['a', 'trăng'], 'ằ': ['a', 'trăng', 'huyền'], 'ắ': ['a', 'trăng', 'sắc'], 'ẳ': ['a', 'trăng', 'hỏi'], 'ẵ': ['a', 'trăng', 'ngã'], 'ặ': ['a', 'trăng', 'nặng'],
        'â': ['a', 'mũ'], 'ầ': ['a', 'mũ', 'huyền'], 'ấ': ['a', 'mũ', 'sắc'], 'ẩ': ['a', 'mũ', 'hỏi'], 'ẫ': ['a', 'mũ', 'ngã'], 'ậ': ['a', 'mũ', 'nặng'],
        // e
        'è': ['e', 'huyền'], 'é': ['e', 'sắc'], 'ẻ': ['e', 'hỏi'], 'ẽ': ['e', 'ngã'], 'ẹ': ['e', 'nặng'],
        'ê': ['e', 'mũ'], 'ề': ['e', 'mũ', 'huyền'], 'ế': ['e', 'mũ', 'sắc'], 'ể': ['e', 'mũ', 'hỏi'], 'ễ': ['e', 'mũ', 'ngã'], 'ệ': ['e', 'mũ', 'nặng'],
        // i
        'ì': ['i', 'huyền'], 'í': ['i', 'sắc'], 'ỉ': ['i', 'hỏi'], 'ĩ': ['i', 'ngã'], 'ị': ['i', 'nặng'],
        // o
        'ò': ['o', 'huyền'], 'ó': ['o', 'sắc'], 'ỏ': ['o', 'hỏi'], 'õ': ['o', 'ngã'], 'ọ': ['o', 'nặng'],
        'ô': ['o', 'mũ'], 'ồ': ['o', 'mũ', 'huyền'], 'ố': ['o', 'mũ', 'sắc'], 'ổ': ['o', 'mũ', 'hỏi'], 'ỗ': ['o', 'mũ', 'ngã'], 'ộ': ['o', 'mũ', 'nặng'],
        'ơ': ['o', 'móc'], 'ờ': ['o', 'móc', 'huyền'], 'ớ': ['o', 'móc', 'sắc'], 'ở': ['o', 'móc', 'hỏi'], 'ỡ': ['o', 'móc', 'ngã'], 'ợ': ['o', 'móc', 'nặng'],
        // u
        'ù': ['u', 'huyền'], 'ú': ['u', 'sắc'], 'ủ': ['u', 'hỏi'], 'ũ': ['u', 'ngã'], 'ụ': ['u', 'nặng'],
        'ư': ['u', 'móc'], 'ừ': ['u', 'móc', 'huyền'], 'ứ': ['u', 'móc', 'sắc'], 'ử': ['u', 'móc', 'hỏi'], 'ữ': ['u', 'móc', 'ngã'], 'ự': ['u', 'móc', 'nặng'],
        // y
        'ỳ': ['y', 'huyền'], 'ý': ['y', 'sắc'], 'ỷ': ['y', 'hỏi'], 'ỹ': ['y', 'ngã'], 'ỵ': ['y', 'nặng'],
        // d
        'đ': ['d', 'gạch']
    };

    function countWordActions(word) {
        let count = 0;
        let breakdown = [];
        for (const ch of word) {
            const lower = ch.toLowerCase();
            if (VIETNAMESE_CHAR_WEIGHTS[lower]) {
                const parts = VIETNAMESE_CHAR_WEIGHTS[lower];
                count += parts.length;
                breakdown.push(ch + ' (' + parts.join('+') + '=' + parts.length + ')');
            } else {
                count += 1;
                breakdown.push(ch + '=1');
            }
        }
        return { count, breakdown };
    }

    function parseVietnameseIntent(text, typoLog = []) {
        if (!text || typeof text !== 'string') return { success: false, error: 'Chưa có nội dung ý niệm' };
        
        const normalized = text.normalize('NFC');
        const regex = /(\s+|[^\s]+)/g;
        const tokens = [];
        let match;
        while ((match = regex.exec(normalized)) !== null) {
            const { count, breakdown } = countWordActions(match[0]);
            tokens.push({
                token: match[0],
                start: match.index,
                end: match.index + match[0].length,
                isSpace: /^\s+$/.test(match[0]),
                baseCount: count,
                debt: 0,
                effectiveCount: count,
                breakdown
            });
        }

        if (tokens.length === 0) return { success: false, error: 'Chưa có nội dung ý niệm' };

        // Phân bổ nợ số toán sửa xóa vào đúng từ ngữ chứa vị trí ký tự đã bị xóa sửa
        let extraDebtTotal = 0;
        if (Array.isArray(typoLog)) {
            typoLog.forEach(typo => {
                extraDebtTotal += typo.debt;
                let assigned = false;
                for (let i = 0; i < tokens.length; i++) {
                    const isLast = (i === tokens.length - 1);
                    if (typo.charIndex >= tokens[i].start && (typo.charIndex < tokens[i].end || isLast)) {
                        tokens[i].debt += typo.debt;
                        tokens[i].effectiveCount += typo.debt;
                        assigned = true;
                        break;
                    }
                }
                if (!assigned && tokens.length > 0) {
                    tokens[tokens.length - 1].debt += typo.debt;
                    tokens[tokens.length - 1].effectiveCount += typo.debt;
                }
            });
        }

        const totalCount = tokens.reduce((sum, t) => sum + t.effectiveCount, 0);
        const baseTotal = tokens.reduce((sum, t) => sum + t.baseCount, 0);

        if (totalCount < 2) {
            return { success: false, error: 'Vui lòng nhập ít nhất 2 ký tự ý niệm.' };
        }

        if (totalCount === 3) {
            const tQuai = TIEN_THIEN_BAT_QUAI[1];
            const hQuai = TIEN_THIEN_BAT_QUAI[2];
            const raw6 = [
                hQuai.bin[0], hQuai.bin[1], hQuai.bin[2],
                tQuai.bin[0], tQuai.bin[1], tQuai.bin[2]
            ];
            const hexLines = raw6.map((val, idx) => {
                const lineNum = idx + 1;
                const isDong = (lineNum === 3);
                if (val === 1) return isDong ? 3 : 1;
                return isDong ? 0 : 2;
            });
            return {
                success: true,
                totalCount: 3,
                baseTotal,
                extraDebt: extraDebtTotal,
                thuongCount: 1,
                haCount: 2,
                thuongQuai: 1, // Càn
                thuongName: tQuai.name,
                haQuai: 2,     // Đoài
                haName: hQuai.name,
                haoDong: 3,
                thuongText: text.slice(0, 1),
                haText: text.slice(1),
                hexLines,
                explain: '3 ký tự ➔ Thượng quái: 1 (Càn), Hạ quái: 2 (Đoài), Động hào: 3'
            };
        }

        // Target half count for Thượng quái
        const targetHalf = Math.floor(totalCount / 2);

        let bestSplitIndex = 0;
        let bestThuongSum = 0;

        let accumulated = 0;
        for (let i = 0; i < tokens.length; i++) {
            accumulated += tokens[i].effectiveCount;
            // A valid boundary is either a space token OR a word token that is followed by a space
            const isBoundary = tokens[i].isSpace || (i < tokens.length - 1 && tokens[i + 1].isSpace) || (i === tokens.length - 1);
            if (isBoundary && accumulated <= targetHalf) {
                bestSplitIndex = i + 1;
                bestThuongSum = accumulated;
            }
        }

        if (bestThuongSum === 0) {
            bestSplitIndex = 1;
            bestThuongSum = tokens[0].effectiveCount;
        }

        const thuongTokens = tokens.slice(0, bestSplitIndex);
        const haTokens = tokens.slice(bestSplitIndex);

        const thuongText = thuongTokens.map(t => t.token).join('');
        const haText = haTokens.map(t => t.token).join('');

        const thuongCount = thuongTokens.reduce((s, t) => s + t.effectiveCount, 0);
        const haCount = haTokens.reduce((s, t) => s + t.effectiveCount, 0);

        const thuongQuai = (thuongCount % 8 === 0) ? 8 : (thuongCount % 8);
        const haQuai = (haCount % 8 === 0) ? 8 : (haCount % 8);
        let haoDong = totalCount % 6;
        if (haoDong === 0) haoDong = 6;

        const tQuai = TIEN_THIEN_BAT_QUAI[thuongQuai];
        const hQuai = TIEN_THIEN_BAT_QUAI[haQuai];
        const raw6 = [
            hQuai.bin[0], hQuai.bin[1], hQuai.bin[2],
            tQuai.bin[0], tQuai.bin[1], tQuai.bin[2]
        ];

        const hexLines = raw6.map((val, idx) => {
            const lineNum = idx + 1;
            const isDong = (lineNum === haoDong);
            if (val === 1) return isDong ? 3 : 1;
            return isDong ? 0 : 2;
        });

        return {
            success: true,
            totalCount,
            baseTotal,
            extraDebt: extraDebtTotal,
            thuongCount,
            haCount,
            thuongQuai,
            thuongName: tQuai.name,
            haQuai,
            haName: hQuai.name,
            haoDong,
            thuongText,
            haText,
            hexLines,
            tokens
        };
    }

    let intentLastWeight = 0;
    let intentCorrectionDebt = 0;
    let intentTypoLog = [];
    let intentDropTimer = null;
    let intentPendingDrop = 0;
    let intentPendingDropPos = 0;

    const intentInput = document.getElementById('intent-input');
    const intentPreviewBox = document.getElementById('intent-preview-box');
    const ipTotal = document.getElementById('ip-total');
    const ipSubDetail = document.getElementById('ip-sub-detail');
    const ipThuong = document.getElementById('ip-thuong');
    const ipHa = document.getElementById('ip-ha');
    const ipDong = document.getElementById('ip-dong');
    const ipThuongCount = document.getElementById('ip-thuong-count');
    const ipThuongText = document.getElementById('ip-thuong-text');
    const ipHaCount = document.getElementById('ip-ha-count');
    const ipHaText = document.getElementById('ip-ha-text');
    const ipMainHex = document.getElementById('ip-main-hex');
    const ipChangedHex = document.getElementById('ip-changed-hex');
    const intentSubmitBtn = document.getElementById('intent-submit-btn');

    function calculateStringActionWeight(str) {
        if (!str) return 0;
        const normalized = str.normalize('NFC');
        const regex = /(\s+|[^\s]+)/g;
        const tokens = normalized.match(regex) || [];
        let total = 0;
        tokens.forEach(tok => {
            const { count } = countWordActions(tok);
            total += count;
        });
        return total;
    }

    function handleIntentInputEvent() {
        if (!intentInput) return;
        const val = (intentInput.value || '').normalize('NFC');

        if (val.length === 0) {
            if (intentDropTimer) clearTimeout(intentDropTimer);
            intentLastWeight = 0;
            intentCorrectionDebt = 0;
            intentTypoLog = [];
            intentPendingDrop = 0;
            updateIntentLivePreview();
            return;
        }

        const currentWeight = calculateStringActionWeight(val);

        if (currentWeight < intentLastWeight) {
            // Có sự sụt giảm ký tự -> Chờ 80ms để lọc bỏ Unikey/IME composition
            const drop = intentLastWeight - currentWeight;
            intentPendingDrop += drop;
            intentPendingDropPos = (intentInput.selectionStart !== null && intentInput.selectionStart !== undefined) ? intentInput.selectionStart : val.length;
            if (intentDropTimer) clearTimeout(intentDropTimer);
            intentDropTimer = setTimeout(() => {
                // Người dùng thực sự xóa ký tự lỗi
                const debt = intentPendingDrop * 2;
                intentCorrectionDebt += debt;
                intentTypoLog.push({ charIndex: intentPendingDropPos, debt });
                intentPendingDrop = 0;
                intentDropTimer = null;
                updateIntentLivePreview();
            }, 80);
        } else {
            // Ký tự tăng lên hoặc giữ nguyên -> Hoàn tất ghép âm IME, hủy timer xóa
            if (intentDropTimer) {
                clearTimeout(intentDropTimer);
                intentDropTimer = null;
                intentPendingDrop = 0;
            }
            updateIntentLivePreview();
        }

        intentLastWeight = currentWeight;
    }

    function updateIntentLivePreview() {
        if (!intentInput) return;
        const val = intentInput.value;
        const res = parseVietnameseIntent(val, intentTypoLog);
        if (res.success) {
            const hexNames = getHexagramPairNames(res.thuongQuai, res.haQuai, res.haoDong);
            if (intentPreviewBox) intentPreviewBox.style.display = 'block';
            if (ipTotal) ipTotal.innerHTML = `${res.totalCount}`;
            if (ipSubDetail) {
                if (intentCorrectionDebt > 0) {
                    ipSubDetail.style.display = 'block';
                    ipSubDetail.innerHTML = `(Gốc: ${res.baseTotal}, Sửa: +${intentCorrectionDebt})`;
                } else {
                    ipSubDetail.style.display = 'none';
                }
            }
            if (ipThuong) ipThuong.innerHTML = `${res.thuongName} (${res.thuongQuai})`;
            if (ipHa) ipHa.innerHTML = `${res.haName} (${res.haQuai})`;
            if (ipDong) ipDong.innerHTML = `Hào ${res.haoDong}`;
            if (ipThuongCount) ipThuongCount.innerHTML = `${res.thuongCount}`;
            if (ipThuongText) ipThuongText.innerHTML = `"${res.thuongText}"`;
            if (ipHaCount) ipHaCount.innerHTML = `${res.haCount}`;
            if (ipHaText) ipHaText.innerHTML = `"${res.haText}"`;
            if (ipMainHex) ipMainHex.innerHTML = hexNames.mainHexName;
            if (ipChangedHex) ipChangedHex.innerHTML = hexNames.changedHexName;
        } else {
            if (val.trim().length > 0 || intentCorrectionDebt > 0) {
                if (intentPreviewBox) intentPreviewBox.style.display = 'block';
                if (ipTotal) ipTotal.innerHTML = `${intentCorrectionDebt}`;
                if (ipSubDetail) ipSubDetail.style.display = 'none';
                if (ipThuong) ipThuong.innerHTML = '--';
                if (ipHa) ipHa.innerHTML = '--';
                if (ipDong) ipDong.innerHTML = '--';
                if (ipThuongCount) ipThuongCount.innerHTML = '0';
                if (ipThuongText) ipThuongText.innerHTML = '--';
                if (ipHaCount) ipHaCount.innerHTML = '0';
                if (ipHaText) ipHaText.innerHTML = '--';
                if (ipMainHex) ipMainHex.innerHTML = `<span style="color:#ff6b6b; font-size: 0.85rem;">⚠️ ${res.error}</span>`;
                if (ipChangedHex) ipChangedHex.innerHTML = '--';
            } else {
                if (intentPreviewBox) intentPreviewBox.style.display = 'none';
            }
        }
    }

    if (intentInput) {
        intentInput.addEventListener('input', handleIntentInputEvent);
        intentInput.addEventListener('change', handleIntentInputEvent);
        intentInput.addEventListener('paste', () => setTimeout(handleIntentInputEvent, 50));
    }

    if (intentSubmitBtn) {
        intentSubmitBtn.addEventListener('click', () => {
            const val = intentInput ? intentInput.value : '';
            const res = parseVietnameseIntent(val, intentTypoLog);
            if (!res.success) {
                alert(res.error || "Vui lòng nhập câu hỏi / ý niệm hợp lệ trước khi lập quẻ!");
                if (intentInput) intentInput.focus();
                return;
            }

            // Gán câu hỏi ý niệm vào userAnswers để hiển thị trên thẻ quẻ và AI luận giải
            userAnswers = [val.trim(), '', '', '', '', ''];

            // Tắt đếm giờ thực
            if (liveClockTimer) clearInterval(liveClockTimer);

            loadingOverlay.classList.add('visible');

            const dVal = document.getElementById('current-date-time').value;
            const calendarData = CALENDAR.calculateCanChi(dVal);
            const formattedDate = formatDate(dVal);

            // Gọi logic tính quẻ dịch với phương pháp "Mai hoa (Gieo ý niệm)"
            const hexData = ICHING.calculateHexagramData(res.hexLines, calendarData, "Mai hoa (Gieo ý niệm)", formattedDate);

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
                    scale: 2,
                    useCORS: true,
                    allowTaint: true,
                    backgroundColor: '#fefee5',
                    width: 1000,
                    windowWidth: 1000,
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
