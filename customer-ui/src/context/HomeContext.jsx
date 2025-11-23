import {createContext, useState} from "react";


const HomeContext = createContext({});

export const HomeContextProvider = ({ children }) => {
    const [cartItemsCount, setCartItemsCount] = useState(0);

    return (
        <HomeContext.Provider value={
            {
                cartCount: cartItemsCount, setCartCount: setCartItemsCount
            }
        }>
            {children}
        </HomeContext.Provider>
    )
}

export default HomeContext;