import BackHeader from '../../components/BackHeader';
import { useEffect, useState } from 'react';
import icons from '../../assets/icons/icons';
import { BLANK_CALLBACK_ARR_2 } from '../../lib/lib';
import BottomModal from '../../components/BottomModal';

export default function Contributors() {
   const [contributors, uContributors] = useState<any>([]);
   let [ModalUI, setModalUi] = useState(<></>);
   let [modalButtons, setModalButtons] = useState(['Close', 'Github Profile']);
   let [modalCallbacks, setModalCallbacks] = useState(BLANK_CALLBACK_ARR_2);
   const [isShow, uIsShow] = useState(false);

   useEffect(() => {
      // Load contributors data from github
      const fetchLink = 'https://routine-data.vercel.app/contributors/contributors.json';
      setTimeout(async () => {
         // fetch data from github
         const data = await fetch(fetchLink).then((res) => res.json());
         uContributors(data);
         const userDetailsFetchLink = 'https://api.github.com/users/';
         const userData = await Promise.all(
            data.map(async (user: any) => {
               const d: any = await fetch(userDetailsFetchLink + user.github).then((res) => res.json());
               const pic = d.avatar_url;
               return { ...user, pic: pic };
            }),
         );
         uContributors(userData);
      }, 0);
   }, []);

   function showUserModal({ user }: { user: any }) {
      setModalUi(
         <div className='flex flex-col items-center justify-center gap-3 p-4 pt-0 text-center'>
            <div className='pic flex-none'>
               <img
                  src={user.pic || icons.spinner}
                  className='aspect-square w-32 rounded-full object-cover shadow-lg shadow-black/30'
               />
            </div>
            <div className='content mt-5'>
               <div className='name text-lg font-medium'>
                  <p>{user.name}</p>
               </div>
               <div className='username text-xs text-accent'>
                  <p>@{user.github}</p>
               </div>
               <div className='role mt-4 text-sm text-black/60 dark:text-white/60'>
                  <p>{user.role}</p>
               </div>
               {/* <div className="bio text-sm">
               <p>{user.bio}</p>
            </div> */}
            </div>
         </div>,
      );
      // setModalButtons(['Close', 'Github Profile'])
      setModalCallbacks([
         () => {
            uIsShow(false);
         },
         () => {
            uIsShow(false), window.open('https://github.com/' + user.github, '_blank');
         },
      ]);
      uIsShow(true);
   }

   return (
      <div className='screen dark:text-darkText'>
         <BackHeader title='Contributors' />
         <BottomModal show={isShow} btnTxt={modalButtons} cb={modalCallbacks}>
            {ModalUI}
         </BottomModal>
         <div className='content'>
            <div className='pl-5 pr-5 text-sm'>
               <p>
                  We are a team of developers who are passionate about open source and building useful tools for the
                  community.
               </p>
            </div>
            <div className='team'>
               <div className='dev flex flex-col gap-4 p-5'>
                  {contributors.map((user: any, index: number) => {
                     return (
                        <div
                           className='user tap99 flex items-center gap-4 rounded-3xl bg-inputBg p-4 dark:bg-darkInputBg'
                           key={index}
                           onClick={
                              // () => {
                              //    window.open('https://github.com/' + user.github, '_blank')
                              // }
                              () => {
                                 showUserModal({ user });
                              }
                           }
                        >
                           <div className='pic flex-none'>
                              <img
                                 src={user.pic || icons.spinner}
                                 className='aspect-square w-14 rounded-full object-cover'
                              />
                           </div>
                           <div className='content'>
                              <div className='name text-sm font-medium'>
                                 <p>{user.name}</p>
                              </div>
                              <div className='role text-sm'>
                                 <p className='font-[430] text-black/60 dark:text-white/60'>{user.role}</p>
                              </div>
                           </div>
                        </div>
                     );
                  })}
               </div>
            </div>
         </div>
      </div>
   );
}
