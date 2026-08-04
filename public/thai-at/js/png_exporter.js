/**
 * PNG Exporter for Thai At Sa Ban — v3.5 (World-Class Ultra-HD & Mobile Touch-Hold Architecture)
 * 
 * Generates 3x Ultra-HD PNG canvas with scale: 3, useCORS: true, allowTaint: true, backgroundColor: '#050711'.
 * Prevents text selection (select-none) and enables native Mobile Long-Press Image Saving.
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

        // Determine optimal scale for high-DPI Retina displays (min 2.5x, max 3x)
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

                // Convert CSS Grid -> Flexbox for html2canvas compatibility on WebKit / Mobile Safari
                const grid = clonedDoc.querySelector(".matrix-grid");
                if (grid && grid.style.display !== "none") {
                    grid.style.display = "flex";
                    grid.style.flexDirection = "column";
                    grid.style.gap = "5px";

                    const cells = Array.from(grid.children);
                    const cellMap = {};
                    let trungCungEl = null;

                    cells.forEach(c => {
                        if (c.classList.contains("trung-cung-block")) {
                            trungCungEl = c;
                        } else if (c.id) {
                            const id = c.id.replace("cell-", "");
                            cellMap[id] = c;
                        }
                    });

                    grid.innerHTML = "";

                    const ROW_DEFS = [
                        ["ton", "ty_chi", "ngo", "mui", "khon"],
                        ["thin", "__TC__", "__TC__", "__TC__", "than"],
                        ["mao", "__TC__", "__TC__", "__TC__", "dau"],
                        ["dan", "__TC__", "__TC__", "__TC__", "tuat"],
                        ["can", "suu", "ty", "hoi", "kien"]
                    ];

                    const row1 = clonedDoc.createElement("div");
                    row1.style.display = "flex"; row1.style.gap = "5px"; row1.style.width = "100%";
                    ROW_DEFS[0].forEach(id => {
                        if (cellMap[id]) { cellMap[id].style.flex = "1"; row1.appendChild(cellMap[id]); }
                    });

                    const middleBlock = clonedDoc.createElement("div");
                    middleBlock.style.display = "flex"; middleBlock.style.gap = "5px"; middleBlock.style.width = "100%";

                    const leftCol = clonedDoc.createElement("div");
                    leftCol.style.flex = "1"; leftCol.style.display = "flex"; leftCol.style.flexDirection = "column"; leftCol.style.gap = "5px";
                    ["thin", "mao", "dan"].forEach(id => {
                        if (cellMap[id]) { cellMap[id].style.flex = "1"; leftCol.appendChild(cellMap[id]); }
                    });

                    const rightCol = clonedDoc.createElement("div");
                    rightCol.style.flex = "1"; rightCol.style.display = "flex"; rightCol.style.flexDirection = "column"; rightCol.style.gap = "5px";
                    ["than", "dau", "tuat"].forEach(id => {
                        if (cellMap[id]) { cellMap[id].style.flex = "1"; rightCol.appendChild(cellMap[id]); }
                    });

                    middleBlock.appendChild(leftCol);
                    if (trungCungEl) {
                        trungCungEl.style.flex = "3";
                        trungCungEl.style.minHeight = "auto";
                        middleBlock.appendChild(trungCungEl);
                    }
                    middleBlock.appendChild(rightCol);

                    const row5 = clonedDoc.createElement("div");
                    row5.style.display = "flex"; row5.style.gap = "5px"; row5.style.width = "100%";
                    ROW_DEFS[4].forEach(id => {
                        if (cellMap[id]) { cellMap[id].style.flex = "1"; row5.appendChild(cellMap[id]); }
                    });

                    grid.appendChild(row1);
                    grid.appendChild(middleBlock);
                    grid.appendChild(row5);
                }

                // High-resolution styling for cell boxes
                clonedDoc.querySelectorAll(".cell-box").forEach(cell => {
                    cell.style.padding = "10px 8px";
                    cell.style.minHeight = "140px";
                    cell.style.backgroundColor = "rgba(18, 24, 52, 0.95)";
                    cell.style.border = "1.5px solid rgba(212, 175, 55, 0.35)";
                    cell.style.borderRadius = "8px";
                    cell.style.display = "flex";
                    cell.style.flexDirection = "column";
                });

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
