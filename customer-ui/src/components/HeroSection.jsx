import { Box, Button, Typography } from "@mui/material";

export default function HeroSection() {
    return (
        <Box
            sx={{
                bgcolor: "#f8f8f8",
                py: 8,
                textAlign: "center",
            }}
            >
            <Typography variant="h3" gutterBottom>
                Delicious food, delivered to you
            </Typography>
            <Typography variant="h6" gutterBottom>
                Order from your favorite restaurants with just a few clicks
            </Typography>
            <Button variant="contained" size="large" sx={{ mt: 2 }}>
                Order Now
            </Button>
        </Box>
    );
}