import {Box, Card, CardContent, CardMedia, Container, Grid, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import axios from "../api/axios.js";
import {useNavigate} from "react-router-dom";

const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_BASE_URL;
export default function Restaurants(){
    const navigate = useNavigate();
    const [restaurants, setRestaurants] = useState([]);
    const getRestaurants = async () => {
        try {
            const response = await axios.get("/search/all-restaurants");
            console.log(response.data);
            let restaurants = response?.data;
            for(let i = 0; i < 10; i++){
                restaurants.push(restaurants.at(0));
            }
            setRestaurants(restaurants);
        } catch (err){
            console.log(err);
        }
    }

    const handleRestaurantClick = (restaurantId) => {
        const params = new URLSearchParams();
        params.set("restaurant-id", restaurantId);

        navigate("/items?" + params.toString());
    }

    useEffect(() => {
        getRestaurants();
    }, [])

    return (
        <Box
            sx={{
                py: 4,
                px: 2,
                width: { xs: "100%", sm: "90%", md: "85%" },
                margin: "auto",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
            }}
        >
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
                Featured Restaurants
            </Typography>

            <Box
                sx={{
                    display: "grid",
                    width: "100%",
                    gap: 3,
                    gridTemplateColumns: {
                        xs: "repeat(2, 1fr)", // 2 cols on small screens
                        md: "repeat(4, 1fr)", // 4 cols on medium screens
                        lg: "repeat(6, 1fr)", // 6 cols on large screens
                    },
                }}
            >
                {restaurants.map((res) => (
                    <Card
                        key={res.restaurantId}
                        onClick={() => handleRestaurantClick(res.restaurantId)}
                        sx={{
                            borderRadius: "8px",
                            overflow: "hidden",
                            width: "100%",
                            height: "100%",
                            cursor: "pointer",
                            display: "flex",
                            flexDirection: "column",
                            transition: "transform 0.2s",
                            "&:hover": {
                                transform: "scale(1.02)",
                            },
                        }}
                    >
                        <CardMedia
                            component="img"
                            height="140"
                            image={IMAGE_BASE_URL + res.imageUrl}
                            alt={res.restaurantName}
                            sx={{ objectFit: "cover" }}
                        />
                        <CardContent sx={{ flexGrow: 1 }}>
                            <Typography
                                variant="subtitle1"
                                component="div"
                                noWrap
                                sx={{ fontWeight: 'bold' }}
                            >
                                {res.restaurantName}
                            </Typography>

                            <Box display="flex" justifyContent="space-between" alignItems="center" mt={1}>
                                <Typography variant="body2" sx={{
                                    backgroundColor: res.rating >= 4 ? "green" : "orange",
                                    color: "white",
                                    px: 0.5,
                                    borderRadius: 1,
                                    fontSize: "0.75rem"
                                }}>
                                    {res.rating !== 0.0 ? `★ ${res.rating}` : "NEW"}
                                </Typography>
                            </Box>

                            <Typography variant="caption" color="text.secondary" display="block" mt={1}>
                                {res.city}
                            </Typography>
                        </CardContent>
                    </Card>
                ))}
            </Box>
        </Box>

    );
}