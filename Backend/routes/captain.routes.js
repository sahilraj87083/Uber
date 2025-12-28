import {body} from 'express-validator'
import { Router } from "express";
import { registerCaptain, loginCaptain, getCurrentCaptain, logoutCaptain } from '../controllers/captain.controller.js';
import { verifyCaptain } from '../middlewares/auth.middleware.js';
const router = Router()

router.route('/register').post(
    [
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullName.firstName').isLength({ min: 3 }).withMessage('First name must be at least 3 characters long'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('vehicle.color').isLength({ min: 3 }).withMessage('Color must be at least 3 characters long'),
    body('vehicle.plate').isLength({ min: 3 }).withMessage('Plate must be at least 3 characters long'),
    body('vehicle.capacity').isInt({ min: 1 }).withMessage('Capacity must be at least 1'),
    body('vehicle.vehicleType').isIn([ 'car', 'motorcycle', 'auto' ]).withMessage('Invalid vehicle type')
    ],
    registerCaptain
)

router.route('/login').post(
    [
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
    ],
    loginCaptain
)


router.route('/profile').get(verifyCaptain,getCurrentCaptain)
router.route('/logout').post(verifyCaptain,logoutCaptain)

export default router