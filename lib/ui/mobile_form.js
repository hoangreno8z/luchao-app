/* ==========================================================================
   mobile_form.js — Tăng cường giao diện form lập lá số (Tử Vi & Bát Tự)
   - Segmented control (Nam/Nữ), tự nhảy ô Ngày→Tháng→Năm.
   - Nút gạt siêu nhỏ chuyển đổi nhập Dương lịch ↔ Âm lịch (kèm nhận diện tháng nhuận).
   - Giờ đồng hồ → canh giờ (phân biệt Tý sớm 00h và Tý muộn 23h sang ngày hôm sau).
   - Xem trước đối chiếu Âm ↔ Dương & Tiết Khí trực tiếp theo lịch Việt Nam UTC+7.
   ========================================================================== */
(function () {
    'use strict';

    var GAN = { '甲': 'Giáp', '乙': 'Ất', '丙': 'Bính', '丁': 'Đinh', '戊': 'Mậu', '己': 'Kỷ', '庚': 'Canh', '辛': 'Tân', '壬': 'Nhâm', '癸': 'Quý' };
    var ZHI = { '子': 'Tý', '丑': 'Sửu', '寅': 'Dần', '卯': 'Mão', '辰': 'Thìn', '巳': 'Tỵ', '午': 'Ngọ', '未': 'Mùi', '申': 'Thân', '酉': 'Dậu', '戌': 'Tuất', '亥': 'Hợi' };
    var CANH = ['Tý sớm', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi', 'Tý muộn'];
    var CANH_RANGE = ['00:00–00:59', '01:00–02:59', '03:00–04:59', '05:00–06:59', '07:00–08:59', '09:00–10:59',
        '11:00–12:59', '13:00–14:59', '15:00–16:59', '17:00–18:59', '19:00–20:59', '21:00–22:59', '23:00–23:59 → sang hôm sau'];

    function pad2(n) {
        return n < 10 ? '0' + n : String(n);
    }

    function escapeHtml(str) {
        if (str === null || str === undefined) return '';
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

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
        if (!el) return;
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

    /* ---------------- Cập nhật hiển thị nút Tháng Nhuận ---------------- */
    function syncLeapRowVisibility(isLunar, lMonth, lYear, leapRow, leapToggle, leapText) {
        if (!leapRow || !leapToggle) return false;
        var VnCal = window.VnLunarCalendar;
        if (!isLunar || !VnCal || !(lYear >= 1800 && lYear <= 2199 && lMonth >= 1 && lMonth <= 12)) {
            leapRow.hidden = true;
            leapToggle.checked = false;
            return false;
        }
        var leapM = VnCal.getLeapMonthOfYear(lYear, 7);
        if (leapM > 0 && leapM === lMonth) {
            if (leapText) leapText.textContent = 'Tháng ' + lMonth + ' nhuận';
            leapRow.hidden = false;
            return leapToggle.checked;
        } else {
            leapRow.hidden = true;
            leapToggle.checked = false;
            return false;
        }
    }

    /* ---------------- Khởi tạo bộ ngày sinh + nút gạt Âm/Dương cho Tử Vi ---------------- */
    function initTuViDateSystem() {
        var box = document.getElementById('tuviLunarPreview');
        var dIn = document.getElementById('inputSolarDay');
        var mIn = document.getElementById('inputSolarMonth');
        var yIn = document.getElementById('inputSolarYear');
        var hourSel = document.getElementById('inputHour');
        var calToggle = document.getElementById('tuviCalendarToggle');
        var labelEl = document.getElementById('tuviDateLabel');
        var labelRow = document.getElementById('tuviDateLabelRow');
        var toggleWrap = document.getElementById('tuviCalToggleWrap');
        var leapRow = document.getElementById('tuviLeapRow');
        var leapToggle = document.getElementById('tuviLeapToggle');
        var leapText = document.getElementById('tuviLeapLabelText');

        if (!dIn || !mIn || !yIn || !box) return;

        function render() {
            var VnCal = window.VnLunarCalendar;
            var isLunar = calToggle ? calToggle.checked : false;
            var d = parseInt(dIn.value, 10), m = parseInt(mIn.value, 10), y = parseInt(yIn.value, 10);

            if (labelEl) labelEl.textContent = isLunar ? 'Ngày Sinh (Âm Lịch)' : 'Ngày Sinh (Dương Lịch)';
            if (labelRow) labelRow.classList.toggle('is-lunar', isLunar);
            if (toggleWrap) toggleWrap.classList.toggle('is-lunar', isLunar);
            dIn.max = isLunar ? '30' : '31';

            var isLeap = syncLeapRowVisibility(isLunar, m, y, leapRow, leapToggle, leapText);

            if (isNaN(d) || isNaN(m) || isNaN(y) || y < 1900 || y > 2100 || m < 1 || m > 12 || d < 1 || d > 31) {
                box.hidden = true;
                return;
            }

            var isLateZi = Boolean(hourSel && hourSel.value === '12');

            try {
                var sY, sM, sD;
                if (isLunar) {
                    if (!VnCal) { box.hidden = true; return; }
                    var conv = VnCal.convertLunar2Solar(d, m, y, isLeap, 7);
                    sY = conv.year; sM = conv.month; sD = conv.day;
                } else {
                    if (VnCal && !VnCal.isValidSolarDate(d, m, y)) {
                        var maxD = VnCal.daysInSolarMonth(m, y);
                        box.innerHTML = '<span style="color:#f87171;">⚠️ Ngày không tồn tại (Tháng ' + m + '/' + y + ' chỉ có tối đa ' + maxD + ' ngày)</span>';
                        box.hidden = false;
                        return;
                    }
                    sY = y; sM = m; sD = d;
                }

                var eff = isLateZi && VnCal ? VnCal.addDays(sY, sM, sD, 1) : { year: sY, month: sM, day: sD };
                var html = '';

                if (VnCal) {
                    var effLunar = VnCal.convertSolar2Lunar(eff.day, eff.month, eff.year, 7);
                    var yGz = VnCal.getYearCanChi(effLunar.year).canChi;
                    var dGz = VnCal.getDayCanChi(eff.day, eff.month, eff.year).canChi;

                    if (isLunar) {
                        html = 'Dương lịch: <b>' + pad2(sD) + '/' + pad2(sM) + '/' + sY + '</b> · Năm <b>' + yGz + '</b> · Ngày <b>' + dGz + '</b>';
                    } else {
                        var mTxt = (effLunar.isLeap ? 'nhuận ' : '') + effLunar.month;
                        html = 'Âm lịch VN: <b>' + effLunar.day + '/' + mTxt + '</b> năm <b>' + yGz + '</b> · Ngày <b>' + dGz + '</b>';
                    }
                }

                if (isLateZi) {
                    html += ' <em>(Giờ Tý 23h → sang ' + pad2(eff.day) + '/' + pad2(eff.month) + '/' + eff.year + ')</em>';
                }
                box.innerHTML = html;
                box.hidden = !html;
            } catch (err) {
                box.innerHTML = '<span style="color:#f87171;">⚠️ ' + escapeHtml(err.message) + '</span>';
                box.hidden = false;
            }
        }

        if (calToggle) {
            calToggle.addEventListener('change', function () {
                var VnCal = window.VnLunarCalendar;
                var d = parseInt(dIn.value, 10), m = parseInt(mIn.value, 10), y = parseInt(yIn.value, 10);
                if (VnCal && !isNaN(d) && !isNaN(m) && !isNaN(y) && y >= 1900 && y <= 2100) {
                    try {
                        if (calToggle.checked) {
                            // Vừa gạt từ Dương -> Âm: tự đổi ngày Dương đang có sang Âm
                            if (VnCal.isValidSolarDate(d, m, y)) {
                                var l = VnCal.convertSolar2Lunar(d, m, y, 7);
                                dIn.value = l.day;
                                mIn.value = l.month;
                                yIn.value = l.year;
                                syncLeapRowVisibility(true, l.month, l.year, leapRow, leapToggle, leapText);
                                if (leapToggle) leapToggle.checked = Boolean(l.isLeap);
                            }
                        } else {
                            // Vừa gạt từ Âm -> Dương: tự đổi ngày Âm đang có sang Dương
                            var wasLeap = Boolean(leapToggle && leapToggle.checked && leapRow && !leapRow.hidden);
                            var s = VnCal.convertLunar2Solar(d, m, y, wasLeap, 7);
                            dIn.value = s.day;
                            mIn.value = s.month;
                            yIn.value = s.year;
                        }
                    } catch (e) { /* nếu ngày đang gõ dở thì giữ nguyên số để người dùng sửa tiếp */ }
                }
                render();
            });
        }

        if (leapToggle) leapToggle.addEventListener('change', render);
        [dIn, mIn, yIn].forEach(function (el) { el.addEventListener('input', render); hookValue(el, render); });
        if (hourSel) hourSel.addEventListener('change', render);
        render();
    }

    /* ---------------- Khởi tạo bộ ngày sinh + nút gạt Âm/Dương cho Bát Tự ---------------- */
    function initBatTuDateSystem() {
        var box = document.getElementById('battuLunarPreview');
        var dateIn = document.getElementById('inp-date');
        var timeIn = document.getElementById('inp-time');
        var calToggle = document.getElementById('battuCalendarToggle');
        var labelEl = document.getElementById('battuDateLabel');
        var labelRow = document.getElementById('battuDateLabelRow');
        var toggleWrap = document.getElementById('battuCalToggleWrap');
        var lunarGroup = document.getElementById('battuLunarGroup');
        var lDayIn = document.getElementById('inp-lunar-day');
        var lMonthIn = document.getElementById('inp-lunar-month');
        var lYearIn = document.getElementById('inp-lunar-year');
        var leapRow = document.getElementById('battuLeapRow');
        var leapToggle = document.getElementById('battuLeapToggle');
        var leapText = document.getElementById('battuLeapLabelText');

        if (!dateIn || !box) return;

        function getHourMinute() {
            if (!timeIn || !timeIn.value) return [1, 0];
            var parts = timeIn.value.split(':');
            var h = parseInt(parts[0], 10);
            var min = parseInt(parts[1] || '0', 10);
            return [isNaN(h) ? 1 : h, isNaN(min) ? 0 : min];
        }

        function render() {
            var VnCal = window.VnLunarCalendar;
            var isLunar = Boolean(calToggle && calToggle.checked);

            if (labelEl) labelEl.textContent = isLunar ? 'Ngày Sinh (Âm Lịch)' : 'Ngày Sinh (Dương Lịch)';
            if (labelRow) labelRow.classList.toggle('is-lunar', isLunar);
            if (toggleWrap) toggleWrap.classList.toggle('is-lunar', isLunar);
            dateIn.hidden = isLunar;
            if (lunarGroup) lunarGroup.hidden = !isLunar;

            var hm = getHourMinute();
            var h = hm[0], min = hm[1];
            var isLateZi = (h === 23);

            try {
                var sY, sM, sD;
                if (isLunar) {
                    if (!VnCal || !lDayIn || !lMonthIn || !lYearIn) { box.hidden = true; return; }
                    var ld = parseInt(lDayIn.value, 10), lm = parseInt(lMonthIn.value, 10), ly = parseInt(lYearIn.value, 10);
                    var isLeap = syncLeapRowVisibility(true, lm, ly, leapRow, leapToggle, leapText);
                    if (isNaN(ld) || isNaN(lm) || isNaN(ly) || ly < 1900 || ly > 2100) {
                        box.hidden = true;
                        return;
                    }
                    var conv = VnCal.convertLunar2Solar(ld, lm, ly, isLeap, 7);
                    sY = conv.year; sM = conv.month; sD = conv.day;
                    dateIn.value = sY + '-' + pad2(sM) + '-' + pad2(sD);
                } else {
                    syncLeapRowVisibility(false, 0, 0, leapRow, leapToggle, leapText);
                    var p = (dateIn.value || '').split('-');
                    if (p.length !== 3) { box.hidden = true; return; }
                    sY = parseInt(p[0], 10); sM = parseInt(p[1], 10); sD = parseInt(p[2], 10);
                    if (isNaN(sY) || isNaN(sM) || isNaN(sD) || sY < 1900 || sY > 2100) { box.hidden = true; return; }
                    if (VnCal && !VnCal.isValidSolarDate(sD, sM, sY)) {
                        var maxD = VnCal.daysInSolarMonth(sM, sY);
                        box.innerHTML = '<span style="color:#f87171;">⚠️ Ngày không tồn tại (Tháng ' + sM + '/' + sY + ' chỉ có tối đa ' + maxD + ' ngày)</span>';
                        box.hidden = false;
                        return;
                    }
                }

                var eff = isLateZi && VnCal ? VnCal.addDays(sY, sM, sD, 1) : { year: sY, month: sM, day: sD };
                var html = '';

                // Lấy Can Chi Năm & Tháng theo Tiết Khí chuẩn Bát Tự (UTC+7 -> BJT +1h) nếu có window.Solar
                var baziYearMonthTxt = '';
                if (typeof window.Solar !== 'undefined') {
                    var ecBjt = window.Solar.fromYmdHms(sY, sM, sD, h, min, 0).nextHour(1).getLunar().getEightChar();
                    baziYearMonthTxt = 'Năm <b>' + ganZhiVi(ecBjt.getYear()) + '</b> · Tháng <b>' + ganZhiVi(ecBjt.getMonth()) + '</b>';
                }

                if (VnCal) {
                    var effLunar = VnCal.convertSolar2Lunar(eff.day, eff.month, eff.year, 7);
                    var dGz = VnCal.getDayCanChi(eff.day, eff.month, eff.year).canChi;
                    if (isLunar) {
                        html = 'Dương lịch: <b>' + pad2(sD) + '/' + pad2(sM) + '/' + sY + '</b> · ' +
                            (baziYearMonthTxt || ('Năm <b>' + VnCal.getYearCanChi(effLunar.year).canChi + '</b>')) +
                            ' · Ngày <b>' + dGz + '</b>';
                    } else {
                        var mTxt = (effLunar.isLeap ? 'nhuận ' : '') + effLunar.month;
                        html = 'Âm lịch VN: <b>' + effLunar.day + '/' + mTxt + '/' + effLunar.year + '</b> · ' +
                            (baziYearMonthTxt || ('Năm <b>' + VnCal.getYearCanChi(effLunar.year).canChi + '</b>')) +
                            ' · Ngày <b>' + dGz + '</b>';
                    }
                }

                if (isLateZi) {
                    html += ' <em>(Giờ Tý 23h → sang ' + pad2(eff.day) + '/' + pad2(eff.month) + '/' + eff.year + ')</em>';
                }
                box.innerHTML = html;
                box.hidden = !html;
            } catch (err) {
                box.innerHTML = '<span style="color:#f87171;">⚠️ ' + escapeHtml(err.message) + '</span>';
                box.hidden = false;
            }
        }

        if (calToggle) {
            calToggle.addEventListener('change', function () {
                var VnCal = window.VnLunarCalendar;
                if (calToggle.checked && VnCal && lDayIn && lMonthIn && lYearIn) {
                    var p = (dateIn.value || '').split('-');
                    if (p.length === 3) {
                        var y = parseInt(p[0], 10), m = parseInt(p[1], 10), d = parseInt(p[2], 10);
                        if (VnCal.isValidSolarDate(d, m, y)) {
                            var l = VnCal.convertSolar2Lunar(d, m, y, 7);
                            lDayIn.value = l.day;
                            lMonthIn.value = l.month;
                            lYearIn.value = l.year;
                            syncLeapRowVisibility(true, l.month, l.year, leapRow, leapToggle, leapText);
                            if (leapToggle) leapToggle.checked = Boolean(l.isLeap);
                        }
                    }
                }
                render();
            });
        }

        if (leapToggle) leapToggle.addEventListener('change', render);
        if (lDayIn && lMonthIn && lYearIn) {
            [lDayIn, lMonthIn, lYearIn].forEach(function (el) { el.addEventListener('input', render); });
        }
        dateIn.addEventListener('input', render);
        dateIn.addEventListener('change', render);
        hookValue(dateIn, render);
        if (timeIn) {
            timeIn.addEventListener('input', render);
            timeIn.addEventListener('change', render);
            hookValue(timeIn, render);
        }
        render();
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

    /* ---------------- Lightbox Phóng To Lá Số HD (Tử Vi & Bát Tự) ---------------- */
    function initChartLightbox() {
        var mounts = [
            { imgId: 'tuviImageMount', dlBtnId: 'btnExportPng', title: 'Lá Số Tử Vi HD' },
            { imgId: 'battuImageMount', dlBtnId: 'btn-download-png', title: 'Lá Số Bát Tự HD' }
        ];
        var activeTargets = mounts.filter(function (m) { return document.getElementById(m.imgId); });
        if (!activeTargets.length || document.getElementById('bfChartLightbox')) return;

        var modal = document.createElement('div');
        modal.id = 'bfChartLightbox';
        modal.className = 'bf-lightbox';
        modal.hidden = true;
        modal.setAttribute('role', 'dialog');
        modal.setAttribute('aria-modal', 'true');
        modal.setAttribute('aria-label', 'Phóng to lá số HD');
        modal.innerHTML =
            '<div class="bf-lb-toolbar">' +
                '<div class="bf-lb-controls">' +
                    '<button type="button" class="bf-lb-btn" id="bfLbOut" aria-label="Thu nhỏ">−</button>' +
                    '<button type="button" class="bf-lb-btn" id="bfLbReset" aria-label="Đặt lại tỷ lệ">100%</button>' +
                    '<button type="button" class="bf-lb-btn" id="bfLbIn" aria-label="Phóng to">+</button>' +
                '</div>' +
                '<div class="bf-lb-controls">' +
                    '<button type="button" class="bf-lb-btn bf-lb-btn-gold" id="bfLbDownload">⬇ Tải HD</button>' +
                    '<button type="button" class="bf-lb-btn bf-lb-btn-close" id="bfLbClose" aria-label="Đóng">✕ Đóng</button>' +
                '</div>' +
            '</div>' +
            '<div class="bf-lb-stage" id="bfLbStage">' +
                '<img class="bf-lb-img" id="bfLbImg" alt="Lá số phóng to HD" />' +
            '</div>';
        document.body.appendChild(modal);

        var stage = document.getElementById('bfLbStage');
        var lbImg = document.getElementById('bfLbImg');
        var btnOut = document.getElementById('bfLbOut');
        var btnIn = document.getElementById('bfLbIn');
        var btnReset = document.getElementById('bfLbReset');
        var btnDl = document.getElementById('bfLbDownload');
        var btnClose = document.getElementById('bfLbClose');

        var zoomSteps = [1, 1.65, 2.4];
        var zoomIdx = 0;
        var currentDlBtnId = null;

        function getBaseWidth() {
            var vw = Math.max(280, window.innerWidth - 32);
            return Math.min(vw, 920);
        }

        function applyZoom() {
            var scale = zoomSteps[zoomIdx];
            var targetW = Math.round(getBaseWidth() * scale);
            lbImg.style.width = targetW + 'px';
            lbImg.classList.toggle('is-zoomed', zoomIdx > 0);
            btnReset.textContent = Math.round(scale * 100) + '%';
        }

        function openLightbox(srcImg, dlBtnId, label) {
            if (!srcImg || !srcImg.src) return;
            currentDlBtnId = dlBtnId;
            lbImg.src = srcImg.src;
            lbImg.alt = label;
            zoomIdx = window.innerWidth <= 640 ? 1 : 0; // Trên điện thoại mở sẵn 165% để đọc rõ sao ngay lập tức
            modal.hidden = false;
            document.body.style.overflow = 'hidden';
            applyZoom();
            btnClose.focus();
        }

        function closeLightbox() {
            if (modal.hidden) return;
            modal.hidden = true;
            document.body.style.overflow = '';
        }

        btnIn.addEventListener('click', function () {
            if (zoomIdx < zoomSteps.length - 1) { zoomIdx++; applyZoom(); }
        });
        btnOut.addEventListener('click', function () {
            if (zoomIdx > 0) { zoomIdx--; applyZoom(); }
        });
        btnReset.addEventListener('click', function () {
            zoomIdx = 0;
            applyZoom();
        });
        lbImg.addEventListener('click', function (e) {
            e.stopPropagation();
            zoomIdx = zoomIdx === 0 ? 1 : (zoomIdx === 1 ? 2 : 0);
            applyZoom();
        });
        btnDl.addEventListener('click', function () {
            var origBtn = currentDlBtnId ? document.getElementById(currentDlBtnId) : null;
            if (origBtn) origBtn.click();
        });
        btnClose.addEventListener('click', closeLightbox);
        stage.addEventListener('click', function (e) {
            if (e.target === stage) closeLightbox();
        });
        document.addEventListener('keydown', function (e) {
            if (modal.hidden) return;
            if (e.key === 'Escape') closeLightbox();
            else if (e.key === '+' || e.key === '=') { if (zoomIdx < zoomSteps.length - 1) { zoomIdx++; applyZoom(); } }
            else if (e.key === '-') { if (zoomIdx > 0) { zoomIdx--; applyZoom(); } }
            else if (e.key === '0') { zoomIdx = 0; applyZoom(); }
        });

        activeTargets.forEach(function (t) {
            var img = document.getElementById(t.imgId);
            if (!img) return;
            img.setAttribute('title', 'Chạm hoặc nhấp để phóng to lá số chuẩn HD');
            img.addEventListener('click', function () { openLightbox(img, t.dlBtnId, t.title); });

            var container = img.parentElement;
            if (container && !container.querySelector('.bf-zoom-hint')) {
                var hint = document.createElement('button');
                hint.type = 'button';
                hint.className = 'bf-zoom-hint';
                hint.innerHTML = '🔍 <span>Chạm vào lá số để phóng to xem rõ từng sao (HD)</span>';
                hint.addEventListener('click', function () { openLightbox(img, t.dlBtnId, t.title); });
                container.appendChild(hint);
            }
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
        initChartLightbox();

        // ---- Tử Vi ----
        var hourSel = document.getElementById('inputHour');
        var clock = document.getElementById('uiClockTime');
        if (hourSel && clock) initClockToCanh(clock, hourSel, document.getElementById('uiHourHint'));
        initTuViDateSystem();

        // ---- Bát Tự ----
        var timeIn = document.getElementById('inp-time');
        var timeHint = document.getElementById('uiTimeHint');
        if (timeIn && timeHint) initTimeHint(timeIn, timeHint);
        initBatTuDateSystem();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
