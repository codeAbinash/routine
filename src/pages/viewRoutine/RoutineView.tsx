import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import icons from '../../assets/icons/icons';
import { Routine } from '../../lib/dateMethods';
import { df } from '../../lib/delay';
import { useDark } from '../../lib/lib';
import ls from '../../lib/storage';
import { BackupType } from '../backup-restore/file';
import Calendar from './Calendar';
import Daily from './Daily';
import Once from './Once';
import Weekly from './Weekly';

function viewRoutineTyped(routine: Routine) {
   if (routine.type === 'weekly') {
      return <Weekly routine={routine} />;
   }
   if (routine.type === 'daily') {
      return <Daily routine={routine} />;
   }
   if (routine.type === 'calendar' || routine.type === 'holiday') {
      return <Calendar routine={routine} />;
   }
   if (routine.type === 'once') return <Once routine={routine} />;
   else
      return (
         <div>
            <p>Not implemented yet</p>
            <div className='mt-4 rounded-2xl bg-black p-4 text-white'>
               <code className='text-sm'>{JSON.stringify(routine, null, 4)}</code>
            </div>
         </div>
      );
}

export default function RoutineView({
   show,
   routines,
   cb,
   index,
   expired = false,
   expiredRoutines,
}: {
   index: number;
   show: boolean;
   routines: Routine[];
   cb?: Array<Function | any>;
   expired?: boolean;
   expiredRoutines?: Routine[];
}) {
   const [isShow, setIsShow] = useState(false);
   const [backDisplay, setBackDisplay] = useState(false);
   const navigate = useNavigate();
   const dark = useMemo(useDark, []);

   useEffect(() => {
      let t1: any;
      if (show) {
         setBackDisplay(true);
         t1 = setTimeout(() => {
            setIsShow(true);
         }, 50);
      } else setIsShow(false);
      const timer = setTimeout(() => {
         setBackDisplay(show);
      }, 400);
      return () => {
         clearTimeout(timer), clearTimeout(t1);
      };
   }, [show]);

   useEffect(() => {
      if (isShow) document.body.style.overflowY = 'hidden';
      return () => {
         document.body.style.overflowY = 'auto';
      };
   }, [isShow]);

   if (!routines[index] || !expiredRoutines) return null;

   return (
      <>
         <div
            className={`h-[100dvh] w-full duration-[300ms] ${backDisplay ? 'flex' : 'hidden'}
          fixed left-0 top-0 z-[50] bg-transparent transition-all ease-linear ${dark ? '' : 'modal-bg-linear-grad'}
          ${isShow ? 'opacity-100' : 'opacity-0'}`}
         ></div>
         <div
            onClick={() => {
               cb && cb[0] && cb[0]();
            }}
            className={`h-[100dvh] w-full duration-[350ms] ${backDisplay ? 'flex' : 'hidden'}
       fixed left-0 top-0 z-[50] flex items-end bg-transparent text-dark transition-all ease-linear dark:text-darkText
       ${isShow ? ' backdrop-blur-sm' : 'backdrop-blur-0'}`}
         ></div>

         <div
            className={`fixed z-[51] max-h-[95vh] overflow-auto ${
               isShow ? 'bottom-0' : 'bottom-[-150vh]'
            } left-0 w-full rounded-t-[2.5rem] bg-white p-5 transition-all duration-[400ms] ease-in-out dark:bg-[#111]`}
         >
            <div className='bar mx-auto h-[0.3rem] w-12 rounded-full bg-[#77777744]'></div>
            <div className='mb-5'>
               <p className='text-balance mb-6 mt-5 line-clamp-2 px-[10%] text-center text-lg font-medium'>
                  {expired ? expiredRoutines![index].name : routines[index].name}
               </p>
               {expired ? (
                  <>
                     {viewRoutineTyped(expiredRoutines[index])}
                     {RoutineDescription(expiredRoutines[index])}
                  </>
               ) : (
                  <>
                     {viewRoutineTyped(routines[index])}
                     {RoutineDescription(routines[index])}
                  </>
               )}
            </div>

            <div className='mb-5 mt-6 flex gap-3 text-[0.8rem]'>
               <div
                  className='tap95 flex items-center justify-center gap-2 rounded-full bg-inputBg p-2 px-[1rem] dark:bg-[#222]'
                  onClick={() => editRoutine(expired, index, navigate)}
               >
                  <img src={icons.edit} className='h-4 w-4 opacity-70 dark:invert' />
                  <span className='font-[430]'>Edit</span>
               </div>
               <div
                  className='tap95 flex items-center justify-center gap-2 rounded-full bg-inputBg p-2 px-[1rem] dark:bg-[#222]'
                  onClick={() => {
                     deleteRoutine(index, setIsShow, navigate, expired);
                  }}
               >
                  <img src={icons.del} className='h-4 w-4 opacity-70 dark:invert' />
                  <span className='font-[430]'>Delete</span>
               </div>
               <div
                  className='tap95 flex items-center justify-center gap-2.5 rounded-full bg-inputBg p-2 px-[1rem] dark:bg-[#222]'
                  onClick={() => {
                     shareRoutine(routines[index], index);
                  }}
               >
                  <img src={icons.telegram_dark} className='h-4 w-4 opacity-70 dark:invert' />
                  <span className='font-[430]'>Share</span>
               </div>
            </div>

            <div className='mt-7'>
               <button
                  className='no-highlight tap99 w-full rounded-[0.85rem] bg-accent p-4 text-sm font-medium text-white'
                  onClick={df(() => {
                     cb && cb[1] && cb[1]();
                  }, 80)}
               >
                  OK
               </button>
            </div>
         </div>
      </>
   );
}

