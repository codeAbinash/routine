import { useNavigate } from "react-router-dom";
import images from "../assets/images/images";
import TextEmoji from "../components/TextEmoji";
// import routines from "../lib/sampleTypes";
import ls from '../lib/storage'
import { useEffect, useState } from "react";
import Header from "../components/Header";
import Loading from "../components/Loading";


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

// export default function ApplyRoutine() {
//     const navigate = useNavigate()
//     const [routineID, setRoutineID] = useState<string>('none')
//     const [applyButtonText, setApplyButtonText] = useState<string>('Apply Routine')
//     const [isApplyingRoutine, setIsApplyingRoutine] = useState<boolean>(false)
//     return (
//         <div className="screen applyRoutine-screen justify-between start-screen p-5 flex select-none flex-col gap-5 min-h-[100dvh] dark:text-darkText">
//             <h1 className="text-dark dark:text-darkText text-[1.7rem] font-bold text-center mt-[3vh] p-5">
//                 Select your college or school <span>Routine</span> <br />
//                 <TextEmoji emoji="🏫" /> <TextEmoji emoji="📚" /> <TextEmoji emoji="🎒" />
//             </h1>

//             <img src={images.undraw_city_girl_ccpd} className="w-[90%] block mx-auto" />

//             <div className="w-full flex flex-col gap-2">
//                 <p className="text-center text-base font-medium text-secondary pb-3">Select Preferred Routine</p>

//                 <select onInput={(e) => { setRoutineID((e.target as HTMLSelectElement).value) }} defaultValue='none'
//                     id="routines" name="routines" className="dark:bg-white/20 tap97 border-none outline-none p-3 py-5 appearance-none outline-accent rounded-xl input-bg font-medium text-center text-sm">
//                     <option value="none" disabled={true}>Select Your Routine</option>
//                     <option value="BUIE-CSE-2">BUIE-CSE 2nd Semester 2023</option>
//                 </select>
//                 <p className="text-secondary text-xs text-center pt-1">Cannot find your college in the list? To enter routine code manually <span className="text-accent font-semibold underline">click here</span></p>
//             </div>

//             <div className="btnWrapper flex justify-between items-center w-full gap-3">
//                 <button onClick={() => { ls.set('startedUsing', 'yes'); navigate('/', { replace: true }); }} className="flex-[1.5] no-highlight select-none rounded-2xl bg-dark text-white  mx-auto block p-[1.3em] duration-150 active:scale-[0.98] text-sm">
//                     Skip
//                 </button>
//                 <button onClick={() => applyRoutine(routineID)} className="flex-[2.5] no-highlight select-none rounded-2xl bg-accent text-white  mx-auto block p-[1.3em] duration-150 active:scale-[0.98] text-sm">
//                     {applyButtonText}
//                 </button>
//             </div>
//         </div>
//     )

//     function applyRoutine(routineID: string) {
//         if (routineID === 'none')
//             return alert('Please select a routine.')

//         const confirm = window.confirm("Warning! Are you sure you want to apply this routine? Routine subscription ID is " + routineID + ". If it is not your college or school routine, click 'cancel' and then click 'skip'.")
//         if (!confirm) return;
//         if (routineID === '') return;
//         let fetchedRoutines: any = null
//         let fetchedSubscriptions: any = null
//         if (isApplyingRoutine) return;
//         setApplyButtonText('Applying Routine...')
//         setIsApplyingRoutine(true)
//         console.log('Downloading Routine...')

//         const subscriptionDetailsFetch = fetch(`https://dataabinash.github.io/routine/${routineID}/info.json`)
//             .then(res => res.json())
//             .then(data => { fetchedSubscriptions = data })

//         const routineFetch = fetch(`https://dataabinash.github.io/routine/${routineID}/routine.json`)
//             .then(res => res.json())
//             .then(data => { fetchedRoutines = data })

