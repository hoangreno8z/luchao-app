'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavigationHeader() {
  const pathname = usePathname();

  const isKinhDich = pathname === '/' || pathname === '';
  const isThaiAt = pathname.startsWith('/thai-at');

  return (
    <nav className="w-full bg-[#120b05] border-b border-[#3d2a19] sticky top-0 z-50 shadow-md">
      <div className="max-w-4xl mx-auto flex items-center justify-center gap-4 p-3">
        <Link
          href="/"
          className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-bold text-sm transition-all duration-200 border ${
            isKinhDich
              ? 'bg-[#aa8033] border-[#dfb15b] text-white shadow-[0_0_12px_rgba(223,177,91,0.3)]'
              : 'bg-black/40 border-[#3d2a19] text-[#bda287] hover:border-[#dfb15b]/50 hover:text-white'
          }`}
        >
          <span className="text-base">☰</span> KINH DỊCH ĐẠI TOÀN
        </Link>
        <Link
          href="/thai-at"
          className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-bold text-sm transition-all duration-200 border ${
            isThaiAt
              ? 'bg-[#aa8033] border-[#dfb15b] text-white shadow-[0_0_12px_rgba(223,177,91,0.3)]'
              : 'bg-black/40 border-[#3d2a19] text-[#bda287] hover:border-[#dfb15b]/50 hover:text-white'
          }`}
        >
          <span className="text-base">☯</span> THÁI ẤT THẦN SỐ
        </Link>
      </div>
    </nav>
  );
}
