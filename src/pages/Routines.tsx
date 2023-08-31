import Emoji from 'emoji-store';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FloatingButton from '../components/FloatingButton';
import Header from '../components/Header';
import Loading from '../components/loading/Loading';
import NavBar from '../components/NavBar';
import TextEmoji from '../components/TextEmoji';
import Watermark from '../components/Watermark';
import { getFormattedDate } from '../lib/date';
import { Routine, TypedList, TypedTypes } from '../lib/dateMethods';
import delay, { df } from '../lib/delay';
import { capitalize, debounce, randomString, vibrantColors7 } from '../lib/lib';
import ls from '../lib/storage';
import RoutineView from './viewRoutine/RoutineView';
import LoadingRoutines from '../components/loading/LoadingRoutines';
import icons from '../assets/icons/icons';

export function searchRoutine(routines: Routine[], query: string) {
   // Return filtered routines
   if (!query) return routines;
   return routines.filter((routine: Routine) => {
      return routine.name.toLowerCase().includes(query) || routine.description?.toLowerCase().includes(query);
      // || routine.sub?.toLowerCase().includes(query)
      // || routine.type.toLowerCase().includes(query)
      // || routine.emoji.toLowerCase().includes(query)
   });
   // return typedList
}

function getTypedRoutines(routines: Array<Routine>, oldRoutines: Array<Routine>) {
   // Routines 0,
   // Holiday 1
   // Calendar 2
   const routineList: TypedList = {
      routines: [],
      holiday: [],
      calendar: [],
      all: routines,
      weekly: [],
      expired: oldRoutines,
   };
   let i,
      len = routines.length;

   for (i = 0; i < len; i++) {
      routines[i].index = i;
      if (routines[i].type === 'calendar') routineList.calendar.push(routines[i]);
      else if (routines[i].type === 'holiday') routineList.holiday.push(routines[i]);
      else if (routines[i].type === 'weekly') {
         routineList.weekly.push(routines[i]);
         routineList.routines.push(routines[i]);
      } else routineList.routines.push(routines[i]);
   }

   return routineList;
}

function getExpiredRoutines() {
   const routines = JSON.parse(ls.get('expiredRoutines') || '[]');
   // Set index
   return routines.map((routine: Routine, index: number) => {
      routine.index = index;
      routine.expired = true;
      return routine;
   });
}

