import Emoji from 'emoji-store';
import { getDay } from '../../lib/date';
import { Routine } from '../../lib/dateMethods';

export default function Calendar({ routine }: { routine: Routine }) {
   const time = new Date(routine.time[0]);
   return (
      <div>
         <div className='mb-10 flex items-center justify-center gap-[6%]'>
            <div
               className={`calendar-shadow skew-transition shine-effect flex aspect-square w-[45%] flex-col
         justify-between rounded-3xl bg-white p-5 transition-all duration-500
         active:rotate-2 active:skew-x-2 active:skew-y-2 dark:bg-black`}
            >
               <p className='text-center text-sm font-medium text-red-500'>{getDay(time)}</p>
               <p className='text-center text-6xl font-medium'>{time.getDate()}</p>
               <p className='text-secondary text-center text-xs font-medium'>
                  {time.toLocaleString('default', { month: 'long', year: 'numeric' })}
               </p>
            </div>
            <div
               className={`calendar-shadow skew-transition shine-effect grid aspect-square w-[45%] flex-col
         justify-between rounded-3xl bg-white p-[12%] transition-all duration-500
         active:rotate-2 active:skew-x-2 active:skew-y-2 dark:bg-black`}
            >
               <img src={Emoji.get(routine.emoji)} className=' place-1-1 opacity-50 blur-lg' />
               <img src={Emoji.get(routine.emoji)} className=' place-1-1 z-10' />
            </div>
         </div>
      </div>
   );
}
