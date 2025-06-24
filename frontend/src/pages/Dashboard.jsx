//import { useEffect, useState } from "react";

import {Box, Button, ThemeProvider, Typography} from "@mui/material";
import { Navbar } from "../components/Navbar";
import Footer from "../components/Footer";
import * as React from "react";
import {createTheme} from "@mui/material/styles";
import {getTeams} from "../services/api";

const theme = createTheme({
    typography: {
        fontFamily: "Helvetica",
    },
});

function TeamsList() {
    const teams =getTeams();

    const handleClick = (team) => {
        window.location.href = `/team/${team.id}`;
    };

    return teams.length > 0 && (
        <>
            {teams.map((team, index) => (
                <Button
                    variant="outlined"
                    key={index}
                    sx={{ mt: 2 }}
                    onClick={() => handleClick(team)}
                >
                    {team.name}
                </Button>
            ))}
        </>
    );
}

function Logout() {
    const handleLogout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("isAuthenticated");
        localStorage.removeItem("role");
        window.location.href = '/';
    };

    return (
        <Button variant="contained" color="secondary" onClick={handleLogout}>
            Logout
        </Button>
    );
}

function Role({ role }) {
    if (role === "employer") {
        return (
            <React.Fragment>
                <Typography variant="body1" sx={{ mt: 2 }}>
                    Select a team or create a new one to start managing your tasks.
                </Typography>
                <TeamsList />
                <Button
                    variant="contained"
                    sx={{ mt: 2 }}
                    onClick={() => window.location.href = '/create-team'}
                >
                    Create New Team
                </Button>
            </React.Fragment>
        );  //insert all teams that the employer is a part of
    }
    else {
        return (
            <React.Fragment>
                <Typography variant="body1" sx={{ mt: 2 }}>
                    Select a team from the ones that you are a part of.
                </Typography>

            </React.Fragment>
        );  //insert all teams that the employee is a part of
    }
}

function Dashboard() {
    return (
        <Box>
            <Navbar />
            {/* Main content */}
            <Box sx={{ p: 4 }}>
                <ThemeProvider theme={theme}>
                    <Typography variant="h4">Dashboard</Typography>
                    <Role role={localStorage.getItem("role")} />
                </ThemeProvider>
            </Box>
            <Box sx={{ p: 4 }}>
                <Logout />
            </Box>
            <Footer />
        </Box>
    );
}

export default Dashboard;