import {useContext, useEffect, useState} from "react";
import axios from "../api/axios.js";
import {Box, Button, Card, CardContent, CardMedia, Grid, Typography, useMediaQuery, useTheme} from "@mui/material";
import {useSearchParams} from "react-router-dom";
import ThemeContext from "../context/ThemeContext.jsx";
import ItemDetailsModal from "./ItemDetailsModal.jsx";
import MenuItemCard from "./MenuItemCard.jsx";
import MenuItemRow from "./MenuItemRow.jsx";
import HomeContext from "../context/HomeContext.jsx";
import useAxiosPrivate from "../hooks/useAxiosPrivate.js";
import useAuth from "../hooks/useAuth.js";
import useLocalStorage from "../hooks/useLocalStorage.js";
import {toast} from "react-toastify";
import RestaurantMenuContext from "../context/RestaurantMenuContext.jsx";
import CartContext from "../context/CartContext.jsx";

const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_BASE_URL;

export default function RestaurantMenu() {
    const {auth} = useAuth();
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

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

    const {
        cartItemsQty,
        getcartItemsQty,
    } = useContext(HomeContext);

    const {handleAdd,
        handleRemove} = useContext(CartContext);

    const [modalOpen, setModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const handleOpenModal = (item) => {
        setSelectedItem(item);
        setModalOpen(true);
    };
    const handleCloseModal = () => setModalOpen(false);

    useEffect(() => {
        getMenuItems();
        if(auth.accessToken) {
            getcartItemsQty(restaurantId);
        }
    }, []);


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
                            quantity={cartItemsQty[item.menuItemId] || 0}
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
                            quantity={cartItemsQty[item.menuItemId] || 0}
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
                quantity={selectedItem ? (cartItemsQty[selectedItem.menuItemId] || 0) : 0}
                onAdd={() => selectedItem && handleAdd(selectedItem)}
                onRemove={() => selectedItem && handleRemove(selectedItem)}
            />
        </Box>

    );
}