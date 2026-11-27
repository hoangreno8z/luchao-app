/* ==========================================================================
   mobile_form.js — Tăng cường giao diện form lập lá số (Tử Vi & Bát Tự)

   NGUYÊN TẮC: chỉ là lớp trình bày.
   - Không đổi id, name, value hay option value của bất kỳ ô nhập nào.
   - Segmented control (Nam/Nữ) chỉ ghi vào chính <select> gốc.
   - "Giờ đồng hồ → canh giờ" chỉ chọn option có sẵn của <select> gốc.
   - Bản xem trước Âm lịch chỉ ĐỌC dữ liệu, dùng thư viện lunar.js đã có
     trên trang; lỗi gì cũng tự ẩn, không ảnh hưởng việc lập lá số.
   ========================================================================== */
(function () {
    'use strict';

    var GAN = { '甲': 'Giáp', '乙': 'Ất', '丙': 'Bính', '丁': 'Đinh', '戊': 'Mậu', '己': 'Kỷ', '庚': 'Canh', '辛': 'Tân', '壬': 'Nhâm', '癸': 'Quý' };
    var ZHI = { '子': 'Tý', '丑': 'Sửu', '寅': 'Dần', '卯': 'Mão', '辰': 'Thìn', '巳': 'Tỵ', '午': 'Ngọ', '未': 'Mùi', '申': 'Thân', '酉': 'Dậu', '戌': 'Tuất', '亥': 'Hợi' };
    var CANH = ['Tý sớm', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi', 'Tý muộn'];
    var CANH_RANGE = ['00:00–00:59', '01:00–02:59', '03:00–04:59', '05:00–06:59', '07:00–08:59', '09:00–10:59',
        '11:00–12:59', '13:00–14:59', '15:00–16:59', '17:00–18:59', '19:00–20:59', '21:00–22:59', '23:00–23:59 → sang hôm sau'];

    function ganZhiVi(gz) {
        if (!gz || gz.length < 2) return '';
        return (GAN[gz.charAt(0)] || gz.charAt(0)) + ' ' + (ZHI[gz.charAt(1)] || gz.charAt(1));
    }

    /** Giờ đồng hồ (0–23) → chỉ số canh giờ 0..12 (0 = Tý sớm 00h, 12 = Tý muộn 23h tính sang hôm sau). */
    function hourToCanhIndex(h) {
        if (h === 0) return 0;
        if (h === 23) return 12;
        return Math.floor((h + 1) / 2);
    }

    /** Gắn hook để khi script gốc gán .value bằng code, giao diện cũng đồng bộ theo. */
    function hookValue(el, onSet) {
        var proto = Object.getPrototypeOf(el);
        var desc;
        while (proto && !(desc = Object.getOwnPropertyDescriptor(proto, 'value'))) proto = Object.getPrototypeOf(proto);
        if (!desc || !desc.set) return;
        try {
            Object.defineProperty(el, 'value', {
                configurable: true,
                get: function () { return desc.get.call(this); },
                set: function (v) { desc.set.call(this, v); try { onSet(); } catch (e) { /* bỏ qua */ } }
            });
        } catch (e) { /* trình duyệt không cho phép: vẫn đồng bộ qua sự kiện */ }
    }

    /* ---------------- Segmented control thay <select> ngắn ---------------- */
    function initSegmented(select) {
        if (select.dataset.bfReady) return;
        select.dataset.bfReady = '1';

        var group = document.createElement('div');
        group.className = 'bf-segmented';
        group.setAttribute('role', 'radiogroup');
        var lbl = document.querySelector('label[for="' + select.id + '"]');
        if (lbl) {
            if (!lbl.id) lbl.id = select.id + 'Label';
            group.setAttribute('aria-labelledby', lbl.id);
            lbl.addEventListener('click', function (e) { e.preventDefault(); var b = group.querySelector('[aria-checked="true"]'); if (b) b.focus(); });
        }

        var buttons = Array.prototype.map.call(select.options, function (opt) {
            var b = document.createElement('button');
            b.type = 'button';
            b.className = 'bf-seg-btn';
            b.setAttribute('role', 'radio');
            b.dataset.value = opt.value;
            b.textContent = opt.dataset.short || opt.textContent.replace(/\s*Mệnh$/i, '').trim().toUpperCase();
            b.addEventListener('click', function () {
                if (select.value !== opt.value) {
                    select.value = opt.value;
                    select.dispatchEvent(new Event('change', { bubbles: true }));
                }
                sync();
            });
            group.appendChild(b);
            return b;
        });

        group.addEventListener('keydown', function (e) {
            if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].indexOf(e.key) < 0) return;
            e.preventDefault();
            var i = select.selectedIndex;
            var n = buttons.length;
            i = (e.key === 'ArrowLeft' || e.key === 'ArrowUp') ? (i - 1 + n) % n : (i + 1) % n;
            buttons[i].click();
            buttons[i].focus();
        });

        function sync() {
            buttons.forEach(function (b) {
                var on = b.dataset.value === select.value;
                b.setAttribute('aria-checked', on ? 'true' : 'false');
                b.tabIndex = on ? 0 : -1;
            });
        }

        select.classList.add('bf-visually-hidden');
        select.setAttribute('tabindex', '-1');
        select.setAttribute('aria-hidden', 'true');
        select.parentNode.insertBefore(group, select.nextSibling);
        select.addEventListener('change', sync);
        hookValue(select, sync);
        sync();
        return sync;
    }

    /* ---------------- Ngày/Tháng/Năm: tự nhảy ô ---------------- */
    function initAutoAdvance(form) {
        form.querySelectorAll('[data-bf-next]').forEach(function (inp) {
            inp.addEventListener('input', function () {
                var max = parseInt(inp.dataset.bfDigits || '2', 10);
                var digits = (inp.value || '').replace(/\D/g, '');
                if (digits.length >= max) {
                    var next = document.getElementById(inp.dataset.bfNext);
                    if (next) { next.focus(); if (next.select) { try { next.select(); } catch (e) { /* type=number */ } } }
                }
            });
        });
    }

    /* ---------------- Giờ đồng hồ → canh giờ (Tử Vi) ---------------- */
    function initClockToCanh(clock, hourSelect, hint) {
        function renderHint() {
            if (!hint) return;
            var idx = parseInt(hourSelect.value, 10);
            if (isNaN(idx) || idx < 0 || idx > 12) return;
            if (idx === 12) {
                hint.innerHTML = 'Đang chọn: <strong>Giờ Tý muộn (23:00–23:59)</strong> — tự động tính sang <strong>giờ Tý đầu ngày hôm sau</strong>.';
            } else {
                hint.innerHTML = 'Đang chọn: <strong>Giờ ' + CANH[idx] + ' (' + CANH_RANGE[idx] + ')</strong>. ' +
                    'Không rõ canh giờ? Nhập giờ đồng hồ bên cạnh, hệ thống tự chọn.';
            }
        }
        clock.addEventListener('input', function () {
            if (!clock.value) return;
            var h = parseInt(clock.value.split(':')[0], 10);
            if (isNaN(h)) return;
            var idx = String(hourToCanhIndex(h));
            if (hourSelect.value !== idx) {
                hourSelect.value = idx;
                hourSelect.dispatchEvent(new Event('change', { bubbles: true }));
            }
            renderHint();
        });
        hourSelect.addEventListener('change', function () {
            // Người dùng tự chọn canh giờ khác → xóa giờ đồng hồ không còn khớp
            if (clock.value) {
                var h = parseInt(clock.value.split(':')[0], 10);
                if (String(hourToCanhIndex(h)) !== hourSelect.value) clock.value = '';
            }
            renderHint();
        });
        hookValue(hourSelect, renderHint);
        renderHint();
    }

    /* ---------------- Canh giờ hiển thị cho input time (Bát Tự) ---------------- */
    function initTimeHint(timeInput, hint) {
        function render() {
            var v = timeInput.value;
            if (!v) { hint.textContent = ''; return; }
            var h = parseInt(v.split(':')[0], 10);
            if (isNaN(h)) { hint.textContent = ''; return; }
            var idx = hourToCanhIndex(h);
            if (idx === 12) {
                hint.innerHTML = '→ <strong>Giờ Tý muộn (23:00–23:59)</strong> · Tính sang đầu ngày hôm sau';
            } else {
                hint.innerHTML = '→ <strong>Giờ ' + CANH[idx] + '</strong> (' + CANH_RANGE[idx] + ')';
            }
        }
        timeInput.addEventListener('input', render);
        timeInput.addEventListener('change', render);
        hookValue(timeInput, render);
        render();
    }

    /* ---------------- Xem trước Âm lịch Việt Nam UTC+7 (chỉ đọc) ---------------- */
    function initLunarPreview(box, readYmd, readIsLateZi) {
        function render() {
            try {
                var ymd = readYmd();
                if (!ymd) { box.hidden = true; return; }
                var y = ymd[0], m = ymd[1], d = ymd[2];
                if (!(y >= 1900 && y <= 2100 && m >= 1 && m <= 12 && d >= 1 && d <= 31)) { box.hidden = true; return; }

                var VnCal = window.VnLunarCalendar;
                var dt = new Date(Date.UTC(y, m - 1, d));
                if (dt.getUTCMonth() !== m - 1 || dt.getUTCDate() !== d) {
                    var maxD = VnCal ? VnCal.daysInSolarMonth(m, y) : 28;
                    box.innerHTML = '<span style="color:#f87171;">⚠️ Ngày không tồn tại (Tháng ' + m + '/' + y + ' chỉ có tối đa ' + maxD + ' ngày)</span>';
                    box.hidden = false;
                    return;
                }

                var isLateZi = readIsLateZi ? Boolean(readIsLateZi()) : false;
                var eff = isLateZi
                    ? (VnCal ? VnCal.addDays(y, m, d, 1) : (function () {
                        var nd = new Date(Date.UTC(y, m - 1, d + 1));
                        return { year: nd.getUTCFullYear(), month: nd.getUTCMonth() + 1, day: nd.getUTCDate() };
                    })())
                    : { year: y, month: m, day: d };

                var html = '';
                if (VnCal) {
                    var l = VnCal.convertSolar2Lunar(eff.day, eff.month, eff.year, 7);
                    var yGz = VnCal.getYearCanChi(l.year).canChi;
                    var dGz = VnCal.getDayCanChi(eff.day, eff.month, eff.year).canChi;
                    var monthTxt = (l.isLeap ? 'nhuận ' : '') + l.month;
                    html = 'Âm lịch VN: <b>' + l.day + '/' + monthTxt + '</b> năm <b>' + yGz + '</b> · Ngày <b>' + dGz + '</b>';
                } else if (typeof window.Solar !== 'undefined') {
                    var lunar = window.Solar.fromYmd(eff.year, eff.month, eff.day).getLunar();
                    var lm = lunar.getMonth();
                    var mTxt = (lm < 0 ? 'nhuận ' : '') + Math.abs(lm);
                    html = 'Âm lịch: <b>' + lunar.getDay() + '/' + mTxt + '</b> năm <b>' + ganZhiVi(lunar.getYearInGanZhi()) + '</b> · Ngày <b>' + ganZhiVi(lunar.getDayInGanZhi()) + '</b>';
                } else {
                    box.hidden = true;
                    return;
                }

                if (isLateZi) {
                    html += ' <em>(Giờ Tý 23h → sang ' + eff.day + '/' + eff.month + '/' + eff.year + ')</em>';
                }
                box.innerHTML = html;
                box.hidden = false;
            } catch (e) {
                box.hidden = true;
            }
        }
        return render;
    }

    /* ---------------- Sau khi bấm Lập lá số: cuộn tới lá số trên mobile ---------------- */
    function initScrollToResult(form) {
        var targetSel = form.dataset.bfScrollTarget;
        if (!targetSel) return;
        form.addEventListener('submit', function () {
            if (window.innerWidth > 960) return;
            var target = document.querySelector(targetSel);
            if (!target) return;
            setTimeout(function () {
                var top = target.getBoundingClientRect().top + window.pageYOffset - 64;
                var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
                window.scrollTo({ top: top, behavior: reduce ? 'auto' : 'smooth' });
            }, 350);
        });
    }

    /* ======================= Khởi tạo theo trang ======================= */
    function init() {
        var form = document.querySelector('form.bf');
        if (!form || form.dataset.bfInit) return;
        form.dataset.bfInit = '1';

        form.querySelectorAll('select[data-segmented]').forEach(initSegmented);
        initAutoAdvance(form);
        initScrollToResult(form);

        // ---- Tử Vi ----
        var hourSel = document.getElementById('inputHour');
        var clock = document.getElementById('uiClockTime');
        if (hourSel && clock) initClockToCanh(clock, hourSel, document.getElementById('uiHourHint'));

        var tvBox = document.getElementById('tuviLunarPreview');
        if (tvBox) {
            var dIn = document.getElementById('inputSolarDay');
            var mIn = document.getElementById('inputSolarMonth');
            var yIn = document.getElementById('inputSolarYear');
            var renderTv = initLunarPreview(tvBox, function () {
                var d = parseInt(dIn.value, 10), m = parseInt(mIn.value, 10), y = parseInt(yIn.value, 10);
                return (isNaN(d) || isNaN(m) || isNaN(y)) ? null : [y, m, d];
            }, function () {
                return hourSel && hourSel.value === '12';
            });
            [dIn, mIn, yIn].forEach(function (el) { el.addEventListener('input', renderTv); hookValue(el, renderTv); });
            if (hourSel) { hourSel.addEventListener('change', renderTv); }
            renderTv();
        }

        // ---- Bát Tự ----
        var timeIn = document.getElementById('inp-time');
        var timeHint = document.getElementById('uiTimeHint');
        if (timeIn && timeHint) initTimeHint(timeIn, timeHint);

        var btBox = document.getElementById('battuLunarPreview');
        var dateIn = document.getElementById('inp-date');
        if (btBox && dateIn) {
            var renderBt = initLunarPreview(btBox, function () {
                var p = (dateIn.value || '').split('-');
                if (p.length !== 3) return null;
                return [parseInt(p[0], 10), parseInt(p[1], 10), parseInt(p[2], 10)];
            }, function () {
                if (!timeIn || !timeIn.value) return false;
                var h = parseInt(timeIn.value.split(':')[0], 10);
                return h === 23;
            });
            dateIn.addEventListener('input', renderBt);
            dateIn.addEventListener('change', renderBt);
            hookValue(dateIn, renderBt);
            if (timeIn) { timeIn.addEventListener('change', renderBt); hookValue(timeIn, renderBt); }
            renderBt();
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
