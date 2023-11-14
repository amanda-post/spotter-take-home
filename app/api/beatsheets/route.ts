import { NextResponse } from 'next/server';
import { db } from '~/lib/db';

export async function GET(request: Request) {
  const beatsheets = await db.beatSheet.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    select: {
      id: true,
      title: true,
    },
  });
  return NextResponse.json(beatsheets);
}
