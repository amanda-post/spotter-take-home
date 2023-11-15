'use client';
import { BeatSheet } from '@prisma/client';
import { useRouter } from 'next/navigation';
import useSWR from 'swr';
import AddBeatSheet from '~/app/beatsheet/[id]/components/AddBeatSheet';
import Spinner from '~/components/ui/spinner';
import { fetcher } from '~/lib/utils';

export default function Home() {
  const router = useRouter();

  const goToSheet = (id: string) => {
    router.push(`/beatsheet/${id}`);
  };

  const {
    data: beatSheets,
    isLoading,
  }: { data: BeatSheet[]; isLoading: boolean } = useSWR(
    '/api/beatsheets',
    fetcher
  );

  return (
    <main className='p-24 space-y-5'>
      <div className='text-xl'>Your Beat Sheets</div>
      {isLoading ? (
        <span className='mt-20 ml-10'>
          <Spinner size={50} />
        </span>
      ) : (
        <>
          {!!beatSheets?.length &&
            beatSheets.map((beatSheet) => (
              <div
                key={beatSheet.title}
                onClick={() => goToSheet(beatSheet.id)}
                className='cursor-pointer p-3 border-2 border-blue-800 rounded-lg w-1/3'
              >
                {beatSheet.title}
              </div>
            ))}
          <AddBeatSheet />
        </>
      )}
    </main>
  );
}
