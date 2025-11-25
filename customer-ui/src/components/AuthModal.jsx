import {
    Backdrop,
    Box,
    Button,
    CircularProgress,
    Fade,
    IconButton,
    Modal,
    TextField, ThemeProvider,
    Typography
} from "@mui/material";
import {Email as EmailIcon,Person as PersonIcon,ConfirmationNumber as OtpIcon} from '@mui/icons-material';
import CloseIcon from "@mui/icons-material/Close";
import {assets} from "../assets/assets.js";
import {useContext} from "react";
import AuthContext from "../context/AuthProvider.jsx";
import LoginContext from "../context/LoginContext.jsx";
import ThemeContext from "../context/ThemeContext.jsx";

export default function AuthModal({open, handleCloseModal}) {
    const {PRIMARY_COLOR, authTheme} = useContext(ThemeContext);
    const {fullName, setFullName, email, setEmail, otp, setOtp,
        forLogin, setForLogin, loading, setLoading, otpSent, setOtpSent,
        handleSendOtp, handleVerifyOtp} = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(otpSent){
            await handleVerifyOtp(e);
        }
        else {
            await handleSendOtp(e);
        }
    }

    const handleClose = () => {
        setOtpSent(false);
        setFullName("");
        setEmail("");
        setOtp("");
        setForLogin(true);
        handleCloseModal();
    };

    // Prevent Fade crash when no modal content
    if (!open) return null;

    return (
        <ThemeProvider theme={authTheme}>
            <Modal
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{timeout: 500}}
            >
                <Fade in={open}>
                    <Box
                        sx={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            width: {xs: "90%", sm: 420},
                            bgcolor: "background.paper",
                            borderRadius: 3,
                            boxShadow: 24,
                            p: 4,
                            outline: "none",
                            textAlign: "center",
                        }}
                    >
                        {/* Close Button */}
                        <IconButton
                            onClick={handleClose}
                            sx={{position: "absolute", top: 10, right: 10}}
                        >
                            <CloseIcon/>
                        </IconButton>

                        {/* Logo */}
                        <Box sx={{display: "flex", justifyContent: "center", mb: 2}}>
                            <Box
                                component="img"
                                src={assets.logo}
                                alt="Logo"
                                sx={{width: 80, borderRadius: "50%"}}
                            />
                        </Box>

                        <Typography variant="h4" gutterBottom sx={{paddingBottom: 4}}>
                            {forLogin ? "Login" : "Signup"}
                        </Typography>

                        {/* Form */}
                        <form onSubmit={handleSubmit}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: 3,
                                }}
                            >
                                {!forLogin && <TextField
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
                                disabled={otpSent}
                            />}
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
                                        <IconButton edge="start" sx={{ color: "text.secondary" }}>
                                            <EmailIcon />
                                        </IconButton>
                                    )
                                }}
                                color="primary"
                                disabled={otpSent}
                            />
                                {otpSent && <TextField
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
                                />}
                            </Box>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                fullWidth
                                size="large"
                                sx={{ mt: 2 }}
                            >
                                {loading ? (
                                    <CircularProgress size={24} color="inherit" />
                                ) : (
                                    otpSent ? "Verify OTP" : "Send OTP"
                                )}

                            </Button>
                        </form>

                        <Typography variant="body2" sx={{ mt: 2 }}>
                            Don't have an account?{" "}
                            <Button
                                variant="text"
                                disableRipple
                                onClick={() => setForLogin(!forLogin)}
                                sx={{
                                    fontWeight: "bold",
                                    color: "#8f2214",
                                    padding: 0,
                                    minWidth: "unset",
                                    textTransform: "none",
                                    textDecoration: "underline"
                                }}
                            >
                                {forLogin ? "Sign up" : "Login"}
                            </Button>
                        </Typography>

                    </Box>
                </Fade>
            </Modal>
        </ThemeProvider>
    );
}
