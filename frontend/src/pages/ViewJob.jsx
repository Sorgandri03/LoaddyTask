import React from 'react';
import {useParams} from "react-router-dom";
import {getEmployeeSkills, getJob, getSkills, getTeamById} from "../services/api";
import {Navbar} from "../components/Navbar";
import {Box, Button, TextField, ThemeProvider, Typography, Table, TableBody, TableRow, TableCell} from "@mui/material";
import Footer from "../components/Footer";
import {createTheme} from "@mui/material/styles";

const theme = createTheme({
    typography: {
        fontFamily: "Helvetica",
    },
});

function Skills(member) {
    const [employeeSkills, setEmployeeSkills] = React.useState([]);
    React.useEffect(() => {
        getEmployeeSkills(member.member).then((response) => {
            if (response) {
                setEmployeeSkills(response);
            }
        });
    }, [member]);

    const [skills, setSkills] = React.useState([]);
    React.useEffect(() => {
        getSkills().then((response) => {
            if (response) {
                setSkills(response);
            }
        });
    }, []);

    let array = [];
    for (let i = 0; i < employeeSkills.length; i++) {
        array.push(employeeSkills[i].idskills);
    }

    return (
        <>
            {skills.map((skill) => (
                <TableCell key={skill.idskills} sx = {{ width : 100, textAlign: "center"}}>
                    {array.includes(skill.idskills) ? skill.name : "-"}
                </TableCell>
            ))}
        </>
    );
}

function ViewJob(){
    const { idjob } = useParams();
    const [job, setJob] = React.useState(null);
    React.useEffect(() => {
        getJob(idjob).then((data) => {
            setJob(data);
        });
    }, [idjob]);
    const [team, setTeam] = React.useState(null);
    React.useEffect(() => {
        getTeamById(job.assingedteam).then((data) => {
            setTeam(data);
        });
    }, [job.assingedteam]);

    if (!job){
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
                            {team.map((member) => (
                                <Table sx={{ minWidth: 300 }}>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell>{member.email}</TableCell>
                                            <Skills member={member.email}/>
                                            <TableCell align="right">
                                                <Button
                                                    variant="contained"
                                                    size="small"
                                                    sx={{
                                                        backgroundColor: '#b23b3b',
                                                        minWidth: 0,
                                                        px: 1,
                                                        alignSelf: "center"
                                                    }}
                                                    onClick={() => DeleteMember(idteam, member.email)}
                                                >
                                                    Delete Member
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            ))}
                        </Box>
                        <AddMember addMember={addMember} setAddMember={setAddMember} teamId={idteam} />
                        <br /><br />
                        <Button variant="contained" onClick={()=> window.location.replace(`/create-job/${idteam}`)}>Create job</Button>
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
                    <Typography variant="h4">Job {job.idjob}</Typography>
                </ThemeProvider>
            </Box>
            <Footer />
        </Box>
    );
}

export default ViewJob;