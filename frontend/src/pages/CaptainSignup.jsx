import { useState, useRef } from 'react';
import {Link, useNavigate} from 'react-router-dom'
import Input from "../components/Input";
import Select from "../components/Select";
import axios from 'axios'
import {useCaptainContext} from '../contexts/CaptainContext'


function captainSignup() {
    const [firstName, setFirstName ] = useState('')
    const [lastName, setLastName ] = useState('')
    const [email, setEmail] = useState("");
    const [contact, setContact] = useState("");
    const [password, setPassword ] = useState('')
    const [vehicleColor, setVehicleColor] = useState('')
    const [vehiclePlate, setVehiclePlate] = useState('')
    const [vehicleCapacity, setVehicleCapacity] = useState('')
    const [vehicleType, setVehicleType] = useState('')

    const [userData, setuserData] = useState({})
    const navigate = useNavigate()
    const {captain, setCaptain, authToken, setAuthToken} = useCaptainContext()
    
    const firstNameRef = useRef(null)
    const lastNameRef = useRef(null)
    const emailRef = useRef(null)
    const contactRef = useRef(null)
    const passwordRef = useRef(null);
    const vehicleColorRef = useRef(null)
    const vehiclePlateRef = useRef(null)
    const vehicleCapacityRef = useRef(null)
    const vehicleTypeRef = useRef(null);



    const submitHandler = async(e) => {
        e.preventDefault();
        const CaptainData = {
            fullName: {
                firstName,
                lastName,
            },
            email,
            password,
            contact,
            vehicle : {
                color : vehicleColor,
                capacity: Number(vehicleCapacity),
                plate: vehiclePlate,
                vehicleType: vehicleType
            }
        };

        // TODO: send captainData to backend
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/captain/register` , CaptainData,
            {
                withCredentials : true
            }
        )
        if(response.status == 200){
            const CaptainData = response.data.data
            // console.log(CaptainData);
            setCaptain(CaptainData.captain)
            setAuthToken(CaptainData.accessToken)
            navigate('/captain-home')
        }

        // console.log(userData);

        setFirstName('')
        setLastName('')
        setEmail('')
        setContact('')
        setPassword('')
        setVehicleColor('')
        setVehiclePlate('')
        setVehicleCapacity('')
        setVehicleType('')
    }
    
    return (  
        <div className="py-2 px-5 min-h-screen flex flex-col justify-between bg-white">
            <div>
                {/* Logo */}
                <img
                className="w-20 mb-1"
                src="https://www.svgrepo.com/show/505031/uber-driver.svg"
                alt="logo"
                />

                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        submitHandler(e);
                    }}
                    >
                    {/* Captain Name */}
                    <h3 className="text-sm font-medium mb-2">
                        What's our Captain's name
                    </h3>

                    <div className="flex gap-4 mb-3">
                        <Input
                        name = 'given-name'
                        autoComplete = 'given-name'
                        required
                        ref={firstNameRef}
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="First name"
                        />

                        <Input
                        name = 'family-name'
                        autoComplete = 'family-name'
                        ref={lastNameRef}
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Last name"
                        />
                    </div>

                    {/* Email */}
                    <Input
                            label="Enter your email"
                            ref={emailRef}
                            type="email"
                            name="email"
                            autoComplete="email"
                            required
                            placeholder="example@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                    />
                    {/* contact */}
                    <Input
                        label="Enter your mobile number"
                        ref={contactRef}
                        wrapperClassName="mt-2"
                        type="tel"
                        name = 'tel'
                        autoComplete = 'tel-local'
                        required
                        placeholder="Contact"
                        value={contact}
                        onChange={(e) => setContact(e.target.value)}
                    />

                    {/* Password */}
                    <Input
                            label="Enter Password"
                            ref={passwordRef}
                            wrapperClassName="mt-2"
                            type="password"
                            name="password"
                            autoComplete="new-password"
                            required
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                    {/* Vehicle Info */}
                    <h3 className="text-sm font-medium mb-2 mt-2">
                        Vehicle Information
                    </h3>

                    <div className="flex gap-4 mb-7">
                        <Input
                        required
                        ref={vehicleColorRef}
                        name="vehicleColor"
                        value={vehicleColor}
                        onChange={(e) => setVehicleColor(e.target.value)}
                        placeholder="Vehicle Color"
                        />

                        <Input
                        required
                        ref={vehiclePlateRef}
                        name="vehiclePlate"
                        value={vehiclePlate}
                        onChange={(e) => setVehiclePlate(e.target.value)}
                        placeholder="Vehicle Plate"
                        />
                    </div>

                    <div className="flex gap-4 mb-7">
                        <Input
                        required
                        ref={vehicleCapacityRef}
                        type="number"
                        name="vehicleCapacity"
                        value={vehicleCapacity}
                        onChange={(e) => setVehicleCapacity(e.target.value)}
                        placeholder="Vehicle Capacity"
                        />

                        <Select
                        required
                        ref={vehicleTypeRef}
                        value={vehicleType}
                        onChange={(e) => setVehicleType(e.target.value)}
                        placeholder="Select Vehicle Type"
                        options={[
                            { label: "Car", value: "car" },
                            { label: "Auto", value: "auto" },
                            { label: "Motorcycle", value: "motorcycle" },
                        ]}
                        />
                    </div>

                    {/* Submit */}
                    <button className="bg-black text-white font-semibold rounded-lg px-4 py-3 w-full text-lg">
                        Create Captain Account
                    </button>
                </form>

                {/* Login */}
                <p className="text-center mt-4">
                Already have an account?{" "}
                <Link to="/captain/login" className="text-blue-600">
                    Sign in
                </Link>
                </p>
            </div>

            {/* Footer */}
            <p className="text-[10px] leading-tight mt-6">
                This site is protected by reCAPTCHA and the{" "}
                <span className="underline">Google Privacy Policy</span> and{" "}
                <span className="underline">Terms of Service apply</span>.
            </p>
        </div>

    );
}

export default captainSignup;

