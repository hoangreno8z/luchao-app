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

    function renderChart() {
        const name = nameInput.value.trim() || "VÔ DANH KHÁCH";
        const gender = genderInput.value;
        const dateVal = dateInput.value || "1990-02-01";
        const timeVal = timeInput.value || "01:00";

        const [yStr, mStr, dStr] = dateVal.split("-");
        const [hStr, minStr] = timeVal.split(":");

        const year = parseInt(yStr, 10);
        const month = parseInt(mStr, 10);
        const day = parseInt(dStr, 10);
        const hour = parseInt(hStr, 10);
        const minute = parseInt(minStr, 10);

        try {
            const is100Years = toggle100Years ? toggle100Years.checked : false;
            currentBatTuData = window.BatTuEngine.calculateBatTu(year, month, day, hour, minute, gender, name);
            
            if (imgMount && window.BatTuPngExporter) {
                const dataUrl = window.BatTuPngExporter.generateChartDataUrl(currentBatTuData, is100Years);
                imgMount.src = dataUrl;
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
