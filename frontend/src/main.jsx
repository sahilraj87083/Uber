import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import {router} from './routes'
import {UserContextProvider} from './contexts/UserContext'



createRoot(document.getElementById('root')).render(
  <StrictMode>
    
    <UserContextProvider>
      <RouterProvider router={router} />
    </UserContextProvider>
    
  </StrictMode>
)
