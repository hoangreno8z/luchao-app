// ============================================================
// CAD Core Architectural Vector Symbols & Blocks v8.0
// Bộ thư viện ký hiệu vector kiến trúc 2D CAD chuyên nghiệp
// ============================================================

/**
 * Vẽ đoạn tường xây (Wall Segment) với nét đôi chuẩn CAD
 */
export function renderWallBlock(p1, p2, thickness = 220, theme = 'white') {
    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;
    const len = Math.hypot(dx, dy);
    if (len === 0) return '';

    const nx = -dy / len;
    const ny = dx / len;
    const halfT = thickness / 2;

    const c1 = { x: p1.x + nx * halfT, y: p1.y + ny * halfT };
    const c2 = { x: p2.x + nx * halfT, y: p2.y + ny * halfT };
    const c3 = { x: p2.x - nx * halfT, y: p2.y - ny * halfT };
    const c4 = { x: p1.x - nx * halfT, y: p1.y - ny * halfT };

    const strokeColor = theme === 'dark' ? '#f1f5f9' : '#0f172a';
    const fillColor = theme === 'dark' ? 'rgba(51, 65, 85, 0.6)' : 'rgba(226, 232, 240, 0.7)';

    return `
        <g class="cad-wall-block">
            <polygon points="${c1.x},${c1.y} ${c2.x},${c2.y} ${c3.x},${c3.y} ${c4.x},${c4.y}" 
                fill="${fillColor}" stroke="${strokeColor}" stroke-width="2.5" />
            <line x1="${p1.x}" y1="${p1.y}" x2="${p2.x}" y2="${p2.y}" stroke="${strokeColor}" stroke-width="0.8" stroke-dasharray="10 5" opacity="0.4" />
        </g>
    `;
}

/**
 * Vẽ cửa đi (Door Block): Cửa 1 cánh mở quay, 2 cánh, cửa trượt
 */
export function renderDoorBlock(x, y, w = 900, h = 200, rot = 0, style = 'swing_single', theme = 'white') {
    const stroke = theme === 'dark' ? '#38bdf8' : '#0284c7';
    const frameFill = theme === 'dark' ? '#1e293b' : '#f8fafc';
    const panelFill = theme === 'dark' ? '#0284c7' : '#0369a1';

    let content = '';

    if (style === 'swing_double') {
        const halfW = w / 2;
        content = `
            <!-- Khung bao 2 bên -->
            <rect x="0" y="0" width="50" height="${h}" fill="${frameFill}" stroke="${stroke}" stroke-width="1.5" />
            <rect x="${w - 50}" y="0" width="50" height="${h}" fill="${frameFill}" stroke="${stroke}" stroke-width="1.5" />
            <!-- Cánh cửa 1 -->
            <rect x="50" y="0" width="${halfW - 50}" height="35" fill="${panelFill}" rx="3" />
            <!-- Cung quét cánh 1 -->
            <path d="M 50 0 A ${halfW - 50} ${halfW - 50} 0 0 1 50 ${halfW - 50}" fill="none" stroke="${stroke}" stroke-width="1.2" stroke-dasharray="6 4" />
            <!-- Cánh cửa 2 -->
            <rect x="${halfW}" y="0" width="${halfW - 50}" height="35" fill="${panelFill}" rx="3" />
            <!-- Cung quét cánh 2 -->
            <path d="M ${w - 50} 0 A ${halfW - 50} ${halfW - 50} 0 0 0 ${w - 50} ${halfW - 50}" fill="none" stroke="${stroke}" stroke-width="1.2" stroke-dasharray="6 4" />
        `;
    } else if (style === 'sliding') {
        const halfW = w / 2;
        content = `
            <!-- Khung ray trượt -->
            <rect x="0" y="0" width="${w}" height="${h}" fill="${frameFill}" stroke="${stroke}" stroke-width="1.5" />
            <!-- Ray dẫn hướng -->
            <line x1="10" y1="${h / 2}" x2="${w - 10}" y2="${h / 2}" stroke="${stroke}" stroke-width="1" stroke-dasharray="4 2" />
            <!-- Cánh trượt trái -->
            <rect x="10" y="20" width="${halfW + 20}" height="40" fill="${panelFill}" rx="2" stroke="${stroke}" stroke-width="1" />
            <!-- Cánh trượt phải -->
            <rect x="${halfW - 30}" y="${h - 60}" width="${halfW + 20}" height="40" fill="${panelFill}" rx="2" stroke="${stroke}" stroke-width="1" />
        `;
    } else {
        // Mặc định: Cửa mở quay 1 cánh (Swing Single)
        const doorLen = w - 80;
        content = `
            <!-- Khung bao 2 bên (Jambs) -->
            <rect x="0" y="0" width="40" height="${h}" fill="${frameFill}" stroke="${stroke}" stroke-width="1.5" />
            <rect x="${w - 40}" y="0" width="40" height="${h}" fill="${frameFill}" stroke="${stroke}" stroke-width="1.5" />
            <!-- Cánh cửa mở 90 độ -->
            <rect x="40" y="0" width="30" height="${doorLen}" fill="${panelFill}" rx="3" stroke="${stroke}" stroke-width="1" />
            <!-- Tay nắm cửa -->
            <circle cx="55" cy="${doorLen - 60}" r="8" fill="#fbbf24" stroke="#000" stroke-width="1" />
            <!-- Cung quét mở cửa (Swing Arc) -->
            <path d="M 40 0 A ${doorLen} ${doorLen} 0 0 1 ${40 + doorLen} ${doorLen}" fill="none" stroke="${stroke}" stroke-width="1.5" stroke-dasharray="6 4" />
        `;
    }

    return `
        <g class="cad-door-block" transform="translate(${x}, ${y}) rotate(${rot})">
            ${content}
        </g>
    `;
}

