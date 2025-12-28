import { Captain } from "../models/captain.model.js";
import { ApiError } from "../utils/ApiError.js";

const createCaptain = async (
    {firstName, lastName, email, password, color, plate, capacity, vehicleType, username, contact}
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
        username,
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
        username,
        contact
    });

    return captain
}



export {createCaptain}