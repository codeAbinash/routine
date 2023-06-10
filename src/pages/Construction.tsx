import { useNavigate } from "react-router-dom"
import delay from "../lib/delay"
import TextEmoji from "../components/TextEmoji"
import images from "../assets/images/images"

function Construction() {
    const navigate = useNavigate()
    return (
        <div className="h-[100dvh] flex items-center justify-center flex-col p-16 text-center gap-10 select-none dark:text-darkText">
            <p className="font-semibold text-2xl">This screen is under development <TextEmoji emoji="🧑🏻‍💻" /></p>
            <img src={images.undraw_feeling_proud_qne1} className="w-[100%]" />
            <p className="text-secondary text-sm">Made by Abinash</p>
            <button onClick={() => { delay(() => navigate('/', { replace: true })) }} className="w-full bg-dark text-white p-4 rounded-xl no-highlight tap99 text-sm">Go Homepage <TextEmoji emoji = '🏠'/></button>
        </div>
    )
}

export default Construction