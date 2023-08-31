import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import delay, { df } from '../lib/delay';
import Emoji from 'emoji-store';
import { useDark } from '../lib/lib';

export default function BottomModal({
   show,
   children,
   btnTxt,
   cb,
}: {
   show: boolean;
   children: any;
   btnTxt?: Array<any>;
   cb?: Array<Function | any>;
}) {
   const [isShow, setIsShow] = useState(false);
   const [backDisplay, setBackDisplay] = useState(false);
   const dark = useMemo(useDark, []);

   useEffect(() => {
      let t1: any;
      if (show) {
         setBackDisplay(true);
         t1 = setTimeout(() => {
            setIsShow(true);
         }, 50);
      } else setIsShow(false);
      const timer = setTimeout(() => {
         setBackDisplay(show);
      }, 400);
      return () => {
         clearTimeout(timer), clearTimeout(t1);
      };
   }, [show]);

   useEffect(() => {
      if (isShow) document.body.style.overflowY = 'hidden';
      return () => {
         document.body.style.overflowY = 'auto';
      };
   }, [isShow]);

   function hideModal() {
      delay(() => {
         setIsShow(false);
      });
      setTimeout(() => {
         setBackDisplay(false);
      }, 400);
   }

   return (
      <>
         <div
            className={`h-[100dvh] w-full duration-[300ms] ${backDisplay ? 'flex' : 'hidden'}
          fixed left-0 top-0 z-[100] bg-transparent transition-all ease-linear ${dark ? '' : 'modal-bg-linear-grad'}
          ${isShow ? 'opacity-100' : 'opacity-0'}`}
         ></div>
         <div
            onClick={() => {
               cb && cb[0] && cb[0]();
            }}
            className={`h-[100dvh] w-full duration-[300ms] ${backDisplay ? 'flex' : 'hidden'}
       fixed left-0 top-0 z-[100] flex items-end bg-transparent text-dark transition-all ease-linear dark:text-darkText
       ${isShow ? ' backdrop-blur-sm' : 'backdrop-blur-0'}`}
         ></div>

         <div
            className={`fixed z-[101] max-h-[95vh] overflow-auto ${
               isShow ? 'bottom-0' : 'bottom-[-150vh]'
            } w-full rounded-t-[2.5rem] bg-white p-5 transition-all duration-[400ms] ease-in-out dark:bg-[#111]`}
         >
            <div className='bar mx-auto mb-12 h-[0.3rem] w-12 rounded-full bg-[#77777744]'></div>

            {/*Show children*/}
            {children}

            {/*Show cancel and store button*/}
            <div className='no-highlight mt-12 flex items-center justify-between gap-3 text-[0.8rem] font-[500]'>
               <button
                  className='tap95 flex-1 rounded-full bg-[#77777722] py-4'
                  onClick={() => {
                     hideModal();
                     delay(() => {
                        cb && cb[0] && cb[0]();
                     });
                  }}
               >
                  {btnTxt && btnTxt[0] ? btnTxt[0] : 'Cancel'}
               </button>
               <button
                  className='tap95 flex-1 rounded-full bg-accent py-4 text-white'
                  onClick={df(() => {
                     cb && cb[1] && cb[1]();
                  }, 80)}
               >
                  {btnTxt && btnTxt[1] ? btnTxt[1] : 'Ok'}
               </button>
            </div>
         </div>
      </>
   );
}

export function BasicModal({ text, desc, emoji }: { text: any; desc?: any; emoji?: any }) {
   return (
      <>
         <p className='text-balance px-[7%] text-center text-xl font-semibold'>{text}</p>
         <div className='animate-bounce-slow mb-10 mt-10 grid'>
            <img
               src={Emoji.get(emoji || '🤔')}
               alt='emoji'
               className={`place-1-1 mx-auto mt-5 h-24 w-24 opacity-50 blur-lg`}
            />
            <img src={Emoji.get(emoji || '🤔')} alt='emoji' className={`place-1-1 z-10 mx-auto mt-5 h-24 w-24`} />
         </div>
         <p className='text-balance mt-5 px-[5%] text-center text-xs font-[450] text-grey'>{desc}</p>
      </>
   );
}
