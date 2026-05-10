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

    const existingVote =
      await prisma.vote.findUnique({
        where: {
          userId_postId: {
            userId: user.id,
            postId: body.postId,
          },
        },
      });

    if (existingVote) {
      await prisma.vote.delete({
        where: {
          id: existingVote.id,
        },
      });

      return NextResponse.json({
        removed: true,
      });
    }

    const vote =
      await prisma.vote.create({
        data: {
          type: 1,
          postId: body.postId,
          userId: user.id,
        },
      });

    return NextResponse.json(vote);
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        error: "Failed to vote",
      },
      {
        status: 500,
      }
    );
  }
}