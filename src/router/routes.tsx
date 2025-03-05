import { Routes, Route } from "react-router-dom";
import { Todo } from "../pages/Todo/Todo";
import { HomePage } from "../pages/Home/Home";


export const TodoProjectRoutes = ()=>{

    return(
        <Routes>
            <Route path = "/" element = {<HomePage/>} />
           <Route path="/TodoApp" element= {<Todo/>}/> 
        </Routes>
    )
}