import {AnimatePresence, motion,} from "framer-motion"
import { TodoDetails } from "./TodoDetailsModal"
import { useDispatch, } from "react-redux"
import { TodoActions } from "../../store/StateSlices"

 

export const TodoItemLayout = (props:any)=>{
    const dispatch = useDispatch()
    // const selectedTodo = useSelector((store:any)=>store.TodoState.selectedTodo)
    const {SelectTodo} = TodoActions
    const {todoData, showDetailsModal, setShowDetailsModal} = props
    // const controls = useAnimation()
    const ballRadius : number = 22.15
    const distance : number = -975
    const rotationAngle : number = ( distance /(ballRadius * 2 * Math.PI)) * 360

    const todoItemAnimate = 
        {
            initial: {
                opacity: 1,
                translateX: distance,
                rotate: 0
            },
            animate: {
                opacity: [0,1],
                translateX: [distance,0],
                rotate: -rotationAngle
            },
            transition: {
                //  repeat: Infinity,
                //  repeatType:"mirror",
                 type: "spring",
                 bounce: 0.6,
                 duration:5,
                 ease: "easeInOut"
            },
            exit: {
                opacity:[1,0],
                translateX:[0,distance],
                rotate: [360,0]
            }
        }
    const OpenCloseDetailsModal = ()=>{
        setShowDetailsModal(true)
        dispatch(SelectTodo(todoData))
    }

    return(
        <AnimatePresence>
            <motion.div drag
            dragConstraints= {
              {
                top:10,
                left:10,
                right:10,
                bottom:10
              }
            }
        initial={todoItemAnimate.initial}
        animate= {todoItemAnimate.animate}
        transition={todoItemAnimate.transition}
        //  exit = {todoItemAnimate.exit}
        onClick = {OpenCloseDetailsModal}
        
        className=" 
        cursor-pointer hover:scale-105 hover:shadow-2xl
         transition-all duration-150 flex justify-center 
         items-center rounded-full  w-40 h-40 sm:w-50 sm:h-50
          md:w-60 md:h-60  bg-gradient-to-b from-zinc-200
           via-stone-400   text-white">
            <span className="font-mono font-semibold text-zinc-600 text-2xl text-center">
            {todoData.data.Title}</span></motion.div>
               {showDetailsModal && <TodoDetails key = {todoData.Id} todoData = {todoData} showDetails = {showDetailsModal} setShowDetails = {setShowDetailsModal}/> } 
              
        </AnimatePresence>
    )
}

// setting repeat infinity causes an animation to repeat infinitely
// setting repeatType: "mirror" causes it to do animation, repeat it in reverse order continually
//  