//         Promise.all([subscriptionDetailsFetch, routineFetch]).then(() => {
//             if (fetchedRoutines && fetchedSubscriptions) {
//                 console.log(fetchedRoutines, fetchedSubscriptions)
//                 const subscriptions = JSON.parse(ls.get('subscriptions') || '{}')
//                 if (subscriptions[routineID]) {
//                     alert('You are already subscribed to this routine.')
//                     return;
//                 } else {
//                     subscriptions[routineID] = fetchedSubscriptions
//                     ls.set('subscriptions', JSON.stringify(subscriptions))

//                     // Add or update routines to the routine array
//                     let routines = JSON.parse(ls.get('routines') || '[]')
//                     // let newRoutines: any = []
//                     // Delete old routine
//                     // routines.forEach((routine: any) => {
//                     //     if (routine.sub !== routineID) {
//                     //         newRoutines.push(routine)
//                     //     }
//                     // })
//                     // // Add new routines to the routine array
//                     routines.push(...fetchedRoutines)
//                     ls.set('routines', JSON.stringify(routines))
//                     console.log('Routine Applied Successfully.')
//                     ls.set('startedUsing', 'yes')
//                     setApplyButtonText('Routine applied!')
//                     setIsApplyingRoutine(false)
//                     console.log('Navigate to /')
//                     navigate('/', { replace: true })
//                 }
//             } else {
//                 alert('Cannot find routine. Please check your internet connection and try again.')
//                 setApplyButtonText('Apply Routine')
//                 setIsApplyingRoutine(false)
//             }
//         })
//     }

//     function storeSubscriptionDetails(routineID: string) {
//         console.log('Downloading Subscription Details...')

//     }
// }

export default function ApplyRoutine() {
	const navigate = useNavigate()
	const [isApplyingRoutine, setIsApplyingRoutine] = useState(false)
	const [routineIdByInput, setRoutineIdByInput] = useState('')
	const [applyRoutineStatus, setApplyRoutineStatus] = useState('Click to apply routine')
	const subscription = JSON.parse(ls.get('subscriptions') || '{}')

	const startedUsing = ls.get('startedUsing')
	return (
		<div className="screen dark:text-white">
			<Header title="Select Routine" notiIcon={false} placeholder="Search Routine" onInput={() => { }} />
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

				<p className="text-center text-xs text-gray">{applyRoutineStatus}</p>
				<Routines addRoutine={addRoutine} subscription={subscription}/>

			</div>
		</div>
	)


	function addRoutine(id: string) {
		// console.log('Add Routine ' + id)
		if (!id || id === '') return alert('Please enter a valid routine ID.')

		// Check if already subscribed
		const subscriptions = JSON.parse(ls.get('subscriptions') || '{}')
		if (subscriptions[id]) {
			alert('You are already subscribed to this routine. ' + 'Routine id : ' + id)
			return
		}

		const confirm = window.confirm("Warning! Are you sure you want to apply this routine? Routine subscription ID is " + id + ".")
		if (!confirm) return;

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
				routines.push(...fetchedRoutines)
				ls.set('routines', JSON.stringify(routines))
				alert('Routine Applied Successfully.')
				ls.set('startedUsing', 'yes')
				setIsApplyingRoutine(false)
				if (startedUsing)
					navigate(-1)
				else
					navigate('/', { replace: true })
			} else {
				alert('Cannot find routine "' + id + '". Maybe the routine you are looking for is not available. Please check the routine id again. Or you have no internet connection. Please check your internet connection and try again.')
				setApplyRoutineStatus('Click to apply routine')
				setIsApplyingRoutine(false)
			}
		})
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
						<p className={`${isSubscribed ? 'text-white' : 'text-gray' } text-[0.73rem] font-medium`}>{routine.description} <br />#{routine.id}</p>
					</div>
				</div>
			})
	)
}


function skip(navigate: any) {
	const confirm1 = confirm('Are you sure you want to skip? You can set this routines from settings again')
	if (confirm1) {
		ls.set('startedUsing', 'yes')
		navigate('/', { replace: true });
	}
}