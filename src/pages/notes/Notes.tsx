import { Camera, Search, Settings, Plus, Divide, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import FloatingButton from '../../components/FloatingButton';
import Watermark from '../../components/Watermark';

export default function Home() {
   const [notes, setNotes] = useState([]) as any;
   const navigate = useNavigate();
   const [isSearched, setIsSearched] = useState(false);
   const [search, setSearch] = useState('');
   const [searchedNotes, setSearchedNotes] = useState([]) as any;

   useEffect(() => {
      const notes = localStorage.getItem('notes');
      if (notes) {
         setNotes(JSON.parse(notes).reverse());
      }
   }, []);

   useEffect(() => {
      if (search === '') return setSearchedNotes(notes);
      const temp = notes.filter((note: any) => note.title.includes(search) || note.content.includes(search));
      setSearchedNotes(temp);
   }, [search]);
   console.log(searchedNotes);

   return (
      <div className='home-screen screen-navbar select-none dark:bg-black dark:text-darkText'>
         <div className='scrollToTop'></div>
         <Header
            title={<span>Notes</span>}
            placeholder='Search Notes'
            search={search}
            onSearch={(e: any) => {
               setSearch(e.target.value);
            }}
         />

         <div className=' min-h-[60dvh] px-7'>
            {search.length === 0 ? showNotes(notes, navigate) : showNotes(searchedNotes, navigate)}
         </div>

         <FloatingButton link='/notes/add' bottom='bottom-[40px]' />
         <Watermark />
      </div>
   );
}

function showNotes(notes: any, navigate: any) {
   return (
      <div className='mt-8 grid auto-cols-min grid-cols-2 gap-4'>
         {notes.map((note: any) => {
            return (
               <div
                  key={note.id}
                  className='text-ellipsis rounded-2xl border border-black/5 bg-black/5 p-2.5 dark:border-white/5 dark:bg-white/5 '
                  onClick={() => navigate('/notes/edit', { state: note })}
               >
                  {getNote(note)}
               </div>
            );
         })}
      </div>
   );
}

function getNote(note: any) {
   return (
      <div className='text-over h-20 overflow-hidden text-ellipsis py-1.5'>
         <div className='pb-1 text-2xl font-semibold'>{note.title}</div>
         <div className='text-sm opacity-60'>{note.content}</div>
      </div>
   );
}
