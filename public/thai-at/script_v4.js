/**
 * Thai At Application Controller
 * Handles UI events, 6-mode switching, timeline slider, 16-cell rendering (>= 6 lines/cell)
 */

let currentMode = "tue";
let currentEngineType = "classic"; // 'classic' or 'astronomical'
window.currentSaBanTheme = localStorage.getItem("thai_at_saban_theme") || "thu-tich-co";

function switchSaBanTheme(themeKey, skipPNGRefresh = false) {
    const validThemes = ["thu-tich-co", "bach-ngoc", "moc-tra", "huyen-khong"];
    if (!validThemes.includes(themeKey)) themeKey = "thu-tich-co";

    window.currentSaBanTheme = themeKey;
    localStorage.setItem("thai_at_saban_theme", themeKey);

    const captureWrapper = document.getElementById("thai-at-chart-capture");
    if (captureWrapper) {
        captureWrapper.setAttribute("data-chart-theme", themeKey);
    }

    document.querySelectorAll(".theme-select-btn").forEach(btn => {
        if (btn.getAttribute("data-theme") === themeKey) {
            btn.classList.add("active");
        } else {
            btn.classList.remove("active");
        }
    });

    if (!skipPNGRefresh && window.lastCalculatedThaiAtData && typeof generateThaiAtPNG === "function") {
        generateThaiAtPNG(true);
    }
}

// =========================================================================
// THANH TUA THỜI GIAN NHANH (TIME-TRAVEL NAVIGATION)
// =========================================================================
function updateTimeTravelLabels() {
    const prevBigBtn = document.getElementById("btn-time-prev-big");
    const prevBtn = document.getElementById("btn-time-prev");
    const nextBtn = document.getElementById("btn-time-next");
    const nextBigBtn = document.getElementById("btn-time-next-big");
    if (!prevBtn || !nextBtn) return;

    if (currentMode === "tue") {
        if (prevBigBtn) prevBigBtn.innerHTML = "⏪ -10 Năm";
        prevBtn.innerHTML = "◀ Năm Trước";
        nextBtn.innerHTML = "Năm Kế ▶";
        if (nextBigBtn) nextBigBtn.innerHTML = "+10 Năm ⏩";
    } else if (currentMode === "nguyet") {
        if (prevBigBtn) prevBigBtn.innerHTML = "⏪ -1 Năm";
        prevBtn.innerHTML = "◀ Tháng Trước";
        nextBtn.innerHTML = "Tháng Kế ▶";
        if (nextBigBtn) nextBigBtn.innerHTML = "+1 Năm ⏩";
    } else if (currentMode === "nhat") {
        if (prevBigBtn) prevBigBtn.innerHTML = "⏪ -7 Ngày";
        prevBtn.innerHTML = "◀ Ngày Trước";
        nextBtn.innerHTML = "Ngày Sau ▶";
        if (nextBigBtn) nextBigBtn.innerHTML = "+7 Ngày ⏩";
    } else if (currentMode === "thoi") {
        if (prevBigBtn) prevBigBtn.innerHTML = "⏪ -1 Ngày";
        prevBtn.innerHTML = "◀ Canh Trước (-2h)";
        nextBtn.innerHTML = "Canh Kế (+2h) ▶";
        if (nextBigBtn) nextBigBtn.innerHTML = "+1 Ngày ⏩";
    } else {
        if (prevBigBtn) prevBigBtn.innerHTML = "⏪ -10 Năm";
        prevBtn.innerHTML = "◀ Năm Trước";
        nextBtn.innerHTML = "Năm Kế ▶";
        if (nextBigBtn) nextBigBtn.innerHTML = "+10 Năm ⏩";
    }
}

