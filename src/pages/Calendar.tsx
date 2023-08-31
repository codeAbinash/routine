import React, { useEffect, useRef, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import icons from '../assets/icons/icons';
import FloatingButton from '../components/FloatingButton';
import NavBar from '../components/NavBar';
import { getEmojiByDay, getMonthYear } from '../lib/date';
import searchByDate, { searchActiveRoutine } from '../lib/dateMethods';
import delay from '../lib/delay';
import ls from '../lib/storage';
import { GetRoutines } from './NewRoutinesLoader';
import { Routine } from '../lib/dateMethods';
import { getFormattedDate, getDay } from '../lib/date';
import headerIntersect from '../lib/headerIntersect';
import Watermark from '../components/Watermark';
import TextEmoji from '../components/TextEmoji';

function willShowDot(routines: Array<Routine>) {
   const dotStatus = [false, false];
   for (let i = 0; i < routines.length; i++) {
      if (routines[i].type === 'holiday') dotStatus[0] = true;
      else if (routines[i].type === 'calendar') dotStatus[1] = true;
   }
   return dotStatus;
}

function ActiveDots({ isSameDate, date, routines }: { isSameDate: boolean; date: Date; routines: Array<Routine> }) {
   const routinesF = useMemo(() => searchByDate(date, routines), [date]);
   const dotStatus = useMemo(() => willShowDot(routinesF), [routinesF]);
   return (
      <>
         {dotStatus[0] && (
            <div className={`aspect-square w-[0.3em] ${isSameDate ? 'bg-white' : 'bg-red-500'} rounded-full`}></div>
         )}
         {dotStatus[1] && (
            <div className={`aspect-square w-[0.3em] ${isSameDate ? 'bg-white' : 'bg-accent'} rounded-full`}></div>
         )}
      </>
   );
}

function getRoutinesFromLsWithIndex() {
   const lsRoutines = JSON.parse(ls.get('routines') || '[]');
   lsRoutines.forEach((routine: Routine, index: number) => {
      routine.index = index;
   });
   return lsRoutines;
}

function getRoutinesWithActiveStatus(routineDate: Date, routines: Routine[]) {
   const routinesOfTheDay = searchByDate(routineDate, routines);
   searchActiveRoutine(routinesOfTheDay);
   return routinesOfTheDay;
}

function Calendar() {
   const navigate = useNavigate();
   const now = new Date();
   const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
   const [isIntersecting, setIsIntersecting] = React.useState(true);
   const [calenderDays, setCalendarDays] = useState([...getCalendarArray(now)]);
   const [currentDate, setCurrentDate] = React.useState(now.getDate());
   const [currentMonth, setCurrentMonth] = React.useState(now.getMonth());
   const [currentYear, setCurrentYear] = React.useState(now.getFullYear());
   const [date, setDate] = React.useState(new Date(currentYear, currentMonth, currentDate));
   const [routineDate, setRoutineDate] = useState(now);
   const routines = useMemo(() => getRoutinesFromLsWithIndex(), [routineDate]);
   const routinesOfTheDay = useMemo(() => getRoutinesWithActiveStatus(routineDate, routines), [routineDate]);
   const topElement = useRef<HTMLDivElement>(null);

   function scrollToTop() {
      if (topElement.current) topElement.current.scrollIntoView({ behavior: 'smooth' });
   }

   useEffect(() => {
      scrollToTop();
      headerIntersect(topElement.current as Element, setIsIntersecting);
   }, []);

   function getMonthYear(date: Date) {
      const year = date.getFullYear();
      const month = date.toLocaleString('default', { month: 'short' });
      return (
         <>
            {month}{' '}
            <small>
               {year} <TextEmoji emoji='🗓️' />
            </small>
         </>
      );
   }

   return (
      <div className='screen screen dark:text-darkText'>
         <div className='scrollToTop' ref={topElement}></div>
         <div className='topArea'>
            <header
               className={`${isIntersecting ? '' : 'shadow-sm dark:shadow-white/10'} fixed top-0 z-50 flex w-full
         flex-row items-center justify-between bg-white/70 p-4 py-2.5 backdrop-blur-md transition dark:bg-black/60
         `}
            >
               <div
                  onClick={() => {
                     let date = new Date(currentYear, currentMonth - 1, currentDate);
                     handleDateClick(date);
                  }}
                  className='left'
               >
                  <img
                     src={icons.left_arrow}
                     className='tap aspect-square w-[2.3rem] rounded-xl bg-white/50 p-2.5 pl-2 opacity-80 active:bg-inputBg dark:invert'
                  />
               </div>
               <div className='middle flex items-center justify-center gap-2'>
                  <p className='font-medium'>{getMonthYear(date)}</p>
                  {!isSameMonth(now, date) && (
                     <div
                        className='tap active rounded-full bg-accent px-3 py-1 text-[0.6rem] text-white shadow-lg shadow-accent/50'
                        onClick={() =>
                           delay(() => {
                              handleDateClick(now);
                              setRoutineDate(now);
                              scrollToTop();
                           }, 60)
                        }
                     >
                        Now
                     </div>
                  )}
               </div>
               <div
                  className='right'
                  onClick={() => {
                     let date = new Date(currentYear, currentMonth + 1, currentDate);
                     handleDateClick(date);
                  }}
               >
                  <img
                     src={icons.left_arrow}
                     className='tap aspect-square w-[2.3rem] rotate-180 rounded-xl bg-white/50 p-2.5 pl-2 opacity-80 active:bg-inputBg dark:invert'
                  />
               </div>
            </header>
            <div className='calendar p-5 pb-0 pt-20'>
               <div className='calenderDayHeadings flex w-full'>
                  {days.map((day, index) => {
                     let isWeekEnd = index % 6 === 0;
                     return (
                        <div className='day w-[calc(100%/7)]' key={index}>
                           <p
                              className={`text-center text-[0.65rem] font-medium text-grey ${
                                 isWeekEnd ? 'opacity-60' : ''
                              }`}
                           >
                              {day}
                           </p>
                        </div>
                     );
                  })}
               </div>
               <div className='calenderDays mt-4'>
                  {calenderDays.map((week: [number], i: number) => {
                     const date = new Date(currentYear, currentMonth, i);
                     return (
                        <div className='week flex w-full' key={i}>
                           {week.map((day: number, j: number) => {
                              let isWeekEnd = j % 6 === 0;
                              if (day !== 0) {
                                 date.setDate(day);
                                 const isSameDate = checkIfSameDate(now, date);
                                 return (
                                    <div
                                       className={`day tap97 calenderDate flex aspect-square flex-1 items-center justify-center`}
                                       key={j}
                                    >
                                       <div
                                          className={`contain flex aspect-square w-[75%] items-center justify-center rounded-xl border-transparent transition
                              ${isSameDate ? 'active bg-accent text-white shadow-xl shadow-accent/50' : ''}
                              hover:border-2 hover:border-accent`}
                                          onClick={() => {
                                             const date = new Date(currentYear, currentMonth, day);
                                             setRoutineDate(date);
                                          }}
                                       >
                                          <p
                                             className={`aspect-square p-2 pb-2.5 text-center text-[0.7rem] font-medium ${
                                                isWeekEnd ? 'opacity-60' : ''
                                             }  
                                  ${isSameDate ? 'text-white' : ''}`}
                                          >
                                             {day}
                                          </p>

                                          <div className='dots absolute mt-[1.2rem] flex gap-1'>
                                             <ActiveDots
                                                routines={routines}
                                                isSameDate={isSameDate}
                                                date={new Date(currentYear, currentMonth, day)}
                                             />
                                          </div>
                                       </div>
                                    </div>
                                 );
                              } else
                                 return (
                                    <div className='day flex-1 select-none opacity-0' key={j}>
                                       <p className='text-secondary text-center text-xs'>X</p>
                                    </div>
                                 );
                           })}
                        </div>
                     );
                  })}
               </div>
            </div>
         </div>
         <div className='events'>
            <p className='my-5 text-center text-xs font-medium text-[#777]/50'>
               Routines for {getFormattedDate(routineDate)}, {getDay(routineDate)}{' '}
               <TextEmoji emoji={getEmojiByDay(routineDate)} />
            </p>
            <div className='routines flex flex-col gap-3 p-4'>
               <GetRoutines screenRoutines={routinesOfTheDay} allRoutines={routines} />
            </div>
         </div>
         <div className='pb-20'>
            <Watermark />
         </div>
         <FloatingButton />
         <NavBar active='Calendar' />
      </div>
   );
   function handleDateClick(date: Date) {
      setCurrentDate(date.getDate());
      setCurrentMonth(date.getMonth());
      setCurrentYear(date.getFullYear());
      setDate(date);
      setCalendarDays([...getCalendarArray(date)]);
   }
}

function getCalendarArray(date: Date) {
   const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
   const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
   const calenderDays: any = [];

   let day = 1;
   for (let i = 0; i < 6; i++) {
      calenderDays.push([]);
      for (let j = 0; j < 7; j++) {
         let currentDay = i * 7 + j;
         if (currentDay >= firstDay && currentDay < lastDay + firstDay) {
            calenderDays[i].push(day);
            day++;
         } else calenderDays[i].push(0);
      }
   }
   return calenderDays;
}

function checkIfSameDate(date1: Date, date2: Date) {
   return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
   );
}

function isSameMonth(date1: Date, date2: Date) {
   return date1.getMonth() === date2.getMonth() && date1.getFullYear() === date2.getFullYear();
}

export default Calendar;
