import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

export async function POST(
  request: Request
) {
  try {
    const body = await request.json();

    const existingCommunity =
      await prisma.community.findUnique({
        where: {
          slug: body.slug,
        },
      });

    if (existingCommunity) {
      return NextResponse.json(
        {
          error:
            "Community already exists",
        },
        {
          status: 400,
        }
      );
    }

    const community =
      await prisma.community.create({
        data: {
          name: body.name,
          slug: body.slug,
        },
      });

    return NextResponse.json(
      community
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        error:
          "Failed to create community",
      },
      {
        status: 500,
      }
    );
  }
}