import React from 'react';
import {useParams} from "react-router-dom";
import {getSkills, getTeamById} from "../services/api";
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
            let skills = [];
            for (let i = 0; i < data.length; i++) {
                skills.push(getSkills([i].name));
            }
            console.log(skills);
        });
    }, [idteam]);

    if (!team){
        return <p></p>;
    }

    if (localStorage.getItem("role") === "employer") {
        return (
            <Box>
                <Navbar />
                <Box sx={{ p: 4 }}>
                    <ThemeProvider theme={theme}>
                        <Typography variant="h4">Team {idteam}</Typography>
                        <p></p>
                        <Typography variant="body1">Members:</Typography>
                        <Box component="ul" sx={{ pl: 2 }}>
                            {team.map((member, skills) => (
                                <Box component="li" key={member.idemployee} sx={{ listStyle: "disc" }}>
                                    {member.email}&nbsp;&nbsp;&nbsp;&nbsp;
                                </Box>
                            ))}
                        </Box>
                    </ThemeProvider>
                </Box>
                <Footer />
            </Box>
        );
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