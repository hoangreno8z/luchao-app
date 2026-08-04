'use client';

import { useState } from 'react';

interface ManualInputStageProps {
  onFinish: (lines: number[], dateTimeStr: string) => void;
}

export default function ManualInputStage({ onFinish }: ManualInputStageProps) {
  const [lines, setLines] = useState<number[]>([1, 1, 1, 1, 1, 1]);

  const handleSelectChange = (index: number, val: number) => {
    const updated = [...lines];
    updated[index] = val;
    setLines(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const nowStr = new Date().toISOString().slice(0, 16);
    onFinish(lines, nowStr);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4 w-full max-w-md mx-auto">
      <div className="text-center font-bold text-xs text-[#dfb15b] mb-2">
        THIẾT LẬP 6 HÀO TỪ HÀO 6 (TRÊN) TỚI HÀO 1 (DƯỚI)
      </div>

      <div className="w-full space-y-3">
        {[5, 4, 3, 2, 1, 0].map((idx) => (
          <div key={idx} className="flex items-center justify-between gap-3 p-2.5 bg-[#0a0603] border border-[#3d2a19] rounded-xl text-xs">
            <label htmlFor={`select-line-${idx}`} className="font-semibold text-[#bda287]">
              Hào {idx + 1}:
            </label>
            <select
              id={`select-line-${idx}`}
              value={lines[idx]}
              onChange={(e) => handleSelectChange(idx, Number(e.target.value))}
              aria-label={`Chọn giá trị cho Hào ${idx + 1}`}
              className="p-2 bg-[#160f08] border border-[#3d2a19] text-[#dfb15b] rounded-lg text-xs font-semibold focus:outline-none focus:border-[#dfb15b]"
            >
              <option value={1}>— Thiếu Dương (Dương Tĩnh)</option>
              <option value={2}>- - Thiếu Âm (Âm Tĩnh)</option>
              <option value={3}>— O Lão Dương (Dương Động)</option>
              <option value={0}>- - X Lão Âm (Âm Động)</option>
            </select>
          </div>
        ))}
      </div>

      <button
        type="submit"
        aria-label="Hoàn tất và lập quẻ dịch"
        className="w-full py-3.5 px-6 rounded-xl font-bold text-sm bg-gradient-to-r from-[#aa8033] to-[#dfb15b] text-white shadow-lg hover:brightness-110 transition-all mt-2"
      >
        LẬP BẢN ĐỒ QUẺ DỊCH
      </button>
    </form>
  );
}
