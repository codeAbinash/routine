import React from 'react'
import TextEmoji from './TextEmoji'
import ls from '../lib/storage'
import Emoji from 'emoji-store'

function Watermark({ visible }: any) {
    // const lsw = ls.get('watermark')
    // const isWatermark = lsw === 'true' || !lsw

    // console.log(isWatermark)
    return (
        <div className={`opacity-100 pb-10 pt-10 flex justify-center items-center -z-10 text-center`}>
            <p className={
                `font-medium tap97 text-[0.7em] text-dark/50 dark:text-darkText/50`
            }>
                <span>Made with <TextEmoji emoji="💜"/> for friends</span>
                <br />
                <span>By Abinash <TextEmoji emoji="😊"/></span>
            </p>
        </div>
    )
}

export default Watermark