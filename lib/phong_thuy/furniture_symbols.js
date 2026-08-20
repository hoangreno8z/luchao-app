// ============================================================
// Architectural Vector Blocks & Furniture Symbols (Architect Standard)
// Thư Viện Ký Hiệu Khối Kiến Trúc SVG Chuẩn Kiến Trúc Sư
// Tác giả: Dịch Sư Nguyễn Huy Hoàng
// ============================================================

/**
 * 1. Khối Phòng Ngủ (BedBlock - Có hình giường 1.8m x 2.0m, gối đôi, chăn gấp)
 */
export function renderBedBlock(x, y, w, h, name = 'PHÒNG NGỦ') {
    const scale = Math.min(1, Math.min((w * 0.75) / 1800, (h * 0.75) / 2000));
    const bedW = 1800 * scale;
    const bedH = 2000 * scale;
    const bx = x + (w - bedW) / 2;
    const by = y + (h - bedH) / 2;
    const pillowW = 600 * scale;
    const pillowH = 300 * scale;
    const pillowRx = 50 * scale;
    const strokeW = Math.max(6, 14 * scale);
    const strokeThin = Math.max(4, 9 * scale);
    const lineChuyenY = 800 * scale;

    return `
        <g class="arch-block-bed">
            <!-- Khung giường nằm giữa phòng -->
            <g transform="translate(${bx}, ${by})">
                <!-- Khung giường 1m8 x 2m -->
                <rect width="${bedW}" height="${bedH}" fill="#ffffff" stroke="#333333" stroke-width="${strokeW}" rx="${20 * scale}"/>
                <!-- Gối 1 & 2 -->
                <rect x="${200 * scale}" y="${200 * scale}" width="${pillowW}" height="${pillowH}" rx="${pillowRx}" fill="#f8fafc" stroke="#333333" stroke-width="${strokeThin}"/>
                <rect x="${1000 * scale}" y="${200 * scale}" width="${pillowW}" height="${pillowH}" rx="${pillowRx}" fill="#f8fafc" stroke="#333333" stroke-width="${strokeThin}"/>
                <!-- Chăn gấp -->
                <line x1="0" y1="${lineChuyenY}" x2="${bedW}" y2="${lineChuyenY}" stroke="#333333" stroke-width="${strokeThin}"/>
            </g>
            <text x="${x + w / 2}" y="${by + bedH + Math.min(180, (h - bedH) / 2 + 100)}" text-anchor="middle" font-size="${Math.min(w * 0.08, 120)}" font-weight="900" fill="#333333" letter-spacing="1.5">${name}</text>
        </g>
    `;
}

/**
 * 2. Khối Vệ Sinh WC (WCBlock - Bồn cầu két nước + Bệ elip + Lavabo)
 */
export function renderWCBlock(x, y, w, h, name = 'WC') {
    const scale = Math.min(1, Math.min((w * 0.65) / 1200, (h * 0.65) / 1200));
    const strokeW = Math.max(6, 14 * scale);
    const toiletX = x + Math.max(80, 180 * scale);
    const toiletY = y + Math.max(80, 180 * scale);
    const tankW = 500 * scale;
    const tankH = 250 * scale;
    const bowlRx = 200 * scale;
    const bowlRy = 250 * scale;
    const lavaboW = 450 * scale;
    const lavaboH = 350 * scale;

    return `
        <g class="arch-block-wc">
            <!-- Bồn cầu (Két nước + Bệ ngồi elip) -->
            <g transform="translate(${toiletX}, ${toiletY})">
                <rect width="${tankW}" height="${tankH}" fill="#ffffff" stroke="#333333" stroke-width="${strokeW}" rx="${10 * scale}"/>
                <ellipse cx="${tankW / 2}" cy="${tankH + bowlRy - 40 * scale}" rx="${bowlRx}" ry="${bowlRy}" fill="#ffffff" stroke="#333333" stroke-width="${strokeW}"/>
            </g>
            <!-- Lavabo rửa mặt -->
            <g transform="translate(${x + w - lavaboW - 120 * scale}, ${y + 120 * scale})">
                <rect width="${lavaboW}" height="${lavaboH}" fill="#ffffff" stroke="#333333" stroke-width="${strokeW}" rx="${15 * scale}"/>
                <ellipse cx="${lavaboW / 2}" cy="${lavaboH / 2}" rx="${lavaboW * 0.35}" ry="${lavaboH * 0.3}" fill="none" stroke="#0284c7" stroke-width="${Math.max(4, 8 * scale)}"/>
            </g>
            <text x="${x + w / 2}" y="${y + h - 70}" text-anchor="middle" font-size="${Math.min(w * 0.1, 110)}" font-weight="900" fill="#333333" letter-spacing="1.5">${name}</text>
        </g>
    `;
}

