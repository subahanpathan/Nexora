"use server";

import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { CommunitySchema } from "@/lib/validators";
import { revalidatePath } from "next/cache";

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
}

export async function getCommunities() {
  return await prisma.community.findMany({
    include: {
      _count: {
        select: { members: true },
      },
    },
    orderBy: {
      members: {
        _count: "desc",
      },
    },
  });
}
