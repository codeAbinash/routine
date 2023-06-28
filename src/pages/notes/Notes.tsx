import { useMemo } from "react";
import BackHeader from "../../components/BackHeader";
import ls from "../../lib/storage";

function getNotesFromLs(): any[] {
   return JSON.parse(ls.get('notes') || '[]')
}

export default function Notes() {
   const notes = useMemo(getNotesFromLs, [])

   if (notes.length === 0) {
      return <div className="screen">
         <BackHeader title="Notes" />
         <div className="min-h-[80vh]">
            <p>Write Almost anything!</p>
            <p>Supports markdown!</p>
            
         </div>
      </div>
   }

   return (
      <div>
         <BackHeader title="Notes" />
      </div>
   )
}