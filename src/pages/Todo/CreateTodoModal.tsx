import { motion } from "framer-motion";
import React, { SetStateAction,useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TodoActions } from "../../store/StateSlices";

type TodoModalProp = {
  modalIsOpen: boolean;
  setModalIsOpen: React.Dispatch<SetStateAction<boolean>>;
};
export const TodoModal = (props: TodoModalProp) => {
    const [tempTodoStore, setTempTodoStore] = useState<{Title:string, Description:string}>({Title:"", Description: ""})
     const TodoData = useSelector((store:any)=>store.TodoState)
    const dispatch = useDispatch()
    const {StoreTodo} = TodoActions
  const { modalIsOpen, setModalIsOpen } = props;


  const modalAnimation = {
    modal: {
      initial: {
        opacity: 0,
      },
      animate: {
        opacity: modalIsOpen ? [0, 1] : 0,
      },
      transition: {
        duration: 1,
        delay: 0.15,
      },
      exit: {
        opacity: [1, 0],
      },
    },
  };
  const closeModalBad = () => {
    setModalIsOpen(false); 
  };
  const closeModal = () => {
    dispatch(StoreTodo(tempTodoStore))
    setModalIsOpen(false);
    
  };
  const handleChange = (event:any)=>{
    const {value,id} = event.target
     if ( id === 'title'){
        setTempTodoStore({...tempTodoStore,
            Title: value
        })
     }
     else if(id === "description"){
        setTempTodoStore({...tempTodoStore, Description:value})
     }
  }


  return (
    <motion.div
      initial={modalAnimation.modal.initial}
      animate={modalAnimation.modal.animate}
      transition={modalAnimation.modal.transition}
      exit={modalAnimation.modal.exit}
      className=" sm:scale-115 sm:top-35 md:scale-120  z-50 fixed top-40 pt-10  px-6 min-w-80 pb-3 min-h-100 bg-zinc-200 rounded-tr-4xl rounded-b-2xl rounded-tl-4xl"
    >
        <div onClick={closeModalBad} className="absolute right-8 top-5 text-gray-400 font-bold font-sans cursor-pointer transition-transform duration-150 hover:scale-120 ">X </div>
      <div className="flex flex-col gap-y-15">
        <input
          className="focus:outline-none hover:shadow-xl  border-b-1 border-stone-400  font-mono cursor-pointer  text-center"
          type="text"
          id="title"
          placeholder="Todo Title"
          onChange={handleChange}
          value={tempTodoStore.Title}
        />
        <textarea
          className=" 
        font-mono text-center   focus:outline-none w-full h-60 resize-none"
          placeholder="Description"
          onChange={handleChange}
          id = "description"
          value = {tempTodoStore.Description}
        ></textarea>
        <button
          onClick={closeModal}
          className="xl:px-45 lg:px-36 lg:py-[12px] md:px-30 px-28 border-1 bg-purple-400 border-green-300 text-white cursor-pointer font-semibold transition-all duration-300 hover:bg-purple-400 hover:shadow-xl hover:scale-x-105 rounded-full py-2"
        >
          Create Todo
        </button>
      </div>
    </motion.div>
  );
};

// border sm:border-blue-500 md:border-yellow-400 lg:border-pink-500 xl:border-red-600
//focus:outline-none prevents default behaviour of input borders apearing on click
// so long as parent is fixed or relative you can always position child using absolute
