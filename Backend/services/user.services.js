import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from '../utils/ApiError.js'
// import { use } from "react";

const createUser = async ({
    firstName, lastName, email, password, contact
}) => {
    if( [firstName,lastName, email, password, contact].some((field) => field?.trim() === "")){
        throw new ApiError(400, 'All fields are required')
    }

    const user = await User.create(
        {
            fullName : {
                firstName : firstName,
                lastName : lastName
            },
            email : email,
            password : password,
            contact : contact
        }
    )

    return user
}

const generateAccessAndRefereshTokens = async (userId) => {
    try {
        const user = await User.findById(userId);
    
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()
    
        user.refreshToken = refreshToken
        await user.save({
            validateBeforeSave : false
        })
    
        return {accessToken, refreshToken};
    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating referesh and access token")
    }
}


export {createUser, generateAccessAndRefereshTokens}