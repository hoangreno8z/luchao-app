/**
 * PNG Exporter for Thai At Sa Ban — v2.0 (Bug-fixed & Optimized)
 * 
 * ROOT CAUSE FIX: html2canvas 1.4.1 cannot reliably render CSS Grid layouts
 * with grid-column/grid-row spanning (e.g. Trung Cung 3x3 span).
 * 
 * Solution: In the onclone callback, convert the CSS Grid layout to a simple
 * flexbox/table-like structure that html2canvas can render correctly.
 * Also adds robust timeout, error recovery, and button state management.
 */

async function exportChartToPNG() {
    const chartContainer = document.getElementById("thai-at-chart-capture");
    if (!chartContainer) {
        alert("Không tìm thấy khung sa bàn để xuất ảnh!");
        return;
    }

    const btn = document.getElementById("btn-export-png");
    if (!btn) return;
    
    const originalText = btn.innerHTML;
    btn.innerHTML = "⏳ Đang tạo ảnh...";
    btn.disabled = true;

    // Safety timeout: Restore button after 15 seconds no matter what
    const safetyTimer = setTimeout(() => {
        btn.innerHTML = originalText;
        btn.disabled = false;
    }, 15000);

    try {
        // Check if html2canvas is loaded
        if (typeof html2canvas !== "function") {
            throw new Error("Thư viện html2canvas chưa được tải. Vui lòng tải lại trang.");
        }

        const canvas = await html2canvas(chartContainer, {
            scale: 2,
            useCORS: true,
            backgroundColor: "#050711",
            logging: false,
            windowWidth: chartContainer.scrollWidth + 48,
            scrollX: 0,
            scrollY: -window.scrollY,
            onclone: (clonedDoc) => {
                const cap = clonedDoc.getElementById("thai-at-chart-capture");
                if (!cap) return;

                // Fix container sizing
                cap.style.width = Math.max(cap.scrollWidth, 900) + "px";
                cap.style.padding = "24px";
                cap.style.boxSizing = "border-box";
                cap.style.backgroundColor = "#050711";
                cap.style.borderRadius = "16px";
                cap.style.border = "2px solid rgba(212, 175, 55, 0.4)";
                cap.style.overflow = "visible";

                // ============================================================
                // CRITICAL FIX: Convert CSS Grid → Flexbox for html2canvas
                // html2canvas 1.4.1 cannot handle grid-column/row spanning
                // ============================================================
                const grid = clonedDoc.querySelector(".matrix-grid");
                if (grid) {
                    // Remove CSS Grid, use manual flexbox rows instead
                    grid.style.display = "flex";
                    grid.style.flexDirection = "column";
                    grid.style.gap = "5px";

                    // Collect all cell elements
                    const cells = Array.from(grid.children);
                    const cellMap = {};
                    let trungCungEl = null;
                    
                    cells.forEach(c => {
                        if (c.classList.contains("trung-cung-block")) {
                            trungCungEl = c;
                        } else {
                            const id = c.id.replace("cell-", "");
                            cellMap[id] = c;
                        }
                    });

                    // Clear the grid
                    grid.innerHTML = "";

                    // Row order matching the 5x5 matrix:
                    // Row 1: Tốn, Tỵ, Ngọ, Mùi, Khôn
                    // Row 2: Thìn, [Trung Cung...], Thân
                    // Row 3: Mão, [Trung Cung...], Dậu
                    // Row 4: Dần, [Trung Cung...], Tuất
                    // Row 5: Cấn, Sửu, Tý, Hợi, Kiền
                    const ROW_DEFS = [
                        ["ton", "ty_chi", "ngo", "mui", "khon"],
                        ["thin", "__TC__", "__TC__", "__TC__", "than"],
                        ["mao", "__TC__", "__TC__", "__TC__", "dau"],
                        ["dan", "__TC__", "__TC__", "__TC__", "tuat"],
                        ["can", "suu", "ty", "hoi", "kien"]
                    ];

                    let trungCungPlaced = false;

                    ROW_DEFS.forEach((rowIds, rowIdx) => {
                        const row = clonedDoc.createElement("div");
                        row.style.display = "flex";
                        row.style.gap = "5px";
                        row.style.width = "100%";

                        rowIds.forEach(id => {
                            if (id === "__TC__") {
                                if (!trungCungPlaced && trungCungEl) {
                                    // Place trung cung spanning 3 cols and 3 rows
                                    trungCungEl.style.flex = "3";
                                    trungCungEl.style.minHeight = "0";
                                    trungCungEl.style.gridColumn = "unset";
                                    trungCungEl.style.gridRow = "unset";
                                    row.appendChild(trungCungEl);
                                    trungCungPlaced = true;
                                }
                                // Skip subsequent __TC__ slots
                                return;
                            }
                            const cell = cellMap[id];
                            if (cell) {
                                cell.style.flex = "1";
                                cell.style.minWidth = "0";
                                row.appendChild(cell);
                            }
                        });

                        // For rows 2-4, we only have left cell + trung cung + right cell
                        // The trung cung only gets appended once (row 2)
                        // Rows 3 and 4 just have left and right cells

                        grid.appendChild(row);
                    });

                    // Fix: Make the trung cung wrapper span 3 visual rows
                    // by making rows 2-4 a horizontal sub-container
                    // Actually, let's restructure: wrap rows 2-4 together
                    // Remove rows 2,3,4 from grid and re-wrap them
                    const allRows = Array.from(grid.children);
                    const row1 = allRows[0];
                    const row2 = allRows[1]; // thin + trungCung + than
                    const row3 = allRows[2]; // mao + dau
                    const row4 = allRows[3]; // dan + tuat
                    const row5 = allRows[4];

                    // Create middle section: left column + trung cung + right column
                    grid.innerHTML = "";
                    
                    // Re-add row 1
                    grid.appendChild(row1);

                    // Create middle block
                    const middleBlock = clonedDoc.createElement("div");
                    middleBlock.style.display = "flex";
                    middleBlock.style.gap = "5px";
                    middleBlock.style.width = "100%";

                    // Left column (thin, mao, dan)
                    const leftCol = clonedDoc.createElement("div");
                    leftCol.style.flex = "1";
                    leftCol.style.display = "flex";
                    leftCol.style.flexDirection = "column";
                    leftCol.style.gap = "5px";

                    // Right column (than, dau, tuat)
                    const rightCol = clonedDoc.createElement("div");
                    rightCol.style.flex = "1";
                    rightCol.style.display = "flex";
                    rightCol.style.flexDirection = "column";
                    rightCol.style.gap = "5px";

                    // Extract cells from rows 2,3,4
                    const r2children = Array.from(row2.children);
                    const r3children = Array.from(row3.children);
                    const r4children = Array.from(row4.children);

                    // Row 2 has: thin (or first non-TC), trungCung, than (or last non-TC)
                    // Row 3 has: mao, dau
                    // Row 4 has: dan, tuat
                    
                    // Find the trung cung element in row2
                    let tcEl = null;
                    r2children.forEach(c => {
                        if (c.classList && c.classList.contains("trung-cung-block")) {
                            tcEl = c;
                        } else {
                            // First non-TC goes to left, if left already has one, goes to right
                            if (leftCol.children.length === 0) {
                                c.style.flex = "1";
                                leftCol.appendChild(c);
                            } else {
                                c.style.flex = "1";
                                rightCol.appendChild(c);
                            }
                        }
                    });

                    r3children.forEach((c, i) => {
                        c.style.flex = "1";
                        if (i === 0) leftCol.appendChild(c);
                        else rightCol.appendChild(c);
                    });

                    r4children.forEach((c, i) => {
                        c.style.flex = "1";
                        if (i === 0) leftCol.appendChild(c);
                        else rightCol.appendChild(c);
                    });

                    middleBlock.appendChild(leftCol);
                    if (tcEl) {
                        tcEl.style.flex = "3";
                        tcEl.style.minHeight = "auto";
                        middleBlock.appendChild(tcEl);
                    }
                    middleBlock.appendChild(rightCol);

                    grid.appendChild(middleBlock);
                    grid.appendChild(row5);
                }

                // Style enhancements for crisp export
                clonedDoc.querySelectorAll(".cell-box").forEach(cell => {
                    cell.style.padding = "10px 8px";
                    cell.style.minHeight = "140px";
                    cell.style.gap = "4px";
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
                    line.style.marginBottom = "4px";
                    line.style.borderBottom = "1px solid rgba(255, 255, 255, 0.12)";
                });

                clonedDoc.querySelectorAll(".palace-title").forEach(t => {
                    t.style.fontSize = "1rem";
                    t.style.fontWeight = "900";
                    t.style.color = "#ffd700";
                });

                clonedDoc.querySelectorAll(".palace-khi").forEach(k => {
                    k.style.fontSize = "0.82rem";
                    k.style.fontWeight = "700";
                    k.style.padding = "2px 6px";
                    k.style.borderRadius = "4px";
                    k.style.color = "#ffffff";
                    k.style.backgroundColor = "rgba(212, 175, 55, 0.25)";
                    k.style.border = "1px solid rgba(212, 175, 55, 0.5)";
                });

                clonedDoc.querySelectorAll(".cell-line-2").forEach(l2 => {
                    l2.style.fontSize = "0.85rem";
                    l2.style.color = "#e0e6ed";
                    l2.style.lineHeight = "1.4";
                    l2.style.fontWeight = "600";
                });

                clonedDoc.querySelectorAll(".cell-line-3, .cell-line-4, .cell-line-5, .cell-line-6").forEach(lx => {
                    lx.style.display = "flex";
                    lx.style.flexWrap = "wrap";
                    lx.style.gap = "4px";
                    lx.style.minHeight = "20px";
                });

                clonedDoc.querySelectorAll(".star-tag").forEach(tag => {
                    tag.style.fontSize = "0.82rem";
                    tag.style.fontWeight = "800";
                    tag.style.padding = "3px 7px";
                    tag.style.borderRadius = "4px";
                    tag.style.lineHeight = "1.3";
                    tag.style.textShadow = "0 1px 3px rgba(0, 0, 0, 0.85)";
                    tag.style.display = "inline-block";
                });

                clonedDoc.querySelectorAll(".text-muted").forEach(tm => {
                    tm.style.fontSize = "0.82rem";
                    tm.style.color = "#a0aec0";
                });

                const tcHeader = clonedDoc.querySelector(".tc-header h2");
                if (tcHeader) tcHeader.style.fontSize = "1.4rem";

                const tcBody = clonedDoc.querySelector(".tc-body");
                if (tcBody) {
                    tcBody.style.fontSize = "0.95rem";
                    tcBody.style.lineHeight = "1.65";
                }

                // Remove backdrop-filter (html2canvas doesn't support it)
                clonedDoc.querySelectorAll("*").forEach(el => {
                    const style = el.style;
                    if (style) {
                        style.backdropFilter = "none";
                        style.webkitBackdropFilter = "none";
                    }
                });
            }
        });

        clearTimeout(safetyTimer);

        const imgDataUrl = canvas.toDataURL("image/png");

        // Detect Zalo, Messenger, Facebook, WeChat WebViews
        const ua = navigator.userAgent || navigator.vendor || window.opera;
        const isInAppBrowser = /Zalo|FBAN|FBAV|Messenger|Instagram|MicroMessenger/i.test(ua);

        // Show the preview modal
        showPNGModal(imgDataUrl, isInAppBrowser);

        // Also trigger Web Share API if available
        if (navigator.share && navigator.canShare) {
            try {
                const blob = await (await fetch(imgDataUrl)).blob();
                const file = new File([blob], "SaBan_ThaiAt.png", { type: "image/png" });
                if (navigator.canShare({ files: [file] })) {
                    await navigator.share({
                        files: [file],
                        title: "Sa Bàn Thái Ất Thần Số",
                        text: "Hình ảnh Sa Bàn Thái Ất Thần Số"
                    });
                }
            } catch (err) {
                console.log("Web Share skipped or cancelled:", err);
            }
        }
    } catch (error) {
        clearTimeout(safetyTimer);
        console.error("Lỗi khi xuất ảnh PNG:", error);
        alert("Có lỗi xảy ra khi tạo ảnh PNG: " + error.message);
    } finally {
        btn.innerHTML = originalText;
        btn.disabled = false;
    }
}

