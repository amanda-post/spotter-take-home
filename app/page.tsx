'use client';
import { BeatSheet } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { createBeatSheet } from '~/app/actions';
import AddBeatSheet from '~/app/beatsheet/[id]/components/AddBeatSheet';

export default function Home() {
  const [beatSheets, setBeatSheets] = useState<BeatSheet[]>([]);
  const [beatSheetTitle, setBeatSheetTitle] = useState<string>('');
  const router = useRouter();

  const goToSheet = (id: string) => {
    router.push(`/beatsheet/${id}`);
  };

  const createNew = () => {
    createBeatSheet(beatSheetTitle).then(({ id }) => {
      goToSheet(id);
    });
  };

  useEffect(() => {
    fetch('/api/beatsheets')
      .then((res) => res.json())
      .then((data) => {
        setBeatSheets(data);
      });
  }, []);

  return (
    <main className='p-24'>
      <div>Your BeatSheets</div>
      {!!beatSheets.length &&
        beatSheets.map((beatSheet) => (
          <div
            key={beatSheet.title}
            onClick={() => goToSheet(beatSheet.id)}
            className='cursor-pointer'
          >
            {beatSheet.title}
          </div>
        ))}
      <AddBeatSheet />
    </main>
  );
}
