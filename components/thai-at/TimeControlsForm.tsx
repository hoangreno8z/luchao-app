'use client';

import { useState } from 'react';
import { ThaiAtInputSchema, ThaiAtMode } from '@/lib/validations/thaiAtSchema';

interface TimeControlsFormProps {
  currentMode: ThaiAtMode;
  onCastChart: (dateStr: string, timeStr: string) => void;
}

export default function TimeControlsForm({ currentMode, onCastChart }: TimeControlsFormProps) {
  const now = new Date();
  const defaultDate = now.toISOString().split('T')[0];
  const defaultTime = now.toTimeString().substring(0, 5);

  const [date, setDate] = useState<string>(defaultDate);
  const [time, setTime] = useState<string>(defaultTime);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    const validation = ThaiAtInputSchema.safeParse({
      mode: currentMode,
      date,
      time,
    });

    if (!validation.success) {
      setErrorMsg(validation.error.errors[0]?.message || 'Dữ liệu không hợp lệ');
      return;
    }

    onCastChart(date, time);
  };

  return (
    <div className="w-full bg-[#121834]/80 border border-[#d4af37]/30 rounded-xl p-5 backdrop-blur-md">
      <h2 className="text-[#d4af37] font-bold text-sm md:text-base border-b border-[#d4af37]/20 pb-2 mb-4">
        🔮 Điều Chỉnh Thời Gian
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="input-date" className="block text-xs text-[#a0aec0] mb-1 font-semibold">
            Chọn Ngày Lập Quẻ (Dương Lịch)
          </label>
          <input
            type="date"
            id="input-date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-2.5 bg-[#050711] border border-[#d4af37]/30 rounded-lg text-xs md:text-sm text-white focus:outline-none focus:border-[#d4af37]"
            required
          />
        </div>

        <div>
          <label htmlFor="input-time" className="block text-xs text-[#a0aec0] mb-1 font-semibold">
            Chọn Giờ Lập Quẻ
          </label>
          <input
            type="time"
            id="input-time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full p-2.5 bg-[#050711] border border-[#d4af37]/30 rounded-lg text-xs md:text-sm text-white focus:outline-none focus:border-[#d4af37]"
            required
          />
        </div>

        {errorMsg && (
          <p className="text-red-400 text-xs font-semibold">{errorMsg}</p>
        )}

        <button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-[#aa8033] to-[#dfb15b] text-[#050711] font-bold text-xs md:text-sm rounded-lg hover:brightness-110 transition-all shadow-md"
        >
          ⚡ KHỞI QUẺ THÁI ẤT
        </button>
      </form>
    </div>
  );
}
