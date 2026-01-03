import axios from 'axios'
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';

const getAddressCoordinateService = async (address) => {
    const apiKey = process.env.GOOGLE_MAP_API_KEY;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        // console.log(response.data)

        if (response.data.status === 'OK') {
            const location = response.data.results[ 0 ].geometry.location;
            return {
                lat: location.lat,
                lng: location.lng
            };
        } else {
            throw new Error('Unable to fetch coordinates');
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}

const getDistanceTimeService = async (origin , destination) => {
    if(!origin || !destination){
        throw new ApiError(400, 'Origin and destination are required')
    }

    const apiKey = process.env.GOOGLE_MAP_API_KEY;

    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;

    try {


        const response = await axios.get(url);
        if (response.data.status === 'OK') {

            if (response.data.rows[ 0 ].elements[ 0 ].status === 'ZERO_RESULTS') {
                throw new ApiError(400, 'No routes found')
            }

            return response.data.rows[ 0 ].elements[ 0 ];

        } else {
            throw new ApiError(400, 'Unable to fetch distance and time')
        }

    } catch (err) {
        console.error(err);
        throw new ApiError(500, 'Server Error while fetching Distance and Time', err);
    }


}

const getAutoCompleteSuggestionsService = async (input) => {
    if(!input){
        throw new ApiError(400, 'query is required')
    }

    const apiKey = process.env.GOOGLE_MAP_API_KEY;
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        if (response.data.status === 'OK') {
            return response.data.predictions.map(prediction => prediction.description).filter(value => value);
        } else {
            throw new ApiError(400, 'Unable to fetch suggestions')
        }
    } catch (err) {
        console.error(err);
        throw err;
    }


}

export {
    getAddressCoordinateService,
    getDistanceTimeService,
    getAutoCompleteSuggestionsService
}