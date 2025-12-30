import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/Input";
import {useUserContext} from '../contexts/UserContext'
import axios from 'axios'


function UserLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const emailRef = useRef(null)
  const passwordRef = useRef(null);

  const {user, setUser, authToken, setAuthToken } = useUserContext()
  const navigate = useNavigate()

  const submitHandler = async (e) => {
    e.preventDefault();

    const userData = {
      email,
      password,
    };

    // TODO: send userData to backend
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/users/login` , 
      userData,
      {
        withCredentials : true
      }
    )

    if(response.status == 200){
      const userData = response.data.data
      setUser(userData.user)
      setAuthToken(userData.accessToken)
      navigate('/home')
    }
    // console.log(userData);

    setEmail("");
    setPassword("");
  };

  return (
    <div className="min-h-screen bg-white flex flex-col justify-between p-7">
      <div>
        <img
          className="w-16 mb-10"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYQy-OIkA6In0fTvVwZADPmFFibjmszu2A0g&s"
          alt=""
        />

        <form onSubmit={submitHandler} className="space-y-5">
          <Input
            ref={emailRef}
            label="Enter your email"
            type="email"
            name="email"
            autoComplete="email"
            placeholder="example@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Input
            ref={passwordRef}
            label="Enter Password"
            type="password"
            name="password"
            autoComplete="current-password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button className="w-full bg-black text-white font-semibold py-3 rounded-lg text-lg">
            Login
          </button>
        </form>

        <p className="text-center mt-4">
          New here?{" "}
          <Link to="/user/signup" className="text-blue-600 font-medium">
            Create new Account
          </Link>
        </p>
      </div>

      <Link
        to="/captain/login"
        className="w-full bg-[#10b461] text-white font-semibold py-3 rounded-lg text-lg flex items-center justify-center"
      >
        Sign in as Captain
      </Link>
    </div>
  );
}

export default UserLogin;
