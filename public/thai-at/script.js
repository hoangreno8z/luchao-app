/**
 * Thai At Application Controller
 * Handles UI events, 6-mode switching, timeline slider, 16-cell rendering (>= 6 lines/cell)
 */

let currentMode = "tue";

document.addEventListener("DOMContentLoaded", () => {
    const now = new Date();
    document.getElementById("input-date").value = now.toISOString().split("T")[0];
    document.getElementById("input-time").value = now.toTimeString().substring(0, 5);

    // Mode Nav Buttons
    document.querySelectorAll(".nav-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            document.querySelectorAll(".nav-btn").forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            currentMode = btn.getAttribute("data-mode");
            document.getElementById("select-mode").value = currentMode;
            castChart();
        });
    });

    // Select Dropdown Sync
    document.getElementById("select-mode").addEventListener("change", (e) => {
        currentMode = e.target.value;
        document.querySelectorAll(".nav-btn").forEach(b => {
            b.classList.toggle("active", b.getAttribute("data-mode") === currentMode);
        });
        castChart();
    });

    // Form Submit
    document.getElementById("control-form").addEventListener("submit", (e) => {
        e.preventDefault();
        castChart();
    });

    // Timeline Slider
    const slider = document.getElementById("timeline-slider");
    const sliderLabel = document.getElementById("slider-val-label");
    slider.addEventListener("input", (e) => {
        const val = parseInt(e.target.value);
        if (val === 0) sliderLabel.textContent = "Hiện tại";
        else if (Math.abs(val) < 30) sliderLabel.textContent = val > 0 ? `+${val} Ngày` : `${val} Ngày`;
        else sliderLabel.textContent = val > 0 ? `+${Math.round(val/30)} Tháng` : `${Math.round(val/30)} Tháng`;

        const baseDate = document.getElementById("input-date").value;
        if (baseDate) {
            const parts = baseDate.split("-");
            const d = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
            d.setDate(d.getDate() + val);
            renderWithDate(d);
        }
    });

    // Initial render
    castChart();
});

function castChart() {
    const dInput = document.getElementById("input-date").value;
    const tInput = document.getElementById("input-time").value;
    if (!dInput || !tInput) return;
    const [y, m, d] = dInput.split("-").map(Number);
    const h = parseInt(tInput.split(":")[0]);
    render(y, m, d, h);
}

function renderWithDate(dObj) {
    const tInput = document.getElementById("input-time").value || "12:00";
    const h = parseInt(tInput.split(":")[0]);
    render(dObj.getFullYear(), dObj.getMonth() + 1, dObj.getDate(), h);
}

function render(year, month, day, hour) {
    const data = calculateThaiAtChart(currentMode, year, month, day, hour);

    // Update header line
    document.getElementById("chart-datetime-header").innerHTML =
        `Năm Tháng Ngày Giờ (Dương Lịch): <span style="font-weight:normal">${data.tuTru.solarDate}</span>`;

    // Update sidebar info
    document.getElementById("info-mode-name").textContent = data.modeName;
    document.getElementById("info-solar-term").textContent = data.solarTerm;
    document.getElementById("info-cuc-name").textContent = data.donCucName;
    document.getElementById("info-mon-name").textContent = data.batMon;
    document.getElementById("info-tinh-name").textContent = data.cuuTinh;

    // Update Trung Cung
    document.getElementById("tc-tu-tru").textContent = data.tuTru.fullString;
    document.getElementById("tc-don-cuc").textContent = data.donCucName;
    document.getElementById("tc-tiet-khi").textContent = data.solarTerm;
    document.getElementById("tc-bat-mon").textContent = data.batMon;
    document.getElementById("tc-cuu-tinh").textContent = data.cuuTinh;
    
    // Render Trung Cung stars
    const tcStars = data.placement["trung_cung"] || [];
    document.getElementById("tc-stars").innerHTML = tcStars.length > 0 
        ? tcStars.map(s => `<span class="star-tag ${s.class}">${s.name}</span>`).join(" ") 
        : "-";
        
    document.getElementById("tc-bat-hung").textContent = data.batHung;
    document.getElementById("tc-verdict").textContent = data.verdict;

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

        cell.innerHTML = `
            <div class="cell-line-1">
                <span>${than.name.toUpperCase()}</span>
                <span>(${than.palaceNum})</span>
            </div>
            <div class="cell-line-2">${than.direction} • ${than.element}</div>
            <div class="cell-line-3">${mainHtml || '<span class="text-muted">Thần chính: —</span>'}</div>
            <div class="cell-line-4">${generalHtml || '<span class="text-muted">Tướng binh: —</span>'}</div>
            <div class="cell-line-5">${baseHtml || '<span class="text-muted">Cơ/Phúc/Du: —</span>'}</div>
            <div class="cell-line-6 aux-stars">${auxHtml || `<span class="text-muted">Cửa: ${data.batMon}</span>`}</div>
        `;
    });
}
