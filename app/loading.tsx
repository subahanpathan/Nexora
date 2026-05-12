import { FeedSkeleton } from "@/components/post/post-skeleton";

export default function Loading() {
  return (
    <div className="space-y-6">
      <div className="h-56 animate-pulse rounded-[2rem] border border-white/[0.06] bg-white/[0.03]" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-32 animate-pulse rounded-2xl border border-white/[0.06] bg-white/[0.03]" />
        ))}
      </div>
      <div className="h-12 animate-pulse rounded-2xl border border-white/[0.06] bg-white/[0.03]" />
      <FeedSkeleton />
    </div>
  );
}
