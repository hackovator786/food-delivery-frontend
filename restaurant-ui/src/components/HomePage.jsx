import React, {useContext, useMemo, useState} from 'react';
import {
    AppBar, Toolbar, Typography, IconButton, Drawer, List, ListItem, ListItemButton, ListItemIcon,
    ListItemText, Box, Container, useMediaQuery, useTheme, TextField,
    Avatar
} from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';

import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DashboardIcon from '@mui/icons-material/Dashboard';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import ReviewsIcon from '@mui/icons-material/Reviews';
import ThemeContext from "../context/ThemeContext.jsx";
import Dashboard from "./DashBoard.jsx";
import MenuItems from "./MenuItems.jsx";
import Orders from "./Orders.jsx";
import Reviews from "./Reviews.jsx";
import {assets} from "../assets/assets.js";

const HomePage = () => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [selectedKey, setSelectedKey] = useState('dashboard');
    const drawerWidth = 200;
    const {PRIMARY_COLOR, homePageTheme} = useContext(ThemeContext);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleMenuItemClick = (key) => {
        setSelectedKey(key);
        if (isMobile) {
            setMobileOpen(false);
        }
    };

    const menuItemsConfig = [
        { text: 'Dashboard', icon: DashboardIcon, component: Dashboard, key: 'dashboard' },
        { text: 'Menu', icon: MenuBookIcon, component: MenuItems, key: 'food_items' },
        { text: 'Orders', icon: ShoppingBasketIcon, component: Orders, key: 'orders' },
        { text: 'Reviews', icon: ReviewsIcon, component: Reviews, key: 'reviews' },
    ];

    const CurrentView = useMemo(() => {
        const item = menuItemsConfig.find(item => item.key === selectedKey);
        return item ? item.component : Dashboard;
    }, [selectedKey]);

    const viewProps = useMemo(() => {
        if (selectedKey === 'food_items') {
            return {};
        }
        if (selectedKey === 'dashboard') {
            return {};
        }
        return {};
    }, [selectedKey]);


    const drawer = (
        <div>
            {/* Logo/Title Section - Styled like 'GoFood.' */}
            {/*<Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'flex-start', borderBottom: '1px solid #eee' }}>*/}
            {/*    <Typography variant="h5" sx={{ fontWeight: 800, color: PRIMARY_COLOR }}>*/}
            {/*        GoFood<span style={{ color: '#333' }}>.</span>*/}
            {/*    </Typography>*/}
            {/*</Box>*/}
            <Box
                component="img"
                src={assets.logo}
                alt="Logo"
                sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: "auto", height : "11vh", padding: "0 0 0 2vw", margin: 0}}
            />

            {/* Navigation List */}
            <List sx={{ pt: 2 }}>
                {menuItemsConfig.map((item) => (
                    <ListItem key={item.key} disablePadding sx={{ px: 1 }}>
                        <ListItemButton
                            selected={selectedKey === item.key}
                            onClick={() => handleMenuItemClick(item.key)}
                            sx={{
                                borderRadius: '8px',
                                py: 1,
                                // Active state styling
                                '&.Mui-selected': {
                                    backgroundColor: PRIMARY_COLOR,
                                    color: 'white',
                                    '& .MuiListItemIcon-root': {
                                        color: 'white',
                                    },
                                    '&:hover': {
                                        backgroundColor: homePageTheme.palette.primary.dark,
                                    },
                                },
                                // Default state styling
                                '&:not(.Mui-selected)': {
                                    color: 'text.secondary',
                                    '& .MuiListItemIcon-root': {
                                        color: 'text.secondary',
                                    },
                                },
                            }}
                        >
                            <ListItemIcon>
                                <item.icon />
                            </ListItemIcon>
                            <ListItemText primary={item.text} primaryTypographyProps={{ fontWeight: 500 }} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </div>
    );

    return (
        <ThemeProvider theme={homePageTheme}>
            <Box sx={{ display: 'flex' }}>
                {/* 1. App Bar (Header) */}
                <AppBar
                    position="fixed"
                    elevation={0}
                    sx={{
                        zIndex: (theme) => theme.zIndex.drawer + 1,
                        ml: { md: `${drawerWidth}px` },
                        width: { md: `calc(100% - ${drawerWidth}px)` },
                    }}
                >
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            sx={{ mr: 2, display: { md: 'none' } }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Box sx={{ flexGrow: 1 }} />
                        {/* Mock Search and User Info */}
                        <TextField
                            variant="outlined"
                            placeholder="Search..."
                            size="small"
                            sx={{ mr: 2, display: { xs: 'none', sm: 'block' } }}
                            InputProps={{
                                startAdornment: <SearchIcon sx={{ color: 'text.secondary', mr: 1 }} />,
                                sx: { borderRadius: '8px', backgroundColor: homePageTheme.palette.background.default, height: '40px' }
                            }}
                        />
                        <Avatar sx={{ bgColor: PRIMARY_COLOR, width: 32, height: 32 }}>J</Avatar>
                    </Toolbar>
                </AppBar>

                {/* 2. Side Navigation (Drawer) */}
                <Box
                    component="nav"
                    sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
                >
                    {/* Mobile Drawer */}
                    <Drawer
                        variant="temporary"
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        ModalProps={{ keepMounted: true }}
                        sx={{
                            display: { xs: 'block', md: 'none' },
                            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                        }}
                    >
                        {drawer}
                    </Drawer>
                    {/* Desktop Drawer */}
                    <Drawer
                        variant="permanent"
                        sx={{
                            display: { xs: 'none', md: 'block' },
                            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                        }}
                        open
                    >
                        {drawer}
                    </Drawer>
                </Box>

                {/* 3. Main Content Area */}
                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        p: 3,
                        width: { md: `calc(100% - ${drawerWidth}px)` },
                        minHeight: '100vh',
                        backgroundColor: 'background.default',
                    }}
                >
                    <Toolbar /> {/* Spacer for AppBar */}
                    <Container maxWidth="xl" sx={{ mt: 3, p: 0 }}>
                        {/* Pass state as props to the current view */}
                        {/*<CurrentView {...viewProps} />*/}
                        <CurrentView />
                    </Container>
                </Box>
            </Box>
        </ThemeProvider>
    )
}

export default HomePage;