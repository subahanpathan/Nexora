"use client";

import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getPosts } from "@/lib/actions/post";
import { PostCard } from "./post-card";
import { Loader2, Sparkles, MessageCircleHeart } from "lucide-react";
import { ExtendedPost } from "@/lib/types";
import { FeedSkeleton } from "./post-skeleton";
import { motion } from "framer-motion";
import Link from "next/link";

interface PostFeedProps {
  initialPosts: ExtendedPost[];
  communityId?: string;
  authorId?: string;
}

export function PostFeed({ 
  initialPosts, 
  communityId,
  authorId,
}: PostFeedProps) {
  const { ref, inView } = useInView();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ["posts", communityId, authorId],
    queryFn: ({ pageParam }: { pageParam: string | undefined }) => getPosts({ cursor: pageParam, communityId, authorId }),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    initialData: { pages: [{ posts: initialPosts, nextCursor: undefined }], pageParams: [undefined as string | undefined] },
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  const allPosts = data?.pages.flatMap((page) => page.posts) ?? [];

  if (isLoading) {
    return <FeedSkeleton />;
  }

  return (
    <div className="mt-4 space-y-4">
      {allPosts.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-[2rem] border border-white/[0.08] bg-gradient-to-br from-white/[0.05] to-white/[0.01] p-8 text-center sm:p-12"
        >
          <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl border border-white/10 bg-white/[0.03]">
            <MessageCircleHeart className="h-6 w-6 text-violet-300" />
          </div>
          <h3 className="text-xl font-semibold tracking-tight text-white">No conversations yet</h3>
          <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-white/55">
            Be the first to spark a thoughtful thread. Start a post and invite your
            community to think together.
          </p>
          <Link
            href="/create"
            className="mt-6 inline-flex rounded-2xl bg-white px-6 py-3 text-sm font-bold text-black transition hover:scale-[1.02]"
          >
            Create the first post
          </Link>
        </motion.div>
      ) : (
        allPosts.map((post) => <PostCard key={post.id} post={post as ExtendedPost} />)
      )}

      {hasNextPage && (
        <div ref={ref} className="flex items-center justify-center py-8">
          <Loader2 className={`h-6 w-6 text-violet-500 ${isFetchingNextPage ? "animate-spin" : ""}`} />
        </div>
      )}

      {!hasNextPage && allPosts.length > 0 && (
        <div className="flex items-center justify-center py-10 opacity-30">
          <div className="flex flex-col items-center gap-2">
            <Sparkles className="h-5 w-5" />
            <p className="text-xs font-medium uppercase tracking-widest">You&apos;ve caught up with the signal</p>
          </div>
        </div>
      )}
    </div>
  );
}
