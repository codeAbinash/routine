import { ChevronLeft } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Add() {
   const [title, setTitle] = useState('');
   const [content, setContent] = useState('');
   const [id, setId] = useState(Date.now());
   const [notes, setNotes] = useState([]) as any;
   const inputRef = useRef<HTMLTextAreaElement>(null);

   useEffect(() => {
      const notes = localStorage.getItem('notes');
      if (notes) {
         setNotes(JSON.parse(notes));
      }
   }, []);

   useEffect(() => {
      if (title === '' && content === '') {
         setNotes((prevNotes: any) => {
            const newNotes = prevNotes.filter((n: any) => n.id !== id);
            localStorage.setItem('notes', JSON.stringify(newNotes));
            return newNotes;
         });
      } else if (title !== '' || content !== '') {
         const note = {
            title,
            content,
            id,
         };
         if (title === '') note.title = 'Untitled';
         setNotes((prevNotes: any) => {
            const newNotes = prevNotes.filter((n: any) => n.id !== note.id);
            newNotes.push(note);
            localStorage.setItem('notes', JSON.stringify(newNotes));
            return newNotes;
         });
      }
   }, [title, content]);

   useEffect(() => {
      inputRef.current?.focus();
   }, []);

   return (
      <div className='h-[100dvh] bg-white px-2 py-5 text-black dark:bg-black dark:text-white'>
         <div className='flex items-center justify-between'>
            <Link to='/notes'>
               <ChevronLeft size={38} />
            </Link>

            <div className='pr-5 text-2xl font-medium' onClick={() => window.history.back()}>
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
               ref={inputRef}
            />
         </div>
      </div>
   );
}
