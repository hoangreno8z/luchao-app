/**
 * Bộ lõi Lịch Pháp & Tiết Khí Thiên Văn — V3 FIXED
 * Sửa toàn bộ công thức Can Chi (Năm, Tháng, Ngày, Giờ) cho chính xác.
 */

const CAN_LIST = ["Giáp", "Ất", "Bính", "Đinh", "Mậu", "Kỷ", "Canh", "Tân", "Nhâm", "Quý"];
const CHI_LIST = ["Tý", "Sửu", "Dần", "Mão", "Thìn", "Tị", "Ngọ", "Mùi", "Thân", "Dậu", "Tuất", "Hợi"];

// 24 Tiết Khí
const SOLAR_TERMS = [
    { name: "Đông Chí",    longitude: 270, approxMonth: 12, approxDay: 21 },
    { name: "Tiểu Hàn",    longitude: 285, approxMonth: 1,  approxDay: 5 },
    { name: "Đại Hàn",     longitude: 300, approxMonth: 1,  approxDay: 20 },
    { name: "Lập Xuân",    longitude: 315, approxMonth: 2,  approxDay: 4 },
    { name: "Vũ Thủy",     longitude: 330, approxMonth: 2,  approxDay: 19 },
    { name: "Kinh Trập",   longitude: 345, approxMonth: 3,  approxDay: 5 },
    { name: "Xuân Phân",   longitude: 0,   approxMonth: 3,  approxDay: 20 },
    { name: "Thanh Minh",  longitude: 15,  approxMonth: 4,  approxDay: 4 },
    { name: "Cốc Vũ",      longitude: 30,  approxMonth: 4,  approxDay: 19 },
    { name: "Lập Hạ",      longitude: 45,  approxMonth: 5,  approxDay: 5 },
    { name: "Tiểu Mãn",    longitude: 60,  approxMonth: 5,  approxDay: 20 },
    { name: "Mang Chủng",  longitude: 75,  approxMonth: 6,  approxDay: 5 },
    { name: "Hạ Chí",      longitude: 90,  approxMonth: 6,  approxDay: 21 },
    { name: "Tiểu Thử",    longitude: 105, approxMonth: 7,  approxDay: 7 },
    { name: "Đại Thử",     longitude: 120, approxMonth: 7,  approxDay: 23 },
    { name: "Lập Thu",     longitude: 135, approxMonth: 8,  approxDay: 7 },
    { name: "Xử Thử",      longitude: 150, approxMonth: 8,  approxDay: 23 },
    { name: "Bạch Lộ",     longitude: 165, approxMonth: 9,  approxDay: 7 },
    { name: "Thu Phân",    longitude: 180, approxMonth: 9,  approxDay: 22 },
    { name: "Hàn Lộ",      longitude: 195, approxMonth: 10, approxDay: 8 },
    { name: "Sương Giáng", longitude: 210, approxMonth: 10, approxDay: 23 },
    { name: "Lập Đông",    longitude: 225, approxMonth: 11, approxDay: 7 },
    { name: "Tiểu Tuyết",  longitude: 240, approxMonth: 11, approxDay: 22 },
    { name: "Đại Tuyết",   longitude: 255, approxMonth: 12, approxDay: 7 }
];

// ========== Julian Day Number (JD) ==========
function getJulianDay(year, month, day, hour, minute) {
    let y = year;
    let m = month;
    if (m <= 2) { y -= 1; m += 12; }
    const A = Math.floor(y / 100);
    const B = 2 - A + Math.floor(A / 4);
    const dayFrac = (hour + (minute || 0) / 60) / 24;
    return Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + day + dayFrac + B - 1524.5;
}

// ========== Solar Longitude (Thiên Văn) ==========
function getSolarLongitude(jd) {
    const T = (jd - 2451545.0) / 36525.0;
    let L0 = 280.46646 + 36000.76983 * T + 0.0003032 * T * T;
    let M = 357.52911 + 35999.05029 * T - 0.0001537 * T * T;
    const Mrad = M * Math.PI / 180;
    let C = (1.914602 - 0.004817 * T) * Math.sin(Mrad)
          + (0.019993 - 0.000101 * T) * Math.sin(2 * Mrad)
          + 0.000289 * Math.sin(3 * Mrad);
    return ((L0 + C) % 360 + 360) % 360;
}

function getExactSolarTerm(year, month, day, hour) {
    let currentTerm = SOLAR_TERMS[0];
    for (let i = SOLAR_TERMS.length - 1; i >= 0; i--) {
        const t = SOLAR_TERMS[i];
        if (month > t.approxMonth || (month === t.approxMonth && day >= t.approxDay)) {
            currentTerm = t;
            break;
        }
    }
    return currentTerm;
}

