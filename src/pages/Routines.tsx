import Emoji from 'emoji-store'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import FloatingButton from '../components/FloatingButton'
import Header from '../components/Header'
import Loading from '../components/Loading'
import NavBar from '../components/NavBar'
import TextEmoji from '../components/TextEmoji'
import Watermark from '../components/Watermark'
import { getFormattedDate } from '../lib/date'
import { Routine, TypedList, TypedTypes } from '../lib/dateMethods'
import delay, { df } from '../lib/delay'
import { capitalize, debounce, randomString, vibrantColors7 } from '../lib/lib'
import ls from '../lib/storage'
import RoutineView from './viewRoutine/RoutineView'

export function searchRoutine(routines: Routine[], query: string) {
    // Return filtered routines 
    if (!query) return routines
    return routines.filter((routine: Routine) => {
        return routine.name.toLowerCase().includes(query)
            || routine.description?.toLowerCase().includes(query)
        // || routine.sub?.toLowerCase().includes(query)
        // || routine.type.toLowerCase().includes(query)
        // || routine.emoji.toLowerCase().includes(query)
    })
    // return typedList
}


function getTypedRoutines(routines: Array<Routine>) {
    // Routines 0,
    // Holiday 1
    // Calendar 2
    console.log("Typed List")
    const routineList: TypedList = {
        routines: [],
        holiday: [],
        calendar: [],
        all: routines
    };
    let i, len = routines.length

    for (i = 0; i < len; i++) {
        routines[i].index = i
        if (routines[i].type === 'calendar')
            routineList.calendar.push(routines[i])
        else if (routines[i].type === 'holiday')
            routineList.holiday.push(routines[i])
        else
            routineList.routines.push(routines[i])
    }
    return routineList
}

function Routines() {
    const allRoutines = useMemo(() => JSON.parse(ls.get('routines') || '[]'), [])
    const typedList = useMemo(() => getTypedRoutines(allRoutines), [allRoutines])
    const [currentSelectedType, setCurrentSelectedType] = useState<TypedTypes>('routines')
    const [screenRoutines, uScreenRoutines] = useState<Routine[] | null>(null)
    const topElement = useRef<HTMLDivElement>(null)

    const navigate = useNavigate()
    useEffect(() => {
        topElement.current?.scrollIntoView({ behavior: 'smooth' })
        setTimeout(() => {
            uScreenRoutines(typedList[currentSelectedType])
        }, 500);
    }, [])
    useEffect(() => {
        if (currentSelectedType === 'all' || currentSelectedType === 'holiday' || currentSelectedType === 'routines') {
            uScreenRoutines(null)
            setTimeout(() => {
                uScreenRoutines(typedList[currentSelectedType])
            }, 300);
        }
        else
            uScreenRoutines(typedList[currentSelectedType])
    }, [currentSelectedType])

    function searchFunction(e: any) {
        const query = e.target.value.trim().toLowerCase()
        if (!e.target.value.trim())
            setTimeout(() => { uScreenRoutines(typedList[currentSelectedType]) }, 100)
        else
            debounce(() => {
                uScreenRoutines(
                    searchRoutine(typedList[currentSelectedType] as Routine[], query)
                )
            })()
    }

    return (
        <div className="routines-screen screen-navbar select-none dark:bg-black dark:text-darkText">
            <div className="scrollToTop" ref={topElement}></div>
            <Header title={<span>All Routines <TextEmoji emoji="📃" /></span>} notiIcon={true} placeholder="Search All Routines"
                oninput={searchFunction}
                rightIcon={Emoji.get('👜')}
                rightIconClick={() => delay(() => navigate('/applyRoutine'))}
            />
            <section className='p-[1.2rem] pt-2'>
                {/* <p className='text-[#777]/50 text-center mt-2 mb-5 text-sm font-medium'>All routines</p> */}
                <div>
                    <div className='flex flex-wrap gap-3 pb-6'>
                        <div onClick={df(() => setCurrentSelectedType('routines'))} className={`tap95 ${currentSelectedType === 'routines' ? 'bg-accent shadow-lg shadow-accent/50 text-white' : 'bg-routine_bg dark:bg-routine_bg_dark text-gray-500 dark:text-gray-300'} rounded-full text-xs font-medium p-2 px-4`}>Routines</div>
                        <div onClick={df(() => setCurrentSelectedType('calendar'))} className={`tap95 ${currentSelectedType === 'calendar' ? 'bg-accent shadow-lg shadow-accent/50 text-white' : 'bg-routine_bg dark:bg-routine_bg_dark text-gray-500 dark:text-gray-300'} rounded-full text-xs font-medium p-2 px-4`}>Events</div>
                        <div onClick={df(() => setCurrentSelectedType('holiday'))} className={`tap95 ${currentSelectedType === 'holiday' ? 'bg-accent shadow-lg shadow-accent/50  text-white' : 'bg-routine_bg dark:bg-routine_bg_dark text-gray-500 dark:text-gray-300'} rounded-full text-xs font-medium p-2 px-4`}>Holidays</div>
                        <div onClick={df(() => setCurrentSelectedType('all'))} className={`tap95 ${currentSelectedType === 'all' ? 'bg-accent shadow-lg shadow-accent/50 text-white' : 'bg-routine_bg dark:bg-routine_bg_dark text-gray-500 dark:text-gray-300'} rounded-full text-xs font-medium p-2 px-4`}>All</div>
                    </div>
                    <div className="routines flex flex-wrap gap-[0.9rem] justify-center">
                        <AllRoutines allRoutines={allRoutines} screenRoutines={screenRoutines} />
                    </div>
                </div>
            </section>
            <FloatingButton />
            <Watermark />
            <NavBar active={1} />
        </div>
    )
}

