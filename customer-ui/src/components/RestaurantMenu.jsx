import {useContext, useEffect, useState} from "react";
import axios from "../api/axios.js";
import {Box, Button, Card, CardContent, CardMedia, Grid, Typography, useMediaQuery, useTheme} from "@mui/material";
import {useSearchParams} from "react-router-dom";
import ThemeContext from "../context/ThemeContext.jsx";
import ItemDetailsModal from "./ItemDetailsModal.jsx";
import MenuItemCard from "./MenuItemCard.jsx";
import MenuItemRow from "./MenuItemRow.jsx";

const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_BASE_URL;

export default function RestaurantMenu() {
    const {PRIMARY_COLOR} = useContext(ThemeContext);
    const [searchParams] = useSearchParams();

    const restaurantId = searchParams.get("restaurant-id");

    console.log("RestaurantId:", restaurantId);
    const [menuItems, setMenuItems] = useState([]);
    const getMenuItems = async () => {
        try {
            const response = await axios.get("/search/item",{
                params: {
                    restaurantId: restaurantId
                }
            });
            setMenuItems(response?.data?.content);
        } catch (err){
            console.log(err);
        }
    }
    useEffect(() => {
        getMenuItems();
    }, []);

    const theme = useTheme();
    // Breakpoint check: is the screen smaller than 'md' (900px)?
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

    // State for Cart: { "itemId1": 2, "itemId2": 1 }
    const [cart, setCart] = useState({});

    // State for Modal
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    // Cart Logic
    const handleAdd = (id) => {
        setCart((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
    };

    const handleRemove = (id) => {
        setCart((prev) => {
            const currentQty = prev[id] || 0;
            if (currentQty <= 1) {
                const newCart = { ...prev };
                delete newCart[id];
                return newCart;
            }
            return { ...prev, [id]: currentQty - 1 };
        });
    };

    // Modal Logic
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
                width: { xs: "100%", sm: "98%", md: "70%", lg: "60%" },
                margin: "auto",
            }}
        >
            {/* Responsive Layout Switcher */}
            {isSmallScreen ? (
                // --- SMALL SCREEN: GRID VIEW (2 Cards per row) ---
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: "repeat(2, 1fr)", // Force 2 columns
                        gap: 2,
                        pb: 10 // Extra space at bottom
                    }}
                >
                    {menuItems.map((item) => (
                        <MenuItemCard
                            key={item.menuItemId}
                            item={item}
                            quantity={cart[item.menuItemId] || 0}
                            onAdd={() => handleAdd(item.menuItemId)}
                            onRemove={() => handleRemove(item.menuItemId)}
                            onOpenModal={handleOpenModal}
                        />
                    ))}
                </Box>
            ) : (
                // --- LARGE SCREEN: LIST VIEW (Row Layout) ---
                <Box>
                    {menuItems.map((item) => (
                        <MenuItemRow
                            key={item.menuItemId}
                            item={item}
                            quantity={cart[item.menuItemId] || 0}
                            onAdd={() => handleAdd(item.menuItemId)}
                            onRemove={() => handleRemove(item.menuItemId)}
                            onOpenModal={handleOpenModal}
                        />
                    ))}
                </Box>
            )}

            {/* Details Modal */}
            <ItemDetailsModal
                open={modalOpen}
                handleClose={handleCloseModal}
                item={selectedItem}
                quantity={selectedItem ? (cart[selectedItem.menuItemId] || 0) : 0}
                onAdd={() => selectedItem && handleAdd(selectedItem.menuItemId)}
                onRemove={() => selectedItem && handleRemove(selectedItem.menuItemId)}
            />
        </Box>

    );
}