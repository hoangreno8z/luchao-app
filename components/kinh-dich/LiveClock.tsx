'use client';

import { useEffect, useState } from 'react';

export default function LiveClock() {
  const [timeStr, setTimeStr] = useState<string>('--:--:--');

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const p = (n: number) => (n < 10 ? '0' + n : String(n));
      setTimeStr(`${p(now.getHours())}:${p(now.getMinutes())}:${p(now.getSeconds())} (Ngày ${p(now.getDate())}/${p(now.getMonth() + 1)}/${now.getFullYear()})`);
    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full text-center py-2 px-4 bg-[#120b05]/60 border border-[#3d2a19] rounded-xl text-xs md:text-sm text-[#bda287]">
      <span>Thời gian gieo quẻ hiện tại (Giờ chuẩn Việt Nam GMT+7): </span>
      <span className="font-semibold text-[#dfb15b] font-mono">{timeStr}</span>
    </div>
  );
}
