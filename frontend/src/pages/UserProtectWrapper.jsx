import React , {useState, useEffect} from "react";
import {useUserContext} from '../contexts/UserContext'
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UserProtectedWrapper = ({children}) => {

    const {user, setUser, authToken, setAuthToken } = useUserContext()
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate()

    useEffect(() => {
        // no access token → not logged in
        if(!authToken){
            navigate('/user/login')
            return 
        }

         axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/users/profile` , {
            headers : {
                Authorization: `Bearer ${authToken}`,
            },
            withCredentials : true      // for refresh token cookie
        })
        .then((res) => {
            setUser(res.data.data.user);
            setIsLoading(false);
        })
        .catch((err) => {
            console.error(err);

            setAuthToken(null);
            navigate("/user/login");
        })
    }
    , [authToken, navigate, setUser, setAuthToken]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            {children}
        </>
    )
}


export  {UserProtectedWrapper};