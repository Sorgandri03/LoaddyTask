import {Paper, Typography} from "@mui/material";
import * as React from "react";

const Footer = () => {
    return (
        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
            <Typography
                variant="body2"
                align="center"
                sx={{
                    color: 'text.secondary',
                }}
            >
                {'Copyright © '}
                Andrea Sorge, Michael Aldeni, Lorenzo Berretta, Syrym Khakimzhan
                {' '}
                {new Date().getFullYear()}
                {'.'}
            </Typography>
        </Paper>
    );
};

export default Footer;