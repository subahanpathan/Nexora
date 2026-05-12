"use server";

import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { PostSchema } from "@/lib/validators";
import { revalidatePath, revalidateTag, unstable_cache } from "next/cache";

import { ExtendedPost } from "@/lib/types";

export async function createPost(data: unknown) {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("Unauthorized");

  const validatedData = PostSchema.parse(data);

  // AI Moderation Simulation
  const toxicWords = ["spam", "buy now", "click here", "badword"];
  const isToxic = toxicWords.some(word => 
    validatedData.title.toLowerCase().includes(word) || 
    validatedData.content.toLowerCase().includes(word)
  );

  if (isToxic) {
    throw new Error("AI Moderation: Your post contains low-signal or prohibited content.");
  }

  // Enhanced AI Summarization Simulation
  const summary = `Threadify AI Analysis: This thread explores "${validatedData.title}". Key themes include ${validatedData.content.split(' ').slice(0, 5).join(', ')}... and provides high-signal insights into the topic.`;

  const post = await prisma.post.create({
    data: {
      ...validatedData,
      authorId: session.user.id,
      summary,
    },
  });

  revalidatePath("/");
  revalidateTag("posts", "max");
  return post;
}

export async function getPosts({ 
  limit = 10, 
  cursor, 
  communityId,
  authorId,
  sort = "new", // "new" | "top" | "trending"
}: { 
  limit?: number; 
  cursor?: string;
  communityId?: string;
  authorId?: string;
  sort?: string;
}): Promise<{ posts: ExtendedPost[], nextCursor: string | undefined }> {
  try {
    if (!cursor && !communityId && !authorId && sort === "new" && limit === 10) {
      const getCachedHomePosts = unstable_cache(
        async () =>
          prisma.post.findMany({
            take: 11,
            orderBy: { createdAt: "desc" },
            select: {
              id: true,
              title: true,
              content: true,
              imageUrl: true,
              imageLabel: true,
              hiring: true,
              tag: true,
              summary: true,
              createdAt: true,
              updatedAt: true,
              authorId: true,
              communityId: true,
              author: {
                select: {
                  id: true,
                  username: true,
                  verified: true,
                  image: true,
                },
              },
              community: {
                select: {
                  id: true,
                  name: true,
                  slug: true,
                  color: true,
                },
              },
              votes: {
                select: {
                  id: true,
                  type: true,
                  userId: true,
                  postId: true,
                },
              },
              _count: {
                select: {
                  comments: true,
                },
              },
            },
          }),
        ["posts:home"],
        { revalidate: 60, tags: ["posts"] }
      );
      const homePosts = await getCachedHomePosts();
      let nextCursor: string | undefined = undefined;
      const posts = [...homePosts];
      if (posts.length > limit) {
        const nextItem = posts.pop();
        nextCursor = nextItem?.id;
      }
      return { posts: posts as ExtendedPost[], nextCursor };
    }

    let orderBy: Prisma.PostOrderByWithRelationInput | Prisma.PostOrderByWithRelationInput[] = { createdAt: "desc" };
    
    if (sort === "top") {
      orderBy = {
        votes: {
          _count: "desc",
        },
      };
    } else if (sort === "trending") {
      orderBy = [
        {
          comments: {
            _count: "desc",
          },
        },
        {
          votes: {
            _count: "desc",
          },
        },
      ];
    }

    const posts = await prisma.post.findMany({
      take: limit + 1,
      cursor: cursor ? { id: cursor } : undefined,
      where: {
        communityId,
        authorId,
      },
      orderBy,
      select: {
        id: true,
        title: true,
        content: true,
        imageUrl: true,
        imageLabel: true,
        hiring: true,
        tag: true,
        summary: true,
        createdAt: true,
        updatedAt: true,
        authorId: true,
        communityId: true,
        author: {
          select: {
            id: true,
            username: true,
            verified: true,
            image: true,
          },
        },
        community: {
          select: {
            id: true,
            name: true,
            slug: true,
            color: true,
          },
        },
        votes: {
          select: {
            id: true,
            type: true,
            userId: true,
            postId: true,
          },
        },
        _count: {
          select: {
            comments: true,
          },
        },
      },
    });

    let nextCursor: string | undefined = undefined;
    if (posts.length > limit) {
      const nextItem = posts.pop();
      nextCursor = nextItem?.id;
    }

    return {
      posts: posts as ExtendedPost[],
      nextCursor,
    };
  } catch (error) {
    console.error("Error fetching posts:", error);
    return {
      posts: [],
      nextCursor: undefined,
    };
  }
}


export async function votePost({ postId, type }: { postId: string; type: number }) {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("Unauthorized");

  const existingVote = await prisma.vote.findUnique({
    where: {
      userId_postId: {
        userId: session.user.id,
        postId,
      },
    },
  });

  if (existingVote) {
    if (existingVote.type === type) {
      await prisma.vote.delete({
        where: { id: existingVote.id },
      });
    } else {
      await prisma.vote.update({
        where: { id: existingVote.id },
        data: { type },
      });
    }
  } else {
    await prisma.vote.create({
      data: {
        type,
        userId: session.user.id,
        postId,
      },
    });
  }

  revalidatePath("/");
  revalidateTag("posts", "max");
}
