import React from 'react';
import {useParams} from "react-router-dom";
import {addTeamMember, getTeamById} from "../services/api";
import {Navbar} from "../components/Navbar";
import {Box, Button, TextField, ThemeProvider, Typography} from "@mui/material";
import Footer from "../components/Footer";
import {createTheme} from "@mui/material/styles";

const theme = createTheme({
    typography: {
        fontFamily: "Helvetica",
    },
});

function sendAddMember(idteam, member) {
    addTeamMember(idteam, member).then((response) => {
        if (response) {
            alert("Member added successfully");
            window.location.reload();
        } else {
            alert("Failed to add member");
        }
    });
}

function AddMember({ addMember, setAddMember, teamId }) {
    const [member, setMember] = React.useState(null);
    if (addMember) {
        return (
            <React.Fragment>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2, maxWidth: 400, alignItems: "flex-start" }}>
                    <br />
                    <TextField
                        id="member-email"
                        label="Member Email"
                        variant="outlined"
                        type="text"
                        value={member}
                        onChange={(e) => setMember(e.target.value)}
                    />
                    <Button variant="contained" onClick={() => sendAddMember(teamId, member)}>
                        Add Member
                    </Button>
                </Box>
            </React.Fragment>
        );
    }
    else {
        return (
            <Button variant="contained" onClick={() => setAddMember(true)}>
                Add Member
            </Button>
        );
    }
}

function Team(){
    const { idteam } = useParams();
    const [addMember, setAddMember] = React.useState(false);
    const [team, setTeam] = React.useState(null);
    React.useEffect(() => {
        getTeamById(idteam).then((data) => {
            setTeam(data);
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
                                    {member.email}
                                </Box>
                            ))}
                        </Box>
                        <AddMember addMember={addMember} setAddMember={setAddMember} teamId={idteam} />
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