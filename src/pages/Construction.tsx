import { useNavigate } from 'react-router-dom';
import delay from '../lib/delay';
import TextEmoji from '../components/TextEmoji';
import images from '../assets/images/images';

function Construction() {
   const navigate = useNavigate();
   return (
      <div className='flex h-[100dvh] select-none flex-col items-center justify-center gap-10 p-16 text-center dark:text-darkText'>
         <p className='text-2xl font-semibold'>
            This screen is under development <TextEmoji emoji='🧑🏻‍💻' />
         </p>
         <img src={images.undraw_feeling_proud_qne1} className='w-[100%]' />
         <p className='text-secondary text-sm'>Made by Abinash</p>
         <button
            onClick={() => {
               delay(() => navigate('/', { replace: true }));
            }}
            className='no-highlight tap99 w-full rounded-xl bg-dark p-4 text-sm text-white'
         >
            Go Homepage <TextEmoji emoji='🏠' />
         </button>
      </div>
   );
}

export default Construction;
