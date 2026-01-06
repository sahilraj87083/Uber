import {useCaptainContext} from '../contexts/CaptainContext.jsx'

const  CaptainDetails = () => {
    const {captain} = useCaptainContext()
    return ( 
        <div>
            <div className='flex items-center justify-between'>
                <div className='flex items-center justify-start gap-3'>
                    <img className="className='h-16 w-20 rounded-full object-cover'" src="https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg?semt=ais_hybrid&w=740&q=80" alt="" />
                    <h4 className='text-lg font-medium capitalize'>{captain.fullName.firstName + ' ' + captain.fullName.lastName} </h4>
                </div>
                <div >
                    <h4 className='text-xl font-semibold'>₹295.20</h4>
                    <p className='text-sm text-gray-600'>Earned</p>
                </div>
            </div>

            <div className="flex rounded-xl p-3 mt-8 items-start gap-5 bg-gray-100">
                <div className="text-center">
                    <i className="text-3xl mb-2 font-thin ri-timer-2-line"></i>
                    <h5 className='text-lg font-medium'>10.2</h5>
                    <p className='text-sm text-gray-600'>Hours Online</p>
                </div>

                <div className="text-center">
                    <i className="text-3xl mb-2 font-thin  ri-speed-up-line"></i>
                    <h5 className='text-lg font-medium'>47 KM</h5>
                    <p className='text-sm text-gray-600'>Total Distance</p>
                </div>

                <div className="text-center">
                    <i className="text-3xl mb-2 font-thin ri-task-line"></i>
                    <h5 className='text-lg font-medium'>14</h5>
                    <p className='text-sm text-gray-600'>Total Rides</p>
                </div>
            </div>
        </div>
     );
}

export default CaptainDetails;