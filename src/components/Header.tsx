import React from 'react'
import { useNavigate } from 'react-router-dom'
import icons from '../assets/icons/icons'

function Header({ title, notiIcon, placeholder }: { title: string, notiIcon: boolean, placeholder: string }) {
    const navigate = useNavigate()
    return (
        <header className='px-5 py-3 fixed top-0 bg-main max-h-[120px] overflow-hidden w-full z-20 dark:bg-black dark:text-darkText'>
            <div className="heading flex flex-row justify-between items-center gap-2 pb-1">
                <p className='text-xl font-bold '>{title}</p>
                <div className={`notification tap ${notiIcon ? 'opacity-100' : 'opacity-0'}`} onClick={() => navigate('/notifications')}>
                    <div className="dot absolute h-2 w-2 bg-accent mt-2 ml-7 rounded-full"></div>
                    <img src={icons.notification} className='w-10 p-3 rounded-md opacity-80 dark:invert dark:grayscale dark:opacity-70' />
                </div>
            </div>
            <input type="search" placeholder={placeholder} className='search-full dark:bg-darkInputBg' />
        </header>
    )
}

export default Header