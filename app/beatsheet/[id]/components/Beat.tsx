'use client';

import { Beat } from '@prisma/client';
import { Menu } from 'lucide-react';
import { useState } from 'react';
import { MutatorCallback } from 'swr';
import { deleteBeat } from '~/app/actions';
import BeatForm from '~/app/beatsheet/[id]/components/BeatForm';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';

const BeatRowClasses = 'text-element-bold';

export default function Beat({
  beat,
  mutate,
}: {
  beat: Beat;
  mutate: MutatorCallback;
}) {
  const [editMode, setEditMode] = useState(false);
  const { description, duration, cameraAngle } = beat;

  const handleDeleteBeat = async () => {
    await deleteBeat(beat.id);
    mutate();
  };

  return (
    <div className='p-5'>
      {editMode ? (
        <BeatForm
          beatData={beat}
          showForm={editMode}
          setShowForm={setEditMode}
          mutate={mutate}
        />
      ) : (
        <div className='border-2 border-gray-800 rounded-lg p-5 space-y-2'>
          <div className={BeatRowClasses}>
            <span className='flex'>
              Beat Description:
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Menu className='ml-7 cursor-pointer' />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setEditMode(true)}>
                    Edit beat
                  </DropdownMenuItem>

                  <DropdownMenuItem onClick={handleDeleteBeat}>
                    Delete beat
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </span>
            <div>{description}</div>
          </div>
          <div className={BeatRowClasses}>
            Duration: <div>{duration}</div>
          </div>
          <div className={BeatRowClasses}>
            Camera Angle: <div>{cameraAngle}</div>
          </div>
        </div>
      )}
    </div>
  );
}
