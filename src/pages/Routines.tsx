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

function Routines() {
    const [screenRoutines, uScreenRoutines] = useState<any>([])
    useEffect(() => {
        const routines = JSON.parse(ls.get('routines') || '[]')
        // const todayRoutines: Routine[] = searchByDate(new Date(), routines)
        // searchActiveRoutine(todayRoutines)
        uScreenRoutines(routines)
        // console.clear()
    }, [])
    return (
        <div className="routines-screen screen-navbar select-none dark:bg-black dark:text-darkText">
            <Header title="All routines" notiIcon={true} placeholder="Search All Routines" />
            <section className='p-[1.2rem]'>
                <p className='text-[#777]/50 text-center mt-2 mb-5 text-sm font-medium'>All routines</p>
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
    return routines.map((routine: Routine, index) => {
        return (
            <div
                className='routine flex flex-col p-[1.2rem] rounded-[1.6rem]  input-bg tap99 dark:bg-darkInputBg'
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
                        <div className="name"><p className={`font-semibold text-[0.95rem] ${false ? 'text-white' : ''} line-clamp-2`}>{routine.name}</p></div>
                        <div className="time"><p className={`text-[0.6rem]  font-medium ${false ? 'text-white/80' : 'text-secondary'} text-right`}>{capitalize(routine.type)}</p></div>
                    </div>
                </div>
                {
                    routine.description &&
                    <div className="bottom flex flex-row gap-3">
                        <BlankEmojiLeft />
                        <div className="right flex-1 flex flex-row justify-between flex-center">
                            <div className={`description font-medium text-[0.75rem] ${false ? 'text-white/80' : 'text-secondary'} line-clamp-2`}><p>{routine.description}</p></div>
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