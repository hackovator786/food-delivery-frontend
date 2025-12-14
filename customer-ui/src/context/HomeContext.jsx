import {createContext, useEffect, useState} from "react";
import useLocalStorage from "../hooks/useLocalStorage.js";
import useAxiosPrivate from "../hooks/useAxiosPrivate.js";


const HomeContext = createContext({});

export const HomeContextProvider = ({ children }) => {
    const axiosPrivate = useAxiosPrivate();
    const [cartItemsQty, setCartItemsQty] = useLocalStorage("cartItemsQty", {});
    const [cartItemsCount, setCartItemsCount] = useState(Object.keys(cartItemsQty ? cartItemsQty : {})?.length);
    const [cartItemsRestaurantId, setCartItemsRestaurantId] = useLocalStorage("restaurantId", null);

    const getCartItems = async (restaurantId) => {
        try {
            const response = await axiosPrivate.get("/cart/get-items-quantity", {
                params: {
                    "restaurant-id": restaurantId
                }
            });
            setCartItemsQty(response?.data);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        const length = Object.keys(cartItemsQty).length;
        setCartItemsCount(length);
        if(length === 0) {
            setCartItemsRestaurantId(null);
        }
        else {
        }
    }, [cartItemsQty]);

    return (
        <HomeContext.Provider value={
            {
                cartItemsQty, setCartItemsQty, cartItemsCount, setCartItemsCount,cartItemsRestaurantId, setCartItemsRestaurantId,
                getCartItems
            }
        }>
            {children}
        </HomeContext.Provider>
    )
}

export default HomeContext;