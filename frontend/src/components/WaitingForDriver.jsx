const WaitingForDriver = (props) => {
    return (
        <div>
            <h5 className='p-1 text-center w-[93%] absolute top-0'
                onClick={(e) => {
                    // props.setConfirmRidePanel(false)
                    props.setWaitingForDriver(false)

                }} >
                    <i className="ri-arrow-down-wide-line text-3xl text-gray-200"></i>
            </h5>

            <div className='flex items-center justify-between'>
                <img className="h-20" src="https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=552/height=368/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy82NDkzYzI1NS04N2M4LTRlMmUtOTQyOS1jZjcwOWJmMWI4MzgucG5n" alt="" />
                <div className='text-right'>
                    <h2 className='text-lg font-medium capitalize'>Rahul</h2>
                    <h4 className='text-xl font-semibold -mt-1 -mb-1'>BR07 90 2081</h4>
                    <p className='text-sm text-gray-600'>Maruti Suzuki Alto</p>
                    <h1 className='text-lg font-semibold'>   </h1>
                </div>
            </div>

            <div className="flex flex-col gap-2 justify-between items-center">
                
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
            </div>
            
        </div>
    )
}

export default WaitingForDriver