import {Box, Card, CardMedia, Typography} from "@mui/material";
import AddButtonControl from "./AddButtonControl.jsx";

const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_BASE_URL;

export default function MenuItemRow({ item, onOpenModal, quantity, onAdd, onRemove }) {
    const isLongDescription = item.description.length > 100; // Threshold for "Read More"

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                borderBottom: "1px solid #e0e0e0",
                pb: 4,
                mb: 4,
                gap: 2,
            }}
        >
            {/* LEFT INFO */}
            <Box sx={{ flex: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {item.menuItemName}
                </Typography>
                <Typography sx={{ fontSize: "1rem", fontWeight: 500, mt: 0.5 }}>
                    ₹ {item.price.toFixed(2)}
                </Typography>

                {item.rating && (
                    <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                        <Typography sx={{ color: "green", fontWeight: 600, mr: 0.5, fontSize: "0.8rem" }}>
                            ★ {item.rating}
                        </Typography>
                        <Typography sx={{ color: "gray", fontSize: "0.8rem" }}>
                            ({item.ratingCount})
                        </Typography>
                    </Box>
                )}

                <Typography
                    sx={{
                        mt: 1.5,
                        fontSize: "0.95rem",
                        color: "gray",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        maxWidth: "80%",
                    }}
                >
                    {item.description}
                </Typography>

                {isLongDescription && (
                    <Typography
                        onClick={() => onOpenModal(item)}
                        sx={{ cursor: "pointer", fontWeight: "bold", color: "gray", fontSize: "0.9rem", mt:0.5 }}
                    >
                        Read More
                    </Typography>
                )}
            </Box>

            {/* RIGHT IMAGE + BUTTON */}
            <Box sx={{ width: 185, height: 150, position: "relative", flexShrink: 0 }}>
                <Card
                    onClick={() => onOpenModal(item)}
                    sx={{
                        width: "100%",
                        height: "100%",
                        borderRadius: "12px",
                        cursor: "pointer",
                    }}
                >
                    <CardMedia
                        component="img"
                        image={IMAGE_BASE_URL + item.imageUrl}
                        alt={item.menuItemName}
                        sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                </Card>
                <AddButtonControl quantity={quantity} onAdd={onAdd} onRemove={onRemove} />
            </Box>
        </Box>
    );
};
