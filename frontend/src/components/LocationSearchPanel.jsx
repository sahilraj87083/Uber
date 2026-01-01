const LocationSearchPanel = (props) => {
    // sample array for location 
    const locations = [
        "24B, Near Air Port Station, Kendriya Vidyalaya , Darbhanga",
        "22C, Near Singh's Hospital, Rana Gym , Darbhanga",
        "20B, Near Hawa Mahal, Paul's Cafe, Delhi",
        "18A, Near Royal Cafe, Football Stadium, Delhi",
    ]

    return (
        <div>
            {
                locations.map((elem, idx) => {
                    return <div key={idx} onClick={() => {
                        props.setVehiclePanel(true)
                        props.setPanelOpen(false)
                    }} className='flex gap-4 border-2 p-3 border-gray-50 active:border-black rounded-xl items-center my-2 justify-start'>
                        <h2 className='bg-[#eee] h-8 flex items-center justify-center w-12 rounded-full'><i className="ri-map-pin-fill"></i></h2>
                        <h4 className='font-medium'>{elem}</h4>
                    </div>
                })
            }
        </div>
    )
}

export default LocationSearchPanel