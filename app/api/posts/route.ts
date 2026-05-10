import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

export async function POST(
  request: Request
) {
  try {
    const body = await request.json();

    const community =
      await prisma.community.findFirst();

    const user =
      await prisma.user.findFirst();

    if (!community || !user) {
      return NextResponse.json(
        {
          error:
            "Need seeded user/community",
        },
        {
          status: 400,
        }
      );
    }

    const post = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,

        communityId: community.id,
        authorId: user.id,
      },
    });

    return NextResponse.json(post);
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        error: "Failed to create post",
      },
      {
        status: 500,
      }
    );
  }
}