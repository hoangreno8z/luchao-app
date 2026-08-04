/**
 * PNG Exporter for Thai At Sa Ban — v3.0 (Direct Image & Zero-Popup Architecture)
 * 
 * Auto-converts Sa Ban DOM to HD PNG DataURL on every chart render.
 * Sets the DataURL directly on the <img> tag and direct <a> download link.
 * NO modal popups, NO navigator.share OS dialogs, NO hanging buttons!
 */

function generateThaiAtPNG() {
    const captureTarget = document.getElementById("thai-at-chart-capture");
    const imgElement = document.getElementById("thai-at-chart-img");
    const downloadBtn = document.getElementById("btn-download-direct");
    const loaderElement = document.getElementById("chart-img-loader");

    if (!captureTarget || !imgElement) return;

    if (loaderElement) loaderElement.style.display = "flex";

    // Brief timeout to ensure DOM updates are complete before capturing
    setTimeout(() => {
        if (typeof html2canvas !== "function") {
            console.warn("Thư viện html2canvas chưa được tải.");
            if (loaderElement) loaderElement.style.display = "none";
            return;
        }

        html2canvas(captureTarget, {
            scale: 2,
            useCORS: true,
            backgroundColor: "#050711",
            logging: false,
            windowWidth: 1250,
            scrollX: 0,
            scrollY: 0,
            onclone: (clonedDoc) => {
                const cap = clonedDoc.getElementById("thai-at-chart-capture");
                if (!cap) return;

                cap.style.width = "1200px";
                cap.style.padding = "24px";
                cap.style.boxSizing = "border-box";
                cap.style.backgroundColor = "#050711";
                cap.style.borderRadius = "16px";
                cap.style.border = "2px solid rgba(212, 175, 55, 0.4)";
                cap.style.overflow = "visible";

                // Convert CSS Grid → Flexbox for html2canvas compatibility
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

                clonedDoc.querySelectorAll(".cell-line-1").forEach(line => {
                    line.style.display = "flex";
                    line.style.flexDirection = "row";
                    line.style.justifyContent = "space-between";
                    line.style.alignItems = "center";
                    line.style.paddingBottom = "4px";
                    line.style.borderBottom = "1px solid rgba(255, 255, 255, 0.12)";
                });

                clonedDoc.querySelectorAll(".palace-title").forEach(t => {
                    t.style.fontSize = "1rem"; t.style.fontWeight = "900"; t.style.color = "#ffd700";
                });

                clonedDoc.querySelectorAll(".palace-khi").forEach(k => {
                    k.style.fontSize = "0.82rem"; k.style.fontWeight = "700"; k.style.padding = "2px 6px";
                    k.style.borderRadius = "4px"; k.style.color = "#ffffff"; k.style.backgroundColor = "rgba(212, 175, 55, 0.25)";
                    k.style.border = "1px solid rgba(212, 175, 55, 0.5)";
                });

                clonedDoc.querySelectorAll(".cell-line-2").forEach(l2 => {
                    l2.style.fontSize = "0.85rem"; l2.style.color = "#e0e6ed"; l2.style.lineHeight = "1.4"; l2.style.fontWeight = "600";
                });

                clonedDoc.querySelectorAll(".cell-line-3, .cell-line-4, .cell-line-5, .cell-line-6").forEach(lx => {
                    lx.style.display = "flex"; lx.style.flexWrap = "wrap"; lx.style.gap = "4px"; lx.style.minHeight = "20px";
                });

                clonedDoc.querySelectorAll(".star-tag").forEach(tag => {
                    tag.style.fontSize = "0.82rem"; tag.style.fontWeight = "800"; tag.style.padding = "3px 7px";
                    tag.style.borderRadius = "4px"; tag.style.lineHeight = "1.3"; tag.style.textShadow = "0 1px 3px rgba(0, 0, 0, 0.85)";
                    tag.style.display = "inline-block";
                });

                clonedDoc.querySelectorAll(".text-muted").forEach(tm => {
                    tm.style.fontSize = "0.82rem"; tm.style.color = "#a0aec0";
                });

                const tcHeader = clonedDoc.querySelector(".tc-header h2");
                if (tcHeader) tcHeader.style.fontSize = "1.4rem";

                const tcBody = clonedDoc.querySelector(".tc-body");
                if (tcBody) { tcBody.style.fontSize = "0.95rem"; tcBody.style.lineHeight = "1.65"; }

                clonedDoc.querySelectorAll("*").forEach(el => {
                    if (el.style) {
                        el.style.backdropFilter = "none";
                        el.style.webkitBackdropFilter = "none";
                    }
                });
            }
        }).then(canvas => {
            const imgDataUrl = canvas.toDataURL("image/png");

            imgElement.src = imgDataUrl;
            imgElement.style.display = "block";

            if (downloadBtn) {
                downloadBtn.href = imgDataUrl;
                downloadBtn.style.display = "inline-flex";
            }

            if (loaderElement) loaderElement.style.display = "none";
        }).catch(err => {
            console.error("Lỗi tự động tạo ảnh PNG Thái Ất:", err);
            if (loaderElement) loaderElement.style.display = "none";
        });
    }, 300);
}

// Backward compatibility alias
function exportChartToPNG() {
    generateThaiAtPNG();
}
