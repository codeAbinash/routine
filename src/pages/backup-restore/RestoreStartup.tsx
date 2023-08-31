import { useNavigate } from 'react-router-dom';
import icons from '../../assets/icons/icons';
import TextEmoji from '../../components/TextEmoji';
import ls from '../../lib/storage';

export default function RestoreStartup() {
   const navigate = useNavigate();

   return (
      <div className='screen flex flex-col items-center justify-between gap-10 bg-white p-4 py-12 text-dark dark:bg-black dark:text-darkText'>
         <div className='flex flex-col items-center justify-center gap-4'>
            <p className='text-center text-3xl font-semibold'>Restore Backup ?</p>
            <div className='text-4xl'>
               <TextEmoji emoji='📂' /> <TextEmoji emoji='🤔' />
            </div>
         </div>

         <p className='text-secondary text-balance text-center text-xs'>
            If you backed your data previously. Click on Restore Backup button.
         </p>

         <div className='flex w-full items-center justify-center gap-[10%]'>
            <img src={icons.restore_file} className='w-[35%]' />
            <img src={icons.backup_folder} className='w-[35%]' />
         </div>

         <div className='flex flex-col gap-2'>
            <p className='text-balance text-center text-xs text-gray-500 dark:text-gray-400'>
               You can restore your backup <TextEmoji emoji='📂' /> from your device storage <TextEmoji emoji='😯' />.
               Just select the file <TextEmoji emoji='📂' /> in the next screen <TextEmoji emoji='📱' />.{' '}
            </p>
         </div>

         <div className='flex w-full flex-col items-center justify-center gap-3 text-sm font-medium'>
            <button
               className='highlight-none w-[80%] rounded-xl bg-accent p-4 px-10 text-xs text-white'
               onClick={() => {
                  navigate('/restore', { replace: true });
               }}
            >
               Restore Backup
            </button>
            <button
               className='highlight-none w-[80%] rounded-xl bg-dark p-4 px-10 text-xs text-white'
               onClick={() => {
                  navigate('/applyRoutine', { replace: true });
               }}
            >
               Skip
            </button>
         </div>
      </div>
   );
}
