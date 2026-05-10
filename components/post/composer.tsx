"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ImageIcon, 
  Sparkles, 
  Send, 
  X,
  Loader2,
} from "lucide-react";
import { useSession } from "next-auth/react";
import { createPost } from "@/lib/actions/post";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Community } from "@prisma/client";

export function Composer({ communities }: { communities: Community[] }) {
  const { data: session } = useSession();
  const router = useRouter();
  
  const [isFocused, setIsFocused] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [communityId, setCommunityId] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleSubmit = async () => {
    if (!session) {
      toast.error("Please sign in to post");
      return;
    }
    if (!title || !content || !communityId) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);
    try {
      await createPost({ title, content, communityId, imageUrl });
      toast.success("Post created successfully");
      setTitle("");
      setContent("");
      setImageUrl("");
      setIsFocused(false);
      router.refresh();
    } catch {
      toast.error("Failed to create post");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      layout
      className={`mt-4 rounded-2xl border transition-all duration-300 ${
        isFocused
          ? "border-violet-500/40 bg-white/[0.04] shadow-[0_0_30px_-10px_rgba(139,92,246,0.3)]"
          : "border-white/[0.06] bg-gradient-to-br from-white/[0.04] to-white/[0.01]"
      } p-4`}
    >
      <div className="flex items-start gap-3">
        <div className="h-10 w-10 shrink-0 rounded-full bg-gradient-to-br from-amber-400 via-rose-400 to-fuchsia-500" />
        <div className="flex-1">
          {isFocused && (
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title of your thread..."
              className="w-full bg-transparent text-lg font-semibold text-white placeholder:text-white/20 outline-none mb-2"
              autoFocus
            />
          )}
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Share a thought, drop a link, start a thread…"
            className="w-full min-h-[40px] bg-transparent text-sm text-white placeholder:text-white/40 outline-none resize-none transition-all"
            onFocus={() => setIsFocused(true)}
            rows={isFocused ? 4 : 1}
          />
          
          <AnimatePresence>
            {isFocused && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-3 space-y-3 overflow-hidden"
              >
                <div className="flex flex-wrap items-center gap-2">
                   <select 
                      value={communityId}
                      onChange={(e) => setCommunityId(e.target.value)}
                      className="bg-white/[0.05] border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white outline-none focus:border-violet-500/50"
                   >
                      <option value="" disabled className="bg-[#0a0a0f]">Select Community</option>
                      {communities.map(c => (
                        <option key={c.id} value={c.id} className="bg-[#0a0a0f]">{c.name}</option>
                      ))}
                   </select>

                   <div className="flex-1" />
                   
                   <button 
                      onClick={() => setIsFocused(false)}
                      className="p-2 text-white/30 hover:text-white transition-colors"
                   >
                      <X className="h-4 w-4" />
                   </button>
                </div>

                <div className="flex items-center gap-2 border-t border-white/5 pt-3">
                  <ComposerChip icon={<ImageIcon className="h-3.5 w-3.5" />} label="Media" onClick={() => {}} />
                  <ComposerChip icon={<Sparkles className="h-3.5 w-3.5" />} label="AI assist" onClick={() => {}} />
                  
                  <button 
                    disabled={isSubmitting}
                    onClick={handleSubmit}
                    className="ml-auto inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 px-5 py-2 text-xs font-bold text-white shadow-[0_8px_24px_-8px_rgba(139,92,246,0.7)] hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:translate-y-0"
                  >
                    {isSubmitting ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Send className="h-3.5 w-3.5" />}
                    {isSubmitting ? "Posting..." : "Post Thread"}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

function ComposerChip({ icon, label, onClick }: { icon: React.ReactNode; label: string; onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-xs text-white/65 transition-colors hover:bg-white/[0.06] hover:text-white"
    >
      {icon}
      {label}
    </button>
  );
}
