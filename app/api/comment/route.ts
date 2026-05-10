import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth-options";

export async function POST(
  request: Request
) {
  try {
    const session =
      await getServerSession(
        authOptions
      );

    if (!session?.user?.email) {
      return NextResponse.json(
        {
          error: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    const user =
      await prisma.user.findUnique({
        where: {
          email:
            session.user.email,
        },
      });

    if (!user) {
      return NextResponse.json(
        {
          error: "User not found",
        },
        {
          status: 404,
        }
      );
    }

    const body = await request.json();

    const comment =
      await prisma.comment.create({
        data: {
          content: body.content,
          postId: body.postId,
          authorId: user.id,
        },
      });

    return NextResponse.json(comment);
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        error:
          "Failed to create comment",
      },
      {
        status: 500,
      }
    );
  }
}