import { NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";

// method post dengan type request
export async function POST(request: Request) {
  const data = await request.json();

  const profile = await prisma.companyoverview.findFirst({
    where: {
      companyId: data.companyId,
    },
  });

  // upsert adalah jika data blm pernah di buat maka kita buat, jika data sudah pernah dibuat maka kita yaudah tinggal update aja
  const result = await prisma.companyoverview.upsert({
    where: {
      companyId: data.companyId,
      id: profile?.id || "",
    },
    update: data,
    create: data,
  });

  return NextResponse.json(result);
}
