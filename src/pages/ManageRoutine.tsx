import { useNavigate } from "react-router-dom";
import images from "../assets/images/images";
import TextEmoji from "../components/TextEmoji";
// import routines from "../lib/sampleTypes";
import ls from '../lib/storage'
import { useEffect, useMemo, useState } from "react";
import Header from "../components/Header";
import Loading from "../components/Loading";
import { MODAL_BUTTON_TEXT } from "../lib/lib";
import BottomModal, { BasicModal } from "../components/BottomModal";

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

export default function ApplyRoutine() {
	const navigate = useNavigate()
	const [isApplyingRoutine, setIsApplyingRoutine] = useState(false)
	const [routineIdByInput, setRoutineIdByInput] = useState('')
	const [applyRoutineStatus, setApplyRoutineStatus] = useState('Click to remove subscription')
	const startedUsing = ls.get('startedUsing')


	const [modalShow, setModalShow] = useState(false)
	const [modalBtnText, setModalBtnText] = useState(MODAL_BUTTON_TEXT)
	const [modalUi, setModalUi] = useState(<></>)
	const BLANK_MODAL_CB = useMemo(() => [() => setModalShow(false), () => setModalShow(false)], [])
	const [modalCallback, setModalCallback] = useState(BLANK_MODAL_CB)

	function setBlankAndShowModal() {
		setModalBtnText(MODAL_BUTTON_TEXT)
		setModalCallback(BLANK_MODAL_CB)
		setModalShow(true)
	}

	return (
		<div className="screen dark:text-white">
			<BottomModal show={modalShow} btnTxt={modalBtnText} cb={modalCallback} >
				{modalUi}
			</BottomModal>
			<Header title="Manage Routine" notiIcon={false} placeholder="Search Routine" onInput={() => { }} />
			<div className="px-5 py-1 flex flex-col gap-4">
				<p className="text-center text-xs text-gray px-4 py-2">You have subscribed to the following routine(s). {applyRoutineStatus}</p>
				<Routines deleteRoutine={deleteRoutine} />
			</div>
		</div>
	)

	function deleteRoutine(id: string) {

		setModalUi(<BasicModal text='Are you sure?' desc={<span>Are you sure you want to unsubscribe this routine : <span className="text-accent">{id}</span> ? This will delete all the data associated with this routine.</span>} emoji='😕' />)

		setModalCallback([() => { setModalShow(false) }, () => {
			applyThisRoutine()
			setModalShow(false)
		}])
		setModalShow(true)

		function applyThisRoutine() {
			const subscriptions = JSON.parse(ls.get('subscriptions') || '{}')
			delete subscriptions[id]
			ls.set('subscriptions', JSON.stringify(subscriptions))
			deleteRoutineById(id)
			setTimeout(() => {
				setModalUi(<BasicModal text='Routine deleted Successfully.' desc='You can always add this routine again from the Routine Store.' emoji='😊' />)
				setModalCallback([() => { setModalShow(false) }, () => { navigate(-1) }])
				setModalBtnText(['Ok', 'Go Back'])
				setModalShow(true)
			}, 300);
		}
	}
}


function Routines({ deleteRoutine }: any) {
	const subscriptions = JSON.parse(ls.get('subscriptions') || '{}')
	const routines = Object.keys(subscriptions)
	return (
		<div className="flex flex-col gap-3">
			{
				routines.length === 0
					? <div className="min-h-[50dvh] justify-center items-center flex">
						<p className="font-medium text-sm text-gray">No Routine</p>
					</div>
					:
					routines.map((id: any, index: number) => {
						return <div key={index} className='bg-accent p-5 rounded-3xl text-white tap99' onClick={() => { deleteRoutine(id) }}>
							<div className="left">
								{/* <img src={routine.picture} alt="" /> */}
							</div>
							<div className="right flex flex-col gap-1">
								<p className="font-semibold text-[0.9rem]">{subscriptions[id].fn}</p>
								<p className="text-[0.73rem] font-medium text-white">{subscriptions[id].description} <br /> #{subscriptions[id].name}</p>
							</div>
						</div>
					})
			}
		</div>
	)
}