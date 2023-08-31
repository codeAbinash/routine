function LoadingRoutine() {
   return (
      <div className='flex items-center justify-center'>
         <div
            className='routine tap99 flex w-full flex-col flex-wrap rounded-[1.6rem] border-[1px] border-routine_border bg-routine_bg p-[1.2rem] dark:border-routine_border_dark dark:bg-darkInputBg md:w-[49.5%] lg:w-[32.5%]'
            key='{randomString(5)}'
         >
            <div className='top flex flex-row gap-3'>
               <div className='left'>
                  <div className='emoji bg-main aspect-square flex-1 rounded-xl p-2 dark:bg-black/40'>
                     <div className='h-6 w-6 animate-pulse rounded-full bg-gray-300 dark:bg-[#ffffff20]'></div>
                  </div>
               </div>
               <div className='right flex flex-1 flex-col justify-between'>
                  <div className='h-[1.2rem] w-[100%] animate-pulse rounded bg-gray-200 dark:bg-[#ffffff10]'></div>
                  <div className='routine-description mt-2 w-full'>
                     <div className='mt-2 h-3.5 w-[90%] animate-pulse rounded bg-gray-200 dark:bg-[#ffffff10]'></div>
                  </div>
                  <div className='routine-description w-full'>
                     <div className='mt-2 h-3.5 w-[50%] animate-pulse rounded bg-gray-200 dark:bg-[#ffffff10]'></div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}

export default function LoadingRoutines() {
   return (
      <div className='flex w-full flex-col gap-3'>
         <LoadingRoutine />
         <LoadingRoutine />
         <LoadingRoutine />
         <LoadingRoutine />
         <LoadingRoutine />
         <LoadingRoutine />
      </div>
   );
}
