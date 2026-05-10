"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { createComment } from "@/lib/actions/comment";
import { toast } from "sonner";
import { Send, Loader2 } from "lucide-react";

export function CommentForm({ postId, parentId, onCancel }: { postId: string; parentId?: string; onCancel?: () => void }) {
  const { data: session } = useSession();
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session) {
      toast.error("Please sign in to comment");
      return;
    }
    if (!content.trim()) return;

    setIsSubmitting(true);
    try {
      await createComment({ content, postId, parentId });
      toast.success(parentId ? "Reply posted" : "Comment added");
      setContent("");
      if (onCancel) onCancel();
    } catch {
      toast.error("Failed to post comment");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-4">
      <div className="h-10 w-10 shrink-0 rounded-full bg-gradient-to-br from-indigo-500 to-violet-500" />
      <div className="flex-1 space-y-3">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={parentId ? "Write a reply..." : "Share your thoughts on this thread..."}
          className="w-full min-h-[80px] bg-white/[0.03] border border-white/10 rounded-2xl p-4 text-sm text-white placeholder:text-white/20 outline-none focus:border-violet-500/40 transition-all resize-none"
        />
        <div className="flex justify-end gap-3">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-xs font-bold text-white/40 hover:text-white transition-colors"
            >
              Cancel
            </button>
          )}
          <button
            disabled={isSubmitting || !content.trim()}
            className="inline-flex items-center gap-2 rounded-full bg-white text-black px-6 py-2 text-xs font-bold transition-all hover:-translate-y-0.5 disabled:opacity-50 disabled:translate-y-0"
          >
            {isSubmitting ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Send className="h-3.5 w-3.5" />}
            {parentId ? "Post Reply" : "Post Comment"}
          </button>
        </div>
      </div>
    </form>
  );
}
