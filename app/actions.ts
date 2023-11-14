'use server';
import { Act, Beat } from '@prisma/client';
import { db } from '~/lib/db';

export type ActData = {
  description: string;
  timestamp: Date;
};

export type BeatData = {
  description: string;
  timestamp: Date;
  duration: number;
  cameraAngle: string;
};

type DeleteManyResponse = {
  count: number;
};

export const createBeatSheet = async () => {
  return db.beatSheet.create({
    data: {
      title: 'Untitled',
    },
  });
};

export const createAct = async (
  beatSheetId: string,
  actData: ActData
): Promise<Act> => {
  const act = await db.act.create({
    data: {
      description: actData.description,
      timestamp: actData.timestamp,
      beatSheet: {
        connect: { id: beatSheetId },
      },
    },
  });
  return act;
};

export const createBeat = async (
  actId: string,
  beatData: BeatData
): Promise<Beat> => {
  const beat = await db.beat.create({
    data: {
      description: beatData.description,
      timestamp: beatData.timestamp,
      duration: beatData.duration,
      cameraAngle: beatData.cameraAngle,
      act: {
        connect: { id: actId },
      },
    },
  });
  return beat;
};

export const updateBeat = async (
  beatId: string,
  updateData: Partial<Beat>
): Promise<Beat> => {
  const updatedBeat = await db.beat.update({
    where: {
      id: beatId,
    },
    data: updateData,
  });
  return updatedBeat;
};

export const deleteBeat = async (beatId: string): Promise<Beat> => {
  const deletedBeat = await db.beat.delete({
    where: {
      id: beatId,
    },
  });
  return deletedBeat;
};

type TransactionResult = [DeleteManyResponse, Act];

export const deleteActAndBeats = async (
  actId: string
): Promise<TransactionResult> => {
  const transaction: TransactionResult = await db.$transaction([
    db.beat.deleteMany({
      where: {
        actId: actId,
      },
    }),
    db.act.delete({
      where: {
        id: actId,
      },
    }),
  ]);
  return transaction;
};
