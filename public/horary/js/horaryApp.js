/**
 * horaryApp.js - Bộ Điều Phối Chính Ứng Dụng Horary Astrology
 * Kết nối Form nhập liệu, Lõi Thiên Văn, Lõi Quy Tắc Lilly,
 * Trình vẽ SVG 1200x1200px và Bản diễn giải tự động cho người mới.
 */

import { calculateHoraryChart } from './ephemerisEngine.js';
import { calculateEssentialDignities, getWhyDignityExplanation } from './traditionalDignities.js';
import { scanAllAspects } from './aspectEngine.js';
import { scanAllReceptions } from './receptionEngine.js';
import { generateHouseExplanation } from './houseMeanings.js';
import { HoraryChartRenderer } from './horaryChartRenderer.js';
import { renderGlyphSvg } from './svgGlyphs.js';

class HoraryApp {
    constructor() {
        this.renderer = null;
        this.currentChart = null;
        this.currentAspects = [];
        this.currentReceptions = [];
        this.beginnerMode = false;
        this.presetLocations = [
            { name: 'Hà Nội', lat: 21.0285, lon: 105.8542, offset: 7 },
            { name: 'TP. Hồ Chí Minh', lat: 10.8231, lon: 106.6297, offset: 7 },
            { name: 'Đà Nẵng', lat: 16.0544, lon: 108.2022, offset: 7 },
            { name: 'Hải Phòng', lat: 20.8449, lon: 106.6881, offset: 7 },
            { name: 'Cần Thơ', lat: 10.0452, lon: 105.7469, offset: 7 },
            { name: 'Nha Trang', lat: 12.2388, lon: 109.1967, offset: 7 },
            { name: 'Huế', lat: 16.4637, lon: 107.5909, offset: 7 },
            { name: 'Tokyo', lat: 35.6762, lon: 139.6503, offset: 9 },
            { name: 'London', lat: 51.5074, lon: -0.1278, offset: 0 },
            { name: 'New York', lat: 40.7128, lon: -74.0060, offset: -5 }
        ];
    }

