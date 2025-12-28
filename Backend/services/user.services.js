import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from '../utils/ApiError.js'
// import { use } from "react";

const createUser = async ({
    firstName, lastName, email, password, username, contact
}) => {
    if( [firstName,lastName, email, username, password, contact].some((field) => field?.trim() === "")){
        throw new ApiError(400, 'All fields are required')
    }

    const user = await User.create(
        {
            fullName : {
                firstName : firstName,
                lastName : lastName
            },
            username : username,
            email : email,
            password : password,
            contact : contact
        }
    )

    return user
}

export {createUser}