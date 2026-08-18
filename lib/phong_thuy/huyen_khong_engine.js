// ============================================================
// Huyền Không Phi Tinh Engine (Xuan Kong Flying Stars Core)
// Tác giả: Dịch Sư Nguyễn Huy Hoàng
// ============================================================

export const MOUNTAINS = [
    { name: 'Nhâm', center: 345, yinYang: 1,  sanYuan: 'Địa',  palace: 1, element: 'Thủy', direction: 'Bắc' },
    { name: 'Tý',   center: 0,   yinYang: -1, sanYuan: 'Thiên', palace: 1, element: 'Thủy', direction: 'Bắc' },
    { name: 'Quý',  center: 15,  yinYang: -1, sanYuan: 'Nhân',  palace: 1, element: 'Thủy', direction: 'Bắc' },
    { name: 'Sửu',  center: 30,  yinYang: -1, sanYuan: 'Địa',  palace: 8, element: 'Thổ',  direction: 'Đông Bắc' },
    { name: 'Cấn',  center: 45,  yinYang: 1,  sanYuan: 'Thiên', palace: 8, element: 'Thổ',  direction: 'Đông Bắc' },
    { name: 'Dần',  center: 60,  yinYang: 1,  sanYuan: 'Nhân',  palace: 8, element: 'Thổ',  direction: 'Đông Bắc' },
    { name: 'Giáp', center: 75,  yinYang: 1,  sanYuan: 'Địa',  palace: 3, element: 'Mộc',  direction: 'Đông' },
    { name: 'Mão',  center: 90,  yinYang: -1, sanYuan: 'Thiên', palace: 3, element: 'Mộc',  direction: 'Đông' },
    { name: 'Ất',   center: 105, yinYang: -1, sanYuan: 'Nhân',  palace: 3, element: 'Mộc',  direction: 'Đông' },
    { name: 'Thìn', center: 120, yinYang: -1, sanYuan: 'Địa',  palace: 4, element: 'Mộc',  direction: 'Đông Nam' },
    { name: 'Tốn',  center: 135, yinYang: 1,  sanYuan: 'Thiên', palace: 4, element: 'Mộc',  direction: 'Đông Nam' },
    { name: 'Tỵ',   center: 150, yinYang: 1,  sanYuan: 'Nhân',  palace: 4, element: 'Hỏa',  direction: 'Đông Nam' },
    { name: 'Bính', center: 165, yinYang: 1,  sanYuan: 'Địa',  palace: 9, element: 'Hỏa',  direction: 'Nam' },
    { name: 'Ngọ',  center: 180, yinYang: -1, sanYuan: 'Thiên', palace: 9, element: 'Hỏa',  direction: 'Nam' },
    { name: 'Đinh', center: 195, yinYang: -1, sanYuan: 'Nhân',  palace: 9, element: 'Hỏa',  direction: 'Nam' },
    { name: 'Mùi',  center: 210, yinYang: -1, sanYuan: 'Địa',  palace: 2, element: 'Thổ',  direction: 'Tây Nam' },
    { name: 'Khôn', center: 225, yinYang: 1,  sanYuan: 'Thiên', palace: 2, element: 'Thổ',  direction: 'Tây Nam' },
    { name: 'Thân', center: 240, yinYang: 1,  sanYuan: 'Nhân',  palace: 2, element: 'Kim',  direction: 'Tây Nam' },
    { name: 'Canh', center: 255, yinYang: 1,  sanYuan: 'Địa',  palace: 7, element: 'Kim',  direction: 'Tây' },
    { name: 'Dậu',  center: 270, yinYang: -1, sanYuan: 'Thiên', palace: 7, element: 'Kim',  direction: 'Tây' },
    { name: 'Tân',  center: 285, yinYang: -1, sanYuan: 'Nhân',  palace: 7, element: 'Kim',  direction: 'Tây' },
    { name: 'Tuất', center: 300, yinYang: -1, sanYuan: 'Địa',  palace: 6, element: 'Thổ',  direction: 'Tây Bắc' },
    { name: 'Càn',  center: 315, yinYang: 1,  sanYuan: 'Thiên', palace: 6, element: 'Kim',  direction: 'Tây Bắc' },
    { name: 'Hợi',  center: 330, yinYang: 1,  sanYuan: 'Nhân',  palace: 6, element: 'Thủy', direction: 'Tây Bắc' }
];

