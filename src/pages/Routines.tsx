import React from 'react'
import NavBar from '../components/NavBar'
import icons from '../assets/icons/icons'
import { useEffect, useState } from 'react'
import Emoji from 'emoji-store'
import ls from '../lib/storage'
import { Routine } from '../lib/dateMethods'
import FloatingButton from '../components/FloatingButton'
import { capitalize } from '../lib/lib'
import Header from '../components/Header'
import { useNavigate } from 'react-router-dom'
import delay from '../lib/delay'
import Watermark from '../components/Watermark'
import TextEmoji from '../components/TextEmoji'

export function searchRoutine(routines: Array<Routine>, query: string) {
    // Return filtered routines
    query = query.trim().toLowerCase()
    if (!query) return routines
    return routines.filter((routine: Routine) => {
        return routine.name.toLowerCase().includes(query)
            || routine.description?.toLowerCase().includes(query)
            || routine.sub?.toLowerCase().includes(query)
            || routine.type.toLowerCase().includes(query)
            || routine.emoji.toLowerCase().includes(query)
    })
}

function Routines() {
    const [screenRoutines, uScreenRoutines] = useState<any>([])
    const allRoutines = JSON.parse(ls.get('routines') || '[]')
    const navigate = useNavigate()
    useEffect(() => {
        // const todayRoutines: Routine[] = searchByDate(new Date(), routines)
        // searchActiveRoutine(todayRoutines)
        uScreenRoutines(allRoutines)
        // console.clear()
    }, [])

    return (
        <div className="routines-screen screen-navbar select-none dark:bg-black dark:text-darkText">
            <Header title={<span>All Routines <TextEmoji emoji="📃" /></span>} notiIcon={true} placeholder="Search All Routines" oninput={(e: any) => {
                const query = e.target.value
                uScreenRoutines(searchRoutine(allRoutines, query))
            }}
            rightIcon = {Emoji.get('👜')}
            rightIconClick = {() => delay(() => navigate('/applyRoutine'))}
            />
            <section className='p-[1.2rem] pt-2'>
                {/* <p className='text-[#777]/50 text-center mt-2 mb-5 text-sm font-medium'>All routines</p> */}
                <div className="routines flex flex-col gap-[0.9rem]">
                    {AllRoutines(screenRoutines)}
                </div>
            </section>
            <FloatingButton />
            <Watermark />
            <NavBar active={1} />
        </div>
    )
}


function AllRoutines(routines: Array<Routine>) {
    // console.log(routines)
    const navigate = useNavigate()


    if (routines.length === 0) return (
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

    return routines.map((routine: Routine, index) => {
        return (
            <div
                className='routine flex flex-col p-[1.2rem] rounded-[1.6rem] tap99 bg-routine_bg dark:bg-darkInputBg border-[1px] border-routine_border dark:border-routine_border_dark'
                key={index}
                onClick={() => delay(() => navigate(`/viewRoutine/${index}`))}
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
                {
                    routine.description &&
                    <div className="bottom flex flex-row gap-3">
                        <BlankEmojiLeft />
                        <div className="right flex-1 flex flex-row justify-between flex-center">
                            <div className={`description font-medium text-[0.75rem] ${false ? 'text-white/80' : 'text-secondary'} line-clamp-2`}><p>{routine.description} <small className='opacity-40'>{routine.sub ? '#' + routine.sub : ''}</small></p></div>
                        </div>
                    </div>
                }
            </div>
        )
    })
}


function BlankEmojiLeft() {
    return (<div className="left opacity-0 select-none">
        <div className="emoji bg-main flex-center rounded-xl px-2 py-0 flex-1 ">
            <img src='' className='w-[26px] h-0' />
        </div>
    </div>)
}

export default Routines