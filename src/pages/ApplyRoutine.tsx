import { useNavigate } from 'react-router-dom';
import images from '../assets/images/images';
import TextEmoji from '../components/TextEmoji';
// import routines from "../lib/sampleTypes";
import ls from '../lib/storage';
import { useEffect, useMemo, useState } from 'react';
import Header from '../components/Header';
import Loading from '../components/loading/Loading';
import BottomModal from '../components/BottomModal';
import Emoji from 'emoji-store';

function deleteRoutineById(routineID: string) {
   let routines = JSON.parse(ls.get('routines') || '[]');
   const newRoutines: any = [];
   routines.forEach((routine: any) => {
      if (routine.sub !== routineID) {
         newRoutines.push(routine);
      }
   });
   ls.set('routines', JSON.stringify(newRoutines));
}

function EnterValidRoutineIdUI() {
   return (
      <>
         <p className='text-center text-xl font-semibold'>
            Enter a valid routine ID <TextEmoji emoji='🤨' />
         </p>
         <div className='animate-bounce-slow mb-10 mt-10 grid'>
            <img src={Emoji.get('🤔')} alt='emoji' className={`place-1-1 mx-auto mt-5 h-24 w-24 opacity-50 blur-lg`} />
            <img src={Emoji.get('🤔')} alt='emoji' className={`place-1-1 z-10 mx-auto mt-5 h-24 w-24`} />
         </div>
         <p className='mt-5 text-center text-xs font-[450] text-grey'>
            If you cannot find your routine ID, please contact{' '}
            <a className='text-accent' href='mailto:codeAbinash@gmail.com'>
               me
            </a>
            .
         </p>
      </>
   );
}

function RoutineAppliedUI({ routineId }: { routineId: string }) {
   return (
      <>
         <p className='text-center text-xl font-semibold'>
            Routine Applied <TextEmoji emoji='✅' />
         </p>
         <div className='animate-bounce-slow mb-10 mt-10 grid'>
            <img src={Emoji.get('🤩')} alt='emoji' className={`place-1-1 mx-auto mt-5 h-24 w-24 opacity-50 blur-lg`} />
            <img src={Emoji.get('🤩')} alt='emoji' className={`place-1-1 z-10 mx-auto mt-5 h-24 w-24`} />
         </div>
         <p className='mt-5 text-center text-xs font-[450] text-grey'>
            Routine id : <span className='text-accent'>{routineId}</span>. Go back now?
         </p>
      </>
   );
}

function AlreadySubscribedUI({ routineId }: { routineId: string }) {
   return (
      <>
         <p className='text-center text-xl font-semibold'>
            Already Subscribed <TextEmoji emoji='😁' />
         </p>
         <div className='animate-bounce-slow mb-10 mt-10 grid'>
            <img src={Emoji.get('😉')} alt='emoji' className={`place-1-1 mx-auto mt-5 h-24 w-24 opacity-50 blur-lg`} />
            <img src={Emoji.get('😉')} alt='emoji' className={`place-1-1 z-10 mx-auto mt-5 h-24 w-24`} />
         </div>
         <p className='mt-5 text-center text-xs font-[450] text-grey'>
            You are already subscribed to this routine! <br />
            Routine id : <span className='text-accent'>{routineId}</span>
         </p>
      </>
   );
}

function SkipUI() {
   return (
      <>
         <p className='text-center text-xl font-semibold'>Skip for now ?</p>
         <div className='animate-bounce-slow mb-10 mt-10 grid'>
            <img src={Emoji.get('👉🏻')} alt='emoji' className={`place-1-1 mx-auto mt-5 h-24 w-24 opacity-50 blur-lg`} />
            <img src={Emoji.get('👉🏻')} alt='emoji' className={`place-1-1 z-10 mx-auto mt-5 h-24 w-24`} />
         </div>
         <p className='mt-5 px-[7%] text-center text-xs font-[450] text-grey'>
            You can skip this step for now. You can add routines later from settings.
         </p>
      </>
   );
}

function RoutineNotFoundUI({ routineId }: { routineId: string }) {
   return (
      <>
         <p className='text-center text-xl font-semibold'>
            Routine Not Found <TextEmoji emoji='😢' />
         </p>
         <div className='animate-bounce-slow mb-10 mt-10 grid'>
            <img src={Emoji.get('😢')} alt='emoji' className={`place-1-1 mx-auto mt-5 h-24  w-24 opacity-50 blur-lg`} />
            <img src={Emoji.get('😢')} alt='emoji' className={`place-1-1 z-10 mx-auto mt-5  h-24 w-24`} />
         </div>
         <p className='mt-5 px-[7%] text-center text-xs font-[450] text-grey'>
            Cannot find routine <span className='text-accent'>{routineId}</span> Maybe the routine you are looking for
            is not available. Please check the routine id again. <br />
            <br />
            Or Report this problem to{' '}
            <a className='text-accent' href='mailto:codeAbinash@gmail.com'>
               me
            </a>
            .
         </p>
      </>
   );
}

