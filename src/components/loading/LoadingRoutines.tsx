function LoadingRoutine() {
   return <div className='flex justify-center items-center'>
       <div className="lg:w-[32.5%] md:w-[49.5%] w-full flex-wrap routine flex flex-col p-[1.2rem] rounded-[1.6rem] tap99 bg-routine_bg dark:bg-darkInputBg border-[1px] border-routine_border dark:border-routine_border_dark" key="{randomString(5)}">
           <div className="top flex flex-row gap-3">
               <div className="left">
                   <div className="emoji bg-main aspect-square rounded-xl p-2 flex-1 dark:bg-black/40">
                       <div className="animate-pulse bg-gray-300 dark:bg-[#ffffff20] rounded-full h-6 w-6"></div>
                   </div>
               </div>
               <div className="right flex-1 flex flex-col justify-between">
                   <div className='w-[100%] h-[1.2rem] bg-gray-200 dark:bg-[#ffffff10] animate-pulse rounded'>
                   </div>
                   <div className="routine-description w-full mt-2">
                       <div className="w-[90%] animate-pulse bg-gray-200 dark:bg-[#ffffff10] rounded h-3.5 mt-2"></div>
                   </div>
                   <div className="routine-description w-full">
                       <div className="w-[50%] animate-pulse bg-gray-200 dark:bg-[#ffffff10] rounded h-3.5 mt-2"></div>
                   </div>
               </div>
           </div>
       </div>
   </div>
}


export default function LoadingRoutines() {
   return <div className='w-full flex flex-col gap-3'>
       <LoadingRoutine />
       <LoadingRoutine />
       <LoadingRoutine />
       <LoadingRoutine />
       <LoadingRoutine />
       <LoadingRoutine />
   </div>
}
