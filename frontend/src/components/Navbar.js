import {AppBar, Box, IconButton, Toolbar} from "@mui/material";
import logo from "../media/logo.png";
import Link from "@mui/material/Link";
import AccountCircle from "@mui/icons-material/AccountCircle";
import * as React from "react";

const Navbar = () => {
    return (
        <AppBar position="static" color="primary">
            <Toolbar>
                {/* Logo */}
                <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
                    <Link href="/" color="inherit" underline="none">
                        <img src={logo} alt="Site Logo" width={256} height={40}/>
                    </Link>
                </Box>
                {/* Login Icon */}
                <Link href="/login" color="inherit" underline="none">
                    <IconButton color="inherit" aria-label="login">
                        <AccountCircle />
                    </IconButton>
                </Link>
            </Toolbar>
        </AppBar>
    );
}

const NavbarWithoutLogin = () => {
    return (
        <AppBar position="static" color="primary">
            <Toolbar>
                {/* Logo */}
                <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
                    <Link href="/" color="inherit" underline="none">
                        <img src={logo} alt="Site Logo" width={256} height={40}/>
                    </Link>
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export {NavbarWithoutLogin, Navbar};