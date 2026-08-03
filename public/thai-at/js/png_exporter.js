/**
 * PNG Exporter for Thai At Sa Ban
 * Handles high-resolution canvas capture and bypasses Zalo/Messenger in-app download blocks.
 */

async function exportChartToPNG() {
    const chartContainer = document.getElementById("thai-at-chart-capture");
    if (!chartContainer) {
        alert("Không tìm thấy khung sa bàn để xuất ảnh!");
        return;
    }

    const btn = document.getElementById("btn-export-png");
    const originalText = btn.innerHTML;
    btn.innerHTML = "⏳ Đang tạo ảnh...";
    btn.disabled = true;

    try {
        // Use html2canvas with scale 2 and custom onclone styles for crystal-clear HD PNG exports
        const canvas = await html2canvas(chartContainer, {
            scale: 2,
            useCORS: true,
            backgroundColor: "#050711",
            logging: false,
            windowWidth: 1400,
            scrollX: 0,
            scrollY: 0,
            onclone: (clonedDoc) => {
                const capturedChart = clonedDoc.getElementById("thai-at-chart-capture");
                if (!capturedChart) return;

                // Explicit container sizing for crisp HD layout
                capturedChart.style.width = "1350px";
                capturedChart.style.padding = "24px";
                capturedChart.style.boxSizing = "border-box";
                capturedChart.style.backgroundColor = "#050711";
                capturedChart.style.borderRadius = "16px";
                capturedChart.style.border = "2px solid rgba(212, 175, 55, 0.4)";

                // Grid layout styling for export
                const grid = clonedDoc.querySelector(".matrix-grid");
                if (grid) {
                    grid.style.gap = "6px";
                }

                // Cell box styling
                clonedDoc.querySelectorAll(".cell-box").forEach(cell => {
                    cell.style.padding = "10px 8px";
                    cell.style.minHeight = "155px";
                    cell.style.gap = "4px";
                    cell.style.backgroundColor = "rgba(18, 24, 52, 0.95)";
                    cell.style.border = "1.5px solid rgba(212, 175, 55, 0.35)";
                });

                // Line 1: Header (Palace Title + Status Badge)
                clonedDoc.querySelectorAll(".cell-line-1").forEach(line => {
                    line.style.flexDirection = "row";
                    line.style.justifyContent = "space-between";
                    line.style.alignItems = "center";
                    line.style.paddingBottom = "4px";
                    line.style.marginBottom = "4px";
                    line.style.borderBottom = "1px solid rgba(255, 255, 255, 0.12)";
                });

                clonedDoc.querySelectorAll(".palace-title").forEach(title => {
                    title.style.fontSize = "1rem";
                    title.style.fontWeight = "900";
                    title.style.color = "#ffd700";
                    title.style.letterSpacing = "0.5px";
                });

                clonedDoc.querySelectorAll(".palace-khi").forEach(khi => {
                    khi.style.fontSize = "0.82rem";
                    khi.style.fontWeight = "700";
                    khi.style.padding = "2px 6px";
                    khi.style.borderRadius = "4px";
                    khi.style.color = "#ffffff";
                    khi.style.backgroundColor = "rgba(212, 175, 55, 0.25)";
                    khi.style.border = "1px solid rgba(212, 175, 55, 0.5)";
                });

                // Line 2: Details
                clonedDoc.querySelectorAll(".cell-line-2").forEach(l2 => {
                    l2.style.fontSize = "0.85rem";
                    l2.style.color = "#e0e6ed";
                    l2.style.lineHeight = "1.4";
                    l2.style.marginBottom = "4px";
                    l2.style.fontWeight = "600";
                });

                // Lines 3-6: Star tags flex containers
                clonedDoc.querySelectorAll(".cell-line-3, .cell-line-4, .cell-line-5, .cell-line-6").forEach(lx => {
                    lx.style.gap = "4px";
                    lx.style.marginBottom = "4px";
                    lx.style.minHeight = "20px";
                });

                // Star Tags: Enlarge font, add strong text shadow & padding
                clonedDoc.querySelectorAll(".star-tag").forEach(tag => {
                    tag.style.fontSize = "0.82rem";
                    tag.style.fontWeight = "800";
                    tag.style.padding = "3px 7px";
                    tag.style.borderRadius = "4px";
                    tag.style.lineHeight = "1.3";
                    tag.style.textShadow = "0 1px 3px rgba(0, 0, 0, 0.85)";
                    tag.style.display = "inline-block";
                    tag.style.margin = "2px 0";
                });

                // Text Muted
                clonedDoc.querySelectorAll(".text-muted").forEach(tm => {
                    tm.style.fontSize = "0.82rem";
                    tm.style.color = "#a0aec0";
                });

                // Trung cung formatting
                const tcHeader = clonedDoc.querySelector(".tc-header h2");
                if (tcHeader) tcHeader.style.fontSize = "1.4rem";

                const tcBody = clonedDoc.querySelector(".tc-body");
                if (tcBody) {
                    tcBody.style.fontSize = "0.95rem";
                    tcBody.style.lineHeight = "1.65";
                }
            }
        });

        const imgDataUrl = canvas.toDataURL("image/png");

        // Detect Zalo, Messenger, Facebook, WeChat WebViews or iOS
        const ua = navigator.userAgent || navigator.vendor || window.opera;
        const isInAppBrowser = /Zalo|FBAN|FBAV|Messenger|Instagram|MicroMessenger/i.test(ua);

        // Always show the preview modal with long-press instructions for max reliability!
        showPNGModal(imgDataUrl, isInAppBrowser);

        // Also trigger direct download attempt if Web Share API is available
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
    }

    const img = document.getElementById("exported-png-img");
    const downloadLink = document.getElementById("png-direct-download");
    
    img.src = imgDataUrl;
    downloadLink.href = imgDataUrl;

    modal.style.display = "flex";
}
