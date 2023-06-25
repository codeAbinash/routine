import images from "../../assets/images/images";
import BackHeader from "../../components/BackHeader";
import NavBar from "../../components/NavBar";
import TextEmoji from "../../components/TextEmoji";

export default function Messages() {
   return <div className="items-center min-h-[100dvh] text-dark dark:text-darkText">
      <BackHeader title="Messages" />
      <div className="min-h-[85vh] flex flex-col justify-center items-center">
         <div className="min-h[85vh] w-full flex justify-center gap-[5vh] bg-red flex-col">
            <p className="font-semibold text-2xl text-center">Connect <TextEmoji emoji="💬" /> with your <br /> friends anytime</p>
            <img src={images.messages} className="w-[70%] mx-auto dark:invert" />

            {/* <p className="text-lg text-center font-medium">Coming Soon</p> */}

            <div className="flex justify-center items-center mx-auto no-highlight tap99 flex-col">
               <button className="bg-dark text-white p-3.5 px-10 font-medium w-full rounded-[0.65rem] text-xs">Login / Sign Up</button>
            </div>
         </div>
         <p className="text-center text-sm mt-5" >
            This Feature is under development. <br />
         </p>
      </div>
   </div>
}