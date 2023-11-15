'use client';
import { Act as ActType, Beat, BeatSheet } from '@prisma/client';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import useSWR, { MutatorCallback } from 'swr';
import Act from '~/app/beatsheet/[id]/components/Act';
import AddAct from '~/app/beatsheet/[id]/components/AddAct';
import { fetcher } from '~/lib/utils';

export default function BeatSheetPage({ params }: { params: { id: string } }) {
  const router = useRouter();

  const returnToDashboard = () => {
    router.push('/');
  };
  const id = params.id;

  const {
    data: beatSheet,
    isLoading,
    mutate,
  }: {
    data: BeatSheet & { acts: ActType[] };
    isLoading: boolean;
    mutate: MutatorCallback;
  } = useSWR(`/api/beatsheets/${id}`, fetcher);

  return (
    <main className='p-5'>
      <ArrowLeft className='cursor-pointer' onClick={returnToDashboard} />
      <div className='flex flex-col'>
        <span className='text-xl self-center'>{beatSheet?.title}</span>
        {beatSheet && !!beatSheet.acts.length ? (
          <>
            {beatSheet.acts.map((act, i) => (
              <div key={act.id}>
                <Act
                  act={act as ActType & { beats: Beat[] }}
                  number={i + 1}
                  mutate={mutate}
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
