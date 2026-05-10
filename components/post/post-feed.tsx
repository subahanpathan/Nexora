"use client";

import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getPosts } from "@/lib/actions/post";
import { PostCard } from "./post-card";
import { Loader2, Sparkles } from "lucide-react";
import { ExtendedPost } from "@/lib/types";

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
  } = useInfiniteQuery({
    queryKey: ["posts", communityId, authorId],
    queryFn: ({ pageParam }) => getPosts({ cursor: pageParam as string, communityId, authorId }),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    initialData: { pages: [{ posts: initialPosts, nextCursor: undefined }], pageParams: [undefined] },
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  const allPosts = data?.pages.flatMap((page) => page.posts) ?? [];

  return (
    <div className="mt-4 space-y-4">
      {allPosts.map((post) => (
        <PostCard key={post.id} post={post as ExtendedPost} />
      ))}

      {hasNextPage && (
        <div ref={ref} className="flex items-center justify-center py-8">
          <Loader2 className="h-6 w-6 animate-spin text-violet-500" />
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
