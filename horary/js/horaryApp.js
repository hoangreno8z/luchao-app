/**
 * horaryApp.js - Bộ Điều Phối Chính Ứng Dụng Horary Astrology
 * Kết nối Form nhập liệu, Lõi Thiên Văn, Lõi Quy Tắc Lilly,
 * Trình vẽ SVG và Bản diễn giải học thuật.
 */

import { calculateHoraryChart } from './ephemerisEngine.js';
import { calculateEssentialDignities, getWhyDignityExplanation } from './traditionalDignities.js';
import { scanAllAspects, scanAllAspectsTimeline } from './aspectEngine.js';
import { scanAllReceptions } from './receptionEngine.js';
import { generateHouseExplanation } from './houseMeanings.js';
import { HoraryChartRenderer } from './horaryChartRenderer.js';
import { resolveWallTimeToUtc, getNowInTimezone, formatOffsetMinutes, getTimezoneOffsetHours, getTimezoneOffsetForWallTime, localWallTimeToUtc } from './timeResolver.js';
import { formatZodiacLongitude } from './traditionalRulers.js';

export { getTimezoneOffsetHours, getTimezoneOffsetForWallTime, localWallTimeToUtc, resolveWallTimeToUtc, getNowInTimezone, formatOffsetMinutes };

class HoraryApp {
    constructor() {
        this.renderer = null;
        this.currentChart = null;
        this.currentAspects = [];
        this.currentReceptions = [];
        this.beginnerMode = false;
        this.chartGeneration = 0;
        this.presetLocations = [
            { name: 'Hà Nội', lat: 21.0285, lon: 105.8542, timeZone: 'Asia/Ho_Chi_Minh' },
            { name: 'TP. Hồ Chí Minh', lat: 10.8231, lon: 106.6297, timeZone: 'Asia/Ho_Chi_Minh' },
            { name: 'Đà Nẵng', lat: 16.0544, lon: 108.2022, timeZone: 'Asia/Ho_Chi_Minh' },
            { name: 'Hải Phòng', lat: 20.8449, lon: 106.6881, timeZone: 'Asia/Ho_Chi_Minh' },
            { name: 'Cần Thơ', lat: 10.0452, lon: 105.7469, timeZone: 'Asia/Ho_Chi_Minh' },
            { name: 'Nha Trang', lat: 12.2388, lon: 109.1967, timeZone: 'Asia/Ho_Chi_Minh' },
            { name: 'Huế', lat: 16.4637, lon: 107.5909, timeZone: 'Asia/Ho_Chi_Minh' },
            { name: 'Tokyo', lat: 35.6762, lon: 139.6503, timeZone: 'Asia/Tokyo' },
            { name: 'London', lat: 51.5074, lon: -0.1278, timeZone: 'Europe/London' },
            { name: 'New York', lat: 40.7128, lon: -74.0060, timeZone: 'America/New_York' }
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

    /**
     * Lấy giờ hiện tại chuẩn theo múi giờ IANA của địa điểm đang chọn
     * (Không lấy giờ máy khách khi xem thành phố khác)
     */
    populateDefaultDateTime() {
        const tzSelect = document.getElementById('select-timezone');
        const timeZone = tzSelect?.value || 'Asia/Ho_Chi_Minh';
        const nowInTz = getNowInTimezone(timeZone);

        const dateInput = document.getElementById('input-date');
        const hourInput = document.getElementById('input-hour');
        const minuteInput = document.getElementById('input-minute');
        const secondInput = document.getElementById('input-second');

        if (dateInput) {
            dateInput.value = `${nowInTz.year}-${String(nowInTz.month).padStart(2, '0')}-${String(nowInTz.day).padStart(2, '0')}`;
        }
        if (hourInput) hourInput.value = nowInTz.hour;
        if (minuteInput) minuteInput.value = nowInTz.minute;
        if (secondInput) secondInput.value = nowInTz.second;
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

        // Chọn Thành Phố Nhanh (tự động cập nhật vĩ độ, kinh độ và timezone IANA)
        const selectCity = document.getElementById('select-city');
        if (selectCity) {
            selectCity.addEventListener('change', (e) => {
                const city = this.presetLocations.find(c => c.name === e.target.value);
                if (city) {
                    const latInput = document.getElementById('input-lat');
                    const lonInput = document.getElementById('input-lon');
                    const tzSelect = document.getElementById('select-timezone');
                    if (latInput) latInput.value = city.lat;
                    if (lonInput) lonInput.value = city.lon;
                    if (tzSelect && city.timeZone) tzSelect.value = city.timeZone;
                }
            });
        }

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
                btnAspects.innerText = isShown ? 'Ẩn Góc Chiếu' : 'Hiện Góc Chiếu';
            });
        }

