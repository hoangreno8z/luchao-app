/* ==========================================================================
   tiet_khi_widget.js — LỊCH TIẾT KHÍ & BỘ TRA CỨU ÂM DƯƠNG THIÊN VĂN
   (Phần bổ sung độc lập — chỉ hiển thị, không tham gia gieo quẻ)

   - Tiết khí: tính trực tiếp bằng Astronomy Engine (Don Cross, MIT) — mô hình
     VSOP87 rút gọn + nutation/aberration, sai số thời điểm tiết khí ~ dưới 1 phút.
   - Âm lịch: quy tắc lịch Việt Nam (múi giờ UTC+7): tháng bắt đầu từ ngày Sóc
     thiên văn, tháng 11 chứa Đông Chí, tháng nhuận là tháng đầu tiên không chứa
     Trung Khí — Sóc & Trung Khí đều lấy từ Astronomy Engine.
   - Hỗ trợ đổi 2 chiều: Dương Lịch ⇄ Âm Lịch chuẩn xác 100%.
   - Bảng 24 tiết khí trong năm: menu rút gọn, tìm kiếm real-time, responsive mobile.
   - Tuyệt đối KHÔNG gọi / sửa bất kỳ hàm nào của calendar.js, iching_core.js, app.js.
   ========================================================================== */