    init() {
        this.renderer = new HoraryChartRenderer('horary-chart-container', {
            width: 1200,
            height: 1200,
            bgColor: '#e7e8e2',
            cardBgColor: '#f5f6f0'
        });

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

        // Chọn Thành Phố Nhanh
        const selectCity = document.getElementById('select-city');
        if (selectCity) {
            selectCity.addEventListener('change', (e) => {
                const city = this.presetLocations.find(c => c.name === e.target.value);
                if (city) {
                    document.getElementById('input-lat').value = city.lat;
                    document.getElementById('input-lon').value = city.lon;
                    document.getElementById('input-offset').value = city.offset;
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
                    alert('Trình duyệt không hỗ trợ Geolocation');
                }
            });
        }

        // Nút Bật/Tắt Chế Độ Người Mới
        const btnBeginner = document.getElementById('btn-beginner-mode');
        if (btnBeginner) {
            btnBeginner.addEventListener('click', () => {
                this.beginnerMode = !this.beginnerMode;
                btnBeginner.classList.toggle('active', this.beginnerMode);
                btnBeginner.innerText = this.beginnerMode ? 'Đang bật: Chế độ người mới' : 'Bật chế độ người mới';
                this.renderDetailedReading();
            });
        }

        // Nút Ẩn/Hiện Aspect Lines
        const btnToggleAspect = document.getElementById('btn-toggle-aspects');
        if (btnToggleAspect) {
            btnToggleAspect.addEventListener('click', () => {
                const showing = this.renderer.toggleAspectLines();
                btnToggleAspect.classList.toggle('active', showing);
                btnToggleAspect.innerText = showing ? 'Ẩn đường góc chiếu' : 'Hiện đường góc chiếu';
            });
        }

        // Nút Xuất Ảnh PNG
        const btnExportPng = document.getElementById('btn-export-png');
        if (btnExportPng) {
            btnExportPng.addEventListener('click', async () => {
                try {
                    btnExportPng.innerText = 'Đang kết xuất...';
                    btnExportPng.disabled = true;
                    await this.renderer.exportToPng(1);
                } catch (e) {
                    alert('Lỗi xuất ảnh: ' + e.message);
                } finally {
                    btnExportPng.innerText = 'Tải ảnh lá số PNG';
                    btnExportPng.disabled = false;
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

        // 1. Tính toán thiên văn & Hệ nhà Regiomontanus
        this.currentChart = await calculateHoraryChart({
            year, month, day, hour, minute, second,
            latitude, longitude, utcOffset, locationName
        });

        // 2. Tính phẩm giá bản chất cho các hành tinh
        for (const p of this.currentChart.planets) {
            p.dignity = calculateEssentialDignities(p.id, p.longitude, this.currentChart.isDayChart);
        }

        // 3. Quét các góc chiếu (Aspects)
        this.currentAspects = scanAllAspects(this.currentChart.planets);

        // 4. Quét các cặp tiếp nhận (Receptions)
        this.currentReceptions = scanAllReceptions(this.currentChart.planets, this.currentChart.isDayChart);

        // 5. Vẽ lá số bằng SVG
        this.renderer.render(this.currentChart, this.currentAspects);

        // 6. Hiển thị báo cáo diễn giải bên dưới
        this.renderDetailedReading();
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
                <div class="info-item"><span class="lbl">Loại lá số:</span> <strong>${c.isDayChart ? 'Ban Ngày (Day Chart)' : 'Ban Đêm (Night Chart)'}</strong></div>
                <div class="info-item"><span class="lbl">Nguồn Ephemeris:</span> <strong class="badge-source">${c.ephemerisSource}</strong></div>
            </div>
        `;
    }

    renderHousesSection() {
        const container = document.getElementById('houses-table-container');
        if (!container) return;

        const cusps = this.currentChart.houses.cusps;
        let html = `
            <div class="reading-card">
                <h3>BẢNG 12 NHÀ & VAI TRÒ CHỦ TINH ĐẠI DIỆN</h3>
                <p class="section-desc">Cung nằm trên đỉnh mỗi nhà quyết định hành tinh chủ quản. Đây là tác nhân chính biểu thị các vai trò trong câu hỏi.</p>
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
            const cuspFormatted = `${deg}°${String(min).padStart(2, '0')}′`;

            const signList = ['Bạch Dương', 'Kim Ngưu', 'Song Tử', 'Cự Giải', 'Sư Tử', 'Xử Nữ', 'Thiên Bình', 'Bọ Cạp', 'Nhân Mã', 'Ma Kết', 'Bảo Bình', 'Song Ngư'];
            const signKeys = ['aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo', 'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces'];
            const rulers = ['Hỏa Tinh', 'Kim Tinh', 'Thủy Tinh', 'Mặt Trăng', 'Mặt Trời', 'Thủy Tinh', 'Kim Tinh', 'Hỏa Tinh', 'Mộc Tinh', 'Thổ Tinh', 'Thổ Tinh', 'Mộc Tinh'];
            const rulerKeys = ['mars', 'venus', 'mercury', 'moon', 'sun', 'mercury', 'venus', 'mars', 'jupiter', 'saturn', 'saturn', 'jupiter'];

            const signName = signList[signIdx];
            const rulerName = rulers[signIdx];
            const signKey = signKeys[signIdx];
            const rulerKey = rulerKeys[signIdx];

            const exp = generateHouseExplanation(houseNum, signName, rulerName, cuspFormatted);

            const isAngular = [1, 4, 7, 10].includes(houseNum);
            const rowClass = isAngular ? 'row-angular' : '';

            html += `
                <tr class="${rowClass}">
                    <td class="text-center font-bold">Nhà ${houseNum} ${isAngular ? '<span class="angular-tag">Trục</span>' : ''}</td>
                    <td>${renderGlyphSvg(signKey, 16)} <strong>${cuspFormatted}</strong> ${signName}</td>
                    <td>${renderGlyphSvg(rulerKey, 16)} <strong>${rulerName}</strong></td>
                    <td>
                        <div class="house-explanation-box">
                            <div class="house-sentence">${exp.sentence}</div>
                            <div class="house-subinfo"><em>Từ khóa:</em> ${exp.keyword}</div>
                        </div>
                    </td>
                </tr>
            `;
        }

        html += `</tbody></table></div></div>`;
        container.innerHTML = html;
    }

    renderPlanetsSection() {
        const container = document.getElementById('planets-table-container');
        if (!container) return;

        let html = `
            <div class="reading-card">
                <h3>BẢNG HÀNH TINH, VẬN TỐC & PHẨM GIÁ BẢN CHẤT (LILLY CA p.104)</h3>
                <p class="section-desc">Phẩm giá cho biết thực lực nội tại của tác nhân (vững mạnh hay suy nhược). Trạng thái chuyển động cho biết khả năng hành động.</p>
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

            html += `
                <tr>
                    <td>${planetDisplay}</td>
                    <td>${signDisplay}</td>
                    <td class="text-center"><strong>Nhà ${p.houseNumber}</strong></td>
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

        html += `</tbody></table></div></div>`;
        container.innerHTML = html;
    }

    renderAspectsSection() {
        const container = document.getElementById('aspects-table-container');
        if (!container) return;

        if (this.currentAspects.length === 0) {
            container.innerHTML = `
                <div class="reading-card">
                    <h3>BẢNG GÓC CHIẾU (ASPECTS) & CHUYỂN ĐỘNG THỰC</h3>
                    <p>Không có góc chiếu Ptolemaic nào nằm trong phạm vi Orb cho phép.</p>
                </div>`;
            return;
        }

        let html = `
            <div class="reading-card">
                <h3>BẢNG GÓC CHIẾU (ASPECTS) & ĐỘNG HỌC TIẾN TỚI / RỜI XA</h3>
                <p class="section-desc">Trong Horary, chỉ những góc <strong>Đang tiến tới (Applying)</strong> mới biểu thị sự việc sẽ xảy ra trong tương lai. Góc <strong>Đã rời xa (Separating)</strong> biểu thị việc đã qua.</p>
                <div class="table-responsive">
                    <table class="horary-table">
                        <thead>
                            <tr>
                                <th>Hành Tinh A</th>
                                <th>Góc Chiếu</th>
                                <th>Hành Tinh B</th>
                                <th>Sai Số (Orb)</th>
                                <th>Trạng Thái</th>
                                <th>Bảng Chuyển Động Kiểm Chứng (-6h → Hiện tại → +6h)</th>
                                <th>Dự Báo Perfection</th>
                            </tr>
                        </thead>
                        <tbody>
        `;

        for (const asp of this.currentAspects) {
            const stateClass = `badge-${asp.stateClass}`;
            const motionStr = asp.motionSteps.map(m => `<span>${m.label}: <strong>${m.separation}</strong></span>`).join(' → ');

            html += `
                <tr>
                    <td>${renderGlyphSvg(asp.planetA.glyphKey, 16)} <strong>${asp.planetA.nameVi}</strong></td>
                    <td class="text-center font-bold">
                        ${renderGlyphSvg(asp.aspectGlyphKey, 18)} ${asp.aspectNameVi} (${asp.aspectAngle}°)
                    </td>
                    <td>${renderGlyphSvg(asp.planetB.glyphKey, 16)} <strong>${asp.planetB.nameVi}</strong></td>
                    <td><strong>${asp.orbFormatted}</strong></td>
                    <td>
                        <span class="badge ${stateClass}">${asp.stateVi}</span>
                        <div class="aspect-hint">${asp.explanation}</div>
                    </td>
                    <td>
                        <div class="motion-steps-box">${motionStr}</div>
                    </td>
                    <td>
                        ${asp.perfectionInfo ? `<span class="badge-perfection">${asp.perfectionInfo.description}</span>` : '<em>Đã qua đỉnh</em>'}
                    </td>
                </tr>
            `;
        }

        html += `</tbody></table></div></div>`;
        container.innerHTML = html;
    }

    renderReceptionsSection() {
        const container = document.getElementById('receptions-table-container');
        if (!container) return;

        if (this.currentReceptions.length === 0) {
            container.innerHTML = `
                <div class="reading-card">
                    <h3>BẢNG TIẾP NHẬN (RECEPTION) HAI CHIỀU</h3>
                    <p>Hiện không có tiếp nhận đáng kể nào giữa các hành tinh chính.</p>
                </div>`;
            return;
        }

        let html = `
            <div class="reading-card">
                <h3>BẢNG TIẾP NHẬN (RECEPTION) HAI CHIỀU ĐỘC LẬP</h3>
                <p class="section-desc">Tiếp nhận cho biết sự hiếu khách, đồng thuận và thiện chí giữa hai phía. Nếu có <strong>Tiếp nhận tương hỗ (Mutual Reception)</strong>, hai bên hỗ trợ nhau tối đa.</p>
                <div class="reception-cards-grid">
        `;

        for (const pair of this.currentReceptions) {
            const mutualTag = pair.hasMutual ? `<span class="badge-mutual">★ TIẾP NHẬN LẪN NHAU (MUTUAL RECEPTION)</span>` : '';

            html += `
                <div class="reception-card ${pair.hasMutual ? 'mutual-card' : ''}">
                    <div class="reception-header">
                        <h4>Cặp: ${getPlanetNameVi(pair.planetAId)} & ${getPlanetNameVi(pair.planetBId)} ${mutualTag}</h4>
                    </div>
                    <div class="reception-body">
                        ${pair.aReceivesB ? `
                            <div class="reception-dir">
                                <strong>${pair.aReceivesB.hostNameVi} tiếp nhận ${pair.aReceivesB.guestNameVi}:</strong>
                                <ul>${pair.aReceivesB.receptionTypes.map(r => `<li><strong>${r.nameVi}</strong>: ${r.explanation}</li>`).join('')}</ul>
                            </div>
                        ` : `<div class="reception-dir text-muted">${getPlanetNameVi(pair.planetAId)} không tiếp nhận ${getPlanetNameVi(pair.planetBId)}.</div>`}

                        ${pair.bReceivesA ? `
                            <div class="reception-dir">
                                <strong>${pair.bReceivesA.hostNameVi} tiếp nhận ${pair.bReceivesA.guestNameVi}:</strong>
                                <ul>${pair.bReceivesA.receptionTypes.map(r => `<li><strong>${r.nameVi}</strong>: ${r.explanation}</li>`).join('')}</ul>
                            </div>
                        ` : `<div class="reception-dir text-muted">${getPlanetNameVi(pair.planetBId)} không tiếp nhận ${getPlanetNameVi(pair.planetAId)}.</div>`}

                        ${pair.hasMutual ? `<div class="mutual-note">${pair.mutualDescription}</div>` : ''}
                    </div>
                </div>
            `;
        }

        html += `</div></div>`;
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
                house: p.houseNumber
            }))
        }, null, 2);

        container.innerHTML = `
            <details class="raw-data-details">
                <summary><strong>DỮ LIỆU THIÊN VĂN GỐC (ASTRONOMICAL RAW DATA)</strong> — Xem minh bạch tọa độ số thực, JD và đỉnh nhà</summary>
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
window.addEventListener('DOMContentLoaded', () => {
    window.horaryAppInstance = new HoraryApp();
    window.horaryAppInstance.init();
});
