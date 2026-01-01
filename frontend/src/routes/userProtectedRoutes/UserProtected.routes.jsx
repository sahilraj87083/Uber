import Home from '../../pages/Home'
import UserLogout from '../../pages/UserLogout'
import { Route } from 'react-router-dom'
import {UserProtectedWrapper} from '../../pages/UserProtectWrapper'
import Riding from '../../pages/Riding'


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
        <Route  path='/riding'
            element = {
                <UserProtectedWrapper>
                    <Riding/>
                </UserProtectedWrapper>
            }
        />
    </>
)