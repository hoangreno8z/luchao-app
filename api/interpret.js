/**
 * Vercel Serverless Function - api/interpret.js
 * Tích hợp 4 khối Engine của luchao_engine.js + Supabase DB lookup + Gemini AI.
 */

import { runFullEngineAnalysis } from './luchao_engine.js';

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
    'QUE_TINH': 'Quẻ tĩnh: Mọi sự bình lặng, lực lượng hai bên ổn định.',
    'QUE_DONG': 'Quẻ động: Sự việc đang có biến chuyển mạnh mẽ.',
    'DUNG_STATUS_VUONG': 'Dụng thần Vượng Tướng: Lực lượng mạnh, triển vọng tốt.',
    'DUNG_STATUS_SUY': 'Dụng thần Hưu Tù: Lực yếu, sự việc chưa thuận.',
    'DUNG_STATUS_NGUYET_PHA': 'Dụng thần bị Nguyệt Phá: Sự việc bị phá vỡ, khó cứu vãn.',
    'DUNG_STATUS_TUAN_KHONG': 'Dụng thần lâm Tuần Không: Sự việc còn hư ảo, chưa thành hình.',
    'DUNG_STATUS_AM_DONG': 'Dụng thần Ám Động: Sự việc sẽ bộc phát nhanh, ngoài dự kiến.',
    'DUNG_STATUS_NHAT_PHA': 'Dụng thần bị Nhật Phá: Sự việc bị Ngày xung vỡ, động tán.',
    'DUNG_STATUS_MO': 'Dụng thần nhập Mộ: Bị giam hãm, sự việc ách tắc khó tiến.',
    'DUNG_STATUS_PHUC_THAN': 'Dụng thần đang ẩn (Phục Thần), cần thời cơ mới hiển lộ.',
    'DUNG_STATUS_KHONG_CO_MAT': 'Dụng thần không xuất hiện: Việc hỏi không liên quan hoặc thời điểm chưa đúng.',
    'PHUC_THAN_BI_PHI_KHAC': 'Phục thần bị Phi thần áp chế: Thông tin cốt lõi bị che khuất.',
    'PHUC_THAN_DUOC_PHI_SINH': 'Phục thần được Phi thần nâng đỡ: Tiềm năng ẩn đang chờ cơ hội.',
    'PHUC_THAN_KHAC_PHI': 'Phục thần khắc Phi thần: Thông tin ẩn đang cố vượt ra ngoài ánh sáng.',
    'THE_STATUS_HOA_QUY': 'Hào Thế động hóa Quan Quỷ: Tự thân chiêu mời lo âu tai họa.',
    'THE_STATUS_HOI_DAU_KHAC': 'Hào Thế Hồi đầu khắc: Tự thân hành động lại tự hại bản thân.',
    'PROPERTY_LUC_XUNG': 'Quẻ Lục Xung: Mọi việc nhanh chóng nhưng khó bền vững.',
    'PROPERTY_LUC_HOP': 'Quẻ Lục Hợp: Gắn kết bền chặt, hợp tác thuận lợi.',
    'PROPERTY_DU_HON': 'Quẻ Du Hồn: Tâm bất định, hay thay đổi, liên quan đến đi xa.',
    'PROPERTY_QUY_HON': 'Quẻ Quy Hồn: Quay về ổn định nơi cũ, người xa quay về.',
    'PROPERTY_PHAN_NGAM': 'Phản Ngâm: Hai chiều đối nghịch gay gắt, mọi việc đảo lộn.',
    'PROPERTY_PHUC_NGAM': 'Phục Ngâm: Sự việc vòng quẩn, không tiến lên được.'
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

    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_KEY;

    let dbMainHex = null, dbChangedHex = null, dbLines = [], dbSemanticTexts = [];

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
    // TRUY XUẤT DATABASE THEO BỘ MÃ HÓA ĐÃ SINH
    // ===========================================================================
    if (supabaseUrl && supabaseKey) {
        try {
            const headers = {
                'apikey': supabaseKey,
                'Authorization': `Bearer ${supabaseKey}`,
                'Content-Type': 'application/json'
            };
            const codeList = generatedCodes.map(c => `"${c}"`).join(',');

            const [mainRes, changedRes, linesRes, semanticRes] = await Promise.all([
                fetch(`${supabaseUrl}/rest/v1/hexagrams?id=eq.${hex_id}`, { headers }).then(r => r.json()),
                changed_id ? fetch(`${supabaseUrl}/rest/v1/hexagrams?id=eq.${changed_id}`, { headers }).then(r => r.json()) : Promise.resolve([]),
                fetch(`${supabaseUrl}/rest/v1/lines?hexagram_id=eq.${hex_id}`, { headers }).then(r => r.json()),
                codeList ? fetch(`${supabaseUrl}/rest/v1/semantic_texts?code=in.(${codeList})`, { headers }).then(r => r.json()) : Promise.resolve([])
            ]);

            dbMainHex = mainRes?.[0] || null;
            dbChangedHex = changedRes?.[0] || null;
            dbLines = linesRes || [];
            dbSemanticTexts = semanticRes || [];
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
    if (['công việc', 'thi cử'].includes(topic)) topicMeaning = dbMainHex?.career_meaning || fallbackMain.career;
    else if (['tình yêu', 'hôn nhân'].includes(topic)) topicMeaning = dbMainHex?.love_meaning || fallbackMain.love;
    else if (topic === 'sức khỏe') topicMeaning = dbMainHex?.health_meaning || fallbackMain.health;
    else if (['kinh doanh', 'dự án'].includes(topic)) topicMeaning = dbMainHex?.wealth_meaning || fallbackMain.wealth;

    // ===========================================================================
    // TỔNG HỢP VĂN BẢN PHÂN TÍCH: DB → Fallback → Engine Vectors
    // ===========================================================================
    const analysisTextsList = [];
    const processedCodes = new Set();

    // 1. Ưu tiên văn bản từ Supabase DB (chính xác nhất)
    dbSemanticTexts.forEach(row => {
        analysisTextsList.push(`📌 ${row.vietnamese_text}`);
        processedCodes.add(row.code);
    });

    // 2. Bổ sung fallback cho các mã chưa có trong DB
    generatedCodes.forEach(code => {
        if (!processedCodes.has(code) && FALLBACK_TEXTS[code]) {
            analysisTextsList.push(FALLBACK_TEXTS[code]);
        }
    });

    // 3. Thêm văn bản Véc Tơ Năng Lượng từ Khối 3
    engineResult?.vectorTexts.forEach(v => {
        analysisTextsList.push(`⚡ Hào ${v.lineNum}: ${v.text}`);
    });

    // 4. Thêm phân tích Phục Thần từ Khối 1
    if (engineResult?.phucThanResult.found) {
        const pt = engineResult.phucThanResult;
        analysisTextsList.push(`🔍 Phục Thần: ${engineResult.targetRelation} đang ẩn dưới Hào ${pt.hostIdx + 1} (${pt.hostLine.relation}), chi ${pt.phucLine.branch}.`);
    }

    // ===========================================================================
    // TÍNH ĐIỂM CÁT HUNG
    // ===========================================================================
    let power = 0, risk = 0;
    if (generatedCodes.includes('DUNG_STATUS_VUONG')) power += 30;
    if (generatedCodes.some(c => c.includes('TIEN_THAN'))) power += 25;
    if (generatedCodes.includes('DUNG_STATUS_AM_DONG')) power += 20;
    if (generatedCodes.includes('PROPERTY_LUC_HOP')) power += 15;
    if (generatedCodes.includes('DUNG_STATUS_SUY')) power -= 20;
    if (generatedCodes.includes('DUNG_STATUS_TUAN_KHONG')) power -= 25;
    if (generatedCodes.includes('DUNG_STATUS_NGUYET_PHA')) { power -= 50; risk += 30; }
    if (generatedCodes.includes('DUNG_STATUS_MO')) { power -= 20; risk += 20; }
    if (generatedCodes.some(c => c.includes('HOI_DAU_KHAC'))) { power -= 60; risk += 50; }
    if (generatedCodes.includes('THE_STATUS_HOA_QUY')) risk += 40;
    if (generatedCodes.includes('PROPERTY_LUC_XUNG')) risk += 15;

    const netScore = power - risk;
    let catHung = netScore > 10 ? 'CAT' : netScore < -10 ? 'HUNG' : 'BINH';

    const topicTemplates = COMPILED_KNOWLEDGE.templates[topic] || COMPILED_KNOWLEDGE.templates['công việc'];
    const scenarioText = topicTemplates.scenarios[catHung];

    // ===========================================================================
    // GEMINI AI BIÊN TẬP CÁ NHÂN HÓA (TASK-LOCKED)
    // ===========================================================================
    let aiExplanation = '';
    const geminiKey = process.env.GEMINI_API_KEY;

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
                advice: scenarioText?.advice || ''
            };

            const systemPrompt = `Bạn là biên tập viên Lục Hào chuyên nghiệp. Nhiệm vụ: tổng hợp các đoạn phân tích kỹ thuật thành báo cáo cá nhân hóa mượt mà bằng tiếng Việt.

NGUYÊN TẮC TUYỆT ĐỐI:
1. KHÔNG tự tính toán lại ngũ hành, không thay đổi kết luận Cát/Hung/Bình đầu vào.
2. KHÔNG bịa thêm bất kỳ thông tin nào ngoài dữ liệu đã cung cấp.
3. Xưng hô phù hợp với giới tính người hỏi, viết chân thực gần gũi.

Cấu trúc 4 phần bắt buộc:
1. PHÂN TÍCH HIỆN TRẠNG
2. ĐÁNH GIÁ CÁT HUNG
3. DIỄN BIẾN CHI TIẾT
4. LỜI KHUYÊN HÀNH ĐỘNG`;

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
    const list = {
        63: { name: 'Bát Thuần Càn', palace: 'Càn', meaning: 'Thuần Càn', overall: 'Cương kiện, sáng tạo vô hạn.', career: 'Cơ hội thăng tiến lớn.', love: 'Nồng nhiệt, tránh xung đột.', wealth: 'Tài lộc hanh thông.', health: 'Sinh lực tốt.' },
        0:  { name: 'Bát Thuần Khôn', palace: 'Khôn', meaning: 'Thuần Khôn', overall: 'Nhu thuận, bao dung.', career: 'Kiên trì, làm việc nhóm.', love: 'Tình cảm hòa thuận.', wealth: 'Tài lộc ổn định.', health: 'Chú ý tiêu hóa.' },
        28: { name: 'Phong Lôi Ích', palace: 'Tốn', meaning: 'Phong Lôi Ích', overall: 'Lợi ích, bồi đắp.', career: 'Công danh thuận lợi.', love: 'Tình cảm nồng nàn.', wealth: 'Tài lộc dồi dào.', health: 'Sức khỏe tốt.' },
        12: { name: 'Sơn Lôi Di', palace: 'Tốn', meaning: 'Sơn Lôi Di', overall: 'Nuôi dưỡng thân tâm.', career: 'Học tập nâng cao.', love: 'Chăm sóc lẫn nhau.', wealth: 'Chi tiêu hợp lý.', health: 'Chú ý ngộ độc.' }
    };
    return list[hex_id] || { name: 'Quẻ Số ' + hex_id, palace: 'Chưa rõ', meaning: 'Đang cập nhật...', overall: 'Đang cập nhật...', career: 'Đang cập nhật...', love: 'Đang cập nhật...', wealth: 'Đang cập nhật...', health: 'Đang cập nhật...' };
}
