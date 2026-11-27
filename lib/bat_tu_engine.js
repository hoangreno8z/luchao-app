/**
 * Lõi Tính Toán Bát Tự Tứ Trụ — Dịch Sư Nguyễn Huy Hoàng
 * Tích hợp Lunar-JavaScript, Thập Thần, Can Tàng, Nạp Âm, Thần Sát, Đại Vận & 100 năm Lưu Niên
 */

(function(global) {
    const CN_TO_VI_STEM = {
        '甲': 'Giáp', '乙': 'Ất', '丙': 'Bính', '丁': 'Đinh', '戊': 'Mậu',
        '己': 'Kỷ', '庚': 'Canh', '辛': 'Tân', '壬': 'Nhâm', '癸': 'Quý'
    };

    const CN_TO_VI_BRANCH = {
        '子': 'Tý', '丑': 'Sửu', '寅': 'Dần', '卯': 'Mão', '辰': 'Thìn', '巳': 'Tị',
        '午': 'Ngọ', '未': 'Mùi', '申': 'Thân', '酉': 'Dậu', '戌': 'Tuất', '亥': 'Hợi'
    };

    const CN_TO_VI_SHISHEN = {
        '比肩': 'Tỷ', '劫财': 'Kiếp', '食神': 'Thực', '伤官': 'Thương',
        '偏财': 'T.Tài', '正财': 'Tài', '七杀': 'Sát', '偏官': 'Sát', '正官': 'Quan',
        '偏印': 'Kiêu', '正印': 'Ấn', '日主': 'Nhật Chủ'
    };

    const CN_TO_VI_NAYIN = {
        '海中金': 'Hải Trung Kim', '炉中火': 'Lư Trung Hỏa', '大林木': 'Đại Lâm Mộc', '路旁土': 'Lộ Bàng Thổ',
        '剑锋金': 'Kiếm Phong Kim', '山头火': 'Sơn Đầu Hỏa', '涧下水': 'Giản Hạ Thủy', '城头土': 'Thành Đầu Thổ',
        '白蜡金': 'Bạch Lạp Kim', '杨柳木': 'Dương Liễu Mộc', '泉中水': 'Tuyền Trung Thủy', '屋上土': 'Ốc Thượng Thổ',
        '霹雳火': 'Tích Lịch Hỏa', '松柏木': 'Tùng Bách Mộc', '长流水': 'Trường Lưu Thủy', '沙中金': 'Sa Trung Kim',
        '山下火': 'Sơn Hạ Hỏa', '平地木': 'Bình Địa Mộc', '壁上土': 'Bích Thượng Thổ', '金箔金': 'Kim Bạc Kim',
        '覆灯火': 'Phúc Đăng Hỏa', '天河水': 'Thiên Hà Thủy', '大驿土': 'Đại Dịch Thổ', '钗钏金': 'Thoa Xuyến Kim',
        '桑柘木': 'Tang Đố Mộc', '大溪水': 'Đại Khê Thủy', '沙中土': 'Sa Trung Thổ', '天上火': 'Thiên Thượng Hỏa',
        '石榴木': 'Thạch Lựu Mộc', '大海水': 'Đại Hải Thủy'
    };

    const CN_TO_VI_SOLAR_TERM = {
        '立春': 'Lập Xuân', '雨水': 'Vũ Thủy', '惊蛰': 'Kinh Trập', '春分': 'Xuân Phân',
        '清明': 'Thanh Minh', '谷雨': 'Cốc Vũ', '立夏': 'Lập Hạ', '小满': 'Tiểu Mãn',
        '芒种': 'Mang Chủng', '夏至': 'Hạ Chí', '小暑': 'Tiểu Thử', '大暑': 'Đại Thử',
        '立秋': 'Lập Thu', '处暑': 'Xử Thử', '白露': 'Bạch Lộ', '秋分': 'Thu Phân',
        '寒露': 'Hàn Lộ', '霜降': 'Sương Giáng', '立冬': 'Lập Đông', '小雪': 'Tiểu Tuyết',
        '大雪': 'Đại Tuyết', '冬至': 'Đông Chí', '小寒': 'Tiểu Hàn', '大寒': 'Đại Hàn'
    };

    const STEM_ELEMENTS = {
        'Giáp': { el: 'Mộc', color: '#27ae60', yinYang: 1 },
        'Ất':   { el: 'Mộc', color: '#27ae60', yinYang: 0 },
        'Bính': { el: 'Hỏa', color: '#c0392b', yinYang: 1 },
        'Đinh': { el: 'Hỏa', color: '#c0392b', yinYang: 0 },
        'Mậu':  { el: 'Thổ', color: '#8e5a2b', yinYang: 1 },
        'Kỷ':   { el: 'Thổ', color: '#8e5a2b', yinYang: 0 },
        'Canh': { el: 'Kim', color: '#7f8c8d', yinYang: 1 },
        'Tân':  { el: 'Kim', color: '#7f8c8d', yinYang: 0 },
        'Nhâm': { el: 'Thủy', color: '#2980b9', yinYang: 1 },
        'Quý':  { el: 'Thủy', color: '#2980b9', yinYang: 0 }
    };

    const BRANCH_ELEMENTS = {
        'Dần': { el: 'Mộc', color: '#27ae60' }, 'Mão': { el: 'Mộc', color: '#27ae60' },
        'Tị':  { el: 'Hỏa', color: '#c0392b' }, 'Ngọ': { el: 'Hỏa', color: '#c0392b' },
        'Thìn':{ el: 'Thổ', color: '#8e5a2b' }, 'Tuất':{ el: 'Thổ', color: '#8e5a2b' },
        'Sửu': { el: 'Thổ', color: '#8e5a2b' }, 'Mùi': { el: 'Thổ', color: '#8e5a2b' },
        'Thân':{ el: 'Kim', color: '#7f8c8d' }, 'Dậu': { el: 'Kim', color: '#7f8c8d' },
        'Hợi': { el: 'Thủy', color: '#2980b9' }, 'Tý':  { el: 'Thủy', color: '#2980b9' }
    };

    const ELEMENT_RELATIONS = {
        'Mộc': { 'Mộc': 'same', 'Hỏa': 'birth_out', 'Thổ': 'control_out', 'Kim': 'controlled_by', 'Thủy': 'birth_in' },
        'Hỏa': { 'Hỏa': 'same', 'Thổ': 'birth_out', 'Kim': 'control_out', 'Thủy': 'controlled_by', 'Mộc': 'birth_in' },
        'Thổ': { 'Thổ': 'same', 'Kim': 'birth_out', 'Thủy': 'control_out', 'Mộc': 'controlled_by', 'Hỏa': 'birth_in' },
        'Kim': { 'Kim': 'same', 'Thủy': 'birth_out', 'Mộc': 'control_out', 'Hỏa': 'controlled_by', 'Thổ': 'birth_in' },
        'Thủy': { 'Thủy': 'same', 'Mộc': 'birth_out', 'Hỏa': 'control_out', 'Thổ': 'controlled_by', 'Kim': 'birth_in' }
    };

    function getShiShenName(dayStem, targetStem) {
        if (!dayStem || !targetStem) return '';
        const s1 = STEM_ELEMENTS[dayStem];
        const s2 = STEM_ELEMENTS[targetStem];
        if (!s1 || !s2) return '';

        const rel = ELEMENT_RELATIONS[s1.el][s2.el];
        const sameYinYang = (s1.yinYang === s2.yinYang);

        switch (rel) {
            case 'same': return sameYinYang ? 'Tỷ' : 'Kiếp';
            case 'birth_out': return sameYinYang ? 'Thực' : 'Thương';
            case 'control_out': return sameYinYang ? 'T.Tài' : 'Tài';
            case 'controlled_by': return sameYinYang ? 'Sát' : 'Quan';
            case 'birth_in': return sameYinYang ? 'Kiêu' : 'Ấn';
        }
        return '';
    }

    function toViGan(cn) {
        return CN_TO_VI_STEM[cn] || cn || '';
    }

    function toViZhi(cn) {
        return CN_TO_VI_BRANCH[cn] || cn || '';
    }

    function toViGanZhi(gz) {
        if (!gz || gz.length < 2) return '';
        return toViGan(gz[0]) + ' ' + toViZhi(gz[1]);
    }

    function toViNaYin(cn) {
        return CN_TO_VI_NAYIN[cn] || cn || '';
    }

    function toViSolarTerm(cn) {
        return CN_TO_VI_SOLAR_TERM[cn] || cn || '';
    }

    /**
     * Tính toán toàn bộ Lá Số Bát Tự Tứ Trụ
     * - Bát Tự luôn luôn tính Trụ Năm, Trụ Tháng, Đại Vận theo 12 Tiết Khí (quy đổi chuẩn giờ Việt Nam UTC+7).
     *   Tuyệt đối KHÔNG dùng tháng nhuận Âm lịch (tháng nhuận chỉ dùng riêng cho Tử Vi).
     * - Giờ Tý (23h00 - 23h59): bắt buộc chuyển sang giờ Tý đầu ngày hôm sau cho Trụ Ngày, Trụ Giờ và ngày Âm lịch.
     */
    function calculateBatTu(year, month, day, hour, minute = 0, gender = 'nam', name = 'VÔ DANH KHÁCH') {
        const Solar = global.Solar || (typeof require !== 'undefined' ? require('lunar-javascript').Solar : null);
        if (!Solar) throw new Error("Chưa tải thư viện Lunar-JavaScript!");

        const VnCal = global.VnLunarCalendar || null;

        // 0. Kiểm tra ngày giờ Dương lịch hợp lệ (chặn 31/02, 29/02 năm không nhuận, 31/04...)
        const checkDt = new Date(Date.UTC(year, month - 1, day));
        const validDate = VnCal
            ? VnCal.isValidSolarDate(day, month, year)
            : (Number.isInteger(year) && Number.isInteger(month) && Number.isInteger(day) &&
               year >= 1800 && year <= 2199 && month >= 1 && month <= 12 &&
               checkDt.getUTCFullYear() === year && checkDt.getUTCMonth() === month - 1 && checkDt.getUTCDate() === day);
        if (!validDate) {
            const maxDay = VnCal && month >= 1 && month <= 12 ? VnCal.daysInSolarMonth(month, year) : 28;
            throw new Error(`Ngày dương lịch không hợp lệ: ${day}/${month}/${year} (Tháng ${month}/${year} chỉ có tối đa ${maxDay} ngày).`);
        }
        if (!Number.isInteger(hour) || hour < 0 || hour > 23 || !Number.isInteger(minute) || minute < 0 || minute > 59) {
            throw new Error(`Giờ sinh không hợp lệ: ${hour}:${minute}.`);
        }

        // Quy đổi thời điểm sinh từ giờ Việt Nam (UTC+7) sang giờ Bắc Kinh (UTC+8) để khớp bảng Tiết Khí của lunar-javascript
        const solarVN = Solar.fromYmdHms(year, month, day, hour, minute, 0);
        const solarBJT = solarVN.nextHour(1);
        const lunarBJT = solarBJT.getLunar();
        const eightCharBJT = lunarBJT.getEightChar();

        // Giờ Tý muộn (23h00 - 23h59): bắt buộc tính sang giờ Tý đầu ngày hôm sau
        const isLateZi = (hour === 23);
        const effSolar = isLateZi
            ? (VnCal
                ? VnCal.addDays(year, month, day, 1)
                : (() => {
                    const nd = new Date(Date.UTC(year, month - 1, day + 1));
                    return { year: nd.getUTCFullYear(), month: nd.getUTCMonth() + 1, day: nd.getUTCDate() };
                })())
            : { year, month, day };
        const effHour = isLateZi ? 0 : hour;

        // Trụ Ngày & Trụ Giờ tính theo ngày dân sự Việt Nam đã chuyển ngày lúc 23h
        const effLunarForDayTime = Solar.fromYmdHms(effSolar.year, effSolar.month, effSolar.day, effHour, minute, 0).getLunar();
        const effEightChar = effLunarForDayTime.getEightChar();

        const yearStem = toViGan(eightCharBJT.getYearGan());
        const yearBranch = toViZhi(eightCharBJT.getYearZhi());
        const monthStem = toViGan(eightCharBJT.getMonthGan());
        const monthBranch = toViZhi(eightCharBJT.getMonthZhi());
        const dayStem = toViGan(effEightChar.getDayGan());
        const dayBranch = toViZhi(effEightChar.getDayZhi());
        const timeStem = toViGan(effEightChar.getTimeGan());
        const timeBranch = toViZhi(effEightChar.getTimeZhi());

        const yearHidden = (eightCharBJT.getYearHideGan() || []).map(toViGan);
        const monthHidden = (eightCharBJT.getMonthHideGan() || []).map(toViGan);
        const dayHidden = (effEightChar.getDayHideGan() || []).map(toViGan);
        const timeHidden = (effEightChar.getTimeHideGan() || []).map(toViGan);

        // 1. Tứ Trụ Can Chi & Ngũ Hành (Chủ tinh & Phó tinh tính thống nhất theo Nhật Chủ dayStem)
        const pillars = {
            year: {
                title: "NĂM",
                solarYear: year,
                stem: yearStem,
                branch: yearBranch,
                fullGanZhi: yearStem + " " + yearBranch,
                stemColor: STEM_ELEMENTS[yearStem]?.color || '#8e5a2b',
                branchColor: BRANCH_ELEMENTS[yearBranch]?.color || '#8e5a2b',
                nayin: toViNaYin(eightCharBJT.getYearNaYin()),
                chuTinh: getShiShenName(dayStem, yearStem),
                hiddenStems: yearHidden,
                phoTinh: yearHidden.map(h => getShiShenName(dayStem, h))
            },
            month: {
                title: "THÁNG",
                solarMonth: month,
                stem: monthStem,
                branch: monthBranch,
                fullGanZhi: monthStem + " " + monthBranch,
                stemColor: STEM_ELEMENTS[monthStem]?.color || '#27ae60',
                branchColor: BRANCH_ELEMENTS[monthBranch]?.color || '#27ae60',
                nayin: toViNaYin(eightCharBJT.getMonthNaYin()),
                chuTinh: getShiShenName(dayStem, monthStem),
                hiddenStems: monthHidden,
                phoTinh: monthHidden.map(h => getShiShenName(dayStem, h))
            },
            day: {
                title: "NGÀY",
                solarDay: effSolar.day,
                stem: dayStem,
                branch: dayBranch,
                fullGanZhi: dayStem + " " + dayBranch,
                stemColor: STEM_ELEMENTS[dayStem]?.color || '#c0392b',
                branchColor: BRANCH_ELEMENTS[dayBranch]?.color || '#8e5a2b',
                nayin: toViNaYin(effEightChar.getDayNaYin()),
                chuTinh: "NHẬT CHỦ",
                hiddenStems: dayHidden,
                phoTinh: dayHidden.map(h => getShiShenName(dayStem, h))
            },
            time: {
                title: "GIỜ",
                solarTime: (hour < 10 ? '0' + hour : hour) + ':' + (minute < 10 ? '0' + minute : minute),
                stem: timeStem,
                branch: timeBranch,
                fullGanZhi: timeStem + " " + timeBranch,
                stemColor: STEM_ELEMENTS[timeStem]?.color || '#8e5a2b',
                branchColor: BRANCH_ELEMENTS[timeBranch]?.color || '#2980b9',
                nayin: toViNaYin(effEightChar.getTimeNaYin()),
                chuTinh: getShiShenName(dayStem, timeStem),
                hiddenStems: timeHidden,
                phoTinh: timeHidden.map(h => getShiShenName(dayStem, h))
            }
        };

        // 2. Tra cứu Thần Sát cho 4 Trụ
        const isMale = (gender === 'nam' || gender === '1' || gender === 1);
        const thanSatEngine = global.BatTuThanSat || (typeof require !== 'undefined' ? require('./bat_tu_than_sat').BatTuThanSat : null);
        let thanSat = { year: [], month: [], day: [], time: [] };
        if (thanSatEngine && typeof thanSatEngine.calculatePillarsThanSat === 'function') {
            thanSat = thanSatEngine.calculatePillarsThanSat(pillars, isMale);
        }
        pillars.year.thanSat = thanSat.year || [];
        pillars.month.thanSat = thanSat.month || [];
        pillars.day.thanSat = thanSat.day || [];
        pillars.time.thanSat = thanSat.time || [];

        // 3. Khởi Đại Vận & 10 Cột Đại Vận + 100 năm Lưu Niên
        const isYangYear = (STEM_ELEMENTS[yearStem]?.yinYang === 1);
        const isForward = (isMale && isYangYear) || (!isMale && !isYangYear);
        const genderLabel = isYangYear ? (isMale ? "Dương Nam" : "Dương Nữ") : (isMale ? "Âm Nam" : "Âm Nữ");

        // CHUẨN THIÊN VĂN HIỆN ĐẠI (SECT = 2) + TIẾT KHÍ QUY ĐỔI GIỜ VIỆT NAM (UTC+7):
        // Tính toán chính xác đến từng phút theo chuẩn Vấn Chân Bát Tự (问真八字) & 6tail/tyme4ts
        // Tỷ lệ Tử Bình cổ điển: 3 ngày = 1 tuổi (4320 phút = 1 năm), 1 ngày = 4 tháng (360 phút = 1 tháng), 12 phút = 1 ngày, 1 phút = 2 giờ.
        const yun = eightCharBJT.getYun(isMale ? 1 : 0, 2);
        const startYearNum = yun.getStartYear();
        const startMonthNum = yun.getStartMonth();
        const startDayNum = yun.getStartDay();
        const startHourNum = typeof yun.getStartHour === 'function' ? yun.getStartHour() : 0;

        // Quy đổi thời điểm giao vận về giờ Việt Nam (UTC+7 = BJT - 1h)
        const startSolarBJT = yun.getStartSolar();
        const startSolar = startSolarBJT ? startSolarBJT.nextHour(-1) : null;
        const startSolarYear = startSolar ? startSolar.getYear() : (year + startYearNum);
        const startSolarMonth = startSolar ? startSolar.getMonth() : ((month + startMonthNum - 1) % 12 + 1);
        const startSolarDay = startSolar ? startSolar.getDay() : day;
        const startSolarStr = startSolar ? startSolar.toYmdHms() : '';
        const startSolarDateFormatted = `${startSolarDay < 10 ? '0' + startSolarDay : startSolarDay}/${startSolarMonth < 10 ? '0' + startSolarMonth : startSolarMonth}/${startSolarYear}`;

        // Thông tin Tiết Khí lệnh tháng (12 Tiết, tuyệt đối không dùng Trung Khí — hiển thị theo giờ Việt Nam UTC+7)
        const prevJie = lunarBJT.getPrevJie();
        const nextJie = lunarBJT.getNextJie();
        const prevJieName = prevJie ? toViSolarTerm(prevJie.getName()) : 'Lập Xuân';
        const nextJieName = nextJie ? toViSolarTerm(nextJie.getName()) : 'Kinh Trập';
        const prevJieStr = prevJie ? prevJie.getSolar().nextHour(-1).toYmdHms() : '';
        const nextJieStr = nextJie ? nextJie.getSolar().nextHour(-1).toYmdHms() : '';
        const solarTermInfo = `Tiết ${prevJieName} bắt đầu ${prevJieStr} và kết thúc ${nextJieStr} (giờ VN)`;

        // Tuổi khởi đại vận theo chuẩn Tử Bình tứ xả ngũ nhập (四舍五入):
        // Dưới 6 tháng giữ nguyên năm, từ 6 tháng trở lên làm tròn lên 1 tuổi. Tối thiểu là 1 tuổi.
        let baseStartAge = startYearNum;
        if (startMonthNum >= 6) {
            baseStartAge += 1;
        }
        if (baseStartAge < 1) {
            baseStartAge = 1;
        }

        // Lấy 11 phần tử để có trọn vẹn 10 bước Đại Vận (index 1..10) từ thư viện
        const daYunList = yun.getDaYun(11);
        const daYunResult = [];

        for (let i = 1; i < Math.min(11, daYunList.length); i++) {
            const dy = daYunList[i];
            const dyGz = dy.getGanZhi();
            const dyStem = toViGan(dyGz[0]);
            const dyBranch = toViZhi(dyGz[1]);
            const dyShiShen = getShiShenName(dayStem, dyStem);

            const stepIdx = i - 1; // 0..9
            const dyStartAge = baseStartAge + stepIdx * 10;
            const dyEndAge = dyStartAge + 9;

            const liuNianList = dy.getLiuNian();
            const lnResult = liuNianList.map((ln, lnIdx) => {
                const lnGz = ln.getGanZhi();
                const lnStem = toViGan(lnGz[0]);
                const lnBranch = toViZhi(lnGz[1]);
                return {
                    year: ln.getYear(),
                    age: dyStartAge + lnIdx,
                    stem: lnStem,
                    branch: lnBranch,
                    ganZhi: lnStem + ' ' + lnBranch,
                    shiShen: getShiShenName(dayStem, lnStem),
                    stemColor: STEM_ELEMENTS[lnStem]?.color || '#8e5a2b'
                };
            });

            daYunResult.push({
                index: i,
                startYear: dy.getStartYear(),
                endYear: dy.getEndYear(),
                startAge: dyStartAge,
                endAge: dyEndAge,
                realStartAge: dy.getStartYear() - year,
                realEndAge: dy.getEndYear() - year,
                stem: dyStem,
                branch: dyBranch,
                ganZhi: dyStem + ' ' + dyBranch,
                shiShen: dyShiShen,
                stemColor: STEM_ELEMENTS[dyStem]?.color || '#8e5a2b',
                branchColor: BRANCH_ELEMENTS[dyBranch]?.color || '#8e5a2b',
                liuNian: lnResult
            });
        }

        const STEM_NAMES = ['Giáp', 'Ất', 'Bính', 'Đinh', 'Mậu', 'Kỷ', 'Canh', 'Tân', 'Nhâm', 'Quý'];
        const BRANCH_NAMES = ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tị', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi'];

        while (daYunResult.length < 10) {
            const last = daYunResult[daYunResult.length - 1];
            const nextYear = parseInt(last.startYear, 10) + 10;
            const nextAge = parseInt(last.startAge, 10) + 10;
            const lastStemIdx = STEM_NAMES.indexOf(last.stem);
            const lastBranchIdx = BRANCH_NAMES.indexOf(last.branch);
            const nextStem = STEM_NAMES[(lastStemIdx + (isForward ? 1 : 9)) % 10];
            const nextBranch = BRANCH_NAMES[(lastBranchIdx + (isForward ? 1 : 11)) % 12];
            const nextShiShen = getShiShenName(dayStem, nextStem);

            const nextLiuNian = [];
            for (let y = 0; y < 10; y++) {
                const lnY = nextYear + y;
                const lnA = nextAge + y;
                const lnCanIdx = (lnY - 4) % 10;
                const lnChiIdx = (lnY - 4) % 12;
                const lnStem = STEM_NAMES[lnCanIdx >= 0 ? lnCanIdx : lnCanIdx + 10];
                const lnBranch = BRANCH_NAMES[lnChiIdx >= 0 ? lnChiIdx : lnChiIdx + 12];
                nextLiuNian.push({
                    year: lnY,
                    age: lnA,
                    stem: lnStem,
                    branch: lnBranch,
                    ganZhi: lnStem + ' ' + lnBranch,
                    shiShen: getShiShenName(dayStem, lnStem),
                    stemColor: STEM_ELEMENTS[lnStem]?.color || '#8e5a2b'
                });
            }

            daYunResult.push({
                index: daYunResult.length + 1,
                startYear: nextYear,
                endYear: nextYear + 9,
                startAge: nextAge,
                endAge: nextAge + 9,
                realStartAge: nextYear - year,
                realEndAge: nextYear + 9 - year,
                stem: nextStem,
                branch: nextBranch,
                ganZhi: nextStem + ' ' + nextBranch,
                shiShen: nextShiShen,
                stemColor: STEM_ELEMENTS[nextStem]?.color || '#8e5a2b',
                branchColor: BRANCH_ELEMENTS[nextBranch]?.color || '#8e5a2b',
                liuNian: nextLiuNian
            });
        }

        const startAgeDecimal = (startYearNum + (startMonthNum / 12) + (startDayNum / 365)).toFixed(2);
        const startAgeFormatted = `${baseStartAge} tuổi (sau sinh ${startYearNum} năm ${startMonthNum} tháng ${startDayNum} ngày)`;
        const summaryText = `Khởi đại vận: ${baseStartAge} tuổi (sau sinh ${startYearNum} năm ${startMonthNum} tháng ${startDayNum} ngày, giao vận: ${startSolarDateFormatted}). ${solarTermInfo}`;

        // Âm lịch hiển thị theo chuẩn Việt Nam (UTC+7), đã tính sang ngày hôm sau nếu sinh giờ Tý muộn (23h-23h59)
        let dispLunarDay, dispLunarMonth, dispLunarYear, dispLunarLeap = false;
        if (VnCal) {
            const vnL = VnCal.convertSolar2Lunar(effSolar.day, effSolar.month, effSolar.year, 7);
            dispLunarDay = vnL.day;
            dispLunarMonth = vnL.month;
            dispLunarYear = vnL.year;
            dispLunarLeap = vnL.isLeap;
        } else {
            dispLunarDay = effLunarForDayTime.getDay();
            dispLunarMonth = Math.abs(effLunarForDayTime.getMonth());
            dispLunarYear = effLunarForDayTime.getYear();
            dispLunarLeap = effLunarForDayTime.getMonth() < 0;
        }
        const pad2 = n => (n < 10 ? '0' + n : String(n));
        const lateZiTag = isLateZi ? ` (Tý → ${pad2(effSolar.day)}/${pad2(effSolar.month)})` : '';
        const leapTag = dispLunarLeap ? 'N' : '';

        return {
            name: name || 'VÔ DANH KHÁCH',
            gender: isMale ? 'nam' : 'nu',
            genderLabel,
            isForward,
            isLateZi,
            solarYear: year,
            solarMonth: month,
            solarDay: day,
            effectiveSolarYear: effSolar.year,
            effectiveSolarMonth: effSolar.month,
            effectiveSolarDay: effSolar.day,
            solarHour: hour,
            solarMinute: minute,
            solarStr: `${pad2(hour)}:${pad2(minute)} ${pad2(day)}/${pad2(month)}/${year}${lateZiTag}`,
            lunarStr: `${pad2(hour)}:${pad2(minute)} ${pad2(dispLunarDay)}/${pad2(dispLunarMonth)}${leapTag}/${dispLunarYear}`,
            lunarYearGanZhi: yearStem + ' ' + yearBranch,
            banMenhNaYin: toViNaYin(eightCharBJT.getYearNaYin()),
            pillars,
            solarTermInfo,
            yun: {
                baseStartAge,
                startYearNum,
                startMonthNum,
                startDayNum,
                startHourNum,
                startSolarYear,
                startSolarMonth,
                startSolarDay,
                startSolarStr,
                startSolarDateFormatted,
                startAgeDecimal,
                startAgeFormatted,
                summaryText
            },
            daYun: daYunResult
        };
    }

    global.BatTuEngine = {
        calculateBatTu,
        STEM_ELEMENTS,
        BRANCH_ELEMENTS,
        getShiShenName,
        toViGan,
        toViZhi,
        toViGanZhi
    };

})(typeof window !== "undefined" ? window : globalThis);
