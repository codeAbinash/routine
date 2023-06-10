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
			sticky top-0 w-full bg-white dark:bg-black z-50 flex `
			}>
				<header className='flex w-full justify-start select-none items-center px-3 py-[0.6rem] mt-[-1px]'>
					<div className="left tap" onClick={handelBackClick}>
						<img src={icons.left_arrow_solid} className='w-10 p-3 dark:invert dark:grayscale' />
					</div>
					<div className="center font-medium text-base pl-3 dark:text-darkText line-clamp-1">{title}</div>
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