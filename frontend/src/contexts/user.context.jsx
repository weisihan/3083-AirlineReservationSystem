import { createContext, useState } from 'react';

export const UserContext = createContext({
    currentUser: null,
    metaData: {
        // fixed this default company 
        airline_name: null,
    },
    setMetaData: () => null,
    setCurrentUser: (userid) => currUser = userid,
});

export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [metaData, setMetaData] = useState({
        airline_name: "China Eastern",
    });
    const value = { currentUser, setCurrentUser, metaData, setMetaData };
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
};