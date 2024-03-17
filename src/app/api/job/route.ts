import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

export async function POST(request: Request) {
  // ambil data bodynya
  const data = await request.json();

  // create data
  const result = await prisma.job.create({
    data,
  });

  return NextResponse.json(result);
}
