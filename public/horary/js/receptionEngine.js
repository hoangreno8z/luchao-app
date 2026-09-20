/**
 * receptionEngine.js - Lõi Phân Tích Tiếp Nhận (Reception Engine)
 * Source: Sahl ibn Bishr (The Introduction to the Science of the Judgments of the Stars) &
 *         William Lilly, Christian Astrology (1647), Chapter XIX & XX.
 *
 * NGUYÊN LÝ TIẾP NHẬN HORARY KINH ĐIỂN:
 * 1. Tiếp nhận (Reception) xảy ra khi Hành tinh A ngụ tại nơi Hành tinh B có phẩm giá (B tiếp nhận A).
 * 2. Tiêu chuẩn phẩm giá theo Sahl ibn Bishr:
 *    - Chủ cung (Domicile): ĐỦ ĐIỀU KIỆN.
 *    - Tôn quý (Exaltation): ĐỦ ĐIỀU KIỆN.
 *    - Phẩm giá nhỏ (Triplicity, Term, Face): Một phẩm giá đơn lẻ KHÔNG ĐỦ điều kiện tiếp nhận;
 *      bắt buộc phải kết hợp ít nhất 2 phẩm giá nhỏ (ví dụ: Triplicity + Term, Term + Face).
 * 3. Tách bạch hai trạng thái:
 *    - POTENTIAL (Tiềm năng): Quan hệ phẩm giá thuần túy, chưa có góc chiếu kết nối.
 *    - ACTIVE (Thực thi): Đã được kích hoạt nhờ có góc chiếu (Aspect) thực tế kết nối 2 hành tinh.
 * 4. Diễn giải Mutual Reception trung tính học thuật, không phán đoán chủ quan.
 */

import { DOMICILES, EXALTATIONS, TRIPLICITIES, TERMS_LILLY, FACES_LILLY } from './traditionalDignities.js';

/**
 * Kiểm tra xem HostPlanet có tiếp nhận GuestPlanet (khi GuestPlanet đang ở kinh độ guestLongitude) hay không
 * @param {string} hostPlanetId - 'sun', 'moon', 'mercury', 'venus', 'mars', 'jupiter', 'saturn'
 * @param {string} guestPlanetId
 * @param {number} guestLongitude - Kinh độ hoàng đạo của hành tinh khách
 * @param {boolean} isDayChart - Ban ngày hay ban đêm
 * @returns {object|null} Chi tiết các tầng tiếp nhận
 */
