'use client';

import { useState } from 'react';
import DisclaimerCard from './DisclaimerCard';
import LiveClock from './LiveClock';
import ContactPanel from './ContactPanel';

export default function KinhDichContainer() {
  const [acceptedTerms, setAcceptedTerms] = useState<boolean>(false);
  const [method, setMethod] = useState<'toss' | 'manual'>('toss');

  if (!acceptedTerms) {
    return <DisclaimerCard onProceed={() => setAcceptedTerms(true)} />;
  }

  return (
    <div className="w-full flex flex-col gap-6">
      <LiveClock />

      <div className="w-full bg-[#160f08]/90 border border-[#3d2a19] rounded-2xl p-6 shadow-2xl backdrop-blur-md">
        <div className="flex border-b border-[#dfb15b]/20 pb-3 mb-6 gap-3">
          <button
            onClick={() => setMethod('toss')}
            className={`flex-1 py-3 px-4 font-bold text-xs md:text-sm rounded-lg border transition-all ${
              method === 'toss'
                ? 'bg-[#aa8033] border-[#dfb15b] text-white shadow-md'
                : 'bg-black/30 border-[#3d2a19] text-[#bda287] hover:text-white'
            }`}
          >
            Tung Xu Trực Tuyến
          </button>
          <button
            onClick={() => setMethod('manual')}
            className={`flex-1 py-3 px-4 font-bold text-xs md:text-sm rounded-lg border transition-all ${
              method === 'manual'
                ? 'bg-[#aa8033] border-[#dfb15b] text-white shadow-md'
                : 'bg-black/30 border-[#3d2a19] text-[#bda287] hover:text-white'
            }`}
          >
            Tự Nhập 6 Hào
          </button>
        </div>

        <div className="text-center text-xs md:text-sm text-[#f5ece1]">
          {method === 'toss' ? (
            <p className="italic text-[#bda287]">Tính năng tung xu 3D đang sẵn sàng. Nhấn nút gieo xu để tạo quẻ dịch.</p>
          ) : (
            <p className="italic text-[#bda287]">Thiết lập 6 hào từ Hào 6 (trên cùng) xuống Hào 1 (dưới cùng).</p>
          )}
        </div>
      </div>

      <ContactPanel />
    </div>
  );
}
