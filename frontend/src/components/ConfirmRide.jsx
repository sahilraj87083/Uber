const ConfirmRide = (props) => {
    return (
        <div>
            <h5 className='p-1 text-center w-[93%] absolute top-0'
                onClick={(e) => {
                    props.setConfirmRidePanel(false)
                    props.setVehiclePanel(true)

                }} >
                    <i className="ri-arrow-down-wide-line text-3xl text-gray-200"></i>
            </h5>
            <h3 className='text-2xl font-semibold mb-5'>Confirm your Ride</h3>
            <div className="flex flex-col justify-between items-center">
                <img className="h-20" src="https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=552/height=368/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy82NDkzYzI1NS04N2M4LTRlMmUtOTQyOS1jZjcwOWJmMWI4MzgucG5n" alt="" />
                <div className='w-full mt-5'>
                    <div className='flex items-center gap-5 p-3 border-b-2'>
                        <div className="flex flex-col items-center justify-between">
                            <i className="ri-map-pin-user-fill"></i>
                            <h3 className='text-base font-medium'>Pickup</h3>
                        </div>
                        <div>
                            {/* <h3 className='text-lg font-medium'>562/11-A</h3> */}
                            <p className='text-sm -mt-1 text-gray-600'>{props.pickup}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3 border-b-2'>
                        <div className="flex flex-col items-center justify-between">
                            <i className="ri-map-pin-user-fill"></i>
                            <h3 className='text-base font-medium'>Drop</h3>
                        </div>
                        <div>
                            {/* <h3 className='text-lg font-medium'>562/11-A</h3> */}
                            <p className='text-sm -mt-1 text-gray-600'>{props.destination}</p>
                        </div>

                    </div>
                    <div className='flex items-center gap-5 p-3'>
                        <div className="flex flex-col items-center justify-between">
                            <i className="ri-currency-line"></i>
                            <h3 className='text-base font-medium'>Fare</h3>
                        </div>
                        <div className="flex gap-10 items-center w-full justify-center">
                            
                            <p className='text-lg font-bold text-gray-600'>Cash</p>
                            <h3 className='text-lg font-bold mr-5'>₹ {props.fare}</h3>
                        </div>

                    </div>

                </div>
                <button 
                onClick={() => {
                    props.setConfirmRidePanel(false)
                    props.setVehicleFound(true)
                    props.createRide()
                }}
                className='w-full mt-5 bg-green-600 text-white font-semibold p-2 rounded-lg'>
                    Confirm
                </button>
            </div>
            
        </div>
    )
}

export default ConfirmRide