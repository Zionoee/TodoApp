
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Providers } from './providers/providers.tsx'

createRoot(document.getElementById('root')!).render(
  
    
     <Providers>
       <App />
     </Providers>
    

)
// better to import router here for 2 reasons
// 1 it seperates routing logic from UI logic (UI logic should be done in App.tsx)
// 2 it wraps up our entire app alowwing routing without restrictions