function adjustTimeTravel(stepType) {
    const dateInput = document.getElementById("input-date");
    const timeInput = document.getElementById("input-time");
    if (!dateInput || !timeInput) return;

    let dateVal = dateInput.value;
    let timeVal = timeInput.value || "12:00";
    if (!dateVal) dateVal = new Date().toISOString().split("T")[0];

    // Tạo đối tượng Date an toàn
    const parts = dateVal.split("-");
    const tParts = timeVal.split(":");
    let yr = parseInt(parts[0], 10);
    let mo = parseInt(parts[1], 10) - 1;
    let da = parseInt(parts[2], 10);
    let ho = parseInt(tParts[0], 10);
    let mi = parseInt(tParts[1], 10);

    let currentDt = new Date(yr, mo, da, ho, mi, 0);
    if (isNaN(currentDt.getTime())) currentDt = new Date();

    if (stepType === "now") {
        const now = new Date();
        const nYr = now.getFullYear();
        const nMo = String(now.getMonth() + 1).padStart(2, '0');
        const nDa = String(now.getDate()).padStart(2, '0');
        const nHo = String(now.getHours()).padStart(2, '0');
        const nMi = String(now.getMinutes()).padStart(2, '0');
        dateInput.value = `${nYr}-${nMo}-${nDa}`;
        timeInput.value = `${nHo}:${nMi}`;
        castChart();
        return;
    }

    if (currentMode === "tue") {
        if (stepType === "prev_big") currentDt.setFullYear(currentDt.getFullYear() - 10);
        else if (stepType === "prev") currentDt.setFullYear(currentDt.getFullYear() - 1);
        else if (stepType === "next") currentDt.setFullYear(currentDt.getFullYear() + 1);
        else if (stepType === "next_big") currentDt.setFullYear(currentDt.getFullYear() + 10);
    } else if (currentMode === "nguyet") {
        if (stepType === "prev_big") currentDt.setFullYear(currentDt.getFullYear() - 1);
        else if (stepType === "prev") currentDt.setMonth(currentDt.getMonth() - 1);
        else if (stepType === "next") currentDt.setMonth(currentDt.getMonth() + 1);
        else if (stepType === "next_big") currentDt.setFullYear(currentDt.getFullYear() + 1);
    } else if (currentMode === "nhat") {
        if (stepType === "prev_big") currentDt.setDate(currentDt.getDate() - 7);
        else if (stepType === "prev") currentDt.setDate(currentDt.getDate() - 1);
        else if (stepType === "next") currentDt.setDate(currentDt.getDate() + 1);
        else if (stepType === "next_big") currentDt.setDate(currentDt.getDate() + 7);
    } else if (currentMode === "thoi") {
        if (stepType === "prev_big") currentDt.setDate(currentDt.getDate() - 1);
        else if (stepType === "prev") currentDt.setHours(currentDt.getHours() - 2);
        else if (stepType === "next") currentDt.setHours(currentDt.getHours() + 2);
        else if (stepType === "next_big") currentDt.setDate(currentDt.getDate() + 1);
    } else {
        if (stepType === "prev_big") currentDt.setFullYear(currentDt.getFullYear() - 10);
        else if (stepType === "prev") currentDt.setFullYear(currentDt.getFullYear() - 1);
        else if (stepType === "next") currentDt.setFullYear(currentDt.getFullYear() + 1);
        else if (stepType === "next_big") currentDt.setFullYear(currentDt.getFullYear() + 10);
    }

    const resYr = currentDt.getFullYear();
    const resMo = String(currentDt.getMonth() + 1).padStart(2, '0');
    const resDa = String(currentDt.getDate()).padStart(2, '0');
    const resHo = String(currentDt.getHours()).padStart(2, '0');
    const resMi = String(currentDt.getMinutes()).padStart(2, '0');

    dateInput.value = `${resYr}-${resMo}-${resDa}`;
    timeInput.value = `${resHo}:${resMi}`;

    castChart();
}
window.adjustTimeTravel = adjustTimeTravel;
window.updateTimeTravelLabels = updateTimeTravelLabels;

function initThaiAtApp() {
    switchSaBanTheme(window.currentSaBanTheme, true);
    const now = new Date();
    const dateEl = document.getElementById("input-date");
    const timeEl = document.getElementById("input-time");
    if (dateEl && !dateEl.value) dateEl.value = now.toISOString().split("T")[0];
    if (timeEl && !timeEl.value) timeEl.value = now.toTimeString().substring(0, 5);

    // Dual Engine Navigation Tab Buttons
    document.querySelectorAll(".engine-tab-btn").forEach(btn => {
        btn.onclick = () => {
            document.querySelectorAll(".engine-tab-btn").forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            currentEngineType = btn.getAttribute("data-engine");

            const astroBanner = document.getElementById("astronomical-calibration-banner");
            if (astroBanner) {
                astroBanner.style.display = currentEngineType === "astronomical" ? "block" : "none";
            }

            castChart();
        };
    });

    // 6 Mode Navigation Tab Buttons
    document.querySelectorAll(".nav-btn").forEach(btn => {
        btn.onclick = () => {
            document.querySelectorAll(".nav-btn").forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            currentMode = btn.getAttribute("data-mode");
            updateTimeTravelLabels();
            castChart();
        };
    });

    // Form Submit
    const form = document.getElementById("control-form");
    if (form) {
        form.onsubmit = (e) => {
            e.preventDefault();
            castChart();
        };
    }

    updateTimeTravelLabels();

    // Initial render immediately
    castChart(true);
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initThaiAtApp);
    window.addEventListener("load", () => {
        const img = document.getElementById("thai-at-chart-img");
        if (!img || !img.src || img.style.display === "none") {
            initThaiAtApp();
        }
    });
} else {
    initThaiAtApp();
}

// Preload transition background image to prevent blank load delays
const transitionBgImg = new Image();
transitionBgImg.src = "images/thai_at_transition_bg.jpg";

