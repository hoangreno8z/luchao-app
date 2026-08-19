// ============================================================
// Architectural Vector Furniture Symbols (Delicate CAD Standard)
// Thư Viện Ký Hiệu Nội Thất Vector Chuẩn Nét Mảnh Kiến Trúc
// Tác giả: Dịch Sư Nguyễn Huy Hoàng
// ============================================================

/**
 * Render một đối tượng nội thất vector thành SVG string với nét vẽ mảnh tinh xảo.
 * @param {Object} item - Đối tượng furniture (x, y, width, height, type, label)
 * @param {boolean} isWhite - Chế độ nền trắng (true) hoặc tối (false)
 * @returns {string} SVG snippet
 */
export function renderFurnitureSvg(item, isWhite = true) {
    const { x, y, width: w, height: h, type } = item;
    const stroke = isWhite ? '#475569' : '#94a3b8';
    const fill = isWhite ? '#f8fafc' : '#1e293b';
    const accent = isWhite ? '#0284c7' : '#38bdf8';
    const gold = isWhite ? '#b45309' : '#fbbf24';

    switch (type) {
        case 'sofa_living': {
            const armW = Math.min(220, w * 0.12);
            const backD = Math.min(260, h * 0.22);
            const tableW = Math.min(1200, w * 0.45);
            const tableH = Math.min(650, h * 0.35);
            const tx = x + (w - tableW) / 2;
            const ty = y + h - tableH - 80;

            return `
                <g id="${item.id}" class="cad-furniture sofa">
                    <!-- Thảm trải sàn nét đứt mảnh -->
                    <rect x="${x - 80}" y="${y - 80}" width="${w + 160}" height="${h + 160}" fill="${isWhite ? '#f8fafc' : '#0b1120'}" stroke="${isWhite ? '#cbd5e1' : '#334155'}" stroke-dasharray="40,20" stroke-width="6" rx="30"/>
                    <!-- Khung ghế Sofa chữ L -->
                    <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}" stroke="${stroke}" stroke-width="12" rx="30"/>
                    <!-- Tựa lưng sau -->
                    <rect x="${x}" y="${y}" width="${w}" height="${backD}" fill="${isWhite ? '#f1f5f9' : '#334155'}" stroke="${stroke}" stroke-width="8"/>
                    <!-- Tay vịn 2 bên -->
                    <rect x="${x}" y="${y}" width="${armW}" height="${h}" fill="${isWhite ? '#f1f5f9' : '#334155'}" stroke="${stroke}" stroke-width="8"/>
                    <rect x="${x + w - armW}" y="${y}" width="${armW}" height="${h}" fill="${isWhite ? '#f1f5f9' : '#334155'}" stroke="${stroke}" stroke-width="8"/>
                    <!-- Bàn trà kính trung tâm -->
                    <rect x="${tx}" y="${ty}" width="${tableW}" height="${tableH}" fill="${isWhite ? '#f0f9ff' : '#0c4a6e'}" stroke="${accent}" stroke-width="10" rx="20"/>
                    <line x1="${tx + 60}" y1="${ty + tableH / 2}" x2="${tx + tableW - 60}" y2="${ty + tableH / 2}" stroke="${accent}" stroke-width="6" stroke-dasharray="20,15"/>
                </g>
            `;
        }

        case 'dining_set': {
            const chairW = Math.min(420, w / 3.6);
            const chairD = 320;
            const chairSpacing = (w - chairW * 3) / 4;

            let chairsSvg = '';
            for (let i = 0; i < 3; i++) {
                const cx = x + chairSpacing * (i + 1) + chairW * i;
                // Ghế phía trên
                chairsSvg += `<rect x="${cx}" y="${y - chairD + 40}" width="${chairW}" height="${chairD}" fill="${isWhite ? '#f1f5f9' : '#334155'}" stroke="${stroke}" stroke-width="8" rx="15"/>`;
                // Ghế phía dưới
                chairsSvg += `<rect x="${cx}" y="${y + h - 40}" width="${chairW}" height="${chairD}" fill="${isWhite ? '#f1f5f9' : '#334155'}" stroke="${stroke}" stroke-width="8" rx="15"/>`;
            }

            return `
                <g id="${item.id}" class="cad-furniture dining">
                    ${chairsSvg}
                    <!-- Mặt bàn ăn gỗ bo góc -->
                    <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}" stroke="${stroke}" stroke-width="12" rx="30"/>
                    <!-- Đĩa ăn và chi tiết trang trí mảnh -->
                    <circle cx="${x + w * 0.25}" cy="${y + h / 2}" r="80" fill="none" stroke="${stroke}" stroke-width="6"/>
                    <circle cx="${x + w * 0.5}" cy="${y + h / 2}" r="80" fill="none" stroke="${stroke}" stroke-width="6"/>
                    <circle cx="${x + w * 0.75}" cy="${y + h / 2}" r="80" fill="none" stroke="${stroke}" stroke-width="6"/>
                </g>
            `;
        }

        case 'kitchen_set': {
            const hobX = x + w * 0.25;
            const sinkX = x + w * 0.7;

            return `
                <g id="${item.id}" class="cad-furniture kitchen">
                    <!-- Mặt đá bếp -->
                    <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}" stroke="${stroke}" stroke-width="12"/>
                    <!-- Bếp từ đôi -->
                    <rect x="${hobX - 280}" y="${y + 60}" width="560" height="${h - 120}" fill="${isWhite ? '#fee2e2' : '#450a0a'}" stroke="#ef4444" stroke-width="8" rx="15"/>
                    <circle cx="${hobX - 130}" cy="${y + h / 2}" r="80" fill="none" stroke="#ef4444" stroke-width="8"/>
                    <circle cx="${hobX + 130}" cy="${y + h / 2}" r="80" fill="none" stroke="#ef4444" stroke-width="8"/>
                    <!-- Chậu rửa đôi inox -->
                    <rect x="${sinkX - 350}" y="${y + 60}" width="700" height="${h - 120}" fill="${isWhite ? '#f0f9ff' : '#0c4a6e'}" stroke="${accent}" stroke-width="8" rx="10"/>
                    <rect x="${sinkX - 310}" y="${y + 90}" width="290" height="${h - 180}" fill="none" stroke="${accent}" stroke-width="6" rx="8"/>
                    <rect x="${sinkX + 20}" y="${y + 90}" width="290" height="${h - 180}" fill="none" stroke="${accent}" stroke-width="6" rx="8"/>
                    <circle cx="${sinkX}" cy="${y + 90}" r="20" fill="${accent}"/>
                </g>
            `;
        }

        case 'bed_master': {
            const pillowW = (w - 240) / 2;
            const pillowH = Math.min(380, h * 0.20);
            const nightstandSize = 350;

            return `
                <g id="${item.id}" class="cad-furniture bed-master">
                    <!-- 2 Tủ đầu giường -->
                    <rect x="${x - nightstandSize - 30}" y="${y}" width="${nightstandSize}" height="${nightstandSize}" fill="${fill}" stroke="${stroke}" stroke-width="8" rx="10"/>
                    <circle cx="${x - nightstandSize / 2 - 30}" cy="${y + nightstandSize / 2}" r="25" fill="${gold}"/>
                    <rect x="${x + w + 30}" y="${y}" width="${nightstandSize}" height="${nightstandSize}" fill="${fill}" stroke="${stroke}" stroke-width="8" rx="10"/>
                    <circle cx="${x + w + 30 + nightstandSize / 2}" cy="${y + nightstandSize / 2}" r="25" fill="${gold}"/>

                    <!-- Khung nệm giường -->
                    <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}" stroke="${stroke}" stroke-width="12" rx="20"/>
                    <!-- Đầu giường -->
                    <rect x="${x}" y="${y}" width="${w}" height="100" fill="${isWhite ? '#cbd5e1' : '#475569'}" stroke="${stroke}" stroke-width="8"/>
                    <!-- 2 Gối nằm -->
                    <rect x="${x + 50}" y="${y + 130}" width="${pillowW}" height="${pillowH}" fill="${isWhite ? '#ffffff' : '#334155'}" stroke="${stroke}" stroke-width="6" rx="15"/>
                    <rect x="${x + w - pillowW - 50}" y="${y + 130}" width="${pillowW}" height="${pillowH}" fill="${isWhite ? '#ffffff' : '#334155'}" stroke="${stroke}" stroke-width="6" rx="15"/>
                    <!-- Nếp gấp chăn -->
                    <path d="M ${x} ${y + h * 0.45} Q ${x + w / 2} ${y + h * 0.50} ${x + w} ${y + h * 0.45} L ${x + w} ${y + h} L ${x} ${y + h} Z" fill="${isWhite ? '#fef3c7' : '#451a03'}" stroke="${gold}" stroke-width="8"/>
                </g>
            `;
        }

        case 'bed_single': {
            const pillowW = w - 200;
            const pillowH = Math.min(350, h * 0.20);

            return `
                <g id="${item.id}" class="cad-furniture bed-single">
                    <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}" stroke="${stroke}" stroke-width="10" rx="15"/>
                    <rect x="${x}" y="${y}" width="${w}" height="90" fill="${isWhite ? '#cbd5e1' : '#475569'}" stroke="${stroke}" stroke-width="6"/>
                    <rect x="${x + 100}" y="${y + 110}" width="${pillowW}" height="${pillowH}" fill="${isWhite ? '#ffffff' : '#334155'}" stroke="${stroke}" stroke-width="6" rx="12"/>
                    <path d="M ${x} ${y + h * 0.48} Q ${x + w / 2} ${y + h * 0.52} ${x + w} ${y + h * 0.48} L ${x + w} ${y + h} L ${x} ${y + h} Z" fill="${isWhite ? '#f0f9ff' : '#082f49'}" stroke="${accent}" stroke-width="8"/>
                </g>
            `;
        }

        case 'toilet_set': {
            const showerW = Math.min(900, w * 0.45);
            const toiletW = Math.min(420, w * 0.3);
            const toiletD = Math.min(600, h * 0.45);

            return `
                <g id="${item.id}" class="cad-furniture toilet">
                    <!-- Vách kính phòng tắm đứng -->
                    <rect x="${x + 30}" y="${y + 30}" width="${showerW}" height="${h - 60}" fill="${isWhite ? '#f0f9ff' : '#0369a1'}" stroke="${accent}" stroke-width="8" opacity="0.6"/>
                    <line x1="${x + 30}" y1="${y + 30}" x2="${x + 30 + showerW}" y2="${y + h - 30}" stroke="${accent}" stroke-width="6" stroke-dasharray="20,20"/>
                    <!-- Bồn cầu elip -->
                    <g transform="translate(${x + w - toiletW - 50}, ${y + 50})">
                        <rect x="0" y="0" width="${toiletW}" height="160" fill="${isWhite ? '#ffffff' : '#475569'}" stroke="${stroke}" stroke-width="8" rx="10"/>
                        <ellipse cx="${toiletW / 2}" cy="${toiletD / 2 + 70}" rx="${toiletW / 2 - 15}" ry="${toiletD / 2 - 25}" fill="${isWhite ? '#ffffff' : '#475569'}" stroke="${stroke}" stroke-width="8"/>
                    </g>
                    <!-- Lavabo rửa mặt -->
                    <rect x="${x + showerW + 60}" y="${y + h - 380}" width="480" height="320" fill="${isWhite ? '#ffffff' : '#334155'}" stroke="${stroke}" stroke-width="8" rx="12"/>
                    <ellipse cx="${x + showerW + 300}" cy="${y + h - 220}" rx="160" ry="110" fill="none" stroke="${accent}" stroke-width="6"/>
                </g>
            `;
        }

        case 'altar_set': {
            const burnerR = Math.min(60, h * 0.12);
            return `
                <g id="${item.id}" class="cad-furniture altar">
                    <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${isWhite ? '#fef3c7' : '#451a03'}" stroke="${gold}" stroke-width="14" rx="15"/>
                    <rect x="${x + 40}" y="${y + 40}" width="${w - 80}" height="${h - 80}" fill="none" stroke="${gold}" stroke-width="6" stroke-dasharray="30,20"/>
                    <circle cx="${x + w / 2}" cy="${y + h / 2}" r="${burnerR}" fill="${gold}" stroke="${isWhite ? '#78350f' : '#fef08a'}" stroke-width="6"/>
                    <circle cx="${x + w * 0.22}" cy="${y + h / 2}" r="30" fill="${gold}"/>
                    <circle cx="${x + w * 0.78}" cy="${y + h / 2}" r="30" fill="${gold}"/>
                    <text x="${x + w / 2}" y="${y + h - 50}" text-anchor="middle" font-family="Inter, sans-serif" font-size="80" font-weight="bold" fill="${gold}">BÀN THỜ GIA TIÊN</text>
                </g>
            `;
        }

        case 'stairs_flight': {
            const stepCount = 14;
            const stepH = h / stepCount;
            let stepsSvg = '';
            for (let i = 1; i < stepCount; i++) {
                stepsSvg += `<line x1="${x}" y1="${y + i * stepH}" x2="${x + w}" y2="${y + i * stepH}" stroke="${stroke}" stroke-width="6"/>`;
            }
            const arrowX = x + w / 2;
            return `
                <g id="${item.id}" class="cad-furniture stairs">
                    <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}" stroke="${stroke}" stroke-width="12"/>
                    ${stepsSvg}
                    <line x1="${arrowX}" y1="${y}" x2="${arrowX}" y2="${y + h}" stroke="${accent}" stroke-width="8" stroke-dasharray="40,20"/>
                    <circle cx="${arrowX}" cy="${y + h - 140}" r="35" fill="${accent}"/>
                    <polygon points="${arrowX},${y + 100} ${arrowX - 45},${y + 190} ${arrowX + 45},${y + 190}" fill="${accent}"/>
                    <text x="${x + w - 60}" y="${y + h - 50}" text-anchor="end" font-family="Inter, sans-serif" font-size="70" font-weight="bold" fill="${accent}">21 BẬC</text>
                </g>
            `;
        }

        case 'garage_car': {
            return `
                <g id="${item.id}" class="cad-furniture car">
                    <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="none" stroke="${accent}" stroke-width="8" stroke-dasharray="50,25" rx="20"/>
                    <rect x="${x + w * 0.12}" y="${y + h * 0.1}" width="${w * 0.76}" height="${h * 0.8}" fill="${isWhite ? '#f1f5f9' : '#334155'}" stroke="${stroke}" stroke-width="10" rx="${w * 0.2}"/>
                    <path d="M ${x + w * 0.2} ${y + h * 0.3} Q ${x + w / 2} ${y + h * 0.25} ${x + w * 0.8} ${y + h * 0.3}" stroke="${accent}" stroke-width="8" fill="none"/>
                    <path d="M ${x + w * 0.2} ${y + h * 0.7} Q ${x + w / 2} ${y + h * 0.75} ${x + w * 0.8} ${y + h * 0.7}" stroke="${accent}" stroke-width="8" fill="none"/>
                </g>
            `;
        }

        case 'skylight_vent': {
            return `
                <g id="${item.id}" class="cad-furniture skylight">
                    <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="none" stroke="${accent}" stroke-width="8" stroke-dasharray="30,20"/>
                    <line x1="${x}" y1="${y}" x2="${x + w}" y2="${y + h}" stroke="${accent}" stroke-width="6" stroke-dasharray="25,15"/>
                    <line x1="${x + w}" y1="${y}" x2="${x}" y2="${y + h}" stroke="${accent}" stroke-width="6" stroke-dasharray="25,15"/>
                    <text x="${x + w / 2}" y="${y + h / 2 + 20}" text-anchor="middle" font-family="Inter, sans-serif" font-size="75" font-weight="bold" fill="${accent}">GIẾNG TRỜI</text>
                </g>
            `;
        }

        default:
            return `<rect id="${item.id}" x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}" stroke="${stroke}" stroke-width="8"/>`;
    }
}
