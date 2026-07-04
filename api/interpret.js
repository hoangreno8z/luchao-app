/**
 * Vercel Serverless Function - api/interpret.js
 * Runs Chu Than Ban's I Ching rules engine and integrates Google Gemini API for copywriting.
 */

import { COMPILED_KNOWLEDGE } from '../generated/compiled_knowledge.js';

const KHAC_MAP = {
    'Kim': 'Mộc', 'Mộc': 'Thổ', 'Thổ': 'Thủy', 'Thủy': 'Hỏa', 'Hỏa': 'Kim'
};

const SINH_MAP = {
    'Thủy': 'Mộc', 'Mộc': 'Hỏa', 'Hỏa': 'Thổ', 'Thổ': 'Kim', 'Kim': 'Thủy'
};

const XUNG_MAP = {
    'Tý': 'Ngọ', 'Ngọ': 'Tý',
    'Sửu': 'Mùi', 'Mùi': 'Sửu',
    'Dần': 'Thân', 'Thân': 'Dần',
    'Mão': 'Dậu', 'Dậu': 'Mão',
    'Thìn': 'Tuất', 'Tuất': 'Thìn',
    'Tỵ': 'Hợi', 'Hợi': 'Tỵ'
};

function checkTienThoai(mainChi, changedChi) {
    const tien = {
        'Dần': 'Mão', 'Tị': 'Ngọ', 'Thân': 'Dậu', 'Hợi': 'Tý',
        'Sửu': 'Thìn', 'Thìn': 'Mùi', 'Mùi': 'Tuất', 'Tuất': 'Sửu'
    };
    const thoai = {
        'Mão': 'Dần', 'Ngọ': 'Tị', 'Dậu': 'Thân', 'Tý': 'Hợi',
        'Thìn': 'Sửu', 'Mùi': 'Thìn', 'Tuất': 'Mùi', 'Sửu': 'Tuất'
    };
    if (tien[mainChi] === changedChi) return 'tiến';
    if (thoai[mainChi] === changedChi) return 'thoái';
    return '';
}

// Safe AST-free Boolean condition evaluator
function evaluateCondition(conditionStr, context) {
    const clauses = conditionStr.split(' && ');
    return clauses.every(clause => {
        const [left, right] = clause.split(' == ');
        if (!left || !right) return false;
        
        const path = left.trim().split('.');
        let val = context;
        for (const key of path) {
            if (val === null || val === undefined) return false;
            val = val[key];
        }
        
        let targetVal = right.trim();
        if (targetVal === 'true') targetVal = true;
        else if (targetVal === 'false') targetVal = false;
        else if (targetVal.startsWith("'") && targetVal.endsWith("'")) targetVal = targetVal.slice(1, -1);
        
        return val === targetVal;
    });
}