function ConfirmApplyUI({ routineId }: { routineId: string }) {
   return (
      <>
         <p className='text-center text-xl font-semibold'>
            Confirm Apply Routine? <TextEmoji emoji='🤔' />
         </p>
         <div className='animate-bounce-slow mb-10 mt-10 flex items-center justify-center gap-[10%]'>
            <img src={Emoji.get('✅')} alt='emoji' className={`mt-5 h-16 w-16`} />
            <img src={Emoji.get('🤔')} alt='emoji' className={`mt-5 h-20 w-20`} />
         </div>
         <p className='mt-5 px-[7%] text-center text-xs font-[450] text-grey'>
            Are you sure you want to apply this routine? <br />
            Routine id : <span className='text-accent'>{routineId}</span>
         </p>
      </>
   );
}

function blank() {}

const MODAL_BUTTON_TEXT = ['Cancel', 'Ok'];

export default function ApplyRoutine() {
   const navigate = useNavigate();
   const [isApplyingRoutine, setIsApplyingRoutine] = useState(false);
   const [routineIdByInput, setRoutineIdByInput] = useState('');
   const [applyRoutineStatus, setApplyRoutineStatus] = useState('Click to apply routine');
   const subscription = JSON.parse(ls.get('subscriptions') || '{}');
   const [modalShow, setModalShow] = useState(false);
   const [modalBtnText, setModalBtnText] = useState(MODAL_BUTTON_TEXT);
   const [modalUi, setModalUi] = useState(<></>);
   const BLANK_MODAL_CB = useMemo(() => [() => setModalShow(false), () => setModalShow(false)], []);
   const [modalCallback, setModalCallback] = useState(BLANK_MODAL_CB);

   const startedUsing = useMemo(() => ls.get('startedUsing'), []);
   return (
      <div className='screen dark:text-white'>
         <BottomModal show={modalShow} btnTxt={modalBtnText} cb={modalCallback}>
            {modalUi}
         </BottomModal>
         <Header
            title={
               startedUsing ? (
                  <>
                     Routine Store <TextEmoji emoji='👜' />
                  </>
               ) : (
                  <>
                     Select Routine <TextEmoji emoji='🧐' />
                  </>
               )
            }
            notiIcon={false}
            placeholder='Search Routine'
            onInput={() => {}}
         />
         <div className='flex flex-col gap-4 px-5 py-1'>
            {!startedUsing ? (
               <div className='flex flex-row justify-between rounded-[14px] bg-accent/20 p-[0.85rem] px-4 text-sm'>
                  <p>You can skip it for now.</p>
                  <p className='tap font-medium uppercase text-accent' onClick={() => skip(navigate)}>
                     Skip
                  </p>
               </div>
            ) : (
               ''
            )}
            {/* <p className="text-sm">Select Your Preferred Routine</p> */}

            <div className='flex justify-between gap-2'>
               <input
                  value={routineIdByInput}
                  onInput={(e: any) => setRoutineIdByInput(e.target.value)}
                  type='text'
                  placeholder='Routine Id'
                  className='no-highlight flex-1 rounded-[14px] bg-inputBg p-[0.85rem] pl-5 text-sm font-medium outline-link/70 dark:bg-darkInputBg '
               />
               <button
                  className='tap97 rounded-xl border-none bg-accent px-7 text-sm text-white'
                  onClick={() => addRoutine(routineIdByInput)}
               >
                  Add
               </button>
            </div>

            <p className='text-center text-xs text-grey'>{applyRoutineStatus}</p>
            <Routines addRoutine={addRoutine} subscription={subscription} />
         </div>
      </div>
   );

   function setBlankAndShowModal() {
      setModalBtnText(MODAL_BUTTON_TEXT);
      setModalCallback(BLANK_MODAL_CB);
      setModalShow(true);
   }

   function addRoutine(id: string) {
      if (!id || id === '') {
         setModalUi(EnterValidRoutineIdUI);
         setBlankAndShowModal();
         return;
      }

      // Check if already subscribed
      const subscriptions = JSON.parse(ls.get('subscriptions') || '{}');
      if (subscriptions[id]) {
         setModalUi(<AlreadySubscribedUI routineId={id} />);
         setBlankAndShowModal();
         return;
      }

      // Confirm Apply Routine
      setModalUi(<ConfirmApplyUI routineId={id} />);
      setModalCallback([
         () => {
            setModalShow(false);
         },
         () => {
            setModalShow(false);
            applyRoutine();
         },
      ]);
      setModalBtnText(['Cancel', 'Apply']);
      setModalShow(true);

      // const confirm = window.confirm("Warning! Are you sure you want to apply this routine? Routine subscription ID is " + id + ".")
      // if (!confirm) return;

      function applyRoutine() {
         if (isApplyingRoutine) return;
         setIsApplyingRoutine(true);
         setApplyRoutineStatus('Downloading Routine...');

         let fetchedRoutines: any = null;
         let fetchedSubscriptions: any = null;

         const subscriptionDetailsFetch = fetch(`https://routine-data.vercel.app/${id}/info.json`)
            .then((res) => res.json())
            .then((data) => {
               fetchedSubscriptions = data;
            });

         const routineFetch = fetch(`https://routine-data.vercel.app/${id}/routine.json`)
            .then((res) => res.json())
            .then((data) => {
               fetchedRoutines = data;
            });

         Promise.allSettled([subscriptionDetailsFetch, routineFetch]).then(() => {
            if (fetchedRoutines && fetchedSubscriptions) {
               subscriptions[id] = fetchedSubscriptions;
               ls.set('subscriptions', JSON.stringify(subscriptions));
               // Add or update routines to the routine array
               let routines = JSON.parse(ls.get('routines') || '[]');
               routines.unshift(...fetchedRoutines);
               ls.set('routines', JSON.stringify(routines));
               ls.set('startedUsing', 'yes');
               setIsApplyingRoutine(false);

               setTimeout(() => {
                  const doneFunction = () => {
                     setModalShow(false);
                     if (startedUsing) navigate(-1);
                     else navigate('/', { replace: true });
                  };
                  // Set Modal Alert
                  setModalCallback([doneFunction, doneFunction]);
                  setModalUi(<RoutineAppliedUI routineId={id} />);
                  setModalBtnText(MODAL_BUTTON_TEXT);
                  setModalShow(true);
               }, 300);
            } else {
               setTimeout(() => {
                  setModalUi(<RoutineNotFoundUI routineId={id} />);
                  setBlankAndShowModal();
               }, 300);

               setApplyRoutineStatus('Click to apply routine');
               setIsApplyingRoutine(false);
            }
         });
      }
   }

   function skip(navigate: any) {
      setModalUi(<SkipUI />);
      setModalCallback([
         () => {
            setModalShow(false);
         },
         () => {
            setModalShow(false);
            ls.set('startedUsing', 'yes');
            navigate('/', { replace: true });
         },
      ]);
      setModalBtnText(['Cancel', 'Skip']);
      setModalShow(true);
   }
}

