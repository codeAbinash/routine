import { useNavigate } from "react-router-dom";
import images from "../assets/images/images";
import TextEmoji from "../components/TextEmoji";
// import routines from "../lib/sampleTypes";
import ls from '../lib/storage'
import { useEffect, useMemo, useState } from "react";
import Header from "../components/Header";
import Loading from "../components/Loading";
import BottomModal from "../components/BottomModal";
import Emoji from "emoji-store";


function deleteRoutineById(routineID: string) {
	let routines = JSON.parse(ls.get('routines') || '[]')
	const newRoutines: any = []
	routines.forEach((routine: any) => {
		if (routine.sub !== routineID) {
			newRoutines.push(routine)
		}
	})
	ls.set('routines', JSON.stringify(newRoutines))
}

function EnterValidRoutineIdUI() {
	return <>
		<p className='text-center text-xl font-semibold'>Enter a valid routine ID <TextEmoji emoji="🤨" /></p>
		<div className='animate-bounce-slow mt-10 mb-10'><img src={Emoji.get('🤔')} alt="emoji" className={`mx-auto mt-5 w-24 h-24`} /></div>
		<p className='text-center text-grey text-xs mt-5 font-[450]'>If you cannot find your routine ID, please contact <a className="text-accent" href="mailto:codeAbinash@gmail.com">me</a>.</p>
	</>
}

function RoutineAppliedUI({ routineId }: { routineId: string }) {
	return <>
		<p className='text-center text-xl font-semibold'>Routine Applied <TextEmoji emoji="✅" /></p>
		<div className='animate-bounce-slow mt-10 mb-10'><img src={Emoji.get('🤩')} alt="emoji" className={`mx-auto mt-5 w-24 h-24`} /></div>
		<p className='text-center text-grey text-xs mt-5 font-[450]'>
			Routine id : <span className="text-accent">{routineId}</span>. Go back now?
		</p>
	</>
}

function AlreadySubscribedUI({ routineId }: { routineId: string }) {
	return <>
		<p className='text-center text-xl font-semibold'>Already Subscribed <TextEmoji emoji="😁" /></p>
		<div className='animate-bounce-slow mt-10 mb-10'><img src={Emoji.get('😉')} alt="emoji" className={`mx-auto mt-5 w-24 h-24`} /></div>
		<p className='text-center text-grey text-xs mt-5 font-[450]'>
			You are already subscribed to this routine! <br />
			Routine id : <span className="text-accent">{routineId}</span>
		</p>
	</>
}

function SkipUI() {
	return <>
		<p className='text-center text-xl font-semibold'>Skip for now ?</p>
		<div className='animate-bounce-slow mt-10 mb-10'><img src={Emoji.get('👉🏻')} alt="emoji" className={`mx-auto mt-5 w-24 h-24`} /></div>
		<p className='text-center text-grey text-xs mt-5 font-[450] px-[7%]'>
			You can skip this step for now. You can add routines later from settings.
		</p>
	</>
}

function RoutineNotFoundUI({ routineId }: { routineId: string }) {
	return <>
		<p className='text-center text-xl font-semibold'>Routine Not Found <TextEmoji emoji="😢" /></p>
		<div className='animate-bounce-slow mt-10 mb-10'><img src={Emoji.get('😢')} alt="emoji" className={`mx-auto mt-5 w-24 h-24`} /></div>
		<p className='text-center text-grey text-xs mt-5 font-[450] px-[7%]'>
			Cannot find routine <span className="text-accent">{routineId}</span> Maybe the routine you are looking
			for is not available. Please check the routine id again. <br /><br />
			Or Report this problem to <a className="text-accent" href="mailto:codeAbinash@gmail.com">me</a>.
		</p>
	</>
}

