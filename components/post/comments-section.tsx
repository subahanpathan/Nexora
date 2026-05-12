"use client";

import { useMemo, useState } from "react";
import { useSession } from "next-auth/react";
import { CommentForm } from "./comment-form";
import { CommentTree } from "./comment-tree";
import { ExtendedComment } from "@/lib/types";

export function CommentsSection({
  postId,
  initialComments,
}: {
  postId: string;
  initialComments: ExtendedComment[];
}) {
  const { data: session } = useSession();
  const [comments, setComments] = useState<ExtendedComment[]>(initialComments);

  const totalCount = useMemo(() => {
    const countNested = (nodes: ExtendedComment[]): number =>
      nodes.reduce((acc, node) => acc + 1 + countNested(node.replies || []), 0);
    return countNested(comments);
  }, [comments]);

  const addOptimisticComment = (content: string) => {
    if (!session?.user?.id) return;
    const tempId = `temp-${Date.now()}`;
    const optimisticComment = {
      id: tempId,
      content,
      postId,
      parentId: null,
      authorId: session.user.id,
      createdAt: new Date(),
      updatedAt: new Date(),
      author: {
        id: session.user.id,
        username: session.user.name || "you",
        image: session.user.image || null,
        verified: false,
      },
      votes: [],
      replies: [],
    } as unknown as ExtendedComment;

    setComments((prev) => [optimisticComment, ...prev]);
    return () => setComments((prev) => prev.filter((item) => item.id !== tempId));
  };

  return (
    <div className="rounded-3xl border border-white/[0.06] bg-white/[0.02] p-6 sm:p-8 space-y-8">
      <div>
        <h2 className="text-xl font-semibold text-white">Discussion</h2>
        <p className="mt-1 text-sm text-white/40">{totalCount} thoughts shared so far</p>
      </div>

      <CommentForm postId={postId} onOptimisticAdd={addOptimisticComment} />

      <div className="space-y-6 border-t border-white/5 pt-6">
        <CommentTree comments={comments} />
      </div>
    </div>
  );
}
