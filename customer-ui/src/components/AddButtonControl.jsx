import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import {Box, Button, IconButton, Typography} from "@mui/material";
import {useContext} from "react";
import ThemeContext from "../context/ThemeContext.jsx";
export default function AddButtonControl({ quantity, onAdd, onRemove, sx }) {
    const {PRIMARY_COLOR} = useContext(ThemeContext);
    return (
        <Box
            sx={{
                position: "absolute",
                bottom: -15,
                left: "50%",
                transform: "translateX(-50%)",
                width: "80%",
                height: 36,
                boxShadow: 2,
                borderRadius: "4px",
                backgroundColor: "white",
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "1px solid #e0e0e0",
                ...sx
            }}
        >
            {quantity === 0 ? (
                <Button
                    onClick={(e) => {
                        e.stopPropagation();
                        onAdd();
                    }}
                    fullWidth
                    sx={{
                        color: PRIMARY_COLOR,
                        fontWeight: 800,
                        height: "100%",
                        fontSize: "1rem",
                        "&:hover": { backgroundColor: "#f0f0f0" },
                    }}
                >
                    ADD
                </Button>
            ) : (
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        width: "100%",
                        height: "100%",
                        backgroundColor: "white",
                    }}
                    onClick={(e) => e.stopPropagation()} // Prevent clicking card
                >
                    <IconButton
                        size="small"
                        onClick={onRemove}
                        sx={{ color: PRIMARY_COLOR, width: "30%" }}
                    >
                        <RemoveIcon fontSize="small" width="100%"/>
                    </IconButton>
                    <Typography sx={{ color: PRIMARY_COLOR, fontWeight: 700, fontSize: "0.9rem" }}>
                        {quantity}
                    </Typography>
                    <IconButton
                        size="small"
                        onClick={onAdd}
                        sx={{ color: PRIMARY_COLOR, width: "30%" }}
                    >
                        <AddIcon fontSize="small" />
                    </IconButton>
                </Box>
            )}
        </Box>
    );
};
