'use client';

import { useState } from 'react';

interface CoinTossStageProps {
  onFinish: (lines: number[], dateTimeStr: string) => void;
  initialLines?: number[];
}

export default function CoinTossStage({ onFinish, initialLines = [] }: CoinTossStageProps) {
  const [lines, setLines] = useState<number[]>(initialLines);
  const [isSpinning, setIsSpinning] = useState<boolean>(false);

  const handleToss = () => {
    if (isSpinning || lines.length >= 6) return;

    setIsSpinning(true);

    const spinDuration = Math.floor(Math.random() * 1000) + 1000;

    setTimeout(() => {
      const coin1 = Math.random() < 0.5;
      const coin2 = Math.random() < 0.5;
      const coin3 = Math.random() < 0.5;

      const yangCount = (coin1 ? 1 : 0) + (coin2 ? 1 : 0) + (coin3 ? 1 : 0);
      let lineVal = 1;
      if (yangCount === 0) lineVal = 0; // Lão Âm
      else if (yangCount === 1) lineVal = 1; // Thiếu Dương
      else if (yangCount === 2) lineVal = 2; // Thiếu Âm
      else lineVal = 3; // Lão Dương

      const updated = [...lines, lineVal];
      setLines(updated);
      setIsSpinning(false);

      if (updated.length === 6) {
        const nowStr = new Date().toISOString().slice(0, 16);
        onFinish(updated, nowStr);
      }
    }, spinDuration);
  };

  const getLineText = (val: number) => {
    if (val === 1) return { symbol: '—', name: 'Thiếu Dương (Dương Tĩnh)' };
    if (val === 2) return { symbol: '- -', name: 'Thiếu Âm (Âm Tĩnh)' };
    if (val === 3) return { symbol: '— O', name: 'Lão Dương (Dương Động)' };
    return { symbol: '- - X', name: 'Lão Âm (Âm Động)' };
  };

  return (
    <div className="flex flex-col items-center gap-6 w-full">
      <div className="flex gap-4 my-2">
        {[1, 2, 3].map((num) => (
          <div
            key={num}
            className={`w-14 h-14 rounded-full border-2 border-[#dfb15b] flex items-center justify-center font-bold text-sm bg-gradient-to-tr from-[#805e26] via-[#dfb15b] to-[#fff2d6] text-[#0f0a05] shadow-lg ${
              isSpinning ? 'animate-bounce' : ''
            }`}
            aria-label={`Đồng xu ${num}`}
          >
            ☯
          </div>
        ))}
      </div>

      <div className="w-full max-w-md bg-[#0a0603] p-4 rounded-xl border border-[#3d2a19]">
        <div className="text-center font-bold text-xs text-[#dfb15b] mb-3">
          TIẾN TRÌNH GIEO HÀO (LẦN GIEO {lines.length}/6)
        </div>
        <div className="flex flex-col-reverse gap-2">
          {[0, 1, 2, 3, 4, 5].map((idx) => {
            const val = lines[idx];
            const lineName = `Hào ${idx + 1}`;
            return (
              <div
                key={idx}
                className="flex items-center justify-between p-2 rounded bg-[#160f08] border border-[#3d2a19] text-xs"
              >
                <span className="font-semibold text-[#bda287]">{lineName}:</span>
                {val !== undefined ? (
                  <span className="font-mono font-bold text-[#dfb15b]">
                    {getLineText(val).symbol} ({getLineText(val).name})
                  </span>
                ) : (
                  <span className="text-[#666]">Chưa gieo</span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {lines.length < 6 && (
        <button
          onClick={handleToss}
          disabled={isSpinning}
          aria-label="Tung đồng xu gieo hào"
          className="w-full max-w-md py-3.5 px-6 rounded-xl font-bold text-sm bg-gradient-to-r from-[#aa8033] to-[#dfb15b] text-white shadow-lg hover:brightness-110 disabled:opacity-50 transition-all"
        >
          {isSpinning ? '⏳ Đang Tung Đồng Xu...' : 'TUNG ĐỒNG XU'}
        </button>
      )}
    </div>
  );
}
