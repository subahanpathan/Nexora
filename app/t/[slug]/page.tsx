import { prisma } from "@/lib/prisma";
import { getPosts } from "@/lib/actions/post";
import { PostFeed } from "@/components/post/post-feed";
import { Composer } from "@/components/post/composer";
import { notFound } from "next/navigation";
import { 
  ShieldCheck, 
  Info
} from "lucide-react";
import { CommunityHeader } from "@/components/community/community-header";

export default async function CommunityPage({ params }: { params: { slug: string } }) {
  const community = await prisma.community.findUnique({
    where: { slug: params.slug },
    include: {
      _count: {
        select: { members: true, posts: true },
      },
    },
  });

  if (!community) return notFound();

  const postsData = await getPosts({ communityId: community.id, limit: 10 });

  return (
    <div className="space-y-6">
      <CommunityHeader community={community} />
      
      <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
        <div className="space-y-6">
          <Composer communities={[community]} />
          <PostFeed initialPosts={postsData.posts} communityId={community.id} />
        </div>

        <aside className="space-y-6">
           <div className="rounded-3xl border border-white/[0.06] bg-white/[0.02] p-6">
              <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-white/40 font-bold mb-4">
                 <Info className="h-3.5 w-3.5" /> About Community
              </div>
              <p className="text-sm text-white/60 leading-relaxed">
                 {community.description || "A professional space for high-signal discussions and sharing."}
              </p>
              
              <div className="mt-6 space-y-4">
                 <div className="flex justify-between items-end">
                    <span className="text-xs text-white/40 font-medium">Created</span>
                    <span className="text-sm text-white font-medium">{new Date(community.createdAt).toLocaleDateString()}</span>
                 </div>
                 <div className="flex justify-between items-end">
                    <span className="text-xs text-white/40 font-medium">Members</span>
                    <span className="text-sm text-white font-medium">{community._count.members.toLocaleString()}</span>
                 </div>
                 <div className="flex justify-between items-end">
                    <span className="text-xs text-white/40 font-medium">Posts</span>
                    <span className="text-sm text-white font-medium">{community._count.posts.toLocaleString()}</span>
                 </div>
              </div>

              <button className="w-full mt-8 rounded-2xl bg-white text-black py-3 text-xs font-bold transition-transform hover:-translate-y-0.5 active:scale-95">
                 Join Community
              </button>
           </div>

           <div className="rounded-3xl border border-white/[0.06] bg-violet-500/5 p-6">
              <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-violet-400 font-bold mb-4">
                 <ShieldCheck className="h-3.5 w-3.5" /> Moderation
              </div>
              <p className="text-xs text-white/40 leading-relaxed">
                 AI-moderated space with zero tolerance for noise or harassment.
              </p>
           </div>
        </aside>
      </div>
    </div>
  );
}
