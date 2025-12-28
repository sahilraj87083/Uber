import { Captain } from "../models/captain.model.js";
import { ApiError } from "../utils/ApiError.js";
import {ApiResponse} from '../utils/ApiResponse.js'
import { asyncHandler } from "../utils/asyncHandler.js";
import { createCaptain } from "../services/captain.services.js";
import {validationResult} from 'express-validator'

const registerCaptain = asyncHandler(async (req, res, next) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        throw new ApiError(400,"Validation failed", errors.array() )
    }


    const {fullName, email, username, password, vehicle, contact} = req.body

    if(!fullName || !email || !username || !password || !vehicle || !contact){
        throw new ApiError(400, "All fields are required")
    }

    const existedCaptain = await Captain.findOne({
        $or : [{username}, {email}]
    })

    if(existedCaptain){
        throw new ApiError(409, "Captain with email or username already exists")
    }
    const captain = await createCaptain({
        firstName : fullName.firstName,
        lastName : fullName.lastName,
        email : email,
        password : password,
        color : vehicle.color,
        plate : vehicle.plate, 
        capacity : vehicle.capacity, 
        vehicleType : vehicle.vehicleType, 
        username :username, 
        contact : contact
    })

    const createdCaptain = await Captain.findById(captain?._id).select("-password -refreshToken")

    if(!createdCaptain){
        throw new ApiError(500, "Something went wrong while registering the Captain")
    }

    return res
    .status(201)
    .json(new ApiResponse(201, "Captain created Successfully", createdCaptain))
})




export {
    registerCaptain
}