import React, { useMemo, useState } from 'react';
import BackHeader from '../../components/BackHeader';
import images from '../../assets/images/images';
import ls from '../../lib/storage';
import icons from '../../assets/icons/icons';
import TextEmoji from '../../components/TextEmoji';
import { BackupType } from './file';
import BottomModal, { BasicModal } from '../../components/BottomModal';
import { MODAL_BUTTON_TEXT } from '../../lib/lib';
import Emoji from 'emoji-store';
import { useNavigate } from 'react-router-dom';
function Restore() {
   const startedUsing = ls.get('startedUsing');
   return (
      <div className='restore screen dark:text-darkText'>
         {startedUsing ? <BackHeader title='Restore data' /> : null}
         <div
            className={`${startedUsing ? 'min-h-[85vh]' : 'min-h-[100vh]'} flex flex-col items-center
       justify-between gap-5 p-5`}
         >
            <p className='whitespace-pre text-balance text-center text-xl font-semibold'>
               Restore Your <br /> Backed up data <TextEmoji emoji='📂' />{' '}
            </p>
            <div>
               <img src={icons.restore_file} className='mx-auto w-[45%] drop-shadow-2xl' />
               <p className='text-secondary mt-5 text-balance px-[5%] text-center text-xs'>
                  Select a backup file that is previously backed up from this application. This will restore all your
                  data from that backup file.
               </p>
            </div>
            <div className='w-full'>
               <RestoreUi startedUsing={startedUsing} />
            </div>
         </div>
      </div>
   );
}

function restoredCountStatus(routineCount: number, subscriptionCount: number, notesCount: number) {
   if (routineCount === 0 && subscriptionCount === 0 && notesCount === 0)
      return 'No data restored, maybe you selected a wrong file?';
   if (routineCount === 0 && notesCount === 0) return `${subscriptionCount} subscriptions restored`;
   if (subscriptionCount === 0 && notesCount === 0) return `${routineCount} routines restored`;
   if (routineCount === 0 && subscriptionCount === 0) return `${notesCount} notes restored`;

   return `${routineCount} routines, ${notesCount} notes  and ${subscriptionCount} subscriptions restored`;
}

export function storeInLs(data: BackupType) {
   const routines = JSON.parse(ls.get('routines') || '[]');
   const subscriptions = JSON.parse(ls.get('subscriptions') || '{}');
   const notes = JSON.parse(ls.get('notes') || '[]');

   routines.unshift(...data.routines);
   // Add subscriptions key values to the existing subscriptions
   // For each key in data.subscriptions

   for (const key in data.subscriptions) subscriptions[key] = data.subscriptions[key];

   // Add notes
   notes.unshift(...data.notes);

   ls.set('routines', JSON.stringify(routines));
   ls.set('subscriptions', JSON.stringify(subscriptions));
   ls.set('notes', JSON.stringify(notes));

   const restoredRoutineCount = data.routines.length;
   const restoredSubscriptionCount = Object.keys(data.subscriptions).length;
   const restoredNotesCount = data.notes.length;
   const status = restoredCountStatus(restoredRoutineCount, restoredSubscriptionCount, restoredNotesCount);
   return { status, restoredRoutineCount, restoredSubscriptionCount, restoredNotesCount };
}

