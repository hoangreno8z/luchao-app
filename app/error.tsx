'use client';

import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Unhandled Global Error:', error);
  }, [error]);

  return (
    <div className="w-full max-w-xl mx-auto my-12 p-8 bg-[#8b0000]/20 border border-[#8b0000] rounded-2xl text-center shadow-2xl">
      <h2 className="text-[#ff6666] font-bold text-lg mb-2">⚠️ Có lỗi xảy ra trong ứng dụng!</h2>
      <p className="text-xs text-[#ffb3b3] mb-6">{error.message || 'Đã xảy ra lỗi không xác định. Vui lòng thử lại.'}</p>
      <button
        onClick={() => reset()}
        className="py-2.5 px-6 bg-[#8b0000] text-white text-xs font-bold rounded-xl hover:bg-red-700 transition-colors shadow-lg"
      >
        Tải Lại Ứng Dụng
      </button>
    </div>
  );
}
