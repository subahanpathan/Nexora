"use server";

import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { CommentSchema } from "@/lib/validators";
import { revalidatePath } from "next/cache";

export async function createComment(data: unknown) {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("Unauthorized");

  const validatedData = CommentSchema.parse(data);

  const comment = await prisma.comment.create({
    data: {
      content: validatedData.content,
      postId: validatedData.postId,
      parentId: validatedData.parentId,
      authorId: session.user.id,
    },
  });

  // If it's a reply, we could trigger a notification here
  if (validatedData.parentId) {
    const parentComment = await prisma.comment.findUnique({
      where: { id: validatedData.parentId },
      select: { authorId: true, postId: true },
    });

    if (parentComment && parentComment.authorId !== session.user.id) {
      await prisma.notification.create({
        data: {
          type: "REPLY",
          title: "New reply to your comment",
          content: `${session.user.name} replied to your comment.`,
          link: `/post/${parentComment.postId}`,
          userId: parentComment.authorId,
        },
      });
    }
  }

  revalidatePath(`/post/${validatedData.postId}`);
  return comment;
}

export async function getComments(postId: string) {
  return await prisma.comment.findMany({
    where: {
      postId,
      parentId: null, // Get top level comments first
    },
    include: {
      author: true,
      votes: true,
      replies: {
        include: {
          author: true,
          votes: true,
          replies: {
            include: {
              author: true,
              votes: true,
            }
          }
        }
      }
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}
