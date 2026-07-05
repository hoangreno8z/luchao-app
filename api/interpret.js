/**
 * Vercel Serverless Function - api/interpret.js
 * Tích hợp 4 khối Engine của luchao_engine.js + Supabase DB lookup + Gemini AI.
 */

import { runFullEngineAnalysis } from './luchao_engine.js';
import { FALLBACK_HEXAGRAMS_DB } from './fallback_db.js';

const COMPILED_KNOWLEDGE = {
  templates: {
    "công việc": {
      scenarios: {
        "CAT": {
          summary: "Công việc vô cùng hanh thông, cơ hội thăng tiến rộng mở.",
          detail: "Dụng thần Quan Quỷ vượng tướng và Hào Thế hưng vượng. Đây là thời cơ chín muồi để hành động, chuyển đổi công tác hoặc đảm nhận trọng trách mới.",
          advice: "Hãy chủ động nắm bắt cơ hội, khiêm tốn học hỏi và quyết đoán thực thi kế hoạch."
        },
        "HUNG": {
          summary: "Công việc gặp nhiều trắc trở, áp lực lớn, đề phòng rủi ro.",
          detail: "Dụng thần bị tổn hại nặng (hồi đầu khắc, tuần không hoặc nguyệt phá). Điềm báo mưu sự bất thành, dễ có tranh chấp hao tài hoặc áp lực nặng nề từ cấp trên.",
          advice: "Thời điểm này nên tĩnh không nên động. Tạm dừng dự án lớn, tránh tiểu nhân, củng cố nội lực."
        },
        "BINH": {
          summary: "Công việc tiến thoái lưỡng nan, có cơ hội nhưng bản thân mệt mỏi.",
          detail: "Tình trạng Dụng vượng Thế suy. Cơ hội có nhưng bản thân chưa đủ lực hoặc đang stress nên chưa gánh vác được.",
          advice: "Bồi bổ sức khỏe, phân bổ công việc hợp lý, không ôm đồm quá nhiều việc một lúc."
        }
      }
    },
    "tình yêu": {
      scenarios: {
        "CAT": {
          summary: "Tình duyên tốt đẹp, tình cảm thăng hoa ngọt ngào.",
          detail: "Sự cảm ứng sâu sắc giữa Thế và Dụng thần. Hai bên thấu hiểu nhau, gia đình ủng hộ, tiến tới hôn nhân viên mãn.",
          advice: "Trân trọng nhân duyên, chia sẻ chân thành để thắt chặt gắn kết."
        },
        "HUNG": {
          summary: "Tình duyên bất hòa, đề phòng rạn nứt hoặc chia rẽ.",
          detail: "Kỵ thần Huynh Đệ phát động khắc chế Dụng thần, hoặc hào Thế biến suy bại. Dễ hiểu lầm, cãi vã hoặc có người phá hoại.",
          advice: "Bình tĩnh lắng nghe, kiềm chế cái tôi, tránh quyết định vội vã lúc giận."
        },
        "BINH": {
          summary: "Tình duyên bình lặng, chưa có đột phá rõ rệt.",
          detail: "Dụng vượng Thế suy. Tình cảm vẫn còn nhưng có khoảng cách địa lý hoặc tâm lý chưa sẵn sàng.",
          advice: "Tạo cơ hội gặp gỡ chia sẻ nhiều hơn, đừng để im lặng kéo dài tạo khoảng cách."
        }
      }
    }
  }
};

COMPILED_KNOWLEDGE.templates['thi cử'] = COMPILED_KNOWLEDGE.templates['công việc'];
COMPILED_KNOWLEDGE.templates['kinh doanh'] = COMPILED_KNOWLEDGE.templates['công việc'];
COMPILED_KNOWLEDGE.templates['dự án'] = COMPILED_KNOWLEDGE.templates['công việc'];
COMPILED_KNOWLEDGE.templates['hôn nhân'] = COMPILED_KNOWLEDGE.templates['tình yêu'];
COMPILED_KNOWLEDGE.templates['sức khỏe'] = COMPILED_KNOWLEDGE.templates['công việc'];
COMPILED_KNOWLEDGE.templates['tìm kiếm'] = COMPILED_KNOWLEDGE.templates['công việc'];

