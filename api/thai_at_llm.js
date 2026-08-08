import { THAI_AT_KNOWLEDGE } from './thai_at_knowledge.js';
export const maxDuration = 60;

// List of models to try in order — all free-tier eligible, no models below 3.5
const MODELS = [
    'gemini-3.5-flash-lite',
    'gemini-3.5-flash',
    'gemini-3.6-flash',
];

export default async function handler(req, res) {
    // CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method !== 'POST') {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        const payload = req.body;
        if (!payload || !payload.mode) {
            return res.status(400).json({ error: "Thiếu dữ liệu sa bàn. Vui lòng khởi quẻ trước." });
        }

        const geminiKey = process.env.GEMINI_API_KEY;
        if (!geminiKey) {
            return res.status(500).json({ error: "Chưa cấu hình API Key trên máy chủ." });
        }

        // Build star positions string safely
        let starPositions = 'Không có dữ liệu';
        if (payload.stars && Array.isArray(payload.stars) && payload.stars.length > 0) {
            starPositions = payload.stars
                .map(c => `- Cung ${c.cung}: ${(c.stars || []).join(', ')}`)
                .join('\n');
        }

        // Construct the prompt with priority order
        const promptText = `BẠN LÀ MỘT ĐẠI SƯ THÁI ẤT THẦN SỐ CÓ 40 NĂM KINH NGHIỆM LUẬN GIẢI SA BÀN.

--- KIẾN THỨC CỐT LÕI THÁI ẤT ---
${THAI_AT_KNOWLEDGE}

--- THÔNG SỐ SA BÀN HIỆN TẠI ---
- Chế độ: ${payload.mode || 'N/A'}
- Khối Số: ${payload.khoiSo || 'Chưa xác định'} (${payload.tinhChatKhoi || 'Chưa xác định'})
- Bát Môn: ${payload.batMon || 'Chưa xác định'}
- Cửu Tinh: ${payload.cuuTinh || 'Chưa xác định'}
- Cục Số: ${payload.donCucName || 'Chưa xác định'}
- Toán Chủ: ${payload.toanChu || 'Không có'}
- Toán Khách: ${payload.toanKhach || 'Không có'}
- Toán Định: ${payload.toanDinh || 'Không có'}

Vị trí các Thần Tinh trên 16 Cung:
${starPositions}

--- YÊU CẦU LUẬN GIẢI (TUÂN THỦ TRÌNH TỰ ƯU TIÊN) ---

1. ☯️ THẾ TRẬN 72 KHỐI DƯƠNG:
   - Sa bàn này ứng với Khối Số nào trong 72 Khối Dương?
   - Đánh giá tổng quan thế trận Cát/Hung của khối này.

2. 🌟 CÁT HUNG CỦA THÁI ẤT:
   - Thái Ất đang ở cung nào? Ngũ hành, Vượng hay Suy?
   - Cát hung đối với tình hình hiện tại.

3. 🚪 THÁI ẤT SO VỚI BÁT MÔN (8 CỬA):
   - Thái Ất rơi vào cửa nào? Sinh lộ hay tử lộ?

4. ⚔️ TOÁN CHỦ - KHÁCH THẮNG THUA:
   - Toán Chủ/Khách dài hay ngắn? Hòa hay Bất Hòa?
   - Bên nào có lợi thế?

5. ♟️ TƯỚNG, THỦY KÍCH, VĂN XƯƠNG PHỐI HỢP:
   - Vị trí Đại/Tiểu Tướng Chủ-Khách, Văn Xương, Thủy Kích.
   - Cách cục bất thường (Yểm, Kích, Ép, Cách, Tù, Chặn, Đối, Cắp)?
   - Kết luận chuyên sâu: Ai được lợi, ai chịu thiệt, thời gian ứng nghiệm.

6. 💡 LỜI KHUYÊN HÓA GIẢI:
   - Nên Tiến hay Thoái? Đánh hay Thủ?
   - Phương vị tốt/hung?

ĐỊNH DẠNG: HTML (dùng <h3>, <p>, <ul>, <li>, <strong>) với style:
- Tiêu đề: style="color:#d4af37"
- Hung: style="color:#ff4444"
- Cát: style="color:#4CAF50"
BẮT ĐẦU LUẬN GIẢI NGAY.`;

        const requestBody = {
            contents: [{ parts: [{ text: promptText }] }],
            generationConfig: {
                temperature: 0.75,
                maxOutputTokens: 4000,
            }
        };

        // Try each model in order until one succeeds
        let lastError = null;
        for (const model of MODELS) {
            try {
                console.log(`Trying model: ${model}`);
                const controller = new AbortController();
                const timeout = setTimeout(() => controller.abort(), 50000); // 50s timeout

                const response = await fetch(
                    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${geminiKey}`,
                    {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(requestBody),
                        signal: controller.signal
                    }
                );
                clearTimeout(timeout);

                if (response.status === 429 || response.status === 404) {
                    const errText = await response.text();
                    lastError = `Model ${model}: ${response.status}`;
                    console.log(`Model ${model} failed (${response.status}), trying next...`);
                    continue;
                }

                if (!response.ok) {
                    const errorText = await response.text();
                    lastError = `Model ${model}: ${response.status} - ${errorText}`;
                    console.log(`Model ${model} failed: ${response.status}`);
                    continue; // Try next model instead of throwing
                }

                const responseData = await response.json();

                // Safely extract text
                const candidate = responseData?.candidates?.[0];
                if (!candidate?.content?.parts?.[0]?.text) {
                    lastError = `Model ${model}: Empty response`;
                    console.log(`Model ${model}: no text in response`);
                    continue;
                }

                let outputText = candidate.content.parts[0].text;

                // Remove markdown code fences if AI wraps its HTML
                outputText = outputText
                    .replace(/^```html\s*\n?/i, '')
                    .replace(/^```\s*\n?/i, '')
                    .replace(/\n?```\s*$/i, '');

                console.log(`SUCCESS with model: ${model}`);
                return res.status(200).json({ html: outputText, model });

            } catch (modelErr) {
                if (modelErr.name === 'AbortError') {
                    lastError = `Model ${model}: Timeout (>50s)`;
                } else {
                    lastError = modelErr.message;
                }
                console.log(`Model ${model} error: ${lastError}`);
                continue;
            }
        }

        // All models failed
        return res.status(503).json({
            error: `Tất cả mô hình AI đều không khả dụng lúc này. Vui lòng thử lại sau vài phút. (${lastError})`
        });

    } catch (error) {
        console.error("API Error:", error);
        return res.status(500).json({ error: error.message });
    }
}