export const PALACE_NAMES = {
    1: 'Khảm (Bắc)',
    2: 'Khôn (Tây Nam)',
    3: 'Chấn (Đông)',
    4: 'Tốn (Đông Nam)',
    5: 'Trung Cung',
    6: 'Càn (Tây Bắc)',
    7: 'Đoài (Tây)',
    8: 'Cấn (Đông Bắc)',
    9: 'Ly (Nam)'
};

export const STAR_PROPERTIES = {
    1: { name: 'Nhất Bạch Tham Lang', element: 'Thủy', nature: 'Cát Tinh', meaning: 'Văn chương, trí tuệ, tài lộc, đào hoa quý nhân' },
    2: { name: 'Nhị Hắc Cự Môn',    element: 'Thổ',  nature: 'Hung Tinh (Bệnh Phù)', meaning: 'Bệnh tật, tai ách, u sầu, tổn thất thân thể' },
    3: { name: 'Tam Bích Lộc Tồn',   element: 'Mộc',  nature: 'Hung Tinh (Si Vưu)', meaning: 'Thị phi, tranh chấp, kiện tụng, khẩu thiệt' },
    4: { name: 'Tứ Lục Văn Khúc',    element: 'Mộc',  nature: 'Cát Tinh (Văn Xương)', meaning: 'Học vấn, công danh, thi cử, nghệ thuật' },
    5: { name: 'Ngũ Hoàng Liêm Trinh', element: 'Thổ', nature: 'Đại Hung Tinh (Chính Quan Sát)', meaning: 'Đại sát, tai họa khôn lường, phá tài thương tổn' },
    6: { name: 'Lục Bạch Vũ Khúc',   element: 'Kim',  nature: 'Cát Tinh (Vũ Khúc)', meaning: 'Quyền uy, chức tước, quý nhân phò trợ' },
    7: { name: 'Thất Xích Phá Quân',  element: 'Kim',  nature: 'Bình / Hung (Tặc Đạo)', meaning: 'Trộm cắp, phá tán, phẫu thuật, khẩu thiệt thị phi' },
    8: { name: 'Bát Bạch Tả Phụ',   element: 'Thổ',  nature: 'Đại Cát Tinh', meaning: 'Điền sản, tài lộc dồi dào, phúc lộc thăng tiến' },
    9: { name: 'Cửu Tử Hữu Bật',    element: 'Hỏa',  nature: 'Đương Vận Cát Tinh (Vận 9)', meaning: 'Hỷ khánh, danh tiếng vang dội, phát đạt tức thì' }
};

export const FORWARD_PATH = [5, 6, 7, 8, 9, 1, 2, 3, 4];
export const REVERSE_PATH = [5, 4, 3, 2, 1, 9, 8, 7, 6];

// Bảng sao thay thế (Thế Tinh) dùng cho Kiêm Hướng
export const REPLACEMENT_STAR = {
    'Tý': 1, 'Quý': 1, 'Giáp': 1, 'Thân': 1,
    'Khôn': 2, 'Nhâm': 2, 'Ất': 2, 'Mão': 2, 'Mùi': 2,
    'Tuất': 6, 'Càn': 6, 'Hợi': 6, 'Thìn': 6, 'Tốn': 6, 'Tỵ': 6,
    'Cấn': 7, 'Bính': 7, 'Tân': 7, 'Dậu': 7, 'Sửu': 7,
    'Dần': 9, 'Ngọ': 9, 'Canh': 9, 'Đinh': 9
};

export function wrapStar(n) {
    return ((n - 1) % 9 + 9) % 9 + 1;
}

export function degreeDiff(a, b) {
    let diff = Math.abs(a - b);
    if (diff > 180) diff = 360 - diff;
    return diff;
}

export function getVan(year) {
    const cycleYear = ((year - 1864) % 180 + 180) % 180;
    return Math.floor(cycleYear / 20) + 1;
}

export function findMountain(degree) {
    degree = ((degree % 360) + 360) % 360;
    let best = null;
    let bestDiff = 999;
    for (const m of MOUNTAINS) {
        const diff = degreeDiff(degree, m.center);
        if (diff < bestDiff) {
            bestDiff = diff;
            best = m;
        }
    }
    return { mountain: best, deviation: bestDiff };
}

export function getOppositeMountain(degree) {
    let opp = (degree + 180) % 360;
    return findMountain(opp);
}

