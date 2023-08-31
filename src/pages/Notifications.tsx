import { useNavigate } from 'react-router-dom';
import delay from '../lib/delay';
import TextEmoji from '../components/TextEmoji';
import images from '../assets/images/images';
import BackHeader from '../components/BackHeader';

function Notifications() {
   const navigate = useNavigate();
   return (
      <div>
         <BackHeader title='Notifications' />
         <div className='flex h-[80dvh] select-none flex-col items-center justify-center gap-2 text-center dark:text-darkText'>
            <p className='text-sm font-medium text-grey'>No Notification</p>
            {/* <p className="text-3xl"><TextEmoji emoji="🤷🏻" /></p> */}
         </div>
      </div>
   );
}

export default Notifications;
