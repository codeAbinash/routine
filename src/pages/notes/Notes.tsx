import { useMemo } from "react";
import BackHeader from "../../components/BackHeader";
import ls from "../../lib/storage";

function getNotesFromLs(): any[] {
   return JSON.parse(ls.get('notes') || '[]')
}

export default function Notes() {
   const notes = useMemo(getNotesFromLs, [])

   if (notes.length === 0) {
      return <div className="screen text-dark dark:text-darkText">
         <BackHeader title="Quick Note" />
         <div className="min-h-[80vh] flex justify-center items-center flex-col">
            <h2 className="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-5xl sm:leading-none md:text-6xl">
               Quick<span className="text-indigo-600">Note</span>
            </h2>
            <h3 className='text-md md:text-3xl mt-1'>Coming Soon</h3>
         </div>
      </div>
   }

   return (
      <div>
         <BackHeader title="Notes" />
      </div>
   )
}