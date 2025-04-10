//import { useEffect, useState } from "react";

import {Box} from "@mui/material";
import { Navbar } from "../components/Navbar";
import Footer from "../components/Footer";

function Dashboard() {
    return (
        <Box>
            <Navbar/>
            <div>
                <h1>Dashboard</h1>
            </div>
            <Footer/>
        </Box>
    );
}

export default Dashboard;