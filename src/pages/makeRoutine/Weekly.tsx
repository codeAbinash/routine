import delay from '../../lib/delay';

import React, { useEffect, useRef, useState } from 'react';
import { Routine } from '../../lib/dateMethods';
import { vibrantColors7 } from '../../lib/lib';
const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function getAITime(isActiveRoutine: any, timeArr: any) {
   let generatedTime = [null, null];
   for (let i = 0; i < 7; i++) {
      if (isActiveRoutine[i]) {
         if (timeArr[i][0]) generatedTime[0] = timeArr[i][0];
         if (timeArr[i][1]) generatedTime[1] = timeArr[i][1];
      }
   }
   return generatedTime;
}

function getActiveRoutinesArr(routineTime: Routine['time']) {
   if (!routineTime) return [false, true, false, true, false, true, false];
   let isAllEmpty = true;
   const isActiveRoutine = [];
   const ifAllEmptyRoutine = [false, true, false, true, false, true, false];
   for (let i = 0; i <= 6; i++) {
      if (routineTime[i]) isAllEmpty = false;
      isActiveRoutine.push(routineTime[i] ? true : false);
   }
   if (isAllEmpty) return ifAllEmptyRoutine;
   return isActiveRoutine;
}

function getTimeArray(routineTime: Routine['time']) {
   const timeArr = [];
   for (let i = 0; i <= 6; i++) timeArr.push(routineTime[i] ? routineTime[i] : [null, null]);
   return timeArr;
}

function Weekly({
   routine,
   updateRoutine,
   edit = false,
}: {
   updateRoutine: Function;
   routine: Routine;
   edit: boolean;
}) {
   const [isActiveRoutine, setIsActiveRoutine] = useState([false, true, false, true, false, true, false]);
   // const [timeArr, setTimeArr] = useState([[null, null], [null, null], [null, null], [null, null], [null, null], [null, null], [null, null]])
   // const [isActiveRoutine, setIsActiveRoutine] = useState(getActiveRoutinesArr(routine.time))
   const [timeArr, setTimeArr] = useState([
      [null, null],
      [null, null],
      [null, null],
      [null, null],
      [null, null],
      [null, null],
      [null, null],
   ]);
   useEffect(() => {
      if (edit) {
         setIsActiveRoutine(getActiveRoutinesArr(routine.time));
         setTimeArr(getTimeArray(routine.time));
      }
   }, []);

   const times: any = {};

   function updateRoutineFromData() {
      // get generated AI times
      const [startTime, endTime] = getAITime(isActiveRoutine, timeArr);
      // If the routine is active set the time
      for (let i = 0; i < 7; i++) {
         if (isActiveRoutine[i]) times[i] = timeArr[i];
         else delete times[i];
         // if the day is selected and the time is not set then set the time to the generated AI time
         if (isActiveRoutine[i] && !timeArr[i][0] && !timeArr[i][1] && startTime && endTime) {
            times[i] = [startTime, endTime];
            timeArr[i] = [startTime, endTime];
         }
      }
      setTimeArr([...timeArr]);
      updateRoutine({ ...routine, time: times });
   }

   return (
      <div className='weeklyMakeRoutine mb-5'>
         <div className='top flex items-center gap-1'>
            <p className='text-secondary mt-2 w-1/3 pb-1 pl-1 text-center text-xs'>Routine Dates</p>
            <p className='text-secondary mt-2 w-1/3 pb-1 pl-1 text-center text-xs'>Start Time</p>
            <p className='text-secondary mt-2 w-1/3 pb-1 pl-1 text-center text-xs'>End Time</p>
         </div>
         <div className='mt-2 flex flex-col gap-3'>
            {days.map((day, i) => {
               return (
                  <div className='flex flex-row gap-3' key={i}>
                     <div
                        className={`tap97 dayName check ${
                           isActiveRoutine[i] ? 'checkDiv active' : 'bg-inputBg dark:bg-darkInputBg'
                        } flex-1 items-center justify-center rounded-xl px-4 py-3`}
                        style={
                           isActiveRoutine[i]
                              ? {
                                   backgroundColor: vibrantColors7[i],
                                   boxShadow: '1px 6px 10px 0' + vibrantColors7[i] + '66',
                                }
                              : {}
                        }
                        onClick={() => {
                           delay(() => {
                              isActiveRoutine[i] = !isActiveRoutine[i];
                              updateRoutineFromData();
                              setIsActiveRoutine([...isActiveRoutine]);
                           });
                        }}
                     >
                        <p className='text-center'>{day}</p>
                     </div>
                     <div
                        className={`timeInput flex flex-[3] gap-3 ${
                           isActiveRoutine[i] ? '' : 'opacity-40'
                        } trans-opacity`}
                     >
                        <input
                           type='time'
                           className='trans-opacity input-time-small tap rounded-xl bg-inputBg dark:bg-darkInputBg'
                           disabled={isActiveRoutine[i] ? false : true}
                           value={timeArr[i][0] || ''}
                           onInput={(e: any) => {
                              timeArr[i][0] = e.target.value;
                              updateRoutineFromData();
                           }}
                        />
                        <input
                           type='time'
                           value={timeArr[i][1] || ''}
                           className='trans-opacity input-time-small tap rounded-xl bg-inputBg dark:bg-darkInputBg'
                           disabled={isActiveRoutine[i] ? false : true}
                           onInput={(e: any) => {
                              timeArr[i][1] = e.target.value;
                              updateRoutineFromData();
                           }}
                        />
                     </div>
                  </div>
               );
            })}
         </div>
         <p className='text-secondary mt-5 text-center text-xs'>
            If it is an event, which is not in a range of time, specify only the{' '}
            <span className='test-medium'>Start Time</span>{' '}
         </p>
      </div>
   );
}

export default Weekly;
