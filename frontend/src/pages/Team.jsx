import React from 'react';
import {useParams} from "react-router-dom";
import {getTeamById} from "../services/api";
import {Navbar} from "../components/Navbar";
import {Box, ThemeProvider, Typography} from "@mui/material";
import Footer from "../components/Footer";
import {createTheme} from "@mui/material/styles";

const theme = createTheme({
    typography: {
        fontFamily: "Helvetica",
    },
});

function Team(){
    const { idteam } = useParams();
    const [team, setTeam] = React.useState(null);
    React.useEffect(() => {
        getTeamById(idteam).then((data) => {
            setTeam(data);
        });
    }, [idteam]);

    if (!team){
        return <p>PALLE</p>;
    }

    return (
        <Box>
            <Navbar />
            <Box sx={{ p: 4 }}>
                <ThemeProvider theme={theme}>
                    <Typography variant="h4">Team {idteam}</Typography>
                </ThemeProvider>
            </Box>
            <Footer />
        </Box>
    );
}

export default Team;