        // Nút Tải Ảnh Lá Số PNG (Chỉ sinh PNG theo yêu cầu)
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

    /**
     * Hiển thị Modal thông báo chuyển giờ DST hoặc cho phép chọn giờ trùng lặp (Fold)
     */
    showDstModal({ title, message, candidates = [], type = 'info', onSelect }) {
        const modal = document.getElementById('dst-modal');
        const titleEl = document.getElementById('dst-modal-title');
        const bodyEl = document.getElementById('dst-modal-body');
        const actionsEl = document.getElementById('dst-modal-actions');
        if (!modal) {
            alert(message);
            return;
        }

        titleEl.innerText = title;
        bodyEl.innerHTML = `<p style="margin-bottom:12px; font-size:0.95rem; color:#1e293b;">${message}</p>`;
        actionsEl.innerHTML = '';

        if (type === 'choice' && candidates.length > 0) {
            candidates.forEach((cand, idx) => {
                const btn = document.createElement('button');
                btn.className = 'btn btn-primary';
                btn.style.margin = '4px 0';
                btn.style.textAlign = 'left';
                btn.innerHTML = `<strong>${cand.label}</strong><br><small style="opacity:0.85;">UTC: ${cand.formattedUtc} (${cand.formattedOffset})</small>`;
                btn.onclick = () => {
                    modal.style.display = 'none';
                    if (onSelect) onSelect(idx);
                };
                actionsEl.appendChild(btn);
            });
            const cancelBtn = document.createElement('button');
            cancelBtn.className = 'btn btn-secondary';
            cancelBtn.style.marginTop = '8px';
            cancelBtn.innerText = 'Hủy bỏ';
            cancelBtn.onclick = () => { modal.style.display = 'none'; };
            actionsEl.appendChild(cancelBtn);
        } else {
            const okBtn = document.createElement('button');
            okBtn.className = 'btn btn-primary';
            okBtn.innerText = 'Đã Hiểu';
            okBtn.onclick = () => { modal.style.display = 'none'; };
            actionsEl.appendChild(okBtn);
        }

        modal.style.display = 'flex';
    }