// function filterRoutines(routines: any) {
// 	const subscriptions = JSON.parse(ls.get('subscriptions') || '{}')
// 	let filteredRoutines: any = []
// 	routines.forEach((routine: any) => {
// 		if (!subscriptions[routine.sub]) {
// 			filteredRoutines.push(routine)
// 		}
// 	})
// 	routines = filterRoutines
// }

function Routines({ addRoutine, subscription }: any) {
   const allRoutinesLink = 'https://routine-data.vercel.app/allRoutines.json';
   const [routines, setRoutines] = useState<any>(null);
   useEffect(() => {
      setTimeout(async () => {
         let fetchedRoutines = await (await fetch(allRoutinesLink)).json();
         setRoutines(fetchedRoutines);
      }, 0);
   }, []);

   return !routines ? (
      <div className='flex min-h-[60dvh] items-center justify-center'>
         <Loading />
      </div>
   ) : (
      routines.map((routine: any, index: number) => {
         const isSubscribed = !!subscription[routine.id];
         return (
            <div
               key={index}
               className={`flex justify-between ${
                  isSubscribed ? 'bg-accent text-white' : 'bg-inputBg dark:bg-darkInputBg'
               } tap99 rounded-3xl p-3.5`}
               onClick={() => {
                  addRoutine(routine.id);
               }}
            >
               <div className='left w-[22%]'>
                  <img src={routine.image || images.routine} className='aspect-auto w-full rounded-2xl bg-white/10' />
               </div>
               <div className='right flex w-[73%] flex-col gap-1'>
                  <p className='text-[0.9rem] font-semibold'>{routine.name}</p>
                  <p className={`${isSubscribed ? 'text-white/70' : 'text-grey'} text-[0.73rem] font-medium`}>
                     {routine.description} <br />#{routine.id}
                  </p>
               </div>
            </div>
         );
      })
   );
}
