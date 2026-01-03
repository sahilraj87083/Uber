import { getAddressCoordinateService, getDistanceTimeService , getAutoCompleteSuggestionsService} from "../services/maps.services.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { validationResult } from "express-validator";


const getCoordinates = asyncHandler(async(req, res, next) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json(new ApiError(400, "", {errors: errors.array()}))
    }

    const {address} = req.query

    try {
        const coordinates = await getAddressCoordinateService(address);
        return res.status(200).json(new ApiResponse(200,'Co-ordinates fetched successfully' , { coordinates : coordinates}));
    } catch (error) {
        res.status(404).json(new ApiError(404, "Co-ordinates not found!"));
    }


})

const getDistanceTime = asyncHandler(async(req, res, next) => {
    try {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json(new ApiError(400, "Invalid Input", {errors: errors.array()}))
        }

        const { origin, destination } = req.query;

        const distanceTime = await getDistanceTimeService (origin, destination)
        return res.status(200).json(new ApiResponse(200, 'Distance and Time fetched Successfully' , distanceTime))

    } catch (error) {
        console.error(err);
        return res.status(500).json(new ApiResponse(500,'Internal server error'));
    }


})

const getAutoCompleteSuggestions = asyncHandler(async (req, res, next) => {
    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(new ApiError(400, "Invalid Input", {errors: errors.array()}));
        }

        const { input } = req.query;

        const suggestions = await getAutoCompleteSuggestionsService(input);

        return res.status(200).json(new ApiResponse(200, 'Suggestions fetched Successfully' , suggestions))

    } catch (err) {
        console.error(err);
        res.status(500).json(new ApiResponse(500,'Internal server error'));
    }
})

export {
    getCoordinates,
    getDistanceTime,
    getAutoCompleteSuggestions
}