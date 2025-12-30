import { createBrowserRouter,
  createRoutesFromElements, 
  Route } from 'react-router-dom'
  
import App from '../App'

import { publicRoutes } from './publicRoutes/Public.routes'
import { userProtectedRoutes } from './userProtectedRoutes/UserProtected.routes'
// import { captainRoutes } from './'

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      {publicRoutes}
      {userProtectedRoutes}
      {/* {userRoutes}
      {captainRoutes} */}
    </Route>
  )
)
