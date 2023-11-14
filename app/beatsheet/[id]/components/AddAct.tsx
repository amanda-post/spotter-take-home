'use client';
import { MinusCircle, PlusCircle } from 'lucide-react';
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

  const handleSubmit = () => {
    createAct(beatSheetId, { description });
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
            <PlusCircle /> Add new act
          </>
        )}
      </div>

      {showForm && (
        <div>
          <div>
            Description:{' '}
            <Input value={description} onChange={handleTextChange} />
            <Button onClick={handleSubmit}>Save</Button>
          </div>
        </div>
      )}
    </div>
  );
}
