import React, {useState, useEffect} from "react";
import axios from "axios";
import { useCaptainContext } from "../contexts/CaptainContext";
import { useNavigate } from "react-router-dom";

const CaptainProtectedWrapper = ({children}) => {

    const navigate = useNavigate()
    const {captain, setCaptain, authToken, setAuthToken, isAuthReady} = useCaptainContext()
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // ⛔ wait until auth bootstrap finishes
        if (!isAuthReady) return;

        // no access token → not logged in
        if(!authToken){
            setIsLoading(false)
            navigate('/captain/login')
            return;
        }

        axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/captain/profile`,
            {
                headers : {
                    Authorization : `Bearer ${authToken}`
                },
                withCredentials : true  // for refresh token cookie
            }
        )
        .then((res) => {
            setCaptain(res.data.data.captain)
            setIsLoading(false);
        })
        .catch((err) => {
            console.log(err);

            setAuthToken(null);
            navigate("/captain/login");
        })


    }, [setCaptain, setAuthToken, authToken, isAuthReady])

    if (!isAuthReady) {
        return <div>Loading...</div>;
    }

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            {children}
        </>
    )
}

export default CaptainProtectedWrapper;