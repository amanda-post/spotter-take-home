'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Textarea } from '~/components/ui/textarea';

export default function Home() {
  const [beatSheetTitle, setBeatSheetTitle] = useState('');
  const [description, setDescription] = useState('');
  const [length, setLength] = useState('');
  const [cameraAngle, setCameraAngle] = useState('');

  const router = useRouter();

  return (
    <div className='p-10'>
      Add new beat:
      <div>
        Description: <Textarea />
        Length (seconds): <Input type='number' />
        Camera angle: <Textarea />
        <Button>Save</Button>
      </div>
    </div>
  );
}
