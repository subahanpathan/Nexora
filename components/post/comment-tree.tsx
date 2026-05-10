"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, ArrowUp, ArrowDown, Reply, MoreHorizontal } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { CommentForm } from "./comment-form";
import { ExtendedComment } from "@/lib/types";

export function CommentTree({ comments }: { comments: ExtendedComment[] }) {
  if (comments.length === 0) {
    return (
      <div className="text-center py-10 opacity-20">
         <MessageSquare className="h-10 w-10 mx-auto mb-3" />
         <p className="text-sm font-medium tracking-widest uppercase">No thoughts yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {comments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} />
      ))}
    </div>
  );
}

function CommentItem({ comment }: { comment: ExtendedComment }) {
  const [isReplying, setIsReplying] = useState(false);
  const voteCount = comment.votes.reduce((acc, v) => acc + v.type, 0);

  return (
    <div className="relative group">
      {/* Thread line */}
      <div className="absolute left-[19px] top-10 bottom-0 w-px bg-white/[0.05]" />

      <div className="flex gap-4">
        <div className="h-10 w-10 shrink-0 rounded-full bg-white/[0.05] border border-white/10 flex items-center justify-center text-xs font-bold text-white/40">
           {comment.author.username?.[0].toUpperCase() || "U"}
        </div>
        
        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-2 text-xs">
            <span className="font-semibold text-white/90">{comment.author.username}</span>
            <span className="text-white/30">·</span>
            <span className="text-white/40">{formatDistanceToNow(new Date(comment.createdAt))} ago</span>
          </div>

          <p className="text-sm text-white/70 leading-relaxed">
            {comment.content}
          </p>

          <div className="flex items-center gap-4 text-xs font-bold text-white/30 uppercase tracking-widest pt-1">
             <div className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer">
                <ArrowUp className="h-3 w-3" />
                <span>{voteCount}</span>
                <ArrowDown className="h-3 w-3" />
             </div>
             <button 
                onClick={() => setIsReplying(!isReplying)}
                className="flex items-center gap-1.5 hover:text-white transition-colors"
             >
                <Reply className="h-3 w-3" /> Reply
             </button>
             <button className="flex items-center gap-1.5 hover:text-white transition-colors">
                <MoreHorizontal className="h-3 w-3" />
             </button>
          </div>

          <AnimatePresence>
            {isReplying && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 overflow-hidden"
              >
                <CommentForm 
                   postId={comment.postId} 
                   parentId={comment.id} 
                   onCancel={() => setIsReplying(false)} 
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Render Replies */}
          {comment.replies && comment.replies.length > 0 && (
            <div className="mt-6 space-y-6">
              {comment.replies.map((reply) => (
                <CommentItem key={reply.id} comment={reply} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
