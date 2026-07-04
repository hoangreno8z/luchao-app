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

            // Cập nhật hiển thị mặt xu trực quan cho người dùng xem bằng phép quay 3D
            coins.forEach((coin, idx) => {
                const isYang = coinResults[idx];
                const innerEl = coin.querySelector('.coin-inner');
                if (innerEl) {
                    if (isYang) {
                        innerEl.style.transform = 'rotateY(0deg)';
                    } else {
                        innerEl.style.transform = 'rotateY(180deg)';
                    }
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

        body.innerHTML = `<p style="text-align: center; color: var(--gold);">Đang truy vấn dữ liệu luận đoán và chạy mô hình AI...</p>`;

        // Thu thập các câu trả lời khảo sát từ người dùng
        const userInputs = {
            who: userAnswers[0] || "",
            gender: userAnswers[1] || "",
            birthYear: userAnswers[2] || "",
            issue: userAnswers[3] || "",
            city: userAnswers[4] || "",
            desire: userAnswers[5] || "",
            question: userAnswers[3] || ""
        };

        // Gửi yêu cầu POST lấy luận đoán động và AI
        fetch('/api/interpret', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                hex_id: data.mainID,
                changed_id: data.changedID,
                topic: topic,
                gender: gender,
                hexData: data,
                userInputs: userInputs
            })
        })
            .then(res => res.json())
            .then(resData => {
                if (!resData.success) {
                    body.innerHTML = `<p style="color: #ef4444; font-weight: bold;">Lỗi hệ thống: ${resData.error || 'Không rõ nguyên nhân'}</p>`;
                    return;
                }

                const { main, changed, deity, lines, analysisHtml, catHung, templateContent, aiExplanation } = resData;

                let linesHtml = "";
                if (data.movingLines.length > 0) {
                    linesHtml += `<h4>3. Chi Tiết Các Hào Phát Động</h4>`;
                    data.movingLines.forEach(lineNum => {
                        const dbLine = lines.find(l => l.line_number === lineNum);
                        if (dbLine) {
                            linesHtml += `<p><strong>Hào ${lineNum} Động (${dbLine.relation}):</strong> ${dbLine.meaning_active || 'Đang cập nhật...'}</p>`;
                        }
                    });
                } else {
                    linesHtml += `<h4>3. Trạng Thái Hào Tĩnh</h4>`;
                    const shiLineNum = data.linesData.findIndex(l => l.isShi) + 1;
                    const dbLine = lines.find(l => l.line_number === shiLineNum);
                    if (dbLine) {
                        linesHtml += `<p><strong>Hào Thế (Hào ${shiLineNum} - ${dbLine.relation}):</strong> ${dbLine.meaning_static || 'Đang cập nhật...'}</p>`;
                    }
                }

                // Cấu hình nhãn Cát Hung trực quan
                let catHungBadge = "";
                if (catHung === "CAT") {
                    catHungBadge = `<span style="background-color: #15803d; color: #ffffff; padding: 4px 10px; border-radius: 4px; font-weight: bold; font-size: 0.9rem;">CÁT (TỐT LÀNH)</span>`;
                } else if (catHung === "HUNG") {
                    catHungBadge = `<span style="background-color: #b91c1c; color: #ffffff; padding: 4px 10px; border-radius: 4px; font-weight: bold; font-size: 0.9rem;">HUNG (BẤT LỢI)</span>`;
                } else {
                    catHungBadge = `<span style="background-color: #4b5563; color: #ffffff; padding: 4px 10px; border-radius: 4px; font-weight: bold; font-size: 0.9rem;">BÌNH HÒA</span>`;
                }

                let html = `
                    <p style="margin-bottom: 15px;"><strong>Người hỏi:</strong> Giới tính ${gender} | <strong>Chủ đề:</strong> Xem về ${topic}.</p>
                    <p><strong>Dụng Thần Lục Lục Hào:</strong> <strong>${deity.deity}</strong> (Kỵ thần: <em>${deity.kỵ || 'Không'}</em>).</p>
                    
                    <div class="result-summary-block" style="background-color: rgba(212,163,89,0.08); border-left: 4px solid var(--gold); padding: 15px; margin: 20px 0; border-radius: 4px;">
                        <div style="margin-bottom: 8px;"><strong>Kết luận Quẻ Dịch:</strong> ${catHungBadge}</div>
                        <p style="font-weight: bold; margin-bottom: 5px;">${templateContent?.summary || 'Đang xác định kết luận...'}</p>
                        <p style="font-size: 0.95rem; line-height: 1.5; color: var(--text-color);">${templateContent?.detail || ''}</p>
                    </div>

                    <h4>1. Ý Nghĩa Quẻ Dịch Tĩnh</h4>
                    <p>Quẻ Chủ là <strong>${main.name}</strong> (${main.vietnamese_meaning || ''}) thuộc họ quẻ <strong>${main.palace}</strong>.</p>
                    <p><em>Giải nghĩa:</em> ${main.overall_meaning || 'Đang cập nhật...'}</p>
                    <p><em>Ý nghĩa chủ đề [${topic.toUpperCase()}]:</em> ${main.topic_meaning || 'Đang cập nhật...'}</p>
                    
                    ${changed ? `
                    <h4>Quẻ Biến: ${changed.name} (${changed.vietnamese_meaning || ''})</h4>
                    <p>Quẻ biến biểu thị xu hướng diễn biến tiếp theo của sự việc: <em>${changed.overall_meaning || 'Đang cập nhật...'}</em></p>
                    ` : ''}
                    
                    ${linesHtml}

                    <div class="theory-analysis-block" style="margin-top: 25px; border-top: 2px solid var(--border-color); padding-top: 15px;">
                        <h3 class="interpretation-title" style="margin-bottom: 12px; font-size: 1.15rem; color: var(--gold);">PHÂN TÍCH KỸ THUẬT (CHU THẦN BÂN)</h3>
                        ${analysisHtml || '<p>Không có dữ liệu phân tích.</p>'}
                    </div>

                    ${aiExplanation ? `
                    <div class="ai-explanation-block" style="margin-top: 25px; border-top: 2px solid var(--border-color); padding-top: 20px; background-color: rgba(212,163,89,0.05); padding: 20px; border-radius: 8px; border: 1px dashed var(--gold);">
                        <h3 class="interpretation-title" style="margin-top: 0; margin-bottom: 15px; font-size: 1.2rem; color: var(--gold); border-bottom: 1px solid var(--border-color); padding-bottom: 8px;">LỜI BÀN CỦA TRỢ LÝ AI CÁ NHÂN HÓA</h3>
                        <div style="line-height: 1.6; font-size: 0.98rem; white-space: pre-line;">${aiExplanation}</div>
                    </div>
                    ` : ''}

                    <div style="font-size: 0.85rem; color: #888; border-top: 1px dashed var(--border-color); padding-top: 10px; margin-top: 20px; text-align: right;">
                        Nguồn dữ liệu: Supabase Cloud Database (${resData.source === 'supabase' ? 'Kết nối trực tiếp API' : 'Dữ liệu dự phòng Mock'})
                    </div>
                `;
                body.innerHTML = html;
            })
            .catch(err => {
                console.error(err);
                body.innerHTML = `<p style="color: #ef4444; font-weight: bold;">Không thể kết nối đến máy chủ API để lấy luận giải!</p>`;
            });
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
