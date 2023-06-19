import React, { useEffect } from 'react'
import { capitalize } from '../../lib/lib'

function Calendar({ updateRoutine, type }: { updateRoutine: Function, type : string }) {
   const [startTime, setStartTime] = React.useState('')
   useEffect(() => {
      const routine = { time: [startTime] }
      console.log(routine)
      updateRoutine(routine)
   }, [startTime])

   return (
      <div className="dailyMakeRoutine">
         {/* <p className="text-xs text-secondary pl-1 pb-1 mt-2">Select Routine Times</p> */}
         <div className="flex flex-col gap-1">
            <div className="top flex items-center gap-3">
               <p className='w-[50%] text-xs text-secondary pl-1 pb-1 mt-2'>{capitalize(type)} Date</p>
               {/* <p className='w-[50%] text-xs text-secondary pl-1 p  b-1 mt-2'>End Time</p> */}
            </div>
            <div className="bottom items-center flex gap-3">
               <input
                  type="date" onInput={(e: any) => setStartTime(e.target.value)}
                  className="input-time-small input-text bg-inputBg dark:bg-darkInputBg tap- rounded-xl"
               />
               {/* <input
                  type="time" onInput={(e: any) => setEndTime(e.target.value)}
                  className="input-time-small input-text bg-inputBg dark:bg-darkInputBg tap rounded-xl"
               /> */}
            </div>
         </div>
      </div>
   )
}

export default Calendar