export function evaluateSingleReception(hostPlanetId, guestPlanetId, guestLongitude, isDayChart = true) {
    if (hostPlanetId === guestPlanetId) return null;

    let norm = guestLongitude % 360;
    if (norm < 0) norm += 360;
    const signIndex = Math.floor(norm / 30) % 12;
    const signList = ['aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo', 'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces'];
    const signId = signList[signIndex];
    const degInSign = norm - signIndex * 30;

    const receptionTypes = [];

    // 1. Tiếp nhận bằng Chủ Cung / Bản Vị (Domicile) - Phẩm giá lớn
    const dom = DOMICILES[hostPlanetId];
    if (dom && dom.signs.includes(signId)) {
        receptionTypes.push({
            type: 'domicile',
            nameVi: 'Chủ cung (Domicile)',
            power: 'Phẩm giá lớn',
            isMajor: true,
            explanation: `Vì ${getPlanetNameVi(guestPlanetId)} đang ở ${getSignNameVi(signId)}, do ${getPlanetNameVi(hostPlanetId)} làm chủ cung.`
        });
    }

    // 2. Tiếp nhận bằng Tôn Quý (Exaltation) - Phẩm giá lớn
    const ex = EXALTATIONS[hostPlanetId];
    if (ex && ex.sign === signId) {
        receptionTypes.push({
            type: 'exaltation',
            nameVi: 'Tôn quý (Exaltation)',
            power: 'Phẩm giá lớn',
            isMajor: true,
            explanation: `Vì ${getPlanetNameVi(guestPlanetId)} đang ở ${getSignNameVi(signId)}, nơi ${getPlanetNameVi(hostPlanetId)} được đắc địa tôn quý.`
        });
    }

    // 3. Tiếp nhận bằng Tam Hợp (Triplicity) - Phẩm giá nhỏ
    const element = getSignElement(signId);
    if (element && TRIPLICITIES[element]) {
        const tripRuler = isDayChart ? TRIPLICITIES[element].day : TRIPLICITIES[element].night;
        if (tripRuler === hostPlanetId) {
            receptionTypes.push({
                type: 'triplicity',
                nameVi: `Tam hợp (${isDayChart ? 'Ngày' : 'Đêm'})`,
                power: 'Phẩm giá nhỏ',
                isMajor: false,
                explanation: `Vì ${getPlanetNameVi(guestPlanetId)} ngụ tại tam hợp nguyên tố ${getElementNameVi(element)} do ${getPlanetNameVi(hostPlanetId)} cai quản.`
            });
        }
    }

    // 4. Tiếp nhận bằng Giới Hạn (Term) - Phẩm giá nhỏ
    const signTerms = TERMS_LILLY[signId];
    if (signTerms) {
        for (const t of signTerms) {
            if (degInSign < t.maxDeg) {
                if (t.planet === hostPlanetId) {
                    receptionTypes.push({
                        type: 'term',
                        nameVi: `Giới hạn (Term)`,
                        power: 'Phẩm giá nhỏ',
                        isMajor: false,
                        explanation: `Vì ${getPlanetNameVi(guestPlanetId)} đang nằm trong phân độ Term của ${getPlanetNameVi(hostPlanetId)} [0° đến ${t.maxDeg}°].`
                    });
                }
                break;
            }
        }
    }

    // 5. Tiếp nhận bằng Thập Phân Độ (Face) - Phẩm giá nhỏ
    const signFaces = FACES_LILLY[signId];
    if (signFaces) {
        const faceIndex = Math.min(2, Math.floor(degInSign / 10));
        if (signFaces[faceIndex] === hostPlanetId) {
            receptionTypes.push({
                type: 'face',
                nameVi: `Thập phân độ (Face)`,
                power: 'Phẩm giá nhỏ',
                isMajor: false,
                explanation: `Vì ${getPlanetNameVi(guestPlanetId)} đang ở thập phân độ Face thứ ${faceIndex + 1} do ${getPlanetNameVi(hostPlanetId)} quản hạt.`
            });
        }
    }

    if (receptionTypes.length === 0) return null;

    // =========================================================================
    // QUY TẮC PHẨM GIÁ THEO SAHL IBN BISHR:
    // - Domicile hoặc Exaltation: Đủ chuẩn tiếp nhận kinh điển.
    // - Triplicity, Term, Face: Một phẩm giá đơn lẻ KHÔNG ĐỦ; cần ít nhất 2 phẩm giá nhỏ.
    // =========================================================================
    const hasMajor = receptionTypes.some(r => r.isMajor);
    const minorCount = receptionTypes.filter(r => !r.isMajor).length;
    const isQualified = hasMajor || (minorCount >= 2);

    let sahlStatusVi = '';
    if (hasMajor) {
        sahlStatusVi = 'Đủ điều kiện tiếp nhận kinh điển (Qua phẩm giá lớn Domicile/Exaltation)';
    } else if (minorCount >= 2) {
        sahlStatusVi = `Đủ điều kiện tiếp nhận kinh điển (${minorCount} phẩm giá nhỏ phối hợp)`;
    } else {
        sahlStatusVi = 'Chưa đủ điều kiện tiếp nhận kinh điển (Chỉ có 1 phẩm giá nhỏ đơn lẻ theo chuẩn Sahl ibn Bishr)';
    }

    return {
        hostPlanetId,
        guestPlanetId,
        hostNameVi: getPlanetNameVi(hostPlanetId),
        guestNameVi: getPlanetNameVi(guestPlanetId),
        signId,
        signNameVi: getSignNameVi(signId),
        receptionTypes,
        hasMajor,
        minorCount,
        isQualified,
        sahlStatusVi,
        summaryText: `${getPlanetNameVi(hostPlanetId)} đón ${getPlanetNameVi(guestPlanetId)} qua ${receptionTypes.map(r => r.nameVi).join(', ')}.`
    };
}

/**
 * Phân tích toàn diện cặp tiếp nhận hai chiều giữa hai hành tinh A và B
 * @param {object} planetA - { id, longitude }
 * @param {object} planetB - { id, longitude }
 * @param {boolean} isDayChart
 * @param {object|null} connectingAspect - Góc chiếu thực tế kết nối A và B (nếu có)
 * @returns {object}
 */
