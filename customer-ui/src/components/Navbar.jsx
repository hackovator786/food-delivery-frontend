import {Outlet, useNavigate} from "react-router-dom";
import React, {useContext, useEffect, useState} from "react";
import {AppBar, Toolbar, IconButton, InputBase, Button, Box, styled, Badge} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {assets} from "../assets/assets";
import ThemeContext from "../context/ThemeContext.jsx";
import HomeContext from "../context/HomeContext.jsx";
import AuthContext from "../context/AuthProvider.jsx";
import useAxiosPrivate from "../hooks/useAxiosPrivate.js";
import {Typography} from "@mui/material";
import AuthModal from "./AuthModal.jsx";
import useAuth from "../hooks/useAuth.js";

const Search = styled("div")(({theme}) => ({
    position: "relative",
    backgroundColor: "#fff",
    borderRadius: "12px",
    boxShadow: "0px 2px 8px rgba(0,0,0,0.2)",
    height: "7vh",
    display: 'flex',
    alignItems: 'center',
}));

const SearchIconWrapper = styled("div")(({theme}) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "gray",
}));

const StyledInputBase = styled(InputBase)(({theme}) => ({
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

export default function Navbar({title}) {
    const {auth} = useAuth();
    const {modalOpen, setModalOpen} = useContext(AuthContext);
    const {PRIMARY_COLOR} = useContext(ThemeContext);
    const {cartItemsCount, setCartItemsCount} = useContext(HomeContext);
    const axiosPrivate = useAxiosPrivate();

    const handleCloseModal = () => setModalOpen(false);

    const getCartItemsCount = async () => {
        try {
            const response = await axiosPrivate.get("/cart/get-items-count");
            setCartItemsCount(response.data?.cartItemsCount ? response.data.cartItemsCount : 0);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        if (auth.accessToken) {
            console.log("Getting cart items");
            getCartItemsCount();
        }
    }, []);

    const navigate = useNavigate();
    return (
        <>
            <AppBar sx={{
                backgroundColor: "white",
                height: {xs: "10vh", md: "10vh", sm: "10vh", lg: "10vh"},
                color: "gray",
                borderColor: "red",
                boxShadow: "0 2px 2px 0 rgba(0, 0, 0, 0.1), 0 2px 2px 0 rgba(0, 0, 0, 0.1)"
            }}>
                <Toolbar
                    className="cust-toolbar"
                    sx={{
                        width: {xs: "100%", sm: "90%", md: "85%"},
                        margin: "auto",
                        px: {xs: 1, sm: 1, md: 0, lg: 0},
                        height: "100%",
                        display: "flex",
                        justifyContent: {xs: "space-between", md: "flex-start"},
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
                        onClick={() => {
                            navigate("/")
                        }}
                    />

                    {title === "Home" ? (<Search
                            sx={{
                                display: {xs: 'none', sm: 'flex'},
                                flexGrow: 1,
                                ml: {sm: 3},
                            }}
                        >
                            <SearchIconWrapper>
                                <SearchIcon/>
                            </SearchIconWrapper>
                            <StyledInputBase placeholder="Search restaurants or cuisines"
                                             inputProps={{"aria-label": "search"}}/>
                        </Search>) :
                        title === "Checkout" ?
                            (
                                <Typography variant="h6" fontWeight="bold" color={"black"}>
                                    SECURE CHECKOUT
                                </Typography>
                            ) :
                            (
                                <></>
                            )
                    }

                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        ml: {xs: 0, sm: 'auto'},
                        gap: {xs: 1, sm: 1},
                    }}>
                        <IconButton color="black" aria-label="shopping cart" sx={{
                            color: "black", marginLeft: 4, "&:hover": {
                                color: PRIMARY_COLOR,
                            },px: 2.3, py: 2.3
                        }} onClick={() => navigate("/cart")}>
                            <Badge badgeContent={cartItemsCount > 9 ? "9+" : cartItemsCount} color="error">
                                <ShoppingCartIcon/>
                            </Badge>
                        </IconButton>
                        <Button color="inherit" sx={{
                            color: "black", marginLeft: 2, "&:hover": {
                                color: PRIMARY_COLOR
                            }
                        }} onClick={()=>setModalOpen(true)}>
                            {auth.accessToken ? "S" : "Sign In" }
                        </Button>
                    </Box>
                </Toolbar>
            </AppBar>

            <Toolbar sx={{height: "10vh"}}/>

            <Box
                sx={{
                    display: {xs: 'flex', sm: 'none'},
                    width: '100%',
                    px: 0,
                    py: 0,
                    backgroundColor: 'transparent',
                    marginTop: "1.5vh"
                }}
            >
                <Search sx={{flexGrow: 1, width: '100%', height: "6vh"}}>
                    <SearchIconWrapper>
                        <SearchIcon/>
                    </SearchIconWrapper>
                    <StyledInputBase placeholder="Search restaurants or cuisines"
                                     inputProps={{"aria-label": "search"}}/>
                </Search>
            </Box>

            <Outlet/>

            <AuthModal
                open={modalOpen}
                handleCloseModal={handleCloseModal}
            />

        </>
    );
}