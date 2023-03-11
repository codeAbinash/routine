import React from 'react'
import TextEmoji from './TextEmoji'
import ls from '../lib/storage'

function Watermark({ visible }: any) {
    const lsw = ls.get('watermark')
    const isWatermark = lsw === 'true' || !lsw

    console.log(isWatermark)
    return (
        <div className={`${isWatermark ? 'opacity-[0.15]' : 'opacity-0'} pb-10 pt-10 flex justify-center items-center -z-10`}>
            <p className={
                `font-bold tap97 text-sm`
            }>
                Made by Abinash
            </p>
        </div>
    )
}

export default Watermark