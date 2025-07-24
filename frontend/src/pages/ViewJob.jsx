import React from 'react';
import {useParams} from "react-router-dom";
import {getEmployeeSkills, getJob, getSkills, getTeamById, sendToAlgorithm, sendNotification , assignTask} from "../services/api";
import {Navbar} from "../components/Navbar";
import {
    Box,
    Button,
    TextField,
    ThemeProvider,
    Typography,
    Table,
    TableBody,
    TableRow,
    TableCell,
    Grid
} from "@mui/material";
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

function Algorithm(idjob) {
    sendToAlgorithm(idjob).then((response) => {
        if (response) {
            alert("Tasks assigned successfully");
            window.location.reload();
        } else {
            alert("Failed to assign tasks");
        }
    });
}

function Notify(idjob) {

}

function updateTaskEmployee(idtask, email, team) {
    if(email){
        if (email && team.some(member => member.email === email)) {
            assignTask(idtask, email).then((response) => {
                if (response) {
                    alert("Task assigned successfully");
                    window.location.reload();
                } else {
                    alert("Failed to assign task");
                }
            });
        }
        else {
            alert("Employee not found in the team");
        }
    }
    else {
        assignTask(idtask, email).then((response) => {
            if (response) {
                alert("Task assigned successfully");
                window.location.reload();
            } else {
                alert("Failed to assign task");
            }
        });
    }
}

function ViewJob(){
    const { idjob } = useParams();
    const [job, setJob] = React.useState(null);
    const [tasks, setTasks] = React.useState([]);
    const [team, setTeam] = React.useState([]);
    const [skills, setSkills] = React.useState([]);
    React.useEffect(() => {
        getSkills().then((response) => {
            setSkills(response);
        });
    }, []);
    React.useEffect(() => {
        getJob(idjob).then((data) => {
            const jobarray = (JSON.parse(data.job));
            setJob(jobarray[0]);
            for (const task of jobarray) {
                let element = [];
                element.idtask = task.idtask;
                element.name = task.name;
                element.description = task.description;
                element.startdate = new Date(task.startdate).toISOString().split('T')[0];
                element.enddate = new Date(task.enddate).toISOString().split('T')[0];
                element.weight = task.weight;
                element.require = task.require;
                element.status = task.status;
                element.employee = task.emailemployee;
                setTasks(tasks => [...tasks, element]);
            }
        });
    }, [idjob]);
    React.useEffect(() => {
        if (job && job.assingedteam) {
            getTeamById(job.assingedteam).then((data) => {
                setTeam(data);
            });
        }
    }, [job]);

    if (!job){
        return <p></p>;
    }

    if (localStorage.getItem("role") === "employer") {
        return (
            <Box>
                <Navbar />
                <Box sx={{ p: 4 }}>
                    <ThemeProvider theme={theme}>
                        <Typography variant="h4">Team {job.assingedteam}</Typography>
                        <p></p>
                        <Typography variant="body1">Members:</Typography>
                        <Box component="ul" sx={{ pl: 2 }}>
                            {team.map((member) => (
                                <Table sx={{ minWidth: 300 }}>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell>{member.email}</TableCell>
                                            <Skills member={member.email}/>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            ))}
                        </Box>
                        <Typography variant="h5">Job {job.idjob}</Typography>
                        <Typography variant="h6">{job.Jname}</Typography>
                        <Typography variant="body1">{job.Jdescription}</Typography>
                        <Typography variant="h6">Tasks:</Typography>
                        <Box component="ul" sx={{ pl: 2 }}>
                            <Table sx={{ minWidth: 300 }}>
                                <TableBody>
                                    <TableRow>
                                        <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
                                        <TableCell sx={{ fontWeight: 'bold' }}>Description</TableCell>
                                        <TableCell sx={{ fontWeight: 'bold' }}>Start Date</TableCell>
                                        <TableCell sx={{ fontWeight: 'bold' }}>End Date</TableCell>
                                        <TableCell sx={{ fontWeight: 'bold' }}>Weight</TableCell>
                                        <TableCell sx={{ fontWeight: 'bold' }}>Requirements</TableCell>
                                        <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                                        <TableCell sx={{ fontWeight: 'bold' }}>Employee</TableCell>
                                    </TableRow>
                                    {tasks.map((task) => (
                                    <TableRow>
                                        <TableCell>{task.name}</TableCell>
                                        <TableCell>{task.description}</TableCell>
                                        <TableCell>{task.startdate}</TableCell>
                                        <TableCell>{task.enddate}</TableCell>
                                        <TableCell>{task.weight}</TableCell>
                                        <TableCell>
                                            {skills.map((skill) => (
                                                task.require === skill.idskills ? (
                                                    <span key={skill.idskills}>{skill.name} </span>
                                                ) : null
                                            ))
                                            }
                                        </TableCell>
                                        <TableCell>{task.status}</TableCell>
                                        {task.status === "completed" ? (
                                            <TableCell>{task.employee}</TableCell>
                                        ) : (
                                            !task.employee ? (
                                                <TableCell sx={{ maxWidth: 50, alignItems: 'center' }}>
                                                    <TextField
                                                        size="small"
                                                        label="Assign Employee"
                                                        variant="outlined"
                                                        value={task.assignEmail || ""}
                                                        onChange={e => {
                                                            const value = e.target.value;
                                                            setTasks(tasks =>
                                                                tasks.map(t =>
                                                                    t === task ? { ...t, assignEmail: value } : t
                                                                )
                                                            );
                                                        }}
                                                    />
                                                    <Button
                                                        variant="contained"
                                                        color="primary"
                                                        size="small"
                                                        sx={{ pl: 1, pr: 1, ml: 1, mt: 0.5 }}
                                                        onClick={() => {
                                                            updateTaskEmployee(task.idtask, task.assignEmail || "", team);
                                                        }}
                                                    >
                                                        Assign
                                                    </Button>
                                                </TableCell>
                                            ) : (
                                                <TableCell>
                                                    {task.employee}
                                                    <Button
                                                        variant="contained"
                                                        size="small"
                                                        sx={{ backgroundColor: '#b23b3b', pl: 1, pr: 1, ml: 1, mt: 0.5 }}
                                                        onClick={() => {
                                                            setTasks(tasks =>
                                                                tasks.map(t =>
                                                                    t === task ? { ...t, employee: null } : t
                                                                )
                                                            );
                                                            updateTaskEmployee(task.idtask, null, team);
                                                        }}
                                                    >
                                                        Remove
                                                    </Button>
                                                </TableCell>
                                            )
                                        )}
                                    </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                        <Grid display="flex" justifyContent="center" sx={{ marginTop: "30px", mb: 10 }}>
                            <Button sx={{ mr: 2 }}
                                type="submit"
                                id="submit"
                                variant="contained"
                                size="large"
                                onClick={() => Algorithm(idjob)}>
                                Send to Auto Assign
                            </Button>
                                                        <Button
                                type="submit"
                                id="sub2"
                                variant="contained"
                                size="large"
                                onClick={() => Notify(idjob)}>
                                Send notification
                            </Button>
                        </Grid>
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
                    <Typography variant="h5">Job {job.idjob}</Typography>
                    <Typography variant="h6">{job.Jname}</Typography>
                    <Typography variant="body1">{job.Jdescription}</Typography>
                </ThemeProvider>
            </Box>
            <Footer />
        </Box>
    );
}

export default ViewJob;