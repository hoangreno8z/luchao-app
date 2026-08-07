import { THAI_AT_KNOWLEDGE } from './thai_at_knowledge.js';
export const maxDuration = 60; // Set max execution time to 60 seconds

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        const payload = req.body;
        
        // Construct the prompt
        let promptText = `BẠN LÀ MỘT QUÂN SƯ THÁI ẤT ĐẲNG CẤP THẾ GIỚI.
HÃY DỰA VÀO KIẾN THỨC THÁI ẤT SAU ĐÂY ĐỂ LUẬN GIẢI SA BÀN HIỆN TẠI.

--- KIẾN THỨC THÁI ẤT ---
${THAI_AT_KNOWLEDGE}

--- THÔNG SỐ SA BÀN HIỆN TẠI ---
- Chế độ: ${payload.mode}
- Khối Số: ${payload.khoiSo} (${payload.tinhChatKhoi})
- Bát Môn: ${payload.batMon}
- Cửu Tinh: ${payload.cuuTinh}
- Cục Số: ${payload.donCucName}
- Toán Chủ: ${payload.toanChu || 'Không có'}
- Toán Khách: ${payload.toanKhach || 'Không có'}
- Toán Định: ${payload.toanDinh || 'Không có'}

Vị trí các Thần Tinh trên 16 Cung:
${payload.stars.map(c => `- Cung ${c.cung}: ${c.stars.join(', ')}`).join('\n')}

--- YÊU CẦU LUẬN GIẢI KHẮT KHE ---
Chỉ ra rõ ràng và cụ thể, không nói chung chung:
1. SỰ KIỆN: Tốt cái gì, xấu cái gì? Vì sao? Dựa vào Cách cục nào (Tù, Yểm, Chặn, Ép...), Sao nào đóng cửa nào?
2. THỜI GIAN: Tai họa hay thịnh vượng sẽ xảy ra khi nào? (Luận theo thời gian của Khối, Toán dài hay ngắn).
3. PHƯƠNG VỊ: Tai họa/Thịnh vượng ở phương hướng nào? Đâu là hướng tốt để hóa giải?
4. LIÊN HỆ THỜI SỰ VĨ MÔ: (SỬ DỤNG GOOGLE SEARCH ĐỂ LẤY TIN TỨC MỚI NHẤT). Hãy kết hợp sa bàn với các sự kiện chính trị, kinh tế, xuất nhập khẩu, thiên tai trên thế giới và trong nước hiện nay để dự đoán XU HƯỚNG TƯƠNG LAI một cách thực tế. Khuyên người dùng nên làm gì.
Trình bày rõ ràng bằng HTML (dùng thẻ <h3>, <p>, <ul>, <li>, <strong>) với màu sắc bắt mắt (ví dụ: các ý chính bôi màu vàng gold #d4af37, tai họa bôi màu đỏ #ff4444). BẮT ĐẦU LUẬN GIẢI NGAY, KHÔNG CẦN CHÀO HỎI.`;

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
            tools: [
                { googleSearch: {} }
            ],
            generationConfig: {
                temperature: 0.7,
                maxOutputTokens: 2500,
            }
        };

        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody)
            }
        );

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Gemini API Error: ${response.status} - ${errorText}`);
        }

        const responseData = await response.json();
        
        let outputText = "";
        if (responseData.candidates && responseData.candidates[0].content.parts[0].text) {
            outputText = responseData.candidates[0].content.parts[0].text;
        } else {
            throw new Error("Không thể lấy nội dung luận giải từ AI.");
        }
        
        // Remove markdown block if AI returns it
        outputText = outputText.replace(/^```html\n/i, '').replace(/^```\n/i, '').replace(/```$/i, '');

        return res.status(200).json({ html: outputText });

    } catch (error) {
        console.error("API Error:", error);
        return res.status(500).json({ error: error.message });
    }
}