function ConfirmApplyUI({ routineId }: { routineId: string }) {
	return <>
		<p className='text-center text-xl font-semibold'>Confirm Apply Routine? <TextEmoji emoji="🤔" /></p>
		<div className='animate-bounce-slow mt-10 mb-10 flex gap-[10%] justify-center items-center'>
			<img src={Emoji.get('✅')} alt="emoji" className={`mt-5 w-16 h-16`} />
			<img src={Emoji.get('🤔')} alt="emoji" className={`mt-5 w-20 h-20`} />
		</div>
		<p className='text-center text-grey text-xs mt-5 font-[450] px-[7%]'>
			Are you sure you want to apply this routine? <br />
			Routine id : <span className="text-accent">{routineId}</span>
		</p>
	</>
}


function blank() { }

const MODAL_BUTTON_TEXT = ['Cancel', 'Ok']

export default function ApplyRoutine() {
	const navigate = useNavigate()
	const [isApplyingRoutine, setIsApplyingRoutine] = useState(false)
	const [routineIdByInput, setRoutineIdByInput] = useState('')
	const [applyRoutineStatus, setApplyRoutineStatus] = useState('Click to apply routine')
	const subscription = JSON.parse(ls.get('subscriptions') || '{}')
	const [modalShow, setModalShow] = useState(false)
	const [modalBtnText, setModalBtnText] = useState(MODAL_BUTTON_TEXT)
	const [modalUi, setModalUi] = useState(<></>)
	const BLANK_MODAL_CB = useMemo(() => [() => setModalShow(false), () => setModalShow(false)], [])
	const [modalCallback, setModalCallback] = useState(BLANK_MODAL_CB)

	const startedUsing = useMemo(() => ls.get('startedUsing'), [])
	return (
		<div className="screen dark:text-white">
			<BottomModal show={modalShow} btnTxt={modalBtnText} cb={modalCallback}>{modalUi}</BottomModal>
			<Header title={startedUsing ? "Routine Store" : "Select Routine"} notiIcon={false} placeholder="Search Routine" onInput={() => { }} />
			<div className="px-5 py-1 flex flex-col gap-4">
				{!startedUsing ? <div className="bg-accent/20 flex flex-row justify-between text-sm p-[0.85rem] px-4 rounded-[14px]">
					<p>You can skip it for now.</p>
					<p className="font-medium text-accent uppercase tap" onClick={() => skip(navigate)} >Skip</p>
				</div> : ''
				}
				{/* <p className="text-sm">Select Your Preferred Routine</p> */}

				<div className="flex justify-between gap-2">
					<input value={routineIdByInput} onInput={(e: any) => setRoutineIdByInput(e.target.value)} type="text" placeholder="Routine Id" className="bg-inputBg outline-link/70 no-highlight dark:bg-darkInputBg p-[0.85rem] pl-5 font-medium rounded-[14px] text-sm flex-1 " />
					<button className="bg-accent text-white px-7 tap97 rounded-xl border-none text-sm" onClick={() => addRoutine(routineIdByInput)}>Add</button>
				</div>

				<p className="text-center text-xs text-grey">{applyRoutineStatus}</p>
				<Routines addRoutine={addRoutine} subscription={subscription} />

			</div>
		</div>
	)

	function setBlankAndShowModal() {
		setModalBtnText(MODAL_BUTTON_TEXT)
		setModalCallback(BLANK_MODAL_CB)
		setModalShow(true)
	}


	function addRoutine(id: string) {
		// console.log('Add Routine ' + id)
		if (!id || id === '') {
			setModalUi(EnterValidRoutineIdUI)
			setBlankAndShowModal()
			return
		}

		// Check if already subscribed
		const subscriptions = JSON.parse(ls.get('subscriptions') || '{}')
		if (subscriptions[id]) {
			setModalUi(<AlreadySubscribedUI routineId={id} />)
			setBlankAndShowModal()
			return
		}


		// Confirm Apply Routine
		setModalUi(<ConfirmApplyUI routineId={id} />)
		setModalCallback([() => { setModalShow(false) }, () => {
			setModalShow(false)
			applyRoutine()
		}])
		setModalBtnText(['Cancel', 'Apply'])
		setModalShow(true)


		// const confirm = window.confirm("Warning! Are you sure you want to apply this routine? Routine subscription ID is " + id + ".")
		// if (!confirm) return;



		function applyRoutine() {

			if (isApplyingRoutine) return;
			setIsApplyingRoutine(true)
			setApplyRoutineStatus('Downloading Routine...')


			let fetchedRoutines: any = null
			let fetchedSubscriptions: any = null

			const subscriptionDetailsFetch = fetch(`https://dataabinash.github.io/routine/${id}/info.json`)
				.then(res => res.json())
				.then(data => { fetchedSubscriptions = data })

			const routineFetch = fetch(`https://dataabinash.github.io/routine/${id}/routine.json`)
				.then(res => res.json())
				.then(data => { fetchedRoutines = data })

			Promise.allSettled([subscriptionDetailsFetch, routineFetch]).then(() => {
				if (fetchedRoutines && fetchedSubscriptions) {
					console.log(fetchedRoutines, fetchedSubscriptions)

					subscriptions[id] = fetchedSubscriptions
					ls.set('subscriptions', JSON.stringify(subscriptions))
					// Add or update routines to the routine array
					let routines = JSON.parse(ls.get('routines') || '[]')
					routines.unshift(...fetchedRoutines)
					ls.set('routines', JSON.stringify(routines))
					ls.set('startedUsing', 'yes')
					setIsApplyingRoutine(false)

					setTimeout(() => {
						const doneFunction = () => {
							setModalShow(false)
							if (startedUsing)
								navigate(-1)
							else
								navigate('/', { replace: true })
						}
						// Set Modal Alert
						setModalCallback([doneFunction, doneFunction])
						setModalUi(<RoutineAppliedUI routineId={id} />)
						setModalBtnText(MODAL_BUTTON_TEXT)
						setModalShow(true)
					}, 300);
				} else {
					setTimeout(() => {
						setModalUi(<RoutineNotFoundUI routineId={id} />)
						setBlankAndShowModal()
					}, 300);

					setApplyRoutineStatus('Click to apply routine')
					setIsApplyingRoutine(false)
				}
			})
		}
	}

	function skip(navigate: any) {
		setModalUi(<SkipUI />)
		setModalCallback([() => { setModalShow(false) }, () => {
			setModalShow(false)
			ls.set('startedUsing', 'yes')
			navigate('/', { replace: true });
		}])
		setModalBtnText(['Cancel', 'Skip'])
		setModalShow(true)
	}
}

