import React from 'react'
import { BackupUi } from './More'

export default function TestPage() {
  const modalRef = React.useRef<HTMLDialogElement>(null)

  React.useEffect(() => {
    // if (modalRef.current) {
    //   modalRef.current.showModal()
    // }
  }, [])

  return <BackupUi />

  return (
    <>
      <div className='min-h-[100dvh] flex justify-center items-center text-white bg-white'>
        <button
          className='bg-blue-500 p-2 rounded-md px-8 py-2'
          onClick={() => { modalRef.current && modalRef.current.showModal() }}
        >Show</button>
      </div>
      <dialog
        className='fixed p-20 bg-white left-[50%] top-[50%] transform translate-x-[-50%] translate-y-[-50%] backdrop-blur-sm'
        ref={modalRef}
      >
        <div className='flex justify-center items-center'
        >Hello</div>
        <button className='bg-blue-500 p-2 rounded-md px-8 py-2'
          onClick={() => { modalRef.current && modalRef.current.close() }}
        >Close</button>
        

      </dialog>
    </>
  )
}
