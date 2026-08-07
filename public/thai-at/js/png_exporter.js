/**
 * PNG Exporter for Thai At Sa Ban — v5.1 (Exact 5x5 Matrix Canvas & Blob URL Engine)
 * 
 * Renders exact 5x5 Thai At Sa Ban Matrix (16 Outer Cells surrounding 3x3 Trung Cung)
 * directly to 2D Canvas and converts to Blob URL for 100% Zalo & Mobile Safari image saving.
 * Supports iOS, Android, iPad, MacBook & PC with 100% bulletproof reliability.
 */

const THAN_GRID_DEF = {
    // Row 1
    ton:     { row: 0, col: 0, name: "TỐN",   alias: "Đế Thích",  khi: "Dương Tuyệt", phanDa: "Dương Châu" },
    ty_chi:  { row: 0, col: 1, name: "TỊ",    alias: "Đại Thần",  khi: "Dương Tạp",   phanDa: "Dương Châu" },
    ngo:     { row: 0, col: 2, name: "NGỌ",   alias: "Đại Uy",    khi: "Dương Thuần", phanDa: "Kinh Châu" },
    mui:     { row: 0, col: 3, name: "MÙI",   alias: "Thiên Đạo", khi: "Âm Thuần",    phanDa: "Kinh Châu" },
    khon:    { row: 0, col: 4, name: "KHÔN",  alias: "Đại Vũ",    khi: "Âm Tạp",      phanDa: "Lương Châu" },

    // Left Column (Row 2, 3, 4)
    thin:    { row: 1, col: 0, name: "THÌN",  alias: "Thái Dương",khi: "Dương Thuần", phanDa: "Từ Châu" },
    mao:     { row: 2, col: 0, name: "MÃO",   alias: "Cao Tùng",  khi: "Dương Tạp",   phanDa: "Từ Châu" },
    dan:     { row: 3, col: 0, name: "DẦN",   alias: "Lã Thân",   khi: "Dương Thuần", phanDa: "Thanh Châu" },

    // Right Column (Row 2, 3, 4)
    than:    { row: 1, col: 4, name: "THÂN",  alias: "Vũ Đức",    khi: "Âm Tạp",      phanDa: "Lương Châu" },
    dau:     { row: 2, col: 4, name: "DẬU",   alias: "Thái Tộc",  khi: "Âm Thuần",    phanDa: "Ung Châu" },
    tuat:    { row: 3, col: 4, name: "TUẤT",  alias: "Âm Chủ",    khi: "Âm Tạp",      phanDa: "Ung Châu" },

    // Row 5
    can:     { row: 4, col: 0, name: "CẤN",   alias: "Hòa Đức",   khi: "Dương Thuần", phanDa: "Thanh Châu" },
    suu:     { row: 4, col: 1, name: "SỬU",   alias: "Dương Đức", khi: "Dương Tạp",   phanDa: "Thanh Châu" },
    ty:      { row: 4, col: 2, name: "TÝ",    alias: "Địa Chủ",   khi: "Dương Tạp",   phanDa: "Duyên Châu" },
    hoi:     { row: 4, col: 3, name: "HỢI",   alias: "Đại Nghĩa", khi: "Âm Thuần",    phanDa: "Ký Châu" },
    kien:    { row: 4, col: 4, name: "KIỀN",  alias: "Âm Đức",    khi: "Âm Tuyệt",    phanDa: "Ký Châu" }
};

