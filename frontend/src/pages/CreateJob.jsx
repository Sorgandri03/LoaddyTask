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
    OutlinedInput, MenuItem, ListItemText, Select, InputLabel, FormControl
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

function AddTask() {
    const [task, setTask] = React.useState(null);
    const [skills, setSkills] = React.useState([]);
    React.useEffect(() => {
        getSkills().then((data) => {
            setSkills(data);
        });
    }, []);
    if (!task) {
        return (
            <React.Fragment>
                <Box sx={{ p: 4, display: 'flex', justifyContent: 'center' }}>
                    <ThemeProvider theme={theme}>
                        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                            <TextField type="text" placeholder="Task Name" style={{ width: 150 }} />
                            <TextField type="text" placeholder="Description" style={{ flex: 2 }} />
                            <TextField type="date" placeholder="End Date" style={{ width: 160 }} />
                            <TextField type="number" placeholder="Weight" style={{ width: 120 }} />
                            <FormControl sx={{ m: 1, width: 300 }}>
                                <InputLabel id="demo-multiple-checkbox-label">Tag</InputLabel>
                                <Select
                                    labelId="demo-multiple-checkbox-label"
                                    id="demo-multiple-checkbox"
                                    multiple
                                    value={Array.isArray(task?.tags) ? task.tags : []}
                                    input={<OutlinedInput label="Tag" />}
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
                            <TextField type="text" placeholder="Employee (optional)" style={{ flex: 2 }} />
                        </Box>
                        <br /> <br />

                    </ThemeProvider>
                </Box>
                <Button variant="contained" color="primary" sx={{ justifyContent: 'center' }} onClick={() => {}}>
                    Add Task
                </Button>
            </React.Fragment>
        );
    }
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