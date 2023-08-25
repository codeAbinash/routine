import BackHeader from "../../components/BackHeader";
import { useEffect, useState } from "react";
import icons from "../../assets/icons/icons";
import { BLANK_CALLBACK_ARR_2 } from "../../lib/lib";
import BottomModal from "../../components/BottomModal";




export default function Contributors() {
   const [contributors, uContributors] = useState<any>([])
   let [ModalUI, setModalUi] = useState(<></>)
   let [modalButtons, setModalButtons] = useState(['Close', 'Github Profile'])
   let [modalCallbacks, setModalCallbacks] = useState(BLANK_CALLBACK_ARR_2)
   const [isShow, uIsShow] = useState(false)

   useEffect(() => {
      // Load contributors data from github
      const fetchLink = "https://dataAbinash.github.io/routine/contributors/contributors.json"
      setTimeout(async () => {
         // fetch data from github
         const data = await fetch(fetchLink).then(res => res.json())
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

   function showUserModal({ user }: { user: any }) {
      setModalUi(<div className="p-4 pt-0 gap-3 flex flex-col justify-center items-center text-center">
         <div className="pic flex-none">
            <img src={user.pic || icons.spinner} className="w-32 aspect-square rounded-full object-cover shadow-lg shadow-black/30" />
         </div>
         <div className="content mt-5">
            <div className="name font-medium text-lg">
               <p>{user.name}</p>
            </div>
            <div className="username text-xs text-accent">
               <p>@{user.github}</p>
            </div>
            <div className="role text-sm mt-4 text-black/60 dark:text-white/60">
               <p>{user.role}</p>
            </div>
            {/* <div className="bio text-sm">
               <p>{user.bio}</p>
            </div> */}
         </div>
      </div>)
      // setModalButtons(['Close', 'Github Profile'])
      setModalCallbacks([
         () => { uIsShow(false) },
         () => { uIsShow(false), window.open('https://github.com/' + user.github, '_blank') }
      ])
      uIsShow(true)
   }


   return <div className="screen dark:text-darkText">
      <BackHeader title="Contributors" />
      <BottomModal show={isShow} btnTxt={modalButtons} cb={modalCallbacks} >
         {ModalUI}
      </BottomModal>
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
                           // () => {
                           //    window.open('https://github.com/' + user.github, '_blank')
                           // }
                           () => { showUserModal({ user }) }
                        }
                     >
                        <div className="pic flex-none">
                           <img src={user.pic || icons.spinner} className="w-14 aspect-square rounded-full object-cover" />
                        </div>
                        <div className="content">
                           <div className="name font-medium text-sm">
                              <p>{user.name}</p>
                           </div>
                           <div className="role text-sm">
                              <p className="dark:text-white/60 font-[430] text-black/60">{user.role}</p>
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