function draw5x5ThaiAtSaBan(data, callback) {
    const canvas = document.createElement("canvas");
    canvas.width = 1200 * 2; // 2x HD Resolution: 2400px width
    canvas.height = 1050 * 2; // 2100px height
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.scale(2, 2);

    // Background
    ctx.fillStyle = "#050711";
    ctx.fillRect(0, 0, 1200, 1050);

    // Outer Gold Double Border
    ctx.strokeStyle = "#d4af37";
    ctx.lineWidth = 4;
    ctx.strokeRect(15, 15, 1170, 1020);

    ctx.strokeStyle = "rgba(212, 175, 55, 0.4)";
    ctx.lineWidth = 1;
    ctx.strokeRect(20, 20, 1160, 1010);

    // Header Title
    ctx.fillStyle = "#ffd700";
    ctx.font = "bold 26px 'Cinzel', serif, Georgia";
    ctx.textAlign = "center";
    ctx.fillText("☯ THÁI ẤT THẦN SỐ — SA BÀN 16 CUNG ☯", 600, 52);

    // Subtitle / Tứ Trụ Date
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 14px 'Inter', sans-serif";
    const tuTruStr = (data && data.tuTru && data.tuTru.fullString) ? data.tuTru.fullString : "Năm Bính Ngọ - Tháng Ất Mùi - Ngày Mậu Tý - Giờ Nhâm Tuất";
    ctx.fillText(`Tứ Trụ Can Chi: ${tuTruStr}`, 600, 78);

    ctx.fillStyle = "#d4af37";
    ctx.font = "13px 'Inter', sans-serif";
    const modeText = `Chế Độ: ${data ? (data.modeName || 'Tuế Kể') : 'Tuế Kể'}  |  Tiết Khí: ${data ? (data.solarTerm || '-') : '-'}  |  Cục Số: ${data ? (data.donCucName || '-') : '-'}`;
    ctx.fillText(modeText, 600, 100);

    // 5x5 Matrix Layout Geometry
    const startX = 30;
    const startY = 115;
    const cellW = 222;
    const cellH = 156;
    const gapX = 7;
    const gapY = 6;

    // Draw 16 Outer Cells
    Object.keys(THAN_GRID_DEF).forEach(id => {
        const def = THAN_GRID_DEF[id];
        const cx = startX + def.col * (cellW + gapX);
        const cy = startY + def.row * (cellH + gapY);

        // Cell Box Background
        ctx.fillStyle = "rgba(18, 24, 52, 0.95)";
        ctx.fillRect(cx, cy, cellW, cellH);
        ctx.strokeStyle = "rgba(212, 175, 55, 0.35)";
        ctx.lineWidth = 1;
        ctx.strokeRect(cx, cy, cellW, cellH);

        // Cell Header Line 1
        ctx.fillStyle = "#ffd700";
        ctx.font = "bold 13px 'Cinzel', serif, Georgia";
        ctx.textAlign = "left";
        ctx.fillText(def.name, cx + 8, cy + 20);

        ctx.fillStyle = "rgba(212, 175, 55, 0.85)";
        ctx.font = "11px 'Inter', sans-serif";
        ctx.textAlign = "right";
        ctx.fillText(def.khi, cx + cellW - 8, cy + 20);

        // Divider
        ctx.strokeStyle = "rgba(255,255,255,0.1)";
        ctx.beginPath();
        ctx.moveTo(cx + 8, cy + 26);
        ctx.lineTo(cx + cellW - 8, cy + 26);
        ctx.stroke();

        // Line 2: Alias & Phận Dã
        ctx.fillStyle = "#a0aec0";
        ctx.font = "11px 'Inter', sans-serif";
        ctx.textAlign = "left";
        ctx.fillText(`${def.alias} • ${def.phanDa}`, cx + 8, cy + 41);

        // Stars List inside Cell
        const stars = (data && data.placement && data.placement[id]) ? data.placement[id] : [];
        let sy = cy + 58;

        if (stars.length === 0) {
            ctx.fillStyle = "#555";
            ctx.font = "italic 11px 'Inter', sans-serif";
            ctx.fillText("(Không có sao)", cx + 8, sy);
        } else {
            ctx.font = "bold 11px 'Inter', sans-serif";
            stars.forEach((st, idx) => {
                if (sy <= cy + cellH - 12) {
                    if (["thai-at", "van-xuong", "thuy-kich"].includes(st.class)) {
                        ctx.fillStyle = "#ffd700"; // Gold
                    } else if (["chu-tuong", "khach-tuong"].includes(st.class)) {
                        ctx.fillStyle = "#ff6b6b"; // Red
                    } else if (["quan-co", "than-co", "dan-co", "ngu-phuc", "dai-du", "tieu-du"].includes(st.class)) {
                        ctx.fillStyle = "#74b9ff"; // Blue
                    } else {
                        ctx.fillStyle = "#e0e6ed"; // White
                    }

                    ctx.fillText(`• ${st.name}`, cx + 8, sy);
                    sy += 16;
                }
            });
        }
    });

    // Draw TRUNG CUNG 3x3 Block
    const tcX = startX + 1 * (cellW + gapX);
    const tcY = startY + 1 * (cellH + gapY);
    const tcW = cellW * 3 + gapX * 2;
    const tcH = cellH * 3 + gapY * 2;

    ctx.fillStyle = "rgba(10, 14, 30, 0.98)";
    ctx.fillRect(tcX, tcY, tcW, tcH);
    ctx.strokeStyle = "#d4af37";
    ctx.lineWidth = 2;
    ctx.strokeRect(tcX, tcY, tcW, tcH);

    ctx.strokeStyle = "rgba(212, 175, 55, 0.2)";
    ctx.lineWidth = 1;
    ctx.strokeRect(tcX + 4, tcY + 4, tcW - 8, tcH - 8);

    ctx.fillStyle = "#ffd700";
    ctx.font = "bold 20px 'Cinzel', serif, Georgia";
    ctx.textAlign = "center";
    ctx.fillText("TRUNG CUNG THÁI ẤT", tcX + tcW / 2, tcY + 32);

    ctx.fillStyle = "#a0aec0";
    ctx.font = "12px 'Cinzel', serif";
    ctx.fillText("Thái Cực — Hoàng Cực — Bàn Luận", tcX + tcW / 2, tcY + 52);

    ctx.strokeStyle = "rgba(212, 175, 55, 0.3)";
    ctx.beginPath();
    ctx.moveTo(tcX + 30, tcY + 62);
    ctx.lineTo(tcX + tcW - 30, tcY + 62);
    ctx.stroke();

    ctx.font = "13px 'Inter', sans-serif";
    ctx.textAlign = "left";

    // Left Column
    const col1X = tcX + 30;
    let py1 = tcY + 90;
    const dy = 24;

    ctx.fillStyle = "#ffffff";
    ctx.fillText(`• Tứ Trụ: `, col1X, py1);
    ctx.fillStyle = "#ffd700";
    ctx.fillText(data ? (data.tuTru ? data.tuTru.fullString : '-') : '-', col1X + 65, py1);
    py1 += dy;

    ctx.fillStyle = "#ffffff";
    ctx.fillText(`• Cục Số: `, col1X, py1);
    ctx.fillStyle = "#ffd700";
    ctx.fillText(data ? (data.donCucName || '-') : '-', col1X + 65, py1);
    py1 += dy;

    ctx.fillStyle = "#ffffff";
    ctx.fillText(`• Tiết Khí: `, col1X, py1);
    ctx.fillStyle = "#e0e6ed";
    ctx.fillText(data ? (data.solarTerm || '-') : '-', col1X + 75, py1);
    py1 += dy;

    ctx.fillStyle = "#ffffff";
    ctx.fillText(`• Kế Đại (Tích): `, col1X, py1);
    ctx.fillStyle = "#ffd700";
    ctx.fillText(data && data.keDai !== undefined ? data.keDai.toLocaleString('vi-VN') : '-', col1X + 115, py1);
    py1 += dy;

    ctx.fillStyle = "#ffffff";
    ctx.fillText(`• Kế Tiểu (Dư): `, col1X, py1);
    ctx.fillStyle = "#ffd700";
    ctx.fillText(data && data.keTieu !== undefined ? String(data.keTieu) : '-', col1X + 110, py1);
    py1 += dy;

    ctx.fillStyle = "#ffffff";
    ctx.fillText(`• Kế Định: `, col1X, py1);
    ctx.fillStyle = "#ffd700";
    ctx.fillText(data && data.keDinh !== undefined ? String(data.keDinh) : '-', col1X + 75, py1);

    // Right Column
    const col2X = tcX + 360;
    let py2 = tcY + 90;

    ctx.fillStyle = "#ffffff";
    ctx.fillText(`• Bát Môn: `, col2X, py2);
    ctx.fillStyle = "#2ecc71";
    ctx.fillText(data ? (data.batMon || '-') : '-', col2X + 80, py2);
    py2 += dy;

    ctx.fillStyle = "#ffffff";
    ctx.fillText(`• Cửu Tinh: `, col2X, py2);
    ctx.fillStyle = "#2ecc71";
    ctx.fillText(data ? (data.cuuTinh || '-') : '-', col2X + 85, py2);
    py2 += dy;

    ctx.fillStyle = "#ffffff";
    ctx.fillText(`• Toán Chủ: `, col2X, py2);
    ctx.fillStyle = "#e74c3c";
    ctx.fillText(data ? (data.toanChuGoc !== undefined ? `${data.toanChu} (Nguyên: ${data.toanChuGoc})` : String(data.toanChu || '-')) : '-', col2X + 85, py2);
    py2 += dy;

    ctx.fillStyle = "#ffffff";
    ctx.fillText(`• Toán Khách: `, col2X, py2);
    ctx.fillStyle = "#3498db";
    ctx.fillText(data ? (data.toanKhachGoc !== undefined ? `${data.toanKhach} (Nguyên: ${data.toanKhachGoc})` : String(data.toanKhach || '-')) : '-', col2X + 100, py2);
    py2 += dy;

    ctx.fillStyle = "#ffffff";
    ctx.fillText(`• Toán Định: `, col2X, py2);
    ctx.fillStyle = "#e67e22";
    ctx.fillText(data ? (data.toanDinhGoc !== undefined ? `${data.toanDinh} (Nguyên: ${data.toanDinhGoc})` : String(data.toanDinh || '-')) : '-', col2X + 90, py2);
    py2 += dy;

    ctx.fillStyle = "#ffffff";
    ctx.fillText(`• Bát Hung: `, col2X, py2);
    ctx.fillStyle = "#ff6b6b";
    ctx.fillText(data ? (data.batHung || '-') : '-', col2X + 80, py2);

    // Luận Đoán Verdict Box
    const vBoxY = tcY + 250;
    ctx.fillStyle = "rgba(212, 175, 55, 0.08)";
    ctx.fillRect(tcX + 25, vBoxY, tcW - 50, 160);
    ctx.strokeStyle = "rgba(212, 175, 55, 0.35)";
    ctx.lineWidth = 1;
    ctx.strokeRect(tcX + 25, vBoxY, tcW - 50, 160);

    ctx.fillStyle = "#ffd700";
    ctx.font = "bold 13px 'Inter', sans-serif";
    ctx.textAlign = "left";
    ctx.fillText("☯ LUẬN ĐOÁN CỤC DIỆN THÁI ẤT:", tcX + 35, vBoxY + 24);

    ctx.fillStyle = "#e0e6ed";
    ctx.font = "12px 'Inter', sans-serif";
    const verdictText = data ? (data.verdict || 'Thái Ất Tọa Cung, Vận Quái Thông Suốt.') : 'Thái Ất Tọa Cung';
    
    const maxW = tcW - 80;
    const words = verdictText.split(" ");
    let line = "";
    let vy = vBoxY + 50;

    for (let n = 0; n < words.length; n++) {
        const testLine = line + words[n] + " ";
        const metrics = ctx.measureText(testLine);
        if (metrics.width > maxW && n > 0) {
            ctx.fillText(line, tcX + 35, vy);
            line = words[n] + " ";
            vy += 20;
            if (vy > vBoxY + 145) break;
        } else {
            line = testLine;
        }
    }
    if (vy <= vBoxY + 145) {
        ctx.fillText(line, tcX + 35, vy);
    }

    ctx.fillStyle = "#ffd700";
    ctx.font = "bold 13px 'Cinzel', serif";
    ctx.textAlign = "right";
    ctx.fillText("Nguyễn Huy Hoàng — Zalo: 0933116860", tcX + tcW - 30, tcY + tcH - 18);

    ctx.fillStyle = "#8a94a8";
    ctx.font = "12px 'Inter', sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("Dịch Sư Nguyễn Huy Hoàng — Zalo: 0933116860 — Sacombank: 060216644258", 600, 1000);

    // Return synchronous DataURL immediately
    return canvas.toDataURL("image/png");
}

