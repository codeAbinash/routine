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
import { useEffect, useRef, useState } from 'react'
import Emoji from 'emoji-store'


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

type Setting = {
    name: string,
    icon: string,
    callback: () => void,
    rightArrow: boolean,
    iconOriginal?: boolean
    newDot?: boolean
}

function searchSettingsInfo(settingsInfo: Setting[], query: string) {
    query = query.trim().toLowerCase()
    if (!query)
        return settingsInfo
    return settingsInfo.filter((setting: Setting) => {
        return setting.name.toLowerCase().includes(query)
    })
}

function More() {
    const settingsInfo = [
        {
            name: 'Theme',
            icon: icons.theme,
            callback: () => { },
            rightArrow: false
        },
        {
            name: 'Routine Store',
            icon: icons.calender,
            callback: () => navigate('/applyRoutine'),
            rightArrow: true
        },
        {
            name: 'Manage Routines',
            icon: icons.calender,
            callback: () => navigate('/manageRoutines'),
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

        // {
        //     name: 'Hide or Show Watermark',
        //     icon: icons.shield_cross,
        //     callback: () => {
        //         const watermark = ls.get('watermark')
        //         if (watermark === 'false') {
        //             ls.set('watermark', 'true')
        //             alert('Watermark is now visible')
        //             return
        //         }
        //         ls.set('watermark', 'false')
        //         alert('Watermark is now hidden')
        //     },
        //     rightArrow: true
        // },
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
        },
        {
            name: 'Join Telegram Channel',
            icon: icons.telegram_black,
            callback: () => window.open('https://t.me/routine_application', '_blank'),
            rightArrow: true,
            newDot: true
        },
        {
            name: 'Contributors',
            icon: icons.team,
            callback: () => {
                navigate('/author/team')
            },
            rightArrow: true,
            // iconOriginal : true
        }
    ]

    const navigate = useNavigate()
    const topElement = useRef<HTMLDivElement>(null)
    const [settingsInfoState, updateSettingsInfo] = useState<Setting[]>(settingsInfo)

    useEffect(() => {
        // Scroll to top
        topElement.current?.scrollIntoView({ behavior: 'smooth' })
    }, [])




    return (
        <div className='screen dark:text-darkText'>
            <div className="topElement" ref={topElement}></div>
            <Header title={<span>More options <TextEmoji emoji="😯" /></span>} notiIcon={true} placeholder="Search more options" oninput={(e: any) => {
                const query = e.target.value
                updateSettingsInfo(searchSettingsInfo(settingsInfo, query))
                console.log(query)
            }} />

            <section className='p-[1.2rem] pt-2'>

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
                    {settingsInfoState.map((setting: Setting, index) => {
                        if (setting.name === 'Theme')
                            return <div onClick={() => { }} className="setting flex justify-between items-center px-3 rounded-xl" key={index}>
                                <div className="nameIconContainer flex gap-4">
                                    <div className="left"><img src={icons.theme} className='w-[1.35rem] opacity-70 dark:invert dark:grayscale' /></div>
                                    <div className="right"><p className='font-[430] text-sm'>Theme</p></div>
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
                        return <div onClick={setting.callback} className="setting flex justify-between items-center p-3 py-3 rounded-xl tap99 active:bg-inputBg active:dark:bg-darkInputBg" key={index}>
                            <div className="nameIconContainer flex gap-4">
                                <div className="left"><img src={setting.icon} className={`w-5 opacity-70 ${setting.iconOriginal ? '' : 'dark:invert dark:grayscale'}`} /></div>
                                <div className="right flex gap-3 items-center"><p className='font-[430] text-sm'>{setting.name}</p>
                                    {setting.newDot && <div className="h-2 w-2 rounded-full bg-[red] shadow-sm shadow-[red]"></div>}
                                </div>
                            </div>
                            {setting.rightArrow && <div className="arrowContainer opacity-70"><img src={icons.left_arrow} className='w-[1.1rem] opacity-80 dark:invert dark:grayscale rotate-180' /></div>}
                        </div>
                    })}
                </div>
                {/* <div className='myself'>
                    <p className='text-sm text-center mt-20 text-gray'> Made with <TextEmoji emoji="☕" /> and <TextEmoji emoji="🧑🏻‍💻" /> by <a href="https://github.com/codeAbinash" target="_blank" className='text-link'>Abinash</a> <TextEmoji emoji="😊" /></p>
                    <div className='flex justify-center items-center' onClick={() => delay(() => navigate('/author/buyMeCoffee'))}>
                        <p className='tap97 mt-5 bg-accent p-4 px-9 text-xs text-white font-medium rounded-full'>Buy me a coffee?</p>
                    </div>
                </div> */}
            </section>
            <div className='pb-20'>
                <Watermark />
            </div>
            <NavBar active={3} />
        </div>
    )
}

export default More