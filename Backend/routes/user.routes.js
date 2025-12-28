import { Router } from "express";

import {registerUser, loginUser, getCurrentUser, logoutUser} from '../controllers/user.controller.js'
import {body} from 'express-validator'
import {verifyUser} from '../middlewares/auth.middleware.js'


const router = Router()

router.route('/register').post(
    [
        body('email').isEmail().withMessage('Invalid Email'),
        body('fullName.firstName').isLength({min : 3}).withMessage('First name must be at least 3 characters long'),
        body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
    ],
    registerUser
)

router.route('/login').post(
    [
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
    ],
    loginUser)


router.route('/profile').get(verifyUser,getCurrentUser)
router.route('/logout').post(verifyUser, logoutUser)




export default router
