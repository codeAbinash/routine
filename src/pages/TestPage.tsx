import React from 'react';
// import { BackupUi } from './More'

export default function TestPage() {
   const modalRef = React.useRef<HTMLDialogElement>(null);

   React.useEffect(() => {
      // if (modalRef.current) {
      //   modalRef.current.showModal()
      // }
   }, []);

   // return <BackupUi />

   return (
      <>
         <div className='flex min-h-[100dvh] items-center justify-center bg-white text-white'>
            <button
               className='rounded-md bg-blue-500 p-2 px-8 py-2'
               onClick={() => {
                  modalRef.current && modalRef.current.showModal();
               }}
            >
               Show
            </button>
         </div>
         <dialog
            className='fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] transform bg-white p-20 backdrop-blur-sm'
            ref={modalRef}
         >
            <div className='flex items-center justify-center'>Hello</div>
            <button
               className='rounded-md bg-blue-500 p-2 px-8 py-2'
               onClick={() => {
                  modalRef.current && modalRef.current.close();
               }}
            >
               Close
            </button>
         </dialog>
      </>
   );
}