/**
 * Vẽ cửa sổ (Window Block)
 */
export function renderWindowBlock(x, y, w = 1200, h = 200, rot = 0, style = 'casement_2', theme = 'white') {
    const stroke = theme === 'dark' ? '#38bdf8' : '#0284c7';
    const glassFill = theme === 'dark' ? 'rgba(56, 189, 248, 0.2)' : 'rgba(2, 132, 199, 0.15)';
    const frameFill = theme === 'dark' ? '#1e293b' : '#f8fafc';

    return `
        <g class="cad-window-block" transform="translate(${x}, ${y}) rotate(${rot})">
            <!-- Khung bao ngoài cửa sổ -->
            <rect x="0" y="0" width="${w}" height="${h}" fill="${frameFill}" stroke="${stroke}" stroke-width="1.5" />
            <!-- Kính cửa sổ -->
            <rect x="20" y="30" width="${w - 40}" height="${h - 60}" fill="${glassFill}" stroke="${stroke}" stroke-width="1" />
            <!-- Đố kính giữa (Mullion) -->
            <line x1="${w / 2}" y1="0" x2="${w / 2}" y2="${h}" stroke="${stroke}" stroke-width="2" />
            <!-- Nét kính đôi -->
            <line x1="20" y1="${h / 2 - 15}" x2="${w - 20}" y2="${h / 2 - 15}" stroke="${stroke}" stroke-width="0.8" opacity="0.6" />
            <line x1="20" y1="${h / 2 + 15}" x2="${w - 20}" y2="${h / 2 + 15}" stroke="${stroke}" stroke-width="0.8" opacity="0.6" />
        </g>
    `;
}

/**
 * Vẽ cầu thang kiến trúc (Stairs Block): Thẳng, chữ L, chữ U
 */
