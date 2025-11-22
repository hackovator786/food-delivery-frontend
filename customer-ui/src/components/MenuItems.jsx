import {useEffect, useState} from "react";
import axios from "../api/axios.js";
import {Box, Card, CardContent, CardMedia, Grid, Typography} from "@mui/material";
import {useSearchParams} from "react-router-dom";

const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_BASE_URL;

export default function MenuItems() {
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
        <Box sx={{py: 4, px: 2,width: { xs: "100%", sm: "90%", md: "85%" }, margin: "auto", padding: "2vh 0", display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <Typography variant="h5" gutterBottom>
                Featured Restaurants
            </Typography>
            <Grid container spacing={3}>
                {menuItems.map((item) => (
                    <Grid item xs={12} sm={6} md={3} key={item.menuItemId} minWidth="200px" sx={{cursor: "pointer"}}>
                        <Card sx={{px: 2, paddingTop: 2, paddingBottom: 0.5, borderRadius: "5px", borderColor: "black"}} >
                            <CardMedia
                                component="img"
                                height="160"
                                image={IMAGE_BASE_URL + item.imageUrl}
                                alt={item.menuItemName}
                                sx={{borderRadius: "8px", width: "auto"}}
                            />
                            <CardContent>
                                <Typography variant="h6">{item.menuItemName}</Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {item.rating !== 0.0 ? item.rating : "Not yet rated"}
                                </Typography>
                                <Typography variant="body2">{item.city}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}