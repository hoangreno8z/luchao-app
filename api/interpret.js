/**
 * Vercel Serverless Function - api/interpret.js
 * Runs Chu Than Ban's I Ching rules engine and integrates Google Gemini API for copywriting.
 * Uses embedded COMPILED_KNOWLEDGE and dynamic semantic code database mapping.
 */

const COMPILED_KNOWLEDGE = {
  "ontology": {
    "deities": {
      "Phụ Mẫu": {
        "symbols": ["Support", "Document", "Protection", "Education", "Vehicle", "House", "Authority_Figure"],
        "vietnamese": "Cha mẹ, trưởng bối, giấy tờ, nhà cửa, hợp đồng, đơn vị công tác"
      },
      "Quan Quỷ": {
        "symbols": ["Career", "Rank", "Power", "Pressure", "Illness", "Danger", "Competitor", "Worry"],
        "vietnamese": "Công danh, sự nghiệp, chức vụ, chồng/bạn trai (nữ hỏi), bệnh tật, lo âu, tai họa"
      },
      "Huynh Đệ": {
        "symbols": ["Competition", "Sibling", "Friend", "Peer", "Expense", "Obstacle", "Dispute"],
        "vietnamese": "Anh chị em, bạn bè, đối thủ cạnh tranh, hao tài, cản trở, chia rẽ"
      },
      "Thê Tài": {
        "symbols": ["Money", "Asset", "Relationship_Female", "Subordinate", "Resource"],
        "vietnamese": "Tiền tài, tài sản, lợi nhuận, vợ/bạn gái (nam hỏi), thuộc hạ, tài nguyên"
      },
      "Tử Tôn": {
        "symbols": ["Relaxation", "Child", "Medicine", "Cure", "Safety", "Happiness", "Anti_Ghost"],
        "vietnamese": "Con cái, học trò, thú cưng, thuốc men, cát tường, giải lo lắng, khắc chế tai họa"
      }
    },
    "beasts": {
      "Thanh Long": {
        "symbols": ["Noble", "Fortune", "Joy", "Premium", "Mariage"],
        "vietnamese": "Hỉ khánh, tài lộc vượng cát, cao quý, chuyện vui mừng, hôn nhân"
      },
      "Chu Tước": {
        "symbols": ["Message", "Speech", "Dispute", "Document", "Rumor"],
        "vietnamese": "Tin tức, văn thư, tranh chấp khẩu thiệt, cãi vã, tin đồn"
      },
      "Câu Trần": {
        "symbols": ["Stagnation", "Land", "Delay", "Old", "Arrest"],
        "vietnamese": "Trì trệ, đất đai thổ sản, chậm trễ, chuyện cũ, giam giữ"
      },
      "Đằng Xà": {
        "symbols": ["Anxiety", "Mystery", "Fear", "Strange", "Dream"],
        "vietnamese": "Lo lắng mơ hồ, kỳ quái, giấc mơ, ám ảnh kinh sợ, không rõ ràng"
      },
      "Bạch Hổ": {
        "symbols": ["Accident", "Blood", "Power", "Surgery", "Funeral"],
        "vietnamese": "Tai nạn, huyết quang, phẫu thuật, bệnh nặng, tang tóc, quyền uy, nóng nảy"
      },
      "Huyền Vũ": {
        "symbols": ["Secret", "Theft", "Lust", "Plan_Dark", "Lie"],
        "vietnamese": "Âm thầm, trộm cắp, lừa dối, âm mưu, tư thông tình ái ẩn giấu"
      }
    }
  },
  "rules": [
    {
      "name": "Nguyệt_Phá",
      "condition": "Deity.IsNguyetPha == true",
      "effect": { "power": -80, "risk": 50 },
      "explain": "Hào bị Nguyệt lệnh tương xung gọi là Nguyệt phá, lực lượng suy bại cao tầng."
    },
    {
      "name": "Tuần_Không",
      "condition": "Deity.IsTK == true",
      "effect": { "power": -30, "stability": -20 },
      "explain": "Hào lâm Tuần Không đại biểu sự việc chưa rõ ràng, chưa phát sinh hoặc gặp cản trở ngắn hạn."
    },
    {
      "name": "Ám_Động",
      "condition": "Deity.IsMoving == false && Deity.IsXungDay == true && Deity.IsVuongInMonth == true",
      "effect": { "power": 40, "timing": 80, "opportunity": 50 },
      "explain": "Hào tĩnh vượng tướng gặp Nhật xung là Ám động, chủ sự việc phát sinh rất nhanh ngoài dự kiến."
    },
    {
      "name": "Nhật_Phá",
      "condition": "Deity.IsMoving == false && Deity.IsXungDay == true && Deity.IsVuongInMonth == false",
      "effect": { "power": -60, "risk": 40 },
      "explain": "Hào tĩnh suy yếu bị Nhật xung là Nhật phá hoặc Động tán, hào bị phá vỡ không thể sinh khắc."
    },
    {
      "name": "Hồi_Đầu_Khắc",
      "condition": "Deity.IsMoving == true && Deity.IsHoiDauKhac == true",
      "effect": { "power": -90, "risk": 80 },
      "explain": "Hào động bị hào biến hồi đầu tương khắc, hào động hóa suy bại hoàn toàn, vô dụng."
    },
    {
      "name": "Hóa_Tiến_Thần",
      "condition": "Deity.IsMoving == true && Deity.TienThoai == 'tiến'",
      "effect": { "power": 50, "stability": 40 },
      "explain": "Hào động hóa tiến thần (như Dần hóa Mão, Tị hóa Ngọ), thế lực ngày càng vượng mạnh mẽ."
    },
    {
      "name": "Hóa_Thoái_Thần",
      "condition": "Deity.IsMoving == true && Deity.TienThoai == 'thoái'",
      "effect": { "power": -50, "stability": -40 },
      "explain": "Hào động hóa thoái thần (như Mão hóa Dần, Ngọ hóa Tị), thế lực ngày càng suy giảm, lùi bước."
    },
    {
      "name": "Thế_Động_Hóa_Quỷ",
      "condition": "Deity.IsShi == true && Deity.IsMoving == true && Deity.ChangedRelation == 'Quan Quỷ'",
      "effect": { "risk": 70, "threat": 60 },
      "explain": "Hào Thế phát động hóa ra Quan Quỷ, điềm báo tự thân hành động chiêu mời lo âu, tai họa."
    }
  ],
  "templates": {
    "công việc": {
      "scenarios": {
        "CAT": {
          "summary": "Công việc vô cùng hanh thông, cơ hội thăng tiến rộng mở.",
          "detail": "Quẻ cát tường hiển thị Dụng thần Quan Quỷ vượng tướng và Hào Thế hưng vượng. Bản mệnh có đầy đủ thực lực và được quý nhân nâng đỡ. Đây là thời cơ chín muồi để hành động, chuyển đổi công tác hoặc đảm nhận trọng trách mới.",
          "advice": "Hãy chủ động nắm bắt cơ hội, khiêm tốn học hỏi và quyết đoán thực thi kế hoạch."
        },
        "HUNG": {
          "summary": "Công việc gặp nhiều trắc trở, áp lực lớn, đề phòng rủi ro.",
          "detail": "Hệ thống phát hiện Dụng thần bị tổn hại (hồi đầu khắc, tuần không hoặc nguyệt phá) hoặc Hào Thế bị hóa Quỷ. Điềm báo mưu sự bất thành, dễ có sự tranh chấp, hao tài hoặc chịu áp lực nặng nề từ cấp trên.",
          "advice": "Thời điểm này nên tĩnh không nên động. Hãy tạm dừng các dự án lớn, phòng tránh tiểu nhân gièm pha và tập trung củng cố nội lực."
        },
        "BINH": {
          "summary": "Công việc ở thế tiến thoái lưỡng nan, có cơ hội nhưng bản thân mệt mỏi.",
          "detail": "Dữ liệu phân tích chỉ ra tình trạng 'Dụng vượng Thế suy'. Cơ hội việc làm hoặc dự án bên ngoài có triển vọng tốt, nhưng bản thân bạn lực lượng chưa đủ hoặc đang chịu nhiều stress, lo lắng nên chưa thể gánh vác trọn vẹn.",
          "advice": "Cần bồi bổ sức khỏe, phân bổ công việc hợp lý và không nên ôm đồm quá nhiều việc cùng lúc."
        }
      }
    },
    "tình yêu": {
      "scenarios": {
        "CAT": {
          "summary": "Tình duyên tốt đẹp, tình cảm thăng hoa ngọt ngào.",
          "detail": "Quẻ cát tường chỉ ra sự cảm ứng sâu sắc giữa Thế và Dụng thần (Thê Tài/Quan Quỷ). Hai bạn thấu hiểu và nâng đỡ lẫn nhau, gia đình đôi bên ủng hộ, mối quan hệ tiến triển vững chắc hướng tới hôn nhân viên mãn.",
          "advice": "Hãy trân trọng nhân duyên, chia sẻ chân thành để thắt chặt thêm sự gắn kết."
        },
        "HUNG": {
          "summary": "Tình duyên bất hòa, đề phòng rạn nứt hoặc chia rẽ.",
          "detail": "Quẻ hiện điềm báo bất lợi, kỵ thần Huynh Đệ hoặc Tử Tôn phát động khắc chế Dụng thần, hoặc hào Thế biến suy bại. Mối quan hệ dễ nảy sinh hiểu lầm lớn, cãi vã vặt vãnh hoặc có sự can thiệp từ bên ngoài gây rạn nứt.",
          "advice": "Cần bình tĩnh lắng nghe, kiềm chế cái tôi nóng nảy và tránh đưa ra quyết định vội vã lúc giận dỗi."
        },
        "BINH": {
          "summary": "Tình duyên bình lặng, chưa có đột phá rõ rệt.",
          "detail": "Quẻ cho thấy tình trạng tĩnh lặng hoặc Dụng vượng Thế suy. Tình cảm đôi bên vẫn còn nhưng có khoảng cách địa lý hoặc tâm lý chưa sẵn sàng mở lòng trọn vẹn, có chút lo lắng mơ hồ.",
          "advice": "Hãy tạo cơ hội gặp gỡ chia sẻ nhiều hơn, đừng để sự im lặng kéo dài tạo khoảng cách."
        }
      }
    }
  }
};

