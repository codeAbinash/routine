import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import icons from "../../assets/icons/icons"
import { Routine } from "../../lib/dateMethods"
import delay, { df } from "../../lib/delay"
import ls from "../../lib/storage"
import Daily from "./Daily"
import Weekly from "./Weekly"
import TextEmoji from "../../components/TextEmoji"
import Calendar from "./Calendar"
import Once from "./Once"

function viewRoutineTyped(routine: Routine) {
   if (routine.type === 'weekly') {
      return <Weekly routine={routine} />
   }
   if (routine.type === 'daily') {
      return <Daily routine={routine} />
   }
   if (routine.type === 'calendar' || routine.type === 'holiday') {
      return <Calendar routine={routine} />
   }
   if (routine.type === 'once')
      return <Once routine={routine} />
   else
      return (
         <div>
            <p>Not implemented yet</p>
            <div className='p-4 bg-black text-white rounded-2xl mt-4'>
               <code className='text-sm'>{JSON.stringify(routine, null, 4)}</code>
            </div>
         </div>
      )
}

export default function RoutineView({ show, routines, cb, index, expired = false, expiredRoutines }: { index: number, show: boolean, routines: Routine[], cb?: Array<Function | any>, expired?: boolean, expiredRoutines?: Routine[] }) {
   const [isShow, setIsShow] = useState(false)
   const [backDisplay, setBackDisplay] = useState(false)
   const navigate = useNavigate()

   useEffect(() => {
      let t1: any;
      if (show) {
         setBackDisplay(true)
         t1 = setTimeout(() => { setIsShow(true) }, 50);
      } else
         setIsShow(false)
      const timer = setTimeout(() => { setBackDisplay(show) }, 400);
      return () => { clearTimeout(timer), clearTimeout(t1) }
   }, [show])


   useEffect(() => {
      if (isShow) document.body.style.overflowY = 'hidden'
      return () => { document.body.style.overflowY = 'auto' }
   }, [isShow])

   if (!routines[index] || !expiredRoutines?.[index])
      return null

   return <>
      <div
         className={`duration-[300ms] h-[100dvh] w-full ${backDisplay ? 'flex' : 'hidden'}
          fixed bg-transparent top-0 transition-all ease-linear left-0 z-[50] modal-bg-linear-grad
          ${isShow ? 'opacity-100' : 'opacity-0'}`}>
      </div>
      <div
         onClick={() => { cb && cb[0] && cb[0]() }}
         className={`duration-[350ms] h-[100dvh] w-full ${backDisplay ? 'flex' : 'hidden'}
       fixed bg-transparent top-0 transition-all ease-linear left-0 z-[50] items-end flex text-dark dark:text-darkText
       ${isShow ? ' backdrop-blur-sm' : 'backdrop-blur-0'}`}>
      </div>

      <div className={`fixed max-h-[95vh] overflow-auto z-[51] ${isShow ? 'bottom-0' : 'bottom-[-150vh]'} left-0 p-5 rounded-t-[2.5rem] bg-white dark:bg-[#111] w-full transition-all ease-in-out duration-[400ms]`}>
         <div className='bar w-12 h-[0.3rem] bg-[#77777744] rounded-full mx-auto'></div>
         <div className="mb-5">
            <p className="text-center text-lg font-medium mb-6 mt-5 text-balance line-clamp-2 px-[10%]">{
               expired ? expiredRoutines![index].name :
                  routines[index].name
            }</p>
            {
               expired ? <>
                  {viewRoutineTyped(expiredRoutines[index])}
                  {RoutineDescription(expiredRoutines[index])}
               </>
                  : <>
                     {viewRoutineTyped(routines[index])}
                     {RoutineDescription(routines[index])}
                  </>
            }
         </div>

         <div className="flex gap-3 mt-6 mb-5 text-[0.8rem]">
            <div className="p-2.5 px-[1.3rem] bg-inputBg tap95 dark:bg-[#222] rounded-full flex justify-center items-center gap-2">
               <img src={icons.edit} className="dark:invert h-4 w-4 opacity-70" />
               <span className="font-[430]">Edit</span>
            </div>
            <div className="p-2.5 px-[1.3rem] bg-inputBg tap95 dark:bg-[#222] rounded-full flex justify-center items-center gap-2"
               onClick={() => { deleteRoutine(index, setIsShow, navigate, expired) }}
            >
               <img src={icons.del} className="dark:invert h-4 w-4 opacity-70" />
               <span className="font-[430]">Delete</span>
            </div>
         </div>

         <div className="mt-7">
            <button className="no-highlight text-sm tap99 w-full bg-accent text-white font-medium p-[1.1rem] rounded-[0.85rem]"
               onClick={df(() => { cb && cb[1] && cb[1]() }, 80)}
            >OK</button>
         </div>
      </div >
   </>
}

function deleteRoutine(index: number, setIsShow: Function, navigate: Function, expired: boolean = false) {
   let confirm
   let confirm2
   const routines = JSON.parse(ls.get('routines') || '[]')
   if (routines[index].sub !== 'LOCAL') {
      const subscription = JSON.parse(ls.get('subscriptions') || '{}')[routines[index].sub]
      confirm = window.confirm(`Warning! This routine belongs to your subscription of ${subscription.name}. If you delete this routine, this will be restored in the next update of that subscription. Are you sure?`)
      confirm && (confirm2 = window.confirm(`Really? Are you sure you want to delete this routine?`))
      confirm = confirm && confirm2
   } else {
      confirm = window.confirm('Are you sure you want to delete this routine?')
   }

   if (!confirm) return

   if (expired) {
      const expiredRoutines = JSON.parse(ls.get('expiredRoutines') || '[]')
      expiredRoutines.splice(index, 1)
      ls.set('expiredRoutines', JSON.stringify(expiredRoutines))

   } else {
      routines.splice(index, 1)
      ls.set('routines', JSON.stringify(routines))
   }

   setIsShow(false)
   console.log("Navigating to...")
   // If in the routines tab then go to home else go to routines tab
   if (window.location.pathname.endsWith('/routines') || window.location.pathname.endsWith('/routines/'))
      navigate('/', { replace: true })
   else
      navigate('/routines', { replace: true })
}

function RoutineDescription(routine: Routine) {
   if (!routine.description)
      return
   return <div className="description">
      {/* <p className='text-xs text-grey'>Description </p> */}
      <p className='text-sm p-4 bg-inputBg dark:bg-[#222] font-[430] rounded-xl mt-2 tap99'>{routine.description}
         <span className="opacity-40 text-xs font-medium"> #{routine.sub}</span>
      </p>
   </div>
}