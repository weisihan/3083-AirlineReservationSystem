import {createContext, useState} from 'react';

export const PurchaseContext = createContext({
    purchaseInfo: {
        flight_pk: "",
        userid: "",
      },
    setPurchaseInfo: () => null,
});
export const PurchaseProvider = ({children}) => {
    const [purchaseInfo, setPurchaseInfo] = useState({
        flight_pk: "",
        userid: "",
      });
    const value = {purchaseInfo, setPurchaseInfo};
    return <PurchaseContext.Provider value = {value}>{children}</PurchaseContext.Provider>
};