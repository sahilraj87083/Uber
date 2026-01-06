import {bootstrapAuth} from './utils/bootstrapAuth'
import { Outlet , useLocation} from 'react-router-dom'
import { useUserContext } from './contexts/UserContext'
import { useEffect } from 'react'
import { useCaptainContext } from './contexts/CaptainContext'

function App() {
  const {setUser, setAuthToken : setUserAuthToken, setIsAuthReady : setUserIsAuthReady} = useUserContext()
  const {setCaptain, setAuthToken: setCaptainAuthToken,  setIsAuthReady : setCaptainIsAuthReady} = useCaptainContext()

  const location = useLocation();

  useEffect(() => {
    if (location.pathname.startsWith("/captain")) {
      bootstrapAuth({
        refreshUrl: `${import.meta.env.VITE_BASE_URL}/api/v1/captain/refresh`,
        setEntity: setCaptain,
        setToken: setCaptainAuthToken,
        setReady: setCaptainIsAuthReady,
      });
    } else {
      bootstrapAuth({
        refreshUrl: `${import.meta.env.VITE_BASE_URL}/api/v1/users/refresh`,
        setEntity: setUser,
        setToken: setUserAuthToken,
        setReady: setUserIsAuthReady,
      });
    }
  }, []);

  return (
    <div>
      {/* Navbar / Header can live here */}
      <Outlet />
      {/* Footer */}
    </div>
  )
}

export default App
