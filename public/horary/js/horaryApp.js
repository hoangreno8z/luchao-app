/**
 * horaryApp.js - Bộ Điều Phối Chính Ứng Dụng Horary Astrology
 * Kết nối Form nhập liệu, Lõi Thiên Văn, Lõi Quy Tắc Lilly,
 * Trình vẽ SVG 1200x1200px và Bản diễn giải tự động cho người mới.
 */

import { calculateHoraryChart } from './ephemerisEngine.js';
import { calculateEssentialDignities, getWhyDignityExplanation } from './traditionalDignities.js';
import { scanAllAspects, scanAllAspectsTimeline } from './aspectEngine.js';
import { scanAllReceptions } from './receptionEngine.js';
import { generateHouseExplanation } from './houseMeanings.js';
import { HoraryChartRenderer } from './horaryChartRenderer.js';
import { renderGlyphSvg } from './svgGlyphs.js';

/**
 * Phân giải offset UTC động bằng IANA TimeZone chuẩn xác (tự động xử lý DST mùa hè/đông)
 */
export function getTimezoneOffsetHours(timeZone, dateObj) {
    try {
        const formatter = new Intl.DateTimeFormat('en-US', {
            timeZone,
            year: 'numeric', month: 'numeric', day: 'numeric',
            hour: 'numeric', minute: 'numeric', second: 'numeric',
            hour12: false
        });
        const parts = formatter.formatToParts(dateObj);
        const p = {};
        for (const part of parts) p[part.type] = part.value;
        let h = parseInt(p.hour, 10);
        if (h === 24) h = 0;
        const tzUtc = Date.UTC(parseInt(p.year, 10), parseInt(p.month, 10) - 1, parseInt(p.day, 10), h, parseInt(p.minute, 10), parseInt(p.second, 10));
        return Math.round((tzUtc - dateObj.getTime()) / 3600000 * 100) / 100;
    } catch (e) {
        return 7;
    }
}

/**
 * Giải quyết giờ dân dụng địa phương (Wall-Time) sang UTC chính xác,
 * phát hiện và xử lý triệt để bước nhảy giờ DST:
 * - NON_EXISTENT_TIME (DST Gap: giờ bị bỏ qua khi đồng hồ nhảy tới)
 * - AMBIGUOUS_TIME (DST Fold: giờ bị lặp lại khi đồng hồ lùi lại)
 * - VALID (giờ hợp lệ)
 */
export function resolveWallTimeToUtc(year, month, day, hour, minute, second = 0, timeZone = 'Asia/Ho_Chi_Minh') {
    const targetWallMs = Date.UTC(year, month - 1, day, hour, minute, second);
    const offApprox = getTimezoneOffsetHours(timeZone, new Date(targetWallMs));

    // Lấy các offset tiềm năng trong khoảng +/- 2 giờ xung quanh
    const offsets = new Set();
    for (let deltaH = -2; deltaH <= 2; deltaH++) {
        const testDate = new Date(targetWallMs - (offApprox + deltaH) * 3600000);
        offsets.add(getTimezoneOffsetHours(timeZone, testDate));
    }

    const validInstants = [];
    for (const off of offsets) {
        const candidateUtc = new Date(targetWallMs - off * 3600000);
        const offCheck = getTimezoneOffsetHours(timeZone, candidateUtc);
        if (Math.abs(offCheck - off) < 1e-4) {
            validInstants.push({ utcDate: candidateUtc, offset: off });
        }
    }

    if (validInstants.length === 0) {
        // DST Gap
        return {
            status: 'NON_EXISTENT_TIME',
            error: 'Giờ nhập không tồn tại trong múi giờ do bước nhảy mùa hè (DST gap).'
        };
    } else if (validInstants.length > 1) {
        // DST Fold
        return {
            status: 'AMBIGUOUS_TIME',
            instants: validInstants,
            utcDate: validInstants[0].utcDate, // default to earlier
            offset: validInstants[0].offset
        };
    } else {
        return {
            status: 'VALID',
            utcDate: validInstants[0].utcDate,
            offset: validInstants[0].offset
        };
    }
}

/**
 * Chuyển đổi giờ dân dụng địa phương (Wall-Time) sang UTC cho ephemeris
 */
export function localWallTimeToUtc(year, month, day, hour, minute, second = 0, timeZone = 'Asia/Ho_Chi_Minh') {
    const res = resolveWallTimeToUtc(year, month, day, hour, minute, second, timeZone);
    if (res.status === 'NON_EXISTENT_TIME') {
        // Tự động tịnh tiến 1 giờ qua gap
        const shiftedMs = Date.UTC(year, month - 1, day, hour + 1, minute, second);
        const offShift = getTimezoneOffsetHours(timeZone, new Date(shiftedMs));
        return new Date(shiftedMs - offShift * 3600000);
    }
    return res.utcDate;
}

