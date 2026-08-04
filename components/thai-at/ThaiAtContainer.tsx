'use client';

import { useState } from 'react';
import { ThaiAtMode } from '@/lib/validations/thaiAtSchema';
import ModeNavTabs from './ModeNavTabs';
import TimeControlsForm from './TimeControlsForm';
import SaBanImageOutput from './SaBanImageOutput';
import { generateThaiAtPNG } from '@/lib/utils/pngExporter';

export default function ThaiAtContainer() {
  const [currentMode, setCurrentMode] = useState<ThaiAtMode>('tue');
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleCastChart = async (dateStr: string, timeStr: string) => {
    setIsLoading(true);
    setImgSrc(null);

    try {
      const generatedImg = await generateThaiAtPNG();
      setImgSrc(generatedImg);
    } catch (error) {
      console.error('Lỗi khởi quẻ Thái Ất:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleModeChange = (mode: ThaiAtMode) => {
    setCurrentMode(mode);
    const now = new Date();
    handleCastChart(now.toISOString().split('T')[0], now.toTimeString().substring(0, 5));
  };

  return (
    <div className="w-full flex flex-col gap-6">
      <ModeNavTabs currentMode={currentMode} onSelectMode={handleModeChange} />

      <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6 items-start">
        <TimeControlsForm currentMode={currentMode} onCastChart={handleCastChart} />
        <SaBanImageOutput imgSrc={imgSrc} isLoading={isLoading} />
      </div>

      {/* Hidden off-screen rendering element for html2canvas */}
      <div className="fixed left-[-9999px] top-0 w-[1200px] opacity-0 pointer-events-none overflow-hidden">
        <div id="thai-at-chart-capture" className="w-[1200px] p-6 bg-[#050711] rounded-2xl border-2 border-[#d4af37]">
          <div className="text-center font-bold text-lg text-[#ffd700] mb-4">
            ☯ NĂM THÁNG NGÀY GIỜ LẬP QUẺ THÁI ẤT
          </div>
          <div className="matrix-grid grid grid-cols-5 gap-2">
            <div id="cell-ton" className="cell-box p-3 bg-[#121834] border border-[#d4af37]/40 rounded-lg min-h-[140px] text-xs text-white">Tốn</div>
            <div id="cell-ty_chi" className="cell-box p-3 bg-[#121834] border border-[#d4af37]/40 rounded-lg min-h-[140px] text-xs text-white">Tị</div>
            <div id="cell-ngo" className="cell-box p-3 bg-[#121834] border border-[#d4af37]/40 rounded-lg min-h-[140px] text-xs text-white">Ngọ</div>
            <div id="cell-mui" className="cell-box p-3 bg-[#121834] border border-[#d4af37]/40 rounded-lg min-h-[140px] text-xs text-white">Mùi</div>
            <div id="cell-khon" className="cell-box p-3 bg-[#121834] border border-[#d4af37]/40 rounded-lg min-h-[140px] text-xs text-white">Khôn</div>

            <div id="cell-thin" className="cell-box p-3 bg-[#121834] border border-[#d4af37]/40 rounded-lg min-h-[140px] text-xs text-white">Thìn</div>
            <div id="cell-trung-cung" className="trung-cung-block col-span-3 row-span-3 p-4 bg-[#0a0e1e] border-2 border-[#d4af37] rounded-xl text-xs text-white">
              <div className="text-center font-bold text-sm text-[#ffd700] mb-2">TRUNG CUNG THÁI ẤT</div>
              <p>Dự Báo Cục Diện Thái Ất Thần Số</p>
              <p className="mt-4 font-semibold text-[#d4af37]">☯ Nguyễn Huy Hoàng - Zalo 0933116860</p>
            </div>
            <div id="cell-than" className="cell-box p-3 bg-[#121834] border border-[#d4af37]/40 rounded-lg min-h-[140px] text-xs text-white">Thân</div>

            <div id="cell-mao" className="cell-box p-3 bg-[#121834] border border-[#d4af37]/40 rounded-lg min-h-[140px] text-xs text-white">Mão</div>
            <div id="cell-dau" className="cell-box p-3 bg-[#121834] border border-[#d4af37]/40 rounded-lg min-h-[140px] text-xs text-white">Dậu</div>

            <div id="cell-dan" className="cell-box p-3 bg-[#121834] border border-[#d4af37]/40 rounded-lg min-h-[140px] text-xs text-white">Dần</div>
            <div id="cell-tuat" className="cell-box p-3 bg-[#121834] border border-[#d4af37]/40 rounded-lg min-h-[140px] text-xs text-white">Tuất</div>

            <div id="cell-can" className="cell-box p-3 bg-[#121834] border border-[#d4af37]/40 rounded-lg min-h-[140px] text-xs text-white">Cấn</div>
            <div id="cell-suu" className="cell-box p-3 bg-[#121834] border border-[#d4af37]/40 rounded-lg min-h-[140px] text-xs text-white">Sửu</div>
            <div id="cell-ty" className="cell-box p-3 bg-[#121834] border border-[#d4af37]/40 rounded-lg min-h-[140px] text-xs text-white">Tý</div>
            <div id="cell-hoi" className="cell-box p-3 bg-[#121834] border border-[#d4af37]/40 rounded-lg min-h-[140px] text-xs text-white">Hợi</div>
            <div id="cell-kien" className="cell-box p-3 bg-[#121834] border border-[#d4af37]/40 rounded-lg min-h-[140px] text-xs text-white">Kiền</div>
          </div>
        </div>
      </div>
    </div>
  );
}
