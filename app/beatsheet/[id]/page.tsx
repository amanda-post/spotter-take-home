'use client';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Act from '~/app/beatsheet/[id]/components/Act';
import { fakeBeatSheet } from '~/app/page';

export default function BeatSheetPage() {
  const router = useRouter();

  const returnToDashboard = () => {
    router.push('/');
  };

  const acts = fakeBeatSheet.acts;

  return (
    <main className='p-10'>
      <ArrowLeft className='cursor-pointer' onClick={returnToDashboard} />
      <div className='flex flex-col'>
        {acts.map((act, i) => (
          <div key={act.id}>
            <Act act={act} number={i + 1} />
          </div>
        ))}
      </div>
    </main>
  );
}
