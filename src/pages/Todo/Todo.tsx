import { useEffect, useState } from "react";
import { TodoItemLayout } from "./todoItemLayout";
import { TodoModal } from "./CreateTodoModal";
import { AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { TodoActions } from "../../store/StateSlices";

export const Todo = () => {
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const TodoData = useSelector((store: any) => store.TodoState.value);
  const dispatch = useDispatch();
  const { GetTodoFromLocalStorage, ClearTodo } = TodoActions;
  const theme = useSelector((store: any) => store.themeState.value);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const openModal = () => {
    setModalIsOpen(true);
  };

  const Data =
    TodoData?.length > 0
      ? TodoData.map((todo: any) => {
          return (
            <TodoItemLayout
              key={todo.Id}
              todoData={todo}
              showDetailsModal={showDetailsModal}
              setShowDetailsModal={setShowDetailsModal}
            />
          );
        })
      : [];
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const indexOfLastItem = itemsPerPage * currentPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = Data.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(Data.length / itemsPerPage);

  useEffect(() => {
    console.log("local.getItem", localStorage.getItem("TodoItem"));
    const StoredTodos = localStorage.getItem("TodoItem");
    const todos: string[] = StoredTodos ? JSON.parse(StoredTodos) : [];
    console.log("this is todos", todos);
    dispatch(GetTodoFromLocalStorage(todos));
    //  console.log('storedTodos in one time useEffect :', todos)
  }, []);
  const clearAllTodos = () => {
    dispatch(ClearTodo());
  };
  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };
  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  console.log(currentPage);
  console.log(totalPages);
  console.log(Data.length);
  //  if   ((indexOfLastItem % itemsPerPage) === 0 && currentPage !== totalPages ){
  //   setCurrentPage((prev)=> prev + 1)
  //  }
  return (
    <div className="flex  justify-center">
      <AnimatePresence>
        {modalIsOpen && (
          <TodoModal
            modalIsOpen={modalIsOpen}
            setModalIsOpen={setModalIsOpen}
          />
        )}
      </AnimatePresence>
      <div
        className={`  ${
          modalIsOpen && "blur-[3px] opacity-50"
        } pt-24 flex flex-col items-center`}
      >
        <div className="mt-24 ">
          <button
            onClick={openModal}
            className="xl:px-67 lg:px-52 lg:py-[12px] md:px-36 px-28  bg-purple-400  text-white cursor-pointer font-semibold transition-all duration-300 hover:bg-green-600 hover:shadow-xl hover:scale-x-105 rounded-full py-2"
          >
            Create New Todo
          </button>
        </div>
        <div>
          <button
            onClick={clearAllTodos}
            className="mt-2 xl:px-69 lg:px-54 lg:py-[12px] md:px-38 px-30  bg-purple-400  text-white cursor-pointer font-semibold transition-all duration-300 hover:bg-red-500 hover:shadow-xl hover:scale-x-105 rounded-full py-2"
          >
            Clear All Todos
          </button>
        </div>

        <div>
          <div
            className={`flex flex-wrap flex-row-reverse justify-center gap-10  ${
              theme === "DarkTheme"
                ? "bg-gray-800 "
                : "bg-stone-100 border-t-stone-200 border-t-1"
            }   w-screen h-fit min-h-[442px]  py-20 px-15 mt-15`}
          >
            {/* {Array.from({length:1}, ()=>{return()})} */}
            {currentItems.length > 0 ? (
              currentItems.map((item: any, index: any) => (
                <span key={index}>{item}</span>
              ))
            ) : (
              <div className=" w-fit flex justify-center items-center">
                <p className=" cursor-pointer text-4xl font-bold font-mono text-stone-600">
                  No Todo Created
                </p>
              </div>
            )}
           
          </div>
        </div>
       {
        <div className={`${ theme === "DarkTheme" ? "bg-gray-800" : 'bg-stone-100'}  w-full flex justify-center gap-x-10`}>
        <button className={`${theme === "DarkTheme" ? "bg-purple-800 text-zinc-400 hover:text-zinc-100":"bg-purple-400  " } hover:scale-110 hover:shadow-2xl transition-all duration-300  text-zinc-100 cursor-pointer font-bold  rounded-full px-6 py-2 `} disabled={currentPage === totalPages} onClick={handleNext}>
              next
            </button>
            <button disabled={currentPage === 1} onClick={handlePrev}
            className={`${theme === "DarkTheme" ? "bg-purple-800 text-zinc-400 hover:text-zinc-100":"bg-purple-400  " } hover:scale-110 hover:shadow-2xl transition-all duration-300  text-zinc-100 cursor-pointer font-bold  rounded-full px-6 py-2 `}
            >
              prev
            </button>
        </div>
       }
      </div>
    </div>
  );
};

