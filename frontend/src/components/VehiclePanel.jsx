const VehiclePanel = (props) => {
    return (
        <div>
            <h5 className='p-1 text-center w-[93%] absolute top-0'
                onClick={(e) => {
                    props.setVehiclePanel(false)
                    props.setPanelOpen(true)
                }} >
                    <i className="ri-arrow-down-wide-line text-3xl text-gray-200"></i>
            </h5>
            <h3 className=" text-2xl font-semibold mb-5">Choose your Vehicle</h3>
            <div onClick={()=>{
                props.setVehicleType('car')
                props.setConfirmRidePanel(true)
                props.setVehiclePanel(false)
            }} className="flex m-2 p-3 border-2 rounded-xl active:border-black w-full items-center justify-between ">
                {/* for car */}
                <img className='h-10' src="https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=552/height=368/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy82NDkzYzI1NS04N2M4LTRlMmUtOTQyOS1jZjcwOWJmMWI4MzgucG5n" alt="" />
                <div className="ml-2 w-1/2">
                    <h4 className='font-medium text-base'>UberGo</h4>
                    <h5 className='font-base text-xs'>Max Capacity : 4<i className="ri-user-3-fill"></i></h5>
                    <p className='font-normal text-xs text-gray-600'>Affordable compact rides</p>
                </div>
                <p className='text-lg font-semibold' > ₹{props.fare.car}</p>
            </div>
            <div onClick={()=>{
                props.setVehicleType('moto')
                props.setConfirmRidePanel(true)
                props.setVehiclePanel(false)
            }} className="flex m-2 p-3 border-2 rounded-xl active:border-black w-full items-center justify-between ">
                {/* for bike */}
                <img className='h-10' src="https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=552/height=368/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy9mY2RkZWNhYS0yZWVlLTQ4ZmUtODdmMC02MTRhYTdjZWU3ZDMucG5n" alt="" />
                <div className="ml-2 w-1/2">
                    <h4 className='font-medium text-base'>Moto</h4>
                    <h5 className='font-base text-xs'>Max Capacity : 1<i className="ri-user-3-fill"></i></h5>
                    <p className='font-normal text-xs text-gray-600'>Affordable motorcycle rides</p>
                </div>
                <p className='text-lg font-semibold' > ₹{props.fare.moto}</p>
            </div>
            <div onClick={()=>{
                props.setVehicleType('auto')
                props.setConfirmRidePanel(true)
                props.setVehiclePanel(false)
            }} className="flex m-2 p-3 border-2 rounded-xl active:border-black w-full items-center justify-between ">
                {/* for auto */}
                <img className='h-10' src="https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=552/height=368/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy8xZGRiOGM1Ni0wMjA0LTRjZTQtODFjZS01NmExMWEwN2ZlOTgucG5n" alt="" />
                <div className="ml-2 w-1/2">
                    <h4 className='font-medium text-base'>UberAuto </h4>
                    <h5 className='font-base text-xs'>Max Capacity : 3<i className="ri-user-3-fill"></i></h5>
                    <p className='font-normal text-xs text-gray-600'>Affordable Auto rides</p>
                </div>
                <p className='text-lg font-semibold' > ₹{props.fare.auto}</p>
            </div>
        </div>
        
    )
}

export default VehiclePanel;