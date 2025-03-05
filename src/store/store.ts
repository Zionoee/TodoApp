import { configureStore } from "@reduxjs/toolkit";
import { sideBarReducer, themeReducer, TodoReducer } from "./StateSlices";


export const store = configureStore({
    reducer: {
        sideBarState : sideBarReducer,
        themeState: themeReducer,
        TodoState: TodoReducer
    }
})