export function classifyChart(deviation) {
    if (deviation <= 3.0) return { type: 'HA_QUAI', label: 'Chính Hướng (Hạ Quái)', isKhongVong: false };
    if (deviation <= 6.0) return { type: 'THE_QUAI', label: 'Kiêm Hướng (Thế Quái)', isKhongVong: false };
    return { type: 'KHONG_VONG', label: 'Phạm Tuyến Không Vong (Đại Hung)', isKhongVong: true };
}

export function findMountainInPalace(palace, sanYuan) {
    return MOUNTAINS.find(m => m.palace === palace && m.sanYuan === sanYuan);
}

export function buildVanBan(vanNumber) {
    const chart = {};
    for (let i = 0; i < 9; i++) {
        const palace = FORWARD_PATH[i];
        chart[palace] = wrapStar(vanNumber + i);
    }
    return chart;
}

export function buildStarBan(startStar, isForward) {
    const path = isForward ? FORWARD_PATH : REVERSE_PATH;
    const chart = {};
    for (let i = 0; i < 9; i++) {
        const palace = path[i];
        chart[palace] = wrapStar(startStar + i);
    }
    return chart;
}

export function getDirection(star, sanYuan, originalMountain) {
    if (star === 5) {
        return originalMountain.yinYang === 1;
    }
    const refMountain = findMountainInPalace(star, sanYuan);
    if (!refMountain) return true;
    return refMountain.yinYang === 1;
}

export function getAnnualStar(year) {
    const remainder = (year - 4) % 9;
    const star = wrapStar(11 - remainder);
    return star;
}

export function getMonthlyStar(solarYear, solarMonth) {
    const yearZhi = (solarYear - 4) % 12;
    let startStar = 8;
    if ([0, 3, 6, 9].includes(yearZhi)) startStar = 8;
    else if ([1, 4, 7, 10].includes(yearZhi)) startStar = 5;
    else startStar = 2;

    const monthOffset = (solarMonth - 1);
    const star = wrapStar(startStar - monthOffset);
    return star;
}

/**
 * Tính toán toàn diện Tinh Bàn Huyền Không Phi Tinh
 */
export function calculateFlyingStars({
    facingDegree = 180,
    buildYear = 2024,
    currentYear = 2026,
    currentMonth = 2,
    currentDay = 1,
    currentHour = 12
}) {
    const van = getVan(buildYear);
    const facingMatch = findMountain(facingDegree);
    const facingMountain = facingMatch.mountain;
    const deviation = facingMatch.deviation;
    const chartClassification = classifyChart(deviation);

    const sittingDegree = (facingDegree + 180) % 360;
    const sittingMountain = getOppositeMountain(facingDegree).mountain;

    // 1. Lập Vận Bàn
    const vanBan = buildVanBan(van);

    // 2. Xác định Sao Tọa & Sao Hướng
    const sittingPalace = sittingMountain.palace;
    const facingPalace = facingMountain.palace;

    const rawSittingStar = vanBan[sittingPalace];
    const rawFacingStar = vanBan[facingPalace];

    let sittingStar = rawSittingStar;
    let facingStar = rawFacingStar;
    let isSittingForward = true;
    let isFacingForward = true;

    if (chartClassification.type === 'HA_QUAI' || chartClassification.type === 'KHONG_VONG') {
        isSittingForward = getDirection(rawSittingStar, sittingMountain.sanYuan, sittingMountain);
        isFacingForward = getDirection(rawFacingStar, facingMountain.sanYuan, facingMountain);
    } else {
        // Thế Quái (Kiêm Hướng)
        const repSitting = REPLACEMENT_STAR[sittingMountain.name] || rawSittingStar;
        const repFacing = REPLACEMENT_STAR[facingMountain.name] || rawFacingStar;
        sittingStar = repSitting;
        facingStar = repFacing;
        isSittingForward = getDirection(rawSittingStar, sittingMountain.sanYuan, sittingMountain);
        isFacingForward = getDirection(rawFacingStar, facingMountain.sanYuan, facingMountain);
    }

    // 3. Phi Tinh Sơn Bàn & Hướng Bàn
    const sonBan = buildStarBan(sittingStar, isSittingForward);
    const huongBan = buildStarBan(facingStar, isFacingForward);

    // 4. Phi Tinh Niên Bàn & Nguyệt Bàn
    const annualCenter = getAnnualStar(currentYear);
    const monthlyCenter = getMonthlyStar(currentYear, currentMonth);

    const nienBan = buildStarBan(annualCenter, true);
    const nguyetBan = buildStarBan(monthlyCenter, true);

    // 5. Tổng hợp 9 Cung
    const palacesData = {};
    for (let p = 1; p <= 9; p++) {
        const vStar = vanBan[p];
        const sStar = sonBan[p];
        const hStar = huongBan[p];
        const nStar = nienBan[p];
        const mStar = nguyetBan[p];

        const isSittingPalace = (p === sittingPalace);
        const isFacingPalace = (p === facingPalace);

        const analysis = evaluateStarPair(sStar, hStar, vStar, van);

        palacesData[p] = {
            palaceId: p,
            palaceName: PALACE_NAMES[p],
            direction: MOUNTAINS.find(m => m.palace === p)?.direction || 'Trung Cung',
            vanStar: vStar,
            sonStar: sStar,
            huongStar: hStar,
            nienStar: nStar,
            nguyetStar: mStar,
            isSitting: isSittingPalace,
            isFacing: isFacingPalace,
            analysis: analysis
        };
    }

    // 6. Nhận diện Đại Cách Cục
    const cachCuc = evaluateCachCuc(palacesData, sittingPalace, facingPalace, van);

    return {
        van,
        buildYear,
        currentYear,
        currentMonth,
        facingDegree,
        sittingDegree,
        facingMountain: facingMountain.name,
        sittingMountain: sittingMountain.name,
        sanYuan: facingMountain.sanYuan,
        deviation: Math.round(deviation * 10) / 10,
        chartType: chartClassification.type,
        chartTypeLabel: chartClassification.label,
        isKhongVong: chartClassification.isKhongVong,
        isSittingForward,
        isFacingForward,
        palaces: palacesData,
        cachCuc,
        meta: {
            appTitle: 'Huyền Không Phi Tinh Phong Thủy',
            author: 'Dịch Sư Nguyễn Huy Hoàng',
            generatedAt: new Date().toISOString()
        }
    };
}

