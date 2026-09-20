/**
 * receptionEngine.js - Lõi Phân Tích Tiếp Nhận (Reception Engine)
 * Source: William Lilly, Christian Astrology (1647), Chapter XIX & XX.
 *
 * NGUYÊN LÝ HORARY CỔ ĐIỂN:
 * - Tiếp nhận (Reception) xảy ra khi Hành tinh A đang ở trong phẩm giá của Hành tinh B.
 *   Khi đó, B được coi là "tiếp nhận" A (B receives A).
 * - Hành tinh tiếp nhận đóng vai trò như người chủ nhà hiếu khách đón tiếp vị khách đến thăm.
 * - Phải tính toán và hiển thị rõ ràng THEO TỪNG CHIỀU ĐỘC LẬP:
 *   Chiều 1: B tiếp nhận A qua phẩm giá nào (Domicile, Exaltation, Triplicity, Term, Face).
 *   Chiều 2: A tiếp nhận B qua phẩm giá nào.
 * - Nếu cả hai chiều cùng tiếp nhận -> Tiếp nhận lẫn nhau (Mutual Reception).
 * - TUYỆT ĐỐI KHÔNG gộp chung thành một con điểm vô nghĩa; tách bạch giải thích cho người mới.
 */

import { DOMICILES, EXALTATIONS, TRIPLICITIES, TERMS_LILLY, FACES_LILLY } from './traditionalDignities.js';

/**
 * Kiểm tra xem HostPlanet có tiếp nhận GuestPlanet (khi GuestPlanet đang ở kinh độ guestLongitude) hay không
 * @param {string} hostPlanetId - 'sun', 'moon', 'mercury', 'venus', 'mars', 'jupiter', 'saturn'
 * @param {string} guestPlanetId
 * @param {number} guestLongitude - Kinh độ hoàng đạo của hành tinh khách
 * @param {boolean} isDayChart - Ban ngày hay ban đêm
 * @returns {object} Chi tiết các tầng tiếp nhận
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

    // 1. Tiếp nhận bằng Chủ Cung / Bản Vị (Domicile)
    const dom = DOMICILES[hostPlanetId];
    if (dom && dom.signs.includes(signId)) {
        receptionTypes.push({
            type: 'domicile',
            nameVi: 'Chủ cung (Domicile)',
            power: 'Mạnh nhất',
            explanation: `Vì ${getPlanetNameVi(guestPlanetId)} đang ở ${getSignNameVi(signId)}, mà ${getSignNameVi(signId)} do ${getPlanetNameVi(hostPlanetId)} làm chủ.`
        });
    }

    // 2. Tiếp nhận bằng Tôn Quý (Exaltation)
    const ex = EXALTATIONS[hostPlanetId];
    if (ex && ex.sign === signId) {
        receptionTypes.push({
            type: 'exaltation',
            nameVi: 'Tôn quý (Exaltation)',
            power: 'Rất mạnh',
            explanation: `Vì ${getPlanetNameVi(guestPlanetId)} đang ở ${getSignNameVi(signId)}, nơi ${getPlanetNameVi(hostPlanetId)} được đắc địa tôn quý tối cao.`
        });
    }

    // 3. Tiếp nhận bằng Tam Hợp (Triplicity)
    const element = getSignElement(signId);
    if (element && TRIPLICITIES[element]) {
        const tripRuler = isDayChart ? TRIPLICITIES[element].day : TRIPLICITIES[element].night;
        if (tripRuler === hostPlanetId) {
            receptionTypes.push({
                type: 'triplicity',
                nameVi: `Tam hợp (${isDayChart ? 'Ngày' : 'Đêm'})`,
                power: 'Vừa phải',
                explanation: `Vì ${getPlanetNameVi(guestPlanetId)} đang ở cung nguyên tố ${getElementNameVi(element)}, mà ${getPlanetNameVi(hostPlanetId)} cai quản tam hợp này.`
            });
        }
    }

    // 4. Tiếp nhận bằng Giới Hạn (Term)
    const signTerms = TERMS_LILLY[signId];
    if (signTerms) {
        for (const t of signTerms) {
            if (degInSign < t.maxDeg) {
                if (t.planet === hostPlanetId) {
                    receptionTypes.push({
                        type: 'term',
                        nameVi: `Giới hạn (Term)`,
                        power: 'Nhỏ',
                        explanation: `Vì ${getPlanetNameVi(guestPlanetId)} đang nằm trong phân độ Term của ${getPlanetNameVi(hostPlanetId)} [0° đến ${t.maxDeg}°].`
                    });
                }
                break;
            }
        }
    }

    // 5. Tiếp nhận bằng Thập Phân Độ (Face)
    const signFaces = FACES_LILLY[signId];
    if (signFaces) {
        const faceIndex = Math.min(2, Math.floor(degInSign / 10));
        if (signFaces[faceIndex] === hostPlanetId) {
            receptionTypes.push({
                type: 'face',
                nameVi: `Thập phân độ (Face)`,
                power: 'Vi mô',
                explanation: `Vì ${getPlanetNameVi(guestPlanetId)} đang ở thập phân độ Face thứ ${faceIndex + 1} do ${getPlanetNameVi(hostPlanetId)} cai quản.`
            });
        }
    }

    if (receptionTypes.length === 0) return null;

    return {
        hostPlanetId,
        guestPlanetId,
        hostNameVi: getPlanetNameVi(hostPlanetId),
        guestNameVi: getPlanetNameVi(guestPlanetId),
        signId,
        signNameVi: getSignNameVi(signId),
        receptionTypes,
        summaryText: `${getPlanetNameVi(hostPlanetId)} tiếp nhận ${getPlanetNameVi(guestPlanetId)} bằng ${receptionTypes.map(r => r.nameVi).join(', ')}.`
    };
}

/**
 * Phân tích toàn diện cặp tiếp nhận hai chiều giữa hai hành tinh A và B
 * @param {object} planetA - { id, longitude }
 * @param {object} planetB - { id, longitude }
 * @param {boolean} isDayChart
 * @returns {object} Phân tích tiếp nhận 2 chiều hoàn chỉnh
 */
