import { useMemo, useRef, useState } from "react";
import BackHeader from "../../components/BackHeader";
import { useLocation, useNavigate } from 'react-router-dom';
import { MODAL_BUTTON_TEXT, BLANK_CALLBACK_ARR_2, parseEmoji, capitalize } from "../../lib/lib";
import BottomModal, { BasicModal } from "../../components/BottomModal";
import Emoji from "emoji-store";
import ls from "../../lib/storage";
import OptionSelector from "../../components/OptionSelector";
import { df } from "../../lib/delay";
import Once from "../makeRoutine/Once";
import Weekly from "../makeRoutine/Weekly";
import Daily from "../makeRoutine/Daily";
import Calendar from "../makeRoutine/Calendar";
import { Routine } from "../../lib/dateMethods";
import { MS_IN_DAY, day, emojiList, isStartTimeGreater } from "../../lib/date";

export default function EditRoutine() {
   const { expired, index } = useLocation().state
   const { allRoutines, allExpiredRoutines } = useMemo(getAllRoutines, [])
   const [routine, setRoutine] = useState(expired ? allExpiredRoutines[index] : allRoutines[index])
   const [modalShow, setModalShow] = useState(false)
   const [modalBtnText, setModalBtnText] = useState(MODAL_BUTTON_TEXT)
   const [modalUi, setModalUi] = useState(<BasicModal text="THis is a sample error" />)
   const blankModalCallback = useMemo(() => [() => setModalShow(false), () => setModalShow(false)], [])
   const [modalCallback, setModalCallback] = useState(blankModalCallback)
   const [routineName, setRoutineName] = useState(routine?.name)
   const [routineEmoji, setRoutineEmoji] = useState(routine?.emoji || '🧑🏻')
   const [routineDescription, setRoutineDescription] = useState(routine?.description || '')
   const emojiInput = useRef<HTMLInputElement>(null)
   const [routineType, setRoutineType] = useState<Routine['type']>(routine?.type || 'weekly')
   const [isSelectorOpen, setIsSelectorOpen] = useState(false)
   const [subscription, setSubscription] = useState(routine?.sub || "LOCAL")

   const navigate = useNavigate()
   return <div className="min-h-full text-dark dark:text-darkText screen">
      <BackHeader title="Edit Routine" backCb={handleBackClick} />
      <BottomModal show={modalShow} btnTxt={modalBtnText} cb={modalCallback} >{modalUi}</BottomModal>
      <div className="min-h-[calc(100vh-80px)] flex flex-col justify-between items-center w-full p-4">
         <div className='top flex flex-col gap-3 w-full'>
            <div className="routine-name-and-display-emoji">
               <p className='text-xs text-secondary pl-1 pb-1'>Routine name</p>
               <div className="inputText flex flex-row gap-3">
                  <img src={Emoji.get(parseEmoji(routineEmoji)[0] || '🧑🏻')} className='tap h-[3.5rem] p-[0.8rem] bg-inputBg dark:bg-darkInputBg rounded-2xl' />
                  <input
                     value={routineName}
                     onInput={(e: any) => { setRoutineName(e.target.value) }}
                     type="text"
                     placeholder='Routine Name'
                     className='name input-text bg-inputBg dark:bg-darkInputBg'
                  />
               </div>
            </div>
            <div className="routine-description inputText">
               <div className="">
                  <p className='text-xs text-secondary pl-1 pb-1'>Routine description</p>
                  <input
                     value={routineDescription}
                     onInput={(e: any) => { setRoutineDescription(e.target.value) }}
                     type="text"
                     placeholder='Routine Description'
                     className='name input-text bg-inputBg dark:bg-darkInputBg'
                  />
               </div>
            </div>

            <div className="emoji-and-type">
               <p className='text-xs text-secondary pl-1 pb-1'>Routine emoji and repetition</p>
               <div className="inputSelect flex justify-between items-center gap-3">
                  <input type="text"
                     value={routineEmoji}
                     placeholder='Emoji'
                     className='name input-text bg-inputBg dark:bg-darkInputBg flex-1'
                     onInput={(e: any) => {
                        setRoutineEmoji(parseEmoji(e.target.value)[0])
                     }}
                     ref={emojiInput}
                  />
                  <div>
                     {/* <OptionSelector heading='Routine Type' isOpen={isSelectorOpen} options={routineOptions} setOption={setRoutineType} setIsOpen={setIsSelectorOpen}> */}
                     <div className='tap99 flex-[4] appearance-none p-[1rem] px-7 rounded-2xl trans-outline outline-none focus:outline-accent border-none bg-inputBg dark:bg-darkInputBg text-center'
                        onClick={df(() => { /*setIsSelectorOpen(true)*/ })}>Routine : {capitalize(routineType)}</div>
                     {/* </OptionSelector> */}
                  </div>
               </div>
            </div>
            <div className="emojis flex gap-3 scrollbar-hidden flex-nowrap overflow-auto justify-between items-center">
               {emojiList.map((emoji: string, index: number) =>
                  <img src={Emoji.get(emoji)}
                     onClick={() => setRoutineEmoji(emoji)}
                     className='tap bg-inputBg dark:bg-darkInputBg h-[3.2rem] p-[0.8rem] rounded-2xl' key={index}
                  />
               )}
               <p className='tap bg-inputBg dark:bg-darkInputBg h-[3.2rem] p-[0.8rem] rounded-2xl aspect-square  flex justify-center items-center text-2xl'
                  onClick={() => { emojiInput && emojiInput.current?.focus() }}>+</p>
            </div>
            {RoutineMaker(routineType, routine)}
         </div>
         <div className="btn w-full">
            <button className="btn-full no-highlight tap99 w-full text-sm" onClick={saveRoutine}>Save Routine</button>
         </div>
      </div>
   </div>


   // Required functions
   function RoutineMaker(type: string, routine: Routine) {
      if (type === 'once') return <Once updateRoutine={setRoutine} routine={routine} />
      if (type === 'weekly') return <Weekly updateRoutine={setRoutine} routine={routine} edit={true} />
      else if (type === 'daily') return <Daily updateRoutine={setRoutine} routine={routine} />
      else if (type === 'calendar' || type === 'holiday') return <Calendar type={type} updateRoutine={setRoutine} routine={routine} />
      else return <div className="mt-16 text-center">
         <p>This screen is under development</p>
      </div>
   }

   function handleBackClick() {
      setModalUi(
         <BasicModal text="Cancel Edit Routine?"
            desc='You will lose all the changes you made.'
            emoji='🧐'
         />
      )
      setModalCallback([() => setModalShow(false), () => navigate(-1),])
      setModalBtnText(['Don\'t', 'Discard',])
      setModalShow(true)
   }

   function defaultModal(ui: JSX.Element) {
      setModalShow(true)
      setModalBtnText(MODAL_BUTTON_TEXT)
      setModalUi(ui)
   }

   function saveRoutine() {
      // Validate routine
      setRoutineName(routineName.trim())
      setRoutineDescription(routineDescription.trim())

      if (!routineName)
         return defaultModal(<BasicModal text="Routine name is required" desc="Please provide a name for your routine" emoji='😕' />)

      if (routineType === 'once') {
         if (!routine.time[0])
            return defaultModal(<BasicModal text="Routine time is required" desc="Please provide a time for your routine" emoji='😕' />)

         let startDate = new Date(routine.time[0])
         let endDate = new Date(routine.time[1])

         // If start time is greater than end time then return error
         if (startDate > endDate)
            return defaultModal(<BasicModal text="Start time is greater than end time" desc="Make sure that the start time is less than end time" emoji='😕' />)
         // If start time is equal to end time then remove end time
         else if (startDate.getTime() === endDate.getTime())
            routine.time[1] = ''
      }
      else if (routineType === 'daily') {
         if (!routine.time[0])
            return defaultModal(<BasicModal text="Routine time is required" desc="Please provide a time for your routine" />)
         if (isStartTimeGreater(routine.time[0], routine.time[1]))
            return defaultModal(<BasicModal text="Start time is greater than end time" desc="Make sure that the start time is less than end time" />)
      }
      else if (routineType === 'weekly') {
         let timeObj = routine.time

         if (!timeObj)
            return defaultModal(<BasicModal text="At least one Routine time is required" desc="Please provide at least one time for your routine" />)

         if (timeObj && Object.keys(timeObj).length === 0)
            return defaultModal(<BasicModal text="Please Select the day clicking on the boxes written days on it." />)

         const status = filterTimeArray(timeObj)

         if (status.text != 'success')
            return defaultModal(<BasicModal text={status.text} desc={status.desc} />)
         else
            routine.time = status.data
      }
      else if (routineType === 'holiday' || routineType === 'calendar') {
         let routineTime = routine.time[0]
         if (!routineTime)
            return defaultModal(<BasicModal text="Please Select a date" desc="You have to select a date to continue" />)

         routineTime = new Date(routineTime).getTime()
         const now = Math.floor(Date.now() / MS_IN_DAY)
         routineTime = Math.floor(routineTime / MS_IN_DAY)

         if (now > routineTime)
            return defaultModal(<BasicModal text="Past Time!" desc="The time you provide is in past, Select a time that is in future" />)
      }

      let newRoutine = {
         name: routineName,
         description: routineDescription,
         emoji: routineEmoji || '🧑🏻',
         type: routineType,
         sub: subscription,
         ...routine
      }


      // Ask to saveRoutine
      setModalUi(<BasicModal text="Save Edited Routine?"
         desc='If you save this routine, the routine will be overridden'
         emoji='⁉️'
      />)
      setModalShow(true)
      setModalCallback([() => setModalShow(false), () => {
         saveRoutineToLs(newRoutine, allRoutines, allExpiredRoutines, index, expired)
         navigate(-1)
      }])
      return
   }
}

