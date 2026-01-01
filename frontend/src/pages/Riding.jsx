import { Link } from "react-router-dom"

const Riding = () => {
    return (
        <div className='h-screen'>
            <Link to={'/home'} className='fixed right-2 top-2 h-10 w-10 bg-white flex items-center justify-center rounded-full'>
                <i className="text-lg font-medium ri-home-5-line"></i>
            </Link>
            <div className='h-1/2'>
                <img className = "h-full w-full object-cover" src="https://cdn.dribbble.com/userupload/22910073/file/original-f308c35778d329518ef2b88f866111ec.gif" alt="" />

            </div>

            <div className='h-1/2 p-4'>
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
                <button className='w-full mt-5 bg-green-600 text-white font-semibold p-2 rounded-lg'>Make Payment</button>
            </div>
        </div>
    )
}

export default Riding