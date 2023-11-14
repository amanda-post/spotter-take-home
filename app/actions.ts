'use server';
import { Act, Beat } from '@prisma/client';
import { db } from '~/lib/db';

export type ActData = {
  description: string;
};

export type BeatData = {
  description: string;
  duration: number;
  cameraAngle: string;
};

type DeleteManyResponse = {
  count: number;
};

export const createBeatSheet = async (title: string) => {
  const response = await db.beatSheet.create({
    data: {
      title,
    },
  });
  return response;
};

export const createAct = async (
  beatSheetId: string,
  actData: ActData
): Promise<Act> => {
  const act = await db.act.create({
    data: {
      description: actData.description,
      beatSheet: {
        connect: { id: beatSheetId },
      },
    },
  });
  return act;
};

export const updateAct = async (
  actId: string,
  updateData: Partial<Act>
): Promise<Act> => {
  const updatedAct = await db.act.update({
    where: {
      id: actId,
    },
    data: updateData,
  });
  return updatedAct;
};

export const createBeat = async (
  actId: string,
  beatData: BeatData
): Promise<Beat> => {
  const beat = await db.beat.create({
    data: {
      description: beatData.description,
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
