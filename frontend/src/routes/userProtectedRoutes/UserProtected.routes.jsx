import { Route } from 'react-router-dom'
import {UserProtectedWrapper, Riding, UserLogout, Home} from '../../pages'


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