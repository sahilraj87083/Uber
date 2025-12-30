import { createBrowserRouter,
  createRoutesFromElements, 
  Route } from 'react-router-dom'
  
import App from '../App'

import { publicRoutes } from './publicRoutes/public.routes'
// import { userRoutes } from './user.routes'
// import { captainRoutes } from './captain.routes'

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      {publicRoutes}
      {/* {userRoutes}
      {captainRoutes} */}
    </Route>
  )
)