function runTransitionParticles() {
    const canvas = document.getElementById("trans-particle-canvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    for (let i = 0; i < 50; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 3 + 1,
            color: Math.random() > 0.3 ? "#ffd700" : "#ffffff",
            vx: (Math.random() - 0.5) * 3,
            vy: -Math.random() * 3 - 1,
            alpha: Math.random() * 0.8 + 0.2
        });
    }

    let animId;
    const startTime = Date.now();

    function animate() {
        const elapsed = Date.now() - startTime;
        if (elapsed > 1350) {
            cancelAnimationFrame(animId);
            return;
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            p.alpha -= 0.006;

            ctx.save();
            ctx.globalAlpha = Math.max(0, p.alpha);
            ctx.shadowBlur = 12;
            ctx.shadowColor = "#ffd700";
            ctx.fillStyle = p.color;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        });

        animId = requestAnimationFrame(animate);
    }

    animate();
}

let _transitionTimeoutId = null;
function triggerTransitionAnimation() {
    const overlay = document.getElementById("thai-at-transition-overlay");
    if (!overlay) return;
    if (_transitionTimeoutId) clearTimeout(_transitionTimeoutId);
    overlay.style.display = "flex";
    overlay.classList.remove("active");
    void overlay.offsetWidth; // Force reflow
    overlay.classList.add("active");

    runTransitionParticles();

    _transitionTimeoutId = setTimeout(() => {
        overlay.classList.remove("active");
        overlay.style.display = "none";
        _transitionTimeoutId = null;
    }, 1350);
}

function castChart(skipAnim = false) {
    try {
        if (!skipAnim) triggerTransitionAnimation();
        const dInput = document.getElementById("input-date").value;
        const tInput = document.getElementById("input-time").value;
        if (!dInput || !tInput) return;
        const [y, m, d] = dInput.split("-").map(Number);
        const h = parseInt(tInput.split(":")[0]) || 0;
        render(y, m, d, h);
    } catch (err) {
        console.error("Lỗi khởi quẻ Thái Ất:", err);
        alert("Có lỗi xảy ra khi khởi quẻ Thái Ất. Vui lòng kiểm tra lại ngày giờ!");
    }
}

function renderWithDate(dObj) {
    const tInput = document.getElementById("input-time").value || "12:00";
    const h = parseInt(tInput.split(":")[0]) || 0;
    render(dObj.getFullYear(), dObj.getMonth() + 1, dObj.getDate(), h);
}

