import {Backdrop, Box, CardMedia, Fade, IconButton, Modal, Typography} from "@mui/material";
import AddButtonControl from "./AddButtonControl.jsx";
import CloseIcon from "@mui/icons-material/Close";


const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_BASE_URL;

export default function ItemDetailsModal({ open, handleClose, item, quantity, onAdd, onRemove }) {
    if (!item) return null;

    return (
        <Modal
            open={open}
            onClose={handleClose}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{ backdrop: { timeout: 500 } }}
        >
            <Fade in={open}>
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: { xs: "90%", sm: 500 },
                        bgcolor: "background.paper",
                        borderRadius: 4,
                        boxShadow: 24,
                        p: 0,
                        overflow: "hidden",
                        outline: "none",
                    }}
                >
                    {/* Close Button */}
                    <IconButton
                        onClick={handleClose}
                        sx={{ position: "absolute", top: 10, right: 10, bgcolor: "white", zIndex: 2 }}
                    >
                        <CloseIcon />
                    </IconButton>

                    <CardMedia
                        component="img"
                        height="250"
                        image={IMAGE_BASE_URL + item.imageUrl}
                        alt={item.menuItemName}
                    />

                    <Box sx={{ p: 3 }}>
                        <Box display="flex" justifyContent="space-between" alignItems="center">
                            <Typography variant="h5" fontWeight="bold">
                                {item.menuItemName}
                            </Typography>
                            {/* Reusing the Add Button logic inside Modal too */}
                            <Box sx={{ position: "relative", width: 100, height: 40 }}>
                                <AddButtonControl quantity={quantity} onAdd={onAdd} onRemove={onRemove} />
                            </Box>
                        </Box>

                        <Typography variant="h6" sx={{ mt: 1 }}>
                            ₹ {item.price.toFixed(2)}
                        </Typography>

                        <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
                            {item.description}
                        </Typography>

                        <Typography variant="caption" display="block" sx={{ mt: 3, color: 'gray' }}>
                            Nutritional Info: {item.calories ? `${item.calories} kcal` : 'N/A'}
                        </Typography>
                    </Box>
                </Box>
            </Fade>
        </Modal>
    );
};
