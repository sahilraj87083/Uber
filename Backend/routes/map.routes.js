import { body } from "express-validator";
import { Router } from "express";
import { verifyUser } from "../middlewares/auth.middleware.js";
import { query } from "express-validator";

import { getCoordinates , getDistanceTime, getAutoCompleteSuggestions} from "../controllers/maps.controller.js";


const router = Router()

router.route('/get-coordinates').get(
    query('address').isString().isLength({min : 3}),
    verifyUser, getCoordinates)


router.route('/get-distance-time').get(
    query('origin').isString().isLength({min : 3}),
    query('destination').isString().isLength({min : 3}),
    verifyUser, getDistanceTime
)

router.get('/get-suggestions',
    query('input').isString().isLength({ min: 3 }),
    verifyUser,
    getAutoCompleteSuggestions
)


export default router