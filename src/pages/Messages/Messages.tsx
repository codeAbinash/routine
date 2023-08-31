import images from '../../assets/images/images';
import BackHeader from '../../components/BackHeader';
import NavBar from '../../components/NavBar';
import TextEmoji from '../../components/TextEmoji';

export default function Messages() {
   return (
      <div className='min-h-[100dvh] items-center text-dark dark:text-darkText'>
         <BackHeader title='Messages' />
         <div className='flex min-h-[85vh] flex-col items-center justify-center'>
            <div className='min-h[85vh] bg-red flex w-full flex-col justify-center gap-[5vh]'>
               <p className='text-center text-2xl font-semibold'>
                  Connect <TextEmoji emoji='💬' /> with your <br /> friends anytime
               </p>
               <img src={images.messages} className='mx-auto w-[70%] dark:invert' />

               {/* <p className="text-lg text-center font-medium">Coming Soon</p> */}

               <div className='no-highlight tap99 mx-auto flex flex-col items-center justify-center'>
                  <button className='w-full rounded-[0.65rem] bg-dark p-3.5 px-10 text-xs font-medium text-white'>
                     Login / Sign Up
                  </button>
               </div>
            </div>
            <p className='mt-5 text-center text-sm'>
               This Feature is under development. <br />
            </p>
         </div>
      </div>
   );
}
