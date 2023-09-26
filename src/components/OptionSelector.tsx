import { useEffect } from 'react';

export type OptionsSelectorOptions = { name: string; value: string }[];

type OptionSelectorArg = {
   children: JSX.Element;
   isOpen: boolean;
   setIsOpen: Function;
   options: OptionsSelectorOptions;
   setOption: Function;
   heading: string;
   description?: string;
   callback?: Function;
};

export default function OptionSelector({
   children,
   isOpen,
   setIsOpen,
   options,
   setOption,
   heading,
   description,
   callback = () => {},
}: OptionSelectorArg) {
   useEffect(() => {
      if (isOpen) document.body.style.overflowY = 'hidden';
      return () => {
         document.body.style.overflowY = 'auto';
      };
   }, [isOpen]);

   return (
      <>
         <div
            className={`fixed left-0 top-0 h-[100vh] w-[100vw] items-center justify-center bg-black/20 backdrop-blur-sm dark:bg-transparent
         ${isOpen ? 'flex' : 'hidden'} z-[70]`}
            onClick={() => {
               setIsOpen(false);
            }}
         >
            <div className='min-h-[100px] w-[80%] overflow-hidden rounded-3xl bg-white p-4 px-0 py-0 backdrop-blur-sm dark:bg-[#1a1a1a]'>
               <p className='py-5 pt-6 text-center font-semibold'>{heading}</p>
               <div className={`flex flex-col items-start justify-center tracking-wide`}>
                  {options.map((option, index) => {
                     return (
                        <p
                           onClick={() => {
                              setIsOpen(false), setOption(option.value), callback();
                           }}
                           key={index}
                           className='w-full border-t-[1.1px] border-gray-100 p-4 
                      text-center text-sm 
                        font-[450] text-blue-500 active:bg-gray-100 dark:border-[#ffffff15] dark:active:bg-gray-800'
                        >
                           {option.name}
                        </p>
                     );
                  })}
                  <p
                     onClick={() => setIsOpen(false)}
                     className='w-full border-t-[1.1px] border-gray-100 p-4 pb-6
                        text-center text-sm font-[450] text-red-500 active:bg-gray-100 dark:border-[#ffffff10] dark:active:bg-gray-800'
                  >
                     Cancel
                  </p>
               </div>
            </div>
         </div>
         {children}
      </>
   );
}
