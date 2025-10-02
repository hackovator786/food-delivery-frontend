import React, {useContext, useEffect, useState} from 'react';
import {
    Box,
    Button,
    TextField,
    Typography,
    Paper,
    IconButton,
    ThemeProvider,
    CssBaseline,
    CircularProgress
} from '@mui/material';
import {
    ConfirmationNumber as OtpIcon,
    ArrowBack as ArrowBackIcon
} from '@mui/icons-material';
import {assets} from "../assets/assets.js";
import ThemeContext from "../context/ThemeContext.jsx";
import OtpContext from "../context/OtpContext.jsx";

export default function OtpPage() {
    const {otpTheme} = useContext(ThemeContext);
    const {otp, setOtp, navigate, handleVerifyOtp, loading, formatTimer, resendLoading, handleResendOtp} = useContext(OtpContext);
    const [timer, setTimer] = useState(10);
    useEffect(() => {
        if (timer > 0) {
            const interval = setInterval(() => {
                setTimer((prevTimer) => prevTimer - 1);
            }, 1000);
            return () => clearInterval(interval); // Cleanup function
        }
    }, [timer]);

    return (
        <ThemeProvider theme={otpTheme}>
            <CssBaseline/>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 2,
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
                    <Box sx={{display: "flex", alignItems: "center", mb: 0}}>
                        <IconButton
                            onClick={() => {
                                console.log("Back to previous page");
                                navigate(-1);
                            }}
                            sx={{mr: 5}}
                        >
                            <ArrowBackIcon/>
                        </IconButton>
                        <Typography variant="h4" component="h1" gutterBottom>
                            Verify OTP
                        </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                        Enter the OTP sent to your email address.
                    </Typography>
                    <form onSubmit={handleVerifyOtp} style={{display: 'contents'}}>
                        <TextField
                            fullWidth
                            label="Enter OTP"
                            variant="outlined"
                            type="text"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            required
                            autoFocus={true}
                            InputProps={{
                                startAdornment: (
                                    <IconButton edge="start" sx={{color: 'text.secondary'}}>
                                        <OtpIcon/>
                                    </IconButton>
                                ),
                            }}
                        />
                        <Button type="submit" variant="contained" color="primary" fullWidth size="large" sx={{mt: 1}}>
                            {loading ? <CircularProgress size={24} color="inherit" /> : 'Verify & Continue'}
                        </Button>
                    </form>
                    <Box sx={{ mt: 1 }}>
                        {timer > 0 ? (
                            <Typography variant="body2" color="text.secondary">
                                Resend available in <b>{formatTimer(timer)}</b>
                            </Typography>
                        ) : (
                            <Button
                                onClick={() => {handleResendOtp(); setTimer(10);}}
                                variant="text"
                                color="primary"
                                disabled={resendLoading}
                            >
                                {resendLoading ? <CircularProgress size={24} color="primary" /> : 'Resend Code'}
                            </Button>
                        )}
                    </Box>
                </Paper>
            </Box>
        </ThemeProvider>
    );
}
