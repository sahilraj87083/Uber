import Input from '../components/Input'
import 'remixicon/fonts/remixicon.css'
import { useState, useRef } from 'react'
import {useGSAP} from '@gsap/react'
import gsap from 'gsap';
import LocationSearchPanel from '../components/LocationSearchPanel';
import VehiclePanel from '../components/VehiclePanel';
import ConfirmRide from '../components/ConfirmRide';
import LookingForDriver from '../components/LookingForDriver';
import WaitingForDriver from '../components/WaitingForDriver';

const  Home = () => {
    const [ pickup, setPickup ] = useState('')
    const [ destination, setDestination ] = useState('')
    
    const panelCloseRef = useRef(null) // for arrow button to close the location panel

    const locationSearchPanelRef = useRef(null)
    const [ panelOpen, setPanelOpen ] = useState(false)

    const vehiclePanelRef = useRef(null)
    const [ vehiclePanel, setVehiclePanel ] = useState(false)
    
    const confirmRidePanelRef = useRef(null)
    const [ confirmRidePanel, setConfirmRidePanel ] = useState(false)

    const vehicleFoundRef = useRef(null)
    const [vehicleFound , setVehicleFound] = useState(false)

    const waitingForDriverRef = useRef(null)
    const [waitingForDriver, setWaitingForDriver] = useState(false)
    


    const submitHandler = (e) => {
        e.preventDefault();
    }


    // for location panel 
    useGSAP(function(){
        if(panelOpen){
            gsap.to(locationSearchPanelRef.current, {
                height : '70%',
                padding : 24
            })
            gsap.to(panelCloseRef.current, {
                opacity : 1
            })
        }else{
            gsap.to(locationSearchPanelRef.current, {
                height : '0%',
                padding : 0
            })
            gsap.to(panelCloseRef.current, {
                opacity : 0
            })
        }
    },[panelOpen])

    //for vehicle panel
    useGSAP(function (){
        if(vehiclePanel){
            gsap.to(vehiclePanelRef.current, {
                transform: 'translateY(0)'
            })
        }else{
            gsap.to(vehiclePanelRef.current, {
                transform: 'translateY(100%)'
            })
        }
    }, [vehiclePanel])


    // for confirm vehicle panel
    useGSAP(function(){
        if(confirmRidePanel){
            gsap.to(confirmRidePanelRef.current, {
                transform : 'translateY(0)'
            })
        }else{
            gsap.to(confirmRidePanelRef.current, {
                transform : 'translateY(100%)'
            })
        }
    },[confirmRidePanel])

    // for Looking for Driver panel
    useGSAP(function(){
        if(vehicleFound){
            gsap.to(vehicleFoundRef.current, {
                transform : 'translateY(0)'
            })
        }else{
            gsap.to(vehicleFoundRef.current, {
                transform : 'translateY(100%)'
            })
        }
    },[vehicleFound])

    // for waiting for Driver panel
    useGSAP(function(){
        if(waitingForDriver){
            gsap.to(waitingForDriverRef.current, {
                transform : 'translateY(0)'
            })
        }else{
            gsap.to(waitingForDriverRef.current, {
                transform : 'translateY(100%)'
            })
        }
    },[waitingForDriver])




    return ( 
        <div className='h-screen relative overflow-hidden'>

            <img className="w-16 absolute left-5 top-5" src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
            <div className='h-screen w-screen bg-red-200'>
                {/* image for temporary use  */}
                {/* <img className='w-full object-fill' src="https://i.sstatic.net/gtiI7.gif" alt="" /> */}
            </div>
            <div className='flex flex-col justify-end h-screen absolute top-0 w-full'>
                <div className='h-[32%] bg-white relative'>
                    <h5 ref={panelCloseRef} 
                        onClick={(e) => {
                            setPanelOpen(false)
                        }} 
                        className='absolute right-6 top-1 text-2xl opacity-0'>
                            <i className="ri-arrow-down-wide-line text-3xl text-gray-200"></i>
                    </h5>
                    <h4 className='ml-5 text-lg font-semibold'>Find a trip</h4>
                    <form 
                        className='py-3'
                        onSubmit={(e) => {
                            submitHandler(e)
                        }}
                    action="">
                            
                        <div className='flex ml-2 w-full'>
                            <div className="flex flex-col items-center mt-5  w-[10%]">
                                <div className="w-3 h-3 rounded-full border-2 border-gray-800 bg-white" />
                                <div className="h-10 w-[3px] bg-gray-800 rounded-t-full rounded-b-none my-1" />
                                <div className="w-3 h-3 bg-gray-800 rounded-sm" />
                            </div>
                            <div className='w-full mr-5'>
                                <Input 
                                    value = {pickup}
                                    onClick = {() => {
                                        setPanelOpen(true)
                                    }}
                                    onChange = {(e) => {
                                        setPickup(e.target.value)
                                    }}
                                    placeholder = 'Enter pick-up location'
                                />
                                <Input 
                                    value = {destination}
                                    onClick = {() => {
                                        setPanelOpen(true)
                                    }}
                                    onChange = {(e) => {
                                        setDestination(e.target.value)
                                    }}
                                placeholder = 'Enter destination'/>
                            </div>
                        </div>
                                
                    </form>
                    <button
                        className='bg-black text-white px-4 py-2 rounded-lg mt-3 w-full'
                    >
                        Find Ride
                    </button>
                </div>
                <div 
                    ref={locationSearchPanelRef} className="bg-white h-0">
                        <LocationSearchPanel setVehiclePanel={setVehiclePanel} setPanelOpen={setPanelOpen}/>
                </div>
            </div>
            <div ref={vehiclePanelRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12'>
                <VehiclePanel setPanelOpen={setPanelOpen}  setVehiclePanel = {setVehiclePanel} setConfirmRidePanel = {setConfirmRidePanel} />
            </div>
            <div ref={confirmRidePanelRef} className='bg-white w-full fixed z-10 translate-y-full bottom-0 px-3 py-10 pt-12'>
                <ConfirmRide setVehiclePanel = {setVehiclePanel} setConfirmRidePanel = {setConfirmRidePanel} setVehicleFound = {setVehicleFound} />
            </div>

            <div ref={vehicleFoundRef} className='bg-white w-full fixed z-10 translate-y-full bottom-0 px-3 py-10 pt-12'>
                <LookingForDriver setVehicleFound = {setVehicleFound}/>
            </div>

            <div ref={waitingForDriverRef} className='bg-white w-full fixed z-10  bottom-0 px-3 py-10 pt-12'>
                <WaitingForDriver  setWaitingForDriver = {setWaitingForDriver} />
            </div>
            
        </div>
     );
}

export default Home;