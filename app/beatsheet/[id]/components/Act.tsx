'use client';

import { Act, Beat as BeatType } from '@prisma/client';
import { Menu, PlusCircle } from 'lucide-react';
import { useState } from 'react';
import { MutatorCallback } from 'swr';
import { deleteActAndBeats, updateAct } from '~/app/actions';
import Beat from '~/app/beatsheet/[id]/components/Beat';
import BeatForm from '~/app/beatsheet/[id]/components/BeatForm';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '~/components/ui/alert-dialog';
import { Button } from '~/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';
import { Input } from '~/components/ui/input';

export const DeleteActModal = ({
  open,
  onOpenChange,
  onSubmit,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: () => void;
}) => {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            Deleting this act will delete all the beats within it.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onSubmit}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default function Act({
  act,
  number,
  mutate,
}: {
  act: Act & { beats: BeatType[] };
  number: number;
  mutate: MutatorCallback;
}) {
  const [editActMode, setEditActMode] = useState(false);
  const [editBeatMode, setEditBeatMode] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [actDescription, setActDescription] = useState(act.description);

  const { description, beats } = act;

  const toggleEditActMode = () => {
    setEditActMode(!editActMode);
  };

  const toggleEditBeatMode = (manual?: boolean) => {
    manual !== undefined
      ? setEditBeatMode(manual)
      : setEditBeatMode(!editBeatMode);
  };

  const handleActDescriptionChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setActDescription(e.target.value);
  };

  const handleSaveAct = async () => {
    await updateAct(act.id, { description: actDescription });
    mutate();
  };

  const handleDeleteAct = async () => {
    await deleteActAndBeats(act.id);
    mutate();
  };

  return (
    <div className='p-5'>
      <div className='border-y-black border-y-2 font-bold flex justify-between items-center'>
        <span>
          {editActMode ? (
            <span className='flex'>
              <Input
                value={actDescription}
                onChange={handleActDescriptionChange}
              />
              <Button onClick={handleSaveAct}>Save</Button>
              <Button variant='ghost' onClick={toggleEditActMode}>
                Cancel
              </Button>
            </span>
          ) : (
            <>
              Act #{number}: {description}
            </>
          )}
        </span>

        <DeleteActModal
          open={showDeleteModal}
          onOpenChange={setShowDeleteModal}
          onSubmit={handleDeleteAct}
        />
        <span className='flex items-center'>
          <span
            className='flex p-4 cursor-pointer'
            onClick={() => toggleEditBeatMode(true)}
          >
            <PlusCircle className='mr-3' /> Add new beat
          </span>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Menu className='cursor-pointer' />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={toggleEditActMode}>
                Edit title
              </DropdownMenuItem>

              <DropdownMenuItem onClick={() => setShowDeleteModal(true)}>
                Delete act
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </span>
      </div>
      <div className='flex flex-wrap'>
        {!!beats &&
          beats.map((beat: BeatType) => (
            <div key={beat.id}>
              <Beat beat={beat} mutate={mutate} />
            </div>
          ))}
        <BeatForm
          actId={act.id}
          showForm={editBeatMode}
          setShowForm={setEditBeatMode}
          mutate={mutate}
        />
      </div>
    </div>
  );
}
