import { prisma } from "@/lib/prisma";
import { getPosts } from "@/lib/actions/post";
import { PostFeed } from "@/components/post/post-feed";
import { notFound } from "next/navigation";
import { 
  CheckCircle2, 
  MapPin, 
  Calendar, 
  Link as LinkIcon, 
  Briefcase,
  Users,
  Award,
  ArrowUpRight
} from "lucide-react";

export default async function ProfilePage({ params }: { params: { username: string } }) {
  const user = await prisma.user.findUnique({
    where: { username: params.username },
    include: {
      _count: {
        select: { 
          posts: true, 
          comments: true, 
          followers: true, 
          following: true 
        },
      },
    },
  });

  if (!user) return notFound();

  const postsData = await getPosts({ authorId: user.id, limit: 10 });

  return (
    <div className="space-y-8">
      {/* Profile Header */}
      <section className="relative overflow-hidden rounded-[32px] border border-white/[0.06] bg-[#0a0a0f] p-8 md:p-12">
        <div className="absolute -left-20 -top-20 h-80 w-80 rounded-full bg-violet-600/10 blur-[120px]" />
        <div className="absolute right-0 bottom-0 h-64 w-64 rounded-full bg-indigo-600/10 blur-[100px]" />
        
        <div className="relative flex flex-col md:flex-row items-start md:items-center gap-8">
           <div className="relative">
              <div className="h-32 w-32 rounded-full bg-gradient-to-br from-amber-400 via-rose-400 to-fuchsia-500 ring-4 ring-white/10 shadow-2xl" />
              {user.verified && (
                <div className="absolute -bottom-2 -right-2 h-10 w-10 rounded-full bg-[#0a0a0f] border border-white/10 flex items-center justify-center shadow-lg">
                   <CheckCircle2 className="h-6 w-6 fill-sky-400 text-[#0a0a0f]" />
                </div>
              )}
           </div>

           <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                 <div>
                    <h1 className="text-4xl font-bold tracking-tight text-white flex items-center gap-3">
                       {user.username}
                    </h1>
                    <p className="mt-2 text-white/50 text-lg leading-relaxed max-w-xl">
                       {user.bio || "Building the future of high-signal social ecosystems. Passionate about AI, Design, and Engineering."}
                    </p>
                 </div>
                 <div className="flex items-center gap-3">
                    <button className="h-12 rounded-2xl bg-white text-black px-8 text-sm font-bold shadow-xl transition-all hover:-translate-y-0.5 active:scale-95">
                       Follow
                    </button>
                    <button className="h-12 w-12 rounded-2xl border border-white/10 bg-white/[0.03] flex items-center justify-center text-white/60 hover:text-white transition-colors">
                       <ArrowUpRight className="h-5 w-5" />
                    </button>
                 </div>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-6 text-sm text-white/40">
                 <span className="flex items-center gap-1.5"><Briefcase className="h-4 w-4" /> Product Engineer</span>
                 <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4" /> San Francisco, CA</span>
                 <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4" /> Joined {new Date(user.createdAt).toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}</span>
                 <a href="#" className="flex items-center gap-1.5 text-violet-400 hover:text-violet-300 transition-colors"><LinkIcon className="h-4 w-4" /> threadify.io/alexr</a>
              </div>
           </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 flex flex-wrap gap-12">
           <div className="flex flex-col">
              <span className="text-2xl font-bold text-white">{user.reputation.toLocaleString()}</span>
              <span className="text-[10px] uppercase tracking-widest text-white/30 font-bold mt-1">Reputation</span>
           </div>
           <div className="flex flex-col">
              <span className="text-2xl font-bold text-white">{user._count.followers.toLocaleString()}</span>
              <span className="text-[10px] uppercase tracking-widest text-white/30 font-bold mt-1">Followers</span>
           </div>
           <div className="flex flex-col">
              <span className="text-2xl font-bold text-white">{user._count.following.toLocaleString()}</span>
              <span className="text-[10px] uppercase tracking-widest text-white/30 font-bold mt-1">Following</span>
           </div>
           <div className="flex flex-col">
              <span className="text-2xl font-bold text-white">{user._count.posts.toLocaleString()}</span>
              <span className="text-[10px] uppercase tracking-widest text-white/30 font-bold mt-1">Threads</span>
           </div>
        </div>
      </section>

      {/* Content Grid */}
      <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
         <div className="space-y-6">
            <div className="flex items-center gap-1 p-1 rounded-2xl bg-white/[0.03] border border-white/10 w-fit">
               {["Threads", "Replies", "Highlights", "Media"].map((t, i) => (
                 <button key={t} className={`px-6 py-2 rounded-xl text-xs font-bold transition-all ${i === 0 ? 'bg-white text-black shadow-lg' : 'text-white/40 hover:text-white'}`}>
                    {t}
                 </button>
               ))}
            </div>
            <PostFeed initialPosts={postsData.posts} authorId={user.id} />
         </div>

         <aside className="space-y-6">
            <div className="rounded-3xl border border-white/[0.06] bg-white/[0.02] p-6">
               <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-white/40 font-bold mb-4">
                  <Award className="h-3.5 w-3.5" /> Signal Badges
               </div>
               <div className="flex flex-wrap gap-3">
                  {[
                    { l: "Top Founder", c: "bg-amber-500/10 text-amber-400 border-amber-500/20" },
                    { l: "AI Expert", c: "bg-violet-500/10 text-violet-400 border-violet-500/20" },
                    { l: "Early Adopter", c: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
                  ].map(b => (
                    <span key={b.l} className={`px-3 py-1.5 rounded-xl text-[10px] font-bold border ${b.c}`}>{b.l}</span>
                  ))}
               </div>
            </div>

            <div className="rounded-3xl border border-white/[0.06] bg-white/[0.02] p-6">
               <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-white/40 font-bold mb-4">
                  <Users className="h-3.5 w-3.5" /> Mutual Connections
               </div>
               <div className="flex -space-x-3">
                  {[1,2,3,4,5].map(i => (
                    <div key={i} className="h-10 w-10 rounded-full border-2 border-[#0a0a0f] bg-gradient-to-br from-gray-700 to-gray-900" />
                  ))}
               </div>
               <p className="mt-4 text-xs text-white/40">You and {user.username} share 14 mutual followers.</p>
            </div>
         </aside>
      </div>
    </div>
  );
}
