import { 
    createRideService,
    getFareService,
    getOtpService,
    confirmRideService,
    startRideService,
    endRideService } from "../services/rides.services.js";
import {getCaptainsInTheRadiusService, getAddressCoordinateService} from '../services/maps.services.js'
import { Ride } from "../models/ride.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { validationResult } from "express-validator";
import {sendMessageToSocketId} from '../socket.js'
import { isValidObjectId } from "mongoose";

const createRide = asyncHandler(async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(new ApiError(400, 'Error while creating ride', {message : "error in the input",errors: errors.array()}));
        }
        const { pickup, destination, vehicleType } = req.body;
        const userId = req.user._id;
    
        // Create ride 
        const ride = await createRideService({
            user: userId,
            pickup,
            destination,
            vehicleType,
        });
    
        if(!ride) {
            return res.status(500).json(new ApiError(500, 'Error while creating ride', {}))
        }

        // RESPOND IMMEDIATELY 
        ride.otp = ""
    
        res.status(200).json(
            new ApiResponse(200, "Ride created", { ride })
        );
    
        // BACKGROUND WORK (non-blocking)
    
        (async () => {
            try {
                const pickupCoordinates = await getAddressCoordinateService(pickup)
        
                // console.log(pickupCoordinates)
        
                const captainsInRadius = await getCaptainsInTheRadiusService(pickupCoordinates.lat, pickupCoordinates.lng, 2)
                // console.log("Nearby captains:", captainsInRadius);
                const rideWithUser = await Ride.aggregate([
                    {
                        $match : { _id : ride._id}
                    },
                    {
                        $lookup : {
                            from : 'users',
                            localField : 'user',
                            foreignField : '_id',
                            as : 'user',
                            pipeline : [
                                {
                                    $project : {
                                        fullName : 1,
                                        contact : 1,
                                        email : 1,
                                        socketId : 1
                                    }
                                }
                            ]
                        }
                    },
                    {
                        $unwind : '$user'
                    },
                    {
                        $project : {
                            pickup : 1,
                            destination : 1,
                            fare : 1,
                            status : 1,
                            otp : 1,
                            distance : 1,
                            duration : 1,
                            createdAt : 1,
                            user : 1
                        }
                    }
                ])



                captainsInRadius.map((captain) => {
                    sendMessageToSocketId(captain.socketId, {
                        event : 'new-ride-request',
                        data : rideWithUser[0]
                    })
                })
        
            } catch (error) {
                console.log("Background ride-matching error:", error.message);
            }
        })();
    } catch (error) {
        return res.status(500).json(new ApiError(500, 'Server Error While creating ride', {message: error.message }));
    }
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

const confirmRide = asyncHandler(async (req, res) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(new ApiError(400, 'Error while confirming the ride', {errors: errors.array()}));
    }

    const {rideId} = req.body
    try {
        
        const ride = await confirmRideService({ rideId, captain: req.captain });

        if(!ride){
            return res.status(404).json(new ApiError(404, 'Ride not found or already confirmed', {}));
        }

        sendMessageToSocketId(ride.user.socketId, {
            event : 'ride-confirmed',
            data : ride
        })

        
        
        return res.status(200).json(new ApiResponse(200, 'Ride confirmed successfully', { ride }));

    } catch (error) {
        return res.status(500).json(new ApiError(500, 'Server Error While confirming the ride', {message: error.message }));
    }
})


const startRide = asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(new ApiError(400, 'Error while starting the ride', {errors: errors.array()}));
    }

    const {rideId , otp} = req.query

    if(!rideId || !otp ){
        throw new ApiError(400, 'RideId and Opt are required', {});
    }
    if(!isValidObjectId(rideId)){
        throw new ApiError(400, 'Invalid RideId', {});
    }

    try {
        const ride = await startRideService({rideId, otp, captain : req.captain})
        // console.log("in the ride controller" , ride)

        sendMessageToSocketId(ride.user.socketId,
            {
                event : 'ride-started',
                data : ride
            }
        )

        return res.status(200).json(new ApiResponse(200, 'Ride started!! Happy Journey', {ride : ride}))

    } catch (error) {
        return res.status(500).json(new ApiError(500, 'Server Error while starting the ride', {message: error.message }));
    }
})

const endRide = asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(new ApiError(400, 'Error while ending the ride', {errors: errors.array()}));
    }

    const {rideId} = req.body

    try {
        const ride = await endRideService({ rideId, captain: req.captain });

        sendMessageToSocketId(ride.user.socketId, {
            event : 'ride-ended',
            data : ride
        })

        return res.status(200).json(new ApiResponse(200, 'Ride Ended' , {ride : ride}))

    } catch (error) {
        return res.status(500).json(new ApiError(500, 'Server Error while ending the ride', {message: error.message }));
    }
})


export {
    createRide,
    getFare,
    confirmRide,
    startRide,
    endRide
}
