import { useNavigate } from 'react-router-dom';
import icons from '../assets/icons/icons';
import NavBar from '../components/NavBar';
import ls from '../lib/storage';
import { applyTheme } from '../lib/theme';
// import icons from '../assets/icons/icons'
import Header from '../components/Header';
import TextEmoji from '../components/TextEmoji';
import details from '../info';
import delay, { df } from '../lib/delay';
import Watermark from '../components/Watermark';
import { useEffect, useRef, useState } from 'react';
import Emoji from 'emoji-store';
import BottomModal from '../components/BottomModal';
import OptionSelector, { OptionsSelectorOptions } from '../components/OptionSelector';
import { capitalize } from '../lib/lib';
import { storeInLs } from './backup-restore/Restore';

const darkModeOptions: OptionsSelectorOptions = [
   { name: 'Light Theme', value: 'light' },
   { name: 'Dark Theme', value: 'dark' },
   { name: 'System Default', value: 'default' },
];

function changeTheme(theme: any) {
   ls.set('theme', theme);
   applyTheme(theme);
}

function getCurrentTheme() {
   let theme = localStorage.getItem('theme');
   if (!theme) theme = 'default';
   return theme;
}

type Setting = {
   name: string;
   icon: string;
   callback: () => void;
   rightArrow: boolean;
   iconOriginal?: boolean;
   newDot?: boolean;
};

function searchSettingsInfo(settingsInfo: Setting[], query: string) {
   query = query.trim().toLowerCase();
   if (!query) return settingsInfo;
   return settingsInfo.filter((setting: Setting) => {
      return setting.name.toLowerCase().includes(query);
   });
}

