'use client';

import { Act, Beat as BeatType } from '@prisma/client';
import AddBeat from '~/app/beatsheet/[id]/components/AddBeat';
import Beat from '~/app/beatsheet/[id]/components/Beat';

export default function Act({
  act,
  number,
  beatSheetId,
}: {
  act: Act & { beats: BeatType[] };
  number: number;
  beatSheetId: string;
}) {
  console.log({ act });
  const { description, beats } = act;

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
        <AddBeat actId={act.id} />
      </div>
    </div>
  );
}
