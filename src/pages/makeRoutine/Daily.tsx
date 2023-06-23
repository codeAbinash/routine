import React, { useEffect } from 'react'

function Daily({ updateRoutine }: { updateRoutine: Function }) {
    const [startTime, setStartTime] = React.useState('')
    const [endTime, setEndTime] = React.useState('')
    useEffect(() => {
        const routine = { time: [startTime, endTime] }
        updateRoutine(routine)
    }, [startTime, endTime])

    return (
        <div className="dailyMakeRoutine">
            {/* <p className="text-xs text-secondary pl-1 pb-1 mt-2">Select Routine Times</p> */}
            <div className="flex flex-col gap-1">
                <div className="top flex items-center gap-3">
                    <p className='w-[50%] text-xs text-secondary pl-1 pb-1 mt-2'>Start Time</p>
                    <p className='w-[50%] text-xs text-secondary pl-1 pb-1 mt-2'>End Time</p>
                </div>
                <div className="bottom items-center flex gap-3">
                    <input
                        type="time" onInput={(e: any) => setStartTime(e.target.value)}
                        className="input-time-small input-text bg-inputBg dark:bg-darkInputBg tap rounded-xl"
                    />
                    <input
                        type="time" onInput={(e: any) => setEndTime(e.target.value)}
                        className="input-time-small input-text bg-inputBg dark:bg-darkInputBg tap rounded-xl"
                    />
                </div>
            </div>
        </div>
    )
}

export default Daily