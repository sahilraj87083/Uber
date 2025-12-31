import { createContext, useContext, useState } from "react";

const UserContext = createContext(null);

export const useUserContext = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUserContext must be used within UserProvider");
    }
    return context;
};

export const UserContextProvider = ({ children }) => {

    const [user, setUser] = useState({
        email: "",
        contact: "",
        fullName: {
            firstName: "",
            lastName: "",
        },
  });
  const [authToken, setAuthToken] = useState(null); // for access token
  const [isAuthReady, setIsAuthReady] = useState(false);

  return (
    <UserContext.Provider value={{ user, setUser, authToken, setAuthToken, isAuthReady, setIsAuthReady}}>
      {children}
    </UserContext.Provider>
  );
};