/**
 * 3. Khối Bếp (KitchenBlock - Mặt bếp đá 600mm + Bếp từ đôi + Chậu rửa inox)
 */
export function renderKitchenBlock(x, y, w, h, name = 'BẾP & ĂN') {
    const counterH = Math.min(600, h * 0.32);
    const rBurner = Math.min(140, counterH * 0.24);
    const sinkW = Math.min(800, w * 0.35);
    const sinkH = counterH * 0.7;

    return `
        <g class="arch-block-kitchen">
            <!-- Bàn bếp sát tường dài -->
            <rect x="${x}" y="${y}" width="${w}" height="${counterH}" fill="#e2e8f0" stroke="#333333" stroke-width="10"/>
            <!-- Bếp từ đôi (2 vòng tròn) -->
            <circle cx="${x + w / 3}" cy="${y + counterH / 2}" r="${rBurner}" fill="#ffffff" stroke="#333333" stroke-width="14"/>
            <circle cx="${x + w / 3 + rBurner * 2.3}" cy="${y + counterH / 2}" r="${rBurner}" fill="#ffffff" stroke="#333333" stroke-width="14"/>
            <!-- Chậu rửa đôi -->
            <rect x="${x + w * 0.65}" y="${y + (counterH - sinkH) / 2}" width="${sinkW}" height="${sinkH}" rx="30" fill="#ffffff" stroke="#333333" stroke-width="12"/>
            <line x1="${x + w * 0.65 + sinkW / 2}" y1="${y + (counterH - sinkH) / 2}" x2="${x + w * 0.65 + sinkW / 2}" y2="${y + (counterH + sinkH) / 2}" stroke="#333333" stroke-width="10"/>
            <!-- Bàn ăn nếu phòng đủ dài -->
            ${h > 3500 ? `
                <rect x="${x + (w - Math.min(1800, w * 0.6)) / 2}" y="${y + counterH + (h - counterH - 1000) / 2}" width="${Math.min(1800, w * 0.6)}" height="${Math.min(800, h * 0.22)}" rx="15" fill="#f8fafc" stroke="#333333" stroke-width="8"/>
            ` : ''}
            <text x="${x + w / 2}" y="${y + h - 70}" text-anchor="middle" font-size="${Math.min(w * 0.08, 120)}" font-weight="900" fill="#333333" letter-spacing="1.5">${name}</text>
        </g>
    `;
}

/**
 * 4. Khối Cửa Đi (DoorBlock - Cánh mở 90 độ + Cung tròn nét đứt)
 */
export function renderDoorBlock(x, y, w, h, name = 'CỬA') {
    const doorW = Math.min(w, Math.max(800, h));
    return `
        <g class="arch-block-door" transform="translate(${x}, ${y})">
            <!-- Khung ô cửa nét đứt -->
            <rect x="0" y="0" width="${w}" height="${h}" fill="none" stroke="#333333" stroke-width="8" stroke-dasharray="25,15"/>
            <!-- Cánh cửa mở 90 độ -->
            <line x1="0" y1="${h / 2}" x2="${doorW * 0.85}" y2="${h / 2 - doorW * 0.85}" stroke="#333333" stroke-width="16"/>
            <!-- Cung tròn mở cửa nét đứt -->
            <path d="M 0 ${h / 2} A ${doorW * 0.85} ${doorW * 0.85} 0 0 1 ${doorW * 0.85} ${h / 2 - doorW * 0.85}" fill="none" stroke="#94a3b8" stroke-width="10" stroke-dasharray="20,20"/>
            <!-- Trụ bản lề -->
            <rect x="0" y="0" width="${Math.max(40, w * 0.08)}" height="${h}" fill="#333333"/>
            <text x="${w / 2}" y="${h / 2 + 100}" text-anchor="middle" font-size="70" font-weight="800" fill="#333333">${name}</text>
        </g>
    `;
}

