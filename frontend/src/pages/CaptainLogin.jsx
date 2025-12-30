import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import Input from "../components/Input";

function CaptainLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const emailRef = useRef(null)
    const passwordRef = useRef(null);

    const submitHandler = (e) => {
    e.preventDefault();

    const captainData = {
        email,
        password,
    };
    
    // TODO: send captainData to backend
    console.log(captainData);

    setEmail("");
    setPassword("");
  };

  return (
    <div className="p-7 flex flex-col justify-between h-screen">
      <div>
        <img
          className="w-20 mb-6"
          src="https://www.svgrepo.com/show/505031/uber-driver.svg"
          alt="Captain Logo"
        />

        <form onSubmit={submitHandler} className="space-y-5">
          <Input
          ref={emailRef}
            label="What's your email"
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

          <button className="bg-[#111] text-white font-semibold rounded-lg px-4 py-2 w-full text-lg">
            Login
          </button>
        </form>

        <p className="text-center mt-4">
          Join a fleet?{" "}
          <Link to="/captain/signup" className="text-blue-600">
            Register as a Captain
          </Link>
        </p>
      </div>

      <Link
        to="/user/login"
        className="bg-[#d5622d] flex items-center justify-center text-white font-semibold rounded-lg px-4 py-2 w-full text-lg"
      >
        Sign in as User
      </Link>
    </div>
  );
}

export default CaptainLogin;
