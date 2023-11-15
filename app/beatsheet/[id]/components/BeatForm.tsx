'use client';
import { Beat } from '@prisma/client';
import { useState } from 'react';
import { MutatorCallback } from 'swr';
import { createBeat, updateBeat } from '~/app/actions';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';

export default function BeatForm({
  beatData,
  actId,
  showForm,
  setShowForm,
  mutate,
}: {
  beatData?: Beat;
  actId?: string;
  showForm: boolean;
  setShowForm: (showForm: boolean) => void;
  mutate: MutatorCallback;
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

  const handleSubmit = async () => {
    if (actId) {
      await createBeat(actId, { description, duration, cameraAngle });
    } else if (beatData?.id) {
      await updateBeat(beatData.id, { description, duration, cameraAngle });
    }
    mutate();
    setDescription('');
    setCameraAngle('');
    setDuration(0);
    setShowForm(false);
  };

  return (
    <div className='pt-5 pl-5 flex'>
      {showForm && (
        <div>
          <div>
            <span className='font-bold'>Description: </span>
            <Input value={description} onChange={handleDescriptionChange} />
            <span className='font-bold'>Duration of beat (seconds): </span>
            <Input
              type='number'
              value={duration}
              onChange={handleDurationChange}
            />
            <span className='font-bold'>Camera angle: </span>
            <Input value={cameraAngle} onChange={handleCameraAngleChange} />
            <Button
              onClick={handleSubmit}
              disabled={!description || !duration || !cameraAngle}
              className='mt-2'
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
