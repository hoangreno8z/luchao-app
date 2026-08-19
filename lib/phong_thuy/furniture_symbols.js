// ============================================================
// Architectural Vector Furniture Symbols (Pure SVG Elements)
// Thư Viện Ký Hiệu Nội Thất Vector Chuẩn Bản Vẽ CAD Kiến Trúc
// Tác giả: Dịch Sư Nguyễn Huy Hoàng
// ============================================================

/**
 * Render một đối tượng nội thất vector thành SVG string.
 * @param {Object} item - Đối tượng furniture (x, y, width, height, type, label)
 * @param {boolean} isWhite - Chế độ nền trắng (true) hoặc tối (false)
 * @returns {string} SVG snippet
 */
export function renderFurnitureSvg(item, isWhite = true) {
    const { x, y, width: w, height: h, type, label } = item;
    const stroke = isWhite ? '#334155' : '#cbd5e1';
    const fill = isWhite ? '#f8fafc' : '#1e293b';
    const accent = isWhite ? '#0284c7' : '#38bdf8';
    const gold = isWhite ? '#b45309' : '#fbbf24';

    switch (type) {
        case 'sofa_living': {
            // Sofa góc L + Bàn trà kính
            const armW = Math.min(250, w * 0.12);
            const backD = Math.min(300, h * 0.22);
            const tableW = Math.min(1200, w * 0.45);
            const tableH = Math.min(700, h * 0.35);
            const tx = x + (w - tableW) / 2;
            const ty = y + h - tableH - 100;

            return `
                <g id="${item.id}" class="cad-furniture sofa">
                    <!-- Thảm trải sàn -->
                    <rect x="${x - 100}" y="${y - 100}" width="${w + 200}" height="${h + 200}" fill="${isWhite ? '#f1f5f9' : '#0f172a'}" stroke="${isWhite ? '#e2e8f0' : '#334155'}" stroke-dasharray="80,40" stroke-width="20" rx="60"/>
                    <!-- Khung ghế Sofa chữ L -->
                    <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}" stroke="${stroke}" stroke-width="35" rx="80"/>
                    <!-- Tựa lưng sau -->
                    <rect x="${x}" y="${y}" width="${w}" height="${backD}" fill="${isWhite ? '#e2e8f0' : '#334155'}" stroke="${stroke}" stroke-width="25"/>
                    <!-- Tay vịn 2 bên -->
                    <rect x="${x}" y="${y}" width="${armW}" height="${h}" fill="${isWhite ? '#e2e8f0' : '#334155'}" stroke="${stroke}" stroke-width="25"/>
                    <rect x="${x + w - armW}" y="${y}" width="${armW}" height="${h}" fill="${isWhite ? '#e2e8f0' : '#334155'}" stroke="${stroke}" stroke-width="25"/>
                    <!-- Bàn trà trung tâm -->
                    <rect x="${tx}" y="${ty}" width="${tableW}" height="${tableH}" fill="${isWhite ? '#e0f2fe' : '#1e3a8a'}" stroke="${accent}" stroke-width="30" rx="40"/>
                    <line x1="${tx + 100}" y1="${ty + tableH / 2}" x2="${tx + tableW - 100}" y2="${ty + tableH / 2}" stroke="${accent}" stroke-width="20" stroke-dasharray="40,30"/>
                </g>
            `;
        }

        case 'dining_set': {
            // Bàn ăn 6 ghế
            const chairW = Math.min(450, w / 3.5);
            const chairD = 350;
            const chairSpacing = (w - chairW * 3) / 4;

            let chairsSvg = '';
            for (let i = 0; i < 3; i++) {
                const cx = x + chairSpacing * (i + 1) + chairW * i;
                // Ghế phía trên
                chairsSvg += `<rect x="${cx}" y="${y - chairD + 50}" width="${chairW}" height="${chairD}" fill="${isWhite ? '#e2e8f0' : '#334155'}" stroke="${stroke}" stroke-width="25" rx="40"/>`;
                // Ghế phía dưới
                chairsSvg += `<rect x="${cx}" y="${y + h - 50}" width="${chairW}" height="${chairD}" fill="${isWhite ? '#e2e8f0' : '#334155'}" stroke="${stroke}" stroke-width="25" rx="40"/>`;
            }

            return `
                <g id="${item.id}" class="cad-furniture dining">
                    ${chairsSvg}
                    <!-- Mặt bàn ăn gỗ bo góc -->
                    <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}" stroke="${stroke}" stroke-width="35" rx="60"/>
                    <!-- Đĩa ăn và khăn trải bàn trang trí -->
                    <circle cx="${x + w * 0.25}" cy="${y + h / 2}" r="120" fill="none" stroke="${stroke}" stroke-width="20"/>
                    <circle cx="${x + w * 0.5}" cy="${y + h / 2}" r="120" fill="none" stroke="${stroke}" stroke-width="20"/>
                    <circle cx="${x + w * 0.75}" cy="${y + h / 2}" r="120" fill="none" stroke="${stroke}" stroke-width="20"/>
                </g>
            `;
        }

        case 'kitchen_set': {
            // Tủ bếp kèm bếp đôi & chậu rửa đôi
            const hobX = x + w * 0.25;
            const sinkX = x + w * 0.7;

            return `
                <g id="${item.id}" class="cad-furniture kitchen">
                    <!-- Mặt đá bếp -->
                    <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}" stroke="${stroke}" stroke-width="35"/>
                    <!-- Bếp từ đôi (2 vòng tròn lửa/cảm ứng) -->
                    <rect x="${hobX - 350}" y="${y + 80}" width="700" height="${h - 160}" fill="${isWhite ? '#fee2e2' : '#450a0a'}" stroke="#ef4444" stroke-width="25" rx="30"/>
                    <circle cx="${hobX - 160}" cy="${y + h / 2}" r="110" fill="none" stroke="#ef4444" stroke-width="25"/>
                    <circle cx="${hobX + 160}" cy="${y + h / 2}" r="110" fill="none" stroke="#ef4444" stroke-width="25"/>
                    <!-- Chậu rửa đôi inox + Vòi nước xoay -->
                    <rect x="${sinkX - 450}" y="${y + 80}" width="900" height="${h - 160}" fill="${isWhite ? '#e0f2fe' : '#0c4a6e'}" stroke="${accent}" stroke-width="25" rx="20"/>
                    <rect x="${sinkX - 400}" y="${y + 120}" width="380" height="${h - 240}" fill="none" stroke="${accent}" stroke-width="20" rx="15"/>
                    <rect x="${sinkX + 20}" y="${y + 120}" width="380" height="${h - 240}" fill="none" stroke="${accent}" stroke-width="20" rx="15"/>
                    <circle cx="${sinkX}" cy="${y + 120}" r="35" fill="${accent}"/>
                </g>
            `;
        }

        case 'bed_master': {
            // Giường King-size 2 gối + Nếp chăn + 2 Tủ đầu giường
            const pillowW = (w - 300) / 2;
            const pillowH = Math.min(450, h * 0.22);
            const nightstandSize = 400;

            return `
                <g id="${item.id}" class="cad-furniture bed-master">
                    <!-- 2 Tủ đầu giường (Tab đệm) -->
                    <rect x="${x - nightstandSize - 50}" y="${y}" width="${nightstandSize}" height="${nightstandSize}" fill="${fill}" stroke="${stroke}" stroke-width="25" rx="20"/>
                    <circle cx="${x - nightstandSize / 2 - 50}" cy="${y + nightstandSize / 2}" r="40" fill="${gold}"/>
                    <rect x="${x + w + 50}" y="${y}" width="${nightstandSize}" height="${nightstandSize}" fill="${fill}" stroke="${stroke}" stroke-width="25" rx="20"/>
                    <circle cx="${x + w + 50 + nightstandSize / 2}" cy="${y + nightstandSize / 2}" r="40" fill="${gold}"/>

                    <!-- Khung nệm giường -->
                    <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}" stroke="${stroke}" stroke-width="35" rx="50"/>
                    <!-- Đầu giường bọc da -->
                    <rect x="${x}" y="${y}" width="${w}" height="150" fill="${isWhite ? '#cbd5e1' : '#475569'}" stroke="${stroke}" stroke-width="25"/>
                    <!-- 2 Gối nằm êm ái -->
                    <rect x="${x + 80}" y="${y + 180}" width="${pillowW}" height="${pillowH}" fill="${isWhite ? '#ffffff' : '#334155'}" stroke="${stroke}" stroke-width="20" rx="30"/>
                    <rect x="${x + w - pillowW - 80}" y="${y + 180}" width="${pillowW}" height="${pillowH}" fill="${isWhite ? '#ffffff' : '#334155'}" stroke="${stroke}" stroke-width="20" rx="30"/>
                    <!-- Nếp gấp chăn (Quilt contour) -->
                    <path d="M ${x} ${y + h * 0.45} Q ${x + w / 2} ${y + h * 0.52} ${x + w} ${y + h * 0.45} L ${x + w} ${y + h} L ${x} ${y + h} Z" fill="${isWhite ? '#fef3c7' : '#451a03'}" stroke="${gold}" stroke-width="25"/>
                </g>
            `;
        }

        case 'bed_single': {
            // Giường đơn 1 gối + Nếp chăn
            const pillowW = w - 300;
            const pillowH = Math.min(420, h * 0.22);

            return `
                <g id="${item.id}" class="cad-furniture bed-single">
                    <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}" stroke="${stroke}" stroke-width="30" rx="40"/>
                    <rect x="${x}" y="${y}" width="${w}" height="120" fill="${isWhite ? '#cbd5e1' : '#475569'}" stroke="${stroke}" stroke-width="20"/>
                    <rect x="${x + 150}" y="${y + 150}" width="${pillowW}" height="${pillowH}" fill="${isWhite ? '#ffffff' : '#334155'}" stroke="${stroke}" stroke-width="20" rx="25"/>
                    <path d="M ${x} ${y + h * 0.48} Q ${x + w / 2} ${y + h * 0.54} ${x + w} ${y + h * 0.48} L ${x + w} ${y + h} L ${x} ${y + h} Z" fill="${isWhite ? '#e0f2fe' : '#082f49'}" stroke="${accent}" stroke-width="25"/>
                </g>
            `;
        }

        case 'toilet_set': {
            // Vách tắm kính + Bồn cầu + Bàn Lavabo
            const showerW = Math.min(1000, w * 0.45);
            const toiletW = Math.min(500, w * 0.3);
            const toiletD = Math.min(700, h * 0.45);

            return `
                <g id="${item.id}" class="cad-furniture toilet">
                    <!-- Viền nền chống trơn -->
                    <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}" stroke="${stroke}" stroke-width="25" stroke-dasharray="100,50"/>
                    <!-- Vách kính phòng tắm đứng -->
                    <rect x="${x + 50}" y="${y + 50}" width="${showerW}" height="${h - 100}" fill="${isWhite ? '#f0f9ff' : '#0369a1'}" stroke="${accent}" stroke-width="25" opacity="0.6"/>
                    <line x1="${x + 50}" y1="${y + 50}" x2="${x + 50 + showerW}" y2="${y + h - 50}" stroke="${accent}" stroke-width="15" stroke-dasharray="40,40"/>
                    <!-- Bồn cầu elip kèm két nước -->
                    <g transform="translate(${x + w - toiletW - 80}, ${y + 80})">
                        <rect x="0" y="0" width="${toiletW}" height="220" fill="${isWhite ? '#ffffff' : '#475569'}" stroke="${stroke}" stroke-width="25" rx="20"/>
                        <ellipse cx="${toiletW / 2}" cy="${toiletD / 2 + 100}" rx="${toiletW / 2 - 20}" ry="${toiletD / 2 - 40}" fill="${isWhite ? '#ffffff' : '#475569'}" stroke="${stroke}" stroke-width="25"/>
                    </g>
                    <!-- Lavabo rửa mặt hình bầu dục -->
                    <rect x="${x + showerW + 100}" y="${y + h - 500}" width="600" height="420" fill="${isWhite ? '#ffffff' : '#334155'}" stroke="${stroke}" stroke-width="25" rx="20"/>
                    <ellipse cx="${x + showerW + 400}" cy="${y + h - 290}" rx="220" ry="150" fill="none" stroke="${accent}" stroke-width="20"/>
                </g>
            `;
        }

        case 'altar_set': {
            // Bàn thờ gia tiên chạm trổ trang nghiêm + Bát nhang
            const burnerR = Math.min(80, h * 0.12);
            return `
                <g id="${item.id}" class="cad-furniture altar">
                    <!-- Khung bàn thờ viền kép gỗ quý -->
                    <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${isWhite ? '#fef3c7' : '#451a03'}" stroke="${gold}" stroke-width="40" rx="30"/>
                    <rect x="${x + 60}" y="${y + 60}" width="${w - 120}" height="${h - 120}" fill="none" stroke="${gold}" stroke-width="20" stroke-dasharray="60,40"/>
                    <!-- Bát nhang trung tâm -->
                    <circle cx="${x + w / 2}" cy="${y + h / 2}" r="${burnerR}" fill="${gold}" stroke="${isWhite ? '#78350f' : '#fef08a'}" stroke-width="20"/>
                    <!-- 2 Chân nến đồng 2 bên -->
                    <circle cx="${x + w * 0.22}" cy="${y + h / 2}" r="50" fill="${gold}"/>
                    <circle cx="${x + w * 0.78}" cy="${y + h / 2}" r="50" fill="${gold}"/>
                    <!-- Chữ Ban Thờ phong thủy -->
                    <text x="${x + w / 2}" y="${y + h - 80}" text-anchor="middle" font-family="Inter, sans-serif" font-size="120" font-weight="bold" fill="${gold}">BÀN THỜ GIA TIÊN</text>
                </g>
            `;
        }

        case 'stairs_flight': {
            // Cầu thang 21 bậc có đánh số và mũi tên chỉ hướng đi lên
            const stepCount = 14;
            const stepH = h / stepCount;
            let stepsSvg = '';
            for (let i = 1; i < stepCount; i++) {
                stepsSvg += `<line x1="${x}" y1="${y + i * stepH}" x2="${x + w}" y2="${y + i * stepH}" stroke="${stroke}" stroke-width="20"/>`;
            }

            const arrowX = x + w / 2;
            const arrowStartY = y + h - 200;
            const arrowEndY = y + 250;

            return `
                <g id="${item.id}" class="cad-furniture stairs">
                    <!-- Khung vế thang -->
                    <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}" stroke="${stroke}" stroke-width="35"/>
                    ${stepsSvg}
                    <!-- Lan can tay vịn ở giữa -->
                    <line x1="${arrowX}" y1="${y}" x2="${arrowX}" y2="${y + h}" stroke="${accent}" stroke-width="25" stroke-dasharray="100,50"/>
                    <!-- Mũi tên hướng lên tầng -->
                    <circle cx="${arrowX}" cy="${arrowStartY}" r="60" fill="${accent}"/>
                    <line x1="${arrowX}" y1="${arrowStartY}" x2="${arrowX}" y2="${arrowEndY}" stroke="${accent}" stroke-width="35"/>
                    <polygon points="${arrowX},${arrowEndY - 80} ${arrowX - 80},${arrowEndY + 80} ${arrowX + 80},${arrowEndY + 80}" fill="${accent}"/>
                    <text x="${x + w - 100}" y="${y + h - 80}" text-anchor="end" font-family="Inter, sans-serif" font-size="100" font-weight="bold" fill="${accent}">21 BẬC</text>
                </g>
            `;
        }

        case 'garage_car': {
            // Silhouette xe ô tô sedan/SUV nhìn từ trên xuống
            return `
                <g id="${item.id}" class="cad-furniture car">
                    <!-- Vạch sơn khu đỗ xe -->
                    <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="none" stroke="${accent}" stroke-width="30" stroke-dasharray="120,60" rx="40"/>
                    <!-- Thân xe ô tô khí động học -->
                    <rect x="${x + w * 0.12}" y="${y + h * 0.1}" width="${w * 0.76}" height="${h * 0.8}" fill="${isWhite ? '#e2e8f0' : '#334155'}" stroke="${stroke}" stroke-width="35" rx="${w * 0.25}"/>
                    <!-- Kính chắn gió trước & sau -->
                    <path d="M ${x + w * 0.2} ${y + h * 0.3} Q ${x + w / 2} ${y + h * 0.25} ${x + w * 0.8} ${y + h * 0.3}" stroke="${accent}" stroke-width="30" fill="none"/>
                    <path d="M ${x + w * 0.2} ${y + h * 0.7} Q ${x + w / 2} ${y + h * 0.75} ${x + w * 0.8} ${y + h * 0.7}" stroke="${accent}" stroke-width="30" fill="none"/>
                    <!-- 4 Bánh xe cao su -->
                    <rect x="${x + w * 0.05}" y="${y + h * 0.2}" width="100" height="300" fill="#0f172a" rx="20"/>
                    <rect x="${x + w * 0.95 - 100}" y="${y + h * 0.2}" width="100" height="300" fill="#0f172a" rx="20"/>
                    <rect x="${x + w * 0.05}" y="${y + h * 0.65}" width="100" height="300" fill="#0f172a" rx="20"/>
                    <rect x="${x + w * 0.95 - 100}" y="${y + h * 0.65}" width="100" height="300" fill="#0f172a" rx="20"/>
                </g>
            `;
        }

        case 'desk_study': {
            // Bàn làm việc L + Ghế xoay
            return `
                <g id="${item.id}" class="cad-furniture desk">
                    <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}" stroke="${stroke}" stroke-width="30" rx="30"/>
                    <!-- Màn hình PC / Laptop -->
                    <rect x="${x + (w - 600) / 2}" y="${y + 100}" width="600" height="120" fill="${stroke}" rx="15"/>
                    <!-- Ghế xoay văn phòng -->
                    <circle cx="${x + w / 2}" cy="${y + h + 250}" r="220" fill="${isWhite ? '#e2e8f0' : '#334155'}" stroke="${stroke}" stroke-width="25"/>
                </g>
            `;
        }

        case 'laundry_set': {
            // Máy giặt lồng ngang + Chậu giặt
            return `
                <g id="${item.id}" class="cad-furniture laundry">
                    <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}" stroke="${stroke}" stroke-width="30" rx="30"/>
                    <!-- Cửa kính tròn lồng giặt -->
                    <circle cx="${x + w / 2}" cy="${y + h / 2}" r="${Math.min(w, h) * 0.35}" fill="none" stroke="${accent}" stroke-width="25"/>
                    <circle cx="${x + w / 2}" cy="${y + h / 2}" r="${Math.min(w, h) * 0.2}" fill="${accent}" opacity="0.3"/>
                </g>
            `;
        }

        case 'skylight_vent': {
            // Giếng trời dấu X nét đứt lấy sáng
            return `
                <g id="${item.id}" class="cad-furniture skylight">
                    <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="none" stroke="${accent}" stroke-width="25" stroke-dasharray="80,50"/>
                    <line x1="${x}" y1="${y}" x2="${x + w}" y2="${y + h}" stroke="${accent}" stroke-width="20" stroke-dasharray="60,40"/>
                    <line x1="${x + w}" y1="${y}" x2="${x}" y2="${y + h}" stroke="${accent}" stroke-width="20" stroke-dasharray="60,40"/>
                    <text x="${x + w / 2}" y="${y + h / 2 + 30}" text-anchor="middle" font-family="Inter, sans-serif" font-size="110" font-weight="bold" fill="${accent}">GIẾNG TRỜI</text>
                </g>
            `;
        }

        default:
            return `<rect id="${item.id}" x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}" stroke="${stroke}" stroke-width="25"/>`;
    }
}
