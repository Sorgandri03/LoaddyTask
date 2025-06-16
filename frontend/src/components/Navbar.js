import {AppBar, Box, Toolbar} from "@mui/material";
import logo from "../media/logo.png";
import Link from "@mui/material/Link";
import * as React from "react";

const Navbar = () => {
    return (
        <AppBar position="static" color="primary">
            <Toolbar>
                {/* Logo */}
                <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
                    <Link href="/" color="inherit" underline="none" marginX={1} paddingTop={1} sx={{display: "flex", alignItems: "center" }}>
                        <img src={logo} alt="Site Logo" width={256} height={40}/>
                    </Link>
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export {Navbar};