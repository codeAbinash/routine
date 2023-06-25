import Emoji from "emoji-store";
import { getDay } from "../../lib/date";
import { Routine } from "../../lib/dateMethods";

export default function Calendar({ routine }: { routine: Routine }) {
   const time = new Date(routine.time[0])
   return <div>
      <div className="justify-center gap-[6%] items-center flex mb-10">
         <div className={`bg-white p-5 w-[45%] dark:bg-black calendar-shadow skew-transition duration-500
         active:skew-x-2 active:skew-y-2 active:rotate-2 transition-all shine-effect aspect-square
         rounded-3xl flex justify-between flex-col`}>
            <p className="text-center font-medium text-sm text-red-500">{getDay(time)}</p>
            <p className="text-center text-6xl font-medium">{time.getDate()}</p>
            <p className="text-center text-xs font-medium text-secondary">{time.toLocaleString('default', { month: 'long', year: "numeric" })}</p>
         </div>
         <div className={`bg-white p-[12%] w-[45%] dark:bg-black calendar-shadow skew-transition duration-500
         active:skew-x-2 active:skew-y-2 active:rotate-2 transition-all shine-effect aspect-square
         rounded-3xl justify-between flex-col grid`}>
            <img src={Emoji.get(routine.emoji)} className=" place-1-1 opacity-50 blur-lg"/>
            <img src={Emoji.get(routine.emoji)} className=" z-10 place-1-1"/>
         </div>
      </div>
   </div>
}