import React, {useState, useEffect} from "react";
import axios from "axios";
import { useCaptainContext } from "../contexts/CaptainContext";
import { useNavigate } from "react-router-dom";

const CaptainProtectedWrapper = ({children}) => {

    const navigate = useNavigate()
    const {captain, setCaptain, authToken, setAuthToken} = useCaptainContext()
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // no access token → not logged in
        if(!authToken){
            navigate('/captain/login')
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
            console.error(err);

            setAuthToken(null);
            navigate("/captain/login");
        })


    }, [setCaptain, setAuthToken,captain, authToken])


    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            {children}
        </>
    )
}

export {CaptainProtectedWrapper}