/* ==========================================================================
   tiet_khi_widget.js — LỊCH TIẾT KHÍ (phần bổ sung độc lập, chỉ hiển thị)

   - Tiết khí: tính trực tiếp bằng Astronomy Engine (Don Cross, MIT) — mô hình
     VSOP87 rút gọn + nutation/aberration, sai số thời điểm tiết khí ~ dưới 1 phút.
     Đây là cùng thư viện vendor/astronomy.browser.min.js mà trang đã nạp sẵn.
   - Âm lịch: quy tắc lịch Việt Nam (múi giờ UTC+7): tháng bắt đầu từ ngày Sóc
     thiên văn, tháng 11 chứa Đông Chí, tháng nhuận là tháng đầu tiên không chứa
     Trung Khí — Sóc & Trung Khí đều lấy từ Astronomy Engine, không dùng bảng tra.
   - Tuyệt đối KHÔNG gọi / sửa bất kỳ hàm nào của calendar.js, iching_core.js,
     app.js. Chỉ đọc window.Astronomy. Lỗi gì cũng tự ẩn khối này.
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
    // Số hiệu cung Trung Khí (bội 30°) tại nửa đêm (UTC+7) của ngày dn
    function majorArc(dn) { return Math.floor(sunLon(dayStart(dn)) / 30); }

    /* ---------- Âm lịch Việt Nam ---------- */
    function solarToLunar(dn) {
        var monthStart = newMoonDayOnOrBefore(dn);
        var yy = localParts(dayStart(dn)).y;
        var a11 = month11Start(yy), b11, lunarYear;
        if (a11 >= monthStart) { lunarYear = yy; b11 = a11; a11 = month11Start(yy - 1); }
        else { lunarYear = yy + 1; b11 = month11Start(yy + 1); }

        // Liệt kê các ngày Sóc từ tháng 11 năm trước đến tháng 11 năm sau
        var starts = [a11];
        while (starts[starts.length - 1] < b11 && starts.length < 16) starts.push(nextNewMoonDay(starts[starts.length - 1]));
        var diff = starts.indexOf(monthStart);
        if (diff < 0) throw new Error('Lunar month not found');

        var lunarMonth = diff + 11, isLeap = false;
        if (starts.length - 1 === 13) {             // năm có 13 tháng → tìm tháng nhuận
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

    /* ---------- Tiết khí & tháng tiết ---------- */
    function termInfo(now) {
        var lon = sunLon(now);
        var k = Math.floor(lon / 15) % 24;
        var start = searchSun(k * 15, new Date(now.getTime() - 20 * DAY_MS), 21);
        var next = searchSun((k + 1) * 15, now, 20);

        // Tháng tiết: Lập Xuân (315°) mở tháng Dần, mỗi 30° sang tháng kế
        var mIdx = Math.floor((((lon - 315) % 360) + 360) % 360 / 30);   // 0 = Dần
        var monthChi = (mIdx + 2) % 12;
        var nextJieLon = 315 + (mIdx + 1) * 30;
        var nextJie = searchSun(nextJieLon, now, 35);
        var nextJieK = (((nextJieLon % 360) / 15) | 0) % 24;

        // Năm tiết khí (đổi tại Lập Xuân) → Can tháng theo Ngũ Hổ Độn
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

    /* ---------- Giao diện ---------- */
    function row(label, html) {
        return '<div class="tk-row"><div class="tk-label">' + label + '</div><div class="tk-value">' + html + '</div></div>';
    }

    var cache = { dn: null, lunar: null, info: null };

    function render(box) {
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
        box.querySelector('.tk-body').innerHTML = html;
    }

    function init() {
        var box = document.getElementById('tiet-khi-calendar');
        if (!box) return;
        if (!A()) { box.hidden = true; return; }
        try {
            render(box);
            box.hidden = false;
            setInterval(function () { try { render(box); } catch (e) { /* giữ nội dung cũ */ } }, 30000);
        } catch (e) {
            box.hidden = true;
            if (window.console) console.warn('[TietKhi] ẩn lịch tiết khí:', e);
        }
    }

    // Xuất các hàm thuần để kiểm thử (không ảnh hưởng ứng dụng)
    if (typeof window !== 'undefined') window.TietKhiWidget = { solarToLunar: solarToLunar, termInfo: termInfo, dayNum: dayNum, TERMS: TERMS };

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
    else init();
})();
