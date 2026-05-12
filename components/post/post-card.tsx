"use client";

import { useState } from "react";
import {
  MessageCircle,
  Share2,
  Sparkles,
  Repeat2,
  MoreHorizontal,
  CheckCircle2,
  ArrowUp,
  ArrowDown,
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
      className="group relative flex flex-col rounded-[2rem] border border-white/[0.06] bg-[#07070b]/40 backdrop-blur-sm transition-all duration-500 hover:border-white/20 hover:bg-[#07070b]/60"
    >
      <div className="p-6 sm:p-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`h-10 w-10 rounded-2xl bg-gradient-to-br ${post?.community?.color || 'from-violet-500 to-fuchsia-500'} border border-white/10 shadow-lg`} />
            <div>
              <div className="flex items-center gap-2">
                <a href={`/t/${post?.community?.slug}`} className="text-sm font-bold text-white hover:text-violet-300 transition-colors">
                  t/{post?.community?.name}
                </a>
                <span className="h-1 w-1 rounded-full bg-white/20" />
                <span className="text-[11px] font-medium text-white/40">
                  {post?.createdAt ? formatDistanceToNow(new Date(post.createdAt)) : ''}
                </span>
              </div>
              <div className="flex items-center gap-1.5 mt-0.5">
                <a href={`/u/${post?.author?.username}`} className="text-[11px] font-bold text-white/30 hover:text-white/60 transition-colors">
                  @{post?.author?.username}
                </a>
                {post?.author?.verified && (
                  <CheckCircle2 className="h-3 w-3 text-violet-400" />
                )}
              </div>
            </div>
          </div>
          <button className="h-8 w-8 rounded-xl flex items-center justify-center text-white/20 hover:text-white hover:bg-white/[0.05] transition-all">
            <MoreHorizontal className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-6">
          <h3 className="text-xl font-bold leading-tight text-white tracking-tight sm:text-2xl">
            <a href={`/post/${post.id}`} className="hover:text-violet-200 transition-colors">
              {post.title}
            </a>
          </h3>
          <p className="mt-3 text-[15px] leading-relaxed text-white/50">{post.content}</p>
        </div>

        {post.imageUrl && (
          <div className="mt-6 relative aspect-[16/9] overflow-hidden rounded-[1.5rem] border border-white/[0.08]">
            <Image
              src={post.imageUrl}
              alt={post.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 640px"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        )}

        {post.summary && (
           <motion.div 
             initial={{ opacity: 0, x: -10 }}
             whileInView={{ opacity: 1, x: 0 }}
             className="mt-6 p-4 rounded-2xl bg-violet-500/5 border border-violet-500/10 flex items-start gap-4"
           >
              <div className="mt-1 h-8 w-8 rounded-xl bg-violet-500/10 flex items-center justify-center shrink-0">
                <Sparkles className="h-4 w-4 text-violet-400 animate-pulse" />
              </div>
              <p className="text-[12px] leading-relaxed text-violet-200/60 italic font-medium">{post.summary}</p>
           </motion.div>
        )}

        <div className="mt-8 flex items-center justify-between">
          <div className="flex items-center gap-1">
             <div className="flex items-center gap-1 rounded-2xl bg-white/[0.03] p-1 border border-white/[0.05]">
                <VoteBtn 
                  icon={<ArrowUp className="h-4 w-4" />} 
                  active={v === 1} 
                  onClick={() => handleVote(1)} 
                  variant="up"
                />
                <span className={`px-2 text-xs font-black tabular-nums ${v === 1 ? 'text-violet-400' : v === -1 ? 'text-rose-400' : 'text-white/40'}`}>
                  {voteCount.toLocaleString()}
                </span>
                <VoteBtn 
                  icon={<ArrowDown className="h-4 w-4" />} 
                  active={v === -1} 
                  onClick={() => handleVote(-1)} 
                  variant="down"
                />
             </div>
             
             <ActionIconBtn 
                icon={<MessageCircle className="h-4 w-4" />} 
                count={post?._count?.comments}
                href={`/post/${post.id}`}
             />
             <ActionIconBtn 
                icon={<Repeat2 className="h-4 w-4" />} 
             />
          </div>

          <div className="flex items-center gap-2">
            <ActionIconBtn 
               icon={<BookmarkIcon className={`h-4 w-4 ${isBookmarked ? 'fill-violet-400 text-violet-400' : ''}`} />} 
               onClick={handleBookmark}
            />
            <ActionIconBtn 
               icon={<Share2 className="h-4 w-4" />} 
            />
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function VoteBtn({ icon, active, onClick, variant }: { icon: React.ReactNode; active: boolean; onClick: () => void, variant: 'up' | 'down' }) {
  const activeClass = variant === 'up' 
    ? 'bg-violet-500/20 text-violet-400 border-violet-500/20' 
    : 'bg-rose-500/20 text-rose-400 border-rose-500/20';
    
  return (
    <button 
      onClick={onClick}
      className={`h-9 w-9 rounded-xl flex items-center justify-center transition-all border ${
        active ? activeClass : 'border-transparent text-white/30 hover:bg-white/[0.05] hover:text-white'
      }`}
    >
      {icon}
    </button>
  );
}

function ActionIconBtn({ icon, count, onClick, href }: { icon: React.ReactNode; count?: number; onClick?: () => void; href?: string }) {
  const content = (
    <div className="flex items-center gap-2 px-3 h-11 rounded-2xl border border-white/[0.05] bg-white/[0.02] text-white/30 hover:bg-white/[0.05] hover:text-white hover:border-white/10 transition-all">
      {icon}
      {count !== undefined && <span className="text-xs font-bold tabular-nums">{count}</span>}
    </div>
  );

  if (href) return <a href={href}>{content}</a>;
  return <button onClick={onClick}>{content}</button>;
}
