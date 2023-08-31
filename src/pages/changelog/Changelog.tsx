import { useEffect, useState } from 'react';
import BackHeader from '../../components/BackHeader';
import Loading from '../../components/loading/Loading';
import TextEmoji from '../../components/TextEmoji';
import Watermark from '../../components/Watermark';

function Changelog() {
   const [isLoaded, setIsLoaded] = useState(false);
   const [changelog, setChangelog] = useState([]);
   useEffect(() => {
      // Fetch changelog data from '/changelog/changelog.json'
      // Set isLoaded to true
      loadChangelog().then((data) => {
         setIsLoaded(true);
         setChangelog(data);
      });
   }, []);
   return (
      <div className='dark:text-darkText'>
         <BackHeader title='Changelog' />
         <div className='p-6 pt-3'>
            {isLoaded ? (
               <div className=''>{showChangelog(changelog)}</div>
            ) : (
               <div className='flex min-h-[50dvh] items-end justify-center'>
                  <Loading />
               </div>
            )}
         </div>
         <Watermark />
      </div>
   );
}

function showChangelog(data: any) {
   return (
      <div className='mt-2 flex flex-col gap-8'>
         {data.map((log: any, index: number) => {
            return (
               <div key={index}>
                  <>
                     {headingVersionName(log.version, log.emoji)}
                     <p className='pb-2 pt-1 text-sm font-medium'>
                        {log.name}
                        <span className='font-normal text-grey'> • {log.date}</span>
                     </p>
                     <div className='text-[0.8rem]'>{singleLog(log.description)}</div>
                  </>
               </div>
            );
         })}
      </div>
   );
}

function headingVersionName(version: string, emoji: string | [string]) {
   return (
      <div className='flex flex-row items-center gap-3'>
         <h1 className='text-3xl font-semibold'>{version}</h1>
         {emoji && makeEmoji(emoji as any)}
      </div>
   );
}

function makeEmoji(emoji: [string]) {
   return (
      <div className='flex flex-row gap-2 text-[1.3rem]'>
         {Array.isArray(emoji) ? (
            emoji.map((emoji: string, index: number) => <TextEmoji key={index} emoji={emoji} />)
         ) : (
            <TextEmoji emoji={emoji} />
         )}
      </div>
   );
   // </div >
   // if (Array.isArray(emoji))
   //    return emoji.map((emoji: string, index: number) => <div className='flex gap-3 flex-row'>
   //       <TextEmoji key={index} emoji={emoji} />
   //    </div>
   //    )
   // else
   //    return <TextEmoji emoji={emoji} />
}

function singleLog(log: any) {
   if (Array.isArray(log)) {
      return (
         <div className='pl-3'>
            <ul className='list-outside list-disc'>
               {log.map((log: any, index: number) => {
                  return Array.isArray(log) ? (
                     <li key={index} className='list-none'>
                        {singleLog(log)}
                     </li>
                  ) : (
                     <li key={index}>{log}</li>
                  );
               })}
            </ul>
         </div>
      );
   } else {
      return (
         <li className='leading-loose' key={999}>
            {log}
         </li>
      );
   }
}

async function loadChangelog() {
   try {
      const res = await fetch('/routine/changelog/changelog.json');
      const data = await res.json();
      return data;
   } catch (err) {
      return [
         {
            version: 'There is an error loading the changelog',
            name: 'check your internet connection',
            date: '',
            description: [
               'Check Internet connection',
               'Check if you are connected to a network',
               'Try refreshing the page',
               'Quit the app and restart it',
               ['If the problem persists, please contact us', 'codeAbinash@gmail.com'],
            ],
         },
      ];
   }
}

export default Changelog;
