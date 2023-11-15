'use client';
import { BeatSheet } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import AddBeatSheet from '~/app/beatsheet/[id]/components/AddBeatSheet';

export default function Home() {
  const [beatSheets, setBeatSheets] = useState<BeatSheet[]>([]);
  const router = useRouter();

  const goToSheet = (id: string) => {
    router.push(`/beatsheet/${id}`);
  };

  useEffect(() => {
    fetch('/api/beatsheets')
      .then((res) => res.json())
      .then((data) => {
        setBeatSheets(data);
      });
  });

  return (
    <main className='p-24'>
      <div className='text-xl'>Your Beat Sheets</div>
      {!!beatSheets.length &&
        beatSheets.map((beatSheet) => (
          <div
            key={beatSheet.title}
            onClick={() => goToSheet(beatSheet.id)}
            className='cursor-pointer p-3 border-2 border-gray-800 rounded-lg'
          >
            {beatSheet.title}
          </div>
        ))}
      <AddBeatSheet />
    </main>
  );
}
