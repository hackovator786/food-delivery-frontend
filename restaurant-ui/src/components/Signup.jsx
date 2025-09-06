import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  IconButton,
  createTheme,
  ThemeProvider,
  CssBaseline,
} from '@mui/material';
import {
  Email as EmailIcon,
  Storefront as RestaurantIcon,
} from '@mui/icons-material';
import { Link } from "react-router-dom";
import {assets} from '../assets/assets';
// Define a custom theme for a fresh, food-delivery-app feel
const theme = createTheme({
  typography: {
    h4: {
      fontWeight: 700,
    },
  },
  palette: {
    primary: {
      main: '#E83B25', // A vibrant red-orange color
    },
    secondary: {
      main: '#FFD700', // A bright yellow
    },
    background: {
      default: '#F5F5F5', // Light gray background
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          textTransform: 'none',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '12px',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: '24px',
          boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.1)',
        },
      },
    },
  },
});

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [restaurantName, setRestaurantName] = useState('');

  const handleSendOtp = (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(email)) {
      console.log('Sending OTP for sign-up to:', email, 'with restaurant name:', restaurantName);
    } else {
      console.log('Please enter a valid email address.');
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Paper
          elevation={6}
          sx={{
            width: { xs: '100%', sm: '80%', md: '50%', lg: '400px' },
            padding: 4,
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 1,
            }}
          >
            <Box
              component="img"
              src={assets.logo}
              alt="Logo"
              sx={{ height: "100%", width: "90px", borderRadius: '50%', padding: 0, margin: 0 }}
            />
          </Box>
          <Typography variant="h4" component="h1" gutterBottom>
            Sign Up
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{paddingBottom: "3px"}}>
            Create your account to join us.
          </Typography>
          <form onSubmit={handleSendOtp} style={{ display: 'contents' }}>
            <TextField
              fullWidth
              label="Restaurant Name"
              variant="outlined"
              type="text"
              value={restaurantName}
              onChange={(e) => setRestaurantName(e.target.value)}
              required
              InputProps={{
                startAdornment: (
                  <IconButton edge="start" sx={{ color: 'text.secondary' }}>
                    <RestaurantIcon />
                  </IconButton>
                ),
              }}
            />
            <TextField
              fullWidth
              label="Email Address"
              variant="outlined"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              sx={{ mt: 2 }}
              InputProps={{
                startAdornment: (
                  <IconButton edge="start" sx={{ color: 'text.secondary' }}>
                    <EmailIcon />
                  </IconButton>
                ),
              }}
            />
            <Button type="submit" variant="contained" color="primary" fullWidth size="large" sx={{ mt: 1 }}>
              Sign Up
            </Button>
          </form>
          <Typography variant="body2" sx={{ mt: 1 }}>
            Already have an account?{' '}
            <Link to="/login" role="button" style={{ fontWeight: 'bold', color: "#E83B25" }}>
              Login
            </Link>
          </Typography>
        </Paper>
      </Box>
    </ThemeProvider>
  );
}
