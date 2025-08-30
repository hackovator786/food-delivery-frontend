import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  InputBase,
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Button,
  Container,
} from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuItemSwiper from "./MenuItemSwiper";
import Navbar from "./NavBar";
import HeroSection from "./HeroSection";

// Custom Search Bar Styling
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "20ch",
      "&:focus": {
        width: "30ch",
      },
    },
  },
}));

export default function HomePage() {
  return (
    <>
      {/* Navbar */}
      {/* <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
            Foodie
          </Typography>

          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase placeholder="Search food or restaurant…" />
          </Search>

          <IconButton color="inherit" sx={{ ml: 2 }}>
            <ShoppingCartIcon />
          </IconButton>

          <IconButton color="inherit" sx={{ ml: 1 }}>
            <AccountCircleIcon />
          </IconButton>
        </Toolbar>
      </AppBar> */}
      <Navbar />
      

      {/* Hero Section */}
      <HeroSection />

      <MenuItemSwiper />

      {/* Featured Restaurants */}
      <Container sx={{ py: 6 }}>
        <Typography variant="h5" gutterBottom>
          Featured Restaurants
        </Typography>
        <Grid container spacing={3}>
          {[1, 2, 3, 4].map((item) => (
            <Grid item xs={12} sm={6} md={3} key={item}>
              <Card>
                <CardMedia
                  component="img"
                  height="160"
                  image={`https://source.unsplash.com/400x300/?restaurant,food,${item}`}
                  alt="Restaurant"
                />
                <CardContent>
                  <Typography variant="h6">Restaurant {item}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    ★★★★☆ (120 reviews)
                  </Typography>
                  <Typography variant="body2">Fast Delivery</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Footer */}
      <Box sx={{ bgcolor: "#333", color: "#fff", py: 4, textAlign: "center" }}>
        <Typography variant="body2">© 2025 Foodie. All rights reserved.</Typography>
      </Box>
    </>
  );
}
