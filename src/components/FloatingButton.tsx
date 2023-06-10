import { useNavigate } from "react-router-dom"
import delay from "../lib/delay"

function FloatingButton() {
    const navigate = useNavigate()
    return (
        <div onClick={() => delay(()=>{navigate('/newRoutine')})} className='select-none floatingButton w-[3.8rem] aspect-square rounded-[50%] bg-accent shadow-xl shadow-accent/40 flex-center text-white text-3xl fixed bottom-[90px] right-6 tap z-50'>
            +
        </div>
    )
}
export default FloatingButton