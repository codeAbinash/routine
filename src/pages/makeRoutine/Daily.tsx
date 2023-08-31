import React, { useEffect } from 'react';
import { Routine } from '../../lib/dateMethods';

function Daily({ updateRoutine, routine }: { updateRoutine: Function; routine: Routine }) {
   const [startTime, setStartTime] = React.useState(routine?.time[0] || '');
   const [endTime, setEndTime] = React.useState(routine?.time[1] || '');
   useEffect(() => {
      const routine = { time: [startTime, endTime] };
      updateRoutine(routine);
   }, [startTime, endTime]);

   return (
      <div className='dailyMakeRoutine'>
         {/* <p className="text-xs text-secondary pl-1 pb-1 mt-2">Select Routine Times</p> */}
         <div className='flex flex-col gap-1'>
            <div className='top flex items-center gap-3'>
               <p className='text-secondary mt-2 w-[50%] pb-1 pl-1 text-xs'>Start Time</p>
               <p className='text-secondary mt-2 w-[50%] pb-1 pl-1 text-xs'>End Time</p>
            </div>
            <div className='bottom flex items-center gap-3'>
               <input
                  value={startTime}
                  type='time'
                  onInput={(e: any) => setStartTime(e.target.value)}
                  className='input-time-small input-text tap rounded-xl bg-inputBg dark:bg-darkInputBg'
               />
               <input
                  value={endTime}
                  type='time'
                  onInput={(e: any) => setEndTime(e.target.value)}
                  className='input-time-small input-text tap rounded-xl bg-inputBg dark:bg-darkInputBg'
               />
            </div>
         </div>
      </div>
   );
}

export default Daily;
