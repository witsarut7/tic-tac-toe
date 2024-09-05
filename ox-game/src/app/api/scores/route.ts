import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const bodyJson = (await req.json()) as { userId: number; points: number };

    const findScore = await prisma.score.findFirst({
      where: { userId: bodyJson.userId },
    });

    // await prisma.score.upsert({
    //   where: { id: findScore?.id },
    //   create: {
    //     userId: bodyJson.userId,
    //     points: bodyJson.points,
    //   },
    //   update: {
    //     points: (findScore?.points || 0) + bodyJson.points,
    //   },
    // });

    if (findScore) {
      const updateData = await prisma.score.update({
        where: { id: findScore?.id },
        data: { points: (findScore?.points || 0) + bodyJson.points },
      });
      return NextResponse.json({ score: updateData });
    } else {
      const createData = await prisma.score.create({ data: bodyJson });
      return NextResponse.json({ score: createData });
    }
  } catch (error) {
    throw error;
  }
}

export async function GET(req: NextRequest) {
  try {
    const findScores = await prisma.score.findMany({
      include: {
        user: true, // Include user data
      },
      orderBy: {
        points: "desc",
      },
    });

    return NextResponse.json({ scores: findScores });
  } catch (error) {
    throw error;
  }
}