// function GetTypedRoutines(type: TypedTypes, routines: Routine[]) {
//     if (!routines)
//         return AllRoutines(null)
//     if (type === 'routines')
//         return AllRoutines(routines)
//     else if (type === 'calendar')
//         return AllRoutines(routines.calendar)
//     else
//         if (type === 'holiday')
//             return AllRoutines(routines.holiday)
// }


function AllRoutines({ screenRoutines, allRoutines }: { screenRoutines: Routine[] | null, allRoutines: Routine[] | null }) {
    // console.log(routines)
    const navigate = useNavigate()
    const [currentRoutineViewIndex, setCurrentRoutineViewIndex] = useState(0)
    const [showRoutineModal, setRoutineModal] = useState(false)

    if (!screenRoutines || !allRoutines) {
        return <div className='min-h-[60vh] flex justify-center items-center'>
            <Loading />
        </div>
    }

    if (screenRoutines.length === 0) return (
        <div className="flex flex-col gap-10 mt-10 min-h-[50vh] justify-center items-center">
            <div className='flex flex-col gap-4 px-5'>
                <p className='text-center text-[#777]/50 text-base font-medium'>No Routine <TextEmoji emoji='😕' /></p>
                <p className='text-center text-[#777]/50 text-xs font-[450]'>You can create a new routine or apply a <br /> routine from the routine store <TextEmoji emoji='👜' /></p>
            </div>
            <button className='no-highlight block bg-dark shadow-lg shadow-dark/50 text-white py-3 px-7 text-[0.7rem] font-medium rounded-full tap97'
                onClick={() => delay(() => navigate('/applyRoutine'))}>
                Routine Store <TextEmoji emoji='👜' />
            </button>
        </div>
    )

    return <>
        <RoutineView
            show={showRoutineModal}
            routines={allRoutines}
            index={currentRoutineViewIndex}
            cb={[() => { setRoutineModal(false) }, () => { setRoutineModal(false) }]}
        />
        {
            screenRoutines.map((routine: Routine, index) => {
                return (
                    <div
                        className='lg:w-[32.5%] md:w-[49.5%] w-full flex-wrap routine flex flex-col p-[1.2rem] rounded-[1.6rem] tap99 bg-routine_bg dark:bg-darkInputBg border-[1px] border-routine_border dark:border-routine_border_dark'
                        key={randomString(5)}
                        onClick={() => {
                            setCurrentRoutineViewIndex(routine.index)
                            setRoutineModal(true)
                        }}
                    >
                        <div className="top flex flex-row gap-3">
                            <div className="left">
                                <div className="emoji bg-main aspect-square flex-center rounded-xl p-2 flex-1 dark:bg-black/40">
                                    <img src={Emoji.get(routine.emoji || '⏰')} className='w-[25px] aspect-square' />
                                </div>
                            </div>
                            <div className="right flex-1 flex flex-row justify-between flex-center gap-3">
                                <div className="name"><p className={`font-[550] text-[0.95rem] ${false ? 'text-white' : ''} line-clamp-2`}>{routine.name}</p></div>
                                <div className="time"><p className={`text-[0.6rem]  font-[450] ${false ? 'text-white/80' : 'text-secondary'} text-right`}>{capitalize(routine.type)}</p></div>
                            </div>
                        </div>
                        <RoutineDescription routine={routine} />
                        <ShowRoutineTime routine={routine} />
                    </div>
                )
            })}
    </>
}

const weekArr = ['S', 'M', 'T', 'W', 'T', 'F', 'S']


function ShowRoutineTime({ routine }: { routine: Routine }) {
    if (routine.type === 'weekly') {
        return <div className="bottom flex flex-row gap-3 mt-1">
            <LeftBlank />
            <WeeklyRoutineTime time={routine.time} />
        </div>
    }
    if (routine.type === 'calendar' || routine.type === 'holiday')
        return <div className="bottom flex flex-row gap-3">
            <LeftBlank />
            <div className="right flex-1 flex flex-row justify-between flex-center">
                <div className={`description font-medium text-[0.75rem] ${false ? 'text-white/80' : 'text-secondary'} line-clamp-2`}>
                    <p className='text-dark/40 dark:text-white/40'>On {getFormattedDate(new Date(routine.time[0]), 'long', 'numeric')}</p>
                </div>
            </div>
        </div>
    return null
}

function WeeklyRoutineTime({ time }: { time: Routine["time"] }) {
    return <div className='flex'>
        {
            weekArr.map((day, index) => {
                if (time[index])
                    return <div key={index} style={{ backgroundColor: vibrantColors7[index] }} className={`text-[0.6rem] text-white rounded-full h-5 border border-spacing-1 border-routine_bg dark:border-darkInputBg pt-0.5 font-medium w-5 ml-[-4px] flex justify-center items-center`}>{day}</div>
                return null
            })
        }
    </div>
}

export function RoutineDescription({ routine, active = false }: { routine: Routine, active?: boolean }) {
    return <div className="bottom flex flex-row gap-3">
        <LeftBlank />
        <div className="right flex-1 flex flex-row justify-between flex-center">
            <div className={`description font-medium text-[0.75rem] ${active ? 'text-white/80' : 'text-dark/60 dark:text-white/60'}  text-secondary line-clamp-2`}><p>{routine.description} <small className='opacity-50'>{routine.sub ? '#' + routine.sub : ''}</small></p></div>
        </div>
    </div>
}


function LeftBlank() {
    return (<div className="left opacity-0 select-none">
        <div className="emoji bg-main flex-center rounded-xl px-2 py-0 flex-1 ">
            <div className='w-[26px] h-0' />
        </div>
    </div>)
}

export default Routines