export default function LoadingSkeleton({ message = 'Đang tải dữ liệu quẻ...' }: { message?: string }) {
  return (
    <div className="w-full p-8 flex flex-col items-center justify-center gap-4 bg-[#160f08]/90 border border-[#3d2a19] rounded-2xl backdrop-blur-md animate-pulse">
      <div className="w-10 h-10 border-4 border-[#dfb15b] border-t-transparent rounded-full animate-spin"></div>
      <p className="text-sm font-semibold text-[#dfb15b]">{message}</p>
    </div>
  );
}
