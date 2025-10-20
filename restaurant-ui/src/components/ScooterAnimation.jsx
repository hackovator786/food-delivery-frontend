import React from "react";
import { Box } from "@mui/material";
import { motion } from "framer-motion";
import scooterLogo from "../assets/logo.png"; // replace with your scooter image path

export default function BouncingScooter() {
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "auto",
                backgroundColor: "transparent",
            }}
        >
            <motion.img
                src={scooterLogo}
                alt="Scooter"
                style={{ width: "7vw", height: "auto" }}
                animate={{
                    y: [0, -20, 0],
                }}
                transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />
        </Box>
    );
}
