import { createContext, useContext, useState } from "react";

// Create context
const UserContext = createContext();

// Provider
export const UserProvider = ({ children }) => {


    const [user, setUser] = useState(null);

    const setUserData = (userData) => {
        setUser(userData);
    };

    const clearUser = () => {
        setUser(null);
    };





    const value = { user, setUserData, clearUser }
    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );


};

// Custom hook
export const useUser = () => useContext(UserContext);
