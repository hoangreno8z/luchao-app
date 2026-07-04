# Hướng Dẫn Triển Khai Website Kinh Dịch Lục Hào Lên Vercel

Trang web này được viết hoàn toàn bằng HTML, CSS và JavaScript thuần (không dùng framework phức tạp), giúp đạt tốc độ tải cực nhanh và dễ dàng triển khai lên Vercel thông qua GitHub.

## Các tệp tin trong dự án:
- `index.html`: Cấu trúc giao diện người dùng (Điều khoản, form gieo quẻ, kết quả).
- `style.css`: Thiết kế giao diện phong cách cổ điển, huyền học chất lượng cao, có hiệu ứng đồng xu quay.
- `calendar.js`: Thuật toán tính toán số ngày Julian, Can Chi theo giờ Việt Nam và Lịch Tiết khí chuẩn xác.
- `iching_core.js`: Thuật toán nạp giáp Lục Hào, Thế Ứng, Lục Thân, Phục Thần, Lục Thú, 12 Cung Trường Sinh và Thần Sát.
- `renderer.js`: Vẽ thẻ quẻ dịch chất lượng cao 1000x1000px lên Canvas và xuất ra ảnh PNG để lưu trữ.
- `app.js`: Quản lý luồng hoạt động chính của trang web.

---

## Hướng dẫn triển khai lên Vercel:

### Bước 1: Cài đặt Git (nếu máy tính của bạn chưa có)
1. Tải bộ cài đặt Git cho Windows tại: [https://git-scm.com/download/win](https://git-scm.com/download/win).
2. Chạy tệp tin cài đặt vừa tải về, cứ nhấn **Next** cho đến khi hoàn tất.
3. Mở Terminal (PowerShell hoặc Command Prompt) gõ lệnh: `git --version` để kiểm tra cài đặt thành công.

### Bước 2: Tạo kho chứa (Repository) trên GitHub
1. Truy cập vào trang web [https://github.com](https://github.com) và đăng nhập tài khoản của bạn (nếu chưa có tài khoản, hãy đăng ký miễn phí).
2. Nhấn nút **New** (hoặc truy cập `https://github.com/new`) để tạo một kho chứa mới.
3. Đặt tên cho kho chứa (ví dụ: `luchao-app`).
4. Để tùy chọn là **Public** hoặc **Private** tùy ý bạn, sau đó nhấn **Create repository**.

### Bước 3: Đẩy mã nguồn từ máy tính lên GitHub
1. Mở PowerShell hoặc Git Bash, di chuyển vào thư mục dự án này:
   ```powershell
   cd "C:\Users\ADMIN\.gemini\antigravity\scratch\luchao_app"
   ```
2. Thực hiện các lệnh sau để khởi tạo Git và đẩy mã nguồn lên GitHub (thay thế URL GitHub bằng link kho chứa của bạn):
   ```bash
   git init
   git add .
   git commit -m "Initialize Kinh Dich website"
   git branch -M main
   git remote add origin https://github.com/TÊN_TÀI_KHOẢN_CỦA_BẠN/luchao-app.git
   git push -u origin main
   ```

### Bước 4: Triển khai lên Vercel miễn phí
1. Truy cập trang web Vercel tại: [https://vercel.com](https://vercel.com).
2. Đăng nhập bằng tài khoản GitHub của bạn (nhấp chọn **Continue with GitHub**).
3. Sau khi đăng nhập, tại trang Dashboard của Vercel, nhấn chọn **Add New...** -> **Project**.
4. Bạn sẽ thấy danh sách các kho chứa từ tài khoản GitHub của mình. Nhấn nút **Import** bên cạnh kho chứa `luchao-app`.
5. Tại mục **Configure Project**:
   - **Framework Preset**: Vercel sẽ tự động phát hiện là **Other** (Static HTML) vì dự án là web tĩnh thuần.
   - Giữ nguyên các thiết lập mặc định khác.
6. Nhấn nút **Deploy** ở cuối trang.
7. Đợi khoảng 10-30 giây, Vercel sẽ tạo xong trang web và cung cấp cho bạn một đường dẫn (URL) dạng `https://luchao-app.vercel.app` để truy cập công khai!

---

## Hướng dẫn kết nối Supabase Cloud Database:

### Bước 1: Khởi tạo bảng dữ liệu trên Supabase
1. Đăng nhập vào [Supabase.com](https://supabase.com) và tạo một dự án mới (ví dụ: `luchao-db`).
2. Ở menu cột bên trái của dự án Supabase, click vào biểu tượng **SQL Editor** (hình thẻ có biểu tượng SQL).
3. Chọn **New Query** (Tạo truy vấn mới).
4. Mở tệp tin [database.sql](file:///C:/Users/ADMIN/.gemini/antigravity/scratch/luchao_app/database.sql) trong thư mục dự án này, copy toàn bộ nội dung dán vào SQL Editor trên web Supabase rồi bấm nút **Run** màu xanh ở góc phải.
5. Tạo tiếp một **New Query** khác, mở tệp tin [seed.sql](file:///C:/Users/ADMIN/.gemini/antigravity/scratch/luchao_app/seed.sql), copy toàn bộ nội dung dán vào và bấm **Run** để nạp dữ liệu bình giải mẫu.

### Bước 2: Lấy thông tin API để kết nối
1. Trên Supabase, vào mục **Project Settings** (Cài đặt) -> Chọn **API**.
2. Tìm và sao chép 2 giá trị:
   - **Project URL** (dạng `https://xxxx.supabase.co`)
   - **API Key** (dạng `eyJhbG...` ở dòng ghi là **anon public**)

### Bước 3: Khai báo biến cấu hình lên Vercel
1. Truy cập vào dự án `luchao-app` của bạn trên Vercel.
2. Chọn tab **Settings** (Cài đặt) -> Chọn mục **Environment Variables** (Biến môi trường) ở cột bên trái.
3. Thêm lần lượt 2 khóa sau:
   - **Tên khóa (Key):** `SUPABASE_URL` | **Giá trị (Value):** *[Dán Project URL đã copy ở trên vào]*
   - **Tên khóa (Key):** `SUPABASE_KEY` | **Giá trị (Value):** *[Dán API Key anon public đã copy ở trên vào]*
4. Nhấn **Save** (Lưu lại) sau mỗi lần thêm.
5. Vào tab **Deployments** trên Vercel, chọn lượt deploy gần nhất, click vào dấu ba chấm ở góc phải chọn **Redeploy** (Triển khai lại) để Vercel nạp các biến môi trường này vào code backend.

Chúc bạn thành công!
