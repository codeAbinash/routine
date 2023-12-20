import { ChevronLeft } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Add() {
   const [title, setTitle] = useState('');
   const [content, setContent] = useState('');
   const [id, setId] = useState(0);
   const [notes, setNotes] = useState([]) as any;

   useEffect(() => {
      const notes = localStorage.getItem('notes');
      if (notes) {
         setNotes(JSON.parse(notes));
      }
   }, []);

   function AddNotes() {
      if (title === '' && content === '') {
         alert('Please add title or content');
         return;
      }

      const note = {
         title: title || 'Untitled',
         content,
         id: Date.now(),
      };

      const newNotes = [...notes, note];
      setNotes(newNotes);
      localStorage.setItem('notes', JSON.stringify(newNotes));
      window.history.back();
   }

   return (
      <div className='h-[100dvh] bg-white px-2 py-5 text-black dark:bg-black dark:text-white'>
         <div className='flex items-center justify-between'>
            <Link to='/notes'>
               <ChevronLeft size={38} />
            </Link>

            <div className='pr-5 text-2xl font-medium' onClick={() => AddNotes()}>
               Save
            </div>
         </div>

         <div className=' mt-12 '>
            <input
               type='text'
               name=''
               id=''
               className='w-full bg-transparent px-4 py-4 text-3xl font-semibold outline-none'
               placeholder='Title'
               value={title}
               onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
               placeholder='Note Something down'
               className='text-align-top h-[50dvh] w-full bg-transparent px-4 text-lg outline-none '
               value={content}
               onChange={(e) => setContent(e.target.value)}
            />
         </div>
      </div>
   );
}
