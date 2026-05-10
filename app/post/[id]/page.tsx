import { prisma } from "@/lib/prisma";
import { PostCard } from "@/components/post/post-card";
import { getComments } from "@/lib/actions/comment";
import { CommentTree } from "@/components/post/comment-tree";
import { CommentForm } from "@/components/post/comment-form";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default async function PostPage({ params }: { params: { id: string } }) {
  const post = await prisma.post.findUnique({
    where: { id: params.id },
    include: {
      author: true,
      community: true,
      votes: true,
      _count: {
        select: { comments: true },
      },
    },
  });

  if (!post) return notFound();

  const comments = await getComments(post.id);

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <Link 
        href="/"
        className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/40 hover:text-white transition-colors group"
      >
        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" /> Back to Feed
      </Link>

      <PostCard post={post} />

      <div className="rounded-3xl border border-white/[0.06] bg-white/[0.02] p-6 sm:p-8 space-y-8">
        <div>
          <h2 className="text-xl font-semibold text-white">Discussion</h2>
          <p className="text-sm text-white/40 mt-1">{post._count.comments} thoughts shared so far</p>
        </div>

        <CommentForm postId={post.id} />

        <div className="space-y-6 pt-6 border-t border-white/5">
          <CommentTree comments={comments} />
        </div>
      </div>
    </div>
  );
}