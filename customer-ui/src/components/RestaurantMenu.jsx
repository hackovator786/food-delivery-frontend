import {useContext, useEffect, useState} from "react";
import axios from "../api/axios.js";
import {Box, Button, Card, CardContent, CardMedia, Grid, Typography, useMediaQuery, useTheme} from "@mui/material";
import {useSearchParams} from "react-router-dom";
import ThemeContext from "../context/ThemeContext.jsx";
import ItemDetailsModal from "./ItemDetailsModal.jsx";
import MenuItemCard from "./MenuItemCard.jsx";
import MenuItemRow from "./MenuItemRow.jsx";
import HomeContext from "../context/HomeContext.jsx";
import AuthContext from "../context/AuthProvider.jsx";
import useAxiosPrivate from "../hooks/useAxiosPrivate.js";

const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_BASE_URL;

export default function RestaurantMenu() {
    const {auth} = useContext(AuthContext);
    const axiosPrivate = useAxiosPrivate();
    const {PRIMARY_COLOR} = useContext(ThemeContext);
    const [searchParams] = useSearchParams();

    const restaurantId = searchParams.get("restaurant-id");

    const [menuItems, setMenuItems] = useState([]);
    const getMenuItems = async () => {
        try {
            const response = await axios.get("/search/item", {
                params: {
                    restaurantId: restaurantId
                }
            });
            setMenuItems(response?.data?.content);
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        getMenuItems();
    }, []);

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

    const {cartItems, setCartItems, cartItemsCount, setCartItemsCount,cartItemsRestaurantId, setCartItemsRestaurantId} = useContext(HomeContext);

    const [modalOpen, setModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const handleAdd = async (item) => {
        console.log("Inside Add", item);
        console.log(cartItems);
        if(cartItemsRestaurantId && cartItemsRestaurantId !== item.restaurantId) {
            return;
        }
        if(!cartItemsRestaurantId){
            setCartItemsRestaurantId(item.restaurantId);
        }
        if (auth.accessToken) {
            try {
                const response = await axiosPrivate.post("/cart/add",
                    {restaurantId: item.restaurantId, menuItemId: item.menuItemId});
                setCartItemsCount(response?.data?.cartItemsCount || 0);
            } catch (err) {
                console.log(err);
            }
        } else {
            if(!cartItems[item.menuItemId]) {
                setCartItems(prev => ({
                    ...prev,
                    [item.menuItemId]: {name: item.menuItemName, quantity: 1, price: item.price}
                }));
            }
            else{
                setCartItems(prev => ({
                    ...prev,
                    [item.menuItemId]: {
                        ...prev[item.menuItemId],
                        quantity: (prev[item.menuItemId]?.quantity || 0) + 1,
                    }
                }));
            }
        }
    };

    const handleRemove = async (item) => {
        if(cartItemsRestaurantId && cartItemsRestaurantId !== item.restaurantId) {
            return;
        }
        if (auth.accessToken) {
            try {
                const response = await axiosPrivate.put("/cart/update",
                    {restaurantId: item.restaurantId, menuItemId: item.menuItemId, increase: false});
                setCartItemsCount(response?.data?.cartItemsCount || 0);
            } catch (err) {
                console.log(err);
            }
        } else {
            if(cartItems[item.menuItemId]) {
                setCartItems(prev => {
                    const updated = { ...prev };

                    if (updated[item.menuItemId].quantity === 1) {
                        delete updated[item.menuItemId];
                    } else {
                        updated[item.menuItemId] = {
                            ...updated[item.menuItemId],
                            quantity: updated[item.menuItemId].quantity - 1
                        };
                    }

                    return updated;
                });
            }
        }
    };

    const handleOpenModal = (item) => {
        setSelectedItem(item);
        setModalOpen(true);
    };
    const handleCloseModal = () => setModalOpen(false);


    return (
        <Box
            sx={{
                py: 4,
                px: 0,
                width: {xs: "100%", sm: "98%", md: "70%", lg: "60%"},
                margin: "auto",
            }}
        >
            {isSmallScreen ? (
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: "repeat(2, 1fr)", // Force 2 columns
                        gap: 2,
                        pb: 10
                    }}
                >
                    {menuItems.map((item) => (
                        <MenuItemCard
                            key={item.menuItemId}
                            item={item}
                            quantity={cartItems[item.menuItemId]?.quantity || 0}
                            onAdd={() => handleAdd(item)}
                            onRemove={() => handleRemove(item)}
                            onOpenModal={handleOpenModal}
                        />
                    ))}
                </Box>
            ) : (
                <Box>
                    {menuItems.map((item) => (
                        <MenuItemRow
                            key={item.menuItemId}
                            item={item}
                            quantity={cartItems[item.menuItemId]?.quantity || 0}
                            onAdd={() => handleAdd(item)}
                            onRemove={() => handleRemove(item)}
                            onOpenModal={handleOpenModal}
                        />
                    ))}
                </Box>
            )}

            <ItemDetailsModal
                open={modalOpen}
                handleClose={handleCloseModal}
                item={selectedItem}
                quantity={selectedItem ? (cartItems[selectedItem.menuItemId]?.quantity || 0) : 0}
                onAdd={() => selectedItem && handleAdd(selectedItem)}
                onRemove={() => selectedItem && handleRemove(selectedItem)}
            />
        </Box>

    );
}