import { getDistanceTimeService } from "../services/maps.services.js"
import { Ride } from "../models/ride.model.js"

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

    const fare = await getFare(pickup, destination);

    const ride = await Ride.create({
        user,
        pickup,
        destination,
        otp : getOtp(6),
        fare : fare[vehicleType]
    })

    return ride
}

const confirmRideService = async() => {

}

const startRideService = async() => {

}

const endRideService = async() => {

}



export {
    createRideService,
    getFareService,
    getOtpService,
    confirmRideService,
    startRideService,
    endRideService
}