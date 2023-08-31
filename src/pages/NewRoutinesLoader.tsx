import Emoji from 'emoji-store';
import { useMemo, useState } from 'react';
import '../assets/scss/index.scss';
import TextEmoji from '../components/TextEmoji';
import { getDay, getEmojiByDay, getFormattedDate, getTime, incrementDate } from '../lib/date';
import searchByDate, { Routine } from '../lib/dateMethods';
import delay from '../lib/delay';
import ls from '../lib/storage';
import { useNavigate } from 'react-router-dom';
import { capitalize } from '../lib/lib';
import { RoutineDescription } from './Routines';
import RoutineView from './viewRoutine/RoutineView';
import Loading from '../components/loading/Loading';
import icons from '../assets/icons/icons';

export default function NewRoutinesLoader() {
   const today = new Date();
   today.setDate(today.getDate() + 1);
   const [routines, setRoutines] = useState<any>([]);
   const [tomorrow, setTomorrow] = useState(today);
   const lsRoutines = useMemo(() => JSON.parse(ls.get('routines') || '[]'), []);
   const navigate = useNavigate();
   // Add index property to routines
   lsRoutines.forEach((routine: Routine, index: number) => {
      routine.index = index;
   });

   return (
      <div className=''>
         <div className='routines mt-3 flex flex-col gap-[0.9rem]'>
            {routines.length === 0 ? <></> : <GetRoutines screenRoutines={routines} allRoutines={lsRoutines} />}
         </div>
         <button
            className='no-highlight tap97 m-auto mt-10 block rounded-full bg-dark px-7 py-3 text-[0.7rem] font-medium text-white shadow-lg shadow-dark/50'
            onClick={() => delay(loadMoreRoutines)}
         >
            {/* Show routines for {getFormattedDate(tomorrow)} */}
            Show More <TextEmoji emoji='🫣' />
         </button>
      </div>
   );

   function loadMoreRoutines() {
      const notificationRoutine = {
         name: (
            <span>
               {getFormattedDate(tomorrow)}, {getDay(tomorrow)} <TextEmoji emoji={getEmojiByDay(tomorrow)} />
            </span>
         ),
         type: 'notification',
      };
      const noRoutine = {
         name: (
            <span>
               No routine for {getFormattedDate(tomorrow)} {getDay(tomorrow)} <TextEmoji emoji='🥳' />
            </span>
         ),
         type: 'notification',
      };
      setTomorrow(incrementDate(tomorrow));
      const newRoutines = searchByDate(tomorrow, lsRoutines);
      if (newRoutines.length === 0) {
         setRoutines([...routines, noRoutine]);
         return;
      }
      setRoutines([...routines, notificationRoutine, ...newRoutines]);
   }
}

