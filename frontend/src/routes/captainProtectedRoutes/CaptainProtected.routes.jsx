import CaptainHome from '../../pages/CaptainHome'
import UserLogout from '../../pages/UserLogout'
import { Route } from 'react-router-dom'
import {UserProtectedWrapper} from '../../pages/UserProtectWrapper'


export const captainProtectedRoutes = (
    <>
        <Route path='/captain-home' element = { <CaptainHome/>} />
        
    </>
)