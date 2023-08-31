import React, { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import icons from '../assets/icons/icons';
import headerIntersect from '../lib/headerIntersect';
import Emoji from 'emoji-store';

function Header(props: any) {
   const navigate = useNavigate();
   const headerTitle = useRef<HTMLParagraphElement>(null);
   const inputRef = useRef<HTMLInputElement>(null);
   const [isIntersecting, setIsIntersecting] = React.useState(true);
   // { title, notiIcon, placeholder, onSearch }: { title: string, notiIcon: boolean, placeholder: string, onSearch: Function | any }
   const title = props.title || 'Sample Title';
   const notiIcon = props.notiIcon || false;
   const placeholder = props.placeholder || 'Search';
   const oninput = props.oninput || function (e: any) {};
   const onSearch = props.onSearch || function (e: any) {};
   const rightIcon = props.rightIcon || Emoji.get('🔔');

   const rightIconClick =
      props.rightIconClick ||
      function () {
         navigate('/notifications');
      };

   // onsearch
   useEffect(() => {
      headerIntersect(headerTitle.current as Element, setIsIntersecting);
      // headerTitle.current?.scrollIntoView()
   }, []);

   return (
      <>
         <header className='bg-main z-20 w-full overflow-hidden dark:bg-black dark:text-darkText'>
            <div className='heading flex flex-row items-center justify-between gap-2 px-5 pt-2'>
               <p className='text-xl font-bold' ref={headerTitle}>
                  {title}
               </p>
               <div className={`notification tap ${notiIcon ? 'opacity-100' : 'opacity-0'}`} onClick={rightIconClick}>
                  <div className='dot absolute ml-7 mt-2 h-2 w-2 rounded-full bg-accent opacity-0'></div>
                  {/* <img src={icons.notification} className='w-10 p-3 rounded-md opacity-80 dark:invert dark:grayscale dark:opacity-70' /> */}
                  <img src={rightIcon} className='w-12 rounded-md p-3' />
               </div>
            </div>
         </header>
         <div
            className={`${
               isIntersecting ? '' : 'shadow-sm dark:shadow-[#77777715]'
            } input-div sticky top-0 z-50 mt-[-1px] bg-white/70 px-5 py-3
                backdrop-blur-md transition dark:bg-black/60
            `}
         >
            <div className='flex rounded-[var(--border-radius)] bg-[#0000000f] font-[470] dark:bg-[#fff]/10'>
               <div className='search-icon flex items-center justify-center pl-3.5'>
                  <img src={icons.search_black_48dp} className='h-[1.65rem] w-[1.65rem] opacity-30 dark:invert' />
               </div>
               <input
                  type='search'
                  placeholder={placeholder}
                  className='search-full bg-transparent font-[470] placeholder:text-[#000]/30 dark:placeholder:text-[#fff]/30'
                  onFocus={() => {
                     // inputRef.current?.scrollIntoView({behavior: "smooth", block : "start", inline : 'start'})
                     // inputRef.current?.scrollTo(-5,-5)
                  }}
                  onInput={oninput}
                  ref={inputRef}
               />
            </div>
         </div>
      </>
   );
}

export default Header;
