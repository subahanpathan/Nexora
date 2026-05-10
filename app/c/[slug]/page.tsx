import { prisma } from "@/lib/prisma";

import { notFound } from "next/navigation";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export default async function CommunityPage({
  params,
}: Props) {
  const { slug } = await params;

  const community =
    await prisma.community.findUnique({
      where: {
        slug,
      },

      include: {
        posts: {
          include: {
            author: true,
            comments: true,
            votes: true,
          },

          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

  if (!community) {
    return notFound();
  }

  return (
    <main className="min-h-screen bg-[#0f0f10] text-white p-6">
      <div className="max-w-5xl mx-auto">
        <div className="bg-[#18181b] border border-zinc-800 rounded-2xl p-8 mb-8">
          <h1 className="text-4xl font-bold">
            {community.name}
          </h1>

          <p className="text-zinc-400 mt-2">
            /c/{community.slug}
          </p>
        </div>

        <div className="space-y-5">
          {community.posts.map((post) => (
            <div
              key={post.id}
              className="bg-[#18181b] border border-zinc-800 rounded-2xl p-6"
            >
              <h2 className="text-2xl font-bold mb-3">
                {post.title}
              </h2>

              <p className="text-zinc-300">
                {post.content}
              </p>

              <div className="flex items-center gap-5 mt-5 text-sm text-zinc-500">
                <span>
                  @{post.author.username}
                </span>

                <span>
                  {post.comments.length}
                  {" "}comments
                </span>

                <span>
                  {post.votes.length}
                  {" "}votes
                </span>
              </div>
            </div>
          ))}

          {community.posts.length === 0 && (
            <div className="text-zinc-500">
              No posts yet
            </div>
          )}
        </div>
      </div>
    </main>
  );
}