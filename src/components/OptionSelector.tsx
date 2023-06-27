import { useEffect } from "react"
import delay from "../lib/delay"

export type OptionsSelectorOptions = { name: string, value: string }[]

type OptionSelectorArg = {
   children: JSX.Element,
   isOpen: boolean,
   setIsOpen: Function,
   options: OptionsSelectorOptions,
   setOption: Function,
   heading: string,
   description?: string,
   callback?: Function
}

export default function OptionSelector({ children, isOpen, setIsOpen, options, setOption, heading, description, callback = () => { } }: OptionSelectorArg) {
   useEffect(() => {
      if (isOpen) document.body.style.overflowY = 'hidden'
      return () => { document.body.style.overflowY = 'auto' }
   }, [isOpen])

   return <>
      <div className={`h-[100vh] w-[100vw] left-0 top-0 fixed justify-center items-center bg-black/20 dark:bg-transparent backdrop-blur-sm
         ${isOpen ? 'flex' : 'hidden'} z-[70]`}
         onClick={() => {
            setIsOpen(false)
         }}
      >
         <div className="bg-white dark:bg-[#1a1a1a] p-4 py-0 px-0 min-h-[100px] w-[80%] rounded-3xl overflow-hidden backdrop-blur-sm">
            <p className="text-center font-semibold py-5 pt-6">{heading}</p>
            <div className={`flex flex-col justify-center items-start tracking-wide`}>
               {
                  options.map((option, index) => {
                     return <p onClick={() => {
                        setIsOpen(false), setOption(option.value), callback()
                     }} key={index}
                        className="p-4 border-gray-100 dark:border-[#ffffff15] border-t-[1.1px] 
                      active:bg-gray-100 dark:active:bg-gray-800 
                        text-sm w-full font-[450] text-center text-blue-500">{option.name}</p>
                  })
               }
               <p onClick={() => setIsOpen(false)}
                  className="p-4 border-gray-100 dark:border-[#ffffff10] border-t-[1.1px] pb-6
                        active:bg-gray-100 dark:active:bg-gray-800 text-sm w-full font-[450] text-center text-red-500">Cancel</p>
            </div>
         </div>
      </div >
      {children}
   </>
}