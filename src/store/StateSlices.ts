import { createSlice } from "@reduxjs/toolkit";
type finalType = {
  value : values[],
  selectedTodo: values 
}
type values = {
  data?: {Title?:string, Description?: string}
  DateCreated?: string,
  TimeCreated?: string,
  Id?: string
}

 export const sideBarSlice = createSlice({
    name: "sideBarState",
    initialState: {value: false},
    reducers: {
      changeSideBarState: (state)=>{
        state.value = !state.value
      },
      setSideBarStateFalse : (state, action)=>{
        state.value = action.payload
      }
    }
})
const storedTheme = localStorage.getItem('theme')
export const themeSlice = createSlice({
    
    name: "Theme",
    initialState: {value: storedTheme},
    reducers: {
        changeTheme: (themeState)=>{
        if(themeState.value === 'DarkTheme'){
            themeState.value = "LightTheme"
           
        }else{
            themeState.value = "DarkTheme"
        }
    localStorage.setItem('theme',themeState.value )
    },
        // setTheme: (themeState, action)=>{
        //      themeState.value = action.payload
        // }
    } 
})
const initialState : finalType = { value: [], selectedTodo: {}}
const Day = ["Sunday", "Monday", "TuesDay", "Wednesday", "Thursday", "Friday", "Saturday"]
const monthName =["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
const date = new Date()
const year = date.getUTCFullYear()
const month = date.getUTCMonth()
const exactDate = date.getUTCDate() 
const hour = date.getUTCHours()
const day = date.getUTCDay()
const minutes = date.getUTCMinutes()
const ampm = hour < 12 ? 'AM' : "PM"
export const TodoSlice = createSlice({
  name: "Todo",
  initialState,
  reducers: {
     StoreTodo: (state, action)=>{
     
      // state.value.push(action.payload)
      //  state.value.push({
      //    data: action.payload,
      //    DateCreated: `${year}-${month}-${exactDate}`,
      //    TimeCreated: `${Day[day]} ${hour % 12 || 12}:${minutes} ${ampm}`
      //  })
      state.value = [...state.value, {
        data: action.payload,
        DateCreated: `${exactDate}-${monthName[month]}-${year}`,
        TimeCreated: `${Day[day]} ${hour % 12 || 12}:${minutes} ${ampm}`,
        Id : crypto.randomUUID()
      }]
      console.log('this  is state.value',state.value)
      console.log("this is state", state)
      localStorage.setItem("TodoItem", JSON.stringify(state.value))
      // const item = localStorage.getItem('Todo')
      // const parseItem = item ? JSON.parse(item): []
      // if (parseItem.length > 0){
           
      // }
      
      // localStorage.setItem("Todo", JSON.stringify(state)) 
  },
  setSelectedTodoNull : (state)=>{
  state.selectedTodo = {}
  },
  SelectTodo : (state, action)=>{
 state.selectedTodo = action.payload
 console.log("this is Id of selceted Todo", state.selectedTodo?.Id)
  },
  GetTodoFromLocalStorage: (state,action)=>{
    if(action?.payload.length > 0){
      state.value = [...state.value, ...action.payload]
      console.log('SetTodo ran with payload.length > 0')
      console.log("state.value when action.payload > 0", state.value)
    }
     else{
     state.value = action.payload
     console.log("setTodo ran with payload.lenght < 0")
     console.log("state.value when action.payload,0 ",state.value)
     }
    
   },
   ClearTodo : (state)=>{
    localStorage.removeItem("TodoItem")
    state.value.length = 0
   },
   EditDescription: (state, action)=>{
    console.log('Edit action.payload', action.payload)
    console.log("edit state.selectedTodo", state.selectedTodo)
    state.selectedTodo = {...state.selectedTodo, data:{Title: state.selectedTodo?.data?.Title, Description:action.payload}}
  if (state?.selectedTodo !== undefined){
    state.value = state.value.map((el, )=>

      (
        el.Id === state.selectedTodo?.Id ? state.selectedTodo : {...el}
      )
      )
      // 
  }
  
  localStorage.setItem("TodoItem", JSON.stringify(state.value))
   },
   DeleteTodo: (state)=>{
    
    console.log("edit state.selectedTodo", state.selectedTodo)
   if(state.selectedTodo !== undefined){
    state.value = state.value.filter((el)=> el.Id !== state.selectedTodo?.Id)
  }
   localStorage.setItem("TodoItem", JSON.stringify(state.value))
   }

}
})



export const TodoActions = TodoSlice.actions
export const TodoReducer = TodoSlice.reducer

export const themeActions = themeSlice.actions
export const themeReducer = themeSlice.reducer


export const sideBarActions = sideBarSlice.actions
export const sideBarReducer = sideBarSlice.reducer

// we get the hours in 24 hours format so we converted it to 12 hours format using maths principle i.e %
// get the day in numbe re.g 0 for sunday hence we defined and array with week names and use it with getUTCDay
// note in redux reassinging an entire state is not tracked by immer
// hence if an entire state is reassigned it won't update our state
// e.g (themeState)=>{ themeState = []} wont be updated cause we tried to reassign our entire themeState
// ways to go around this
// (themeState)=> {return []} correct way to reassign entire themeState
// or define a property in themeState and reassign that property e.g
// initialState : {theme: ["you"]}
// (themeState)=>{themeSate.theme = []} this works as we are not reassigning the entire themeState but a property
// crypto.randomUUID() generates unique id works only in modern browsers