function generateThaiAtPNG(data) {
    const chartData = data || window.lastCalculatedThaiAtData;
    const imgElement = document.getElementById("thai-at-chart-img");
    const downloadBtn = document.getElementById("btn-download-direct");
    const loaderElement = document.getElementById("chart-img-loader");

    if (loaderElement) loaderElement.style.display = "flex";

    try {
        const syncImgSrc = draw5x5ThaiAtSaBan(chartData);
        if (syncImgSrc) {
            if (imgElement) {
                imgElement.src = syncImgSrc;
                imgElement.style.display = "block";
                imgElement.style.userSelect = "auto";
                imgElement.style.webkitUserSelect = "auto";
                imgElement.style.webkitUserDrag = "auto";
                imgElement.style.webkitTouchCallout = "default";
                imgElement.style.pointerEvents = "auto";
                imgElement.style.touchAction = "auto";
            }

            if (downloadBtn) {
                downloadBtn.href = syncImgSrc;
                downloadBtn.style.display = "inline-flex";
            }
            const aiBtn = document.getElementById("btn-ai-luan-giai");
            if (aiBtn) {
                aiBtn.style.display = "inline-flex";
            }
        }
    } catch (err) {
        console.error("Lỗi vẽ Sa Bàn 5x5 Canvas:", err);
    } finally {
        if (loaderElement) loaderElement.style.display = "none";
    }
}

