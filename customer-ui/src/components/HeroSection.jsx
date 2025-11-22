import {Box, Button, Typography} from "@mui/material";
import {assets} from '../assets/assets';

export default function HeroSection() {
    return (
        <Box
            sx={{
                backgroundImage: `url(${assets.herobackground})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                minHeight: {xs: "20vh", sm: "25vh", md: "25vh", lg: "30vh"},
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                px: 2,
                py: 4,
                width: {xs: "100%", sm: "90%", md: "85%"},
                margin: {xs: "1.5vh auto", sm: "1.5vh auto", md: "auto"},
                color: "white",
            }}
        >
            <Typography variant="h3" gutterBottom sx={{fontWeight: "bold"}}>
                Delicious food, delivered to you
            </Typography>
            <Typography variant="h6" gutterBottom>
                Order from your favorite restaurants with just a few clicks
            </Typography>
        </Box>
    );
}
