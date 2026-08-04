'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface CoinTossStageProps {
  onFinish: (lines: number[], dateTimeStr: string) => void;
  initialLines?: number[];
}

export default function CoinTossStage({ onFinish, initialLines = [] }: CoinTossStageProps) {
  const [lines, setLines] = useState<number[]>(initialLines);
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [coinStates, setCoinStates] = useState<boolean[]>([true, true, true]);

  const handleToss = () => {
    if (isSpinning || lines.length >= 6) return;

    setIsSpinning(true);

    const spinDuration = 1800;

    setTimeout(() => {
      const coin1 = Math.random() < 0.5;
      const coin2 = Math.random() < 0.5;
      const coin3 = Math.random() < 0.5;
      setCoinStates([coin1, coin2, coin3]);

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
      <div className="flex gap-6 my-4">
        {[0, 1, 2].map((idx) => (
          <motion.div
            key={idx}
            animate={
              isSpinning
                ? {
                    rotateY: [0, 720, 1440, 2160],
                    rotateX: [0, 360, 720, 1080],
                    scale: [1, 1.3, 0.9, 1],
                    y: [0, -30, 10, 0],
                  }
                : { rotateY: coinStates[idx] ? 0 : 180, scale: 1, y: 0 }
            }
            transition={{
              duration: isSpinning ? 1.8 : 0.4,
              ease: 'easeInOut',
              delay: idx * 0.1,
            }}
            className="w-16 h-16 rounded-full border-2 border-[#dfb15b] flex items-center justify-center font-bold text-base bg-gradient-to-tr from-[#805e26] via-[#dfb15b] to-[#fff2d6] text-[#0f0a05] shadow-[0_0_20px_rgba(223,177,91,0.5)] cursor-pointer select-none"
            aria-label={`Đồng xu Càn Long ${idx + 1}`}
          >
            <span className="text-xl font-mono">{coinStates[idx] ? '☯' : '乾'}</span>
          </motion.div>
        ))}
      </div>

      <div className="w-full max-w-md bg-[#0a0603] p-4 rounded-xl border border-[#3d2a19] shadow-inner">
        <div className="text-center font-bold text-xs text-[#dfb15b] mb-3 tracking-widest">
          TIẾN TRÌNH GIEO HÀO (LẦN GIEO {lines.length}/6)
        </div>
        <div className="flex flex-col-reverse gap-2">
          {[0, 1, 2, 3, 4, 5].map((idx) => {
            const val = lines[idx];
            const lineName = `Hào ${idx + 1}`;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="flex items-center justify-between p-2.5 rounded-lg bg-[#160f08] border border-[#3d2a19] text-xs"
              >
                <span className="font-semibold text-[#bda287]">{lineName}:</span>
                {val !== undefined ? (
                  <span className="font-mono font-bold text-[#dfb15b]">
                    {getLineText(val).symbol} ({getLineText(val).name})
                  </span>
                ) : (
                  <span className="text-[#555] italic">Chưa gieo</span>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {lines.length < 6 && (
        <button
          onClick={handleToss}
          disabled={isSpinning}
          aria-label="Tung đồng xu gieo hào"
          className="w-full max-w-md py-3.5 px-6 rounded-xl font-bold text-sm bg-gradient-to-r from-[#aa8033] to-[#dfb15b] text-white shadow-[0_4px_15px_rgba(223,177,91,0.3)] hover:brightness-110 disabled:opacity-50 transition-all active:scale-[0.98]"
        >
          {isSpinning ? '⏳ Đang Tung Đồng Xu 3D...' : `TUNG ĐỒNG XU (LẦN ${lines.length + 1})`}
        </button>
      )}
    </div>
  );
}