/**
 * Lấy UTC Offset chính xác cho giờ địa phương nhập liệu
 */
export function getTimezoneOffsetForWallTime(timeZone, year, month, day, hour, minute, second = 0) {
    const res = resolveWallTimeToUtc(year, month, day, hour, minute, second, timeZone);
    if (res.status === 'NON_EXISTENT_TIME') {
        const shiftedMs = Date.UTC(year, month - 1, day, hour + 1, minute, second);
        return getTimezoneOffsetHours(timeZone, new Date(shiftedMs));
    }
    return res.offset;
}

class HoraryApp {
    constructor() {
        this.renderer = null;
        this.currentChart = null;
        this.currentAspects = [];
        this.currentReceptions = [];
        this.beginnerMode = false;
        this.presetLocations = [
            { name: 'Hà Nội', lat: 21.0285, lon: 105.8542, timeZone: 'Asia/Ho_Chi_Minh', defaultOffset: 7 },
            { name: 'TP. Hồ Chí Minh', lat: 10.8231, lon: 106.6297, timeZone: 'Asia/Ho_Chi_Minh', defaultOffset: 7 },
            { name: 'Đà Nẵng', lat: 16.0544, lon: 108.2022, timeZone: 'Asia/Ho_Chi_Minh', defaultOffset: 7 },
            { name: 'Hải Phòng', lat: 20.8449, lon: 106.6881, timeZone: 'Asia/Ho_Chi_Minh', defaultOffset: 7 },
            { name: 'Cần Thơ', lat: 10.0452, lon: 105.7469, timeZone: 'Asia/Ho_Chi_Minh', defaultOffset: 7 },
            { name: 'Nha Trang', lat: 12.2388, lon: 109.1967, timeZone: 'Asia/Ho_Chi_Minh', defaultOffset: 7 },
            { name: 'Huế', lat: 16.4637, lon: 107.5909, timeZone: 'Asia/Ho_Chi_Minh', defaultOffset: 7 },
            { name: 'Tokyo', lat: 35.6762, lon: 139.6503, timeZone: 'Asia/Tokyo', defaultOffset: 9 },
            { name: 'London', lat: 51.5074, lon: -0.1278, timeZone: 'Europe/London', defaultOffset: 0 },
            { name: 'New York', lat: 40.7128, lon: -74.0060, timeZone: 'America/New_York', defaultOffset: -5 }
        ];
    }

    getAccordionOpenAttr() {
        return (typeof window !== 'undefined' && window.innerWidth <= 768) ? '' : 'open';
    }

    init() {
        this.renderer = new HoraryChartRenderer('horary-chart-container', {
            width: 1200,
            height: 1200,
            bgColor: '#e7e8e2',
            cardBgColor: '#f5f6f0'
        });

        if (typeof window !== 'undefined' && window.innerWidth <= 768) {
            document.querySelectorAll('details.horary-accordion').forEach(d => {
                d.removeAttribute('open');
            });
        }

        this.bindEvents();
        this.populateDefaultDateTime();
        this.calculateAndRender();
    }

    populateDefaultDateTime() {
        const now = new Date();
        const dateInput = document.getElementById('input-date');
        const hourInput = document.getElementById('input-hour');
        const minuteInput = document.getElementById('input-minute');
        const secondInput = document.getElementById('input-second');

        if (dateInput) {
            const y = now.getFullYear();
            const m = String(now.getMonth() + 1).padStart(2, '0');
            const d = String(now.getDate()).padStart(2, '0');
            dateInput.value = `${y}-${m}-${d}`;
        }
        if (hourInput) hourInput.value = now.getHours();
        if (minuteInput) minuteInput.value = now.getMinutes();
        if (secondInput) secondInput.value = now.getSeconds();

        // Tự động phân giải offset theo thành phố đang chọn
        const citySelect = document.getElementById('select-city');
        const cityName = citySelect ? citySelect.value : 'Hà Nội';
        const city = this.presetLocations.find(c => c.name === cityName);
        if (city) {
            this.updateOffsetForCity(city);
        }
    }

