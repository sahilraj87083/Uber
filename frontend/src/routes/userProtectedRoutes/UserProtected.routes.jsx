import Home from '../../pages/Home'
import UserLogout from '../../pages/UserLogout'
import { Route } from 'react-router-dom'
import {UserProtectedWrapper} from '../../pages/UserProtectWrapper'


export const userProtectedRoutes = (
    <>
        <Route path='/home' 
        element = {
            <UserProtectedWrapper>
                <Home/>
            </UserProtectedWrapper>
        }
        />
        <Route path='/user/logout' 
        element = {
            <UserProtectedWrapper>
                <UserLogout/>
            </UserProtectedWrapper>
        }
        />
    </>
)