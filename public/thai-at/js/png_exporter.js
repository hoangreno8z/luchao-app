/**
 * PNG Exporter for Thai At Sa Ban — v3.6 (Direct High-Fidelity 5x5 Matrix Capture)
 * 
 * Captures exact 16-cell Sa Ban + Trung Cung DOM using html2canvas.
 * Sets the DataURL directly on the <img> tag and direct <a> download link.
 * Supports iOS, Android, iPad, MacBook & PC with 100% reliability.
 */

function generateThaiAtPNG() {
    const captureTarget = document.getElementById("thai-at-chart-capture");
    const imgElement = document.getElementById("thai-at-chart-img");
    const downloadBtn = document.getElementById("btn-download-direct");
    const loaderElement = document.getElementById("chart-img-loader");

    if (!captureTarget) return;

    if (loaderElement) loaderElement.style.display = "flex";

    // 350ms delay to ensure all DOM layout, CSS styles, and fonts are fully computed
    setTimeout(() => {
        if (typeof html2canvas !== "function") {
            console.warn("Thư viện html2canvas chưa được tải.");
            if (loaderElement) loaderElement.style.display = "none";
            return;
        }

        const dpr = window.devicePixelRatio || 2;
        const scaleVal = Math.min(Math.max(dpr * 1.5, 2.5), 3);

        html2canvas(captureTarget, {
            scale: scaleVal,
            useCORS: true,
            allowTaint: true,
            backgroundColor: "#050711",
            logging: false,
            scrollX: 0,
            scrollY: 0,
            ignoreElements: (element) => element.tagName === 'LINK' && element.rel === 'stylesheet' && element.href.includes('fonts.googleapis'),
            onclone: (clonedDoc) => {
                const cap = clonedDoc.getElementById("thai-at-chart-capture");
                if (!cap) return;

                cap.style.width = "1200px";
                cap.style.minWidth = "1200px";
                cap.style.padding = "24px";
                cap.style.boxSizing = "border-box";
                cap.style.backgroundColor = "#050711";
                cap.style.borderRadius = "16px";
                cap.style.border = "2px solid rgba(212, 175, 55, 0.4)";
                cap.style.overflow = "visible";

                clonedDoc.querySelectorAll("*").forEach(el => {
                    if (el.style) {
                        el.style.backdropFilter = "none";
                        el.style.webkitBackdropFilter = "none";
                    }
                });
            }
        }).then(canvas => {
            const imgDataUrl = canvas.toDataURL("image/png");

            if (imgElement) {
                imgElement.src = imgDataUrl;
                imgElement.style.display = "block";
                // Prevent text highlight and force native mobile long-press image saving
                imgElement.style.userSelect = "none";
                imgElement.style.webkitUserSelect = "none";
                imgElement.style.webkitTouchCallout = "default";
                imgElement.style.touchAction = "manipulation";
            }

            if (downloadBtn) {
                downloadBtn.href = imgDataUrl;
                downloadBtn.style.display = "inline-flex";
            }

            if (loaderElement) loaderElement.style.display = "none";
        }).catch(err => {
            console.error("Lỗi tự động tạo ảnh PNG Thái Ất:", err);
            if (loaderElement) loaderElement.style.display = "none";
        });
    }, 350);
}

// Attach direct download click handler on DOM load
document.addEventListener("DOMContentLoaded", () => {
    const downloadBtn = document.getElementById("btn-download-direct");
    if (downloadBtn) {
        downloadBtn.addEventListener("click", (e) => {
            const imgElement = document.getElementById("thai-at-chart-img");
            if (imgElement && imgElement.src && imgElement.src.startsWith("data:image")) {
                const a = document.createElement("a");
                a.href = imgElement.src;
                a.download = "SaBan_ThaiAt.png";
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                e.preventDefault();
            }
        });
    }
});

// Backward compatibility alias
function exportChartToPNG() {
    generateThaiAtPNG();
}
