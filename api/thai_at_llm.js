import { THAI_AT_KNOWLEDGE } from './thai_at_knowledge.js';
export const maxDuration = 60;

// Models to try — all ≥3.5, free-tier eligible
const MODELS = [
    'gemini-3.5-flash-lite',
    'gemini-3.5-flash',
    'gemini-3.6-flash',
];

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method !== 'POST') return res.status(405).json({ error: "Method not allowed" });

    try {
        const payload = req.body;
        if (!payload || !payload.mode) {
            return res.status(400).json({ error: "Thiếu dữ liệu sa bàn." });
        }

        const geminiKey = process.env.GEMINI_API_KEY;
        if (!geminiKey) {
            return res.status(500).json({ error: "Chưa cấu hình API Key." });
        }

        // Build star positions
        let starPositions = 'Không có dữ liệu';
        if (payload.stars && Array.isArray(payload.stars) && payload.stars.length > 0) {
            starPositions = payload.stars
                .map(c => `- Cung ${c.cung}: ${(c.stars || []).join(', ')}`)
                .join('\n');
        }

        const promptText = `BẠN LÀ ĐẠI SƯ THÁI ẤT THẦN SỐ CÓ 40 NĂM KINH NGHIỆM, KẾT HỢP PHÂN TÍCH DỮ LIỆU HIỆN ĐẠI.
NHIỆM VỤ: Luận giải sa bàn Thái Ất CHI TIẾT, DÀI, CHUYÊN SÂU. Không nói chung chung. Phải cụ thể từng sao, từng cung, từng cách cục.

--- KIẾN THỨC CỐT LÕI THÁI ẤT ---
${THAI_AT_KNOWLEDGE}

--- THÔNG SỐ SA BÀN HIỆN TẠI ---
- Chế độ: ${payload.mode || 'N/A'}
- Khối Số: ${payload.khoiSo || '?'} (${payload.tinhChatKhoi || '?'})
- Bát Môn: ${payload.batMon || '?'}
- Cửu Tinh: ${payload.cuuTinh || '?'}
- Cục Số: ${payload.donCucName || '?'}
- Toán Chủ: ${payload.toanChu || '?'}
- Toán Khách: ${payload.toanKhach || '?'}
- Toán Định: ${payload.toanDinh || '?'}

Vị trí Thần Tinh trên 16 Cung:
${starPositions}

=== YÊU CẦU LUẬN GIẢI (BẮT BUỘC TUÂN THỦ, PHẢI VIẾT DÀI VÀ CHI TIẾT) ===

PHẦN 1: ☯️ THẾ TRẬN CỤC SỐ VÀ 72 KHỐI
- Khối Số bao nhiêu? Thuộc Khối Dương hay Khối Âm?
- Đánh giá tổng quan: Dương Khối thì lợi tấn công/khởi nghiệp, Âm Khối thì lợi phòng thủ/mai phục.
- Cục số hiện tại mang ý nghĩa gì? Thuận hay Nghịch?

PHẦN 2: 🌟 CÁT HUNG CỦA THÁI ẤT (TÔN MINH CHỦ)
- Thái Ất đang ở cung nào? Ngũ hành cung đó sinh hay khắc Thái Ất (Mộc)?
- Thái Ất Hòa hay Bất Hòa? (Cung Dương + Toán Chẵn = Hòa; ngược lại = Bất Hòa)
- Đánh giá Cát/Hung cụ thể: ảnh hưởng đến nguyên thủ, lãnh đạo, quốc gia, doanh nghiệp ra sao.

PHẦN 3: 🚪 THÁI ẤT VÀ BÁT MÔN
- Thái Ất đang rơi vào cửa nào trong 8 cửa?
- Phân tích chi tiết ý nghĩa cửa đó (ví dụ: Cửa Sinh = vạn vật xuất sinh, cát lợi; Cửa Tử = chết chóc, cực hung).
- Tác động đến sinh lộ hay tử lộ của sự việc.

PHẦN 4: ⚔️ TOÁN CHỦ - KHÁCH VÀ THẮNG THUA
- Toán Chủ bao nhiêu? Toán Khách bao nhiêu? Ai dài hơn?
- Có Vô Thiên (chưa quá 10), Vô Địa (đơn vị <5), Vô Nhân (đơn vị =0) không?
- Thuần Dương/Thuần Âm/Trùng Dương/Trùng Âm?
- KẾT LUẬN: Chủ (phòng thủ/nội địa) thắng hay Khách (bên ngoài/đối thủ) thắng? Vì sao?

PHẦN 5: ♟️ CÁC TƯỚNG, THỦY KÍCH, VĂN XƯƠNG & 11 CÁCH CỤC
- Phân tích VỊ TRÍ CỤ THỂ của từng sao quan trọng: Đại Tướng Chủ, Tham Tướng Chủ, Đại Tướng Khách, Tham Tướng Khách, Văn Xương, Thủy Kích, Ngũ Phúc, Đại Du, Tiểu Du, Dân Cơ, Thần Cơ, Quân Cơ.
- Kiểm tra từng cách cục bất thường trong 11 cách: Yểm, Kích, Ép, Cách, Tù, Chặn, Đối, Cắp, Chấp Đề, Đề Cách, Tứ Quách Cố Đỗ.
- Nếu có cách cục nào, phải giải thích RÕ RÀNG: sao nào đóng ở đâu gây ra cách cục đó, và hậu quả là gì.

PHẦN 6: 📅 DỰ BÁO THÁNG TỐT/XẤU TRONG NĂM
- Liệt kê CỤ THỂ các tháng âm lịch nào TỐT, tháng nào XẤU trong năm hiện tại.
- Mỗi tháng phải có lý do (dựa vào cung nào, sao nào chi phối tháng đó).

PHẦN 7: 🧭 PHƯƠNG VỊ TỐT/XẤU
- Liệt kê CỤ THỂ: Phương Đông, Tây, Nam, Bắc, Đông Bắc, Đông Nam, Tây Bắc, Tây Nam — cái nào TỐT, cái nào XẤU.
- Mỗi phương vị phải có lý do (cung đó có sao gì, hung hay cát).

PHẦN 8: 📊 LIÊN HỆ THỜI SỰ VIỆT NAM VÀ THẾ GIỚI
(PHẦN NÀY RẤT QUAN TRỌNG — Hãy dựa vào kiến thức tổng hợp của bạn về tình hình hiện tại)
- Kết hợp sa bàn với tình hình KINH TẾ Việt Nam hiện tại: GDP, lạm phát, xuất nhập khẩu, bất động sản, chứng khoán.
- Kết hợp sa bàn với THỜI TIẾT/THIÊN TAI: mùa bão, lũ lụt, hạn hán ở Việt Nam.
- Kết hợp sa bàn với CHÍNH TRỊ: quan hệ ngoại giao, FDI, chính sách mới.
- LƯU Ý: Sa bàn là GỐC, thời sự là THAM CHIẾU để đối sánh. Ví dụ: nếu Đại Du ở cung Đông → dự báo chuỗi cung ứng phía Đông gặp vấn đề → đối chiếu với tin tức xuất nhập khẩu qua biên giới phía Đông.

PHẦN 9: 🔮 DỰ BÁO XU HƯỚNG TƯƠNG LAI
- Dựa trên toàn bộ phân tích trên, đưa ra DỰ BÁO CỤ THỂ cho 3-6 tháng tới.
- Ngành nghề nào sẽ phát triển? Ngành nào sẽ suy thoái?
- Thời điểm nào nên hành động? Thời điểm nào nên án binh bất động?

PHẦN 10: 💡 LỜI KHUYÊN HÀNH SỰ & HÓA GIẢI
- Nếu quẻ hung: Cách hóa giải cụ thể (phương vị tránh, màu sắc nên dùng, thời gian nên chờ).
- Nếu quẻ cát: Cách tận dụng cơ hội (hướng nào tốt để mở rộng, thời điểm đẩy mạnh).
- Lời khuyên thực tiễn cho doanh nghiệp, đầu tư, cá nhân.

=== ĐỊNH DẠNG BẮT BUỘC ===
Trả lời bằng HTML. Dùng các style sau:
- Tiêu đề phần: <h3 style="color:#d4af37; font-size:1rem; margin-top:20px; border-bottom:1px solid rgba(212,175,55,0.3); padding-bottom:5px;">
- Nội dung: <p style="color:#f5f0e1; margin:8px 0;">
- Điểm HUNG/XẤU: <span style="color:#ff6b6b; font-weight:bold;">
- Điểm CÁT/TỐT: <span style="color:#51cf66; font-weight:bold;">
- Danh sách: <ul style="color:#f5f0e1;"><li style="margin:4px 0;">
- Thông tin quan trọng: <strong style="color:#ffd43b;">
- Chú thích/giải thích thêm: <em style="color:#adb5bd;">

KHÔNG chào hỏi, KHÔNG giới thiệu. BẮT ĐẦU LUẬN GIẢI NGAY TỪ PHẦN 1.
Viết TỐI THIỂU 2000 từ. Càng chi tiết càng tốt.`;

        const requestBody = {
            contents: [{ parts: [{ text: promptText }] }],
            generationConfig: {
                temperature: 0.8,
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
