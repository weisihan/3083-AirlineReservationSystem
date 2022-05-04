import {createContext, useState} from 'react';

export const PurchaseContext = createContext({
    purchaseInfo: {
      airline_name: "",
      dept_airport: "",
      arr_airport: "",
      flight_num: "",
      dept_date: "",
      dept_time: "",
      },
    setPurchaseInfo: () => null,
});
export const PurchaseProvider = ({children}) => {

    const [purchaseInfo, setPurchaseInfo] = useState({
        airline_name: "",
        dept_airport: "",
        arr_airport: "",
        flight_num: "",
        dept_date: "",
        dept_time: "",
      });
    const value = {purchaseInfo, setPurchaseInfo};
    return <PurchaseContext.Provider value = {value}>{children}</PurchaseContext.Provider>
};