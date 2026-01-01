import { useRef, useState } from 'react';
import Input from './Input'
import { useNavigate } from 'react-router-dom';

const ConfirmRidePopUp = (props) => {
    const [otp, setOtp] = useState('')
    const otpInputRef = useRef(null)
    
    const navigate = useNavigate()

    const submitHandler = (e) => {
        e.preventDefault();
        navigate('/captain-riding')
    }
    return (
        <div>
            <h5 className='p-1 text-center w-[93%] absolute top-0'
                onClick={(e) => {
                    props.setRidePopupPanel(false)
                    props.setConfirmRidePopupPanel(false)

                }} >
                    <i className="ri-arrow-down-wide-line text-3xl text-gray-200"></i>
            </h5>
            <h3 className='text-2xl font-semibold mb-5'>Confirm this ride to Start</h3>
            <div className='flex items-center justify-between p-3 bg-yellow-400 rounded-lg mt-4'>
                <div className='flex items-center gap-3 '>
                    <img className='h-12 rounded-full object-cover w-12' src="https://img.freepik.com/free-photo/serious-young-african-man-standing-isolated_171337-9633.jpg?semt=ais_hybrid&w=740&q=80" alt="" />
                    <h2 className='text-lg font-medium'>Sahil Singh</h2>
                </div>
                <h5 className='text-lg font-semibold'>2.2 KM</h5>
            </div>
            <div className='flex gap-2 justify-between flex-col items-center'>
                <div className='w-full mt-5'>
                    <div className='flex items-center gap-5 p-3 border-b-2'>
                        <div className="flex flex-col items-center justify-between">
                            <i className="ri-map-pin-user-fill"></i>
                            <h3 className='text-base font-medium'>Pickup</h3>
                        </div>
                        <div>
                            <h3 className='text-lg font-medium'>562/11-A</h3>
                            <p className='text-sm -mt-1 text-gray-600'>East Hall City, Noida</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3 border-b-2'>
                        <div className="flex flex-col items-center justify-between">
                            <i className="ri-map-pin-user-fill"></i>
                            <h3 className='text-base font-medium'>Drop</h3>
                        </div>
                        <div>
                            <h3 className='text-lg font-medium'>562/11-A</h3>
                            <p className='text-sm -mt-1 text-gray-600'>West Hall City, Noida</p>
                        </div>

                    </div>
                    <div className='flex items-center gap-5 p-3'>
                        <div className="flex flex-col items-center justify-between">
                            <i className="ri-currency-line"></i>
                            <h3 className='text-base font-medium'>Fare</h3>
                        </div>
                        <div>
                            <h3 className='text-lg font-medium '>Cash</h3>
                            <p className='text-sm -mt-1 text-gray-600'>173.5</p>
                        </div>

                    </div>

                </div>
                <div className='mt-6 w-full'>
                    <form 
                    onSubmit={(e) => {
                        submitHandler(e);
                    }}>
                        <Input 
                            ref={otpInputRef}
                            // type = 'Number'
                            onChange = {(e) => {setOtp(e.target.value)}}
                            placeholder = 'Enter OTP'
                        />
                        <button 
                        onClick={() => {
                        }}
                        className='w-full mt-5 bg-green-600 text-white font-semibold p-2 rounded-lg'>
                            Confirm </button>

                        <button 
                        onClick={() => {
                            props.setRidePopupPanel(false)
                            props.setConfirmRidePopupPanel(false)
                        }}
                        className='mt-2 w-full bg-red-600 text-white font-semibold p-2 px-10 rounded-lg'>
                            Cancel </button>

                    </form>
                </div>
                
                
            </div>
            
        </div>
    )
}

export default ConfirmRidePopUp