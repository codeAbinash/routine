import { useRef, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import icons from '../assets/icons/icons'
import headerIntersect from '../lib/headerIntersect'
import delay from '../lib/delay'


function BackHeader({ title, backCb }: { title: string, backCb?: Function }) {
	const navigate = useNavigate()
	const topElement = useRef<HTMLDivElement>(null)
	const [isIntersecting, setIsIntersecting] = useState(true)
	useEffect(() => {
		headerIntersect(topElement.current as Element, setIsIntersecting)
	}, [])

	return (
		<>
			<div ref={topElement}></div>
			<div className={`transition ${isIntersecting ? '' : 'shadow-sm dark:shadow-white/10'}  
			sticky top-0 w-full bg-white/70 dark:bg-black/60 backdrop-blur-md z-50 flex `
			}>
				<header className='flex w-full justify-between select-none items-center px-3 py-[0.7rem] mt-[-1px]'>
					<div className="left tap" onClick={handelBackClick}>
						<img src={icons.left_arrow_long_solid} className='w-10 dark:invert dark:grayscale' />
					</div>
					<div className="center font-medium text-base dark:text-darkText line-clamp-1">{title}</div>
					<div className="right tap opacity-0">
						<img src={icons.left_arrow_long_solid} className='w-10 dark:invert dark:grayscale' />
					</div>
				</header>
			</div>
		</>
	)
	function handelBackClick() {
		delay(() => {
			if (backCb)
				backCb()
			else
				navigate(-1)
		}, 80)
	}
}


export default BackHeader