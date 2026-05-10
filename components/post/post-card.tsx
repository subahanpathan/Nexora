"use client";

import { useState } from "react";
import {
  MessageCircle,
  Share2,
  Sparkles,
  Repeat2,
  MoreHorizontal,
  CheckCircle2,
  Briefcase,
  Award,
  ArrowUp,
  ArrowDown,
  Eye,
  Bookmark as BookmarkIcon,
} from "lucide-react";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { votePost } from "@/lib/actions/post";
import { bookmarkPost } from "@/lib/actions/user";
import { toast } from "sonner";
import { formatDistanceToNow } from "date-fns";
import Image from "next/image";
import { ExtendedPost } from "@/lib/types";

export function PostCard({ post }: { post: ExtendedPost }) {
  const { data: session } = useSession();
  
  const initialVotes = (post?.votes || []).reduce((acc, vote) => acc + (vote?.type || 0), 0);
  const userVote = (post?.votes || []).find(v => v.userId === session?.user?.id)?.type || 0;

  const [v, setV] = useState<number>(userVote);
  const [voteCount, setVoteCount] = useState(initialVotes);

  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleVote = async (type: number) => {
    if (!session) {
      toast.error("Please sign in to vote");
      return;
    }

    const newVote = v === type ? 0 : type;
    const diff = newVote - v;

    setV(newVote);
    setVoteCount(prev => prev + diff);

    try {
      await votePost({ postId: post.id, type });
    } catch {
      setV(v);
      setVoteCount(voteCount);
      toast.error("Failed to vote");
    }
  };

  const handleBookmark = async () => {
    if (!session) {
      toast.error("Please sign in to bookmark");
      return;
    }
    setIsBookmarked(!isBookmarked);
    try {
      await bookmarkPost(post.id);
      toast.success(isBookmarked ? "Removed bookmark" : "Saved to library");
    } catch {
      setIsBookmarked(isBookmarked);
      toast.error("Failed to update bookmark");
    }
  };

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-gradient-to-br from-white/[0.04] to-white/[0.01] transition-all duration-300 hover:border-white/[0.12] hover:shadow-[0_30px_80px_-30px_rgba(139,92,246,0.35)]"
    >
      {post.tag && (
        <div className="absolute right-4 top-4 z-10 inline-flex items-center gap-1 rounded-full border border-amber-300/30 bg-amber-300/10 px-2.5 py-1 text-[10px] uppercase tracking-wider text-amber-200">
          <Award className="h-3 w-3 fill-amber-300 text-amber-300" /> {post.tag}
        </div>
      )}

      <div className="flex">
        <div className="hidden w-14 shrink-0 flex-col items-center gap-1 border-r border-white/[0.05] bg-white/[0.015] py-5 sm:flex">
          <button
            onClick={() => handleVote(1)}
            className={`grid h-8 w-8 place-items-center rounded-lg transition-all ${
              v === 1
                ? "bg-gradient-to-br from-indigo-500/40 to-violet-500/30 text-white shadow-[0_0_20px_-2px_rgba(139,92,246,0.6)]"
                : "text-white/55 hover:bg-white/[0.05] hover:text-white"
            }`}
          >
            <ArrowUp className="h-4 w-4" />
          </button>
          <span
            className={`text-xs font-semibold tabular-nums ${
              v === 1 ? "text-violet-300" : v === -1 ? "text-rose-300" : "text-white/80"
            }`}
          >
            {voteCount.toLocaleString()}
          </span>
          <button
            onClick={() => handleVote(-1)}
            className={`grid h-8 w-8 place-items-center rounded-lg transition-all ${
              v === -1
                ? "bg-rose-500/20 text-rose-200"
                : "text-white/55 hover:bg-white/[0.05] hover:text-white"
            }`}
          >
            <ArrowDown className="h-4 w-4" />
          </button>
        </div>

        <div className="flex-1 p-5 sm:p-6">
          <div className="flex items-center gap-2 text-xs">
            <span
              className={`h-5 w-5 rounded-md bg-gradient-to-br ${post?.community?.color || 'from-gray-500 to-gray-700'} ring-1 ring-white/10`}
            />
            <a href={`/t/${post?.community?.slug || '#'}`} className="font-medium text-white/85 hover:underline">
              t/{post?.community?.name || 'community'}
            </a>
            <span className="text-white/30">·</span>
            <span className="text-white/55">Posted by</span>
            <a href={`/u/${post?.author?.username || '#'}`} className="inline-flex items-center gap-1 text-white/85 hover:underline">
              {post?.author?.username || 'anonymous'}
              {post?.author?.verified && (
                <CheckCircle2 className="h-3.5 w-3.5 fill-sky-400/80 text-[#0a0a0f]" />
              )}
            </a>
            <span className="ml-auto text-white/40">{post?.createdAt ? formatDistanceToNow(new Date(post.createdAt)) : 'some time'} ago</span>

          </div>

          {post.hiring && (
            <div className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-2.5 py-1 text-[11px] text-emerald-200">
              <Briefcase className="h-3 w-3" /> We&apos;re hiring
            </div>
          )}

          <h3 className="mt-3 text-lg font-medium leading-snug text-white sm:text-xl">
            <a href={`/post/${post.id}`} className="hover:text-violet-300 transition-colors">
              {post.title}
            </a>
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-white/65">{post.content}</p>

          {post.imageUrl && (
            <div className="relative mt-4 aspect-[16/9] overflow-hidden rounded-xl border border-white/[0.06]">
              <Image src={post.imageUrl} alt={post.title} fill className="object-cover" />
              {post.imageLabel && (
                <div className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-black/40 px-2.5 py-1 text-[11px] text-white/85 backdrop-blur">
                  <Eye className="h-3 w-3" /> {post.imageLabel}
                </div>
              )}
            </div>
          )}

          {post.summary && (
             <div className="mt-4 p-3 rounded-xl bg-violet-500/5 border border-violet-500/10 flex items-start gap-3">
                <Sparkles className="h-4 w-4 text-violet-400 shrink-0 mt-0.5" />
                <p className="text-[11px] italic text-violet-200/70">{post.summary}</p>
             </div>
          )}

          <div className="mt-4 flex flex-wrap items-center gap-1 text-xs text-white/60">
            <ActionBtn icon={<MessageCircle className="h-3.5 w-3.5" />} label={`${post?._count?.comments || 0} comments`} href={`/post/${post?.id}`} />
            <ActionBtn icon={<Repeat2 className="h-3.5 w-3.5" />} label="Repost" />
            <ActionBtn icon={<Share2 className="h-3.5 w-3.5" />} label="Share" />
            <ActionBtn 
               icon={<BookmarkIcon className={`h-3.5 w-3.5 ${isBookmarked ? 'fill-violet-400 text-violet-400' : ''}`} />} 
               label={isBookmarked ? "Saved" : "Save"} 
               onClick={handleBookmark}
            />
            <button className="ml-auto grid h-8 w-8 place-items-center rounded-lg text-white/45 hover:bg-white/[0.05] hover:text-white">
              <MoreHorizontal className="h-4 w-4" />
            </button>

          </div>
        </div>
      </div>
    </motion.article>
  );
}

function ActionBtn({
  icon,
  label,
  accent,
  onClick,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  accent?: boolean;
  onClick?: () => void;
  href?: string;
}) {
  const content = (
    <>
      {icon}
      <span>{label}</span>
    </>
  );

  const className = `inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 transition-colors ${
    accent
      ? "text-violet-200 hover:bg-violet-500/10"
      : "hover:bg-white/[0.05] hover:text-white"
  }`;

  if (href) {
    return (
      <a href={href} className={className}>
        {content}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={className}>
      {content}
    </button>
  );
}