function render(year, month, day, hour) {
    try {
        let data = calculateThaiAtChart(currentMode, year, month, day, hour, currentEngineType);

        // NASA Astronomical Auto-Calibration Overlay
        if (currentEngineType === "astronomical" && data.astroInfo) {
            const astro = data.astroInfo;
            // Update NASA Calibration Banner UI
            const jdEl = document.getElementById("astro-jd-val");
            if (jdEl) jdEl.textContent = astro.jd.toLocaleString('vi-VN');
            const offsetEl = document.getElementById("astro-offset-val");
            if (offsetEl) offsetEl.textContent = `-${astro.deltaDYear}`;
            const tichEl = document.getElementById("astro-tich-val");
            if (tichEl) tichEl.textContent = astro.calibratedTichNien.toLocaleString('vi-VN');
            const solarEl = document.getElementById("astro-solar-val");
            if (solarEl) solarEl.textContent = astro.solarLongitude.toFixed(2);
        }

        window.lastCalculatedThaiAtData = data;

        // Update sidebar info
        const infoMode = document.getElementById("info-mode-name");
        if (infoMode) infoMode.textContent = data.modeName || '-';
        const infoSolar = document.getElementById("info-solar-term");
        if (infoSolar) infoSolar.textContent = data.solarTerm || '-';
        const infoCuc = document.getElementById("info-cuc-name");
        if (infoCuc) infoCuc.textContent = data.donCucName || '-';
        const infoKhoi = document.getElementById("info-khoi-name");
        if (infoKhoi) infoKhoi.textContent = (data.khoiSo !== undefined ? "Khối " + data.khoiSo + " (" + data.tinhChatKhoi + ")" : "-");
        const infoMon = document.getElementById("info-mon-name");
        if (infoMon) infoMon.textContent = data.batMon || '-';
        const infoTinh = document.getElementById("info-tinh-name");
        if (infoTinh) infoTinh.textContent = data.cuuTinh || '-';

        // Populate Deep Analysis Report
        const deepAnalysisEl = document.getElementById("luan-doan-deep-analysis-content");
        if (deepAnalysisEl) {
            if (typeof generateDetailedAnalysisReport === "function") {
                deepAnalysisEl.innerHTML = generateDetailedAnalysisReport(data);
            } else {
                deepAnalysisEl.innerHTML = "<p><em>Đang tải báo cáo luận giải chuyên sâu...</em></p>";
            }
        }

        // Populate Future Predictions
        const predContent = document.getElementById("future-predictions-content");
        if (predContent) {
            if (Array.isArray(data.movingStars) && data.movingStars.length > 0) {
                const nextTimeStr = currentMode === "tue" ? "1 năm" : currentMode === "nguyet" ? "1 tháng" : currentMode === "nhat" ? "1 ngày" : currentMode === "thoi" ? "1 canh giờ" : "";
                if (nextTimeStr) {
                    let predHtml = `<p>Trong <strong>${nextTimeStr} tiếp theo</strong>, các sao sau đây sẽ thay đổi quỹ đạo:</p><ul style="margin-top: 5px; margin-left: 20px;">`;
                    data.movingStars.forEach(m => {
                        predHtml += `<li><strong>${m.name}</strong> sẽ di chuyển sang <strong>${m.nextCungName}</strong> (hiện tại đang ở ${m.currCungName}).</li>`;
                    });
                    predHtml += `</ul>`;
                    predContent.innerHTML = predHtml;
                } else {
                    predContent.innerHTML = "<p><em>Không dự báo quỹ đạo sao cho chế độ này.</em></p>";
                }
            } else {
                predContent.innerHTML = "<p><em>Không có sao nào di chuyển trong chu kỳ tiếp theo, hoặc không có dữ liệu dự báo.</em></p>";
            }
        }

        // Ẩn/Hiện các khối phân tích và bản đồ cửu châu cho tab Quẻ Dịch & Bàn Nhân Mệnh
        const isNoSaBanMode = (currentMode === "dich" || currentMode === "menh");

        const analysisSec = document.getElementById("analysis-accordion-section");
        if (analysisSec) {
            analysisSec.style.display = isNoSaBanMode ? "none" : "block";
        }

        const phanDaSec = document.getElementById("phan-da-map-section");
        if (phanDaSec) {
            phanDaSec.style.display = isNoSaBanMode ? "none" : "block";
        }

        const imgSec = document.querySelector(".chart-image-section");
        if (imgSec) {
            imgSec.style.display = isNoSaBanMode ? "none" : "flex";
        }

        // Cập nhật tiêu đề khối Quẻ
        const resHeader = document.querySelector(".result-section h3");
        if (resHeader) {
            if (currentMode === "dich") {
                resHeader.textContent = "☯ QUẺ THÁI TUẾ LƯU NIÊN TRỰC QUÁI (TAB QUẺ DỊCH)";
            } else if (currentMode === "menh") {
                resHeader.textContent = "☯ QUẺ NHÂN MỆNH THÁI ẤT (VÀO ĐỜI & DỰNG NGHIỆP)";
            } else {
                resHeader.textContent = "☯ VẬN QUÁI THÁI ẤT (ĐẠI DU & TIỂU DU VẬN QUÁI)";
            }
        }

        // Render Vận Quái Thái Ất / Quẻ Dịch / Bàn Nhân Mệnh
        renderVanQuaiSection(data);

        // Tự động tạo ảnh PNG HD và cập nhật thẻ <img> trực tiếp cho mobile & PC
        if (typeof generateThaiAtPNG === "function") {
            generateThaiAtPNG(data);
        }
    } catch (err) {
        console.error("Lỗi khi render sa bàn Thái Ất:", err);
        alert("Có lỗi xảy ra khi tính toán dữ liệu sa bàn Thái Ất: " + (err?.message || err));
    }
}




function renderHexagramGraphic(title, subtitle, hexName, lines6, haoDong, accentColor) {
    const HANG_NAMES = ["Hào Sơ (1)", "Hào Nhị (2)", "Hào Tam (3)", "Hào Tứ (4)", "Hào Ngũ (5)", "Hào Thượng (6)"];
    let linesHtml = "";
    
    // Render from Hào Thượng (Index 5) down to Hào Sơ (Index 0)
    for (let i = 5; i >= 0; i--) {
        const lineVal = lines6[i]; // 1 = Yang, 0 = Yin
        const lineNum = i + 1; // 1..6
        const isDong = (lineNum === haoDong);
        const nameStr = HANG_NAMES[i];
        
        let lineBarHtml = "";
        if (lineVal === 1) {
            lineBarHtml = `<div class="hex-line-yang"></div>`;
        } else {
            lineBarHtml = `<div class="hex-line-yin"><div class="hex-line-yin-segment"></div><div class="hex-line-yin-segment"></div></div>`;
        }
        
        linesHtml += `
            <div class="hex-line-row ${isDong ? 'is-dong' : ''}">
                <span class="hex-line-name">${nameStr}</span>
                <div class="hex-line-bar-wrap">${lineBarHtml}</div>
                ${isDong ? `<span class="hex-dong-badge">🔥 Hào ${lineNum} Động</span>` : `<span style="width:75px;"></span>`}
            </div>
        `;
    }

    return `
        <div class="hexagram-ui-card" style="border-top: 4px solid ${accentColor}">
            <h4 class="hex-title" style="color: ${accentColor}">${title}</h4>
            <div class="hex-subtitle">${subtitle}</div>
            
            <div class="hexagram-lines-box">
                ${linesHtml}
            </div>

            <div style="text-align: center; padding: 10px; background: rgba(255,255,255,0.03); border-radius: 6px; border: 1px solid rgba(255,255,255,0.08);">
                <span style="font-size: 0.78rem; color: #a0aec0;">TRÙNG QUÁI HỢP THÀNH</span><br/>
                <span style="font-size: 1.25rem; font-weight: bold; color: #ffffff;">${hexName}</span><br/>
                <span style="font-size: 0.8rem; color: #ff4e50; font-weight: bold;">🔥 Đang ở Hào ${haoDong} Động</span>
            </div>
        </div>
    `;
}

