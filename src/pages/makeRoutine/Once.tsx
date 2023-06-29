import { useEffect, useRef, useState } from 'react'
import { getISODate } from '../../lib/date'
import { Routine } from '../../lib/dateMethods'

const tomorrow = new Date()
tomorrow.setDate(tomorrow.getDate() + 1)

function Once({ updateRoutine, routine }: { updateRoutine: Function, routine: Routine }) {
    const [startTime, setStartTime] = useState(routine?.time[0] || getISODate(tomorrow))
    const [endTime, setEndTime] = useState<any>(routine?.time[1] || getISODate(tomorrow))
    const startTimeInput = useRef<any>()
    const endTimeInput = useRef<any>()

    useEffect(() => {
        updateRoutine({ time: [startTime, endTime] })
    }, [startTime, endTime])

    function setEndTimeAsStartTime(e: any) { if (!endTime) setEndTime(e.target.value) }

    return (<div>
        <div className="inputTime mt-2 flex flex-col gap-2 w-full">
            <div className="bottom flex-1">
                <p className='text-xs text-secondary pl-1 pb-1'>Start date and time</p>
                {/* <input type="text" className=' bg-inputBg dark:bg-darkInputBg appearance-none focus:outline-accent tap-99 h-0 w-0'
                    onClick={(e: any) => {
                        startTimeInput.current.click()
                        e.target.disabled = true
                    }}
                    value={getISODateWithTime(startTime)} placeholder='Select start time' /> */}
                <input
                    ref={startTimeInput} defaultValue={startTime}
                    onInput={(e: any) => { setStartTime(e.target.value); setEndTimeAsStartTime(e) }}
                    type="datetime-local" className='input-text bg-inputBg dark:bg-darkInputBg appearance-none tap-99'
                />
            </div>
            <div className="bottom flex-1">
                <p className='text-xs text-secondary pl-1 pb-1'>End date and time</p>
                {/* <input type="text" className='bg-inputBg dark:bg-darkInputBg appearance-none tap-99 h-0 w-0'
                    onClick={(e: any) => {
                        endTimeInput.current.click()
                        e.target.disabled = true
                    }}
                    value={endTime ? getISODateWithTime(endTime) : ""} placeholder='Select end time' /> */}
                <input ref={endTimeInput} defaultValue={endTime}
                    onInput={(e: any) => setEndTime(e.target.value)} type="datetime-local"
                    className='input-text bg-inputBg dark:bg-darkInputBg appearance-none tap-99'
                />
            </div>
        </div>

    </div>
    )
}

export default Once