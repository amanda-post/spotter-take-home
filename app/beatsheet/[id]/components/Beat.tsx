'use client';

import { Beat } from '@prisma/client';
import { useState } from 'react';
import BeatForm from '~/app/beatsheet/[id]/components/BeatForm';
import { Button } from '~/components/ui/button';

const BeatRowClasses = 'pt-4 text-element-bold';

export default function Beat({ beat }: { beat: Beat }) {
  const [editMode, setEditMode] = useState(false);
  const { description, duration, cameraAngle } = beat;

  return (
    <div className='p-10'>
      {editMode ? (
        <BeatForm
          beatData={beat}
          showForm={editMode}
          setShowForm={setEditMode}
        />
      ) : (
        <>
          <div className={BeatRowClasses}>
            Beat Description: <div>{description}</div>
          </div>
          <div className={BeatRowClasses}>
            Duration: <div>{duration}</div>
          </div>
          <div className={BeatRowClasses}>
            Camera Angle: <div>{cameraAngle}</div>
          </div>
        </>
      )}
      <Button onClick={() => setEditMode(true)}>Edit beat</Button>
    </div>
  );
}
