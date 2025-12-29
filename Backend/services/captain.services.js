import { Captain } from "../models/captain.model.js";
import { ApiError } from "../utils/ApiError.js";

const createCaptain = async (
    {firstName, lastName, email, password, color, plate, capacity, vehicleType, contact}
) => {


    // string fields
    const stringFields = [
        firstName,
        lastName,
        email,
        password,
        color,
        plate,
        vehicleType,
        contact,
    ];

    if (stringFields.some((field) => typeof field !== 'string' || field.trim() === "")) {
        throw new ApiError(400, "All string fields are required");
    }

    // numeric fields
    if (typeof capacity !== "number" || capacity < 1) {
        throw new ApiError(400, "Vehicle capacity must be a valid number");
    }

    const captain = await Captain.create({
        fullName : { firstName, lastName },
        email,
        password,
        vehicle: { color, plate, capacity, vehicleType },
        contact
    });

    return captain
}

const generateAccessAndRefereshTokens = async (captainId) => {
    try {
        const captain = await Captain.findById(captainId);
    
        const accessToken = captain.generateAccessToken()
        const refreshToken = captain.generateRefreshToken()
    
        captain.refreshToken = refreshToken
        await captain.save({
            validateBeforeSave : false
        })
    
        return {accessToken, refreshToken};
    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating referesh and access token")
    }
}

export {createCaptain, generateAccessAndRefereshTokens}