'use client';
import { Beat } from '@prisma/client';
import { useState } from 'react';
import { createBeat, updateBeat } from '~/app/actions';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';

export default function BeatForm({
  beatData,
  actId,
  showForm,
  setShowForm,
}: {
  beatData?: Beat;
  actId?: string;
  showForm: boolean;
  setShowForm: (showForm: boolean) => void;
}) {
  const [description, setDescription] = useState(
    beatData ? beatData.description : ''
  );
  const [duration, setDuration] = useState(beatData ? beatData.duration : 0);
  const [cameraAngle, setCameraAngle] = useState(
    beatData ? beatData.cameraAngle : ''
  );

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const handleCameraAngleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCameraAngle(e.target.value);
  };

  const handleDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDuration(Number(e.target.value));
  };

  const handleSubmit = () => {
    if (actId) {
      createBeat(actId, { description, duration, cameraAngle });
    } else if (beatData?.id) {
      updateBeat(beatData.id, { description, duration, cameraAngle });
    }
  };

  return (
    <div className='p-10 flex'>
      {showForm && (
        <div>
          <div>
            Description:{' '}
            <Input value={description} onChange={handleDescriptionChange} />
            Duration of beat (seconds):{' '}
            <Input
              type='number'
              value={duration}
              onChange={handleDurationChange}
            />
            Camera angle:{' '}
            <Input value={cameraAngle} onChange={handleCameraAngleChange} />
            <Button
              onClick={handleSubmit}
              disabled={!description || !duration || !cameraAngle}
            >
              Save
            </Button>
            <Button variant='ghost' onClick={() => setShowForm(false)}>
              Cancel
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
