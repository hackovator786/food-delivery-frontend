import React from "react";
import { AppBar, Toolbar, IconButton, InputBase, Button, Box, styled } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { alpha } from "@mui/material/styles";
import {assets} from "../assets/assets";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  backgroundColor: "#fff",
  borderRadius: "12px",
  boxShadow: "0px 2px 8px rgba(0,0,0,0.2)",
  height: "7vh", 
  display: 'flex',
  alignItems: 'center',
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "gray",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "gray",
  width: "100%",
  flex: 1,
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
  },
  height: "100%",
}));

export default function Navbar() {
  return (
    <>
      <AppBar sx={{ backgroundColor: "white", height: {xs: "10vh", md: "10vh", sm: "10vh", lg: "10vh"}, color: "gray", borderColor: "red" }}>
        <Toolbar
          className="cust-toolbar"
          sx={{
            width: { xs: "100%", sm: "90%", md: "85%" },
            margin: "auto",
            px: { xs: 2, sm: 3 },
            height: "100%",
            display: "flex",
            justifyContent: { xs: "space-between", md: "flex-start" },
            alignItems: "center",
          }}
        >
          <Box
            component="img"
            src={assets.logo}
            alt="Logo"
            sx={{
              height: "100%",
              objectFit: "contain",
              cursor: "pointer",
            }}
          />

          <Search
            sx={{
              display: { xs: 'none', sm: 'flex' },
              flexGrow: 1,
              ml: { sm: 3 },            
            }}
          >
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase placeholder="Search restaurants or cuisines" inputProps={{ "aria-label": "search" }} />
          </Search>

          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            ml: { xs: 0, sm: 'auto' },
            gap: { xs: 1, sm: 1 },
          }}>
            <IconButton color="black" aria-label="shopping cart" sx={{ color: "black", marginLeft: 4 }}>
              <ShoppingCartIcon />
            </IconButton>
            <Button color="inherit" sx={{ color: "black" }}>
              Sign In
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Toolbar sx={{ height: "10vh" }} />

      <Box
        sx={{
          display: { xs: 'flex', sm: 'none' },
          width: '100%',
          px: 0,
          py: 0,
          backgroundColor: 'transparent',
          marginTop:"1.5vh"
        }}
      >
        <Search sx={{ flexGrow: 1, width: '100%', height: "6vh"}}>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase placeholder="Search restaurants or cuisines" inputProps={{ "aria-label": "search" }} />
        </Search>
      </Box>
    </>
  );
}