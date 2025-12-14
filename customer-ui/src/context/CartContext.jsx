import {createContext, useContext, useState} from "react";
import AuthContext from "./AuthProvider.jsx";
import {toast} from "react-toastify";
import HomeContext from "./HomeContext.jsx";
import useAxiosPrivate from "../hooks/useAxiosPrivate.js";
import axios from "../api/axios.js";


const CartContext = createContext({});

export const CartContextProvider = ({ children }) => {
    const axiosPrivate = useAxiosPrivate();
    const {auth} = useContext(AuthContext);
    const {cartItemsRestaurantId, setCartItemsRestaurantId, cartItemsQty, setCartItemsQty } = useContext(HomeContext);
    const [restaurantDetails, setRestaurantDetails] = useState({});

    const getRestaurantDetails = async () => {
        try {
            const response = await axios.get("/search/restaurant", {
                params: {
                    "restaurant-id": cartItemsRestaurantId
                }
            });
            setRestaurantDetails(response.data);
        } catch (err){
            console.log(err);
        }
    }
    const handleAdd = async (item) => {
        if (cartItemsRestaurantId && cartItemsRestaurantId !== item.restaurantId) {
            toast.error("Cannot add to cart");
            return;
        }
        if (!cartItemsRestaurantId) {
            setCartItemsRestaurantId(item.restaurantId);
        }
        if (auth.accessToken) {
            try {
                const response = await axiosPrivate.post("/cart/add",
                    {restaurantId: item.restaurantId, menuItemId: item.menuItemId});
                setCartItemsQty(response?.data?.items);
            } catch (err) {
                console.log(err);
            }
        } else {
            setCartItemsQty(prev => ({
                ...prev,
                [item.menuItemId]: (prev[item.menuItemId] || 0) + 1
            }));
        }
    };

    const handleRemove = async (item) => {
        if (cartItemsRestaurantId && cartItemsRestaurantId !== item.restaurantId) {
            return;
        }
        if (auth.accessToken) {
            try {
                const response = await axiosPrivate.put("/cart/update",
                    {restaurantId: item.restaurantId, menuItemId: item.menuItemId, increase: false});
                setCartItemsQty(response?.data?.items||{});
            } catch (err) {
                console.log(err);
            }
        } else {
            if (cartItemsQty[item.menuItemId]) {
                setCartItemsQty(prev => {
                    const updated = {...prev};

                    if (updated[item.menuItemId] === 1) {
                        delete updated[item.menuItemId];
                    } else {
                        updated[item.menuItemId] = updated[item.menuItemId] - 1;
                    }

                    return updated;
                });
            }
        }
    };

    return (
        <CartContext.Provider value={
            {
                handleAdd, handleRemove, getRestaurantDetails
            }
        }>
            {children}
        </CartContext.Provider>
    )
}

export default CartContext;