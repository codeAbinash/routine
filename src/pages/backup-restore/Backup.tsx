import { useState } from 'react';
import images from '../../assets/images/images';
import BackHeader from '../../components/BackHeader';
import icons from '../../assets/icons/icons';
import ls from '../../lib/storage';
import TextEmoji from '../../components/TextEmoji';
import Loading from '../../components/loading/Loading';
import Emoji from 'emoji-store';
import { df } from '../../lib/delay';
import { BackupType } from './file';

function Backup() {
   return (
      <div className='backup screen dark:text-darkText'>
         <BackHeader title='Backup your data' />
         <div className='flex min-h-[80dvh] flex-col items-center justify-center gap-7 p-5'>
            <p className='whitespace-pre text-balance text-center text-xl font-semibold'>
               Backup your data <TextEmoji emoji='📂' />{' '}
            </p>
            <img src={icons.backup_folder} className='mx-auto w-[45%] drop-shadow-2xl' />
            <p className='text-secondary text-balance text-center text-xs'>
               You can backup your data by downloading a file. This file can be used to restore your data on another
               device. Or you can use it to restore your data if you reinstall the app.
            </p>
            <BackupUi />
         </div>
      </div>
   );
}
function BackupUi() {
   const [isBackingUp, setIsBackingUp] = useState(false);
   const [isBackedUp, setIsBackedUp] = useState(false);

   function backupBtnClick() {
      setIsBackingUp(true);
      setTimeout(() => {
         createBackup();
         setIsBackingUp(false);
         setIsBackedUp(true);
      }, 1000);
   }

   return (
      <>
         {/* <div className='animate-bounce-slow mt-10 mb-10 '><img src={icons.backup} alt="bag" className={`mx-auto mt-5 w-24 h-24`} /></div> */}
         <div className='flex h-20 items-center justify-center pt-10'>
            {isBackingUp ? (
               <div className='flex items-center justify-center font-medium text-accent'>
                  <img src={icons.spinner} className='h-10 w-10' />
                  <p className='text-md whitespace-pre text-balance pr-5 text-center'>
                     {' '}
                     Preparing Backup <TextEmoji emoji='📂' />
                  </p>
               </div>
            ) : isBackedUp ? (
               <div className='flex items-center justify-center gap-2'>
                  <p className='text-md whitespace-pre text-balance pr-5 text-center font-medium'>
                     Backup Complete <TextEmoji emoji='📂' />{' '}
                     <span className='text-sm'>
                        <TextEmoji emoji='✅' />
                     </span>{' '}
                  </p>
               </div>
            ) : (
               <button
                  className='no-highlight tap99 rounded-xl bg-dark p-4 px-14 text-xs font-medium text-white'
                  onClick={df(backupBtnClick)}
               >
                  <span className='whitespace-pre'>
                     Backup Now <TextEmoji emoji='📂' />
                  </span>
               </button>
            )}
         </div>
         <p className='mt-5 text-balance text-center text-xs text-grey'>
            This will download a backup file containing all your data.{' '}
         </p>
      </>
   );
}

function createBackup() {
   const routines = JSON.parse(ls.get('routines') || '[]');
   const subscriptions = JSON.parse(ls.get('subscriptions') || '[]');
   // const notes = JSON.parse(localStorage.getItem('notes') || '[]');
   const notes = JSON.parse(ls.get('notes') || '[]');

   console.log(notes);

   const backup: BackupType = {
      routines,
      subscriptions,
      notes,
   };
   // File name will be routines_backup_2021-09-18_12-00-00.json
   const fileName =
      'routines_backup_' +
      new Date().toISOString().split('T')[0] +
      '_' +
      new Date().toLocaleTimeString().split(' ')[0].split(':').join('-') +
      '.json';
   const dataStr = JSON.stringify(backup);
   const blob = new Blob([dataStr], { type: 'text/plain;charset=utf-8' });
   const url = window.URL.createObjectURL(blob);
   const a = document.createElement('a');
   a.href = url;

   a.download = fileName + '.json';
   a.click();
   a.remove();
   window.URL.revokeObjectURL(url);
}

export default Backup;