// function filterRoutines(routines: any) {
// 	const subscriptions = JSON.parse(ls.get('subscriptions') || '{}')
// 	let filteredRoutines: any = []
// 	routines.forEach((routine: any) => {
// 		if (!subscriptions[routine.sub]) {
// 			filteredRoutines.push(routine)
// 		}
// 	})
// 	routines = filterRoutines
// }

function Routines({ addRoutine, subscription }: any) {
	const allRoutinesLink = 'https://dataAbinash.github.io/routine/allRoutines.json'
	const [routines, setRoutines] = useState<any>(null)
	useEffect(() => {
		setTimeout(async () => {
			let fetchedRoutines = await (await fetch(allRoutinesLink)).json()
			setRoutines(fetchedRoutines)
			console.log(routines)
		}, 0);
	}, [])

	return (
		!routines ? <div className="min-h-[60dvh] justify-center items-center flex">
			<Loading />
		</div>
			:
			routines.map((routine: any, index: number) => {
				const isSubscribed = !!subscription[routine.id]

				// console.log(routine)
				return <div key={index} className={`${isSubscribed ? 'bg-accent text-white' : 'bg-inputBg dark:bg-darkInputBg'} p-5 rounded-3xl tap99`} onClick={() => { addRoutine(routine.id) }}>
					<div className="left">
						{/* <img src={routine.picture} alt="" /> */}
					</div>
					<div className="right flex flex-col gap-1">
						<p className="font-semibold text-[0.9rem]">{routine.name}</p>
						<p className={`${isSubscribed ? 'text-white' : 'text-grey'} text-[0.73rem] font-medium`}>{routine.description} <br />#{routine.id}</p>
					</div>
				</div>
			})
	)
}


