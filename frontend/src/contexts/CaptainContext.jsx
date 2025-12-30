import { createContext, useContext, useState } from "react";

const CaptainContext = createContext(null)

export const useCaptainContext = () => {
    const context = useContext(CaptainContext)

    if(!context){
        throw new Error("useCaptainContext must be used within CaptainContextProvider");
    }
    return context
}

export const CaptainContextProvider = ({children}) => {

    const [captain, setCaptain] = useState({})
    const [authToken, setAuthToken] = useState(null); // for access token
    const [ error, setError ] = useState(null);
    const [ isLoading, setIsLoading ] = useState(false);

    return (
        <CaptainContext.Provider value={{captain, setCaptain, authToken, setAuthToken, error, setError, isLoading, setIsLoading}}>
            {children}
        </CaptainContext.Provider>
    )

}