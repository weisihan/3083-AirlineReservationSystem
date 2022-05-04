import {createContext, useState} from 'react';

export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null,
});
export const UserProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState("rootuser@gmail.com");
    const value = {currentUser, setCurrentUser};
    return <UserContext.Provider value = {value}>{children}</UserContext.Provider>
};