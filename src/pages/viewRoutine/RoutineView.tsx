import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import delay from "../../lib/delay"
import { Routine } from "../../lib/dateMethods"
import Weekly from "./Weekly"
import Daily from "./Daily"
import TextEmoji from "../../components/TextEmoji"

export default function RoutineView({ show, routine, cb }: { show: boolean, routine: Routine | null, cb?: Array<Function | any> }) {
   const [isShow, setIsShow] = useState(false)
   const [backDisplay, setBackDisplay] = useState(false)

   useEffect(() => {
      setBackDisplay(show)
      const timer = setTimeout(() => { setIsShow(show) }, 0);
      return () => { clearTimeout(timer) }
   }, [show])


   useEffect(() => {
      if (isShow) document.body.style.overflowY = 'hidden'
      return () => { document.body.style.overflowY = 'auto' }
   }, [isShow])

   function hideModal() {
      delay(() => { setIsShow(false) })
      setTimeout(() => { setBackDisplay(false) }, 400);
   }

   if (!routine) return <></>

   return <>
      <div className={`duration-[400ms] h-[100dvh] w-full ${backDisplay ? 'flex' : 'hidden'}
       fixed bg-transparent top-0 transition-all ease-linear left-0 z-[50] items-end flex text-dark dark:text-darkText modal-bg-linear-grad
       ${isShow ? ' backdrop-blur-sm opacity-100' : 'backdrop-blur-0 opacity-0'}`}>
      </div>

      <div className={`fixed max-h-[95vh] overflow-scroll z-[101] ${isShow ? 'bottom-0' : 'bottom-[-150vh]'} left-0 p-5 rounded-t-[2.5rem] bg-white dark:bg-[#111] w-full transition-all ease-in-out duration-[400ms]`}>
         <div className='bar w-12 h-[0.3rem] bg-[#77777755] rounded-full mx-auto mb-5'></div>
         <div className="mb-5">
            <p className="text-center font-medium mb-5"><span className="text-balance">{routine.name}</span> <TextEmoji emoji={routine.emoji} /> </p>
            {viewRoutineTyped(routine)}
            {RoutineDescription(routine)}
         </div>

         <div className="">
            <button className="no-highlight tap99 w-full bg-accent text-white font-[450] p-4 rounded-xl"
               onClick={() => { delay(() => { cb && cb[1] && cb[1]() }) }}
            >OK</button>
         </div>
      </div>
   </>
}

function RoutineDescription(routine: Routine) {
   return <div className="description mt-6">
      {/* <p className='text-xs text-grey'>Description </p> */}
      <p className='text-sm p-4 bg-inputBg dark:bg-darkInputBg rounded-xl mt-2 tap99'>{routine.description}</p>
   </div>
}




function viewRoutineTyped(routine: Routine) {
   if (routine.type === 'weekly') {
      return <Weekly routine={routine} />
   }
   if (routine.type === 'daily') {
      return <Daily routine={routine} />
   }
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

