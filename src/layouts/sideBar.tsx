import { useState } from "react";
import { FaCog, FaUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { sideBarActions, themeActions } from "../store/StateSlices";
import {motion} from "framer-motion"

// type sideBarType = {
//   setDataTheme: React.Dispatch<React.SetStateAction<string|null>>
// }
export const SideBar = () => {
  const sideBarIsOpen = useSelector((store:any)=> store.sideBarState.value)
  const theme = useSelector((store: any) => store.themeState.value);
  const dispatch = useDispatch();
  const { changeTheme } = themeActions;
const {setSideBarStateFalse} = sideBarActions

  const [showText, setShowText] = useState<boolean>(false);
  const [enlargeIcon, setEnlargeIcon] = useState<boolean>(false)
 
  
  const sideBarAnimations = {
    bar :{
      initial:{
        translateX: -160,
        opacity: 0
      },
      animate: {
        translateX: sideBarIsOpen ? [-160,0] : -160,
        opacity: sideBarIsOpen ? [0,1] : 0
      },
      transition: {
        duration: 0.8,
        delay: 0.15
      }
    },
    setting: {
        initial: {
         scale: 1
        },
        animate: {
          scale: showText ? [1,1.1] : 1
        },
        transition : {
            duration: 0.6,
    
        }
    },
    themeMessage : {
        initial : {
            opacity:0,
        },
        animate : {
            opacity: showText ? [0,1] : [1,0]
        },
        transition : {
            duration: 0.6
        }
    },
    profileIcon: {
        initial: {
            scale:1
        },
        animate: {
            scale: enlargeIcon ? [1, 1.1] : 1
        },
        transition: {
            duration:0.6
        }
    },
    iconMessage : {
        initial : {
            opacity:0,
        },
        animate : {
            opacity: enlargeIcon ? [0,1] : 0
        },
        transition : {
            duration: 0.6
        }
    }

  }
const handleTheme = ()=>{
  setShowText((prev)=>!prev)
  dispatch(changeTheme())
}
const passSidebarVal = ()=>{

    const run = ()=>{
      dispatch(setSideBarStateFalse(false))
    }
    run()
  
}

  return (
    <motion.div 
    onClick={passSidebarVal}
    initial={sideBarAnimations.bar.initial}
    animate= {sideBarAnimations.bar.animate}
    transition={sideBarAnimations.bar.transition}
    className="z-30 fixed h-[100dvh] w-39 bg-gray-900 flex flex-col justify-between items-center">
      <div
      onMouseEnter={()=>{setEnlargeIcon(true)}}
      onMouseLeave={()=>{setEnlargeIcon(false)}}
      className=" flex flex-col items-center">
      <motion.div
      initial= {sideBarAnimations.profileIcon.initial}
      animate={sideBarAnimations.profileIcon.animate}
      transition={sideBarAnimations.profileIcon.transition}
      className="text-white mt-[2rem] ">
        <FaUser  size={33} className="cursor-pointer" />
      </motion.div>
      <motion.p 
      initial = {sideBarAnimations.iconMessage.initial}
      animate={sideBarAnimations.iconMessage.animate}
      transition={sideBarAnimations.iconMessage.transition}
      className="text-white mt-[4px] font-mono text-sm">
        Profile
      </motion.p>
      </div>
      
        <div className="  flex flex-col items-center">
          <motion.div 
          onClick={handleTheme}
           onMouseEnter={() => setShowText(true)}
           onMouseLeave={() => setShowText(false)}
          initial={sideBarAnimations.setting.initial}
          animate= {sideBarAnimations.setting.animate}
          transition={sideBarAnimations.setting.transition}
           
            className={`text-white  cursor-pointer  mb-[4px]`}
          >
            <FaCog size={30} />
          </motion.div>
          <motion.p initial = {sideBarAnimations.themeMessage.initial}
          animate= {sideBarAnimations.themeMessage.animate}
          transition={sideBarAnimations.themeMessage.transition} 
            className={`text-white text-sm mb-[8px] opacity-0 font-mono tracking-tight`}
          >
           {theme === "DarkTheme" ? "Set Ligth Theme" : "Set Dark Theme"}
          </motion.p>
        </div>
      
    </motion.div>
  );
};
// note using isOppen i.e boolean value to determine animation only
// works whenyou do isOpen ? some animation : some animation
// it dosent work with isOpen && some animation
// note if two div are defined they are always rendered in order
// div1 before div2 but if they have a classname of relative or fixed or absolute or sticky e.t.c
// then setting a higer z index places one above the other, setting 
// same z-index in this case makes them behave in default mode i.e one after the other
// note h-screen is same as h-[100vh] which sets the hieght to viewport height but for mobile devices
// the browsers header takes some height and so it would seem that your content goes beyond 100vh
// thats why we use 100dvh the d is for dynamically  reccalculating viewport height