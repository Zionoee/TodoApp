
import { Header } from "./layouts/header"
import { SideBar } from "./layouts/sideBar"
import { useDispatch, useSelector } from "react-redux"
import { sideBarActions } from "./store/StateSlices"
import { Todo } from "./pages/Todo/Todo"



function App() {
  const theme = useSelector((store:any)=> store.themeState.value)
  // const dispatch = useDispatch()
  // const {setTheme} = themeActions
  
  // useEffect(()=>{
  //   const getItem = ()=>{
  //     const data = localStorage.getItem('theme')
  //     dispatch(setTheme(data))
  //   }
  //   getItem()
  //   // const saveThemeBeforeUnload = ()=>{
  //   //   localStorage.setItem('theme', theme)
  //   // }

  //   // window.addEventListener("beforeunload", saveThemeBeforeUnload)
  //   // return ()=>{
  //   //   window.removeEventListener('beforeunload', saveThemeBeforeUnload)
  //   // }
  // },[])
  console.log('is app running')
  return(<div  className = {`${(theme === "DarkTheme"?"bg-gray-800" :"")} min-h-screen h-fit`}>
   <Header/>
  <SideBar/>
  <Todo/>
  </div>)
}

export default App

// use min-h-screen and h-fit inorder to allow your theme to cover your entire page

//  Good   src folder structure
// components-reusable UI components
// pages- route based pages e.g home.tsx
// hooks- custom hooks
//api- Api requests (e.g tanstack query services)
// layouts- layout components e.g navigation bar, sideBar
// assets- images, fonts and global styles
// providers- Context and third party providers
// router- react-router setup e.g Approutes.tsx
// store- redux store
// utils- utility functions
// App.tsx
// main.tsx