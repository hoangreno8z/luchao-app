/**
 * Vercel Serverless Function - api/interpret.js
 * Fetches hexagram interpretations from Supabase securely using native REST API (PostgREST).
 * Requires SUPABASE_URL and SUPABASE_KEY environment variables configured on Vercel.
 */

// Node.js built-in fetch is available in Node 18+ on Vercel
export default async function handler(req, res) {
    // Enable CORS
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

    const { hex_id, changed_id, topic, gender } = req.query;

    if (!hex_id) {
        return res.status(400).json({ error: 'Missing hex_id parameter' });
    }

    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_KEY;

    // Fallback Mock Data if Supabase keys are not configured yet (useful for initial test)
    if (!supabaseUrl || !supabaseKey) {
        return res.status(200).json(getMockInterpretation(parseInt(hex_id), parseInt(changed_id), topic, gender));
    }

    try {
        const headers = {
            'apikey': supabaseKey,
            'Authorization': `Bearer ${supabaseKey}`,
            'Content-Type': 'application/json'
        };

        // Query main hexagram, changed hexagram, and main lines concurrently
        const [mainRes, changedRes, linesRes] = await Promise.all([
            fetch(`${supabaseUrl}/rest/v1/hexagrams?id=eq.${hex_id}`, { headers }).then(r => r.json()),
            changed_id ? fetch(`${supabaseUrl}/rest/v1/hexagrams?id=eq.${changed_id}`, { headers }).then(r => r.json()) : Promise.resolve([]),
            fetch(`${supabaseUrl}/rest/v1/lines?hexagram_id=eq.${hex_id}`, { headers }).then(r => r.json())
        ]);

        const mainHex = mainRes && mainRes[0];
        const changedHex = changedRes && changedRes[0];
        const mainLines = linesRes || [];

        if (!mainHex) {
            return res.status(404).json({ error: `Hexagram with ID ${hex_id} not found in database.` });
        }

        // Determine Deity interpretation helper based on topic
        let deityInterpretation = getDeityExplanation(topic, gender);

        // Filter meaning by topic
        let topicMeaning = "";
        if (topic === "công việc" || topic === "thi cử") topicMeaning = mainHex.career_meaning || "Đang cập nhật bình giải sự nghiệp...";
        else if (topic === "tình yêu" || topic === "hôn nhân") topicMeaning = mainHex.love_meaning || "Đang cập nhật bình giải tình cảm...";
        else if (topic === "sức khỏe") topicMeaning = mainHex.health_meaning || "Đang cập nhật bình giải sức khỏe...";
        else if (topic === "kinh doanh" || topic === "dự án") topicMeaning = mainHex.wealth_meaning || "Đang cập nhật bình giải tài lộc...";
        else topicMeaning = mainHex.overall_meaning || "Đang cập nhật bình giải...";

        // Formulate output JSON response
        return res.status(200).json({
            success: true,
            source: 'supabase',
            main: {
                name: mainHex.name,
                palace: mainHex.palace,
                vietnamese_meaning: mainHex.vietnamese_meaning,
                overall_meaning: mainHex.overall_meaning,
                topic_meaning: topicMeaning
            },
            changed: changedHex ? {
                name: changedHex.name,
                palace: changedHex.palace,
                vietnamese_meaning: changedHex.vietnamese_meaning,
                overall_meaning: changedHex.overall_meaning
            } : null,
            lines: mainLines.map(l => ({
                line_number: l.line_number,
                relation: l.relation,
                meaning_static: l.meaning_static,
                meaning_active: l.meaning_active
            })),
            deity: deityInterpretation
        });

    } catch (err) {
        console.error('Database connection error:', err);
        return res.status(500).json({
            error: 'Failed to connect to database',
            details: err.message,
            fallback: getMockInterpretation(parseInt(hex_id), parseInt(changed_id), topic, gender)
        });
    }
}

// Explanation of Dụng Thần based on Topic and Gender
function getDeityExplanation(topic, gender) {
    const map = {
        'công việc': { deity: 'Quan Quỷ (Quan chức, công danh)', kỵ: 'Tử Tôn (khắc Quan Quỷ)' },
        'thi cử': { deity: 'Phụ Mẫu (Bằng cấp, bài thi)', kỵ: 'Thê Tài (khắc Phụ Mẫu)' },
        'tình yêu': {
            deity: gender === 'Nam' ? 'Thê Tài (vợ, người yêu)' : 'Quan Quỷ (chồng, người yêu)',
            kỵ: gender === 'Nam' ? 'Huynh Đệ (khắc Tài)' : 'Tử Tôn (khắc Quan)'
        },
        'hôn nhân': {
            deity: gender === 'Nam' ? 'Thê Tài (vợ)' : 'Quan Quỷ (chồng)',
            kỵ: gender === 'Nam' ? 'Huynh Đệ' : 'Tử Tôn'
        },
        'sức khỏe': { deity: 'Thế Hào (chính mình) & Tử Tôn (Y dược)', kỵ: 'Quan Quỷ (Bệnh tật)' },
        'kinh doanh': { deity: 'Thê Tài (Lợi nhuận) & Tử Tôn (Nguồn tài)', kỵ: 'Huynh Đệ (Hao tài)' },
        'dự án': { deity: 'Thê Tài (Tài chính)', kỵ: 'Huynh Đệ' },
        'tìm kiếm': { deity: 'Thê Tài (Vật dụng) hoặc Tử Tôn (Thú cưng)', kỵ: 'Quan Quỷ (Trộm cướp)' },
        'thai sản': { deity: 'Tử Tôn (Thai nhi)', kỵ: 'Phụ Mẫu (Khắc Tử Tôn)' },
        'ông bà cha mẹ': { deity: 'Phụ Mẫu (Cha mẹ)', kỵ: 'Thê Tài' },
        'con cháu': { deity: 'Tử Tôn (Con cháu)', kỵ: 'Phụ Mẫu' },
        'anh em': { deity: 'Huynh Đệ (Anh em)', kỵ: 'Quan Quỷ' }
    };
    return map[topic] || { deity: 'Thế Hào (Chính mình)', kỵ: 'Hào khắc dụng thần' };
}

