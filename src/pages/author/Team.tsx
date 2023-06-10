import BackHeader from "../../components/BackHeader";
import { useEffect, useState } from "react";
import icons from "../../assets/icons/icons";


export default function Team() {
   const [contributors, uContributors] = useState<any>([])

   useEffect(() => {
      // Load contributors data from github
      const fetchLink = "https://dataAbinash.github.io/routine/contributors/contributors.json"
      setTimeout(async () => {
         // fetch data from github
         const data = await fetch(fetchLink).then(res => res.json())
         console.log(data)
         uContributors(data)
         const userDetailsFetchLink = 'https://api.github.com/users/'
         const userData = await Promise.all(data.map(async (user: any) => {
            const d: any = await fetch(userDetailsFetchLink + user.github).then(res => res.json())
            const pic = d.avatar_url
            return { ...user, pic: pic }
         }))

         uContributors(userData)

      }, 0);
   }, [])


   return <div className="screen dark:text-darkText">
      <BackHeader title="Our Team" />
      <div className="content">
         <div className="pl-5 pr-5 text-sm">
            <p>
               We are a team of developers who are passionate about open source and building useful tools for the community.
            </p>
         </div>
         <div className="team">
            <div className="dev flex p-5 gap-4 flex-col">
               {
                  contributors.map((user: any, index: number) => {
                     return <div className="user flex gap-4 items-center bg-inputBg dark:bg-darkInputBg p-4 rounded-3xl tap99" key={index}
                        onClick={
                           () => {
                              window.open('https://github.com/' + user.github, '_blank')
                           }
                        }
                     >
                        <div className="pic">
                           <img src={user.pic} className="w-[4.52rem] rounded-full" />
                        </div>
                        <div className="content">
                           <div className="name font-medium text-sm">
                              <p>{user.name}</p>
                           </div>
                           <div className="role text-sm">
                              <p>{user.role}</p>
                           </div>
                        </div>
                     </div>
                  })
               }
            </div>
         </div>
      </div>

   </div>


}