const FALLBACK_TEXTS = {
    'THE_TRI_QUAN_QUY': 'Thế trì Quan Quỷ: Điềm báo người hỏi tâm lý đang lo âu, stress cực lớn hoặc thân thể có bệnh tật âm ỉ chưa giải tỏa được. Trong công việc chủ về gánh vác nhiều trách nhiệm nặng nề.',
    'THE_TRI_PHU_MAU': 'Thế trì Phụ Mẫu: Bản thân công việc rất vất vả cực nhọc, phải ôm đồm nhiều giấy tờ thủ tục hoặc chịu áp lực lớn từ phía ban lãnh đạo/sếp.',
    'THE_TRI_HUYNH_DE': 'Thế trì Huynh Đệ: Công việc đang gặp sự cạnh tranh gay gắt từ đồng nghiệp hoặc đối thủ. Mọi mưu cầu tài lộc giai đoạn này đều dễ bị thâm hụt tốn của.',
    'THE_TRI_THE_TAI': 'Thế trì Thê Tài: Tâm lý hướng về lợi nhuận, tiền bạc hoặc có tin mừng về lương thưởng, thu nhập dự án hanh thông cát khánh.',
    'THE_TRI_TU_TON': 'Thế trì Tử Tôn: Chủ về bản thân hướng tới sự tự do, chán nản cảnh gông cùm công sở. Đây là kỵ thần của Quan Quỷ nên việc cầu thăng chức lúc này bị cản trở lớn.',
    'QUE_TINH': 'Quẻ tĩnh: Mọi sự bình lặng, lực lượng hai bên ổn định.',
    'QUE_DONG': 'Quẻ động: Sự việc đang có biến chuyển mạnh mẽ.',
    'DUNG_STATUS_VUONG': 'Dụng thần Vượng Tướng: Lực lượng mạnh, triển vọng tốt.',
    'DUNG_STATUS_SUY': 'Dụng thần Hưu Tù: Lực yếu, sự việc chưa thuận.',
    'DUNG_STATUS_NGUYET_PHA': 'Dụng thần bị Nguyệt Phá: Sự việc bị phá vỡ, khó cứu vãn.',
    'DUNG_STATUS_TUAN_KHONG': 'Dụng thần lâm Tuần Không: Sự việc còn hư ảo, chưa thành hình.',
    'DUNG_STATUS_AM_DONG': 'Dụng thần Ám Động: Sự việc sẽ bộc phát nhanh, ngoài dự kiến.',
    'DUNG_STATUS_NHAT_PHA': 'Dụng thần bị Nhật Phá: Sự việc bị Ngày xung vỡ, động tán.',
    'DUNG_STATUS_MO': 'Dụng thần nhập Mộ: Bị giam hãm, năng lực bị che khuất, người hỏi đang ở trong hoàn cảnh bế tắc, bất lực không có cách nào tự thoát ra.',
    'DUNG_STATUS_PHUC_THAN': 'Dụng thần đang ẩn (Phục Thần), cần thời cơ mới hiển lộ.',
    'DUNG_STATUS_KHONG_CO_MAT': 'Dụng thần không xuất hiện: Việc hỏi không liên quan hoặc thời điểm chưa đúng.',
    'PHUC_THAN_BI_PHI_KHAC': 'Phục thần bị Phi thần áp chế: Thông tin ẩn giấu bị che khuất, việc mưu cầu gặp cản trở lớn.',
    'PHUC_THAN_DUOC_PHI_SINH': 'Phục thần được Phi thần nâng đỡ: Tiềm năng ẩn đang chờ cơ hội hiển lộ.',
    'PHUC_THAN_KHAC_PHI': 'Phục thần khắc Phi thần: Thông tin ẩn đang cố vượt ra ngoài ánh sáng.',
    'THE_STATUS_HOA_QUY': 'Hào Thế động hóa Quan Quỷ: Tự thân chiêu mời lo âu tai họa, đề phòng sếp khiển trách hoặc bệnh tật phát sinh.',
    'THE_STATUS_HOI_DAU_KHAC': 'Hào Thế Hồi đầu khắc: Tự thân hành động lại tự hại bản thân, việc làm lúc đầu tưởng thuận nhưng sau tự chuốc thất bại.',
    'PROPERTY_LUC_XUNG': 'Quẻ Lục Xung: Mọi việc diễn biến nhanh chóng, dứt điểm mau lẹ nhưng khó bền vững lâu dài.',
    'PROPERTY_LUC_HOP': 'Quẻ Lục Hợp: Gắn kết bền chặt, hợp tác đôi bên có lợi, mưu sự có quý nhân nâng đỡ.',
    'PROPERTY_DU_HON': 'Quẻ Du Hồn: Tâm lý bất định, hay thay đổi ý kiến, thích hợp đi xa hoặc làm việc lưu động.',
    'PROPERTY_QUY_HON': 'Quẻ Quy Hồn: Quay về ổn định nơi cũ, người đi xa sắp quay về, mưu sự nên giữ nguyên trạng.',
    'PROPERTY_PHAN_NGAM': 'Phản Ngâm: Hai chiều đối nghịch gay gắt, mọi việc đảo lộn, lặp đi lặp lại nhiều lần gây mệt mỏi.',
    'PROPERTY_PHUC_NGAM': 'Phục Ngâm: Sự việc vòng quẩn, không tiến lên được, tiến thoái lưỡng nan, lòng đầy đau khổ.',
    'PATTERN_BACH_HO_DONG_TAI_BENH': 'Cảnh báo: Bạch Hổ phát động chủ về tai nạn đột xuất, bệnh phát rất nhanh hoặc có sự xung đột gay gắt trực diện.',
    'PATTERN_THE_DANG_XA_TK_LO_AO': 'Tượng pháp: Thế lâm Đằng Xà ngộ Tuần Không chủ về người hỏi đang lo âu hoang mang mơ hồ, thực chất sự việc không nguy hiểm như bạn nghĩ.',
    'PATTERN_THANH_LONG_TAI_DONG_TIN_VUI': 'Tượng pháp: Thanh Long cùng Thê Tài phát động chủ về có hỉ khánh, tài lộc vượng phát, đón nhận tin vui lớn về tiền bạc hoặc nhân duyên.',
    'PATTERN_CHU_TUOC_QUAN_DONG_TRANH_CHAP': 'Tượng pháp: Chu Tước cùng Quan Quỷ phát động chủ về có cãi vã, tranh chấp pháp lý hoặc bị tiểu nhân gièm pha gièm pha công danh.',
    'PATTERN_DANG_XA_QUAN_DONG_AP_LUC': 'Tượng pháp thực chiến: Quan Quỷ phát động lâm Đằng Xà chủ về công việc sắp có sự điều chuyển đột ngột tạo áp lực tâm lý cực lớn hoặc hệ thống gặp sự cố bất ngờ.',
    'PATTERN_CHU_TUOC_PHU_DONG_VAN_BAN': 'Tượng pháp thực chiến: Phụ Mẫu lâm Chu Tước phát động chủ về có quyết định hành chính chính thức bằng văn bản hoặc thông báo bổ nhiệm được công bố.',
    'PATTERN_HUYEN_VU_TAI_TK_THAT_THOAT': 'Tượng pháp thực chiến: Thê Tài lâm Huyền Vũ ngộ Tuần Không chủ về rủi ro thất thoát tài chính âm thầm, đối tác mờ ám hoặc có gian lận tiền bạc ngầm.',
    'PATTERN_BACH_HO_HUYNH_DONG_TRANH_DOAT': 'Tượng pháp thực chiến: Huynh Đệ phát động lâm Bạch Hổ chủ về đối thủ cạnh tranh quyết liệt nhằm đoạt quyền lợi, hoặc chi phí dự án bị thâm hụt lớn.',
    'PATTERN_DICH_MA_DONG_BIEN_DONG': 'Thần sát: Hào động lâm Dịch Mã đại diện cho sự biến động mạnh mẽ về không gian, có điềm báo đi du lịch, đi công tác xa, xuất ngoại hoặc điều chuyển công tác rất nhanh chóng.',
    'PATTERN_DAO_HOA_DONG_DUYEN_VONG': 'Thần sát: Hào động lâm Đào Hoa là tượng có tin vui lớn về nhân duyên, tình cảm đôi lứa thăng hoa vượng phát hoặc công việc xuất hiện nhiều khách hàng/đối tác mến mộ.',
    'PATTERN_HOA_CAI_DONG_NGHE_THUAT': 'Thần sát: Hào động lâm Hoa Cái chủ về trí tuệ hanh thông, thích hợp cho việc nghiên cứu học tập chuyên sâu, phát triển kỹ năng nghệ thuật hoặc tôn giáo.'
};

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

    if (req.method === 'OPTIONS') { res.status(200).end(); return; }

    let hex_id, changed_id, topic, gender, hexData, userInputs;
    if (req.method === 'POST') {
        ({ hex_id, changed_id, topic, gender, hexData, userInputs } = req.body);
    } else {
        ({ hex_id, changed_id, topic, gender } = req.query);
    }

    if (!hex_id) return res.status(400).json({ error: 'Missing hex_id parameter' });

    // ===========================================================================
    // MA TRẬN TOÁN HỌC NGŨ HÀNH SINH KHẮC 5x5 TRÊN RAM (BÁNH RĂNG ĐỒNG HỒ)
    // ===========================================================================
    const NGU_HANH_LIST = ['Mộc', 'Hỏa', 'Thổ', 'Kim', 'Thủy'];
    const SHENG_KE_MATRIX = [
        // Target: Mộc(0), Hỏa(1), Thổ(2), Kim(3), Thủy(4)
        /* Src: Mộc */ [0.5,    1,      -1,     -0.5,   0],
        /* Src: Hỏa */ [0,      0.5,    1,      -1,     -0.5],
        /* Src: Thổ */ [-0.5,   0,      0.5,    1,      -1],
        /* Src: Kim */ [-1,     -0.5,   0,      0.5,    1],
        /* Src: Thủy */ [1,     -1,     -0.5,   0,      0.5]
    ];

    // Hàm tra cứu sinh khắc qua tọa độ ma trận
    const getShengKeRelation = (srcHanh, targetHanh) => {
        const srcIdx = NGU_HANH_LIST.indexOf(srcHanh);
        const targetIdx = NGU_HANH_LIST.indexOf(targetHanh);
        if (srcIdx === -1 || targetIdx === -1) return 0;
        return SHENG_KE_MATRIX[srcIdx][targetIdx];
    };

    const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_KEY || process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    let dbMainHex = null, dbChangedHex = null, dbLines = [], dbSemanticTexts = [];
    let dbTuongCoBan = [], dbTuongDaTang = [], dbTuongDongBien = [];

    // ===========================================================================
    // BỘ NHÂN 4 KHỐI - PHÂN TÍCH ĐA CHIỀU
    // ===========================================================================
    let engineResult = null;
    let generatedCodes = [];

    if (hexData && hexData.linesData) {
        try {
            engineResult = runFullEngineAnalysis(hexData, topic, gender);
            generatedCodes = engineResult.allCodes;
        } catch (err) {
            console.error('Engine analysis error:', err.message);
        }
    }

    // ===========================================================================
    // TRUY XUẤT DATABASE SONG SONG (TỰ PHỤC HỒI NẾU NULL/LỖI)
    // ===========================================================================
    if (supabaseUrl && supabaseKey) {
        try {
            const H = {
                'apikey': supabaseKey,
                'Authorization': `Bearer ${supabaseKey}`,
                'Content-Type': 'application/json'
            };
            const G = (url) => fetch(url, { headers: H }).then(r => r.json()).catch(() => []);

            // Chuẩn hóa tên chủ đề sang mã DB
            const topicCode = {
                'công việc': 'cong_viec', 'thi cử': 'cong_viec',
                'tình yêu': 'tinh_yeu',  'hôn nhân': 'tinh_yeu',
                'sức khỏe': 'suc_khoe',  'kinh doanh': 'kinh_doanh',
                'dự án': 'kinh_doanh',   'chứng khoán': 'chung_khoan',
                'bất động sản': 'bat_dong_san'
            }[topic] || 'cong_viec';

            const codeList = generatedCodes.map(c => `"${c}"`).join(',');

            // Xây dựng tham số cho tuong_da_tang từ enrichedLines của engine
            const enriched = engineResult?.enrichedLines || [];
            const tuongDaTangFilters = enriched.map((line, i) => {
                const lucThan = encodeLucThan(line.relation);
                const lucThu = encodeLucThu(line.lucThu);
                const trangThai = line.isMoving ? 'dong' : line.isTK ? 'tuan_khong' : line.isAmDong ? 'am_dong' : line.isNguyetPha ? 'nguyet_pha' : line.isMoDay || line.isMoMonth ? 'nhap_mo' : 'tinh';
                return `(hao_vi.eq.${i + 1},luc_than.eq.${lucThan},trang_thai.eq.${trangThai})`;
            }).filter(Boolean);

            // Xây dựng tham số cho tuong_dong_bien từ energyVectors của engine
            const vectors = engineResult?.energyVectors || [];
            const huongBienMap = {
                'HOI_DAU_KHAC': 'hoi_dau_khac', 'HOI_DAU_SINH': 'hoi_dau_sinh',
                'HOA_TIEN_THAN': 'hoa_tien', 'HOA_THOAI_THAN': 'hoa_thoai',
                'BINH_HOA': null
            };

            const B = `${supabaseUrl}/rest/v1`;

            const [mainRes, changedRes, linesRes, semanticRes, tuongCoBanRes, tuongDaTangRes, tuongDongBienRes] = await Promise.all([
                // 1. Bảng quẻ chính
                G(`${B}/hexagrams?id=eq.${hex_id}`),
                // 2. Bảng quẻ biến
                changed_id ? G(`${B}/hexagrams?id=eq.${changed_id}`) : Promise.resolve([]),
                // 3. Bảng hào
                G(`${B}/lines?hexagram_id=eq.${hex_id}`),
                // 4. Bảng semantic_texts (mã hóa cũ - giữ lại backward compat)
                codeList ? G(`${B}/semantic_texts?code=in.(${codeList})`) : Promise.resolve([]),
                // 5. [MỚI] tuong_co_ban - lấy nghĩa gốc theo chủ đề
                G(`${B}/tuong_co_ban?chu_de=eq.${topicCode}&select=luc_than,luc_thu,y_nghia`),
                // 6. [MỚI] tuong_da_tang - tổ hợp đặc hiệu theo hào + trạng thái
                G(`${B}/tuong_da_tang?chu_de=in.(${topicCode},all)&select=hao_vi,luc_than,luc_thu,trang_thai,mo_ta_tuong`),
                // 7. [MỚI] tuong_dong_bien - pha động biến
                vectors.length > 0
                    ? G(`${B}/tuong_dong_bien?chu_de=in.(${topicCode},all)&select=luc_than_goc,luc_than_bien,huong_bien,mo_ta_bien`)
                    : Promise.resolve([])
            ]);

            dbMainHex        = mainRes?.[0] || null;
            dbChangedHex     = changedRes?.[0] || null;
            dbLines          = linesRes || [];
            dbSemanticTexts  = semanticRes || [];
            dbTuongCoBan     = tuongCoBanRes || [];
            dbTuongDaTang    = tuongDaTangRes || [];
            dbTuongDongBien  = tuongDongBienRes || [];
        } catch (err) {
            console.error('Supabase query failed:', err.message);
        }
    }

    // fallback local data
    const fallbackMain = getFallbackHex(parseInt(hex_id));
    const fallbackChanged = changed_id ? getFallbackHex(parseInt(changed_id)) : null;

    const mainName = dbMainHex?.name || fallbackMain.name;
    const palaceName = dbMainHex?.palace || fallbackMain.palace;
    const vietnameseMeaning = dbMainHex?.vietnamese_meaning || fallbackMain.meaning;
    const overallMeaning = dbMainHex?.overall_meaning || fallbackMain.overall;

    let topicMeaning = overallMeaning;
    if (['công việc', 'thi cử'].includes(topic)) topicMeaning = dbMainHex?.career_meaning || fallbackMain.overall;
    else if (['tình yêu', 'hôn nhân'].includes(topic)) topicMeaning = dbMainHex?.love_meaning || fallbackMain.overall;
    else if (topic === 'sức khỏe') topicMeaning = dbMainHex?.health_meaning || fallbackMain.overall;
    else if (['kinh doanh', 'dự án'].includes(topic)) topicMeaning = dbMainHex?.wealth_meaning || fallbackMain.overall;

    // Nếu Supabase không trả về Hào từ, lấy Hào từ từ fallback database để hiển thị đầy đủ
    if (dbLines.length === 0 && fallbackMain.lines) {
        dbLines = Object.keys(fallbackMain.lines).map(hKey => {
            const hNum = parseInt(hKey);
            // Lấy Lục Thân tương ứng từ hexData.linesData để hiển thị chính xác
            const matchedLine = hexData?.linesData?.[hNum - 1];
            return {
                line_number: hNum,
                relation: matchedLine?.relation || 'Hào ' + hNum,
                meaning_static: fallbackMain.lines[hKey].static,
                meaning_active: fallbackMain.lines[hKey].active
            };
        });
    }

    // ===========================================================================
    // TỔNG HỢP VĂN BẢN PHÂN TÍCH: 6 LỚP NGUỒN DỮ LIỆU
    // Thứ tự ưu tiên: DB semantic → tuong_da_tang → tuong_dong_bien → tuong_co_ban → fallback → engine
    // ===========================================================================
    const analysisTextsList = [];
    const processedCodes = new Set();

    // LỚP 1: semantic_texts cũ (backward compat, ưu tiên cao nhất)
    dbSemanticTexts.forEach(row => {
        analysisTextsList.push(`📌 ${row.vietnamese_text}`);
        processedCodes.add(row.code);
    });

    // LỚP 2: tuong_da_tang — khớp từng hào theo (hao_vi, luc_than, trang_thai)
    if (dbTuongDaTang.length > 0 && engineResult?.enrichedLines) {
        const enriched = engineResult.enrichedLines;
        enriched.forEach((line, i) => {
            const lucThan = encodeLucThan(line.relation);
            const trangThai = line.isMoving ? 'dong'
                : line.isTK ? 'tuan_khong'
                : line.isAmDong ? 'am_dong'
                : line.isNguyetPha ? 'nguyet_pha'
                : (line.isMoDay || line.isMoMonth) ? 'nhap_mo'
                : 'tinh';
            const lucThu = encodeLucThu(line.lucThu);
            const haoNum = i + 1;

            // Khớp chính xác: hào vi + lục thân + trạng thái
            const exact = dbTuongDaTang.find(r =>
                r.hao_vi === haoNum && r.luc_than === lucThan && r.trang_thai === trangThai
            );
            if (exact) {
                analysisTextsList.push(`🎯 Hào ${haoNum} (${line.relation}·${line.lucThu}·${trangThai}): ${exact.mo_ta_tuong}`);
                return;
            }
            // Khớp mở rộng: bỏ qua hao_vi (hao_vi IS NULL = áp dụng mọi hào)
            const broad = dbTuongDaTang.find(r =>
                r.hao_vi === null && r.luc_than === lucThan && r.trang_thai === trangThai
            );
            if (broad) {
                analysisTextsList.push(`🎯 Hào ${haoNum} (${line.relation}·${trangThai}): ${broad.mo_ta_tuong}`);
            }
        });
    }

    // LỚP 3: tuong_dong_bien — khớp theo (luc_than_goc, luc_than_bien, huong_bien) của mỗi vec-tơ
    if (dbTuongDongBien.length > 0 && engineResult?.energyVectors) {
        const huongBienMap = {
            'HOI_DAU_KHAC': 'hoi_dau_khac', 'HOI_DAU_SINH': 'hoi_dau_sinh',
            'HOA_TIEN_THAN': 'hoa_tien', 'HOA_THOAI_THAN': 'hoa_thoai'
        };
        engineResult.energyVectors.forEach(v => {
            const goc  = encodeLucThan(v.relation);
            const bien = encodeLucThan(v.changedRelation);
            const huong = huongBienMap[v.vector];
            if (!huong) return;
            const match = dbTuongDongBien.find(r =>
                r.luc_than_goc === goc && r.luc_than_bien === bien && r.huong_bien === huong
            );
            if (match) {
                analysisTextsList.push(`🔄 Hào ${v.lineNum} động biến (${huong}): ${match.mo_ta_bien}`);
            } else if (v.vectorText) {
                // fallback sang text engine tính toán nếu DB chưa có
                analysisTextsList.push(`⚡ Hào ${v.lineNum}: ${v.vectorText}`);
            }
        });
    } else {
        // Không có DB → dùng văn bản engine tính sẵn
        engineResult?.vectorTexts.forEach(v => {
            analysisTextsList.push(`⚡ Hào ${v.lineNum}: ${v.text}`);
        });
    }

    // LỚP 4: tuong_co_ban — bổ sung từ vựng nền tảng của hào Dụng Thần và Thế
    if (dbTuongCoBan.length > 0 && engineResult) {
        const dungRel  = encodeLucThan(engineResult.targetRelation);
        const dungBase = dbTuongCoBan.find(r => r.luc_than === dungRel && !r.luc_thu);
        if (dungBase) {
            analysisTextsList.push(`📖 Dụng Thần (${engineResult.targetRelation}) trong chủ đề này: ${dungBase.y_nghia}`);
        }
        // Lục Thú của Dụng Thần
        const dungLine = engineResult.enrichedLines?.find(l => l.relation === engineResult.targetRelation);
        if (dungLine) {
            const lucThuCode = encodeLucThu(dungLine.lucThu);
            const thuBase = dbTuongCoBan.find(r => r.luc_thu === lucThuCode && !r.luc_than);
            if (thuBase) {
                analysisTextsList.push(`📖 ${dungLine.lucThu} trong chủ đề này: ${thuBase.y_nghia}`);
            }
        }
    }

    // LỚP 5: Phục Thần từ Khối 1
    if (engineResult?.phucThanResult.found) {
        const pt = engineResult.phucThanResult;
        analysisTextsList.push(`🔍 Phục Thần: ${engineResult.targetRelation} đang ẩn dưới Hào ${pt.hostIdx + 1} (${pt.hostLine.relation}), chi ${pt.phucLine.branch}.`);
    }

    // LỚP 6: Fallback text từ mã engine (các mã chưa match DB)
    generatedCodes.forEach(code => {
        if (!processedCodes.has(code) && FALLBACK_TEXTS[code]) {
            analysisTextsList.push(FALLBACK_TEXTS[code]);
        }
    });


    // 4. Thêm phân tích Phục Thần từ Khối 1
    if (engineResult?.phucThanResult.found) {
        const pt = engineResult.phucThanResult;
        analysisTextsList.push(`🔍 Phục Thần: ${engineResult.targetRelation} đang ẩn dưới Hào ${pt.hostIdx + 1} (${pt.hostLine.relation}), chi ${pt.phucLine.branch}.`);
    }

    // ===========================================================================
    // HỆ THỐNG TRỌNG SỐ NGUYÊN TỬ VÀ MA TRẬN PHÂN TÍCH TRÊN RAM (INFERENCE ENGINE)
    // ===========================================================================
    let baseScore = 0; // Điểm khởi điểm mặc định (State = Bình Hòa)
    let multiplier = 1.0; // Hệ số nhân (Ví dụ Nguyệt phá làm giảm 50% sức vượng)

    // Khai báo bảng Trọng số nguyên tử (Atomic Weights)
    const ATOMIC_WEIGHTS = {
        'DUNG_STATUS_VUONG': 30,
        'DUNG_STATUS_SUY': -20,
        'DUNG_STATUS_AM_DONG': 20,
        'DUNG_STATUS_TUAN_KHONG': -25,
        'DUNG_STATUS_MO': -20,
        'DUNG_STATUS_NHAT_PHA': -40,
        'DUNG_STATUS_PHUC_THAN': -10,
        'THE_STATUS_HOA_QUY': -20,
        'THE_STATUS_HOI_DAU_KHAC': -60,
        'THE_STATUS_HOI_DAU_SINH': 30,
        'PROPERTY_LUC_HOP': 15,
        'PROPERTY_LUC_XUNG': -15,
        'PATTERN_DICH_MA_DONG_BIEN_DONG': 10,
        'PATTERN_DAO_HOA_DONG_DUYEN_VONG': 15,
        'PATTERN_HOA_CAI_DONG_NGHE_THUAT': 10
    };

    // Khai báo các hệ số nhân (Multipliers)
    const ATOMIC_MULTIPLIERS = {
        'DUNG_STATUS_NGUYET_PHA': 0.5 // Làm giảm 50% năng lượng cát lành
    };

    // 1. Áp dụng các quy tắc hạt cơ bản trong quẻ
    generatedCodes.forEach(code => {
        if (ATOMIC_WEIGHTS[code] !== undefined) {
            baseScore += ATOMIC_WEIGHTS[code];
        }
        if (ATOMIC_MULTIPLIERS[code] !== undefined) {
            multiplier *= ATOMIC_MULTIPLIERS[code];
        }
    });

    // 2. Tính toán sinh khắc động học từ Nhật/Nguyệt qua Ma trận 5x5
    if (engineResult && engineResult.targetRelation && hexData && hexData.linesData) {
        const targetLine = hexData.linesData.find(l => l.relation === engineResult.targetRelation);
        if (targetLine) {
            const targetHanh = targetLine.hanh || 'Thổ';
            
            // Xung khắc từ Nhật Thần (Ngày)
            const nhatHanh = NGU_HANH_LIST.indexOf(hexData.nhatThan) !== -1 ? hexData.nhatThan : 'Thổ';
            const nhatRelationValue = getShengKeRelation(nhatHanh, targetHanh); // Tra cứu ma trận
            baseScore += nhatRelationValue * 20; // Trọng số tác động của Ngày

            // Xung khắc từ Nguyệt Lệnh (Tháng)
            const nguyetHanh = NGU_HANH_LIST.indexOf(hexData.nguyetLenh) !== -1 ? hexData.nguyetLenh : 'Thổ';
            const nguyetRelationValue = getShengKeRelation(nguyetHanh, targetHanh); // Tra cứu ma trận
            baseScore += nguyetRelationValue * 20; // Trọng số tác động của Tháng
        }
    }

    // 3. Phép tính Cát hung cuối cùng
    const finalScore = baseScore * multiplier;

    // 4. Conflict Resolver & Fallback Hierarchy (Hệ thống phân cấp ưu tiên)
    // Ngưỡng phân định: Cát > 10 điểm, Hung < -10 điểm, còn lại rơi xuống mặc định "Bình hòa"
    let catHung = 'BINH'; 
    if (finalScore > 10) catHung = 'CAT';
    else if (finalScore < -10) catHung = 'HUNG';

    // Cơ chế Fallback Template (không bao giờ lỗi Null)
    const topicTemplates = COMPILED_KNOWLEDGE.templates[topic] || COMPILED_KNOWLEDGE.templates['công việc'];
    const scenarioText = (topicTemplates && topicTemplates.scenarios) ? topicTemplates.scenarios[catHung] : {
        summary: "Sự việc bình hòa, cục diện ổn định.",
        detail: "Năng lượng ngũ hành cân bằng. Không có biến động lớn đe dọa hay mang lại bứt phá đột ngột, mưu sự cần tiến bước thận trọng.",
        advice: "Giữ tâm thế bình tĩnh, củng cố nền tảng cũ trước khi hướng tới thay đổi lớn."
    };

    // ===========================================================================
    // GEMINI AI BIÊN TẬP CÁ NHÂN HÓA (TASK-LOCKED)
    // ===========================================================================
    let aiExplanation = '';
    const geminiKey = process.env.GEMINI_API_KEY;
    let hoaGiaiAdvice = "";

    if (engineResult && engineResult.targetRelation) {
        const targetLine = hexData?.linesData?.find(l => l.relation === engineResult.targetRelation);
        if (targetLine) {
            const dungHanh = targetLine.hanh || 'Thủy';
            const kyThanMap = { 'Quan Quỷ': 'Tử Tôn', 'Phụ Mẫu': 'Thê Tài', 'Thê Tài': 'Huynh Đệ', 'Tử Tôn': 'Phụ Mẫu', 'Huynh Đệ': 'Quan Quỷ' };
            const kyThanRel = kyThanMap[engineResult.targetRelation];
            const kyLine = hexData?.linesData?.find(l => l.relation === kyThanRel);
            const kyHanh = kyLine?.hanh || 'Thổ';

            const hoaGiaiList = {
                'Thổ_Thủy': 'Sử dụng ngũ hành KIM để thông quan: Đeo trang sức bằng vàng/bạc hình tròn, hoặc đặt vật phẩm bằng đồng ở hướng Tây/Tây Bắc phòng làm việc để hóa giải áp lực từ Kỵ thần Thổ.',
                'Kim_Mộc': 'Sử dụng ngũ hành THỦY để thông quan: Đặt một bể cá nhỏ hoặc bình nước sạch ở hướng Bắc phòng làm việc để làm dịu điềm hung hiểm và hóa giải xung đột.',
                'Mộc_Thổ': 'Sử dụng ngũ hành HỎA để thông quan: Bật đèn sáng tại phía Nam, tăng cường dùng tông màu đỏ/hồng để chuyển hóa lực cản từ Mộc thành động lực phát triển.',
                'Hỏa_Kim': 'Sử dụng ngũ hành THỔ để thông quan: Đặt các vật phẩm bằng gốm sứ, đất nung hoặc thạch anh vàng tại khu vực Đông Bắc/Tây Nam để làm bệ đỡ vững chắc cho công việc.',
                'Thủy_Hỏa': 'Sử dụng ngũ hành MỘC để thông quan: Trồng cây cảnh xanh tốt hoặc sử dụng các đồ dùng bằng gỗ tự nhiên ở phía Đông/Đông Nam để hút tà khí và sinh trợ bản mệnh.'
            };
            const key = `${kyHanh}_${dungHanh}`;
            hoaGiaiAdvice = hoaGiaiList[key] || "";
        }
    }

    if (geminiKey && userInputs && hexData && analysisTextsList.length > 0) {
        try {
            const promptData = {
                user_gender: gender,
                user_question: userInputs.question || 'Không có câu hỏi cụ thể',
                user_desire: userInputs.desire || 'Không rõ',
                hex_name: mainName, hex_palace: palaceName,
                calculated_canghung: catHung === 'CAT' ? 'Cát' : catHung === 'HUNG' ? 'Hung' : 'Bình hòa',
                technical_findings: analysisTextsList.join('\n'),
                topic_meaning: topicMeaning,
                advice: (scenarioText?.advice || '') + (hoaGiaiAdvice ? `\n\n[Bí quyết Hóa giải phong thủy Vương Hổ Ứng]: ${hoaGiaiAdvice}` : '')
            };

            const systemPrompt = `Bạn là một bậc thầy Kinh Dịch Lục Hào giàu kinh nghiệm thực chiến, tinh thông học thuyết Vương Hổ Ứng và Chu Thần Bân.
Nhiệm vụ của bạn là đọc các dữ liệu phân tích kỹ thuật thô và tổng hợp lại thành một bài luận giải cá nhân hóa mượt mà, sâu sắc, có hồn và mang văn phong của một người thầy thực sự: điềm đạm, thấu hiểu, uy nghiêm nhưng tràn đầy sự định hướng chân thành.

NGUYÊN TẮC TUYỆT ĐỐI:
1. KHÔNG được tự tính toán lại ngũ hành, không thay đổi kết luận Cát/Hung/Bình của quẻ đầu vào.
2. KHÔNG bịa đặt thêm các yếu tố kỹ thuật ngoài dữ liệu thô cung cấp.
3. Hành văn bằng tiếng Việt chính thống, xưng hô tôn trọng phù hợp với giới tính người xem (Nam/Nữ).
4. Phân tích rõ ràng nguyên nhân tại sao Cát hay Hung dựa trên tình trạng của Hào Thế và Dụng Thần (Vượng, Suy, Phá, Không, Mộ).

Bố cục trình bày bắt buộc gồm 4 phần:
I. CHIÊM NGHIỆM HIỆN TRẠNG TÂM LÝ & HOÀN CẢNH (Dùng thông tin Hào Thế trì Lục thân và Hào tâm niệm để chỉ ra tâm tư thật của người xem)
II. ĐÁNH GIÁ CÁT HUNG & DIỄN BIẾN (Chỉ rõ nguyên nhân theo Ngũ Hành, Nhật Nguyệt sinh khắc)
III. CHI TIẾT SỰ VIỆC BÊN NGOÀI (Diễn giải ý nghĩa các Thần sát Dịch mã, Đào hoa, Lục thú phát động)
IV. LỜI KHUYÊN DỊCH LÝ & HÓA GIẢI PHONG THỦY (Lời khuyên hành sự kết hợp với Bí pháp thông quan Vương Hổ Ứng)`;

            const response = await fetch(
                `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ contents: [{ parts: [{ text: `${systemPrompt}\n\nDỮ LIỆU:\n${JSON.stringify(promptData, null, 2)}` }] }] })
                }
            );
            const resJson = await response.json();
            aiExplanation = resJson.candidates?.[0]?.content?.parts?.[0]?.text || '';
        } catch (err) {
            console.error('Gemini API error:', err.message);
        }
    }

    // ===========================================================================
    // CƠ CHẾ DỰ PHÒNG NẾU AI STUDIO LỖI (FALLBACK EXPERT GENERATOR)
    // ===========================================================================
    if (!aiExplanation && userInputs) {
        aiExplanation = `
I. CHIÊM NGHIỆM HIỆN TRẠNG TÂM LÝ & HOÀN CẢNH:
Chủ sự đang mưu cầu việc về [${topic.toUpperCase()}]. Hào Thế đang phản ánh trạng thái năng lượng thực tế của bạn đối với sự việc này. Dữ liệu quẻ dịch chỉ ra tâm tư của bạn đang có sự băn khoăn, áp lực nhất định cần được củng cố.

II. ĐÁNH GIÁ CÁT HUNG & DIỄN BIẾN:
Kết luận chung của quẻ dịch là: **${catHung === 'CAT' ? 'CÁT TƯỜNG (TỐT LÀNH)' : catHung === 'HUNG' ? 'BẤT LỢI (HUNG)' : 'BÌNH HÒA'}**.
- Ý nghĩa quẻ chủ: ${mainName} chỉ ra ${overallMeaning}
- Phân tích tương tác ngũ hành: 
  ${analysisTextsList.join('\n  ')}

III. LỜI KHUYÊN DỊCH LÝ & HÓA GIẢI PHONG THỦY:
${scenarioText.advice || 'Tùy thời hành sự, giữ vững chính đạo.'}
`;
        if (hoaGiaiAdvice) {
            aiExplanation += `\n[Bí pháp Hóa giải phong thủy Vương Hổ Ứng]: ${hoaGiaiAdvice}`;
        }
    }

    // ===========================================================================
    // TRẢ KẾT QUẢ
    // ===========================================================================
    const deityMap = {
        'công việc': 'Quan Quỷ', 'thi cử': 'Phụ Mẫu',
        'tình yêu': gender === 'Nam' ? 'Thê Tài' : 'Quan Quỷ',
        'hôn nhân': gender === 'Nam' ? 'Thê Tài' : 'Quan Quỷ',
        'sức khỏe': 'Tử Tôn', 'kinh doanh': 'Thê Tài', 'dự án': 'Thê Tài'
    };
    const targetRel = engineResult?.targetRelation || deityMap[topic] || 'Quan Quỷ';
    const kyThan = { 'Quan Quỷ': 'Tử Tôn', 'Phụ Mẫu': 'Thê Tài', 'Thê Tài': 'Huynh Đệ', 'Tử Tôn': 'Phụ Mẫu', 'Huynh Đệ': 'Quan Quỷ' };

    return res.status(200).json({
        success: true,
        source: dbMainHex ? 'supabase' : 'local_fallback',
        main: { name: mainName, palace: palaceName, vietnamese_meaning: vietnameseMeaning, overall_meaning: overallMeaning, topic_meaning: topicMeaning },
        changed: fallbackChanged ? {
            name: dbChangedHex?.name || fallbackChanged.name,
            palace: dbChangedHex?.palace || fallbackChanged.palace,
            vietnamese_meaning: dbChangedHex?.vietnamese_meaning || fallbackChanged.meaning,
            overall_meaning: dbChangedHex?.overall_meaning || fallbackChanged.overall
        } : null,
        lines: dbLines.length > 0 ? dbLines.map(l => ({ line_number: l.line_number, relation: l.relation, meaning_static: l.meaning_static, meaning_active: l.meaning_active }))
            : [{ line_number: 1, relation: 'Tử Tôn', meaning_static: 'Tích lũy nội lực.', meaning_active: 'Giải vây khó khăn.' }],
        deity: { deity: targetRel, kỵ: kyThan[targetRel] || 'Không xác định' },
        analysisHtml: `
            <p><strong>Dụng Thần:</strong> ${targetRel} | <strong>Kỵ Thần:</strong> ${kyThan[targetRel] || 'Không xác định'}</p>
            <p style="font-size:0.78rem;color:#888"><em>Mã quẻ: ${generatedCodes.slice(0, 6).join(' · ')}</em></p>
            <ul>${analysisTextsList.map(t => `<li>${t}</li>`).join('')}</ul>
        `,
        catHung,
        templateContent: scenarioText,
        aiExplanation
    });
}

function getFallbackHex(hex_id) {
    const hex = FALLBACK_HEXAGRAMS_DB[hex_id];
    if (hex) {
        return {
            name: hex.name,
            palace: hex.palace,
            meaning: hex.name,
            overall: hex.overall,
            lines: hex.lines
        };
    }
    return { name: 'Quẻ Số ' + hex_id, palace: 'Chưa rõ', meaning: 'Đang cập nhật...', overall: 'Đang cập nhật...', lines: {} };
}

// ─────────────────────────────────────────────────────────────────────────────
// HELPER ENCODERS – chuyển tiếng Việt sang mã DB
// Dùng để khớp dữ liệu với tuong_co_ban / tuong_da_tang / tuong_dong_bien
// ─────────────────────────────────────────────────────────────────────────────
function encodeLucThan(rel) {
    if (!rel) return '';
    const map = {
        'Phụ Mẫu':  'phu_mau',
        'Quan Quỷ': 'quan_quy',
        'Huynh Đệ': 'huynh_de',
        'Thê Tài':  'the_tai',
        'Tử Tôn':   'tu_ton'
    };
    for (const [k, v] of Object.entries(map)) {
        if (rel.includes(k)) return v;
    }
    return rel.toLowerCase().replace(/\s+/g, '_');
}

function encodeLucThu(thu) {
    if (!thu) return '';
    const map = {
        'Thanh Long': 'thanh_long',
        'Chu Tước':   'chu_tuoc',
        'Câu Trần':   'cau_tran',
        'Đằng Xà':    'dang_xa',
        'Bạch Hổ':    'bach_ho',
        'Huyền Vũ':   'huyen_vu'
    };
    for (const [k, v] of Object.entries(map)) {
        if (thu.includes(k)) return v;
    }
    return thu.toLowerCase().replace(/\s+/g, '_');
}

