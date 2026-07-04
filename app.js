/**
 * Quản lý hoạt động chính của ứng dụng - app.js
 * (Adapted exactly from gieoque.id.vn logic to ensure 100% correctness)
 */

document.addEventListener('DOMContentLoaded', () => {
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

    proceedBtn.addEventListener('click', () => {
        disclaimerScreen.classList.add('hidden');
        mainScreen.classList.remove('hidden');
        initMainFlow();
    });

    // -------------------------------------------------------------------------
    // 2. KHỞI TẠO LUỒNG CHÍNH VÀ ĐỒNG HỒ
    // -------------------------------------------------------------------------
    let liveClockTimer = null;

    function initMainFlow() {
        // Cập nhật ngày giờ hiện tại
        const now = new Date();
        now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
        document.getElementById('current-date-time').value = now.toISOString().slice(0, 16);

        // Khởi động đồng hồ thời gian thực
        updateClock();
        liveClockTimer = setInterval(updateClock, 1000);
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
    const questions = [
        "Câu 1: Vấn đề này của bạn hay bạn đang thay mặt người khác để hỏi?",
        "Câu 2: Bạn là Nam hay Nữ?",
        "Câu 3: Bạn sinh năm bao nhiêu (năm sinh âm/dương lịch)?",
        "Câu 4: Mô tả sơ lược vấn đề bạn đang quan tâm là gì?",
        "Câu 5: Hiện tại bạn đang ở tỉnh/thành phố nào?",
        "Câu 6: Bạn mong muốn thật tâm đạt được điều gì nhất ở vấn đề này?"
    ];

    let currentStep = 0;
    let userAnswers = [];
    let hexLines = []; // Lưu 6 hào: 0=Lão Âm, 1=Thiếu Dương, 2=Thiếu Âm, 3=Lão Dương

    const questionText = document.getElementById('question-text');
    const questionInput = document.getElementById('question-input');
    const questionSubmit = document.getElementById('question-submit');
    const progressText = document.getElementById('progress-text');
    const progressFill = document.getElementById('progress-fill');
    const questionForm = document.getElementById('question-flow-form');
    const finishContainer = document.getElementById('finish-container');

    questionSubmit.addEventListener('click', (e) => {
        e.preventDefault();
        const ans = questionInput.value.trim();
        if (!ans) {
            alert("Vui lòng nhập câu trả lời của bạn trước khi gieo xu!");
            return;
        }

        userAnswers.push(ans);
        questionInput.value = "";

        // Chạy hiệu ứng tung xu
        performCoinToss(() => {
            currentStep++;
            // Cập nhật thanh tiến trình
            const percent = (currentStep / 6) * 100;
            progressFill.style.width = `${percent}%`;

            if (currentStep < 6) {
                progressText.innerText = `Lần gieo: ${currentStep + 1}/6`;
                questionText.innerText = questions[currentStep];
                questionInput.focus();
            } else {
                // Ẩn form nhập và hiện nút hoàn tất
                questionForm.classList.add('hidden');
                finishContainer.classList.remove('hidden');
                progressText.innerText = `Lần gieo: Hoàn tất 6/6`;
            }
        });
    });

    // -------------------------------------------------------------------------
    // 4. HIỆU ỨNG TUNG XU
    // -------------------------------------------------------------------------
    const coins = [
        document.getElementById('coin-1'),
        document.getElementById('coin-2'),
        document.getElementById('coin-3')
    ];

    function performCoinToss(callback) {
        // Tắt nút submit
        questionSubmit.disabled = true;

        // Bắt đầu hiệu ứng quay
        coins.forEach(coin => {
            coin.classList.add('spinning');
        });

        // Thời gian ngẫu nhiên từ 3000ms đến 6000ms
        const spinTime = Math.floor(Math.random() * 3000) + 3000;

        setTimeout(() => {
            // Ngừng quay
            coins.forEach(coin => {
                coin.classList.remove('spinning');
            });

            // Tung ngẫu nhiên mặt ngửa (true/dương - 2 chữ) và sấp (false/âm - 1 chữ)
            // Mặt 2 chữ (mặt Dương) và mặt 1 chữ (mặt Âm)
            const r1 = Math.random() < 0.5;
            const r2 = Math.random() < 0.5;
            const r3 = Math.random() < 0.5;

            const coinResults = [r1, r2, r3];
            const yangCount = coinResults.filter(r => r).length;

            // Áp dụng quy tắc Lục Hào:
            // 0 Dương (3 Âm): Âm Động (Lão Âm - X) -> value = 0
            // 1 Dương (2 Âm): Dương Tĩnh (Thiếu Dương - —) -> value = 1
            // 2 Dương (1 Âm): Âm Tĩnh (Thiếu Âm - --) -> value = 2
            // 3 Dương (0 Âm): Dương Động (Lão Dương - O) -> value = 3
            let lineValue;
            if (yangCount === 0) {
                lineValue = 0; // Lão Âm
            } else if (yangCount === 1) {
                lineValue = 1; // Thiếu Dương
            } else if (yangCount === 2) {
                lineValue = 2; // Thiếu Âm
            } else {
                lineValue = 3; // Lão Dương
            }

            hexLines.push(lineValue);

            // Cập nhật hiển thị mặt xu trực quan cho người dùng xem
            coins.forEach((coin, idx) => {
                const isYang = coinResults[idx];
                // Mặt Dương (mặt có chữ 寶) hoặc mặt Âm (không chữ)
                const charEl = coin.querySelector('.coin-characters');
                if (isYang) {
                    charEl.style.display = 'block';
                } else {
                    charEl.style.display = 'none';
                }
            });

            // Kích hoạt lại nút và chạy callback
            questionSubmit.disabled = false;
            if (callback) callback();

        }, spinTime);
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
        // Tắt đếm giờ thực
        if (liveClockTimer) clearInterval(liveClockTimer);

        loadingOverlay.classList.add('visible');

        const dVal = document.getElementById('current-date-time').value;
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
                scale: window.innerWidth < 768 ? 1 : 1.5,
                useCORS: true,
                logging: false
            }).then(canvas => {
                captureArea.style.position = 'absolute';
                captureArea.style.left = '-9999px';
                captureArea.style.opacity = '1';

                const imgData = canvas.toDataURL('image/png');
                hexagramImg.src = imgData;

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
                phucHtml = `<span class="phuc-than">${line.phucThan.rel} - ${line.phucThan.branch}</span>`;
            }

            const isTK = line.isTK ? 'K' : '-';
            const isCTK = line.isCTK ? 'K' : '-';

            rowsHtml += `
            <tr class="${rowClass}">
                <td>${sym}</td>
                <td>${marker}</td>
                <td>${line.relation}</td>
                <td>${line.chi}-${line.hanh}</td>
                <td>${phucHtml}</td>
                <td>${isTK}</td>
                <td class="sep-col">${line.changed.relation}</td>
                <td>${line.changed.branch}-${line.changed.hanh}</td>
                <td>${line.lucThu}</td>
                <td>${isCTK}</td>
                <td>${line.tsNgay}</td>
                <td>${line.tsThang}</td>
            </tr>`;
        }

        const target = document.getElementById('captureTarget');
        target.innerHTML = `
            <div class="info-header">
                <div class="info-content">
                    <div class="info-line"><strong>Ngày giờ gieo:</strong> ${data.formattedDate} &nbsp;&nbsp;&nbsp;&nbsp; <strong>Phương pháp:</strong> ${methodText}</div>
                    <div class="info-line"><strong>Can chi ngày giờ:</strong> ${dateInfo.fullCanChi}</div>
                    <div class="info-line"><strong>Hào tâm niệm:</strong> ${dateInfo.haoTamText || 'Không'} &nbsp;&nbsp;&nbsp;&nbsp; <strong>Tuần Không:</strong> <span class="highlight">${dateInfo.tuanKhong}</span></div>
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
                        <th>TS Ngày</th>
                        <th>TS Tháng</th>
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
            
            <div class="watermark" style="text-align: right; margin-top: 15px; font-size: 14px; font-style: italic; color: #888;">
                Phần mềm Lục Hào - Triển khai trên Vercel qua GitHub
            </div>
        `;
    }

    // -------------------------------------------------------------------------
    // 7. HIỂN THỊ LUẬN GIẢI QUẺ DỊCH
    // -------------------------------------------------------------------------
    function displayInterpretation(data) {
        const body = document.getElementById('interpretation-body');
        const topic = document.getElementById('topic-select').value;
        const gender = document.getElementById('gender-select').value;

        // Dụng thần
        let dungThanText = "";
        if (topic === "công việc" || topic === "thi cử") dungThanText = "Quan Quỷ (chủ công danh, chức vụ, thi cử)";
        else if (topic === "tình yêu" || topic === "hôn nhân") {
            dungThanText = gender === "Nam" ? "Thê Tài (chủ người yêu, vợ)" : "Quan Quỷ (chủ người yêu, chồng)";
        } else if (topic === "sức khỏe") dungThanText = "Thế Hào (chủ bản thể) và Tử Tôn (chủ thuốc men, cát tường)";
        else if (topic === "kinh doanh" || topic === "dự án") dungThanText = "Thê Tài (chủ tiền tài, lợi nhuận)";
        else if (topic === "tìm kiếm") dungThanText = "Thê Tài (chủ đồ vật) hoặc Tử Tôn (chủ thú cưng)";
        else if (topic === "thai sản") dungThanText = "Tử Tôn (chủ con cái)";
        else if (topic === "ông bà cha mẹ" || topic === "xem thay mặt người lớn") dungThanText = "Phụ Mẫu (chủ trưởng bối)";
        else if (topic === "con cháu" || topic === "xem thay mặt con") dungThanText = "Tử Tôn (chủ vãn bối)";
        else if (topic === "anh em") dungThanText = "Huynh Đệ (chủ huynh đệ tỷ muội)";
        else if (topic === "xem thay mặt vợ") dungThanText = "Thê Tài";
        else if (topic === "xem thay mặt chồng") dungThanText = "Quan Quỷ";
        else dungThanText = "Thế Hào và hào ứng với Lục Thân cụ thể của chủ đề";

        let html = `
            <p><strong>Người gieo:</strong> Giới tính ${gender} | <strong>Chủ đề hỏi:</strong> Xem về ${topic}.</p>
            <p><strong>Dụng Thần cần tập trung luận giải:</strong> Hào Lục Thân mang thuộc tính <strong>${dungThanText}</strong>.</p>
            
            <h4>1. Tổng Quan Quẻ Dịch</h4>
            <p>Quẻ Chủ của bạn là <strong>${data.mainName}</strong> thuộc họ quẻ <strong>${data.palaceName}</strong>.</p>
            ${data.movingLines.length > 0 ? 
                `<p>Quẻ có các hào động hào <strong>${data.movingLines.join(', ')}</strong> hóa thành Quẻ Biến là <strong>${data.changedName}</strong>.</p>` : 
                `<p>Đây là một <strong>Quẻ Tĩnh</strong> (không có hào động), mọi sự đang ở trạng thái hiện tại ổn định, chưa có sự thay đổi biến hóa lớn ngay lập tức.</p>`
            }
            
            <h4>2. Trạng Thái Tiết Khí & Cát Hung Cơ Bản</h4>
            <p>Quẻ dịch được lập vào tiết khí <strong>${data.dateInfo.tietKhi}</strong>. Nhật Thần là <strong>${data.dateInfo.nhatThan}</strong> và Nguyệt Lệnh là <strong>${data.dateInfo.nguyetLenh}</strong>. Đây là hai yếu tố cực kỳ quan trọng làm thước đo sức mạnh sinh khắc cho các hào trong quẻ.</p>
            <p>Nhật và Nguyệt giúp xác định hào nào vượng tướng (được sinh trợ, mạnh mẽ) hay hào nào suy tuyệt (bị khắc chế, yếu ớt). Bản thân các sao Thần Sát như <strong>Quý Nhân, Lộc Thần, Dịch Mã</strong> cũng sẽ giúp trợ duyên hoặc báo trước điềm động trong công việc/tình cảm.</p>
            
            <h4>3. Lời Khuyên Cổ Nhân</h4>
            <p>Dịch Kinh Lục Hào là công cụ phản ánh ý niệm nội tâm và sự vận hành sinh khắc tại thời điểm gieo. Khi gieo được quẻ này, bạn hãy giữ tâm thanh tịnh, ứng xử ôn hòa, tận lực thực hiện bổn phận của mình. Quẻ cát thì không nên kiêu ngạo lơ là, quẻ hung thì cần đề phòng chuẩn bị, biến nguy thành cơ.</p>
        `;

        body.innerHTML = html;
    }

    // -------------------------------------------------------------------------
    // 8. TẢI ẢNH VỀ MÁY
    // -------------------------------------------------------------------------
    downloadBtn.addEventListener('click', () => {
        const imgData = hexagramImg.src;
        if (!imgData) {
            alert("Không tìm thấy ảnh quẻ dịch!");
            return;
        }

        const link = document.createElement('a');
        link.download = `que_luc_hao_${new Date().getTime()}.png`;
        link.href = imgData;
        link.style.display = 'none';
        document.body.appendChild(link);
        link.click();
        setTimeout(() => {
            document.body.removeChild(link);
        }, 100);
    });
});