function saveRoutineToLs(routine: Routine, allRoutines: Routine[], allExpiredRoutines: Routine[], index: number, expired: boolean = false) {
   if (expired) {
      allExpiredRoutines[index] = routine
      ls.set('expiredRoutines', JSON.stringify(allExpiredRoutines))
   } else {
      allRoutines[index] = routine
      ls.set('routines', JSON.stringify(allRoutines))
   }
}


function filterTimeArray(timeObj: any) {
   const latestTimes: any = {}
   let atLeastOneExist = false

   // Filter time array
   for (let i = 0; i < 7; i++) {
      const time = timeObj[i]
      if (time) {
         // If start time exist
         if (time[0]) {
            latestTimes[i] = []
            latestTimes[i][0] = time[0]
            atLeastOneExist = true
            if (time[1]) {
               if (time[0] !== time[1]) {
                  // Check if start time is greater than end time 
                  if (isStartTimeGreater(time[0], time[1]))
                     return ({
                        text: `Something wrong in the time of ${day[i]}`,
                        desc: "Make sure that the start time is less than end time"
                     })
                  else
                     latestTimes[i][1] = time[1]
               }
            }
         }
         else if (time[1]) {
            return ({
               text: `Something wrong in the time of ${day[i]}`,
               desc: "The start time must be provided if end time is provided"
            })
         }
      }
   }

   if (!atLeastOneExist)
      return ({
         text: "At least one Routine time is required",
         desc: "Please provide at least one time for your routine"
      })
   return {
      text: 'success',
      data: latestTimes
   }
}



function getAllRoutines() {
   const allRoutines = JSON.parse(ls.get('routines') || '[]')
   const allExpiredRoutines = JSON.parse(ls.get('expiredRoutines') || '[]')
   return { allRoutines, allExpiredRoutines }
}