async function shareRoutine(routine: Routine, index: number) {
   const allRoutines = JSON.parse(ls.get('routines') || '[]');
   routine = allRoutines[index];

   const backup: BackupType = {
      routines: [routine],
      subscriptions: [],
   };

   if (navigator.share) {
      // const title = JSON.stringify(backup)
      // const text = routine.description || ''
      const text = JSON.stringify(backup, null, 2);
      // const url = details.url
      // const blob: Blob = new Blob([stringified], { type: 'application/json' })
      try {
         await navigator.share({
            // title: title,
            text: text,
            // url: url,
            // files: [
            //    new File([blob], 'routine.json', { type: blob.type })
            // ]
         });
      } catch (err) {
         console.warn(err);
      }
   }
}

function editRoutine(expired: boolean, index: number, navigate: any) {
   // Check if it is the routine from subscription
   const routines = JSON.parse(ls.get('routines') || '[]');
   if (routines[index].sub !== 'LOCAL') {
      const subscription = JSON.parse(ls.get('subscriptions') || '{}')[routines[index].sub];
      const confirm = window.confirm(
         `Warning! This routine belongs to your subscription of ${subscription.name}. If you edit this routine, this will be restored in the next update of that subscription. Are you sure?`,
      );
      if (!confirm) return;
   }
   navigate('/editRoutine', { state: { expired: expired, index: index } });
}

function deleteRoutine(index: number, setIsShow: Function, navigate: Function, expired: boolean = false) {
   let confirm;
   let confirm2;
   const routines = JSON.parse(ls.get('routines') || '[]');
   if (routines[index].sub !== 'LOCAL') {
      const subscription = JSON.parse(ls.get('subscriptions') || '{}')[routines[index].sub];
      confirm = window.confirm(
         `Warning! This routine belongs to your subscription of ${subscription.name}. If you delete this routine, this will be restored in the next update of that subscription. Are you sure?`,
      );
      confirm && (confirm2 = window.confirm(`Really? Are you sure you want to delete this routine?`));
      confirm = confirm && confirm2;
   } else {
      confirm = window.confirm('Are you sure you want to delete this routine?');
   }

   if (!confirm) return;

   if (expired) {
      const expiredRoutines = JSON.parse(ls.get('expiredRoutines') || '[]');
      expiredRoutines.splice(index, 1);
      ls.set('expiredRoutines', JSON.stringify(expiredRoutines));
   } else {
      routines.splice(index, 1);
      ls.set('routines', JSON.stringify(routines));
   }

   setIsShow(false);
   // If in the routines tab then go to home else go to routines tab
   if (window.location.pathname.endsWith('/routines') || window.location.pathname.endsWith('/routines/'))
      navigate('/', { replace: true });
   else navigate('/routines', { replace: true });
}

function RoutineDescription(routine: Routine) {
   // if (!routine.description)
   //    return
   return (
      <div className='description'>
         {/* <p className='text-xs text-grey'>Description </p> */}
         <p className='tap99 mt-2 rounded-xl bg-inputBg p-4 text-sm font-[430] dark:bg-[#222]'>
            {routine.description}
            <span className='text-xs font-medium opacity-40'> #{routine.sub}</span>
         </p>
      </div>
   );
}