export function GetRoutines({ screenRoutines, allRoutines }: { screenRoutines: Routine[]; allRoutines: Routine[] }) {
   const [currentRoutineViewIndex, setCurrentRoutineViewIndex] = useState(0);
   const [showRoutineModal, setRoutineModal] = useState(false);

   if (!screenRoutines) return <Loading />;

   if (screenRoutines.length === 0)
      return (
         <div className='flex h-[50vh] flex-col items-center justify-center gap-3'>
            <p className='text-center text-sm font-medium text-[#777]/50'>
               No Routine <TextEmoji emoji='🤔' />
            </p>
            <img src={icons.app_icon_transparent_256} className='w-[50%] dark:opacity-40 dark:grayscale' />
            <p className='text-center text-xs font-medium text-[#777]/50'>
               Go to Routines tab to see all routines <TextEmoji emoji='💫' />
            </p>
         </div>
      );

   return (
      <>
         <RoutineView
            show={showRoutineModal}
            routines={allRoutines}
            index={currentRoutineViewIndex}
            expiredRoutines={[]}
            expired={screenRoutines ? screenRoutines[currentRoutineViewIndex]?.expired : false}
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
            if (routine.type === 'notification') {
               if (routine.name === 'Completed') {
                  return (
                     <p className='my-3 mt-10 text-center text-sm font-medium text-[#777]/50' key={index}>
                        Completed <TextEmoji emoji='🤩' />
                     </p>
                  );
               }
               return (
                  <p className='my-3 mt-10 text-center text-sm font-medium text-[#777]/50' key={index}>
                     {routine.name}
                  </p>
               );
            }
            const isActiveRoutine = routine.status === 'active';
            const isCompleted = routine.status === 'done';

            return (
               <div
                  className={`routine flex flex-col rounded-[1.6rem] p-[1.2rem] ${
                     isActiveRoutine
                        ? 'z-0 bg-accent shadow-lg shadow-accent/40 dark:bg-accent/90'
                        : 'z-10 border-[1px] border-routine_border bg-routine_bg dark:border-routine_border_dark dark:bg-routine_bg_dark  '
                  }
				tap99 ${isCompleted ? 'opacity-60' : ''}
                ${routine.type === 'holiday' ? 'glow-holiday' : ''}
                ${routine.type === 'calendar' ? 'glow-calendar' : ''}
                `}
                  key={index}
                  onClick={() => {
                     setCurrentRoutineViewIndex(routine.index);
                     setRoutineModal(true);
                  }}
               >
                  <div className='top flex flex-row gap-3'>
                     <div className='left'>
                        <div
                           className={`emoji flex-center aspect-square flex-1 rounded-xl p-2 ${
                              isActiveRoutine ? 'bg-white/20 dark:bg-white/20' : 'bg-white dark:bg-black/40'
                           }`}
                        >
                           <img src={Emoji.get(routine.emoji || '⏰')} className='aspect-square w-[25px]' />
                        </div>
                     </div>
                     <div className={`right flex-center flex flex-1 flex-row justify-between gap-3 `}>
                        <div className='name'>
                           <p
                              className={`line-clamp-2 text-[0.95rem] font-[550] ${
                                 isActiveRoutine ? 'text-white' : ''
                              }`}
                           >
                              {routine.name}
                           </p>
                        </div>
                        <div className='time'>
                           <p
                              className={`whitespace-nowrap text-[0.6rem] font-[450] ${
                                 isActiveRoutine ? 'text-white/80' : 'text-secondary'
                              } text-right`}
                           >
                              {GetDisplayTime(routine)}
                           </p>
                        </div>
                     </div>
                  </div>
                  {routine.description && <RoutineDescription routine={routine} active={isActiveRoutine} />}
                  {isActiveRoutine && (
                     <div className='bottom flex flex-row gap-3'>
                        <BlankEmojiLeft />
                        <div className='right mt-2 w-full flex-1'>
                           <div className='sliderContainer flex flex-1 flex-row items-center justify-center gap-[0.35rem]'>
                              <p className='whitespace-nowrap text-[0.6rem] font-medium text-white/80'>
                                 {routine.passed}
                              </p>
                              <div className='slider h-1 w-full rounded-xl bg-[#ffffff55]'>
                                 <div
                                    className='slide h-1 w-[50%] rounded-xl bg-white'
                                    style={{ width: `${routine.percentage}%` }}
                                 ></div>
                              </div>
                              <p className='whitespace-nowrap text-[0.6rem] font-medium text-white/80'>
                                 {routine.left}
                              </p>
                           </div>
                        </div>
                     </div>
                  )}
               </div>
            );
         })}
      </>
   );
}
function BlankEmojiLeft() {
   return (
      <div className='left select-none opacity-0'>
         <div className='emoji bg-main flex-center flex-1 rounded-xl px-2 py-0 '>
            <img src='' className='h-0 w-[26px]' />
         </div>
      </div>
   );
}
function GetDisplayTime(routine: Routine) {
   if (routine.type === 'calendar') {
      return (
         <>
            {capitalize(routine.type)} <br />{' '}
            <span className='text-lg'>
               <TextEmoji emoji='🎉'></TextEmoji>
            </span>
         </>
      );
   } else if (routine.type === 'holiday') {
      return (
         <>
            {capitalize(routine.type)} <br />{' '}
            <span className='text-lg'>
               <TextEmoji emoji='🌟'></TextEmoji>
            </span>
         </>
      );
   } else {
      // const hour =
      if (routine.endTime) {
         return (
            <>
               <span className='whitespace-nowrap'>{getTime(routine.startTime)}</span> <br />
               <span className='whitespace-nowrap'>{getTime(routine.endTime)}</span>
            </>
         );
      } else {
         return <span className='whitespace-nowrap'>{getTime(routine.startTime)}</span>;
      }
   }
}
