import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import delay from '../lib/delay'

export default function BottomModal({ show, ui, btnTxt, cb }: { show: boolean, ui?: any, btnTxt?: Array<any>, cb?: Array<Function | any> }) {
   const [isShow, setIsShow] = useState(false)
   const [backDisplay, setBackDisplay] = useState(false)
   const navigate = useNavigate()

   useEffect(() => {
      setBackDisplay(show)
      const timer = setTimeout(() => { setIsShow(show) }, 0);
      return () => { clearTimeout(timer) }
   }, [show])

   function hideModal() {
      delay(() => { setIsShow(false) })
      setTimeout(() => { setBackDisplay(false) }, 400);
   }

   return <>
      <div className={`duration-[400ms] h-[100dvh] w-full ${backDisplay ? 'flex' : 'hidden'} fixed bg-transparent top-0 transition-all ease-linear left-0 z-[100] items-end flex text-dark dark:text-darkText modal-bg-linear-grad ${isShow ? ' backdrop-blur-sm opacity-100' : 'backdrop-blur-0 opacity-0'}`}>
      </div>

      <div className={`fixed z-[101] ${isShow ? 'bottom-0' : 'bottom-[-80vh]'} p-5 rounded-t-[2.5rem] bg-white dark:bg-[#111] w-full transition-all ease-in-out duration-[400ms]`}>
         <div className='bar w-12 h-[0.3rem] bg-[#77777755] rounded-full mx-auto mb-12'></div>
         {ui ? ui() : <></>}
         {/*Show cancel and store button*/}
         <div className='flex gap-3 mt-12 justify-between items-center text-[0.8rem] font-[500] no-highlight'>
            <button className='bg-[#77777722] rounded-full py-4 flex-1 tap95' onClick={() => { hideModal(); delay(() => { cb && cb[0] && cb[0]() }) }}>
               {(btnTxt && btnTxt[0]) ? btnTxt[0] : 'Cancel'}
            </button>
            <button className='flex-1 bg-accent rounded-full text-white py-4 tap95' onClick={() => { hideModal(); delay(() => { cb && cb[1] && cb[1]() }) }}>
               {(btnTxt && btnTxt[1]) ? btnTxt[1] : 'Ok'}
            </button>
         </div>
      </div>
   </>
}
