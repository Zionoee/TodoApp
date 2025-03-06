import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { TodoActions } from "../../store/StateSlices"
import {motion, AnimatePresence} from "framer-motion"

export const TodoDetails = (props:any)=>{
  const [Edit, setEdit] = useState<string|undefined>(undefined)
  const selectedTodo = useSelector((store: any)=>store.TodoState.selectedTodo)
    const {todoData, showDetails, setShowDetails} = props
    const dispatch = useDispatch()
    const {EditDescription, DeleteTodo, } = TodoActions

  useEffect(()=>{
    
  },[showDetails])

  const handleChange = (event:any)=>{
const {value} = event.target
setEdit(value)
  }
  const handleEdit = ()=>{
    dispatch(EditDescription(Edit))
    // dispatch(setSelectedTodoNull())
   setShowDetails(false)
  }
  const handleDelete = ()=>{
    dispatch(DeleteTodo())
    setShowDetails(false)
    // dispatch(setSelectedTodoNull())
  }
  const DetailsAnimation = {
    initial: {
        scale:0,
        opacity: 0
    },
    animate: {
        scale: [0,1],
        opacity: [0,1],
    },
    transition: {
        duration: 1,
        delay: 0.2
    },
    exit : {
     opacity: [1,0]
    }
  }
    return(<AnimatePresence>
        <div className=" z-40 inset-x-0 fixed top-[20dvh] flex justify-center items-center">
        <motion.div 
    initial = {DetailsAnimation.initial}
    animate = {DetailsAnimation.animate}
    transition={DetailsAnimation.transition}
    exit = {DetailsAnimation.exit}
    className="  text-yellow-600 rounded-t-xl  relative pt-10 gap-y-3 flex flex-col items-center min-w-70 max-w-85 min-h-100  bg-stone-600 sm:scale-115 md:scale-125 md:top-45 lg:w-90">
    <span onClick={()=> {setShowDetails(false)}} className=" cursor-pointer absolute right-8 top-4 text-2xl font-bold transition-all duration-300 hover:text-red-700 hover:scale-110 ">X</span>
    <p className="text-zinc-800 text-2xl font-semibold font-serif tracking-wider">{selectedTodo.data.Title}</p>
    <div className="border-t-1 border-t-green-400 w-full flex-1">
      <textarea
      defaultValue={selectedTodo.data.Description} 
      id = 'textarea'
      value = {Edit}
      onChange = {handleChange}
      className="focus:outline-none mt-3 px-4 text-justify  min-h-60 pt-3 w-full"></textarea>
      <div className="text-center">
      <p className=" text-[13px] mt-3 font-mono text-blue-900 ">Date Created: {todoData.DateCreated}</p>
      <p className=" text-[13px] font-mono      text-blue-900 ">Time Created: {todoData.TimeCreated}</p> 
      </div>
     
    </div>
    <div className="flex justify-between  w-full items-center mb-4">
    <button onClick={handleEdit} className="cursor-pointer transition-all duration-300 hover:scale-110 hover:bg-green-700 font-semibold text-zinc-800 px-8 ml-10 rounded-full bg-amber-900">Edit</button>
    <button onClick = {handleDelete}className="cursor-pointer transition-all duration-300 hover:scale-110 hover:bg-red-700  font-semibold  text-zinc-800 px-5 mr-10 rounded-full bg-amber-900">Delete</button>
    </div>
    </motion.div>
        </div>
    </AnimatePresence>)
}
// ${showDetailsModal && "blur-[3px] opacity-50"}
// text-justify makes text justified i.e equal from right to left
//{todoData.data?.Description ? todoData.data?.Description : "" }
// dispatch(EditDescription({id:todoData.Id, description: value}))


// value = {todoData.data?.Description ?todoData.data?.Description : Edit }

/*
if (todoData.data?.Description !== ''){
    dispatch(EditDescription({id:todoData.Id, description:value}))
}
else {
    setEdit(value)
}

*/

/*
 if (Edit !== ""){
        setShowDetails(false)
      dispatch(EditDescription({id: todoData.Id, description: Edit}))  
      
    }
    else if (todoData.data?.Description !== "" ||todoData.data?.Description === "" ){
      setShowDetails(false)
    }
*/