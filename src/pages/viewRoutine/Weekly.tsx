import React from 'react';
import { Routine } from '../../lib/dateMethods';
import { vibrantColors7 } from '../../lib/lib';
const routineDays = [0, 1, 2, 3, 4, 5, 6];
const routineDaysName = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function Weekly({ routine }: { routine: Routine }) {
   const routineTime = routine.time;

   return (
      <div className='mb-8 mt-4'>
         {/* <p className='text-xs text-grey mb-3'>Routine Days </p> */}
         <div className='flex items-center justify-between gap-2'>
            {routineDays.map((day, index) => {
               // if (routineTime[index])
               return (
                  <div className='flex w-full flex-col items-center justify-center gap-1' key={index}>
                     <div
                        className={`tap97 box relative flex h-40 w-[100%] items-center justify-center rounded-2xl ${
                           routineTime[index] ? 'opacity-1' : 'bg-inputBg dark:bg-darkInputBg'
                        }`}
                        style={
                           routineTime[index]
                              ? {
                                   backgroundColor: vibrantColors7[index],
                                   boxShadow: '1px 6px 10px 0' + vibrantColors7[index] + '66',
                                }
                              : {}
                        }
                     >
                        {routineTime[index] && (
                           <p className='absolute rotate-90 whitespace-nowrap text-[0.7rem] text-white/90'>
                              {getSingleOrDoubleTime(routineTime[index])}
                           </p>
                        )}
                     </div>
                     <div className='day mt-3'>
                        <p className='text-center text-xs text-grey'>{routineDaysName[index]}</p>
                     </div>
                  </div>
               );
            })}
         </div>
      </div>
   );
}

function getSingleOrDoubleTime(time: [string, string]) {
   let timeStr = '';
   if (time[0]) {
      timeStr += getTimeAmPm(time[0]);
      if (time[1]) timeStr += ` - ${getTimeAmPm(time[1])}`;
   }
   return timeStr;
}

function addZero(num: number) {
   return num < 10 ? `0${num}` : num;
}

function getTimeAmPm(timeStr: string) {
   if (!timeStr) return '';
   const time = timeStr.split(':');
   const hour = parseInt(time[0]);
   const min = parseInt(time[1]);
   const amPm = hour > 12 ? 'PM' : 'AM';
   const hour12 = hour > 12 ? hour - 12 : hour;
   return `${addZero(hour12)}:${addZero(min)} ${amPm}`;
}

function makeRoutineGraph() {}

export default Weekly;
