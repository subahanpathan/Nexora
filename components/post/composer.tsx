"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ImageIcon, 
  Sparkles, 
  Send, 
  X,
  Loader2,
  ChevronDown,
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
      toast.success("Signal transmitted successfully");
      setTitle("");
      setContent("");
      setImageUrl("");
      setIsFocused(false);
      router.refresh();
    } catch {
      toast.error("Transmission failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      layout
      className={`mt-6 rounded-[2rem] border transition-all duration-500 ${
        isFocused
          ? "border-violet-500/40 bg-[#07070b]/80 shadow-[0_30px_60px_-15px_rgba(139,92,246,0.2)] backdrop-blur-2xl"
          : "border-white/[0.06] bg-[#07070b]/40 backdrop-blur-sm hover:border-white/20"
      } p-6`}
    >
      <div className="flex items-start gap-4">
        <div className="h-12 w-12 shrink-0 rounded-2xl bg-gradient-to-br from-violet-600 via-indigo-500 to-fuchsia-500 border border-white/10 shadow-lg flex items-center justify-center font-bold text-white text-lg">
           {session?.user?.name?.[0].toUpperCase() || "N"}
        </div>
        <div className="flex-1">
          {isFocused && (
            <motion.input
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Signal Title"
              className="w-full bg-transparent text-xl font-bold text-white placeholder:text-white/10 outline-none mb-4 tracking-tight"
              autoFocus
            />
          )}
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What's the signal?"
            className="w-full min-h-[40px] bg-transparent text-[16px] text-white/80 placeholder:text-white/20 outline-none resize-none transition-all custom-scrollbar"
            onFocus={() => setIsFocused(true)}
            rows={isFocused ? 6 : 1}
          />
          
          <AnimatePresence>
            {isFocused && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-6 space-y-6 overflow-hidden"
              >
                <div className="flex flex-wrap items-center gap-3">
                   <div className="relative">
                      <select 
                         value={communityId}
                         onChange={(e) => setCommunityId(e.target.value)}
                         className="appearance-none bg-white/[0.03] border border-white/5 rounded-xl px-5 py-2.5 text-[11px] font-bold uppercase tracking-widest text-white/60 outline-none focus:border-violet-500/50 hover:bg-white/[0.05] transition-all pr-10"
                      >
                         <option value="" disabled className="bg-[#030303]">Select Node</option>
                         {communities.map(c => (
                           <option key={c.id} value={c.id} className="bg-[#030303]">{c.name}</option>
                         ))}
                      </select>
                      <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2">
                         <ChevronDown className="h-3 w-3 text-white/20" />
                      </div>
                   </div>

                   <div className="flex-1" />
                   
                   <button 
                      onClick={() => setIsFocused(false)}
                      className="h-10 w-10 rounded-xl flex items-center justify-center text-white/10 hover:text-white hover:bg-white/[0.05] transition-all"
                   >
                      <X className="h-5 w-5" />
                   </button>
                </div>

                <div className="flex items-center gap-3 border-t border-white/5 pt-6">
                  <ComposerChip icon={<ImageIcon className="h-4 w-4" />} label="Attach" onClick={() => {}} />
                  <ComposerChip icon={<Sparkles className="h-4 w-4" />} label="AI Optimize" onClick={() => {}} />
                  
                  <button 
                    disabled={isSubmitting}
                    onClick={handleSubmit}
                    className="ml-auto inline-flex items-center gap-2.5 rounded-2xl bg-white px-8 py-3.5 text-[11px] font-black uppercase tracking-widest text-black shadow-xl shadow-white/5 hover:scale-[1.02] transition-all disabled:opacity-50 disabled:scale-100"
                  >
                    {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                    {isSubmitting ? "Transmitting..." : "Transmit"}
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
      className="inline-flex items-center gap-2 rounded-xl border border-white/[0.05] bg-white/[0.01] px-4 py-3 text-[11px] font-bold uppercase tracking-widest text-white/30 transition-all hover:bg-white/[0.05] hover:text-white"
    >
      {icon}
      {label}
    </button>
  );
}