function evaluateCachCuc(palaces, sittingPalace, facingPalace, currentVan) {
    const sitSonStar = palaces[sittingPalace].sonStar;
    const faceHuongStar = palaces[facingPalace].huongStar;
    const sitHuongStar = palaces[sittingPalace].huongStar;
    const faceSonStar = palaces[facingPalace].sonStar;

    if (sitSonStar === currentVan && faceHuongStar === currentVan) {
        return {
            name: 'VƯỢNG SƠN VƯỢNG HƯỚNG (ĐÁO SƠN ĐÁO HƯỚNG)',
            level: 'ĐẠI CÁT',
            summary: 'Đinh tài lưỡng vượng, người nhà khỏe mạnh, nhân tài xuất chúng, tiền tài thịnh vượng bền vững.',
            recommendation: 'Phía sau nhà cần có chỗ tựa vững chắc (núi, nhà cao), phía trước nhà cần có không gian thoáng rộng, có thủy (sông, hồ, ngã ba đường) tụ khí đón tài lộc.'
        };
    } else if (faceSonStar === currentVan && faceHuongStar === currentVan) {
        return {
            name: 'SONG TINH ĐÁO HƯỚNG',
            level: 'CÁT VỀ TÀI LỘC',
            summary: 'Vượng tài nhưng tổn đinh. Kinh doanh buôn bán cực phát đạt nhưng cần chú ý sức khỏe người trong gia đình.',
            recommendation: 'Phía trước cửa cần vừa có Minh đường thoáng đãng có nước (hoặc bể cá, phong thủy luân), vừa có vật nâng đỡ (hòn non bộ, cây xanh cao lớn) để bổ trợ cho nhân đinh.'
        };
    } else if (sitSonStar === currentVan && sitHuongStar === currentVan) {
        return {
            name: 'SONG TINH ĐÁO TỌA',
            level: 'CÁT VỀ NHÂN ĐINH',
            summary: 'Vượng đinh nhưng tổn tài. Gia đạo yên ấm hòa thuận, con cái thành đạt nhưng tiền bạc dễ bị ứ đọng hoặc chậm sinh lợi.',
            recommendation: 'Phía sau nhà cần có chỗ tựa cao ráo và nên mở giếng trời hoặc đặt phong thủy luân phía sau để kích hoạt tài lộc.'
        };
    } else if (sitHuongStar === currentVan && faceSonStar === currentVan) {
        return {
            name: 'THƯỢNG SƠN HẠ THỦY',
            level: 'ĐẠI HUNG CÁCH',
            summary: 'Tổn đinh thoái tài, bệnh tật triền miên, tài lộc hao tán nặng nề.',
            recommendation: 'Cần bố trí Đảo Khí: Phía sau nhà làm không gian thoáng có nước tụ khí, phía trước nhà đặt bình phong hoặc non bộ chắn sát khí để hóa giải.'
        };
    }

    return {
        name: 'CÁCH CỤC BÌNH HÒA',
        level: 'TRUNG BÌNH',
        summary: 'Các cung vị vận hành ổn định, cần dựa vào sự phối hợp các phòng chức năng để tối ưu cát khí.',
        recommendation: 'Bố trí phòng khách, cửa chính, bếp và phòng ngủ vào các cung có Cát Tinh đương vận để kích tài nạp phúc.'
    };
}

