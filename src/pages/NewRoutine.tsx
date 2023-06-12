import Emoji from 'emoji-store';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import icons from '../assets/icons/icons';
import BackHeader from '../components/BackHeader';
import { day } from '../lib/date';
import ls from '../lib/storage';
import Daily from './makeRoutine/Daily';
import Once from './makeRoutine/Once';
import Weekly from './makeRoutine/Weekly';
import TextEmoji from '../components/TextEmoji';
import BottomModal, { BasicModal } from '../components/BottomModal';
import { MODAL_BUTTON_TEXT } from '../lib/lib';

function NewRoutine() {
	const e = new Emoji();
	let emojiList = ['📕', '🧑🏻‍💻', '🏃🏻‍♂️', '🎨', '👻']
	const [routineName, setRoutineName] = useState('')
	const [routineDescription, setRoutineDescription] = useState('')
	const [routineEmoji, setRoutineEmoji] = useState('')
	const [routineType, setRoutineType] = useState('weekly')
	const [routine, setRoutine] = useState<any>({})
	const navigate = useNavigate()
	const topElement: any = useRef<HTMLDivElement>()

	const [modalShow, setModalShow] = useState(false)
	const [modalBtnText, setModalBtnText] = useState(MODAL_BUTTON_TEXT)
	const [modalUi, setModalUi] = useState(<BasicModal text="THis is a sample error" />)
	const BLANK_MODAL_CB = useMemo(() => [() => setModalShow(false), () => setModalShow(false)], [])
	const [modalCallback, setModalCallback] = useState(BLANK_MODAL_CB)

	function setBlankAndShowModal() {
		setModalBtnText(MODAL_BUTTON_TEXT)
		setModalCallback(BLANK_MODAL_CB)
		setModalShow(true)
	}


	function goBack() {
		navigate(-1)
	}
	useEffect(() => {
		console.log(routine)
	}, [routine])

	useEffect(() => {
		topElement.current.scrollIntoView({ behavior: 'smooth' })
	}, [])

	return (
		<div className='new-routine-screen screen dark:text-darkText select-none'>
			<BottomModal show={modalShow} btnTxt={modalBtnText} cb={modalCallback} >
				{modalUi}
			</BottomModal>

			<div className='topElement' ref={topElement}></div>
			<BackHeader title="New Routine" backCb={() => {
				setModalUi(<BasicModal text="Discard this routine?" desc="Are you sure you want to discard this routine?" />)
				setModalCallback([() => setModalShow(false), () => goBack()])
				setModalBtnText(['No', 'Discard'])
				setModalShow(true)	
			}} />

			<section className='basic-details w-full p-4 pt-2'>
				<div className='min-h-[calc(100vh-100px)] flex flex-col justify-between items-center w-full'>
					<div className="top flex flex-col gap-3 w-full">
						<div className="">
							<p className='text-xs text-secondary pl-1 pb-1'>Routine name</p>
							<div className="inputText flex flex-row gap-3">
								<img src={Emoji.get(parseEmoji(routineEmoji)[0])} className='tap h-[3.5rem] p-[0.8rem] bg-inputBg dark:bg-darkInputBg rounded-2xl' />
								<input
									value={routineName}
									onInput={(e: any) => { setRoutineName(e.target.value) }}
									type="text"
									placeholder='Routine Name'
									className='name input-text bg-inputBg dark:bg-darkInputBg'
								/>
							</div>
						</div>
						<div className="inputText">
							<div className="">
								<p className='text-xs text-secondary pl-1 pb-1'>Routine description</p>
								<input
									value={routineDescription}
									onInput={(e: any) => { setRoutineDescription(e.target.value) }}
									type="text"
									placeholder='Routine Description'
									className='name input-text bg-inputBg dark:bg-darkInputBg'
								/>
							</div>
						</div>
						<div className="">
							<p className='text-xs text-secondary pl-1 pb-1'>Routine emoji and repetition</p>
							<div className="inputSelect flex justify-between items-center gap-3">
								<input type="text"
									value={routineEmoji}
									placeholder='Emoji'
									className='name input-text bg-inputBg dark:bg-darkInputBg flex-1'
									onInput={(e: any) => { setRoutineEmoji(e.target.value) }}
								/>
								<select defaultValue={routineType} onInput={(e: any) => setRoutineType(e.target.value)} className='flex-[4] appearance-none p-[1rem] px-7 rounded-2xl trans-outline outline-none focus:outline-accent border-none bg-inputBg dark:bg-darkInputBg text-center'>
									<option value="once">Routine : Once</option>
									<option value="daily">Routine : Daily</option>
									<option value="weekly">Routine : Weekly</option>
									<option value="monthly">Routine : Monthly</option>
									<option value="yearly">Routine : Yearly</option>
									<option value="calendar">Calendar Event</option>
								</select>
								{/* <img src={e.get('➕')} className='tap bg-inputBg dark:bg-darkInputBg h-[3.5rem] p-[0.8rem] rounded-2xl' /> */}
							</div></div>
						<div className="emojis flex gap-3 rounded-2xl flex-wrap justify-between items-center">
							{emojiList.map((emoji, index) =>
								<img src={e.get(emoji)}
									onClick={() => setRoutineEmoji(emoji)}
									className='tap bg-inputBg dark:bg-darkInputBg h-[3.2rem] p-[0.8rem] rounded-2xl' key={index}
								/>
							)}
						</div>
						{RoutineMaker(routineType)}
					</div>
					<div className="btn w-full">
						<button className="btn-full no-highlight tap99 w-full text-sm" onClick={addRoutine}>Add this Routine</button>
					</div>
				</div>
			</section>
		</div>

	)
	function addRoutine() {
		// validate routine
		setRoutineName(routineName.trim())
		setRoutineDescription(routineDescription.trim())
		if (!routineName) {
			setModalUi(<BasicModal text="Routine name is required" desc="Please provide a name for your routine" />)
			setBlankAndShowModal()
			return
		}

		if (routineType === 'once') {
			if (!routine.time[0]) {
				setModalUi(<BasicModal text="Routine time is required" desc="Please provide a time for your routine" />)
				setBlankAndShowModal()
				return
			}
			let startDate = new Date(routine.time[0])
			let endDate = new Date(routine.time[1])
			// If start time is greater than end time then return error
			if (startDate > endDate) {
				setModalUi(<BasicModal text="Start time should be less than end time" desc="Make sure that the start time is less than end time" />)
				setBlankAndShowModal()
				return
			}
			// If start and end time are same then remove the end time
			else if (startDate.getTime() === endDate.getTime())
				routine.time[1] = ''
		}

		if (routineType === 'daily') {
			if (!routine.time[0]) {
				<BasicModal text="Routine time is required" desc="Please provide a time for your routine" />
				setBlankAndShowModal()
				return
			}
			if (isStartTimeGreater(routine.time[0], routine.time[1])) {
				setModalUi(<BasicModal text="Start time should be less than end time" desc="Make sure that the start time is less than end time" />)
				setBlankAndShowModal()
				return
			}
			// else
			// routine.time[1] = ''
		}

		if (routineType === 'weekly') {
			let timeObj = routine.time
			if (!timeObj) {
				setModalUi(<BasicModal text="At least one Routine time is required" desc="Please provide at least one time for your routine" />)
				setBlankAndShowModal()
				return
			}
			if (timeObj && Object.keys(timeObj).length === 0) {
				setModalUi(<BasicModal text="At least one time should be selected" desc="Select the day clicking on the boxes written days on it." />)
				setBlankAndShowModal()
				return
			}

			// If there is a valid time then set the time to routine and if there is same time for start and end then remove the end time and if there is start time greater than end time return error
			const latestTimes: any = {}
			let atLeastOneExist = false
			// Filter time array
			for (let i = 0; i < 7; i++) {
				const time = timeObj[i]
				if (time) {
					// if start time exist
					if (time[0]) {
						latestTimes[i] = []
						latestTimes[i][0] = time[0]
						atLeastOneExist = true
						if (time[1]) {
							if (time[0] !== time[1]) {
								// Check if start time is greater than end time 
								if (isStartTimeGreater(time[0], time[1])) {
									setModalUi(<BasicModal text={`Something wrong in the time of ${day[i]}`} desc="Make sure that the start time is less than end time" />)
									setBlankAndShowModal()
									return
								}
								else latestTimes[i][1] = time[1]
							}
						} else {

						}
					} else if (time[1]) {
						setModalUi(<BasicModal text={`Something wrong in the time of ${day[i]}`} desc="The start time must be provided if end time is provided" />)
						setBlankAndShowModal()
						return
					}
				}
			}
			if (!atLeastOneExist) {
				setModalUi(<BasicModal text="At least one Routine time is required" desc="Please provide at least one time for your routine" />)
				setBlankAndShowModal()
				return
			}
			routine.time = latestTimes
		}

		let newRoutine = {
			name: routineName,
			description: routineDescription,
			emoji: routineEmoji || '🧑🏻',
			type: routineType,
			...routine
		}
		console.log(newRoutine)
		// Save routine to local storage
		let routines = JSON.parse(ls.get('routines') || '[]')
		routines.push(newRoutine)
		ls.set('routines', JSON.stringify(routines))
		navigate(-1)
	}

	function RoutineMaker(type: string) {
		if (type === 'once') return <Once updateRoutine={setRoutine} />
		if (type === 'weekly') return <Weekly updateRoutine={setRoutine} routine={routine} />
		else if (type === 'daily') return <Daily updateRoutine={setRoutine} />
		else return <div className="mt-16 text-center">
			<p>This screen is under development</p>
		</div>
	}
}

function isStartTimeGreater(start: string, end: string) {
	let startTime = start.split(':')
	let endTime = end.split(':')

	let startHour = parseInt(startTime[0])
	let startMinute = parseInt(startTime[1])
	let endHour = parseInt(endTime[0])
	let endMinute = parseInt(endTime[1])

	if (startHour > endHour || (startHour === endHour && startMinute > endMinute))
		return true
	return false
}





function parseEmoji(emoji: string) {
	if (!emoji) return ['🧑🏻']
	let emojis = [...new Intl.Segmenter().segment(emoji)].map(x => x.segment)
	return emojis
}



export default NewRoutine