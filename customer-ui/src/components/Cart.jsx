import React, {useState} from 'react';
import {
    Box,
    Container,
    Grid,
    Typography,
    Paper,
    Button,
    Avatar,
    Divider,
    TextField,
    Checkbox,
    IconButton,
    AppBar,
    Toolbar, InputBase
} from '@mui/material';
import {
    Person as PersonIcon,
    LocationOn as LocationIcon,
    AccountBalanceWallet as WalletIcon,
    Add as AddIcon,
    Remove as RemoveIcon,
    HelpOutline as HelpIcon,
    PersonOutline as PersonOutlineIcon
} from '@mui/icons-material';

const COLORS = {
    primary: '#fc8019',
    green: '#60b246',
    textMain: '#282c3f',
    textLight: '#93959f',
    background: '#e9ecee',
    white: '#ffffff'
};

export default function Cart() {
    const [quantity, setQuantity] = useState(1);

    return (
        <Box
            sx={{
                py: 0,
                px: 0,
                width: {xs: "100%", sm: "98%", md: "70%", lg: "60%"},
                margin: "auto",
            }}
        >
            <Container maxWidth="lg" sx={{mt: 0, pb: 10}}>

                <Grid item xs={12} md={4}>
                    <Paper elevation={0} sx={{bgcolor: COLORS.white, borderRadius: 0, overflow: 'hidden'}}>

                        {/* 1. Restaurant Header */}
                        <Box sx={{
                            p: 2,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 2,
                            borderBottom: '1px solid #e9e9eb'
                        }}>
                            <Box
                                component="img"
                                src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/2b4f62d606d1b2bfba9ba9e5386fabb7" // Pizza Hut Placeholder
                                sx={{width: 50, height: 50, objectFit: 'cover'}}
                            />
                            <Box>
                                <Typography variant="subtitle1" fontWeight={600}>Pizza Hut</Typography>
                                <Typography variant="caption" color="text.secondary">Chhindwara City</Typography>
                            </Box>
                        </Box>

                        {/* 2. Scrollable Items Area */}
                        <Box sx={{p: 2, maxHeight: '60vh', overflowY: 'auto'}}>

                            {/* Single Item Row */}
                            <Box display="flex" alignItems="flex-start" justifyContent="space-between" mb={2}>
                                <Box display="flex" alignItems="flex-start" width="50%">
                                    <Typography variant="body2" sx={{fontSize: '0.9rem', lineHeight: 1.2}}>
                                        Veggie Feast
                                    </Typography>
                                    {/* Customize link */}
                                </Box>

                                {/* Quantity Control */}
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        border: '1px solid #d4d5d9',
                                        px: 1,
                                        py: 0.5,
                                        bgcolor: COLORS.white
                                    }}
                                >
                                    <IconButton size="small" onClick={() => setQuantity(Math.max(0, quantity - 1))}
                                                sx={{color: COLORS.green, p: 0}}>
                                        <RemoveIcon fontSize="small"/>
                                    </IconButton>
                                    <Typography sx={{mx: 2, color: COLORS.green, fontWeight: 600, fontSize: '0.9rem'}}>
                                        {quantity}
                                    </Typography>
                                    <IconButton size="small" onClick={() => setQuantity(quantity + 1)}
                                                sx={{color: COLORS.green, p: 0}}>
                                        <AddIcon fontSize="small"/>
                                    </IconButton>
                                </Box>

                                <Typography variant="body2" sx={{color: '#535665'}}>₹259</Typography>
                            </Box>

                            {/* Suggestion Box */}
                            <Box sx={{
                                bgcolor: '#f9f9f9',
                                p: 1.5,
                                my: 2,
                                border: '1px dashed #a9abb2',
                                display: 'flex',
                                alignItems: 'center'
                            }}>
                                <InputBase
                                    fullWidth
                                    placeholder='Any suggestions? We will pass it on...'
                                    sx={{
                                        fontSize: '0.875rem',
                                        color: 'text.secondary',
                                        '& .MuiInputBase-input::placeholder': {
                                            color: 'text.secondary',
                                            opacity: 1,
                                        }
                                    }}
                                />
                            </Box>

                            {/* No Contact Checkbox */}
                            <Box sx={{border: '1px solid #e9e9eb', p: 2, mt: 2}}>
                                <Box display="flex" alignItems="flex-start">
                                    <Checkbox size="small" sx={{p: 0, mt: 0.5, mr: 1, color: COLORS.textMain}}/>
                                    <Box>
                                        <Typography variant="subtitle2" fontWeight={700}>Opt in for No-contact
                                            Delivery</Typography>
                                        <Typography variant="caption" color="text.secondary">
                                            Unwell, or avoiding contact? Please select no-contact delivery. Partner will
                                            safely place the order outside your door (not for COD)
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>

                            {/* Bill Details */}
                            <Box sx={{mt: 2}}>
                                <Typography variant="subtitle2" sx={{fontWeight: 700, mb: 1}}>Bill Details</Typography>

                                <Box display="flex" justifyContent="space-between" mb={1}>
                                    <Typography variant="body2" color="text.secondary">Item Total</Typography>
                                    <Typography variant="body2" color="text.secondary">₹259</Typography>
                                </Box>

                                <Box display="flex" justifyContent="space-between" mb={1} pb={2}
                                     sx={{borderBottom: '1px solid #e9e9eb'}}>
                                    <Box display="flex" alignItems="center">
                                        <Typography variant="body2" color="text.secondary"
                                                    sx={{textDecoration: 'underline', mr: 0.5}}>Delivery
                                            Fee</Typography>
                                        <Typography variant="body2" color="text.secondary">| 14.1 kms</Typography>
                                    </Box>
                                    <Typography variant="body2" color="text.secondary">₹69</Typography>
                                </Box>

                                <Box display="flex" justifyContent="space-between" mt={2} mb={1}>
                                    <Typography variant="body2" color="text.secondary">GST & Other Charges</Typography>
                                    <Typography variant="body2" color="text.secondary">₹82.36</Typography>
                                </Box>
                            </Box>
                        </Box>

                        {/* 3. Footer: To Pay */}
                        <Box
                            sx={{
                                p: 2,
                                borderTop: '2px solid #282c3f',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                bgcolor: COLORS.white
                            }}
                        >
                            <Typography variant="subtitle1" fontWeight={700}>TO PAY</Typography>
                            <Typography variant="subtitle1" fontWeight={700}>₹410</Typography>
                        </Box>

                    </Paper>

                    {/* Bottom Disclaimer Box */}
                    <Box sx={{mt: 3, p: 2, bgcolor: COLORS.white, border: '1px solid #e9e9eb'}}>
                        <Typography variant="subtitle2" fontWeight={700} sx={{mb: 1}}>
                            Review your order and address details to avoid cancellations
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Note: If you cancel within 60 seconds of placing your order, a 100% refund will be issued.
                            No refund for cancellations made after 60 seconds.
                        </Typography>
                    </Box>

                </Grid>
            </Container>
        </Box>
    );
}