'use client';
import { PlusCircle } from 'lucide-react';
import { useState } from 'react';
import { useSWRConfig } from 'swr';
import { createBeatSheet } from '~/app/actions';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';

export default function AddBeatSheet() {
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const { mutate } = useSWRConfig();

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleSubmit = async () => {
    await createBeatSheet(title);
    setShowForm(false);
    setTitle('');
    mutate('/api/beatsheets');
  };

  return (
    <div className='flex'>
      <div className='flex cursor-pointer' onClick={toggleForm}>
        {showForm ? null : (
          <>
            <PlusCircle className='mr-3' /> Add new beatsheet
          </>
        )}
      </div>

      {showForm && (
        <div>
          <div className='space-y-3'>
            New Beat Sheet Title:{' '}
            <Input value={title} onChange={handleTextChange} />
            <Button onClick={handleSubmit}>Save</Button>
            <Button variant='ghost' onClick={toggleForm}>
              Cancel
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
