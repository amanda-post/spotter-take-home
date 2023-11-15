'use client';
import { Act as ActType, Beat, BeatSheet } from '@prisma/client';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import useSWR, { MutatorCallback } from 'swr';
import { updateBeatSheet } from '~/app/actions';
import Act from '~/app/beatsheet/[id]/components/Act';
import AddAct from '~/app/beatsheet/[id]/components/AddAct';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import Spinner from '~/components/ui/spinner';
import { fetcher } from '~/lib/utils';

export default function BeatSheetPage({ params }: { params: { id: string } }) {
  const [editBeatSheetTitleMode, setEditBeatSheetTitleMode] = useState(false);
  const [beatSheetTitle, setBeatSheetTitle] = useState('');
  const router = useRouter();

  const toggleEditBeatSheetTitleMode = () => {
    setEditBeatSheetTitleMode(!editBeatSheetTitleMode);
  };

  const handleBeatSheetTitleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setBeatSheetTitle(e.target.value);
  };

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

  const handleBeatSheetTitleSave = async () => {
    await updateBeatSheet(id, beatSheetTitle);
    toggleEditBeatSheetTitleMode();
    mutate();
  };

  useEffect(() => {
    if (beatSheet) {
      setBeatSheetTitle(beatSheet.title);
    }
  }, [beatSheet]);

  return (
    <main className='p-5'>
      <ArrowLeft className='cursor-pointer' onClick={returnToDashboard} />
      <div className='flex flex-col'>
        {isLoading ? (
          <span className='flex justify-center mt-20'>
            <Spinner size={60} />
          </span>
        ) : (
          <>
            {editBeatSheetTitleMode ? (
              <div className='flex justify-center'>
                <div className='w-1/3 flex space-x-2'>
                  <Input
                    value={beatSheetTitle}
                    onChange={handleBeatSheetTitleChange}
                  />
                  <Button
                    disabled={!beatSheetTitle}
                    onClick={handleBeatSheetTitleSave}
                  >
                    Save
                  </Button>
                  <Button variant='link' onClick={toggleEditBeatSheetTitleMode}>
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <span className='text-xl self-center'>
                {beatSheet?.title}
                <Button
                  variant='link'
                  className='text-xs'
                  onClick={toggleEditBeatSheetTitleMode}
                >
                  Edit
                </Button>
              </span>
            )}
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
          </>
        )}
      </div>
    </main>
  );
}
