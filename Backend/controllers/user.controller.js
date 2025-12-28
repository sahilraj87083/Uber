import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {validationResult} from 'express-validator'
import { createUser , generateAccessAndRefereshTokens} from "../services/user.services.js";
import { ApiError } from "../utils/ApiError.js";
import {ApiResponse} from '../utils/ApiResponse.js'


const registerUser = asyncHandler(async (req, res, next) => {

    const errors = validationResult(req)
    if(!errors.isEmpty()){
        throw new ApiError(400,"Validation failed", errors.array() )
    }
    // console.log(req.body)


    const {fullName, email, password, username, contact} = req.body

    // check if user pre existes
    const existedUser = await User.findOne({
        $or : [{email}, {username}]
    })

    if(existedUser){
        throw new ApiError(409, "User with email or username already exists")
    }

    const user = await createUser({
        firstName : fullName.firstName,
        lastName : fullName.lastName,
        username : username,
        email : email,
        password : password,
        contact : contact

    })

    const createdUser = await User.findById(user?._id).select(
        "-password -refreshToken"
    )

    if(!createdUser){
        throw new ApiError(500, "Something went wrong while registering the user")
    }


    return res.status(201)
    .json(new ApiResponse(201, "User created Successfully", createdUser))

    // const accessToken = createdUser.generateAccessToken();
    // return res.status(201)
    // .json(new ApiResponse(201, "User created Successfully", {
    //     user : createdUser,
    //     accessToken : accessToken
    // }))

})

const loginUser = asyncHandler(async(req, res, next) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        throw new ApiError(400,"Validation failed", errors.array() )
    }

    const { email, password} = req.body

    if(!email || !password){
        throw new ApiError(400, "email and password is required")
    }


    const user = await User.findOne({
        $or : [{email}]
    }).select('+password')

    if(!user){
        throw new ApiError(404, "User does not exist")
    }

    const isPasswordCorrect = await user.comparePassword(password)

    if(!isPasswordCorrect){
        throw new ApiError(401, "Invalid email or password")
    }

    const {accessToken, refreshToken} = await generateAccessAndRefereshTokens(user._id)

    const loggedInUser = await User.findById(user._id).select('-refreshToken')

    const options = {
        httpOnly : true,
        secure : true
    }

    return res
    .status(200)
    .cookie('accessToken', accessToken, options)
    .cookie('refreshToken', refreshToken, options)
    .json(
        new ApiResponse(
            200,
            {
                user : loggedInUser, accessToken, refreshToken
            },
            "User logged In Successfully"
        )
    )
})

const getCurrentUser = asyncHandler(async(req, res) => {
    return res
    .status(200)
    .json(new ApiResponse(
        200,
        req.user,
        "User fetched successfully"
    ))
})



export {
    registerUser,
    loginUser,
    getCurrentUser
}