    updateOffsetForCity(city) {
        if (!city || !city.timeZone) return;
        const dateVal = document.getElementById('input-date')?.value;
        if (!dateVal) return;
        const [y, m, d] = dateVal.split('-').map(Number);
        const h = parseInt(document.getElementById('input-hour')?.value || 12, 10);
        const min = parseInt(document.getElementById('input-minute')?.value || 0, 10);
        const sec = parseInt(document.getElementById('input-second')?.value || 0, 10);

        const res = resolveWallTimeToUtc(y, m, d, h, min, sec, city.timeZone);
        if (res.status === 'NON_EXISTENT_TIME') {
            console.warn(`[DST Gap] ${city.name} ${y}-${m}-${d} ${h}:${min} không tồn tại trong giờ dân sự.`);
        }
        const offset = getTimezoneOffsetForWallTime(city.timeZone, y, m, d, h, min, sec);
        const offsetInput = document.getElementById('input-offset');
        if (offsetInput) offsetInput.value = offset;
    }

    bindEvents() {
        // Nút Tính Lá Số
        const btnCalc = document.getElementById('btn-calculate');
        if (btnCalc) {
            btnCalc.addEventListener('click', () => this.calculateAndRender());
        }

        // Nút Lấy Giờ Hiện Tại
        const btnNow = document.getElementById('btn-now');
        if (btnNow) {
            btnNow.addEventListener('click', () => {
                this.populateDefaultDateTime();
                this.calculateAndRender();
            });
        }

        // Chọn Thành Phố Nhanh (với múi giờ IANA động)
        const selectCity = document.getElementById('select-city');
        if (selectCity) {
            selectCity.addEventListener('change', (e) => {
                const city = this.presetLocations.find(c => c.name === e.target.value);
                if (city) {
                    document.getElementById('input-lat').value = city.lat;
                    document.getElementById('input-lon').value = city.lon;
                    this.updateOffsetForCity(city);
                }
            });
        }

        // Thay đổi ngày / giờ / phút -> cập nhật lại offset DST động nếu không phải custom
        const updateOffsetCallback = () => {
            const cityName = selectCity ? selectCity.value : 'Hà Nội';
            const city = this.presetLocations.find(c => c.name === cityName);
            if (city) this.updateOffsetForCity(city);
        };

        const dateInput = document.getElementById('input-date');
        if (dateInput) dateInput.addEventListener('change', updateOffsetCallback);

        const hourInput = document.getElementById('input-hour');
        if (hourInput) hourInput.addEventListener('change', updateOffsetCallback);

        const minuteInput = document.getElementById('input-minute');
        if (minuteInput) minuteInput.addEventListener('change', updateOffsetCallback);

        // Nút Lấy GPS Trình Duyệt
        const btnGps = document.getElementById('btn-gps');
        if (btnGps) {
            btnGps.addEventListener('click', () => {
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(
                        pos => {
                            document.getElementById('input-lat').value = pos.coords.latitude.toFixed(4);
                            document.getElementById('input-lon').value = pos.coords.longitude.toFixed(4);
                            document.getElementById('select-city').value = 'custom';
                            this.calculateAndRender();
                        },
                        err => alert('Không thể lấy tọa độ GPS: ' + err.message)
                    );
                } else {
                    alert('Trình duyệt không hỗ trợ Geolocation.');
                }
            });
        }

        // Nút Bật/Tắt Chế Độ Người Mới Học
        const btnBeginner = document.getElementById('btn-beginner-mode');
        if (btnBeginner) {
            btnBeginner.addEventListener('click', () => {
                this.beginnerMode = !this.beginnerMode;
                btnBeginner.classList.toggle('active', this.beginnerMode);
                btnBeginner.innerText = this.beginnerMode ? 'Tắt Chế Độ Người Mới' : 'Bật Chế Độ Người Mới';
                this.renderDetailedReading();
            });
        }

        // Nút Ẩn/Hiện Đường Góc Chiếu
        const btnAspects = document.getElementById('btn-toggle-aspects');
        if (btnAspects) {
            btnAspects.addEventListener('click', () => {
                const isShown = this.renderer.toggleAspectLines();
                btnAspects.classList.toggle('active', isShown);
                btnAspects.innerText = isShown ? 'Ẩn Đường Góc Chiếu' : 'Hiện Đường Góc Chiếu';
            });
        }

