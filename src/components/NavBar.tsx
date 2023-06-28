import icons from "../assets/icons/icons"
import { useNavigate } from "react-router-dom"
import delay, { df } from "../lib/delay"
// const tabIcons = [icons.home, icons.routines, icons.calendar, icons.more]
const activeTabIcons = [icons.home_accent, icons.routines_accent, icons.calendar_accent, icons.more_accent]
const tabs = ['Home', 'Routines', 'Calendar', 'More']
const links = ['/', '/routines', '/calendar', '/more']
// const tabIcons = [icons.home, icons.routines, icons.calendar, icons.chat, icons.more]
// const tabs = ['Home', 'Routines', 'Calendar', 'Messages', 'More']
// const links = ['/', '/routines', '/calendar', '/messages', '/more']

function NavBar({ active }: { active: 'Home' | 'Routines' | 'Messages' | 'Calendar' | 'More' }) {
	const navigate = useNavigate()
	return (
		<div
			className={
				`navBar fixed bottom-0 h-[70px] pt-2 bg-white/70 dark:bg-black/60 backdrop-blur-md
				 dark:backdrop-blur-md w-full border-t-[0.5px] border-t-[#77777744] flex flex-row justify-evenly
				 align-middle z-40`
			}>
			{tabs.map((icon, index) => {
				const activeBar = tabs[index]
				return (
					<div
						className={`select-none tap tab flex-center flex-col gap-1 px-3 ${active == activeBar ? "" : "opacity-30 grayscale brightness-[0] dark:brightness-[3]"}`}
						key={index} onClick={df(() => { if (active === activeBar) return; navigate(links[index], { replace: true }) })}>
						<img src={activeTabIcons[index]} className='h-[22px]' />
						<p className={`title text-[0.7rem] text-accent ${activeBar == active ? 'font-[500]' : 'font-[500]'}`}>{activeBar}</p>
					</div>
				)
			})}
		</div>
	)
}

export default NavBar