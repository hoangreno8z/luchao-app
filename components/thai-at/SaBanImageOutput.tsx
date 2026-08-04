'use client';

import Image from 'next/image';

interface SaBanImageOutputProps {
  imgSrc: string | null;
  isLoading: boolean;
}

export default function SaBanImageOutput({ imgSrc, isLoading }: SaBanImageOutputProps) {
  return (
    <div className="w-full flex flex-col items-center justify-center my-4">
      {isLoading && (
        <div className="flex items-center gap-3 p-4 bg-[#d4af37]/10 border border-[#d4af37] rounded-xl text-[#d4af37] text-xs md:text-sm font-semibold mb-4 animate-pulse">
          <div className="w-5 h-5 border-2 border-[#d4af37] border-t-transparent rounded-full animate-spin"></div>
          <span>Đang khởi tạo ảnh Sa Bàn HD...</span>
        </div>
      )}

      {imgSrc ? (
        <div className="w-full flex flex-col items-center">
          <div className="relative w-full max-w-[950px] overflow-hidden rounded-xl border-2 border-[#d4af37] shadow-2xl">
            <Image
              id="thai-at-chart-img"
              src={imgSrc}
              alt="Sa Bàn Thái Ất Thần Số PNG"
              width={1200}
              height={900}
              className="w-full h-auto object-contain cursor-pointer select-none"
              priority
              unoptimized
            />
          </div>

          <div className="mt-4 flex flex-col items-center gap-2">
            <a
              id="btn-download-direct"
              href={imgSrc}
              download="SaBan_ThaiAt.png"
              className="inline-flex items-center justify-center gap-2 py-3 px-8 bg-gradient-to-r from-[#16a085] to-[#2ecc71] text-white font-bold text-xs md:text-sm rounded-xl shadow-lg hover:brightness-110 transition-all"
            >
              💾 TẢI ẢNH SA BÀN (PNG)
            </a>
            <p className="text-xs text-[#a0aec0] text-center max-w-lg">
              💡 <strong>Mẹo lưu ảnh:</strong> Chạm &amp; giữ 1-2 giây trực tiếp lên hình ảnh sa bàn (trên điện thoại/iPad) hoặc click chuột phải (trên máy tính) để lưu về máy.
            </p>
          </div>
        </div>
      ) : (
        !isLoading && (
          <div className="w-full p-8 text-center bg-[#121834]/40 border border-[#d4af37]/20 rounded-xl text-[#a0aec0] text-xs md:text-sm">
            <span>Vui lòng chọn ngày giờ và bấm <strong>⚡ KHỞI QUẺ THÁI ẤT</strong> để lập bản đồ Sa Bàn.</span>
          </div>
        )
      )}
    </div>
  );
}
