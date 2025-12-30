import { Route } from 'react-router-dom'
import {
  Start,
  UserLogin,
  UserSignup,
  CaptainLogin,
  CaptainSignup
} from '../../pages'

export const publicRoutes = (
  <>
    <Route index element={<Start />} />
    <Route path="user/login" element={<UserLogin />} />
    <Route path="user/signup" element={<UserSignup />} />
    <Route path="captain/login" element={<CaptainLogin />} />
    <Route path="captain/signup" element={<CaptainSignup />} />
  </>
)
