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

         <div className='mt-10 min-h-[60dvh] px-5'>
            <div className=' grid auto-cols-min grid-cols-2 gap-4  '>
               {notes.map((note: any) => {
                  return (
                     <div
                        key={note.id}
                        className='text-ellipsis rounded-2xl border border-black/5 bg-black/5 p-2.5 dark:border-white/5 dark:bg-white/5 '
                        onClick={() => navigate('/notes/Edit', { state: note })}
                     >
                        {getNote(note)}
                     </div>
                  );
               })}
            </div>
         </div>

         <FloatingButton link='/notes/add' bottom='bottom-[40px]' />
         <Watermark />
      </div>
   );
}

function getNote(note: any) {
   return (
      <div className='text-over h-20 overflow-hidden text-ellipsis'>
         <div className='pb-1 text-2xl font-semibold'>{note.title}</div>
         <div className='text-sm opacity-80'>{note.content}</div>
      </div>
   );
}

// return (
//    <div className='h-[100dvh] p-5 text-black dark:bg-black  dark:text-white'>
//       <div className='flex items-center justify-between px-5 py-2 '>
//          <div className='text-3xl font-bold text-blue-700'>Notes</div>
//          <div className='flex items-center gap-5'>
//             <Search onClick={() => setIsSearched(true)} />
//             <Settings
//                onClick={() => {
//                   localStorage.clear();
//                   setNotes([]);
//                }}
//             />
//          </div>
//       </div>

//       {isSearched ? (
//          <div>
//             <div className='mt-3 flex flex-grow items-center justify-between rounded-full bg-black/10 px-3 dark:bg-white/10'>
//                {' '}
//                <Search />
//                <input
//                   type='text'
//                   className='grow bg-transparent p-2.5 outline-none'
//                   value={search}
//                   onChange={(e) => setSearch(e.target.value)}
//                />
//                <X
//                   onClick={() => {
//                      setIsSearched(false);
//                      setSearch('');
//                   }}
//                />
//             </div>
//             <div className='mt-10 grid auto-cols-min grid-cols-2 gap-4'>
//                {searchedNotes.map((note: any) => {
//                   return (
//                      <div
//                         key={note.id}
//                         className='text-ellipsis rounded-2xl border border-black/5 bg-black/5 p-2.5 dark:border-white/5 dark:bg-white/5 '
//                         onClick={() => navigate('/notes/add', { state: note })}
//                      >
//                         {getNote(note)}
//                      </div>
//                   );
//                })}
//             </div>
//          </div>
//       ) : (
//          <div className='mt-10 grid auto-cols-min grid-cols-2 gap-4'>
//             {notes.map((note: any) => {
//                return (
//                   <div
//                      key={note.id}
//                      className='text-ellipsis rounded-2xl border border-black/5 bg-black/5 p-2.5 dark:border-white/5 dark:bg-white/5 '
//                      onClick={() => navigate('/notes/Edit', { state: note })}
//                   >
//                      {getNote(note)}
//                   </div>
//                );
//             })}
//          </div>
//       )}

//       {notes.length === 0 ? (
//          <div className='flex min-h-[80vh] flex-col items-center justify-center'>
//             <h2 className='text-3xl font-extrabold tracking-tight text-gray-900 sm:text-5xl sm:leading-none md:text-6xl'>
//                Quick<span className='text-indigo-600'>Note</span>
//             </h2>
//             <h3 className='text-md mt-1 md:text-3xl'>Coming Soon</h3>
//          </div>
//       ) : null}

//       <Link to='/notes/add'>
//          <div className='fixed bottom-5 right-5 rounded-full bg-blue-700 p-4'>
//             <Plus size={30} />
//          </div>
//       </Link>
//    </div>
// );
