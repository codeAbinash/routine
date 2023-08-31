import { useEffect, useState } from 'react';
import TextEmoji from '../../components/TextEmoji';
import { Routine, SplittedTime, timeSplitter } from '../../lib/dateMethods';

const TOTAL_MIN_IN_DAY = 1440;

function totalMins(time: SplittedTime) {
   if (!time) return 0;
   return time.hour * 60 + time.minute;
}

function addZero(n: number) {
   if (n < 10) return '0' + n;
   return n;
}

function hour12(hour: number) {
   if (hour > 12) return hour - 12;
   else if (hour == 0) return 12;
   return hour;
}

function timeAmPm(time: SplittedTime) {
   if (!time) return '';
   return `${hour12(time.hour)}:${addZero(time.minute)} ${time.hour < 12 ? 'AM' : 'PM'}`;
}

function getVisibleColor(midpoint: number) {
   if (midpoint < 25) return '#ffffff88';
   else if (midpoint < 65) return '#00000055';
   else return '#ffffff88';
}

export default function Daily({ routine }: { routine: Routine }) {
   const startTime = timeSplitter(routine.time[0]);
   const endTime = timeSplitter(routine.time[1]);
   const duration = totalMins(endTime) - totalMins(startTime);
   const left = (totalMins(startTime) / TOTAL_MIN_IN_DAY) * 100;
   const percentage = (duration / TOTAL_MIN_IN_DAY) * 100;

   return (
      <div className='daily'>
         <h1 className='mb-5 text-center text-7xl'>
            <TextEmoji emoji={routine.emoji} />
         </h1>
         <div className=' mb-4 mt-8'>
            <div className='day-gradient mb-3 h-7 w-full rounded-lg p-1'>
               <div
                  className='tap95 h-5 rounded-md pt-2'
                  style={{
                     width: percentage + '%',
                     marginLeft: left + '%',
                     backgroundColor: getVisibleColor(left),
                  }}
               ></div>
            </div>
            <div>
               <p className='mt-2 text-center text-xs text-dark/70 dark:text-darkText/70'>
                  {timeAmPm(startTime)} - {timeAmPm(endTime)} Daily
               </p>
            </div>
         </div>
      </div>
   );
}
