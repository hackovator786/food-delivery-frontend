import {Box, Typography} from "@mui/material";

const DashboardView = () => {

    return (
        <Box>
            <Typography variant="h5" component="h2" gutterBottom sx={{ color: 'text.primary', mb: 3 }}>
                Dashboard
            </Typography>
        </Box>
    );
};

export default DashboardView;