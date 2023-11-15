'use client';
import { PlusCircle } from 'lucide-react';
import { useState } from 'react';
import { createAct } from '~/app/actions';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';

export default function AddAct({ beatSheetId }: { beatSheetId: string }) {
  const [showForm, setShowForm] = useState(false);
  const [description, setDescription] = useState('');

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const handleSubmit = async () => {
    await createAct(beatSheetId, { description });
    setDescription('');
    setShowForm(false);
  };

  return (
    <div className='p-4 flex flex-col w-1/2'>
      <div className='cursor-pointer' onClick={toggleForm}>
        {showForm ? null : (
          <span className='font-bold text-lg flex'>
            <PlusCircle className='mr-3' /> Add new act
          </span>
        )}
      </div>

      {showForm && (
        <div>
          <div className='space-y-4'>
            <p>Act Description: </p>
            <Input value={description} onChange={handleTextChange} />
            <Button onClick={handleSubmit} disabled={!description}>
              Save
            </Button>
            <Button variant='ghost' onClick={toggleForm}>
              Cancel
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
