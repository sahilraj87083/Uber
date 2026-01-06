import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import {router} from './routes'
import {UserContextProvider} from './contexts/UserContext'
import { CaptainContextProvider } from './contexts/CaptainContext'
import { SocketContextProvider } from './contexts/SocketContext'


createRoot(document.getElementById('root')).render(
  <StrictMode>
      <CaptainContextProvider>
          <UserContextProvider>
                <SocketContextProvider>
                    <RouterProvider router={router} />
                </SocketContextProvider>
          </UserContextProvider>
      </CaptainContextProvider>
  </StrictMode>
)
