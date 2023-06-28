import React, { useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import icons from '../assets/icons/icons'
import headerIntersect from '../lib/headerIntersect'
import Emoji from 'emoji-store'

function Header(props: any) {
    const navigate = useNavigate()
    const headerTitle = useRef<HTMLParagraphElement>(null)
    const [isIntersecting, setIsIntersecting] = React.useState(true)
    // { title, notiIcon, placeholder, onSearch }: { title: string, notiIcon: boolean, placeholder: string, onSearch: Function | any }
    const title = props.title || 'Sample Title'
    const notiIcon = props.notiIcon || false
    const placeholder = props.placeholder || 'Search'
    const oninput = props.oninput || function (e: any) {
    }
    const onSearch = props.onSearch || function (e: any) { }
    const rightIcon = props.rightIcon || Emoji.get('🔔')

    const rightIconClick = props.rightIconClick || function () { navigate('/notifications') }

    // onsearch 
    useEffect(() => {
        headerIntersect(headerTitle.current as Element, setIsIntersecting)
    }, [])

    return (
        <>
            <header className='bg-main overflow-hidden w-full z-20 dark:bg-black dark:text-darkText'>
                <div className="px-5 pt-2 heading flex flex-row justify-between items-center gap-2">
                    <p className='text-xl font-bold' ref={headerTitle}>{title}</p>
                    <div className={`notification tap ${notiIcon ? 'opacity-100' : 'opacity-0'}`} onClick={rightIconClick}>
                        <div className="dot absolute h-2 w-2 bg-accent mt-2 ml-7 rounded-full opacity-0"></div>
                        {/* <img src={icons.notification} className='w-10 p-3 rounded-md opacity-80 dark:invert dark:grayscale dark:opacity-70' /> */}
                        <img src={rightIcon} className='w-12 p-3 rounded-md' />
                    </div>
                </div>
            </header>
            <div className={`${isIntersecting ? '' : 'shadow-sm dark:shadow-[#77777715]'} mt-[-1px] transition input-div px-5 py-3 sticky top-0 z-50
                bg-white/70 dark:bg-black/60 backdrop-blur-md
            `}>
                <input type="search" placeholder={placeholder}
                    className='search-full dark:bg-[#fff]/10 font-[470] bg-[#0000000f]'
                    onInput={oninput}
                />
            </div>
        </>
    )

}

export default Header