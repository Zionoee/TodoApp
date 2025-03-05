import { FaBars } from "react-icons/fa"
import {motion} from "framer-motion"
import { useDispatch, useSelector } from "react-redux"
import { sideBarActions } from "../store/StateSlices"
export const Header = ()=>{
    const theme = useSelector((store:any)=> store.themeState.value)
    const sideBarState = useSelector((store:any)=> store.sideBarState.value)
    const dispatch = useDispatch()
    const {changeSideBarState, setSideBarStateFalse} = sideBarActions


//     const handleClick = ()=>{
//     return(dispatch(changeSideBarState()))
// }
const headerAnimation = {
    initial : {
        translateY: 4,
        opacity: 0
    },
    animate:{
        translateY:0,
        opacity:[0,1]
    },
    transition: {
     duration: 1,
     delay: 0.5
    }
}
    return(<div className={`z-30 ${theme === "DarkTheme" ? "bg-gray-700 border-b-cyan-700" :"bg-zinc-50 border-b-gray-200"}  flex items-center fixed w-screen h-20 border-b-1   `}>
  <div onClick={()=> dispatch(setSideBarStateFalse(true))} className="cursor-pointer w-[40px]"><FaBars size={24} className = " lg:size-7 ml-2 text-stone-500"/></div>
  <div className=" flex-1 flex justify-center items-center">
  <motion.p initial = {headerAnimation.initial}
  animate={headerAnimation.animate}
  transition={headerAnimation.transition}
   className={`${theme === "DarkTheme" ? " font-mono text-zinc-300" : "text-teal-500 font-serif"} md:ml-1 lg:text-3xl text-2xl font-semibold tracking-wider  `}>Zion's Todo App</motion.p>
  </div>
    </div>)
}
// note if you want to change a style say text-color based on some state say theme
// make sure you define color for when theme is tru and for theme is false
// defining a color outside the conditional scoope i.e ? : will
// cause our system to ignore all colors defined in conditional scoope
// and use the color outside scoop