function More() {
   const settingsInfo = [
      {
         name: 'Theme',
         icon: icons.theme,
         callback: () => {},
         rightArrow: false,
      },
      { name: 'blank', icon: '', callback: () => {}, rightArrow: false },
      {
         name: 'Routine Store',
         icon: icons.bag,
         callback: () => navigate('/applyRoutine'),
         rightArrow: true,
      },
      {
         name: 'Manage Routines',
         icon: icons.calendar,
         callback: () => navigate('/manageRoutines'),
         rightArrow: true,
      },
      { name: 'blank', icon: '', callback: () => {}, rightArrow: false },
      {
         name: 'Quick Note',
         icon: icons.edit_square,
         callback: () => navigate('/notes'),
         rightArrow: true,
      },
      {
         name: 'Message Friends',
         icon: icons.chat,
         callback: () => navigate('/messages'),
         rightArrow: true,
      },
      { name: 'blank', icon: '', callback: () => {}, rightArrow: false },
      {
         name: 'Backup your data',
         icon: icons.backup,
         callback: () => {
            navigate('/backup');
         },
         rightArrow: true,
      },
      {
         name: 'Restore from backup file',
         icon: icons.restore,
         callback: () => navigate('/restore'),
         rightArrow: true,
      },
      {
         name: 'Restore from text',
         icon: icons.restore,
         callback: () => restoreFromText(),
         rightArrow: true,
      },
      // {
      //     name: 'Hide or Show Watermark',
      //     icon: icons.shield_cross,
      //     callback: () => {
      //         const watermark = ls.get('watermark')
      //         if (watermark === 'false') {
      //             ls.set('watermark', 'true')
      //             alert('Watermark is now visible')
      //             return
      //         }
      //         ls.set('watermark', 'false')
      //         alert('Watermark is now hidden')
      //     },
      //     rightArrow: true
      // },
      {
         name: 'Reset everything',
         icon: icons.shield,
         callback: () => {
            setModalUi(ResetEverythingUI);
            setIsShow(true);
            setModalButtons(['Cancel', 'Reset']);
            setModalCallbacks([
               () => {
                  setIsShow(false);
               },
               () => {
                  ls.clear();
                  navigate('/', { replace: true });
               },
            ]);
         },
         rightArrow: true,
      },
      { name: 'blank', icon: '', callback: () => {}, rightArrow: false },
      {
         name: 'Join Telegram Channel',
         icon: icons.telegram_black,
         callback: () => {
            setModalUi(JoinTelegramUi);
            setIsShow(true);
            setModalButtons(['Cancel', 'Join']);
            setModalCallbacks([
               () => {
                  setIsShow(false);
               },
               () => window.open('https://t.me/routine_application', '_blank'),
            ]);
         },
         rightArrow: true,
         newDot: true,
      },
      {
         name: 'Send Feedback',
         icon: icons.chat,

         callback: () => {
            setModalUi(FeedBackUi);
            setIsShow(true);
            setModalButtons(['Cancel', 'Send Feedback']);
            setModalCallbacks([
               () => {
                  setIsShow(false);
               },
               () => {
                  setIsShow(false);
                  window.open('mailto:codeAbinash@gmail.com?subject=Feedback of Routine Application', '_blank');
               },
            ]);
         },
         rightArrow: true,
      },
      {
         name: 'Contributors',
         icon: icons.team,
         callback: () => {
            navigate('/author/team');
         },
         rightArrow: true,
         // iconOriginal : true
      },
   ];

   const navigate = useNavigate();
   const topElement = useRef<HTMLDivElement>(null);
   const [settingsInfoState, updateSettingsInfo] = useState<Setting[]>(settingsInfo);
   const [isShow, setIsShow] = useState(false);
   const [isSelectorOpen, setIsSelectorOpen] = useState(false);
   const [darkModeSelectedOption, setDarkModeSelectedOption] = useState(getCurrentTheme());
   let [ModalUI, setModalUi] = useState(<></>);
   let [modalButtons, setModalButtons] = useState(['Cancel', 'Reset']);
   let [modalCallbacks, setModalCallbacks] = useState([() => {}, () => {}]);

   useEffect(() => {
      // Scroll to top
      topElement.current?.scrollIntoView({ behavior: 'smooth' });
   }, []);

   return (
      <div className='screen dark:text-darkText'>
         <BottomModal show={isShow} btnTxt={modalButtons} cb={modalCallbacks}>
            {ModalUI}
         </BottomModal>

         <div className='topElement' ref={topElement}></div>
         <Header
            title={
               <span>
                  More options <TextEmoji emoji='😯' />
               </span>
            }
            notiIcon={true}
            placeholder='Search more options'
            oninput={(e: any) => {
               const query = e.target.value;
               updateSettingsInfo(searchSettingsInfo(settingsInfo, query));
            }}
         />

         <section className='p-[1.2rem] pt-2'>
            <div className='tap99 w-full rounded-3xl bg-dark p-6 text-white' onClick={df(() => navigate('/changelog'))}>
               <div className=' flex w-full items-center justify-between'>
                  <div className='left'>
                     <p className='text-xl font-semibold'>Routine</p>
                  </div>
                  <div className='rig'>
                     <p className='text-sm text-white/70'>v{details.version}</p>
                  </div>
               </div>
               <p className='mt-2 text-xl'>
                  {' '}
                  <TextEmoji emoji='😎' /> <TextEmoji emoji='📕' /> <TextEmoji emoji='🧑🏻‍💻' /> <TextEmoji emoji='🎓' />{' '}
                  <TextEmoji emoji='🏠' /> <TextEmoji emoji='😋' /> <TextEmoji emoji='😜' />
               </p>
               {/* <p className='mt-2 text-white/70'>Added support for dark mode</p> */}
               <p className='mt-3 text-xs text-white/70'>Click to see full changelog</p>
            </div>

            <div className='settings mt-5 flex w-full flex-col gap-2'>
               {settingsInfoState.map((setting: Setting, index) => {
                  if (setting.name == 'blank') return <div className='h-3' key={index}></div>;

                  if (setting.name === 'Theme')
                     return (
                        <div
                           onClick={() => {}}
                           className='setting flex items-center justify-between rounded-xl px-3'
                           key={index}
                        >
                           <div className='nameIconContainer flex gap-4'>
                              <div className='left'>
                                 <img src={icons.theme} className='w-[1.35rem] opacity-70 dark:grayscale dark:invert' />
                              </div>
                              <div className='right'>
                                 <p className='text-sm font-[430]'>Theme</p>
                              </div>
                           </div>
                           <OptionSelector
                              isOpen={isSelectorOpen}
                              setIsOpen={setIsSelectorOpen}
                              options={darkModeOptions}
                              setOption={(option: string) => {
                                 setDarkModeSelectedOption(option);
                                 changeTheme(option);
                              }}
                              heading={'Select Theme'}
                           >
                              <div
                                 onClick={df(() => setIsSelectorOpen(true))}
                                 className='tap appearance-none rounded-2xl border-none bg-inputBg p-3 px-8 text-center text-sm outline-none dark:bg-darkInputBg'
                              >
                                 <p className='font-[450]'>{capitalize(darkModeSelectedOption)} Theme</p>
                              </div>
                           </OptionSelector>
                        </div>
                     );
                  return (
                     <div
                        onClick={setting.callback}
                        className='setting tap99 flex items-center justify-between rounded-xl p-3 py-3 active:bg-inputBg active:dark:bg-darkInputBg'
                        key={index}
                     >
                        <div className='nameIconContainer flex gap-4'>
                           <div className='left'>
                              <img
                                 src={setting.icon}
                                 className={`w-5 opacity-70 ${
                                    setting.iconOriginal ? '' : 'dark:grayscale dark:invert'
                                 }`}
                              />
                           </div>
                           <div className='right flex items-center gap-3'>
                              <p className='text-sm font-[430]'>{setting.name}</p>
                              {setting.newDot && (
                                 <div className='h-2 w-2 rounded-full bg-[red] shadow-sm shadow-[red]'></div>
                              )}
                           </div>
                        </div>
                        {setting.rightArrow && (
                           <div className='arrowContainer opacity-70'>
                              <img
                                 src={icons.left_arrow}
                                 className='w-[1.1rem] rotate-180 opacity-80 dark:grayscale dark:invert'
                              />
                           </div>
                        )}
                     </div>
                  );
               })}
            </div>
            {/* <div className='myself'>
                    <p className='text-sm text-center mt-20 text-grey'> Made with <TextEmoji emoji="☕" /> and <TextEmoji emoji="🧑🏻‍💻" /> by <a href="https://github.com/codeAbinash" target="_blank" className='text-link'>Abinash</a> <TextEmoji emoji="😊" /></p>
                    <div className='flex justify-center items-center' onClick={() => delay(() => navigate('/author/buyMeCoffee'))}>
                        <p className='tap97 mt-5 bg-accent p-4 px-9 text-xs text-white font-medium rounded-full'>Buy me a coffee?</p>
                    </div>
                </div> */}
         </section>
         <div className='pb-20'>
            <Watermark />
         </div>
         <NavBar active='More' />
      </div>
   );
}

