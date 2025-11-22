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
            setRestaurants(response.data);
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
        <Box sx={{py: 4, px: 2,width: { xs: "100%", sm: "90%", md: "85%" }, margin: "auto", padding: "2vh 0", display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        <Typography variant="h5" gutterBottom>
          Featured Restaurants
        </Typography>
        <Grid container spacing={3}>
          {restaurants.map((res) => (
            <Grid item xs={12} sm={6} md={3}
                  key={res.restaurantId}
                  minWidth="200px"
                  sx={{cursor: "pointer"}}
                  onClick={()=>handleRestaurantClick(res.restaurantId)}
            >
              <Card sx={{px: 2, paddingTop: 2, paddingBottom: 0.5, borderRadius: "5px", borderColor: "black"}} >
                <CardMedia
                  component="img"
                  height="160"
                  image={IMAGE_BASE_URL + res.imageUrl}
                  alt="Restaurant"
                  sx={{borderRadius: "8px", width: "auto"}}
                />
                <CardContent>
                  <Typography variant="h6">{res.restaurantName}</Typography>
                  <Typography variant="body2" color="text.secondary">
                      {res.rating !== 0.0 ? res.rating : "Not yet rated"}
                  </Typography>
                  <Typography variant="body2">{res.city}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        </Box>
    );
}