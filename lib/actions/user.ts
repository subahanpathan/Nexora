"use server";

import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { revalidatePath } from "next/cache";

export async function followUser(userId: string) {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("Unauthorized");
  if (session.user.id === userId) throw new Error("Cannot follow yourself");

  const existingFollow = await prisma.follow.findUnique({
    where: {
      followerId_followingId: {
        followerId: session.user.id,
        followingId: userId,
      },
    },
  });

  if (existingFollow) {
    await prisma.follow.delete({
      where: {
        followerId_followingId: {
          followerId: session.user.id,
          followingId: userId,
        },
      },
    });
  } else {
    await prisma.follow.create({
      data: {
        followerId: session.user.id,
        followingId: userId,
      },
    });

    // Notify the user being followed
    await prisma.notification.create({
      data: {
        type: "FOLLOW",
        title: "New follower",
        content: `${session.user.name} started following you.`,
        userId: userId,
      },
    });
  }

  revalidatePath(`/u/${userId}`);
}

export async function bookmarkPost(postId: string) {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("Unauthorized");

  const existingBookmark = await prisma.bookmark.findUnique({
    where: {
      userId_postId: {
        userId: session.user.id,
        postId,
      },
    },
  });

  if (existingBookmark) {
    await prisma.bookmark.delete({
      where: {
        userId_postId: {
          userId: session.user.id,
          postId,
        },
      },
    });
  } else {
    await prisma.bookmark.create({
      data: {
        userId: session.user.id,
        postId,
      },
    });
  }

  revalidatePath("/saved");
}

export async function getNotifications() {
  const session = await getServerSession(authOptions);
  if (!session) return [];

  return await prisma.notification.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
    take: 20,
  });
}

export async function markNotificationRead(id: string) {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("Unauthorized");

  await prisma.notification.update({
    where: { id, userId: session.user.id },
    data: { read: true },
  });

  revalidatePath("/");
}
