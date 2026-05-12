"use client";

import { useState } from "react";
import { UserPlus, Check } from "lucide-react";
import { followUser } from "@/lib/actions/user";
import { toast } from "sonner";

export function FollowButton({ userId, isFollowingInitial }: { userId: string, isFollowingInitial: boolean }) {
  const [isFollowing, setIsFollowing] = useState(isFollowingInitial);
  const [isLoading, setIsLoading] = useState(false);

  const handleFollow = async () => {
    const next = !isFollowing;
    setIsFollowing(next);
    setIsLoading(true);
    try {
      await followUser(userId);
      toast.success(next ? "Following" : "Unfollowed");
    } catch {
      setIsFollowing(!next);
      toast.error("Failed to update follow status");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button 
      onClick={handleFollow}
      disabled={isLoading}
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-medium transition-all ${
        isFollowing 
          ? "bg-white/10 text-white hover:bg-white/20" 
          : "bg-white text-black hover:-translate-y-0.5 shadow-lg shadow-white/10"
      }`}
    >
      {isFollowing ? <Check className="h-3 w-3" /> : <UserPlus className="h-3 w-3" />}
      {isFollowing ? "Following" : "Follow"}
    </button>
  );
}
