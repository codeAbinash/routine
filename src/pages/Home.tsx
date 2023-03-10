import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../assets/scss/index.scss'
import FloatingButton from '../components/FloatingButton'
import Header from '../components/Header'
import NavBar from '../components/NavBar'
import Watermark from '../components/Watermark'
import getCurrentDate from '../lib/date'
import searchByDate, { Routine, searchActiveRoutine } from '../lib/dateMethods'
import ls from '../lib/storage'
import NewRoutinesLoader, { GetRoutines } from './NewRoutinesLoader'





function Home() {
	// const [name, updateName] = useState(1)
	const [screenRoutines, uTodayRoutine] = useState<any>([])
	const navigate = useNavigate()
	const timer1 = useRef<any>(null);
	const timer2 = useRef<any>(null);


	useEffect(() => {
		// Check if started using
		let startedUsing = ls.get('startedUsing')
		if (!startedUsing) { navigate('/start', { replace: true }) }

		let routines = JSON.parse(ls.get('routines') || '[]')
		// Add index property to routines
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

		timer1.current = setTimeout(() => {
			backgroundRoutineUpdate()
			console.log('Check for update...')
		}, 15000);

		return () => {
			clearTimeout(timer1.current)
			clearTimeout(timer2.current)
		}
	}, [])

	return (
		<div className="home-screen screen-navbar select-none dark:bg-black dark:text-darkText">
			<Header title={getCurrentDate()} notiIcon={true} placeholder="Search Routine" />
			<section className='p-[1.2rem]'>
				<p className='text-[#777]/50 text-center mt-2 mb-5 text-sm font-medium'>Today's routines</p>
				<div className="routines flex flex-col gap-[0.9rem]">
					{GetRoutines(screenRoutines, navigate)}
				</div>
				<NewRoutinesLoader />
			</section>
			<FloatingButton />
			<Watermark />
			<NavBar active={0} />
		</div>
	)
}


function backgroundRoutineUpdate() {
	// check subscription versions and update
	const subscriptions = JSON.parse(ls.get('subscriptions') || '{}')
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