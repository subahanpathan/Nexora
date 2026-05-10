"use server";

import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";

export async function getRecommendedCommunities() {
  // Get communities with the most members that the user isn't part of yet
  const session = await getServerSession(authOptions);
  
  return await prisma.community.findMany({
    where: session?.user?.id ? {
      NOT: {
        members: {
          some: {
            userId: session.user.id
          }
        }
      }
    } : {},
    include: {
      _count: {
        select: { members: true }
      }
    },
    orderBy: {
      members: {
        _count: "desc"
      }
    },
    take: 4
  });
}

export async function getRecommendedUsers() {
  const session = await getServerSession(authOptions);
  
  return await prisma.user.findMany({
    where: session?.user?.id ? {
      id: { not: session.user.id },
      NOT: {
        followers: {
          some: {
            followerId: session.user.id
          }
        }
      }
    } : {},
    take: 4,
    orderBy: {
      reputation: "desc"
    }
  });
}