// Display Preview Modal with Base64 Image
function showPNGModal(imgDataUrl, isInAppBrowser) {
    let modal = document.getElementById("png-export-modal");
    if (!modal) {
        modal = document.createElement("div");
        modal.id = "png-export-modal";
        modal.className = "modal";
        modal.innerHTML = `
            <div class="modal-content glass png-modal-content">
                <span class="close-btn" id="close-png-modal">&times;</span>
                <h2 class="png-modal-title">🖼️ Hình Ảnh Sa Bàn Thái Ất (PNG)</h2>
                
                <div class="png-instruction-box">
                    <p class="highlight-text">👉 <strong>ĐỂ LƯU ẢNH VỀ ĐIỆN THOẠI (ZALO / MESSENGER / SAFARI / CHROME):</strong></p>
                    <p>Nhấn giữ trực tiếp vào bức ảnh bên dưới từ <strong>1 - 2 giây</strong>, sau đó chọn <strong>"Lưu hình ảnh"</strong> (hoặc <em>"Download Image" / "Tải ảnh xuống"</em>).</p>
                </div>

                <div class="png-image-wrapper">
                    <img id="exported-png-img" src="" alt="Sa Bàn Thái Ất PNG">
                </div>

                <div class="png-modal-actions">
                    <a id="png-direct-download" href="" download="SaBan_ThaiAt.png" class="btn-primary">
                        💾 Tải Ảnh Trực Tiếp
                    </a>
                </div>
            </div>
        `;
        document.body.appendChild(modal);

        document.getElementById("close-png-modal").onclick = () => {
            modal.style.display = "none";
        };
        
        // Close on background click
        modal.addEventListener("click", (e) => {
            if (e.target === modal) {
                modal.style.display = "none";
            }
        });
    }

    const img = document.getElementById("exported-png-img");
    const downloadLink = document.getElementById("png-direct-download");
    
    img.src = imgDataUrl;
    downloadLink.href = imgDataUrl;

    modal.style.display = "flex";
}
