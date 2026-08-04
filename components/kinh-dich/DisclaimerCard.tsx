'use client';

import { useState } from 'react';

interface DisclaimerCardProps {
  onProceed: () => void;
}

export default function DisclaimerCard({ onProceed }: DisclaimerCardProps) {
  const [agreed, setAgreed] = useState(false);

  return (
    <div className="bg-[#160f08]/85 border border-[#3d2a19] rounded-2xl p-6 md:p-8 shadow-2xl backdrop-blur-md w-full">
      <h2 className="text-center font-bold text-lg md:text-xl text-[#dfb15b] tracking-wider border-b border-[#3d2a19] pb-4 mb-4">
        BẢNG ĐIỀU KHOẢN &amp; KHUYẾN CÁO SỬ DỤNG
      </h2>
      
      <div className="space-y-3 text-xs md:text-sm text-[#f5ece1] leading-relaxed text-justify max-h-80 overflow-y-auto pr-2 mb-6">
        <p><strong>Chào mừng bạn đến với hệ thống Luận Giải Kinh Dịch Lục Hào. Vui lòng đọc kỹ các khuyến cáo trước khi tham gia gieo quẻ:</strong></p>
        <p>1. Không gieo quẻ phục vụ cho các mục đích cờ bạc, cá cược dưới mọi hình thức.</p>
        <p>2. Không gieo quẻ nhằm mục đích vi phạm pháp luật hoặc xâm phạm quyền lợi hợp pháp của người khác.</p>
        <p>3. Không hỏi giới tính thai nhi hay các yếu tố liên quan đến tranh chấp chính trị.</p>
        <p>4. Các kết quả luận giải hoàn toàn dựa trên các công thức nạp giáp, ngũ hành sinh khắc được lưu truyền từ trí tuệ cổ xưa, mang tính chất chiêm nghiệm khách quan và tham khảo.</p>
        <p>5. Hệ thống giải đoán không thay thế cho các quyết định y tế chuyên nghiệp, quyết định đầu tư tài chính hoặc các quyết định lớn.</p>
        <p>6. Mọi câu trả lời từ quẻ dịch đều có thể xảy ra sai sót tùy thuộc vào ý niệm lúc gieo, hãy tự kiểm tra và chịu trách nhiệm trước khi đưa ra quyết định thực tế.</p>
        <p>7. Đảm bảo bạn trên 18 tuổi và có đầy đủ năng lực nhận thức hành vi dân sự trước khi tiếp tục.</p>
      </div>

      <label className="flex items-start gap-3 text-xs md:text-sm text-[#f5ece1] cursor-pointer mb-6 user-select-none">
        <input
          type="checkbox"
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
          className="mt-0.5 w-4 h-4 accent-[#dfb15b] cursor-pointer"
        />
        <span>Tôi đã đọc hết toàn bộ nội dung khuyến cáo trên và đồng ý hoàn toàn với các điều khoản này.</span>
      </label>

      <button
        onClick={onProceed}
        disabled={!agreed}
        className="w-full py-3 px-6 rounded-xl font-bold text-sm bg-gradient-to-r from-[#aa8033] to-[#dfb15b] text-white shadow-lg disabled:opacity-40 disabled:cursor-not-allowed hover:brightness-110 transition-all"
      >
        Tiếp Tục Vào Gieo Quẻ
      </button>
    </div>
  );
}
