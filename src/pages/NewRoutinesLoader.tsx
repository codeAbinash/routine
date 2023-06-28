import Emoji from 'emoji-store'
import { useMemo, useState } from 'react'
import '../assets/scss/index.scss'
import TextEmoji from '../components/TextEmoji'
import { getDay, getEmojiByDay, getFormattedDate, getTime, incrementDate } from '../lib/date'
import searchByDate, { Routine } from '../lib/dateMethods'
import delay from '../lib/delay'
import ls from '../lib/storage'
import { useNavigate } from 'react-router-dom'
import { capitalize } from '../lib/lib'
import { RoutineDescription } from './Routines'
import RoutineView from './viewRoutine/RoutineView'
import Loading from '../components/loading/Loading'
import icons from '../assets/icons/icons'


export default function NewRoutinesLoader() {
    const today = new Date()
    today.setDate(today.getDate() + 1)
    const [routines, setRoutines] = useState<any>([])
    const [tomorrow, setTomorrow] = useState(today)
    const lsRoutines = useMemo(() => JSON.parse(ls.get('routines') || '[]'), [])
    const navigate = useNavigate()
    // Add index property to routines
    lsRoutines.forEach((routine: Routine, index: number) => { routine.index = index })

    return <div className=''>
        <div className="routines flex flex-col gap-[0.9rem] mt-3">
            {routines.length === 0 ? <></> : <GetRoutines screenRoutines={routines} allRoutines={lsRoutines} />}
        </div>
        <button className='no-highlight m-auto block mt-10 bg-dark shadow-lg shadow-dark/50 text-white py-3 px-7 text-[0.7rem] font-medium rounded-full tap97' onClick={() => delay(loadMoreRoutines)}>
            {/* Show routines for {getFormattedDate(tomorrow)} */}
            Show More <TextEmoji emoji='🫣' />
        </button>
    </div>

    function loadMoreRoutines() {
        const notificationRoutine = {
            name: <span>{getFormattedDate(tomorrow)}, {getDay(tomorrow)} <TextEmoji emoji={getEmojiByDay(tomorrow)} /></span>,
            type: 'notification',
        }
        const noRoutine = {
            name: <span>No routine for {getFormattedDate(tomorrow)} {getDay(tomorrow)} <TextEmoji emoji='🥳' /></span>,
            type: 'notification',
        }
        setTomorrow(incrementDate(tomorrow))
        const newRoutines = searchByDate(tomorrow, lsRoutines)
        if (newRoutines.length === 0) {
            setRoutines([...routines, noRoutine])
            return
        }
        setRoutines([...routines, notificationRoutine, ...newRoutines])
    }
}

