import { useNavigate } from 'react-router-dom'
import icons from '../assets/icons/icons'
import NavBar from '../components/NavBar'
import ls from '../lib/storage'
import { applyTheme } from '../lib/theme'
// import icons from '../assets/icons/icons'
import Header from '../components/Header'
import TextEmoji from '../components/TextEmoji'
import details from '../info'
import delay, { df } from '../lib/delay'
import Watermark from '../components/Watermark'
import { useEffect, useRef } from 'react'
function changeTheme(theme: any) {
    ls.set('theme', theme)
    applyTheme(theme)
}

function getCurrentTheme() {
    let theme = localStorage.getItem('theme')
    if (!theme)
        theme = 'default'
    return theme
}



function More() {
    const navigate = useNavigate()
    const topElement = useRef<HTMLDivElement>(null)
    useEffect(()=>{
        // Scroll to top
        topElement.current?.scrollIntoView({ behavior: 'smooth' })
    }, [])
    const settingsInfo = [
        {
            name: 'Apply Default Routines',
            icon: icons.calender,
            callback: () => navigate('/applyRoutine'),
            rightArrow: true
        },
        {
            name: 'Backup your data',
            icon: icons.backup,
            callback: () => navigate('/backup'),
            rightArrow: true
        },
        {
            name: 'Restore from backup file',
            icon: icons.restore,
            callback: () => navigate('/restore'),
            rightArrow: true
        },
        {
            name: 'Hide or Show Watermark',
            icon: icons.shield_cross,
            callback: () => {
                const watermark = ls.get('watermark')
                if (watermark === 'false') {
                    ls.set('watermark', 'true')
                    alert('Watermark is now visible')
                    return
                }
                ls.set('watermark', 'false')
                alert('Watermark is now hidden')
            },
            rightArrow: true
        },

        {
            name: 'Reset everything',
            icon: icons.shield,
            callback: () => {
                const confirm1 = window.confirm('Resetting everything will delete all your routines, subscriptions, and settings. Are you sure you want to continue?')
                let confirm2
                confirm1 && (confirm2 = window.confirm('Are you sure you want to reset everything?'))
                if (confirm2 && confirm1) {
                    ls.clear()
                    navigate('/', { replace: true })
                }
            },
            rightArrow: true
        }
    ]
    return (
        <div className='screen dark:text-darkText'>
            <div className="topElement" ref={topElement}></div>
            <Header title="More options" notiIcon={true} placeholder="Search more options" />

            <section className='p-[1.2rem]'>

                <div className="w-full p-6 bg-dark rounded-3xl text-white tap99" onClick={df(() => navigate('/changelog'))}>
                    <div className=" flex justify-between w-full items-center">
                        <div className="left">
                            <p className='text-xl font-semibold'>Routine</p>
                        </div>
                        <div className="rig">
                            <p className='text-sm text-white/70'>v{details.version}</p>
                        </div>
                    </div>
                    <p className='text-xl mt-2'> <TextEmoji emoji="😎" /> <TextEmoji emoji="📕" /> <TextEmoji emoji="🧑🏻‍💻" /> <TextEmoji emoji="🎓" /> <TextEmoji emoji="🏠" /> <TextEmoji emoji="😋" /> <TextEmoji emoji="😜" /></p>
                    {/* <p className='mt-2 text-white/70'>Added support for dark mode</p> */}
                    <p className="text-xs mt-3 text-white/70">Click to see full changelog</p>
                </div>

                <div className="settings w-full flex flex-col gap-2 mt-5">
                    <div onClick={() => { }} className="setting flex justify-between items-center px-3 rounded-xl">
                        <div className="nameIconContainer flex gap-4">
                            <div className="left"><img src={icons.theme} className='w-[1.35rem] opacity-70 dark:invert dark:grayscale' /></div>
                            <div className="right"><p className='font-normal'>Theme</p></div>
                        </div>
                        <div className="right" onInput={(e: any) => changeTheme(e.target.value)}>
                            <select defaultValue={getCurrentTheme()} className='appearance-none bg-inputBg dark:bg-darkInputBg p-3 text-sm px-6 text-center w-full outline-none border-none tap rounded-2xl'>
                                <option value="light">Light</option>
                                <option value="dark">Dark</option>
                                <option value="default">System Default</option>
                            </select>
                        </div>
                        {/* <div className="arrowContainer opacity-70"><img src={icons.right_arrow_next} className='w-4 opacity-70 dark:invert dark:grayscale' /></div> */}
                    </div>
                    {settingsInfo.map((setting, index) => {
                        return <div onClick={setting.callback} className="setting flex justify-between items-center p-3 py-3 rounded-xl tap99 active:bg-inputBg active:dark:bg-darkInputBg" key={index}>
                            <div className="nameIconContainer flex gap-4">
                                <div className="left"><img src={setting.icon} className='w-5 opacity-70 dark:invert dark:grayscale' /></div>
                                <div className="right"><p className='font-normal'>{setting.name}</p></div>
                            </div>
                            {setting.rightArrow && <div className="arrowContainer opacity-70"><img src={icons.left_arrow} className='w-5 opacity-80 dark:invert dark:grayscale rotate-180' /></div>}
                        </div>
                    })}
                </div>
                <div className='myself'>
                    <p className='text-sm text-center mt-20 text-gray'> Made with <TextEmoji emoji="☕" /> and <TextEmoji emoji="🧑🏻‍💻" /> by <a href="https://github.com/codeAbinash" target="_blank" className='text-link'>Abinash</a> <TextEmoji emoji="😊" /></p>
                    <div className='flex justify-center items-center' onClick={() => delay(() => navigate('/author/buyMeCoffee'))}>
                        <p className='tap97 mt-5 bg-accent p-4 px-9 text-xs text-white font-medium rounded-full'>Buy me a coffee?</p>
                    </div>
                </div>
            </section>
            <div className='pb-20'>
                <Watermark />
            </div>
            <NavBar active={3} />
        </div>
    )
}

export default More