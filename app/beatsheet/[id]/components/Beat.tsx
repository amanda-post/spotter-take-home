'use client';

import { Beat } from '@prisma/client';

const BeatRowClasses = 'pt-4 text-element-bold';

export default function Beat({ beat }: { beat: Beat }) {
  const { description, duration, cameraAngle } = beat;

  return (
    <div className='p-10'>
      <div className={BeatRowClasses}>
        Beat Description: <div>{description}</div>
      </div>
      <div className={BeatRowClasses}>
        Duration: <div>{duration}</div>
      </div>
      <div className={BeatRowClasses}>
        Camera Angle: <div>{cameraAngle}</div>
      </div>
    </div>
  );
}
