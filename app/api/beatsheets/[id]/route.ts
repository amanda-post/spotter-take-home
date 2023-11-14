import { NextResponse } from 'next/server';
import { db } from '~/lib/db';

export async function GET(
  request: Request,
  { params: { id } }: { params: { id: string } }
) {
  // get beatsheet by id, and also get the acts and beats -- such that both the acts and beats are sorted by createdAt, ascending. the data structure should look like this: { id: string, title: string, acts: [{ id: string, title: string, beats: [{ id: string, title: string, content: string, createdAt: string}] }] } etc.
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