function RestoreUi({ startedUsing }: { startedUsing: string | null }) {
   const navigate = useNavigate();
   const [isSelectedFile, setIsSelectedFile] = React.useState(false);
   const fileInputRef = React.useRef<HTMLInputElement>(null);
   const [fileName, setFileName] = React.useState('No file selected');

   const [isRestoring, setIsRestoring] = useState(false);
   const [isRestored, setIsRestored] = useState(false);

   const [modalShow, setModalShow] = useState(false);
   const [modalBtnText, setModalBtnText] = useState(MODAL_BUTTON_TEXT);
   const [modalUi, setModalUi] = useState(<BasicModal text='THis is a sample error' />);
   const BLANK_MODAL_CB = useMemo(() => [() => setModalShow(false), () => setModalShow(false)], []);
   const [modalCallback, setModalCallback] = useState(BLANK_MODAL_CB);

   function handleClick() {
      fileInputRef.current?.click();
   }

   function restoreData() {
      const file = fileInputRef.current?.files?.[0];
      // Confirm modal
      setModalShow(true);
      setModalBtnText(['Cancel', 'Restore']);
      setModalCallback([
         () => setModalShow(false),
         () => {
            setIsRestoring(true);
            setModalShow(false);
            restore(file);
            ls.set('startedUsing', 'yes');
            setTimeout(() => {
               setIsRestoring(false);
               setIsRestored(true);
               if (!startedUsing) {
                  setTimeout(() => {
                     navigate('/', { replace: true });
                  }, 1000);
               }
            }, 1000);
         },
      ]);
      setModalUi(
         <BasicModal
            text='Restore from this file?'
            desc={
               !startedUsing
                  ? 'Are you sure you want to restore from this file? This will add new data from the file. Are you sure?'
                  : 'This will add new data. It may cause duplicate routines or subscriptions if you have already added some. Are you sure?'
            }
            emoji={'📁'}
         />,
      );
   }

   function restore(file: Blob | undefined) {
      try {
         if (file) {
            const reader = new FileReader();
            reader.readAsText(file, 'UTF-8');
            reader.onload = (evt) => {
               if (evt.target) {
                  const data = JSON.parse(evt.target.result as string);
                  storeInLs(data);
               }
            };
         } else {
            alert('Select a file to restore');
            setIsRestoring(false);
         }
      } catch (e) {
         alert('Something is wrong with the file you selected. Please select a valid file.');
         setIsRestoring(false);
      }
   }

   return (
      <div className='flex flex-col items-center justify-center gap-8 pt-3'>
         <BottomModal children={modalUi} show={modalShow} btnTxt={modalBtnText} cb={modalCallback} />

         {isRestoring ? (
            <div className='flex flex-col items-center gap-2'>
               <p className='text-balance text-center text-sm font-medium'>Restoring data...</p>
               <img src={Emoji.get('⌛')} className='mt-5 w-6 animate-bounce' />
            </div>
         ) : isRestored ? (
            <div className='flex flex-col items-center'>
               <p className='text-balance text-center text-sm font-medium'>Data restored successfully !</p>
               <p className='text-secondary mt-1 text-xs'>Now go back, check your routines!</p>
               <img src={Emoji.get('🤩')} className='mt-5 w-10' />
            </div>
         ) : (
            <>
               <input
                  type='file'
                  className='h-0 w-0'
                  ref={fileInputRef}
                  onChange={(e) => {
                     if (e.target.files) {
                        setFileName(e.target.files[0].name);
                        setIsSelectedFile(true);
                     }
                  }}
                  accept='application/JSON'
               />
               <div className='w-full'>
                  <div
                     className='tap99 flex w-full items-center gap-3 overflow-hidden rounded-xl border border-gray-300 bg-gray-50 text-xs font-medium dark:border-gray-600 dark:bg-dark'
                     onClick={handleClick}
                  >
                     <div className='whitespace-nowrap bg-gray-200 p-3.5 px-5 dark:bg-gray-700'>Select File</div>
                     <div className='line-clamp-1 break-all'>{fileName}</div>
                  </div>
                  {isSelectedFile ? null : (
                     <p className='mt-1 pl-1 text-xs text-gray-600 dark:text-gray-300' id='file_input_help'>
                        JSON file, that is previously backed up
                     </p>
                  )}
               </div>
               {isSelectedFile ? (
                  <button className='no-highlight tap99 rounded-xl bg-dark p-4 px-14 text-xs font-medium text-white'>
                     <span className='whitespace-pre' onClick={restoreData}>
                        Restore Now <TextEmoji emoji='📂' />
                     </span>
                  </button>
               ) : (
                  <p className='text-xs text-gray-600 dark:text-gray-300'>Select a file to restore</p>
               )}
            </>
         )}
      </div>
   );
}

export default Restore;
