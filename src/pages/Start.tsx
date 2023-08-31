import Emoji from 'emoji-store';
import { Link, useNavigate } from 'react-router-dom';
import images from '../assets/images/images';
import TextEmoji from '../components/TextEmoji';
export default function Start() {
   const navigate = useNavigate();
   return (
      <div className='start-screen flex min-h-[100dvh] flex-col  justify-between gap-5 p-5 dark:text-darkText'>
         <div className=''></div>
         <h1 className='text-center text-[2.1rem] font-bold text-dark dark:text-darkText'>
            Organize your life <br /> with <span className='text-accent'>Routine</span>! <br />
            <TextEmoji emoji='😉' />{' '}
         </h1>
         <img src={images.undraw_reading_time_re_phf7} className='w-full' />
         <p className='px-4 text-center text-sm font-[450]'>Routine helps you to store and manage your routines.</p>
         <img src='icons/reset.svg' className='h-0 w-0' />
         <div className='btnWrapper'>
            <button
               onClick={() => navigate('/restoreStartup', { replace: true })}
               className='no-highlight dark: mx-auto block w-full select-none rounded-2xl bg-dark p-[1.4em] text-sm text-white duration-150 active:scale-[0.98]'
            >
               Continue
            </button>
            <p className='pt-2 text-center text-xs font-[450] text-black/60 dark:text-darkText/50'>
               Read{' '}
               <Link to='' className='text-link'>
                  Terms and Conditions
               </Link>{' '}
               before continuing.
            </p>
         </div>
      </div>
   );
}