function evaluateStarPair(sStar, hStar, vStar, currentVan) {
    const pairKey = `${Math.min(sStar, hStar)}-${Math.max(sStar, hStar)}`;

    const specialCombos = {
        '1-4': { title: 'Tứ Lục Khảm Thủy — Văn Xương Đắc Lực', grade: 'CÁT', desc: 'Chủ về học hành đỗ đạt, thi cử công danh, trí tuệ mẫn tiệp, phát về nghệ thuật & danh tiếng.' },
        '1-6': { title: 'Thiên Địa Giao Thái — Quan Lộc Hanh Thông', grade: 'CÁT', desc: 'Chủ về quyền thế, chức tước cao, quý nhân phù trợ, mưu sự đại thành.' },
        '6-8': { title: 'Vũ Khúc Tả Phụ — Phú Quý Song Toàn', grade: 'ĐẠI CÁT', desc: 'Kim Thổ tương sinh, điền sản hưng vượng, tài vận dồi dào, gia nghiệp bền vững.' },
        '8-9': { title: 'Cửu Tử Bát Bạch — Hỷ Khánh Trùng Phùng', grade: 'ĐẠI CÁT', desc: 'Hỏa Thổ tương sinh, sinh con quý tử, tiền tài phát đạt mau chóng, gia đình đại hỷ.' },
        '2-5': { title: 'Nhị Hắc Ngũ Hoàng — Nhị Ngũ Giao Gia', grade: 'ĐẠI HUNG', desc: 'Đại sát tinh hội tụ! Chủ về bệnh tật nan y, tai nạn thương tật, phá sản. TUYỆT ĐỐI KHÔNG mở cửa chính, bếp hay phòng ngủ tại đây.' },
        '3-7': { title: 'Tam Bích Thất Xích — Xuyên Tâm Sát / Tặc Đạo', grade: 'HUNG', desc: 'Mộc Kim giao chiến, dễ bị trộm cắp, tranh chấp pháp lý kiện tụng, phẫu thuật chảy máu.' },
        '7-9': { title: 'Cửu Thất Hợp Sát — Hồi Lộc Chi Tai', grade: 'HUNG', desc: 'Hỏa khắc Kim, cẩn phòng hỏa hoạn sát khí, bệnh tim mạch mắt hoặc phụ nữ trong nhà bất hòa.' },
        '2-3': { title: 'Đấu Ngưu Sát — Thị Phi Khẩu Thiệt', grade: 'HUNG', desc: 'Mộc khắc Thổ, bất hòa cha con, tranh cãi liên miên, gia đạo không yên.' }
    };

    const found = specialCombos[pairKey];
    if (found) {
        return found;
    }

    if (hStar === 9 || hStar === 8 || hStar === 1) {
        return {
            title: `Cát Tinh Tụ Khí (${sStar}-${hStar})`,
            grade: 'CÁT',
            desc: `Hướng Tinh ${hStar} là cát tinh mang lại sinh khí và tài lộc tốt cho cung vị này.`
        };
    }

    if (hStar === 5 || hStar === 2) {
        return {
            title: `Sát Tinh Cần Hóa Giải (${sStar}-${hStar})`,
            grade: 'HUNG',
            desc: `Cung vị gặp Hướng Tinh ${hStar} (Hung Sát). Nên dùng vật phẩm hành Kim (hồ lô đồng, chuông gió đồng) để tiết khí Thổ hung.`
        };
    }

    return {
        title: `Phối Hợp Tinh Tú (${sStar}-${hStar})`,
        grade: 'BÌNH',
        desc: `Cung vị có năng lượng cân bằng, bố trí nội thất sạch sẽ, thoáng mát để duy trì sinh khí tự nhiên.`
    };
}