export function analyzePairReception(planetA, planetB, isDayChart = true) {
    const aReceivesB = evaluateSingleReception(planetA.id, planetB.id, planetB.longitude, isDayChart);
    const bReceivesA = evaluateSingleReception(planetB.id, planetA.id, planetA.longitude, isDayChart);

    const hasMutual = !!(aReceivesB && bReceivesA);
    let mutualDescription = '';

    if (hasMutual) {
        mutualDescription = `TIẾP NHẬN LẪN NHAU (Mutual Reception): Cả hai hành tinh đều ngụ tại phẩm giá của nhau, biểu thị sự tương trợ, đồng thuận và kết nối thuận lợi mạnh mẽ trong Horary.`;
    }

    return {
        planetAId: planetA.id,
        planetBId: planetB.id,
        aReceivesB,
        bReceivesA,
        hasMutual,
        mutualDescription
    };
}

/**
 * Quét toàn bộ tiếp nhận giữa 7 hành tinh truyền thống trong lá số
 * @param {Array<object>} planetsList - Mảng các hành tinh [{ id, nameVi, longitude }, ...]
 * @param {boolean} isDayChart
 * @returns {Array<object>} Danh sách tất cả các cặp có tiếp nhận
 */
export function scanAllReceptions(planetsList, isDayChart = true) {
    const main7 = ['sun', 'moon', 'mercury', 'venus', 'mars', 'jupiter', 'saturn'];
    const filtered = planetsList.filter(p => main7.includes(p.id));
    const results = [];

    for (let i = 0; i < filtered.length; i++) {
        for (let j = i + 1; j < filtered.length; j++) {
            const p1 = filtered[i];
            const p2 = filtered[j];
            const pair = analyzePairReception(p1, p2, isDayChart);
            if (pair.aReceivesB || pair.bReceivesA) {
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
