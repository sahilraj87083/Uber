import { 
    createRideService,
    getFareService,
    getOtpService,
    confirmRideService,
    startRideService,
    endRideService } from "../services/rides.services.js";

import { Ride } from "../models/ride.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { validationResult } from "express-validator";

const createRide = asyncHandler(async () => {

})

const  getFare = asyncHandler(async (req,res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(new ApiError(400, 'Error while getting Fare', {errors: errors.array()}));
    }

    const { pickup, destination } = req.query;

    try {
        const fare = await getFareService(pickup, destination)

        return res.status(200).json(new ApiResponse(200, "Fare fetched Successfully", {fare : fare}))
    } catch (error) {
        return res.status(500).json(new ApiError(500, 'Server Error While getting fare', {message: error.message }));
    }


})

const confirmRide = asyncHandler(async () => {

})


const startRide = asyncHandler(async () => {

})

const endRide = asyncHandler(async () => {

})


export {
    createRide,
    getFare,
    confirmRide,
    startRide,
    endRide
}
