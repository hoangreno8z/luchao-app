import { THAI_AT_KNOWLEDGE } from './thai_at_knowledge.js';
import { THAI_AT_KNOWLEDGE_72 } from './thai_at_knowledge_pdf.js';
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

--- KIẾN THỨC BỔ SUNG: 72 KHỐI DƯƠNG VÀ CÁC THẾ TRẬN ---
${THAI_AT_KNOWLEDGE_72}

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

--- YÊU CẦU LUẬN GIẢI (BẮT BUỘC TUÂN THỦ THEO TRÌNH TỰ ƯU TIÊN SAU) ---
Hãy luận giải SA BÀN trên một cách RÕ RÀNG, CỤ THỂ, KHÔNG NÓI CHUNG CHUNG. Chia thành các phần theo thứ tự ưu tiên:

1. ☯️ THẾ TRẬN 72 KHỐI DƯƠNG:
   - Sa bàn này ứng với Khối Số nào trong 72 Khối Dương? 
   - Đánh giá tổng quan thế trận Cát/Hung của khối này dựa theo nguyên lý 72 Khối.

2. 🌟 CÁT HUNG CỦA THÁI ẤT:
   - Thái Ất đang ở cung nào? Thuộc tính Ngũ hành, Vượng hay Suy?
   - Cát hung của Thái Ất đối với tình hình hiện tại (quốc gia/cá nhân/doanh nghiệp).

3. 🚪 THÁI ẤT SO VỚI BÁT MÔN (8 CỬA):
   - Thái Ất đang rơi vào cửa Sinh, Khai, Hưu (Cát) hay Đỗ, Thương, Tử, Kinh (Hung)?
   - Tác động của cửa này đến sinh lộ hay tử lộ của sự việc.

4. ⚔️ TOÁN CHỦ - KHÁCH VÀ THẮNG THUA:
   - Đánh giá Toán Chủ và Toán Khách (Dài hay Ngắn? Hòa hay Bất Hòa?).
   - Bên nào có lợi thế hơn? Chủ (phòng thủ) thắng hay Khách (tấn công) thắng?

5. ♟️ TƯỚNG, THỦY KÍCH, VĂN XƯƠNG PHỐI HỢP CÙNG CÁC SAO KHÁC:
   - Phân tích vị trí của Đại/Tiểu Tướng Chủ, Đại/Tiểu Tướng Khách, Văn Xương, Thủy Kích.
   - Có xảy ra các cách cục bất thường không (Yểm, Kích, Ép, Cách, Tù, Chặn, Đối, Cắp)?
   - Luận giải sự phối hợp của chúng để đưa ra kết luận chuyên sâu cuối cùng (Ai được lợi, ai chịu thiệt, thời gian ứng nghiệm).

6. 💡 LỜI KHUYÊN HÓA GIẢI:
   - Lời khuyên hành sự: Nên Tiến hay Thoái? Đánh hay Thủ?
   - Phương vị nào tốt để mưu sự, phương vị nào hung cần tránh?

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
