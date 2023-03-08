import { useEffect, useState } from 'react'
import BackHeader from '../../components/BackHeader'
import Loading from '../../components/Loading'

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
         <div className='p-5 pt-12'>
            {
               isLoaded ?
                  <div className=''>{showChangelog(changelog)}</div>
                  : <div className='flex justify-center items-end min-h-[50dvh]'>
                     <Loading />
                  </div>
            }
         </div>
      </div>
   )
}

function showChangelog(data: any) {
   return (
      <div>
         {data.map((log: any, index: number) => (
            <div key={index}>
               <>
                  <h1 className='text-3xl font-semibold pt-8'>{log.version}</h1>
                  <p className='text-sm font-medium pt-1 pb-2'>{log.name}<span className='text-gray font-normal'> •  {log.date}</span></p>
                  <div className='text-[0.8rem]'>
                  {singleLog(log.description)}

                  </div>
               </>
            </div>
         ))}
      </div>
   )
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

      const res = await fetch('/routine-build/build/changelog/changelog.json')
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