'use client';

import { useState } from 'react';
import Image from 'next/image';
import { HexagramData } from '@/lib/engines/ichingCore';

interface HexagramResultCardProps {
  data: HexagramData;
  onReset: () => void;
}

export default function HexagramResultCard({ data, onReset }: HexagramResultCardProps) {
  const [imgDataUrl, setImgDataUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  const handleExport = async () => {
    setIsGenerating(true);
    try {
      const target = document.getElementById('hexagram-capture-target');
      if (!target) return;

      const html2canvasModule = (await import('html2canvas')).default;
      const canvas = await html2canvasModule(target, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#0f0a05',
        logging: false,
      });

      const dataUrl = canvas.toDataURL('image/png');
      setImgDataUrl(dataUrl);
    } catch (e) {
      console.error('Lỗi khi tạo ảnh thẻ quẻ:', e);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="w-full flex flex-col items-center gap-6">
      <div className="flex gap-4">
        <button
          onClick={handleExport}
          disabled={isGenerating}
          aria-label="Tạo và tải ảnh quẻ dịch"
          className="py-2.5 px-6 rounded-xl font-bold text-xs md:text-sm bg-gradient-to-r from-[#16a085] to-[#2ecc71] text-white shadow-lg hover:brightness-110 disabled:opacity-50 transition-all"
        >
          {isGenerating ? '⏳ Đang Tạo Ảnh...' : '📸 TẠO ẢNH QUẺ HD'}
        </button>

        <button
          onClick={onReset}
          aria-label="Gieo quẻ dịch mới"
          className="py-2.5 px-6 rounded-xl font-bold text-xs md:text-sm bg-[#3d2a19] text-[#dfb15b] border border-[#dfb15b]/30 shadow-md hover:bg-[#4d3621] transition-all"
        >
          🔄 GIEO QUẺ MỚI
        </button>
      </div>

      {imgDataUrl && (
        <div className="flex flex-col items-center gap-2 max-w-xl w-full">
          <div className="relative w-full overflow-hidden rounded-xl border border-[#dfb15b] shadow-2xl">
            <Image
              src={imgDataUrl}
              alt="Thẻ Quẻ Kinh Dịch Lục Hào PNG"
              width={800}
              height={1000}
              className="w-full h-auto object-contain cursor-pointer select-none"
              priority
              unoptimized
            />
          </div>
          <a
            href={imgDataUrl}
            download={`QueDich_${data.mainName.replace(/\s+/g, '_')}.png`}
            className="py-2.5 px-6 bg-[#2ecc71] text-white text-xs font-bold rounded-lg shadow-md hover:brightness-110"
          >
            💾 TẢI ẢNH VỀ MÁY
          </a>
          <p className="text-xs text-[#bda287] text-center">
            💡 <strong>Mẹo:</strong> Nhấn giữ vào ảnh (trên điện thoại/iPad) hoặc click chuột phải (trên máy tính) để lưu ảnh trực tiếp.
          </p>
        </div>
      )}

      {/* Render Target Element */}
      <div
        id="hexagram-capture-target"
        className="w-full max-w-xl p-6 bg-[#0f0a05] border-2 border-[#dfb15b] rounded-2xl shadow-2xl space-y-4"
      >
        <div className="text-center border-b border-[#dfb15b]/30 pb-3">
          <h2 className="text-[#dfb15b] font-extrabold text-lg md:text-xl tracking-wider">
            ☯ BẢN ĐỒ QUẺ DỊCH LỤC HÀO
          </h2>
          <p className="text-xs text-[#bda287] mt-1">{data.dateInfo.fullCanChi}</p>
          <p className="text-xs text-[#dfb15b] mt-0.5 font-semibold">
            Tiết Khí: {data.dateInfo.tietKhi} | Tuần Không: {data.dateInfo.tuanKhong}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 text-center p-3 bg-[#160f08] border border-[#3d2a19] rounded-xl text-xs">
          <div>
            <span className="text-[#bda287] block">QUẺ CHÍNH:</span>
            <span className="font-extrabold text-[#dfb15b] text-base">{data.mainName}</span>
            <span className="block text-[#a0aec0]">({data.palaceName} - {data.palaceEl} {data.mainAttr && `• ${data.mainAttr}`})</span>
          </div>
          <div>
            <span className="text-[#bda287] block">QUẺ BIẾN:</span>
            <span className="font-extrabold text-[#dfb15b] text-base">{data.changedName}</span>
            <span className="block text-[#a0aec0]">({data.changedPalaceName} {data.changedAttr && `• ${data.changedAttr}`})</span>
          </div>
        </div>

        <div className="space-y-2">
          {data.linesData.slice().reverse().map((line, idx) => {
            const lineNum = 6 - idx;
            return (
              <div
                key={lineNum}
                className="flex items-center justify-between p-2 rounded bg-[#160f08]/80 border border-[#3d2a19] text-xs"
              >
                <span className="text-[#bda287] font-semibold">Hào {lineNum}:</span>
                <span className="font-mono text-[#dfb15b]">
                  {line.lucThu} • {line.relation} {line.chi} ({line.hanh})
                </span>
                {line.isMoving && <span className="text-red-400 font-bold">🔥 Động</span>}
              </div>
            );
          })}
        </div>

        <div className="text-center pt-3 border-t border-[#dfb15b]/20 text-xs text-[#bda287]">
          <span>Dịch Sư Nguyễn Huy Hoàng — Zalo: 0933116860</span>
        </div>
      </div>
    </div>
  );
}
