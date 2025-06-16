import * as React from 'react';
import {Typography, Box, ThemeProvider} from "@mui/material";
import Footer from "../components/Footer";
import { createTheme } from '@mui/material/styles';
import { Navbar } from "../components/Navbar";



const theme = createTheme({
    typography: {
        fontFamily: "Helvetica",
    },
});

const HomePage = () => {
    return (
        <Box>
            <Navbar />
            {/* Main content */}
            <Box sx={{ p: 4 }}>
                <ThemeProvider theme={theme}>
                    <Typography variant="h4">Welcome to LOADDYtask!</Typography>
                    <Typography variant="body1" sx={{ mt: 2 }}>
                        Log in to start.
                    </Typography>
                </ThemeProvider>
            </Box>
            <Footer />
        </Box>
    );
}

export default HomePage;