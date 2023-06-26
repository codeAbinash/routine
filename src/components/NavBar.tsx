import icons from "../assets/icons/icons"
import { useNavigate } from "react-router-dom"
import delay, { df } from "../lib/delay"
const tabIcons = [icons.home, icons.routines, icons.calendar, icons.more]
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
				`navBar fixed bottom-0 h-[70px] pt-2 bg-white/70 dark:bg-black/60
               backdrop-blur dark:backdrop-blur-md w-full border-t-[0.5px] border-t-[#77777744] flex flex-row justify-evenly align-middle
					z-40
					`
			}>
			{tabIcons.map((icon, index) => {
				return (
					<div
						className={`select-none tap tab flex-center flex-col gap-1 px-3 ${active == tabs[index] ? "" : " opacity-50"} dark:invert dark:grayscale`}
						key={index} onClick={df(() => {
							if (active === tabs[index]) return
							navigate(links[index], { replace: true })
						})}>
						<img src={icon} className='h-[21px]' />
						<p className="title text-[0.7rem] dark:invert font-[450]">{tabs[index]}</p>
					</div>
				)
			})}
		</div>
	)
}

export default NavBar