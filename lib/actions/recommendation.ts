"use server";

import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";

export async function getRecommendedCommunities() {
  try {
    const session = await getServerSession(authOptions).catch(() => null);
    
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
  } catch (error) {
    console.error("Error fetching recommended communities:", error);
    return [];
  }
}


export async function getRecommendedUsers() {
  try {
    const session = await getServerSession(authOptions).catch(() => null);
    
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
  } catch (error) {
    console.error("Error fetching recommended users:", error);
    return [];
  }
}