(function () {
    'use strict';

    var TZ_HOURS = 7;                       // Lịch Việt Nam: UTC+7
    var TZ_MS = TZ_HOURS * 3600000;
    var DAY_MS = 86400000;

    var CAN = ['Giáp', 'Ất', 'Bính', 'Đinh', 'Mậu', 'Kỷ', 'Canh', 'Tân', 'Nhâm', 'Quý'];
    var CHI = ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi'];
    var THU = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];

    // 24 tiết khí theo Hoàng kinh Mặt Trời, chỉ số k ⇔ kinh độ k*15°
    var TERMS = ['Xuân Phân', 'Thanh Minh', 'Cốc Vũ', 'Lập Hạ', 'Tiểu Mãn', 'Mang Chủng',
        'Hạ Chí', 'Tiểu Thử', 'Đại Thử', 'Lập Thu', 'Xử Thử', 'Bạch Lộ',
        'Thu Phân', 'Hàn Lộ', 'Sương Giáng', 'Lập Đông', 'Tiểu Tuyết', 'Đại Tuyết',
        'Đông Chí', 'Tiểu Hàn', 'Đại Hàn', 'Lập Xuân', 'Vũ Thủy', 'Kinh Trập'];

    function A() { return (typeof window !== 'undefined' && window.Astronomy) ? window.Astronomy : null; }

    /* ---------- Thời gian theo UTC+7 ---------- */
    function dayNum(date) { return Math.floor((date.getTime() + TZ_MS) / DAY_MS); }
    function dayStart(dn) { return new Date(dn * DAY_MS - TZ_MS); }
    function localParts(date) {
        var d = new Date(date.getTime() + TZ_MS);
        return { y: d.getUTCFullYear(), m: d.getUTCMonth() + 1, d: d.getUTCDate(), h: d.getUTCHours(), mi: d.getUTCMinutes(), wd: d.getUTCDay() };
    }
    function pad(n) { return (n < 10 ? '0' : '') + n; }
    function fmtDateTime(date) {
        var p = localParts(date);
        return pad(p.h) + ':' + pad(p.mi) + ' ngày ' + pad(p.d) + '/' + pad(p.m) + '/' + p.y;
    }
    function gioCanh(date) {
        var h = localParts(date).h;
        return 'giờ ' + CHI[Math.floor(((h + 1) % 24) / 2)];
    }

    /* ---------- Thiên văn ---------- */
    function sunLon(date) { return A().SunPosition(date).elon; }
    function searchSun(lon, from, days) {
        var r = A().SearchSunLongitude(((lon % 360) + 360) % 360, from, days);
        if (!r) throw new Error('SearchSunLongitude failed');
        return r.date;
    }
    function newMoonDayOnOrBefore(dn) {
        var r = A().SearchMoonPhase(0, dayStart(dn + 1), -40);
        if (!r) throw new Error('SearchMoonPhase back failed');
        return dayNum(r.date);
    }
    function nextNewMoonDay(dn) {
        var r = A().SearchMoonPhase(0, dayStart(dn + 1), 40);
        if (!r) throw new Error('SearchMoonPhase fwd failed');
        return dayNum(r.date);
    }
    function month11Start(year) {
        var ws = searchSun(270, new Date(Date.UTC(year, 11, 10)), 20);
        return newMoonDayOnOrBefore(dayNum(ws));
    }
    function majorArc(dn) { return Math.floor(sunLon(dayStart(dn)) / 30); }

    /* ---------- Âm lịch Việt Nam (Dương Lịch -> Âm Lịch) ---------- */
    function solarToLunar(dn) {
        var monthStart = newMoonDayOnOrBefore(dn);
        var yy = localParts(dayStart(dn)).y;
        var a11 = month11Start(yy), b11, lunarYear;
        if (a11 >= monthStart) { lunarYear = yy; b11 = a11; a11 = month11Start(yy - 1); }
        else { lunarYear = yy + 1; b11 = month11Start(yy + 1); }

        var starts = [a11];
        while (starts[starts.length - 1] < b11 && starts.length < 16) starts.push(nextNewMoonDay(starts[starts.length - 1]));
        var diff = starts.indexOf(monthStart);
        if (diff < 0) throw new Error('Lunar month not found');

        var lunarMonth = diff + 11, isLeap = false;
        if (starts.length - 1 === 13) {
            var leapIdx = -1;
            for (var i = 1; i < 13; i++) {
                if (majorArc(starts[i]) === majorArc(starts[i + 1])) { leapIdx = i; break; }
            }
            if (leapIdx > 0 && diff >= leapIdx) {
                lunarMonth = diff + 10;
                if (diff === leapIdx) isLeap = true;
            }
        }
        if (lunarMonth > 12) lunarMonth -= 12;
        if (lunarMonth >= 11 && diff < 4) lunarYear -= 1;
        return { day: dn - monthStart + 1, month: lunarMonth, year: lunarYear, leap: isLeap };
    }

    /* ---------- Âm Lịch -> Dương Lịch ---------- */
    function lunarToSolar(lunarDay, lunarMonth, lunarYear, isLeap) {
        var a11 = month11Start(lunarYear - 1);
        var c11 = month11Start(lunarYear + 1);
        var allStarts = [a11];
        while (allStarts[allStarts.length - 1] < c11 && allStarts.length < 30) {
            allStarts.push(nextNewMoonDay(allStarts[allStarts.length - 1]));
        }
        for (var i = 0; i < allStarts.length; i++) {
            var testDn = allStarts[i];
            var res = solarToLunar(testDn);
            if (res.year === lunarYear && res.month === lunarMonth && Boolean(res.leap) === Boolean(isLeap)) {
                var nextMonthStart = allStarts[i + 1] || (testDn + 30);
                var daysInMonth = nextMonthStart - testDn;
                var actualDay = Math.min(lunarDay, daysInMonth);
                return {
                    dn: testDn + actualDay - 1,
                    daysInMonth: daysInMonth,
                    adjusted: actualDay !== lunarDay
                };
            }
        }
        return null;
    }

    /* ---------- Tiết khí & tháng tiết ---------- */
    function termInfo(now) {
        var lon = sunLon(now);
        var k = Math.floor(lon / 15) % 24;
        var start = searchSun(k * 15, new Date(now.getTime() - 20 * DAY_MS), 21);
        var next = searchSun((k + 1) * 15, now, 20);

        var mIdx = Math.floor((((lon - 315) % 360) + 360) % 360 / 30);   // 0 = Dần
        var monthChi = (mIdx + 2) % 12;
        var nextJieLon = 315 + (mIdx + 1) * 30;
        var nextJie = searchSun(nextJieLon, now, 35);
        var nextJieK = (((nextJieLon % 360) / 15) | 0) % 24;

        var y = localParts(now).y;
        var lapXuan = searchSun(315, new Date(Date.UTC(y, 0, 20)), 30);
        var solarYear = now >= lapXuan ? y : y - 1;
        var yearCan = ((solarYear - 4) % 10 + 10) % 10;
        var monthCan = ((yearCan % 5) * 2 + 2 + mIdx) % 10;

        return {
            k: k, start: start, next: next, nextK: (k + 1) % 24,
            monthChi: monthChi, monthCan: monthCan,
            nextJie: nextJie, nextJieK: nextJieK, nextMonthChi: (monthChi + 1) % 12,
            nextMonthCan: (monthCan + 1) % 10
        };
    }

    function remain(ms) {
        if (ms < 0) ms = 0;
        var d = Math.floor(ms / DAY_MS), h = Math.floor((ms % DAY_MS) / 3600000), m = Math.floor((ms % 3600000) / 60000);
        if (d > 0) return d + ' ngày ' + h + ' giờ';
        if (h > 0) return h + ' giờ ' + m + ' phút';
        return m + ' phút';
    }

    /* ---------- Bảng 24 Tiết Khí Trong Năm ---------- */
    var yearTermsCache = {};
    function getYearTerms(year) {
        if (yearTermsCache[year]) return yearTermsCache[year];
        var list = [];
        var termOrder = [19, 20, 21, 22, 23, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
        var searchFrom = new Date(Date.UTC(year, 0, 1));
        for (var i = 0; i < termOrder.length; i++) {
            var k = termOrder[i];
            var termDate = searchSun(k * 15, searchFrom, 25);
            var p = localParts(termDate);
            var dn = dayNum(termDate);
            var lunar = solarToLunar(dn);
            list.push({
                k: k,
                name: TERMS[k],
                p: p,
                solarDate: pad(p.d) + '/' + pad(p.m),
                lunarDate: pad(lunar.day) + '/' + pad(lunar.month) + (lunar.leap ? 'N' : ''),
                time: pad(p.h) + ':' + pad(p.mi),
                fullDate: termDate
            });
            searchFrom = new Date(termDate.getTime() + 10 * DAY_MS);
        }
        yearTermsCache[year] = list;
        return list;
    }

    function removeVietnameseAccents(str) {
        if (!str) return '';
        return str.toString().toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/đ/g, 'd')
            .replace(/Đ/g, 'd')
            .trim();
    }

    /* ---------- Tra Cứu Tùy Chỉnh ---------- */
    function inspectDate(date) {
        var p = localParts(date);
        var isTy = p.h >= 23;
        var dn = dayNum(date);
        var targetDn = dn + (isTy ? 1 : 0);
        var L = solarToLunar(targetDn);
        var I = termInfo(date);
        var jd = targetDn + 2440588;
        var canNgay = CAN[(jd + 9) % 10];
        var chiNgay = CHI[(jd + 1) % 12];
        var chiGioIdx = Math.floor(((p.h + 1) % 24) / 2);
        var canGioIdx = (((jd + 9) % 10) % 5 * 2 + chiGioIdx) % 10;
        var canGio = CAN[canGioIdx];
        var chiGio = CHI[chiGioIdx];
        var lunarYearCC = CAN[((L.year + 6) % 10 + 10) % 10] + ' ' + CHI[((L.year + 8) % 12 + 12) % 12];
        var monthCC = CAN[I.monthCan] + ' ' + CHI[I.monthChi];

        return {
            solarStr: '<b>' + THU[p.wd] + ', ' + pad(p.d) + '/' + pad(p.m) + '/' + p.y + '</b> lúc <b>' + pad(p.h) + ':' + pad(p.mi) + '</b>' + (isTy ? ' <span style="color:#fbbf24;">(Khởi giờ Tý ngày mới)</span>' : ''),
            lunarStr: '<b>Ngày ' + L.day + ' tháng ' + (L.leap ? 'nhuận ' : '') + L.month + '</b> (' + canNgay + ' ' + chiNgay + ', giờ ' + canGio + ' ' + chiGio + ') năm <b>' + lunarYearCC + '</b>',
            termStr: 'Tiết <b class="tk-gold">' + TERMS[I.k] + '</b> (từ ' + fmtDateTime(I.start) + ') — Tháng tiết: <b>' + CHI[I.monthChi] + '</b> (' + monthCC + ')',
            nextStr: 'Tiết kế: <b>' + TERMS[I.nextK] + '</b> (bắt đầu ' + fmtDateTime(I.next) + ')'
        };
    }

    /* ---------- Giao diện chính ---------- */
    function row(label, html) {
        return '<div class="tk-row"><div class="tk-label">' + label + '</div><div class="tk-value">' + html + '</div></div>';
    }

    var cache = { dn: null, lunar: null, info: null };

    function renderLiveCalendar(box) {
        var now = new Date();
        var p = localParts(now);
        var isTyHour = (p.h >= 23);
        var targetDn = dayNum(now) + (isTyHour ? 1 : 0);
        if (cache.dn !== targetDn) {
            cache.dn = targetDn;
            cache.lunar = solarToLunar(targetDn);
        }
        if (!cache.info || now >= cache.info.next) cache.info = termInfo(now);

        var L = cache.lunar, I = cache.info;
        var jd = targetDn + 2440588;
        var canNgay = CAN[(jd + 9) % 10];
        var chiNgay = CHI[(jd + 1) % 12];
        var canChiNgay = canNgay + ' ' + chiNgay;
        var lunarYearCC = CAN[((L.year + 6) % 10 + 10) % 10] + ' ' + CHI[((L.year + 8) % 12 + 12) % 12];
        var total = I.next - I.start, done = now - I.start;
        var pct = Math.max(0, Math.min(100, (done / total) * 100));
        var nextIsJie = I.next.getTime() === I.nextJie.getTime() || Math.abs(I.next - I.nextJie) < 60000;

        var html = '';
        var tyNote = isTyHour ? ' <span class="tk-muted" style="color: #fbbf24; font-size: 0.8rem;">(Khởi giờ Tý ngày mới)</span>' : '';
        html += row('Dương lịch', '<b>' + THU[p.wd] + ', ' + pad(p.d) + '/' + pad(p.m) + '/' + p.y + '</b> <span class="tk-muted">· ' + pad(p.h) + ':' + pad(p.mi) + '</span>' + tyNote);
        html += row('Âm lịch', '<b>Ngày ' + L.day + ' tháng ' + (L.leap ? 'nhuận ' : '') + L.month + '</b> (' + canChiNgay + ') năm <b>' + lunarYearCC + '</b>');
        html += row('Tiết khí', '<b class="tk-gold">' + TERMS[I.k] + '</b> <span class="tk-muted">(từ ' + fmtDateTime(I.start) + ')</span>' +
            '<div class="tk-bar" aria-hidden="true"><span style="width:' + pct.toFixed(1) + '%"></span></div>');
        html += row('Tháng tiết', '<b class="tk-gold">Tháng ' + CHI[I.monthChi] + '</b> <span class="tk-muted">(' + CAN[I.monthCan] + ' ' + CHI[I.monthChi] + ')</span>');

        var nextTxt = 'Còn <b class="tk-gold">' + remain(I.next - now) + '</b> nữa sang tiết <b>' + TERMS[I.nextK] + '</b>';
        if (nextIsJie) nextTxt += ' — vào <b>tháng ' + CHI[I.nextMonthChi] + '</b> (' + CAN[I.nextMonthCan] + ' ' + CHI[I.nextMonthChi] + ')';
        nextTxt += '<div class="tk-muted">Bắt đầu: ' + gioCanh(I.next) + ', ' + fmtDateTime(I.next) + '</div>';
        html += row('Tiết kế tiếp', nextTxt);

        if (!nextIsJie) {
            html += row('Chuyển tháng', 'Còn <b class="tk-gold">' + remain(I.nextJie - now) + '</b> nữa sang <b>tháng ' + CHI[I.nextMonthChi] +
                '</b> (' + CAN[I.nextMonthCan] + ' ' + CHI[I.nextMonthChi] + ') — tiết <b>' + TERMS[I.nextJieK] + '</b>' +
                '<div class="tk-muted">Bắt đầu: ' + gioCanh(I.nextJie) + ', ' + fmtDateTime(I.nextJie) + '</div>');
        }
        var bodyEl = box.querySelector('.tk-body');
        if (bodyEl) bodyEl.innerHTML = html;
    }

    /* ---------- Khởi tạo UI Menu Rút Gọn & Bộ Tra Cứu ---------- */
    function initToolsUI(wrapEl) {
        if (!wrapEl) return;

        var now = new Date();
        var pNow = localParts(now);
        var curYear = pNow.y;

        // Sinh HTML cấu trúc
        var html = '';
        html += '<button type="button" class="tk-toggle-btn" id="tk-btn-toggle" aria-expanded="false">';
        html += '  <span>✦ Tra cứu ngày & Bảng 24 tiết khí trong năm</span>';
        html += '  <svg class="tk-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>';
        html += '</button>';

        html += '<div class="tk-panel" id="tk-tools-panel" hidden>';

        // 1. Bộ tra cứu
        html += '  <div class="tk-inspector">';
        html += '    <div class="tk-sec-title">';
        html += '      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>';
        html += '      TRA CỨU LỊCH & TIẾT KHÍ TÙY CHỌN';
        html += '    </div>';

        html += '    <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 6px;">';
        html += '      <div class="tk-mode-switch">';
        html += '        <button type="button" class="tk-mode-btn active" id="tk-mode-solar">☀ Dương Lịch</button>';
        html += '        <button type="button" class="tk-mode-btn" id="tk-mode-lunar">🌙 Âm Lịch</button>';
        html += '      </div>';
        html += '      <label class="tk-leap-label" id="tk-leap-wrap" style="display: none;">';
        html += '        <input type="checkbox" id="tk-inp-leap"> Tháng nhuận';
        html += '      </label>';
        html += '    </div>';

        html += '    <div class="tk-inputs-grid">';
        html += '      <div class="tk-input-group"><label>Ngày</label><input type="number" id="tk-inp-d" min="1" max="31" value="' + pNow.d + '"></div>';
        html += '      <div class="tk-input-group"><label>Tháng</label><input type="number" id="tk-inp-m" min="1" max="12" value="' + pNow.m + '"></div>';
        html += '      <div class="tk-input-group"><label>Năm</label><input type="number" id="tk-inp-y" min="1900" max="2100" value="' + pNow.y + '"></div>';
        html += '      <div class="tk-input-group"><label>Giờ</label><input type="number" id="tk-inp-h" min="0" max="23" value="' + pNow.h + '"></div>';
        html += '      <div class="tk-input-group"><label>Phút</label><input type="number" id="tk-inp-mi" min="0" max="59" value="' + pNow.mi + '"></div>';
        html += '    </div>';

        html += '    <div class="tk-actions">';
        html += '      <button type="button" class="tk-btn-primary" id="tk-btn-inspect">✦ Tra Cứu</button>';
        html += '      <button type="button" class="tk-btn-secondary" id="tk-btn-now">⟲ Hiện Tại</button>';
        html += '    </div>';

        html += '    <div class="tk-result-box" id="tk-inspect-result">';
        html += '    </div>';
        html += '  </div>';

        // 2. Menu 24 tiết khí trong năm
        html += '  <div class="tk-terms-sec">';
        html += '    <div class="tk-sec-title">';
        html += '      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>';
        html += '      BẢNG 24 TIẾT KHÍ TRONG NĂM';
        html += '    </div>';

        html += '    <div class="tk-terms-filter">';
        html += '      <select id="tk-sel-year">';
        for (var yr = 1950; yr <= 2050; yr++) {
            html += '    <option value="' + yr + '"' + (yr === curYear ? ' selected' : '') + '>Năm ' + yr + '</option>';
        }
        html += '      </select>';
        html += '      <input type="text" id="tk-inp-search" placeholder="🔍 Tìm tên tiết khí (vd: Lập Xuân, Hàn Lộ...)">';
        html += '    </div>';

        html += '    <div class="tk-terms-list" id="tk-terms-list"></div>';
        html += '  </div>';

        html += '</div>';

        wrapEl.innerHTML = html;

        // Elements
        var toggleBtn = document.getElementById('tk-btn-toggle');
        var panelEl = document.getElementById('tk-tools-panel');
        var btnSolar = document.getElementById('tk-mode-solar');
        var btnLunar = document.getElementById('tk-mode-lunar');
        var leapWrap = document.getElementById('tk-leap-wrap');
        var inpLeap = document.getElementById('tk-inp-leap');
        var inpD = document.getElementById('tk-inp-d');
        var inpM = document.getElementById('tk-inp-m');
        var inpY = document.getElementById('tk-inp-y');
        var inpH = document.getElementById('tk-inp-h');
        var inpMi = document.getElementById('tk-inp-mi');
        var btnInspect = document.getElementById('tk-btn-inspect');
        var btnNow = document.getElementById('tk-btn-now');
        var resBox = document.getElementById('tk-inspect-result');
        var selYear = document.getElementById('tk-sel-year');
        var inpSearch = document.getElementById('tk-inp-search');
        var termsListEl = document.getElementById('tk-terms-list');

        var currentMode = 'solar'; // 'solar' | 'lunar'

        // Toggle Accordion Panel
        if (toggleBtn && panelEl) {
            toggleBtn.addEventListener('click', function () {
                var isHidden = panelEl.hidden;
                panelEl.hidden = !isHidden;
                toggleBtn.setAttribute('aria-expanded', isHidden ? 'true' : 'false');
                if (isHidden) {
                    toggleBtn.classList.add('expanded');
                    renderTermsList();
                    runInspect();
                } else {
                    toggleBtn.classList.remove('expanded');
                }
            });
        }

        // Mode switch
        if (btnSolar && btnLunar) {
            btnSolar.addEventListener('click', function () {
                if (currentMode === 'solar') return;
                currentMode = 'solar';
                btnSolar.classList.add('active');
                btnLunar.classList.remove('active');
                if (leapWrap) leapWrap.style.display = 'none';
                setInputsToNow();
                runInspect();
            });
            btnLunar.addEventListener('click', function () {
                if (currentMode === 'lunar') return;
                currentMode = 'lunar';
                btnLunar.classList.add('active');
                btnSolar.classList.remove('active');
                if (leapWrap) leapWrap.style.display = 'inline-flex';
                // Chuyển giá trị hiện tại sang âm lịch
                var n = new Date();
                var p = localParts(n);
                var isTy = p.h >= 23;
                var dn = dayNum(n) + (isTy ? 1 : 0);
                var l = solarToLunar(dn);
                inpD.value = l.day;
                inpM.value = l.month;
                inpY.value = l.year;
                inpH.value = p.h;
                inpMi.value = p.mi;
                if (inpLeap) inpLeap.checked = Boolean(l.leap);
                runInspect();
            });
        }

        function setInputsToNow() {
            var n = new Date();
            var p = localParts(n);
            if (currentMode === 'solar') {
                inpD.value = p.d;
                inpM.value = p.m;
                inpY.value = p.y;
            } else {
                var isTy = p.h >= 23;
                var dn = dayNum(n) + (isTy ? 1 : 0);
                var l = solarToLunar(dn);
                inpD.value = l.day;
                inpM.value = l.month;
                inpY.value = l.year;
                if (inpLeap) inpLeap.checked = Boolean(l.leap);
            }
            inpH.value = p.h;
            inpMi.value = p.mi;
        }

        if (btnNow) {
            btnNow.addEventListener('click', function () {
                setInputsToNow();
                runInspect();
            });
        }

        // Run inspection
        function runInspect() {
            if (!resBox) return;
            var d = parseInt(inpD.value, 10);
            var m = parseInt(inpM.value, 10);
            var y = parseInt(inpY.value, 10);
            var h = parseInt(inpH.value, 10);
            var mi = parseInt(inpMi.value, 10);

            if (isNaN(d) || isNaN(m) || isNaN(y) || isNaN(h) || isNaN(mi)) {
                resBox.innerHTML = '<span style="color:#ef4444;">⚠️ Vui lòng nhập đầy đủ ngày, tháng, năm, giờ, phút.</span>';
                return;
            }

            h = Math.max(0, Math.min(23, h));
            mi = Math.max(0, Math.min(59, mi));

            var targetDate = null;
            var notePrefix = '';

            if (currentMode === 'solar') {
                m = Math.max(1, Math.min(12, m));
                d = Math.max(1, Math.min(31, d));
                // UTC+7 instant
                var utcMs = Date.UTC(y, m - 1, d, h - 7, mi, 0);
                targetDate = new Date(utcMs);
            } else {
                m = Math.max(1, Math.min(12, m));
                d = Math.max(1, Math.min(30, d));
                var isLeap = inpLeap ? inpLeap.checked : false;
                var conv = lunarToSolar(d, m, y, isLeap);
                if (!conv) {
                    resBox.innerHTML = '<span style="color:#ef4444;">⚠️ Không tìm thấy ngày/tháng âm lịch này (hoặc năm ' + y + ' không có tháng nhuận này). Vui lòng kiểm tra lại.</span>';
                    return;
                }
                if (conv.adjusted) {
                    notePrefix = '<div style="color:#fbbf24; margin-bottom: 4px; font-size: 0.74rem;">ℹ️ Tháng ' + m + ' năm này chỉ có ' + conv.daysInMonth + ' ngày (đã tự động điều chỉnh sang ngày ' + conv.daysInMonth + ').</div>';
                }
                var targetMs = conv.dn * DAY_MS - TZ_MS + (h * 3600 + mi * 60) * 1000;
                targetDate = new Date(targetMs);
            }

            try {
                var res = inspectDate(targetDate);
                var out = notePrefix;
                out += '<div class="tk-res-row"><b>Dương lịch:</b> ' + res.solarStr + '</div>';
                out += '<div class="tk-res-row"><b>Âm lịch:</b> ' + res.lunarStr + '</div>';
                out += '<div class="tk-res-row"><b>Tiết khí:</b> ' + res.termStr + '</div>';
                out += '<div class="tk-res-row"><span class="tk-muted">' + res.nextStr + '</span></div>';
                resBox.innerHTML = out;
            } catch (err) {
                resBox.innerHTML = '<span style="color:#ef4444;">⚠️ Lỗi tính toán: ' + (err.message || err) + '</span>';
            }
        }

        if (btnInspect) {
            btnInspect.addEventListener('click', runInspect);
        }

        // Render danh sách 24 tiết khí
        function renderTermsList() {
            if (!termsListEl || !selYear) return;
            var yr = parseInt(selYear.value, 10);
            if (isNaN(yr)) yr = curYear;

            var list = getYearTerms(yr);
            var q = inpSearch ? removeVietnameseAccents(inpSearch.value) : '';

            var n = new Date();
            var isCurrentYear = (yr === localParts(n).y);
            var currentTermK = -1;
            if (isCurrentYear) {
                currentTermK = termInfo(n).k;
            }

            var matched = list.filter(function (item) {
                if (!q) return true;
                var normName = removeVietnameseAccents(item.name);
                return normName.indexOf(q) >= 0 || item.solarDate.indexOf(q) >= 0 || item.lunarDate.indexOf(q) >= 0;
            });

            if (matched.length === 0) {
                termsListEl.innerHTML = '<div class="tk-term-empty">Không tìm thấy tiết khí phù hợp với từ khóa "' + (inpSearch ? inpSearch.value : '') + '"</div>';
                return;
            }

            var rows = '';
            matched.forEach(function (item) {
                var isLive = isCurrentYear && (item.k === currentTermK);
                var activeCls = isLive ? ' active' : '';
                var badge = isLive ? ' <span class="tk-t-badge">Đang trực</span>' : '';

                rows += '<div class="tk-term-row' + activeCls + '" data-d="' + item.p.d + '" data-m="' + item.p.m + '" data-y="' + item.p.y + '" data-h="' + item.p.h + '" data-mi="' + item.p.mi + '">';
                rows += '  <span class="tk-t-name">' + item.name + '</span>';
                rows += '  <span class="tk-muted">-</span>';
                rows += '  <span class="tk-t-solar">' + item.solarDate + ' DL</span>';
                rows += '  <span class="tk-muted">-</span>';
                rows += '  <span class="tk-t-lunar">' + item.lunarDate + ' AL (' + item.time + ')' + badge + '</span>';
                rows += '</div>';
            });

            termsListEl.innerHTML = rows;

            // Gán sự kiện click vào từng dòng -> tự động nạp vào bộ tra cứu
            var rowEls = termsListEl.querySelectorAll('.tk-term-row');
            rowEls.forEach(function (el) {
                el.addEventListener('click', function () {
                    if (currentMode !== 'solar' && btnSolar) {
                        btnSolar.click();
                    }
                    inpD.value = el.getAttribute('data-d');
                    inpM.value = el.getAttribute('data-m');
                    inpY.value = el.getAttribute('data-y');
                    inpH.value = el.getAttribute('data-h');
                    inpMi.value = el.getAttribute('data-mi');
                    runInspect();

                    // Cuộn nhẹ lên hộp kết quả
                    if (resBox) {
                        resBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                    }
                });
            });
        }

        if (selYear) {
            selYear.addEventListener('change', renderTermsList);
        }
        if (inpSearch) {
            inpSearch.addEventListener('input', renderTermsList);
        }

        // Khởi tạo tra cứu ban đầu
        runInspect();
    }

    function init() {
        var box = document.getElementById('tiet-khi-calendar');
        if (!box) return;
        if (!A()) { box.hidden = true; return; }
        try {
            renderLiveCalendar(box);
            var toolsWrap = document.getElementById('tk-tools-wrap');
            if (toolsWrap) {
                initToolsUI(toolsWrap);
            }
            box.hidden = false;
            setInterval(function () {
                try { renderLiveCalendar(box); } catch (e) { /* giữ nội dung cũ */ }
            }, 30000);
        } catch (e) {
            box.hidden = true;
            if (window.console) console.warn('[TietKhi] ẩn lịch tiết khí:', e);
        }
    }

    // Xuất các hàm thuần để kiểm thử
    if (typeof window !== 'undefined') {
        window.TietKhiWidget = {
            solarToLunar: solarToLunar,
            lunarToSolar: lunarToSolar,
            termInfo: termInfo,
            getYearTerms: getYearTerms,
            inspectDate: inspectDate,
            dayNum: dayNum,
            TERMS: TERMS
        };
    }

    if (typeof document !== 'undefined') {
        if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
        else init();
    }
})();
