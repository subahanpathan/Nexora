export default function LoadingTrending() {
  return (
    <div className="space-y-6">
      <div className="h-64 animate-pulse rounded-3xl border border-white/[0.06] bg-white/[0.03]" />
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="h-28 animate-pulse rounded-3xl border border-white/[0.06] bg-white/[0.03]" />
      ))}
    </div>
  );
}
