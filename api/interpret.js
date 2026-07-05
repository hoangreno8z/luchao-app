/**
 * Vercel Serverless Function - api/interpret.js
 * Tích hợp 4 khối Engine của luchao_engine.js + Supabase DB lookup + Gemini AI.
 */

import { runFullEngineAnalysis } from './luchao_engine.js';
import { FALLBACK_HEXAGRAMS_DB } from './fallback_db.js';

import { COMPILED_KNOWLEDGE } from './compiled_knowledge.js';

function getTopicAwareFallbackTexts(topicCode) {
    const isLove = ['tinh_yeu'].includes(topicCode);
    const isHealth = ['suc_khoe'].includes(topicCode);
    
    return {
        'THE_TRI_QUAN_QUY': isLove 
            ? 'Thế trì Quan Quỷ: Rất có lợi cho Nữ mệnh khi xem tình duyên (biểu thị phu tinh lâm thế, gắn kết mật thiết). Tuy nhiên cũng có điềm báo bản thân dễ lo âu, ghen tuông hoặc suy nghĩ quá nhiều.' 
            : (isHealth ? 'Thế trì Quan Quỷ: Thể hiện mầm bệnh đang bám rễ ở cơ thể, hoặc lo lắng bệnh tật kéo dài.' : 'Thế trì Quan Quỷ: Điềm báo chủ sự đang gánh vác trách nhiệm nặng nề, chịu áp lực công việc lớn từ cấp trên hoặc lo âu mất chức.'),
        
        'THE_TRI_PHU_MAU': isLove 
            ? 'Thế trì Phụ Mẫu: Tâm lý suy nghĩ nhiều về chuyện cam kết dài lâu, bàn thảo thủ tục cưới hỏi hoặc chịu sự can thiệp, áp lực từ gia đình hai bên.' 
            : 'Thế trì Phụ Mẫu: Bản thân công việc vô cùng vất vả, cực nhọc, phải xử lý nhiều quy trình, giấy tờ hành chính phức tạp.',
        
        'THE_TRI_HUYNH_DE': isLove 
            ? 'Thế trì Huynh Đệ: Tình cảm gặp nhiều trắc trở, xuất hiện tình địch cạnh tranh hoặc bản thân nóng nảy làm rạn nứt mối quan hệ.' 
            : 'Thế trì Huynh Đệ: Môi trường làm việc có sự cạnh tranh vị trí gay gắt từ đồng nghiệp, cẩn thận thâm hụt tiền bạc.',
        
        'THE_TRI_THE_TAI': isLove 
            ? 'Thế trì Thê Tài: Rất cát lợi cho Nam mệnh xem tình duyên (thê tinh lâm thế). Bản thân tràn đầy tình cảm sâu sắc, trân trọng đối phương.' 
            : 'Thế trì Thê Tài: Bản thân đang tập trung mưu cầu lợi ích kinh tế, thu nhập dự án hanh thông cát khánh.',
        
        'THE_TRI_TU_TON': isLove 
            ? 'Thế trì Tử Tôn: Bản thân hướng tới niềm vui, sự tự do thoải mái, không muốn bị ràng buộc hoặc kiểm soát ngột ngạt trong tình yêu. Nữ mệnh đề phòng có khoảng cách với người yêu (vì Tử Tôn khắc Quan Quỷ).' 
            : (isHealth ? 'Thế trì Tử Tôn: Khí đề kháng của cơ thể rất tốt, có dấu hiệu tìm đúng thầy đúng thuốc và hồi phục nhanh.' : 'Thế trì Tử Tôn: Chủ sự hướng tới tự do sáng tạo, chán ghét môi trường gò bó công sở. Khó cầu chức quyền.'),
        
        'QUE_TINH': 'Quẻ tĩnh: Mọi sự bình lặng, cục diện hai bên ổn định.',
        'QUE_DONG': 'Quẻ động: Sự việc đang có biến chuyển mạnh mẽ, tình hình chuyển động.',
        'DUNG_STATUS_VUONG': 'Dụng thần Vượng Tướng: Khí thế của đối tượng mưu cầu rất mạnh, triển vọng phát triển tốt đẹp.',
        'DUNG_STATUS_SUY': 'Dụng thần Hưu Tù Vô Khí: Khí lực suy yếu, sự việc chưa chín muồi để hành động.',
        'DUNG_STATUS_NGUYET_PHA': 'Dụng thần bị Nguyệt Phá: Bị Tháng gieo quẻ tương xung làm vỡ nát khí lực, mưu sự cực kỳ khó thành công.',
        'DUNG_STATUS_TUAN_KHONG': 'Dụng thần lâm Tuần Không: Đối tượng mưu cầu còn ảo vọng, trống rỗng hoặc chưa xuất hiện.',
        'DUNG_STATUS_AM_DONG': 'Dụng thần Ám Động: Sự việc sẽ diễn biến bất ngờ, âm thầm bộc phát rất nhanh chóng.',
        'DUNG_STATUS_NHAT_PHA': 'Dụng thần bị Nhật Phá: Sự việc bị Ngày gieo quẻ xung vỡ tán loạn.',
        'DUNG_STATUS_MO': 'Dụng thần nhập Mộ: Bị che khuất, giam hãm hoặc bản thân chủ sự đang rơi vào bế tắc không lối thoát.',
        'DUNG_STATUS_PHUC_THAN': 'Dụng thần ẩn tàng (Phục Thần): Cần kiên nhẫn đợi thời cơ hiển lộ.',
        'DUNG_STATUS_KHONG_CO_MAT': 'Dụng thần không xuất hiện trên quẻ.',
        'PHUC_THAN_BI_PHI_KHAC': 'Phục Thần bị Phi Thần tương khắc đè nén: Tiềm năng ẩn bị áp chế mạnh mẽ.',
        'PHUC_THAN_DUOC_PHI_SINH': 'Phục Thần được Phi Thần tương sinh nâng đỡ: Tuy ẩn tàng nhưng có cơ hội bứt phá tốt.',
        'PHUC_THAN_KHAC_PHI': 'Phục Thần khắc Phi Thần: Bản thân tự nỗ lực vượt qua rào cản.',
        'THE_STATUS_HOA_QUY': isLove 
            ? 'Hào Thế động hóa Quan Quỷ: Tự thân nảy sinh lo âu phiền muộn, hoang mang hoài nghi về tình cảm đôi bên.' 
            : 'Hào Thế động hóa Quan Quỷ: Đề phòng áp lực công việc quá lớn hoặc tự mình gây ra rắc rối công sở.',
        'THE_STATUS_HOI_DAU_KHAC': 'Hào Thế bị Hồi Đầu Khắc: Tự mình hành sự sai lầm dẫn đến hỏng việc của mình.',
        'PROPERTY_LUC_XUNG': 'Quẻ Lục Xung: Sự việc diễn biến cực kỳ nhanh chóng, dứt điểm mau lẹ nhưng không bền vững.',
        'PROPERTY_LUC_HOP': 'Quẻ Lục Hợp: Mối quan hệ gắn kết bền chặt, giao hòa tốt đẹp, mưu sự được quý nhân nâng đỡ.',
        'PROPERTY_DU_HON': 'Quẻ Du Hồn: Tâm lý bất định, dao động không kiên định, sự việc trôi nổi.',
        'PROPERTY_QUY_HON': 'Quẻ Quy Hồn: Mọi sự quay về trạng thái ổn định cũ, thích hợp giữ nguyên hiện trạng.',
        'PROPERTY_PHAN_NGAM': 'Phản Ngâm: Sự việc lặp đi lặp lại đảo lộn, tiến thoái lưỡng nan cực kỳ mệt mỏi.',
        'PROPERTY_PHUC_NGAM': 'Phục Ngâm: Trạng thái bế tắc trì trệ, lòng đầy u uất đau khổ không thể tiến bước.',
        'PATTERN_BACH_HO_DONG_TAI_BENH': 'Bạch Hổ phát động: Điềm báo có tranh chấp gay gắt trực diện hoặc chấn thương đột xuất.',
        'PATTERN_THE_DANG_XA_TK_LO_AO': 'Thế lâm Đằng Xà ngộ Tuần Không: Người hỏi đang lo sợ hoang mang mơ hồ, thực chất sự việc không nguy hiểm.',
        'PATTERN_THANH_LONG_TAI_DONG_TIN_VUI': 'Thanh Long cùng Thê Tài phát động: Đón nhận hỉ sự cát tường, tin vui lớn về nhân duyên hoặc tiền của.',
        'PATTERN_CHU_TUOC_QUAN_DONG_TRANH_CHAP': 'Chu Tước cùng Quan Quỷ phát động: Đề phòng cãi vã lớn, thị phi gièm pha gièm pha tiếng tăm.',
        'PATTERN_DICH_MA_DONG_BIEN_DONG': 'Thần Sát Dịch Mã phát động: Có điềm chuyển dịch, thay đổi vị trí, đi xa hoặc đi lại lưu động nhanh chóng.',
        'PATTERN_DAO_HOA_DONG_DUYEN_VONG': 'Thần Sát Đào Hoa phát động: Điềm báo tình duyên khởi sắc, đào hoa vượng phát, được đối phương mến mộ.',
        'PATTERN_HOA_CAI_DONG_NGHE_THUAT': 'Thần Sát Hoa Cái phát động: Trí tuệ sáng suốt, thích hợp suy ngẫm hướng nội hoặc học thuật.'
    };
}

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

    if (req.method === 'OPTIONS') { res.status(200).end(); return; }

    let payload = req.body || {};
    if (typeof payload === 'string') {
        try {
            payload = JSON.parse(payload);
        } catch (e) {
            payload = {};
        }
    }

    const hex_id = payload.hex_id || req.query.hex_id;
    const changed_id = payload.changed_id || req.query.changed_id;
    const topic = payload.topic || req.query.topic || 'công việc';
    const gender = payload.gender || req.query.gender || 'Nam';
    const hexData = payload.hexData;
    const userInputs = payload.userInputs;

    // Chuẩn hóa tên chủ đề sang mã DB (Toàn cục cho Handler)
    const topicCode = {
        'công việc': 'cong_viec', 'thi cử': 'cong_viec',
        'tình yêu': 'tinh_yeu',  'hôn nhân': 'tinh_yeu',
        'sức khỏe': 'suc_khoe',  'kinh doanh': 'kinh_doanh',
        'dự án': 'kinh_doanh',   'chứng khoán': 'chung_khoan',
        'bất động sản': 'bat_dong_san'
    }[topic] || 'cong_viec';

    if (!hex_id) {
        return res.status(400).json({ 
            error: 'Missing hex_id parameter',
            receivedPayload: payload,
            receivedQuery: req.query
        });
    }

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
            const G = (url) => {
                if (typeof fetch === 'undefined') return Promise.resolve([]);
                return fetch(url, { headers: H }).then(r => r.json()).catch(() => []);
            };

            // Đã sử dụng topicCode toàn cục

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

    // ===========================================================================
    // ĐỌC DỮ LIỆU TỪ TRI THỨC ĐÓNG GÓI TRÊN RAM (LOCAL HYBRID INFERENCE)
    // ===========================================================================
    const localMainHex = COMPILED_KNOWLEDGE.hexagrams?.find(h => h.id === parseInt(hex_id)) || getFallbackHex(parseInt(hex_id));
    const localChangedHex = changed_id ? (COMPILED_KNOWLEDGE.hexagrams?.find(h => h.id === parseInt(changed_id)) || getFallbackHex(parseInt(changed_id))) : null;

    const mainName = dbMainHex?.name || localMainHex.name;
    const palaceName = dbMainHex?.palace || localMainHex.palace;
    const vietnameseMeaning = dbMainHex?.vietnamese_meaning || localMainHex.vietnamese_meaning || localMainHex.name;
    const overallMeaning = dbMainHex?.overall_meaning || localMainHex.overall_meaning || localMainHex.overall;

    let topicMeaning = overallMeaning;
    const cleanTopic = topic.trim();
    if (['công việc', 'thi cử'].includes(cleanTopic)) {
        topicMeaning = dbMainHex?.career_meaning || localMainHex.career_meaning || overallMeaning;
    } else if (['tình yêu', 'hôn nhân'].includes(cleanTopic)) {
        topicMeaning = dbMainHex?.love_meaning || localMainHex.love_meaning || overallMeaning;
    } else if (cleanTopic === 'sức khỏe') {
        topicMeaning = dbMainHex?.health_meaning || localMainHex.health_meaning || overallMeaning;
    } else if (['kinh doanh', 'dự án'].includes(cleanTopic)) {
        topicMeaning = dbMainHex?.wealth_meaning || localMainHex.wealth_meaning || overallMeaning;
    }

    // Nếu Supabase không trả về Hào từ, lấy Hào từ từ tri thức đóng gói trong RAM (đầy đủ 384 hào từ chuẩn)
    if (dbLines.length === 0) {
        const localLines = COMPILED_KNOWLEDGE.lines?.filter(l => l.hexagram_id === parseInt(hex_id)) || [];
        if (localLines.length > 0) {
            dbLines = localLines.map(l => {
                const matchedLine = hexData?.linesData?.[l.line_number - 1];
                return {
                    line_number: l.line_number,
                    relation: matchedLine?.relation || l.relation || 'Hào ' + l.line_number,
                    meaning_static: l.meaning_static,
                    meaning_active: l.meaning_active
                };
            });
        }
    }

    // Nếu vẫn trống hào từ (fallback dự phòng cấp 3)
    if (dbLines.length === 0) {
        const fbMain = getFallbackHex(parseInt(hex_id));
        if (fbMain && fbMain.lines) {
            dbLines = Object.keys(fbMain.lines).map(hKey => {
                const hNum = parseInt(hKey);
                const matchedLine = hexData?.linesData?.[hNum - 1];
                return {
                    line_number: hNum,
                    relation: matchedLine?.relation || 'Hào ' + hNum,
                    meaning_static: fbMain.lines[hKey].static,
                    meaning_active: fbMain.lines[hKey].active
                };
            });
        }
    }

    // ===========================================================================
    // TỔNG HỢP VĂN BẢN PHÂN TÍCH: 6 LỚP NGUỒN DỮ LIỆU (AN TOÀN MẢNG 100%)
    // Thứ tự ưu tiên: DB semantic → tuong_da_tang → tuong_dong_bien → tuong_co_ban → fallback → engine
    // ===========================================================================
    const analysisTextsList = [];
    const processedCodes = new Set();

    // Chuẩn hóa biến DB thành mảng an toàn (Lọc chính xác theo Hộp Chủ Đề để tránh chồng chéo thông tin)
    const safeSemanticTexts = (Array.isArray(dbSemanticTexts) && dbSemanticTexts.length > 0) ? dbSemanticTexts : [];
    
    const safeTuongDaTang = (Array.isArray(dbTuongDaTang) && dbTuongDaTang.length > 0) 
        ? dbTuongDaTang.filter(r => r.chu_de === topicCode || r.chu_de === 'all')
        : (COMPILED_KNOWLEDGE.tuong_da_tang || []).filter(r => r.chu_de === topicCode || r.chu_de === 'all');
        
    const safeTuongDongBien = (Array.isArray(dbTuongDongBien) && dbTuongDongBien.length > 0) 
        ? dbTuongDongBien.filter(r => r.chu_de === topicCode || r.chu_de === 'all')
        : (COMPILED_KNOWLEDGE.tuong_dong_bien || []).filter(r => r.chu_de === topicCode || r.chu_de === 'all');
        
    const safeTuongCoBan = (Array.isArray(dbTuongCoBan) && dbTuongCoBan.length > 0) 
        ? dbTuongCoBan.filter(r => r.chu_de === topicCode || r.chu_de === 'all')
        : (COMPILED_KNOWLEDGE.tuong_co_ban || []).filter(r => r.chu_de === topicCode || r.chu_de === 'all');

    // ===========================================================================
    // BỘ DIỄN GIẢI ĐỊA CHI NHẬT NGUYỆT SINH KHẮC ĐỘNG HỌC (TECHNICAL CELESTIAL INTERPRETER)
    // ===========================================================================
    const celestialLogs = [];
    if (engineResult && hexData && hexData.linesData) {
        const targetLine = hexData.linesData.find(l => l.relation === engineResult.targetRelation);
        const shiLine = hexData.linesData.find(l => l.isShi);

        // 1. Phân tích Dụng Thần
        if (targetLine) {
            const rawNhat = hexData?.dateInfo?.nhatThan || '';
            const nhatChi = rawNhat.split(' - ')[0].trim();
            const nhatHanh = rawNhat.includes(' - ') ? rawNhat.split(' - ')[1].trim() : 'Thổ';

            const rawNguyet = hexData?.dateInfo?.nguyetLenh || '';
            const nguyetChi = rawNguyet.split(' - ')[0].trim();
            const nguyetHanh = rawNguyet.includes(' - ') ? rawNguyet.split(' - ')[1].trim() : 'Thổ';

            celestialLogs.push(`⚡ PHÂN TÍCH NHẬT NGUYỆT CHO DỤNG THẦN [${engineResult.targetRelation} - Chi ${targetLine.chi} Ngũ hành ${targetLine.hanh}]:`);

            // Tương tác Nhật Thần (Ngày gieo)
            const nhatRel = getShengKeRelation(nhatHanh, targetLine.hanh);
            let nhatTxt = `Nhật Thần ${nhatChi} (${nhatHanh})`;
            if (nhatRel === 1) nhatTxt += ` tương sinh trợ lực cho Dụng Thần.`;
            else if (nhatRel === -1) nhatTxt += ` tương khắc áp chế Dụng Thần.`;
            else if (nhatRel === 0.5) nhatTxt += ` tỷ hòa song hành cùng Dụng Thần.`;
            else nhatTxt += ` không có quan hệ sinh khắc trực tiếp.`;
            celestialLogs.push(`   • Ngày: ${nhatTxt}`);

            // Kiểm tra Nhật Xung (Ám Động / Nhật Phá)
            if (generatedCodes.includes('DUNG_STATUS_AM_DONG')) {
                celestialLogs.push(`   • Nhật Xung: Hào Dụng Thần tĩnh được Nhật Thần ${nhatChi} xung kích hoạt thế ÁM ĐỘNG. Biểu thị sự việc sẽ bộc phát ngầm rất nhanh chóng.`);
            } else if (generatedCodes.includes('DUNG_STATUS_NHAT_PHA')) {
                celestialLogs.push(`   • Nhật Xung: Dụng Thần suy yếu bị Nhật Thần ${nhatChi} tương xung tạo thế NHẬT PHÁ, bị tổn thương vỡ tán khí lực.`);
            }

            // Tương tác Nguyệt Lệnh (Tháng gieo)
            const nguyetRel = getShengKeRelation(nguyetHanh, targetLine.hanh);
            let nguyetTxt = `Nguyệt Lệnh ${nguyetChi} (${nguyetHanh})`;
            if (nguyetRel === 1) nguyetTxt += ` tương sinh vượng khí cho Dụng Thần.`;
            else if (nguyetRel === -1) nguyetTxt += ` tương khắc làm suy bại Dụng Thần.`;
            else if (nguyetRel === 0.5) nguyetTxt += ` tỷ hòa làm tăng khí thế cho Dụng Thần.`;
            else nguyetTxt += ` bình hòa.`;
            celestialLogs.push(`   • Tháng: ${nguyetTxt}`);

            if (generatedCodes.includes('DUNG_STATUS_NGUYET_PHA')) {
                celestialLogs.push(`   • Nguyệt Phá: Hào Dụng Thần bị Nguyệt Lệnh ${nguyetChi} tương xung trực diện tạo thế NGUYỆT PHÁ. Đây là điểm hung hại lớn, mọi mưu cầu dễ bị đổ vỡ nửa chừng.`);
            }

            // Kiểm tra Tuần Không / Nhập Mộ
            if (generatedCodes.includes('DUNG_STATUS_TUAN_KHONG')) {
                celestialLogs.push(`   • Tuần Không: Dụng Thần lâm Tuần Không, hiện tại trống rỗng, vô lực, chưa thể hành sự.`);
            }
            if (generatedCodes.includes('DUNG_STATUS_MO')) {
                celestialLogs.push(`   • Nhập Mộ: Dụng Thần nhập Mộ, bị che mờ, giam hãm khó phát huy khả năng.`);
            }
        }

        // 2. Phân tích hào Thế (Bản thân chủ sự)
        if (shiLine) {
            celestialLogs.push(`⚡ PHÂN TÍCH HÀO THẾ [Bản thân bạn - Hào ${hexData.linesData.indexOf(shiLine) + 1} - Chi ${shiLine.chi} Ngũ hành ${shiLine.hanh}]:`);
            if (generatedCodes.some(c => c.includes('HOI_DAU_KHAC'))) {
                celestialLogs.push(`   • Hồi Đầu Khắc: Hào Thế phát động hóa ra hào biến tương khắc lại chính nó. Điềm báo tự mình làm hỏng việc của mình, hành sự lúc đầu thuận lợi nhưng kết quả tự chuốc lấy thất bại.`);
            } else if (generatedCodes.some(c => c.includes('HOI_DAU_SINH'))) {
                celestialLogs.push(`   • Hồi Đầu Sinh: Hào Thế phát động hóa ra hào biến sinh trợ lại chính nó. Cát lành vô cùng, mưu sự càng về sau càng được nâng đỡ phát triển.`);
            }
            if (generatedCodes.includes('THE_STATUS_HOA_QUY')) {
                celestialLogs.push(`   • Hóa Quỷ: Hào Thế động hóa Quan Quỷ. Chủ sự trong lòng đầy lo âu hoang mang, tự chiêu mời stress hoặc đề phòng bệnh tật phát sinh.`);
            }
        }
    }

    // Đẩy phân tích nhật nguyệt vào danh sách
    celestialLogs.forEach(log => analysisTextsList.push(log));

    // LỚP 1: semantic_texts cũ (backward compat, ưu tiên cao nhất)
    safeSemanticTexts.forEach(row => {
        if (row && row.vietnamese_text) {
            analysisTextsList.push(`📌 ${row.vietnamese_text}`);
            processedCodes.add(row.code);
        }
    });

    // LỚP 2: tuong_da_tang — khớp từng hào theo (hao_vi, luc_than, trang_thai)
    if (safeTuongDaTang.length > 0 && engineResult?.enrichedLines) {
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
            const exact = safeTuongDaTang.find(r =>
                r.hao_vi === haoNum && r.luc_than === lucThan && r.trang_thai === trangThai
            );
            if (exact) {
                analysisTextsList.push(`🎯 Hào ${haoNum} (${line.relation}·${line.lucThu}·${trangThai}): ${exact.mo_ta_tuong}`);
                return;
            }
            // Khớp mở rộng: bỏ qua hao_vi (hao_vi IS NULL = áp dụng mọi hào)
            const broad = safeTuongDaTang.find(r =>
                r.hao_vi === null && r.luc_than === lucThan && r.trang_thai === trangThai
            );
            if (broad) {
                analysisTextsList.push(`🎯 Hào ${haoNum} (${line.relation}·${trangThai}): ${broad.mo_ta_tuong}`);
            }
        });
    }

    // LỚP 3: tuong_dong_bien — khớp theo (luc_than_goc, luc_than_bien, huong_bien) của mỗi vec-tơ
    if (safeTuongDongBien.length > 0 && engineResult?.energyVectors) {
        const huongBienMap = {
            'HOI_DAU_KHAC': 'hoi_dau_khac', 'HOI_DAU_SINH': 'hoi_dau_sinh',
            'HOA_TIEN_THAN': 'hoa_tien', 'HOA_THOAI_THAN': 'hoa_thoai'
        };
        engineResult.energyVectors.forEach(v => {
            const goc  = encodeLucThan(v.relation);
            const bien = encodeLucThan(v.changedRelation);
            const huong = huongBienMap[v.vector];
            if (!huong) return;
            const match = safeTuongDongBien.find(r =>
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
    if (safeTuongCoBan.length > 0 && engineResult) {
        const dungRel  = encodeLucThan(engineResult.targetRelation);
        const dungBase = safeTuongCoBan.find(r => r.luc_than === dungRel && !r.luc_thu);
        if (dungBase) {
            analysisTextsList.push(`📖 Dụng Thần (${engineResult.targetRelation}) trong chủ đề này: ${dungBase.y_nghia}`);
        }
        // Lục Thú của Dụng Thần
        const dungLine = engineResult.enrichedLines?.find(l => l.relation === engineResult.targetRelation);
        if (dungLine) {
            const lucThuCode = encodeLucThu(dungLine.lucThu);
            const thuBase = safeTuongCoBan.find(r => r.luc_thu === lucThuCode && !r.luc_than);
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

    // LỚP 6: Fallback text từ mã engine (các mã chưa match DB) - ĐÃ BẢO ĐẢM TÁCH BIỆT CHỦ ĐỀ
    const topicFallbackTexts = getTopicAwareFallbackTexts(topicCode);
    generatedCodes.forEach(code => {
        if (!processedCodes.has(code) && topicFallbackTexts[code]) {
            analysisTextsList.push(topicFallbackTexts[code]);
        }
    });

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
            const rawNhat = hexData?.dateInfo?.nhatThan || '';
            const nhatHanh = rawNhat.includes(' - ') ? rawNhat.split(' - ')[1].trim() : 'Thổ';
            const nhatRelationValue = getShengKeRelation(nhatHanh, targetHanh); // Tra cứu ma trận
            baseScore += nhatRelationValue * 20; // Trọng số tác động của Ngày

            // Xung khắc từ Nguyệt Lệnh (Tháng)
            const rawNguyet = hexData?.dateInfo?.nguyetLenh || '';
            const nguyetHanh = rawNguyet.includes(' - ') ? rawNguyet.split(' - ')[1].trim() : 'Thổ';
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
        changed: localChangedHex ? {
            name: dbChangedHex?.name || localChangedHex.name,
            palace: dbChangedHex?.palace || localChangedHex.palace,
            vietnamese_meaning: dbChangedHex?.vietnamese_meaning || localChangedHex.vietnamese_meaning || localChangedHex.name,
            overall_meaning: dbChangedHex?.overall_meaning || localChangedHex.overall_meaning || localChangedHex.overall
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

