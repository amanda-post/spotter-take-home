'use client';

import { Beat as BeatType } from '@prisma/client';
import { usePathname } from 'next/navigation';
import AddBeat from '~/app/beatsheet/[id]/components/AddBeat';
import Beat from '~/app/beatsheet/[id]/components/Beat';

export default function Act({
  act,
  number,
}: {
  act: { description: string; beats: BeatType[] };
  number: number;
}) {
  const { description, beats } = act;
  const pathname = usePathname();
  const isEditing = pathname.endsWith('/edit');

  return (
    <div className='p-10'>
      <div className='border-b-black border-b-2 font-bold'>
        Act #{number}: {description}
      </div>
      <div className='flex'>
        {!!beats &&
          beats.map((beat: BeatType) => (
            <div key={beat.id}>
              <Beat beat={beat} />
            </div>
          ))}
        {!!isEditing && <AddBeat />}
      </div>
    </div>
  );
}
