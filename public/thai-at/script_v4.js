/**
 * Thai At Application Controller
 * Handles UI events, 6-mode switching, timeline slider, 16-cell rendering (>= 6 lines/cell)
 */

let currentMode = "tue";

document.addEventListener("DOMContentLoaded", () => {
    const now = new Date();
    document.getElementById("input-date").value = now.toISOString().split("T")[0];
    document.getElementById("input-time").value = now.toTimeString().substring(0, 5);

    // 6 Mode Navigation Tab Buttons
    document.querySelectorAll(".nav-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            document.querySelectorAll(".nav-btn").forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            currentMode = btn.getAttribute("data-mode");
            castChart();
        });
    });

    // Form Submit
    document.getElementById("control-form").addEventListener("submit", (e) => {
        e.preventDefault();
        castChart();
    });

    // Initial render
    castChart();
});

function castChart() {
    try {
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
        const data = calculateThaiAtChart(currentMode, year, month, day, hour);
        window.lastCalculatedThaiAtData = data;

    // Update header line
    document.getElementById("chart-datetime-header").innerHTML =
        `Năm Tháng Ngày Giờ (Dương Lịch): <span style="font-weight:normal">${data.tuTru.solarDate}</span>`;

    // Update sidebar info
    document.getElementById("info-mode-name").textContent = data.modeName;
    document.getElementById("info-solar-term").textContent = data.solarTerm;
    document.getElementById("info-cuc-name").textContent = data.donCucName;
    document.getElementById("info-khoi-name").textContent = (data.khoiSo !== undefined ? "Khối " + data.khoiSo + " (" + data.tinhChatKhoi + ")" : "-");
    document.getElementById("info-mon-name").textContent = data.batMon;
    document.getElementById("info-tinh-name").textContent = data.cuuTinh;

    // Update Trung Cung
    document.getElementById("tc-tu-tru").textContent = data.tuTru.fullString;
    document.getElementById("tc-don-cuc").textContent = data.donCucName;
    document.getElementById("tc-tiet-khi").textContent = data.solarTerm;
    
    // Kế Đại, Kế Tiểu, Kế Định
    const tcKeDai = document.getElementById("tc-ke-dai");
    if (tcKeDai) tcKeDai.textContent = data.keDai !== undefined ? data.keDai.toLocaleString('vi-VN') : '-';
    const tcKeTieu = document.getElementById("tc-ke-tieu");
    if (tcKeTieu) tcKeTieu.textContent = data.keTieu !== undefined ? data.keTieu : '-';
    const tcKeDinh = document.getElementById("tc-ke-dinh");
    if (tcKeDinh) tcKeDinh.textContent = data.keDinh !== undefined ? data.keDinh : '-';

    document.getElementById("tc-bat-mon").textContent = data.batMon;
    document.getElementById("tc-cuu-tinh").textContent = data.cuuTinh;
    
    // Toán Chủ, Toán Khách, Toán Định (Số đã bỏ chục + Nguyên số chưa bỏ chục)
    document.getElementById("tc-toan-chu").textContent = data.toanChuGoc !== undefined ? `${data.toanChu} (Nguyên số: ${data.toanChuGoc})` : data.toanChu;
    document.getElementById("tc-toan-khach").textContent = data.toanKhachGoc !== undefined ? `${data.toanKhach} (Nguyên số: ${data.toanKhachGoc})` : data.toanKhach;
    
    const tcToanDinh = document.getElementById("tc-toan-dinh");
    if (tcToanDinh) tcToanDinh.textContent = data.toanDinhGoc !== undefined ? `${data.toanDinh} (Nguyên số: ${data.toanDinhGoc})` : (data.toanDinh || '-');
    
    // Render Trung Cung stars
    const tcStars = data.placement["trung_cung"] || [];
    document.getElementById("tc-stars").innerHTML = tcStars.length > 0 
        ? tcStars.map(s => `<span class="star-tag ${s.class}">${s.name}</span>`).join(" ") 
        : "-";
        
    document.getElementById("tc-bat-hung").textContent = data.batHung;
    document.getElementById("tc-verdict").textContent = data.verdict;

const TRANG_THAI_KHI = {
    "kien": "Âm Tuyệt",
    "hoi": "Âm Thuần",
    "ty": "Dương Tạp",
    "suu": "Dương Tạp",
    "can": "Dương Thuần",
    "dan": "Dương Thuần",
    "mao": "Dương Tạp",
    "thin": "Dương Thuần",
    "ton": "Dương Tuyệt",
    "ty_chi": "Dương Tạp",
    "ngo": "Dương Thuần",
    "mui": "Âm Thuần",
    "khon": "Âm Tạp",
    "than": "Âm Tạp",
    "dau": "Âm Thuần",
    "tuat": "Âm Tạp"
};

const PHAN_DA_CUU_CUNG = {
    "kien": "Ký Châu",
    "hoi": "Ký Châu",
    "ngo": "Kinh Châu",
    "mui": "Kinh Châu",
    "suu": "Thanh Châu",
    "can": "Thanh Châu",
    "dan": "Thanh Châu",
    "mao": "Từ Châu",
    "thin": "Từ Châu",
    "trung_cung": "Dự Châu",
    "dau": "Ung Châu",
    "tuat": "Ung Châu",
    "khon": "Lương Châu",
    "than": "Lương Châu",
    "ty": "Duyên Châu",
    "ton": "Dương Châu",
    "ty_chi": "Dương Châu"
};

    // Render 16 outer cells
    THAP_LUC_THAN.forEach(than => {
        const cell = document.getElementById(`cell-${than.id}`);
        if (!cell) return;

        const stars = data.placement[than.id] || [];

        // Categorize stars into lines
        let mainHtml = "";
        let generalHtml = "";
        let baseHtml = "";
        let auxHtml = "";

        stars.forEach(s => {
            const tag = `<span class="star-tag ${s.class}">${s.name}</span>`;
            if (["thai-at", "van-xuong", "thuy-kich"].includes(s.class)) mainHtml += tag;
            else if (["chu-tuong", "khach-tuong"].includes(s.class)) generalHtml += tag;
            else if (["quan-co", "than-co", "dan-co", "ngu-phuc", "dai-du", "tieu-du"].includes(s.class)) baseHtml += tag;
            else auxHtml += tag;
        });

        const khi = TRANG_THAI_KHI[than.id] || "";
        const phanDa = PHAN_DA_CUU_CUNG[than.id] || "";

        cell.innerHTML = `
            <div class="cell-line-1">
                <span class="palace-title">${than.name.toUpperCase()}</span>
                <span class="palace-khi">${khi}</span>
            </div>
            <div class="cell-line-2">${than.alias} • ${phanDa}</div>
            <div class="cell-line-3">${mainHtml || ''}</div>
            <div class="cell-line-4">${generalHtml || ''}</div>
            <div class="cell-line-5">${baseHtml || ''}</div>
            <div class="cell-line-6 aux-stars">${auxHtml || ''}</div>
        `;
    });

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
        if (data.movingStars && data.movingStars.length > 0) {
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

    // Ẩn/Hiện khung sa bàn 16 cung, các nút luận giải và bản đồ cửu châu cho tab Quẻ Dịch & Bàn Nhân Mệnh
    const isNoSaBanMode = (currentMode === "dich" || currentMode === "menh");

    const matrixGrid = document.querySelector(".matrix-grid");
    if (matrixGrid) {
        matrixGrid.style.display = isNoSaBanMode ? "none" : "grid";
    }

    const analysisSec = document.getElementById("analysis-accordion-section");
    if (analysisSec) {
        analysisSec.style.display = isNoSaBanMode ? "none" : "block";
    }

    const phanDaSec = document.getElementById("phan-da-map-section");
    if (phanDaSec) {
        phanDaSec.style.display = isNoSaBanMode ? "none" : "block";
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
        alert("Có lỗi xảy ra khi tính toán dữ liệu sa bàn Thái Ất!");
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
                <h4 style="color: var(--gold); margin-bottom: 8px; font-family: 'Cinzel', serif;">📜 THÔNG TIN NẠP GIÁP & THAI NGUYÊN BÀN NHÂN MỆNH</h4>
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
    
    if (btnAi && aiModal && aiContent) {
        btnAi.addEventListener("click", async () => {
            if (!window.currentThaiAtData) {
                alert("Vui lòng khởi quẻ trước khi luận giải AI!");
                return;
            }
            
            aiModal.style.display = "flex";
            aiContent.innerHTML = `<div style="text-align:center; padding:40px;"><span class="spinner" style="border-top-color:var(--gold); display:inline-block; margin-bottom:15px;"></span><br/><strong style="color:var(--gold); font-size:1.1rem;">Hệ thống AI đang xem xét thiên tượng, tính toán điểm rơi...</strong><br/><span style="color:#aaa; font-size:0.9rem; margin-top:10px; display:block;">Quá trình này kết hợp tìm kiếm tin tức thời sự hiện tại để dự báo vĩ mô, vui lòng chờ khoảng 10-15 giây.</span></div>`;
            
            try {
                // Prepare minimal payload
                const payload = {
                    mode: window.currentThaiAtData.modeName,
                    khoiSo: window.currentThaiAtData.khoiSo,
                    tinhChatKhoi: window.currentThaiAtData.tinhChatKhoi,
                    batMon: window.currentThaiAtData.batMon,
                    cuuTinh: window.currentThaiAtData.cuuTinh,
                    donCucName: window.currentThaiAtData.donCucName,
                    toanDinh: window.currentThaiAtData.toanDinhGoc,
                    toanChu: window.currentThaiAtData.luanDoanData?.toanChu,
                    toanKhach: window.currentThaiAtData.luanDoanData?.toanKhach,
                    stars: Object.entries(window.currentThaiAtData.placement).map(([cung, stars]) => ({
                        cung,
                        stars: stars.map(s => s.name)
                    })).filter(c => c.stars.length > 0)
                };
                
                const response = await fetch('/api/thai_at_llm', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });
                
                if (!response.ok) throw new Error("Lỗi kết nối Hệ thống AI.");
                const data = await response.json();
                
                aiContent.innerHTML = data.html || `<div style="color:white;">${data.text.replace(/\\n/g, '<br/>')}</div>`;
                
            } catch (err) {
                aiContent.innerHTML = `<div style="color:#ff4444; padding:20px; text-align:center;">Lỗi: ${err.message}. Vui lòng thử lại sau.</div>`;
            }
        });
    }
});
