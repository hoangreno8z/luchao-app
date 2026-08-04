import type { Metadata } from 'next';
import ErrorBoundary from '@/components/common/ErrorBoundary';
import ThaiAtContainer from '@/components/thai-at/ThaiAtContainer';

export const metadata: Metadata = {
  title: 'Thái Ất Thần Số - Hệ Thống Lập Quẻ Tự Động',
  description: 'Ứng dụng lập quẻ Thái Ất Thần Số tự động 6 chế độ: Tuế Kể, Nguyệt Kể, Nhật Kể, Thời Kể, Quẻ Dịch, Bàn Nhân Mệnh.',
};

export default function ThaiAtPage() {
  return (
    <div className="w-full flex flex-col gap-6">
      <header className="text-center py-4 border-b border-[#d4af37]/30">
        <div className="text-2xl md:text-3xl font-extrabold text-[#d4af37] tracking-widest mb-1">
          太乙神數
        </div>
        <h1 className="text-xl md:text-2xl font-bold text-white tracking-wide">
          THÁI ẤT THẦN SỐ
        </h1>
        <p className="text-xs md:text-sm text-[#a0aec0] italic mt-1">
          Hệ Thống Lập Quẻ Tự Động — Thái Ất Thần Kinh (Trạng Trình Nguyễn Bỉnh Khiêm)
        </p>
      </header>

      <ErrorBoundary fallbackMessage="Có lỗi xảy ra khi tải ứng dụng Thái Ất Thần Số.">
        <ThaiAtContainer />
      </ErrorBoundary>
    </div>
  );
}
