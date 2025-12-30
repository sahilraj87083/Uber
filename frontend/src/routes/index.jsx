import { createBrowserRouter,
  createRoutesFromElements, 
  Route } from 'react-router-dom'
  
import App from '../App'

import { publicRoutes } from './publicRoutes/Public.routes'
import { userProtectedRoutes } from './userProtectedRoutes/UserProtected.routes'
// import { captainRoutes } from './'
import { captainProtectedRoutes } from './captainProtectedRoutes/captainProtected.routes'

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      {publicRoutes}
      {userProtectedRoutes}
      {captainProtectedRoutes}
      {/* {userRoutes}
      {captainRoutes} */}
    </Route>
  )
)
