import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/Input";
import axios from 'axios'
import {useUserContext} from '../contexts/UserContext'

function UserSignup() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [contact, setContact] = useState("");
    const [password, setPassword] = useState("");

    const firstNameRef = useRef(null)
    const lastNameRef = useRef(null)
    const emailRef = useRef(null)
    const contactRef = useRef(null)
    const passwordRef = useRef(null);

    const {user, setUser, authToken, setAuthToken } = useUserContext()
    const navigate = useNavigate()

    const submitHandler = async (e) => {
    e.preventDefault();

    const newUser = {
        fullName: {
            firstName,
            lastName,
        },
        email,
        contact,
        password,
    };

    // TODO: send userData to backend
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/users/register`, 
      newUser,
      {
        withCredentials : true
      }
    )

    if(response.status === 200){
      const userData = response.data.data;
      setUser(userData.user);
      setAuthToken(userData.accessToken);

      // console.log(response.data)
      // console.log(userData.user)
      navigate('/home')
    }
    // console.log(userData);

    setFirstName("");
    setLastName("");
    setEmail("");
    setContact("");
    setPassword("");
  };

  return (
    <div className="min-h-screen bg-white flex flex-col justify-between">
      <div className="px-7 pt-6 pb-10 max-w-md">
        {/* Logo */}
        <img
          className="w-16 mb-6"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYQy-OIkA6In0fTvVwZADPmFFibjmszu2A0g&s"
          alt="logo"
        />

        {/* Form */}
        <form className="space-y-5" onSubmit={submitHandler}>
          {/* Name */}
          <div>
            <h3 className="text-sm font-medium mb-2">Enter your name</h3>
            <div className="flex gap-3">
              <Input
                required
                ref={firstNameRef}
                name = 'given-name'
                autoComplete = 'given-name'
                placeholder="First name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <Input
                ref={lastNameRef}
                name = 'family-name'
                autoComplete = 'family-name'
                placeholder="Last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>

          {/* Email */}
          <Input
            ref={emailRef}
            label="Enter your email"
            type="email"
            name = 'email'
            autoComplete = 'email'
            required
            placeholder="example@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* Mobile */}
          <Input
            ref={contactRef}
            label="Enter your mobile number"
            name = 'tel'
            autoComplete = 'tel-local'
            type="tel"
            required
            placeholder="Contact"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
          />

          {/* Password */}
          <Input
            ref={passwordRef}
            label="Enter Password"
            type="password"
            name="password"
            autoComplete="new-password"
            required
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* Submit */}
          <button className="w-full bg-black text-white font-semibold py-3 rounded-lg mt-6">
            Create Account
          </button>
        </form>

        {/* Sign in */}
        <p className="text-center text-sm mt-4">
          Already have an account?{" "}
          <Link to="/user/login" className="text-blue-600 font-medium">
            Sign in
          </Link>
        </p>
      </div>

      {/* Footer */}
      <div className="px-5 pb-6 flex justify-center">
        <p className="text-[10px] leading-tight">
          This site is protected by reCAPTCHA and the{" "}
          <span className="underline">Google Privacy Policy</span> and{" "}
          <span className="underline">Terms of Service</span> apply.
        </p>
      </div>
    </div>
  );
}

export default UserSignup;
