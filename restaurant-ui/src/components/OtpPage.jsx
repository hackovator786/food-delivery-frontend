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
  ConfirmationNumber as OtpIcon,
  ArrowBack as ArrowBackIcon
} from '@mui/icons-material';

// Define a custom theme for a fresh, food-delivery-app feel
const theme = createTheme({
  typography: {
    fontFamily: 'Inter, sans-serif',
    h4: {
      fontWeight: 700,
    },
  },
  palette: {
    primary: {
      main: '#FF6347', // A vibrant red-orange color
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

export default function OtpPage() {
  const [otp, setOtp] = useState('');

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    console.log('Verifying OTP:', otp);
    // In a real app, you would verify the OTP here and handle success/failure
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 2,
          background: 'linear-gradient(45deg, rgba(255, 153, 102, 0.8), rgba(255, 94, 98, 0.8)), url(https://images.unsplash.com/photo-1540189549336-e6e9928a255b?q=80&w=2070&auto=format&fit=crop)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
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
            gap: 3,
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
              src="https://placehold.co/100x100/FF6347/FFFFFF?text=Logo"
              alt="Logo"
              sx={{ height: 60, width: 60, borderRadius: '50%' }}
            />
          </Box>
          <IconButton onClick={() => console.log("Back to previous page")} sx={{ alignSelf: 'flex-start' }}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h4" component="h1" gutterBottom>
            Verify OTP
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Enter the OTP sent to your email address.
          </Typography>
          <form onSubmit={handleVerifyOtp} style={{ display: 'contents' }}>
            <TextField
              fullWidth
              label="Enter OTP"
              variant="outlined"
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              InputProps={{
                startAdornment: (
                  <IconButton edge="start" sx={{ color: 'text.secondary' }}>
                    <OtpIcon />
                  </IconButton>
                ),
              }}
            />
            <Button type="submit" variant="contained" color="primary" fullWidth size="large" sx={{ mt: 1 }}>
              Verify & Continue
            </Button>
          </form>
        </Paper>
      </Box>
    </ThemeProvider>
  );
}
