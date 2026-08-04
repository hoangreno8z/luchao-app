export default function EmptyState({ message }: { message: string }) {
  return (
    <div className="w-full p-8 text-center bg-[#160f08]/60 border border-[#3d2a19] rounded-xl text-[#bda287]">
      <p className="text-sm italic">{message}</p>
    </div>
  );
}
