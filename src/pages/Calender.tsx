import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import icons from '../assets/icons/icons'
import FloatingButton from '../components/FloatingButton'
import NavBar from '../components/NavBar'
import { getMonthYear } from '../lib/date'
import searchByDate, { searchActiveRoutine } from '../lib/dateMethods'
import delay from '../lib/delay'
import ls from '../lib/storage'
import { GetRoutines } from './NewRoutinesLoader'
import { Routine } from '../lib/dateMethods'
import { getFormattedDate, getDay } from '../lib/date'



function Calender() {
  const navigate = useNavigate()
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const now = new Date()
  const [calenderDays, setCalendarDays] = useState([...getCalendarArray(now)])
  const [currentDate, setCurrentDate] = React.useState(now.getDate())
  const [currentMonth, setCurrentMonth] = React.useState(now.getMonth())
  const [currentYear, setCurrentYear] = React.useState(now.getFullYear())
  const [date, setDate] = React.useState(new Date(currentYear, currentMonth, currentDate))
  const [routineDate, setRoutineDate] = useState(now)
  const routines = JSON.parse(ls.get('routines') || '[]')
  const routinesOfTheDay = searchByDate(routineDate, routines)
  routines.forEach((routine: Routine, index: number) => { routine.index = index })
  const topElement = useRef<HTMLDivElement>(null)


  searchActiveRoutine(routinesOfTheDay)

  useEffect(() => {
    // Scroll to top
    if (topElement.current)
      topElement.current.scrollIntoView({ behavior: 'smooth' })
  }, [])


  return (
    <div className='screen dark:text-darkText screen pb-[150px]'>
      <div className="scrollToTop" ref={topElement}></div>
      <div className="topArea">
        <header className='p-4 flex justify-between items-center flex-row'>
          <div
            onClick={() => {
              let date = new Date(currentYear, currentMonth - 1, currentDate)
              handleDateClick(date)
            }}
            className="left">
            <img src={icons.left_arrow} className='tap opacity-80 dark:invert w-[2.6rem] aspect-square p-2 rounded-xl active:bg-inputBg' />
          </div>
          <div className="middle flex justify-center items-center gap-2">
            <p className='font-medium'>{getMonthYear(date)}</p>
            {
              !isSameMonth(now, date) &&
              <div className='bg-accent rounded-full text-[0.6rem] py-1 px-3 tap active shadow-lg shadow-accent/50 text-white'
                onClick={() => delay(() => {
                  handleDateClick(now)
                  setRoutineDate(now)
                }, 60)}
              >Now</div>
            }
          </div>
          <div className="right"
            onClick={() => {
              let date = new Date(currentYear, currentMonth + 1, currentDate)
              handleDateClick(date)
            }}
          >
            <img src={icons.left_arrow} className='tap opacity-80 dark:invert w-[2.6rem] aspect-square p-2 rounded-xl rotate-180 active:bg-inputBg' />
          </div>
        </header >
        <div className="calender p-4">
          <div className="calenderDayHeadings flex w-full">
            {
              days.map((day, index) => {
                let isWeekEnd = index % 6 === 0
                return (
                  <div className="day w-[calc(100%/7)]" key={index}>
                    <p className={`text-center text-xs text-gray font-medium ${isWeekEnd ? 'opacity-60' : ''}`}>{day}</p>
                  </div>
                )
              })
            }
          </div>
          <div className="calenderDays mt-4">
            {
              calenderDays.map((week: [number], i: number) => {
                const date = new Date(currentYear, currentMonth, 1)
                return (
                  <div className="week flex w-full" key={i}>
                    {
                      week.map((day: number, j: number) => {
                        let isWeekEnd = j % 6 === 0
                        if (day !== 0) {
                          date.setDate(day)
                          return (
                            <div className={`day flex-1 rounded-xl aspect-square flex justify-center items-center tap97 calenderDate`} key={j}>
                              <div className={
                                `flex justify-center items-center contain rounded-xl w-[80%] aspect-square transition border-transparent
                              ${checkIfSameDate(now, date) ? 'active bg-accent shadow-xl shadow-accent/50 text-white' : ''}
                              hover:border-accent hover:border-2`
                              }
                                onClick={() => {
                                  const date = new Date(currentYear, currentMonth, day)
                                  setRoutineDate(date)
                                }}
                              >
                                <p className={
                                  `text-center text-xs font-medium p-2  aspect-square ${isWeekEnd ? 'opacity-60' : ''}  
                                  ${checkIfSameDate(now, date) ? 'text-white' : ''}`
                                }>{day}</p>
                              </div>
                            </div>
                          )
                        }
                        else
                          return (
                            <div className="day flex-1 opacity-0 select-none" key={j}>
                              <p className='text-center text-xs text-secondary'>X</p>
                            </div>
                          )
                      })
                    }
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
      <div className='events'>
        <p className='text-[#777]/50 text-center my-5 text-xs font-medium'>Routines for {getFormattedDate(routineDate)}, {getDay(routineDate)}</p>
        <div className="routines flex flex-col gap-3 p-4">
          {GetRoutines(routinesOfTheDay, navigate)}
        </div>
      </div>
      <FloatingButton />
      <NavBar active={2} />
    </div >
  )
  function handleDateClick(date: Date) {
    setCurrentDate(date.getDate())
    setCurrentMonth(date.getMonth())
    setCurrentYear(date.getFullYear())
    setDate(date)
    setCalendarDays([...getCalendarArray(date)])
  }
}




function getCalendarArray(date: Date) {
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  const calenderDays: any = []

  let day = 1
  for (let i = 0; i < 6; i++) {
    calenderDays.push([])
    for (let j = 0; j < 7; j++) {
      let currentDay = i * 7 + j
      if (currentDay >= firstDay && currentDay < lastDay + firstDay) {
        calenderDays[i].push(day)
        day++
      }
      else
        calenderDays[i].push(0)
    }
  }
  return calenderDays
}

function checkIfSameDate(date1: Date, date2: Date) {
  // console.log(date1, date2)
  return date1.getDate() === date2.getDate() && date1.getMonth() === date2.getMonth() && date1.getFullYear() === date2.getFullYear()
}

function isSameMonth(date1: Date, date2: Date) {
  return date1.getMonth() === date2.getMonth() && date1.getFullYear() === date2.getFullYear()
}


export default Calender