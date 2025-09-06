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
import { Link } from "react-router-dom";
import {
  Email as EmailIcon,
} from '@mui/icons-material';
import {assets} from '../assets/assets';

const theme = createTheme({
  typography: {
    fontFamily: 'Inter, sans-serif',
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

export default function LoginPage() {
  const [email, setEmail] = useState('');

  const handleSendOtp = (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(email)) {
      console.log('Sending OTP for login to:', email);
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
          padding: 2
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
            Welcome Back!
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{paddingBottom: "3px"}}>
            Sign in with your email to get started.
          </Typography>
          <form onSubmit={handleSendOtp} style={{ display: 'contents' }}>
            <TextField
              fullWidth
              label="Email Address"
              variant="outlined"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              InputProps={{
                startAdornment: (
                  <IconButton edge="start" sx={{ color: 'text.secondary' }}>
                    <EmailIcon />
                  </IconButton>
                ),
              }}
            />
            <Button type="submit" variant="contained" color="primary" fullWidth size="large" sx={{ mt: 1 }}>
              Login
            </Button>
          </form>
          <Typography variant="body2" sx={{ mt: 1 }}>
            Don't have an account?{' '}
            <Link to="/signup" role="button" style={{ fontWeight: 'bold', color: "#E83B25" }}>
              Sign up
            </Link>
          </Typography>
        </Paper>
      </Box>
    </ThemeProvider>
  );
}