// Populate Vận Quái Thái Ất (Đại Du, Tiểu Du & Thái Tuế Lưu Niên)
function renderVanQuaiSection(data) {
    const ldContent = document.getElementById("luan-doan-content");
    if (!ldContent) return;

    if (data.thaiTueData) {
        const tt = data.thaiTueData;
        const subtitle = `Tích Niên Thái Ất (${tt.tueTich}) chia 64 ➔ Quẻ thứ ${tt.queNum}/64 · ${tt.yearChiName} (${tt.isDuongYear ? 'Năm Dương' : 'Năm Âm'})`;
        
        const ttHtml = renderHexagramGraphic(
            "☯ QUẺ THÁI TUẾ LƯU NIÊN TRỰC QUÁI",
            subtitle,
            tt.hexName,
            tt.lines6,
            tt.haoDong,
            "#e74c3c"
        );

        ldContent.innerHTML = `
            <div style="max-width: 550px; margin: 0 auto;">
                ${ttHtml}
                <div style="margin-top: 15px; padding: 12px; background: rgba(231, 76, 60, 0.08); border-radius: 8px; border: 1px solid rgba(231, 76, 60, 0.3); font-size: 0.85rem; color: #e0e6ed; line-height: 1.6;">
                    <strong style="color: #e74c3c;">📜 Quy Tắc An Hào Động Thái Tuế Lưu Niên:</strong><br/>
                    ${tt.ruleText}
                </div>
            </div>
        `;
        return;
    }

    if (data.nhanMenhData) {
        const nm = data.nhanMenhData;

        const vaoDoiHtml = renderHexagramGraphic(
            "👶 QUẺ VÀO ĐỜI LẬP NGHIỆP",
            `Giai đoạn 1 – 45/50 tuổi · Quẻ thứ ${nm.queVaoDoiNum}/64`,
            nm.hexVaoDoiName,
            nm.lines6VaoDoi,
            nm.haoDongVaoDoi,
            "#e67e22"
        );

        const dungNghiepHtml = renderHexagramGraphic(
            "🏛️ QUẺ HẠN DỰNG NGHIỆP",
            `Biến Quái từ Hào ${nm.haoDongVaoDoi} Động · Giai đoạn 45/50 tuổi về sau`,
            nm.hexDungNghiepName,
            nm.lines6DungNghiep,
            0,
            "#2ecc71"
        );

        const namHtml = renderHexagramGraphic(
            "📅 QUẺ LƯU NIÊN (NĂM XEM)",
            `Tuổi mụ ${nm.tuoiMu} tuổi · Quẻ thứ ${nm.queNamNum}/64`,
            nm.hexNamName,
            nm.lines6Nam,
            0,
            "#9b59b6"
        );

        ldContent.innerHTML = `
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px;">
                ${vaoDoiHtml}
                ${dungNghiepHtml}
                ${namHtml}
            </div>
            <div style="margin-top: 20px; padding: 15px; background: rgba(15, 20, 42, 0.9); border-radius: 8px; border: 1px solid rgba(212, 175, 55, 0.3); font-size: 0.85rem; color: #e0e6ed; line-height: 1.8;">
                <h4 style="color: var(--gold); margin-bottom: 8px; font-family: 'Be Vietnam Pro', 'Inter', sans-serif;">📜 THÔNG TIN NẠP GIÁP & THAI NGUYÊN BÀN NHÂN MỆNH</h4>
                <ul style="list-style: none; padding-left: 0;">
                    <li><strong>🔹 Tổng số Nạp Âm Nạp Giáp Tứ Trụ:</strong> ${nm.sumTuTru} (+ 55 Đại Diễn = ${nm.sumTuTru + 55}) ➔ Quẻ Vào Đời thứ <strong>${nm.queVaoDoiNum} (${nm.hexVaoDoiName})</strong></li>
                    <li><strong>🔹 Ngày Chịu Khí (Thai Nguyên):</strong> Ngày + Giờ = ${nm.sumNgayGio} ➔ Số Hạn = <strong>${nm.soHan}</strong>. Lùi ${nm.soHan} bước từ Ngày sinh ➔ <strong>Ngày Chịu Khí: ${nm.thaiNguyenCanChi}</strong> (${nm.thaiNguyenChiName} - ${nm.isDuongThai ? 'Dương' : 'Âm'})</li>
                    <li><strong>🔹 Hào Động Quẻ Vào Đời:</strong> ${nm.thaiNguyenRuleText}</li>
                    <li><strong>🔹 Quẻ Hạn Dựng Nghiệp:</strong> Hào ${nm.haoDongVaoDoi} Quẻ Vào Đời động biến ➔ Quẻ thứ <strong>${nm.queDungNghiepNum} (${nm.hexDungNghiepName})</strong></li>
                </ul>
            </div>
        `;
        return;
    }

    if (data.luanDoanData && data.luanDoanData.daiTieuDu) {
        const du = data.luanDoanData.daiTieuDu;

        const ddSubtitle = `Nội ${du.ddNoiQuai} (Năm ${du.ddNoiDu + 1}/36) · Ngoại ${du.ddNgoaiQuai} (Năm ${du.ddNgoaiDu + 1}/10)`;
        const tdSubtitle = `Nội ${du.tdNoiQuai} (Năm ${du.tdNoiDu + 1}/24) · Ngoại ${du.tdNgoaiQuai} (Năm ${du.tdNgoaiDu + 1}/3)`;

        const ddHtml = renderHexagramGraphic(
            "📜 ĐẠI DU VẬN QUÁI",
            ddSubtitle,
            du.ddTrungQuai,
            du.ddLines6,
            du.ddHaoDong,
            "var(--gold)"
        );

        const tdHtml = renderHexagramGraphic(
            "📜 TIỂU DU VẬN QUÁI",
            tdSubtitle,
            du.tdTrungQuai,
            du.tdLines6,
            du.tdHaoDong,
            "#00d2ff"
        );

        const vanQuaiReportHtml = typeof generateVanQuaiAnalysisReport === "function" ? generateVanQuaiAnalysisReport(du) : "";

        ldContent.innerHTML = `
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 20px;">
                ${ddHtml}
                ${tdHtml}
            </div>
            ${vanQuaiReportHtml}
        `;
    } else {
        ldContent.innerHTML = "<p><em>Không có dữ liệu Vận Quái cho chế độ này.</em></p>";
    }
}

