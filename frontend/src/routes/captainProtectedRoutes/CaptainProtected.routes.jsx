import CaptainHome from '../../pages/CaptainHome'
import UserLogout from '../../pages/UserLogout'
import { Route } from 'react-router-dom'
import {CaptainProtectedWrapper} from '../../pages/CaptainProtectWrapper'


export const captainProtectedRoutes = (
    <>
        <Route path='/captain-home' element = { 
            <CaptainProtectedWrapper>
                <CaptainHome/>
            </CaptainProtectedWrapper>
        } />
        
    </>
)