export function renderStairBlock(x, y, w = 1000, h = 3000, rot = 0, type = 'straight', steps = 21, theme = 'white') {
    const stroke = theme === 'dark' ? '#cbd5e1' : '#1e293b';
    const fill = theme === 'dark' ? 'rgba(30, 41, 59, 0.5)' : 'rgba(241, 245, 249, 0.6)';
    const accent = '#ef4444';

    let stepsSvg = '';

    if (type === 'u_shaped') {
        // Thang chữ U có chiếu nghỉ 180 độ
        const halfW = (w - 150) / 2;
        const landingH = Math.round(h * 0.35);
        const flightH = h - landingH;
        const flightSteps = Math.floor(steps / 2);
        const stepH = flightH / flightSteps;

        let steps1 = '';
        for (let i = 0; i < flightSteps; i++) {
            const sy = landingH + i * stepH;
            steps1 += `<line x1="0" y1="${sy}" x2="${halfW}" y2="${sy}" stroke="${stroke}" stroke-width="1.2" />`;
        }

        let steps2 = '';
        for (let i = 0; i < flightSteps; i++) {
            const sy = landingH + i * stepH;
            steps2 += `<line x1="${w - halfW}" y1="${sy}" x2="${w}" y2="${sy}" stroke="${stroke}" stroke-width="1.2" />`;
        }

        stepsSvg = `
            <!-- Bản thang 1 -->
            <rect x="0" y="${landingH}" width="${halfW}" height="${flightH}" fill="${fill}" stroke="${stroke}" stroke-width="1.5" />
            ${steps1}
            <!-- Bản thang 2 -->
            <rect x="${w - halfW}" y="${landingH}" width="${halfW}" height="${flightH}" fill="${fill}" stroke="${stroke}" stroke-width="1.5" />
            ${steps2}
            <!-- Chiếu nghỉ -->
            <rect x="0" y="0" width="${w}" height="${landingH}" fill="${fill}" stroke="${stroke}" stroke-width="1.5" />
            <text x="${w / 2}" y="${landingH / 2 + 10}" fill="${stroke}" font-size="70" font-weight="bold" text-anchor="middle">CHIẾU NGHỈ</text>
            <!-- Giếng thang ở giữa -->
            <rect x="${halfW}" y="${landingH}" width="150" height="${flightH}" fill="none" stroke="${stroke}" stroke-width="1" stroke-dasharray="4 4" />
            <!-- Mũi tên chỉ hướng đi lên -->
            <line x1="${halfW / 2}" y1="${h - 100}" x2="${halfW / 2}" y2="${landingH + 100}" stroke="${accent}" stroke-width="3" />
            <polygon points="${halfW / 2},${landingH + 50} ${halfW / 2 - 20},${landingH + 120} ${halfW / 2 + 20},${landingH + 120}" fill="${accent}" />
            <circle cx="${halfW / 2}" cy="${h - 100}" r="16" fill="${accent}" />
        `;
    } else if (type === 'l_shaped') {
        // Thang chữ L có chiếu nghỉ góc 90 độ
        const landingSize = Math.min(w, h * 0.4);
        const flightH = h - landingSize;
        const flightSteps = Math.max(1, steps - 3);
        const stepH = flightH / flightSteps;

        let stepsLines = '';
        for (let i = 0; i < flightSteps; i++) {
            const sy = landingSize + i * stepH;
            stepsLines += `<line x1="0" y1="${sy}" x2="${w}" y2="${sy}" stroke="${stroke}" stroke-width="1.2" />`;
        }

        stepsSvg = `
            <rect x="0" y="0" width="${w}" height="${h}" fill="${fill}" stroke="${stroke}" stroke-width="1.5" />
            <!-- Chiếu nghỉ vuông -->
            <rect x="0" y="0" width="${w}" height="${landingSize}" fill="${fill}" stroke="${stroke}" stroke-width="1.5" />
            <line x1="0" y1="0" x2="${w}" y2="${landingSize}" stroke="${stroke}" stroke-width="1" stroke-dasharray="5 5" />
            ${stepsLines}
            <!-- Mũi tên chỉ hướng UP -->
            <line x1="${w / 2}" y1="${h - 100}" x2="${w / 2}" y2="${landingSize + 100}" stroke="${accent}" stroke-width="3" />
            <polygon points="${w / 2},${landingSize + 50} ${w / 2 - 20},${landingSize + 120} ${w / 2 + 20},${landingSize + 120}" fill="${accent}" />
            <circle cx="${w / 2}" cy="${h - 100}" r="16" fill="${accent}" />
        `;
    } else {
        // Mặc định: Thang thẳng (Straight)
        const stepH = h / Math.max(1, steps);
        let stepsLines = '';
        for (let i = 0; i < steps; i++) {
            const sy = i * stepH;
            stepsLines += `<line x1="0" y1="${sy}" x2="${w}" y2="${sy}" stroke="${stroke}" stroke-width="1.2" />`;
        }

        stepsSvg = `
            <rect x="0" y="0" width="${w}" height="${h}" fill="${fill}" stroke="${stroke}" stroke-width="1.5" />
            ${stepsLines}
            <!-- Mũi tên chỉ hướng UP -->
            <line x1="${w / 2}" y1="${h - 150}" x2="${w / 2}" y2="150" stroke="${accent}" stroke-width="3" />
            <polygon points="${w / 2},80 ${w / 2 - 25},180 ${w / 2 + 25},180" fill="${accent}" />
            <circle cx="${w / 2}" cy="${h - 150}" r="18" fill="${accent}" />
            <text x="${w / 2}" y="${h / 2}" fill="${stroke}" font-size="80" font-weight="bold" text-anchor="middle" transform="rotate(-90 ${w / 2} ${h / 2})">UP (${steps} BẬC)</text>
        `;
    }

    return `
        <g class="cad-stair-block" transform="translate(${x}, ${y}) rotate(${rot})">
            ${stepsSvg}
        </g>
    `;
}

