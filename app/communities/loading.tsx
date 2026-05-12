export default function LoadingCommunities() {
  return (
    <div className="space-y-8">
      <div className="h-48 animate-pulse rounded-3xl border border-white/[0.06] bg-white/[0.03]" />
      <div className="grid gap-6 sm:grid-cols-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-64 animate-pulse rounded-3xl border border-white/[0.06] bg-white/[0.03]" />
        ))}
      </div>
    </div>
  );
}
