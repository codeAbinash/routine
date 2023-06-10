import { useEffect, useState } from 'react'
import BackHeader from '../../components/BackHeader'
import Loading from '../../components/Loading'
import TextEmoji from '../../components/TextEmoji'
import Watermark from '../../components/Watermark'

function Changelog() {
   const [isLoaded, setIsLoaded] = useState(false)
   const [changelog, setChangelog] = useState([])
   useEffect(() => {
      // Fetch changelog data from '/changelog/changelog.json'
      // Set isLoaded to true
      loadChangelog().then((data) => {
         setIsLoaded(true)
         setChangelog(data)
      })
   }, [])
   return (
      <div className='dark:text-darkText'>
         <BackHeader title="Changelog" />
         <div className='p-6 pt-0'>
            {
               isLoaded ?
                  <div className=''>{showChangelog(changelog)}</div>
                  : <div className='flex justify-center items-end min-h-[50dvh]'>
                     <Loading />
                  </div>
            }
         </div>
         <Watermark />
      </div>
   )
}

function showChangelog(data: any) {
   // console.log(data)
   return (
      <div className='flex flex-col gap-8 mt-2'>
         {data.map((log: any, index: number) => {
            console.log(log.emoji)
            return <div key={index}>
               <>
                  {headingVersionName(log.version, log.emoji)}
                  <p className='text-sm font-medium pt-1 pb-2'>{log.name}<span className='text-gray font-normal'> •  {log.date}</span></p>
                  <div className='text-[0.8rem]'>
                     {singleLog(log.description)}
                  </div>
               </>
            </div>
         })}
      </div>
   )
}

function headingVersionName(version: string, emoji: string | [string]) {
   return (
      <div className='flex flex-row gap-3 items-center'>
         <h1 className='text-3xl font-semibold'>{version}</h1>
         {emoji && makeEmoji(emoji as any)}
      </div>
   )
}


function makeEmoji(emoji: [string]) {
   return <div className='flex gap-2 flex-row text-[1.3rem]'>
      {
         Array.isArray(emoji) ?
            emoji.map((emoji: string, index: number) => <TextEmoji key={index} emoji={emoji} />)
            : <TextEmoji emoji={emoji} />
      }
   </div>
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
            <ul className='list-disc list-outside'>
               {log.map((log: any, index: number) => {
                  return (
                     Array.isArray(log) ?
                        <li key={index} className='list-none'>{singleLog(log)}</li>
                        : <li key={index}>{log}</li>
                  )
               })}
            </ul>
         </div>
      )
   } else {
      return (
         <li className='leading-loose' key={999}>{log}</li>
      )
   }
}



async function loadChangelog() {
   try {

      const res = await fetch('/routine/changelog/changelog.json')
      const data = await res.json()
      return data
   } catch (err) {
      return [
         {
            "version": "There is an error loading the changelog",
            "name": "check your internet connection",
            "date": "",
            "description": [
               "Check Internet connection",
               "Check if you are connected to a network",
               "Try refreshing the page",
               "Quit the app and restart it",
               ["If the problem persists, please contact us",
                  "codeAbinash@gmail.com"]
            ]
         }
      ]
   }
}

export default Changelog