/**
 * 5. Khối Phòng Khách (LivingBlock - Ghế Sofa dài + Tựa lưng + Bàn trà kính)
 */
export function renderLivingBlock(x, y, w, h, name = 'PHÒNG KHÁCH') {
    const sofaW = Math.min(w * 0.8, 2800);
    const sofaH = Math.min(h * 0.35, 1000);
    const sofaX = x + (w - sofaW) / 2;
    const sofaY = y + 180;
    const tableW = sofaW * 0.55;
    const tableH = Math.min(550, h * 0.2);
    const tableX = x + (w - tableW) / 2;
    const tableY = sofaY + sofaH + 220;

    return `
        <g class="arch-block-living">
            <!-- Khung ghế Sofa -->
            <rect x="${sofaX}" y="${sofaY}" width="${sofaW}" height="${sofaH}" rx="20" fill="#f8fafc" stroke="#333333" stroke-width="12"/>
            <!-- Tựa lưng sau & tay vịn -->
            <rect x="${sofaX}" y="${sofaY}" width="${sofaW}" height="${sofaH * 0.28}" fill="#e2e8f0" stroke="#333333" stroke-width="8"/>
            <rect x="${sofaX}" y="${sofaY}" width="${sofaW * 0.12}" height="${sofaH}" fill="#e2e8f0" stroke="#333333" stroke-width="8"/>
            <rect x="${sofaX + sofaW * 0.88}" y="${sofaY}" width="${sofaW * 0.12}" height="${sofaH}" fill="#e2e8f0" stroke="#333333" stroke-width="8"/>
            <!-- Bàn trà kính -->
            <rect x="${tableX}" y="${tableY}" width="${tableW}" height="${tableH}" rx="12" fill="#ffffff" stroke="#333333" stroke-width="10"/>
            <line x1="${tableX + 40}" y1="${tableY + tableH / 2}" x2="${tableX + tableW - 40}" y2="${tableY + tableH / 2}" stroke="#94a3b8" stroke-width="6" stroke-dasharray="20,15"/>
            <text x="${x + w / 2}" y="${y + h - 70}" text-anchor="middle" font-size="${Math.min(w * 0.08, 120)}" font-weight="900" fill="#333333" letter-spacing="1.5">${name}</text>
        </g>
    `;
}

/**
 * 6. Khối Cầu Thang (StairsBlock - Các bậc thang song song + Mũi tên hướng lên UP)
 */
export function renderStairsBlock(x, y, w, h, name = 'CẦU THANG') {
    const steps = 14;
    let st = `<g class="arch-block-stairs">
        <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#f8fafc" stroke="#333333" stroke-width="10"/>`;
    for (let i = 1; i < steps; i++) {
        const sy = y + (h / steps) * i;
        st += `<line x1="${x}" y1="${sy}" x2="${x + w}" y2="${sy}" stroke="#333333" stroke-width="5"/>`;
    }
    const arrowX = x + w / 2;
    st += `
        <line x1="${arrowX}" y1="${y + h * 0.85}" x2="${arrowX}" y2="${y + h * 0.18}" stroke="#0284c7" stroke-width="12" stroke-linecap="round"/>
        <polygon points="${arrowX},${y + h * 0.08} ${arrowX - 45},${y + h * 0.22} ${arrowX + 45},${y + h * 0.22}" fill="#0284c7"/>
        <circle cx="${arrowX}" cy="${y + h * 0.85}" r="30" fill="#0284c7"/>
        <text x="${x + w / 2}" y="${y + h * 0.55}" text-anchor="middle" font-size="${Math.min(w * 0.18, 90)}" font-weight="900" fill="#0284c7">UP (21 BẬC)</text>
    </g>`;
    return st;
}

/**
 * 7. Khối Gara Xe (GarageBlock - Silhouette ô tô + Kính chắn gió)
 */
