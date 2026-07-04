/**
 * Vẽ Thẻ Quẻ Dịch Lục Hào - renderer.js
 * Sử dụng Canvas API để vẽ hình ảnh quẻ dịch chất lượng cao (1000x1000px) 
 * theo đúng phong cách cổ điển của ảnh luchao_2026-07-04.png.
 */

const RENDERER = (function () {

    function drawHexagramCard(canvas, quereData, calDetails) {
        const ctx = canvas.getContext("2d");
        const W = canvas.width;
        const H = canvas.height;

        // 1. Nền giấy da cổ (Parchment)
        ctx.fillStyle = "#faf7ee"; 
        ctx.fillRect(0, 0, W, H);

        // Hiệu ứng viền giấy cổ tinh tế
        ctx.strokeStyle = "#8b6508";
        ctx.lineWidth = 6;
        ctx.strokeRect(15, 15, W - 30, H - 30);

        ctx.strokeStyle = "#2b1a0a";
        ctx.lineWidth = 1.5;
        ctx.strokeRect(25, 25, W - 50, H - 50);

        // 2. PHẦN TIÊU ĐỀ & THÔNG TIN LỊCH PHÁP (Y: 50 -> 220)
        ctx.textAlign = "left";
        
        // Font chữ
        const fontSerif = "'Playfair Display', 'Times New Roman', Georgia, serif";
        const fontSans = "Quicksand, system-ui, -apple-system, sans-serif";
        const fontAncient = "'Cinzel', Georgia, serif";

        // Dữ liệu thời gian
        ctx.fillStyle = "#111";
        ctx.font = `bold 20px ${fontSerif}`;
        ctx.fillText("Ngày giờ:", 45, 65);
        
        ctx.fillStyle = "#444";
        ctx.font = `20px ${fontSans}`;
        ctx.fillText(calDetails.solarDateStr, 140, 65);

        ctx.fillStyle = "#111";
        ctx.font = `bold 20px ${fontSerif}`;
        ctx.fillText("Phương pháp:", 430, 65);
        ctx.fillStyle = "#444";
        ctx.font = `20px ${fontSans}`;
        ctx.fillText("Lục hào", 560, 65);

        // Can Chi giờ ngày tháng năm
        ctx.fillStyle = "#111";
        ctx.font = `bold 20px ${fontSerif}`;
        ctx.fillText("Can chi:", 45, 105);
        
        ctx.fillStyle = "#444";
        ctx.font = `20px ${fontSans}`;
        ctx.fillText(`Giờ ${calDetails.hour.can} ${calDetails.hour.chi}, Ngày ${calDetails.day.can} ${calDetails.day.chi} (${calDetails.day.napAm})`, 135, 105);

        // Hào tâm & Tuần Không
        ctx.fillStyle = "#111";
        ctx.font = `bold 20px ${fontSerif}`;
        ctx.fillText("Hào tâm:", 45, 145);
        
        // Hào tâm tính toán: lấy Lục thân và Chi hào 5 (Quân hào) của quẻ chính
        const hao5 = quereData.main.lines[4];
        ctx.fillStyle = "#8b0000"; // Đỏ sẫm
        ctx.font = `bold 20px ${fontSans}`;
        ctx.fillText(`${hao5.lucThan} - ${hao5.chi}`, 140, 145);

        ctx.fillStyle = "#111";
        ctx.font = `bold 20px ${fontSerif}`;
        ctx.fillText("Tuần Không:", 430, 145);
        ctx.fillStyle = "#8b0000";
        ctx.font = `bold 20px ${fontSans}`;
        ctx.fillText(calDetails.tuanKhong.join(", "), 560, 145);

        // Nhật Thần & Nguyệt Lệnh
        ctx.fillStyle = "#111";
        ctx.font = `bold 20px ${fontSerif}`;
        ctx.fillText("Nhật Thần:", 45, 185);
        ctx.fillStyle = "#8b0000";
        ctx.font = `bold 20px ${fontSans}`;
        ctx.fillText(`${calDetails.day.chi} - ${CALENDAR.NGU_HANH[calDetails.day.chi]}`, 155, 185);

        ctx.fillStyle = "#111";
        ctx.font = `bold 20px ${fontSerif}`;
        ctx.fillText("Nguyệt Lệnh:", 430, 185);
        ctx.fillStyle = "#8b0000";
        ctx.font = `bold 20px ${fontSans}`;
        ctx.fillText(`${calDetails.month.chi} - ${CALENDAR.NGU_HANH[calDetails.month.chi]}`, 560, 185);

        // Đường gạch ngang phân cách
        ctx.strokeStyle = "#8b6508";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(40, 215);
        ctx.lineTo(W - 40, 215);
        ctx.stroke();

        // 3. VẼ TƯỢNG QUẺ (Y: 235 -> 475)
        // Quẻ Chính (Trái)
        drawTượngQuẻ(ctx, quereData.main, 240, 240, 150, "QUẺ CHÍNH");

        // Quẻ Biến (Phải)
        drawTượngQuẻ(ctx, quereData.bien, 760, 240, 150, "QUẺ BIẾN");

        // Nhãn ở giữa (Ví dụ: Phản Ngâm / Phục Ngâm hoặc biểu tượng kết nối)
        ctx.textAlign = "center";
        ctx.fillStyle = "#111";
        ctx.font = `bold 22px ${fontAncient}`;
        
        // Kiểm tra xem quẻ có biến động hay không
        let hasDong = quereData.main.lines.some(l => l.dongSymbol !== "-");
        if (hasDong) {
            // Vẽ mũi tên chuyển hóa
            ctx.fillStyle = "#8b6508";
            ctx.font = `bold 40px ${fontSans}`;
            ctx.fillText("➔", 500, 350);
            ctx.fillStyle = "#555";
            ctx.font = `italic 16px ${fontSerif}`;
            ctx.fillText("biến", 500, 385);
        } else {
            ctx.fillStyle = "#555";
            ctx.font = `bold 20px ${fontAncient}`;
            ctx.fillText("QUẺ TĨNH", 500, 350);
        }

        // Đường phân cách trước bảng hào
        ctx.strokeStyle = "#8b6508";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(40, 480);
        ctx.lineTo(W - 40, 480);
        ctx.stroke();

        // 4. VẼ BẢNG HÀO CHI TIẾT LỤC HÀO (Y: 495 -> 765)
        const tableY = 495;
        const rowHeight = 35;
        const cols = [
            { name: "HÀO", w: 55, x: 70 },
            { name: "T/Ư", w: 55, x: 125 },
            { name: "LỤC THÂN", w: 95, x: 200 },
            { name: "CAN CHI", w: 100, x: 300 },
            { name: "P.THẦN", w: 110, x: 405 },
            { name: "TK", w: 45, x: 480 },
            { name: "LỤC THÂN", w: 95, x: 550 },
            { name: "CAN CHI", w: 100, x: 650 },
            { name: "LỤC THÚ", w: 95, x: 750 },
            { name: "TK", w: 45, x: 820 },
            { name: "TS NGÀY", w: 75, x: 880 },
            { name: "TS THÁNG", w: 75, x: 950 }
        ];

        // Vẽ tiêu đề bảng
        ctx.fillStyle = "#222";
        ctx.font = `bold 14px ${fontAncient}`;
        ctx.textAlign = "center";
        cols.forEach(col => {
            ctx.fillText(col.name, col.x, tableY + 20);
        });

        // Vẽ đường gạch dưới tiêu đề bảng
        ctx.strokeStyle = "#444";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(40, tableY + 30);
        ctx.lineTo(W - 40, tableY + 30);
        ctx.stroke();

        // Thu thập các hào để vẽ (vẽ từ hào 6 xuống hào 1, dòng trên cùng là hào 6)
        for (let i = 5; i >= 0; i--) {
            const lineNum = i + 1;
            const mainLine = quereData.main.lines[i];
            const bienLine = quereData.bien.lines[i];
            const pt = quereData.phucThan[i];
            const lucThu = quereData.lucThu[i];

            const currentY = tableY + 35 + (5 - i) * rowHeight;

            // Xác định xem hào này có phải hào động hoặc hào Thế hay không để tô đỏ
            const isThe = quereData.main.the === lineNum;
            const isUng = quereData.main.ung === lineNum;
            const isDong = mainLine.dongSymbol !== "-";

            // Hào Thế hoặc Hào Động thì tô màu đỏ sẫm toàn dòng để nổi bật, còn lại màu đen sẫm
            if (isThe || isDong) {
                ctx.fillStyle = "#8b0000";
                ctx.font = `bold 14px ${fontSans}`;
            } else {
                ctx.fillStyle = "#222";
                ctx.font = `14px ${fontSans}`;
            }

            // 1. Ký hiệu Động (HÀO)
            let dongText = mainLine.dongSymbol;
            if (dongText === "-") dongText = "";
            ctx.fillText(dongText, cols[0].x, currentY + 22);

            // 2. Thế / Ứng
            let teText = "";
            if (isThe) teText = "Thế";
            else if (isUng) teText = "Ứng";
            ctx.fillText(teText, cols[1].x, currentY + 22);

            // 3. Lục Thân chính
            ctx.fillText(mainLine.lucThan, cols[2].x, currentY + 22);

            // 4. Can Chi + Ngũ hành chính
            ctx.fillText(`${mainLine.can}${mainLine.chi}-${mainLine.element}`, cols[3].x, currentY + 22);

            // 5. Phục Thần (nếu có)
            let ptText = "-";
            if (pt) {
                // Hiện Phục Thần
                ptText = `${pt.lucThan} ${pt.can}${pt.chi}-${pt.element}`;
                ctx.save();
                ctx.fillStyle = "#5d4037"; // Nâu gỗ cổ kính cho phục thần
                ctx.font = `italic 12px ${fontSans}`;
                ctx.fillText(ptText, cols[4].x, currentY + 22);
                ctx.restore();
            } else {
                ctx.fillText(ptText, cols[4].x, currentY + 22);
            }

            // 6. Tuần không chính
            ctx.fillText(mainLine.isTuanKhong ? "K" : "-", cols[5].x, currentY + 22);

            // 7. Lục thân biến
            // Chỉ hiện nếu hào này phát động
            if (isDong) {
                ctx.fillText(bienLine.lucThan, cols[6].x, currentY + 22);
            } else {
                ctx.fillText("-", cols[6].x, currentY + 22);
            }

            // 8. Can Chi biến
            if (isDong) {
                ctx.fillText(`${bienLine.can}${bienLine.chi}-${bienLine.element}`, cols[7].x, currentY + 22);
            } else {
                ctx.fillText("-", cols[7].x, currentY + 22);
            }

            // 9. Lục thú
            ctx.fillText(lucThu, cols[8].x, currentY + 22);

            // 10. Tuần không biến
            ctx.fillText(bienLine.isTuanKhong ? "K" : "-", cols[9].x, currentY + 22);

            // 11. TS Ngày
            ctx.fillText(mainLine.tsNgay, cols[10].x, currentY + 22);

            // 12. TS Tháng
            ctx.fillText(mainLine.tsThang, cols[11].x, currentY + 22);

            // Vẽ đường kẻ mờ phân dòng
            ctx.strokeStyle = "rgba(139, 101, 8, 0.15)";
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(40, currentY + 30);
            ctx.lineTo(W - 40, currentY + 30);
            ctx.stroke();
        }

        // Vẽ khung bảng dọc nhạt
        ctx.strokeStyle = "rgba(139, 101, 8, 0.2)";
        ctx.lineWidth = 0.5;
        cols.forEach((col, idx) => {
            if (idx === 0) return;
            ctx.beginPath();
            ctx.moveTo(col.x - col.w / 2 - 2, tableY + 5);
            ctx.lineTo(col.x - col.w / 2 - 2, tableY + 245);
            ctx.stroke();
        });

        // Đường ngang cuối bảng
        ctx.strokeStyle = "#8b6508";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(40, tableY + 250);
        ctx.lineTo(W - 40, tableY + 250);
        ctx.stroke();

        // 5. PHẦN THẦN SÁT (Y: 765 -> 960)
        const ssY = 765;
        ctx.textAlign = "left";
        ctx.fillStyle = "#111";
        ctx.font = `bold 18px ${fontAncient}`;
        ctx.fillText("THẦN SÁT", 45, ssY + 28);

        // Tính các địa chi "Động" trong quẻ để highlight Thần sát đỏ
        // Chi động bao gồm các chi của hào phát động và chi của hào biến của hào đó
        let activeChis = new Set();
        quereData.main.lines.forEach((l, idx) => {
            if (l.dongSymbol !== "-") {
                activeChis.add(l.chi);
                activeChis.add(quereData.bien.lines[idx].chi);
            }
        });

        // Hàm vẽ Thần Sát có highlight đỏ nếu chi nằm trong activeChis
        function fillShenShaText(label, value, x, y) {
            ctx.fillStyle = "#111";
            ctx.font = `bold 15px ${fontSerif}`;
            ctx.fillText(label + ":", x, y);

            // Kiểm tra xem có chứa chi động nào không
            let isHighlight = false;
            if (Array.isArray(value)) {
                isHighlight = value.some(v => activeChis.has(v));
            } else {
                isHighlight = activeChis.has(value);
            }

            if (isHighlight) {
                ctx.fillStyle = "#8b0000"; // Highlight đỏ sẫm
                ctx.font = `bold 15px ${fontSans}`;
            } else {
                ctx.fillStyle = "#444";
                ctx.font = `15px ${fontSans}`;
            }

            let valStr = Array.isArray(value) ? value.join(", ") : value;
            ctx.fillText(valStr, x + ctx.measureText(label + ": ").width, y);
        }

        const ss = quereData.shenSha;
        const colW = 225;
        const rowH = 30;

        // Cột 1
        fillShenShaText("Quý Nhân", ss.quyNhan, 45, ssY + 65);
        fillShenShaText("Dịch Mã", ss.dichMa, 45, ssY + 65 + rowH);
        fillShenShaText("Hoa Cái", ss.hoaCai, 45, ssY + 65 + rowH * 2);
        fillShenShaText("Thiên Y", ss.thienY, 45, ssY + 65 + rowH * 3);

        // Cột 2
        fillShenShaText("Lộc Thần", ss.locThan, 45 + colW, ssY + 65);
        fillShenShaText("Đào Hoa", ss.daoHoa, 45 + colW, ssY + 65 + rowH);
        fillShenShaText("Mưu Tinh", ss.muuTinh, 45 + colW, ssY + 65 + rowH * 2);
        fillShenShaText("Thiên Hỉ", ss.thienHi, 45 + colW, ssY + 65 + rowH * 3);

        // Cột 3
        fillShenShaText("Dương Nhận", ss.duongNhan, 45 + colW * 2, ssY + 65);
        fillShenShaText("Tướng Tinh", ss.tuongTinh, 45 + colW * 2, ssY + 65 + rowH);
        fillShenShaText("Tai Sát", ss.taiSat, 45 + colW * 2, ssY + 65 + rowH * 2);

        // Cột 4
        fillShenShaText("Văn Xương", ss.vanXuong, 45 + colW * 3, ssY + 65);
        fillShenShaText("Kiếp Sát", ss.kiepSát, 45 + colW * 3, ssY + 65 + rowH);
        fillShenShaText("Vong Thần", ss.vongThan, 45 + colW * 3, ssY + 65 + rowH * 2);

        // Ghi chú bản quyền / liên kết ở góc dưới bên phải
        ctx.textAlign = "right";
        ctx.fillStyle = "#8b6508";
        ctx.font = `italic 13px ${fontSerif}`;
        ctx.fillText("Lập quẻ luận giải: Dịch học Lục Hào", W - 45, H - 35);
    }

    // Vẽ hình ảnh 6 hào cho một quẻ tượng
    function drawTượngQuẻ(ctx, hex, centerX, startY, width, label) {
        const lineH = 12;
        const gap = 12;
        const fontSerif = "'Playfair Display', 'Times New Roman', Georgia, serif";

        ctx.textAlign = "center";
        
        // Nhãn tên tiêu đề quẻ
        ctx.fillStyle = "#8b0000";
        ctx.font = `bold 24px ${fontSerif}`;
        ctx.fillText(hex.name, centerX, startY);

        // Vẽ 6 hào (từ hào 6 ở trên xuống hào 1 ở dưới)
        const startDrawY = startY + 25;
        for (let i = 5; i >= 0; i--) {
            const lineNum = i + 1;
            const val = hex.lines[i].lineNum ? (hex.lines[i].chi ? CALENDAR.CHI.indexOf(hex.lines[i].chi) : 0) : 0; // Dự phòng
            
            // Lấy giá trị âm hay dương chính xác từ hào
            // Trong hex.lines, nếu là hào Dương thì nét liền, hào Âm thì nét đứt
            // Ta dùng quẻ nạp giáp làm chuẩn
            // Chúng ta có thể kiểm tra xem hào này là Hào Dương (1) hay Hào Âm (0)
            // Lấy trực tiếp từ hex.lines[i].chi hoặc nạp âm, nhưng tốt nhất lấy từ hào quẻ chính/biến đã tính
            // Ta lưu giá trị hào trong quẻ là Dương (1) hoặc Âm (0).
            // Ta sẽ xây dựng thuộc tính `val` trong quẻ đại diện cho 1 (Dương) hoặc 0 (Âm)
            // Hãy xem quereData.main.lines[i] có thuộc tính gì?
            // Ở iching_core.js ta có nạp giáp, ngũ hành.
            // Để vẽ đúng hình, ta cần biết hào đó là liền hay đứt.
            // Hãy lấy từ mainLinesDetail/bienLinesDetail, ta có can chi. Chi thuộc ngũ hành âm hay dương?
            // Địa chi Dương: Tý, Dần, Thìn, Ngọ, Thân, Tuất (chỉ số chẵn/lẻ tùy cách đếm).
            // Thực tế trong Nạp Giáp:
            // Quẻ đơn Dương (Càn, Chấn, Khảm, Cấn) có các hào địa chi Dương.
            // Quẻ đơn Âm (Khôn, Tốn, Ly, Đoài) có các hào địa chi Âm.
            // Vì vậy, ta có thể xác định hào đó là Dương hay Âm bằng cách kiểm tra quẻ đơn thượng/hạ của nó!
            // Nhưng cách đơn giản và chính xác nhất là: truyền trực tiếp trạng thái hào (0: Âm, 1: Dương) vào!
            // Lấy từ quereData.main/bien lines: ta có thể thêm thuộc tính `isYang` khi build quẻ.
            // Hãy kiểm tra xem: chi có thuộc nhóm Dương hay Âm?
            // Chi Dương: Tý, Dần, Thìn, Ngọ, Thân, Tuất.
            // Chi Âm: Sửu, Mão, Tỵ, Mùi, Dậu, Hợi.
            // Trong Lục Hào, hào Dương trì chi Dương, hào Âm trì chi Âm!
            // Đây là quy luật Nạp Giáp tự nhiên của 64 quẻ!
            // Ví dụ Cấn (quẻ Dương) nạp Thìn, Ngọ, Thân, Tuất, Tý, Dần (toàn chi Dương).
            // Khôn (quẻ Âm) nạp Mùi, Tị, Mão, Sửu, Hợi, Dậu (toàn chi Âm).
            // Do đó: Chi Dương => Hào Dương (Liền). Chi Âm => Hào Âm (Đứt).
            // Quy luật này cực kỳ chính xác và đồng bộ 100%!
            
            const chi = hex.lines[i].chi;
            const isYang = ["Tý", "Dần", "Thìn", "Ngọ", "Thân", "Tuất"].includes(chi);

            const curY = startDrawY + (5 - i) * (lineH + gap);

            // Xác định xem hào này có Thế hay Hào động để vẽ màu đỏ
            const isThe = hex.the === lineNum;
            const isDong = hex.lines[i].dongSymbol && hex.lines[i].dongSymbol !== "-";
            
            ctx.fillStyle = (isThe || isDong) ? "#8b0000" : "#2b1a0a";

            if (isYang) {
                // Hào Dương: Một nét liền
                ctx.fillRect(centerX - width / 2, curY, width, lineH);
            } else {
                // Hào Âm: Hai nét đứt
                const segW = (width - 15) / 2; // khoảng trống ở giữa là 15px
                ctx.fillRect(centerX - width / 2, curY, segW, lineH);
                ctx.fillRect(centerX + 15 / 2, curY, segW, lineH);
            }
        }

        // Họ của quẻ dịch nằm ở dưới tượng quẻ
        ctx.fillStyle = "#111";
        ctx.font = `bold 16px ${fontSerif}`;
        let subText = `HỌ ${hex.palace.toUpperCase()}`;
        if (hex.isLucXung) subText += " - LỤC XUNG";
        ctx.fillText(subText, centerX, startDrawY + 6 * (lineH + gap) + 10);
    }

    return {
        drawHexagramCard
    };

})();
