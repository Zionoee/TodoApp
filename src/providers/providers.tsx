import { Provider } from "react-redux"
import { store } from "../store/store"
import { BrowserRouter as Router } from "react-router-dom"


export const Providers = (props: {children:React.ReactNode})=>{
const {children} = props
    return(<Provider store = {store}>
        <Router>
        {children}
        </Router>
    </Provider>)
}

// best way to arrange providers
//let redux provider be at top so state is available everywhere
// let tanstack provider(if any) be next in this way it can access global state if needed
// let browser router be last i.e in the innermost part in this way routes can access both state and queries
// if browser routes where encompassing all other (i.e first) for example
// a routen component using useSelector() may throw an error as redux store may not be available in routes
