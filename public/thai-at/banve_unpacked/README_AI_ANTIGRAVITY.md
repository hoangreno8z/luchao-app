# FENG SHUI CAD — MASTER HARDENING BUNDLE

Mục tiêu: biến bản vẽ phong thủy thành một CAD floor-plan engine thực sự, không phải canvas minh họa.

## Các lỗi phải sửa trước Phase 13

1. La bàn hiện tại phải là một overlay hình học thật trên footprint:
   - tâm la bàn = điểm đo / tâm hình học do người dùng chọn;
   - vòng 360°;
   - 24 sơn, mỗi sơn 15°;
   - mỗi sơn chia 3 long/sector 5° => 72 phân khu;
   - không gọi 72 phân khu là "72 Sơn". UI phải phân biệt: 24 Sơn / 72 Long.
   - Bắc/0° phải nhất quán với hệ quy chiếu đã chọn.
   - có mode Bắc trên và mode xoay theo hướng nhà.
   - hướng nhà phải là một vector hình học, không phải text nhập tay.

2. Floor plan phải là hình học CAD:
   - rectangle, L-shape, U-shape, stepped footprint, polygon lõm;
   - wall thickness là offset hình học;
   - room boundary là polygon thật;
   - snapping endpoint/midpoint/perpendicular/parallel/intersection;
   - dimensions là annotation dựa trên geometry;
   - cửa, cửa sổ, cầu thang là objects có hình học;
   - không vẽ "phòng" bằng các div rời rạc.

3. Solver không được sửa polygon tùy tiện rồi gọi đó là nghiệm.
   - Candidate Generator
   - Residual Evaluator
   - Topology Validator
   - Canonicalizer
   phải tách biệt.

4. DoF:
   - `2N - sum(equationCount)` chỉ là estimated DoF.
   - DoF chuẩn phải dựa trên numerical rank của Jacobian tại trạng thái hiện tại:
     `localDoF = variableCount - rank(J)`.
   - constraints phụ thuộc nhau không được đếm hai lần.

5. Martinez adapter:
   - phải phân biệt Polygon và MultiPolygon bằng shape guard đúng;
   - không dùng `geometry[0][0][0]` để phân loại;
   - mọi output ngoại lai phải đi qua Validator -> Normalizer.

6. Boolean:
   - intersection, union, difference, xor;
   - hỗ trợ MultiPolygon;
   - giữ holes;
   - không cho foreign Martinez types lọt vào Domain.

## Nguyên tắc UI

Canvas/SVG chỉ là renderer/editor. Core geometry không biết React.

Các layer:
SITE
WALL
ROOM
DOOR
WINDOW
STAIR
FURNITURE
DIMENSION
GRID
COMPASS
FENG_SHUI
ANNOTATION

Phong cách bản vẽ phải giống architectural floor plan:
- tường cắt: lineweight mạnh;
- cửa/cửa sổ: trung bình;
- nội thất: nhẹ;
- kích thước/chú thích: nhẹ;
- tỷ lệ và đơn vị nhất quán.

## Acceptance criteria

Không được đóng Phase 12/13 nếu:
- không tạo được L-shape thật;
- không tạo được footprint lệch;
- không kéo được một đỉnh mà topology vẫn hợp lệ;
- không overlay được La Kinh 24 Sơn/72 Long lên đúng footprint;
- không xoay La Kinh quanh tâm đo;
- không hiển thị bearing theo độ;
- không có snapping;
- không có dimension;
- Boolean MultiPolygon sai;
- solver báo SOLVED khi residual toàn cục chưa đạt tolerance;
- test chỉ kiểm tra trạng thái mà không kiểm tra geometry.

## Lệnh cho Antigravity

Đọc toàn bộ bundle này trước khi sửa code hiện hữu.

KHÔNG rewrite business logic phong thủy hiện có về:
- thời gian tung xu;
- logic âm dương;
- logic an quẻ.

Phần CAD/La Kinh được nâng cấp độc lập.

Trước khi code:
1. audit repository hiện tại;
2. lập danh sách file liên quan;
3. không xóa logic đang đúng;
4. chạy test hiện tại;
5. triển khai các module trong bundle;
6. viết regression tests;
7. chạy typecheck + tests + build;
8. kiểm tra trực quan các footprint: rectangle, L, U, stepped, skewed;
9. kiểm tra La Kinh tại 0°, 45°, 90°, 179.999°, 180°, 359.999°.

Không tuyên bố "hoàn thành" nếu chỉ compile.
