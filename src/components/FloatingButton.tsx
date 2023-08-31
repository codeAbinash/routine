import { useNavigate } from 'react-router-dom';
import delay from '../lib/delay';

function FloatingButton() {
   const navigate = useNavigate();
   return (
      <div
         onClick={() =>
            delay(() => {
               navigate('/newRoutine');
            })
         }
         className='floatingButton flex-center tap fixed bottom-[90px] right-6 z-50 aspect-square w-[3.8rem] select-none rounded-[50%] bg-accent text-3xl text-white shadow-xl shadow-accent/40'
      >
         +
      </div>
   );
}
export default FloatingButton;
