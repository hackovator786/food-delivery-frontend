import {useContext, useEffect, useState} from "react";
import axios from "../api/axios.js";
import {Box, Button, Card, CardContent, CardMedia, Grid, Typography} from "@mui/material";
import {useSearchParams} from "react-router-dom";
import ThemeContext from "../context/ThemeContext.jsx";

const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_BASE_URL;

export default function MenuItems() {
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
    }, [])

    return (
        <Box
            sx={{
                py: 4,
                px: 2,
                width: { xs: "95%", sm: "90%", md: "70%", lg: "60%" },
                margin: "auto",
                padding: "2vh 0",
            }}
        >
            <Grid container spacing={3}>
                {menuItems.map((item) => (
                    <Grid
                        item
                        xs={12}
                        width="100%"
                        key={item.menuItemId}
                        sx={{
                            borderBottom: "1px solid #e0e0e0",
                            paddingBottom: 3,
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: { xs: "column", sm: "row" },
                                justifyContent: "space-between",
                                alignItems: { xs: "center", sm: "flex-start" },
                                gap: 2
                            }}
                        >

                            {/* LEFT SECTION */}
                            <Box sx={{ flex: 1, width: "100%" }}>
                                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                    {item.menuItemName}
                                </Typography>

                                <Typography sx={{ fontSize: "1rem", fontWeight: 500, mt: 0.5 }}>
                                    ₹ {item.price.toFixed(2)}
                                </Typography>

                                {item.rating && item.rating !== 0 ? (
                                    <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                                        <Typography sx={{ color: "green", fontWeight: 600, mr: 0.5 }}>
                                            ★ {item.rating}
                                        </Typography>
                                        <Typography sx={{ color: "gray" }}>
                                            ({item.ratingCount})
                                        </Typography>
                                    </Box>
                                ) : (
                                    <Typography sx={{ mt: 1, color: "gray" }}>Not yet rated</Typography>
                                )}

                                <Typography sx={{ mt: 1, fontSize: "0.9rem", color: "gray" }}>
                                    {item.description}
                                </Typography>
                            </Box>

                            {/* RIGHT SECTION */}
                            <Box sx={{ width: 150, position: "relative" }}>
                                <Card
                                    sx={{
                                        width: "100%",
                                        height: 130,
                                        borderRadius: "10px",
                                        overflow: "hidden",
                                    }}
                                >
                                    <CardMedia
                                        component="img"
                                        image={IMAGE_BASE_URL + item.imageUrl}
                                        alt={item.menuItemName}
                                        sx={{
                                            width: "100%",
                                            height: "100%",
                                            objectFit: "cover",
                                        }}
                                    />
                                </Card>

                                <Button
                                    variant="contained"
                                    sx={{
                                        position: "absolute",
                                        bottom: -15,
                                        left: "50%",
                                        transform: "translateX(-50%)",
                                        backgroundColor: "white",
                                        color: PRIMARY_COLOR,
                                        borderRadius: "12px",
                                        boxShadow: 2,
                                        fontWeight: 900,
                                        "&:hover": { backgroundColor: "#cdd1ce" },
                                        // padding: "0px 30px",
                                        width: "80%",
                                        height: "30%",
                                        fontSize: "1.2rem",
                                    }}
                                >
                                    ADD
                                </Button>
                            </Box>
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </Box>

    );
}