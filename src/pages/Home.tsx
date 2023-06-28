import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../assets/scss/index.scss'
import FloatingButton from '../components/FloatingButton'
import Header from '../components/Header'
import NavBar from '../components/NavBar'
import Watermark from '../components/Watermark'
import getCurrentDate, { getEmojiOfDayByTime } from '../lib/date'
import searchByDate, { Routine, searchActiveRoutine } from '../lib/dateMethods'
import ls from '../lib/storage'
import NewRoutinesLoader, { GetRoutines } from './NewRoutinesLoader'
import TextEmoji from '../components/TextEmoji'
import Emoji from 'emoji-store'
import delay, { df } from '../lib/delay'
import BottomModal from '../components/BottomModal'
import LoadingRoutines from '../components/loading/LoadingRoutines'
import routines from '../lib/sampleTypes'


// Delete the subscription if the subscription is expired
const timer = setTimeout(() => {
	console.log('Checking for expired subscriptions...')
	let isDeletes = false
	const subscriptions = JSON.parse(ls.get('subscriptions') || '{}')
	// console.log(subscriptions)
	for (let key in subscriptions) {
		let sub = subscriptions[key]
		if (!sub.expiry) continue
		const expiry = new Date(sub.expiry)
		const now = new Date()
		if (now > expiry) {
			console.log('Deleting...' + key)
			delete subscriptions[key]
			// Delete all routines having the 'sub' property in the routine
			deleteRoutineBySub(key)
			isDeletes = true
		}
	}
	// console.log(subscriptions)
	ls.set('subscriptions', JSON.stringify(subscriptions))

	// Show alert if deleted and reload
	if (isDeletes) {
		alert('Some subscriptions are expired and deleted.')
		window.location.reload()
	}
}, 12000)

const timer1 = setTimeout(() => {
	backgroundRoutineUpdate()
	console.log('Check for update...')
}, 8000);

function deleteRoutineBySub(subscriptionKey: string) {
	const routines = JSON.parse(ls.get('routines') || '[]')
	const newRoutines = routines.filter((routine: Routine) => routine.sub !== subscriptionKey)
	ls.set('routines', JSON.stringify(newRoutines))
}

function Home() {
	const [screenRoutines, uTodayRoutine] = useState<any>([])
	const navigate = useNavigate()
	const timer2 = useRef<any>(null);
	const [isRoutineEmpty, setIsRoutineEmpty] = useState(false)
	let routines = useMemo(() => JSON.parse(ls.get('routines') || '[]'), [])
	const [showLoading, setShowLoading] = useState(true)
	const topElement = useRef<HTMLDivElement>(null)


	useEffect(() => {
		// Check if started using
		let timer: any = null

		let startedUsing = ls.get('startedUsing')
		if (!startedUsing) { navigate('/start', { replace: true }) }

		// Add index property to routines

		// If there is no routine show an alert message to go to routine store
		if (routines.length === 0) {
			timer = setTimeout(() => {
				// const ask = confirm('You have no routine. Do you want to go to routine store?')
				// if (ask) navigate('/apply-routine')
				setIsRoutineEmpty(true)
			}, 3000);
		}

		routines.forEach((routine: Routine, index: number) => { routine.index = index })
		let todayRoutines: Routine[] = searchByDate(new Date(), routines)
		searchActiveRoutine(todayRoutines)
		uTodayRoutine(todayRoutines)

		timer2.current = setInterval(() => {
			todayRoutines = searchByDate(new Date(), routines)
			searchActiveRoutine(todayRoutines)
			uTodayRoutine(todayRoutines)
			console.log("Refresh")
		}, 60000)

		return () => {
			// clearTimeout(timer1.current)
			clearTimeout(timer2.current)
			timer && clearTimeout(timer)
		}
	}, [])


	useEffect(() => {
		// Disable loading after 1.5s
		const timer = setTimeout(() => {
			setShowLoading(false)
		}, 700)

		return () => {
			clearTimeout(timer)
		}

	}, [screenRoutines])


	useEffect(() => {
		// Scroll to top
		topElement.current?.scrollIntoView({ behavior: 'smooth' })
	}, [])


	return (
		<div className="home-screen screen-navbar select-none dark:bg-black dark:text-darkText">
			<div className="scrollToTop" ref={topElement}></div>
			<Header title={<span>{getCurrentDate()} <TextEmoji emoji={getEmojiOfDayByTime()} /></span>} notiIcon={true} placeholder="Search Routine" />

			<section className='p-[1.2rem] pt-3'>
				{
					showLoading ? <LoadingRoutines /> :
						<>
							<div className="routines flex flex-col gap-[0.9rem]">
								<GetRoutines screenRoutines={screenRoutines} allRoutines={routines} />
							</div>
							<NewRoutinesLoader />
						</>
				}
			</section>
			<FloatingButton />
			<Watermark />
			<NavBar active='Home' />
			<BottomModal show={isRoutineEmpty} btnTxt={[, 'Go to Store']} cb={[, () => { navigate('/applyRoutine') }]} >
				<NoRoutineUi />
			</BottomModal>
		</div>
	)
}

