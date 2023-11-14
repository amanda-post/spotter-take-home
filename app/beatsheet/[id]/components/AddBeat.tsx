'use client';
import { MinusCircle, PlusCircle } from 'lucide-react';
import { useState } from 'react';
import { createBeat } from '~/app/actions';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';

export default function AddBeat({ actId }: { actId: string }) {
  const [showForm, setShowForm] = useState(false);
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState(0);
  const [cameraAngle, setCameraAngle] = useState('');

  const toggleForm = () => {
    setShowForm(!showForm);
  };

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
    createBeat(actId, { description, duration, cameraAngle });
  };

  return (
    <div className='p-4 flex'>
      <div className='flex cursor-pointer' onClick={toggleForm}>
        {showForm ? (
          <>
            <MinusCircle /> Stop adding
          </>
        ) : (
          <>
            <PlusCircle /> Add new beat
          </>
        )}
      </div>

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
            <Button onClick={handleSubmit}>Save</Button>
          </div>
        </div>
      )}
    </div>
  );
}
