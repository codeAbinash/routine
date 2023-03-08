import { useState } from 'react'
import images from '../../assets/images/images'
import BackHeader from '../../components/BackHeader'

function Backup() {
    const [isBackedUp, setBackedUp] = useState(false)
    const [backupBtnText, setBackupBtnText] = useState('Backup Now')


    return (
        <div className='backup screen dark:text-darkText'>
            <BackHeader title='Backup your data' />
            <section className='p-5 flex flex-col justify-center items-center pt-16'>
                <img src={images.undraw_add_notes_re_ln36} className='w-[70%] m-auto mt-10' />
                <p className='mt-8 text-xs px-3 pt-2 text-center'>Back up your data by downloading the file. Keep it safe and use it when you next use this application or switch devices.  </p>
                {!isBackedUp && <button onClick={() => backup()} className='no-highlight tap97 mt-5 bg-accent p-4 px-9 text-xs text-white font-medium rounded-full'>{backupBtnText}</button>}
            </section>
            {
                isBackedUp && <BackUpSection />
            }
        </div>
    )
    function backup() {
        setBackupBtnText('Backing up...')
        // Write Backup Code Here
        setTimeout(() => {
            setBackedUp(true)
            setBackupBtnText('Backup Again')
        }, 1000);
        setTimeout(() => {
            setBackedUp(false)
        }, 5000);
    }
}

function BackUpSection() {
    return (
        <div className="p-5">
            <p className='text-xs text-center'>Your data has been backed up successfully.</p>
            <div className='flex flex-col gap-2 mt-5'>
                <button className='btn-full text-sm no-highlight tap99'>Download 2281416.json</button>
            </div>
        </div>
    )
}




export default Backup