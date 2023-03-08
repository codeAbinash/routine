import { useNavigate } from "react-router-dom"
import delay from "../lib/delay"
import TextEmoji from "../components/TextEmoji"
import images from "../assets/images/images"
import BackHeader from "../components/BackHeader"

function Notifications() {
    const navigate = useNavigate()
    return (
        <div>
            <BackHeader title="Notifications" />
            <div className="h-[100dvh] flex items-center justify-center flex-col p-16 text-center gap-2 select-none dark:text-darkText">
                <p className="font-medium text-xl">No Notification</p>
                {/* <p className="text-3xl"><TextEmoji emoji="🤷🏻" /></p> */}
            </div>
        </div>
    )
}

export default Notifications