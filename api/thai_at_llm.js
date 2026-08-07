import { THAI_AT_KNOWLEDGE } from './thai_at_knowledge.js';
export const maxDuration = 60;

// List of models to try in order (free-tier friendly first)
const MODELS = [
    'gemini-3.5-flash-lite',
    'gemini-3.6-flash',
    'gemini-3.5-flash',
];

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        const payload = req.body;
        
        // Construct the prompt
        let promptText = `BẠN LÀ MỘT ĐẠI SƯ THÁI ẤT THẦN SỐ CÓ 40 NĂM KINH NGHIỆM LUẬN GIẢI SA BÀN.
HÃY DỰA VÀO KIẾN THỨC THÁI ẤT BÊN DƯỚI VÀ THÔNG SỐ SA BÀN HIỆN TẠI ĐỂ LUẬN GIẢI CHI TIẾT.

--- KIẾN THỨC CỐT LÕI THÁI ẤT ---
${THAI_AT_KNOWLEDGE}

--- THÔNG SỐ SA BÀN HIỆN TẠI ---
- Chế độ: ${payload.mode}
- Khối Số: ${payload.khoiSo || 'Chưa xác định'} (${payload.tinhChatKhoi || 'Chưa xác định'})
- Bát Môn: ${payload.batMon || 'Chưa xác định'}
- Cửu Tinh: ${payload.cuuTinh || 'Chưa xác định'}
- Cục Số: ${payload.donCucName || 'Chưa xác định'}
- Toán Chủ: ${payload.toanChu || 'Không có'}
- Toán Khách: ${payload.toanKhach || 'Không có'}
- Toán Định: ${payload.toanDinh || 'Không có'}

Vị trí các Thần Tinh trên 16 Cung:
${(payload.stars || []).map(c => `- Cung ${c.cung}: ${c.stars.join(', ')}`).join('\n')}

--- YÊU CẦU LUẬN GIẢI (BẮT BUỘC TUÂN THỦ) ---
Hãy luận giải SA BÀN trên một cách RÕ RÀNG, CỤ THỂ, KHÔNG NÓI CHUNG CHUNG. Chia thành các phần:

1. 🔍 SỰ KIỆN CHÍNH: 
   - Cách cục hiện tại là gì (Tù, Yểm, Bách, Chặn, Kích...)?
   - Sao nào đóng cửa nào? Tốt cái gì, xấu cái gì? Vì sao?
   - Chủ thắng hay Khách thắng? (dựa vào Toán dài/ngắn, Hòa/Bất Hòa)

2. ⏰ THỜI GIAN:
   - Tai họa hay thịnh vượng sẽ xảy ra vào khoảng thời gian nào?
   - Luận theo Khối, theo Toán, theo Cung.

3. 🧭 PHƯƠNG VỊ:
   - Phương hướng nào nguy hiểm? Phương nào an toàn, phát đạt?
   - Hướng tốt để hóa giải là hướng nào?

4. 📊 LIÊN HỆ THỰC TẾ VĨ MÔ:
   - Dựa trên kiến thức chung về tình hình kinh tế, chính trị, thiên tai, xuất nhập khẩu trong nước và thế giới hiện nay, kết hợp với Sa Bàn để đưa ra DỰ BÁO XU HƯỚNG TƯƠNG LAI thực tế.
   - Khuyên người dùng nên làm gì, tránh gì.

5. 💡 LỜI KHUYÊN HÓA GIẢI:
   - Nếu quẻ xấu: cách hóa giải, phương vị nên tránh.
   - Nếu quẻ tốt: cách tận dụng cơ hội, thời điểm hành động.

ĐỊNH DẠNG: Trả lời bằng HTML (dùng <h3>, <p>, <ul>, <li>, <strong>) với style:
- Tiêu đề dùng màu vàng gold: style="color:#d4af37"
- Điểm xấu/hung: style="color:#ff4444" 
- Điểm tốt/cát: style="color:#4CAF50"
- Thông tin quan trọng: dùng <strong>

BẮT ĐẦU LUẬN GIẢI NGAY, KHÔNG CẦN CHÀO HỎI HAY GIỚI THIỆU.`;

        const geminiKey = process.env.GEMINI_API_KEY;
        if (!geminiKey) {
            throw new Error("Missing GEMINI_API_KEY environment variable");
        }

        const requestBody = {
            contents: [
                {
                    parts: [{ text: promptText }]
                }
            ],
            generationConfig: {
                temperature: 0.75,
                maxOutputTokens: 3000,
            }
        };

        // Try each model in order until one succeeds
        let lastError = null;
        for (const model of MODELS) {
            try {
                const response = await fetch(
                    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${geminiKey}`,
                    {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(requestBody)
                    }
                );

                if (response.status === 429 || response.status === 404) {
                    // Quota exceeded or model not found, try next model
                    const errText = await response.text();
                    lastError = `Model ${model}: ${response.status} - ${errText}`;
                    console.log(`Model ${model} failed (${response.status}), trying next...`);
                    continue;
                }

                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error(`Gemini API Error: ${response.status} - ${errorText}`);
                }

                const responseData = await response.json();
                
                let outputText = "";
                if (responseData.candidates && responseData.candidates[0]?.content?.parts?.[0]?.text) {
                    outputText = responseData.candidates[0].content.parts[0].text;
                } else {
                    throw new Error("Không thể lấy nội dung luận giải từ AI.");
                }
                
                // Remove markdown code blocks if AI wraps its HTML output
                outputText = outputText.replace(/^```html\s*\n?/i, '').replace(/^```\s*\n?/i, '').replace(/\n?```\s*$/i, '');

                return res.status(200).json({ html: outputText, model: model });

            } catch (modelErr) {
                lastError = modelErr.message;
                console.log(`Model ${model} error: ${modelErr.message}`);
                continue;
            }
        }

        // All models failed
        throw new Error(`Tất cả mô hình AI đều thất bại. Lỗi cuối: ${lastError}`);

    } catch (error) {
        console.error("API Error:", error);
        return res.status(500).json({ error: error.message });
    }
}