function NoRoutineUi() {
	return <>
		<p className='text-center text-xl font-semibold'>You have no Routine <TextEmoji emoji='😕' /> !</p>
		<div className='grid animate-bounce-slow mt-10 mb-10'>
			<img src={Emoji.get('👜')} alt="bag" className={`place-1-1 mx-auto mt-5 w-28 h-28 blur-xl opacity-50`} />
			<img src={Emoji.get('👜')} alt="bag" className={`place-1-1 mx-auto mt-5 w-28 h-28 z-10`} />
		</div>
		<p className='text-center text-grey text-xs mt-5 font-[450]'>Go to Routine <TextEmoji emoji='📃' /> Store <TextEmoji emoji='👜' /> <br />to add new Routines !</p>
	</>
}




function backgroundRoutineUpdate() {
	// check subscription versions and update
	const subscriptions = JSON.parse(ls.get('subscriptions') || '{ }')
	for (let key in subscriptions) {
		let sub = subscriptions[key]
		fetch(`https://dataabinash.github.io/routine/${key}/info.json`)
			.then(res => res.json())
			.then((data: any) => {
				if (data.vcode === sub.vcode) return;
				updateRoutines(key, data, subscriptions)
			})
	}
}

function updateRoutines(subscriptionKey: string, subData: any, subscriptions: any) {
	let status = false
	fetch(`https://dataabinash.github.io/routine/${subscriptionKey}/routine.json`)
		.then(res => res.json())
		.then((data: any) => {
			// Delete all routines having the 'sub' property in the routine
			const routines = JSON.parse(ls.get('routines') || '[]')
			const newRoutines = routines.filter((routine: Routine) => {
				if (routine.sub === subscriptionKey) return false
				console.log('Updating...' + subscriptionKey)
				return true
			})
			console.log(newRoutines)
			newRoutines.push(...data)
			ls.set('routines', JSON.stringify(newRoutines))
			status = true

			// update subscriptions 
			subscriptions[subscriptionKey] = subData
			ls.set('subscriptions', JSON.stringify(subscriptions))
		}).catch(err => {
			status = false
		})
}

function dailyNotification() {

}

export default Home














// A function that will remove all the expired routines from ls-routines and 
// move them to ls-expiredRoutines to load the app faster

function removeExpiredRoutines() {
	console.log('Removing expired routines...')
	const allRoutines: Routine[] = JSON.parse(ls.get('routines') || '[]')
	const expiredRoutines: Routine[] = JSON.parse(ls.get('expiredRoutines') || '[]')
	const now = new Date()

	let length = allRoutines.length

	const validRoutines: Routine[] = []
	const invalidRoutines: Routine[] = [...expiredRoutines]

	for (let i = 0; i < length; i++) {
		let routine = allRoutines[i]
		if (routine.type === 'calendar' || routine.type === 'holiday') {
			if (isExpiredCalendarRoutine(routine, now))
				invalidRoutines.push(routine)
			else
				validRoutines.push(routine)
		} else if (routine.type === 'once') {
			if (isExpiredOnceRoutine(routine, now))
				invalidRoutines.push(routine)
			else
				validRoutines.push(routine)

		} else {
			validRoutines.push(routine)
		}
	}
	// Save the valid routines
	ls.set('routines', JSON.stringify(validRoutines))
	ls.set('expiredRoutines', JSON.stringify(invalidRoutines))
}

function isExpiredCalendarRoutine(routine: Routine, now: Date) {
	let routineDate = new Date(routine.time[0] + 'T00:00')
	// If more than one month
	routineDate.setMonth(routineDate.getMonth() + 1)
	return now.getTime() > routineDate.getTime()
}

function isExpiredOnceRoutine(routine: Routine, now: Date) {
	let routineDate = new Date(routine.time[1])
	// If more than one month
	routineDate.setMonth(routineDate.getMonth() + 1)
	return now.getTime() > routineDate.getTime()
}


// After 5sec of loading the app, check if there is any expired routine
setTimeout(removeExpiredRoutines, 5000);