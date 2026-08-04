function showZaloImageModalThaiAt(imgData) {
    let modal = document.getElementById("zalo-img-modal-thaiat");
    if (!modal) {
        modal = document.createElement("div");
        modal.id = "zalo-img-modal-thaiat";
        modal.style.cssText = "position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(5, 7, 17, 0.96); z-index: 99999; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 15px; box-sizing: border-box; backdrop-filter: blur(8px);";
        document.body.appendChild(modal);
    }

    modal.innerHTML = '<div style="width: 100%; max-width: 550px; text-align: center; position: relative;"><button id="close-zalo-modal-thaiat" style="position: absolute; top: -45px; right: 0; background: #e74c3c; color: #fff; border: none; padding: 8px 18px; border-radius: 20px; font-weight: bold; font-size: 0.9rem; cursor: pointer;">✕ ĐÓNG</button><h4 style="color: #ffd700; margin: 0 0 10px 0; font-family: Cinzel, serif; font-size: 1.05rem;">☯ SA BÀN THÁI ẤT HD (ZALO / MESSENGER)</h4><div style="width: 100%; max-height: 70vh; overflow-y: auto; border-radius: 8px; border: 1.5px solid #ffd700; box-shadow: 0 8px 30px rgba(0,0,0,0.8);"><img src="' + imgData + '" alt="Sa Bàn Thái Ất HD" style="width: 100%; height: auto; display: block; -webkit-touch-callout: default !important; -webkit-user-select: auto !important; user-select: auto !important; pointer-events: auto !important;" /></div><p style="margin: 12px 0 8px 0; font-size: 0.85rem; color: #fff; background: rgba(212, 175, 55, 0.15); padding: 10px 12px; border-radius: 6px; border: 1px solid rgba(212, 175, 55, 0.4); line-height: 1.5;">💡 <strong>Mẹo Zalo / Messenger:</strong> Chạm & <strong>GIỮ NGÓN TAY 1-2 GIÂY TRỰC TIẾP LÊN HÌNH ÁNH TRÊN</strong> ➔ Chọn <strong>"Lưu hình ảnh"</strong> (Save Image) để lưu về máy!</p></div>';

    modal.style.display = "flex";
    document.getElementById("close-zalo-modal-thaiat").onclick = function() {
        modal.style.display = "none";
    };
}

// Attach direct download click handler on DOM load (Tối ưu hóa riêng cho Zalo & Messenger In-App Browser)
document.addEventListener("DOMContentLoaded", function() {
    const downloadBtn = document.getElementById("btn-download-direct");
    if (downloadBtn) {
        downloadBtn.addEventListener("click", function(e) {
            const imgElement = document.getElementById("thai-at-chart-img");
            if (imgElement && imgElement.src && imgElement.src.startsWith("data:image")) {
                const isZaloOrFB = /Zalo|FBAN|FBAV|Messenger/i.test(navigator.userAgent);
                if (isZaloOrFB) {
                    showZaloImageModalThaiAt(imgElement.src);
                    e.preventDefault();
                    return;
                }

                const a = document.createElement("a");
                a.href = imgElement.src;
                a.download = "SaBan_ThaiAt_HD.png";
                document.body.appendChild(a);
                a.click();
                setTimeout(function() {
                    if (document.body.contains(a)) document.body.removeChild(a);
                }, 100);
                e.preventDefault();
            }
        });
    }
});

// Backward compatibility alias
function exportChartToPNG(data) {
    generateThaiAtPNG(data);
}
