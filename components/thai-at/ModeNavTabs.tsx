'use client';

import { ThaiAtMode } from '@/lib/validations/thaiAtSchema';

interface ModeNavTabsProps {
  currentMode: ThaiAtMode;
  onSelectMode: (mode: ThaiAtMode) => void;
}

const MODES: { id: ThaiAtMode; label: string }[] = [
  { id: 'tue', label: 'Quẻ Năm (Tuế Kể)' },
  { id: 'nguyet', label: 'Quẻ Tháng (Nguyệt Kể)' },
  { id: 'nhat', label: 'Quẻ Ngày (Nhật Kể)' },
  { id: 'thoi', label: 'Quẻ Giờ (Thời Kể)' },
  { id: 'dich', label: 'Quẻ Dịch' },
  { id: 'menh', label: 'Bàn Nhân Mệnh' },
];

export default function ModeNavTabs({ currentMode, onSelectMode }: ModeNavTabsProps) {
  return (
    <nav className="w-full flex flex-wrap gap-2 p-2 bg-[#121834]/80 border border-[#d4af37]/30 rounded-xl backdrop-blur-md">
      {MODES.map((mode) => (
        <button
          key={mode.id}
          onClick={() => onSelectMode(mode.id)}
          className={`flex-1 min-w-[120px] py-2 px-3 rounded-lg font-bold text-xs md:text-sm transition-all duration-200 border ${
            currentMode === mode.id
              ? 'bg-[#d4af37] border-[#ffd700] text-[#050711] shadow-[0_0_10px_rgba(212,175,55,0.4)]'
              : 'bg-black/30 border-[#d4af37]/20 text-[#a0aec0] hover:text-white hover:border-[#d4af37]/50'
          }`}
        >
          {mode.label}
        </button>
      ))}
    </nav>
  );
}
