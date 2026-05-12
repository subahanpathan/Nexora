import { prisma } from "@/lib/prisma";
import { PostCard } from "@/components/post/post-card";
import { getComments } from "@/lib/actions/comment";
import { CommentsSection } from "@/components/post/comments-section";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { ExtendedComment } from "@/lib/types";

export default async function PostPage({ params }: { params: { id: string } }) {
  const post = await prisma.post.findUnique({
    where: { id: params.id },
    select: {
      id: true,
      title: true,
      content: true,
      imageUrl: true,
      imageLabel: true,
      hiring: true,
      tag: true,
      summary: true,
      createdAt: true,
      updatedAt: true,
      authorId: true,
      communityId: true,
      author: {
        select: {
          id: true,
          username: true,
          verified: true,
          image: true,
        },
      },
      community: {
        select: {
          id: true,
          name: true,
          slug: true,
          color: true,
        },
      },
      votes: {
        select: {
          id: true,
          type: true,
          userId: true,
          postId: true,
        },
      },
      _count: {
        select: { comments: true },
      },
    },
  });

  if (!post) return notFound();

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <Link 
        href="/"
        className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/40 hover:text-white transition-colors group"
      >
        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" /> Back to Feed
      </Link>

      <PostCard post={post} />

      <Suspense fallback={<CommentsSkeleton />}>
        <CommentsSectionServer postId={post.id} />
      </Suspense>
    </div>
  );
}

async function CommentsSectionServer({ postId }: { postId: string }) {
  const comments = (await getComments(postId)) as ExtendedComment[];
  return <CommentsSection postId={postId} initialComments={comments} />;
}

function CommentsSkeleton() {
  return (
    <div className="rounded-3xl border border-white/[0.06] bg-white/[0.02] p-6 sm:p-8">
      <div className="space-y-4">
        <div className="h-6 w-36 animate-pulse rounded bg-white/[0.06]" />
        <div className="h-20 animate-pulse rounded-2xl bg-white/[0.05]" />
        <div className="h-16 animate-pulse rounded-2xl bg-white/[0.04]" />
      </div>
    </div>
  );
}