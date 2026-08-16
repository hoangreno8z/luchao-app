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
     */
    function calculateBatTu(year, month, day, hour, minute = 0, gender = 'nam', name = 'VÔ DANH KHÁCH') {
        const Solar = global.Solar || (typeof require !== 'undefined' ? require('lunar-javascript').Solar : null);
        if (!Solar) throw new Error("Chưa tải thư viện Lunar-JavaScript!");

        const solar = Solar.fromYmdHms(year, month, day, hour, minute, 0);
        const lunar = solar.getLunar();
        const eightChar = lunar.getEightChar();

        const yearStem = toViGan(eightChar.getYearGan());
        const yearBranch = toViZhi(eightChar.getYearZhi());
        const monthStem = toViGan(eightChar.getMonthGan());
        const monthBranch = toViZhi(eightChar.getMonthZhi());
        const dayStem = toViGan(eightChar.getDayGan());
        const dayBranch = toViZhi(eightChar.getDayZhi());
        const timeStem = toViGan(eightChar.getTimeGan());
        const timeBranch = toViZhi(eightChar.getTimeZhi());

        // 1. Tứ Trụ Can Chi & Ngũ Hành
        const pillars = {
            year: {
                title: "NĂM",
                solarYear: year,
                stem: yearStem,
                branch: yearBranch,
                fullGanZhi: yearStem + " " + yearBranch,
                stemColor: STEM_ELEMENTS[yearStem]?.color || '#8e5a2b',
                branchColor: BRANCH_ELEMENTS[yearBranch]?.color || '#8e5a2b',
                nayin: toViNaYin(eightChar.getYearNaYin()),
                chuTinh: CN_TO_VI_SHISHEN[eightChar.getYearShiShenGan()] || getShiShenName(dayStem, yearStem),
                hiddenStems: (eightChar.getYearHideGan() || []).map(toViGan),
                phoTinh: (eightChar.getYearShiShenZhi() || []).map(x => CN_TO_VI_SHISHEN[x] || x)
            },
            month: {
                title: "THÁNG",
                solarMonth: month,
                stem: monthStem,
                branch: monthBranch,
                fullGanZhi: monthStem + " " + monthBranch,
                stemColor: STEM_ELEMENTS[monthStem]?.color || '#27ae60',
                branchColor: BRANCH_ELEMENTS[monthBranch]?.color || '#27ae60',
                nayin: toViNaYin(eightChar.getMonthNaYin()),
                chuTinh: CN_TO_VI_SHISHEN[eightChar.getMonthShiShenGan()] || getShiShenName(dayStem, monthStem),
                hiddenStems: (eightChar.getMonthHideGan() || []).map(toViGan),
                phoTinh: (eightChar.getMonthShiShenZhi() || []).map(x => CN_TO_VI_SHISHEN[x] || x)
            },
            day: {
                title: "NGÀY",
                solarDay: day,
                stem: dayStem,
                branch: dayBranch,
                fullGanZhi: dayStem + " " + dayBranch,
                stemColor: STEM_ELEMENTS[dayStem]?.color || '#c0392b',
                branchColor: BRANCH_ELEMENTS[dayBranch]?.color || '#8e5a2b',
                nayin: toViNaYin(eightChar.getDayNaYin()),
                chuTinh: "NHẬT CHỦ",
                hiddenStems: (eightChar.getDayHideGan() || []).map(toViGan),
                phoTinh: (eightChar.getDayShiShenZhi() || []).map(x => CN_TO_VI_SHISHEN[x] || x)
            },
            time: {
                title: "GIỜ",
                solarTime: (hour < 10 ? '0' + hour : hour) + ':' + (minute < 10 ? '0' + minute : minute),
                stem: timeStem,
                branch: timeBranch,
                fullGanZhi: timeStem + " " + timeBranch,
                stemColor: STEM_ELEMENTS[timeStem]?.color || '#8e5a2b',
                branchColor: BRANCH_ELEMENTS[timeBranch]?.color || '#2980b9',
                nayin: toViNaYin(eightChar.getTimeNaYin()),
                chuTinh: CN_TO_VI_SHISHEN[eightChar.getTimeShiShenGan()] || getShiShenName(dayStem, timeStem),
                hiddenStems: (eightChar.getTimeHideGan() || []).map(toViGan),
                phoTinh: (eightChar.getTimeShiShenZhi() || []).map(x => CN_TO_VI_SHISHEN[x] || x)
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

        const yun = eightChar.getYun(isMale ? 1 : 0);
        const startYearNum = yun.getStartYear();
        const startMonthNum = yun.getStartMonth();
        const startDayNum = yun.getStartDay();
        const daYunList = yun.getDaYun();

        const daYunResult = [];
        for (let i = 1; i < Math.min(11, daYunList.length); i++) {
            const dy = daYunList[i];
            const dyGz = dy.getGanZhi();
            const dyStem = toViGan(dyGz[0]);
            const dyBranch = toViZhi(dyGz[1]);
            const dyShiShen = getShiShenName(dayStem, dyStem);

            const liuNianList = dy.getLiuNian();
            const lnResult = liuNianList.map(ln => {
                const lnGz = ln.getGanZhi();
                const lnStem = toViGan(lnGz[0]);
                const lnBranch = toViZhi(lnGz[1]);
                return {
                    year: ln.getYear(),
                    age: ln.getAge(),
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
                startAge: dy.getStartAge(),
                stem: dyStem,
                branch: dyBranch,
                ganZhi: dyStem + ' ' + dyBranch,
                shiShen: dyShiShen,
                stemColor: STEM_ELEMENTS[dyStem]?.color || '#8e5a2b',
                branchColor: BRANCH_ELEMENTS[dyBranch]?.color || '#8e5a2b',
                liuNian: lnResult
            });
        }

        // Thông tin Tiết Khí lệnh tháng
        const prevJie = lunar.getPrevJie();
        const nextJie = lunar.getNextJie();
        const prevJieName = prevJie ? toViSolarTerm(prevJie.getName()) : 'Lập Xuân';
        const nextJieName = nextJie ? toViSolarTerm(nextJie.getName()) : 'Kinh Trập';
        const jieStr = `Tiết ${prevJieName} bắt đầu ${prevJie ? prevJie.getSolar().toYmdHms() : ''} và kết thúc ${nextJie ? nextJie.getSolar().toYmdHms() : ''}`;

        return {
            name: name || 'VÔ DANH KHÁCH',
            gender: isMale ? 'nam' : 'nu',
            genderLabel,
            isForward,
            solarYear: year,
            solarMonth: month,
            solarDay: day,
            solarHour: hour,
            solarMinute: minute,
            solarStr: `${hour < 10 ? '0' + hour : hour}:${minute < 10 ? '0' + minute : minute} ${day < 10 ? '0' + day : day}/${month < 10 ? '0' + month : month}/${year}`,
            lunarStr: `${hour < 10 ? '0' + hour : hour}:${minute < 10 ? '0' + minute : minute} ${lunar.getDay() < 10 ? '0' + lunar.getDay() : lunar.getDay()}/${lunar.getMonth() < 10 ? '0' + lunar.getMonth() : lunar.getMonth()}/${lunar.getYear()}`,
            lunarYearGanZhi: yearStem + ' ' + yearBranch,
            banMenhNaYin: toViNaYin(eightChar.getYearNaYin()),
            pillars,
            yun: {
                startYearNum,
                startMonthNum,
                startDayNum,
                summaryText: `Nhập đại vận lúc ${startYearNum} tuổi ${startMonthNum} tháng. ${jieStr}`
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
