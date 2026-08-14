import { THAI_AT_KNOWLEDGE } from './thai_at_knowledge.js';
import { THAI_AT_KNOWLEDGE_72, getMatchingCucKnowledge } from './thai_at_knowledge_pdf.js';
export const maxDuration = 60;

// List of models to try in order — all free-tier eligible
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
                .map(c => `- Cung ${c.cung.toUpperCase()}: ${(c.stars || []).join(', ')}`)
                .join('\n');
        }

        // Extract Cục number and Độn type for targeted book lookup
        const donCucStr = payload.donCucName || '';
        const mCuc = donCucStr.match(/(\d+)/);
        const cucNum = mCuc ? parseInt(mCuc[1]) : 1;
        const isAm = donCucStr.toLowerCase().includes('âm');
        const donType = isAm ? 'Âm Độn' : 'Dương Độn';

        // Extract targeted textbook knowledge for current Cục
        const matchingCucText = getMatchingCucKnowledge(donType, cucNum);

        // Construct the ultimate professional prompt
        const promptText = `BẠN LÀ MỘT BẬC ĐẠI SƯ THÁI ẤT THẦN SỐ & QUÂN SƯ CHIẾN LƯỢC ĐỈNH CAO.
NHIỆM VỤ CỦA BẠN LÀ LUẬN GIẢI TOÀN DIỆN VÀ CHUYÊN SÂU SA BÀN THÁI ẤT HIỆN TẠI THEO ĐÚNG 100% CƠ SỞ TRI THỨC VÀ BINH PHÁP THÁI ẤT THẦN KINH.

--- NGUYÊN TẮC BẮT BUỘC ---
1. BÁM SÁT 100% DỮ LIỆU ĐỒ HÌNH & VĂN BẢN GỐC SÁCH CỔ BÊN DƯỚI. KHÔNG BỊA ĐẶT THÊM CÁC THUYẾT NGOÀI HỆ THỐNG THÁI ẤT.
2. VỊ TRÍ CÁC SAO ĐÃ AN ĐỊNH TRÊN 16 CUNG, TUYỆT ĐỐI KHÔNG TỰ Ý ĐỔI CUNG HOẶC NHẦM LẪN GIỮA CÁC CUNG (Càn/Kiền=1, Ly=2, Cấn=3, Chấn=4, Trung Cung=5, Đoài=6, Khôn=7, Khảm=8, Tốn=9).
3. "Cục" và "Khối" LÀ MỘT (Ví dụ: Cục 45 chính là Khối 45).
4. Áp dụng chuẩn các thuật ngữ Thái Ất: Trường Toán/Đoản Toán, Vô Thiên/Vô Địa/Vô Nhân, Cửa Đóng (Bát Cửa Tắc), Đại/Tham Tướng Phát/Giam/Tù/Ép Trong/Ép Ngoài/Cách/Cắp/Bách/Kích.

--- VĂN BẢN GỐC SÁCH 144 KHỐI ĐỒ HÌNH CHO CỤC HIỆN TẠI ---
${matchingCucText || 'Không có đoạn văn bản trích xuất riêng, hãy sử dụng kho tri thức 72 Khối bên dưới.'}

--- CƠ SỞ LÝ THUYẾT CỐT LÕI & THÁI ẤT BINH PHÁP ---
${THAI_AT_KNOWLEDGE}

--- THÔNG SỐ SA BÀN HIỆN TẠI ---
- Chế Độ Lập Quẻ: ${payload.mode || 'N/A'}
- Tứ Trụ Can Chi: ${payload.tuTruStr || 'Không rõ'}
- Tiết Khí: ${payload.solarTerm || 'Không rõ'}
- Độn Cục: ${payload.donCucName || 'Không rõ'}
- Khối Số: ${payload.khoiSo !== undefined ? payload.khoiSo : cucNum} (${payload.tinhChatKhoi || 'Chính Cục'})
- Cửa Trực Sự (Bát Môn): ${payload.batMon || 'Không rõ'}
- Sao Trực Sự (Cửu Tinh): ${payload.cuuTinh || 'Không rõ'}
- Toán Chủ: ${payload.toanChu || 'N/A'}
- Toán Khách: ${payload.toanKhach || 'N/A'}
- Toán Định: ${payload.toanDinh || 'N/A'}
- Bát Hung / Cách Cục Bất Thường: ${payload.batHung || 'Không thuộc Bát Hung'}

Vị Trí Phân Bố Toàn Bộ Các Sao Trên 16 Cung:
${starPositions}

--- YÊU CẦU CẤU TRÚC BÀI LUẬN GIẢI CHUYÊN SÂU (ĐÚNG 7 CHƯƠNG) ---

HÃY TRÌNH BÀY BÀI LUẬN GIẢI THEO CẤU TRÚC 7 CHƯƠNG ĐẲNG CẤP DƯỚI ĐÂY:

CHƯƠNG 1: ☯️ ĐẠI CƯƠNG KHỐI CỤC & BINH PHÁP 144 KHỐI
- Phân tích chi tiết đặc điểm của Khối/Cục hiện tại dựa vào văn bản gốc sách cổ.
- Luận thế trận Chủ - Khách: Bên nào đắc lực thế hơn? Lợi thế phát động trước hay phát động sau?
- Binh pháp ứng dụng: Hướng xuất quân đắc lợi, hướng đánh tiêu diệt địch, hình thái trận pháp nên bày (tròn/vuông/nhọn/cong/thẳng), màu cờ nên phất (vàng/đỏ/xanh/trắng/đen), khung giờ phục binh cát lợi và tỷ lệ kỳ binh.

CHƯƠNG 2: ⚔️ TƯƠNG QUAN LỰC LƯỢNG CHỦ - KHÁCH & TAM TÀI ĐẮC THẾ
- Phân tích Toán Chủ (${payload.toanChu}) vs Toán Khách (${payload.toanKhach}): Ai là Trường Toán (Dài $\ge 11$), ai là Đoản Toán (Ngắn $\le 10$)?
- Xét Tam Tài: Có bị Vô Thiên (thiếu hàng chục), Vô Địa (tròn chục), hay Vô Nhân / Cửa Đóng (tận cùng 5) không?
- Đánh giá mức độ Hòa Khí (Thượng Hòa / Thứ Hòa / Hạ Hòa / Bất Hòa). Kết luận bên Chủ (phòng thủ/nội bộ) hay bên Khách (tiến công/bên ngoài) chiếm ưu thế áp đảo.

CHƯƠNG 3: 🚪 CÁT HUNG BÁT MÔN & CỬU TINH TRỰC SỰ
- Đánh giá Cửa Trực Sự (${payload.batMon}) và Sao Trực Sự (${payload.cuuTinh}).
- Phân tích vị trí Thái Ất và Văn Xương rơi vào Cửa nào trong 8 Cửa (Khai, Hưu, Sinh, Thương, Đỗ, Cảnh, Tử, Kinh) ➔ Đâu là Sinh Môn đắc lợi, đâu là Tử Lộ cần tránh.

CHƯƠNG 4: 🌪️ CHIÊM KHÍ TƯỢNG, PHONG HƯỚNG & THIÊN VĂN BIẾN TIẾT
- Phân tích hệ thống Thập Tinh Khí Tượng: Tam Phong, Ngũ Phong, Bát Phong, Phi Điểu, Thiên Hoàng, Đế Phù, Thiên Thời đang đóng tại các cung nào.
- Dự báo hiện tượng thời tiết: Gió to, mưa lạnh, giông bão, quầng nhật nguyệt, hay mây biến tiết theo giờ.

CHƯƠNG 5: 👑 CHIÊM ĐOÁN XÃ HỘI, DÂN SINH & VẬN HẠN TAM CƠ
- Luận giải vị thế Tam Cơ:
  + Quân Cơ (Cung đóng): Đánh giá tầng lớp lãnh đạo, người đứng đầu, chính sách vĩ mô.
  + Thần Cơ (Cung đóng): Đánh giá đội ngũ trợ thủ, bộ máy thực thi, quan chức, tướng tá.
  + Dân Cơ (Cung đóng): Đánh giá đời sống người dân, nhân tâm xã hội, dư luận, thị trường tiêu dùng.
- Tác động của Ngũ Phúc (Cát tinh cứu trợ) và Đại Du / Tiểu Du vận niên.

CHƯƠNG 6: 💼 ỨNG DỤNG THỰC TIỄN HIỆN ĐẠI (KINH DOANH, ĐẦU TƯ, DOANH NGHIỆP)
- Chuyển hóa thế trận cổ truyền sang thời đại hiện nay:
  + Đối với Đầu Tư / Tài Chính: Thời điểm nên mua vào (chủ động tấn công) hay giữ tiền mặt / phòng thủ?
  + Đối với Doanh Nghiệp & Dự Án: Quan hệ hợp tác đối tác (Chủ - Khách), phòng ngừa rủi ro bị đối tác ép/chèn lấn hay nắm thế thượng phong.
  + Đối với Nhân Sự: Nhận diện người trung dũng và kẻ cơ hội dựa trên thế Tướng.

CHƯƠNG 7: 🧭 PHƯƠNG ÁN HÀNH SỰ, GIỜ XUẤT HÀNH & HÓA GIẢI CÁT HUNG
- Chiến lược hành động tối ưu cho người cầu việc / gia chủ / nhà lãnh đạo.
- Liệt kê các phương vị đại cát nghênh đón vượng khí và phương vị đại hung cần kiêng kỵ.
- Các khung giờ cát lành (hoàng đạo Thái Ất) để khởi sự, ký kết, đàm phán.
- Phương pháp hóa giải nếu quẻ gặp các thế xấu (Yểm, Kích, Bách, Tù, Cách, Cáp).

=== ĐỊNH DẠNG TRẢ LỜI (HTML CAO CẤP) ===
Sử dụng mã HTML định dạng sang trọng theo mẫu sau:
- Tiêu đề chương: <h3 style="color:#d4af37; font-family:'Cinzel', serif; font-size:1.05rem; margin-top:24px; margin-bottom:10px; border-bottom:1px solid rgba(212,175,55,0.3); padding-bottom:6px;">
- Đoạn văn: <p style="color:#f5f0e1; margin:8px 0; line-height: 1.7; font-size:0.92rem;">
- Điểm CÁT / LỢI / CHIẾN THẮNG: <span style="color:#51cf66; font-weight:bold;">
- Điểm HUNG / NGUY HIỂM / BẤT LỢI: <span style="color:#ff6b6b; font-weight:bold;">
- ĐIỂM NHẤN CHIẾN LƯỢC / LỜI KHUYÊN: <span style="color:#ffd43b; font-weight:bold;">
- Danh sách ý: <ul style="color:#f5f0e1; padding-left:20px; margin:6px 0;"><li style="margin:4px 0;">

BẮT ĐẦU LUẬN GIẢI NGAY TỪ CHƯƠNG 1. TUYỆT ĐỐI KHÔNG CHÀO HỎI DẪN NHẬP.`;

        const requestBody = {
            contents: [{ parts: [{ text: promptText }] }],
            generationConfig: {
                temperature: 0.2,
                maxOutputTokens: 8192,
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