// ========================================
// BẢNG TRA CỨU Ý NGHĨA (Render on DOMContentLoaded)
// ========================================
let refTablesRendered = false;
function renderReferenceTables() {
    if (refTablesRendered || typeof THAI_AT_REFERENCE === 'undefined') return;
    refTablesRendered = true;
    const ref = THAI_AT_REFERENCE;
    
    // 16 Cung
    const cungEl = document.getElementById("ref-cung-table");
    if (cungEl && ref.CUNG_MEANINGS) {
        const isObj = !Array.isArray(ref.CUNG_MEANINGS);
        const entries = isObj ? Object.entries(ref.CUNG_MEANINGS) : ref.CUNG_MEANINGS.map(c => [c.name, c]);
        cungEl.innerHTML = entries.map(([key, val]) => {
            const text = typeof val === 'string' ? val : `${val.alias || ''}: ${val.element || ''}, ${val.palace || ''}. ${val.month || ''}. ${val.meaning || ''}`;
            return `<div style="margin-bottom:8px; padding:6px 10px; border-left:3px solid var(--gold); background:rgba(255,215,0,0.05);">
                <strong style="color:var(--gold);">${key}</strong> — ${text}
            </div>`;
        }).join("");
    }
    
    // Sao, Tướng, Thần
    const starEl = document.getElementById("ref-star-table");
    if (starEl && ref.STAR_MEANINGS) {
        const isObj = !Array.isArray(ref.STAR_MEANINGS);
        const entries = isObj ? Object.entries(ref.STAR_MEANINGS) : ref.STAR_MEANINGS.map(s => [s.name, s]);
        starEl.innerHTML = entries.map(([key, val]) => {
            const text = typeof val === 'string' ? val : `(${val.element || ''}) ${val.meaning || ''}`;
            return `<div style="margin-bottom:6px; padding:4px 10px; border-left:3px solid var(--color-hoa); background:rgba(255,100,50,0.03);">
                <strong style="color:var(--color-hoa);">${key}</strong> — ${text}
            </div>`;
        }).join("");
    }
    
    // Bát Môn
    const bmEl = document.getElementById("ref-batmon-table");
    if (bmEl && ref.BAT_MON_DETAIL) {
        const isObj = !Array.isArray(ref.BAT_MON_DETAIL);
        const entries = isObj ? Object.entries(ref.BAT_MON_DETAIL) : ref.BAT_MON_DETAIL.map(m => [m.name, m]);
        bmEl.innerHTML = entries.map(([key, val]) => {
            const text = typeof val === 'string' ? val : `${val.alias || ''}: ${val.meaning || ''}`;
            return `<div style="margin-bottom:6px; padding:4px 10px; border-left:3px solid var(--color-thuy); background:rgba(0,150,255,0.03);">
                <strong style="color:var(--color-thuy);">Cửa ${key}</strong> — ${text}
            </div>`;
        }).join("");
    }
    
    // 11 Cách Cục
    const ccEl = document.getElementById("ref-cachcuc-table");
    if (ccEl && ref.CACH_CUC) {
        const isObj = !Array.isArray(ref.CACH_CUC);
        const entries = isObj ? Object.entries(ref.CACH_CUC) : ref.CACH_CUC.map(c => [c.name, c]);
        ccEl.innerHTML = entries.map(([key, val]) => {
            const text = typeof val === 'string' ? val : `${val.condition || ''} — ${val.meaning || ''}`;
            return `<div style="margin-bottom:6px; padding:4px 10px; border-left:3px solid #ff4444; background:rgba(255,0,0,0.03);">
                <strong style="color:#ff4444;">${key}</strong> — ${text}
            </div>`;
        }).join("");
    }
    
    // 64 Quẻ
    const hexEl = document.getElementById("ref-hexagram-table");
    if (hexEl && ref.HEXAGRAM_BRIEF) {
        const isObj = !Array.isArray(ref.HEXAGRAM_BRIEF);
        const entries = isObj ? Object.entries(ref.HEXAGRAM_BRIEF) : ref.HEXAGRAM_BRIEF.map((h, i) => [`${i+1}. ${h.name}`, h]);
        hexEl.innerHTML = '<div style="display:grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap:6px;">' +
            entries.map(([key, val]) => {
                const text = typeof val === 'string' ? val : val.meaning || '';
                return `<div style="padding:4px 8px; border-left:2px solid var(--gold); background:rgba(255,215,0,0.03);">
                    <strong style="color:var(--gold);">${key}</strong> — ${text}
                </div>`;
            }).join("") + '</div>';
    }
}

