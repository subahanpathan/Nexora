import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function PostPage({
  params,
}: {
  params: Promise<{
    slug: string;
    postId: string;
  }>;
}) {
  const { slug, postId } = await params;

  const post = await prisma.post.findUnique({
    where: {
      id: postId,
    },
    include: {
      community: true,
    },
  });

  if (!post) {
    return notFound();
  }

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-xl p-8 shadow-sm border">
          <p className="text-sm text-gray-500 mb-4">
            /c/{slug}
          </p>

          <h1 className="text-4xl font-bold">
            {post.title}
          </h1>

          <p className="text-gray-700 mt-6 text-lg">
            {post.content}
          </p>
        </div>
      </div>
    </main>
  );
}