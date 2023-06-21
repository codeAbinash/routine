import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import delay from '../lib/delay'
import Emoji from 'emoji-store'

export default function BottomModal({ show, children, btnTxt, cb }: { show: boolean, children: any, btnTxt?: Array<any>, cb?: Array<Function | any> }) {
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

   return <>
      <div className={`duration-[400ms] h-[100dvh] w-full ${backDisplay ? 'flex' : 'hidden'} fixed bg-transparent top-0 transition-all ease-linear left-0 z-[100] items-end flex text-dark dark:text-darkText modal-bg-linear-grad ${isShow ? ' backdrop-blur-sm opacity-100' : 'backdrop-blur-0 opacity-0'}`}>
      </div>

      <div className={`fixed max-h-[95vh] overflow-scroll z-[101] ${isShow ? 'bottom-0' : 'bottom-[-150vh]'} p-5 rounded-t-[2.5rem] bg-white dark:bg-[#111] w-full transition-all ease-in-out duration-[400ms]`}>
         <div className='bar w-12 h-[0.3rem] bg-[#77777755] rounded-full mx-auto mb-12'></div>

         {/*Show children*/}
         {children}

         {/*Show cancel and store button*/}
         <div className='flex gap-3 mt-12 justify-between items-center text-[0.8rem] font-[500] no-highlight'>
            <button className='bg-[#77777722] rounded-full py-4 flex-1 tap95' onClick={() => { hideModal(); delay(() => { cb && cb[0] && cb[0]() }) }}>
               {(btnTxt && btnTxt[0]) ? btnTxt[0] : 'Cancel'}
            </button>
            <button className='flex-1 bg-accent rounded-full text-white py-4 tap95' onClick={() => { delay(() => { cb && cb[1] && cb[1]() }) }}>
               {(btnTxt && btnTxt[1]) ? btnTxt[1] : 'Ok'}
            </button>
         </div>
      </div>
   </>
}


export function BasicModal({ text, desc, emoji }: { text: any, desc?: any, emoji?: any }) {
   return <>
      <p className='text-center text-xl font-semibold px-[7%] text-balance'>{text}</p>
      <div className='animate-bounce-slow mt-10 mb-10'><img src={Emoji.get(emoji || '🤔')} alt="emoji" className={`mx-auto mt-5 w-24 h-24`} /></div>
      <p className='text-center text-grey text-xs mt-5 font-[450] px-[7%] text-balance'>
         {desc}
      </p>
   </>
}