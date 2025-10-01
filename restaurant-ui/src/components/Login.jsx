import React, {useContext} from 'react';
import {
    Box,
    Button,
    TextField,
    Typography,
    Paper,
    IconButton,
    ThemeProvider,
    CssBaseline, CircularProgress,
} from '@mui/material';
import {Link} from "react-router-dom";
import {
  Email as EmailIcon,
} from '@mui/icons-material';
import {assets} from '../assets/assets';
import LoginContext, {LoginContextProvider} from "../context/LoginContext.jsx";
import ThemeContext from "../context/ThemeContext.jsx";

export default function LoginPage() {
    const {authTheme} = useContext(ThemeContext);
    const {emailAttribs, handleSendOtp, loading} = useContext(LoginContext)

  return (
      <LoginContextProvider>
      <ThemeProvider theme={authTheme}>
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
              {...emailAttribs}
              required
              autoFocus={true}
              InputProps={{
                startAdornment: (
                  <IconButton edge="start" sx={{ color: 'text.secondary' }}>
                    <EmailIcon />
                  </IconButton>
                ),
              }}
            />
            <Button type="submit" variant="contained" color="primary" fullWidth size="large" sx={{ mt: 1 }}>
                {loading ? <CircularProgress size={24} color="inherit" /> : 'Send OTP'}
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
      </LoginContextProvider>);
}