function isZaloOrFbBrowser() {
    const ua = navigator.userAgent || navigator.vendor || window.opera || "";
    return /Zalo|FBAN|FBAV|Messenger/i.test(ua);
}

function openInExternalBrowserThaiAt() {
    const currentUrl = window.location.href.replace(/^https?:\/\//, '');
    const isAndroid = /Android/i.test(navigator.userAgent);
    
    if (isAndroid) {
        window.location.href = 'intent://' + currentUrl + '#Intent;scheme=https;package=com.android.chrome;end;';
    } else {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(window.location.href);
            alert("✅ Đã sao chép link web!\n\nHãy mở ứng dụng SAFARI trên iPhone, dán link vào thanh địa chỉ để tải ảnh tự động.");
        } else {
            alert("Hãy bấm nút [...] ở góc trên bên phải màn hình Zalo, chọn 'Mở bằng Safari' để tải ảnh.");
        }
    }
}

async function handleZaloDownloadThaiAt(imgData) {
    try {
        const res = await fetch(imgData);
        const blob = await res.blob();
        const file = new File([blob], `SaBan_ThaiAt_HD_${Date.now()}.png`, { type: 'image/png' });

        if (navigator.canShare && navigator.canShare({ files: [file] })) {
            await navigator.share({
                files: [file],
                title: 'Sa Bàn Thái Ất HD',
                text: 'Dịch Sư Nguyễn Huy Hoàng — Zalo: 0933116860'
            });
            return;
        }
    } catch (e) {
        console.log("Web Share API error:", e);
    }

    showZaloImageModalThaiAt(imgData);
}

