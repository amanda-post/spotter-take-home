'use client';
import { Act as ActType, Beat, BeatSheet } from '@prisma/client';
import axios from 'axios';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Act from '~/app/beatsheet/[id]/components/Act';
import AddAct from '~/app/beatsheet/[id]/components/AddAct';

export default function BeatSheetPage({ params }: { params: { id: string } }) {
  const [beatSheet, setBeatSheet] = useState<
    (BeatSheet & { acts: ActType[] }) | null
  >(null);
  const router = useRouter();

  const returnToDashboard = () => {
    router.push('/');
  };
  const id = params.id;

  useEffect(() => {
    id &&
      axios
        .get(`/api/beatsheets/${id}`)
        .then((res) => {
          setBeatSheet(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
  }, [id]);

  return (
    <main className='p-10'>
      <ArrowLeft className='cursor-pointer' onClick={returnToDashboard} />
      <div className='flex flex-col'>
        <h3>{beatSheet?.title}</h3>
        {beatSheet && !!beatSheet.acts.length ? (
          <>
            {beatSheet.acts.map((act, i) => (
              <div key={act.id}>
                <Act
                  act={act as ActType & { beats: Beat[] }}
                  number={i + 1}
                  beatSheetId={id}
                />
              </div>
            ))}
          </>
        ) : null}
        <AddAct beatSheetId={id} />
      </div>
    </main>
  );
}
