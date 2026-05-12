export default function LoadingPost() {
  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="h-6 w-28 animate-pulse rounded bg-white/[0.06]" />
      <div className="h-72 animate-pulse rounded-3xl border border-white/[0.06] bg-white/[0.03]" />
      <div className="h-64 animate-pulse rounded-3xl border border-white/[0.06] bg-white/[0.03]" />
    </div>
  );
}
