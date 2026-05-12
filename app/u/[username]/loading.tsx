export default function LoadingProfile() {
  return (
    <div className="space-y-8">
      <div className="h-72 animate-pulse rounded-[32px] border border-white/[0.06] bg-white/[0.03]" />
      <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-40 animate-pulse rounded-3xl border border-white/[0.06] bg-white/[0.03]" />
          ))}
        </div>
        <div className="space-y-4">
          <div className="h-36 animate-pulse rounded-3xl border border-white/[0.06] bg-white/[0.03]" />
          <div className="h-36 animate-pulse rounded-3xl border border-white/[0.06] bg-white/[0.03]" />
        </div>
      </div>
    </div>
  );
}