    /**
     * Tính toán lá số và kết xuất giao diện.
     * Áp dụng chống Race Condition thông qua generation token (this.chartGeneration++).
     */
    async calculateAndRender(selectedCandidateIndex = undefined) {
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
        const timeZone = document.getElementById('select-timezone')?.value || 'Asia/Ho_Chi_Minh';
        const calendarMode = document.getElementById('select-calendar')?.value || 'GREGORIAN';
        const nodeType = document.getElementById('select-node-type')?.value || 'MEAN';

        const citySelect = document.getElementById('select-city');
        const locationName = citySelect && citySelect.value !== 'custom' ? citySelect.value : 'Tọa độ tùy chỉnh';

        // Tăng generation token để phòng chống triệt để race condition
        this.chartGeneration = (this.chartGeneration || 0) + 1;
        const currentGen = this.chartGeneration;

        // Phân giải giờ dân dụng và kiểm tra DST
        const res = resolveWallTimeToUtc({
            year, month, day, hour, minute, second, timeZone
        });

        if (res.status === 'NON_EXISTENT_TIME') {
            this.showDstModal({
                title: 'Giờ Không Tồn Tại (DST Gap)',
                message: 'Giờ này không tồn tại tại địa điểm đã chọn do chuyển giờ DST. Vui lòng chọn một mốc giờ khác.',
                type: 'error'
            });
            return;
        }

        if (res.status === 'AMBIGUOUS_TIME' && selectedCandidateIndex === undefined) {
            this.showDstModal({
                title: 'Thời Điểm Trùng Lặp (DST Fold)',
                message: `Thời điểm ${hour}:${String(minute).padStart(2, '0')} xuất hiện hai lần do vặn lùi đồng hồ. Vui lòng chọn một thời điểm cụ thể:`,
                candidates: res.candidates,
                type: 'choice',
                onSelect: (idx) => {
                    this.calculateAndRender(idx);
                }
            });
            return;
        }

        let chosenUtcInstant = null;
        if (res.status === 'AMBIGUOUS_TIME') {
            chosenUtcInstant = res.candidates[selectedCandidateIndex].utcInstant;
        } else {
            chosenUtcInstant = res.utcInstant;
        }

        try {
            // 1. Tính toán thiên văn & Hệ nhà Regiomontanus chuẩn
            const chart = await calculateHoraryChart({
                year, month, day, hour, minute, second,
                latitude, longitude, timeZone,
                utcInstant: chosenUtcInstant,
                locationName, calendarMode, nodeType
            });

            if (currentGen !== this.chartGeneration) return;
            this.currentChart = chart;

            // 2. Tính phẩm giá bản chất cho các hành tinh
            for (const p of this.currentChart.planets) {
                p.dignity = calculateEssentialDignities(p.id, p.longitude, this.currentChart.isDayChart);
            }

            // 3. Quét nhanh các góc chiếu tức thời tại t0 để vẽ aspect lines
            this.currentAspects = scanAllAspects(this.currentChart.planets);

            // 4. Quét các cặp tiếp nhận
            this.currentReceptions = scanAllReceptions(this.currentChart.planets, this.currentChart.isDayChart, this.currentAspects);

            // 5. Kết xuất SVG trực tiếp vào DOM chính
            await this.renderer.render(this.currentChart, this.currentAspects);
            this.renderDetailedReading();

            // 6. Tách solver nặng chạy nền không chặn luồng chính
            scanAllAspectsTimeline(this.currentChart.planets, this.currentChart.julianDayUT, { inOrbOnly: true })
                .then(timelineAspects => {
                    if (currentGen !== this.chartGeneration) return;
                    this.currentAspects = timelineAspects;
                    this.renderAspectsSection();
                })
                .catch(err => {
                    console.warn('Lỗi giải timeline tương lai:', err);
                });
        } catch (errChart) {
            console.error('Lỗi tính toán lá số:', errChart);
            alert('Lỗi tính toán lá số: ' + errChart.message);
        }
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
                <div class="info-item"><span class="lbl">Hệ thống nhà:</span> <strong>Regiomontanus — cấu hình truyền thống William Lilly</strong></div>
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

        const signRulers = {
            aries: 'mars', taurus: 'venus', gemini: 'mercury', cancer: 'moon',
            leo: 'sun', virgo: 'mercury', libra: 'venus', scorpio: 'mars',
            sagittarius: 'jupiter', capricorn: 'saturn', aquarius: 'saturn', pisces: 'jupiter'
        };

        for (let i = 0; i < 12; i++) {
            const houseNum = i + 1;
            const cuspLon = cusps[i];
            const dms = formatZodiacLongitude(cuspLon);
            const signId = dms.signId;
            const cuspFormatted = dms.formatted;

            const rulerId = signRulers[signId];
            const rulerPlanet = this.currentChart.planets.find(p => p.id === rulerId);

            const isAngular = [1, 4, 7, 10].includes(houseNum);
            const rowClass = isAngular ? 'row-angular' : '';

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
                        <strong>${cuspFormatted}</strong> ${dms.signNameVi}
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
            calendarMode: c.calendarMode,
            timeZone: c.timeZone,
            ephemerisSource: c.ephemerisSource,
            localTime: c.localTimeFormatted,
            utcOffset: c.utcOffsetFormatted,
            coordinates: c.location,
            sunAltitude: c.sunAltitude,
            isDayChart: c.isDayChart,
            houses: c.houses,
            partOfFortune: c.partOfFortune,
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
