import { useNavigate } from 'react-router-dom';
import images from '../assets/images/images';
import TextEmoji from '../components/TextEmoji';
// import routines from "../lib/sampleTypes";
import ls from '../lib/storage';
import { useEffect, useMemo, useState } from 'react';
import Header from '../components/Header';
import Loading from '../components/loading/Loading';
import { MODAL_BUTTON_TEXT } from '../lib/lib';
import BottomModal, { BasicModal } from '../components/BottomModal';
import icons from '../assets/icons/icons';

function deleteRoutineById(routineID: string) {
   let routines = JSON.parse(ls.get('routines') || '[]');
   let expiredRoutines = JSON.parse(ls.get('expiredRoutines') || '[]');
   const newRoutines: any = [];
   const newExpiredRoutines: any = [];
   routines.forEach((routine: any) => {
      if (routine.sub !== routineID) {
         newRoutines.push(routine);
      }
   });
   expiredRoutines.forEach((routine: any) => {
      if (routine.sub !== routineID) {
         newExpiredRoutines.push(routine);
      }
   });
   ls.set('routines', JSON.stringify(newRoutines));
   ls.set('expiredRoutines', JSON.stringify(newExpiredRoutines));
}

export default function ApplyRoutine() {
   const navigate = useNavigate();
   const [isApplyingRoutine, setIsApplyingRoutine] = useState(false);
   const [routineIdByInput, setRoutineIdByInput] = useState('');
   const [applyRoutineStatus, setApplyRoutineStatus] = useState('Click to remove subscription');
   const startedUsing = ls.get('startedUsing');

   const [modalShow, setModalShow] = useState(false);
   const [modalBtnText, setModalBtnText] = useState(MODAL_BUTTON_TEXT);
   const [modalUi, setModalUi] = useState(<></>);
   const BLANK_MODAL_CB = useMemo(() => [() => setModalShow(false), () => setModalShow(false)], []);
   const [modalCallback, setModalCallback] = useState(BLANK_MODAL_CB);

   function setBlankAndShowModal() {
      setModalBtnText(MODAL_BUTTON_TEXT);
      setModalCallback(BLANK_MODAL_CB);
      setModalShow(true);
   }

   return (
      <div className='screen dark:text-white'>
         <BottomModal show={modalShow} btnTxt={modalBtnText} cb={modalCallback}>
            {modalUi}
         </BottomModal>
         <Header
            title={
               <>
                  Manage Routines <TextEmoji emoji='⚙️'></TextEmoji>
               </>
            }
            notiIcon={false}
            placeholder='Search Routine'
            onInput={() => {}}
         />
         <div className='flex flex-col gap-4 px-5 py-1'>
            <p className='px-4 py-2 text-center text-xs text-grey'>
               You have subscribed to the following routine(s). {applyRoutineStatus}
            </p>
            <Routines deleteRoutine={deleteRoutine} />
         </div>
      </div>
   );

   function deleteRoutine(id: string) {
      setModalBtnText(['Cancel', 'Unsubscribe']);
      setModalUi(
         <BasicModal
            text='Are you sure?'
            desc={
               <span>
                  Are you sure you want to unsubscribe this routine : <span className='text-accent'>{id}</span> ? This
                  will delete all the data associated with this routine.
               </span>
            }
            emoji='😕'
         />,
      );

      setModalCallback([
         () => {
            setModalShow(false);
         },
         () => {
            applyThisRoutine();
            setModalShow(false);
         },
      ]);
      setModalShow(true);

      function applyThisRoutine() {
         const subscriptions = JSON.parse(ls.get('subscriptions') || '{}');
         delete subscriptions[id];
         ls.set('subscriptions', JSON.stringify(subscriptions));
         deleteRoutineById(id);
         setTimeout(() => {
            setModalUi(
               <BasicModal
                  text='Routine deleted Successfully.'
                  desc='You can always add this routine again from the Routine Store.'
                  emoji='😊'
               />,
            );
            setModalCallback([
               () => {
                  setModalShow(false);
               },
               () => {
                  navigate(-1);
               },
            ]);
            setModalBtnText(['Ok', 'Go Back']);
            setModalShow(true);
         }, 300);
      }
   }
}

function Routines({ deleteRoutine }: any) {
   const subscriptions = JSON.parse(ls.get('subscriptions') || '{}');
   const routines = Object.keys(subscriptions);
   return (
      <div className='flex flex-col gap-3'>
         {routines.length === 0 ? (
            <div className='flex min-h-[60dvh] flex-col items-center justify-center gap-5'>
               <img src={icons.app_icon_transparent_256} className='w-[55%] dark:opacity-40 dark:grayscale' />
               <p className='text-secondary text-center text-sm'>
                  You haven't subscribed <br /> to any routine yet.
               </p>
            </div>
         ) : (
            routines.map((id: any, index: number) => {
               return (
                  <div
                     key={index}
                     className='tap99 flex gap-[5%] rounded-3xl bg-accent p-3.5 text-white'
                     onClick={() => {
                        deleteRoutine(id);
                     }}
                  >
                     <div className='left w-[22%]'>
                        <img
                           src={subscriptions[id].image || images.routine}
                           className='aspect-auto w-full rounded-2xl bg-white/10'
                        />
                     </div>
                     <div className='right flex w-[68%] flex-col gap-1'>
                        <p className='text-[0.9rem] font-semibold'>{subscriptions[id].fn}</p>
                        <p className='text-[0.73rem] font-medium text-white opacity-70'>
                           {subscriptions[id].description} <br /> #{subscriptions[id].name}
                        </p>
                     </div>
                  </div>
               );
            })
         )}
      </div>
   );
}
