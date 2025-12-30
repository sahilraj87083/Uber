import { Link } from 'react-router-dom'
function Start() {
    return ( 
        <div>
            <div className="h-screen bg-cover bg-center bg-[url(https://images.unsplash.com/photo-1619059558110-c45be64b73ae?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] flex justify-between flex-col w-full">
                <img className='w-16 ml-8 my-4' src="https://www.edigitalagency.com.au/wp-content/uploads/new-Uber-logo-white-png-large-size.png" alt="" />
                <div className='bg-white pb-8 py-4 px-4'>
                    <h2 className='text-[30px] font-semibold'>Get Started With Uber</h2>
                    <Link to='/user-login' className='bg-black flex items-center justify-center w-full text-white py-3 rounded-lg mt-5'>Continue</Link>
                </div>
            </div>
        </div>
     );
}

export default Start;