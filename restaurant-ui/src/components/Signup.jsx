import React, {useContext} from 'react';
import {
    Box,
    Button,
    TextField,
    Typography,
    Paper,
    IconButton,
    ThemeProvider,
    CssBaseline,
    CircularProgress,
} from '@mui/material';
import {
    Email as EmailIcon,
    Person as PersonIcon
} from '@mui/icons-material';
import {Link} from "react-router-dom";
import {assets} from '../assets/assets';
import SignUpContext from "../context/SignUpContext.jsx";
import ThemeContext from "../context/ThemeContext";

export default function SignupPage() {
    const {authTheme} = useContext(ThemeContext);
    const {fullName, setFullName, emailAttribs, loading, handleSendOtp} = useContext(SignUpContext);

    return (
        <ThemeProvider theme={authTheme}>
            <CssBaseline/>
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
                        width: {xs: '100%', sm: '80%', md: '50%', lg: '400px'},
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
                            sx={{height: "100%", width: "90px", borderRadius: '50%', padding: 0, margin: 0}}
                        />
                    </Box>
                    <Typography variant="h4" component="h1" gutterBottom>
                        Sign Up
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{paddingBottom: "3px"}}>
                        Create your account to join us.
                    </Typography>
                    <form onSubmit={handleSendOtp} style={{display: 'contents'}}>
                        <TextField
                            fullWidth
                            label="Full Name"
                            variant="outlined"
                            type="text"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            required
                            InputProps={{
                                startAdornment: (
                                    <IconButton edge="start" sx={{ color: 'text.secondary' }}>
                                        <PersonIcon />
                                    </IconButton>
                                ),
                            }}
                        />
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
                                    <IconButton edge="start" sx={{color: 'text.secondary'}}>
                                        <EmailIcon/>
                                    </IconButton>
                                ),
                            }}
                        />
                        <Button type="submit" variant="contained" color="primary" fullWidth size="large" sx={{mt: 1}}>
                            {loading ? <CircularProgress size={24} color="inherit"/> : 'Send OTP'}
                        </Button>
                    </form>
                    <Typography variant="body2" sx={{mt: 1}}>
                        Already have an account?{' '}
                        <Link to="/login" role="button" style={{fontWeight: 'bold', color: "#E83B25"}}>
                            Login
                        </Link>
                    </Typography>
                </Paper>
            </Box>
        </ThemeProvider>
    );
}
