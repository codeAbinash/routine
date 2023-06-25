import { useNavigate } from "react-router-dom";
import icons from "../../assets/icons/icons";
import TextEmoji from "../../components/TextEmoji";
import ls from "../../lib/storage";

export default function RestoreStartup() {
   const navigate = useNavigate()

   return <div className="screen p-4 flex justify-between py-12 items-center bg-white dark:bg-black text-dark dark:text-darkText flex-col gap-10">
      <div className="flex flex-col gap-4 justify-center items-center">
         <p className="font-semibold text-3xl text-center">Restore Backup ?</p>
         <div className="text-4xl">
            <TextEmoji emoji="📂" />  <TextEmoji emoji="🤔" />
         </div>
      </div>

      <p className='text-xs text-secondary text-center text-balance'>If you backed your data previously. Click on Restore Backup button.</p>

      <div className="flex w-full justify-center items-center gap-[10%]">
         <img src={icons.restore_file} className="w-[35%]" />
         <img src={icons.backup_folder} className="w-[35%]" />
      </div>

      <div className="flex flex-col gap-2">
         <p className="text-center text-xs text-gray-500 dark:text-gray-400 text-balance">You can restore your backup <TextEmoji emoji="📂" /> from your device storage <TextEmoji emoji="😯" />.
            Just select the file  <TextEmoji emoji="📂" /> in the next screen  <TextEmoji emoji="📱" />. </p>
      </div>


      <div className="text-sm w-full flex flex-col justify-center gap-3 items-center font-medium">
         <button className="rounded-xl bg-accent highlight-none p-4 text-xs px-10 w-[80%] text-white" onClick={() => {
            navigate('/restore', { replace: true })
         }}>Restore Backup</button>
         <button className="rounded-xl bg-dark p-4 text-xs highlight-none px-10 w-[80%] text-white" onClick={() => {
            navigate('/applyRoutine', { replace: true })
         }}>Skip</button>
      </div>


   </div>
}