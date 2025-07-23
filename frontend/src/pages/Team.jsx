import React from 'react';
import {useParams} from "react-router-dom";
import {
    addTeamMember,
    deleteTeamMember,
    getEmployeeSkills,
    getJob,
    getSkills,
    getTeamById,
    getTeamJobs,
    taskcompleated,
    undotaskcompleated,
    getEmployeeTasks
    
} from "../services/api";
import {Navbar} from "../components/Navbar";
import {Box, Button, TextField, ThemeProvider, Typography, Table, TableBody, TableRow, TableCell} from "@mui/material";
import Footer from "../components/Footer";
import {createTheme} from "@mui/material/styles";
import {useState, useEffect} from "react";

const theme = createTheme({
    typography: {
        fontFamily: "Helvetica",
    },
});

function AddMember({ addMember, setAddMember, teamId }) {
    const [member, setMember] = React.useState(null);

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

function DeleteMember(idteam, memberEmail) {
    deleteTeamMember(idteam, memberEmail).then((response) => {
        if (response) {
            alert("Member deleted successfully");
            window.location.reload();
        } else {
            alert("Failed to delete member");
        }
    });
}

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
function EmployeeTasks(member){
    const [tasks, setTasks] = useState([]);
    const { idteam } = useParams();

    useEffect(() => {
        getEmployeeTasks(member.member, idteam).then((data) => {
            setTasks(data);
        });
    }, [member, idteam]);
    const [checkedTasks, setCheckedTasks] = useState({});

    const handleCheckboxChange = (taskId) => (event) => {
        setCheckedTasks((prev) => ({
            ...prev,
            [taskId]: event.target.checked,
        }));
        if (event.target.checked) {
            taskcompleated(taskId).then((response) => {
                if (response) {
                    alert("Task marked as completed");
                } else {
                    alert("Failed to mark task as completed");
                }
            });
        } else {
            undotaskcompleated(taskId).then((response) => {
                if (response) {
                    alert("Task marked as not completed");
                } else {
                    alert("Failed to mark task as not completed");
                }
            });
        }
    };

    return (
        <Box component="ul" sx={{ pl: 2 }}>
            {tasks.map((task) => (
                <li key={task.idtask} style={{ display: "flex", alignItems: "center" }}>
                    <input
                        type="checkbox"
                        checked={!!checkedTasks[task.idtask]}
                        onChange={handleCheckboxChange(task.idtask)}
                        style={{ marginRight: 8 }}
                    />
                    <Typography variant="body1">{task.description}</Typography>
                </li>
            ))}
        </Box>
    );
}
                    

function ViewJobs({ idteam }) {
    const [jobs, setJobs] = React.useState([]);

    React.useEffect(() => {
        let isMounted = true;
        getTeamJobs(idteam).then(async (response) => {
            const jobPromises = response.map(async (job) => {
                return job.idjob;
            });
            const jobsData = await Promise.all(jobPromises);
            if (isMounted) setJobs(jobsData);
        });
        return () => { isMounted = false; };
    }, [idteam]);

    return (
        <>
            {jobs.map((job) => (
                <Box key={job} sx={{ mb: 2 }}>
                    <Button
                        variant="contained"
                        size="small"
                        sx={{ mt: 1 }}
                        onClick={() => window.location.replace(`/view-job/${job}`)}
                    >
                        View Job {job}
                    </Button>
                </Box>
            ))}
        </>
    );
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
                        <ViewJobs idteam={idteam} />
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
                    <p></p>
                    <Typography variant="body1">Remaining Tasks:</Typography>
                    <EmployeeTasks member={localStorage.getItem("user")} />
                </ThemeProvider>
            </Box>
            <Footer />
        </Box>
    );
}

export default Team;