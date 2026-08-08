import { THAI_AT_KNOWLEDGE } from './thai_at_knowledge.js';
import { THAI_AT_KNOWLEDGE_72 } from './thai_at_knowledge_pdf.js';
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
        const promptText = `BẠN LÀ MỘT ĐẠI SƯ THÁI ẤT THẦN SỐ.
NHIỆM VỤ CỦA BẠN LÀ LUẬN GIẢI SA BÀN DỰA TRÊN DỮ LIỆU ĐƯỢC CUNG CẤP.
LƯU Ý ĐẶC BIỆT: 
1. BẠN CHỈ ĐƯỢC PHÉP LUẬN GIẢI DỰA TRÊN KIẾN THỨC BÊN DƯỚI, TUYỆT ĐỐI KHÔNG ĐƯỢC BỊA ĐẶT (HALLUCINATE) HOẶC SÁNG TẠO THÊM NỘI DUNG NÀO KHÁC VỀ THÁI ẤT.
2. VỊ TRÍ CÁC SAO ĐÃ ĐƯỢC CỐ ĐỊNH, BẠN KHÔNG ĐƯỢC PHÉP THAY ĐỔI VỊ TRÍ HAY NHẦM LẪN GIỮA CÁC CUNG (Ví dụ: Cung Cấn và Cung Càn/Kiền là khác nhau).
3. "Kiền" chính là "Càn", hai tên gọi này là một. Nếu dữ liệu ghi là Kiền, hãy hiểu đó là Càn.

--- KIẾN THỨC CỐT LÕI THÁI ẤT ---
${THAI_AT_KNOWLEDGE}

--- KIẾN THỨC 72 KHỐI DƯƠNG VÀ ÂM (DÙNG ĐỂ TRA CỨU CỤC SỐ) ---
${THAI_AT_KNOWLEDGE_72}

--- THÔNG SỐ SA BÀN HIỆN TẠI ---
- Chế độ: ${payload.mode || 'N/A'}
- Khối Số: ${payload.khoiSo || 'Chưa xác định'} (${payload.tinhChatKhoi || 'Chưa xác định'})
- Bát Môn: ${payload.batMon || 'Chưa xác định'}
- Cửu Tinh: ${payload.cuuTinh || 'Chưa xác định'}
- Cục Số: ${payload.donCucName || 'Chưa xác định'}
- Toán Chủ: ${payload.toanChu || 'Không có'}
- Toán Khách: ${payload.toanKhach || 'Không có'}
- Toán Định: ${payload.toanDinh || 'Không có'}

Vị trí các Thần Tinh trên 16 Cung (CHÚ Ý KỸ VỊ TRÍ NÀY ĐỂ KHÔNG NHẦM LẪN):
${starPositions}

--- YÊU CẦU LUẬN GIẢI (TUÂN THỦ TRÌNH TỰ ƯU TIÊN) ---

PHẦN 1: ☯️ THẾ TRẬN 72 KHỐI DƯƠNG/ÂM
- Tra cứu trong "Kiến thức 72 Khối" ở trên xem Khối Số hiện tại (ví dụ Dương Độn Cục 55) có đặc điểm gì?
- Chỉ viết những gì tài liệu cung cấp. KHÔNG ĐƯỢC TỰ BỊA ĐẶT THÊM NỘI DUNG NẾU TÀI LIỆU KHÔNG GHI. Nếu tài liệu không có, chỉ cần nêu Tên Khối và Cục.

PHẦN 2: 🌟 CÁT HUNG CỦA THÁI ẤT
- Thái Ất đang ở cung nào? Ngũ hành cung đó sinh hay khắc Thái Ất (Mộc)?
- Thái Ất Hòa hay Bất Hòa? (Cung Dương + Toán Chẵn = Hòa; ngược lại = Bất Hòa). Đánh giá Cát/Hung.

PHẦN 3: 🚪 THÁI ẤT VÀ BÁT MÔN
- Thái Ất đang rơi vào cửa nào trong 8 cửa? Tác động sinh tử ra sao?

PHẦN 4: ⚔️ TOÁN CHỦ - KHÁCH VÀ THẮNG THUA
- Toán Chủ bao nhiêu? Toán Khách bao nhiêu? Ai dài hơn?
- Kết luận: Chủ (phòng thủ) thắng hay Khách (tấn công) thắng?

PHẦN 5: ♟️ CÁC TƯỚNG, THỦY KÍCH, VĂN XƯƠNG & CÁCH CỤC
- Vị trí cụ thể của Đại Tướng, Tham Tướng, Văn Xương, Thủy Kích, Đại Du.
- Kiểm tra các cách cục bất thường. Gây ra hậu quả gì?

PHẦN 6: 📅 DỰ BÁO THÁNG TỐT/XẤU TRONG NĂM
- Liệt kê các tháng âm lịch tốt và xấu trong năm (dựa trên cung và sao).

PHẦN 7: 🧭 PHƯƠNG VỊ TỐT/XẤU
- Liệt kê phương vị (Đông, Tây, Nam, Bắc...) nào tốt, nào xấu dựa theo sao đóng ở đó.

PHẦN 8: 📊 LIÊN HỆ THỜI SỰ VIỆT NAM VÀ THẾ GIỚI
- KẾT HỢP sa bàn với KIẾN THỨC CỦA BẠN về KINH TẾ (GDP, lạm phát, chứng khoán), THỜI TIẾT (bão lụt) và CHÍNH TRỊ hiện tại của Việt Nam để đối chiếu.
- Lưu ý: Thông tin sa bàn là gốc, thời sự là tham chiếu.

PHẦN 9: 🔮 DỰ BÁO XU HƯỚNG TƯƠNG LAI
- Dự báo xu hướng 3-6 tháng tới (ngành nghề nào phát triển, ngành nào suy thoái).

PHẦN 10: 💡 LỜI KHUYÊN HÀNH SỰ & HÓA GIẢI
- Cách hóa giải nếu quẻ hung, cách tận dụng nếu quẻ cát. Lời khuyên thực tiễn.

=== ĐỊNH DẠNG BẮT BUỘC ===
Trả lời bằng HTML. Dùng các style sau:
- Tiêu đề phần: <h3 style="color:#d4af37; font-size:1rem; margin-top:20px; border-bottom:1px solid rgba(212,175,55,0.3); padding-bottom:5px;">
- Nội dung: <p style="color:#f5f0e1; margin:8px 0; line-height: 1.6;">
- Điểm HUNG/XẤU: <span style="color:#ff6b6b; font-weight:bold;">
- Điểm CÁT/TỐT: <span style="color:#51cf66; font-weight:bold;">
- Danh sách: <ul style="color:#f5f0e1;"><li style="margin:4px 0;">

KHÔNG chào hỏi, KHÔNG giới thiệu. BẮT ĐẦU LUẬN GIẢI NGAY TỪ PHẦN 1.`;

        const requestBody = {
            contents: [{ parts: [{ text: promptText }] }],
            generationConfig: {
                temperature: 0.2,
                maxOutputTokens: 8000,
            }
        };

        // Try each model until one succeeds
        let lastError = null;
        for (const model of MODELS) {
            try {
                console.log(`Trying model: ${model}`);
                const controller = new AbortController();
                const timeout = setTimeout(() => controller.abort(), 55000);

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
                    lastError = `Model ${model}: ${response.status}`;
                    console.log(`Model ${model} failed (${response.status}), next...`);
                    continue;
                }

                if (!response.ok) {
                    const errorText = await response.text();
                    lastError = `Model ${model}: ${response.status}`;
                    console.log(`Model ${model} failed: ${response.status}`);
                    continue;
                }

                const responseData = await response.json();
                const candidate = responseData?.candidates?.[0];
                if (!candidate?.content?.parts?.[0]?.text) {
                    lastError = `Model ${model}: Empty response`;
                    continue;
                }

                let outputText = candidate.content.parts[0].text;
                outputText = outputText
                    .replace(/^```html\s*\n?/i, '')
                    .replace(/^```\s*\n?/i, '')
                    .replace(/\n?```\s*$/i, '');

                console.log(`SUCCESS with model: ${model}, length: ${outputText.length}`);
                return res.status(200).json({ html: outputText, model });

            } catch (modelErr) {
                lastError = modelErr.name === 'AbortError' ? `${model}: Timeout` : modelErr.message;
                console.log(`Model ${model} error: ${lastError}`);
                continue;
            }
        }

        return res.status(503).json({
            error: `Tất cả mô hình AI đều không khả dụng. Thử lại sau vài phút. (${lastError})`
        });

    } catch (error) {
        console.error("API Error:", error);
        return res.status(500).json({ error: error.message });
    }
}
