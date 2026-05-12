"use server";

import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { CommunitySchema } from "@/lib/validators";
import { revalidatePath, revalidateTag, unstable_cache } from "next/cache";

export async function createCommunity(data: unknown) {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("Unauthorized");

  const validatedData = CommunitySchema.parse(data);
  const slug = validatedData.name.toLowerCase().replace(/ /g, "_");

  const community = await prisma.community.create({
    data: {
      name: validatedData.name,
      slug,
      description: validatedData.description,
      members: {
        create: {
          userId: session.user.id,
          role: "ADMIN",
        },
      },
    },
  });

  revalidatePath("/communities");
  revalidateTag("communities", "max");
  return community;
}

export async function joinCommunity(communityId: string) {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("Unauthorized");

  const existingMember = await prisma.communityMember.findUnique({
    where: {
      userId_communityId: {
        userId: session.user.id,
        communityId,
      },
    },
  });

  if (existingMember) {
    await prisma.communityMember.delete({
      where: {
        userId_communityId: {
          userId: session.user.id,
          communityId,
        },
      },
    });
  } else {
    await prisma.communityMember.create({
      data: {
        userId: session.user.id,
        communityId,
      },
    });
  }

  revalidatePath(`/t/${communityId}`);
  revalidateTag("communities", "max");
}

export async function getCommunities() {
  try {
    const getCachedCommunities = unstable_cache(
      async () =>
        prisma.community.findMany({
          select: {
            id: true,
            name: true,
            slug: true,
            description: true,
            image: true,
            banner: true,
            color: true,
            createdAt: true,
            updatedAt: true,
            _count: {
              select: { members: true },
            },
          },
          orderBy: {
            members: {
              _count: "desc",
            },
          },
        }),
      ["communities:list"],
      { revalidate: 120, tags: ["communities"] }
    );
    return await getCachedCommunities();
  } catch (error) {
    console.error("Error fetching communities:", error);
    return [];
  }
}

