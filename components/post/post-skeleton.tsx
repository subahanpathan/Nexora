"use client";

export function PostSkeleton() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/[0.06] bg-gradient-to-br from-white/[0.04] to-white/[0.01] p-6 space-y-4">
      <div className="pointer-events-none absolute inset-0 -translate-x-full animate-[shimmer_1.8s_infinite] bg-gradient-to-r from-transparent via-white/[0.04] to-transparent" />
      <div className="flex items-center gap-2">
        <div className="h-5 w-5 rounded-md bg-white/[0.05] animate-pulse" />
        <div className="h-3 w-24 rounded bg-white/[0.05] animate-pulse" />
        <div className="h-3 w-16 rounded bg-white/[0.05] animate-pulse ml-auto" />
      </div>
      
      <div className="space-y-2">
        <div className="h-6 w-3/4 rounded bg-white/[0.05] animate-pulse" />
        <div className="h-4 w-full rounded bg-white/[0.05] animate-pulse" />
        <div className="h-4 w-2/3 rounded bg-white/[0.05] animate-pulse" />
      </div>
      
      <div className="flex items-center gap-4 pt-2">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-4 w-16 rounded bg-white/[0.05] animate-pulse" />
        ))}
      </div>
    </div>
  );
}

export function FeedSkeleton() {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <PostSkeleton key={i} />
      ))}
    </div>
  );
}