// Gọi khi DOM sẵn sàng
document.addEventListener("DOMContentLoaded", () => {
    setTimeout(renderReferenceTables, 100);
    
    // Nút AI Luận Giải
    const btnAi = document.getElementById("btn-ai-luan-giai");
    const aiModal = document.getElementById("ai-luan-giai-modal");
    const aiContent = document.getElementById("ai-luan-giai-content");
    const btnCopy = document.getElementById("btn-copy-luan-giai");
    
    // Universal Mobile & Desktop Copy Function (iOS Safari / Android / iPad / PC)
    async function copyTextToClipboardUniversal(text) {
        let copied = false;

        // Strategy 1: Try navigator.clipboard if in secure context
        if (navigator.clipboard && window.isSecureContext) {
            try {
                await navigator.clipboard.writeText(text);
                copied = true;
            } catch (err) {
                console.warn("navigator.clipboard.writeText failed, switching to mobile fallback...", err);
            }
        }

        // Strategy 2: iOS Safari & Android Compatible Textarea Fallback
        if (!copied) {
            const textarea = document.createElement("textarea");
            textarea.value = text;
            textarea.style.fontSize = "16px"; // Prevent iOS viewport zoom
            textarea.style.border = "0";
            textarea.style.padding = "0";
            textarea.style.margin = "0";
            textarea.style.position = "fixed";
            textarea.style.left = "-9999px";
            textarea.style.top = "0";

            const isIOS = navigator.userAgent.match(/ipad|iphone|ipod/i);
            if (isIOS) {
                textarea.contentEditable = "true";
                textarea.readOnly = false;
            } else {
                textarea.setAttribute("readonly", "");
            }

            document.body.appendChild(textarea);

            if (isIOS) {
                const range = document.createRange();
                range.selectNodeContents(textarea);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
                textarea.setSelectionRange(0, 999999);
            } else {
                textarea.focus();
                textarea.select();
            }

            try {
                copied = document.execCommand("copy");
            } catch (err) {
                console.error("execCommand copy error:", err);
                copied = false;
            }

            document.body.removeChild(textarea);
        }

        return copied;
    }

    // Copy button logic
    if (btnCopy && aiContent) {
        btnCopy.addEventListener("click", async () => {
            try {
                // Extract plain text from the HTML content
                const tempDiv = document.createElement("div");
                tempDiv.innerHTML = aiContent.innerHTML;
                const plainText = tempDiv.innerText || tempDiv.textContent || "";
                
                if (!plainText.trim()) {
                    alert("Không có nội dung để sao chép.");
                    return;
                }

                const ok = await copyTextToClipboardUniversal(plainText);
                
                if (ok) {
                    // Visual feedback
                    const originalText = btnCopy.innerHTML;
                    btnCopy.innerHTML = "✅ Đã chép!";
                    btnCopy.style.background = "rgba(76,175,80,0.3)";
                    btnCopy.style.borderColor = "#4CAF50";
                    btnCopy.style.color = "#4CAF50";
                    setTimeout(() => {
                        btnCopy.innerHTML = originalText;
                        btnCopy.style.background = "";
                        btnCopy.style.borderColor = "";
                        btnCopy.style.color = "";
                    }, 2200);
                } else {
                    alert("Không thể tự động sao chép. Vui lòng đè giữ chọn văn bản để sao chép thủ công.");
                }
            } catch (e) {
                alert("Không thể sao chép. Vui lòng chọn văn bản và sao chép thủ công.");
            }
        });
    }

    if (btnAi && aiModal && aiContent) {
        btnAi.addEventListener("click", async () => {
            if (!window.lastCalculatedThaiAtData) {
                alert("Vui lòng khởi quẻ trước khi luận giải AI!");
                return;
            }
            
            // Hide copy button while loading
            if (btnCopy) btnCopy.style.display = "none";
            
            aiModal.style.display = "flex";
            aiContent.innerHTML = `<div style="text-align:center; padding:40px;">
                <span class="spinner" style="border-top-color:var(--gold); display:inline-block; margin-bottom:15px;"></span><br/>
                <strong style="color:var(--gold); font-size:1.1rem;">Hệ thống AI đang phân tích sa bàn...</strong><br/>
                <span style="color:#aaa; font-size:0.9rem; margin-top:10px; display:block;">Đang luận giải theo 72 Khối Dương, Bát Môn, Toán Chủ-Khách. Chờ khoảng 15-30 giây.</span>
            </div>`;
            
            try {
                const d = window.lastCalculatedThaiAtData;
                
                // Build star positions safely
                let stars = [];
                if (d.placement && typeof d.placement === 'object') {
                    stars = Object.entries(d.placement)
                        .map(([cung, starArr]) => ({
                            cung,
                            stars: Array.isArray(starArr) ? starArr.map(s => s.name || s) : []
                        }))
                        .filter(c => c.stars.length > 0);
                }

                const payload = {
                    mode: d.modeName || 'Tuế Kế',
                    khoiSo: d.khoiSo,
                    tinhChatKhoi: d.tinhChatKhoi,
                    batMon: d.batMon,
                    cuuTinh: d.cuuTinh,
                    donCucName: d.donCucName,
                    tuTruStr: d.tuTru ? d.tuTru.fullString : '',
                    solarTerm: d.solarTerm || '',
                    toanDinh: d.toanDinhGoc || d.toanDinh,
                    toanChu: d.toanChuGoc || d.toanChu || d.luanDoanData?.toanChu,
                    toanKhach: d.toanKhachGoc || d.toanKhach || d.luanDoanData?.toanKhach,
                    batHung: d.batHung || 'Không thuộc Bát Hung.',
                    verdict: d.verdict || '',
                    stars
                };
                
                // Fetch with timeout
                const controller = new AbortController();
                const fetchTimeout = setTimeout(() => controller.abort(), 55000);
                
                const response = await fetch('/api/thai_at_llm', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload),
                    signal: controller.signal
                });
                clearTimeout(fetchTimeout);
                
                const result = await response.json().catch(() => null);
                
                if (!response.ok) {
                    const errMsg = result?.error || `HTTP ${response.status}`;
                    throw new Error(errMsg);
                }
                
                if (!result || !result.html) {
                    throw new Error("AI không trả về kết quả. Vui lòng thử lại.");
                }
                
                // Sanitize AI response to prevent XSS
                const sanitizeHtml = (html) => {
                    const tmp = document.createElement('div');
                    tmp.innerHTML = html;
                    tmp.querySelectorAll('script,iframe,object,embed,form,input,link,meta').forEach(el => el.remove());
                    tmp.querySelectorAll('*').forEach(el => {
                        [...el.attributes].forEach(attr => {
                            if (attr.name.startsWith('on') || attr.value.trim().toLowerCase().startsWith('javascript:')) {
                                el.removeAttribute(attr.name);
                            }
                        });
                    });
                    return tmp.innerHTML;
                };
                aiContent.innerHTML = sanitizeHtml(result.html);
                
                // Show copy button after successful load
                if (btnCopy) btnCopy.style.display = "inline-block";
                
            } catch (err) {
                let msg = err.message;
                if (err.name === 'AbortError') {
                    msg = "Quá thời gian chờ (>55 giây). Máy chủ AI đang quá tải, vui lòng thử lại sau.";
                }
                const safeMsg = msg.replace(/</g, '&lt;').replace(/>/g, '&gt;');
                aiContent.innerHTML = `<div style="color:#ff4444; padding:20px; text-align:center;">
                    <strong>⚠️ Lỗi</strong><br/><br/>
                    <span style="font-size:0.9rem;">${safeMsg}</span><br/><br/>
                    <button onclick="document.getElementById('btn-ai-luan-giai').click(); document.getElementById('ai-luan-giai-modal').style.display='none';" 
                            style="background:rgba(212,175,55,0.2); border:1px solid var(--gold); color:var(--gold); padding:8px 20px; border-radius:4px; cursor:pointer; margin-top:10px;">
                        🔄 Thử lại
                    </button>
                </div>`;
            }
        });
    }
});
