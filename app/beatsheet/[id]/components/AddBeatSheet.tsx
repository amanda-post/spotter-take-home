'use client';
import { MinusCircle, PlusCircle } from 'lucide-react';
import { useState } from 'react';
import { createBeatSheet } from '~/app/actions';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';

export default function AddBeatSheet() {
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleSubmit = () => {
    createBeatSheet(title);
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
            <PlusCircle /> Add new beatsheet
          </>
        )}
      </div>

      {showForm && (
        <div>
          <div>
            Title: <Input value={title} onChange={handleTextChange} />
            <Button onClick={handleSubmit}>Save</Button>
          </div>
        </div>
      )}
    </div>
  );
}
