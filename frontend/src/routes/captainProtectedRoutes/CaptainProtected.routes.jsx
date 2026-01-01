import CaptainHome from '../../pages/CaptainHome'
import UserLogout from '../../pages/UserLogout'
import { Route } from 'react-router-dom'
import {CaptainProtectedWrapper} from '../../pages/CaptainProtectWrapper'
import {CaptainLogout} from '../../pages/CaptainLogout'
import CaptainRiding from '../../pages/CaptainRiding'

export const captainProtectedRoutes = (
    <>
        <Route path='/captain-home' 
            element = { 
                <CaptainProtectedWrapper>
                    <CaptainHome/>
                </CaptainProtectedWrapper>
        } />

        <Route path='/captain/logout' 
            element = {
                <CaptainProtectedWrapper>
                    <CaptainLogout/>
                </CaptainProtectedWrapper>
            }
        />

        <Route path='/captain-riding'
            element = {
                <CaptainProtectedWrapper>
                    <CaptainRiding/>
                </CaptainProtectedWrapper>
            }
        
        />
        
    </>
)