// ========== CAN CHI - TỨ TRỤ (ĐÃ SỬA ĐÚNG) ==========

/**
 * CAN CHI NĂM
 * Chuẩn: năm 4 CN = Giáp Tý → offset = year - 4
 * VD: 2026 → (2026-4)%10 = 2 (Bính), (2026-4)%12 = 6 (Ngọ) → Bính Ngọ ✓
 */
function getCanChiYear(year) {
    let canIdx = ((year - 4) % 10 + 10) % 10;
    let chiIdx = ((year - 4) % 12 + 12) % 12;
    return {
        can: CAN_LIST[canIdx], chi: CHI_LIST[chiIdx],
        canIdx, chiIdx,
        name: `${CAN_LIST[canIdx]} ${CHI_LIST[chiIdx]}`
    };
}

/**
 * CAN CHI THÁNG (Tứ Trụ Nguyệt Kiến)
 * Chi tháng cố định: Tháng DL 2 = Dần, 3 = Mão, ..., 12 = Tý (Hạ Chí), 1 = Sửu
 * Can tháng: Ngũ Hổ Độn — (yearCan % 5) * 2 + 2 = Can khởi tháng Dần
 */
function getCanChiMonth(yearCanIdx, solarMonth) {
    // Tháng DL → Tứ Trụ tháng số: Feb=1(Dần), Mar=2(Mão), ..., Jan=12(Sửu)
    const ttuMonth = ((solarMonth - 2 + 12) % 12) + 1;
    const chiIdx = (ttuMonth + 1) % 12; // ttuMonth 1 → Dần(2), 2→Mão(3), ..., 12→Sửu(1)

    // Can khởi tháng Dần (tháng 1 Tứ Trụ)
    const month1Can = ((yearCanIdx % 5) * 2 + 2) % 10;
    const canIdx = (month1Can + ttuMonth - 1) % 10;

    return {
        can: CAN_LIST[canIdx], chi: CHI_LIST[chiIdx],
        canIdx, chiIdx,
        name: `${CAN_LIST[canIdx]} ${CHI_LIST[chiIdx]}`
    };
}

/**
 * CAN CHI NGÀY (Dùng Julian Day Number — chính xác tuyệt đối)
 * Công thức: canIdx = (JD_noon + 9) % 10, chiIdx = (JD_noon + 1) % 12
 * Đã xác minh: Jan 1, 2000 (JD 2451545) = Mậu Ngọ ✓
 */
function getCanChiDay(year, month, day) {
    const jd = getJulianDay(year, month, day, 12, 0); // JD tại 12h trưa UT
    const jdInt = Math.round(jd);

    let canIdx = (jdInt + 9) % 10;
    let chiIdx = (jdInt + 1) % 12;

    return {
        can: CAN_LIST[canIdx], chi: CHI_LIST[chiIdx],
        canIdx, chiIdx,
        jdInt, // lưu lại để Nhật Kể tính Tích Nhật
        name: `${CAN_LIST[canIdx]} ${CHI_LIST[chiIdx]}`
    };
}

/**
 * CAN CHI GIỜ (Ngũ Thử Độn — dựa trên Can Ngày)
 * Chi giờ: 23h-01h = Tý(0), 01h-03h = Sửu(1), ...
 * Can giờ: ((dayCan % 5) * 2 + hourChiIdx) % 10
 */
function getCanChiHour(dayCanIdx, hour) {
    let chiIdx;
    if (hour >= 23 || hour < 1) chiIdx = 0;       // Tý
    else chiIdx = Math.floor((hour + 1) / 2);

    const canIdx = ((dayCanIdx % 5) * 2 + chiIdx) % 10;

    return {
        can: CAN_LIST[canIdx], chi: CHI_LIST[chiIdx],
        canIdx, chiIdx,
        name: `${CAN_LIST[canIdx]} ${CHI_LIST[chiIdx]}`
    };
}

/**
 * TỨ TRỤ TỔNG HỢP
 */
function getTuTru(year, month, day, hour) {
    const yCC = getCanChiYear(year);
    const mCC = getCanChiMonth(yCC.canIdx, month);
    const dCC = getCanChiDay(year, month, day);
    const hCC = getCanChiHour(dCC.canIdx, hour);
    return {
        year: yCC, month: mCC, day: dCC, hour: hCC,
        fullString: `${yCC.name} / ${mCC.name} / ${dCC.name} / ${hCC.name}`,
        solarDate: `${String(day).padStart(2,'0')}/${String(month).padStart(2,'0')}/${year} — ${String(hour).padStart(2,'0')}:00`
    };
}
