import { useLoaderData, useLocation, useSubmit } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, ChevronLeft, Pencil, Trash2 } from 'lucide-react';

export default function Edit() {
   const { state } = useLocation();
   const [isEdited, setIsEdited] = useState(false);
   const [title, setTitle] = useState(state.title);
   const [content, setContent] = useState(state.content);
   const [id, setId] = useState(state.id);
   const [notes, setNotes] = useState([]) as any;
   const [delAlarm, setDelAlarm] = useState(false);
   const [delAlert, setDelAlert] = useState(false);
   const inputRef = useRef<HTMLTextAreaElement>(null);
   console.log(state);

   useEffect(() => {
      const notes = localStorage.getItem('notes');
      if (notes) {
         setNotes(JSON.parse(notes));
      }
   }, []);

   function delNote() {
      const temp = notes.filter((note: any) => note.id !== id);
      setNotes(temp);
      localStorage.setItem('notes', JSON.stringify(temp));
   }

   useEffect(() => {
      if (isEdited) {
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
      }
   }, [title, content]);

   return (
      <div className='bg-white text-black dark:bg-black dark:text-white'>
         <div className='h-[100dvh]  px-2 py-5 '>
            <div className='flex items-center justify-between'>
               <Link to='/notes'>
                  <ChevronLeft size={38} />
               </Link>

               <div className='flex gap-5 pr-5'>
                  {isEdited ? (
                     <Check
                        onClick={() => window.history.back()}
                        size={28}
                        strokeWidth={2.2}
                        className='text-blue-700'
                     />
                  ) : (
                     <Pencil
                        onClick={() => {
                           const textarea = inputRef.current;
                           if (textarea) {
                              textarea.focus();
                              textarea.setSelectionRange(textarea.value.length, textarea.value.length);
                           }
                        }}
                     />
                  )}
                  <Trash2 className='text-red-600' onClick={() => setDelAlert(true)} />
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
                  onChange={(e) => {
                     setTitle(e.target.value);
                     setIsEdited(true);
                  }}
               />
               <textarea
                  placeholder='Note Something down'
                  className='text-align-top h-[50dvh] w-full bg-transparent px-4 text-lg outline-none '
                  value={content}
                  onChange={(e) => {
                     setContent(e.target.value);
                     setIsEdited(true);
                  }}
                  ref={inputRef}
               />
            </div>
         </div>
         {delAlert ? (
            <>
               <div
                  className='fixed left-0 top-0 h-full w-full bg-transparent backdrop-blur-md'
                  onClick={() => {
                     setDelAlert(false);
                  }}
               ></div>
               <div className='fixed bottom-4 left-[4%] w-[92%] space-y-6 rounded-3xl border-2 border-white/5 bg-slate-950/50 object-none px-4 pb-4 pt-8 backdrop-blur-md '>
                  <div className='text-center text-xl font-semibold'>Do you want to delete this Note ?</div>
                  <div className='p-2 text-center text-sm opacity-50'>
                     This action cannot be undone. This will permanently delete. <thead></thead>
                  </div>
                  <div className='grid grid-cols-2 gap-5'>
                     <Button
                        text='No'
                        onClick={() => {
                           setDelAlert(false);
                        }}
                     />
                     <Button
                        text='Delete'
                        onClick={() => {
                           delNote();
                           window.history.back();
                        }}
                     />
                  </div>
               </div>
            </>
         ) : (
            <></>
         )}
      </div>
   );
}

function Button({
   text = 'Sample Button',
   onClick = () => {},
   color = 'bg-accent',
}: {
   text?: string;
   onClick?: any;
   color?: string;
}) {
   return (
      <button
         className='highlight-transparent tap99 w-full select-none rounded-xl bg-blue-600 p-4 text-sm font-medium text-white'
         onClick={onClick}
      >
         {text}
      </button>
   );
}
