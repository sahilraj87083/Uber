import { useNavigate } from "react-router-dom"
import axios from 'axios'
import { useCaptainContext } from "../contexts/CaptainContext.jsx"

const FinishRide = (props) => {
    const navigate = useNavigate()
    const {authToken} = useCaptainContext()

    const endRide = async() => {
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/ride/end-ride`, 
            {
                rideId : props.ride._id
            },
            {
                headers : {
                    Authorization : `Bearer ${authToken}`
                },
                withCredentials : true
            }
        )

        if(response.status === 200){
            navigate('/captain-home')
        }
    }

    return (
        <div>
            <h5 className='p-1 text-center w-[93%] absolute top-0' onClick={() => {
                props.setFinishRidePanel(false)
            }}><i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i></h5>

            <h3 className='text-2xl font-semibold mb-5'>Finish this Ride</h3>

            <div className='flex items-center justify-between p-4 border-2 border-yellow-400 rounded-lg mt-4'>
                <div className='flex items-center gap-3 '>
                    <img className='h-12 rounded-full object-cover w-12' src="https://img.freepik.com/free-photo/serious-young-african-man-standing-isolated_171337-9633.jpg?semt=ais_hybrid&w=740&q=80" alt="" />
                    <h2 className='text-lg font-medium'>{props.ride?.user.fullName.firstName + ' ' + props.ride?.user.fullName.lastName}</h2>
                </div>
                {props.ride?.distance && <h5 className='text-lg font-semibold'>2.2 KM</h5>}
            </div>

            <div className='flex gap-2 justify-between flex-col items-center'>
                <div className='w-full mt-5'>
                    <div className='flex items-center gap-5 p-3 border-b-2'>
                        <div className="flex flex-col items-center justify-between">
                            <i className="ri-map-pin-user-fill"></i>
                            <h3 className='text-base font-medium'>Pickup</h3>
                        </div>
                        <div>
                            {/* <h3 className='text-lg font-medium'>562/11-A</h3> */}
                            <p className='text-sm -mt-1 text-gray-600'>{props.ride?.pickup}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3 border-b-2'>
                        <div className="flex flex-col items-center justify-between">
                            <i className="ri-map-pin-user-fill"></i>
                            <h3 className='text-base font-medium'>Drop</h3>
                        </div>
                        <div>
                            {/* <h3 className='text-lg font-medium'>562/11-A</h3> */}
                            <p className='text-sm -mt-1 text-gray-600'>{props.ride?.destination}</p>
                        </div>

                    </div>
                    <div className='flex items-center gap-5 p-3'>
                        <div className="flex flex-col items-center justify-between">
                            <i className="ri-currency-line"></i>
                            <h3 className='text-base font-medium'>Fare</h3>
                        </div>
                        <div className="flex gap-10 items-center w-full justify-center">
                            <p className='text-lg font-bold text-gray-600'>Cash</p>
                            <h3 className='text-lg font-bold mr-5'>₹ {props.ride?.fare}</h3>
                        </div>
                    </div>
                </div>
                
                <div className='mt-10 w-full'>

                    <button
                        onClick={endRide}
                        className='w-full mt-5 flex  text-lg justify-center bg-green-600 text-white font-semibold p-3 rounded-lg'>Finish Ride</button>


                </div>
                
            </div>
        </div>
    )
}

export default FinishRide