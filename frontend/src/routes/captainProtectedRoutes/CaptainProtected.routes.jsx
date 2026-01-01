import CaptainHome from '../../pages/CaptainHome'
import { Route } from 'react-router-dom'
import {CaptainProtectedWrapper, CaptainLogout, CaptainRiding} from '../../pages'


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