COMPILED_KNOWLEDGE.templates['thi cử'] = COMPILED_KNOWLEDGE.templates['công việc'];
COMPILED_KNOWLEDGE.templates['kinh doanh'] = COMPILED_KNOWLEDGE.templates['công việc'];
COMPILED_KNOWLEDGE.templates['dự án'] = COMPILED_KNOWLEDGE.templates['công việc'];
COMPILED_KNOWLEDGE.templates['hôn nhân'] = COMPILED_KNOWLEDGE.templates['tình yêu'];

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

function convertLucThanToCode(vietnamese) {
    const map = {
        'Phụ Mẫu': 'PHU_MAU',
        'Quan Quỷ': 'QUAN_QUY',
        'Huynh Đệ': 'HUYNH_DE',
        'Thê Tài': 'THE_TAI',
        'Tử Tôn': 'TU_TON'
    };
    // Extract first 2 words in case of full strings like "Quan Quỷ (Quan chức)"
    for (const key of Object.keys(map)) {
        if (vietnamese.includes(key)) return map[key];
    }
    return 'UNKNOWN';
}

function convertBeastToCode(vietnamese) {
    const map = {
        'Thanh Long': 'THANH_LONG',
        'Chu Tước': 'CHU_TUOC',
        'Câu Trần': 'CAU_TRAN',
        'Đằng Xà': 'DANG_XA',
        'Bạch Hổ': 'BACH_HO',
        'Huyền Vũ': 'HUYEN_VU'
    };
    for (const key of Object.keys(map)) {
        if (vietnamese.includes(key)) return map[key];
    }
    return 'UNKNOWN';
}

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
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
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
    let dbSemanticTexts = [];

    // MÃ HÓA NGỮ NGHĨA (SEMANTIC CODES GENERATOR)
    const generatedCodes = [];

    if (hexData && hexData.linesData) {
        const lines = hexData.linesData;
        const dayChi = hexData.dateInfo.nhatThan.split(' - ')[0];
        const monthChi = hexData.dateInfo.nguyetLenh.split(' - ')[0];
        const monthHanh = hexData.dateInfo.nguyetLenh.split(' - ')[1];

        // 1. Quẻ tĩnh / quẻ động
        const isMoving = lines.some(l => l.isMoving);
        generatedCodes.push(isMoving ? 'QUE_DONG' : 'QUE_TINH');

        // 2. Họ quẻ (Palace)
        const palaceName = hexData.palace || '';
        if (palaceName) generatedCodes.push(`PALACE_${palaceName.toUpperCase()}`);

        // 3. Phục ngâm / Phản ngâm / Lục xung / Lục hợp (nếu có)
        // Trạng thái quẻ tĩnh
        const isLucXung = lines.length === 6 && 
            XUNG_MAP[lines[0].chi] === lines[3].chi &&
            XUNG_MAP[lines[1].chi] === lines[4].chi &&
            XUNG_MAP[lines[2].chi] === lines[5].chi;
        if (isLucXung) generatedCodes.push('PROPERTY_LUC_XUNG');

        const isLucHop = lines.length === 6 && 
            SINH_MAP[lines[0].chi] === lines[3].chi; // simplified logic check
        if (isLucHop) generatedCodes.push('PROPERTY_LUC_HOP');

        // 4. Lục thân trì thế & Lục thú trì thế
        const shiLine = lines.find(l => l.isShi);
        if (shiLine) {
            const lucThanCode = convertLucThanToCode(shiLine.relation);
            generatedCodes.push(`THE_TRI_${lucThanCode}`);

            const beastCode = convertBeastToCode(shiLine.thu);
            generatedCodes.push(`THE_LUC_THU_${beastCode}`);
        }

        // 5. Xác định Dụng thần & các trạng thái vượng suy xung hợp
        const deityMap = {
            'công việc': 'Quan Quỷ', 'thi cử': 'Phụ Mẫu',
            'tình yêu': gender === 'Nam' ? 'Thê Tài' : 'Quan Quỷ',
            'hôn nhân': gender === 'Nam' ? 'Thê Tài' : 'Quan Quỷ',
            'sức khỏe': 'Tử Tôn', 'kinh doanh': 'Thê Tài', 'dự án': 'Thê Tài'
        };
        const targetRel = deityMap[topic] || 'Thế Hào';

        let deityIdx = lines.findIndex(l => (l.isShi || l.isYing) && l.relation.includes(targetRel));
        if (deityIdx === -1) deityIdx = lines.findIndex(l => l.isMoving && l.relation.includes(targetRel));
        if (deityIdx === -1) deityIdx = lines.findIndex(l => l.relation.includes(targetRel));

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

        if (deityIdx !== -1) {
            const deityLine = lines[deityIdx];
            const lucThanCode = convertLucThanToCode(deityLine.relation);
            generatedCodes.push(`DUNG_TRI_${lucThanCode}`);

            const beastCode = convertBeastToCode(deityLine.thu);
            generatedCodes.push(`DUNG_LUC_THU_${beastCode}`);

            const deityEval = evaluatedLines[deityIdx];
            if (deityEval.IsNguyetPha) generatedCodes.push('DUNG_STATUS_NGUYET_PHA');
            if (deityEval.IsTK) generatedCodes.push('DUNG_STATUS_TUAN_KHONG');
            if (deityEval.IsHoiDauKhac) generatedCodes.push('DUNG_STATUS_HOI_DAU_KHAC');
            if (deityEval.TienThoai === 'tiến') generatedCodes.push('DUNG_STATUS_TIEN_THAN');
            if (deityEval.TienThoai === 'thoái') generatedCodes.push('DUNG_STATUS_THOAI_THAN');
            if (deityEval.IsMoving === false && deityEval.IsXungDay === true && deityEval.IsVuongInMonth === true) {
                generatedCodes.push('DUNG_STATUS_AM_DONG');
            }
            if (deityEval.IsVuongInMonth) {
                generatedCodes.push('DUNG_STATUS_VUONG');
            } else {
                generatedCodes.push('DUNG_STATUS_SUY');
            }
        }

        if (shiLine && shiLine.isMoving) {
            const shiEval = evaluatedLines[lines.indexOf(shiLine)];
            if (shiEval.IsHoiDauKhac) generatedCodes.push('THE_STATUS_HOI_DAU_KHAC');
            if (shiLine.changed.relation.includes('Quan Quỷ')) generatedCodes.push('THE_STATUS_HOA_QUY');
        }
    }

    // 6. TRUY XUẤT DATABASE THEO MÃ HÓA (EXTRACT FROM DATABASE)
    if (supabaseUrl && supabaseKey) {
        try {
            const headers = {
                'apikey': supabaseKey,
                'Authorization': `Bearer ${supabaseKey}`,
                'Content-Type': 'application/json'
            };

            const [mainRes, changedRes, linesRes, semanticRes] = await Promise.all([
                fetch(`${supabaseUrl}/rest/v1/hexagrams?id=eq.${hex_id}`, { headers }).then(r => r.json()),
                changed_id ? fetch(`${supabaseUrl}/rest/v1/hexagrams?id=eq.${changed_id}`, { headers }).then(r => r.json()) : Promise.resolve([]),
                fetch(`${supabaseUrl}/rest/v1/lines?hexagram_id=eq.${hex_id}`, { headers }).then(r => r.json()),
                generatedCodes.length > 0 ? fetch(`${supabaseUrl}/rest/v1/semantic_texts?code=in.(${generatedCodes.join(',')})`, { headers }).then(r => r.json()) : Promise.resolve([])
            ]);

            dbMainHex = mainRes && mainRes[0];
            dbChangedHex = changedRes && changedRes[0];
            dbLines = linesRes || [];
            dbSemanticTexts = semanticRes || [];
        } catch (err) {
            console.error('Supabase query failed, running local mock...', err);
        }
    }

    // fallback to local if database returned nothing
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

    // Assembling explainability html and scores
    let scores = { power: 0, risk: 0, timing: 50, stability: 50, relationship: 50, opportunity: 0, threat: 0 };
    let catHung = "BINH";

    // Build the inference chain text from both database semantic texts and local codes fallback
    let analysisTextsList = [];
    generatedCodes.forEach(code => {
        const dbMatch = dbSemanticTexts.find(s => s.code === code);
        if (dbMatch) {
            analysisTextsList.push(dbMatch.vietnamese_text);
        } else {
            // fallback text mappings
            const fallbackTextMap = {
                'QUE_TINH': 'Quẻ tĩnh: Mọi sự bình lặng, lực lượng hai bên ổn định.',
                'QUE_DONG': 'Quẻ động: Sự việc đang có biến chuyển mạnh mẽ, cần hành động linh hoạt.',
                'DUNG_STATUS_VUONG': 'Dụng thần vượng tướng cát lợi.',
                'DUNG_STATUS_SUY': 'Dụng thần hưu tù suy nhược.',
                'DUNG_STATUS_NGUYET_PHA': 'Dụng thần bị Nguyệt phá, việc mưu khó thành.',
                'DUNG_STATUS_TUAN_KHONG': 'Dụng thần lâm Không, mọi việc còn mơ hồ.',
                'DUNG_STATUS_HOI_DAU_KHAC': 'Dụng thần bị Hồi đầu khắc, kết quả xấu.',
                'THE_STATUS_HOA_QUY': 'Thế động hóa Quỷ: Đề phòng tai họa, lo âu.'
            };
            if (fallbackTextMap[code]) {
                analysisTextsList.push(fallbackTextMap[code]);
            }
        }
    });

    // Score calculations
    if (generatedCodes.includes('DUNG_STATUS_VUONG')) scores.power += 30;
    if (generatedCodes.includes('DUNG_STATUS_SUY')) scores.power -= 20;
    if (generatedCodes.includes('DUNG_STATUS_NGUYET_PHA')) { scores.power -= 50; scores.risk += 30; }
    if (generatedCodes.includes('DUNG_STATUS_HOI_DAU_KHAC')) { scores.power -= 60; scores.risk += 50; }
    if (generatedCodes.includes('THE_STATUS_HOA_QUY')) scores.risk += 40;

    const netScore = scores.power - scores.risk;
    if (netScore > 10) catHung = "CAT";
    else if (netScore < -10) catHung = "HUNG";
    else catHung = "BINH";

    const topicTemplates = COMPILED_KNOWLEDGE.templates[topic] || COMPILED_KNOWLEDGE.templates['công việc'];
    const scenarioText = topicTemplates.scenarios[catHung];

    // AI personalization using dynamic codes mapping summary
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
                technical_findings: analysisTextsList.join('\n'),
                database_static_meaning: overallMeaning,
                database_topic_meaning: topicMeaning,
                database_advice: scenarioText.advice
            };

            const systemPrompt = `Bạn là một biên tập viên Lục Hào chuyên nghiệp.
Nhiệm vụ của bạn là tổng hợp các văn bản luận giải ngữ nghĩa đã trích xuất từ database dưới đây thành một báo cáo cá nhân hóa mạch lạc bằng tiếng Việt.

CÁC NGUYÊN TẮC:
1. KHÔNG tự bịa ngũ hành, can chi hay thay đổi kết luận cát hung đầu vào.
2. Dùng đại từ xưng hô thích hợp dựa trên giới tính của người hỏi để đưa ra lời khuyên.

Cấu trúc:
1. PHÂN TÍCH HIỆN TRẠNG (Đối quỹ thực chứng)
2. ĐÁNH GIÁ CÁT HUNG
3. DIỄN BIẾN CHI TIẾT
4. LỜI KHUYÊN HÀNH ĐỘNG`;

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

    const deityMap = {
        'công việc': 'Quan Quỷ', 'thi cử': 'Phụ Mẫu',
        'tình yêu': gender === 'Nam' ? 'Thê Tài' : 'Quan Quỷ',
        'hôn nhân': gender === 'Nam' ? 'Thê Tài' : 'Quan Quỷ',
        'sức khỏe': 'Tử Tôn', 'kinh doanh': 'Thê Tài', 'dự án': 'Thê Tài'
    };
    const targetRel = deityMap[topic] || 'Thế Hào';

    const deityInfo = {
        deity: targetRel,
        kỵ: targetRel === 'Quan Quỷ' ? 'Tử Tôn' : targetRel === 'Phụ Mẫu' ? 'Thê Tài' : targetRel === 'Thê Tài' ? 'Huynh Đệ' : 'Phụ Mẫu'
    };

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
            { line_number: 2, relation: 'Thê Tài', meaning_static: 'Tích tụ tài lộc.', meaning_active: 'Giao dịch hanh thông.' }
        ],
        deity: deityInfo,
        analysisHtml: `
            <p><strong>Dụng Thần Lục Thân:</strong> ${targetRel} (Hệ thống tự động xác định)</p>
            <ul>
                ${analysisTextsList.map(item => `<li>${item}</li>`).join('')}
            </ul>
        `,
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
