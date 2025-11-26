import {createContext, useEffect, useState} from "react";
import useLocalStorage from "../hooks/useLocalStorage.js";


const HomeContext = createContext({});

export const HomeContextProvider = ({ children }) => {
    const [cartItems, setCartItems] = useLocalStorage("cartItems", {});
    const [cartItemsCount, setCartItemsCount] = useState(Object.keys(cartItems ? cartItems : {})?.length);
    const [cartItemsRestaurantId, setCartItemsRestaurantId] = useLocalStorage("restaurantId", null);

    useEffect(() => {
        const length = Object.keys(cartItems).length;
        setCartItemsCount(length);
        if(length === 0)
            setCartItemsRestaurantId(null);
        else {
        }
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