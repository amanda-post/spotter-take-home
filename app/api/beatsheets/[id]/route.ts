import { NextResponse } from 'next/server';
import { db } from '~/lib/db';

export async function GET(
  request: Request,
  { params: { id } }: { params: { id: string } }
) {
  const beatsheet = await db.beatSheet.findUnique({
    where: { id },
    include: {
      acts: {
        orderBy: {
          createdAt: 'asc',
        },
        include: {
          beats: {
            orderBy: {
              createdAt: 'asc',
            },
          },
        },
      },
    },
  });
  return NextResponse.json(beatsheet);
}
