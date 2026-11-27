/**
 * Script điều khiển Giao diện Bát Tự Tứ Trụ — Dịch Sư Nguyễn Huy Hoàng
 */

document.addEventListener("DOMContentLoaded", () => {
    let currentBatTuData = null;

    const form = document.getElementById("battu-form");
    const nameInput = document.getElementById("inp-name");
    const genderInput = document.getElementById("inp-gender");
    const dateInput = document.getElementById("inp-date");
    const timeInput = document.getElementById("inp-time");
    const imgMount = document.getElementById("battuImageMount");
    const btnDownload = document.getElementById("btn-download-png");
    const refContent = document.getElementById("ref-content");
    const tabBtns = document.querySelectorAll(".ref-tab-btn");
    const toggle100Years = document.getElementById("toggle-100-years");

    if (toggle100Years) {
        toggle100Years.addEventListener("change", () => {
            renderChart();
        });
    }

    async function renderChart() {
        const name = nameInput.value.trim() || "VÔ DANH KHÁCH";
        const gender = genderInput.value;
        const timeVal = timeInput.value || "01:00";
        const [hStr, minStr] = timeVal.split(":");
        const hour = parseInt(hStr, 10);
        const minute = parseInt(minStr, 10);
        const is100Years = toggle100Years ? toggle100Years.checked : false;

        const calToggle = document.getElementById("battuCalendarToggle");
        const leapToggle = document.getElementById("battuLeapToggle");
        const leapRow = document.getElementById("battuLeapRow");
        const isLunarInput = calToggle ? calToggle.checked : false;
        const isLeapInput = (isLunarInput && leapToggle && (!leapRow || !leapRow.hidden)) ? leapToggle.checked : false;

        const VnCal = window.VnLunarCalendar;
        let year, month, day;

        if (isLunarInput) {
            const lDay = parseInt(document.getElementById("inp-lunar-day")?.value, 10);
            const lMonth = parseInt(document.getElementById("inp-lunar-month")?.value, 10);
            const lYear = parseInt(document.getElementById("inp-lunar-year")?.value, 10);
            if (!VnCal) {
                alert("Chưa tải được bộ lịch Âm Dương Việt Nam.");
                return;
            }
            try {
                const converted = VnCal.convertLunar2Solar(lDay, lMonth, lYear, isLeapInput, 7);
                day = converted.day;
                month = converted.month;
                year = converted.year;
                // Đồng bộ ngược lại ô date Dương lịch để dữ liệu luôn thống nhất
                const pad2 = n => (n < 10 ? "0" + n : String(n));
                dateInput.value = `${year}-${pad2(month)}-${pad2(day)}`;
            } catch (err) {
                alert(err.message);
                return;
            }
        } else {
            const dateVal = dateInput.value || "1990-02-01";
            const [yStr, mStr, dStr] = dateVal.split("-");
            year = parseInt(yStr, 10);
            month = parseInt(mStr, 10);
            day = parseInt(dStr, 10);

            // Kiểm tra ngày dương lịch hợp lệ (chặn tháng 2 thiếu ngày 29/30/31, tháng 30 ngày...)
            if (VnCal && !VnCal.isValidSolarDate(day, month, year)) {
                const maxDay = (month >= 1 && month <= 12) ? VnCal.daysInSolarMonth(month, year) : 31;
                alert(`Ngày dương lịch không hợp lệ: ${day}/${month}/${year}.\nTháng ${month}/${year} chỉ có tối đa ${maxDay} ngày.`);
                return;
            }
        }

        const payload = {
            year,
            month,
            day,
            hour,
            minute,
            gender,
            name
        };

        try {
            const response = await fetch('/api/bat_tu', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                currentBatTuData = await response.json();
                if (imgMount && window.BatTuPngExporter) {
                    const dataUrl = window.BatTuPngExporter.generateChartDataUrl(currentBatTuData, is100Years);
                    imgMount.src = dataUrl;
                }
                return;
            }
        } catch (apiErr) {
            console.warn('API /api/bat_tu fallback to local engine:', apiErr);
        }

        // Local Fallback if serverless is unavailable
        try {
            if (window.BatTuEngine) {
                currentBatTuData = window.BatTuEngine.calculateBatTu(year, month, day, hour, minute, gender, name);
                if (imgMount && window.BatTuPngExporter) {
                    const dataUrl = window.BatTuPngExporter.generateChartDataUrl(currentBatTuData, is100Years);
                    imgMount.src = dataUrl;
                }
            }
        } catch (err) {
            console.error("Lỗi khi lập lá số Bát Tự:", err);
            alert("Có lỗi khi lập lá số: " + err.message);
        }
    }

    // Form Submit Event
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        renderChart();
    });

    // Download PNG Button
    if (btnDownload) {
        btnDownload.addEventListener("click", () => {
            if (!currentBatTuData || !window.BatTuPngExporter) return;
            const is100Years = toggle100Years ? toggle100Years.checked : false;
            const cleanName = (nameInput.value.trim() || "VoDanh").replace(/\s+/g, "_");
            window.BatTuPngExporter.exportToPng(currentBatTuData, is100Years, `La_So_Bat_Tu_${cleanName}.png`);
        });
    }

    // Reference Dictionary Tabs
    function loadRefTab(tabId) {
        if (!window.BatTuReference) return;
        const ref = window.BatTuReference;
        let html = "";

        if (tabId === "thap-than") {
            const list = ref.THAP_THAN_MEANINGS || {};
            for (const key in list) {
                const item = list[key];
                html += `
                    <div class="ref-item">
                        <div class="ref-item-title">🔹 ${item.name}</div>
                        <div class="ref-item-desc">
                            <p><strong>Tính chất:</strong> ${item.nature}</p>
                            <p><strong>Tượng trưng:</strong> ${item.symbol}</p>
                            <p><strong>Ý nghĩa mệnh lý:</strong> ${item.meaning}</p>
                        </div>
                    </div>
                `;
            }
        } else if (tabId === "than-sat") {
            const list = ref.THAN_SAT_MEANINGS || {};
            for (const key in list) {
                const item = list[key];
                html += `
                    <div class="ref-item">
                        <div class="ref-item-title">⭐ ${item.name} <span style="font-size:0.82rem; color:#A0AEC0; font-weight:normal;">(${item.type})</span></div>
                        <div class="ref-item-desc">
                            <p>${item.meaning}</p>
                        </div>
                    </div>
                `;
            }
        } else if (tabId === "nap-am") {
            const list = ref.NAYIN_MEANINGS || {};
            for (const key in list) {
                html += `
                    <div class="ref-item" style="padding-bottom: 8px; margin-bottom: 8px;">
                        <span style="color: #ffd700; font-weight: bold; min-width: 140px; display: inline-block;">🌿 ${key}:</span>
                        <span style="color: #e2e8f0;">${list[key]}</span>
                    </div>
                `;
            }
        }

        refContent.innerHTML = html;
    }

    tabBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            tabBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            loadRefTab(btn.getAttribute("data-tab"));
        });
    });

    // Default values like example (1990-02-01, 01:00)
    dateInput.value = "1990-02-01";
    timeInput.value = "01:00";

    // Initial Load
    renderChart();
    loadRefTab("thap-than");
});
