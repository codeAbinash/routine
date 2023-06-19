import React from 'react'
import { Routine } from '../../lib/dateMethods'
import { vibrantColors7 } from '../../lib/lib'
const routineDays = [0, 1, 2, 3, 4, 5, 6]
const routineDaysName = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

function Weekly({ routine }: { routine: Routine }) {
  const routineTime = routine.time

  return (
    <div className='mt-4'>
      <p className='text-xs text-grey mb-3'>Routine Days </p>
      <div className='flex items-center justify-between gap-2'>
        {routineDays.map((day, index) => {
          // if (routineTime[index])
          return <div className="flex flex-col w-full justify-center items-center gap-1" key={index}>
            <div className={`tap97 relative flex items-center justify-center box h-40 w-[100%] rounded-2xl ${routineTime[index] ? 'opacity-1' : 'bg-inputBg dark:bg-darkInputBg'}`}
              style={routineTime[index] ? {
                 backgroundColor: vibrantColors7[index],
                 boxShadow : "1px 6px 10px 2px" + vibrantColors7[index] + "66"
              } : {}}>
              {
                routineTime[index] &&
                <p className='rotate-90 absolute text-[0.7rem] whitespace-nowrap text-white/90'>{getSingleOrDoubleTime(routineTime[index])}</p>
              }
            </div>
            <div className="day mt-3">
              <p className='text-grey text-xs text-center'>{routineDaysName[index]}</p>
            </div>
          </div>
        }
        )}
      </div>
    </div>
  )
}

function getSingleOrDoubleTime(time: [string, string]) {
  let timeStr = ''
  if (time[0]) {
    timeStr += getTimeAmPm(time[0])
    if (time[1]) timeStr += ` - ${getTimeAmPm(time[1])}`
  }
  return timeStr
}

function addZero(num: number) {
  return num < 10 ? `0${num}` : num
}

function getTimeAmPm(timeStr: string) {
  if (!timeStr) return ''
  const time = timeStr.split(':')
  const hour = parseInt(time[0])
  const min = parseInt(time[1])
  const amPm = hour > 12 ? 'PM' : 'AM'
  const hour12 = hour > 12 ? hour - 12 : hour
  return `${addZero(hour12)}:${(addZero(min))} ${amPm}`
}




function makeRoutineGraph() {

}


export default Weekly