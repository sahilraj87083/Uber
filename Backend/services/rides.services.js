import { getDistanceTimeService } from "../services/maps.services.js"
import { Ride } from "../models/ride.model.js"
import { ApiError } from "../utils/ApiError.js"
import crypto from 'crypto'
import mongoose from "mongoose"


const getFareService = async(pickup, destination) => {
    if(!pickup || !destination){
        throw new ApiError(400, 'Pickup and destination are required')
    }

    const distanceTime = await getDistanceTimeService(pickup, destination)

    const baseFare = {
        auto: 10,
        car: 20,
        moto: 5
    }

    const perKmRate = {
        auto: 5,
        car: 7,
        moto: 2
    };

    const perMinuteRate = {
        auto: 0.50,
        car: 0.75,
        moto: 0.25
    };

    const fare = {
        auto: Math.round(baseFare.auto + ((distanceTime.distance.value / 1000) * perKmRate.auto) + ((distanceTime.duration.value / 60) * perMinuteRate.auto)),
        car: Math.round(baseFare.car + ((distanceTime.distance.value / 1000) * perKmRate.car) + ((distanceTime.duration.value / 60) * perMinuteRate.car)),
        moto: Math.round(baseFare.moto + ((distanceTime.distance.value / 1000) * perKmRate.moto) + ((distanceTime.duration.value / 60) * perMinuteRate.moto))
    };
    
    return fare;
}
const getOtpService = (num) => {
    function generateOtp(num) {
        const otp = crypto.randomInt(Math.pow(10, num - 1), Math.pow(10, num)).toString();
        return otp;
    }
    return generateOtp(num);
}


const createRideService = async ({user, pickup, destination, vehicleType}) => {
    if(!user || !pickup || !destination || !vehicleType){
        throw new ApiError(400, 'All fields are required')
    }

    const fare = await getFareService(pickup, destination);

    const ride = await Ride.create({
        user,
        pickup,
        destination,
        otp : getOtpService(6),
        fare : fare[vehicleType]
    })

    return ride
}

const confirmRideService = async( {rideId, captain}) => {
    if(!rideId){
        throw new ApiError(400, 'RideId is required')
    }

    await Ride.findOneAndUpdate(
        {
            _id : rideId
        },
        {
            status : 'accepted',
            captain : captain._id
        }
    )

    const ride = await Ride.aggregate([
        {
            $match : { _id : new mongoose.Types.ObjectId(rideId) }
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
        },{
            $unwind : '$user'
        },
        {
            $lookup : {
                from : 'captains',
                localField : 'captain',
                foreignField : '_id',
                as : 'captain',
                pipeline : [
                    {
                        $project : {
                            fullName : 1,
                            contact : 1,
                            email : 1,
                            socketId : 1,
                            vehicle : 1,
                            location : 1
                        }
                    }  
                ]
            }
        },
        {
            $unwind : '$captain'
        },{
            $project : {
                pickup : 1,
                destination : 1,
                fare : 1,
                status : 1,
                otp : 1,
                distance : 1,
                duration : 1,
                createdAt : 1,
                user : 1,
                captain : 1
            }
        }
    ])

    // console.log(ride)

    if(!ride || ride.length === 0){
        throw new ApiError(404, 'Ride not found')
    }
    
    return ride[0]
}

const startRideService = async({rideId, otp, captain}) => {
    if(!rideId || !otp){
        throw new ApiError(400, 'RideId and Opt are required', {});
    }

    const ride = await Ride.aggregate([
        {
            $match : {
                _id : new mongoose.Types.ObjectId(rideId)
            }
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
        },{
            $unwind : '$user'
        },
        {
            $lookup : {
                from : 'captains',
                localField : 'captain',
                foreignField : '_id',
                as : 'captain',
                pipeline : [
                    {
                        $project : {
                            fullName : 1,
                            contact : 1,
                            email : 1,
                            socketId : 1,
                            vehicle : 1,
                            location : 1
                        }
                    }  
                ]
            }
        },
        {
            $unwind : '$captain'
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
                user : 1,
                captain : 1
            }
        }
    ])

    if(!ride || ride.length === 0){
         throw new ApiError(404, 'Ride not found')
    }

    if(ride[0].status !== 'accepted'){
         throw new ApiError(404, 'Ride not accepted')
    }

    if(ride[0].otp !== otp){
         throw new ApiError(400, 'Invalid Otp')
    }

    await Ride.findByIdAndUpdate(rideId, 
        {
            status : 'ongoing'
        }
    )

    return ride[0];
}

const endRideService = async({rideId , captain}) => {
    if(!rideId){
        throw new ApiError(400, 'rideId is required') 
    }

    const ride = await Ride.aggregate([
        {
            $match : {
                _id : new mongoose.Types.ObjectId(rideId),
                captain : captain._id
            }
        },
        {
            $lookup : {
                from : 'captains',
                localField : 'captain',
                foreignField : '_id',
                as : 'captain',
                pipeline : [
                    {
                        $project : {
                            fullName : 1,
                            contact : 1,
                            email : 1,
                            socketId : 1,
                            vehicle : 1,
                            location : 1
                        }
                    }
                ]
            }
        },
        {
            $unwind : '$captain'
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
        },{
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
                user : 1,
                captain : 1
            }
        }
    ])

    if(!ride || ride.length === 0){
        throw new ApiError(404, 'Ride not found')
    }

    if(ride[0].status !== 'ongoing'){
        throw new ApiError(400, 'Ride is not ongoing')
    }

    await Ride.findByIdAndUpdate(rideId, 
        {
            status : 'completed'
        }
    )

    return ride[0];
}



export {
    createRideService,
    getFareService,
    getOtpService,
    confirmRideService,
    startRideService,
    endRideService
}