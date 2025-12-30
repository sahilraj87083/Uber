import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {useCaptainContext} from '../contexts/CaptainContext'

export const CaptainLogout = () => {
    const navigate = useNavigate()
    const {captain, setCaptain, authToken, setAuthToken} = useCaptainContext()

    useEffect( () => {
        const logout = async () => {
            try {
                const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/captain/logout` , {},
                    {
                        headers : {
                            Authorization : `Bearer ${authToken}`
                        },
                        withCredentials : true
                    }
                )
            } catch (error) {
                console.log(`Error while logging out Captain : ${error}`)
            } finally {
                // ✅ clear frontend auth state no matter what
                setAuthToken(null)
                setCaptain(null)
                navigate('/captain/login')
            }
        }

        logout();

    }, [navigate, setCaptain, setAuthToken])
}

export default CaptainLogout