        // Nút Tải Ảnh Lá Số PNG
        const btnExport = document.getElementById('btn-export-png');
        if (btnExport) {
            btnExport.addEventListener('click', async () => {
                try {
                    btnExport.disabled = true;
                    btnExport.innerText = 'Đang xuất PNG...';
                    await this.renderer.exportToPng(1);
                } catch (err) {
                    alert('Lỗi xuất file ảnh: ' + err.message);
                } finally {
                    btnExport.disabled = false;
                    btnExport.innerText = 'Tải Ảnh Lá Số PNG';
                }
            });
        }
    }

    async calculateAndRender() {
        const dateVal = document.getElementById('input-date')?.value || new Date().toISOString().slice(0, 10);
        const [yearStr, monthStr, dayStr] = dateVal.split('-');
        const year = parseInt(yearStr, 10);
        const month = parseInt(monthStr, 10);
        const day = parseInt(dayStr, 10);

        const hour = parseInt(document.getElementById('input-hour')?.value || 0, 10);
        const minute = parseInt(document.getElementById('input-minute')?.value || 0, 10);
        const second = parseInt(document.getElementById('input-second')?.value || 0, 10);

        const latitude = parseFloat(document.getElementById('input-lat')?.value || 21.0285);
        const longitude = parseFloat(document.getElementById('input-lon')?.value || 105.8542);
        const utcOffset = parseFloat(document.getElementById('input-offset')?.value || 7);
        const citySelect = document.getElementById('select-city');
        const locationName = citySelect && citySelect.value !== 'custom' ? citySelect.value : 'Tọa độ tùy chỉnh';

        // 1. Tính toán thiên văn & Hệ nhà Regiomontanus chuẩn
        this.currentChart = await calculateHoraryChart({
            year, month, day, hour, minute, second,
            latitude, longitude, utcOffset, locationName
        });

        // 2. Tính phẩm giá bản chất cho các hành tinh
        for (const p of this.currentChart.planets) {
            p.dignity = calculateEssentialDignities(p.id, p.longitude, this.currentChart.isDayChart);
        }

        // 3. TÁCH RỜI LUỒNG: Quét nhanh các góc chiếu tức thời tại t0 để HIỂN THỊ NGAY LẬP TỨC
        this.currentAspects = scanAllAspects(this.currentChart.planets);

        // 4. Quét các cặp tiếp nhận (Receptions) có đối chiếu với Aspects tức thời
        this.currentReceptions = scanAllReceptions(this.currentChart.planets, this.currentChart.isDayChart, this.currentAspects);

        // 5. Kết xuất ngay lá số SVG/PNG và các bảng thông tin mà không chờ giải nghiệm tương lai
        await this.renderer.render(this.currentChart, this.currentAspects);
        this.renderDetailedReading();

        // 6. GIẢI NGHIỆM TƯƠNG LAI ASYNC: Chạy solver ephemeris 14 ngày nền để cập nhật perfection & refranation
        scanAllAspectsTimeline(this.currentChart.planets, this.currentChart.julianDayUT, { inOrbOnly: true })
            .then(timelineAspects => {
                this.currentAspects = timelineAspects;
                this.renderAspectsSection();
            })
            .catch(err => {
                console.warn('Lỗi giải nghiệm tương lai:', err);
            });
    }

    renderDetailedReading() {
        if (!this.currentChart) return;

        this.renderInfoSection();
        this.renderHousesSection();
        this.renderPlanetsSection();
        this.renderAspectsSection();
        this.renderReceptionsSection();
        this.renderRawDataSection();
    }

    renderInfoSection() {
        const container = document.getElementById('chart-info-panel');
        if (!container) return;

        const c = this.currentChart;
        container.innerHTML = `
            <div class="info-grid">
                <div class="info-item"><span class="lbl">Thời gian địa phương:</span> <strong>${c.localTimeFormatted} (${c.utcOffsetFormatted})</strong></div>
                <div class="info-item"><span class="lbl">Địa điểm:</span> <strong>${c.location.name} (${c.location.latFormatted}, ${c.location.lonFormatted})</strong></div>
                <div class="info-item"><span class="lbl">Hệ hoàng đạo:</span> <strong>Tropical (Nhiệt Đới)</strong></div>
                <div class="info-item"><span class="lbl">Hệ thống nhà:</span> <strong>Regiomontanus (Hệ chuẩn Horary)</strong></div>
                <div class="info-item"><span class="lbl">Loại lá số:</span> <strong>${c.isDayChart ? 'Ban Ngày (Day Chart)' : 'Ban Đêm (Night Chart)'}</strong> ${c.sunAltFormatted ? `<small style="color:#475569;">(${c.sunAltFormatted} so với chân trời${c.isBorderlineSect ? ' — Sát đường chân trời' : ''})</small>` : ''}</div>
                ${c.partOfFortune ? `<div class="info-item"><span class="lbl">Điểm May Mắn (Pars Fortunae):</span> <strong>${c.partOfFortune.fullDisplay}</strong> (Nhà ${c.partOfFortune.houseNumber} — Lilly CA p.143)</div>` : ''}
                <div class="info-item"><span class="lbl">Nguồn Ephemeris:</span> <strong class="badge-source">${c.ephemerisSource}</strong></div>
            </div>
        `;
    }

    renderHousesSection() {
        const container = document.getElementById('houses-table-container');
        if (!container) return;

        const cusps = this.currentChart.houses.cusps;
        let html = `
            <details class="horary-accordion reading-card" ${this.getAccordionOpenAttr()}>
                <summary class="accordion-header">
                    <h3>BẢNG 12 NHÀ & CHỦ TINH</h3>
                    <span class="accordion-arrow">▾</span>
                </summary>
                <div class="accordion-content">
                    <p class="section-desc">Cung nằm trên đỉnh mỗi nhà quyết định hành tinh chủ quản theo William Lilly CA pp.50–56. Đây là tác nhân chính biểu thị các vai trò trong câu hỏi.</p>
                    <div class="table-responsive">
                        <table class="horary-table">
                            <thead>
                                <tr>
                                    <th style="width:70px">Nhà</th>
                                    <th style="width:140px">Đỉnh Nhà</th>
                                    <th style="width:130px">Chủ Quản</th>
                                    <th>Ý Nghĩa Truyền Thống & Câu Giải Nghĩa Tự Động</th>
                                </tr>
                            </thead>
                            <tbody>
        `;

        for (let i = 0; i < 12; i++) {
            const houseNum = i + 1;
            const cuspLon = cusps[i];
            const signIdx = Math.floor(cuspLon / 30) % 12;
            const deg = Math.floor(cuspLon % 30);
            const min = Math.round((cuspLon % 1) * 60);

            const signList = ['aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo', 'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces'];
            const signId = signList[signIdx];

            const signRulers = {
                aries: 'mars', taurus: 'venus', gemini: 'mercury', cancer: 'moon',
                leo: 'sun', virgo: 'mercury', libra: 'venus', scorpio: 'mars',
                sagittarius: 'jupiter', capricorn: 'saturn', aquarius: 'saturn', pisces: 'jupiter'
            };
            const rulerId = signRulers[signId];
            const rulerPlanet = this.currentChart.planets.find(p => p.id === rulerId);

            const signNames = {
                aries: 'Bạch Dương', taurus: 'Kim Ngưu', gemini: 'Song Tử', cancer: 'Cự Giải',
                leo: 'Sư Tử', virgo: 'Xử Nữ', libra: 'Thiên Bình', scorpio: 'Bọ Cạp',
                sagittarius: 'Nhân Mã', capricorn: 'Ma Kết', aquarius: 'Bảo Bình', pisces: 'Song Ngư'
            };

            const isAngular = [1, 4, 7, 10].includes(houseNum);
            const rowClass = isAngular ? 'row-angular' : '';

            const cuspFormatted = `${deg}°${String(min).padStart(2, '0')}′`;
            const explanation = generateHouseExplanation(houseNum, signId, rulerId, cuspFormatted, rulerPlanet);

            // Quy tắc 5° Lilly: Cung cấp ảnh hưởng cuspInfluence mà không ghi đè houseNumber gốc
            const fiveDegPlanets = this.currentChart.planets.filter(p => p.cuspInfluence && p.cuspInfluence.withinFiveDegreeRule && p.cuspInfluence.nextHouse === houseNum);
            const fiveDegNote = fiveDegPlanets.length > 0 ?
                `<div class="house-5deg-note" style="font-size:0.75rem; color:#b45309; margin-top:4px; font-weight:600;">★ Quy tắc 5° Lilly: ${fiveDegPlanets.map(p => `${p.nameVi} (cách đỉnh ${p.cuspInfluence.distanceDeg.toFixed(1)}°) có ảnh hưởng mạnh sang Nhà ${houseNum}`).join(', ')}</div>` : '';

            html += `
                <tr class="${rowClass}">
                    <td>
                        <strong>Nhà ${houseNum}</strong>
                        ${isAngular ? `<span class="angular-tag">Góc</span>` : ''}
                    </td>
                    <td>
                        ${renderGlyphSvg(signId, 16)}
                        <strong>${deg}°${String(min).padStart(2, '0')}′</strong> ${signNames[signId]}
                    </td>
                    <td>
                        ${renderGlyphSvg(rulerPlanet ? rulerPlanet.glyphKey : rulerId, 16)}
                        <strong>${rulerPlanet ? rulerPlanet.nameVi : rulerId}</strong>
                    </td>
                    <td>
                        <div class="house-sentence">${explanation.sentence}</div>
                        <div class="house-subinfo"><em>Ý nghĩa gốc:</em> ${explanation.traditionalMeaning}</div>
                        ${fiveDegNote}
                    </td>
                </tr>
            `;
        }

        html += `</tbody></table></div></div></details>`;
        container.innerHTML = html;
    }

    renderPlanetsSection() {
        const container = document.getElementById('planets-table-container');
        if (!container) return;

        let html = `
            <details class="horary-accordion reading-card" ${this.getAccordionOpenAttr()}>
                <summary class="accordion-header">
                    <h3>BẢNG TỌA ĐỘ & PHẨM GIÁ</h3>
                    <span class="accordion-arrow">▾</span>
                </summary>
                <div class="accordion-content">
                    <p class="section-desc">Phẩm giá bản chất xác định năng lực, tư cách và thiện chí thực sự của từng hành tinh theo chuẩn mực William Lilly (1647).</p>
                    <div class="table-responsive">
                        <table class="horary-table">
                            <thead>
                                <tr>
                                    <th>Hành Tinh</th>
                                    <th>Tọa Độ Hoàng Đạo</th>
                                    <th>Nhà</th>
                                    <th>Chuyển Động</th>
                                    <th>Tốc Độ Thực</th>
                                    <th>Phẩm Giá Bản Chất</th>
                                    <th style="width:100px">Giải Thích</th>
                                </tr>
                            </thead>
                            <tbody>
        `;

        for (const p of this.currentChart.planets) {
            const dig = p.dignity;
            const motionClass = p.isRetrograde ? 'badge-rx' : (p.isStationary ? 'badge-stat' : 'badge-dir');
            const dignityClass = dig ? `badge-dignity-${dig.primaryStatusClass}` : '';

            const motionText = this.beginnerMode ?
                `${renderGlyphSvg(p.motionGlyphKey, 14)} ${p.motionVi} (${p.motion})` :
                `${renderGlyphSvg(p.motionGlyphKey, 14)} ${p.motionVi}`;

            const planetDisplay = this.beginnerMode ?
                `${renderGlyphSvg(p.glyphKey, 18)} <strong>${p.nameVi}</strong> (${p.nameEn})` :
                `${renderGlyphSvg(p.glyphKey, 18)} <strong>${p.nameVi}</strong>`;

            const signDisplay = this.beginnerMode ?
                `${renderGlyphSvg(p.signGlyphKey, 16)} ${p.formatted} ${p.signNameVi} (${p.signNameEn})` :
                `${renderGlyphSvg(p.signGlyphKey, 16)} ${p.formatted} ${p.signNameVi}`;

            const houseNote = p.cuspInfluence && p.cuspInfluence.withinFiveDegreeRule ?
                `<br><small style="color:#b45309; font-size:0.75rem;">(Sát đỉnh Nhà ${p.cuspInfluence.nextHouse})</small>` : '';

            html += `
                <tr>
                    <td>${planetDisplay}</td>
                    <td>${signDisplay}</td>
                    <td class="text-center"><strong>Nhà ${p.houseNumber}</strong>${houseNote}</td>
                    <td><span class="badge ${motionClass}">${motionText}</span></td>
                    <td><code>${p.formattedSpeed}</code></td>
                    <td>
                        <span class="badge ${dignityClass}">${dig ? dig.primaryStatus : '—'}</span>
                        ${dig && dig.score !== 0 ? `<small>(${dig.score >= 0 ? '+' : ''}${dig.score})</small>` : ''}
                    </td>
                    <td>
                        <button class="btn-why" onclick="window.horaryAppInstance.showWhyModal('${p.id}', '${p.signId}')">Vì sao?</button>
                    </td>
                </tr>
            `;
        }

        html += `</tbody></table></div></div></details>`;
        container.innerHTML = html;
    }

    renderAspectsSection() {
        const container = document.getElementById('aspects-table-container');
        if (!container) return;

        if (this.currentAspects.length === 0) {
            container.innerHTML = `
                <details class="horary-accordion reading-card" ${this.getAccordionOpenAttr()}>
                    <summary class="accordion-header">
                        <h3>BẢNG GÓC CHIẾU PTOLEMAIC</h3>
                        <span class="accordion-arrow">▾</span>
                    </summary>
                    <div class="accordion-content">
                        <p>Không có góc chiếu Ptolemaic nào nằm trong phạm vi Orb Moieties của các thiên thể.</p>
                    </div>
                </details>`;
            return;
        }

        let html = `
            <details class="horary-accordion reading-card" ${this.getAccordionOpenAttr()}>
                <summary class="accordion-header">
                    <h3>BẢNG GÓC CHIẾU PTOLEMAIC</h3>
                    <span class="accordion-arrow">▾</span>
                </summary>
                <div class="accordion-content">
                    <p class="section-desc">Trong Horary, chỉ những góc <strong>Đang tiến tới (Applying)</strong> mới biểu thị sự việc sẽ xảy ra trong tương lai. Góc <strong>Đã rời xa (Separating)</strong> biểu thị việc đã qua.</p>
                    <div class="table-responsive">
                        <table class="horary-table">
                            <thead>
                                <tr>
                                    <th>Hành Tinh A</th>
                                    <th>Góc Chiếu</th>
                                    <th>Hành Tinh B</th>
                                    <th>Sai Số (Orb)</th>
                                    <th>Trạng Thái Động Học</th>
                                    <th>Bảng Chuyển Động Kiểm Chứng (-6h → Hiện tại → +6h)</th>
                                    <th>Dự Báo Hoàn Thành (Perfection)</th>
                                </tr>
                            </thead>
                            <tbody>
        `;

        for (const asp of this.currentAspects) {
            const stateClass = `badge-${asp.stateClass}`;
            const motionStr = asp.motionSteps ? asp.motionSteps.map(m => `<span>${m.label}: <strong>${m.separation}</strong></span>`).join(' → ') : '—';

            let perfHtml = '<em>Đã qua đỉnh</em>';
            if (asp.perfectionInfo) {
                if (asp.perfectionInfo.refranation) {
                    perfHtml = `<span class="badge badge-warning-refranation">${asp.perfectionInfo.description}</span>`;
                } else if (asp.perfectionInfo.ingressBeforeAspect) {
                    perfHtml = `<span class="badge badge-warning-refranation">${asp.perfectionInfo.description}</span>`;
                } else {
                    perfHtml = `<span class="badge-perfection">${asp.perfectionInfo.description}</span>`;
                }
            } else if (asp.state === 'APPLYING') {
                perfHtml = `<span style="font-size:0.8rem; color:#64748b;">Đang tính timeline...</span>`;
            }

            html += `
                <tr>
                    <td>${renderGlyphSvg(asp.planetA.glyphKey, 16)} <strong>${asp.planetA.nameVi}</strong></td>
                    <td class="text-center font-bold">
                        ${renderGlyphSvg(asp.aspectGlyphKey, 18)} ${asp.aspectNameVi} (${asp.aspectAngle}°)
                    </td>
                    <td>${renderGlyphSvg(asp.planetB.glyphKey, 16)} <strong>${asp.planetB.nameVi}</strong></td>
                    <td><strong>${asp.orbFormatted}</strong> <small style="color:#64748b;">(Max: ${asp.maxOrbAllowed.toFixed(1)}°)</small></td>
                    <td>
                        <span class="badge ${stateClass}">${asp.stateVi}</span>
                        <div class="aspect-hint">${asp.explanation}</div>
                    </td>
                    <td>
                        <div class="motion-steps-box">${motionStr}</div>
                    </td>
                    <td>${perfHtml}</td>
                </tr>
            `;
        }

        html += `</tbody></table></div></div></details>`;
        container.innerHTML = html;
    }

    renderReceptionsSection() {
        const container = document.getElementById('receptions-table-container');
        if (!container) return;

        if (this.currentReceptions.length === 0) {
            container.innerHTML = `
                <details class="horary-accordion reading-card" ${this.getAccordionOpenAttr()}>
                    <summary class="accordion-header">
                        <h3>BẢNG TIẾP NHẬN HAI CHIỀU</h3>
                        <span class="accordion-arrow">▾</span>
                    </summary>
                    <div class="accordion-content">
                        <p>Hiện không có tiếp nhận đáng kể nào giữa các hành tinh chính.</p>
                    </div>
                </details>`;
            return;
        }

        let html = `
            <details class="horary-accordion reading-card" ${this.getAccordionOpenAttr()}>
                <summary class="accordion-header">
                    <h3>BẢNG TIẾP NHẬN HAI CHIỀU</h3>
                    <span class="accordion-arrow">▾</span>
                </summary>
                <div class="accordion-content">
                    <p class="section-desc">Theo Sahl ibn Bishr, tiếp nhận chỉ có giá trị khi qua Domicile/Exaltation hoặc kết hợp ít nhất 2 phẩm giá nhỏ. Tiếp nhận được kích hoạt (Active) khi hai bên có Aspect kết nối.</p>
                    <div class="reception-cards-grid">
        `;

        for (const pair of this.currentReceptions) {
            const mutualTag = pair.hasMutual ? `<span class="badge-mutual">★ TIẾP NHẬN TƯƠNG HỖ (MUTUAL RECEPTION)</span>` : '';
            const activeBadge = pair.isActive ?
                `<span class="badge badge-active">● ĐÃ KÍCH HOẠT QUA GÓC CHIẾU</span>` :
                `<span class="badge badge-potential">○ TIỀM NĂNG (CHƯA CÓ GÓC)</span>`;

            html += `
                <div class="reception-card ${pair.hasMutual ? 'mutual-card' : ''}">
                    <div class="reception-header" style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:6px; margin-bottom:8px;">
                        <h4>Cặp: ${getPlanetNameVi(pair.planetAId)} & ${getPlanetNameVi(pair.planetBId)} ${mutualTag}</h4>
                        <div>${activeBadge}</div>
                    </div>
                    <div class="reception-body">
                        <div style="font-size:0.8rem; color:#475569; margin-bottom:10px; font-style:italic; background:#f8fafc; padding:6px 10px; border-radius:6px; border:1px solid #e2e8f0;">
                            ${pair.activeExplanation}
                        </div>

                        ${pair.aReceivesB ? `
                            <div class="reception-dir">
                                <strong>${pair.aReceivesB.hostNameVi} đón ${pair.aReceivesB.guestNameVi}:</strong>
                                <small style="color:${pair.aReceivesB.isQualified ? '#15803d' : '#b45309'}; font-weight:600;">[${pair.aReceivesB.sahlStatusVi}]</small>
                                <ul>${pair.aReceivesB.receptionTypes.map(r => `<li><strong>${r.nameVi}</strong>: ${r.explanation}</li>`).join('')}</ul>
                            </div>
                        ` : `<div class="reception-dir text-muted">${getPlanetNameVi(pair.planetAId)} không tiếp nhận ${getPlanetNameVi(pair.planetBId)}.</div>`}

                        ${pair.bReceivesA ? `
                            <div class="reception-dir">
                                <strong>${pair.bReceivesA.hostNameVi} đón ${pair.bReceivesA.guestNameVi}:</strong>
                                <small style="color:${pair.bReceivesA.isQualified ? '#15803d' : '#b45309'}; font-weight:600;">[${pair.bReceivesA.sahlStatusVi}]</small>
                                <ul>${pair.bReceivesA.receptionTypes.map(r => `<li><strong>${r.nameVi}</strong>: ${r.explanation}</li>`).join('')}</ul>
                            </div>
                        ` : `<div class="reception-dir text-muted">${getPlanetNameVi(pair.planetBId)} không tiếp nhận ${getPlanetNameVi(pair.planetAId)}.</div>`}

                        ${pair.hasMutual ? `<div class="mutual-note">${pair.mutualDescription}</div>` : ''}
                    </div>
                </div>
            `;
        }

        html += `</div></div></details>`;
        container.innerHTML = html;
    }

    renderRawDataSection() {
        const container = document.getElementById('raw-astronomy-accordion');
        if (!container) return;

        const c = this.currentChart;
        const rawJson = JSON.stringify({
            julianDayUT: c.julianDayUT,
            ephemerisSource: c.ephemerisSource,
            localTime: c.localTimeFormatted,
            coordinates: c.location,
            sunAltitude: c.sunAltitude,
            isDayChart: c.isDayChart,
            houses: c.houses,
            planets: c.planets.map(p => ({
                id: p.id,
                name: p.nameVi,
                longitude: p.longitude,
                latitude: p.latitude,
                speedLongitude: p.speedLongitude,
                motion: p.motion,
                sign: p.signNameVi,
                degreeInSign: p.degreeDecimal,
                house: p.houseNumber,
                cuspInfluence: p.cuspInfluence
            }))
        }, null, 2);

        container.innerHTML = `
            <details class="raw-data-details">
                <summary><strong>DỮ LIỆU THIÊN VĂN GỐC</strong> — Tọa độ số thực, JD và đỉnh nhà</summary>
                <pre class="raw-json-block"><code>${rawJson}</code></pre>
            </details>
        `;
    }

    showWhyModal(planetId, signId) {
        const text = getWhyDignityExplanation(planetId, signId);
        alert(`GIẢI THÍCH PHẨM GIÁ:\n\n${text}`);
    }
}

function getPlanetNameVi(id) {
    const names = {
        sun: 'Mặt Trời', moon: 'Mặt Trăng', mercury: 'Thủy Tinh',
        venus: 'Kim Tinh', mars: 'Hỏa Tinh', jupiter: 'Mộc Tinh', saturn: 'Thổ Tinh'
    };
    return names[id] || id;
}

// Khởi tạo và gắn vào window khi trang tải xong
if (typeof window !== 'undefined') {
    window.addEventListener('DOMContentLoaded', () => {
        window.horaryAppInstance = new HoraryApp();
        window.horaryAppInstance.init();
    });
}