function Routines() {
   const allRoutines = useMemo(() => JSON.parse(ls.get('routines') || '[]'), []);
   const expiredRoutines = useMemo(() => getExpiredRoutines(), []);
   const typedList = useMemo(() => getTypedRoutines(allRoutines, expiredRoutines), [allRoutines, expiredRoutines]);
   const [currentSelectedType, setCurrentSelectedType] = useState<TypedTypes>('routines');
   const [screenRoutines, uScreenRoutines] = useState<Routine[] | null>(null);
   const topElement = useRef<HTMLDivElement>(null);

   const navigate = useNavigate();
   useEffect(() => {
      topElement.current?.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => {
         uScreenRoutines(typedList[currentSelectedType]);
      }, 200);
   }, []);
   useEffect(() => {
      // if (currentSelectedType === 'all' || currentSelectedType === 'holiday' || currentSelectedType === 'routines') {
      uScreenRoutines(null);
      setTimeout(() => {
         uScreenRoutines(typedList[currentSelectedType]);
      }, 200);
      // }
      // else
      // uScreenRoutines(typedList[currentSelectedType])
   }, [currentSelectedType]);

   function searchFunction(e: any) {
      const query = e.target.value.trim().toLowerCase();
      if (!e.target.value.trim())
         setTimeout(() => {
            uScreenRoutines(typedList[currentSelectedType]);
         }, 100);
      else
         debounce(() => {
            uScreenRoutines(searchRoutine(typedList[currentSelectedType] as Routine[], query));
         })();
   }

   return (
      <div className='routines-screen screen-navbar select-none dark:bg-black dark:text-darkText'>
         <div className='scrollToTop' ref={topElement}></div>
         <Header
            title={
               <span>
                  All Routines <TextEmoji emoji='📃' />
               </span>
            }
            notiIcon={true}
            placeholder='Search All Routines'
            oninput={searchFunction}
            rightIcon={Emoji.get('👜')}
            rightIconClick={() => delay(() => navigate('/applyRoutine'))}
         />
         <section className='pb-20 pt-2'>
            {/* <p className='text-[#777]/50 text-center mt-2 mb-5 text-sm font-medium'>All routines</p> */}
            <div>
               <div className='scrollbar-hidden flex flex-nowrap gap-2 overflow-auto px-[1.2rem] pb-6'>
                  <div
                     onClick={df(() => setCurrentSelectedType('routines'), 80)}
                     className={`tap95 ${
                        currentSelectedType === 'routines'
                           ? 'bg-accent text-white shadow-lg shadow-accent/50'
                           : 'bg-routine_bg text-gray-500 dark:bg-routine_bg_dark dark:text-gray-300'
                     } rounded-full p-2 px-4 text-xs font-medium`}
                  >
                     Routines
                  </div>
                  <div
                     onClick={df(() => setCurrentSelectedType('weekly'), 80)}
                     className={`tap95 ${
                        currentSelectedType === 'weekly'
                           ? 'bg-accent text-white shadow-lg  shadow-accent/50'
                           : 'bg-routine_bg text-gray-500 dark:bg-routine_bg_dark dark:text-gray-300'
                     } rounded-full p-2 px-4 text-xs font-medium`}
                  >
                     Weekly
                  </div>
                  <div
                     onClick={df(() => setCurrentSelectedType('calendar'), 80)}
                     className={`tap95 ${
                        currentSelectedType === 'calendar'
                           ? 'bg-accent text-white shadow-lg shadow-accent/50'
                           : 'bg-routine_bg text-gray-500 dark:bg-routine_bg_dark dark:text-gray-300'
                     } rounded-full p-2 px-4 text-xs font-medium`}
                  >
                     Events
                  </div>
                  <div
                     onClick={df(() => setCurrentSelectedType('holiday'), 80)}
                     className={`tap95 ${
                        currentSelectedType === 'holiday'
                           ? 'bg-accent text-white shadow-lg  shadow-accent/50'
                           : 'bg-routine_bg text-gray-500 dark:bg-routine_bg_dark dark:text-gray-300'
                     } rounded-full p-2 px-4 text-xs font-medium`}
                  >
                     Holidays
                  </div>
                  <div
                     onClick={df(() => setCurrentSelectedType('all'), 80)}
                     className={`tap95 ${
                        currentSelectedType === 'all'
                           ? 'bg-accent text-white shadow-lg shadow-accent/50'
                           : 'bg-routine_bg text-gray-500 dark:bg-routine_bg_dark dark:text-gray-300'
                     } flex-none rounded-full p-2 px-4 text-xs font-medium`}
                  >
                     All Routines
                  </div>
                  <div
                     onClick={df(() => setCurrentSelectedType('expired'), 80)}
                     className={`tap95 ${
                        currentSelectedType === 'expired'
                           ? 'bg-accent text-white shadow-lg shadow-accent/50'
                           : 'bg-routine_bg text-gray-500 dark:bg-routine_bg_dark dark:text-gray-300'
                     } flex-none rounded-full p-2 px-4 text-xs font-medium`}
                  >
                     Expired
                  </div>
               </div>
               <div className='routines flex flex-wrap justify-center gap-[0.9rem] p-[1.2rem] pt-0'>
                  <AllRoutines
                     allRoutines={allRoutines}
                     screenRoutines={screenRoutines}
                     expiredRoutines={expiredRoutines}
                  />
               </div>
            </div>
         </section>
         <FloatingButton />
         {/* <Watermark /> */}
         <NavBar active='Routines' />
      </div>
   );
}

// function GetTypedRoutines(type: TypedTypes, routines: Routine[]) {
//     if (!routines)
//         return AllRoutines(null)
//     if (type === 'routines')
//         return AllRoutines(routines)
//     else if (type === 'calendar')
//         return AllRoutines(routines.calendar)
//     else
//         if (type === 'holiday')
//             return AllRoutines(routines.holiday)
// }

