import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
import { Outlet } from 'react-router-dom'
import { useUserContext } from './contexts/UserContext'
import { useEffect } from 'react'
import axios from 'axios'

function App() {
  const {setUser, setAuthToken, setIsAuthReady} = useUserContext()

  useEffect( () => {
    const restoreSession = async () => {
      try {
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/users/refresh`, {},
          {
            withCredentials : true
          }
        )

        setAuthToken(response.data.data.accessToken);
        setUser(response.data.data.user);
      } catch (error) {
        // not logged in → do nothing
        setAuthToken(null);
        setUser(null);
      } finally{
        setIsAuthReady(true)
      }
    }

    restoreSession()
  }, [])

  return (
    <div>
      {/* Navbar / Header can live here */}
      <Outlet />
      {/* Footer */}
    </div>
  )
}

export default App
