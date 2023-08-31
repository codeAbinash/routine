import React from 'react';
import TextEmoji from './TextEmoji';
import ls from '../lib/storage';
import Emoji from 'emoji-store';

function Watermark({ visible }: any) {
   // const lsw = ls.get('watermark')
   // const isWatermark = lsw === 'true' || !lsw

   return (
      <div className={`-z-10 flex items-center justify-center pb-10 pt-10 text-center`}>
         <p className={`tap97 text-[0.7em] font-medium text-dark/50 dark:text-darkText/50`}>
            <span>
               Made with <TextEmoji emoji='💜' /> for friends
            </span>
            <br />
            <span>
               By Abinash <TextEmoji emoji='😊' />
            </span>
         </p>
      </div>
   );
}

export default Watermark;