export default async function handler(req, res) {
    // CORS headers
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    let hex_id, changed_id, topic, gender, hexData, userInputs;

    if (req.method === 'POST') {
        ({ hex_id, changed_id, topic, gender, hexData, userInputs } = req.body);
    } else {
        ({ hex_id, changed_id, topic, gender } = req.query);
    }

    if (!hex_id) {
        return res.status(400).json({ error: 'Missing hex_id parameter' });
    }

    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_KEY;

    let dbMainHex = null;
    let dbChangedHex = null;
    let dbLines = [];

    // 1. Fetch static descriptions from Supabase
    if (supabaseUrl && supabaseKey) {
        try {
            const headers = {
                'apikey': supabaseKey,
                'Authorization': `Bearer ${supabaseKey}`,
                'Content-Type': 'application/json'
            };

            const [mainRes, changedRes, linesRes] = await Promise.all([
                fetch(`${supabaseUrl}/rest/v1/hexagrams?id=eq.${hex_id}`, { headers }).then(r => r.json()),
                changed_id ? fetch(`${supabaseUrl}/rest/v1/hexagrams?id=eq.${changed_id}`, { headers }).then(r => r.json()) : Promise.resolve([]),
                fetch(`${supabaseUrl}/rest/v1/lines?hexagram_id=eq.${hex_id}`, { headers }).then(r => r.json())
            ]);

            dbMainHex = mainRes && mainRes[0];
            dbChangedHex = changedRes && changedRes[0];
            dbLines = linesRes || [];
        } catch (err) {
            console.error('Supabase query failed, running local mock...', err);
        }
    }

    // 2. Fetch from compiled ontology mapping
    const ontology = COMPILED_KNOWLEDGE.ontology;
    const fallbackMain = getFallbackHex(parseInt(hex_id));
    const fallbackChanged = changed_id ? getFallbackHex(parseInt(changed_id)) : null;

    const mainName = dbMainHex?.name || fallbackMain.name;
    const palaceName = dbMainHex?.palace || fallbackMain.palace;
    const vietnameseMeaning = dbMainHex?.vietnamese_meaning || fallbackMain.meaning;
    const overallMeaning = dbMainHex?.overall_meaning || fallbackMain.overall;

    let topicMeaning = "";
    if (topic === "công việc" || topic === "thi cử") topicMeaning = dbMainHex?.career_meaning || fallbackMain.career;
    else if (topic === "tình yêu" || topic === "hôn nhân") topicMeaning = dbMainHex?.love_meaning || fallbackMain.love;
    else if (topic === "sức khỏe") topicMeaning = dbMainHex?.health_meaning || fallbackMain.health;
    else if (topic === "kinh doanh" || topic === "dự án") topicMeaning = dbMainHex?.wealth_meaning || fallbackMain.wealth;
    else topicMeaning = overallMeaning;

    // 3. DETERMINISTIC ENGINE & RULE SCORING
    let analysisHtml = "";
    let scores = { power: 0, risk: 0, timing: 50, stability: 50, relationship: 50, opportunity: 0, threat: 0 };
    let inferenceChain = [];
    let catHung = "BINH";

    if (hexData && hexData.linesData) {
        const lines = hexData.linesData;
        const dayChi = hexData.dateInfo.nhatThan.split(' - ')[0];
        const monthChi = hexData.dateInfo.nguyetLenh.split(' - ')[0];
        const monthHanh = hexData.dateInfo.nguyetLenh.split(' - ')[1];

        // Determine primary relation deity
        const deityMap = {
            'công việc': 'Quan Quỷ', 'thi cử': 'Phụ Mẫu',
            'tình yêu': gender === 'Nam' ? 'Thê Tài' : 'Quan Quỷ',
            'hôn nhân': gender === 'Nam' ? 'Thê Tài' : 'Quan Quỷ',
            'sức khỏe': 'Tử Tôn', 'kinh doanh': 'Thê Tài', 'dự án': 'Thê Tài'
        };
        const targetRel = deityMap[topic] || 'Thế Hào';

        // Select Deity line index
        let deityIdx = lines.findIndex(l => (l.isShi || l.isYing) && l.relation.includes(targetRel));
        if (deityIdx === -1) deityIdx = lines.findIndex(l => l.isMoving && l.relation.includes(targetRel));
        if (deityIdx === -1) deityIdx = lines.findIndex(l => l.relation.includes(targetRel));

        // Evaluate each line for compiling contextual facts
        const evaluatedLines = lines.map((line, idx) => {
            const isXungDay = XUNG_MAP[line.chi] === dayChi;
            const isXungMonth = XUNG_MAP[line.chi] === monthChi;
            const isVuongInMonth = (line.hanh === monthHanh || SINH_MAP[monthHanh] === line.hanh);
            const isHoiDauKhac = line.isMoving && KHAC_MAP[line.changed.hanh] === line.hanh;
            const tt = line.isMoving ? checkTienThoai(line.chi, line.changed.branch) : '';

            return {
                IsShi: line.isShi === true,
                IsYing: line.isYing === true,
                IsMoving: line.isMoving === true,
                IsTK: line.isTK === true,
                IsNguyetPha: isXungMonth,
                IsXungDay: isXungDay,
                IsVuongInMonth: isVuongInMonth,
                IsHoiDauKhac: isHoiDauKhac,
                TienThoai: tt,
                ChangedRelation: line.changed.relation
            };
        });

        // Run Rule Engine for Deity
        if (deityIdx !== -1) {
            const deityContext = { Deity: evaluatedLines[deityIdx] };
            COMPILED_KNOWLEDGE.rules.forEach(rule => {
                if (evaluateCondition(rule.condition, deityContext)) {
                    // Apply effects
                    for (const [key, val] of Object.entries(rule.effect)) {
                        if (key in scores) scores[key] += val;
                    }
                    inferenceChain.push(`**${rule.name}**: ${rule.explain}`);
                }
            });
        }

        // Run Rule Engine for Shi (Thế hào)
        const shiIdx = lines.findIndex(l => l.isShi);
        if (shiIdx !== -1) {
            const shiContext = { Deity: evaluatedLines[shiIdx] };
            COMPILED_KNOWLEDGE.rules.forEach(rule => {
                if (evaluateCondition(rule.condition, shiContext)) {
                    if (rule.name === 'Thế_Động_Hóa_Quỷ' || rule.name === 'Hồi_Đầu_Khắc') {
                        scores.risk += 40;
                        scores.power -= 30;
                        inferenceChain.push(`**Thế Hào gặp hạn (${rule.name})**: ${rule.explain}`);
                    }
                }
            });
        }

        // Determine final Cát Hung based on scores
        const netScore = scores.power - scores.risk;
        if (netScore > 15) catHung = "CAT";
        else if (netScore < -15) catHung = "HUNG";
        else catHung = "BINH";

        // Formulate Explainability HTML
        analysisHtml = `
            <p><strong>Dụng Thần Lục Thân xác định:</strong> ${targetRel} (${COMPILED_KNOWLEDGE.ontology.deities[targetRel]?.vietnamese || ''})</p>
            <ul>
                ${inferenceChain.map(item => `<li>${item}</li>`).join('')}
            </ul>
            <p><strong>Thống kê chỉ số:</strong> Lực dụng thần: ${scores.power} | Mức độ rủi ro: ${scores.risk} | Độ ổn định: ${scores.stability}</p>
        `;
    }

    // 4. TEMPLATE RETRIEVAL
    const topicTemplates = COMPILED_KNOWLEDGE.templates[topic] || COMPILED_KNOWLEDGE.templates['công việc'];
    const scenarioText = topicTemplates.scenarios[catHung];

    // 5. TASK-LOCKED GEMINI API PERSONALIZATION (Optional)
    let aiExplanation = "";
    const geminiKey = process.env.GEMINI_API_KEY;

    if (geminiKey && userInputs && hexData) {
        try {
            const promptData = {
                user_question: userInputs.question || "Không có câu hỏi cụ thể",
                user_gender: gender,
                user_desire: userInputs.desire || "Không rõ mong muốn thật tâm",
                hex_name: mainName,
                hex_palace: palaceName,
                calculated_canghung: catHung === 'CAT' ? 'Cát (Tốt)' : catHung === 'HUNG' ? 'Hung (Xấu)' : 'Bình hòa',
                technical_findings: inferenceChain.join('\n'),
                database_static_meaning: overallMeaning,
                database_topic_meaning: topicMeaning,
                database_advice: scenarioText.advice
            };

            const systemPrompt = `Bạn là một biên tập viên Lục Hào chuyên nghiệp.
Nhiệm vụ của bạn là tổng hợp dữ liệu kỹ thuật và văn bản giải thích được cung cấp dưới đây thành một bài luận giải cá nhân hóa mượt mà, chân thực bằng tiếng Việt.

CÁC NGUYÊN TẮC CỨNG BẮT BUỘC:
1. KHÔNG được tự ý tính toán lại ngũ hành, địa chi, vượng suy hay tự suy đoán cát hung. Hãy trung thành 100% với kết luận cát hung đã được tính toán ở đầu vào.
2. KHÔNG tự bịa ra ý nghĩa của quẻ chủ, quẻ biến hay các hào ngoài văn bản giải nghĩa được cung cấp.
3. Lồng ghép câu hỏi thật sự, mong muốn thật tâm và giới tính của người hỏi để xưng hô thân mật, đưa ra lời khuyên thực tế.

Cấu trúc đầu ra bắt buộc gồm 4 phần rõ ràng:
1. PHÂN TÍCH HIỆN TRẠNG (Đối quỹ thực chứng): Đối chiếu hoàn cảnh của người hỏi với quẻ gieo.
2. ĐÁNH GIÁ CÁT HUNG CHỦ ĐỀ: Giải thích rõ thành bại dựa trên thông số đầu vào.
3. DIỄN TIẾN CHI TIẾT: Giải thích ý nghĩa của các hào động biến đã có sẵn.
4. LỜI KHUYÊN HÀNH ĐỘNG (Xu cát tị hung): Chỉ dẫn cụ thể thái độ thực tế nên làm để thay đổi hoặc nắm giữ cơ hội.`;

            const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`;
            
            const response = await fetch(geminiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: `${systemPrompt}\n\nDỮ LIỆU ĐẦU VÀO:\n${JSON.stringify(promptData, null, 2)}`
                        }]
                    }]
                })
            });

            const resJson = await response.json();
            aiExplanation = resJson.candidates?.[0]?.content?.parts?.[0]?.text || "";
        } catch (err) {
            console.error('Gemini API call failed:', err);
        }
    }

    return res.status(200).json({
        success: true,
        source: dbMainHex ? 'supabase' : 'compiled_rules_mock',
        main: {
            name: mainName,
            palace: palaceName,
            vietnamese_meaning: vietnameseMeaning,
            overall_meaning: overallMeaning,
            topic_meaning: topicMeaning
        },
        changed: fallbackChanged ? {
            name: dbChangedHex?.name || fallbackChanged.name,
            palace: dbChangedHex?.palace || fallbackChanged.palace,
            vietnamese_meaning: dbChangedHex?.vietnamese_meaning || fallbackChanged.meaning,
            overall_meaning: dbChangedHex?.overall_meaning || fallbackChanged.overall
        } : null,
        lines: dbLines.length > 0 ? dbLines.map(l => ({
            line_number: l.line_number,
            relation: l.relation,
            meaning_static: l.meaning_static,
            meaning_active: l.meaning_active
        })) : [
            { line_number: 1, relation: 'Tử Tôn', meaning_static: 'Tích lũy nội lực.', meaning_active: 'Giải vây khó khăn.' },
            { line_number: 2, relation: 'Thê Tài', meaning_static: 'Tài lộc có duyên.', meaning_active: 'Giao dịch hanh thông.' }
        ],
        deity: deityInfo,
        analysisHtml: analysisHtml,
        catHung: catHung,
        templateContent: scenarioText,
        aiExplanation: aiExplanation
    });
}

function getFallbackHex(hex_id) {
    const list = {
        63: { name: 'Bát Thuần Càn', palace: 'Càn', meaning: 'Thuần Càn (Trời)', overall: 'Cương kiện, sáng tạo vô hạn. Vạn sự khởi đầu đại cát.', career: 'Cơ hội thăng tiến mạnh mẽ, có vị trí lãnh đạo. Tránh kiêu ngạo.', love: 'Nồng nhiệt nhưng dễ bất hòa do cái tôi lớn, nên nhường nhịn.', wealth: 'Tài lộc hanh thông, đầu tư sinh lời lớn.', health: 'Sinh lực tốt, đề phòng cao huyết áp.' },
        0: { name: 'Bát Thuần Khôn', palace: 'Khôn', meaning: 'Thuần Khôn (Đất)', overall: 'Nhu thuận, bao dung. Thuận theo tự nhiên sẽ gặt hái đại cát.', career: 'Nên kiên trì, làm việc nhóm hoặc hỗ trợ cấp trên sẽ tốt hơn.', love: 'Tình cảm êm đẹp, hòa thuận. Hôn nhân bao dung lẫn nhau.', wealth: 'Tài lộc ổn định từ tích lũy, tránh đầu cơ mạo hiểm.', health: 'Chú ý hệ tiêu hóa, dạ dày.' },
        28: { name: 'Phong Lôi Ích', palace: 'Tốn', meaning: 'Phong Lôi Ích', overall: 'Lợi ích, bồi đắp phát triển tốt đẹp.', career: 'Công danh thuận lợi, có cơ hội thăng tiến mạnh mẽ.', love: 'Tình cảm thấu hiểu, nồng nàn gắn kết.', wealth: 'Tài lộc dồi dào, đầu tư thu lời tốt.', health: 'Sức khỏe tốt.' },
        12: { name: 'Sơn Lôi Di', palace: 'Tốn', meaning: 'Sơn Lôi Di', overall: 'Nuôi dưỡng, tự dưỡng thân tâm.', career: 'Thích hợp học tập nghiên cứu, nâng cao tay nghề.', love: 'Tình cảm chia sẻ, chăm sóc lẫn nhau thiết thực.', wealth: 'Chi tiêu hợp lý, tránh thất thoát lớn.', health: 'Chú ý ngộ độc thức ăn.' }
    };
    return list[hex_id] || { name: 'Quẻ Số ' + hex_id, palace: 'Chưa rõ', meaning: 'Đang cập nhật...', overall: 'Đang cập nhật...', career: 'Đang cập nhật...', love: 'Đang cập nhật...', wealth: 'Đang cập nhật...', health: 'Đang cập nhật...' };
}