function AllRoutines({
   screenRoutines,
   allRoutines,
   expiredRoutines,
}: {
   screenRoutines: Routine[] | null;
   allRoutines: Routine[] | null;
   expiredRoutines: Routine[];
}) {
   const navigate = useNavigate();
   const [currentRoutineViewIndex, setCurrentRoutineViewIndex] = useState(0);
   const [showRoutineModal, setRoutineModal] = useState(false);

   if (!screenRoutines || !allRoutines) {
      return <LoadingRoutines />;
   }

   if (screenRoutines.length === 0)
      return (
         <div className='mt-10 flex min-h-[55vh] flex-col items-center justify-center gap-10'>
            <div className='flex flex-col items-center justify-center gap-5 px-5'>
               <img src={icons.app_icon_transparent_256} className='w-[55%] dark:opacity-40 dark:grayscale' />
               <p className='text-center text-base font-medium text-[#777]/70'>
                  No Routine <TextEmoji emoji='🙄' />
               </p>
               <p className='mb-5 text-center text-xs font-[450] text-[#777]/50 '>
                  You can create a new routine or apply a <br /> routine from the
                  <span
                     className='text-accent active:bg-accent/20'
                     onClick={() => delay(() => navigate('/applyRoutine'))}
                  >
                     {' '}
                     Routine Store <TextEmoji emoji='👜' />
                  </span>
               </p>
            </div>
            {/* <button className='no-highlight block bg-dark shadow-lg shadow-dark/50 text-white py-3 px-7 text-[0.7rem] font-medium rounded-full tap97'
                onClick={() => delay(() => navigate('/applyRoutine'))}>
                Routine Store <TextEmoji emoji='👜' />
            </button> */}
         </div>
      );

   return (
      <>
         <RoutineView
            show={showRoutineModal}
            routines={allRoutines}
            expired={screenRoutines[currentRoutineViewIndex]?.expired || false}
            expiredRoutines={expiredRoutines}
            index={currentRoutineViewIndex}
            cb={[
               () => {
                  setRoutineModal(false);
               },
               () => {
                  setRoutineModal(false);
               },
            ]}
         />
         {screenRoutines.map((routine: Routine, index) => {
            return (
               <div
                  className='routine tap99 flex w-full flex-col flex-wrap rounded-[1.6rem] border-[1px] border-routine_border bg-routine_bg p-[1.2rem] dark:border-routine_border_dark dark:bg-darkInputBg md:w-[49.5%] lg:w-[32.5%]'
                  key={randomString(5)}
                  onClick={() => {
                     setCurrentRoutineViewIndex(routine.index);
                     setRoutineModal(true);
                  }}
               >
                  <div className='top flex flex-row gap-3'>
                     <div className='left'>
                        <div className='emoji bg-main flex-center aspect-square flex-1 rounded-xl p-2 dark:bg-black/40'>
                           <img src={Emoji.get(routine.emoji || '⏰')} className='aspect-square w-[25px]' />
                        </div>
                     </div>
                     <div className='right flex-center flex flex-1 flex-row justify-between gap-3'>
                        <div className='name'>
                           <p className={`text-[0.95rem] font-[550] ${false ? 'text-white' : ''} line-clamp-2`}>
                              {routine.name}
                           </p>
                        </div>
                        <div className='time'>
                           <p
                              className={`text-[0.6rem]  font-[450] ${
                                 false ? 'text-white/80' : 'text-secondary'
                              } text-right`}
                           >
                              {capitalize(routine.type)}
                           </p>
                        </div>
                     </div>
                  </div>
                  <RoutineDescription routine={routine} />
                  <ShowRoutineTime routine={routine} />
               </div>
            );
         })}
      </>
   );
}

const weekArr = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

function ShowRoutineTime({ routine }: { routine: Routine }) {
   if (routine.type === 'weekly') {
      return (
         <div className='bottom mt-1 flex flex-row gap-3'>
            <LeftBlank />
            <WeeklyRoutineTime time={routine.time} />
         </div>
      );
   }
   if (routine.type === 'calendar' || routine.type === 'holiday')
      return (
         <div className='bottom flex flex-row gap-3'>
            <LeftBlank />
            <div className='right flex-center flex flex-1 flex-row justify-between'>
               <div
                  className={`description text-[0.75rem] font-medium ${
                     false ? 'text-white/80' : 'text-secondary'
                  } line-clamp-2`}
               >
                  <p className='text-dark/40 dark:text-white/40'>
                     On {getFormattedDate(new Date(routine.time[0]), 'long', 'numeric')}
                  </p>
               </div>
            </div>
         </div>
      );
   return null;
}

function WeeklyRoutineTime({ time }: { time: Routine['time'] }) {
   return (
      <div className='flex'>
         {weekArr.map((day, index) => {
            if (time[index])
               return (
                  <div
                     key={index}
                     style={{ backgroundColor: vibrantColors7[index] }}
                     className={`ml-[-4px] flex h-5 w-5 border-spacing-1 items-center justify-center rounded-full border border-routine_bg pt-0.5 text-[0.6rem] font-medium text-white dark:border-darkInputBg`}
                  >
                     {day}
                  </div>
               );
            return null;
         })}
      </div>
   );
}

export function RoutineDescription({ routine, active = false }: { routine: Routine; active?: boolean }) {
   return (
      <div className='bottom flex flex-row gap-3'>
         <LeftBlank />
         <div className='right flex-center flex flex-1 flex-row justify-between'>
            <div
               className={`description text-[0.75rem] font-medium ${
                  active ? 'text-white/80' : 'text-dark/60 dark:text-white/60'
               }  text-secondary line-clamp-2`}
            >
               <p>
                  {routine.description} <small className='opacity-50'>{routine.sub ? '#' + routine.sub : ''}</small>
               </p>
            </div>
         </div>
      </div>
   );
}

function LeftBlank() {
   return (
      <div className='left select-none opacity-0'>
         <div className='emoji bg-main flex-center flex-1 rounded-xl px-2 py-0 '>
            <div className='h-0 w-[26px]' />
         </div>
      </div>
   );
}

export default Routines;
