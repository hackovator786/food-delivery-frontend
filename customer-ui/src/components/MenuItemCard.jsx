import { Box, Card, CardMedia, Typography } from "@mui/material";
import AddButtonControl from "./AddButtonControl.jsx";

const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_BASE_URL;

export default function MenuItemCard({ item, onOpenModal, quantity, onAdd, onRemove }) {
    return (
        <Card
            sx={{
                borderRadius: "16px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                display: "flex",
                flexDirection: "column", // Stack items vertically
                height: "100%",           // Full height to align grid items
                cursor: 'pointer',
                position: "relative"
            }}
        >
            {/* 1. IMAGE SECTION */}
            <Box sx={{ height: 150, overflow: "hidden" }} onClick={() => onOpenModal(item)}>
                <CardMedia
                    component="img"
                    height="150"
                    image={IMAGE_BASE_URL + item.imageUrl}
                    alt={item.menuItemName}
                    sx={{
                        borderTopLeftRadius: "16px",
                        borderTopRightRadius: "16px",
                        objectFit: "cover",
                        width: "100%"
                    }}
                />
            </Box>

            {/* 2. CONTENT SECTION */}
            {/* flexGrow: 1 ensures this section takes up available space,
                pushing the button to the bottom */}
            <Box sx={{ p: 2, flexGrow: 1 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 700, lineHeight: 1.2, mb: 0.5 }}>
                    {item.menuItemName}
                </Typography>

                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        ₹ {item.price}
                    </Typography>
                    {item.rating && (
                        <Box sx={{ bgcolor: 'green', color: 'white', px: 0.5, borderRadius: 1, fontSize: '0.7rem' }}>
                            ★ {item.rating}
                        </Box>
                    )}
                </Box>

                {/*<Typography variant="caption" color="text.secondary" sx={{*/}
                {/*    display: "-webkit-box",*/}
                {/*    WebkitLineClamp: 2,*/}
                {/*    WebkitBoxOrient: "vertical",*/}
                {/*    overflow: "hidden",*/}
                {/*    mt: 1*/}
                {/*}}>*/}
                {/*    {item.description}*/}
                {/*</Typography>*/}
            </Box>

            {/* 3. ACTION/BUTTON SECTION (New Footer) */}
            <Box sx={{ p: 2, pt: 0 }}>
                <Box sx={{ width: "80%", margin: "0 auto" }}>
                    <AddButtonControl
                        quantity={quantity}
                        onAdd={onAdd}
                        onRemove={onRemove}
                        sx={{ position: 'static', transform: 'none', width: '100%' }}
                    />
                </Box>
            </Box>
        </Card>
    );
};