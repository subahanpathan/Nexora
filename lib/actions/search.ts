"use server";

import { prisma } from "@/lib/prisma";

export async function searchEverything(query: string) {
  if (!query) return { posts: [], communities: [], users: [] };

  const [posts, communities, users] = await Promise.all([
    prisma.post.findMany({
      where: {
        OR: [
          { title: { contains: query, mode: "insensitive" } },
          { content: { contains: query, mode: "insensitive" } },
        ],
      },
      take: 5,
      include: { author: true, community: true },
    }),
    prisma.community.findMany({
      where: {
        OR: [
          { name: { contains: query, mode: "insensitive" } },
          { slug: { contains: query, mode: "insensitive" } },
        ],
      },
      take: 5,
    }),
    prisma.user.findMany({
      where: {
        username: { contains: query, mode: "insensitive" },
      },
      take: 5,
    }),
  ]);

  return { posts, communities, users };
}
