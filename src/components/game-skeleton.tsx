export function GameSkeleton() {
  return (
    <div
      className="flex flex-col gap-2 overflow-hidden animate-pulse"
    >
      <div className="h-[160px] w-full bg-white/5 rounded-md" />
      <strong className="h-6 rounded-sm w-full bg-white/5" />
    </div>
  )
}