/**
 * Vẽ nội thất vector phong phú chuẩn kiến trúc
 */
export function renderFurnitureBlock(type, x, y, w, h, rot = 0, theme = 'white') {
    const stroke = theme === 'dark' ? '#94a3b8' : '#334155';
    const fill = theme === 'dark' ? 'rgba(30, 41, 59, 0.4)' : 'rgba(248, 250, 252, 0.6)';

    let content = '';

    if (type === 'bed_master' || type === 'bed' || type === 'bedroom') {
        const bedW = Math.min(w * 0.75, 1800);
        const bedH = Math.min(h * 0.8, 2000);
        const bx = (w - bedW) / 2;
        const by = (h - bedH) / 2;
        const pillowW = bedW * 0.38;
        const pillowH = bedH * 0.22;
        const nightstandSize = Math.min(bx * 0.7, 450);

        content = `
            <!-- Khung giường đôi -->
            <rect x="${bx}" y="${by}" width="${bedW}" height="${bedH}" rx="16" fill="${fill}" stroke="${stroke}" stroke-width="2" />
            <!-- Ga trải giường gấp vát góc -->
            <path d="M ${bx} ${by + bedH * 0.35} L ${bx + bedW} ${by + bedH * 0.35} L ${bx + bedW} ${by + bedH} L ${bx} ${by + bedH} Z" fill="none" stroke="${stroke}" stroke-width="1.2" stroke-dasharray="6 4" />
            <!-- 2 Gối ngủ bo tròn góc -->
            <rect x="${bx + 30}" y="${by + 30}" width="${pillowW}" height="${pillowH}" rx="8" fill="none" stroke="${stroke}" stroke-width="1.5" />
            <rect x="${bx + bedW - pillowW - 30}" y="${by + 30}" width="${pillowW}" height="${pillowH}" rx="8" fill="none" stroke="${stroke}" stroke-width="1.5" />
            <!-- 2 Tab đầu giường có đèn ngủ -->
            ${bx > 100 ? `
                <rect x="${bx - nightstandSize - 20}" y="${by}" width="${nightstandSize}" height="${nightstandSize}" rx="8" fill="${fill}" stroke="${stroke}" stroke-width="1.5" />
                <circle cx="${bx - nightstandSize / 2 - 20}" cy="${by + nightstandSize / 2}" r="${nightstandSize * 0.25}" fill="#fbbf24" opacity="0.6" />
                <rect x="${bx + bedW + 20}" y="${by}" width="${nightstandSize}" height="${nightstandSize}" rx="8" fill="${fill}" stroke="${stroke}" stroke-width="1.5" />
                <circle cx="${bx + bedW + nightstandSize / 2 + 20}" cy="${by + nightstandSize / 2}" r="${nightstandSize * 0.25}" fill="#fbbf24" opacity="0.6" />
            ` : ''}
        `;
    } else if (type === 'toilet' || type === 'wc' || type === 'bathroom') {
        const toiletW = Math.min(w * 0.4, 450);
        const toiletH = Math.min(h * 0.45, 700);
        const tx = 60;
        const ty = 60;
        const showerW = Math.min(w * 0.45, 900);
        const showerH = Math.min(h * 0.45, 900);

        content = `
            <!-- Bồn cầu sứ (Toilet Bowl) -->
            <g transform="translate(${tx}, ${ty})">
                <rect x="0" y="0" width="${toiletW}" height="${toiletH * 0.35}" rx="8" fill="${fill}" stroke="${stroke}" stroke-width="1.8" />
                <ellipse cx="${toiletW / 2}" cy="${toiletH * 0.65}" rx="${toiletW * 0.45}" ry="${toiletH * 0.35}" fill="${fill}" stroke="${stroke}" stroke-width="1.8" />
                <circle cx="${toiletW * 0.8}" cy="${toiletH * 0.18}" r="8" fill="${stroke}" />
            </g>
            <!-- Khu vực tắm sen đứng (Shower Stall) -->
            <g transform="translate(${w - showerW - 40}, ${40})">
                <rect x="0" y="0" width="${showerW}" height="${showerH}" rx="8" fill="none" stroke="${stroke}" stroke-width="1.5" stroke-dasharray="6 4" />
                <circle cx="${showerW / 2}" cy="${showerH / 2}" r="30" fill="none" stroke="${stroke}" stroke-width="1.5" />
                <circle cx="${showerW / 2}" cy="${showerH / 2}" r="8" fill="#38bdf8" />
                <line x1="0" y1="0" x2="${showerW}" y2="${showerH}" stroke="${stroke}" stroke-width="0.8" stroke-dasharray="3 3" />
                <line x1="${showerW}" y1="0" x2="0" y2="${showerH}" stroke="${stroke}" stroke-width="0.8" stroke-dasharray="3 3" />
            </g>
            <!-- Lavabo rửa mặt -->
            <g transform="translate(${tx}, ${h - 450})">
                <rect x="0" y="0" width="${Math.min(w * 0.5, 600)}" height="350" rx="10" fill="${fill}" stroke="${stroke}" stroke-width="1.8" />
                <ellipse cx="${Math.min(w * 0.5, 600) / 2}" cy="175" rx="${Math.min(w * 0.4, 220)}" ry="120" fill="none" stroke="${stroke}" stroke-width="1.5" />
                <circle cx="${Math.min(w * 0.5, 600) / 2}" cy="90" r="10" fill="#38bdf8" />
            </g>
        `;
    } else if (type === 'kitchen_dining' || type === 'kitchen') {
        const counterH = Math.min(h * 0.25, 650);
        content = `
            <!-- Bàn bếp nấu và bồn rửa (Countertop) -->
            <rect x="0" y="0" width="${w}" height="${counterH}" fill="${fill}" stroke="${stroke}" stroke-width="2" />
            <!-- Bếp nấu 3 họng tròn -->
            <g transform="translate(60, 40)">
                <rect x="0" y="0" width="700" height="${counterH - 80}" rx="8" fill="none" stroke="${stroke}" stroke-width="1.5" />
                <circle cx="160" cy="${(counterH - 80) / 2}" r="65" fill="none" stroke="${stroke}" stroke-width="1.8" />
                <circle cx="160" cy="${(counterH - 80) / 2}" r="25" fill="#ef4444" />
                <circle cx="380" cy="${(counterH - 80) / 2}" r="80" fill="none" stroke="${stroke}" stroke-width="1.8" />
                <circle cx="380" cy="${(counterH - 80) / 2}" r="30" fill="#ef4444" />
                <circle cx="580" cy="${(counterH - 80) / 2}" r="50" fill="none" stroke="${stroke}" stroke-width="1.8" />
                <circle cx="580" cy="${(counterH - 80) / 2}" r="20" fill="#ef4444" />
            </g>
            <!-- Bồn rửa bát đôi (Double Sink) -->
            <g transform="translate(${w - 850}, 40)">
                <rect x="0" y="0" width="750" height="${counterH - 80}" rx="8" fill="none" stroke="${stroke}" stroke-width="1.5" />
                <rect x="30" y="20" width="320" height="${counterH - 120}" rx="6" fill="none" stroke="${stroke}" stroke-width="1.5" />
                <rect x="400" y="20" width="320" height="${counterH - 120}" rx="6" fill="none" stroke="${stroke}" stroke-width="1.5" />
                <circle cx="375" cy="40" r="14" fill="#38bdf8" />
            </g>
            <!-- Bàn ăn 6 ghế ở trung tâm -->
            <g transform="translate(${(w - 1400) / 2}, ${counterH + (h - counterH - 800) / 2})">
                <rect x="0" y="100" width="1400" height="600" rx="20" fill="${fill}" stroke="${stroke}" stroke-width="2" />
                <!-- 3 Ghế phía trên -->
                <rect x="150" y="0" width="280" height="80" rx="8" fill="${fill}" stroke="${stroke}" stroke-width="1.5" />
                <rect x="560" y="0" width="280" height="80" rx="8" fill="${fill}" stroke="${stroke}" stroke-width="1.5" />
                <rect x="970" y="0" width="280" height="80" rx="8" fill="${fill}" stroke="${stroke}" stroke-width="1.5" />
                <!-- 3 Ghế phía dưới -->
                <rect x="150" y="720" width="280" height="80" rx="8" fill="${fill}" stroke="${stroke}" stroke-width="1.5" />
                <rect x="560" y="720" width="280" height="80" rx="8" fill="${fill}" stroke="${stroke}" stroke-width="1.5" />
                <rect x="970" y="720" width="280" height="80" rx="8" fill="${fill}" stroke="${stroke}" stroke-width="1.5" />
            </g>
        `;
    } else if (type === 'living_room' || type === 'living') {
        const sofaW = Math.min(w * 0.7, 2400);
        const sofaH = Math.min(h * 0.6, 2000);
        const sx = 80;
        const sy = 80;

        content = `
            <!-- Bộ Sofa góc chữ L cao cấp -->
            <g transform="translate(${sx}, ${sy})">
                <!-- Tựa lưng góc L -->
                <path d="M 0 0 L ${sofaW} 0 L ${sofaW} 300 L 300 300 L 300 ${sofaH} L 0 ${sofaH} Z" fill="${fill}" stroke="${stroke}" stroke-width="2" />
                <!-- Đệm ngồi Sofa -->
                <rect x="320" y="320" width="${sofaW - 340}" height="${sofaH - 340}" rx="12" fill="${fill}" stroke="${stroke}" stroke-width="1.5" />
                <!-- Bàn trà trung tâm (Coffee Table) -->
                <rect x="550" y="550" width="${sofaW * 0.45}" height="${sofaH * 0.35}" rx="16" fill="${fill}" stroke="${stroke}" stroke-width="1.8" />
            </g>
            <!-- Kệ Tivi đối diện -->
            <g transform="translate(${w - 300}, 80)">
                <rect x="0" y="0" width="220" height="${Math.min(h - 160, 2000)}" rx="8" fill="${fill}" stroke="${stroke}" stroke-width="1.8" />
                <rect x="80" y="100" width="40" height="${Math.min(h - 360, 1600)}" rx="4" fill="${stroke}" />
                <text x="110" y="${Math.min(h - 160, 2000) / 2}" fill="#38bdf8" font-size="65" font-weight="bold" text-anchor="middle" transform="rotate(-90 110 ${Math.min(h - 160, 2000) / 2})">SMART TV</text>
            </g>
        `;
    } else if (type === 'altar') {
        const altarW = Math.min(w * 0.75, 1970);
        const altarH = Math.min(h * 0.4, 880);
        const ax = (w - altarW) / 2;
        const ay = 60;

        content = `
            <g transform="translate(${ax}, ${ay})">
                <!-- Bàn thờ gỗ sơn son thếp vàng -->
                <rect x="0" y="0" width="${altarW}" height="${altarH}" rx="12" fill="rgba(245, 158, 11, 0.15)" stroke="#f59e0b" stroke-width="2.5" />
                <!-- Bát hương trung tâm -->
                <circle cx="${altarW / 2}" cy="${altarH / 2}" r="75" fill="#f59e0b" stroke="#000" stroke-width="1.5" />
                <circle cx="${altarW / 2}" cy="${altarH / 2}" r="30" fill="#ef4444" />
                <!-- 2 Chân nến / đèn thờ hai bên -->
                <circle cx="200" cy="${altarH / 2}" r="50" fill="#fbbf24" stroke="#000" stroke-width="1.2" />
                <circle cx="${altarW - 200}" cy="${altarH / 2}" r="50" fill="#fbbf24" stroke="#000" stroke-width="1.2" />
                <!-- Đĩa hoa quả lễ vật -->
                <ellipse cx="${altarW / 2}" cy="${altarH * 0.8}" rx="100" ry="40" fill="#22c55e" opacity="0.7" />
                <text x="${altarW / 2}" y="${altarH * 0.3}" fill="#f59e0b" font-size="65" font-weight="900" text-anchor="middle">ÁNG THỜ TÔN NGHIÊM</text>
            </g>
        `;
    } else if (type === 'garage') {
        const carW = Math.min(w * 0.7, 1850);
        const carH = Math.min(h * 0.85, 4600);
        const cx = (w - carW) / 2;
        const cy = (h - carH) / 2;

        content = `
            <!-- Vạch đỗ xe vàng (Parking Slot) -->
            <rect x="${cx - 40}" y="${cy - 40}" width="${carW + 80}" height="${carH + 80}" fill="none" stroke="#eab308" stroke-width="2" stroke-dasharray="10 10" />
            <!-- Thân xe ô tô sedan/SUV (Top-down View) -->
            <rect x="${cx}" y="${cy}" width="${carW}" height="${carH}" rx="180" fill="${fill}" stroke="${stroke}" stroke-width="2.5" />
            <!-- Kính lái trước -->
            <path d="M ${cx + 100} ${cy + carH * 0.25} Q ${cx + carW / 2} ${cy + carH * 0.2} ${cx + carW - 100} ${cy + carH * 0.25} L ${cx + carW - 140} ${cy + carH * 0.35} L ${cx + 140} ${cy + carH * 0.35} Z" fill="rgba(56, 189, 248, 0.4)" stroke="${stroke}" stroke-width="1.5" />
            <!-- Mui xe (Roof) -->
            <rect x="${cx + 140}" y="${cy + carH * 0.35}" width="${carW - 280}" height="${carH * 0.38}" rx="20" fill="none" stroke="${stroke}" stroke-width="1.2" />
            <!-- Kính hậu sau -->
            <path d="M ${cx + 140} ${cy + carH * 0.73} L ${cx + carW - 140} ${cy + carH * 0.73} L ${cx + carW - 100} ${cy + carH * 0.8} Q ${cx + carW / 2} ${cy + carH * 0.83} ${cx + 100} ${cy + carH * 0.8} Z" fill="rgba(56, 189, 248, 0.4)" stroke="${stroke}" stroke-width="1.5" />
            <!-- 2 Gương chiếu hậu 2 bên -->
            <ellipse cx="${cx - 25}" cy="${cy + carH * 0.26}" rx="30" ry="15" fill="${stroke}" />
            <ellipse cx="${cx + carW + 25}" cy="${cy + carH * 0.26}" rx="30" ry="15" fill="${stroke}" />
        `;
    } else if (type === 'skylight') {
        content = `
            <!-- Giếng trời thông tầng (Skylight X cross) -->
            <rect x="0" y="0" width="${w}" height="${h}" fill="none" stroke="${stroke}" stroke-width="2" stroke-dasharray="8 6" />
            <line x1="0" y1="0" x2="${w}" y2="${h}" stroke="${stroke}" stroke-width="1.5" stroke-dasharray="6 4" />
            <line x1="${w}" y1="0" x2="0" y2="${h}" stroke="${stroke}" stroke-width="1.5" stroke-dasharray="6 4" />
            <text x="${w / 2}" y="${h / 2 + 25}" fill="#38bdf8" font-size="80" font-weight="bold" text-anchor="middle">GIẾNG TRỜI</text>
        `;
    }

    return `
        <g class="cad-furniture-symbol" transform="translate(${x}, ${y}) rotate(${rot})">
            ${content}
        </g>
    `;
}
