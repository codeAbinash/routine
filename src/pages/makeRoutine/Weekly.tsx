import delay from '../../lib/delay'

import React, { useEffect, useRef, useState } from 'react'
import { Routine } from '../../lib/dateMethods'
import { vibrantColors7 } from '../../lib/lib'
const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

function getAITime(isActiveRoutine: any, timeArr: any) {
	let generatedTime = [null, null]
	for (let i = 0; i < 7; i++) {
		if (isActiveRoutine[i]) {
			if (timeArr[i][0]) generatedTime[0] = timeArr[i][0]
			if (timeArr[i][1]) generatedTime[1] = timeArr[i][1]
		}
	}
	return generatedTime
}

function Weekly({ routine, updateRoutine }: { updateRoutine: Function, routine: Routine }) {
	const [isActiveRoutine, setIsActiveRoutine] = useState([false, true, false, true, false, true, false])
	const [timeArr, setTimeArr] = useState([[null, null], [null, null], [null, null], [null, null], [null, null], [null, null], [null, null]])

	const times: any = {}

	function updateRoutineFromData() {
		console.log(routine)
		// get generated AI times
		const [startTime, endTime] = getAITime(isActiveRoutine, timeArr)
		console.log(startTime, endTime)
		// If the routine is active set the time
		for (let i = 0; i < 7; i++) {
			if (isActiveRoutine[i])
				times[i] = timeArr[i]
			else
				delete times[i]
			// if the day is selected and the time is not set then set the time to the generated AI time
			if (isActiveRoutine[i] && !timeArr[i][0] && !timeArr[i][1] && startTime && endTime) {
				times[i] = [startTime, endTime]
				timeArr[i] = [startTime, endTime]
			}
		}
		setTimeArr([...timeArr])
		updateRoutine({ ...routine, time: times })
	}

	return (
		<div className='weeklyMakeRoutine mb-5'>
			<div className="top flex items-center gap-1">
				<p className='w-1/3 text-xs text-secondary pl-1 pb-1 mt-2 text-center'>Routine Dates</p>
				<p className='w-1/3 text-xs text-secondary pl-1 pb-1 mt-2 text-center'>Start Time</p>
				<p className='w-1/3 text-xs text-secondary pl-1 pb-1 mt-2 text-center'>End Time</p>
			</div>
			<div className='flex flex-col gap-3 mt-2'>
				{
					days.map((day, i) => {
						return (
							<div className='flex flex-row gap-3' key={i}>
								<div
									className={`tap97 dayName check ${isActiveRoutine[i] ? 'checkDiv active' : 'bg-inputBg dark:bg-darkInputBg'} px-4 py-3 rounded-xl flex-1 items-center justify-center`}
									style={isActiveRoutine[i] ? {
										backgroundColor: vibrantColors7[i],
										boxShadow: "1px 6px 10px 2px" + vibrantColors7[i] + "66"
									} : {}}
									onClick={() => {
										delay(() => {
											isActiveRoutine[i] = !isActiveRoutine[i]
											updateRoutineFromData()
											setIsActiveRoutine([...isActiveRoutine])
										})
									}}
								>
									<p className='text-center'>{day}</p>
								</div>
								<div className={`timeInput flex gap-3 flex-[3] ${isActiveRoutine[i] ? '' : 'opacity-40'} trans-opacity`}>
									<input
										type="time"
										className='trans-opacity input-time-small bg-inputBg dark:bg-darkInputBg tap rounded-xl'
										disabled={isActiveRoutine[i] ? false : true}
										value={timeArr[i][0] || ''}
										onInput={(e: any) => {
											timeArr[i][0] = e.target.value;
											updateRoutineFromData()
										}}
									/>
									<input
										type="time"
										value={timeArr[i][1] || ''}
										className='trans-opacity input-time-small bg-inputBg dark:bg-darkInputBg tap rounded-xl'
										disabled={isActiveRoutine[i] ? false : true}
										onInput={(e: any) => {
											timeArr[i][1] = e.target.value;
											updateRoutineFromData()
										}}
									/>
								</div>
							</div>
						)
					})
				}
			</div>
			<p className='text-xs text-center mt-5 text-secondary'>If it is an event, which is not in a range of time, specify only the <span className='test-medium'>Start Time</span> </p>
		</div >
	)
}


export default Weekly