export function GetRoutines({ screenRoutines, allRoutines }: { screenRoutines: Routine[], allRoutines: Routine[] }) {
    const [currentRoutineViewIndex, setCurrentRoutineViewIndex] = useState(0)
    const [showRoutineModal, setRoutineModal] = useState(false)

    if (!screenRoutines)
        return <Loading />

    if (screenRoutines.length === 0)
        return <div className='h-[50vh] flex flex-col items-center justify-center gap-3'>
            <p className='text-[#777]/50 text-center text-sm font-medium'>No Routine <TextEmoji emoji='🤔' /></p>
            <img src={icons.app_icon_transparent_256} className="w-[50%] dark:grayscale dark:opacity-40" />
            <p className='text-xs text-center text-[#777]/50 font-medium'>Go to Routines tab to see all routines <TextEmoji emoji="💫" /></p>
        </div>

    return <>
        <RoutineView
            show={showRoutineModal}
            routines={allRoutines}
            index={currentRoutineViewIndex}
            expiredRoutines={[]}
            expired={screenRoutines ? screenRoutines[currentRoutineViewIndex]?.expired : false}
            cb={[() => { setRoutineModal(false) }, () => { setRoutineModal(false) }]}
        />
        {
            screenRoutines.map((routine: Routine, index) => {
                if (routine.type === 'notification') {
                    if (routine.name === 'Completed') {
                        return <p className='text-[#777]/50 text-center my-3 mt-10 text-sm font-medium' key={index}>Completed <TextEmoji emoji="🤩" /></p>
                    }
                    return <p className='text-[#777]/50 text-center my-3 mt-10 text-sm font-medium' key={index}>{routine.name}</p>
                }
                const isActiveRoutine = routine.status === 'active'
                const isCompleted = routine.status === 'done'

                return (
                    <div className={
                        `routine flex flex-col p-[1.2rem] rounded-[1.6rem] ${isActiveRoutine ? 'bg-accent shadow-accent/40 shadow-lg dark:bg-accent/90 z-0' : 'z-10 border-[1px] bg-routine_bg dark:bg-routine_bg_dark border-routine_border dark:border-routine_border_dark  '}
				tap99 ${isCompleted ? 'opacity-60' : ''}
                ${routine.type === 'holiday' ? 'glow-holiday' : ''}
                ${routine.type === 'calendar' ? 'glow-calendar' : ''}
                `}
                        key={index}
                        onClick={() => {
                            setCurrentRoutineViewIndex(routine.index)
                            setRoutineModal(true)
                        }}
                    >
                        <div className="top flex flex-row gap-3">
                            <div className="left">
                                <div className={`emoji aspect-square flex-center rounded-xl p-2 flex-1 ${isActiveRoutine ? 'dark:bg-white/20 bg-white/20' : 'dark:bg-black/40 bg-white'}`}>
                                    <img src={Emoji.get(routine.emoji || '⏰')} className='w-[25px] aspect-square' />
                                </div>
                            </div>
                            <div className={`right flex-1 flex flex-row justify-between flex-center gap-3 `}>
                                <div className="name"><p className={`font-[550] text-[0.95rem] line-clamp-2 ${isActiveRoutine ? 'text-white' : ''}`}>{routine.name}</p></div>
                                <div className="time"><p className={`text-[0.6rem] whitespace-nowrap font-[450] ${isActiveRoutine ? 'text-white/80' : 'text-secondary'} text-right`}>{GetDisplayTime(routine)}</p></div>
                            </div>
                        </div>
                        {
                            routine.description &&
                            <RoutineDescription routine={routine} active={isActiveRoutine} />
                        }
                        {
                            isActiveRoutine &&
                            <div className="bottom flex flex-row gap-3">
                                <BlankEmojiLeft />
                                <div className="right w-full flex-1 mt-2">
                                    <div className="sliderContainer flex-row flex gap-[0.35rem] justify-center items-center flex-1">
                                        <p className='text-[0.6rem] font-medium whitespace-nowrap text-white/80'>{routine.passed}</p>
                                        <div className="slider w-full h-1 bg-[#ffffff55] rounded-xl">
                                            <div className="slide bg-white w-[50%] h-1 rounded-xl" style={{ width: `${routine.percentage}%` }}></div>
                                        </div>
                                        <p className='text-[0.6rem] font-medium text-white/80 whitespace-nowrap'>{routine.left}</p>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                )
            })
        }
    </>

}
function BlankEmojiLeft() {
    return (<div className="left opacity-0 select-none">
        <div className="emoji bg-main flex-center rounded-xl px-2 py-0 flex-1 ">
            <img src='' className='w-[26px] h-0' />
        </div>
    </div>)
}
function GetDisplayTime(routine: Routine) {
    if (routine.type === 'calendar') {
        return <>{capitalize(routine.type)} <br /> <span className='text-lg'><TextEmoji emoji="🎉"></TextEmoji></span></>
    }
    else if (routine.type === 'holiday') {
        return <>{capitalize(routine.type)} <br /> <span className='text-lg'><TextEmoji emoji="🥳"></TextEmoji></span></>
    }
    else {
        // const hour = 
        if (routine.endTime) {
            return <><span className='whitespace-nowrap'>{getTime(routine.startTime)}</span> <br /><span className='whitespace-nowrap'>{getTime(routine.endTime)}</span></>
        }
        else {
            return <span className='whitespace-nowrap'>{getTime(routine.startTime)}</span>
        }
    }
}