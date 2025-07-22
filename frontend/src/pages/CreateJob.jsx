import React from 'react';
import {useParams} from "react-router-dom";
import {getEmployeeSkills, getSkills, getTeamById} from "../services/api";
import {Navbar} from "../components/Navbar";
import {
    Box,
    Button,
    ThemeProvider,
    Typography,
    Table,
    TableBody,
    TableRow,
    TableCell,
    TextField,
    OutlinedInput, MenuItem, ListItemText, Select, InputLabel, FormControl, Grid
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

function createTask(name, desc, endDate, weight, selected, prevTasks, setTask) {
    let task = [];
    task.push(name);
    task.push(desc);
    task.push(endDate);
    task.push(weight);
    task.push(selected);
    setTask(prevTasks => [...prevTasks, task]);
}

function createJob(tasks) {
    console.log(tasks);
}

function AddTask() {
    const [tasks, setTask] = React.useState([]);
    const [name, setName] = React.useState("");
    const [desc, setDesc] = React.useState("");
    const oneWeekFromNow = new Date();
    oneWeekFromNow.setHours(oneWeekFromNow.getHours() + 168);
    const [endDate, setEndDate] = React.useState(oneWeekFromNow.toISOString().split('T')[0]);
    const [selected, setSelected] = React.useState([]);
    const [weight, setWeight] = React.useState(0);
    const [skills, setSkills] = React.useState([]);
    React.useEffect(() => {
        getSkills().then((data) => {
            setSkills(data);
        });
    }, []);

    const handleChange = (event) => {
        setSelected(event.target.value);
    };

    const emptyTask = () => {
        setName("");
        setDesc("");
        setEndDate(oneWeekFromNow.toISOString().split('T')[0]);
        setWeight(0);
        setSelected([]);
    }

    return (
        <React.Fragment>
            <Box sx={{ p: 4, display: 'flex', justifyContent: 'center' }}>
                <ThemeProvider theme={theme}>
                    <Grid container direction="column" alignItems="center">
                        {tasks.map((task) => (
                            <React.Fragment>
                                <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                                    <TextField disabled type="text" label="Task Name" style={{ width: 150 }} value={task[0]} />
                                    <TextField disabled type="text" label="Description" style={{ flex: 2 }} value={task[1]} />
                                    <TextField disabled type="date" label="End Date" style={{ width: 160 }} value={task[2]} />
                                    <TextField disabled type="number" label="Weight" style={{ width: 120 }} value={task[3]} />
                                    <TextField disabled type="text" label="Skills" style={{ width: 300 }} value={task[4].join(', ')} />
                                </Box>
                                <br />
                            </React.Fragment>
                        ))}
                        { tasks.length > 0 && (
                            <Button variant="contained" color="primary" sx={{ justifyContent: 'center', mb: 4 }} onClick={() => {createJob(tasks)}}>
                                Create New Job
                            </Button>
                        )}
                        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                            <TextField type="text" label="Task Name" style={{ width: 150 }} value={name} onChange={(e)=> setName(e.target.value)} />
                            <TextField type="text" label="Description" style={{ flex: 2 }} value={desc} onChange={(e)=> setDesc(e.target.value)}/>
                            <TextField type="date" label="End Date" style={{ width: 160 }} value={endDate} onChange={(e)=> setEndDate(e.target.value)}/>
                            <TextField type="number" label="Weight" style={{ width: 120 }} slotProps={{ htmlInput: {min: 0, max: 10} }} value={weight} onChange={(e)=> setWeight(e.target.value)}/>
                            <FormControl sx={{ width: 300 }}>
                                <InputLabel id="skills-multi-label">Skills</InputLabel>
                                <Select
                                    labelId="skills-multi-label"
                                    id="skills-multi"
                                    multiple
                                    value={selected}
                                    onChange={handleChange}
                                    input={<OutlinedInput label="Skills" />}
                                    variant="outlined"
                                    renderValue={(selected) => selected.join(', ')}
                                >
                                    {skills.map((skill) => (
                                        <MenuItem key={skill.idskills} value={skill.name}>
                                            <ListItemText primary={skill.name} />
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>
                    </Grid>
                </ThemeProvider>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button variant="contained" color="primary" sx={{ justifyContent: 'center' }} onClick={() => {createTask(name, desc, endDate, weight, selected, tasks, setTask); emptyTask();}}>
                    Add Task
                </Button>
            </Box>
        </React.Fragment>
    );
}

function CreateJob(){
    const { idteam } = useParams();
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
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            ))}
                        </Box>
                    </ThemeProvider>
                </Box>
                <AddTask />
                <Footer />
            </Box>
        );
    }
    else window.location.replace(`/dashboard`);
}

export default CreateJob;