# START HERE — đưa cho Gemini / Antigravity

1. Đọc `docs/MASTER_PROMPT_GEMINI.md` trước.
2. Đọc `docs/ARCHITECTURE.md`.
3. Đọc `README.md`.
4. Xem 3 ảnh trong `public/reference/` để hiểu mục tiêu thị giác.
5. Đọc toàn bộ source code.
6. Không chạy theo hướng “sửa CSS cho giống ảnh”. Phải giữ kiến trúc `HouseConfig → HouseGeometry → Renderers`.
7. Nếu repository này được đặt cạnh một project cũ của người dùng, hãy audit project cũ trước khi merge; không xóa logic phong thủy đã có.

## Mục tiêu nghiệm thu

- Input công năng + kích thước + phương hướng + năm.
- Sinh mặt bằng vector lớn, rõ, đúng tỷ lệ.
- Hai tab: Bản vẽ tư vấn / Cửu Cung.
- Tab Cửu Cung dùng chính geometry của tab tư vấn.
- Zoom/pan mobile.
- Export SVG/PNG.
- Công thức phong thủy tách khỏi renderer và có thể thay ruleset.
