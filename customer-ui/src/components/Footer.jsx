import {Box, Typography} from "@mui/material";
import React from "react";

export default function Footer() {
    return (
        <Box sx={{ backgroundColor: "black", color: "white", py: 4, textAlign: "center" }}>
            <Typography variant="body2">© 2025 Bite. All rights reserved.</Typography>
        </Box>
    );
}