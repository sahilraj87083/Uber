import { Router } from "express";

import {registerUser} from '../controllers/user.controller.js'
import {body} from 'express-validator'


const router = Router()

router.route('/register').post(
    [
        body('email').isEmail().withMessage('Invalid Email'),
        body('fullName.firstName').isLength({min : 3}).withMessage('First name must be at least 3 characters long'),
        body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
    ],
    registerUser
)

export default router
