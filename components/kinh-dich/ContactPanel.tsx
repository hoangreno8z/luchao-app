export default function ContactPanel() {
  return (
    <div className="w-full p-4 mt-4 bg-[#160f08]/90 border border-[#3d2a19] rounded-xl text-xs md:text-sm text-[#ebd9c5]">
      <h3 className="text-center font-bold text-[#ff4d4d] text-xs tracking-widest border-b border-[#ff4d4d]/30 pb-2 mb-3">
        LIÊN HỆ
      </h3>

      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2">
          <span className="text-[#dfb15b] font-bold text-xs">☯ Dịch Sư:</span>
          <span className="font-semibold text-white">HUY HOÀNG</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[#dfb15b] font-bold text-xs">💬 Zalo:</span>
          <a
            href="https://zalo.me/0933116860"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#66b2ff] underline font-semibold"
          >
            0933116860
          </a>
        </div>
        <div className="pt-2 border-t border-dashed border-[#dfb15b]/20">
          <span className="text-[#dfb15b] font-bold text-xs block mb-1">🏦 Tài khoản ngân hàng (Cúng dường / Tùy hỷ):</span>
          <span className="text-[#e5c392]">
            Ngân hàng: <strong>Sacombank</strong> - STK: <strong className="text-[#dfb15b] font-mono">060216644258</strong>
          </span>
        </div>
      </div>

      <div className="p-3 bg-[#ff4d4d]/5 border border-[#ff4d4d]/30 rounded-lg text-justify">
        <p className="text-[#ff6666] font-bold text-xs mb-1">⚠️ LƯU Ý QUAN TRỌNG:</p>
        <p className="text-[#ffb3b3] text-xs leading-relaxed">
          Sau khi tải ảnh, hãy <strong>chụp màn hình ảnh quẻ</strong> trước khi thoát web để đảm bảo an toàn. Vì khi thoát web và gieo lại sẽ không còn quẻ hiện tại nữa, thông tin luận đoán chắc chắn sai lệch.
        </p>
      </div>
    </div>
  );
}
