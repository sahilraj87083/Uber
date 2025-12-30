import { Route } from 'react-router-dom'
import {
  Home,
  Start,
  UserLogin,
  UserSignup,
  CaptainLogin,
  CaptainSignup
} from '../../pages'

export const publicRoutes = (
  <>
    <Route index element={<Start />} />
    <Route path="home" element={<Home />} />
    <Route path="user-login" element={<UserLogin />} />
    <Route path="user-signup" element={<UserSignup />} />
    <Route path="captain-login" element={<CaptainLogin />} />
    <Route path="captain-signup" element={<CaptainSignup />} />
  </>
)
