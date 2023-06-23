import { useState } from 'react'
import images from '../../assets/images/images'
import BackHeader from '../../components/BackHeader'
import icons from '../../assets/icons/icons'
import ls from '../../lib/storage'
import TextEmoji from '../../components/TextEmoji'

function Backup() {
    return (
        <div className='backup screen dark:text-darkText'>
            <BackHeader title='Backup your data' />
            <div className='min-h-[80dvh] p-5 flex flex-col justify-center items-center gap-7'>
                <p className='text-center text-xl font-semibold text-balance'>Backup your data <TextEmoji emoji='📂' /> </p>

                <img src={icons.backup_folder} className='w-[45%] mx-auto drop-shadow-2xl' />
                <p className='text-balance text-[0.65rem] text-center text-secondary'>
                    You can backup your data by downloading a file. This file can be used to restore your data on another device. Or you can use it to restore your data if you reinstall the app.
                </p>
                <BackupUi />
            </div>
        </div>
    )
}
function BackupUi() {
    const [isBackingUp, setIsBackingUp] = useState(false)
    const [isBackedUp, setIsBackedUp] = useState(false)

    function backupBtnClick() {
        setIsBackingUp(true)
        setTimeout(() => {
            createBackup()
            setIsBackingUp(false)
            setIsBackedUp(true)
        }, 500);
    }

    return <>
        {/* <div className='animate-bounce-slow mt-10 mb-10 '><img src={icons.backup} alt="bag" className={`mx-auto mt-5 w-24 h-24`} /></div> */}
        <div className='flex justify-center items-center pt-10'>
            <button className="no-highlight tap99 bg-dark text-white p-4 px-14 font-medium rounded-[0.65rem] text-xs"
                disabled={isBackingUp}
                onClick={backupBtnClick}
            >
                {
                    isBackingUp ? 'Preparing Backup...' : isBackedUp ? 'Backup Again' : 'Download Backup'
                }
            </button>
        </div>
        <p className='text-center text-grey text-[0.65rem] mt-5 text-balance'>This will download a backup file containing all your data. </p>
    </>
}

function createBackup() {
    const routines = JSON.parse(ls.get('routines') || '[]')
    const subscriptions = JSON.parse(ls.get('subscriptions') || '[]')

    const backup = { routines, subscriptions }

    const dataStr = JSON.stringify(backup)
    const blob = new Blob([dataStr], { type: "text/plain;charset=utf-8" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'routine_backup.json';
    a.click();
    a.remove()
    window.URL.revokeObjectURL(url);
}

export default Backup