// Fallback Mock Data Generator (so the web app still works immediately even without Supabase configuration)
function getMockInterpretation(hex_id, changed_id, topic, gender) {
    const list = {
        63: { name: 'Bát Thuần Càn', palace: 'Càn', meaning: 'Thuần Càn (Trời)', overall: 'Cương kiện, sáng tạo vô hạn. Vạn sự khởi đầu đại cát.', career: 'Cơ hội thăng tiến mạnh mẽ, có vị trí lãnh đạo. Tránh kiêu ngạo.', love: 'Nồng nhiệt nhưng dễ bất hòa do cái tôi lớn, nên nhường nhịn.', wealth: 'Tài lộc hanh thông, đầu tư sinh lời lớn.', health: 'Sinh lực tốt, đề phòng cao huyết áp.' },
        0: { name: 'Bát Thuần Khôn', palace: 'Khôn', meaning: 'Thuần Khôn (Đất)', overall: 'Nhu thuận, bao dung. Thuận theo tự nhiên sẽ gặt hái đại cát.', career: 'Nên kiên trì, làm việc nhóm hoặc hỗ trợ cấp trên sẽ tốt hơn.', love: 'Tình cảm êm đẹp, hòa thuận. Hôn nhân bao dung lẫn nhau.', wealth: 'Tài lộc ổn định từ tích lũy, tránh đầu cơ mạo hiểm.', health: 'Chú ý hệ tiêu hóa, dạ dày.' },
        18: { name: 'Bát Thuần Khảm', palace: 'Khảm', meaning: 'Thuần Khảm (Nước)', overall: 'Hiểm trở, khó khăn chồng chất. Cần bình tĩnh vượt qua hiểm cảnh.', career: 'Sự nghiệp bế tắc, phòng tiểu nhân. Không nên thay đổi công việc.', love: 'Tình cảm trắc trở, nhiều hiểu lầm. Cần chân thành trao đổi.', wealth: 'Dễ thất thoát tiền bạc, tránh cho vai mượn.', health: 'Chú ý thận, hệ tiết niệu.' },
        45: { name: 'Bát Thuần Ly', palace: 'Ly', meaning: 'Thuần Ly (Lửa)', overall: 'Sáng suốt, rực rỡ nhưng cần chừng mực, tránh nóng vội.', career: 'Sự nghiệp thăng hoa trong mảng sáng tạo, truyền thông.', love: 'Nồng cháy nhưng nhanh đến đi, phòng cãi vã nhỏ.', wealth: 'Thu nhập tốt ngắn hạn, tránh vung tay quá trán.', health: 'Chú ý tim mạch, huyết áp.' }
    };

    const main = list[hex_id] || { name: 'Quẻ Số ' + hex_id, palace: 'Chưa rõ', meaning: 'Đang cập nhật...', overall: 'Đang cập nhật bình giải...', career: 'Đang cập nhật...', love: 'Đang cập nhật...', wealth: 'Đang cập nhật...', health: 'Đang cập nhật...' };
    const changed = changed_id ? (list[changed_id] || { name: 'Quẻ Số ' + changed_id, palace: 'Chưa rõ', meaning: 'Đang cập nhật...', overall: 'Đang cập nhật bình giải...' }) : null;

    let topicMeaning = main.overall;
    if (topic === "công việc" || topic === "thi cử") topicMeaning = main.career;
    else if (topic === "tình yêu" || topic === "hôn nhân") topicMeaning = main.love;
    else if (topic === "sức khỏe") topicMeaning = main.health;
    else if (topic === "kinh doanh" || topic === "dự án") topicMeaning = main.wealth;

    return {
        success: true,
        source: 'fallback_mock',
        main: {
            name: main.name,
            palace: main.palace,
            vietnamese_meaning: main.meaning,
            overall_meaning: main.overall,
            topic_meaning: topicMeaning
        },
        changed: changed ? {
            name: changed.name,
            palace: changed.palace,
            vietnamese_meaning: changed.meaning,
            overall_meaning: changed.overall
        } : null,
        lines: [
            { line_number: 1, relation: 'Tử Tôn', meaning_static: 'Hào tĩnh: Nên tích lũy nội lực.', meaning_active: 'Hào động (Tử Tôn): Tin vui cát tường, giải vây khó khăn.' },
            { line_number: 2, relation: 'Thê Tài', meaning_static: 'Hào tĩnh: Có cơ hội hợp tác tốt.', meaning_active: 'Hào động (Thê Tài): Tài lộc hứa hẹn, làm ăn có lời.' },
            { line_number: 5, relation: 'Thê Tài', meaning_static: 'Hào tĩnh: Tài lộc viên mãn.', meaning_active: 'Hào động (Thê Tài): Vận may gõ cửa, đàm phán thành công.' }
        ],
        deity: getDeityExplanation(topic, gender)
    };
}
