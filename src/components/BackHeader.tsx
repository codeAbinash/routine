import { useNavigate } from 'react-router-dom'
import icons from '../assets/icons/icons'


function BackHeader({ title, backCb }: { title: string, backCb?: Function }) {
	const navigate = useNavigate()
	return (
		<div className="shadow-sm dark:shadow-white/10 fixed top-0 w-full bg-white dark:bg-black z-50 flex h-16">
			<header className='flex w-full justify-start select-none items-center px-4'>
				<div className="left tap" onClick={backCb ? backCb() : () => { navigate(-1) }}>
					<img src={icons.left_arrow_solid} className='w-10 p-3 dark:invert dark:grayscale' />
				</div>
				<div className="center font-medium text-base pl-3 dark:text-darkText">{title}</div>
			</header>
		</div>
	)
}



export default BackHeader