export function analyzePairReception(planetA, planetB, isDayChart = true, connectingAspect = null) {
    const aReceivesB = evaluateSingleReception(planetA.id, planetB.id, planetB.longitude, isDayChart);
    const bReceivesA = evaluateSingleReception(planetB.id, planetA.id, planetA.longitude, isDayChart);

    // Tiếp nhận tương hỗ kinh điển yêu cầu cả hai chiều đều có phẩm giá và đạt chuẩn Sahl
    const hasMutual = !!(aReceivesB && bReceivesA && aReceivesB.isQualified && bReceivesA.isQualified);
    const hasAnyReception = !!(aReceivesB || bReceivesA);

    // Phân định Trạng thái Kích Hoạt (Active) vs Tiềm Năng (Potential)
    const isActive = !!(connectingAspect && ['APPLYING', 'EXACT', 'SEPARATING'].includes(connectingAspect.state));

    let activeStatus = isActive ? 'ACTIVE' : 'POTENTIAL';
    let activeStatusVi = isActive ? 'Đã kích hoạt qua góc chiếu' : 'Tiềm năng (Chưa kích hoạt qua góc chiếu)';
    let activeExplanation = '';

    if (isActive) {
        activeExplanation = `Tiếp nhận đã được kích hoạt nhờ góc chiếu ${connectingAspect.aspectNameVi} (${connectingAspect.stateVi}, sai số ${connectingAspect.orbFormatted}).`;
    } else {
        activeExplanation = `Hai hành tinh có quan hệ phẩm giá nhưng chưa có góc chiếu kết nối thực tế. Trong Horary kinh điển, tiếp nhận chỉ thực sự phát huy tác dụng cụ thể khi có sự kết nối của góc chiếu hoặc ánh sáng.`;
    }

    let mutualDescription = '';
    if (hasMutual) {
        mutualDescription = `TIẾP NHẬN TƯƠNG HỖ (Mutual Reception): Hai hành tinh cùng ngụ tại phẩm giá của nhau. Trong chiêm tinh kinh điển (Sahl ibn Bishr & William Lilly), đây là quan hệ thiện chí hoặc hoán đổi vị trí, nhưng cần kết hợp xét góc chiếu (aspect) và khả năng hoàn thành (perfection) để phán đoán diễn tiến sự việc.`;
    }

    return {
        planetAId: planetA.id,
        planetBId: planetB.id,
        aReceivesB,
        bReceivesA,
        hasMutual,
        hasAnyReception,
        isActive,
        activeStatus,
        activeStatusVi,
        activeExplanation,
        connectingAspect,
        mutualDescription
    };
}

/**
 * Quét toàn bộ tiếp nhận giữa 7 hành tinh truyền thống trong lá số
 * @param {Array<object>} planetsList - Mảng các hành tinh [{ id, nameVi, longitude }, ...]
 * @param {boolean} isDayChart
 * @param {Array<object>} aspectsList - Danh sách các góc chiếu đã tính trong lá số
 * @returns {Array<object>}
 */
export function scanAllReceptions(planetsList, isDayChart = true, aspectsList = []) {
    const main7 = ['sun', 'moon', 'mercury', 'venus', 'mars', 'jupiter', 'saturn'];
    const filtered = planetsList.filter(p => main7.includes(p.id));
    const results = [];

    for (let i = 0; i < filtered.length; i++) {
        for (let j = i + 1; j < filtered.length; j++) {
            const p1 = filtered[i];
            const p2 = filtered[j];

            // Tìm xem hai hành tinh này có góc chiếu kết nối nào không
            const connectingAsp = aspectsList.find(asp =>
                (asp.planetA.id === p1.id && asp.planetB.id === p2.id) ||
                (asp.planetA.id === p2.id && asp.planetB.id === p1.id)
            ) || null;

            const pair = analyzePairReception(p1, p2, isDayChart, connectingAsp);
            if (pair.hasAnyReception) {
                results.push(pair);
            }
        }
    }

    return results;
}

function getSignNameVi(id) {
    const names = {
        aries: 'Bạch Dương', taurus: 'Kim Ngưu', gemini: 'Song Tử', cancer: 'Cự Giải',
        leo: 'Sư Tử', virgo: 'Xử Nữ', libra: 'Thiên Bình', scorpio: 'Bọ Cạp',
        sagittarius: 'Nhân Mã', capricorn: 'Ma Kết', aquarius: 'Bảo Bình', pisces: 'Song Ngư'
    };
    return names[id] || id;
}

function getPlanetNameVi(id) {
    const names = {
        sun: 'Mặt Trời', moon: 'Mặt Trăng', mercury: 'Thủy Tinh',
        venus: 'Kim Tinh', mars: 'Hỏa Tinh', jupiter: 'Mộc Tinh', saturn: 'Thổ Tinh'
    };
    return names[id] || id;
}

function getSignElement(signId) {
    if (['aries', 'leo', 'sagittarius'].includes(signId)) return 'fire';
    if (['taurus', 'virgo', 'capricorn'].includes(signId)) return 'earth';
    if (['gemini', 'libra', 'aquarius'].includes(signId)) return 'air';
    if (['cancer', 'scorpio', 'pisces'].includes(signId)) return 'water';
    return null;
}

function getElementNameVi(elem) {
    const map = { fire: 'Hỏa', earth: 'Thổ', air: 'Khí', water: 'Thủy' };
    return map[elem] || elem;
}