export default More;

function ResetEverythingUI() {
   return (
      <>
         <p className='text-balance text-center text-xl font-semibold'>Are you sure you want to reset everything?</p>
         <div className='animate-bounce-slow mb-10 mt-10 grid'>
            <img src={Emoji.get('🤯')} alt='bag' className={`place-1-1 mx-auto mt-5 h-24 w-24 opacity-50 blur-lg `} />
            <img src={Emoji.get('🤯')} alt='bag' className={`place-1-1 z-10 mx-auto mt-5 h-24 w-24`} />
         </div>
         <p className='text-balance mt-5 text-center text-xs font-[450] text-grey'>
            It is advised to keep a backup before resetting everything. This will delete all your routines,
            subscriptions, and settings. This action cannot be undone. Are you sure?
         </p>
      </>
   );
}

function JoinTelegramUi() {
   return (
      <>
         <p className='text-balance text-center text-xl font-semibold'>
            Join Telegram channel to get latest updates <TextEmoji emoji='🤩' />{' '}
         </p>
         <div className='animate-bounce-slow mb-10 mt-10 grid'>
            <img src={icons.telegram} alt='bag' className={`place-1-1 mx-auto  mt-5 h-28 w-28 opacity-50 blur-lg`} />
            <img src={icons.telegram} alt='bag' className={`place-1-1 z-10 mx-auto mt-5 h-28 w-28`} />
         </div>
         <p className='text-balance mt-5 text-center text-xs font-[450] text-grey'>
            Join Telegram Channel{' '}
            <a href='https://t.me/routine_application' target='_blank' className='text-accent'>
               routine_application
            </a>{' '}
            to get latest updates about this application.
         </p>
      </>
   );
}
function FeedBackUi() {
   return (
      <>
         <p className='text-balance text-center text-xl font-semibold'>
            Send Feedback <TextEmoji emoji='🤩' />{' '}
         </p>
         <div className='animate-bounce-slow mb-10 mt-10 grid'>
            <img src={icons.chat} alt='bag' className={`place-1-1 mx-auto mt-5  h-24 w-24 opacity-50 blur-lg`} />
            <img src={icons.chat} alt='bag' className={`place-1-1 z-10 mx-auto mt-5 h-24 w-24`} />
         </div>
         <p className='text-balance mt-5 text-center text-xs font-[450] text-grey'>
            Your feedback is valuable. Please send your feedback to{' '}
            <a
               href='mailto:codeAbinash@gmail.com?subject=Feedback of Routine Application'
               target='_blank'
               className='text-accent'
            >
               codeAbinash@gmail.com
            </a>
         </p>
      </>
   );
}

function restoreFromText() {
   // const confirm = window.confirm('Are you sure you want to restore from text? This may be dangerous and may cause data loss. If wrong data is entered, it may cause data loss. Please make sure you have a backup before restoring from text.')
   // if (!confirm) return
   const text = prompt('Enter the text to restore from');
   // User clicked Cancel
   if (text === null) return;
   if (!text) return alert('Please enter some text to restore from');
   let restoreStatus: string = '';
   try {
      restoreStatus = storeInLs(JSON.parse(text)).status;
      alert(restoreStatus);
   } catch (error) {
      alert('Error while restoring from text');
   }
}
