import { createContext, useState } from "react";

export const UserContext = createContext({
  currentUser: null,
  airlineName: null,
  metadata: null,
  setCurrentUser: () => null,
  setAirline: () => null,
  setMetadata: () => null,
});

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [airlineName, setAirline] = useState(null);
  const [metadata, setMetadata] = useState(null);
  const value = {
    currentUser,
    setCurrentUser,
    airlineName,
    setAirline,
    metadata,
    setMetadata,
  };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
