import {createContext, useEffect, useState} from "react";
import useLocalStorage from "../hooks/useLocalStorage.js";


const HomeContext = createContext({});

export const HomeContextProvider = ({ children }) => {
    const [cartItems, setCartItems] = useLocalStorage("cartItems", {});
    const [cartItemsCount, setCartItemsCount] = useState(Object.keys(cartItems).length);
    const [cartItemsRestaurantId, setCartItemsRestaurantId] = useState(null);

    useEffect(() => {
        console.log("Inside HomeContext...");
        setCartItemsCount(Object.keys(cartItems).length);
    }, [cartItems]);

    return (
        <HomeContext.Provider value={
            {
                cartItems, setCartItems, cartItemsCount, setCartItemsCount,cartItemsRestaurantId, setCartItemsRestaurantId
            }
        }>
            {children}
        </HomeContext.Provider>
    )
}

export default HomeContext;