function showZaloImageModalThaiAt(imgData) {
    let modal = document.getElementById("zalo-img-modal-thaiat");
    if (!modal) {
        modal = document.createElement("div");
        modal.id = "zalo-img-modal-thaiat";
        modal.style.cssText = "position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(5, 7, 17, 0.96); z-index: 99999; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 15px; box-sizing: border-box; backdrop-filter: blur(8px);";
        document.body.appendChild(modal);
    }

    modal.innerHTML = `
        <div style="width: 100%; max-width: 550px; text-align: center; position: relative; background: #050711; border: 2px solid #ffd700; border-radius: 12px; padding: 20px 15px; box-sizing: border-box;">
            <button id="close-zalo-modal-thaiat" style="position: absolute; top: 10px; right: 10px; background: #e74c3c; color: #fff; border: none; padding: 6px 14px; border-radius: 20px; font-weight: bold; font-size: 0.85rem; cursor: pointer;">✕ ĐÓNG</button>
            <h4 style="color: #ffd700; margin: 0 0 12px 0; font-family: Cinzel, serif; font-size: 1.05rem; border-bottom: 1px dashed rgba(212, 175, 55, 0.3); padding-bottom: 8px;">📍 CẢNH BÁO TRÌNH DUYỆT</h4>
            
            <div style="background: rgba(231, 76, 60, 0.15); border: 1.5px solid #e74c3c; border-radius: 8px; padding: 12px; margin-bottom: 12px; color: #ff6b6b; font-weight: bold; font-size: 0.95rem; line-height: 1.5;">
                ⚠️ Trình duyệt này chặn tải ảnh, hãy zoom quẻ vừa màn hình rồi chụp lại.
            </div>

            <div style="width: 100%; max-height: 50vh; overflow-y: auto; border-radius: 8px; border: 1px solid #ffd700; box-shadow: 0 8px 30px rgba(0,0,0,0.8);">
                <img src="${imgData}" alt="Sa Bàn Thái Ất HD" style="width: 100%; height: auto; display: block; pointer-events: auto !important; user-select: none !important; -webkit-user-select: none !important; -webkit-touch-callout: default !important; touch-action: manipulation !important;" />
            </div>
        </div>
    `;

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
            if (imgElement && imgElement.src) {
                if (isZaloOrFbBrowser()) {
                    handleZaloDownloadThaiAt(imgElement.src);
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

    if (isZaloOrFbBrowser()) {
        const downloadTip = document.querySelector('.download-tip-text');
        if (downloadTip) {
            downloadTip.innerHTML = '<span style="color: #ff6b6b; font-weight: bold; font-size: 0.95rem;">⚠️ Trình duyệt này chặn tải ảnh, hãy zoom quẻ vừa màn hình rồi chụp lại.</span>';
        }
    }
});

// Backward compatibility alias
function exportChartToPNG(data) {
    generateThaiAtPNG(data);
}
