'use client';
import { PlusCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { createBeatSheet } from '~/app/actions';

const fakeAct1 = {
  id: 'act123',
  description: 'Dramatic reveal of the hero',
  timestamp: new Date('2023-08-01T11:00:00Z'),
  beats: [
    {
      id: 'beat1',
      description: 'Hero stands up after being knocked down',
      timestamp: new Date('2023-08-01T11:01:00Z'),
      duration: 45,
      cameraAngle: 'Low angle',
      actId: 'act123',
      createdAt: new Date('2023-08-01T09:00:00Z'),
      updatedAt: new Date('2023-08-01T10:00:00Z'),
    },
    {
      id: 'beat2',
      description: 'Hero delivers a powerful speech',
      timestamp: new Date('2023-08-01T11:02:30Z'),
      duration: 30,
      cameraAngle: 'Close-up',
      actId: 'act123',
      createdAt: new Date('2023-08-01T09:30:00Z'),
      updatedAt: new Date('2023-08-01T10:30:00Z'),
    },
    {
      id: 'beat3',
      description: 'The crowd reacts with hope and enthusiasm',
      timestamp: new Date('2023-08-01T11:04:00Z'),
      duration: 60,
      cameraAngle: 'Wide',
      actId: 'act123',
      createdAt: new Date('2023-08-01T09:45:00Z'),
      updatedAt: new Date('2023-08-01T10:45:00Z'),
    },
  ],
};

export const fakeBeatSheet = {
  id: '123',
  title: 'The Hero',
  description: 'A story about a hero',
  acts: [fakeAct1, fakeAct1],
  createdAt: new Date('2023-08-01T09:00:00Z'),
  updatedAt: new Date('2023-08-01T10:00:00Z'),
};

const fakeData = [fakeBeatSheet];

export default function Home() {
  const router = useRouter();

  const goToSheet = (id: string) => {
    router.push(`/beatsheet/${id}`);
  };

  const createNew = () => {
    createBeatSheet().then(({ id }) => {
      goToSheet(id);
    });
  };

  return (
    <main className='p-24'>
      <div>Your BeatSheets</div>
      {fakeData.map((beatSheet) => (
        <div
          key={beatSheet.title}
          onClick={() => goToSheet(beatSheet.id)}
          className='cursor-pointer'
        >
          {beatSheet.title} - {beatSheet.description}
        </div>
      ))}
      <PlusCircle size={24} className='cursor-pointer' onClick={createNew} />
    </main>
  );
}
