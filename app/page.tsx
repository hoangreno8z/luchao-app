import type { Metadata } from 'next';
import ErrorBoundary from '@/components/common/ErrorBoundary';
import KinhDichContainer from '@/components/kinh-dich/KinhDichContainer';

export const metadata: Metadata = {
  title: 'Kinh Dịch Lục Hào - Gieo Quẻ Tự Động | NGUYỄN HUY HOÀNG',
  description: 'Gieo quẻ Kinh Dịch 3 đồng xu giả lập tự động, tính nạp giáp, ngũ hành sinh khắc, thần sát, lục thú chuẩn xác.',
};

export default function KinhDichPage() {
  return (
    <div className="w-full flex flex-col items-center gap-6">
      <header className="text-center py-4 border-b border-[#3d2a19] w-full">
        <h1 className="font-extrabold text-xl md:text-2xl tracking-wider text-[#dfb15b] drop-shadow-md">
          NGUYỄN HUY HOÀNG
        </h1>
        <p className="text-xs md:text-sm italic text-[#bda287]">zalo: 0933116860</p>
      </header>

      <ErrorBoundary fallbackMessage="Có lỗi xảy ra khi tải giao diện Kinh Dịch.">
        <KinhDichContainer />
      </ErrorBoundary>
    </div>
  );
}