export function renderGarageBlock(x, y, w, h, name = 'GARA XE') {
    const carW = Math.min(w * 0.75, 2000);
    const carH = Math.min(h * 0.8, 4500);
    const cx = x + (w - carW) / 2;
    const cy = y + (h - carH) / 2;

    return `
        <g class="arch-block-garage">
            <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#f8fafc" stroke="#333333" stroke-width="8" stroke-dasharray="30,15"/>
            <!-- Ô tô silhouette -->
            <rect x="${cx}" y="${cy}" width="${carW}" height="${carH}" rx="${carW * 0.18}" fill="#ffffff" stroke="#333333" stroke-width="12"/>
            <!-- Kính chắn gió trước & sau -->
            <path d="M ${cx + carW * 0.15} ${cy + carH * 0.25} Q ${cx + carW / 2} ${cy + carH * 0.18} ${cx + carW * 0.85} ${cy + carH * 0.25} L ${cx + carW * 0.8} ${cy + carH * 0.4} Q ${cx + carW / 2} ${cy + carH * 0.38} ${cx + carW * 0.2} ${cy + carH * 0.4} Z" fill="#e2e8f0" stroke="#333333" stroke-width="8"/>
            <path d="M ${cx + carW * 0.2} ${cy + carH * 0.72} Q ${cx + carW / 2} ${cy + carH * 0.7} ${cx + carW * 0.8} ${cy + carH * 0.72} L ${cx + carW * 0.85} ${cy + carH * 0.84} Q ${cx + carW / 2} ${cy + carH * 0.86} ${cx + carW * 0.15} ${cy + carH * 0.84} Z" fill="#e2e8f0" stroke="#333333" stroke-width="8"/>
            <!-- Gương chiếu hậu 2 bên -->
            <rect x="${cx - 50}" y="${cy + carH * 0.22}" width="50" height="100" rx="15" fill="#333333"/>
            <rect x="${cx + carW}" y="${cy + carH * 0.22}" width="50" height="100" rx="15" fill="#333333"/>
            <text x="${x + w / 2}" y="${y + h - 70}" text-anchor="middle" font-size="${Math.min(w * 0.08, 120)}" font-weight="900" fill="#333333" letter-spacing="1.5">${name}</text>
        </g>
    `;
}

/**
 * 8. Khối Phòng Thờ (AltarBlock - Án gian thờ + Bát hương tam cấp)
 */
export function renderAltarBlock(x, y, w, h, name = 'PHÒNG THỜ') {
    const altarW = Math.min(w * 0.75, 2400);
    const altarH = Math.min(h * 0.35, 1000);
    const ax = x + (w - altarW) / 2;
    const ay = y + 150;

    return `
        <g class="arch-block-altar">
            <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#f8fafc" stroke="#b45309" stroke-width="8"/>
            <!-- Án gian thờ -->
            <rect x="${ax}" y="${ay}" width="${altarW}" height="${altarH}" rx="12" fill="#fef3c7" stroke="#b45309" stroke-width="12"/>
            <rect x="${ax + 40}" y="${ay + 40}" width="${altarW - 80}" height="${altarH - 80}" fill="none" stroke="#b45309" stroke-width="5" stroke-dasharray="25,15"/>
            <!-- Bát hương tam cấp -->
            <circle cx="${ax + altarW / 2}" cy="${ay + altarH / 2}" r="80" fill="#b45309"/>
            <circle cx="${ax + altarW * 0.25}" cy="${ay + altarH / 2}" r="45" fill="#b45309"/>
            <circle cx="${ax + altarW * 0.75}" cy="${ay + altarH / 2}" r="45" fill="#b45309"/>
            <text x="${x + w / 2}" y="${y + h - 70}" text-anchor="middle" font-size="${Math.min(w * 0.08, 120)}" font-weight="900" fill="#b45309" letter-spacing="1.5">${name}</text>
        </g>
    `;
}

/**
 * 9. Khối Giếng Trời / Thông Tầng (SkylightBlock)
 */
export function renderSkylightBlock(x, y, w, h, name = 'GIẾNG TRỜI') {
    return `
        <g class="arch-block-skylight">
            <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#f0f9ff" stroke="#0284c7" stroke-width="10" stroke-dasharray="30,20"/>
            <line x1="${x}" y1="${y}" x2="${x + w}" y2="${y + h}" stroke="#0284c7" stroke-width="8" stroke-dasharray="25,15"/>
            <line x1="${x + w}" y1="${y}" x2="${x}" y2="${y + h}" stroke="#0284c7" stroke-width="8" stroke-dasharray="25,15"/>
            <text x="${x + w / 2}" y="${y + h / 2 + 25}" text-anchor="middle" font-size="${Math.min(w * 0.08, 120)}" font-weight="900" fill="#0284c7" letter-spacing="1.5">${name}</text>
        </g>
    `;
}
